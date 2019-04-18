package ids.sharklite.jprocess.util;

import ids.sharklite.jprocess.config.SoftConfig;
import ids.sharklite.jprocess.entity.UploadFile;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static ids.sharklite.jprocess.config.SoftConfig.BUFFER_SIZE;


public class HttpUtil {

    public static final String MESSAGE = "message";
    public static final String SUCCESS = "success";

    private HttpUtil() {

    }

    public static String getRemoteHost(HttpServletRequest request) {
        if (request == null)
            return "unknown";
        String ip = request.getHeader("x-forwarded-for");
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("WL-Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }
        return ip.equals("0:0:0:0:0:0:0:1") ? "127.0.0.1" : ip;
    }


    public static void download(HttpServletResponse response, InputStream input, String asName) throws IOException {
        response.setContentType("application/octet-stream");
        if (asName != null && !asName.equals("")) {
            asName = new String(asName.getBytes(StandardCharsets.UTF_8), StandardCharsets.ISO_8859_1);
            response.setHeader("content-disposition", "attachment;filename=" + asName);
        }
        byte[] bytes = new byte[BUFFER_SIZE];
        int i;
        ServletOutputStream out = response.getOutputStream();
        while ((i = input.read(bytes)) > -1) {
            out.write(bytes, 0, i);
        }
    }

    public static String getCookieValue(Cookie[] cookies, String cookieName) {
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals(cookieName)) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }

    public static Map<String, Object> getResponseBody() {
        return getResponseBody(false, "");
    }


    public static Map<String, Object> getResponseBody(boolean success) {
        return getResponseBody(success, "");
    }

    public static Map<String, Object> getResponseBody(boolean success, String message) {
        Map<String, Object> map = new HashMap<>();
        map.put(SUCCESS, success);
        map.put(MESSAGE, message);
        return map;
    }

    public static List<UploadFile> upload(MultipartHttpServletRequest request) throws IOException {
        List<UploadFile> uploadFiles = new ArrayList<>();
        List<MultipartFile> requestFiles = request.getFiles("file");
        Timestamp time = new Timestamp(System.currentTimeMillis());
        for (MultipartFile file : requestFiles) {
            if (file.isEmpty()) {
                continue;
            }
            String fileName = StringUtil.decodeURI(file.getName());
            UploadFile uploadFile = new UploadFile();
            String fileId = StringUtil.getUniqueId();
            String path = StringUtil.getUploadFilePath(fileId);
            uploadFile.setPath(path);
            uploadFile.setId(fileId);
            uploadFile.setFileName(fileName);
            int lastDot = fileName.lastIndexOf('.');
            if (lastDot > -1)
                uploadFile.setFileType(fileName.substring(lastDot + 1).toLowerCase());
            else
                uploadFile.setFileType("");
            uploadFile.setUploadTime(time);
            uploadFiles.add(uploadFile);
            File localFile = new File(SoftConfig.getHomePath() + path);
            FileUtil.makeFolder(localFile.getParentFile());
            file.transferTo(localFile);
        }
        return uploadFiles;
    }

}

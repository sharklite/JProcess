package ids.sharklite.jprocess.controller;

import ids.sharklite.jprocess.config.SoftConfig;
import ids.sharklite.jprocess.dao.UploadFileDao;
import ids.sharklite.jprocess.entity.OnlineUser;
import ids.sharklite.jprocess.entity.UploadFile;
import ids.sharklite.jprocess.util.HttpUtil;
import ids.sharklite.jprocess.util.StringUtil;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/http")
public class HttpHelperController {

    @Resource
    private UploadFileDao uploadFileDao;

    @RequestMapping("/download")
    public void downloadFile(String fileId, HttpServletResponse response) {
        Optional.ofNullable(uploadFileDao.findById(fileId)).ifPresent(uploadFile -> {
            File file = new File(SoftConfig.getHomePath() + uploadFile.getPath());
            if (file.exists() && file.isFile()) {
                try (FileInputStream input = new FileInputStream(file)) {
                    HttpUtil.download(response, input, StringUtil.notNull(uploadFile.getFileName(), "file"));
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        });
    }


    @RequestMapping(value = "/upload", method = {RequestMethod.POST})
    public Map<String, Object> uploadFile(HttpServletRequest request) throws IOException {
        Map<String, Object> map = HttpUtil.getResponseBody(false);
        StringBuilder fileIds = new StringBuilder();
        StringBuilder fileNames = new StringBuilder();
        List<UploadFile> list = HttpUtil.upload((MultipartHttpServletRequest) request);
        OnlineUser user = (OnlineUser) request.getSession().getAttribute("user");
        String userId = user != null ? user.getId() : null;
        boolean first = true;
        for (UploadFile file : list) {
            file.setUserId(userId);
            if (!first) {
                fileIds.append(",");
                fileNames.append(",");
            }
            fileIds.append(file.getId());
            fileNames.append(file.getFileName());
            uploadFileDao.save(file);
            first = false;
        }
        map.put("fileIds", fileIds.toString());
        map.put("fileNames", fileNames.toString());
        map.put(HttpUtil.SUCCESS, true);
        return map;
    }


}

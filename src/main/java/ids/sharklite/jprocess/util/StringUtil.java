package ids.sharklite.jprocess.util;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import ids.sharklite.jprocess.config.SoftConfig;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.regex.Pattern;


public class StringUtil {

    private static final ObjectMapper MAPPER = new ObjectMapper();
    private static final String UTF_8 = StandardCharsets.UTF_8.name();
    private static final String SALT = "salt.whatever.key.encode.hex";
    private static final char[] DIGITS_LOWER = {'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'};
    private static final Pattern NUMERIC_1 = Pattern.compile("^[-+]?(([0-9]+)([.]([0-9]+))?|([0-9]+)[.]|([.]([0-9]+))?)$");
    private static final Pattern NUMERIC_2 = Pattern.compile("^([-+]?\\d+.?\\d*)[Ee]([-+]?\\d+)$");

    private StringUtil() {

    }

    static String bytesToHexString(final byte[] data) {
        final int l = data.length;
        final char[] out = new char[l << 1];
        for (int i = 0, j = 0; i < l; i++) {
            out[j++] = DIGITS_LOWER[(0xf0 & data[i]) >>> 4];
            out[j++] = DIGITS_LOWER[0x0f & data[i]];
        }
        return new String(out);
    }

    public static String notNull(String s) {
        return notNull(s, "");
    }

    public static String notNull(String s, String defaultVal) {
        return s == null ? defaultVal : s;
    }

    public static String getUniqueId() {
        return UniqueIdGenerator.getInstance().getUniqueId();
    }

    public static String digestHex(String s) {
        return bytesToHexString(MessageDigestCompute.compute(StringUtil.encodeURI(s).getBytes()));
    }

    //input "abc"  output "10df4f3643e34965193bd9eea81954af"
    public static String makeHexPassword(String s) {
        s = StringUtil.digestHex(s);
        s = StringUtil.digestHex(s);
        return StringUtil.digestHex(s + SALT);
    }

    public static boolean validatePassword(String httpPassword, String dbPassword) {
        if (httpPassword == null || dbPassword == null)
            return false;
        httpPassword = StringUtil.digestHex(httpPassword + SALT);
        return httpPassword.equals(dbPassword);
    }


    public static String decodeURI(String text) {
        if (text != null) {
            try {
                return java.net.URLDecoder.decode(text, "utf-8");
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
        }
        return "";
    }

    public static String encodeURI(String text) {
        if (text != null) {
            try {
                return java.net.URLEncoder.encode(text, UTF_8);
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
        }
        return "";
    }

    public static String asString(Object o) {
        try {
            MAPPER.writeValueAsString(o);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return "";
    }

    public static <T> T asValue(String s, Class<T> clazz) {
        if (s != null && s.length() != 0) {
            try {
                return MAPPER.readValue(s, clazz);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return null;
    }


    public static boolean isNumber(Object o) {
        boolean f = o instanceof Number;
        if (!f && o != null) {
            String s = o.toString().trim();
            f = !s.isEmpty() &&
                    (NUMERIC_1.matcher(s).matches() || NUMERIC_2.matcher(s).matches());
        }
        return f;
    }


    //上传附件路径
    public static String getUploadFilePath(String fileName) {
        return "/upload/" + new SimpleDateFormat("yyyyMMdd").format(new Date()) + "/" + fileName;
    }


//    public static void main(String[] args){
//        System.out.println(makeHexPassword("abc"));
//    }

}

package ids.sharklite.jprocess.util;


import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

class MessageDigestCompute {

    private static final String MD5 = "MD5";


    private static byte[] getDigestCode(byte[] bytes) {
        try {
            // 获得摘要算法的 MessageDigest 对象
            MessageDigest mdInst = MessageDigest.getInstance(MD5);
            // 使用指定的字节更新摘要
            mdInst.update(bytes);
//            // 获得密文
//            bytes = mdInst.digest();
//            // 把密文转换成十六进制的字符串形式
//            StringBuilder hexString = new StringBuilder();
//            // 字节数组转换为 十六进制 数
//            for (byte b : bytes) {
//                String shaHex = Integer.toHexString(b & 0xFF);
//                if (shaHex.length() < 2)
//                    hexString.append(0);
//                hexString.append(shaHex);
//            }

            return mdInst.digest();
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        return null;
    }


    static byte[] compute(byte[] bs) {
        return getDigestCode(bs);
    }



}

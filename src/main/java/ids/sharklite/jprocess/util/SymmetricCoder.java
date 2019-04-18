package ids.sharklite.jprocess.util;



import org.apache.tomcat.util.codec.binary.Base64;
import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;


/*
 * AES
 */
public class SymmetricCoder {

    private static final int KEY_BIT_SIZE = 128;
    private static final String GENERATOR_NAME = "AES";
    private static final String RULES = "9527.404.365.1";

    private SymmetricCoder() {
    }


    private static Cipher getCipher(byte[] rule, final int mode) throws InvalidKeyException, NoSuchAlgorithmException, NoSuchPaddingException {
        KeyGenerator keyGen = KeyGenerator.getInstance(GENERATOR_NAME);
        keyGen.init(KEY_BIT_SIZE, new SecureRandom(rule));
        SecretKey original_key = keyGen.generateKey();
        byte[] raw = original_key.getEncoded();
        SecretKey key = new SecretKeySpec(raw, GENERATOR_NAME);
        Cipher cipher = Cipher.getInstance(GENERATOR_NAME);
        if (mode == Cipher.ENCRYPT_MODE) {
            cipher.init(Cipher.ENCRYPT_MODE, key);
        } else if (mode == Cipher.DECRYPT_MODE) {
            cipher.init(Cipher.DECRYPT_MODE, key);
        }
        return cipher;
    }


    private static String AESEncodeString(String content, byte[] rule) {
        try {
            Cipher cipher = getCipher(rule, Cipher.ENCRYPT_MODE);
            byte[] byte_encode = content.getBytes();
            byte[] byte_AES = cipher.doFinal(byte_encode);
            return new String(new Base64().encode(byte_AES));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }




    private static String AESDecodeString(String content, byte[] rule) {
        try {
            Cipher cipher = getCipher(rule, Cipher.DECRYPT_MODE);
            byte[] byte_content = new Base64().decode(content);
            return new String(cipher.doFinal(byte_content));
        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }

//    private static byte[] AESDecode(byte[] byte_content, byte[] rule) {
//        try {
//            Cipher cipher = getCipher(rule, Cipher.DECRYPT_MODE);
//            return cipherFinal(byte_content);
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//        return null;
//    }


//    static byte[] encrypt(byte[] data, byte[] rules) {
//        return SymmetricCoder.AESEncode(data, rules);
//    }
//
//    static byte[] decrypt(byte[] data, byte[] rules) {
//        return SymmetricCoder.AESDecode(data, rules);
//    }


    public static String encrypt(String s) {
        return SymmetricCoder.AESEncodeString(s, RULES.getBytes());
    }

    public static String decrypt(String s) {
        return SymmetricCoder.AESDecodeString(s, RULES.getBytes());
    }


}
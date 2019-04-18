package ids.sharklite.jprocess.util;


import java.io.File;
import java.util.Arrays;
import java.util.Optional;



public class FileUtil {


    private FileUtil() {

    }

    public static boolean deleteFile(File file) {
        if (!file.isFile()) {
            System.out.println("delete file failed: [" + file.getAbsolutePath() + "] is not a file.");
            return false;
        }
        boolean f = delete(file);
        if (!f)
            System.out.println("delete file failed: [" + file.getAbsolutePath() + "]");
        return f;
    }


    public static void makeFolder(File file) {
        if (!file.mkdirs()) {
            if (!file.exists() || !file.isDirectory())
                System.out.println("make dir error: " + file.getAbsolutePath());
        }
    }

    public static boolean deleteFolderTree(File folder) {
        if (!folder.isDirectory()) {
            System.out.println("delete dir failed: [" + folder.getAbsolutePath() + "] is not a folder.");
            return false;
        }
        boolean f = FileUtil.delete(folder);
        if (!f)
            System.out.println("delete dir failed: [" + folder.getAbsolutePath() + "]");
        return f;
    }





    private static boolean delete(File file) {
        if (!file.exists())
            return true;
        if (file.isDirectory()) {
            Optional.ofNullable(file.listFiles()).ifPresent(files -> Arrays.asList(files).forEach(FileUtil::delete));
        }
        return file.delete();
    }





}

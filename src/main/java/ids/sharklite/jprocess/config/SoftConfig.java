package ids.sharklite.jprocess.config;


import org.springframework.boot.system.ApplicationHome;


public class SoftConfig {

    public static final int BUFFER_SIZE = 1024 * Integer.BYTES;

    //项目路径
    private static String homePath;

    static {
        ApplicationHome home = new ApplicationHome(SoftConfig.class);
        homePath = home.getSource().getParentFile().getAbsolutePath();
    }

    public static String getHomePath() {
        return homePath;
    }


}

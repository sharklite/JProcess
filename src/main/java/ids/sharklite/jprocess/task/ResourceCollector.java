package ids.sharklite.jprocess.task;

import ids.sharklite.jprocess.config.SoftConfig;
import ids.sharklite.jprocess.dao.UploadFileDao;
import ids.sharklite.jprocess.entity.UploadFile;
import ids.sharklite.jprocess.util.FileUtil;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.io.File;

@Component
@EnableScheduling
public class ResourceCollector {

    @Resource
    private UploadFileDao uploadFileDao;

    //删除UploadFile与其对应的本地文件
    //每天凌晨1点执行一次
    @Scheduled(cron = "0 0 1 * * ?")
    public void deleteUploadFileAndLocalFile() {
        UploadFile uploadFile;
        while (true) {
            uploadFile = uploadFileDao.getRedundantOne();
            if (uploadFile == null)
                break;
            File file = new File(SoftConfig.getHomePath() + uploadFile.getPath());
            if (file.exists())
                FileUtil.deleteFile(file);
            uploadFileDao.deleteById(uploadFile.getId());
        }
    }


}

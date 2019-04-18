package ids.sharklite.jprocess.entity;


import ids.minishark.annotation.Table;
import ids.sharklite.jprocess.base.BaseEntity;

import java.sql.Timestamp;


@Table("UploadFile")
public class UploadFile extends BaseEntity {
    private String id;
    private String fileName;
    private String path;
    private String fileType;
    private String referTable;
    private boolean saved;
    private String userId;
    private Timestamp uploadTime = new Timestamp(System.currentTimeMillis());
    @Override
    public String getId() {
        return id;
    }

    @Override
    public void setId(String id) {
        this.id = id;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getFileType() {
        return fileType;
    }

    public void setFileType(String fileType) {
        this.fileType = fileType;
    }

    public String getReferTable() {
        return referTable;
    }

    public void setReferTable(String referTable) {
        this.referTable = referTable;
    }

    public boolean isSaved() {
        return saved;
    }

    public void setSaved(boolean saved) {
        this.saved = saved;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public Timestamp getUploadTime() {
        return uploadTime;
    }

    public void setUploadTime(Timestamp uploadTime) {
        this.uploadTime = uploadTime;
    }
}

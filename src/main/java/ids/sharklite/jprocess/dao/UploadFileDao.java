package ids.sharklite.jprocess.dao;


import ids.sharklite.jprocess.base.BaseDao;
import ids.sharklite.jprocess.entity.UploadFile;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.Arrays;
import java.util.Collection;
import java.util.Optional;

@Repository
public class UploadFileDao extends BaseDao<UploadFile> {



    public void saDeleted(String fileIds) {
        Optional.ofNullable(fileIds).ifPresent(ids -> {
            if (ids.length() != 0)
                this.saDeleted(Arrays.asList(ids.split(",")));
        });
    }


    private void saDeleted(Collection<String> fileIds) {
        fileIds.forEach(id -> this.executeUpdate("update " + this.getTableName() + " set saved=0 where id=?", id));
    }


    public void saSaved(String fileIds) {
        Optional.ofNullable(fileIds).ifPresent(ids -> {
            if (ids.length() != 0)
                this.saSaved(Arrays.asList(ids.split(",")));
        });
    }


    private void saSaved(Collection<String> fileIds) {
        fileIds.forEach(id -> this.executeUpdate("update " + this.getTableName() + " set saved=1 where id=?", id));
    }


    public UploadFile getRedundantOne() {
        String sql = "select top 1 id from " + this.getTableName() + " where ( saved = 0 or saved is null ) and dateDiff(hour,uploadTime,? )>=24 ";
        String id = this.getString(sql, new Timestamp(System.currentTimeMillis()));//已经上传了一天但仍然没有保存的附件
        return this.findById(id);
    }

}

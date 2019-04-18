package ids.sharklite.jprocess.dao;



import ids.sharklite.jprocess.base.BaseUserDao;
import ids.sharklite.jprocess.entity.EmpUser;
import org.springframework.stereotype.Repository;

@Repository
public class EmpUserDao extends BaseUserDao<EmpUser> {

    public EmpUser findByLogName(String logName) {
        String id = this.getString("select id from " + this.getTableName() + " where logName=?", logName);
        return this.findById(id);
    }


}

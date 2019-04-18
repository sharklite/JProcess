package ids.sharklite.jprocess.entity;

import ids.minishark.annotation.Table;


@Table("EmpUser")
public class OnlineUser extends  AbstractUser {

    private String id;
    private String name;


    private String host;

    //两种管理员权限从关联查询中获得
    private boolean hrAdmin;
    private boolean sysAdmin;

    public String getHost() {
        return host;
    }

    public void setHost(String host) {
        this.host = host;
    }

    public boolean isHrAdmin() {
        return hrAdmin;
    }

    public void setHrAdmin(boolean hrAdmin) {
        this.hrAdmin = hrAdmin;
    }

    public boolean isSysAdmin() {
        return sysAdmin;
    }

    public void setSysAdmin(boolean sysAdmin) {
        this.sysAdmin = sysAdmin;
    }

    @Override
    public String getId() {
        return id;
    }

    @Override
    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}

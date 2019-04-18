package ids.sharklite.jprocess.entity;

import ids.minishark.annotation.Table;

import java.sql.Timestamp;

@Table("EmpUser")
public class EmpUser  extends AbstractUser {

    private String id;
    private boolean blocked;
    private boolean deleted;
    private String name;
    private String empCode;
    private int gender;
    private String avatar;
    private String logName;
    private String password;//
    private String identityNumber;
    private Timestamp birthday;
    private Timestamp graduateDate;
    private String graduateFrom;
    private String degree;
    private String major;

    @Override
    public String getId() {
        return id;
    }

    @Override
    public void setId(String id) {
        this.id = id;
    }

    public boolean isBlocked() {
        return blocked;
    }

    public void setBlocked(boolean blocked) {
        this.blocked = blocked;
    }

    public boolean isDeleted() {
        return deleted;
    }

    public void setDeleted(boolean deleted) {
        this.deleted = deleted;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmpCode() {
        return empCode;
    }

    public void setEmpCode(String empCode) {
        this.empCode = empCode;
    }

    public int getGender() {
        return gender;
    }

    public void setGender(int gender) {
        this.gender = gender;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public String getLogName() {
        return logName;
    }

    public void setLogName(String logName) {
        this.logName = logName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getIdentityNumber() {
        return identityNumber;
    }

    public void setIdentityNumber(String identityNumber) {
        this.identityNumber = identityNumber;
    }

    public Timestamp getBirthday() {
        return birthday;
    }

    public void setBirthday(Timestamp birthday) {
        this.birthday = birthday;
    }

    public Timestamp getGraduateDate() {
        return graduateDate;
    }

    public void setGraduateDate(Timestamp graduateDate) {
        this.graduateDate = graduateDate;
    }

    public String getGraduateFrom() {
        return graduateFrom;
    }

    public void setGraduateFrom(String graduateFrom) {
        this.graduateFrom = graduateFrom;
    }

    public String getDegree() {
        return degree;
    }

    public void setDegree(String degree) {
        this.degree = degree;
    }

    public String getMajor() {
        return major;
    }

    public void setMajor(String major) {
        this.major = major;
    }

}

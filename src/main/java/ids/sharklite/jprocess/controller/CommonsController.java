package ids.sharklite.jprocess.controller;


import ids.sharklite.jprocess.dao.EmpUserDao;
import ids.sharklite.jprocess.dao.OnlineUserDao;
import ids.sharklite.jprocess.entity.EmpUser;
import ids.sharklite.jprocess.entity.OnlineUser;
import ids.sharklite.jprocess.onlineinformation.CurrentOnline;
import ids.sharklite.jprocess.util.HttpUtil;
import ids.sharklite.jprocess.util.StringUtil;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Map;


@RestController
@RequestMapping("/commons")
public class CommonsController {

    @Resource
    private EmpUserDao empUserDao;

    @Resource
    private OnlineUserDao onlineUserDao;


    @RequestMapping("/loginCode")
    public String loginCode(HttpSession session) {
        String code = StringUtil.digestHex(String.valueOf(System.nanoTime()));
        session.setAttribute("loginCode", code);
        return code;
    }


    @RequestMapping("/online")
    public String online(HttpSession session) {
        return session.getAttribute("user") == null ? "0" : "1";
    }

    @RequestMapping("/hrAdmin")
    public int hrAdmin() {
        int i = 1;
        //todo ??????????? i=1
        return i;
    }

    @RequestMapping("/sysAdmin")
    public int sysAdmin() {
        int i = 1;
        //todo ?????????? i=1
        return i;
    }


    @RequestMapping("/logout")
    public void logout(HttpSession session) {
        session.invalidate();
    }

    @RequestMapping(value = "/checkLogin")
    public Map<String, Object> checkLogin(String logName, String password, String loginCode, HttpSession session, HttpServletRequest request) {
        Map<String, Object> map = HttpUtil.getResponseBody(false);
        String code = StringUtil.notNull((String) session.getAttribute("loginCode"));
        if (!code.equals(loginCode) || loginCode.length() == 0) {
            map.put(HttpUtil.MESSAGE, "登录方式验证未通过,请刷新页面后重试.");
            return map;
        }
        EmpUser user = empUserDao.findByLogName(logName);
        if (user == null) {
            map.put(HttpUtil.MESSAGE, "无此用户.");
        } else {
            if (user.isBlocked() || user.isDeleted()) {
                map.put(HttpUtil.MESSAGE, "此用户不存在或被禁用.");
            } else if (!StringUtil.validatePassword(password, user.getPassword())) {
                map.put(HttpUtil.MESSAGE, "密码不正确.");
            } else {
                OnlineUser onlineUser = (OnlineUser) session.getAttribute("user");
                String ip = HttpUtil.getRemoteHost(request);
                if (onlineUser != null && !ip.equals(onlineUser.getHost())) {
                    map.put(HttpUtil.MESSAGE, "用户已登录!");
                    return map;
                } else {
                    onlineUser = onlineUserDao.findById(user.getId());
                    onlineUser.setHost(ip);
                    session.setAttribute("user", onlineUser);
                    map.put(HttpUtil.SUCCESS, true);
                    map.put(HttpUtil.MESSAGE, "");
                }
                CurrentOnline.ONLINE_USERS.put(user.getId(), onlineUser);
            }
        }
        return map;
    }


}

package ids.sharklite.jprocess.listener;

import ids.sharklite.jprocess.entity.OnlineUser;
import ids.sharklite.jprocess.onlineinformation.CurrentOnline;

import javax.servlet.annotation.WebListener;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

@WebListener
public class SessionListener implements HttpSessionListener {

    public void sessionCreated(HttpSessionEvent se) {

    }

    public void sessionDestroyed(HttpSessionEvent se) {
        OnlineUser user = (OnlineUser) se.getSession().getAttribute("user");
        if (user != null)
            CurrentOnline.ONLINE_USERS.remove(user.getId());
    }
}

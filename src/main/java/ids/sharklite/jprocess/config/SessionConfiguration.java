package ids.sharklite.jprocess.config;

import ids.sharklite.jprocess.listener.SessionListener;
import org.springframework.boot.web.servlet.ServletListenerRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
public class SessionConfiguration  {
    //注册session监听器;
    @Bean
    public ServletListenerRegistrationBean<SessionListener> servletListenerRegistrationBean() {
        ServletListenerRegistrationBean<SessionListener> slrBean = new ServletListenerRegistrationBean<>();
        slrBean.setListener(new SessionListener());
        return slrBean;
    }

}

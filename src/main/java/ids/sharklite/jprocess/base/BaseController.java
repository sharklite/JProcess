package ids.sharklite.jprocess.base;


import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;


public abstract class BaseController {


    @InitBinder
    protected void initBinder(WebDataBinder binder) {
        binder.registerCustomEditor(java.sql.Date.class, new DatetimeEditor());
    }

}

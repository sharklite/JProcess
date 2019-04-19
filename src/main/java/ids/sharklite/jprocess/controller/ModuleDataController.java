package ids.sharklite.jprocess.controller;


import ids.sharklite.jprocess.base.BaseController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/data")
@RestController
public class ModuleDataController extends BaseController {

    @RequestMapping("/todo")
    public String todo(){
        return "{}";
    }

    @RequestMapping("/handled_progressing")
    public String handledProgressing(){
        return "{}";
    }

    @RequestMapping("/done")
    public String done(){
        return "{}";
    }

    @RequestMapping("/starred")
    public String starred(){
        return "{}";
    }


    @RequestMapping("/do_process")
    public String doProcess(){
        return "{}";
    }

    @RequestMapping("/view_process")
    public String viewProcess(){
        return "{}";
    }

}

//由于采用了 script defer, 生成的脚本文件将在页面加载完成后执行
import {browser, getNonCache, getParameterValue, isBlankString, isObject} from "./base/utils";
import {op_todo} from "./modules/todo";
import {op_progressing} from "./modules/recent_progressing";
import {op_starred} from "./modules/starred";
import {op_done} from "./modules/done";
import Vue = vuejs.Vue;


//-------------- begin -------------
// 定义变量，常量，方法
const objTitle = document.querySelectorAll("title").item(0);
const objHeadlineTitle = <HTMLElement>document.querySelector("#headline_title");
let currentModule: string = "todo";
export const $$ = mdui.JQ;
export const router = new Map<string, (data: Response) => void>();
export const action = new Map<string, string>();
export const vue = new Map<string, Vue>();

//加载动画
let loadTime: number;
let prevVue: Vue;
let loadingObj: HTMLElement = <HTMLElement>document.querySelector("#loading");
let loading = false;

function startLoad() {
    loading = true;
    $$(loadingObj).removeClass("v_hidden");
    //加载时失败，动画关闭
    loadTime = window.setTimeout(function () {
        prevVue.$data.seen = true;
        stopLoad();
    }, 5000);
}

function stopLoad() {
    loading = false;
    window.clearTimeout(loadTime);
    $$(loadingObj).addClass("v_hidden");
}

//加载动画 ----end

const drawer = new mdui.Drawer('#drawer', {
    "overlay": false
});
window.addEventListener("popstate", function (evt) {
    const state: any = evt.state;
    if (isObject(state) && state["module"] != null) {
        switchModule(state["module"], true);
    }
});

//各视图文件的最外层元素的id必须为对应的module
function showViewByModule(module: string): boolean {
    let v = vue.get(currentModule);
    if (v) {
        //隐藏原显示内容
        v.$data.seen = false;
        prevVue = v;
        //切换显示的module
        currentModule = module;
        return true;
    } else {
        mdui.alert("加载页面超时，请刷新页面.");
    }
    return false;
}

//先隐藏原页面的模板，再加载对应的数据，再显示新的页面
function switchModule(module: string, checked: boolean = false) {
    checkOnline().then(online => {
        if (!online) {
            dialogLogout();
            return;
        }
        module = module ? module : currentModule;
        checked = checked || (module !== currentModule && router.has(module));
        if (checked && showViewByModule(module)) {//切换后的处理函数
            startLoad();
            let dataURL = action.get(module) || ("data/" + module);
            fetch(dataURL).then((res) => {
                let handler = router.get(module);
                if (handler)
                    handler(res);
            }).then(() => {
                let v = vue.get(module);//显示切换后内容,显示加载动画
                window.setTimeout(function () {
                    if (v) {
                        v.$data.seen = true;
                        stopLoad();
                    }
                }, 1200);
            });
        }
    });

    //移动设备上自动收回抽屉
    if (browser.mobile) {
        drawer.close();
    }
}


function dialogLogout() {
    mdui.dialog(<any>{
        title: '提示',
        modal: true,
        closeOnEsc: false,
        closeOnConfirm: false,
        closeOnCancel: false,
        content: "登录超时,请点击确定前往登录.",
        buttons: [
            {
                text: '确定',
                onClick: function () {
                    return false;
                }
            }
        ],
        onClosed: function () {
            window.location.replace("html/login.html");
        }
    });
}

/**
 * autoTask 是否在定时器中执行的
 * **/
async function checkOnline(): Promise<boolean> {
    return await fetch("commons/online?cache=" + getNonCache()).then(res => {
        return res.text();
    }).then(res => {
        return res == '1';
    });
}

//管理员身份线状态检查
function checkAdmin() {
    fetch("commons/sysAdmin").then((res) => {
        return res.text();
    }).then(res => {
        if (res == '1')
            $$("#engine").removeClass("v_hidden");
        else
            $$("#engine").remove();
    });
    fetch("commons/hrAdmin").then((res) => {
        return res.text()
    }).then(res => {
        if (res == '1')
            $$("#staff").removeClass("v_hidden");
        else
            $$("#staff").remove();
    });
}

//在线状态检查
function checkOnlineTask() {
    window.setInterval(function () {
        checkOnline().then(online => {
            if (!online)
                dialogLogout();
        });
    }, 1000 * 60 * 30);
}


function setRouter(module: string, handler?: (data: Response) => void, dataURL?: string, viewURL?: string) {
    handler = handler ? handler : () => {
        console.log("模块[" + module + "]未定义回调处理函数!")
    };
    router.set(module, handler);
    if (!dataURL || isBlankString(dataURL)) {
        dataURL = "data/" + module;
    }
    action.set(module, dataURL);
}


//添加视图组件
async function addModuleTemplates(): Promise<boolean> {
    let obj = document.body;
    if (obj) {
        let html = await fetch("html/module.html?t=" + getNonCache()).then(res => {
            return res.text()
        });
        obj.insertAdjacentHTML("beforeend", html);
        addVue();
        return true;
    }
    return false;
}


function addVue() {
    vue.set("todo", new Vue(op_todo));
    vue.set("recent_progressing", new Vue(op_progressing));
    vue.set("starred", new Vue(op_starred));
    vue.set("done", new Vue(op_done));





}


function addRouters() {

    //通用注册
    document.querySelectorAll(".module_html").forEach(
        el => setRouter(el.id)
    );

    //具体模块
    setRouter("todo", function (res: Response) {

    });


    setRouter("recent_progressing", function (res: Response) {

    });

    setRouter("done", function (res: Response) {

    });

    setRouter("starred", function (res: Response) {

    });




}


//-------------- end -------------


/***
 * 以下内容需要再页面加载完成后执行，模拟在window.onload中执行故将js放在文档结束处
 ***/

//模块注册
addRouters();
//开始定时检查online
checkOnlineTask();
//检查权限
checkAdmin();


//登录时检测一次在线状态和加载视图
checkOnline().then((online) => {
    if (online) {
        //添加视图组件后
        if (addModuleTemplates()) {
            switchModule(getParameterValue(window.location.href, "curr_m"), true);
            window.history.replaceState(null, document.title, "index.html");
            mdui.mutation();
        }
    } else {
        window.location.replace("html/login.html");
    }

});


$$('#drawer').find("a.mdui-list-item").on("mouseover", function () {
    $$(this).find(".small_icon").removeClass("v_hidden");
}).on("mouseout", function () {
    $$(this).find(".small_icon").addClass("v_hidden");
}).on("click", function () {//drawer导航
    if (loading)
        return false;
    //header title 显示区
    let link = <HTMLLinkElement>this;
    $$('#drawer').find(".mdui-list-item-active").removeClass("mdui-list-item-active");
    $$(link).addClass("mdui-list-item-active");
    //module切换
    let module = link.getAttribute("data-module");
    if (module) {
        objTitle.innerHTML = objHeadlineTitle.innerHTML = $$(link).find(".mdui-list-item-content").text();
        window.history.pushState({"module": module}, document.title, window.location.href);
        switchModule(module);
    } else {
        let target = link.getAttribute("target") || link.id;
        window.open(link.href, target)
    }
    //屏蔽a标签的跳转
    return false;
});

//header上的按钮
$$("#settings").on("click", function () {
    mdui.alert("待建设");
});
$$("#logout").on("click", function () {
    fetch("commons/logout").then(() => {
        window.location.replace("html/login.html");
    });
});
//显示body
$$(document.body).removeClass("v_hidden");


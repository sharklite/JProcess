//由于采用了 script defer, 生成的脚本文件将在页面加载完成后执行
import {browser, getNonCache, isObject} from "./base/utils";

//-------------- begin -------------
// 定义变量，常量，方法
const headTitle = document.querySelectorAll("title").item(0);
const headlineTitle = <HTMLElement>document.querySelector("#headline_title");
const main_container = <HTMLIFrameElement>document.getElementById("main_container");
let currentModule: string = "todo";
export const $$ = mdui.JQ;


//加载动画
const load = (function () {
    class Load {
        loading = false;
        private loadTime = 0;
        private prevURL = "pages/blank.html";
        private loadingObj = <HTMLDivElement>document.getElementById("loading");
        stop = () => {
            window.clearTimeout(this.loadTime);
            $$(this.loadingObj).addClass("v_hidden");
            main_container.style.display = "block";
            this.loading = false;
        };
        start = () => {
            if (this.loading)
                return;
            main_container.style.display = "none";
            $$(this.loadingObj).removeClass("v_hidden");
            this.prevURL = (<Window>main_container.contentWindow).location.href;
            this.loading = true;
            //加载时失败，动画关闭
            this.loadTime = window.setTimeout(() => {
                if (this.loading)
                    main_container.src = this.prevURL;
                this.stop();
            }, 8000);
        };
    }

    return new Load();
}());
//加载动画 ---- end -----


const drawer = new mdui.Drawer('#drawer', {
    "overlay": false
});
window.addEventListener("popstate", function (evt) {
    const state: any = evt.state;
    if (isObject(state) && state["module"] != null) {
        switchModule(state["module"], true);
    }
});


//先隐藏原页面的模板，再加载对应的数据，再显示新的页面
function switchModule(module: string, checked: boolean = false) {
    checkOnline().then(online => {
        if (!online) {
            dialogLogout();
            return;
        }
        module = module ? module : currentModule;
        checked = checked || (module !== currentModule);
        if (checked) {//切换后的处理函数
            load.start();//iframe的onload里关闭动画
            currentModule = module;
            main_container.src = "pages/module/" + module + ".html";
            window.history.pushState({"module": module}, document.title, window.location.href);
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
            window.location.replace("pages/login.html");
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

//-------------- end -------------


/***
 * 以下内容需要再页面加载完成后执行，模拟在window.onload中执行故将js放在文档结束处
 ***/

$$(() => {
    //开始定时检查online
    checkOnlineTask();
    //检查权限
    checkAdmin();
    //登录时检测一次在线状态和加载视图
    checkOnline().then((online) => {
        if (online) {
            switchModule(currentModule, true);
            window.history.replaceState(null, document.title, "index.html");
            $$(document.body).removeClass("v_hidden");
        } else {
            window.location.replace("pages/login.html");
        }
    });

    $$('#drawer').find("a.mdui-list-item").on("mouseover", function () {
        $$(this).find(".small_icon").removeClass("v_hidden");
    }).on("mouseout", function () {
        $$(this).find(".small_icon").addClass("v_hidden");
    }).on("click", function () {//drawer导航
        if (load.loading)
            return false;
        //header title 显示区
        let link = <HTMLLinkElement>this;
        $$('#drawer').find(".mdui-list-item-active").removeClass("mdui-list-item-active");
        $$(link).addClass("mdui-list-item-active");
        //module切换
        let module = link.getAttribute("data-module");
        if (module) {
            headTitle.innerHTML = headlineTitle.innerHTML = $$(link).find(".mdui-list-item-content").text();
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
            window.location.replace("pages/login.html");
        });
    });

    //main_container自适应高度
    (function (ifr: HTMLIFrameElement) {
        let height: number = 0;

        function reInitContainerIframe() {
            if (height != parseInt(<string>ifr.style.height)) {
                let contentWindow: Window = <Window>ifr.contentWindow;
                let bHeight = contentWindow.document.body.scrollHeight;
                let dHeight = contentWindow.document.documentElement.scrollHeight;
                height = Math.max(bHeight, dHeight);
                main_container.style.height = height + "px";
            }
        }

        window.setInterval(reInitContainerIframe, 1200);
        ifr.onload = function () {
            reInitContainerIframe();
            window.setTimeout(function () {
                load.stop();
            }, 800);
        };
        window.onresize = function () {
            reInitContainerIframe();
        };
    }(main_container));

    mdui.mutation();

});

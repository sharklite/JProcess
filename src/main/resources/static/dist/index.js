var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
define(["require", "exports", "./base/utils", "./component"], function (require, exports, utils_1, component_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    //-------------- begin -------------
    // 定义变量，常量，方法
    const objTitle = document.querySelectorAll("title").item(0);
    const objHeadlineTitle = document.querySelector("#headline_title");
    let currentModule = "todo";
    exports.$$ = mdui.JQ;
    exports.router = new Map();
    exports.action = new Map();
    exports.template = new Set();
    exports.vue = new Map();
    //加载动画
    let loadTime;
    let prevVue;
    let loadingObj = document.querySelector("#loading");
    let loading = false;
    function startLoad() {
        loading = true;
        exports.$$(loadingObj).removeClass("v_hidden");
        //加载时失败，动画关闭
        loadTime = window.setTimeout(function () {
            prevVue.$data.seen = true;
            stopLoad();
        }, 5000);
    }
    function stopLoad() {
        loading = false;
        window.clearTimeout(loadTime);
        exports.$$(loadingObj).addClass("v_hidden");
    }
    //加载动画 ----end
    const drawer = new mdui.Drawer('#drawer', {
        "overlay": false
    });
    window.addEventListener("popstate", function (evt) {
        const state = evt.state;
        if (utils_1.isObject(state) && state["module"] != null) {
            switchModule(state["module"], true);
        }
    });
    //各视图文件的最外层元素的id必须为对应的module
    function showViewByModule(module) {
        let v = exports.vue.get(currentModule);
        if (v) {
            //隐藏原显示内容
            v.$data.seen = false;
            prevVue = v;
            //切换显示的module
            currentModule = module;
            return true;
        }
        else {
            mdui.alert("加载页面超时，请刷新页面.");
        }
        return false;
    }
    //先隐藏原页面的模板，再加载对应的数据，再显示新的页面
    function switchModule(module, checked = false) {
        checkOnline().then(online => {
            if (!online) {
                dialogLogout();
                return;
            }
            module = module ? module : currentModule;
            checked = checked || (module !== currentModule && exports.router.has(module));
            if (checked && showViewByModule(module)) { //切换后的处理函数
                startLoad();
                let dataURL = exports.action.get(module) || ("data/" + module);
                fetch(dataURL).then((res) => {
                    let handler = exports.router.get(module);
                    if (handler)
                        handler(res);
                }).then(() => {
                    let v = exports.vue.get(module); //显示切换后内容,显示加载动画
                    window.setTimeout(function () {
                        mdui.mutation("#" + module);
                        if (v) {
                            v.$data.seen = true;
                            stopLoad();
                        }
                    }, 1200);
                });
            }
        });
        //移动设备上自动收回抽屉
        if (utils_1.browser.mobile) {
            drawer.close();
        }
    }
    function dialogLogout() {
        mdui.dialog({
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
    function checkOnline() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield fetch("commons/online?cache=" + utils_1.getNonCache()).then(res => {
                return res.text();
            }).then(res => {
                return res == '1';
            });
        });
    }
    //管理员身份线状态检查
    function checkAdmin() {
        fetch("commons/sysAdmin").then((res) => {
            return res.text();
        }).then(res => {
            if (res == '1')
                exports.$$("#engine").removeClass("v_hidden");
            else
                exports.$$("#engine").remove();
        });
        fetch("commons/hrAdmin").then((res) => {
            return res.text();
        }).then(res => {
            if (res == '1')
                exports.$$("#staff").removeClass("v_hidden");
            else
                exports.$$("#staff").remove();
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
    function setRouter(module, handler, dataURL, viewURL) {
        handler = handler ? handler : () => {
            console.log("模块[" + module + "]未定义回调处理函数!");
        };
        exports.router.set(module, handler);
        if (!dataURL || utils_1.isBlankString(dataURL)) {
            dataURL = "data/" + module;
        }
        exports.action.set(module, dataURL);
        if (viewURL) {
            exports.template.add(viewURL);
        }
    }
    //添加视图组件
    function addModuleTemplates() {
        return __awaiter(this, void 0, void 0, function* () {
            let obj = document.body;
            if (obj) {
                let html = yield fetch("html/module.html?t=" + utils_1.getNonCache()).then(res => {
                    return res.text();
                });
                obj.insertAdjacentHTML("beforeend", html);
                let values = exports.template.values();
                html = "";
                for (let t of values) {
                    html += yield fetch(t).then(res => {
                        return res.text();
                    });
                }
                obj.insertAdjacentHTML("beforeend", html);
                addVue();
                return true;
            }
            return false;
        });
    }
    function addVue() {
        let keys = exports.router.keys();
        for (let k of keys) {
            let data = component_1.componentOptions.get(k);
            if (data)
                exports.vue.set(k, new Vue(data));
        }
    }
    function addRouters() {
        //注册模块
        setRouter("todo", function (res) {
        });
        setRouter("handled_progressing", function (res) {
        });
        setRouter("done", function (res) {
        });
        setRouter("starred", function (res) {
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
                switchModule(utils_1.getParameterValue(window.location.href, "curr_m"), true);
                window.history.replaceState(null, document.title, "index.html");
            }
        }
        else {
            window.location.replace("html/login.html");
        }
    });
    exports.$$('#drawer').find("a.mdui-list-item").on("mouseover", function () {
        exports.$$(this).find(".small_icon").removeClass("v_hidden");
    }).on("mouseout", function () {
        exports.$$(this).find(".small_icon").addClass("v_hidden");
    }).on("click", function () {
        if (loading)
            return false;
        //header title 显示区
        let link = this;
        exports.$$('#drawer').find(".mdui-list-item-active").removeClass("mdui-list-item-active");
        exports.$$(link).addClass("mdui-list-item-active");
        //module切换
        let module = link.getAttribute("data-module");
        if (module) {
            objTitle.innerHTML = objHeadlineTitle.innerHTML = exports.$$(link).find(".mdui-list-item-content").text();
            window.history.pushState({ "module": module }, document.title, window.location.href);
            switchModule(module);
        }
        else {
            let target = link.getAttribute("target") || link.id;
            window.open(link.href, target);
        }
        //屏蔽a标签的跳转
        return false;
    });
    //header上的按钮
    exports.$$("#settings").on("click", function () {
        mdui.alert("待建设");
    });
    exports.$$("#logout").on("click", function () {
        fetch("commons/logout").then(() => {
            window.location.replace("html/login.html");
        });
    });
    mdui.mutation();
});
//# sourceMappingURL=index.js.map
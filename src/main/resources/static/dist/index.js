var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
define(["require", "exports", "./base/utils"], function (require, exports, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const headTitle = document.querySelectorAll("title").item(0);
    const headlineTitle = document.querySelector("#headline_title");
    const main_container = document.getElementById("main_container");
    let currentModule = "todo";
    exports.$$ = mdui.JQ;
    const load = (function () {
        class Load {
            constructor() {
                this.loading = false;
                this.loadTime = 0;
                this.prevURL = "pages/blank.html";
                this.loadingObj = document.getElementById("loading");
                this.stop = () => {
                    window.clearTimeout(this.loadTime);
                    exports.$$(this.loadingObj).addClass("v_hidden");
                    main_container.style.display = "block";
                    this.loading = false;
                };
                this.start = () => {
                    if (this.loading)
                        return;
                    main_container.style.display = "none";
                    exports.$$(this.loadingObj).removeClass("v_hidden");
                    this.prevURL = main_container.contentWindow.location.href;
                    this.loading = true;
                    this.loadTime = window.setTimeout(() => {
                        if (this.loading)
                            main_container.src = this.prevURL;
                        this.stop();
                    }, 8000);
                };
            }
        }
        return new Load();
    }());
    const drawer = new mdui.Drawer('#drawer', {
        "overlay": false
    });
    window.addEventListener("popstate", function (evt) {
        const state = evt.state;
        if (utils_1.isObject(state) && state["module"] != null) {
            switchModule(state["module"], true);
        }
    });
    function switchModule(module, checked = false) {
        checkOnline().then(online => {
            if (!online) {
                dialogLogout();
                return;
            }
            module = module ? module : currentModule;
            checked = checked || (module !== currentModule);
            if (checked) {
                load.start();
                currentModule = module;
                main_container.src = "pages/module/" + module + ".html";
                window.history.pushState({ "module": module }, document.title, window.location.href);
            }
        });
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
                window.location.replace("pages/login.html");
            }
        });
    }
    function checkOnline() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield fetch("commons/online?cache=" + utils_1.getNonCache()).then(res => {
                return res.text();
            }).then(res => {
                return res == '1';
            });
        });
    }
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
    function checkOnlineTask() {
        window.setInterval(function () {
            checkOnline().then(online => {
                if (!online)
                    dialogLogout();
            });
        }, 1000 * 60 * 30);
    }
    exports.$$(() => {
        checkOnlineTask();
        checkAdmin();
        checkOnline().then((online) => {
            if (online) {
                switchModule(currentModule, true);
                window.history.replaceState(null, document.title, "index.html");
                exports.$$(document.body).removeClass("v_hidden");
            }
            else {
                window.location.replace("pages/login.html");
            }
        });
        exports.$$('#drawer').find("a.mdui-list-item").on("mouseover", function () {
            exports.$$(this).find(".small_icon").removeClass("v_hidden");
        }).on("mouseout", function () {
            exports.$$(this).find(".small_icon").addClass("v_hidden");
        }).on("click", function () {
            if (load.loading)
                return false;
            let link = this;
            exports.$$('#drawer').find(".mdui-list-item-active").removeClass("mdui-list-item-active");
            exports.$$(link).addClass("mdui-list-item-active");
            let module = link.getAttribute("data-module");
            if (module) {
                headTitle.innerHTML = headlineTitle.innerHTML = exports.$$(link).find(".mdui-list-item-content").text();
                switchModule(module);
            }
            else {
                let target = link.getAttribute("target") || link.id;
                window.open(link.href, target);
            }
            return false;
        });
        exports.$$("#settings").on("click", function () {
            mdui.alert("待建设");
        });
        exports.$$("#logout").on("click", function () {
            fetch("commons/logout").then(() => {
                window.location.replace("pages/login.html");
            });
        });
        (function (ifr) {
            let height = 0;
            function reInitContainerIframe() {
                if (height != parseInt(ifr.style.height)) {
                    let contentWindow = ifr.contentWindow;
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
});
//# sourceMappingURL=index.js.map
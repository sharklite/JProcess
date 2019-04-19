define(["require", "exports", "./base/md", "./base/utils"], function (require, exports, md_1, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const $$ = mdui.JQ;
    let robot = true;
    let loginCode = "";
    $$(function () {
        let inst = new mdui.Dialog("#login_dial", {
            overlay: true,
            history: false,
            modal: true,
            closeOnEsc: false,
            closeOnCancel: false,
            closeOnConfirm: false,
            destroyOnClosed: false
        });
        inst.open();
        fetch("../commons/loginCode").then(res => {
            return res.text();
        }).then(code => {
            loginCode = code;
        }).catch(() => {
            loginCode = "";
        });
        $$("#reset_btn").on("click", function () {
            $$("#login_dial").find("input").val("");
        });
        window.addEventListener("mousemove", function () {
            robot = false;
        });
        window.addEventListener("click", function () {
            robot = false;
        });
        window.addEventListener("keydown", function (evt) {
            robot = false;
            if (evt.key.toLowerCase() === "enter") {
                loginSubmit();
            }
        });
        $$("#sub_form").on("click", loginSubmit);
        function loginSubmit() {
            $$("#logName_help").css("display", "none");
            $$("#password_help").css("display", "none");
            let logName = $$("#logName").val();
            let password = $$("#password").val();
            if (!logName) {
                $$("#logName_help").css("display", "");
                return;
            }
            if (!password) {
                $$("#password_help").css("display", "");
                return;
            }
            if (robot) {
                return;
            }
            if (!loginCode) {
                inst.close();
                utils_1.mduiDialog("连接服务器故障,请刷新后重试.", '关闭', function () {
                    inst.open();
                });
                return;
            }
            password = md_1.hex_md(password);
            let url = "../commons/checkLogin?t=" + utils_1.getNonCache();
            url = utils_1.setParam(url, "logName", logName);
            url = utils_1.setParam(url, "password", password);
            url = utils_1.setParam(url, "loginCode", loginCode);
            fetch(url).then(res => {
                return res.json();
            }).then(res => {
                if (res.success) {
                    window.location.href = "../index.html";
                }
                else {
                    inst.close();
                    utils_1.mduiDialog(res.message, '关闭', function () {
                        inst.open();
                    });
                }
            });
        }
    });
});
//# sourceMappingURL=login.js.map
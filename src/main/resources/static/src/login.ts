import {hex_md} from "./base/md";
import {getNonCache, mduiDialog, setParam} from "./base/utils";

const $$ = mdui.JQ;
let robot = true;
let loginCode: string = "";//表示只能从这个页面登录的验证码
$$(function () {
    let inst = new mdui.Dialog("#login_dial", {
        /** 打开对话框时是否显示遮罩。 */
        overlay: true,
        /** 打开对话框时是否添加 url hash，若为 true，则打开对话框后可用过浏览器的后退按钮或 Android 的返回键关闭对话框。 */
        history: false,
        /** 是否模态化对话框。为 false 时点击对话框外面的区域时关闭对话框，否则不关闭。 */
        modal: true,
        /** 按下 Esc 键时是否关闭对话框。 */
        closeOnEsc: false,
        /** 按下取消按钮时是否关闭对话框。 */
        closeOnCancel: false,
        /** 按下确认按钮时是否关闭对话框。 */
        closeOnConfirm: false,
        /** 关闭对话框后是否自动销毁对话框。 */
        destroyOnClosed: false
    });
    inst.open();


    fetch("../commons/loginCode").then(res => {
        return res.text();
    }).then(code => {
        console.log(code);
        loginCode = code;
    }).catch(() => {
        loginCode = "";
    });

    $$("#reset_btn").on("click",function () {
        $$("#login_dial").find("input").val("");
    });

    //人类行为检测
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
            mduiDialog("连接服务器故障,请刷新后重试.", '关闭', function () {
                inst.open();
            });
            return;
        }
        password = hex_md(password);
        let url = "../commons/checkLogin?t=" + getNonCache();
        url = setParam(url, "logName", logName);
        url = setParam(url, "password", password);
        url = setParam(url, "loginCode", loginCode);
        fetch(url).then(res => {
            return res.json();
        }).then(res => {
            if (res.success) {
                window.location.href = "../index.html";
            } else {
                inst.close();
                mduiDialog(res.message, '关闭', function () {
                    inst.open();
                });
            }
        });
    }
});





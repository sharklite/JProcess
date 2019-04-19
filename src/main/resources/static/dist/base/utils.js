define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.browser = (function () {
        let o = {};
        let ua = window.navigator.userAgent.toLowerCase();
        let s;
        //顺序不能变
        (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? o.ie = s[1] : //iE 6~10
            (s = ua.match(/msie ([\d.]+)/)) ? o.ie = s[1] : //IE 11
                (s = ua.match(/firefox\/([\d.]+)/)) ? o.firefox = s[1] : //FireFox
                    (s = ua.match(/edge\/([\d.]+)/)) ? o.edge = s[1] : //Edge
                        (s = ua.match(/opr\/([\d.]+)/)) ? o.opera = s[1] : //Opera with chromium
                            (s = ua.match(/chrome\/([\d.]+)/)) ? o.chrome = s[1] : //Chrome
                                (s = ua.match(/opera.([\d.]+)/)) ? o.opera = s[1] : //Opera
                                    (s = ua.match(/version\/([\d.]+).*safari/)) ? o.safari = s[1] : 0; //Safari
        if (o.ie)
            o.name = "ie";
        else
            o.name = s[0].replace(/[^/dw]+$/, "").replace(/[()_<>:",.\\\/;'\[\]]/im, "").trim();
        o.version = parseInt(s[1]) || 0;
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            o.mobile = true;
        }
        o.app = false;
        o.ie = (!!o.ie) || o.name === "ie";
        return o;
    })();
    let cache = 0;
    function getNonCache() {
        cache = cache === 100 ? 0 : cache;
        return cache++;
    }
    exports.getNonCache = getNonCache;
    //url 操作
    function getParameterValue(url, parameterName) {
        let r = getURLParameters(url)[parameterName];
        return isDefined(r) ? r : "";
    }
    exports.getParameterValue = getParameterValue;
    //替换URL中的参数
    // pathname + [search] + [hash]
    // cannot set parameter to hash
    function setParam(url, name, value) {
        if (!url || isBlankString(url))
            return ("?" + name + "=" + value);
        let urls = url.split("#");
        let hash = urls[1];
        hash = hash ? ("#" + hash) : "";
        url = urls[0];
        if (url.indexOf("?") == -1) {
            url += "?";
        }
        let begin, end;
        begin = url.indexOf(name + "=");
        if (begin == -1) {
            url = url + "&" + name + "=" + value;
        }
        else {
            end = url.indexOf("&", begin + 1);
            let u = url.substring(0, begin) + name + "=" + value;
            if (end > -1)
                u = u + url.substring(end);
            url = u;
        }
        return url.replace("?&", "?").replace("&&", "&") + hash;
    }
    exports.setParam = setParam;
    function setParams(url, obj) {
        if (obj && isObject(obj)) {
            for (let i in obj)
                url = setParam(url, i, obj[i]);
        }
        return url;
    }
    exports.setParams = setParams;
    //财务转中文大写
    function decimalToChinese(money) {
        money = money.toString().replace(/[^\d.]/g, "").replace(/(\.\d{1,3}).+$/, "$1");
        let num = parseFloat(money);
        if (num == 0)
            return "零圆整";
        else if (isNaN(num))
            return "";
        let number = num.toFixed(2).split('.');
        let partNumber = number[0];
        if (partNumber.length > 12)
            return "数值超出范围！支持的最大数值为999999999999.99";
        let upperCaseChar = "零壹贰叁肆伍陆柒捌玖";
        money = "";
        let len = partNumber.length - 1;
        let i;
        for (i = 0; i <= len; i++)
            money += upperCaseChar.charAt(parseInt(partNumber.charAt(i))) + [["圆", "万", "亿"][Math.floor((len - i) / 4)], "拾", "佰", "仟"][(len - i) % 4];
        if (number.length == 2 && number[1] != "") {
            partNumber = number[1];
            for (i = 0; i < partNumber.length; i++)
                money += upperCaseChar.charAt(parseInt(partNumber.charAt(i))) + ["角", "分"][i];
        }
        money = money.replace(/零佰|零拾|零仟|零角/g, "零");
        money = money.replace(/零{2,}/g, "零");
        money = money.replace(/零(?=[圆万亿])/g, "");
        money = money.replace(/亿万/, "亿");
        money = money.replace(/^圆零?/, "");
        if (money != "" && !/分$/.test(money))
            money += "整";
        return money;
    }
    exports.decimalToChinese = decimalToChinese;
    //format
    function dateFormat(fmt, date = new Date()) {
        let o = {
            "M+": date.getMonth() + 1,
            "d+": date.getDate(),
            "h+": date.getHours(),
            "m+": date.getMinutes(),
            "s+": date.getSeconds(),
            "q+": Math.floor((date.getMonth() + 3) / 3),
            "S": date.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (date.getFullYear().toString()).substr(4 - RegExp.$1.length));
        for (let k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }
    exports.dateFormat = dateFormat;
    //得到指定对象的指定类型的父对象
    function getParentElement(element, parentType) {
        if (!parentType || !element)
            return null;
        parentType = parentType.toUpperCase();
        do {
            element = element.parentElement;
        } while (element && element.tagName.toUpperCase() !== parentType);
        return element;
    }
    exports.getParentElement = getParentElement;
    function toBoolean(v) {
        return v === true || toInt(v) == 1 || String(v).toLowerCase().trim() === "true";
    }
    exports.toBoolean = toBoolean;
    /**
     * Quick object check - this is primarily used to tell
     * Objects from primitive values when we know the value
     * is a JSON-compliant type.
     * @Parameter JSON format is a object
     */
    function isObject(v) {
        return v != null && typeof v === 'object';
    }
    exports.isObject = isObject;
    function isDefined(v) {
        return v != null && v != void 0;
    }
    exports.isDefined = isDefined;
    //是否为空白字符串
    function isBlankString(s) {
        return s === '' || s.trim() === '';
    }
    exports.isBlankString = isBlankString;
    //一个字符串转换为数值型,否则返回本身或默认值
    function toNumber(s, defaultVal = 0) {
        let v = parseFloat(s);
        return isNaN(v) ? defaultVal : v;
    }
    exports.toNumber = toNumber;
    function toInt(s) {
        return Math.round(toNumber(s));
    }
    exports.toInt = toInt;
    function getURLParameters(url) {
        let o = {};
        if (!url || url.length == 0)
            return o;
        let i = url.indexOf("?");
        if (i !== -1)
            url = url.substring(i + 1);
        let sharpIndex = url.indexOf("#");
        if (sharpIndex != -1)
            url = url.substring(0, sharpIndex);
        let str = url.split("&");
        for (let i = 0, len = str.length; i < len; i++) {
            let kv = str[i].split("=");
            if (kv[0])
                o[kv[0]] = kv[1];
        }
        return o;
    }
    exports.getURLParameters = getURLParameters;
    // function randomString(len: number = 0): string {
    //     let s = "";
    //     len = Math.floor(Math.abs((len)));
    //     for (let i = 0; i < len; i++) {
    //         s += Math.floor(Math.random() * 10);
    //     }
    //     return s;
    // }
    ///////
    //mdui缺少的api
    function mduiDialog(content, btnText = '关闭', onClick, onClosed) {
        let param = {
            title: '提示',
            content: content,
            buttons: [
                {
                    text: btnText,
                    close: true,
                    onClick: function () {
                        if (onClick)
                            onClick();
                    }
                }
            ],
            onClosed: function () {
                if (onClosed)
                    onClosed();
            }
        };
        mdui.dialog(param);
    }
    exports.mduiDialog = mduiDialog;
});
//# sourceMappingURL=utils.js.map
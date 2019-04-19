define(["require", "exports", "./base/utils", "./index"], function (require, exports, utils_1, index_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.componentOptions = new Map();
    function setRouter(module, handler, dataURL, viewURL) {
        handler = handler ? handler : () => {
            console.log("模块[" + module + "]未定义回调处理函数!");
        };
        index_1.router.set(module, handler);
        if (!dataURL || utils_1.isBlankString(dataURL)) {
            dataURL = "data/" + module;
        }
        index_1.action.set(module, dataURL);
        if (viewURL) {
            index_1.template.add(viewURL);
        }
    }
    function addOption(o, module) {
        let k;
        if (module) {
            k = module;
        }
        else {
            k = o.el;
            if (typeof k === 'string') {
                k = k.replace("#", "");
            }
            else if (typeof k === 'function') {
                k = (k()).id;
            }
            else {
                k = k.id;
            }
        }
        exports.componentOptions.set(k, o);
    }
    const op_done = {
        el: "#done",
        data: {
            seen: false
        },
        methods: {},
        updated: function () {
        }
    };
    const op_handled_progressing = {
        el: "#handled_progressing",
        data: {
            seen: false
        },
        methods: {},
        updated: function () {
        }
    };
    const op_starred = {
        el: "#starred",
        data: {
            seen: false
        },
        methods: {},
        updated: function () {
        }
    };
    let op_todo;
    op_todo = {
        el: "#todo",
        data: {
            seen: false,
        },
        methods: {
            starred: function (evt) {
                evt.cancelBubble = true;
                let starObj = (evt.target);
                if (starObj.tagName.toLowerCase() == "span")
                    starObj = (starObj.querySelector("i"));
                starObj.innerHTML = starObj.innerHTML == "star" ? "star_border" : "star";
            }
        },
        updated: function () {
        }
    };
    function addRouters() {
        setRouter("todo", function (r) {
        });
        setRouter("handled_progressing", function (r) {
        });
        setRouter("done", function (r) {
        });
        setRouter("starred", function (r) {
        });
        addOption(op_done);
        addOption(op_handled_progressing);
        addOption(op_starred);
        addOption(op_todo);
    }
    exports.addRouters = addRouters;
});
//# sourceMappingURL=component.js.map
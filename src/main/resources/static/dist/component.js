define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.componentOptions = new Map();
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
        exports.componentOptions.set(k, op_done);
    }
    //------------------------------------
    const op_done = {
        el: "#done",
        data: {
            seen: false
        },
        methods: {}
    };
    addOption(op_done);
    // -------------
    const op_handled_progressing = {
        el: "#handled_progressing",
        data: {
            seen: false
        },
        methods: {}
    };
    addOption(op_handled_progressing);
    //---------------------------
    const op_starred = {
        el: "#starred",
        data: {
            seen: false
        },
        methods: {}
    };
    addOption(op_starred);
    //---------------------
    const op_todo = {
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
    addOption(op_todo);
});
//-------------------
//# sourceMappingURL=component.js.map
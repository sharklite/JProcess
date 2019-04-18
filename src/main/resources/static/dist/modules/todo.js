define(["require", "exports", "../index"], function (require, exports, index_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function getTodoListItem(evt) {
        return index_1.$$(evt.target).parents(".mdui-panel-item").get(0);
    }
    let todo_list;
    exports.op_todo = {
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
            },
            remove: function (evt) {
                let el = getTodoListItem(evt);
                todo_list.close(el);
                index_1.$$(el).remove();
            }
        },
        updated: function () {
        }
    };
});

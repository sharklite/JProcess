import {$$} from "../index";

function getTodoListItem(evt: Event): HTMLElement {
    return <HTMLElement>$$(<HTMLElement>evt.target).parents(".mdui-panel-item").get(0);
}

let todo_list: any;
export const op_todo = {
    el: "#todo",
    data: {
        seen: false,
    },
    methods: {
        starred: function (evt: Event) {//是否星标
            evt.cancelBubble = true;
            let starObj = <HTMLElement>(evt.target);
            if (starObj.tagName.toLowerCase() == "span")
                starObj = <HTMLElement>(starObj.querySelector("i"));
            starObj.innerHTML = starObj.innerHTML == "star" ? "star_border" : "star";
        }
        , remove: function (evt: Event) {
            let el: HTMLElement = getTodoListItem(evt);
            todo_list.close(el);
            $$(el).remove();
        }

    }
    , updated: function () {

    }
};
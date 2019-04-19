import ComponentOption = vuejs.ComponentOption;
import {isBlankString} from "./base/utils";
import {action, router, template} from "./index";

export const componentOptions = new Map<string, ComponentOption>();

function setRouter(module: string, handler?: (data: Response) => void, dataURL?: string, viewURL?: string) {
    handler = handler ? handler : () => {
        console.log("模块[" + module + "]未定义回调处理函数!")
    };
    router.set(module, handler);
    if (!dataURL || isBlankString(dataURL)) {
        dataURL = "data/" + module;
    }
    action.set(module, dataURL);

    if (viewURL) {
        template.add(viewURL);
    }

}

function addOption(o: ComponentOption, module?: string) {
    let k;
    if (module) {
        k = module;
    } else {
        k = o.el;
        if (typeof k === 'string') {
            k = k.replace("#", "");
        } else if (typeof k === 'function') {
            k = (<Element>(k())).id;
        } else {
            k = (<Element>k).id;
        }
    }
    componentOptions.set(k, o);
}

//-----------------------


//------------------------------------

const op_done = {
    el: "#done",
    data: {
        seen: false
    },
    methods: {

    }
    , updated: function () {
        // stopLoad();
    }
};


// -------------

const op_handled_progressing = <ComponentOption>{
    el: "#handled_progressing",
    data: {
        seen: false
    },
    methods: {}
    , updated: function () {
        // stopLoad();
    }
};


//---------------------------

const op_starred = <ComponentOption>{
    el: "#starred",
    data: {
        seen: false
    },
    methods: {}
    , updated: function () {
        // stopLoad();
    }
};


//---------------------

let op_todo: ComponentOption;
op_todo = <ComponentOption>{
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
    }
    , updated: function () {
        // stopLoad();
    }
};


//-------------------

//注册模块
export function addRouters() {


    setRouter("todo", function (r: Response) {

    });

    setRouter("handled_progressing", function (r: Response) {

    });

    setRouter("done", function (r: Response) {

    });

    setRouter("starred", function (r: Response) {

    });


    addOption(op_done);

    addOption(op_handled_progressing);

    addOption(op_starred);

    addOption(op_todo);

}
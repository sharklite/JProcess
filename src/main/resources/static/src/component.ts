import ComponentOption = vuejs.ComponentOption;

export const componentOptions = new Map<String, ComponentOption>();


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
    componentOptions.set(k, op_done);
}

//------------------------------------

const op_done = {
    el: "#done",
    data: {
        seen: false
    },
    methods: {
        
    }
};
addOption(op_done);

// -------------

const op_handled_progressing = <ComponentOption>{
    el: "#handled_progressing",
    data: {
        seen: false
    },
    methods: {}
};
addOption(op_handled_progressing);

//---------------------------

const op_starred = <ComponentOption>{
    el: "#starred",
    data: {
        seen: false
    },
    methods: {}
};

addOption(op_starred);

//---------------------

const op_todo = <ComponentOption>{
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

    }
};

addOption(op_todo);

//-------------------
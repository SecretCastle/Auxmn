function Compile(el, vm) {
    this.$vm = vm;
    /**
     * 获取dom根节点
     */
    this.$el = this.isElementNode(el) ? el : document.querySelector(el);

    if (this.$el) {
        this.$fragment = this.node2fragment(this.$el);
        this.init();
        this.$el.appendChild(this.$fragment);
    }
}

Compile.prototype = {
    node2fragment(el) {
        const fragment = document.createDocumentFragment();
        let child;
        while(child = el.firstChild) {
            fragment.appendChild(child)
        }
        return fragment;
    },
    
    init() {
        this.compileElement(this.$fragment);
    },
    /**
     * 编译元素
     * @param {*} el 
     */
    compileElement(el) {
        const childNodes = el.childNodes;
        /**
         * 遍历子节点
         */
        Array.from(childNodes).forEach(node => {
            const text = node.textContent;
            const reg = /\{\{(.*)\}\}/;

            if (this.isElementNode(node)) {
                // 如果是节点，则编译这个节点的属性，如"v-"后的指令
                this.compile(node);
            } else if (this.isTextNode(node) && reg.test(text)) {
                // 单纯的文字
                this.compileText(node, RegExp.$1);
            }

            // 如果存在子节点，继续递归
            if (node.childNodes && node.childNodes.length) {
                this.compileElement(node);
            }
        })
    },
    /**
     * 编译
     * @param {*} node 
     */
    compile(node) {
        // 获得节点的属性
        const nodeAttr = node.attributes;
        // 遍历属性
        Array.from(nodeAttr).forEach(attr => {
            const attrName = attr.name;
            // 如果是以 "v-"开头的，则认定为mvvm的定义
            if (this.isDirect(attrName)) {
                // 获得事件函数名称
                const method = attr.value;
                // 获得事件类型
                const dir = attrName.substring(2);
                // 如果是以“on”开头的，则为某个事件
                if (this.isEventDirect(dir)) {
                    // 绑定事件
                    CompileUtil.eventHandler(node, this.$vm, method, dir);
                } else {
                    // 普通事件
                    CompileUtil[dir] && CompileUtil[dir](node, this.$vm, method);
                }
                node.removeAttribute(attrName);
            }
        })
    },
    compileText(node, exp) {
        CompileUtil.text(node, this.$vm, exp);
    },
    isEventDirect(attr) {
        return attr.indexOf('on') === 0;
    },
    isDirect(attr) {
        return attr.indexOf('v-') === 0;
    },
    isElementNode(el) {
        return el.nodeType === 1;
    },
    isTextNode(node) {
        return node.nodeType === 3;
    }
}

const CompileUtil = {
    class(node, vm, exp) {
        this.bind(node, vm, exp, 'class');
    },
    model(node, vm, exp) {
        console.log(exp);
        // important
        this.bind(node, vm, exp, 'model');
        let val = this._getVMVal(vm, exp);
        node.addEventListener('input', (e) => {
            const value = e.target.value;
            if (val === value) {
                return;
            }
            this._setVMVal(vm, exp, value);
            val = value;
        }, false)
    },
    text(node, vm, exp) {
        this.bind(node, vm, exp, 'text');
    },
    html(node, vm, exp) {
        this.bind(node, vm, exp, 'html');
    },
    bind(node, vm, exp, dir) {
        // 渲染第一次数据
        const updateFn = updater[dir + 'Updater'];
        updateFn && updateFn(node, this._getVMVal(vm, exp));

        // watcher here
    },
    _getVMVal(vm, exp) {
        let val = vm;
        exp = exp.split('.');
        exp.forEach( v => {
            val = val[v.trim()];
        });
        return val;
    },
    _setVMVal(vm, exp, value){
        let val = vm;
        exp = exp.split('.');
        exp.forEach((ele, i) => {
            if (i < exp.length - 1) {
                val = val[ele]
            } else {
                val[ele] = value;
            }
        });
    },
    eventHandler(node, vm, exp, dir) {
        /**
         * 事件绑定
         */
        const eventType = dir.split(':')[1];
        const method = vm.$options.method && vm.$options.method[exp];

        if (eventType && method) {
            node.addEventListener(eventType, method.bind(vm), false);
        }
    }
}

const updater = {
    textUpdater(node, value) {
        node.textContent = typeof value === 'undefined' ? '' : value
    },
    classUpdater(node, value) {

    },
    htmlUpdater(node, value) {
        node.innerHTML = typeof value === 'undefined' ? '' : value;
    },
    
    modelUpdater: function(node, value, oldValue) {
        node.value = typeof value == 'undefined' ? '' : value;
    }
}

export default Compile;
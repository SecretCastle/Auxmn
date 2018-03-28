// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
require = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof require === "function" && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof require === "function" && require;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({3:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function Observer(data) {
    this.data = data;
    this.walk(data);
}

Observer.prototype = {
    walk: function walk(data) {
        var _this = this;

        Object.keys(data).forEach(function (key) {
            _this.convert(key, data[key]);
        });
    },
    convert: function convert(key, value) {
        this.defineReactive(this.data, key, value);
    },
    defineReactive: function defineReactive(data, key, value) {
        var dep = new Dep();
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: false,
            get: function get() {
                if (dep.target) {
                    dep.depend();
                }
                return value;
            },
            set: function set(newValue) {
                if (value === newValue) {
                    return;
                }
                value = newValue;
            }
        });
    }
};

var uid = 0;

function Dep() {
    this.id = uid++;
    this.subs = [];
}

Dep.prototype = {
    addSub: function addSub(sub) {
        this.subs.push(sub);
    },
    depend: function depend() {
        Dep.target.addSub(this);
    },
    notify: function notify() {
        this.subs.forEach(function (sub) {
            sub.update();
        });
    }
};

function observe(data, vm) {
    if (!data || (typeof data === 'undefined' ? 'undefined' : _typeof(data)) !== 'object') {
        return;
    }
    return new Observer(data);
}

exports.default = observe;
},{}],4:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
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
    node2fragment: function node2fragment(el) {
        var fragment = document.createDocumentFragment();
        var child = void 0;
        while (child = el.firstChild) {
            fragment.appendChild(child);
        }
        return fragment;
    },
    init: function init() {
        this.compileElement(this.$fragment);
    },

    /**
     * 编译元素
     * @param {*} el 
     */
    compileElement: function compileElement(el) {
        var _this = this;

        var childNodes = el.childNodes;
        /**
         * 遍历子节点
         */
        Array.from(childNodes).forEach(function (node) {
            var text = node.textContent;
            var reg = /\{\{(.*)\}\}/;

            if (_this.isElementNode(node)) {
                // 如果是节点，则编译这个节点的属性，如"v-"后的指令
                _this.compile(node);
            } else if (_this.isTextNode(node) && reg.test(text)) {
                // 单纯的文字
                _this.compileText(node, RegExp.$1);
            }

            // 如果存在子节点，继续递归
            if (node.childNodes && node.childNodes.length) {
                _this.compileElement(node);
            }
        });
    },

    /**
     * 编译
     * @param {*} node 
     */
    compile: function compile(node) {
        var _this2 = this;

        // 获得节点的属性
        var nodeAttr = node.attributes;
        // 遍历属性
        Array.from(nodeAttr).forEach(function (attr) {
            var attrName = attr.name;
            // 如果是以 "v-"开头的，则认定为mvvm的定义
            if (_this2.isDirect(attrName)) {
                // 获得事件函数名称
                var method = attr.value;
                // 获得事件类型
                var dir = attrName.substring(2);
                // 如果是以“on”开头的，则为某个事件
                if (_this2.isEventDirect(dir)) {
                    // 绑定事件
                    CompileUtil.eventHandler(node, _this2.$vm, method, dir);
                } else {
                    // 普通事件
                    CompileUtil[dir] && CompileUtil[dir](node, _this2.$vm, method);
                }
                node.removeAttribute(attrName);
            }
        });
    },
    compileText: function compileText(node, exp) {
        CompileUtil.text(node, this.$vm, exp);
    },
    isEventDirect: function isEventDirect(attr) {
        return attr.indexOf('on') === 0;
    },
    isDirect: function isDirect(attr) {
        return attr.indexOf('v-') === 0;
    },
    isElementNode: function isElementNode(el) {
        return el.nodeType === 1;
    },
    isTextNode: function isTextNode(node) {
        return node.nodeType === 3;
    }
};

var CompileUtil = {
    class: function _class(node, vm, exp) {
        this.bind(node, vm, exp, 'class');
    },
    model: function model(node, vm, exp) {
        var _this3 = this;

        console.log(exp);
        // important
        this.bind(node, vm, exp, 'model');
        var val = this._getVMVal(vm, exp);
        node.addEventListener('input', function (e) {
            var value = e.target.value;
            if (val === value) {
                return;
            }
            _this3._setVMVal(vm, exp, value);
            val = value;
        }, false);
    },
    text: function text(node, vm, exp) {
        this.bind(node, vm, exp, 'text');
    },
    html: function html(node, vm, exp) {
        this.bind(node, vm, exp, 'html');
    },
    bind: function bind(node, vm, exp, dir) {
        // 渲染第一次数据
        var updateFn = updater[dir + 'Updater'];
        updateFn && updateFn(node, this._getVMVal(vm, exp));

        // watcher here
    },
    _getVMVal: function _getVMVal(vm, exp) {
        var val = vm;
        exp = exp.split('.');
        exp.forEach(function (v) {
            val = val[v.trim()];
        });
        return val;
    },
    _setVMVal: function _setVMVal(vm, exp, value) {
        var val = vm;
        exp = exp.split('.');
        exp.forEach(function (ele, i) {
            if (i < exp.length - 1) {
                val = val[ele];
            } else {
                val[ele] = value;
            }
        });
    },
    eventHandler: function eventHandler(node, vm, exp, dir) {
        /**
         * 事件绑定
         */
        var eventType = dir.split(':')[1];
        var method = vm.$options.method && vm.$options.method[exp];

        if (eventType && method) {
            node.addEventListener(eventType, method.bind(vm), false);
        }
    }
};

var updater = {
    textUpdater: function textUpdater(node, value) {
        node.textContent = typeof value === 'undefined' ? '' : value;
    },
    classUpdater: function classUpdater(node, value) {},
    htmlUpdater: function htmlUpdater(node, value) {
        node.innerHTML = typeof value === 'undefined' ? '' : value;
    },


    modelUpdater: function modelUpdater(node, value, oldValue) {
        node.value = typeof value == 'undefined' ? '' : value;
    }
};

exports.default = Compile;
},{}],2:[function(require,module,exports) {
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
                                                                                                                                                                                                                                                                               * what is mvvm
                                                                                                                                                                                                                                                                               */

var _Observer = require('./Observer');

var _Observer2 = _interopRequireDefault(_Observer);

var _Compile = require('./Compile');

var _Compile2 = _interopRequireDefault(_Compile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Jesica(options) {
    var _this = this;

    this.$options = options || {};
    this._data = this.$options.data;
    Object.keys(this._data).forEach(function (key) {
        _this._proxyData(key);
    });
    this.initComputed();
    /**
     * this -> Jesica对象
     */
    (0, _Observer2.default)(this.$options.data, this);
    this.$compile = new _Compile2.default(this.$options.el || document.body, this);
}

Jesica.prototype = {
    initComputed: function initComputed() {
        var _this2 = this;

        var computed = this.$options.computed;
        if ((typeof computed === 'undefined' ? 'undefined' : _typeof(computed)) === 'object') {
            Object.keys(computed).forEach(function (key) {
                Object.defineProperty(_this2, key, {
                    get: typeof computed[key] === 'function' ? computed[key] : computed[key].get,
                    set: function set() {}
                });
            });
        }
    },

    _proxyData: function _proxyData(key, setter, getter) {
        var me = this;
        setter = setter || Object.defineProperty(me, key, {
            configurable: false,
            enumerable: true,
            get: function proxyGetter() {
                return me._data[key];
            },
            set: function proxySetter(newVal) {
                me._data[key] = newVal;
            }
        });
    }
};

var jesica = new Jesica({
    el: '#app',
    data: {
        message: "message1"
    },
    computed: {
        computedOne: function computedOne() {
            return 'computedOne';
        },
        computedTwo: function computedTwo() {
            return 'computedTwo';
        }
    },
    method: {
        clickFn: function clickFn() {
            console.log('click me');
        }
    }
});
},{"./Observer":3,"./Compile":4}],13:[function(require,module,exports) {

var global = (1, eval)('this');
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    accept: function (fn) {
      this._acceptCallback = fn || function () {};
    },
    dispose: function (fn) {
      this._disposeCallback = fn;
    }
  };
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '59469' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.require, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.require, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + 'data.error.stack');
    }
  };
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  if (cached && cached.hot._disposeCallback) {
    cached.hot._disposeCallback();
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallback) {
    cached.hot._acceptCallback();
    return true;
  }

  return getParents(global.require, id).some(function (id) {
    return hmrAccept(global.require, id);
  });
}
},{}]},{},[13,2])
//# sourceMappingURL=/dist/cb1ca6a4f85c74493a32914ec8499aca.map
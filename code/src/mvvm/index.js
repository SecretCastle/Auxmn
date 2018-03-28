/**
 * what is mvvm
 */

import observe from './Observer';
import Compile from './Compile';

function Jesica(options) {
    this.$options = options || {};
    this._data = this.$options.data;
    Object.keys(this._data).forEach((key) => {
        this._proxyData(key);
    });
    this.initComputed();
    /**
     * this -> Jesica对象
     */
    observe(this.$options.data, this);
    this.$compile = new Compile(this.$options.el || document.body, this);
}

Jesica.prototype = {
    initComputed() {
        const computed = this.$options.computed;
        if (typeof computed === 'object') {
            Object.keys(computed).forEach(key => {
                Object.defineProperty(this, key, {
                    get: typeof computed[key] === 'function' 
                            ? computed[key] 
                            : computed[key].get,
                    set: function(){}
                })
            });
        }
    },
    _proxyData: function(key, setter, getter) {
        var me = this;
        setter = setter || 
        Object.defineProperty(me, key, {
            configurable: false,
            enumerable: true,
            get: function proxyGetter() {
                return me._data[key];
            },
            set: function proxySetter(newVal) {
                me._data[key] = newVal;
            }
        });
    },
}

const jesica = new Jesica({
    el: '#app',
    data: {
        message: "message1"
    },
    computed: {
        computedOne() {
            return 'computedOne'
        },
        computedTwo() {
            return 'computedTwo'
        }
    },
    method: {
        clickFn() {
            console.log('click me');
        }
    }
});
function Observer(data) {
    this.data = data;
    this.walk(data);
}

Observer.prototype = {
    walk(data) {
        Object.keys(data).forEach(key => {
            this.convert(key, data[key]);
        })
    },
    convert(key, value) {
        this.defineReactive(this.data, key, value);
    },
    defineReactive(data, key, value) {
        const dep = new Dep();
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: false,
            get() {
                if (dep.target) {
                    dep.depend();
                }
                return value;
            },
            set(newValue) {
                if (value === newValue) {
                    return;
                }
                value = newValue;
            }
        });
    }
}

let uid = 0;

function Dep() {
    this.id = uid++;
    this.subs = [];
}

Dep.prototype = {
    addSub(sub) {
        this.subs.push(sub);
    },
    depend() {
        Dep.target.addSub(this);
    },
    notify() {
        this.subs.forEach(sub => {
            sub.update();
        })
    }
}


function observe(data, vm) {
    if (!data || typeof data !== 'object') {
        return;
    }
    return new Observer(data)
}


export default observe;
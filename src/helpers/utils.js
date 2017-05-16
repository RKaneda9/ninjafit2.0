const utils = module.exports = {
    rand: length => Math.random().toString(36).substring(2, length || 25),

    pad: (val, length) => (("00000" + val).slice(-1 * (length || 2))),

    trim: (val, maxlength) => {
        val = val && typeof val === 'string' ? val.trim() : val;

        if (maxlength) { val = val.substr(0, maxlength); }

        return val;
    },

    toPath() { return "M" + utils.map(arguments, pos => pos.join(',')).join(' L') + ' Z'; },

    toBgUrl(url) { return `url("${url}")`},

    toFixed: (val, accuracy) => parseFloat(val.toFixed(accuracy || 3)),

    foreach: (array, callback) => {

        if (!array) { return; }

        var keys = Object.keys(array);

        for (var i = 0; i < keys.length; i++) {
            if (callback(array[keys[i]], i, keys[i]) === false) {
                return i;
            }
        }
    },

    first: (array, func, defVal) => {

        if (!(array instanceof Array)) { return defVal; }

        var keys = Object.keys(array);

        for (var i = 0; i < keys.length; i++) {
            if (func(array[keys[i]], i)) {
                return array[keys[i]];
            }
        }

        return defVal;
    },

    map: (array, func) => {

        if (typeof array != 'object') { return []; }

        var mapped, keys, val;

        mapped = [];
        keys   = Object.keys(array);

        for (var i = 0; i < keys.length; i++) {
            var val = func(array[keys[i]], keys[i], i);
            if (val) { mapped.push(val); }
        }

        return mapped;
    },

    mapObject: (obj, func) => {

        var mapped = {};

        if (!(obj instanceof Object)) { return mapped; }

        var keys = Object.keys(obj);

        for (var i = 0; i < keys.length; i++) {
            if (func(mapped, obj[keys[i]], keys[i], i) === false) {
                break;
            }
        }

        return mapped;
    },

    extend: (obj, props, override) => {
        if (!obj) obj = {};
        if (!props) { return obj; }

        let keys = Object.keys(props),
            i, val;

        for (i = 0; i < keys.length; i++) {
            val = props[keys[i]];

            if (!override && obj[keys[i]]) { continue; }

            switch (typeof val) {
                case 'string':
                case 'number':
                case 'boolean':
                    obj[keys[i]] = val;
                    break;
                case 'object':
                case 'array':
                    obj[keys[i]] = new val.constructor;
                    utils.extend(obj[keys[i]], val);
                    break;

            }
        }

        return obj;
    },

    clone: (obj) => {
        let copy;

        // handle the 3 simple types, and null or undefined
        if (null == obj || "object" != typeof obj) return obj;

        // handle Date
        if (obj instanceof Date) {
            copy = new Date();
            copy.setTime(obj.getTime());
            return copy;
        }

        // handle Array
        if (obj instanceof Array) {
            copy = [];
            for (let i = 0, len = obj.length; i < len; i++) {
                copy[i] = utils.clone(obj[i]);
            }
            return copy;
        }

        // handle Object
        if (obj instanceof Object) {
            copy = {};
            for (let attr in obj) {
                if (obj.hasOwnProperty(attr)) copy[attr] = utils.clone(obj[attr]);
            }
            return copy;
        }
    }
};
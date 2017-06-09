const utils = module.exports = {
    rand: length => Math.random().toString(36).substring(2, length || 25),

    pad: (val, length) => (("00000" + val).slice(-1 * (length || 2))),

    toFixed: (val, accuracy) => parseFloat(val.toFixed(accuracy || 3)),

    trim(val, maxlength) {
        val = val && typeof val === 'string' ? val.trim() : val;

        if (maxlength) { val = val.substr(0, maxlength); }

        return val;
    },

    getListOffset(i, offset, length) {
        let i1 = i - offset;
        let i2 = i1 < 0 ? (i1 + length) : (i1 - length);

        return Math.abs(i1) < Math.abs(i2) ? i1 : i2;
    },

    getTimeText(timekey) {
        let hour = parseInt(timekey.substr(0, 2)),
            min  = parseInt(timekey.substr(2, 4)),
            ampm = hour < 12 ? 'am' : 'pm',
            str;

             if (hour > 12) hour -= 12;
        else if (hour == 0) hour = 12;

        str = hour.toString();

        if (min) str += ':' + min;

        str += ampm;

        return str;
    },

    foreach(array, callback) {

        if (!array) { return; }

        let keys = Object.keys(array), i;

        if (array instanceof Array) 
            for (i = 0; i < array.length; i++) {
                if (callback(array[keys[i]], i, keys[i]) === false) {
                    return i;
                }
            }
        else 
            for (i = 0; i < keys.length; i++) {
                if (callback(array[keys[i]], i, keys[i]) === false) {
                    return i;
                }
            }
    },

    first(array, func, defVal) {

        if (!(array instanceof Array)) { return defVal; }

        let keys = Object.keys(array), i;

        for (i = 0; i < keys.length; i++) {
            if (func(array[keys[i]], i)) {
                return array[keys[i]];
            }
        }

        return defVal;
    },

    map(array, func) {

        if (typeof array != 'object') { return []; }

        let mapped, keys, val, i;

        mapped = [];
        keys   = Object.keys(array);

        if (array instanceof Array)
            for (i = 0; i < array.length; i++) {

                val = func(array[keys[i]], i, i);

                if (val) { mapped.push(val); }
            }

        else 
            for (i = 0; i < keys.length; i++) {

                val = func(array[keys[i]], keys[i], i);

                if (val) { mapped.push(val); }
            }

        return mapped;
    },

    mapObject(obj, func) {

        let mapped = {};

        if (!(obj instanceof Object)) { return mapped; }

        let keys = Object.keys(obj), i;

        for (i = 0; i < keys.length; i++) {
            if (func(mapped, obj[keys[i]], keys[i], i) === false) {
                break;
            }
        }

        return mapped;
    },

    extend(obj, props, override) {
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

    clone(obj) {
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
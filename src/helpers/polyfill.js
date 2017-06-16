Array.makeArray = function (args) {
    return [].slice.call(args);
};

if (!Number.isInteger) {

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger
    Number.isInteger = function (value) {
        return typeof value === "number" && 
            isFinite(value) &&
            Math.floor(value) === value;
    };
}

if (SVGSVGElement && !SVGSVGElement.prototype.focus) {
    SVGSVGElement.prototype.focus = function () {

    };
}

if (!Function.prototype.bind) {

    Function.prototype.bind = function (oThis) {
        if (typeof this !== 'function') {
            // closest thing possible to the ECMAScript 5
            // internal IsCallable function
            throw new TypeError('Cannot call bind on ', this);
        }

        var aArgs, fToBind, fNOP, fBound;

        aArgs   = Array.prototype.slice.call(arguments, 1);
        fToBind = this;
        fNOP    = function() {};
        fBound  = function() {
            return fToBind.apply(
                this instanceof fNOP && oThis
                    ? this
                    : oThis,
                 aArgs.concat(Array.prototype.slice.call(arguments)));
        };

          fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();

        return fBound;
    };
}

if (typeof Object.keys !== 'function') {
    Object.keys = function (obj) {
        var keys = [];

        for (var i in obj) { keys.push(i); }

        return keys;
    };
}

if (Function.prototype.bind && typeof console == 'object' && typeof console.log == 'object') {
    var logFns = ["log", "info", "debug", "warn", "error", "clear"];

    for (var i = 0; i < logFns.length; i++) {
        console[logFns[i]] = Function.prototype.call.bind(console[logFns[i]], console);
    }
}

if (typeof Object.defineProperty != 'function') {

    Object.defineProperty = function (obj, key, props) {
        if (typeof props === 'object' && props.value) {
            obj[key] = props.value;
        }
        return obj;
    }
}

if (typeof Object.assign != 'function') {

    Object.assign = function (target) {
        // We must check against these specific cases.
        if (target === undefined || target === null) {
            throw new TypeError('Cannot convert undefined or null to object');
        }

        var output = Object(target);

        for (var index = 1; index < arguments.length; index++) {
            var source = arguments[index];
            if (source !== undefined && source !== null) {
                for (var nextKey in source) {
                    if (source.hasOwnProperty(nextKey)) {
                        output[nextKey] = source[nextKey];
                    }
                }
            }
        }
        return output;
    };
}

if (typeof console == 'object' && typeof console.debug == 'undefined') {
    console.debug = console.log;
}

if (!Array.prototype.includes) {

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
    // https://stackoverflow.com/questions/35135127/adding-a-function-to-array-prototype-in-ie-results-in-it-being-pushed-in-to-ever
    Object.defineProperty(Array.prototype, "includes", {
        value: function(searchEl) {
            'use strict';

            var O, len, n, k, currEl;

            if (this == null) { throw new TypeError('Array.prototype.includes called on null or undefined'); }

            O   = Object(this);
            len = parseInt(O.length, 10) || 0;
            
            if (len === 0) { return false; }

            n = parseInt(arguments[1], 10) || 0;
            k = n >= 0 ? n : (len + n);

            if (k < 0) { k = 0; }

            while (k < len) {
                currEl = O[k];

                if ( searchEl === currEl ||
                    (searchEl !== searchEl && currEl !== currEl)) {
                    return true;
                }

                k++;
            }

            return false;
        }
    });
}

if (!String.prototype.includes) {

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes
    Object.defineProperty(String.prototype, "includes", {
        value: function(search, start) {
            'use strict';
            
            if (typeof start !== 'number') { 
                start = 0; 
            }

            if (start + search.length > this.length) { 
                return false;
            }

            return this.indexOf(search, start) !== -1;
        }
    });
}

if (!Number.isInteger) {

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger
    Object.defineProperty(Number, "isInteger", {
        value: function (value) {
            return typeof value === "number" && 
                isFinite(value) &&
                Math.floor(value) === value;
        }
    });
}

if (SVGSVGElement && !SVGSVGElement.prototype.focus) {
    Object.defineProperty(SVGSVGElement.prototype, "focus", {
        value: function () {

        }
    });
}

/******************************************************************
 *
 * Region: Date Time Polyfills
 *
 *****************************************************************/
Date.prototype.clone = function () {
    return new Date(this);
};

Date.prototype.getDateKey = function () {

    let y = this.getFullYear().toString(),
        m = this.getMonth() + 1,
        d = this.getDate();

    return parseInt(y + ("0" + m).slice(-2) + ("0" + d).slice(-2));
};

Date.prototype.getDateText = function () {
    let val = this.getDate();

    switch (val) {
        case  1:
        case 21:
        case 31: return val + 'st';
        case  2:
        case 22: return val + 'nd';
        case  3: 
        case 23: return val + 'rd';
        default: return val + 'th';
    }
};

Date.prototype.getMonthText = function () {
    switch (this.getMonth()) {
        case  0: return 'January';
        case  1: return 'February';
        case  2: return 'March';
        case  3: return 'April';
        case  4: return 'May';
        case  5: return 'June';
        case  6: return 'July';
        case  7: return 'August';
        case  8: return 'September';
        case  9: return 'October';
        case 10: return 'November';
        case 11: return 'December';
    }
};

Date.prototype.getDayText = function () {
    switch (this.getDay()) {
        case 0: return 'Sunday';
        case 1: return 'Monday';
        case 2: return 'Tuesday';
        case 3: return 'Wednesday';
        case 4: return 'Thursday';
        case 5: return 'Friday';
        case 6: return 'Saturday';
    }
};

Date.prototype.getTomorrow = function () {
    return this.clone().addDays(1);
};

Date.prototype.getYesterday = function () { 
    return this.clone().addDays(-1);
};

Date.prototype.addDays = function (val) {
    this.setDate(this.getDate() + val);
    return this;
};

Date.prototype.addMonths = function (val) {
    this.setMonth(this.getMonth() + val);
    return this;
};

Date.prototype.toStartOfMonth = function () {
    this.setDate(1);
    return this;
};

Date.prototype.toEndOfMonth = function () {
    this.setDate (1);
    this.setMonth(this.getMonth() + 1);
    this.setDate (0);
    return this;
};

Date.prototype.toStartOfWeek = function () {
    this.setDate(this.getDate() - this.getDay());
    return this;
};

Date.prototype.toEndOfWeek = function () {
    this.setDate(this.getDate() + (6 - this.getDay()));
    return this;
};
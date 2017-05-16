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
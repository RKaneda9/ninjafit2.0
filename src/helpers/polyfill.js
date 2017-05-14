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
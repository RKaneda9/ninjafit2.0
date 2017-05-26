const utils = module.exports = {
    addListener: function (el, type, callback) {

        // mozilla, opera and webkit
        if (el.addEventListener) return el.addEventListener(type, callback, false);

        // ie
        if (el.attachEvent) return el.attachEvent('on' + type, callback);
    }
};
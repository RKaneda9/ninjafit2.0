var html = require('./loader.pug');
var el;

module.exports = {
    initialize: function (_el) { 
        el = _el; 

        if (el) el.innerHTML = html;
    },

    show: function () { 
        if (!el) return;

        var attr = el.getAttribute('class');

        if (attr && attr.indexOf('hidden') > -1) 
            el.setAttribute('class', 'show'); 
    },
    hide: function () { if (el) el.setAttribute('class', 'hidden'); }
};
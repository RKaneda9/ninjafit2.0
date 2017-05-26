var el;

module.exports = {
    initialize: function (_el) { el = _el },

    show: function () { if (el) el.setAttribute('class', '');      },
    hide: function () { if (el) el.setAttribute('class', 'hidden'); }
};
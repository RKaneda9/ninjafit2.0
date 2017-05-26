var constants = require('./constants'),
    enums     = require('./enums'),
    apps      = {},
    el;

const service = module.exports = {
    initialize: function (_el) { el = _el; },

    determine: function () {
        if (window.innerWidth <= constants.mobileMaxWidth) return enums.apps.mobile;

        return enums.apps.desktop;
    },

    isLoaded: function (id) { return apps[id]; },

    fetch: function (id) {
        return new Promise(function (resolve, reject) {
            if (apps[id]) return resolve(apps[id]);

            switch (id) {
                case enums.apps.mobile:  

                    return require.ensure('../mobile', function (require) { 

                        resolve(apps[id] = require('../mobile'));

                    }, 'mobile');

                case enums.apps.desktop: 

                    return require.ensure('../desktop', function (require) { 

                        resolve(apps[id] = require('../desktop'));

                    }, 'desktop');
            }

            reject('Unknown application id: ' + id);
        });
    },

    show: function (id) {
        return new Promise(function (resolve, reject) {

            // element does not exist on the page, can't bind to no element
            if (!el) return reject();

            return service.fetch(id)
                .then (function (app) { app.initialize(el, resolve, reject); })
                .catch(function (msg) { reject(msg); });
        });
    },

    remove: function (id) {
        if (apps[id]) apps[id].dispose();
    }
}
var utils        = require('./main/utils'),
    applications = require('./main/applications'),
    loader       = require('./main/loader'),
    constants    = require('./main/constants'),
    appId, 
    resizeTimeoutId;

(function (callback) {

    // browser event has already occurred.
    if (document.readyState === "complete") setTimeout(callback);

    // otherwise add listener
    else utils.addListener(window, 'load', callback);

}(function () {

    console.log("Main started");

    utils.addListener(window, 'resize', function () {

        if (resizeTimeoutId) clearTimeout(resizeTimeoutId);

        resizeTimeoutId = setTimeout(resize, constants.resizeTimeout);
    });

    function resize() {

        var newId = applications.determine(),
            oldId = appId;

        resizeTimeoutId = null;

        if (oldId == newId) return;

        console.log("onResize() - New Application: " + newId + ", old application: " + oldId);

        appId = newId;

        if (!applications.isLoaded(newId)) loader.show();

        if (oldId) {

            console.log('onResize() - Removing previous application: ', oldId);
            applications.remove(oldId);
        }

        console.log('onResize() - Showing application: ', newId);

        applications.show(newId)
            .then (function (   ) { loader.hide(); })
            .catch(function (msg) { console.error(msg); });
    }

    loader      .initialize(document.getElementById(constants.elements.loader));
    applications.initialize(document.getElementById(constants.elements.app));

    resize();
}));
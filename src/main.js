(function (callback) {

    // browser event has already occurred.
    if (document.readyState === "complete") {
        return setTimeout(callback);
    }

    // Mozilla, Opera and webkit style
    if (window.addEventListener) {
        return window.addEventListener("load", callback, false);
    }

    // If IE event model is used
    if (window.attachEvent) {
        return window.attachEvent("onload", callback);
    }

})(function () {

    var menuBtnShow   = document.querySelector('.home .menu-btn');
    var menuBtnRemove = document.querySelector('.menu .close-btn');
    var menu          = document.querySelector('.menu');

    menuBtnShow.addEventListener('click', function (e) {
       menu.classList.add('open');
    });

    menuBtnRemove.addEventListener('click', function (e) {
       menu.classList.remove('open');
    });

});
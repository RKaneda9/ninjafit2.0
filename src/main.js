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
  
    var home          = document.querySelector('.home');
    var menuBtnShow   = document.querySelector('.home .menu-btn');
    var menuBtnRemove = document.querySelector('.menu .close-btn');
    var menu          = document.querySelector('.menu');
    var header        = document.querySelector('.home .header');
    var imageSlider   = document.querySelector('.home .image-slider');
    var map           = document.querySelector('.map .image-wrapper');
    var mapClip       = document.querySelector('#map-clip polygon');
    var sqrt3 = Math.sqrt(3);

    menuBtnShow.addEventListener('click', function (e) {
       menu.classList.add('open');
    });

    menuBtnRemove.addEventListener('click', function (e) {
       menu.classList.remove('open');
    });

    var resizeTimeout = null;

    function onResize() {
        if (resizeTimeout) { clearTimeout(resizeTimeout); }

        resizeTimeout = setTimeout(resize, 500);
    }

    function resize() {
        resizeTimeout = null;

        var homeBounds   = home  .getBoundingClientRect();
        var headerBounds = header.getBoundingClientRect();
        var x1 = homeBounds.width;
        var y1 = headerBounds.height;
        var x2 = homeBounds.width  / 2;
        var y2 = homeBounds.height / 2;

        var y = - (sqrt3 / 4) * (x1 - y1 * sqrt3 - x2 - y2 / sqrt3);
        var x = sqrt3 * y - y1 * sqrt3 + x1;

        var r = Math.sqrt(Math.pow(x - x2, 2) + Math.pow(y - y2, 2));

        var h = 2 * r;
        var x3 = x2 - r / 2;
        var r2 = 2 / sqrt3 * (homeBounds.width - x3);
        var w  = 2 * r2;

        imageSlider.style.height = h + 'px';
        imageSlider.style.width  = w + 'px';
    }

    window.addEventListener('resize', onResize);
    resize();
});
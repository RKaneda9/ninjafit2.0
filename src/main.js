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
  
    var menuBtnShow     = document.querySelector('.home .menu-btn');
    var menuBtnRemove   = document.querySelector('.menu .close-btn');
    var menu            = document.querySelector('.menu');
    var header          = document.querySelector('.home .header');
    var footer          = document.querySelector('.home .footer');
    var imageSlider     = document.querySelector('.home .image-slider');
    var imageSliderClip = document.querySelector('#image-slider-clip polygon');
    var map             = document.querySelector('.map .image-wrapper');
    var mapClip         = document.querySelector('#map-clip polygon');

    menuBtnShow.addEventListener('click', function (e) {
       menu.classList.add('open');
    });

    menuBtnRemove.addEventListener('click', function (e) {
       menu.classList.remove('open');
    });

    function resize() {
        var bounds = imageSlider.getBoundingClientRect();
        var w      = bounds.width;
        var h      = bounds.height;
        var mod    = Math.sqrt(3);

        var headerBounds = header.getBoundingClientRect();
        var footerBounds = footer.getBoundingClientRect();

        // 30 60 90 triangle
        var headerWidth = headerBounds.height * mod;
        var footerWidth = footerBounds.height * mod;

        var points = [
            [0,0],
            [(w - headerWidth) / w, 0],
            [1,headerBounds.height / h],
            [1,1],
            [0,(h - w/Math.sqrt(3)) / h]
        ].map(function (p) { return p.join(','); });

        imageSliderClip.setAttribute('points', points.join(' '));

        var mapBounds = map.getBoundingClientRect();

        points = [
            [0,0],
            [1,mapBounds.width / (mod * mapBounds.height)],
            [1,1],
            [0,(mapBounds.height - (mapBounds.width / mod)) / mapBounds.height]
        ].map(function (p) { return p.join(','); });

        mapClip.setAttribute('points', points.join(' '));
    }

    window.addEventListener('resize', resize);
    resize();
});
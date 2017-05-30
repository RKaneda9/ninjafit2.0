let pages = {
    home:        'home',
    aboutUs:     'about-us',
    whatWeOffer: 'what-we-offer',
    schedule:    'schedule',
    wod:         'wod',
    contact:     'contact',
    joinUs:      'join-us',
    login:       'login'
};

let pageOrder = [
    pages.home,
    pages.aboutUs,
    pages.whatWeOffer,
    pages.wod,
    pages.schedule,
    pages.login,
    pages.joinUs,
    pages.contact
];

module.exports = {
    imageSliderTimeout: 15000,
    testimonialTimeout: 15000,

    pages,
    pageOrder
};
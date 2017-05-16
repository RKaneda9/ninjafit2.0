const utils = require('helpers/utils');
const pages = require('helpers/constants').pages;

module.exports = {
    [pages.home]:        require('./home'),
    [pages.aboutUs]:     require('./about-us'),
    [pages.contact]:     require('./contact'),
    [pages.joinUs]:      require('./join-us'),
    [pages.schedule]:    require('./schedule'),
    [pages.whatWeOffer]: require('./what-we-offer'),
    [pages.wod]:         require('./wod')
};
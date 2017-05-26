const utils = require('mobile/helpers/utils');
const pages = require('mobile/helpers/constants').pages;

module.exports = {
    [pages.home]:        require('./home'),
    [pages.aboutUs]:     require('./about-us'),
    [pages.contact]:     require('./contact'),
    [pages.joinUs]:      require('./join-us'),
    [pages.login]:       require('./login'),
    [pages.schedule]:    require('./schedule'),
    [pages.whatWeOffer]: require('./what-we-offer'),
    [pages.wod]:         require('./wod')
};
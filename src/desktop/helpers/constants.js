const 
    {pages} = require('helpers/constants'),
    utils   = require('helpers/utils');

let pageTitles = {};

utils.foreach(pages, name => {
    pageTitles[name] = utils.map(name.split('-'), text =>
        text[0].toUpperCase() + text.substr(1)).join(' ');
});

module.exports = {
    pageOrder: [
        pages.home,
        pages.aboutUs,
        pages.whatWeOffer,
        pages.wod,
        pages.schedule,
        pages.login,
        pages.joinUs,
        pages.contact
    ],

    menuOrder: [
        pages.home,
        pages.wod,
        pages.login,
        pages.aboutUs,
        pages.schedule,
        pages.joinUs,
        pages.whatWeOffer,
        pages.contact
    ],

    pageTitles: pageTitles
};
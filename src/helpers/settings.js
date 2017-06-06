const settings = require('settings');
const utils    = require('helpers/utils');

// TODO: validate json

settings.contact.map = `http://maps.google.com/maps?q=${settings.contact.address.split(' ').join('+')}`;

module.exports = settings;
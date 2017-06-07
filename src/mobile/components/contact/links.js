const Inferno  = require('inferno');
const settings = require('helpers/settings');

module.exports = () => (
    <div className="contact-items">
        <a href={`mailto:${settings.contact.email}`} className="contact-item">
            <div className="icon fa fa-envelope" />
            <div className="value">{settings.contact.email}</div>
        </a>
        <a href={`tel:${settings.contact.phone}`} className="contact-item">
            <div className="icon fa fa-phone" />
            <div className="value">{settings.contact.phone}</div>
        </a>
    </div>
);
const Inferno   = require('inferno');
const settings  = require('helpers/settings');
const MailIcon  = require('shared/components/icons/envelope');
const PhoneIcon = require('shared/components/icons/phone');

module.exports = () => (
    <div className="contact-items">
        <a href={`mailto:${settings.contact.email}`} className="contact-item">
            <MailIcon />
            <div className="value">{settings.contact.email}</div>
        </a>
        <a href={`tel:${settings.contact.phone}`} className="contact-item">
            <PhoneIcon />
            <div className="value">{settings.contact.phone}</div>
        </a>
    </div>
);
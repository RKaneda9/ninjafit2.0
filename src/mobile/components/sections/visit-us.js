const Inferno    = require('inferno');
const ContactMap = require('mobile/components/contact/map');
const {Row}      = require('mobile/components/form');
const settings   = require('helpers/settings');

module.exports = () => {
    return (
        <section className="visit-us">
            <header className="header">Come Visit Us!</header>

            <div className="content">
                <ContactMap href={settings.contact.map} />
                <Row>
                    <a href={`mailto:${settings.contact.email}`} className="contact-item">
                        <div className="icon fa fa-envelope" />
                        <div className="value">{settings.contact.email}</div>
                    </a>
                    <a href={`tel:${settings.contact.phone}`} className="contact-item">
                        <div className="icon fa fa-phone" />
                        <div className="value">{settings.contact.phone}</div>
                    </a>
                </Row>
            </div>
        </section>
    );
}
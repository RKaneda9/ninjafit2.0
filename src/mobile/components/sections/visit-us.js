const Inferno      = require('inferno');
const ContactMap   = require('mobile/components/contact/map');
const ContactLinks = require('mobile/components/contact/links');
const settings     = require('helpers/settings');

module.exports = () => {
    return (
        <section className="visit-us">
            <header className="header">Come Visit Us!</header>

            <div className="content">
                <ContactMap href={settings.contact.map} />
                <ContactLinks />
            </div>
        </section>
    );
}
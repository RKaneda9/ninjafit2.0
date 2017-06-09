const Inferno      = require('inferno');
const ContactMap   = require('shared/components/contact/map');
const ContactLinks = require('shared/components/contact/links');
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
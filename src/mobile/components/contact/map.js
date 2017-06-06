const Inferno  = require('inferno');
const settings = require('helpers/settings');

module.exports = ({ className, version }) => (
    <a 
        href={settings.contact.map} 
        className={className || 'contact-map'}
        target="nfg-map">
        <div className="image-wrapper">
            <div className="image" style={{ backgroundImage: `url("./images/map${version || ""}.jpg")`}} />
        </div>
    </a>
);
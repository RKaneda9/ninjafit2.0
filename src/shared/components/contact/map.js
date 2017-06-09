const Inferno  = require('inferno');
const settings = require('helpers/settings');

module.exports = ({ className, version, children }) => (
    <a 
        href={settings.contact.map} 
        className={className || 'contact-map'}
        target="nfg-map">

        {children}
        
        <div className="image-wrapper">
            <div className="image" style={{ backgroundImage: `url("./images/map${version || ""}.jpg")`}} />
        </div>
    </a>
);
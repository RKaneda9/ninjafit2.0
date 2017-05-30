const Inferno = require('inferno');

module.exports = ({ menuOpen, name, route, active, styles, children }) => {
    let curr     = !menuOpen && route && route[0] == name;
    let isActive = curr ? true : undefined;
    let style    = curr ? null : (styles || {})[name];

    return (
        <div
            active={isActive}
            style={style} 
            className={`page ${name}-page`}>
            {children}
        </div>
    );
};
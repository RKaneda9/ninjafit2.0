const Inferno = require('inferno');

module.exports = ({ children, open, type, pos }) => (
    <div className={`popup${open ? " show" : ""}`}>
        <div className="cover" />
        <div className={`content ${type} ${pos || 'full'}`}>
            {children}
        </div>
    </div>
);
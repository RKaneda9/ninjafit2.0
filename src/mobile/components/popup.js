const Inferno = require('inferno');

module.exports = ({ children, open, type }) => (
    <div className={`popup${open ? " open" : ""}`}>
        <div className="cover" />
        <div className={`content ${type}`}>
            {children}
        </div>
    </div>
);
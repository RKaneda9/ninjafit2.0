const Inferno = require('inferno');

module.exports = ({ children, menuOpen }) => {

    let className = "app desktop";

    if (menuOpen) className += ' hide-overflow';

    return (
        <div className={className}>
            {children}
        </div>
    );
};
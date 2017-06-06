const Inferno = require('inferno');

module.exports = ({ children, name }) => (
    <div className={`page ${name}-page`}>{children}</div>
);
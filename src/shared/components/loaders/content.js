const Inferno      = require('inferno');
const ThrowingStar = require('shared/components/icons/throwing-star');

module.exports = ({ show, text }) => (
    <div className={`loader${show ? " show" : ''}`}>
        <ThrowingStar />
        <span className="text">{text}</span>
    </div>
);
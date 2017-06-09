const Inferno    = require('inferno');
const MenuButton = require('mobile/components/buttons').MenuButton;

module.exports = ({ title }) => (
    <header className="header-bar">
        <p className="title">{title}</p>
        <MenuButton />
    </header>
);
const Inferno    = require('inferno');
const MenuButton = require('mobile/components/buttons').MenuButton;
const commands   = require('services/event-system').commands;

module.exports = ({ title }) => (
    <header className="header-bar">
        <p className="title">{title}</p>
        <MenuButton onClick={commands.openMenu.emit} />
    </header>
);
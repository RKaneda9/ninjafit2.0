const Inferno      = require('inferno');
const TriangleLeft = require('mobile/components/backgrounds').TriangleLeft;
const commands     = require('services/event-system').commands;

export const MenuButton = ({ onClick }) => (
    <button
        className="menu-btn"
        onClick={commands.openMenu.emit}>

        <TriangleLeft position="right v-full" size="small" />

        <div className="bars">
            <span className="bar" />
            <span className="bar" />
            <span className="bar" />
        </div>
    </button>
);
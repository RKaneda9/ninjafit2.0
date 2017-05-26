const Inferno        = require('inferno');
const {TriangleLeft} = require('mobile/components/backgrounds');

export const Button = ({ onClick, children }) => (
    <button onClick={onClick} className="btn">{children}</button>
);

export const IconButton = ({ onClick, children }) => (
    <button onClick={onClick} className="icon-btn">{children}</button>
);

export const CloseButton = ({ onClick }) => (
    <button 
        onClick={onClick}
        className="close-btn">

        <span className="bar" />
        <span className="bar" />
    </button>
);

export const MenuButton = ({ onClick }) => (
    <button
        className="menu-btn"
        onClick={onClick}>

        <TriangleLeft position="right v-full" size="small" />

        <div className="bars">
            <span className="bar" />
            <span className="bar" />
            <span className="bar" />
        </div>
    </button>
);
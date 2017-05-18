const Inferno        = require('inferno');
const {TriangleLeft} = require('components/backgrounds');

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

export const ScrollDownButton = ({ onClick }) => (
    <button
        className="scroll-down-btn"
        onClick={onClick}>

        <svg className="icon" viewBox="0 0 100 100">

            <path 
                fillRule="even-odd" 
                d="M0,50 A50,50 0 0 1 100,50 A50,50 0 0 1 0,50 Z M70,40 L30,40 L50,60 Z" />
        </svg>
    </button>
);
const Inferno = require('inferno');

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

export const OptionButton = ({ onClick, children }) => (
    <button onClick={onClick} className="option-btn">{children}</button>
);
const Inferno       = require('inferno');
const {CloseButton} = require('components/buttons');

export const Quote = ({ author, quote, pos }) => (
    <div className={`quote${pos ? ` ${pos}` : ''}`}>
        <div className="text">{quote}</div>
        <div className="author">{author}</div>
    </div>
);

export const Quotes = ({ children }) => (<div className="quotes">{children}</div>);

export const Popup = ({ children, open, type, onClose }) => (
    <div className={`popup${open ? " open" : ""}`}>
        <div className="cover" />
        <div className={`content ${type}`}>
            <CloseButton onClick={onClose} />
            {children}
        </div>
    </div>
);
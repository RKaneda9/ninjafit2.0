const Inferno       = require('inferno');
const {CloseButton} = require('mobile/components/buttons');

export const Popup = ({ children, open, type, onClose }) => (
    <div className={`popup${open ? " open" : ""}`}>
        <div className="cover" />
        <div className={`content ${type}`}>
            <CloseButton onClick={onClose} />
            {children}
        </div>
    </div>
);
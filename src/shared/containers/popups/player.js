const Inferno     = require('inferno');
const Popup       = require('shared/components/popup');
const CloseButton = require('shared/components/buttons').CloseButton;

module.exports = ({ show, url, onClose }) => (
    <Popup
        open={show && url}
        type="player">
        <CloseButton onClick={onClose} />

        {show && url ? (

            <iframe className="frame" frameborder="0" src={url} />

        ) : null}
    </Popup>
);
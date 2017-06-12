const Inferno      = require('inferno');
const Popup        = require('shared/components/popup');
const Button       = require('shared/components/buttons').Button;
const CheckIcon    = require('shared/components/icons/check');
const ContactLinks = require('shared/components/contact/links');

const SuccessMsg = ({ show, title, msg, onClose }) => (
    <Popup 
        open={show}
        pos="center"
        type="notification success">

        <div className="title-icon check">
            <CheckIcon />
        </div>

        <div className="title">{title || "Message Sent!"}</div>
        <div className="desc">{msg || "We will be in touch as soon as we can."}</div>

        <footer className="footer">
            <Button onClick={onClose}>Ok</Button>
        </footer>
    </Popup>
);

const ErrorMsg = ({ show, title, msg, onClose }) => (
    <Popup 
        open={show}
        pos="center"
        type="notification error">

        <div className="title-icon close">
            <span className="bar" />
            <span className="bar" />
        </div>

        <div className="title">{title || "Message Not Delivered"}</div>
        <div className="desc">{msg || "There was a problem in attempting to send your message. We apologize for that! Feel free to try again, give us a call or email us directly."}</div>

        <ContactLinks />

        <footer className="footer">
            <Button onClick={onClose}>Ok</Button>
        </footer>
    </Popup>
);

module.exports = props => props.hasError ? (<ErrorMsg {...props} />) : (<SuccessMsg {...props} />);
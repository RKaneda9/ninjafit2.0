const Inferno             = require('inferno');
const Component           = require('inferno-component');
const utils               = require('helpers/utils');
const Popover             = require('mobile/components/popover');
const Popup               = require('mobile/components/popup');
const {TextBox, TextArea} = require('shared/components/inputs'); 
const ContactLinks        = require('mobile/components/contact/links');

const messages = [
    "Gonna need that {0}.",
    "Let's get that {0} filled.",
    "What's your {0}?",
    "Let's get that {0} written down.",
];

const fields = {
    firstName: 'First Name',
    lastName:  'Last Name',
    email:     'Email',
    message:   'Message'
};

module.exports = class ContactForm extends Component {
    constructor(props) {
        super(props);

        this.updateFirstName   = this.updateFirstName  .bind(this);
        this.updateLastName    = this.updateLastName   .bind(this);
        this.updateEmail       = this.updateEmail      .bind(this);
        this.updateMessage     = this.updateMessage    .bind(this);
        this.send              = this.send             .bind(this);
        this.closeNotification = this.closeNotification.bind(this);

        this.state = {

            firstName:   '',
            lastName:    '',
            email:       '',
            message:     '',
            sending:     false,
            showPopup:   false,
            hasResponse: false, 
            hasError:    false,
            responseMsg: ''
        };
    }

    updateFirstName(val) { this.setState({ firstName: val }); }
    updateLastName (val) { this.setState({  lastName: val }); }
    updateEmail    (val) { this.setState({     email: val }); }
    updateMessage  (val) { this.setState({   message: val }); }

    showError(field, msg) {
        this.setState({
            hasError:    true,
            hasResponse: true,
            responseMsg: msg,
            target:      field
        });

        clearTimeout(this.timeoutId);

        this.timeoutId = setTimeout(() => {

            this.setState({ 
                hasResponse: false,
                showPopup:   false 
            });

        }, 3000);
    }

    closeNotification() {
        clearTimeout(this.timeoutId);

        this.setState({ 
            hasResponse: false,
            showPopup:   false 
        });
    }

    send() {

        // if we're showing the previous response or we're in the 
        // middle of sending, do nothing.
        if (this.hasResponse || this.sending) return;

        clearTimeout(this.timeoutId);

        let props = {
            firstName: (this.state.firstName || "").trim().substr(0,  99),
            lastName:  (this.state.lastName  || "").trim().substr(0,  99),
            email:     (this.state.email     || "").trim().substr(0, 199),
            message:   (this.state.message   || "").trim().substr(0, 999)
        };

        if (!props.firstName) return this.showError(fields.firstName, "Gonna need that first name.");
        if (!props.lastName)  return this.showError(fields.lastName,  "Let's get that last name filled.");
        if (!props.email)     return this.showError(fields.email,     "What's your email?");
        if (!props.message)   return this.showError(fields.message,   "Let's get that question written down.");

        this.setState({ 
            sending:     true,
            hasResponse: false,
            hasError:    false,
            responseMsg: ''
        });

        setTimeout(() => {

            let error = Math.random() > 0.5;

            if (error) {
                let keys    = Object.keys(fields);
                let field   = fields[keys[Math.floor(Math.random() * keys.length)]];
                let message = messages[Math.floor(Math.random() * messages.length)].split('{0}').join(field);

                this.setState({
                    sending:     false,
                    hasResponse: true,
                    hasError:    error,
                    target:      null, //field,
                    showPopup:   true,
                    responseMsg: message
                });
            }
            else {
                this.setState({
                    sending:     false,
                    hasResponse: true,
                    hasError:    error,
                    target:      null,
                    showPopup:   true,
                    responseMsg: 'Message sent successfully!'
                });
            }

            this.timeoutId = setTimeout(() => {

                this.setState({ 
                    hasResponse: false,
                    showPopup:   false
                });

            }, 3000);

        }, 3000);
    }

    render() {

        return (
            <section className="contact">
                {this.props.children}

                <header className="header">{this.props.title || "Questions? Let Us Help With That."}</header>

                <div className="content">
                    <div className="row">
                        <div className="col">

                            <TextBox 
                                placeholder="First Name" 
                                maxlength={99} 
                                hasError={this.state.hasError && this.state.target == fields.firstName}
                                onKeyPress={this.updateFirstName}
                                value={this.state.firstName} />

                            <Popover 
                                show={this.state.hasError && this.state.target == fields.firstName}
                                text={this.state.target == fields.firstName ? this.state.responseMsg : ''} />

                        </div>
                        <div className="col">

                            <TextBox 
                                placeholder="Last Name" 
                                maxlength={99} 
                                hasError={this.state.hasError && this.state.target == fields.lastName}
                                onKeyPress={this.updateLastName}
                                value={this.state.lastName} />

                            <Popover 
                                align="right"
                                show={this.state.hasError && this.state.target == fields.lastName}
                                text={this.state.target == fields.lastName ? this.state.responseMsg : ''} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">

                            <TextBox 
                                placeholder="Your Email" 
                                maxlength={199} 
                                hasError={this.state.hasError && this.state.target == fields.email}
                                onKeyPress={this.updateEmail}
                                value={this.state.email} />

                            <Popover 
                                show={this.state.hasError && this.state.target == fields.email}
                                text={this.state.target == fields.email ? this.state.responseMsg : ''} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">

                            <TextArea
                                placeholder="What can we help you with?"
                                maxlength={999}
                                hasError={this.state.hasError && this.state.target == fields.message}
                                onKeyPress={this.updateMessage}
                                value={this.state.message} />

                            <Popover 
                                show={this.state.hasError && this.state.target == fields.message}
                                text={this.state.target == fields.message ? this.state.responseMsg : ''} />
                        </div>
                    </div>
                </div>

                <footer className="footer">
                    <div className="btn-col">
                        <button 
                            onClick={this.send}
                            className={`btn${this.state.sending ? ' anim' : ''}${this.state.hasResponse ? ' covered' : ''}`}>
                            <span>Send</span>
                            <div className={`cover ${this.state.hasError ? 'error' : 'success'}`}>{this.state.hasError ? 'Error' : 'Success!'}</div>
                        </button>
                    </div>
                </footer>

                {this.state.hasError ? (
                    <Popup 
                        open={this.state.showPopup}
                        pos="center"
                        type="notification error">

                        <div className="title-icon close">
                            <span className="bar" />
                            <span className="bar" />
                        </div>

                        <div className="title">Message Not Delivered</div>
                        <div className="desc">There was a problem in attempting to send your message. We apologize for that! Feel free to try again, give us a call or email us directly.</div>

                        <ContactLinks />

                        <footer className="footer">
                            <button 
                                onClick={this.closeNotification}
                                className="btn">
                                <span>Ok</span>
                            </button>
                        </footer>
                    </Popup>
                ) : ( 
                    <Popup 
                        open={this.state.showPopup}
                        pos="center"
                        type="notification success">

                        <div className="title-icon check">
                            <span className="fa fa-check" />
                        </div>

                        <div className="title">Message Sent!</div>
                        <div className="desc">We will be in touch as soon as we can.</div>

                        <footer className="footer">
                            <button 
                                onClick={this.closeNotification}
                                className="btn">
                                <span>Ok</span>
                            </button>
                        </footer>
                    </Popup>
                )}
            </section>
        );
    }
}
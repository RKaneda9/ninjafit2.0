const Inferno             = require('inferno');
const Component           = require('inferno-component');
const utils               = require('helpers/utils');
const Popover             = require('shared/components/popover');
const {TextBox, TextArea} = require('shared/components/inputs'); 
const Popup               = require('shared/containers/popups/validation');
const mailer              = require('services/mailer');

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
        this.clearNotification = this.clearNotification.bind(this);
        this.showNotification  = this.showNotification .bind(this);

        this.state = {

            firstName:   '',
            lastName:    '',
            email:       '',
            message:     '',
            sending:     false,
            showPopup:   false,
            hasResponse: false, 
            hasError:    false,
            target:      null,
            responseMsg: ''
        };
    }

    updateFirstName(val) { this.setState({ firstName: val }); }
    updateLastName (val) { this.setState({  lastName: val }); }
    updateEmail    (val) { this.setState({     email: val }); }
    updateMessage  (val) { this.setState({   message: val }); }

    checkFocus(field) {
        if (this.state.hasResponse && this.state.target == field) 
            this.clearNotification();
    }

    clearNotification() {
        clearTimeout(this.timeoutId);

        this.setState({
            hasResponse: false,
            showPopup:   false
        });
    }

    showNotification(hasError, field, message) {
        this.setState({
            sending:     false,
            hasResponse: true,
            hasError:    hasError,
            target:      field,
            showPopup:  !field,
            responseMsg: message
        });

        clearTimeout(this.timeoutId);

        this.timeoutId = setTimeout(this.clearNotification, 3000);
    }

    send() {

        // if we're showing the previous response or we're in the 
        // middle of sending, do nothing.
        if (this.state.hasResponse || this.state.sending) return;

        clearTimeout(this.timeoutId);

        let props = {
            firstName: (this.state.firstName || "").trim().substr(0,  99),
            lastName:  (this.state.lastName  || "").trim().substr(0,  99),
            email:     (this.state.email     || "").trim().substr(0, 199),
            content:   (this.state.message   || "").trim().substr(0, 999)
        };

        if (!props.firstName) return this.showNotification(true, fields.firstName, "Gonna need that first name.");
        if (!props.lastName)  return this.showNotification(true, fields.lastName,  "Let's get that last name filled.");
        if (!props.email)     return this.showNotification(true, fields.email,     "What's your email?");
        if (!props.content)   return this.showNotification(true, fields.message,   "Let's get that question written down.");

        this.setState({ 
            sending:     true,
            hasResponse: false,
            hasError:    false,
            responseMsg: ''
        });

        mailer.send(props)
            .then (res => {
                this.setState({
                    firstName:   '',
                    lastName:    '',
                    email:       '',
                    message:     '',
                    sending:     false,
                    hasResponse: true,
                    hasError:    false,
                    target:      null,
                    showPopup:   true
                });

                clearTimeout(this.timeoutId);

                this.timeoutId = setTimeout(this.clearNotification, 3000);
            })
            .catch(res => {

                let message = res.message, 
                    target  = null;

                switch (res.target) {
                    case "firstName": target = fields.firstName; break;
                    case "lastName":  target = fields.lastName;  break;
                    case "email":     target = fields.email;     break;
                    case "content":   target = fields.message;   break;
                }

                // only show a popover for a specific field if both the field is
                // matched and the response has a message.
                if (target && !res.message) target = null;

                this.showNotification(true, target, message);
            });
    }

    render() {

        return (
            <section className="contact">
                {this.props.children}

                <header className="header">{this.props.title || "Questions? Let Us Help With That"}</header>

                <div className="content">
                    <div className="row">
                        <div className="col">

                            <TextBox 
                                placeholder="First Name" 
                                name="firstName"
                                maxlength={99} 
                                onFocus={() => this.checkFocus(fields.firstName)}
                                hasError={this.state.hasResponse && this.state.target == fields.firstName}
                                onKeyPress={this.updateFirstName}
                                value={this.state.firstName} />

                            <Popover 
                                show={this.state.hasResponse && this.state.target == fields.firstName}
                                text={this.state.target == fields.firstName ? this.state.responseMsg : ''} />

                        </div>
                        <div className="col">

                            <TextBox 
                                placeholder="Last Name" 
                                name="lastName"
                                maxlength={99} 
                                onFocus={() => this.checkFocus(fields.lastName)}
                                hasError={this.state.hasResponse && this.state.target == fields.lastName}
                                onKeyPress={this.updateLastName}
                                value={this.state.lastName} />

                            <Popover 
                                align="right"
                                show={this.state.hasResponse && this.state.target == fields.lastName}
                                text={this.state.target == fields.lastName ? this.state.responseMsg : ''} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">

                            <TextBox 
                                placeholder="Your Email" 
                                name="email"
                                maxlength={199} 
                                onFocus={() => this.checkFocus(fields.email)}
                                hasError={this.state.hasResponse && this.state.target == fields.email}
                                onKeyPress={this.updateEmail}
                                value={this.state.email} />

                            <Popover 
                                show={this.state.hasResponse && this.state.target == fields.email}
                                text={this.state.target == fields.email ? this.state.responseMsg : ''} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">

                            <TextArea
                                placeholder="What can we help you with?"
                                name="message"
                                maxlength={999}
                                onFocus={() => this.checkFocus(fields.message)}
                                hasError={this.state.hasResponse && this.state.target == fields.message}
                                onKeyPress={this.updateMessage}
                                value={this.state.message} />

                            <Popover 
                                show={this.state.hasResponse && this.state.target == fields.message}
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

                <Popup 
                    show={this.state.showPopup}
                    hasError={this.state.hasError}
                    onClose={this.clearNotification} />
            </section>
        );
    }
}
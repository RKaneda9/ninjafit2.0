const Inferno             = require('inferno');
const Component           = require('inferno-component');
const utils               = require('helpers/utils');
const {TextBox, TextArea} = require('shared/components/inputs'); 

module.exports = class ContactForm extends Component {
    constructor(props) {
        super(props);

        this.updateFirstName = this.updateFirstName.bind(this);
        this.updateLastName  = this.updateLastName .bind(this);
        this.updateEmail     = this.updateEmail    .bind(this);
        this.updateMessage   = this.updateMessage  .bind(this);
        this.send            = this.send           .bind(this);

        this.state = {

            firstName:   '',
            lastName:    '',
            email:       '',
            message:     '',
            sending:     false,
            hasResponse: false,
            hasError:    false,
            responseMsg: ''
        };
    }

    updateFirstName(val) { this.setState({ firstName: val }); }
    updateLastName (val) { this.setState({  lastName: val }); }
    updateEmail    (val) { this.setState({     email: val }); }
    updateMessage  (val) { this.setState({   message: val }); }

    send() {

        // if we're showing the previous response or we're in the 
        // middle of sending, do nothing.
        if (this.hasResponse || this.sending) return;

        this.setState({ sending: true });

        setTimeout(() => {

            var error = Math.random() > 0.5;

            this.setState({
                sending: false,
                hasResponse: true,
                hasError: error
            });

            setTimeout(() => {

                this.setState({ 
                    hasResponse: false 
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
                                onKeyPress={this.updateFirstName}
                                value={this.state.firstName} />

                        </div>
                        <div className="col">

                            <TextBox 
                                placeholder="Last Name" 
                                maxlength={99} 
                                onKeyPress={this.updateLastName}
                                value={this.state.lastName} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">

                            <TextBox 
                                placeholder="Your Email" 
                                maxlength={199} 
                                onKeyPress={this.updateEmail}
                                value={this.state.email} />
                            
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">

                            <TextArea
                                placeholder="What can we help you with?"
                                maxlength={999}
                                onKeyPress={this.updateMessage}
                                value={this.state.message} />
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
            </section>
        );
    }
}
const Inferno             = require('inferno');
const Component           = require('inferno-component');
const {TextBox, Password} = require('shared/components/inputs'); 

module.exports = class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.send  = this.send.bind(this);
        this.state = { sending: false };
    }

    send() {

        // if we're showing the previous response or we're in the 
        // middle of sending, do nothing.
        if (this.sending) return;

        this.setState({ sending: true });

        setTimeout(() => {
            this.setState({ sending: false });
        }, 3000);
    }

    render() {
        return (
            <form
                action={"#/login"}
                method="get"
                className="login">

                <header className="header">Welcome Back, Ninja</header>
                <div className="content">
                    <div className="row">
                        <div className="col">

                            <TextBox
                                name="username"
                                placeholder="Username"
                                maxlength={99} />

                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                        
                            <Password
                                name="password"
                                placeholder="password"
                                maxlength={99} />
                        </div>
                    </div>
                </div>

                <footer className="footer">
                    <div className="col">
                        <button 
                            onClick={this.send} 
                            type="submit" 
                            className={`btn${this.state.sending ? ' anim' : ''}`}>
                            <span>Login</span>
                        </button>
                    </div>
                </footer>
            </form>
        );
    }
}
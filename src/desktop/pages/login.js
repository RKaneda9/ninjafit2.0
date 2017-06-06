const Inferno     = require('inferno');
const Component   = require('inferno-component');
const constants   = require('helpers/constants');
const utils       = require('helpers/utils');
const settings    = require('helpers/settings');
const PageFooter  = require('desktop/containers/page-footer');
const Page        = require('desktop/components/page');
const {commands}  = require('services/event-system');
const {TextBox, Password} = require('shared/components/inputs'); 

module.exports = class Login extends Component {
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
            <Page {...this.props} name={constants.pages.login}>
                <section className="landing">
                    <header className="header-bar">
                        <p className="title">Login</p>
                        
                        <button
                            onClick={commands.openMenu.emit} 
                            className="menu-btn">
                            <svg className="background" viewBox="0 0 500 577.35">
                                <path filter="url(#ds-s)" d="M500,0v577.35l-500-288.675z" />
                            </svg>
                            <svg className="bars" viewBox="0 0 96 60" stroke-width="12">
                                <path d="M38,6h52" />
                                <path d="M6,30h84" />
                                <path d="M38,54h52" />
                            </svg>
                        </button>
                    </header>
                </section>
                
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

                <PageFooter />
            </Page>
        );
    }
}
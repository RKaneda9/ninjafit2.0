const Inferno     = require('inferno');
const Component   = require('inferno-component');
const constants   = require('helpers/constants');
const utils       = require('helpers/utils');
const settings    = require('helpers/settings');
const PageFooter  = require('desktop/containers/page-footer');
const Page        = require('desktop/components/page');
const {commands}  = require('services/event-system');

module.exports = class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
        
        };
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
                
                <section className="login">
                    <header className="header">Welcome Back, Ninja</header>
                    <div className="content">
                        <div className="row">
                            <div className="col">
                                <input type="text" maxlength={99} placeholder="Username" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <input type="password" maxlength={99} placeholder="Password" />
                            </div>
                        </div>
                    </div>

                    <footer className="footer">
                        <button className="btn">Login</button>
                    </footer>
                </section>

                <PageFooter />
            </Page>
        );
    }
}
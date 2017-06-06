const Inferno     = require('inferno');
const Component   = require('inferno-component');
const constants   = require('helpers/constants');
const utils       = require('helpers/utils');
const settings    = require('helpers/settings');
const PageFooter  = require('desktop/containers/page-footer');
const Page        = require('desktop/components/page');
const {commands}  = require('services/event-system');

module.exports = class AboutUs extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {

        return (
            <Page {...this.props} name={constants.pages.aboutUs}>
                <section className="landing">
                    <header className="header-bar">
                        <p className="title">About Us</p>

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
                <section className="about">
                    <header className="header">What is NinjaFit Gym?</header>

                    <div className="content">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>
                </section>

                <section className="our-philosophy">
                    <div className="background">
                        <div className="left" />
                        <div className="right" />
                    </div>

                    <div className="image" style={{ backgroundImage: `url("https://scontent-atl3-1.cdninstagram.com/t51.2885-15/e35/15802716_253884945025372_5272580072513994752_n.jpg")`}} />

                    <header className="header">Our Philosophy</header>
                    <div className="content">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>
                </section>

                <section className="team">
                    <header className="header">Meet the Team</header>
                    <div className="content">
                        <ul className="staff-list">
                            {utils.map(settings.staff, (member, i) => 
                                <li className="staff-member">
                                    <header className="header">
                                        <div 
                                            className="image" 
                                            style={{ backgroundImage: `url("${member.image}")`}} />

                                        <div className="details">
                                            <div className="name">{member.name}</div>
                                            <div className="title">{member.title}</div>
                                            <ul className="social-list">
                                                <li className="social-link fa fa-facebook" />
                                                <li className="social-link fa fa-twitter" />
                                                <li className="social-link fa fa-instagram" />
                                            </ul>
                                        </div>
                                    </header>
                                    <div className="content">
                                        {utils.map(member.bio.split('\n'), text => 
                                            <p>{text}</p>
                                        )}
                                    </div>
                                </li>
                            )}
                        </ul>
                    </div>
                </section>

                <PageFooter />
            </Page>
        );
    }
}
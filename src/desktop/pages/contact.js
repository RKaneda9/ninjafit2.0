const Inferno     = require('inferno');
const Component   = require('inferno-component');
const constants   = require('helpers/constants');
const utils       = require('helpers/utils');
const settings    = require('helpers/settings');
const PageFooter  = require('desktop/containers/page-footer');
const ContactForm = require('desktop/containers/contact-form');
const Page        = require('desktop/components/page');
const {commands}  = require('services/event-system');

module.exports = class WOD extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    showTomorrow () { this.setState({ date: this.state.date.getTomorrow () }); }
    showYesterday() { this.setState({ date: this.state.date.getYesterday() }); }

    render() {
        return (
            <Page {...this.props} name={constants.pages.contact}>
                <section className="landing">
                    <header className="header-bar">
                        <p className="title">Contact</p>
                        
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

                <section className="visit-us">
                    <header className="header">Come Visit Us!</header>

                    <div className="content">
                        <a href="http://maps.google.com/maps?q=6541+North+Orange+Blossom+Trail,+Suit+100+Orlando+Florida+32810" target="nfg-map" className="contact-map">
                            <div className="image-wrapper">
                                <div className="image" style={{ backgroundImage: `url("./images/map.jpg")`}} />
                            </div>
                        </a>
                        <div className="contact-items">
                            <div className="contact-item">
                                <div className="icon fa fa-envelope" />
                                <div className="value">ninjafitgyms@gmail.com</div>
                            </div>
                            <div className="contact-item">
                                <div className="icon fa fa-phone" />
                                <div className="value">407-250-4496</div>
                            </div>
                        </div>
                    </div>
                </section>

                <ContactForm />
                <PageFooter />
            </Page>
        );
    }
}
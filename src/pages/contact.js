const Inferno   = require('inferno');
const Component = require('inferno-component');
const utils                    = require('helpers/utils');
const settings                 = require('helpers/settings');
const {commands}               = require('services/event-system');
const constants                = require('helpers/constants');
const PageFooter               = require('containers/page-footer');
const {Page}                   = require('components/pages/base');
const {Row, Col}               = require('components/form');
const {TextBox, TextArea}      = require('containers/inputs');

const {

    Button,
    MenuButton,
    CloseButton

} = require('components/buttons');

const {

    TriangleUpRight,
    TriangleDown,
    Background

} = require('components/backgrounds');


module.exports = class Contact extends Component {
    constructor(props) {
        super(props);

        this.onResize   = this.onResize  .bind(this);
        this.scrollDown = this.scrollDown.bind(this);

        this.state = {
            sliderStyles: {}
        };
    }

    componentDidMount() {
        //window.addEventListener('resize', this.onResize);

        //setTimeout(this.onResize);
    }

    componentWillUnmount() {
        //window.removeEventListener('resize', this.onResize);
    }

    onResize() {
        
    }

    scrollDown(e) {
        console.log("TODO");
    }

    render() {
        let i = 0;

        return (
            <Page name="contact">
                <header className="header-bar">
                    <p className="title">Contact</p>
                    <MenuButton onClick={commands.openMenu.emit} />
                </header>
                
                <section className="landing">
                    <header className="header">Get in Touch</header>

                    <div className="content">
                        <Row>
                            <div className="contact-item">
                                <div className="icon fa fa-envelope" />
                                <div className="value">ninjafitgyms@gmail.com</div>
                            </div>
                            <div className="contact-item">
                                <div className="icon fa fa-phone" />
                                <div className="value">407-250-4496</div>
                            </div>
                        </Row>
                        <Row>
                            <Col>
                                <TextBox maxLength={99} placeholder="First Name" />
                            </Col>
                            <Col>
                                <TextBox maxLength={99} placeholder="Last Name" />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <TextBox maxLength={199} placeholder="Your Email" />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <TextArea maxLength={999} placeholder="Your Email" />
                            </Col>
                        </Row>
                    </div>

                    <footer className="footer">
                        <Button>Send</Button>
                    </footer>
                </section>

                <section className="map">
                    <div className="image-wrapper">
                        <div className="image" />
                    </div>
                </section>

                <PageFooter
                    onRedirect={this.props.onRedirect}
                    socialLinks={this.props.socialLinks} />
            </Page>
        );
    }
}
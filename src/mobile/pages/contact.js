const Inferno   = require('inferno');
const Component = require('inferno-component');
const utils                    = require('helpers/utils');
const settings                 = require('helpers/settings');
const {commands}               = require('services/event-system');
const constants                = require('helpers/constants');
const PageFooter               = require('mobile/containers/page-footer');
const {Page}                   = require('mobile/components/pages/base');
const {Row, Col}               = require('mobile/components/form');
const {TextBox, TextArea}      = require('mobile/containers/inputs');

const {

    Button,
    MenuButton,
    CloseButton

} = require('mobile/components/buttons');

const {

    TriangleUpRight,
    TriangleDown,
    Background

} = require('mobile/components/backgrounds');


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

                <a href="http://maps.google.com/maps?q=6541+North+Orange+Blossom+Trail,+Suit+100+Orlando+Florida+32810" target="nfg-map" className="contact-map">
                    <div className="image-wrapper">
                        <div className="image" style={{ backgroundImage: `url("./images/map.jpg")`}} />
                    </div>
                </a>
            </Page>
        );
    }
}
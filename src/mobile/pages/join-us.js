const Inferno   = require('inferno');
const Component = require('inferno-component');
const utils                    = require('mobile/helpers/utils');
const settings                 = require('mobile/helpers/settings');
const {commands}               = require('mobile/services/event-system');
// const constants                = require('helpers/constants');
const PageFooter               = require('mobile/containers/page-footer');
const {Row, Col}               = require('mobile/components/form');
const {TextBox, TextArea}      = require('mobile/containers/inputs');
// const {Page}                   = require('components/pages/base');
// const {Row, Col}               = require('components/form');
// const {TextBox, TextArea}      = require('containers/inputs');

const {

    Button,
    MenuButton,
    CloseButton

} = require('mobile/components/buttons');

const items = [
    {
        title: "Unlimited",
        price: "$20",
        unit:  "month",
        desc:  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        props: [
            "1 hour access",
            "Access to entire gym",
            "Personal trainer available",
            "Daily WOD"
        ]
    },

    {
        title: "Unlimited",
        price: "$20",
        unit:  "month",
        desc:  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        props: [
            "1 hour access",
            "Access to entire gym",
            "Personal trainer available",
            "Daily WOD"
        ]
    },

    {
        title: "Unlimited",
        price: "$20",
        unit:  "month",
        desc:  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        props: [
            "1 hour access",
            "Access to entire gym",
            "Personal trainer available",
            "Daily WOD"
        ]
    },

    {
        title: "Unlimited",
        price: "$20",
        unit:  "month",
        desc:  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        props: [
            "1 hour access",
            "Access to entire gym",
            "Personal trainer available",
            "Daily WOD"
        ]
    },

    {
        title: "Unlimited",
        price: "$20",
        unit:  "month",
        desc:  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        props: [
            "1 hour access",
            "Access to entire gym",
            "Personal trainer available",
            "Daily WOD"
        ]
    },

    {
        title: "Unlimited",
        price: "$20",
        unit:  "month",
        desc:  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        props: [
            "1 hour access",
            "Access to entire gym",
            "Personal trainer available",
            "Daily WOD"
        ]
    }
]

module.exports = class JoinUs extends Component {
    constructor(props) {
        super(props);

        // this.onMouseDown = this.onMouseDown.bind(this);
        // this.onMouseMove = this.onMouseMove.bind(this);
        // this.onMouseUp   = this.onMouseUp  .bind(this);

        let pIndex = items.length - 1;

        this.state = {
            currPriceIndex: 0
        };
    }

    componentDidMount() {
        //window.addEventListener('resize', this.onResize);

        //setTimeout(this.onResize);
    }

    componentWillUnmount() {
        //window.removeEventListener('resize', this.onResize);
    }

    nextPriceItem() {
        this.setState({ currPriceIndex: (this.state.currPriceIndex + 1) % items.length });
    }

    prevPriceItem() {
        let i = this.state.currPriceIndex - 1; if (i < 0) i = items.length - 1;

        this.setState({ currPriceIndex: i });
    }

    selectPriceItem(i) {
        this.setState({ currPriceIndex: i });
    }

    getPriceOffset(offset) {
        var i = this.state.currPriceIndex + offset;

        while (i <  0)            i+= items.length;
        while (i >= items.length) i-= items.length;

        return i;
    }

    render() {
        return (
            <div className="page join-us-page">
                <header className="header-bar">
                    <p className="title">Join Us</p>
                    <MenuButton onClick={commands.openMenu.emit} />
                </header>
                
                <section className="pricing">
                    <header className="header">Our Packages</header>

                    <ul className="pricing-list">
                        {utils.map(items, (props, key, i) => {
                            let pos = 'hidden';

                                 if (i == this.state.currPriceIndex) { pos = 'curr';   }
                            else if (this.getPriceOffset(-1)   == i) { pos = 'left';   }
                            else if (this.getPriceOffset( 1)   == i) { pos = 'right';  }
                            else if (this.getPriceOffset(-2)   == i) { pos = 'left2';  }
                            else if (this.getPriceOffset( 2)   == i) { pos = 'right2'; }
                            else if (this.getPriceOffset(-3)   == i) { pos = 'left3';  }
                            else if (this.getPriceOffset( 3)   == i) { pos = 'right3'; }
                            else if (this.getPriceOffset(-4)   == i) { pos = 'left4';  }
                            else if (this.getPriceOffset( 4)   == i) { pos = 'right4'; }

                            return (
                                <li className={`pricing-item ${pos}`}>
                                    <header className="item-header">
                                        <div className="item-title">{props.title}</div>
                                        <div className="item-price">
                                            <div className="price">{props.price}</div>
                                            <div className="unit">{props.unit}</div>
                                        </div>
                                    </header>
                                    <div className="item-content">
                                        <div className="item-desc">{props.desc}</div>
                                        <ul className="item-prop-list">
                                            {utils.map(props.props, prop => 
                                                <li className="item-prop">{prop}</li>
                                            )}
                                        </ul>
                                    </div>
                                    <footer className="item-footer">
                                        <button className="btn">Purchase</button>
                                    </footer>
                                </li>
                            );
                        })}
                    </ul>

                    <ul className="price-selector-list">
                        {utils.map(items, (props, key, i) => 
                            <li 
                                onClick={() => this.selectPriceItem(i)}
                                className={`price-selector${i == this.state.currPriceIndex ? ' active' : ''}`} />
                        )}
                    </ul>
                </section>

                <section className="visit-us">
                    <header className="header">Come Visit Us!</header>

                    <div className="content">
                        <a href="http://maps.google.com/maps?q=6541+North+Orange+Blossom+Trail,+Suit+100+Orlando+Florida+32810" target="nfg-map" className="contact-map">
                            <div className="image-wrapper">
                                <div className="image" style={{ backgroundImage: `url("./images/map.jpg")`}} />
                            </div>
                        </a>
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
                    </div>
                </section>

                <section className="questions">
                    <header className="header">Questions? Let Us Help With That</header>

                    <div className="content">
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
            </div>
        );
    }
}
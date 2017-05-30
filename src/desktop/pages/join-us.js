const Inferno     = require('inferno');
const Component   = require('inferno-component');
const constants   = require('helpers/constants');
const utils       = require('helpers/utils');
const settings    = require('helpers/settings');
const PageFooter  = require('desktop/containers/page-footer');
const Page        = require('desktop/components/page');
const {commands}  = require('services/event-system');

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

        let pIndex = items.length - 1;

        this.state = { currPriceIndex: 0 };
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
            <Page {...this.props} name={constants.pages.joinUs}>
                <section className="landing">
                    <header className="header-bar">
                        <p className="title">Join Us</p>
                        
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
                        <div className="row">
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

                <section className="questions">
                    <header className="header">Questions? Let Us Help With That</header>

                    <div className="content">
                        <div className="row">
                            <div className="col">
                                <input type="text" maxlength={99} placeholder="First Name" />
                            </div>
                            <div className="col">
                                <input type="text" maxlength={99} placeholder="Last Name" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <input type="text" maxlength={199} placeholder="Your Email" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <textarea maxlength={999} placeholder="What can we help you with?" />
                            </div>
                        </div>
                    </div>

                    <footer className="footer">
                        <button className="btn">Send</button>
                    </footer>
                </section>
                
                <PageFooter />
            </Page>
        );
    }
}
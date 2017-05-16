const Inferno   = require('inferno');
const Component = require('inferno-component');
const utils                    = require('helpers/utils');
const settings                 = require('helpers/settings');
const {commands}               = require('services/event-system');
// const constants                = require('helpers/constants');
const PageFooter               = require('containers/page-footer');
// const {Page}                   = require('components/pages/base');
// const {Row, Col}               = require('components/form');
// const {TextBox, TextArea}      = require('containers/inputs');

const {

    Button,
    MenuButton,
    CloseButton

} = require('components/buttons');

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

                <PageFooter socialLinks={this.props.socialLinks} />
            </div>
        );
    }
}
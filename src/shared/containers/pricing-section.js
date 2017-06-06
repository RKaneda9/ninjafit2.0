const Inferno   = require('inferno');
const Component = require('inferno-component');
const utils     = require('helpers/utils');

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

module.exports = class PricingSection extends Component {
    constructor(props) {
        super(props);

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

    render() {
        return (
            <section className="pricing">
                <header className="header">Our Packages</header>

                <ul className="pricing-list">
                    {utils.map(items, (props, key, i) => {
                        let pos, offset = utils.getListOffset(i, this.state.currPriceIndex, items.length);

                             if (offset == 0) pos = 'curr';
                        else if (offset <  0) pos = 'left'  + (-offset);
                        else if (offset >  0) pos = 'right' +   offset;

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
        );
    }
}
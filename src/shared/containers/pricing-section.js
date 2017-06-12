const Inferno   = require('inferno');
const Component = require('inferno-component');
const utils     = require('helpers/utils');
const items     = require('helpers/settings').pricePackages;

module.exports = class PricingSection extends Component {
    constructor(props) {
        super(props);

        this.state = { index: 1 };
    }

    selectPriceItem(i) {
        this.setState({ index: i });
    }

    render() {
        return (
            <section className="pricing">
                <header className="header">Our Packages</header>

                <ul className="pricing-list">
                    {utils.map(items, (props, key, i) => {
                        let pos, offset = i - this.state.index;
                        
                             if (offset == 0) pos = 'curr';
                        else if (offset <  0) pos = 'left'  + Math.min(-offset, 4);
                        else if (offset >  0) pos = 'right' + Math.min( offset, 4);

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
                            className={`price-selector${i == this.state.index ? ' active' : ''}`} />
                    )}
                </ul>
            </section>
        );
    }
}
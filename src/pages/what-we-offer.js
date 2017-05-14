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

    TriangleLeft,
    TriangleRight,
    Background

} = require('components/backgrounds');

module.exports = class WhatWeOffer extends Component {
    constructor(props) {
        super(props);

        this.onResize   = this.onResize  .bind(this);
        this.scrollDown = this.scrollDown.bind(this);
        this.view       = this.view      .bind(this);
        this.closePopup = this.closePopup.bind(this);

        this.state = {

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

    view(item, i, size) {
        item.index      = i;
        item.parentSize = size;

        this.setState({ selectedEquipment: item });
    }

    closePopup() {
        this.setState({ selectedEquipment: null })
    }

    scrollDown(e) {
        console.log("TODO");
    }

    render() {
        let i = 0;

        return (
            <Page name="what-we-offer">
                <header className="header-bar">
                    <p className="title">What We Offer</p>
                    <MenuButton onClick={commands.openMenu.emit} />
                </header>
                <section className="ninja-training">
                    <header className="header">Ninja Warrior Training</header>
                    <div className="content">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>
                </section>

                <section className="obstacle-training">
                    <Background>
                        <TriangleLeft className="triangle left" size="small" />
                        <TriangleRight className="triangle right" size="small" />
                    </Background>
                    <div className="image" />

                    <header className="header">Obstacle Training</header>
                    <div className="content">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>
                </section>

                <section className="obstacle-list">
                    <ul className="image-list">
                        {utils.map(settings.obstacles, (props, key, i) =>
                            <li key={i} className="image-item">
                                <div className="image-wrapper">
                                    <div 
                                        className="image" 
                                        style={{ backgroundImage: `url("${props.images[0]}")`}} />
                                </div>

                                <div className="title">{props.title}</div>
                                <footer className="footer">
                                    <Button onClick={e => this.view(props, i, Object.keys(settings.obstacles).length)}>View</Button>
                                </footer>
                            </li>
                        )}
                    </ul>
                </section>

                <section className="functional-training">
                    <Background>
                        <TriangleLeft className="triangle left" size="small" />
                        <TriangleRight className="triangle right" size="small" />
                    </Background>
                    <div className="image" />

                    <header className="header">Functional Training</header>
                    <div className="content">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>
                </section>

                <section className="obstacle-list">
                    <ul className="image-list">
                        {utils.map(settings.functionalEquipment, (props, key, i) =>
                            <li key={i} className="image-item">
                                <div className="image-wrapper">
                                    <div 
                                        className="image" 
                                        style={{ backgroundImage: `url("${props.images[0]}")`}} />
                                </div>

                                <div className="title">{props.title}</div>
                                <footer className="footer">
                                    <Button onClick={e => this.view(props, i, Object.keys(settings.functionalEquipment).length)}>View</Button>
                                </footer>
                            </li>
                        )}
                    </ul>
                </section>

                <PageFooter
                    onRedirect={this.props.onRedirect}
                    socialLinks={this.props.socialLinks} />

                <div className={`popup equipment ${this.state.selectedEquipment ? "open" : ""}`}>
                    <header className="header">
                        <div className="title">{this.state.selectedEquipment ? this.state.selectedEquipment.title : null}</div>
                        <CloseButton onClick={this.closePopup} />
                    </header>
                    <ul className="equipment-images">
                        {this.state.selectedEquipment ? utils.map(this.state.selectedEquipment.images, image => 
                            <li className="image-item">
                                <div className="image-wrapper">
                                    <div className="image" style={{ backgroundImage: `url("${image}")`}} />
                                </div>
                            </li>
                        ) : null}
                    </ul>

                    <div className="content">
                        {this.state.selectedEquipment ? utils.map(this.state.selectedEquipment.description.split('\n'), text => 
                            <p>{text}</p>
                        ) : null}
                    </div>

                    <div className="footer">
                        <button className="option-btn fa fa-angle-left" />
                        <div className="details">{this.state.selectedEquipment ?
                            `${this.state.selectedEquipment.index + 1}/${this.state.selectedEquipment.parentSize}`
                        : ''}</div>
                        <button className="option-btn fa fa-angle-right" />
                    </div>
                </div>
                <div className="popup-cover" />
            </Page>
        );
    }
}
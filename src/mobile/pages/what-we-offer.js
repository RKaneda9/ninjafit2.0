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

    TriangleLeft,
    TriangleRight,
    Background

} = require('mobile/components/backgrounds');

module.exports = class WhatWeOffer extends Component {
    constructor(props) {
        super(props);

        this.onResize     = this.onResize    .bind(this);
        this.scrollDown   = this.scrollDown  .bind(this);
        this.view         = this.view        .bind(this);
        this.closePopup   = this.closePopup  .bind(this);
        this.prevSelected = this.prevSelected.bind(this);
        this.nextSelected = this.nextSelected.bind(this);

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

    view(item, i, parent) {
        item.index = i;
        this.selectedEquipmentParent = parent;

        this.setState({ selectedEquipment: item });
    }

    closePopup() {
        this.setState({ selectedEquipment: null })
    }

    scrollDown(e) {
        console.log("TODO");
    }

    prevSelected() {
        if (this.state.selectedEquipment &&
            this.selectedEquipmentParent) {

            let keys   = Object.keys(this.selectedEquipmentParent);
            let index  = this.state.selectedEquipment.index - 1; if (index < 0) index = keys.length - 1;
            let item   = this.selectedEquipmentParent[keys[index]];
            item.index = index;

            this.setState({ selectedEquipment: item });
        }
    }

    nextSelected() {
        if (this.state.selectedEquipment &&
            this.selectedEquipmentParent) {

            let keys   = Object.keys(this.selectedEquipmentParent);
            let index  = (this.state.selectedEquipment.index + 1) % keys.length;
            let item   = this.selectedEquipmentParent[keys[index]];
            item.index = index;

            this.setState({ selectedEquipment: item });
        }
    }

    render() {
        let i        = 0, 
            selected = this.state.selectedEquipment || {};

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
                        <TriangleRight position="v-full left" size="large" />
                    </Background>

                    <header className="header">Obstacle Training</header>
                    <div className="content">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>

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
                                    <Button onClick={e => this.view(props, i, settings.obstacles)}>View</Button>
                                </footer>
                            </li>
                        )}
                    </ul>
                </section>

                <section className="functional-training">

                    <header className="header">Functional Training</header>
                    <div className="content">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>

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
                                    <Button onClick={e => this.view(props, i, settings.functionalEquipment)}>View</Button>
                                </footer>
                            </li>
                        )}
                    </ul>
                </section>

                <section className="kids">
                    <Background>
                        <TriangleRight  position="top small left" size="small" />
                        <TriangleLeft position="v-full right" size="large" />
                    </Background>

                    <div className="image" style={{ backgroundImage: `url("https://scontent-atl3-1.cdninstagram.com/t51.2885-15/e35/16229014_645122905690048_6995751145289285632_n.jpg")`}} />
                
                    <header className="header">NinjaFit Kids</header>
                    <div className="content">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </div>
                </section>

                <section className="hourly-workout">
                    <div className="image" style={{ backgroundImage: `url("https://scontent-atl3-1.cdninstagram.com/t51.2885-15/e35/16229014_645122905690048_6995751145289285632_n.jpg")`}} />
                
                    <header className="header">Get an Hour Workout With a Trainer</header>
                    <div className="content">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </div>
                </section>

                <section className="special-events">
                    <Background>
                        <TriangleLeft  position="v-half bottom right" size="medium" />
                        <TriangleRight position="v-full left" size="large" />
                    </Background>
                    <div className="image" style={{ backgroundImage: `url("https://scontent-atl3-1.cdninstagram.com/t51.2885-15/e35/16229014_645122905690048_6995751145289285632_n.jpg")`}} />
                
                    <header className="header">Special Events</header>
                    <div className="content">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </div>
                </section>

                <div className={`popup ${this.state.selectedEquipment ? " open" : ""}`}>
                    <div className="cover" />
                    <div className="content equipment">
                        <header className="header">
                            <div className="title">{selected.title}</div>
                            <CloseButton onClick={this.closePopup} />
                        </header>
                        <ul className="equipment-images">
                            {utils.map(selected.images, image => 
                                <li className="image-item">
                                    <div className="image-wrapper">
                                        <div className="image" style={{ backgroundImage: `url("${image}")`}} />
                                    </div>
                                </li>
                            )}
                        </ul>

                        <div className="content">
                            {utils.map((selected.description || "").split('\n'), text => 
                                <p>{text}</p>
                            )}
                        </div>

                        <div className="footer">
                            <button 
                                className="option-btn fa fa-angle-left"
                                onClick={this.prevSelected} />

                            <div className="details">{`${(selected.index || 0) + 1}/${(this.selectedEquipmentParent || []).length}`}</div>

                            <button 
                                className="option-btn fa fa-angle-right"
                                onClick={this.nextSelected} />
                        </div>
                    </div>
                </div>
            </Page>
        );
    }
}
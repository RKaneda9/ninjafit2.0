const Inferno    = require('inferno');
const Component  = require('inferno-component');
const utils      = require('helpers/utils');
const settings   = require('helpers/settings');
const HeaderBar  = require('mobile/components/sections/header-bar');
const PageFooter = require('mobile/containers/page-footer');
const Page       = require('mobile/components/page');
const Popup      = require('mobile/components/popup');

const {

    Button,
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

        this.view         = this.view        .bind(this);
        this.closePopup   = this.closePopup  .bind(this);
        this.prevSelected = this.prevSelected.bind(this);
        this.nextSelected = this.nextSelected.bind(this);

        this.state = {};
    }

    view(item, i, parent) {
        item.index = i;
        this.selectedParent = parent;

        this.setState({ selected: item });
    }

    closePopup() {
        this.setState({ selected: null })
    }

    prevSelected() {
        if (this.state.selected &&
            this.selectedParent) {

            let keys   = Object.keys(this.selectedParent);
            let index  = this.state.selected.index - 1; if (index < 0) index = keys.length - 1;
            let item   = this.selectedParent[keys[index]];
            item.index = index;

            this.setState({ selected: item });
        }
    }

    nextSelected() {
        if (this.state.selected &&
            this.selectedParent) {

            let keys   = Object.keys(this.selectedParent);
            let index  = (this.state.selected.index + 1) % keys.length;
            let item   = this.selectedParent[keys[index]];
            item.index = index;

            this.setState({ selected: item });
        }
    }

    render() {
        let i        = 0, 
            selected = this.state.selected || {};

        return (
            <Page name="what-we-offer">
                <HeaderBar title="What We Offer"></HeaderBar>

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
                            <li className="image-item">
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
                            <li className="image-item">
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

                <Popup 
                    open={this.state.selected}
                    type="equipment">

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

                        <div className="details">{`${(selected.index || 0) + 1}/${(this.selectedParent || []).length}`}</div>

                        <button 
                            className="option-btn fa fa-angle-right"
                            onClick={this.nextSelected} />
                    </div>
                </Popup>
            </Page>
        );
    }
}
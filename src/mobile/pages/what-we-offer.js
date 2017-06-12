const Inferno    = require('inferno');
const Component  = require('inferno-component');
const utils      = require('helpers/utils');
const settings   = require('helpers/settings');
const HeaderBar  = require('mobile/components/sections/header-bar');
const PageFooter = require('mobile/containers/page-footer');
const Page       = require('mobile/components/page');
const Popup      = require('mobile/components/popup');

const AngleLeftIcon  = require('shared/components/icons/angle-left');
const AngleRightIcon = require('shared/components/icons/angle-right');

const {

    Section,
    Header,
    Content,
    Image,
    Footer

} = require('shared/components/section');

const {

    Button,
    CloseButton

} = require('shared/components/buttons');

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
        this.index          = i;
        this.selectedParent = parent;

        this.setState({ showPopup: true, selected: item });
    }

    closePopup() {
        this.setState({ showPopup: false });
    }

    prevSelected() {
        if (this.state.selected &&
            this.selectedParent) {

            let keys   = Object.keys(this.selectedParent);
            let index  = this.index - 1; if (index < 0) index = keys.length - 1;
            let item   = this.selectedParent[keys[index]];
            this.index = index;

            this.setState({ selected: item });
        }
    }

    nextSelected() {
        if (this.state.selected &&
            this.selectedParent) {

            let keys   = Object.keys(this.selectedParent);
            let index  = (this.index + 1) % keys.length;
            let item   = this.selectedParent[keys[index]];
            this.index = index;

            this.setState({ selected: item });
        }
    }

    render() {
        let i        = 0, 
            selected = this.state.selected || {};

        return (
            <Page name="what-we-offer">
                <HeaderBar title="What We Offer"></HeaderBar>

                <Section name="ninja-training">
                    <Header  text={settings.offerPage.ninja.header}  />
                    <Content text={settings.offerPage.ninja.content} />
                </Section>

                <Section name="obstacle-training">
                    <Background>
                        <TriangleRight position="v-full left" size="large" />
                    </Background>

                    <Header  text={settings.offerPage.obstacle.header}  />
                    <Content text={settings.offerPage.obstacle.content} />

                    <ul className="image-list">
                        {utils.map(settings.obstacles, (props, key, i) =>
                            <li className="image-item">
                                <div className="image-wrapper">
                                    <Image url={props.images[0]} />
                                </div>

                                <div className="title">{props.title}</div>
                                <Footer>
                                    <Button onClick={e => this.view(props, i, settings.obstacles)}>View</Button>
                                </Footer>
                            </li>
                        )}
                    </ul>
                </Section>

                <Section name="functional-training">

                    <Header  text={settings.offerPage.functional.header}  />
                    <Content text={settings.offerPage.functional.content} />

                    <ul className="image-list">
                        {utils.map(settings.functionalEquipment, (props, key, i) =>
                            <li className="image-item">
                                <div className="image-wrapper">
                                    <Image url={props.images[0]} />
                                </div>

                                <div className="title">{props.title}</div>
                                <Footer>
                                    <Button onClick={e => this.view(props, i, settings.functionalEquipment)}>View</Button>
                                </Footer>
                            </li>
                        )}
                    </ul>
                </Section>

                <Section name="kids">
                    <Background>
                        <TriangleRight position="top small left" size="small" />
                        <TriangleLeft position="v-full right" size="large" />
                    </Background>

                    <Image    url={settings.offerPage.kids.image}   />
                    <Header  text={settings.offerPage.kids.header}  />
                    <Content text={settings.offerPage.kids.content} />
                </Section>

                <Section name="hourly-workout">
                    <Image    url={settings.offerPage.workout.image}   />
                    <Header  text={settings.offerPage.workout.header}  />
                    <Content text={settings.offerPage.workout.content} />
                </Section>

                <Section name="special-events">
                    <Background>
                        <TriangleLeft  position="v-half bottom right" size="x" />
                        <TriangleRight position="v-full left" />
                    </Background>
                    <Image    url={settings.offerPage.events.image}   />
                    <Header  text={settings.offerPage.events.header}  />
                    <Content text={settings.offerPage.events.content} />
                </Section>

                <Popup 
                    open={this.state.showPopup}
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

                    <Content text={selected.description} />

                    <Footer>
                        <button 
                            className="option-btn"
                            onClick={this.prevSelected}>
                            <AngleLeftIcon />
                        </button>

                        <div className="details">{`${(this.index || 0) + 1}/${(this.selectedParent || []).length}`}</div>

                        <button 
                            className="option-btn"
                            onClick={this.nextSelected}>
                            <AngleRightIcon />
                        </button>
                    </Footer>
                </Popup>
            </Page>
        );
    }
}
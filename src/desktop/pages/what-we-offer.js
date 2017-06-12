const Inferno     = require('inferno');
const Component   = require('inferno-component');
const constants   = require('helpers/constants');
const utils       = require('helpers/utils');
const settings    = require('helpers/settings');
const PageFooter  = require('desktop/containers/page-footer');
const Page        = require('desktop/components/page');
const HeaderBar   = require('desktop/components/sections/header-section');

const {

    HexHalfLeft,
    HexHalfRight

} = require('desktop/components/backgrounds');

const {

    Section,
    Header,
    Content,
    Image,
    Footer

} = require('shared/components/section');

module.exports = class WhatWeOffer extends Component {
    constructor(props) {
        super(props);

        this.state = {
              obstacleIndex: 1,
            functionalIndex: 1
        };
    }

    selectObstacle(i) {
        this.setState({ obstacleIndex: i });
    }

    selectFunctional(i) {
        this.setState({ functionalIndex: i });
    }

    render() {
        return (
            <Page {...this.props} name={constants.pages.whatWeOffer}>
                <HeaderBar title="What We Offer" />

                <Section name="ninja-training">
                    <Image    url={settings.offerPage.ninja.image}   />
                    <Header  text={settings.offerPage.ninja.header}  />
                    <Content text={settings.offerPage.ninja.content} />
                </Section>

                <Section name="obstacle-training">
                    <Header  text={settings.offerPage.obstacle.header}  />
                    <Content text={settings.offerPage.obstacle.content} />

                    <ul className="equipment-list">
                        {utils.map(settings.obstacles, (props, key, i) => {

                            let className = "equipment-item",
                                offset    = i - this.state.obstacleIndex;

                                 if (offset == 0) className += ' curr';
                            else if (offset <  0) className += ' left'  + Math.min(-offset, 4);
                            else if (offset >  0) className += ' right' + Math.min( offset, 4);


                            return (
                                <li className={className}>

                                    <div className="item-header">
                                        <div className="item-title">{props.title}</div>
                                    </div>

                                    <ul className="equipment-images">
                                        {utils.map(props.images, image => 
                                            <li className="image-item">
                                                <div className="image-wrapper">
                                                    <div className="image" style={{ backgroundImage: `url("${image}")`}} />
                                                </div>
                                            </li>
                                        )}
                                    </ul>

                                    <Content text={props.description} />
                                </li>
                            );
                        })}
                    </ul>

                    <ul className="equipment-selector-list">
                        {utils.map(settings.obstacles, (props, key, i) => 
                            <li 
                                onClick={() => this.selectObstacle(i)}
                                className={`equipment-selector${i == this.state.obstacleIndex ? ' active' : ''}`} />
                        )}
                    </ul>
                </Section>

                <Section name="functional-training">
                    <Header  text={settings.offerPage.functional.header}  />
                    <Content text={settings.offerPage.functional.content} />

                    <ul className="equipment-list">
                        {utils.map(settings.functionalEquipment, (props, key, i) => {

                            let className = "equipment-item",
                                offset    = i - this.state.functionalIndex;

                                 if (offset == 0) className += ' curr';
                            else if (offset <  0) className += ' left'  + Math.min(-offset, 4);
                            else if (offset >  0) className += ' right' + Math.min( offset, 4);


                            return (
                                <li className={className}>

                                    <div className="item-header">
                                        <div className="item-title">{props.title}</div>
                                    </div>

                                    <ul className="equipment-images">
                                        {utils.map(props.images, image => 
                                            <li className="image-item">
                                                <div className="image-wrapper">
                                                    <div className="image" style={{ backgroundImage: `url("${image}")`}} />
                                                </div>
                                            </li>
                                        )}
                                    </ul>

                                    <Content text={props.description} />
                                </li>
                            );
                        })}
                    </ul>

                    <ul className="equipment-selector-list">
                        {utils.map(settings.functionalEquipment, (props, key, i) => 
                            <li 
                                onClick={() => this.selectFunctional(i)}
                                className={`equipment-selector${i == this.state.functionalIndex ? ' active' : ''}`} />
                        )}
                    </ul>
                </Section>

                <Section name="details"> 
                    <HexHalfLeft />
                    <HexHalfRight />

                    <Section name="kids">
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
                        <Image    url={settings.offerPage.events.image}   />
                        <Header  text={settings.offerPage.events.header}  />
                        <Content text={settings.offerPage.events.content} />
                    </Section>
                </Section>

                <PageFooter />
            </Page>
        );
    }
}
const Inferno   = require('inferno');
const Component = require('inferno-component');
const utils               = require('helpers/utils');
const settings            = require('helpers/settings').homePage;
const {events,commands}          = require('services/event-system');
const constants           = require('helpers/constants');
const {Page}              = require('mobile/components/pages/base');
const {Row, Col}          = require('mobile/components/form');
const {TextBox, TextArea} = require('mobile/containers/inputs');
const {

          MenuButton,
         CloseButton,
              Button

} = require('mobile/components/buttons');

const {

    Background,
    TriangleRight,
    TriangleLeft,
    TriangleDown,
    TriangleUpRight,
    TriangleUpLeft,
    MiddleConnector

} = require('mobile/components/backgrounds');

module.exports = class Home extends Component {
    constructor(props) {
        super(props);

        this.resize     = this.resize    .bind(this);
        this.nextImage  = this.nextImage .bind(this);
        this.goToImage  = this.goToImage .bind(this);
        this.closePopup = this.closePopup.bind(this);
        this.playIntro  = this.playIntro .bind(this);

        this.nextTestimonial = this.nextTestimonial.bind(this);
        this.prevTestimonial = this.prevTestimonial.bind(this);

        this.state = {
                 sliderIndex: 0,
            testimonialIndex: 0
        };
    }

    componentDidMount() {
        this.         resizeTimeoutId = setTimeout(this.resize,          100);
        this.      nextImageTimeoutId = setTimeout(this.nextImage,       constants.imageSliderTimeout);
        this.nextTestimonialTimeoutId = setTimeout(this.nextTestimonial, constants.testimonialTimeout);

        events.onWindowResize.subscribe(this.resize);
    }

    componentWillUnmount() {
        events.onWindowResize.unsubscribe(this.resize);
    }

    nextImage() {
        this.setState({ sliderIndex: (this.state.sliderIndex + 1) % settings.home.images.length });

        this.nextImageTimeoutId = setTimeout(this.nextImage, constants.imageSliderTimeout);
    }

    goToImage(i) {
        if (i === this.state.sliderIndex) return;

        clearTimeout(this.nextImageTimeoutId);

        this.setState({ sliderIndex: i });

        this.nextImageTimeoutId = setTimeout(this.nextImage, constants.imageSliderTimeout);
    }

    nextTestimonial() {
        clearTimeout(this.nextTestimonialTimeoutId);

        this.setState({ testimonialIndex: (this.state.testimonialIndex + 1) % settings.testimonials.length });

        this.nextTestimonialTimeoutId = setTimeout(this.nextTestimonial, constants.testimonialTimeout);
    }

    prevTestimonial() {
        clearTimeout(this.nextTestimonialTimeoutId);

        let i = this.state.testimonialIndex - 1; if (i < 0) i = settings.testimonials.length - 1;

        this.setState({ testimonialIndex: i });

        this.nextTestimonialTimeoutId = setTimeout(this.nextTestimonial, constants.testimonialTimeout);
    }

    playIntro() {
        if (settings.about.introVideo) {
            this.setState({ 
                showVideo: settings.about.introVideo 
            });
        }
    }

    closePopup() {
        this.setState({ showVideo: false });
    }

    resize() {
        if (this.header) {

            let c     = this.header.parentElement;
            //let o     = 45;
            let x1    = c.clientWidth;
            let y1    = this.header.clientHeight;
            let x2    = c.clientWidth  / 2;
            let y2    = c.clientHeight / 2;// + o;
            let sqrt3 = Math.sqrt(3);

            let y = - (sqrt3 / 4) * (x1 - y1 * sqrt3 - x2 - y2 / sqrt3);
            let x = sqrt3 * y - y1 * sqrt3 + x1;

            let r  = Math.sqrt(Math.pow(x - x2, 2) + Math.pow(y - y2, 2));
            let h  = 2 * r;
            let x3 = x2 - r / 2;
            let r2 = 2 / sqrt3 * (c.clientWidth - x3);
            let w  = 2 * r2;

            let styles = {
                width:  c.clientWidth,
                height: (2 * c.clientWidth / sqrt3 + c.clientHeight - 2 * this.header.clientHeight)// + 2 * o
            }

            this.setState({ 
                 sliderStyles: { width: w, height: h },
                wrapperStyles: styles
            });
        }
    }

    render() {
        let i = 0;

        return (
            <Page name="home">
               <section className="landing">
                    <header ref={e => (this.header = e)} className="header">
                        <p className="main">NinjaFit</p>
                        <p className="sub">Gym</p>

                        <MenuButton onClick={commands.openMenu.emit} />
                    </header>

                    <div style={this.state.sliderStyles} className="image-slider">

                        <div 
                            style={this.state.wrapperStyles} 
                            className="image-wrapper">

                            {utils.map(settings.home.images, (image, i) => {
                                let pos = 'hidden';

                                     if (i == this.state.sliderIndex)                                                       pos = 'curr';
                                else if (i == utils.getListOffset(this.state.sliderIndex, -1, settings.home.images.length)) pos = 'left';
                                else if (i == utils.getListOffset(this.state.sliderIndex,  1, settings.home.images.length)) pos = 'right';
                                else if (i == utils.getListOffset(this.state.sliderIndex, -2, settings.home.images.length)) pos = 'left2';
                                else if (i == utils.getListOffset(this.state.sliderIndex,  2, settings.home.images.length)) pos = 'right2';
                                else if (i == utils.getListOffset(this.state.sliderIndex, -3, settings.home.images.length)) pos = 'left3';
                                else if (i == utils.getListOffset(this.state.sliderIndex,  3, settings.home.images.length)) pos = 'right3';
                                else if (i == utils.getListOffset(this.state.sliderIndex, -4, settings.home.images.length)) pos = 'left4';
                                else if (i == utils.getListOffset(this.state.sliderIndex,  4, settings.home.images.length)) pos = 'right4';
                                
                                return (
                                    <div className={`image ${pos}`} style={{ backgroundImage: `url("${image.url}")` }} />
                                );
                            })}
                        </div>
                    </div>
                    <div className="image-selectors">
                        {utils.map(settings.home.images, (image, i) => {
                            let className = "image-selector";

                            if (i == this.state.sliderIndex) className += ' selected';

                            return (
                                <div
                                    onClick={() => this.goToImage(i)}
                                    className={className}>
                                    <div className="selector" />
                                </div>
                            );
                        })}
                    </div>

                    <footer className="footer">
                        <svg className="touch" viewBox="-15 -30 530 530">
                            <path fill-rule="evenodd" d="M143,75a37,37 0 01 68-19l1-19 a38,38 0 01 75,0v158 a37,37 0 01 59,27a34.5,34.5 0 01 55,30l-1,75c0,91-28,158-110,168l-31,1c-98-4-152-81-160-133v-33c1-41 34-72 48-73zm15,2a22.2,22.2 0 01 44-4l6,164a8,8 0 00 17-1l4-194a21.1,21.1 0 01 42-1v186a8,8 0 00 15,1v-6a23,23 0 01 45,1v24a8,8 0 00 17-1v-5a20.2,20.2 0 01 37,9l-1,78c-2,77-20,142-93,151l-42,1c-75-3 -127-70-134-123v-32c3-23 14-37 30-48l2,57a8,8 0 00 17-2z" />
                            <path d="M144,128.6a66.4,66.4 0 01 45.7-122.1a68.6,68.6 0 11 97.3,91.5v-19.2a53.5,53.5 0 10-88.8-54.5a51.6,51.6 0 00-54.2,85.7z" />
                        </svg>

                        <svg className="mouse" style={{ display: "none" }} viewBox="0 0 100 100">
                            <path fill-rule="evenodd" d="M22.5,25a25,25 0 01 25-25h5a25,25 0 01 25,25v50a25,25 0 01-25,25h-5a25,25 0 01-25-25z m5,0a20,20 0 01 20-20h5a20,20 0 01 20,20v50a20,20 0 01-20,20h-5a20,20 0 01-20-20z" />
                            <path d="M47,23a3,3 0 0 1 6,0v14a3,3 0 0 1-6,0Z" />
                        </svg>

                        <svg className="arrow down" viewBox="0 0 100 100">
                            <path d="m47,65v-65h6v65h17.0725l-20.0725,35l-20.0725-35z" />
                        </svg>

                        <span className="text">Scroll to Explore</span>
                    </footer>
                </section>

                <section className="about">
                    <header className="header">What is NinjaFit Gym?</header>
                    <div className="content">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>

                    <footer className="footer">
                        <Button onClick={this.playIntro}>Play Intro</Button>
                        <Button onClick={e => this.props.onRedirect(constants.pages.aboutUs)}>Explore More</Button>
                    </footer>
                </section>

                <section className={`main-section1`}>
                    <Background>
                        <TriangleRight position="left v-full" size="large" />
                        <TriangleLeft position="right top small" size="small" />
                    </Background>

                    <div className="image" style={{ backgroundImage: `url("https://scontent-atl3-1.cdninstagram.com/t51.2885-15/e35/16229014_645122905690048_6995751145289285632_n.jpg")`}} />

                    <header className="header">Ninja Warrior Training</header>

                    <div className="content">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>
                </section>

                <section className={`main-section2`}>
                    <div className="image" style={{ backgroundImage: `url("https://scontent-atl3-1.cdninstagram.com/t51.2885-15/e35/15802716_253884945025372_5272580072513994752_n.jpg")`}} />

                    <header className="header">Obstacle Training</header>

                    <div className="content">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>
                </section>

                <section className={`main-section3`}>
                    <Background>
                        <TriangleUpRight position="left h-full" />
                        <MiddleConnector />
                        <TriangleDown position="bottom h-full" />
                    </Background>

                    <div className="image" style={{ backgroundImage: `url("https://scontent-atl3-1.cdninstagram.com/t51.2885-15/e35/16229014_645122905690048_6995751145289285632_n.jpg")`}} />

                    <header className="header">Functional Training</header>

                    <div className="content">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>
                </section>

                <section className={`short-section1`}>
                    <Background>
                        <TriangleRight position="left top small" size="small" />
                    </Background>

                    <header className="header">NinjaFit Kids</header>

                    <div className="content">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>

                    <footer className="footer">
                        <Button onClick={null}>Explore More</Button>
                    </footer>
                </section>

                <section className={`short-section2`}>
                    <Background>
                        <TriangleLeft position="right top small" size="small" />
                    </Background>

                    <header className="header">Special Events</header>

                    <div className="content">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>

                    <footer className="footer">
                        <Button onClick={null}>Explore More</Button>
                    </footer>
                </section>

                <section className="testimonials">
                    <Background>
                        <TriangleUpLeft position="right h-full" />
                        <MiddleConnector />
                        <TriangleDown position="bottom h-full" />
                    </Background>

                    <header className="header">
                        <button className="icon-btn" onClick={this.prevTestimonial}>
                            <TriangleLeft />
                        </button>
                        <span className="title">Testimonials</span>
                        <button className="icon-btn" onClick={this.nextTestimonial}>
                            <TriangleRight />
                        </button>
                    </header>

                    <div className="quotes">
                        {utils.map(settings.testimonials, (testimonial, i) => {
                            let pos;

                                 if (i == this.state.testimonialIndex)                                                        { pos = 'curr'; }
                            else if (i == utils.getListOffset(this.state.testimonialIndex, -1, settings.testimonials.length)) { pos = 'prev'; }
                            else if (i == utils.getListOffset(this.state.testimonialIndex,  1, settings.testimonials.length)) { pos = 'next'; }

                            if (!pos) { return (<div className="quote" />); }
                            
                            return (
                                <div className={`quote ${pos}`}>
                                    <div className="text">{testimonial.quote}</div>
                                    <div className="author">{testimonial.author}</div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                <section className="join">
                    <header className="header">Join the Fitness Revolution</header>
                    <footer className="footer">
                        <Button onClick={null}>See Pricing</Button>
                    </footer>
                </section>

                <a href="http://maps.google.com/maps?q=6541+North+Orange+Blossom+Trail,+Suit+100+Orlando+Florida+32810" target="nfg-map" className="map">
                    <div className="image-wrapper">
                        <div className="image" style={{ backgroundImage: `url("./images/map3.jpg")`}} />
                    </div>
                </a>

                 <section className="contact">
                    <Background>
                        <TriangleLeft position="v-half bottom right" size="medium" />
                        <TriangleRight position="left v-full" />
                    </Background>

                    <header className="header">Get In Touch</header>

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
                                <TextArea maxLength={999} placeholder="Write Your Message Here..." />
                            </Col>
                        </Row>
                    </div>

                    <footer className="footer">
                        <Button onClick={null}>Send</Button>
                    </footer>
                </section>

                <div className={`popup${this.state.showVideo ? " open" : ""}`}>
                    <div className="cover" />
                    <div className="content player">
                        <CloseButton onClick={this.closePopup} />

                        {this.state.showVideo ? (<iframe className="frame" frameborder="0" src={this.state.showVideo} />) : null}
                    </div>
                </div>
            </Page>
        );
    }
}
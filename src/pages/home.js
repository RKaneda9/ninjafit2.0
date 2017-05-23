const Inferno   = require('inferno');
const Component = require('inferno-component');
const utils               = require('helpers/utils');
const settings            = require('helpers/settings').homePage;
const {commands}          = require('services/event-system');
const constants           = require('helpers/constants');
const {Page}              = require('components/pages/base');
const {Row, Col}          = require('components/form');
const {TextBox, TextArea} = require('containers/inputs');
const {

          MenuButton, 
    ScrollDownButton, 
         CloseButton,
              Button

} = require('components/buttons');

const {

    Background,
    TriangleRight,
    TriangleLeft,
    TriangleDown,
    TriangleUpRight,
    TriangleUpLeft,
    MiddleConnector

} = require('components/backgrounds');

module.exports = class Home extends Component {
    constructor(props) {
        super(props);

        this.onResize   = this.onResize  .bind(this);
        this.resize     = this.resize    .bind(this);
        this.scrollDown = this.scrollDown.bind(this);
        this.nextImage  = this.nextImage .bind(this);
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
        window.addEventListener('resize', this.onResize);

        this.         resizeTimeoutId = setTimeout(this.resize,          100);
        this.      nextImageTimeoutId = setTimeout(this.nextImage,       constants.imageSliderTimeout);
        this.nextTestimonialTimeoutId = setTimeout(this.nextTestimonial, constants.testimonialTimeout);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onResize);
    }

    nextImage() {
        this.setState({ sliderIndex: (this.state.sliderIndex + 1) % settings.home.images.length });

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
        this.resizeTimeoutId = null;

        if (this.header) {

            let c     = this.header.parentElement;

            let x1    = c.clientWidth;
            let y1    = this.header.clientHeight;
            let x2    = c.clientWidth  / 2;
            let y2    = c.clientHeight / 2;
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
                height: (2 * c.clientWidth / sqrt3 + c.clientHeight - 2 * this.header.clientHeight)
            }

            this.setState({ 
                 sliderStyles: { width:  w, height:  h },
                wrapperStyles: styles
            });
        }
    }

    onResize() {
        if (this.resizeTimeoutId) return;

        this.resizeTimeoutId = setTimeout(this.resize, 100);
    }

    scrollDown(e) {
        console.log("TODO");
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
                                let pos;

                                     if (i == this.state.sliderIndex)                                                       { pos = 'curr'; }
                                else if (i == utils.getListOffset(this.state.sliderIndex, -1, settings.home.images.length)) { pos = 'prev'; }
                                else if (i == utils.getListOffset(this.state.sliderIndex,  1, settings.home.images.length)) { pos = 'next'; }

                                if (!pos) { return (<div className="image" />); }
                                
                                return (
                                    <div className={`image ${pos}`} style={{ backgroundImage: `url("${image.url}")` }} />
                                );
                            })}
                        </div>
                    </div>

                    <ScrollDownButton onClick={this.scrollDown} />
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
                                <TextArea maxLength={999} placeholder="Your Email" />
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
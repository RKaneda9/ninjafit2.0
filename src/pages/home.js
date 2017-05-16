const Inferno   = require('inferno');
const Component = require('inferno-component');
const utils               = require('helpers/utils');
const settings            = require('helpers/settings').homePage;
const {commands}          = require('services/event-system');
const constants           = require('helpers/constants');
const PageFooter          = require('containers/page-footer');
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
    TriangleUpLeft

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

        let sIndex = settings.home.images .length - 1;
        let tIndex = settings.testimonials.length - 1;

        this.state = {};

        this.state.prevSliderIndex =   sIndex;
        this.state.currSliderIndex = ++sIndex % settings.home.images.length;
        this.state.nextSliderIndex = ++sIndex % settings.home.images.length;

        this.state.prevTestimonialIndex =   tIndex;
        this.state.currTestimonialIndex = ++tIndex % settings.testimonials.length;
        this.state.nextTestimonialIndex = ++tIndex % settings.testimonials.length;
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
        this.setState({ 
            prevSliderIndex:  this.state.currSliderIndex,
            currSliderIndex:  this.state.nextSliderIndex,
            nextSliderIndex: (this.state.nextSliderIndex + 1) % settings.home.images.length
        });

        this.nextImageTimeoutId = setTimeout(this.nextImage, constants.imageSliderTimeout);
    }

    nextTestimonial() {
        clearTimeout(this.nextTestimonialTimeoutId);

        this.setState({
            prevTestimonialIndex:  this.state.currTestimonialIndex,
            currTestimonialIndex:  this.state.nextTestimonialIndex,
            nextTestimonialIndex: (this.state.nextTestimonialIndex + 1) % settings.testimonials.length
        });

        this.nextTestimonialTimeoutId = setTimeout(this.nextTestimonial, constants.testimonialTimeout);
    }

    prevTestimonial() {
        clearTimeout(this.nextTestimonialTimeoutId);

        let i = this.state.prevTestimonialIndex - 1; if (i < 0) i = settings.testimonials.length - 1;

        this.setState({
            prevTestimonialIndex: i,
            currTestimonialIndex: this.state.prevTestimonialIndex,
            nextTestimonialIndex: this.state.currTestimonialIndex
        });

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

        if (this.container && 
            this.header) {

            let x1    = this.container.clientWidth;
            let y1    = this.header   .clientHeight;
            let x2    = this.container.clientWidth  / 2;
            let y2    = this.container.clientHeight / 2;
            let sqrt3 = Math.sqrt(3);

            let y = - (sqrt3 / 4) * (x1 - y1 * sqrt3 - x2 - y2 / sqrt3);
            let x = sqrt3 * y - y1 * sqrt3 + x1;

            let r = Math.sqrt(Math.pow(x - x2, 2) + Math.pow(y - y2, 2));

            let h = 2 * r;
            let x3 = x2 - r / 2;
            let r2 = 2 / sqrt3 * (this.container.clientWidth - x3);
            let w  = 2 * r2;

            // let imageStyles = this.state.imageStyles;
            // imageStyles.width  = this.container.clientWidth;
            // imageStyles.height = (2 * this.container.clientWidth / sqrt3 + this.container.clientHeight - 2 * this.header.clientHeight);

            let styles = {
                width:  this.container.clientWidth,
                height: (2 * this.container.clientWidth / sqrt3 + this.container.clientHeight - 2 * this.header.clientHeight)
            }

            //let aspect = window.innerWidth / window.innerHeight;

            // let imageStyles = this.state.imageStyles;
            // imageStyles.width  = this.container.clientWidth;
            // imageStyles.height = (2 * this.container.clientWidth / sqrt3 + this.container.clientHeight - 2 * this.header.clientHeight);

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
                <section ref={e => (this.container = e)} className="home">
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

                                     if (this.state.currSliderIndex == i) { pos = 'curr'; }
                                else if (this.state.prevSliderIndex == i) { pos = 'prev'; }
                                else if (this.state.nextSliderIndex == i) { pos = 'next'; }

                                if (!pos) { return (<div className="image" />); }
                                
                                return (
                                    <div className={`image ${pos}`} style={{ backgroundImage: `url("${image.url}` }} />
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
                        <TriangleRight className="main" size="large" />
                        <TriangleLeft className="triangle" size="small" />
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
                        <TriangleUpRight className="top" />
                        <div className="middle" />
                        <TriangleDown className="bottom" />
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
                        <TriangleRight className="triangle" size="small" />
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
                        <TriangleLeft className="triangle" size="small" />
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
                        <TriangleUpLeft className="top" />
                        <div className="middle" />
                        <TriangleDown className="bottom" />
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

                                 if (this.state.currTestimonialIndex == i) { pos = 'curr'; }
                            else if (this.state.prevTestimonialIndex == i) { pos = 'prev'; }
                            else if (this.state.nextTestimonialIndex == i) { pos = 'next'; }

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

                <section className="map">
                    <div className="image-wrapper">
                        <div className="image" />
                    </div>
                </section>

                 <section className="contact">
                    <Background>
                        <TriangleRight className="main" />
                        <TriangleLeft className="triangle" size="medium" />
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

                <PageFooter
                    onRedirect={this.props.onRedirect}
                    socialLinks={this.props.socialLinks} />

                <div className={`popup player ${this.state.showVideo ? "open" : ""}`}>
                    <CloseButton onClick={this.closePopup} />

                    {this.state.showVideo ? (
                        <iframe 
                            class="frame" 
                            frameborder="0"
                            src={this.state.showVideo} />
                    ) : null}
                </div>
                <div className="popup-cover" />
            </Page>
        );
    }
}
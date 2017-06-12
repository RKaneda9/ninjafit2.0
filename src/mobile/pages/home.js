const Inferno           = require('inferno');
const Component         = require('inferno-component');
const utils             = require('helpers/utils');
const settings          = require('helpers/settings').homePage;
const {events,commands} = require('services/event-system');
const constants         = require('helpers/constants');
const ContactForm       = require('mobile/containers/contact-form');
const Page              = require('mobile/components/page');
const Player            = require('shared/containers/popups/player');
const MenuButton        = require('mobile/components/buttons').MenuButton;
const ContactMap        = require('shared/components/contact/map');
const TouchIcon         = require('shared/components/icons/touch');
const ArrowDownIcon     = require('shared/components/icons/arrow-down');
const {

    Section,
    Header,
    Content,
    Image,
    Footer

} = require('shared/components/section');

const Button = require('shared/components/buttons').Button;

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

        this.resize      = this.resize     .bind(this);
        this.nextImage   = this.nextImage  .bind(this);
        this.goToImage   = this.goToImage  .bind(this);
        this.playIntro   = this.playIntro  .bind(this);
        this.closePlayer = this.closePlayer.bind(this);

        this.nextTestimonial = this.nextTestimonial.bind(this);
        this.prevTestimonial = this.prevTestimonial.bind(this);

        this.state = {
                 sliderIndex: 0,
            testimonialIndex: 0
        };
    }

    componentDidMount() {
        events.onWindowResize.subscribe(this.resize);

        this.         resizeTimeoutId = setTimeout(this.resize,          100);
        this.      nextImageTimeoutId = setTimeout(this.nextImage,       constants.imageSliderTimeout);
        this.nextTestimonialTimeoutId = setTimeout(this.nextTestimonial, constants.testimonialTimeout);
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

    playIntro  () { this.setState({ showVideo: true  }); }
    closePlayer() { this.setState({ showVideo: false }); }

    resize() {
        if (this.header) {

            let c     = this.header.parentElement;
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
        return (
            <Page name="home">
               <Section name="landing">
                    <header ref={e => (this.header = e)} className="header">
                        <p className="main">NinjaFit</p>
                        <p className="sub">Gym</p>

                        <MenuButton />
                    </header>

                    <div style={this.state.sliderStyles} className="image-slider">

                        <div 
                            style={this.state.wrapperStyles} 
                            className="image-wrapper">

                            {utils.map(settings.home.images, (image, i) => {
                                let pos    = 'hidden',
                                    offset = utils.getListOffset(i, this.state.sliderIndex, settings.home.images.length);

                                     if (offset == 0) pos = 'curr';
                                else if (offset <  0) pos = 'left'  + (-offset);
                                else if (offset >  0) pos = 'right' +   offset;

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

                    <Footer>
                        <TouchIcon />
                        <ArrowDownIcon />
                        <span className="text">Scroll to Explore</span>
                    </Footer>
                </Section>

                <Section name="about">
                    <Header  text={settings.about.header} />
                    <Content text={settings.about.content} />

                    <Player 
                        show={this.state.showVideo}
                        url={settings.about.video}
                        onClose={this.closePlayer} />

                    <Footer>
                        <Button onClick={this.playIntro}>Play Intro</Button>
                        <Button onClick={e => commands.redirect.emit(constants.pages.aboutUs)}>Explore More</Button>
                    </Footer>
                </Section>

                <Section name="main-section1">
                    <Background>
                        <TriangleRight position="left v-full" size="large" />
                        <TriangleLeft position="right top small" size="small" />
                    </Background>

                    <Image    url={settings.main1.image} />
                    <Header  text={settings.main1.header} />
                    <Content text={settings.main1.content} />
                </Section>

                <Section name="main-section2">
                    <Image    url={settings.main2.image} />
                    <Header  text={settings.main2.header} />
                    <Content text={settings.main2.content} />
                </Section>

                <Section name="main-section3">
                    <Background>
                        <TriangleUpRight position="left h-full" />
                        <MiddleConnector />
                        <TriangleDown position="bottom h-full" />
                    </Background>

                    <Image    url={settings.main3.image} />
                    <Header  text={settings.main3.header} />
                    <Content text={settings.main3.content} />
                </Section>

                <Section name="short-section1">
                    <Background>
                        <TriangleRight position="left top small" size="small" />
                    </Background>

                    <Header  text={settings.short1.header} />
                    <Content text={settings.short1.content} />

                    <Footer>
                        <Button onClick={e => commands.redirect.emit(constants.pages.aboutUs, constants.sections.kids)}>Explore More</Button>
                    </Footer>
                </Section>

                <Section name="short-section2">
                    <Background>
                        <TriangleLeft position="right top small" size="small" />
                    </Background>

                    <Header  text={settings.short2.header} />
                    <Content text={settings.short2.content} />

                    <Footer>
                        <Button onClick={e => commands.redirect.emit(constants.pages.aboutUs, constants.sections.specialEvnts)}>Explore More</Button>
                    </Footer>
                </Section>

                <Section name="testimonials">
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
                            let offset    = utils.getListOffset(i, this.state.testimonialIndex, settings.testimonials.length),
                                className = "quote ";
                                
                                 if (offset ==  0) className += 'curr';
                            else if (offset <   0) className += 'left';
                            else if (offset >   0) className += 'right';
                            
                            return (
                                <div className={className}>
                                    <div className="text">{testimonial.quote}</div>
                                    <div className="author">{testimonial.author}</div>
                                </div>
                            );
                        })}
                    </div>
                </Section>

                <Section name="join">
                    <Header text={settings.join.header} />
                    <Footer>
                        <Button onClick={e => commands.redirect.emit(constants.pages.joinUs)}>See Pricing</Button>
                    </Footer>
                </Section>

                <ContactMap 
                    className="map"
                    version="3" />

                <ContactForm title="Get In Touch">
                    <Background>
                        <TriangleLeft  position="v-half bottom right" size="x" />
                        <TriangleRight position="left v-full" />
                    </Background>
                </ContactForm>
            </Page>
        );
    }
}
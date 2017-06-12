const Inferno           = require('inferno');
const Component         = require('inferno-component');
const constants         = require('helpers/constants');
const utils             = require('helpers/utils');
const HeaderBar         = require('desktop/components/sections/header-bar');
const PageFooter        = require('desktop/containers/page-footer');
const ContactForm       = require('shared/containers/contact-form');
const MouseIcon         = require('shared/components/icons/mouse');
const ArrowDownIcon     = require('shared/components/icons/arrow-down');
const ContactMap        = require('shared/components/contact/map');
const Page              = require('desktop/components/page');
const {events,commands} = require('services/event-system');
const settings          = require('helpers/settings').homePage;
const Player            = require('shared/containers/popups/player');
const {

    Section,
    Header,
    Content,
    Image,
    Footer

} = require('shared/components/section');

const {

    TriangleLeft,
    TriangleRight

} = require('shared/components/icons/triangles');

const {

    Hex,
    HexHalfLeft,
    HexHalfRight

} = require('desktop/components/backgrounds');

const Button = require('shared/components/buttons').Button;

module.exports = class HomePage extends Component {
    constructor(props) {
        super(props);

        this.resize      = this.resize     .bind(this);
        this.playIntro   = this.playIntro  .bind(this);
        this.nextImage   = this.nextImage  .bind(this);
        this.closePlayer = this.closePlayer.bind(this);

        this.nextTestimonial = this.nextTestimonial.bind(this);
        this.prevTestimonial = this.prevTestimonial.bind(this);

        this.els = {};
        this.prevSliderIndex = 0;

        this.state = { 
                 sliderIndex: 0,
            testimonialIndex: 0
        };
    }

    componentDidMount() {
        events.onWindowResize.subscribe(this.resize);

        // TODO: wait for images to load

        this.         resizeTimeoutId = setTimeout(this.resize,          100);
        this.      nextImageTimeoutId = setTimeout(this.nextImage,       constants.imageSliderTimeout);
        this.nextTestimonialTimeoutId = setTimeout(this.nextTestimonial, constants.testimonialTimeout);
    }

    componentWillUnmount() {
        events.onWindowResize.unsubscribe(this.resize);
    }

    resize() {
        let state = {},
            th    = 84,
            tw    = utils.toFixed(th / 2 * Math.sqrt(3)),
            w, h, d, _h, _w, svg;

        if (this.els.imageSlider) {

             w = this.els.imageSlider.clientWidth;
             h = this.els.imageSlider.clientHeight;
            _w = 4; // stroke width
            _h = _w;

            state.imageSliderPath = [

                `M-${_w}-${_h}`,             // top left (-4,-4)
                `h${w + 2 * _w}`,            // top right (imageSlider.width + 2 * 4,-4)
                `v${h - th / 1.5}`,          // bottom right (imageSlider.width + 2 * 4, imageSlider.height - 48)
                `l-${tw}-${th / 2}`,         // bottom right inner 
                `h-${w - tw - tw + 2 * _w}`, // bottom left inner
                `l-${tw},${th / 2}`,         // bottom left
                `z`

            ].join('');

            state.imageWidth = w;
        }

        this.setState(state);
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

    nextImage() {
        this.prevSliderIndex = this.state.sliderIndex;

        this.setState({ sliderIndex: (this.state.sliderIndex + 1) % settings.home.images.length });

        this.nextImageTimeoutId = setTimeout(this.nextImage, constants.imageSliderTimeout);
    }

    goToImage(i) {
        if (i === this.state.sliderIndex) return;

        clearTimeout(this.nextImageTimeoutId);

        this.prevSliderIndex = this.state.sliderIndex;

        this.setState({ sliderIndex: i });

        this.nextImageTimeoutId = setTimeout(this.nextImage, constants.imageSliderTimeout);
    }

    render() {

        return (
            <Page {...this.props} name={constants.pages.home}>
                <Section name="landing">
                    <HeaderBar logo={true} />

                    <div 
                        ref={el => (this.els.imageSlider = el)}
                        className="image-slider">
                        <svg className="image-wrapper">
                            <defs>
                                <clipPath id="sliderclip">
                                    <path d={this.state.imageSliderPath} />
                                </clipPath>
                            </defs>

                            <g clip-path="url(#sliderclip)">

                                {utils.map(settings.home.images, (image, i) => {
                                    let offset     = utils.getListOffset(i, this.state.sliderIndex, settings.home.images.length);
                                    let prevOffset = utils.getListOffset(i, this.prevSliderIndex,   settings.home.images.length);
                                    let dx         = this.state.imageWidth ? (offset * this.state.imageWidth + 'px') : (offset * 100 + '%');
                                    let transform  = `translateX(${dx})`;
                                    let opacity    = Math.abs(offset) < 2 ? 1 : 0;
                                    let className  = Math.abs(offset) != Math.abs(prevOffset) ? 'anim' : '';

                                    return (
                                        <image 
                                            x="0"
                                            className={className}
                                            width="100%"
                                            height="100%"
                                            preserveAspectRatio="xMinYMin slice"
                                            style={{ opacity: opacity, transform: transform }}
                                            xlink:href={image.url} />
                                    );
                                })};

                            </g>

                            <path d={this.state.imageSliderPath} stroke-width="8" fill="none" />
                        </svg>
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
                    </div>

                    <footer className="scroll-footer">
                        <div className="item">
                            <div className="scroll">
                                <MouseIcon />
                                <ArrowDownIcon />
                            </div>
                            <span className="text">Scroll to Explore</span>
                        </div>
                    </footer>
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

                <Section name="main">
                    <HexHalfLeft />
                    
                    <Image    url={settings.main1.image} />
                    <Header  text={settings.main1.header} />
                    <Content text={settings.main1.content} />
                </Section>

                <Section name="main">
                    <Image    url={settings.main2.image} />
                    <Header  text={settings.main2.header} />
                    <Content text={settings.main2.content} />
                </Section>

                <Section name="main">
                    <HexHalfRight />

                    <Image    url={settings.main3.image} />
                    <Header  text={settings.main3.header} />
                    <Content text={settings.main3.content} />
                </Section>

                <Section name="short1">
                    <Header  text={settings.short1.header} />
                    <Content text={settings.short1.content} />

                    <Footer>
                        <Button onClick={e => commands.redirect.emit(constants.pages.aboutUs, constants.sections.kids)}>Explore More</Button>
                    </Footer>
                </Section>

                <Section name="short2">
                    <Header  text={settings.short2.header} />
                    <Content text={settings.short2.content} />

                    <Footer>
                        <Button onClick={e => commands.redirect.emit(constants.pages.aboutUs, constants.sections.specialEvnts)}>Explore More</Button>
                    </Footer>
                </Section>

                <Section name="testimonials">
                    <Hex />

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
                    version="3">
                    <HexHalfLeft />
                </ContactMap>

                <ContactForm title="Get In Touch">
                    <HexHalfRight />
                </ContactForm>

                <PageFooter />
            </Page>
        );
    }
}
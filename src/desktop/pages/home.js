const Inferno     = require('inferno');
const Component   = require('inferno-component');
const constants   = require('helpers/constants');
const utils       = require('helpers/utils');
const PageFooter  = require('desktop/containers/page-footer');
const ContactForm = require('desktop/containers/contact-form');
const Page        = require('desktop/components/page');
const {commands}  = require('services/event-system');
const settings    = require('helpers/settings').homePage;

module.exports = class HomePage extends Component {
    constructor(props) {
        super(props);

        this.   resize = this.   resize.bind(this);
        this. onResize = this. onResize.bind(this);
        this.nextImage = this.nextImage.bind(this);

        this.els = {};
        this.prevSliderIndex = 0;

        this.state = { 
                 sliderIndex: 0,
            testimonialIndex: 0
        };
    }

    componentDidMount() {
        window.addEventListener("resize", this.onResize);

        this.nextImageTimeoutId = setTimeout(this.nextImage, constants.imageSliderTimeout);
        

        // TODO: wait for images to load
        this.onResize();
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.onResize);
    }

    onResize() {
        if (this.resizeTimeoutId) clearTimeout(this.resizeTimeoutId);

        this.resizeTimeoutId = setTimeout(this.resize, 10);
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

                `M-${_w}-${_h}`, // top left (-4,-4)
                `h${w + 2 * _w}`, // top right (imageSlider.width + 2 * 4,-4)
                `v${h - th / 1.5}`, // bottom right (imageSlider.width + 2 * 4, imageSlider.height - 48)
                `l-${tw}-${th / 2}`, // bottom right inner 
                `h-${w - tw - tw + 2 * _w}`, // bottom left inner
                `l-${tw},${th / 2}`, // bottom left
                `z`

            ].join('');
        }

        if (this.els.training) {

            // width of the training section's background (on the right & left). 
            // there are 3 sections vertically arranged here, that's why the item width is multiplied by 3.
            // the left over amount is divided by 1.5 instead of 2 to give a little extra leeway
            //  w = utils.toFixed((window.innerWidth - 3 * this.els.training.clientWidth) / 1.5);
            //  h = this.els.training.clientHeight;
            // _h = utils.toFixed(w / Math.sqrt(3));

            //.trainingBgViewBox = `0 0 ${w} ${h}`;

             w = this.els.training.clientWidth;
             h = this.els.training.clientHeight;
            _h = utils.toFixed(w / Math.sqrt(3));

            state.trainingBgLeftPath = [

                `M${w},${_h}`,
                `v${h - 2 * _h}`,
                `l-${w},${_h}`,
                `v-${h}`,
                `z`

            ].join('');

            state.trainingBgRightPath = [

                `M0,${_h}`,
                `v${h - 2 * _h}`,
                `l${w},${_h}`,
                `v-${h}`,
                `z`

            ].join('');
        }

        if (this.els.contact) {
            //  w = utils.toFixed((window.innerWidth - 2 * this.els.contact.clientWidth) / 1.5);
            //  h = this.els.contact.clientHeight;
            // _h = utils.toFixed(w / Math.sqrt(3));

            // state.contactBgViewBox = `0 0 ${w} ${h}`;

             w = this.els.contact.clientWidth;
             h = this.els.contact.clientHeight;
            _h = utils.toFixed(w / Math.sqrt(3));

            state.contactBgLeftPath = [

                `M${w},${_h}`,
                `v${h - 2 * _h}`,
                `l-${w},${_h}`,
                `v-${h}`,
                `z`

            ].join('');

            state.contactBgRightPath = [

                `M0,${_h}`,
                `v${h - 2 * _h}`,
                `l${w},${_h}`,
                `v-${h}`,
                `z`

            ].join('');
        }

        this.setState(state);

        // events.onWindowResize.emit();
    }

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

        /*
        <svg className="logo-image" viewBox="0 0 500 500">
            <path fill="#000" d="M 28,118 C145,186 319,185 477,134 C460,222 424,282 382,344 C290,280 213,270 76,345 C 35,261 27,190 28,118 Z" />
            <path fill="#c99a40" d="M36,131 C147,196 326,195 464,147 C448,222 410,282 379,327 C290,271 213,261 81,331 C45,261 37,190 36,131 Z" />
            <path fill="#000" d="M 284,237 C306,242 325,238 354,213 C386,185 422,174 429,196 C420,194 400,199 388,204 C388,270 314,276 296,247 Q288,244 281,239 C279,237 279,236 284,237 Z" />
            <path fill="#fff" d="M 315,243 C330,262 359,256 353,224 L 374.5,212 C368,268 320,270 300,247 Z" />
            <path fill="#000" d="M 289.5,252 C295,270 315,277 323,271 C305,270 299,262 289.5,252 Z" />
            <path fill="#000" d="M382,248 C396,238 405,217 398,207 C397,221 392,234 382,248 Z" />
            <path fill="#000" d="M 213,239 C202,246 186,243 163,227 C110,192 78,178 65,185 C56,192 57,195 59,195 Q70,190 101,201.5 C137,280 173,271 199,247 Q209,246 213,239 Z" />
            <path fill="#fff" d="M 183,246 C160,261 132,244 141,220 Q127,210 113,205 C138,272 170,268 194,248 Z" />
            <path fill="#000" d="M131,254 Q117,232 103,231 Q117,239.5 131,254 Z" />
            <path fill="#000" d="M 188,268 Q200,262 205,251 L 208,250 Q202,267 185,272 Z" />
        </svg>
        */

        /* full thing
        <svg className="logo-image" viewBox="-25 -154 550 750">
            <path fill="#000" d="M276,-149 C543,-147 645,254 306,583 Q215,599 181,588 C-183,248 0,-143 276,-149 Z" />
            <path fill="#212121" d="M276,-138 C516,-135 638,238 300,569 Q225,584 185,574 C-155,247 5,-130 276,-138 Z" />
            <path fill="#121212" d="M 438,43 Q376,58 46,60 Q73,81 127,78 Q420,79 438,43 Z" />
            <path fill="#121212" d="M33,200 C22,170 9,173 14,222 Q40,408 212,577.8 Q222,578.2 230,577.9 Q190,539 162,494 Q210,538 247,554 C202,507 173,482 162,459 C186,447 322,431 350,415 C295,405 215,427 156,449 Q146,439 140,428 C170,416 242,406 288,391 C235,381 168,401 131,415 Q115,394 98,366 Q210,317 306,349 C362,361 352,346 316,326 Q240,297 153,311 Z" />
            <path fill="#343434" d="M250,-136.1 C355,-87 410,-57 462,72 C420,90 318,102 195,108 C345,132 442,102 463,84 L470,115 C385,159 194,164 69,138 L180,301 C238,300 297,310 351,338 Q372,348 379,342 L474,135 Q448,360 291,571 L300,569 C638,238 516,-135 276,-138 Q 265,-138 250,-136.1 Z" />
            <path fill="#343434" d="M10.4,68 C-26,180 -10,320 88.3,462 C27,348 -20,190 10.4,68 Z" />
            <path fill="#454545" d="M387,-106 Q445,-34 503,83 Q480,-48 387,-106 Z" />
            <path fill="#454545" d="M329,92 C320,95 320,104 331,105 Q398,103 422,83.8 Q381,75 329,92 Z" />
            <path fill="#454545" d="M261,295 Q246,300 254,304.5 Q291,310 330,326 Q350,329 342,319 Q300,290 261,295 Z" />
            <path fill="#000" d="M28,118 C145,186 319,185 477,134 C460,222 424,282 382,344 C290,280 213,270 76,345 C 35,261 27,190 28,118 Z" />
            <path fill="#c99a40" d="M36,131 C147,196 326,195 464,147 C448,222 410,282 379,327 C290,271 213,261 81,331 C45,261 35,190 36,131 Z" />
            <path fill="#a07c2e" d="M463.15,151 C324,233 171,232 72,187 Q86,241 113,294 C164,266 250,245 328,300 C249,266 175,282 81,331 C45,261 35,190 36,131 C147,196 326,195 464,147 Z" />
            <path fill="#000" d="M 284,237 C306,242 325,238 354,213 C386,185 422,174 429,196 C420,194 400,199 388,204 C388,270 314,276 296,247 Q288,244 281,239 C279,237 279,236 284,237 Z" />
            <path fill="#fff" d="M 315,243 C330,262 359,256 353,224 L 374.5,212 C368,268 320,270 300,247 Z" />
            <path fill="#000" d="M 289.5,252 C295,270 315,277 323,271 C305,270 299,262 289.5,252 Z" />
            <path fill="#000" d="M382,248 C396,238 405,217 398,207 C397,221 392,234 382,248 Z" />
            <path fill="#000" d="M 213,239 C202,246 186,243 163,227 C110,192 78,178 65,185 C56,192 57,195 59,195 Q70,190 101,201.5 C137,280 173,271 199,247 Q209,246 213,239 Z" />
            <path fill="#fff" d="M 183,246 C160,261 132,244 141,220 Q127,210 113,205 C138,272 170,268 194,248 Z" />
            <path fill="#000" d="M131,254 Q117,232 103,231 Q117,239.5 131,254 Z" />
            <path fill="#000" d="M 188,268 Q200,262 205,251 L 208,250 Q202,267 185,272 Z" />
        </svg>
        */

        return (
            <Page {...this.props} name={constants.pages.home}>
                <section className="landing">
                    <header className="header-bar">
                        <div className="logo">
                            <svg className="logo-image" viewBox="0 0 500 500">
                                <path fill="#000" d="M 28,118 C145,186 319,185 477,134 C460,222 424,282 382,344 C290,280 213,270 76,345 C 35,261 27,190 28,118 Z" />
                                <path fill="#c99a40" d="M36,131 C147,196 326,195 464,147 C448,222 410,282 379,327 C290,271 213,261 81,331 C45,261 37,190 36,131 Z" />
                                <path fill="#000" d="M 284,237 C306,242 325,238 354,213 C386,185 422,174 429,196 C420,194 400,199 388,204 C388,270 314,276 296,247 Q288,244 281,239 C279,237 279,236 284,237 Z" />
                                <path fill="#fff" d="M 315,243 C330,262 359,256 353,224 L 374.5,212 C368,268 320,270 300,247 Z" />
                                <path fill="#000" d="M 289.5,252 C295,270 315,277 323,271 C305,270 299,262 289.5,252 Z" />
                                <path fill="#000" d="M382,248 C396,238 405,217 398,207 C397,221 392,234 382,248 Z" />
                                <path fill="#000" d="M 213,239 C202,246 186,243 163,227 C110,192 78,178 65,185 C56,192 57,195 59,195 Q70,190 101,201.5 C137,280 173,271 199,247 Q209,246 213,239 Z" />
                                <path fill="#fff" d="M 183,246 C160,261 132,244 141,220 Q127,210 113,205 C138,272 170,268 194,248 Z" />
                                <path fill="#000" d="M131,254 Q117,232 103,231 Q117,239.5 131,254 Z" />
                                <path fill="#000" d="M 188,268 Q200,262 205,251 L 208,250 Q202,267 185,272 Z" />
                            </svg>

                            <div className="logo-text">
                                <div className="word">Ninja</div>
                                <div className="word">Fit</div>
                                <div className="word">Gym</div>
                            </div>
                        </div>

                        <p className="title"></p>

                        <button
                            onClick={commands.openMenu.emit} 
                            className="menu-btn">
                            <svg className="background" viewBox="0 0 500 577.35">
                                <path filter="url(#ds-s)" d="M500,0v577.35l-500-288.675z" />
                            </svg>
                            <svg className="bars" viewBox="0 0 96 60" stroke-width="12">
                                <path d="M38,6h52" />
                                <path d="M6,30h84" />
                                <path d="M38,54h52" />
                            </svg>
                        </button>
                    </header>

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
                                    let transform  = `translateX(${offset * 100 + '%'}`;
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
                                <svg className="mouse" viewBox="-0 0 100 100">
                                    <path fill-rule="evenodd" d="M22.5,25a25,25 0 01 25-25h5a25,25 0 01 25,25v50a25,25 0 01-25,25h-5a25,25 0 01-25-25z m5,0a20,20 0 01 20-20h5a20,20 0 01 20,20v50a20,20 0 01-20,20h-5a20,20 0 01-20-20z" />
                                    <path d="M47,23a3,3 0 0 1 6,0v14a3,3 0 0 1-6,0Z" />
                                </svg>
                                <svg className="arrow down" viewBox="0 0 100 100">
                                    <path d="m47,65v-65h6v65h17.0725l-20.0725,35l-20.0725-35z" />
                                </svg>
                            </div>
                            <span className="text">Scroll to Explore</span>
                        </div>
                    </footer>
                </section>

                <section className="about">
                    <header className="header">What is NinjaFit Gym?</header>

                    <div className="content">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                    </div>

                    <footer className="footer">
                        <button className="btn">
                            <span className="text">Play Intro</span>
                        </button>

                        <button className="btn">
                            <span className="text">Explore More</span>
                        </button>
                    </footer>
                </section>

                <section className="ninja-training">
                    <svg 
                        ref={el => (this.els.training = el)}
                        className="background" 
                        viewBox={this.state.trainingBgViewBox}>

                        <path filter="url(#ds-l)" d={this.state.trainingBgLeftPath} />
                    </svg>
                    <div className="image" style={{ backgroundImage: 'url("https://scontent-atl3-1.xx.fbcdn.net/v/t31.0-8/16903117_1844616032419052_2489319948486629962_o.jpg?oh=6eebec213f686c5aae1b76e1f3433cd7&oe=59944936")' }} />
                    <header className="header">Ninja Warrior Training</header>

                    <div className="content">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                    </div>
                </section>

                <section className="obstacle-training">
                    <div className="image" style={{ backgroundImage: 'url("https://scontent-atl3-1.xx.fbcdn.net/v/t31.0-8/16903117_1844616032419052_2489319948486629962_o.jpg?oh=6eebec213f686c5aae1b76e1f3433cd7&oe=59944936")' }} />
                    <header className="header">Obstacle Training</header>

                    <div className="content">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                    </div>
                </section>

                <section className="functional-training">
                    <svg className="background" viewBox={this.state.trainingBgViewBox}>
                        <path filter="url(#ds-l)" d={this.state.trainingBgRightPath} />
                    </svg>
                    <div className="image" style={{ backgroundImage: 'url("https://scontent-atl3-1.xx.fbcdn.net/v/t31.0-8/16903117_1844616032419052_2489319948486629962_o.jpg?oh=6eebec213f686c5aae1b76e1f3433cd7&oe=59944936")' }} />
                    <header className="header">Functional Training</header>

                    <div className="content">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                    </div>
                </section>

                <section className="kids">
                    <header className="header">NinjaFit Kids</header>

                    <div className="content">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>

                    <footer className="footer">
                        <button className="btn">
                            <span>Explore More</span>
                        </button>
                    </footer>
                </section>

                <section className="events">
                    <header className="header">Special Events</header>

                    <div className="content">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>

                    <footer className="footer">
                        <button className="btn">
                            <span>Explore More</span>
                        </button>
                    </footer>
                </section>

                <section className="testimonials">
                    <svg className="background" viewBox="0 0 1000 1077.35">
                        <path 
                            filter="url(#ds-l)" 
                            d="M500,0l500,288.675v500l-500,288.675l-500-288.675v-500z" />
                    </svg>

                    <header className="header">Testimonials</header>

                    <div className="content">
                        <div className="quote">
                            <div className="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </div>
                            <div className="author">Marguerite Torrenga</div>
                        </div>
                    </div>
                </section>

                <section className="join">
                    <header className="header">Join the Fitness Revolution</header>

                    <footer className="footer">
                        <button className="btn">
                            <span>See Pricing</span>
                        </button>
                    </footer>
                </section>

                <section className="map">
                    <svg className="background" viewBox={this.state.contactBgViewBox}>
                        <path filter="url(#ds-l)" d={this.state.contactBgLeftPath} />
                    </svg>
                    <div className="image" style={{ backgroundImage: 'url("./images/map.jpg")' }} />
                </section>

                <ContactForm title="Get In Touch">
                    <svg 
                        ref={el => (this.els.contact = el)}
                        className="background" 
                        viewBox={this.state.contactBgViewBox}>

                        <path filter="url(#ds-l)" d={this.state.contactBgRightPath} />
                    </svg>
                </ContactForm>

                <PageFooter />
            </Page>
        );
    }
}
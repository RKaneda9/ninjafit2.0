const Inferno     = require('inferno');
const Component   = require('inferno-component');
const constants   = require('helpers/constants');
const utils       = require('helpers/utils');
const PageFooter  = require('desktop/containers/page-footer');
const Page        = require('desktop/components/page');
const {commands}  = require('services/event-system');

module.exports = class HomePage extends Component {
    constructor(props) {
        super(props);

        this.  resize = this.  resize.bind(this);
        this.onResize = this.onResize.bind(this);

        this.els = {};

        this.state = { 

        };
    }

    componentDidMount() {
        window.addEventListener("resize", this.onResize);

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
                `v${h + th / 2}`, // bottom right (imageSlider.width + 2 * 4, imageSlider.height - 48)
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

    render() {

        return (
            <Page {...this.props} name={constants.pages.home}>
                <section className="landing">
                    <header className="header-bar">
                        <p className="title">NinjaFit Gym</p>

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
                                <pattern 
                                    id="img-slider" 
                                    width="100%" 
                                    height="100%" 
                                    patternContentUnits="objectBoundingBox"
                                    viewBox="0 0 1 1"
                                    preserveAspectRatio="xMidYMid slice">
                                    <image 
                                        width="1"
                                        height="1"
                                        preserveAspectRatio="xMinYMin slice"
                                        xlink:href="https://scontent-atl3-1.xx.fbcdn.net/v/t31.0-8/16903117_1844616032419052_2489319948486629962_o.jpg?oh=6eebec213f686c5aae1b76e1f3433cd7&oe=59944936" />
                                </pattern>
                            </defs>
                            <path 
                                fill="url(#img-slider)" 
                                filter="url(#ds-l)"
                                stroke-width="8"
                                d={this.state.imageSliderPath} />
                        </svg>
                        <div className="image-selectors">
                            <div className="image-selector selected">
                                <div className="selector" />
                            </div>
                            <div className="image-selector">
                                <div className="selector" />
                            </div>
                            <div className="image-selector">
                                <div className="selector" />
                            </div>
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

                <section className="contact">
                    <svg 
                        ref={el => (this.els.contact = el)}
                        className="background" 
                        viewBox={this.state.contactBgViewBox}>

                        <path filter="url(#ds-l)" d={this.state.contactBgRightPath} />
                    </svg>
                    <header className="header">Get In Touch</header>

                    <div className="content">
                        <div className="row">
                            <div className="col">
                                <input type="text" maxlength="99" placeholder="First Name" />
                            </div>
                            <div className="col">
                                <input type="text" maxlength="99" placeholder="Last Name" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <input type="text" maxlength="199" placeholder="Your Email" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <textarea maxlength={999} placeholder="What can we help you with?" />
                            </div>
                        </div>
                    </div>

                    <footer className="footer">
                        <button className="btn">
                            <span>Send</span>
                        </button>
                    </footer>
                </section>

                <PageFooter />
            </Page>
        );
    }
}
                    require('styles/desktop.scss');
const Inferno     = require('inferno');
const Component   = require('inferno-component');
const constants   = require('desktop/helpers/constants');

let rootElement, onReady, onError;

class Application extends Component {
    constructor(props) {
        super(props);

        this.  openMenu = this.  openMenu.bind(this);
        this. closeMenu = this. closeMenu.bind(this);
        this. focusPage = this. focusPage.bind(this);
        this.selectPage = this.selectPage.bind(this);

        this.state = {
            menuOpen:    false,
            pageStyles: {},
            currPage:   constants.pages.home // parse route
        };
    }

    getPageStyles(pageKey) {
        let pageIndex = constants.pageOrder.indexOf(pageKey || this.state.currPage),
            diff      = 0.05,
            offset    = 0.0325 * window.innerHeight,
            numShow   = 4,
            styles    = {},
            i, scale, y, opacity, page;

        for (i = 0; i < constants.pageOrder.length; i++) {

            page    = constants.pageOrder[i];
            scale   = (pageIndex - i) * diff + 1;
            y       = (pageIndex + numShow - i) * offset;
            opacity = i < pageIndex || (i - numShow >= pageIndex) ? 0 : 1;

            styles[constants.pageOrder[i]] = {
                opacity:   opacity,
                transform: `translateY(${y}px) scale(${scale})`
            };
        }

        console.log(pageIndex, styles);

        return styles;
    }

    selectPage(page) {
        this.setState({
            currPage: page,
            menuOpen: false
        });
    }

    focusPage(page) {
        this.setState({
            currPage:   page,
            pageStyles: this.getPageStyles(page)
        })
    }

    openMenu() {
        if (!this.state.menuOpen) {
            this.setState({ 
                menuOpen:    true,
                pageStyles: this.getPageStyles()
            });
        }
    }

    closeMenu() {
        if (this.state.menuOpen) {
            this.setState({ menuOpen: false });
        }
    }

    render() {
        return (
            <div className="app desktop">
                <svg className="defs" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <filter id="ds-s" height="150%">
                            <feGaussianBlur in="SourceAlpha" stdDeviation="25" />
                            <feMerge>
                                <feMergeNode />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>

                        <filter id="ds-m" height="150%">
                            <feGaussianBlur in="SourceAlpha" stdDeviation="15" />
                            <feMerge>
                                <feMergeNode />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>

                        <filter id="ds-l" height="150%">
                            <feGaussianBlur in="SourceAlpha" stdDeviation="5" />
                            <feMerge>
                                <feMergeNode />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>
                </svg>
                <div className={`app-menu${this.state.menuOpen ? ' open' : ''}`}>
                    <div className="option"></div>
                    <div className="menu">
                        <div className="links">
                            <div
                                onClick={e => this.selectPage(constants.pages.home)}
                                onMouseOver={e => this.focusPage(constants.pages.home)} 
                                className="link">Home</div>

                            <div 
                                onClick={e => this.selectPage(constants.pages.wod)}
                                onMouseOver={e => this.focusPage(constants.pages.wod)} 
                                className="link">WOD</div>

                            <div 
                                onClick={e => this.selectPage(constants.pages.login)}
                                onMouseOver={e => this.focusPage(constants.pages.login)} 
                                className="link">Login</div>

                            <div 
                                onClick={e => this.selectPage(constants.pages.aboutUs)}
                                onMouseOver={e => this.focusPage(constants.pages.aboutUs)} 
                                className="link">About Us</div>

                            <div 
                                onClick={e => this.selectPage(constants.pages.schedule)}
                                onMouseOver={e => this.focusPage(constants.pages.schedule)} 
                                className="link">Schedule</div>

                            <div 
                                onClick={e => this.selectPage(constants.pages.joinUs)}
                                onMouseOver={e => this.focusPage(constants.pages.joinUs)} 
                                className="link">Join Us</div>

                            <div 
                                onClick={e => this.selectPage(constants.pages.whatWeOffer)}
                                onMouseOver={e => this.focusPage(constants.pages.whatWeOffer)} 
                                className="link">What We Offer</div>

                            <div className="link empty"></div>

                            <div 
                                onClick={e => this.selectPage(constants.pages.contact)}
                                onMouseOver={e => this.focusPage(constants.pages.contact)} 
                                className="link">Contact</div>
                        </div>
                        <div className="social">
                            <div className="link fa fa-instagram"></div>
                            <div className="link fa fa-facebook"></div>
                            <div className="link fa fa-youtube-play"></div>
                            <div className="link fa fa-twitter"></div>
                        </div>
                    </div>
                    <div className="option">
                        <div
                            onClick={this.closeMenu} 
                            className="close-btn">
                            <div className="bar"></div>
                            <div className="bar"></div>
                        </div>
                    </div>
                </div>
                <div className="pages">
                    <div
                        style={this.state.menuOpen ? this.state.pageStyles[constants.pages.home] : null} 
                        className={`page home-page${!this.state.menuOpen && this.state.currPage == constants.pages.home ? ' curr' : ''}`}>
                        <section className="landing">
                            <header className="header-bar">
                                <p className="title">NinjaFit Gym</p>

                                <button
                                    onClick={this.openMenu} 
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
                        </section>
                    </div>
                    <div 
                        style={this.state.menuOpen ? this.state.pageStyles[constants.pages.aboutUs] : null} 
                        className={`page about-us-page${!this.state.menuOpen && this.state.currPage == constants.pages.aboutUs ? ' curr' : ''}`}>
                        <div 
                            onClick={this.openMenu} 
                            className="menu-btn">
                            <div className="bar"></div>
                            <div className="bar"></div>
                            <div className="bar"></div>
                        </div>
                        <header className="header">About Us</header>
                    </div>
                    <div
                        style={this.state.menuOpen ? this.state.pageStyles[constants.pages.whatWeOffer] : null} 
                        className={`page what-we-offer-page${!this.state.menuOpen && this.state.currPage == constants.pages.whatWeOffer ? ' curr' : ''}`}>
                        <div 
                            onClick={this.openMenu} 
                            className="menu-btn">
                            <div className="bar"></div>
                            <div className="bar"></div>
                            <div className="bar"></div>
                        </div>
                        <header className="header">What We Offer</header>
                    </div>
                    <div
                        style={this.state.menuOpen ? this.state.pageStyles[constants.pages.wod] : null} 
                        className={`page wod-page${!this.state.menuOpen && this.state.currPage == constants.pages.wod ? ' curr' : ''}`}>
                        <div 
                            onClick={this.openMenu} 
                            className="menu-btn">
                            <div className="bar"></div>
                            <div className="bar"></div>
                            <div className="bar"></div>
                        </div>
                        <header className="header">WOD</header>
                    </div>
                    <div
                        style={this.state.menuOpen ? this.state.pageStyles[constants.pages.schedule] : null} 
                        className={`page schedule-page${!this.state.menuOpen && this.state.currPage == constants.pages.schedule ? ' curr' : ''}`}>
                        <div 
                            onClick={this.openMenu} 
                            className="menu-btn">
                            <div className="bar"></div>
                            <div className="bar"></div>
                            <div className="bar"></div>
                        </div>
                        <header className="header">Schedule</header>
                    </div>
                    <div
                        style={this.state.menuOpen ? this.state.pageStyles[constants.pages.login] : null} 
                        className={`page login-page${!this.state.menuOpen && this.state.currPage == constants.pages.login ? ' curr' : ''}`}>
                        <div 
                            onClick={this.openMenu} 
                            className="menu-btn">
                            <div className="bar"></div>
                            <div className="bar"></div>
                            <div className="bar"></div>
                        </div>
                        <header className="header">Login</header>
                    </div>
                    <div
                        style={this.state.menuOpen ? this.state.pageStyles[constants.pages.joinUs] : null} 
                        className={`page join-us-page${!this.state.menuOpen && this.state.currPage == constants.pages.joinUs ? ' curr' : ''}`}>
                        <div 
                            onClick={this.openMenu} 
                            className="menu-btn">
                            <div className="bar"></div>
                            <div className="bar"></div>
                            <div className="bar"></div>
                        </div>
                        <header className="header">Join Us</header>
                    </div>
                    <div
                        style={this.state.menuOpen ? this.state.pageStyles[constants.pages.contact] : null} 
                        className={`page contact-page${!this.state.menuOpen && this.state.currPage == constants.pages.contact ? ' curr' : ''}`}>
                        <div 
                            onClick={this.openMenu} 
                            className="menu-btn">
                            <div className="bar"></div>
                            <div className="bar"></div>
                            <div className="bar"></div>
                        </div>
                        <header className="header">Contact</header>
                    </div>
                </div>
            </div>
        );
    }
}

const app = module.exports = {
    initialize: function (el, resolve, reject) { 
        onReady = resolve;
        onError = reject;

        app.render(el);

        // TODO: wait until after images are loaded
        resolve();
    },

    dispose: function () {
        if (rootElement)
            Inferno.render(null, rootElement);
    },

    render: function (el) {

        if (el) rootElement = el;

        if (!rootElement) throw "No element provided to render function!";

        Inferno.render(<Application />, rootElement);
    }
};
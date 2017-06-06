                    require('styles/desktop.scss');
                    require('helpers/polyfill');
const Inferno     = require('inferno');
const Component   = require('inferno-component');
const {pages}     = require('helpers/constants');
const constants   = require('desktop/helpers/constants');
const utils       = require('helpers/utils');
const settings    = require('helpers/settings');
const {commands}  = require('services/event-system');
const Pages       = require('desktop/pages');

let rootElement, onReady, onError, pageArr;

pageArr = utils.map(Object.keys(pages), key => pages[key]);

class Application extends Component {
    constructor(props) {
        super(props);

        this.  openMenu = this.  openMenu.bind(this);
        this. closeMenu = this. closeMenu.bind(this);
        this. focusPage = this. focusPage.bind(this);
        this.selectPage = this.selectPage.bind(this);
        this.    resize = this.    resize.bind(this);
        this.  redirect = this.  redirect.bind(this);


        this.onResize      = this.onResize     .bind(this);
        this.onHashChanged = this.onHashChanged.bind(this);

        let route = this.getRoute();

        this.els = {};

        this.state = {
            focusedPage: route[0],
            menuOpen:    false,
            pageStyles:  this.getPageStyles(route[0]),
            route:       route
        };
    }

    componentDidMount() {
        commands. openMenu.subscribe(this. openMenu);
        commands.closeMenu.subscribe(this.closeMenu);
        commands. redirect.subscribe(this.redirect);

        window.addEventListener("hashchange", this.onHashChanged);
        window.addEventListener("resize",     this.onResize);
        
        if (this.resizeTimeoutId) clearTimeout(this.resizeTimeoutId);

        // TODO: wait for images to load
        this.resizeTimeoutId = setTimeout(this.resize, 10);
    }

    componentWillUnmout() {
        commands. openMenu.unsubscribe(this. openMenu);
        commands.closeMenu.unsubscribe(this.closeMenu);
        commands. redirect.unsubscribe(this.redirect);

        window.removeEventListener("hashchange", this.onHashChanged);
        window.removeEventListener("resize",     this.onResize);
    }

    getRoute() {
        let route = location.hash
            .replace('#/', '')
            .replace('#',  '').split('/');

        if (!route.length || !pageArr.includes(route[0])) route = [pages.home];

        return route;
    }

    onHashChanged() {
        let route = this.getRoute();

        if (route.join('/') != this.state.route.join('/')) {
            this.setState({ route: route });
        }
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

    getPageStyles(pageKey) {
        let pageIndex = constants.pageOrder.indexOf(pageKey || this.state.focusedPage),
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

        return styles;
    }

    selectPage(page) { this.redirect(page); }

    focusPage(page) {
        this.setState({
            focusedPage: page,
            pageStyles:  this.getPageStyles(page)
        })
    }

    openMenu() {
        if (!this.state.menuOpen) {
            this.setState({ 
                menuOpen:    true,
                focusedPage: this.state.route[0],
                pageStyles:  this.getPageStyles()
            });
        }
    }

    closeMenu() {
        if (this.state.menuOpen) {
            this.setState({ 
                menuOpen:    false,
                focusedPage: this.state.route[0] 
            });
        }
    }

    redirect() {
        let route = Array.makeArray(arguments);

        if (!route.length) { return; }

        //if (!Pages[route[0]]) { return console.error(`Page: ${route[0]} does not exist!`); }

        this.setState({
            focusedPage: route[0],
            route:       route,
            menuOpen:    false
        });

        window.scrollTo(0,0);
        if (rootElement) rootElement.scrollTop = 0;


        window.location.hash = '#/' + route.join('/');

        // setTimeout(function () {

        //     window.location.hash = '#/' + route.join('/');

        //     this.setState({ 
        //         menuOpen:  false,
        //         scrolling: false,
        //         offset:    0
        //     });

        // }.bind(this));
    }

    render() {
        let pages = utils.map(constants.pageOrder, name => {
            let Page = Pages[name];

            return (
                <Page 
                    menuOpen={this.state.menuOpen}
                    route={this.state.route}
                    styles={this.state.pageStyles} />
            );
        });

        let menuLinks = utils.map(constants.menuOrder, name => {
            return (
                <div
                    active={this.state.focusedPage == name ? true : undefined}
                    onClick={e => this.selectPage(name)}
                    onMouseOver={e => this.focusPage(name)}
                    className="link">{constants.pageTitles[name]}</div>
            );
        });

        // if menu links is not a multiple of 3
        if (menuLinks.length % 3) {

            // put a link in the 2nd to last slot. 
            //
            // if there are 7/9 links, for example, this will put the link in the 7th slot, 
            // pushing the last link to the 8th (the 9th link will be added next which will 
            // center the last link).
            //
            // if there are 8/9 links, for example, this will put the link in the 8th slot,
            // so that the last two links will be surrounding the empty link 
            menuLinks.splice(menuLinks.length - 1, 0, <div className="link empty" />);

            // if the links are still missing one to be even, add another empty link in the
            // last slot.
            if (menuLinks.length % 3) menuLinks.push(<div className="link empty" />)
        }

        return (
            <div className={`app desktop${this.state.menuOpen ? ' hide-overflow' : ''}`}>
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
                        <div className="links">{menuLinks}</div>
                        <div className="social">
                            <a target="nfg-social" href={settings.social.Instagram.href} className="link"><span className="fa fa-instagram" /></a>
                            <a target="nfg-social" href={settings.social.Facebook.href} className="link"><span className="fa fa-facebook" /></a>
                            <a target="nfg-social" href={settings.social.Youtube.href} className="link"><span className="fa fa-youtube-play" /></a>
                            <a target="nfg-social" href={settings.social.Twitter.href} className="link"><span className="fa fa-twitter" /></a>
                        </div>
                    </div>
                    <div className="option">
                        <button
                            onClick={this.closeMenu} 
                            className="close-btn">
                            <div className="bar"></div>
                            <div className="bar"></div>
                        </button>
                    </div>
                </div>
                <div className="pages">{pages}</div>
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
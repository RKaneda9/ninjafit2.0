                           require('styles/desktop.scss');
                           require('helpers/polyfill');
const Inferno            = require('inferno');
const Component          = require('inferno-component');
const pages              = require('helpers/constants').pages;
const constants          = require('desktop/helpers/constants');
const utils              = require('helpers/utils');
const {commands, events} = require('services/event-system');
const Pages              = require('desktop/pages');
const App                = require('desktop/components/app');
const Menu               = require('desktop/containers/menu');

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

    resize() { events.onWindowResize.emit(); }

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

        if (!Pages[route[0]]) { return console.error(`Page: ${route[0]} does not exist!`); }

        this.setState({
            focusedPage: route[0],
            route:       route,
            menuOpen:    false
        });

        window.scrollTo(0,0);
        if (rootElement) rootElement.scrollTop = 0;
        window.location.hash = '#/' + route.join('/');
    }

    render() {
        return (
            <App menuOpen={this.state.menuOpen}>
                <Menu 
                    menuOpen={this.state.menuOpen}
                    focusedPage={this.state.focusedPage}
                    onSelectPage={this.selectPage}
                    onFocusPage={this.focusPage} />

                <div className="pages">
                    {utils.map(constants.pageOrder, name => {
                        let Page = Pages[name];

                        return (
                            <Page 
                                menuOpen={this.state.menuOpen}
                                route={this.state.route}
                                styles={this.state.pageStyles} />
                        );
                    })}
                </div>
            </App>
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
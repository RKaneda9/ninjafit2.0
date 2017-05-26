                    require('styles/mobile.scss');
                    require('mobile/helpers/polyfill');
const Inferno     = require('inferno');
const Component   = require('inferno-component');
const utils       = require('mobile/helpers/utils');
const settings    = require('mobile/helpers/settings');
const constants   = require('mobile/helpers/constants');
const Pages             = require('mobile/pages');
const {events,commands} = require('mobile/services/event-system');
const {App, Defs} = require('mobile/components/app');
const Menu        = require('mobile/containers/menu');
const Footer      = require('mobile/containers/page-footer');

let rootElement, onReady, onError;

class Application extends Component {
    constructor(props) {
        super(props);

        this. redirect = this. redirect.bind(this);
        this. openMenu = this. openMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
        this.   resize = this.   resize.bind(this);

        this.onResize      = this.onResize     .bind(this);
        this.onHashChanged = this.onHashChanged.bind(this);
        
        this.state = { 
            route:    this.getRoute(),
            display:  this.getDisplayInfo(),
            menuOpen: false
        };
    }

    getDisplayInfo() {
        return {
            isMobile: window.innerWidth > 700
        }
    }

    resize() {
        this.setState({ display: this.getDisplayInfo() });

        events.onWindowResize.emit();
    }

    onResize() {
        if (this.resizeTimeoutId) clearTimeout(this.resizeTimeoutId);

        this.resizeTimeoutId = setTimeout(this.resize, 10);
    }

    getRoute() {
        let route = location.hash
            .replace('#/', '')
            .replace('#',  '').split('/');

        if (!route.length || !Pages[route[0]]) route = [constants.pages.home];

        return route;
    }

    componentDidMount() {
        commands. openMenu.subscribe(this. openMenu);
        commands.closeMenu.subscribe(this.closeMenu);
        commands. redirect.subscribe(this.redirect);

        window.addEventListener("hashchange", this.onHashChanged);
        window.addEventListener("resize",     this.onResize);
    }

    componentWillUnmount() {
        commands. openMenu.unsubscribe(this. openMenu);
        commands.closeMenu.unsubscribe(this.closeMenu);
        commands. redirect.unsubscribe(this.redirect);

        window.removeEventListener("hashchange", this.onHashChanged);
        window.removeEventListener("resize",     this.onResize);
    }

    onHashChanged() {
        let route = this.getRoute();

        if (route.join('/') != this.state.route.join('/')) {
            this.setState({ route: route });
        }
    }

     openMenu() { if (!this.state.menuOpen) this.setState({ menuOpen: true  }); }
    closeMenu() { if ( this.state.menuOpen) this.setState({ menuOpen: false }); }

    redirect() {
        let route = Array.makeArray(arguments);

        if (!route.length) { return; }

        if (!Pages[route[0]]) { return console.error(`Page: ${route[0]} does not exist!`); }

        this.setState({
            route:     route,
            offset:    rootElement ? rootElement.parentElement.scrollTop : 0,
            scrolling: true
        });

        window.scrollTo(0,0);
        if (rootElement) rootElement.scrollTop = 0;

        setTimeout(function () {

            window.location.hash = '#/' + route.join('/');

            this.setState({ 
                menuOpen:  false,
                scrolling: false,
                offset:    0
            });

        }.bind(this));
    }

    render() { 
        let Page = Pages[this.state.route[0]];

        return (
            <App 
                scrolling={this.state.scrolling} 
                offset={this.state.offset}>

                <Defs />
                <Menu 
                    socialLinks={settings.social}
                    page={this.state.route[0]}
                    opened={this.state.menuOpen} />

                <Page display={this.state.display} />
                <Footer socialLinks={settings.social} />
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
                    require('helpers/polyfill');
const Inferno     = require('inferno');
const Component   = require('inferno-component');
const utils       = require('helpers/utils');
const settings    = require('helpers/settings');
const constants   = require('helpers/constants');
const Pages       = require('pages');
const {commands}  = require('services/event-system');
const {App, Defs} = require('components/app');
const Menu        = require('containers/menu');
const Footer      = require('containers/page-footer');

const rootElement = document.getElementById('app');

class Application extends Component {
    constructor(props) {
        super(props);

        this. redirect = this. redirect.bind(this);
        this. openMenu = this. openMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);

        this.onHashChanged = this.onHashChanged.bind(this);
        
        this.state = { 
            route:    this.getRoute(),
            menuOpen: false
        };
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
    }

    componentWillUnmount() {
        commands. openMenu.unsubscribe(this. openMenu);
        commands.closeMenu.unsubscribe(this.closeMenu);
        commands. redirect.unsubscribe(this.redirect);

        window.removeEventListener("hashchange", this.onHashChanged);
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

        window.location.hash = '#/' + route.join('/');

        // TODO:
        window.scrollTo(0,0);
        rootElement.scrollTop = 0;

        this.setState({ route: route, menuOpen: false });
    }

    render() { 
        let Page = Pages[this.state.route[0]];

        return (
            <App>
                <Defs />
                <Menu 
                    socialLinks={settings.social}
                    page={this.state.route[0]}
                    opened={this.state.menuOpen} />

                <Page />
                <Footer socialLinks={settings.social} />
            </App>
        );
    }
}

Inferno.render(
    <Application />,
    rootElement
);
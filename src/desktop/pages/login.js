const Inferno     = require('inferno');
const Component   = require('inferno-component');
const constants   = require('helpers/constants');
const HeaderBar   = require('desktop/components/sections/header-bar');
const PageFooter  = require('desktop/containers/page-footer');
const Page        = require('desktop/components/page');
const LoginForm   = require('shared/containers/login-form');

module.exports = class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <Page {...this.props} name={constants.pages.login}>
                <HeaderBar title="Login" />
                <LoginForm />
                <PageFooter />
            </Page>
        );
    }
}
const Inferno   = require('inferno');
const Component = require('inferno-component');
const Page      = require('mobile/components/page');
const HeaderBar = require('mobile/components/sections/header-bar');
const LoginForm = require('shared/containers/login-form');

module.exports = class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <Page name="login">
                <HeaderBar title="Login"></HeaderBar>
                <LoginForm />
            </Page>
        );
    }
}
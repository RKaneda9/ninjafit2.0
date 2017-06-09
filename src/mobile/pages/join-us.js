const Inferno     = require('inferno');
const Component   = require('inferno-component');
const Page        = require('mobile/components/page');
const HeaderBar   = require('mobile/components/sections/header-bar');
const VisitUs     = require('shared/components/sections/visit-us');
const Pricing     = require('shared/containers/pricing-section');
const ContactForm = require('mobile/containers/contact-form');

module.exports = class JoinUs extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <Page name="join-us">
                <HeaderBar title="Join Us"></HeaderBar>
                <Pricing />
                <VisitUs />
                <ContactForm />
            </Page>
        );
    }
}
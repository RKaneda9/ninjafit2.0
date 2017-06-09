const Inferno     = require('inferno');
const Component   = require('inferno-component');
const constants   = require('helpers/constants');
const HeaderBar   = require('desktop/components/sections/header-bar');
const ContactForm = require('desktop/containers/contact-form');
const PageFooter  = require('desktop/containers/page-footer');
const Page        = require('desktop/components/page');
const Pricing     = require('shared/containers/pricing-section');
const VisitUs     = require('shared/components/sections/visit-us');

module.exports = class JoinUs extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <Page {...this.props} name={constants.pages.joinUs}>
                <HeaderBar title="Join Us" />
                <Pricing />
                <VisitUs />
                <ContactForm />
                <PageFooter />
            </Page>
        );
    }
}
const Inferno     = require('inferno');
const Component   = require('inferno-component');
const constants   = require('helpers/constants');
const HeaderBar   = require('desktop/components/sections/header-bar');
const PageFooter  = require('desktop/containers/page-footer');
const ContactForm = require('desktop/containers/contact-form');
const Page        = require('desktop/components/page');
const VisitUs     = require('shared/components/sections/visit-us');

module.exports = class Contact extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <Page {...this.props} name={constants.pages.contact}>
                <HeaderBar title="Contact" />
                <VisitUs />
                <ContactForm />
                <PageFooter />
            </Page>
        );
    }
}
const Inferno     = require('inferno');
const Component   = require('inferno-component');
const Page        = require('mobile/components/page');
const HeaderBar   = require('mobile/components/sections/header-bar');
const ContactForm = require('mobile/containers/contact-form');
const VisitUs     = require('mobile/components/sections/visit-us');

module.exports = class Contact extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        let i = 0;

        return (
            <Page name="contact">
                <HeaderBar title="Contact"></HeaderBar>
                <ContactForm />
                <VisitUs />
            </Page>
        );
    }
}
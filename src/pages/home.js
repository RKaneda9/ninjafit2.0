const Inferno   = require('inferno');
const Component = require('inferno-component');
const settings            = require('helpers/settings').homePage;
const {commands}          = require('services/event-system');
const constants           = require('helpers/constants');
const PageFooter          = require('containers/page-footer');
const {Page}              = require('components/pages/base');
const {Row, Col}          = require('components/form');
const {TextBox, TextArea} = require('containers/inputs');
const {

          MenuButton, 
    ScrollDownButton

} = require('components/buttons');

const {

        LandingSection,
          AboutSection,
           MainSection,
          ShortSection,
           JoinSection,
            MapSection,
        ContactSection,
    TestimonialsSlider,


} = require('components/pages/home');


module.exports = class Home extends Component {
    constructor(props) {
        super(props);

        this.onResize   = this.onResize  .bind(this);
        this.scrollDown = this.scrollDown.bind(this);

        this.state = {
            sliderStyles: {}
        };
    }

    componentDidMount() {
        window.addEventListener('resize', this.onResize);

        setTimeout(this.onResize, 100);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onResize);
    }

    onResize() {
        if (this.container && 
            this.header) {

            let x1    = this.container.clientWidth;
            let y1    = this.header   .clientHeight;
            let x2    = this.container.clientWidth  / 2;
            let y2    = this.container.clientHeight / 2;
            let sqrt3 = Math.sqrt(3);

            let y = - (sqrt3 / 4) * (x1 - y1 * sqrt3 - x2 - y2 / sqrt3);
            let x = sqrt3 * y - y1 * sqrt3 + x1;

            let r = Math.sqrt(Math.pow(x - x2, 2) + Math.pow(y - y2, 2));

            let h = 2 * r;
            let x3 = x2 - r / 2;
            let r2 = 2 / sqrt3 * (this.container.clientWidth - x3);
            let w  = 2 * r2;

            this.setState({ sliderStyles: { width: w, height: h } });
        }
    }

    scrollDown(e) {
        console.log("TODO");
    }

    render() {
        let i = 0;

        return (
            <Page name="home">
                <LandingSection 
                    onContainerRef={e => (this.container = e)}
                    onHeaderRef={e => (this.header = e)}
                    onOpenMenu={commands.openMenu.emit}
                    onScrollDown={this.scrollDown}
                    sliderStyles={this.state.sliderStyles} />

                <AboutSection
                    headerText={settings.about.headerText}
                    contentText={settings.about.contentText}
                    onPlayIntro={this.playIntro}
                    onExploreMore={e => this.props.onRedirect(constants.pages.aboutUs)} />

                <MainSection
                    index={i}
                    headerText={settings.mainSection1.headerText}
                    contentText={settings.mainSection1.contentText}
                    image={settings.mainSection1.image} />

                <MainSection
                    index={++i}
                    headerText={settings.mainSection2.headerText}
                    contentText={settings.mainSection2.contentText}
                    image={settings.mainSection2.image} />

                <MainSection
                    index={++i}
                    headerText={settings.mainSection3.headerText}
                    contentText={settings.mainSection3.contentText}
                    image={settings.mainSection3.image} />

                <ShortSection
                    index={i = 0}
                    headerText={settings.shortSection1.headerText}
                    contentText={settings.shortSection1.contentText}
                    onExploreMore={null} />

                <ShortSection
                    index={++i}
                    headerText={settings.shortSection2.headerText}
                    contentText={settings.shortSection2.contentText}
                    onExploreMore={null} />

                <TestimonialsSlider 
                    headerText={null}
                    quote={settings.testimonials[0].quote}
                    author={settings.testimonials[0].author} />

                <JoinSection />
                <MapSection />
                <ContactSection onSubmit={null}>
                    <Row>
                        <Col>
                            <TextBox maxLength={99} placeholder="First Name" />
                        </Col>
                        <Col>
                            <TextBox maxLength={99} placeholder="Last Name" />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <TextBox maxLength={199} placeholder="Your Email" />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <TextArea maxLength={999} placeholder="Your Email" />
                        </Col>
                    </Row>
                </ContactSection>
                <PageFooter
                    onRedirect={this.props.onRedirect}
                    socialLinks={this.props.socialLinks} />
            </Page>
        );
    }
}
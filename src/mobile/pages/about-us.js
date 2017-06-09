const Inferno    = require('inferno');
const Component  = require('inferno-component');
const utils      = require('helpers/utils');
const settings   = require('helpers/settings');
const HeaderBar  = require('mobile/components/sections/header-bar');
const PageFooter = require('mobile/containers/page-footer');
const Popup      = require('mobile/components/popup');
const Page       = require('mobile/components/page');
const Social     = require('shared/components/icons/social');

const {

    Section,
    Header,
    Content,
    Footer,
    Image

} = require('shared/components/section');

const {

    TriangleUpRight,
    TriangleDown,
    Background

} = require('mobile/components/backgrounds');

const {

    Button,
    CloseButton
    
} = require('shared/components/buttons');


module.exports = class AboutUs extends Component {
    constructor(props) {
        super(props);

        this.viewBio    = this.viewBio   .bind(this);
        this.closePopup = this.closePopup.bind(this);

        this.state = { showPopup: false };
    }

    viewBio   (member) { this.setState({ showPopup: true, selected: member }); }
    closePopup()       { this.setState({ showPopup: false }); }

    render() {

        let member = this.state.selected || { bio: '' };

        return (
            <Page name="about-us">
                <HeaderBar title="About Us"></HeaderBar>
                
                <Section name="landing">
                    <Header  text={settings.aboutPage.landing.header} />
                    <Content text={settings.aboutPage.landing.content} />
                </Section>

                <Section name="our-philosophy">
                    <Background>
                        <TriangleUpRight position="left h-full" />
                        <div className="middle" />
                        <TriangleDown position="bottom h-full" />
                    </Background>

                    <Image    url={settings.aboutPage.philosophy.image} />
                    <Header  text={settings.aboutPage.philosophy.header} />
                    <Content text={settings.aboutPage.philosophy.content} />
                </Section>

                <Section name="team">
                    <Header text={settings.aboutPage.staff.header} />
                    <div className="content">
                        <ul className="image-list">
                            {utils.map(settings.staff, (member, i) => 
                                <li className="image-item">
                                    <div className="image-wrapper">
                                        <div 
                                            className="image" 
                                            style={{ backgroundImage: `url("${member.image}")`}} />
                                    </div>

                                    <div className="title">{member.name}</div>
                                    <div className="desc">{member.title}</div>
                                    <Footer>
                                        <Button onClick={e => this.viewBio(member)}>Bio</Button>
                                    </Footer>
                                </li>
                            )}
                        </ul>
                    </div>
                </Section>

                <Popup 
                    open={this.state.showPopup}
                    type="staff-member">
                    <header className="header">
                        
                        <Image url={member.image} />

                        <div className="details">
                            <div className="name">{member.name}</div>
                            <div className="title">{member.title}</div>
                            <div className="social-list">
                                {utils.map(member.social, (href, type) => {
                                    let Icon = Social[type];

                                    return (
                                        <a className="social-link" href={href} target="social">
                                            <Icon />
                                        </a>
                                    );
                                })}
                            </div>
                        </div>

                        <CloseButton onClick={this.closePopup} />
                    </header>
                    <Content text={member.bio} />
                </Popup>
            </Page>
        );
    }
}
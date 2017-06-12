const Inferno    = require('inferno');
const Component  = require('inferno-component');
const constants  = require('helpers/constants');
const utils      = require('helpers/utils');
const settings   = require('helpers/settings');
const HeaderBar  = require('desktop/components/sections/header-section');
const PageFooter = require('desktop/containers/page-footer');
const Page       = require('desktop/components/page');
const Social     = require('shared/components/icons/social');

const {

    Section,
    Header,
    Content,
    Footer,
    Image

} = require('shared/components/section');

const Hex = require('desktop/components/backgrounds').Hex;

module.exports = class AboutUs extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <Page {...this.props} name={constants.pages.aboutUs}>
                <HeaderBar title="About Us" />

                <Section name="about">
                    <Image    url={settings.aboutPage.landing.image} />
                    <Header  text={settings.aboutPage.landing.header} />
                    <Content text={settings.aboutPage.landing.content} />
                </Section>

                <Section name="our-philosophy">
                    <div className="image-item">
                        <Image url={settings.aboutPage.philosophy.image} />
                    </div>

                    <div className="container">
                        <Hex />
                        <Header  text={settings.aboutPage.philosophy.header} />
                        <Content text={settings.aboutPage.philosophy.content} />
                    </div>

                    <div className="image-item">
                        <Image url={settings.aboutPage.philosophy.image} />
                    </div>
                </Section>

                <Section name="team">
                    <Header text={settings.aboutPage.staff.header} />
                    <div className="content">
                        <ul className="staff-list">
                            {utils.map(settings.staff, (member, i) => 
                                <li className="staff-member">
                                    <header className="header">
                                        <div 
                                            className="image" 
                                            style={{ backgroundImage: `url("${member.image}")`}} />

                                        <div className="details">
                                            <div className="name">{member.name}</div>
                                            <div className="title">{member.title}</div>
                                            <ul className="social-list">
                                                {utils.map(member.social, (href, type) => {
                                                    let Icon = Social[type];

                                                    return (
                                                        <a 
                                                            className="social-link" 
                                                            type={type}
                                                            href={href} 
                                                            target="social">

                                                            <Icon />
                                                        </a>
                                                    );
                                                })}
                                            </ul>
                                        </div>
                                    </header>
                                    <div className="content">
                                        {utils.map(member.bio.split('\n'), text => 
                                            <p>{text}</p>
                                        )}
                                    </div>
                                </li>
                            )}
                        </ul>
                    </div>
                </Section>

                <PageFooter />
            </Page>
        );
    }
}
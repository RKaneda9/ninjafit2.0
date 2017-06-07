const Inferno    = require('inferno');
const Component  = require('inferno-component');
const utils      = require('helpers/utils');
const settings   = require('helpers/settings');
const HeaderBar  = require('mobile/components/sections/header-bar');
const PageFooter = require('mobile/containers/page-footer');
const Popup      = require('mobile/components/popup');
const Page       = require('mobile/components/page');

const {

    TriangleUpRight,
    TriangleDown,
    Background

} = require('mobile/components/backgrounds');

const {

    Button,
    CloseButton
    
} = require('mobile/components/buttons');


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
                
                <section className="landing">
                    <header className="header">What is NinjaFit Gym?</header>
                    <div className="content">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>
                </section>

                <section className="our-philosophy">
                    <Background>
                        <TriangleUpRight position="left h-full" />
                        <div className="middle" />
                        <TriangleDown position="bottom h-full" />
                    </Background>
                    <div className="image" style={{ backgroundImage: `url("https://scontent-atl3-1.cdninstagram.com/t51.2885-15/e35/15802716_253884945025372_5272580072513994752_n.jpg")`}} />

                    <header className="header">Our Philosophy</header>
                    <div className="content">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>
                </section>

                <section className="team">
                    <header className="header">Meet the Team</header>
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
                                    <footer className="footer">
                                        <Button onClick={e => this.viewBio(member)}>Bio</Button>
                                    </footer>
                                </li>
                            )}
                        </ul>
                    </div>
                </section>

                <Popup 
                    open={this.state.showPopup}
                    type="staff-member">
                    <header className="header">
                        
                        <div
                            className="image" 
                            style={{ backgroundImage: member.image ? `url("${member.image}")` : null }} />

                        <div className="details">
                            <div className="name">{member.name}</div>
                            <div className="title">{member.title}</div>
                            <ul className="social-list">
                                <li className="social-link fa fa-facebook" />
                                <li className="social-link fa fa-twitter" />
                                <li className="social-link fa fa-instagram" />
                            </ul>
                        </div>

                        <CloseButton onClick={this.closePopup} />
                    </header>
                    <div className="content">
                        {member ? utils.map(member.bio.split('\n'), (text, i) =>
                            <p>{text}</p>
                        ) : null}
                    </div>
                </Popup>
            </Page>
        );
    }
}
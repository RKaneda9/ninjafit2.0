const Inferno   = require('inferno');
const Component = require('inferno-component');
const utils                    = require('helpers/utils');
const settings                 = require('helpers/settings');
const {commands}               = require('services/event-system');
const constants                = require('helpers/constants');
const PageFooter               = require('containers/page-footer');
const {Page}                   = require('components/pages/base');
const {Row, Col}               = require('components/form');
const {TextBox, TextArea}      = require('containers/inputs');

const {

    Button,
    MenuButton,
    CloseButton

} = require('components/buttons');

const {

    TriangleUpRight,
    TriangleDown,
    Background

} = require('components/backgrounds');


module.exports = class AboutUs extends Component {
    constructor(props) {
        super(props);

        this.onResize   = this.onResize  .bind(this);
        this.scrollDown = this.scrollDown.bind(this);
        this.viewBio    = this.viewBio   .bind(this);
        this.closePopup = this.closePopup.bind(this);

        this.state = {
            sliderStyles: {}
        };
    }

    componentDidMount() {
        //window.addEventListener('resize', this.onResize);

        //setTimeout(this.onResize);
    }

    componentWillUnmount() {
        //window.removeEventListener('resize', this.onResize);
    }

    onResize() {
        
    }

    viewBio(member) {
        this.setState({ selectedMember: member });
    }

    closePopup() {
        this.setState({ selectedMember: null })
    }

    scrollDown(e) {
        console.log("TODO");
    }

    render() {
        let i = 0;

        return (
            <Page name="about-us">
                <header className="header-bar">
                    <p className="title">About Us</p>
                    <MenuButton onClick={commands.openMenu.emit} />
                </header>
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
                        <TriangleUpRight className="top" />
                        <div className="middle" />
                        <TriangleDown className="bottom" />
                    </Background>
                    <div className="image" />

                    <header className="header">Our Philosophy</header>
                    <div className="content">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>
                </section>

                <section className="team">
                    <header className="header">Meet the Team</header>
                    <div className="content">
                        <ul className="staff-list">
                            {utils.map(settings.staff, (member, i) => 
                                <li key={i} className="staff-member">
                                    <div className="member-image">
                                        <div 
                                            className="image" 
                                            style={{ backgroundImage: `url("${member.image}")`}} />
                                    </div>

                                    <div className="member-name">{member.name}</div>
                                    <div className="member-title">{member.title}</div>
                                    <footer className="footer">
                                        <Button onClick={e => this.viewBio(member)}>bio</Button>
                                    </footer>
                                </li>
                            )}
                        </ul>
                    </div>
                </section>
                <PageFooter
                    onRedirect={this.props.onRedirect}
                    socialLinks={this.props.socialLinks} />

                <div className={`popup staff-member ${this.state.selectedMember ? "open" : ""}`}>
                    <header className="header">
                        <div
                            className="image" 
                            style={{ backgroundImage: `url("${this.state.selectedMember ? this.state.selectedMember.image : '' }")` }} />

                        <div className="details">
                            <div className="name">{this.state.selectedMember ? this.state.selectedMember.name : null}</div>
                            <div className="title">{this.state.selectedMember ? this.state.selectedMember.title : null}</div>
                            <ul className="social-list">
                                <li className="social-link fa fa-facebook" />
                                <li className="social-link fa fa-twitter" />
                                <li className="social-link fa fa-instagram" />
                            </ul>
                        </div>

                        <CloseButton onClick={this.closePopup} />
                    </header>

                    <div className="content">
                        {this.state.selectedMember ? utils.map(this.state.selectedMember.bio.split('\n'), (text, i) =>
                            <p key={i}>{text}</p>
                        ) : null}
                    </div>
                </div>
                <div className="popup-cover" />
            </Page>
        );
    }
}
const Inferno   = require('inferno');
const Component = require('inferno-component');
// const utils                    = require('helpers/utils');
// const settings                 = require('helpers/settings');
const {commands}               = require('services/event-system');
// const constants                = require('helpers/constants');
const PageFooter               = require('mobile/containers/page-footer');
// const {Page}                   = require('components/pages/base');
// const {Row, Col}               = require('components/form');
// const {TextBox, TextArea}      = require('containers/inputs');

const {

    Button,
    MenuButton,
    CloseButton

} = require('mobile/components/buttons');

// const {

//     TriangleRight,
//     TriangleDown,
//     Background

// } = require('components/backgrounds');

// const {

//         LandingSection,
//           AboutSection,
//            MainSection,
//           ShortSection,
//            JoinSection,
//             MapSection,
//         ContactSection,
//     TestimonialsSlider,


// } = require('components/pages/home');


module.exports = class WOD extends Component {
    constructor(props) {
        super(props);

        this.showTomorrow  = this.showTomorrow .bind(this);
        this.showYesterday = this.showYesterday.bind(this);

        this.state = {
            date: new Date()
        };
    }

    componentDidMount() {
        //window.addEventListener('resize', this.onResize);

        //setTimeout(this.onResize);
    }

    componentWillUnmount() {
        //window.removeEventListener('resize', this.onResize);
    }

    showTomorrow () { this.setState({ date: this.state.date.getTomorrow () }); }
    showYesterday() { this.setState({ date: this.state.date.getYesterday() }); }

    render() {
        let i = 0;

        return (
            <div className="page wod-page">
                <header className="header-bar">
                    <p className="title">WOD</p>
                    <MenuButton onClick={commands.openMenu.emit} />
                </header>

                <div className="date-selector">
                    <div className="row">
                        <button 
                            onClick={this.showYesterday}
                            className="option-btn fa fa-angle-left" />
                        <div className="details">
                            <p className="title">{this.state.date.getDayText()}</p>
                            <p className="sub">{`${this.state.date.getMonthText()} ${this.state.date.getDateText()}, ${this.state.date.getFullYear()}`}</p>
                        </div>
                        <button 
                            onClick={this.showTomorrow}
                            className="option-btn fa fa-angle-right" />
                    </div>
                </div>
                <div className="calendar-separator">
                    <span className="title">2 Workouts Found</span>
                </div>
                <div className="event-list">
                    <div className="event-item">
                        <div className="title">Strength</div>
                        <div className="sub-title">Deadlift</div>
                        <div className="content">
                            <p>1x8</p>
                            <p>1x8</p>
                            <p>1x8</p>
                        </div>
                    </div>
                    <div className="event-item">
                        <div className="title">WOD</div>
                        <div className="sub-title">170508B</div>
                        <div className="content">
                            <p>3RFT</p>
                            <p>6 Deadlifts</p>
                            <p>5 hang Power Cleans</p>
                            <p>4 Front Squats</p>
                            <p>3 shoulder to overhead</p>
                            <p>2 thrusters</p>
                            <p>1 Muscle Up</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const Inferno   = require('inferno');
const Component = require('inferno-component');
// const utils                    = require('helpers/utils');
// const settings                 = require('helpers/settings');
const {commands}               = require('mobile/services/event-system');
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

    getDateText() {
        let val = this.state.date.getDate();

        switch (val) {
            case  1:
            case 21:
            case 31: return val + 'st';
            case  2:
            case 22: return val + 'nd';
            case  3: 
            case 23: return val + 'rd';
            default: return val + 'th';
        }
    }

    getMonthText() {
        switch (this.state.date.getMonth()) {
            case  0: return 'January';
            case  1: return 'February';
            case  2: return 'March';
            case  3: return 'April';
            case  4: return 'May';
            case  5: return 'June';
            case  6: return 'July';
            case  7: return 'August';
            case  8: return 'September';
            case  9: return 'October';
            case 10: return 'November';
            case 11: return 'December';
        }
    }

    getDayText() {
        switch (this.state.date.getDay()) {
            case 0: return 'Sunday';
            case 1: return 'Monday';
            case 2: return 'Tuesday';
            case 3: return 'Wednesday';
            case 4: return 'Thursday';
            case 5: return 'Friday';
            case 6: return 'Saturday';
        }
    }

    showTomorrow() {
        let date = this.state.date;
        date.setDate(date.getDate() + 1);

        this.setState({ date: date });
    }

    showYesterday() {
        let date = this.state.date;
        date.setDate(date.getDate() - 1);

        this.setState({ date: date });
    }

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
                            <p className="title">{this.getDayText()}</p>
                            <p className="sub">{`${this.getMonthText()} ${this.getDateText()}, ${this.state.date.getFullYear()}`}</p>
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
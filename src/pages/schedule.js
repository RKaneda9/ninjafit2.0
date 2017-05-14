const Inferno   = require('inferno');
const Component = require('inferno-component');
// const utils                    = require('helpers/utils');
// const settings                 = require('helpers/settings');
const {commands}               = require('services/event-system');
// const constants                = require('helpers/constants');
const PageFooter               = require('containers/page-footer');
// const {Page}                   = require('components/pages/base');
// const {Row, Col}               = require('components/form');
// const {TextBox, TextArea}      = require('containers/inputs');

const {

    Button,
    MenuButton,
    CloseButton

} = require('components/buttons');

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


module.exports = class Schedule extends Component {
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
            <div className="page schedule-page">
                <header className="header-bar">
                    <p className="title">Schedule</p>
                    <MenuButton onClick={commands.openMenu.emit} />
                </header>

                <div className="calendar-header">
                    <div className="row">
                        <button 
                            onClick={this.showYesterday}
                            className="option-btn fa fa-angle-left" />
                        <div className="day-details">
                            <p className="title">{this.getDayText()}</p>
                            <p className="sub">{`${this.getMonthText()} ${this.getDateText()}, ${this.state.date.getFullYear()}`}</p>
                        </div>
                        <button 
                            onClick={this.showTomorrow}
                            className="option-btn fa fa-angle-right" />
                    </div>
                </div>
                <div className="open-hours">
                    <div className="title open">Open</div>
                    <div className="value">6am - 11am, 3:30pm - 8:30pm</div>
                    <button className="btn">View Month</button>
                </div>
                <div className="event-list">
                    <div className="event-item">
                        <div className="content">
                            <div className="title">Group Training (WOD)</div>
                            <div className="details">
                                <p className="prop">
                                    <span className="icon fa fa-clock-o" />
                                    <span className="value">6:00am - 7:00am</span>
                                </p>
                                <p className="prop">
                                    <span className="icon fa fa-hourglass" />
                                    <span className="value">1 hour</span>
                                </p>
                            </div>
                        </div>
                        <div className="options">
                            <button className="btn">
                                <span>Attend</span>
                                <span className="icon fa fa-long-arrow-right" />
                            </button>
                        </div>
                    </div>

                    <div className="event-item">
                        <div className="content">
                            <div className="title">Group Training (WOD)</div>
                            <div className="details">
                                <p className="prop">
                                    <span className="icon fa fa-clock-o" />
                                    <span className="value">7:00am - 8:00am</span>
                                </p>
                                <p className="prop">
                                    <span className="icon fa fa-hourglass" />
                                    <span className="value">1 hour</span>
                                </p>
                            </div>
                        </div>
                        <div className="options">
                            <button className="btn">
                                <span>Attend</span>
                                <span className="icon fa fa-long-arrow-right" />
                            </button>
                        </div>
                    </div>

                    <div className="event-item">
                        <div className="content">
                            <div className="title">Group Training (WOD)</div>
                            <div className="details">
                                <p className="prop">
                                    <span className="icon fa fa-clock-o" />
                                    <span className="value">8:00am - 9:00am</span>
                                </p>
                                <p className="prop">
                                    <span className="icon fa fa-hourglass" />
                                    <span className="value">1 hour</span>
                                </p>
                            </div>
                        </div>
                        <div className="options">
                            <button className="btn">
                                <span>Attend</span>
                                <span className="icon fa fa-long-arrow-right" />
                            </button>
                        </div>
                    </div>

                    <div className="event-item">
                        <div className="content">
                            <div className="title">Group Training (WOD)</div>
                            <div className="details">
                                <p className="prop">
                                    <span className="icon fa fa-clock-o" />
                                    <span className="value">10:00am -11:00am</span>
                                </p>
                                <p className="prop">
                                    <span className="icon fa fa-hourglass" />
                                    <span className="value">1 hour</span>
                                </p>
                            </div>
                        </div>
                        <div className="options">
                            <button className="btn">
                                <span>Attend</span>
                                <span className="icon fa fa-long-arrow-right" />
                            </button>
                        </div>
                    </div>

                    <div className="event-item">
                        <div className="content">
                            <div className="title">Group Training (WOD)</div>
                            <div className="details">
                                <p className="prop">
                                    <span className="icon fa fa-clock-o" />
                                    <span className="value">11:00am - 12:00pm</span>
                                </p>
                                <p className="prop">
                                    <span className="icon fa fa-hourglass" />
                                    <span className="value">1 hour</span>
                                </p>
                            </div>
                        </div>
                        <div className="options">
                            <button className="btn">
                                <span>Attend</span>
                                <span className="icon fa fa-long-arrow-right" />
                            </button>
                        </div>
                    </div>

                    <div className="event-item">
                        <div className="content">
                            <div className="title">Private Events</div>
                            <div className="details">
                                <p className="prop">
                                    <span className="icon fa fa-clock-o" />
                                    <span className="value">12:00pm - 1:00pm</span>
                                </p>
                                <p className="prop">
                                    <span className="icon fa fa-hourglass" />
                                    <span className="value">1 hour</span>
                                </p>
                            </div>
                        </div>
                        <div className="options">
                            <button className="btn">
                                <span>Attend</span>
                                <span className="icon fa fa-long-arrow-right" />
                            </button>
                        </div>
                    </div>

                    <div className="event-item">
                        <div className="content">
                            <div className="title">NinjaFit Kids</div>
                            <div className="details">
                                <p className="prop">
                                    <span className="icon fa fa-clock-o" />
                                    <span className="value">3:00pm - 4:00pm</span>
                                </p>
                                <p className="prop">
                                    <span className="icon fa fa-hourglass" />
                                    <span className="value">1 hour</span>
                                </p>
                            </div>
                        </div>
                        <div className="options">
                            <button className="btn">
                                <span>Attend</span>
                                <span className="icon fa fa-long-arrow-right" />
                            </button>
                        </div>
                    </div>

                    <div className="event-item">
                        <div className="content">
                            <div className="title">NinjaFit Kids</div>
                            <div className="details">
                                <p className="prop">
                                    <span className="icon fa fa-clock-o" />
                                    <span className="value">4:00pm - 5:00pm</span>
                                </p>
                                <p className="prop">
                                    <span className="icon fa fa-hourglass" />
                                    <span className="value">1 hour</span>
                                </p>
                            </div>
                        </div>
                        <div className="options">
                            <button className="btn">
                                <span>Attend</span>
                                <span className="icon fa fa-long-arrow-right" />
                            </button>
                        </div>
                    </div>

                    <div className="event-item">
                        <div className="content">
                            <div className="title">NinjaFit Kids</div>
                            <div className="details">
                                <p className="prop">
                                    <span className="icon fa fa-clock-o" />
                                    <span className="value">5:00pm - 6:00pm</span>
                                </p>
                                <p className="prop">
                                    <span className="icon fa fa-hourglass" />
                                    <span className="value">1 hour</span>
                                </p>
                            </div>
                        </div>
                        <div className="options">
                            <button className="btn">
                                <span>Attend</span>
                                <span className="icon fa fa-long-arrow-right" />
                            </button>
                        </div>
                    </div>

                    <div className="event-item">
                        <div className="content">
                            <div className="title">Group Training (WOD)</div>
                            <div className="details">
                                <p className="prop">
                                    <span className="icon fa fa-clock-o" />
                                    <span className="value">6:00pm - 7:00pm</span>
                                </p>
                                <p className="prop">
                                    <span className="icon fa fa-hourglass" />
                                    <span className="value">1 hour</span>
                                </p>
                            </div>
                        </div>
                        <div className="options">
                            <button className="btn">
                                <span>Attend</span>
                                <span className="icon fa fa-long-arrow-right" />
                            </button>
                        </div>
                    </div>

                    <div className="event-item">
                        <div className="content">
                            <div className="title">Group Training (WOD)</div>
                            <div className="details">
                                <p className="prop">
                                    <span className="icon fa fa-clock-o" />
                                    <span className="value">7:00pm - 8:00pm</span>
                                </p>
                                <p className="prop">
                                    <span className="icon fa fa-hourglass" />
                                    <span className="value">1 hour</span>
                                </p>
                            </div>
                        </div>
                        <div className="options">
                            <button className="btn">
                                <span>Attend</span>
                                <span className="icon fa fa-long-arrow-right" />
                            </button>
                        </div>
                    </div>
                </div>

                <PageFooter socialLinks={this.props.socialLinks} />
            </div>
        );
    }
}
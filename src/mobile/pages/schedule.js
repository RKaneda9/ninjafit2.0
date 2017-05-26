const Inferno   = require('inferno');
const Component = require('inferno-component');
const utils                    = require('mobile/helpers/utils');
const settings                 = require('mobile/helpers/settings');
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


const views = {
    month: 'month',
    day:   'day'
};

module.exports = class Schedule extends Component {
    constructor(props) {
        super(props);

        this.showTomorrow  = this.showTomorrow .bind(this);
        this.showYesterday = this.showYesterday.bind(this);
        this.showNextMonth = this.showNextMonth.bind(this);
        this.showPrevMonth = this.showPrevMonth.bind(this);
        this.viewDay       = this.viewDay      .bind(this);
        this.viewMonth     = this.viewMonth    .bind(this);

        let date   = new Date();
        let events = this.getEvents(date);

        this.month = this.getMonth(date);

        this.state = {
            date:   date,
            view:   views.day,
            events: events
        };
    }

    componentDidMount() {
        //window.addEventListener('resize', this.onResize);

        //setTimeout(this.onResize);
    }

    componentWillUnmount() {
        //window.removeEventListener('resize', this.onResize);
    }

    getEvents(date) {
        return [
            {
                title:    "Group Training (WOD)",
                start:    "0600",
                end:      "0700",
                duration: "0100"
            },
            {
                title:    "Group Training (WOD)",
                start:    "0700",
                end:      "0800",
                duration: "0100"
            },
            {
                title:    "Group Training (WOD)",
                start:    "0800",
                end:      "0900",
                duration: "0100"
            },
            {
                title:    "Group Training (WOD)",
                start:    "0900",
                end:      "1000",
                duration: "0100"
            },
            {
                title:    "Group Training (WOD)",
                start:    "1000",
                end:      "1100",
                duration: "0100"
            },
            {
                title:    "Group Training (WOD)",
                start:    "1100",
                end:      "1200",
                duration: "0100"
            },
            {
                title:    "Private Events",
                start:    "1200",
                end:      "1300",
                duration: "0100"
            },
            {
                title:    "NinjaFit Kids",
                start:    "1400",
                end:      "1500",
                duration: "0100"
            },
            {
                title:    "NinjaFit Kids",
                start:    "1500",
                end:      "1600",
                duration: "0100"
            },
            {
                title:    "NinjaFit Kids",
                start:    "1600",
                end:      "1700",
                duration: "0100"
            },
            {
                title:    "NinjaFit Kids",
                start:    "1700",
                end:      "1800",
                duration: "0100"
            },
            {
                title:    "Group Training (WOD)",
                start:    "1800",
                end:      "1900",
                duration: "0100"
            },
            {
                title:    "Group Training (WOD)",
                start:    "1900",
                end:      "2000",
                duration: "0100"
            }
        ];
    }

    getMonth(date) {
        if (!date) date = new Date();

        let temp     = date.clone().toStartOfMonth().toStartOfWeek();
        let end      = date.clone()  .toEndOfMonth()  .toEndOfWeek();
        let month    = date.getMonth();
        let todayKey = new Date().getDateKey();
        let days     = [];

        do { 
            days.push({
                diffMonth: temp.getMonth() != month,
                isToday:   temp.getDateKey() == todayKey,
                isOpen:   (settings.gymHours[temp.getDayText().toLowerCase()] || []).length,
                day:       temp
            }); 

        } while ((temp = temp.getTomorrow()) <= end);

        return days;
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

    getTimeText(timekey) {
        let hour = parseInt(timekey.substr(0, 2)),
            min  = parseInt(timekey.substr(2, 4)),
            ampm = hour < 12 ? 'am' : 'pm',
            str;

             if (hour > 12) hour -= 12;
        else if (hour == 0) hour = 12;

        str = hour.toString();

        if (min) str += ':' + min;

        str += ampm;

        return str;
    }

    showNextMonth () {
        let date = this.state.date.clone().toStartOfMonth().addMonths(1);

        this.month = this.getMonth(date);

        this.setState({ date: date });
    }

    showPrevMonth () {
        let date = this.state.date.clone().toStartOfMonth().addMonths(-1);

        this.month = this.getMonth(date);

        this.setState({ date: date });
    }

    showTomorrow () { 
        let date = this.state.date.getTomorrow();

        if (date.getMonth() != this.state.date.getMonth()) {
            this.month = this.getMonth(date);
        }

        this.setState({ date: date }); 
    }

    showYesterday() { 
        let date = this.state.date.getYesterday();

        if (date.getMonth() != this.state.date.getMonth()) {
            this.month = this.getMonth(date);
        }

        this.setState({ date: date }); 
    }

    viewMonth() {
        this.setState({
            view: views.month
        });
    }

    viewDay(day) {
        this.setState({
            date: day.clone(),
            view: views.day
        });
    }

    render() {
        let todayHours = (settings.gymHours[this.state.date.getDayText().toLowerCase()] || []);

        return (
            <div className="page schedule-page">
                <header className="header-bar">
                    <p className="title">Schedule</p>
                    <MenuButton onClick={commands.openMenu.emit} />
                </header>
                
                {this.state.view == views.month ? (

                    <div className="month-view">
                        <div className="date-selector">
                            <div className="row">
                                <button 
                                    onClick={this.showPrevMonth}
                                    className="option-btn fa fa-angle-left" />

                                <div className="details">
                                    <p className="title">{this.state.date.getMonthText() + ', ' + this.state.date.getFullYear()}</p>
                                </div>

                                <button 
                                    onClick={this.showNextMonth}
                                    className="option-btn fa fa-angle-right" />
                            </div>
                        </div>

                        <ul className="calendar">
                            <li className="title">Sun</li>
                            <li className="title">Mon</li>
                            <li className="title">Tue</li>
                            <li className="title">Wed</li>
                            <li className="title">Thu</li>
                            <li className="title">Fri</li>
                            <li className="title">Sat</li>

                            {utils.map(this.month, props => {
                                let className = "day";

                                if (props.isOpen)    { className += ' open';       }
                                if (props.isToday)   { className += ' today';      }
                                if (props.diffMonth) { className += ' diff-month'; }

                                return (
                                    <li 
                                        onClick={() => this.viewDay(props.day)}
                                        className={className}>

                                        <span className="text">{props.day.getDate()}</span>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                ) : (

                    <div className="day-view">
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
                            <div className="title">{todayHours.length ? "Open:" : "Closed Today"}</div>
                            <div className="value">{utils.map(todayHours, span => `${this.getTimeText(span.start)} - ${this.getTimeText(span.end)}`).join(', ')}</div>
                            <button 
                                onClick={this.viewMonth}
                                className="btn">View Month</button>
                        </div>

                        <div className="event-list">

                            {utils.map(this.state.events, event => {

                                return (
                                    <div className="event-item">
                                        <div className="content">
                                            <div className="title">{event.title}</div>
                                            <div className="details">
                                                <p className="prop">
                                                    <span className="icon fa fa-clock-o" />
                                                    <span className="value">{`${this.getTimeText(event.start)} - ${this.getTimeText(event.end)}`}</span>
                                                </p>
                                                <p className="prop">
                                                    <span className="icon fa fa-hourglass" />
                                                    <span className="value">{parseInt(event.end.substr(0,2)) - parseInt(event.start.substr(0,2))} hour</span>
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
                                );
                            })}
                        </div>
                    </div>

                )}

                <div className="weekly-hours">
                    <div className="header">Gym Hours</div>

                    <table className="content">
                        <tbody>
                            {utils.map(settings.gymHours, (hours, day) => {
                                let text = utils.map(hours, span => `${this.getTimeText(span.start)} - ${this.getTimeText(span.end)}`).join(', ');

                                return (
                                    <tr className="day-item">
                                        <td className="title">{day[0].toUpperCase() + day.slice(1)}:</td>
                                        <td className="hours">{text || "Closed"}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
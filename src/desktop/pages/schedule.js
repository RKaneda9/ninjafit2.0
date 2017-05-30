const Inferno     = require('inferno');
const Component   = require('inferno-component');
const constants   = require('helpers/constants');
const utils       = require('helpers/utils');
const settings    = require('helpers/settings');
const PageFooter  = require('desktop/containers/page-footer');
const {commands}  = require('services/event-system');

module.exports = class Schedule extends Component {
    constructor(props) {
        super(props);

        this.showTomorrow  = this.showTomorrow .bind(this);
        this.showYesterday = this.showYesterday.bind(this);
        this.showNextMonth = this.showNextMonth.bind(this);
        this.showPrevMonth = this.showPrevMonth.bind(this);

        let date   = new Date();
        let events = this.getEvents(date);
        this.month = this.getMonth (date); // array of days

        this.state = {
            styles: this.props.styles,
            active: this.props.active,
            date:   date,
            events: events
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps && 
           (nextProps.styles != this.state.styles ||
            nextProps.active != this.state.active)) {

            this.setState({
                styles: nextProps.styles,
                active: nextProps.active
            });
        }
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

    getMonth (date) {
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

    showTomorrow () { this.setState({ date: this.state.date.getTomorrow () }); }
    showYesterday() { this.setState({ date: this.state.date.getYesterday() }); }

    viewDay(day) {
        this.setState({ date: day.clone() });
    }

    render() {
        let todayHours = (settings.gymHours[this.state.date.getDayText().toLowerCase()] || []);

        return (
            <div 
                className={`page schedule-page${this.state.active ? ' curr' : ''}`}
                style={this.state.styles}>
                <section className="landing">
                    <header className="header-bar">
                        <p className="title">Schedule</p>
                        
                        <button
                            onClick={commands.openMenu.emit} 
                            className="menu-btn">
                            <svg className="background" viewBox="0 0 500 577.35">
                                <path filter="url(#ds-s)" d="M500,0v577.35l-500-288.675z" />
                            </svg>
                            <svg className="bars" viewBox="0 0 96 60" stroke-width="12">
                                <path d="M38,6h52" />
                                <path d="M6,30h84" />
                                <path d="M38,54h52" />
                            </svg>
                        </button>
                    </header>
                </section>
                
                <div className="row">
                    <div className="col">
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

                        <section className="weekly-hours">
                            <header className="header">Gym Hours</header>

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
                        </section>
                    </div>

                    <div className="col">
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
                            <div className="title">{todayHours.length ? "Open:" : "Closed Today"}</div>
                            <div className="value">{utils.map(todayHours, span => `${this.getTimeText(span.start)} - ${this.getTimeText(span.end)}`).join(', ')}</div>
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
                </div>

                <PageFooter />
            </div>
        );
    }
}
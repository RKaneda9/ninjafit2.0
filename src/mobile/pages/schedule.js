const Inferno    = require('inferno');
const Component  = require('inferno-component');
const utils      = require('helpers/utils');
const settings   = require('helpers/settings');
const HeaderBar  = require('mobile/components/sections/header-bar');
const PageFooter = require('mobile/containers/page-footer');
const Page       = require('mobile/components/page');
const Loader     = require('shared/components/loaders/content');
const calendar   = require('services/calendar-store');

const {

    Button,
    CloseButton

} = require('mobile/components/buttons');

const views = {
    month: 'month',
    day:   'day'
};

let today        = new Date(), 
    todayMonth   = today.getMonth(),
    todayDateKey = today.getDateKey();

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
        this.month = this.getMonth(date);

        this.state = {
            date:    date,
            view:    views.day,
            events:  this.getEvents(date),
            loading: true
        };
    }

    getEvents(date) {
        calendar.fetch(date.getDateKey())
            .then(day => {
                this.setState({
                    events:  day.events,
                    loading: false
                });
            });

        return [];
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
                isOpen: (settings.gymHours[temp.getDayText().toLowerCase()] || []).length,
                day:     temp,
                dateKey: temp.getDateKey()
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

    showTomorrow () { this.viewDay(this.state.date.getTomorrow ()); }
    showYesterday() { this.viewDay(this.state.date.getYesterday()); }

    viewMonth() {
        this.setState({
            view: views.month
        });
    }

    viewDay(date) {
        if (date.getMonth() != this.state.date.getMonth) this.month = this.getMonth(date);

        this.setState({
            date:    date.clone(),
            view:    views.day,
            events:  this.getEvents(date),
            loading: true
        });
    }

    render() {
        let todayHours      = (settings.gymHours[this.state.date.getDayText().toLowerCase()] || []),
            selectedDateKey = this.state.date.getDateKey(),
            selectedMonth   = this.state.date.getMonth();

        return (
            <Page name="schedule">
                <HeaderBar title="Schedule"></HeaderBar>
                
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

                                if (props.dateKey        == selectedDateKey) { className += ' selected';   }
                                if (props.dateKey        == todayDateKey)    { className += ' today';      }
                                if (props.day.getMonth() != selectedMonth)   { className += ' diff-month'; }
                                if (props.isOpen)                            { className += ' open';       }

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

                            <Loader 
                                show={this.state.loading}
                                text="Retrieving events..." />
                        </div>
                    </div>

                )}

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
            </Page>
        );
    }
}
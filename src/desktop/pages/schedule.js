const Inferno        = require('inferno');
const Component      = require('inferno-component');
const constants      = require('helpers/constants');
const utils          = require('helpers/utils');
const settings       = require('helpers/settings');
const PageFooter     = require('desktop/containers/page-footer');
const Page           = require('desktop/components/page');
const HeaderBar      = require('desktop/components/sections/header-section');
const Hours          = require('shared/components/sections/hours');
const Selector       = require('shared/components/calendar/date-selector');
const Loader         = require('shared/components/loaders/content');
const ClockIcon      = require('shared/components/icons/clock');
const HourGlassIcon  = require('shared/components/icons/hourglass');
const ArrowRightIcon = require('shared/components/icons/arrow-long-right');
const Section        = require('shared/components/section').Section;
const calendar       = require('services/calendar-store');

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

        let date    = new Date();
        this.month  = this.getMonth(date);

        this.state = { 
            date:    date,
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

    getMonth(date) {
        if (!date) date = new Date();

        let temp  = date.clone().toStartOfMonth().toStartOfWeek();
        let end   = date.clone()  .toEndOfMonth()  .toEndOfWeek();
        let days  = [];

        do { 
            days.push({
                isOpen:    (settings.hours[temp.getDayText().toLowerCase()] || []).length,
                day:        temp,
                dateKey:    temp.getDateKey()
            }); 

        } while ((temp = temp.getTomorrow()) <= end);

        return days;
    }

    changeToDate(date) {
        if (date.getMonth() != this.state.date.getMonth()) this.month = this.getMonth(date);

        this.setState({ date: date });
    }

    showNextMonth() { this.changeToDate(this.state.date.clone().toStartOfMonth().addMonths( 1)); }
    showPrevMonth() { this.changeToDate(this.state.date.clone().toStartOfMonth().addMonths(-1)); }
    showTomorrow () { this.changeToDate(this.state.date.getTomorrow ()); }
    showYesterday() { this.changeToDate(this.state.date.getYesterday()); }

    viewDay(day) { this.changeToDate(day.clone()); }

    render() {
        let todayHours = (settings.hours[this.state.date.getDayText().toLowerCase()] || []),
            selectedDateKey = this.state.date.getDateKey(),
            selectedMonth   = this.state.date.getMonth();

        return (
            <Page {...this.props} name={constants.pages.schedule}>
                <HeaderBar title="Schedule" />
                
                <div className="row">
                    <div className="col">
                        <div className="month-view">
                            
                            <Selector 
                                onPrev={this.showPrevMonth}
                                onNext={this.showNextMonth}
                                title={this.state.date.getMonthText() + ', ' + this.state.date.getFullYear()} />

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

                        <Hours />
                    </div>

                    <div className="col">
                        <Selector 
                            onPrev={this.showYesterday}
                            onNext={this.showTomorrow}
                            title={this.state.date.getDayText()}
                            subTitle={`${this.state.date.getMonthText()} ${this.state.date.getDateText()}, ${this.state.date.getFullYear()}`} />

                        <div className="calendar-separator">
                            <div className="title">{todayHours.length ? "Open:" : "Closed Today"}</div>
                            <div className="value">{utils.map(todayHours, span => `${utils.getTimeText(span.start)} - ${utils.getTimeText(span.end)}`).join(', ')}</div>
                        </div>

                        <div className="event-list">

                            {utils.map(this.state.events, event => {

                                return (
                                    <div className="event-item">
                                        <div className="content">
                                            <div className="title">{event.title}</div>
                                            <div className="details">
                                                <p className="prop">
                                                    <ClockIcon />
                                                    <span className="value">{`${utils.getTimeText(event.start)} - ${utils.getTimeText(event.end)}`}</span>
                                                </p>
                                                <p className="prop">
                                                    <HourGlassIcon />
                                                    <span className="value">{parseInt(event.end.substr(0,2)) - parseInt(event.start.substr(0,2))} hour</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="options">
                                            <button className="btn">
                                                <span>Attend</span>
                                                <ArrowRightIcon />
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
                </div>

                <PageFooter />
            </Page>
        );
    }
}
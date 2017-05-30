const Inferno     = require('inferno');
const Component   = require('inferno-component');
const constants   = require('helpers/constants');
const utils       = require('helpers/utils');
const settings    = require('helpers/settings');
const PageFooter  = require('desktop/containers/page-footer');
const {commands}  = require('services/event-system');

module.exports = class WOD extends Component {
    constructor(props) {
        super(props);

        this.showTomorrow  = this.showTomorrow .bind(this);
        this.showYesterday = this.showYesterday.bind(this);


        this.state = {
            styles: this.props.styles,
            active: this.props.active,
            date:   new Date()
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

    showTomorrow () { this.setState({ date: this.state.date.getTomorrow () }); }
    showYesterday() { this.setState({ date: this.state.date.getYesterday() }); }

    render() {
        return (
            <div 
                className={`page wod-page${this.state.active ? ' curr' : ''}`}
                style={this.state.styles}>
                <section className="landing">
                    <header className="header-bar">
                        <p className="title">WOD</p>
                        
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
                </section>

                <PageFooter />
            </div>
        );
    }
}
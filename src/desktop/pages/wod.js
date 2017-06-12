const Inferno     = require('inferno');
const Component   = require('inferno-component');
const constants   = require('helpers/constants');
const utils       = require('helpers/utils');
const settings    = require('helpers/settings');
const HeaderBar   = require('desktop/components/sections/header-section');
const PageFooter  = require('desktop/containers/page-footer');
const Page        = require('desktop/components/page');
const Selector    = require('shared/components/calendar/date-selector');
const Loader      = require('shared/components/loaders/content');
const Section     = require('shared/components/section').Section;
const wods        = require('services/wod-store');

module.exports = class WOD extends Component {
    constructor(props) {
        super(props);

        this.showTomorrow  = this.showTomorrow .bind(this);
        this.showYesterday = this.showYesterday.bind(this);

        let date = new Date();

        this.state = { 
            date:     date,
            workouts: this.getWorkouts(date),
            loading:  true
        };
    }

    getWorkouts(date) {
        wods.fetch(date.getDateKey())
            .then(wod => {
                this.setState({
                    workouts: wod.workouts,
                    loading:  false
                });
            });

        return [];
    }

    changeDay(date) {
        this.setState({
            workouts: this.getWorkouts(date),
            date:     date,
            loading:  true
        });
    }

    showTomorrow () { this.changeDay(this.state.date.getTomorrow ()); }
    showYesterday() { this.changeDay(this.state.date.getYesterday()); }

    render() {
        return (
            <Page {...this.props} name={constants.pages.wod}>
                <HeaderBar title="WOD" />

                <Section name="wod">
                    <Selector 
                        onPrev={this.showYesterday}
                        onNext={this.showTomorrow}
                        title={this.state.date.getDayText()}
                        subTitle={`${this.state.date.getMonthText()} ${this.state.date.getDateText()}, ${this.state.date.getFullYear()}`} />

                    <div className="calendar-separator">
                        <span className="title">
                            {this.state.loading ? '' : `${this.state.workouts.length} Workouts Found`}
                        </span>
                    </div>
                    <div className="event-list">
                        {utils.map(this.state.workouts, workout => (
                            <div className="event-item">
                                <div className="title">{workout.title}</div>
                                <div className="sub-title">{workout.subtitle}</div>
                                <div className="content">
                                    {utils.map(workout.contents, prop => 
                                        <p>{prop}</p>
                                    )}
                                </div>
                            </div>
                        ))}

                        <Loader 
                            show={this.state.loading}
                            text="Retrieving your workouts..." />
                    </div>
                </Section>

                <PageFooter />
            </Page>
        );
    }
}
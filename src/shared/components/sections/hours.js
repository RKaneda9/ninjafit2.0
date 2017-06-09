const Inferno  = require('inferno');
const settings = require('helpers/settings').hours;
const utils    = require('helpers/utils');

module.exports = () => (
    <section className="weekly-hours">
        <header className="header">Gym Hours</header>

        <table className="content">
            <tbody>
                {utils.map(settings, (hours, day) => {
                    let text = utils.map(hours, span => `${utils.getTimeText(span.start)} - ${utils.getTimeText(span.end)}`).join(', ');

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
);
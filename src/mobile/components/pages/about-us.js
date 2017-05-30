const Inferno = require('inferno');
const utils   = require('helpers/utils');

export const LandingSection = ({ }) => (
    <section className="landing">
        <header className="header-bar">
            <p className="title">About Us</p>

            <MenuButton onClick={onOpenMenu} />
        </header>

        <div className="header">What is NinjaFit Gym?</div>

        <div className="content">
            {utils.map(contentText.split('\n'), (piece, i) => (
                <p key={i}>{piece}</p>
            ))}
        </div>
    </section>
);
const Inferno    = require('inferno');
const utils      = require('helpers/utils');
const pages      = require('helpers/constants').pages;
const {commands} = require('services/event-system');
const settings   = require('helpers/settings');
const SocialIcons = require('shared/components/icons/social');

// TODO: don't show current page
module.exports = () => (
    <footer className="page-footer">
        <div className="logo">
            <div className="title">NinjaFit Gym</div>
            <div className="copyright">NinjaFit Gym © 2017</div>
        </div>

        <div className="nav">
            <div className="title">Menu</div>

            <a className="link" onClick={() => commands.redirect.emit(pages.home)}>
                <span className="text">Home</span>
            </a>

            <a className="link" onClick={() => commands.redirect.emit(pages.aboutUs)}>
                <span className="text">About Us</span>
            </a>

            <a className="link" onClick={() => commands.redirect.emit(pages.whatWeOffer)}>
                <span className="text">What We Offer</span>
            </a>

            <a className="link" onClick={() => commands.redirect.emit(pages.schedule)}>
                <span className="text">Schedule</span>
            </a>

            <a className="link" onClick={() => commands.redirect.emit(pages.wod)}>
                <span className="text">WOD</span>
            </a>

            <a className="link" onClick={() => commands.redirect.emit(pages.contact)}>
                <span className="text">Contact</span>
            </a>
        </div>

        <div className="nav">
            <div className="title">Get Started</div>

            <a className="link" onClick={() => commands.redirect.emit(pages.joinUs)}>
                <span className="text">Join Us</span>
            </a>

            <a className="link" onClick={() => commands.redirect.emit(pages.login)}>
                <span className="text">Login</span>
            </a>
        </div>

        <div className="nav">
            <div className="title">Connect With Us</div>

            {utils.map(settings.social, (href, type) => {
                let Icon = SocialIcons[type.toLowerCase()];

                return (
                    <a className="link" target="nfg-social" href={href}>
                        <Icon />
                        <span className="text">{type}</span>
                    </a>
                );
            })}
        </div>
    </footer>
);
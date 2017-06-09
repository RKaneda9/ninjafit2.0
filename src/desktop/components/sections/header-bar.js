const Inferno    = require('inferno');
const MenuButton = require('desktop/components/buttons').MenuButton;
const LogoIcon   = require('shared/components/icons/logo');
const commands   = require('services/event-system').commands;

module.exports = ({ title, logo }) => (
    <header className="header-bar">

        {logo ? (
            <div className="logo">
                <LogoIcon />

                <div className="logo-text">
                    <div className="word">Ninja</div>
                    <div className="word">Fit</div>
                    <div className="word">Gym</div>
                </div>
            </div>
        ) : null}

        <p className="title">{title || ""}</p>
        
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
);
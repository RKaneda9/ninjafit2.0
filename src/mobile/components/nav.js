const Inferno       = require('inferno');
const {CloseButton} = require('mobile/components/buttons');

export const Menu = ({ onClose, opened, children }) => (
    <div className={`app-menu${opened ? ' open' : ''}`}>

        <CloseButton onClick={onClose} />

        <div className="background">
            <div className="portion" />
            <div className="portion" />
            <div className="portion" />
        </div>

        <div className="content">
            {children}
        </div>
    </div>
);

export const Footer = ({ onClose, opened, children }) => (
    <footer className="app-footer">

        <div className="logo">
            <div className="title">NinjaFit Gym</div>
            <div className="copyright">NinjaFit Gym © 2017</div>
        </div>

        {children}
    </footer>
);

export const NavTitle = ({ children }) => (
    <div className="title">{children}</div>
);

export const MenuLinks = ({ children }) => (
    <nav className="nav">{children}</nav>
);

export const SocialLinks = ({ children }) => (
    <nav className="social">{children}</nav>
);

export const MenuLink = ({ selected, children, onClick }) => (
    <a onClick={onClick} className={`link${selected ? " selected": ""}`}>{children}</a>
);

export const SocialLink = ({ href, children }) => (
    <a target="nfg-social" href={href} className="link">
        <div className="social-item">{children}</div>
    </a>
);

export const Text = ({ children }) => (
    <span className="text">{children}</span>
);
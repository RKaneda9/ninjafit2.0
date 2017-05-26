const Inferno = require('inferno');

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
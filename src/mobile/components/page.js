const Inferno = require('inferno');

export const Page = ({ children, name }) => (
    <div className={`page ${name}-page`}>{children}</div>
);

export const Section = ({ className, children }) => (
    <section className={className}>{children}</section>
);

export const Header  = ({ children }) => (<header className="header">{children}</header>);
export const Content = ({ children }) => (<div className="content">{children}</div>);
export const Footer  = ({ children }) => (<footer className="footer">{children}</footer>);

export const ImageWrapper = ({ children }) => (<div className="image-wrapper">{children}</div>);

export const Image = ({ url, pos }) => (
    <div 
        className={`image${pos ? ` ${pos}` : ""}`} 
        style={{ backgroundImage: `url("${url}` }} />
);
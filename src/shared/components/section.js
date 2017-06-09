const Inferno = require('inferno');
const utils   = require('helpers/utils');

export const Section = ({ name, children }) => (<section className={name}>{children}</section>);
export const Header  = ({ text           }) => (<header className="header">{text}</header>);
export const Footer  = ({ children       }) => (<footer className="footer">{children}</footer>);

export const Image = ({ url }) => (
    <div 
        style={{ backgroundImage: url ? `url("${url}")` : '' }}
        className="image" />
);

export const Content = ({ text }) => (
    <div className="content">
        {utils.map((text || "").split('\n'), piece => 
            <p>{piece}</p>
        )}
    </div>
);
const Inferno       = require('inferno');
const {CloseButton} = require('mobile/components/buttons');

export const App  = ({ children, offset, scrolling }) => {

    let className = "app mobile", 
        styles    = null;

    if (scrolling) className += ' scrolling';
    if (offset)    styles = { transform: `translateY(-${offset}px)` };

    return (<div className={className} style={styles}>{children}</div>);
};

export const Defs = () => (
    <svg className="defs" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <filter id="ds-s" height="150%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="25" />
                <feMerge>
                    <feMergeNode />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>

            <filter id="ds-m" height="150%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="15" />
                <feMerge>
                    <feMergeNode />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>

            <filter id="ds-l" height="150%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="5" />
                <feMerge>
                    <feMergeNode />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
        </defs>
    </svg>
);

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
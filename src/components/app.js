const Inferno       = require('inferno');
const {CloseButton} = require('components/buttons');

export const App  = ({ children }) => (<div className="app">{children}</div>);
export const Defs = () => (
    <svg className="defs" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <filter id="dropshadow-small" height="150%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="25" />
                <feMerge>
                    <feMergeNode />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>

            <filter id="dropshadow-medium" height="150%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="15" />
                <feMerge>
                    <feMergeNode />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>


            <filter id="dropshadow-large" height="150%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="5" />
                <feMerge>
                    <feMergeNode />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>

            <linearGradient id="grad-2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop stopColor="#7c2db9" stopOpacity="1" offset="0%" />
                <stop stopColor="#6e448e" stopOpacity="1" offset="100%" />
            </linearGradient>

            <clipPath id="image-slider-clip" clipPathUnits="objectBoundingBox">
                <polygon />
            </clipPath>

            <clipPath id="map-clip" clipPathUnits="objectBoundingBox">
                <polygon />
            </clipPath>
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
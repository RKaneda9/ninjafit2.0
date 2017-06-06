const Inferno = require('inferno');

const Defs = () => (
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

module.exports = ({ children, offset, scrolling }) => {

    let className = "app mobile", 
        styles    = null;

    if (scrolling) className += ' scrolling';
    if (offset)    styles = { transform: `translateY(-${offset}px)` };

    return (
        <div className={className} style={styles}>
            <Defs />

            {children}
        </div>
    );
};
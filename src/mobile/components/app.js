const Inferno = require('inferno');

module.exports = ({ children, offset, scrolling }) => {

    let className = "app mobile", 
        styles    = null;

    if (scrolling) className += ' scrolling';
    if (offset)    styles = { transform: `translateY(-${offset}px)` };

    return (
        <div className={className} style={styles}>
            {children}
        </div>
    );
};
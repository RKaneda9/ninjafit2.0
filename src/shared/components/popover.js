const Inferno = require('inferno');

module.exports = ({ pos, align, show, text, level }) => {
    let className = `popover ${level || "error"} ${pos || "above"} ${align || "left"}`;

    if (show) className += ' show';

    return (
        <div className={className}>{text}</div>
    );
}
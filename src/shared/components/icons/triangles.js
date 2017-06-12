const Inferno = require('inferno');

const Triangle = ({ width, height, d, size, position }) => (
    <svg className={`icon ${position ? (' ' + position) : ""}`} viewBox={`0 0 ${width || 500} ${height || 577.35}`}>
        <path 
            filter={`url(#ds-${size ? size.substr(0, 1) : "l"})`}
            d={d} />
    </svg>
);

export const TriangleLeft      = props => <Triangle {...props} d="M500,0v577.35l-500-288.675z" />;
export const TriangleRight     = props => <Triangle {...props} d="M0,0l500,288.675l-500,288.675z" />;
export const TriangleUpLeft    = props => <Triangle {...props} height={288.675} d="M500,0v288.675h-500z" />;
export const TriangleUpRight   = props => <Triangle {...props} height={288.675} d="M0,0v288.675h500z" />;
export const TriangleDownLeft  = props => <Triangle {...props} height={288.675} d="M0,0l500,0v288.675z" />;
export const TriangleDownRight = props => <Triangle {...props} height={288.675} d="M0,0h500l-500,288.675z" />;
export const TriangleDown      = props => <Triangle {...props} height={144.38} d="M0,0h500l-250,144.38z" />;
export const TriangleUp        = props => <Triangle {...props} height={144.38} d="M250,0l250,144.38h-500z" />;
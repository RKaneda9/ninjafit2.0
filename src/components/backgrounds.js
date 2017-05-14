const Inferno = require('inferno');
const utils   = require('helpers/utils');

const Triangle = ({ width, height, d, size, className }) => (
    <svg className={className} viewBox={`0 0 ${width || 500} ${height || 577.35}`}>
        <path 
            filter={`url(#dropshadow-${size || "large"})`}
            d={d} />
    </svg>
);

export const Background = ({ children }) => (
    <div className="background">{children}</div>
);

export const TriangleLeft = props => (
    <Triangle {...props} d="M500,0 L500,577.35 L0,288.675 Z" />
);

export const TriangleRight = props => (
    <Triangle {...props} d="M0,0 L500,288.675 L0,577.35 Z" />
);

export const TriangleUpLeft = props => (
    <Triangle {...props} height={288.675} d="M500,0 L500,288.675 L0,288.675 Z" />
);

export const TriangleUpRight = props => (
    <Triangle {...props} height={288.675} d="M0,0 L500,288.675 L0,288.675 Z" />
);

export const TriangleDownLeft = props => (
    <Triangle {...props} height={288.675} d="M0,0 500,0 500,288.675" />
);

export const TriangleDownRight = props => (
    <Triangle {...props} height={288.675} d="M0,0 L500,0 L0,288.675 Z" />
);

export const TriangleDown = props => (
    <Triangle {...props} height={144.38} d="M0,0 L500,0 L250,144.38 Z" />
);

export const TriangleUp = props => (
    <Triangle {...props} height={144.38} d="M0,144.38 L250,0 L500,144.38 Z" />
);
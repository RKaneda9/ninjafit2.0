const Inferno = require('inferno');

export const HexHalfLeft = () => (
    <div className="background left">
        <svg className="icon" viewBox="0 0 250 788.675">
            <path filter="url(#ds-l)" d="M0,0l250,144.3377v500l-250,144.3377z" />
        </svg>
    </div>
);

export const HexHalfRight = () => (
    <div className="background right">
        <svg className="icon" viewBox="0 0 250 788.675">
            <path filter="url(#ds-l)" d="M250,0l-250,144.3377v500l250,144.3377z" />
        </svg>
    </div>
);

export const Hex = () => (
    <svg className="background" viewBox="0 0 1000 1077.35">
        <path 
            filter="url(#ds-l)" 
            d="M500,0l500,288.675v500l-500,288.675l-500-288.675v-500z" />
    </svg>
);
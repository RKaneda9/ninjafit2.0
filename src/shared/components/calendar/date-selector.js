const Inferno        = require('inferno');
const OptionButton   = require('shared/components/buttons').OptionButton
const AngleLeftIcon  = require('shared/components/icons/angle-left');
const AngleRightIcon = require('shared/components/icons/angle-right');

module.exports = ({ onPrev, onNext, title, subTitle}) => (
    <div className="date-selector">
        <div className="row">

            <OptionButton onClick={onPrev}>
                <AngleLeftIcon />
            </OptionButton>

            <div className="details">
                <p className="title">{title}</p>
                {subTitle ? (<p className="sub">{subTitle}</p>) : null}
            </div>

            <OptionButton onClick={onNext}>
                <AngleRightIcon />
            </OptionButton>
        </div>
    </div>
);
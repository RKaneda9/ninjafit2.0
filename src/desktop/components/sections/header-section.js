const Inferno   = require('inferno');
const Section   = require('shared/components/section').Section;
const HeaderBar = require('./header-bar');

module.exports = props => (
    <Section name="header">
        <HeaderBar {...props} />
    </Section>
);
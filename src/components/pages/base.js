const Inferno = require('inferno');

export const Page = ({ children, name }) => (
    <div className={`page ${name}-page`}>{children}</div>
);
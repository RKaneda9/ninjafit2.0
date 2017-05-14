const Inferno    = require('inferno');
const utils      = require('helpers/utils');
const pages      = require('helpers/constants').pages;
const {commands} = require('services/event-system');
const {Menu}     = require('components/app');
const {
    
    MenuLinks,
    MenuLink,
    Text,
    SocialLinks,
    SocialLink

} = require('components/nav');

module.exports = ({ opened, socialLinks }) => (
    <Menu
        opened={opened}
        onClose={commands.closeMenu.emit}>

        <MenuLinks>
            <MenuLink onClick={() => commands.redirect.emit(pages.home)}>
                <span className="fa fa-home"></span>
                <Text>Home</Text>
            </MenuLink>

            <MenuLink onClick={() => commands.redirect.emit(pages.aboutUs)}>
                <span className="fa fa-users"></span>
                <Text>About Us</Text>
            </MenuLink>

            <MenuLink onClick={() => commands.redirect.emit(pages.whatWeOffer)}>
                <span className="fa fa-building"></span>
                <Text>What We Offer</Text>
            </MenuLink>

            <MenuLink onClick={() => commands.redirect.emit(pages.schedule)}>
                <span className="fa fa-calendar"></span>
                <Text>Schedule</Text>
            </MenuLink>

            <MenuLink onClick={() => commands.redirect.emit(pages.wod)}>
                <span className="fa fa-calendar"></span>
                <Text>WOD</Text>
            </MenuLink>

            <MenuLink onClick={() => commands.redirect.emit(pages.contact)}>
                <span className="fa fa-envelope"></span>
                <Text>Contact</Text>
            </MenuLink>

            <MenuLink onClick={() => commands.redirect.emit(pages.joinUs)}>
                <span className="fa fa-money"></span>
                <Text>Join Us</Text>
            </MenuLink>

            <MenuLink onClick={() => commands.redirect.emit(pages.login)}>
                <span className="fa fa-sign-in"></span>
                <Text>Login</Text>
            </MenuLink>
        </MenuLinks>

        <SocialLinks>
            {utils.map(socialLinks, (href, type, i) => 
                <SocialLink key={type} href={href}>
                    <span className={`fa fa-${type.toLowerCase()}`} />
                </SocialLink>
            )}
        </SocialLinks>
    </Menu>
);
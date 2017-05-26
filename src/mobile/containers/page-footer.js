const Inferno    = require('inferno');
const utils      = require('mobile/helpers/utils');
const pages      = require('mobile/helpers/constants').pages;
const {commands} = require('mobile/services/event-system');
const {Footer}   = require('mobile/components/app');
const {
    
    NavTitle,
    MenuLinks,
    MenuLink,
    Text,
    SocialLinks,
    SocialLink

} = require('mobile/components/nav');

const PageFooter = module.exports = ({ onRedirect, socialLinks }) => (
    <Footer>
        <MenuLinks>
            <NavTitle>Menu</NavTitle>

            <MenuLink onClick={() => commands.redirect.emit(pages.home)}>
                <Text>Home</Text>
            </MenuLink>
            <MenuLink onClick={() => commands.redirect.emit(pages.aboutUs)}>
                <Text>About Us</Text>
            </MenuLink>
            <MenuLink onClick={() => commands.redirect.emit(pages.whatWeOffer)}>
                <Text>What We Offer</Text>
            </MenuLink>
            <MenuLink onClick={() => commands.redirect.emit(pages.schedule)}>
                <Text>Schedule</Text>
            </MenuLink>
            <MenuLink onClick={() => commands.redirect.emit(pages.wod)}>
                <Text>WOD</Text>
            </MenuLink>
            <MenuLink onClick={() => commands.redirect.emit(pages.contact)}>
                <Text>Contact</Text>
            </MenuLink>
        </MenuLinks>

        <MenuLinks>
            <NavTitle>Get Started</NavTitle>

            <MenuLink onClick={() => commands.redirect.emit(pages.joinUs)}>
                <Text>Join Us</Text>
            </MenuLink>
            <MenuLink onClick={() => commands.redirect.emit(pages.login)}>
                <Text>Login</Text>
            </MenuLink>
        </MenuLinks>

        <MenuLinks>
            <NavTitle>Connect With Us</NavTitle>

            {utils.map(socialLinks, (href, type, i) => 
                <SocialLink key={type} href={href}>
                    <span className={`fa fa-${type.toLowerCase()}`} />
                    <Text>{type}</Text>
                </SocialLink>
            )}
        </MenuLinks>
    </Footer>
);
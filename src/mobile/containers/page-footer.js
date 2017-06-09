const Inferno     = require('inferno');
const utils       = require('helpers/utils');
const pages       = require('helpers/constants').pages;
const commands    = require('services/event-system').commands;
const social      = require('helpers/settings').social;
const SocialIcons = require('shared/components/icons/social');
const {
    
    Footer,
    NavTitle,
    MenuLinks,
    MenuLink,
    Text,
    SocialLinks,
    SocialLink

} = require('mobile/components/nav');

const PageFooter = module.exports = () => (
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

            {utils.map(social, (href, type) => {
                let Icon = SocialIcons[type.toLowerCase()];

                return (
                    <SocialLink href={href}>
                        <Icon />
                        <Text>{type}</Text>
                    </SocialLink>
                );
            })}
        </MenuLinks>
    </Footer>
);
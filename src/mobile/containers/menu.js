const Inferno  = require('inferno');
const utils    = require('helpers/utils');
const pages    = require('helpers/constants').pages;
const commands = require('services/event-system').commands;
const {
    
    Menu,
    MenuLinks,
    MenuLink,
    Text,
    SocialLinks,
    SocialLink

} = require('mobile/components/nav');

module.exports = ({ opened, page, socialLinks }) => (
    <Menu
        opened={opened}
        onClose={commands.closeMenu.emit}>

        <MenuLinks>
            <MenuLink selected={page == pages.home} onClick={() => commands.redirect.emit(pages.home)}>
                <span className="fa fa-home"></span>
                <Text>Home</Text>
            </MenuLink>

            <MenuLink selected={page == pages.aboutUs} onClick={() => commands.redirect.emit(pages.aboutUs)}>
                <span className="fa fa-users"></span>
                <Text>About Us</Text>
            </MenuLink>

            <MenuLink selected={page == pages.whatWeOffer} onClick={() => commands.redirect.emit(pages.whatWeOffer)}>
                <span className="fa fa-building"></span>
                <Text>What We Offer</Text>
            </MenuLink>

            <MenuLink selected={page == pages.schedule} onClick={() => commands.redirect.emit(pages.schedule)}>
                <span className="fa fa-calendar"></span>
                <Text>Schedule</Text>
            </MenuLink>

            <MenuLink selected={page == pages.wod} onClick={() => commands.redirect.emit(pages.wod)}>
                <span className="fa fa-heartbeat"></span>
                <Text>WOD</Text>
            </MenuLink>

            <MenuLink selected={page == pages.contact} onClick={() => commands.redirect.emit(pages.contact)}>
                <span className="fa fa-envelope"></span>
                <Text>Contact</Text>
            </MenuLink>

            <MenuLink selected={page == pages.joinUs} onClick={() => commands.redirect.emit(pages.joinUs)}>
                <span className="fa fa-thumbs-up"></span>
                <Text>Join Us</Text>
            </MenuLink>

            <MenuLink selected={page == pages.login} onClick={() => commands.redirect.emit(pages.login)}>
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
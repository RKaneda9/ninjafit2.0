const Inferno  = require('inferno');
const utils    = require('helpers/utils');
const settings = require('helpers/settings');
const pages    = require('helpers/constants').pages;
const commands = require('services/event-system').commands;

const HomeIcon       = require('shared/components/icons/home');
const KettlebellIcon = require('shared/components/icons/kettlebell');
const CalendarIcon   = require('shared/components/icons/calendar');
const HeartbeatIcon  = require('shared/components/icons/heartbeat');
const ThumbsUpIcon   = require('shared/components/icons/thumbs-up');
const RunningIcon    = require('shared/components/icons/running');
const EnvelopeIcon   = require('shared/components/icons/envelope');
const LoginIcon      = require('shared/components/icons/sign-in');
const SocialIcons    = require('shared/components/icons/social');

const {
    
    Menu,
    MenuLinks,
    MenuLink,
    Text,
    SocialLinks,
    SocialLink

} = require('mobile/components/nav');

module.exports = ({ opened, page }) => (
    <Menu
        opened={opened}
        onClose={commands.closeMenu.emit}>

        <MenuLinks>
            <MenuLink selected={page == pages.home} onClick={() => commands.redirect.emit(pages.home)}>
                <HomeIcon />
                <Text>Home</Text>
            </MenuLink>

            <MenuLink selected={page == pages.aboutUs} onClick={() => commands.redirect.emit(pages.aboutUs)}>
                <RunningIcon />
                <Text>About Us</Text>
            </MenuLink>

            <MenuLink selected={page == pages.whatWeOffer} onClick={() => commands.redirect.emit(pages.whatWeOffer)}>
                <KettlebellIcon />
                <Text>What We Offer</Text>
            </MenuLink>

            <MenuLink selected={page == pages.schedule} onClick={() => commands.redirect.emit(pages.schedule)}>
                <CalendarIcon />
                <Text>Schedule</Text>
            </MenuLink>

            <MenuLink selected={page == pages.wod} onClick={() => commands.redirect.emit(pages.wod)}>
                <HeartbeatIcon />
                <Text>WOD</Text>
            </MenuLink>

            <MenuLink selected={page == pages.contact} onClick={() => commands.redirect.emit(pages.contact)}>
                <EnvelopeIcon />
                <Text>Contact</Text>
            </MenuLink>

            <MenuLink selected={page == pages.joinUs} onClick={() => commands.redirect.emit(pages.joinUs)}>
                <ThumbsUpIcon />
                <Text>Join Us</Text>
            </MenuLink>

            <MenuLink selected={page == pages.login} onClick={() => commands.redirect.emit(pages.login)}>
                <LoginIcon />
                <Text>Login</Text>
            </MenuLink>
        </MenuLinks>

        <SocialLinks>
            {utils.map(settings.social, (href, type) => {
                let Icon = SocialIcons[type.toLowerCase()];

                return (
                    <SocialLink href={href}>
                        <Icon />
                    </SocialLink>
                );
            })}
        </SocialLinks>
    </Menu>
);
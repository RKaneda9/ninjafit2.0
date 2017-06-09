const Inferno   = require('inferno');
const utils     = require('helpers/utils');
const settings  = require('helpers/settings');
const constants = require('desktop/helpers/constants');
const pages     = require('helpers/constants').pages;
const commands  = require('services/event-system').commands;

const CloseButton = require('desktop/components/buttons').CloseButton;
const SocialIcons = require('shared/components/icons/social');

module.exports = ({ menuOpen, focusedPage, onSelectPage, onFocusPage }) => {

    let className = "app-menu";

    if (menuOpen) className += ' open';

    let menuLinks = utils.map(constants.menuOrder, name => {
        return (
            <div
                active={focusedPage == name ? true : undefined}
                onClick={e => onSelectPage(name)}
                onMouseOver={e => onFocusPage(name)}
                className="link">{constants.pageTitles[name]}</div>
        );
    });

    // if menu links is not a multiple of 3
    if (menuLinks.length % 3) {

        // put a link in the 2nd to last slot. 
        //
        // if there are 7/9 links, for example, this will put the link in the 7th slot, 
        // pushing the last link to the 8th (the 9th link will be added next which will 
        // center the last link).
        //
        // if there are 8/9 links, for example, this will put the link in the 8th slot,
        // so that the last two links will be surrounding the empty link 
        menuLinks.splice(menuLinks.length - 1, 0, <div className="link empty" />);

        // if the links are still missing one to be even, add another empty link in the
        // last slot.
        if (menuLinks.length % 3) menuLinks.push(<div className="link empty" />)
    }

    return (
        <div className={className}>
            <div className="option"></div>
            <div className="menu">
                <div className="links">{menuLinks}</div>
                <div className="social">
                    {utils.map(settings.social, (href, type) => {
                        let Icon = SocialIcons[type.toLowerCase()];

                        return (
                            <a 
                                className="link"
                                target="nfg-social" 
                                href={href} 
                                type={type.toLowerCase()}>
                                
                                <div className="item">
                                    <Icon />
                                </div>
                            </a>
                        );
                    })}
                </div>
            </div>
            <div className="option">
                <CloseButton onClick={commands.closeMenu.emit} />
            </div>
        </div>
    );
};
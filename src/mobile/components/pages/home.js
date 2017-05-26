const Inferno = require('inferno');
const utils   = require('mobile/helpers/utils');

const { Background, TriangleRight, TriangleLeft, TriangleDown, TriangleUpRight, TriangleUpLeft, MiddleConnector } = require('components/backgrounds');
const { MenuButton, ScrollDownButton, Button, IconButton                                                        } = require('components/buttons');
const { Page, Section, Header, Content, Footer, ImageWrapper, Image                                             } = require('components/page');
const { Quote, Quotes, Popup                                                                                           } = require('components/general');

export const Container = ({ children }) => (<Page name="home">{children}</Page>);

export const LandingSection = ({ onHeaderRef, onOpenMenu, onScrollDown, sliderStyles, wrapperStyles, images, imageIndex }) => (
    <Section className="landing">
        <header ref={onHeaderRef} className="header">
            <p className="main">NinjaFit</p>
            <p className="sub">Gym</p>

            <MenuButton onClick={onOpenMenu} />
        </header>

        <div style={sliderStyles} className="image-slider">
            <div className="image-wrapper" style={wrapperStyles}>
                {utils.map(images, (image, i) => {
                    let pos;

                         if (i == imageIndex)                                         { pos = 'curr'; }
                    else if (i == utils.getListOffset(imageIndex, -1, images.length)) { pos = 'prev'; }
                    else if (i == utils.getListOffset(imageIndex,  1, images.length)) { pos = 'next'; }

                    if (!pos) { return (<Image />); }

                    return (<Image pos={pos} url={image.url} />);
                })}
            </div>
        </div>

        <ScrollDownButton onClick={onScrollDown} />
    </Section>
);

export const AboutSection = ({ headerText, contentText, onPlayIntro, onExploreMore }) => (
    <Section className="about">
        <Header>{headerText}</Header>
        <Content>
            {utils.map(contentText.split('\n'), (piece, i) => <p>{piece}</p>)}
        </Content>

        <Footer>
            <Button onClick={onPlayIntro}>Play Intro</Button>
            <Button onClick={onExploreMore}>Explore More</Button>
        </Footer>
    </Section>
);

export const MainSection = ({ index, image, headerText, contentText }) => {

    let background = null;

    switch (index) {
        case 0:
            background = (
                <Background>
                    <TriangleRight position="left v-full" size="large" />
                    <TriangleLeft position="right top small" size="small" />
                </Background>
            );
            break;
        case 2:
            background = (
                <Background>
                    <TriangleUpRight position="left h-full" />
                    <MiddleConnector />
                    <TriangleDown position="bottom h-full" />
                </Background>
            );
            break;
    }

    return (
        <Section className={`main-section${index + 1}`}>
            {background}

            <Image url={image} />
            <Header>{headerText}</Header>
            <Content>{utils.map((contentText || []).split('\n'), (piece, i) => <p>{piece}</p>)}</Content>
        </Section>
    );
};

export const ShortSection = ({ index, headerText, contentText, onExploreMore }) => {

    let background = null;

    switch (index) {
        case 0: 
            background = (
                <Background>
                    <TriangleRight position="left top small" size="small" />
                </Background>
            );
            break;

        case 1:
            background = (
                <Background>
                    <TriangleLeft position="right top small" size="small" />
                </Background>
            );
            break;
    }

    return (
        <Section className={`short-section${index + 1}`}>
            {background}

            <Header>{headerText}</Header>
            <Content>{utils.map((contentText || []).split('\n'), (piece, i) => <p>{piece}</p>)}</Content>

            <Footer>
                <Button onClick={onExploreMore}>Explore More</Button>
            </Footer>
        </Section>
    );
};

export const TestimonialsSlider = ({ headerText, testimonials, activeIndex, onPrev, onNext }) => (
    <Section className="testimonials">
        <Background>
            <TriangleUpLeft position="right h-full" />
            <MiddleConnector />
            <TriangleDown position="bottom h-full" />
        </Background>

        <header className="header">
            <IconButton onClick={onPrev}>
                <TriangleLeft />
            </IconButton>

            <span className="title">{headerText}</span>

            <IconButton onClick={onNext}>
                <TriangleRight />
            </IconButton>
        </header>

        <Quotes>
            {utils.map(testimonials, (testimonial, i) => {
                let pos;

                     if (i == activeIndex)                                               { pos = 'curr'; }
                else if (i == utils.getListOffset(activeIndex, -1, testimonials.length)) { pos = 'prev'; }
                else if (i == utils.getListOffset(activeIndex,  1, testimonials.length)) { pos = 'next'; }

                if (!pos) { return (<Quote />); }
                
                return (<Quote {...testimonial} pos={pos} />);
            })}
        </Quotes>
    </Section>
);

export const JoinSection = ({ headerText, buttonText, onClick }) => (
    <Section className="join">
        <Header>{headerText}</Header>
        <Footer>
            <Button onClick={onClick}>{buttonText}</Button>
        </Footer>
    </Section>
);

export const MapSection = ({ image }) => (
    <Section className="map">
        <ImageWrapper>
            <Image src={image} />
        </ImageWrapper>
    </Section>
);

export const ContactSection = ({ headerText, children, onSubmit }) => (
    <Section className="contact">
        <Background>
            <TriangleLeft position="v-half bottom right" size="medium" />
            <TriangleRight position="left v-full" />
        </Background>

        <Header>{headerText}</Header>
        <Content>{children}</Content>

        <Footer>
            <Button onClick={onSubmit}>Send</Button>
        </Footer>
    </Section>
);

export const Player = ({ open, src, onClose }) => (
    <Popup type="player" open={open} onClose={onClose}>
        {src ? (<iframe className="frame" frameborder="0" src={src} />) : null}
    </Popup>
);







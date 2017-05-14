const Inferno = require('inferno');
const utils   = require('helpers/utils');
const {

    Background,
    TriangleRight,
    TriangleLeft,
    TriangleDown,
    TriangleUpRight,
    TriangleUpLeft

} = require('components/backgrounds');
const {

          MenuButton, 
    ScrollDownButton, 
              Button

} = require('components/buttons');

export const LandingSection = ({ onContainerRef, onHeaderRef, onOpenMenu, onScrollDown, sliderStyles }) => (
    <section ref={onContainerRef} className="home">
        <header ref={onHeaderRef} className="header">
            <p className="main">NinjaFit</p>
            <p className="sub">Gym</p>

            <MenuButton onClick={onOpenMenu} />
        </header>

        <div style={sliderStyles} className="image-slider">
            <div className="image" />
        </div>

        <ScrollDownButton onClick={onScrollDown} />
    </section>
);

export const AboutSection = ({ headerText, contentText, onPlayIntro, onExploreMore }) => (
    <section className="about">
        <header className="header">{headerText}</header>
        <div className="content">
            {utils.map(contentText.split('\n'), (piece, i) => (
                <p key={i}>{piece}</p>
            ))}
        </div>

        <footer className="footer">
            <Button onClick={onPlayIntro}>Play Intro</Button>
            <Button onClick={onExploreMore}>Explore More</Button>
        </footer>
    </section>
);

export const MainSection = ({ index, image, headerText, contentText }) => {

    let background = null,
        style      = { backgroundImage: `url("${image}") center center / cover no-repeat` };

    switch (index) {
        case 0:
            background = (
                <Background>
                    <TriangleRight className="main" size="large" />
                    <TriangleLeft className="triangle" size="small" />
                </Background>
            );
            break;
        case 2:
            background = (
                <Background>
                    <TriangleUpRight className="top" />
                    <div className="middle" />
                    <TriangleDown className="bottom" />
                </Background>
            );
            break;
    }

    return (
        <section className={`main-section${index + 1}`}>
            {background}

            <div className="image" style={style} />

            <header className="header">{headerText}</header>

            <div className="content">
                {utils.map(contentText.split('\n'), (piece, i) => (
                    <p key={i}>{piece}</p>
                ))}
            </div>
        </section>
    );
};

export const ShortSection = ({ index, headerText, contentText, onExploreMore }) => {

    let background = null;

    switch (index) {
        case 0: 
            background = (
                <Background>
                    <TriangleRight className="triangle" size="small" />
                </Background>
            );
            break;

        case 1:
            background = (
                <Background>
                    <TriangleLeft className="triangle" size="small" />
                </Background>
            );
            break;
    }

    return (
        <section className={`short-section${index + 1}`}>
            {background}

            <header className="header">{headerText}</header>

            <div className="content">
                {utils.map(contentText.split('\n'), (piece, i) => (
                    <p key={i}>{piece}</p>
                ))}
            </div>

            <footer className="footer">
                <Button onClick={onExploreMore}>Explore More</Button>
            </footer>
        </section>
    );
};

export const TestimonialsSlider = ({ headerText, quote, author }) => (
    <section className="testimonials">
        <Background>
            <TriangleUpLeft className="top" />
            <div className="middle" />
            <TriangleDown className="bottom" />
        </Background>

        <header className="header">{headerText || "Testimonials"}</header>

        <div className="quote">
            <div className="text">{quote}</div>
            <div className="author">{author}</div>
        </div>
    </section>
);

export const JoinSection = ({ headerText, buttonText, onClick }) => (
    <section className="join">
        <header className="header">{headerText || "Join the Fitness Revolution"}</header>
        <footer className="footer">
            <Button onClick={onClick}>{buttonText || "See Pricing"}</Button>
        </footer>
    </section>
);

export const MapSection = ({ image }) => (
    <section className="map">
        <div className="image-wrapper">
            <div className="image" />
        </div>
    </section>
);

export const ContactSection = ({ headerText, children, onSubmit }) => (
    <section className="contact">
        <Background>
            <TriangleRight className="main" />
            <TriangleLeft className="triangle" size="medium" />
        </Background>

        <header className="header">{headerText || "Get In Touch"}</header>

        <div className="content">{children}</div>

        <footer className="footer">
            <Button onClick={onSubmit}>Send</Button>
        </footer>
    </section>
);








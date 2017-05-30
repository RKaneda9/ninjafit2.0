const Inferno   = require('inferno');
const Component = require('inferno-component');
const utils     = require('helpers/utils');
const settings  = require('helpers/settings');
const {commands}               = require('services/event-system');
const PageFooter               = require('mobile/containers/page-footer');
const {Row, Col}               = require('mobile/components/form');
const {TextBox, TextArea, Password}      = require('mobile/containers/inputs');
const {

    Button,
    MenuButton,
    CloseButton

} = require('mobile/components/buttons');



module.exports = class Login extends Component {
    constructor(props) {
        super(props);

        // this.onMouseDown = this.onMouseDown.bind(this);
        // this.onMouseMove = this.onMouseMove.bind(this);
        // this.onMouseUp   = this.onMouseUp  .bind(this);

        this.state = {
            
        };
    }

    render() {
        return (
            <div className="page login-page">
                <header className="header-bar">
                    <p className="title">Login</p>
                    <MenuButton onClick={commands.openMenu.emit} />
                </header>

                <section className="login">
                    <header className="header">Welcome Back, Ninja</header>
                    <div className="content">
                        <Row>
                            <Col>
                                <TextBox maxLength={99} placeholder="Username" />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Password maxLength={99} placeholder="Password" />
                            </Col>
                        </Row>
                    </div>

                    <footer className="footer">
                        <Button>Login</Button>
                    </footer>
                </section>
            </div>
        );
    }
}
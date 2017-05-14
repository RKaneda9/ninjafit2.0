const Inferno   = require('inferno');
const Component = require('inferno-component');

module.exports = class TextArea extends Component {
    constructor (props) {
        super(props);

        this.keyPress = this.keyPress.bind(this);
        this.blur     = this.blur    .bind(this);

        this.state = {};
    }

    componentDidMount() {
        if (this.props.autofocus) this.focus(); 
    }

    componentDidUpdate() {
        if (this.props.autofocus       && 
            this.props.focusAfterClear &&
           !this.props.value) { 

            this.focus(); 
        }
    }

    focus() {
        setTimeout(() => {
            if (this.input) this.input.focus();
        });
    }

    blur(e) {
        if (e.target.value != this.props.value && 
            typeof this.props.onChange === 'function') {

            this.props.onChange(e.target.value);
        }
    }

    keyPress(e) {
        if (e.which == 13 && typeof this.props.onEnter === 'function') {
            return this.blur(e),
                   this.props.onEnter(e.target.value);
        }

        if (e.target.value != this.props.value &&
            typeof this.props.onKeyPress === 'function') {
            return this.props.onKeyPress(e.target.value);
        }
    }

    render() {
        return (
            <textarea
                ref={e => (this.input = e)}
                tabIndex={Number.isInteger(this.props.index) ? this.props.index : 0}
                maxLength={this.props.maxlength || 999}
                placeholder={this.props.placeholder}
                disabled={this.props.disabled}
                onBlur={this.blur}
                onKeyUp={this.keyPress}
                value={this.props.value} />
        );
    }
}
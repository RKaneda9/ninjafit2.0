const Inferno   = require('inferno');
const Component = require('inferno-component');

// not sure why Number.isInteger is not defined here when polyfills have already been included.
const isInteger = val => typeof val === 'number' && isFinite(val) && Math.floor(val) === val;

class Input extends Component {
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

    renderProps() {
        return {
            ref: e => (this.input = e),
            className: this.props.hasError ? 'has-error' : null,
            tabIndex: isInteger(this.props.index) ? this.props.index : 0,
            placeholder: this.props.placeholder,
            maxlength: this.props.maxlength || 999,
            disabled: this.props.disabled,
            onBlur: this.blur,
            name: this.props.name,
            onKeyUp: this.keyPress
        }
    }
}

export class TextBox extends Input {
    constructor (props) { super(props); }

    render() {
        return (
            <input type="text" {...this.renderProps()} />
        );
    }
}

export class Number extends Input {
    constructor (props) { super(props); }

    render() {
        return (<input type="number" {...this.renderProps()} />);
    }
}

export class Password extends Input {
    constructor (props) { super(props); }

    render() {
        return (<input type="password" {...this.renderProps()} />);
    }
}

export class TextArea extends Input {
    constructor (props) { 
        super(props); 
    }

    keyPress(e) {
        if (e.target.value != this.props.value &&
            typeof this.props.onKeyPress === 'function') {
            return this.props.onKeyPress(e.target.value);
        }
    }

    render() {
        return (<textarea {...this.renderProps()} />);
    }
}
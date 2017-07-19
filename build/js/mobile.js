___nfg([0],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

__webpack_require__(110);
__webpack_require__(37);
var Inferno = __webpack_require__(9);
var Component = __webpack_require__(12);
var constants = __webpack_require__(13);
var Pages = __webpack_require__(88);

var _require = __webpack_require__(14),
    events = _require.events,
    commands = _require.commands;

var App = __webpack_require__(82);
var Menu = __webpack_require__(84);
var Footer = __webpack_require__(40);

var rootElement = void 0,
    onReady = void 0,
    onError = void 0;

var createVNode = Inferno.createVNode;

var Application = function (_Component) {
    _inherits(Application, _Component);

    function Application(props) {
        _classCallCheck(this, Application);

        var _this = _possibleConstructorReturn(this, (Application.__proto__ || Object.getPrototypeOf(Application)).call(this, props));

        _this.redirect = _this.redirect.bind(_this);
        _this.openMenu = _this.openMenu.bind(_this);
        _this.closeMenu = _this.closeMenu.bind(_this);
        _this.resize = _this.resize.bind(_this);

        _this.onResize = _this.onResize.bind(_this);
        _this.onHashChanged = _this.onHashChanged.bind(_this);

        _this.state = {
            route: _this.getRoute(),
            menuOpen: false
        };
        return _this;
    }

    _createClass(Application, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            commands.openMenu.subscribe(this.openMenu);
            commands.closeMenu.subscribe(this.closeMenu);
            commands.redirect.subscribe(this.redirect);

            window.addEventListener("hashchange", this.onHashChanged);
            window.addEventListener("resize", this.onResize);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            commands.openMenu.unsubscribe(this.openMenu);
            commands.closeMenu.unsubscribe(this.closeMenu);
            commands.redirect.unsubscribe(this.redirect);

            window.removeEventListener("hashchange", this.onHashChanged);
            window.removeEventListener("resize", this.onResize);
        }
    }, {
        key: 'resize',
        value: function resize() {
            events.onWindowResize.emit();
        }
    }, {
        key: 'onResize',
        value: function onResize() {
            if (this.resizeTimeoutId) clearTimeout(this.resizeTimeoutId);

            this.resizeTimeoutId = setTimeout(this.resize, 10);
        }
    }, {
        key: 'getRoute',
        value: function getRoute() {
            var route = location.hash.replace('#/', '').replace('#', '').split('/');

            if (!route.length || !Pages[route[0]]) route = [constants.pages.home];

            return route;
        }
    }, {
        key: 'onHashChanged',
        value: function onHashChanged() {
            var route = this.getRoute();

            if (route.join('/') != this.state.route.join('/')) {
                this.setState({ route: route });
            }
        }
    }, {
        key: 'openMenu',
        value: function openMenu() {
            if (!this.state.menuOpen) this.setState({ menuOpen: true });
        }
    }, {
        key: 'closeMenu',
        value: function closeMenu() {
            if (this.state.menuOpen) this.setState({ menuOpen: false });
        }
    }, {
        key: 'redirect',
        value: function redirect() {
            var route = Array.makeArray(arguments);

            if (!route.length) {
                return;
            }

            if (!Pages[route[0]]) {
                return console.error('Page: ' + route[0] + ' does not exist!');
            }

            this.setState({
                route: route,
                offset: rootElement ? rootElement.parentElement.scrollTop : 0,
                scrolling: true
            });

            window.scrollTo(0, 0);
            if (rootElement) rootElement.scrollTop = 0;

            setTimeout(function () {

                window.location.hash = '#/' + route.join('/');

                this.setState({
                    menuOpen: false,
                    scrolling: false,
                    offset: 0
                });
            }.bind(this));
        }
    }, {
        key: 'render',
        value: function render() {
            var Page = Pages[this.state.route[0]];

            return createVNode(16, App, null, null, {
                'scrolling': this.state.scrolling,
                'offset': this.state.offset,
                children: [createVNode(16, Menu, null, null, {
                    'page': this.state.route[0],
                    'opened': this.state.menuOpen
                }), createVNode(16, Page), createVNode(16, Footer)]
            });
        }
    }]);

    return Application;
}(Component);

var app = module.exports = {
    initialize: function initialize(el, resolve, reject) {
        onReady = resolve;
        onError = reject;

        app.render(el);

        // TODO: wait until after images are loaded
        resolve();
    },

    dispose: function dispose() {
        if (rootElement) Inferno.render(null, rootElement);
    },

    render: function render(el) {

        if (el) rootElement = el;

        if (!rootElement) throw "No element provided to render function!";

        Inferno.render(createVNode(16, Application), rootElement);
    }
};

/***/ }),
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(63).default;
module.exports.default = module.exports;



/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var utils = module.exports = {
    rand: function rand(length) {
        return Math.random().toString(36).substring(2, length || 25);
    },

    pad: function pad(val, length) {
        return ("00000" + val).slice(-1 * (length || 2));
    },

    toFixed: function toFixed(val, accuracy) {
        return parseFloat(val.toFixed(accuracy || 3));
    },

    trim: function trim(val, maxlength) {
        val = val && typeof val === 'string' ? val.trim() : val;

        if (maxlength) {
            val = val.substr(0, maxlength);
        }

        return val;
    },
    getListOffset: function getListOffset(i, offset, length) {
        var i1 = i - offset;
        var i2 = i1 < 0 ? i1 + length : i1 - length;

        return Math.abs(i1) < Math.abs(i2) ? i1 : i2;
    },
    getTimeText: function getTimeText(timekey) {
        var hour = parseInt(timekey.substr(0, 2)),
            min = parseInt(timekey.substr(2, 4)),
            ampm = hour < 12 ? 'am' : 'pm',
            str = void 0;

        if (hour > 12) hour -= 12;else if (hour == 0) hour = 12;

        str = hour.toString();

        if (min) str += ':' + min;

        str += ampm;

        return str;
    },
    foreach: function foreach(array, callback) {

        if (!array) {
            return;
        }

        var keys = Object.keys(array),
            i = void 0;

        if (array instanceof Array) for (i = 0; i < array.length; i++) {
            if (callback(array[keys[i]], i, keys[i]) === false) {
                return i;
            }
        } else for (i = 0; i < keys.length; i++) {
            if (callback(array[keys[i]], i, keys[i]) === false) {
                return i;
            }
        }
    },
    first: function first(array, func, defVal) {

        if (!(array instanceof Array)) {
            return defVal;
        }

        var keys = Object.keys(array),
            i = void 0;

        for (i = 0; i < keys.length; i++) {
            if (func(array[keys[i]], i)) {
                return array[keys[i]];
            }
        }

        return defVal;
    },
    map: function map(array, func) {

        if ((typeof array === 'undefined' ? 'undefined' : _typeof(array)) != 'object') {
            return [];
        }

        var mapped = void 0,
            keys = void 0,
            val = void 0,
            i = void 0;

        mapped = [];
        keys = Object.keys(array);

        if (array instanceof Array) for (i = 0; i < array.length; i++) {

            val = func(array[keys[i]], i, i);

            if (val) {
                mapped.push(val);
            }
        } else for (i = 0; i < keys.length; i++) {

            val = func(array[keys[i]], keys[i], i);

            if (val) {
                mapped.push(val);
            }
        }

        return mapped;
    },
    mapObject: function mapObject(obj, func) {

        var mapped = {};

        if (!(obj instanceof Object)) {
            return mapped;
        }

        var keys = Object.keys(obj),
            i = void 0;

        for (i = 0; i < keys.length; i++) {
            if (func(mapped, obj[keys[i]], keys[i], i) === false) {
                break;
            }
        }

        return mapped;
    },
    extend: function extend(obj, props, override) {
        if (!obj) obj = {};
        if (!props) {
            return obj;
        }

        var keys = Object.keys(props),
            i = void 0,
            val = void 0;

        for (i = 0; i < keys.length; i++) {
            val = props[keys[i]];

            if (!override && obj[keys[i]]) {
                continue;
            }

            switch (typeof val === 'undefined' ? 'undefined' : _typeof(val)) {
                case 'string':
                case 'number':
                case 'boolean':
                    obj[keys[i]] = val;
                    break;
                case 'object':
                case 'array':
                    obj[keys[i]] = new val.constructor();
                    utils.extend(obj[keys[i]], val);
                    break;

            }
        }

        return obj;
    },
    clone: function clone(obj) {
        var copy = void 0;

        // handle the 3 simple types, and null or undefined
        if (null == obj || "object" != (typeof obj === 'undefined' ? 'undefined' : _typeof(obj))) return obj;

        // handle Date
        if (obj instanceof Date) {
            copy = new Date();
            copy.setTime(obj.getTime());
            return copy;
        }

        // handle Array
        if (obj instanceof Array) {
            copy = [];
            for (var i = 0, len = obj.length; i < len; i++) {
                copy[i] = utils.clone(obj[i]);
            }
            return copy;
        }

        // handle Object
        if (obj instanceof Object) {
            copy = {};
            for (var attr in obj) {
                if (obj.hasOwnProperty(attr)) copy[attr] = utils.clone(obj[attr]);
            }
            return copy;
        }
    }
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var settings = __webpack_require__(65);
var utils = __webpack_require__(10);

// TODO: validate json

settings.contact.map = 'http://maps.google.com/maps?q=' + settings.contact.address.split(' ').join('+');

module.exports = settings;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(62).default;
module.exports.default = module.exports;



/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
    imageSliderTimeout: 15000,
    testimonialTimeout: 15000,

    storageExpiration: 3600000, // 1 hour

    pages: {
        home: 'home',
        aboutUs: 'about-us',
        whatWeOffer: 'what-we-offer',
        schedule: 'schedule',
        wod: 'wod',
        contact: 'contact',
        joinUs: 'join-us',
        login: 'login'
    },

    sections: {
        kids: 'kids',
        specialEvents: 'specialEvents'
    }
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var events = __webpack_require__(61),
    emitter = new events.EventEmitter();

// TODO: what happens if events aren't available?

var Emitter = function () {
    function Emitter(name) {
        _classCallCheck(this, Emitter);

        this.name = name;
        this.emit = this.emit.bind(this);
    }

    _createClass(Emitter, [{
        key: 'emit',
        value: function emit() {
            emitter.emit.apply(emitter, [this.name].concat([].slice.call(arguments)));
            return this;
        }
    }, {
        key: 'subscribe',
        value: function subscribe(listener) {
            // TODO: ensure listener is not already in the list of listeners
            emitter.addListener(this.name, listener);
            return this;
        }
    }, {
        key: 'unsubscribe',
        value: function unsubscribe(listener) {
            emitter.removeListener(this.name, listener);
            return this;
        }
    }]);

    return Emitter;
}();

var system = module.exports = {
    commands: {
        closeMenu: new Emitter('closemenu'),
        openMenu: new Emitter('openmenu'),
        redirect: new Emitter('redirect')
    },

    events: {
        onWindowResize: new Emitter('onwindowresize')
    }
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var Inferno = __webpack_require__(9);

var createVNode = Inferno.createVNode;
var Button = exports.Button = function Button(_ref) {
    var onClick = _ref.onClick,
        children = _ref.children;
    return createVNode(2, "button", "btn", children, {
        "onClick": onClick
    });
};

var IconButton = exports.IconButton = function IconButton(_ref2) {
    var onClick = _ref2.onClick,
        children = _ref2.children;
    return createVNode(2, "button", "icon-btn", children, {
        "onClick": onClick
    });
};

var CloseButton = exports.CloseButton = function CloseButton(_ref3) {
    var onClick = _ref3.onClick;
    return createVNode(2, "button", "close-btn", [createVNode(2, "span", "bar"), createVNode(2, "span", "bar")], {
        "onClick": onClick
    });
};

var OptionButton = exports.OptionButton = function OptionButton(_ref4) {
    var onClick = _ref4.onClick,
        children = _ref4.children;
    return createVNode(2, "button", "option-btn", children, {
        "onClick": onClick
    });
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var Inferno = __webpack_require__(9);
var utils = __webpack_require__(10);

var createVNode = Inferno.createVNode;
var Section = exports.Section = function Section(_ref) {
    var name = _ref.name,
        children = _ref.children;
    return createVNode(2, 'section', name, children);
};
var Header = exports.Header = function Header(_ref2) {
    var text = _ref2.text;
    return createVNode(2, 'header', 'header', text);
};
var Footer = exports.Footer = function Footer(_ref3) {
    var children = _ref3.children;
    return createVNode(2, 'footer', 'footer', children);
};

var Image = exports.Image = function Image(_ref4) {
    var url = _ref4.url;
    return createVNode(2, 'div', 'image', null, {
        'style': { backgroundImage: url ? 'url("' + url + '")' : '' }
    });
};

var Content = exports.Content = function Content(_ref5) {
    var text = _ref5.text;
    return createVNode(2, 'div', 'content', utils.map((text || "").split('\n'), function (piece) {
        return createVNode(2, 'p', null, piece);
    }));
};

/***/ }),
/* 17 */,
/* 18 */,
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Inferno = __webpack_require__(9);

var createVNode = Inferno.createVNode;
module.exports = function (_ref) {
    var children = _ref.children,
        name = _ref.name;
    return createVNode(2, 'div', 'page ' + name + '-page', children);
};

/***/ }),
/* 20 */,
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(10);
var http = module.exports = {
    request: function request(url, method, data, type) {
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();

            xhr.open(method.toUpperCase(), url, true);
            xhr.setRequestHeader("Accept", "*/*");

            if (type) xhr.setRequestHeader("Content-Type", type);

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {

                        try {
                            var response = JSON.parse(xhr.response || xhr.responseText);

                            return resolve(response);
                        } catch (ex) {
                            // TODO: log error
                            return reject(ex);
                        }
                    } else return reject(xhr.statusText || xhr.responseText);
                }
            };

            xhr.send(data);
        });
    },
    get: function get(url, data) {

        if (data) {
            url = url + http.toQueryString(data);
        }

        return http.request(url, "get", null); //, 'application/json;charset=UTF-8');
    },
    post: function post(url, data) {

        return http.request(url, 'post', JSON.stringify(data), 'application/json;charset=UTF-8');
    },
    toQueryString: function toQueryString(obj) {
        if (!obj) return '';

        var keys = Object.keys(obj);

        if (!keys.length) return "";

        return '?' + utils.map(keys, function (key) {
            return key + '=' + (obj[key] == null ? "" : obj[key]);
        }).join('&');
    }
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Inferno = __webpack_require__(9);
var MenuButton = __webpack_require__(69).MenuButton;

var createVNode = Inferno.createVNode;
module.exports = function (_ref) {
    var title = _ref.title;
    return createVNode(2, 'header', 'header-bar', [createVNode(2, 'p', 'title', title), createVNode(16, MenuButton)]);
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
    instagram: __webpack_require__(50),
    youtube: __webpack_require__(54),
    facebook: __webpack_require__(48),
    twitter: __webpack_require__(53)
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Inferno = __webpack_require__(9);
var OptionButton = __webpack_require__(15).OptionButton;
var AngleLeftIcon = __webpack_require__(32);
var AngleRightIcon = __webpack_require__(33);

var createVNode = Inferno.createVNode;
module.exports = function (_ref) {
    var onPrev = _ref.onPrev,
        onNext = _ref.onNext,
        title = _ref.title,
        subTitle = _ref.subTitle;
    return createVNode(2, 'div', 'date-selector', createVNode(2, 'div', 'row', [createVNode(16, OptionButton, null, null, {
        'onClick': onPrev,
        children: createVNode(16, AngleLeftIcon)
    }), createVNode(2, 'div', 'details', [createVNode(2, 'p', 'title', title), subTitle ? createVNode(2, 'p', 'sub', subTitle) : null]), createVNode(16, OptionButton, null, null, {
        'onClick': onNext,
        children: createVNode(16, AngleRightIcon)
    })]));
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Inferno = __webpack_require__(9);
var settings = __webpack_require__(11);
var MailIcon = __webpack_require__(34);
var PhoneIcon = __webpack_require__(51);

var createVNode = Inferno.createVNode;
module.exports = function () {
    return createVNode(2, 'div', 'contact-items', [createVNode(2, 'a', 'contact-item', [createVNode(16, MailIcon), createVNode(2, 'div', 'value', settings.contact.email)], {
        'href': 'mailto:' + settings.contact.email
    }), createVNode(2, 'a', 'contact-item', [createVNode(16, PhoneIcon), createVNode(2, 'div', 'value', settings.contact.phone)], {
        'href': 'tel:' + settings.contact.phone
    })]);
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Inferno = __webpack_require__(9);
var settings = __webpack_require__(11);

var createVNode = Inferno.createVNode;
module.exports = function (_ref) {
    var className = _ref.className,
        version = _ref.version,
        children = _ref.children;
    return createVNode(2, 'a', className || 'contact-map', [children, createVNode(2, 'div', 'image-wrapper', createVNode(2, 'div', 'image', null, {
        'style': { backgroundImage: 'url("./images/map' + (version || "") + '.jpg")' }
    }))], {
        'href': settings.contact.map,
        'target': 'nfg-map'
    });
};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Inferno = __webpack_require__(9);
var Component = __webpack_require__(12);

// not sure why Number.isInteger is not defined here when polyfills have already been included.
var isInteger = function isInteger(val) {
    return typeof val === 'number' && isFinite(val) && Math.floor(val) === val;
};

var Input = function (_Component) {
    _inherits(Input, _Component);

    function Input(props) {
        _classCallCheck(this, Input);

        var _this = _possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).call(this, props));

        _this.keyPress = _this.keyPress.bind(_this);
        _this.blur = _this.blur.bind(_this);

        _this.state = {};
        return _this;
    }

    _createClass(Input, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (this.input && !nextProps.value) this.input.value = '';
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (this.props.autofocus) this.focus();
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            if (this.props.autofocus && this.props.focusAfterClear && !this.props.value) {

                this.focus();
            }
        }
    }, {
        key: 'focus',
        value: function focus() {
            var _this2 = this;

            setTimeout(function () {
                if (_this2.input) _this2.input.focus();
            });
        }
    }, {
        key: 'blur',
        value: function blur(e) {
            if (e.target.value != this.props.value && typeof this.props.onChange === 'function') {

                this.props.onChange(e.target.value);
            }
        }
    }, {
        key: 'keyPress',
        value: function keyPress(e) {
            if (e.which == 13 && typeof this.props.onEnter === 'function') {
                return this.blur(e), this.props.onEnter(e.target.value);
            }

            if (e.target.value != this.props.value && typeof this.props.onKeyPress === 'function') {
                return this.props.onKeyPress(e.target.value);
            }
        }
    }, {
        key: 'renderProps',
        value: function renderProps() {
            var _this3 = this;

            return {
                ref: function ref(e) {
                    return _this3.input = e;
                },
                className: this.props.hasError ? 'has-error' : null,
                tabIndex: isInteger(this.props.index) ? this.props.index : 0,
                placeholder: this.props.placeholder,
                maxlength: this.props.maxlength || 999,
                disabled: this.props.disabled,
                onBlur: this.blur,
                onFocus: this.props.onFocus,
                name: this.props.name,
                onKeyUp: this.keyPress
            };
        }
    }]);

    return Input;
}(Component);

var createVNode = Inferno.createVNode;

var TextBox = exports.TextBox = function (_Input) {
    _inherits(TextBox, _Input);

    function TextBox(props) {
        _classCallCheck(this, TextBox);

        return _possibleConstructorReturn(this, (TextBox.__proto__ || Object.getPrototypeOf(TextBox)).call(this, props));
    }

    _createClass(TextBox, [{
        key: 'render',
        value: function render() {
            return createVNode(512, 'input', null, null, _extends({
                'type': 'text'
            }, this.renderProps()));
        }
    }]);

    return TextBox;
}(Input);

var Number = exports.Number = function (_Input2) {
    _inherits(Number, _Input2);

    function Number(props) {
        _classCallCheck(this, Number);

        return _possibleConstructorReturn(this, (Number.__proto__ || Object.getPrototypeOf(Number)).call(this, props));
    }

    _createClass(Number, [{
        key: 'render',
        value: function render() {
            return createVNode(512, 'input', null, null, _extends({
                'type': 'number'
            }, this.renderProps()));
        }
    }]);

    return Number;
}(Input);

var Password = exports.Password = function (_Input3) {
    _inherits(Password, _Input3);

    function Password(props) {
        _classCallCheck(this, Password);

        return _possibleConstructorReturn(this, (Password.__proto__ || Object.getPrototypeOf(Password)).call(this, props));
    }

    _createClass(Password, [{
        key: 'render',
        value: function render() {
            return createVNode(512, 'input', null, null, _extends({
                'type': 'password'
            }, this.renderProps()));
        }
    }]);

    return Password;
}(Input);

var TextArea = exports.TextArea = function (_Input4) {
    _inherits(TextArea, _Input4);

    function TextArea(props) {
        _classCallCheck(this, TextArea);

        return _possibleConstructorReturn(this, (TextArea.__proto__ || Object.getPrototypeOf(TextArea)).call(this, props));
    }

    _createClass(TextArea, [{
        key: 'keyPress',
        value: function keyPress(e) {
            if (e.target.value != this.props.value && typeof this.props.onKeyPress === 'function') {
                return this.props.onKeyPress(e.target.value);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return createVNode(1024, 'textarea', null, null, _extends({}, this.renderProps()));
        }
    }]);

    return TextArea;
}(Input);

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Inferno = __webpack_require__(9);
var ThrowingStar = __webpack_require__(52);

var createVNode = Inferno.createVNode;
module.exports = function (_ref) {
    var show = _ref.show,
        text = _ref.text;
    return createVNode(2, 'div', 'loader' + (show ? " show" : ''), [createVNode(16, ThrowingStar), createVNode(2, 'span', 'text', text)]);
};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Inferno = __webpack_require__(9);
var ContactMap = __webpack_require__(26);
var ContactLinks = __webpack_require__(25);
var settings = __webpack_require__(11);

var createVNode = Inferno.createVNode;
module.exports = function () {
    return createVNode(2, 'section', 'visit-us', [createVNode(2, 'header', 'header', 'Come Visit Us!'), createVNode(2, 'div', 'content', [createVNode(16, ContactMap, null, null, {
        'href': settings.contact.map
    }), createVNode(16, ContactLinks)])]);
};

/***/ }),
/* 30 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var Inferno = __webpack_require__(9);

var createVNode = Inferno.createVNode;
var Triangle = function Triangle(_ref) {
    var width = _ref.width,
        height = _ref.height,
        d = _ref.d,
        size = _ref.size,
        position = _ref.position;
    return createVNode(128, "svg", position, createVNode(2, "path", null, null, {
        "filter": "url(#ds-" + (size ? size.substr(0, 1) : "l") + ")",
        "d": d
    }), {
        "viewBox": "0 0 " + (width || 500) + " " + (height || 577.35)
    });
};

var Background = exports.Background = function Background(_ref2) {
    var children = _ref2.children;
    return createVNode(2, "div", "background", children);
};

var MiddleConnector = exports.MiddleConnector = function MiddleConnector(props) {
    return createVNode(2, "div", "middle");
};

var TriangleLeft = exports.TriangleLeft = function TriangleLeft(props) {
    return createVNode(16, Triangle, null, null, _extends({}, props, {
        "d": "M500,0v577.35l-500-288.675z"
    }));
};
var TriangleRight = exports.TriangleRight = function TriangleRight(props) {
    return createVNode(16, Triangle, null, null, _extends({}, props, {
        "d": "M0,0l500,288.675l-500,288.675z"
    }));
};
var TriangleUpLeft = exports.TriangleUpLeft = function TriangleUpLeft(props) {
    return createVNode(16, Triangle, null, null, _extends({}, props, {
        "height": 288.675,
        "d": "M500,0v288.675h-500z"
    }));
};
var TriangleUpRight = exports.TriangleUpRight = function TriangleUpRight(props) {
    return createVNode(16, Triangle, null, null, _extends({}, props, {
        "height": 288.675,
        "d": "M0,0v288.675h500z"
    }));
};
var TriangleDownLeft = exports.TriangleDownLeft = function TriangleDownLeft(props) {
    return createVNode(16, Triangle, null, null, _extends({}, props, {
        "height": 288.675,
        "d": "M0,0l500,0v288.675z"
    }));
};
var TriangleDownRight = exports.TriangleDownRight = function TriangleDownRight(props) {
    return createVNode(16, Triangle, null, null, _extends({}, props, {
        "height": 288.675,
        "d": "M0,0h500l-500,288.675z"
    }));
};
var TriangleDown = exports.TriangleDown = function TriangleDown(props) {
    return createVNode(16, Triangle, null, null, _extends({}, props, {
        "height": 144.38,
        "d": "M0,0h500l-250,144.38z"
    }));
};
var TriangleUp = exports.TriangleUp = function TriangleUp(props) {
    return createVNode(16, Triangle, null, null, _extends({}, props, {
        "height": 144.38,
        "d": "M250,0l250,144.38h-500z"
    }));
};

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Inferno = __webpack_require__(9);

var createVNode = Inferno.createVNode;
module.exports = function () {
    return createVNode(128, "svg", "icon", createVNode(2, "path", null, null, {
        "d": "M351,9a15,15 0 01 19,0l29,29a15,15 0 01 0,19l-199,199l199,199a15,15 0 01 0,19l-29,29a15,15 0 01-19,0l-236-235a16,16 0 01 0-24z"
    }), {
        "viewBox": "0 0 512 512"
    });
};

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Inferno = __webpack_require__(9);

var createVNode = Inferno.createVNode;
module.exports = function () {
    return createVNode(128, "svg", "icon", createVNode(2, "path", null, null, {
        "d": "M312,256l-199-199a15,15 0 01 0-19l29-29a15,15 0 01 19,0l236,235a16,16 0 01 0,24l-236,235a15,15 0 01-19,0l-29-29a15,15 0 01 0-19z"
    }), {
        "viewBox": "0 0 512 512"
    });
};

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Inferno = __webpack_require__(9);

var createVNode = Inferno.createVNode;
module.exports = function () {
    return createVNode(128, "svg", "icon", [createVNode(2, "path", null, null, {
        "d": "M0,50a40,49 0 01 40-49h420a40,49 0 01 40,49c0,22-28,55-46,70l-171,118.5c-27,15.5-39,15.5-66,0l-171-118.5c-28-15-46-48-46-70z"
    }), createVNode(2, "path", null, null, {
        "d": "M0,127.5v221.5a45,45 0 00 45,45h415a45,45 0 00 40-45v-221.5c-8,8.5-16,15.5-26,22.5l-162,113c-47,31-77,31-124,0l-162-113c-10-6-18-14-26-22.5z"
    })], {
        "viewBox": "0 -54 500 500"
    });
};

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Inferno = __webpack_require__(9);

var createVNode = Inferno.createVNode;
module.exports = function (_ref) {
    var children = _ref.children,
        open = _ref.open,
        type = _ref.type,
        pos = _ref.pos;
    return createVNode(2, "div", "popup" + (open ? " show" : ""), createVNode(2, "div", "content " + type + " " + (pos || 'full'), children));
};

/***/ }),
/* 36 */,
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Array.makeArray = function (args) {
    return [].slice.call(args);
};

if (!Number.isInteger) {

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger
    Number.isInteger = function (value) {
        return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
    };
}

if (SVGSVGElement && !SVGSVGElement.prototype.focus) {
    SVGSVGElement.prototype.focus = function () {};
}

if (!Function.prototype.bind) {

    Function.prototype.bind = function (oThis) {
        if (typeof this !== 'function') {
            // closest thing possible to the ECMAScript 5
            // internal IsCallable function
            throw new TypeError('Cannot call bind on ', this);
        }

        var aArgs, fToBind, fNOP, fBound;

        aArgs = Array.prototype.slice.call(arguments, 1);
        fToBind = this;
        fNOP = function fNOP() {};
        fBound = function fBound() {
            return fToBind.apply(this instanceof fNOP && oThis ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
        };

        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();

        return fBound;
    };
}

if (typeof Object.keys !== 'function') {
    Object.keys = function (obj) {
        var keys = [];

        for (var i in obj) {
            keys.push(i);
        }

        return keys;
    };
}

if (Function.prototype.bind && (typeof console === 'undefined' ? 'undefined' : _typeof(console)) == 'object' && _typeof(console.log) == 'object') {
    var logFns = ["log", "info", "debug", "warn", "error", "clear"];

    for (var i = 0; i < logFns.length; i++) {
        console[logFns[i]] = Function.prototype.call.bind(console[logFns[i]], console);
    }
}

if (typeof Object.defineProperty != 'function') {

    Object.defineProperty = function (obj, key, props) {
        if ((typeof props === 'undefined' ? 'undefined' : _typeof(props)) === 'object' && props.value) {
            obj[key] = props.value;
        }
        return obj;
    };
}

if (typeof Object.assign != 'function') {

    Object.assign = function (target) {
        // We must check against these specific cases.
        if (target === undefined || target === null) {
            throw new TypeError('Cannot convert undefined or null to object');
        }

        var output = Object(target);

        for (var index = 1; index < arguments.length; index++) {
            var source = arguments[index];
            if (source !== undefined && source !== null) {
                for (var nextKey in source) {
                    if (source.hasOwnProperty(nextKey)) {
                        output[nextKey] = source[nextKey];
                    }
                }
            }
        }
        return output;
    };
}

if ((typeof console === 'undefined' ? 'undefined' : _typeof(console)) == 'object' && typeof console.debug == 'undefined') {
    console.debug = console.log;
}

if (!Array.prototype.includes) {

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
    // https://stackoverflow.com/questions/35135127/adding-a-function-to-array-prototype-in-ie-results-in-it-being-pushed-in-to-ever
    Object.defineProperty(Array.prototype, "includes", {
        value: function value(searchEl) {
            'use strict';

            var O, len, n, k, currEl;

            if (this == null) {
                throw new TypeError('Array.prototype.includes called on null or undefined');
            }

            O = Object(this);
            len = parseInt(O.length, 10) || 0;

            if (len === 0) {
                return false;
            }

            n = parseInt(arguments[1], 10) || 0;
            k = n >= 0 ? n : len + n;

            if (k < 0) {
                k = 0;
            }

            while (k < len) {
                currEl = O[k];

                if (searchEl === currEl || searchEl !== searchEl && currEl !== currEl) {
                    return true;
                }

                k++;
            }

            return false;
        }
    });
}

if (!String.prototype.includes) {

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes
    Object.defineProperty(String.prototype, "includes", {
        value: function value(search, start) {
            'use strict';

            if (typeof start !== 'number') {
                start = 0;
            }

            if (start + search.length > this.length) {
                return false;
            }

            return this.indexOf(search, start) !== -1;
        }
    });
}

if (!Number.isInteger) {

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger
    Object.defineProperty(Number, "isInteger", {
        value: function value(_value) {
            return typeof _value === "number" && isFinite(_value) && Math.floor(_value) === _value;
        }
    });
}

if (SVGSVGElement && !SVGSVGElement.prototype.focus) {
    Object.defineProperty(SVGSVGElement.prototype, "focus", {
        value: function value() {}
    });
}

/******************************************************************
 *
 * Region: Date Time Polyfills
 *
 *****************************************************************/
Date.prototype.clone = function () {
    return new Date(this);
};

Date.prototype.getDateKey = function () {

    var y = this.getFullYear().toString(),
        m = this.getMonth() + 1,
        d = this.getDate();

    return parseInt(y + ("0" + m).slice(-2) + ("0" + d).slice(-2));
};

Date.prototype.getDateText = function () {
    var val = this.getDate();

    switch (val) {
        case 1:
        case 21:
        case 31:
            return val + 'st';
        case 2:
        case 22:
            return val + 'nd';
        case 3:
        case 23:
            return val + 'rd';
        default:
            return val + 'th';
    }
};

Date.prototype.getMonthText = function () {
    switch (this.getMonth()) {
        case 0:
            return 'January';
        case 1:
            return 'February';
        case 2:
            return 'March';
        case 3:
            return 'April';
        case 4:
            return 'May';
        case 5:
            return 'June';
        case 6:
            return 'July';
        case 7:
            return 'August';
        case 8:
            return 'September';
        case 9:
            return 'October';
        case 10:
            return 'November';
        case 11:
            return 'December';
    }
};

Date.prototype.getDayText = function () {
    switch (this.getDay()) {
        case 0:
            return 'Sunday';
        case 1:
            return 'Monday';
        case 2:
            return 'Tuesday';
        case 3:
            return 'Wednesday';
        case 4:
            return 'Thursday';
        case 5:
            return 'Friday';
        case 6:
            return 'Saturday';
    }
};

Date.prototype.getTomorrow = function () {
    return this.clone().addDays(1);
};

Date.prototype.getYesterday = function () {
    return this.clone().addDays(-1);
};

Date.prototype.addDays = function (val) {
    this.setDate(this.getDate() + val);
    return this;
};

Date.prototype.addMonths = function (val) {
    this.setMonth(this.getMonth() + val);
    return this;
};

Date.prototype.toStartOfMonth = function () {
    this.setDate(1);
    return this;
};

Date.prototype.toEndOfMonth = function () {
    this.setDate(1);
    this.setMonth(this.getMonth() + 1);
    this.setDate(0);
    return this;
};

Date.prototype.toStartOfWeek = function () {
    this.setDate(this.getDate() - this.getDay());
    return this;
};

Date.prototype.toEndOfWeek = function () {
    this.setDate(this.getDate() + (6 - this.getDay()));
    return this;
};

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Inferno = __webpack_require__(9);

var createVNode = Inferno.createVNode;
module.exports = function (_ref) {
    var children = _ref.children,
        open = _ref.open,
        type = _ref.type,
        pos = _ref.pos;
    return createVNode(2, "div", "popup" + (open ? " show" : ""), [createVNode(2, "div", "cover"), createVNode(2, "div", "content " + type + " " + (pos || 'full'), children)]);
};

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Inferno = __webpack_require__(9);
var Component = __webpack_require__(12);
var utils = __webpack_require__(10);
var Popover = __webpack_require__(83);
var Popup = __webpack_require__(38);

var _require = __webpack_require__(27),
    TextBox = _require.TextBox,
    TextArea = _require.TextArea;

var ContactLinks = __webpack_require__(25);
var CheckIcon = __webpack_require__(46);
var mailer = __webpack_require__(42);

var fields = {
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email',
    message: 'Message'
};

var createVNode = Inferno.createVNode;
module.exports = function (_Component) {
    _inherits(ContactForm, _Component);

    function ContactForm(props) {
        _classCallCheck(this, ContactForm);

        var _this = _possibleConstructorReturn(this, (ContactForm.__proto__ || Object.getPrototypeOf(ContactForm)).call(this, props));

        _this.updateFirstName = _this.updateFirstName.bind(_this);
        _this.updateLastName = _this.updateLastName.bind(_this);
        _this.updateEmail = _this.updateEmail.bind(_this);
        _this.updateMessage = _this.updateMessage.bind(_this);
        _this.send = _this.send.bind(_this);
        _this.clearNotification = _this.clearNotification.bind(_this);
        _this.showNotification = _this.showNotification.bind(_this);

        _this.state = {

            firstName: '',
            lastName: '',
            email: '',
            message: '',
            sending: false,
            showPopup: false,
            hasResponse: false,
            hasError: false,
            target: null,
            responseMsg: ''
        };
        return _this;
    }

    _createClass(ContactForm, [{
        key: 'updateFirstName',
        value: function updateFirstName(val) {
            this.setState({ firstName: val });
        }
    }, {
        key: 'updateLastName',
        value: function updateLastName(val) {
            this.setState({ lastName: val });
        }
    }, {
        key: 'updateEmail',
        value: function updateEmail(val) {
            this.setState({ email: val });
        }
    }, {
        key: 'updateMessage',
        value: function updateMessage(val) {
            this.setState({ message: val });
        }
    }, {
        key: 'checkFocus',
        value: function checkFocus(field) {
            if (this.state.hasResponse && this.state.target == field) this.clearNotification();
        }
    }, {
        key: 'clearNotification',
        value: function clearNotification() {
            clearTimeout(this.timeoutId);

            this.setState({
                hasResponse: false,
                showPopup: false
            });
        }
    }, {
        key: 'showNotification',
        value: function showNotification(hasError, field, message) {
            this.setState({
                sending: false,
                hasResponse: true,
                hasError: hasError,
                target: field,
                showPopup: !field,
                responseMsg: message
            });

            clearTimeout(this.timeoutId);

            this.timeoutId = setTimeout(this.clearNotification, 3000);
        }
    }, {
        key: 'send',
        value: function send() {
            var _this2 = this;

            // if we're showing the previous response or we're in the 
            // middle of sending, do nothing.
            if (this.state.hasResponse || this.state.sending) return;

            clearTimeout(this.timeoutId);

            var props = {
                firstName: (this.state.firstName || "").trim().substr(0, 99),
                lastName: (this.state.lastName || "").trim().substr(0, 99),
                email: (this.state.email || "").trim().substr(0, 199),
                content: (this.state.message || "").trim().substr(0, 999)
            };

            if (!props.firstName) return this.showNotification(true, fields.firstName, "Gonna need that first name.");
            if (!props.lastName) return this.showNotification(true, fields.lastName, "Let's get that last name filled.");
            if (!props.email) return this.showNotification(true, fields.email, "What's your email?");
            if (!props.content) return this.showNotification(true, fields.message, "Let's get that question written down.");

            this.setState({
                sending: true,
                hasResponse: false,
                hasError: false,
                responseMsg: ''
            });

            mailer.send(props).then(function (res) {
                _this2.setState({
                    firstName: '',
                    lastName: '',
                    email: '',
                    message: '',
                    sending: false,
                    hasResponse: true,
                    hasError: false,
                    target: null,
                    showPopup: true
                });

                clearTimeout(_this2.timeoutId);

                _this2.timeoutId = setTimeout(_this2.clearNotification, 3000);
            }).catch(function (res) {

                var message = res.message,
                    target = null;

                switch (res.target) {
                    case "firstName":
                        target = fields.firstName;break;
                    case "lastName":
                        target = fields.lastName;break;
                    case "email":
                        target = fields.email;break;
                    case "content":
                        target = fields.message;break;
                }

                // only show a popover for a specific field if both the field is
                // matched and the response has a message.
                if (target && !res.message) target = null;

                _this2.showNotification(true, target, message);
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            return createVNode(2, 'section', 'contact', [this.props.children, createVNode(2, 'header', 'header', this.props.title || "Questions? Let Us Help With That"), createVNode(2, 'div', 'content', [createVNode(2, 'div', 'row', [createVNode(2, 'div', 'col', [createVNode(16, TextBox, null, null, {
                'placeholder': 'First Name',
                'maxlength': 99,
                'onFocus': function onFocus() {
                    return _this3.checkFocus(fields.firstName);
                },
                'hasError': this.state.hasResponse && this.state.target == fields.firstName,
                'onKeyPress': this.updateFirstName,
                'value': this.state.firstName
            }), createVNode(16, Popover, null, null, {
                'show': this.state.hasResponse && this.state.target == fields.firstName,
                'text': this.state.target == fields.firstName ? this.state.responseMsg : ''
            })]), createVNode(2, 'div', 'col', [createVNode(16, TextBox, null, null, {
                'placeholder': 'Last Name',
                'maxlength': 99,
                'onFocus': function onFocus() {
                    return _this3.checkFocus(fields.lastName);
                },
                'hasError': this.state.hasResponse && this.state.target == fields.lastName,
                'onKeyPress': this.updateLastName,
                'value': this.state.lastName
            }), createVNode(16, Popover, null, null, {
                'align': 'right',
                'show': this.state.hasResponse && this.state.target == fields.lastName,
                'text': this.state.target == fields.lastName ? this.state.responseMsg : ''
            })])]), createVNode(2, 'div', 'row', createVNode(2, 'div', 'col', [createVNode(16, TextBox, null, null, {
                'placeholder': 'Your Email',
                'maxlength': 199,
                'onFocus': function onFocus() {
                    return _this3.checkFocus(fields.email);
                },
                'hasError': this.state.hasResponse && this.state.target == fields.email,
                'onKeyPress': this.updateEmail,
                'value': this.state.email
            }), createVNode(16, Popover, null, null, {
                'show': this.state.hasResponse && this.state.target == fields.email,
                'text': this.state.target == fields.email ? this.state.responseMsg : ''
            })])), createVNode(2, 'div', 'row', createVNode(2, 'div', 'col', [createVNode(16, TextArea, null, null, {
                'placeholder': 'What can we help you with?',
                'maxlength': 999,
                'onFocus': function onFocus() {
                    return _this3.checkFocus(fields.message);
                },
                'hasError': this.state.hasResponse && this.state.target == fields.message,
                'onKeyPress': this.updateMessage,
                'value': this.state.message
            }), createVNode(16, Popover, null, null, {
                'show': this.state.hasResponse && this.state.target == fields.message,
                'text': this.state.target == fields.message ? this.state.responseMsg : ''
            })]))]), createVNode(2, 'footer', 'footer', createVNode(2, 'div', 'btn-col', createVNode(2, 'button', 'btn' + (this.state.sending ? ' anim' : '') + (this.state.hasResponse ? ' covered' : ''), [createVNode(2, 'span', null, 'Send'), createVNode(2, 'div', 'cover ' + (this.state.hasError ? 'error' : 'success'), this.state.hasError ? 'Error' : 'Success!')], {
                'onClick': this.send
            }))), this.state.hasError ? createVNode(16, Popup, null, null, {
                'open': this.state.showPopup,
                'pos': 'center',
                'type': 'notification error',
                children: [createVNode(2, 'div', 'title-icon close', [createVNode(2, 'span', 'bar'), createVNode(2, 'span', 'bar')]), createVNode(2, 'div', 'title', 'Message Not Delivered'), createVNode(2, 'div', 'desc', 'There was a problem in attempting to send your message. We apologize for that! Feel free to try again, give us a call or email us directly.'), createVNode(16, ContactLinks), createVNode(2, 'footer', 'footer', createVNode(2, 'button', 'btn', createVNode(2, 'span', null, 'Ok'), {
                    'onClick': this.clearNotification
                }))]
            }) : createVNode(16, Popup, null, null, {
                'open': this.state.showPopup,
                'pos': 'center',
                'type': 'notification success',
                children: [createVNode(2, 'div', 'title-icon check', createVNode(16, CheckIcon)), createVNode(2, 'div', 'title', 'Message Sent!'), createVNode(2, 'div', 'desc', 'We will be in touch as soon as we can.'), createVNode(2, 'footer', 'footer', createVNode(2, 'button', 'btn', createVNode(2, 'span', null, 'Ok'), {
                    'onClick': this.closeNotification
                }))]
            })]);
        }
    }]);

    return ContactForm;
}(Component);

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Inferno = __webpack_require__(9);
var utils = __webpack_require__(10);
var pages = __webpack_require__(13).pages;
var commands = __webpack_require__(14).commands;
var social = __webpack_require__(11).social;
var SocialIcons = __webpack_require__(23);

var _require = __webpack_require__(70),
    Footer = _require.Footer,
    NavTitle = _require.NavTitle,
    MenuLinks = _require.MenuLinks,
    MenuLink = _require.MenuLink,
    Text = _require.Text,
    SocialLinks = _require.SocialLinks,
    SocialLink = _require.SocialLink;

var createVNode = Inferno.createVNode;


var PageFooter = module.exports = function () {
    return createVNode(16, Footer, null, null, {
        children: [createVNode(16, MenuLinks, null, null, {
            children: [createVNode(16, NavTitle, null, null, {
                children: 'Menu'
            }), createVNode(16, MenuLink, null, null, {
                'onClick': function onClick() {
                    return commands.redirect.emit(pages.home);
                },
                children: createVNode(16, Text, null, null, {
                    children: 'Home'
                })
            }), createVNode(16, MenuLink, null, null, {
                'onClick': function onClick() {
                    return commands.redirect.emit(pages.aboutUs);
                },
                children: createVNode(16, Text, null, null, {
                    children: 'About Us'
                })
            }), createVNode(16, MenuLink, null, null, {
                'onClick': function onClick() {
                    return commands.redirect.emit(pages.whatWeOffer);
                },
                children: createVNode(16, Text, null, null, {
                    children: 'What We Offer'
                })
            }), createVNode(16, MenuLink, null, null, {
                'onClick': function onClick() {
                    return commands.redirect.emit(pages.schedule);
                },
                children: createVNode(16, Text, null, null, {
                    children: 'Schedule'
                })
            }), createVNode(16, MenuLink, null, null, {
                'onClick': function onClick() {
                    return commands.redirect.emit(pages.wod);
                },
                children: createVNode(16, Text, null, null, {
                    children: 'WOD'
                })
            }), createVNode(16, MenuLink, null, null, {
                'onClick': function onClick() {
                    return commands.redirect.emit(pages.contact);
                },
                children: createVNode(16, Text, null, null, {
                    children: 'Contact'
                })
            })]
        }), createVNode(16, MenuLinks, null, null, {
            children: [createVNode(16, NavTitle, null, null, {
                children: 'Get Started'
            }), createVNode(16, MenuLink, null, null, {
                'onClick': function onClick() {
                    return commands.redirect.emit(pages.joinUs);
                },
                children: createVNode(16, Text, null, null, {
                    children: 'Join Us'
                })
            }), createVNode(16, MenuLink, null, null, {
                'onClick': function onClick() {
                    return commands.redirect.emit(pages.login);
                },
                children: createVNode(16, Text, null, null, {
                    children: 'Login'
                })
            })]
        }), createVNode(16, MenuLinks, null, null, {
            children: [createVNode(16, NavTitle, null, null, {
                children: 'Connect With Us'
            }), utils.map(social, function (href, type) {
                var Icon = SocialIcons[type.toLowerCase()];

                return createVNode(16, SocialLink, null, null, {
                    'href': href,
                    children: [createVNode(16, Icon), createVNode(16, Text, null, null, {
                        children: type
                    })]
                });
            })]
        })]
    });
};

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var settings = __webpack_require__(11),
    http = __webpack_require__(21),
    constants = __webpack_require__(13),
    utils = __webpack_require__(10);

var storage = {};

var store = {
    get: function get(datekey) {

        if (!datekey) datekey = new Date().getDateKey();

        var day = storage[datekey];

        if (day && new Date() - day.retrieved > constants.storageExpiration) {

            return storage[datekey] = day = null;
        }

        return day;
    },
    save: function save(schedule) {
        utils.foreach((schedule || {}).days, function (day) {
            if (!(day instanceof Object)) return;

            storage[day.date] = {
                datekey: day.date,
                events: day.items,
                retrieved: day.retrieved ? new Date(day.retrieved) : new Date()
            };
        });
    }
};

var service = module.exports = {
    fetch: function fetch(datekey) {
        return new Promise(function (resolve, reject) {
            try {
                var day = store.get(datekey);

                if (day) return resolve(day);

                http.get(settings.api.calendarDay, { datekey: datekey }).then(function (data) {
                    store.save(data);

                    resolve(store.get(datekey));
                }).catch(function () {
                    reject();
                });
            } catch (ex) {
                reject(ex);
            }
        });
    }
};

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var settings = __webpack_require__(11),
    http = __webpack_require__(21),
    constants = __webpack_require__(13);

var service = module.exports = {
    send: function send(message) {
        return new Promise(function (resolve, reject) {
            try {
                http.post(settings.api.sendMessage, message).then(function (res) {
                    if (!res || !(res instanceof Object)) {
                        console.error('Unknown response for send message.', res);
                        res = {};
                    }

                    if (res.isValid) resolve();

                    reject(res);
                }).catch(function () {
                    reject({});
                });
            } catch (ex) {
                reject(ex);
            }
        });
    }
};

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var settings = __webpack_require__(11),
    http = __webpack_require__(21),
    constants = __webpack_require__(13);

var storage = {};

var store = {
    get: function get(datekey) {

        if (!datekey) datekey = new Date().getDateKey();

        var wod = storage[datekey];

        if (wod && new Date() - wod.retrieved > constants.wodStorageExpiration) {

            return storage[datekey] = wod = null;
        }

        return wod;
    },
    save: function save(wod) {
        return storage[wod.datekey] = {
            datekey: wod.datekey,
            workouts: wod.workouts,
            retreived: wod.retrieved ? new Date(wod.retrieved) : new Date()
        };
    }
};

var service = module.exports = {
    fetch: function fetch(datekey) {
        return new Promise(function (resolve, reject) {
            try {
                var wod = store.get(datekey);

                if (wod) return resolve(wod);

                http.get(settings.api.getWod, { datekey: datekey }).then(function (data) {
                    wod = store.save(data);

                    resolve(wod);
                }).catch(function () {
                    reject();
                });
            } catch (ex) {
                reject(ex);
            }
        });
    }
};

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Inferno = __webpack_require__(9);

var createVNode = Inferno.createVNode;
module.exports = function () {
    return createVNode(128, "svg", "icon", createVNode(2, "path", null, null, {
        "d": "m47,65v-65h6v65h17.0725l-20.0725,35l-20.0725-35z"
    }), {
        "viewBox": "0 0 100 100"
    });
};

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Inferno = __webpack_require__(9);

var createVNode = Inferno.createVNode;
module.exports = function () {
    return createVNode(128, "svg", "icon", createVNode(2, "path", null, null, {
        "d": "M357,214v-64a9,9 0 01 15-5l106,96.5a9.5,9.5 0 01 0,15.5l-106,96.5a9,9 0 01-15-5v-64h-348a9,9 0 01 -9-9v-52.5a9,9 0 01 9-9z"
    }), {
        "viewBox": "0 0 500 500"
    });
};

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Inferno = __webpack_require__(9);

var createVNode = Inferno.createVNode;
module.exports = function () {
    return createVNode(128, "svg", "icon", createVNode(2, "path", null, null, {
        "d": "M204.5,281.5l187-187.5a28,28 0 01 39,0l40,40a28,28 0 01 0,37l-246,246a28,28 0 01-40.5,0l-143-143.5a27,27 0 01 0-35.5l42.5-42.5a27,27 0 01 35.5,0.5z"
    }), {
        "viewBox": "0 0 512 512"
    });
};

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Inferno = __webpack_require__(9);

var createVNode = Inferno.createVNode;
module.exports = function () {
    return createVNode(128, "svg", "icon", [createVNode(2, "path", null, null, {
        "fill-rule": "evenodd",
        "d": "M250,5a245,245 0 01 0,490a245,245 0 01 0-490zm0,70a175,175 0 01 0,350a175,175 0 01 0-350z"
    }), createVNode(2, "path", null, null, {
        "d": "M250,250v-112a10,10 0 01 10-10h21a10,10 0 01 10,10v143a10,10 0 01-10,10h-102a10,10 0 01-10-10v-21a10,10 0 01 10-10z"
    })], {
        "viewBox": "0 0 500 500"
    });
};

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Inferno = __webpack_require__(9);

var createVNode = Inferno.createVNode;
module.exports = function () {
    return createVNode(128, "svg", "icon", createVNode(2, "path", null, null, {
        "d": "M205,183v-63c1-71 43-103 97-107c27-1 48,0 73,3v74h-53c-20,0-31,13-32,35v58h82l-11,82h-71v212h-85v-212h-71v-82z"
    }), {
        "viewBox": "17 12 466 466"
    });
};

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Inferno = __webpack_require__(9);

var createVNode = Inferno.createVNode;
module.exports = function () {
  return createVNode(128, "svg", "icon", [createVNode(2, "rect", null, null, {
    "width": "430",
    "height": "54",
    "rx": "10",
    "ry": "10",
    "x": "35",
    "y": "0"
  }), createVNode(2, "rect", null, null, {
    "width": "430",
    "height": "54",
    "rx": "10",
    "ry": "10",
    "x": "35",
    "y": "446"
  }), createVNode(2, "path", null, null, {
    "d": "M428,72q-6,101-134,178q128,77,134,178h-356q6-101,134-178q-128-77-134-178z"
  })], {
    "viewBox": "0 0 500 500"
  });
};

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Inferno = __webpack_require__(9);

var createVNode = Inferno.createVNode;
module.exports = function () {
    return createVNode(128, "svg", "icon", createVNode(2, "g", null, [createVNode(2, "path", null, null, {
        "d": "M5.5,180c-2.5-123,51.5-177,174.5-174.5c48-1,92-1,140,0c123-2.5,177,51.5,174.5,174.5c1,48,1,92,0,140c2.5,123-51.5,177-174.5,174.5c-48,1-92,1-140,0c-123,2.5-177-51.5-174.5-174.5c-1-48-1-92,0-140zM49,185c-3-103,33-139,136-136h130c103-3,139,33,136,136v130c3,103-33,139-136,136h-130c-103,3-139-33-136-136z"
    }), createVNode(2, "path", null, null, {
        "d": "M250,124a126,126 0 01 0,252a126,126 0 01 0-252zM250,168a82,82 0 01 0,164a82,82 0 01 0-164z"
    }), createVNode(2, "circle", null, null, {
        "cx": "380.5",
        "cy": "119",
        "r": "29.5"
    })], {
        "fill-rule": "evenodd"
    }), {
        "viewBox": "0 0 500 500"
    });
};

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Inferno = __webpack_require__(9);

var createVNode = Inferno.createVNode;
module.exports = function () {
    return createVNode(128, "svg", "icon", createVNode(2, "path", null, null, {
        "d": "M128,21q40,75,53,91.5q10,15.5-2,27.5c-10,13-38,32-45,40c-10,9-12,15-3,32q54,105,158,156c18,10,20,5,32-5c8-8,20-27,35-41c10-11,20-12,32-3q14,11,88,51c9,5,11,8,9,27q-7,40-22,51q-67,53-133,29c-180-55-286-195-315-336q-4-62,36-105q10-13,30-17c35-11,42-6,47,2z"
    }), {
        "viewBox": "0 0 500 500"
    });
};

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Inferno = __webpack_require__(9);

var createVNode = Inferno.createVNode;
module.exports = function () {
    return createVNode(128, "svg", "throwing-star icon", [createVNode(2, "path", null, null, {
        "fill-rule": "evenodd",
        "fill": "#e6e6e7",
        "d": "M250-14l46,141a40,40 0 10 58,41h148l-121,88a40,40 0 10-22,67l46.5,141l-120.5-87a40,40 0 10-70,0l-120.5,87l46.5-141a40,40 0 10-22-67l-121-88h148a40,40 0 10 58-41z M250,225a25,25 0 01 0,50 a25,25 0 01 0-50z"
    }), createVNode(2, "g", null, [createVNode(2, "path", null, null, {
        "d": "M250-14v70l-28,90a40,40 0 00-18-19z"
    }), createVNode(2, "path", null, null, {
        "d": "M502,168l-67,22h-91.6a40,40 0 0010.6-22z"
    }), createVNode(2, "path", null, null, {
        "d": "M405.5,464l-41.5-57l-29.8-87.6a40,40 0 00 24.8,3.6z"
    }), createVNode(2, "path", null, null, {
        "d": "M94.5,464l41.5-57l74.5-56a40,40 0 00 4.5,26z"
    }), createVNode(2, "path", null, null, {
        "d": "M-2,168l67,22l77,54a40,40 0 00-23,12z"
    })], {
        "fill": "#dbdadd"
    }), createVNode(2, "g", null, [createVNode(2, "path", null, null, {
        "d": "M250-14v70l28,90a40,40 0 01 18-19z"
    }), createVNode(2, "path", null, null, {
        "d": "M502,168l-67,22l-77,54a40,40 0 01 23,12z"
    }), createVNode(2, "path", null, null, {
        "d": "M405.5,464l-41.5-57l-74.5-56a40,40 0 01-4.5,26z"
    }), createVNode(2, "path", null, null, {
        "d": "M94.5,464l41.5-57l29.5-87.4a40,40 0 01-24.5,3.4 Z"
    }), createVNode(2, "path", null, null, {
        "d": "M-2,168l67,22h91.6a40,40 0 01-10.6-22z"
    })], {
        "fill": "#ebeaeb"
    })], {
        "viewBox": "0 0 500 500"
    });
};

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Inferno = __webpack_require__(9);

var createVNode = Inferno.createVNode;
module.exports = function () {
    return createVNode(128, "svg", "icon", createVNode(2, "path", null, null, {
        "d": "M246.8,182.2C157,176 101,135 61,88 A90,90 0 00 88.5,208.5C74,208 58,203 48,197A90,90 0 00 120.4,286.5C110,289.8 93,290.8 79.5,288.2A90,90 0 00 163.8,350.7C137,373 90,394.8 30,388.2A256,254 0 00 424.5,160.5C447,144 459,129 469.8,113.8C453,121 436,126 417.8,127.8C438,116 452,97 457.6,78.2C442,87 422,96 400,100A90,90 0 00 246.8,182.2Z"
    }), {
        "viewBox": "30 30 440 440"
    });
};

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Inferno = __webpack_require__(9);

var createVNode = Inferno.createVNode;
module.exports = function () {
    return createVNode(128, "svg", "icon", createVNode(2, "path", null, null, {
        "fill-rule": "evenodd",
        "d": "M2,178c5-83,32.5-97.5,88-99.4c110-6.1,210-6.1,320,0c55.5,1.9,83,16.4,88,99.4c2.5,47,2.5,97,0,144c-5,83-32.5,97.5-88,99.4c-110,6.1-210,6.1-320,0c-55.5-1.9-83-16.4-88-99.4c-2.5-47-2.5-97,0-144zM198,174l136,71l-136,70z"
    }), {
        "viewBox": "0 75 500 350"
    });
};

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Inferno = __webpack_require__(9);
var settings = __webpack_require__(11).hours;
var utils = __webpack_require__(10);

var createVNode = Inferno.createVNode;
module.exports = function () {
    return createVNode(2, 'section', 'weekly-hours', [createVNode(2, 'header', 'header', 'Gym Hours'), createVNode(2, 'table', 'content', createVNode(2, 'tbody', null, utils.map(settings, function (hours, day) {
        var text = utils.map(hours, function (span) {
            return utils.getTimeText(span.start) + ' - ' + utils.getTimeText(span.end);
        }).join(', ');

        return createVNode(2, 'tr', 'day-item', [createVNode(2, 'td', 'title', [day[0].toUpperCase() + day.slice(1), ':']), createVNode(2, 'td', 'hours', text || "Closed")]);
    })))]);
};

/***/ }),
/* 56 */,
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Inferno = __webpack_require__(9);
var Component = __webpack_require__(12);

var _require = __webpack_require__(27),
    TextBox = _require.TextBox,
    Password = _require.Password;

var createVNode = Inferno.createVNode;


module.exports = function (_Component) {
    _inherits(LoginForm, _Component);

    function LoginForm(props) {
        _classCallCheck(this, LoginForm);

        var _this = _possibleConstructorReturn(this, (LoginForm.__proto__ || Object.getPrototypeOf(LoginForm)).call(this, props));

        _this.send = _this.send.bind(_this);
        _this.state = { sending: false };
        return _this;
    }

    _createClass(LoginForm, [{
        key: 'send',
        value: function send() {
            var _this2 = this;

            // if we're showing the previous response or we're in the 
            // middle of sending, do nothing.
            if (this.sending) return;

            this.setState({ sending: true });

            setTimeout(function () {
                _this2.setState({ sending: false });
            }, 3000);
        }
    }, {
        key: 'render',
        value: function render() {
            return createVNode(2, 'form', 'login', [createVNode(2, 'header', 'header', 'Welcome Back, Ninja'), createVNode(2, 'div', 'content', [createVNode(2, 'div', 'row', createVNode(2, 'div', 'col', createVNode(16, TextBox, null, null, {
                'name': 'username',
                'placeholder': 'Username',
                'maxlength': 99
            }))), createVNode(2, 'div', 'row', createVNode(2, 'div', 'col', createVNode(16, Password, null, null, {
                'name': 'password',
                'placeholder': 'password',
                'maxlength': 99
            })))]), createVNode(2, 'footer', 'footer', createVNode(2, 'div', 'col', createVNode(2, 'button', 'btn' + (this.state.sending ? ' anim' : ''), createVNode(2, 'span', null, 'Login'), {
                'onClick': this.send,
                'type': 'submit'
            })))], {
                'action': "#/login",
                'method': 'get'
            });
        }
    }]);

    return LoginForm;
}(Component);

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Inferno = __webpack_require__(9);
var Popup = __webpack_require__(35);
var CloseButton = __webpack_require__(15).CloseButton;

var createVNode = Inferno.createVNode;
module.exports = function (_ref) {
    var show = _ref.show,
        url = _ref.url,
        onClose = _ref.onClose;
    return createVNode(16, Popup, null, null, {
        'open': show && url,
        'type': 'player',
        children: [createVNode(16, CloseButton, null, null, {
            'onClick': onClose
        }), show && url ? createVNode(2, 'iframe', 'frame', null, {
            'frameborder': '0',
            'src': url
        }) : null]
    });
};

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Inferno = __webpack_require__(9);
var Component = __webpack_require__(12);
var utils = __webpack_require__(10);
var items = __webpack_require__(11).pricePackages;

var createVNode = Inferno.createVNode;
module.exports = function (_Component) {
    _inherits(PricingSection, _Component);

    function PricingSection(props) {
        _classCallCheck(this, PricingSection);

        var _this = _possibleConstructorReturn(this, (PricingSection.__proto__ || Object.getPrototypeOf(PricingSection)).call(this, props));

        _this.state = { index: 1 };
        return _this;
    }

    _createClass(PricingSection, [{
        key: 'selectPriceItem',
        value: function selectPriceItem(i) {
            this.setState({ index: i });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return createVNode(2, 'section', 'pricing', [createVNode(2, 'header', 'header', 'Our Packages'), createVNode(2, 'ul', 'pricing-list', utils.map(items, function (props, key, i) {
                var pos = void 0,
                    offset = i - _this2.state.index;

                if (offset == 0) pos = 'curr';else if (offset < 0) pos = 'left' + Math.min(-offset, 4);else if (offset > 0) pos = 'right' + Math.min(offset, 4);

                return createVNode(2, 'li', 'pricing-item ' + pos, [createVNode(2, 'header', 'item-header', [createVNode(2, 'div', 'item-title', props.title), createVNode(2, 'div', 'item-price', [createVNode(2, 'div', 'price', props.price), createVNode(2, 'div', 'unit', props.unit)])]), createVNode(2, 'div', 'item-content', [createVNode(2, 'div', 'item-desc', props.desc), createVNode(2, 'ul', 'item-prop-list', utils.map(props.props, function (prop) {
                    return createVNode(2, 'li', 'item-prop', prop);
                }))]), createVNode(2, 'footer', 'item-footer', createVNode(2, 'button', 'btn', 'Purchase'))]);
            })), createVNode(2, 'ul', 'price-selector-list', utils.map(items, function (props, key, i) {
                return createVNode(2, 'li', 'price-selector' + (i == _this2.state.index ? ' active' : ''), null, {
                    'onClick': function onClick() {
                        return _this2.selectPriceItem(i);
                    }
                });
            }))]);
        }
    }]);

    return PricingSection;
}(Component);

/***/ }),
/* 60 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),
/* 61 */
/***/ (function(module, exports) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, '__esModule', { value: true });

var inferno = __webpack_require__(9);

/**
 * @module Inferno-Shared
 */ /** TypeDoc Comment */
/**
 * @module Inferno-Shared
 */ /** TypeDoc Comment */ var NO_OP = '$NO_OP';
var ERROR_MSG = 'a runtime error occured! Use Inferno in development environment to find the error.';
// This should be boolean and not reference to window.document
var isBrowser = !!(typeof window !== 'undefined' && window.document);
// this is MUCH faster than .constructor === Array and instanceof Array
// in Node 7 and the later versions of V8, slower in older versions though
var isArray = Array.isArray;
function isStringOrNumber(o) {
    var type = typeof o;
    return type === 'string' || type === 'number';
}
function isNullOrUndef(o) {
    return isUndefined(o) || isNull(o);
}
function isInvalid(o) {
    return isNull(o) || o === false || isTrue(o) || isUndefined(o);
}
function isFunction(o) {
    return typeof o === 'function';
}
function isNull(o) {
    return o === null;
}
function isTrue(o) {
    return o === true;
}
function isUndefined(o) {
    return o === void 0;
}
function throwError(message) {
    if (!message) {
        message = ERROR_MSG;
    }
    throw new Error(("Inferno Error: " + message));
}
function combineFrom(first, second) {
    var out = {};
    if (first) {
        for (var key in first) {
            out[key] = first[key];
        }
    }
    if (second) {
        for (var key$1 in second) {
            out[key$1] = second[key$1];
        }
    }
    return out;
}

/**
 * @module Inferno-Component
 */ /** TypeDoc Comment */
// Make sure u use EMPTY_OBJ from 'inferno', otherwise it'll be a different reference
var noOp = ERROR_MSG;
if (process.env.NODE_ENV !== 'production') {
    noOp = 'Inferno Error: Can only update a mounted or mounting component. This usually means you called setState() or forceUpdate() on an unmounted component. This is a no-op.';
}
var componentCallbackQueue = new Map();
// when a components root VNode is also a component, we can run into issues
// this will recursively look for vNode.parentNode if the VNode is a component
function updateParentComponentVNodes(vNode, dom) {
    if (vNode.flags & 28 /* Component */) {
        var parentVNode = vNode.parentVNode;
        if (parentVNode) {
            parentVNode.dom = dom;
            updateParentComponentVNodes(parentVNode, dom);
        }
    }
}
var resolvedPromise = Promise.resolve();
function addToQueue(component, force, callback) {
    var queue = componentCallbackQueue.get(component);
    if (queue === void 0) {
        queue = [];
        componentCallbackQueue.set(component, queue);
        resolvedPromise.then((function () {
            componentCallbackQueue.delete(component);
            component._updating = true;
            applyState(component, force, (function () {
                for (var i = 0, len = queue.length; i < len; i++) {
                    queue[i].call(component);
                }
            }));
            component._updating = false;
        }));
    }
    if (!isNullOrUndef(callback)) {
        queue.push(callback);
    }
}
function queueStateChanges(component, newState, callback) {
    if (isFunction(newState)) {
        newState = newState(component.state, component.props, component.context);
    }
    var pending = component._pendingState;
    if (isNullOrUndef(pending)) {
        component._pendingState = pending = newState;
    }
    else {
        for (var stateKey in newState) {
            pending[stateKey] = newState[stateKey];
        }
    }
    if (isBrowser && !component._pendingSetState && !component._blockRender) {
        if (!component._updating) {
            component._pendingSetState = true;
            component._updating = true;
            applyState(component, false, callback);
            component._updating = false;
        }
        else {
            addToQueue(component, false, callback);
        }
    }
    else {
        var state = component.state;
        if (state === null) {
            component.state = pending;
        }
        else {
            for (var key in pending) {
                state[key] = pending[key];
            }
        }
        component._pendingState = null;
        if (!isNullOrUndef(callback) && component._blockRender) {
            component._lifecycle.addListener(callback.bind(component));
        }
    }
}
function applyState(component, force, callback) {
    if (component._unmounted) {
        return;
    }
    if (force || !component._blockRender) {
        component._pendingSetState = false;
        var pendingState = component._pendingState;
        var prevState = component.state;
        var nextState = combineFrom(prevState, pendingState);
        var props = component.props;
        var context = component.context;
        component._pendingState = null;
        var nextInput = component._updateComponent(prevState, nextState, props, props, context, force, true);
        var didUpdate = true;
        if (isInvalid(nextInput)) {
            nextInput = inferno.createVNode(4096 /* Void */, null);
        }
        else if (nextInput === NO_OP) {
            nextInput = component._lastInput;
            didUpdate = false;
        }
        else if (isStringOrNumber(nextInput)) {
            nextInput = inferno.createVNode(1 /* Text */, null, null, nextInput);
        }
        else if (isArray(nextInput)) {
            if (process.env.NODE_ENV !== 'production') {
                throwError('a valid Inferno VNode (or null) must be returned from a component render. You may have returned an array or an invalid object.');
            }
            throwError();
        }
        var lastInput = component._lastInput;
        var vNode = component._vNode;
        var parentDom = (lastInput.dom && lastInput.dom.parentNode) || (lastInput.dom = vNode.dom);
        component._lastInput = nextInput;
        if (didUpdate) {
            var childContext;
            if (!isNullOrUndef(component.getChildContext)) {
                childContext = component.getChildContext();
            }
            if (isNullOrUndef(childContext)) {
                childContext = component._childContext;
            }
            else {
                childContext = combineFrom(context, childContext);
            }
            var lifeCycle = component._lifecycle;
            inferno.internal_patch(lastInput, nextInput, parentDom, lifeCycle, childContext, component._isSVG, false);
            lifeCycle.trigger();
            if (!isNullOrUndef(component.componentDidUpdate)) {
                component.componentDidUpdate(props, prevState, context);
            }
            if (!isNull(inferno.options.afterUpdate)) {
                inferno.options.afterUpdate(vNode);
            }
        }
        var dom = vNode.dom = nextInput.dom;
        if (inferno.options.findDOMNodeEnabled) {
            inferno.internal_DOMNodeMap.set(component, nextInput.dom);
        }
        updateParentComponentVNodes(vNode, dom);
    }
    else {
        component.state = component._pendingState;
        component._pendingState = null;
    }
    if (!isNullOrUndef(callback)) {
        callback.call(component);
    }
}
var alreadyWarned = false;
var Component = function Component(props, context) {
    this.state = null;
    this._blockRender = false;
    this._blockSetState = true;
    this._pendingSetState = false;
    this._pendingState = null;
    this._lastInput = null;
    this._vNode = null;
    this._unmounted = false;
    this._lifecycle = null;
    this._childContext = null;
    this._isSVG = false;
    this._updating = true;
    /** @type {object} */
    this.props = props || inferno.EMPTY_OBJ;
    /** @type {object} */
    this.context = context || inferno.EMPTY_OBJ; // context should not be mutable
};
Component.prototype.forceUpdate = function forceUpdate (callback) {
    if (this._unmounted || !isBrowser) {
        return;
    }
    applyState(this, true, callback);
};
Component.prototype.setState = function setState (newState, callback) {
    if (this._unmounted) {
        return;
    }
    if (!this._blockSetState) {
        queueStateChanges(this, newState, callback);
    }
    else {
        if (process.env.NODE_ENV !== 'production') {
            throwError('cannot update state via setState() in componentWillUpdate() or constructor.');
        }
        throwError();
    }
};
Component.prototype.setStateSync = function setStateSync (newState) {
    if (process.env.NODE_ENV !== 'production') {
        if (!alreadyWarned) {
            alreadyWarned = true;
            // tslint:disable-next-line:no-console
            console.warn('Inferno WARNING: setStateSync has been deprecated and will be removed in next release. Use setState instead.');
        }
    }
    this.setState(newState);
};
Component.prototype._updateComponent = function _updateComponent (prevState, nextState, prevProps, nextProps, context, force, fromSetState) {
    if (this._unmounted === true) {
        if (process.env.NODE_ENV !== 'production') {
            throwError(noOp);
        }
        throwError();
    }
    if ((prevProps !== nextProps || nextProps === inferno.EMPTY_OBJ) || prevState !== nextState || force) {
        if (prevProps !== nextProps || nextProps === inferno.EMPTY_OBJ) {
            if (!isNullOrUndef(this.componentWillReceiveProps) && !fromSetState) {
                // keep a copy of state before componentWillReceiveProps
                var beforeState = combineFrom(this.state);
                this._blockRender = true;
                this.componentWillReceiveProps(nextProps, context);
                this._blockRender = false;
                var afterState = this.state;
                if (beforeState !== afterState) {
                    // if state changed in componentWillReceiveProps, reassign the beforeState
                    this.state = beforeState;
                    // set the afterState as pending state so the change gets picked up below
                    this._pendingSetState = true;
                    this._pendingState = afterState;
                }
            }
            if (this._pendingSetState) {
                nextState = combineFrom(nextState, this._pendingState);
                this._pendingSetState = false;
                this._pendingState = null;
            }
        }
        /* Update if scu is not defined, or it returns truthy value or force */
        if (isNullOrUndef(this.shouldComponentUpdate) || (this.shouldComponentUpdate && this.shouldComponentUpdate(nextProps, nextState, context)) || force) {
            if (!isNullOrUndef(this.componentWillUpdate)) {
                this._blockSetState = true;
                this.componentWillUpdate(nextProps, nextState, context);
                this._blockSetState = false;
            }
            this.props = nextProps;
            this.state = nextState;
            this.context = context;
            if (inferno.options.beforeRender) {
                inferno.options.beforeRender(this);
            }
            var render = this.render(nextProps, nextState, context);
            if (inferno.options.afterRender) {
                inferno.options.afterRender(this);
            }
            return render;
        }
        else {
            this.props = nextProps;
            this.state = nextState;
            this.context = context;
        }
    }
    return NO_OP;
};
// tslint:disable-next-line:no-empty
Component.prototype.render = function render (nextProps, nextState, nextContext) { };

exports['default'] = Component;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjpudWxsLCJzb3VyY2VzIjpbbnVsbF0sInNvdXJjZXNDb250ZW50IjpbbnVsbF0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7NkJBdUY2QixDQUFBOzs7eUNBR1ksQ0FBQTs7OzthQUk1QixDQUFBOztTQUVKLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OyJ9

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(30)))

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * @module Inferno-Shared
 */ /** TypeDoc Comment */
/**
 * @module Inferno-Shared
 */ /** TypeDoc Comment */ var NO_OP = '$NO_OP';
var ERROR_MSG = 'a runtime error occured! Use Inferno in development environment to find the error.';
// This should be boolean and not reference to window.document
var isBrowser = !!(typeof window !== 'undefined' && window.document);
// this is MUCH faster than .constructor === Array and instanceof Array
// in Node 7 and the later versions of V8, slower in older versions though
var isArray = Array.isArray;
function isStatefulComponent(o) {
    return !isUndefined(o.prototype) && !isUndefined(o.prototype.render);
}
function isStringOrNumber(o) {
    var type = typeof o;
    return type === 'string' || type === 'number';
}
function isNullOrUndef(o) {
    return isUndefined(o) || isNull(o);
}
function isInvalid(o) {
    return isNull(o) || o === false || isTrue(o) || isUndefined(o);
}
function isFunction(o) {
    return typeof o === 'function';
}
function isString(o) {
    return typeof o === 'string';
}
function isNumber(o) {
    return typeof o === 'number';
}
function isNull(o) {
    return o === null;
}
function isTrue(o) {
    return o === true;
}
function isUndefined(o) {
    return o === void 0;
}
function isObject(o) {
    return typeof o === 'object';
}
function throwError(message) {
    if (!message) {
        message = ERROR_MSG;
    }
    throw new Error(("Inferno Error: " + message));
}
function warning(message) {
    // tslint:disable-next-line:no-console
    console.warn(message);
}
function combineFrom(first, second) {
    var out = {};
    if (first) {
        for (var key in first) {
            out[key] = first[key];
        }
    }
    if (second) {
        for (var key$1 in second) {
            out[key$1] = second[key$1];
        }
    }
    return out;
}
function Lifecycle() {
    this.listeners = [];
}
Lifecycle.prototype.addListener = function addListener(callback) {
    this.listeners.push(callback);
};
Lifecycle.prototype.trigger = function trigger() {
    var listeners = this.listeners;
    var listener;
    // We need to remove current listener from array when calling it, because more listeners might be added
    while (listener = listeners.shift()) {
        listener();
    }
};

/**
 * @module Inferno
 */ /** TypeDoc Comment */
var options = {
    afterMount: null,
    afterRender: null,
    afterUpdate: null,
    beforeRender: null,
    beforeUnmount: null,
    createVNode: null,
    findDOMNodeEnabled: false,
    recyclingEnabled: false,
    roots: []
};

/**
 * @module Inferno
 */ /** TypeDoc Comment */
/**
 * @module Inferno
 */ /** TypeDoc Comment */ var xlinkNS = "http://www.w3.org/1999/xlink";
var xmlNS = "http://www.w3.org/XML/1998/namespace";
var svgNS = "http://www.w3.org/2000/svg";
var strictProps = new Set();
strictProps.add("volume");
strictProps.add("defaultChecked");
var booleanProps = new Set();
booleanProps.add("muted");
booleanProps.add("scoped");
booleanProps.add("loop");
booleanProps.add("open");
booleanProps.add("checked");
booleanProps.add("default");
booleanProps.add("capture");
booleanProps.add("disabled");
booleanProps.add("readOnly");
booleanProps.add("required");
booleanProps.add("autoplay");
booleanProps.add("controls");
booleanProps.add("seamless");
booleanProps.add("reversed");
booleanProps.add("allowfullscreen");
booleanProps.add("novalidate");
booleanProps.add("hidden");
booleanProps.add("autoFocus");
booleanProps.add("selected");
var namespaces = new Map();
namespaces.set("xlink:href", xlinkNS);
namespaces.set("xlink:arcrole", xlinkNS);
namespaces.set("xlink:actuate", xlinkNS);
namespaces.set("xlink:show", xlinkNS);
namespaces.set("xlink:role", xlinkNS);
namespaces.set("xlink:title", xlinkNS);
namespaces.set("xlink:type", xlinkNS);
namespaces.set("xml:base", xmlNS);
namespaces.set("xml:lang", xmlNS);
namespaces.set("xml:space", xmlNS);
var isUnitlessNumber = new Set();
isUnitlessNumber.add("animationIterationCount");
isUnitlessNumber.add("borderImageOutset");
isUnitlessNumber.add("borderImageSlice");
isUnitlessNumber.add("borderImageWidth");
isUnitlessNumber.add("boxFlex");
isUnitlessNumber.add("boxFlexGroup");
isUnitlessNumber.add("boxOrdinalGroup");
isUnitlessNumber.add("columnCount");
isUnitlessNumber.add("flex");
isUnitlessNumber.add("flexGrow");
isUnitlessNumber.add("flexPositive");
isUnitlessNumber.add("flexShrink");
isUnitlessNumber.add("flexNegative");
isUnitlessNumber.add("flexOrder");
isUnitlessNumber.add("gridRow");
isUnitlessNumber.add("gridColumn");
isUnitlessNumber.add("fontWeight");
isUnitlessNumber.add("lineClamp");
isUnitlessNumber.add("lineHeight");
isUnitlessNumber.add("opacity");
isUnitlessNumber.add("order");
isUnitlessNumber.add("orphans");
isUnitlessNumber.add("tabSize");
isUnitlessNumber.add("widows");
isUnitlessNumber.add("zIndex");
isUnitlessNumber.add("zoom");
isUnitlessNumber.add("fillOpacity");
isUnitlessNumber.add("floodOpacity");
isUnitlessNumber.add("stopOpacity");
isUnitlessNumber.add("strokeDasharray");
isUnitlessNumber.add("strokeDashoffset");
isUnitlessNumber.add("strokeMiterlimit");
isUnitlessNumber.add("strokeOpacity");
isUnitlessNumber.add("strokeWidth");
var skipProps = new Set();
skipProps.add("children");
skipProps.add("childrenType");
skipProps.add("defaultValue");
skipProps.add("ref");
skipProps.add("key");
skipProps.add("checked");
skipProps.add("multiple");
var delegatedEvents = new Set();
delegatedEvents.add("onClick");
delegatedEvents.add("onMouseDown");
delegatedEvents.add("onMouseUp");
delegatedEvents.add("onMouseMove");
delegatedEvents.add("onSubmit");
delegatedEvents.add("onDblClick");
delegatedEvents.add("onKeyDown");
delegatedEvents.add("onKeyUp");
delegatedEvents.add("onKeyPress");

/**
 * @module Inferno
 */ /** TypeDoc Comment */
var isiOS = isBrowser && !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
var delegatedEvents$1 = new Map();
function handleEvent(name, lastEvent, nextEvent, dom) {
    var delegatedRoots = delegatedEvents$1.get(name);
    if (nextEvent) {
        if (!delegatedRoots) {
            delegatedRoots = { items: new Map(), docEvent: null };
            delegatedRoots.docEvent = attachEventToDocument(name, delegatedRoots);
            delegatedEvents$1.set(name, delegatedRoots);
        }
        if (!lastEvent) {
            if (isiOS && name === 'onClick') {
                trapClickOnNonInteractiveElement(dom);
            }
        }
        delegatedRoots.items.set(dom, nextEvent);
    }
    else if (delegatedRoots) {
        var items = delegatedRoots.items;
        if (items.delete(dom)) {
            // If any items were deleted, check if listener need to be removed
            if (items.size === 0) {
                document.removeEventListener(normalizeEventName(name), delegatedRoots.docEvent);
                delegatedEvents$1.delete(name);
            }
        }
    }
}
function dispatchEvent(event, target, items, count, isClick, eventData) {
    var eventsToTrigger = items.get(target);
    if (eventsToTrigger) {
        count--;
        // linkEvent object
        eventData.dom = target;
        if (eventsToTrigger.event) {
            eventsToTrigger.event(eventsToTrigger.data, event);
        }
        else {
            eventsToTrigger(event);
        }
        if (event.cancelBubble) {
            return;
        }
    }
    if (count > 0) {
        var parentDom = target.parentNode;
        // Html Nodes can be nested fe: span inside button in that scenario browser does not handle disabled attribute on parent,
        // because the event listener is on document.body
        // Don't process clicks on disabled elements
        if (parentDom === null || (isClick && parentDom.nodeType === 1 && parentDom.disabled)) {
            return;
        }
        dispatchEvent(event, parentDom, items, count, isClick, eventData);
    }
}
function normalizeEventName(name) {
    return name.substr(2).toLowerCase();
}
function stopPropagation() {
    this.cancelBubble = true;
    this.stopImmediatePropagation();
}
function attachEventToDocument(name, delegatedRoots) {
    var docEvent = function (event) {
        var count = delegatedRoots.items.size;
        if (count > 0) {
            event.stopPropagation = stopPropagation;
            // Event data needs to be object to save reference to currentTarget getter
            var eventData = {
                dom: document
            };
            try {
                Object.defineProperty(event, 'currentTarget', {
                    configurable: true,
                    get: function get() {
                        return eventData.dom;
                    }
                });
            }
            catch (e) { }
            dispatchEvent(event, event.target, delegatedRoots.items, count, event.type === 'click', eventData);
        }
    };
    document.addEventListener(normalizeEventName(name), docEvent);
    return docEvent;
}
// tslint:disable-next-line:no-empty
function emptyFn() { }
function trapClickOnNonInteractiveElement(dom) {
    // Mobile Safari does not fire properly bubble click events on
    // non-interactive elements, which means delegated click listeners do not
    // fire. The workaround for this bug involves attaching an empty click
    // listener on the target node.
    // http://www.quirksmode.org/blog/archives/2010/09/click_event_del.html
    // Just set it using the onclick property so that we don't have to manage any
    // bookkeeping for it. Not sure if we need to clear it when the listener is
    // removed.
    // TODO: Only do this for the relevant Safaris maybe?
    dom.onclick = emptyFn;
}

/**
 * @module Inferno
 */ /** TypeDoc Comment */
function isCheckedType(type) {
    return type === 'checkbox' || type === 'radio';
}
function onTextInputChange(e) {
    var vNode = this.vNode;
    var props = vNode.props || EMPTY_OBJ;
    var dom = vNode.dom;
    var previousValue = props.value;
    if (props.onInput) {
        var event = props.onInput;
        if (event.event) {
            event.event(event.data, e);
        }
        else {
            event(e);
        }
    }
    else if (props.oninput) {
        props.oninput(e);
    }
    // the user may have updated the vNode from the above onInput events syncronously
    // so we need to get it from the context of `this` again
    var newVNode = this.vNode;
    var newProps = newVNode.props || EMPTY_OBJ;
    // If render is going async there is no value change yet, it will come back to process input soon
    if (previousValue !== newProps.value) {
        // When this happens we need to store current cursor position and restore it, to avoid jumping
        applyValue(newProps, dom);
    }
}
function wrappedOnChange(e) {
    var props = this.vNode.props || EMPTY_OBJ;
    var event = props.onChange;
    if (event.event) {
        event.event(event.data, e);
    }
    else {
        event(e);
    }
}
function onCheckboxChange(e) {
    e.stopPropagation(); // This click should not propagate its for internal use
    var vNode = this.vNode;
    var props = vNode.props || EMPTY_OBJ;
    var dom = vNode.dom;
    if (props.onClick) {
        var event = props.onClick;
        if (event.event) {
            event.event(event.data, e);
        }
        else {
            event(e);
        }
    }
    else if (props.onclick) {
        props.onclick(e);
    }
    // the user may have updated the vNode from the above onInput events syncronously
    // so we need to get it from the context of `this` again
    var newVNode = this.vNode;
    var newProps = newVNode.props || EMPTY_OBJ;
    // If render is going async there is no value change yet, it will come back to process input soon
    applyValue(newProps, dom);
}
function processInput(vNode, dom, nextPropsOrEmpty, mounting, isControlled) {
    applyValue(nextPropsOrEmpty, dom);
    if (isControlled) {
        dom.vNode = vNode; // TODO: Remove this when implementing Fiber's
        if (mounting) {
            if (isCheckedType(nextPropsOrEmpty.type)) {
                dom.onclick = onCheckboxChange;
                dom.onclick.wrapped = true;
            }
            else {
                dom.oninput = onTextInputChange;
                dom.oninput.wrapped = true;
            }
            if (nextPropsOrEmpty.onChange) {
                dom.onchange = wrappedOnChange;
                dom.onchange.wrapped = true;
            }
        }
    }
}
function applyValue(nextPropsOrEmpty, dom) {
    var type = nextPropsOrEmpty.type;
    var value = nextPropsOrEmpty.value;
    var checked = nextPropsOrEmpty.checked;
    var multiple = nextPropsOrEmpty.multiple;
    var defaultValue = nextPropsOrEmpty.defaultValue;
    var hasValue = !isNullOrUndef(value);
    if (type && type !== dom.type) {
        dom.setAttribute('type', type);
    }
    if (multiple && multiple !== dom.multiple) {
        dom.multiple = multiple;
    }
    if (!isNullOrUndef(defaultValue) && !hasValue) {
        dom.defaultValue = defaultValue + '';
    }
    if (isCheckedType(type)) {
        if (hasValue) {
            dom.value = value;
        }
        if (!isNullOrUndef(checked)) {
            dom.checked = checked;
        }
    }
    else {
        if (hasValue && dom.value !== value) {
            dom.defaultValue = value;
            dom.value = value;
        }
        else if (!isNullOrUndef(checked)) {
            dom.checked = checked;
        }
    }
}

/**
 * @module Inferno
 */ /** TypeDoc Comment */
function updateChildOptionGroup(vNode, value) {
    var type = vNode.type;
    if (type === 'optgroup') {
        var children = vNode.children;
        if (isArray(children)) {
            for (var i = 0, len = children.length; i < len; i++) {
                updateChildOption(children[i], value);
            }
        }
        else if (isVNode(children)) {
            updateChildOption(children, value);
        }
    }
    else {
        updateChildOption(vNode, value);
    }
}
function updateChildOption(vNode, value) {
    var props = vNode.props || EMPTY_OBJ;
    var dom = vNode.dom;
    // we do this as multiple may have changed
    dom.value = props.value;
    if ((isArray(value) && value.indexOf(props.value) !== -1) || props.value === value) {
        dom.selected = true;
    }
    else if (!isNullOrUndef(value) || !isNullOrUndef(props.selected)) {
        dom.selected = props.selected || false;
    }
}
function onSelectChange(e) {
    var vNode = this.vNode;
    var props = vNode.props || EMPTY_OBJ;
    var dom = vNode.dom;
    var previousValue = props.value;
    if (props.onChange) {
        var event = props.onChange;
        if (event.event) {
            event.event(event.data, e);
        }
        else {
            event(e);
        }
    }
    else if (props.onchange) {
        props.onchange(e);
    }
    // the user may have updated the vNode from the above onInput events syncronously
    // so we need to get it from the context of `this` again
    var newVNode = this.vNode;
    var newProps = newVNode.props || EMPTY_OBJ;
    // If render is going async there is no value change yet, it will come back to process input soon
    if (previousValue !== newProps.value) {
        // When this happens we need to store current cursor position and restore it, to avoid jumping
        applyValue$1(newVNode, dom, newProps, false);
    }
}
function processSelect(vNode, dom, nextPropsOrEmpty, mounting, isControlled) {
    applyValue$1(vNode, dom, nextPropsOrEmpty, mounting);
    if (isControlled) {
        dom.vNode = vNode; // TODO: Remove this when implementing Fiber's
        if (mounting) {
            dom.onchange = onSelectChange;
            dom.onchange.wrapped = true;
        }
    }
}
function applyValue$1(vNode, dom, nextPropsOrEmpty, mounting) {
    if (nextPropsOrEmpty.multiple !== dom.multiple) {
        dom.multiple = nextPropsOrEmpty.multiple;
    }
    var children = vNode.children;
    if (!isInvalid(children)) {
        var value = nextPropsOrEmpty.value;
        if (mounting && isNullOrUndef(value)) {
            value = nextPropsOrEmpty.defaultValue;
        }
        if (isArray(children)) {
            for (var i = 0, len = children.length; i < len; i++) {
                updateChildOptionGroup(children[i], value);
            }
        }
        else if (isVNode(children)) {
            updateChildOptionGroup(children, value);
        }
    }
}

/**
 * @module Inferno
 */ /** TypeDoc Comment */
function wrappedOnChange$1(e) {
    var props = this.vNode.props || EMPTY_OBJ;
    var event = props.onChange;
    if (event.event) {
        event.event(event.data, e);
    }
    else {
        event(e);
    }
}
function onTextareaInputChange(e) {
    var vNode = this.vNode;
    var props = vNode.props || EMPTY_OBJ;
    var previousValue = props.value;
    if (props.onInput) {
        var event = props.onInput;
        if (event.event) {
            event.event(event.data, e);
        }
        else {
            event(e);
        }
    }
    else if (props.oninput) {
        props.oninput(e);
    }
    // the user may have updated the vNode from the above onInput events syncronously
    // so we need to get it from the context of `this` again
    var newVNode = this.vNode;
    var newProps = newVNode.props || EMPTY_OBJ;
    // If render is going async there is no value change yet, it will come back to process input soon
    if (previousValue !== newProps.value) {
        // When this happens we need to store current cursor position and restore it, to avoid jumping
        applyValue$2(newVNode, vNode.dom, false);
    }
}
function processTextarea(vNode, dom, nextPropsOrEmpty, mounting, isControlled) {
    applyValue$2(nextPropsOrEmpty, dom, mounting);
    if (isControlled) {
        dom.vNode = vNode; // TODO: Remove this when implementing Fiber's
        if (mounting) {
            dom.oninput = onTextareaInputChange;
            dom.oninput.wrapped = true;
            if (nextPropsOrEmpty.onChange) {
                dom.onchange = wrappedOnChange$1;
                dom.onchange.wrapped = true;
            }
        }
    }
}
function applyValue$2(nextPropsOrEmpty, dom, mounting) {
    var value = nextPropsOrEmpty.value;
    var domValue = dom.value;
    if (isNullOrUndef(value)) {
        if (mounting) {
            var defaultValue = nextPropsOrEmpty.defaultValue;
            if (!isNullOrUndef(defaultValue)) {
                if (defaultValue !== domValue) {
                    dom.defaultValue = defaultValue;
                    dom.value = defaultValue;
                }
            }
            else if (domValue !== '') {
                dom.defaultValue = '';
                dom.value = '';
            }
        }
    }
    else {
        /* There is value so keep it controlled */
        if (domValue !== value) {
            dom.defaultValue = value;
            dom.value = value;
        }
    }
}

/**
 * @module Inferno
 */ /** TypeDoc Comment */
/**
 * There is currently no support for switching same input between controlled and nonControlled
 * If that ever becomes a real issue, then re design controlled elements
 * Currently user must choose either controlled or non-controlled and stick with that
 */
function processElement(flags, vNode, dom, nextPropsOrEmpty, mounting, isControlled) {
    if (flags & 512 /* InputElement */) {
        processInput(vNode, dom, nextPropsOrEmpty, mounting, isControlled);
    }
    if (flags & 2048 /* SelectElement */) {
        processSelect(vNode, dom, nextPropsOrEmpty, mounting, isControlled);
    }
    if (flags & 1024 /* TextareaElement */) {
        processTextarea(vNode, dom, nextPropsOrEmpty, mounting, isControlled);
    }
}
function isControlledFormElement(nextPropsOrEmpty) {
    return (nextPropsOrEmpty.type && isCheckedType(nextPropsOrEmpty.type)) ? !isNullOrUndef(nextPropsOrEmpty.checked) : !isNullOrUndef(nextPropsOrEmpty.value);
}

/**
 * @module Inferno
 */ /** TypeDoc Comment */
function normalizeChildNodes(parentDom) {
    var dom = parentDom.firstChild;
    while (dom) {
        if (dom.nodeType === 8) {
            if (dom.data === "!") {
                var placeholder = document.createTextNode("");
                parentDom.replaceChild(placeholder, dom);
                dom = dom.nextSibling;
            }
            else {
                var lastDom = dom.previousSibling;
                parentDom.removeChild(dom);
                dom = lastDom || parentDom.firstChild;
            }
        }
        else {
            dom = dom.nextSibling;
        }
    }
}
function hydrateComponent(vNode, dom, lifecycle, context, isSVG, isClass) {
    var type = vNode.type;
    var ref = vNode.ref;
    vNode.dom = dom;
    var props = vNode.props || EMPTY_OBJ;
    if (isClass) {
        var _isSVG = dom.namespaceURI === svgNS;
        var instance = createClassComponentInstance(vNode, type, props, context, _isSVG, lifecycle);
        var input = instance._lastInput;
        instance._vNode = vNode;
        hydrate(input, dom, lifecycle, instance._childContext, _isSVG);
        mountClassComponentCallbacks(vNode, ref, instance, lifecycle);
        instance._updating = false; // Mount finished allow going sync
        if (options.findDOMNodeEnabled) {
            componentToDOMNodeMap.set(instance, dom);
        }
    }
    else {
        var input$1 = createFunctionalComponentInput(vNode, type, props, context);
        hydrate(input$1, dom, lifecycle, context, isSVG);
        vNode.children = input$1;
        vNode.dom = input$1.dom;
        mountFunctionalComponentCallbacks(ref, dom, lifecycle);
    }
    return dom;
}
function hydrateElement(vNode, dom, lifecycle, context, isSVG) {
    var children = vNode.children;
    var props = vNode.props;
    var className = vNode.className;
    var flags = vNode.flags;
    var ref = vNode.ref;
    isSVG = isSVG || (flags & 128 /* SvgElement */) > 0;
    if (dom.nodeType !== 1 || dom.tagName.toLowerCase() !== vNode.type) {
        if (process.env.NODE_ENV !== "production") {
            warning("Inferno hydration: Server-side markup doesn't match client-side markup or Initial render target is not empty");
        }
        var newDom = mountElement(vNode, null, lifecycle, context, isSVG);
        vNode.dom = newDom;
        replaceChild(dom.parentNode, newDom, dom);
        return newDom;
    }
    vNode.dom = dom;
    if (children) {
        hydrateChildren(children, dom, lifecycle, context, isSVG);
    }
    else if (dom.firstChild !== null) {
        dom.textContent = ""; // dom has content, but VNode has no children remove everything from DOM
    }
    if (props) {
        var hasControlledValue = false;
        var isFormElement = (flags & 3584 /* FormElement */) > 0;
        if (isFormElement) {
            hasControlledValue = isControlledFormElement(props);
        }
        for (var prop in props) {
            // do not add a hasOwnProperty check here, it affects performance
            patchProp(prop, null, props[prop], dom, isSVG, hasControlledValue);
        }
        if (isFormElement) {
            processElement(flags, vNode, dom, props, true, hasControlledValue);
        }
    }
    if (!isNullOrUndef(className)) {
        if (isSVG) {
            dom.setAttribute("class", className);
        }
        else {
            dom.className = className;
        }
    }
    else {
        if (dom.className !== "") {
            dom.removeAttribute("class");
        }
    }
    if (ref) {
        mountRef(dom, ref, lifecycle);
    }
    return dom;
}
function hydrateChildren(children, parentDom, lifecycle, context, isSVG) {
    normalizeChildNodes(parentDom);
    var dom = parentDom.firstChild;
    if (isStringOrNumber(children)) {
        if (!isNull(dom) && dom.nodeType === 3) {
            if (dom.nodeValue !== children) {
                dom.nodeValue = children;
            }
        }
        else if (children) {
            parentDom.textContent = children;
        }
        if (!isNull(dom)) {
            dom = dom.nextSibling;
        }
    }
    else if (isArray(children)) {
        for (var i = 0, len = children.length; i < len; i++) {
            var child = children[i];
            if (!isNull(child) && isObject(child)) {
                if (!isNull(dom)) {
                    var nextSibling = dom.nextSibling;
                    hydrate(child, dom, lifecycle, context, isSVG);
                    dom = nextSibling;
                }
                else {
                    mount(child, parentDom, lifecycle, context, isSVG);
                }
            }
        }
    }
    else {
        // It's VNode
        if (!isNull(dom)) {
            hydrate(children, dom, lifecycle, context, isSVG);
            dom = dom.nextSibling;
        }
        else {
            mount(children, parentDom, lifecycle, context, isSVG);
        }
    }
    // clear any other DOM nodes, there should be only a single entry for the root
    while (dom) {
        var nextSibling$1 = dom.nextSibling;
        parentDom.removeChild(dom);
        dom = nextSibling$1;
    }
}
function hydrateText(vNode, dom) {
    if (dom.nodeType !== 3) {
        var newDom = mountText(vNode, null);
        vNode.dom = newDom;
        replaceChild(dom.parentNode, newDom, dom);
        return newDom;
    }
    var text = vNode.children;
    if (dom.nodeValue !== text) {
        dom.nodeValue = text;
    }
    vNode.dom = dom;
    return dom;
}
function hydrateVoid(vNode, dom) {
    vNode.dom = dom;
    return dom;
}
function hydrate(vNode, dom, lifecycle, context, isSVG) {
    var flags = vNode.flags;
    if (flags & 28 /* Component */) {
        hydrateComponent(vNode, dom, lifecycle, context, isSVG, (flags & 4 /* ComponentClass */) > 0);
    }
    else if (flags & 3970 /* Element */) {
        hydrateElement(vNode, dom, lifecycle, context, isSVG);
    }
    else if (flags & 1 /* Text */) {
        hydrateText(vNode, dom);
    }
    else if (flags & 4096 /* Void */) {
        hydrateVoid(vNode, dom);
    }
    else {
        if (process.env.NODE_ENV !== "production") {
            throwError(("hydrate() expects a valid VNode, instead it received an object with the type \"" + (typeof vNode) + "\"."));
        }
        throwError();
    }
}
function hydrateRoot(input, parentDom, lifecycle) {
    if (!isNull(parentDom)) {
        var dom = parentDom.firstChild;
        if (!isNull(dom)) {
            hydrate(input, dom, lifecycle, EMPTY_OBJ, false);
            dom = parentDom.firstChild;
            // clear any other DOM nodes, there should be only a single entry for the root
            while ((dom = dom.nextSibling)) {
                parentDom.removeChild(dom);
            }
            return true;
        }
    }
    return false;
}

/**
 * @module Inferno
 */ /** TypeDoc Comment */
var componentPools = new Map();
var elementPools = new Map();
function recycleElement(vNode, lifecycle, context, isSVG) {
    var tag = vNode.type;
    var pools = elementPools.get(tag);
    if (!isUndefined(pools)) {
        var key = vNode.key;
        var pool = key === null ? pools.nonKeyed : pools.keyed.get(key);
        if (!isUndefined(pool)) {
            var recycledVNode = pool.pop();
            if (!isUndefined(recycledVNode)) {
                patchElement(recycledVNode, vNode, null, lifecycle, context, isSVG, true);
                return vNode.dom;
            }
        }
    }
    return null;
}
function poolElement(vNode) {
    var tag = vNode.type;
    var key = vNode.key;
    var pools = elementPools.get(tag);
    if (isUndefined(pools)) {
        pools = {
            keyed: new Map(),
            nonKeyed: []
        };
        elementPools.set(tag, pools);
    }
    if (isNull(key)) {
        pools.nonKeyed.push(vNode);
    }
    else {
        var pool = pools.keyed.get(key);
        if (isUndefined(pool)) {
            pool = [];
            pools.keyed.set(key, pool);
        }
        pool.push(vNode);
    }
}
function recycleComponent(vNode, lifecycle, context, isSVG) {
    var type = vNode.type;
    var pools = componentPools.get(type);
    if (!isUndefined(pools)) {
        var key = vNode.key;
        var pool = key === null ? pools.nonKeyed : pools.keyed.get(key);
        if (!isUndefined(pool)) {
            var recycledVNode = pool.pop();
            if (!isUndefined(recycledVNode)) {
                var flags = vNode.flags;
                var failed = patchComponent(recycledVNode, vNode, null, lifecycle, context, isSVG, (flags & 4 /* ComponentClass */) > 0, true);
                if (!failed) {
                    return vNode.dom;
                }
            }
        }
    }
    return null;
}
function poolComponent(vNode) {
    var hooks = vNode.ref;
    var nonRecycleHooks = hooks &&
        (hooks.onComponentWillMount ||
            hooks.onComponentWillUnmount ||
            hooks.onComponentDidMount ||
            hooks.onComponentWillUpdate ||
            hooks.onComponentDidUpdate);
    if (nonRecycleHooks) {
        return;
    }
    var type = vNode.type;
    var key = vNode.key;
    var pools = componentPools.get(type);
    if (isUndefined(pools)) {
        pools = {
            keyed: new Map(),
            nonKeyed: []
        };
        componentPools.set(type, pools);
    }
    if (isNull(key)) {
        pools.nonKeyed.push(vNode);
    }
    else {
        var pool = pools.keyed.get(key);
        if (isUndefined(pool)) {
            pool = [];
            pools.keyed.set(key, pool);
        }
        pool.push(vNode);
    }
}

/**
 * @module Inferno
 */ /** TypeDoc Comment */
function unmount(vNode, parentDom, lifecycle, canRecycle, isRecycling) {
    var flags = vNode.flags;
    if (flags & 28 /* Component */) {
        unmountComponent(vNode, parentDom, lifecycle, canRecycle, isRecycling);
    }
    else if (flags & 3970 /* Element */) {
        unmountElement(vNode, parentDom, lifecycle, canRecycle, isRecycling);
    }
    else if (flags & (1 /* Text */ | 4096 /* Void */)) {
        unmountVoidOrText(vNode, parentDom);
    }
}
function unmountVoidOrText(vNode, parentDom) {
    if (!isNull(parentDom)) {
        removeChild(parentDom, vNode.dom);
    }
}
function unmountComponent(vNode, parentDom, lifecycle, canRecycle, isRecycling) {
    var instance = vNode.children;
    var flags = vNode.flags;
    var isStatefulComponent$$1 = flags & 4;
    var ref = vNode.ref;
    var dom = vNode.dom;
    if (!isRecycling) {
        if (isStatefulComponent$$1) {
            if (!instance._unmounted) {
                if (!isNull(options.beforeUnmount)) {
                    options.beforeUnmount(vNode);
                }
                if (!isUndefined(instance.componentWillUnmount)) {
                    instance.componentWillUnmount();
                }
                if (ref && !isRecycling) {
                    ref(null);
                }
                instance._unmounted = true;
                if (options.findDOMNodeEnabled) {
                    componentToDOMNodeMap.delete(instance);
                }
                unmount(instance._lastInput, null, instance._lifecycle, false, isRecycling);
            }
        }
        else {
            if (!isNullOrUndef(ref)) {
                if (!isNullOrUndef(ref.onComponentWillUnmount)) {
                    ref.onComponentWillUnmount(dom);
                }
            }
            unmount(instance, null, lifecycle, false, isRecycling);
        }
    }
    if (parentDom) {
        var lastInput = instance._lastInput;
        if (isNullOrUndef(lastInput)) {
            lastInput = instance;
        }
        removeChild(parentDom, dom);
    }
    if (options.recyclingEnabled &&
        !isStatefulComponent$$1 &&
        (parentDom || canRecycle)) {
        poolComponent(vNode);
    }
}
function unmountElement(vNode, parentDom, lifecycle, canRecycle, isRecycling) {
    var dom = vNode.dom;
    var ref = vNode.ref;
    var props = vNode.props;
    if (ref && !isRecycling) {
        unmountRef(ref);
    }
    var children = vNode.children;
    if (!isNullOrUndef(children)) {
        unmountChildren$1(children, lifecycle, isRecycling);
    }
    if (!isNull(props)) {
        for (var name in props) {
            // do not add a hasOwnProperty check here, it affects performance
            if (props[name] !== null && isAttrAnEvent(name)) {
                patchEvent(name, props[name], null, dom);
                // We need to set this null, because same props otherwise come back if SCU returns false and we are recyling
                props[name] = null;
            }
        }
    }
    if (!isNull(parentDom)) {
        removeChild(parentDom, dom);
    }
    if (options.recyclingEnabled && (parentDom || canRecycle)) {
        poolElement(vNode);
    }
}
function unmountChildren$1(children, lifecycle, isRecycling) {
    if (isArray(children)) {
        for (var i = 0, len = children.length; i < len; i++) {
            var child = children[i];
            if (!isInvalid(child) && isObject(child)) {
                unmount(child, null, lifecycle, false, isRecycling);
            }
        }
    }
    else if (isObject(children)) {
        unmount(children, null, lifecycle, false, isRecycling);
    }
}
function unmountRef(ref) {
    if (isFunction(ref)) {
        ref(null);
    }
    else {
        if (isInvalid(ref)) {
            return;
        }
        if (process.env.NODE_ENV !== "production") {
            throwError('string "refs" are not supported in Inferno 1.0. Use callback "refs" instead.');
        }
        throwError();
    }
}

/**
 * @module Inferno
 */ /** TypeDoc Comment */
// rather than use a Map, like we did before, we can use an array here
// given there shouldn't be THAT many roots on the page, the difference
// in performance is huge: https://esbench.com/bench/5802a691330ab09900a1a2da
var componentToDOMNodeMap = new Map();
var roots = options.roots;
/**
 * When inferno.options.findDOMNOdeEnabled is true, this function will return DOM Node by component instance
 * @param ref Component instance
 * @returns {*|null} returns dom node
 */
function findDOMNode(ref) {
    if (!options.findDOMNodeEnabled) {
        if (process.env.NODE_ENV !== "production") {
            throwError("findDOMNode() has been disabled, use Inferno.options.findDOMNodeEnabled = true; enabled findDOMNode(). Warning this can significantly impact performance!");
        }
        throwError();
    }
    var dom = ref && ref.nodeType ? ref : null;
    return componentToDOMNodeMap.get(ref) || dom;
}
function getRoot(dom) {
    for (var i = 0, len = roots.length; i < len; i++) {
        var root = roots[i];
        if (root.dom === dom) {
            return root;
        }
    }
    return null;
}
function setRoot(dom, input, lifecycle) {
    var root = {
        dom: dom,
        input: input,
        lifecycle: lifecycle
    };
    roots.push(root);
    return root;
}
function removeRoot(root) {
    for (var i = 0, len = roots.length; i < len; i++) {
        if (roots[i] === root) {
            roots.splice(i, 1);
            return;
        }
    }
}
if (process.env.NODE_ENV !== "production") {
    if (isBrowser && document.body === null) {
        warning('Inferno warning: you cannot initialize inferno without "document.body". Wait on "DOMContentLoaded" event, add script to bottom of body, or use async/defer attributes on script tag.');
    }
}
var documentBody = isBrowser ? document.body : null;
/**
 * Renders virtual node tree into parent node.
 * @param {VNode | null | string | number} input vNode to be rendered
 * @param parentDom DOM node which content will be replaced by virtual node
 * @returns {InfernoChildren} rendered virtual node
 */
function render(input, parentDom) {
    if (documentBody === parentDom) {
        if (process.env.NODE_ENV !== "production") {
            throwError('you cannot render() to the "document.body". Use an empty element as a container instead.');
        }
        throwError();
    }
    if (input === NO_OP) {
        return;
    }
    var root = getRoot(parentDom);
    if (isNull(root)) {
        var lifecycle = new Lifecycle();
        if (!isInvalid(input)) {
            if (input.dom) {
                input = directClone(input);
            }
            if (!hydrateRoot(input, parentDom, lifecycle)) {
                mount(input, parentDom, lifecycle, EMPTY_OBJ, false);
            }
            root = setRoot(parentDom, input, lifecycle);
            lifecycle.trigger();
        }
    }
    else {
        var lifecycle$1 = root.lifecycle;
        lifecycle$1.listeners = [];
        if (isNullOrUndef(input)) {
            unmount(root.input, parentDom, lifecycle$1, false, false);
            removeRoot(root);
        }
        else {
            if (input.dom) {
                input = directClone(input);
            }
            patch(root.input, input, parentDom, lifecycle$1, EMPTY_OBJ, false, false);
        }
        root.input = input;
        lifecycle$1.trigger();
    }
    if (root) {
        var rootInput = root.input;
        if (rootInput && rootInput.flags & 28 /* Component */) {
            return rootInput.children;
        }
    }
}
function createRenderer(parentDom) {
    return function renderer(lastInput, nextInput) {
        if (!parentDom) {
            parentDom = lastInput;
        }
        render(nextInput, parentDom);
    };
}

/**
 * @module Inferno
 */ /** TypeDoc Comment */
function patch(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isRecycling) {
    if (lastVNode !== nextVNode) {
        var lastFlags = lastVNode.flags;
        var nextFlags = nextVNode.flags;
        if (nextFlags & 28 /* Component */) {
            var isClass = (nextFlags & 4 /* ComponentClass */) > 0;
            if (lastFlags & 28 /* Component */) {
                patchComponent(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isClass, isRecycling);
            }
            else {
                replaceVNode(parentDom, mountComponent(nextVNode, null, lifecycle, context, isSVG, isClass), lastVNode, lifecycle, isRecycling);
            }
        }
        else if (nextFlags & 3970 /* Element */) {
            if (lastFlags & 3970 /* Element */) {
                patchElement(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isRecycling);
            }
            else {
                replaceVNode(parentDom, mountElement(nextVNode, null, lifecycle, context, isSVG), lastVNode, lifecycle, isRecycling);
            }
        }
        else if (nextFlags & 1 /* Text */) {
            if (lastFlags & 1 /* Text */) {
                patchText(lastVNode, nextVNode);
            }
            else {
                replaceVNode(parentDom, mountText(nextVNode, null), lastVNode, lifecycle, isRecycling);
            }
        }
        else if (nextFlags & 4096 /* Void */) {
            if (lastFlags & 4096 /* Void */) {
                patchVoid(lastVNode, nextVNode);
            }
            else {
                replaceVNode(parentDom, mountVoid(nextVNode, null), lastVNode, lifecycle, isRecycling);
            }
        }
        else {
            // Error case: mount new one replacing old one
            replaceLastChildAndUnmount(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isRecycling);
        }
    }
}
function unmountChildren(children, dom, lifecycle, isRecycling) {
    if (isVNode(children)) {
        unmount(children, dom, lifecycle, true, isRecycling);
    }
    else if (isArray(children)) {
        removeAllChildren(dom, children, lifecycle, isRecycling);
    }
    else {
        dom.textContent = "";
    }
}
function patchElement(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isRecycling) {
    var nextTag = nextVNode.type;
    var lastTag = lastVNode.type;
    if (lastTag !== nextTag) {
        replaceWithNewNode(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isRecycling);
    }
    else {
        var dom = lastVNode.dom;
        var lastProps = lastVNode.props;
        var nextProps = nextVNode.props;
        var lastChildren = lastVNode.children;
        var nextChildren = nextVNode.children;
        var lastFlags = lastVNode.flags;
        var nextFlags = nextVNode.flags;
        var nextRef = nextVNode.ref;
        var lastClassName = lastVNode.className;
        var nextClassName = nextVNode.className;
        nextVNode.dom = dom;
        isSVG = isSVG || (nextFlags & 128 /* SvgElement */) > 0;
        if (lastChildren !== nextChildren) {
            var childrenIsSVG = isSVG === true && nextVNode.type !== "foreignObject";
            patchChildren(lastFlags, nextFlags, lastChildren, nextChildren, dom, lifecycle, context, childrenIsSVG, isRecycling);
        }
        // inlined patchProps  -- starts --
        if (lastProps !== nextProps) {
            var lastPropsOrEmpty = lastProps || EMPTY_OBJ;
            var nextPropsOrEmpty = nextProps || EMPTY_OBJ;
            var hasControlledValue = false;
            if (nextPropsOrEmpty !== EMPTY_OBJ) {
                var isFormElement = (nextFlags & 3584 /* FormElement */) > 0;
                if (isFormElement) {
                    hasControlledValue = isControlledFormElement(nextPropsOrEmpty);
                }
                for (var prop in nextPropsOrEmpty) {
                    // do not add a hasOwnProperty check here, it affects performance
                    var nextValue = nextPropsOrEmpty[prop];
                    var lastValue = lastPropsOrEmpty[prop];
                    patchProp(prop, lastValue, nextValue, dom, isSVG, hasControlledValue);
                }
                if (isFormElement) {
                    // When inferno is recycling form element, we need to process it like it would be mounting
                    processElement(nextFlags, nextVNode, dom, nextPropsOrEmpty, isRecycling, hasControlledValue);
                }
            }
            if (lastPropsOrEmpty !== EMPTY_OBJ) {
                for (var prop$1 in lastPropsOrEmpty) {
                    // do not add a hasOwnProperty check here, it affects performance
                    if (isNullOrUndef(nextPropsOrEmpty[prop$1]) &&
                        !isNullOrUndef(lastPropsOrEmpty[prop$1])) {
                        removeProp(prop$1, lastPropsOrEmpty[prop$1], dom, nextFlags);
                    }
                }
            }
        }
        // inlined patchProps  -- ends --
        if (lastClassName !== nextClassName) {
            if (isNullOrUndef(nextClassName)) {
                dom.removeAttribute("class");
            }
            else {
                if (isSVG) {
                    dom.setAttribute("class", nextClassName);
                }
                else {
                    dom.className = nextClassName;
                }
            }
        }
        if (nextRef) {
            if (lastVNode.ref !== nextRef || isRecycling) {
                mountRef(dom, nextRef, lifecycle);
            }
        }
    }
}
function patchChildren(lastFlags, nextFlags, lastChildren, nextChildren, dom, lifecycle, context, isSVG, isRecycling) {
    var patchArray = false;
    var patchKeyed = false;
    if (nextFlags & 64 /* HasNonKeyedChildren */) {
        patchArray = true;
    }
    else if ((lastFlags & 32 /* HasKeyedChildren */) > 0 &&
        (nextFlags & 32 /* HasKeyedChildren */) > 0) {
        patchKeyed = true;
        patchArray = true;
    }
    else if (isInvalid(nextChildren)) {
        unmountChildren(lastChildren, dom, lifecycle, isRecycling);
    }
    else if (isInvalid(lastChildren)) {
        if (isStringOrNumber(nextChildren)) {
            setTextContent(dom, nextChildren);
        }
        else {
            if (isArray(nextChildren)) {
                mountArrayChildren(nextChildren, dom, lifecycle, context, isSVG);
            }
            else {
                mount(nextChildren, dom, lifecycle, context, isSVG);
            }
        }
    }
    else if (isStringOrNumber(nextChildren)) {
        if (isStringOrNumber(lastChildren)) {
            updateTextContent(dom, nextChildren);
        }
        else {
            unmountChildren(lastChildren, dom, lifecycle, isRecycling);
            setTextContent(dom, nextChildren);
        }
    }
    else if (isArray(nextChildren)) {
        if (isArray(lastChildren)) {
            patchArray = true;
            if (isKeyed(lastChildren, nextChildren)) {
                patchKeyed = true;
            }
        }
        else {
            unmountChildren(lastChildren, dom, lifecycle, isRecycling);
            mountArrayChildren(nextChildren, dom, lifecycle, context, isSVG);
        }
    }
    else if (isArray(lastChildren)) {
        removeAllChildren(dom, lastChildren, lifecycle, isRecycling);
        mount(nextChildren, dom, lifecycle, context, isSVG);
    }
    else if (isVNode(nextChildren)) {
        if (isVNode(lastChildren)) {
            patch(lastChildren, nextChildren, dom, lifecycle, context, isSVG, isRecycling);
        }
        else {
            unmountChildren(lastChildren, dom, lifecycle, isRecycling);
            mount(nextChildren, dom, lifecycle, context, isSVG);
        }
    }
    if (patchArray) {
        if (patchKeyed) {
            patchKeyedChildren(lastChildren, nextChildren, dom, lifecycle, context, isSVG, isRecycling);
        }
        else {
            patchNonKeyedChildren(lastChildren, nextChildren, dom, lifecycle, context, isSVG, isRecycling);
        }
    }
}
function patchComponent(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isClass, isRecycling) {
    var lastType = lastVNode.type;
    var nextType = nextVNode.type;
    var lastKey = lastVNode.key;
    var nextKey = nextVNode.key;
    if (lastType !== nextType || lastKey !== nextKey) {
        replaceWithNewNode(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isRecycling);
        return false;
    }
    else {
        var nextProps = nextVNode.props || EMPTY_OBJ;
        if (isClass) {
            var instance = lastVNode.children;
            instance._updating = true;
            if (instance._unmounted) {
                if (isNull(parentDom)) {
                    return true;
                }
                replaceChild(parentDom, mountComponent(nextVNode, null, lifecycle, context, isSVG, (nextVNode.flags & 4 /* ComponentClass */) > 0), lastVNode.dom);
            }
            else {
                var hasComponentDidUpdate = !isUndefined(instance.componentDidUpdate);
                var nextState = instance.state;
                // When component has componentDidUpdate hook, we need to clone lastState or will be modified by reference during update
                var lastState = hasComponentDidUpdate
                    ? combineFrom(nextState, null)
                    : nextState;
                var lastProps = instance.props;
                var childContext;
                if (!isNullOrUndef(instance.getChildContext)) {
                    childContext = instance.getChildContext();
                }
                nextVNode.children = instance;
                instance._isSVG = isSVG;
                if (isNullOrUndef(childContext)) {
                    childContext = context;
                }
                else {
                    childContext = combineFrom(context, childContext);
                }
                var lastInput = instance._lastInput;
                var nextInput = instance._updateComponent(lastState, nextState, lastProps, nextProps, context, false, false);
                var didUpdate = true;
                instance._childContext = childContext;
                if (isInvalid(nextInput)) {
                    nextInput = createVoidVNode();
                }
                else if (nextInput === NO_OP) {
                    nextInput = lastInput;
                    didUpdate = false;
                }
                else if (isStringOrNumber(nextInput)) {
                    nextInput = createTextVNode(nextInput, null);
                }
                else if (isArray(nextInput)) {
                    if (process.env.NODE_ENV !== "production") {
                        throwError("a valid Inferno VNode (or null) must be returned from a component render. You may have returned an array or an invalid object.");
                    }
                    throwError();
                }
                else if (isObject(nextInput)) {
                    if (!isNull(nextInput.dom)) {
                        nextInput = directClone(nextInput);
                    }
                }
                if (nextInput.flags & 28 /* Component */) {
                    nextInput.parentVNode = nextVNode;
                }
                else if (lastInput.flags & 28 /* Component */) {
                    lastInput.parentVNode = nextVNode;
                }
                instance._lastInput = nextInput;
                instance._vNode = nextVNode;
                if (didUpdate) {
                    patch(lastInput, nextInput, parentDom, lifecycle, childContext, isSVG, isRecycling);
                    if (hasComponentDidUpdate && instance.componentDidUpdate) {
                        instance.componentDidUpdate(lastProps, lastState);
                    }
                    if (!isNull(options.afterUpdate)) {
                        options.afterUpdate(nextVNode);
                    }
                    if (options.findDOMNodeEnabled) {
                        componentToDOMNodeMap.set(instance, nextInput.dom);
                    }
                }
                nextVNode.dom = nextInput.dom;
            }
            instance._updating = false;
        }
        else {
            var shouldUpdate = true;
            var lastProps$1 = lastVNode.props;
            var nextHooks = nextVNode.ref;
            var nextHooksDefined = !isNullOrUndef(nextHooks);
            var lastInput$1 = lastVNode.children;
            var nextInput$1 = lastInput$1;
            nextVNode.dom = lastVNode.dom;
            nextVNode.children = lastInput$1;
            if (lastKey !== nextKey) {
                shouldUpdate = true;
            }
            else {
                if (nextHooksDefined &&
                    !isNullOrUndef(nextHooks.onComponentShouldUpdate)) {
                    shouldUpdate = nextHooks.onComponentShouldUpdate(lastProps$1, nextProps);
                }
            }
            if (shouldUpdate !== false) {
                if (nextHooksDefined &&
                    !isNullOrUndef(nextHooks.onComponentWillUpdate)) {
                    nextHooks.onComponentWillUpdate(lastProps$1, nextProps);
                }
                nextInput$1 = nextType(nextProps, context);
                if (isInvalid(nextInput$1)) {
                    nextInput$1 = createVoidVNode();
                }
                else if (isStringOrNumber(nextInput$1) && nextInput$1 !== NO_OP) {
                    nextInput$1 = createTextVNode(nextInput$1, null);
                }
                else if (isArray(nextInput$1)) {
                    if (process.env.NODE_ENV !== "production") {
                        throwError("a valid Inferno VNode (or null) must be returned from a component render. You may have returned an array or an invalid object.");
                    }
                    throwError();
                }
                else if (isObject(nextInput$1)) {
                    if (!isNull(nextInput$1.dom)) {
                        nextInput$1 = directClone(nextInput$1);
                    }
                }
                if (nextInput$1 !== NO_OP) {
                    patch(lastInput$1, nextInput$1, parentDom, lifecycle, context, isSVG, isRecycling);
                    nextVNode.children = nextInput$1;
                    if (nextHooksDefined &&
                        !isNullOrUndef(nextHooks.onComponentDidUpdate)) {
                        nextHooks.onComponentDidUpdate(lastProps$1, nextProps);
                    }
                    nextVNode.dom = nextInput$1.dom;
                }
            }
            if (nextInput$1.flags & 28 /* Component */) {
                nextInput$1.parentVNode = nextVNode;
            }
            else if (lastInput$1.flags & 28 /* Component */) {
                lastInput$1.parentVNode = nextVNode;
            }
        }
    }
    return false;
}
function patchText(lastVNode, nextVNode) {
    var nextText = nextVNode.children;
    var dom = lastVNode.dom;
    nextVNode.dom = dom;
    if (lastVNode.children !== nextText) {
        dom.nodeValue = nextText;
    }
}
function patchVoid(lastVNode, nextVNode) {
    nextVNode.dom = lastVNode.dom;
}
function patchNonKeyedChildren(lastChildren, nextChildren, dom, lifecycle, context, isSVG, isRecycling) {
    var lastChildrenLength = lastChildren.length;
    var nextChildrenLength = nextChildren.length;
    var commonLength = lastChildrenLength > nextChildrenLength
        ? nextChildrenLength
        : lastChildrenLength;
    var i = 0;
    for (; i < commonLength; i++) {
        var nextChild = nextChildren[i];
        if (nextChild.dom) {
            nextChild = nextChildren[i] = directClone(nextChild);
        }
        patch(lastChildren[i], nextChild, dom, lifecycle, context, isSVG, isRecycling);
    }
    if (lastChildrenLength < nextChildrenLength) {
        for (i = commonLength; i < nextChildrenLength; i++) {
            var nextChild$1 = nextChildren[i];
            if (nextChild$1.dom) {
                nextChild$1 = nextChildren[i] = directClone(nextChild$1);
            }
            appendChild(dom, mount(nextChild$1, null, lifecycle, context, isSVG));
        }
    }
    else if (nextChildrenLength === 0) {
        removeAllChildren(dom, lastChildren, lifecycle, isRecycling);
    }
    else if (lastChildrenLength > nextChildrenLength) {
        for (i = commonLength; i < lastChildrenLength; i++) {
            unmount(lastChildren[i], dom, lifecycle, false, isRecycling);
        }
    }
}
function patchKeyedChildren(a, b, dom, lifecycle, context, isSVG, isRecycling) {
    var aLength = a.length;
    var bLength = b.length;
    var aEnd = aLength - 1;
    var bEnd = bLength - 1;
    var aStart = 0;
    var bStart = 0;
    var i;
    var j;
    var aNode;
    var bNode;
    var nextNode;
    var nextPos;
    var node;
    if (aLength === 0) {
        if (bLength > 0) {
            mountArrayChildren(b, dom, lifecycle, context, isSVG);
        }
        return;
    }
    else if (bLength === 0) {
        removeAllChildren(dom, a, lifecycle, isRecycling);
        return;
    }
    var aStartNode = a[aStart];
    var bStartNode = b[bStart];
    var aEndNode = a[aEnd];
    var bEndNode = b[bEnd];
    if (bStartNode.dom) {
        b[bStart] = bStartNode = directClone(bStartNode);
    }
    if (bEndNode.dom) {
        b[bEnd] = bEndNode = directClone(bEndNode);
    }
    // Step 1
    /* eslint no-constant-condition: 0 */
    outer: while (true) {
        // Sync nodes with the same key at the beginning.
        while (aStartNode.key === bStartNode.key) {
            patch(aStartNode, bStartNode, dom, lifecycle, context, isSVG, isRecycling);
            aStart++;
            bStart++;
            if (aStart > aEnd || bStart > bEnd) {
                break outer;
            }
            aStartNode = a[aStart];
            bStartNode = b[bStart];
            if (bStartNode.dom) {
                b[bStart] = bStartNode = directClone(bStartNode);
            }
        }
        // Sync nodes with the same key at the end.
        while (aEndNode.key === bEndNode.key) {
            patch(aEndNode, bEndNode, dom, lifecycle, context, isSVG, isRecycling);
            aEnd--;
            bEnd--;
            if (aStart > aEnd || bStart > bEnd) {
                break outer;
            }
            aEndNode = a[aEnd];
            bEndNode = b[bEnd];
            if (bEndNode.dom) {
                b[bEnd] = bEndNode = directClone(bEndNode);
            }
        }
        // Move and sync nodes from right to left.
        if (aEndNode.key === bStartNode.key) {
            patch(aEndNode, bStartNode, dom, lifecycle, context, isSVG, isRecycling);
            insertOrAppend(dom, bStartNode.dom, aStartNode.dom);
            aEnd--;
            bStart++;
            aEndNode = a[aEnd];
            bStartNode = b[bStart];
            if (bStartNode.dom) {
                b[bStart] = bStartNode = directClone(bStartNode);
            }
            continue;
        }
        // Move and sync nodes from left to right.
        if (aStartNode.key === bEndNode.key) {
            patch(aStartNode, bEndNode, dom, lifecycle, context, isSVG, isRecycling);
            nextPos = bEnd + 1;
            nextNode = nextPos < b.length ? b[nextPos].dom : null;
            insertOrAppend(dom, bEndNode.dom, nextNode);
            aStart++;
            bEnd--;
            aStartNode = a[aStart];
            bEndNode = b[bEnd];
            if (bEndNode.dom) {
                b[bEnd] = bEndNode = directClone(bEndNode);
            }
            continue;
        }
        break;
    }
    if (aStart > aEnd) {
        if (bStart <= bEnd) {
            nextPos = bEnd + 1;
            nextNode = nextPos < b.length ? b[nextPos].dom : null;
            while (bStart <= bEnd) {
                node = b[bStart];
                if (node.dom) {
                    b[bStart] = node = directClone(node);
                }
                bStart++;
                insertOrAppend(dom, mount(node, null, lifecycle, context, isSVG), nextNode);
            }
        }
    }
    else if (bStart > bEnd) {
        while (aStart <= aEnd) {
            unmount(a[aStart++], dom, lifecycle, false, isRecycling);
        }
    }
    else {
        aLength = aEnd - aStart + 1;
        bLength = bEnd - bStart + 1;
        var sources = new Array(bLength);
        // Mark all nodes as inserted.
        for (i = 0; i < bLength; i++) {
            sources[i] = -1;
        }
        var moved = false;
        var pos = 0;
        var patched = 0;
        // When sizes are small, just loop them through
        if (bLength <= 4 || aLength * bLength <= 16) {
            for (i = aStart; i <= aEnd; i++) {
                aNode = a[i];
                if (patched < bLength) {
                    for (j = bStart; j <= bEnd; j++) {
                        bNode = b[j];
                        if (aNode.key === bNode.key) {
                            sources[j - bStart] = i;
                            if (pos > j) {
                                moved = true;
                            }
                            else {
                                pos = j;
                            }
                            if (bNode.dom) {
                                b[j] = bNode = directClone(bNode);
                            }
                            patch(aNode, bNode, dom, lifecycle, context, isSVG, isRecycling);
                            patched++;
                            a[i] = null;
                            break;
                        }
                    }
                }
            }
        }
        else {
            var keyIndex = new Map();
            // Map keys by their index in array
            for (i = bStart; i <= bEnd; i++) {
                keyIndex.set(b[i].key, i);
            }
            // Try to patch same keys
            for (i = aStart; i <= aEnd; i++) {
                aNode = a[i];
                if (patched < bLength) {
                    j = keyIndex.get(aNode.key);
                    if (!isUndefined(j)) {
                        bNode = b[j];
                        sources[j - bStart] = i;
                        if (pos > j) {
                            moved = true;
                        }
                        else {
                            pos = j;
                        }
                        if (bNode.dom) {
                            b[j] = bNode = directClone(bNode);
                        }
                        patch(aNode, bNode, dom, lifecycle, context, isSVG, isRecycling);
                        patched++;
                        a[i] = null;
                    }
                }
            }
        }
        // fast-path: if nothing patched remove all old and add all new
        if (aLength === a.length && patched === 0) {
            removeAllChildren(dom, a, lifecycle, isRecycling);
            while (bStart < bLength) {
                node = b[bStart];
                if (node.dom) {
                    b[bStart] = node = directClone(node);
                }
                bStart++;
                insertOrAppend(dom, mount(node, null, lifecycle, context, isSVG), null);
            }
        }
        else {
            i = aLength - patched;
            while (i > 0) {
                aNode = a[aStart++];
                if (!isNull(aNode)) {
                    unmount(aNode, dom, lifecycle, true, isRecycling);
                    i--;
                }
            }
            if (moved) {
                var seq = lis_algorithm(sources);
                j = seq.length - 1;
                for (i = bLength - 1; i >= 0; i--) {
                    if (sources[i] === -1) {
                        pos = i + bStart;
                        node = b[pos];
                        if (node.dom) {
                            b[pos] = node = directClone(node);
                        }
                        nextPos = pos + 1;
                        nextNode = nextPos < b.length ? b[nextPos].dom : null;
                        insertOrAppend(dom, mount(node, dom, lifecycle, context, isSVG), nextNode);
                    }
                    else {
                        if (j < 0 || i !== seq[j]) {
                            pos = i + bStart;
                            node = b[pos];
                            nextPos = pos + 1;
                            nextNode = nextPos < b.length ? b[nextPos].dom : null;
                            insertOrAppend(dom, node.dom, nextNode);
                        }
                        else {
                            j--;
                        }
                    }
                }
            }
            else if (patched !== bLength) {
                // when patched count doesn't match b length we need to insert those new ones
                // loop backwards so we can use insertBefore
                for (i = bLength - 1; i >= 0; i--) {
                    if (sources[i] === -1) {
                        pos = i + bStart;
                        node = b[pos];
                        if (node.dom) {
                            b[pos] = node = directClone(node);
                        }
                        nextPos = pos + 1;
                        nextNode = nextPos < b.length ? b[nextPos].dom : null;
                        insertOrAppend(dom, mount(node, null, lifecycle, context, isSVG), nextNode);
                    }
                }
            }
        }
    }
}
// // https://en.wikipedia.org/wiki/Longest_increasing_subsequence
function lis_algorithm(arr) {
    var p = arr.slice(0);
    var result = [0];
    var i;
    var j;
    var u;
    var v;
    var c;
    var len = arr.length;
    for (i = 0; i < len; i++) {
        var arrI = arr[i];
        if (arrI === -1) {
            continue;
        }
        j = result[result.length - 1];
        if (arr[j] < arrI) {
            p[i] = j;
            result.push(i);
            continue;
        }
        u = 0;
        v = result.length - 1;
        while (u < v) {
            c = ((u + v) / 2) | 0;
            if (arr[result[c]] < arrI) {
                u = c + 1;
            }
            else {
                v = c;
            }
        }
        if (arrI < arr[result[u]]) {
            if (u > 0) {
                p[i] = result[u - 1];
            }
            result[u] = i;
        }
    }
    u = result.length;
    v = result[u - 1];
    while (u-- > 0) {
        result[u] = v;
        v = p[v];
    }
    return result;
}
function isAttrAnEvent(attr) {
    return attr[0] === "o" && attr[1] === "n";
}
function patchProp(prop, lastValue, nextValue, dom, isSVG, hasControlledValue) {
    if (lastValue !== nextValue) {
        if (skipProps.has(prop) || (hasControlledValue && prop === "value")) {
            return;
        }
        else if (booleanProps.has(prop)) {
            prop = prop === "autoFocus" ? prop.toLowerCase() : prop;
            dom[prop] = !!nextValue;
        }
        else if (strictProps.has(prop)) {
            var value = isNullOrUndef(nextValue) ? "" : nextValue;
            if (dom[prop] !== value) {
                dom[prop] = value;
            }
        }
        else if (isAttrAnEvent(prop)) {
            patchEvent(prop, lastValue, nextValue, dom);
        }
        else if (isNullOrUndef(nextValue)) {
            dom.removeAttribute(prop);
        }
        else if (prop === "style") {
            patchStyle(lastValue, nextValue, dom);
        }
        else if (prop === "dangerouslySetInnerHTML") {
            var lastHtml = lastValue && lastValue.__html;
            var nextHtml = nextValue && nextValue.__html;
            if (lastHtml !== nextHtml) {
                if (!isNullOrUndef(nextHtml)) {
                    dom.innerHTML = nextHtml;
                }
            }
        }
        else {
            // We optimize for NS being boolean. Its 99.9% time false
            if (isSVG && namespaces.has(prop)) {
                // If we end up in this path we can read property again
                dom.setAttributeNS(namespaces.get(prop), prop, nextValue);
            }
            else {
                dom.setAttribute(prop, nextValue);
            }
        }
    }
}
function patchEvent(name, lastValue, nextValue, dom) {
    if (lastValue !== nextValue) {
        if (delegatedEvents.has(name)) {
            handleEvent(name, lastValue, nextValue, dom);
        }
        else {
            var nameLowerCase = name.toLowerCase();
            var domEvent = dom[nameLowerCase];
            // if the function is wrapped, that means it's been controlled by a wrapper
            if (domEvent && domEvent.wrapped) {
                return;
            }
            if (!isFunction(nextValue) && !isNullOrUndef(nextValue)) {
                var linkEvent = nextValue.event;
                if (linkEvent && isFunction(linkEvent)) {
                    dom[nameLowerCase] = function (e) {
                        linkEvent(nextValue.data, e);
                    };
                }
                else {
                    if (process.env.NODE_ENV !== "production") {
                        throwError(("an event on a VNode \"" + name + "\". was not a function or a valid linkEvent."));
                    }
                    throwError();
                }
            }
            else {
                dom[nameLowerCase] = nextValue;
            }
        }
    }
}
// We are assuming here that we come from patchProp routine
// -nextAttrValue cannot be null or undefined
function patchStyle(lastAttrValue, nextAttrValue, dom) {
    var domStyle = dom.style;
    if (isString(nextAttrValue)) {
        domStyle.cssText = nextAttrValue;
        return;
    }
    for (var style in nextAttrValue) {
        // do not add a hasOwnProperty check here, it affects performance
        var value = nextAttrValue[style];
        if (!isNumber(value) || isUnitlessNumber.has(style)) {
            domStyle[style] = value;
        }
        else {
            domStyle[style] = value + "px";
        }
    }
    if (!isNullOrUndef(lastAttrValue)) {
        for (var style$1 in lastAttrValue) {
            if (isNullOrUndef(nextAttrValue[style$1])) {
                domStyle[style$1] = "";
            }
        }
    }
}
function removeProp(prop, lastValue, dom, nextFlags) {
    if (prop === "value") {
        // When removing value of select element, it needs to be set to null instead empty string, because empty string is valid value for option which makes that option selected
        // MS IE/Edge don't follow html spec for textArea and input elements and we need to set empty string to value in those cases to avoid "null" and "undefined" texts
        dom.value = nextFlags & 2048 /* SelectElement */ ? null : "";
    }
    else if (prop === "style") {
        dom.removeAttribute("style");
    }
    else if (isAttrAnEvent(prop)) {
        handleEvent(prop, lastValue, null, dom);
    }
    else {
        dom.removeAttribute(prop);
    }
}

/**
 * @module Inferno
 */ /** TypeDoc Comment */
function mount(vNode, parentDom, lifecycle, context, isSVG) {
    var flags = vNode.flags;
    if (flags & 3970 /* Element */) {
        return mountElement(vNode, parentDom, lifecycle, context, isSVG);
    }
    else if (flags & 28 /* Component */) {
        return mountComponent(vNode, parentDom, lifecycle, context, isSVG, (flags & 4 /* ComponentClass */) > 0);
    }
    else if (flags & 4096 /* Void */) {
        return mountVoid(vNode, parentDom);
    }
    else if (flags & 1 /* Text */) {
        return mountText(vNode, parentDom);
    }
    else {
        if (process.env.NODE_ENV !== "production") {
            if (typeof vNode === "object") {
                throwError(("mount() received an object that's not a valid VNode, you should stringify it first. Object: \"" + (JSON.stringify(vNode)) + "\"."));
            }
            else {
                throwError(("mount() expects a valid VNode, instead it received an object with the type \"" + (typeof vNode) + "\"."));
            }
        }
        throwError();
    }
}
function mountText(vNode, parentDom) {
    var dom = document.createTextNode(vNode.children);
    vNode.dom = dom;
    if (!isNull(parentDom)) {
        appendChild(parentDom, dom);
    }
    return dom;
}
function mountVoid(vNode, parentDom) {
    var dom = document.createTextNode("");
    vNode.dom = dom;
    if (!isNull(parentDom)) {
        appendChild(parentDom, dom);
    }
    return dom;
}
function mountElement(vNode, parentDom, lifecycle, context, isSVG) {
    if (options.recyclingEnabled) {
        var dom$1 = recycleElement(vNode, lifecycle, context, isSVG);
        if (!isNull(dom$1)) {
            if (!isNull(parentDom)) {
                appendChild(parentDom, dom$1);
            }
            return dom$1;
        }
    }
    var flags = vNode.flags;
    isSVG = isSVG || (flags & 128 /* SvgElement */) > 0;
    var dom = documentCreateElement(vNode.type, isSVG);
    var children = vNode.children;
    var props = vNode.props;
    var className = vNode.className;
    var ref = vNode.ref;
    vNode.dom = dom;
    if (!isInvalid(children)) {
        if (isStringOrNumber(children)) {
            setTextContent(dom, children);
        }
        else {
            var childrenIsSVG = isSVG === true && vNode.type !== "foreignObject";
            if (isArray(children)) {
                mountArrayChildren(children, dom, lifecycle, context, childrenIsSVG);
            }
            else if (isVNode(children)) {
                mount(children, dom, lifecycle, context, childrenIsSVG);
            }
        }
    }
    if (!isNull(props)) {
        var hasControlledValue = false;
        var isFormElement = (flags & 3584 /* FormElement */) > 0;
        if (isFormElement) {
            hasControlledValue = isControlledFormElement(props);
        }
        for (var prop in props) {
            // do not add a hasOwnProperty check here, it affects performance
            patchProp(prop, null, props[prop], dom, isSVG, hasControlledValue);
        }
        if (isFormElement) {
            processElement(flags, vNode, dom, props, true, hasControlledValue);
        }
    }
    if (className !== null) {
        if (isSVG) {
            dom.setAttribute("class", className);
        }
        else {
            dom.className = className;
        }
    }
    if (!isNull(ref)) {
        mountRef(dom, ref, lifecycle);
    }
    if (!isNull(parentDom)) {
        appendChild(parentDom, dom);
    }
    return dom;
}
function mountArrayChildren(children, dom, lifecycle, context, isSVG) {
    for (var i = 0, len = children.length; i < len; i++) {
        var child = children[i];
        // Verify can string/number be here. might cause de-opt. - Normalization takes care of it.
        if (!isInvalid(child)) {
            if (child.dom) {
                children[i] = child = directClone(child);
            }
            mount(children[i], dom, lifecycle, context, isSVG);
        }
    }
}
function mountComponent(vNode, parentDom, lifecycle, context, isSVG, isClass) {
    if (options.recyclingEnabled) {
        var dom$1 = recycleComponent(vNode, lifecycle, context, isSVG);
        if (!isNull(dom$1)) {
            if (!isNull(parentDom)) {
                appendChild(parentDom, dom$1);
            }
            return dom$1;
        }
    }
    var type = vNode.type;
    var props = vNode.props || EMPTY_OBJ;
    var ref = vNode.ref;
    var dom;
    if (isClass) {
        var instance = createClassComponentInstance(vNode, type, props, context, isSVG, lifecycle);
        var input = instance._lastInput;
        instance._vNode = vNode;
        vNode.dom = dom = mount(input, null, lifecycle, instance._childContext, isSVG);
        if (!isNull(parentDom)) {
            appendChild(parentDom, dom);
        }
        mountClassComponentCallbacks(vNode, ref, instance, lifecycle);
        instance._updating = false;
        if (options.findDOMNodeEnabled) {
            componentToDOMNodeMap.set(instance, dom);
        }
    }
    else {
        var input$1 = createFunctionalComponentInput(vNode, type, props, context);
        vNode.dom = dom = mount(input$1, null, lifecycle, context, isSVG);
        vNode.children = input$1;
        mountFunctionalComponentCallbacks(ref, dom, lifecycle);
        if (!isNull(parentDom)) {
            appendChild(parentDom, dom);
        }
    }
    return dom;
}
function mountClassComponentCallbacks(vNode, ref, instance, lifecycle) {
    if (ref) {
        if (isFunction(ref)) {
            ref(instance);
        }
        else {
            if (process.env.NODE_ENV !== "production") {
                if (isStringOrNumber(ref)) {
                    throwError('string "refs" are not supported in Inferno 1.0. Use callback "refs" instead.');
                }
                else if (isObject(ref) && vNode.flags & 4 /* ComponentClass */) {
                    throwError("functional component lifecycle events are not supported on ES2015 class components.");
                }
                else {
                    throwError(("a bad value for \"ref\" was used on component: \"" + (JSON.stringify(ref)) + "\""));
                }
            }
            throwError();
        }
    }
    var hasDidMount = !isUndefined(instance.componentDidMount);
    var afterMount = options.afterMount;
    if (hasDidMount || !isNull(afterMount)) {
        lifecycle.addListener((function () {
            instance._updating = true;
            if (afterMount) {
                afterMount(vNode);
            }
            if (hasDidMount) {
                instance.componentDidMount();
            }
            instance._updating = false;
        }));
    }
}
function mountFunctionalComponentCallbacks(ref, dom, lifecycle) {
    if (ref) {
        if (!isNullOrUndef(ref.onComponentWillMount)) {
            ref.onComponentWillMount();
        }
        if (!isNullOrUndef(ref.onComponentDidMount)) {
            lifecycle.addListener((function () { return ref.onComponentDidMount(dom); }));
        }
    }
}
function mountRef(dom, value, lifecycle) {
    if (isFunction(value)) {
        lifecycle.addListener((function () { return value(dom); }));
    }
    else {
        if (isInvalid(value)) {
            return;
        }
        if (process.env.NODE_ENV !== "production") {
            throwError('string "refs" are not supported in Inferno 1.0. Use callback "refs" instead.');
        }
        throwError();
    }
}

/**
 * @module Inferno
 */ /** TypeDoc Comment */
// We need EMPTY_OBJ defined in one place.
// Its used for comparison so we cant inline it into shared
var EMPTY_OBJ = {};
if (process.env.NODE_ENV !== "production") {
    Object.freeze(EMPTY_OBJ);
}
function createClassComponentInstance(vNode, Component, props, context, isSVG, lifecycle) {
    if (isUndefined(context)) {
        context = EMPTY_OBJ; // Context should not be mutable
    }
    var instance = new Component(props, context);
    vNode.children = instance;
    instance._blockSetState = false;
    instance.context = context;
    if (instance.props === EMPTY_OBJ) {
        instance.props = props;
    }
    // setState callbacks must fire after render is done when called from componentWillReceiveProps or componentWillMount
    instance._lifecycle = lifecycle;
    instance._unmounted = false;
    instance._pendingSetState = true;
    instance._isSVG = isSVG;
    if (!isNullOrUndef(instance.componentWillMount)) {
        instance._blockRender = true;
        instance.componentWillMount();
        instance._blockRender = false;
    }
    var childContext;
    if (!isNullOrUndef(instance.getChildContext)) {
        childContext = instance.getChildContext();
    }
    if (isNullOrUndef(childContext)) {
        instance._childContext = context;
    }
    else {
        instance._childContext = combineFrom(context, childContext);
    }
    if (!isNull(options.beforeRender)) {
        options.beforeRender(instance);
    }
    var input = instance.render(props, instance.state, context);
    if (!isNull(options.afterRender)) {
        options.afterRender(instance);
    }
    if (isArray(input)) {
        if (process.env.NODE_ENV !== "production") {
            throwError("a valid Inferno VNode (or null) must be returned from a component render. You may have returned an array or an invalid object.");
        }
        throwError();
    }
    else if (isInvalid(input)) {
        input = createVoidVNode();
    }
    else if (isStringOrNumber(input)) {
        input = createTextVNode(input, null);
    }
    else {
        if (input.dom) {
            input = directClone(input);
        }
        if (input.flags & 28 /* Component */) {
            // if we have an input that is also a component, we run into a tricky situation
            // where the root vNode needs to always have the correct DOM entry
            // so we break monomorphism on our input and supply it our vNode as parentVNode
            // we can optimise this in the future, but this gets us out of a lot of issues
            input.parentVNode = vNode;
        }
    }
    instance._pendingSetState = false;
    instance._lastInput = input;
    return instance;
}
function replaceLastChildAndUnmount(lastInput, nextInput, parentDom, lifecycle, context, isSVG, isRecycling) {
    replaceVNode(parentDom, mount(nextInput, null, lifecycle, context, isSVG), lastInput, lifecycle, isRecycling);
}
function replaceVNode(parentDom, dom, vNode, lifecycle, isRecycling) {
    unmount(vNode, null, lifecycle, false, isRecycling);
    replaceChild(parentDom, dom, vNode.dom);
}
function createFunctionalComponentInput(vNode, component, props, context) {
    var input = component(props, context);
    if (isArray(input)) {
        if (process.env.NODE_ENV !== "production") {
            throwError("a valid Inferno VNode (or null) must be returned from a component render. You may have returned an array or an invalid object.");
        }
        throwError();
    }
    else if (isInvalid(input)) {
        input = createVoidVNode();
    }
    else if (isStringOrNumber(input)) {
        input = createTextVNode(input, null);
    }
    else {
        if (input.dom) {
            input = directClone(input);
        }
        if (input.flags & 28 /* Component */) {
            // if we have an input that is also a component, we run into a tricky situation
            // where the root vNode needs to always have the correct DOM entry
            // so we break monomorphism on our input and supply it our vNode as parentVNode
            // we can optimise this in the future, but this gets us out of a lot of issues
            input.parentVNode = vNode;
        }
    }
    return input;
}
function setTextContent(dom, text) {
    if (text !== "") {
        dom.textContent = text;
    }
    else {
        dom.appendChild(document.createTextNode(""));
    }
}
function updateTextContent(dom, text) {
    dom.firstChild.nodeValue = text;
}
function appendChild(parentDom, dom) {
    parentDom.appendChild(dom);
}
function insertOrAppend(parentDom, newNode, nextNode) {
    if (isNullOrUndef(nextNode)) {
        appendChild(parentDom, newNode);
    }
    else {
        parentDom.insertBefore(newNode, nextNode);
    }
}
function documentCreateElement(tag, isSVG) {
    if (isSVG === true) {
        return document.createElementNS(svgNS, tag);
    }
    else {
        return document.createElement(tag);
    }
}
function replaceWithNewNode(lastNode, nextNode, parentDom, lifecycle, context, isSVG, isRecycling) {
    unmount(lastNode, null, lifecycle, false, isRecycling);
    var dom = mount(nextNode, null, lifecycle, context, isSVG);
    nextNode.dom = dom;
    replaceChild(parentDom, dom, lastNode.dom);
}
function replaceChild(parentDom, nextDom, lastDom) {
    if (!parentDom) {
        parentDom = lastDom.parentNode;
    }
    parentDom.replaceChild(nextDom, lastDom);
}
function removeChild(parentDom, dom) {
    parentDom.removeChild(dom);
}
function removeAllChildren(dom, children, lifecycle, isRecycling) {
    if (!options.recyclingEnabled || (options.recyclingEnabled && !isRecycling)) {
        removeChildren(null, children, lifecycle, isRecycling);
    }
    dom.textContent = "";
}
function removeChildren(dom, children, lifecycle, isRecycling) {
    for (var i = 0, len = children.length; i < len; i++) {
        var child = children[i];
        if (!isInvalid(child)) {
            unmount(child, dom, lifecycle, true, isRecycling);
        }
    }
}
function isKeyed(lastChildren, nextChildren) {
    return (nextChildren.length > 0 &&
        !isNullOrUndef(nextChildren[0]) &&
        !isNullOrUndef(nextChildren[0].key) &&
        lastChildren.length > 0 &&
        !isNullOrUndef(lastChildren[0]) &&
        !isNullOrUndef(lastChildren[0].key));
}

/**
 * @module Inferno
 */ /** TypeDoc Comment */
function VNode(children, className, flags, key, props, ref, type) {
    this.children = children;
    this.className = className;
    this.dom = null;
    this.flags = flags;
    this.key = key;
    this.props = props;
    this.ref = ref;
    this.type = type;
}
/**
 * Creates virtual node
 * @param {number} flags
 * @param {string|Function|null} type
 * @param {string|null=} className
 * @param {object=} children
 * @param {object=} props
 * @param {*=} key
 * @param {object|Function=} ref
 * @param {boolean=} noNormalise
 * @returns {VNode} returns new virtual node
 */
function createVNode(flags, type, className, children, props, key, ref, noNormalise) {
    if (flags & 16 /* ComponentUnknown */) {
        flags = isStatefulComponent(type)
            ? 4 /* ComponentClass */
            : 8 /* ComponentFunction */;
    }
    var vNode = new VNode(children === void 0 ? null : children, className === void 0 ? null : className, flags, key === void 0 ? null : key, props === void 0 ? null : props, ref === void 0 ? null : ref, type);
    if (noNormalise !== true) {
        normalize(vNode);
    }
    if (options.createVNode !== null) {
        options.createVNode(vNode);
    }
    return vNode;
}
function directClone(vNodeToClone) {
    var newVNode;
    var flags = vNodeToClone.flags;
    if (flags & 28 /* Component */) {
        var props;
        var propsToClone = vNodeToClone.props;
        if (isNull(propsToClone)) {
            props = EMPTY_OBJ;
        }
        else {
            props = {};
            for (var key in propsToClone) {
                props[key] = propsToClone[key];
            }
        }
        newVNode = createVNode(flags, vNodeToClone.type, null, null, props, vNodeToClone.key, vNodeToClone.ref, true);
        var newProps = newVNode.props;
        var newChildren = newProps.children;
        // we need to also clone component children that are in props
        // as the children may also have been hoisted
        if (newChildren) {
            if (isArray(newChildren)) {
                var len = newChildren.length;
                if (len > 0) {
                    var tmpArray = [];
                    for (var i = 0; i < len; i++) {
                        var child = newChildren[i];
                        if (isStringOrNumber(child)) {
                            tmpArray.push(child);
                        }
                        else if (!isInvalid(child) && isVNode(child)) {
                            tmpArray.push(directClone(child));
                        }
                    }
                    newProps.children = tmpArray;
                }
            }
            else if (isVNode(newChildren)) {
                newProps.children = directClone(newChildren);
            }
        }
        newVNode.children = null;
    }
    else if (flags & 3970 /* Element */) {
        var children = vNodeToClone.children;
        var props$1;
        var propsToClone$1 = vNodeToClone.props;
        if (propsToClone$1 === null) {
            props$1 = EMPTY_OBJ;
        }
        else {
            props$1 = {};
            for (var key$1 in propsToClone$1) {
                props$1[key$1] = propsToClone$1[key$1];
            }
        }
        newVNode = createVNode(flags, vNodeToClone.type, vNodeToClone.className, children, props$1, vNodeToClone.key, vNodeToClone.ref, !children);
    }
    else if (flags & 1 /* Text */) {
        newVNode = createTextVNode(vNodeToClone.children, vNodeToClone.key);
    }
    return newVNode;
}
/*
 directClone is preferred over cloneVNode and used internally also.
 This function makes Inferno backwards compatible.
 And can be tree-shaked by modern bundlers

 Would be nice to combine this with directClone but could not do it without breaking change
 */
/**
 * Clones given virtual node by creating new instance of it
 * @param {VNode} vNodeToClone virtual node to be cloned
 * @param {Props=} props additional props for new virtual node
 * @param {...*} _children new children for new virtual node
 * @returns {VNode} new virtual node
 */
function cloneVNode(vNodeToClone, props) {
    var _children = [], len$2 = arguments.length - 2;
    while ( len$2-- > 0 ) _children[ len$2 ] = arguments[ len$2 + 2 ];

    var children = _children;
    var childrenLen = _children.length;
    if (childrenLen > 0 && !isUndefined(_children[0])) {
        if (!props) {
            props = {};
        }
        if (childrenLen === 1) {
            children = _children[0];
        }
        if (!isUndefined(children)) {
            props.children = children;
        }
    }
    var newVNode;
    if (isArray(vNodeToClone)) {
        var tmpArray = [];
        for (var i = 0, len = vNodeToClone.length; i < len; i++) {
            tmpArray.push(directClone(vNodeToClone[i]));
        }
        newVNode = tmpArray;
    }
    else {
        var flags = vNodeToClone.flags;
        var className = vNodeToClone.className || (props && props.className);
        var key = !isNullOrUndef(vNodeToClone.key)
            ? vNodeToClone.key
            : props ? props.key : null;
        var ref = vNodeToClone.ref || (props ? props.ref : null);
        if (flags & 28 /* Component */) {
            newVNode = createVNode(flags, vNodeToClone.type, className, null, !vNodeToClone.props && !props
                ? EMPTY_OBJ
                : combineFrom(vNodeToClone.props, props), key, ref, true);
            var newProps = newVNode.props;
            if (newProps) {
                var newChildren = newProps.children;
                // we need to also clone component children that are in props
                // as the children may also have been hoisted
                if (newChildren) {
                    if (isArray(newChildren)) {
                        var len$1 = newChildren.length;
                        if (len$1 > 0) {
                            var tmpArray$1 = [];
                            for (var i$1 = 0; i$1 < len$1; i$1++) {
                                var child = newChildren[i$1];
                                if (isStringOrNumber(child)) {
                                    tmpArray$1.push(child);
                                }
                                else if (!isInvalid(child) && isVNode(child)) {
                                    tmpArray$1.push(directClone(child));
                                }
                            }
                            newProps.children = tmpArray$1;
                        }
                    }
                    else if (isVNode(newChildren)) {
                        newProps.children = directClone(newChildren);
                    }
                }
            }
            newVNode.children = null;
        }
        else if (flags & 3970 /* Element */) {
            children = props && !isUndefined(props.children)
                ? props.children
                : vNodeToClone.children;
            newVNode = createVNode(flags, vNodeToClone.type, className, children, !vNodeToClone.props && !props
                ? EMPTY_OBJ
                : combineFrom(vNodeToClone.props, props), key, ref, !children);
        }
        else if (flags & 1 /* Text */) {
            newVNode = createTextVNode(vNodeToClone.children, key);
        }
    }
    return newVNode;
}
function createVoidVNode() {
    return createVNode(4096 /* Void */, null);
}
function createTextVNode(text, key) {
    return createVNode(1 /* Text */, null, null, text, null, key);
}
function isVNode(o) {
    return !!o.flags;
}

/**
 * @module Inferno
 */ /** TypeDoc Comment */
function applyKey(key, vNode) {
    vNode.key = key;
    return vNode;
}
function applyKeyIfMissing(key, vNode) {
    if (isNumber(key)) {
        key = "." + key;
    }
    if (isNull(vNode.key) || vNode.key[0] === ".") {
        return applyKey(key, vNode);
    }
    return vNode;
}
function applyKeyPrefix(key, vNode) {
    vNode.key = key + vNode.key;
    return vNode;
}
function _normalizeVNodes(nodes, result, index, currentKey) {
    for (var len = nodes.length; index < len; index++) {
        var n = nodes[index];
        var key = currentKey + "." + index;
        if (!isInvalid(n)) {
            if (isArray(n)) {
                _normalizeVNodes(n, result, 0, key);
            }
            else {
                if (isStringOrNumber(n)) {
                    n = createTextVNode(n, null);
                }
                else if ((isVNode(n) && n.dom) || (n.key && n.key[0] === ".")) {
                    n = directClone(n);
                }
                if (isNull(n.key) || n.key[0] === ".") {
                    n = applyKey(key, n);
                }
                else {
                    n = applyKeyPrefix(currentKey, n);
                }
                result.push(n);
            }
        }
    }
}
function normalizeVNodes(nodes) {
    var newNodes;
    // we assign $ which basically means we've flagged this array for future note
    // if it comes back again, we need to clone it, as people are using it
    // in an immutable way
    // tslint:disable
    if (nodes["$"] === true) {
        nodes = nodes.slice();
    }
    else {
        nodes["$"] = true;
    }
    // tslint:enable
    for (var i = 0, len = nodes.length; i < len; i++) {
        var n = nodes[i];
        if (isInvalid(n) || isArray(n)) {
            var result = (newNodes || nodes).slice(0, i);
            _normalizeVNodes(nodes, result, i, "");
            return result;
        }
        else if (isStringOrNumber(n)) {
            if (!newNodes) {
                newNodes = nodes.slice(0, i);
            }
            newNodes.push(applyKeyIfMissing(i, createTextVNode(n, null)));
        }
        else if ((isVNode(n) && n.dom !== null) ||
            (isNull(n.key) && (n.flags & 64 /* HasNonKeyedChildren */) === 0)) {
            if (!newNodes) {
                newNodes = nodes.slice(0, i);
            }
            newNodes.push(applyKeyIfMissing(i, directClone(n)));
        }
        else if (newNodes) {
            newNodes.push(applyKeyIfMissing(i, directClone(n)));
        }
    }
    return newNodes || nodes;
}
function normalizeChildren(children) {
    if (isArray(children)) {
        return normalizeVNodes(children);
    }
    else if (isVNode(children) && children.dom !== null) {
        return directClone(children);
    }
    return children;
}
function normalizeProps(vNode, props, children) {
    if (vNode.flags & 3970 /* Element */) {
        if (isNullOrUndef(children) && !isNullOrUndef(props.children)) {
            vNode.children = props.children;
        }
        if (!isNullOrUndef(props.className)) {
            vNode.className = props.className;
            delete props.className;
        }
    }
    if (props.ref) {
        vNode.ref = props.ref;
        delete props.ref;
    }
    if (!isNullOrUndef(props.key)) {
        vNode.key = props.key;
        delete props.key;
    }
}
function getFlagsForElementVnode(type) {
    if (type === "svg") {
        return 128 /* SvgElement */;
    }
    else if (type === "input") {
        return 512 /* InputElement */;
    }
    else if (type === "select") {
        return 2048 /* SelectElement */;
    }
    else if (type === "textarea") {
        return 1024 /* TextareaElement */;
    }
    else if (type === "media") {
        return 256 /* MediaElement */;
    }
    return 2 /* HtmlElement */;
}
function normalize(vNode) {
    var props = vNode.props;
    var children = vNode.children;
    // convert a wrongly created type back to element
    // Primitive node doesn't have defaultProps, only Component
    if (vNode.flags & 28 /* Component */) {
        // set default props
        var type = vNode.type;
        var defaultProps = type.defaultProps;
        if (!isNullOrUndef(defaultProps)) {
            if (!props) {
                props = vNode.props = defaultProps; // Create new object if only defaultProps given
            }
            else {
                for (var prop in defaultProps) {
                    if (isUndefined(props[prop])) {
                        props[prop] = defaultProps[prop];
                    }
                }
            }
        }
        if (isString(type)) {
            vNode.flags = getFlagsForElementVnode(type);
            if (props && props.children) {
                vNode.children = props.children;
                children = props.children;
            }
        }
    }
    if (props) {
        normalizeProps(vNode, props, children);
        if (!isInvalid(props.children)) {
            props.children = normalizeChildren(props.children);
        }
    }
    if (!isInvalid(children)) {
        vNode.children = normalizeChildren(children);
    }
    if (process.env.NODE_ENV !== "production") {
        // This code will be stripped out from production CODE
        // It helps users to track errors in their applications.
        var verifyKeys = function (vNodes) {
            var keyValues = vNodes.map((function (vnode) {
                return vnode.key;
            }));
            keyValues.some((function (item, idx) {
                var hasDuplicate = keyValues.indexOf(item) !== idx;
                if (hasDuplicate) {
                    warning("Inferno normalisation(...): Encountered two children with same key, all keys must be unique within its siblings. Duplicated key is:" +
                        item);
                }
                return hasDuplicate;
            }));
        };
        if (vNode.children && Array.isArray(vNode.children)) {
            verifyKeys(vNode.children);
        }
    }
}

/**
 * @module Inferno
 */ /** TypeDoc Comment */
/**
 * Links given data to event as first parameter
 * @param {*} data data to be linked, it will be available in function as first parameter
 * @param {Function} event Function to be called when event occurs
 * @returns {{data: *, event: Function}}
 */
function linkEvent(data, event) {
    if (isFunction(event)) {
        return { data: data, event: event };
    }
    return null; // Return null when event is invalid, to avoid creating unnecessary event handlers
}

/**
 * @module Inferno
 */ /** TypeDoc Comment */
/* tslint:disable:object-literal-sort-keys */
if (process.env.NODE_ENV !== 'production') {
    /* tslint:disable-next-line:no-empty */
    var testFunc = function testFn() { };
    if ((testFunc.name || testFunc.toString()).indexOf('testFn') === -1) {
        warning(('It looks like you\'re using a minified copy of the development build ' +
            'of Inferno. When deploying Inferno apps to production, make sure to use ' +
            'the production build which skips development warnings and is faster. ' +
            'See http://infernojs.org for more details.'));
    }
}
var version = "3.5.0";
// we duplicate it so it plays nicely with different module loading systems
var index = {
    EMPTY_OBJ: EMPTY_OBJ,
    NO_OP: NO_OP,
    cloneVNode: cloneVNode,
    createRenderer: createRenderer,
    createVNode: createVNode,
    findDOMNode: findDOMNode,
    getFlagsForElementVnode: getFlagsForElementVnode,
    internal_DOMNodeMap: componentToDOMNodeMap,
    internal_isUnitlessNumber: isUnitlessNumber,
    internal_normalize: normalize,
    internal_patch: patch,
    linkEvent: linkEvent,
    options: options,
    render: render,
    version: version // DOM
};

exports['default'] = index;
exports.EMPTY_OBJ = EMPTY_OBJ;
exports.NO_OP = NO_OP;
exports.cloneVNode = cloneVNode;
exports.createRenderer = createRenderer;
exports.createVNode = createVNode;
exports.findDOMNode = findDOMNode;
exports.getFlagsForElementVnode = getFlagsForElementVnode;
exports.internal_DOMNodeMap = componentToDOMNodeMap;
exports.internal_isUnitlessNumber = isUnitlessNumber;
exports.internal_normalize = normalize;
exports.internal_patch = patch;
exports.linkEvent = linkEvent;
exports.options = options;
exports.render = render;
exports.version = version;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjpudWxsLCJzb3VyY2VzIjpbbnVsbF0sInNvdXJjZXNDb250ZW50IjpbbnVsbF0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs4QkErbUU4QixDQUFBOzs7Ozs7Ozs7U0FTckIsQ0FBQTs7Ozs7Ozs7O2tDQVN5QixDQUFBLG9EQUFvRCxDQUFBOzs7Ozs7OEJBTXhELENBQUEsa0NBQWtDLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt1Q0EwakJ6QixDQUFBOzthQUUxQixDQUFBOzJCQUNjLENBQUE7Ozs7Ozs7YUFPZCxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OyJ9

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(30)))

/***/ }),
/* 64 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	insertStyleElement(options, linkElement);
	return linkElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 65 */
/***/ (function(module, exports) {

module.exports = {
	"staff": [
		{
			"image": "http://www.ninjafitgyms.com/images/casey.jpg",
			"name": "Casey Seland",
			"title": "Trainer",
			"bio": "Training and competing have been a focal point for me throughout my entire life. I competed in gymnastics at a high level until I was 9 years old and decided to switch sports. I began swimming competitively at this point and did so throughout college and beyond. My middle school and high school years were devoted to competing on various national teams and training for a chance to earn a spot on the US Olympic Team. I competed in the 2000, 2004 and 2008 US Olympic Trials in the 100 and 200m butterfly. During this time, I swam at the University of Florida, where I was an All-American. When I decided to retire from swimming I took on running competitively. I’ve run in a variety of races including the New York City Marathon; and also qualified for the Boston Marathon. I recently started to compete in Obstacle Course Racing and will be competing in the US Nationals in Miami to earn a spot on Team USA. I’ll also be competing in OCR World’s in Canada. I’ve also set a goal to start competing in Ninja competitions in the near future.\nThroughout my years of competing I found my passion for helping others achieve their own goals in fitness and health. I’m a NASM (National Academy of Sports Medicine) Certified Personal Trainer, with a specialization in Sports Nutrition. I’ve committed myself to being a student and constantly growing, learning and seeking education so that I can help others with my passion and the knowledge I attain. I’ve also worked at DC Fitness in Los Angeles, CA along with Lake Mary Fit Club.\nWhen I’m not coaching you can still find me at the gym quite frequently along with running, doing yoga, rock climbing, kickboxing, surfing at the beach, or teaching swim lessons! I’m also involved in the Special Needs ministry at my church.",
			"social": {
				"facebook": "http://www.google.com",
				"twitter": "http://www.google.com",
				"instagram": "http://www.google.com"
			}
		},
		{
			"image": "http://www.ninjafitgyms.com/images/rebekah.jpg",
			"name": "Rebekah Myers",
			"title": "Trainer",
			"bio": "As a lifelong student of fitness and sports, I've committed my experience to teaching, training, and empowering my students through movement and self-awareness. I work towards enhancing the well-being of my clients by empowering them with the knowledge, skills, support, guidance and resources to assist and inspire them on their journey to a healthier life.\nAs second oldest of seven children an active lifestyle, sports, and sharing my passions started at a very young age. My love of fitness has led me on a journey that has included running an ultra marathon, duathalon, triathlon, the Chicago marathon, and numerous Spartan and Mud races. This year I will be heading to Canada to compete at OCR (obstacle Course racing) worlds and Miami to try out for team USA!\nWhen I'm not coaching you will find me playing ultimate frisbee, doing yoga, rock climbing, gymnastics, kickboxing, or cross training. Outside of training myself I've coached for Camp Gladiator Bootcamp, Dekalb County YMCA, Nick Parker Bootcamp, Lake Mary Fit Club and have studied nutrition and healthy eating for the past 8 years. I continually seek to achieve a balance through constant practice, education, and a state of compassion and gratitude.",
			"social": {
				"facebook": "http://www.google.com",
				"twitter": "http://www.google.com",
				"instagram": "http://www.google.com"
			}
		},
		{
			"image": "http://www.ninjafitgyms.com/images/kat.jpg",
			"name": "Kathryn Ciresi",
			"title": "Trainer",
			"bio": "Kathryn (Kat) was born in Columbus, Ohio and grew up most of her life in St. Petersburg, Florida. She holds a Bachelors in Science from The University of Florida in Health/Human Performance and is a former UF Cheerleader. She is a fun loving energetic (NASM) Certified Personal Trainer and an IFBB Masters Bikini Pro that holds numerous certifications in the fitness field including TRX Suspension Training, Kettlebell, Speed and Osteoblast Training, Core Conditioning, Kickboxing, and Nutrition. Her passion is Health and Fitness and her greatest desire is to help others live a healthy strong life for as many years as possible.",
			"social": {
				"facebook": "http://www.google.com",
				"twitter": "http://www.google.com",
				"instagram": "http://www.google.com"
			}
		},
		{
			"image": "http://www.ninjafitgyms.com/images/profile_pic.png",
			"name": "Chad Young",
			"title": "Owner/Head Trainer",
			"bio": "I am a husband and father with three kids. I have an athletic background. I played college basketball, and designed strength and conditioning programs for many athletes for over 11 years. My passion is strength and conditioning, program design and weightlifting. I have many certifications including NASM CES (corrective exercise specialist), a BS in Kinesiology and a MS in Exercise Science and Research.",
			"social": {
				"facebook": "http://www.google.com",
				"twitter": "http://www.google.com",
				"instagram": "http://www.google.com"
			}
		},
		{
			"image": "http://www.ninjafitgyms.com/images/dan.jpeg",
			"name": "Dan Goldstein",
			"title": "Owner",
			"bio": "I am originally from the Chicagoland area. I have been involved in athletics for my entire life. While attending Northwestern University, I was a member of the cheerleading squad. I have loved physical fitness and exercise for many years. After college I became certified as a Fitness Trainer through ISSA. ",
			"social": {
				"facebook": "http://www.google.com",
				"twitter": "http://www.google.com",
				"instagram": "http://www.google.com"
			}
		},
		{
			"image": "http://www.ninjafitgyms.com/images/profile_pic.png",
			"name": "Donna Zeitler",
			"title": "Owner",
			"bio": "Coming soon!"
		}
	],
	"api": {
		"getWod": "http://ninjafitgyms.com/api/workouts/wod",
		"calendarDay": "http://ninjafitgyms.com/api/schedule/calendar/day",
		"sendMessage": "http://ninjafitgyms.com/api/contact/message"
	},
	"contact": {
		"phone": "407-250-4496",
		"email": "ninjafitgyms@gmail.com",
		"address": "6541 North Orange Blossom Trail, Suit 100 Orlando Florida 32810"
	},
	"social": {
		"Instagram": "https://www.instagram.com/ninjafitgym/",
		"Facebook": "https://www.facebook.com/NinjaFitGym/",
		"Youtube": "https://www.youtube.com/channel/UCCViVDZ9jMeUqEgpY1rAVSQ",
		"Twitter": "https://twitter.com/NinjaFitGym/"
	},
	"hours": {
		"monday": [
			{
				"start": "0600",
				"end": "1100"
			},
			{
				"start": "1530",
				"end": "2030"
			}
		],
		"tuesday": [
			{
				"start": "0600",
				"end": "1100"
			},
			{
				"start": "1745",
				"end": "2030"
			}
		],
		"wednesday": [
			{
				"start": "0600",
				"end": "1100"
			},
			{
				"start": "1530",
				"end": "2030"
			}
		],
		"thursday": [
			{
				"start": "0600",
				"end": "1100"
			},
			{
				"start": "1745",
				"end": "2030"
			}
		],
		"friday": [
			{
				"start": "0600",
				"end": "1100"
			},
			{
				"start": "1530",
				"end": "2030"
			}
		],
		"saturday": [
			{
				"start": "0800",
				"end": "1200"
			}
		],
		"sunday": []
	},
	"obstacles": [
		{
			"title": "50ft Rig",
			"images": [
				"https://scontent-atl3-1.cdninstagram.com/t51.2885-15/e35/16229014_645122905690048_6995751145289285632_n.jpg",
				"https://scontent-atl3-1.cdninstagram.com/t51.2885-15/e35/16229014_645122905690048_6995751145289285632_n.jpg",
				"https://scontent-atl3-1.cdninstagram.com/t51.2885-15/e35/16229014_645122905690048_6995751145289285632_n.jpg"
			],
			"description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
		},
		{
			"title": "2nd Rig",
			"images": [
				"https://scontent-atl3-1.cdninstagram.com/t51.2885-15/e35/16229014_645122905690048_6995751145289285632_n.jpg",
				"https://scontent-atl3-1.cdninstagram.com/t51.2885-15/e35/16229014_645122905690048_6995751145289285632_n.jpg",
				"https://scontent-atl3-1.cdninstagram.com/t51.2885-15/e35/16229014_645122905690048_6995751145289285632_n.jpg"
			],
			"description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
		},
		{
			"title": "Rock Wall",
			"images": [
				"https://scontent-atl3-1.cdninstagram.com/t51.2885-15/e35/16229014_645122905690048_6995751145289285632_n.jpg",
				"https://scontent-atl3-1.cdninstagram.com/t51.2885-15/e35/16229014_645122905690048_6995751145289285632_n.jpg",
				"https://scontent-atl3-1.cdninstagram.com/t51.2885-15/e35/16229014_645122905690048_6995751145289285632_n.jpg"
			],
			"description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
		},
		{
			"title": "Warped Walls",
			"images": [
				"https://scontent-atl3-1.cdninstagram.com/t51.2885-15/e35/16229014_645122905690048_6995751145289285632_n.jpg",
				"https://scontent-atl3-1.cdninstagram.com/t51.2885-15/e35/16229014_645122905690048_6995751145289285632_n.jpg",
				"https://scontent-atl3-1.cdninstagram.com/t51.2885-15/e35/16229014_645122905690048_6995751145289285632_n.jpg"
			],
			"description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
		},
		{
			"title": "Goliath",
			"images": [
				"https://scontent-atl3-1.cdninstagram.com/t51.2885-15/e35/16229014_645122905690048_6995751145289285632_n.jpg",
				"https://scontent-atl3-1.cdninstagram.com/t51.2885-15/e35/16229014_645122905690048_6995751145289285632_n.jpg",
				"https://scontent-atl3-1.cdninstagram.com/t51.2885-15/e35/16229014_645122905690048_6995751145289285632_n.jpg"
			],
			"description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
		},
		{
			"title": "150ft Rope Climb",
			"images": [
				"https://scontent-atl3-1.cdninstagram.com/t51.2885-15/e35/16229014_645122905690048_6995751145289285632_n.jpg",
				"https://scontent-atl3-1.cdninstagram.com/t51.2885-15/e35/16229014_645122905690048_6995751145289285632_n.jpg",
				"https://scontent-atl3-1.cdninstagram.com/t51.2885-15/e35/16229014_645122905690048_6995751145289285632_n.jpg"
			],
			"description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
		}
	],
	"functionalEquipment": [
		{
			"title": "Olympic Lifting Area",
			"images": [
				"https://scontent-atl3-1.cdninstagram.com/t51.2885-15/e35/16229014_645122905690048_6995751145289285632_n.jpg",
				"https://scontent-atl3-1.cdninstagram.com/t51.2885-15/e35/16229014_645122905690048_6995751145289285632_n.jpg",
				"https://scontent-atl3-1.cdninstagram.com/t51.2885-15/e35/16229014_645122905690048_6995751145289285632_n.jpg"
			],
			"description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
		},
		{
			"title": "Rowers",
			"images": [
				"https://scontent-atl3-1.cdninstagram.com/t51.2885-15/e35/16229014_645122905690048_6995751145289285632_n.jpg",
				"https://scontent-atl3-1.cdninstagram.com/t51.2885-15/e35/16229014_645122905690048_6995751145289285632_n.jpg",
				"https://scontent-atl3-1.cdninstagram.com/t51.2885-15/e35/16229014_645122905690048_6995751145289285632_n.jpg"
			],
			"description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
		},
		{
			"title": "Air Bike",
			"images": [
				"https://scontent-atl3-1.cdninstagram.com/t51.2885-15/e35/16229014_645122905690048_6995751145289285632_n.jpg",
				"https://scontent-atl3-1.cdninstagram.com/t51.2885-15/e35/16229014_645122905690048_6995751145289285632_n.jpg",
				"https://scontent-atl3-1.cdninstagram.com/t51.2885-15/e35/16229014_645122905690048_6995751145289285632_n.jpg"
			],
			"description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
		},
		{
			"title": "Sleds",
			"images": [
				"https://scontent-atl3-1.cdninstagram.com/t51.2885-15/e35/16229014_645122905690048_6995751145289285632_n.jpg",
				"https://scontent-atl3-1.cdninstagram.com/t51.2885-15/e35/16229014_645122905690048_6995751145289285632_n.jpg",
				"https://scontent-atl3-1.cdninstagram.com/t51.2885-15/e35/16229014_645122905690048_6995751145289285632_n.jpg"
			],
			"description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
		}
	],
	"homePage": {
		"home": {
			"images": [
				{
					"url": "https://scontent-atl3-1.xx.fbcdn.net/v/t31.0-8/16903117_1844616032419052_2489319948486629962_o.jpg?oh=6eebec213f686c5aae1b76e1f3433cd7&oe=59944936"
				},
				{
					"url": "https://scontent-atl3-1.cdninstagram.com/t51.2885-15/e35/16229014_645122905690048_6995751145289285632_n.jpg"
				},
				{
					"url": "https://scontent-atl3-1.cdninstagram.com/t51.2885-15/e35/15802716_253884945025372_5272580072513994752_n.jpg"
				}
			]
		},
		"about": {
			"video": "https://www.youtube.com/embed/Eugn8dCR26Q?feature=player_embedded&rel=0&autoplay=1",
			"header": "What is NinjaFit Gym?",
			"content": "NinjaFit Gym is Orlando’s destination for Ninja Warrior and Obstacle Course Race (OCR) training! Are you looking to become the next breakout star on American Ninja Warrior? Do you want to take your OCR training to the next level? Or do you just want a functional fitness program that will help you live your life to the max? Our state-of-the-art facilities and expertly trained staff can get you there!\nFrom rope walls, cargo nets, and obstacle rigs to free weights, kettlebells, TRX equipment, and squat racks, we have something for everyone! Our Spartan SGX Certified coach, the official training certification of Spartan Race, provides purpose built programming to help you level up for that next race while our highly qualified coaches will help you get fit for life through our boot camp style functional fitness classes."
		},
		"main1": {
			"header": "Ninja Warrior Training",
			"content": "If you’ve ever had any interest in competing on the next season of American Ninja Warrior or thought to yourself, “I would love to try some of those obstacles”, our facility is a must-visit! We are Central Florida’s destination for Ninja Warrior Training. In face, quite a few previous and current competitors on American Ninja Warrior train in our gym and we feel quite privileged to have them. If you’re ready for the spotlight and challenge of auditioning for American Ninja Warrior then we’d love to train with you!",
			"image": "https://scontent-atl3-1.cdninstagram.com/t51.2885-15/e35/16229014_645122905690048_6995751145289285632_n.jpg"
		},
		"main2": {
			"header": "Obstacle Training",
			"content": "Have you signed up for your first obstacle course race (OCR) and wondering where you can go to prepare? Are you already a seasoned obstacle course racer, elite or otherwise? Regardless of your experience or skill level, our Spartan SGX Certified head trainer will provide you with purpose built fitness programming to help you get ready for your next race!",
			"image": "https://scontent-atl3-1.cdninstagram.com/t51.2885-15/e35/15802716_253884945025372_5272580072513994752_n.jpg"
		},
		"main3": {
			"header": "Functional Training",
			"content": "Functional fitness training is a great way to improve overall fitness levels and here at NinjaFit Gym our boot camp style classes utilize a combination of free weights, kettlebells, ropes, medicine balls, balance boards, TRX equipment, plyometrics / bodyweight exercise, and much more to get you into shape from head to toe! Through our classes you will burn calories, improve your cardiovascular performance, increase strength, and gain flexibility resulting in an increased ability to handle your activities of daily living and whatever else life throws your way!",
			"image": "https://scontent-atl3-1.cdninstagram.com/t51.2885-15/e35/16229014_645122905690048_6995751145289285632_n.jpg"
		},
		"short1": {
			"header": "NinjaFit Kids",
			"content": "NinjaFit Kids is our hit program that progresses kids through the use of a belt system, similar to a martial arts. They learn obstacle skill development, run through our very own obstacle course, and through these experiences, gain general fitness, improved self-esteem, and of course, new friends!"
		},
		"short2": {
			"header": "Special Events",
			"content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
		},
		"testimonials": [
			{
				"author": "Marguerite Torrenga",
				"quote": "Lasdfafdorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
			},
			{
				"author": "Josh Torrenga",
				"quote": "Loasdfsadrem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
			},
			{
				"author": "Baris Canyas",
				"quote": "Loreqqewrqrwerem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
			},
			{
				"author": "Raiden Kaneda",
				"quote": "Lo------rem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
			}
		],
		"join": {
			"header": "Join the Fitness Revolution"
		}
	},
	"aboutPage": {
		"landing": {
			"image": "https://scontent-atl3-1.cdninstagram.com/t51.2885-15/e35/15802716_253884945025372_5272580072513994752_n.jpg",
			"header": "What is NinjaFit Gym?",
			"content": "NinjaFit Gym is Orlando’s destination for Ninja Warrior and Obstacle Course Race (OCR) training! Are you looking to become the next breakout star on American Ninja Warrior? Do you want to take your OCR training to the next level? Or do you just want a functional fitness program that will help you live your life to the max? Our state-of-the-art facilities and expertly trained staff can get you there!\nFrom rope walls, cargo nets, and obstacle rigs to free weights, kettlebells, TRX equipment, and squat racks, we have something for everyone! Our Spartan SGX Certified coach, the official training certification of Spartan Race, provides purpose built programming to help you level up for that next race while our highly qualified coaches will help you get fit for life through our boot camp style functional fitness classes."
		},
		"philosophy": {
			"image": "https://scontent-atl3-1.cdninstagram.com/t51.2885-15/e35/15802716_253884945025372_5272580072513994752_n.jpg",
			"header": "Our Philosophy",
			"content": "NinjaFit Gym believes that everyone can improve their quality of life by achieving their own optimal level of fitness. Our comprehensive, full body fitness programs are designed for athletes of all experience levels and ages- novice or elite; young or mature. We thrive on seeing our members grow and succeed at achieving their personal health and fitness goals!"
		},
		"staff": {
			"header": "Meet the Team"
		}
	},
	"offerPage": {
		"ninja": {
			"image": "https://scontent-atl3-1.cdninstagram.com/t51.2885-15/e35/16229014_645122905690048_6995751145289285632_n.jpg",
			"header": "Ninja Warrior Training",
			"content": "If you’ve ever had any interest in competing on the next season of American Ninja Warrior or thought to yourself, “I would love to try some of those obstacles”, our facility is a must-visit! We are Central Florida’s destination for Ninja Warrior Training. In face, quite a few previous and current competitors on American Ninja Warrior train in our gym and we feel quite privileged to have them. If you’re ready for the spotlight and challenge of auditioning for American Ninja Warrior then we’d love to train with you!"
		},
		"obstacle": {
			"image": "https://scontent-atl3-1.cdninstagram.com/t51.2885-15/e35/16229014_645122905690048_6995751145289285632_n.jpg",
			"header": "Obstacle Training",
			"content": "Have you signed up for your first obstacle course race (OCR) and wondering where you can go to prepare? Are you already a seasoned obstacle course racer, elite or otherwise? Regardless of your experience or skill level, our Spartan SGX Certified head trainer will provide you with purpose built fitness programming to help you get ready for your next race!"
		},
		"functional": {
			"image": "https://scontent-atl3-1.cdninstagram.com/t51.2885-15/e35/16229014_645122905690048_6995751145289285632_n.jpg",
			"header": "Functional Training",
			"content": "Functional fitness training is a great way to improve overall fitness levels and here at NinjaFit Gym our boot camp style classes utilize a combination of free weights, kettlebells, ropes, medicine balls, balance boards, TRX equipment, plyometrics / bodyweight exercise, and much more to get you into shape from head to toe! Through our classes you will burn calories, improve your cardiovascular performance, increase strength, and gain flexibility resulting in an increased ability to handle your activities of daily living and whatever else life throws your way!"
		},
		"kids": {
			"image": "https://scontent-atl3-1.cdninstagram.com/t51.2885-15/e35/16229014_645122905690048_6995751145289285632_n.jpg",
			"header": "NinjaFit Kids (ages 5 & up)",
			"content": "NinjaFit Kids is our hit program that progresses kids through the use of a belt system, similar to a martial arts. They learn obstacle skill development, run through our very own obstacle course, and through these experiences, gain general fitness, improved self-esteem, and of course, new friends!\n"
		},
		"workout": {
			"image": "https://scontent-atl3-1.cdninstagram.com/t51.2885-15/e35/16229014_645122905690048_6995751145289285632_n.jpg",
			"header": "Get an Hour Workout With a Trainer",
			"content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
		},
		"events": {
			"image": "https://scontent-atl3-1.cdninstagram.com/t51.2885-15/e35/16229014_645122905690048_6995751145289285632_n.jpg",
			"header": "Special Events",
			"content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
		}
	},
	"pricePackages": [
		{
			"title": "Unlimited",
			"price": "$20",
			"unit": "month",
			"desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
			"props": [
				"1 hour access",
				"Access to entire gym",
				"Personal trainer available",
				"Daily WOD",
				"0"
			]
		},
		{
			"title": "Unlimited",
			"price": "$20",
			"unit": "month",
			"desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
			"props": [
				"1 hour access",
				"Access to entire gym",
				"Personal trainer available",
				"Daily WOD",
				"1"
			]
		},
		{
			"title": "Unlimited",
			"price": "$20",
			"unit": "month",
			"desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
			"props": [
				"1 hour access",
				"Access to entire gym",
				"Personal trainer available",
				"Daily WOD",
				"2"
			]
		},
		{
			"title": "Unlimited",
			"price": "$20",
			"unit": "month",
			"desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
			"props": [
				"1 hour access",
				"Access to entire gym",
				"Personal trainer available",
				"Daily WOD",
				"3"
			]
		},
		{
			"title": "Unlimited",
			"price": "$20",
			"unit": "month",
			"desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
			"props": [
				"1 hour access",
				"Access to entire gym",
				"Personal trainer available",
				"Daily WOD",
				"4"
			]
		},
		{
			"title": "Unlimited",
			"price": "$20",
			"unit": "month",
			"desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
			"props": [
				"1 hour access",
				"Access to entire gym",
				"Personal trainer available",
				"Daily WOD",
				"5"
			]
		}
	]
};

/***/ }),
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var Inferno = __webpack_require__(9);
var TriangleLeft = __webpack_require__(31).TriangleLeft;
var commands = __webpack_require__(14).commands;

var createVNode = Inferno.createVNode;
var MenuButton = exports.MenuButton = function MenuButton(_ref) {
    var onClick = _ref.onClick;
    return createVNode(2, 'button', 'menu-btn', [createVNode(16, TriangleLeft, null, null, {
        'position': 'right v-full',
        'size': 'small'
    }), createVNode(2, 'div', 'bars', [createVNode(2, 'span', 'bar'), createVNode(2, 'span', 'bar'), createVNode(2, 'span', 'bar')])], {
        'onClick': commands.openMenu.emit
    });
};

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var Inferno = __webpack_require__(9);
var CloseButton = __webpack_require__(15).CloseButton;

var createVNode = Inferno.createVNode;
var Menu = exports.Menu = function Menu(_ref) {
    var onClose = _ref.onClose,
        opened = _ref.opened,
        children = _ref.children;
    return createVNode(2, 'div', 'app-menu' + (opened ? ' open' : ''), [createVNode(16, CloseButton, null, null, {
        'onClick': onClose
    }), createVNode(2, 'div', 'background', [createVNode(2, 'div', 'portion'), createVNode(2, 'div', 'portion'), createVNode(2, 'div', 'portion')]), createVNode(2, 'div', 'content', children)]);
};

var Footer = exports.Footer = function Footer(_ref2) {
    var onClose = _ref2.onClose,
        opened = _ref2.opened,
        children = _ref2.children;
    return createVNode(2, 'footer', 'app-footer', [createVNode(2, 'div', 'logo', [createVNode(2, 'div', 'title', 'NinjaFit Gym'), createVNode(2, 'div', 'copyright', 'NinjaFit Gym \xA9 2017')]), children]);
};

var NavTitle = exports.NavTitle = function NavTitle(_ref3) {
    var children = _ref3.children;
    return createVNode(2, 'div', 'title', children);
};

var MenuLinks = exports.MenuLinks = function MenuLinks(_ref4) {
    var children = _ref4.children;
    return createVNode(2, 'nav', 'nav', children);
};

var SocialLinks = exports.SocialLinks = function SocialLinks(_ref5) {
    var children = _ref5.children;
    return createVNode(2, 'nav', 'social', children);
};

var MenuLink = exports.MenuLink = function MenuLink(_ref6) {
    var selected = _ref6.selected,
        children = _ref6.children,
        onClick = _ref6.onClick;
    return createVNode(2, 'a', 'link' + (selected ? " selected" : ""), children, {
        'onClick': onClick
    });
};

var SocialLink = exports.SocialLink = function SocialLink(_ref7) {
    var href = _ref7.href,
        children = _ref7.children;
    return createVNode(2, 'a', 'link', createVNode(2, 'div', 'social-item', children), {
        'target': 'nfg-social',
        'href': href
    });
};

var Text = exports.Text = function Text(_ref8) {
    var children = _ref8.children;
    return createVNode(2, 'span', 'text', children);
};

/***/ }),
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Inferno = __webpack_require__(9);

var createVNode = Inferno.createVNode;
module.exports = function (_ref) {
    var children = _ref.children,
        offset = _ref.offset,
        scrolling = _ref.scrolling;


    var className = "app mobile",
        styles = null;

    if (scrolling) className += ' scrolling';
    if (offset) styles = { transform: 'translateY(-' + offset + 'px)' };

    return createVNode(2, 'div', className, children, {
        'style': styles
    });
};

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Inferno = __webpack_require__(9);

var createVNode = Inferno.createVNode;
module.exports = function (_ref) {
    var pos = _ref.pos,
        align = _ref.align,
        show = _ref.show,
        text = _ref.text,
        level = _ref.level;

    var className = "popover " + (level || "error") + " " + (pos || "above") + " " + (align || "left");

    if (show) className += ' show';

    return createVNode(2, "div", className, text);
};

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Inferno = __webpack_require__(9);
var utils = __webpack_require__(10);
var settings = __webpack_require__(11);
var pages = __webpack_require__(13).pages;
var commands = __webpack_require__(14).commands;

var HomeIcon = __webpack_require__(96);
var KettlebellIcon = __webpack_require__(97);
var CalendarIcon = __webpack_require__(94);
var HeartbeatIcon = __webpack_require__(95);
var ThumbsUpIcon = __webpack_require__(102);
var RunningIcon = __webpack_require__(100);
var EnvelopeIcon = __webpack_require__(34);
var LoginIcon = __webpack_require__(101);
var SocialIcons = __webpack_require__(23);

var _require = __webpack_require__(70),
    Menu = _require.Menu,
    MenuLinks = _require.MenuLinks,
    MenuLink = _require.MenuLink,
    Text = _require.Text,
    SocialLinks = _require.SocialLinks,
    SocialLink = _require.SocialLink;

var createVNode = Inferno.createVNode;


module.exports = function (_ref) {
    var opened = _ref.opened,
        page = _ref.page;
    return createVNode(16, Menu, null, null, {
        'opened': opened,
        'onClose': commands.closeMenu.emit,
        children: [createVNode(16, MenuLinks, null, null, {
            children: [createVNode(16, MenuLink, null, null, {
                'selected': page == pages.home,
                'onClick': function onClick() {
                    return commands.redirect.emit(pages.home);
                },
                children: [createVNode(16, HomeIcon), createVNode(16, Text, null, null, {
                    children: 'Home'
                })]
            }), createVNode(16, MenuLink, null, null, {
                'selected': page == pages.aboutUs,
                'onClick': function onClick() {
                    return commands.redirect.emit(pages.aboutUs);
                },
                children: [createVNode(16, RunningIcon), createVNode(16, Text, null, null, {
                    children: 'About Us'
                })]
            }), createVNode(16, MenuLink, null, null, {
                'selected': page == pages.whatWeOffer,
                'onClick': function onClick() {
                    return commands.redirect.emit(pages.whatWeOffer);
                },
                children: [createVNode(16, KettlebellIcon), createVNode(16, Text, null, null, {
                    children: 'What We Offer'
                })]
            }), createVNode(16, MenuLink, null, null, {
                'selected': page == pages.schedule,
                'onClick': function onClick() {
                    return commands.redirect.emit(pages.schedule);
                },
                children: [createVNode(16, CalendarIcon), createVNode(16, Text, null, null, {
                    children: 'Schedule'
                })]
            }), createVNode(16, MenuLink, null, null, {
                'selected': page == pages.wod,
                'onClick': function onClick() {
                    return commands.redirect.emit(pages.wod);
                },
                children: [createVNode(16, HeartbeatIcon), createVNode(16, Text, null, null, {
                    children: 'WOD'
                })]
            }), createVNode(16, MenuLink, null, null, {
                'selected': page == pages.contact,
                'onClick': function onClick() {
                    return commands.redirect.emit(pages.contact);
                },
                children: [createVNode(16, EnvelopeIcon), createVNode(16, Text, null, null, {
                    children: 'Contact'
                })]
            }), createVNode(16, MenuLink, null, null, {
                'selected': page == pages.joinUs,
                'onClick': function onClick() {
                    return commands.redirect.emit(pages.joinUs);
                },
                children: [createVNode(16, ThumbsUpIcon), createVNode(16, Text, null, null, {
                    children: 'Join Us'
                })]
            }), createVNode(16, MenuLink, null, null, {
                'selected': page == pages.login,
                'onClick': function onClick() {
                    return commands.redirect.emit(pages.login);
                },
                children: [createVNode(16, LoginIcon), createVNode(16, Text, null, null, {
                    children: 'Login'
                })]
            })]
        }), createVNode(16, SocialLinks, null, null, {
            children: utils.map(settings.social, function (href, type) {
                var Icon = SocialIcons[type.toLowerCase()];

                return createVNode(16, SocialLink, null, null, {
                    'href': href,
                    children: createVNode(16, Icon)
                });
            })
        })]
    });
};

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Inferno = __webpack_require__(9);
var Component = __webpack_require__(12);
var utils = __webpack_require__(10);
var settings = __webpack_require__(11);
var HeaderBar = __webpack_require__(22);
var PageFooter = __webpack_require__(40);
var Popup = __webpack_require__(38);
var Page = __webpack_require__(19);
var Social = __webpack_require__(23);

var _require = __webpack_require__(16),
    Section = _require.Section,
    Header = _require.Header,
    Content = _require.Content,
    Footer = _require.Footer,
    Image = _require.Image;

var _require2 = __webpack_require__(31),
    TriangleUpRight = _require2.TriangleUpRight,
    TriangleDown = _require2.TriangleDown,
    Background = _require2.Background;

var _require3 = __webpack_require__(15),
    Button = _require3.Button,
    CloseButton = _require3.CloseButton;

var createVNode = Inferno.createVNode;


module.exports = function (_Component) {
    _inherits(AboutUs, _Component);

    function AboutUs(props) {
        _classCallCheck(this, AboutUs);

        var _this = _possibleConstructorReturn(this, (AboutUs.__proto__ || Object.getPrototypeOf(AboutUs)).call(this, props));

        _this.viewBio = _this.viewBio.bind(_this);
        _this.closePopup = _this.closePopup.bind(_this);

        _this.state = { showPopup: false };
        return _this;
    }

    _createClass(AboutUs, [{
        key: 'viewBio',
        value: function viewBio(member) {
            this.setState({ showPopup: true, selected: member });
        }
    }, {
        key: 'closePopup',
        value: function closePopup() {
            this.setState({ showPopup: false });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var member = this.state.selected || { bio: '' };

            return createVNode(16, Page, null, null, {
                'name': 'about-us',
                children: [createVNode(16, HeaderBar, null, null, {
                    'title': 'About Us'
                }), createVNode(16, Section, null, null, {
                    'name': 'landing',
                    children: [createVNode(16, Header, null, null, {
                        'text': settings.aboutPage.landing.header
                    }), createVNode(16, Content, null, null, {
                        'text': settings.aboutPage.landing.content
                    })]
                }), createVNode(16, Section, null, null, {
                    'name': 'our-philosophy',
                    children: [createVNode(16, Background, null, null, {
                        children: [createVNode(16, TriangleUpRight, null, null, {
                            'position': 'left h-full'
                        }), createVNode(2, 'div', 'middle'), createVNode(16, TriangleDown, null, null, {
                            'position': 'bottom h-full'
                        })]
                    }), createVNode(16, Image, null, null, {
                        'url': settings.aboutPage.philosophy.image
                    }), createVNode(16, Header, null, null, {
                        'text': settings.aboutPage.philosophy.header
                    }), createVNode(16, Content, null, null, {
                        'text': settings.aboutPage.philosophy.content
                    })]
                }), createVNode(16, Section, null, null, {
                    'name': 'team',
                    children: [createVNode(16, Header, null, null, {
                        'text': settings.aboutPage.staff.header
                    }), createVNode(2, 'div', 'content', createVNode(2, 'ul', 'image-list', utils.map(settings.staff, function (member, i) {
                        return createVNode(2, 'li', 'image-item', [createVNode(2, 'div', 'image-wrapper', createVNode(2, 'div', 'image', null, {
                            'style': { backgroundImage: 'url("' + member.image + '")' }
                        })), createVNode(2, 'div', 'title', member.name), createVNode(2, 'div', 'desc', member.title), createVNode(16, Footer, null, null, {
                            children: createVNode(16, Button, null, null, {
                                'onClick': function onClick(e) {
                                    return _this2.viewBio(member);
                                },
                                children: 'Bio'
                            })
                        })]);
                    })))]
                }), createVNode(16, Popup, null, null, {
                    'open': this.state.showPopup,
                    'type': 'staff-member',
                    children: [createVNode(2, 'header', 'header', [createVNode(16, Image, null, null, {
                        'url': member.image
                    }), createVNode(2, 'div', 'details', [createVNode(2, 'div', 'name', member.name), createVNode(2, 'div', 'title', member.title), createVNode(2, 'div', 'social-list', utils.map(member.social, function (href, type) {
                        var Icon = Social[type];

                        return createVNode(2, 'a', 'social-link', createVNode(16, Icon), {
                            'href': href,
                            'target': 'social'
                        });
                    }))]), createVNode(16, CloseButton, null, null, {
                        'onClick': this.closePopup
                    })]), createVNode(16, Content, null, null, {
                        'text': member.bio
                    })]
                })]
            });
        }
    }]);

    return AboutUs;
}(Component);

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Inferno = __webpack_require__(9);
var Component = __webpack_require__(12);
var Page = __webpack_require__(19);
var HeaderBar = __webpack_require__(22);
var ContactForm = __webpack_require__(39);
var VisitUs = __webpack_require__(29);

var createVNode = Inferno.createVNode;
module.exports = function (_Component) {
    _inherits(Contact, _Component);

    function Contact(props) {
        _classCallCheck(this, Contact);

        var _this = _possibleConstructorReturn(this, (Contact.__proto__ || Object.getPrototypeOf(Contact)).call(this, props));

        _this.state = {};
        return _this;
    }

    _createClass(Contact, [{
        key: 'render',
        value: function render() {
            var i = 0;

            return createVNode(16, Page, null, null, {
                'name': 'contact',
                children: [createVNode(16, HeaderBar, null, null, {
                    'title': 'Contact'
                }), createVNode(16, ContactForm), createVNode(16, VisitUs)]
            });
        }
    }]);

    return Contact;
}(Component);

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Inferno = __webpack_require__(9);
var Component = __webpack_require__(12);
var utils = __webpack_require__(10);
var settings = __webpack_require__(11).homePage;

var _require = __webpack_require__(14),
    events = _require.events,
    commands = _require.commands;

var constants = __webpack_require__(13);
var ContactForm = __webpack_require__(39);
var Page = __webpack_require__(19);
var Player = __webpack_require__(58);
var MenuButton = __webpack_require__(69).MenuButton;
var ContactMap = __webpack_require__(26);
var TouchIcon = __webpack_require__(103);
var ArrowDownIcon = __webpack_require__(44);

var _require2 = __webpack_require__(16),
    Section = _require2.Section,
    Header = _require2.Header,
    Content = _require2.Content,
    Image = _require2.Image,
    Footer = _require2.Footer;

var Button = __webpack_require__(15).Button;

var _require3 = __webpack_require__(31),
    Background = _require3.Background,
    TriangleRight = _require3.TriangleRight,
    TriangleLeft = _require3.TriangleLeft,
    TriangleDown = _require3.TriangleDown,
    TriangleUpRight = _require3.TriangleUpRight,
    TriangleUpLeft = _require3.TriangleUpLeft,
    MiddleConnector = _require3.MiddleConnector;

var createVNode = Inferno.createVNode;


module.exports = function (_Component) {
    _inherits(Home, _Component);

    function Home(props) {
        _classCallCheck(this, Home);

        var _this = _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).call(this, props));

        _this.resize = _this.resize.bind(_this);
        _this.nextImage = _this.nextImage.bind(_this);
        _this.goToImage = _this.goToImage.bind(_this);
        _this.playIntro = _this.playIntro.bind(_this);
        _this.closePlayer = _this.closePlayer.bind(_this);

        _this.nextTestimonial = _this.nextTestimonial.bind(_this);
        _this.prevTestimonial = _this.prevTestimonial.bind(_this);

        _this.state = {
            sliderIndex: 0,
            testimonialIndex: 0
        };
        return _this;
    }

    _createClass(Home, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            events.onWindowResize.subscribe(this.resize);

            this.resizeTimeoutId = setTimeout(this.resize, 100);
            this.nextImageTimeoutId = setTimeout(this.nextImage, constants.imageSliderTimeout);
            this.nextTestimonialTimeoutId = setTimeout(this.nextTestimonial, constants.testimonialTimeout);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            events.onWindowResize.unsubscribe(this.resize);
        }
    }, {
        key: 'nextImage',
        value: function nextImage() {
            this.setState({ sliderIndex: (this.state.sliderIndex + 1) % settings.home.images.length });

            this.nextImageTimeoutId = setTimeout(this.nextImage, constants.imageSliderTimeout);
        }
    }, {
        key: 'goToImage',
        value: function goToImage(i) {
            if (i === this.state.sliderIndex) return;

            clearTimeout(this.nextImageTimeoutId);

            this.setState({ sliderIndex: i });

            this.nextImageTimeoutId = setTimeout(this.nextImage, constants.imageSliderTimeout);
        }
    }, {
        key: 'nextTestimonial',
        value: function nextTestimonial() {
            clearTimeout(this.nextTestimonialTimeoutId);

            this.setState({ testimonialIndex: (this.state.testimonialIndex + 1) % settings.testimonials.length });

            this.nextTestimonialTimeoutId = setTimeout(this.nextTestimonial, constants.testimonialTimeout);
        }
    }, {
        key: 'prevTestimonial',
        value: function prevTestimonial() {
            clearTimeout(this.nextTestimonialTimeoutId);

            var i = this.state.testimonialIndex - 1;if (i < 0) i = settings.testimonials.length - 1;

            this.setState({ testimonialIndex: i });

            this.nextTestimonialTimeoutId = setTimeout(this.nextTestimonial, constants.testimonialTimeout);
        }
    }, {
        key: 'playIntro',
        value: function playIntro() {
            this.setState({ showVideo: true });
        }
    }, {
        key: 'closePlayer',
        value: function closePlayer() {
            this.setState({ showVideo: false });
        }
    }, {
        key: 'resize',
        value: function resize() {
            if (this.header) {

                var c = this.header.parentElement;
                var x1 = c.clientWidth;
                var y1 = this.header.clientHeight;
                var x2 = c.clientWidth / 2;
                var y2 = c.clientHeight / 2; // + o;
                var sqrt3 = Math.sqrt(3);

                var y = -(sqrt3 / 4) * (x1 - y1 * sqrt3 - x2 - y2 / sqrt3);
                var x = sqrt3 * y - y1 * sqrt3 + x1;

                var r = Math.sqrt(Math.pow(x - x2, 2) + Math.pow(y - y2, 2));
                var h = 2 * r;
                var x3 = x2 - r / 2;
                var r2 = 2 / sqrt3 * (c.clientWidth - x3);
                var w = 2 * r2;

                var styles = {
                    width: c.clientWidth,
                    height: 2 * c.clientWidth / sqrt3 + c.clientHeight - 2 * this.header.clientHeight // + 2 * o
                };

                this.setState({
                    sliderStyles: { width: w, height: h },
                    wrapperStyles: styles
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return createVNode(16, Page, null, null, {
                'name': 'home',
                children: [createVNode(16, Section, null, null, {
                    'name': 'landing',
                    children: [createVNode(2, 'header', 'header', [createVNode(2, 'p', 'main', 'NinjaFit'), createVNode(2, 'p', 'sub', 'Gym'), createVNode(16, MenuButton)], null, null, function (e) {
                        return _this2.header = e;
                    }), createVNode(2, 'div', 'image-slider', createVNode(2, 'div', 'image-wrapper', utils.map(settings.home.images, function (image, i) {
                        var pos = 'hidden',
                            offset = utils.getListOffset(i, _this2.state.sliderIndex, settings.home.images.length);

                        if (offset == 0) pos = 'curr';else if (offset < 0) pos = 'left' + -offset;else if (offset > 0) pos = 'right' + offset;

                        return createVNode(2, 'div', 'image ' + pos, null, {
                            'style': { backgroundImage: 'url("' + image.url + '")' }
                        });
                    }), {
                        'style': this.state.wrapperStyles
                    }), {
                        'style': this.state.sliderStyles
                    }), createVNode(2, 'div', 'image-selectors', utils.map(settings.home.images, function (image, i) {
                        var className = "image-selector";

                        if (i == _this2.state.sliderIndex) className += ' selected';

                        return createVNode(2, 'div', className, createVNode(2, 'div', 'selector'), {
                            'onClick': function onClick() {
                                return _this2.goToImage(i);
                            }
                        });
                    })), createVNode(16, Footer, null, null, {
                        children: [createVNode(16, TouchIcon), createVNode(16, ArrowDownIcon), createVNode(2, 'span', 'text', 'Scroll to Explore')]
                    })]
                }), createVNode(16, Section, null, null, {
                    'name': 'about',
                    children: [createVNode(16, Header, null, null, {
                        'text': settings.about.header
                    }), createVNode(16, Content, null, null, {
                        'text': settings.about.content
                    }), createVNode(16, Player, null, null, {
                        'show': this.state.showVideo,
                        'url': settings.about.video,
                        'onClose': this.closePlayer
                    }), createVNode(16, Footer, null, null, {
                        children: [createVNode(16, Button, null, null, {
                            'onClick': this.playIntro,
                            children: 'Play Intro'
                        }), createVNode(16, Button, null, null, {
                            'onClick': function onClick(e) {
                                return commands.redirect.emit(constants.pages.aboutUs);
                            },
                            children: 'Explore More'
                        })]
                    })]
                }), createVNode(16, Section, null, null, {
                    'name': 'main-section1',
                    children: [createVNode(16, Background, null, null, {
                        children: [createVNode(16, TriangleRight, null, null, {
                            'position': 'left v-full',
                            'size': 'large'
                        }), createVNode(16, TriangleLeft, null, null, {
                            'position': 'right top small',
                            'size': 'small'
                        })]
                    }), createVNode(16, Image, null, null, {
                        'url': settings.main1.image
                    }), createVNode(16, Header, null, null, {
                        'text': settings.main1.header
                    }), createVNode(16, Content, null, null, {
                        'text': settings.main1.content
                    })]
                }), createVNode(16, Section, null, null, {
                    'name': 'main-section2',
                    children: [createVNode(16, Image, null, null, {
                        'url': settings.main2.image
                    }), createVNode(16, Header, null, null, {
                        'text': settings.main2.header
                    }), createVNode(16, Content, null, null, {
                        'text': settings.main2.content
                    })]
                }), createVNode(16, Section, null, null, {
                    'name': 'main-section3',
                    children: [createVNode(16, Background, null, null, {
                        children: [createVNode(16, TriangleUpRight, null, null, {
                            'position': 'left h-full'
                        }), createVNode(16, MiddleConnector), createVNode(16, TriangleDown, null, null, {
                            'position': 'bottom h-full'
                        })]
                    }), createVNode(16, Image, null, null, {
                        'url': settings.main3.image
                    }), createVNode(16, Header, null, null, {
                        'text': settings.main3.header
                    }), createVNode(16, Content, null, null, {
                        'text': settings.main3.content
                    })]
                }), createVNode(16, Section, null, null, {
                    'name': 'short-section1',
                    children: [createVNode(16, Background, null, null, {
                        children: createVNode(16, TriangleRight, null, null, {
                            'position': 'left top small',
                            'size': 'small'
                        })
                    }), createVNode(16, Header, null, null, {
                        'text': settings.short1.header
                    }), createVNode(16, Content, null, null, {
                        'text': settings.short1.content
                    }), createVNode(16, Footer, null, null, {
                        children: createVNode(16, Button, null, null, {
                            'onClick': function onClick(e) {
                                return commands.redirect.emit(constants.pages.aboutUs, constants.sections.kids);
                            },
                            children: 'Explore More'
                        })
                    })]
                }), createVNode(16, Section, null, null, {
                    'name': 'short-section2',
                    children: [createVNode(16, Background, null, null, {
                        children: createVNode(16, TriangleLeft, null, null, {
                            'position': 'right top small',
                            'size': 'small'
                        })
                    }), createVNode(16, Header, null, null, {
                        'text': settings.short2.header
                    }), createVNode(16, Content, null, null, {
                        'text': settings.short2.content
                    }), createVNode(16, Footer, null, null, {
                        children: createVNode(16, Button, null, null, {
                            'onClick': function onClick(e) {
                                return commands.redirect.emit(constants.pages.aboutUs, constants.sections.specialEvnts);
                            },
                            children: 'Explore More'
                        })
                    })]
                }), createVNode(16, Section, null, null, {
                    'name': 'testimonials',
                    children: [createVNode(16, Background, null, null, {
                        children: [createVNode(16, TriangleUpLeft, null, null, {
                            'position': 'right h-full'
                        }), createVNode(16, MiddleConnector), createVNode(16, TriangleDown, null, null, {
                            'position': 'bottom h-full'
                        })]
                    }), createVNode(2, 'header', 'header', [createVNode(2, 'button', 'icon-btn', createVNode(16, TriangleLeft), {
                        'onClick': this.prevTestimonial
                    }), createVNode(2, 'span', 'title', 'Testimonials'), createVNode(2, 'button', 'icon-btn', createVNode(16, TriangleRight), {
                        'onClick': this.nextTestimonial
                    })]), createVNode(2, 'div', 'quotes', utils.map(settings.testimonials, function (testimonial, i) {
                        var offset = utils.getListOffset(i, _this2.state.testimonialIndex, settings.testimonials.length),
                            className = "quote ";

                        if (offset == 0) className += 'curr';else if (offset < 0) className += 'left';else if (offset > 0) className += 'right';

                        return createVNode(2, 'div', className, [createVNode(2, 'div', 'text', testimonial.quote), createVNode(2, 'div', 'author', testimonial.author)]);
                    }))]
                }), createVNode(16, Section, null, null, {
                    'name': 'join',
                    children: [createVNode(16, Header, null, null, {
                        'text': settings.join.header
                    }), createVNode(16, Footer, null, null, {
                        children: createVNode(16, Button, null, null, {
                            'onClick': function onClick(e) {
                                return commands.redirect.emit(constants.pages.joinUs);
                            },
                            children: 'See Pricing'
                        })
                    })]
                }), createVNode(16, ContactMap, null, null, {
                    'className': 'map',
                    'version': '3'
                }), createVNode(16, ContactForm, null, null, {
                    'title': 'Get In Touch',
                    children: createVNode(16, Background, null, null, {
                        children: [createVNode(16, TriangleLeft, null, null, {
                            'position': 'v-half bottom right',
                            'size': 'x'
                        }), createVNode(16, TriangleRight, null, null, {
                            'position': 'left v-full'
                        })]
                    })
                })]
            });
        }
    }]);

    return Home;
}(Component);

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _module$exports;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var utils = __webpack_require__(10);
var pages = __webpack_require__(13).pages;

module.exports = (_module$exports = {}, _defineProperty(_module$exports, pages.home, __webpack_require__(87)), _defineProperty(_module$exports, pages.aboutUs, __webpack_require__(85)), _defineProperty(_module$exports, pages.contact, __webpack_require__(86)), _defineProperty(_module$exports, pages.joinUs, __webpack_require__(89)), _defineProperty(_module$exports, pages.login, __webpack_require__(90)), _defineProperty(_module$exports, pages.schedule, __webpack_require__(91)), _defineProperty(_module$exports, pages.whatWeOffer, __webpack_require__(92)), _defineProperty(_module$exports, pages.wod, __webpack_require__(93)), _module$exports);

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Inferno = __webpack_require__(9);
var Component = __webpack_require__(12);
var Page = __webpack_require__(19);
var HeaderBar = __webpack_require__(22);
var VisitUs = __webpack_require__(29);
var Pricing = __webpack_require__(59);
var ContactForm = __webpack_require__(39);

var createVNode = Inferno.createVNode;
module.exports = function (_Component) {
    _inherits(JoinUs, _Component);

    function JoinUs(props) {
        _classCallCheck(this, JoinUs);

        var _this = _possibleConstructorReturn(this, (JoinUs.__proto__ || Object.getPrototypeOf(JoinUs)).call(this, props));

        _this.state = {};
        return _this;
    }

    _createClass(JoinUs, [{
        key: 'render',
        value: function render() {
            return createVNode(16, Page, null, null, {
                'name': 'join-us',
                children: [createVNode(16, HeaderBar, null, null, {
                    'title': 'Join Us'
                }), createVNode(16, Pricing), createVNode(16, VisitUs), createVNode(16, ContactForm)]
            });
        }
    }]);

    return JoinUs;
}(Component);

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Inferno = __webpack_require__(9);
var Component = __webpack_require__(12);
var Page = __webpack_require__(19);
var HeaderBar = __webpack_require__(22);
var LoginForm = __webpack_require__(57);

var createVNode = Inferno.createVNode;
module.exports = function (_Component) {
    _inherits(Login, _Component);

    function Login(props) {
        _classCallCheck(this, Login);

        var _this = _possibleConstructorReturn(this, (Login.__proto__ || Object.getPrototypeOf(Login)).call(this, props));

        _this.state = {};
        return _this;
    }

    _createClass(Login, [{
        key: 'render',
        value: function render() {
            return createVNode(16, Page, null, null, {
                'name': 'login',
                children: [createVNode(16, HeaderBar, null, null, {
                    'title': 'Login'
                }), createVNode(16, LoginForm)]
            });
        }
    }]);

    return Login;
}(Component);

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Inferno = __webpack_require__(9);
var Component = __webpack_require__(12);
var utils = __webpack_require__(10);
var settings = __webpack_require__(11);
var HeaderBar = __webpack_require__(22);
var Page = __webpack_require__(19);
var Hours = __webpack_require__(55);
var Selector = __webpack_require__(24);
var Loader = __webpack_require__(28);
var ClockIcon = __webpack_require__(47);
var HourGlassIcon = __webpack_require__(49);
var ArrowRightIcon = __webpack_require__(45);
var calendar = __webpack_require__(41);

var views = {
    month: 'month',
    day: 'day'
};

var today = new Date(),
    todayMonth = today.getMonth(),
    todayDateKey = today.getDateKey();

var createVNode = Inferno.createVNode;
module.exports = function (_Component) {
    _inherits(Schedule, _Component);

    function Schedule(props) {
        _classCallCheck(this, Schedule);

        var _this = _possibleConstructorReturn(this, (Schedule.__proto__ || Object.getPrototypeOf(Schedule)).call(this, props));

        _this.showTomorrow = _this.showTomorrow.bind(_this);
        _this.showYesterday = _this.showYesterday.bind(_this);
        _this.showNextMonth = _this.showNextMonth.bind(_this);
        _this.showPrevMonth = _this.showPrevMonth.bind(_this);
        _this.viewDay = _this.viewDay.bind(_this);
        _this.viewMonth = _this.viewMonth.bind(_this);

        var date = new Date();
        _this.month = _this.getMonth(date);

        _this.state = {
            date: date,
            view: views.day,
            events: _this.getEvents(date),
            loading: true
        };
        return _this;
    }

    _createClass(Schedule, [{
        key: 'getEvents',
        value: function getEvents(date) {
            var _this2 = this;

            calendar.fetch(date.getDateKey()).then(function (day) {
                _this2.setState({
                    events: day.events,
                    loading: false
                });
            });

            return [];
        }
    }, {
        key: 'getMonth',
        value: function getMonth(date) {
            if (!date) date = new Date();

            var temp = date.clone().toStartOfMonth().toStartOfWeek();
            var end = date.clone().toEndOfMonth().toEndOfWeek();
            var month = date.getMonth();
            var todayKey = new Date().getDateKey();
            var days = [];

            do {
                days.push({
                    isOpen: (settings.hours[temp.getDayText().toLowerCase()] || []).length,
                    day: temp,
                    dateKey: temp.getDateKey()
                });
            } while ((temp = temp.getTomorrow()) <= end);

            return days;
        }
    }, {
        key: 'showNextMonth',
        value: function showNextMonth() {
            var date = this.state.date.clone().toStartOfMonth().addMonths(1);

            this.month = this.getMonth(date);

            this.setState({ date: date });
        }
    }, {
        key: 'showPrevMonth',
        value: function showPrevMonth() {
            var date = this.state.date.clone().toStartOfMonth().addMonths(-1);

            this.month = this.getMonth(date);

            this.setState({ date: date });
        }
    }, {
        key: 'showTomorrow',
        value: function showTomorrow() {
            this.viewDay(this.state.date.getTomorrow());
        }
    }, {
        key: 'showYesterday',
        value: function showYesterday() {
            this.viewDay(this.state.date.getYesterday());
        }
    }, {
        key: 'viewMonth',
        value: function viewMonth() {
            this.setState({
                view: views.month
            });
        }
    }, {
        key: 'viewDay',
        value: function viewDay(date) {
            if (date.getMonth() != this.state.date.getMonth) this.month = this.getMonth(date);

            this.setState({
                date: date.clone(),
                view: views.day,
                events: this.getEvents(date),
                loading: true
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var todayHours = settings.hours[this.state.date.getDayText().toLowerCase()] || [],
                selectedDateKey = this.state.date.getDateKey(),
                selectedMonth = this.state.date.getMonth();

            return createVNode(16, Page, null, null, {
                'name': 'schedule',
                children: [createVNode(16, HeaderBar, null, null, {
                    'title': 'Schedule'
                }), this.state.view == views.month ? createVNode(2, 'div', 'month-view', [createVNode(16, Selector, null, null, {
                    'onPrev': this.showPrevMonth,
                    'onNext': this.showNextMonth,
                    'title': this.state.date.getMonthText() + ', ' + this.state.date.getFullYear()
                }), createVNode(2, 'ul', 'calendar', [createVNode(2, 'li', 'title', 'Sun'), createVNode(2, 'li', 'title', 'Mon'), createVNode(2, 'li', 'title', 'Tue'), createVNode(2, 'li', 'title', 'Wed'), createVNode(2, 'li', 'title', 'Thu'), createVNode(2, 'li', 'title', 'Fri'), createVNode(2, 'li', 'title', 'Sat'), utils.map(this.month, function (props) {
                    var className = "day";

                    if (props.dateKey == selectedDateKey) {
                        className += ' selected';
                    }
                    if (props.dateKey == todayDateKey) {
                        className += ' today';
                    }
                    if (props.day.getMonth() != selectedMonth) {
                        className += ' diff-month';
                    }
                    if (props.isOpen) {
                        className += ' open';
                    }

                    return createVNode(2, 'li', className, createVNode(2, 'span', 'text', props.day.getDate()), {
                        'onClick': function onClick() {
                            return _this3.viewDay(props.day);
                        }
                    });
                })])]) : createVNode(2, 'div', 'day-view', [createVNode(16, Selector, null, null, {
                    'onPrev': this.showYesterday,
                    'onNext': this.showTomorrow,
                    'title': this.state.date.getDayText(),
                    'subTitle': this.state.date.getMonthText() + ' ' + this.state.date.getDateText() + ', ' + this.state.date.getFullYear()
                }), createVNode(2, 'div', 'calendar-separator', [createVNode(2, 'div', 'title', todayHours.length ? "Open:" : "Closed Today"), createVNode(2, 'div', 'value', utils.map(todayHours, function (span) {
                    return utils.getTimeText(span.start) + ' - ' + utils.getTimeText(span.end);
                }).join(', ')), createVNode(2, 'button', 'btn', 'View Month', {
                    'onClick': this.viewMonth
                })]), createVNode(2, 'div', 'event-list', [utils.map(this.state.events, function (event) {

                    return createVNode(2, 'div', 'event-item', [createVNode(2, 'div', 'content', [createVNode(2, 'div', 'title', event.title), createVNode(2, 'div', 'details', [createVNode(2, 'p', 'prop', [createVNode(16, ClockIcon), createVNode(2, 'span', 'value', utils.getTimeText(event.start) + ' - ' + utils.getTimeText(event.end))]), createVNode(2, 'p', 'prop', [createVNode(16, HourGlassIcon), createVNode(2, 'span', 'value', [parseInt(event.end.substr(0, 2)) - parseInt(event.start.substr(0, 2)), ' hour'])])])]), createVNode(2, 'div', 'options', createVNode(2, 'button', 'btn', [createVNode(2, 'span', null, 'Attend'), createVNode(16, ArrowRightIcon)]))]);
                }), createVNode(16, Loader, null, null, {
                    'show': this.state.loading,
                    'text': 'Retrieving events...'
                })])]), createVNode(16, Hours)]
            });
        }
    }]);

    return Schedule;
}(Component);

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Inferno = __webpack_require__(9);
var Component = __webpack_require__(12);
var utils = __webpack_require__(10);
var settings = __webpack_require__(11);
var HeaderBar = __webpack_require__(22);
var PageFooter = __webpack_require__(40);
var Page = __webpack_require__(19);
var Popup = __webpack_require__(38);

var AngleLeftIcon = __webpack_require__(32);
var AngleRightIcon = __webpack_require__(33);

var _require = __webpack_require__(16),
    Section = _require.Section,
    Header = _require.Header,
    Content = _require.Content,
    Image = _require.Image,
    Footer = _require.Footer;

var _require2 = __webpack_require__(15),
    Button = _require2.Button,
    CloseButton = _require2.CloseButton;

var _require3 = __webpack_require__(31),
    TriangleLeft = _require3.TriangleLeft,
    TriangleRight = _require3.TriangleRight,
    Background = _require3.Background;

var createVNode = Inferno.createVNode;


module.exports = function (_Component) {
    _inherits(WhatWeOffer, _Component);

    function WhatWeOffer(props) {
        _classCallCheck(this, WhatWeOffer);

        var _this = _possibleConstructorReturn(this, (WhatWeOffer.__proto__ || Object.getPrototypeOf(WhatWeOffer)).call(this, props));

        _this.view = _this.view.bind(_this);
        _this.closePopup = _this.closePopup.bind(_this);
        _this.prevSelected = _this.prevSelected.bind(_this);
        _this.nextSelected = _this.nextSelected.bind(_this);

        _this.state = {};
        return _this;
    }

    _createClass(WhatWeOffer, [{
        key: 'view',
        value: function view(item, i, parent) {
            this.index = i;
            this.selectedParent = parent;

            this.setState({ showPopup: true, selected: item });
        }
    }, {
        key: 'closePopup',
        value: function closePopup() {
            this.setState({ showPopup: false });
        }
    }, {
        key: 'prevSelected',
        value: function prevSelected() {
            if (this.state.selected && this.selectedParent) {

                var keys = Object.keys(this.selectedParent);
                var index = this.index - 1;if (index < 0) index = keys.length - 1;
                var item = this.selectedParent[keys[index]];
                this.index = index;

                this.setState({ selected: item });
            }
        }
    }, {
        key: 'nextSelected',
        value: function nextSelected() {
            if (this.state.selected && this.selectedParent) {

                var keys = Object.keys(this.selectedParent);
                var index = (this.index + 1) % keys.length;
                var item = this.selectedParent[keys[index]];
                this.index = index;

                this.setState({ selected: item });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var i = 0,
                selected = this.state.selected || {};

            return createVNode(16, Page, null, null, {
                'name': 'what-we-offer',
                children: [createVNode(16, HeaderBar, null, null, {
                    'title': 'What We Offer'
                }), createVNode(16, Section, null, null, {
                    'name': 'ninja-training',
                    children: [createVNode(16, Header, null, null, {
                        'text': settings.offerPage.ninja.header
                    }), createVNode(16, Content, null, null, {
                        'text': settings.offerPage.ninja.content
                    })]
                }), createVNode(16, Section, null, null, {
                    'name': 'obstacle-training',
                    children: [createVNode(16, Background, null, null, {
                        children: createVNode(16, TriangleRight, null, null, {
                            'position': 'v-full left',
                            'size': 'large'
                        })
                    }), createVNode(16, Header, null, null, {
                        'text': settings.offerPage.obstacle.header
                    }), createVNode(16, Content, null, null, {
                        'text': settings.offerPage.obstacle.content
                    }), createVNode(2, 'ul', 'image-list', utils.map(settings.obstacles, function (props, key, i) {
                        return createVNode(2, 'li', 'image-item', [createVNode(2, 'div', 'image-wrapper', createVNode(16, Image, null, null, {
                            'url': props.images[0]
                        })), createVNode(2, 'div', 'title', props.title), createVNode(16, Footer, null, null, {
                            children: createVNode(16, Button, null, null, {
                                'onClick': function onClick(e) {
                                    return _this2.view(props, i, settings.obstacles);
                                },
                                children: 'View'
                            })
                        })]);
                    }))]
                }), createVNode(16, Section, null, null, {
                    'name': 'functional-training',
                    children: [createVNode(16, Header, null, null, {
                        'text': settings.offerPage.functional.header
                    }), createVNode(16, Content, null, null, {
                        'text': settings.offerPage.functional.content
                    }), createVNode(2, 'ul', 'image-list', utils.map(settings.functionalEquipment, function (props, key, i) {
                        return createVNode(2, 'li', 'image-item', [createVNode(2, 'div', 'image-wrapper', createVNode(16, Image, null, null, {
                            'url': props.images[0]
                        })), createVNode(2, 'div', 'title', props.title), createVNode(16, Footer, null, null, {
                            children: createVNode(16, Button, null, null, {
                                'onClick': function onClick(e) {
                                    return _this2.view(props, i, settings.functionalEquipment);
                                },
                                children: 'View'
                            })
                        })]);
                    }))]
                }), createVNode(16, Section, null, null, {
                    'name': 'kids',
                    children: [createVNode(16, Background, null, null, {
                        children: [createVNode(16, TriangleRight, null, null, {
                            'position': 'top small left',
                            'size': 'small'
                        }), createVNode(16, TriangleLeft, null, null, {
                            'position': 'v-full right',
                            'size': 'large'
                        })]
                    }), createVNode(16, Image, null, null, {
                        'url': settings.offerPage.kids.image
                    }), createVNode(16, Header, null, null, {
                        'text': settings.offerPage.kids.header
                    }), createVNode(16, Content, null, null, {
                        'text': settings.offerPage.kids.content
                    })]
                }), createVNode(16, Section, null, null, {
                    'name': 'hourly-workout',
                    children: [createVNode(16, Image, null, null, {
                        'url': settings.offerPage.workout.image
                    }), createVNode(16, Header, null, null, {
                        'text': settings.offerPage.workout.header
                    }), createVNode(16, Content, null, null, {
                        'text': settings.offerPage.workout.content
                    })]
                }), createVNode(16, Section, null, null, {
                    'name': 'special-events',
                    children: [createVNode(16, Background, null, null, {
                        children: [createVNode(16, TriangleLeft, null, null, {
                            'position': 'v-half bottom right',
                            'size': 'x'
                        }), createVNode(16, TriangleRight, null, null, {
                            'position': 'v-full left'
                        })]
                    }), createVNode(16, Image, null, null, {
                        'url': settings.offerPage.events.image
                    }), createVNode(16, Header, null, null, {
                        'text': settings.offerPage.events.header
                    }), createVNode(16, Content, null, null, {
                        'text': settings.offerPage.events.content
                    })]
                }), createVNode(16, Popup, null, null, {
                    'open': this.state.showPopup,
                    'type': 'equipment',
                    children: [createVNode(2, 'header', 'header', [createVNode(2, 'div', 'title', selected.title), createVNode(16, CloseButton, null, null, {
                        'onClick': this.closePopup
                    })]), createVNode(2, 'ul', 'equipment-images', utils.map(selected.images, function (image) {
                        return createVNode(2, 'li', 'image-item', createVNode(2, 'div', 'image-wrapper', createVNode(2, 'div', 'image', null, {
                            'style': { backgroundImage: 'url("' + image + '")' }
                        })));
                    })), createVNode(16, Content, null, null, {
                        'text': selected.description
                    }), createVNode(16, Footer, null, null, {
                        children: [createVNode(2, 'button', 'option-btn', createVNode(16, AngleLeftIcon), {
                            'onClick': this.prevSelected
                        }), createVNode(2, 'div', 'details', (this.index || 0) + 1 + '/' + (this.selectedParent || []).length), createVNode(2, 'button', 'option-btn', createVNode(16, AngleRightIcon), {
                            'onClick': this.nextSelected
                        })]
                    })]
                })]
            });
        }
    }]);

    return WhatWeOffer;
}(Component);

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Inferno = __webpack_require__(9);
var Component = __webpack_require__(12);
var wods = __webpack_require__(43);
var utils = __webpack_require__(10);
var Page = __webpack_require__(19);
var Selector = __webpack_require__(24);
var Loader = __webpack_require__(28);
var HeaderBar = __webpack_require__(22);

var createVNode = Inferno.createVNode;
module.exports = function (_Component) {
    _inherits(WOD, _Component);

    function WOD(props) {
        _classCallCheck(this, WOD);

        var _this = _possibleConstructorReturn(this, (WOD.__proto__ || Object.getPrototypeOf(WOD)).call(this, props));

        _this.showTomorrow = _this.showTomorrow.bind(_this);
        _this.showYesterday = _this.showYesterday.bind(_this);

        var date = new Date();

        _this.state = {
            date: date,
            workouts: _this.getWorkouts(date),
            loading: true
        };
        return _this;
    }

    _createClass(WOD, [{
        key: 'getWorkouts',
        value: function getWorkouts(date) {
            var _this2 = this;

            wods.fetch(date.getDateKey()).then(function (wod) {
                _this2.setState({
                    workouts: wod.workouts,
                    loading: false
                });
            });

            return [];
        }
    }, {
        key: 'changeDay',
        value: function changeDay(date) {
            this.setState({
                workouts: this.getWorkouts(date),
                date: date,
                loading: true
            });
        }
    }, {
        key: 'showTomorrow',
        value: function showTomorrow() {
            this.changeDay(this.state.date.getTomorrow());
        }
    }, {
        key: 'showYesterday',
        value: function showYesterday() {
            this.changeDay(this.state.date.getYesterday());
        }
    }, {
        key: 'render',
        value: function render() {
            return createVNode(16, Page, null, null, {
                'name': 'wod',
                children: [createVNode(16, HeaderBar, null, null, {
                    'title': 'WOD'
                }), createVNode(16, Selector, null, null, {
                    'onPrev': this.showYesterday,
                    'onNext': this.showTomorrow,
                    'title': this.state.date.getDayText(),
                    'subTitle': this.state.date.getMonthText() + ' ' + this.state.date.getDateText() + ', ' + this.state.date.getFullYear()
                }), createVNode(2, 'div', 'calendar-separator', createVNode(2, 'span', 'title', this.state.loading ? '' : this.state.workouts.length + ' Workouts Found')), createVNode(2, 'div', 'event-list', [utils.map(this.state.workouts, function (workout) {
                    return createVNode(2, 'div', 'event-item', [createVNode(2, 'div', 'title', workout.title), createVNode(2, 'div', 'sub-title', workout.subtitle), createVNode(2, 'div', 'content', utils.map(workout.contents, function (prop) {
                        return createVNode(2, 'p', null, prop);
                    }))]);
                }), createVNode(16, Loader, null, null, {
                    'show': this.state.loading,
                    'text': 'Retrieving your workouts...'
                })])]
            });
        }
    }]);

    return WOD;
}(Component);

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Inferno = __webpack_require__(9);

var createVNode = Inferno.createVNode;
module.exports = function () {
    return createVNode(128, "svg", "icon", [createVNode(2, "path", null, null, {
        "fill-rule": "evenodd",
        "d": "M19,107a35,35 0 01 35-35h36v-27a44,44 0 01 44-44h19a44,44 0 01 44,44v27h106v-27a44,44 0 01 44-44h19a44,44 0 01 44,44v27h36a35,35 0 01 35,35v357a35,35 0 01-35,35h-392a35,35 0 01-35-35zM125.5,45a8.5,8.5 0 01 8.5-8.5h18.5a8.5,8.5 0 01 8.5,8.5v81a8.5,8.5 0 01-8.5,8.5h-18.5a8.5,8.5 0 01-8.5-8.5zM339,45a8.5,8.5 0 01 8.5-8.5h18.5a8.5,8.5 0 01 8.5,8.5v81a8.5,8.5 0 01-8.5,8.5h-18.5a8.5,8.5 0 01-8.5-8.5zM54,179h392v285h-392z"
    }), createVNode(2, "rect", null, null, {
        "width": "100",
        "height": "80",
        "x": "80",
        "y": "220"
    }), createVNode(2, "rect", null, null, {
        "width": "100",
        "height": "80",
        "x": "200",
        "y": "220"
    }), createVNode(2, "rect", null, null, {
        "width": "100",
        "height": "80",
        "x": "320",
        "y": "220"
    }), createVNode(2, "rect", null, null, {
        "width": "100",
        "height": "80",
        "x": "80",
        "y": "325"
    }), createVNode(2, "rect", null, null, {
        "width": "100",
        "height": "80",
        "x": "200",
        "y": "325"
    }), createVNode(2, "rect", null, null, {
        "width": "100",
        "height": "80",
        "x": "320",
        "y": "325"
    })], {
        "viewBox": "0 0 500 500"
    });
};

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Inferno = __webpack_require__(9);

var createVNode = Inferno.createVNode;
module.exports = function () {
    return createVNode(128, "svg", "icon", [createVNode(2, "path", null, null, {
        "d": "M31.5,250c-45.5-66-28.5-140,3.5-174c51-51,140-56,215,22c75-78,164-73,215-22c32,34,49,108,4.6,174h-102.6l-32-63a17.5,17.5 0 00-31,3l-36,120l-54-190a18.5,18.5 0 00-34,0l-32,130z"
    }), createVNode(2, "path", null, null, {
        "d": "M60,285l178,171a18,18 0 00 24,0l178-171h-86a17,17 0 01-14-10l-15.5-31l-40.5,135a17.5,17.5 0 01-34-2l-52-182l-19,77a17,17 0 01-16,13z"
    })], {
        "viewBox": "0 0 500 500"
    });
};

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Inferno = __webpack_require__(9);

var createVNode = Inferno.createVNode;
module.exports = function () {
    return createVNode(128, "svg", "icon", [createVNode(2, "path", null, null, {
        "d": "M225,62a38,38 0 01 50,0l73,61v-59.6a10,10 0 01 10-10h59a10,10 0 01 10,10v125.6l68,56.5a10,10 0 01 0,13l-19.8,23.5a10,10 0 01-13,0l-212.2-177l-212.2,177a10,10 0 01-13,0l-19.8-23.5a10,10 0 01 0-13z"
    }), createVNode(2, "path", null, null, {
        "d": "M250,132l177,146v149a20,20 0 01-20,20h-118v-118h-78v118h-118a20,20 0 01-20-20v-149z"
    })], {
        "viewBox": "0 0 500 500"
    });
};

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Inferno = __webpack_require__(9);

var createVNode = Inferno.createVNode;
module.exports = function () {
    return createVNode(128, "svg", "icon", createVNode(2, "path", null, null, {
        "fill-rule": "evenodd",
        "d": "M437,143c33-63,1-100-30-112c-67-29-247-29-314,0c-31,12-63,49-30,112l51,80a185,168 0 10 272,0zM384,116c10-21,6-41-23-44c-61-9-161-9-222,0c-29,3-33,23-21,46l45,70a185,168 0 01 174,0z"
    }), {
        "viewBox": "0 0 500 500"
    });
};

/***/ }),
/* 98 */,
/* 99 */,
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Inferno = __webpack_require__(9);

var createVNode = Inferno.createVNode;
module.exports = function () {
    return createVNode(128, "svg", "icon", [createVNode(2, "path", null, null, {
        "d": "M167,292l34,32l-158,160a24,24 0 01-35-33z"
    }), createVNode(2, "path", null, null, {
        "d": "M270,281l75,75a24,24 0 01-7,37l-144,33a24,24 0 01-13-46l96-21a3,3 0 00 1-4l-76-75a24,24 0 01 4-33l99-72l-64-47l-55,74a21.5,21.5 0 01-34-27l70-93a21.5,21.5 0 01 26-3l95,72c24,19,37,49,26,71l13,33l85-37a21.5,21.5 0 01 19,40l-108,48a21.5,21.5 0 01-26-10l-24-52z"
    }), createVNode(2, "path", null, null, {
        "d": "M396,71a47,47 0 10 17-3c2-11,3-29,2.5-37a29,22 0 00-51-15c-38.5,30-72.5,35-97.5,25c18,28,74,28,106,16c13-3,16-2,24,12c0.5,1,0,1.5-1,2z"
    })], {
        "viewBox": "0 0 500 500"
    });
};

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Inferno = __webpack_require__(9);

var createVNode = Inferno.createVNode;
module.exports = function () {
    return createVNode(128, "svg", "icon", [createVNode(2, "path", null, null, {
        "d": "M168,126v-96a20,20 0 01 34-12l177,177a20,20 0 01 0,27l-177,177a20,20 0 01-34-12v-96h-146a20,20 0 01-20-20v-125a20,20 0 01 21-20z"
    }), createVNode(2, "path", null, null, {
        "d": "M290,10a10,10 0 01 10-10h100a100,100 0 01 100,100v215a100,100 0 01-100,100h-100a10,10 0 01-10-10v-20a10,10 0 01 10-10h105a55,55 0 00 55-55v-225a55,55 0 00-55-55h-105a10,10 0 01-10-10z"
    })], {
        "viewBox": "0 -42.5 500 500"
    });
};

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Inferno = __webpack_require__(9);

var createVNode = Inferno.createVNode;
module.exports = function () {
    return createVNode(128, "svg", "icon", [createVNode(2, "path", null, null, {
        "fill-rule": "evenodd",
        "d": "M2,228.5a19,19 0 01 19-19h91a19,19 0 01 19,19v201a19,19 0 01-19,19h-91a19,19 0 01-19-19zM41.5,389.5a20,20 0 01 40.5,0a20,20 0 01-40.5,0z"
    }), createVNode(2, "path", null, null, {
        "d": "M151.5,229a19,19 0 01 19-19c15.5-4,35.5-30,83.5-90c24-24,19-62,34-91c8-15,17-20,32-17.5c60,0.5,78,73.5,47,132.5c-8,14-10,16-13,26.5l91,0.5c53,7,72,64,37.5,106c8.5,23,6.5,42-8.5,67c7,21,0,47-16.5,65c2.5,46-17.5,76-70.5,80h-51c-66-3-140-38-165.5-40a19,19 0 01-19-19z"
    })], {
        "viewBox": "0 0 500 500"
    });
};

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Inferno = __webpack_require__(9);

var createVNode = Inferno.createVNode;
module.exports = function () {
    return createVNode(128, "svg", "icon", [createVNode(2, "path", null, null, {
        "fill-rule": "evenodd",
        "d": "M143,75a37,37 0 01 68-19l1-19 a38,38 0 01 75,0v158 a37,37 0 01 59,27a34.5,34.5 0 01 55,30l-1,75c0,91-28,158-110,168l-31,1c-98-4-152-81-160-133v-33c1-41 34-72 48-73zm15,2a22.2,22.2 0 01 44-4l6,164a8,8 0 00 17-1l4-194a21.1,21.1 0 01 42-1v186a8,8 0 00 15,1v-6a23,23 0 01 45,1v24a8,8 0 00 17-1v-5a20.2,20.2 0 01 37,9l-1,78c-2,77-20,142-93,151l-42,1c-75-3 -127-70-134-123v-32c3-23 14-37 30-48l2,57a8,8 0 00 17-2z"
    }), createVNode(2, "path", null, null, {
        "d": "M144,128.6a66.4,66.4 0 01 45.7-122.1a68.6,68.6 0 11 97.3,91.5v-19.2a53.5,53.5 0 10-88.8-54.5a51.6,51.6 0 00-54.2,85.7z"
    })], {
        "viewBox": "-15 -30 530 530"
    });
};

/***/ }),
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(60)();
// imports


// module
exports.push([module.i, "@keyframes m-scroll-text-appear {\n  from {\n    transform: translate(-50%, -50%); }\n  to {\n    transform: translate(0, -50%); } }\n\n@keyframes m-scroll-appear {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n@keyframes m-scroll-down-anim {\n  0% {\n    transform: translateY(0); }\n  5% {\n    transform: translateY(30%); }\n  10% {\n    transform: translateY(0); }\n  15% {\n    transform: translateY(30%); }\n  20% {\n    transform: translateY(0); } }\n\n@keyframes m-btn-bounce-anim {\n  0%, 10% {\n    transform: scale(1);\n    top: -40px; }\n  15% {\n    transform: scale(0.97, 1.05); }\n  35%, 75% {\n    transform: scale(0.83, 1.33); }\n  95% {\n    transform: scale(1.17, 0.67); }\n  100% {\n    transform: scale(1, 0.33);\n    top: 40px; } }\n\n@keyframes m-star-spin {\n  from {\n    transform: rotate(0deg); }\n  to {\n    transform: rotate(360deg); } }\n\n.app.mobile {\n  overflow-x: hidden;\n  background: #323232; }\n  .app.mobile:not(.scrolling) {\n    transition: transform 0.5s ease-in-out; }\n\n.app.mobile .icon {\n  fill: #fff; }\n\n.app.mobile .menu-btn .bar, .app.mobile .close-btn .bar {\n  height: 3px;\n  border-radius: 5px;\n  position: relative;\n  z-index: 1;\n  background: #fff;\n  display: block; }\n\n.app.mobile .btn {\n  background-color: #fff;\n  color: #323232;\n  border-radius: 14px;\n  height: 28px;\n  width: 115px;\n  text-align: center;\n  cursor: pointer;\n  font-weight: bold;\n  white-space: nowrap;\n  position: relative;\n  transition: all 0.3s ease-in-out; }\n\n.app.mobile .btn.anim {\n  width: 16px;\n  height: 16px;\n  border-radius: 16px;\n  top: -40px;\n  background-color: #ae6be0;\n  position: relative;\n  animation: m-btn-bounce-anim 0.5s cubic-bezier(0.63, 0.09, 0.75, 0.46) 0.3s infinite alternate;\n  transform-origin: center;\n  cursor: default; }\n  .app.mobile .btn.anim * {\n    opacity: 0; }\n\n.app.mobile .btn .cover {\n  line-height: 30px;\n  height: 30px;\n  width: 117px;\n  border-radius: 117px;\n  color: #fff;\n  position: absolute;\n  transform-origin: center;\n  text-align: center;\n  transition: z-index 0.3s ease-in-out, opacity 0.3s ease-in-out;\n  transform: translate(-50%, -50%);\n  display: flex;\n  flex-flow: row;\n  align-items: center;\n  justify-content: center;\n  top: 50%;\n  left: 50%;\n  z-index: -1;\n  opacity: 0; }\n  .app.mobile .btn .cover.success {\n    background-color: #009900; }\n  .app.mobile .btn .cover.error {\n    background-color: #cc0000; }\n\n.app.mobile .btn.covered {\n  cursor: default; }\n  .app.mobile .btn.covered .cover {\n    opacity: 1;\n    z-index: 100; }\n\n.app.mobile .menu-btn {\n  width: 6rem;\n  height: 6rem;\n  display: flex;\n  flex-flow: column;\n  align-items: center;\n  justify-content: center;\n  align-self: flex-end;\n  cursor: pointer;\n  position: absolute;\n  z-index: 3;\n  right: 0; }\n  .app.mobile .menu-btn svg {\n    fill: #693590;\n    display: block;\n    position: absolute;\n    top: 0;\n    height: 100%; }\n    .app.mobile .menu-btn svg.right {\n      right: 0; }\n    .app.mobile .menu-btn svg.left {\n      left: 0; }\n  .app.mobile .menu-btn .bars {\n    position: absolute;\n    top: 50%;\n    right: 30%;\n    transform: translate(50%, -50%);\n    display: flex;\n    flex-flow: column;\n    align-items: flex-end; }\n  .app.mobile .menu-btn .bar {\n    width: 16px; }\n    .app.mobile .menu-btn .bar:not(:last-child) {\n      margin-bottom: 3px; }\n    .app.mobile .menu-btn .bar:nth-child(2) {\n      width: 24px; }\n\n.app.mobile .close-btn {\n  cursor: pointer;\n  width: 3rem;\n  height: 3rem;\n  z-index: 3;\n  transform-origin: top right;\n  position: relative; }\n  .app.mobile .close-btn .bar {\n    transform-origin: center;\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    width: 20px; }\n    .app.mobile .close-btn .bar:nth-child(1) {\n      transform: translate(-50%, -50%) rotate(45deg); }\n    .app.mobile .close-btn .bar:nth-child(2) {\n      transform: translate(-50%, -50%) rotate(-45deg); }\n\n.app.mobile .option-btn {\n  width: 3rem;\n  text-align: center;\n  font-size: 1.34rem;\n  color: #fff;\n  fill: #fff;\n  cursor: pointer; }\n\n.app.mobile input[type=text], .app.mobile input[type=password], .app.mobile input[type=number], .app.mobile textarea {\n  resize: none;\n  border-radius: 1.1em;\n  max-width: 100%;\n  flex: 0 1 100%;\n  background: #fff;\n  color: #323232;\n  transition: box-shadow 0.2s ease-in-out; }\n  .app.mobile input.has-error[type=text], .app.mobile input.has-error[type=password], .app.mobile input.has-error[type=number], .app.mobile textarea.has-error {\n    box-shadow: 0 0 0 2px #ee0000; }\n\n.app.mobile input[type=text],\n.app.mobile input[type=password],\n.app.mobile input[type=number] {\n  height: 1.2em;\n  min-height: 1.2em;\n  text-indent: 0.8em;\n  padding: 0.5em 0;\n  width: 100%; }\n\n.app.mobile textarea {\n  height: 7em;\n  min-height: 7em;\n  padding: 0.5em 0.8em; }\n\n.app.mobile .loader {\n  position: absolute;\n  top: 0;\n  bottom: 2px;\n  left: 0;\n  right: 0;\n  opacity: 0;\n  z-index: -1;\n  background-color: #272727;\n  transition: all 0.5s ease-in-out;\n  display: flex;\n  flex-flow: row;\n  justify-content: center;\n  align-items: flex-start;\n  padding-top: 50px; }\n\n.app.mobile .loader.show {\n  opacity: 1;\n  z-index: 99; }\n  .app.mobile .loader.show .throwing-star {\n    animation: m-star-spin 1.2s linear infinite normal; }\n\n.app.mobile .loader .throwing-star {\n  width: 2rem;\n  height: 2rem;\n  transform-origin: center; }\n\n.app.mobile .loader .bounce {\n  line-height: 2rem;\n  margin-top: -40px;\n  width: 24px;\n  height: 24px;\n  border-radius: 24px;\n  top: -40px;\n  background-color: #ae6be0;\n  position: relative;\n  animation: m-btn-bounce-anim 0.5s cubic-bezier(0.63, 0.09, 0.75, 0.46) 0.3s infinite alternate;\n  transform-origin: center;\n  cursor: default; }\n\n.app.mobile .loader .text {\n  font-size: 1.34rem;\n  line-height: 2rem; }\n  .app.mobile .loader .text:not(:first-child) {\n    margin-left: 15px; }\n\n.app.mobile .row {\n  display: flex;\n  flex-direction: row;\n  align-items: stretch;\n  padding: 0 5px 10px 5px;\n  margin: 0 -10px; }\n\n.app.mobile .col {\n  flex: 1 1 50%;\n  display: flex;\n  flex-direction: column;\n  align-items: stretch;\n  padding: 0 5px;\n  position: relative; }\n\n.app.mobile .popover {\n  position: absolute;\n  padding: 0 15px;\n  height: 28px;\n  line-height: 28px;\n  border-radius: 28px;\n  border-width: 1px;\n  border-style: solid;\n  white-space: nowrap; }\n  .app.mobile .popover:before, .app.mobile .popover:after {\n    content: '';\n    position: absolute;\n    border-style: solid;\n    border-color: transparent;\n    border-width: 0 8px; }\n\n.app.mobile .popover:not(.show) {\n  z-index: -1;\n  opacity: 0;\n  transition: z-index 0.1s ease-in-out 0.3s, opacity 0.3s ease-in-out; }\n\n.app.mobile .popover.show {\n  z-index: 97;\n  opacity: 1;\n  transition: opacity 0.3s; }\n\n.app.mobile .popover.error {\n  border-color: #990000;\n  background-color: #cc0000;\n  color: #fff;\n  fill: #fff; }\n  .app.mobile .popover.error:before {\n    border-color: #990000 transparent; }\n  .app.mobile .popover.error:after {\n    border-color: #cc0000 transparent; }\n\n.app.mobile .popover.above {\n  bottom: 100%;\n  margin-bottom: 10px; }\n  .app.mobile .popover.above:before, .app.mobile .popover.above:after {\n    top: 100%;\n    border-top-width: 10px; }\n  .app.mobile .popover.above:before {\n    margin-top: 1px; }\n\n.app.mobile .popover.below {\n  top: 100%;\n  margin-top: 10px; }\n  .app.mobile .popover.below:before, .app.mobile .popover.below:after {\n    bottom: 100%;\n    border-bottom-width: 10px; }\n  .app.mobile .popover.below:before {\n    margin-bottom: 1px; }\n\n.app.mobile .popover.left {\n  left: 0px; }\n  .app.mobile .popover.left:before, .app.mobile .popover.left:after {\n    left: 15px; }\n\n.app.mobile .popover.right {\n  right: 0px; }\n  .app.mobile .popover.right:before, .app.mobile .popover.right:after {\n    right: 15px; }\n\n.app.mobile .image-list {\n  display: flex;\n  flex-flow: row wrap;\n  align-items: stretch;\n  padding: 0 1.5vw;\n  justify-content: center; }\n\n.app.mobile .image-list .image-item {\n  flex: 0 1 50%;\n  text-align: center;\n  position: relative;\n  margin-bottom: 3vw;\n  max-width: 50%; }\n\n.app.mobile .image-list .image-wrapper {\n  margin: 3vw 3vw 2vw 3vw;\n  background: #693590;\n  padding: 7px; }\n\n.app.mobile .image-list .image {\n  background-position: center center;\n  background-size: cover;\n  background-repeat: no-repeat;\n  transform-origin: center;\n  padding-bottom: 60%; }\n\n.app.mobile .image-list .title {\n  margin: 0 3vw;\n  line-height: 1rem; }\n\n.app.mobile .image-list .desc {\n  margin: 0 3vw;\n  font-size: 0.7rem;\n  text-transform: uppercase;\n  color: #aaa; }\n\n.app.mobile .image-list .footer {\n  margin: 2vw 3vw 3vw 3vw;\n  position: relative;\n  z-index: 1;\n  display: flex;\n  flex-flow: row;\n  justify-content: center; }\n\n.app.mobile .image-list .btn {\n  height: 1.6em;\n  line-height: 1em;\n  width: 5em; }\n\n.app.mobile .image-selectors {\n  display: flex;\n  flex-flow: row;\n  align-items: center;\n  justify-content: center; }\n\n.app.mobile .image-selectors .image-selector {\n  display: flex;\n  flex-flow: row;\n  align-items: center;\n  justify-content: center;\n  height: 30px; }\n  .app.mobile .image-selectors .image-selector:not(.selected) {\n    cursor: pointer; }\n    .app.mobile .image-selectors .image-selector:not(.selected) .selector {\n      background: #693590; }\n  .app.mobile .image-selectors .image-selector.selected {\n    cursor: default; }\n    .app.mobile .image-selectors .image-selector.selected .selector {\n      background: #864db1; }\n\n.app.mobile .image-selectors .selector {\n  width: 10px;\n  height: 10px;\n  border-radius: 10px;\n  margin: 0 10px;\n  border: 1px solid #000; }\n\n.app.mobile .event-list {\n  flex: 0 0 auto;\n  background: #212121;\n  padding-bottom: 2px;\n  min-height: 150px;\n  position: relative; }\n\n.app.mobile .event-list .event-item {\n  margin-top: 2px;\n  position: relative;\n  background: #434343;\n  padding: 15px 15px 15px 30px;\n  z-index: 1; }\n  .app.mobile .event-list .event-item:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    bottom: 0;\n    width: 8px;\n    background: #693590; }\n  .app.mobile .event-list .event-item:after {\n    content: '';\n    position: absolute;\n    top: 50%;\n    left: 8px;\n    width: 15px;\n    height: 15px;\n    transform-origin: center;\n    transform: translate(-50%, -50%) rotate(45deg);\n    background: #693590; }\n  .app.mobile .event-list .event-item:nth-child(odd):before, .app.mobile .event-list .event-item:nth-child(odd):after {\n    background: #864db1; }\n  .app.mobile .event-list .event-item:nth-child(even) {\n    background: #373737; }\n\n.app.mobile .event-list .options {\n  flex: 0 0 auto;\n  display: flex;\n  flex-flow: column;\n  justify-content: center; }\n\n.app.mobile .event-list .title {\n  font-size: 1.5rem;\n  line-height: 1em; }\n\n.app.mobile .event-list .details {\n  padding-top: 10px;\n  display: flex;\n  flex-flow: row; }\n\n.app.mobile .event-list .prop {\n  font-size: 0.8rem;\n  color: #aaa;\n  flex: 1 1 50%;\n  display: flex;\n  flex-flow: row;\n  align-items: center; }\n\n.app.mobile .event-list .prop .icon {\n  width: 1rem;\n  text-align: center;\n  flex: 0 0 auto;\n  margin-right: 5px;\n  font-size: 0.7rem;\n  fill: #aaa; }\n  .app.mobile .event-list .prop .icon svg {\n    width: 0.7rem; }\n\n.app.mobile .event-list .btn {\n  background: none;\n  color: #fff;\n  display: flex;\n  flex-flow: row;\n  align-items: center;\n  line-height: 1rem;\n  width: auto; }\n  .app.mobile .event-list .btn svg {\n    width: 1rem; }\n  .app.mobile .event-list .btn span:not(:last-child) {\n    margin-right: 5px; }\n\n.app.mobile .pricing-list {\n  display: flex;\n  flex-flow: row;\n  justify-content: center;\n  align-items: center; }\n\n.app.mobile .pricing-list .pricing-item {\n  box-shadow: 0 0 5px 2px #212121;\n  display: flex;\n  flex-flow: column;\n  align-items: stretch;\n  position: relative;\n  background: #434343;\n  flex: 0 0 auto;\n  max-width: 300px;\n  margin-right: -150px;\n  margin-left: -150px;\n  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;\n  transform-origin: center;\n  opacity: 0; }\n  .app.mobile .pricing-list .pricing-item.curr {\n    opacity: 1;\n    transform: translate(0, 0); }\n  .app.mobile .pricing-list .pricing-item.left1 {\n    opacity: 1;\n    transform: translate(-300px, 0%) scale(0.83); }\n  .app.mobile .pricing-list .pricing-item.left2 {\n    opacity: 0;\n    transform: translate(-600px, 0%) scale(0.83); }\n  .app.mobile .pricing-list .pricing-item.left3 {\n    opacity: 0;\n    transform: translate(-900px, 0%) scale(0.83); }\n  .app.mobile .pricing-list .pricing-item.left4 {\n    opacity: 0;\n    transform: translate(-1200px, 0%) scale(0.83); }\n  .app.mobile .pricing-list .pricing-item.right1 {\n    opacity: 1;\n    transform: translate(300px, 0%) scale(0.83); }\n  .app.mobile .pricing-list .pricing-item.right2 {\n    opacity: 0;\n    transform: translate(600px, 0%) scale(0.83); }\n  .app.mobile .pricing-list .pricing-item.right3 {\n    opacity: 0;\n    transform: translate(900px, 0%) scale(0.83); }\n  .app.mobile .pricing-list .pricing-item.right4 {\n    opacity: 0;\n    transform: translate(1200px, 0%) scale(0.83); }\n  .app.mobile .pricing-list .pricing-item.hidden {\n    display: none;\n    opacity: 0;\n    transform: translate(600px, 0%) scale(0, 0); }\n\n.app.mobile .pricing-list .item-header {\n  flex: 0 0 auto;\n  background: #864db1;\n  background: -moz-linear-gradient(left, #693590 0%, #864db1 100%);\n  background: -webkit-linear-gradient(left, #693590 0%, #864db1 100%);\n  background: linear-gradient(to right, #693590 0%, #864db1 100%);\n  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#693590', endColorstr='#864db1',GradientType=1 );\n  text-align: center;\n  padding: 15px; }\n\n.app.mobile .pricing-list .item-title {\n  font-size: 1.67rem;\n  line-height: 1em; }\n\n.app.mobile .pricing-list .item-price {\n  display: flex;\n  flex-flow: row;\n  align-items: flex-end;\n  justify-content: center;\n  padding-top: 3px; }\n  .app.mobile .pricing-list .item-price .price {\n    font-weight: bold; }\n  .app.mobile .pricing-list .item-price .unit {\n    margin-left: 5px;\n    color: #ae6be0; }\n    .app.mobile .pricing-list .item-price .unit:before {\n      content: '/';\n      margin-right: 5px;\n      font-size: 1.34rem;\n      line-height: 1rem;\n      position: relative;\n      top: 2px; }\n\n.app.mobile .pricing-list .item-content {\n  flex: 1 1 auto;\n  box-shadow: inset 0 1px 0 0 #212121; }\n\n.app.mobile .pricing-list .item-desc {\n  padding: 15px 30px;\n  text-align: center; }\n\n.app.mobile .pricing-list .item-prop-list {\n  margin: 0 30px;\n  padding: 15px 0;\n  text-align: center;\n  border-top: 1px solid #545454; }\n\n.app.mobile .pricing-list .item-prop {\n  padding: 5px 0; }\n\n.app.mobile .pricing-list .item-footer {\n  flex: 0 0 auto;\n  display: flex;\n  flex-flow: row;\n  justify-content: center;\n  padding: 15px; }\n  .app.mobile .pricing-list .item-footer .btn {\n    flex: 1 1 100%;\n    height: 40px;\n    border-radius: 20px; }\n\n.app.mobile .price-selector-list {\n  display: flex;\n  flex-flow: row;\n  justify-content: center;\n  align-items: center;\n  padding: 5px;\n  margin-top: 15px; }\n\n.app.mobile .price-selector-list .price-selector {\n  flex: 0 0 auto;\n  width: 16px;\n  height: 16px;\n  display: flex;\n  flex-flow: row;\n  justify-content: center;\n  align-items: center; }\n  .app.mobile .price-selector-list .price-selector:before {\n    content: '';\n    background: #545454;\n    width: 4px;\n    height: 4px;\n    border-radius: 4px;\n    transition: background 0.2s ease-in-out; }\n  .app.mobile .price-selector-list .price-selector.active:before {\n    background: #864db1; }\n\n.fa.fa-home {\n  transform-origin: center;\n  transform: scale(1.3); }\n\n.app.mobile .app-menu {\n  position: fixed;\n  top: 0;\n  left: 0;\n  height: 102vh;\n  width: 100vw; }\n\n.app.mobile .app-menu .close-btn {\n  position: absolute;\n  top: 0;\n  right: 0; }\n\n.app.mobile .app-menu .background {\n  display: flex;\n  flex-flow: column;\n  align-items: stretch;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  width: 140vmax;\n  height: 140vmax;\n  transform-origin: center;\n  transform: translate(-50%, -50%) rotate(-30deg); }\n  .app.mobile .app-menu .background .portion {\n    flex: 1 1 100%;\n    background: #693590;\n    margin-bottom: -1px; }\n\n.app.mobile .app-menu .content {\n  position: relative;\n  display: flex;\n  flex-flow: column;\n  width: 100%;\n  height: 100%;\n  z-index: 2;\n  overflow-y: auto; }\n\n.app.mobile .app-menu .nav {\n  flex: 1 1 100%;\n  display: flex;\n  flex-flow: column;\n  justify-content: center; }\n  .app.mobile .app-menu .nav:first-child {\n    padding-top: 3rem; }\n  .app.mobile .app-menu .nav .link {\n    display: flex;\n    flex-flow: row;\n    align-items: center;\n    padding: 15px;\n    cursor: pointer;\n    border-top: 1px solid #5f2d84;\n    transition: background 0.2s ease-in-out; }\n    .app.mobile .app-menu .nav .link.selected {\n      background: #5f2d84; }\n    .app.mobile .app-menu .nav .link:last-child {\n      border-bottom: 1px solid #5f2d84; }\n  .app.mobile .app-menu .nav .icon {\n    width: 1.4rem;\n    height: 1.4rem;\n    margin: 0 18px; }\n  .app.mobile .app-menu .nav .text {\n    font-size: 1.2em; }\n\n.app.mobile .app-menu .social {\n  flex: 0 0 auto;\n  display: flex;\n  flex-flow: row;\n  align-items: stretch;\n  justify-content: flex-end;\n  padding: 15px; }\n  .app.mobile .app-menu .social:last-child {\n    padding-bottom: 10vh; }\n  .app.mobile .app-menu .social .link {\n    padding: 15px;\n    cursor: pointer; }\n  .app.mobile .app-menu .social .social-item {\n    position: relative;\n    background: #fff;\n    border-radius: 100px;\n    width: 2.25em;\n    height: 2.25em;\n    display: flex;\n    flex-flow: row;\n    align-items: center;\n    justify-content: center; }\n  .app.mobile .app-menu .social .icon {\n    fill: #693590;\n    width: 18px;\n    height: 18px; }\n\n.app.mobile .app-menu:not(.open) {\n  transition: z-index 0.01s ease-in-out 0.6s;\n  z-index: -1; }\n  .app.mobile .app-menu:not(.open) + .page .menu-btn .bar {\n    opacity: 1;\n    transition: transform 0.3s ease-in-out 0.2s, opacity 0.15s ease-in-out 0.2s; }\n  .app.mobile .app-menu:not(.open) .content {\n    opacity: 0;\n    transition: opacity 0.2s ease-in-out; }\n  .app.mobile .app-menu:not(.open) .close-btn .bar {\n    transition: transform 0.3s ease-in-out; }\n    .app.mobile .app-menu:not(.open) .close-btn .bar:nth-child(odd) {\n      transform: translate(-50%, -50%) rotate(45deg) translateX(-300%); }\n    .app.mobile .app-menu:not(.open) .close-btn .bar:nth-child(even) {\n      transform: translate(-50%, -50%) rotate(-45deg) translateX(300%); }\n  .app.mobile .app-menu:not(.open) .portion {\n    transition: transform 0.5s ease-in-out 0.1s; }\n    .app.mobile .app-menu:not(.open) .portion:nth-child(odd) {\n      transform: translateX(100%); }\n    .app.mobile .app-menu:not(.open) .portion:nth-child(even) {\n      transform: translateX(-100%); }\n\n.app.mobile .app-menu.open {\n  transition: z-index 0.01s ease-in-out 0.3s;\n  z-index: 1000; }\n  .app.mobile .app-menu.open + .page .menu-btn .bar {\n    transition: transform 0.3s ease-in-out, opacity 0.15s ease-in-out 0.15s;\n    opacity: 0; }\n    .app.mobile .app-menu.open + .page .menu-btn .bar:nth-child(odd) {\n      transform: translateX(-300%); }\n    .app.mobile .app-menu.open + .page .menu-btn .bar:nth-child(even) {\n      transform: translateX(300%); }\n  .app.mobile .app-menu.open .content {\n    opacity: 1;\n    transition: opacity 0.2s ease-in-out 0.5s; }\n  .app.mobile .app-menu.open .close-btn .bar {\n    transition: transform 0.3s ease-in-out 0.45s; }\n    .app.mobile .app-menu.open .close-btn .bar:nth-child(odd) {\n      transform: translate(-50%, -50%) rotate(45deg); }\n    .app.mobile .app-menu.open .close-btn .bar:nth-child(even) {\n      transform: translate(-50%, -50%) rotate(-45deg); }\n  .app.mobile .app-menu.open .portion {\n    transition: transform 0.5s ease-in-out 0.3s;\n    transform: translateX(0%); }\n\n.app.mobile .about-us-page > .landing .header {\n  text-align: center; }\n\n.app.mobile .about-us-page > .our-philosophy {\n  padding-top: 15px;\n  padding-bottom: 28.86751vw; }\n\n.app.mobile .about-us-page > .team {\n  margin: 28.86751vw 0 14.43376vw 0; }\n  .app.mobile .about-us-page > .team .header {\n    text-align: center; }\n  .app.mobile .about-us-page > .team .image {\n    padding-bottom: 100%; }\n\n.app.mobile .home-page > .landing {\n  text-shadow: 0 -1px rgba(0, 0, 0, 0.3);\n  display: flex;\n  flex-flow: column;\n  height: 100vh;\n  max-height: 700px;\n  min-height: 320px; }\n  .app.mobile .home-page > .landing .header {\n    flex: 0 0 auto;\n    text-align: right;\n    position: relative;\n    z-index: 0;\n    height: 180px;\n    padding: 0px; }\n  .app.mobile .home-page > .landing .main {\n    font-size: 2.4rem;\n    line-height: 1em;\n    padding-right: 30px;\n    padding-top: 30px; }\n  .app.mobile .home-page > .landing .sub {\n    font-size: 1.16rem;\n    padding-right: 30px; }\n  .app.mobile .home-page > .landing .menu-btn {\n    bottom: 0; }\n  .app.mobile .home-page > .landing .image-selectors {\n    position: absolute;\n    bottom: 180px;\n    width: 360px;\n    left: 0;\n    z-index: 1;\n    transform-origin: left bottom;\n    transform: rotate(30deg); }\n  .app.mobile .home-page > .landing .footer {\n    position: absolute;\n    bottom: 50px;\n    left: 50px;\n    z-index: 1;\n    opacity: 0;\n    animation: m-scroll-appear 0.5s ease-in-out forwards 0.75s; }\n    .app.mobile .home-page > .landing .footer .icon:nth-child(1) {\n      position: absolute;\n      left: 0;\n      top: 0;\n      z-index: 2;\n      fill: #fff;\n      width: 3em;\n      height: 3em;\n      margin-left: -1.5em;\n      margin-top: -1.5em; }\n    .app.mobile .home-page > .landing .footer .icon:nth-child(2) {\n      position: absolute;\n      width: 1.5em;\n      height: 1.5em;\n      fill: #fff;\n      top: 2.25em;\n      left: 0;\n      margin-left: -0.75em;\n      opacity: 0;\n      animation: m-scroll-appear 0.5s ease-in-out 2s forwards, m-scroll-down-anim 6s ease-in-out 2.20s infinite;\n      z-index: 1; }\n    .app.mobile .home-page > .landing .footer .text {\n      width: 60px;\n      position: absolute;\n      left: 1.5em;\n      top: 0;\n      transform: translateY(-50%);\n      animation: m-scroll-text-appear 0.5s ease-in-out forwards 0.75s;\n      z-index: 0; }\n  .app.mobile .home-page > .landing .image-slider {\n    z-index: 1;\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform-origin: center;\n    transform: translate(-50%, -50%) rotate(30deg);\n    box-shadow: 0 0 2vw 0 #000;\n    overflow: hidden; }\n  .app.mobile .home-page > .landing .image-wrapper {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%) rotate(-30deg);\n    transform-origin: center; }\n  .app.mobile .home-page > .landing .image {\n    background-position: center center;\n    background-size: cover;\n    background-repeat: no-repeat;\n    transform-origin: center;\n    position: absolute;\n    top: 0;\n    left: 0;\n    bottom: 0;\n    right: 0;\n    transform-origin: center;\n    transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;\n    opacity: 0;\n    z-index: 0; }\n    .app.mobile .home-page > .landing .image.curr {\n      opacity: 1;\n      transform: translate(0, 0);\n      z-index: 2; }\n    .app.mobile .home-page > .landing .image.left1 {\n      opacity: 1;\n      transform: translate(-100%, 0%);\n      z-index: 1;\n      transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out, z-index 0.1s ease-in-out 0.3s; }\n    .app.mobile .home-page > .landing .image.left2 {\n      opacity: 0;\n      transform: translate(-200%, 0%); }\n    .app.mobile .home-page > .landing .image.left3 {\n      opacity: 0;\n      transform: translate(-300%, 0%); }\n    .app.mobile .home-page > .landing .image.left4 {\n      opacity: 0;\n      transform: translate(-400%, 0%); }\n    .app.mobile .home-page > .landing .image.right1 {\n      opacity: 1;\n      transform: translate(100%, 0%);\n      z-index: 1;\n      transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out, z-index 0.1s ease-in-out 0.3s; }\n    .app.mobile .home-page > .landing .image.right2 {\n      opacity: 0;\n      transform: translate(200%, 0%); }\n    .app.mobile .home-page > .landing .image.right3 {\n      opacity: 0;\n      transform: translate(300%, 0%); }\n    .app.mobile .home-page > .landing .image.right4 {\n      opacity: 0;\n      transform: translate(400%, 0%); }\n    .app.mobile .home-page > .landing .image.hidden {\n      display: none;\n      opacity: 0;\n      transform: translate(200%, 0%); }\n\n.app.mobile .home-page > .about {\n  padding: 90px 0;\n  margin-top: 20vw; }\n\n.app.mobile .home-page > .main-section1 {\n  padding-top: 15px; }\n  .app.mobile .home-page > .main-section1 .content {\n    padding-bottom: 45vw;\n    max-width: 80%; }\n\n.app.mobile .home-page > .main-section2 {\n  text-align: right;\n  padding-top: 15px; }\n\n.app.mobile .home-page > .main-section3 {\n  padding-top: 15px;\n  min-height: 91.16057vw;\n  padding-bottom: 25vw; }\n  .app.mobile .home-page > .main-section3 .content {\n    max-width: 80%; }\n\n.app.mobile .home-page > .short-section1 {\n  text-align: right; }\n  .app.mobile .home-page > .short-section1 .header {\n    padding-top: 15px; }\n  .app.mobile .home-page > .short-section1 .content {\n    margin-left: 4em; }\n  .app.mobile .home-page > .short-section1 .footer {\n    justify-content: flex-end; }\n\n.app.mobile .home-page > .short-section2 .content {\n  margin-right: 5em; }\n\n.app.mobile .home-page > .testimonials {\n  text-align: center;\n  padding-top: 63.50856vw;\n  padding-bottom: 23.09402vw; }\n  .app.mobile .home-page > .testimonials .header {\n    display: flex;\n    flex-flow: row;\n    align-items: center; }\n    .app.mobile .home-page > .testimonials .header > span {\n      flex: 1 1 auto; }\n  .app.mobile .home-page > .testimonials .icon-btn {\n    display: block;\n    width: 30px;\n    height: 30px;\n    position: relative;\n    flex: 0 0 auto;\n    cursor: pointer; }\n    .app.mobile .home-page > .testimonials .icon-btn svg {\n      position: absolute;\n      z-index: 1;\n      top: 50%;\n      left: 50%;\n      transform: translate(-50%, -50%);\n      height: 0.8em;\n      fill: #431863; }\n  .app.mobile .home-page > .testimonials .quotes {\n    position: relative;\n    margin: 0;\n    z-index: 2;\n    padding: 15px 30px;\n    text-align: center;\n    display: flex;\n    flex-flow: row;\n    align-items: stretch;\n    justify-content: center; }\n  .app.mobile .home-page > .testimonials .quote {\n    flex: 0 0 100%;\n    text-align: center;\n    width: 100%;\n    margin: 0 -50%;\n    opacity: 0;\n    transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out; }\n    .app.mobile .home-page > .testimonials .quote.curr {\n      opacity: 1;\n      transform: translate(0, 0);\n      z-index: 2; }\n    .app.mobile .home-page > .testimonials .quote.left {\n      opacity: 0;\n      transform: translate(-100%, 0%);\n      z-index: 1;\n      transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out, z-index 0.1s ease-in-out 0.3s; }\n    .app.mobile .home-page > .testimonials .quote.right {\n      opacity: 0;\n      transform: translate(100%, 0%);\n      z-index: 1;\n      transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out, z-index 0.1s ease-in-out 0.3s; }\n\n.app.mobile .home-page > .join {\n  min-height: 40vh;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  text-align: center;\n  margin: 30px 0;\n  padding-bottom: 15vh; }\n  .app.mobile .home-page > .join .header {\n    font-size: 2em;\n    padding: 30px; }\n  .app.mobile .home-page > .join .footer {\n    justify-content: center; }\n\n.app.mobile .home-page > .map {\n  z-index: 1;\n  position: relative;\n  height: 300px;\n  margin-bottom: calc(23.20508px - 28.86751vw);\n  margin-top: calc(28.86751vw - 23.20508px);\n  display: block; }\n  .app.mobile .home-page > .map .image-wrapper {\n    margin: auto;\n    background: #212121;\n    width: 173.20508vw;\n    height: 300px;\n    overflow: hidden;\n    z-index: 2;\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform-origin: center;\n    transform: translate(-50%, -50%) rotate(30deg);\n    box-shadow: 0 0 2vw 0 #000; }\n  .app.mobile .home-page > .map .image {\n    position: absolute;\n    top: 50%;\n    left: 20%;\n    right: 20%;\n    padding-top: 50%;\n    padding-bottom: 50%;\n    z-index: 1;\n    background-position: center;\n    background-size: cover;\n    background-repeat: no-repeat;\n    transform-origin: center;\n    transform: translateY(-50%) rotate(-30deg); }\n\n.app.mobile .home-page > .contact {\n  height: 130vw;\n  min-height: 600px;\n  z-index: 10;\n  display: flex;\n  flex-flow: column;\n  justify-content: center; }\n  .app.mobile .home-page > .contact .content,\n  .app.mobile .home-page > .contact .footer {\n    max-width: 60%; }\n  .app.mobile .home-page > .contact .btn {\n    color: #693590; }\n\n.app.mobile .join-us-page .contact-map {\n  margin: 0px; }\n\n.app.mobile .join-us-page .visit-us .content {\n  padding-top: 0px;\n  padding-bottom: 0px; }\n\n.app.mobile .join-us-page .visit-us .contact-item {\n  justify-content: center; }\n\n.app.mobile .join-us-page .contact {\n  margin-top: 30px; }\n\n.app.mobile .join-us-page .pricing .header {\n  text-align: center; }\n\n.app.mobile .login-page .login {\n  display: flex;\n  flex-flow: column;\n  align-items: stretch;\n  justify-content: center;\n  height: 80vh;\n  max-height: 600px;\n  margin: 0 auto;\n  max-width: 400px;\n  padding: 0 30px; }\n  .app.mobile .login-page .login .header {\n    text-align: center;\n    padding: 30px 30px 15px 30px;\n    font-size: 1.6rem; }\n  .app.mobile .login-page .login .content {\n    padding-bottom: 15px; }\n  .app.mobile .login-page .login .footer {\n    min-height: 28px; }\n\n.app.mobile .schedule-page .month-view .date-selector {\n  height: 120px; }\n\n.app.mobile .schedule-page .weekly-hours {\n  padding-top: 60px; }\n  .app.mobile .schedule-page .weekly-hours .header {\n    text-align: center; }\n  .app.mobile .schedule-page .weekly-hours .content {\n    margin: 0 auto; }\n  .app.mobile .schedule-page .weekly-hours .day-item .title {\n    color: #aaa; }\n  .app.mobile .schedule-page .weekly-hours .day-item .hours {\n    padding: 0 5px; }\n\n.app.mobile .schedule-page .event-item {\n  display: flex;\n  flex-flow: row;\n  align-items: stretch; }\n  .app.mobile .schedule-page .event-item .content {\n    flex: 1 1 auto; }\n\n.app.mobile .what-we-offer-page > .landing .header {\n  text-align: center; }\n\n.app.mobile .what-we-offer-page > .obstacle-training {\n  padding-top: 57.73503vw;\n  padding-bottom: 57.73503vw; }\n  .app.mobile .what-we-offer-page > .obstacle-training .image-wrapper {\n    background: #ae6be0; }\n\n.app.mobile .what-we-offer-page > .functional-training {\n  padding-top: 3rem;\n  padding-bottom: 120px; }\n  .app.mobile .what-we-offer-page > .functional-training .header {\n    text-align: right; }\n\n.app.mobile .what-we-offer-page > .kids {\n  padding-top: 15px;\n  padding-bottom: 57.73503vw; }\n\n.app.mobile .what-we-offer-page > .hourly-workout {\n  padding-top: 60px;\n  padding-bottom: 60px; }\n\n.app.mobile .what-we-offer-page > .special-events {\n  padding-top: 15px;\n  padding-bottom: 57.73503vw; }\n\n.app.mobile .wod-page .calendar-separator {\n  justify-content: center;\n  text-align: center; }\n\n.app.mobile .wod-page .event-item .title {\n  text-align: center;\n  padding-bottom: 10px; }\n\n.app.mobile .wod-page .event-item .sub-title {\n  color: #aaa; }\n\n.app.mobile .wod-page .event-item .content {\n  margin-top: 3px; }\n\n.app.mobile .page {\n  position: relative;\n  z-index: 2; }\n\n.app.mobile .page > .header-bar {\n  background: #212121;\n  height: 3rem;\n  text-align: center;\n  position: relative;\n  display: flex;\n  flex-flow: row;\n  align-items: center;\n  padding: 0 30px;\n  flex: 0 0 auto;\n  box-shadow: 0 0 3px 2px #000;\n  z-index: 4; }\n  .app.mobile .page > .header-bar .title {\n    font-size: 1.5rem; }\n  .app.mobile .page > .header-bar .menu-btn {\n    top: 100%;\n    transform: translateY(-50%);\n    margin-top: 1px; }\n\n.app.mobile .page > section {\n  position: relative; }\n  .app.mobile .page > section > .background {\n    position: absolute;\n    top: 0;\n    left: 0;\n    bottom: 0;\n    right: 0;\n    z-index: 0; }\n    .app.mobile .page > section > .background > * {\n      position: absolute; }\n    .app.mobile .page > section > .background > svg {\n      fill: #693590; }\n    .app.mobile .page > section > .background > div {\n      background: #693590; }\n    .app.mobile .page > section > .background .right {\n      right: 0; }\n    .app.mobile .page > section > .background .left {\n      left: 0; }\n    .app.mobile .page > section > .background .top {\n      top: 0; }\n    .app.mobile .page > section > .background .bottom {\n      bottom: 0; }\n    .app.mobile .page > section > .background .small {\n      height: 6rem; }\n    .app.mobile .page > section > .background .v-half {\n      height: 50%; }\n    .app.mobile .page > section > .background .v-full {\n      height: 100%;\n      top: 0;\n      bottom: 0; }\n    .app.mobile .page > section > .background .h-half {\n      width: 50%; }\n    .app.mobile .page > section > .background .h-full {\n      width: 100%;\n      left: 0;\n      right: 0; }\n    .app.mobile .page > section > .background .middle {\n      left: 0;\n      right: 0;\n      top: 57.73503vw;\n      bottom: 28.86751vw;\n      z-index: 1;\n      box-shadow: 0 2px 0 -1px #693590, 0 -2px 0 -1px #693590; }\n  .app.mobile .page > section > .header {\n    padding: 30px 30px 15px 30px;\n    font-size: 1.6rem;\n    position: relative;\n    z-index: 1; }\n  .app.mobile .page > section > .image {\n    margin: 0 30px 0 30px;\n    height: 28.98551vh;\n    min-height: 40vw;\n    top: 2px;\n    position: relative;\n    z-index: 1;\n    max-height: 60vw;\n    background-position: center center;\n    background-size: cover;\n    background-repeat: no-repeat;\n    transform-origin: center;\n    position: relative;\n    z-index: 1; }\n  .app.mobile .page > section > .content {\n    padding: 15px 30px;\n    position: relative;\n    z-index: 1; }\n    .app.mobile .page > section > .content p {\n      margin: 0 0 30px 0; }\n  .app.mobile .page > section > .footer {\n    display: flex;\n    flex-flow: row;\n    padding: 0 15px 15px 15px;\n    position: relative;\n    z-index: 1; }\n    .app.mobile .page > section > .footer > .btn {\n      flex: 0 1 50%;\n      margin: 0 15px; }\n    .app.mobile .page > section > .footer > .btn-col {\n      margin: 0;\n      padding: 0 15px;\n      flex: 0 0 115px;\n      min-height: 28px;\n      min-width: 115px;\n      justify-content: center;\n      display: flex;\n      flex-flow: row; }\n      .app.mobile .page > section > .footer > .btn-col .btn {\n        flex: 0 0 auto; }\n\n.app.mobile .app-footer {\n  padding: 45px 30px;\n  text-align: center;\n  display: flex;\n  flex-flow: column;\n  justify-content: center;\n  flex: 0 0 auto;\n  position: relative;\n  z-index: 1; }\n\n.app.mobile .app-footer .logo {\n  padding: 15px; }\n  .app.mobile .app-footer .logo .title {\n    font-size: 2.2em; }\n  .app.mobile .app-footer .logo .copyright {\n    font-size: 0.8em; }\n\n.app.mobile .app-footer .nav {\n  padding: 15px; }\n  .app.mobile .app-footer .nav .title {\n    color: #bbb;\n    font-size: 0.9em;\n    text-transform: uppercase;\n    padding-bottom: 15px; }\n  .app.mobile .app-footer .nav .link,\n  .app.mobile .app-footer .nav .social-item {\n    display: flex;\n    flex-flow: row;\n    justify-content: center;\n    align-items: center;\n    cursor: pointer;\n    padding: 3px; }\n  .app.mobile .app-footer .nav .icon {\n    width: 0.9rem;\n    margin-right: 5px; }\n\n.app.mobile .popup {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  opacity: 1;\n  z-index: 100;\n  background: rgba(0, 0, 0, 0.7);\n  transition: opacity 0.2s;\n  display: flex;\n  flex-flow: column;\n  align-items: center;\n  justify-content: center; }\n\n.app.mobile .popup:not(.show) {\n  z-index: -2;\n  opacity: 0;\n  transform: scale(0);\n  transition: z-index 0.1s ease-in-out 0.2s, opacity 0.2s ease-in-out, transform 0.1s ease-in-out 0.2s; }\n\n.app.mobile .popup > .content {\n  background: #434343;\n  color: #fff;\n  display: flex;\n  flex-flow: column;\n  align-items: stretch;\n  position: relative; }\n  .app.mobile .popup > .content .close-btn {\n    position: absolute;\n    right: 0;\n    top: 0;\n    width: 46.26px;\n    height: 46.26px; }\n    .app.mobile .popup > .content .close-btn .bar {\n      background: #ff3333; }\n\n.app.mobile .popup > .content.center {\n  max-width: 100%;\n  max-height: 100%;\n  margin: 20px;\n  padding: 20px 30px;\n  min-width: 220px;\n  border: 1px solid #212121; }\n\n.app.mobile .popup > .content.full {\n  box-shadow: 0 0 1px 2px #545454;\n  align-self: stretch;\n  flex: 1 1 100%;\n  margin: 20px; }\n  .app.mobile .popup > .content.full .header {\n    flex: 0 0 auto;\n    display: flex;\n    flex-flow: row;\n    align-items: stretch;\n    min-height: 46.26px; }\n  .app.mobile .popup > .content.full .content {\n    margin: 7.5px 15px;\n    flex: 1 1 100%;\n    overflow-y: auto;\n    display: flex;\n    flex-flow: column;\n    align-items: stretch;\n    background: #212121;\n    box-shadow: inset 0 0 5px 0 #000; }\n    .app.mobile .popup > .content.full .content p {\n      flex: 0 0 auto;\n      margin: 15px 15px 0 15px; }\n      .app.mobile .popup > .content.full .content p:last-child {\n        margin-bottom: 15px;\n        flex: 1 0 auto; }\n  .app.mobile .popup > .content.full .footer {\n    flex: 0 0 auto;\n    display: flex;\n    flex-flow: row;\n    justify-content: center;\n    align-items: stretch;\n    text-align: center;\n    padding-bottom: 7.5px; }\n    .app.mobile .popup > .content.full .footer .details {\n      padding: 0 5px; }\n  .app.mobile .popup > .content.full .option-btn {\n    flex: 0 0 auto; }\n\n.app.mobile .popup > .content.equipment .header .title {\n  font-size: 1.5rem;\n  line-height: 1em;\n  text-align: center;\n  flex: 1 1 100%;\n  align-self: center; }\n\n.app.mobile .popup > .content.equipment .equipment-images {\n  flex: 0 0 auto;\n  display: flex;\n  flex-flow: row wrap;\n  align-items: stretch;\n  justify-content: center;\n  padding: 0 7.5px; }\n\n.app.mobile .popup > .content.equipment .image-item {\n  flex: 0 1 50%;\n  margin-bottom: 15px; }\n  .app.mobile .popup > .content.equipment .image-item:first-child {\n    flex: 1 0 100%; }\n\n.app.mobile .popup > .content.equipment .image-wrapper {\n  margin: 0 7.5px;\n  padding: 7px;\n  background: #864db1; }\n\n.app.mobile .popup > .content.equipment .image {\n  background-position: center center;\n  background-size: cover;\n  background-repeat: no-repeat;\n  transform-origin: center;\n  padding-bottom: 60%; }\n\n.app.mobile .popup > .content.equipment .footer {\n  line-height: 1rem; }\n\n.app.mobile .popup > .content.equipment .option-btn .icon {\n  width: 0.75rem;\n  margin: auto; }\n\n.app.mobile .popup > .content.staff-member .header {\n  padding-bottom: 15px; }\n\n.app.mobile .popup > .content.staff-member .close-btn {\n  position: relative;\n  flex: 0 0 auto; }\n\n.app.mobile .popup > .content.staff-member .image {\n  background-position: center center;\n  background-size: cover;\n  background-repeat: no-repeat;\n  transform-origin: center;\n  margin: 15px 15px 0 15px;\n  flex: 0 0 auto;\n  width: 160px;\n  max-width: 40%;\n  padding-bottom: 45%; }\n\n.app.mobile .popup > .content.staff-member .details {\n  flex: 1 1 auto;\n  display: flex;\n  flex-flow: column;\n  margin: 15px 0 0 0; }\n  .app.mobile .popup > .content.staff-member .details .name {\n    flex: 0 0 auto;\n    font-size: 1.5rem;\n    line-height: 1em; }\n  .app.mobile .popup > .content.staff-member .details .title {\n    flex: 0 0 auto;\n    font-size: 1rem;\n    text-transform: uppercase;\n    color: #aaa; }\n  .app.mobile .popup > .content.staff-member .details .social-list {\n    margin-left: -7.5px;\n    flex: 1 1 auto;\n    display: flex;\n    flex-flow: row;\n    align-items: flex-end; }\n  .app.mobile .popup > .content.staff-member .details .social-link {\n    flex: 0 0 auto;\n    width: 2rem;\n    height: 2rem;\n    display: flex;\n    flex-flow: row;\n    align-items: center;\n    justify-content: center;\n    text-align: center;\n    cursor: pointer;\n    fill: #fff; }\n    .app.mobile .popup > .content.staff-member .details .social-link .icon {\n      width: 1.16rem; }\n\n.app.mobile .popup > .content.staff-member .content {\n  margin-bottom: 15px; }\n\n.app.mobile .popup > .content.player {\n  margin: 0px;\n  background: #000;\n  padding-top: 3rem; }\n  .app.mobile .popup > .content.player .frame {\n    width: 100%;\n    height: 100%; }\n  .app.mobile .popup > .content.player .close-btn {\n    position: absolute;\n    z-index: 1;\n    top: 0;\n    right: 10px; }\n\n.app.mobile .popup > .content.notification {\n  padding-top: 13.33333px; }\n  .app.mobile .popup > .content.notification .title-icon {\n    flex: 0 0 auto;\n    align-self: center;\n    width: 4rem;\n    height: 4rem;\n    position: relative; }\n    .app.mobile .popup > .content.notification .title-icon .icon {\n      width: 4rem;\n      height: 4rem; }\n  .app.mobile .popup > .content.notification .title-icon.close .bar {\n    transform-origin: center;\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    width: 44px;\n    height: 6px;\n    border-radius: 5px;\n    z-index: 1;\n    background: #fff;\n    display: block;\n    margin-left: -22px;\n    margin-top: -3px; }\n    .app.mobile .popup > .content.notification .title-icon.close .bar:nth-child(1) {\n      transform: rotate(45deg); }\n    .app.mobile .popup > .content.notification .title-icon.close .bar:nth-child(2) {\n      transform: rotate(-45deg); }\n  .app.mobile .popup > .content.notification .title {\n    font-size: 1.5rem;\n    line-height: 3rem;\n    text-align: center; }\n  .app.mobile .popup > .content.notification .desc {\n    margin-top: 10px;\n    text-align: center; }\n  .app.mobile .popup > .content.notification .contact-items {\n    flex-flow: row wrap;\n    justify-content: center;\n    padding-top: 15px; }\n  .app.mobile .popup > .content.notification .contact-item {\n    padding: 5px 0; }\n  .app.mobile .popup > .content.notification .footer {\n    margin-top: 20px;\n    display: flex;\n    flex-flow: row;\n    align-items: center;\n    justify-content: center;\n    max-width: 100%; }\n    .app.mobile .popup > .content.notification .footer .btn {\n      color: #434343; }\n  .app.mobile .popup > .content.notification.success {\n    border: 2px solid #009900; }\n  .app.mobile .popup > .content.notification.error {\n    border: 2px solid #990000; }\n\n.app.mobile .date-selector {\n  display: flex;\n  flex-flow: column;\n  transition: height 0.2s ease-in-out;\n  height: 175px;\n  flex: 0 0 auto; }\n\n.app.mobile .date-selector .row {\n  flex: 1 1 auto;\n  align-items: stretch; }\n\n.app.mobile .date-selector .option-btn {\n  flex: 0 0 15%;\n  font-size: 2.5rem; }\n  .app.mobile .date-selector .option-btn svg {\n    width: 1.5rem;\n    margin: auto; }\n\n.app.mobile .date-selector .details {\n  display: flex;\n  flex-flow: column;\n  flex: 1 1 auto;\n  text-align: center;\n  justify-content: center; }\n  .app.mobile .date-selector .details .title {\n    font-size: 2rem; }\n  .app.mobile .date-selector .details .sub {\n    font-size: 1.5rem; }\n\n.app.mobile .calendar-separator {\n  flex: 0 0 auto;\n  background: #693590;\n  padding: 15px;\n  display: flex;\n  flex-flow: row;\n  align-items: center;\n  box-shadow: 0 0 5px 0 #000;\n  position: relative;\n  z-index: 1;\n  min-height: 1.5em; }\n\n.app.mobile .calendar-separator .title {\n  flex: 0 0 auto;\n  font-weight: bold;\n  color: #aaa;\n  text-transform: uppercase;\n  margin-right: 10px;\n  font-size: 0.9rem;\n  line-height: 1rem; }\n\n.app.mobile .calendar-separator .value {\n  flex: 1 1 auto;\n  font-size: 0.9rem;\n  line-height: 1rem; }\n\n.app.mobile .calendar-separator .btn {\n  color: #693590;\n  height: 1.8em;\n  padding: 0 15px; }\n\n.app.mobile .calendar {\n  display: flex;\n  flex-flow: row wrap;\n  align-items: stretch;\n  justify-content: center;\n  background: #434343;\n  box-shadow: 0 0 0 2px #212121; }\n\n.app.mobile .calendar .title {\n  flex: 0 1 14.28571%;\n  padding: 10px 0;\n  text-transform: uppercase;\n  font-size: 1.16rem;\n  text-align: center; }\n\n.app.mobile .calendar .day {\n  flex: 0 1 14.28571%;\n  height: 0px;\n  padding-bottom: 17.14286%;\n  position: relative; }\n  .app.mobile .calendar .day .text {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    width: 2em;\n    height: 2em;\n    border-radius: 2em;\n    line-height: 2em;\n    text-align: center;\n    transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out; }\n  .app.mobile .calendar .day.open:after {\n    content: '';\n    display: block;\n    width: 0.5rem;\n    height: 0.5rem;\n    border-radius: 0.5rem;\n    position: absolute;\n    top: 75%;\n    left: 50%;\n    transform: translateX(-50%);\n    background: #545454;\n    z-index: 1; }\n  .app.mobile .calendar .day:not(.selected) {\n    cursor: pointer; }\n  .app.mobile .calendar .day.selected:not(.today) .text {\n    background: #ae6be0; }\n  .app.mobile .calendar .day.today .text {\n    background: #fff;\n    color: #434343; }\n  .app.mobile .calendar .day.selected.today .text {\n    color: #864db1; }\n  .app.mobile .calendar .day.diff-month .text {\n    color: #777777; }\n  .app.mobile .calendar .day.diff-month.today .text {\n    background: #545454; }\n\n.app.mobile .contact-items {\n  display: flex;\n  flex-flow: row;\n  flex: 0 0 auto;\n  align-items: stretch; }\n  .app.mobile .contact-items:not(:first-child) {\n    padding-top: 1px; }\n\n.app.mobile .contact-item {\n  flex: 0 1 50%;\n  display: flex;\n  flex-flow: row;\n  align-items: center;\n  padding: 10px 0;\n  color: #aaa;\n  justify-content: center; }\n  .app.mobile .contact-item .icon {\n    fill: #aaa;\n    width: 1rem;\n    margin-right: 0.5rem; }\n  .app.mobile .contact-item .value {\n    font-size: 0.9rem;\n    white-space: nowrap; }\n\n.app.mobile .contact-map {\n  flex: 0 0 auto;\n  background: #212121;\n  box-shadow: 0 0 5px 0 #000;\n  cursor: pointer;\n  display: block; }\n  .app.mobile .contact-map .image-wrapper {\n    width: 100%;\n    height: 100%; }\n  .app.mobile .contact-map .image {\n    background-position: center center;\n    background-size: cover;\n    background-repeat: no-repeat;\n    transform-origin: center;\n    height: 100%;\n    padding-bottom: 80%; }\n", ""]);

// exports


/***/ }),
/* 109 */,
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(108);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(64)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js??ref--3-2!./mobile.scss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js??ref--3-2!./mobile.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ })
]);
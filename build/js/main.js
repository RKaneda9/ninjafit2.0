/******/ (function(modules) { // webpackBootstrap
/******/ 	/** ===== Webpack2 Polyfill ===== **/
/******/ 	(function(){
/******/ 		var _global = this;
/******/ 		var module = undefined;
/******/ 		/** ===== Function.prototype.bind Polyfill ===== **/
/******/ 		if (!Function.prototype.bind) {
/******/ 		  Function.prototype.bind = function(oThis) {
/******/ 		    if (typeof this !== 'function') {
/******/ 		                                                   
/******/ 		                                     
/******/ 		      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
/******/ 		    }
/******/ 		
/******/ 		    var aArgs   = Array.prototype.slice.call(arguments, 1),
/******/ 		        fToBind = this,
/******/ 		        fNOP    = function() {},
/******/ 		        fBound  = function() {
/******/ 		          return fToBind.apply(this instanceof fNOP
/******/ 		                 ? this
/******/ 		                 : oThis,
/******/ 		                 aArgs.concat(Array.prototype.slice.call(arguments)));
/******/ 		        };
/******/ 		
/******/ 		    if (this.prototype) {
/******/ 		                                                             
/******/ 		      fNOP.prototype = this.prototype; 
/******/ 		    }
/******/ 		    fBound.prototype = new fNOP();
/******/ 		
/******/ 		    return fBound;
/******/ 		  };
/******/ 		}
/******/
/******/ 		/** ===== Function.prototype.bind Polyfill end ===== **/
/******/ 		/** ===== Object.keys Polyfill ===== **/
/******/ 		                                                                                                    
/******/ 		if (!Object.keys) {
/******/ 		  Object.keys = (function() {
/******/ 		    'use strict';
/******/ 		    var hasOwnProperty = Object.prototype.hasOwnProperty,
/******/ 		        hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
/******/ 		        dontEnums = [
/******/ 		          'toString',
/******/ 		          'toLocaleString',
/******/ 		          'valueOf',
/******/ 		          'hasOwnProperty',
/******/ 		          'isPrototypeOf',
/******/ 		          'propertyIsEnumerable',
/******/ 		          'constructor'
/******/ 		        ],
/******/ 		        dontEnumsLength = dontEnums.length;
/******/ 		
/******/ 		    return function(obj) {
/******/ 		      if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
/******/ 		        throw new TypeError('Object.keys called on non-object');
/******/ 		      }
/******/ 		
/******/ 		      var result = [], prop, i;
/******/ 		
/******/ 		      for (prop in obj) {
/******/ 		        if (hasOwnProperty.call(obj, prop)) {
/******/ 		          result.push(prop);
/******/ 		        }
/******/ 		      }
/******/ 		
/******/ 		      if (hasDontEnumBug) {
/******/ 		        for (i = 0; i < dontEnumsLength; i++) {
/******/ 		          if (hasOwnProperty.call(obj, dontEnums[i])) {
/******/ 		            result.push(dontEnums[i]);
/******/ 		          }
/******/ 		        }
/******/ 		      }
/******/ 		      return result;
/******/ 		    };
/******/ 		  }());
/******/ 		}
/******/
/******/ 		/** ===== Object.keys Polyfill end ===== **/
/******/ 		/** ===== Promise Polyfill ===== **/
/******/ 		if(!_global.Promise){
/******/ 			(function (root) {
/******/
/******/ 			                                                                         
/******/ 			                                                                 
/******/ 			  var setTimeoutFunc = setTimeout;
/******/
/******/ 			  function noop() {}
/******/ 			  
/******/ 			                                         
/******/ 			  function bind(fn, thisArg) {
/******/ 			    return function () {
/******/ 			      fn.apply(thisArg, arguments);
/******/ 			    };
/******/ 			  }
/******/
/******/ 			  function Promise(fn) {
/******/ 			    if (typeof this !== 'object') throw new TypeError('Promises must be constructed via new');
/******/ 			    if (typeof fn !== 'function') throw new TypeError('not a function');
/******/ 			    this._state = 0;
/******/ 			    this._handled = false;
/******/ 			    this._value = undefined;
/******/ 			    this._deferreds = [];
/******/
/******/ 			    doResolve(fn, this);
/******/ 			  }
/******/
/******/ 			  function handle(self, deferred) {
/******/ 			    while (self._state === 3) {
/******/ 			      self = self._value;
/******/ 			    }
/******/ 			    if (self._state === 0) {
/******/ 			      self._deferreds.push(deferred);
/******/ 			      return;
/******/ 			    }
/******/ 			    self._handled = true;
/******/ 			    Promise._immediateFn(function () {
/******/ 			      var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
/******/ 			      if (cb === null) {
/******/ 			        (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
/******/ 			        return;
/******/ 			      }
/******/ 			      var ret;
/******/ 			      try {
/******/ 			        ret = cb(self._value);
/******/ 			      } catch (e) {
/******/ 			        reject(deferred.promise, e);
/******/ 			        return;
/******/ 			      }
/******/ 			      resolve(deferred.promise, ret);
/******/ 			    });
/******/ 			  }
/******/
/******/ 			  function resolve(self, newValue) {
/******/ 			    try {
/******/ 			                                                                                                                       
/******/ 			      if (newValue === self) throw new TypeError('A promise cannot be resolved with itself.');
/******/ 			      if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
/******/ 			        var then = newValue.then;
/******/ 			        if (newValue instanceof Promise) {
/******/ 			          self._state = 3;
/******/ 			          self._value = newValue;
/******/ 			          finale(self);
/******/ 			          return;
/******/ 			        } else if (typeof then === 'function') {
/******/ 			          doResolve(bind(then, newValue), self);
/******/ 			          return;
/******/ 			        }
/******/ 			      }
/******/ 			      self._state = 1;
/******/ 			      self._value = newValue;
/******/ 			      finale(self);
/******/ 			    } catch (e) {
/******/ 			      reject(self, e);
/******/ 			    }
/******/ 			  }
/******/
/******/ 			  function reject(self, newValue) {
/******/ 			    self._state = 2;
/******/ 			    self._value = newValue;
/******/ 			    finale(self);
/******/ 			  }
/******/
/******/ 			  function finale(self) {
/******/ 			    if (self._state === 2 && self._deferreds.length === 0) {
/******/ 			      Promise._immediateFn(function() {
/******/ 			        if (!self._handled) {
/******/ 			          Promise._unhandledRejectionFn(self._value);
/******/ 			        }
/******/ 			      });
/******/ 			    }
/******/
/******/ 			    for (var i = 0, len = self._deferreds.length; i < len; i++) {
/******/ 			      handle(self, self._deferreds[i]);
/******/ 			    }
/******/ 			    self._deferreds = null;
/******/ 			  }
/******/
/******/ 			  function Handler(onFulfilled, onRejected, promise) {
/******/ 			    this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
/******/ 			    this.onRejected = typeof onRejected === 'function' ? onRejected : null;
/******/ 			    this.promise = promise;
/******/ 			  }
/******/
/******/ 			     
/******/ 			                                                                   
/******/ 			                                                     
/******/ 			    
/******/ 			                                          
/******/ 			     
/******/ 			  function doResolve(fn, self) {
/******/ 			    var done = false;
/******/ 			    try {
/******/ 			      fn(function (value) {
/******/ 			        if (done) return;
/******/ 			        done = true;
/******/ 			        resolve(self, value);
/******/ 			      }, function (reason) {
/******/ 			        if (done) return;
/******/ 			        done = true;
/******/ 			        reject(self, reason);
/******/ 			      });
/******/ 			    } catch (ex) {
/******/ 			      if (done) return;
/******/ 			      done = true;
/******/ 			      reject(self, ex);
/******/ 			    }
/******/ 			  }
/******/
/******/ 			  Promise.prototype['catch'] = function (onRejected) {
/******/ 			    return this.then(null, onRejected);
/******/ 			  };
/******/
/******/ 			  Promise.prototype.then = function (onFulfilled, onRejected) {
/******/ 			    var prom = new (this.constructor)(noop);
/******/
/******/ 			    handle(this, new Handler(onFulfilled, onRejected, prom));
/******/ 			    return prom;
/******/ 			  };
/******/
/******/ 			  Promise.all = function (arr) {
/******/ 			    var args = Array.prototype.slice.call(arr);
/******/
/******/ 			    return new Promise(function (resolve, reject) {
/******/ 			      if (args.length === 0) return resolve([]);
/******/ 			      var remaining = args.length;
/******/
/******/ 			      function res(i, val) {
/******/ 			        try {
/******/ 			          if (val && (typeof val === 'object' || typeof val === 'function')) {
/******/ 			            var then = val.then;
/******/ 			            if (typeof then === 'function') {
/******/ 			              then.call(val, function (val) {
/******/ 			                res(i, val);
/******/ 			              }, reject);
/******/ 			              return;
/******/ 			            }
/******/ 			          }
/******/ 			          args[i] = val;
/******/ 			          if (--remaining === 0) {
/******/ 			            resolve(args);
/******/ 			          }
/******/ 			        } catch (ex) {
/******/ 			          reject(ex);
/******/ 			        }
/******/ 			      }
/******/
/******/ 			      for (var i = 0; i < args.length; i++) {
/******/ 			        res(i, args[i]);
/******/ 			      }
/******/ 			    });
/******/ 			  };
/******/
/******/ 			  Promise.resolve = function (value) {
/******/ 			    if (value && typeof value === 'object' && value.constructor === Promise) {
/******/ 			      return value;
/******/ 			    }
/******/
/******/ 			    return new Promise(function (resolve) {
/******/ 			      resolve(value);
/******/ 			    });
/******/ 			  };
/******/
/******/ 			  Promise.reject = function (value) {
/******/ 			    return new Promise(function (resolve, reject) {
/******/ 			      reject(value);
/******/ 			    });
/******/ 			  };
/******/
/******/ 			  Promise.race = function (values) {
/******/ 			    return new Promise(function (resolve, reject) {
/******/ 			      for (var i = 0, len = values.length; i < len; i++) {
/******/ 			        values[i].then(resolve, reject);
/******/ 			      }
/******/ 			    });
/******/ 			  };
/******/
/******/ 			                                                        
/******/ 			  Promise._immediateFn = (typeof setImmediate === 'function' && function (fn) { setImmediate(fn); }) ||
/******/ 			    function (fn) {
/******/ 			      setTimeoutFunc(fn, 0);
/******/ 			    };
/******/
/******/ 			  Promise._unhandledRejectionFn = function _unhandledRejectionFn(err) {
/******/ 			    if (typeof console !== 'undefined' && console) {
/******/ 			      console.warn('Possible Unhandled Promise Rejection:', err);                                  
/******/ 			    }
/******/ 			  };
/******/
/******/ 			     
/******/ 			                                                    
/******/ 			                                             
/******/ 			                
/******/ 			     
/******/ 			  Promise._setImmediateFn = function _setImmediateFn(fn) {
/******/ 			    Promise._immediateFn = fn;
/******/ 			  };
/******/
/******/ 			     
/******/ 			                                                          
/******/ 			                                                                    
/******/ 			                
/******/ 			     
/******/ 			  Promise._setUnhandledRejectionFn = function _setUnhandledRejectionFn(fn) {
/******/ 			    Promise._unhandledRejectionFn = fn;
/******/ 			  };
/******/ 			  
/******/ 			  if (typeof module !== 'undefined' && module.exports) {
/******/ 			    module.exports = Promise;
/******/ 			  } else if (!root.Promise) {
/******/ 			    root.Promise = Promise;
/******/ 			  }
/******/
/******/ 			})(this);
/******/ 		}
/******/ 		/** ===== Promise Polyfill end ===== **/
/******/ 		/** ===== Object.defineProperty Polyfill ===== **/
/******/ 		(function(){
/******/ 		
/******/ 		  if( !Object.defineProperty ){
/******/ 		             
/******/ 		    if( "__defineGetter__" in {} ){
/******/ 		      Object.defineProperty = function(obj, propName, accessors){
/******/ 		        if(accessors.get){
/******/ 		          obj.__defineGetter__(propName, function(){ return accessors.get.call(obj) })
/******/ 		        }
/******/ 		        if(accessors.set){
/******/ 		          obj.__defineSetter__(propName, function(val){ return accessors.set.call(obj, val) })
/******/ 		        }
/******/ 		      }
/******/ 		    }
/******/ 		  }
/******/ 		
/******/ 		})();
/******/
/******/ 		/** ===== Object.defineProperty Polyfill end ===== **/
/******/ 	}).call((function(){
/******/ 	if(typeof window != "undefined") return window;
/******/ 	if(typeof global != "undefined") return global;
/******/ 	if(typeof self != "undefined") return self;
/******/ 	})())
/******/ 	/** ===== Webpack2 Polyfill end ===== **/
/******/
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["___nfg"];
/******/ 	window["___nfg"] = function webpackJsonpCallback(chunkIds, moreModules, executeModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [], result;
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules, executeModules);
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 	};
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// objects to store loaded and loading chunks
/******/ 	var installedChunks = {
/******/ 		2: 0
/******/ 	};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData === 0) {
/******/ 			return new Promise(function(resolve) { resolve(); });
/******/ 		}
/******/
/******/ 		// a Promise means "currently loading".
/******/ 		if(installedChunkData) {
/******/ 			return installedChunkData[2];
/******/ 		}
/******/
/******/ 		// setup Promise in chunk cache
/******/ 		var promise = new Promise(function(resolve, reject) {
/******/ 			installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 		});
/******/ 		installedChunkData[2] = promise;
/******/
/******/ 		// start chunk loading
/******/ 		var head = document.getElementsByTagName('head')[0];
/******/ 		var script = document.createElement('script');
/******/ 		script.type = 'text/javascript';
/******/ 		script.charset = 'utf-8';
/******/ 		script.async = true;
/******/ 		script.timeout = 120000;
/******/
/******/ 		if (__webpack_require__.nc) {
/******/ 			script.setAttribute("nonce", __webpack_require__.nc);
/******/ 		}
/******/ 		script.src = __webpack_require__.p + "js/" + ({"0":"mobile","1":"desktop"}[chunkId]||chunkId) + ".js";
/******/ 		var timeout = setTimeout(onScriptComplete, 120000);
/******/ 		script.onerror = script.onload = onScriptComplete;
/******/ 		function onScriptComplete() {
/******/ 			// avoid mem leaks in IE.
/******/ 			script.onerror = script.onload = null;
/******/ 			clearTimeout(timeout);
/******/ 			var chunk = installedChunks[chunkId];
/******/ 			if(chunk !== 0) {
/******/ 				if(chunk) {
/******/ 					chunk[1](new Error('Loading chunk ' + chunkId + ' failed.'));
/******/ 				}
/******/ 				installedChunks[chunkId] = undefined;
/******/ 			}
/******/ 		};
/******/ 		head.appendChild(script);
/******/
/******/ 		return promise;
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
    mobileMaxWidth: 699,
    removeAppTimeout: 1000,
    showAppTimeout: 2000,
    resizeTimeout: 0,

    elements: {
        loader: 'app-loader',
        app: 'app'
    }
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var constants = __webpack_require__(0),
    enums = __webpack_require__(7),
    apps = {},
    el;

var service = module.exports = {
    initialize: function initialize(_el) {
        el = _el;
    },

    determine: function determine() {
        if (window.innerWidth <= constants.mobileMaxWidth) return enums.apps.mobile;

        return enums.apps.desktop;
    },

    isLoaded: function isLoaded(id) {
        return apps[id];
    },

    fetch: function fetch(id) {
        return new Promise(function (resolve, reject) {
            if (apps[id]) return resolve(apps[id]);

            switch (id) {
                case enums.apps.mobile:

                    return __webpack_require__.e/* require.ensure */(0).then((function (require) {

                        resolve(apps[id] = __webpack_require__(5));
                    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);

                case enums.apps.desktop:

                    return __webpack_require__.e/* require.ensure */(1).then((function (require) {

                        resolve(apps[id] = __webpack_require__(4));
                    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
            }

            reject('Unknown application id: ' + id);
        });
    },

    show: function show(id) {
        return new Promise(function (resolve, reject) {

            // element does not exist on the page, can't bind to no element
            if (!el) return reject();

            return service.fetch(id).then(function (app) {
                app.initialize(el, resolve, reject);
            }).catch(function (msg) {
                reject(msg);
            });
        });
    },

    remove: function remove(id) {
        if (apps[id]) apps[id].dispose();
    }
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var html = __webpack_require__(8);
var el;

module.exports = {
    initialize: function initialize(_el) {
        el = _el;

        if (el) el.innerHTML = html;
    },

    show: function show() {
        if (!el) return;

        var attr = el.getAttribute('class');

        if (attr && attr.indexOf('hidden') > -1) el.setAttribute('class', 'show');
    },
    hide: function hide() {
        if (el) el.setAttribute('class', 'hidden');
    }
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = module.exports = {
    addListener: function addListener(el, type, callback) {

        // mozilla, opera and webkit
        if (el.addEventListener) return el.addEventListener(type, callback, false);

        // ie
        if (el.attachEvent) return el.attachEvent('on' + type, callback);
    }
};

/***/ }),
/* 4 */,
/* 5 */,
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(3),
    applications = __webpack_require__(1),
    loader = __webpack_require__(2),
    constants = __webpack_require__(0),
    appId,
    resizeTimeoutId;

(function (callback) {

    // browser event has already occurred.
    if (document.readyState === "complete") setTimeout(callback);

    // otherwise add listener
    else utils.addListener(window, 'load', callback);
})(function () {

    console.log("Main started");

    utils.addListener(window, 'resize', function () {

        if (resizeTimeoutId) clearTimeout(resizeTimeoutId);

        resizeTimeoutId = setTimeout(resize, constants.resizeTimeout);
    });

    function resize() {

        var newId = applications.determine(),
            oldId = appId;

        resizeTimeoutId = null;

        if (oldId == newId) return;

        console.log("onResize() - New Application: " + newId + ", old application: " + oldId);

        appId = newId;

        if (!applications.isLoaded(newId)) loader.show();

        if (oldId) {

            console.log('onResize() - Removing previous application: ', oldId);
            applications.remove(oldId);
        }

        console.log('onResize() - Showing application: ', newId);

        applications.show(newId).then(function () {
            loader.hide();
        }).catch(function (msg) {
            console.error(msg);
        });
    }

    loader.initialize(document.getElementById(constants.elements.loader));
    applications.initialize(document.getElementById(constants.elements.app));

    resize();
});

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
    apps: {
        mobile: 'mobile',
        desktop: 'desktop'
    }
};

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = "<div class=\"text\">Welcome, Ninja</div><div class=\"image\"><div class=\"star\"><svg class=\"icon\" viewBox=\"0 0 500 500\"><use xlink:href=\"#throwing-star\"></use></svg></div><div class=\"star\"><svg class=\"icon\" viewBox=\"0 0 500 500\"><use xlink:href=\"#throwing-star\"></use></svg></div><svg class=\"ninja\" viewBox=\"-25 -154 550 750\"><path fill=\"#000\" d=\"M276-149c267,2,369,403,30,732q-91,16-125,5c-364-340-181-731,95-737z\"></path><path fill=\"#212121\" d=\"M276,-138 C516,-135 638,238 300,569 Q225,584 185,574 C-155,247 5,-130 276,-138 Z\"></path><path fill=\"#121212\" d=\"M276-138c240,3,362,376,24,707q-75,15-115,5c-340-327-180-704,91-712z\"></path><path fill=\"#121212\" d=\"M33,200c-11-30-24-27-19,22q26,186,198,355.8q10,0.4,18,0.1q-40-38.9-68-83.9q48,44,85,60c-45-47-74-72-85-95c24-12,160-28,188-44c-55-10-135,12-194,34q-10-10-16-21c30-12,102-22,148-37c-53-10-120,10-157,24q-16-21-33-49q112-49,208-17c56,12,46-3,10-23q-76-29-163-15z\"></path><path fill=\"#343434\" d=\"M250-136.1c105 49.1,160 79.1,212 208.1c-42,18-144,30-267,36c150,24 247-6,268-24l7 31c-85,44-276 49-401 23l111 163c58-1 117 9 171 37q21,10,28,4l95-207q-26 225-183,436l9-2c338-331,216-704-24-707q-11,0-26 1.9z\"></path><path fill=\"#343434\" d=\"M10.4,68c-36.4,112-20.4,252 77.9,394c-61.3-114-108.3-272-77.9-394z\"></path><path fill=\"#454545\" d=\"M387-106q58 72 116,189q-23-131-116-189z\"></path><path fill=\"#454545\" d=\"M329 92c-9,3-9 12 2,13q67-2,91-21.2q-41-8.8-93 8.2z\"></path><path fill=\"#454545\" d=\"M261,295q-15,5-7 9.5q37 5.5 76 21.5q20,3 12-7q-42-29-81-24z\"></path><path fill=\"#000\" d=\"M28 118c117 68,291,67,449 16c-17 88-53 148-95 210c-92-64-169-74-306,1c-41-84-49-155-48-227z\"></path><path fill=\"#c99a40\" d=\"M36,131c111,65 290 64 428 16c-16,75-54,135-85 180c-89-56-166-66-298 4c-36-70-46-141-45-200z\"></path><path fill=\"#a07c2e\" d=\"M463.15,151c-139.15 82-292.15,81-391.15 36q14 54,41,107c51-28,137-49,215 6c-79-34-153-18-247,31c-36-70-46-141-45-200c111,65 290 64 428 16z\"></path><path fill=\"#000\" d=\"M284,237c22,5,41,1 70-24c32-28 68-39,75-17c-9-2-29,3-41 8c0 66-74 72-92,43q-8-3-15-8c-2-2-2-3,3-2z\"></path><path fill=\"#fff\" d=\"M315,243c15,19 44,13 38-19l21.5-12c-6.5 56-54.5 58-74.5,35z\"></path><path fill=\"#000\" d=\"M289.5 252c5.5 18 25.5,25 33.5,19c-18-1-24-9-33.5-19z\"></path><path fill=\"#000\" d=\"M382 248c14-10,23-31 16-41c-1 14-6,27-16,41z\"></path><path fill=\"#000\" d=\"M213,239c-11,7-27 4-50-12c-53-35-85-49-98-42c-9,7-8 10-6 10q11-5 42 6.5c36 78.5 72 69.5 98 45.5q10-1 14-8z\"></path><path fill=\"#fff\" d=\"M183 246c-23,15-51-2-42-26q-14-10-28-15c25,67,57,63,81,43z\"></path><path fill=\"#000\" d=\"M131 254q-14-22-28-23q14 8.5 28,23z\"></path><path fill=\"#000\" d=\"M188 268q12-6,17-17l3-1q-6,17-23 22z\"></path></svg></div>"

/***/ })
/******/ ]);
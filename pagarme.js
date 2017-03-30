module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _client = __webpack_require__(1);
	
	var _client2 = _interopRequireDefault(_client);
	
	var _validations = __webpack_require__(216);
	
	var _validations2 = _interopRequireDefault(_validations);
	
	var _postback = __webpack_require__(214);
	
	var _postback2 = _interopRequireDefault(_postback);
	
	var _resources = __webpack_require__(150);
	
	var _resources2 = _interopRequireDefault(_resources);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = Object.assign({
	  client: _client2.default,
	  validate: _validations2.default,
	  postback: _postback2.default
	}, _resources2.default);
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _merge = __webpack_require__(2);
	
	var _merge2 = _interopRequireDefault(_merge);
	
	var _map = __webpack_require__(9);
	
	var _map2 = _interopRequireDefault(_map);
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
	                                                                                                                                                                                                                                                                               * Client Module
	                                                                                                                                                                                                                                                                               * @description The client module is the entry point for our SDK.
	                                                                                                                                                                                                                                                                               *              It holds a Promise-based authentication method
	                                                                                                                                                                                                                                                                               *              ([connect]{@link client#connect}) as well as
	                                                                                                                                                                                                                                                                               *              allowing for raw use of the resources (without authentication).
	                                                                                                                                                                                                                                                                               * @module client
	                                                                                                                                                                                                                                                                               */
	
	var _strategies = __webpack_require__(27);
	
	var _strategies2 = _interopRequireDefault(_strategies);
	
	var _resources = __webpack_require__(150);
	
	var _resources2 = _interopRequireDefault(_resources);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Binds the `options` received as param
	 * to the client's resources.
	 * @private
	 *
	 * @param {Object} options
	 * @returns A version of resources with its methods' first param binded to `options`
	 */
	function bindOptions(options) {
	  var mapper = function mapper(val) {
	    if ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object') {
	      return (0, _map2.default)(mapper, val);
	    }
	
	    return val.bind(null, options);
	  };
	
	  return (0, _map2.default)(mapper, _resources2.default);
	}
	
	/**
	 * Returns a version of client with
	 * authentication data binded to the
	 * resource requests.
	 *
	 * @example
	 * // API Key Authentication
	 * pagarme.client.connect({ apiKey: 'ak_test_y7jk294ynbzf93' })
	 *
	 * // Encryption Key Authentication
	 * pagarme.client.connect({ encryptionKey: 'ek_test_y7jk294ynbzf93' })
	 *
	 * // Login Authentication
	 * pagarme.client.connect({ email: 'user@email.com', password: '123456' })
	 *
	 * @param {Object} authentication
	 * @returns {Promise} A Promise that resolves to a client with authentication data binded
	 */
	function connect(authentication) {
	  return _strategies2.default.find(authentication).then(function (s) {
	    return s.execute();
	  }).then(bindOptions);
	}
	
	function connectSync(authentication) {
	  var options = (0, _merge2.default)(authentication, { sync: true });
	  var strategyBuilder = _strategies2.default.findSync(options);
	  var strategy = strategyBuilder.execute();
	
	  return bindOptions(strategy);
	}
	
	var client = (0, _merge2.default)({ connect: connect, connectSync: connectSync }, _resources2.default);
	
	exports.default = client;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var _assign = __webpack_require__(3);
	var _curry2 = __webpack_require__(6);
	
	
	/**
	 * Create a new object with the own properties of the first object merged with
	 * the own properties of the second object. If a key exists in both objects,
	 * the value from the second object will be used.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.1.0
	 * @category Object
	 * @sig {k: v} -> {k: v} -> {k: v}
	 * @param {Object} l
	 * @param {Object} r
	 * @return {Object}
	 * @see R.mergeWith, R.mergeWithKey
	 * @example
	 *
	 *      R.merge({ 'name': 'fred', 'age': 10 }, { 'age': 40 });
	 *      //=> { 'name': 'fred', 'age': 40 }
	 *
	 *      var resetToDefault = R.merge(R.__, {x: 0});
	 *      resetToDefault({x: 5, y: 2}); //=> {x: 0, y: 2}
	 */
	module.exports = _curry2(function merge(l, r) {
	  return _assign({}, l, r);
	});


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var _objectAssign = __webpack_require__(4);
	
	module.exports =
	  typeof Object.assign === 'function' ? Object.assign : _objectAssign;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var _has = __webpack_require__(5);
	
	// Based on https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
	module.exports = function _objectAssign(target) {
	  if (target == null) {
	    throw new TypeError('Cannot convert undefined or null to object');
	  }
	
	  var output = Object(target);
	  var idx = 1;
	  var length = arguments.length;
	  while (idx < length) {
	    var source = arguments[idx];
	    if (source != null) {
	      for (var nextKey in source) {
	        if (_has(nextKey, source)) {
	          output[nextKey] = source[nextKey];
	        }
	      }
	    }
	    idx += 1;
	  }
	  return output;
	};


/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = function _has(prop, obj) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	};


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var _curry1 = __webpack_require__(7);
	var _isPlaceholder = __webpack_require__(8);
	
	
	/**
	 * Optimized internal two-arity curry function.
	 *
	 * @private
	 * @category Function
	 * @param {Function} fn The function to curry.
	 * @return {Function} The curried function.
	 */
	module.exports = function _curry2(fn) {
	  return function f2(a, b) {
	    switch (arguments.length) {
	      case 0:
	        return f2;
	      case 1:
	        return _isPlaceholder(a) ? f2
	             : _curry1(function(_b) { return fn(a, _b); });
	      default:
	        return _isPlaceholder(a) && _isPlaceholder(b) ? f2
	             : _isPlaceholder(a) ? _curry1(function(_a) { return fn(_a, b); })
	             : _isPlaceholder(b) ? _curry1(function(_b) { return fn(a, _b); })
	             : fn(a, b);
	    }
	  };
	};


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var _isPlaceholder = __webpack_require__(8);
	
	
	/**
	 * Optimized internal one-arity curry function.
	 *
	 * @private
	 * @category Function
	 * @param {Function} fn The function to curry.
	 * @return {Function} The curried function.
	 */
	module.exports = function _curry1(fn) {
	  return function f1(a) {
	    if (arguments.length === 0 || _isPlaceholder(a)) {
	      return f1;
	    } else {
	      return fn.apply(this, arguments);
	    }
	  };
	};


/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = function _isPlaceholder(a) {
	  return a != null &&
	         typeof a === 'object' &&
	         a['@@functional/placeholder'] === true;
	};


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var _curry2 = __webpack_require__(6);
	var _dispatchable = __webpack_require__(10);
	var _map = __webpack_require__(14);
	var _reduce = __webpack_require__(15);
	var _xmap = __webpack_require__(21);
	var curryN = __webpack_require__(23);
	var keys = __webpack_require__(25);
	
	
	/**
	 * Takes a function and
	 * a [functor](https://github.com/fantasyland/fantasy-land#functor),
	 * applies the function to each of the functor's values, and returns
	 * a functor of the same shape.
	 *
	 * Ramda provides suitable `map` implementations for `Array` and `Object`,
	 * so this function may be applied to `[1, 2, 3]` or `{x: 1, y: 2, z: 3}`.
	 *
	 * Dispatches to the `map` method of the second argument, if present.
	 *
	 * Acts as a transducer if a transformer is given in list position.
	 *
	 * Also treats functions as functors and will compose them together.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.1.0
	 * @category List
	 * @sig Functor f => (a -> b) -> f a -> f b
	 * @param {Function} fn The function to be called on every element of the input `list`.
	 * @param {Array} list The list to be iterated over.
	 * @return {Array} The new list.
	 * @see R.transduce, R.addIndex
	 * @example
	 *
	 *      var double = x => x * 2;
	 *
	 *      R.map(double, [1, 2, 3]); //=> [2, 4, 6]
	 *
	 *      R.map(double, {x: 1, y: 2, z: 3}); //=> {x: 2, y: 4, z: 6}
	 */
	module.exports = _curry2(_dispatchable('map', _xmap, function map(fn, functor) {
	  switch (Object.prototype.toString.call(functor)) {
	    case '[object Function]':
	      return curryN(functor.length, function() {
	        return fn.call(this, functor.apply(this, arguments));
	      });
	    case '[object Object]':
	      return _reduce(function(acc, key) {
	        acc[key] = fn(functor[key]);
	        return acc;
	      }, {}, keys(functor));
	    default:
	      return _map(fn, functor);
	  }
	}));


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var _isArray = __webpack_require__(11);
	var _isTransformer = __webpack_require__(12);
	var _slice = __webpack_require__(13);
	
	
	/**
	 * Returns a function that dispatches with different strategies based on the
	 * object in list position (last argument). If it is an array, executes [fn].
	 * Otherwise, if it has a function with [methodname], it will execute that
	 * function (functor case). Otherwise, if it is a transformer, uses transducer
	 * [xf] to return a new transformer (transducer case). Otherwise, it will
	 * default to executing [fn].
	 *
	 * @private
	 * @param {String} methodname property to check for a custom implementation
	 * @param {Function} xf transducer to initialize if object is transformer
	 * @param {Function} fn default ramda implementation
	 * @return {Function} A function that dispatches on object in list position
	 */
	module.exports = function _dispatchable(methodname, xf, fn) {
	  return function() {
	    var length = arguments.length;
	    if (length === 0) {
	      return fn();
	    }
	    var obj = arguments[length - 1];
	    if (!_isArray(obj)) {
	      var args = _slice(arguments, 0, length - 1);
	      if (typeof obj[methodname] === 'function') {
	        return obj[methodname].apply(obj, args);
	      }
	      if (_isTransformer(obj)) {
	        var transducer = xf.apply(null, args);
	        return transducer(obj);
	      }
	    }
	    return fn.apply(this, arguments);
	  };
	};


/***/ },
/* 11 */
/***/ function(module, exports) {

	/**
	 * Tests whether or not an object is an array.
	 *
	 * @private
	 * @param {*} val The object to test.
	 * @return {Boolean} `true` if `val` is an array, `false` otherwise.
	 * @example
	 *
	 *      _isArray([]); //=> true
	 *      _isArray(null); //=> false
	 *      _isArray({}); //=> false
	 */
	module.exports = Array.isArray || function _isArray(val) {
	  return (val != null &&
	          val.length >= 0 &&
	          Object.prototype.toString.call(val) === '[object Array]');
	};


/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = function _isTransformer(obj) {
	  return typeof obj['@@transducer/step'] === 'function';
	};


/***/ },
/* 13 */
/***/ function(module, exports) {

	/**
	 * An optimized, private array `slice` implementation.
	 *
	 * @private
	 * @param {Arguments|Array} args The array or arguments object to consider.
	 * @param {Number} [from=0] The array index to slice from, inclusive.
	 * @param {Number} [to=args.length] The array index to slice to, exclusive.
	 * @return {Array} A new, sliced array.
	 * @example
	 *
	 *      _slice([1, 2, 3, 4, 5], 1, 3); //=> [2, 3]
	 *
	 *      var firstThreeArgs = function(a, b, c, d) {
	 *        return _slice(arguments, 0, 3);
	 *      };
	 *      firstThreeArgs(1, 2, 3, 4); //=> [1, 2, 3]
	 */
	module.exports = function _slice(args, from, to) {
	  switch (arguments.length) {
	    case 1: return _slice(args, 0, args.length);
	    case 2: return _slice(args, from, args.length);
	    default:
	      var list = [];
	      var idx = 0;
	      var len = Math.max(0, Math.min(args.length, to) - from);
	      while (idx < len) {
	        list[idx] = args[from + idx];
	        idx += 1;
	      }
	      return list;
	  }
	};


/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = function _map(fn, functor) {
	  var idx = 0;
	  var len = functor.length;
	  var result = Array(len);
	  while (idx < len) {
	    result[idx] = fn(functor[idx]);
	    idx += 1;
	  }
	  return result;
	};


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var _xwrap = __webpack_require__(16);
	var bind = __webpack_require__(17);
	var isArrayLike = __webpack_require__(19);
	
	
	module.exports = (function() {
	  function _arrayReduce(xf, acc, list) {
	    var idx = 0;
	    var len = list.length;
	    while (idx < len) {
	      acc = xf['@@transducer/step'](acc, list[idx]);
	      if (acc && acc['@@transducer/reduced']) {
	        acc = acc['@@transducer/value'];
	        break;
	      }
	      idx += 1;
	    }
	    return xf['@@transducer/result'](acc);
	  }
	
	  function _iterableReduce(xf, acc, iter) {
	    var step = iter.next();
	    while (!step.done) {
	      acc = xf['@@transducer/step'](acc, step.value);
	      if (acc && acc['@@transducer/reduced']) {
	        acc = acc['@@transducer/value'];
	        break;
	      }
	      step = iter.next();
	    }
	    return xf['@@transducer/result'](acc);
	  }
	
	  function _methodReduce(xf, acc, obj) {
	    return xf['@@transducer/result'](obj.reduce(bind(xf['@@transducer/step'], xf), acc));
	  }
	
	  var symIterator = (typeof Symbol !== 'undefined') ? Symbol.iterator : '@@iterator';
	  return function _reduce(fn, acc, list) {
	    if (typeof fn === 'function') {
	      fn = _xwrap(fn);
	    }
	    if (isArrayLike(list)) {
	      return _arrayReduce(fn, acc, list);
	    }
	    if (typeof list.reduce === 'function') {
	      return _methodReduce(fn, acc, list);
	    }
	    if (list[symIterator] != null) {
	      return _iterableReduce(fn, acc, list[symIterator]());
	    }
	    if (typeof list.next === 'function') {
	      return _iterableReduce(fn, acc, list);
	    }
	    throw new TypeError('reduce: list must be array or iterable');
	  };
	}());


/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = (function() {
	  function XWrap(fn) {
	    this.f = fn;
	  }
	  XWrap.prototype['@@transducer/init'] = function() {
	    throw new Error('init not implemented on XWrap');
	  };
	  XWrap.prototype['@@transducer/result'] = function(acc) { return acc; };
	  XWrap.prototype['@@transducer/step'] = function(acc, x) {
	    return this.f(acc, x);
	  };
	
	  return function _xwrap(fn) { return new XWrap(fn); };
	}());


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var _arity = __webpack_require__(18);
	var _curry2 = __webpack_require__(6);
	
	
	/**
	 * Creates a function that is bound to a context.
	 * Note: `R.bind` does not provide the additional argument-binding capabilities of
	 * [Function.prototype.bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).
	 *
	 * @func
	 * @memberOf R
	 * @since v0.6.0
	 * @category Function
	 * @category Object
	 * @sig (* -> *) -> {*} -> (* -> *)
	 * @param {Function} fn The function to bind to context
	 * @param {Object} thisObj The context to bind `fn` to
	 * @return {Function} A function that will execute in the context of `thisObj`.
	 * @see R.partial
	 * @example
	 *
	 *      var log = R.bind(console.log, console);
	 *      R.pipe(R.assoc('a', 2), R.tap(log), R.assoc('a', 3))({a: 1}); //=> {a: 3}
	 *      // logs {a: 2}
	 */
	module.exports = _curry2(function bind(fn, thisObj) {
	  return _arity(fn.length, function() {
	    return fn.apply(thisObj, arguments);
	  });
	});


/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = function _arity(n, fn) {
	  /* eslint-disable no-unused-vars */
	  switch (n) {
	    case 0: return function() { return fn.apply(this, arguments); };
	    case 1: return function(a0) { return fn.apply(this, arguments); };
	    case 2: return function(a0, a1) { return fn.apply(this, arguments); };
	    case 3: return function(a0, a1, a2) { return fn.apply(this, arguments); };
	    case 4: return function(a0, a1, a2, a3) { return fn.apply(this, arguments); };
	    case 5: return function(a0, a1, a2, a3, a4) { return fn.apply(this, arguments); };
	    case 6: return function(a0, a1, a2, a3, a4, a5) { return fn.apply(this, arguments); };
	    case 7: return function(a0, a1, a2, a3, a4, a5, a6) { return fn.apply(this, arguments); };
	    case 8: return function(a0, a1, a2, a3, a4, a5, a6, a7) { return fn.apply(this, arguments); };
	    case 9: return function(a0, a1, a2, a3, a4, a5, a6, a7, a8) { return fn.apply(this, arguments); };
	    case 10: return function(a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) { return fn.apply(this, arguments); };
	    default: throw new Error('First argument to _arity must be a non-negative integer no greater than ten');
	  }
	};


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var _curry1 = __webpack_require__(7);
	var _isArray = __webpack_require__(11);
	var _isString = __webpack_require__(20);
	
	
	/**
	 * Tests whether or not an object is similar to an array.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.5.0
	 * @category Type
	 * @category List
	 * @sig * -> Boolean
	 * @param {*} x The object to test.
	 * @return {Boolean} `true` if `x` has a numeric length property and extreme indices defined; `false` otherwise.
	 * @example
	 *
	 *      R.isArrayLike([]); //=> true
	 *      R.isArrayLike(true); //=> false
	 *      R.isArrayLike({}); //=> false
	 *      R.isArrayLike({length: 10}); //=> false
	 *      R.isArrayLike({0: 'zero', 9: 'nine', length: 10}); //=> true
	 */
	module.exports = _curry1(function isArrayLike(x) {
	  if (_isArray(x)) { return true; }
	  if (!x) { return false; }
	  if (typeof x !== 'object') { return false; }
	  if (_isString(x)) { return false; }
	  if (x.nodeType === 1) { return !!x.length; }
	  if (x.length === 0) { return true; }
	  if (x.length > 0) {
	    return x.hasOwnProperty(0) && x.hasOwnProperty(x.length - 1);
	  }
	  return false;
	});


/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = function _isString(x) {
	  return Object.prototype.toString.call(x) === '[object String]';
	};


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var _curry2 = __webpack_require__(6);
	var _xfBase = __webpack_require__(22);
	
	
	module.exports = (function() {
	  function XMap(f, xf) {
	    this.xf = xf;
	    this.f = f;
	  }
	  XMap.prototype['@@transducer/init'] = _xfBase.init;
	  XMap.prototype['@@transducer/result'] = _xfBase.result;
	  XMap.prototype['@@transducer/step'] = function(result, input) {
	    return this.xf['@@transducer/step'](result, this.f(input));
	  };
	
	  return _curry2(function _xmap(f, xf) { return new XMap(f, xf); });
	}());


/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = {
	  init: function() {
	    return this.xf['@@transducer/init']();
	  },
	  result: function(result) {
	    return this.xf['@@transducer/result'](result);
	  }
	};


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var _arity = __webpack_require__(18);
	var _curry1 = __webpack_require__(7);
	var _curry2 = __webpack_require__(6);
	var _curryN = __webpack_require__(24);
	
	
	/**
	 * Returns a curried equivalent of the provided function, with the specified
	 * arity. The curried function has two unusual capabilities. First, its
	 * arguments needn't be provided one at a time. If `g` is `R.curryN(3, f)`, the
	 * following are equivalent:
	 *
	 *   - `g(1)(2)(3)`
	 *   - `g(1)(2, 3)`
	 *   - `g(1, 2)(3)`
	 *   - `g(1, 2, 3)`
	 *
	 * Secondly, the special placeholder value `R.__` may be used to specify
	 * "gaps", allowing partial application of any combination of arguments,
	 * regardless of their positions. If `g` is as above and `_` is `R.__`, the
	 * following are equivalent:
	 *
	 *   - `g(1, 2, 3)`
	 *   - `g(_, 2, 3)(1)`
	 *   - `g(_, _, 3)(1)(2)`
	 *   - `g(_, _, 3)(1, 2)`
	 *   - `g(_, 2)(1)(3)`
	 *   - `g(_, 2)(1, 3)`
	 *   - `g(_, 2)(_, 3)(1)`
	 *
	 * @func
	 * @memberOf R
	 * @since v0.5.0
	 * @category Function
	 * @sig Number -> (* -> a) -> (* -> a)
	 * @param {Number} length The arity for the returned function.
	 * @param {Function} fn The function to curry.
	 * @return {Function} A new, curried function.
	 * @see R.curry
	 * @example
	 *
	 *      var sumArgs = (...args) => R.sum(args);
	 *
	 *      var curriedAddFourNumbers = R.curryN(4, sumArgs);
	 *      var f = curriedAddFourNumbers(1, 2);
	 *      var g = f(3);
	 *      g(4); //=> 10
	 */
	module.exports = _curry2(function curryN(length, fn) {
	  if (length === 1) {
	    return _curry1(fn);
	  }
	  return _arity(length, _curryN(length, [], fn));
	});


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var _arity = __webpack_require__(18);
	var _isPlaceholder = __webpack_require__(8);
	
	
	/**
	 * Internal curryN function.
	 *
	 * @private
	 * @category Function
	 * @param {Number} length The arity of the curried function.
	 * @param {Array} received An array of arguments received thus far.
	 * @param {Function} fn The function to curry.
	 * @return {Function} The curried function.
	 */
	module.exports = function _curryN(length, received, fn) {
	  return function() {
	    var combined = [];
	    var argsIdx = 0;
	    var left = length;
	    var combinedIdx = 0;
	    while (combinedIdx < received.length || argsIdx < arguments.length) {
	      var result;
	      if (combinedIdx < received.length &&
	          (!_isPlaceholder(received[combinedIdx]) ||
	           argsIdx >= arguments.length)) {
	        result = received[combinedIdx];
	      } else {
	        result = arguments[argsIdx];
	        argsIdx += 1;
	      }
	      combined[combinedIdx] = result;
	      if (!_isPlaceholder(result)) {
	        left -= 1;
	      }
	      combinedIdx += 1;
	    }
	    return left <= 0 ? fn.apply(this, combined)
	                     : _arity(left, _curryN(length, combined, fn));
	  };
	};


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var _curry1 = __webpack_require__(7);
	var _has = __webpack_require__(5);
	var _isArguments = __webpack_require__(26);
	
	
	/**
	 * Returns a list containing the names of all the enumerable own properties of
	 * the supplied object.
	 * Note that the order of the output array is not guaranteed to be consistent
	 * across different JS platforms.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.1.0
	 * @category Object
	 * @sig {k: v} -> [k]
	 * @param {Object} obj The object to extract properties from
	 * @return {Array} An array of the object's own properties.
	 * @example
	 *
	 *      R.keys({a: 1, b: 2, c: 3}); //=> ['a', 'b', 'c']
	 */
	module.exports = (function() {
	  // cover IE < 9 keys issues
	  var hasEnumBug = !({toString: null}).propertyIsEnumerable('toString');
	  var nonEnumerableProps = ['constructor', 'valueOf', 'isPrototypeOf', 'toString',
	                            'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];
	  // Safari bug
	  var hasArgsEnumBug = (function() {
	    'use strict';
	    return arguments.propertyIsEnumerable('length');
	  }());
	
	  var contains = function contains(list, item) {
	    var idx = 0;
	    while (idx < list.length) {
	      if (list[idx] === item) {
	        return true;
	      }
	      idx += 1;
	    }
	    return false;
	  };
	
	  return typeof Object.keys === 'function' && !hasArgsEnumBug ?
	    _curry1(function keys(obj) {
	      return Object(obj) !== obj ? [] : Object.keys(obj);
	    }) :
	    _curry1(function keys(obj) {
	      if (Object(obj) !== obj) {
	        return [];
	      }
	      var prop, nIdx;
	      var ks = [];
	      var checkArgsLength = hasArgsEnumBug && _isArguments(obj);
	      for (prop in obj) {
	        if (_has(prop, obj) && (!checkArgsLength || prop !== 'length')) {
	          ks[ks.length] = prop;
	        }
	      }
	      if (hasEnumBug) {
	        nIdx = nonEnumerableProps.length - 1;
	        while (nIdx >= 0) {
	          prop = nonEnumerableProps[nIdx];
	          if (_has(prop, obj) && !contains(ks, prop)) {
	            ks[ks.length] = prop;
	          }
	          nIdx -= 1;
	        }
	      }
	      return ks;
	    });
	}());


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var _has = __webpack_require__(5);
	
	
	module.exports = (function() {
	  var toString = Object.prototype.toString;
	  return toString.call(arguments) === '[object Arguments]' ?
	    function _isArguments(x) { return toString.call(x) === '[object Arguments]'; } :
	    function _isArguments(x) { return _has('callee', x); };
	}());


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _and = __webpack_require__(28);
	
	var _and2 = _interopRequireDefault(_and);
	
	var _or = __webpack_require__(29);
	
	var _or2 = _interopRequireDefault(_or);
	
	var _propEq = __webpack_require__(30);
	
	var _propEq2 = _interopRequireDefault(_propEq);
	
	var _ifElse = __webpack_require__(38);
	
	var _ifElse2 = _interopRequireDefault(_ifElse);
	
	var _equals = __webpack_require__(32);
	
	var _equals2 = _interopRequireDefault(_equals);
	
	var _not = __webpack_require__(39);
	
	var _not2 = _interopRequireDefault(_not);
	
	var _compose = __webpack_require__(40);
	
	var _compose2 = _interopRequireDefault(_compose);
	
	var _prop = __webpack_require__(48);
	
	var _prop2 = _interopRequireDefault(_prop);
	
	var _objOf = __webpack_require__(49);
	
	var _objOf2 = _interopRequireDefault(_objOf);
	
	var _has = __webpack_require__(50);
	
	var _has2 = _interopRequireDefault(_has);
	
	var _both = __webpack_require__(51);
	
	var _both2 = _interopRequireDefault(_both);
	
	var _cond = __webpack_require__(57);
	
	var _cond2 = _interopRequireDefault(_cond);
	
	var _encryption = __webpack_require__(59);
	
	var _encryption2 = _interopRequireDefault(_encryption);
	
	var _login = __webpack_require__(60);
	
	var _login2 = _interopRequireDefault(_login);
	
	var _api = __webpack_require__(148);
	
	var _api2 = _interopRequireDefault(_api);
	
	var _company = __webpack_require__(149);
	
	var _company2 = _interopRequireDefault(_company);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Defines the correct authentication
	 * method according to the supplied
	 * object's properties and returns
	 * the builder function.
	 *
	 * @param {Object} options The object containing
	 *                         the authentication data
	 * @return {?Function} The builder function for
	 *                     the Authentication method
	 * @private
	 */
	var strategyBuilder = (0, _cond2.default)([[(0, _both2.default)((0, _has2.default)('email'), (0, _has2.default)('password')), _login2.default.build], [(0, _has2.default)('api_key'), _api2.default.build], [(0, _has2.default)('encryption_key'), _encryption2.default.build]]); /**
	                                                                                                                                                                                                                                                                                   * @name Strategies
	                                                                                                                                                                                                                                                                                   * @description This module is responsible for the
	                                                                                                                                                                                                                                                                                   *              authentication method strategies.
	                                                                                                                                                                                                                                                                                   * @module strategies
	                                                                                                                                                                                                                                                                                   * @private
	                                                                                                                                                                                                                                                                                   */
	
	function isBrowserEnvironment() {
	  if (global === undefined) {
	    return true;
	  }
	
	  return false;
	}
	
	var buildBody = (0, _objOf2.default)('body');
	
	function isValidKey(options) {
	  var apiKey = (0, _prop2.default)('api_key', options);
	  var encryptionKey = (0, _prop2.default)('encryption_key', options);
	
	  var body = (0, _cond2.default)([[(0, _has2.default)('api_key'), function () {
	    return buildBody({ api_key: apiKey });
	  }], [(0, _has2.default)('encryption_key'), function () {
	    return buildBody({ encryption_key: encryptionKey });
	  }]])(options);
	
	  return _company2.default.current(body);
	}
	
	function rejectInvalidAuthObject() {
	  return Promise.reject(new Error('You must supply a valid authentication object'));
	}
	
	function isValidStrategy(options) {
	  var strategy = strategyBuilder(options);
	
	  var strategyIsNotUndefined = (0, _compose2.default)(_not2.default, (0, _equals2.default)(undefined));
	
	  return (0, _ifElse2.default)(strategyIsNotUndefined, function () {
	    return Promise.resolve(strategy);
	  }, rejectInvalidAuthObject)(strategy);
	}
	
	function rejectInvalidKey() {
	  return Promise.reject(new Error('You must supply a valid key'));
	}
	
	/**
	 * Finds and resolves to a builder
	 * function for authentication
	 * according to the supplied object.
	 *
	 * @param {Object} options The object containing
	 *                         the authentication data
	 * @returns {Promise} Resolves to either the
	 *                    correct builder function
	 *                    or rejects with an Error.
	 */
	function find(options) {
	  var skipAuthentication = (0, _propEq2.default)('skipAuthentication', true)(options);
	
	  if (skipAuthentication) {
	    return isValidStrategy(options);
	  }
	
	  if ((0, _or2.default)((0, _has2.default)('api_key', options), (0, _has2.default)('encryption_key', options))) {
	    if ((0, _and2.default)((0, _has2.default)('api_key', options), isBrowserEnvironment())) {
	      return Promise.reject(new Error('You cannot use an api key in the browser!'));
	    }
	
	    return isValidKey(options).then(function () {
	      return isValidStrategy(options);
	    }).catch(function () {
	      return rejectInvalidKey();
	    });
	  }
	
	  return isValidStrategy(options);
	}
	
	exports.default = { find: find };
	module.exports = exports['default'];

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var _curry2 = __webpack_require__(6);
	
	
	/**
	 * Returns `true` if both arguments are `true`; `false` otherwise.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.1.0
	 * @category Logic
	 * @sig * -> * -> *
	 * @param {Boolean} a A boolean value
	 * @param {Boolean} b A boolean value
	 * @return {Boolean} `true` if both arguments are `true`, `false` otherwise
	 * @see R.both
	 * @example
	 *
	 *      R.and(true, true); //=> true
	 *      R.and(true, false); //=> false
	 *      R.and(false, true); //=> false
	 *      R.and(false, false); //=> false
	 */
	module.exports = _curry2(function and(a, b) {
	  return a && b;
	});


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var _curry2 = __webpack_require__(6);
	
	
	/**
	 * Returns `true` if one or both of its arguments are `true`. Returns `false`
	 * if both arguments are `false`.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.1.0
	 * @category Logic
	 * @sig * -> * -> *
	 * @param {Boolean} a A boolean value
	 * @param {Boolean} b A boolean value
	 * @return {Boolean} `true` if one or both arguments are `true`, `false` otherwise
	 * @see R.either
	 * @example
	 *
	 *      R.or(true, true); //=> true
	 *      R.or(true, false); //=> true
	 *      R.or(false, true); //=> true
	 *      R.or(false, false); //=> false
	 */
	module.exports = _curry2(function or(a, b) {
	  return a || b;
	});


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var _curry3 = __webpack_require__(31);
	var equals = __webpack_require__(32);
	
	
	/**
	 * Returns `true` if the specified object property is equal, in `R.equals`
	 * terms, to the given value; `false` otherwise.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.1.0
	 * @category Relation
	 * @sig String -> a -> Object -> Boolean
	 * @param {String} name
	 * @param {*} val
	 * @param {*} obj
	 * @return {Boolean}
	 * @see R.equals, R.propSatisfies
	 * @example
	 *
	 *      var abby = {name: 'Abby', age: 7, hair: 'blond'};
	 *      var fred = {name: 'Fred', age: 12, hair: 'brown'};
	 *      var rusty = {name: 'Rusty', age: 10, hair: 'brown'};
	 *      var alois = {name: 'Alois', age: 15, disposition: 'surly'};
	 *      var kids = [abby, fred, rusty, alois];
	 *      var hasBrownHair = R.propEq('hair', 'brown');
	 *      R.filter(hasBrownHair, kids); //=> [fred, rusty]
	 */
	module.exports = _curry3(function propEq(name, val, obj) {
	  return equals(val, obj[name]);
	});


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var _curry1 = __webpack_require__(7);
	var _curry2 = __webpack_require__(6);
	var _isPlaceholder = __webpack_require__(8);
	
	
	/**
	 * Optimized internal three-arity curry function.
	 *
	 * @private
	 * @category Function
	 * @param {Function} fn The function to curry.
	 * @return {Function} The curried function.
	 */
	module.exports = function _curry3(fn) {
	  return function f3(a, b, c) {
	    switch (arguments.length) {
	      case 0:
	        return f3;
	      case 1:
	        return _isPlaceholder(a) ? f3
	             : _curry2(function(_b, _c) { return fn(a, _b, _c); });
	      case 2:
	        return _isPlaceholder(a) && _isPlaceholder(b) ? f3
	             : _isPlaceholder(a) ? _curry2(function(_a, _c) { return fn(_a, b, _c); })
	             : _isPlaceholder(b) ? _curry2(function(_b, _c) { return fn(a, _b, _c); })
	             : _curry1(function(_c) { return fn(a, b, _c); });
	      default:
	        return _isPlaceholder(a) && _isPlaceholder(b) && _isPlaceholder(c) ? f3
	             : _isPlaceholder(a) && _isPlaceholder(b) ? _curry2(function(_a, _b) { return fn(_a, _b, c); })
	             : _isPlaceholder(a) && _isPlaceholder(c) ? _curry2(function(_a, _c) { return fn(_a, b, _c); })
	             : _isPlaceholder(b) && _isPlaceholder(c) ? _curry2(function(_b, _c) { return fn(a, _b, _c); })
	             : _isPlaceholder(a) ? _curry1(function(_a) { return fn(_a, b, c); })
	             : _isPlaceholder(b) ? _curry1(function(_b) { return fn(a, _b, c); })
	             : _isPlaceholder(c) ? _curry1(function(_c) { return fn(a, b, _c); })
	             : fn(a, b, c);
	    }
	  };
	};


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var _curry2 = __webpack_require__(6);
	var _equals = __webpack_require__(33);
	
	
	/**
	 * Returns `true` if its arguments are equivalent, `false` otherwise. Handles
	 * cyclical data structures.
	 *
	 * Dispatches symmetrically to the `equals` methods of both arguments, if
	 * present.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.15.0
	 * @category Relation
	 * @sig a -> b -> Boolean
	 * @param {*} a
	 * @param {*} b
	 * @return {Boolean}
	 * @example
	 *
	 *      R.equals(1, 1); //=> true
	 *      R.equals(1, '1'); //=> false
	 *      R.equals([1, 2, 3], [1, 2, 3]); //=> true
	 *
	 *      var a = {}; a.v = a;
	 *      var b = {}; b.v = b;
	 *      R.equals(a, b); //=> true
	 */
	module.exports = _curry2(function equals(a, b) {
	  return _equals(a, b, [], []);
	});


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var _arrayFromIterator = __webpack_require__(34);
	var _functionName = __webpack_require__(35);
	var _has = __webpack_require__(5);
	var identical = __webpack_require__(36);
	var keys = __webpack_require__(25);
	var type = __webpack_require__(37);
	
	
	module.exports = function _equals(a, b, stackA, stackB) {
	  if (identical(a, b)) {
	    return true;
	  }
	
	  if (type(a) !== type(b)) {
	    return false;
	  }
	
	  if (a == null || b == null) {
	    return false;
	  }
	
	  if (typeof a.equals === 'function' || typeof b.equals === 'function') {
	    return typeof a.equals === 'function' && a.equals(b) &&
	           typeof b.equals === 'function' && b.equals(a);
	  }
	
	  switch (type(a)) {
	    case 'Arguments':
	    case 'Array':
	    case 'Object':
	      if (typeof a.constructor === 'function' &&
	          _functionName(a.constructor) === 'Promise') {
	        return a === b;
	      }
	      break;
	    case 'Boolean':
	    case 'Number':
	    case 'String':
	      if (!(typeof a === typeof b && identical(a.valueOf(), b.valueOf()))) {
	        return false;
	      }
	      break;
	    case 'Date':
	      if (!identical(a.valueOf(), b.valueOf())) {
	        return false;
	      }
	      break;
	    case 'Error':
	      return a.name === b.name && a.message === b.message;
	    case 'RegExp':
	      if (!(a.source === b.source &&
	            a.global === b.global &&
	            a.ignoreCase === b.ignoreCase &&
	            a.multiline === b.multiline &&
	            a.sticky === b.sticky &&
	            a.unicode === b.unicode)) {
	        return false;
	      }
	      break;
	    case 'Map':
	    case 'Set':
	      if (!_equals(_arrayFromIterator(a.entries()), _arrayFromIterator(b.entries()), stackA, stackB)) {
	        return false;
	      }
	      break;
	    case 'Int8Array':
	    case 'Uint8Array':
	    case 'Uint8ClampedArray':
	    case 'Int16Array':
	    case 'Uint16Array':
	    case 'Int32Array':
	    case 'Uint32Array':
	    case 'Float32Array':
	    case 'Float64Array':
	      break;
	    case 'ArrayBuffer':
	      break;
	    default:
	      // Values of other types are only equal if identical.
	      return false;
	  }
	
	  var keysA = keys(a);
	  if (keysA.length !== keys(b).length) {
	    return false;
	  }
	
	  var idx = stackA.length - 1;
	  while (idx >= 0) {
	    if (stackA[idx] === a) {
	      return stackB[idx] === b;
	    }
	    idx -= 1;
	  }
	
	  stackA.push(a);
	  stackB.push(b);
	  idx = keysA.length - 1;
	  while (idx >= 0) {
	    var key = keysA[idx];
	    if (!(_has(key, b) && _equals(b[key], a[key], stackA, stackB))) {
	      return false;
	    }
	    idx -= 1;
	  }
	  stackA.pop();
	  stackB.pop();
	  return true;
	};


/***/ },
/* 34 */
/***/ function(module, exports) {

	module.exports = function _arrayFromIterator(iter) {
	  var list = [];
	  var next;
	  while (!(next = iter.next()).done) {
	    list.push(next.value);
	  }
	  return list;
	};


/***/ },
/* 35 */
/***/ function(module, exports) {

	module.exports = function _functionName(f) {
	  // String(x => x) evaluates to "x => x", so the pattern may not match.
	  var match = String(f).match(/^function (\w*)/);
	  return match == null ? '' : match[1];
	};


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var _curry2 = __webpack_require__(6);
	
	
	/**
	 * Returns true if its arguments are identical, false otherwise. Values are
	 * identical if they reference the same memory. `NaN` is identical to `NaN`;
	 * `0` and `-0` are not identical.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.15.0
	 * @category Relation
	 * @sig a -> a -> Boolean
	 * @param {*} a
	 * @param {*} b
	 * @return {Boolean}
	 * @example
	 *
	 *      var o = {};
	 *      R.identical(o, o); //=> true
	 *      R.identical(1, 1); //=> true
	 *      R.identical(1, '1'); //=> false
	 *      R.identical([], []); //=> false
	 *      R.identical(0, -0); //=> false
	 *      R.identical(NaN, NaN); //=> true
	 */
	module.exports = _curry2(function identical(a, b) {
	  // SameValue algorithm
	  if (a === b) { // Steps 1-5, 7-10
	    // Steps 6.b-6.e: +0 != -0
	    return a !== 0 || 1 / a === 1 / b;
	  } else {
	    // Step 6.a: NaN == NaN
	    return a !== a && b !== b;
	  }
	});


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var _curry1 = __webpack_require__(7);
	
	
	/**
	 * Gives a single-word string description of the (native) type of a value,
	 * returning such answers as 'Object', 'Number', 'Array', or 'Null'. Does not
	 * attempt to distinguish user Object types any further, reporting them all as
	 * 'Object'.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.8.0
	 * @category Type
	 * @sig (* -> {*}) -> String
	 * @param {*} val The value to test
	 * @return {String}
	 * @example
	 *
	 *      R.type({}); //=> "Object"
	 *      R.type(1); //=> "Number"
	 *      R.type(false); //=> "Boolean"
	 *      R.type('s'); //=> "String"
	 *      R.type(null); //=> "Null"
	 *      R.type([]); //=> "Array"
	 *      R.type(/[A-z]/); //=> "RegExp"
	 */
	module.exports = _curry1(function type(val) {
	  return val === null      ? 'Null'      :
	         val === undefined ? 'Undefined' :
	         Object.prototype.toString.call(val).slice(8, -1);
	});


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var _curry3 = __webpack_require__(31);
	var curryN = __webpack_require__(23);
	
	
	/**
	 * Creates a function that will process either the `onTrue` or the `onFalse`
	 * function depending upon the result of the `condition` predicate.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.8.0
	 * @category Logic
	 * @sig (*... -> Boolean) -> (*... -> *) -> (*... -> *) -> (*... -> *)
	 * @param {Function} condition A predicate function
	 * @param {Function} onTrue A function to invoke when the `condition` evaluates to a truthy value.
	 * @param {Function} onFalse A function to invoke when the `condition` evaluates to a falsy value.
	 * @return {Function} A new unary function that will process either the `onTrue` or the `onFalse`
	 *                    function depending upon the result of the `condition` predicate.
	 * @see R.unless, R.when
	 * @example
	 *
	 *      var incCount = R.ifElse(
	 *        R.has('count'),
	 *        R.over(R.lensProp('count'), R.inc),
	 *        R.assoc('count', 1)
	 *      );
	 *      incCount({});           //=> { count: 1 }
	 *      incCount({ count: 1 }); //=> { count: 2 }
	 */
	module.exports = _curry3(function ifElse(condition, onTrue, onFalse) {
	  return curryN(Math.max(condition.length, onTrue.length, onFalse.length),
	    function _ifElse() {
	      return condition.apply(this, arguments) ? onTrue.apply(this, arguments) : onFalse.apply(this, arguments);
	    }
	  );
	});


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var _curry1 = __webpack_require__(7);
	
	
	/**
	 * A function that returns the `!` of its argument. It will return `true` when
	 * passed false-y value, and `false` when passed a truth-y one.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.1.0
	 * @category Logic
	 * @sig * -> Boolean
	 * @param {*} a any value
	 * @return {Boolean} the logical inverse of passed argument.
	 * @see R.complement
	 * @example
	 *
	 *      R.not(true); //=> false
	 *      R.not(false); //=> true
	 *      R.not(0); //=> true
	 *      R.not(1); //=> false
	 */
	module.exports = _curry1(function not(a) {
	  return !a;
	});


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var pipe = __webpack_require__(41);
	var reverse = __webpack_require__(47);
	
	
	/**
	 * Performs right-to-left function composition. The rightmost function may have
	 * any arity; the remaining functions must be unary.
	 *
	 * **Note:** The result of compose is not automatically curried.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.1.0
	 * @category Function
	 * @sig ((y -> z), (x -> y), ..., (o -> p), ((a, b, ..., n) -> o)) -> ((a, b, ..., n) -> z)
	 * @param {...Function} functions
	 * @return {Function}
	 * @see R.pipe
	 * @example
	 *
	 *      var f = R.compose(R.inc, R.negate, Math.pow);
	 *
	 *      f(3, 4); // -(3^4) + 1
	 */
	module.exports = function compose() {
	  if (arguments.length === 0) {
	    throw new Error('compose requires at least one argument');
	  }
	  return pipe.apply(this, reverse(arguments));
	};


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var _arity = __webpack_require__(18);
	var _pipe = __webpack_require__(42);
	var reduce = __webpack_require__(43);
	var tail = __webpack_require__(44);
	
	
	/**
	 * Performs left-to-right function composition. The leftmost function may have
	 * any arity; the remaining functions must be unary.
	 *
	 * In some libraries this function is named `sequence`.
	 *
	 * **Note:** The result of pipe is not automatically curried.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.1.0
	 * @category Function
	 * @sig (((a, b, ..., n) -> o), (o -> p), ..., (x -> y), (y -> z)) -> ((a, b, ..., n) -> z)
	 * @param {...Function} functions
	 * @return {Function}
	 * @see R.compose
	 * @example
	 *
	 *      var f = R.pipe(Math.pow, R.negate, R.inc);
	 *
	 *      f(3, 4); // -(3^4) + 1
	 */
	module.exports = function pipe() {
	  if (arguments.length === 0) {
	    throw new Error('pipe requires at least one argument');
	  }
	  return _arity(arguments[0].length,
	                reduce(_pipe, arguments[0], tail(arguments)));
	};


/***/ },
/* 42 */
/***/ function(module, exports) {

	module.exports = function _pipe(f, g) {
	  return function() {
	    return g.call(this, f.apply(this, arguments));
	  };
	};


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var _curry3 = __webpack_require__(31);
	var _reduce = __webpack_require__(15);
	
	
	/**
	 * Returns a single item by iterating through the list, successively calling
	 * the iterator function and passing it an accumulator value and the current
	 * value from the array, and then passing the result to the next call.
	 *
	 * The iterator function receives two values: *(acc, value)*. It may use
	 * `R.reduced` to shortcut the iteration.
	 *
	 * Note: `R.reduce` does not skip deleted or unassigned indices (sparse
	 * arrays), unlike the native `Array.prototype.reduce` method. For more details
	 * on this behavior, see:
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#Description
	 *
	 * Dispatches to the `reduce` method of the third argument, if present.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.1.0
	 * @category List
	 * @sig ((a, b) -> a) -> a -> [b] -> a
	 * @param {Function} fn The iterator function. Receives two values, the accumulator and the
	 *        current element from the array.
	 * @param {*} acc The accumulator value.
	 * @param {Array} list The list to iterate over.
	 * @return {*} The final, accumulated value.
	 * @see R.reduced, R.addIndex
	 * @example
	 *
	 *      var numbers = [1, 2, 3];
	 *      var plus = (a, b) => a + b;
	 *
	 *      R.reduce(plus, 10, numbers); //=> 16
	 */
	module.exports = _curry3(_reduce);


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var _checkForMethod = __webpack_require__(45);
	var slice = __webpack_require__(46);
	
	
	/**
	 * Returns all but the first element of the given list or string (or object
	 * with a `tail` method).
	 *
	 * Dispatches to the `slice` method of the first argument, if present.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.1.0
	 * @category List
	 * @sig [a] -> [a]
	 * @sig String -> String
	 * @param {*} list
	 * @return {*}
	 * @see R.head, R.init, R.last
	 * @example
	 *
	 *      R.tail([1, 2, 3]);  //=> [2, 3]
	 *      R.tail([1, 2]);     //=> [2]
	 *      R.tail([1]);        //=> []
	 *      R.tail([]);         //=> []
	 *
	 *      R.tail('abc');  //=> 'bc'
	 *      R.tail('ab');   //=> 'b'
	 *      R.tail('a');    //=> ''
	 *      R.tail('');     //=> ''
	 */
	module.exports = _checkForMethod('tail', slice(1, Infinity));


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var _isArray = __webpack_require__(11);
	var _slice = __webpack_require__(13);
	
	
	/**
	 * Similar to hasMethod, this checks whether a function has a [methodname]
	 * function. If it isn't an array it will execute that function otherwise it
	 * will default to the ramda implementation.
	 *
	 * @private
	 * @param {Function} fn ramda implemtation
	 * @param {String} methodname property to check for a custom implementation
	 * @return {Object} Whatever the return value of the method is.
	 */
	module.exports = function _checkForMethod(methodname, fn) {
	  return function() {
	    var length = arguments.length;
	    if (length === 0) {
	      return fn();
	    }
	    var obj = arguments[length - 1];
	    return (_isArray(obj) || typeof obj[methodname] !== 'function') ?
	      fn.apply(this, arguments) :
	      obj[methodname].apply(obj, _slice(arguments, 0, length - 1));
	  };
	};


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var _checkForMethod = __webpack_require__(45);
	var _curry3 = __webpack_require__(31);
	
	
	/**
	 * Returns the elements of the given list or string (or object with a `slice`
	 * method) from `fromIndex` (inclusive) to `toIndex` (exclusive).
	 *
	 * Dispatches to the `slice` method of the third argument, if present.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.1.4
	 * @category List
	 * @sig Number -> Number -> [a] -> [a]
	 * @sig Number -> Number -> String -> String
	 * @param {Number} fromIndex The start index (inclusive).
	 * @param {Number} toIndex The end index (exclusive).
	 * @param {*} list
	 * @return {*}
	 * @example
	 *
	 *      R.slice(1, 3, ['a', 'b', 'c', 'd']);        //=> ['b', 'c']
	 *      R.slice(1, Infinity, ['a', 'b', 'c', 'd']); //=> ['b', 'c', 'd']
	 *      R.slice(0, -1, ['a', 'b', 'c', 'd']);       //=> ['a', 'b', 'c']
	 *      R.slice(-3, -1, ['a', 'b', 'c', 'd']);      //=> ['b', 'c']
	 *      R.slice(0, 3, 'ramda');                     //=> 'ram'
	 */
	module.exports = _curry3(_checkForMethod('slice', function slice(fromIndex, toIndex, list) {
	  return Array.prototype.slice.call(list, fromIndex, toIndex);
	}));


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var _curry1 = __webpack_require__(7);
	var _isString = __webpack_require__(20);
	var _slice = __webpack_require__(13);
	
	
	/**
	 * Returns a new list or string with the elements or characters in reverse
	 * order.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.1.0
	 * @category List
	 * @sig [a] -> [a]
	 * @sig String -> String
	 * @param {Array|String} list
	 * @return {Array|String}
	 * @example
	 *
	 *      R.reverse([1, 2, 3]);  //=> [3, 2, 1]
	 *      R.reverse([1, 2]);     //=> [2, 1]
	 *      R.reverse([1]);        //=> [1]
	 *      R.reverse([]);         //=> []
	 *
	 *      R.reverse('abc');      //=> 'cba'
	 *      R.reverse('ab');       //=> 'ba'
	 *      R.reverse('a');        //=> 'a'
	 *      R.reverse('');         //=> ''
	 */
	module.exports = _curry1(function reverse(list) {
	  return _isString(list) ? list.split('').reverse().join('') :
	                           _slice(list).reverse();
	});


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var _curry2 = __webpack_require__(6);
	
	
	/**
	 * Returns a function that when supplied an object returns the indicated
	 * property of that object, if it exists.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.1.0
	 * @category Object
	 * @sig s -> {s: a} -> a | Undefined
	 * @param {String} p The property name
	 * @param {Object} obj The object to query
	 * @return {*} The value at `obj.p`.
	 * @see R.path
	 * @example
	 *
	 *      R.prop('x', {x: 100}); //=> 100
	 *      R.prop('x', {}); //=> undefined
	 */
	module.exports = _curry2(function prop(p, obj) { return obj[p]; });


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var _curry2 = __webpack_require__(6);
	
	
	/**
	 * Creates an object containing a single key:value pair.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.18.0
	 * @category Object
	 * @sig String -> a -> {String:a}
	 * @param {String} key
	 * @param {*} val
	 * @return {Object}
	 * @see R.pair
	 * @example
	 *
	 *      var matchPhrases = R.compose(
	 *        R.objOf('must'),
	 *        R.map(R.objOf('match_phrase'))
	 *      );
	 *      matchPhrases(['foo', 'bar', 'baz']); //=> {must: [{match_phrase: 'foo'}, {match_phrase: 'bar'}, {match_phrase: 'baz'}]}
	 */
	module.exports = _curry2(function objOf(key, val) {
	  var obj = {};
	  obj[key] = val;
	  return obj;
	});


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var _curry2 = __webpack_require__(6);
	var _has = __webpack_require__(5);
	
	
	/**
	 * Returns whether or not an object has an own property with the specified name
	 *
	 * @func
	 * @memberOf R
	 * @since v0.7.0
	 * @category Object
	 * @sig s -> {s: x} -> Boolean
	 * @param {String} prop The name of the property to check for.
	 * @param {Object} obj The object to query.
	 * @return {Boolean} Whether the property exists.
	 * @example
	 *
	 *      var hasName = R.has('name');
	 *      hasName({name: 'alice'});   //=> true
	 *      hasName({name: 'bob'});     //=> true
	 *      hasName({});                //=> false
	 *
	 *      var point = {x: 0, y: 0};
	 *      var pointHas = R.has(R.__, point);
	 *      pointHas('x');  //=> true
	 *      pointHas('y');  //=> true
	 *      pointHas('z');  //=> false
	 */
	module.exports = _curry2(_has);


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var _curry2 = __webpack_require__(6);
	var _isFunction = __webpack_require__(52);
	var and = __webpack_require__(28);
	var lift = __webpack_require__(53);
	
	
	/**
	 * A function wrapping calls to the two functions in an `&&` operation,
	 * returning the result of the first function if it is false-y and the result
	 * of the second function otherwise. Note that this is short-circuited,
	 * meaning that the second function will not be invoked if the first returns a
	 * false-y value.
	 *
	 * In addition to functions, `R.both` also accepts any fantasy-land compatible
	 * applicative functor.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.12.0
	 * @category Logic
	 * @sig (*... -> Boolean) -> (*... -> Boolean) -> (*... -> Boolean)
	 * @param {Function} f a predicate
	 * @param {Function} g another predicate
	 * @return {Function} a function that applies its arguments to `f` and `g` and `&&`s their outputs together.
	 * @see R.and
	 * @example
	 *
	 *      var gt10 = x => x > 10;
	 *      var even = x => x % 2 === 0;
	 *      var f = R.both(gt10, even);
	 *      f(100); //=> true
	 *      f(101); //=> false
	 */
	module.exports = _curry2(function both(f, g) {
	  return _isFunction(f) ?
	    function _both() {
	      return f.apply(this, arguments) && g.apply(this, arguments);
	    } :
	    lift(and)(f, g);
	});


/***/ },
/* 52 */
/***/ function(module, exports) {

	module.exports = function _isFunction(x) {
	  return Object.prototype.toString.call(x) === '[object Function]';
	};


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var _curry1 = __webpack_require__(7);
	var liftN = __webpack_require__(54);
	
	
	/**
	 * "lifts" a function of arity > 1 so that it may "map over" a list, Function or other
	 * object that satisfies the [FantasyLand Apply spec](https://github.com/fantasyland/fantasy-land#apply).
	 *
	 * @func
	 * @memberOf R
	 * @since v0.7.0
	 * @category Function
	 * @sig (*... -> *) -> ([*]... -> [*])
	 * @param {Function} fn The function to lift into higher context
	 * @return {Function} The lifted function.
	 * @see R.liftN
	 * @example
	 *
	 *      var madd3 = R.lift(R.curry((a, b, c) => a + b + c));
	 *
	 *      madd3([1,2,3], [1,2,3], [1]); //=> [3, 4, 5, 4, 5, 6, 5, 6, 7]
	 *
	 *      var madd5 = R.lift(R.curry((a, b, c, d, e) => a + b + c + d + e));
	 *
	 *      madd5([1,2], [3], [4, 5], [6], [7, 8]); //=> [21, 22, 22, 23, 22, 23, 23, 24]
	 */
	module.exports = _curry1(function lift(fn) {
	  return liftN(fn.length, fn);
	});


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var _curry2 = __webpack_require__(6);
	var _reduce = __webpack_require__(15);
	var _slice = __webpack_require__(13);
	var ap = __webpack_require__(55);
	var curryN = __webpack_require__(23);
	var map = __webpack_require__(9);
	
	
	/**
	 * "lifts" a function to be the specified arity, so that it may "map over" that
	 * many lists, Functions or other objects that satisfy the [FantasyLand Apply spec](https://github.com/fantasyland/fantasy-land#apply).
	 *
	 * @func
	 * @memberOf R
	 * @since v0.7.0
	 * @category Function
	 * @sig Number -> (*... -> *) -> ([*]... -> [*])
	 * @param {Function} fn The function to lift into higher context
	 * @return {Function} The lifted function.
	 * @see R.lift, R.ap
	 * @example
	 *
	 *      var madd3 = R.liftN(3, R.curryN(3, (...args) => R.sum(args)));
	 *      madd3([1,2,3], [1,2,3], [1]); //=> [3, 4, 5, 4, 5, 6, 5, 6, 7]
	 */
	module.exports = _curry2(function liftN(arity, fn) {
	  var lifted = curryN(arity, fn);
	  return curryN(arity, function() {
	    return _reduce(ap, map(lifted, arguments[0]), _slice(arguments, 1));
	  });
	});


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var _concat = __webpack_require__(56);
	var _curry2 = __webpack_require__(6);
	var _reduce = __webpack_require__(15);
	var map = __webpack_require__(9);
	
	
	/**
	 * ap applies a list of functions to a list of values.
	 *
	 * Dispatches to the `ap` method of the second argument, if present. Also
	 * treats curried functions as applicatives.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.3.0
	 * @category Function
	 * @sig [a -> b] -> [a] -> [b]
	 * @sig Apply f => f (a -> b) -> f a -> f b
	 * @param {Array} fns An array of functions
	 * @param {Array} vs An array of values
	 * @return {Array} An array of results of applying each of `fns` to all of `vs` in turn.
	 * @example
	 *
	 *      R.ap([R.multiply(2), R.add(3)], [1,2,3]); //=> [2, 4, 6, 4, 5, 6]
	 */
	module.exports = _curry2(function ap(applicative, fn) {
	  return (
	    typeof applicative.ap === 'function' ?
	      applicative.ap(fn) :
	    typeof applicative === 'function' ?
	      function(x) { return applicative(x)(fn(x)); } :
	    // else
	      _reduce(function(acc, f) { return _concat(acc, map(f, fn)); }, [], applicative)
	  );
	});


/***/ },
/* 56 */
/***/ function(module, exports) {

	/**
	 * Private `concat` function to merge two array-like objects.
	 *
	 * @private
	 * @param {Array|Arguments} [set1=[]] An array-like object.
	 * @param {Array|Arguments} [set2=[]] An array-like object.
	 * @return {Array} A new, merged array.
	 * @example
	 *
	 *      _concat([4, 5, 6], [1, 2, 3]); //=> [4, 5, 6, 1, 2, 3]
	 */
	module.exports = function _concat(set1, set2) {
	  set1 = set1 || [];
	  set2 = set2 || [];
	  var idx;
	  var len1 = set1.length;
	  var len2 = set2.length;
	  var result = [];
	
	  idx = 0;
	  while (idx < len1) {
	    result[result.length] = set1[idx];
	    idx += 1;
	  }
	  idx = 0;
	  while (idx < len2) {
	    result[result.length] = set2[idx];
	    idx += 1;
	  }
	  return result;
	};


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var _arity = __webpack_require__(18);
	var _curry1 = __webpack_require__(7);
	var map = __webpack_require__(9);
	var max = __webpack_require__(58);
	var reduce = __webpack_require__(43);
	
	
	/**
	 * Returns a function, `fn`, which encapsulates if/else-if/else logic.
	 * `R.cond` takes a list of [predicate, transform] pairs. All of the arguments
	 * to `fn` are applied to each of the predicates in turn until one returns a
	 * "truthy" value, at which point `fn` returns the result of applying its
	 * arguments to the corresponding transformer. If none of the predicates
	 * matches, `fn` returns undefined.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.6.0
	 * @category Logic
	 * @sig [[(*... -> Boolean),(*... -> *)]] -> (*... -> *)
	 * @param {Array} pairs
	 * @return {Function}
	 * @example
	 *
	 *      var fn = R.cond([
	 *        [R.equals(0),   R.always('water freezes at 0°C')],
	 *        [R.equals(100), R.always('water boils at 100°C')],
	 *        [R.T,           temp => 'nothing special happens at ' + temp + '°C']
	 *      ]);
	 *      fn(0); //=> 'water freezes at 0°C'
	 *      fn(50); //=> 'nothing special happens at 50°C'
	 *      fn(100); //=> 'water boils at 100°C'
	 */
	module.exports = _curry1(function cond(pairs) {
	  var arity = reduce(max,
	                     0,
	                     map(function(pair) { return pair[0].length; }, pairs));
	  return _arity(arity, function() {
	    var idx = 0;
	    while (idx < pairs.length) {
	      if (pairs[idx][0].apply(this, arguments)) {
	        return pairs[idx][1].apply(this, arguments);
	      }
	      idx += 1;
	    }
	  });
	});


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var _curry2 = __webpack_require__(6);
	
	
	/**
	 * Returns the larger of its two arguments.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.1.0
	 * @category Relation
	 * @sig Ord a => a -> a -> a
	 * @param {*} a
	 * @param {*} b
	 * @return {*}
	 * @see R.maxBy, R.min
	 * @example
	 *
	 *      R.max(789, 123); //=> 789
	 *      R.max('a', 'b'); //=> 'b'
	 */
	module.exports = _curry2(function max(a, b) { return b > a ? b : a; });


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _merge = __webpack_require__(2);
	
	var _merge2 = _interopRequireDefault(_merge);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Creates an object with
	 * the `encryption_key` from
	 * the supplied `options` param
	 *
	 * @param {any} options
	 * @returns {Object} an object containing
	 *                   a body property with
	 *                   the desired `encryption_key`
	 * @private
	 */
	function execute(opts) {
	  var encryption_key = opts.encryption_key;
	
	  var body = {
	    body: {
	      encryption_key: encryption_key
	    }
	  };
	  return (0, _merge2.default)(body, opts.options);
	}
	
	/**
	 * Returns the supplied parameter with
	 * the `execute` function added to it.
	 *
	 * @param {any} options
	 * @returns {Object} The `options` parameter
	 *                   with `execute` add to it
	 * @private
	 */
	/**
	 * @name encryption
	 * @memberof strategies
	 * @private
	 */
	function build(options) {
	  return (0, _merge2.default)(options, { execute: execute.bind(null, options) });
	}
	
	exports.default = {
	  build: build
	};
	module.exports = exports['default'];

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _merge = __webpack_require__(2);
	
	var _merge2 = _interopRequireDefault(_merge);
	
	var _objOf = __webpack_require__(49);
	
	var _objOf2 = _interopRequireDefault(_objOf);
	
	var _pick = __webpack_require__(61);
	
	var _pick2 = _interopRequireDefault(_pick);
	
	var _session = __webpack_require__(62);
	
	var _session2 = _interopRequireDefault(_session);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Creates a session in the server
	 * and returns a Promise with the
	 * pertinent object.
	 *
	 * @param {any} { email, password }
	 * @returns {Promise} Resolves to an object
	 *                    containing a body with
	 *                    the desired `session_id`
	 * @private
	 */
	/**
	 * @name login
	 * @memberof strategies
	 * @private
	 */
	function execute(_ref) {
	  var email = _ref.email,
	      password = _ref.password;
	
	  return _session2.default.create({}, email, password).then((0, _pick2.default)(['session_id'])).then((0, _objOf2.default)('body'));
	}
	
	/**
	 * Returns the supplied parameter with
	 * the `execute` function added to it.
	 *
	 * @param {any} options
	 * @returns {Object} The `options` parameter
	 *                   with `execute` add to it
	 * @private
	 */
	function build(options) {
	  return (0, _merge2.default)(options, { execute: execute.bind(null, options) });
	}
	
	exports.default = { build: build };
	module.exports = exports['default'];

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var _curry2 = __webpack_require__(6);
	
	
	/**
	 * Returns a partial copy of an object containing only the keys specified. If
	 * the key does not exist, the property is ignored.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.1.0
	 * @category Object
	 * @sig [k] -> {k: v} -> {k: v}
	 * @param {Array} names an array of String property names to copy onto a new object
	 * @param {Object} obj The object to copy from
	 * @return {Object} A new object with only properties from `names` on it.
	 * @see R.omit, R.props
	 * @example
	 *
	 *      R.pick(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1, d: 4}
	 *      R.pick(['a', 'e', 'f'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1}
	 */
	module.exports = _curry2(function pick(names, obj) {
	  var result = {};
	  var idx = 0;
	  while (idx < names.length) {
	    if (names[idx] in obj) {
	      result[names[idx]] = obj[names[idx]];
	    }
	    idx += 1;
	  }
	  return result;
	});


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _routes = __webpack_require__(63);
	
	var _routes2 = _interopRequireDefault(_routes);
	
	var _request = __webpack_require__(64);
	
	var _request2 = _interopRequireDefault(_request);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * `POST /sessions`
	 * Creates a session from the given payload.
	 *
	 * @param {Object} opts An options params which
	 *                      is usually already bound
	 *                      by `connect` functions.
	 * @param {String} email The account's email
	 *
	 * @param {String} password The account's password
	 *
	 * @returns {Promise} Resolves to the result of
	 *                    the request or to an error.
	 */
	/**
	 * @name Session
	 * @description This module exposes functions
	 *              related to the `/sessions` path.
	 *
	 * @module session
	 **/
	
	var create = function create(opts, email, password) {
	  return _request2.default.post(opts, _routes2.default.session.base, { email: email, password: password });
	};
	
	/**
	 * `DELETE /sessions/:id`
	 *
	 * Deletes the session with the given ID
	 *
	 * @param {Object} opts An options params which
	 *                      is usually already bound
	 *                      by `connect` functions.
	 * @param {String} id The session's id
	 *
	 * @returns {Promise} Resolves to the result of
	 *                    the request or to an error.
	 */
	var destroy = function destroy(opts, id) {
	  return _request2.default.delete(opts, _routes2.default.session.destroy(id), {});
	};
	
	/**
	 * `POST /sessions/:id/verify`
	 * Verifies a session's password' from the given
	 * session_id and possible password.
	 *
	 * @example
	 * client.session.verify({ id: sessionId, password: pwd})
	 *
	 * @param {Object} opts An options params which
	 *                      is usually already bound
	 *                      by `connect` functions.
	 * @param {String} payload The payload to be sent
	 *
	 * @returns {Promise} Resolves to the result of
	 *                    the request or to an error.
	 */
	var verify = function verify(opts, payload) {
	  return _request2.default.post(opts, _routes2.default.session.verify(payload.id), payload);
	};
	
	exports.default = {
	  create: create,
	  destroy: destroy,
	  verify: verify
	};
	module.exports = exports['default'];

/***/ },
/* 63 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var base = 'https://api.pagar.me:443/1';
	
	var session = {
	  base: '/sessions',
	  destroy: function destroy(id) {
	    return '/sessions/' + id;
	  },
	  verify: function verify(id) {
	    return '/sessions/' + id + '/verify';
	  }
	};
	
	var transactions = {
	  base: '/transactions',
	  cardHashKey: '/transactions/card_hash_key',
	  calculateInstallmentsAmount: '/transactions/calculate_installments_amount',
	  details: function details(id) {
	    return '/transactions/' + id;
	  },
	  refund: function refund(id) {
	    return '/transactions/' + id + '/refund';
	  },
	  capture: function capture(id) {
	    return '/transactions/' + id + '/capture';
	  },
	  collectPayment: function collectPayment(id) {
	    return '/transactions/' + id + '/collect_payment';
	  },
	  antifraudAnalyses: {
	    findAll: function findAll(id) {
	      return '/transactions/' + id + '/antifraud_analyses';
	    },
	    find: function find(id, antifraudId) {
	      return '/transactions/' + id + '/antifraud_analyses/' + antifraudId;
	    }
	  }
	};
	
	var payables = {
	  base: '/payables',
	  transaction: function transaction(transactionId) {
	    return '/transactions/' + transactionId + '/payables';
	  },
	  find: function find(id) {
	    return '/payables/' + id;
	  }
	};
	
	var invites = {
	  base: '/invites',
	  details: function details(id) {
	    return '/invites/' + id;
	  }
	};
	
	var recipients = {
	  base: '/recipients',
	  details: function details(id) {
	    return '/recipients/' + id;
	  }
	};
	
	var bulkAnticipations = {
	  base: function base(recipientId) {
	    return '/recipients/' + recipientId + '/bulk_anticipations';
	  },
	  details: function details(recipientId, id) {
	    return '/recipients/' + recipientId + '/bulk_anticipations/' + id;
	  },
	  limits: function limits(recipientId) {
	    return '/recipients/' + recipientId + '/bulk_anticipations/limits';
	  },
	  days: function days(recipientId, id) {
	    return '/recipients/' + recipientId + '/bulk_anticipations/' + id + '/days';
	  },
	  confirm: function confirm(recipientId, id) {
	    return '/recipients/' + recipientId + '/bulk_anticipations/' + id + '/confirm';
	  },
	  cancel: function cancel(recipientId, id) {
	    return '/recipients/' + recipientId + '/bulk_anticipations/' + id + '/cancel';
	  }
	};
	
	var search = '/search';
	
	var user = {
	  base: '/users',
	  resetPassword: '/users/reset_password',
	  redefinePassword: '/users/redefine_password',
	  details: function details(id) {
	    return '/users/' + id;
	  },
	  updatePassword: function updatePassword(id) {
	    return '/users/' + id + '/update_password';
	  },
	  singular: '/user'
	};
	
	var company = {
	  basePlural: '/companies',
	  base: '/company',
	  temporary: '/companies/temporary',
	  activate: '/companies/activate',
	  resetKeys: '/company/reset_keys',
	  affiliationProgress: '/company/affiliation_progress',
	  branding: function branding(id) {
	    return '/company/branding/' + id;
	  },
	  emailTemplates: function emailTemplates(id) {
	    return '/company/email_templates/' + id;
	  }
	};
	
	var splitRules = {
	  findAll: function findAll(transactionId) {
	    return '/transactions/' + transactionId + '/split_rules';
	  },
	  find: function find(transactionId, splitId) {
	    return '/transactions/' + transactionId + '/split_rules/' + splitId;
	  }
	};
	
	var antifraudAnalyses = {
	  findAll: function findAll(transactionId) {
	    return '/transactions/' + transactionId + '/antifraud_analyses';
	  },
	  find: function find(transactionId, antifraudId) {
	    return '/transactions/' + transactionId + '/antifraud_analyses/' + antifraudId;
	  }
	};
	
	var bankAccounts = {
	  base: '/bank_accounts',
	  details: function details(id) {
	    return '/bank_accounts/' + id;
	  }
	};
	
	var plans = {
	  base: '/plans',
	  details: function details(id) {
	    return '/plans/' + id;
	  }
	};
	
	var acquirersConfigurations = {
	  base: '/acquirers_configurations',
	  details: function details(id) {
	    return '/acquirers_configuration/' + id;
	  }
	};
	
	var acquirers = {
	  base: '/acquirers',
	  details: function details(id) {
	    return '/acquirer/' + id;
	  }
	};
	
	var subscriptions = {
	  base: '/subscriptions',
	  details: function details(id) {
	    return '/subscriptions/' + id;
	  },
	  cancel: function cancel(id) {
	    return '/subscriptions/' + id + '/cancel';
	  },
	  transactions: function transactions(id) {
	    return '/subscriptions/' + id + '/transactions';
	  }
	};
	
	var cards = {
	  base: '/cards',
	  details: function details(id) {
	    return '/cards/' + id;
	  }
	};
	
	var transfers = {
	  base: '/transfers',
	  details: function details(id) {
	    return '/transfers/' + id;
	  },
	  days: '/transfers/days',
	  limits: '/transfers/limits',
	  cancel: function cancel(id) {
	    return '/transfers/' + id + '/cancel';
	  }
	};
	
	var balance = {
	  base: '/balance',
	  recipient: function recipient(id) {
	    return '/recipients/' + id + '/balance';
	  }
	};
	
	var balanceOperations = {
	  base: '/balance/operations',
	  days: '/balance/operations/days',
	  details: function details(id) {
	    return '/balance/operations/' + id;
	  },
	  recipients: {
	    findAll: function findAll(recipientId) {
	      return '/recipients/' + recipientId + '/balance/operations';
	    },
	    find: function find(id, recipientId) {
	      return '/recipients/' + recipientId + '/balance/operations/' + id;
	    },
	    findWithFormat: function findWithFormat(recipientId, format) {
	      return '/recipients/' + recipientId + '/balance/operations.' + format;
	    }
	  }
	};
	
	var events = {
	  base: '/events',
	  transaction: function transaction(transactionId) {
	    return '/transactions/' + transactionId + '/events';
	  },
	  transactionDetails: function transactionDetails(id, transactionId) {
	    return '/transactions/' + transactionId + '/events/' + id;
	  },
	  subscription: function subscription(subscriptionId) {
	    return '/subscriptions/' + subscriptionId + '/events';
	  },
	  subscriptionDetails: function subscriptionDetails(id, subscriptionId) {
	    return '/subscriptions/' + subscriptionId + '/events/' + id;
	  }
	};
	
	var gatewayOperations = {
	  transaction: function transaction(transactionId) {
	    return '/transactions/' + transactionId + '/gateway_operations';
	  },
	  transactionDetails: function transactionDetails(id, transactionId) {
	    return '/transactions/' + transactionId + '/gateway_operations/' + id;
	  },
	  subscription: function subscription(subscriptionId) {
	    return '/subscriptions/' + subscriptionId + '/gateway_operations';
	  },
	  refuseMessage: function refuseMessage(subscriptionId, id) {
	    return '/subscriptions/' + subscriptionId + '/gateway_operations/' + id + '/refuse_message';
	  }
	};
	
	var postbacks = {
	  transaction: function transaction(transactionId) {
	    return '/transactions/' + transactionId + '/postbacks';
	  },
	  transactionDetails: function transactionDetails(id, transactionId) {
	    return '/transactions/' + transactionId + '/postbacks/' + id;
	  },
	  subscription: function subscription(subscriptionId) {
	    return '/subscriptions/' + subscriptionId + '/postbacks';
	  },
	  redeliver: function redeliver(subscriptionId, id) {
	    return '/subscriptions/' + subscriptionId + '/postbacks/' + id + '/redeliver';
	  }
	};
	
	var customers = {
	  base: '/customers',
	  details: function details(id) {
	    return '/customers/' + id;
	  }
	};
	
	exports.default = {
	  acquirers: acquirers,
	  acquirersConfigurations: acquirersConfigurations,
	  antifraudAnalyses: antifraudAnalyses,
	  balance: balance,
	  balanceOperations: balanceOperations,
	  bankAccounts: bankAccounts,
	  base: base,
	  bulkAnticipations: bulkAnticipations,
	  cards: cards,
	  company: company,
	  events: events,
	  gatewayOperations: gatewayOperations,
	  invites: invites,
	  payables: payables,
	  plans: plans,
	  postbacks: postbacks,
	  recipients: recipients,
	  search: search,
	  session: session,
	  splitRules: splitRules,
	  subscriptions: subscriptions,
	  transactions: transactions,
	  transfers: transfers,
	  user: user,
	  customers: customers
	};
	module.exports = exports['default'];

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _keys = __webpack_require__(25);
	
	var _keys2 = _interopRequireDefault(_keys);
	
	var _length = __webpack_require__(65);
	
	var _length2 = _interopRequireDefault(_length);
	
	var _merge = __webpack_require__(2);
	
	var _merge2 = _interopRequireDefault(_merge);
	
	var _bluebird = __webpack_require__(67);
	
	var _bluebird2 = _interopRequireDefault(_bluebird);
	
	var _nodeFetch = __webpack_require__(103);
	
	var _nodeFetch2 = _interopRequireDefault(_nodeFetch);
	
	var _qs = __webpack_require__(142);
	
	var _qs2 = _interopRequireDefault(_qs);
	
	var _routes = __webpack_require__(63);
	
	var _routes2 = _interopRequireDefault(_routes);
	
	var _errors = __webpack_require__(147);
	
	var _errors2 = _interopRequireDefault(_errors);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var defaultHeaders = {
	  'Content-Type': 'application/json'
	};
	
	/**
	 * This method builds the final method, body and headers
	 * that will be used in `fetch`.
	 *
	 * @param {String} method
	 * @param {String} endpoint
	 * @param {Object} options
	 * @param {Object} data
	 * @returns {Object} An object containing a URL property
	 *                   and an object in the form of
	 *                   `{ method, body, headers }`
	 * @private
	 */
	/**
	 * @name Request
	 * @description This module handles the HTTP requests to Pagar.me's API.  '
	 *              It exports GET, PUT, POST, DELETE functions based upon
	 *              the `fetch` module.
	 *
	 * @module request
	 * @private
	 */
	
	function buildRequestParams(method, endpoint, options, data) {
	  var query = '';
	  var body = '';
	  var headers = options.headers || {};
	
	  var payload = (0, _merge2.default)(options.body || {}, data || {});
	
	  var queries = options.qs || {};
	
	  if ((0, _length2.default)((0, _keys2.default)(queries))) {
	    query = '' + _qs2.default.stringify(queries);
	  }
	
	  var isPayloadValid = (0, _length2.default)((0, _keys2.default)(payload)) > 0;
	
	  var shouldStringifyPayload = ['GET', 'HEAD', 'PUT'].includes(method);
	
	  var requestHasBody = !['GET', 'HEAD'].includes(method);
	
	  if (isPayloadValid) {
	    if (shouldStringifyPayload) {
	      query += '' + (query ? '&' : '') + _qs2.default.stringify(payload, { encode: false });
	    }
	    if (requestHasBody) {
	      body = JSON.stringify(payload);
	      headers = (0, _merge2.default)(headers, defaultHeaders);
	    }
	  }
	
	  var url = '' + endpoint + (query ? '?' + query : '');
	
	  return { url: url, params: { method: method, body: body, headers: headers } };
	}
	
	/**
	 * This function handles the request erros,
	 * returning a Promise that will reject to
	 * a custom ApiError with a relevant message.
	 *
	 * @param {Object} response
	 * @returns {Promise} A Promise rejection with a
	 *                    Server Error message or the
	 *                    error response body
	 * @private
	 */
	function handleError(response) {
	  if (response.status === 500) {
	    return _bluebird2.default.reject(new _errors2.default({
	      errors: [{ message: 'Pagar.me server error' }]
	    }));
	  }
	
	  return response.json().then(function (body) {
	    return _bluebird2.default.reject(new _errors2.default(body));
	  });
	}
	
	/**
	 * This simple function handles the result of a
	 * request, returning either a JSON response
	 * or forwarding the error handling to another
	 * function.
	 *
	 * @param {Object} response
	 * @returns {Promise} A promise that will either
	 *                    resolve to the Response JSON
	 *                    conversion or further the chain to
	 *                    [handleError]{@link handleError}
	 * @private
	 */
	function handleResult(response) {
	  if (response.ok) {
	    return response.json();
	  }
	
	  return handleError(response);
	}
	
	/**
	 * This function returns a new function,
	 * created from the supplied `method`.
	 * The returned function uses
	 * [buildRequestParams]{@link buildRequestParams}
	 * to define the request's URL, headers and body.
	 *
	 * @param {String} method
	 * @returns {Function} A `request` function that
	 *                     will return a Promise with
	 *                     the server response
	 * @private
	 */
	function buildRequest(method) {
	  return function request() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    var path = arguments[1];
	    var body = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	
	    var endpoint = (options.baseURL || _routes2.default.base) + path;
	
	    var _buildRequestParams = buildRequestParams(method, endpoint, options, body),
	        url = _buildRequestParams.url,
	        params = _buildRequestParams.params;
	
	    return (0, _nodeFetch2.default)(url, params).then(handleResult);
	  };
	}
	
	exports.default = {
	  get: buildRequest('GET'),
	  put: buildRequest('PUT'),
	  post: buildRequest('POST'),
	  delete: buildRequest('DELETE')
	};
	module.exports = exports['default'];

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var _curry1 = __webpack_require__(7);
	var _isNumber = __webpack_require__(66);
	
	
	/**
	 * Returns the number of elements in the array by returning `list.length`.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.3.0
	 * @category List
	 * @sig [a] -> Number
	 * @param {Array} list The array to inspect.
	 * @return {Number} The length of the array.
	 * @example
	 *
	 *      R.length([]); //=> 0
	 *      R.length([1, 2, 3]); //=> 3
	 */
	module.exports = _curry1(function length(list) {
	  return list != null && _isNumber(list.length) ? list.length : NaN;
	});


/***/ },
/* 66 */
/***/ function(module, exports) {

	module.exports = function _isNumber(x) {
	  return Object.prototype.toString.call(x) === '[object Number]';
	};


/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var old;
	if (typeof Promise !== "undefined") old = Promise;
	function noConflict() {
	    try { if (Promise === bluebird) Promise = old; }
	    catch (e) {}
	    return bluebird;
	}
	var bluebird = __webpack_require__(68)();
	bluebird.noConflict = noConflict;
	module.exports = bluebird;


/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports = function() {
	var makeSelfResolutionError = function () {
	    return new TypeError("circular promise resolution chain\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
	};
	var reflectHandler = function() {
	    return new Promise.PromiseInspection(this._target());
	};
	var apiRejection = function(msg) {
	    return Promise.reject(new TypeError(msg));
	};
	function Proxyable() {}
	var UNDEFINED_BINDING = {};
	var util = __webpack_require__(69);
	
	var getDomain;
	if (util.isNode) {
	    getDomain = function() {
	        var ret = process.domain;
	        if (ret === undefined) ret = null;
	        return ret;
	    };
	} else {
	    getDomain = function() {
	        return null;
	    };
	}
	util.notEnumerableProp(Promise, "_getDomain", getDomain);
	
	var es5 = __webpack_require__(70);
	var Async = __webpack_require__(71);
	var async = new Async();
	es5.defineProperty(Promise, "_async", {value: async});
	var errors = __webpack_require__(74);
	var TypeError = Promise.TypeError = errors.TypeError;
	Promise.RangeError = errors.RangeError;
	var CancellationError = Promise.CancellationError = errors.CancellationError;
	Promise.TimeoutError = errors.TimeoutError;
	Promise.OperationalError = errors.OperationalError;
	Promise.RejectionError = errors.OperationalError;
	Promise.AggregateError = errors.AggregateError;
	var INTERNAL = function(){};
	var APPLY = {};
	var NEXT_FILTER = {};
	var tryConvertToPromise = __webpack_require__(75)(Promise, INTERNAL);
	var PromiseArray =
	    __webpack_require__(76)(Promise, INTERNAL,
	                               tryConvertToPromise, apiRejection, Proxyable);
	var Context = __webpack_require__(77)(Promise);
	 /*jshint unused:false*/
	var createContext = Context.create;
	var debug = __webpack_require__(78)(Promise, Context);
	var CapturedTrace = debug.CapturedTrace;
	var PassThroughHandlerContext =
	    __webpack_require__(79)(Promise, tryConvertToPromise);
	var catchFilter = __webpack_require__(80)(NEXT_FILTER);
	var nodebackForPromise = __webpack_require__(81);
	var errorObj = util.errorObj;
	var tryCatch = util.tryCatch;
	function check(self, executor) {
	    if (typeof executor !== "function") {
	        throw new TypeError("expecting a function but got " + util.classString(executor));
	    }
	    if (self.constructor !== Promise) {
	        throw new TypeError("the promise constructor cannot be invoked directly\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
	    }
	}
	
	function Promise(executor) {
	    this._bitField = 0;
	    this._fulfillmentHandler0 = undefined;
	    this._rejectionHandler0 = undefined;
	    this._promise0 = undefined;
	    this._receiver0 = undefined;
	    if (executor !== INTERNAL) {
	        check(this, executor);
	        this._resolveFromExecutor(executor);
	    }
	    this._promiseCreated();
	    this._fireEvent("promiseCreated", this);
	}
	
	Promise.prototype.toString = function () {
	    return "[object Promise]";
	};
	
	Promise.prototype.caught = Promise.prototype["catch"] = function (fn) {
	    var len = arguments.length;
	    if (len > 1) {
	        var catchInstances = new Array(len - 1),
	            j = 0, i;
	        for (i = 0; i < len - 1; ++i) {
	            var item = arguments[i];
	            if (util.isObject(item)) {
	                catchInstances[j++] = item;
	            } else {
	                return apiRejection("expecting an object but got " +
	                    "A catch statement predicate " + util.classString(item));
	            }
	        }
	        catchInstances.length = j;
	        fn = arguments[i];
	        return this.then(undefined, catchFilter(catchInstances, fn, this));
	    }
	    return this.then(undefined, fn);
	};
	
	Promise.prototype.reflect = function () {
	    return this._then(reflectHandler,
	        reflectHandler, undefined, this, undefined);
	};
	
	Promise.prototype.then = function (didFulfill, didReject) {
	    if (debug.warnings() && arguments.length > 0 &&
	        typeof didFulfill !== "function" &&
	        typeof didReject !== "function") {
	        var msg = ".then() only accepts functions but was passed: " +
	                util.classString(didFulfill);
	        if (arguments.length > 1) {
	            msg += ", " + util.classString(didReject);
	        }
	        this._warn(msg);
	    }
	    return this._then(didFulfill, didReject, undefined, undefined, undefined);
	};
	
	Promise.prototype.done = function (didFulfill, didReject) {
	    var promise =
	        this._then(didFulfill, didReject, undefined, undefined, undefined);
	    promise._setIsFinal();
	};
	
	Promise.prototype.spread = function (fn) {
	    if (typeof fn !== "function") {
	        return apiRejection("expecting a function but got " + util.classString(fn));
	    }
	    return this.all()._then(fn, undefined, undefined, APPLY, undefined);
	};
	
	Promise.prototype.toJSON = function () {
	    var ret = {
	        isFulfilled: false,
	        isRejected: false,
	        fulfillmentValue: undefined,
	        rejectionReason: undefined
	    };
	    if (this.isFulfilled()) {
	        ret.fulfillmentValue = this.value();
	        ret.isFulfilled = true;
	    } else if (this.isRejected()) {
	        ret.rejectionReason = this.reason();
	        ret.isRejected = true;
	    }
	    return ret;
	};
	
	Promise.prototype.all = function () {
	    if (arguments.length > 0) {
	        this._warn(".all() was passed arguments but it does not take any");
	    }
	    return new PromiseArray(this).promise();
	};
	
	Promise.prototype.error = function (fn) {
	    return this.caught(util.originatesFromRejection, fn);
	};
	
	Promise.getNewLibraryCopy = module.exports;
	
	Promise.is = function (val) {
	    return val instanceof Promise;
	};
	
	Promise.fromNode = Promise.fromCallback = function(fn) {
	    var ret = new Promise(INTERNAL);
	    ret._captureStackTrace();
	    var multiArgs = arguments.length > 1 ? !!Object(arguments[1]).multiArgs
	                                         : false;
	    var result = tryCatch(fn)(nodebackForPromise(ret, multiArgs));
	    if (result === errorObj) {
	        ret._rejectCallback(result.e, true);
	    }
	    if (!ret._isFateSealed()) ret._setAsyncGuaranteed();
	    return ret;
	};
	
	Promise.all = function (promises) {
	    return new PromiseArray(promises).promise();
	};
	
	Promise.cast = function (obj) {
	    var ret = tryConvertToPromise(obj);
	    if (!(ret instanceof Promise)) {
	        ret = new Promise(INTERNAL);
	        ret._captureStackTrace();
	        ret._setFulfilled();
	        ret._rejectionHandler0 = obj;
	    }
	    return ret;
	};
	
	Promise.resolve = Promise.fulfilled = Promise.cast;
	
	Promise.reject = Promise.rejected = function (reason) {
	    var ret = new Promise(INTERNAL);
	    ret._captureStackTrace();
	    ret._rejectCallback(reason, true);
	    return ret;
	};
	
	Promise.setScheduler = function(fn) {
	    if (typeof fn !== "function") {
	        throw new TypeError("expecting a function but got " + util.classString(fn));
	    }
	    return async.setScheduler(fn);
	};
	
	Promise.prototype._then = function (
	    didFulfill,
	    didReject,
	    _,    receiver,
	    internalData
	) {
	    var haveInternalData = internalData !== undefined;
	    var promise = haveInternalData ? internalData : new Promise(INTERNAL);
	    var target = this._target();
	    var bitField = target._bitField;
	
	    if (!haveInternalData) {
	        promise._propagateFrom(this, 3);
	        promise._captureStackTrace();
	        if (receiver === undefined &&
	            ((this._bitField & 2097152) !== 0)) {
	            if (!((bitField & 50397184) === 0)) {
	                receiver = this._boundValue();
	            } else {
	                receiver = target === this ? undefined : this._boundTo;
	            }
	        }
	        this._fireEvent("promiseChained", this, promise);
	    }
	
	    var domain = getDomain();
	    if (!((bitField & 50397184) === 0)) {
	        var handler, value, settler = target._settlePromiseCtx;
	        if (((bitField & 33554432) !== 0)) {
	            value = target._rejectionHandler0;
	            handler = didFulfill;
	        } else if (((bitField & 16777216) !== 0)) {
	            value = target._fulfillmentHandler0;
	            handler = didReject;
	            target._unsetRejectionIsUnhandled();
	        } else {
	            settler = target._settlePromiseLateCancellationObserver;
	            value = new CancellationError("late cancellation observer");
	            target._attachExtraTrace(value);
	            handler = didReject;
	        }
	
	        async.invoke(settler, target, {
	            handler: domain === null ? handler
	                : (typeof handler === "function" &&
	                    util.domainBind(domain, handler)),
	            promise: promise,
	            receiver: receiver,
	            value: value
	        });
	    } else {
	        target._addCallbacks(didFulfill, didReject, promise, receiver, domain);
	    }
	
	    return promise;
	};
	
	Promise.prototype._length = function () {
	    return this._bitField & 65535;
	};
	
	Promise.prototype._isFateSealed = function () {
	    return (this._bitField & 117506048) !== 0;
	};
	
	Promise.prototype._isFollowing = function () {
	    return (this._bitField & 67108864) === 67108864;
	};
	
	Promise.prototype._setLength = function (len) {
	    this._bitField = (this._bitField & -65536) |
	        (len & 65535);
	};
	
	Promise.prototype._setFulfilled = function () {
	    this._bitField = this._bitField | 33554432;
	    this._fireEvent("promiseFulfilled", this);
	};
	
	Promise.prototype._setRejected = function () {
	    this._bitField = this._bitField | 16777216;
	    this._fireEvent("promiseRejected", this);
	};
	
	Promise.prototype._setFollowing = function () {
	    this._bitField = this._bitField | 67108864;
	    this._fireEvent("promiseResolved", this);
	};
	
	Promise.prototype._setIsFinal = function () {
	    this._bitField = this._bitField | 4194304;
	};
	
	Promise.prototype._isFinal = function () {
	    return (this._bitField & 4194304) > 0;
	};
	
	Promise.prototype._unsetCancelled = function() {
	    this._bitField = this._bitField & (~65536);
	};
	
	Promise.prototype._setCancelled = function() {
	    this._bitField = this._bitField | 65536;
	    this._fireEvent("promiseCancelled", this);
	};
	
	Promise.prototype._setWillBeCancelled = function() {
	    this._bitField = this._bitField | 8388608;
	};
	
	Promise.prototype._setAsyncGuaranteed = function() {
	    if (async.hasCustomScheduler()) return;
	    this._bitField = this._bitField | 134217728;
	};
	
	Promise.prototype._receiverAt = function (index) {
	    var ret = index === 0 ? this._receiver0 : this[
	            index * 4 - 4 + 3];
	    if (ret === UNDEFINED_BINDING) {
	        return undefined;
	    } else if (ret === undefined && this._isBound()) {
	        return this._boundValue();
	    }
	    return ret;
	};
	
	Promise.prototype._promiseAt = function (index) {
	    return this[
	            index * 4 - 4 + 2];
	};
	
	Promise.prototype._fulfillmentHandlerAt = function (index) {
	    return this[
	            index * 4 - 4 + 0];
	};
	
	Promise.prototype._rejectionHandlerAt = function (index) {
	    return this[
	            index * 4 - 4 + 1];
	};
	
	Promise.prototype._boundValue = function() {};
	
	Promise.prototype._migrateCallback0 = function (follower) {
	    var bitField = follower._bitField;
	    var fulfill = follower._fulfillmentHandler0;
	    var reject = follower._rejectionHandler0;
	    var promise = follower._promise0;
	    var receiver = follower._receiverAt(0);
	    if (receiver === undefined) receiver = UNDEFINED_BINDING;
	    this._addCallbacks(fulfill, reject, promise, receiver, null);
	};
	
	Promise.prototype._migrateCallbackAt = function (follower, index) {
	    var fulfill = follower._fulfillmentHandlerAt(index);
	    var reject = follower._rejectionHandlerAt(index);
	    var promise = follower._promiseAt(index);
	    var receiver = follower._receiverAt(index);
	    if (receiver === undefined) receiver = UNDEFINED_BINDING;
	    this._addCallbacks(fulfill, reject, promise, receiver, null);
	};
	
	Promise.prototype._addCallbacks = function (
	    fulfill,
	    reject,
	    promise,
	    receiver,
	    domain
	) {
	    var index = this._length();
	
	    if (index >= 65535 - 4) {
	        index = 0;
	        this._setLength(0);
	    }
	
	    if (index === 0) {
	        this._promise0 = promise;
	        this._receiver0 = receiver;
	        if (typeof fulfill === "function") {
	            this._fulfillmentHandler0 =
	                domain === null ? fulfill : util.domainBind(domain, fulfill);
	        }
	        if (typeof reject === "function") {
	            this._rejectionHandler0 =
	                domain === null ? reject : util.domainBind(domain, reject);
	        }
	    } else {
	        var base = index * 4 - 4;
	        this[base + 2] = promise;
	        this[base + 3] = receiver;
	        if (typeof fulfill === "function") {
	            this[base + 0] =
	                domain === null ? fulfill : util.domainBind(domain, fulfill);
	        }
	        if (typeof reject === "function") {
	            this[base + 1] =
	                domain === null ? reject : util.domainBind(domain, reject);
	        }
	    }
	    this._setLength(index + 1);
	    return index;
	};
	
	Promise.prototype._proxy = function (proxyable, arg) {
	    this._addCallbacks(undefined, undefined, arg, proxyable, null);
	};
	
	Promise.prototype._resolveCallback = function(value, shouldBind) {
	    if (((this._bitField & 117506048) !== 0)) return;
	    if (value === this)
	        return this._rejectCallback(makeSelfResolutionError(), false);
	    var maybePromise = tryConvertToPromise(value, this);
	    if (!(maybePromise instanceof Promise)) return this._fulfill(value);
	
	    if (shouldBind) this._propagateFrom(maybePromise, 2);
	
	    var promise = maybePromise._target();
	
	    if (promise === this) {
	        this._reject(makeSelfResolutionError());
	        return;
	    }
	
	    var bitField = promise._bitField;
	    if (((bitField & 50397184) === 0)) {
	        var len = this._length();
	        if (len > 0) promise._migrateCallback0(this);
	        for (var i = 1; i < len; ++i) {
	            promise._migrateCallbackAt(this, i);
	        }
	        this._setFollowing();
	        this._setLength(0);
	        this._setFollowee(promise);
	    } else if (((bitField & 33554432) !== 0)) {
	        this._fulfill(promise._value());
	    } else if (((bitField & 16777216) !== 0)) {
	        this._reject(promise._reason());
	    } else {
	        var reason = new CancellationError("late cancellation observer");
	        promise._attachExtraTrace(reason);
	        this._reject(reason);
	    }
	};
	
	Promise.prototype._rejectCallback =
	function(reason, synchronous, ignoreNonErrorWarnings) {
	    var trace = util.ensureErrorObject(reason);
	    var hasStack = trace === reason;
	    if (!hasStack && !ignoreNonErrorWarnings && debug.warnings()) {
	        var message = "a promise was rejected with a non-error: " +
	            util.classString(reason);
	        this._warn(message, true);
	    }
	    this._attachExtraTrace(trace, synchronous ? hasStack : false);
	    this._reject(reason);
	};
	
	Promise.prototype._resolveFromExecutor = function (executor) {
	    var promise = this;
	    this._captureStackTrace();
	    this._pushContext();
	    var synchronous = true;
	    var r = this._execute(executor, function(value) {
	        promise._resolveCallback(value);
	    }, function (reason) {
	        promise._rejectCallback(reason, synchronous);
	    });
	    synchronous = false;
	    this._popContext();
	
	    if (r !== undefined) {
	        promise._rejectCallback(r, true);
	    }
	};
	
	Promise.prototype._settlePromiseFromHandler = function (
	    handler, receiver, value, promise
	) {
	    var bitField = promise._bitField;
	    if (((bitField & 65536) !== 0)) return;
	    promise._pushContext();
	    var x;
	    if (receiver === APPLY) {
	        if (!value || typeof value.length !== "number") {
	            x = errorObj;
	            x.e = new TypeError("cannot .spread() a non-array: " +
	                                    util.classString(value));
	        } else {
	            x = tryCatch(handler).apply(this._boundValue(), value);
	        }
	    } else {
	        x = tryCatch(handler).call(receiver, value);
	    }
	    var promiseCreated = promise._popContext();
	    bitField = promise._bitField;
	    if (((bitField & 65536) !== 0)) return;
	
	    if (x === NEXT_FILTER) {
	        promise._reject(value);
	    } else if (x === errorObj) {
	        promise._rejectCallback(x.e, false);
	    } else {
	        debug.checkForgottenReturns(x, promiseCreated, "",  promise, this);
	        promise._resolveCallback(x);
	    }
	};
	
	Promise.prototype._target = function() {
	    var ret = this;
	    while (ret._isFollowing()) ret = ret._followee();
	    return ret;
	};
	
	Promise.prototype._followee = function() {
	    return this._rejectionHandler0;
	};
	
	Promise.prototype._setFollowee = function(promise) {
	    this._rejectionHandler0 = promise;
	};
	
	Promise.prototype._settlePromise = function(promise, handler, receiver, value) {
	    var isPromise = promise instanceof Promise;
	    var bitField = this._bitField;
	    var asyncGuaranteed = ((bitField & 134217728) !== 0);
	    if (((bitField & 65536) !== 0)) {
	        if (isPromise) promise._invokeInternalOnCancel();
	
	        if (receiver instanceof PassThroughHandlerContext &&
	            receiver.isFinallyHandler()) {
	            receiver.cancelPromise = promise;
	            if (tryCatch(handler).call(receiver, value) === errorObj) {
	                promise._reject(errorObj.e);
	            }
	        } else if (handler === reflectHandler) {
	            promise._fulfill(reflectHandler.call(receiver));
	        } else if (receiver instanceof Proxyable) {
	            receiver._promiseCancelled(promise);
	        } else if (isPromise || promise instanceof PromiseArray) {
	            promise._cancel();
	        } else {
	            receiver.cancel();
	        }
	    } else if (typeof handler === "function") {
	        if (!isPromise) {
	            handler.call(receiver, value, promise);
	        } else {
	            if (asyncGuaranteed) promise._setAsyncGuaranteed();
	            this._settlePromiseFromHandler(handler, receiver, value, promise);
	        }
	    } else if (receiver instanceof Proxyable) {
	        if (!receiver._isResolved()) {
	            if (((bitField & 33554432) !== 0)) {
	                receiver._promiseFulfilled(value, promise);
	            } else {
	                receiver._promiseRejected(value, promise);
	            }
	        }
	    } else if (isPromise) {
	        if (asyncGuaranteed) promise._setAsyncGuaranteed();
	        if (((bitField & 33554432) !== 0)) {
	            promise._fulfill(value);
	        } else {
	            promise._reject(value);
	        }
	    }
	};
	
	Promise.prototype._settlePromiseLateCancellationObserver = function(ctx) {
	    var handler = ctx.handler;
	    var promise = ctx.promise;
	    var receiver = ctx.receiver;
	    var value = ctx.value;
	    if (typeof handler === "function") {
	        if (!(promise instanceof Promise)) {
	            handler.call(receiver, value, promise);
	        } else {
	            this._settlePromiseFromHandler(handler, receiver, value, promise);
	        }
	    } else if (promise instanceof Promise) {
	        promise._reject(value);
	    }
	};
	
	Promise.prototype._settlePromiseCtx = function(ctx) {
	    this._settlePromise(ctx.promise, ctx.handler, ctx.receiver, ctx.value);
	};
	
	Promise.prototype._settlePromise0 = function(handler, value, bitField) {
	    var promise = this._promise0;
	    var receiver = this._receiverAt(0);
	    this._promise0 = undefined;
	    this._receiver0 = undefined;
	    this._settlePromise(promise, handler, receiver, value);
	};
	
	Promise.prototype._clearCallbackDataAtIndex = function(index) {
	    var base = index * 4 - 4;
	    this[base + 2] =
	    this[base + 3] =
	    this[base + 0] =
	    this[base + 1] = undefined;
	};
	
	Promise.prototype._fulfill = function (value) {
	    var bitField = this._bitField;
	    if (((bitField & 117506048) >>> 16)) return;
	    if (value === this) {
	        var err = makeSelfResolutionError();
	        this._attachExtraTrace(err);
	        return this._reject(err);
	    }
	    this._setFulfilled();
	    this._rejectionHandler0 = value;
	
	    if ((bitField & 65535) > 0) {
	        if (((bitField & 134217728) !== 0)) {
	            this._settlePromises();
	        } else {
	            async.settlePromises(this);
	        }
	    }
	};
	
	Promise.prototype._reject = function (reason) {
	    var bitField = this._bitField;
	    if (((bitField & 117506048) >>> 16)) return;
	    this._setRejected();
	    this._fulfillmentHandler0 = reason;
	
	    if (this._isFinal()) {
	        return async.fatalError(reason, util.isNode);
	    }
	
	    if ((bitField & 65535) > 0) {
	        async.settlePromises(this);
	    } else {
	        this._ensurePossibleRejectionHandled();
	    }
	};
	
	Promise.prototype._fulfillPromises = function (len, value) {
	    for (var i = 1; i < len; i++) {
	        var handler = this._fulfillmentHandlerAt(i);
	        var promise = this._promiseAt(i);
	        var receiver = this._receiverAt(i);
	        this._clearCallbackDataAtIndex(i);
	        this._settlePromise(promise, handler, receiver, value);
	    }
	};
	
	Promise.prototype._rejectPromises = function (len, reason) {
	    for (var i = 1; i < len; i++) {
	        var handler = this._rejectionHandlerAt(i);
	        var promise = this._promiseAt(i);
	        var receiver = this._receiverAt(i);
	        this._clearCallbackDataAtIndex(i);
	        this._settlePromise(promise, handler, receiver, reason);
	    }
	};
	
	Promise.prototype._settlePromises = function () {
	    var bitField = this._bitField;
	    var len = (bitField & 65535);
	
	    if (len > 0) {
	        if (((bitField & 16842752) !== 0)) {
	            var reason = this._fulfillmentHandler0;
	            this._settlePromise0(this._rejectionHandler0, reason, bitField);
	            this._rejectPromises(len, reason);
	        } else {
	            var value = this._rejectionHandler0;
	            this._settlePromise0(this._fulfillmentHandler0, value, bitField);
	            this._fulfillPromises(len, value);
	        }
	        this._setLength(0);
	    }
	    this._clearCancellationData();
	};
	
	Promise.prototype._settledValue = function() {
	    var bitField = this._bitField;
	    if (((bitField & 33554432) !== 0)) {
	        return this._rejectionHandler0;
	    } else if (((bitField & 16777216) !== 0)) {
	        return this._fulfillmentHandler0;
	    }
	};
	
	function deferResolve(v) {this.promise._resolveCallback(v);}
	function deferReject(v) {this.promise._rejectCallback(v, false);}
	
	Promise.defer = Promise.pending = function() {
	    debug.deprecated("Promise.defer", "new Promise");
	    var promise = new Promise(INTERNAL);
	    return {
	        promise: promise,
	        resolve: deferResolve,
	        reject: deferReject
	    };
	};
	
	util.notEnumerableProp(Promise,
	                       "_makeSelfResolutionError",
	                       makeSelfResolutionError);
	
	__webpack_require__(82)(Promise, INTERNAL, tryConvertToPromise, apiRejection,
	    debug);
	__webpack_require__(83)(Promise, INTERNAL, tryConvertToPromise, debug);
	__webpack_require__(84)(Promise, PromiseArray, apiRejection, debug);
	__webpack_require__(85)(Promise);
	__webpack_require__(86)(Promise);
	__webpack_require__(87)(
	    Promise, PromiseArray, tryConvertToPromise, INTERNAL, async, getDomain);
	Promise.Promise = Promise;
	Promise.version = "3.4.6";
	__webpack_require__(88)(Promise, PromiseArray, apiRejection, tryConvertToPromise, INTERNAL, debug);
	__webpack_require__(89)(Promise);
	__webpack_require__(90)(Promise, apiRejection, tryConvertToPromise, createContext, INTERNAL, debug);
	__webpack_require__(91)(Promise, INTERNAL, debug);
	__webpack_require__(92)(Promise, apiRejection, INTERNAL, tryConvertToPromise, Proxyable, debug);
	__webpack_require__(93)(Promise);
	__webpack_require__(94)(Promise, INTERNAL);
	__webpack_require__(95)(Promise, PromiseArray, tryConvertToPromise, apiRejection);
	__webpack_require__(96)(Promise, INTERNAL, tryConvertToPromise, apiRejection);
	__webpack_require__(97)(Promise, PromiseArray, apiRejection, tryConvertToPromise, INTERNAL, debug);
	__webpack_require__(98)(Promise, PromiseArray, debug);
	__webpack_require__(99)(Promise, PromiseArray, apiRejection);
	__webpack_require__(100)(Promise, INTERNAL);
	__webpack_require__(101)(Promise, INTERNAL);
	__webpack_require__(102)(Promise);
	                                                         
	    util.toFastProperties(Promise);                                          
	    util.toFastProperties(Promise.prototype);                                
	    function fillTypes(value) {                                              
	        var p = new Promise(INTERNAL);                                       
	        p._fulfillmentHandler0 = value;                                      
	        p._rejectionHandler0 = value;                                        
	        p._promise0 = value;                                                 
	        p._receiver0 = value;                                                
	    }                                                                        
	    // Complete slack tracking, opt out of field-type tracking and           
	    // stabilize map                                                         
	    fillTypes({a: 1});                                                       
	    fillTypes({b: 2});                                                       
	    fillTypes({c: 3});                                                       
	    fillTypes(1);                                                            
	    fillTypes(function(){});                                                 
	    fillTypes(undefined);                                                    
	    fillTypes(false);                                                        
	    fillTypes(new Promise(INTERNAL));                                        
	    debug.setBounds(Async.firstLineError, util.lastLineError);               
	    return Promise;                                                          
	
	};


/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var es5 = __webpack_require__(70);
	var canEvaluate = typeof navigator == "undefined";
	
	var errorObj = {e: {}};
	var tryCatchTarget;
	var globalObject = typeof self !== "undefined" ? self :
	    typeof window !== "undefined" ? window :
	    typeof global !== "undefined" ? global :
	    this !== undefined ? this : null;
	
	function tryCatcher() {
	    try {
	        var target = tryCatchTarget;
	        tryCatchTarget = null;
	        return target.apply(this, arguments);
	    } catch (e) {
	        errorObj.e = e;
	        return errorObj;
	    }
	}
	function tryCatch(fn) {
	    tryCatchTarget = fn;
	    return tryCatcher;
	}
	
	var inherits = function(Child, Parent) {
	    var hasProp = {}.hasOwnProperty;
	
	    function T() {
	        this.constructor = Child;
	        this.constructor$ = Parent;
	        for (var propertyName in Parent.prototype) {
	            if (hasProp.call(Parent.prototype, propertyName) &&
	                propertyName.charAt(propertyName.length-1) !== "$"
	           ) {
	                this[propertyName + "$"] = Parent.prototype[propertyName];
	            }
	        }
	    }
	    T.prototype = Parent.prototype;
	    Child.prototype = new T();
	    return Child.prototype;
	};
	
	
	function isPrimitive(val) {
	    return val == null || val === true || val === false ||
	        typeof val === "string" || typeof val === "number";
	
	}
	
	function isObject(value) {
	    return typeof value === "function" ||
	           typeof value === "object" && value !== null;
	}
	
	function maybeWrapAsError(maybeError) {
	    if (!isPrimitive(maybeError)) return maybeError;
	
	    return new Error(safeToString(maybeError));
	}
	
	function withAppended(target, appendee) {
	    var len = target.length;
	    var ret = new Array(len + 1);
	    var i;
	    for (i = 0; i < len; ++i) {
	        ret[i] = target[i];
	    }
	    ret[i] = appendee;
	    return ret;
	}
	
	function getDataPropertyOrDefault(obj, key, defaultValue) {
	    if (es5.isES5) {
	        var desc = Object.getOwnPropertyDescriptor(obj, key);
	
	        if (desc != null) {
	            return desc.get == null && desc.set == null
	                    ? desc.value
	                    : defaultValue;
	        }
	    } else {
	        return {}.hasOwnProperty.call(obj, key) ? obj[key] : undefined;
	    }
	}
	
	function notEnumerableProp(obj, name, value) {
	    if (isPrimitive(obj)) return obj;
	    var descriptor = {
	        value: value,
	        configurable: true,
	        enumerable: false,
	        writable: true
	    };
	    es5.defineProperty(obj, name, descriptor);
	    return obj;
	}
	
	function thrower(r) {
	    throw r;
	}
	
	var inheritedDataKeys = (function() {
	    var excludedPrototypes = [
	        Array.prototype,
	        Object.prototype,
	        Function.prototype
	    ];
	
	    var isExcludedProto = function(val) {
	        for (var i = 0; i < excludedPrototypes.length; ++i) {
	            if (excludedPrototypes[i] === val) {
	                return true;
	            }
	        }
	        return false;
	    };
	
	    if (es5.isES5) {
	        var getKeys = Object.getOwnPropertyNames;
	        return function(obj) {
	            var ret = [];
	            var visitedKeys = Object.create(null);
	            while (obj != null && !isExcludedProto(obj)) {
	                var keys;
	                try {
	                    keys = getKeys(obj);
	                } catch (e) {
	                    return ret;
	                }
	                for (var i = 0; i < keys.length; ++i) {
	                    var key = keys[i];
	                    if (visitedKeys[key]) continue;
	                    visitedKeys[key] = true;
	                    var desc = Object.getOwnPropertyDescriptor(obj, key);
	                    if (desc != null && desc.get == null && desc.set == null) {
	                        ret.push(key);
	                    }
	                }
	                obj = es5.getPrototypeOf(obj);
	            }
	            return ret;
	        };
	    } else {
	        var hasProp = {}.hasOwnProperty;
	        return function(obj) {
	            if (isExcludedProto(obj)) return [];
	            var ret = [];
	
	            /*jshint forin:false */
	            enumeration: for (var key in obj) {
	                if (hasProp.call(obj, key)) {
	                    ret.push(key);
	                } else {
	                    for (var i = 0; i < excludedPrototypes.length; ++i) {
	                        if (hasProp.call(excludedPrototypes[i], key)) {
	                            continue enumeration;
	                        }
	                    }
	                    ret.push(key);
	                }
	            }
	            return ret;
	        };
	    }
	
	})();
	
	var thisAssignmentPattern = /this\s*\.\s*\S+\s*=/;
	function isClass(fn) {
	    try {
	        if (typeof fn === "function") {
	            var keys = es5.names(fn.prototype);
	
	            var hasMethods = es5.isES5 && keys.length > 1;
	            var hasMethodsOtherThanConstructor = keys.length > 0 &&
	                !(keys.length === 1 && keys[0] === "constructor");
	            var hasThisAssignmentAndStaticMethods =
	                thisAssignmentPattern.test(fn + "") && es5.names(fn).length > 0;
	
	            if (hasMethods || hasMethodsOtherThanConstructor ||
	                hasThisAssignmentAndStaticMethods) {
	                return true;
	            }
	        }
	        return false;
	    } catch (e) {
	        return false;
	    }
	}
	
	function toFastProperties(obj) {
	    /*jshint -W027,-W055,-W031*/
	    function FakeConstructor() {}
	    FakeConstructor.prototype = obj;
	    var l = 8;
	    while (l--) new FakeConstructor();
	    return obj;
	    eval(obj);
	}
	
	var rident = /^[a-z$_][a-z$_0-9]*$/i;
	function isIdentifier(str) {
	    return rident.test(str);
	}
	
	function filledRange(count, prefix, suffix) {
	    var ret = new Array(count);
	    for(var i = 0; i < count; ++i) {
	        ret[i] = prefix + i + suffix;
	    }
	    return ret;
	}
	
	function safeToString(obj) {
	    try {
	        return obj + "";
	    } catch (e) {
	        return "[no string representation]";
	    }
	}
	
	function isError(obj) {
	    return obj !== null &&
	           typeof obj === "object" &&
	           typeof obj.message === "string" &&
	           typeof obj.name === "string";
	}
	
	function markAsOriginatingFromRejection(e) {
	    try {
	        notEnumerableProp(e, "isOperational", true);
	    }
	    catch(ignore) {}
	}
	
	function originatesFromRejection(e) {
	    if (e == null) return false;
	    return ((e instanceof Error["__BluebirdErrorTypes__"].OperationalError) ||
	        e["isOperational"] === true);
	}
	
	function canAttachTrace(obj) {
	    return isError(obj) && es5.propertyIsWritable(obj, "stack");
	}
	
	var ensureErrorObject = (function() {
	    if (!("stack" in new Error())) {
	        return function(value) {
	            if (canAttachTrace(value)) return value;
	            try {throw new Error(safeToString(value));}
	            catch(err) {return err;}
	        };
	    } else {
	        return function(value) {
	            if (canAttachTrace(value)) return value;
	            return new Error(safeToString(value));
	        };
	    }
	})();
	
	function classString(obj) {
	    return {}.toString.call(obj);
	}
	
	function copyDescriptors(from, to, filter) {
	    var keys = es5.names(from);
	    for (var i = 0; i < keys.length; ++i) {
	        var key = keys[i];
	        if (filter(key)) {
	            try {
	                es5.defineProperty(to, key, es5.getDescriptor(from, key));
	            } catch (ignore) {}
	        }
	    }
	}
	
	var asArray = function(v) {
	    if (es5.isArray(v)) {
	        return v;
	    }
	    return null;
	};
	
	if (typeof Symbol !== "undefined" && Symbol.iterator) {
	    var ArrayFrom = typeof Array.from === "function" ? function(v) {
	        return Array.from(v);
	    } : function(v) {
	        var ret = [];
	        var it = v[Symbol.iterator]();
	        var itResult;
	        while (!((itResult = it.next()).done)) {
	            ret.push(itResult.value);
	        }
	        return ret;
	    };
	
	    asArray = function(v) {
	        if (es5.isArray(v)) {
	            return v;
	        } else if (v != null && typeof v[Symbol.iterator] === "function") {
	            return ArrayFrom(v);
	        }
	        return null;
	    };
	}
	
	var isNode = typeof process !== "undefined" &&
	        classString(process).toLowerCase() === "[object process]";
	
	function env(key, def) {
	    return isNode ? process.env[key] : def;
	}
	
	function getNativePromise() {
	    if (typeof Promise === "function") {
	        try {
	            var promise = new Promise(function(){});
	            if ({}.toString.call(promise) === "[object Promise]") {
	                return Promise;
	            }
	        } catch (e) {}
	    }
	}
	
	function domainBind(self, cb) {
	    return self.bind(cb);
	}
	
	var ret = {
	    isClass: isClass,
	    isIdentifier: isIdentifier,
	    inheritedDataKeys: inheritedDataKeys,
	    getDataPropertyOrDefault: getDataPropertyOrDefault,
	    thrower: thrower,
	    isArray: es5.isArray,
	    asArray: asArray,
	    notEnumerableProp: notEnumerableProp,
	    isPrimitive: isPrimitive,
	    isObject: isObject,
	    isError: isError,
	    canEvaluate: canEvaluate,
	    errorObj: errorObj,
	    tryCatch: tryCatch,
	    inherits: inherits,
	    withAppended: withAppended,
	    maybeWrapAsError: maybeWrapAsError,
	    toFastProperties: toFastProperties,
	    filledRange: filledRange,
	    toString: safeToString,
	    canAttachTrace: canAttachTrace,
	    ensureErrorObject: ensureErrorObject,
	    originatesFromRejection: originatesFromRejection,
	    markAsOriginatingFromRejection: markAsOriginatingFromRejection,
	    classString: classString,
	    copyDescriptors: copyDescriptors,
	    hasDevTools: typeof chrome !== "undefined" && chrome &&
	                 typeof chrome.loadTimes === "function",
	    isNode: isNode,
	    env: env,
	    global: globalObject,
	    getNativePromise: getNativePromise,
	    domainBind: domainBind
	};
	ret.isRecentNode = ret.isNode && (function() {
	    var version = process.versions.node.split(".").map(Number);
	    return (version[0] === 0 && version[1] > 10) || (version[0] > 0);
	})();
	
	if (ret.isNode) ret.toFastProperties(process);
	
	try {throw new Error(); } catch (e) {ret.lastLineError = e;}
	module.exports = ret;


/***/ },
/* 70 */
/***/ function(module, exports) {

	var isES5 = (function(){
	    "use strict";
	    return this === undefined;
	})();
	
	if (isES5) {
	    module.exports = {
	        freeze: Object.freeze,
	        defineProperty: Object.defineProperty,
	        getDescriptor: Object.getOwnPropertyDescriptor,
	        keys: Object.keys,
	        names: Object.getOwnPropertyNames,
	        getPrototypeOf: Object.getPrototypeOf,
	        isArray: Array.isArray,
	        isES5: isES5,
	        propertyIsWritable: function(obj, prop) {
	            var descriptor = Object.getOwnPropertyDescriptor(obj, prop);
	            return !!(!descriptor || descriptor.writable || descriptor.set);
	        }
	    };
	} else {
	    var has = {}.hasOwnProperty;
	    var str = {}.toString;
	    var proto = {}.constructor.prototype;
	
	    var ObjectKeys = function (o) {
	        var ret = [];
	        for (var key in o) {
	            if (has.call(o, key)) {
	                ret.push(key);
	            }
	        }
	        return ret;
	    };
	
	    var ObjectGetDescriptor = function(o, key) {
	        return {value: o[key]};
	    };
	
	    var ObjectDefineProperty = function (o, key, desc) {
	        o[key] = desc.value;
	        return o;
	    };
	
	    var ObjectFreeze = function (obj) {
	        return obj;
	    };
	
	    var ObjectGetPrototypeOf = function (obj) {
	        try {
	            return Object(obj).constructor.prototype;
	        }
	        catch (e) {
	            return proto;
	        }
	    };
	
	    var ArrayIsArray = function (obj) {
	        try {
	            return str.call(obj) === "[object Array]";
	        }
	        catch(e) {
	            return false;
	        }
	    };
	
	    module.exports = {
	        isArray: ArrayIsArray,
	        keys: ObjectKeys,
	        names: ObjectKeys,
	        defineProperty: ObjectDefineProperty,
	        getDescriptor: ObjectGetDescriptor,
	        freeze: ObjectFreeze,
	        getPrototypeOf: ObjectGetPrototypeOf,
	        isES5: isES5,
	        propertyIsWritable: function() {
	            return true;
	        }
	    };
	}


/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var firstLineError;
	try {throw new Error(); } catch (e) {firstLineError = e;}
	var schedule = __webpack_require__(72);
	var Queue = __webpack_require__(73);
	var util = __webpack_require__(69);
	
	function Async() {
	    this._customScheduler = false;
	    this._isTickUsed = false;
	    this._lateQueue = new Queue(16);
	    this._normalQueue = new Queue(16);
	    this._haveDrainedQueues = false;
	    this._trampolineEnabled = true;
	    var self = this;
	    this.drainQueues = function () {
	        self._drainQueues();
	    };
	    this._schedule = schedule;
	}
	
	Async.prototype.setScheduler = function(fn) {
	    var prev = this._schedule;
	    this._schedule = fn;
	    this._customScheduler = true;
	    return prev;
	};
	
	Async.prototype.hasCustomScheduler = function() {
	    return this._customScheduler;
	};
	
	Async.prototype.enableTrampoline = function() {
	    this._trampolineEnabled = true;
	};
	
	Async.prototype.disableTrampolineIfNecessary = function() {
	    if (util.hasDevTools) {
	        this._trampolineEnabled = false;
	    }
	};
	
	Async.prototype.haveItemsQueued = function () {
	    return this._isTickUsed || this._haveDrainedQueues;
	};
	
	
	Async.prototype.fatalError = function(e, isNode) {
	    if (isNode) {
	        process.stderr.write("Fatal " + (e instanceof Error ? e.stack : e) +
	            "\n");
	        process.exit(2);
	    } else {
	        this.throwLater(e);
	    }
	};
	
	Async.prototype.throwLater = function(fn, arg) {
	    if (arguments.length === 1) {
	        arg = fn;
	        fn = function () { throw arg; };
	    }
	    if (typeof setTimeout !== "undefined") {
	        setTimeout(function() {
	            fn(arg);
	        }, 0);
	    } else try {
	        this._schedule(function() {
	            fn(arg);
	        });
	    } catch (e) {
	        throw new Error("No async scheduler available\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
	    }
	};
	
	function AsyncInvokeLater(fn, receiver, arg) {
	    this._lateQueue.push(fn, receiver, arg);
	    this._queueTick();
	}
	
	function AsyncInvoke(fn, receiver, arg) {
	    this._normalQueue.push(fn, receiver, arg);
	    this._queueTick();
	}
	
	function AsyncSettlePromises(promise) {
	    this._normalQueue._pushOne(promise);
	    this._queueTick();
	}
	
	if (!util.hasDevTools) {
	    Async.prototype.invokeLater = AsyncInvokeLater;
	    Async.prototype.invoke = AsyncInvoke;
	    Async.prototype.settlePromises = AsyncSettlePromises;
	} else {
	    Async.prototype.invokeLater = function (fn, receiver, arg) {
	        if (this._trampolineEnabled) {
	            AsyncInvokeLater.call(this, fn, receiver, arg);
	        } else {
	            this._schedule(function() {
	                setTimeout(function() {
	                    fn.call(receiver, arg);
	                }, 100);
	            });
	        }
	    };
	
	    Async.prototype.invoke = function (fn, receiver, arg) {
	        if (this._trampolineEnabled) {
	            AsyncInvoke.call(this, fn, receiver, arg);
	        } else {
	            this._schedule(function() {
	                fn.call(receiver, arg);
	            });
	        }
	    };
	
	    Async.prototype.settlePromises = function(promise) {
	        if (this._trampolineEnabled) {
	            AsyncSettlePromises.call(this, promise);
	        } else {
	            this._schedule(function() {
	                promise._settlePromises();
	            });
	        }
	    };
	}
	
	Async.prototype.invokeFirst = function (fn, receiver, arg) {
	    this._normalQueue.unshift(fn, receiver, arg);
	    this._queueTick();
	};
	
	Async.prototype._drainQueue = function(queue) {
	    while (queue.length() > 0) {
	        var fn = queue.shift();
	        if (typeof fn !== "function") {
	            fn._settlePromises();
	            continue;
	        }
	        var receiver = queue.shift();
	        var arg = queue.shift();
	        fn.call(receiver, arg);
	    }
	};
	
	Async.prototype._drainQueues = function () {
	    this._drainQueue(this._normalQueue);
	    this._reset();
	    this._haveDrainedQueues = true;
	    this._drainQueue(this._lateQueue);
	};
	
	Async.prototype._queueTick = function () {
	    if (!this._isTickUsed) {
	        this._isTickUsed = true;
	        this._schedule(this.drainQueues);
	    }
	};
	
	Async.prototype._reset = function () {
	    this._isTickUsed = false;
	};
	
	module.exports = Async;
	module.exports.firstLineError = firstLineError;


/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var util = __webpack_require__(69);
	var schedule;
	var noAsyncScheduler = function() {
	    throw new Error("No async scheduler available\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
	};
	var NativePromise = util.getNativePromise();
	if (util.isNode && typeof MutationObserver === "undefined") {
	    var GlobalSetImmediate = global.setImmediate;
	    var ProcessNextTick = process.nextTick;
	    schedule = util.isRecentNode
	                ? function(fn) { GlobalSetImmediate.call(global, fn); }
	                : function(fn) { ProcessNextTick.call(process, fn); };
	} else if (typeof NativePromise === "function" &&
	           typeof NativePromise.resolve === "function") {
	    var nativePromise = NativePromise.resolve();
	    schedule = function(fn) {
	        nativePromise.then(fn);
	    };
	} else if ((typeof MutationObserver !== "undefined") &&
	          !(typeof window !== "undefined" &&
	            window.navigator &&
	            (window.navigator.standalone || window.cordova))) {
	    schedule = (function() {
	        var div = document.createElement("div");
	        var opts = {attributes: true};
	        var toggleScheduled = false;
	        var div2 = document.createElement("div");
	        var o2 = new MutationObserver(function() {
	            div.classList.toggle("foo");
	            toggleScheduled = false;
	        });
	        o2.observe(div2, opts);
	
	        var scheduleToggle = function() {
	            if (toggleScheduled) return;
	                toggleScheduled = true;
	                div2.classList.toggle("foo");
	            };
	
	            return function schedule(fn) {
	            var o = new MutationObserver(function() {
	                o.disconnect();
	                fn();
	            });
	            o.observe(div, opts);
	            scheduleToggle();
	        };
	    })();
	} else if (typeof setImmediate !== "undefined") {
	    schedule = function (fn) {
	        setImmediate(fn);
	    };
	} else if (typeof setTimeout !== "undefined") {
	    schedule = function (fn) {
	        setTimeout(fn, 0);
	    };
	} else {
	    schedule = noAsyncScheduler;
	}
	module.exports = schedule;


/***/ },
/* 73 */
/***/ function(module, exports) {

	"use strict";
	function arrayMove(src, srcIndex, dst, dstIndex, len) {
	    for (var j = 0; j < len; ++j) {
	        dst[j + dstIndex] = src[j + srcIndex];
	        src[j + srcIndex] = void 0;
	    }
	}
	
	function Queue(capacity) {
	    this._capacity = capacity;
	    this._length = 0;
	    this._front = 0;
	}
	
	Queue.prototype._willBeOverCapacity = function (size) {
	    return this._capacity < size;
	};
	
	Queue.prototype._pushOne = function (arg) {
	    var length = this.length();
	    this._checkCapacity(length + 1);
	    var i = (this._front + length) & (this._capacity - 1);
	    this[i] = arg;
	    this._length = length + 1;
	};
	
	Queue.prototype._unshiftOne = function(value) {
	    var capacity = this._capacity;
	    this._checkCapacity(this.length() + 1);
	    var front = this._front;
	    var i = (((( front - 1 ) &
	                    ( capacity - 1) ) ^ capacity ) - capacity );
	    this[i] = value;
	    this._front = i;
	    this._length = this.length() + 1;
	};
	
	Queue.prototype.unshift = function(fn, receiver, arg) {
	    this._unshiftOne(arg);
	    this._unshiftOne(receiver);
	    this._unshiftOne(fn);
	};
	
	Queue.prototype.push = function (fn, receiver, arg) {
	    var length = this.length() + 3;
	    if (this._willBeOverCapacity(length)) {
	        this._pushOne(fn);
	        this._pushOne(receiver);
	        this._pushOne(arg);
	        return;
	    }
	    var j = this._front + length - 3;
	    this._checkCapacity(length);
	    var wrapMask = this._capacity - 1;
	    this[(j + 0) & wrapMask] = fn;
	    this[(j + 1) & wrapMask] = receiver;
	    this[(j + 2) & wrapMask] = arg;
	    this._length = length;
	};
	
	Queue.prototype.shift = function () {
	    var front = this._front,
	        ret = this[front];
	
	    this[front] = undefined;
	    this._front = (front + 1) & (this._capacity - 1);
	    this._length--;
	    return ret;
	};
	
	Queue.prototype.length = function () {
	    return this._length;
	};
	
	Queue.prototype._checkCapacity = function (size) {
	    if (this._capacity < size) {
	        this._resizeTo(this._capacity << 1);
	    }
	};
	
	Queue.prototype._resizeTo = function (capacity) {
	    var oldCapacity = this._capacity;
	    this._capacity = capacity;
	    var front = this._front;
	    var length = this._length;
	    var moveItemsCount = (front + length) & (oldCapacity - 1);
	    arrayMove(this, 0, this, oldCapacity, moveItemsCount);
	};
	
	module.exports = Queue;


/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var es5 = __webpack_require__(70);
	var Objectfreeze = es5.freeze;
	var util = __webpack_require__(69);
	var inherits = util.inherits;
	var notEnumerableProp = util.notEnumerableProp;
	
	function subError(nameProperty, defaultMessage) {
	    function SubError(message) {
	        if (!(this instanceof SubError)) return new SubError(message);
	        notEnumerableProp(this, "message",
	            typeof message === "string" ? message : defaultMessage);
	        notEnumerableProp(this, "name", nameProperty);
	        if (Error.captureStackTrace) {
	            Error.captureStackTrace(this, this.constructor);
	        } else {
	            Error.call(this);
	        }
	    }
	    inherits(SubError, Error);
	    return SubError;
	}
	
	var _TypeError, _RangeError;
	var Warning = subError("Warning", "warning");
	var CancellationError = subError("CancellationError", "cancellation error");
	var TimeoutError = subError("TimeoutError", "timeout error");
	var AggregateError = subError("AggregateError", "aggregate error");
	try {
	    _TypeError = TypeError;
	    _RangeError = RangeError;
	} catch(e) {
	    _TypeError = subError("TypeError", "type error");
	    _RangeError = subError("RangeError", "range error");
	}
	
	var methods = ("join pop push shift unshift slice filter forEach some " +
	    "every map indexOf lastIndexOf reduce reduceRight sort reverse").split(" ");
	
	for (var i = 0; i < methods.length; ++i) {
	    if (typeof Array.prototype[methods[i]] === "function") {
	        AggregateError.prototype[methods[i]] = Array.prototype[methods[i]];
	    }
	}
	
	es5.defineProperty(AggregateError.prototype, "length", {
	    value: 0,
	    configurable: false,
	    writable: true,
	    enumerable: true
	});
	AggregateError.prototype["isOperational"] = true;
	var level = 0;
	AggregateError.prototype.toString = function() {
	    var indent = Array(level * 4 + 1).join(" ");
	    var ret = "\n" + indent + "AggregateError of:" + "\n";
	    level++;
	    indent = Array(level * 4 + 1).join(" ");
	    for (var i = 0; i < this.length; ++i) {
	        var str = this[i] === this ? "[Circular AggregateError]" : this[i] + "";
	        var lines = str.split("\n");
	        for (var j = 0; j < lines.length; ++j) {
	            lines[j] = indent + lines[j];
	        }
	        str = lines.join("\n");
	        ret += str + "\n";
	    }
	    level--;
	    return ret;
	};
	
	function OperationalError(message) {
	    if (!(this instanceof OperationalError))
	        return new OperationalError(message);
	    notEnumerableProp(this, "name", "OperationalError");
	    notEnumerableProp(this, "message", message);
	    this.cause = message;
	    this["isOperational"] = true;
	
	    if (message instanceof Error) {
	        notEnumerableProp(this, "message", message.message);
	        notEnumerableProp(this, "stack", message.stack);
	    } else if (Error.captureStackTrace) {
	        Error.captureStackTrace(this, this.constructor);
	    }
	
	}
	inherits(OperationalError, Error);
	
	var errorTypes = Error["__BluebirdErrorTypes__"];
	if (!errorTypes) {
	    errorTypes = Objectfreeze({
	        CancellationError: CancellationError,
	        TimeoutError: TimeoutError,
	        OperationalError: OperationalError,
	        RejectionError: OperationalError,
	        AggregateError: AggregateError
	    });
	    es5.defineProperty(Error, "__BluebirdErrorTypes__", {
	        value: errorTypes,
	        writable: false,
	        enumerable: false,
	        configurable: false
	    });
	}
	
	module.exports = {
	    Error: Error,
	    TypeError: _TypeError,
	    RangeError: _RangeError,
	    CancellationError: errorTypes.CancellationError,
	    OperationalError: errorTypes.OperationalError,
	    TimeoutError: errorTypes.TimeoutError,
	    AggregateError: errorTypes.AggregateError,
	    Warning: Warning
	};


/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports = function(Promise, INTERNAL) {
	var util = __webpack_require__(69);
	var errorObj = util.errorObj;
	var isObject = util.isObject;
	
	function tryConvertToPromise(obj, context) {
	    if (isObject(obj)) {
	        if (obj instanceof Promise) return obj;
	        var then = getThen(obj);
	        if (then === errorObj) {
	            if (context) context._pushContext();
	            var ret = Promise.reject(then.e);
	            if (context) context._popContext();
	            return ret;
	        } else if (typeof then === "function") {
	            if (isAnyBluebirdPromise(obj)) {
	                var ret = new Promise(INTERNAL);
	                obj._then(
	                    ret._fulfill,
	                    ret._reject,
	                    undefined,
	                    ret,
	                    null
	                );
	                return ret;
	            }
	            return doThenable(obj, then, context);
	        }
	    }
	    return obj;
	}
	
	function doGetThen(obj) {
	    return obj.then;
	}
	
	function getThen(obj) {
	    try {
	        return doGetThen(obj);
	    } catch (e) {
	        errorObj.e = e;
	        return errorObj;
	    }
	}
	
	var hasProp = {}.hasOwnProperty;
	function isAnyBluebirdPromise(obj) {
	    try {
	        return hasProp.call(obj, "_promise0");
	    } catch (e) {
	        return false;
	    }
	}
	
	function doThenable(x, then, context) {
	    var promise = new Promise(INTERNAL);
	    var ret = promise;
	    if (context) context._pushContext();
	    promise._captureStackTrace();
	    if (context) context._popContext();
	    var synchronous = true;
	    var result = util.tryCatch(then).call(x, resolve, reject);
	    synchronous = false;
	
	    if (promise && result === errorObj) {
	        promise._rejectCallback(result.e, true, true);
	        promise = null;
	    }
	
	    function resolve(value) {
	        if (!promise) return;
	        promise._resolveCallback(value);
	        promise = null;
	    }
	
	    function reject(reason) {
	        if (!promise) return;
	        promise._rejectCallback(reason, synchronous, true);
	        promise = null;
	    }
	    return ret;
	}
	
	return tryConvertToPromise;
	};


/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports = function(Promise, INTERNAL, tryConvertToPromise,
	    apiRejection, Proxyable) {
	var util = __webpack_require__(69);
	var isArray = util.isArray;
	
	function toResolutionValue(val) {
	    switch(val) {
	    case -2: return [];
	    case -3: return {};
	    }
	}
	
	function PromiseArray(values) {
	    var promise = this._promise = new Promise(INTERNAL);
	    if (values instanceof Promise) {
	        promise._propagateFrom(values, 3);
	    }
	    promise._setOnCancel(this);
	    this._values = values;
	    this._length = 0;
	    this._totalResolved = 0;
	    this._init(undefined, -2);
	}
	util.inherits(PromiseArray, Proxyable);
	
	PromiseArray.prototype.length = function () {
	    return this._length;
	};
	
	PromiseArray.prototype.promise = function () {
	    return this._promise;
	};
	
	PromiseArray.prototype._init = function init(_, resolveValueIfEmpty) {
	    var values = tryConvertToPromise(this._values, this._promise);
	    if (values instanceof Promise) {
	        values = values._target();
	        var bitField = values._bitField;
	        ;
	        this._values = values;
	
	        if (((bitField & 50397184) === 0)) {
	            this._promise._setAsyncGuaranteed();
	            return values._then(
	                init,
	                this._reject,
	                undefined,
	                this,
	                resolveValueIfEmpty
	           );
	        } else if (((bitField & 33554432) !== 0)) {
	            values = values._value();
	        } else if (((bitField & 16777216) !== 0)) {
	            return this._reject(values._reason());
	        } else {
	            return this._cancel();
	        }
	    }
	    values = util.asArray(values);
	    if (values === null) {
	        var err = apiRejection(
	            "expecting an array or an iterable object but got " + util.classString(values)).reason();
	        this._promise._rejectCallback(err, false);
	        return;
	    }
	
	    if (values.length === 0) {
	        if (resolveValueIfEmpty === -5) {
	            this._resolveEmptyArray();
	        }
	        else {
	            this._resolve(toResolutionValue(resolveValueIfEmpty));
	        }
	        return;
	    }
	    this._iterate(values);
	};
	
	PromiseArray.prototype._iterate = function(values) {
	    var len = this.getActualLength(values.length);
	    this._length = len;
	    this._values = this.shouldCopyValues() ? new Array(len) : this._values;
	    var result = this._promise;
	    var isResolved = false;
	    var bitField = null;
	    for (var i = 0; i < len; ++i) {
	        var maybePromise = tryConvertToPromise(values[i], result);
	
	        if (maybePromise instanceof Promise) {
	            maybePromise = maybePromise._target();
	            bitField = maybePromise._bitField;
	        } else {
	            bitField = null;
	        }
	
	        if (isResolved) {
	            if (bitField !== null) {
	                maybePromise.suppressUnhandledRejections();
	            }
	        } else if (bitField !== null) {
	            if (((bitField & 50397184) === 0)) {
	                maybePromise._proxy(this, i);
	                this._values[i] = maybePromise;
	            } else if (((bitField & 33554432) !== 0)) {
	                isResolved = this._promiseFulfilled(maybePromise._value(), i);
	            } else if (((bitField & 16777216) !== 0)) {
	                isResolved = this._promiseRejected(maybePromise._reason(), i);
	            } else {
	                isResolved = this._promiseCancelled(i);
	            }
	        } else {
	            isResolved = this._promiseFulfilled(maybePromise, i);
	        }
	    }
	    if (!isResolved) result._setAsyncGuaranteed();
	};
	
	PromiseArray.prototype._isResolved = function () {
	    return this._values === null;
	};
	
	PromiseArray.prototype._resolve = function (value) {
	    this._values = null;
	    this._promise._fulfill(value);
	};
	
	PromiseArray.prototype._cancel = function() {
	    if (this._isResolved() || !this._promise._isCancellable()) return;
	    this._values = null;
	    this._promise._cancel();
	};
	
	PromiseArray.prototype._reject = function (reason) {
	    this._values = null;
	    this._promise._rejectCallback(reason, false);
	};
	
	PromiseArray.prototype._promiseFulfilled = function (value, index) {
	    this._values[index] = value;
	    var totalResolved = ++this._totalResolved;
	    if (totalResolved >= this._length) {
	        this._resolve(this._values);
	        return true;
	    }
	    return false;
	};
	
	PromiseArray.prototype._promiseCancelled = function() {
	    this._cancel();
	    return true;
	};
	
	PromiseArray.prototype._promiseRejected = function (reason) {
	    this._totalResolved++;
	    this._reject(reason);
	    return true;
	};
	
	PromiseArray.prototype._resultCancelled = function() {
	    if (this._isResolved()) return;
	    var values = this._values;
	    this._cancel();
	    if (values instanceof Promise) {
	        values.cancel();
	    } else {
	        for (var i = 0; i < values.length; ++i) {
	            if (values[i] instanceof Promise) {
	                values[i].cancel();
	            }
	        }
	    }
	};
	
	PromiseArray.prototype.shouldCopyValues = function () {
	    return true;
	};
	
	PromiseArray.prototype.getActualLength = function (len) {
	    return len;
	};
	
	return PromiseArray;
	};


/***/ },
/* 77 */
/***/ function(module, exports) {

	"use strict";
	module.exports = function(Promise) {
	var longStackTraces = false;
	var contextStack = [];
	
	Promise.prototype._promiseCreated = function() {};
	Promise.prototype._pushContext = function() {};
	Promise.prototype._popContext = function() {return null;};
	Promise._peekContext = Promise.prototype._peekContext = function() {};
	
	function Context() {
	    this._trace = new Context.CapturedTrace(peekContext());
	}
	Context.prototype._pushContext = function () {
	    if (this._trace !== undefined) {
	        this._trace._promiseCreated = null;
	        contextStack.push(this._trace);
	    }
	};
	
	Context.prototype._popContext = function () {
	    if (this._trace !== undefined) {
	        var trace = contextStack.pop();
	        var ret = trace._promiseCreated;
	        trace._promiseCreated = null;
	        return ret;
	    }
	    return null;
	};
	
	function createContext() {
	    if (longStackTraces) return new Context();
	}
	
	function peekContext() {
	    var lastIndex = contextStack.length - 1;
	    if (lastIndex >= 0) {
	        return contextStack[lastIndex];
	    }
	    return undefined;
	}
	Context.CapturedTrace = null;
	Context.create = createContext;
	Context.deactivateLongStackTraces = function() {};
	Context.activateLongStackTraces = function() {
	    var Promise_pushContext = Promise.prototype._pushContext;
	    var Promise_popContext = Promise.prototype._popContext;
	    var Promise_PeekContext = Promise._peekContext;
	    var Promise_peekContext = Promise.prototype._peekContext;
	    var Promise_promiseCreated = Promise.prototype._promiseCreated;
	    Context.deactivateLongStackTraces = function() {
	        Promise.prototype._pushContext = Promise_pushContext;
	        Promise.prototype._popContext = Promise_popContext;
	        Promise._peekContext = Promise_PeekContext;
	        Promise.prototype._peekContext = Promise_peekContext;
	        Promise.prototype._promiseCreated = Promise_promiseCreated;
	        longStackTraces = false;
	    };
	    longStackTraces = true;
	    Promise.prototype._pushContext = Context.prototype._pushContext;
	    Promise.prototype._popContext = Context.prototype._popContext;
	    Promise._peekContext = Promise.prototype._peekContext = peekContext;
	    Promise.prototype._promiseCreated = function() {
	        var ctx = this._peekContext();
	        if (ctx && ctx._promiseCreated == null) ctx._promiseCreated = this;
	    };
	};
	return Context;
	};


/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports = function(Promise, Context) {
	var getDomain = Promise._getDomain;
	var async = Promise._async;
	var Warning = __webpack_require__(74).Warning;
	var util = __webpack_require__(69);
	var canAttachTrace = util.canAttachTrace;
	var unhandledRejectionHandled;
	var possiblyUnhandledRejection;
	var bluebirdFramePattern =
	    /[\\\/]bluebird[\\\/]js[\\\/](release|debug|instrumented)/;
	var nodeFramePattern = /\((?:timers\.js):\d+:\d+\)/;
	var parseLinePattern = /[\/<\(](.+?):(\d+):(\d+)\)?\s*$/;
	var stackFramePattern = null;
	var formatStack = null;
	var indentStackFrames = false;
	var printWarning;
	var debugging = !!(util.env("BLUEBIRD_DEBUG") != 0 &&
	                        (false ||
	                         util.env("BLUEBIRD_DEBUG") ||
	                         util.env("NODE_ENV") === "development"));
	
	var warnings = !!(util.env("BLUEBIRD_WARNINGS") != 0 &&
	    (debugging || util.env("BLUEBIRD_WARNINGS")));
	
	var longStackTraces = !!(util.env("BLUEBIRD_LONG_STACK_TRACES") != 0 &&
	    (debugging || util.env("BLUEBIRD_LONG_STACK_TRACES")));
	
	var wForgottenReturn = util.env("BLUEBIRD_W_FORGOTTEN_RETURN") != 0 &&
	    (warnings || !!util.env("BLUEBIRD_W_FORGOTTEN_RETURN"));
	
	Promise.prototype.suppressUnhandledRejections = function() {
	    var target = this._target();
	    target._bitField = ((target._bitField & (~1048576)) |
	                      524288);
	};
	
	Promise.prototype._ensurePossibleRejectionHandled = function () {
	    if ((this._bitField & 524288) !== 0) return;
	    this._setRejectionIsUnhandled();
	    async.invokeLater(this._notifyUnhandledRejection, this, undefined);
	};
	
	Promise.prototype._notifyUnhandledRejectionIsHandled = function () {
	    fireRejectionEvent("rejectionHandled",
	                                  unhandledRejectionHandled, undefined, this);
	};
	
	Promise.prototype._setReturnedNonUndefined = function() {
	    this._bitField = this._bitField | 268435456;
	};
	
	Promise.prototype._returnedNonUndefined = function() {
	    return (this._bitField & 268435456) !== 0;
	};
	
	Promise.prototype._notifyUnhandledRejection = function () {
	    if (this._isRejectionUnhandled()) {
	        var reason = this._settledValue();
	        this._setUnhandledRejectionIsNotified();
	        fireRejectionEvent("unhandledRejection",
	                                      possiblyUnhandledRejection, reason, this);
	    }
	};
	
	Promise.prototype._setUnhandledRejectionIsNotified = function () {
	    this._bitField = this._bitField | 262144;
	};
	
	Promise.prototype._unsetUnhandledRejectionIsNotified = function () {
	    this._bitField = this._bitField & (~262144);
	};
	
	Promise.prototype._isUnhandledRejectionNotified = function () {
	    return (this._bitField & 262144) > 0;
	};
	
	Promise.prototype._setRejectionIsUnhandled = function () {
	    this._bitField = this._bitField | 1048576;
	};
	
	Promise.prototype._unsetRejectionIsUnhandled = function () {
	    this._bitField = this._bitField & (~1048576);
	    if (this._isUnhandledRejectionNotified()) {
	        this._unsetUnhandledRejectionIsNotified();
	        this._notifyUnhandledRejectionIsHandled();
	    }
	};
	
	Promise.prototype._isRejectionUnhandled = function () {
	    return (this._bitField & 1048576) > 0;
	};
	
	Promise.prototype._warn = function(message, shouldUseOwnTrace, promise) {
	    return warn(message, shouldUseOwnTrace, promise || this);
	};
	
	Promise.onPossiblyUnhandledRejection = function (fn) {
	    var domain = getDomain();
	    possiblyUnhandledRejection =
	        typeof fn === "function" ? (domain === null ?
	                                            fn : util.domainBind(domain, fn))
	                                 : undefined;
	};
	
	Promise.onUnhandledRejectionHandled = function (fn) {
	    var domain = getDomain();
	    unhandledRejectionHandled =
	        typeof fn === "function" ? (domain === null ?
	                                            fn : util.domainBind(domain, fn))
	                                 : undefined;
	};
	
	var disableLongStackTraces = function() {};
	Promise.longStackTraces = function () {
	    if (async.haveItemsQueued() && !config.longStackTraces) {
	        throw new Error("cannot enable long stack traces after promises have been created\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
	    }
	    if (!config.longStackTraces && longStackTracesIsSupported()) {
	        var Promise_captureStackTrace = Promise.prototype._captureStackTrace;
	        var Promise_attachExtraTrace = Promise.prototype._attachExtraTrace;
	        config.longStackTraces = true;
	        disableLongStackTraces = function() {
	            if (async.haveItemsQueued() && !config.longStackTraces) {
	                throw new Error("cannot enable long stack traces after promises have been created\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
	            }
	            Promise.prototype._captureStackTrace = Promise_captureStackTrace;
	            Promise.prototype._attachExtraTrace = Promise_attachExtraTrace;
	            Context.deactivateLongStackTraces();
	            async.enableTrampoline();
	            config.longStackTraces = false;
	        };
	        Promise.prototype._captureStackTrace = longStackTracesCaptureStackTrace;
	        Promise.prototype._attachExtraTrace = longStackTracesAttachExtraTrace;
	        Context.activateLongStackTraces();
	        async.disableTrampolineIfNecessary();
	    }
	};
	
	Promise.hasLongStackTraces = function () {
	    return config.longStackTraces && longStackTracesIsSupported();
	};
	
	var fireDomEvent = (function() {
	    try {
	        if (typeof CustomEvent === "function") {
	            var event = new CustomEvent("CustomEvent");
	            util.global.dispatchEvent(event);
	            return function(name, event) {
	                var domEvent = new CustomEvent(name.toLowerCase(), {
	                    detail: event,
	                    cancelable: true
	                });
	                return !util.global.dispatchEvent(domEvent);
	            };
	        } else if (typeof Event === "function") {
	            var event = new Event("CustomEvent");
	            util.global.dispatchEvent(event);
	            return function(name, event) {
	                var domEvent = new Event(name.toLowerCase(), {
	                    cancelable: true
	                });
	                domEvent.detail = event;
	                return !util.global.dispatchEvent(domEvent);
	            };
	        } else {
	            var event = document.createEvent("CustomEvent");
	            event.initCustomEvent("testingtheevent", false, true, {});
	            util.global.dispatchEvent(event);
	            return function(name, event) {
	                var domEvent = document.createEvent("CustomEvent");
	                domEvent.initCustomEvent(name.toLowerCase(), false, true,
	                    event);
	                return !util.global.dispatchEvent(domEvent);
	            };
	        }
	    } catch (e) {}
	    return function() {
	        return false;
	    };
	})();
	
	var fireGlobalEvent = (function() {
	    if (util.isNode) {
	        return function() {
	            return process.emit.apply(process, arguments);
	        };
	    } else {
	        if (!util.global) {
	            return function() {
	                return false;
	            };
	        }
	        return function(name) {
	            var methodName = "on" + name.toLowerCase();
	            var method = util.global[methodName];
	            if (!method) return false;
	            method.apply(util.global, [].slice.call(arguments, 1));
	            return true;
	        };
	    }
	})();
	
	function generatePromiseLifecycleEventObject(name, promise) {
	    return {promise: promise};
	}
	
	var eventToObjectGenerator = {
	    promiseCreated: generatePromiseLifecycleEventObject,
	    promiseFulfilled: generatePromiseLifecycleEventObject,
	    promiseRejected: generatePromiseLifecycleEventObject,
	    promiseResolved: generatePromiseLifecycleEventObject,
	    promiseCancelled: generatePromiseLifecycleEventObject,
	    promiseChained: function(name, promise, child) {
	        return {promise: promise, child: child};
	    },
	    warning: function(name, warning) {
	        return {warning: warning};
	    },
	    unhandledRejection: function (name, reason, promise) {
	        return {reason: reason, promise: promise};
	    },
	    rejectionHandled: generatePromiseLifecycleEventObject
	};
	
	var activeFireEvent = function (name) {
	    var globalEventFired = false;
	    try {
	        globalEventFired = fireGlobalEvent.apply(null, arguments);
	    } catch (e) {
	        async.throwLater(e);
	        globalEventFired = true;
	    }
	
	    var domEventFired = false;
	    try {
	        domEventFired = fireDomEvent(name,
	                    eventToObjectGenerator[name].apply(null, arguments));
	    } catch (e) {
	        async.throwLater(e);
	        domEventFired = true;
	    }
	
	    return domEventFired || globalEventFired;
	};
	
	Promise.config = function(opts) {
	    opts = Object(opts);
	    if ("longStackTraces" in opts) {
	        if (opts.longStackTraces) {
	            Promise.longStackTraces();
	        } else if (!opts.longStackTraces && Promise.hasLongStackTraces()) {
	            disableLongStackTraces();
	        }
	    }
	    if ("warnings" in opts) {
	        var warningsOption = opts.warnings;
	        config.warnings = !!warningsOption;
	        wForgottenReturn = config.warnings;
	
	        if (util.isObject(warningsOption)) {
	            if ("wForgottenReturn" in warningsOption) {
	                wForgottenReturn = !!warningsOption.wForgottenReturn;
	            }
	        }
	    }
	    if ("cancellation" in opts && opts.cancellation && !config.cancellation) {
	        if (async.haveItemsQueued()) {
	            throw new Error(
	                "cannot enable cancellation after promises are in use");
	        }
	        Promise.prototype._clearCancellationData =
	            cancellationClearCancellationData;
	        Promise.prototype._propagateFrom = cancellationPropagateFrom;
	        Promise.prototype._onCancel = cancellationOnCancel;
	        Promise.prototype._setOnCancel = cancellationSetOnCancel;
	        Promise.prototype._attachCancellationCallback =
	            cancellationAttachCancellationCallback;
	        Promise.prototype._execute = cancellationExecute;
	        propagateFromFunction = cancellationPropagateFrom;
	        config.cancellation = true;
	    }
	    if ("monitoring" in opts) {
	        if (opts.monitoring && !config.monitoring) {
	            config.monitoring = true;
	            Promise.prototype._fireEvent = activeFireEvent;
	        } else if (!opts.monitoring && config.monitoring) {
	            config.monitoring = false;
	            Promise.prototype._fireEvent = defaultFireEvent;
	        }
	    }
	};
	
	function defaultFireEvent() { return false; }
	
	Promise.prototype._fireEvent = defaultFireEvent;
	Promise.prototype._execute = function(executor, resolve, reject) {
	    try {
	        executor(resolve, reject);
	    } catch (e) {
	        return e;
	    }
	};
	Promise.prototype._onCancel = function () {};
	Promise.prototype._setOnCancel = function (handler) { ; };
	Promise.prototype._attachCancellationCallback = function(onCancel) {
	    ;
	};
	Promise.prototype._captureStackTrace = function () {};
	Promise.prototype._attachExtraTrace = function () {};
	Promise.prototype._clearCancellationData = function() {};
	Promise.prototype._propagateFrom = function (parent, flags) {
	    ;
	    ;
	};
	
	function cancellationExecute(executor, resolve, reject) {
	    var promise = this;
	    try {
	        executor(resolve, reject, function(onCancel) {
	            if (typeof onCancel !== "function") {
	                throw new TypeError("onCancel must be a function, got: " +
	                                    util.toString(onCancel));
	            }
	            promise._attachCancellationCallback(onCancel);
	        });
	    } catch (e) {
	        return e;
	    }
	}
	
	function cancellationAttachCancellationCallback(onCancel) {
	    if (!this._isCancellable()) return this;
	
	    var previousOnCancel = this._onCancel();
	    if (previousOnCancel !== undefined) {
	        if (util.isArray(previousOnCancel)) {
	            previousOnCancel.push(onCancel);
	        } else {
	            this._setOnCancel([previousOnCancel, onCancel]);
	        }
	    } else {
	        this._setOnCancel(onCancel);
	    }
	}
	
	function cancellationOnCancel() {
	    return this._onCancelField;
	}
	
	function cancellationSetOnCancel(onCancel) {
	    this._onCancelField = onCancel;
	}
	
	function cancellationClearCancellationData() {
	    this._cancellationParent = undefined;
	    this._onCancelField = undefined;
	}
	
	function cancellationPropagateFrom(parent, flags) {
	    if ((flags & 1) !== 0) {
	        this._cancellationParent = parent;
	        var branchesRemainingToCancel = parent._branchesRemainingToCancel;
	        if (branchesRemainingToCancel === undefined) {
	            branchesRemainingToCancel = 0;
	        }
	        parent._branchesRemainingToCancel = branchesRemainingToCancel + 1;
	    }
	    if ((flags & 2) !== 0 && parent._isBound()) {
	        this._setBoundTo(parent._boundTo);
	    }
	}
	
	function bindingPropagateFrom(parent, flags) {
	    if ((flags & 2) !== 0 && parent._isBound()) {
	        this._setBoundTo(parent._boundTo);
	    }
	}
	var propagateFromFunction = bindingPropagateFrom;
	
	function boundValueFunction() {
	    var ret = this._boundTo;
	    if (ret !== undefined) {
	        if (ret instanceof Promise) {
	            if (ret.isFulfilled()) {
	                return ret.value();
	            } else {
	                return undefined;
	            }
	        }
	    }
	    return ret;
	}
	
	function longStackTracesCaptureStackTrace() {
	    this._trace = new CapturedTrace(this._peekContext());
	}
	
	function longStackTracesAttachExtraTrace(error, ignoreSelf) {
	    if (canAttachTrace(error)) {
	        var trace = this._trace;
	        if (trace !== undefined) {
	            if (ignoreSelf) trace = trace._parent;
	        }
	        if (trace !== undefined) {
	            trace.attachExtraTrace(error);
	        } else if (!error.__stackCleaned__) {
	            var parsed = parseStackAndMessage(error);
	            util.notEnumerableProp(error, "stack",
	                parsed.message + "\n" + parsed.stack.join("\n"));
	            util.notEnumerableProp(error, "__stackCleaned__", true);
	        }
	    }
	}
	
	function checkForgottenReturns(returnValue, promiseCreated, name, promise,
	                               parent) {
	    if (returnValue === undefined && promiseCreated !== null &&
	        wForgottenReturn) {
	        if (parent !== undefined && parent._returnedNonUndefined()) return;
	        if ((promise._bitField & 65535) === 0) return;
	
	        if (name) name = name + " ";
	        var handlerLine = "";
	        var creatorLine = "";
	        if (promiseCreated._trace) {
	            var traceLines = promiseCreated._trace.stack.split("\n");
	            var stack = cleanStack(traceLines);
	            for (var i = stack.length - 1; i >= 0; --i) {
	                var line = stack[i];
	                if (!nodeFramePattern.test(line)) {
	                    var lineMatches = line.match(parseLinePattern);
	                    if (lineMatches) {
	                        handlerLine  = "at " + lineMatches[1] +
	                            ":" + lineMatches[2] + ":" + lineMatches[3] + " ";
	                    }
	                    break;
	                }
	            }
	
	            if (stack.length > 0) {
	                var firstUserLine = stack[0];
	                for (var i = 0; i < traceLines.length; ++i) {
	
	                    if (traceLines[i] === firstUserLine) {
	                        if (i > 0) {
	                            creatorLine = "\n" + traceLines[i - 1];
	                        }
	                        break;
	                    }
	                }
	
	            }
	        }
	        var msg = "a promise was created in a " + name +
	            "handler " + handlerLine + "but was not returned from it, " +
	            "see http://goo.gl/rRqMUw" +
	            creatorLine;
	        promise._warn(msg, true, promiseCreated);
	    }
	}
	
	function deprecated(name, replacement) {
	    var message = name +
	        " is deprecated and will be removed in a future version.";
	    if (replacement) message += " Use " + replacement + " instead.";
	    return warn(message);
	}
	
	function warn(message, shouldUseOwnTrace, promise) {
	    if (!config.warnings) return;
	    var warning = new Warning(message);
	    var ctx;
	    if (shouldUseOwnTrace) {
	        promise._attachExtraTrace(warning);
	    } else if (config.longStackTraces && (ctx = Promise._peekContext())) {
	        ctx.attachExtraTrace(warning);
	    } else {
	        var parsed = parseStackAndMessage(warning);
	        warning.stack = parsed.message + "\n" + parsed.stack.join("\n");
	    }
	
	    if (!activeFireEvent("warning", warning)) {
	        formatAndLogError(warning, "", true);
	    }
	}
	
	function reconstructStack(message, stacks) {
	    for (var i = 0; i < stacks.length - 1; ++i) {
	        stacks[i].push("From previous event:");
	        stacks[i] = stacks[i].join("\n");
	    }
	    if (i < stacks.length) {
	        stacks[i] = stacks[i].join("\n");
	    }
	    return message + "\n" + stacks.join("\n");
	}
	
	function removeDuplicateOrEmptyJumps(stacks) {
	    for (var i = 0; i < stacks.length; ++i) {
	        if (stacks[i].length === 0 ||
	            ((i + 1 < stacks.length) && stacks[i][0] === stacks[i+1][0])) {
	            stacks.splice(i, 1);
	            i--;
	        }
	    }
	}
	
	function removeCommonRoots(stacks) {
	    var current = stacks[0];
	    for (var i = 1; i < stacks.length; ++i) {
	        var prev = stacks[i];
	        var currentLastIndex = current.length - 1;
	        var currentLastLine = current[currentLastIndex];
	        var commonRootMeetPoint = -1;
	
	        for (var j = prev.length - 1; j >= 0; --j) {
	            if (prev[j] === currentLastLine) {
	                commonRootMeetPoint = j;
	                break;
	            }
	        }
	
	        for (var j = commonRootMeetPoint; j >= 0; --j) {
	            var line = prev[j];
	            if (current[currentLastIndex] === line) {
	                current.pop();
	                currentLastIndex--;
	            } else {
	                break;
	            }
	        }
	        current = prev;
	    }
	}
	
	function cleanStack(stack) {
	    var ret = [];
	    for (var i = 0; i < stack.length; ++i) {
	        var line = stack[i];
	        var isTraceLine = "    (No stack trace)" === line ||
	            stackFramePattern.test(line);
	        var isInternalFrame = isTraceLine && shouldIgnore(line);
	        if (isTraceLine && !isInternalFrame) {
	            if (indentStackFrames && line.charAt(0) !== " ") {
	                line = "    " + line;
	            }
	            ret.push(line);
	        }
	    }
	    return ret;
	}
	
	function stackFramesAsArray(error) {
	    var stack = error.stack.replace(/\s+$/g, "").split("\n");
	    for (var i = 0; i < stack.length; ++i) {
	        var line = stack[i];
	        if ("    (No stack trace)" === line || stackFramePattern.test(line)) {
	            break;
	        }
	    }
	    if (i > 0) {
	        stack = stack.slice(i);
	    }
	    return stack;
	}
	
	function parseStackAndMessage(error) {
	    var stack = error.stack;
	    var message = error.toString();
	    stack = typeof stack === "string" && stack.length > 0
	                ? stackFramesAsArray(error) : ["    (No stack trace)"];
	    return {
	        message: message,
	        stack: cleanStack(stack)
	    };
	}
	
	function formatAndLogError(error, title, isSoft) {
	    if (typeof console !== "undefined") {
	        var message;
	        if (util.isObject(error)) {
	            var stack = error.stack;
	            message = title + formatStack(stack, error);
	        } else {
	            message = title + String(error);
	        }
	        if (typeof printWarning === "function") {
	            printWarning(message, isSoft);
	        } else if (typeof console.log === "function" ||
	            typeof console.log === "object") {
	            console.log(message);
	        }
	    }
	}
	
	function fireRejectionEvent(name, localHandler, reason, promise) {
	    var localEventFired = false;
	    try {
	        if (typeof localHandler === "function") {
	            localEventFired = true;
	            if (name === "rejectionHandled") {
	                localHandler(promise);
	            } else {
	                localHandler(reason, promise);
	            }
	        }
	    } catch (e) {
	        async.throwLater(e);
	    }
	
	    if (name === "unhandledRejection") {
	        if (!activeFireEvent(name, reason, promise) && !localEventFired) {
	            formatAndLogError(reason, "Unhandled rejection ");
	        }
	    } else {
	        activeFireEvent(name, promise);
	    }
	}
	
	function formatNonError(obj) {
	    var str;
	    if (typeof obj === "function") {
	        str = "[function " +
	            (obj.name || "anonymous") +
	            "]";
	    } else {
	        str = obj && typeof obj.toString === "function"
	            ? obj.toString() : util.toString(obj);
	        var ruselessToString = /\[object [a-zA-Z0-9$_]+\]/;
	        if (ruselessToString.test(str)) {
	            try {
	                var newStr = JSON.stringify(obj);
	                str = newStr;
	            }
	            catch(e) {
	
	            }
	        }
	        if (str.length === 0) {
	            str = "(empty array)";
	        }
	    }
	    return ("(<" + snip(str) + ">, no stack trace)");
	}
	
	function snip(str) {
	    var maxChars = 41;
	    if (str.length < maxChars) {
	        return str;
	    }
	    return str.substr(0, maxChars - 3) + "...";
	}
	
	function longStackTracesIsSupported() {
	    return typeof captureStackTrace === "function";
	}
	
	var shouldIgnore = function() { return false; };
	var parseLineInfoRegex = /[\/<\(]([^:\/]+):(\d+):(?:\d+)\)?\s*$/;
	function parseLineInfo(line) {
	    var matches = line.match(parseLineInfoRegex);
	    if (matches) {
	        return {
	            fileName: matches[1],
	            line: parseInt(matches[2], 10)
	        };
	    }
	}
	
	function setBounds(firstLineError, lastLineError) {
	    if (!longStackTracesIsSupported()) return;
	    var firstStackLines = firstLineError.stack.split("\n");
	    var lastStackLines = lastLineError.stack.split("\n");
	    var firstIndex = -1;
	    var lastIndex = -1;
	    var firstFileName;
	    var lastFileName;
	    for (var i = 0; i < firstStackLines.length; ++i) {
	        var result = parseLineInfo(firstStackLines[i]);
	        if (result) {
	            firstFileName = result.fileName;
	            firstIndex = result.line;
	            break;
	        }
	    }
	    for (var i = 0; i < lastStackLines.length; ++i) {
	        var result = parseLineInfo(lastStackLines[i]);
	        if (result) {
	            lastFileName = result.fileName;
	            lastIndex = result.line;
	            break;
	        }
	    }
	    if (firstIndex < 0 || lastIndex < 0 || !firstFileName || !lastFileName ||
	        firstFileName !== lastFileName || firstIndex >= lastIndex) {
	        return;
	    }
	
	    shouldIgnore = function(line) {
	        if (bluebirdFramePattern.test(line)) return true;
	        var info = parseLineInfo(line);
	        if (info) {
	            if (info.fileName === firstFileName &&
	                (firstIndex <= info.line && info.line <= lastIndex)) {
	                return true;
	            }
	        }
	        return false;
	    };
	}
	
	function CapturedTrace(parent) {
	    this._parent = parent;
	    this._promisesCreated = 0;
	    var length = this._length = 1 + (parent === undefined ? 0 : parent._length);
	    captureStackTrace(this, CapturedTrace);
	    if (length > 32) this.uncycle();
	}
	util.inherits(CapturedTrace, Error);
	Context.CapturedTrace = CapturedTrace;
	
	CapturedTrace.prototype.uncycle = function() {
	    var length = this._length;
	    if (length < 2) return;
	    var nodes = [];
	    var stackToIndex = {};
	
	    for (var i = 0, node = this; node !== undefined; ++i) {
	        nodes.push(node);
	        node = node._parent;
	    }
	    length = this._length = i;
	    for (var i = length - 1; i >= 0; --i) {
	        var stack = nodes[i].stack;
	        if (stackToIndex[stack] === undefined) {
	            stackToIndex[stack] = i;
	        }
	    }
	    for (var i = 0; i < length; ++i) {
	        var currentStack = nodes[i].stack;
	        var index = stackToIndex[currentStack];
	        if (index !== undefined && index !== i) {
	            if (index > 0) {
	                nodes[index - 1]._parent = undefined;
	                nodes[index - 1]._length = 1;
	            }
	            nodes[i]._parent = undefined;
	            nodes[i]._length = 1;
	            var cycleEdgeNode = i > 0 ? nodes[i - 1] : this;
	
	            if (index < length - 1) {
	                cycleEdgeNode._parent = nodes[index + 1];
	                cycleEdgeNode._parent.uncycle();
	                cycleEdgeNode._length =
	                    cycleEdgeNode._parent._length + 1;
	            } else {
	                cycleEdgeNode._parent = undefined;
	                cycleEdgeNode._length = 1;
	            }
	            var currentChildLength = cycleEdgeNode._length + 1;
	            for (var j = i - 2; j >= 0; --j) {
	                nodes[j]._length = currentChildLength;
	                currentChildLength++;
	            }
	            return;
	        }
	    }
	};
	
	CapturedTrace.prototype.attachExtraTrace = function(error) {
	    if (error.__stackCleaned__) return;
	    this.uncycle();
	    var parsed = parseStackAndMessage(error);
	    var message = parsed.message;
	    var stacks = [parsed.stack];
	
	    var trace = this;
	    while (trace !== undefined) {
	        stacks.push(cleanStack(trace.stack.split("\n")));
	        trace = trace._parent;
	    }
	    removeCommonRoots(stacks);
	    removeDuplicateOrEmptyJumps(stacks);
	    util.notEnumerableProp(error, "stack", reconstructStack(message, stacks));
	    util.notEnumerableProp(error, "__stackCleaned__", true);
	};
	
	var captureStackTrace = (function stackDetection() {
	    var v8stackFramePattern = /^\s*at\s*/;
	    var v8stackFormatter = function(stack, error) {
	        if (typeof stack === "string") return stack;
	
	        if (error.name !== undefined &&
	            error.message !== undefined) {
	            return error.toString();
	        }
	        return formatNonError(error);
	    };
	
	    if (typeof Error.stackTraceLimit === "number" &&
	        typeof Error.captureStackTrace === "function") {
	        Error.stackTraceLimit += 6;
	        stackFramePattern = v8stackFramePattern;
	        formatStack = v8stackFormatter;
	        var captureStackTrace = Error.captureStackTrace;
	
	        shouldIgnore = function(line) {
	            return bluebirdFramePattern.test(line);
	        };
	        return function(receiver, ignoreUntil) {
	            Error.stackTraceLimit += 6;
	            captureStackTrace(receiver, ignoreUntil);
	            Error.stackTraceLimit -= 6;
	        };
	    }
	    var err = new Error();
	
	    if (typeof err.stack === "string" &&
	        err.stack.split("\n")[0].indexOf("stackDetection@") >= 0) {
	        stackFramePattern = /@/;
	        formatStack = v8stackFormatter;
	        indentStackFrames = true;
	        return function captureStackTrace(o) {
	            o.stack = new Error().stack;
	        };
	    }
	
	    var hasStackAfterThrow;
	    try { throw new Error(); }
	    catch(e) {
	        hasStackAfterThrow = ("stack" in e);
	    }
	    if (!("stack" in err) && hasStackAfterThrow &&
	        typeof Error.stackTraceLimit === "number") {
	        stackFramePattern = v8stackFramePattern;
	        formatStack = v8stackFormatter;
	        return function captureStackTrace(o) {
	            Error.stackTraceLimit += 6;
	            try { throw new Error(); }
	            catch(e) { o.stack = e.stack; }
	            Error.stackTraceLimit -= 6;
	        };
	    }
	
	    formatStack = function(stack, error) {
	        if (typeof stack === "string") return stack;
	
	        if ((typeof error === "object" ||
	            typeof error === "function") &&
	            error.name !== undefined &&
	            error.message !== undefined) {
	            return error.toString();
	        }
	        return formatNonError(error);
	    };
	
	    return null;
	
	})([]);
	
	if (typeof console !== "undefined" && typeof console.warn !== "undefined") {
	    printWarning = function (message) {
	        console.warn(message);
	    };
	    if (util.isNode && process.stderr.isTTY) {
	        printWarning = function(message, isSoft) {
	            var color = isSoft ? "\u001b[33m" : "\u001b[31m";
	            console.warn(color + message + "\u001b[0m\n");
	        };
	    } else if (!util.isNode && typeof (new Error().stack) === "string") {
	        printWarning = function(message, isSoft) {
	            console.warn("%c" + message,
	                        isSoft ? "color: darkorange" : "color: red");
	        };
	    }
	}
	
	var config = {
	    warnings: warnings,
	    longStackTraces: false,
	    cancellation: false,
	    monitoring: false
	};
	
	if (longStackTraces) Promise.longStackTraces();
	
	return {
	    longStackTraces: function() {
	        return config.longStackTraces;
	    },
	    warnings: function() {
	        return config.warnings;
	    },
	    cancellation: function() {
	        return config.cancellation;
	    },
	    monitoring: function() {
	        return config.monitoring;
	    },
	    propagateFromFunction: function() {
	        return propagateFromFunction;
	    },
	    boundValueFunction: function() {
	        return boundValueFunction;
	    },
	    checkForgottenReturns: checkForgottenReturns,
	    setBounds: setBounds,
	    warn: warn,
	    deprecated: deprecated,
	    CapturedTrace: CapturedTrace,
	    fireDomEvent: fireDomEvent,
	    fireGlobalEvent: fireGlobalEvent
	};
	};


/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports = function(Promise, tryConvertToPromise) {
	var util = __webpack_require__(69);
	var CancellationError = Promise.CancellationError;
	var errorObj = util.errorObj;
	
	function PassThroughHandlerContext(promise, type, handler) {
	    this.promise = promise;
	    this.type = type;
	    this.handler = handler;
	    this.called = false;
	    this.cancelPromise = null;
	}
	
	PassThroughHandlerContext.prototype.isFinallyHandler = function() {
	    return this.type === 0;
	};
	
	function FinallyHandlerCancelReaction(finallyHandler) {
	    this.finallyHandler = finallyHandler;
	}
	
	FinallyHandlerCancelReaction.prototype._resultCancelled = function() {
	    checkCancel(this.finallyHandler);
	};
	
	function checkCancel(ctx, reason) {
	    if (ctx.cancelPromise != null) {
	        if (arguments.length > 1) {
	            ctx.cancelPromise._reject(reason);
	        } else {
	            ctx.cancelPromise._cancel();
	        }
	        ctx.cancelPromise = null;
	        return true;
	    }
	    return false;
	}
	
	function succeed() {
	    return finallyHandler.call(this, this.promise._target()._settledValue());
	}
	function fail(reason) {
	    if (checkCancel(this, reason)) return;
	    errorObj.e = reason;
	    return errorObj;
	}
	function finallyHandler(reasonOrValue) {
	    var promise = this.promise;
	    var handler = this.handler;
	
	    if (!this.called) {
	        this.called = true;
	        var ret = this.isFinallyHandler()
	            ? handler.call(promise._boundValue())
	            : handler.call(promise._boundValue(), reasonOrValue);
	        if (ret !== undefined) {
	            promise._setReturnedNonUndefined();
	            var maybePromise = tryConvertToPromise(ret, promise);
	            if (maybePromise instanceof Promise) {
	                if (this.cancelPromise != null) {
	                    if (maybePromise._isCancelled()) {
	                        var reason =
	                            new CancellationError("late cancellation observer");
	                        promise._attachExtraTrace(reason);
	                        errorObj.e = reason;
	                        return errorObj;
	                    } else if (maybePromise.isPending()) {
	                        maybePromise._attachCancellationCallback(
	                            new FinallyHandlerCancelReaction(this));
	                    }
	                }
	                return maybePromise._then(
	                    succeed, fail, undefined, this, undefined);
	            }
	        }
	    }
	
	    if (promise.isRejected()) {
	        checkCancel(this);
	        errorObj.e = reasonOrValue;
	        return errorObj;
	    } else {
	        checkCancel(this);
	        return reasonOrValue;
	    }
	}
	
	Promise.prototype._passThrough = function(handler, type, success, fail) {
	    if (typeof handler !== "function") return this.then();
	    return this._then(success,
	                      fail,
	                      undefined,
	                      new PassThroughHandlerContext(this, type, handler),
	                      undefined);
	};
	
	Promise.prototype.lastly =
	Promise.prototype["finally"] = function (handler) {
	    return this._passThrough(handler,
	                             0,
	                             finallyHandler,
	                             finallyHandler);
	};
	
	Promise.prototype.tap = function (handler) {
	    return this._passThrough(handler, 1, finallyHandler);
	};
	
	return PassThroughHandlerContext;
	};


/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports = function(NEXT_FILTER) {
	var util = __webpack_require__(69);
	var getKeys = __webpack_require__(70).keys;
	var tryCatch = util.tryCatch;
	var errorObj = util.errorObj;
	
	function catchFilter(instances, cb, promise) {
	    return function(e) {
	        var boundTo = promise._boundValue();
	        predicateLoop: for (var i = 0; i < instances.length; ++i) {
	            var item = instances[i];
	
	            if (item === Error ||
	                (item != null && item.prototype instanceof Error)) {
	                if (e instanceof item) {
	                    return tryCatch(cb).call(boundTo, e);
	                }
	            } else if (typeof item === "function") {
	                var matchesPredicate = tryCatch(item).call(boundTo, e);
	                if (matchesPredicate === errorObj) {
	                    return matchesPredicate;
	                } else if (matchesPredicate) {
	                    return tryCatch(cb).call(boundTo, e);
	                }
	            } else if (util.isObject(e)) {
	                var keys = getKeys(item);
	                for (var j = 0; j < keys.length; ++j) {
	                    var key = keys[j];
	                    if (item[key] != e[key]) {
	                        continue predicateLoop;
	                    }
	                }
	                return tryCatch(cb).call(boundTo, e);
	            }
	        }
	        return NEXT_FILTER;
	    };
	}
	
	return catchFilter;
	};


/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var util = __webpack_require__(69);
	var maybeWrapAsError = util.maybeWrapAsError;
	var errors = __webpack_require__(74);
	var OperationalError = errors.OperationalError;
	var es5 = __webpack_require__(70);
	
	function isUntypedError(obj) {
	    return obj instanceof Error &&
	        es5.getPrototypeOf(obj) === Error.prototype;
	}
	
	var rErrorKey = /^(?:name|message|stack|cause)$/;
	function wrapAsOperationalError(obj) {
	    var ret;
	    if (isUntypedError(obj)) {
	        ret = new OperationalError(obj);
	        ret.name = obj.name;
	        ret.message = obj.message;
	        ret.stack = obj.stack;
	        var keys = es5.keys(obj);
	        for (var i = 0; i < keys.length; ++i) {
	            var key = keys[i];
	            if (!rErrorKey.test(key)) {
	                ret[key] = obj[key];
	            }
	        }
	        return ret;
	    }
	    util.markAsOriginatingFromRejection(obj);
	    return obj;
	}
	
	function nodebackForPromise(promise, multiArgs) {
	    return function(err, value) {
	        if (promise === null) return;
	        if (err) {
	            var wrapped = wrapAsOperationalError(maybeWrapAsError(err));
	            promise._attachExtraTrace(wrapped);
	            promise._reject(wrapped);
	        } else if (!multiArgs) {
	            promise._fulfill(value);
	        } else {
	            var $_len = arguments.length;var args = new Array(Math.max($_len - 1, 0)); for(var $_i = 1; $_i < $_len; ++$_i) {args[$_i - 1] = arguments[$_i];};
	            promise._fulfill(args);
	        }
	        promise = null;
	    };
	}
	
	module.exports = nodebackForPromise;


/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports =
	function(Promise, INTERNAL, tryConvertToPromise, apiRejection, debug) {
	var util = __webpack_require__(69);
	var tryCatch = util.tryCatch;
	
	Promise.method = function (fn) {
	    if (typeof fn !== "function") {
	        throw new Promise.TypeError("expecting a function but got " + util.classString(fn));
	    }
	    return function () {
	        var ret = new Promise(INTERNAL);
	        ret._captureStackTrace();
	        ret._pushContext();
	        var value = tryCatch(fn).apply(this, arguments);
	        var promiseCreated = ret._popContext();
	        debug.checkForgottenReturns(
	            value, promiseCreated, "Promise.method", ret);
	        ret._resolveFromSyncValue(value);
	        return ret;
	    };
	};
	
	Promise.attempt = Promise["try"] = function (fn) {
	    if (typeof fn !== "function") {
	        return apiRejection("expecting a function but got " + util.classString(fn));
	    }
	    var ret = new Promise(INTERNAL);
	    ret._captureStackTrace();
	    ret._pushContext();
	    var value;
	    if (arguments.length > 1) {
	        debug.deprecated("calling Promise.try with more than 1 argument");
	        var arg = arguments[1];
	        var ctx = arguments[2];
	        value = util.isArray(arg) ? tryCatch(fn).apply(ctx, arg)
	                                  : tryCatch(fn).call(ctx, arg);
	    } else {
	        value = tryCatch(fn)();
	    }
	    var promiseCreated = ret._popContext();
	    debug.checkForgottenReturns(
	        value, promiseCreated, "Promise.try", ret);
	    ret._resolveFromSyncValue(value);
	    return ret;
	};
	
	Promise.prototype._resolveFromSyncValue = function (value) {
	    if (value === util.errorObj) {
	        this._rejectCallback(value.e, false);
	    } else {
	        this._resolveCallback(value, true);
	    }
	};
	};


/***/ },
/* 83 */
/***/ function(module, exports) {

	"use strict";
	module.exports = function(Promise, INTERNAL, tryConvertToPromise, debug) {
	var calledBind = false;
	var rejectThis = function(_, e) {
	    this._reject(e);
	};
	
	var targetRejected = function(e, context) {
	    context.promiseRejectionQueued = true;
	    context.bindingPromise._then(rejectThis, rejectThis, null, this, e);
	};
	
	var bindingResolved = function(thisArg, context) {
	    if (((this._bitField & 50397184) === 0)) {
	        this._resolveCallback(context.target);
	    }
	};
	
	var bindingRejected = function(e, context) {
	    if (!context.promiseRejectionQueued) this._reject(e);
	};
	
	Promise.prototype.bind = function (thisArg) {
	    if (!calledBind) {
	        calledBind = true;
	        Promise.prototype._propagateFrom = debug.propagateFromFunction();
	        Promise.prototype._boundValue = debug.boundValueFunction();
	    }
	    var maybePromise = tryConvertToPromise(thisArg);
	    var ret = new Promise(INTERNAL);
	    ret._propagateFrom(this, 1);
	    var target = this._target();
	    ret._setBoundTo(maybePromise);
	    if (maybePromise instanceof Promise) {
	        var context = {
	            promiseRejectionQueued: false,
	            promise: ret,
	            target: target,
	            bindingPromise: maybePromise
	        };
	        target._then(INTERNAL, targetRejected, undefined, ret, context);
	        maybePromise._then(
	            bindingResolved, bindingRejected, undefined, ret, context);
	        ret._setOnCancel(maybePromise);
	    } else {
	        ret._resolveCallback(target);
	    }
	    return ret;
	};
	
	Promise.prototype._setBoundTo = function (obj) {
	    if (obj !== undefined) {
	        this._bitField = this._bitField | 2097152;
	        this._boundTo = obj;
	    } else {
	        this._bitField = this._bitField & (~2097152);
	    }
	};
	
	Promise.prototype._isBound = function () {
	    return (this._bitField & 2097152) === 2097152;
	};
	
	Promise.bind = function (thisArg, value) {
	    return Promise.resolve(value).bind(thisArg);
	};
	};


/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports = function(Promise, PromiseArray, apiRejection, debug) {
	var util = __webpack_require__(69);
	var tryCatch = util.tryCatch;
	var errorObj = util.errorObj;
	var async = Promise._async;
	
	Promise.prototype["break"] = Promise.prototype.cancel = function() {
	    if (!debug.cancellation()) return this._warn("cancellation is disabled");
	
	    var promise = this;
	    var child = promise;
	    while (promise._isCancellable()) {
	        if (!promise._cancelBy(child)) {
	            if (child._isFollowing()) {
	                child._followee().cancel();
	            } else {
	                child._cancelBranched();
	            }
	            break;
	        }
	
	        var parent = promise._cancellationParent;
	        if (parent == null || !parent._isCancellable()) {
	            if (promise._isFollowing()) {
	                promise._followee().cancel();
	            } else {
	                promise._cancelBranched();
	            }
	            break;
	        } else {
	            if (promise._isFollowing()) promise._followee().cancel();
	            promise._setWillBeCancelled();
	            child = promise;
	            promise = parent;
	        }
	    }
	};
	
	Promise.prototype._branchHasCancelled = function() {
	    this._branchesRemainingToCancel--;
	};
	
	Promise.prototype._enoughBranchesHaveCancelled = function() {
	    return this._branchesRemainingToCancel === undefined ||
	           this._branchesRemainingToCancel <= 0;
	};
	
	Promise.prototype._cancelBy = function(canceller) {
	    if (canceller === this) {
	        this._branchesRemainingToCancel = 0;
	        this._invokeOnCancel();
	        return true;
	    } else {
	        this._branchHasCancelled();
	        if (this._enoughBranchesHaveCancelled()) {
	            this._invokeOnCancel();
	            return true;
	        }
	    }
	    return false;
	};
	
	Promise.prototype._cancelBranched = function() {
	    if (this._enoughBranchesHaveCancelled()) {
	        this._cancel();
	    }
	};
	
	Promise.prototype._cancel = function() {
	    if (!this._isCancellable()) return;
	    this._setCancelled();
	    async.invoke(this._cancelPromises, this, undefined);
	};
	
	Promise.prototype._cancelPromises = function() {
	    if (this._length() > 0) this._settlePromises();
	};
	
	Promise.prototype._unsetOnCancel = function() {
	    this._onCancelField = undefined;
	};
	
	Promise.prototype._isCancellable = function() {
	    return this.isPending() && !this._isCancelled();
	};
	
	Promise.prototype.isCancellable = function() {
	    return this.isPending() && !this.isCancelled();
	};
	
	Promise.prototype._doInvokeOnCancel = function(onCancelCallback, internalOnly) {
	    if (util.isArray(onCancelCallback)) {
	        for (var i = 0; i < onCancelCallback.length; ++i) {
	            this._doInvokeOnCancel(onCancelCallback[i], internalOnly);
	        }
	    } else if (onCancelCallback !== undefined) {
	        if (typeof onCancelCallback === "function") {
	            if (!internalOnly) {
	                var e = tryCatch(onCancelCallback).call(this._boundValue());
	                if (e === errorObj) {
	                    this._attachExtraTrace(e.e);
	                    async.throwLater(e.e);
	                }
	            }
	        } else {
	            onCancelCallback._resultCancelled(this);
	        }
	    }
	};
	
	Promise.prototype._invokeOnCancel = function() {
	    var onCancelCallback = this._onCancel();
	    this._unsetOnCancel();
	    async.invoke(this._doInvokeOnCancel, this, onCancelCallback);
	};
	
	Promise.prototype._invokeInternalOnCancel = function() {
	    if (this._isCancellable()) {
	        this._doInvokeOnCancel(this._onCancel(), true);
	        this._unsetOnCancel();
	    }
	};
	
	Promise.prototype._resultCancelled = function() {
	    this.cancel();
	};
	
	};


/***/ },
/* 85 */
/***/ function(module, exports) {

	"use strict";
	module.exports = function(Promise) {
	function returner() {
	    return this.value;
	}
	function thrower() {
	    throw this.reason;
	}
	
	Promise.prototype["return"] =
	Promise.prototype.thenReturn = function (value) {
	    if (value instanceof Promise) value.suppressUnhandledRejections();
	    return this._then(
	        returner, undefined, undefined, {value: value}, undefined);
	};
	
	Promise.prototype["throw"] =
	Promise.prototype.thenThrow = function (reason) {
	    return this._then(
	        thrower, undefined, undefined, {reason: reason}, undefined);
	};
	
	Promise.prototype.catchThrow = function (reason) {
	    if (arguments.length <= 1) {
	        return this._then(
	            undefined, thrower, undefined, {reason: reason}, undefined);
	    } else {
	        var _reason = arguments[1];
	        var handler = function() {throw _reason;};
	        return this.caught(reason, handler);
	    }
	};
	
	Promise.prototype.catchReturn = function (value) {
	    if (arguments.length <= 1) {
	        if (value instanceof Promise) value.suppressUnhandledRejections();
	        return this._then(
	            undefined, returner, undefined, {value: value}, undefined);
	    } else {
	        var _value = arguments[1];
	        if (_value instanceof Promise) _value.suppressUnhandledRejections();
	        var handler = function() {return _value;};
	        return this.caught(value, handler);
	    }
	};
	};


/***/ },
/* 86 */
/***/ function(module, exports) {

	"use strict";
	module.exports = function(Promise) {
	function PromiseInspection(promise) {
	    if (promise !== undefined) {
	        promise = promise._target();
	        this._bitField = promise._bitField;
	        this._settledValueField = promise._isFateSealed()
	            ? promise._settledValue() : undefined;
	    }
	    else {
	        this._bitField = 0;
	        this._settledValueField = undefined;
	    }
	}
	
	PromiseInspection.prototype._settledValue = function() {
	    return this._settledValueField;
	};
	
	var value = PromiseInspection.prototype.value = function () {
	    if (!this.isFulfilled()) {
	        throw new TypeError("cannot get fulfillment value of a non-fulfilled promise\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
	    }
	    return this._settledValue();
	};
	
	var reason = PromiseInspection.prototype.error =
	PromiseInspection.prototype.reason = function () {
	    if (!this.isRejected()) {
	        throw new TypeError("cannot get rejection reason of a non-rejected promise\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
	    }
	    return this._settledValue();
	};
	
	var isFulfilled = PromiseInspection.prototype.isFulfilled = function() {
	    return (this._bitField & 33554432) !== 0;
	};
	
	var isRejected = PromiseInspection.prototype.isRejected = function () {
	    return (this._bitField & 16777216) !== 0;
	};
	
	var isPending = PromiseInspection.prototype.isPending = function () {
	    return (this._bitField & 50397184) === 0;
	};
	
	var isResolved = PromiseInspection.prototype.isResolved = function () {
	    return (this._bitField & 50331648) !== 0;
	};
	
	PromiseInspection.prototype.isCancelled = function() {
	    return (this._bitField & 8454144) !== 0;
	};
	
	Promise.prototype.__isCancelled = function() {
	    return (this._bitField & 65536) === 65536;
	};
	
	Promise.prototype._isCancelled = function() {
	    return this._target().__isCancelled();
	};
	
	Promise.prototype.isCancelled = function() {
	    return (this._target()._bitField & 8454144) !== 0;
	};
	
	Promise.prototype.isPending = function() {
	    return isPending.call(this._target());
	};
	
	Promise.prototype.isRejected = function() {
	    return isRejected.call(this._target());
	};
	
	Promise.prototype.isFulfilled = function() {
	    return isFulfilled.call(this._target());
	};
	
	Promise.prototype.isResolved = function() {
	    return isResolved.call(this._target());
	};
	
	Promise.prototype.value = function() {
	    return value.call(this._target());
	};
	
	Promise.prototype.reason = function() {
	    var target = this._target();
	    target._unsetRejectionIsUnhandled();
	    return reason.call(target);
	};
	
	Promise.prototype._value = function() {
	    return this._settledValue();
	};
	
	Promise.prototype._reason = function() {
	    this._unsetRejectionIsUnhandled();
	    return this._settledValue();
	};
	
	Promise.PromiseInspection = PromiseInspection;
	};


/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports =
	function(Promise, PromiseArray, tryConvertToPromise, INTERNAL, async,
	         getDomain) {
	var util = __webpack_require__(69);
	var canEvaluate = util.canEvaluate;
	var tryCatch = util.tryCatch;
	var errorObj = util.errorObj;
	var reject;
	
	if (true) {
	if (canEvaluate) {
	    var thenCallback = function(i) {
	        return new Function("value", "holder", "                             \n\
	            'use strict';                                                    \n\
	            holder.pIndex = value;                                           \n\
	            holder.checkFulfillment(this);                                   \n\
	            ".replace(/Index/g, i));
	    };
	
	    var promiseSetter = function(i) {
	        return new Function("promise", "holder", "                           \n\
	            'use strict';                                                    \n\
	            holder.pIndex = promise;                                         \n\
	            ".replace(/Index/g, i));
	    };
	
	    var generateHolderClass = function(total) {
	        var props = new Array(total);
	        for (var i = 0; i < props.length; ++i) {
	            props[i] = "this.p" + (i+1);
	        }
	        var assignment = props.join(" = ") + " = null;";
	        var cancellationCode= "var promise;\n" + props.map(function(prop) {
	            return "                                                         \n\
	                promise = " + prop + ";                                      \n\
	                if (promise instanceof Promise) {                            \n\
	                    promise.cancel();                                        \n\
	                }                                                            \n\
	            ";
	        }).join("\n");
	        var passedArguments = props.join(", ");
	        var name = "Holder$" + total;
	
	
	        var code = "return function(tryCatch, errorObj, Promise, async) {    \n\
	            'use strict';                                                    \n\
	            function [TheName](fn) {                                         \n\
	                [TheProperties]                                              \n\
	                this.fn = fn;                                                \n\
	                this.asyncNeeded = true;                                     \n\
	                this.now = 0;                                                \n\
	            }                                                                \n\
	                                                                             \n\
	            [TheName].prototype._callFunction = function(promise) {          \n\
	                promise._pushContext();                                      \n\
	                var ret = tryCatch(this.fn)([ThePassedArguments]);           \n\
	                promise._popContext();                                       \n\
	                if (ret === errorObj) {                                      \n\
	                    promise._rejectCallback(ret.e, false);                   \n\
	                } else {                                                     \n\
	                    promise._resolveCallback(ret);                           \n\
	                }                                                            \n\
	            };                                                               \n\
	                                                                             \n\
	            [TheName].prototype.checkFulfillment = function(promise) {       \n\
	                var now = ++this.now;                                        \n\
	                if (now === [TheTotal]) {                                    \n\
	                    if (this.asyncNeeded) {                                  \n\
	                        async.invoke(this._callFunction, this, promise);     \n\
	                    } else {                                                 \n\
	                        this._callFunction(promise);                         \n\
	                    }                                                        \n\
	                                                                             \n\
	                }                                                            \n\
	            };                                                               \n\
	                                                                             \n\
	            [TheName].prototype._resultCancelled = function() {              \n\
	                [CancellationCode]                                           \n\
	            };                                                               \n\
	                                                                             \n\
	            return [TheName];                                                \n\
	        }(tryCatch, errorObj, Promise, async);                               \n\
	        ";
	
	        code = code.replace(/\[TheName\]/g, name)
	            .replace(/\[TheTotal\]/g, total)
	            .replace(/\[ThePassedArguments\]/g, passedArguments)
	            .replace(/\[TheProperties\]/g, assignment)
	            .replace(/\[CancellationCode\]/g, cancellationCode);
	
	        return new Function("tryCatch", "errorObj", "Promise", "async", code)
	                           (tryCatch, errorObj, Promise, async);
	    };
	
	    var holderClasses = [];
	    var thenCallbacks = [];
	    var promiseSetters = [];
	
	    for (var i = 0; i < 8; ++i) {
	        holderClasses.push(generateHolderClass(i + 1));
	        thenCallbacks.push(thenCallback(i + 1));
	        promiseSetters.push(promiseSetter(i + 1));
	    }
	
	    reject = function (reason) {
	        this._reject(reason);
	    };
	}}
	
	Promise.join = function () {
	    var last = arguments.length - 1;
	    var fn;
	    if (last > 0 && typeof arguments[last] === "function") {
	        fn = arguments[last];
	        if (true) {
	            if (last <= 8 && canEvaluate) {
	                var ret = new Promise(INTERNAL);
	                ret._captureStackTrace();
	                var HolderClass = holderClasses[last - 1];
	                var holder = new HolderClass(fn);
	                var callbacks = thenCallbacks;
	
	                for (var i = 0; i < last; ++i) {
	                    var maybePromise = tryConvertToPromise(arguments[i], ret);
	                    if (maybePromise instanceof Promise) {
	                        maybePromise = maybePromise._target();
	                        var bitField = maybePromise._bitField;
	                        ;
	                        if (((bitField & 50397184) === 0)) {
	                            maybePromise._then(callbacks[i], reject,
	                                               undefined, ret, holder);
	                            promiseSetters[i](maybePromise, holder);
	                            holder.asyncNeeded = false;
	                        } else if (((bitField & 33554432) !== 0)) {
	                            callbacks[i].call(ret,
	                                              maybePromise._value(), holder);
	                        } else if (((bitField & 16777216) !== 0)) {
	                            ret._reject(maybePromise._reason());
	                        } else {
	                            ret._cancel();
	                        }
	                    } else {
	                        callbacks[i].call(ret, maybePromise, holder);
	                    }
	                }
	
	                if (!ret._isFateSealed()) {
	                    if (holder.asyncNeeded) {
	                        var domain = getDomain();
	                        if (domain !== null) {
	                            holder.fn = util.domainBind(domain, holder.fn);
	                        }
	                    }
	                    ret._setAsyncGuaranteed();
	                    ret._setOnCancel(holder);
	                }
	                return ret;
	            }
	        }
	    }
	    var $_len = arguments.length;var args = new Array($_len); for(var $_i = 0; $_i < $_len; ++$_i) {args[$_i] = arguments[$_i];};
	    if (fn) args.pop();
	    var ret = new PromiseArray(args).promise();
	    return fn !== undefined ? ret.spread(fn) : ret;
	};
	
	};


/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports = function(Promise,
	                          PromiseArray,
	                          apiRejection,
	                          tryConvertToPromise,
	                          INTERNAL,
	                          debug) {
	var getDomain = Promise._getDomain;
	var util = __webpack_require__(69);
	var tryCatch = util.tryCatch;
	var errorObj = util.errorObj;
	var async = Promise._async;
	
	function MappingPromiseArray(promises, fn, limit, _filter) {
	    this.constructor$(promises);
	    this._promise._captureStackTrace();
	    var domain = getDomain();
	    this._callback = domain === null ? fn : util.domainBind(domain, fn);
	    this._preservedValues = _filter === INTERNAL
	        ? new Array(this.length())
	        : null;
	    this._limit = limit;
	    this._inFlight = 0;
	    this._queue = [];
	    async.invoke(this._asyncInit, this, undefined);
	}
	util.inherits(MappingPromiseArray, PromiseArray);
	
	MappingPromiseArray.prototype._asyncInit = function() {
	    this._init$(undefined, -2);
	};
	
	MappingPromiseArray.prototype._init = function () {};
	
	MappingPromiseArray.prototype._promiseFulfilled = function (value, index) {
	    var values = this._values;
	    var length = this.length();
	    var preservedValues = this._preservedValues;
	    var limit = this._limit;
	
	    if (index < 0) {
	        index = (index * -1) - 1;
	        values[index] = value;
	        if (limit >= 1) {
	            this._inFlight--;
	            this._drainQueue();
	            if (this._isResolved()) return true;
	        }
	    } else {
	        if (limit >= 1 && this._inFlight >= limit) {
	            values[index] = value;
	            this._queue.push(index);
	            return false;
	        }
	        if (preservedValues !== null) preservedValues[index] = value;
	
	        var promise = this._promise;
	        var callback = this._callback;
	        var receiver = promise._boundValue();
	        promise._pushContext();
	        var ret = tryCatch(callback).call(receiver, value, index, length);
	        var promiseCreated = promise._popContext();
	        debug.checkForgottenReturns(
	            ret,
	            promiseCreated,
	            preservedValues !== null ? "Promise.filter" : "Promise.map",
	            promise
	        );
	        if (ret === errorObj) {
	            this._reject(ret.e);
	            return true;
	        }
	
	        var maybePromise = tryConvertToPromise(ret, this._promise);
	        if (maybePromise instanceof Promise) {
	            maybePromise = maybePromise._target();
	            var bitField = maybePromise._bitField;
	            ;
	            if (((bitField & 50397184) === 0)) {
	                if (limit >= 1) this._inFlight++;
	                values[index] = maybePromise;
	                maybePromise._proxy(this, (index + 1) * -1);
	                return false;
	            } else if (((bitField & 33554432) !== 0)) {
	                ret = maybePromise._value();
	            } else if (((bitField & 16777216) !== 0)) {
	                this._reject(maybePromise._reason());
	                return true;
	            } else {
	                this._cancel();
	                return true;
	            }
	        }
	        values[index] = ret;
	    }
	    var totalResolved = ++this._totalResolved;
	    if (totalResolved >= length) {
	        if (preservedValues !== null) {
	            this._filter(values, preservedValues);
	        } else {
	            this._resolve(values);
	        }
	        return true;
	    }
	    return false;
	};
	
	MappingPromiseArray.prototype._drainQueue = function () {
	    var queue = this._queue;
	    var limit = this._limit;
	    var values = this._values;
	    while (queue.length > 0 && this._inFlight < limit) {
	        if (this._isResolved()) return;
	        var index = queue.pop();
	        this._promiseFulfilled(values[index], index);
	    }
	};
	
	MappingPromiseArray.prototype._filter = function (booleans, values) {
	    var len = values.length;
	    var ret = new Array(len);
	    var j = 0;
	    for (var i = 0; i < len; ++i) {
	        if (booleans[i]) ret[j++] = values[i];
	    }
	    ret.length = j;
	    this._resolve(ret);
	};
	
	MappingPromiseArray.prototype.preservedValues = function () {
	    return this._preservedValues;
	};
	
	function map(promises, fn, options, _filter) {
	    if (typeof fn !== "function") {
	        return apiRejection("expecting a function but got " + util.classString(fn));
	    }
	
	    var limit = 0;
	    if (options !== undefined) {
	        if (typeof options === "object" && options !== null) {
	            if (typeof options.concurrency !== "number") {
	                return Promise.reject(
	                    new TypeError("'concurrency' must be a number but it is " +
	                                    util.classString(options.concurrency)));
	            }
	            limit = options.concurrency;
	        } else {
	            return Promise.reject(new TypeError(
	                            "options argument must be an object but it is " +
	                             util.classString(options)));
	        }
	    }
	    limit = typeof limit === "number" &&
	        isFinite(limit) && limit >= 1 ? limit : 0;
	    return new MappingPromiseArray(promises, fn, limit, _filter).promise();
	}
	
	Promise.prototype.map = function (fn, options) {
	    return map(this, fn, options, null);
	};
	
	Promise.map = function (promises, fn, options, _filter) {
	    return map(promises, fn, options, _filter);
	};
	
	
	};


/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var cr = Object.create;
	if (cr) {
	    var callerCache = cr(null);
	    var getterCache = cr(null);
	    callerCache[" size"] = getterCache[" size"] = 0;
	}
	
	module.exports = function(Promise) {
	var util = __webpack_require__(69);
	var canEvaluate = util.canEvaluate;
	var isIdentifier = util.isIdentifier;
	
	var getMethodCaller;
	var getGetter;
	if (true) {
	var makeMethodCaller = function (methodName) {
	    return new Function("ensureMethod", "                                    \n\
	        return function(obj) {                                               \n\
	            'use strict'                                                     \n\
	            var len = this.length;                                           \n\
	            ensureMethod(obj, 'methodName');                                 \n\
	            switch(len) {                                                    \n\
	                case 1: return obj.methodName(this[0]);                      \n\
	                case 2: return obj.methodName(this[0], this[1]);             \n\
	                case 3: return obj.methodName(this[0], this[1], this[2]);    \n\
	                case 0: return obj.methodName();                             \n\
	                default:                                                     \n\
	                    return obj.methodName.apply(obj, this);                  \n\
	            }                                                                \n\
	        };                                                                   \n\
	        ".replace(/methodName/g, methodName))(ensureMethod);
	};
	
	var makeGetter = function (propertyName) {
	    return new Function("obj", "                                             \n\
	        'use strict';                                                        \n\
	        return obj.propertyName;                                             \n\
	        ".replace("propertyName", propertyName));
	};
	
	var getCompiled = function(name, compiler, cache) {
	    var ret = cache[name];
	    if (typeof ret !== "function") {
	        if (!isIdentifier(name)) {
	            return null;
	        }
	        ret = compiler(name);
	        cache[name] = ret;
	        cache[" size"]++;
	        if (cache[" size"] > 512) {
	            var keys = Object.keys(cache);
	            for (var i = 0; i < 256; ++i) delete cache[keys[i]];
	            cache[" size"] = keys.length - 256;
	        }
	    }
	    return ret;
	};
	
	getMethodCaller = function(name) {
	    return getCompiled(name, makeMethodCaller, callerCache);
	};
	
	getGetter = function(name) {
	    return getCompiled(name, makeGetter, getterCache);
	};
	}
	
	function ensureMethod(obj, methodName) {
	    var fn;
	    if (obj != null) fn = obj[methodName];
	    if (typeof fn !== "function") {
	        var message = "Object " + util.classString(obj) + " has no method '" +
	            util.toString(methodName) + "'";
	        throw new Promise.TypeError(message);
	    }
	    return fn;
	}
	
	function caller(obj) {
	    var methodName = this.pop();
	    var fn = ensureMethod(obj, methodName);
	    return fn.apply(obj, this);
	}
	Promise.prototype.call = function (methodName) {
	    var $_len = arguments.length;var args = new Array(Math.max($_len - 1, 0)); for(var $_i = 1; $_i < $_len; ++$_i) {args[$_i - 1] = arguments[$_i];};
	    if (true) {
	        if (canEvaluate) {
	            var maybeCaller = getMethodCaller(methodName);
	            if (maybeCaller !== null) {
	                return this._then(
	                    maybeCaller, undefined, undefined, args, undefined);
	            }
	        }
	    }
	    args.push(methodName);
	    return this._then(caller, undefined, undefined, args, undefined);
	};
	
	function namedGetter(obj) {
	    return obj[this];
	}
	function indexedGetter(obj) {
	    var index = +this;
	    if (index < 0) index = Math.max(0, index + obj.length);
	    return obj[index];
	}
	Promise.prototype.get = function (propertyName) {
	    var isIndex = (typeof propertyName === "number");
	    var getter;
	    if (!isIndex) {
	        if (canEvaluate) {
	            var maybeGetter = getGetter(propertyName);
	            getter = maybeGetter !== null ? maybeGetter : namedGetter;
	        } else {
	            getter = namedGetter;
	        }
	    } else {
	        getter = indexedGetter;
	    }
	    return this._then(getter, undefined, undefined, propertyName, undefined);
	};
	};


/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports = function (Promise, apiRejection, tryConvertToPromise,
	    createContext, INTERNAL, debug) {
	    var util = __webpack_require__(69);
	    var TypeError = __webpack_require__(74).TypeError;
	    var inherits = __webpack_require__(69).inherits;
	    var errorObj = util.errorObj;
	    var tryCatch = util.tryCatch;
	    var NULL = {};
	
	    function thrower(e) {
	        setTimeout(function(){throw e;}, 0);
	    }
	
	    function castPreservingDisposable(thenable) {
	        var maybePromise = tryConvertToPromise(thenable);
	        if (maybePromise !== thenable &&
	            typeof thenable._isDisposable === "function" &&
	            typeof thenable._getDisposer === "function" &&
	            thenable._isDisposable()) {
	            maybePromise._setDisposable(thenable._getDisposer());
	        }
	        return maybePromise;
	    }
	    function dispose(resources, inspection) {
	        var i = 0;
	        var len = resources.length;
	        var ret = new Promise(INTERNAL);
	        function iterator() {
	            if (i >= len) return ret._fulfill();
	            var maybePromise = castPreservingDisposable(resources[i++]);
	            if (maybePromise instanceof Promise &&
	                maybePromise._isDisposable()) {
	                try {
	                    maybePromise = tryConvertToPromise(
	                        maybePromise._getDisposer().tryDispose(inspection),
	                        resources.promise);
	                } catch (e) {
	                    return thrower(e);
	                }
	                if (maybePromise instanceof Promise) {
	                    return maybePromise._then(iterator, thrower,
	                                              null, null, null);
	                }
	            }
	            iterator();
	        }
	        iterator();
	        return ret;
	    }
	
	    function Disposer(data, promise, context) {
	        this._data = data;
	        this._promise = promise;
	        this._context = context;
	    }
	
	    Disposer.prototype.data = function () {
	        return this._data;
	    };
	
	    Disposer.prototype.promise = function () {
	        return this._promise;
	    };
	
	    Disposer.prototype.resource = function () {
	        if (this.promise().isFulfilled()) {
	            return this.promise().value();
	        }
	        return NULL;
	    };
	
	    Disposer.prototype.tryDispose = function(inspection) {
	        var resource = this.resource();
	        var context = this._context;
	        if (context !== undefined) context._pushContext();
	        var ret = resource !== NULL
	            ? this.doDispose(resource, inspection) : null;
	        if (context !== undefined) context._popContext();
	        this._promise._unsetDisposable();
	        this._data = null;
	        return ret;
	    };
	
	    Disposer.isDisposer = function (d) {
	        return (d != null &&
	                typeof d.resource === "function" &&
	                typeof d.tryDispose === "function");
	    };
	
	    function FunctionDisposer(fn, promise, context) {
	        this.constructor$(fn, promise, context);
	    }
	    inherits(FunctionDisposer, Disposer);
	
	    FunctionDisposer.prototype.doDispose = function (resource, inspection) {
	        var fn = this.data();
	        return fn.call(resource, resource, inspection);
	    };
	
	    function maybeUnwrapDisposer(value) {
	        if (Disposer.isDisposer(value)) {
	            this.resources[this.index]._setDisposable(value);
	            return value.promise();
	        }
	        return value;
	    }
	
	    function ResourceList(length) {
	        this.length = length;
	        this.promise = null;
	        this[length-1] = null;
	    }
	
	    ResourceList.prototype._resultCancelled = function() {
	        var len = this.length;
	        for (var i = 0; i < len; ++i) {
	            var item = this[i];
	            if (item instanceof Promise) {
	                item.cancel();
	            }
	        }
	    };
	
	    Promise.using = function () {
	        var len = arguments.length;
	        if (len < 2) return apiRejection(
	                        "you must pass at least 2 arguments to Promise.using");
	        var fn = arguments[len - 1];
	        if (typeof fn !== "function") {
	            return apiRejection("expecting a function but got " + util.classString(fn));
	        }
	        var input;
	        var spreadArgs = true;
	        if (len === 2 && Array.isArray(arguments[0])) {
	            input = arguments[0];
	            len = input.length;
	            spreadArgs = false;
	        } else {
	            input = arguments;
	            len--;
	        }
	        var resources = new ResourceList(len);
	        for (var i = 0; i < len; ++i) {
	            var resource = input[i];
	            if (Disposer.isDisposer(resource)) {
	                var disposer = resource;
	                resource = resource.promise();
	                resource._setDisposable(disposer);
	            } else {
	                var maybePromise = tryConvertToPromise(resource);
	                if (maybePromise instanceof Promise) {
	                    resource =
	                        maybePromise._then(maybeUnwrapDisposer, null, null, {
	                            resources: resources,
	                            index: i
	                    }, undefined);
	                }
	            }
	            resources[i] = resource;
	        }
	
	        var reflectedResources = new Array(resources.length);
	        for (var i = 0; i < reflectedResources.length; ++i) {
	            reflectedResources[i] = Promise.resolve(resources[i]).reflect();
	        }
	
	        var resultPromise = Promise.all(reflectedResources)
	            .then(function(inspections) {
	                for (var i = 0; i < inspections.length; ++i) {
	                    var inspection = inspections[i];
	                    if (inspection.isRejected()) {
	                        errorObj.e = inspection.error();
	                        return errorObj;
	                    } else if (!inspection.isFulfilled()) {
	                        resultPromise.cancel();
	                        return;
	                    }
	                    inspections[i] = inspection.value();
	                }
	                promise._pushContext();
	
	                fn = tryCatch(fn);
	                var ret = spreadArgs
	                    ? fn.apply(undefined, inspections) : fn(inspections);
	                var promiseCreated = promise._popContext();
	                debug.checkForgottenReturns(
	                    ret, promiseCreated, "Promise.using", promise);
	                return ret;
	            });
	
	        var promise = resultPromise.lastly(function() {
	            var inspection = new Promise.PromiseInspection(resultPromise);
	            return dispose(resources, inspection);
	        });
	        resources.promise = promise;
	        promise._setOnCancel(resources);
	        return promise;
	    };
	
	    Promise.prototype._setDisposable = function (disposer) {
	        this._bitField = this._bitField | 131072;
	        this._disposer = disposer;
	    };
	
	    Promise.prototype._isDisposable = function () {
	        return (this._bitField & 131072) > 0;
	    };
	
	    Promise.prototype._getDisposer = function () {
	        return this._disposer;
	    };
	
	    Promise.prototype._unsetDisposable = function () {
	        this._bitField = this._bitField & (~131072);
	        this._disposer = undefined;
	    };
	
	    Promise.prototype.disposer = function (fn) {
	        if (typeof fn === "function") {
	            return new FunctionDisposer(fn, this, createContext());
	        }
	        throw new TypeError();
	    };
	
	};


/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports = function(Promise, INTERNAL, debug) {
	var util = __webpack_require__(69);
	var TimeoutError = Promise.TimeoutError;
	
	function HandleWrapper(handle)  {
	    this.handle = handle;
	}
	
	HandleWrapper.prototype._resultCancelled = function() {
	    clearTimeout(this.handle);
	};
	
	var afterValue = function(value) { return delay(+this).thenReturn(value); };
	var delay = Promise.delay = function (ms, value) {
	    var ret;
	    var handle;
	    if (value !== undefined) {
	        ret = Promise.resolve(value)
	                ._then(afterValue, null, null, ms, undefined);
	        if (debug.cancellation() && value instanceof Promise) {
	            ret._setOnCancel(value);
	        }
	    } else {
	        ret = new Promise(INTERNAL);
	        handle = setTimeout(function() { ret._fulfill(); }, +ms);
	        if (debug.cancellation()) {
	            ret._setOnCancel(new HandleWrapper(handle));
	        }
	        ret._captureStackTrace();
	    }
	    ret._setAsyncGuaranteed();
	    return ret;
	};
	
	Promise.prototype.delay = function (ms) {
	    return delay(ms, this);
	};
	
	var afterTimeout = function (promise, message, parent) {
	    var err;
	    if (typeof message !== "string") {
	        if (message instanceof Error) {
	            err = message;
	        } else {
	            err = new TimeoutError("operation timed out");
	        }
	    } else {
	        err = new TimeoutError(message);
	    }
	    util.markAsOriginatingFromRejection(err);
	    promise._attachExtraTrace(err);
	    promise._reject(err);
	
	    if (parent != null) {
	        parent.cancel();
	    }
	};
	
	function successClear(value) {
	    clearTimeout(this.handle);
	    return value;
	}
	
	function failureClear(reason) {
	    clearTimeout(this.handle);
	    throw reason;
	}
	
	Promise.prototype.timeout = function (ms, message) {
	    ms = +ms;
	    var ret, parent;
	
	    var handleWrapper = new HandleWrapper(setTimeout(function timeoutTimeout() {
	        if (ret.isPending()) {
	            afterTimeout(ret, message, parent);
	        }
	    }, ms));
	
	    if (debug.cancellation()) {
	        parent = this.then();
	        ret = parent._then(successClear, failureClear,
	                            undefined, handleWrapper, undefined);
	        ret._setOnCancel(handleWrapper);
	    } else {
	        ret = this._then(successClear, failureClear,
	                            undefined, handleWrapper, undefined);
	    }
	
	    return ret;
	};
	
	};


/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports = function(Promise,
	                          apiRejection,
	                          INTERNAL,
	                          tryConvertToPromise,
	                          Proxyable,
	                          debug) {
	var errors = __webpack_require__(74);
	var TypeError = errors.TypeError;
	var util = __webpack_require__(69);
	var errorObj = util.errorObj;
	var tryCatch = util.tryCatch;
	var yieldHandlers = [];
	
	function promiseFromYieldHandler(value, yieldHandlers, traceParent) {
	    for (var i = 0; i < yieldHandlers.length; ++i) {
	        traceParent._pushContext();
	        var result = tryCatch(yieldHandlers[i])(value);
	        traceParent._popContext();
	        if (result === errorObj) {
	            traceParent._pushContext();
	            var ret = Promise.reject(errorObj.e);
	            traceParent._popContext();
	            return ret;
	        }
	        var maybePromise = tryConvertToPromise(result, traceParent);
	        if (maybePromise instanceof Promise) return maybePromise;
	    }
	    return null;
	}
	
	function PromiseSpawn(generatorFunction, receiver, yieldHandler, stack) {
	    if (debug.cancellation()) {
	        var internal = new Promise(INTERNAL);
	        var _finallyPromise = this._finallyPromise = new Promise(INTERNAL);
	        this._promise = internal.lastly(function() {
	            return _finallyPromise;
	        });
	        internal._captureStackTrace();
	        internal._setOnCancel(this);
	    } else {
	        var promise = this._promise = new Promise(INTERNAL);
	        promise._captureStackTrace();
	    }
	    this._stack = stack;
	    this._generatorFunction = generatorFunction;
	    this._receiver = receiver;
	    this._generator = undefined;
	    this._yieldHandlers = typeof yieldHandler === "function"
	        ? [yieldHandler].concat(yieldHandlers)
	        : yieldHandlers;
	    this._yieldedPromise = null;
	    this._cancellationPhase = false;
	}
	util.inherits(PromiseSpawn, Proxyable);
	
	PromiseSpawn.prototype._isResolved = function() {
	    return this._promise === null;
	};
	
	PromiseSpawn.prototype._cleanup = function() {
	    this._promise = this._generator = null;
	    if (debug.cancellation() && this._finallyPromise !== null) {
	        this._finallyPromise._fulfill();
	        this._finallyPromise = null;
	    }
	};
	
	PromiseSpawn.prototype._promiseCancelled = function() {
	    if (this._isResolved()) return;
	    var implementsReturn = typeof this._generator["return"] !== "undefined";
	
	    var result;
	    if (!implementsReturn) {
	        var reason = new Promise.CancellationError(
	            "generator .return() sentinel");
	        Promise.coroutine.returnSentinel = reason;
	        this._promise._attachExtraTrace(reason);
	        this._promise._pushContext();
	        result = tryCatch(this._generator["throw"]).call(this._generator,
	                                                         reason);
	        this._promise._popContext();
	    } else {
	        this._promise._pushContext();
	        result = tryCatch(this._generator["return"]).call(this._generator,
	                                                          undefined);
	        this._promise._popContext();
	    }
	    this._cancellationPhase = true;
	    this._yieldedPromise = null;
	    this._continue(result);
	};
	
	PromiseSpawn.prototype._promiseFulfilled = function(value) {
	    this._yieldedPromise = null;
	    this._promise._pushContext();
	    var result = tryCatch(this._generator.next).call(this._generator, value);
	    this._promise._popContext();
	    this._continue(result);
	};
	
	PromiseSpawn.prototype._promiseRejected = function(reason) {
	    this._yieldedPromise = null;
	    this._promise._attachExtraTrace(reason);
	    this._promise._pushContext();
	    var result = tryCatch(this._generator["throw"])
	        .call(this._generator, reason);
	    this._promise._popContext();
	    this._continue(result);
	};
	
	PromiseSpawn.prototype._resultCancelled = function() {
	    if (this._yieldedPromise instanceof Promise) {
	        var promise = this._yieldedPromise;
	        this._yieldedPromise = null;
	        promise.cancel();
	    }
	};
	
	PromiseSpawn.prototype.promise = function () {
	    return this._promise;
	};
	
	PromiseSpawn.prototype._run = function () {
	    this._generator = this._generatorFunction.call(this._receiver);
	    this._receiver =
	        this._generatorFunction = undefined;
	    this._promiseFulfilled(undefined);
	};
	
	PromiseSpawn.prototype._continue = function (result) {
	    var promise = this._promise;
	    if (result === errorObj) {
	        this._cleanup();
	        if (this._cancellationPhase) {
	            return promise.cancel();
	        } else {
	            return promise._rejectCallback(result.e, false);
	        }
	    }
	
	    var value = result.value;
	    if (result.done === true) {
	        this._cleanup();
	        if (this._cancellationPhase) {
	            return promise.cancel();
	        } else {
	            return promise._resolveCallback(value);
	        }
	    } else {
	        var maybePromise = tryConvertToPromise(value, this._promise);
	        if (!(maybePromise instanceof Promise)) {
	            maybePromise =
	                promiseFromYieldHandler(maybePromise,
	                                        this._yieldHandlers,
	                                        this._promise);
	            if (maybePromise === null) {
	                this._promiseRejected(
	                    new TypeError(
	                        "A value %s was yielded that could not be treated as a promise\u000a\u000a    See http://goo.gl/MqrFmX\u000a\u000a".replace("%s", value) +
	                        "From coroutine:\u000a" +
	                        this._stack.split("\n").slice(1, -7).join("\n")
	                    )
	                );
	                return;
	            }
	        }
	        maybePromise = maybePromise._target();
	        var bitField = maybePromise._bitField;
	        ;
	        if (((bitField & 50397184) === 0)) {
	            this._yieldedPromise = maybePromise;
	            maybePromise._proxy(this, null);
	        } else if (((bitField & 33554432) !== 0)) {
	            Promise._async.invoke(
	                this._promiseFulfilled, this, maybePromise._value()
	            );
	        } else if (((bitField & 16777216) !== 0)) {
	            Promise._async.invoke(
	                this._promiseRejected, this, maybePromise._reason()
	            );
	        } else {
	            this._promiseCancelled();
	        }
	    }
	};
	
	Promise.coroutine = function (generatorFunction, options) {
	    if (typeof generatorFunction !== "function") {
	        throw new TypeError("generatorFunction must be a function\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
	    }
	    var yieldHandler = Object(options).yieldHandler;
	    var PromiseSpawn$ = PromiseSpawn;
	    var stack = new Error().stack;
	    return function () {
	        var generator = generatorFunction.apply(this, arguments);
	        var spawn = new PromiseSpawn$(undefined, undefined, yieldHandler,
	                                      stack);
	        var ret = spawn.promise();
	        spawn._generator = generator;
	        spawn._promiseFulfilled(undefined);
	        return ret;
	    };
	};
	
	Promise.coroutine.addYieldHandler = function(fn) {
	    if (typeof fn !== "function") {
	        throw new TypeError("expecting a function but got " + util.classString(fn));
	    }
	    yieldHandlers.push(fn);
	};
	
	Promise.spawn = function (generatorFunction) {
	    debug.deprecated("Promise.spawn()", "Promise.coroutine()");
	    if (typeof generatorFunction !== "function") {
	        return apiRejection("generatorFunction must be a function\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
	    }
	    var spawn = new PromiseSpawn(generatorFunction, this);
	    var ret = spawn.promise();
	    spawn._run(Promise.spawn);
	    return ret;
	};
	};


/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports = function(Promise) {
	var util = __webpack_require__(69);
	var async = Promise._async;
	var tryCatch = util.tryCatch;
	var errorObj = util.errorObj;
	
	function spreadAdapter(val, nodeback) {
	    var promise = this;
	    if (!util.isArray(val)) return successAdapter.call(promise, val, nodeback);
	    var ret =
	        tryCatch(nodeback).apply(promise._boundValue(), [null].concat(val));
	    if (ret === errorObj) {
	        async.throwLater(ret.e);
	    }
	}
	
	function successAdapter(val, nodeback) {
	    var promise = this;
	    var receiver = promise._boundValue();
	    var ret = val === undefined
	        ? tryCatch(nodeback).call(receiver, null)
	        : tryCatch(nodeback).call(receiver, null, val);
	    if (ret === errorObj) {
	        async.throwLater(ret.e);
	    }
	}
	function errorAdapter(reason, nodeback) {
	    var promise = this;
	    if (!reason) {
	        var newReason = new Error(reason + "");
	        newReason.cause = reason;
	        reason = newReason;
	    }
	    var ret = tryCatch(nodeback).call(promise._boundValue(), reason);
	    if (ret === errorObj) {
	        async.throwLater(ret.e);
	    }
	}
	
	Promise.prototype.asCallback = Promise.prototype.nodeify = function (nodeback,
	                                                                     options) {
	    if (typeof nodeback == "function") {
	        var adapter = successAdapter;
	        if (options !== undefined && Object(options).spread) {
	            adapter = spreadAdapter;
	        }
	        this._then(
	            adapter,
	            errorAdapter,
	            undefined,
	            this,
	            nodeback
	        );
	    }
	    return this;
	};
	};


/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports = function(Promise, INTERNAL) {
	var THIS = {};
	var util = __webpack_require__(69);
	var nodebackForPromise = __webpack_require__(81);
	var withAppended = util.withAppended;
	var maybeWrapAsError = util.maybeWrapAsError;
	var canEvaluate = util.canEvaluate;
	var TypeError = __webpack_require__(74).TypeError;
	var defaultSuffix = "Async";
	var defaultPromisified = {__isPromisified__: true};
	var noCopyProps = [
	    "arity",    "length",
	    "name",
	    "arguments",
	    "caller",
	    "callee",
	    "prototype",
	    "__isPromisified__"
	];
	var noCopyPropsPattern = new RegExp("^(?:" + noCopyProps.join("|") + ")$");
	
	var defaultFilter = function(name) {
	    return util.isIdentifier(name) &&
	        name.charAt(0) !== "_" &&
	        name !== "constructor";
	};
	
	function propsFilter(key) {
	    return !noCopyPropsPattern.test(key);
	}
	
	function isPromisified(fn) {
	    try {
	        return fn.__isPromisified__ === true;
	    }
	    catch (e) {
	        return false;
	    }
	}
	
	function hasPromisified(obj, key, suffix) {
	    var val = util.getDataPropertyOrDefault(obj, key + suffix,
	                                            defaultPromisified);
	    return val ? isPromisified(val) : false;
	}
	function checkValid(ret, suffix, suffixRegexp) {
	    for (var i = 0; i < ret.length; i += 2) {
	        var key = ret[i];
	        if (suffixRegexp.test(key)) {
	            var keyWithoutAsyncSuffix = key.replace(suffixRegexp, "");
	            for (var j = 0; j < ret.length; j += 2) {
	                if (ret[j] === keyWithoutAsyncSuffix) {
	                    throw new TypeError("Cannot promisify an API that has normal methods with '%s'-suffix\u000a\u000a    See http://goo.gl/MqrFmX\u000a"
	                        .replace("%s", suffix));
	                }
	            }
	        }
	    }
	}
	
	function promisifiableMethods(obj, suffix, suffixRegexp, filter) {
	    var keys = util.inheritedDataKeys(obj);
	    var ret = [];
	    for (var i = 0; i < keys.length; ++i) {
	        var key = keys[i];
	        var value = obj[key];
	        var passesDefaultFilter = filter === defaultFilter
	            ? true : defaultFilter(key, value, obj);
	        if (typeof value === "function" &&
	            !isPromisified(value) &&
	            !hasPromisified(obj, key, suffix) &&
	            filter(key, value, obj, passesDefaultFilter)) {
	            ret.push(key, value);
	        }
	    }
	    checkValid(ret, suffix, suffixRegexp);
	    return ret;
	}
	
	var escapeIdentRegex = function(str) {
	    return str.replace(/([$])/, "\\$");
	};
	
	var makeNodePromisifiedEval;
	if (true) {
	var switchCaseArgumentOrder = function(likelyArgumentCount) {
	    var ret = [likelyArgumentCount];
	    var min = Math.max(0, likelyArgumentCount - 1 - 3);
	    for(var i = likelyArgumentCount - 1; i >= min; --i) {
	        ret.push(i);
	    }
	    for(var i = likelyArgumentCount + 1; i <= 3; ++i) {
	        ret.push(i);
	    }
	    return ret;
	};
	
	var argumentSequence = function(argumentCount) {
	    return util.filledRange(argumentCount, "_arg", "");
	};
	
	var parameterDeclaration = function(parameterCount) {
	    return util.filledRange(
	        Math.max(parameterCount, 3), "_arg", "");
	};
	
	var parameterCount = function(fn) {
	    if (typeof fn.length === "number") {
	        return Math.max(Math.min(fn.length, 1023 + 1), 0);
	    }
	    return 0;
	};
	
	makeNodePromisifiedEval =
	function(callback, receiver, originalName, fn, _, multiArgs) {
	    var newParameterCount = Math.max(0, parameterCount(fn) - 1);
	    var argumentOrder = switchCaseArgumentOrder(newParameterCount);
	    var shouldProxyThis = typeof callback === "string" || receiver === THIS;
	
	    function generateCallForArgumentCount(count) {
	        var args = argumentSequence(count).join(", ");
	        var comma = count > 0 ? ", " : "";
	        var ret;
	        if (shouldProxyThis) {
	            ret = "ret = callback.call(this, {{args}}, nodeback); break;\n";
	        } else {
	            ret = receiver === undefined
	                ? "ret = callback({{args}}, nodeback); break;\n"
	                : "ret = callback.call(receiver, {{args}}, nodeback); break;\n";
	        }
	        return ret.replace("{{args}}", args).replace(", ", comma);
	    }
	
	    function generateArgumentSwitchCase() {
	        var ret = "";
	        for (var i = 0; i < argumentOrder.length; ++i) {
	            ret += "case " + argumentOrder[i] +":" +
	                generateCallForArgumentCount(argumentOrder[i]);
	        }
	
	        ret += "                                                             \n\
	        default:                                                             \n\
	            var args = new Array(len + 1);                                   \n\
	            var i = 0;                                                       \n\
	            for (var i = 0; i < len; ++i) {                                  \n\
	               args[i] = arguments[i];                                       \n\
	            }                                                                \n\
	            args[i] = nodeback;                                              \n\
	            [CodeForCall]                                                    \n\
	            break;                                                           \n\
	        ".replace("[CodeForCall]", (shouldProxyThis
	                                ? "ret = callback.apply(this, args);\n"
	                                : "ret = callback.apply(receiver, args);\n"));
	        return ret;
	    }
	
	    var getFunctionCode = typeof callback === "string"
	                                ? ("this != null ? this['"+callback+"'] : fn")
	                                : "fn";
	    var body = "'use strict';                                                \n\
	        var ret = function (Parameters) {                                    \n\
	            'use strict';                                                    \n\
	            var len = arguments.length;                                      \n\
	            var promise = new Promise(INTERNAL);                             \n\
	            promise._captureStackTrace();                                    \n\
	            var nodeback = nodebackForPromise(promise, " + multiArgs + ");   \n\
	            var ret;                                                         \n\
	            var callback = tryCatch([GetFunctionCode]);                      \n\
	            switch(len) {                                                    \n\
	                [CodeForSwitchCase]                                          \n\
	            }                                                                \n\
	            if (ret === errorObj) {                                          \n\
	                promise._rejectCallback(maybeWrapAsError(ret.e), true, true);\n\
	            }                                                                \n\
	            if (!promise._isFateSealed()) promise._setAsyncGuaranteed();     \n\
	            return promise;                                                  \n\
	        };                                                                   \n\
	        notEnumerableProp(ret, '__isPromisified__', true);                   \n\
	        return ret;                                                          \n\
	    ".replace("[CodeForSwitchCase]", generateArgumentSwitchCase())
	        .replace("[GetFunctionCode]", getFunctionCode);
	    body = body.replace("Parameters", parameterDeclaration(newParameterCount));
	    return new Function("Promise",
	                        "fn",
	                        "receiver",
	                        "withAppended",
	                        "maybeWrapAsError",
	                        "nodebackForPromise",
	                        "tryCatch",
	                        "errorObj",
	                        "notEnumerableProp",
	                        "INTERNAL",
	                        body)(
	                    Promise,
	                    fn,
	                    receiver,
	                    withAppended,
	                    maybeWrapAsError,
	                    nodebackForPromise,
	                    util.tryCatch,
	                    util.errorObj,
	                    util.notEnumerableProp,
	                    INTERNAL);
	};
	}
	
	function makeNodePromisifiedClosure(callback, receiver, _, fn, __, multiArgs) {
	    var defaultThis = (function() {return this;})();
	    var method = callback;
	    if (typeof method === "string") {
	        callback = fn;
	    }
	    function promisified() {
	        var _receiver = receiver;
	        if (receiver === THIS) _receiver = this;
	        var promise = new Promise(INTERNAL);
	        promise._captureStackTrace();
	        var cb = typeof method === "string" && this !== defaultThis
	            ? this[method] : callback;
	        var fn = nodebackForPromise(promise, multiArgs);
	        try {
	            cb.apply(_receiver, withAppended(arguments, fn));
	        } catch(e) {
	            promise._rejectCallback(maybeWrapAsError(e), true, true);
	        }
	        if (!promise._isFateSealed()) promise._setAsyncGuaranteed();
	        return promise;
	    }
	    util.notEnumerableProp(promisified, "__isPromisified__", true);
	    return promisified;
	}
	
	var makeNodePromisified = canEvaluate
	    ? makeNodePromisifiedEval
	    : makeNodePromisifiedClosure;
	
	function promisifyAll(obj, suffix, filter, promisifier, multiArgs) {
	    var suffixRegexp = new RegExp(escapeIdentRegex(suffix) + "$");
	    var methods =
	        promisifiableMethods(obj, suffix, suffixRegexp, filter);
	
	    for (var i = 0, len = methods.length; i < len; i+= 2) {
	        var key = methods[i];
	        var fn = methods[i+1];
	        var promisifiedKey = key + suffix;
	        if (promisifier === makeNodePromisified) {
	            obj[promisifiedKey] =
	                makeNodePromisified(key, THIS, key, fn, suffix, multiArgs);
	        } else {
	            var promisified = promisifier(fn, function() {
	                return makeNodePromisified(key, THIS, key,
	                                           fn, suffix, multiArgs);
	            });
	            util.notEnumerableProp(promisified, "__isPromisified__", true);
	            obj[promisifiedKey] = promisified;
	        }
	    }
	    util.toFastProperties(obj);
	    return obj;
	}
	
	function promisify(callback, receiver, multiArgs) {
	    return makeNodePromisified(callback, receiver, undefined,
	                                callback, null, multiArgs);
	}
	
	Promise.promisify = function (fn, options) {
	    if (typeof fn !== "function") {
	        throw new TypeError("expecting a function but got " + util.classString(fn));
	    }
	    if (isPromisified(fn)) {
	        return fn;
	    }
	    options = Object(options);
	    var receiver = options.context === undefined ? THIS : options.context;
	    var multiArgs = !!options.multiArgs;
	    var ret = promisify(fn, receiver, multiArgs);
	    util.copyDescriptors(fn, ret, propsFilter);
	    return ret;
	};
	
	Promise.promisifyAll = function (target, options) {
	    if (typeof target !== "function" && typeof target !== "object") {
	        throw new TypeError("the target of promisifyAll must be an object or a function\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
	    }
	    options = Object(options);
	    var multiArgs = !!options.multiArgs;
	    var suffix = options.suffix;
	    if (typeof suffix !== "string") suffix = defaultSuffix;
	    var filter = options.filter;
	    if (typeof filter !== "function") filter = defaultFilter;
	    var promisifier = options.promisifier;
	    if (typeof promisifier !== "function") promisifier = makeNodePromisified;
	
	    if (!util.isIdentifier(suffix)) {
	        throw new RangeError("suffix must be a valid identifier\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
	    }
	
	    var keys = util.inheritedDataKeys(target);
	    for (var i = 0; i < keys.length; ++i) {
	        var value = target[keys[i]];
	        if (keys[i] !== "constructor" &&
	            util.isClass(value)) {
	            promisifyAll(value.prototype, suffix, filter, promisifier,
	                multiArgs);
	            promisifyAll(value, suffix, filter, promisifier, multiArgs);
	        }
	    }
	
	    return promisifyAll(target, suffix, filter, promisifier, multiArgs);
	};
	};
	


/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports = function(
	    Promise, PromiseArray, tryConvertToPromise, apiRejection) {
	var util = __webpack_require__(69);
	var isObject = util.isObject;
	var es5 = __webpack_require__(70);
	var Es6Map;
	if (typeof Map === "function") Es6Map = Map;
	
	var mapToEntries = (function() {
	    var index = 0;
	    var size = 0;
	
	    function extractEntry(value, key) {
	        this[index] = value;
	        this[index + size] = key;
	        index++;
	    }
	
	    return function mapToEntries(map) {
	        size = map.size;
	        index = 0;
	        var ret = new Array(map.size * 2);
	        map.forEach(extractEntry, ret);
	        return ret;
	    };
	})();
	
	var entriesToMap = function(entries) {
	    var ret = new Es6Map();
	    var length = entries.length / 2 | 0;
	    for (var i = 0; i < length; ++i) {
	        var key = entries[length + i];
	        var value = entries[i];
	        ret.set(key, value);
	    }
	    return ret;
	};
	
	function PropertiesPromiseArray(obj) {
	    var isMap = false;
	    var entries;
	    if (Es6Map !== undefined && obj instanceof Es6Map) {
	        entries = mapToEntries(obj);
	        isMap = true;
	    } else {
	        var keys = es5.keys(obj);
	        var len = keys.length;
	        entries = new Array(len * 2);
	        for (var i = 0; i < len; ++i) {
	            var key = keys[i];
	            entries[i] = obj[key];
	            entries[i + len] = key;
	        }
	    }
	    this.constructor$(entries);
	    this._isMap = isMap;
	    this._init$(undefined, -3);
	}
	util.inherits(PropertiesPromiseArray, PromiseArray);
	
	PropertiesPromiseArray.prototype._init = function () {};
	
	PropertiesPromiseArray.prototype._promiseFulfilled = function (value, index) {
	    this._values[index] = value;
	    var totalResolved = ++this._totalResolved;
	    if (totalResolved >= this._length) {
	        var val;
	        if (this._isMap) {
	            val = entriesToMap(this._values);
	        } else {
	            val = {};
	            var keyOffset = this.length();
	            for (var i = 0, len = this.length(); i < len; ++i) {
	                val[this._values[i + keyOffset]] = this._values[i];
	            }
	        }
	        this._resolve(val);
	        return true;
	    }
	    return false;
	};
	
	PropertiesPromiseArray.prototype.shouldCopyValues = function () {
	    return false;
	};
	
	PropertiesPromiseArray.prototype.getActualLength = function (len) {
	    return len >> 1;
	};
	
	function props(promises) {
	    var ret;
	    var castValue = tryConvertToPromise(promises);
	
	    if (!isObject(castValue)) {
	        return apiRejection("cannot await properties of a non-object\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
	    } else if (castValue instanceof Promise) {
	        ret = castValue._then(
	            Promise.props, undefined, undefined, undefined, undefined);
	    } else {
	        ret = new PropertiesPromiseArray(castValue).promise();
	    }
	
	    if (castValue instanceof Promise) {
	        ret._propagateFrom(castValue, 2);
	    }
	    return ret;
	}
	
	Promise.prototype.props = function () {
	    return props(this);
	};
	
	Promise.props = function (promises) {
	    return props(promises);
	};
	};


/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports = function(
	    Promise, INTERNAL, tryConvertToPromise, apiRejection) {
	var util = __webpack_require__(69);
	
	var raceLater = function (promise) {
	    return promise.then(function(array) {
	        return race(array, promise);
	    });
	};
	
	function race(promises, parent) {
	    var maybePromise = tryConvertToPromise(promises);
	
	    if (maybePromise instanceof Promise) {
	        return raceLater(maybePromise);
	    } else {
	        promises = util.asArray(promises);
	        if (promises === null)
	            return apiRejection("expecting an array or an iterable object but got " + util.classString(promises));
	    }
	
	    var ret = new Promise(INTERNAL);
	    if (parent !== undefined) {
	        ret._propagateFrom(parent, 3);
	    }
	    var fulfill = ret._fulfill;
	    var reject = ret._reject;
	    for (var i = 0, len = promises.length; i < len; ++i) {
	        var val = promises[i];
	
	        if (val === undefined && !(i in promises)) {
	            continue;
	        }
	
	        Promise.cast(val)._then(fulfill, reject, undefined, ret, null);
	    }
	    return ret;
	}
	
	Promise.race = function (promises) {
	    return race(promises, undefined);
	};
	
	Promise.prototype.race = function () {
	    return race(this, undefined);
	};
	
	};


/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports = function(Promise,
	                          PromiseArray,
	                          apiRejection,
	                          tryConvertToPromise,
	                          INTERNAL,
	                          debug) {
	var getDomain = Promise._getDomain;
	var util = __webpack_require__(69);
	var tryCatch = util.tryCatch;
	
	function ReductionPromiseArray(promises, fn, initialValue, _each) {
	    this.constructor$(promises);
	    var domain = getDomain();
	    this._fn = domain === null ? fn : util.domainBind(domain, fn);
	    if (initialValue !== undefined) {
	        initialValue = Promise.resolve(initialValue);
	        initialValue._attachCancellationCallback(this);
	    }
	    this._initialValue = initialValue;
	    this._currentCancellable = null;
	    if(_each === INTERNAL) {
	        this._eachValues = Array(this._length);
	    } else if (_each === 0) {
	        this._eachValues = null;
	    } else {
	        this._eachValues = undefined;
	    }
	    this._promise._captureStackTrace();
	    this._init$(undefined, -5);
	}
	util.inherits(ReductionPromiseArray, PromiseArray);
	
	ReductionPromiseArray.prototype._gotAccum = function(accum) {
	    if (this._eachValues !== undefined && 
	        this._eachValues !== null && 
	        accum !== INTERNAL) {
	        this._eachValues.push(accum);
	    }
	};
	
	ReductionPromiseArray.prototype._eachComplete = function(value) {
	    if (this._eachValues !== null) {
	        this._eachValues.push(value);
	    }
	    return this._eachValues;
	};
	
	ReductionPromiseArray.prototype._init = function() {};
	
	ReductionPromiseArray.prototype._resolveEmptyArray = function() {
	    this._resolve(this._eachValues !== undefined ? this._eachValues
	                                                 : this._initialValue);
	};
	
	ReductionPromiseArray.prototype.shouldCopyValues = function () {
	    return false;
	};
	
	ReductionPromiseArray.prototype._resolve = function(value) {
	    this._promise._resolveCallback(value);
	    this._values = null;
	};
	
	ReductionPromiseArray.prototype._resultCancelled = function(sender) {
	    if (sender === this._initialValue) return this._cancel();
	    if (this._isResolved()) return;
	    this._resultCancelled$();
	    if (this._currentCancellable instanceof Promise) {
	        this._currentCancellable.cancel();
	    }
	    if (this._initialValue instanceof Promise) {
	        this._initialValue.cancel();
	    }
	};
	
	ReductionPromiseArray.prototype._iterate = function (values) {
	    this._values = values;
	    var value;
	    var i;
	    var length = values.length;
	    if (this._initialValue !== undefined) {
	        value = this._initialValue;
	        i = 0;
	    } else {
	        value = Promise.resolve(values[0]);
	        i = 1;
	    }
	
	    this._currentCancellable = value;
	
	    if (!value.isRejected()) {
	        for (; i < length; ++i) {
	            var ctx = {
	                accum: null,
	                value: values[i],
	                index: i,
	                length: length,
	                array: this
	            };
	            value = value._then(gotAccum, undefined, undefined, ctx, undefined);
	        }
	    }
	
	    if (this._eachValues !== undefined) {
	        value = value
	            ._then(this._eachComplete, undefined, undefined, this, undefined);
	    }
	    value._then(completed, completed, undefined, value, this);
	};
	
	Promise.prototype.reduce = function (fn, initialValue) {
	    return reduce(this, fn, initialValue, null);
	};
	
	Promise.reduce = function (promises, fn, initialValue, _each) {
	    return reduce(promises, fn, initialValue, _each);
	};
	
	function completed(valueOrReason, array) {
	    if (this.isFulfilled()) {
	        array._resolve(valueOrReason);
	    } else {
	        array._reject(valueOrReason);
	    }
	}
	
	function reduce(promises, fn, initialValue, _each) {
	    if (typeof fn !== "function") {
	        return apiRejection("expecting a function but got " + util.classString(fn));
	    }
	    var array = new ReductionPromiseArray(promises, fn, initialValue, _each);
	    return array.promise();
	}
	
	function gotAccum(accum) {
	    this.accum = accum;
	    this.array._gotAccum(accum);
	    var value = tryConvertToPromise(this.value, this.array._promise);
	    if (value instanceof Promise) {
	        this.array._currentCancellable = value;
	        return value._then(gotValue, undefined, undefined, this, undefined);
	    } else {
	        return gotValue.call(this, value);
	    }
	}
	
	function gotValue(value) {
	    var array = this.array;
	    var promise = array._promise;
	    var fn = tryCatch(array._fn);
	    promise._pushContext();
	    var ret;
	    if (array._eachValues !== undefined) {
	        ret = fn.call(promise._boundValue(), value, this.index, this.length);
	    } else {
	        ret = fn.call(promise._boundValue(),
	                              this.accum, value, this.index, this.length);
	    }
	    if (ret instanceof Promise) {
	        array._currentCancellable = ret;
	    }
	    var promiseCreated = promise._popContext();
	    debug.checkForgottenReturns(
	        ret,
	        promiseCreated,
	        array._eachValues !== undefined ? "Promise.each" : "Promise.reduce",
	        promise
	    );
	    return ret;
	}
	};


/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports =
	    function(Promise, PromiseArray, debug) {
	var PromiseInspection = Promise.PromiseInspection;
	var util = __webpack_require__(69);
	
	function SettledPromiseArray(values) {
	    this.constructor$(values);
	}
	util.inherits(SettledPromiseArray, PromiseArray);
	
	SettledPromiseArray.prototype._promiseResolved = function (index, inspection) {
	    this._values[index] = inspection;
	    var totalResolved = ++this._totalResolved;
	    if (totalResolved >= this._length) {
	        this._resolve(this._values);
	        return true;
	    }
	    return false;
	};
	
	SettledPromiseArray.prototype._promiseFulfilled = function (value, index) {
	    var ret = new PromiseInspection();
	    ret._bitField = 33554432;
	    ret._settledValueField = value;
	    return this._promiseResolved(index, ret);
	};
	SettledPromiseArray.prototype._promiseRejected = function (reason, index) {
	    var ret = new PromiseInspection();
	    ret._bitField = 16777216;
	    ret._settledValueField = reason;
	    return this._promiseResolved(index, ret);
	};
	
	Promise.settle = function (promises) {
	    debug.deprecated(".settle()", ".reflect()");
	    return new SettledPromiseArray(promises).promise();
	};
	
	Promise.prototype.settle = function () {
	    return Promise.settle(this);
	};
	};


/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports =
	function(Promise, PromiseArray, apiRejection) {
	var util = __webpack_require__(69);
	var RangeError = __webpack_require__(74).RangeError;
	var AggregateError = __webpack_require__(74).AggregateError;
	var isArray = util.isArray;
	var CANCELLATION = {};
	
	
	function SomePromiseArray(values) {
	    this.constructor$(values);
	    this._howMany = 0;
	    this._unwrap = false;
	    this._initialized = false;
	}
	util.inherits(SomePromiseArray, PromiseArray);
	
	SomePromiseArray.prototype._init = function () {
	    if (!this._initialized) {
	        return;
	    }
	    if (this._howMany === 0) {
	        this._resolve([]);
	        return;
	    }
	    this._init$(undefined, -5);
	    var isArrayResolved = isArray(this._values);
	    if (!this._isResolved() &&
	        isArrayResolved &&
	        this._howMany > this._canPossiblyFulfill()) {
	        this._reject(this._getRangeError(this.length()));
	    }
	};
	
	SomePromiseArray.prototype.init = function () {
	    this._initialized = true;
	    this._init();
	};
	
	SomePromiseArray.prototype.setUnwrap = function () {
	    this._unwrap = true;
	};
	
	SomePromiseArray.prototype.howMany = function () {
	    return this._howMany;
	};
	
	SomePromiseArray.prototype.setHowMany = function (count) {
	    this._howMany = count;
	};
	
	SomePromiseArray.prototype._promiseFulfilled = function (value) {
	    this._addFulfilled(value);
	    if (this._fulfilled() === this.howMany()) {
	        this._values.length = this.howMany();
	        if (this.howMany() === 1 && this._unwrap) {
	            this._resolve(this._values[0]);
	        } else {
	            this._resolve(this._values);
	        }
	        return true;
	    }
	    return false;
	
	};
	SomePromiseArray.prototype._promiseRejected = function (reason) {
	    this._addRejected(reason);
	    return this._checkOutcome();
	};
	
	SomePromiseArray.prototype._promiseCancelled = function () {
	    if (this._values instanceof Promise || this._values == null) {
	        return this._cancel();
	    }
	    this._addRejected(CANCELLATION);
	    return this._checkOutcome();
	};
	
	SomePromiseArray.prototype._checkOutcome = function() {
	    if (this.howMany() > this._canPossiblyFulfill()) {
	        var e = new AggregateError();
	        for (var i = this.length(); i < this._values.length; ++i) {
	            if (this._values[i] !== CANCELLATION) {
	                e.push(this._values[i]);
	            }
	        }
	        if (e.length > 0) {
	            this._reject(e);
	        } else {
	            this._cancel();
	        }
	        return true;
	    }
	    return false;
	};
	
	SomePromiseArray.prototype._fulfilled = function () {
	    return this._totalResolved;
	};
	
	SomePromiseArray.prototype._rejected = function () {
	    return this._values.length - this.length();
	};
	
	SomePromiseArray.prototype._addRejected = function (reason) {
	    this._values.push(reason);
	};
	
	SomePromiseArray.prototype._addFulfilled = function (value) {
	    this._values[this._totalResolved++] = value;
	};
	
	SomePromiseArray.prototype._canPossiblyFulfill = function () {
	    return this.length() - this._rejected();
	};
	
	SomePromiseArray.prototype._getRangeError = function (count) {
	    var message = "Input array must contain at least " +
	            this._howMany + " items but contains only " + count + " items";
	    return new RangeError(message);
	};
	
	SomePromiseArray.prototype._resolveEmptyArray = function () {
	    this._reject(this._getRangeError(0));
	};
	
	function some(promises, howMany) {
	    if ((howMany | 0) !== howMany || howMany < 0) {
	        return apiRejection("expecting a positive integer\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
	    }
	    var ret = new SomePromiseArray(promises);
	    var promise = ret.promise();
	    ret.setHowMany(howMany);
	    ret.init();
	    return promise;
	}
	
	Promise.some = function (promises, howMany) {
	    return some(promises, howMany);
	};
	
	Promise.prototype.some = function (howMany) {
	    return some(this, howMany);
	};
	
	Promise._SomePromiseArray = SomePromiseArray;
	};


/***/ },
/* 100 */
/***/ function(module, exports) {

	"use strict";
	module.exports = function(Promise, INTERNAL) {
	var PromiseMap = Promise.map;
	
	Promise.prototype.filter = function (fn, options) {
	    return PromiseMap(this, fn, options, INTERNAL);
	};
	
	Promise.filter = function (promises, fn, options) {
	    return PromiseMap(promises, fn, options, INTERNAL);
	};
	};


/***/ },
/* 101 */
/***/ function(module, exports) {

	"use strict";
	module.exports = function(Promise, INTERNAL) {
	var PromiseReduce = Promise.reduce;
	var PromiseAll = Promise.all;
	
	function promiseAllThis() {
	    return PromiseAll(this);
	}
	
	function PromiseMapSeries(promises, fn) {
	    return PromiseReduce(promises, fn, INTERNAL, INTERNAL);
	}
	
	Promise.prototype.each = function (fn) {
	    return PromiseReduce(this, fn, INTERNAL, 0)
	              ._then(promiseAllThis, undefined, undefined, this, undefined);
	};
	
	Promise.prototype.mapSeries = function (fn) {
	    return PromiseReduce(this, fn, INTERNAL, INTERNAL);
	};
	
	Promise.each = function (promises, fn) {
	    return PromiseReduce(promises, fn, INTERNAL, 0)
	              ._then(promiseAllThis, undefined, undefined, promises, undefined);
	};
	
	Promise.mapSeries = PromiseMapSeries;
	};
	


/***/ },
/* 102 */
/***/ function(module, exports) {

	"use strict";
	module.exports = function(Promise) {
	var SomePromiseArray = Promise._SomePromiseArray;
	function any(promises) {
	    var ret = new SomePromiseArray(promises);
	    var promise = ret.promise();
	    ret.setHowMany(1);
	    ret.setUnwrap();
	    ret.init();
	    return promise;
	}
	
	Promise.any = function (promises) {
	    return any(promises);
	};
	
	Promise.prototype.any = function () {
	    return any(this);
	};
	
	};


/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * index.js
	 *
	 * a request API compatible with window.fetch
	 */
	
	var parse_url = __webpack_require__(104).parse;
	var resolve_url = __webpack_require__(104).resolve;
	var http = __webpack_require__(105);
	var https = __webpack_require__(106);
	var zlib = __webpack_require__(107);
	var stream = __webpack_require__(108);
	
	var Body = __webpack_require__(109);
	var Response = __webpack_require__(139);
	var Headers = __webpack_require__(140);
	var Request = __webpack_require__(141);
	var FetchError = __webpack_require__(137);
	
	// commonjs
	module.exports = Fetch;
	// es6 default export compatibility
	module.exports.default = module.exports;
	
	/**
	 * Fetch class
	 *
	 * @param   Mixed    url   Absolute url or Request instance
	 * @param   Object   opts  Fetch options
	 * @return  Promise
	 */
	function Fetch(url, opts) {
	
		// allow call as function
		if (!(this instanceof Fetch))
			return new Fetch(url, opts);
	
		// allow custom promise
		if (!Fetch.Promise) {
			throw new Error('native promise missing, set Fetch.Promise to your favorite alternative');
		}
	
		Body.Promise = Fetch.Promise;
	
		var self = this;
	
		// wrap http.request into fetch
		return new Fetch.Promise(function(resolve, reject) {
			// build request object
			var options = new Request(url, opts);
	
			if (!options.protocol || !options.hostname) {
				throw new Error('only absolute urls are supported');
			}
	
			if (options.protocol !== 'http:' && options.protocol !== 'https:') {
				throw new Error('only http(s) protocols are supported');
			}
	
			var send;
			if (options.protocol === 'https:') {
				send = https.request;
			} else {
				send = http.request;
			}
	
			// normalize headers
			var headers = new Headers(options.headers);
	
			if (options.compress) {
				headers.set('accept-encoding', 'gzip,deflate');
			}
	
			if (!headers.has('user-agent')) {
				headers.set('user-agent', 'node-fetch/1.0 (+https://github.com/bitinn/node-fetch)');
			}
	
			if (!headers.has('connection') && !options.agent) {
				headers.set('connection', 'close');
			}
	
			if (!headers.has('accept')) {
				headers.set('accept', '*/*');
			}
	
			// detect form data input from form-data module, this hack avoid the need to pass multipart header manually
			if (!headers.has('content-type') && options.body && typeof options.body.getBoundary === 'function') {
				headers.set('content-type', 'multipart/form-data; boundary=' + options.body.getBoundary());
			}
	
			// bring node-fetch closer to browser behavior by setting content-length automatically
			if (!headers.has('content-length') && /post|put|patch|delete/i.test(options.method)) {
				if (typeof options.body === 'string') {
					headers.set('content-length', Buffer.byteLength(options.body));
				// detect form data input from form-data module, this hack avoid the need to add content-length header manually
				} else if (options.body && typeof options.body.getLengthSync === 'function') {
					// for form-data 1.x
					if (options.body._lengthRetrievers && options.body._lengthRetrievers.length == 0) {
						headers.set('content-length', options.body.getLengthSync().toString());
					// for form-data 2.x
					} else if (options.body.hasKnownLength && options.body.hasKnownLength()) {
						headers.set('content-length', options.body.getLengthSync().toString());
					}
				// this is only necessary for older nodejs releases (before iojs merge)
				} else if (options.body === undefined || options.body === null) {
					headers.set('content-length', '0');
				}
			}
	
			options.headers = headers.raw();
	
			// http.request only support string as host header, this hack make custom host header possible
			if (options.headers.host) {
				options.headers.host = options.headers.host[0];
			}
	
			// send request
			var req = send(options);
			var reqTimeout;
	
			if (options.timeout) {
				req.once('socket', function(socket) {
					reqTimeout = setTimeout(function() {
						req.abort();
						reject(new FetchError('network timeout at: ' + options.url, 'request-timeout'));
					}, options.timeout);
				});
			}
	
			req.on('error', function(err) {
				clearTimeout(reqTimeout);
				reject(new FetchError('request to ' + options.url + ' failed, reason: ' + err.message, 'system', err));
			});
	
			req.on('response', function(res) {
				clearTimeout(reqTimeout);
	
				// handle redirect
				if (self.isRedirect(res.statusCode) && options.redirect !== 'manual') {
					if (options.redirect === 'error') {
						reject(new FetchError('redirect mode is set to error: ' + options.url, 'no-redirect'));
						return;
					}
	
					if (options.counter >= options.follow) {
						reject(new FetchError('maximum redirect reached at: ' + options.url, 'max-redirect'));
						return;
					}
	
					if (!res.headers.location) {
						reject(new FetchError('redirect location header missing at: ' + options.url, 'invalid-redirect'));
						return;
					}
	
					// per fetch spec, for POST request with 301/302 response, or any request with 303 response, use GET when following redirect
					if (res.statusCode === 303
						|| ((res.statusCode === 301 || res.statusCode === 302) && options.method === 'POST'))
					{
						options.method = 'GET';
						delete options.body;
						delete options.headers['content-length'];
					}
	
					options.counter++;
	
					resolve(Fetch(resolve_url(options.url, res.headers.location), options));
					return;
				}
	
				// normalize location header for manual redirect mode
				var headers = new Headers(res.headers);
				if (options.redirect === 'manual' && headers.has('location')) {
					headers.set('location', resolve_url(options.url, headers.get('location')));
				}
	
				// prepare response
				var body = res.pipe(new stream.PassThrough());
				var response_options = {
					url: options.url
					, status: res.statusCode
					, statusText: res.statusMessage
					, headers: headers
					, size: options.size
					, timeout: options.timeout
				};
	
				// response object
				var output;
	
				// in following scenarios we ignore compression support
				// 1. compression support is disabled
				// 2. HEAD request
				// 3. no content-encoding header
				// 4. no content response (204)
				// 5. content not modified response (304)
				if (!options.compress || options.method === 'HEAD' || !headers.has('content-encoding') || res.statusCode === 204 || res.statusCode === 304) {
					output = new Response(body, response_options);
					resolve(output);
					return;
				}
	
				// otherwise, check for gzip or deflate
				var name = headers.get('content-encoding');
	
				// for gzip
				if (name == 'gzip' || name == 'x-gzip') {
					body = body.pipe(zlib.createGunzip());
					output = new Response(body, response_options);
					resolve(output);
					return;
	
				// for deflate
				} else if (name == 'deflate' || name == 'x-deflate') {
					// handle the infamous raw deflate response from old servers
					// a hack for old IIS and Apache servers
					var raw = res.pipe(new stream.PassThrough());
					raw.once('data', function(chunk) {
						// see http://stackoverflow.com/questions/37519828
						if ((chunk[0] & 0x0F) === 0x08) {
							body = body.pipe(zlib.createInflate());
						} else {
							body = body.pipe(zlib.createInflateRaw());
						}
						output = new Response(body, response_options);
						resolve(output);
					});
					return;
				}
	
				// otherwise, use response as-is
				output = new Response(body, response_options);
				resolve(output);
				return;
			});
	
			// accept string, buffer or readable stream as body
			// per spec we will call tostring on non-stream objects
			if (typeof options.body === 'string') {
				req.write(options.body);
				req.end();
			} else if (options.body instanceof Buffer) {
				req.write(options.body);
				req.end()
			} else if (typeof options.body === 'object' && options.body.pipe) {
				options.body.pipe(req);
			} else if (typeof options.body === 'object') {
				req.write(options.body.toString());
				req.end();
			} else {
				req.end();
			}
		});
	
	};
	
	/**
	 * Redirect code matching
	 *
	 * @param   Number   code  Status code
	 * @return  Boolean
	 */
	Fetch.prototype.isRedirect = function(code) {
		return code === 301 || code === 302 || code === 303 || code === 307 || code === 308;
	}
	
	// expose Promise
	Fetch.Promise = global.Promise;
	Fetch.Response = Response;
	Fetch.Headers = Headers;
	Fetch.Request = Request;


/***/ },
/* 104 */
/***/ function(module, exports) {

	module.exports = require("url");

/***/ },
/* 105 */
/***/ function(module, exports) {

	module.exports = require("http");

/***/ },
/* 106 */
/***/ function(module, exports) {

	module.exports = require("https");

/***/ },
/* 107 */
/***/ function(module, exports) {

	module.exports = require("zlib");

/***/ },
/* 108 */
/***/ function(module, exports) {

	module.exports = require("stream");

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * body.js
	 *
	 * Body interface provides common methods for Request and Response
	 */
	
	var convert = __webpack_require__(110).convert;
	var bodyStream = __webpack_require__(136);
	var PassThrough = __webpack_require__(108).PassThrough;
	var FetchError = __webpack_require__(137);
	
	module.exports = Body;
	
	/**
	 * Body class
	 *
	 * @param   Stream  body  Readable stream
	 * @param   Object  opts  Response options
	 * @return  Void
	 */
	function Body(body, opts) {
	
		opts = opts || {};
	
		this.body = body;
		this.bodyUsed = false;
		this.size = opts.size || 0;
		this.timeout = opts.timeout || 0;
		this._raw = [];
		this._abort = false;
	
	}
	
	/**
	 * Decode response as json
	 *
	 * @return  Promise
	 */
	Body.prototype.json = function() {
	
		// for 204 No Content response, buffer will be empty, parsing it will throw error
		if (this.status === 204) {
			return Body.Promise.resolve({});
		}
	
		return this._decode().then(function(buffer) {
			return JSON.parse(buffer.toString());
		});
	
	};
	
	/**
	 * Decode response as text
	 *
	 * @return  Promise
	 */
	Body.prototype.text = function() {
	
		return this._decode().then(function(buffer) {
			return buffer.toString();
		});
	
	};
	
	/**
	 * Decode response as buffer (non-spec api)
	 *
	 * @return  Promise
	 */
	Body.prototype.buffer = function() {
	
		return this._decode();
	
	};
	
	/**
	 * Decode buffers into utf-8 string
	 *
	 * @return  Promise
	 */
	Body.prototype._decode = function() {
	
		var self = this;
	
		if (this.bodyUsed) {
			return Body.Promise.reject(new Error('body used already for: ' + this.url));
		}
	
		this.bodyUsed = true;
		this._bytes = 0;
		this._abort = false;
		this._raw = [];
	
		return new Body.Promise(function(resolve, reject) {
			var resTimeout;
	
			// body is string
			if (typeof self.body === 'string') {
				self._bytes = self.body.length;
				self._raw = [new Buffer(self.body)];
				return resolve(self._convert());
			}
	
			// body is buffer
			if (self.body instanceof Buffer) {
				self._bytes = self.body.length;
				self._raw = [self.body];
				return resolve(self._convert());
			}
	
			// allow timeout on slow response body
			if (self.timeout) {
				resTimeout = setTimeout(function() {
					self._abort = true;
					reject(new FetchError('response timeout at ' + self.url + ' over limit: ' + self.timeout, 'body-timeout'));
				}, self.timeout);
			}
	
			// handle stream error, such as incorrect content-encoding
			self.body.on('error', function(err) {
				reject(new FetchError('invalid response body at: ' + self.url + ' reason: ' + err.message, 'system', err));
			});
	
			// body is stream
			self.body.on('data', function(chunk) {
				if (self._abort || chunk === null) {
					return;
				}
	
				if (self.size && self._bytes + chunk.length > self.size) {
					self._abort = true;
					reject(new FetchError('content size at ' + self.url + ' over limit: ' + self.size, 'max-size'));
					return;
				}
	
				self._bytes += chunk.length;
				self._raw.push(chunk);
			});
	
			self.body.on('end', function() {
				if (self._abort) {
					return;
				}
	
				clearTimeout(resTimeout);
				resolve(self._convert());
			});
		});
	
	};
	
	/**
	 * Detect buffer encoding and convert to target encoding
	 * ref: http://www.w3.org/TR/2011/WD-html5-20110113/parsing.html#determining-the-character-encoding
	 *
	 * @param   String  encoding  Target encoding
	 * @return  String
	 */
	Body.prototype._convert = function(encoding) {
	
		encoding = encoding || 'utf-8';
	
		var ct = this.headers.get('content-type');
		var charset = 'utf-8';
		var res, str;
	
		// header
		if (ct) {
			// skip encoding detection altogether if not html/xml/plain text
			if (!/text\/html|text\/plain|\+xml|\/xml/i.test(ct)) {
				return Buffer.concat(this._raw);
			}
	
			res = /charset=([^;]*)/i.exec(ct);
		}
	
		// no charset in content type, peek at response body for at most 1024 bytes
		if (!res && this._raw.length > 0) {
			for (var i = 0; i < this._raw.length; i++) {
				str += this._raw[i].toString()
				if (str.length > 1024) {
					break;
				}
			}
			str = str.substr(0, 1024);
		}
	
		// html5
		if (!res && str) {
			res = /<meta.+?charset=(['"])(.+?)\1/i.exec(str);
		}
	
		// html4
		if (!res && str) {
			res = /<meta[\s]+?http-equiv=(['"])content-type\1[\s]+?content=(['"])(.+?)\2/i.exec(str);
	
			if (res) {
				res = /charset=(.*)/i.exec(res.pop());
			}
		}
	
		// xml
		if (!res && str) {
			res = /<\?xml.+?encoding=(['"])(.+?)\1/i.exec(str);
		}
	
		// found charset
		if (res) {
			charset = res.pop();
	
			// prevent decode issues when sites use incorrect encoding
			// ref: https://hsivonen.fi/encoding-menu/
			if (charset === 'gb2312' || charset === 'gbk') {
				charset = 'gb18030';
			}
		}
	
		// turn raw buffers into a single utf-8 buffer
		return convert(
			Buffer.concat(this._raw)
			, encoding
			, charset
		);
	
	};
	
	/**
	 * Clone body given Res/Req instance
	 *
	 * @param   Mixed  instance  Response or Request instance
	 * @return  Mixed
	 */
	Body.prototype._clone = function(instance) {
		var p1, p2;
		var body = instance.body;
	
		// don't allow cloning a used body
		if (instance.bodyUsed) {
			throw new Error('cannot clone body after it is used');
		}
	
		// check that body is a stream and not form-data object
		// note: we can't clone the form-data object without having it as a dependency
		if (bodyStream(body) && typeof body.getBoundary !== 'function') {
			// tee instance body
			p1 = new PassThrough();
			p2 = new PassThrough();
			body.pipe(p1);
			body.pipe(p2);
			// set instance body to teed body and return the other teed body
			instance.body = p1;
			body = p2;
		}
	
		return body;
	}
	
	// expose Promise
	Body.Promise = global.Promise;


/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var iconvLite = __webpack_require__(111);
	// Load Iconv from an external file to be able to disable Iconv for webpack
	// Add /\/iconv-loader$/ to webpack.IgnorePlugin to ignore it
	var Iconv = __webpack_require__(134);
	
	// Expose to the world
	module.exports.convert = convert;
	
	/**
	 * Convert encoding of an UTF-8 string or a buffer
	 *
	 * @param {String|Buffer} str String to be converted
	 * @param {String} to Encoding to be converted to
	 * @param {String} [from='UTF-8'] Encoding to be converted from
	 * @param {Boolean} useLite If set to ture, force to use iconvLite
	 * @return {Buffer} Encoded string
	 */
	function convert(str, to, from, useLite) {
	    from = checkEncoding(from || 'UTF-8');
	    to = checkEncoding(to || 'UTF-8');
	    str = str || '';
	
	    var result;
	
	    if (from !== 'UTF-8' && typeof str === 'string') {
	        str = new Buffer(str, 'binary');
	    }
	
	    if (from === to) {
	        if (typeof str === 'string') {
	            result = new Buffer(str);
	        } else {
	            result = str;
	        }
	    } else if (Iconv && !useLite) {
	        try {
	            result = convertIconv(str, to, from);
	        } catch (E) {
	            console.error(E);
	            try {
	                result = convertIconvLite(str, to, from);
	            } catch (E) {
	                console.error(E);
	                result = str;
	            }
	        }
	    } else {
	        try {
	            result = convertIconvLite(str, to, from);
	        } catch (E) {
	            console.error(E);
	            result = str;
	        }
	    }
	
	
	    if (typeof result === 'string') {
	        result = new Buffer(result, 'utf-8');
	    }
	
	    return result;
	}
	
	/**
	 * Convert encoding of a string with node-iconv (if available)
	 *
	 * @param {String|Buffer} str String to be converted
	 * @param {String} to Encoding to be converted to
	 * @param {String} [from='UTF-8'] Encoding to be converted from
	 * @return {Buffer} Encoded string
	 */
	function convertIconv(str, to, from) {
	    var response, iconv;
	    iconv = new Iconv(from, to + '//TRANSLIT//IGNORE');
	    response = iconv.convert(str);
	    return response.slice(0, response.length);
	}
	
	/**
	 * Convert encoding of astring with iconv-lite
	 *
	 * @param {String|Buffer} str String to be converted
	 * @param {String} to Encoding to be converted to
	 * @param {String} [from='UTF-8'] Encoding to be converted from
	 * @return {Buffer} Encoded string
	 */
	function convertIconvLite(str, to, from) {
	    if (to === 'UTF-8') {
	        return iconvLite.decode(str, from);
	    } else if (from === 'UTF-8') {
	        return iconvLite.encode(str, to);
	    } else {
	        return iconvLite.encode(iconvLite.decode(str, from), to);
	    }
	}
	
	/**
	 * Converts charset name if needed
	 *
	 * @param {String} name Character set
	 * @return {String} Character set name
	 */
	function checkEncoding(name) {
	    return (name || '').toString().trim().
	    replace(/^latin[\-_]?(\d+)$/i, 'ISO-8859-$1').
	    replace(/^win(?:dows)?[\-_]?(\d+)$/i, 'WINDOWS-$1').
	    replace(/^utf[\-_]?(\d+)$/i, 'UTF-$1').
	    replace(/^ks_c_5601\-1987$/i, 'CP949').
	    replace(/^us[\-_]?ascii$/i, 'ASCII').
	    toUpperCase();
	}


/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	"use strict"
	
	var bomHandling = __webpack_require__(112),
	    iconv = module.exports;
	
	// All codecs and aliases are kept here, keyed by encoding name/alias.
	// They are lazy loaded in `iconv.getCodec` from `encodings/index.js`.
	iconv.encodings = null;
	
	// Characters emitted in case of error.
	iconv.defaultCharUnicode = '�';
	iconv.defaultCharSingleByte = '?';
	
	// Public API.
	iconv.encode = function encode(str, encoding, options) {
	    str = "" + (str || ""); // Ensure string.
	
	    var encoder = iconv.getEncoder(encoding, options);
	
	    var res = encoder.write(str);
	    var trail = encoder.end();
	    
	    return (trail && trail.length > 0) ? Buffer.concat([res, trail]) : res;
	}
	
	iconv.decode = function decode(buf, encoding, options) {
	    if (typeof buf === 'string') {
	        if (!iconv.skipDecodeWarning) {
	            console.error('Iconv-lite warning: decode()-ing strings is deprecated. Refer to https://github.com/ashtuchkin/iconv-lite/wiki/Use-Buffers-when-decoding');
	            iconv.skipDecodeWarning = true;
	        }
	
	        buf = new Buffer("" + (buf || ""), "binary"); // Ensure buffer.
	    }
	
	    var decoder = iconv.getDecoder(encoding, options);
	
	    var res = decoder.write(buf);
	    var trail = decoder.end();
	
	    return trail ? (res + trail) : res;
	}
	
	iconv.encodingExists = function encodingExists(enc) {
	    try {
	        iconv.getCodec(enc);
	        return true;
	    } catch (e) {
	        return false;
	    }
	}
	
	// Legacy aliases to convert functions
	iconv.toEncoding = iconv.encode;
	iconv.fromEncoding = iconv.decode;
	
	// Search for a codec in iconv.encodings. Cache codec data in iconv._codecDataCache.
	iconv._codecDataCache = {};
	iconv.getCodec = function getCodec(encoding) {
	    if (!iconv.encodings)
	        iconv.encodings = __webpack_require__(113); // Lazy load all encoding definitions.
	    
	    // Canonicalize encoding name: strip all non-alphanumeric chars and appended year.
	    var enc = (''+encoding).toLowerCase().replace(/[^0-9a-z]|:\d{4}$/g, "");
	
	    // Traverse iconv.encodings to find actual codec.
	    var codecOptions = {};
	    while (true) {
	        var codec = iconv._codecDataCache[enc];
	        if (codec)
	            return codec;
	
	        var codecDef = iconv.encodings[enc];
	
	        switch (typeof codecDef) {
	            case "string": // Direct alias to other encoding.
	                enc = codecDef;
	                break;
	
	            case "object": // Alias with options. Can be layered.
	                for (var key in codecDef)
	                    codecOptions[key] = codecDef[key];
	
	                if (!codecOptions.encodingName)
	                    codecOptions.encodingName = enc;
	                
	                enc = codecDef.type;
	                break;
	
	            case "function": // Codec itself.
	                if (!codecOptions.encodingName)
	                    codecOptions.encodingName = enc;
	
	                // The codec function must load all tables and return object with .encoder and .decoder methods.
	                // It'll be called only once (for each different options object).
	                codec = new codecDef(codecOptions, iconv);
	
	                iconv._codecDataCache[codecOptions.encodingName] = codec; // Save it to be reused later.
	                return codec;
	
	            default:
	                throw new Error("Encoding not recognized: '" + encoding + "' (searched as: '"+enc+"')");
	        }
	    }
	}
	
	iconv.getEncoder = function getEncoder(encoding, options) {
	    var codec = iconv.getCodec(encoding),
	        encoder = new codec.encoder(options, codec);
	
	    if (codec.bomAware && options && options.addBOM)
	        encoder = new bomHandling.PrependBOM(encoder, options);
	
	    return encoder;
	}
	
	iconv.getDecoder = function getDecoder(encoding, options) {
	    var codec = iconv.getCodec(encoding),
	        decoder = new codec.decoder(options, codec);
	
	    if (codec.bomAware && !(options && options.stripBOM === false))
	        decoder = new bomHandling.StripBOM(decoder, options);
	
	    return decoder;
	}
	
	
	// Load extensions in Node. All of them are omitted in Browserify build via 'browser' field in package.json.
	var nodeVer = typeof process !== 'undefined' && process.versions && process.versions.node;
	if (nodeVer) {
	
	    // Load streaming support in Node v0.10+
	    var nodeVerArr = nodeVer.split(".").map(Number);
	    if (nodeVerArr[0] > 0 || nodeVerArr[1] >= 10) {
	        __webpack_require__(131)(iconv);
	    }
	
	    // Load Node primitive extensions.
	    __webpack_require__(132)(iconv);
	}
	


/***/ },
/* 112 */
/***/ function(module, exports) {

	"use strict"
	
	var BOMChar = '\uFEFF';
	
	exports.PrependBOM = PrependBOMWrapper
	function PrependBOMWrapper(encoder, options) {
	    this.encoder = encoder;
	    this.addBOM = true;
	}
	
	PrependBOMWrapper.prototype.write = function(str) {
	    if (this.addBOM) {
	        str = BOMChar + str;
	        this.addBOM = false;
	    }
	
	    return this.encoder.write(str);
	}
	
	PrependBOMWrapper.prototype.end = function() {
	    return this.encoder.end();
	}
	
	
	//------------------------------------------------------------------------------
	
	exports.StripBOM = StripBOMWrapper;
	function StripBOMWrapper(decoder, options) {
	    this.decoder = decoder;
	    this.pass = false;
	    this.options = options || {};
	}
	
	StripBOMWrapper.prototype.write = function(buf) {
	    var res = this.decoder.write(buf);
	    if (this.pass || !res)
	        return res;
	
	    if (res[0] === BOMChar) {
	        res = res.slice(1);
	        if (typeof this.options.stripBOM === 'function')
	            this.options.stripBOM();
	    }
	
	    this.pass = true;
	    return res;
	}
	
	StripBOMWrapper.prototype.end = function() {
	    return this.decoder.end();
	}
	


/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	"use strict"
	
	// Update this array if you add/rename/remove files in this directory.
	// We support Browserify by skipping automatic module discovery and requiring modules directly.
	var modules = [
	    __webpack_require__(114),
	    __webpack_require__(116),
	    __webpack_require__(117),
	    __webpack_require__(118),
	    __webpack_require__(119),
	    __webpack_require__(120),
	    __webpack_require__(121),
	    __webpack_require__(122),
	];
	
	// Put all encoding/alias/codec definitions to single object and export it. 
	for (var i = 0; i < modules.length; i++) {
	    var module = modules[i];
	    for (var enc in module)
	        if (Object.prototype.hasOwnProperty.call(module, enc))
	            exports[enc] = module[enc];
	}


/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	"use strict"
	
	// Export Node.js internal encodings.
	
	module.exports = {
	    // Encodings
	    utf8:   { type: "_internal", bomAware: true},
	    cesu8:  { type: "_internal", bomAware: true},
	    unicode11utf8: "utf8",
	
	    ucs2:   { type: "_internal", bomAware: true},
	    utf16le: "ucs2",
	
	    binary: { type: "_internal" },
	    base64: { type: "_internal" },
	    hex:    { type: "_internal" },
	
	    // Codec.
	    _internal: InternalCodec,
	};
	
	//------------------------------------------------------------------------------
	
	function InternalCodec(codecOptions, iconv) {
	    this.enc = codecOptions.encodingName;
	    this.bomAware = codecOptions.bomAware;
	
	    if (this.enc === "base64")
	        this.encoder = InternalEncoderBase64;
	    else if (this.enc === "cesu8") {
	        this.enc = "utf8"; // Use utf8 for decoding.
	        this.encoder = InternalEncoderCesu8;
	
	        // Add decoder for versions of Node not supporting CESU-8
	        if (new Buffer("eda080", 'hex').toString().length == 3) {
	            this.decoder = InternalDecoderCesu8;
	            this.defaultCharUnicode = iconv.defaultCharUnicode;
	        }
	    }
	}
	
	InternalCodec.prototype.encoder = InternalEncoder;
	InternalCodec.prototype.decoder = InternalDecoder;
	
	//------------------------------------------------------------------------------
	
	// We use node.js internal decoder. Its signature is the same as ours.
	var StringDecoder = __webpack_require__(115).StringDecoder;
	
	if (!StringDecoder.prototype.end) // Node v0.8 doesn't have this method.
	    StringDecoder.prototype.end = function() {};
	
	
	function InternalDecoder(options, codec) {
	    StringDecoder.call(this, codec.enc);
	}
	
	InternalDecoder.prototype = StringDecoder.prototype;
	
	
	//------------------------------------------------------------------------------
	// Encoder is mostly trivial
	
	function InternalEncoder(options, codec) {
	    this.enc = codec.enc;
	}
	
	InternalEncoder.prototype.write = function(str) {
	    return new Buffer(str, this.enc);
	}
	
	InternalEncoder.prototype.end = function() {
	}
	
	
	//------------------------------------------------------------------------------
	// Except base64 encoder, which must keep its state.
	
	function InternalEncoderBase64(options, codec) {
	    this.prevStr = '';
	}
	
	InternalEncoderBase64.prototype.write = function(str) {
	    str = this.prevStr + str;
	    var completeQuads = str.length - (str.length % 4);
	    this.prevStr = str.slice(completeQuads);
	    str = str.slice(0, completeQuads);
	
	    return new Buffer(str, "base64");
	}
	
	InternalEncoderBase64.prototype.end = function() {
	    return new Buffer(this.prevStr, "base64");
	}
	
	
	//------------------------------------------------------------------------------
	// CESU-8 encoder is also special.
	
	function InternalEncoderCesu8(options, codec) {
	}
	
	InternalEncoderCesu8.prototype.write = function(str) {
	    var buf = new Buffer(str.length * 3), bufIdx = 0;
	    for (var i = 0; i < str.length; i++) {
	        var charCode = str.charCodeAt(i);
	        // Naive implementation, but it works because CESU-8 is especially easy
	        // to convert from UTF-16 (which all JS strings are encoded in).
	        if (charCode < 0x80)
	            buf[bufIdx++] = charCode;
	        else if (charCode < 0x800) {
	            buf[bufIdx++] = 0xC0 + (charCode >>> 6);
	            buf[bufIdx++] = 0x80 + (charCode & 0x3f);
	        }
	        else { // charCode will always be < 0x10000 in javascript.
	            buf[bufIdx++] = 0xE0 + (charCode >>> 12);
	            buf[bufIdx++] = 0x80 + ((charCode >>> 6) & 0x3f);
	            buf[bufIdx++] = 0x80 + (charCode & 0x3f);
	        }
	    }
	    return buf.slice(0, bufIdx);
	}
	
	InternalEncoderCesu8.prototype.end = function() {
	}
	
	//------------------------------------------------------------------------------
	// CESU-8 decoder is not implemented in Node v4.0+
	
	function InternalDecoderCesu8(options, codec) {
	    this.acc = 0;
	    this.contBytes = 0;
	    this.accBytes = 0;
	    this.defaultCharUnicode = codec.defaultCharUnicode;
	}
	
	InternalDecoderCesu8.prototype.write = function(buf) {
	    var acc = this.acc, contBytes = this.contBytes, accBytes = this.accBytes, 
	        res = '';
	    for (var i = 0; i < buf.length; i++) {
	        var curByte = buf[i];
	        if ((curByte & 0xC0) !== 0x80) { // Leading byte
	            if (contBytes > 0) { // Previous code is invalid
	                res += this.defaultCharUnicode;
	                contBytes = 0;
	            }
	
	            if (curByte < 0x80) { // Single-byte code
	                res += String.fromCharCode(curByte);
	            } else if (curByte < 0xE0) { // Two-byte code
	                acc = curByte & 0x1F;
	                contBytes = 1; accBytes = 1;
	            } else if (curByte < 0xF0) { // Three-byte code
	                acc = curByte & 0x0F;
	                contBytes = 2; accBytes = 1;
	            } else { // Four or more are not supported for CESU-8.
	                res += this.defaultCharUnicode;
	            }
	        } else { // Continuation byte
	            if (contBytes > 0) { // We're waiting for it.
	                acc = (acc << 6) | (curByte & 0x3f);
	                contBytes--; accBytes++;
	                if (contBytes === 0) {
	                    // Check for overlong encoding, but support Modified UTF-8 (encoding NULL as C0 80)
	                    if (accBytes === 2 && acc < 0x80 && acc > 0)
	                        res += this.defaultCharUnicode;
	                    else if (accBytes === 3 && acc < 0x800)
	                        res += this.defaultCharUnicode;
	                    else
	                        // Actually add character.
	                        res += String.fromCharCode(acc);
	                }
	            } else { // Unexpected continuation byte
	                res += this.defaultCharUnicode;
	            }
	        }
	    }
	    this.acc = acc; this.contBytes = contBytes; this.accBytes = accBytes;
	    return res;
	}
	
	InternalDecoderCesu8.prototype.end = function() {
	    var res = 0;
	    if (this.contBytes > 0)
	        res += this.defaultCharUnicode;
	    return res;
	}


/***/ },
/* 115 */
/***/ function(module, exports) {

	module.exports = require("string_decoder");

/***/ },
/* 116 */
/***/ function(module, exports) {

	"use strict"
	
	// == UTF16-BE codec. ==========================================================
	
	exports.utf16be = Utf16BECodec;
	function Utf16BECodec() {
	}
	
	Utf16BECodec.prototype.encoder = Utf16BEEncoder;
	Utf16BECodec.prototype.decoder = Utf16BEDecoder;
	Utf16BECodec.prototype.bomAware = true;
	
	
	// -- Encoding
	
	function Utf16BEEncoder() {
	}
	
	Utf16BEEncoder.prototype.write = function(str) {
	    var buf = new Buffer(str, 'ucs2');
	    for (var i = 0; i < buf.length; i += 2) {
	        var tmp = buf[i]; buf[i] = buf[i+1]; buf[i+1] = tmp;
	    }
	    return buf;
	}
	
	Utf16BEEncoder.prototype.end = function() {
	}
	
	
	// -- Decoding
	
	function Utf16BEDecoder() {
	    this.overflowByte = -1;
	}
	
	Utf16BEDecoder.prototype.write = function(buf) {
	    if (buf.length == 0)
	        return '';
	
	    var buf2 = new Buffer(buf.length + 1),
	        i = 0, j = 0;
	
	    if (this.overflowByte !== -1) {
	        buf2[0] = buf[0];
	        buf2[1] = this.overflowByte;
	        i = 1; j = 2;
	    }
	
	    for (; i < buf.length-1; i += 2, j+= 2) {
	        buf2[j] = buf[i+1];
	        buf2[j+1] = buf[i];
	    }
	
	    this.overflowByte = (i == buf.length-1) ? buf[buf.length-1] : -1;
	
	    return buf2.slice(0, j).toString('ucs2');
	}
	
	Utf16BEDecoder.prototype.end = function() {
	}
	
	
	// == UTF-16 codec =============================================================
	// Decoder chooses automatically from UTF-16LE and UTF-16BE using BOM and space-based heuristic.
	// Defaults to UTF-16LE, as it's prevalent and default in Node.
	// http://en.wikipedia.org/wiki/UTF-16 and http://encoding.spec.whatwg.org/#utf-16le
	// Decoder default can be changed: iconv.decode(buf, 'utf16', {defaultEncoding: 'utf-16be'});
	
	// Encoder uses UTF-16LE and prepends BOM (which can be overridden with addBOM: false).
	
	exports.utf16 = Utf16Codec;
	function Utf16Codec(codecOptions, iconv) {
	    this.iconv = iconv;
	}
	
	Utf16Codec.prototype.encoder = Utf16Encoder;
	Utf16Codec.prototype.decoder = Utf16Decoder;
	
	
	// -- Encoding (pass-through)
	
	function Utf16Encoder(options, codec) {
	    options = options || {};
	    if (options.addBOM === undefined)
	        options.addBOM = true;
	    this.encoder = codec.iconv.getEncoder('utf-16le', options);
	}
	
	Utf16Encoder.prototype.write = function(str) {
	    return this.encoder.write(str);
	}
	
	Utf16Encoder.prototype.end = function() {
	    return this.encoder.end();
	}
	
	
	// -- Decoding
	
	function Utf16Decoder(options, codec) {
	    this.decoder = null;
	    this.initialBytes = [];
	    this.initialBytesLen = 0;
	
	    this.options = options || {};
	    this.iconv = codec.iconv;
	}
	
	Utf16Decoder.prototype.write = function(buf) {
	    if (!this.decoder) {
	        // Codec is not chosen yet. Accumulate initial bytes.
	        this.initialBytes.push(buf);
	        this.initialBytesLen += buf.length;
	        
	        if (this.initialBytesLen < 16) // We need more bytes to use space heuristic (see below)
	            return '';
	
	        // We have enough bytes -> detect endianness.
	        var buf = Buffer.concat(this.initialBytes),
	            encoding = detectEncoding(buf, this.options.defaultEncoding);
	        this.decoder = this.iconv.getDecoder(encoding, this.options);
	        this.initialBytes.length = this.initialBytesLen = 0;
	    }
	
	    return this.decoder.write(buf);
	}
	
	Utf16Decoder.prototype.end = function() {
	    if (!this.decoder) {
	        var buf = Buffer.concat(this.initialBytes),
	            encoding = detectEncoding(buf, this.options.defaultEncoding);
	        this.decoder = this.iconv.getDecoder(encoding, this.options);
	
	        var res = this.decoder.write(buf),
	            trail = this.decoder.end();
	
	        return trail ? (res + trail) : res;
	    }
	    return this.decoder.end();
	}
	
	function detectEncoding(buf, defaultEncoding) {
	    var enc = defaultEncoding || 'utf-16le';
	
	    if (buf.length >= 2) {
	        // Check BOM.
	        if (buf[0] == 0xFE && buf[1] == 0xFF) // UTF-16BE BOM
	            enc = 'utf-16be';
	        else if (buf[0] == 0xFF && buf[1] == 0xFE) // UTF-16LE BOM
	            enc = 'utf-16le';
	        else {
	            // No BOM found. Try to deduce encoding from initial content.
	            // Most of the time, the content has ASCII chars (U+00**), but the opposite (U+**00) is uncommon.
	            // So, we count ASCII as if it was LE or BE, and decide from that.
	            var asciiCharsLE = 0, asciiCharsBE = 0, // Counts of chars in both positions
	                _len = Math.min(buf.length - (buf.length % 2), 64); // Len is always even.
	
	            for (var i = 0; i < _len; i += 2) {
	                if (buf[i] === 0 && buf[i+1] !== 0) asciiCharsBE++;
	                if (buf[i] !== 0 && buf[i+1] === 0) asciiCharsLE++;
	            }
	
	            if (asciiCharsBE > asciiCharsLE)
	                enc = 'utf-16be';
	            else if (asciiCharsBE < asciiCharsLE)
	                enc = 'utf-16le';
	        }
	    }
	
	    return enc;
	}
	
	


/***/ },
/* 117 */
/***/ function(module, exports) {

	"use strict"
	
	// UTF-7 codec, according to https://tools.ietf.org/html/rfc2152
	// See also below a UTF-7-IMAP codec, according to http://tools.ietf.org/html/rfc3501#section-5.1.3
	
	exports.utf7 = Utf7Codec;
	exports.unicode11utf7 = 'utf7'; // Alias UNICODE-1-1-UTF-7
	function Utf7Codec(codecOptions, iconv) {
	    this.iconv = iconv;
	};
	
	Utf7Codec.prototype.encoder = Utf7Encoder;
	Utf7Codec.prototype.decoder = Utf7Decoder;
	Utf7Codec.prototype.bomAware = true;
	
	
	// -- Encoding
	
	var nonDirectChars = /[^A-Za-z0-9'\(\),-\.\/:\? \n\r\t]+/g;
	
	function Utf7Encoder(options, codec) {
	    this.iconv = codec.iconv;
	}
	
	Utf7Encoder.prototype.write = function(str) {
	    // Naive implementation.
	    // Non-direct chars are encoded as "+<base64>-"; single "+" char is encoded as "+-".
	    return new Buffer(str.replace(nonDirectChars, function(chunk) {
	        return "+" + (chunk === '+' ? '' : 
	            this.iconv.encode(chunk, 'utf16-be').toString('base64').replace(/=+$/, '')) 
	            + "-";
	    }.bind(this)));
	}
	
	Utf7Encoder.prototype.end = function() {
	}
	
	
	// -- Decoding
	
	function Utf7Decoder(options, codec) {
	    this.iconv = codec.iconv;
	    this.inBase64 = false;
	    this.base64Accum = '';
	}
	
	var base64Regex = /[A-Za-z0-9\/+]/;
	var base64Chars = [];
	for (var i = 0; i < 256; i++)
	    base64Chars[i] = base64Regex.test(String.fromCharCode(i));
	
	var plusChar = '+'.charCodeAt(0), 
	    minusChar = '-'.charCodeAt(0),
	    andChar = '&'.charCodeAt(0);
	
	Utf7Decoder.prototype.write = function(buf) {
	    var res = "", lastI = 0,
	        inBase64 = this.inBase64,
	        base64Accum = this.base64Accum;
	
	    // The decoder is more involved as we must handle chunks in stream.
	
	    for (var i = 0; i < buf.length; i++) {
	        if (!inBase64) { // We're in direct mode.
	            // Write direct chars until '+'
	            if (buf[i] == plusChar) {
	                res += this.iconv.decode(buf.slice(lastI, i), "ascii"); // Write direct chars.
	                lastI = i+1;
	                inBase64 = true;
	            }
	        } else { // We decode base64.
	            if (!base64Chars[buf[i]]) { // Base64 ended.
	                if (i == lastI && buf[i] == minusChar) {// "+-" -> "+"
	                    res += "+";
	                } else {
	                    var b64str = base64Accum + buf.slice(lastI, i).toString();
	                    res += this.iconv.decode(new Buffer(b64str, 'base64'), "utf16-be");
	                }
	
	                if (buf[i] != minusChar) // Minus is absorbed after base64.
	                    i--;
	
	                lastI = i+1;
	                inBase64 = false;
	                base64Accum = '';
	            }
	        }
	    }
	
	    if (!inBase64) {
	        res += this.iconv.decode(buf.slice(lastI), "ascii"); // Write direct chars.
	    } else {
	        var b64str = base64Accum + buf.slice(lastI).toString();
	
	        var canBeDecoded = b64str.length - (b64str.length % 8); // Minimal chunk: 2 quads -> 2x3 bytes -> 3 chars.
	        base64Accum = b64str.slice(canBeDecoded); // The rest will be decoded in future.
	        b64str = b64str.slice(0, canBeDecoded);
	
	        res += this.iconv.decode(new Buffer(b64str, 'base64'), "utf16-be");
	    }
	
	    this.inBase64 = inBase64;
	    this.base64Accum = base64Accum;
	
	    return res;
	}
	
	Utf7Decoder.prototype.end = function() {
	    var res = "";
	    if (this.inBase64 && this.base64Accum.length > 0)
	        res = this.iconv.decode(new Buffer(this.base64Accum, 'base64'), "utf16-be");
	
	    this.inBase64 = false;
	    this.base64Accum = '';
	    return res;
	}
	
	
	// UTF-7-IMAP codec.
	// RFC3501 Sec. 5.1.3 Modified UTF-7 (http://tools.ietf.org/html/rfc3501#section-5.1.3)
	// Differences:
	//  * Base64 part is started by "&" instead of "+"
	//  * Direct characters are 0x20-0x7E, except "&" (0x26)
	//  * In Base64, "," is used instead of "/"
	//  * Base64 must not be used to represent direct characters.
	//  * No implicit shift back from Base64 (should always end with '-')
	//  * String must end in non-shifted position.
	//  * "-&" while in base64 is not allowed.
	
	
	exports.utf7imap = Utf7IMAPCodec;
	function Utf7IMAPCodec(codecOptions, iconv) {
	    this.iconv = iconv;
	};
	
	Utf7IMAPCodec.prototype.encoder = Utf7IMAPEncoder;
	Utf7IMAPCodec.prototype.decoder = Utf7IMAPDecoder;
	Utf7IMAPCodec.prototype.bomAware = true;
	
	
	// -- Encoding
	
	function Utf7IMAPEncoder(options, codec) {
	    this.iconv = codec.iconv;
	    this.inBase64 = false;
	    this.base64Accum = new Buffer(6);
	    this.base64AccumIdx = 0;
	}
	
	Utf7IMAPEncoder.prototype.write = function(str) {
	    var inBase64 = this.inBase64,
	        base64Accum = this.base64Accum,
	        base64AccumIdx = this.base64AccumIdx,
	        buf = new Buffer(str.length*5 + 10), bufIdx = 0;
	
	    for (var i = 0; i < str.length; i++) {
	        var uChar = str.charCodeAt(i);
	        if (0x20 <= uChar && uChar <= 0x7E) { // Direct character or '&'.
	            if (inBase64) {
	                if (base64AccumIdx > 0) {
	                    bufIdx += buf.write(base64Accum.slice(0, base64AccumIdx).toString('base64').replace(/\//g, ',').replace(/=+$/, ''), bufIdx);
	                    base64AccumIdx = 0;
	                }
	
	                buf[bufIdx++] = minusChar; // Write '-', then go to direct mode.
	                inBase64 = false;
	            }
	
	            if (!inBase64) {
	                buf[bufIdx++] = uChar; // Write direct character
	
	                if (uChar === andChar)  // Ampersand -> '&-'
	                    buf[bufIdx++] = minusChar;
	            }
	
	        } else { // Non-direct character
	            if (!inBase64) {
	                buf[bufIdx++] = andChar; // Write '&', then go to base64 mode.
	                inBase64 = true;
	            }
	            if (inBase64) {
	                base64Accum[base64AccumIdx++] = uChar >> 8;
	                base64Accum[base64AccumIdx++] = uChar & 0xFF;
	
	                if (base64AccumIdx == base64Accum.length) {
	                    bufIdx += buf.write(base64Accum.toString('base64').replace(/\//g, ','), bufIdx);
	                    base64AccumIdx = 0;
	                }
	            }
	        }
	    }
	
	    this.inBase64 = inBase64;
	    this.base64AccumIdx = base64AccumIdx;
	
	    return buf.slice(0, bufIdx);
	}
	
	Utf7IMAPEncoder.prototype.end = function() {
	    var buf = new Buffer(10), bufIdx = 0;
	    if (this.inBase64) {
	        if (this.base64AccumIdx > 0) {
	            bufIdx += buf.write(this.base64Accum.slice(0, this.base64AccumIdx).toString('base64').replace(/\//g, ',').replace(/=+$/, ''), bufIdx);
	            this.base64AccumIdx = 0;
	        }
	
	        buf[bufIdx++] = minusChar; // Write '-', then go to direct mode.
	        this.inBase64 = false;
	    }
	
	    return buf.slice(0, bufIdx);
	}
	
	
	// -- Decoding
	
	function Utf7IMAPDecoder(options, codec) {
	    this.iconv = codec.iconv;
	    this.inBase64 = false;
	    this.base64Accum = '';
	}
	
	var base64IMAPChars = base64Chars.slice();
	base64IMAPChars[','.charCodeAt(0)] = true;
	
	Utf7IMAPDecoder.prototype.write = function(buf) {
	    var res = "", lastI = 0,
	        inBase64 = this.inBase64,
	        base64Accum = this.base64Accum;
	
	    // The decoder is more involved as we must handle chunks in stream.
	    // It is forgiving, closer to standard UTF-7 (for example, '-' is optional at the end).
	
	    for (var i = 0; i < buf.length; i++) {
	        if (!inBase64) { // We're in direct mode.
	            // Write direct chars until '&'
	            if (buf[i] == andChar) {
	                res += this.iconv.decode(buf.slice(lastI, i), "ascii"); // Write direct chars.
	                lastI = i+1;
	                inBase64 = true;
	            }
	        } else { // We decode base64.
	            if (!base64IMAPChars[buf[i]]) { // Base64 ended.
	                if (i == lastI && buf[i] == minusChar) { // "&-" -> "&"
	                    res += "&";
	                } else {
	                    var b64str = base64Accum + buf.slice(lastI, i).toString().replace(/,/g, '/');
	                    res += this.iconv.decode(new Buffer(b64str, 'base64'), "utf16-be");
	                }
	
	                if (buf[i] != minusChar) // Minus may be absorbed after base64.
	                    i--;
	
	                lastI = i+1;
	                inBase64 = false;
	                base64Accum = '';
	            }
	        }
	    }
	
	    if (!inBase64) {
	        res += this.iconv.decode(buf.slice(lastI), "ascii"); // Write direct chars.
	    } else {
	        var b64str = base64Accum + buf.slice(lastI).toString().replace(/,/g, '/');
	
	        var canBeDecoded = b64str.length - (b64str.length % 8); // Minimal chunk: 2 quads -> 2x3 bytes -> 3 chars.
	        base64Accum = b64str.slice(canBeDecoded); // The rest will be decoded in future.
	        b64str = b64str.slice(0, canBeDecoded);
	
	        res += this.iconv.decode(new Buffer(b64str, 'base64'), "utf16-be");
	    }
	
	    this.inBase64 = inBase64;
	    this.base64Accum = base64Accum;
	
	    return res;
	}
	
	Utf7IMAPDecoder.prototype.end = function() {
	    var res = "";
	    if (this.inBase64 && this.base64Accum.length > 0)
	        res = this.iconv.decode(new Buffer(this.base64Accum, 'base64'), "utf16-be");
	
	    this.inBase64 = false;
	    this.base64Accum = '';
	    return res;
	}
	
	


/***/ },
/* 118 */
/***/ function(module, exports) {

	"use strict"
	
	// Single-byte codec. Needs a 'chars' string parameter that contains 256 or 128 chars that
	// correspond to encoded bytes (if 128 - then lower half is ASCII). 
	
	exports._sbcs = SBCSCodec;
	function SBCSCodec(codecOptions, iconv) {
	    if (!codecOptions)
	        throw new Error("SBCS codec is called without the data.")
	    
	    // Prepare char buffer for decoding.
	    if (!codecOptions.chars || (codecOptions.chars.length !== 128 && codecOptions.chars.length !== 256))
	        throw new Error("Encoding '"+codecOptions.type+"' has incorrect 'chars' (must be of len 128 or 256)");
	    
	    if (codecOptions.chars.length === 128) {
	        var asciiString = "";
	        for (var i = 0; i < 128; i++)
	            asciiString += String.fromCharCode(i);
	        codecOptions.chars = asciiString + codecOptions.chars;
	    }
	
	    this.decodeBuf = new Buffer(codecOptions.chars, 'ucs2');
	    
	    // Encoding buffer.
	    var encodeBuf = new Buffer(65536);
	    encodeBuf.fill(iconv.defaultCharSingleByte.charCodeAt(0));
	
	    for (var i = 0; i < codecOptions.chars.length; i++)
	        encodeBuf[codecOptions.chars.charCodeAt(i)] = i;
	
	    this.encodeBuf = encodeBuf;
	}
	
	SBCSCodec.prototype.encoder = SBCSEncoder;
	SBCSCodec.prototype.decoder = SBCSDecoder;
	
	
	function SBCSEncoder(options, codec) {
	    this.encodeBuf = codec.encodeBuf;
	}
	
	SBCSEncoder.prototype.write = function(str) {
	    var buf = new Buffer(str.length);
	    for (var i = 0; i < str.length; i++)
	        buf[i] = this.encodeBuf[str.charCodeAt(i)];
	    
	    return buf;
	}
	
	SBCSEncoder.prototype.end = function() {
	}
	
	
	function SBCSDecoder(options, codec) {
	    this.decodeBuf = codec.decodeBuf;
	}
	
	SBCSDecoder.prototype.write = function(buf) {
	    // Strings are immutable in JS -> we use ucs2 buffer to speed up computations.
	    var decodeBuf = this.decodeBuf;
	    var newBuf = new Buffer(buf.length*2);
	    var idx1 = 0, idx2 = 0;
	    for (var i = 0; i < buf.length; i++) {
	        idx1 = buf[i]*2; idx2 = i*2;
	        newBuf[idx2] = decodeBuf[idx1];
	        newBuf[idx2+1] = decodeBuf[idx1+1];
	    }
	    return newBuf.toString('ucs2');
	}
	
	SBCSDecoder.prototype.end = function() {
	}


/***/ },
/* 119 */
/***/ function(module, exports) {

	"use strict"
	
	// Manually added data to be used by sbcs codec in addition to generated one.
	
	module.exports = {
	    // Not supported by iconv, not sure why.
	    "10029": "maccenteuro",
	    "maccenteuro": {
	        "type": "_sbcs",
	        "chars": "ÄĀāÉĄÖÜáąČäčĆćéŹźĎíďĒēĖóėôöõúĚěü†°Ę£§•¶ß®©™ę¨≠ģĮįĪ≤≥īĶ∂∑łĻļĽľĹĺŅņŃ¬√ńŇ∆«»… ňŐÕőŌ–—“”‘’÷◊ōŔŕŘ‹›řŖŗŠ‚„šŚśÁŤťÍŽžŪÓÔūŮÚůŰűŲųÝýķŻŁżĢˇ"
	    },
	
	    "808": "cp808",
	    "ibm808": "cp808",
	    "cp808": {
	        "type": "_sbcs",
	        "chars": "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмноп░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀рстуфхцчшщъыьэюяЁёЄєЇїЎў°∙·√№€■ "
	    },
	
	    // Aliases of generated encodings.
	    "ascii8bit": "ascii",
	    "usascii": "ascii",
	    "ansix34": "ascii",
	    "ansix341968": "ascii",
	    "ansix341986": "ascii",
	    "csascii": "ascii",
	    "cp367": "ascii",
	    "ibm367": "ascii",
	    "isoir6": "ascii",
	    "iso646us": "ascii",
	    "iso646irv": "ascii",
	    "us": "ascii",
	
	    "latin1": "iso88591",
	    "latin2": "iso88592",
	    "latin3": "iso88593",
	    "latin4": "iso88594",
	    "latin5": "iso88599",
	    "latin6": "iso885910",
	    "latin7": "iso885913",
	    "latin8": "iso885914",
	    "latin9": "iso885915",
	    "latin10": "iso885916",
	
	    "csisolatin1": "iso88591",
	    "csisolatin2": "iso88592",
	    "csisolatin3": "iso88593",
	    "csisolatin4": "iso88594",
	    "csisolatincyrillic": "iso88595",
	    "csisolatinarabic": "iso88596",
	    "csisolatingreek" : "iso88597",
	    "csisolatinhebrew": "iso88598",
	    "csisolatin5": "iso88599",
	    "csisolatin6": "iso885910",
	
	    "l1": "iso88591",
	    "l2": "iso88592",
	    "l3": "iso88593",
	    "l4": "iso88594",
	    "l5": "iso88599",
	    "l6": "iso885910",
	    "l7": "iso885913",
	    "l8": "iso885914",
	    "l9": "iso885915",
	    "l10": "iso885916",
	
	    "isoir14": "iso646jp",
	    "isoir57": "iso646cn",
	    "isoir100": "iso88591",
	    "isoir101": "iso88592",
	    "isoir109": "iso88593",
	    "isoir110": "iso88594",
	    "isoir144": "iso88595",
	    "isoir127": "iso88596",
	    "isoir126": "iso88597",
	    "isoir138": "iso88598",
	    "isoir148": "iso88599",
	    "isoir157": "iso885910",
	    "isoir166": "tis620",
	    "isoir179": "iso885913",
	    "isoir199": "iso885914",
	    "isoir203": "iso885915",
	    "isoir226": "iso885916",
	
	    "cp819": "iso88591",
	    "ibm819": "iso88591",
	
	    "cyrillic": "iso88595",
	
	    "arabic": "iso88596",
	    "arabic8": "iso88596",
	    "ecma114": "iso88596",
	    "asmo708": "iso88596",
	
	    "greek" : "iso88597",
	    "greek8" : "iso88597",
	    "ecma118" : "iso88597",
	    "elot928" : "iso88597",
	
	    "hebrew": "iso88598",
	    "hebrew8": "iso88598",
	
	    "turkish": "iso88599",
	    "turkish8": "iso88599",
	
	    "thai": "iso885911",
	    "thai8": "iso885911",
	
	    "celtic": "iso885914",
	    "celtic8": "iso885914",
	    "isoceltic": "iso885914",
	
	    "tis6200": "tis620",
	    "tis62025291": "tis620",
	    "tis62025330": "tis620",
	
	    "10000": "macroman",
	    "10006": "macgreek",
	    "10007": "maccyrillic",
	    "10079": "maciceland",
	    "10081": "macturkish",
	
	    "cspc8codepage437": "cp437",
	    "cspc775baltic": "cp775",
	    "cspc850multilingual": "cp850",
	    "cspcp852": "cp852",
	    "cspc862latinhebrew": "cp862",
	    "cpgr": "cp869",
	
	    "msee": "cp1250",
	    "mscyrl": "cp1251",
	    "msansi": "cp1252",
	    "msgreek": "cp1253",
	    "msturk": "cp1254",
	    "mshebr": "cp1255",
	    "msarab": "cp1256",
	    "winbaltrim": "cp1257",
	
	    "cp20866": "koi8r",
	    "20866": "koi8r",
	    "ibm878": "koi8r",
	    "cskoi8r": "koi8r",
	
	    "cp21866": "koi8u",
	    "21866": "koi8u",
	    "ibm1168": "koi8u",
	
	    "strk10482002": "rk1048",
	
	    "tcvn5712": "tcvn",
	    "tcvn57121": "tcvn",
	
	    "gb198880": "iso646cn",
	    "cn": "iso646cn",
	
	    "csiso14jisc6220ro": "iso646jp",
	    "jisc62201969ro": "iso646jp",
	    "jp": "iso646jp",
	
	    "cshproman8": "hproman8",
	    "r8": "hproman8",
	    "roman8": "hproman8",
	    "xroman8": "hproman8",
	    "ibm1051": "hproman8",
	
	    "mac": "macintosh",
	    "csmacintosh": "macintosh",
	};
	


/***/ },
/* 120 */
/***/ function(module, exports) {

	"use strict"
	
	// Generated data for sbcs codec. Don't edit manually. Regenerate using generation/gen-sbcs.js script.
	module.exports = {
	  "437": "cp437",
	  "737": "cp737",
	  "775": "cp775",
	  "850": "cp850",
	  "852": "cp852",
	  "855": "cp855",
	  "856": "cp856",
	  "857": "cp857",
	  "858": "cp858",
	  "860": "cp860",
	  "861": "cp861",
	  "862": "cp862",
	  "863": "cp863",
	  "864": "cp864",
	  "865": "cp865",
	  "866": "cp866",
	  "869": "cp869",
	  "874": "windows874",
	  "922": "cp922",
	  "1046": "cp1046",
	  "1124": "cp1124",
	  "1125": "cp1125",
	  "1129": "cp1129",
	  "1133": "cp1133",
	  "1161": "cp1161",
	  "1162": "cp1162",
	  "1163": "cp1163",
	  "1250": "windows1250",
	  "1251": "windows1251",
	  "1252": "windows1252",
	  "1253": "windows1253",
	  "1254": "windows1254",
	  "1255": "windows1255",
	  "1256": "windows1256",
	  "1257": "windows1257",
	  "1258": "windows1258",
	  "28591": "iso88591",
	  "28592": "iso88592",
	  "28593": "iso88593",
	  "28594": "iso88594",
	  "28595": "iso88595",
	  "28596": "iso88596",
	  "28597": "iso88597",
	  "28598": "iso88598",
	  "28599": "iso88599",
	  "28600": "iso885910",
	  "28601": "iso885911",
	  "28603": "iso885913",
	  "28604": "iso885914",
	  "28605": "iso885915",
	  "28606": "iso885916",
	  "windows874": {
	    "type": "_sbcs",
	    "chars": "€����…�����������‘’“”•–—�������� กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุู����฿เแโใไๅๆ็่้๊๋์ํ๎๏๐๑๒๓๔๕๖๗๘๙๚๛����"
	  },
	  "win874": "windows874",
	  "cp874": "windows874",
	  "windows1250": {
	    "type": "_sbcs",
	    "chars": "€�‚�„…†‡�‰Š‹ŚŤŽŹ�‘’“”•–—�™š›śťžź ˇ˘Ł¤Ą¦§¨©Ş«¬­®Ż°±˛ł´µ¶·¸ąş»Ľ˝ľżŔÁÂĂÄĹĆÇČÉĘËĚÍÎĎĐŃŇÓÔŐÖ×ŘŮÚŰÜÝŢßŕáâăäĺćçčéęëěíîďđńňóôőö÷řůúűüýţ˙"
	  },
	  "win1250": "windows1250",
	  "cp1250": "windows1250",
	  "windows1251": {
	    "type": "_sbcs",
	    "chars": "ЂЃ‚ѓ„…†‡€‰Љ‹ЊЌЋЏђ‘’“”•–—�™љ›њќћџ ЎўЈ¤Ґ¦§Ё©Є«¬­®Ї°±Ііґµ¶·ё№є»јЅѕїАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя"
	  },
	  "win1251": "windows1251",
	  "cp1251": "windows1251",
	  "windows1252": {
	    "type": "_sbcs",
	    "chars": "€�‚ƒ„…†‡ˆ‰Š‹Œ�Ž��‘’“”•–—˜™š›œ�žŸ ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ"
	  },
	  "win1252": "windows1252",
	  "cp1252": "windows1252",
	  "windows1253": {
	    "type": "_sbcs",
	    "chars": "€�‚ƒ„…†‡�‰�‹�����‘’“”•–—�™�›���� ΅Ά£¤¥¦§¨©�«¬­®―°±²³΄µ¶·ΈΉΊ»Ό½ΎΏΐΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡ�ΣΤΥΦΧΨΩΪΫάέήίΰαβγδεζηθικλμνξοπρςστυφχψωϊϋόύώ�"
	  },
	  "win1253": "windows1253",
	  "cp1253": "windows1253",
	  "windows1254": {
	    "type": "_sbcs",
	    "chars": "€�‚ƒ„…†‡ˆ‰Š‹Œ����‘’“”•–—˜™š›œ��Ÿ ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏĞÑÒÓÔÕÖ×ØÙÚÛÜİŞßàáâãäåæçèéêëìíîïğñòóôõö÷øùúûüışÿ"
	  },
	  "win1254": "windows1254",
	  "cp1254": "windows1254",
	  "windows1255": {
	    "type": "_sbcs",
	    "chars": "€�‚ƒ„…†‡ˆ‰�‹�����‘’“”•–—˜™�›���� ¡¢£₪¥¦§¨©×«¬­®¯°±²³´µ¶·¸¹÷»¼½¾¿ְֱֲֳִֵֶַָֹ�ֻּֽ־ֿ׀ׁׂ׃װױײ׳״�������אבגדהוזחטיךכלםמןנסעףפץצקרשת��‎‏�"
	  },
	  "win1255": "windows1255",
	  "cp1255": "windows1255",
	  "windows1256": {
	    "type": "_sbcs",
	    "chars": "€پ‚ƒ„…†‡ˆ‰ٹ‹Œچژڈگ‘’“”•–—ک™ڑ›œ‌‍ں ،¢£¤¥¦§¨©ھ«¬­®¯°±²³´µ¶·¸¹؛»¼½¾؟ہءآأؤإئابةتثجحخدذرزسشصض×طظعغـفقكàلâمنهوçèéêëىيîïًٌٍَôُِ÷ّùْûü‎‏ے"
	  },
	  "win1256": "windows1256",
	  "cp1256": "windows1256",
	  "windows1257": {
	    "type": "_sbcs",
	    "chars": "€�‚�„…†‡�‰�‹�¨ˇ¸�‘’“”•–—�™�›�¯˛� �¢£¤�¦§Ø©Ŗ«¬­®Æ°±²³´µ¶·ø¹ŗ»¼½¾æĄĮĀĆÄÅĘĒČÉŹĖĢĶĪĻŠŃŅÓŌÕÖ×ŲŁŚŪÜŻŽßąįāćäåęēčéźėģķīļšńņóōõö÷ųłśūüżž˙"
	  },
	  "win1257": "windows1257",
	  "cp1257": "windows1257",
	  "windows1258": {
	    "type": "_sbcs",
	    "chars": "€�‚ƒ„…†‡ˆ‰�‹Œ����‘’“”•–—˜™�›œ��Ÿ ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂĂÄÅÆÇÈÉÊË̀ÍÎÏĐÑ̉ÓÔƠÖ×ØÙÚÛÜỮßàáâăäåæçèéêë́íîïđṇ̃óôơö÷øùúûüư₫ÿ"
	  },
	  "win1258": "windows1258",
	  "cp1258": "windows1258",
	  "iso88591": {
	    "type": "_sbcs",
	    "chars": " ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ"
	  },
	  "cp28591": "iso88591",
	  "iso88592": {
	    "type": "_sbcs",
	    "chars": " Ą˘Ł¤ĽŚ§¨ŠŞŤŹ­ŽŻ°ą˛ł´ľśˇ¸šşťź˝žżŔÁÂĂÄĹĆÇČÉĘËĚÍÎĎĐŃŇÓÔŐÖ×ŘŮÚŰÜÝŢßŕáâăäĺćçčéęëěíîďđńňóôőö÷řůúűüýţ˙"
	  },
	  "cp28592": "iso88592",
	  "iso88593": {
	    "type": "_sbcs",
	    "chars": " Ħ˘£¤�Ĥ§¨İŞĞĴ­�Ż°ħ²³´µĥ·¸ışğĵ½�żÀÁÂ�ÄĊĈÇÈÉÊËÌÍÎÏ�ÑÒÓÔĠÖ×ĜÙÚÛÜŬŜßàáâ�äċĉçèéêëìíîï�ñòóôġö÷ĝùúûüŭŝ˙"
	  },
	  "cp28593": "iso88593",
	  "iso88594": {
	    "type": "_sbcs",
	    "chars": " ĄĸŖ¤ĨĻ§¨ŠĒĢŦ­Ž¯°ą˛ŗ´ĩļˇ¸šēģŧŊžŋĀÁÂÃÄÅÆĮČÉĘËĖÍÎĪĐŅŌĶÔÕÖ×ØŲÚÛÜŨŪßāáâãäåæįčéęëėíîīđņōķôõö÷øųúûüũū˙"
	  },
	  "cp28594": "iso88594",
	  "iso88595": {
	    "type": "_sbcs",
	    "chars": " ЁЂЃЄЅІЇЈЉЊЋЌ­ЎЏАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя№ёђѓєѕіїјљњћќ§ўџ"
	  },
	  "cp28595": "iso88595",
	  "iso88596": {
	    "type": "_sbcs",
	    "chars": " ���¤�������،­�������������؛���؟�ءآأؤإئابةتثجحخدذرزسشصضطظعغ�����ـفقكلمنهوىيًٌٍَُِّْ�������������"
	  },
	  "cp28596": "iso88596",
	  "iso88597": {
	    "type": "_sbcs",
	    "chars": " ‘’£€₯¦§¨©ͺ«¬­�―°±²³΄΅Ά·ΈΉΊ»Ό½ΎΏΐΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡ�ΣΤΥΦΧΨΩΪΫάέήίΰαβγδεζηθικλμνξοπρςστυφχψωϊϋόύώ�"
	  },
	  "cp28597": "iso88597",
	  "iso88598": {
	    "type": "_sbcs",
	    "chars": " �¢£¤¥¦§¨©×«¬­®¯°±²³´µ¶·¸¹÷»¼½¾��������������������������������‗אבגדהוזחטיךכלםמןנסעףפץצקרשת��‎‏�"
	  },
	  "cp28598": "iso88598",
	  "iso88599": {
	    "type": "_sbcs",
	    "chars": " ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏĞÑÒÓÔÕÖ×ØÙÚÛÜİŞßàáâãäåæçèéêëìíîïğñòóôõö÷øùúûüışÿ"
	  },
	  "cp28599": "iso88599",
	  "iso885910": {
	    "type": "_sbcs",
	    "chars": " ĄĒĢĪĨĶ§ĻĐŠŦŽ­ŪŊ°ąēģīĩķ·ļđšŧž―ūŋĀÁÂÃÄÅÆĮČÉĘËĖÍÎÏÐŅŌÓÔÕÖŨØŲÚÛÜÝÞßāáâãäåæįčéęëėíîïðņōóôõöũøųúûüýþĸ"
	  },
	  "cp28600": "iso885910",
	  "iso885911": {
	    "type": "_sbcs",
	    "chars": " กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุู����฿เแโใไๅๆ็่้๊๋์ํ๎๏๐๑๒๓๔๕๖๗๘๙๚๛����"
	  },
	  "cp28601": "iso885911",
	  "iso885913": {
	    "type": "_sbcs",
	    "chars": " ”¢£¤„¦§Ø©Ŗ«¬­®Æ°±²³“µ¶·ø¹ŗ»¼½¾æĄĮĀĆÄÅĘĒČÉŹĖĢĶĪĻŠŃŅÓŌÕÖ×ŲŁŚŪÜŻŽßąįāćäåęēčéźėģķīļšńņóōõö÷ųłśūüżž’"
	  },
	  "cp28603": "iso885913",
	  "iso885914": {
	    "type": "_sbcs",
	    "chars": " Ḃḃ£ĊċḊ§Ẁ©ẂḋỲ­®ŸḞḟĠġṀṁ¶ṖẁṗẃṠỳẄẅṡÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏŴÑÒÓÔÕÖṪØÙÚÛÜÝŶßàáâãäåæçèéêëìíîïŵñòóôõöṫøùúûüýŷÿ"
	  },
	  "cp28604": "iso885914",
	  "iso885915": {
	    "type": "_sbcs",
	    "chars": " ¡¢£€¥Š§š©ª«¬­®¯°±²³Žµ¶·ž¹º»ŒœŸ¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ"
	  },
	  "cp28605": "iso885915",
	  "iso885916": {
	    "type": "_sbcs",
	    "chars": " ĄąŁ€„Š§š©Ș«Ź­źŻ°±ČłŽ”¶·žčș»ŒœŸżÀÁÂĂÄĆÆÇÈÉÊËÌÍÎÏĐŃÒÓÔŐÖŚŰÙÚÛÜĘȚßàáâăäćæçèéêëìíîïđńòóôőöśűùúûüęțÿ"
	  },
	  "cp28606": "iso885916",
	  "cp437": {
	    "type": "_sbcs",
	    "chars": "ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜ¢£¥₧ƒáíóúñÑªº¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ "
	  },
	  "ibm437": "cp437",
	  "csibm437": "cp437",
	  "cp737": {
	    "type": "_sbcs",
	    "chars": "ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρσςτυφχψ░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀ωάέήϊίόύϋώΆΈΉΊΌΎΏ±≥≤ΪΫ÷≈°∙·√ⁿ²■ "
	  },
	  "ibm737": "cp737",
	  "csibm737": "cp737",
	  "cp775": {
	    "type": "_sbcs",
	    "chars": "ĆüéāäģåćłēŖŗīŹÄÅÉæÆōöĢ¢ŚśÖÜø£Ø×¤ĀĪóŻżź”¦©®¬½¼Ł«»░▒▓│┤ĄČĘĖ╣║╗╝ĮŠ┐└┴┬├─┼ŲŪ╚╔╩╦╠═╬Žąčęėįšųūž┘┌█▄▌▐▀ÓßŌŃõÕµńĶķĻļņĒŅ’­±“¾¶§÷„°∙·¹³²■ "
	  },
	  "ibm775": "cp775",
	  "csibm775": "cp775",
	  "cp850": {
	    "type": "_sbcs",
	    "chars": "ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜø£Ø×ƒáíóúñÑªº¿®¬½¼¡«»░▒▓│┤ÁÂÀ©╣║╗╝¢¥┐└┴┬├─┼ãÃ╚╔╩╦╠═╬¤ðÐÊËÈıÍÎÏ┘┌█▄¦Ì▀ÓßÔÒõÕµþÞÚÛÙýÝ¯´­±‗¾¶§÷¸°¨·¹³²■ "
	  },
	  "ibm850": "cp850",
	  "csibm850": "cp850",
	  "cp852": {
	    "type": "_sbcs",
	    "chars": "ÇüéâäůćçłëŐőîŹÄĆÉĹĺôöĽľŚśÖÜŤťŁ×čáíóúĄąŽžĘę¬źČş«»░▒▓│┤ÁÂĚŞ╣║╗╝Żż┐└┴┬├─┼Ăă╚╔╩╦╠═╬¤đĐĎËďŇÍÎě┘┌█▄ŢŮ▀ÓßÔŃńňŠšŔÚŕŰýÝţ´­˝˛ˇ˘§÷¸°¨˙űŘř■ "
	  },
	  "ibm852": "cp852",
	  "csibm852": "cp852",
	  "cp855": {
	    "type": "_sbcs",
	    "chars": "ђЂѓЃёЁєЄѕЅіІїЇјЈљЉњЊћЋќЌўЎџЏюЮъЪаАбБцЦдДеЕфФгГ«»░▒▓│┤хХиИ╣║╗╝йЙ┐└┴┬├─┼кК╚╔╩╦╠═╬¤лЛмМнНоОп┘┌█▄Пя▀ЯрРсСтТуУжЖвВьЬ№­ыЫзЗшШэЭщЩчЧ§■ "
	  },
	  "ibm855": "cp855",
	  "csibm855": "cp855",
	  "cp856": {
	    "type": "_sbcs",
	    "chars": "אבגדהוזחטיךכלםמןנסעףפץצקרשת�£�×����������®¬½¼�«»░▒▓│┤���©╣║╗╝¢¥┐└┴┬├─┼��╚╔╩╦╠═╬¤���������┘┌█▄¦�▀������µ�������¯´­±‗¾¶§÷¸°¨·¹³²■ "
	  },
	  "ibm856": "cp856",
	  "csibm856": "cp856",
	  "cp857": {
	    "type": "_sbcs",
	    "chars": "ÇüéâäàåçêëèïîıÄÅÉæÆôöòûùİÖÜø£ØŞşáíóúñÑĞğ¿®¬½¼¡«»░▒▓│┤ÁÂÀ©╣║╗╝¢¥┐└┴┬├─┼ãÃ╚╔╩╦╠═╬¤ºªÊËÈ�ÍÎÏ┘┌█▄¦Ì▀ÓßÔÒõÕµ�×ÚÛÙìÿ¯´­±�¾¶§÷¸°¨·¹³²■ "
	  },
	  "ibm857": "cp857",
	  "csibm857": "cp857",
	  "cp858": {
	    "type": "_sbcs",
	    "chars": "ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜø£Ø×ƒáíóúñÑªº¿®¬½¼¡«»░▒▓│┤ÁÂÀ©╣║╗╝¢¥┐└┴┬├─┼ãÃ╚╔╩╦╠═╬¤ðÐÊËÈ€ÍÎÏ┘┌█▄¦Ì▀ÓßÔÒõÕµþÞÚÛÙýÝ¯´­±‗¾¶§÷¸°¨·¹³²■ "
	  },
	  "ibm858": "cp858",
	  "csibm858": "cp858",
	  "cp860": {
	    "type": "_sbcs",
	    "chars": "ÇüéâãàÁçêÊèÍÔìÃÂÉÀÈôõòÚùÌÕÜ¢£Ù₧ÓáíóúñÑªº¿Ò¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ "
	  },
	  "ibm860": "cp860",
	  "csibm860": "cp860",
	  "cp861": {
	    "type": "_sbcs",
	    "chars": "ÇüéâäàåçêëèÐðÞÄÅÉæÆôöþûÝýÖÜø£Ø₧ƒáíóúÁÍÓÚ¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ "
	  },
	  "ibm861": "cp861",
	  "csibm861": "cp861",
	  "cp862": {
	    "type": "_sbcs",
	    "chars": "אבגדהוזחטיךכלםמןנסעףפץצקרשת¢£¥₧ƒáíóúñÑªº¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ "
	  },
	  "ibm862": "cp862",
	  "csibm862": "cp862",
	  "cp863": {
	    "type": "_sbcs",
	    "chars": "ÇüéâÂà¶çêëèïî‗À§ÉÈÊôËÏûù¤ÔÜ¢£ÙÛƒ¦´óú¨¸³¯Î⌐¬½¼¾«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ "
	  },
	  "ibm863": "cp863",
	  "csibm863": "cp863",
	  "cp864": {
	    "type": "_sbcs",
	    "chars": "\u0000\u0001\u0002\u0003\u0004\u0005\u0006\u0007\b\t\n\u000b\f\r\u000e\u000f\u0010\u0011\u0012\u0013\u0014\u0015\u0016\u0017\u0018\u0019\u001a\u001b\u001c\u001d\u001e\u001f !\"#$٪&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~°·∙√▒─│┼┤┬├┴┐┌└┘β∞φ±½¼≈«»ﻷﻸ��ﻻﻼ� ­ﺂ£¤ﺄ��ﺎﺏﺕﺙ،ﺝﺡﺥ٠١٢٣٤٥٦٧٨٩ﻑ؛ﺱﺵﺹ؟¢ﺀﺁﺃﺅﻊﺋﺍﺑﺓﺗﺛﺟﺣﺧﺩﺫﺭﺯﺳﺷﺻﺿﻁﻅﻋﻏ¦¬÷×ﻉـﻓﻗﻛﻟﻣﻧﻫﻭﻯﻳﺽﻌﻎﻍﻡﹽّﻥﻩﻬﻰﻲﻐﻕﻵﻶﻝﻙﻱ■�"
	  },
	  "ibm864": "cp864",
	  "csibm864": "cp864",
	  "cp865": {
	    "type": "_sbcs",
	    "chars": "ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜø£Ø₧ƒáíóúñÑªº¿⌐¬½¼¡«¤░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ "
	  },
	  "ibm865": "cp865",
	  "csibm865": "cp865",
	  "cp866": {
	    "type": "_sbcs",
	    "chars": "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмноп░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀рстуфхцчшщъыьэюяЁёЄєЇїЎў°∙·√№¤■ "
	  },
	  "ibm866": "cp866",
	  "csibm866": "cp866",
	  "cp869": {
	    "type": "_sbcs",
	    "chars": "������Ά�·¬¦‘’Έ―ΉΊΪΌ��ΎΫ©Ώ²³ά£έήίϊΐόύΑΒΓΔΕΖΗ½ΘΙ«»░▒▓│┤ΚΛΜΝ╣║╗╝ΞΟ┐└┴┬├─┼ΠΡ╚╔╩╦╠═╬ΣΤΥΦΧΨΩαβγ┘┌█▄δε▀ζηθικλμνξοπρσςτ΄­±υφχ§ψ΅°¨ωϋΰώ■ "
	  },
	  "ibm869": "cp869",
	  "csibm869": "cp869",
	  "cp922": {
	    "type": "_sbcs",
	    "chars": " ¡¢£¤¥¦§¨©ª«¬­®‾°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏŠÑÒÓÔÕÖ×ØÙÚÛÜÝŽßàáâãäåæçèéêëìíîïšñòóôõö÷øùúûüýžÿ"
	  },
	  "ibm922": "cp922",
	  "csibm922": "cp922",
	  "cp1046": {
	    "type": "_sbcs",
	    "chars": "ﺈ×÷ﹱ■│─┐┌└┘ﹹﹻﹽﹿﹷﺊﻰﻳﻲﻎﻏﻐﻶﻸﻺﻼ ¤ﺋﺑﺗﺛﺟﺣ،­ﺧﺳ٠١٢٣٤٥٦٧٨٩ﺷ؛ﺻﺿﻊ؟ﻋءآأؤإئابةتثجحخدذرزسشصضطﻇعغﻌﺂﺄﺎﻓـفقكلمنهوىيًٌٍَُِّْﻗﻛﻟﻵﻷﻹﻻﻣﻧﻬﻩ�"
	  },
	  "ibm1046": "cp1046",
	  "csibm1046": "cp1046",
	  "cp1124": {
	    "type": "_sbcs",
	    "chars": " ЁЂҐЄЅІЇЈЉЊЋЌ­ЎЏАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя№ёђґєѕіїјљњћќ§ўџ"
	  },
	  "ibm1124": "cp1124",
	  "csibm1124": "cp1124",
	  "cp1125": {
	    "type": "_sbcs",
	    "chars": "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмноп░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀рстуфхцчшщъыьэюяЁёҐґЄєІіЇї·√№¤■ "
	  },
	  "ibm1125": "cp1125",
	  "csibm1125": "cp1125",
	  "cp1129": {
	    "type": "_sbcs",
	    "chars": " ¡¢£¤¥¦§œ©ª«¬­®¯°±²³Ÿµ¶·Œ¹º»¼½¾¿ÀÁÂĂÄÅÆÇÈÉÊË̀ÍÎÏĐÑ̉ÓÔƠÖ×ØÙÚÛÜỮßàáâăäåæçèéêë́íîïđṇ̃óôơö÷øùúûüư₫ÿ"
	  },
	  "ibm1129": "cp1129",
	  "csibm1129": "cp1129",
	  "cp1133": {
	    "type": "_sbcs",
	    "chars": " ກຂຄງຈສຊຍດຕຖທນບປຜຝພຟມຢຣລວຫອຮ���ຯະາຳິີຶືຸູຼັົຽ���ເແໂໃໄ່້໊໋໌ໍໆ�ໜໝ₭����������������໐໑໒໓໔໕໖໗໘໙��¢¬¦�"
	  },
	  "ibm1133": "cp1133",
	  "csibm1133": "cp1133",
	  "cp1161": {
	    "type": "_sbcs",
	    "chars": "��������������������������������่กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุู้๊๋€฿เแโใไๅๆ็่้๊๋์ํ๎๏๐๑๒๓๔๕๖๗๘๙๚๛¢¬¦ "
	  },
	  "ibm1161": "cp1161",
	  "csibm1161": "cp1161",
	  "cp1162": {
	    "type": "_sbcs",
	    "chars": "€…‘’“”•–— กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุู����฿เแโใไๅๆ็่้๊๋์ํ๎๏๐๑๒๓๔๕๖๗๘๙๚๛����"
	  },
	  "ibm1162": "cp1162",
	  "csibm1162": "cp1162",
	  "cp1163": {
	    "type": "_sbcs",
	    "chars": " ¡¢£€¥¦§œ©ª«¬­®¯°±²³Ÿµ¶·Œ¹º»¼½¾¿ÀÁÂĂÄÅÆÇÈÉÊË̀ÍÎÏĐÑ̉ÓÔƠÖ×ØÙÚÛÜỮßàáâăäåæçèéêë́íîïđṇ̃óôơö÷øùúûüư₫ÿ"
	  },
	  "ibm1163": "cp1163",
	  "csibm1163": "cp1163",
	  "maccroatian": {
	    "type": "_sbcs",
	    "chars": "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®Š™´¨≠ŽØ∞±≤≥∆µ∂∑∏š∫ªºΩžø¿¡¬√ƒ≈Ć«Č… ÀÃÕŒœĐ—“”‘’÷◊�©⁄¤‹›Æ»–·‚„‰ÂćÁčÈÍÎÏÌÓÔđÒÚÛÙıˆ˜¯πË˚¸Êæˇ"
	  },
	  "maccyrillic": {
	    "type": "_sbcs",
	    "chars": "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ†°¢£§•¶І®©™Ђђ≠Ѓѓ∞±≤≥іµ∂ЈЄєЇїЉљЊњјЅ¬√ƒ≈∆«»… ЋћЌќѕ–—“”‘’÷„ЎўЏџ№Ёёяабвгдежзийклмнопрстуфхцчшщъыьэю¤"
	  },
	  "macgreek": {
	    "type": "_sbcs",
	    "chars": "Ä¹²É³ÖÜ΅àâä΄¨çéèêë£™îï•½‰ôö¦­ùûü†ΓΔΘΛΞΠß®©ΣΪ§≠°·Α±≤≥¥ΒΕΖΗΙΚΜΦΫΨΩάΝ¬ΟΡ≈Τ«»… ΥΧΆΈœ–―“”‘’÷ΉΊΌΎέήίόΏύαβψδεφγηιξκλμνοπώρστθωςχυζϊϋΐΰ�"
	  },
	  "maciceland": {
	    "type": "_sbcs",
	    "chars": "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûüÝ°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄¤ÐðÞþý·‚„‰ÂÊÁËÈÍÎÏÌÓÔ�ÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ"
	  },
	  "macroman": {
	    "type": "_sbcs",
	    "chars": "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄¤‹›ﬁﬂ‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔ�ÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ"
	  },
	  "macromania": {
	    "type": "_sbcs",
	    "chars": "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ĂŞ∞±≤≥¥µ∂∑∏π∫ªºΩăş¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄¤‹›Ţţ‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔ�ÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ"
	  },
	  "macthai": {
	    "type": "_sbcs",
	    "chars": "«»…“”�•‘’� กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุู﻿​–—฿เแโใไๅๆ็่้๊๋์ํ™๏๐๑๒๓๔๕๖๗๘๙®©����"
	  },
	  "macturkish": {
	    "type": "_sbcs",
	    "chars": "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸĞğİıŞş‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔ�ÒÚÛÙ�ˆ˜¯˘˙˚¸˝˛ˇ"
	  },
	  "macukraine": {
	    "type": "_sbcs",
	    "chars": "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ†°Ґ£§•¶І®©™Ђђ≠Ѓѓ∞±≤≥іµґЈЄєЇїЉљЊњјЅ¬√ƒ≈∆«»… ЋћЌќѕ–—“”‘’÷„ЎўЏџ№Ёёяабвгдежзийклмнопрстуфхцчшщъыьэю¤"
	  },
	  "koi8r": {
	    "type": "_sbcs",
	    "chars": "─│┌┐└┘├┤┬┴┼▀▄█▌▐░▒▓⌠■∙√≈≤≥ ⌡°²·÷═║╒ё╓╔╕╖╗╘╙╚╛╜╝╞╟╠╡Ё╢╣╤╥╦╧╨╩╪╫╬©юабцдефгхийклмнопярстужвьызшэщчъЮАБЦДЕФГХИЙКЛМНОПЯРСТУЖВЬЫЗШЭЩЧЪ"
	  },
	  "koi8u": {
	    "type": "_sbcs",
	    "chars": "─│┌┐└┘├┤┬┴┼▀▄█▌▐░▒▓⌠■∙√≈≤≥ ⌡°²·÷═║╒ёє╔ії╗╘╙╚╛ґ╝╞╟╠╡ЁЄ╣ІЇ╦╧╨╩╪Ґ╬©юабцдефгхийклмнопярстужвьызшэщчъЮАБЦДЕФГХИЙКЛМНОПЯРСТУЖВЬЫЗШЭЩЧЪ"
	  },
	  "koi8ru": {
	    "type": "_sbcs",
	    "chars": "─│┌┐└┘├┤┬┴┼▀▄█▌▐░▒▓⌠■∙√≈≤≥ ⌡°²·÷═║╒ёє╔ії╗╘╙╚╛ґў╞╟╠╡ЁЄ╣ІЇ╦╧╨╩╪ҐЎ©юабцдефгхийклмнопярстужвьызшэщчъЮАБЦДЕФГХИЙКЛМНОПЯРСТУЖВЬЫЗШЭЩЧЪ"
	  },
	  "koi8t": {
	    "type": "_sbcs",
	    "chars": "қғ‚Ғ„…†‡�‰ҳ‹ҲҷҶ�Қ‘’“”•–—�™�›�����ӯӮё¤ӣ¦§���«¬­®�°±²Ё�Ӣ¶·�№�»���©юабцдефгхийклмнопярстужвьызшэщчъЮАБЦДЕФГХИЙКЛМНОПЯРСТУЖВЬЫЗШЭЩЧЪ"
	  },
	  "armscii8": {
	    "type": "_sbcs",
	    "chars": " �և։)(»«—.՝,-֊…՜՛՞ԱաԲբԳգԴդԵեԶզԷէԸըԹթԺժԻիԼլԽխԾծԿկՀհՁձՂղՃճՄմՅյՆնՇշՈոՉչՊպՋջՌռՍսՎվՏտՐրՑցՒւՓփՔքՕօՖֆ՚�"
	  },
	  "rk1048": {
	    "type": "_sbcs",
	    "chars": "ЂЃ‚ѓ„…†‡€‰Љ‹ЊҚҺЏђ‘’“”•–—�™љ›њқһџ ҰұӘ¤Ө¦§Ё©Ғ«¬­®Ү°±Ііөµ¶·ё№ғ»әҢңүАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя"
	  },
	  "tcvn": {
	    "type": "_sbcs",
	    "chars": "\u0000ÚỤ\u0003ỪỬỮ\u0007\b\t\n\u000b\f\r\u000e\u000f\u0010ỨỰỲỶỸÝỴ\u0018\u0019\u001a\u001b\u001c\u001d\u001e\u001f !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~ÀẢÃÁẠẶẬÈẺẼÉẸỆÌỈĨÍỊÒỎÕÓỌỘỜỞỠỚỢÙỦŨ ĂÂÊÔƠƯĐăâêôơưđẶ̀̀̉̃́àảãáạẲằẳẵắẴẮẦẨẪẤỀặầẩẫấậèỂẻẽéẹềểễếệìỉỄẾỒĩíịòỔỏõóọồổỗốộờởỡớợùỖủũúụừửữứựỳỷỹýỵỐ"
	  },
	  "georgianacademy": {
	    "type": "_sbcs",
	    "chars": "‚ƒ„…†‡ˆ‰Š‹Œ‘’“”•–—˜™š›œŸ ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿აბგდევზთიკლმნოპჟრსტუფქღყშჩცძწჭხჯჰჱჲჳჴჵჶçèéêëìíîïðñòóôõö÷øùúûüýþÿ"
	  },
	  "georgianps": {
	    "type": "_sbcs",
	    "chars": "‚ƒ„…†‡ˆ‰Š‹Œ‘’“”•–—˜™š›œŸ ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿აბგდევზჱთიკლმნჲოპჟრსტჳუფქღყშჩცძწჭხჴჯჰჵæçèéêëìíîïðñòóôõö÷øùúûüýþÿ"
	  },
	  "pt154": {
	    "type": "_sbcs",
	    "chars": "ҖҒӮғ„…ҶҮҲүҠӢҢҚҺҸҗ‘’“”•–—ҳҷҡӣңқһҹ ЎўЈӨҘҰ§Ё©Ә«¬ӯ®Ҝ°ұІіҙө¶·ё№ә»јҪҫҝАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя"
	  },
	  "viscii": {
	    "type": "_sbcs",
	    "chars": "\u0000\u0001Ẳ\u0003\u0004ẴẪ\u0007\b\t\n\u000b\f\r\u000e\u000f\u0010\u0011\u0012\u0013Ỷ\u0015\u0016\u0017\u0018Ỹ\u001a\u001b\u001c\u001dỴ\u001f !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~ẠẮẰẶẤẦẨẬẼẸẾỀỂỄỆỐỒỔỖỘỢỚỜỞỊỎỌỈỦŨỤỲÕắằặấầẩậẽẹếềểễệốồổỗỠƠộờởịỰỨỪỬơớƯÀÁÂÃẢĂẳẵÈÉÊẺÌÍĨỳĐứÒÓÔạỷừửÙÚỹỵÝỡưàáâãảăữẫèéêẻìíĩỉđựòóôõỏọụùúũủýợỮ"
	  },
	  "iso646cn": {
	    "type": "_sbcs",
	    "chars": "\u0000\u0001\u0002\u0003\u0004\u0005\u0006\u0007\b\t\n\u000b\f\r\u000e\u000f\u0010\u0011\u0012\u0013\u0014\u0015\u0016\u0017\u0018\u0019\u001a\u001b\u001c\u001d\u001e\u001f !\"#¥%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}‾��������������������������������������������������������������������������������������������������������������������������������"
	  },
	  "iso646jp": {
	    "type": "_sbcs",
	    "chars": "\u0000\u0001\u0002\u0003\u0004\u0005\u0006\u0007\b\t\n\u000b\f\r\u000e\u000f\u0010\u0011\u0012\u0013\u0014\u0015\u0016\u0017\u0018\u0019\u001a\u001b\u001c\u001d\u001e\u001f !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[¥]^_`abcdefghijklmnopqrstuvwxyz{|}‾��������������������������������������������������������������������������������������������������������������������������������"
	  },
	  "hproman8": {
	    "type": "_sbcs",
	    "chars": " ÀÂÈÊËÎÏ´ˋˆ¨˜ÙÛ₤¯Ýý°ÇçÑñ¡¿¤£¥§ƒ¢âêôûáéóúàèòùäëöüÅîØÆåíøæÄìÖÜÉïßÔÁÃãÐðÍÌÓÒÕõŠšÚŸÿÞþ·µ¶¾—¼½ªº«■»±�"
	  },
	  "macintosh": {
	    "type": "_sbcs",
	    "chars": "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄¤‹›ﬁﬂ‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔ�ÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ"
	  },
	  "ascii": {
	    "type": "_sbcs",
	    "chars": "��������������������������������������������������������������������������������������������������������������������������������"
	  },
	  "tis620": {
	    "type": "_sbcs",
	    "chars": "���������������������������������กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุู����฿เแโใไๅๆ็่้๊๋์ํ๎๏๐๑๒๓๔๕๖๗๘๙๚๛����"
	  }
	}

/***/ },
/* 121 */
/***/ function(module, exports) {

	"use strict"
	
	// Multibyte codec. In this scheme, a character is represented by 1 or more bytes.
	// Our codec supports UTF-16 surrogates, extensions for GB18030 and unicode sequences.
	// To save memory and loading time, we read table files only when requested.
	
	exports._dbcs = DBCSCodec;
	
	var UNASSIGNED = -1,
	    GB18030_CODE = -2,
	    SEQ_START  = -10,
	    NODE_START = -1000,
	    UNASSIGNED_NODE = new Array(0x100),
	    DEF_CHAR = -1;
	
	for (var i = 0; i < 0x100; i++)
	    UNASSIGNED_NODE[i] = UNASSIGNED;
	
	
	// Class DBCSCodec reads and initializes mapping tables.
	function DBCSCodec(codecOptions, iconv) {
	    this.encodingName = codecOptions.encodingName;
	    if (!codecOptions)
	        throw new Error("DBCS codec is called without the data.")
	    if (!codecOptions.table)
	        throw new Error("Encoding '" + this.encodingName + "' has no data.");
	
	    // Load tables.
	    var mappingTable = codecOptions.table();
	
	
	    // Decode tables: MBCS -> Unicode.
	
	    // decodeTables is a trie, encoded as an array of arrays of integers. Internal arrays are trie nodes and all have len = 256.
	    // Trie root is decodeTables[0].
	    // Values: >=  0 -> unicode character code. can be > 0xFFFF
	    //         == UNASSIGNED -> unknown/unassigned sequence.
	    //         == GB18030_CODE -> this is the end of a GB18030 4-byte sequence.
	    //         <= NODE_START -> index of the next node in our trie to process next byte.
	    //         <= SEQ_START  -> index of the start of a character code sequence, in decodeTableSeq.
	    this.decodeTables = [];
	    this.decodeTables[0] = UNASSIGNED_NODE.slice(0); // Create root node.
	
	    // Sometimes a MBCS char corresponds to a sequence of unicode chars. We store them as arrays of integers here. 
	    this.decodeTableSeq = [];
	
	    // Actual mapping tables consist of chunks. Use them to fill up decode tables.
	    for (var i = 0; i < mappingTable.length; i++)
	        this._addDecodeChunk(mappingTable[i]);
	
	    this.defaultCharUnicode = iconv.defaultCharUnicode;
	
	    
	    // Encode tables: Unicode -> DBCS.
	
	    // `encodeTable` is array mapping from unicode char to encoded char. All its values are integers for performance.
	    // Because it can be sparse, it is represented as array of buckets by 256 chars each. Bucket can be null.
	    // Values: >=  0 -> it is a normal char. Write the value (if <=256 then 1 byte, if <=65536 then 2 bytes, etc.).
	    //         == UNASSIGNED -> no conversion found. Output a default char.
	    //         <= SEQ_START  -> it's an index in encodeTableSeq, see below. The character starts a sequence.
	    this.encodeTable = [];
	    
	    // `encodeTableSeq` is used when a sequence of unicode characters is encoded as a single code. We use a tree of
	    // objects where keys correspond to characters in sequence and leafs are the encoded dbcs values. A special DEF_CHAR key
	    // means end of sequence (needed when one sequence is a strict subsequence of another).
	    // Objects are kept separately from encodeTable to increase performance.
	    this.encodeTableSeq = [];
	
	    // Some chars can be decoded, but need not be encoded.
	    var skipEncodeChars = {};
	    if (codecOptions.encodeSkipVals)
	        for (var i = 0; i < codecOptions.encodeSkipVals.length; i++) {
	            var val = codecOptions.encodeSkipVals[i];
	            if (typeof val === 'number')
	                skipEncodeChars[val] = true;
	            else
	                for (var j = val.from; j <= val.to; j++)
	                    skipEncodeChars[j] = true;
	        }
	        
	    // Use decode trie to recursively fill out encode tables.
	    this._fillEncodeTable(0, 0, skipEncodeChars);
	
	    // Add more encoding pairs when needed.
	    if (codecOptions.encodeAdd) {
	        for (var uChar in codecOptions.encodeAdd)
	            if (Object.prototype.hasOwnProperty.call(codecOptions.encodeAdd, uChar))
	                this._setEncodeChar(uChar.charCodeAt(0), codecOptions.encodeAdd[uChar]);
	    }
	
	    this.defCharSB  = this.encodeTable[0][iconv.defaultCharSingleByte.charCodeAt(0)];
	    if (this.defCharSB === UNASSIGNED) this.defCharSB = this.encodeTable[0]['?'];
	    if (this.defCharSB === UNASSIGNED) this.defCharSB = "?".charCodeAt(0);
	
	
	    // Load & create GB18030 tables when needed.
	    if (typeof codecOptions.gb18030 === 'function') {
	        this.gb18030 = codecOptions.gb18030(); // Load GB18030 ranges.
	
	        // Add GB18030 decode tables.
	        var thirdByteNodeIdx = this.decodeTables.length;
	        var thirdByteNode = this.decodeTables[thirdByteNodeIdx] = UNASSIGNED_NODE.slice(0);
	
	        var fourthByteNodeIdx = this.decodeTables.length;
	        var fourthByteNode = this.decodeTables[fourthByteNodeIdx] = UNASSIGNED_NODE.slice(0);
	
	        for (var i = 0x81; i <= 0xFE; i++) {
	            var secondByteNodeIdx = NODE_START - this.decodeTables[0][i];
	            var secondByteNode = this.decodeTables[secondByteNodeIdx];
	            for (var j = 0x30; j <= 0x39; j++)
	                secondByteNode[j] = NODE_START - thirdByteNodeIdx;
	        }
	        for (var i = 0x81; i <= 0xFE; i++)
	            thirdByteNode[i] = NODE_START - fourthByteNodeIdx;
	        for (var i = 0x30; i <= 0x39; i++)
	            fourthByteNode[i] = GB18030_CODE
	    }        
	}
	
	DBCSCodec.prototype.encoder = DBCSEncoder;
	DBCSCodec.prototype.decoder = DBCSDecoder;
	
	// Decoder helpers
	DBCSCodec.prototype._getDecodeTrieNode = function(addr) {
	    var bytes = [];
	    for (; addr > 0; addr >>= 8)
	        bytes.push(addr & 0xFF);
	    if (bytes.length == 0)
	        bytes.push(0);
	
	    var node = this.decodeTables[0];
	    for (var i = bytes.length-1; i > 0; i--) { // Traverse nodes deeper into the trie.
	        var val = node[bytes[i]];
	
	        if (val == UNASSIGNED) { // Create new node.
	            node[bytes[i]] = NODE_START - this.decodeTables.length;
	            this.decodeTables.push(node = UNASSIGNED_NODE.slice(0));
	        }
	        else if (val <= NODE_START) { // Existing node.
	            node = this.decodeTables[NODE_START - val];
	        }
	        else
	            throw new Error("Overwrite byte in " + this.encodingName + ", addr: " + addr.toString(16));
	    }
	    return node;
	}
	
	
	DBCSCodec.prototype._addDecodeChunk = function(chunk) {
	    // First element of chunk is the hex mbcs code where we start.
	    var curAddr = parseInt(chunk[0], 16);
	
	    // Choose the decoding node where we'll write our chars.
	    var writeTable = this._getDecodeTrieNode(curAddr);
	    curAddr = curAddr & 0xFF;
	
	    // Write all other elements of the chunk to the table.
	    for (var k = 1; k < chunk.length; k++) {
	        var part = chunk[k];
	        if (typeof part === "string") { // String, write as-is.
	            for (var l = 0; l < part.length;) {
	                var code = part.charCodeAt(l++);
	                if (0xD800 <= code && code < 0xDC00) { // Decode surrogate
	                    var codeTrail = part.charCodeAt(l++);
	                    if (0xDC00 <= codeTrail && codeTrail < 0xE000)
	                        writeTable[curAddr++] = 0x10000 + (code - 0xD800) * 0x400 + (codeTrail - 0xDC00);
	                    else
	                        throw new Error("Incorrect surrogate pair in "  + this.encodingName + " at chunk " + chunk[0]);
	                }
	                else if (0x0FF0 < code && code <= 0x0FFF) { // Character sequence (our own encoding used)
	                    var len = 0xFFF - code + 2;
	                    var seq = [];
	                    for (var m = 0; m < len; m++)
	                        seq.push(part.charCodeAt(l++)); // Simple variation: don't support surrogates or subsequences in seq.
	
	                    writeTable[curAddr++] = SEQ_START - this.decodeTableSeq.length;
	                    this.decodeTableSeq.push(seq);
	                }
	                else
	                    writeTable[curAddr++] = code; // Basic char
	            }
	        } 
	        else if (typeof part === "number") { // Integer, meaning increasing sequence starting with prev character.
	            var charCode = writeTable[curAddr - 1] + 1;
	            for (var l = 0; l < part; l++)
	                writeTable[curAddr++] = charCode++;
	        }
	        else
	            throw new Error("Incorrect type '" + typeof part + "' given in "  + this.encodingName + " at chunk " + chunk[0]);
	    }
	    if (curAddr > 0xFF)
	        throw new Error("Incorrect chunk in "  + this.encodingName + " at addr " + chunk[0] + ": too long" + curAddr);
	}
	
	// Encoder helpers
	DBCSCodec.prototype._getEncodeBucket = function(uCode) {
	    var high = uCode >> 8; // This could be > 0xFF because of astral characters.
	    if (this.encodeTable[high] === undefined)
	        this.encodeTable[high] = UNASSIGNED_NODE.slice(0); // Create bucket on demand.
	    return this.encodeTable[high];
	}
	
	DBCSCodec.prototype._setEncodeChar = function(uCode, dbcsCode) {
	    var bucket = this._getEncodeBucket(uCode);
	    var low = uCode & 0xFF;
	    if (bucket[low] <= SEQ_START)
	        this.encodeTableSeq[SEQ_START-bucket[low]][DEF_CHAR] = dbcsCode; // There's already a sequence, set a single-char subsequence of it.
	    else if (bucket[low] == UNASSIGNED)
	        bucket[low] = dbcsCode;
	}
	
	DBCSCodec.prototype._setEncodeSequence = function(seq, dbcsCode) {
	    
	    // Get the root of character tree according to first character of the sequence.
	    var uCode = seq[0];
	    var bucket = this._getEncodeBucket(uCode);
	    var low = uCode & 0xFF;
	
	    var node;
	    if (bucket[low] <= SEQ_START) {
	        // There's already a sequence with  - use it.
	        node = this.encodeTableSeq[SEQ_START-bucket[low]];
	    }
	    else {
	        // There was no sequence object - allocate a new one.
	        node = {};
	        if (bucket[low] !== UNASSIGNED) node[DEF_CHAR] = bucket[low]; // If a char was set before - make it a single-char subsequence.
	        bucket[low] = SEQ_START - this.encodeTableSeq.length;
	        this.encodeTableSeq.push(node);
	    }
	
	    // Traverse the character tree, allocating new nodes as needed.
	    for (var j = 1; j < seq.length-1; j++) {
	        var oldVal = node[uCode];
	        if (typeof oldVal === 'object')
	            node = oldVal;
	        else {
	            node = node[uCode] = {}
	            if (oldVal !== undefined)
	                node[DEF_CHAR] = oldVal
	        }
	    }
	
	    // Set the leaf to given dbcsCode.
	    uCode = seq[seq.length-1];
	    node[uCode] = dbcsCode;
	}
	
	DBCSCodec.prototype._fillEncodeTable = function(nodeIdx, prefix, skipEncodeChars) {
	    var node = this.decodeTables[nodeIdx];
	    for (var i = 0; i < 0x100; i++) {
	        var uCode = node[i];
	        var mbCode = prefix + i;
	        if (skipEncodeChars[mbCode])
	            continue;
	
	        if (uCode >= 0)
	            this._setEncodeChar(uCode, mbCode);
	        else if (uCode <= NODE_START)
	            this._fillEncodeTable(NODE_START - uCode, mbCode << 8, skipEncodeChars);
	        else if (uCode <= SEQ_START)
	            this._setEncodeSequence(this.decodeTableSeq[SEQ_START - uCode], mbCode);
	    }
	}
	
	
	
	// == Encoder ==================================================================
	
	function DBCSEncoder(options, codec) {
	    // Encoder state
	    this.leadSurrogate = -1;
	    this.seqObj = undefined;
	    
	    // Static data
	    this.encodeTable = codec.encodeTable;
	    this.encodeTableSeq = codec.encodeTableSeq;
	    this.defaultCharSingleByte = codec.defCharSB;
	    this.gb18030 = codec.gb18030;
	}
	
	DBCSEncoder.prototype.write = function(str) {
	    var newBuf = new Buffer(str.length * (this.gb18030 ? 4 : 3)), 
	        leadSurrogate = this.leadSurrogate,
	        seqObj = this.seqObj, nextChar = -1,
	        i = 0, j = 0;
	
	    while (true) {
	        // 0. Get next character.
	        if (nextChar === -1) {
	            if (i == str.length) break;
	            var uCode = str.charCodeAt(i++);
	        }
	        else {
	            var uCode = nextChar;
	            nextChar = -1;    
	        }
	
	        // 1. Handle surrogates.
	        if (0xD800 <= uCode && uCode < 0xE000) { // Char is one of surrogates.
	            if (uCode < 0xDC00) { // We've got lead surrogate.
	                if (leadSurrogate === -1) {
	                    leadSurrogate = uCode;
	                    continue;
	                } else {
	                    leadSurrogate = uCode;
	                    // Double lead surrogate found.
	                    uCode = UNASSIGNED;
	                }
	            } else { // We've got trail surrogate.
	                if (leadSurrogate !== -1) {
	                    uCode = 0x10000 + (leadSurrogate - 0xD800) * 0x400 + (uCode - 0xDC00);
	                    leadSurrogate = -1;
	                } else {
	                    // Incomplete surrogate pair - only trail surrogate found.
	                    uCode = UNASSIGNED;
	                }
	                
	            }
	        }
	        else if (leadSurrogate !== -1) {
	            // Incomplete surrogate pair - only lead surrogate found.
	            nextChar = uCode; uCode = UNASSIGNED; // Write an error, then current char.
	            leadSurrogate = -1;
	        }
	
	        // 2. Convert uCode character.
	        var dbcsCode = UNASSIGNED;
	        if (seqObj !== undefined && uCode != UNASSIGNED) { // We are in the middle of the sequence
	            var resCode = seqObj[uCode];
	            if (typeof resCode === 'object') { // Sequence continues.
	                seqObj = resCode;
	                continue;
	
	            } else if (typeof resCode == 'number') { // Sequence finished. Write it.
	                dbcsCode = resCode;
	
	            } else if (resCode == undefined) { // Current character is not part of the sequence.
	
	                // Try default character for this sequence
	                resCode = seqObj[DEF_CHAR];
	                if (resCode !== undefined) {
	                    dbcsCode = resCode; // Found. Write it.
	                    nextChar = uCode; // Current character will be written too in the next iteration.
	
	                } else {
	                    // TODO: What if we have no default? (resCode == undefined)
	                    // Then, we should write first char of the sequence as-is and try the rest recursively.
	                    // Didn't do it for now because no encoding has this situation yet.
	                    // Currently, just skip the sequence and write current char.
	                }
	            }
	            seqObj = undefined;
	        }
	        else if (uCode >= 0) {  // Regular character
	            var subtable = this.encodeTable[uCode >> 8];
	            if (subtable !== undefined)
	                dbcsCode = subtable[uCode & 0xFF];
	            
	            if (dbcsCode <= SEQ_START) { // Sequence start
	                seqObj = this.encodeTableSeq[SEQ_START-dbcsCode];
	                continue;
	            }
	
	            if (dbcsCode == UNASSIGNED && this.gb18030) {
	                // Use GB18030 algorithm to find character(s) to write.
	                var idx = findIdx(this.gb18030.uChars, uCode);
	                if (idx != -1) {
	                    var dbcsCode = this.gb18030.gbChars[idx] + (uCode - this.gb18030.uChars[idx]);
	                    newBuf[j++] = 0x81 + Math.floor(dbcsCode / 12600); dbcsCode = dbcsCode % 12600;
	                    newBuf[j++] = 0x30 + Math.floor(dbcsCode / 1260); dbcsCode = dbcsCode % 1260;
	                    newBuf[j++] = 0x81 + Math.floor(dbcsCode / 10); dbcsCode = dbcsCode % 10;
	                    newBuf[j++] = 0x30 + dbcsCode;
	                    continue;
	                }
	            }
	        }
	
	        // 3. Write dbcsCode character.
	        if (dbcsCode === UNASSIGNED)
	            dbcsCode = this.defaultCharSingleByte;
	        
	        if (dbcsCode < 0x100) {
	            newBuf[j++] = dbcsCode;
	        }
	        else if (dbcsCode < 0x10000) {
	            newBuf[j++] = dbcsCode >> 8;   // high byte
	            newBuf[j++] = dbcsCode & 0xFF; // low byte
	        }
	        else {
	            newBuf[j++] = dbcsCode >> 16;
	            newBuf[j++] = (dbcsCode >> 8) & 0xFF;
	            newBuf[j++] = dbcsCode & 0xFF;
	        }
	    }
	
	    this.seqObj = seqObj;
	    this.leadSurrogate = leadSurrogate;
	    return newBuf.slice(0, j);
	}
	
	DBCSEncoder.prototype.end = function() {
	    if (this.leadSurrogate === -1 && this.seqObj === undefined)
	        return; // All clean. Most often case.
	
	    var newBuf = new Buffer(10), j = 0;
	
	    if (this.seqObj) { // We're in the sequence.
	        var dbcsCode = this.seqObj[DEF_CHAR];
	        if (dbcsCode !== undefined) { // Write beginning of the sequence.
	            if (dbcsCode < 0x100) {
	                newBuf[j++] = dbcsCode;
	            }
	            else {
	                newBuf[j++] = dbcsCode >> 8;   // high byte
	                newBuf[j++] = dbcsCode & 0xFF; // low byte
	            }
	        } else {
	            // See todo above.
	        }
	        this.seqObj = undefined;
	    }
	
	    if (this.leadSurrogate !== -1) {
	        // Incomplete surrogate pair - only lead surrogate found.
	        newBuf[j++] = this.defaultCharSingleByte;
	        this.leadSurrogate = -1;
	    }
	    
	    return newBuf.slice(0, j);
	}
	
	// Export for testing
	DBCSEncoder.prototype.findIdx = findIdx;
	
	
	// == Decoder ==================================================================
	
	function DBCSDecoder(options, codec) {
	    // Decoder state
	    this.nodeIdx = 0;
	    this.prevBuf = new Buffer(0);
	
	    // Static data
	    this.decodeTables = codec.decodeTables;
	    this.decodeTableSeq = codec.decodeTableSeq;
	    this.defaultCharUnicode = codec.defaultCharUnicode;
	    this.gb18030 = codec.gb18030;
	}
	
	DBCSDecoder.prototype.write = function(buf) {
	    var newBuf = new Buffer(buf.length*2),
	        nodeIdx = this.nodeIdx, 
	        prevBuf = this.prevBuf, prevBufOffset = this.prevBuf.length,
	        seqStart = -this.prevBuf.length, // idx of the start of current parsed sequence.
	        uCode;
	
	    if (prevBufOffset > 0) // Make prev buf overlap a little to make it easier to slice later.
	        prevBuf = Buffer.concat([prevBuf, buf.slice(0, 10)]);
	    
	    for (var i = 0, j = 0; i < buf.length; i++) {
	        var curByte = (i >= 0) ? buf[i] : prevBuf[i + prevBufOffset];
	
	        // Lookup in current trie node.
	        var uCode = this.decodeTables[nodeIdx][curByte];
	
	        if (uCode >= 0) { 
	            // Normal character, just use it.
	        }
	        else if (uCode === UNASSIGNED) { // Unknown char.
	            // TODO: Callback with seq.
	            //var curSeq = (seqStart >= 0) ? buf.slice(seqStart, i+1) : prevBuf.slice(seqStart + prevBufOffset, i+1 + prevBufOffset);
	            i = seqStart; // Try to parse again, after skipping first byte of the sequence ('i' will be incremented by 'for' cycle).
	            uCode = this.defaultCharUnicode.charCodeAt(0);
	        }
	        else if (uCode === GB18030_CODE) {
	            var curSeq = (seqStart >= 0) ? buf.slice(seqStart, i+1) : prevBuf.slice(seqStart + prevBufOffset, i+1 + prevBufOffset);
	            var ptr = (curSeq[0]-0x81)*12600 + (curSeq[1]-0x30)*1260 + (curSeq[2]-0x81)*10 + (curSeq[3]-0x30);
	            var idx = findIdx(this.gb18030.gbChars, ptr);
	            uCode = this.gb18030.uChars[idx] + ptr - this.gb18030.gbChars[idx];
	        }
	        else if (uCode <= NODE_START) { // Go to next trie node.
	            nodeIdx = NODE_START - uCode;
	            continue;
	        }
	        else if (uCode <= SEQ_START) { // Output a sequence of chars.
	            var seq = this.decodeTableSeq[SEQ_START - uCode];
	            for (var k = 0; k < seq.length - 1; k++) {
	                uCode = seq[k];
	                newBuf[j++] = uCode & 0xFF;
	                newBuf[j++] = uCode >> 8;
	            }
	            uCode = seq[seq.length-1];
	        }
	        else
	            throw new Error("iconv-lite internal error: invalid decoding table value " + uCode + " at " + nodeIdx + "/" + curByte);
	
	        // Write the character to buffer, handling higher planes using surrogate pair.
	        if (uCode > 0xFFFF) { 
	            uCode -= 0x10000;
	            var uCodeLead = 0xD800 + Math.floor(uCode / 0x400);
	            newBuf[j++] = uCodeLead & 0xFF;
	            newBuf[j++] = uCodeLead >> 8;
	
	            uCode = 0xDC00 + uCode % 0x400;
	        }
	        newBuf[j++] = uCode & 0xFF;
	        newBuf[j++] = uCode >> 8;
	
	        // Reset trie node.
	        nodeIdx = 0; seqStart = i+1;
	    }
	
	    this.nodeIdx = nodeIdx;
	    this.prevBuf = (seqStart >= 0) ? buf.slice(seqStart) : prevBuf.slice(seqStart + prevBufOffset);
	    return newBuf.slice(0, j).toString('ucs2');
	}
	
	DBCSDecoder.prototype.end = function() {
	    var ret = '';
	
	    // Try to parse all remaining chars.
	    while (this.prevBuf.length > 0) {
	        // Skip 1 character in the buffer.
	        ret += this.defaultCharUnicode;
	        var buf = this.prevBuf.slice(1);
	
	        // Parse remaining as usual.
	        this.prevBuf = new Buffer(0);
	        this.nodeIdx = 0;
	        if (buf.length > 0)
	            ret += this.write(buf);
	    }
	
	    this.nodeIdx = 0;
	    return ret;
	}
	
	// Binary search for GB18030. Returns largest i such that table[i] <= val.
	function findIdx(table, val) {
	    if (table[0] > val)
	        return -1;
	
	    var l = 0, r = table.length;
	    while (l < r-1) { // always table[l] <= val < table[r]
	        var mid = l + Math.floor((r-l+1)/2);
	        if (table[mid] <= val)
	            l = mid;
	        else
	            r = mid;
	    }
	    return l;
	}
	


/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	"use strict"
	
	// Description of supported double byte encodings and aliases.
	// Tables are not require()-d until they are needed to speed up library load.
	// require()-s are direct to support Browserify.
	
	module.exports = {
	    
	    // == Japanese/ShiftJIS ====================================================
	    // All japanese encodings are based on JIS X set of standards:
	    // JIS X 0201 - Single-byte encoding of ASCII + ¥ + Kana chars at 0xA1-0xDF.
	    // JIS X 0208 - Main set of 6879 characters, placed in 94x94 plane, to be encoded by 2 bytes. 
	    //              Has several variations in 1978, 1983, 1990 and 1997.
	    // JIS X 0212 - Supplementary plane of 6067 chars in 94x94 plane. 1990. Effectively dead.
	    // JIS X 0213 - Extension and modern replacement of 0208 and 0212. Total chars: 11233.
	    //              2 planes, first is superset of 0208, second - revised 0212.
	    //              Introduced in 2000, revised 2004. Some characters are in Unicode Plane 2 (0x2xxxx)
	
	    // Byte encodings are:
	    //  * Shift_JIS: Compatible with 0201, uses not defined chars in top half as lead bytes for double-byte
	    //               encoding of 0208. Lead byte ranges: 0x81-0x9F, 0xE0-0xEF; Trail byte ranges: 0x40-0x7E, 0x80-0x9E, 0x9F-0xFC.
	    //               Windows CP932 is a superset of Shift_JIS. Some companies added more chars, notably KDDI.
	    //  * EUC-JP:    Up to 3 bytes per character. Used mostly on *nixes.
	    //               0x00-0x7F       - lower part of 0201
	    //               0x8E, 0xA1-0xDF - upper part of 0201
	    //               (0xA1-0xFE)x2   - 0208 plane (94x94).
	    //               0x8F, (0xA1-0xFE)x2 - 0212 plane (94x94).
	    //  * JIS X 208: 7-bit, direct encoding of 0208. Byte ranges: 0x21-0x7E (94 values). Uncommon.
	    //               Used as-is in ISO2022 family.
	    //  * ISO2022-JP: Stateful encoding, with escape sequences to switch between ASCII, 
	    //                0201-1976 Roman, 0208-1978, 0208-1983.
	    //  * ISO2022-JP-1: Adds esc seq for 0212-1990.
	    //  * ISO2022-JP-2: Adds esc seq for GB2313-1980, KSX1001-1992, ISO8859-1, ISO8859-7.
	    //  * ISO2022-JP-3: Adds esc seq for 0201-1976 Kana set, 0213-2000 Planes 1, 2.
	    //  * ISO2022-JP-2004: Adds 0213-2004 Plane 1.
	    //
	    // After JIS X 0213 appeared, Shift_JIS-2004, EUC-JISX0213 and ISO2022-JP-2004 followed, with just changing the planes.
	    //
	    // Overall, it seems that it's a mess :( http://www8.plala.or.jp/tkubota1/unicode-symbols-map2.html
	
	
	    'shiftjis': {
	        type: '_dbcs',
	        table: function() { return __webpack_require__(123) },
	        encodeAdd: {'\u00a5': 0x5C, '\u203E': 0x7E},
	        encodeSkipVals: [{from: 0xED40, to: 0xF940}],
	    },
	    'csshiftjis': 'shiftjis',
	    'mskanji': 'shiftjis',
	    'sjis': 'shiftjis',
	    'windows31j': 'shiftjis',
	    'xsjis': 'shiftjis',
	    'windows932': 'shiftjis',
	    '932': 'shiftjis',
	    'cp932': 'shiftjis',
	
	    'eucjp': {
	        type: '_dbcs',
	        table: function() { return __webpack_require__(124) },
	        encodeAdd: {'\u00a5': 0x5C, '\u203E': 0x7E},
	    },
	
	    // TODO: KDDI extension to Shift_JIS
	    // TODO: IBM CCSID 942 = CP932, but F0-F9 custom chars and other char changes.
	    // TODO: IBM CCSID 943 = Shift_JIS = CP932 with original Shift_JIS lower 128 chars.
	
	    // == Chinese/GBK ==========================================================
	    // http://en.wikipedia.org/wiki/GBK
	
	    // Oldest GB2312 (1981, ~7600 chars) is a subset of CP936
	    'gb2312': 'cp936',
	    'gb231280': 'cp936',
	    'gb23121980': 'cp936',
	    'csgb2312': 'cp936',
	    'csiso58gb231280': 'cp936',
	    'euccn': 'cp936',
	    'isoir58': 'gbk',
	
	    // Microsoft's CP936 is a subset and approximation of GBK.
	    // TODO: Euro = 0x80 in cp936, but not in GBK (where it's valid but undefined)
	    'windows936': 'cp936',
	    '936': 'cp936',
	    'cp936': {
	        type: '_dbcs',
	        table: function() { return __webpack_require__(125) },
	    },
	
	    // GBK (~22000 chars) is an extension of CP936 that added user-mapped chars and some other.
	    'gbk': {
	        type: '_dbcs',
	        table: function() { return __webpack_require__(125).concat(__webpack_require__(126)) },
	    },
	    'xgbk': 'gbk',
	
	    // GB18030 is an algorithmic extension of GBK.
	    'gb18030': {
	        type: '_dbcs',
	        table: function() { return __webpack_require__(125).concat(__webpack_require__(126)) },
	        gb18030: function() { return __webpack_require__(127) },
	    },
	
	    'chinese': 'gb18030',
	
	    // TODO: Support GB18030 (~27000 chars + whole unicode mapping, cp54936)
	    // http://icu-project.org/docs/papers/gb18030.html
	    // http://source.icu-project.org/repos/icu/data/trunk/charset/data/xml/gb-18030-2000.xml
	    // http://www.khngai.com/chinese/charmap/tblgbk.php?page=0
	
	    // == Korean ===============================================================
	    // EUC-KR, KS_C_5601 and KS X 1001 are exactly the same.
	    'windows949': 'cp949',
	    '949': 'cp949',
	    'cp949': {
	        type: '_dbcs',
	        table: function() { return __webpack_require__(128) },
	    },
	
	    'cseuckr': 'cp949',
	    'csksc56011987': 'cp949',
	    'euckr': 'cp949',
	    'isoir149': 'cp949',
	    'korean': 'cp949',
	    'ksc56011987': 'cp949',
	    'ksc56011989': 'cp949',
	    'ksc5601': 'cp949',
	
	
	    // == Big5/Taiwan/Hong Kong ================================================
	    // There are lots of tables for Big5 and cp950. Please see the following links for history:
	    // http://moztw.org/docs/big5/  http://www.haible.de/bruno/charsets/conversion-tables/Big5.html
	    // Variations, in roughly number of defined chars:
	    //  * Windows CP 950: Microsoft variant of Big5. Canonical: http://www.unicode.org/Public/MAPPINGS/VENDORS/MICSFT/WINDOWS/CP950.TXT
	    //  * Windows CP 951: Microsoft variant of Big5-HKSCS-2001. Seems to be never public. http://me.abelcheung.org/articles/research/what-is-cp951/
	    //  * Big5-2003 (Taiwan standard) almost superset of cp950.
	    //  * Unicode-at-on (UAO) / Mozilla 1.8. Falling out of use on the Web. Not supported by other browsers.
	    //  * Big5-HKSCS (-2001, -2004, -2008). Hong Kong standard. 
	    //    many unicode code points moved from PUA to Supplementary plane (U+2XXXX) over the years.
	    //    Plus, it has 4 combining sequences.
	    //    Seems that Mozilla refused to support it for 10 yrs. https://bugzilla.mozilla.org/show_bug.cgi?id=162431 https://bugzilla.mozilla.org/show_bug.cgi?id=310299
	    //    because big5-hkscs is the only encoding to include astral characters in non-algorithmic way.
	    //    Implementations are not consistent within browsers; sometimes labeled as just big5.
	    //    MS Internet Explorer switches from big5 to big5-hkscs when a patch applied.
	    //    Great discussion & recap of what's going on https://bugzilla.mozilla.org/show_bug.cgi?id=912470#c31
	    //    In the encoder, it might make sense to support encoding old PUA mappings to Big5 bytes seq-s.
	    //    Official spec: http://www.ogcio.gov.hk/en/business/tech_promotion/ccli/terms/doc/2003cmp_2008.txt
	    //                   http://www.ogcio.gov.hk/tc/business/tech_promotion/ccli/terms/doc/hkscs-2008-big5-iso.txt
	    // 
	    // Current understanding of how to deal with Big5(-HKSCS) is in the Encoding Standard, http://encoding.spec.whatwg.org/#big5-encoder
	    // Unicode mapping (http://www.unicode.org/Public/MAPPINGS/OBSOLETE/EASTASIA/OTHER/BIG5.TXT) is said to be wrong.
	
	    'windows950': 'cp950',
	    '950': 'cp950',
	    'cp950': {
	        type: '_dbcs',
	        table: function() { return __webpack_require__(129) },
	    },
	
	    // Big5 has many variations and is an extension of cp950. We use Encoding Standard's as a consensus.
	    'big5': 'big5hkscs',
	    'big5hkscs': {
	        type: '_dbcs',
	        table: function() { return __webpack_require__(129).concat(__webpack_require__(130)) },
	        encodeSkipVals: [0xa2cc],
	    },
	
	    'cnbig5': 'big5hkscs',
	    'csbig5': 'big5hkscs',
	    'xxbig5': 'big5hkscs',
	
	};


/***/ },
/* 123 */
/***/ function(module, exports) {

	module.exports = [
		[
			"0",
			"\u0000",
			128
		],
		[
			"a1",
			"｡",
			62
		],
		[
			"8140",
			"　、。，．・：；？！゛゜´｀¨＾￣＿ヽヾゝゞ〃仝々〆〇ー―‐／＼～∥｜…‥‘’“”（）〔〕［］｛｝〈",
			9,
			"＋－±×"
		],
		[
			"8180",
			"÷＝≠＜＞≦≧∞∴♂♀°′″℃￥＄￠￡％＃＆＊＠§☆★○●◎◇◆□■△▲▽▼※〒→←↑↓〓"
		],
		[
			"81b8",
			"∈∋⊆⊇⊂⊃∪∩"
		],
		[
			"81c8",
			"∧∨￢⇒⇔∀∃"
		],
		[
			"81da",
			"∠⊥⌒∂∇≡≒≪≫√∽∝∵∫∬"
		],
		[
			"81f0",
			"Å‰♯♭♪†‡¶"
		],
		[
			"81fc",
			"◯"
		],
		[
			"824f",
			"０",
			9
		],
		[
			"8260",
			"Ａ",
			25
		],
		[
			"8281",
			"ａ",
			25
		],
		[
			"829f",
			"ぁ",
			82
		],
		[
			"8340",
			"ァ",
			62
		],
		[
			"8380",
			"ム",
			22
		],
		[
			"839f",
			"Α",
			16,
			"Σ",
			6
		],
		[
			"83bf",
			"α",
			16,
			"σ",
			6
		],
		[
			"8440",
			"А",
			5,
			"ЁЖ",
			25
		],
		[
			"8470",
			"а",
			5,
			"ёж",
			7
		],
		[
			"8480",
			"о",
			17
		],
		[
			"849f",
			"─│┌┐┘└├┬┤┴┼━┃┏┓┛┗┣┳┫┻╋┠┯┨┷┿┝┰┥┸╂"
		],
		[
			"8740",
			"①",
			19,
			"Ⅰ",
			9
		],
		[
			"875f",
			"㍉㌔㌢㍍㌘㌧㌃㌶㍑㍗㌍㌦㌣㌫㍊㌻㎜㎝㎞㎎㎏㏄㎡"
		],
		[
			"877e",
			"㍻"
		],
		[
			"8780",
			"〝〟№㏍℡㊤",
			4,
			"㈱㈲㈹㍾㍽㍼≒≡∫∮∑√⊥∠∟⊿∵∩∪"
		],
		[
			"889f",
			"亜唖娃阿哀愛挨姶逢葵茜穐悪握渥旭葦芦鯵梓圧斡扱宛姐虻飴絢綾鮎或粟袷安庵按暗案闇鞍杏以伊位依偉囲夷委威尉惟意慰易椅為畏異移維緯胃萎衣謂違遺医井亥域育郁磯一壱溢逸稲茨芋鰯允印咽員因姻引飲淫胤蔭"
		],
		[
			"8940",
			"院陰隠韻吋右宇烏羽迂雨卯鵜窺丑碓臼渦嘘唄欝蔚鰻姥厩浦瓜閏噂云運雲荏餌叡営嬰影映曳栄永泳洩瑛盈穎頴英衛詠鋭液疫益駅悦謁越閲榎厭円"
		],
		[
			"8980",
			"園堰奄宴延怨掩援沿演炎焔煙燕猿縁艶苑薗遠鉛鴛塩於汚甥凹央奥往応押旺横欧殴王翁襖鴬鴎黄岡沖荻億屋憶臆桶牡乙俺卸恩温穏音下化仮何伽価佳加可嘉夏嫁家寡科暇果架歌河火珂禍禾稼箇花苛茄荷華菓蝦課嘩貨迦過霞蚊俄峨我牙画臥芽蛾賀雅餓駕介会解回塊壊廻快怪悔恢懐戒拐改"
		],
		[
			"8a40",
			"魁晦械海灰界皆絵芥蟹開階貝凱劾外咳害崖慨概涯碍蓋街該鎧骸浬馨蛙垣柿蛎鈎劃嚇各廓拡撹格核殻獲確穫覚角赫較郭閣隔革学岳楽額顎掛笠樫"
		],
		[
			"8a80",
			"橿梶鰍潟割喝恰括活渇滑葛褐轄且鰹叶椛樺鞄株兜竃蒲釜鎌噛鴨栢茅萱粥刈苅瓦乾侃冠寒刊勘勧巻喚堪姦完官寛干幹患感慣憾換敢柑桓棺款歓汗漢澗潅環甘監看竿管簡緩缶翰肝艦莞観諌貫還鑑間閑関陥韓館舘丸含岸巌玩癌眼岩翫贋雁頑顔願企伎危喜器基奇嬉寄岐希幾忌揮机旗既期棋棄"
		],
		[
			"8b40",
			"機帰毅気汽畿祈季稀紀徽規記貴起軌輝飢騎鬼亀偽儀妓宜戯技擬欺犠疑祇義蟻誼議掬菊鞠吉吃喫桔橘詰砧杵黍却客脚虐逆丘久仇休及吸宮弓急救"
		],
		[
			"8b80",
			"朽求汲泣灸球究窮笈級糾給旧牛去居巨拒拠挙渠虚許距鋸漁禦魚亨享京供侠僑兇競共凶協匡卿叫喬境峡強彊怯恐恭挟教橋況狂狭矯胸脅興蕎郷鏡響饗驚仰凝尭暁業局曲極玉桐粁僅勤均巾錦斤欣欽琴禁禽筋緊芹菌衿襟謹近金吟銀九倶句区狗玖矩苦躯駆駈駒具愚虞喰空偶寓遇隅串櫛釧屑屈"
		],
		[
			"8c40",
			"掘窟沓靴轡窪熊隈粂栗繰桑鍬勲君薫訓群軍郡卦袈祁係傾刑兄啓圭珪型契形径恵慶慧憩掲携敬景桂渓畦稽系経継繋罫茎荊蛍計詣警軽頚鶏芸迎鯨"
		],
		[
			"8c80",
			"劇戟撃激隙桁傑欠決潔穴結血訣月件倹倦健兼券剣喧圏堅嫌建憲懸拳捲検権牽犬献研硯絹県肩見謙賢軒遣鍵険顕験鹸元原厳幻弦減源玄現絃舷言諺限乎個古呼固姑孤己庫弧戸故枯湖狐糊袴股胡菰虎誇跨鈷雇顧鼓五互伍午呉吾娯後御悟梧檎瑚碁語誤護醐乞鯉交佼侯候倖光公功効勾厚口向"
		],
		[
			"8d40",
			"后喉坑垢好孔孝宏工巧巷幸広庚康弘恒慌抗拘控攻昂晃更杭校梗構江洪浩港溝甲皇硬稿糠紅紘絞綱耕考肯肱腔膏航荒行衡講貢購郊酵鉱砿鋼閤降"
		],
		[
			"8d80",
			"項香高鴻剛劫号合壕拷濠豪轟麹克刻告国穀酷鵠黒獄漉腰甑忽惚骨狛込此頃今困坤墾婚恨懇昏昆根梱混痕紺艮魂些佐叉唆嵯左差査沙瑳砂詐鎖裟坐座挫債催再最哉塞妻宰彩才採栽歳済災采犀砕砦祭斎細菜裁載際剤在材罪財冴坂阪堺榊肴咲崎埼碕鷺作削咋搾昨朔柵窄策索錯桜鮭笹匙冊刷"
		],
		[
			"8e40",
			"察拶撮擦札殺薩雑皐鯖捌錆鮫皿晒三傘参山惨撒散桟燦珊産算纂蚕讃賛酸餐斬暫残仕仔伺使刺司史嗣四士始姉姿子屍市師志思指支孜斯施旨枝止"
		],
		[
			"8e80",
			"死氏獅祉私糸紙紫肢脂至視詞詩試誌諮資賜雌飼歯事似侍児字寺慈持時次滋治爾璽痔磁示而耳自蒔辞汐鹿式識鴫竺軸宍雫七叱執失嫉室悉湿漆疾質実蔀篠偲柴芝屡蕊縞舎写射捨赦斜煮社紗者謝車遮蛇邪借勺尺杓灼爵酌釈錫若寂弱惹主取守手朱殊狩珠種腫趣酒首儒受呪寿授樹綬需囚収周"
		],
		[
			"8f40",
			"宗就州修愁拾洲秀秋終繍習臭舟蒐衆襲讐蹴輯週酋酬集醜什住充十従戎柔汁渋獣縦重銃叔夙宿淑祝縮粛塾熟出術述俊峻春瞬竣舜駿准循旬楯殉淳"
		],
		[
			"8f80",
			"準潤盾純巡遵醇順処初所暑曙渚庶緒署書薯藷諸助叙女序徐恕鋤除傷償勝匠升召哨商唱嘗奨妾娼宵将小少尚庄床廠彰承抄招掌捷昇昌昭晶松梢樟樵沼消渉湘焼焦照症省硝礁祥称章笑粧紹肖菖蒋蕉衝裳訟証詔詳象賞醤鉦鍾鐘障鞘上丈丞乗冗剰城場壌嬢常情擾条杖浄状畳穣蒸譲醸錠嘱埴飾"
		],
		[
			"9040",
			"拭植殖燭織職色触食蝕辱尻伸信侵唇娠寝審心慎振新晋森榛浸深申疹真神秦紳臣芯薪親診身辛進針震人仁刃塵壬尋甚尽腎訊迅陣靭笥諏須酢図厨"
		],
		[
			"9080",
			"逗吹垂帥推水炊睡粋翠衰遂酔錐錘随瑞髄崇嵩数枢趨雛据杉椙菅頗雀裾澄摺寸世瀬畝是凄制勢姓征性成政整星晴棲栖正清牲生盛精聖声製西誠誓請逝醒青静斉税脆隻席惜戚斥昔析石積籍績脊責赤跡蹟碩切拙接摂折設窃節説雪絶舌蝉仙先千占宣専尖川戦扇撰栓栴泉浅洗染潜煎煽旋穿箭線"
		],
		[
			"9140",
			"繊羨腺舛船薦詮賎践選遷銭銑閃鮮前善漸然全禅繕膳糎噌塑岨措曾曽楚狙疏疎礎祖租粗素組蘇訴阻遡鼠僧創双叢倉喪壮奏爽宋層匝惣想捜掃挿掻"
		],
		[
			"9180",
			"操早曹巣槍槽漕燥争痩相窓糟総綜聡草荘葬蒼藻装走送遭鎗霜騒像増憎臓蔵贈造促側則即息捉束測足速俗属賊族続卒袖其揃存孫尊損村遜他多太汰詑唾堕妥惰打柁舵楕陀駄騨体堆対耐岱帯待怠態戴替泰滞胎腿苔袋貸退逮隊黛鯛代台大第醍題鷹滝瀧卓啄宅托択拓沢濯琢託鐸濁諾茸凧蛸只"
		],
		[
			"9240",
			"叩但達辰奪脱巽竪辿棚谷狸鱈樽誰丹単嘆坦担探旦歎淡湛炭短端箪綻耽胆蛋誕鍛団壇弾断暖檀段男談値知地弛恥智池痴稚置致蜘遅馳築畜竹筑蓄"
		],
		[
			"9280",
			"逐秩窒茶嫡着中仲宙忠抽昼柱注虫衷註酎鋳駐樗瀦猪苧著貯丁兆凋喋寵帖帳庁弔張彫徴懲挑暢朝潮牒町眺聴脹腸蝶調諜超跳銚長頂鳥勅捗直朕沈珍賃鎮陳津墜椎槌追鎚痛通塚栂掴槻佃漬柘辻蔦綴鍔椿潰坪壷嬬紬爪吊釣鶴亭低停偵剃貞呈堤定帝底庭廷弟悌抵挺提梯汀碇禎程締艇訂諦蹄逓"
		],
		[
			"9340",
			"邸鄭釘鼎泥摘擢敵滴的笛適鏑溺哲徹撤轍迭鉄典填天展店添纏甜貼転顛点伝殿澱田電兎吐堵塗妬屠徒斗杜渡登菟賭途都鍍砥砺努度土奴怒倒党冬"
		],
		[
			"9380",
			"凍刀唐塔塘套宕島嶋悼投搭東桃梼棟盗淘湯涛灯燈当痘祷等答筒糖統到董蕩藤討謄豆踏逃透鐙陶頭騰闘働動同堂導憧撞洞瞳童胴萄道銅峠鴇匿得徳涜特督禿篤毒独読栃橡凸突椴届鳶苫寅酉瀞噸屯惇敦沌豚遁頓呑曇鈍奈那内乍凪薙謎灘捺鍋楢馴縄畷南楠軟難汝二尼弐迩匂賑肉虹廿日乳入"
		],
		[
			"9440",
			"如尿韮任妊忍認濡禰祢寧葱猫熱年念捻撚燃粘乃廼之埜嚢悩濃納能脳膿農覗蚤巴把播覇杷波派琶破婆罵芭馬俳廃拝排敗杯盃牌背肺輩配倍培媒梅"
		],
		[
			"9480",
			"楳煤狽買売賠陪這蝿秤矧萩伯剥博拍柏泊白箔粕舶薄迫曝漠爆縛莫駁麦函箱硲箸肇筈櫨幡肌畑畠八鉢溌発醗髪伐罰抜筏閥鳩噺塙蛤隼伴判半反叛帆搬斑板氾汎版犯班畔繁般藩販範釆煩頒飯挽晩番盤磐蕃蛮匪卑否妃庇彼悲扉批披斐比泌疲皮碑秘緋罷肥被誹費避非飛樋簸備尾微枇毘琵眉美"
		],
		[
			"9540",
			"鼻柊稗匹疋髭彦膝菱肘弼必畢筆逼桧姫媛紐百謬俵彪標氷漂瓢票表評豹廟描病秒苗錨鋲蒜蛭鰭品彬斌浜瀕貧賓頻敏瓶不付埠夫婦富冨布府怖扶敷"
		],
		[
			"9580",
			"斧普浮父符腐膚芙譜負賦赴阜附侮撫武舞葡蕪部封楓風葺蕗伏副復幅服福腹複覆淵弗払沸仏物鮒分吻噴墳憤扮焚奮粉糞紛雰文聞丙併兵塀幣平弊柄並蔽閉陛米頁僻壁癖碧別瞥蔑箆偏変片篇編辺返遍便勉娩弁鞭保舗鋪圃捕歩甫補輔穂募墓慕戊暮母簿菩倣俸包呆報奉宝峰峯崩庖抱捧放方朋"
		],
		[
			"9640",
			"法泡烹砲縫胞芳萌蓬蜂褒訪豊邦鋒飽鳳鵬乏亡傍剖坊妨帽忘忙房暴望某棒冒紡肪膨謀貌貿鉾防吠頬北僕卜墨撲朴牧睦穆釦勃没殆堀幌奔本翻凡盆"
		],
		[
			"9680",
			"摩磨魔麻埋妹昧枚毎哩槙幕膜枕鮪柾鱒桝亦俣又抹末沫迄侭繭麿万慢満漫蔓味未魅巳箕岬密蜜湊蓑稔脈妙粍民眠務夢無牟矛霧鵡椋婿娘冥名命明盟迷銘鳴姪牝滅免棉綿緬面麺摸模茂妄孟毛猛盲網耗蒙儲木黙目杢勿餅尤戻籾貰問悶紋門匁也冶夜爺耶野弥矢厄役約薬訳躍靖柳薮鑓愉愈油癒"
		],
		[
			"9740",
			"諭輸唯佑優勇友宥幽悠憂揖有柚湧涌猶猷由祐裕誘遊邑郵雄融夕予余与誉輿預傭幼妖容庸揚揺擁曜楊様洋溶熔用窯羊耀葉蓉要謡踊遥陽養慾抑欲"
		],
		[
			"9780",
			"沃浴翌翼淀羅螺裸来莱頼雷洛絡落酪乱卵嵐欄濫藍蘭覧利吏履李梨理璃痢裏裡里離陸律率立葎掠略劉流溜琉留硫粒隆竜龍侶慮旅虜了亮僚両凌寮料梁涼猟療瞭稜糧良諒遼量陵領力緑倫厘林淋燐琳臨輪隣鱗麟瑠塁涙累類令伶例冷励嶺怜玲礼苓鈴隷零霊麗齢暦歴列劣烈裂廉恋憐漣煉簾練聯"
		],
		[
			"9840",
			"蓮連錬呂魯櫓炉賂路露労婁廊弄朗楼榔浪漏牢狼篭老聾蝋郎六麓禄肋録論倭和話歪賄脇惑枠鷲亙亘鰐詫藁蕨椀湾碗腕"
		],
		[
			"989f",
			"弌丐丕个丱丶丼丿乂乖乘亂亅豫亊舒弍于亞亟亠亢亰亳亶从仍仄仆仂仗仞仭仟价伉佚估佛佝佗佇佶侈侏侘佻佩佰侑佯來侖儘俔俟俎俘俛俑俚俐俤俥倚倨倔倪倥倅伜俶倡倩倬俾俯們倆偃假會偕偐偈做偖偬偸傀傚傅傴傲"
		],
		[
			"9940",
			"僉僊傳僂僖僞僥僭僣僮價僵儉儁儂儖儕儔儚儡儺儷儼儻儿兀兒兌兔兢竸兩兪兮冀冂囘册冉冏冑冓冕冖冤冦冢冩冪冫决冱冲冰况冽凅凉凛几處凩凭"
		],
		[
			"9980",
			"凰凵凾刄刋刔刎刧刪刮刳刹剏剄剋剌剞剔剪剴剩剳剿剽劍劔劒剱劈劑辨辧劬劭劼劵勁勍勗勞勣勦飭勠勳勵勸勹匆匈甸匍匐匏匕匚匣匯匱匳匸區卆卅丗卉卍凖卞卩卮夘卻卷厂厖厠厦厥厮厰厶參簒雙叟曼燮叮叨叭叺吁吽呀听吭吼吮吶吩吝呎咏呵咎呟呱呷呰咒呻咀呶咄咐咆哇咢咸咥咬哄哈咨"
		],
		[
			"9a40",
			"咫哂咤咾咼哘哥哦唏唔哽哮哭哺哢唹啀啣啌售啜啅啖啗唸唳啝喙喀咯喊喟啻啾喘喞單啼喃喩喇喨嗚嗅嗟嗄嗜嗤嗔嘔嗷嘖嗾嗽嘛嗹噎噐營嘴嘶嘲嘸"
		],
		[
			"9a80",
			"噫噤嘯噬噪嚆嚀嚊嚠嚔嚏嚥嚮嚶嚴囂嚼囁囃囀囈囎囑囓囗囮囹圀囿圄圉圈國圍圓團圖嗇圜圦圷圸坎圻址坏坩埀垈坡坿垉垓垠垳垤垪垰埃埆埔埒埓堊埖埣堋堙堝塲堡塢塋塰毀塒堽塹墅墹墟墫墺壞墻墸墮壅壓壑壗壙壘壥壜壤壟壯壺壹壻壼壽夂夊夐夛梦夥夬夭夲夸夾竒奕奐奎奚奘奢奠奧奬奩"
		],
		[
			"9b40",
			"奸妁妝佞侫妣妲姆姨姜妍姙姚娥娟娑娜娉娚婀婬婉娵娶婢婪媚媼媾嫋嫂媽嫣嫗嫦嫩嫖嫺嫻嬌嬋嬖嬲嫐嬪嬶嬾孃孅孀孑孕孚孛孥孩孰孳孵學斈孺宀"
		],
		[
			"9b80",
			"它宦宸寃寇寉寔寐寤實寢寞寥寫寰寶寳尅將專對尓尠尢尨尸尹屁屆屎屓屐屏孱屬屮乢屶屹岌岑岔妛岫岻岶岼岷峅岾峇峙峩峽峺峭嶌峪崋崕崗嵜崟崛崑崔崢崚崙崘嵌嵒嵎嵋嵬嵳嵶嶇嶄嶂嶢嶝嶬嶮嶽嶐嶷嶼巉巍巓巒巖巛巫已巵帋帚帙帑帛帶帷幄幃幀幎幗幔幟幢幤幇幵并幺麼广庠廁廂廈廐廏"
		],
		[
			"9c40",
			"廖廣廝廚廛廢廡廨廩廬廱廳廰廴廸廾弃弉彝彜弋弑弖弩弭弸彁彈彌彎弯彑彖彗彙彡彭彳彷徃徂彿徊很徑徇從徙徘徠徨徭徼忖忻忤忸忱忝悳忿怡恠"
		],
		[
			"9c80",
			"怙怐怩怎怱怛怕怫怦怏怺恚恁恪恷恟恊恆恍恣恃恤恂恬恫恙悁悍惧悃悚悄悛悖悗悒悧悋惡悸惠惓悴忰悽惆悵惘慍愕愆惶惷愀惴惺愃愡惻惱愍愎慇愾愨愧慊愿愼愬愴愽慂慄慳慷慘慙慚慫慴慯慥慱慟慝慓慵憙憖憇憬憔憚憊憑憫憮懌懊應懷懈懃懆憺懋罹懍懦懣懶懺懴懿懽懼懾戀戈戉戍戌戔戛"
		],
		[
			"9d40",
			"戞戡截戮戰戲戳扁扎扞扣扛扠扨扼抂抉找抒抓抖拔抃抔拗拑抻拏拿拆擔拈拜拌拊拂拇抛拉挌拮拱挧挂挈拯拵捐挾捍搜捏掖掎掀掫捶掣掏掉掟掵捫"
		],
		[
			"9d80",
			"捩掾揩揀揆揣揉插揶揄搖搴搆搓搦搶攝搗搨搏摧摯摶摎攪撕撓撥撩撈撼據擒擅擇撻擘擂擱擧舉擠擡抬擣擯攬擶擴擲擺攀擽攘攜攅攤攣攫攴攵攷收攸畋效敖敕敍敘敞敝敲數斂斃變斛斟斫斷旃旆旁旄旌旒旛旙无旡旱杲昊昃旻杳昵昶昴昜晏晄晉晁晞晝晤晧晨晟晢晰暃暈暎暉暄暘暝曁暹曉暾暼"
		],
		[
			"9e40",
			"曄暸曖曚曠昿曦曩曰曵曷朏朖朞朦朧霸朮朿朶杁朸朷杆杞杠杙杣杤枉杰枩杼杪枌枋枦枡枅枷柯枴柬枳柩枸柤柞柝柢柮枹柎柆柧檜栞框栩桀桍栲桎"
		],
		[
			"9e80",
			"梳栫桙档桷桿梟梏梭梔條梛梃檮梹桴梵梠梺椏梍桾椁棊椈棘椢椦棡椌棍棔棧棕椶椒椄棗棣椥棹棠棯椨椪椚椣椡棆楹楷楜楸楫楔楾楮椹楴椽楙椰楡楞楝榁楪榲榮槐榿槁槓榾槎寨槊槝榻槃榧樮榑榠榜榕榴槞槨樂樛槿權槹槲槧樅榱樞槭樔槫樊樒櫁樣樓橄樌橲樶橸橇橢橙橦橈樸樢檐檍檠檄檢檣"
		],
		[
			"9f40",
			"檗蘗檻櫃櫂檸檳檬櫞櫑櫟檪櫚櫪櫻欅蘖櫺欒欖鬱欟欸欷盜欹飮歇歃歉歐歙歔歛歟歡歸歹歿殀殄殃殍殘殕殞殤殪殫殯殲殱殳殷殼毆毋毓毟毬毫毳毯"
		],
		[
			"9f80",
			"麾氈氓气氛氤氣汞汕汢汪沂沍沚沁沛汾汨汳沒沐泄泱泓沽泗泅泝沮沱沾沺泛泯泙泪洟衍洶洫洽洸洙洵洳洒洌浣涓浤浚浹浙涎涕濤涅淹渕渊涵淇淦涸淆淬淞淌淨淒淅淺淙淤淕淪淮渭湮渮渙湲湟渾渣湫渫湶湍渟湃渺湎渤滿渝游溂溪溘滉溷滓溽溯滄溲滔滕溏溥滂溟潁漑灌滬滸滾漿滲漱滯漲滌"
		],
		[
			"e040",
			"漾漓滷澆潺潸澁澀潯潛濳潭澂潼潘澎澑濂潦澳澣澡澤澹濆澪濟濕濬濔濘濱濮濛瀉瀋濺瀑瀁瀏濾瀛瀚潴瀝瀘瀟瀰瀾瀲灑灣炙炒炯烱炬炸炳炮烟烋烝"
		],
		[
			"e080",
			"烙焉烽焜焙煥煕熈煦煢煌煖煬熏燻熄熕熨熬燗熹熾燒燉燔燎燠燬燧燵燼燹燿爍爐爛爨爭爬爰爲爻爼爿牀牆牋牘牴牾犂犁犇犒犖犢犧犹犲狃狆狄狎狒狢狠狡狹狷倏猗猊猜猖猝猴猯猩猥猾獎獏默獗獪獨獰獸獵獻獺珈玳珎玻珀珥珮珞璢琅瑯琥珸琲琺瑕琿瑟瑙瑁瑜瑩瑰瑣瑪瑶瑾璋璞璧瓊瓏瓔珱"
		],
		[
			"e140",
			"瓠瓣瓧瓩瓮瓲瓰瓱瓸瓷甄甃甅甌甎甍甕甓甞甦甬甼畄畍畊畉畛畆畚畩畤畧畫畭畸當疆疇畴疊疉疂疔疚疝疥疣痂疳痃疵疽疸疼疱痍痊痒痙痣痞痾痿"
		],
		[
			"e180",
			"痼瘁痰痺痲痳瘋瘍瘉瘟瘧瘠瘡瘢瘤瘴瘰瘻癇癈癆癜癘癡癢癨癩癪癧癬癰癲癶癸發皀皃皈皋皎皖皓皙皚皰皴皸皹皺盂盍盖盒盞盡盥盧盪蘯盻眈眇眄眩眤眞眥眦眛眷眸睇睚睨睫睛睥睿睾睹瞎瞋瞑瞠瞞瞰瞶瞹瞿瞼瞽瞻矇矍矗矚矜矣矮矼砌砒礦砠礪硅碎硴碆硼碚碌碣碵碪碯磑磆磋磔碾碼磅磊磬"
		],
		[
			"e240",
			"磧磚磽磴礇礒礑礙礬礫祀祠祗祟祚祕祓祺祿禊禝禧齋禪禮禳禹禺秉秕秧秬秡秣稈稍稘稙稠稟禀稱稻稾稷穃穗穉穡穢穩龝穰穹穽窈窗窕窘窖窩竈窰"
		],
		[
			"e280",
			"窶竅竄窿邃竇竊竍竏竕竓站竚竝竡竢竦竭竰笂笏笊笆笳笘笙笞笵笨笶筐筺笄筍笋筌筅筵筥筴筧筰筱筬筮箝箘箟箍箜箚箋箒箏筝箙篋篁篌篏箴篆篝篩簑簔篦篥籠簀簇簓篳篷簗簍篶簣簧簪簟簷簫簽籌籃籔籏籀籐籘籟籤籖籥籬籵粃粐粤粭粢粫粡粨粳粲粱粮粹粽糀糅糂糘糒糜糢鬻糯糲糴糶糺紆"
		],
		[
			"e340",
			"紂紜紕紊絅絋紮紲紿紵絆絳絖絎絲絨絮絏絣經綉絛綏絽綛綺綮綣綵緇綽綫總綢綯緜綸綟綰緘緝緤緞緻緲緡縅縊縣縡縒縱縟縉縋縢繆繦縻縵縹繃縷"
		],
		[
			"e380",
			"縲縺繧繝繖繞繙繚繹繪繩繼繻纃緕繽辮繿纈纉續纒纐纓纔纖纎纛纜缸缺罅罌罍罎罐网罕罔罘罟罠罨罩罧罸羂羆羃羈羇羌羔羞羝羚羣羯羲羹羮羶羸譱翅翆翊翕翔翡翦翩翳翹飜耆耄耋耒耘耙耜耡耨耿耻聊聆聒聘聚聟聢聨聳聲聰聶聹聽聿肄肆肅肛肓肚肭冐肬胛胥胙胝胄胚胖脉胯胱脛脩脣脯腋"
		],
		[
			"e440",
			"隋腆脾腓腑胼腱腮腥腦腴膃膈膊膀膂膠膕膤膣腟膓膩膰膵膾膸膽臀臂膺臉臍臑臙臘臈臚臟臠臧臺臻臾舁舂舅與舊舍舐舖舩舫舸舳艀艙艘艝艚艟艤"
		],
		[
			"e480",
			"艢艨艪艫舮艱艷艸艾芍芒芫芟芻芬苡苣苟苒苴苳苺莓范苻苹苞茆苜茉苙茵茴茖茲茱荀茹荐荅茯茫茗茘莅莚莪莟莢莖茣莎莇莊荼莵荳荵莠莉莨菴萓菫菎菽萃菘萋菁菷萇菠菲萍萢萠莽萸蔆菻葭萪萼蕚蒄葷葫蒭葮蒂葩葆萬葯葹萵蓊葢蒹蒿蒟蓙蓍蒻蓚蓐蓁蓆蓖蒡蔡蓿蓴蔗蔘蔬蔟蔕蔔蓼蕀蕣蕘蕈"
		],
		[
			"e540",
			"蕁蘂蕋蕕薀薤薈薑薊薨蕭薔薛藪薇薜蕷蕾薐藉薺藏薹藐藕藝藥藜藹蘊蘓蘋藾藺蘆蘢蘚蘰蘿虍乕虔號虧虱蚓蚣蚩蚪蚋蚌蚶蚯蛄蛆蚰蛉蠣蚫蛔蛞蛩蛬"
		],
		[
			"e580",
			"蛟蛛蛯蜒蜆蜈蜀蜃蛻蜑蜉蜍蛹蜊蜴蜿蜷蜻蜥蜩蜚蝠蝟蝸蝌蝎蝴蝗蝨蝮蝙蝓蝣蝪蠅螢螟螂螯蟋螽蟀蟐雖螫蟄螳蟇蟆螻蟯蟲蟠蠏蠍蟾蟶蟷蠎蟒蠑蠖蠕蠢蠡蠱蠶蠹蠧蠻衄衂衒衙衞衢衫袁衾袞衵衽袵衲袂袗袒袮袙袢袍袤袰袿袱裃裄裔裘裙裝裹褂裼裴裨裲褄褌褊褓襃褞褥褪褫襁襄褻褶褸襌褝襠襞"
		],
		[
			"e640",
			"襦襤襭襪襯襴襷襾覃覈覊覓覘覡覩覦覬覯覲覺覽覿觀觚觜觝觧觴觸訃訖訐訌訛訝訥訶詁詛詒詆詈詼詭詬詢誅誂誄誨誡誑誥誦誚誣諄諍諂諚諫諳諧"
		],
		[
			"e680",
			"諤諱謔諠諢諷諞諛謌謇謚諡謖謐謗謠謳鞫謦謫謾謨譁譌譏譎證譖譛譚譫譟譬譯譴譽讀讌讎讒讓讖讙讚谺豁谿豈豌豎豐豕豢豬豸豺貂貉貅貊貍貎貔豼貘戝貭貪貽貲貳貮貶賈賁賤賣賚賽賺賻贄贅贊贇贏贍贐齎贓賍贔贖赧赭赱赳趁趙跂趾趺跏跚跖跌跛跋跪跫跟跣跼踈踉跿踝踞踐踟蹂踵踰踴蹊"
		],
		[
			"e740",
			"蹇蹉蹌蹐蹈蹙蹤蹠踪蹣蹕蹶蹲蹼躁躇躅躄躋躊躓躑躔躙躪躡躬躰軆躱躾軅軈軋軛軣軼軻軫軾輊輅輕輒輙輓輜輟輛輌輦輳輻輹轅轂輾轌轉轆轎轗轜"
		],
		[
			"e780",
			"轢轣轤辜辟辣辭辯辷迚迥迢迪迯邇迴逅迹迺逑逕逡逍逞逖逋逧逶逵逹迸遏遐遑遒逎遉逾遖遘遞遨遯遶隨遲邂遽邁邀邊邉邏邨邯邱邵郢郤扈郛鄂鄒鄙鄲鄰酊酖酘酣酥酩酳酲醋醉醂醢醫醯醪醵醴醺釀釁釉釋釐釖釟釡釛釼釵釶鈞釿鈔鈬鈕鈑鉞鉗鉅鉉鉤鉈銕鈿鉋鉐銜銖銓銛鉚鋏銹銷鋩錏鋺鍄錮"
		],
		[
			"e840",
			"錙錢錚錣錺錵錻鍜鍠鍼鍮鍖鎰鎬鎭鎔鎹鏖鏗鏨鏥鏘鏃鏝鏐鏈鏤鐚鐔鐓鐃鐇鐐鐶鐫鐵鐡鐺鑁鑒鑄鑛鑠鑢鑞鑪鈩鑰鑵鑷鑽鑚鑼鑾钁鑿閂閇閊閔閖閘閙"
		],
		[
			"e880",
			"閠閨閧閭閼閻閹閾闊濶闃闍闌闕闔闖關闡闥闢阡阨阮阯陂陌陏陋陷陜陞陝陟陦陲陬隍隘隕隗險隧隱隲隰隴隶隸隹雎雋雉雍襍雜霍雕雹霄霆霈霓霎霑霏霖霙霤霪霰霹霽霾靄靆靈靂靉靜靠靤靦靨勒靫靱靹鞅靼鞁靺鞆鞋鞏鞐鞜鞨鞦鞣鞳鞴韃韆韈韋韜韭齏韲竟韶韵頏頌頸頤頡頷頽顆顏顋顫顯顰"
		],
		[
			"e940",
			"顱顴顳颪颯颱颶飄飃飆飩飫餃餉餒餔餘餡餝餞餤餠餬餮餽餾饂饉饅饐饋饑饒饌饕馗馘馥馭馮馼駟駛駝駘駑駭駮駱駲駻駸騁騏騅駢騙騫騷驅驂驀驃"
		],
		[
			"e980",
			"騾驕驍驛驗驟驢驥驤驩驫驪骭骰骼髀髏髑髓體髞髟髢髣髦髯髫髮髴髱髷髻鬆鬘鬚鬟鬢鬣鬥鬧鬨鬩鬪鬮鬯鬲魄魃魏魍魎魑魘魴鮓鮃鮑鮖鮗鮟鮠鮨鮴鯀鯊鮹鯆鯏鯑鯒鯣鯢鯤鯔鯡鰺鯲鯱鯰鰕鰔鰉鰓鰌鰆鰈鰒鰊鰄鰮鰛鰥鰤鰡鰰鱇鰲鱆鰾鱚鱠鱧鱶鱸鳧鳬鳰鴉鴈鳫鴃鴆鴪鴦鶯鴣鴟鵄鴕鴒鵁鴿鴾鵆鵈"
		],
		[
			"ea40",
			"鵝鵞鵤鵑鵐鵙鵲鶉鶇鶫鵯鵺鶚鶤鶩鶲鷄鷁鶻鶸鶺鷆鷏鷂鷙鷓鷸鷦鷭鷯鷽鸚鸛鸞鹵鹹鹽麁麈麋麌麒麕麑麝麥麩麸麪麭靡黌黎黏黐黔黜點黝黠黥黨黯"
		],
		[
			"ea80",
			"黴黶黷黹黻黼黽鼇鼈皷鼕鼡鼬鼾齊齒齔齣齟齠齡齦齧齬齪齷齲齶龕龜龠堯槇遙瑤凜熙"
		],
		[
			"ed40",
			"纊褜鍈銈蓜俉炻昱棈鋹曻彅丨仡仼伀伃伹佖侒侊侚侔俍偀倢俿倞偆偰偂傔僴僘兊兤冝冾凬刕劜劦勀勛匀匇匤卲厓厲叝﨎咜咊咩哿喆坙坥垬埈埇﨏"
		],
		[
			"ed80",
			"塚增墲夋奓奛奝奣妤妺孖寀甯寘寬尞岦岺峵崧嵓﨑嵂嵭嶸嶹巐弡弴彧德忞恝悅悊惞惕愠惲愑愷愰憘戓抦揵摠撝擎敎昀昕昻昉昮昞昤晥晗晙晴晳暙暠暲暿曺朎朗杦枻桒柀栁桄棏﨓楨﨔榘槢樰橫橆橳橾櫢櫤毖氿汜沆汯泚洄涇浯涖涬淏淸淲淼渹湜渧渼溿澈澵濵瀅瀇瀨炅炫焏焄煜煆煇凞燁燾犱"
		],
		[
			"ee40",
			"犾猤猪獷玽珉珖珣珒琇珵琦琪琩琮瑢璉璟甁畯皂皜皞皛皦益睆劯砡硎硤硺礰礼神祥禔福禛竑竧靖竫箞精絈絜綷綠緖繒罇羡羽茁荢荿菇菶葈蒴蕓蕙"
		],
		[
			"ee80",
			"蕫﨟薰蘒﨡蠇裵訒訷詹誧誾諟諸諶譓譿賰賴贒赶﨣軏﨤逸遧郞都鄕鄧釚釗釞釭釮釤釥鈆鈐鈊鈺鉀鈼鉎鉙鉑鈹鉧銧鉷鉸鋧鋗鋙鋐﨧鋕鋠鋓錥錡鋻﨨錞鋿錝錂鍰鍗鎤鏆鏞鏸鐱鑅鑈閒隆﨩隝隯霳霻靃靍靏靑靕顗顥飯飼餧館馞驎髙髜魵魲鮏鮱鮻鰀鵰鵫鶴鸙黑"
		],
		[
			"eeef",
			"ⅰ",
			9,
			"￢￤＇＂"
		],
		[
			"f040",
			"",
			62
		],
		[
			"f080",
			"",
			124
		],
		[
			"f140",
			"",
			62
		],
		[
			"f180",
			"",
			124
		],
		[
			"f240",
			"",
			62
		],
		[
			"f280",
			"",
			124
		],
		[
			"f340",
			"",
			62
		],
		[
			"f380",
			"",
			124
		],
		[
			"f440",
			"",
			62
		],
		[
			"f480",
			"",
			124
		],
		[
			"f540",
			"",
			62
		],
		[
			"f580",
			"",
			124
		],
		[
			"f640",
			"",
			62
		],
		[
			"f680",
			"",
			124
		],
		[
			"f740",
			"",
			62
		],
		[
			"f780",
			"",
			124
		],
		[
			"f840",
			"",
			62
		],
		[
			"f880",
			"",
			124
		],
		[
			"f940",
			""
		],
		[
			"fa40",
			"ⅰ",
			9,
			"Ⅰ",
			9,
			"￢￤＇＂㈱№℡∵纊褜鍈銈蓜俉炻昱棈鋹曻彅丨仡仼伀伃伹佖侒侊侚侔俍偀倢俿倞偆偰偂傔僴僘兊"
		],
		[
			"fa80",
			"兤冝冾凬刕劜劦勀勛匀匇匤卲厓厲叝﨎咜咊咩哿喆坙坥垬埈埇﨏塚增墲夋奓奛奝奣妤妺孖寀甯寘寬尞岦岺峵崧嵓﨑嵂嵭嶸嶹巐弡弴彧德忞恝悅悊惞惕愠惲愑愷愰憘戓抦揵摠撝擎敎昀昕昻昉昮昞昤晥晗晙晴晳暙暠暲暿曺朎朗杦枻桒柀栁桄棏﨓楨﨔榘槢樰橫橆橳橾櫢櫤毖氿汜沆汯泚洄涇浯"
		],
		[
			"fb40",
			"涖涬淏淸淲淼渹湜渧渼溿澈澵濵瀅瀇瀨炅炫焏焄煜煆煇凞燁燾犱犾猤猪獷玽珉珖珣珒琇珵琦琪琩琮瑢璉璟甁畯皂皜皞皛皦益睆劯砡硎硤硺礰礼神"
		],
		[
			"fb80",
			"祥禔福禛竑竧靖竫箞精絈絜綷綠緖繒罇羡羽茁荢荿菇菶葈蒴蕓蕙蕫﨟薰蘒﨡蠇裵訒訷詹誧誾諟諸諶譓譿賰賴贒赶﨣軏﨤逸遧郞都鄕鄧釚釗釞釭釮釤釥鈆鈐鈊鈺鉀鈼鉎鉙鉑鈹鉧銧鉷鉸鋧鋗鋙鋐﨧鋕鋠鋓錥錡鋻﨨錞鋿錝錂鍰鍗鎤鏆鏞鏸鐱鑅鑈閒隆﨩隝隯霳霻靃靍靏靑靕顗顥飯飼餧館馞驎髙"
		],
		[
			"fc40",
			"髜魵魲鮏鮱鮻鰀鵰鵫鶴鸙黑"
		]
	];

/***/ },
/* 124 */
/***/ function(module, exports) {

	module.exports = [
		[
			"0",
			"\u0000",
			127
		],
		[
			"8ea1",
			"｡",
			62
		],
		[
			"a1a1",
			"　、。，．・：；？！゛゜´｀¨＾￣＿ヽヾゝゞ〃仝々〆〇ー―‐／＼～∥｜…‥‘’“”（）〔〕［］｛｝〈",
			9,
			"＋－±×÷＝≠＜＞≦≧∞∴♂♀°′″℃￥＄￠￡％＃＆＊＠§☆★○●◎◇"
		],
		[
			"a2a1",
			"◆□■△▲▽▼※〒→←↑↓〓"
		],
		[
			"a2ba",
			"∈∋⊆⊇⊂⊃∪∩"
		],
		[
			"a2ca",
			"∧∨￢⇒⇔∀∃"
		],
		[
			"a2dc",
			"∠⊥⌒∂∇≡≒≪≫√∽∝∵∫∬"
		],
		[
			"a2f2",
			"Å‰♯♭♪†‡¶"
		],
		[
			"a2fe",
			"◯"
		],
		[
			"a3b0",
			"０",
			9
		],
		[
			"a3c1",
			"Ａ",
			25
		],
		[
			"a3e1",
			"ａ",
			25
		],
		[
			"a4a1",
			"ぁ",
			82
		],
		[
			"a5a1",
			"ァ",
			85
		],
		[
			"a6a1",
			"Α",
			16,
			"Σ",
			6
		],
		[
			"a6c1",
			"α",
			16,
			"σ",
			6
		],
		[
			"a7a1",
			"А",
			5,
			"ЁЖ",
			25
		],
		[
			"a7d1",
			"а",
			5,
			"ёж",
			25
		],
		[
			"a8a1",
			"─│┌┐┘└├┬┤┴┼━┃┏┓┛┗┣┳┫┻╋┠┯┨┷┿┝┰┥┸╂"
		],
		[
			"ada1",
			"①",
			19,
			"Ⅰ",
			9
		],
		[
			"adc0",
			"㍉㌔㌢㍍㌘㌧㌃㌶㍑㍗㌍㌦㌣㌫㍊㌻㎜㎝㎞㎎㎏㏄㎡"
		],
		[
			"addf",
			"㍻〝〟№㏍℡㊤",
			4,
			"㈱㈲㈹㍾㍽㍼≒≡∫∮∑√⊥∠∟⊿∵∩∪"
		],
		[
			"b0a1",
			"亜唖娃阿哀愛挨姶逢葵茜穐悪握渥旭葦芦鯵梓圧斡扱宛姐虻飴絢綾鮎或粟袷安庵按暗案闇鞍杏以伊位依偉囲夷委威尉惟意慰易椅為畏異移維緯胃萎衣謂違遺医井亥域育郁磯一壱溢逸稲茨芋鰯允印咽員因姻引飲淫胤蔭"
		],
		[
			"b1a1",
			"院陰隠韻吋右宇烏羽迂雨卯鵜窺丑碓臼渦嘘唄欝蔚鰻姥厩浦瓜閏噂云運雲荏餌叡営嬰影映曳栄永泳洩瑛盈穎頴英衛詠鋭液疫益駅悦謁越閲榎厭円園堰奄宴延怨掩援沿演炎焔煙燕猿縁艶苑薗遠鉛鴛塩於汚甥凹央奥往応"
		],
		[
			"b2a1",
			"押旺横欧殴王翁襖鴬鴎黄岡沖荻億屋憶臆桶牡乙俺卸恩温穏音下化仮何伽価佳加可嘉夏嫁家寡科暇果架歌河火珂禍禾稼箇花苛茄荷華菓蝦課嘩貨迦過霞蚊俄峨我牙画臥芽蛾賀雅餓駕介会解回塊壊廻快怪悔恢懐戒拐改"
		],
		[
			"b3a1",
			"魁晦械海灰界皆絵芥蟹開階貝凱劾外咳害崖慨概涯碍蓋街該鎧骸浬馨蛙垣柿蛎鈎劃嚇各廓拡撹格核殻獲確穫覚角赫較郭閣隔革学岳楽額顎掛笠樫橿梶鰍潟割喝恰括活渇滑葛褐轄且鰹叶椛樺鞄株兜竃蒲釜鎌噛鴨栢茅萱"
		],
		[
			"b4a1",
			"粥刈苅瓦乾侃冠寒刊勘勧巻喚堪姦完官寛干幹患感慣憾換敢柑桓棺款歓汗漢澗潅環甘監看竿管簡緩缶翰肝艦莞観諌貫還鑑間閑関陥韓館舘丸含岸巌玩癌眼岩翫贋雁頑顔願企伎危喜器基奇嬉寄岐希幾忌揮机旗既期棋棄"
		],
		[
			"b5a1",
			"機帰毅気汽畿祈季稀紀徽規記貴起軌輝飢騎鬼亀偽儀妓宜戯技擬欺犠疑祇義蟻誼議掬菊鞠吉吃喫桔橘詰砧杵黍却客脚虐逆丘久仇休及吸宮弓急救朽求汲泣灸球究窮笈級糾給旧牛去居巨拒拠挙渠虚許距鋸漁禦魚亨享京"
		],
		[
			"b6a1",
			"供侠僑兇競共凶協匡卿叫喬境峡強彊怯恐恭挟教橋況狂狭矯胸脅興蕎郷鏡響饗驚仰凝尭暁業局曲極玉桐粁僅勤均巾錦斤欣欽琴禁禽筋緊芹菌衿襟謹近金吟銀九倶句区狗玖矩苦躯駆駈駒具愚虞喰空偶寓遇隅串櫛釧屑屈"
		],
		[
			"b7a1",
			"掘窟沓靴轡窪熊隈粂栗繰桑鍬勲君薫訓群軍郡卦袈祁係傾刑兄啓圭珪型契形径恵慶慧憩掲携敬景桂渓畦稽系経継繋罫茎荊蛍計詣警軽頚鶏芸迎鯨劇戟撃激隙桁傑欠決潔穴結血訣月件倹倦健兼券剣喧圏堅嫌建憲懸拳捲"
		],
		[
			"b8a1",
			"検権牽犬献研硯絹県肩見謙賢軒遣鍵険顕験鹸元原厳幻弦減源玄現絃舷言諺限乎個古呼固姑孤己庫弧戸故枯湖狐糊袴股胡菰虎誇跨鈷雇顧鼓五互伍午呉吾娯後御悟梧檎瑚碁語誤護醐乞鯉交佼侯候倖光公功効勾厚口向"
		],
		[
			"b9a1",
			"后喉坑垢好孔孝宏工巧巷幸広庚康弘恒慌抗拘控攻昂晃更杭校梗構江洪浩港溝甲皇硬稿糠紅紘絞綱耕考肯肱腔膏航荒行衡講貢購郊酵鉱砿鋼閤降項香高鴻剛劫号合壕拷濠豪轟麹克刻告国穀酷鵠黒獄漉腰甑忽惚骨狛込"
		],
		[
			"baa1",
			"此頃今困坤墾婚恨懇昏昆根梱混痕紺艮魂些佐叉唆嵯左差査沙瑳砂詐鎖裟坐座挫債催再最哉塞妻宰彩才採栽歳済災采犀砕砦祭斎細菜裁載際剤在材罪財冴坂阪堺榊肴咲崎埼碕鷺作削咋搾昨朔柵窄策索錯桜鮭笹匙冊刷"
		],
		[
			"bba1",
			"察拶撮擦札殺薩雑皐鯖捌錆鮫皿晒三傘参山惨撒散桟燦珊産算纂蚕讃賛酸餐斬暫残仕仔伺使刺司史嗣四士始姉姿子屍市師志思指支孜斯施旨枝止死氏獅祉私糸紙紫肢脂至視詞詩試誌諮資賜雌飼歯事似侍児字寺慈持時"
		],
		[
			"bca1",
			"次滋治爾璽痔磁示而耳自蒔辞汐鹿式識鴫竺軸宍雫七叱執失嫉室悉湿漆疾質実蔀篠偲柴芝屡蕊縞舎写射捨赦斜煮社紗者謝車遮蛇邪借勺尺杓灼爵酌釈錫若寂弱惹主取守手朱殊狩珠種腫趣酒首儒受呪寿授樹綬需囚収周"
		],
		[
			"bda1",
			"宗就州修愁拾洲秀秋終繍習臭舟蒐衆襲讐蹴輯週酋酬集醜什住充十従戎柔汁渋獣縦重銃叔夙宿淑祝縮粛塾熟出術述俊峻春瞬竣舜駿准循旬楯殉淳準潤盾純巡遵醇順処初所暑曙渚庶緒署書薯藷諸助叙女序徐恕鋤除傷償"
		],
		[
			"bea1",
			"勝匠升召哨商唱嘗奨妾娼宵将小少尚庄床廠彰承抄招掌捷昇昌昭晶松梢樟樵沼消渉湘焼焦照症省硝礁祥称章笑粧紹肖菖蒋蕉衝裳訟証詔詳象賞醤鉦鍾鐘障鞘上丈丞乗冗剰城場壌嬢常情擾条杖浄状畳穣蒸譲醸錠嘱埴飾"
		],
		[
			"bfa1",
			"拭植殖燭織職色触食蝕辱尻伸信侵唇娠寝審心慎振新晋森榛浸深申疹真神秦紳臣芯薪親診身辛進針震人仁刃塵壬尋甚尽腎訊迅陣靭笥諏須酢図厨逗吹垂帥推水炊睡粋翠衰遂酔錐錘随瑞髄崇嵩数枢趨雛据杉椙菅頗雀裾"
		],
		[
			"c0a1",
			"澄摺寸世瀬畝是凄制勢姓征性成政整星晴棲栖正清牲生盛精聖声製西誠誓請逝醒青静斉税脆隻席惜戚斥昔析石積籍績脊責赤跡蹟碩切拙接摂折設窃節説雪絶舌蝉仙先千占宣専尖川戦扇撰栓栴泉浅洗染潜煎煽旋穿箭線"
		],
		[
			"c1a1",
			"繊羨腺舛船薦詮賎践選遷銭銑閃鮮前善漸然全禅繕膳糎噌塑岨措曾曽楚狙疏疎礎祖租粗素組蘇訴阻遡鼠僧創双叢倉喪壮奏爽宋層匝惣想捜掃挿掻操早曹巣槍槽漕燥争痩相窓糟総綜聡草荘葬蒼藻装走送遭鎗霜騒像増憎"
		],
		[
			"c2a1",
			"臓蔵贈造促側則即息捉束測足速俗属賊族続卒袖其揃存孫尊損村遜他多太汰詑唾堕妥惰打柁舵楕陀駄騨体堆対耐岱帯待怠態戴替泰滞胎腿苔袋貸退逮隊黛鯛代台大第醍題鷹滝瀧卓啄宅托択拓沢濯琢託鐸濁諾茸凧蛸只"
		],
		[
			"c3a1",
			"叩但達辰奪脱巽竪辿棚谷狸鱈樽誰丹単嘆坦担探旦歎淡湛炭短端箪綻耽胆蛋誕鍛団壇弾断暖檀段男談値知地弛恥智池痴稚置致蜘遅馳築畜竹筑蓄逐秩窒茶嫡着中仲宙忠抽昼柱注虫衷註酎鋳駐樗瀦猪苧著貯丁兆凋喋寵"
		],
		[
			"c4a1",
			"帖帳庁弔張彫徴懲挑暢朝潮牒町眺聴脹腸蝶調諜超跳銚長頂鳥勅捗直朕沈珍賃鎮陳津墜椎槌追鎚痛通塚栂掴槻佃漬柘辻蔦綴鍔椿潰坪壷嬬紬爪吊釣鶴亭低停偵剃貞呈堤定帝底庭廷弟悌抵挺提梯汀碇禎程締艇訂諦蹄逓"
		],
		[
			"c5a1",
			"邸鄭釘鼎泥摘擢敵滴的笛適鏑溺哲徹撤轍迭鉄典填天展店添纏甜貼転顛点伝殿澱田電兎吐堵塗妬屠徒斗杜渡登菟賭途都鍍砥砺努度土奴怒倒党冬凍刀唐塔塘套宕島嶋悼投搭東桃梼棟盗淘湯涛灯燈当痘祷等答筒糖統到"
		],
		[
			"c6a1",
			"董蕩藤討謄豆踏逃透鐙陶頭騰闘働動同堂導憧撞洞瞳童胴萄道銅峠鴇匿得徳涜特督禿篤毒独読栃橡凸突椴届鳶苫寅酉瀞噸屯惇敦沌豚遁頓呑曇鈍奈那内乍凪薙謎灘捺鍋楢馴縄畷南楠軟難汝二尼弐迩匂賑肉虹廿日乳入"
		],
		[
			"c7a1",
			"如尿韮任妊忍認濡禰祢寧葱猫熱年念捻撚燃粘乃廼之埜嚢悩濃納能脳膿農覗蚤巴把播覇杷波派琶破婆罵芭馬俳廃拝排敗杯盃牌背肺輩配倍培媒梅楳煤狽買売賠陪這蝿秤矧萩伯剥博拍柏泊白箔粕舶薄迫曝漠爆縛莫駁麦"
		],
		[
			"c8a1",
			"函箱硲箸肇筈櫨幡肌畑畠八鉢溌発醗髪伐罰抜筏閥鳩噺塙蛤隼伴判半反叛帆搬斑板氾汎版犯班畔繁般藩販範釆煩頒飯挽晩番盤磐蕃蛮匪卑否妃庇彼悲扉批披斐比泌疲皮碑秘緋罷肥被誹費避非飛樋簸備尾微枇毘琵眉美"
		],
		[
			"c9a1",
			"鼻柊稗匹疋髭彦膝菱肘弼必畢筆逼桧姫媛紐百謬俵彪標氷漂瓢票表評豹廟描病秒苗錨鋲蒜蛭鰭品彬斌浜瀕貧賓頻敏瓶不付埠夫婦富冨布府怖扶敷斧普浮父符腐膚芙譜負賦赴阜附侮撫武舞葡蕪部封楓風葺蕗伏副復幅服"
		],
		[
			"caa1",
			"福腹複覆淵弗払沸仏物鮒分吻噴墳憤扮焚奮粉糞紛雰文聞丙併兵塀幣平弊柄並蔽閉陛米頁僻壁癖碧別瞥蔑箆偏変片篇編辺返遍便勉娩弁鞭保舗鋪圃捕歩甫補輔穂募墓慕戊暮母簿菩倣俸包呆報奉宝峰峯崩庖抱捧放方朋"
		],
		[
			"cba1",
			"法泡烹砲縫胞芳萌蓬蜂褒訪豊邦鋒飽鳳鵬乏亡傍剖坊妨帽忘忙房暴望某棒冒紡肪膨謀貌貿鉾防吠頬北僕卜墨撲朴牧睦穆釦勃没殆堀幌奔本翻凡盆摩磨魔麻埋妹昧枚毎哩槙幕膜枕鮪柾鱒桝亦俣又抹末沫迄侭繭麿万慢満"
		],
		[
			"cca1",
			"漫蔓味未魅巳箕岬密蜜湊蓑稔脈妙粍民眠務夢無牟矛霧鵡椋婿娘冥名命明盟迷銘鳴姪牝滅免棉綿緬面麺摸模茂妄孟毛猛盲網耗蒙儲木黙目杢勿餅尤戻籾貰問悶紋門匁也冶夜爺耶野弥矢厄役約薬訳躍靖柳薮鑓愉愈油癒"
		],
		[
			"cda1",
			"諭輸唯佑優勇友宥幽悠憂揖有柚湧涌猶猷由祐裕誘遊邑郵雄融夕予余与誉輿預傭幼妖容庸揚揺擁曜楊様洋溶熔用窯羊耀葉蓉要謡踊遥陽養慾抑欲沃浴翌翼淀羅螺裸来莱頼雷洛絡落酪乱卵嵐欄濫藍蘭覧利吏履李梨理璃"
		],
		[
			"cea1",
			"痢裏裡里離陸律率立葎掠略劉流溜琉留硫粒隆竜龍侶慮旅虜了亮僚両凌寮料梁涼猟療瞭稜糧良諒遼量陵領力緑倫厘林淋燐琳臨輪隣鱗麟瑠塁涙累類令伶例冷励嶺怜玲礼苓鈴隷零霊麗齢暦歴列劣烈裂廉恋憐漣煉簾練聯"
		],
		[
			"cfa1",
			"蓮連錬呂魯櫓炉賂路露労婁廊弄朗楼榔浪漏牢狼篭老聾蝋郎六麓禄肋録論倭和話歪賄脇惑枠鷲亙亘鰐詫藁蕨椀湾碗腕"
		],
		[
			"d0a1",
			"弌丐丕个丱丶丼丿乂乖乘亂亅豫亊舒弍于亞亟亠亢亰亳亶从仍仄仆仂仗仞仭仟价伉佚估佛佝佗佇佶侈侏侘佻佩佰侑佯來侖儘俔俟俎俘俛俑俚俐俤俥倚倨倔倪倥倅伜俶倡倩倬俾俯們倆偃假會偕偐偈做偖偬偸傀傚傅傴傲"
		],
		[
			"d1a1",
			"僉僊傳僂僖僞僥僭僣僮價僵儉儁儂儖儕儔儚儡儺儷儼儻儿兀兒兌兔兢竸兩兪兮冀冂囘册冉冏冑冓冕冖冤冦冢冩冪冫决冱冲冰况冽凅凉凛几處凩凭凰凵凾刄刋刔刎刧刪刮刳刹剏剄剋剌剞剔剪剴剩剳剿剽劍劔劒剱劈劑辨"
		],
		[
			"d2a1",
			"辧劬劭劼劵勁勍勗勞勣勦飭勠勳勵勸勹匆匈甸匍匐匏匕匚匣匯匱匳匸區卆卅丗卉卍凖卞卩卮夘卻卷厂厖厠厦厥厮厰厶參簒雙叟曼燮叮叨叭叺吁吽呀听吭吼吮吶吩吝呎咏呵咎呟呱呷呰咒呻咀呶咄咐咆哇咢咸咥咬哄哈咨"
		],
		[
			"d3a1",
			"咫哂咤咾咼哘哥哦唏唔哽哮哭哺哢唹啀啣啌售啜啅啖啗唸唳啝喙喀咯喊喟啻啾喘喞單啼喃喩喇喨嗚嗅嗟嗄嗜嗤嗔嘔嗷嘖嗾嗽嘛嗹噎噐營嘴嘶嘲嘸噫噤嘯噬噪嚆嚀嚊嚠嚔嚏嚥嚮嚶嚴囂嚼囁囃囀囈囎囑囓囗囮囹圀囿圄圉"
		],
		[
			"d4a1",
			"圈國圍圓團圖嗇圜圦圷圸坎圻址坏坩埀垈坡坿垉垓垠垳垤垪垰埃埆埔埒埓堊埖埣堋堙堝塲堡塢塋塰毀塒堽塹墅墹墟墫墺壞墻墸墮壅壓壑壗壙壘壥壜壤壟壯壺壹壻壼壽夂夊夐夛梦夥夬夭夲夸夾竒奕奐奎奚奘奢奠奧奬奩"
		],
		[
			"d5a1",
			"奸妁妝佞侫妣妲姆姨姜妍姙姚娥娟娑娜娉娚婀婬婉娵娶婢婪媚媼媾嫋嫂媽嫣嫗嫦嫩嫖嫺嫻嬌嬋嬖嬲嫐嬪嬶嬾孃孅孀孑孕孚孛孥孩孰孳孵學斈孺宀它宦宸寃寇寉寔寐寤實寢寞寥寫寰寶寳尅將專對尓尠尢尨尸尹屁屆屎屓"
		],
		[
			"d6a1",
			"屐屏孱屬屮乢屶屹岌岑岔妛岫岻岶岼岷峅岾峇峙峩峽峺峭嶌峪崋崕崗嵜崟崛崑崔崢崚崙崘嵌嵒嵎嵋嵬嵳嵶嶇嶄嶂嶢嶝嶬嶮嶽嶐嶷嶼巉巍巓巒巖巛巫已巵帋帚帙帑帛帶帷幄幃幀幎幗幔幟幢幤幇幵并幺麼广庠廁廂廈廐廏"
		],
		[
			"d7a1",
			"廖廣廝廚廛廢廡廨廩廬廱廳廰廴廸廾弃弉彝彜弋弑弖弩弭弸彁彈彌彎弯彑彖彗彙彡彭彳彷徃徂彿徊很徑徇從徙徘徠徨徭徼忖忻忤忸忱忝悳忿怡恠怙怐怩怎怱怛怕怫怦怏怺恚恁恪恷恟恊恆恍恣恃恤恂恬恫恙悁悍惧悃悚"
		],
		[
			"d8a1",
			"悄悛悖悗悒悧悋惡悸惠惓悴忰悽惆悵惘慍愕愆惶惷愀惴惺愃愡惻惱愍愎慇愾愨愧慊愿愼愬愴愽慂慄慳慷慘慙慚慫慴慯慥慱慟慝慓慵憙憖憇憬憔憚憊憑憫憮懌懊應懷懈懃懆憺懋罹懍懦懣懶懺懴懿懽懼懾戀戈戉戍戌戔戛"
		],
		[
			"d9a1",
			"戞戡截戮戰戲戳扁扎扞扣扛扠扨扼抂抉找抒抓抖拔抃抔拗拑抻拏拿拆擔拈拜拌拊拂拇抛拉挌拮拱挧挂挈拯拵捐挾捍搜捏掖掎掀掫捶掣掏掉掟掵捫捩掾揩揀揆揣揉插揶揄搖搴搆搓搦搶攝搗搨搏摧摯摶摎攪撕撓撥撩撈撼"
		],
		[
			"daa1",
			"據擒擅擇撻擘擂擱擧舉擠擡抬擣擯攬擶擴擲擺攀擽攘攜攅攤攣攫攴攵攷收攸畋效敖敕敍敘敞敝敲數斂斃變斛斟斫斷旃旆旁旄旌旒旛旙无旡旱杲昊昃旻杳昵昶昴昜晏晄晉晁晞晝晤晧晨晟晢晰暃暈暎暉暄暘暝曁暹曉暾暼"
		],
		[
			"dba1",
			"曄暸曖曚曠昿曦曩曰曵曷朏朖朞朦朧霸朮朿朶杁朸朷杆杞杠杙杣杤枉杰枩杼杪枌枋枦枡枅枷柯枴柬枳柩枸柤柞柝柢柮枹柎柆柧檜栞框栩桀桍栲桎梳栫桙档桷桿梟梏梭梔條梛梃檮梹桴梵梠梺椏梍桾椁棊椈棘椢椦棡椌棍"
		],
		[
			"dca1",
			"棔棧棕椶椒椄棗棣椥棹棠棯椨椪椚椣椡棆楹楷楜楸楫楔楾楮椹楴椽楙椰楡楞楝榁楪榲榮槐榿槁槓榾槎寨槊槝榻槃榧樮榑榠榜榕榴槞槨樂樛槿權槹槲槧樅榱樞槭樔槫樊樒櫁樣樓橄樌橲樶橸橇橢橙橦橈樸樢檐檍檠檄檢檣"
		],
		[
			"dda1",
			"檗蘗檻櫃櫂檸檳檬櫞櫑櫟檪櫚櫪櫻欅蘖櫺欒欖鬱欟欸欷盜欹飮歇歃歉歐歙歔歛歟歡歸歹歿殀殄殃殍殘殕殞殤殪殫殯殲殱殳殷殼毆毋毓毟毬毫毳毯麾氈氓气氛氤氣汞汕汢汪沂沍沚沁沛汾汨汳沒沐泄泱泓沽泗泅泝沮沱沾"
		],
		[
			"dea1",
			"沺泛泯泙泪洟衍洶洫洽洸洙洵洳洒洌浣涓浤浚浹浙涎涕濤涅淹渕渊涵淇淦涸淆淬淞淌淨淒淅淺淙淤淕淪淮渭湮渮渙湲湟渾渣湫渫湶湍渟湃渺湎渤滿渝游溂溪溘滉溷滓溽溯滄溲滔滕溏溥滂溟潁漑灌滬滸滾漿滲漱滯漲滌"
		],
		[
			"dfa1",
			"漾漓滷澆潺潸澁澀潯潛濳潭澂潼潘澎澑濂潦澳澣澡澤澹濆澪濟濕濬濔濘濱濮濛瀉瀋濺瀑瀁瀏濾瀛瀚潴瀝瀘瀟瀰瀾瀲灑灣炙炒炯烱炬炸炳炮烟烋烝烙焉烽焜焙煥煕熈煦煢煌煖煬熏燻熄熕熨熬燗熹熾燒燉燔燎燠燬燧燵燼"
		],
		[
			"e0a1",
			"燹燿爍爐爛爨爭爬爰爲爻爼爿牀牆牋牘牴牾犂犁犇犒犖犢犧犹犲狃狆狄狎狒狢狠狡狹狷倏猗猊猜猖猝猴猯猩猥猾獎獏默獗獪獨獰獸獵獻獺珈玳珎玻珀珥珮珞璢琅瑯琥珸琲琺瑕琿瑟瑙瑁瑜瑩瑰瑣瑪瑶瑾璋璞璧瓊瓏瓔珱"
		],
		[
			"e1a1",
			"瓠瓣瓧瓩瓮瓲瓰瓱瓸瓷甄甃甅甌甎甍甕甓甞甦甬甼畄畍畊畉畛畆畚畩畤畧畫畭畸當疆疇畴疊疉疂疔疚疝疥疣痂疳痃疵疽疸疼疱痍痊痒痙痣痞痾痿痼瘁痰痺痲痳瘋瘍瘉瘟瘧瘠瘡瘢瘤瘴瘰瘻癇癈癆癜癘癡癢癨癩癪癧癬癰"
		],
		[
			"e2a1",
			"癲癶癸發皀皃皈皋皎皖皓皙皚皰皴皸皹皺盂盍盖盒盞盡盥盧盪蘯盻眈眇眄眩眤眞眥眦眛眷眸睇睚睨睫睛睥睿睾睹瞎瞋瞑瞠瞞瞰瞶瞹瞿瞼瞽瞻矇矍矗矚矜矣矮矼砌砒礦砠礪硅碎硴碆硼碚碌碣碵碪碯磑磆磋磔碾碼磅磊磬"
		],
		[
			"e3a1",
			"磧磚磽磴礇礒礑礙礬礫祀祠祗祟祚祕祓祺祿禊禝禧齋禪禮禳禹禺秉秕秧秬秡秣稈稍稘稙稠稟禀稱稻稾稷穃穗穉穡穢穩龝穰穹穽窈窗窕窘窖窩竈窰窶竅竄窿邃竇竊竍竏竕竓站竚竝竡竢竦竭竰笂笏笊笆笳笘笙笞笵笨笶筐"
		],
		[
			"e4a1",
			"筺笄筍笋筌筅筵筥筴筧筰筱筬筮箝箘箟箍箜箚箋箒箏筝箙篋篁篌篏箴篆篝篩簑簔篦篥籠簀簇簓篳篷簗簍篶簣簧簪簟簷簫簽籌籃籔籏籀籐籘籟籤籖籥籬籵粃粐粤粭粢粫粡粨粳粲粱粮粹粽糀糅糂糘糒糜糢鬻糯糲糴糶糺紆"
		],
		[
			"e5a1",
			"紂紜紕紊絅絋紮紲紿紵絆絳絖絎絲絨絮絏絣經綉絛綏絽綛綺綮綣綵緇綽綫總綢綯緜綸綟綰緘緝緤緞緻緲緡縅縊縣縡縒縱縟縉縋縢繆繦縻縵縹繃縷縲縺繧繝繖繞繙繚繹繪繩繼繻纃緕繽辮繿纈纉續纒纐纓纔纖纎纛纜缸缺"
		],
		[
			"e6a1",
			"罅罌罍罎罐网罕罔罘罟罠罨罩罧罸羂羆羃羈羇羌羔羞羝羚羣羯羲羹羮羶羸譱翅翆翊翕翔翡翦翩翳翹飜耆耄耋耒耘耙耜耡耨耿耻聊聆聒聘聚聟聢聨聳聲聰聶聹聽聿肄肆肅肛肓肚肭冐肬胛胥胙胝胄胚胖脉胯胱脛脩脣脯腋"
		],
		[
			"e7a1",
			"隋腆脾腓腑胼腱腮腥腦腴膃膈膊膀膂膠膕膤膣腟膓膩膰膵膾膸膽臀臂膺臉臍臑臙臘臈臚臟臠臧臺臻臾舁舂舅與舊舍舐舖舩舫舸舳艀艙艘艝艚艟艤艢艨艪艫舮艱艷艸艾芍芒芫芟芻芬苡苣苟苒苴苳苺莓范苻苹苞茆苜茉苙"
		],
		[
			"e8a1",
			"茵茴茖茲茱荀茹荐荅茯茫茗茘莅莚莪莟莢莖茣莎莇莊荼莵荳荵莠莉莨菴萓菫菎菽萃菘萋菁菷萇菠菲萍萢萠莽萸蔆菻葭萪萼蕚蒄葷葫蒭葮蒂葩葆萬葯葹萵蓊葢蒹蒿蒟蓙蓍蒻蓚蓐蓁蓆蓖蒡蔡蓿蓴蔗蔘蔬蔟蔕蔔蓼蕀蕣蕘蕈"
		],
		[
			"e9a1",
			"蕁蘂蕋蕕薀薤薈薑薊薨蕭薔薛藪薇薜蕷蕾薐藉薺藏薹藐藕藝藥藜藹蘊蘓蘋藾藺蘆蘢蘚蘰蘿虍乕虔號虧虱蚓蚣蚩蚪蚋蚌蚶蚯蛄蛆蚰蛉蠣蚫蛔蛞蛩蛬蛟蛛蛯蜒蜆蜈蜀蜃蛻蜑蜉蜍蛹蜊蜴蜿蜷蜻蜥蜩蜚蝠蝟蝸蝌蝎蝴蝗蝨蝮蝙"
		],
		[
			"eaa1",
			"蝓蝣蝪蠅螢螟螂螯蟋螽蟀蟐雖螫蟄螳蟇蟆螻蟯蟲蟠蠏蠍蟾蟶蟷蠎蟒蠑蠖蠕蠢蠡蠱蠶蠹蠧蠻衄衂衒衙衞衢衫袁衾袞衵衽袵衲袂袗袒袮袙袢袍袤袰袿袱裃裄裔裘裙裝裹褂裼裴裨裲褄褌褊褓襃褞褥褪褫襁襄褻褶褸襌褝襠襞"
		],
		[
			"eba1",
			"襦襤襭襪襯襴襷襾覃覈覊覓覘覡覩覦覬覯覲覺覽覿觀觚觜觝觧觴觸訃訖訐訌訛訝訥訶詁詛詒詆詈詼詭詬詢誅誂誄誨誡誑誥誦誚誣諄諍諂諚諫諳諧諤諱謔諠諢諷諞諛謌謇謚諡謖謐謗謠謳鞫謦謫謾謨譁譌譏譎證譖譛譚譫"
		],
		[
			"eca1",
			"譟譬譯譴譽讀讌讎讒讓讖讙讚谺豁谿豈豌豎豐豕豢豬豸豺貂貉貅貊貍貎貔豼貘戝貭貪貽貲貳貮貶賈賁賤賣賚賽賺賻贄贅贊贇贏贍贐齎贓賍贔贖赧赭赱赳趁趙跂趾趺跏跚跖跌跛跋跪跫跟跣跼踈踉跿踝踞踐踟蹂踵踰踴蹊"
		],
		[
			"eda1",
			"蹇蹉蹌蹐蹈蹙蹤蹠踪蹣蹕蹶蹲蹼躁躇躅躄躋躊躓躑躔躙躪躡躬躰軆躱躾軅軈軋軛軣軼軻軫軾輊輅輕輒輙輓輜輟輛輌輦輳輻輹轅轂輾轌轉轆轎轗轜轢轣轤辜辟辣辭辯辷迚迥迢迪迯邇迴逅迹迺逑逕逡逍逞逖逋逧逶逵逹迸"
		],
		[
			"eea1",
			"遏遐遑遒逎遉逾遖遘遞遨遯遶隨遲邂遽邁邀邊邉邏邨邯邱邵郢郤扈郛鄂鄒鄙鄲鄰酊酖酘酣酥酩酳酲醋醉醂醢醫醯醪醵醴醺釀釁釉釋釐釖釟釡釛釼釵釶鈞釿鈔鈬鈕鈑鉞鉗鉅鉉鉤鉈銕鈿鉋鉐銜銖銓銛鉚鋏銹銷鋩錏鋺鍄錮"
		],
		[
			"efa1",
			"錙錢錚錣錺錵錻鍜鍠鍼鍮鍖鎰鎬鎭鎔鎹鏖鏗鏨鏥鏘鏃鏝鏐鏈鏤鐚鐔鐓鐃鐇鐐鐶鐫鐵鐡鐺鑁鑒鑄鑛鑠鑢鑞鑪鈩鑰鑵鑷鑽鑚鑼鑾钁鑿閂閇閊閔閖閘閙閠閨閧閭閼閻閹閾闊濶闃闍闌闕闔闖關闡闥闢阡阨阮阯陂陌陏陋陷陜陞"
		],
		[
			"f0a1",
			"陝陟陦陲陬隍隘隕隗險隧隱隲隰隴隶隸隹雎雋雉雍襍雜霍雕雹霄霆霈霓霎霑霏霖霙霤霪霰霹霽霾靄靆靈靂靉靜靠靤靦靨勒靫靱靹鞅靼鞁靺鞆鞋鞏鞐鞜鞨鞦鞣鞳鞴韃韆韈韋韜韭齏韲竟韶韵頏頌頸頤頡頷頽顆顏顋顫顯顰"
		],
		[
			"f1a1",
			"顱顴顳颪颯颱颶飄飃飆飩飫餃餉餒餔餘餡餝餞餤餠餬餮餽餾饂饉饅饐饋饑饒饌饕馗馘馥馭馮馼駟駛駝駘駑駭駮駱駲駻駸騁騏騅駢騙騫騷驅驂驀驃騾驕驍驛驗驟驢驥驤驩驫驪骭骰骼髀髏髑髓體髞髟髢髣髦髯髫髮髴髱髷"
		],
		[
			"f2a1",
			"髻鬆鬘鬚鬟鬢鬣鬥鬧鬨鬩鬪鬮鬯鬲魄魃魏魍魎魑魘魴鮓鮃鮑鮖鮗鮟鮠鮨鮴鯀鯊鮹鯆鯏鯑鯒鯣鯢鯤鯔鯡鰺鯲鯱鯰鰕鰔鰉鰓鰌鰆鰈鰒鰊鰄鰮鰛鰥鰤鰡鰰鱇鰲鱆鰾鱚鱠鱧鱶鱸鳧鳬鳰鴉鴈鳫鴃鴆鴪鴦鶯鴣鴟鵄鴕鴒鵁鴿鴾鵆鵈"
		],
		[
			"f3a1",
			"鵝鵞鵤鵑鵐鵙鵲鶉鶇鶫鵯鵺鶚鶤鶩鶲鷄鷁鶻鶸鶺鷆鷏鷂鷙鷓鷸鷦鷭鷯鷽鸚鸛鸞鹵鹹鹽麁麈麋麌麒麕麑麝麥麩麸麪麭靡黌黎黏黐黔黜點黝黠黥黨黯黴黶黷黹黻黼黽鼇鼈皷鼕鼡鼬鼾齊齒齔齣齟齠齡齦齧齬齪齷齲齶龕龜龠"
		],
		[
			"f4a1",
			"堯槇遙瑤凜熙"
		],
		[
			"f9a1",
			"纊褜鍈銈蓜俉炻昱棈鋹曻彅丨仡仼伀伃伹佖侒侊侚侔俍偀倢俿倞偆偰偂傔僴僘兊兤冝冾凬刕劜劦勀勛匀匇匤卲厓厲叝﨎咜咊咩哿喆坙坥垬埈埇﨏塚增墲夋奓奛奝奣妤妺孖寀甯寘寬尞岦岺峵崧嵓﨑嵂嵭嶸嶹巐弡弴彧德"
		],
		[
			"faa1",
			"忞恝悅悊惞惕愠惲愑愷愰憘戓抦揵摠撝擎敎昀昕昻昉昮昞昤晥晗晙晴晳暙暠暲暿曺朎朗杦枻桒柀栁桄棏﨓楨﨔榘槢樰橫橆橳橾櫢櫤毖氿汜沆汯泚洄涇浯涖涬淏淸淲淼渹湜渧渼溿澈澵濵瀅瀇瀨炅炫焏焄煜煆煇凞燁燾犱"
		],
		[
			"fba1",
			"犾猤猪獷玽珉珖珣珒琇珵琦琪琩琮瑢璉璟甁畯皂皜皞皛皦益睆劯砡硎硤硺礰礼神祥禔福禛竑竧靖竫箞精絈絜綷綠緖繒罇羡羽茁荢荿菇菶葈蒴蕓蕙蕫﨟薰蘒﨡蠇裵訒訷詹誧誾諟諸諶譓譿賰賴贒赶﨣軏﨤逸遧郞都鄕鄧釚"
		],
		[
			"fca1",
			"釗釞釭釮釤釥鈆鈐鈊鈺鉀鈼鉎鉙鉑鈹鉧銧鉷鉸鋧鋗鋙鋐﨧鋕鋠鋓錥錡鋻﨨錞鋿錝錂鍰鍗鎤鏆鏞鏸鐱鑅鑈閒隆﨩隝隯霳霻靃靍靏靑靕顗顥飯飼餧館馞驎髙髜魵魲鮏鮱鮻鰀鵰鵫鶴鸙黑"
		],
		[
			"fcf1",
			"ⅰ",
			9,
			"￢￤＇＂"
		],
		[
			"8fa2af",
			"˘ˇ¸˙˝¯˛˚～΄΅"
		],
		[
			"8fa2c2",
			"¡¦¿"
		],
		[
			"8fa2eb",
			"ºª©®™¤№"
		],
		[
			"8fa6e1",
			"ΆΈΉΊΪ"
		],
		[
			"8fa6e7",
			"Ό"
		],
		[
			"8fa6e9",
			"ΎΫ"
		],
		[
			"8fa6ec",
			"Ώ"
		],
		[
			"8fa6f1",
			"άέήίϊΐόςύϋΰώ"
		],
		[
			"8fa7c2",
			"Ђ",
			10,
			"ЎЏ"
		],
		[
			"8fa7f2",
			"ђ",
			10,
			"ўџ"
		],
		[
			"8fa9a1",
			"ÆĐ"
		],
		[
			"8fa9a4",
			"Ħ"
		],
		[
			"8fa9a6",
			"Ĳ"
		],
		[
			"8fa9a8",
			"ŁĿ"
		],
		[
			"8fa9ab",
			"ŊØŒ"
		],
		[
			"8fa9af",
			"ŦÞ"
		],
		[
			"8fa9c1",
			"æđðħıĳĸłŀŉŋøœßŧþ"
		],
		[
			"8faaa1",
			"ÁÀÄÂĂǍĀĄÅÃĆĈČÇĊĎÉÈËÊĚĖĒĘ"
		],
		[
			"8faaba",
			"ĜĞĢĠĤÍÌÏÎǏİĪĮĨĴĶĹĽĻŃŇŅÑÓÒÖÔǑŐŌÕŔŘŖŚŜŠŞŤŢÚÙÜÛŬǓŰŪŲŮŨǗǛǙǕŴÝŸŶŹŽŻ"
		],
		[
			"8faba1",
			"áàäâăǎāąåãćĉčçċďéèëêěėēęǵĝğ"
		],
		[
			"8fabbd",
			"ġĥíìïîǐ"
		],
		[
			"8fabc5",
			"īįĩĵķĺľļńňņñóòöôǒőōõŕřŗśŝšşťţúùüûŭǔűūųůũǘǜǚǖŵýÿŷźžż"
		],
		[
			"8fb0a1",
			"丂丄丅丌丒丟丣两丨丫丮丯丰丵乀乁乄乇乑乚乜乣乨乩乴乵乹乿亍亖亗亝亯亹仃仐仚仛仠仡仢仨仯仱仳仵份仾仿伀伂伃伈伋伌伒伕伖众伙伮伱你伳伵伷伹伻伾佀佂佈佉佋佌佒佔佖佘佟佣佪佬佮佱佷佸佹佺佽佾侁侂侄"
		],
		[
			"8fb1a1",
			"侅侉侊侌侎侐侒侓侔侗侙侚侞侟侲侷侹侻侼侽侾俀俁俅俆俈俉俋俌俍俏俒俜俠俢俰俲俼俽俿倀倁倄倇倊倌倎倐倓倗倘倛倜倝倞倢倧倮倰倲倳倵偀偁偂偅偆偊偌偎偑偒偓偗偙偟偠偢偣偦偧偪偭偰偱倻傁傃傄傆傊傎傏傐"
		],
		[
			"8fb2a1",
			"傒傓傔傖傛傜傞",
			4,
			"傪傯傰傹傺傽僀僃僄僇僌僎僐僓僔僘僜僝僟僢僤僦僨僩僯僱僶僺僾儃儆儇儈儋儌儍儎僲儐儗儙儛儜儝儞儣儧儨儬儭儯儱儳儴儵儸儹兂兊兏兓兕兗兘兟兤兦兾冃冄冋冎冘冝冡冣冭冸冺冼冾冿凂"
		],
		[
			"8fb3a1",
			"凈减凑凒凓凕凘凞凢凥凮凲凳凴凷刁刂刅划刓刕刖刘刢刨刱刲刵刼剅剉剕剗剘剚剜剟剠剡剦剮剷剸剹劀劂劅劊劌劓劕劖劗劘劚劜劤劥劦劧劯劰劶劷劸劺劻劽勀勄勆勈勌勏勑勔勖勛勜勡勥勨勩勪勬勰勱勴勶勷匀匃匊匋"
		],
		[
			"8fb4a1",
			"匌匑匓匘匛匜匞匟匥匧匨匩匫匬匭匰匲匵匼匽匾卂卌卋卙卛卡卣卥卬卭卲卹卾厃厇厈厎厓厔厙厝厡厤厪厫厯厲厴厵厷厸厺厽叀叅叏叒叓叕叚叝叞叠另叧叵吂吓吚吡吧吨吪启吱吴吵呃呄呇呍呏呞呢呤呦呧呩呫呭呮呴呿"
		],
		[
			"8fb5a1",
			"咁咃咅咈咉咍咑咕咖咜咟咡咦咧咩咪咭咮咱咷咹咺咻咿哆哊响哎哠哪哬哯哶哼哾哿唀唁唅唈唉唌唍唎唕唪唫唲唵唶唻唼唽啁啇啉啊啍啐啑啘啚啛啞啠啡啤啦啿喁喂喆喈喎喏喑喒喓喔喗喣喤喭喲喿嗁嗃嗆嗉嗋嗌嗎嗑嗒"
		],
		[
			"8fb6a1",
			"嗓嗗嗘嗛嗞嗢嗩嗶嗿嘅嘈嘊嘍",
			5,
			"嘙嘬嘰嘳嘵嘷嘹嘻嘼嘽嘿噀噁噃噄噆噉噋噍噏噔噞噠噡噢噣噦噩噭噯噱噲噵嚄嚅嚈嚋嚌嚕嚙嚚嚝嚞嚟嚦嚧嚨嚩嚫嚬嚭嚱嚳嚷嚾囅囉囊囋囏囐囌囍囙囜囝囟囡囤",
			4,
			"囱囫园"
		],
		[
			"8fb7a1",
			"囶囷圁圂圇圊圌圑圕圚圛圝圠圢圣圤圥圩圪圬圮圯圳圴圽圾圿坅坆坌坍坒坢坥坧坨坫坭",
			4,
			"坳坴坵坷坹坺坻坼坾垁垃垌垔垗垙垚垜垝垞垟垡垕垧垨垩垬垸垽埇埈埌埏埕埝埞埤埦埧埩埭埰埵埶埸埽埾埿堃堄堈堉埡"
		],
		[
			"8fb8a1",
			"堌堍堛堞堟堠堦堧堭堲堹堿塉塌塍塏塐塕塟塡塤塧塨塸塼塿墀墁墇墈墉墊墌墍墏墐墔墖墝墠墡墢墦墩墱墲壄墼壂壈壍壎壐壒壔壖壚壝壡壢壩壳夅夆夋夌夒夓夔虁夝夡夣夤夨夯夰夳夵夶夿奃奆奒奓奙奛奝奞奟奡奣奫奭"
		],
		[
			"8fb9a1",
			"奯奲奵奶她奻奼妋妌妎妒妕妗妟妤妧妭妮妯妰妳妷妺妼姁姃姄姈姊姍姒姝姞姟姣姤姧姮姯姱姲姴姷娀娄娌娍娎娒娓娞娣娤娧娨娪娭娰婄婅婇婈婌婐婕婞婣婥婧婭婷婺婻婾媋媐媓媖媙媜媞媟媠媢媧媬媱媲媳媵媸媺媻媿"
		],
		[
			"8fbaa1",
			"嫄嫆嫈嫏嫚嫜嫠嫥嫪嫮嫵嫶嫽嬀嬁嬈嬗嬴嬙嬛嬝嬡嬥嬭嬸孁孋孌孒孖孞孨孮孯孼孽孾孿宁宄宆宊宎宐宑宓宔宖宨宩宬宭宯宱宲宷宺宼寀寁寍寏寖",
			4,
			"寠寯寱寴寽尌尗尞尟尣尦尩尫尬尮尰尲尵尶屙屚屜屢屣屧屨屩"
		],
		[
			"8fbba1",
			"屭屰屴屵屺屻屼屽岇岈岊岏岒岝岟岠岢岣岦岪岲岴岵岺峉峋峒峝峗峮峱峲峴崁崆崍崒崫崣崤崦崧崱崴崹崽崿嵂嵃嵆嵈嵕嵑嵙嵊嵟嵠嵡嵢嵤嵪嵭嵰嵹嵺嵾嵿嶁嶃嶈嶊嶒嶓嶔嶕嶙嶛嶟嶠嶧嶫嶰嶴嶸嶹巃巇巋巐巎巘巙巠巤"
		],
		[
			"8fbca1",
			"巩巸巹帀帇帍帒帔帕帘帟帠帮帨帲帵帾幋幐幉幑幖幘幛幜幞幨幪",
			4,
			"幰庀庋庎庢庤庥庨庪庬庱庳庽庾庿廆廌廋廎廑廒廔廕廜廞廥廫异弆弇弈弎弙弜弝弡弢弣弤弨弫弬弮弰弴弶弻弽弿彀彄彅彇彍彐彔彘彛彠彣彤彧"
		],
		[
			"8fbda1",
			"彯彲彴彵彸彺彽彾徉徍徏徖徜徝徢徧徫徤徬徯徰徱徸忄忇忈忉忋忐",
			4,
			"忞忡忢忨忩忪忬忭忮忯忲忳忶忺忼怇怊怍怓怔怗怘怚怟怤怭怳怵恀恇恈恉恌恑恔恖恗恝恡恧恱恾恿悂悆悈悊悎悑悓悕悘悝悞悢悤悥您悰悱悷"
		],
		[
			"8fbea1",
			"悻悾惂惄惈惉惊惋惎惏惔惕惙惛惝惞惢惥惲惵惸惼惽愂愇愊愌愐",
			4,
			"愖愗愙愜愞愢愪愫愰愱愵愶愷愹慁慅慆慉慞慠慬慲慸慻慼慿憀憁憃憄憋憍憒憓憗憘憜憝憟憠憥憨憪憭憸憹憼懀懁懂懎懏懕懜懝懞懟懡懢懧懩懥"
		],
		[
			"8fbfa1",
			"懬懭懯戁戃戄戇戓戕戜戠戢戣戧戩戫戹戽扂扃扄扆扌扐扑扒扔扖扚扜扤扭扯扳扺扽抍抎抏抐抦抨抳抶抷抺抾抿拄拎拕拖拚拪拲拴拼拽挃挄挊挋挍挐挓挖挘挩挪挭挵挶挹挼捁捂捃捄捆捊捋捎捒捓捔捘捛捥捦捬捭捱捴捵"
		],
		[
			"8fc0a1",
			"捸捼捽捿掂掄掇掊掐掔掕掙掚掞掤掦掭掮掯掽揁揅揈揎揑揓揔揕揜揠揥揪揬揲揳揵揸揹搉搊搐搒搔搘搞搠搢搤搥搩搪搯搰搵搽搿摋摏摑摒摓摔摚摛摜摝摟摠摡摣摭摳摴摻摽撅撇撏撐撑撘撙撛撝撟撡撣撦撨撬撳撽撾撿"
		],
		[
			"8fc1a1",
			"擄擉擊擋擌擎擐擑擕擗擤擥擩擪擭擰擵擷擻擿攁攄攈攉攊攏攓攔攖攙攛攞攟攢攦攩攮攱攺攼攽敃敇敉敐敒敔敟敠敧敫敺敽斁斅斊斒斕斘斝斠斣斦斮斲斳斴斿旂旈旉旎旐旔旖旘旟旰旲旴旵旹旾旿昀昄昈昉昍昑昒昕昖昝"
		],
		[
			"8fc2a1",
			"昞昡昢昣昤昦昩昪昫昬昮昰昱昳昹昷晀晅晆晊晌晑晎晗晘晙晛晜晠晡曻晪晫晬晾晳晵晿晷晸晹晻暀晼暋暌暍暐暒暙暚暛暜暟暠暤暭暱暲暵暻暿曀曂曃曈曌曎曏曔曛曟曨曫曬曮曺朅朇朎朓朙朜朠朢朳朾杅杇杈杌杔杕杝"
		],
		[
			"8fc3a1",
			"杦杬杮杴杶杻极构枎枏枑枓枖枘枙枛枰枱枲枵枻枼枽柹柀柂柃柅柈柉柒柗柙柜柡柦柰柲柶柷桒栔栙栝栟栨栧栬栭栯栰栱栳栻栿桄桅桊桌桕桗桘桛桫桮",
			4,
			"桵桹桺桻桼梂梄梆梈梖梘梚梜梡梣梥梩梪梮梲梻棅棈棌棏"
		],
		[
			"8fc4a1",
			"棐棑棓棖棙棜棝棥棨棪棫棬棭棰棱棵棶棻棼棽椆椉椊椐椑椓椖椗椱椳椵椸椻楂楅楉楎楗楛楣楤楥楦楨楩楬楰楱楲楺楻楿榀榍榒榖榘榡榥榦榨榫榭榯榷榸榺榼槅槈槑槖槗槢槥槮槯槱槳槵槾樀樁樃樏樑樕樚樝樠樤樨樰樲"
		],
		[
			"8fc5a1",
			"樴樷樻樾樿橅橆橉橊橎橐橑橒橕橖橛橤橧橪橱橳橾檁檃檆檇檉檋檑檛檝檞檟檥檫檯檰檱檴檽檾檿櫆櫉櫈櫌櫐櫔櫕櫖櫜櫝櫤櫧櫬櫰櫱櫲櫼櫽欂欃欆欇欉欏欐欑欗欛欞欤欨欫欬欯欵欶欻欿歆歊歍歒歖歘歝歠歧歫歮歰歵歽"
		],
		[
			"8fc6a1",
			"歾殂殅殗殛殟殠殢殣殨殩殬殭殮殰殸殹殽殾毃毄毉毌毖毚毡毣毦毧毮毱毷毹毿氂氄氅氉氍氎氐氒氙氟氦氧氨氬氮氳氵氶氺氻氿汊汋汍汏汒汔汙汛汜汫汭汯汴汶汸汹汻沅沆沇沉沔沕沗沘沜沟沰沲沴泂泆泍泏泐泑泒泔泖"
		],
		[
			"8fc7a1",
			"泚泜泠泧泩泫泬泮泲泴洄洇洊洎洏洑洓洚洦洧洨汧洮洯洱洹洼洿浗浞浟浡浥浧浯浰浼涂涇涑涒涔涖涗涘涪涬涴涷涹涽涿淄淈淊淎淏淖淛淝淟淠淢淥淩淯淰淴淶淼渀渄渞渢渧渲渶渹渻渼湄湅湈湉湋湏湑湒湓湔湗湜湝湞"
		],
		[
			"8fc8a1",
			"湢湣湨湳湻湽溍溓溙溠溧溭溮溱溳溻溿滀滁滃滇滈滊滍滎滏滫滭滮滹滻滽漄漈漊漌漍漖漘漚漛漦漩漪漯漰漳漶漻漼漭潏潑潒潓潗潙潚潝潞潡潢潨潬潽潾澃澇澈澋澌澍澐澒澓澔澖澚澟澠澥澦澧澨澮澯澰澵澶澼濅濇濈濊"
		],
		[
			"8fc9a1",
			"濚濞濨濩濰濵濹濼濽瀀瀅瀆瀇瀍瀗瀠瀣瀯瀴瀷瀹瀼灃灄灈灉灊灋灔灕灝灞灎灤灥灬灮灵灶灾炁炅炆炔",
			4,
			"炛炤炫炰炱炴炷烊烑烓烔烕烖烘烜烤烺焃",
			4,
			"焋焌焏焞焠焫焭焯焰焱焸煁煅煆煇煊煋煐煒煗煚煜煞煠"
		],
		[
			"8fcaa1",
			"煨煹熀熅熇熌熒熚熛熠熢熯熰熲熳熺熿燀燁燄燋燌燓燖燙燚燜燸燾爀爇爈爉爓爗爚爝爟爤爫爯爴爸爹牁牂牃牅牎牏牐牓牕牖牚牜牞牠牣牨牫牮牯牱牷牸牻牼牿犄犉犍犎犓犛犨犭犮犱犴犾狁狇狉狌狕狖狘狟狥狳狴狺狻"
		],
		[
			"8fcba1",
			"狾猂猄猅猇猋猍猒猓猘猙猞猢猤猧猨猬猱猲猵猺猻猽獃獍獐獒獖獘獝獞獟獠獦獧獩獫獬獮獯獱獷獹獼玀玁玃玅玆玎玐玓玕玗玘玜玞玟玠玢玥玦玪玫玭玵玷玹玼玽玿珅珆珉珋珌珏珒珓珖珙珝珡珣珦珧珩珴珵珷珹珺珻珽"
		],
		[
			"8fcca1",
			"珿琀琁琄琇琊琑琚琛琤琦琨",
			9,
			"琹瑀瑃瑄瑆瑇瑋瑍瑑瑒瑗瑝瑢瑦瑧瑨瑫瑭瑮瑱瑲璀璁璅璆璇璉璏璐璑璒璘璙璚璜璟璠璡璣璦璨璩璪璫璮璯璱璲璵璹璻璿瓈瓉瓌瓐瓓瓘瓚瓛瓞瓟瓤瓨瓪瓫瓯瓴瓺瓻瓼瓿甆"
		],
		[
			"8fcda1",
			"甒甖甗甠甡甤甧甩甪甯甶甹甽甾甿畀畃畇畈畎畐畒畗畞畟畡畯畱畹",
			5,
			"疁疅疐疒疓疕疙疜疢疤疴疺疿痀痁痄痆痌痎痏痗痜痟痠痡痤痧痬痮痯痱痹瘀瘂瘃瘄瘇瘈瘊瘌瘏瘒瘓瘕瘖瘙瘛瘜瘝瘞瘣瘥瘦瘩瘭瘲瘳瘵瘸瘹"
		],
		[
			"8fcea1",
			"瘺瘼癊癀癁癃癄癅癉癋癕癙癟癤癥癭癮癯癱癴皁皅皌皍皕皛皜皝皟皠皢",
			6,
			"皪皭皽盁盅盉盋盌盎盔盙盠盦盨盬盰盱盶盹盼眀眆眊眎眒眔眕眗眙眚眜眢眨眭眮眯眴眵眶眹眽眾睂睅睆睊睍睎睏睒睖睗睜睞睟睠睢"
		],
		[
			"8fcfa1",
			"睤睧睪睬睰睲睳睴睺睽瞀瞄瞌瞍瞔瞕瞖瞚瞟瞢瞧瞪瞮瞯瞱瞵瞾矃矉矑矒矕矙矞矟矠矤矦矪矬矰矱矴矸矻砅砆砉砍砎砑砝砡砢砣砭砮砰砵砷硃硄硇硈硌硎硒硜硞硠硡硣硤硨硪确硺硾碊碏碔碘碡碝碞碟碤碨碬碭碰碱碲碳"
		],
		[
			"8fd0a1",
			"碻碽碿磇磈磉磌磎磒磓磕磖磤磛磟磠磡磦磪磲磳礀磶磷磺磻磿礆礌礐礚礜礞礟礠礥礧礩礭礱礴礵礻礽礿祄祅祆祊祋祏祑祔祘祛祜祧祩祫祲祹祻祼祾禋禌禑禓禔禕禖禘禛禜禡禨禩禫禯禱禴禸离秂秄秇秈秊秏秔秖秚秝秞"
		],
		[
			"8fd1a1",
			"秠秢秥秪秫秭秱秸秼稂稃稇稉稊稌稑稕稛稞稡稧稫稭稯稰稴稵稸稹稺穄穅穇穈穌穕穖穙穜穝穟穠穥穧穪穭穵穸穾窀窂窅窆窊窋窐窑窔窞窠窣窬窳窵窹窻窼竆竉竌竎竑竛竨竩竫竬竱竴竻竽竾笇笔笟笣笧笩笪笫笭笮笯笰"
		],
		[
			"8fd2a1",
			"笱笴笽笿筀筁筇筎筕筠筤筦筩筪筭筯筲筳筷箄箉箎箐箑箖箛箞箠箥箬箯箰箲箵箶箺箻箼箽篂篅篈篊篔篖篗篙篚篛篨篪篲篴篵篸篹篺篼篾簁簂簃簄簆簉簋簌簎簏簙簛簠簥簦簨簬簱簳簴簶簹簺籆籊籕籑籒籓籙",
			5
		],
		[
			"8fd3a1",
			"籡籣籧籩籭籮籰籲籹籼籽粆粇粏粔粞粠粦粰粶粷粺粻粼粿糄糇糈糉糍糏糓糔糕糗糙糚糝糦糩糫糵紃紇紈紉紏紑紒紓紖紝紞紣紦紪紭紱紼紽紾絀絁絇絈絍絑絓絗絙絚絜絝絥絧絪絰絸絺絻絿綁綂綃綅綆綈綋綌綍綑綖綗綝"
		],
		[
			"8fd4a1",
			"綞綦綧綪綳綶綷綹緂",
			4,
			"緌緍緎緗緙縀緢緥緦緪緫緭緱緵緶緹緺縈縐縑縕縗縜縝縠縧縨縬縭縯縳縶縿繄繅繇繎繐繒繘繟繡繢繥繫繮繯繳繸繾纁纆纇纊纍纑纕纘纚纝纞缼缻缽缾缿罃罄罇罏罒罓罛罜罝罡罣罤罥罦罭"
		],
		[
			"8fd5a1",
			"罱罽罾罿羀羋羍羏羐羑羖羗羜羡羢羦羪羭羴羼羿翀翃翈翎翏翛翟翣翥翨翬翮翯翲翺翽翾翿耇耈耊耍耎耏耑耓耔耖耝耞耟耠耤耦耬耮耰耴耵耷耹耺耼耾聀聄聠聤聦聭聱聵肁肈肎肜肞肦肧肫肸肹胈胍胏胒胔胕胗胘胠胭胮"
		],
		[
			"8fd6a1",
			"胰胲胳胶胹胺胾脃脋脖脗脘脜脞脠脤脧脬脰脵脺脼腅腇腊腌腒腗腠腡腧腨腩腭腯腷膁膐膄膅膆膋膎膖膘膛膞膢膮膲膴膻臋臃臅臊臎臏臕臗臛臝臞臡臤臫臬臰臱臲臵臶臸臹臽臿舀舃舏舓舔舙舚舝舡舢舨舲舴舺艃艄艅艆"
		],
		[
			"8fd7a1",
			"艋艎艏艑艖艜艠艣艧艭艴艻艽艿芀芁芃芄芇芉芊芎芑芔芖芘芚芛芠芡芣芤芧芨芩芪芮芰芲芴芷芺芼芾芿苆苐苕苚苠苢苤苨苪苭苯苶苷苽苾茀茁茇茈茊茋荔茛茝茞茟茡茢茬茭茮茰茳茷茺茼茽荂荃荄荇荍荎荑荕荖荗荰荸"
		],
		[
			"8fd8a1",
			"荽荿莀莂莄莆莍莒莔莕莘莙莛莜莝莦莧莩莬莾莿菀菇菉菏菐菑菔菝荓菨菪菶菸菹菼萁萆萊萏萑萕萙莭萯萹葅葇葈葊葍葏葑葒葖葘葙葚葜葠葤葥葧葪葰葳葴葶葸葼葽蒁蒅蒒蒓蒕蒞蒦蒨蒩蒪蒯蒱蒴蒺蒽蒾蓀蓂蓇蓈蓌蓏蓓"
		],
		[
			"8fd9a1",
			"蓜蓧蓪蓯蓰蓱蓲蓷蔲蓺蓻蓽蔂蔃蔇蔌蔎蔐蔜蔞蔢蔣蔤蔥蔧蔪蔫蔯蔳蔴蔶蔿蕆蕏",
			4,
			"蕖蕙蕜",
			6,
			"蕤蕫蕯蕹蕺蕻蕽蕿薁薅薆薉薋薌薏薓薘薝薟薠薢薥薧薴薶薷薸薼薽薾薿藂藇藊藋藎薭藘藚藟藠藦藨藭藳藶藼"
		],
		[
			"8fdaa1",
			"藿蘀蘄蘅蘍蘎蘐蘑蘒蘘蘙蘛蘞蘡蘧蘩蘶蘸蘺蘼蘽虀虂虆虒虓虖虗虘虙虝虠",
			4,
			"虩虬虯虵虶虷虺蚍蚑蚖蚘蚚蚜蚡蚦蚧蚨蚭蚱蚳蚴蚵蚷蚸蚹蚿蛀蛁蛃蛅蛑蛒蛕蛗蛚蛜蛠蛣蛥蛧蚈蛺蛼蛽蜄蜅蜇蜋蜎蜏蜐蜓蜔蜙蜞蜟蜡蜣"
		],
		[
			"8fdba1",
			"蜨蜮蜯蜱蜲蜹蜺蜼蜽蜾蝀蝃蝅蝍蝘蝝蝡蝤蝥蝯蝱蝲蝻螃",
			6,
			"螋螌螐螓螕螗螘螙螞螠螣螧螬螭螮螱螵螾螿蟁蟈蟉蟊蟎蟕蟖蟙蟚蟜蟟蟢蟣蟤蟪蟫蟭蟱蟳蟸蟺蟿蠁蠃蠆蠉蠊蠋蠐蠙蠒蠓蠔蠘蠚蠛蠜蠞蠟蠨蠭蠮蠰蠲蠵"
		],
		[
			"8fdca1",
			"蠺蠼衁衃衅衈衉衊衋衎衑衕衖衘衚衜衟衠衤衩衱衹衻袀袘袚袛袜袟袠袨袪袺袽袾裀裊",
			4,
			"裑裒裓裛裞裧裯裰裱裵裷褁褆褍褎褏褕褖褘褙褚褜褠褦褧褨褰褱褲褵褹褺褾襀襂襅襆襉襏襒襗襚襛襜襡襢襣襫襮襰襳襵襺"
		],
		[
			"8fdda1",
			"襻襼襽覉覍覐覔覕覛覜覟覠覥覰覴覵覶覷覼觔",
			4,
			"觥觩觫觭觱觳觶觹觽觿訄訅訇訏訑訒訔訕訞訠訢訤訦訫訬訯訵訷訽訾詀詃詅詇詉詍詎詓詖詗詘詜詝詡詥詧詵詶詷詹詺詻詾詿誀誃誆誋誏誐誒誖誗誙誟誧誩誮誯誳"
		],
		[
			"8fdea1",
			"誶誷誻誾諃諆諈諉諊諑諓諔諕諗諝諟諬諰諴諵諶諼諿謅謆謋謑謜謞謟謊謭謰謷謼譂",
			4,
			"譈譒譓譔譙譍譞譣譭譶譸譹譼譾讁讄讅讋讍讏讔讕讜讞讟谸谹谽谾豅豇豉豋豏豑豓豔豗豘豛豝豙豣豤豦豨豩豭豳豵豶豻豾貆"
		],
		[
			"8fdfa1",
			"貇貋貐貒貓貙貛貜貤貹貺賅賆賉賋賏賖賕賙賝賡賨賬賯賰賲賵賷賸賾賿贁贃贉贒贗贛赥赩赬赮赿趂趄趈趍趐趑趕趞趟趠趦趫趬趯趲趵趷趹趻跀跅跆跇跈跊跎跑跔跕跗跙跤跥跧跬跰趼跱跲跴跽踁踄踅踆踋踑踔踖踠踡踢"
		],
		[
			"8fe0a1",
			"踣踦踧踱踳踶踷踸踹踽蹀蹁蹋蹍蹎蹏蹔蹛蹜蹝蹞蹡蹢蹩蹬蹭蹯蹰蹱蹹蹺蹻躂躃躉躐躒躕躚躛躝躞躢躧躩躭躮躳躵躺躻軀軁軃軄軇軏軑軔軜軨軮軰軱軷軹軺軭輀輂輇輈輏輐輖輗輘輞輠輡輣輥輧輨輬輭輮輴輵輶輷輺轀轁"
		],
		[
			"8fe1a1",
			"轃轇轏轑",
			4,
			"轘轝轞轥辝辠辡辤辥辦辵辶辸达迀迁迆迊迋迍运迒迓迕迠迣迤迨迮迱迵迶迻迾适逄逈逌逘逛逨逩逯逪逬逭逳逴逷逿遃遄遌遛遝遢遦遧遬遰遴遹邅邈邋邌邎邐邕邗邘邙邛邠邡邢邥邰邲邳邴邶邽郌邾郃"
		],
		[
			"8fe2a1",
			"郄郅郇郈郕郗郘郙郜郝郟郥郒郶郫郯郰郴郾郿鄀鄄鄅鄆鄈鄍鄐鄔鄖鄗鄘鄚鄜鄞鄠鄥鄢鄣鄧鄩鄮鄯鄱鄴鄶鄷鄹鄺鄼鄽酃酇酈酏酓酗酙酚酛酡酤酧酭酴酹酺酻醁醃醅醆醊醎醑醓醔醕醘醞醡醦醨醬醭醮醰醱醲醳醶醻醼醽醿"
		],
		[
			"8fe3a1",
			"釂釃釅釓釔釗釙釚釞釤釥釩釪釬",
			5,
			"釷釹釻釽鈀鈁鈄鈅鈆鈇鈉鈊鈌鈐鈒鈓鈖鈘鈜鈝鈣鈤鈥鈦鈨鈮鈯鈰鈳鈵鈶鈸鈹鈺鈼鈾鉀鉂鉃鉆鉇鉊鉍鉎鉏鉑鉘鉙鉜鉝鉠鉡鉥鉧鉨鉩鉮鉯鉰鉵",
			4,
			"鉻鉼鉽鉿銈銉銊銍銎銒銗"
		],
		[
			"8fe4a1",
			"銙銟銠銤銥銧銨銫銯銲銶銸銺銻銼銽銿",
			4,
			"鋅鋆鋇鋈鋋鋌鋍鋎鋐鋓鋕鋗鋘鋙鋜鋝鋟鋠鋡鋣鋥鋧鋨鋬鋮鋰鋹鋻鋿錀錂錈錍錑錔錕錜錝錞錟錡錤錥錧錩錪錳錴錶錷鍇鍈鍉鍐鍑鍒鍕鍗鍘鍚鍞鍤鍥鍧鍩鍪鍭鍯鍰鍱鍳鍴鍶"
		],
		[
			"8fe5a1",
			"鍺鍽鍿鎀鎁鎂鎈鎊鎋鎍鎏鎒鎕鎘鎛鎞鎡鎣鎤鎦鎨鎫鎴鎵鎶鎺鎩鏁鏄鏅鏆鏇鏉",
			4,
			"鏓鏙鏜鏞鏟鏢鏦鏧鏹鏷鏸鏺鏻鏽鐁鐂鐄鐈鐉鐍鐎鐏鐕鐖鐗鐟鐮鐯鐱鐲鐳鐴鐻鐿鐽鑃鑅鑈鑊鑌鑕鑙鑜鑟鑡鑣鑨鑫鑭鑮鑯鑱鑲钄钃镸镹"
		],
		[
			"8fe6a1",
			"镾閄閈閌閍閎閝閞閟閡閦閩閫閬閴閶閺閽閿闆闈闉闋闐闑闒闓闙闚闝闞闟闠闤闦阝阞阢阤阥阦阬阱阳阷阸阹阺阼阽陁陒陔陖陗陘陡陮陴陻陼陾陿隁隂隃隄隉隑隖隚隝隟隤隥隦隩隮隯隳隺雊雒嶲雘雚雝雞雟雩雯雱雺霂"
		],
		[
			"8fe7a1",
			"霃霅霉霚霛霝霡霢霣霨霱霳靁靃靊靎靏靕靗靘靚靛靣靧靪靮靳靶靷靸靻靽靿鞀鞉鞕鞖鞗鞙鞚鞞鞟鞢鞬鞮鞱鞲鞵鞶鞸鞹鞺鞼鞾鞿韁韄韅韇韉韊韌韍韎韐韑韔韗韘韙韝韞韠韛韡韤韯韱韴韷韸韺頇頊頙頍頎頔頖頜頞頠頣頦"
		],
		[
			"8fe8a1",
			"頫頮頯頰頲頳頵頥頾顄顇顊顑顒顓顖顗顙顚顢顣顥顦顪顬颫颭颮颰颴颷颸颺颻颿飂飅飈飌飡飣飥飦飧飪飳飶餂餇餈餑餕餖餗餚餛餜餟餢餦餧餫餱",
			4,
			"餹餺餻餼饀饁饆饇饈饍饎饔饘饙饛饜饞饟饠馛馝馟馦馰馱馲馵"
		],
		[
			"8fe9a1",
			"馹馺馽馿駃駉駓駔駙駚駜駞駧駪駫駬駰駴駵駹駽駾騂騃騄騋騌騐騑騖騞騠騢騣騤騧騭騮騳騵騶騸驇驁驄驊驋驌驎驑驔驖驝骪骬骮骯骲骴骵骶骹骻骾骿髁髃髆髈髎髐髒髕髖髗髛髜髠髤髥髧髩髬髲髳髵髹髺髽髿",
			4
		],
		[
			"8feaa1",
			"鬄鬅鬈鬉鬋鬌鬍鬎鬐鬒鬖鬙鬛鬜鬠鬦鬫鬭鬳鬴鬵鬷鬹鬺鬽魈魋魌魕魖魗魛魞魡魣魥魦魨魪",
			4,
			"魳魵魷魸魹魿鮀鮄鮅鮆鮇鮉鮊鮋鮍鮏鮐鮔鮚鮝鮞鮦鮧鮩鮬鮰鮱鮲鮷鮸鮻鮼鮾鮿鯁鯇鯈鯎鯐鯗鯘鯝鯟鯥鯧鯪鯫鯯鯳鯷鯸"
		],
		[
			"8feba1",
			"鯹鯺鯽鯿鰀鰂鰋鰏鰑鰖鰘鰙鰚鰜鰞鰢鰣鰦",
			4,
			"鰱鰵鰶鰷鰽鱁鱃鱄鱅鱉鱊鱎鱏鱐鱓鱔鱖鱘鱛鱝鱞鱟鱣鱩鱪鱜鱫鱨鱮鱰鱲鱵鱷鱻鳦鳲鳷鳹鴋鴂鴑鴗鴘鴜鴝鴞鴯鴰鴲鴳鴴鴺鴼鵅鴽鵂鵃鵇鵊鵓鵔鵟鵣鵢鵥鵩鵪鵫鵰鵶鵷鵻"
		],
		[
			"8feca1",
			"鵼鵾鶃鶄鶆鶊鶍鶎鶒鶓鶕鶖鶗鶘鶡鶪鶬鶮鶱鶵鶹鶼鶿鷃鷇鷉鷊鷔鷕鷖鷗鷚鷞鷟鷠鷥鷧鷩鷫鷮鷰鷳鷴鷾鸊鸂鸇鸎鸐鸑鸒鸕鸖鸙鸜鸝鹺鹻鹼麀麂麃麄麅麇麎麏麖麘麛麞麤麨麬麮麯麰麳麴麵黆黈黋黕黟黤黧黬黭黮黰黱黲黵"
		],
		[
			"8feda1",
			"黸黿鼂鼃鼉鼏鼐鼑鼒鼔鼖鼗鼙鼚鼛鼟鼢鼦鼪鼫鼯鼱鼲鼴鼷鼹鼺鼼鼽鼿齁齃",
			4,
			"齓齕齖齗齘齚齝齞齨齩齭",
			4,
			"齳齵齺齽龏龐龑龒龔龖龗龞龡龢龣龥"
		]
	];

/***/ },
/* 125 */
/***/ function(module, exports) {

	module.exports = [
		[
			"0",
			"\u0000",
			127,
			"€"
		],
		[
			"8140",
			"丂丄丅丆丏丒丗丟丠両丣並丩丮丯丱丳丵丷丼乀乁乂乄乆乊乑乕乗乚乛乢乣乤乥乧乨乪",
			5,
			"乲乴",
			9,
			"乿",
			6,
			"亇亊"
		],
		[
			"8180",
			"亐亖亗亙亜亝亞亣亪亯亰亱亴亶亷亸亹亼亽亾仈仌仏仐仒仚仛仜仠仢仦仧仩仭仮仯仱仴仸仹仺仼仾伀伂",
			6,
			"伋伌伒",
			4,
			"伜伝伡伣伨伩伬伭伮伱伳伵伷伹伻伾",
			4,
			"佄佅佇",
			5,
			"佒佔佖佡佢佦佨佪佫佭佮佱佲併佷佸佹佺佽侀侁侂侅來侇侊侌侎侐侒侓侕侖侘侙侚侜侞侟価侢"
		],
		[
			"8240",
			"侤侫侭侰",
			4,
			"侶",
			8,
			"俀俁係俆俇俈俉俋俌俍俒",
			4,
			"俙俛俠俢俤俥俧俫俬俰俲俴俵俶俷俹俻俼俽俿",
			11
		],
		[
			"8280",
			"個倎倐們倓倕倖倗倛倝倞倠倢倣値倧倫倯",
			10,
			"倻倽倿偀偁偂偄偅偆偉偊偋偍偐",
			4,
			"偖偗偘偙偛偝",
			7,
			"偦",
			5,
			"偭",
			8,
			"偸偹偺偼偽傁傂傃傄傆傇傉傊傋傌傎",
			20,
			"傤傦傪傫傭",
			4,
			"傳",
			6,
			"傼"
		],
		[
			"8340",
			"傽",
			17,
			"僐",
			5,
			"僗僘僙僛",
			10,
			"僨僩僪僫僯僰僱僲僴僶",
			4,
			"僼",
			9,
			"儈"
		],
		[
			"8380",
			"儉儊儌",
			5,
			"儓",
			13,
			"儢",
			28,
			"兂兇兊兌兎兏児兒兓兗兘兙兛兝",
			4,
			"兣兤兦內兩兪兯兲兺兾兿冃冄円冇冊冋冎冏冐冑冓冔冘冚冝冞冟冡冣冦",
			4,
			"冭冮冴冸冹冺冾冿凁凂凃凅凈凊凍凎凐凒",
			5
		],
		[
			"8440",
			"凘凙凚凜凞凟凢凣凥",
			5,
			"凬凮凱凲凴凷凾刄刅刉刋刌刏刐刓刔刕刜刞刟刡刢刣別刦刧刪刬刯刱刲刴刵刼刾剄",
			5,
			"剋剎剏剒剓剕剗剘"
		],
		[
			"8480",
			"剙剚剛剝剟剠剢剣剤剦剨剫剬剭剮剰剱剳",
			9,
			"剾劀劃",
			4,
			"劉",
			6,
			"劑劒劔",
			6,
			"劜劤劥劦劧劮劯劰労",
			9,
			"勀勁勂勄勅勆勈勊勌勍勎勏勑勓勔動勗務",
			5,
			"勠勡勢勣勥",
			10,
			"勱",
			7,
			"勻勼勽匁匂匃匄匇匉匊匋匌匎"
		],
		[
			"8540",
			"匑匒匓匔匘匛匜匞匟匢匤匥匧匨匩匫匬匭匯",
			9,
			"匼匽區卂卄卆卋卌卍卐協単卙卛卝卥卨卪卬卭卲卶卹卻卼卽卾厀厁厃厇厈厊厎厏"
		],
		[
			"8580",
			"厐",
			4,
			"厖厗厙厛厜厞厠厡厤厧厪厫厬厭厯",
			6,
			"厷厸厹厺厼厽厾叀參",
			4,
			"収叏叐叒叓叕叚叜叝叞叡叢叧叴叺叾叿吀吂吅吇吋吔吘吙吚吜吢吤吥吪吰吳吶吷吺吽吿呁呂呄呅呇呉呌呍呎呏呑呚呝",
			4,
			"呣呥呧呩",
			7,
			"呴呹呺呾呿咁咃咅咇咈咉咊咍咑咓咗咘咜咞咟咠咡"
		],
		[
			"8640",
			"咢咥咮咰咲咵咶咷咹咺咼咾哃哅哊哋哖哘哛哠",
			4,
			"哫哬哯哰哱哴",
			5,
			"哻哾唀唂唃唄唅唈唊",
			4,
			"唒唓唕",
			5,
			"唜唝唞唟唡唥唦"
		],
		[
			"8680",
			"唨唩唫唭唲唴唵唶唸唹唺唻唽啀啂啅啇啈啋",
			4,
			"啑啒啓啔啗",
			4,
			"啝啞啟啠啢啣啨啩啫啯",
			5,
			"啹啺啽啿喅喆喌喍喎喐喒喓喕喖喗喚喛喞喠",
			6,
			"喨",
			8,
			"喲喴営喸喺喼喿",
			4,
			"嗆嗇嗈嗊嗋嗎嗏嗐嗕嗗",
			4,
			"嗞嗠嗢嗧嗩嗭嗮嗰嗱嗴嗶嗸",
			4,
			"嗿嘂嘃嘄嘅"
		],
		[
			"8740",
			"嘆嘇嘊嘋嘍嘐",
			7,
			"嘙嘚嘜嘝嘠嘡嘢嘥嘦嘨嘩嘪嘫嘮嘯嘰嘳嘵嘷嘸嘺嘼嘽嘾噀",
			11,
			"噏",
			4,
			"噕噖噚噛噝",
			4
		],
		[
			"8780",
			"噣噥噦噧噭噮噯噰噲噳噴噵噷噸噹噺噽",
			7,
			"嚇",
			6,
			"嚐嚑嚒嚔",
			14,
			"嚤",
			10,
			"嚰",
			6,
			"嚸嚹嚺嚻嚽",
			12,
			"囋",
			8,
			"囕囖囘囙囜団囥",
			5,
			"囬囮囯囲図囶囷囸囻囼圀圁圂圅圇國",
			6
		],
		[
			"8840",
			"園",
			9,
			"圝圞圠圡圢圤圥圦圧圫圱圲圴",
			4,
			"圼圽圿坁坃坄坅坆坈坉坋坒",
			4,
			"坘坙坢坣坥坧坬坮坰坱坲坴坵坸坹坺坽坾坿垀"
		],
		[
			"8880",
			"垁垇垈垉垊垍",
			4,
			"垔",
			6,
			"垜垝垞垟垥垨垪垬垯垰垱垳垵垶垷垹",
			8,
			"埄",
			6,
			"埌埍埐埑埓埖埗埛埜埞埡埢埣埥",
			7,
			"埮埰埱埲埳埵埶執埻埼埾埿堁堃堄堅堈堉堊堌堎堏堐堒堓堔堖堗堘堚堛堜堝堟堢堣堥",
			4,
			"堫",
			4,
			"報堲堳場堶",
			7
		],
		[
			"8940",
			"堾",
			5,
			"塅",
			6,
			"塎塏塐塒塓塕塖塗塙",
			4,
			"塟",
			5,
			"塦",
			4,
			"塭",
			16,
			"塿墂墄墆墇墈墊墋墌"
		],
		[
			"8980",
			"墍",
			4,
			"墔",
			4,
			"墛墜墝墠",
			7,
			"墪",
			17,
			"墽墾墿壀壂壃壄壆",
			10,
			"壒壓壔壖",
			13,
			"壥",
			5,
			"壭壯壱売壴壵壷壸壺",
			7,
			"夃夅夆夈",
			4,
			"夎夐夑夒夓夗夘夛夝夞夠夡夢夣夦夨夬夰夲夳夵夶夻"
		],
		[
			"8a40",
			"夽夾夿奀奃奅奆奊奌奍奐奒奓奙奛",
			4,
			"奡奣奤奦",
			12,
			"奵奷奺奻奼奾奿妀妅妉妋妌妎妏妐妑妔妕妘妚妛妜妝妟妠妡妢妦"
		],
		[
			"8a80",
			"妧妬妭妰妱妳",
			5,
			"妺妼妽妿",
			6,
			"姇姈姉姌姍姎姏姕姖姙姛姞",
			4,
			"姤姦姧姩姪姫姭",
			11,
			"姺姼姽姾娀娂娊娋娍娎娏娐娒娔娕娖娗娙娚娛娝娞娡娢娤娦娧娨娪",
			6,
			"娳娵娷",
			4,
			"娽娾娿婁",
			4,
			"婇婈婋",
			9,
			"婖婗婘婙婛",
			5
		],
		[
			"8b40",
			"婡婣婤婥婦婨婩婫",
			8,
			"婸婹婻婼婽婾媀",
			17,
			"媓",
			6,
			"媜",
			13,
			"媫媬"
		],
		[
			"8b80",
			"媭",
			4,
			"媴媶媷媹",
			4,
			"媿嫀嫃",
			5,
			"嫊嫋嫍",
			4,
			"嫓嫕嫗嫙嫚嫛嫝嫞嫟嫢嫤嫥嫧嫨嫪嫬",
			4,
			"嫲",
			22,
			"嬊",
			11,
			"嬘",
			25,
			"嬳嬵嬶嬸",
			7,
			"孁",
			6
		],
		[
			"8c40",
			"孈",
			7,
			"孒孖孞孠孡孧孨孫孭孮孯孲孴孶孷學孹孻孼孾孿宂宆宊宍宎宐宑宒宔宖実宧宨宩宬宭宮宯宱宲宷宺宻宼寀寁寃寈寉寊寋寍寎寏"
		],
		[
			"8c80",
			"寑寔",
			8,
			"寠寢寣實寧審",
			4,
			"寯寱",
			6,
			"寽対尀専尃尅將專尋尌對導尐尒尓尗尙尛尞尟尠尡尣尦尨尩尪尫尭尮尯尰尲尳尵尶尷屃屄屆屇屌屍屒屓屔屖屗屘屚屛屜屝屟屢層屧",
			6,
			"屰屲",
			6,
			"屻屼屽屾岀岃",
			4,
			"岉岊岋岎岏岒岓岕岝",
			4,
			"岤",
			4
		],
		[
			"8d40",
			"岪岮岯岰岲岴岶岹岺岻岼岾峀峂峃峅",
			5,
			"峌",
			5,
			"峓",
			5,
			"峚",
			6,
			"峢峣峧峩峫峬峮峯峱",
			9,
			"峼",
			4
		],
		[
			"8d80",
			"崁崄崅崈",
			5,
			"崏",
			4,
			"崕崗崘崙崚崜崝崟",
			4,
			"崥崨崪崫崬崯",
			4,
			"崵",
			7,
			"崿",
			7,
			"嵈嵉嵍",
			10,
			"嵙嵚嵜嵞",
			10,
			"嵪嵭嵮嵰嵱嵲嵳嵵",
			12,
			"嶃",
			21,
			"嶚嶛嶜嶞嶟嶠"
		],
		[
			"8e40",
			"嶡",
			21,
			"嶸",
			12,
			"巆",
			6,
			"巎",
			12,
			"巜巟巠巣巤巪巬巭"
		],
		[
			"8e80",
			"巰巵巶巸",
			4,
			"巿帀帄帇帉帊帋帍帎帒帓帗帞",
			7,
			"帨",
			4,
			"帯帰帲",
			4,
			"帹帺帾帿幀幁幃幆",
			5,
			"幍",
			6,
			"幖",
			4,
			"幜幝幟幠幣",
			14,
			"幵幷幹幾庁庂広庅庈庉庌庍庎庒庘庛庝庡庢庣庤庨",
			4,
			"庮",
			4,
			"庴庺庻庼庽庿",
			6
		],
		[
			"8f40",
			"廆廇廈廋",
			5,
			"廔廕廗廘廙廚廜",
			11,
			"廩廫",
			8,
			"廵廸廹廻廼廽弅弆弇弉弌弍弎弐弒弔弖弙弚弜弝弞弡弢弣弤"
		],
		[
			"8f80",
			"弨弫弬弮弰弲",
			6,
			"弻弽弾弿彁",
			14,
			"彑彔彙彚彛彜彞彟彠彣彥彧彨彫彮彯彲彴彵彶彸彺彽彾彿徃徆徍徎徏徑従徔徖徚徛徝從徟徠徢",
			5,
			"復徫徬徯",
			5,
			"徶徸徹徺徻徾",
			4,
			"忇忈忊忋忎忓忔忕忚忛応忞忟忢忣忥忦忨忩忬忯忰忲忳忴忶忷忹忺忼怇"
		],
		[
			"9040",
			"怈怉怋怌怐怑怓怗怘怚怞怟怢怣怤怬怭怮怰",
			4,
			"怶",
			4,
			"怽怾恀恄",
			6,
			"恌恎恏恑恓恔恖恗恘恛恜恞恟恠恡恥恦恮恱恲恴恵恷恾悀"
		],
		[
			"9080",
			"悁悂悅悆悇悈悊悋悎悏悐悑悓悕悗悘悙悜悞悡悢悤悥悧悩悪悮悰悳悵悶悷悹悺悽",
			7,
			"惇惈惉惌",
			4,
			"惒惓惔惖惗惙惛惞惡",
			4,
			"惪惱惲惵惷惸惻",
			4,
			"愂愃愄愅愇愊愋愌愐",
			4,
			"愖愗愘愙愛愜愝愞愡愢愥愨愩愪愬",
			18,
			"慀",
			6
		],
		[
			"9140",
			"慇慉態慍慏慐慒慓慔慖",
			6,
			"慞慟慠慡慣慤慥慦慩",
			6,
			"慱慲慳慴慶慸",
			18,
			"憌憍憏",
			4,
			"憕"
		],
		[
			"9180",
			"憖",
			6,
			"憞",
			8,
			"憪憫憭",
			9,
			"憸",
			5,
			"憿懀懁懃",
			4,
			"應懌",
			4,
			"懓懕",
			16,
			"懧",
			13,
			"懶",
			8,
			"戀",
			5,
			"戇戉戓戔戙戜戝戞戠戣戦戧戨戩戫戭戯戰戱戲戵戶戸",
			4,
			"扂扄扅扆扊"
		],
		[
			"9240",
			"扏扐払扖扗扙扚扜",
			6,
			"扤扥扨扱扲扴扵扷扸扺扻扽抁抂抃抅抆抇抈抋",
			5,
			"抔抙抜抝択抣抦抧抩抪抭抮抯抰抲抳抴抶抷抸抺抾拀拁"
		],
		[
			"9280",
			"拃拋拏拑拕拝拞拠拡拤拪拫拰拲拵拸拹拺拻挀挃挄挅挆挊挋挌挍挏挐挒挓挔挕挗挘挙挜挦挧挩挬挭挮挰挱挳",
			5,
			"挻挼挾挿捀捁捄捇捈捊捑捒捓捔捖",
			7,
			"捠捤捥捦捨捪捫捬捯捰捲捳捴捵捸捹捼捽捾捿掁掃掄掅掆掋掍掑掓掔掕掗掙",
			6,
			"採掤掦掫掯掱掲掵掶掹掻掽掿揀"
		],
		[
			"9340",
			"揁揂揃揅揇揈揊揋揌揑揓揔揕揗",
			6,
			"揟揢揤",
			4,
			"揫揬揮揯揰揱揳揵揷揹揺揻揼揾搃搄搆",
			4,
			"損搎搑搒搕",
			5,
			"搝搟搢搣搤"
		],
		[
			"9380",
			"搥搧搨搩搫搮",
			5,
			"搵",
			4,
			"搻搼搾摀摂摃摉摋",
			6,
			"摓摕摖摗摙",
			4,
			"摟",
			7,
			"摨摪摫摬摮",
			9,
			"摻",
			6,
			"撃撆撈",
			8,
			"撓撔撗撘撚撛撜撝撟",
			4,
			"撥撦撧撨撪撫撯撱撲撳撴撶撹撻撽撾撿擁擃擄擆",
			6,
			"擏擑擓擔擕擖擙據"
		],
		[
			"9440",
			"擛擜擝擟擠擡擣擥擧",
			24,
			"攁",
			7,
			"攊",
			7,
			"攓",
			4,
			"攙",
			8
		],
		[
			"9480",
			"攢攣攤攦",
			4,
			"攬攭攰攱攲攳攷攺攼攽敀",
			4,
			"敆敇敊敋敍敎敐敒敓敔敗敘敚敜敟敠敡敤敥敧敨敩敪敭敮敯敱敳敵敶數",
			14,
			"斈斉斊斍斎斏斒斔斕斖斘斚斝斞斠斢斣斦斨斪斬斮斱",
			7,
			"斺斻斾斿旀旂旇旈旉旊旍旐旑旓旔旕旘",
			7,
			"旡旣旤旪旫"
		],
		[
			"9540",
			"旲旳旴旵旸旹旻",
			4,
			"昁昄昅昇昈昉昋昍昐昑昒昖昗昘昚昛昜昞昡昢昣昤昦昩昪昫昬昮昰昲昳昷",
			4,
			"昽昿晀時晄",
			6,
			"晍晎晐晑晘"
		],
		[
			"9580",
			"晙晛晜晝晞晠晢晣晥晧晩",
			4,
			"晱晲晳晵晸晹晻晼晽晿暀暁暃暅暆暈暉暊暋暍暎暏暐暒暓暔暕暘",
			4,
			"暞",
			8,
			"暩",
			4,
			"暯",
			4,
			"暵暶暷暸暺暻暼暽暿",
			25,
			"曚曞",
			7,
			"曧曨曪",
			5,
			"曱曵曶書曺曻曽朁朂會"
		],
		[
			"9640",
			"朄朅朆朇朌朎朏朑朒朓朖朘朙朚朜朞朠",
			5,
			"朧朩朮朰朲朳朶朷朸朹朻朼朾朿杁杄杅杇杊杋杍杒杔杕杗",
			4,
			"杝杢杣杤杦杧杫杬杮東杴杶"
		],
		[
			"9680",
			"杸杹杺杻杽枀枂枃枅枆枈枊枌枍枎枏枑枒枓枔枖枙枛枟枠枡枤枦枩枬枮枱枲枴枹",
			7,
			"柂柅",
			9,
			"柕柖柗柛柟柡柣柤柦柧柨柪柫柭柮柲柵",
			7,
			"柾栁栂栃栄栆栍栐栒栔栕栘",
			4,
			"栞栟栠栢",
			6,
			"栫",
			6,
			"栴栵栶栺栻栿桇桋桍桏桒桖",
			5
		],
		[
			"9740",
			"桜桝桞桟桪桬",
			7,
			"桵桸",
			8,
			"梂梄梇",
			7,
			"梐梑梒梔梕梖梘",
			9,
			"梣梤梥梩梪梫梬梮梱梲梴梶梷梸"
		],
		[
			"9780",
			"梹",
			6,
			"棁棃",
			5,
			"棊棌棎棏棐棑棓棔棖棗棙棛",
			4,
			"棡棢棤",
			9,
			"棯棲棳棴棶棷棸棻棽棾棿椀椂椃椄椆",
			4,
			"椌椏椑椓",
			11,
			"椡椢椣椥",
			7,
			"椮椯椱椲椳椵椶椷椸椺椻椼椾楀楁楃",
			16,
			"楕楖楘楙楛楜楟"
		],
		[
			"9840",
			"楡楢楤楥楧楨楩楪楬業楯楰楲",
			4,
			"楺楻楽楾楿榁榃榅榊榋榌榎",
			5,
			"榖榗榙榚榝",
			9,
			"榩榪榬榮榯榰榲榳榵榶榸榹榺榼榽"
		],
		[
			"9880",
			"榾榿槀槂",
			7,
			"構槍槏槑槒槓槕",
			5,
			"槜槝槞槡",
			11,
			"槮槯槰槱槳",
			9,
			"槾樀",
			9,
			"樋",
			11,
			"標",
			5,
			"樠樢",
			5,
			"権樫樬樭樮樰樲樳樴樶",
			6,
			"樿",
			4,
			"橅橆橈",
			7,
			"橑",
			6,
			"橚"
		],
		[
			"9940",
			"橜",
			4,
			"橢橣橤橦",
			10,
			"橲",
			6,
			"橺橻橽橾橿檁檂檃檅",
			8,
			"檏檒",
			4,
			"檘",
			7,
			"檡",
			5
		],
		[
			"9980",
			"檧檨檪檭",
			114,
			"欥欦欨",
			6
		],
		[
			"9a40",
			"欯欰欱欳欴欵欶欸欻欼欽欿歀歁歂歄歅歈歊歋歍",
			11,
			"歚",
			7,
			"歨歩歫",
			13,
			"歺歽歾歿殀殅殈"
		],
		[
			"9a80",
			"殌殎殏殐殑殔殕殗殘殙殜",
			4,
			"殢",
			7,
			"殫",
			7,
			"殶殸",
			6,
			"毀毃毄毆",
			4,
			"毌毎毐毑毘毚毜",
			4,
			"毢",
			7,
			"毬毭毮毰毱毲毴毶毷毸毺毻毼毾",
			6,
			"氈",
			4,
			"氎氒気氜氝氞氠氣氥氫氬氭氱氳氶氷氹氺氻氼氾氿汃汄汅汈汋",
			4,
			"汑汒汓汖汘"
		],
		[
			"9b40",
			"汙汚汢汣汥汦汧汫",
			4,
			"汱汳汵汷汸決汻汼汿沀沄沇沊沋沍沎沑沒沕沖沗沘沚沜沝沞沠沢沨沬沯沰沴沵沶沷沺泀況泂泃泆泇泈泋泍泎泏泑泒泘"
		],
		[
			"9b80",
			"泙泚泜泝泟泤泦泧泩泬泭泲泴泹泿洀洂洃洅洆洈洉洊洍洏洐洑洓洔洕洖洘洜洝洟",
			5,
			"洦洨洩洬洭洯洰洴洶洷洸洺洿浀浂浄浉浌浐浕浖浗浘浛浝浟浡浢浤浥浧浨浫浬浭浰浱浲浳浵浶浹浺浻浽",
			4,
			"涃涄涆涇涊涋涍涏涐涒涖",
			4,
			"涜涢涥涬涭涰涱涳涴涶涷涹",
			5,
			"淁淂淃淈淉淊"
		],
		[
			"9c40",
			"淍淎淏淐淒淓淔淕淗淚淛淜淟淢淣淥淧淨淩淪淭淯淰淲淴淵淶淸淺淽",
			7,
			"渆渇済渉渋渏渒渓渕渘渙減渜渞渟渢渦渧渨渪測渮渰渱渳渵"
		],
		[
			"9c80",
			"渶渷渹渻",
			7,
			"湅",
			7,
			"湏湐湑湒湕湗湙湚湜湝湞湠",
			10,
			"湬湭湯",
			14,
			"満溁溂溄溇溈溊",
			4,
			"溑",
			6,
			"溙溚溛溝溞溠溡溣溤溦溨溩溫溬溭溮溰溳溵溸溹溼溾溿滀滃滄滅滆滈滉滊滌滍滎滐滒滖滘滙滛滜滝滣滧滪",
			5
		],
		[
			"9d40",
			"滰滱滲滳滵滶滷滸滺",
			7,
			"漃漄漅漇漈漊",
			4,
			"漐漑漒漖",
			9,
			"漡漢漣漥漦漧漨漬漮漰漲漴漵漷",
			6,
			"漿潀潁潂"
		],
		[
			"9d80",
			"潃潄潅潈潉潊潌潎",
			9,
			"潙潚潛潝潟潠潡潣潤潥潧",
			5,
			"潯潰潱潳潵潶潷潹潻潽",
			6,
			"澅澆澇澊澋澏",
			12,
			"澝澞澟澠澢",
			4,
			"澨",
			10,
			"澴澵澷澸澺",
			5,
			"濁濃",
			5,
			"濊",
			6,
			"濓",
			10,
			"濟濢濣濤濥"
		],
		[
			"9e40",
			"濦",
			7,
			"濰",
			32,
			"瀒",
			7,
			"瀜",
			6,
			"瀤",
			6
		],
		[
			"9e80",
			"瀫",
			9,
			"瀶瀷瀸瀺",
			17,
			"灍灎灐",
			13,
			"灟",
			11,
			"灮灱灲灳灴灷灹灺灻災炁炂炃炄炆炇炈炋炌炍炏炐炑炓炗炘炚炛炞",
			12,
			"炰炲炴炵炶為炾炿烄烅烆烇烉烋",
			12,
			"烚"
		],
		[
			"9f40",
			"烜烝烞烠烡烢烣烥烪烮烰",
			6,
			"烸烺烻烼烾",
			10,
			"焋",
			4,
			"焑焒焔焗焛",
			10,
			"焧",
			7,
			"焲焳焴"
		],
		[
			"9f80",
			"焵焷",
			13,
			"煆煇煈煉煋煍煏",
			12,
			"煝煟",
			4,
			"煥煩",
			4,
			"煯煰煱煴煵煶煷煹煻煼煾",
			5,
			"熅",
			4,
			"熋熌熍熎熐熑熒熓熕熖熗熚",
			4,
			"熡",
			6,
			"熩熪熫熭",
			5,
			"熴熶熷熸熺",
			8,
			"燄",
			9,
			"燏",
			4
		],
		[
			"a040",
			"燖",
			9,
			"燡燢燣燤燦燨",
			5,
			"燯",
			9,
			"燺",
			11,
			"爇",
			19
		],
		[
			"a080",
			"爛爜爞",
			9,
			"爩爫爭爮爯爲爳爴爺爼爾牀",
			6,
			"牉牊牋牎牏牐牑牓牔牕牗牘牚牜牞牠牣牤牥牨牪牫牬牭牰牱牳牴牶牷牸牻牼牽犂犃犅",
			4,
			"犌犎犐犑犓",
			11,
			"犠",
			11,
			"犮犱犲犳犵犺",
			6,
			"狅狆狇狉狊狋狌狏狑狓狔狕狖狘狚狛"
		],
		[
			"a1a1",
			"　、。·ˉˇ¨〃々—～‖…‘’“”〔〕〈",
			7,
			"〖〗【】±×÷∶∧∨∑∏∪∩∈∷√⊥∥∠⌒⊙∫∮≡≌≈∽∝≠≮≯≤≥∞∵∴♂♀°′″℃＄¤￠￡‰§№☆★○●◎◇◆□■△▲※→←↑↓〓"
		],
		[
			"a2a1",
			"ⅰ",
			9
		],
		[
			"a2b1",
			"⒈",
			19,
			"⑴",
			19,
			"①",
			9
		],
		[
			"a2e5",
			"㈠",
			9
		],
		[
			"a2f1",
			"Ⅰ",
			11
		],
		[
			"a3a1",
			"！＂＃￥％",
			88,
			"￣"
		],
		[
			"a4a1",
			"ぁ",
			82
		],
		[
			"a5a1",
			"ァ",
			85
		],
		[
			"a6a1",
			"Α",
			16,
			"Σ",
			6
		],
		[
			"a6c1",
			"α",
			16,
			"σ",
			6
		],
		[
			"a6e0",
			"︵︶︹︺︿﹀︽︾﹁﹂﹃﹄"
		],
		[
			"a6ee",
			"︻︼︷︸︱"
		],
		[
			"a6f4",
			"︳︴"
		],
		[
			"a7a1",
			"А",
			5,
			"ЁЖ",
			25
		],
		[
			"a7d1",
			"а",
			5,
			"ёж",
			25
		],
		[
			"a840",
			"ˊˋ˙–―‥‵℅℉↖↗↘↙∕∟∣≒≦≧⊿═",
			35,
			"▁",
			6
		],
		[
			"a880",
			"█",
			7,
			"▓▔▕▼▽◢◣◤◥☉⊕〒〝〞"
		],
		[
			"a8a1",
			"āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜüêɑ"
		],
		[
			"a8bd",
			"ńň"
		],
		[
			"a8c0",
			"ɡ"
		],
		[
			"a8c5",
			"ㄅ",
			36
		],
		[
			"a940",
			"〡",
			8,
			"㊣㎎㎏㎜㎝㎞㎡㏄㏎㏑㏒㏕︰￢￤"
		],
		[
			"a959",
			"℡㈱"
		],
		[
			"a95c",
			"‐"
		],
		[
			"a960",
			"ー゛゜ヽヾ〆ゝゞ﹉",
			9,
			"﹔﹕﹖﹗﹙",
			8
		],
		[
			"a980",
			"﹢",
			4,
			"﹨﹩﹪﹫"
		],
		[
			"a996",
			"〇"
		],
		[
			"a9a4",
			"─",
			75
		],
		[
			"aa40",
			"狜狝狟狢",
			5,
			"狪狫狵狶狹狽狾狿猀猂猄",
			5,
			"猋猌猍猏猐猑猒猔猘猙猚猟猠猣猤猦猧猨猭猯猰猲猳猵猶猺猻猼猽獀",
			8
		],
		[
			"aa80",
			"獉獊獋獌獎獏獑獓獔獕獖獘",
			7,
			"獡",
			10,
			"獮獰獱"
		],
		[
			"ab40",
			"獲",
			11,
			"獿",
			4,
			"玅玆玈玊玌玍玏玐玒玓玔玕玗玘玙玚玜玝玞玠玡玣",
			5,
			"玪玬玭玱玴玵玶玸玹玼玽玾玿珁珃",
			4
		],
		[
			"ab80",
			"珋珌珎珒",
			6,
			"珚珛珜珝珟珡珢珣珤珦珨珪珫珬珮珯珰珱珳",
			4
		],
		[
			"ac40",
			"珸",
			10,
			"琄琇琈琋琌琍琎琑",
			8,
			"琜",
			5,
			"琣琤琧琩琫琭琯琱琲琷",
			4,
			"琽琾琿瑀瑂",
			11
		],
		[
			"ac80",
			"瑎",
			6,
			"瑖瑘瑝瑠",
			12,
			"瑮瑯瑱",
			4,
			"瑸瑹瑺"
		],
		[
			"ad40",
			"瑻瑼瑽瑿璂璄璅璆璈璉璊璌璍璏璑",
			10,
			"璝璟",
			7,
			"璪",
			15,
			"璻",
			12
		],
		[
			"ad80",
			"瓈",
			9,
			"瓓",
			8,
			"瓝瓟瓡瓥瓧",
			6,
			"瓰瓱瓲"
		],
		[
			"ae40",
			"瓳瓵瓸",
			6,
			"甀甁甂甃甅",
			7,
			"甎甐甒甔甕甖甗甛甝甞甠",
			4,
			"甦甧甪甮甴甶甹甼甽甿畁畂畃畄畆畇畉畊畍畐畑畒畓畕畖畗畘"
		],
		[
			"ae80",
			"畝",
			7,
			"畧畨畩畫",
			6,
			"畳畵當畷畺",
			4,
			"疀疁疂疄疅疇"
		],
		[
			"af40",
			"疈疉疊疌疍疎疐疓疕疘疛疜疞疢疦",
			4,
			"疭疶疷疺疻疿痀痁痆痋痌痎痏痐痑痓痗痙痚痜痝痟痠痡痥痩痬痭痮痯痲痳痵痶痷痸痺痻痽痾瘂瘄瘆瘇"
		],
		[
			"af80",
			"瘈瘉瘋瘍瘎瘏瘑瘒瘓瘔瘖瘚瘜瘝瘞瘡瘣瘧瘨瘬瘮瘯瘱瘲瘶瘷瘹瘺瘻瘽癁療癄"
		],
		[
			"b040",
			"癅",
			6,
			"癎",
			5,
			"癕癗",
			4,
			"癝癟癠癡癢癤",
			6,
			"癬癭癮癰",
			7,
			"癹発發癿皀皁皃皅皉皊皌皍皏皐皒皔皕皗皘皚皛"
		],
		[
			"b080",
			"皜",
			7,
			"皥",
			8,
			"皯皰皳皵",
			9,
			"盀盁盃啊阿埃挨哎唉哀皑癌蔼矮艾碍爱隘鞍氨安俺按暗岸胺案肮昂盎凹敖熬翱袄傲奥懊澳芭捌扒叭吧笆八疤巴拔跋靶把耙坝霸罢爸白柏百摆佰败拜稗斑班搬扳般颁板版扮拌伴瓣半办绊邦帮梆榜膀绑棒磅蚌镑傍谤苞胞包褒剥"
		],
		[
			"b140",
			"盄盇盉盋盌盓盕盙盚盜盝盞盠",
			4,
			"盦",
			7,
			"盰盳盵盶盷盺盻盽盿眀眂眃眅眆眊県眎",
			10,
			"眛眜眝眞眡眣眤眥眧眪眫"
		],
		[
			"b180",
			"眬眮眰",
			4,
			"眹眻眽眾眿睂睄睅睆睈",
			7,
			"睒",
			7,
			"睜薄雹保堡饱宝抱报暴豹鲍爆杯碑悲卑北辈背贝钡倍狈备惫焙被奔苯本笨崩绷甭泵蹦迸逼鼻比鄙笔彼碧蓖蔽毕毙毖币庇痹闭敝弊必辟壁臂避陛鞭边编贬扁便变卞辨辩辫遍标彪膘表鳖憋别瘪彬斌濒滨宾摈兵冰柄丙秉饼炳"
		],
		[
			"b240",
			"睝睞睟睠睤睧睩睪睭",
			11,
			"睺睻睼瞁瞂瞃瞆",
			5,
			"瞏瞐瞓",
			11,
			"瞡瞣瞤瞦瞨瞫瞭瞮瞯瞱瞲瞴瞶",
			4
		],
		[
			"b280",
			"瞼瞾矀",
			12,
			"矎",
			8,
			"矘矙矚矝",
			4,
			"矤病并玻菠播拨钵波博勃搏铂箔伯帛舶脖膊渤泊驳捕卜哺补埠不布步簿部怖擦猜裁材才财睬踩采彩菜蔡餐参蚕残惭惨灿苍舱仓沧藏操糙槽曹草厕策侧册测层蹭插叉茬茶查碴搽察岔差诧拆柴豺搀掺蝉馋谗缠铲产阐颤昌猖"
		],
		[
			"b340",
			"矦矨矪矯矰矱矲矴矵矷矹矺矻矼砃",
			5,
			"砊砋砎砏砐砓砕砙砛砞砠砡砢砤砨砪砫砮砯砱砲砳砵砶砽砿硁硂硃硄硆硈硉硊硋硍硏硑硓硔硘硙硚"
		],
		[
			"b380",
			"硛硜硞",
			11,
			"硯",
			7,
			"硸硹硺硻硽",
			6,
			"场尝常长偿肠厂敞畅唱倡超抄钞朝嘲潮巢吵炒车扯撤掣彻澈郴臣辰尘晨忱沉陈趁衬撑称城橙成呈乘程惩澄诚承逞骋秤吃痴持匙池迟弛驰耻齿侈尺赤翅斥炽充冲虫崇宠抽酬畴踌稠愁筹仇绸瞅丑臭初出橱厨躇锄雏滁除楚"
		],
		[
			"b440",
			"碄碅碆碈碊碋碏碐碒碔碕碖碙碝碞碠碢碤碦碨",
			7,
			"碵碶碷碸確碻碼碽碿磀磂磃磄磆磇磈磌磍磎磏磑磒磓磖磗磘磚",
			9
		],
		[
			"b480",
			"磤磥磦磧磩磪磫磭",
			4,
			"磳磵磶磸磹磻",
			5,
			"礂礃礄礆",
			6,
			"础储矗搐触处揣川穿椽传船喘串疮窗幢床闯创吹炊捶锤垂春椿醇唇淳纯蠢戳绰疵茨磁雌辞慈瓷词此刺赐次聪葱囱匆从丛凑粗醋簇促蹿篡窜摧崔催脆瘁粹淬翠村存寸磋撮搓措挫错搭达答瘩打大呆歹傣戴带殆代贷袋待逮"
		],
		[
			"b540",
			"礍",
			5,
			"礔",
			9,
			"礟",
			4,
			"礥",
			14,
			"礵",
			4,
			"礽礿祂祃祄祅祇祊",
			8,
			"祔祕祘祙祡祣"
		],
		[
			"b580",
			"祤祦祩祪祫祬祮祰",
			6,
			"祹祻",
			4,
			"禂禃禆禇禈禉禋禌禍禎禐禑禒怠耽担丹单郸掸胆旦氮但惮淡诞弹蛋当挡党荡档刀捣蹈倒岛祷导到稻悼道盗德得的蹬灯登等瞪凳邓堤低滴迪敌笛狄涤翟嫡抵底地蒂第帝弟递缔颠掂滇碘点典靛垫电佃甸店惦奠淀殿碉叼雕凋刁掉吊钓调跌爹碟蝶迭谍叠"
		],
		[
			"b640",
			"禓",
			6,
			"禛",
			11,
			"禨",
			10,
			"禴",
			4,
			"禼禿秂秄秅秇秈秊秌秎秏秐秓秔秖秗秙",
			5,
			"秠秡秢秥秨秪"
		],
		[
			"b680",
			"秬秮秱",
			6,
			"秹秺秼秾秿稁稄稅稇稈稉稊稌稏",
			4,
			"稕稖稘稙稛稜丁盯叮钉顶鼎锭定订丢东冬董懂动栋侗恫冻洞兜抖斗陡豆逗痘都督毒犊独读堵睹赌杜镀肚度渡妒端短锻段断缎堆兑队对墩吨蹲敦顿囤钝盾遁掇哆多夺垛躲朵跺舵剁惰堕蛾峨鹅俄额讹娥恶厄扼遏鄂饿恩而儿耳尔饵洱二"
		],
		[
			"b740",
			"稝稟稡稢稤",
			14,
			"稴稵稶稸稺稾穀",
			5,
			"穇",
			9,
			"穒",
			4,
			"穘",
			16
		],
		[
			"b780",
			"穩",
			6,
			"穱穲穳穵穻穼穽穾窂窅窇窉窊窋窌窎窏窐窓窔窙窚窛窞窡窢贰发罚筏伐乏阀法珐藩帆番翻樊矾钒繁凡烦反返范贩犯饭泛坊芳方肪房防妨仿访纺放菲非啡飞肥匪诽吠肺废沸费芬酚吩氛分纷坟焚汾粉奋份忿愤粪丰封枫蜂峰锋风疯烽逢冯缝讽奉凤佛否夫敷肤孵扶拂辐幅氟符伏俘服"
		],
		[
			"b840",
			"窣窤窧窩窪窫窮",
			4,
			"窴",
			10,
			"竀",
			10,
			"竌",
			9,
			"竗竘竚竛竜竝竡竢竤竧",
			5,
			"竮竰竱竲竳"
		],
		[
			"b880",
			"竴",
			4,
			"竻竼竾笀笁笂笅笇笉笌笍笎笐笒笓笖笗笘笚笜笝笟笡笢笣笧笩笭浮涪福袱弗甫抚辅俯釜斧脯腑府腐赴副覆赋复傅付阜父腹负富讣附妇缚咐噶嘎该改概钙盖溉干甘杆柑竿肝赶感秆敢赣冈刚钢缸肛纲岗港杠篙皋高膏羔糕搞镐稿告哥歌搁戈鸽胳疙割革葛格蛤阁隔铬个各给根跟耕更庚羹"
		],
		[
			"b940",
			"笯笰笲笴笵笶笷笹笻笽笿",
			5,
			"筆筈筊筍筎筓筕筗筙筜筞筟筡筣",
			10,
			"筯筰筳筴筶筸筺筼筽筿箁箂箃箄箆",
			6,
			"箎箏"
		],
		[
			"b980",
			"箑箒箓箖箘箙箚箛箞箟箠箣箤箥箮箯箰箲箳箵箶箷箹",
			7,
			"篂篃範埂耿梗工攻功恭龚供躬公宫弓巩汞拱贡共钩勾沟苟狗垢构购够辜菇咕箍估沽孤姑鼓古蛊骨谷股故顾固雇刮瓜剐寡挂褂乖拐怪棺关官冠观管馆罐惯灌贯光广逛瑰规圭硅归龟闺轨鬼诡癸桂柜跪贵刽辊滚棍锅郭国果裹过哈"
		],
		[
			"ba40",
			"篅篈築篊篋篍篎篏篐篒篔",
			4,
			"篛篜篞篟篠篢篣篤篧篨篩篫篬篭篯篰篲",
			4,
			"篸篹篺篻篽篿",
			7,
			"簈簉簊簍簎簐",
			5,
			"簗簘簙"
		],
		[
			"ba80",
			"簚",
			4,
			"簠",
			5,
			"簨簩簫",
			12,
			"簹",
			5,
			"籂骸孩海氦亥害骇酣憨邯韩含涵寒函喊罕翰撼捍旱憾悍焊汗汉夯杭航壕嚎豪毫郝好耗号浩呵喝荷菏核禾和何合盒貉阂河涸赫褐鹤贺嘿黑痕很狠恨哼亨横衡恒轰哄烘虹鸿洪宏弘红喉侯猴吼厚候后呼乎忽瑚壶葫胡蝴狐糊湖"
		],
		[
			"bb40",
			"籃",
			9,
			"籎",
			36,
			"籵",
			5,
			"籾",
			9
		],
		[
			"bb80",
			"粈粊",
			6,
			"粓粔粖粙粚粛粠粡粣粦粧粨粩粫粬粭粯粰粴",
			4,
			"粺粻弧虎唬护互沪户花哗华猾滑画划化话槐徊怀淮坏欢环桓还缓换患唤痪豢焕涣宦幻荒慌黄磺蝗簧皇凰惶煌晃幌恍谎灰挥辉徽恢蛔回毁悔慧卉惠晦贿秽会烩汇讳诲绘荤昏婚魂浑混豁活伙火获或惑霍货祸击圾基机畸稽积箕"
		],
		[
			"bc40",
			"粿糀糂糃糄糆糉糋糎",
			6,
			"糘糚糛糝糞糡",
			6,
			"糩",
			5,
			"糰",
			7,
			"糹糺糼",
			13,
			"紋",
			5
		],
		[
			"bc80",
			"紑",
			14,
			"紡紣紤紥紦紨紩紪紬紭紮細",
			6,
			"肌饥迹激讥鸡姬绩缉吉极棘辑籍集及急疾汲即嫉级挤几脊己蓟技冀季伎祭剂悸济寄寂计记既忌际妓继纪嘉枷夹佳家加荚颊贾甲钾假稼价架驾嫁歼监坚尖笺间煎兼肩艰奸缄茧检柬碱硷拣捡简俭剪减荐槛鉴践贱见键箭件"
		],
		[
			"bd40",
			"紷",
			54,
			"絯",
			7
		],
		[
			"bd80",
			"絸",
			32,
			"健舰剑饯渐溅涧建僵姜将浆江疆蒋桨奖讲匠酱降蕉椒礁焦胶交郊浇骄娇嚼搅铰矫侥脚狡角饺缴绞剿教酵轿较叫窖揭接皆秸街阶截劫节桔杰捷睫竭洁结解姐戒藉芥界借介疥诫届巾筋斤金今津襟紧锦仅谨进靳晋禁近烬浸"
		],
		[
			"be40",
			"継",
			12,
			"綧",
			6,
			"綯",
			42
		],
		[
			"be80",
			"線",
			32,
			"尽劲荆兢茎睛晶鲸京惊精粳经井警景颈静境敬镜径痉靖竟竞净炯窘揪究纠玖韭久灸九酒厩救旧臼舅咎就疚鞠拘狙疽居驹菊局咀矩举沮聚拒据巨具距踞锯俱句惧炬剧捐鹃娟倦眷卷绢撅攫抉掘倔爵觉决诀绝均菌钧军君峻"
		],
		[
			"bf40",
			"緻",
			62
		],
		[
			"bf80",
			"縺縼",
			4,
			"繂",
			4,
			"繈",
			21,
			"俊竣浚郡骏喀咖卡咯开揩楷凯慨刊堪勘坎砍看康慷糠扛抗亢炕考拷烤靠坷苛柯棵磕颗科壳咳可渴克刻客课肯啃垦恳坑吭空恐孔控抠口扣寇枯哭窟苦酷库裤夸垮挎跨胯块筷侩快宽款匡筐狂框矿眶旷况亏盔岿窥葵奎魁傀"
		],
		[
			"c040",
			"繞",
			35,
			"纃",
			23,
			"纜纝纞"
		],
		[
			"c080",
			"纮纴纻纼绖绤绬绹缊缐缞缷缹缻",
			6,
			"罃罆",
			9,
			"罒罓馈愧溃坤昆捆困括扩廓阔垃拉喇蜡腊辣啦莱来赖蓝婪栏拦篮阑兰澜谰揽览懒缆烂滥琅榔狼廊郎朗浪捞劳牢老佬姥酪烙涝勒乐雷镭蕾磊累儡垒擂肋类泪棱楞冷厘梨犁黎篱狸离漓理李里鲤礼莉荔吏栗丽厉励砾历利傈例俐"
		],
		[
			"c140",
			"罖罙罛罜罝罞罠罣",
			4,
			"罫罬罭罯罰罳罵罶罷罸罺罻罼罽罿羀羂",
			7,
			"羋羍羏",
			4,
			"羕",
			4,
			"羛羜羠羢羣羥羦羨",
			6,
			"羱"
		],
		[
			"c180",
			"羳",
			4,
			"羺羻羾翀翂翃翄翆翇翈翉翋翍翏",
			4,
			"翖翗翙",
			5,
			"翢翣痢立粒沥隶力璃哩俩联莲连镰廉怜涟帘敛脸链恋炼练粮凉梁粱良两辆量晾亮谅撩聊僚疗燎寥辽潦了撂镣廖料列裂烈劣猎琳林磷霖临邻鳞淋凛赁吝拎玲菱零龄铃伶羚凌灵陵岭领另令溜琉榴硫馏留刘瘤流柳六龙聋咙笼窿"
		],
		[
			"c240",
			"翤翧翨翪翫翬翭翯翲翴",
			6,
			"翽翾翿耂耇耈耉耊耎耏耑耓耚耛耝耞耟耡耣耤耫",
			5,
			"耲耴耹耺耼耾聀聁聄聅聇聈聉聎聏聐聑聓聕聖聗"
		],
		[
			"c280",
			"聙聛",
			13,
			"聫",
			5,
			"聲",
			11,
			"隆垄拢陇楼娄搂篓漏陋芦卢颅庐炉掳卤虏鲁麓碌露路赂鹿潞禄录陆戮驴吕铝侣旅履屡缕虑氯律率滤绿峦挛孪滦卵乱掠略抡轮伦仑沦纶论萝螺罗逻锣箩骡裸落洛骆络妈麻玛码蚂马骂嘛吗埋买麦卖迈脉瞒馒蛮满蔓曼慢漫"
		],
		[
			"c340",
			"聾肁肂肅肈肊肍",
			5,
			"肔肕肗肙肞肣肦肧肨肬肰肳肵肶肸肹肻胅胇",
			4,
			"胏",
			6,
			"胘胟胠胢胣胦胮胵胷胹胻胾胿脀脁脃脄脅脇脈脋"
		],
		[
			"c380",
			"脌脕脗脙脛脜脝脟",
			12,
			"脭脮脰脳脴脵脷脹",
			4,
			"脿谩芒茫盲氓忙莽猫茅锚毛矛铆卯茂冒帽貌贸么玫枚梅酶霉煤没眉媒镁每美昧寐妹媚门闷们萌蒙檬盟锰猛梦孟眯醚靡糜迷谜弥米秘觅泌蜜密幂棉眠绵冕免勉娩缅面苗描瞄藐秒渺庙妙蔑灭民抿皿敏悯闽明螟鸣铭名命谬摸"
		],
		[
			"c440",
			"腀",
			5,
			"腇腉腍腎腏腒腖腗腘腛",
			4,
			"腡腢腣腤腦腨腪腫腬腯腲腳腵腶腷腸膁膃",
			4,
			"膉膋膌膍膎膐膒",
			5,
			"膙膚膞",
			4,
			"膤膥"
		],
		[
			"c480",
			"膧膩膫",
			7,
			"膴",
			5,
			"膼膽膾膿臄臅臇臈臉臋臍",
			6,
			"摹蘑模膜磨摩魔抹末莫墨默沫漠寞陌谋牟某拇牡亩姆母墓暮幕募慕木目睦牧穆拿哪呐钠那娜纳氖乃奶耐奈南男难囊挠脑恼闹淖呢馁内嫩能妮霓倪泥尼拟你匿腻逆溺蔫拈年碾撵捻念娘酿鸟尿捏聂孽啮镊镍涅您柠狞凝宁"
		],
		[
			"c540",
			"臔",
			14,
			"臤臥臦臨臩臫臮",
			4,
			"臵",
			5,
			"臽臿舃與",
			4,
			"舎舏舑舓舕",
			5,
			"舝舠舤舥舦舧舩舮舲舺舼舽舿"
		],
		[
			"c580",
			"艀艁艂艃艅艆艈艊艌艍艎艐",
			7,
			"艙艛艜艝艞艠",
			7,
			"艩拧泞牛扭钮纽脓浓农弄奴努怒女暖虐疟挪懦糯诺哦欧鸥殴藕呕偶沤啪趴爬帕怕琶拍排牌徘湃派攀潘盘磐盼畔判叛乓庞旁耪胖抛咆刨炮袍跑泡呸胚培裴赔陪配佩沛喷盆砰抨烹澎彭蓬棚硼篷膨朋鹏捧碰坯砒霹批披劈琵毗"
		],
		[
			"c640",
			"艪艫艬艭艱艵艶艷艸艻艼芀芁芃芅芆芇芉芌芐芓芔芕芖芚芛芞芠芢芣芧芲芵芶芺芻芼芿苀苂苃苅苆苉苐苖苙苚苝苢苧苨苩苪苬苭苮苰苲苳苵苶苸"
		],
		[
			"c680",
			"苺苼",
			4,
			"茊茋茍茐茒茓茖茘茙茝",
			9,
			"茩茪茮茰茲茷茻茽啤脾疲皮匹痞僻屁譬篇偏片骗飘漂瓢票撇瞥拼频贫品聘乒坪苹萍平凭瓶评屏坡泼颇婆破魄迫粕剖扑铺仆莆葡菩蒲埔朴圃普浦谱曝瀑期欺栖戚妻七凄漆柒沏其棋奇歧畦崎脐齐旗祈祁骑起岂乞企启契砌器气迄弃汽泣讫掐"
		],
		[
			"c740",
			"茾茿荁荂荄荅荈荊",
			4,
			"荓荕",
			4,
			"荝荢荰",
			6,
			"荹荺荾",
			6,
			"莇莈莊莋莌莍莏莐莑莔莕莖莗莙莚莝莟莡",
			6,
			"莬莭莮"
		],
		[
			"c780",
			"莯莵莻莾莿菂菃菄菆菈菉菋菍菎菐菑菒菓菕菗菙菚菛菞菢菣菤菦菧菨菫菬菭恰洽牵扦钎铅千迁签仟谦乾黔钱钳前潜遣浅谴堑嵌欠歉枪呛腔羌墙蔷强抢橇锹敲悄桥瞧乔侨巧鞘撬翘峭俏窍切茄且怯窃钦侵亲秦琴勤芹擒禽寝沁青轻氢倾卿清擎晴氰情顷请庆琼穷秋丘邱球求囚酋泅趋区蛆曲躯屈驱渠"
		],
		[
			"c840",
			"菮華菳",
			4,
			"菺菻菼菾菿萀萂萅萇萈萉萊萐萒",
			5,
			"萙萚萛萞",
			5,
			"萩",
			7,
			"萲",
			5,
			"萹萺萻萾",
			7,
			"葇葈葉"
		],
		[
			"c880",
			"葊",
			6,
			"葒",
			4,
			"葘葝葞葟葠葢葤",
			4,
			"葪葮葯葰葲葴葷葹葻葼取娶龋趣去圈颧权醛泉全痊拳犬券劝缺炔瘸却鹊榷确雀裙群然燃冉染瓤壤攘嚷让饶扰绕惹热壬仁人忍韧任认刃妊纫扔仍日戎茸蓉荣融熔溶容绒冗揉柔肉茹蠕儒孺如辱乳汝入褥软阮蕊瑞锐闰润若弱撒洒萨腮鳃塞赛三叁"
		],
		[
			"c940",
			"葽",
			4,
			"蒃蒄蒅蒆蒊蒍蒏",
			7,
			"蒘蒚蒛蒝蒞蒟蒠蒢",
			12,
			"蒰蒱蒳蒵蒶蒷蒻蒼蒾蓀蓂蓃蓅蓆蓇蓈蓋蓌蓎蓏蓒蓔蓕蓗"
		],
		[
			"c980",
			"蓘",
			4,
			"蓞蓡蓢蓤蓧",
			4,
			"蓭蓮蓯蓱",
			10,
			"蓽蓾蔀蔁蔂伞散桑嗓丧搔骚扫嫂瑟色涩森僧莎砂杀刹沙纱傻啥煞筛晒珊苫杉山删煽衫闪陕擅赡膳善汕扇缮墒伤商赏晌上尚裳梢捎稍烧芍勺韶少哨邵绍奢赊蛇舌舍赦摄射慑涉社设砷申呻伸身深娠绅神沈审婶甚肾慎渗声生甥牲升绳"
		],
		[
			"ca40",
			"蔃",
			8,
			"蔍蔎蔏蔐蔒蔔蔕蔖蔘蔙蔛蔜蔝蔞蔠蔢",
			8,
			"蔭",
			9,
			"蔾",
			4,
			"蕄蕅蕆蕇蕋",
			10
		],
		[
			"ca80",
			"蕗蕘蕚蕛蕜蕝蕟",
			4,
			"蕥蕦蕧蕩",
			8,
			"蕳蕵蕶蕷蕸蕼蕽蕿薀薁省盛剩胜圣师失狮施湿诗尸虱十石拾时什食蚀实识史矢使屎驶始式示士世柿事拭誓逝势是嗜噬适仕侍释饰氏市恃室视试收手首守寿授售受瘦兽蔬枢梳殊抒输叔舒淑疏书赎孰熟薯暑曙署蜀黍鼠属术述树束戍竖墅庶数漱"
		],
		[
			"cb40",
			"薂薃薆薈",
			6,
			"薐",
			10,
			"薝",
			6,
			"薥薦薧薩薫薬薭薱",
			5,
			"薸薺",
			6,
			"藂",
			6,
			"藊",
			4,
			"藑藒"
		],
		[
			"cb80",
			"藔藖",
			5,
			"藝",
			6,
			"藥藦藧藨藪",
			14,
			"恕刷耍摔衰甩帅栓拴霜双爽谁水睡税吮瞬顺舜说硕朔烁斯撕嘶思私司丝死肆寺嗣四伺似饲巳松耸怂颂送宋讼诵搜艘擞嗽苏酥俗素速粟僳塑溯宿诉肃酸蒜算虽隋随绥髓碎岁穗遂隧祟孙损笋蓑梭唆缩琐索锁所塌他它她塔"
		],
		[
			"cc40",
			"藹藺藼藽藾蘀",
			4,
			"蘆",
			10,
			"蘒蘓蘔蘕蘗",
			15,
			"蘨蘪",
			13,
			"蘹蘺蘻蘽蘾蘿虀"
		],
		[
			"cc80",
			"虁",
			11,
			"虒虓處",
			4,
			"虛虜虝號虠虡虣",
			7,
			"獭挞蹋踏胎苔抬台泰酞太态汰坍摊贪瘫滩坛檀痰潭谭谈坦毯袒碳探叹炭汤塘搪堂棠膛唐糖倘躺淌趟烫掏涛滔绦萄桃逃淘陶讨套特藤腾疼誊梯剔踢锑提题蹄啼体替嚏惕涕剃屉天添填田甜恬舔腆挑条迢眺跳贴铁帖厅听烃"
		],
		[
			"cd40",
			"虭虯虰虲",
			6,
			"蚃",
			6,
			"蚎",
			4,
			"蚔蚖",
			5,
			"蚞",
			4,
			"蚥蚦蚫蚭蚮蚲蚳蚷蚸蚹蚻",
			4,
			"蛁蛂蛃蛅蛈蛌蛍蛒蛓蛕蛖蛗蛚蛜"
		],
		[
			"cd80",
			"蛝蛠蛡蛢蛣蛥蛦蛧蛨蛪蛫蛬蛯蛵蛶蛷蛺蛻蛼蛽蛿蜁蜄蜅蜆蜋蜌蜎蜏蜐蜑蜔蜖汀廷停亭庭挺艇通桐酮瞳同铜彤童桶捅筒统痛偷投头透凸秃突图徒途涂屠土吐兔湍团推颓腿蜕褪退吞屯臀拖托脱鸵陀驮驼椭妥拓唾挖哇蛙洼娃瓦袜歪外豌弯湾玩顽丸烷完碗挽晚皖惋宛婉万腕汪王亡枉网往旺望忘妄威"
		],
		[
			"ce40",
			"蜙蜛蜝蜟蜠蜤蜦蜧蜨蜪蜫蜬蜭蜯蜰蜲蜳蜵蜶蜸蜹蜺蜼蜽蝀",
			6,
			"蝊蝋蝍蝏蝐蝑蝒蝔蝕蝖蝘蝚",
			5,
			"蝡蝢蝦",
			7,
			"蝯蝱蝲蝳蝵"
		],
		[
			"ce80",
			"蝷蝸蝹蝺蝿螀螁螄螆螇螉螊螌螎",
			4,
			"螔螕螖螘",
			6,
			"螠",
			4,
			"巍微危韦违桅围唯惟为潍维苇萎委伟伪尾纬未蔚味畏胃喂魏位渭谓尉慰卫瘟温蚊文闻纹吻稳紊问嗡翁瓮挝蜗涡窝我斡卧握沃巫呜钨乌污诬屋无芜梧吾吴毋武五捂午舞伍侮坞戊雾晤物勿务悟误昔熙析西硒矽晰嘻吸锡牺"
		],
		[
			"cf40",
			"螥螦螧螩螪螮螰螱螲螴螶螷螸螹螻螼螾螿蟁",
			4,
			"蟇蟈蟉蟌",
			4,
			"蟔",
			6,
			"蟜蟝蟞蟟蟡蟢蟣蟤蟦蟧蟨蟩蟫蟬蟭蟯",
			9
		],
		[
			"cf80",
			"蟺蟻蟼蟽蟿蠀蠁蠂蠄",
			5,
			"蠋",
			7,
			"蠔蠗蠘蠙蠚蠜",
			4,
			"蠣稀息希悉膝夕惜熄烯溪汐犀檄袭席习媳喜铣洗系隙戏细瞎虾匣霞辖暇峡侠狭下厦夏吓掀锨先仙鲜纤咸贤衔舷闲涎弦嫌显险现献县腺馅羡宪陷限线相厢镶香箱襄湘乡翔祥详想响享项巷橡像向象萧硝霄削哮嚣销消宵淆晓"
		],
		[
			"d040",
			"蠤",
			13,
			"蠳",
			5,
			"蠺蠻蠽蠾蠿衁衂衃衆",
			5,
			"衎",
			5,
			"衕衖衘衚",
			6,
			"衦衧衪衭衯衱衳衴衵衶衸衹衺"
		],
		[
			"d080",
			"衻衼袀袃袆袇袉袊袌袎袏袐袑袓袔袕袗",
			4,
			"袝",
			4,
			"袣袥",
			5,
			"小孝校肖啸笑效楔些歇蝎鞋协挟携邪斜胁谐写械卸蟹懈泄泻谢屑薪芯锌欣辛新忻心信衅星腥猩惺兴刑型形邢行醒幸杏性姓兄凶胸匈汹雄熊休修羞朽嗅锈秀袖绣墟戌需虚嘘须徐许蓄酗叙旭序畜恤絮婿绪续轩喧宣悬旋玄"
		],
		[
			"d140",
			"袬袮袯袰袲",
			4,
			"袸袹袺袻袽袾袿裀裃裄裇裈裊裋裌裍裏裐裑裓裖裗裚",
			4,
			"裠裡裦裧裩",
			6,
			"裲裵裶裷裺裻製裿褀褁褃",
			5
		],
		[
			"d180",
			"褉褋",
			4,
			"褑褔",
			4,
			"褜",
			4,
			"褢褣褤褦褧褨褩褬褭褮褯褱褲褳褵褷选癣眩绚靴薛学穴雪血勋熏循旬询寻驯巡殉汛训讯逊迅压押鸦鸭呀丫芽牙蚜崖衙涯雅哑亚讶焉咽阉烟淹盐严研蜒岩延言颜阎炎沿奄掩眼衍演艳堰燕厌砚雁唁彦焰宴谚验殃央鸯秧杨扬佯疡羊洋阳氧仰痒养样漾邀腰妖瑶"
		],
		[
			"d240",
			"褸",
			8,
			"襂襃襅",
			24,
			"襠",
			5,
			"襧",
			19,
			"襼"
		],
		[
			"d280",
			"襽襾覀覂覄覅覇",
			26,
			"摇尧遥窑谣姚咬舀药要耀椰噎耶爷野冶也页掖业叶曳腋夜液一壹医揖铱依伊衣颐夷遗移仪胰疑沂宜姨彝椅蚁倚已乙矣以艺抑易邑屹亿役臆逸肄疫亦裔意毅忆义益溢诣议谊译异翼翌绎茵荫因殷音阴姻吟银淫寅饮尹引隐"
		],
		[
			"d340",
			"覢",
			30,
			"觃觍觓觔觕觗觘觙觛觝觟觠觡觢觤觧觨觩觪觬觭觮觰觱觲觴",
			6
		],
		[
			"d380",
			"觻",
			4,
			"訁",
			5,
			"計",
			21,
			"印英樱婴鹰应缨莹萤营荧蝇迎赢盈影颖硬映哟拥佣臃痈庸雍踊蛹咏泳涌永恿勇用幽优悠忧尤由邮铀犹油游酉有友右佑釉诱又幼迂淤于盂榆虞愚舆余俞逾鱼愉渝渔隅予娱雨与屿禹宇语羽玉域芋郁吁遇喻峪御愈欲狱育誉"
		],
		[
			"d440",
			"訞",
			31,
			"訿",
			8,
			"詉",
			21
		],
		[
			"d480",
			"詟",
			25,
			"詺",
			6,
			"浴寓裕预豫驭鸳渊冤元垣袁原援辕园员圆猿源缘远苑愿怨院曰约越跃钥岳粤月悦阅耘云郧匀陨允运蕴酝晕韵孕匝砸杂栽哉灾宰载再在咱攒暂赞赃脏葬遭糟凿藻枣早澡蚤躁噪造皂灶燥责择则泽贼怎增憎曾赠扎喳渣札轧"
		],
		[
			"d540",
			"誁",
			7,
			"誋",
			7,
			"誔",
			46
		],
		[
			"d580",
			"諃",
			32,
			"铡闸眨栅榨咋乍炸诈摘斋宅窄债寨瞻毡詹粘沾盏斩辗崭展蘸栈占战站湛绽樟章彰漳张掌涨杖丈帐账仗胀瘴障招昭找沼赵照罩兆肇召遮折哲蛰辙者锗蔗这浙珍斟真甄砧臻贞针侦枕疹诊震振镇阵蒸挣睁征狰争怔整拯正政"
		],
		[
			"d640",
			"諤",
			34,
			"謈",
			27
		],
		[
			"d680",
			"謤謥謧",
			30,
			"帧症郑证芝枝支吱蜘知肢脂汁之织职直植殖执值侄址指止趾只旨纸志挚掷至致置帜峙制智秩稚质炙痔滞治窒中盅忠钟衷终种肿重仲众舟周州洲诌粥轴肘帚咒皱宙昼骤珠株蛛朱猪诸诛逐竹烛煮拄瞩嘱主著柱助蛀贮铸筑"
		],
		[
			"d740",
			"譆",
			31,
			"譧",
			4,
			"譭",
			25
		],
		[
			"d780",
			"讇",
			24,
			"讬讱讻诇诐诪谉谞住注祝驻抓爪拽专砖转撰赚篆桩庄装妆撞壮状椎锥追赘坠缀谆准捉拙卓桌琢茁酌啄着灼浊兹咨资姿滋淄孜紫仔籽滓子自渍字鬃棕踪宗综总纵邹走奏揍租足卒族祖诅阻组钻纂嘴醉最罪尊遵昨左佐柞做作坐座"
		],
		[
			"d840",
			"谸",
			8,
			"豂豃豄豅豈豊豋豍",
			7,
			"豖豗豘豙豛",
			5,
			"豣",
			6,
			"豬",
			6,
			"豴豵豶豷豻",
			6,
			"貃貄貆貇"
		],
		[
			"d880",
			"貈貋貍",
			6,
			"貕貖貗貙",
			20,
			"亍丌兀丐廿卅丕亘丞鬲孬噩丨禺丿匕乇夭爻卮氐囟胤馗毓睾鼗丶亟鼐乜乩亓芈孛啬嘏仄厍厝厣厥厮靥赝匚叵匦匮匾赜卦卣刂刈刎刭刳刿剀剌剞剡剜蒯剽劂劁劐劓冂罔亻仃仉仂仨仡仫仞伛仳伢佤仵伥伧伉伫佞佧攸佚佝"
		],
		[
			"d940",
			"貮",
			62
		],
		[
			"d980",
			"賭",
			32,
			"佟佗伲伽佶佴侑侉侃侏佾佻侪佼侬侔俦俨俪俅俚俣俜俑俟俸倩偌俳倬倏倮倭俾倜倌倥倨偾偃偕偈偎偬偻傥傧傩傺僖儆僭僬僦僮儇儋仝氽佘佥俎龠汆籴兮巽黉馘冁夔勹匍訇匐凫夙兕亠兖亳衮袤亵脔裒禀嬴蠃羸冫冱冽冼"
		],
		[
			"da40",
			"贎",
			14,
			"贠赑赒赗赟赥赨赩赪赬赮赯赱赲赸",
			8,
			"趂趃趆趇趈趉趌",
			4,
			"趒趓趕",
			9,
			"趠趡"
		],
		[
			"da80",
			"趢趤",
			12,
			"趲趶趷趹趻趽跀跁跂跅跇跈跉跊跍跐跒跓跔凇冖冢冥讠讦讧讪讴讵讷诂诃诋诏诎诒诓诔诖诘诙诜诟诠诤诨诩诮诰诳诶诹诼诿谀谂谄谇谌谏谑谒谔谕谖谙谛谘谝谟谠谡谥谧谪谫谮谯谲谳谵谶卩卺阝阢阡阱阪阽阼陂陉陔陟陧陬陲陴隈隍隗隰邗邛邝邙邬邡邴邳邶邺"
		],
		[
			"db40",
			"跕跘跙跜跠跡跢跥跦跧跩跭跮跰跱跲跴跶跼跾",
			6,
			"踆踇踈踋踍踎踐踑踒踓踕",
			7,
			"踠踡踤",
			4,
			"踫踭踰踲踳踴踶踷踸踻踼踾"
		],
		[
			"db80",
			"踿蹃蹅蹆蹌",
			4,
			"蹓",
			5,
			"蹚",
			11,
			"蹧蹨蹪蹫蹮蹱邸邰郏郅邾郐郄郇郓郦郢郜郗郛郫郯郾鄄鄢鄞鄣鄱鄯鄹酃酆刍奂劢劬劭劾哿勐勖勰叟燮矍廴凵凼鬯厶弁畚巯坌垩垡塾墼壅壑圩圬圪圳圹圮圯坜圻坂坩垅坫垆坼坻坨坭坶坳垭垤垌垲埏垧垴垓垠埕埘埚埙埒垸埴埯埸埤埝"
		],
		[
			"dc40",
			"蹳蹵蹷",
			4,
			"蹽蹾躀躂躃躄躆躈",
			6,
			"躑躒躓躕",
			6,
			"躝躟",
			11,
			"躭躮躰躱躳",
			6,
			"躻",
			7
		],
		[
			"dc80",
			"軃",
			10,
			"軏",
			21,
			"堋堍埽埭堀堞堙塄堠塥塬墁墉墚墀馨鼙懿艹艽艿芏芊芨芄芎芑芗芙芫芸芾芰苈苊苣芘芷芮苋苌苁芩芴芡芪芟苄苎芤苡茉苷苤茏茇苜苴苒苘茌苻苓茑茚茆茔茕苠苕茜荑荛荜茈莒茼茴茱莛荞茯荏荇荃荟荀茗荠茭茺茳荦荥"
		],
		[
			"dd40",
			"軥",
			62
		],
		[
			"dd80",
			"輤",
			32,
			"荨茛荩荬荪荭荮莰荸莳莴莠莪莓莜莅荼莶莩荽莸荻莘莞莨莺莼菁萁菥菘堇萘萋菝菽菖萜萸萑萆菔菟萏萃菸菹菪菅菀萦菰菡葜葑葚葙葳蒇蒈葺蒉葸萼葆葩葶蒌蒎萱葭蓁蓍蓐蓦蒽蓓蓊蒿蒺蓠蒡蒹蒴蒗蓥蓣蔌甍蔸蓰蔹蔟蔺"
		],
		[
			"de40",
			"轅",
			32,
			"轪辀辌辒辝辠辡辢辤辥辦辧辪辬辭辮辯農辳辴辵辷辸辺辻込辿迀迃迆"
		],
		[
			"de80",
			"迉",
			4,
			"迏迒迖迗迚迠迡迣迧迬迯迱迲迴迵迶迺迻迼迾迿逇逈逌逎逓逕逘蕖蔻蓿蓼蕙蕈蕨蕤蕞蕺瞢蕃蕲蕻薤薨薇薏蕹薮薜薅薹薷薰藓藁藜藿蘧蘅蘩蘖蘼廾弈夼奁耷奕奚奘匏尢尥尬尴扌扪抟抻拊拚拗拮挢拶挹捋捃掭揶捱捺掎掴捭掬掊捩掮掼揲揸揠揿揄揞揎摒揆掾摅摁搋搛搠搌搦搡摞撄摭撖"
		],
		[
			"df40",
			"這逜連逤逥逧",
			5,
			"逰",
			4,
			"逷逹逺逽逿遀遃遅遆遈",
			4,
			"過達違遖遙遚遜",
			5,
			"遤遦遧適遪遫遬遯",
			4,
			"遶",
			6,
			"遾邁"
		],
		[
			"df80",
			"還邅邆邇邉邊邌",
			4,
			"邒邔邖邘邚邜邞邟邠邤邥邧邨邩邫邭邲邷邼邽邿郀摺撷撸撙撺擀擐擗擤擢攉攥攮弋忒甙弑卟叱叽叩叨叻吒吖吆呋呒呓呔呖呃吡呗呙吣吲咂咔呷呱呤咚咛咄呶呦咝哐咭哂咴哒咧咦哓哔呲咣哕咻咿哌哙哚哜咩咪咤哝哏哞唛哧唠哽唔哳唢唣唏唑唧唪啧喏喵啉啭啁啕唿啐唼"
		],
		[
			"e040",
			"郂郃郆郈郉郋郌郍郒郔郕郖郘郙郚郞郟郠郣郤郥郩郪郬郮郰郱郲郳郵郶郷郹郺郻郼郿鄀鄁鄃鄅",
			19,
			"鄚鄛鄜"
		],
		[
			"e080",
			"鄝鄟鄠鄡鄤",
			10,
			"鄰鄲",
			6,
			"鄺",
			8,
			"酄唷啖啵啶啷唳唰啜喋嗒喃喱喹喈喁喟啾嗖喑啻嗟喽喾喔喙嗪嗷嗉嘟嗑嗫嗬嗔嗦嗝嗄嗯嗥嗲嗳嗌嗍嗨嗵嗤辔嘞嘈嘌嘁嘤嘣嗾嘀嘧嘭噘嘹噗嘬噍噢噙噜噌噔嚆噤噱噫噻噼嚅嚓嚯囔囗囝囡囵囫囹囿圄圊圉圜帏帙帔帑帱帻帼"
		],
		[
			"e140",
			"酅酇酈酑酓酔酕酖酘酙酛酜酟酠酦酧酨酫酭酳酺酻酼醀",
			4,
			"醆醈醊醎醏醓",
			6,
			"醜",
			5,
			"醤",
			5,
			"醫醬醰醱醲醳醶醷醸醹醻"
		],
		[
			"e180",
			"醼",
			10,
			"釈釋釐釒",
			9,
			"針",
			8,
			"帷幄幔幛幞幡岌屺岍岐岖岈岘岙岑岚岜岵岢岽岬岫岱岣峁岷峄峒峤峋峥崂崃崧崦崮崤崞崆崛嵘崾崴崽嵬嵛嵯嵝嵫嵋嵊嵩嵴嶂嶙嶝豳嶷巅彳彷徂徇徉後徕徙徜徨徭徵徼衢彡犭犰犴犷犸狃狁狎狍狒狨狯狩狲狴狷猁狳猃狺"
		],
		[
			"e240",
			"釦",
			62
		],
		[
			"e280",
			"鈥",
			32,
			"狻猗猓猡猊猞猝猕猢猹猥猬猸猱獐獍獗獠獬獯獾舛夥飧夤夂饣饧",
			5,
			"饴饷饽馀馄馇馊馍馐馑馓馔馕庀庑庋庖庥庠庹庵庾庳赓廒廑廛廨廪膺忄忉忖忏怃忮怄忡忤忾怅怆忪忭忸怙怵怦怛怏怍怩怫怊怿怡恸恹恻恺恂"
		],
		[
			"e340",
			"鉆",
			45,
			"鉵",
			16
		],
		[
			"e380",
			"銆",
			7,
			"銏",
			24,
			"恪恽悖悚悭悝悃悒悌悛惬悻悱惝惘惆惚悴愠愦愕愣惴愀愎愫慊慵憬憔憧憷懔懵忝隳闩闫闱闳闵闶闼闾阃阄阆阈阊阋阌阍阏阒阕阖阗阙阚丬爿戕氵汔汜汊沣沅沐沔沌汨汩汴汶沆沩泐泔沭泷泸泱泗沲泠泖泺泫泮沱泓泯泾"
		],
		[
			"e440",
			"銨",
			5,
			"銯",
			24,
			"鋉",
			31
		],
		[
			"e480",
			"鋩",
			32,
			"洹洧洌浃浈洇洄洙洎洫浍洮洵洚浏浒浔洳涑浯涞涠浞涓涔浜浠浼浣渚淇淅淞渎涿淠渑淦淝淙渖涫渌涮渫湮湎湫溲湟溆湓湔渲渥湄滟溱溘滠漭滢溥溧溽溻溷滗溴滏溏滂溟潢潆潇漤漕滹漯漶潋潴漪漉漩澉澍澌潸潲潼潺濑"
		],
		[
			"e540",
			"錊",
			51,
			"錿",
			10
		],
		[
			"e580",
			"鍊",
			31,
			"鍫濉澧澹澶濂濡濮濞濠濯瀚瀣瀛瀹瀵灏灞宀宄宕宓宥宸甯骞搴寤寮褰寰蹇謇辶迓迕迥迮迤迩迦迳迨逅逄逋逦逑逍逖逡逵逶逭逯遄遑遒遐遨遘遢遛暹遴遽邂邈邃邋彐彗彖彘尻咫屐屙孱屣屦羼弪弩弭艴弼鬻屮妁妃妍妩妪妣"
		],
		[
			"e640",
			"鍬",
			34,
			"鎐",
			27
		],
		[
			"e680",
			"鎬",
			29,
			"鏋鏌鏍妗姊妫妞妤姒妲妯姗妾娅娆姝娈姣姘姹娌娉娲娴娑娣娓婀婧婊婕娼婢婵胬媪媛婷婺媾嫫媲嫒嫔媸嫠嫣嫱嫖嫦嫘嫜嬉嬗嬖嬲嬷孀尕尜孚孥孳孑孓孢驵驷驸驺驿驽骀骁骅骈骊骐骒骓骖骘骛骜骝骟骠骢骣骥骧纟纡纣纥纨纩"
		],
		[
			"e740",
			"鏎",
			7,
			"鏗",
			54
		],
		[
			"e780",
			"鐎",
			32,
			"纭纰纾绀绁绂绉绋绌绐绔绗绛绠绡绨绫绮绯绱绲缍绶绺绻绾缁缂缃缇缈缋缌缏缑缒缗缙缜缛缟缡",
			6,
			"缪缫缬缭缯",
			4,
			"缵幺畿巛甾邕玎玑玮玢玟珏珂珑玷玳珀珉珈珥珙顼琊珩珧珞玺珲琏琪瑛琦琥琨琰琮琬"
		],
		[
			"e840",
			"鐯",
			14,
			"鐿",
			43,
			"鑬鑭鑮鑯"
		],
		[
			"e880",
			"鑰",
			20,
			"钑钖钘铇铏铓铔铚铦铻锜锠琛琚瑁瑜瑗瑕瑙瑷瑭瑾璜璎璀璁璇璋璞璨璩璐璧瓒璺韪韫韬杌杓杞杈杩枥枇杪杳枘枧杵枨枞枭枋杷杼柰栉柘栊柩枰栌柙枵柚枳柝栀柃枸柢栎柁柽栲栳桠桡桎桢桄桤梃栝桕桦桁桧桀栾桊桉栩梵梏桴桷梓桫棂楮棼椟椠棹"
		],
		[
			"e940",
			"锧锳锽镃镈镋镕镚镠镮镴镵長",
			7,
			"門",
			42
		],
		[
			"e980",
			"閫",
			32,
			"椤棰椋椁楗棣椐楱椹楠楂楝榄楫榀榘楸椴槌榇榈槎榉楦楣楹榛榧榻榫榭槔榱槁槊槟榕槠榍槿樯槭樗樘橥槲橄樾檠橐橛樵檎橹樽樨橘橼檑檐檩檗檫猷獒殁殂殇殄殒殓殍殚殛殡殪轫轭轱轲轳轵轶轸轷轹轺轼轾辁辂辄辇辋"
		],
		[
			"ea40",
			"闌",
			27,
			"闬闿阇阓阘阛阞阠阣",
			6,
			"阫阬阭阯阰阷阸阹阺阾陁陃陊陎陏陑陒陓陖陗"
		],
		[
			"ea80",
			"陘陙陚陜陝陞陠陣陥陦陫陭",
			4,
			"陳陸",
			12,
			"隇隉隊辍辎辏辘辚軎戋戗戛戟戢戡戥戤戬臧瓯瓴瓿甏甑甓攴旮旯旰昊昙杲昃昕昀炅曷昝昴昱昶昵耆晟晔晁晏晖晡晗晷暄暌暧暝暾曛曜曦曩贲贳贶贻贽赀赅赆赈赉赇赍赕赙觇觊觋觌觎觏觐觑牮犟牝牦牯牾牿犄犋犍犏犒挈挲掰"
		],
		[
			"eb40",
			"隌階隑隒隓隕隖隚際隝",
			9,
			"隨",
			7,
			"隱隲隴隵隷隸隺隻隿雂雃雈雊雋雐雑雓雔雖",
			9,
			"雡",
			6,
			"雫"
		],
		[
			"eb80",
			"雬雭雮雰雱雲雴雵雸雺電雼雽雿霂霃霅霊霋霌霐霑霒霔霕霗",
			4,
			"霝霟霠搿擘耄毪毳毽毵毹氅氇氆氍氕氘氙氚氡氩氤氪氲攵敕敫牍牒牖爰虢刖肟肜肓肼朊肽肱肫肭肴肷胧胨胩胪胛胂胄胙胍胗朐胝胫胱胴胭脍脎胲胼朕脒豚脶脞脬脘脲腈腌腓腴腙腚腱腠腩腼腽腭腧塍媵膈膂膑滕膣膪臌朦臊膻"
		],
		[
			"ec40",
			"霡",
			8,
			"霫霬霮霯霱霳",
			4,
			"霺霻霼霽霿",
			18,
			"靔靕靗靘靚靜靝靟靣靤靦靧靨靪",
			7
		],
		[
			"ec80",
			"靲靵靷",
			4,
			"靽",
			7,
			"鞆",
			4,
			"鞌鞎鞏鞐鞓鞕鞖鞗鞙",
			4,
			"臁膦欤欷欹歃歆歙飑飒飓飕飙飚殳彀毂觳斐齑斓於旆旄旃旌旎旒旖炀炜炖炝炻烀炷炫炱烨烊焐焓焖焯焱煳煜煨煅煲煊煸煺熘熳熵熨熠燠燔燧燹爝爨灬焘煦熹戾戽扃扈扉礻祀祆祉祛祜祓祚祢祗祠祯祧祺禅禊禚禧禳忑忐"
		],
		[
			"ed40",
			"鞞鞟鞡鞢鞤",
			6,
			"鞬鞮鞰鞱鞳鞵",
			46
		],
		[
			"ed80",
			"韤韥韨韮",
			4,
			"韴韷",
			23,
			"怼恝恚恧恁恙恣悫愆愍慝憩憝懋懑戆肀聿沓泶淼矶矸砀砉砗砘砑斫砭砜砝砹砺砻砟砼砥砬砣砩硎硭硖硗砦硐硇硌硪碛碓碚碇碜碡碣碲碹碥磔磙磉磬磲礅磴礓礤礞礴龛黹黻黼盱眄眍盹眇眈眚眢眙眭眦眵眸睐睑睇睃睚睨"
		],
		[
			"ee40",
			"頏",
			62
		],
		[
			"ee80",
			"顎",
			32,
			"睢睥睿瞍睽瞀瞌瞑瞟瞠瞰瞵瞽町畀畎畋畈畛畲畹疃罘罡罟詈罨罴罱罹羁罾盍盥蠲钅钆钇钋钊钌钍钏钐钔钗钕钚钛钜钣钤钫钪钭钬钯钰钲钴钶",
			4,
			"钼钽钿铄铈",
			6,
			"铐铑铒铕铖铗铙铘铛铞铟铠铢铤铥铧铨铪"
		],
		[
			"ef40",
			"顯",
			5,
			"颋颎颒颕颙颣風",
			37,
			"飏飐飔飖飗飛飜飝飠",
			4
		],
		[
			"ef80",
			"飥飦飩",
			30,
			"铩铫铮铯铳铴铵铷铹铼铽铿锃锂锆锇锉锊锍锎锏锒",
			4,
			"锘锛锝锞锟锢锪锫锩锬锱锲锴锶锷锸锼锾锿镂锵镄镅镆镉镌镎镏镒镓镔镖镗镘镙镛镞镟镝镡镢镤",
			8,
			"镯镱镲镳锺矧矬雉秕秭秣秫稆嵇稃稂稞稔"
		],
		[
			"f040",
			"餈",
			4,
			"餎餏餑",
			28,
			"餯",
			26
		],
		[
			"f080",
			"饊",
			9,
			"饖",
			12,
			"饤饦饳饸饹饻饾馂馃馉稹稷穑黏馥穰皈皎皓皙皤瓞瓠甬鸠鸢鸨",
			4,
			"鸲鸱鸶鸸鸷鸹鸺鸾鹁鹂鹄鹆鹇鹈鹉鹋鹌鹎鹑鹕鹗鹚鹛鹜鹞鹣鹦",
			6,
			"鹱鹭鹳疒疔疖疠疝疬疣疳疴疸痄疱疰痃痂痖痍痣痨痦痤痫痧瘃痱痼痿瘐瘀瘅瘌瘗瘊瘥瘘瘕瘙"
		],
		[
			"f140",
			"馌馎馚",
			10,
			"馦馧馩",
			47
		],
		[
			"f180",
			"駙",
			32,
			"瘛瘼瘢瘠癀瘭瘰瘿瘵癃瘾瘳癍癞癔癜癖癫癯翊竦穸穹窀窆窈窕窦窠窬窨窭窳衤衩衲衽衿袂袢裆袷袼裉裢裎裣裥裱褚裼裨裾裰褡褙褓褛褊褴褫褶襁襦襻疋胥皲皴矜耒耔耖耜耠耢耥耦耧耩耨耱耋耵聃聆聍聒聩聱覃顸颀颃"
		],
		[
			"f240",
			"駺",
			62
		],
		[
			"f280",
			"騹",
			32,
			"颉颌颍颏颔颚颛颞颟颡颢颥颦虍虔虬虮虿虺虼虻蚨蚍蚋蚬蚝蚧蚣蚪蚓蚩蚶蛄蚵蛎蚰蚺蚱蚯蛉蛏蚴蛩蛱蛲蛭蛳蛐蜓蛞蛴蛟蛘蛑蜃蜇蛸蜈蜊蜍蜉蜣蜻蜞蜥蜮蜚蜾蝈蜴蜱蜩蜷蜿螂蜢蝽蝾蝻蝠蝰蝌蝮螋蝓蝣蝼蝤蝙蝥螓螯螨蟒"
		],
		[
			"f340",
			"驚",
			17,
			"驲骃骉骍骎骔骕骙骦骩",
			6,
			"骲骳骴骵骹骻骽骾骿髃髄髆",
			4,
			"髍髎髏髐髒體髕髖髗髙髚髛髜"
		],
		[
			"f380",
			"髝髞髠髢髣髤髥髧髨髩髪髬髮髰",
			8,
			"髺髼",
			6,
			"鬄鬅鬆蟆螈螅螭螗螃螫蟥螬螵螳蟋蟓螽蟑蟀蟊蟛蟪蟠蟮蠖蠓蟾蠊蠛蠡蠹蠼缶罂罄罅舐竺竽笈笃笄笕笊笫笏筇笸笪笙笮笱笠笥笤笳笾笞筘筚筅筵筌筝筠筮筻筢筲筱箐箦箧箸箬箝箨箅箪箜箢箫箴篑篁篌篝篚篥篦篪簌篾篼簏簖簋"
		],
		[
			"f440",
			"鬇鬉",
			5,
			"鬐鬑鬒鬔",
			10,
			"鬠鬡鬢鬤",
			10,
			"鬰鬱鬳",
			7,
			"鬽鬾鬿魀魆魊魋魌魎魐魒魓魕",
			5
		],
		[
			"f480",
			"魛",
			32,
			"簟簪簦簸籁籀臾舁舂舄臬衄舡舢舣舭舯舨舫舸舻舳舴舾艄艉艋艏艚艟艨衾袅袈裘裟襞羝羟羧羯羰羲籼敉粑粝粜粞粢粲粼粽糁糇糌糍糈糅糗糨艮暨羿翎翕翥翡翦翩翮翳糸絷綦綮繇纛麸麴赳趄趔趑趱赧赭豇豉酊酐酎酏酤"
		],
		[
			"f540",
			"魼",
			62
		],
		[
			"f580",
			"鮻",
			32,
			"酢酡酰酩酯酽酾酲酴酹醌醅醐醍醑醢醣醪醭醮醯醵醴醺豕鹾趸跫踅蹙蹩趵趿趼趺跄跖跗跚跞跎跏跛跆跬跷跸跣跹跻跤踉跽踔踝踟踬踮踣踯踺蹀踹踵踽踱蹉蹁蹂蹑蹒蹊蹰蹶蹼蹯蹴躅躏躔躐躜躞豸貂貊貅貘貔斛觖觞觚觜"
		],
		[
			"f640",
			"鯜",
			62
		],
		[
			"f680",
			"鰛",
			32,
			"觥觫觯訾謦靓雩雳雯霆霁霈霏霎霪霭霰霾龀龃龅",
			5,
			"龌黾鼋鼍隹隼隽雎雒瞿雠銎銮鋈錾鍪鏊鎏鐾鑫鱿鲂鲅鲆鲇鲈稣鲋鲎鲐鲑鲒鲔鲕鲚鲛鲞",
			5,
			"鲥",
			4,
			"鲫鲭鲮鲰",
			7,
			"鲺鲻鲼鲽鳄鳅鳆鳇鳊鳋"
		],
		[
			"f740",
			"鰼",
			62
		],
		[
			"f780",
			"鱻鱽鱾鲀鲃鲄鲉鲊鲌鲏鲓鲖鲗鲘鲙鲝鲪鲬鲯鲹鲾",
			4,
			"鳈鳉鳑鳒鳚鳛鳠鳡鳌",
			4,
			"鳓鳔鳕鳗鳘鳙鳜鳝鳟鳢靼鞅鞑鞒鞔鞯鞫鞣鞲鞴骱骰骷鹘骶骺骼髁髀髅髂髋髌髑魅魃魇魉魈魍魑飨餍餮饕饔髟髡髦髯髫髻髭髹鬈鬏鬓鬟鬣麽麾縻麂麇麈麋麒鏖麝麟黛黜黝黠黟黢黩黧黥黪黯鼢鼬鼯鼹鼷鼽鼾齄"
		],
		[
			"f840",
			"鳣",
			62
		],
		[
			"f880",
			"鴢",
			32
		],
		[
			"f940",
			"鵃",
			62
		],
		[
			"f980",
			"鶂",
			32
		],
		[
			"fa40",
			"鶣",
			62
		],
		[
			"fa80",
			"鷢",
			32
		],
		[
			"fb40",
			"鸃",
			27,
			"鸤鸧鸮鸰鸴鸻鸼鹀鹍鹐鹒鹓鹔鹖鹙鹝鹟鹠鹡鹢鹥鹮鹯鹲鹴",
			9,
			"麀"
		],
		[
			"fb80",
			"麁麃麄麅麆麉麊麌",
			5,
			"麔",
			8,
			"麞麠",
			5,
			"麧麨麩麪"
		],
		[
			"fc40",
			"麫",
			8,
			"麵麶麷麹麺麼麿",
			4,
			"黅黆黇黈黊黋黌黐黒黓黕黖黗黙黚點黡黣黤黦黨黫黬黭黮黰",
			8,
			"黺黽黿",
			6
		],
		[
			"fc80",
			"鼆",
			4,
			"鼌鼏鼑鼒鼔鼕鼖鼘鼚",
			5,
			"鼡鼣",
			8,
			"鼭鼮鼰鼱"
		],
		[
			"fd40",
			"鼲",
			4,
			"鼸鼺鼼鼿",
			4,
			"齅",
			10,
			"齒",
			38
		],
		[
			"fd80",
			"齹",
			5,
			"龁龂龍",
			11,
			"龜龝龞龡",
			4,
			"郎凉秊裏隣"
		],
		[
			"fe40",
			"兀嗀﨎﨏﨑﨓﨔礼﨟蘒﨡﨣﨤﨧﨨﨩"
		]
	];

/***/ },
/* 126 */
/***/ function(module, exports) {

	module.exports = [
		[
			"a140",
			"",
			62
		],
		[
			"a180",
			"",
			32
		],
		[
			"a240",
			"",
			62
		],
		[
			"a280",
			"",
			32
		],
		[
			"a2ab",
			"",
			5
		],
		[
			"a2e3",
			"€"
		],
		[
			"a2ef",
			""
		],
		[
			"a2fd",
			""
		],
		[
			"a340",
			"",
			62
		],
		[
			"a380",
			"",
			31,
			"　"
		],
		[
			"a440",
			"",
			62
		],
		[
			"a480",
			"",
			32
		],
		[
			"a4f4",
			"",
			10
		],
		[
			"a540",
			"",
			62
		],
		[
			"a580",
			"",
			32
		],
		[
			"a5f7",
			"",
			7
		],
		[
			"a640",
			"",
			62
		],
		[
			"a680",
			"",
			32
		],
		[
			"a6b9",
			"",
			7
		],
		[
			"a6d9",
			"",
			6
		],
		[
			"a6ec",
			""
		],
		[
			"a6f3",
			""
		],
		[
			"a6f6",
			"",
			8
		],
		[
			"a740",
			"",
			62
		],
		[
			"a780",
			"",
			32
		],
		[
			"a7c2",
			"",
			14
		],
		[
			"a7f2",
			"",
			12
		],
		[
			"a896",
			"",
			10
		],
		[
			"a8bc",
			""
		],
		[
			"a8bf",
			"ǹ"
		],
		[
			"a8c1",
			""
		],
		[
			"a8ea",
			"",
			20
		],
		[
			"a958",
			""
		],
		[
			"a95b",
			""
		],
		[
			"a95d",
			""
		],
		[
			"a989",
			"〾⿰",
			11
		],
		[
			"a997",
			"",
			12
		],
		[
			"a9f0",
			"",
			14
		],
		[
			"aaa1",
			"",
			93
		],
		[
			"aba1",
			"",
			93
		],
		[
			"aca1",
			"",
			93
		],
		[
			"ada1",
			"",
			93
		],
		[
			"aea1",
			"",
			93
		],
		[
			"afa1",
			"",
			93
		],
		[
			"d7fa",
			"",
			4
		],
		[
			"f8a1",
			"",
			93
		],
		[
			"f9a1",
			"",
			93
		],
		[
			"faa1",
			"",
			93
		],
		[
			"fba1",
			"",
			93
		],
		[
			"fca1",
			"",
			93
		],
		[
			"fda1",
			"",
			93
		],
		[
			"fe50",
			"⺁⺄㑳㑇⺈⺋㖞㘚㘎⺌⺗㥮㤘㧏㧟㩳㧐㭎㱮㳠⺧⺪䁖䅟⺮䌷⺳⺶⺷䎱䎬⺻䏝䓖䙡䙌"
		],
		[
			"fe80",
			"䜣䜩䝼䞍⻊䥇䥺䥽䦂䦃䦅䦆䦟䦛䦷䦶䲣䲟䲠䲡䱷䲢䴓",
			6,
			"䶮",
			93
		]
	];

/***/ },
/* 127 */
/***/ function(module, exports) {

	module.exports = {
		"uChars": [
			128,
			165,
			169,
			178,
			184,
			216,
			226,
			235,
			238,
			244,
			248,
			251,
			253,
			258,
			276,
			284,
			300,
			325,
			329,
			334,
			364,
			463,
			465,
			467,
			469,
			471,
			473,
			475,
			477,
			506,
			594,
			610,
			712,
			716,
			730,
			930,
			938,
			962,
			970,
			1026,
			1104,
			1106,
			8209,
			8215,
			8218,
			8222,
			8231,
			8241,
			8244,
			8246,
			8252,
			8365,
			8452,
			8454,
			8458,
			8471,
			8482,
			8556,
			8570,
			8596,
			8602,
			8713,
			8720,
			8722,
			8726,
			8731,
			8737,
			8740,
			8742,
			8748,
			8751,
			8760,
			8766,
			8777,
			8781,
			8787,
			8802,
			8808,
			8816,
			8854,
			8858,
			8870,
			8896,
			8979,
			9322,
			9372,
			9548,
			9588,
			9616,
			9622,
			9634,
			9652,
			9662,
			9672,
			9676,
			9680,
			9702,
			9735,
			9738,
			9793,
			9795,
			11906,
			11909,
			11913,
			11917,
			11928,
			11944,
			11947,
			11951,
			11956,
			11960,
			11964,
			11979,
			12284,
			12292,
			12312,
			12319,
			12330,
			12351,
			12436,
			12447,
			12535,
			12543,
			12586,
			12842,
			12850,
			12964,
			13200,
			13215,
			13218,
			13253,
			13263,
			13267,
			13270,
			13384,
			13428,
			13727,
			13839,
			13851,
			14617,
			14703,
			14801,
			14816,
			14964,
			15183,
			15471,
			15585,
			16471,
			16736,
			17208,
			17325,
			17330,
			17374,
			17623,
			17997,
			18018,
			18212,
			18218,
			18301,
			18318,
			18760,
			18811,
			18814,
			18820,
			18823,
			18844,
			18848,
			18872,
			19576,
			19620,
			19738,
			19887,
			40870,
			59244,
			59336,
			59367,
			59413,
			59417,
			59423,
			59431,
			59437,
			59443,
			59452,
			59460,
			59478,
			59493,
			63789,
			63866,
			63894,
			63976,
			63986,
			64016,
			64018,
			64021,
			64025,
			64034,
			64037,
			64042,
			65074,
			65093,
			65107,
			65112,
			65127,
			65132,
			65375,
			65510,
			65536
		],
		"gbChars": [
			0,
			36,
			38,
			45,
			50,
			81,
			89,
			95,
			96,
			100,
			103,
			104,
			105,
			109,
			126,
			133,
			148,
			172,
			175,
			179,
			208,
			306,
			307,
			308,
			309,
			310,
			311,
			312,
			313,
			341,
			428,
			443,
			544,
			545,
			558,
			741,
			742,
			749,
			750,
			805,
			819,
			820,
			7922,
			7924,
			7925,
			7927,
			7934,
			7943,
			7944,
			7945,
			7950,
			8062,
			8148,
			8149,
			8152,
			8164,
			8174,
			8236,
			8240,
			8262,
			8264,
			8374,
			8380,
			8381,
			8384,
			8388,
			8390,
			8392,
			8393,
			8394,
			8396,
			8401,
			8406,
			8416,
			8419,
			8424,
			8437,
			8439,
			8445,
			8482,
			8485,
			8496,
			8521,
			8603,
			8936,
			8946,
			9046,
			9050,
			9063,
			9066,
			9076,
			9092,
			9100,
			9108,
			9111,
			9113,
			9131,
			9162,
			9164,
			9218,
			9219,
			11329,
			11331,
			11334,
			11336,
			11346,
			11361,
			11363,
			11366,
			11370,
			11372,
			11375,
			11389,
			11682,
			11686,
			11687,
			11692,
			11694,
			11714,
			11716,
			11723,
			11725,
			11730,
			11736,
			11982,
			11989,
			12102,
			12336,
			12348,
			12350,
			12384,
			12393,
			12395,
			12397,
			12510,
			12553,
			12851,
			12962,
			12973,
			13738,
			13823,
			13919,
			13933,
			14080,
			14298,
			14585,
			14698,
			15583,
			15847,
			16318,
			16434,
			16438,
			16481,
			16729,
			17102,
			17122,
			17315,
			17320,
			17402,
			17418,
			17859,
			17909,
			17911,
			17915,
			17916,
			17936,
			17939,
			17961,
			18664,
			18703,
			18814,
			18962,
			19043,
			33469,
			33470,
			33471,
			33484,
			33485,
			33490,
			33497,
			33501,
			33505,
			33513,
			33520,
			33536,
			33550,
			37845,
			37921,
			37948,
			38029,
			38038,
			38064,
			38065,
			38066,
			38069,
			38075,
			38076,
			38078,
			39108,
			39109,
			39113,
			39114,
			39115,
			39116,
			39265,
			39394,
			189000
		]
	};

/***/ },
/* 128 */
/***/ function(module, exports) {

	module.exports = [
		[
			"0",
			"\u0000",
			127
		],
		[
			"8141",
			"갂갃갅갆갋",
			4,
			"갘갞갟갡갢갣갥",
			6,
			"갮갲갳갴"
		],
		[
			"8161",
			"갵갶갷갺갻갽갾갿걁",
			9,
			"걌걎",
			5,
			"걕"
		],
		[
			"8181",
			"걖걗걙걚걛걝",
			18,
			"걲걳걵걶걹걻",
			4,
			"겂겇겈겍겎겏겑겒겓겕",
			6,
			"겞겢",
			5,
			"겫겭겮겱",
			6,
			"겺겾겿곀곂곃곅곆곇곉곊곋곍",
			7,
			"곖곘",
			7,
			"곢곣곥곦곩곫곭곮곲곴곷",
			4,
			"곾곿괁괂괃괅괇",
			4,
			"괎괐괒괓"
		],
		[
			"8241",
			"괔괕괖괗괙괚괛괝괞괟괡",
			7,
			"괪괫괮",
			5
		],
		[
			"8261",
			"괶괷괹괺괻괽",
			6,
			"굆굈굊",
			5,
			"굑굒굓굕굖굗"
		],
		[
			"8281",
			"굙",
			7,
			"굢굤",
			7,
			"굮굯굱굲굷굸굹굺굾궀궃",
			4,
			"궊궋궍궎궏궑",
			10,
			"궞",
			5,
			"궥",
			17,
			"궸",
			7,
			"귂귃귅귆귇귉",
			6,
			"귒귔",
			7,
			"귝귞귟귡귢귣귥",
			18
		],
		[
			"8341",
			"귺귻귽귾긂",
			5,
			"긊긌긎",
			5,
			"긕",
			7
		],
		[
			"8361",
			"긝",
			18,
			"긲긳긵긶긹긻긼"
		],
		[
			"8381",
			"긽긾긿깂깄깇깈깉깋깏깑깒깓깕깗",
			4,
			"깞깢깣깤깦깧깪깫깭깮깯깱",
			6,
			"깺깾",
			5,
			"꺆",
			5,
			"꺍",
			46,
			"꺿껁껂껃껅",
			6,
			"껎껒",
			5,
			"껚껛껝",
			8
		],
		[
			"8441",
			"껦껧껩껪껬껮",
			5,
			"껵껶껷껹껺껻껽",
			8
		],
		[
			"8461",
			"꼆꼉꼊꼋꼌꼎꼏꼑",
			18
		],
		[
			"8481",
			"꼤",
			7,
			"꼮꼯꼱꼳꼵",
			6,
			"꼾꽀꽄꽅꽆꽇꽊",
			5,
			"꽑",
			10,
			"꽞",
			5,
			"꽦",
			18,
			"꽺",
			5,
			"꾁꾂꾃꾅꾆꾇꾉",
			6,
			"꾒꾓꾔꾖",
			5,
			"꾝",
			26,
			"꾺꾻꾽꾾"
		],
		[
			"8541",
			"꾿꿁",
			5,
			"꿊꿌꿏",
			4,
			"꿕",
			6,
			"꿝",
			4
		],
		[
			"8561",
			"꿢",
			5,
			"꿪",
			5,
			"꿲꿳꿵꿶꿷꿹",
			6,
			"뀂뀃"
		],
		[
			"8581",
			"뀅",
			6,
			"뀍뀎뀏뀑뀒뀓뀕",
			6,
			"뀞",
			9,
			"뀩",
			26,
			"끆끇끉끋끍끏끐끑끒끖끘끚끛끜끞",
			29,
			"끾끿낁낂낃낅",
			6,
			"낎낐낒",
			5,
			"낛낝낞낣낤"
		],
		[
			"8641",
			"낥낦낧낪낰낲낶낷낹낺낻낽",
			6,
			"냆냊",
			5,
			"냒"
		],
		[
			"8661",
			"냓냕냖냗냙",
			6,
			"냡냢냣냤냦",
			10
		],
		[
			"8681",
			"냱",
			22,
			"넊넍넎넏넑넔넕넖넗넚넞",
			4,
			"넦넧넩넪넫넭",
			6,
			"넶넺",
			5,
			"녂녃녅녆녇녉",
			6,
			"녒녓녖녗녙녚녛녝녞녟녡",
			22,
			"녺녻녽녾녿놁놃",
			4,
			"놊놌놎놏놐놑놕놖놗놙놚놛놝"
		],
		[
			"8741",
			"놞",
			9,
			"놩",
			15
		],
		[
			"8761",
			"놹",
			18,
			"뇍뇎뇏뇑뇒뇓뇕"
		],
		[
			"8781",
			"뇖",
			5,
			"뇞뇠",
			7,
			"뇪뇫뇭뇮뇯뇱",
			7,
			"뇺뇼뇾",
			5,
			"눆눇눉눊눍",
			6,
			"눖눘눚",
			5,
			"눡",
			18,
			"눵",
			6,
			"눽",
			26,
			"뉙뉚뉛뉝뉞뉟뉡",
			6,
			"뉪",
			4
		],
		[
			"8841",
			"뉯",
			4,
			"뉶",
			5,
			"뉽",
			6,
			"늆늇늈늊",
			4
		],
		[
			"8861",
			"늏늒늓늕늖늗늛",
			4,
			"늢늤늧늨늩늫늭늮늯늱늲늳늵늶늷"
		],
		[
			"8881",
			"늸",
			15,
			"닊닋닍닎닏닑닓",
			4,
			"닚닜닞닟닠닡닣닧닩닪닰닱닲닶닼닽닾댂댃댅댆댇댉",
			6,
			"댒댖",
			5,
			"댝",
			54,
			"덗덙덚덝덠덡덢덣"
		],
		[
			"8941",
			"덦덨덪덬덭덯덲덳덵덶덷덹",
			6,
			"뎂뎆",
			5,
			"뎍"
		],
		[
			"8961",
			"뎎뎏뎑뎒뎓뎕",
			10,
			"뎢",
			5,
			"뎩뎪뎫뎭"
		],
		[
			"8981",
			"뎮",
			21,
			"돆돇돉돊돍돏돑돒돓돖돘돚돜돞돟돡돢돣돥돦돧돩",
			18,
			"돽",
			18,
			"됑",
			6,
			"됙됚됛됝됞됟됡",
			6,
			"됪됬",
			7,
			"됵",
			15
		],
		[
			"8a41",
			"둅",
			10,
			"둒둓둕둖둗둙",
			6,
			"둢둤둦"
		],
		[
			"8a61",
			"둧",
			4,
			"둭",
			18,
			"뒁뒂"
		],
		[
			"8a81",
			"뒃",
			4,
			"뒉",
			19,
			"뒞",
			5,
			"뒥뒦뒧뒩뒪뒫뒭",
			7,
			"뒶뒸뒺",
			5,
			"듁듂듃듅듆듇듉",
			6,
			"듑듒듓듔듖",
			5,
			"듞듟듡듢듥듧",
			4,
			"듮듰듲",
			5,
			"듹",
			26,
			"딖딗딙딚딝"
		],
		[
			"8b41",
			"딞",
			5,
			"딦딫",
			4,
			"딲딳딵딶딷딹",
			6,
			"땂땆"
		],
		[
			"8b61",
			"땇땈땉땊땎땏땑땒땓땕",
			6,
			"땞땢",
			8
		],
		[
			"8b81",
			"땫",
			52,
			"떢떣떥떦떧떩떬떭떮떯떲떶",
			4,
			"떾떿뗁뗂뗃뗅",
			6,
			"뗎뗒",
			5,
			"뗙",
			18,
			"뗭",
			18
		],
		[
			"8c41",
			"똀",
			15,
			"똒똓똕똖똗똙",
			4
		],
		[
			"8c61",
			"똞",
			6,
			"똦",
			5,
			"똭",
			6,
			"똵",
			5
		],
		[
			"8c81",
			"똻",
			12,
			"뙉",
			26,
			"뙥뙦뙧뙩",
			50,
			"뚞뚟뚡뚢뚣뚥",
			5,
			"뚭뚮뚯뚰뚲",
			16
		],
		[
			"8d41",
			"뛃",
			16,
			"뛕",
			8
		],
		[
			"8d61",
			"뛞",
			17,
			"뛱뛲뛳뛵뛶뛷뛹뛺"
		],
		[
			"8d81",
			"뛻",
			4,
			"뜂뜃뜄뜆",
			33,
			"뜪뜫뜭뜮뜱",
			6,
			"뜺뜼",
			7,
			"띅띆띇띉띊띋띍",
			6,
			"띖",
			9,
			"띡띢띣띥띦띧띩",
			6,
			"띲띴띶",
			5,
			"띾띿랁랂랃랅",
			6,
			"랎랓랔랕랚랛랝랞"
		],
		[
			"8e41",
			"랟랡",
			6,
			"랪랮",
			5,
			"랶랷랹",
			8
		],
		[
			"8e61",
			"럂",
			4,
			"럈럊",
			19
		],
		[
			"8e81",
			"럞",
			13,
			"럮럯럱럲럳럵",
			6,
			"럾렂",
			4,
			"렊렋렍렎렏렑",
			6,
			"렚렜렞",
			5,
			"렦렧렩렪렫렭",
			6,
			"렶렺",
			5,
			"롁롂롃롅",
			11,
			"롒롔",
			7,
			"롞롟롡롢롣롥",
			6,
			"롮롰롲",
			5,
			"롹롺롻롽",
			7
		],
		[
			"8f41",
			"뢅",
			7,
			"뢎",
			17
		],
		[
			"8f61",
			"뢠",
			7,
			"뢩",
			6,
			"뢱뢲뢳뢵뢶뢷뢹",
			4
		],
		[
			"8f81",
			"뢾뢿룂룄룆",
			5,
			"룍룎룏룑룒룓룕",
			7,
			"룞룠룢",
			5,
			"룪룫룭룮룯룱",
			6,
			"룺룼룾",
			5,
			"뤅",
			18,
			"뤙",
			6,
			"뤡",
			26,
			"뤾뤿륁륂륃륅",
			6,
			"륍륎륐륒",
			5
		],
		[
			"9041",
			"륚륛륝륞륟륡",
			6,
			"륪륬륮",
			5,
			"륶륷륹륺륻륽"
		],
		[
			"9061",
			"륾",
			5,
			"릆릈릋릌릏",
			15
		],
		[
			"9081",
			"릟",
			12,
			"릮릯릱릲릳릵",
			6,
			"릾맀맂",
			5,
			"맊맋맍맓",
			4,
			"맚맜맟맠맢맦맧맩맪맫맭",
			6,
			"맶맻",
			4,
			"먂",
			5,
			"먉",
			11,
			"먖",
			33,
			"먺먻먽먾먿멁멃멄멅멆"
		],
		[
			"9141",
			"멇멊멌멏멐멑멒멖멗멙멚멛멝",
			6,
			"멦멪",
			5
		],
		[
			"9161",
			"멲멳멵멶멷멹",
			9,
			"몆몈몉몊몋몍",
			5
		],
		[
			"9181",
			"몓",
			20,
			"몪몭몮몯몱몳",
			4,
			"몺몼몾",
			5,
			"뫅뫆뫇뫉",
			14,
			"뫚",
			33,
			"뫽뫾뫿묁묂묃묅",
			7,
			"묎묐묒",
			5,
			"묙묚묛묝묞묟묡",
			6
		],
		[
			"9241",
			"묨묪묬",
			7,
			"묷묹묺묿",
			4,
			"뭆뭈뭊뭋뭌뭎뭑뭒"
		],
		[
			"9261",
			"뭓뭕뭖뭗뭙",
			7,
			"뭢뭤",
			7,
			"뭭",
			4
		],
		[
			"9281",
			"뭲",
			21,
			"뮉뮊뮋뮍뮎뮏뮑",
			18,
			"뮥뮦뮧뮩뮪뮫뮭",
			6,
			"뮵뮶뮸",
			7,
			"믁믂믃믅믆믇믉",
			6,
			"믑믒믔",
			35,
			"믺믻믽믾밁"
		],
		[
			"9341",
			"밃",
			4,
			"밊밎밐밒밓밙밚밠밡밢밣밦밨밪밫밬밮밯밲밳밵"
		],
		[
			"9361",
			"밶밷밹",
			6,
			"뱂뱆뱇뱈뱊뱋뱎뱏뱑",
			8
		],
		[
			"9381",
			"뱚뱛뱜뱞",
			37,
			"벆벇벉벊벍벏",
			4,
			"벖벘벛",
			4,
			"벢벣벥벦벩",
			6,
			"벲벶",
			5,
			"벾벿볁볂볃볅",
			7,
			"볎볒볓볔볖볗볙볚볛볝",
			22,
			"볷볹볺볻볽"
		],
		[
			"9441",
			"볾",
			5,
			"봆봈봊",
			5,
			"봑봒봓봕",
			8
		],
		[
			"9461",
			"봞",
			5,
			"봥",
			6,
			"봭",
			12
		],
		[
			"9481",
			"봺",
			5,
			"뵁",
			6,
			"뵊뵋뵍뵎뵏뵑",
			6,
			"뵚",
			9,
			"뵥뵦뵧뵩",
			22,
			"붂붃붅붆붋",
			4,
			"붒붔붖붗붘붛붝",
			6,
			"붥",
			10,
			"붱",
			6,
			"붹",
			24
		],
		[
			"9541",
			"뷒뷓뷖뷗뷙뷚뷛뷝",
			11,
			"뷪",
			5,
			"뷱"
		],
		[
			"9561",
			"뷲뷳뷵뷶뷷뷹",
			6,
			"븁븂븄븆",
			5,
			"븎븏븑븒븓"
		],
		[
			"9581",
			"븕",
			6,
			"븞븠",
			35,
			"빆빇빉빊빋빍빏",
			4,
			"빖빘빜빝빞빟빢빣빥빦빧빩빫",
			4,
			"빲빶",
			4,
			"빾빿뺁뺂뺃뺅",
			6,
			"뺎뺒",
			5,
			"뺚",
			13,
			"뺩",
			14
		],
		[
			"9641",
			"뺸",
			23,
			"뻒뻓"
		],
		[
			"9661",
			"뻕뻖뻙",
			6,
			"뻡뻢뻦",
			5,
			"뻭",
			8
		],
		[
			"9681",
			"뻶",
			10,
			"뼂",
			5,
			"뼊",
			13,
			"뼚뼞",
			33,
			"뽂뽃뽅뽆뽇뽉",
			6,
			"뽒뽓뽔뽖",
			44
		],
		[
			"9741",
			"뾃",
			16,
			"뾕",
			8
		],
		[
			"9761",
			"뾞",
			17,
			"뾱",
			7
		],
		[
			"9781",
			"뾹",
			11,
			"뿆",
			5,
			"뿎뿏뿑뿒뿓뿕",
			6,
			"뿝뿞뿠뿢",
			89,
			"쀽쀾쀿"
		],
		[
			"9841",
			"쁀",
			16,
			"쁒",
			5,
			"쁙쁚쁛"
		],
		[
			"9861",
			"쁝쁞쁟쁡",
			6,
			"쁪",
			15
		],
		[
			"9881",
			"쁺",
			21,
			"삒삓삕삖삗삙",
			6,
			"삢삤삦",
			5,
			"삮삱삲삷",
			4,
			"삾샂샃샄샆샇샊샋샍샎샏샑",
			6,
			"샚샞",
			5,
			"샦샧샩샪샫샭",
			6,
			"샶샸샺",
			5,
			"섁섂섃섅섆섇섉",
			6,
			"섑섒섓섔섖",
			5,
			"섡섢섥섨섩섪섫섮"
		],
		[
			"9941",
			"섲섳섴섵섷섺섻섽섾섿셁",
			6,
			"셊셎",
			5,
			"셖셗"
		],
		[
			"9961",
			"셙셚셛셝",
			6,
			"셦셪",
			5,
			"셱셲셳셵셶셷셹셺셻"
		],
		[
			"9981",
			"셼",
			8,
			"솆",
			5,
			"솏솑솒솓솕솗",
			4,
			"솞솠솢솣솤솦솧솪솫솭솮솯솱",
			11,
			"솾",
			5,
			"쇅쇆쇇쇉쇊쇋쇍",
			6,
			"쇕쇖쇙",
			6,
			"쇡쇢쇣쇥쇦쇧쇩",
			6,
			"쇲쇴",
			7,
			"쇾쇿숁숂숃숅",
			6,
			"숎숐숒",
			5,
			"숚숛숝숞숡숢숣"
		],
		[
			"9a41",
			"숤숥숦숧숪숬숮숰숳숵",
			16
		],
		[
			"9a61",
			"쉆쉇쉉",
			6,
			"쉒쉓쉕쉖쉗쉙",
			6,
			"쉡쉢쉣쉤쉦"
		],
		[
			"9a81",
			"쉧",
			4,
			"쉮쉯쉱쉲쉳쉵",
			6,
			"쉾슀슂",
			5,
			"슊",
			5,
			"슑",
			6,
			"슙슚슜슞",
			5,
			"슦슧슩슪슫슮",
			5,
			"슶슸슺",
			33,
			"싞싟싡싢싥",
			5,
			"싮싰싲싳싴싵싷싺싽싾싿쌁",
			6,
			"쌊쌋쌎쌏"
		],
		[
			"9b41",
			"쌐쌑쌒쌖쌗쌙쌚쌛쌝",
			6,
			"쌦쌧쌪",
			8
		],
		[
			"9b61",
			"쌳",
			17,
			"썆",
			7
		],
		[
			"9b81",
			"썎",
			25,
			"썪썫썭썮썯썱썳",
			4,
			"썺썻썾",
			5,
			"쎅쎆쎇쎉쎊쎋쎍",
			50,
			"쏁",
			22,
			"쏚"
		],
		[
			"9c41",
			"쏛쏝쏞쏡쏣",
			4,
			"쏪쏫쏬쏮",
			5,
			"쏶쏷쏹",
			5
		],
		[
			"9c61",
			"쏿",
			8,
			"쐉",
			6,
			"쐑",
			9
		],
		[
			"9c81",
			"쐛",
			8,
			"쐥",
			6,
			"쐭쐮쐯쐱쐲쐳쐵",
			6,
			"쐾",
			9,
			"쑉",
			26,
			"쑦쑧쑩쑪쑫쑭",
			6,
			"쑶쑷쑸쑺",
			5,
			"쒁",
			18,
			"쒕",
			6,
			"쒝",
			12
		],
		[
			"9d41",
			"쒪",
			13,
			"쒹쒺쒻쒽",
			8
		],
		[
			"9d61",
			"쓆",
			25
		],
		[
			"9d81",
			"쓠",
			8,
			"쓪",
			5,
			"쓲쓳쓵쓶쓷쓹쓻쓼쓽쓾씂",
			9,
			"씍씎씏씑씒씓씕",
			6,
			"씝",
			10,
			"씪씫씭씮씯씱",
			6,
			"씺씼씾",
			5,
			"앆앇앋앏앐앑앒앖앚앛앜앟앢앣앥앦앧앩",
			6,
			"앲앶",
			5,
			"앾앿얁얂얃얅얆얈얉얊얋얎얐얒얓얔"
		],
		[
			"9e41",
			"얖얙얚얛얝얞얟얡",
			7,
			"얪",
			9,
			"얶"
		],
		[
			"9e61",
			"얷얺얿",
			4,
			"엋엍엏엒엓엕엖엗엙",
			6,
			"엢엤엦엧"
		],
		[
			"9e81",
			"엨엩엪엫엯엱엲엳엵엸엹엺엻옂옃옄옉옊옋옍옎옏옑",
			6,
			"옚옝",
			6,
			"옦옧옩옪옫옯옱옲옶옸옺옼옽옾옿왂왃왅왆왇왉",
			6,
			"왒왖",
			5,
			"왞왟왡",
			10,
			"왭왮왰왲",
			5,
			"왺왻왽왾왿욁",
			6,
			"욊욌욎",
			5,
			"욖욗욙욚욛욝",
			6,
			"욦"
		],
		[
			"9f41",
			"욨욪",
			5,
			"욲욳욵욶욷욻",
			4,
			"웂웄웆",
			5,
			"웎"
		],
		[
			"9f61",
			"웏웑웒웓웕",
			6,
			"웞웟웢",
			5,
			"웪웫웭웮웯웱웲"
		],
		[
			"9f81",
			"웳",
			4,
			"웺웻웼웾",
			5,
			"윆윇윉윊윋윍",
			6,
			"윖윘윚",
			5,
			"윢윣윥윦윧윩",
			6,
			"윲윴윶윸윹윺윻윾윿읁읂읃읅",
			4,
			"읋읎읐읙읚읛읝읞읟읡",
			6,
			"읩읪읬",
			7,
			"읶읷읹읺읻읿잀잁잂잆잋잌잍잏잒잓잕잙잛",
			4,
			"잢잧",
			4,
			"잮잯잱잲잳잵잶잷"
		],
		[
			"a041",
			"잸잹잺잻잾쟂",
			5,
			"쟊쟋쟍쟏쟑",
			6,
			"쟙쟚쟛쟜"
		],
		[
			"a061",
			"쟞",
			5,
			"쟥쟦쟧쟩쟪쟫쟭",
			13
		],
		[
			"a081",
			"쟻",
			4,
			"젂젃젅젆젇젉젋",
			4,
			"젒젔젗",
			4,
			"젞젟젡젢젣젥",
			6,
			"젮젰젲",
			5,
			"젹젺젻젽젾젿졁",
			6,
			"졊졋졎",
			5,
			"졕",
			26,
			"졲졳졵졶졷졹졻",
			4,
			"좂좄좈좉좊좎",
			5,
			"좕",
			7,
			"좞좠좢좣좤"
		],
		[
			"a141",
			"좥좦좧좩",
			18,
			"좾좿죀죁"
		],
		[
			"a161",
			"죂죃죅죆죇죉죊죋죍",
			6,
			"죖죘죚",
			5,
			"죢죣죥"
		],
		[
			"a181",
			"죦",
			14,
			"죶",
			5,
			"죾죿줁줂줃줇",
			4,
			"줎　、。·‥…¨〃­―∥＼∼‘’“”〔〕〈",
			9,
			"±×÷≠≤≥∞∴°′″℃Å￠￡￥♂♀∠⊥⌒∂∇≡≒§※☆★○●◎◇◆□■△▲▽▼→←↑↓↔〓≪≫√∽∝∵∫∬∈∋⊆⊇⊂⊃∪∩∧∨￢"
		],
		[
			"a241",
			"줐줒",
			5,
			"줙",
			18
		],
		[
			"a261",
			"줭",
			6,
			"줵",
			18
		],
		[
			"a281",
			"쥈",
			7,
			"쥒쥓쥕쥖쥗쥙",
			6,
			"쥢쥤",
			7,
			"쥭쥮쥯⇒⇔∀∃´～ˇ˘˝˚˙¸˛¡¿ː∮∑∏¤℉‰◁◀▷▶♤♠♡♥♧♣⊙◈▣◐◑▒▤▥▨▧▦▩♨☏☎☜☞¶†‡↕↗↙↖↘♭♩♪♬㉿㈜№㏇™㏂㏘℡€®"
		],
		[
			"a341",
			"쥱쥲쥳쥵",
			6,
			"쥽",
			10,
			"즊즋즍즎즏"
		],
		[
			"a361",
			"즑",
			6,
			"즚즜즞",
			16
		],
		[
			"a381",
			"즯",
			16,
			"짂짃짅짆짉짋",
			4,
			"짒짔짗짘짛！",
			58,
			"￦］",
			32,
			"￣"
		],
		[
			"a441",
			"짞짟짡짣짥짦짨짩짪짫짮짲",
			5,
			"짺짻짽짾짿쨁쨂쨃쨄"
		],
		[
			"a461",
			"쨅쨆쨇쨊쨎",
			5,
			"쨕쨖쨗쨙",
			12
		],
		[
			"a481",
			"쨦쨧쨨쨪",
			28,
			"ㄱ",
			93
		],
		[
			"a541",
			"쩇",
			4,
			"쩎쩏쩑쩒쩓쩕",
			6,
			"쩞쩢",
			5,
			"쩩쩪"
		],
		[
			"a561",
			"쩫",
			17,
			"쩾",
			5,
			"쪅쪆"
		],
		[
			"a581",
			"쪇",
			16,
			"쪙",
			14,
			"ⅰ",
			9
		],
		[
			"a5b0",
			"Ⅰ",
			9
		],
		[
			"a5c1",
			"Α",
			16,
			"Σ",
			6
		],
		[
			"a5e1",
			"α",
			16,
			"σ",
			6
		],
		[
			"a641",
			"쪨",
			19,
			"쪾쪿쫁쫂쫃쫅"
		],
		[
			"a661",
			"쫆",
			5,
			"쫎쫐쫒쫔쫕쫖쫗쫚",
			5,
			"쫡",
			6
		],
		[
			"a681",
			"쫨쫩쫪쫫쫭",
			6,
			"쫵",
			18,
			"쬉쬊─│┌┐┘└├┬┤┴┼━┃┏┓┛┗┣┳┫┻╋┠┯┨┷┿┝┰┥┸╂┒┑┚┙┖┕┎┍┞┟┡┢┦┧┩┪┭┮┱┲┵┶┹┺┽┾╀╁╃",
			7
		],
		[
			"a741",
			"쬋",
			4,
			"쬑쬒쬓쬕쬖쬗쬙",
			6,
			"쬢",
			7
		],
		[
			"a761",
			"쬪",
			22,
			"쭂쭃쭄"
		],
		[
			"a781",
			"쭅쭆쭇쭊쭋쭍쭎쭏쭑",
			6,
			"쭚쭛쭜쭞",
			5,
			"쭥",
			7,
			"㎕㎖㎗ℓ㎘㏄㎣㎤㎥㎦㎙",
			9,
			"㏊㎍㎎㎏㏏㎈㎉㏈㎧㎨㎰",
			9,
			"㎀",
			4,
			"㎺",
			5,
			"㎐",
			4,
			"Ω㏀㏁㎊㎋㎌㏖㏅㎭㎮㎯㏛㎩㎪㎫㎬㏝㏐㏓㏃㏉㏜㏆"
		],
		[
			"a841",
			"쭭",
			10,
			"쭺",
			14
		],
		[
			"a861",
			"쮉",
			18,
			"쮝",
			6
		],
		[
			"a881",
			"쮤",
			19,
			"쮹",
			11,
			"ÆÐªĦ"
		],
		[
			"a8a6",
			"Ĳ"
		],
		[
			"a8a8",
			"ĿŁØŒºÞŦŊ"
		],
		[
			"a8b1",
			"㉠",
			27,
			"ⓐ",
			25,
			"①",
			14,
			"½⅓⅔¼¾⅛⅜⅝⅞"
		],
		[
			"a941",
			"쯅",
			14,
			"쯕",
			10
		],
		[
			"a961",
			"쯠쯡쯢쯣쯥쯦쯨쯪",
			18
		],
		[
			"a981",
			"쯽",
			14,
			"찎찏찑찒찓찕",
			6,
			"찞찟찠찣찤æđðħıĳĸŀłøœßþŧŋŉ㈀",
			27,
			"⒜",
			25,
			"⑴",
			14,
			"¹²³⁴ⁿ₁₂₃₄"
		],
		[
			"aa41",
			"찥찦찪찫찭찯찱",
			6,
			"찺찿",
			4,
			"챆챇챉챊챋챍챎"
		],
		[
			"aa61",
			"챏",
			4,
			"챖챚",
			5,
			"챡챢챣챥챧챩",
			6,
			"챱챲"
		],
		[
			"aa81",
			"챳챴챶",
			29,
			"ぁ",
			82
		],
		[
			"ab41",
			"첔첕첖첗첚첛첝첞첟첡",
			6,
			"첪첮",
			5,
			"첶첷첹"
		],
		[
			"ab61",
			"첺첻첽",
			6,
			"쳆쳈쳊",
			5,
			"쳑쳒쳓쳕",
			5
		],
		[
			"ab81",
			"쳛",
			8,
			"쳥",
			6,
			"쳭쳮쳯쳱",
			12,
			"ァ",
			85
		],
		[
			"ac41",
			"쳾쳿촀촂",
			5,
			"촊촋촍촎촏촑",
			6,
			"촚촜촞촟촠"
		],
		[
			"ac61",
			"촡촢촣촥촦촧촩촪촫촭",
			11,
			"촺",
			4
		],
		[
			"ac81",
			"촿",
			28,
			"쵝쵞쵟А",
			5,
			"ЁЖ",
			25
		],
		[
			"acd1",
			"а",
			5,
			"ёж",
			25
		],
		[
			"ad41",
			"쵡쵢쵣쵥",
			6,
			"쵮쵰쵲",
			5,
			"쵹",
			7
		],
		[
			"ad61",
			"춁",
			6,
			"춉",
			10,
			"춖춗춙춚춛춝춞춟"
		],
		[
			"ad81",
			"춠춡춢춣춦춨춪",
			5,
			"춱",
			18,
			"췅"
		],
		[
			"ae41",
			"췆",
			5,
			"췍췎췏췑",
			16
		],
		[
			"ae61",
			"췢",
			5,
			"췩췪췫췭췮췯췱",
			6,
			"췺췼췾",
			4
		],
		[
			"ae81",
			"츃츅츆츇츉츊츋츍",
			6,
			"츕츖츗츘츚",
			5,
			"츢츣츥츦츧츩츪츫"
		],
		[
			"af41",
			"츬츭츮츯츲츴츶",
			19
		],
		[
			"af61",
			"칊",
			13,
			"칚칛칝칞칢",
			5,
			"칪칬"
		],
		[
			"af81",
			"칮",
			5,
			"칶칷칹칺칻칽",
			6,
			"캆캈캊",
			5,
			"캒캓캕캖캗캙"
		],
		[
			"b041",
			"캚",
			5,
			"캢캦",
			5,
			"캮",
			12
		],
		[
			"b061",
			"캻",
			5,
			"컂",
			19
		],
		[
			"b081",
			"컖",
			13,
			"컦컧컩컪컭",
			6,
			"컶컺",
			5,
			"가각간갇갈갉갊감",
			7,
			"같",
			4,
			"갠갤갬갭갯갰갱갸갹갼걀걋걍걔걘걜거걱건걷걸걺검겁것겄겅겆겉겊겋게겐겔겜겝겟겠겡겨격겪견겯결겸겹겻겼경곁계곈곌곕곗고곡곤곧골곪곬곯곰곱곳공곶과곽관괄괆"
		],
		[
			"b141",
			"켂켃켅켆켇켉",
			6,
			"켒켔켖",
			5,
			"켝켞켟켡켢켣"
		],
		[
			"b161",
			"켥",
			6,
			"켮켲",
			5,
			"켹",
			11
		],
		[
			"b181",
			"콅",
			14,
			"콖콗콙콚콛콝",
			6,
			"콦콨콪콫콬괌괍괏광괘괜괠괩괬괭괴괵괸괼굄굅굇굉교굔굘굡굣구국군굳굴굵굶굻굼굽굿궁궂궈궉권궐궜궝궤궷귀귁귄귈귐귑귓규균귤그극근귿글긁금급긋긍긔기긱긴긷길긺김깁깃깅깆깊까깍깎깐깔깖깜깝깟깠깡깥깨깩깬깰깸"
		],
		[
			"b241",
			"콭콮콯콲콳콵콶콷콹",
			6,
			"쾁쾂쾃쾄쾆",
			5,
			"쾍"
		],
		[
			"b261",
			"쾎",
			18,
			"쾢",
			5,
			"쾩"
		],
		[
			"b281",
			"쾪",
			5,
			"쾱",
			18,
			"쿅",
			6,
			"깹깻깼깽꺄꺅꺌꺼꺽꺾껀껄껌껍껏껐껑께껙껜껨껫껭껴껸껼꼇꼈꼍꼐꼬꼭꼰꼲꼴꼼꼽꼿꽁꽂꽃꽈꽉꽐꽜꽝꽤꽥꽹꾀꾄꾈꾐꾑꾕꾜꾸꾹꾼꿀꿇꿈꿉꿋꿍꿎꿔꿜꿨꿩꿰꿱꿴꿸뀀뀁뀄뀌뀐뀔뀜뀝뀨끄끅끈끊끌끎끓끔끕끗끙"
		],
		[
			"b341",
			"쿌",
			19,
			"쿢쿣쿥쿦쿧쿩"
		],
		[
			"b361",
			"쿪",
			5,
			"쿲쿴쿶",
			5,
			"쿽쿾쿿퀁퀂퀃퀅",
			5
		],
		[
			"b381",
			"퀋",
			5,
			"퀒",
			5,
			"퀙",
			19,
			"끝끼끽낀낄낌낍낏낑나낙낚난낟날낡낢남납낫",
			4,
			"낱낳내낵낸낼냄냅냇냈냉냐냑냔냘냠냥너넉넋넌널넒넓넘넙넛넜넝넣네넥넨넬넴넵넷넸넹녀녁년녈념녑녔녕녘녜녠노녹논놀놂놈놉놋농높놓놔놘놜놨뇌뇐뇔뇜뇝"
		],
		[
			"b441",
			"퀮",
			5,
			"퀶퀷퀹퀺퀻퀽",
			6,
			"큆큈큊",
			5
		],
		[
			"b461",
			"큑큒큓큕큖큗큙",
			6,
			"큡",
			10,
			"큮큯"
		],
		[
			"b481",
			"큱큲큳큵",
			6,
			"큾큿킀킂",
			18,
			"뇟뇨뇩뇬뇰뇹뇻뇽누눅눈눋눌눔눕눗눙눠눴눼뉘뉜뉠뉨뉩뉴뉵뉼늄늅늉느늑는늘늙늚늠늡늣능늦늪늬늰늴니닉닌닐닒님닙닛닝닢다닥닦단닫",
			4,
			"닳담답닷",
			4,
			"닿대댁댄댈댐댑댓댔댕댜더덕덖던덛덜덞덟덤덥"
		],
		[
			"b541",
			"킕",
			14,
			"킦킧킩킪킫킭",
			5
		],
		[
			"b561",
			"킳킶킸킺",
			5,
			"탂탃탅탆탇탊",
			5,
			"탒탖",
			4
		],
		[
			"b581",
			"탛탞탟탡탢탣탥",
			6,
			"탮탲",
			5,
			"탹",
			11,
			"덧덩덫덮데덱덴델뎀뎁뎃뎄뎅뎌뎐뎔뎠뎡뎨뎬도독돈돋돌돎돐돔돕돗동돛돝돠돤돨돼됐되된될됨됩됫됴두둑둔둘둠둡둣둥둬뒀뒈뒝뒤뒨뒬뒵뒷뒹듀듄듈듐듕드득든듣들듦듬듭듯등듸디딕딘딛딜딤딥딧딨딩딪따딱딴딸"
		],
		[
			"b641",
			"턅",
			7,
			"턎",
			17
		],
		[
			"b661",
			"턠",
			15,
			"턲턳턵턶턷턹턻턼턽턾"
		],
		[
			"b681",
			"턿텂텆",
			5,
			"텎텏텑텒텓텕",
			6,
			"텞텠텢",
			5,
			"텩텪텫텭땀땁땃땄땅땋때땍땐땔땜땝땟땠땡떠떡떤떨떪떫떰떱떳떴떵떻떼떽뗀뗄뗌뗍뗏뗐뗑뗘뗬또똑똔똘똥똬똴뙈뙤뙨뚜뚝뚠뚤뚫뚬뚱뛔뛰뛴뛸뜀뜁뜅뜨뜩뜬뜯뜰뜸뜹뜻띄띈띌띔띕띠띤띨띰띱띳띵라락란랄람랍랏랐랑랒랖랗"
		],
		[
			"b741",
			"텮",
			13,
			"텽",
			6,
			"톅톆톇톉톊"
		],
		[
			"b761",
			"톋",
			20,
			"톢톣톥톦톧"
		],
		[
			"b781",
			"톩",
			6,
			"톲톴톶톷톸톹톻톽톾톿퇁",
			14,
			"래랙랜랠램랩랫랬랭랴략랸럇량러럭런럴럼럽럿렀렁렇레렉렌렐렘렙렛렝려력련렬렴렵렷렸령례롄롑롓로록론롤롬롭롯롱롸롼뢍뢨뢰뢴뢸룀룁룃룅료룐룔룝룟룡루룩룬룰룸룹룻룽뤄뤘뤠뤼뤽륀륄륌륏륑류륙륜률륨륩"
		],
		[
			"b841",
			"퇐",
			7,
			"퇙",
			17
		],
		[
			"b861",
			"퇫",
			8,
			"퇵퇶퇷퇹",
			13
		],
		[
			"b881",
			"툈툊",
			5,
			"툑",
			24,
			"륫륭르륵른를름릅릇릉릊릍릎리릭린릴림립릿링마막만많",
			4,
			"맘맙맛망맞맡맣매맥맨맬맴맵맷맸맹맺먀먁먈먕머먹먼멀멂멈멉멋멍멎멓메멕멘멜멤멥멧멨멩며멱면멸몃몄명몇몌모목몫몬몰몲몸몹못몽뫄뫈뫘뫙뫼"
		],
		[
			"b941",
			"툪툫툮툯툱툲툳툵",
			6,
			"툾퉀퉂",
			5,
			"퉉퉊퉋퉌"
		],
		[
			"b961",
			"퉍",
			14,
			"퉝",
			6,
			"퉥퉦퉧퉨"
		],
		[
			"b981",
			"퉩",
			22,
			"튂튃튅튆튇튉튊튋튌묀묄묍묏묑묘묜묠묩묫무묵묶문묻물묽묾뭄뭅뭇뭉뭍뭏뭐뭔뭘뭡뭣뭬뮈뮌뮐뮤뮨뮬뮴뮷므믄믈믐믓미믹민믿밀밂밈밉밋밌밍및밑바",
			4,
			"받",
			4,
			"밤밥밧방밭배백밴밸뱀뱁뱃뱄뱅뱉뱌뱍뱐뱝버벅번벋벌벎범법벗"
		],
		[
			"ba41",
			"튍튎튏튒튓튔튖",
			5,
			"튝튞튟튡튢튣튥",
			6,
			"튭"
		],
		[
			"ba61",
			"튮튯튰튲",
			5,
			"튺튻튽튾틁틃",
			4,
			"틊틌",
			5
		],
		[
			"ba81",
			"틒틓틕틖틗틙틚틛틝",
			6,
			"틦",
			9,
			"틲틳틵틶틷틹틺벙벚베벡벤벧벨벰벱벳벴벵벼벽변별볍볏볐병볕볘볜보복볶본볼봄봅봇봉봐봔봤봬뵀뵈뵉뵌뵐뵘뵙뵤뵨부북분붇불붉붊붐붑붓붕붙붚붜붤붰붸뷔뷕뷘뷜뷩뷰뷴뷸븀븃븅브븍븐블븜븝븟비빅빈빌빎빔빕빗빙빚빛빠빡빤"
		],
		[
			"bb41",
			"틻",
			4,
			"팂팄팆",
			5,
			"팏팑팒팓팕팗",
			4,
			"팞팢팣"
		],
		[
			"bb61",
			"팤팦팧팪팫팭팮팯팱",
			6,
			"팺팾",
			5,
			"퍆퍇퍈퍉"
		],
		[
			"bb81",
			"퍊",
			31,
			"빨빪빰빱빳빴빵빻빼빽뺀뺄뺌뺍뺏뺐뺑뺘뺙뺨뻐뻑뻔뻗뻘뻠뻣뻤뻥뻬뼁뼈뼉뼘뼙뼛뼜뼝뽀뽁뽄뽈뽐뽑뽕뾔뾰뿅뿌뿍뿐뿔뿜뿟뿡쀼쁑쁘쁜쁠쁨쁩삐삑삔삘삠삡삣삥사삭삯산삳살삵삶삼삽삿샀상샅새색샌샐샘샙샛샜생샤"
		],
		[
			"bc41",
			"퍪",
			17,
			"퍾퍿펁펂펃펅펆펇"
		],
		[
			"bc61",
			"펈펉펊펋펎펒",
			5,
			"펚펛펝펞펟펡",
			6,
			"펪펬펮"
		],
		[
			"bc81",
			"펯",
			4,
			"펵펶펷펹펺펻펽",
			6,
			"폆폇폊",
			5,
			"폑",
			5,
			"샥샨샬샴샵샷샹섀섄섈섐섕서",
			4,
			"섣설섦섧섬섭섯섰성섶세섹센셀셈셉셋셌셍셔셕션셜셤셥셧셨셩셰셴셸솅소속솎손솔솖솜솝솟송솥솨솩솬솰솽쇄쇈쇌쇔쇗쇘쇠쇤쇨쇰쇱쇳쇼쇽숀숄숌숍숏숑수숙순숟술숨숩숫숭"
		],
		[
			"bd41",
			"폗폙",
			7,
			"폢폤",
			7,
			"폮폯폱폲폳폵폶폷"
		],
		[
			"bd61",
			"폸폹폺폻폾퐀퐂",
			5,
			"퐉",
			13
		],
		[
			"bd81",
			"퐗",
			5,
			"퐞",
			25,
			"숯숱숲숴쉈쉐쉑쉔쉘쉠쉥쉬쉭쉰쉴쉼쉽쉿슁슈슉슐슘슛슝스슥슨슬슭슴습슷승시식신싣실싫심십싯싱싶싸싹싻싼쌀쌈쌉쌌쌍쌓쌔쌕쌘쌜쌤쌥쌨쌩썅써썩썬썰썲썸썹썼썽쎄쎈쎌쏀쏘쏙쏜쏟쏠쏢쏨쏩쏭쏴쏵쏸쐈쐐쐤쐬쐰"
		],
		[
			"be41",
			"퐸",
			7,
			"푁푂푃푅",
			14
		],
		[
			"be61",
			"푔",
			7,
			"푝푞푟푡푢푣푥",
			7,
			"푮푰푱푲"
		],
		[
			"be81",
			"푳",
			4,
			"푺푻푽푾풁풃",
			4,
			"풊풌풎",
			5,
			"풕",
			8,
			"쐴쐼쐽쑈쑤쑥쑨쑬쑴쑵쑹쒀쒔쒜쒸쒼쓩쓰쓱쓴쓸쓺쓿씀씁씌씐씔씜씨씩씬씰씸씹씻씽아악안앉않알앍앎앓암압앗았앙앝앞애액앤앨앰앱앳앴앵야약얀얄얇얌얍얏양얕얗얘얜얠얩어억언얹얻얼얽얾엄",
			6,
			"엌엎"
		],
		[
			"bf41",
			"풞",
			10,
			"풪",
			14
		],
		[
			"bf61",
			"풹",
			18,
			"퓍퓎퓏퓑퓒퓓퓕"
		],
		[
			"bf81",
			"퓖",
			5,
			"퓝퓞퓠",
			7,
			"퓩퓪퓫퓭퓮퓯퓱",
			6,
			"퓹퓺퓼에엑엔엘엠엡엣엥여역엮연열엶엷염",
			5,
			"옅옆옇예옌옐옘옙옛옜오옥온올옭옮옰옳옴옵옷옹옻와왁완왈왐왑왓왔왕왜왝왠왬왯왱외왹왼욀욈욉욋욍요욕욘욜욤욥욧용우욱운울욹욺움웁웃웅워웍원월웜웝웠웡웨"
		],
		[
			"c041",
			"퓾",
			5,
			"픅픆픇픉픊픋픍",
			6,
			"픖픘",
			5
		],
		[
			"c061",
			"픞",
			25
		],
		[
			"c081",
			"픸픹픺픻픾픿핁핂핃핅",
			6,
			"핎핐핒",
			5,
			"핚핛핝핞핟핡핢핣웩웬웰웸웹웽위윅윈윌윔윕윗윙유육윤율윰윱윳융윷으윽은을읊음읍읏응",
			7,
			"읜읠읨읫이익인일읽읾잃임입잇있잉잊잎자작잔잖잗잘잚잠잡잣잤장잦재잭잰잴잼잽잿쟀쟁쟈쟉쟌쟎쟐쟘쟝쟤쟨쟬저적전절젊"
		],
		[
			"c141",
			"핤핦핧핪핬핮",
			5,
			"핶핷핹핺핻핽",
			6,
			"햆햊햋"
		],
		[
			"c161",
			"햌햍햎햏햑",
			19,
			"햦햧"
		],
		[
			"c181",
			"햨",
			31,
			"점접젓정젖제젝젠젤젬젭젯젱져젼졀졈졉졌졍졔조족존졸졺좀좁좃종좆좇좋좌좍좔좝좟좡좨좼좽죄죈죌죔죕죗죙죠죡죤죵주죽준줄줅줆줌줍줏중줘줬줴쥐쥑쥔쥘쥠쥡쥣쥬쥰쥴쥼즈즉즌즐즘즙즛증지직진짇질짊짐집짓"
		],
		[
			"c241",
			"헊헋헍헎헏헑헓",
			4,
			"헚헜헞",
			5,
			"헦헧헩헪헫헭헮"
		],
		[
			"c261",
			"헯",
			4,
			"헶헸헺",
			5,
			"혂혃혅혆혇혉",
			6,
			"혒"
		],
		[
			"c281",
			"혖",
			5,
			"혝혞혟혡혢혣혥",
			7,
			"혮",
			9,
			"혺혻징짖짙짚짜짝짠짢짤짧짬짭짯짰짱째짹짼쨀쨈쨉쨋쨌쨍쨔쨘쨩쩌쩍쩐쩔쩜쩝쩟쩠쩡쩨쩽쪄쪘쪼쪽쫀쫄쫌쫍쫏쫑쫓쫘쫙쫠쫬쫴쬈쬐쬔쬘쬠쬡쭁쭈쭉쭌쭐쭘쭙쭝쭤쭸쭹쮜쮸쯔쯤쯧쯩찌찍찐찔찜찝찡찢찧차착찬찮찰참찹찻"
		],
		[
			"c341",
			"혽혾혿홁홂홃홄홆홇홊홌홎홏홐홒홓홖홗홙홚홛홝",
			4
		],
		[
			"c361",
			"홢",
			4,
			"홨홪",
			5,
			"홲홳홵",
			11
		],
		[
			"c381",
			"횁횂횄횆",
			5,
			"횎횏횑횒횓횕",
			7,
			"횞횠횢",
			5,
			"횩횪찼창찾채책챈챌챔챕챗챘챙챠챤챦챨챰챵처척천철첨첩첫첬청체첵첸첼쳄쳅쳇쳉쳐쳔쳤쳬쳰촁초촉촌촐촘촙촛총촤촨촬촹최쵠쵤쵬쵭쵯쵱쵸춈추축춘출춤춥춧충춰췄췌췐취췬췰췸췹췻췽츄츈츌츔츙츠측츤츨츰츱츳층"
		],
		[
			"c441",
			"횫횭횮횯횱",
			7,
			"횺횼",
			7,
			"훆훇훉훊훋"
		],
		[
			"c461",
			"훍훎훏훐훒훓훕훖훘훚",
			5,
			"훡훢훣훥훦훧훩",
			4
		],
		[
			"c481",
			"훮훯훱훲훳훴훶",
			5,
			"훾훿휁휂휃휅",
			11,
			"휒휓휔치칙친칟칠칡침칩칫칭카칵칸칼캄캅캇캉캐캑캔캘캠캡캣캤캥캬캭컁커컥컨컫컬컴컵컷컸컹케켁켄켈켐켑켓켕켜켠켤켬켭켯켰켱켸코콕콘콜콤콥콧콩콰콱콴콸쾀쾅쾌쾡쾨쾰쿄쿠쿡쿤쿨쿰쿱쿳쿵쿼퀀퀄퀑퀘퀭퀴퀵퀸퀼"
		],
		[
			"c541",
			"휕휖휗휚휛휝휞휟휡",
			6,
			"휪휬휮",
			5,
			"휶휷휹"
		],
		[
			"c561",
			"휺휻휽",
			6,
			"흅흆흈흊",
			5,
			"흒흓흕흚",
			4
		],
		[
			"c581",
			"흟흢흤흦흧흨흪흫흭흮흯흱흲흳흵",
			6,
			"흾흿힀힂",
			5,
			"힊힋큄큅큇큉큐큔큘큠크큭큰클큼큽킁키킥킨킬킴킵킷킹타탁탄탈탉탐탑탓탔탕태택탠탤탬탭탯탰탱탸턍터턱턴털턺텀텁텃텄텅테텍텐텔템텝텟텡텨텬텼톄톈토톡톤톨톰톱톳통톺톼퇀퇘퇴퇸툇툉툐투툭툰툴툼툽툿퉁퉈퉜"
		],
		[
			"c641",
			"힍힎힏힑",
			6,
			"힚힜힞",
			5
		],
		[
			"c6a1",
			"퉤튀튁튄튈튐튑튕튜튠튤튬튱트특튼튿틀틂틈틉틋틔틘틜틤틥티틱틴틸팀팁팃팅파팍팎판팔팖팜팝팟팠팡팥패팩팬팰팸팹팻팼팽퍄퍅퍼퍽펀펄펌펍펏펐펑페펙펜펠펨펩펫펭펴편펼폄폅폈평폐폘폡폣포폭폰폴폼폽폿퐁"
		],
		[
			"c7a1",
			"퐈퐝푀푄표푠푤푭푯푸푹푼푿풀풂품풉풋풍풔풩퓌퓐퓔퓜퓟퓨퓬퓰퓸퓻퓽프픈플픔픕픗피픽핀필핌핍핏핑하학한할핥함합핫항해핵핸핼햄햅햇했행햐향허헉헌헐헒험헙헛헝헤헥헨헬헴헵헷헹혀혁현혈혐협혓혔형혜혠"
		],
		[
			"c8a1",
			"혤혭호혹혼홀홅홈홉홋홍홑화확환활홧황홰홱홴횃횅회획횐횔횝횟횡효횬횰횹횻후훅훈훌훑훔훗훙훠훤훨훰훵훼훽휀휄휑휘휙휜휠휨휩휫휭휴휵휸휼흄흇흉흐흑흔흖흗흘흙흠흡흣흥흩희흰흴흼흽힁히힉힌힐힘힙힛힝"
		],
		[
			"caa1",
			"伽佳假價加可呵哥嘉嫁家暇架枷柯歌珂痂稼苛茄街袈訶賈跏軻迦駕刻却各恪慤殼珏脚覺角閣侃刊墾奸姦干幹懇揀杆柬桿澗癎看磵稈竿簡肝艮艱諫間乫喝曷渴碣竭葛褐蝎鞨勘坎堪嵌感憾戡敢柑橄減甘疳監瞰紺邯鑑鑒龕"
		],
		[
			"cba1",
			"匣岬甲胛鉀閘剛堈姜岡崗康强彊慷江畺疆糠絳綱羌腔舡薑襁講鋼降鱇介价個凱塏愷愾慨改槪漑疥皆盖箇芥蓋豈鎧開喀客坑更粳羹醵倨去居巨拒据據擧渠炬祛距踞車遽鉅鋸乾件健巾建愆楗腱虔蹇鍵騫乞傑杰桀儉劍劒檢"
		],
		[
			"cca1",
			"瞼鈐黔劫怯迲偈憩揭擊格檄激膈覡隔堅牽犬甄絹繭肩見譴遣鵑抉決潔結缺訣兼慊箝謙鉗鎌京俓倞傾儆勁勍卿坰境庚徑慶憬擎敬景暻更梗涇炅烱璟璥瓊痙硬磬竟競絅經耕耿脛莖警輕逕鏡頃頸驚鯨係啓堺契季屆悸戒桂械"
		],
		[
			"cda1",
			"棨溪界癸磎稽系繫繼計誡谿階鷄古叩告呱固姑孤尻庫拷攷故敲暠枯槁沽痼皐睾稿羔考股膏苦苽菰藁蠱袴誥賈辜錮雇顧高鼓哭斛曲梏穀谷鵠困坤崑昆梱棍滾琨袞鯤汨滑骨供公共功孔工恐恭拱控攻珙空蚣貢鞏串寡戈果瓜"
		],
		[
			"cea1",
			"科菓誇課跨過鍋顆廓槨藿郭串冠官寬慣棺款灌琯瓘管罐菅觀貫關館刮恝括适侊光匡壙廣曠洸炚狂珖筐胱鑛卦掛罫乖傀塊壞怪愧拐槐魁宏紘肱轟交僑咬喬嬌嶠巧攪敎校橋狡皎矯絞翹膠蕎蛟較轎郊餃驕鮫丘久九仇俱具勾"
		],
		[
			"cfa1",
			"區口句咎嘔坵垢寇嶇廐懼拘救枸柩構歐毆毬求溝灸狗玖球瞿矩究絿耉臼舅舊苟衢謳購軀逑邱鉤銶駒驅鳩鷗龜國局菊鞠鞫麴君窘群裙軍郡堀屈掘窟宮弓穹窮芎躬倦券勸卷圈拳捲權淃眷厥獗蕨蹶闕机櫃潰詭軌饋句晷歸貴"
		],
		[
			"d0a1",
			"鬼龜叫圭奎揆槻珪硅窺竅糾葵規赳逵閨勻均畇筠菌鈞龜橘克剋劇戟棘極隙僅劤勤懃斤根槿瑾筋芹菫覲謹近饉契今妗擒昑檎琴禁禽芩衾衿襟金錦伋及急扱汲級給亘兢矜肯企伎其冀嗜器圻基埼夔奇妓寄岐崎己幾忌技旗旣"
		],
		[
			"d1a1",
			"朞期杞棋棄機欺氣汽沂淇玘琦琪璂璣畸畿碁磯祁祇祈祺箕紀綺羈耆耭肌記譏豈起錡錤飢饑騎騏驥麒緊佶吉拮桔金喫儺喇奈娜懦懶拏拿癩",
			5,
			"那樂",
			4,
			"諾酪駱亂卵暖欄煖爛蘭難鸞捏捺南嵐枏楠湳濫男藍襤拉"
		],
		[
			"d2a1",
			"納臘蠟衲囊娘廊",
			4,
			"乃來內奈柰耐冷女年撚秊念恬拈捻寧寗努勞奴弩怒擄櫓爐瑙盧",
			5,
			"駑魯",
			10,
			"濃籠聾膿農惱牢磊腦賂雷尿壘",
			7,
			"嫩訥杻紐勒",
			5,
			"能菱陵尼泥匿溺多茶"
		],
		[
			"d3a1",
			"丹亶但單團壇彖斷旦檀段湍短端簞緞蛋袒鄲鍛撻澾獺疸達啖坍憺擔曇淡湛潭澹痰聃膽蕁覃談譚錟沓畓答踏遝唐堂塘幢戇撞棠當糖螳黨代垈坮大對岱帶待戴擡玳臺袋貸隊黛宅德悳倒刀到圖堵塗導屠島嶋度徒悼挑掉搗桃"
		],
		[
			"d4a1",
			"棹櫂淘渡滔濤燾盜睹禱稻萄覩賭跳蹈逃途道都鍍陶韜毒瀆牘犢獨督禿篤纛讀墩惇敦旽暾沌焞燉豚頓乭突仝冬凍動同憧東桐棟洞潼疼瞳童胴董銅兜斗杜枓痘竇荳讀豆逗頭屯臀芚遁遯鈍得嶝橙燈登等藤謄鄧騰喇懶拏癩羅"
		],
		[
			"d5a1",
			"蘿螺裸邏樂洛烙珞絡落諾酪駱丹亂卵欄欒瀾爛蘭鸞剌辣嵐擥攬欖濫籃纜藍襤覽拉臘蠟廊朗浪狼琅瑯螂郞來崍徠萊冷掠略亮倆兩凉梁樑粮粱糧良諒輛量侶儷勵呂廬慮戾旅櫚濾礪藜蠣閭驢驪麗黎力曆歷瀝礫轢靂憐戀攣漣"
		],
		[
			"d6a1",
			"煉璉練聯蓮輦連鍊冽列劣洌烈裂廉斂殮濂簾獵令伶囹寧岺嶺怜玲笭羚翎聆逞鈴零靈領齡例澧禮醴隷勞怒撈擄櫓潞瀘爐盧老蘆虜路輅露魯鷺鹵碌祿綠菉錄鹿麓論壟弄朧瀧瓏籠聾儡瀨牢磊賂賚賴雷了僚寮廖料燎療瞭聊蓼"
		],
		[
			"d7a1",
			"遼鬧龍壘婁屢樓淚漏瘻累縷蔞褸鏤陋劉旒柳榴流溜瀏琉瑠留瘤硫謬類六戮陸侖倫崙淪綸輪律慄栗率隆勒肋凜凌楞稜綾菱陵俚利厘吏唎履悧李梨浬犁狸理璃異痢籬罹羸莉裏裡里釐離鯉吝潾燐璘藺躪隣鱗麟林淋琳臨霖砬"
		],
		[
			"d8a1",
			"立笠粒摩瑪痲碼磨馬魔麻寞幕漠膜莫邈万卍娩巒彎慢挽晩曼滿漫灣瞞萬蔓蠻輓饅鰻唜抹末沫茉襪靺亡妄忘忙望網罔芒茫莽輞邙埋妹媒寐昧枚梅每煤罵買賣邁魅脈貊陌驀麥孟氓猛盲盟萌冪覓免冕勉棉沔眄眠綿緬面麵滅"
		],
		[
			"d9a1",
			"蔑冥名命明暝椧溟皿瞑茗蓂螟酩銘鳴袂侮冒募姆帽慕摸摹暮某模母毛牟牡瑁眸矛耗芼茅謀謨貌木沐牧目睦穆鶩歿沒夢朦蒙卯墓妙廟描昴杳渺猫竗苗錨務巫憮懋戊拇撫无楙武毋無珷畝繆舞茂蕪誣貿霧鵡墨默們刎吻問文"
		],
		[
			"daa1",
			"汶紊紋聞蚊門雯勿沕物味媚尾嵋彌微未梶楣渼湄眉米美薇謎迷靡黴岷悶愍憫敏旻旼民泯玟珉緡閔密蜜謐剝博拍搏撲朴樸泊珀璞箔粕縛膊舶薄迫雹駁伴半反叛拌搬攀斑槃泮潘班畔瘢盤盼磐磻礬絆般蟠返頒飯勃拔撥渤潑"
		],
		[
			"dba1",
			"發跋醱鉢髮魃倣傍坊妨尨幇彷房放方旁昉枋榜滂磅紡肪膀舫芳蒡蚌訪謗邦防龐倍俳北培徘拜排杯湃焙盃背胚裴裵褙賠輩配陪伯佰帛柏栢白百魄幡樊煩燔番磻繁蕃藩飜伐筏罰閥凡帆梵氾汎泛犯範范法琺僻劈壁擘檗璧癖"
		],
		[
			"dca1",
			"碧蘗闢霹便卞弁變辨辯邊別瞥鱉鼈丙倂兵屛幷昞昺柄棅炳甁病秉竝輧餠騈保堡報寶普步洑湺潽珤甫菩補褓譜輔伏僕匐卜宓復服福腹茯蔔複覆輹輻馥鰒本乶俸奉封峯峰捧棒烽熢琫縫蓬蜂逢鋒鳳不付俯傅剖副否咐埠夫婦"
		],
		[
			"dda1",
			"孚孵富府復扶敷斧浮溥父符簿缶腐腑膚艀芙莩訃負賦賻赴趺部釜阜附駙鳧北分吩噴墳奔奮忿憤扮昐汾焚盆粉糞紛芬賁雰不佛弗彿拂崩朋棚硼繃鵬丕備匕匪卑妃婢庇悲憊扉批斐枇榧比毖毗毘沸泌琵痺砒碑秕秘粃緋翡肥"
		],
		[
			"dea1",
			"脾臂菲蜚裨誹譬費鄙非飛鼻嚬嬪彬斌檳殯浜濱瀕牝玭貧賓頻憑氷聘騁乍事些仕伺似使俟僿史司唆嗣四士奢娑寫寺射巳師徙思捨斜斯柶査梭死沙泗渣瀉獅砂社祀祠私篩紗絲肆舍莎蓑蛇裟詐詞謝賜赦辭邪飼駟麝削數朔索"
		],
		[
			"dfa1",
			"傘刪山散汕珊産疝算蒜酸霰乷撒殺煞薩三參杉森渗芟蔘衫揷澁鈒颯上傷像償商喪嘗孀尙峠常床庠廂想桑橡湘爽牀狀相祥箱翔裳觴詳象賞霜塞璽賽嗇塞穡索色牲生甥省笙墅壻嶼序庶徐恕抒捿敍暑曙書栖棲犀瑞筮絮緖署"
		],
		[
			"e0a1",
			"胥舒薯西誓逝鋤黍鼠夕奭席惜昔晳析汐淅潟石碩蓆釋錫仙僊先善嬋宣扇敾旋渲煽琁瑄璇璿癬禪線繕羨腺膳船蘚蟬詵跣選銑鐥饍鮮卨屑楔泄洩渫舌薛褻設說雪齧剡暹殲纖蟾贍閃陝攝涉燮葉城姓宬性惺成星晟猩珹盛省筬"
		],
		[
			"e1a1",
			"聖聲腥誠醒世勢歲洗稅笹細說貰召嘯塑宵小少巢所掃搔昭梳沼消溯瀟炤燒甦疏疎瘙笑篠簫素紹蔬蕭蘇訴逍遡邵銷韶騷俗屬束涑粟續謖贖速孫巽損蓀遜飡率宋悚松淞訟誦送頌刷殺灑碎鎖衰釗修受嗽囚垂壽嫂守岫峀帥愁"
		],
		[
			"e2a1",
			"戍手授搜收數樹殊水洙漱燧狩獸琇璲瘦睡秀穗竪粹綏綬繡羞脩茱蒐蓚藪袖誰讐輸遂邃酬銖銹隋隧隨雖需須首髓鬚叔塾夙孰宿淑潚熟琡璹肅菽巡徇循恂旬栒楯橓殉洵淳珣盾瞬筍純脣舜荀蓴蕣詢諄醇錞順馴戌術述鉥崇崧"
		],
		[
			"e3a1",
			"嵩瑟膝蝨濕拾習褶襲丞乘僧勝升承昇繩蠅陞侍匙嘶始媤尸屎屍市弑恃施是時枾柴猜矢示翅蒔蓍視試詩諡豕豺埴寔式息拭植殖湜熄篒蝕識軾食飾伸侁信呻娠宸愼新晨燼申神紳腎臣莘薪藎蜃訊身辛辰迅失室實悉審尋心沁"
		],
		[
			"e4a1",
			"沈深瀋甚芯諶什十拾雙氏亞俄兒啞娥峨我牙芽莪蛾衙訝阿雅餓鴉鵝堊岳嶽幄惡愕握樂渥鄂鍔顎鰐齷安岸按晏案眼雁鞍顔鮟斡謁軋閼唵岩巖庵暗癌菴闇壓押狎鴨仰央怏昻殃秧鴦厓哀埃崖愛曖涯碍艾隘靄厄扼掖液縊腋額"
		],
		[
			"e5a1",
			"櫻罌鶯鸚也倻冶夜惹揶椰爺耶若野弱掠略約若葯蒻藥躍亮佯兩凉壤孃恙揚攘敭暘梁楊樣洋瀁煬痒瘍禳穰糧羊良襄諒讓釀陽量養圄御於漁瘀禦語馭魚齬億憶抑檍臆偃堰彦焉言諺孼蘖俺儼嚴奄掩淹嶪業円予余勵呂女如廬"
		],
		[
			"e6a1",
			"旅歟汝濾璵礖礪與艅茹輿轝閭餘驪麗黎亦力域役易曆歷疫繹譯轢逆驛嚥堧姸娟宴年延憐戀捐挻撚椽沇沿涎涓淵演漣烟然煙煉燃燕璉硏硯秊筵緣練縯聯衍軟輦蓮連鉛鍊鳶列劣咽悅涅烈熱裂說閱厭廉念捻染殮炎焰琰艶苒"
		],
		[
			"e7a1",
			"簾閻髥鹽曄獵燁葉令囹塋寧嶺嶸影怜映暎楹榮永泳渶潁濚瀛瀯煐營獰玲瑛瑩瓔盈穎纓羚聆英詠迎鈴鍈零霙靈領乂倪例刈叡曳汭濊猊睿穢芮藝蘂禮裔詣譽豫醴銳隸霓預五伍俉傲午吾吳嗚塢墺奧娛寤悟惡懊敖旿晤梧汚澳"
		],
		[
			"e8a1",
			"烏熬獒筽蜈誤鰲鼇屋沃獄玉鈺溫瑥瘟穩縕蘊兀壅擁瓮甕癰翁邕雍饔渦瓦窩窪臥蛙蝸訛婉完宛梡椀浣玩琓琬碗緩翫脘腕莞豌阮頑曰往旺枉汪王倭娃歪矮外嵬巍猥畏了僚僥凹堯夭妖姚寥寮尿嶢拗搖撓擾料曜樂橈燎燿瑤療"
		],
		[
			"e9a1",
			"窈窯繇繞耀腰蓼蟯要謠遙遼邀饒慾欲浴縟褥辱俑傭冗勇埇墉容庸慂榕涌湧溶熔瑢用甬聳茸蓉踊鎔鏞龍于佑偶優又友右宇寓尤愚憂旴牛玗瑀盂祐禑禹紆羽芋藕虞迂遇郵釪隅雨雩勖彧旭昱栯煜稶郁頊云暈橒殞澐熉耘芸蕓"
		],
		[
			"eaa1",
			"運隕雲韻蔚鬱亐熊雄元原員圓園垣媛嫄寃怨愿援沅洹湲源爰猿瑗苑袁轅遠阮院願鴛月越鉞位偉僞危圍委威尉慰暐渭爲瑋緯胃萎葦蔿蝟衛褘謂違韋魏乳侑儒兪劉唯喩孺宥幼幽庾悠惟愈愉揄攸有杻柔柚柳楡楢油洧流游溜"
		],
		[
			"eba1",
			"濡猶猷琉瑜由留癒硫紐維臾萸裕誘諛諭踰蹂遊逾遺酉釉鍮類六堉戮毓肉育陸倫允奫尹崙淪潤玧胤贇輪鈗閏律慄栗率聿戎瀜絨融隆垠恩慇殷誾銀隱乙吟淫蔭陰音飮揖泣邑凝應膺鷹依倚儀宜意懿擬椅毅疑矣義艤薏蟻衣誼"
		],
		[
			"eca1",
			"議醫二以伊利吏夷姨履已弛彛怡易李梨泥爾珥理異痍痢移罹而耳肄苡荑裏裡貽貳邇里離飴餌匿溺瀷益翊翌翼謚人仁刃印吝咽因姻寅引忍湮燐璘絪茵藺蚓認隣靭靷鱗麟一佚佾壹日溢逸鎰馹任壬妊姙恁林淋稔臨荏賃入卄"
		],
		[
			"eda1",
			"立笠粒仍剩孕芿仔刺咨姉姿子字孜恣慈滋炙煮玆瓷疵磁紫者自茨蔗藉諮資雌作勺嚼斫昨灼炸爵綽芍酌雀鵲孱棧殘潺盞岑暫潛箴簪蠶雜丈仗匠場墻壯奬將帳庄張掌暲杖樟檣欌漿牆狀獐璋章粧腸臟臧莊葬蔣薔藏裝贓醬長"
		],
		[
			"eea1",
			"障再哉在宰才材栽梓渽滓災縡裁財載齋齎爭箏諍錚佇低儲咀姐底抵杵楮樗沮渚狙猪疽箸紵苧菹著藷詛貯躇這邸雎齟勣吊嫡寂摘敵滴狄炙的積笛籍績翟荻謫賊赤跡蹟迪迹適鏑佃佺傳全典前剪塡塼奠專展廛悛戰栓殿氈澱"
		],
		[
			"efa1",
			"煎琠田甸畑癲筌箋箭篆纏詮輾轉鈿銓錢鐫電顚顫餞切截折浙癤竊節絶占岾店漸点粘霑鮎點接摺蝶丁井亭停偵呈姃定幀庭廷征情挺政整旌晶晸柾楨檉正汀淀淨渟湞瀞炡玎珽町睛碇禎程穽精綎艇訂諪貞鄭酊釘鉦鋌錠霆靖"
		],
		[
			"f0a1",
			"靜頂鼎制劑啼堤帝弟悌提梯濟祭第臍薺製諸蹄醍除際霽題齊俎兆凋助嘲弔彫措操早晁曺曹朝條棗槽漕潮照燥爪璪眺祖祚租稠窕粗糟組繰肇藻蚤詔調趙躁造遭釣阻雕鳥族簇足鏃存尊卒拙猝倧宗從悰慫棕淙琮種終綜縱腫"
		],
		[
			"f1a1",
			"踪踵鍾鐘佐坐左座挫罪主住侏做姝胄呪周嗾奏宙州廚晝朱柱株注洲湊澍炷珠疇籌紂紬綢舟蛛註誅走躊輳週酎酒鑄駐竹粥俊儁准埈寯峻晙樽浚準濬焌畯竣蠢逡遵雋駿茁中仲衆重卽櫛楫汁葺增憎曾拯烝甑症繒蒸證贈之只"
		],
		[
			"f2a1",
			"咫地址志持指摯支旨智枝枳止池沚漬知砥祉祗紙肢脂至芝芷蜘誌識贄趾遲直稙稷織職唇嗔塵振搢晉晋桭榛殄津溱珍瑨璡畛疹盡眞瞋秦縉縝臻蔯袗診賑軫辰進鎭陣陳震侄叱姪嫉帙桎瓆疾秩窒膣蛭質跌迭斟朕什執潗緝輯"
		],
		[
			"f3a1",
			"鏶集徵懲澄且侘借叉嗟嵯差次此磋箚茶蹉車遮捉搾着窄錯鑿齪撰澯燦璨瓚竄簒纂粲纘讚贊鑽餐饌刹察擦札紮僭參塹慘慙懺斬站讒讖倉倡創唱娼廠彰愴敞昌昶暢槍滄漲猖瘡窓脹艙菖蒼債埰寀寨彩採砦綵菜蔡采釵冊柵策"
		],
		[
			"f4a1",
			"責凄妻悽處倜刺剔尺慽戚拓擲斥滌瘠脊蹠陟隻仟千喘天川擅泉淺玔穿舛薦賤踐遷釧闡阡韆凸哲喆徹撤澈綴輟轍鐵僉尖沾添甛瞻簽籤詹諂堞妾帖捷牒疊睫諜貼輒廳晴淸聽菁請靑鯖切剃替涕滯締諦逮遞體初剿哨憔抄招梢"
		],
		[
			"f5a1",
			"椒楚樵炒焦硝礁礎秒稍肖艸苕草蕉貂超酢醋醮促囑燭矗蜀觸寸忖村邨叢塚寵悤憁摠總聰蔥銃撮催崔最墜抽推椎楸樞湫皺秋芻萩諏趨追鄒酋醜錐錘鎚雛騶鰍丑畜祝竺筑築縮蓄蹙蹴軸逐春椿瑃出朮黜充忠沖蟲衝衷悴膵萃"
		],
		[
			"f6a1",
			"贅取吹嘴娶就炊翠聚脆臭趣醉驟鷲側仄厠惻測層侈値嗤峙幟恥梔治淄熾痔痴癡稚穉緇緻置致蚩輜雉馳齒則勅飭親七柒漆侵寢枕沈浸琛砧針鍼蟄秤稱快他咤唾墮妥惰打拖朶楕舵陀馱駝倬卓啄坼度托拓擢晫柝濁濯琢琸託"
		],
		[
			"f7a1",
			"鐸呑嘆坦彈憚歎灘炭綻誕奪脫探眈耽貪塔搭榻宕帑湯糖蕩兌台太怠態殆汰泰笞胎苔跆邰颱宅擇澤撑攄兎吐土討慟桶洞痛筒統通堆槌腿褪退頹偸套妬投透鬪慝特闖坡婆巴把播擺杷波派爬琶破罷芭跛頗判坂板版瓣販辦鈑"
		],
		[
			"f8a1",
			"阪八叭捌佩唄悖敗沛浿牌狽稗覇貝彭澎烹膨愎便偏扁片篇編翩遍鞭騙貶坪平枰萍評吠嬖幣廢弊斃肺蔽閉陛佈包匍匏咆哺圃布怖抛抱捕暴泡浦疱砲胞脯苞葡蒲袍褒逋鋪飽鮑幅暴曝瀑爆輻俵剽彪慓杓標漂瓢票表豹飇飄驃"
		],
		[
			"f9a1",
			"品稟楓諷豊風馮彼披疲皮被避陂匹弼必泌珌畢疋筆苾馝乏逼下何厦夏廈昰河瑕荷蝦賀遐霞鰕壑學虐謔鶴寒恨悍旱汗漢澣瀚罕翰閑閒限韓割轄函含咸啣喊檻涵緘艦銜陷鹹合哈盒蛤閤闔陜亢伉姮嫦巷恒抗杭桁沆港缸肛航"
		],
		[
			"faa1",
			"行降項亥偕咳垓奚孩害懈楷海瀣蟹解該諧邂駭骸劾核倖幸杏荇行享向嚮珦鄕響餉饗香噓墟虛許憲櫶獻軒歇險驗奕爀赫革俔峴弦懸晛泫炫玄玹現眩睍絃絢縣舷衒見賢鉉顯孑穴血頁嫌俠協夾峽挾浹狹脅脇莢鋏頰亨兄刑型"
		],
		[
			"fba1",
			"形泂滎瀅灐炯熒珩瑩荊螢衡逈邢鎣馨兮彗惠慧暳蕙蹊醯鞋乎互呼壕壺好岵弧戶扈昊晧毫浩淏湖滸澔濠濩灝狐琥瑚瓠皓祜糊縞胡芦葫蒿虎號蝴護豪鎬頀顥惑或酷婚昏混渾琿魂忽惚笏哄弘汞泓洪烘紅虹訌鴻化和嬅樺火畵"
		],
		[
			"fca1",
			"禍禾花華話譁貨靴廓擴攫確碻穫丸喚奐宦幻患換歡晥桓渙煥環紈還驩鰥活滑猾豁闊凰幌徨恍惶愰慌晃晄榥況湟滉潢煌璜皇篁簧荒蝗遑隍黃匯回廻徊恢悔懷晦會檜淮澮灰獪繪膾茴蛔誨賄劃獲宖橫鐄哮嚆孝效斅曉梟涍淆"
		],
		[
			"fda1",
			"爻肴酵驍侯候厚后吼喉嗅帿後朽煦珝逅勛勳塤壎焄熏燻薰訓暈薨喧暄煊萱卉喙毁彙徽揮暉煇諱輝麾休携烋畦虧恤譎鷸兇凶匈洶胸黑昕欣炘痕吃屹紇訖欠欽歆吸恰洽翕興僖凞喜噫囍姬嬉希憙憘戱晞曦熙熹熺犧禧稀羲詰"
		]
	];

/***/ },
/* 129 */
/***/ function(module, exports) {

	module.exports = [
		[
			"0",
			"\u0000",
			127
		],
		[
			"a140",
			"　，、。．‧；：？！︰…‥﹐﹑﹒·﹔﹕﹖﹗｜–︱—︳╴︴﹏（）︵︶｛｝︷︸〔〕︹︺【】︻︼《》︽︾〈〉︿﹀「」﹁﹂『』﹃﹄﹙﹚"
		],
		[
			"a1a1",
			"﹛﹜﹝﹞‘’“”〝〞‵′＃＆＊※§〃○●△▲◎☆★◇◆□■▽▼㊣℅¯￣＿ˍ﹉﹊﹍﹎﹋﹌﹟﹠﹡＋－×÷±√＜＞＝≦≧≠∞≒≡﹢",
			4,
			"～∩∪⊥∠∟⊿㏒㏑∫∮∵∴♀♂⊕⊙↑↓←→↖↗↙↘∥∣／"
		],
		[
			"a240",
			"＼∕﹨＄￥〒￠￡％＠℃℉﹩﹪﹫㏕㎜㎝㎞㏎㎡㎎㎏㏄°兙兛兞兝兡兣嗧瓩糎▁",
			7,
			"▏▎▍▌▋▊▉┼┴┬┤├▔─│▕┌┐└┘╭"
		],
		[
			"a2a1",
			"╮╰╯═╞╪╡◢◣◥◤╱╲╳０",
			9,
			"Ⅰ",
			9,
			"〡",
			8,
			"十卄卅Ａ",
			25,
			"ａ",
			21
		],
		[
			"a340",
			"ｗｘｙｚΑ",
			16,
			"Σ",
			6,
			"α",
			16,
			"σ",
			6,
			"ㄅ",
			10
		],
		[
			"a3a1",
			"ㄐ",
			25,
			"˙ˉˊˇˋ"
		],
		[
			"a3e1",
			"€"
		],
		[
			"a440",
			"一乙丁七乃九了二人儿入八几刀刁力匕十卜又三下丈上丫丸凡久么也乞于亡兀刃勺千叉口土士夕大女子孑孓寸小尢尸山川工己已巳巾干廾弋弓才"
		],
		[
			"a4a1",
			"丑丐不中丰丹之尹予云井互五亢仁什仃仆仇仍今介仄元允內六兮公冗凶分切刈勻勾勿化匹午升卅卞厄友及反壬天夫太夭孔少尤尺屯巴幻廿弔引心戈戶手扎支文斗斤方日曰月木欠止歹毋比毛氏水火爪父爻片牙牛犬王丙"
		],
		[
			"a540",
			"世丕且丘主乍乏乎以付仔仕他仗代令仙仞充兄冉冊冬凹出凸刊加功包匆北匝仟半卉卡占卯卮去可古右召叮叩叨叼司叵叫另只史叱台句叭叻四囚外"
		],
		[
			"a5a1",
			"央失奴奶孕它尼巨巧左市布平幼弁弘弗必戊打扔扒扑斥旦朮本未末札正母民氐永汁汀氾犯玄玉瓜瓦甘生用甩田由甲申疋白皮皿目矛矢石示禾穴立丞丟乒乓乩亙交亦亥仿伉伙伊伕伍伐休伏仲件任仰仳份企伋光兇兆先全"
		],
		[
			"a640",
			"共再冰列刑划刎刖劣匈匡匠印危吉吏同吊吐吁吋各向名合吃后吆吒因回囝圳地在圭圬圯圩夙多夷夸妄奸妃好她如妁字存宇守宅安寺尖屹州帆并年"
		],
		[
			"a6a1",
			"式弛忙忖戎戌戍成扣扛托收早旨旬旭曲曳有朽朴朱朵次此死氖汝汗汙江池汐汕污汛汍汎灰牟牝百竹米糸缶羊羽老考而耒耳聿肉肋肌臣自至臼舌舛舟艮色艾虫血行衣西阡串亨位住佇佗佞伴佛何估佐佑伽伺伸佃佔似但佣"
		],
		[
			"a740",
			"作你伯低伶余佝佈佚兌克免兵冶冷別判利刪刨劫助努劬匣即卵吝吭吞吾否呎吧呆呃吳呈呂君吩告吹吻吸吮吵吶吠吼呀吱含吟听囪困囤囫坊坑址坍"
		],
		[
			"a7a1",
			"均坎圾坐坏圻壯夾妝妒妨妞妣妙妖妍妤妓妊妥孝孜孚孛完宋宏尬局屁尿尾岐岑岔岌巫希序庇床廷弄弟彤形彷役忘忌志忍忱快忸忪戒我抄抗抖技扶抉扭把扼找批扳抒扯折扮投抓抑抆改攻攸旱更束李杏材村杜杖杞杉杆杠"
		],
		[
			"a840",
			"杓杗步每求汞沙沁沈沉沅沛汪決沐汰沌汨沖沒汽沃汲汾汴沆汶沍沔沘沂灶灼災灸牢牡牠狄狂玖甬甫男甸皂盯矣私秀禿究系罕肖肓肝肘肛肚育良芒"
		],
		[
			"a8a1",
			"芋芍見角言谷豆豕貝赤走足身車辛辰迂迆迅迄巡邑邢邪邦那酉釆里防阮阱阪阬並乖乳事些亞享京佯依侍佳使佬供例來侃佰併侈佩佻侖佾侏侑佺兔兒兕兩具其典冽函刻券刷刺到刮制剁劾劻卒協卓卑卦卷卸卹取叔受味呵"
		],
		[
			"a940",
			"咖呸咕咀呻呷咄咒咆呼咐呱呶和咚呢周咋命咎固垃坷坪坩坡坦坤坼夜奉奇奈奄奔妾妻委妹妮姑姆姐姍始姓姊妯妳姒姅孟孤季宗定官宜宙宛尚屈居"
		],
		[
			"a9a1",
			"屆岷岡岸岩岫岱岳帘帚帖帕帛帑幸庚店府底庖延弦弧弩往征彿彼忝忠忽念忿怏怔怯怵怖怪怕怡性怩怫怛或戕房戾所承拉拌拄抿拂抹拒招披拓拔拋拈抨抽押拐拙拇拍抵拚抱拘拖拗拆抬拎放斧於旺昔易昌昆昂明昀昏昕昊"
		],
		[
			"aa40",
			"昇服朋杭枋枕東果杳杷枇枝林杯杰板枉松析杵枚枓杼杪杲欣武歧歿氓氛泣注泳沱泌泥河沽沾沼波沫法泓沸泄油況沮泗泅泱沿治泡泛泊沬泯泜泖泠"
		],
		[
			"aaa1",
			"炕炎炒炊炙爬爭爸版牧物狀狎狙狗狐玩玨玟玫玥甽疝疙疚的盂盲直知矽社祀祁秉秈空穹竺糾罔羌羋者肺肥肢肱股肫肩肴肪肯臥臾舍芳芝芙芭芽芟芹花芬芥芯芸芣芰芾芷虎虱初表軋迎返近邵邸邱邶采金長門阜陀阿阻附"
		],
		[
			"ab40",
			"陂隹雨青非亟亭亮信侵侯便俠俑俏保促侶俘俟俊俗侮俐俄係俚俎俞侷兗冒冑冠剎剃削前剌剋則勇勉勃勁匍南卻厚叛咬哀咨哎哉咸咦咳哇哂咽咪品"
		],
		[
			"aba1",
			"哄哈咯咫咱咻咩咧咿囿垂型垠垣垢城垮垓奕契奏奎奐姜姘姿姣姨娃姥姪姚姦威姻孩宣宦室客宥封屎屏屍屋峙峒巷帝帥帟幽庠度建弈弭彥很待徊律徇後徉怒思怠急怎怨恍恰恨恢恆恃恬恫恪恤扁拜挖按拼拭持拮拽指拱拷"
		],
		[
			"ac40",
			"拯括拾拴挑挂政故斫施既春昭映昧是星昨昱昤曷柿染柱柔某柬架枯柵柩柯柄柑枴柚查枸柏柞柳枰柙柢柝柒歪殃殆段毒毗氟泉洋洲洪流津洌洱洞洗"
		],
		[
			"aca1",
			"活洽派洶洛泵洹洧洸洩洮洵洎洫炫為炳炬炯炭炸炮炤爰牲牯牴狩狠狡玷珊玻玲珍珀玳甚甭畏界畎畋疫疤疥疢疣癸皆皇皈盈盆盃盅省盹相眉看盾盼眇矜砂研砌砍祆祉祈祇禹禺科秒秋穿突竿竽籽紂紅紀紉紇約紆缸美羿耄"
		],
		[
			"ad40",
			"耐耍耑耶胖胥胚胃胄背胡胛胎胞胤胝致舢苧范茅苣苛苦茄若茂茉苒苗英茁苜苔苑苞苓苟苯茆虐虹虻虺衍衫要觔計訂訃貞負赴赳趴軍軌述迦迢迪迥"
		],
		[
			"ada1",
			"迭迫迤迨郊郎郁郃酋酊重閂限陋陌降面革韋韭音頁風飛食首香乘亳倌倍倣俯倦倥俸倩倖倆值借倚倒們俺倀倔倨俱倡個候倘俳修倭倪俾倫倉兼冤冥冢凍凌准凋剖剜剔剛剝匪卿原厝叟哨唐唁唷哼哥哲唆哺唔哩哭員唉哮哪"
		],
		[
			"ae40",
			"哦唧唇哽唏圃圄埂埔埋埃堉夏套奘奚娑娘娜娟娛娓姬娠娣娩娥娌娉孫屘宰害家宴宮宵容宸射屑展屐峭峽峻峪峨峰島崁峴差席師庫庭座弱徒徑徐恙"
		],
		[
			"aea1",
			"恣恥恐恕恭恩息悄悟悚悍悔悌悅悖扇拳挈拿捎挾振捕捂捆捏捉挺捐挽挪挫挨捍捌效敉料旁旅時晉晏晃晒晌晅晁書朔朕朗校核案框桓根桂桔栩梳栗桌桑栽柴桐桀格桃株桅栓栘桁殊殉殷氣氧氨氦氤泰浪涕消涇浦浸海浙涓"
		],
		[
			"af40",
			"浬涉浮浚浴浩涌涊浹涅浥涔烊烘烤烙烈烏爹特狼狹狽狸狷玆班琉珮珠珪珞畔畝畜畚留疾病症疲疳疽疼疹痂疸皋皰益盍盎眩真眠眨矩砰砧砸砝破砷"
		],
		[
			"afa1",
			"砥砭砠砟砲祕祐祠祟祖神祝祗祚秤秣秧租秦秩秘窄窈站笆笑粉紡紗紋紊素索純紐紕級紜納紙紛缺罟羔翅翁耆耘耕耙耗耽耿胱脂胰脅胭胴脆胸胳脈能脊胼胯臭臬舀舐航舫舨般芻茫荒荔荊茸荐草茵茴荏茲茹茶茗荀茱茨荃"
		],
		[
			"b040",
			"虔蚊蚪蚓蚤蚩蚌蚣蚜衰衷袁袂衽衹記訐討訌訕訊託訓訖訏訑豈豺豹財貢起躬軒軔軏辱送逆迷退迺迴逃追逅迸邕郡郝郢酒配酌釘針釗釜釙閃院陣陡"
		],
		[
			"b0a1",
			"陛陝除陘陞隻飢馬骨高鬥鬲鬼乾偺偽停假偃偌做偉健偶偎偕偵側偷偏倏偯偭兜冕凰剪副勒務勘動匐匏匙匿區匾參曼商啪啦啄啞啡啃啊唱啖問啕唯啤唸售啜唬啣唳啁啗圈國圉域堅堊堆埠埤基堂堵執培夠奢娶婁婉婦婪婀"
		],
		[
			"b140",
			"娼婢婚婆婊孰寇寅寄寂宿密尉專將屠屜屝崇崆崎崛崖崢崑崩崔崙崤崧崗巢常帶帳帷康庸庶庵庾張強彗彬彩彫得徙從徘御徠徜恿患悉悠您惋悴惦悽"
		],
		[
			"b1a1",
			"情悻悵惜悼惘惕惆惟悸惚惇戚戛扈掠控捲掖探接捷捧掘措捱掩掉掃掛捫推掄授掙採掬排掏掀捻捩捨捺敝敖救教敗啟敏敘敕敔斜斛斬族旋旌旎晝晚晤晨晦晞曹勗望梁梯梢梓梵桿桶梱梧梗械梃棄梭梆梅梔條梨梟梡梂欲殺"
		],
		[
			"b240",
			"毫毬氫涎涼淳淙液淡淌淤添淺清淇淋涯淑涮淞淹涸混淵淅淒渚涵淚淫淘淪深淮淨淆淄涪淬涿淦烹焉焊烽烯爽牽犁猜猛猖猓猙率琅琊球理現琍瓠瓶"
		],
		[
			"b2a1",
			"瓷甜產略畦畢異疏痔痕疵痊痍皎盔盒盛眷眾眼眶眸眺硫硃硎祥票祭移窒窕笠笨笛第符笙笞笮粒粗粕絆絃統紮紹紼絀細紳組累終紲紱缽羞羚翌翎習耜聊聆脯脖脣脫脩脰脤舂舵舷舶船莎莞莘荸莢莖莽莫莒莊莓莉莠荷荻荼"
		],
		[
			"b340",
			"莆莧處彪蛇蛀蚶蛄蚵蛆蛋蚱蚯蛉術袞袈被袒袖袍袋覓規訪訝訣訥許設訟訛訢豉豚販責貫貨貪貧赧赦趾趺軛軟這逍通逗連速逝逐逕逞造透逢逖逛途"
		],
		[
			"b3a1",
			"部郭都酗野釵釦釣釧釭釩閉陪陵陳陸陰陴陶陷陬雀雪雩章竟頂頃魚鳥鹵鹿麥麻傢傍傅備傑傀傖傘傚最凱割剴創剩勞勝勛博厥啻喀喧啼喊喝喘喂喜喪喔喇喋喃喳單喟唾喲喚喻喬喱啾喉喫喙圍堯堪場堤堰報堡堝堠壹壺奠"
		],
		[
			"b440",
			"婷媚婿媒媛媧孳孱寒富寓寐尊尋就嵌嵐崴嵇巽幅帽幀幃幾廊廁廂廄弼彭復循徨惑惡悲悶惠愜愣惺愕惰惻惴慨惱愎惶愉愀愒戟扉掣掌描揀揩揉揆揍"
		],
		[
			"b4a1",
			"插揣提握揖揭揮捶援揪換摒揚揹敞敦敢散斑斐斯普晰晴晶景暑智晾晷曾替期朝棺棕棠棘棗椅棟棵森棧棹棒棲棣棋棍植椒椎棉棚楮棻款欺欽殘殖殼毯氮氯氬港游湔渡渲湧湊渠渥渣減湛湘渤湖湮渭渦湯渴湍渺測湃渝渾滋"
		],
		[
			"b540",
			"溉渙湎湣湄湲湩湟焙焚焦焰無然煮焜牌犄犀猶猥猴猩琺琪琳琢琥琵琶琴琯琛琦琨甥甦畫番痢痛痣痙痘痞痠登發皖皓皴盜睏短硝硬硯稍稈程稅稀窘"
		],
		[
			"b5a1",
			"窗窖童竣等策筆筐筒答筍筋筏筑粟粥絞結絨絕紫絮絲絡給絢絰絳善翔翕耋聒肅腕腔腋腑腎脹腆脾腌腓腴舒舜菩萃菸萍菠菅萋菁華菱菴著萊菰萌菌菽菲菊萸萎萄菜萇菔菟虛蛟蛙蛭蛔蛛蛤蛐蛞街裁裂袱覃視註詠評詞証詁"
		],
		[
			"b640",
			"詔詛詐詆訴診訶詖象貂貯貼貳貽賁費賀貴買貶貿貸越超趁跎距跋跚跑跌跛跆軻軸軼辜逮逵週逸進逶鄂郵鄉郾酣酥量鈔鈕鈣鈉鈞鈍鈐鈇鈑閔閏開閑"
		],
		[
			"b6a1",
			"間閒閎隊階隋陽隅隆隍陲隄雁雅雄集雇雯雲韌項順須飧飪飯飩飲飭馮馭黃黍黑亂傭債傲傳僅傾催傷傻傯僇剿剷剽募勦勤勢勣匯嗟嗨嗓嗦嗎嗜嗇嗑嗣嗤嗯嗚嗡嗅嗆嗥嗉園圓塞塑塘塗塚塔填塌塭塊塢塒塋奧嫁嫉嫌媾媽媼"
		],
		[
			"b740",
			"媳嫂媲嵩嵯幌幹廉廈弒彙徬微愚意慈感想愛惹愁愈慎慌慄慍愾愴愧愍愆愷戡戢搓搾搞搪搭搽搬搏搜搔損搶搖搗搆敬斟新暗暉暇暈暖暄暘暍會榔業"
		],
		[
			"b7a1",
			"楚楷楠楔極椰概楊楨楫楞楓楹榆楝楣楛歇歲毀殿毓毽溢溯滓溶滂源溝滇滅溥溘溼溺溫滑準溜滄滔溪溧溴煎煙煩煤煉照煜煬煦煌煥煞煆煨煖爺牒猷獅猿猾瑯瑚瑕瑟瑞瑁琿瑙瑛瑜當畸瘀痰瘁痲痱痺痿痴痳盞盟睛睫睦睞督"
		],
		[
			"b840",
			"睹睪睬睜睥睨睢矮碎碰碗碘碌碉硼碑碓硿祺祿禁萬禽稜稚稠稔稟稞窟窠筷節筠筮筧粱粳粵經絹綑綁綏絛置罩罪署義羨群聖聘肆肄腱腰腸腥腮腳腫"
		],
		[
			"b8a1",
			"腹腺腦舅艇蒂葷落萱葵葦葫葉葬葛萼萵葡董葩葭葆虞虜號蛹蜓蜈蜇蜀蛾蛻蜂蜃蜆蜊衙裟裔裙補裘裝裡裊裕裒覜解詫該詳試詩詰誇詼詣誠話誅詭詢詮詬詹詻訾詨豢貊貉賊資賈賄貲賃賂賅跡跟跨路跳跺跪跤跦躲較載軾輊"
		],
		[
			"b940",
			"辟農運遊道遂達逼違遐遇遏過遍遑逾遁鄒鄗酬酪酩釉鈷鉗鈸鈽鉀鈾鉛鉋鉤鉑鈴鉉鉍鉅鈹鈿鉚閘隘隔隕雍雋雉雊雷電雹零靖靴靶預頑頓頊頒頌飼飴"
		],
		[
			"b9a1",
			"飽飾馳馱馴髡鳩麂鼎鼓鼠僧僮僥僖僭僚僕像僑僱僎僩兢凳劃劂匱厭嗾嘀嘛嘗嗽嘔嘆嘉嘍嘎嗷嘖嘟嘈嘐嗶團圖塵塾境墓墊塹墅塽壽夥夢夤奪奩嫡嫦嫩嫗嫖嫘嫣孵寞寧寡寥實寨寢寤察對屢嶄嶇幛幣幕幗幔廓廖弊彆彰徹慇"
		],
		[
			"ba40",
			"愿態慷慢慣慟慚慘慵截撇摘摔撤摸摟摺摑摧搴摭摻敲斡旗旖暢暨暝榜榨榕槁榮槓構榛榷榻榫榴槐槍榭槌榦槃榣歉歌氳漳演滾漓滴漩漾漠漬漏漂漢"
		],
		[
			"baa1",
			"滿滯漆漱漸漲漣漕漫漯澈漪滬漁滲滌滷熔熙煽熊熄熒爾犒犖獄獐瑤瑣瑪瑰瑭甄疑瘧瘍瘋瘉瘓盡監瞄睽睿睡磁碟碧碳碩碣禎福禍種稱窪窩竭端管箕箋筵算箝箔箏箸箇箄粹粽精綻綰綜綽綾綠緊綴網綱綺綢綿綵綸維緒緇綬"
		],
		[
			"bb40",
			"罰翠翡翟聞聚肇腐膀膏膈膊腿膂臧臺與舔舞艋蓉蒿蓆蓄蒙蒞蒲蒜蓋蒸蓀蓓蒐蒼蓑蓊蜿蜜蜻蜢蜥蜴蜘蝕蜷蜩裳褂裴裹裸製裨褚裯誦誌語誣認誡誓誤"
		],
		[
			"bba1",
			"說誥誨誘誑誚誧豪貍貌賓賑賒赫趙趕跼輔輒輕輓辣遠遘遜遣遙遞遢遝遛鄙鄘鄞酵酸酷酴鉸銀銅銘銖鉻銓銜銨鉼銑閡閨閩閣閥閤隙障際雌雒需靼鞅韶頗領颯颱餃餅餌餉駁骯骰髦魁魂鳴鳶鳳麼鼻齊億儀僻僵價儂儈儉儅凜"
		],
		[
			"bc40",
			"劇劈劉劍劊勰厲嘮嘻嘹嘲嘿嘴嘩噓噎噗噴嘶嘯嘰墀墟增墳墜墮墩墦奭嬉嫻嬋嫵嬌嬈寮寬審寫層履嶝嶔幢幟幡廢廚廟廝廣廠彈影德徵慶慧慮慝慕憂"
		],
		[
			"bca1",
			"慼慰慫慾憧憐憫憎憬憚憤憔憮戮摩摯摹撞撲撈撐撰撥撓撕撩撒撮播撫撚撬撙撢撳敵敷數暮暫暴暱樣樟槨樁樞標槽模樓樊槳樂樅槭樑歐歎殤毅毆漿潼澄潑潦潔澆潭潛潸潮澎潺潰潤澗潘滕潯潠潟熟熬熱熨牖犛獎獗瑩璋璃"
		],
		[
			"bd40",
			"瑾璀畿瘠瘩瘟瘤瘦瘡瘢皚皺盤瞎瞇瞌瞑瞋磋磅確磊碾磕碼磐稿稼穀稽稷稻窯窮箭箱範箴篆篇篁箠篌糊締練緯緻緘緬緝編緣線緞緩綞緙緲緹罵罷羯"
		],
		[
			"bda1",
			"翩耦膛膜膝膠膚膘蔗蔽蔚蓮蔬蔭蔓蔑蔣蔡蔔蓬蔥蓿蔆螂蝴蝶蝠蝦蝸蝨蝙蝗蝌蝓衛衝褐複褒褓褕褊誼諒談諄誕請諸課諉諂調誰論諍誶誹諛豌豎豬賠賞賦賤賬賭賢賣賜質賡赭趟趣踫踐踝踢踏踩踟踡踞躺輝輛輟輩輦輪輜輞"
		],
		[
			"be40",
			"輥適遮遨遭遷鄰鄭鄧鄱醇醉醋醃鋅銻銷鋪銬鋤鋁銳銼鋒鋇鋰銲閭閱霄霆震霉靠鞍鞋鞏頡頫頜颳養餓餒餘駝駐駟駛駑駕駒駙骷髮髯鬧魅魄魷魯鴆鴉"
		],
		[
			"bea1",
			"鴃麩麾黎墨齒儒儘儔儐儕冀冪凝劑劓勳噙噫噹噩噤噸噪器噥噱噯噬噢噶壁墾壇壅奮嬝嬴學寰導彊憲憑憩憊懍憶憾懊懈戰擅擁擋撻撼據擄擇擂操撿擒擔撾整曆曉暹曄曇暸樽樸樺橙橫橘樹橄橢橡橋橇樵機橈歙歷氅濂澱澡"
		],
		[
			"bf40",
			"濃澤濁澧澳激澹澶澦澠澴熾燉燐燒燈燕熹燎燙燜燃燄獨璜璣璘璟璞瓢甌甍瘴瘸瘺盧盥瞠瞞瞟瞥磨磚磬磧禦積穎穆穌穋窺篙簑築篤篛篡篩篦糕糖縊"
		],
		[
			"bfa1",
			"縑縈縛縣縞縝縉縐罹羲翰翱翮耨膳膩膨臻興艘艙蕊蕙蕈蕨蕩蕃蕉蕭蕪蕞螃螟螞螢融衡褪褲褥褫褡親覦諦諺諫諱謀諜諧諮諾謁謂諷諭諳諶諼豫豭貓賴蹄踱踴蹂踹踵輻輯輸輳辨辦遵遴選遲遼遺鄴醒錠錶鋸錳錯錢鋼錫錄錚"
		],
		[
			"c040",
			"錐錦錡錕錮錙閻隧隨險雕霎霑霖霍霓霏靛靜靦鞘頰頸頻頷頭頹頤餐館餞餛餡餚駭駢駱骸骼髻髭鬨鮑鴕鴣鴦鴨鴒鴛默黔龍龜優償儡儲勵嚎嚀嚐嚅嚇"
		],
		[
			"c0a1",
			"嚏壕壓壑壎嬰嬪嬤孺尷屨嶼嶺嶽嶸幫彌徽應懂懇懦懋戲戴擎擊擘擠擰擦擬擱擢擭斂斃曙曖檀檔檄檢檜櫛檣橾檗檐檠歜殮毚氈濘濱濟濠濛濤濫濯澀濬濡濩濕濮濰燧營燮燦燥燭燬燴燠爵牆獰獲璩環璦璨癆療癌盪瞳瞪瞰瞬"
		],
		[
			"c140",
			"瞧瞭矯磷磺磴磯礁禧禪穗窿簇簍篾篷簌篠糠糜糞糢糟糙糝縮績繆縷縲繃縫總縱繅繁縴縹繈縵縿縯罄翳翼聱聲聰聯聳臆臃膺臂臀膿膽臉膾臨舉艱薪"
		],
		[
			"c1a1",
			"薄蕾薜薑薔薯薛薇薨薊虧蟀蟑螳蟒蟆螫螻螺蟈蟋褻褶襄褸褽覬謎謗謙講謊謠謝謄謐豁谿豳賺賽購賸賻趨蹉蹋蹈蹊轄輾轂轅輿避遽還邁邂邀鄹醣醞醜鍍鎂錨鍵鍊鍥鍋錘鍾鍬鍛鍰鍚鍔闊闋闌闈闆隱隸雖霜霞鞠韓顆颶餵騁"
		],
		[
			"c240",
			"駿鮮鮫鮪鮭鴻鴿麋黏點黜黝黛鼾齋叢嚕嚮壙壘嬸彝懣戳擴擲擾攆擺擻擷斷曜朦檳檬櫃檻檸櫂檮檯歟歸殯瀉瀋濾瀆濺瀑瀏燻燼燾燸獷獵璧璿甕癖癘"
		],
		[
			"c2a1",
			"癒瞽瞿瞻瞼礎禮穡穢穠竄竅簫簧簪簞簣簡糧織繕繞繚繡繒繙罈翹翻職聶臍臏舊藏薩藍藐藉薰薺薹薦蟯蟬蟲蟠覆覲觴謨謹謬謫豐贅蹙蹣蹦蹤蹟蹕軀轉轍邇邃邈醫醬釐鎔鎊鎖鎢鎳鎮鎬鎰鎘鎚鎗闔闖闐闕離雜雙雛雞霤鞣鞦"
		],
		[
			"c340",
			"鞭韹額顏題顎顓颺餾餿餽餮馥騎髁鬃鬆魏魎魍鯊鯉鯽鯈鯀鵑鵝鵠黠鼕鼬儳嚥壞壟壢寵龐廬懲懷懶懵攀攏曠曝櫥櫝櫚櫓瀛瀟瀨瀚瀝瀕瀘爆爍牘犢獸"
		],
		[
			"c3a1",
			"獺璽瓊瓣疇疆癟癡矇礙禱穫穩簾簿簸簽簷籀繫繭繹繩繪羅繳羶羹羸臘藩藝藪藕藤藥藷蟻蠅蠍蟹蟾襠襟襖襞譁譜識證譚譎譏譆譙贈贊蹼蹲躇蹶蹬蹺蹴轔轎辭邊邋醱醮鏡鏑鏟鏃鏈鏜鏝鏖鏢鏍鏘鏤鏗鏨關隴難霪霧靡韜韻類"
		],
		[
			"c440",
			"願顛颼饅饉騖騙鬍鯨鯧鯖鯛鶉鵡鵲鵪鵬麒麗麓麴勸嚨嚷嚶嚴嚼壤孀孃孽寶巉懸懺攘攔攙曦朧櫬瀾瀰瀲爐獻瓏癢癥礦礪礬礫竇競籌籃籍糯糰辮繽繼"
		],
		[
			"c4a1",
			"纂罌耀臚艦藻藹蘑藺蘆蘋蘇蘊蠔蠕襤覺觸議譬警譯譟譫贏贍躉躁躅躂醴釋鐘鐃鏽闡霰飄饒饑馨騫騰騷騵鰓鰍鹹麵黨鼯齟齣齡儷儸囁囀囂夔屬巍懼懾攝攜斕曩櫻欄櫺殲灌爛犧瓖瓔癩矓籐纏續羼蘗蘭蘚蠣蠢蠡蠟襪襬覽譴"
		],
		[
			"c540",
			"護譽贓躊躍躋轟辯醺鐮鐳鐵鐺鐸鐲鐫闢霸霹露響顧顥饗驅驃驀騾髏魔魑鰭鰥鶯鶴鷂鶸麝黯鼙齜齦齧儼儻囈囊囉孿巔巒彎懿攤權歡灑灘玀瓤疊癮癬"
		],
		[
			"c5a1",
			"禳籠籟聾聽臟襲襯觼讀贖贗躑躓轡酈鑄鑑鑒霽霾韃韁顫饕驕驍髒鬚鱉鰱鰾鰻鷓鷗鼴齬齪龔囌巖戀攣攫攪曬欐瓚竊籤籣籥纓纖纔臢蘸蘿蠱變邐邏鑣鑠鑤靨顯饜驚驛驗髓體髑鱔鱗鱖鷥麟黴囑壩攬灞癱癲矗罐羈蠶蠹衢讓讒"
		],
		[
			"c640",
			"讖艷贛釀鑪靂靈靄韆顰驟鬢魘鱟鷹鷺鹼鹽鼇齷齲廳欖灣籬籮蠻觀躡釁鑲鑰顱饞髖鬣黌灤矚讚鑷韉驢驥纜讜躪釅鑽鑾鑼鱷鱸黷豔鑿鸚爨驪鬱鸛鸞籲"
		],
		[
			"c940",
			"乂乜凵匚厂万丌乇亍囗兀屮彳丏冇与丮亓仂仉仈冘勼卬厹圠夃夬尐巿旡殳毌气爿丱丼仨仜仩仡仝仚刌匜卌圢圣夗夯宁宄尒尻屴屳帄庀庂忉戉扐氕"
		],
		[
			"c9a1",
			"氶汃氿氻犮犰玊禸肊阞伎优伬仵伔仱伀价伈伝伂伅伢伓伄仴伒冱刓刉刐劦匢匟卍厊吇囡囟圮圪圴夼妀奼妅奻奾奷奿孖尕尥屼屺屻屾巟幵庄异弚彴忕忔忏扜扞扤扡扦扢扙扠扚扥旯旮朾朹朸朻机朿朼朳氘汆汒汜汏汊汔汋"
		],
		[
			"ca40",
			"汌灱牞犴犵玎甪癿穵网艸艼芀艽艿虍襾邙邗邘邛邔阢阤阠阣佖伻佢佉体佤伾佧佒佟佁佘伭伳伿佡冏冹刜刞刡劭劮匉卣卲厎厏吰吷吪呔呅吙吜吥吘"
		],
		[
			"caa1",
			"吽呏呁吨吤呇囮囧囥坁坅坌坉坋坒夆奀妦妘妠妗妎妢妐妏妧妡宎宒尨尪岍岏岈岋岉岒岊岆岓岕巠帊帎庋庉庌庈庍弅弝彸彶忒忑忐忭忨忮忳忡忤忣忺忯忷忻怀忴戺抃抌抎抏抔抇扱扻扺扰抁抈扷扽扲扴攷旰旴旳旲旵杅杇"
		],
		[
			"cb40",
			"杙杕杌杈杝杍杚杋毐氙氚汸汧汫沄沋沏汱汯汩沚汭沇沕沜汦汳汥汻沎灴灺牣犿犽狃狆狁犺狅玕玗玓玔玒町甹疔疕皁礽耴肕肙肐肒肜芐芏芅芎芑芓"
		],
		[
			"cba1",
			"芊芃芄豸迉辿邟邡邥邞邧邠阰阨阯阭丳侘佼侅佽侀侇佶佴侉侄佷佌侗佪侚佹侁佸侐侜侔侞侒侂侕佫佮冞冼冾刵刲刳剆刱劼匊匋匼厒厔咇呿咁咑咂咈呫呺呾呥呬呴呦咍呯呡呠咘呣呧呤囷囹坯坲坭坫坱坰坶垀坵坻坳坴坢"
		],
		[
			"cc40",
			"坨坽夌奅妵妺姏姎妲姌姁妶妼姃姖妱妽姀姈妴姇孢孥宓宕屄屇岮岤岠岵岯岨岬岟岣岭岢岪岧岝岥岶岰岦帗帔帙弨弢弣弤彔徂彾彽忞忥怭怦怙怲怋"
		],
		[
			"cca1",
			"怴怊怗怳怚怞怬怢怍怐怮怓怑怌怉怜戔戽抭抴拑抾抪抶拊抮抳抯抻抩抰抸攽斨斻昉旼昄昒昈旻昃昋昍昅旽昑昐曶朊枅杬枎枒杶杻枘枆构杴枍枌杺枟枑枙枃杽极杸杹枔欥殀歾毞氝沓泬泫泮泙沶泔沭泧沷泐泂沺泃泆泭泲"
		],
		[
			"cd40",
			"泒泝沴沊沝沀泞泀洰泍泇沰泹泏泩泑炔炘炅炓炆炄炑炖炂炚炃牪狖狋狘狉狜狒狔狚狌狑玤玡玭玦玢玠玬玝瓝瓨甿畀甾疌疘皯盳盱盰盵矸矼矹矻矺"
		],
		[
			"cda1",
			"矷祂礿秅穸穻竻籵糽耵肏肮肣肸肵肭舠芠苀芫芚芘芛芵芧芮芼芞芺芴芨芡芩苂芤苃芶芢虰虯虭虮豖迒迋迓迍迖迕迗邲邴邯邳邰阹阽阼阺陃俍俅俓侲俉俋俁俔俜俙侻侳俛俇俖侺俀侹俬剄剉勀勂匽卼厗厖厙厘咺咡咭咥哏"
		],
		[
			"ce40",
			"哃茍咷咮哖咶哅哆咠呰咼咢咾呲哞咰垵垞垟垤垌垗垝垛垔垘垏垙垥垚垕壴复奓姡姞姮娀姱姝姺姽姼姶姤姲姷姛姩姳姵姠姾姴姭宨屌峐峘峌峗峋峛"
		],
		[
			"cea1",
			"峞峚峉峇峊峖峓峔峏峈峆峎峟峸巹帡帢帣帠帤庰庤庢庛庣庥弇弮彖徆怷怹恔恲恞恅恓恇恉恛恌恀恂恟怤恄恘恦恮扂扃拏挍挋拵挎挃拫拹挏挌拸拶挀挓挔拺挕拻拰敁敃斪斿昶昡昲昵昜昦昢昳昫昺昝昴昹昮朏朐柁柲柈枺"
		],
		[
			"cf40",
			"柜枻柸柘柀枷柅柫柤柟枵柍枳柷柶柮柣柂枹柎柧柰枲柼柆柭柌枮柦柛柺柉柊柃柪柋欨殂殄殶毖毘毠氠氡洨洴洭洟洼洿洒洊泚洳洄洙洺洚洑洀洝浂"
		],
		[
			"cfa1",
			"洁洘洷洃洏浀洇洠洬洈洢洉洐炷炟炾炱炰炡炴炵炩牁牉牊牬牰牳牮狊狤狨狫狟狪狦狣玅珌珂珈珅玹玶玵玴珫玿珇玾珃珆玸珋瓬瓮甮畇畈疧疪癹盄眈眃眄眅眊盷盻盺矧矨砆砑砒砅砐砏砎砉砃砓祊祌祋祅祄秕种秏秖秎窀"
		],
		[
			"d040",
			"穾竑笀笁籺籸籹籿粀粁紃紈紁罘羑羍羾耇耎耏耔耷胘胇胠胑胈胂胐胅胣胙胜胊胕胉胏胗胦胍臿舡芔苙苾苹茇苨茀苕茺苫苖苴苬苡苲苵茌苻苶苰苪"
		],
		[
			"d0a1",
			"苤苠苺苳苭虷虴虼虳衁衎衧衪衩觓訄訇赲迣迡迮迠郱邽邿郕郅邾郇郋郈釔釓陔陏陑陓陊陎倞倅倇倓倢倰倛俵俴倳倷倬俶俷倗倜倠倧倵倯倱倎党冔冓凊凄凅凈凎剡剚剒剞剟剕剢勍匎厞唦哢唗唒哧哳哤唚哿唄唈哫唑唅哱"
		],
		[
			"d140",
			"唊哻哷哸哠唎唃唋圁圂埌堲埕埒垺埆垽垼垸垶垿埇埐垹埁夎奊娙娖娭娮娕娏娗娊娞娳孬宧宭宬尃屖屔峬峿峮峱峷崀峹帩帨庨庮庪庬弳弰彧恝恚恧"
		],
		[
			"d1a1",
			"恁悢悈悀悒悁悝悃悕悛悗悇悜悎戙扆拲挐捖挬捄捅挶捃揤挹捋捊挼挩捁挴捘捔捙挭捇挳捚捑挸捗捀捈敊敆旆旃旄旂晊晟晇晑朒朓栟栚桉栲栳栻桋桏栖栱栜栵栫栭栯桎桄栴栝栒栔栦栨栮桍栺栥栠欬欯欭欱欴歭肂殈毦毤"
		],
		[
			"d240",
			"毨毣毢毧氥浺浣浤浶洍浡涒浘浢浭浯涑涍淯浿涆浞浧浠涗浰浼浟涂涘洯浨涋浾涀涄洖涃浻浽浵涐烜烓烑烝烋缹烢烗烒烞烠烔烍烅烆烇烚烎烡牂牸"
		],
		[
			"d2a1",
			"牷牶猀狺狴狾狶狳狻猁珓珙珥珖玼珧珣珩珜珒珛珔珝珚珗珘珨瓞瓟瓴瓵甡畛畟疰痁疻痄痀疿疶疺皊盉眝眛眐眓眒眣眑眕眙眚眢眧砣砬砢砵砯砨砮砫砡砩砳砪砱祔祛祏祜祓祒祑秫秬秠秮秭秪秜秞秝窆窉窅窋窌窊窇竘笐"
		],
		[
			"d340",
			"笄笓笅笏笈笊笎笉笒粄粑粊粌粈粍粅紞紝紑紎紘紖紓紟紒紏紌罜罡罞罠罝罛羖羒翃翂翀耖耾耹胺胲胹胵脁胻脀舁舯舥茳茭荄茙荑茥荖茿荁茦茜茢"
		],
		[
			"d3a1",
			"荂荎茛茪茈茼荍茖茤茠茷茯茩荇荅荌荓茞茬荋茧荈虓虒蚢蚨蚖蚍蚑蚞蚇蚗蚆蚋蚚蚅蚥蚙蚡蚧蚕蚘蚎蚝蚐蚔衃衄衭衵衶衲袀衱衿衯袃衾衴衼訒豇豗豻貤貣赶赸趵趷趶軑軓迾迵适迿迻逄迼迶郖郠郙郚郣郟郥郘郛郗郜郤酐"
		],
		[
			"d440",
			"酎酏釕釢釚陜陟隼飣髟鬯乿偰偪偡偞偠偓偋偝偲偈偍偁偛偊偢倕偅偟偩偫偣偤偆偀偮偳偗偑凐剫剭剬剮勖勓匭厜啵啶唼啍啐唴唪啑啢唶唵唰啒啅"
		],
		[
			"d4a1",
			"唌唲啥啎唹啈唭唻啀啋圊圇埻堔埢埶埜埴堀埭埽堈埸堋埳埏堇埮埣埲埥埬埡堎埼堐埧堁堌埱埩埰堍堄奜婠婘婕婧婞娸娵婭婐婟婥婬婓婤婗婃婝婒婄婛婈媎娾婍娹婌婰婩婇婑婖婂婜孲孮寁寀屙崞崋崝崚崠崌崨崍崦崥崏"
		],
		[
			"d540",
			"崰崒崣崟崮帾帴庱庴庹庲庳弶弸徛徖徟悊悐悆悾悰悺惓惔惏惤惙惝惈悱惛悷惊悿惃惍惀挲捥掊掂捽掽掞掭掝掗掫掎捯掇掐据掯捵掜捭掮捼掤挻掟"
		],
		[
			"d5a1",
			"捸掅掁掑掍捰敓旍晥晡晛晙晜晢朘桹梇梐梜桭桮梮梫楖桯梣梬梩桵桴梲梏桷梒桼桫桲梪梀桱桾梛梖梋梠梉梤桸桻梑梌梊桽欶欳欷欸殑殏殍殎殌氪淀涫涴涳湴涬淩淢涷淶淔渀淈淠淟淖涾淥淜淝淛淴淊涽淭淰涺淕淂淏淉"
		],
		[
			"d640",
			"淐淲淓淽淗淍淣涻烺焍烷焗烴焌烰焄烳焐烼烿焆焓焀烸烶焋焂焎牾牻牼牿猝猗猇猑猘猊猈狿猏猞玈珶珸珵琄琁珽琇琀珺珼珿琌琋珴琈畤畣痎痒痏"
		],
		[
			"d6a1",
			"痋痌痑痐皏皉盓眹眯眭眱眲眴眳眽眥眻眵硈硒硉硍硊硌砦硅硐祤祧祩祪祣祫祡离秺秸秶秷窏窔窐笵筇笴笥笰笢笤笳笘笪笝笱笫笭笯笲笸笚笣粔粘粖粣紵紽紸紶紺絅紬紩絁絇紾紿絊紻紨罣羕羜羝羛翊翋翍翐翑翇翏翉耟"
		],
		[
			"d740",
			"耞耛聇聃聈脘脥脙脛脭脟脬脞脡脕脧脝脢舑舸舳舺舴舲艴莐莣莨莍荺荳莤荴莏莁莕莙荵莔莩荽莃莌莝莛莪莋荾莥莯莈莗莰荿莦莇莮荶莚虙虖蚿蚷"
		],
		[
			"d7a1",
			"蛂蛁蛅蚺蚰蛈蚹蚳蚸蛌蚴蚻蚼蛃蚽蚾衒袉袕袨袢袪袚袑袡袟袘袧袙袛袗袤袬袌袓袎覂觖觙觕訰訧訬訞谹谻豜豝豽貥赽赻赹趼跂趹趿跁軘軞軝軜軗軠軡逤逋逑逜逌逡郯郪郰郴郲郳郔郫郬郩酖酘酚酓酕釬釴釱釳釸釤釹釪"
		],
		[
			"d840",
			"釫釷釨釮镺閆閈陼陭陫陱陯隿靪頄飥馗傛傕傔傞傋傣傃傌傎傝偨傜傒傂傇兟凔匒匑厤厧喑喨喥喭啷噅喢喓喈喏喵喁喣喒喤啽喌喦啿喕喡喎圌堩堷"
		],
		[
			"d8a1",
			"堙堞堧堣堨埵塈堥堜堛堳堿堶堮堹堸堭堬堻奡媯媔媟婺媢媞婸媦婼媥媬媕媮娷媄媊媗媃媋媩婻婽媌媜媏媓媝寪寍寋寔寑寊寎尌尰崷嵃嵫嵁嵋崿崵嵑嵎嵕崳崺嵒崽崱嵙嵂崹嵉崸崼崲崶嵀嵅幄幁彘徦徥徫惉悹惌惢惎惄愔"
		],
		[
			"d940",
			"惲愊愖愅惵愓惸惼惾惁愃愘愝愐惿愄愋扊掔掱掰揎揥揨揯揃撝揳揊揠揶揕揲揵摡揟掾揝揜揄揘揓揂揇揌揋揈揰揗揙攲敧敪敤敜敨敥斌斝斞斮旐旒"
		],
		[
			"d9a1",
			"晼晬晻暀晱晹晪晲朁椌棓椄棜椪棬棪棱椏棖棷棫棤棶椓椐棳棡椇棌椈楰梴椑棯棆椔棸棐棽棼棨椋椊椗棎棈棝棞棦棴棑椆棔棩椕椥棇欹欻欿欼殔殗殙殕殽毰毲毳氰淼湆湇渟湉溈渼渽湅湢渫渿湁湝湳渜渳湋湀湑渻渃渮湞"
		],
		[
			"da40",
			"湨湜湡渱渨湠湱湫渹渢渰湓湥渧湸湤湷湕湹湒湦渵渶湚焠焞焯烻焮焱焣焥焢焲焟焨焺焛牋牚犈犉犆犅犋猒猋猰猢猱猳猧猲猭猦猣猵猌琮琬琰琫琖"
		],
		[
			"daa1",
			"琚琡琭琱琤琣琝琩琠琲瓻甯畯畬痧痚痡痦痝痟痤痗皕皒盚睆睇睄睍睅睊睎睋睌矞矬硠硤硥硜硭硱硪确硰硩硨硞硢祴祳祲祰稂稊稃稌稄窙竦竤筊笻筄筈筌筎筀筘筅粢粞粨粡絘絯絣絓絖絧絪絏絭絜絫絒絔絩絑絟絎缾缿罥"
		],
		[
			"db40",
			"罦羢羠羡翗聑聏聐胾胔腃腊腒腏腇脽腍脺臦臮臷臸臹舄舼舽舿艵茻菏菹萣菀菨萒菧菤菼菶萐菆菈菫菣莿萁菝菥菘菿菡菋菎菖菵菉萉萏菞萑萆菂菳"
		],
		[
			"dba1",
			"菕菺菇菑菪萓菃菬菮菄菻菗菢萛菛菾蛘蛢蛦蛓蛣蛚蛪蛝蛫蛜蛬蛩蛗蛨蛑衈衖衕袺裗袹袸裀袾袶袼袷袽袲褁裉覕覘覗觝觚觛詎詍訹詙詀詗詘詄詅詒詈詑詊詌詏豟貁貀貺貾貰貹貵趄趀趉跘跓跍跇跖跜跏跕跙跈跗跅軯軷軺"
		],
		[
			"dc40",
			"軹軦軮軥軵軧軨軶軫軱軬軴軩逭逴逯鄆鄬鄄郿郼鄈郹郻鄁鄀鄇鄅鄃酡酤酟酢酠鈁鈊鈥鈃鈚鈦鈏鈌鈀鈒釿釽鈆鈄鈧鈂鈜鈤鈙鈗鈅鈖镻閍閌閐隇陾隈"
		],
		[
			"dca1",
			"隉隃隀雂雈雃雱雰靬靰靮頇颩飫鳦黹亃亄亶傽傿僆傮僄僊傴僈僂傰僁傺傱僋僉傶傸凗剺剸剻剼嗃嗛嗌嗐嗋嗊嗝嗀嗔嗄嗩喿嗒喍嗏嗕嗢嗖嗈嗲嗍嗙嗂圔塓塨塤塏塍塉塯塕塎塝塙塥塛堽塣塱壼嫇嫄嫋媺媸媱媵媰媿嫈媻嫆"
		],
		[
			"dd40",
			"媷嫀嫊媴媶嫍媹媐寖寘寙尟尳嵱嵣嵊嵥嵲嵬嵞嵨嵧嵢巰幏幎幊幍幋廅廌廆廋廇彀徯徭惷慉慊愫慅愶愲愮慆愯慏愩慀戠酨戣戥戤揅揱揫搐搒搉搠搤"
		],
		[
			"dda1",
			"搳摃搟搕搘搹搷搢搣搌搦搰搨摁搵搯搊搚摀搥搧搋揧搛搮搡搎敯斒旓暆暌暕暐暋暊暙暔晸朠楦楟椸楎楢楱椿楅楪椹楂楗楙楺楈楉椵楬椳椽楥棰楸椴楩楀楯楄楶楘楁楴楌椻楋椷楜楏楑椲楒椯楻椼歆歅歃歂歈歁殛嗀毻毼"
		],
		[
			"de40",
			"毹毷毸溛滖滈溏滀溟溓溔溠溱溹滆滒溽滁溞滉溷溰滍溦滏溲溾滃滜滘溙溒溎溍溤溡溿溳滐滊溗溮溣煇煔煒煣煠煁煝煢煲煸煪煡煂煘煃煋煰煟煐煓"
		],
		[
			"dea1",
			"煄煍煚牏犍犌犑犐犎猼獂猻猺獀獊獉瑄瑊瑋瑒瑑瑗瑀瑏瑐瑎瑂瑆瑍瑔瓡瓿瓾瓽甝畹畷榃痯瘏瘃痷痾痼痹痸瘐痻痶痭痵痽皙皵盝睕睟睠睒睖睚睩睧睔睙睭矠碇碚碔碏碄碕碅碆碡碃硹碙碀碖硻祼禂祽祹稑稘稙稒稗稕稢稓"
		],
		[
			"df40",
			"稛稐窣窢窞竫筦筤筭筴筩筲筥筳筱筰筡筸筶筣粲粴粯綈綆綀綍絿綅絺綎絻綃絼綌綔綄絽綒罭罫罧罨罬羦羥羧翛翜耡腤腠腷腜腩腛腢腲朡腞腶腧腯"
		],
		[
			"dfa1",
			"腄腡舝艉艄艀艂艅蓱萿葖葶葹蒏蒍葥葑葀蒆葧萰葍葽葚葙葴葳葝蔇葞萷萺萴葺葃葸萲葅萩菙葋萯葂萭葟葰萹葎葌葒葯蓅蒎萻葇萶萳葨葾葄萫葠葔葮葐蜋蜄蛷蜌蛺蛖蛵蝍蛸蜎蜉蜁蛶蜍蜅裖裋裍裎裞裛裚裌裐覅覛觟觥觤"
		],
		[
			"e040",
			"觡觠觢觜触詶誆詿詡訿詷誂誄詵誃誁詴詺谼豋豊豥豤豦貆貄貅賌赨赩趑趌趎趏趍趓趔趐趒跰跠跬跱跮跐跩跣跢跧跲跫跴輆軿輁輀輅輇輈輂輋遒逿"
		],
		[
			"e0a1",
			"遄遉逽鄐鄍鄏鄑鄖鄔鄋鄎酮酯鉈鉒鈰鈺鉦鈳鉥鉞銃鈮鉊鉆鉭鉬鉏鉠鉧鉯鈶鉡鉰鈱鉔鉣鉐鉲鉎鉓鉌鉖鈲閟閜閞閛隒隓隑隗雎雺雽雸雵靳靷靸靲頏頍頎颬飶飹馯馲馰馵骭骫魛鳪鳭鳧麀黽僦僔僗僨僳僛僪僝僤僓僬僰僯僣僠"
		],
		[
			"e140",
			"凘劀劁勩勫匰厬嘧嘕嘌嘒嗼嘏嘜嘁嘓嘂嗺嘝嘄嗿嗹墉塼墐墘墆墁塿塴墋塺墇墑墎塶墂墈塻墔墏壾奫嫜嫮嫥嫕嫪嫚嫭嫫嫳嫢嫠嫛嫬嫞嫝嫙嫨嫟孷寠"
		],
		[
			"e1a1",
			"寣屣嶂嶀嵽嶆嵺嶁嵷嶊嶉嶈嵾嵼嶍嵹嵿幘幙幓廘廑廗廎廜廕廙廒廔彄彃彯徶愬愨慁慞慱慳慒慓慲慬憀慴慔慺慛慥愻慪慡慖戩戧戫搫摍摛摝摴摶摲摳摽摵摦撦摎撂摞摜摋摓摠摐摿搿摬摫摙摥摷敳斠暡暠暟朅朄朢榱榶槉"
		],
		[
			"e240",
			"榠槎榖榰榬榼榑榙榎榧榍榩榾榯榿槄榽榤槔榹槊榚槏榳榓榪榡榞槙榗榐槂榵榥槆歊歍歋殞殟殠毃毄毾滎滵滱漃漥滸漷滻漮漉潎漙漚漧漘漻漒滭漊"
		],
		[
			"e2a1",
			"漶潳滹滮漭潀漰漼漵滫漇漎潃漅滽滶漹漜滼漺漟漍漞漈漡熇熐熉熀熅熂熏煻熆熁熗牄牓犗犕犓獃獍獑獌瑢瑳瑱瑵瑲瑧瑮甀甂甃畽疐瘖瘈瘌瘕瘑瘊瘔皸瞁睼瞅瞂睮瞀睯睾瞃碲碪碴碭碨硾碫碞碥碠碬碢碤禘禊禋禖禕禔禓"
		],
		[
			"e340",
			"禗禈禒禐稫穊稰稯稨稦窨窫窬竮箈箜箊箑箐箖箍箌箛箎箅箘劄箙箤箂粻粿粼粺綧綷緂綣綪緁緀緅綝緎緄緆緋緌綯綹綖綼綟綦綮綩綡緉罳翢翣翥翞"
		],
		[
			"e3a1",
			"耤聝聜膉膆膃膇膍膌膋舕蒗蒤蒡蒟蒺蓎蓂蒬蒮蒫蒹蒴蓁蓍蒪蒚蒱蓐蒝蒧蒻蒢蒔蓇蓌蒛蒩蒯蒨蓖蒘蒶蓏蒠蓗蓔蓒蓛蒰蒑虡蜳蜣蜨蝫蝀蜮蜞蜡蜙蜛蝃蜬蝁蜾蝆蜠蜲蜪蜭蜼蜒蜺蜱蜵蝂蜦蜧蜸蜤蜚蜰蜑裷裧裱裲裺裾裮裼裶裻"
		],
		[
			"e440",
			"裰裬裫覝覡覟覞觩觫觨誫誙誋誒誏誖谽豨豩賕賏賗趖踉踂跿踍跽踊踃踇踆踅跾踀踄輐輑輎輍鄣鄜鄠鄢鄟鄝鄚鄤鄡鄛酺酲酹酳銥銤鉶銛鉺銠銔銪銍"
		],
		[
			"e4a1",
			"銦銚銫鉹銗鉿銣鋮銎銂銕銢鉽銈銡銊銆銌銙銧鉾銇銩銝銋鈭隞隡雿靘靽靺靾鞃鞀鞂靻鞄鞁靿韎韍頖颭颮餂餀餇馝馜駃馹馻馺駂馽駇骱髣髧鬾鬿魠魡魟鳱鳲鳵麧僿儃儰僸儆儇僶僾儋儌僽儊劋劌勱勯噈噂噌嘵噁噊噉噆噘"
		],
		[
			"e540",
			"噚噀嘳嘽嘬嘾嘸嘪嘺圚墫墝墱墠墣墯墬墥墡壿嫿嫴嫽嫷嫶嬃嫸嬂嫹嬁嬇嬅嬏屧嶙嶗嶟嶒嶢嶓嶕嶠嶜嶡嶚嶞幩幝幠幜緳廛廞廡彉徲憋憃慹憱憰憢憉"
		],
		[
			"e5a1",
			"憛憓憯憭憟憒憪憡憍慦憳戭摮摰撖撠撅撗撜撏撋撊撌撣撟摨撱撘敶敺敹敻斲斳暵暰暩暲暷暪暯樀樆樗槥槸樕槱槤樠槿槬槢樛樝槾樧槲槮樔槷槧橀樈槦槻樍槼槫樉樄樘樥樏槶樦樇槴樖歑殥殣殢殦氁氀毿氂潁漦潾澇濆澒"
		],
		[
			"e640",
			"澍澉澌潢潏澅潚澖潶潬澂潕潲潒潐潗澔澓潝漀潡潫潽潧澐潓澋潩潿澕潣潷潪潻熲熯熛熰熠熚熩熵熝熥熞熤熡熪熜熧熳犘犚獘獒獞獟獠獝獛獡獚獙"
		],
		[
			"e6a1",
			"獢璇璉璊璆璁瑽璅璈瑼瑹甈甇畾瘥瘞瘙瘝瘜瘣瘚瘨瘛皜皝皞皛瞍瞏瞉瞈磍碻磏磌磑磎磔磈磃磄磉禚禡禠禜禢禛歶稹窲窴窳箷篋箾箬篎箯箹篊箵糅糈糌糋緷緛緪緧緗緡縃緺緦緶緱緰緮緟罶羬羰羭翭翫翪翬翦翨聤聧膣膟"
		],
		[
			"e740",
			"膞膕膢膙膗舖艏艓艒艐艎艑蔤蔻蔏蔀蔩蔎蔉蔍蔟蔊蔧蔜蓻蔫蓺蔈蔌蓴蔪蓲蔕蓷蓫蓳蓼蔒蓪蓩蔖蓾蔨蔝蔮蔂蓽蔞蓶蔱蔦蓧蓨蓰蓯蓹蔘蔠蔰蔋蔙蔯虢"
		],
		[
			"e7a1",
			"蝖蝣蝤蝷蟡蝳蝘蝔蝛蝒蝡蝚蝑蝞蝭蝪蝐蝎蝟蝝蝯蝬蝺蝮蝜蝥蝏蝻蝵蝢蝧蝩衚褅褌褔褋褗褘褙褆褖褑褎褉覢覤覣觭觰觬諏諆誸諓諑諔諕誻諗誾諀諅諘諃誺誽諙谾豍貏賥賟賙賨賚賝賧趠趜趡趛踠踣踥踤踮踕踛踖踑踙踦踧"
		],
		[
			"e840",
			"踔踒踘踓踜踗踚輬輤輘輚輠輣輖輗遳遰遯遧遫鄯鄫鄩鄪鄲鄦鄮醅醆醊醁醂醄醀鋐鋃鋄鋀鋙銶鋏鋱鋟鋘鋩鋗鋝鋌鋯鋂鋨鋊鋈鋎鋦鋍鋕鋉鋠鋞鋧鋑鋓"
		],
		[
			"e8a1",
			"銵鋡鋆銴镼閬閫閮閰隤隢雓霅霈霂靚鞊鞎鞈韐韏頞頝頦頩頨頠頛頧颲餈飺餑餔餖餗餕駜駍駏駓駔駎駉駖駘駋駗駌骳髬髫髳髲髱魆魃魧魴魱魦魶魵魰魨魤魬鳼鳺鳽鳿鳷鴇鴀鳹鳻鴈鴅鴄麃黓鼏鼐儜儓儗儚儑凞匴叡噰噠噮"
		],
		[
			"e940",
			"噳噦噣噭噲噞噷圜圛壈墽壉墿墺壂墼壆嬗嬙嬛嬡嬔嬓嬐嬖嬨嬚嬠嬞寯嶬嶱嶩嶧嶵嶰嶮嶪嶨嶲嶭嶯嶴幧幨幦幯廩廧廦廨廥彋徼憝憨憖懅憴懆懁懌憺"
		],
		[
			"e9a1",
			"憿憸憌擗擖擐擏擉撽撉擃擛擳擙攳敿敼斢曈暾曀曊曋曏暽暻暺曌朣樴橦橉橧樲橨樾橝橭橶橛橑樨橚樻樿橁橪橤橐橏橔橯橩橠樼橞橖橕橍橎橆歕歔歖殧殪殫毈毇氄氃氆澭濋澣濇澼濎濈潞濄澽澞濊澨瀄澥澮澺澬澪濏澿澸"
		],
		[
			"ea40",
			"澢濉澫濍澯澲澰燅燂熿熸燖燀燁燋燔燊燇燏熽燘熼燆燚燛犝犞獩獦獧獬獥獫獪瑿璚璠璔璒璕璡甋疀瘯瘭瘱瘽瘳瘼瘵瘲瘰皻盦瞚瞝瞡瞜瞛瞢瞣瞕瞙"
		],
		[
			"eaa1",
			"瞗磝磩磥磪磞磣磛磡磢磭磟磠禤穄穈穇窶窸窵窱窷篞篣篧篝篕篥篚篨篹篔篪篢篜篫篘篟糒糔糗糐糑縒縡縗縌縟縠縓縎縜縕縚縢縋縏縖縍縔縥縤罃罻罼罺羱翯耪耩聬膱膦膮膹膵膫膰膬膴膲膷膧臲艕艖艗蕖蕅蕫蕍蕓蕡蕘"
		],
		[
			"eb40",
			"蕀蕆蕤蕁蕢蕄蕑蕇蕣蔾蕛蕱蕎蕮蕵蕕蕧蕠薌蕦蕝蕔蕥蕬虣虥虤螛螏螗螓螒螈螁螖螘蝹螇螣螅螐螑螝螄螔螜螚螉褞褦褰褭褮褧褱褢褩褣褯褬褟觱諠"
		],
		[
			"eba1",
			"諢諲諴諵諝謔諤諟諰諈諞諡諨諿諯諻貑貒貐賵賮賱賰賳赬赮趥趧踳踾踸蹀蹅踶踼踽蹁踰踿躽輶輮輵輲輹輷輴遶遹遻邆郺鄳鄵鄶醓醐醑醍醏錧錞錈錟錆錏鍺錸錼錛錣錒錁鍆錭錎錍鋋錝鋺錥錓鋹鋷錴錂錤鋿錩錹錵錪錔錌"
		],
		[
			"ec40",
			"錋鋾錉錀鋻錖閼闍閾閹閺閶閿閵閽隩雔霋霒霐鞙鞗鞔韰韸頵頯頲餤餟餧餩馞駮駬駥駤駰駣駪駩駧骹骿骴骻髶髺髹髷鬳鮀鮅鮇魼魾魻鮂鮓鮒鮐魺鮕"
		],
		[
			"eca1",
			"魽鮈鴥鴗鴠鴞鴔鴩鴝鴘鴢鴐鴙鴟麈麆麇麮麭黕黖黺鼒鼽儦儥儢儤儠儩勴嚓嚌嚍嚆嚄嚃噾嚂噿嚁壖壔壏壒嬭嬥嬲嬣嬬嬧嬦嬯嬮孻寱寲嶷幬幪徾徻懃憵憼懧懠懥懤懨懞擯擩擣擫擤擨斁斀斶旚曒檍檖檁檥檉檟檛檡檞檇檓檎"
		],
		[
			"ed40",
			"檕檃檨檤檑橿檦檚檅檌檒歛殭氉濌澩濴濔濣濜濭濧濦濞濲濝濢濨燡燱燨燲燤燰燢獳獮獯璗璲璫璐璪璭璱璥璯甐甑甒甏疄癃癈癉癇皤盩瞵瞫瞲瞷瞶"
		],
		[
			"eda1",
			"瞴瞱瞨矰磳磽礂磻磼磲礅磹磾礄禫禨穜穛穖穘穔穚窾竀竁簅簏篲簀篿篻簎篴簋篳簂簉簃簁篸篽簆篰篱簐簊糨縭縼繂縳顈縸縪繉繀繇縩繌縰縻縶繄縺罅罿罾罽翴翲耬膻臄臌臊臅臇膼臩艛艚艜薃薀薏薧薕薠薋薣蕻薤薚薞"
		],
		[
			"ee40",
			"蕷蕼薉薡蕺蕸蕗薎薖薆薍薙薝薁薢薂薈薅蕹蕶薘薐薟虨螾螪螭蟅螰螬螹螵螼螮蟉蟃蟂蟌螷螯蟄蟊螴螶螿螸螽蟞螲褵褳褼褾襁襒褷襂覭覯覮觲觳謞"
		],
		[
			"eea1",
			"謘謖謑謅謋謢謏謒謕謇謍謈謆謜謓謚豏豰豲豱豯貕貔賹赯蹎蹍蹓蹐蹌蹇轃轀邅遾鄸醚醢醛醙醟醡醝醠鎡鎃鎯鍤鍖鍇鍼鍘鍜鍶鍉鍐鍑鍠鍭鎏鍌鍪鍹鍗鍕鍒鍏鍱鍷鍻鍡鍞鍣鍧鎀鍎鍙闇闀闉闃闅閷隮隰隬霠霟霘霝霙鞚鞡鞜"
		],
		[
			"ef40",
			"鞞鞝韕韔韱顁顄顊顉顅顃餥餫餬餪餳餲餯餭餱餰馘馣馡騂駺駴駷駹駸駶駻駽駾駼騃骾髾髽鬁髼魈鮚鮨鮞鮛鮦鮡鮥鮤鮆鮢鮠鮯鴳鵁鵧鴶鴮鴯鴱鴸鴰"
		],
		[
			"efa1",
			"鵅鵂鵃鴾鴷鵀鴽翵鴭麊麉麍麰黈黚黻黿鼤鼣鼢齔龠儱儭儮嚘嚜嚗嚚嚝嚙奰嬼屩屪巀幭幮懘懟懭懮懱懪懰懫懖懩擿攄擽擸攁攃擼斔旛曚曛曘櫅檹檽櫡櫆檺檶檷櫇檴檭歞毉氋瀇瀌瀍瀁瀅瀔瀎濿瀀濻瀦濼濷瀊爁燿燹爃燽獶"
		],
		[
			"f040",
			"璸瓀璵瓁璾璶璻瓂甔甓癜癤癙癐癓癗癚皦皽盬矂瞺磿礌礓礔礉礐礒礑禭禬穟簜簩簙簠簟簭簝簦簨簢簥簰繜繐繖繣繘繢繟繑繠繗繓羵羳翷翸聵臑臒"
		],
		[
			"f0a1",
			"臐艟艞薴藆藀藃藂薳薵薽藇藄薿藋藎藈藅薱薶藒蘤薸薷薾虩蟧蟦蟢蟛蟫蟪蟥蟟蟳蟤蟔蟜蟓蟭蟘蟣螤蟗蟙蠁蟴蟨蟝襓襋襏襌襆襐襑襉謪謧謣謳謰謵譇謯謼謾謱謥謷謦謶謮謤謻謽謺豂豵貙貘貗賾贄贂贀蹜蹢蹠蹗蹖蹞蹥蹧"
		],
		[
			"f140",
			"蹛蹚蹡蹝蹩蹔轆轇轈轋鄨鄺鄻鄾醨醥醧醯醪鎵鎌鎒鎷鎛鎝鎉鎧鎎鎪鎞鎦鎕鎈鎙鎟鎍鎱鎑鎲鎤鎨鎴鎣鎥闒闓闑隳雗雚巂雟雘雝霣霢霥鞬鞮鞨鞫鞤鞪"
		],
		[
			"f1a1",
			"鞢鞥韗韙韖韘韺顐顑顒颸饁餼餺騏騋騉騍騄騑騊騅騇騆髀髜鬈鬄鬅鬩鬵魊魌魋鯇鯆鯃鮿鯁鮵鮸鯓鮶鯄鮹鮽鵜鵓鵏鵊鵛鵋鵙鵖鵌鵗鵒鵔鵟鵘鵚麎麌黟鼁鼀鼖鼥鼫鼪鼩鼨齌齕儴儵劖勷厴嚫嚭嚦嚧嚪嚬壚壝壛夒嬽嬾嬿巃幰"
		],
		[
			"f240",
			"徿懻攇攐攍攉攌攎斄旞旝曞櫧櫠櫌櫑櫙櫋櫟櫜櫐櫫櫏櫍櫞歠殰氌瀙瀧瀠瀖瀫瀡瀢瀣瀩瀗瀤瀜瀪爌爊爇爂爅犥犦犤犣犡瓋瓅璷瓃甖癠矉矊矄矱礝礛"
		],
		[
			"f2a1",
			"礡礜礗礞禰穧穨簳簼簹簬簻糬糪繶繵繸繰繷繯繺繲繴繨罋罊羃羆羷翽翾聸臗臕艤艡艣藫藱藭藙藡藨藚藗藬藲藸藘藟藣藜藑藰藦藯藞藢蠀蟺蠃蟶蟷蠉蠌蠋蠆蟼蠈蟿蠊蠂襢襚襛襗襡襜襘襝襙覈覷覶觶譐譈譊譀譓譖譔譋譕"
		],
		[
			"f340",
			"譑譂譒譗豃豷豶貚贆贇贉趬趪趭趫蹭蹸蹳蹪蹯蹻軂轒轑轏轐轓辴酀鄿醰醭鏞鏇鏏鏂鏚鏐鏹鏬鏌鏙鎩鏦鏊鏔鏮鏣鏕鏄鏎鏀鏒鏧镽闚闛雡霩霫霬霨霦"
		],
		[
			"f3a1",
			"鞳鞷鞶韝韞韟顜顙顝顗颿颽颻颾饈饇饃馦馧騚騕騥騝騤騛騢騠騧騣騞騜騔髂鬋鬊鬎鬌鬷鯪鯫鯠鯞鯤鯦鯢鯰鯔鯗鯬鯜鯙鯥鯕鯡鯚鵷鶁鶊鶄鶈鵱鶀鵸鶆鶋鶌鵽鵫鵴鵵鵰鵩鶅鵳鵻鶂鵯鵹鵿鶇鵨麔麑黀黼鼭齀齁齍齖齗齘匷嚲"
		],
		[
			"f440",
			"嚵嚳壣孅巆巇廮廯忀忁懹攗攖攕攓旟曨曣曤櫳櫰櫪櫨櫹櫱櫮櫯瀼瀵瀯瀷瀴瀱灂瀸瀿瀺瀹灀瀻瀳灁爓爔犨獽獼璺皫皪皾盭矌矎矏矍矲礥礣礧礨礤礩"
		],
		[
			"f4a1",
			"禲穮穬穭竷籉籈籊籇籅糮繻繾纁纀羺翿聹臛臙舋艨艩蘢藿蘁藾蘛蘀藶蘄蘉蘅蘌藽蠙蠐蠑蠗蠓蠖襣襦覹觷譠譪譝譨譣譥譧譭趮躆躈躄轙轖轗轕轘轚邍酃酁醷醵醲醳鐋鐓鏻鐠鐏鐔鏾鐕鐐鐨鐙鐍鏵鐀鏷鐇鐎鐖鐒鏺鐉鏸鐊鏿"
		],
		[
			"f540",
			"鏼鐌鏶鐑鐆闞闠闟霮霯鞹鞻韽韾顠顢顣顟飁飂饐饎饙饌饋饓騲騴騱騬騪騶騩騮騸騭髇髊髆鬐鬒鬑鰋鰈鯷鰅鰒鯸鱀鰇鰎鰆鰗鰔鰉鶟鶙鶤鶝鶒鶘鶐鶛"
		],
		[
			"f5a1",
			"鶠鶔鶜鶪鶗鶡鶚鶢鶨鶞鶣鶿鶩鶖鶦鶧麙麛麚黥黤黧黦鼰鼮齛齠齞齝齙龑儺儹劘劗囃嚽嚾孈孇巋巏廱懽攛欂櫼欃櫸欀灃灄灊灈灉灅灆爝爚爙獾甗癪矐礭礱礯籔籓糲纊纇纈纋纆纍罍羻耰臝蘘蘪蘦蘟蘣蘜蘙蘧蘮蘡蘠蘩蘞蘥"
		],
		[
			"f640",
			"蠩蠝蠛蠠蠤蠜蠫衊襭襩襮襫觺譹譸譅譺譻贐贔趯躎躌轞轛轝酆酄酅醹鐿鐻鐶鐩鐽鐼鐰鐹鐪鐷鐬鑀鐱闥闤闣霵霺鞿韡顤飉飆飀饘饖騹騽驆驄驂驁騺"
		],
		[
			"f6a1",
			"騿髍鬕鬗鬘鬖鬺魒鰫鰝鰜鰬鰣鰨鰩鰤鰡鶷鶶鶼鷁鷇鷊鷏鶾鷅鷃鶻鶵鷎鶹鶺鶬鷈鶱鶭鷌鶳鷍鶲鹺麜黫黮黭鼛鼘鼚鼱齎齥齤龒亹囆囅囋奱孋孌巕巑廲攡攠攦攢欋欈欉氍灕灖灗灒爞爟犩獿瓘瓕瓙瓗癭皭礵禴穰穱籗籜籙籛籚"
		],
		[
			"f740",
			"糴糱纑罏羇臞艫蘴蘵蘳蘬蘲蘶蠬蠨蠦蠪蠥襱覿覾觻譾讄讂讆讅譿贕躕躔躚躒躐躖躗轠轢酇鑌鑐鑊鑋鑏鑇鑅鑈鑉鑆霿韣顪顩飋饔饛驎驓驔驌驏驈驊"
		],
		[
			"f7a1",
			"驉驒驐髐鬙鬫鬻魖魕鱆鱈鰿鱄鰹鰳鱁鰼鰷鰴鰲鰽鰶鷛鷒鷞鷚鷋鷐鷜鷑鷟鷩鷙鷘鷖鷵鷕鷝麶黰鼵鼳鼲齂齫龕龢儽劙壨壧奲孍巘蠯彏戁戃戄攩攥斖曫欑欒欏毊灛灚爢玂玁玃癰矔籧籦纕艬蘺虀蘹蘼蘱蘻蘾蠰蠲蠮蠳襶襴襳觾"
		],
		[
			"f840",
			"讌讎讋讈豅贙躘轤轣醼鑢鑕鑝鑗鑞韄韅頀驖驙鬞鬟鬠鱒鱘鱐鱊鱍鱋鱕鱙鱌鱎鷻鷷鷯鷣鷫鷸鷤鷶鷡鷮鷦鷲鷰鷢鷬鷴鷳鷨鷭黂黐黲黳鼆鼜鼸鼷鼶齃齏"
		],
		[
			"f8a1",
			"齱齰齮齯囓囍孎屭攭曭曮欓灟灡灝灠爣瓛瓥矕礸禷禶籪纗羉艭虃蠸蠷蠵衋讔讕躞躟躠躝醾醽釂鑫鑨鑩雥靆靃靇韇韥驞髕魙鱣鱧鱦鱢鱞鱠鸂鷾鸇鸃鸆鸅鸀鸁鸉鷿鷽鸄麠鼞齆齴齵齶囔攮斸欘欙欗欚灢爦犪矘矙礹籩籫糶纚"
		],
		[
			"f940",
			"纘纛纙臠臡虆虇虈襹襺襼襻觿讘讙躥躤躣鑮鑭鑯鑱鑳靉顲饟鱨鱮鱭鸋鸍鸐鸏鸒鸑麡黵鼉齇齸齻齺齹圞灦籯蠼趲躦釃鑴鑸鑶鑵驠鱴鱳鱱鱵鸔鸓黶鼊"
		],
		[
			"f9a1",
			"龤灨灥糷虪蠾蠽蠿讞貜躩軉靋顳顴飌饡馫驤驦驧鬤鸕鸗齈戇欞爧虌躨钂钀钁驩驨鬮鸙爩虋讟钃鱹麷癵驫鱺鸝灩灪麤齾齉龘碁銹裏墻恒粧嫺╔╦╗╠╬╣╚╩╝╒╤╕╞╪╡╘╧╛╓╥╖╟╫╢╙╨╜║═╭╮╰╯▓"
		]
	];

/***/ },
/* 130 */
/***/ function(module, exports) {

	module.exports = [
		[
			"8740",
			"䏰䰲䘃䖦䕸𧉧䵷䖳𧲱䳢𧳅㮕䜶䝄䱇䱀𤊿𣘗𧍒𦺋𧃒䱗𪍑䝏䗚䲅𧱬䴇䪤䚡𦬣爥𥩔𡩣𣸆𣽡晍囻"
		],
		[
			"8767",
			"綕夝𨮹㷴霴𧯯寛𡵞媤㘥𩺰嫑宷峼杮薓𩥅瑡璝㡵𡵓𣚞𦀡㻬"
		],
		[
			"87a1",
			"𥣞㫵竼龗𤅡𨤍𣇪𠪊𣉞䌊蒄龖鐯䤰蘓墖靊鈘秐稲晠権袝瑌篅枂稬剏遆㓦珄𥶹瓆鿇垳䤯呌䄱𣚎堘穲𧭥讏䚮𦺈䆁𥶙箮𢒼鿈𢓁𢓉𢓌鿉蔄𣖻䂴鿊䓡𪷿拁灮鿋"
		],
		[
			"8840",
			"㇀",
			4,
			"𠄌㇅𠃑𠃍㇆㇇𠃋𡿨㇈𠃊㇉㇊㇋㇌𠄎㇍㇎ĀÁǍÀĒÉĚÈŌÓǑÒ࿿Ê̄Ế࿿Ê̌ỀÊāáǎàɑēéěèīíǐìōóǒòūúǔùǖǘǚ"
		],
		[
			"88a1",
			"ǜü࿿ê̄ế࿿ê̌ềêɡ⏚⏛"
		],
		[
			"8940",
			"𪎩𡅅"
		],
		[
			"8943",
			"攊"
		],
		[
			"8946",
			"丽滝鵎釟"
		],
		[
			"894c",
			"𧜵撑会伨侨兖兴农凤务动医华发变团声处备夲头学实実岚庆总斉柾栄桥济炼电纤纬纺织经统缆缷艺苏药视设询车轧轮"
		],
		[
			"89a1",
			"琑糼緍楆竉刧"
		],
		[
			"89ab",
			"醌碸酞肼"
		],
		[
			"89b0",
			"贋胶𠧧"
		],
		[
			"89b5",
			"肟黇䳍鷉鸌䰾𩷶𧀎鸊𪄳㗁"
		],
		[
			"89c1",
			"溚舾甙"
		],
		[
			"89c5",
			"䤑马骏龙禇𨑬𡷊𠗐𢫦两亁亀亇亿仫伷㑌侽㹈倃傈㑽㒓㒥円夅凛凼刅争剹劐匧㗇厩㕑厰㕓参吣㕭㕲㚁咓咣咴咹哐哯唘唣唨㖘唿㖥㖿嗗㗅"
		],
		[
			"8a40",
			"𧶄唥"
		],
		[
			"8a43",
			"𠱂𠴕𥄫喐𢳆㧬𠍁蹆𤶸𩓥䁓𨂾睺𢰸㨴䟕𨅝𦧲𤷪擝𠵼𠾴𠳕𡃴撍蹾𠺖𠰋𠽤𢲩𨉖𤓓"
		],
		[
			"8a64",
			"𠵆𩩍𨃩䟴𤺧𢳂骲㩧𩗴㿭㔆𥋇𩟔𧣈𢵄鵮頕"
		],
		[
			"8a76",
			"䏙𦂥撴哣𢵌𢯊𡁷㧻𡁯"
		],
		[
			"8aa1",
			"𦛚𦜖𧦠擪𥁒𠱃蹨𢆡𨭌𠜱"
		],
		[
			"8aac",
			"䠋𠆩㿺塳𢶍"
		],
		[
			"8ab2",
			"𤗈𠓼𦂗𠽌𠶖啹䂻䎺"
		],
		[
			"8abb",
			"䪴𢩦𡂝膪飵𠶜捹㧾𢝵跀嚡摼㹃"
		],
		[
			"8ac9",
			"𪘁𠸉𢫏𢳉"
		],
		[
			"8ace",
			"𡃈𣧂㦒㨆𨊛㕸𥹉𢃇噒𠼱𢲲𩜠㒼氽𤸻"
		],
		[
			"8adf",
			"𧕴𢺋𢈈𪙛𨳍𠹺𠰴𦠜羓𡃏𢠃𢤹㗻𥇣𠺌𠾍𠺪㾓𠼰𠵇𡅏𠹌"
		],
		[
			"8af6",
			"𠺫𠮩𠵈𡃀𡄽㿹𢚖搲𠾭"
		],
		[
			"8b40",
			"𣏴𧘹𢯎𠵾𠵿𢱑𢱕㨘𠺘𡃇𠼮𪘲𦭐𨳒𨶙𨳊閪哌苄喹"
		],
		[
			"8b55",
			"𩻃鰦骶𧝞𢷮煀腭胬尜𦕲脴㞗卟𨂽醶𠻺𠸏𠹷𠻻㗝𤷫㘉𠳖嚯𢞵𡃉𠸐𠹸𡁸𡅈𨈇𡑕𠹹𤹐𢶤婔𡀝𡀞𡃵𡃶垜𠸑"
		],
		[
			"8ba1",
			"𧚔𨋍𠾵𠹻𥅾㜃𠾶𡆀𥋘𪊽𤧚𡠺𤅷𨉼墙剨㘚𥜽箲孨䠀䬬鼧䧧鰟鮍𥭴𣄽嗻㗲嚉丨夂𡯁屮靑𠂆乛亻㔾尣彑忄㣺扌攵歺氵氺灬爫丬犭𤣩罒礻糹罓𦉪㓁"
		],
		[
			"8bde",
			"𦍋耂肀𦘒𦥑卝衤见𧢲讠贝钅镸长门𨸏韦页风飞饣𩠐鱼鸟黄歯龜丷𠂇阝户钢"
		],
		[
			"8c40",
			"倻淾𩱳龦㷉袏𤅎灷峵䬠𥇍㕙𥴰愢𨨲辧釶熑朙玺𣊁𪄇㲋𡦀䬐磤琂冮𨜏䀉橣𪊺䈣蘏𠩯稪𩥇𨫪靕灍匤𢁾鏴盙𨧣龧矝亣俰傼丯众龨吴綋墒壐𡶶庒庙忂𢜒斋"
		],
		[
			"8ca1",
			"𣏹椙橃𣱣泿"
		],
		[
			"8ca7",
			"爀𤔅玌㻛𤨓嬕璹讃𥲤𥚕窓篬糃繬苸薗龩袐龪躹龫迏蕟駠鈡龬𨶹𡐿䁱䊢娚"
		],
		[
			"8cc9",
			"顨杫䉶圽"
		],
		[
			"8cce",
			"藖𤥻芿𧄍䲁𦵴嵻𦬕𦾾龭龮宖龯曧繛湗秊㶈䓃𣉖𢞖䎚䔶"
		],
		[
			"8ce6",
			"峕𣬚諹屸㴒𣕑嵸龲煗䕘𤃬𡸣䱷㥸㑊𠆤𦱁諌侴𠈹妿腬顖𩣺弻"
		],
		[
			"8d40",
			"𠮟"
		],
		[
			"8d42",
			"𢇁𨥭䄂䚻𩁹㼇龳𪆵䃸㟖䛷𦱆䅼𨚲𧏿䕭㣔𥒚䕡䔛䶉䱻䵶䗪㿈𤬏㙡䓞䒽䇭崾嵈嵖㷼㠏嶤嶹㠠㠸幂庽弥徃㤈㤔㤿㥍惗愽峥㦉憷憹懏㦸戬抐拥挘㧸嚱"
		],
		[
			"8da1",
			"㨃揢揻搇摚㩋擀崕嘡龟㪗斆㪽旿晓㫲暒㬢朖㭂枤栀㭘桊梄㭲㭱㭻椉楃牜楤榟榅㮼槖㯝橥橴橱檂㯬檙㯲檫檵櫔櫶殁毁毪汵沪㳋洂洆洦涁㳯涤涱渕渘温溆𨧀溻滢滚齿滨滩漤漴㵆𣽁澁澾㵪㵵熷岙㶊瀬㶑灐灔灯灿炉𠌥䏁㗱𠻘"
		],
		[
			"8e40",
			"𣻗垾𦻓焾𥟠㙎榢𨯩孴穉𥣡𩓙穥穽𥦬窻窰竂竃燑𦒍䇊竚竝竪䇯咲𥰁笋筕笩𥌎𥳾箢筯莜𥮴𦱿篐萡箒箸𥴠㶭𥱥蒒篺簆簵𥳁籄粃𤢂粦晽𤕸糉糇糦籴糳糵糎"
		],
		[
			"8ea1",
			"繧䔝𦹄絝𦻖璍綉綫焵綳緒𤁗𦀩緤㴓緵𡟹緥𨍭縝𦄡𦅚繮纒䌫鑬縧罀罁罇礶𦋐駡羗𦍑羣𡙡𠁨䕜𣝦䔃𨌺翺𦒉者耈耝耨耯𪂇𦳃耻耼聡𢜔䦉𦘦𣷣𦛨朥肧𨩈脇脚墰𢛶汿𦒘𤾸擧𡒊舘𡡞橓𤩥𤪕䑺舩𠬍𦩒𣵾俹𡓽蓢荢𦬊𤦧𣔰𡝳𣷸芪椛芳䇛"
		],
		[
			"8f40",
			"蕋苐茚𠸖𡞴㛁𣅽𣕚艻苢茘𣺋𦶣𦬅𦮗𣗎㶿茝嗬莅䔋𦶥莬菁菓㑾𦻔橗蕚㒖𦹂𢻯葘𥯤葱㷓䓤檧葊𣲵祘蒨𦮖𦹷𦹃蓞萏莑䒠蒓蓤𥲑䉀𥳀䕃蔴嫲𦺙䔧蕳䔖枿蘖"
		],
		[
			"8fa1",
			"𨘥𨘻藁𧂈蘂𡖂𧃍䕫䕪蘨㙈𡢢号𧎚虾蝱𪃸蟮𢰧螱蟚蠏噡虬桖䘏衅衆𧗠𣶹𧗤衞袜䙛袴袵揁装睷𧜏覇覊覦覩覧覼𨨥觧𧤤𧪽誜瞓釾誐𧩙竩𧬺𣾏䜓𧬸煼謌謟𥐰𥕥謿譌譍誩𤩺讐讛誯𡛟䘕衏貛𧵔𧶏貫㜥𧵓賖𧶘𧶽贒贃𡤐賛灜贑𤳉㻐起"
		],
		[
			"9040",
			"趩𨀂𡀔𤦊㭼𨆼𧄌竧躭躶軃鋔輙輭𨍥𨐒辥錃𪊟𠩐辳䤪𨧞𨔽𣶻廸𣉢迹𪀔𨚼𨔁𢌥㦀𦻗逷𨔼𧪾遡𨕬𨘋邨𨜓郄𨛦邮都酧㫰醩釄粬𨤳𡺉鈎沟鉁鉢𥖹銹𨫆𣲛𨬌𥗛"
		],
		[
			"90a1",
			"𠴱錬鍫𨫡𨯫炏嫃𨫢𨫥䥥鉄𨯬𨰹𨯿鍳鑛躼閅閦鐦閠濶䊹𢙺𨛘𡉼𣸮䧟氜陻隖䅬隣𦻕懚隶磵𨫠隽双䦡𦲸𠉴𦐐𩂯𩃥𤫑𡤕𣌊霱虂霶䨏䔽䖅𤫩灵孁霛靜𩇕靗孊𩇫靟鐥僐𣂷𣂼鞉鞟鞱鞾韀韒韠𥑬韮琜𩐳響韵𩐝𧥺䫑頴頳顋顦㬎𧅵㵑𠘰𤅜"
		],
		[
			"9140",
			"𥜆飊颷飈飇䫿𦴧𡛓喰飡飦飬鍸餹𤨩䭲𩡗𩤅駵騌騻騐驘𥜥㛄𩂱𩯕髠髢𩬅髴䰎鬔鬭𨘀倴鬴𦦨㣃𣁽魐魀𩴾婅𡡣鮎𤉋鰂鯿鰌𩹨鷔𩾷𪆒𪆫𪃡𪄣𪇟鵾鶃𪄴鸎梈"
		],
		[
			"91a1",
			"鷄𢅛𪆓𪈠𡤻𪈳鴹𪂹𪊴麐麕麞麢䴴麪麯𤍤黁㭠㧥㴝伲㞾𨰫鼂鼈䮖鐤𦶢鼗鼖鼹嚟嚊齅馸𩂋韲葿齢齩竜龎爖䮾𤥵𤦻煷𤧸𤍈𤩑玞𨯚𡣺禟𨥾𨸶鍩鏳𨩄鋬鎁鏋𨥬𤒹爗㻫睲穃烐𤑳𤏸煾𡟯炣𡢾𣖙㻇𡢅𥐯𡟸㜢𡛻𡠹㛡𡝴𡣑𥽋㜣𡛀坛𤨥𡏾𡊨"
		],
		[
			"9240",
			"𡏆𡒶蔃𣚦蔃葕𤦔𧅥𣸱𥕜𣻻𧁒䓴𣛮𩦝𦼦柹㜳㰕㷧塬𡤢栐䁗𣜿𤃡𤂋𤄏𦰡哋嚞𦚱嚒𠿟𠮨𠸍鏆𨬓鎜仸儫㠙𤐶亼𠑥𠍿佋侊𥙑婨𠆫𠏋㦙𠌊𠐔㐵伩𠋀𨺳𠉵諚𠈌亘"
		],
		[
			"92a1",
			"働儍侢伃𤨎𣺊佂倮偬傁俌俥偘僼兙兛兝兞湶𣖕𣸹𣺿浲𡢄𣺉冨凃𠗠䓝𠒣𠒒𠒑赺𨪜𠜎剙劤𠡳勡鍮䙺熌𤎌𠰠𤦬𡃤槑𠸝瑹㻞璙琔瑖玘䮎𤪼𤂍叐㖄爏𤃉喴𠍅响𠯆圝鉝雴鍦埝垍坿㘾壋媙𨩆𡛺𡝯𡜐娬妸銏婾嫏娒𥥆𡧳𡡡𤊕㛵洅瑃娡𥺃"
		],
		[
			"9340",
			"媁𨯗𠐓鏠璌𡌃焅䥲鐈𨧻鎽㞠尞岞幞幈𡦖𡥼𣫮廍孏𡤃𡤄㜁𡢠㛝𡛾㛓脪𨩇𡶺𣑲𨦨弌弎𡤧𡞫婫𡜻孄蘔𧗽衠恾𢡠𢘫忛㺸𢖯𢖾𩂈𦽳懀𠀾𠁆𢘛憙憘恵𢲛𢴇𤛔𩅍"
		],
		[
			"93a1",
			"摱𤙥𢭪㨩𢬢𣑐𩣪𢹸挷𪑛撶挱揑𤧣𢵧护𢲡搻敫楲㯴𣂎𣊭𤦉𣊫唍𣋠𡣙𩐿曎𣊉𣆳㫠䆐𥖄𨬢𥖏𡛼𥕛𥐥磮𣄃𡠪𣈴㑤𣈏𣆂𤋉暎𦴤晫䮓昰𧡰𡷫晣𣋒𣋡昞𥡲㣑𣠺𣞼㮙𣞢𣏾瓐㮖枏𤘪梶栞㯄檾㡣𣟕𤒇樳橒櫉欅𡤒攑梘橌㯗橺歗𣿀𣲚鎠鋲𨯪𨫋"
		],
		[
			"9440",
			"銉𨀞𨧜鑧涥漋𤧬浧𣽿㶏渄𤀼娽渊塇洤硂焻𤌚𤉶烱牐犇犔𤞏𤜥兹𤪤𠗫瑺𣻸𣙟𤩊𤤗𥿡㼆㺱𤫟𨰣𣼵悧㻳瓌琼鎇琷䒟𦷪䕑疃㽣𤳙𤴆㽘畕癳𪗆㬙瑨𨫌𤦫𤦎㫻"
		],
		[
			"94a1",
			"㷍𤩎㻿𤧅𤣳釺圲鍂𨫣𡡤僟𥈡𥇧睸𣈲眎眏睻𤚗𣞁㩞𤣰琸璛㺿𤪺𤫇䃈𤪖𦆮錇𥖁砞碍碈磒珐祙𧝁𥛣䄎禛蒖禥樭𣻺稺秴䅮𡛦䄲鈵秱𠵌𤦌𠊙𣶺𡝮㖗啫㕰㚪𠇔𠰍竢婙𢛵𥪯𥪜娍𠉛磰娪𥯆竾䇹籝籭䈑𥮳𥺼𥺦糍𤧹𡞰粎籼粮檲緜縇緓罎𦉡"
		],
		[
			"9540",
			"𦅜𧭈綗𥺂䉪𦭵𠤖柖𠁎𣗏埄𦐒𦏸𤥢翝笧𠠬𥫩𥵃笌𥸎駦虅驣樜𣐿㧢𤧷𦖭騟𦖠蒀𧄧𦳑䓪脷䐂胆脉腂𦞴飃𦩂艢艥𦩑葓𦶧蘐𧈛媆䅿𡡀嬫𡢡嫤𡣘蚠蜨𣶏蠭𧐢娂"
		],
		[
			"95a1",
			"衮佅袇袿裦襥襍𥚃襔𧞅𧞄𨯵𨯙𨮜𨧹㺭蒣䛵䛏㟲訽訜𩑈彍鈫𤊄旔焩烄𡡅鵭貟賩𧷜妚矃姰䍮㛔踪躧𤰉輰轊䋴汘澻𢌡䢛潹溋𡟚鯩㚵𤤯邻邗啱䤆醻鐄𨩋䁢𨫼鐧𨰝𨰻蓥訫閙閧閗閖𨴴瑅㻂𤣿𤩂𤏪㻧𣈥随𨻧𨹦𨹥㻌𤧭𤩸𣿮琒瑫㻼靁𩂰"
		],
		[
			"9640",
			"桇䨝𩂓𥟟靝鍨𨦉𨰦𨬯𦎾銺嬑譩䤼珹𤈛鞛靱餸𠼦巁𨯅𤪲頟𩓚鋶𩗗釥䓀𨭐𤩧𨭤飜𨩅㼀鈪䤥萔餻饍𧬆㷽馛䭯馪驜𨭥𥣈檏騡嫾騯𩣱䮐𩥈馼䮽䮗鍽塲𡌂堢𤦸"
		],
		[
			"96a1",
			"𡓨硄𢜟𣶸棅㵽鑘㤧慐𢞁𢥫愇鱏鱓鱻鰵鰐魿鯏𩸭鮟𪇵𪃾鴡䲮𤄄鸘䲰鴌𪆴𪃭𪃳𩤯鶥蒽𦸒𦿟𦮂藼䔳𦶤𦺄𦷰萠藮𦸀𣟗𦁤秢𣖜𣙀䤭𤧞㵢鏛銾鍈𠊿碹鉷鑍俤㑀遤𥕝砽硔碶硋𡝗𣇉𤥁㚚佲濚濙瀞瀞吔𤆵垻壳垊鴖埗焴㒯𤆬燫𦱀𤾗嬨𡞵𨩉"
		],
		[
			"9740",
			"愌嫎娋䊼𤒈㜬䭻𨧼鎻鎸𡣖𠼝葲𦳀𡐓𤋺𢰦𤏁妔𣶷𦝁綨𦅛𦂤𤦹𤦋𨧺鋥珢㻩璴𨭣𡢟㻡𤪳櫘珳珻㻖𤨾𤪔𡟙𤩦𠎧𡐤𤧥瑈𤤖炥𤥶銄珦鍟𠓾錱𨫎𨨖鎆𨯧𥗕䤵𨪂煫"
		],
		[
			"97a1",
			"𤥃𠳿嚤𠘚𠯫𠲸唂秄𡟺緾𡛂𤩐𡡒䔮鐁㜊𨫀𤦭妰𡢿𡢃𧒄媡㛢𣵛㚰鉟婹𨪁𡡢鍴㳍𠪴䪖㦊僴㵩㵌𡎜煵䋻𨈘渏𩃤䓫浗𧹏灧沯㳖𣿭𣸭渂漌㵯𠏵畑㚼㓈䚀㻚䡱姄鉮䤾轁𨰜𦯀堒埈㛖𡑒烾𤍢𤩱𢿣𡊰𢎽梹楧𡎘𣓥𧯴𣛟𨪃𣟖𣏺𤲟樚𣚭𦲷萾䓟䓎"
		],
		[
			"9840",
			"𦴦𦵑𦲂𦿞漗𧄉茽𡜺菭𦲀𧁓𡟛妉媂𡞳婡婱𡤅𤇼㜭姯𡜼㛇熎鎐暚𤊥婮娫𤊓樫𣻹𧜶𤑛𤋊焝𤉙𨧡侰𦴨峂𤓎𧹍𤎽樌𤉖𡌄炦焳𤏩㶥泟勇𤩏繥姫崯㷳彜𤩝𡟟綤萦"
		],
		[
			"98a1",
			"咅𣫺𣌀𠈔坾𠣕𠘙㿥𡾞𪊶瀃𩅛嵰玏糓𨩙𩐠俈翧狍猐𧫴猸猹𥛶獁獈㺩𧬘遬燵𤣲珡臶㻊県㻑沢国琙琞琟㻢㻰㻴㻺瓓㼎㽓畂畭畲疍㽼痈痜㿀癍㿗癴㿜発𤽜熈嘣覀塩䀝睃䀹条䁅㗛瞘䁪䁯属瞾矋売砘点砜䂨砹硇硑硦葈𥔵礳栃礲䄃"
		],
		[
			"9940",
			"䄉禑禙辻稆込䅧窑䆲窼艹䇄竏竛䇏両筢筬筻簒簛䉠䉺类粜䊌粸䊔糭输烀𠳏総緔緐緽羮羴犟䎗耠耥笹耮耱联㷌垴炠肷胩䏭脌猪脎脒畠脔䐁㬹腖腙腚"
		],
		[
			"99a1",
			"䐓堺腼膄䐥膓䐭膥埯臁臤艔䒏芦艶苊苘苿䒰荗险榊萅烵葤惣蒈䔄蒾蓡蓸蔐蔸蕒䔻蕯蕰藠䕷虲蚒蚲蛯际螋䘆䘗袮裿褤襇覑𧥧訩訸誔誴豑賔賲贜䞘塟跃䟭仮踺嗘坔蹱嗵躰䠷軎転軤軭軲辷迁迊迌逳駄䢭飠鈓䤞鈨鉘鉫銱銮銿"
		],
		[
			"9a40",
			"鋣鋫鋳鋴鋽鍃鎄鎭䥅䥑麿鐗匁鐝鐭鐾䥪鑔鑹锭関䦧间阳䧥枠䨤靀䨵鞲韂噔䫤惨颹䬙飱塄餎餙冴餜餷饂饝饢䭰駅䮝騼鬏窃魩鮁鯝鯱鯴䱭鰠㝯𡯂鵉鰺"
		],
		[
			"9aa1",
			"黾噐鶓鶽鷀鷼银辶鹻麬麱麽黆铜黢黱黸竈齄𠂔𠊷𠎠椚铃妬𠓗塀铁㞹𠗕𠘕𠙶𡚺块煳𠫂𠫍𠮿呪吆𠯋咞𠯻𠰻𠱓𠱥𠱼惧𠲍噺𠲵𠳝𠳭𠵯𠶲𠷈楕鰯螥𠸄𠸎𠻗𠾐𠼭𠹳尠𠾼帋𡁜𡁏𡁶朞𡁻𡂈𡂖㙇𡂿𡃓𡄯𡄻卤蒭𡋣𡍵𡌶讁𡕷𡘙𡟃𡟇乸炻𡠭𡥪"
		],
		[
			"9b40",
			"𡨭𡩅𡰪𡱰𡲬𡻈拃𡻕𡼕熘桕𢁅槩㛈𢉼𢏗𢏺𢜪𢡱𢥏苽𢥧𢦓𢫕覥𢫨辠𢬎鞸𢬿顇骽𢱌"
		],
		[
			"9b62",
			"𢲈𢲷𥯨𢴈𢴒𢶷𢶕𢹂𢽴𢿌𣀳𣁦𣌟𣏞徱晈暿𧩹𣕧𣗳爁𤦺矗𣘚𣜖纇𠍆墵朎"
		],
		[
			"9ba1",
			"椘𣪧𧙗𥿢𣸑𣺹𧗾𢂚䣐䪸𤄙𨪚𤋮𤌍𤀻𤌴𤎖𤩅𠗊凒𠘑妟𡺨㮾𣳿𤐄𤓖垈𤙴㦛𤜯𨗨𩧉㝢𢇃譞𨭎駖𤠒𤣻𤨕爉𤫀𠱸奥𤺥𤾆𠝹軚𥀬劏圿煱𥊙𥐙𣽊𤪧喼𥑆𥑮𦭒釔㑳𥔿𧘲𥕞䜘𥕢𥕦𥟇𤤿𥡝偦㓻𣏌惞𥤃䝼𨥈𥪮𥮉𥰆𡶐垡煑澶𦄂𧰒遖𦆲𤾚譢𦐂𦑊"
		],
		[
			"9c40",
			"嵛𦯷輶𦒄𡤜諪𤧶𦒈𣿯𦔒䯀𦖿𦚵𢜛鑥𥟡憕娧晉侻嚹𤔡𦛼乪𤤴陖涏𦲽㘘襷𦞙𦡮𦐑𦡞營𦣇筂𩃀𠨑𦤦鄄𦤹穅鷰𦧺騦𦨭㙟𦑩𠀡禃𦨴𦭛崬𣔙菏𦮝䛐𦲤画补𦶮墶"
		],
		[
			"9ca1",
			"㜜𢖍𧁋𧇍㱔𧊀𧊅銁𢅺𧊋錰𧋦𤧐氹钟𧑐𠻸蠧裵𢤦𨑳𡞱溸𤨪𡠠㦤㚹尐秣䔿暶𩲭𩢤襃𧟌𧡘囖䃟𡘊㦡𣜯𨃨𡏅熭荦𧧝𩆨婧䲷𧂯𨦫𧧽𧨊𧬋𧵦𤅺筃祾𨀉澵𪋟樃𨌘厢𦸇鎿栶靝𨅯𨀣𦦵𡏭𣈯𨁈嶅𨰰𨂃圕頣𨥉嶫𤦈斾槕叒𤪥𣾁㰑朶𨂐𨃴𨄮𡾡𨅏"
		],
		[
			"9d40",
			"𨆉𨆯𨈚𨌆𨌯𨎊㗊𨑨𨚪䣺揦𨥖砈鉕𨦸䏲𨧧䏟𨧨𨭆𨯔姸𨰉輋𨿅𩃬筑𩄐𩄼㷷𩅞𤫊运犏嚋𩓧𩗩𩖰𩖸𩜲𩣑𩥉𩥪𩧃𩨨𩬎𩵚𩶛纟𩻸𩼣䲤镇𪊓熢𪋿䶑递𪗋䶜𠲜达嗁"
		],
		[
			"9da1",
			"辺𢒰边𤪓䔉繿潖檱仪㓤𨬬𧢝㜺躀𡟵𨀤𨭬𨮙𧨾𦚯㷫𧙕𣲷𥘵𥥖亚𥺁𦉘嚿𠹭踎孭𣺈𤲞揞拐𡟶𡡻攰嘭𥱊吚𥌑㷆𩶘䱽嘢嘞罉𥻘奵𣵀蝰东𠿪𠵉𣚺脗鵞贘瘻鱅癎瞹鍅吲腈苷嘥脲萘肽嗪祢噃吖𠺝㗎嘅嗱曱𨋢㘭甴嗰喺咗啲𠱁𠲖廐𥅈𠹶𢱢"
		],
		[
			"9e40",
			"𠺢麫絚嗞𡁵抝靭咔賍燶酶揼掹揾啩𢭃鱲𢺳冚㓟𠶧冧呍唞唓癦踭𦢊疱肶蠄螆裇膶萜𡃁䓬猄𤜆宐茋𦢓噻𢛴𧴯𤆣𧵳𦻐𧊶酰𡇙鈈𣳼𪚩𠺬𠻹牦𡲢䝎𤿂𧿹𠿫䃺"
		],
		[
			"9ea1",
			"鱝攟𢶠䣳𤟠𩵼𠿬𠸊恢𧖣𠿭"
		],
		[
			"9ead",
			"𦁈𡆇熣纎鵐业丄㕷嬍沲卧㚬㧜卽㚥𤘘墚𤭮舭呋垪𥪕𠥹"
		],
		[
			"9ec5",
			"㩒𢑥獴𩺬䴉鯭𣳾𩼰䱛𤾩𩖞𩿞葜𣶶𧊲𦞳𣜠挮紥𣻷𣸬㨪逈勌㹴㙺䗩𠒎癀嫰𠺶硺𧼮墧䂿噼鮋嵴癔𪐴麅䳡痹㟻愙𣃚𤏲"
		],
		[
			"9ef5",
			"噝𡊩垧𤥣𩸆刴𧂮㖭汊鵼"
		],
		[
			"9f40",
			"籖鬹埞𡝬屓擓𩓐𦌵𧅤蚭𠴨𦴢𤫢𠵱"
		],
		[
			"9f4f",
			"凾𡼏嶎霃𡷑麁遌笟鬂峑箣扨挵髿篏鬪籾鬮籂粆鰕篼鬉鼗鰛𤤾齚啳寃俽麘俲剠㸆勑坧偖妷帒韈鶫轜呩鞴饀鞺匬愰"
		],
		[
			"9fa1",
			"椬叚鰊鴂䰻陁榀傦畆𡝭駚剳"
		],
		[
			"9fae",
			"酙隁酜"
		],
		[
			"9fb2",
			"酑𨺗捿𦴣櫊嘑醎畺抅𠏼獏籰𥰡𣳽"
		],
		[
			"9fc1",
			"𤤙盖鮝个𠳔莾衂"
		],
		[
			"9fc9",
			"届槀僭坺刟巵从氱𠇲伹咜哚劚趂㗾弌㗳"
		],
		[
			"9fdb",
			"歒酼龥鮗頮颴骺麨麄煺笔"
		],
		[
			"9fe7",
			"毺蠘罸"
		],
		[
			"9feb",
			"嘠𪙊蹷齓"
		],
		[
			"9ff0",
			"跔蹏鸜踁抂𨍽踨蹵竓𤩷稾磘泪詧瘇"
		],
		[
			"a040",
			"𨩚鼦泎蟖痃𪊲硓咢贌狢獱謭猂瓱賫𤪻蘯徺袠䒷"
		],
		[
			"a055",
			"𡠻𦸅"
		],
		[
			"a058",
			"詾𢔛"
		],
		[
			"a05b",
			"惽癧髗鵄鍮鮏蟵"
		],
		[
			"a063",
			"蠏賷猬霡鮰㗖犲䰇籑饊𦅙慙䰄麖慽"
		],
		[
			"a073",
			"坟慯抦戹拎㩜懢厪𣏵捤栂㗒"
		],
		[
			"a0a1",
			"嵗𨯂迚𨸹"
		],
		[
			"a0a6",
			"僙𡵆礆匲阸𠼻䁥"
		],
		[
			"a0ae",
			"矾"
		],
		[
			"a0b0",
			"糂𥼚糚稭聦聣絍甅瓲覔舚朌聢𧒆聛瓰脃眤覉𦟌畓𦻑螩蟎臈螌詉貭譃眫瓸蓚㘵榲趦"
		],
		[
			"a0d4",
			"覩瑨涹蟁𤀑瓧㷛煶悤憜㳑煢恷"
		],
		[
			"a0e2",
			"罱𨬭牐惩䭾删㰘𣳇𥻗𧙖𥔱𡥄𡋾𩤃𦷜𧂭峁𦆭𨨏𣙷𠃮𦡆𤼎䕢嬟𦍌齐麦𦉫"
		],
		[
			"a3c0",
			"␀",
			31,
			"␡"
		],
		[
			"c6a1",
			"①",
			9,
			"⑴",
			9,
			"ⅰ",
			9,
			"丶丿亅亠冂冖冫勹匸卩厶夊宀巛⼳广廴彐彡攴无疒癶辵隶¨ˆヽヾゝゞ〃仝々〆〇ー［］✽ぁ",
			23
		],
		[
			"c740",
			"す",
			58,
			"ァアィイ"
		],
		[
			"c7a1",
			"ゥ",
			81,
			"А",
			5,
			"ЁЖ",
			4
		],
		[
			"c840",
			"Л",
			26,
			"ёж",
			25,
			"⇧↸↹㇏𠃌乚𠂊刂䒑"
		],
		[
			"c8a1",
			"龰冈龱𧘇"
		],
		[
			"c8cd",
			"￢￤＇＂㈱№℡゛゜⺀⺄⺆⺇⺈⺊⺌⺍⺕⺜⺝⺥⺧⺪⺬⺮⺶⺼⺾⻆⻊⻌⻍⻏⻖⻗⻞⻣"
		],
		[
			"c8f5",
			"ʃɐɛɔɵœøŋʊɪ"
		],
		[
			"f9fe",
			"￭"
		],
		[
			"fa40",
			"𠕇鋛𠗟𣿅蕌䊵珯况㙉𤥂𨧤鍄𡧛苮𣳈砼杄拟𤤳𨦪𠊠𦮳𡌅侫𢓭倈𦴩𧪄𣘀𤪱𢔓倩𠍾徤𠎀𠍇滛𠐟偽儁㑺儎顬㝃萖𤦤𠒇兠𣎴兪𠯿𢃼𠋥𢔰𠖎𣈳𡦃宂蝽𠖳𣲙冲冸"
		],
		[
			"faa1",
			"鴴凉减凑㳜凓𤪦决凢卂凭菍椾𣜭彻刋刦刼劵剗劔効勅簕蕂勠蘍𦬓包𨫞啉滙𣾀𠥔𣿬匳卄𠯢泋𡜦栛珕恊㺪㣌𡛨燝䒢卭却𨚫卾卿𡖖𡘓矦厓𨪛厠厫厮玧𥝲㽙玜叁叅汉义埾叙㪫𠮏叠𣿫𢶣叶𠱷吓灹唫晗浛呭𦭓𠵴啝咏咤䞦𡜍𠻝㶴𠵍"
		],
		[
			"fb40",
			"𨦼𢚘啇䳭启琗喆喩嘅𡣗𤀺䕒𤐵暳𡂴嘷曍𣊊暤暭噍噏磱囱鞇叾圀囯园𨭦㘣𡉏坆𤆥汮炋坂㚱𦱾埦𡐖堃𡑔𤍣堦𤯵塜墪㕡壠壜𡈼壻寿坃𪅐𤉸鏓㖡够梦㛃湙"
		],
		[
			"fba1",
			"𡘾娤啓𡚒蔅姉𠵎𦲁𦴪𡟜姙𡟻𡞲𦶦浱𡠨𡛕姹𦹅媫婣㛦𤦩婷㜈媖瑥嫓𦾡𢕔㶅𡤑㜲𡚸広勐孶斈孼𧨎䀄䡝𠈄寕慠𡨴𥧌𠖥寳宝䴐尅𡭄尓珎尔𡲥𦬨屉䣝岅峩峯嶋𡷹𡸷崐崘嵆𡺤岺巗苼㠭𤤁𢁉𢅳芇㠶㯂帮檊幵幺𤒼𠳓厦亷廐厨𡝱帉廴𨒂"
		],
		[
			"fc40",
			"廹廻㢠廼栾鐛弍𠇁弢㫞䢮𡌺强𦢈𢏐彘𢑱彣鞽𦹮彲鍀𨨶徧嶶㵟𥉐𡽪𧃸𢙨釖𠊞𨨩怱暅𡡷㥣㷇㘹垐𢞴祱㹀悞悤悳𤦂𤦏𧩓璤僡媠慤萤慂慈𦻒憁凴𠙖憇宪𣾷"
		],
		[
			"fca1",
			"𢡟懓𨮝𩥝懐㤲𢦀𢣁怣慜攞掋𠄘担𡝰拕𢸍捬𤧟㨗搸揸𡎎𡟼撐澊𢸶頔𤂌𥜝擡擥鑻㩦携㩗敍漖𤨨𤨣斅敭敟𣁾斵𤥀䬷旑䃘𡠩无旣忟𣐀昘𣇷𣇸晄𣆤𣆥晋𠹵晧𥇦晳晴𡸽𣈱𨗴𣇈𥌓矅𢣷馤朂𤎜𤨡㬫槺𣟂杞杧杢𤇍𩃭柗䓩栢湐鈼栁𣏦𦶠桝"
		],
		[
			"fd40",
			"𣑯槡樋𨫟楳棃𣗍椁椀㴲㨁𣘼㮀枬楡𨩊䋼椶榘㮡𠏉荣傐槹𣙙𢄪橅𣜃檝㯳枱櫈𩆜㰍欝𠤣惞欵歴𢟍溵𣫛𠎵𡥘㝀吡𣭚毡𣻼毜氷𢒋𤣱𦭑汚舦汹𣶼䓅𣶽𤆤𤤌𤤀"
		],
		[
			"fda1",
			"𣳉㛥㳫𠴲鮃𣇹𢒑羏样𦴥𦶡𦷫涖浜湼漄𤥿𤂅𦹲蔳𦽴凇沜渝萮𨬡港𣸯瑓𣾂秌湏媑𣁋濸㜍澝𣸰滺𡒗𤀽䕕鏰潄潜㵎潴𩅰㴻澟𤅄濓𤂑𤅕𤀹𣿰𣾴𤄿凟𤅖𤅗𤅀𦇝灋灾炧炁烌烕烖烟䄄㷨熴熖𤉷焫煅媈煊煮岜𤍥煏鍢𤋁焬𤑚𤨧𤨢熺𨯨炽爎"
		],
		[
			"fe40",
			"鑂爕夑鑃爤鍁𥘅爮牀𤥴梽牕牗㹕𣁄栍漽犂猪猫𤠣𨠫䣭𨠄猨献珏玪𠰺𦨮珉瑉𤇢𡛧𤨤昣㛅𤦷𤦍𤧻珷琕椃𤨦琹𠗃㻗瑜𢢭瑠𨺲瑇珤瑶莹瑬㜰瑴鏱樬璂䥓𤪌"
		],
		[
			"fea1",
			"𤅟𤩹𨮏孆𨰃𡢞瓈𡦈甎瓩甞𨻙𡩋寗𨺬鎅畍畊畧畮𤾂㼄𤴓疎瑝疞疴瘂瘬癑癏癯癶𦏵皐臯㟸𦤑𦤎皡皥皷盌𦾟葢𥂝𥅽𡸜眞眦着撯𥈠睘𣊬瞯𨥤𨥨𡛁矴砉𡍶𤨒棊碯磇磓隥礮𥗠磗礴碱𧘌辸袄𨬫𦂃𢘜禆褀椂禀𥡗禝𧬹礼禩渪𧄦㺨秆𩄍秔"
		]
	];

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	"use strict"
	
	var Transform = __webpack_require__(108).Transform;
	
	
	// == Exports ==================================================================
	module.exports = function(iconv) {
	    
	    // Additional Public API.
	    iconv.encodeStream = function encodeStream(encoding, options) {
	        return new IconvLiteEncoderStream(iconv.getEncoder(encoding, options), options);
	    }
	
	    iconv.decodeStream = function decodeStream(encoding, options) {
	        return new IconvLiteDecoderStream(iconv.getDecoder(encoding, options), options);
	    }
	
	    iconv.supportsStreams = true;
	
	
	    // Not published yet.
	    iconv.IconvLiteEncoderStream = IconvLiteEncoderStream;
	    iconv.IconvLiteDecoderStream = IconvLiteDecoderStream;
	    iconv._collect = IconvLiteDecoderStream.prototype.collect;
	};
	
	
	// == Encoder stream =======================================================
	function IconvLiteEncoderStream(conv, options) {
	    this.conv = conv;
	    options = options || {};
	    options.decodeStrings = false; // We accept only strings, so we don't need to decode them.
	    Transform.call(this, options);
	}
	
	IconvLiteEncoderStream.prototype = Object.create(Transform.prototype, {
	    constructor: { value: IconvLiteEncoderStream }
	});
	
	IconvLiteEncoderStream.prototype._transform = function(chunk, encoding, done) {
	    if (typeof chunk != 'string')
	        return done(new Error("Iconv encoding stream needs strings as its input."));
	    try {
	        var res = this.conv.write(chunk);
	        if (res && res.length) this.push(res);
	        done();
	    }
	    catch (e) {
	        done(e);
	    }
	}
	
	IconvLiteEncoderStream.prototype._flush = function(done) {
	    try {
	        var res = this.conv.end();
	        if (res && res.length) this.push(res);
	        done();
	    }
	    catch (e) {
	        done(e);
	    }
	}
	
	IconvLiteEncoderStream.prototype.collect = function(cb) {
	    var chunks = [];
	    this.on('error', cb);
	    this.on('data', function(chunk) { chunks.push(chunk); });
	    this.on('end', function() {
	        cb(null, Buffer.concat(chunks));
	    });
	    return this;
	}
	
	
	// == Decoder stream =======================================================
	function IconvLiteDecoderStream(conv, options) {
	    this.conv = conv;
	    options = options || {};
	    options.encoding = this.encoding = 'utf8'; // We output strings.
	    Transform.call(this, options);
	}
	
	IconvLiteDecoderStream.prototype = Object.create(Transform.prototype, {
	    constructor: { value: IconvLiteDecoderStream }
	});
	
	IconvLiteDecoderStream.prototype._transform = function(chunk, encoding, done) {
	    if (!Buffer.isBuffer(chunk))
	        return done(new Error("Iconv decoding stream needs buffers as its input."));
	    try {
	        var res = this.conv.write(chunk);
	        if (res && res.length) this.push(res, this.encoding);
	        done();
	    }
	    catch (e) {
	        done(e);
	    }
	}
	
	IconvLiteDecoderStream.prototype._flush = function(done) {
	    try {
	        var res = this.conv.end();
	        if (res && res.length) this.push(res, this.encoding);                
	        done();
	    }
	    catch (e) {
	        done(e);
	    }
	}
	
	IconvLiteDecoderStream.prototype.collect = function(cb) {
	    var res = '';
	    this.on('error', cb);
	    this.on('data', function(chunk) { res += chunk; });
	    this.on('end', function() {
	        cb(null, res);
	    });
	    return this;
	}
	


/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	"use strict"
	
	// == Extend Node primitives to use iconv-lite =================================
	
	module.exports = function (iconv) {
	    var original = undefined; // Place to keep original methods.
	
	    // Node authors rewrote Buffer internals to make it compatible with
	    // Uint8Array and we cannot patch key functions since then.
	    iconv.supportsNodeEncodingsExtension = !(new Buffer(0) instanceof Uint8Array);
	
	    iconv.extendNodeEncodings = function extendNodeEncodings() {
	        if (original) return;
	        original = {};
	
	        if (!iconv.supportsNodeEncodingsExtension) {
	            console.error("ACTION NEEDED: require('iconv-lite').extendNodeEncodings() is not supported in your version of Node");
	            console.error("See more info at https://github.com/ashtuchkin/iconv-lite/wiki/Node-v4-compatibility");
	            return;
	        }
	
	        var nodeNativeEncodings = {
	            'hex': true, 'utf8': true, 'utf-8': true, 'ascii': true, 'binary': true, 
	            'base64': true, 'ucs2': true, 'ucs-2': true, 'utf16le': true, 'utf-16le': true,
	        };
	
	        Buffer.isNativeEncoding = function(enc) {
	            return enc && nodeNativeEncodings[enc.toLowerCase()];
	        }
	
	        // -- SlowBuffer -----------------------------------------------------------
	        var SlowBuffer = __webpack_require__(133).SlowBuffer;
	
	        original.SlowBufferToString = SlowBuffer.prototype.toString;
	        SlowBuffer.prototype.toString = function(encoding, start, end) {
	            encoding = String(encoding || 'utf8').toLowerCase();
	
	            // Use native conversion when possible
	            if (Buffer.isNativeEncoding(encoding))
	                return original.SlowBufferToString.call(this, encoding, start, end);
	
	            // Otherwise, use our decoding method.
	            if (typeof start == 'undefined') start = 0;
	            if (typeof end == 'undefined') end = this.length;
	            return iconv.decode(this.slice(start, end), encoding);
	        }
	
	        original.SlowBufferWrite = SlowBuffer.prototype.write;
	        SlowBuffer.prototype.write = function(string, offset, length, encoding) {
	            // Support both (string, offset, length, encoding)
	            // and the legacy (string, encoding, offset, length)
	            if (isFinite(offset)) {
	                if (!isFinite(length)) {
	                    encoding = length;
	                    length = undefined;
	                }
	            } else {  // legacy
	                var swap = encoding;
	                encoding = offset;
	                offset = length;
	                length = swap;
	            }
	
	            offset = +offset || 0;
	            var remaining = this.length - offset;
	            if (!length) {
	                length = remaining;
	            } else {
	                length = +length;
	                if (length > remaining) {
	                    length = remaining;
	                }
	            }
	            encoding = String(encoding || 'utf8').toLowerCase();
	
	            // Use native conversion when possible
	            if (Buffer.isNativeEncoding(encoding))
	                return original.SlowBufferWrite.call(this, string, offset, length, encoding);
	
	            if (string.length > 0 && (length < 0 || offset < 0))
	                throw new RangeError('attempt to write beyond buffer bounds');
	
	            // Otherwise, use our encoding method.
	            var buf = iconv.encode(string, encoding);
	            if (buf.length < length) length = buf.length;
	            buf.copy(this, offset, 0, length);
	            return length;
	        }
	
	        // -- Buffer ---------------------------------------------------------------
	
	        original.BufferIsEncoding = Buffer.isEncoding;
	        Buffer.isEncoding = function(encoding) {
	            return Buffer.isNativeEncoding(encoding) || iconv.encodingExists(encoding);
	        }
	
	        original.BufferByteLength = Buffer.byteLength;
	        Buffer.byteLength = SlowBuffer.byteLength = function(str, encoding) {
	            encoding = String(encoding || 'utf8').toLowerCase();
	
	            // Use native conversion when possible
	            if (Buffer.isNativeEncoding(encoding))
	                return original.BufferByteLength.call(this, str, encoding);
	
	            // Slow, I know, but we don't have a better way yet.
	            return iconv.encode(str, encoding).length;
	        }
	
	        original.BufferToString = Buffer.prototype.toString;
	        Buffer.prototype.toString = function(encoding, start, end) {
	            encoding = String(encoding || 'utf8').toLowerCase();
	
	            // Use native conversion when possible
	            if (Buffer.isNativeEncoding(encoding))
	                return original.BufferToString.call(this, encoding, start, end);
	
	            // Otherwise, use our decoding method.
	            if (typeof start == 'undefined') start = 0;
	            if (typeof end == 'undefined') end = this.length;
	            return iconv.decode(this.slice(start, end), encoding);
	        }
	
	        original.BufferWrite = Buffer.prototype.write;
	        Buffer.prototype.write = function(string, offset, length, encoding) {
	            var _offset = offset, _length = length, _encoding = encoding;
	            // Support both (string, offset, length, encoding)
	            // and the legacy (string, encoding, offset, length)
	            if (isFinite(offset)) {
	                if (!isFinite(length)) {
	                    encoding = length;
	                    length = undefined;
	                }
	            } else {  // legacy
	                var swap = encoding;
	                encoding = offset;
	                offset = length;
	                length = swap;
	            }
	
	            encoding = String(encoding || 'utf8').toLowerCase();
	
	            // Use native conversion when possible
	            if (Buffer.isNativeEncoding(encoding))
	                return original.BufferWrite.call(this, string, _offset, _length, _encoding);
	
	            offset = +offset || 0;
	            var remaining = this.length - offset;
	            if (!length) {
	                length = remaining;
	            } else {
	                length = +length;
	                if (length > remaining) {
	                    length = remaining;
	                }
	            }
	
	            if (string.length > 0 && (length < 0 || offset < 0))
	                throw new RangeError('attempt to write beyond buffer bounds');
	
	            // Otherwise, use our encoding method.
	            var buf = iconv.encode(string, encoding);
	            if (buf.length < length) length = buf.length;
	            buf.copy(this, offset, 0, length);
	            return length;
	
	            // TODO: Set _charsWritten.
	        }
	
	
	        // -- Readable -------------------------------------------------------------
	        if (iconv.supportsStreams) {
	            var Readable = __webpack_require__(108).Readable;
	
	            original.ReadableSetEncoding = Readable.prototype.setEncoding;
	            Readable.prototype.setEncoding = function setEncoding(enc, options) {
	                // Use our own decoder, it has the same interface.
	                // We cannot use original function as it doesn't handle BOM-s.
	                this._readableState.decoder = iconv.getDecoder(enc, options);
	                this._readableState.encoding = enc;
	            }
	
	            Readable.prototype.collect = iconv._collect;
	        }
	    }
	
	    // Remove iconv-lite Node primitive extensions.
	    iconv.undoExtendNodeEncodings = function undoExtendNodeEncodings() {
	        if (!iconv.supportsNodeEncodingsExtension)
	            return;
	        if (!original)
	            throw new Error("require('iconv-lite').undoExtendNodeEncodings(): Nothing to undo; extendNodeEncodings() is not called.")
	
	        delete Buffer.isNativeEncoding;
	
	        var SlowBuffer = __webpack_require__(133).SlowBuffer;
	
	        SlowBuffer.prototype.toString = original.SlowBufferToString;
	        SlowBuffer.prototype.write = original.SlowBufferWrite;
	
	        Buffer.isEncoding = original.BufferIsEncoding;
	        Buffer.byteLength = original.BufferByteLength;
	        Buffer.prototype.toString = original.BufferToString;
	        Buffer.prototype.write = original.BufferWrite;
	
	        if (iconv.supportsStreams) {
	            var Readable = __webpack_require__(108).Readable;
	
	            Readable.prototype.setEncoding = original.ReadableSetEncoding;
	            delete Readable.prototype.collect;
	        }
	
	        original = undefined;
	    }
	}


/***/ },
/* 133 */
/***/ function(module, exports) {

	module.exports = require("buffer");

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var iconv_package;
	var Iconv;
	
	try {
	    // this is to fool browserify so it doesn't try (in vain) to install iconv.
	    iconv_package = 'iconv';
	    Iconv = __webpack_require__(135)(iconv_package).Iconv;
	} catch (E) {
	    // node-iconv not present
	}
	
	module.exports = Iconv;


/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./encoding": 110,
		"./encoding.js": 110,
		"./iconv-loader": 134,
		"./iconv-loader.js": 134
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 135;


/***/ },
/* 136 */
/***/ function(module, exports) {

	'use strict';
	
	var isStream = module.exports = function (stream) {
		return stream !== null && typeof stream === 'object' && typeof stream.pipe === 'function';
	};
	
	isStream.writable = function (stream) {
		return isStream(stream) && stream.writable !== false && typeof stream._write === 'function' && typeof stream._writableState === 'object';
	};
	
	isStream.readable = function (stream) {
		return isStream(stream) && stream.readable !== false && typeof stream._read === 'function' && typeof stream._readableState === 'object';
	};
	
	isStream.duplex = function (stream) {
		return isStream.writable(stream) && isStream.readable(stream);
	};
	
	isStream.transform = function (stream) {
		return isStream.duplex(stream) && typeof stream._transform === 'function' && typeof stream._transformState === 'object';
	};


/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * fetch-error.js
	 *
	 * FetchError interface for operational errors
	 */
	
	module.exports = FetchError;
	
	/**
	 * Create FetchError instance
	 *
	 * @param   String      message      Error message for human
	 * @param   String      type         Error type for machine
	 * @param   String      systemError  For Node.js system error
	 * @return  FetchError
	 */
	function FetchError(message, type, systemError) {
	
		// hide custom error implementation details from end-users
		Error.captureStackTrace(this, this.constructor);
	
		this.name = this.constructor.name;
		this.message = message;
		this.type = type;
	
		// when err.type is `system`, err.code contains system error code
		if (systemError) {
			this.code = this.errno = systemError.code;
		}
	
	}
	
	__webpack_require__(138).inherits(FetchError, Error);


/***/ },
/* 138 */
/***/ function(module, exports) {

	module.exports = require("util");

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * response.js
	 *
	 * Response class provides content decoding
	 */
	
	var http = __webpack_require__(105);
	var Headers = __webpack_require__(140);
	var Body = __webpack_require__(109);
	
	module.exports = Response;
	
	/**
	 * Response class
	 *
	 * @param   Stream  body  Readable stream
	 * @param   Object  opts  Response options
	 * @return  Void
	 */
	function Response(body, opts) {
	
		opts = opts || {};
	
		this.url = opts.url;
		this.status = opts.status || 200;
		this.statusText = opts.statusText || http.STATUS_CODES[this.status];
		this.headers = new Headers(opts.headers);
		this.ok = this.status >= 200 && this.status < 300;
	
		Body.call(this, body, opts);
	
	}
	
	Response.prototype = Object.create(Body.prototype);
	
	/**
	 * Clone this response
	 *
	 * @return  Response
	 */
	Response.prototype.clone = function() {
		return new Response(this._clone(this), {
			url: this.url
			, status: this.status
			, statusText: this.statusText
			, headers: this.headers
			, ok: this.ok
		});
	};


/***/ },
/* 140 */
/***/ function(module, exports) {

	
	/**
	 * headers.js
	 *
	 * Headers class offers convenient helpers
	 */
	
	module.exports = Headers;
	
	/**
	 * Headers class
	 *
	 * @param   Object  headers  Response headers
	 * @return  Void
	 */
	function Headers(headers) {
	
		var self = this;
		this._headers = {};
	
		// Headers
		if (headers instanceof Headers) {
			headers = headers.raw();
		}
	
		// plain object
		for (var prop in headers) {
			if (!headers.hasOwnProperty(prop)) {
				continue;
			}
	
			if (typeof headers[prop] === 'string') {
				this.set(prop, headers[prop]);
	
			} else if (typeof headers[prop] === 'number' && !isNaN(headers[prop])) {
				this.set(prop, headers[prop].toString());
	
			} else if (headers[prop] instanceof Array) {
				headers[prop].forEach(function(item) {
					self.append(prop, item.toString());
				});
			}
		}
	
	}
	
	/**
	 * Return first header value given name
	 *
	 * @param   String  name  Header name
	 * @return  Mixed
	 */
	Headers.prototype.get = function(name) {
		var list = this._headers[name.toLowerCase()];
		return list ? list[0] : null;
	};
	
	/**
	 * Return all header values given name
	 *
	 * @param   String  name  Header name
	 * @return  Array
	 */
	Headers.prototype.getAll = function(name) {
		if (!this.has(name)) {
			return [];
		}
	
		return this._headers[name.toLowerCase()];
	};
	
	/**
	 * Iterate over all headers
	 *
	 * @param   Function  callback  Executed for each item with parameters (value, name, thisArg)
	 * @param   Boolean   thisArg   `this` context for callback function
	 * @return  Void
	 */
	Headers.prototype.forEach = function(callback, thisArg) {
		Object.getOwnPropertyNames(this._headers).forEach(function(name) {
			this._headers[name].forEach(function(value) {
				callback.call(thisArg, value, name, this)
			}, this)
		}, this)
	}
	
	/**
	 * Overwrite header values given name
	 *
	 * @param   String  name   Header name
	 * @param   String  value  Header value
	 * @return  Void
	 */
	Headers.prototype.set = function(name, value) {
		this._headers[name.toLowerCase()] = [value];
	};
	
	/**
	 * Append a value onto existing header
	 *
	 * @param   String  name   Header name
	 * @param   String  value  Header value
	 * @return  Void
	 */
	Headers.prototype.append = function(name, value) {
		if (!this.has(name)) {
			this.set(name, value);
			return;
		}
	
		this._headers[name.toLowerCase()].push(value);
	};
	
	/**
	 * Check for header name existence
	 *
	 * @param   String   name  Header name
	 * @return  Boolean
	 */
	Headers.prototype.has = function(name) {
		return this._headers.hasOwnProperty(name.toLowerCase());
	};
	
	/**
	 * Delete all header values given name
	 *
	 * @param   String  name  Header name
	 * @return  Void
	 */
	Headers.prototype['delete'] = function(name) {
		delete this._headers[name.toLowerCase()];
	};
	
	/**
	 * Return raw headers (non-spec api)
	 *
	 * @return  Object
	 */
	Headers.prototype.raw = function() {
		return this._headers;
	};


/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * request.js
	 *
	 * Request class contains server only options
	 */
	
	var parse_url = __webpack_require__(104).parse;
	var Headers = __webpack_require__(140);
	var Body = __webpack_require__(109);
	
	module.exports = Request;
	
	/**
	 * Request class
	 *
	 * @param   Mixed   input  Url or Request instance
	 * @param   Object  init   Custom options
	 * @return  Void
	 */
	function Request(input, init) {
		var url, url_parsed;
	
		// normalize input
		if (!(input instanceof Request)) {
			url = input;
			url_parsed = parse_url(url);
			input = {};
		} else {
			url = input.url;
			url_parsed = parse_url(url);
		}
	
		// normalize init
		init = init || {};
	
		// fetch spec options
		this.method = init.method || input.method || 'GET';
		this.redirect = init.redirect || input.redirect || 'follow';
		this.headers = new Headers(init.headers || input.headers || {});
		this.url = url;
	
		// server only options
		this.follow = init.follow !== undefined ?
			init.follow : input.follow !== undefined ?
			input.follow : 20;
		this.compress = init.compress !== undefined ?
			init.compress : input.compress !== undefined ?
			input.compress : true;
		this.counter = init.counter || input.counter || 0;
		this.agent = init.agent || input.agent;
	
		Body.call(this, init.body || this._clone(input), {
			timeout: init.timeout || input.timeout || 0,
			size: init.size || input.size || 0
		});
	
		// server request options
		this.protocol = url_parsed.protocol;
		this.hostname = url_parsed.hostname;
		this.port = url_parsed.port;
		this.path = url_parsed.path;
		this.auth = url_parsed.auth;
	}
	
	Request.prototype = Object.create(Body.prototype);
	
	/**
	 * Clone this request
	 *
	 * @return  Request
	 */
	Request.prototype.clone = function() {
		return new Request(this);
	};


/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var stringify = __webpack_require__(143);
	var parse = __webpack_require__(146);
	var formats = __webpack_require__(145);
	
	module.exports = {
	    formats: formats,
	    parse: parse,
	    stringify: stringify
	};


/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(144);
	var formats = __webpack_require__(145);
	
	var arrayPrefixGenerators = {
	    brackets: function brackets(prefix) {
	        return prefix + '[]';
	    },
	    indices: function indices(prefix, key) {
	        return prefix + '[' + key + ']';
	    },
	    repeat: function repeat(prefix) {
	        return prefix;
	    }
	};
	
	var toISO = Date.prototype.toISOString;
	
	var defaults = {
	    delimiter: '&',
	    encode: true,
	    encoder: utils.encode,
	    serializeDate: function serializeDate(date) {
	        return toISO.call(date);
	    },
	    skipNulls: false,
	    strictNullHandling: false
	};
	
	var stringify = function stringify(object, prefix, generateArrayPrefix, strictNullHandling, skipNulls, encoder, filter, sort, allowDots, serializeDate, formatter) {
	    var obj = object;
	    if (typeof filter === 'function') {
	        obj = filter(prefix, obj);
	    } else if (obj instanceof Date) {
	        obj = serializeDate(obj);
	    } else if (obj === null) {
	        if (strictNullHandling) {
	            return encoder ? encoder(prefix) : prefix;
	        }
	
	        obj = '';
	    }
	
	    if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean' || utils.isBuffer(obj)) {
	        if (encoder) {
	            return [formatter(encoder(prefix)) + '=' + formatter(encoder(obj))];
	        }
	        return [formatter(prefix) + '=' + formatter(String(obj))];
	    }
	
	    var values = [];
	
	    if (typeof obj === 'undefined') {
	        return values;
	    }
	
	    var objKeys;
	    if (Array.isArray(filter)) {
	        objKeys = filter;
	    } else {
	        var keys = Object.keys(obj);
	        objKeys = sort ? keys.sort(sort) : keys;
	    }
	
	    for (var i = 0; i < objKeys.length; ++i) {
	        var key = objKeys[i];
	
	        if (skipNulls && obj[key] === null) {
	            continue;
	        }
	
	        if (Array.isArray(obj)) {
	            values = values.concat(stringify(
	                obj[key],
	                generateArrayPrefix(prefix, key),
	                generateArrayPrefix,
	                strictNullHandling,
	                skipNulls,
	                encoder,
	                filter,
	                sort,
	                allowDots,
	                serializeDate,
	                formatter
	            ));
	        } else {
	            values = values.concat(stringify(
	                obj[key],
	                prefix + (allowDots ? '.' + key : '[' + key + ']'),
	                generateArrayPrefix,
	                strictNullHandling,
	                skipNulls,
	                encoder,
	                filter,
	                sort,
	                allowDots,
	                serializeDate,
	                formatter
	            ));
	        }
	    }
	
	    return values;
	};
	
	module.exports = function (object, opts) {
	    var obj = object;
	    var options = opts || {};
	    var delimiter = typeof options.delimiter === 'undefined' ? defaults.delimiter : options.delimiter;
	    var strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : defaults.strictNullHandling;
	    var skipNulls = typeof options.skipNulls === 'boolean' ? options.skipNulls : defaults.skipNulls;
	    var encode = typeof options.encode === 'boolean' ? options.encode : defaults.encode;
	    var encoder = encode ? (typeof options.encoder === 'function' ? options.encoder : defaults.encoder) : null;
	    var sort = typeof options.sort === 'function' ? options.sort : null;
	    var allowDots = typeof options.allowDots === 'undefined' ? false : options.allowDots;
	    var serializeDate = typeof options.serializeDate === 'function' ? options.serializeDate : defaults.serializeDate;
	    if (typeof options.format === 'undefined') {
	        options.format = formats.default;
	    } else if (!Object.prototype.hasOwnProperty.call(formats.formatters, options.format)) {
	        throw new TypeError('Unknown format option provided.');
	    }
	    var formatter = formats.formatters[options.format];
	    var objKeys;
	    var filter;
	
	    if (options.encoder !== null && options.encoder !== undefined && typeof options.encoder !== 'function') {
	        throw new TypeError('Encoder has to be a function.');
	    }
	
	    if (typeof options.filter === 'function') {
	        filter = options.filter;
	        obj = filter('', obj);
	    } else if (Array.isArray(options.filter)) {
	        filter = options.filter;
	        objKeys = filter;
	    }
	
	    var keys = [];
	
	    if (typeof obj !== 'object' || obj === null) {
	        return '';
	    }
	
	    var arrayFormat;
	    if (options.arrayFormat in arrayPrefixGenerators) {
	        arrayFormat = options.arrayFormat;
	    } else if ('indices' in options) {
	        arrayFormat = options.indices ? 'indices' : 'repeat';
	    } else {
	        arrayFormat = 'indices';
	    }
	
	    var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];
	
	    if (!objKeys) {
	        objKeys = Object.keys(obj);
	    }
	
	    if (sort) {
	        objKeys.sort(sort);
	    }
	
	    for (var i = 0; i < objKeys.length; ++i) {
	        var key = objKeys[i];
	
	        if (skipNulls && obj[key] === null) {
	            continue;
	        }
	
	        keys = keys.concat(stringify(
	            obj[key],
	            key,
	            generateArrayPrefix,
	            strictNullHandling,
	            skipNulls,
	            encoder,
	            filter,
	            sort,
	            allowDots,
	            serializeDate,
	            formatter
	        ));
	    }
	
	    return keys.join(delimiter);
	};


/***/ },
/* 144 */
/***/ function(module, exports) {

	'use strict';
	
	var has = Object.prototype.hasOwnProperty;
	
	var hexTable = (function () {
	    var array = [];
	    for (var i = 0; i < 256; ++i) {
	        array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase());
	    }
	
	    return array;
	}());
	
	exports.arrayToObject = function (source, options) {
	    var obj = options && options.plainObjects ? Object.create(null) : {};
	    for (var i = 0; i < source.length; ++i) {
	        if (typeof source[i] !== 'undefined') {
	            obj[i] = source[i];
	        }
	    }
	
	    return obj;
	};
	
	exports.merge = function (target, source, options) {
	    if (!source) {
	        return target;
	    }
	
	    if (typeof source !== 'object') {
	        if (Array.isArray(target)) {
	            target.push(source);
	        } else if (typeof target === 'object') {
	            target[source] = true;
	        } else {
	            return [target, source];
	        }
	
	        return target;
	    }
	
	    if (typeof target !== 'object') {
	        return [target].concat(source);
	    }
	
	    var mergeTarget = target;
	    if (Array.isArray(target) && !Array.isArray(source)) {
	        mergeTarget = exports.arrayToObject(target, options);
	    }
	
	    if (Array.isArray(target) && Array.isArray(source)) {
	        source.forEach(function (item, i) {
	            if (has.call(target, i)) {
	                if (target[i] && typeof target[i] === 'object') {
	                    target[i] = exports.merge(target[i], item, options);
	                } else {
	                    target.push(item);
	                }
	            } else {
	                target[i] = item;
	            }
	        });
	        return target;
	    }
	
	    return Object.keys(source).reduce(function (acc, key) {
	        var value = source[key];
	
	        if (Object.prototype.hasOwnProperty.call(acc, key)) {
	            acc[key] = exports.merge(acc[key], value, options);
	        } else {
	            acc[key] = value;
	        }
	        return acc;
	    }, mergeTarget);
	};
	
	exports.decode = function (str) {
	    try {
	        return decodeURIComponent(str.replace(/\+/g, ' '));
	    } catch (e) {
	        return str;
	    }
	};
	
	exports.encode = function (str) {
	    // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
	    // It has been adapted here for stricter adherence to RFC 3986
	    if (str.length === 0) {
	        return str;
	    }
	
	    var string = typeof str === 'string' ? str : String(str);
	
	    var out = '';
	    for (var i = 0; i < string.length; ++i) {
	        var c = string.charCodeAt(i);
	
	        if (
	            c === 0x2D || // -
	            c === 0x2E || // .
	            c === 0x5F || // _
	            c === 0x7E || // ~
	            (c >= 0x30 && c <= 0x39) || // 0-9
	            (c >= 0x41 && c <= 0x5A) || // a-z
	            (c >= 0x61 && c <= 0x7A) // A-Z
	        ) {
	            out += string.charAt(i);
	            continue;
	        }
	
	        if (c < 0x80) {
	            out = out + hexTable[c];
	            continue;
	        }
	
	        if (c < 0x800) {
	            out = out + (hexTable[0xC0 | (c >> 6)] + hexTable[0x80 | (c & 0x3F)]);
	            continue;
	        }
	
	        if (c < 0xD800 || c >= 0xE000) {
	            out = out + (hexTable[0xE0 | (c >> 12)] + hexTable[0x80 | ((c >> 6) & 0x3F)] + hexTable[0x80 | (c & 0x3F)]);
	            continue;
	        }
	
	        i += 1;
	        c = 0x10000 + (((c & 0x3FF) << 10) | (string.charCodeAt(i) & 0x3FF));
	        out += hexTable[0xF0 | (c >> 18)] + hexTable[0x80 | ((c >> 12) & 0x3F)] + hexTable[0x80 | ((c >> 6) & 0x3F)] + hexTable[0x80 | (c & 0x3F)];
	    }
	
	    return out;
	};
	
	exports.compact = function (obj, references) {
	    if (typeof obj !== 'object' || obj === null) {
	        return obj;
	    }
	
	    var refs = references || [];
	    var lookup = refs.indexOf(obj);
	    if (lookup !== -1) {
	        return refs[lookup];
	    }
	
	    refs.push(obj);
	
	    if (Array.isArray(obj)) {
	        var compacted = [];
	
	        for (var i = 0; i < obj.length; ++i) {
	            if (obj[i] && typeof obj[i] === 'object') {
	                compacted.push(exports.compact(obj[i], refs));
	            } else if (typeof obj[i] !== 'undefined') {
	                compacted.push(obj[i]);
	            }
	        }
	
	        return compacted;
	    }
	
	    var keys = Object.keys(obj);
	    keys.forEach(function (key) {
	        obj[key] = exports.compact(obj[key], refs);
	    });
	
	    return obj;
	};
	
	exports.isRegExp = function (obj) {
	    return Object.prototype.toString.call(obj) === '[object RegExp]';
	};
	
	exports.isBuffer = function (obj) {
	    if (obj === null || typeof obj === 'undefined') {
	        return false;
	    }
	
	    return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
	};


/***/ },
/* 145 */
/***/ function(module, exports) {

	'use strict';
	
	var replace = String.prototype.replace;
	var percentTwenties = /%20/g;
	
	module.exports = {
	    'default': 'RFC3986',
	    formatters: {
	        RFC1738: function (value) {
	            return replace.call(value, percentTwenties, '+');
	        },
	        RFC3986: function (value) {
	            return value;
	        }
	    },
	    RFC1738: 'RFC1738',
	    RFC3986: 'RFC3986'
	};


/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(144);
	
	var has = Object.prototype.hasOwnProperty;
	
	var defaults = {
	    allowDots: false,
	    allowPrototypes: false,
	    arrayLimit: 20,
	    decoder: utils.decode,
	    delimiter: '&',
	    depth: 5,
	    parameterLimit: 1000,
	    plainObjects: false,
	    strictNullHandling: false
	};
	
	var parseValues = function parseValues(str, options) {
	    var obj = {};
	    var parts = str.split(options.delimiter, options.parameterLimit === Infinity ? undefined : options.parameterLimit);
	
	    for (var i = 0; i < parts.length; ++i) {
	        var part = parts[i];
	        var pos = part.indexOf(']=') === -1 ? part.indexOf('=') : part.indexOf(']=') + 1;
	
	        var key, val;
	        if (pos === -1) {
	            key = options.decoder(part);
	            val = options.strictNullHandling ? null : '';
	        } else {
	            key = options.decoder(part.slice(0, pos));
	            val = options.decoder(part.slice(pos + 1));
	        }
	        if (has.call(obj, key)) {
	            obj[key] = [].concat(obj[key]).concat(val);
	        } else {
	            obj[key] = val;
	        }
	    }
	
	    return obj;
	};
	
	var parseObject = function parseObject(chain, val, options) {
	    if (!chain.length) {
	        return val;
	    }
	
	    var root = chain.shift();
	
	    var obj;
	    if (root === '[]') {
	        obj = [];
	        obj = obj.concat(parseObject(chain, val, options));
	    } else {
	        obj = options.plainObjects ? Object.create(null) : {};
	        var cleanRoot = root[0] === '[' && root[root.length - 1] === ']' ? root.slice(1, root.length - 1) : root;
	        var index = parseInt(cleanRoot, 10);
	        if (
	            !isNaN(index) &&
	            root !== cleanRoot &&
	            String(index) === cleanRoot &&
	            index >= 0 &&
	            (options.parseArrays && index <= options.arrayLimit)
	        ) {
	            obj = [];
	            obj[index] = parseObject(chain, val, options);
	        } else {
	            obj[cleanRoot] = parseObject(chain, val, options);
	        }
	    }
	
	    return obj;
	};
	
	var parseKeys = function parseKeys(givenKey, val, options) {
	    if (!givenKey) {
	        return;
	    }
	
	    // Transform dot notation to bracket notation
	    var key = options.allowDots ? givenKey.replace(/\.([^\.\[]+)/g, '[$1]') : givenKey;
	
	    // The regex chunks
	
	    var parent = /^([^\[\]]*)/;
	    var child = /(\[[^\[\]]*\])/g;
	
	    // Get the parent
	
	    var segment = parent.exec(key);
	
	    // Stash the parent if it exists
	
	    var keys = [];
	    if (segment[1]) {
	        // If we aren't using plain objects, optionally prefix keys
	        // that would overwrite object prototype properties
	        if (!options.plainObjects && has.call(Object.prototype, segment[1])) {
	            if (!options.allowPrototypes) {
	                return;
	            }
	        }
	
	        keys.push(segment[1]);
	    }
	
	    // Loop through children appending to the array until we hit depth
	
	    var i = 0;
	    while ((segment = child.exec(key)) !== null && i < options.depth) {
	        i += 1;
	        if (!options.plainObjects && has.call(Object.prototype, segment[1].replace(/\[|\]/g, ''))) {
	            if (!options.allowPrototypes) {
	                continue;
	            }
	        }
	        keys.push(segment[1]);
	    }
	
	    // If there's a remainder, just add whatever is left
	
	    if (segment) {
	        keys.push('[' + key.slice(segment.index) + ']');
	    }
	
	    return parseObject(keys, val, options);
	};
	
	module.exports = function (str, opts) {
	    var options = opts || {};
	
	    if (options.decoder !== null && options.decoder !== undefined && typeof options.decoder !== 'function') {
	        throw new TypeError('Decoder has to be a function.');
	    }
	
	    options.delimiter = typeof options.delimiter === 'string' || utils.isRegExp(options.delimiter) ? options.delimiter : defaults.delimiter;
	    options.depth = typeof options.depth === 'number' ? options.depth : defaults.depth;
	    options.arrayLimit = typeof options.arrayLimit === 'number' ? options.arrayLimit : defaults.arrayLimit;
	    options.parseArrays = options.parseArrays !== false;
	    options.decoder = typeof options.decoder === 'function' ? options.decoder : defaults.decoder;
	    options.allowDots = typeof options.allowDots === 'boolean' ? options.allowDots : defaults.allowDots;
	    options.plainObjects = typeof options.plainObjects === 'boolean' ? options.plainObjects : defaults.plainObjects;
	    options.allowPrototypes = typeof options.allowPrototypes === 'boolean' ? options.allowPrototypes : defaults.allowPrototypes;
	    options.parameterLimit = typeof options.parameterLimit === 'number' ? options.parameterLimit : defaults.parameterLimit;
	    options.strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : defaults.strictNullHandling;
	
	    if (str === '' || str === null || typeof str === 'undefined') {
	        return options.plainObjects ? Object.create(null) : {};
	    }
	
	    var tempObj = typeof str === 'string' ? parseValues(str, options) : str;
	    var obj = options.plainObjects ? Object.create(null) : {};
	
	    // Iterate over the keys and setup the new object
	
	    var keys = Object.keys(tempObj);
	    for (var i = 0; i < keys.length; ++i) {
	        var key = keys[i];
	        var newObj = parseKeys(key, tempObj[key], options);
	        obj = utils.merge(obj, newObj, options);
	    }
	
	    return utils.compact(obj);
	};


/***/ },
/* 147 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var ApiError = function (_Error) {
	  _inherits(ApiError, _Error);
	
	  function ApiError(response) {
	    _classCallCheck(this, ApiError);
	
	    var _this = _possibleConstructorReturn(this, (ApiError.__proto__ || Object.getPrototypeOf(ApiError)).call(this, response));
	
	    _this.name = 'ApiError';
	    _this.response = response;
	    return _this;
	  }
	
	  return ApiError;
	}(Error);
	
	exports.default = ApiError;
	module.exports = exports['default'];

/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _merge = __webpack_require__(2);
	
	var _merge2 = _interopRequireDefault(_merge);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Creates an object with
	 * the `api_key` from
	 * the supplied `options` param
	 *
	 * @param {any} options
	 * @returns {Object} an object containing
	 *                   a body property with
	 *                   the desired `api_key
	 * @private
	 */
	function execute(opts) {
	  var api_key = opts.api_key;
	
	  var body = {
	    body: {
	      api_key: api_key
	    }
	  };
	  return (0, _merge2.default)(body, opts.options);
	}
	
	/**
	 * Returns the supplied parameter with
	 * the `execute` function added to it.
	 *
	 * @param {any} options
	 * @returns {Object} The `options` parameter
	 *                   with `execute` add to it
	 * @private
	 */
	/**
	 * @name api
	 * @memberof strategies
	 * @private
	 */
	function build(options) {
	  return (0, _merge2.default)(options, { execute: execute.bind(null, options) });
	}
	
	exports.default = {
	  build: build
	};
	module.exports = exports['default'];

/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _routes = __webpack_require__(63);
	
	var _routes2 = _interopRequireDefault(_routes);
	
	var _request = __webpack_require__(64);
	
	var _request2 = _interopRequireDefault(_request);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * `POST /companies`
	 * Creates a company from the given payload.
	 *
	 * @param {Object} opts An options params which
	 *                      is usually already bound
	 *                      by `connect` functions.
	 *
	 * @param {Object} body The payload for the request
	 * @returns {Promise} A promise that resolves to
	 *                    the newly created company's
	 *                    data or to an error.
	 **/
	/**
	 * @name Company
	 * @description This module exposes functions
	 *              related to the `/company` and
	 *              `/companies` paths.
	 *
	 * @module company
	 **/
	
	var create = function create(opts, body) {
	  return _request2.default.post(opts, _routes2.default.company.basePlural, body);
	};
	
	/**
	* `POST /companies/temporary`
	* Creates a test-only temporary company.
	*
	* @param {Object} opts An options params which
	*                      is usually already bound
	*                      by `connect` functions.
	*
	* @returns {Promise} A promise that resolves to
	*                    the newly created company's
	*                    data or to an error.
	**/
	var createTemporary = function createTemporary(opts) {
	  return _request2.default.post(opts, _routes2.default.company.temporary, {});
	};
	
	/**
	* `POST /companies/activate`
	* Activates a company.
	*
	* @param {Object} opts An options params which
	*                      is usually already bound
	*                      by `connect` functions.
	*
	* @returns {Promise} A promise that resolves to
	*                    the newly created company's
	*                    data or to an error.
	**/
	var activate = function activate(opts) {
	  return _request2.default.post(opts, _routes2.default.company.activate, {});
	};
	
	/**
	 * `PUT /company`
	 * Updates a company from the given payload.
	 *
	 * @param {Object} opts An options params which
	 *                      is usually already bound
	 *                      by `connect` functions.
	 *
	 * @param {Object} body The payload for the request
	 * @returns {Promise} A promise that resolves to
	 *                    the newly created company's
	 *                    data or to an error.
	 **/
	var update = function update(opts, body) {
	  return _request2.default.put(opts, _routes2.default.company.base, body);
	};
	
	/**
	 * `GET /company`
	 * Return a company from the given payload.
	 *
	 * @param {Object} opts An options params which
	 *                      is usually already bound
	 *                      by `connect` functions.
	 *
	 * @returns {Promise} A promise that resolves to
	 *                    the newly created company's
	 *                    data or to an error.
	 **/
	var current = function current(opts) {
	  return _request2.default.get(opts, _routes2.default.company.base);
	};
	
	/**
	 * `PUT /company/reset_keys`
	 * Reset the company API keys.
	 *
	 * @param {Object} opts An options params which
	 *                      is usually already bound
	 *                      by `connect` functions.
	 *
	 * @param {Object} body The payload for the request
	 *
	 * @returns {Promise} A promise that resolves to
	 *                    the newly created company's
	 *                    data or to an error.
	 **/
	var resetKeys = function resetKeys(opts) {
	  return _request2.default.put(opts, _routes2.default.company.resetKeys);
	};
	
	/**
	 * `GET /company/affiliation_progress`
	 * Information about the affiliation progress.
	 *
	 * @param {Object} opts An options params which
	 *                      is usually already bound
	 *                      by `connect` functions.
	 *
	 * @returns {Promise} A promise that resolves to
	 *                    the newly created company's
	 *                    data or to an error.
	 **/
	var affiliationProgress = function affiliationProgress(opts) {
	  return _request2.default.get(opts, _routes2.default.company.affiliationProgress, {});
	};
	
	/**
	 * `PUT /company/branding/:id`
	 * Updates a company branding from the given payload.
	 *
	 * @param {Object} opts An options params which
	 *                      is usually already bound
	 *                      by `connect` functions.
	 *
	 * @param {Object} body The payload for the request
	 *
	 * @returns {Promise} A promise that resolves to
	 *                    the newly created company's
	 *                    data or to an error.
	 **/
	var updateBranding = function updateBranding(opts, body) {
	  return _request2.default.put(opts, _routes2.default.company.branding(body.id), body);
	};
	
	var emailTemplates = {
	  /**
	   * `GET /company/email_templates/:id`
	   * Get emails templates
	   *
	   * @param {Object} opts An options params which
	   *                      is usually already bound
	   *                      by `connect` functions.
	   *
	   * @param {Number} body.id The ID of the email template.
	   *
	   * @returns {Promise} A promise that resolves to
	   *                    the newly created company's
	   *                    data or to an error.
	   **/
	  find: function find(opts, body) {
	    return _request2.default.get(opts, _routes2.default.company.emailTemplates(body.id), {});
	  },
	
	  /**
	   * `PUT /company/email_templates/:id`
	   * Updates a company from the given payload.
	   *
	   * @param {Object} opts An options params which
	   *                      is usually already bound
	   *                      by `connect` functions.
	   *
	   * @param {Object} body The payload for the request
	   * @returns {Promise} A promise that resolves to
	   *                    the newly created company's
	   *                    data or to an error.
	   **/
	  update: function update(opts, body) {
	    return _request2.default.put(opts, _routes2.default.company.emailTemplates(body.id), body);
	  }
	};
	
	exports.default = {
	  create: create,
	  createTemporary: createTemporary,
	  activate: activate,
	  update: update,
	  current: current,
	  resetKeys: resetKeys,
	  affiliationProgress: affiliationProgress,
	  updateBranding: updateBranding,
	  emailTemplates: emailTemplates
	};
	module.exports = exports['default'];

/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _transactions = __webpack_require__(151);
	
	var _transactions2 = _interopRequireDefault(_transactions);
	
	var _payables = __webpack_require__(155);
	
	var _payables2 = _interopRequireDefault(_payables);
	
	var _search = __webpack_require__(156);
	
	var _search2 = _interopRequireDefault(_search);
	
	var _user = __webpack_require__(157);
	
	var _user2 = _interopRequireDefault(_user);
	
	var _company = __webpack_require__(149);
	
	var _company2 = _interopRequireDefault(_company);
	
	var _session = __webpack_require__(62);
	
	var _session2 = _interopRequireDefault(_session);
	
	var _invites = __webpack_require__(158);
	
	var _invites2 = _interopRequireDefault(_invites);
	
	var _splitRules = __webpack_require__(159);
	
	var _splitRules2 = _interopRequireDefault(_splitRules);
	
	var _antifraudAnalyses = __webpack_require__(160);
	
	var _antifraudAnalyses2 = _interopRequireDefault(_antifraudAnalyses);
	
	var _recipients = __webpack_require__(161);
	
	var _recipients2 = _interopRequireDefault(_recipients);
	
	var _bulkAnticipations = __webpack_require__(162);
	
	var _bulkAnticipations2 = _interopRequireDefault(_bulkAnticipations);
	
	var _bankAccounts = __webpack_require__(163);
	
	var _bankAccounts2 = _interopRequireDefault(_bankAccounts);
	
	var _plans = __webpack_require__(164);
	
	var _plans2 = _interopRequireDefault(_plans);
	
	var _acquirersConfigurations = __webpack_require__(165);
	
	var _acquirersConfigurations2 = _interopRequireDefault(_acquirersConfigurations);
	
	var _acquirers = __webpack_require__(166);
	
	var _acquirers2 = _interopRequireDefault(_acquirers);
	
	var _subscriptions = __webpack_require__(167);
	
	var _subscriptions2 = _interopRequireDefault(_subscriptions);
	
	var _cards = __webpack_require__(168);
	
	var _cards2 = _interopRequireDefault(_cards);
	
	var _transfers = __webpack_require__(169);
	
	var _transfers2 = _interopRequireDefault(_transfers);
	
	var _balance = __webpack_require__(170);
	
	var _balance2 = _interopRequireDefault(_balance);
	
	var _balanceOperations = __webpack_require__(171);
	
	var _balanceOperations2 = _interopRequireDefault(_balanceOperations);
	
	var _events = __webpack_require__(172);
	
	var _events2 = _interopRequireDefault(_events);
	
	var _gatewayOperations = __webpack_require__(173);
	
	var _gatewayOperations2 = _interopRequireDefault(_gatewayOperations);
	
	var _postbacks = __webpack_require__(174);
	
	var _postbacks2 = _interopRequireDefault(_postbacks);
	
	var _security = __webpack_require__(175);
	
	var _security2 = _interopRequireDefault(_security);
	
	var _customers = __webpack_require__(215);
	
	var _customers2 = _interopRequireDefault(_customers);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  company: _company2.default,
	  search: _search2.default,
	  session: _session2.default,
	  transactions: _transactions2.default,
	  payables: _payables2.default,
	  user: _user2.default,
	  invites: _invites2.default,
	  splitRules: _splitRules2.default,
	  antifraudAnalyses: _antifraudAnalyses2.default,
	  recipients: _recipients2.default,
	  bulkAnticipations: _bulkAnticipations2.default,
	  bankAccounts: _bankAccounts2.default,
	  plans: _plans2.default,
	  subscriptions: _subscriptions2.default,
	  cards: _cards2.default,
	  acquirersConfigurations: _acquirersConfigurations2.default,
	  acquirers: _acquirers2.default,
	  transfers: _transfers2.default,
	  balance: _balance2.default,
	  balanceOperations: _balanceOperations2.default,
	  events: _events2.default,
	  gatewayOperations: _gatewayOperations2.default,
	  postbacks: _postbacks2.default,
	  security: _security2.default,
	  customers: _customers2.default
	};
	module.exports = exports['default'];

/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _T = __webpack_require__(152);
	
	var _T2 = _interopRequireDefault(_T);
	
	var _has = __webpack_require__(50);
	
	var _has2 = _interopRequireDefault(_has);
	
	var _cond = __webpack_require__(57);
	
	var _cond2 = _interopRequireDefault(_cond);
	
	var _curry = __webpack_require__(154);
	
	var _curry2 = _interopRequireDefault(_curry);
	
	var _routes = __webpack_require__(63);
	
	var _routes2 = _interopRequireDefault(_routes);
	
	var _request = __webpack_require__(64);
	
	var _request2 = _interopRequireDefault(_request);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var findOne = (0, _curry2.default)(function (opts, body) {
	  return _request2.default.get(opts, _routes2.default.transactions.details(body.id), {});
	}); /**
	     * @name Transactions
	     * @description This module exposes functions
	     *              related to the `/transactions` path.
	     *
	     * @module transactions
	     **/
	
	var findAll = (0, _curry2.default)(function (opts, pagination) {
	  return _request2.default.get(opts, _routes2.default.transactions.base, pagination || {});
	});
	
	/**
	 * `GET /transactions`
	 * Makes a request to /transactions or to /transactions/:id
	 *
	 * @param {Object} opts An options params which
	 *                      is usually already bound
	 *                      by `connect` functions.
	 *
	 * @param {Object} body The payload for the request.
	 * {@link https://pagarme.readme.io/reference#retornando-transações|API Reference for this payload}
	 * @param {Number} [body.id] The transaction ID. If not sent a
	 *                           transaction list will be returned instead.
	 * @param {Number} [body.count] Pagination option for transaction list.
	 *                              Number of transaction in a page
	 * @param {Number} [body.page] Pagination option for transaction list.
	 *                             The page index.
	*/
	var find = function find(opts, body) {
	  return (0, _cond2.default)([[(0, _has2.default)('id'), findOne(opts)], [_T2.default, findAll(opts)]])(body);
	};
	
	var all = function all(opts, body) {
	  return findAll(opts, body);
	};
	
	/**
	 * `POST /transactions`
	 * Creates a transaction from the given payload.
	 *
	 * @param {Object} opts An options params which
	 *                      is usually already bound
	 *                      by `connect` functions.
	 *
	 * @param {Object} body The payload for the request.
	 * {@link https://pagarme.readme.io/reference#criar-transação|API Reference for this payload}
	 *
	 * @returns {Promise} Resolves to the result of
	 *                    the request or to an error.
	 */
	var create = function create(opts, body) {
	  return _request2.default.post(opts, _routes2.default.transactions.base, body);
	};
	
	/**
	 * `POST /transactions/:id/capture`
	 * Captures a transaction from the given id.
	 *
	 * @param {Object} opts An options params which
	 *                      is usually already bound
	 *                      by `connect` functions.
	 *
	 * @param {Number} body.id The transaction ID.
	 *
	 * @returns {Promise} Resolves to the result of
	 *                    the request or to an error.
	 */
	var capture = function capture(opts, body) {
	  return _request2.default.post(opts, _routes2.default.transactions.capture(body.id), {});
	};
	
	/**
	 * `POST /transactions/:id/refund`
	 * Refunds a transaction from the given id.
	 *
	 * @param {Object} opts An options params which
	 *                      is usually already bound
	 *                      by `connect` functions.
	 *
	 * @param {Object} body The payload for the request.
	 * {@link https://pagarme.readme.io/reference#estorno-de-transação|API Reference for this payload}
	 *
	 * @param {Number} body.id The transaction ID.
	 *
	 * @returns {Promise} Resolves to the result of
	 *                    the request or to an error.
	 */
	var refund = function refund(opts, body) {
	  return _request2.default.post(opts, _routes2.default.transactions.refund(body.id), {});
	};
	
	/**
	 * `POST /transactions/:id/collect_payment`
	 * Sends a payment link to a customer
	 *
	 * @param {Object} opts An options params which
	 *                      is usually already bound
	 *                      by `connect` functions.
	 *
	 * @param {Object} body The payload for the request.
	 * {@link https://pagarme.readme.io/reference#notificando-cliente-sobre-boleto-a-ser-pago|API Reference for this payload}
	 * @param {Number} body.id - The transaction id
	 * @param {String} body.email - User email to send the
	 *                              payment request
	 *
	 * @returns {Promise} Resolves to the result of
	 *                    the request or to an error.
	 */
	var collectPayment = function collectPayment(opts, body) {
	  return _request2.default.post(opts, _routes2.default.transactions.collectPayment(body.id), body);
	};
	
	/**
	 * `GET /transactions/card_hash_key`
	 * Create a card hash key
	 *
	 * @param {Object} opts - An options params which
	 *                        is usually already bound
	 *                        by `connect` functions.
	 *
	 * @param {Object} body The payload for the request.
	 * {@link https://dash.readme.io/project/pagarme/v1/refs/gerando-card_hash-manualmente-1|API Reference for this payload}
	 *
	 * @returns {Promise} - Resolves to the result of
	 *                      the request or to an error.
	 */
	var cardHashKey = function cardHashKey(opts) {
	  return _request2.default.get(opts, _routes2.default.transactions.cardHashKey, {});
	};
	
	/**
	 * `PUT /transactions/:id`
	 * Updates a transaction from the given payload.
	 *
	 * @param {Object} opts An options params which
	 *                      is usually already bound
	 *                      by `connect` functions.
	 *
	 * @param {Object} body The payload for the request.
	 * {@link https://pagarme.readme.io/reference#calculando-pagamentos-parcelados|API Reference for this payload}
	 * @param {Number} body.id The transaction ID
	 * @param {Number} body.status The transaction status
	 * @returns {Promise} A promise that resolves to
	 *                    the newly created transactions's
	 *                    data or to an error.
	 **/
	var update = function update(opts, body) {
	  return _request2.default.put(opts, _routes2.default.transactions.details(body.id), body);
	};
	
	/**
	 * `GET /transactions/calculate_installments_amount`
	 * Calculates the value of each purchase's installments
	 *
	 * @param {Object} opts An options params which
	 *                      is usually already bound
	 *                      by `connect` functions.
	 *
	 * @param {Number} body.interest_rate - The interest rate's value.
	 * @param {Number} body.amount - The value of the purchase.
	 * @param {Number} [body.max_installments] - The max number of installments.
	 * @param {Number} [body.free_installments] - The number of installments without interest.
	 *
	 * @returns {Promise} Resolves to the result of
	 *                    the request or to an error.
	 */
	var calculateInstallmentsAmount = function calculateInstallmentsAmount(opts, body) {
	  return _request2.default.get(opts, _routes2.default.transactions.calculateInstallmentsAmount, body);
	};
	
	exports.default = {
	  find: find,
	  all: all,
	  capture: capture,
	  create: create,
	  refund: refund,
	  collectPayment: collectPayment,
	  cardHashKey: cardHashKey,
	  update: update,
	  calculateInstallmentsAmount: calculateInstallmentsAmount
	};
	module.exports = exports['default'];

/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	var always = __webpack_require__(153);
	
	
	/**
	 * A function that always returns `true`. Any passed in parameters are ignored.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.9.0
	 * @category Function
	 * @sig * -> Boolean
	 * @param {*}
	 * @return {Boolean}
	 * @see R.always, R.F
	 * @example
	 *
	 *      R.T(); //=> true
	 */
	module.exports = always(true);


/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	var _curry1 = __webpack_require__(7);
	
	
	/**
	 * Returns a function that always returns the given value. Note that for
	 * non-primitives the value returned is a reference to the original value.
	 *
	 * This function is known as `const`, `constant`, or `K` (for K combinator) in
	 * other languages and libraries.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.1.0
	 * @category Function
	 * @sig a -> (* -> a)
	 * @param {*} val The value to wrap in a function
	 * @return {Function} A Function :: * -> val.
	 * @example
	 *
	 *      var t = R.always('Tee');
	 *      t(); //=> 'Tee'
	 */
	module.exports = _curry1(function always(val) {
	  return function() {
	    return val;
	  };
	});


/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	var _curry1 = __webpack_require__(7);
	var curryN = __webpack_require__(23);
	
	
	/**
	 * Returns a curried equivalent of the provided function. The curried function
	 * has two unusual capabilities. First, its arguments needn't be provided one
	 * at a time. If `f` is a ternary function and `g` is `R.curry(f)`, the
	 * following are equivalent:
	 *
	 *   - `g(1)(2)(3)`
	 *   - `g(1)(2, 3)`
	 *   - `g(1, 2)(3)`
	 *   - `g(1, 2, 3)`
	 *
	 * Secondly, the special placeholder value `R.__` may be used to specify
	 * "gaps", allowing partial application of any combination of arguments,
	 * regardless of their positions. If `g` is as above and `_` is `R.__`, the
	 * following are equivalent:
	 *
	 *   - `g(1, 2, 3)`
	 *   - `g(_, 2, 3)(1)`
	 *   - `g(_, _, 3)(1)(2)`
	 *   - `g(_, _, 3)(1, 2)`
	 *   - `g(_, 2)(1)(3)`
	 *   - `g(_, 2)(1, 3)`
	 *   - `g(_, 2)(_, 3)(1)`
	 *
	 * @func
	 * @memberOf R
	 * @since v0.1.0
	 * @category Function
	 * @sig (* -> a) -> (* -> a)
	 * @param {Function} fn The function to curry.
	 * @return {Function} A new, curried function.
	 * @see R.curryN
	 * @example
	 *
	 *      var addFourNumbers = (a, b, c, d) => a + b + c + d;
	 *
	 *      var curriedAddFourNumbers = R.curry(addFourNumbers);
	 *      var f = curriedAddFourNumbers(1, 2);
	 *      var g = f(3);
	 *      g(4); //=> 10
	 */
	module.exports = _curry1(function curry(fn) {
	  return curryN(fn.length, fn);
	});


/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _T = __webpack_require__(152);
	
	var _T2 = _interopRequireDefault(_T);
	
	var _has = __webpack_require__(50);
	
	var _has2 = _interopRequireDefault(_has);
	
	var _cond = __webpack_require__(57);
	
	var _cond2 = _interopRequireDefault(_cond);
	
	var _curry = __webpack_require__(154);
	
	var _curry2 = _interopRequireDefault(_curry);
	
	var _routes = __webpack_require__(63);
	
	var _routes2 = _interopRequireDefault(_routes);
	
	var _request = __webpack_require__(64);
	
	var _request2 = _interopRequireDefault(_request);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var findTransaction = (0, _curry2.default)(function (opts, body) {
	  return _request2.default.get(opts, _routes2.default.payables.transaction(body.transactionId), {});
	}); /**
	     * @name Payables
	     * @description This module exposes functions
	     *              related to payables.
	     *
	     * @module payables
	     **/
	
	var findOne = (0, _curry2.default)(function (opts, body) {
	  return _request2.default.get(opts, _routes2.default.payables.find(body.id), {});
	});
	
	var findAll = (0, _curry2.default)(function (opts, pagination) {
	  return _request2.default.get(opts, _routes2.default.payables.base, pagination);
	});
	/**
	 * `GET /payables`
	 * Makes a request to /payables or to /payables/:id
	 *
	 * @param {Object} opts An options params which
	 *                      is usually already bound
	 *                      by `connect` functions.
	 *
	 * @param {Object} body The payload for the request.
	 * {@link https://pagarme.readme.io/v1/reference#retornando-um-recebível|API Reference for this payload}
	 * @param {Number} [body.id] The payable ID. If not sent a
	 * @param {Number} [body.transactionId] A transaction ID to get all
	 *                                      the payables.
	 * @param {Number} [body.count] Pagination option for transaction list.
	 *                              Number of transaction in a page
	 * @param {Number} [body.page] Pagination option for transaction list.
	 *                             The page index.
	*/
	var find = function find(opts, body) {
	  return (0, _cond2.default)([[(0, _has2.default)('id'), findOne(opts)], [(0, _has2.default)('transactionId'), findTransaction(opts)], [_T2.default, findAll(opts)]])(body);
	};
	
	/**
	 * `GET /payables`
	 * Makes a request to /payables
	 *
	 * @param {Object} opts An options params which
	 *                      is usually already bound
	 *                      by `connect` functions.
	 *
	 * @param {Object} body The payload for the request.
	 * {@link https://docs-beta.pagar.me/v1/reference#retornando-recebíveis}
	*/
	var all = function all(opts, body) {
	  return findAll(opts, body);
	};
	
	exports.default = {
	  find: find,
	  all: all
	};
	module.exports = exports['default'];

/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _routes = __webpack_require__(63);
	
	var _routes2 = _interopRequireDefault(_routes);
	
	var _request = __webpack_require__(64);
	
	var _request2 = _interopRequireDefault(_request);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * `GET /search`
	 * Creates a session from the given payload.
	 *
	 * @param {Object} opts An options params which
	 *                      is usually already bound
	 *                      by `connect` functions.
	 * @param {Object} query The ElasticSearch based
	 *                       query object to be sent.
	 * {@link https://pagarme.readme.io/v1/reference#elasticsearch|API Reference for this payload}
	 * @returns {Promise} Resolves to the result of
	 *                    the request or to an error.
	 */
	/**
	 * @name Search
	 * @description This module exposes functions
	 *              related to the `/search` path.
	 *
	 * @module search
	 **/
	
	var execute = function execute(opts, query) {
	  return _request2.default.get(opts, _routes2.default.search, query);
	};
	
	exports.default = execute;
	module.exports = exports['default'];

/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _T = __webpack_require__(152);
	
	var _T2 = _interopRequireDefault(_T);
	
	var _has = __webpack_require__(50);
	
	var _has2 = _interopRequireDefault(_has);
	
	var _cond = __webpack_require__(57);
	
	var _cond2 = _interopRequireDefault(_cond);
	
	var _curry = __webpack_require__(154);
	
	var _curry2 = _interopRequireDefault(_curry);
	
	var _routes = __webpack_require__(63);
	
	var _routes2 = _interopRequireDefault(_routes);
	
	var _request = __webpack_require__(64);
	
	var _request2 = _interopRequireDefault(_request);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var findOne = (0, _curry2.default)(function (opts, body) {
	  return _request2.default.get(opts, _routes2.default.user.details(body.id), {});
	}); /**
	     * @name User
	     * @description This module exposes functions
	     *              related to the `/users` path.
	     *
	     * @module user
	     **/
	
	var findAll = (0, _curry2.default)(function (opts, pagination) {
	  return _request2.default.get(opts, _routes2.default.user.base, pagination || {});
	});
	
	/**
	 * `GET /users`
	 * Makes a request to /users or to /users/:id
	 *
	 * @param {Object} opts An options params which
	 *                      is usually already bound
	 *                      by `connect` functions.
	 *
	 * @param {Object} body The payload for the request.
	 * @param {Number} [body.id] The user's ID. If not sent a
	 *                           users list will be returned instead.
	 * @param {Number} [body.count] Pagination option to get a list of users.
	 *                              Number of users in a page
	 * @param {Number} [body.page] Pagination option for a list of users.
	 *                             The page index.
	*/
	var find = function find(opts, body) {
	  return (0, _cond2.default)([[(0, _has2.default)('id'), findOne(opts)], [_T2.default, findAll(opts)]])(body);
	};
	
	/**
	 * `PUT /users/reset_password`
	 *
	 * @param {Object} opts An options params which
	 *                      is usually already bound
	 *                      by `connect` functions.
	 * @param {String} email The email of the account
	 *                       of which the password will
	 *                       be reset.
	 * @returns {Promise} Resolves to the result
	 *                    of the request or an error.
	 */
	var resetPassword = function resetPassword(opts, body) {
	  return _request2.default.put(opts, _routes2.default.user.resetPassword, body);
	};
	
	/**
	 * `PUT /users/redefine_password`
	 * Redefines a user's password based on a reset token
	 *
	 * @example
	 *
	 * client.user.redefinePassword()
	 *
	 * @param {Objec} opts An options params which
	 *                     is usually already bound
	 *                     by `connect` functions.
	 * @param {Object} body An object containing the
	 *                      reset token and email of
	 *                      the account.
	 * @returns {Promise} Resolves to the result
	 *                    of the request or an error.
	 */
	var redefinePassword = function redefinePassword(opts, body) {
	  return _request2.default.put(opts, _routes2.default.user.redefinePassword, body);
	};
	
	/**
	 * `POST /users/`
	 * Creates a user
	 *
	 * @param {Objec} opts An options params which
	 *                     is usually already bound
	 *                     by `connect` functions.
	 * @param {Object} body The payload for the request.
	 */
	var create = function create(opts, body) {
	  return _request2.default.post(opts, _routes2.default.user.base, body);
	};
	
	/**
	 * `GET /users`
	 * Makes a request to /users
	 *
	 * @param {Object} opts An options params which
	 *                      is usually already bound
	 *                      by `connect` functions.
	 *
	 * @param {Object} body The payload for the request.
	 * @param {Number} [body.count] Pagination option to get a list of users.
	 *                              Number of users in a page
	 * @param {Number} [body.page] Pagination option for a list of users.
	 *                             The page index.
	 * @returns {Promise} Resolves to the result of
	 *                    the request or to an error.
	*/
	var all = function all(opts, pagination) {
	  return findAll(opts, pagination);
	};
	
	/**
	 * `DELETE /users/:id`
	 * Deletes an user from the given payload.
	 *
	 * @param {Object} opts An options params which
	 *                      is usually already bound
	 *                      by `connect` functions.
	 *
	 * @param {String} [body.id] - The user ID. If not sent an
	 *                           user list will be returned instead
	 *
	 * @returns {Promise} Resolves to the result of
	 *                    the request or to an error.
	 */
	var destroy = function destroy(opts, body) {
	  return _request2.default.delete(opts, _routes2.default.user.details(body.id), {});
	};
	
	/**
	 * `PUT /users/:id`
	 * Updates a user from the given payload.
	 *
	 * @param {Object} opts An options params which
	 *                      is usually already bound
	 *                      by `connect` functions.
	 *
	 * @param {Object} body The payload for the request
	 *
	 * @returns {Promise} A promise that resolves to
	 *                    the newly created user's
	 *                    data or to an error.
	 **/
	var update = function update(opts, body) {
	  return _request2.default.put(opts, _routes2.default.user.details(body.id), body);
	};
	
	/**
	 * `PUT /user/:id/update_password`
	 * Updates a user's password from the given payload.
	 *
	 * @example
	 *  client.user.updatePassword({ id:'123', current_password: 'foo', new_password: 'bar' })
	 *
	 * @param {Object} opts An options params which
	 *                      is usually already bound
	 *                      by `connect` functions.
	 *
	 * @param {Object} body The payload for the request
	 *
	 * @returns {Promise} A promise that resolves to
	 *                    the newly created user's
	 *                    data or to an error.
	 **/
	var updatePassword = function updatePassword(opts, body) {
	  return _request2.default.put(opts, _routes2.default.user.updatePassword(body.id), body);
	};
	
	/**
	 * `GET /user`
	 * Returns the currently authenticated user
	 *
	 * @param {Object} opts An options params which
	 *                      is usually already bound
	 *                      by `connect` functions.
	 *
	 * @returns {Promise} A promise that resolves to
	 *                    the newly created user's
	 *                    data or to an error.
	 */
	var current = function current(opts) {
	  return _request2.default.get(opts, _routes2.default.user.singular, {});
	};
	
	exports.default = {
	  all: all,
	  create: create,
	  current: current,
	  destroy: destroy,
	  find: find,
	  redefinePassword: redefinePassword,
	  resetPassword: resetPassword,
	  update: update,
	  updatePassword: updatePassword
	};
	module.exports = exports['default'];

/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _T = __webpack_require__(152);
	
	var _T2 = _interopRequireDefault(_T);
	
	var _has = __webpack_require__(50);
	
	var _has2 = _interopRequireDefault(_has);
	
	var _cond = __webpack_require__(57);
	
	var _cond2 = _interopRequireDefault(_cond);
	
	var _curry = __webpack_require__(154);
	
	var _curry2 = _interopRequireDefault(_curry);
	
	var _routes = __webpack_require__(63);
	
	var _routes2 = _interopRequireDefault(_routes);
	
	var _request = __webpack_require__(64);
	
	var _request2 = _interopRequireDefault(_request);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var findOne = (0, _curry2.default)(function (opts, body) {
	  return _request2.default.get(opts, _routes2.default.invites.details(body.id), {});
	}); /**
	     * @name Invites
	     * @description This module exposes functions
	     *              related to the `/invites` path.
	     *
	     * @module invites
	     **/
	
	var findAll = function findAll(opts) {
	  return _request2.default.get(opts, _routes2.default.invites.base, {});
	};
	
	/**
	 * `GET /invites`
	 * Makes a request to /invites or to /invites/:id
	 *
	 * @param {Object} opts - An options params which
	 *                      is usually already bound
	 *                      by `connect` functions.
	 *
	 * @param {Object} body - The payload for the request.
	 * @param {String} [body.id] - The invite ID. If not sent an
	 *                           invite list will be returned instead
	 */
	var find = function find(opts) {
	  var body = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	  return (0, _cond2.default)([[(0, _has2.default)('id'), findOne(opts)], [_T2.default, function () {
	    return findAll(opts);
	  }]])(body);
	};
	
	/**
	 * `POST /invites`
	 * Creates an invite from the given payload.
	 *
	 * @param {Object} opts An options params which
	 *                      is usually already bound
	 *                      by `connect` functions.
	 *
	 * @param {Object} body A payload that contains
	 *                      email and permission
	 *                      of the invited person.
	 *
	 * @returns {Promise} Resolves to the result of
	 *                    the request or to an error.
	 */
	var create = function create(opts, body) {
	  return _request2.default.post(opts, _routes2.default.invites.base, body);
	};
	
	/**
	 * `DELETE /invites`
	 * Deletes an invite from the given payload.
	 *
	 * @param {Object} opts An options params which
	 *                      is usually already bound
	 *                      by `connect` functions.
	 *
	 * @param {String} [body.id] - The invite ID. If not sent an
	 *                           invite list will be returned instead
	 *
	 * @returns {Promise} Resolves to the result of
	 *                    the request or to an error.
	 */
	var destroy = function destroy(opts, body) {
	  return _request2.default.delete(opts, _routes2.default.invites.details(body.id), {});
	};
	
	exports.default = {
	  find: find,
	  create: create,
	  destroy: destroy
	};
	module.exports = exports['default'];

/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _has = __webpack_require__(50);
	
	var _has2 = _interopRequireDefault(_has);
	
	var _both = __webpack_require__(51);
	
	var _both2 = _interopRequireDefault(_both);
	
	var _cond = __webpack_require__(57);
	
	var _cond2 = _interopRequireDefault(_cond);
	
	var _curry = __webpack_require__(154);
	
	var _curry2 = _interopRequireDefault(_curry);
	
	var _routes = __webpack_require__(63);
	
	var _routes2 = _interopRequireDefault(_routes);
	
	var _request = __webpack_require__(64);
	
	var _request2 = _interopRequireDefault(_request);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var findAll = (0, _curry2.default)(function (opts, body) {
	  return _request2.default.get(opts, _routes2.default.splitRules.findAll(body.transactionId), {});
	}); /**
	     * @name Split Rules
	     * @description This module exposes functions
	     *              related to the `/transactions/:transactionId/split_rules` path.
	     *
	     * @module splitRules
	     **/
	
	var findOne = (0, _curry2.default)(function (opts, body) {
	  var transactionId = body.transactionId,
	      id = body.id;
	
	  return _request2.default.get(opts, _routes2.default.splitRules.find(transactionId, id), {});
	});
	
	/**
	 * `GET /transactions/:transactionId/split_rules`
	 * Makes a request to /transactions/:transactionId/split_rules or
	 * to /transactions/:transactionId/split_rules/:id
	 *
	 * @param {Object} opts - An options params which
	 *                      is usually already bound
	 *                      by `connect` functions.
	 *
	 * @param {Object} body - The payload for the request.
	 * {@link https://pagarme.readme.io/v1/reference#retornando-as-regras-de-divisão-de-uma-transação|API Reference for this payload}
	 * @param {Number} body.transactionId - A specific transaction ID
	 *
	 * @param {Number} [body.id] - The splitRule's ID. If not sent, a splitRules
	 *                                                 list will be returned
	 *                                                 instead.
	 */
	var find = function find(opts, body) {
	  return (0, _cond2.default)([[(0, _both2.default)((0, _has2.default)('transactionId'), (0, _has2.default)('id')), findOne(opts)], [(0, _has2.default)('transactionId'), findAll(opts)]])(body);
	};
	
	exports.default = {
	  find: find
	};
	module.exports = exports['default'];

/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _has = __webpack_require__(50);
	
	var _has2 = _interopRequireDefault(_has);
	
	var _both = __webpack_require__(51);
	
	var _both2 = _interopRequireDefault(_both);
	
	var _cond = __webpack_require__(57);
	
	var _cond2 = _interopRequireDefault(_cond);
	
	var _curry = __webpack_require__(154);
	
	var _curry2 = _interopRequireDefault(_curry);
	
	var _routes = __webpack_require__(63);
	
	var _routes2 = _interopRequireDefault(_routes);
	
	var _request = __webpack_require__(64);
	
	var _request2 = _interopRequireDefault(_request);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var findAll = (0, _curry2.default)(function (opts, body) {
	  return _request2.default.get(opts, _routes2.default.antifraudAnalyses.findAll(body.transactionId), {});
	}); /**
	     * @name Antifraud Analyses
	     * @description This module exposes functions
	     *              related to the `/transactions/:transactionId/antifraud_analyses` path.
	     *
	     * @module antifraudAnalyses
	     **/
	
	var findOne = (0, _curry2.default)(function (opts, body) {
	  var transactionId = body.transactionId,
	      id = body.id;
	
	  return _request2.default.get(opts, _routes2.default.antifraudAnalyses.find(transactionId, id), {});
	});
	
	/**
	 * `GET /transactions/:transactionId/antifraud_analyses`
	 * Makes a request to /transactions/:transactionId/antifraud_analyses or
	 * to /transactions/:transactionId/antifraud_analyses/:id
	 *
	 * @param {Object} opts - An options params which
	 *                      is usually already bound
	 *                      by `connect` functions.
	 *
	 * @param {Object} body - The payload for the request.
	 * {@link https://pagarme.readme.io/v1/reference#retornando-uma-análise-antifraude|API Reference for this payload}
	 * @param {Number} body.transactionId - A specific transaction ID
	 *
	 * @param {Number} [body.id] - The antifraud analyses' ID. If not sent,
	 *                             a antifraud analyses list will be returned instead.
	 */
	var find = function find(opts, body) {
	  return (0, _cond2.default)([[(0, _both2.default)((0, _has2.default)('transactionId'), (0, _has2.default)('id')), findOne(opts)], [(0, _has2.default)('transactionId'), findAll(opts)]])(body);
	};
	
	exports.default = {
	  find: find
	};
	module.exports = exports['default'];

/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _T = __webpack_require__(152);
	
	var _T2 = _interopRequireDefault(_T);
	
	var _has = __webpack_require__(50);
	
	var _has2 = _interopRequireDefault(_has);
	
	var _cond = __webpack_require__(57);
	
	var _cond2 = _interopRequireDefault(_cond);
	
	var _curry = __webpack_require__(154);
	
	var _curry2 = _interopRequireDefault(_curry);
	
	var _routes = __webpack_require__(63);
	
	var _routes2 = _interopRequireDefault(_routes);
	
	var _request = __webpack_require__(64);
	
	var _request2 = _interopRequireDefault(_request);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var findOne = (0, _curry2.default)(function (opts, body) {
	  return _request2.default.get(opts, _routes2.default.recipients.details(body.id), {});
	}); /**
	     * @name Recipients
	     * @description This module exposes functions
	     *              related to the `/recipients` path.
	     *
	     * @module recipients
	     **/
	
	var findAll = (0, _curry2.default)(function (opts, pagination) {
	  return _request2.default.get(opts, _routes2.default.recipients.base, pagination || {});
	});
	
	/**
	 * `GET /recipients`
	 * Makes a request to /recipients or to /recipients/:id
	 *
	 * @param {Object} opts An options params which
	 *                      is usually already bound
	 *                      by `connect` functions.
	 *
	 * @param {Object} body The payload for the request.
	 * {@link https://pagarme.readme.io/v1/reference#retornando-um-recebedor|API Reference for this payload}
	 * @param {String} [body.id] The recipient ID. If not sent a
	 *                           recipient list will be returned instead.
	 * @param {Number} [body.count] Pagination option for recipient list.
	 *                              Number of recipient in a page
	 * @param {Number} [body.page] Pagination option for recipient list.
	 *                             The page index.
	*/
	var find = function find(opts, body) {
	  return (0, _cond2.default)([[(0, _has2.default)('id'), findOne(opts)], [_T2.default, findAll(opts)]])(body);
	};
	
	var all = function all(opts, body) {
	  return findAll(opts, body);
	};
	
	/**
	 * `POST /recipients`
	 * Creates a recipient from the given payload.
	 *
	 * @param {Object} opts An options params which
	 *                      is usually already bound
	 *                      by `connect` functions.
	 * @param {Object} body The payload for the request
	 * {@link https://pagarme.readme.io/v1/reference#criando-um-recebedor|API Reference for this payload}
	 *
	 * @returns {Promise} Resolves to the result of
	 *                    the request or to an error.
	 */
	var create = function create(opts, body) {
	  return _request2.default.post(opts, _routes2.default.recipients.base, body);
	};
	
	/**
	 * `PUT /recipients/:id`
	 * Creates a recipient from the given payload.
	 *
	 * @param {Object} opts An options params which
	 *                      is usually already bound
	 *                      by `connect` functions.
	 * @param {Object} body The payload for the request
	 * {@link https://pagarme.readme.io/v1/reference#atualizando-um-recebedor|API Reference for this payload}
	 * @param {String} body.id The recipient Id
	 *
	 * @returns {Promise} Resolves to the result of
	 *                    the request or to an error.
	 */
	var update = function update(opts, body) {
	  return _request2.default.put(opts, _routes2.default.recipients.details(body.id), body);
	};
	
	exports.default = {
	  find: find,
	  all: all,
	  create: create,
	  update: update
	};
	module.exports = exports['default'];

/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _T = __webpack_require__(152);
	
	var _T2 = _interopRequireDefault(_T);
	
	var _has = __webpack_require__(50);
	
	var _has2 = _interopRequireDefault(_has);
	
	var _cond = __webpack_require__(57);
	
	var _cond2 = _interopRequireDefault(_cond);
	
	var _curry = __webpack_require__(154);
	
	var _curry2 = _interopRequireDefault(_curry);
	
	var _routes = __webpack_require__(63);
	
	var _routes2 = _interopRequireDefault(_routes);
	
	var _request = __webpack_require__(64);
	
	var _request2 = _interopRequireDefault(_request);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var findOne = (0, _curry2.default)(function (opts, body) {
	  return _request2.default.get(opts, _routes2.default.bulkAnticipations.details(body.recipientId, body.id), {});
	}); /**
	     * @name Bulk Anticipations
	     * @description This module exposes functions
	     *              related to the `/recipients/:recipient_id/bulk_anticipations` path.
	     *
	     * @module bulkAnticipations
	     **/
	
	var findAll = (0, _curry2.default)(function (opts, body) {
	  return _request2.default.get(opts, _routes2.default.bulkAnticipations.base(body.recipientId), body);
	});
	
	/**
	 * `GET /recipients/:recipient_id/bulk_anticipations`
	 * Makes a request to /recipients/:recipient_id/bulk_anticipations
	 * or to /recipients/:recipient_id/bulk_anticipations/:id
	 *
	 * @param {Object} opts An options params which
	 *                      is usually already bound
	 *                      by `connect` functions.
	 *
	 * @param {Object} body The payload for the request.
	 * {@link https://pagarme.readme.io/v1/reference#retornando-todas-as-antecipações|API Reference for this payload}
	 * @param {String} body.recipientId The recipient ID.
	 * @param {String} [body.id] The bulkAnticipation ID. If not sent a
	 *                           bulkAnticipation list will be returned instead.
	 * @param {Number} [body.count] Pagination option for bulkAnticipation list.
	 *                              Number of bulkAnticipation in a page
	 * @param {Number} [body.page] Pagination option for bulkAnticipation list.
	 *                             The page index.
	*/
	var find = function find(opts, body) {
	  return (0, _cond2.default)([[(0, _has2.default)('id'), findOne(opts)], [_T2.default, findAll(opts)]])(body);
	};
	
	var all = function all(opts, body) {
	  return findAll(opts, body);
	};
	
	/**
	 * `POST /recipients/:recipient_id/bulk_anticipations`
	 * Creates a bulkAnticipation from the given payload.
	 *
	 * @param {Object} opts An options params which
	 *                      is usually already bound
	 *                      by `connect` functions.
	 * @param {Object} body The payload for the request
	 * {@link https://pagarme.readme.io/v1/reference#criando-uma-antecipação|API Reference for this payload}
	 * @param {String} body.recipientId The recipient ID.
	 *
	 * @returns {Promise} Resolves to the result of
	 *                    the request or to an error.
	 */
	var create = function create(opts, body) {
	  return _request2.default.post(opts, _routes2.default.bulkAnticipations.base(body.recipientId), body);
	};
	
	/**
	 * `PUT /recipients/:recipient_id/bulk_anticipations/:id`
	 * Updates a bulkAnticipation from the given payload.
	 *
	 * @param {Object} opts An options params which
	 *                      is usually already bound
	 *                      by `connect` functions.
	 * @param {Object} body The payload for the request
	 * @param {String} body.recipientId The recipient ID.
	 * @param {String} body.id The bulkAnticipation Id
	 *
	 * @returns {Promise} Resolves to the result of
	 *                    the request or to an error.
	 */
	var update = function update(opts, body) {
	  return _request2.default.put(opts, _routes2.default.bulkAnticipations.details(body.recipientId, body.id), body);
	};
	
	/**
	 * `DELETE /recipients/:recipient_id/bulk_anticipations/:id`
	 * Deletes a bulkAnticipation.
	 *
	 * @param {Object} opts An options params which
	 *                      is usually already bound
	 *                      by `connect` functions.
	 * @param {Object} body The payload for the request
	 * {@link https://pagarme.readme.io/v1/reference#deletando-uma-antecipação-building|API Reference for this payload}
	 * @param {String} body.recipientId The recipient ID.
	 * @param {String} body.id The bulkAnticipation Id
	 *
	 * @returns {Promise} Resolves to the result of
	 *                    the request or to an error.
	 */
	var destroy = function destroy(opts, body) {
	  return _request2.default.delete(opts, _routes2.default.bulkAnticipations.details(body.recipientId, body.id), body);
	};
	
	/**
	 * `GET /recipients/:recipient_id/bulk_anticipations/limits`
	 * Get bulk anticipations limits for a recipient.
	 *
	 * @param {Object} opts An options params which
	 *                      is usually already bound
	 *                      by `connect` functions.
	 * @param {Object} body The payload for the request
	 * {@link https://pagarme.readme.io/v1/reference#obtendo-os-limites-de-antecipação|API Reference for this payload}
	 * @param {String} body.recipientId The recipient ID.
	 *
	 * @returns {Promise} Resolves to the result of
	 *                    the request or to an error.
	 */
	var limits = function limits(opts, body) {
	  return _request2.default.get(opts, _routes2.default.bulkAnticipations.limits(body.recipientId), body);
	};
	
	/**
	 * `GET /recipients/:recipient_id/bulk_anticipations/:id/days`
	 * Get bulk anticipations days.
	 *
	 * @param {Object} opts An options params which
	 *                      is usually already bound
	 *                      by `connect` functions.
	 * @param {Object} body The payload for the request
	 * @param {String} body.recipientId The recipient ID.
	 * @param {String} body.id The bulkAnticipation Id
	 *
	 * @returns {Promise} Resolves to the result of
	 *                    the request or to an error.
	 */
	var days = function days(opts, body) {
	  return _request2.default.get(opts, _routes2.default.bulkAnticipations.days(body.recipientId, body.id), body);
	};
	
	/**
	 * `POST /recipients/:recipient_id/bulk_anticipations/:id/confirm`
	 * Confirm a bulk anticipation.
	 *
	 * @param {Object} opts An options params which
	 *                      is usually already bound
	 *                      by `connect` functions.
	 * @param {Object} body The payload for the request
	 * {@link https://pagarme.readme.io/v1/reference#confirmando-uma-antecipação-building|API Reference for this payload}
	 * @param {String} body.recipientId The recipient ID.
	 * @param {String} body.id The bulkAnticipation Id
	 *
	 * @returns {Promise} Resolves to the result of
	 *                    the request or to an error.
	 */
	var confirm = function confirm(opts, body) {
	  return _request2.default.post(opts, _routes2.default.bulkAnticipations.confirm(body.recipientId, body.id), body);
	};
	
	/**
	 * `POST /recipients/:recipient_id/bulk_anticipations/:id/cancel`
	 * Cancel a bulk anticipation.
	 *
	 * @param {Object} opts An options params which
	 *                      is usually already bound
	 *                      by `connect` functions.
	 * @param {Object} body The payload for the request
	 * @param {String} body.recipientId The recipient ID.
	 * @param {String} body.id The bulkAnticipation Id
	 *
	 * @returns {Promise} Resolves to the result of
	 *                    the request or to an error.
	 */
	var cancel = function cancel(opts, body) {
	  return _request2.default.post(opts, _routes2.default.bulkAnticipations.cancel(body.recipientId, body.id), body);
	};
	
	exports.default = {
	  find: find,
	  all: all,
	  create: create,
	  update: update,
	  destroy: destroy,
	  limits: limits,
	  days: days,
	  confirm: confirm,
	  cancel: cancel
	};
	module.exports = exports['default'];

/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _T = __webpack_require__(152);
	
	var _T2 = _interopRequireDefault(_T);
	
	var _has = __webpack_require__(50);
	
	var _has2 = _interopRequireDefault(_has);
	
	var _cond = __webpack_require__(57);
	
	var _cond2 = _interopRequireDefault(_cond);
	
	var _curry = __webpack_require__(154);
	
	var _curry2 = _interopRequireDefault(_curry);
	
	var _routes = __webpack_require__(63);
	
	var _routes2 = _interopRequireDefault(_routes);
	
	var _request = __webpack_require__(64);
	
	var _request2 = _interopRequireDefault(_request);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var findOne = (0, _curry2.default)(function (opts, body) {
	  return _request2.default.get(opts, _routes2.default.bankAccounts.details(body.id), {});
	}); /**
	     * @name BankAccounts
	     * @description This module exposes functions
	     *              related to the `/bank_accounts` path.
	     *
	     * @module bankAccounts
	     **/
	
	var findAll = (0, _curry2.default)(function (opts, pagination) {
	  return _request2.default.get(opts, _routes2.default.bankAccounts.base, pagination || {});
	});
	
	/**
	 * `GET /bank_accounts`
	 * Makes a request to /bank_accounts
	 *
	 * @param {Object} opts - An options params which
	 *                      is usually already bound
	 *                      by `connect` functions.
	 *
	 * @param {Object} body - The payload for the request.
	 * {@link https://pagarme.readme.io/v1/reference#retornando-várias-contas-bancárias|API Reference for this payload}
	 * @param {Number} [body.count] - Pagination option for a bank account list.
	 *                                Number of bank accounts in a page
	 * @param {Number} [body.page] - Pagination option for bank account list.
	 *                               The page index.
	*/
	var all = function all(opts, body) {
	  return findAll(opts, body);
	};
	
	/**
	 * `GET /bank_accounts`
	 * Makes a request to /bank_accounts or to /bank_accounts/:id
	 *
	 * @param {Object} opts - An options params which
	 *                      is usually already bound
	 *                      by `connect` functions.
	 *
	 * @param {Object} body - The payload for the request.
	 * {@link https://pagarme.readme.io/v1/reference#retornando-uma-conta-bancária|API Reference for this payload}
	 * @param {Number} [body.id] - The bankAccount ID. If not sent a
	 *                             bankAccounts list will be returned instead.
	 * @param {Number} [body.count] - Pagination option for a bank account list.
	 *                                Number of bank accounts in a page
	 * @param {Number} [body.page] - Pagination option for bank account list.
	 *                               The page index.
	*/
	var find = function find(opts, body) {
	  return (0, _cond2.default)([[(0, _has2.default)('id'), findOne(opts)], [_T2.default, findAll(opts)]])(body);
	};
	
	/**
	 * `POST /bank_accounts`
	 * Creates a bank account from the given payload.
	 *
	 * @param {Object} opts An options params which
	 *                      is usually already bound
	 *                      by `connect` functions.
	 * @param {Object} body The payload for the request
	 * {@link https://pagarme.readme.io/v1/reference#criando-uma-conta-bancária|API Reference for this payload}
	 *
	 * @returns {Promise} Resolves to the result of
	 *                    the request or to an error.
	 */
	var create = function create(opts, body) {
	  return _request2.default.post(opts, _routes2.default.bankAccounts.base, body);
	};
	
	exports.default = {
	  all: all,
	  create: create,
	  find: find
	};
	module.exports = exports['default'];

/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _T = __webpack_require__(152);
	
	var _T2 = _interopRequireDefault(_T);
	
	var _has = __webpack_require__(50);
	
	var _has2 = _interopRequireDefault(_has);
	
	var _cond = __webpack_require__(57);
	
	var _cond2 = _interopRequireDefault(_cond);
	
	var _curry = __webpack_require__(154);
	
	var _curry2 = _interopRequireDefault(_curry);
	
	var _routes = __webpack_require__(63);
	
	var _routes2 = _interopRequireDefault(_routes);
	
	var _request = __webpack_require__(64);
	
	var _request2 = _interopRequireDefault(_request);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var findOne = (0, _curry2.default)(function (opts, body) {
	  return _request2.default.get(opts, _routes2.default.plans.details(body.id), {});
	}); /**
	     * @name Plans
	     * @description This module exposes functions
	     *              related to the `/plans` path.
	     *
	     * @module plans
	     **/
	
	var findAll = (0, _curry2.default)(function (opts, pagination) {
	  return _request2.default.get(opts, _routes2.default.plans.base, pagination || {});
	});
	
	/**
	 * `GET /plans`
	 * Makes a request to /plans or to /plans/:id
	 *
	 * @param {Object} opts An options params which
	 *                      is usually already bound
	 *                      by `connect` functions.
	 *
	 * @param {Object} body The payload for the request.
	 * {@link https://pagarme.readme.io/v1/reference#retornando-um-plano|API Reference for this payload}
	 * @param {Number} [body.id] The plan's ID. If not sent a
	 *                           plans list will be returned instead.
	 * @param {Number} [body.count] Pagination option to get a list of plans.
	 *                              Number of plans in a page
	 * @param {Number} [body.page] Pagination option for a list of plans.
	 *                             The page index.
	*/
	var find = function find(opts, body) {
	  return (0, _cond2.default)([[(0, _has2.default)('id'), findOne(opts)], [_T2.default, findAll(opts)]])(body);
	};
	
	/**
	 * `GET /plans`
	 * Makes a request to /plans
	 *
	 * @param {Object} opts An options params which
	 *                      is usually already bound
	 *                      by `connect` functions.
	 *
	 * @param {Object} body The payload for the request.
	 * {@link https://pagarme.readme.io/v1/reference#retornando-planos|API Reference for this payload}
	 * @param {Number} [body.count] Pagination option to get a list of plans.
	 *                              Number of plans in a page
	 * @param {Number} [body.page] Pagination option for a list of plans.
	 *                             The page index.
	*/
	var all = function all(opts, pagination) {
	  return findAll(opts, pagination);
	};
	
	/**
	 * `POST /plans`
	 * Creates a plan from the given payload.
	 *
	 * @param {Object} opts An options params which
	 *                      is usually already bound
	 *                      by `connect` functions.
	 * @param {Object} body The payload for the request
	 * {@link https://pagarme.readme.io/v1/reference#criando-planos|API Reference for this payload}
	 *
	 * @returns {Promise} Resolves to the result of
	 *                    the request or to an error.
	 */
	var create = function create(opts, body) {
	  return _request2.default.post(opts, _routes2.default.plans.base, body);
	};
	
	/**
	 * `PUT /plans/:id`
	 * Updates a plans from the given payload.
	 *
	 * @param {Object} opts An options params which
	 *                      is usually already bound
	 *                      by `connect` functions.
	 *
	 * @param {Object} body The payload for the request
	 * {@link https://pagarme.readme.io/v1/reference#atualizando-planos|API Reference for this payload}
	 * @param {Number} body.id The plan's ID
	 * @param {String} [body.name] The plan's name
	 * @param {Number} [body.trial_days] The number of days to test the plan with
	 *                                   no charges
	 * @returns {Promise} A promise that resolves to
	 *                    the newly created plans's
	 *                    data or to an error.
	 */
	var update = function update(opts, body) {
	  return _request2.default.put(opts, _routes2.default.plans.details(body.id), body);
	};
	
	exports.default = {
	  all: all,
	  find: find,
	  findAll: findAll,
	  create: create,
	  update: update
	};
	module.exports = exports['default'];

/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _T = __webpack_require__(152);
	
	var _T2 = _interopRequireDefault(_T);
	
	var _has = __webpack_require__(50);
	
	var _has2 = _interopRequireDefault(_has);
	
	var _cond = __webpack_require__(57);
	
	var _cond2 = _interopRequireDefault(_cond);
	
	var _curry = __webpack_require__(154);
	
	var _curry2 = _interopRequireDefault(_curry);
	
	var _routes = __webpack_require__(63);
	
	var _routes2 = _interopRequireDefault(_routes);
	
	var _request = __webpack_require__(64);
	
	var _request2 = _interopRequireDefault(_request);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var findOne = (0, _curry2.default)(function (opts, body) {
	  return _request2.default.get(opts, _routes2.default.acquirersConfigurations.details(body.id), {});
	}); /**
	     * @name Acquirer's Configurations
	     * @description This module exposes functions
	     *              related to the `/acquirers_configurations` and
	     *              `/acquirers_configuration` paths.
	     *
	     * @module acquirersConfigurations
	     **/
	
	var findAll = (0, _curry2.default)(function (opts, pagination) {
	  return _request2.default.get(opts, _routes2.default.acquirersConfigurations.base, pagination || {});
	});
	
	/**
	 * `GET /acquirers_configurations`
	 * Makes a request to /acquirers_configurations or to /acquirers_configuration/:id
	 *
	 * @param {Object} opts An options params which
	 *                      is usually already bound
	 *                      by `connect` functions.
	 *
	 * @param {Object} body The payload for the request.
	 * @param {Number} [body.id]  The acquirer's configuration ID. If not sent a
	 *                            list of acquirer's configuration will be returned instead.
	 * @param {Number} [body.count] Pagination option to get a list of acquirer's
	 *                              configurations.
	 *                              Number of configurations in a page
	 * @param {Number} [body.page] Pagination option for a list of acquirer's
	 *                             configurations.
	 *                             The page index.
	*/
	var find = function find(opts, body) {
	  return (0, _cond2.default)([[(0, _has2.default)('id'), findOne(opts)], [_T2.default, findAll(opts)]])(body);
	};
	
	/**
	 * `GET /acquirers_configurations`
	 * Makes a request to /acquirers_configurations
	 *
	 * @param {Object} opts An options params which
	 *                      is usually already bound
	 *                      by `connect` functions.
	 *
	 * @param {Object} body The payload for the request.
	 * @param {Number} [body.count] Pagination option to get a list of acquirer's
	 *                              configurations.
	 *                              Number of configurations in a page
	 * @param {Number} [body.page] Pagination option for a list of acquirer's
	 *                             configurations.
	 *                             The page index.
	*/
	var all = function all(opts, pagination) {
	  return findAll(opts, pagination);
	};
	
	/**
	 * `POST /acquirers_configurations`
	 * Creates an acquirer's configuration from the given payload.
	 *
	 * @param {Object} opts An options params which
	 *                      is usually already bound
	 *                      by `connect` functions.
	 * @param {Object} body The payload for the request
	 *
	 * @returns {Promise} Resolves to the result of
	 *                    the request or to an error.
	 */
	var create = function create(opts, body) {
	  return _request2.default.post(opts, _routes2.default.acquirersConfigurations.base, body);
	};
	
	/**
	 * `PUT /acquirers_configuration/:id`
	 * Updates an acquirer's configuration from the given payload.
	 *
	 * @param {Object} opts An options params which
	 *                      is usually already bound
	 *                      by `connect` functions.
	 *
	 * @param {Object} body The payload for the request
	 * @param {Number} body.id The acquirer's configuration ID
	 * @returns {Promise} A promise that resolves to
	 *                    the newly created acquirer's configurations
	 *                    data or to an error.
	 */
	var update = function update(opts, body) {
	  return _request2.default.put(opts, _routes2.default.acquirersConfigurations.details(body.id), body);
	};
	
	exports.default = {
	  all: all,
	  find: find,
	  findAll: findAll,
	  create: create,
	  update: update
	};
	module.exports = exports['default'];

/***/ },
/* 166 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _T = __webpack_require__(152);
	
	var _T2 = _interopRequireDefault(_T);
	
	var _has = __webpack_require__(50);
	
	var _has2 = _interopRequireDefault(_has);
	
	var _cond = __webpack_require__(57);
	
	var _cond2 = _interopRequireDefault(_cond);
	
	var _curry = __webpack_require__(154);
	
	var _curry2 = _interopRequireDefault(_curry);
	
	var _routes = __webpack_require__(63);
	
	var _routes2 = _interopRequireDefault(_routes);
	
	var _request = __webpack_require__(64);
	
	var _request2 = _interopRequireDefault(_request);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var findOne = (0, _curry2.default)(function (opts, body) {
	  return _request2.default.get(opts, _routes2.default.acquirers.details(body.id), {});
	}); /**
	     * @name Acquirers
	     * @description This module exposes functions
	     *              related to the `/acquirers` and
	     *              `/acquirers` paths.
	     *
	     * @module acquirers
	     **/
	
	var findAll = (0, _curry2.default)(function (opts, pagination) {
	  return _request2.default.get(opts, _routes2.default.acquirers.base, pagination || {});
	});
	
	/**
	 * `GET /acquirers`
	 * Makes a request to /acquirers or to /acquirers/:id
	 *
	 * @param {Object} opts An options params which
	 *                      is usually already bound
	 *                      by `connect` functions.
	 *
	 * @param {Object} body The payload for the request.
	 * @param {Number} [body.id]  The acquirer's ID. If not sent a
	 *                            list of acquirer will be returned instead.
	 * @param {Number} [body.count] Pagination option to get a list of acquirers.
	 *                              Number of acquirers in a page.
	 * @param {Number} [body.page] Pagination option for a list of acquirers.
	 *                             The page index.
	*/
	var find = function find(opts, body) {
	  return (0, _cond2.default)([[(0, _has2.default)('id'), findOne(opts)], [_T2.default, findAll(opts)]])(body);
	};
	
	/**
	 * `GET /acquirers`
	 * Makes a request to /acquirers
	 *
	 * @param {Object} opts An options params which
	 *                      is usually already bound
	 *                      by `connect` functions.
	 *
	 * @param {Object} body The payload for the request.
	 * @param {Number} [body.count] Pagination option to get a list of acquirers
	 *                              Number of acquirers in a page.
	 * @param {Number} [body.page] Pagination option for a list of acquirers.
	 *                             The page index.
	*/
	var all = function all(opts, pagination) {
	  return findAll(opts, pagination);
	};
	
	/**
	 * `POST /acquirers`
	 * Creates an acquirer from the given payload.
	 *
	 * @param {Object} opts An options params which
	 *                      is usually already bound
	 *                      by `connect` functions.
	 * @param {Object} body The payload for the request
	 *
	 * @returns {Promise} Resolves to the result of
	 *                    the request or to an error.
	 */
	var create = function create(opts, body) {
	  return _request2.default.post(opts, _routes2.default.acquirers.base, body);
	};
	
	/**
	 * `PUT /acquirers/:id`
	 * Updates an acquirer from the given payload.
	 *
	 * @param {Object} opts An options params which
	 *                      is usually already bound
	 *                      by `connect` functions.
	 *
	 * @param {Object} body The payload for the request
	 * @param {Number} body.id The acquirer's ID
	 * @returns {Promise} A promise that resolves to
	 *                    the newly created acquirer's
	 *                    data or to an error.
	 */
	var update = function update(opts, body) {
	  return _request2.default.put(opts, _routes2.default.acquirers.details(body.id), body);
	};
	
	exports.default = {
	  all: all,
	  find: find,
	  findAll: findAll,
	  create: create,
	  update: update
	};
	module.exports = exports['default'];

/***/ },
/* 167 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _T = __webpack_require__(152);
	
	var _T2 = _interopRequireDefault(_T);
	
	var _has = __webpack_require__(50);
	
	var _has2 = _interopRequireDefault(_has);
	
	var _cond = __webpack_require__(57);
	
	var _cond2 = _interopRequireDefault(_cond);
	
	var _curry = __webpack_require__(154);
	
	var _curry2 = _interopRequireDefault(_curry);
	
	var _routes = __webpack_require__(63);
	
	var _routes2 = _interopRequireDefault(_routes);
	
	var _request = __webpack_require__(64);
	
	var _request2 = _interopRequireDefault(_request);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var findOne = (0, _curry2.default)(function (opts, body) {
	  return _request2.default.get(opts, _routes2.default.subscriptions.details(body.id), {});
	}); /**
	     * @name Subscriptions
	     * @description This module exposes functions
	     *              related to the `/subscriptions` path.
	     *
	     * @module subscriptions
	     **/
	
	var findAll = (0, _curry2.default)(function (opts, pagination) {
	  return _request2.default.get(opts, _routes2.default.subscriptions.base, pagination || {});
	});
	
	/**
	 * `GET /subscriptions`
	 * Makes a request to /subscriptions or to /subscriptions/:id
	 *
	 * @param {Object} opts An options params which
	 *                      is usually already bound
	 *                      by `connect` functions.
	 *
	 * @param {Object} body The payload for the request.
	 * {@link https://pagarme.readme.io/v1/reference#retornando-uma-assinatura|API Reference for this payload}
	 * @param {Number} [body.id] The subscription's ID. If not sent a
	 *                           subscriptions list will be returned instead.
	 * @param {Number} [body.count] Pagination option to get a list of subscriptions.
	 *                              Number of subscriptions in a page
	 * @param {Number} [body.page] Pagination option for a list of subscriptions.
	 *                             The page index.
	*/
	var find = function find(opts, body) {
	  return (0, _cond2.default)([[(0, _has2.default)('id'), findOne(opts)], [_T2.default, findAll(opts)]])(body);
	};
	
	/**
	 * `GET /subscriptions`
	 * Makes a request to /subscriptions
	 *
	 * @param {Object} opts An options params which
	 *                      is usually already bound
	 *                      by `connect` functions.
	 *
	 * @param {Object} body The payload for the request.
	 * {@link https://pagarme.readme.io/v1/reference#retornando-assinaturas|API Reference for this payload}
	 * @param {Number} [body.count] Pagination option to get a list of subscriptions.
	 *                              Number of subscriptions in a page
	 * @param {Number} [body.page] Pagination option for a list of subscriptions.
	 *                             The page index.
	*/
	var all = function all(opts, pagination) {
	  return findAll(opts, pagination);
	};
	
	/**
	 * `POST /subscriptions`
	 * Creates a subscription from the given payload.
	 *
	 * @param {Object} opts An options params which
	 *                      is usually already bound
	 *                      by `connect` functions.
	 * @param {Object} body The payload for the request
	 * {@link https://pagarme.readme.io/v1/reference#criando-assinaturas|API Reference for this payload}
	 *
	 * @returns {Promise} Resolves to the result of
	 *                    the request or to an error.
	 */
	var create = function create(opts, body) {
	  return _request2.default.post(opts, _routes2.default.subscriptions.base, body);
	};
	
	/**
	 * `PUT /subscriptions/:id`
	 * Updates a subscription from the given payload.
	 *
	 * @param {Object} opts An options params which
	 *                      is usually already bound
	 *                      by `connect` functions.
	 *
	 * @param {Object} body The payload for the request
	 * {@link https://pagarme.readme.io/v1/reference#atualizando-uma-assinatura|API Reference for this payload}
	 * @param {Number} body.id The subscription's ID
	 * @returns {Promise} A promise that resolves to
	 *                    the newly created subscriptions's
	 *                    data or to an error.
	 */
	var update = function update(opts, body) {
	  return _request2.default.put(opts, _routes2.default.subscriptions.details(body.id), body);
	};
	
	/**
	 * `POST /subscriptions/:id/cancel`
	 * Cancels a subscription
	 *
	 * @param {Object} opts An options params which
	 *                      is usually already bound
	 *                      by `connect` functions.
	 * @param {Object} body The payload for the request
	 * {@link https://pagarme.readme.io/v1/reference#cancelando-uma-assinatura|API Reference for this payload}
	 * @param {Number} body.id The subscription's ID
	 *
	 * @returns {Promise} Resolves to the result of
	 *                    the request or to an error.
	 */
	var cancel = function cancel(opts, body) {
	  return _request2.default.post(opts, _routes2.default.subscriptions.cancel(body.id), {});
	};
	
	/**
	 * `POST /subscriptions/:id/transactions`
	 * Creates a transaction for a subscription
	 *
	 * @param {Object} opts An options params which
	 *                      is usually already bound
	 *                      by `connect` functions.
	 * @param {Object} body The payload for the request
	 * @param {Number} body.id The subscription's ID
	 *
	 * @returns {Promise} Resolves to the result of
	 *                    the request or to an error.
	 */
	var createTransaction = function createTransaction(opts, body) {
	  return _request2.default.post(opts, _routes2.default.subscriptions.transactions(body.id), body);
	};
	
	/**
	 * `GET /subscriptions/:id/transactions`
	 * Gets transactions for a subscription
	 *
	 * @param {Object} opts An options params which
	 *                      is usually already bound
	 *                      by `connect` functions.
	 * @param {Object} body The payload for the request
	 * {@link https://pagarme.readme.io/v1/reference#transações-em-uma-assinatura|API Reference for this payload}
	 * @param {Number} body.id The subscription's ID
	 *
	 * @returns {Promise} Resolves to the result of
	 *                    the request or to an error.
	 */
	var findTransactions = function findTransactions(opts, body) {
	  return _request2.default.get(opts, _routes2.default.subscriptions.transactions(body.id), {});
	};
	
	exports.default = {
	  all: all,
	  find: find,
	  findAll: findAll,
	  create: create,
	  update: update,
	  cancel: cancel,
	  createTransaction: createTransaction,
	  findTransactions: findTransactions
	};
	module.exports = exports['default'];

/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _T = __webpack_require__(152);
	
	var _T2 = _interopRequireDefault(_T);
	
	var _has = __webpack_require__(50);
	
	var _has2 = _interopRequireDefault(_has);
	
	var _cond = __webpack_require__(57);
	
	var _cond2 = _interopRequireDefault(_cond);
	
	var _curry = __webpack_require__(154);
	
	var _curry2 = _interopRequireDefault(_curry);
	
	var _routes = __webpack_require__(63);
	
	var _routes2 = _interopRequireDefault(_routes);
	
	var _request = __webpack_require__(64);
	
	var _request2 = _interopRequireDefault(_request);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var findOne = (0, _curry2.default)(function (opts, body) {
	  return _request2.default.get(opts, _routes2.default.cards.details(body.id), {});
	}); /**
	     * @name Cards
	     * @description This module exposes functions
	     *              related to the `/cards` path.
	     *
	     * @module cards
	     **/
	
	
	var findAll = (0, _curry2.default)(function (opts, pagination) {
	  return _request2.default.get(opts, _routes2.default.cards.base, pagination || {});
	});
	
	/**
	 * `GET /cards`
	 * Makes a request to /cards or to /cards/:id
	 *
	 * @param {Object} opts An options params which
	 *                      is usually already bound
	 *                      by `connect` functions.
	 *
	 * @param {Object} body The payload for the request.
	 * {@link https://pagarme.readme.io/v1/reference#retornando-um-cartão-salvo-1|API Reference for this payload}
	 * @param {Number} [body.id] The cards's ID. If not sent a
	 *                           cards list will be returned instead.
	 * @param {Number} [body.count] Pagination option to get a list of cards.
	 *                              Number of cards in a page
	 * @param {Number} [body.page] Pagination option for a list of cards.
	 *                             The page index.
	*/
	var find = function find(opts, body) {
	  return (0, _cond2.default)([[(0, _has2.default)('id'), findOne(opts)], [_T2.default, findAll(opts)]])(body);
	};
	
	/**
	 * `GET /cards`
	 * Makes a request to /cards
	 *
	 * @param {Object} opts An options params which
	 *                      is usually already bound
	 *                      by `connect` functions.
	 *
	 * @param {Object} body The payload for the request.
	 * {@link https://pagarme.readme.io/v1/reference#retornando-todos-os-cartões|API Reference for this payload}
	 * @param {Number} [body.count] Pagination option to get a list of cards.
	 *                              Number of cards in a page
	 * @param {Number} [body.page] Pagination option for a list of cards.
	 *                             The page index.
	*/
	var all = function all(opts, pagination) {
	  return findAll(opts, pagination);
	};
	
	/**
	 * `POST /cards`
	 * Creates a card from the given payload.
	 *
	 * @param {Object} opts An options params which
	 *                      is usually already bound
	 *                      by `connect` functions.
	 * @param {Object} body The payload for the request
	 * {@link https://pagarme.readme.io/v1/reference#criando-um-cartao|API Reference for this payload}
	 *
	 * @returns {Promise} Resolves to the result of
	 *                    the request or to an error.
	 */
	var create = function create(opts, body) {
	  return _request2.default.post(opts, _routes2.default.cards.base, body);
	};
	
	exports.default = {
	  find: find,
	  all: all,
	  create: create
	};
	module.exports = exports['default'];

/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _T = __webpack_require__(152);
	
	var _T2 = _interopRequireDefault(_T);
	
	var _has = __webpack_require__(50);
	
	var _has2 = _interopRequireDefault(_has);
	
	var _cond = __webpack_require__(57);
	
	var _cond2 = _interopRequireDefault(_cond);
	
	var _curry = __webpack_require__(154);
	
	var _curry2 = _interopRequireDefault(_curry);
	
	var _routes = __webpack_require__(63);
	
	var _routes2 = _interopRequireDefault(_routes);
	
	var _request = __webpack_require__(64);
	
	var _request2 = _interopRequireDefault(_request);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var findOne = (0, _curry2.default)(function (opts, body) {
	  return _request2.default.get(opts, _routes2.default.transfers.details(body.id), {});
	}); /**
	     * @name Transfers
	     * @description This module exposes functions
	     *              related to the `/itransfers` path.
	     *
	     * @module transfers
	     **/
	
	
	var findAll = (0, _curry2.default)(function (opts, pagination) {
	  return _request2.default.get(opts, _routes2.default.transfers.base, pagination || {});
	});
	
	/**
	 * `GET /transfers`
	 * Makes a request to /transfers or to /transfers/:id
	 *
	 * @param {Object} opts An options params which
	 *                      is usually already bound
	 *                      by `connect` functions.
	 *
	 * @param {Object} body The payload for the request.
	 * {@link https://pagarme.readme.io/v1/reference#vendo-dados-de-uma-transferência|API Reference for this payload}
	 * @param {Number} [body.id] The transfer's ID. If not sent a
	 *                           transfers list will be returned instead.
	 * @param {Number} [body.count] Pagination option to get a list of transfers.
	 *                              Number of transfers in a page
	 * @param {Number} [body.page] Pagination option for a list of transfers.
	 *                             The page index.
	*/
	var find = function find(opts, body) {
	  return (0, _cond2.default)([[(0, _has2.default)('id'), findOne(opts)], [_T2.default, findAll(opts)]])(body);
	};
	
	/**
	 * `GET /transfers`
	 * Makes a request to /transfers
	 *
	 * @param {Object} opts An options params which
	 *                      is usually already bound
	 *                      by `connect` functions.
	 *
	 * @param {Object} body The payload for the request.
	 * {@link https://pagarme.readme.io/v1/reference#vendo-dados-de-várias-transferências|API Reference for this payload}
	 * @param {Number} [body.count] Pagination option to get a list of transfers.
	 *                              Number of transfers in a page
	 * @param {Number} [body.page] Pagination option for a list of transfers.
	 *                             The page index.
	*/
	var all = function all(opts, pagination) {
	  return findAll(opts, pagination);
	};
	
	/**
	 * `POST /transfers`
	 * Creates a transfer from the given payload.
	 *
	 * @param {Object} opts An options params which
	 *                      is usually already bound
	 *                      by `connect` functions.
	 * @param {Object} body The payload for the request
	 * {@link https://pagarme.readme.io/v1/reference#criando-uma-transferência|API Reference for this payload}
	 *
	 * @returns {Promise} Resolves to the result of
	 *                    the request or to an error.
	 */
	var create = function create(opts, body) {
	  return _request2.default.post(opts, _routes2.default.transfers.base, body);
	};
	
	/**
	 * `POST /transfers/:id/cancel`
	 * Cancels a transfer
	 *
	 * @param {Object} opts An options params which
	 *                      is usually already bound
	 *                      by `connect` functions.
	 * @param {Object} body The payload for the request
	 * {@link https://pagarme.readme.io/v1/reference#cancelando-uma-transferência|API Reference for this payload}
	 * @param {Number} body.id The transfer's ID
	 *
	 * @returns {Promise} Resolves to the result of
	 *                    the request or to an error.
	 */
	var cancel = function cancel(opts, body) {
	  return _request2.default.post(opts, _routes2.default.transfers.cancel(body.id), {});
	};
	
	/**
	 * `GET /transfers/days`
	 * Returns company's transfers aggregated by day
	 *
	 * @param {Object} opts An options params which
	 *                      is usually already bound
	 *                      by `connect` functions.
	*/
	var days = function days(opts) {
	  return _request2.default.get(opts, _routes2.default.transfers.days, {});
	};
	
	/**
	 * `GET /transfers/limits`
	 * Returns company's transfers limits
	 *
	 * @param {Object} opts An options params which
	 *                      is usually already bound
	 *                      by `connect` functions.
	*/
	var limits = function limits(opts) {
	  return _request2.default.get(opts, _routes2.default.transfers.limits, {});
	};
	
	exports.default = {
	  find: find,
	  all: all,
	  create: create,
	  cancel: cancel,
	  days: days,
	  limits: limits
	};
	module.exports = exports['default'];

/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _routes = __webpack_require__(63);
	
	var _routes2 = _interopRequireDefault(_routes);
	
	var _request = __webpack_require__(64);
	
	var _request2 = _interopRequireDefault(_request);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * `GET /balance`
	 * Returns company's balance
	 *
	 * @param {Object} opts An options params which
	 *                      is usually already bound
	 *                      by `connect` functions.
	*/
	/**
	 * @name Balance
	 * @description This module exposes functions
	 *              related to the `/balance` path.
	 *
	 * @module balance
	 **/
	
	var primary = function primary(opts) {
	  return _request2.default.get(opts, _routes2.default.balance.base, {});
	};
	
	/**
	 * `GET /recipients/:id/balance`
	 * Returns the balance of a recipient.
	 *
	 * @param {Object} opts An options params which
	 *                      is usually already bound
	 *                      by `connect` functions.
	 *
	 * @param {Object} body The payload for the request
	 * @param {String} body.recipientId The recipient Id
	 *
	 * @returns {Promise} Resolves to the result of
	 *                    the request or to an error.
	 */
	var find = function find(opts, body) {
	  return _request2.default.get(opts, _routes2.default.balance.recipient(body.recipientId), body);
	};
	
	exports.default = {
	  primary: primary,
	  find: find
	};
	module.exports = exports['default'];

/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _T = __webpack_require__(152);
	
	var _T2 = _interopRequireDefault(_T);
	
	var _has = __webpack_require__(50);
	
	var _has2 = _interopRequireDefault(_has);
	
	var _both = __webpack_require__(51);
	
	var _both2 = _interopRequireDefault(_both);
	
	var _cond = __webpack_require__(57);
	
	var _cond2 = _interopRequireDefault(_cond);
	
	var _curry = __webpack_require__(154);
	
	var _curry2 = _interopRequireDefault(_curry);
	
	var _routes = __webpack_require__(63);
	
	var _routes2 = _interopRequireDefault(_routes);
	
	var _request = __webpack_require__(64);
	
	var _request2 = _interopRequireDefault(_request);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var findOne = (0, _curry2.default)(function (opts, body) {
	  return _request2.default.get(opts, _routes2.default.balanceOperations.details(body.id), {});
	}); /**
	     * @name Balance Operations
	     * @description This module exposes functions
	     *              related to the `/balance/operations` path.
	     *
	     * @module balanceOperations
	     **/
	
	var findAll = (0, _curry2.default)(function (opts, pagination) {
	  return _request2.default.get(opts, _routes2.default.balanceOperations.base, pagination || {});
	});
	
	var findRecipients = (0, _curry2.default)(function (opts, body) {
	  return _request2.default.get(opts, _routes2.default.balanceOperations.recipients.findAll(body.recipientId), {});
	});
	
	var findRecipientsWithBalanceId = (0, _curry2.default)(function (opts, body) {
	  return _request2.default.get(opts, _routes2.default.balanceOperations.recipients.find(body.id, body.recipientId), {});
	});
	
	var findRecipientsWithFormat = (0, _curry2.default)(function (opts, body) {
	  var recipientId = body.recipientId,
	      format = body.format;
	
	  return _request2.default.get(opts, _routes2.default.balanceOperations.recipients.findWithFormat(recipientId, format));
	});
	
	/**
	 * `GET /balance/operations`
	 * Makes a request to /balance/operations,
	 * /balance/operations/:id,
	 * /recipients/:recipient_id/balance/operations/ or
	 * /recipients/:recipient_id/balance/operations/:id
	 * and returns company's balanceOperations or returns a specif company's balanceOperation
	 *
	 * @param {Object} opts An options params which
	 *                      is usually already bound
	 *                      by `connect` functions.
	 *
	 * @param {Object} body The payload for the request.
	 * {@link https://pagarme.readme.io/v1/reference#histórico-específico-de-uma-operação|API Reference for this payload}
	 * @param {Number} [body.id] The operations's ID. If not sent a
	 *                           operations list will be returned instead.
	 * @param {Number} [body.recipientId] The recipient's ID.
	 * @param {String} [body.format] The file extension.
	 * @param {Number} [body.count] Pagination option to get a list of operations.
	 *                              Number of operations in a page
	 * @param {Number} [body.page] Pagination option for a list of operations.
	 *                             The page index.
	*/
	var find = function find(opts, body) {
	  return (0, _cond2.default)([[(0, _both2.default)((0, _has2.default)('id'), (0, _has2.default)('recipientId')), findRecipientsWithBalanceId(opts)], [(0, _both2.default)((0, _has2.default)('recipientId'), (0, _has2.default)('format')), findRecipientsWithFormat(opts)], [(0, _has2.default)('recipientId'), findRecipients(opts)], [(0, _has2.default)('id'), findOne(opts)], [_T2.default, findAll(opts)]])(body);
	};
	
	/**
	 * `GET /balance/operations`
	 * Returns company's balanceOperations
	 *
	 * @param {Object} opts An options params which
	 *                      is usually already bound
	 *                      by `connect` functions.
	 *
	 * @param {Object} body The payload for the request.
	 * {@link https://pagarme.readme.io/v1/reference#histórico-das-operações|API Reference for this payload}
	 * @param {Number} [body.count] Pagination option to get a list of operations.
	 *                              Number of operations in a page
	 * @param {Number} [body.page] Pagination option for a list of operations.
	 *                             The page index.
	*/
	var all = function all(opts, pagination) {
	  return findAll(opts, pagination);
	};
	
	/**
	 * `GET /balance/operations/days`
	 * Returns a company's balanceOperations aggregated by day
	 *
	 * @param {Object} opts An options params which
	 *                      is usually already bound
	 *                      by `connect` functions.
	*/
	var days = function days(opts) {
	  return _request2.default.get(opts, _routes2.default.balanceOperations.days, {});
	};
	
	exports.default = {
	  find: find,
	  all: all,
	  days: days
	};
	module.exports = exports['default'];

/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _T = __webpack_require__(152);
	
	var _T2 = _interopRequireDefault(_T);
	
	var _has = __webpack_require__(50);
	
	var _has2 = _interopRequireDefault(_has);
	
	var _both = __webpack_require__(51);
	
	var _both2 = _interopRequireDefault(_both);
	
	var _cond = __webpack_require__(57);
	
	var _cond2 = _interopRequireDefault(_cond);
	
	var _curry = __webpack_require__(154);
	
	var _curry2 = _interopRequireDefault(_curry);
	
	var _routes = __webpack_require__(63);
	
	var _routes2 = _interopRequireDefault(_routes);
	
	var _request = __webpack_require__(64);
	
	var _request2 = _interopRequireDefault(_request);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var findAllInTransactions = (0, _curry2.default)(function (opts, body) {
	  return _request2.default.get(opts, _routes2.default.events.transaction(body.transactionId), {});
	}); /**
	     * @name Events
	     * @description This module exposes functions
	     *              related to events.
	     *
	     * @module events
	     **/
	
	var findOneInTransactions = (0, _curry2.default)(function (opts, body) {
	  return _request2.default.get(opts, _routes2.default.events.transactionDetails(body.id, body.transactionId), {});
	});
	
	var findAllInSubscriptions = (0, _curry2.default)(function (opts, body) {
	  return _request2.default.get(opts, _routes2.default.events.subscription(body.subscriptionId), {});
	});
	
	var findOneInSubscriptions = (0, _curry2.default)(function (opts, body) {
	  return _request2.default.get(opts, _routes2.default.events.subscriptionDetails(body.id, body.subscriptionId), {});
	});
	
	/**
	 * `GET /:model/:model_id/events`
	 *
	 * @param {Object} opts An options params which
	 *                      is usually already bound
	 *                      by `connect` functions.
	 *
	 * @param {Object} body The payload for the request.
	 * {@link https://pagarme.readme.io/v1/reference#retornando-todos-os-eventos-de-uma-transação|API Reference for this payload}
	 * @param {Number} [body.id] The event ID. If not sent a
	 * @param {Number} [body.transactionId] A transaction ID to get all
	 *                                      the events.
	 * @param {Number} [body.count] Pagination option for transaction list.
	 *                              Number of transaction in a page
	 * @param {Number} [body.page] Pagination option for transaction list.
	 *                             The page index.
	*/
	var find = function find(opts, body) {
	  return (0, _cond2.default)([[(0, _both2.default)((0, _has2.default)('transactionId'), (0, _has2.default)('id')), findOneInTransactions(opts)], [(0, _has2.default)('transactionId'), findAllInTransactions(opts)], [(0, _both2.default)((0, _has2.default)('subscriptionId'), (0, _has2.default)('id')), findOneInSubscriptions(opts)], [(0, _has2.default)('subscriptionId'), findAllInSubscriptions(opts)], [_T2.default, findAllInTransactions(opts)]])(body);
	};
	
	/**
	 * `GET /events`
	 * Makes a request to /events
	 *
	 * @param {Object} opts An options params which
	 *                      is usually already bound
	 *                      by `connect` functions.
	 *
	 * @param {Object} body The payload for the request.
	*/
	var findCustom = function findCustom(opts, body) {
	  return _request2.default.get(opts, _routes2.default.events.base, body);
	};
	
	exports.default = {
	  find: find,
	  findCustom: findCustom
	};
	module.exports = exports['default'];

/***/ },
/* 173 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _T = __webpack_require__(152);
	
	var _T2 = _interopRequireDefault(_T);
	
	var _has = __webpack_require__(50);
	
	var _has2 = _interopRequireDefault(_has);
	
	var _both = __webpack_require__(51);
	
	var _both2 = _interopRequireDefault(_both);
	
	var _cond = __webpack_require__(57);
	
	var _cond2 = _interopRequireDefault(_cond);
	
	var _curry = __webpack_require__(154);
	
	var _curry2 = _interopRequireDefault(_curry);
	
	var _routes = __webpack_require__(63);
	
	var _routes2 = _interopRequireDefault(_routes);
	
	var _request = __webpack_require__(64);
	
	var _request2 = _interopRequireDefault(_request);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var findAllInTransactions = (0, _curry2.default)(function (opts, body) {
	  return _request2.default.get(opts, _routes2.default.gatewayOperations.transaction(body.transactionId), {});
	}); /**
	     * @name Gateway Operations
	     * @description This module exposes functions
	     *              related to events.
	     *
	     * @module gatewayOperations
	     **/
	
	var findOneInTransactions = (0, _curry2.default)(function (opts, body) {
	  return _request2.default.get(opts, _routes2.default.gatewayOperations.transactionDetails(body.id, body.transactionId), {});
	});
	
	var findAllInSubscriptions = (0, _curry2.default)(function (opts, body) {
	  return _request2.default.get(opts, _routes2.default.gatewayOperations.subscription(body.subscriptionId), {});
	});
	
	/**
	 * `GET /:model/:model_id/operations`
	 *
	 * @param {Object} opts An options params which
	 *                      is usually already bound
	 *                      by `connect` functions.
	 *
	 * @param {Object} body The payload for the request.
	 * {@link https://pagarme.readme.io/v1/reference#retornando-todo-histórico-de-uma-transação|API Reference for this payload}
	 * @param {Number} [body.id] The operation ID. If not sent a
	 * @param {Number} [body.transactionId] A transaction ID to get all
	 *                                      the operations.
	 * @param {Number} [body.subscriptionId] A subscription ID
	*/
	var find = function find(opts, body) {
	  return (0, _cond2.default)([[(0, _both2.default)((0, _has2.default)('transactionId'), (0, _has2.default)('id')), findOneInTransactions(opts)], [(0, _has2.default)('transactionId'), findAllInTransactions(opts)], [(0, _has2.default)('subscriptionId'), findAllInSubscriptions(opts)], [_T2.default, findAllInTransactions(opts)]])(body);
	};
	
	/**
	 * `GET /:model/:model_id/operations/:id/refuse_message`
	 * Returns the refuse message for a gateway operation
	 *
	 * @param {Object} opts An options params which
	 *                      is usually already bound
	 *                      by `connect` functions.
	 *
	 * @param {Object} body The payload for the request.
	 * @param {Number} body.id The operation ID.
	 * @param {Number} [body.subscriptionId] A subscription ID
	*/
	var refuseMessage = function refuseMessage(opts, body) {
	  return _request2.default.get(opts, _routes2.default.gatewayOperations.refuseMessage(body.subscriptionId, body.id), {});
	};
	
	exports.default = {
	  find: find,
	  refuseMessage: refuseMessage
	};
	module.exports = exports['default'];

/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _T = __webpack_require__(152);
	
	var _T2 = _interopRequireDefault(_T);
	
	var _has = __webpack_require__(50);
	
	var _has2 = _interopRequireDefault(_has);
	
	var _both = __webpack_require__(51);
	
	var _both2 = _interopRequireDefault(_both);
	
	var _cond = __webpack_require__(57);
	
	var _cond2 = _interopRequireDefault(_cond);
	
	var _curry = __webpack_require__(154);
	
	var _curry2 = _interopRequireDefault(_curry);
	
	var _routes = __webpack_require__(63);
	
	var _routes2 = _interopRequireDefault(_routes);
	
	var _request = __webpack_require__(64);
	
	var _request2 = _interopRequireDefault(_request);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var findAllInTransactions = (0, _curry2.default)(function (opts, body) {
	  return _request2.default.get(opts, _routes2.default.postbacks.transaction(body.transactionId), {});
	}); /**
	     * @name Postbacks
	     * @description This module exposes functions
	     *              related to postbacks.
	     *
	     * @module postbacks
	     **/
	
	var findOneInTransactions = (0, _curry2.default)(function (opts, body) {
	  return _request2.default.get(opts, _routes2.default.postbacks.transactionDetails(body.id, body.transactionId), {});
	});
	
	var findAllInSubscriptions = (0, _curry2.default)(function (opts, body) {
	  return _request2.default.get(opts, _routes2.default.postbacks.subscription(body.subscriptionId), {});
	});
	
	/**
	 * `GET /:model/:model_id/postbacks`
	 *
	 * @param {Object} opts An options params which
	 *                      is usually already bound
	 *                      by `connect` functions.
	 *
	 * @param {Object} body The payload for the request.
	 * {@link https://pagarme.readme.io/v1/reference#retornando-um-postback|API Reference for this payload}
	 * @param {Number} [body.id] The operation ID. If not sent a
	 * @param {Number} [body.transactionId] A transaction ID to get all
	 *                                      the operations.
	 * @param {Number} [body.subscriptionId] A subscription ID
	*/
	var find = function find(opts, body) {
	  return (0, _cond2.default)([[(0, _both2.default)((0, _has2.default)('transactionId'), (0, _has2.default)('id')), findOneInTransactions(opts)], [(0, _has2.default)('transactionId'), findAllInTransactions(opts)], [(0, _has2.default)('subscriptionId'), findAllInSubscriptions(opts)], [_T2.default, findAllInTransactions(opts)]])(body);
	};
	
	/**
	 * `POST /:model/:model_id/postbacks/:id/redeliver`
	 * Redeliver a POSTback for a model
	 *
	 * @param {Object} opts An options params which
	 *                      is usually already bound
	 *                      by `connect` functions.
	 *
	 * @param {Object} body The payload for the request.
	 * {@link https://pagarme.readme.io/v1/reference#reenviando-um-postback|API Reference for this payload}
	 * @param {Number} body.id The operation ID.
	 * @param {Number} body.subscriptionId A subscription ID
	*/
	var redeliver = function redeliver(opts, body) {
	  return _request2.default.post(opts, _routes2.default.postbacks.redeliver(body.subscriptionId, body.id), {});
	};
	
	exports.default = {
	  find: find,
	  redeliver: redeliver
	};
	module.exports = exports['default'];

/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _replace = __webpack_require__(176);
	
	var _replace2 = _interopRequireDefault(_replace);
	
	var _toString = __webpack_require__(177);
	
	var _toString2 = _interopRequireDefault(_toString);
	
	var _pipe = __webpack_require__(41);
	
	var _pipe2 = _interopRequireDefault(_pipe);
	
	var _nodeRsa = __webpack_require__(189);
	
	var _nodeRsa2 = _interopRequireDefault(_nodeRsa);
	
	var _bluebird = __webpack_require__(67);
	
	var _bluebird2 = _interopRequireDefault(_bluebird);
	
	var _qs = __webpack_require__(142);
	
	var _qs2 = _interopRequireDefault(_qs);
	
	var _postback = __webpack_require__(214);
	
	var _transactions = __webpack_require__(151);
	
	var _transactions2 = _interopRequireDefault(_transactions);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var cleanNumber = (0, _pipe2.default)(_toString2.default, (0, _replace2.default)(/[^0-9]/g, '')); /**
	                                                                                                   * @name Security
	                                                                                                   * @description This module exposes functions
	                                                                                                   *              related to security procedures.
	                                                                                                   *
	                                                                                                   * @module security
	                                                                                                   **/
	
	
	var queryString = function queryString(card) {
	  return _qs2.default.stringify({
	    card_number: cleanNumber(card.card_number),
	    card_holder_name: card.card_holder_name,
	    card_expiration_date: cleanNumber(card.card_expiration_date),
	    card_cvv: cleanNumber(card.card_cvv)
	  });
	};
	
	var generateCardHash = function generateCardHash(_ref, cardString) {
	  var publicKey = _ref.public_key,
	      id = _ref.id;
	
	  var key = new _nodeRsa2.default(publicKey, {
	    encryptionScheme: 'pkcs1'
	  });
	  var encrypted = key.encrypt(cardString, 'base64');
	  var cardHash = id + '_' + encrypted;
	  return cardHash;
	};
	
	/**
	 * Encrypt a card object into a card_hash
	 *
	 * @param {Object} opts An options params which
	 *                      is usually already bound
	 *                      by `connect` functions.
	 *
	 * @param {Object} card The card object.
	 * {@link https://pagarme.readme.io/v1/reference#gerando-card_hash-manualmente|API Reference for this payload}
	 *
	 * @param {String} card.card_number The card's number.
	 *                             Example: '4111111111111111'
	 * @param {String} card.card_holder_name The card's holder name.
	 *                             Example: 'Pedro Paulo'
	 * @param {String} card.card_expiration_date The card's expiration date.
	 *                             Example: '1225' or '12/25'
	 * @param {String} card.card_cvv The card's cvv.
	 *                             Example: '543'
	*/
	var encrypt = function encrypt(opts, card) {
	  return _bluebird2.default.props({
	    key: card.key ? card.key : _transactions2.default.cardHashKey(opts),
	    cardString: queryString(card)
	  }).then(function (_ref2) {
	    var key = _ref2.key,
	        cardString = _ref2.cardString;
	    return generateCardHash(key, cardString);
	  });
	};
	
	/**
	 * Generates a hash signed with your api_key.
	 * This is used mainly to validate postbacks,
	 * this functions is the same as pagarme.postback.calculatesignature
	 * but it already knows your api_key.
	 *
	 * @param {Object} opts An options params which
	 *                      is usually already bound
	 *                      by `connect` functions.
	 *
	 * @param {String} string The string to be hashed.
	 *
	*/
	var sign = function sign(opts, string) {
	  return (0, _postback.calculateSignature)(opts.body.api_key, string);
	};
	
	/**
	 * Verifies a hash signed with your api_key.
	 * This is used mainly to validate postbacks,
	 * this functions is the same as pagarme.postback.validateSignature
	 * but it already knows your api_key.
	 *
	 * @param {Object} opts An options params which
	 *                      is usually already bound
	 *                      by `connect` functions.
	 *
	 * @param {String} string The string to be hashed.
	 *
	 * @param {String} expected The expected result.
	 *
	*/
	var verify = function verify(opts, string, expected) {
	  return (0, _postback.verifySignature)(opts.body.api_key, string, expected);
	};
	
	exports.default = {
	  encrypt: encrypt,
	  sign: sign,
	  verify: verify
	};
	module.exports = exports['default'];

/***/ },
/* 176 */
/***/ function(module, exports, __webpack_require__) {

	var _curry3 = __webpack_require__(31);
	
	
	/**
	 * Replace a substring or regex match in a string with a replacement.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.7.0
	 * @category String
	 * @sig RegExp|String -> String -> String -> String
	 * @param {RegExp|String} pattern A regular expression or a substring to match.
	 * @param {String} replacement The string to replace the matches with.
	 * @param {String} str The String to do the search and replacement in.
	 * @return {String} The result.
	 * @example
	 *
	 *      R.replace('foo', 'bar', 'foo foo foo'); //=> 'bar foo foo'
	 *      R.replace(/foo/, 'bar', 'foo foo foo'); //=> 'bar foo foo'
	 *
	 *      // Use the "g" (global) flag to replace all occurrences:
	 *      R.replace(/foo/g, 'bar', 'foo foo foo'); //=> 'bar bar bar'
	 */
	module.exports = _curry3(function replace(regex, replacement, str) {
	  return str.replace(regex, replacement);
	});


/***/ },
/* 177 */
/***/ function(module, exports, __webpack_require__) {

	var _curry1 = __webpack_require__(7);
	var _toString = __webpack_require__(178);
	
	
	/**
	 * Returns the string representation of the given value. `eval`'ing the output
	 * should result in a value equivalent to the input value. Many of the built-in
	 * `toString` methods do not satisfy this requirement.
	 *
	 * If the given value is an `[object Object]` with a `toString` method other
	 * than `Object.prototype.toString`, this method is invoked with no arguments
	 * to produce the return value. This means user-defined constructor functions
	 * can provide a suitable `toString` method. For example:
	 *
	 *     function Point(x, y) {
	 *       this.x = x;
	 *       this.y = y;
	 *     }
	 *
	 *     Point.prototype.toString = function() {
	 *       return 'new Point(' + this.x + ', ' + this.y + ')';
	 *     };
	 *
	 *     R.toString(new Point(1, 2)); //=> 'new Point(1, 2)'
	 *
	 * @func
	 * @memberOf R
	 * @since v0.14.0
	 * @category String
	 * @sig * -> String
	 * @param {*} val
	 * @return {String}
	 * @example
	 *
	 *      R.toString(42); //=> '42'
	 *      R.toString('abc'); //=> '"abc"'
	 *      R.toString([1, 2, 3]); //=> '[1, 2, 3]'
	 *      R.toString({foo: 1, bar: 2, baz: 3}); //=> '{"bar": 2, "baz": 3, "foo": 1}'
	 *      R.toString(new Date('2001-02-03T04:05:06Z')); //=> 'new Date("2001-02-03T04:05:06.000Z")'
	 */
	module.exports = _curry1(function toString(val) { return _toString(val, []); });


/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	var _contains = __webpack_require__(179);
	var _map = __webpack_require__(14);
	var _quote = __webpack_require__(181);
	var _toISOString = __webpack_require__(182);
	var keys = __webpack_require__(25);
	var reject = __webpack_require__(183);
	
	
	module.exports = function _toString(x, seen) {
	  var recur = function recur(y) {
	    var xs = seen.concat([x]);
	    return _contains(y, xs) ? '<Circular>' : _toString(y, xs);
	  };
	
	  //  mapPairs :: (Object, [String]) -> [String]
	  var mapPairs = function(obj, keys) {
	    return _map(function(k) { return _quote(k) + ': ' + recur(obj[k]); }, keys.slice().sort());
	  };
	
	  switch (Object.prototype.toString.call(x)) {
	    case '[object Arguments]':
	      return '(function() { return arguments; }(' + _map(recur, x).join(', ') + '))';
	    case '[object Array]':
	      return '[' + _map(recur, x).concat(mapPairs(x, reject(function(k) { return /^\d+$/.test(k); }, keys(x)))).join(', ') + ']';
	    case '[object Boolean]':
	      return typeof x === 'object' ? 'new Boolean(' + recur(x.valueOf()) + ')' : x.toString();
	    case '[object Date]':
	      return 'new Date(' + (isNaN(x.valueOf()) ? recur(NaN) : _quote(_toISOString(x))) + ')';
	    case '[object Null]':
	      return 'null';
	    case '[object Number]':
	      return typeof x === 'object' ? 'new Number(' + recur(x.valueOf()) + ')' : 1 / x === -Infinity ? '-0' : x.toString(10);
	    case '[object String]':
	      return typeof x === 'object' ? 'new String(' + recur(x.valueOf()) + ')' : _quote(x);
	    case '[object Undefined]':
	      return 'undefined';
	    default:
	      if (typeof x.toString === 'function') {
	        var repr = x.toString();
	        if (repr !== '[object Object]') {
	          return repr;
	        }
	      }
	      return '{' + mapPairs(x, keys(x)).join(', ') + '}';
	  }
	};


/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

	var _indexOf = __webpack_require__(180);
	
	
	module.exports = function _contains(a, list) {
	  return _indexOf(list, a, 0) >= 0;
	};


/***/ },
/* 180 */
/***/ function(module, exports, __webpack_require__) {

	var equals = __webpack_require__(32);
	
	
	module.exports = function _indexOf(list, a, idx) {
	  var inf, item;
	  // Array.prototype.indexOf doesn't exist below IE9
	  if (typeof list.indexOf === 'function') {
	    switch (typeof a) {
	      case 'number':
	        if (a === 0) {
	          // manually crawl the list to distinguish between +0 and -0
	          inf = 1 / a;
	          while (idx < list.length) {
	            item = list[idx];
	            if (item === 0 && 1 / item === inf) {
	              return idx;
	            }
	            idx += 1;
	          }
	          return -1;
	        } else if (a !== a) {
	          // NaN
	          while (idx < list.length) {
	            item = list[idx];
	            if (typeof item === 'number' && item !== item) {
	              return idx;
	            }
	            idx += 1;
	          }
	          return -1;
	        }
	        // non-zero numbers can utilise Set
	        return list.indexOf(a, idx);
	
	      // all these types can utilise Set
	      case 'string':
	      case 'boolean':
	      case 'function':
	      case 'undefined':
	        return list.indexOf(a, idx);
	
	      case 'object':
	        if (a === null) {
	          // null can utilise Set
	          return list.indexOf(a, idx);
	        }
	    }
	  }
	  // anything else not covered above, defer to R.equals
	  while (idx < list.length) {
	    if (equals(list[idx], a)) {
	      return idx;
	    }
	    idx += 1;
	  }
	  return -1;
	};


/***/ },
/* 181 */
/***/ function(module, exports) {

	module.exports = function _quote(s) {
	  var escaped = s
	    .replace(/\\/g, '\\\\')
	    .replace(/[\b]/g, '\\b')  // \b matches word boundary; [\b] matches backspace
	    .replace(/\f/g, '\\f')
	    .replace(/\n/g, '\\n')
	    .replace(/\r/g, '\\r')
	    .replace(/\t/g, '\\t')
	    .replace(/\v/g, '\\v')
	    .replace(/\0/g, '\\0');
	
	  return '"' + escaped.replace(/"/g, '\\"') + '"';
	};


/***/ },
/* 182 */
/***/ function(module, exports) {

	/**
	 * Polyfill from <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString>.
	 */
	module.exports = (function() {
	  var pad = function pad(n) { return (n < 10 ? '0' : '') + n; };
	
	  return typeof Date.prototype.toISOString === 'function' ?
	    function _toISOString(d) {
	      return d.toISOString();
	    } :
	    function _toISOString(d) {
	      return (
	        d.getUTCFullYear() + '-' +
	        pad(d.getUTCMonth() + 1) + '-' +
	        pad(d.getUTCDate()) + 'T' +
	        pad(d.getUTCHours()) + ':' +
	        pad(d.getUTCMinutes()) + ':' +
	        pad(d.getUTCSeconds()) + '.' +
	        (d.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5) + 'Z'
	      );
	    };
	}());


/***/ },
/* 183 */
/***/ function(module, exports, __webpack_require__) {

	var _complement = __webpack_require__(184);
	var _curry2 = __webpack_require__(6);
	var filter = __webpack_require__(185);
	
	
	/**
	 * The complement of `filter`.
	 *
	 * Acts as a transducer if a transformer is given in list position.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.1.0
	 * @category List
	 * @sig Filterable f => (a -> Boolean) -> f a -> f a
	 * @param {Function} pred
	 * @param {Array} filterable
	 * @return {Array}
	 * @see R.filter, R.transduce, R.addIndex
	 * @example
	 *
	 *      var isOdd = (n) => n % 2 === 1;
	 *
	 *      R.reject(isOdd, [1, 2, 3, 4]); //=> [2, 4]
	 *
	 *      R.reject(isOdd, {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, d: 4}
	 */
	module.exports = _curry2(function reject(pred, filterable) {
	  return filter(_complement(pred), filterable);
	});


/***/ },
/* 184 */
/***/ function(module, exports) {

	module.exports = function _complement(f) {
	  return function() {
	    return !f.apply(this, arguments);
	  };
	};


/***/ },
/* 185 */
/***/ function(module, exports, __webpack_require__) {

	var _curry2 = __webpack_require__(6);
	var _dispatchable = __webpack_require__(10);
	var _filter = __webpack_require__(186);
	var _isObject = __webpack_require__(187);
	var _reduce = __webpack_require__(15);
	var _xfilter = __webpack_require__(188);
	var keys = __webpack_require__(25);
	
	
	/**
	 * Takes a predicate and a "filterable", and returns a new filterable of the
	 * same type containing the members of the given filterable which satisfy the
	 * given predicate.
	 *
	 * Dispatches to the `filter` method of the second argument, if present.
	 *
	 * Acts as a transducer if a transformer is given in list position.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.1.0
	 * @category List
	 * @sig Filterable f => (a -> Boolean) -> f a -> f a
	 * @param {Function} pred
	 * @param {Array} filterable
	 * @return {Array}
	 * @see R.reject, R.transduce, R.addIndex
	 * @example
	 *
	 *      var isEven = n => n % 2 === 0;
	 *
	 *      R.filter(isEven, [1, 2, 3, 4]); //=> [2, 4]
	 *
	 *      R.filter(isEven, {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, d: 4}
	 */
	module.exports = _curry2(_dispatchable('filter', _xfilter, function(pred, filterable) {
	  return (
	    _isObject(filterable) ?
	      _reduce(function(acc, key) {
	        if (pred(filterable[key])) {
	          acc[key] = filterable[key];
	        }
	        return acc;
	      }, {}, keys(filterable)) :
	    // else
	      _filter(pred, filterable)
	  );
	}));


/***/ },
/* 186 */
/***/ function(module, exports) {

	module.exports = function _filter(fn, list) {
	  var idx = 0;
	  var len = list.length;
	  var result = [];
	
	  while (idx < len) {
	    if (fn(list[idx])) {
	      result[result.length] = list[idx];
	    }
	    idx += 1;
	  }
	  return result;
	};


/***/ },
/* 187 */
/***/ function(module, exports) {

	module.exports = function _isObject(x) {
	  return Object.prototype.toString.call(x) === '[object Object]';
	};


/***/ },
/* 188 */
/***/ function(module, exports, __webpack_require__) {

	var _curry2 = __webpack_require__(6);
	var _xfBase = __webpack_require__(22);
	
	
	module.exports = (function() {
	  function XFilter(f, xf) {
	    this.xf = xf;
	    this.f = f;
	  }
	  XFilter.prototype['@@transducer/init'] = _xfBase.init;
	  XFilter.prototype['@@transducer/result'] = _xfBase.result;
	  XFilter.prototype['@@transducer/step'] = function(result, input) {
	    return this.f(input) ? this.xf['@@transducer/step'](result, input) : result;
	  };
	
	  return _curry2(function _xfilter(f, xf) { return new XFilter(f, xf); });
	}());


/***/ },
/* 189 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * RSA library for Node.js
	 *
	 * Copyright (c) 2014 rzcoder
	 * All Rights Reserved.
	 *
	 * License BSD
	 */
	
	var constants = __webpack_require__(190);
	var rsa = __webpack_require__(191);
	var crypt = __webpack_require__(193);
	var ber = __webpack_require__(203).Ber;
	var _ = __webpack_require__(192)._;
	var utils = __webpack_require__(192);
	var schemes = __webpack_require__(195);
	var formats = __webpack_require__(210);
	
	if (typeof constants.RSA_NO_PADDING == "undefined") {
	    //patch for node v0.10.x, constants do not defined
	    constants.RSA_NO_PADDING = 3;
	}
	
	module.exports = (function () {
	    var SUPPORTED_HASH_ALGORITHMS = {
	        node10: ['md4', 'md5', 'ripemd160', 'sha', 'sha1', 'sha224', 'sha256', 'sha384', 'sha512'],
	        node: ['md4', 'md5', 'ripemd160', 'sha', 'sha1', 'sha224', 'sha256', 'sha384', 'sha512'],
	        iojs: ['md4', 'md5', 'ripemd160', 'sha', 'sha1', 'sha224', 'sha256', 'sha384', 'sha512'],
	        browser: ['md5', 'ripemd160', 'sha1', 'sha256', 'sha512']
	    };
	
	    var DEFAULT_ENCRYPTION_SCHEME = 'pkcs1_oaep';
	    var DEFAULT_SIGNING_SCHEME = 'pkcs1';
	
	    var DEFAULT_EXPORT_FORMAT = 'private';
	    var EXPORT_FORMAT_ALIASES = {
	        'private': 'pkcs1-private-pem',
	        'private-der': 'pkcs1-private-der',
	        'public': 'pkcs8-public-pem',
	        'public-der': 'pkcs8-public-der',
	    };
	
	    /**
	     * @param key {string|buffer|object} Key in PEM format, or data for generate key {b: bits, e: exponent}
	     * @constructor
	     */
	    function NodeRSA(key, format, options) {
	        if (!(this instanceof NodeRSA)) {
	            return new NodeRSA(key, format, options);
	        }
	
	        if (_.isObject(format)) {
	            options = format;
	            format = undefined;
	        }
	
	        this.$options = {
	            signingScheme: DEFAULT_SIGNING_SCHEME,
	            signingSchemeOptions: {
	                hash: 'sha256',
	                saltLength: null
	            },
	            encryptionScheme: DEFAULT_ENCRYPTION_SCHEME,
	            encryptionSchemeOptions: {
	                hash: 'sha1',
	                label: null
	            },
	            environment: utils.detectEnvironment(),
	            rsaUtils: this
	        };
	        this.keyPair = new rsa.Key();
	        this.$cache = {};
	
	        if (Buffer.isBuffer(key) || _.isString(key)) {
	            this.importKey(key, format);
	        } else if (_.isObject(key)) {
	            this.generateKeyPair(key.b, key.e);
	        }
	
	        this.setOptions(options);
	    }
	
	    /**
	     * Set and validate options for key instance
	     * @param options
	     */
	    NodeRSA.prototype.setOptions = function (options) {
	        options = options || {};
	        if (options.environment) {
	            this.$options.environment = options.environment;
	        }
	
	        if (options.signingScheme) {
	            if (_.isString(options.signingScheme)) {
	                var signingScheme = options.signingScheme.toLowerCase().split('-');
	                if (signingScheme.length == 1) {
	                    if (SUPPORTED_HASH_ALGORITHMS.node.indexOf(signingScheme[0]) > -1) {
	                        this.$options.signingSchemeOptions = {
	                            hash: signingScheme[0]
	                        };
	                        this.$options.signingScheme = DEFAULT_SIGNING_SCHEME;
	                    } else {
	                        this.$options.signingScheme = signingScheme[0];
	                        this.$options.signingSchemeOptions = {
	                            hash: null
	                        };
	                    }
	                } else {
	                    this.$options.signingSchemeOptions = {
	                        hash: signingScheme[1]
	                    };
	                    this.$options.signingScheme = signingScheme[0];
	                }
	            } else if (_.isObject(options.signingScheme)) {
	                this.$options.signingScheme = options.signingScheme.scheme || DEFAULT_SIGNING_SCHEME;
	                this.$options.signingSchemeOptions = _.omit(options.signingScheme, 'scheme');
	            }
	
	            if (!schemes.isSignature(this.$options.signingScheme)) {
	                throw Error('Unsupported signing scheme');
	            }
	
	            if (this.$options.signingSchemeOptions.hash &&
	                SUPPORTED_HASH_ALGORITHMS[this.$options.environment].indexOf(this.$options.signingSchemeOptions.hash) === -1) {
	                throw Error('Unsupported hashing algorithm for ' + this.$options.environment + ' environment');
	            }
	        }
	
	        if (options.encryptionScheme) {
	            if (_.isString(options.encryptionScheme)) {
	                this.$options.encryptionScheme = options.encryptionScheme.toLowerCase();
	                this.$options.encryptionSchemeOptions = {};
	            } else if (_.isObject(options.encryptionScheme)) {
	                this.$options.encryptionScheme = options.encryptionScheme.scheme || DEFAULT_ENCRYPTION_SCHEME;
	                this.$options.encryptionSchemeOptions = _.omit(options.encryptionScheme, 'scheme');
	            }
	
	            if (!schemes.isEncryption(this.$options.encryptionScheme)) {
	                throw Error('Unsupported encryption scheme');
	            }
	
	            if (this.$options.encryptionSchemeOptions.hash &&
	                SUPPORTED_HASH_ALGORITHMS[this.$options.environment].indexOf(this.$options.encryptionSchemeOptions.hash) === -1) {
	                throw Error('Unsupported hashing algorithm for ' + this.$options.environment + ' environment');
	            }
	        }
	
	        this.keyPair.setOptions(this.$options);
	    };
	
	    /**
	     * Generate private/public keys pair
	     *
	     * @param bits {int} length key in bits. Default 2048.
	     * @param exp {int} public exponent. Default 65537.
	     * @returns {NodeRSA}
	     */
	    NodeRSA.prototype.generateKeyPair = function (bits, exp) {
	        bits = bits || 2048;
	        exp = exp || 65537;
	
	        if (bits % 8 !== 0) {
	            throw Error('Key size must be a multiple of 8.');
	        }
	
	        this.keyPair.generate(bits, exp.toString(16));
	        this.$cache = {};
	        return this;
	    };
	
	    /**
	     * Importing key
	     * @param keyData {string|buffer|Object}
	     * @param format {string}
	     */
	    NodeRSA.prototype.importKey = function (keyData, format) {
	        if (!keyData) {
	            throw Error("Empty key given");
	        }
	
	        if (format) {
	            format = EXPORT_FORMAT_ALIASES[format] || format;
	        }
	
	        if (!formats.detectAndImport(this.keyPair, keyData, format) && format === undefined) {
	            throw Error("Key format must be specified");
	        }
	
	        this.$cache = {};
	    };
	
	    /**
	     * Exporting key
	     * @param [format] {string}
	     */
	    NodeRSA.prototype.exportKey = function (format) {
	        format = format || DEFAULT_EXPORT_FORMAT;
	        format = EXPORT_FORMAT_ALIASES[format] || format;
	
	        if (!this.$cache[format]) {
	            this.$cache[format] = formats.detectAndExport(this.keyPair, format);
	        }
	
	        return this.$cache[format];
	    };
	
	    /**
	     * Check if key pair contains private key
	     */
	    NodeRSA.prototype.isPrivate = function () {
	        return this.keyPair.isPrivate();
	    };
	
	    /**
	     * Check if key pair contains public key
	     * @param [strict] {boolean} - public key only, return false if have private exponent
	     */
	    NodeRSA.prototype.isPublic = function (strict) {
	        return this.keyPair.isPublic(strict);
	    };
	
	    /**
	     * Check if key pair doesn't contains any data
	     */
	    NodeRSA.prototype.isEmpty = function (strict) {
	        return !(this.keyPair.n || this.keyPair.e || this.keyPair.d);
	    };
	
	    /**
	     * Encrypting data method with public key
	     *
	     * @param buffer {string|number|object|array|Buffer} - data for encrypting. Object and array will convert to JSON string.
	     * @param encoding {string} - optional. Encoding for output result, may be 'buffer', 'binary', 'hex' or 'base64'. Default 'buffer'.
	     * @param source_encoding {string} - optional. Encoding for given string. Default utf8.
	     * @returns {string|Buffer}
	     */
	    NodeRSA.prototype.encrypt = function (buffer, encoding, source_encoding) {
	        return this.$$encryptKey(false, buffer, encoding, source_encoding);
	    };
	
	    /**
	     * Decrypting data method with private key
	     *
	     * @param buffer {Buffer} - buffer for decrypting
	     * @param encoding - encoding for result string, can also take 'json' or 'buffer' for the automatic conversion of this type
	     * @returns {Buffer|object|string}
	     */
	    NodeRSA.prototype.decrypt = function (buffer, encoding) {
	        return this.$$decryptKey(false, buffer, encoding);
	    };
	
	    /**
	     * Encrypting data method with private key
	     *
	     * Parameters same as `encrypt` method
	     */
	    NodeRSA.prototype.encryptPrivate = function (buffer, encoding, source_encoding) {
	        return this.$$encryptKey(true, buffer, encoding, source_encoding);
	    };
	
	    /**
	     * Decrypting data method with public key
	     *
	     * Parameters same as `decrypt` method
	     */
	    NodeRSA.prototype.decryptPublic = function (buffer, encoding) {
	        return this.$$decryptKey(true, buffer, encoding);
	    };
	
	    /**
	     * Encrypting data method with custom key
	     */
	    NodeRSA.prototype.$$encryptKey = function (usePrivate, buffer, encoding, source_encoding) {
	        try {
	            var res = this.keyPair.encrypt(this.$getDataForEncrypt(buffer, source_encoding), usePrivate);
	
	            if (encoding == 'buffer' || !encoding) {
	                return res;
	            } else {
	                return res.toString(encoding);
	            }
	        } catch (e) {
	            throw Error('Error during encryption. Original error: ' + e);
	        }
	    };
	
	    /**
	     * Decrypting data method with custom key
	     */
	    NodeRSA.prototype.$$decryptKey = function (usePublic, buffer, encoding) {
	        try {
	            buffer = _.isString(buffer) ? new Buffer(buffer, 'base64') : buffer;
	            var res = this.keyPair.decrypt(buffer, usePublic);
	
	            if (res === null) {
	                throw Error('Key decrypt method returns null.');
	            }
	
	            return this.$getDecryptedData(res, encoding);
	        } catch (e) {
	            throw Error('Error during decryption (probably incorrect key). Original error: ' + e);
	        }
	    };
	
	    /**
	     *  Signing data
	     *
	     * @param buffer {string|number|object|array|Buffer} - data for signing. Object and array will convert to JSON string.
	     * @param encoding {string} - optional. Encoding for output result, may be 'buffer', 'binary', 'hex' or 'base64'. Default 'buffer'.
	     * @param source_encoding {string} - optional. Encoding for given string. Default utf8.
	     * @returns {string|Buffer}
	     */
	    NodeRSA.prototype.sign = function (buffer, encoding, source_encoding) {
	        if (!this.isPrivate()) {
	            throw Error("This is not private key");
	        }
	
	        var res = this.keyPair.sign(this.$getDataForEncrypt(buffer, source_encoding));
	
	        if (encoding && encoding != 'buffer') {
	            res = res.toString(encoding);
	        }
	
	        return res;
	    };
	
	    /**
	     *  Verifying signed data
	     *
	     * @param buffer - signed data
	     * @param signature
	     * @param source_encoding {string} - optional. Encoding for given string. Default utf8.
	     * @param signature_encoding - optional. Encoding of given signature. May be 'buffer', 'binary', 'hex' or 'base64'. Default 'buffer'.
	     * @returns {*}
	     */
	    NodeRSA.prototype.verify = function (buffer, signature, source_encoding, signature_encoding) {
	        if (!this.isPublic()) {
	            throw Error("This is not public key");
	        }
	        signature_encoding = (!signature_encoding || signature_encoding == 'buffer' ? null : signature_encoding);
	        return this.keyPair.verify(this.$getDataForEncrypt(buffer, source_encoding), signature, signature_encoding);
	    };
	
	    /**
	     * Returns key size in bits
	     * @returns {int}
	     */
	    NodeRSA.prototype.getKeySize = function () {
	        return this.keyPair.keySize;
	    };
	
	    /**
	     * Returns max message length in bytes (for 1 chunk) depending on current encryption scheme
	     * @returns {int}
	     */
	    NodeRSA.prototype.getMaxMessageSize = function () {
	        return this.keyPair.maxMessageLength;
	    };
	
	    /**
	     * Preparing given data for encrypting/signing. Just make new/return Buffer object.
	     *
	     * @param buffer {string|number|object|array|Buffer} - data for encrypting. Object and array will convert to JSON string.
	     * @param encoding {string} - optional. Encoding for given string. Default utf8.
	     * @returns {Buffer}
	     */
	    NodeRSA.prototype.$getDataForEncrypt = function (buffer, encoding) {
	        if (_.isString(buffer) || _.isNumber(buffer)) {
	            return new Buffer('' + buffer, encoding || 'utf8');
	        } else if (Buffer.isBuffer(buffer)) {
	            return buffer;
	        } else if (_.isObject(buffer)) {
	            return new Buffer(JSON.stringify(buffer));
	        } else {
	            throw Error("Unexpected data type");
	        }
	    };
	
	    /**
	     *
	     * @param buffer {Buffer} - decrypted data.
	     * @param encoding - optional. Encoding for result output. May be 'buffer', 'json' or any of Node.js Buffer supported encoding.
	     * @returns {*}
	     */
	    NodeRSA.prototype.$getDecryptedData = function (buffer, encoding) {
	        encoding = encoding || 'buffer';
	
	        if (encoding == 'buffer') {
	            return buffer;
	        } else if (encoding == 'json') {
	            return JSON.parse(buffer.toString());
	        } else {
	            return buffer.toString(encoding);
	        }
	    };
	
	    return NodeRSA;
	})();


/***/ },
/* 190 */
/***/ function(module, exports) {

	module.exports = require("constants");

/***/ },
/* 191 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * RSA Encryption / Decryption with PKCS1 v2 Padding.
	 * 
	 * Copyright (c) 2003-2005  Tom Wu
	 * All Rights Reserved.
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining
	 * a copy of this software and associated documentation files (the
	 * "Software"), to deal in the Software without restriction, including
	 * without limitation the rights to use, copy, modify, merge, publish,
	 * distribute, sublicense, and/or sell copies of the Software, and to
	 * permit persons to whom the Software is furnished to do so, subject to
	 * the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be
	 * included in all copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS-IS" AND WITHOUT WARRANTY OF ANY KIND, 
	 * EXPRESS, IMPLIED OR OTHERWISE, INCLUDING WITHOUT LIMITATION, ANY 
	 * WARRANTY OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE.  
	 *
	 * IN NO EVENT SHALL TOM WU BE LIABLE FOR ANY SPECIAL, INCIDENTAL,
	 * INDIRECT OR CONSEQUENTIAL DAMAGES OF ANY KIND, OR ANY DAMAGES WHATSOEVER
	 * RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER OR NOT ADVISED OF
	 * THE POSSIBILITY OF DAMAGE, AND ON ANY THEORY OF LIABILITY, ARISING OUT
	 * OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
	 *
	 * In addition, the following condition applies:
	 *
	 * All redistributions must retain an intact copy of this copyright notice
	 * and disclaimer.
	 */
	
	/*
	 * Node.js adaptation
	 * long message support implementation
	 * signing/verifying
	 *
	 * 2014 rzcoder
	 */
	
	var _ = __webpack_require__(192)._;
	var crypt = __webpack_require__(193);
	var BigInteger = __webpack_require__(194);
	var utils = __webpack_require__(192);
	var schemes = __webpack_require__(195);
	var encryptEngines = __webpack_require__(199);
	
	exports.BigInteger = BigInteger;
	module.exports.Key = (function () {
	    /**
	     * RSA key constructor
	     *
	     * n - modulus
	     * e - publicExponent
	     * d - privateExponent
	     * p - prime1
	     * q - prime2
	     * dmp1 - exponent1 -- d mod (p1)
	     * dmq1 - exponent2 -- d mod (q-1)
	     * coeff - coefficient -- (inverse of q) mod p
	     */
	    function RSAKey() {
	        this.n = null;
	        this.e = 0;
	        this.d = null;
	        this.p = null;
	        this.q = null;
	        this.dmp1 = null;
	        this.dmq1 = null;
	        this.coeff = null;
	    }
	
	    RSAKey.prototype.setOptions = function (options) {
	        var signingSchemeProvider = schemes[options.signingScheme];
	        var encryptionSchemeProvider = schemes[options.encryptionScheme];
	
	        if (signingSchemeProvider === encryptionSchemeProvider) {
	            this.signingScheme = this.encryptionScheme = encryptionSchemeProvider.makeScheme(this, options);
	        } else {
	            this.encryptionScheme = encryptionSchemeProvider.makeScheme(this, options);
	            this.signingScheme = signingSchemeProvider.makeScheme(this, options);
	        }
	
	        this.encryptEngine = encryptEngines.getEngine(this, options);
	    };
	
	    /**
	     * Generate a new random private key B bits long, using public expt E
	     * @param B
	     * @param E
	     */
	    RSAKey.prototype.generate = function (B, E) {
	        var qs = B >> 1;
	        this.e = parseInt(E, 16);
	        var ee = new BigInteger(E, 16);
	        while (true) {
	            while (true) {
	                this.p = new BigInteger(B - qs, 1);
	                if (this.p.subtract(BigInteger.ONE).gcd(ee).compareTo(BigInteger.ONE) === 0 && this.p.isProbablePrime(10))
	                    break;
	            }
	            while (true) {
	                this.q = new BigInteger(qs, 1);
	                if (this.q.subtract(BigInteger.ONE).gcd(ee).compareTo(BigInteger.ONE) === 0 && this.q.isProbablePrime(10))
	                    break;
	            }
	            if (this.p.compareTo(this.q) <= 0) {
	                var t = this.p;
	                this.p = this.q;
	                this.q = t;
	            }
	            var p1 = this.p.subtract(BigInteger.ONE);
	            var q1 = this.q.subtract(BigInteger.ONE);
	            var phi = p1.multiply(q1);
	            if (phi.gcd(ee).compareTo(BigInteger.ONE) === 0) {
	                this.n = this.p.multiply(this.q);
	                if (this.n.bitLength() < B) {
	                    continue;
	                }
	                this.d = ee.modInverse(phi);
	                this.dmp1 = this.d.mod(p1);
	                this.dmq1 = this.d.mod(q1);
	                this.coeff = this.q.modInverse(this.p);
	                break;
	            }
	        }
	        this.$$recalculateCache();
	    };
	
	    /**
	     * Set the private key fields N, e, d and CRT params from buffers
	     *
	     * @param N
	     * @param E
	     * @param D
	     * @param P
	     * @param Q
	     * @param DP
	     * @param DQ
	     * @param C
	     */
	    RSAKey.prototype.setPrivate = function (N, E, D, P, Q, DP, DQ, C) {
	        if (N && E && D && N.length > 0 && (_.isNumber(E) || E.length > 0) && D.length > 0) {
	            this.n = new BigInteger(N);
	            this.e = _.isNumber(E) ? E : utils.get32IntFromBuffer(E, 0);
	            this.d = new BigInteger(D);
	
	            if (P && Q && DP && DQ && C) {
	                this.p = new BigInteger(P);
	                this.q = new BigInteger(Q);
	                this.dmp1 = new BigInteger(DP);
	                this.dmq1 = new BigInteger(DQ);
	                this.coeff = new BigInteger(C);
	            } else {
	                // TODO: re-calculate any missing CRT params
	            }
	            this.$$recalculateCache();
	        } else {
	            throw Error("Invalid RSA private key");
	        }
	    };
	
	    /**
	     * Set the public key fields N and e from hex strings
	     * @param N
	     * @param E
	     */
	    RSAKey.prototype.setPublic = function (N, E) {
	        if (N && E && N.length > 0 && (_.isNumber(E) || E.length > 0)) {
	            this.n = new BigInteger(N);
	            this.e = _.isNumber(E) ? E : utils.get32IntFromBuffer(E, 0);
	            this.$$recalculateCache();
	        } else {
	            throw Error("Invalid RSA public key");
	        }
	    };
	
	    /**
	     * private
	     * Perform raw private operation on "x": return x^d (mod n)
	     *
	     * @param x
	     * @returns {*}
	     */
	    RSAKey.prototype.$doPrivate = function (x) {
	        if (this.p || this.q) {
	            return x.modPow(this.d, this.n);
	        }
	
	        // TODO: re-calculate any missing CRT params
	        var xp = x.mod(this.p).modPow(this.dmp1, this.p);
	        var xq = x.mod(this.q).modPow(this.dmq1, this.q);
	
	        while (xp.compareTo(xq) < 0) {
	            xp = xp.add(this.p);
	        }
	        return xp.subtract(xq).multiply(this.coeff).mod(this.p).multiply(this.q).add(xq);
	    };
	
	    /**
	     * private
	     * Perform raw public operation on "x": return x^e (mod n)
	     *
	     * @param x
	     * @returns {*}
	     */
	    RSAKey.prototype.$doPublic = function (x) {
	        return x.modPowInt(this.e, this.n);
	    };
	
	    /**
	     * Return the PKCS#1 RSA encryption of buffer
	     * @param buffer {Buffer}
	     * @returns {Buffer}
	     */
	    RSAKey.prototype.encrypt = function (buffer, usePrivate) {
	        var buffers = [];
	        var results = [];
	        var bufferSize = buffer.length;
	        var buffersCount = Math.ceil(bufferSize / this.maxMessageLength) || 1; // total buffers count for encrypt
	        var dividedSize = Math.ceil(bufferSize / buffersCount || 1); // each buffer size
	
	        if (buffersCount == 1) {
	            buffers.push(buffer);
	        } else {
	            for (var bufNum = 0; bufNum < buffersCount; bufNum++) {
	                buffers.push(buffer.slice(bufNum * dividedSize, (bufNum + 1) * dividedSize));
	            }
	        }
	
	        for (var i = 0; i < buffers.length; i++) {
	            results.push(this.encryptEngine.encrypt(buffers[i], usePrivate));
	        }
	
	        return Buffer.concat(results);
	    };
	
	    /**
	     * Return the PKCS#1 RSA decryption of buffer
	     * @param buffer {Buffer}
	     * @returns {Buffer}
	     */
	    RSAKey.prototype.decrypt = function (buffer, usePublic) {
	        if (buffer.length % this.encryptedDataLength > 0) {
	            throw Error('Incorrect data or key');
	        }
	
	        var result = [];
	        var offset = 0;
	        var length = 0;
	        var buffersCount = buffer.length / this.encryptedDataLength;
	
	        for (var i = 0; i < buffersCount; i++) {
	            offset = i * this.encryptedDataLength;
	            length = offset + this.encryptedDataLength;
	            result.push(this.encryptEngine.decrypt(buffer.slice(offset, Math.min(length, buffer.length)), usePublic));
	        }
	
	        return Buffer.concat(result);
	    };
	
	    RSAKey.prototype.sign = function (buffer) {
	        return this.signingScheme.sign.apply(this.signingScheme, arguments);
	    };
	
	    RSAKey.prototype.verify = function (buffer, signature, signature_encoding) {
	        return this.signingScheme.verify.apply(this.signingScheme, arguments);
	    };
	
	    /**
	     * Check if key pair contains private key
	     */
	    RSAKey.prototype.isPrivate = function () {
	        return this.n && this.e && this.d || false;
	    };
	
	    /**
	     * Check if key pair contains public key
	     * @param strict {boolean} - public key only, return false if have private exponent
	     */
	    RSAKey.prototype.isPublic = function (strict) {
	        return this.n && this.e && !(strict && this.d) || false;
	    };
	
	    Object.defineProperty(RSAKey.prototype, 'keySize', {
	        get: function () {
	            return this.cache.keyBitLength;
	        }
	    });
	
	    Object.defineProperty(RSAKey.prototype, 'encryptedDataLength', {
	        get: function () {
	            return this.cache.keyByteLength;
	        }
	    });
	
	    Object.defineProperty(RSAKey.prototype, 'maxMessageLength', {
	        get: function () {
	            return this.encryptionScheme.maxMessageLength();
	        }
	    });
	
	    /**
	     * Caching key data
	     */
	    RSAKey.prototype.$$recalculateCache = function () {
	        this.cache = this.cache || {};
	        // Bit & byte length
	        this.cache.keyBitLength = this.n.bitLength();
	        this.cache.keyByteLength = (this.cache.keyBitLength + 6) >> 3;
	    };
	
	    return RSAKey;
	})();
	


/***/ },
/* 192 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Utils functions
	 *
	 */
	
	var crypt = __webpack_require__(193);
	
	/**
	 * Break string str each maxLen symbols
	 * @param str
	 * @param maxLen
	 * @returns {string}
	 */
	module.exports.linebrk = function (str, maxLen) {
	    var res = '';
	    var i = 0;
	    while (i + maxLen < str.length) {
	        res += str.substring(i, i + maxLen) + "\n";
	        i += maxLen;
	    }
	    return res + str.substring(i, str.length);
	};
	
	module.exports.detectEnvironment = function () {
	    if (process && process.title === 'browser' || (typeof(window) !== 'undefined' && window)) {
	        return 'browser';
	    }
	
	    return 'node';
	};
	
	/**
	 * Trying get a 32-bit unsigned integer from the partial buffer
	 * @param buffer
	 * @param offset
	 * @returns {Number}
	 */
	module.exports.get32IntFromBuffer = function (buffer, offset) {
	    offset = offset || 0;
	    var size = 0;
	    if ((size = buffer.length - offset) > 0) {
	        if (size >= 4) {
	            return buffer.readUInt32BE(offset);
	        } else {
	            var res = 0;
	            for (var i = offset + size, d = 0; i > offset; i--, d += 2) {
	                res += buffer[i - 1] * Math.pow(16, d);
	            }
	            return res;
	        }
	    } else {
	        return NaN;
	    }
	};
	
	module.exports._ = {
	    isObject: function (value) {
	        var type = typeof value;
	        return !!value && (type == 'object' || type == 'function');
	    },
	
	    isString: function (value) {
	        return typeof value == 'string' || value instanceof String;
	    },
	
	    isNumber: function (value) {
	        return typeof value == 'number' || !isNaN(parseFloat(value)) && isFinite(value);
	    },
	
	    /**
	     * Returns copy of `obj` without `removeProp` field.
	     * @param obj
	     * @param removeProp
	     * @returns Object
	     */
	    omit: function (obj, removeProp) {
	        var newObj = {};
	        for (var prop in obj) {
	            if (!obj.hasOwnProperty(prop) || prop === removeProp) {
	                continue;
	            }
	            newObj[prop] = obj[prop];
	        }
	
	        return newObj;
	    }
	};

/***/ },
/* 193 */
/***/ function(module, exports) {

	module.exports = require("crypto");

/***/ },
/* 194 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Basic JavaScript BN library - subset useful for RSA encryption.
	 * 
	 * Copyright (c) 2003-2005  Tom Wu
	 * All Rights Reserved.
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining
	 * a copy of this software and associated documentation files (the
	 * "Software"), to deal in the Software without restriction, including
	 * without limitation the rights to use, copy, modify, merge, publish,
	 * distribute, sublicense, and/or sell copies of the Software, and to
	 * permit persons to whom the Software is furnished to do so, subject to
	 * the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be
	 * included in all copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS-IS" AND WITHOUT WARRANTY OF ANY KIND, 
	 * EXPRESS, IMPLIED OR OTHERWISE, INCLUDING WITHOUT LIMITATION, ANY 
	 * WARRANTY OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE.  
	 *
	 * IN NO EVENT SHALL TOM WU BE LIABLE FOR ANY SPECIAL, INCIDENTAL,
	 * INDIRECT OR CONSEQUENTIAL DAMAGES OF ANY KIND, OR ANY DAMAGES WHATSOEVER
	 * RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER OR NOT ADVISED OF
	 * THE POSSIBILITY OF DAMAGE, AND ON ANY THEORY OF LIABILITY, ARISING OUT
	 * OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
	 *
	 * In addition, the following condition applies:
	 *
	 * All redistributions must retain an intact copy of this copyright notice
	 * and disclaimer.
	 */
	
	/*
	 * Added Node.js Buffers support
	 * 2014 rzcoder
	 */
	
	var crypt = __webpack_require__(193);
	var _ = __webpack_require__(192)._;
	
	// Bits per digit
	var dbits;
	
	// JavaScript engine analysis
	var canary = 0xdeadbeefcafe;
	var j_lm = ((canary & 0xffffff) == 0xefcafe);
	
	// (public) Constructor
	function BigInteger(a, b) {
	    if (a != null) {
	        if ("number" == typeof a) {
	            this.fromNumber(a, b);
	        } else if (Buffer.isBuffer(a)) {
	            this.fromBuffer(a);
	        } else if (b == null && "string" != typeof a) {
	            this.fromByteArray(a);
	        } else {
	            this.fromString(a, b);
	        }
	    }
	}
	
	// return new, unset BigInteger
	function nbi() {
	    return new BigInteger(null);
	}
	
	// am: Compute w_j += (x*this_i), propagate carries,
	// c is initial carry, returns final carry.
	// c < 3*dvalue, x < 2*dvalue, this_i < dvalue
	// We need to select the fastest one that works in this environment.
	
	// am1: use a single mult and divide to get the high bits,
	// max digit bits should be 26 because
	// max internal value = 2*dvalue^2-2*dvalue (< 2^53)
	function am1(i, x, w, j, c, n) {
	    while (--n >= 0) {
	        var v = x * this[i++] + w[j] + c;
	        c = Math.floor(v / 0x4000000);
	        w[j++] = v & 0x3ffffff;
	    }
	    return c;
	}
	// am2 avoids a big mult-and-extract completely.
	// Max digit bits should be <= 30 because we do bitwise ops
	// on values up to 2*hdvalue^2-hdvalue-1 (< 2^31)
	function am2(i, x, w, j, c, n) {
	    var xl = x & 0x7fff, xh = x >> 15;
	    while (--n >= 0) {
	        var l = this[i] & 0x7fff;
	        var h = this[i++] >> 15;
	        var m = xh * l + h * xl;
	        l = xl * l + ((m & 0x7fff) << 15) + w[j] + (c & 0x3fffffff);
	        c = (l >>> 30) + (m >>> 15) + xh * h + (c >>> 30);
	        w[j++] = l & 0x3fffffff;
	    }
	    return c;
	}
	// Alternately, set max digit bits to 28 since some
	// browsers slow down when dealing with 32-bit numbers.
	function am3(i, x, w, j, c, n) {
	    var xl = x & 0x3fff, xh = x >> 14;
	    while (--n >= 0) {
	        var l = this[i] & 0x3fff;
	        var h = this[i++] >> 14;
	        var m = xh * l + h * xl;
	        l = xl * l + ((m & 0x3fff) << 14) + w[j] + c;
	        c = (l >> 28) + (m >> 14) + xh * h;
	        w[j++] = l & 0xfffffff;
	    }
	    return c;
	}
	
	// We need to select the fastest one that works in this environment. 
	//if (j_lm && (navigator.appName == "Microsoft Internet Explorer")) {
	//	BigInteger.prototype.am = am2;
	//	dbits = 30;
	//} else if (j_lm && (navigator.appName != "Netscape")) {
	//	BigInteger.prototype.am = am1;
	//	dbits = 26;
	//} else { // Mozilla/Netscape seems to prefer am3
	//	BigInteger.prototype.am = am3;
	//	dbits = 28;
	//}
	
	// For node.js, we pick am3 with max dbits to 28.
	BigInteger.prototype.am = am3;
	dbits = 28;
	
	BigInteger.prototype.DB = dbits;
	BigInteger.prototype.DM = ((1 << dbits) - 1);
	BigInteger.prototype.DV = (1 << dbits);
	
	var BI_FP = 52;
	BigInteger.prototype.FV = Math.pow(2, BI_FP);
	BigInteger.prototype.F1 = BI_FP - dbits;
	BigInteger.prototype.F2 = 2 * dbits - BI_FP;
	
	// Digit conversions
	var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
	var BI_RC = new Array();
	var rr, vv;
	rr = "0".charCodeAt(0);
	for (vv = 0; vv <= 9; ++vv) BI_RC[rr++] = vv;
	rr = "a".charCodeAt(0);
	for (vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv;
	rr = "A".charCodeAt(0);
	for (vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv;
	
	function int2char(n) {
	    return BI_RM.charAt(n);
	}
	function intAt(s, i) {
	    var c = BI_RC[s.charCodeAt(i)];
	    return (c == null) ? -1 : c;
	}
	
	// (protected) copy this to r
	function bnpCopyTo(r) {
	    for (var i = this.t - 1; i >= 0; --i) r[i] = this[i];
	    r.t = this.t;
	    r.s = this.s;
	}
	
	// (protected) set from integer value x, -DV <= x < DV
	function bnpFromInt(x) {
	    this.t = 1;
	    this.s = (x < 0) ? -1 : 0;
	    if (x > 0) this[0] = x;
	    else if (x < -1) this[0] = x + DV;
	    else this.t = 0;
	}
	
	// return bigint initialized to value
	function nbv(i) {
	    var r = nbi();
	    r.fromInt(i);
	    return r;
	}
	
	// (protected) set from string and radix
	function bnpFromString(data, radix, unsigned) {
	    var k;
	    switch (radix) {
	        case 2:
	            k = 1;
	            break;
	        case 4:
	            k = 2;
	            break;
	        case 8:
	            k = 3;
	            break;
	        case 16:
	            k = 4;
	            break;
	        case 32:
	            k = 5;
	            break;
	        case 256:
	            k = 8;
	            break;
	        default:
	            this.fromRadix(data, radix);
	            return;
	    }
	
	    this.t = 0;
	    this.s = 0;
	
	    var i = data.length;
	    var mi = false;
	    var sh = 0;
	
	    while (--i >= 0) {
	        var x = (k == 8) ? data[i] & 0xff : intAt(data, i);
	        if (x < 0) {
	            if (data.charAt(i) == "-") mi = true;
	            continue;
	        }
	        mi = false;
	        if (sh === 0)
	            this[this.t++] = x;
	        else if (sh + k > this.DB) {
	            this[this.t - 1] |= (x & ((1 << (this.DB - sh)) - 1)) << sh;
	            this[this.t++] = (x >> (this.DB - sh));
	        }
	        else
	            this[this.t - 1] |= x << sh;
	        sh += k;
	        if (sh >= this.DB) sh -= this.DB;
	    }
	    if ((!unsigned) && k == 8 && (data[0] & 0x80) != 0) {
	        this.s = -1;
	        if (sh > 0) this[this.t - 1] |= ((1 << (this.DB - sh)) - 1) << sh;
	    }
	    this.clamp();
	    if (mi) BigInteger.ZERO.subTo(this, this);
	}
	
	function bnpFromByteArray(a, unsigned) {
	    this.fromString(a, 256, unsigned)
	}
	
	function bnpFromBuffer(a) {
	    this.fromString(a, 256, true)
	}
	
	// (protected) clamp off excess high words
	function bnpClamp() {
	    var c = this.s & this.DM;
	    while (this.t > 0 && this[this.t - 1] == c) --this.t;
	}
	
	// (public) return string representation in given radix
	function bnToString(b) {
	    if (this.s < 0) return "-" + this.negate().toString(b);
	    var k;
	    if (b == 16) k = 4;
	    else if (b == 8) k = 3;
	    else if (b == 2) k = 1;
	    else if (b == 32) k = 5;
	    else if (b == 4) k = 2;
	    else return this.toRadix(b);
	    var km = (1 << k) - 1, d, m = false, r = "", i = this.t;
	    var p = this.DB - (i * this.DB) % k;
	    if (i-- > 0) {
	        if (p < this.DB && (d = this[i] >> p) > 0) {
	            m = true;
	            r = int2char(d);
	        }
	        while (i >= 0) {
	            if (p < k) {
	                d = (this[i] & ((1 << p) - 1)) << (k - p);
	                d |= this[--i] >> (p += this.DB - k);
	            }
	            else {
	                d = (this[i] >> (p -= k)) & km;
	                if (p <= 0) {
	                    p += this.DB;
	                    --i;
	                }
	            }
	            if (d > 0) m = true;
	            if (m) r += int2char(d);
	        }
	    }
	    return m ? r : "0";
	}
	
	// (public) -this
	function bnNegate() {
	    var r = nbi();
	    BigInteger.ZERO.subTo(this, r);
	    return r;
	}
	
	// (public) |this|
	function bnAbs() {
	    return (this.s < 0) ? this.negate() : this;
	}
	
	// (public) return + if this > a, - if this < a, 0 if equal
	function bnCompareTo(a) {
	    var r = this.s - a.s;
	    if (r != 0) return r;
	    var i = this.t;
	    r = i - a.t;
	    if (r != 0) return (this.s < 0) ? -r : r;
	    while (--i >= 0) if ((r = this[i] - a[i]) != 0) return r;
	    return 0;
	}
	
	// returns bit length of the integer x
	function nbits(x) {
	    var r = 1, t;
	    if ((t = x >>> 16) != 0) {
	        x = t;
	        r += 16;
	    }
	    if ((t = x >> 8) != 0) {
	        x = t;
	        r += 8;
	    }
	    if ((t = x >> 4) != 0) {
	        x = t;
	        r += 4;
	    }
	    if ((t = x >> 2) != 0) {
	        x = t;
	        r += 2;
	    }
	    if ((t = x >> 1) != 0) {
	        x = t;
	        r += 1;
	    }
	    return r;
	}
	
	// (public) return the number of bits in "this"
	function bnBitLength() {
	    if (this.t <= 0) return 0;
	    return this.DB * (this.t - 1) + nbits(this[this.t - 1] ^ (this.s & this.DM));
	}
	
	// (protected) r = this << n*DB
	function bnpDLShiftTo(n, r) {
	    var i;
	    for (i = this.t - 1; i >= 0; --i) r[i + n] = this[i];
	    for (i = n - 1; i >= 0; --i) r[i] = 0;
	    r.t = this.t + n;
	    r.s = this.s;
	}
	
	// (protected) r = this >> n*DB
	function bnpDRShiftTo(n, r) {
	    for (var i = n; i < this.t; ++i) r[i - n] = this[i];
	    r.t = Math.max(this.t - n, 0);
	    r.s = this.s;
	}
	
	// (protected) r = this << n
	function bnpLShiftTo(n, r) {
	    var bs = n % this.DB;
	    var cbs = this.DB - bs;
	    var bm = (1 << cbs) - 1;
	    var ds = Math.floor(n / this.DB), c = (this.s << bs) & this.DM, i;
	    for (i = this.t - 1; i >= 0; --i) {
	        r[i + ds + 1] = (this[i] >> cbs) | c;
	        c = (this[i] & bm) << bs;
	    }
	    for (i = ds - 1; i >= 0; --i) r[i] = 0;
	    r[ds] = c;
	    r.t = this.t + ds + 1;
	    r.s = this.s;
	    r.clamp();
	}
	
	// (protected) r = this >> n
	function bnpRShiftTo(n, r) {
	    r.s = this.s;
	    var ds = Math.floor(n / this.DB);
	    if (ds >= this.t) {
	        r.t = 0;
	        return;
	    }
	    var bs = n % this.DB;
	    var cbs = this.DB - bs;
	    var bm = (1 << bs) - 1;
	    r[0] = this[ds] >> bs;
	    for (var i = ds + 1; i < this.t; ++i) {
	        r[i - ds - 1] |= (this[i] & bm) << cbs;
	        r[i - ds] = this[i] >> bs;
	    }
	    if (bs > 0) r[this.t - ds - 1] |= (this.s & bm) << cbs;
	    r.t = this.t - ds;
	    r.clamp();
	}
	
	// (protected) r = this - a
	function bnpSubTo(a, r) {
	    var i = 0, c = 0, m = Math.min(a.t, this.t);
	    while (i < m) {
	        c += this[i] - a[i];
	        r[i++] = c & this.DM;
	        c >>= this.DB;
	    }
	    if (a.t < this.t) {
	        c -= a.s;
	        while (i < this.t) {
	            c += this[i];
	            r[i++] = c & this.DM;
	            c >>= this.DB;
	        }
	        c += this.s;
	    }
	    else {
	        c += this.s;
	        while (i < a.t) {
	            c -= a[i];
	            r[i++] = c & this.DM;
	            c >>= this.DB;
	        }
	        c -= a.s;
	    }
	    r.s = (c < 0) ? -1 : 0;
	    if (c < -1) r[i++] = this.DV + c;
	    else if (c > 0) r[i++] = c;
	    r.t = i;
	    r.clamp();
	}
	
	// (protected) r = this * a, r != this,a (HAC 14.12)
	// "this" should be the larger one if appropriate.
	function bnpMultiplyTo(a, r) {
	    var x = this.abs(), y = a.abs();
	    var i = x.t;
	    r.t = i + y.t;
	    while (--i >= 0) r[i] = 0;
	    for (i = 0; i < y.t; ++i) r[i + x.t] = x.am(0, y[i], r, i, 0, x.t);
	    r.s = 0;
	    r.clamp();
	    if (this.s != a.s) BigInteger.ZERO.subTo(r, r);
	}
	
	// (protected) r = this^2, r != this (HAC 14.16)
	function bnpSquareTo(r) {
	    var x = this.abs();
	    var i = r.t = 2 * x.t;
	    while (--i >= 0) r[i] = 0;
	    for (i = 0; i < x.t - 1; ++i) {
	        var c = x.am(i, x[i], r, 2 * i, 0, 1);
	        if ((r[i + x.t] += x.am(i + 1, 2 * x[i], r, 2 * i + 1, c, x.t - i - 1)) >= x.DV) {
	            r[i + x.t] -= x.DV;
	            r[i + x.t + 1] = 1;
	        }
	    }
	    if (r.t > 0) r[r.t - 1] += x.am(i, x[i], r, 2 * i, 0, 1);
	    r.s = 0;
	    r.clamp();
	}
	
	// (protected) divide this by m, quotient and remainder to q, r (HAC 14.20)
	// r != q, this != m.  q or r may be null.
	function bnpDivRemTo(m, q, r) {
	    var pm = m.abs();
	    if (pm.t <= 0) return;
	    var pt = this.abs();
	    if (pt.t < pm.t) {
	        if (q != null) q.fromInt(0);
	        if (r != null) this.copyTo(r);
	        return;
	    }
	    if (r == null) r = nbi();
	    var y = nbi(), ts = this.s, ms = m.s;
	    var nsh = this.DB - nbits(pm[pm.t - 1]);	// normalize modulus
	    if (nsh > 0) {
	        pm.lShiftTo(nsh, y);
	        pt.lShiftTo(nsh, r);
	    }
	    else {
	        pm.copyTo(y);
	        pt.copyTo(r);
	    }
	    var ys = y.t;
	    var y0 = y[ys - 1];
	    if (y0 === 0) return;
	    var yt = y0 * (1 << this.F1) + ((ys > 1) ? y[ys - 2] >> this.F2 : 0);
	    var d1 = this.FV / yt, d2 = (1 << this.F1) / yt, e = 1 << this.F2;
	    var i = r.t, j = i - ys, t = (q == null) ? nbi() : q;
	    y.dlShiftTo(j, t);
	    if (r.compareTo(t) >= 0) {
	        r[r.t++] = 1;
	        r.subTo(t, r);
	    }
	    BigInteger.ONE.dlShiftTo(ys, t);
	    t.subTo(y, y);	// "negative" y so we can replace sub with am later
	    while (y.t < ys) y[y.t++] = 0;
	    while (--j >= 0) {
	        // Estimate quotient digit
	        var qd = (r[--i] == y0) ? this.DM : Math.floor(r[i] * d1 + (r[i - 1] + e) * d2);
	        if ((r[i] += y.am(0, qd, r, j, 0, ys)) < qd) {	// Try it out
	            y.dlShiftTo(j, t);
	            r.subTo(t, r);
	            while (r[i] < --qd) r.subTo(t, r);
	        }
	    }
	    if (q != null) {
	        r.drShiftTo(ys, q);
	        if (ts != ms) BigInteger.ZERO.subTo(q, q);
	    }
	    r.t = ys;
	    r.clamp();
	    if (nsh > 0) r.rShiftTo(nsh, r);	// Denormalize remainder
	    if (ts < 0) BigInteger.ZERO.subTo(r, r);
	}
	
	// (public) this mod a
	function bnMod(a) {
	    var r = nbi();
	    this.abs().divRemTo(a, null, r);
	    if (this.s < 0 && r.compareTo(BigInteger.ZERO) > 0) a.subTo(r, r);
	    return r;
	}
	
	// Modular reduction using "classic" algorithm
	function Classic(m) {
	    this.m = m;
	}
	function cConvert(x) {
	    if (x.s < 0 || x.compareTo(this.m) >= 0) return x.mod(this.m);
	    else return x;
	}
	function cRevert(x) {
	    return x;
	}
	function cReduce(x) {
	    x.divRemTo(this.m, null, x);
	}
	function cMulTo(x, y, r) {
	    x.multiplyTo(y, r);
	    this.reduce(r);
	}
	function cSqrTo(x, r) {
	    x.squareTo(r);
	    this.reduce(r);
	}
	
	Classic.prototype.convert = cConvert;
	Classic.prototype.revert = cRevert;
	Classic.prototype.reduce = cReduce;
	Classic.prototype.mulTo = cMulTo;
	Classic.prototype.sqrTo = cSqrTo;
	
	// (protected) return "-1/this % 2^DB"; useful for Mont. reduction
	// justification:
	//         xy == 1 (mod m)
	//         xy =  1+km
	//   xy(2-xy) = (1+km)(1-km)
	// x[y(2-xy)] = 1-k^2m^2
	// x[y(2-xy)] == 1 (mod m^2)
	// if y is 1/x mod m, then y(2-xy) is 1/x mod m^2
	// should reduce x and y(2-xy) by m^2 at each step to keep size bounded.
	// JS multiply "overflows" differently from C/C++, so care is needed here.
	function bnpInvDigit() {
	    if (this.t < 1) return 0;
	    var x = this[0];
	    if ((x & 1) === 0) return 0;
	    var y = x & 3;		// y == 1/x mod 2^2
	    y = (y * (2 - (x & 0xf) * y)) & 0xf;	// y == 1/x mod 2^4
	    y = (y * (2 - (x & 0xff) * y)) & 0xff;	// y == 1/x mod 2^8
	    y = (y * (2 - (((x & 0xffff) * y) & 0xffff))) & 0xffff;	// y == 1/x mod 2^16
	    // last step - calculate inverse mod DV directly;
	    // assumes 16 < DB <= 32 and assumes ability to handle 48-bit ints
	    y = (y * (2 - x * y % this.DV)) % this.DV;		// y == 1/x mod 2^dbits
	    // we really want the negative inverse, and -DV < y < DV
	    return (y > 0) ? this.DV - y : -y;
	}
	
	// Montgomery reduction
	function Montgomery(m) {
	    this.m = m;
	    this.mp = m.invDigit();
	    this.mpl = this.mp & 0x7fff;
	    this.mph = this.mp >> 15;
	    this.um = (1 << (m.DB - 15)) - 1;
	    this.mt2 = 2 * m.t;
	}
	
	// xR mod m
	function montConvert(x) {
	    var r = nbi();
	    x.abs().dlShiftTo(this.m.t, r);
	    r.divRemTo(this.m, null, r);
	    if (x.s < 0 && r.compareTo(BigInteger.ZERO) > 0) this.m.subTo(r, r);
	    return r;
	}
	
	// x/R mod m
	function montRevert(x) {
	    var r = nbi();
	    x.copyTo(r);
	    this.reduce(r);
	    return r;
	}
	
	// x = x/R mod m (HAC 14.32)
	function montReduce(x) {
	    while (x.t <= this.mt2)	// pad x so am has enough room later
	        x[x.t++] = 0;
	    for (var i = 0; i < this.m.t; ++i) {
	        // faster way of calculating u0 = x[i]*mp mod DV
	        var j = x[i] & 0x7fff;
	        var u0 = (j * this.mpl + (((j * this.mph + (x[i] >> 15) * this.mpl) & this.um) << 15)) & x.DM;
	        // use am to combine the multiply-shift-add into one call
	        j = i + this.m.t;
	        x[j] += this.m.am(0, u0, x, i, 0, this.m.t);
	        // propagate carry
	        while (x[j] >= x.DV) {
	            x[j] -= x.DV;
	            x[++j]++;
	        }
	    }
	    x.clamp();
	    x.drShiftTo(this.m.t, x);
	    if (x.compareTo(this.m) >= 0) x.subTo(this.m, x);
	}
	
	// r = "x^2/R mod m"; x != r
	function montSqrTo(x, r) {
	    x.squareTo(r);
	    this.reduce(r);
	}
	
	// r = "xy/R mod m"; x,y != r
	function montMulTo(x, y, r) {
	    x.multiplyTo(y, r);
	    this.reduce(r);
	}
	
	Montgomery.prototype.convert = montConvert;
	Montgomery.prototype.revert = montRevert;
	Montgomery.prototype.reduce = montReduce;
	Montgomery.prototype.mulTo = montMulTo;
	Montgomery.prototype.sqrTo = montSqrTo;
	
	// (protected) true iff this is even
	function bnpIsEven() {
	    return ((this.t > 0) ? (this[0] & 1) : this.s) === 0;
	}
	
	// (protected) this^e, e < 2^32, doing sqr and mul with "r" (HAC 14.79)
	function bnpExp(e, z) {
	    if (e > 0xffffffff || e < 1) return BigInteger.ONE;
	    var r = nbi(), r2 = nbi(), g = z.convert(this), i = nbits(e) - 1;
	    g.copyTo(r);
	    while (--i >= 0) {
	        z.sqrTo(r, r2);
	        if ((e & (1 << i)) > 0) z.mulTo(r2, g, r);
	        else {
	            var t = r;
	            r = r2;
	            r2 = t;
	        }
	    }
	    return z.revert(r);
	}
	
	// (public) this^e % m, 0 <= e < 2^32
	function bnModPowInt(e, m) {
	    var z;
	    if (e < 256 || m.isEven()) z = new Classic(m); else z = new Montgomery(m);
	    return this.exp(e, z);
	}
	
	// Copyright (c) 2005-2009  Tom Wu
	// All Rights Reserved.
	// See "LICENSE" for details.
	
	// Extended JavaScript BN functions, required for RSA private ops.
	
	// Version 1.1: new BigInteger("0", 10) returns "proper" zero
	// Version 1.2: square() API, isProbablePrime fix
	
	//(public)
	function bnClone() {
	    var r = nbi();
	    this.copyTo(r);
	    return r;
	}
	
	//(public) return value as integer
	function bnIntValue() {
	    if (this.s < 0) {
	        if (this.t == 1) return this[0] - this.DV;
	        else if (this.t === 0) return -1;
	    }
	    else if (this.t == 1) return this[0];
	    else if (this.t === 0) return 0;
	// assumes 16 < DB < 32
	    return ((this[1] & ((1 << (32 - this.DB)) - 1)) << this.DB) | this[0];
	}
	
	//(public) return value as byte
	function bnByteValue() {
	    return (this.t == 0) ? this.s : (this[0] << 24) >> 24;
	}
	
	//(public) return value as short (assumes DB>=16)
	function bnShortValue() {
	    return (this.t == 0) ? this.s : (this[0] << 16) >> 16;
	}
	
	//(protected) return x s.t. r^x < DV
	function bnpChunkSize(r) {
	    return Math.floor(Math.LN2 * this.DB / Math.log(r));
	}
	
	//(public) 0 if this === 0, 1 if this > 0
	function bnSigNum() {
	    if (this.s < 0) return -1;
	    else if (this.t <= 0 || (this.t == 1 && this[0] <= 0)) return 0;
	    else return 1;
	}
	
	//(protected) convert to radix string
	function bnpToRadix(b) {
	    if (b == null) b = 10;
	    if (this.signum() === 0 || b < 2 || b > 36) return "0";
	    var cs = this.chunkSize(b);
	    var a = Math.pow(b, cs);
	    var d = nbv(a), y = nbi(), z = nbi(), r = "";
	    this.divRemTo(d, y, z);
	    while (y.signum() > 0) {
	        r = (a + z.intValue()).toString(b).substr(1) + r;
	        y.divRemTo(d, y, z);
	    }
	    return z.intValue().toString(b) + r;
	}
	
	//(protected) convert from radix string
	function bnpFromRadix(s, b) {
	    this.fromInt(0);
	    if (b == null) b = 10;
	    var cs = this.chunkSize(b);
	    var d = Math.pow(b, cs), mi = false, j = 0, w = 0;
	    for (var i = 0; i < s.length; ++i) {
	        var x = intAt(s, i);
	        if (x < 0) {
	            if (s.charAt(i) == "-" && this.signum() === 0) mi = true;
	            continue;
	        }
	        w = b * w + x;
	        if (++j >= cs) {
	            this.dMultiply(d);
	            this.dAddOffset(w, 0);
	            j = 0;
	            w = 0;
	        }
	    }
	    if (j > 0) {
	        this.dMultiply(Math.pow(b, j));
	        this.dAddOffset(w, 0);
	    }
	    if (mi) BigInteger.ZERO.subTo(this, this);
	}
	
	//(protected) alternate constructor
	function bnpFromNumber(a, b) {
	    if ("number" == typeof b) {
	        // new BigInteger(int,int,RNG)
	        if (a < 2) this.fromInt(1);
	        else {
	            this.fromNumber(a);
	            if (!this.testBit(a - 1))	// force MSB set
	                this.bitwiseTo(BigInteger.ONE.shiftLeft(a - 1), op_or, this);
	            if (this.isEven()) this.dAddOffset(1, 0); // force odd
	            while (!this.isProbablePrime(b)) {
	                this.dAddOffset(2, 0);
	                if (this.bitLength() > a) this.subTo(BigInteger.ONE.shiftLeft(a - 1), this);
	            }
	        }
	    } else {
	        // new BigInteger(int,RNG)
	        var x = crypt.randomBytes((a >> 3) + 1)
	        var t = a & 7;
	
	        if (t > 0)
	            x[0] &= ((1 << t) - 1);
	        else
	            x[0] = 0;
	
	        this.fromByteArray(x);
	    }
	}
	
	//(public) convert to bigendian byte array
	function bnToByteArray() {
	    var i = this.t, r = new Array();
	    r[0] = this.s;
	    var p = this.DB - (i * this.DB) % 8, d, k = 0;
	    if (i-- > 0) {
	        if (p < this.DB && (d = this[i] >> p) != (this.s & this.DM) >> p)
	            r[k++] = d | (this.s << (this.DB - p));
	        while (i >= 0) {
	            if (p < 8) {
	                d = (this[i] & ((1 << p) - 1)) << (8 - p);
	                d |= this[--i] >> (p += this.DB - 8);
	            }
	            else {
	                d = (this[i] >> (p -= 8)) & 0xff;
	                if (p <= 0) {
	                    p += this.DB;
	                    --i;
	                }
	            }
	            if ((d & 0x80) != 0) d |= -256;
	            if (k === 0 && (this.s & 0x80) != (d & 0x80)) ++k;
	            if (k > 0 || d != this.s) r[k++] = d;
	        }
	    }
	    return r;
	}
	
	/**
	 * return Buffer object
	 * @param trim {boolean} slice buffer if first element == 0
	 * @returns {Buffer}
	 */
	function bnToBuffer(trimOrSize) {
	    var res = new Buffer(this.toByteArray());
	    if (trimOrSize === true && res[0] === 0) {
	        res = res.slice(1);
	    } else if (_.isNumber(trimOrSize)) {
	        if (res.length > trimOrSize) {
	            for (var i = 0; i < res.length - trimOrSize; i++) {
	                if (res[i] !== 0) {
	                    return null;
	                }
	            }
	            return res.slice(res.length - trimOrSize);
	        } else if (res.length < trimOrSize) {
	            var padded = new Buffer(trimOrSize);
	            padded.fill(0, 0, trimOrSize - res.length);
	            res.copy(padded, trimOrSize - res.length);
	            return padded;
	        }
	    }
	    return res;
	}
	
	function bnEquals(a) {
	    return (this.compareTo(a) == 0);
	}
	function bnMin(a) {
	    return (this.compareTo(a) < 0) ? this : a;
	}
	function bnMax(a) {
	    return (this.compareTo(a) > 0) ? this : a;
	}
	
	//(protected) r = this op a (bitwise)
	function bnpBitwiseTo(a, op, r) {
	    var i, f, m = Math.min(a.t, this.t);
	    for (i = 0; i < m; ++i) r[i] = op(this[i], a[i]);
	    if (a.t < this.t) {
	        f = a.s & this.DM;
	        for (i = m; i < this.t; ++i) r[i] = op(this[i], f);
	        r.t = this.t;
	    }
	    else {
	        f = this.s & this.DM;
	        for (i = m; i < a.t; ++i) r[i] = op(f, a[i]);
	        r.t = a.t;
	    }
	    r.s = op(this.s, a.s);
	    r.clamp();
	}
	
	//(public) this & a
	function op_and(x, y) {
	    return x & y;
	}
	function bnAnd(a) {
	    var r = nbi();
	    this.bitwiseTo(a, op_and, r);
	    return r;
	}
	
	//(public) this | a
	function op_or(x, y) {
	    return x | y;
	}
	function bnOr(a) {
	    var r = nbi();
	    this.bitwiseTo(a, op_or, r);
	    return r;
	}
	
	//(public) this ^ a
	function op_xor(x, y) {
	    return x ^ y;
	}
	function bnXor(a) {
	    var r = nbi();
	    this.bitwiseTo(a, op_xor, r);
	    return r;
	}
	
	//(public) this & ~a
	function op_andnot(x, y) {
	    return x & ~y;
	}
	function bnAndNot(a) {
	    var r = nbi();
	    this.bitwiseTo(a, op_andnot, r);
	    return r;
	}
	
	//(public) ~this
	function bnNot() {
	    var r = nbi();
	    for (var i = 0; i < this.t; ++i) r[i] = this.DM & ~this[i];
	    r.t = this.t;
	    r.s = ~this.s;
	    return r;
	}
	
	//(public) this << n
	function bnShiftLeft(n) {
	    var r = nbi();
	    if (n < 0) this.rShiftTo(-n, r); else this.lShiftTo(n, r);
	    return r;
	}
	
	//(public) this >> n
	function bnShiftRight(n) {
	    var r = nbi();
	    if (n < 0) this.lShiftTo(-n, r); else this.rShiftTo(n, r);
	    return r;
	}
	
	//return index of lowest 1-bit in x, x < 2^31
	function lbit(x) {
	    if (x === 0) return -1;
	    var r = 0;
	    if ((x & 0xffff) === 0) {
	        x >>= 16;
	        r += 16;
	    }
	    if ((x & 0xff) === 0) {
	        x >>= 8;
	        r += 8;
	    }
	    if ((x & 0xf) === 0) {
	        x >>= 4;
	        r += 4;
	    }
	    if ((x & 3) === 0) {
	        x >>= 2;
	        r += 2;
	    }
	    if ((x & 1) === 0) ++r;
	    return r;
	}
	
	//(public) returns index of lowest 1-bit (or -1 if none)
	function bnGetLowestSetBit() {
	    for (var i = 0; i < this.t; ++i)
	        if (this[i] != 0) return i * this.DB + lbit(this[i]);
	    if (this.s < 0) return this.t * this.DB;
	    return -1;
	}
	
	//return number of 1 bits in x
	function cbit(x) {
	    var r = 0;
	    while (x != 0) {
	        x &= x - 1;
	        ++r;
	    }
	    return r;
	}
	
	//(public) return number of set bits
	function bnBitCount() {
	    var r = 0, x = this.s & this.DM;
	    for (var i = 0; i < this.t; ++i) r += cbit(this[i] ^ x);
	    return r;
	}
	
	//(public) true iff nth bit is set
	function bnTestBit(n) {
	    var j = Math.floor(n / this.DB);
	    if (j >= this.t) return (this.s != 0);
	    return ((this[j] & (1 << (n % this.DB))) != 0);
	}
	
	//(protected) this op (1<<n)
	function bnpChangeBit(n, op) {
	    var r = BigInteger.ONE.shiftLeft(n);
	    this.bitwiseTo(r, op, r);
	    return r;
	}
	
	//(public) this | (1<<n)
	function bnSetBit(n) {
	    return this.changeBit(n, op_or);
	}
	
	//(public) this & ~(1<<n)
	function bnClearBit(n) {
	    return this.changeBit(n, op_andnot);
	}
	
	//(public) this ^ (1<<n)
	function bnFlipBit(n) {
	    return this.changeBit(n, op_xor);
	}
	
	//(protected) r = this + a
	function bnpAddTo(a, r) {
	    var i = 0, c = 0, m = Math.min(a.t, this.t);
	    while (i < m) {
	        c += this[i] + a[i];
	        r[i++] = c & this.DM;
	        c >>= this.DB;
	    }
	    if (a.t < this.t) {
	        c += a.s;
	        while (i < this.t) {
	            c += this[i];
	            r[i++] = c & this.DM;
	            c >>= this.DB;
	        }
	        c += this.s;
	    }
	    else {
	        c += this.s;
	        while (i < a.t) {
	            c += a[i];
	            r[i++] = c & this.DM;
	            c >>= this.DB;
	        }
	        c += a.s;
	    }
	    r.s = (c < 0) ? -1 : 0;
	    if (c > 0) r[i++] = c;
	    else if (c < -1) r[i++] = this.DV + c;
	    r.t = i;
	    r.clamp();
	}
	
	//(public) this + a
	function bnAdd(a) {
	    var r = nbi();
	    this.addTo(a, r);
	    return r;
	}
	
	//(public) this - a
	function bnSubtract(a) {
	    var r = nbi();
	    this.subTo(a, r);
	    return r;
	}
	
	//(public) this * a
	function bnMultiply(a) {
	    var r = nbi();
	    this.multiplyTo(a, r);
	    return r;
	}
	
	// (public) this^2
	function bnSquare() {
	    var r = nbi();
	    this.squareTo(r);
	    return r;
	}
	
	//(public) this / a
	function bnDivide(a) {
	    var r = nbi();
	    this.divRemTo(a, r, null);
	    return r;
	}
	
	//(public) this % a
	function bnRemainder(a) {
	    var r = nbi();
	    this.divRemTo(a, null, r);
	    return r;
	}
	
	//(public) [this/a,this%a]
	function bnDivideAndRemainder(a) {
	    var q = nbi(), r = nbi();
	    this.divRemTo(a, q, r);
	    return new Array(q, r);
	}
	
	//(protected) this *= n, this >= 0, 1 < n < DV
	function bnpDMultiply(n) {
	    this[this.t] = this.am(0, n - 1, this, 0, 0, this.t);
	    ++this.t;
	    this.clamp();
	}
	
	//(protected) this += n << w words, this >= 0
	function bnpDAddOffset(n, w) {
	    if (n === 0) return;
	    while (this.t <= w) this[this.t++] = 0;
	    this[w] += n;
	    while (this[w] >= this.DV) {
	        this[w] -= this.DV;
	        if (++w >= this.t) this[this.t++] = 0;
	        ++this[w];
	    }
	}
	
	//A "null" reducer
	function NullExp() {
	}
	function nNop(x) {
	    return x;
	}
	function nMulTo(x, y, r) {
	    x.multiplyTo(y, r);
	}
	function nSqrTo(x, r) {
	    x.squareTo(r);
	}
	
	NullExp.prototype.convert = nNop;
	NullExp.prototype.revert = nNop;
	NullExp.prototype.mulTo = nMulTo;
	NullExp.prototype.sqrTo = nSqrTo;
	
	//(public) this^e
	function bnPow(e) {
	    return this.exp(e, new NullExp());
	}
	
	//(protected) r = lower n words of "this * a", a.t <= n
	//"this" should be the larger one if appropriate.
	function bnpMultiplyLowerTo(a, n, r) {
	    var i = Math.min(this.t + a.t, n);
	    r.s = 0; // assumes a,this >= 0
	    r.t = i;
	    while (i > 0) r[--i] = 0;
	    var j;
	    for (j = r.t - this.t; i < j; ++i) r[i + this.t] = this.am(0, a[i], r, i, 0, this.t);
	    for (j = Math.min(a.t, n); i < j; ++i) this.am(0, a[i], r, i, 0, n - i);
	    r.clamp();
	}
	
	//(protected) r = "this * a" without lower n words, n > 0
	//"this" should be the larger one if appropriate.
	function bnpMultiplyUpperTo(a, n, r) {
	    --n;
	    var i = r.t = this.t + a.t - n;
	    r.s = 0; // assumes a,this >= 0
	    while (--i >= 0) r[i] = 0;
	    for (i = Math.max(n - this.t, 0); i < a.t; ++i)
	        r[this.t + i - n] = this.am(n - i, a[i], r, 0, 0, this.t + i - n);
	    r.clamp();
	    r.drShiftTo(1, r);
	}
	
	//Barrett modular reduction
	function Barrett(m) {
	// setup Barrett
	    this.r2 = nbi();
	    this.q3 = nbi();
	    BigInteger.ONE.dlShiftTo(2 * m.t, this.r2);
	    this.mu = this.r2.divide(m);
	    this.m = m;
	}
	
	function barrettConvert(x) {
	    if (x.s < 0 || x.t > 2 * this.m.t) return x.mod(this.m);
	    else if (x.compareTo(this.m) < 0) return x;
	    else {
	        var r = nbi();
	        x.copyTo(r);
	        this.reduce(r);
	        return r;
	    }
	}
	
	function barrettRevert(x) {
	    return x;
	}
	
	//x = x mod m (HAC 14.42)
	function barrettReduce(x) {
	    x.drShiftTo(this.m.t - 1, this.r2);
	    if (x.t > this.m.t + 1) {
	        x.t = this.m.t + 1;
	        x.clamp();
	    }
	    this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3);
	    this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2);
	    while (x.compareTo(this.r2) < 0) x.dAddOffset(1, this.m.t + 1);
	    x.subTo(this.r2, x);
	    while (x.compareTo(this.m) >= 0) x.subTo(this.m, x);
	}
	
	//r = x^2 mod m; x != r
	function barrettSqrTo(x, r) {
	    x.squareTo(r);
	    this.reduce(r);
	}
	
	//r = x*y mod m; x,y != r
	function barrettMulTo(x, y, r) {
	    x.multiplyTo(y, r);
	    this.reduce(r);
	}
	
	Barrett.prototype.convert = barrettConvert;
	Barrett.prototype.revert = barrettRevert;
	Barrett.prototype.reduce = barrettReduce;
	Barrett.prototype.mulTo = barrettMulTo;
	Barrett.prototype.sqrTo = barrettSqrTo;
	
	//(public) this^e % m (HAC 14.85)
	function bnModPow(e, m) {
	    var i = e.bitLength(), k, r = nbv(1), z;
	    if (i <= 0) return r;
	    else if (i < 18) k = 1;
	    else if (i < 48) k = 3;
	    else if (i < 144) k = 4;
	    else if (i < 768) k = 5;
	    else k = 6;
	    if (i < 8)
	        z = new Classic(m);
	    else if (m.isEven())
	        z = new Barrett(m);
	    else
	        z = new Montgomery(m);
	
	// precomputation
	    var g = new Array(), n = 3, k1 = k - 1, km = (1 << k) - 1;
	    g[1] = z.convert(this);
	    if (k > 1) {
	        var g2 = nbi();
	        z.sqrTo(g[1], g2);
	        while (n <= km) {
	            g[n] = nbi();
	            z.mulTo(g2, g[n - 2], g[n]);
	            n += 2;
	        }
	    }
	
	    var j = e.t - 1, w, is1 = true, r2 = nbi(), t;
	    i = nbits(e[j]) - 1;
	    while (j >= 0) {
	        if (i >= k1) w = (e[j] >> (i - k1)) & km;
	        else {
	            w = (e[j] & ((1 << (i + 1)) - 1)) << (k1 - i);
	            if (j > 0) w |= e[j - 1] >> (this.DB + i - k1);
	        }
	
	        n = k;
	        while ((w & 1) === 0) {
	            w >>= 1;
	            --n;
	        }
	        if ((i -= n) < 0) {
	            i += this.DB;
	            --j;
	        }
	        if (is1) {	// ret == 1, don't bother squaring or multiplying it
	            g[w].copyTo(r);
	            is1 = false;
	        }
	        else {
	            while (n > 1) {
	                z.sqrTo(r, r2);
	                z.sqrTo(r2, r);
	                n -= 2;
	            }
	            if (n > 0) z.sqrTo(r, r2); else {
	                t = r;
	                r = r2;
	                r2 = t;
	            }
	            z.mulTo(r2, g[w], r);
	        }
	
	        while (j >= 0 && (e[j] & (1 << i)) === 0) {
	            z.sqrTo(r, r2);
	            t = r;
	            r = r2;
	            r2 = t;
	            if (--i < 0) {
	                i = this.DB - 1;
	                --j;
	            }
	        }
	    }
	    return z.revert(r);
	}
	
	//(public) gcd(this,a) (HAC 14.54)
	function bnGCD(a) {
	    var x = (this.s < 0) ? this.negate() : this.clone();
	    var y = (a.s < 0) ? a.negate() : a.clone();
	    if (x.compareTo(y) < 0) {
	        var t = x;
	        x = y;
	        y = t;
	    }
	    var i = x.getLowestSetBit(), g = y.getLowestSetBit();
	    if (g < 0) return x;
	    if (i < g) g = i;
	    if (g > 0) {
	        x.rShiftTo(g, x);
	        y.rShiftTo(g, y);
	    }
	    while (x.signum() > 0) {
	        if ((i = x.getLowestSetBit()) > 0) x.rShiftTo(i, x);
	        if ((i = y.getLowestSetBit()) > 0) y.rShiftTo(i, y);
	        if (x.compareTo(y) >= 0) {
	            x.subTo(y, x);
	            x.rShiftTo(1, x);
	        }
	        else {
	            y.subTo(x, y);
	            y.rShiftTo(1, y);
	        }
	    }
	    if (g > 0) y.lShiftTo(g, y);
	    return y;
	}
	
	//(protected) this % n, n < 2^26
	function bnpModInt(n) {
	    if (n <= 0) return 0;
	    var d = this.DV % n, r = (this.s < 0) ? n - 1 : 0;
	    if (this.t > 0)
	        if (d === 0) r = this[0] % n;
	        else for (var i = this.t - 1; i >= 0; --i) r = (d * r + this[i]) % n;
	    return r;
	}
	
	//(public) 1/this % m (HAC 14.61)
	function bnModInverse(m) {
	    var ac = m.isEven();
	    if ((this.isEven() && ac) || m.signum() === 0) return BigInteger.ZERO;
	    var u = m.clone(), v = this.clone();
	    var a = nbv(1), b = nbv(0), c = nbv(0), d = nbv(1);
	    while (u.signum() != 0) {
	        while (u.isEven()) {
	            u.rShiftTo(1, u);
	            if (ac) {
	                if (!a.isEven() || !b.isEven()) {
	                    a.addTo(this, a);
	                    b.subTo(m, b);
	                }
	                a.rShiftTo(1, a);
	            }
	            else if (!b.isEven()) b.subTo(m, b);
	            b.rShiftTo(1, b);
	        }
	        while (v.isEven()) {
	            v.rShiftTo(1, v);
	            if (ac) {
	                if (!c.isEven() || !d.isEven()) {
	                    c.addTo(this, c);
	                    d.subTo(m, d);
	                }
	                c.rShiftTo(1, c);
	            }
	            else if (!d.isEven()) d.subTo(m, d);
	            d.rShiftTo(1, d);
	        }
	        if (u.compareTo(v) >= 0) {
	            u.subTo(v, u);
	            if (ac) a.subTo(c, a);
	            b.subTo(d, b);
	        }
	        else {
	            v.subTo(u, v);
	            if (ac) c.subTo(a, c);
	            d.subTo(b, d);
	        }
	    }
	    if (v.compareTo(BigInteger.ONE) != 0) return BigInteger.ZERO;
	    if (d.compareTo(m) >= 0) return d.subtract(m);
	    if (d.signum() < 0) d.addTo(m, d); else return d;
	    if (d.signum() < 0) return d.add(m); else return d;
	}
	
	var lowprimes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997];
	var lplim = (1 << 26) / lowprimes[lowprimes.length - 1];
	
	//(public) test primality with certainty >= 1-.5^t
	function bnIsProbablePrime(t) {
	    var i, x = this.abs();
	    if (x.t == 1 && x[0] <= lowprimes[lowprimes.length - 1]) {
	        for (i = 0; i < lowprimes.length; ++i)
	            if (x[0] == lowprimes[i]) return true;
	        return false;
	    }
	    if (x.isEven()) return false;
	    i = 1;
	    while (i < lowprimes.length) {
	        var m = lowprimes[i], j = i + 1;
	        while (j < lowprimes.length && m < lplim) m *= lowprimes[j++];
	        m = x.modInt(m);
	        while (i < j) if (m % lowprimes[i++] === 0) return false;
	    }
	    return x.millerRabin(t);
	}
	
	//(protected) true if probably prime (HAC 4.24, Miller-Rabin)
	function bnpMillerRabin(t) {
	    var n1 = this.subtract(BigInteger.ONE);
	    var k = n1.getLowestSetBit();
	    if (k <= 0) return false;
	    var r = n1.shiftRight(k);
	    t = (t + 1) >> 1;
	    if (t > lowprimes.length) t = lowprimes.length;
	    var a = nbi();
	    for (var i = 0; i < t; ++i) {
	        //Pick bases at random, instead of starting at 2
	        a.fromInt(lowprimes[Math.floor(Math.random() * lowprimes.length)]);
	        var y = a.modPow(r, this);
	        if (y.compareTo(BigInteger.ONE) != 0 && y.compareTo(n1) != 0) {
	            var j = 1;
	            while (j++ < k && y.compareTo(n1) != 0) {
	                y = y.modPowInt(2, this);
	                if (y.compareTo(BigInteger.ONE) === 0) return false;
	            }
	            if (y.compareTo(n1) != 0) return false;
	        }
	    }
	    return true;
	}
	
	// protected
	BigInteger.prototype.copyTo = bnpCopyTo;
	BigInteger.prototype.fromInt = bnpFromInt;
	BigInteger.prototype.fromString = bnpFromString;
	BigInteger.prototype.fromByteArray = bnpFromByteArray;
	BigInteger.prototype.fromBuffer = bnpFromBuffer;
	BigInteger.prototype.clamp = bnpClamp;
	BigInteger.prototype.dlShiftTo = bnpDLShiftTo;
	BigInteger.prototype.drShiftTo = bnpDRShiftTo;
	BigInteger.prototype.lShiftTo = bnpLShiftTo;
	BigInteger.prototype.rShiftTo = bnpRShiftTo;
	BigInteger.prototype.subTo = bnpSubTo;
	BigInteger.prototype.multiplyTo = bnpMultiplyTo;
	BigInteger.prototype.squareTo = bnpSquareTo;
	BigInteger.prototype.divRemTo = bnpDivRemTo;
	BigInteger.prototype.invDigit = bnpInvDigit;
	BigInteger.prototype.isEven = bnpIsEven;
	BigInteger.prototype.exp = bnpExp;
	
	BigInteger.prototype.chunkSize = bnpChunkSize;
	BigInteger.prototype.toRadix = bnpToRadix;
	BigInteger.prototype.fromRadix = bnpFromRadix;
	BigInteger.prototype.fromNumber = bnpFromNumber;
	BigInteger.prototype.bitwiseTo = bnpBitwiseTo;
	BigInteger.prototype.changeBit = bnpChangeBit;
	BigInteger.prototype.addTo = bnpAddTo;
	BigInteger.prototype.dMultiply = bnpDMultiply;
	BigInteger.prototype.dAddOffset = bnpDAddOffset;
	BigInteger.prototype.multiplyLowerTo = bnpMultiplyLowerTo;
	BigInteger.prototype.multiplyUpperTo = bnpMultiplyUpperTo;
	BigInteger.prototype.modInt = bnpModInt;
	BigInteger.prototype.millerRabin = bnpMillerRabin;
	
	
	// public
	BigInteger.prototype.toString = bnToString;
	BigInteger.prototype.negate = bnNegate;
	BigInteger.prototype.abs = bnAbs;
	BigInteger.prototype.compareTo = bnCompareTo;
	BigInteger.prototype.bitLength = bnBitLength;
	BigInteger.prototype.mod = bnMod;
	BigInteger.prototype.modPowInt = bnModPowInt;
	
	BigInteger.prototype.clone = bnClone;
	BigInteger.prototype.intValue = bnIntValue;
	BigInteger.prototype.byteValue = bnByteValue;
	BigInteger.prototype.shortValue = bnShortValue;
	BigInteger.prototype.signum = bnSigNum;
	BigInteger.prototype.toByteArray = bnToByteArray;
	BigInteger.prototype.toBuffer = bnToBuffer;
	BigInteger.prototype.equals = bnEquals;
	BigInteger.prototype.min = bnMin;
	BigInteger.prototype.max = bnMax;
	BigInteger.prototype.and = bnAnd;
	BigInteger.prototype.or = bnOr;
	BigInteger.prototype.xor = bnXor;
	BigInteger.prototype.andNot = bnAndNot;
	BigInteger.prototype.not = bnNot;
	BigInteger.prototype.shiftLeft = bnShiftLeft;
	BigInteger.prototype.shiftRight = bnShiftRight;
	BigInteger.prototype.getLowestSetBit = bnGetLowestSetBit;
	BigInteger.prototype.bitCount = bnBitCount;
	BigInteger.prototype.testBit = bnTestBit;
	BigInteger.prototype.setBit = bnSetBit;
	BigInteger.prototype.clearBit = bnClearBit;
	BigInteger.prototype.flipBit = bnFlipBit;
	BigInteger.prototype.add = bnAdd;
	BigInteger.prototype.subtract = bnSubtract;
	BigInteger.prototype.multiply = bnMultiply;
	BigInteger.prototype.divide = bnDivide;
	BigInteger.prototype.remainder = bnRemainder;
	BigInteger.prototype.divideAndRemainder = bnDivideAndRemainder;
	BigInteger.prototype.modPow = bnModPow;
	BigInteger.prototype.modInverse = bnModInverse;
	BigInteger.prototype.pow = bnPow;
	BigInteger.prototype.gcd = bnGCD;
	BigInteger.prototype.isProbablePrime = bnIsProbablePrime;
	BigInteger.int2char = int2char;
	
	// "constants"
	BigInteger.ZERO = nbv(0);
	BigInteger.ONE = nbv(1);
	
	// JSBN-specific extension
	BigInteger.prototype.square = bnSquare;
	
	//BigInteger interfaces not implemented in jsbn:
	
	//BigInteger(int signum, byte[] magnitude)
	//double doubleValue()
	//float floatValue()
	//int hashCode()
	//long longValue()
	//static BigInteger valueOf(long val)
	
	module.exports = BigInteger;

/***/ },
/* 195 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
	    pkcs1: __webpack_require__(196),
	    pkcs1_oaep: __webpack_require__(197),
	    pss: __webpack_require__(198),
	
	    /**
	     * Check if scheme has padding methods
	     * @param scheme {string}
	     * @returns {Boolean}
	     */
	    isEncryption: function (scheme) {
	        return module.exports[scheme] && module.exports[scheme].isEncryption;
	    },
	
	    /**
	     * Check if scheme has sign/verify methods
	     * @param scheme {string}
	     * @returns {Boolean}
	     */
	    isSignature: function (scheme) {
	        return module.exports[scheme] && module.exports[scheme].isSignature;
	    }
	};

/***/ },
/* 196 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * PKCS1 padding and signature scheme
	 */
	
	var BigInteger = __webpack_require__(194);
	var crypt = __webpack_require__(193);
	var constants = __webpack_require__(190);
	var SIGN_INFO_HEAD = {
	    md2: new Buffer('3020300c06082a864886f70d020205000410', 'hex'),
	    md5: new Buffer('3020300c06082a864886f70d020505000410', 'hex'),
	    sha1: new Buffer('3021300906052b0e03021a05000414', 'hex'),
	    sha224: new Buffer('302d300d06096086480165030402040500041c', 'hex'),
	    sha256: new Buffer('3031300d060960864801650304020105000420', 'hex'),
	    sha384: new Buffer('3041300d060960864801650304020205000430', 'hex'),
	    sha512: new Buffer('3051300d060960864801650304020305000440', 'hex'),
	    ripemd160: new Buffer('3021300906052b2403020105000414', 'hex'),
	    rmd160: new Buffer('3021300906052b2403020105000414', 'hex')
	};
	
	var SIGN_ALG_TO_HASH_ALIASES = {
	    'ripemd160': 'rmd160'
	};
	
	var DEFAULT_HASH_FUNCTION = 'sha256';
	
	module.exports = {
	    isEncryption: true,
	    isSignature: true
	};
	
	module.exports.makeScheme = function (key, options) {
	    function Scheme(key, options) {
	        this.key = key;
	        this.options = options;
	    }
	
	    Scheme.prototype.maxMessageLength = function () {
	        if (this.options.encryptionSchemeOptions && this.options.encryptionSchemeOptions.padding == constants.RSA_NO_PADDING) {
	            return this.key.encryptedDataLength;
	        }
	        return this.key.encryptedDataLength - 11;
	    };
	
	    /**
	     * Pad input Buffer to encryptedDataLength bytes, and return new Buffer
	     * alg: PKCS#1
	     * @param buffer
	     * @returns {Buffer}
	     */
	    Scheme.prototype.encPad = function (buffer, options) {
	        options = options || {};
	        var filled;
	        if (buffer.length > this.key.maxMessageLength) {
	            throw new Error("Message too long for RSA (n=" + this.key.encryptedDataLength + ", l=" + buffer.length + ")");
	        }
	        if (this.options.encryptionSchemeOptions && this.options.encryptionSchemeOptions.padding == constants.RSA_NO_PADDING) {
	            //RSA_NO_PADDING treated like JAVA left pad with zero character
	            return this.pkcs0pad(buffer);
	        }
	
	        /* Type 1: zeros padding for private key encrypt */
	        if (options.type === 1) {
	            filled = new Buffer(this.key.encryptedDataLength - buffer.length - 1);
	            filled.fill(0xff, 0, filled.length - 1);
	            filled[0] = 1;
	            filled[filled.length - 1] = 0;
	
	            return Buffer.concat([filled, buffer]);
	        } else {
	            /* random padding for public key encrypt */
	            filled = new Buffer(this.key.encryptedDataLength - buffer.length);
	            filled[0] = 0;
	            filled[1] = 2;
	            var rand = crypt.randomBytes(filled.length - 3);
	            for (var i = 0; i < rand.length; i++) {
	                var r = rand[i];
	                while (r === 0) { // non-zero only
	                    r = crypt.randomBytes(1)[0];
	                }
	                filled[i + 2] = r;
	            }
	            filled[filled.length - 1] = 0;
	            return Buffer.concat([filled, buffer]);
	        }
	    };
	
	    /**
	     * Unpad input Buffer and, if valid, return the Buffer object
	     * alg: PKCS#1 (type 2, random)
	     * @param buffer
	     * @returns {Buffer}
	     */
	    Scheme.prototype.encUnPad = function (buffer, options) {
	        options = options || {};
	        var i = 0;
	
	        if (this.options.encryptionSchemeOptions && this.options.encryptionSchemeOptions.padding == constants.RSA_NO_PADDING) {
	            //RSA_NO_PADDING treated like JAVA left pad with zero character
	            return this.pkcs0unpad(buffer);
	        }
	
	        if (buffer.length < 4) {
	            return null;
	        }
	
	        /* Type 1: zeros padding for private key decrypt */
	        if (options.type === 1) {
	            if (buffer[0] !== 0 && buffer[1] !== 1) {
	                return null;
	            }
	            i = 3;
	            while (buffer[i] !== 0) {
	                if (buffer[i] != 0xFF || ++i >= buffer.length) {
	                    return null;
	                }
	            }
	        } else {
	            /* random padding for public key decrypt */
	            if (buffer[0] !== 0 && buffer[1] !== 2) {
	                return null;
	            }
	            i = 3;
	            while (buffer[i] !== 0) {
	                if (++i >= buffer.length) {
	                    return null;
	                }
	            }
	        }
	        return buffer.slice(i + 1, buffer.length);
	    };
	
	    Scheme.prototype.sign = function (buffer) {
	        var hashAlgorithm = this.options.signingSchemeOptions.hash || DEFAULT_HASH_FUNCTION;
	        if (this.options.environment === 'browser') {
	            hashAlgorithm = SIGN_ALG_TO_HASH_ALIASES[hashAlgorithm] || hashAlgorithm;
	
	            var hasher = crypt.createHash(hashAlgorithm);
	            hasher.update(buffer);
	            var hash = this.pkcs1pad(hasher.digest(), hashAlgorithm);
	            var res = this.key.$doPrivate(new BigInteger(hash)).toBuffer(this.key.encryptedDataLength);
	
	            return res;
	        } else {
	            var signer = crypt.createSign('RSA-' + hashAlgorithm.toUpperCase());
	            signer.update(buffer);
	            return signer.sign(this.options.rsaUtils.exportKey('private'));
	        }
	    };
	
	    Scheme.prototype.verify = function (buffer, signature, signature_encoding) {
	        if (this.options.encryptionSchemeOptions && this.options.encryptionSchemeOptions.padding == constants.RSA_NO_PADDING) {
	            //RSA_NO_PADDING has no verify data
	            return false;
	        }
	        var hashAlgorithm = this.options.signingSchemeOptions.hash || DEFAULT_HASH_FUNCTION;
	        if (this.options.environment === 'browser') {
	            hashAlgorithm = SIGN_ALG_TO_HASH_ALIASES[hashAlgorithm] || hashAlgorithm;
	
	            if (signature_encoding) {
	                signature = new Buffer(signature, signature_encoding);
	            }
	
	            var hasher = crypt.createHash(hashAlgorithm);
	            hasher.update(buffer);
	            var hash = this.pkcs1pad(hasher.digest(), hashAlgorithm);
	            var m = this.key.$doPublic(new BigInteger(signature));
	
	            return m.toBuffer().toString('hex') == hash.toString('hex');
	        } else {
	            var verifier = crypt.createVerify('RSA-' + hashAlgorithm.toUpperCase());
	            verifier.update(buffer);
	            return verifier.verify(this.options.rsaUtils.exportKey('public'), signature, signature_encoding);
	        }
	    };
	
	    /**
	     * PKCS#1 zero pad input buffer to max data length
	     * @param hashBuf
	     * @param hashAlgorithm
	     * @returns {*}
	     */
	    Scheme.prototype.pkcs0pad = function (buffer) {
	        var filled = new Buffer(this.key.maxMessageLength - buffer.length);
	        filled.fill(0);
	        return Buffer.concat([filled, buffer]);
	
	        return filled;
	    };
	
	    Scheme.prototype.pkcs0unpad = function (buffer) {
	        var unPad;
	        if (typeof buffer.lastIndexOf == "function") { //patch for old node version
	            unPad = buffer.slice(buffer.lastIndexOf('\0') + 1, buffer.length);
	        } else {
	            unPad = buffer.slice(String.prototype.lastIndexOf.call(buffer, '\0') + 1, buffer.length);
	        }
	
	        return unPad;
	    };
	
	    /**
	     * PKCS#1 pad input buffer to max data length
	     * @param hashBuf
	     * @param hashAlgorithm
	     * @returns {*}
	     */
	    Scheme.prototype.pkcs1pad = function (hashBuf, hashAlgorithm) {
	        var digest = SIGN_INFO_HEAD[hashAlgorithm];
	        if (!digest) {
	            throw Error('Unsupported hash algorithm');
	        }
	
	        var data = Buffer.concat([digest, hashBuf]);
	
	        if (data.length + 10 > this.key.encryptedDataLength) {
	            throw Error('Key is too short for signing algorithm (' + hashAlgorithm + ')');
	        }
	
	        var filled = new Buffer(this.key.encryptedDataLength - data.length - 1);
	        filled.fill(0xff, 0, filled.length - 1);
	        filled[0] = 1;
	        filled[filled.length - 1] = 0;
	
	        var res = Buffer.concat([filled, data]);
	
	        return res;
	    };
	
	    return new Scheme(key, options);
	};
	
	


/***/ },
/* 197 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * PKCS_OAEP signature scheme
	 */
	
	var BigInteger = __webpack_require__(194);
	var crypt = __webpack_require__(193);
	
	module.exports = {
	    isEncryption: true,
	    isSignature: false
	};
	
	module.exports.digestLength = {
	    md4: 16,
	    md5: 16,
	    ripemd160: 20,
	    rmd160: 20,
	    sha: 20,
	    sha1: 20,
	    sha224: 28,
	    sha256: 32,
	    sha384: 48,
	    sha512: 64
	};
	
	var DEFAULT_HASH_FUNCTION = 'sha1';
	
	/*
	 * OAEP Mask Generation Function 1
	 * Generates a buffer full of pseudorandom bytes given seed and maskLength.
	 * Giving the same seed, maskLength, and hashFunction will result in the same exact byte values in the buffer.
	 *
	 * https://tools.ietf.org/html/rfc3447#appendix-B.2.1
	 *
	 * Parameters:
	 * seed			[Buffer]	The pseudo random seed for this function
	 * maskLength	[int]		The length of the output
	 * hashFunction	[String]	The hashing function to use. Will accept any valid crypto hash. Default "sha1"
	 *		Supports "sha1" and "sha256".
	 *		To add another algorythm the algorythem must be accepted by crypto.createHash, and then the length of the output of the hash function (the digest) must be added to the digestLength object below.
	 *		Most RSA implementations will be expecting sha1
	 */
	module.exports.eme_oaep_mgf1 = function (seed, maskLength, hashFunction) {
	    hashFunction = hashFunction || DEFAULT_HASH_FUNCTION;
	    var hLen = module.exports.digestLength[hashFunction];
	    var count = Math.ceil(maskLength / hLen);
	    var T = new Buffer(hLen * count);
	    var c = new Buffer(4);
	    for (var i = 0; i < count; ++i) {
	        var hash = crypt.createHash(hashFunction);
	        hash.update(seed);
	        c.writeUInt32BE(i, 0);
	        hash.update(c);
	        hash.digest().copy(T, i * hLen);
	    }
	    return T.slice(0, maskLength);
	};
	
	module.exports.makeScheme = function (key, options) {
	    function Scheme(key, options) {
	        this.key = key;
	        this.options = options;
	    }
	
	    Scheme.prototype.maxMessageLength = function () {
	        return this.key.encryptedDataLength - 2 * module.exports.digestLength[this.options.encryptionSchemeOptions.hash || DEFAULT_HASH_FUNCTION] - 2;
	    };
	
	    /**
	     * Pad input
	     * alg: PKCS1_OAEP
	     *
	     * https://tools.ietf.org/html/rfc3447#section-7.1.1
	     */
	    Scheme.prototype.encPad = function (buffer) {
	        var hash = this.options.encryptionSchemeOptions.hash || DEFAULT_HASH_FUNCTION;
	        var mgf = this.options.encryptionSchemeOptions.mgf || module.exports.eme_oaep_mgf1;
	        var label = this.options.encryptionSchemeOptions.label || new Buffer(0);
	        var emLen = this.key.encryptedDataLength;
	
	        var hLen = module.exports.digestLength[hash];
	
	        // Make sure we can put message into an encoded message of emLen bytes
	        if (buffer.length > emLen - 2 * hLen - 2) {
	            throw new Error("Message is too long to encode into an encoded message with a length of " + emLen + " bytes, increase" +
	            "emLen to fix this error (minimum value for given parameters and options: " + (emLen - 2 * hLen - 2) + ")");
	        }
	
	        var lHash = crypt.createHash(hash);
	        lHash.update(label);
	        lHash = lHash.digest();
	
	        var PS = new Buffer(emLen - buffer.length - 2 * hLen - 1); // Padding "String"
	        PS.fill(0); // Fill the buffer with octets of 0
	        PS[PS.length - 1] = 1;
	
	        var DB = Buffer.concat([lHash, PS, buffer]);
	        var seed = crypt.randomBytes(hLen);
	
	        // mask = dbMask
	        var mask = mgf(seed, DB.length, hash);
	        // XOR DB and dbMask together.
	        for (var i = 0; i < DB.length; i++) {
	            DB[i] ^= mask[i];
	        }
	        // DB = maskedDB
	
	        // mask = seedMask
	        mask = mgf(DB, hLen, hash);
	        // XOR seed and seedMask together.
	        for (i = 0; i < seed.length; i++) {
	            seed[i] ^= mask[i];
	        }
	        // seed = maskedSeed
	
	        var em = new Buffer(1 + seed.length + DB.length);
	        em[0] = 0;
	        seed.copy(em, 1);
	        DB.copy(em, 1 + seed.length);
	
	        return em;
	    };
	
	    /**
	     * Unpad input
	     * alg: PKCS1_OAEP
	     *
	     * Note: This method works within the buffer given and modifies the values. It also returns a slice of the EM as the return Message.
	     * If the implementation requires that the EM parameter be unmodified then the implementation should pass in a clone of the EM buffer.
	     *
	     * https://tools.ietf.org/html/rfc3447#section-7.1.2
	     */
	    Scheme.prototype.encUnPad = function (buffer) {
	        var hash = this.options.encryptionSchemeOptions.hash || DEFAULT_HASH_FUNCTION;
	        var mgf = this.options.encryptionSchemeOptions.mgf || module.exports.eme_oaep_mgf1;
	        var label = this.options.encryptionSchemeOptions.label || new Buffer(0);
	
	        var hLen = module.exports.digestLength[hash];
	
	        // Check to see if buffer is a properly encoded OAEP message
	        if (buffer.length < 2 * hLen + 2) {
	            throw new Error("Error decoding message, the supplied message is not long enough to be a valid OAEP encoded message");
	        }
	
	        var seed = buffer.slice(1, hLen + 1);	// seed = maskedSeed
	        var DB = buffer.slice(1 + hLen);		// DB = maskedDB
	
	        var mask = mgf(DB, hLen, hash); // seedMask
	        // XOR maskedSeed and seedMask together to get the original seed.
	        for (var i = 0; i < seed.length; i++) {
	            seed[i] ^= mask[i];
	        }
	
	        mask = mgf(seed, DB.length, hash); // dbMask
	        // XOR DB and dbMask together to get the original data block.
	        for (i = 0; i < DB.length; i++) {
	            DB[i] ^= mask[i];
	        }
	
	        var lHash = crypt.createHash(hash);
	        lHash.update(label);
	        lHash = lHash.digest();
	
	        var lHashEM = DB.slice(0, hLen);
	        if (lHashEM.toString("hex") != lHash.toString("hex")) {
	            throw new Error("Error decoding message, the lHash calculated from the label provided and the lHash in the encrypted data do not match.");
	        }
	
	        // Filter out padding
	        i = hLen;
	        while (DB[i++] === 0 && i < DB.length);
	        if (DB[i - 1] != 1) {
	            throw new Error("Error decoding message, there is no padding message separator byte");
	        }
	
	        return DB.slice(i); // Message
	    };
	
	    return new Scheme(key, options);
	};


/***/ },
/* 198 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * PSS signature scheme
	 */
	
	var BigInteger = __webpack_require__(194);
	var crypt = __webpack_require__(193);
	
	module.exports = {
	    isEncryption: false,
	    isSignature: true
	};
	
	var DEFAULT_HASH_FUNCTION = 'sha1';
	var DEFAULT_SALT_LENGTH = 20;
	
	module.exports.makeScheme = function (key, options) {
	    var OAEP = __webpack_require__(195).pkcs1_oaep;
	
	    /**
	     * @param key
	     * @param options
	     * options    [Object]    An object that contains the following keys that specify certain options for encoding.
	     *  └>signingSchemeOptions
	     *     ├>hash    [String]    Hash function to use when encoding and generating masks. Must be a string accepted by node's crypto.createHash function. (default = "sha1")
	     *     ├>mgf    [function]    The mask generation function to use when encoding. (default = mgf1SHA1)
	     *     └>sLen    [uint]        The length of the salt to generate. (default = 20)
	     * @constructor
	     */
	    function Scheme(key, options) {
	        this.key = key;
	        this.options = options;
	    }
	
	    Scheme.prototype.sign = function (buffer) {
	        var mHash = crypt.createHash(this.options.signingSchemeOptions.hash || DEFAULT_HASH_FUNCTION);
	        mHash.update(buffer);
	
	        var encoded = this.emsa_pss_encode(mHash.digest(), this.key.keySize - 1);
	        return this.key.$doPrivate(new BigInteger(encoded)).toBuffer(this.key.encryptedDataLength);
	    };
	
	    Scheme.prototype.verify = function (buffer, signature, signature_encoding) {
	        if (signature_encoding) {
	            signature = new Buffer(signature, signature_encoding);
	        }
	        signature = new BigInteger(signature);
	
	        var emLen = Math.ceil((this.key.keySize - 1) / 8);
	        var m = this.key.$doPublic(signature).toBuffer(emLen);
	
	        var mHash = crypt.createHash(this.options.signingSchemeOptions.hash || DEFAULT_HASH_FUNCTION);
	        mHash.update(buffer);
	
	        return this.emsa_pss_verify(mHash.digest(), m, this.key.keySize - 1);
	    };
	
	    /*
	     * https://tools.ietf.org/html/rfc3447#section-9.1.1
	     *
	     * mHash	[Buffer]	Hashed message to encode
	     * emBits	[uint]		Maximum length of output in bits. Must be at least 8hLen + 8sLen + 9 (hLen = Hash digest length in bytes | sLen = length of salt in bytes)
	     * @returns {Buffer} The encoded message
	     */
	    Scheme.prototype.emsa_pss_encode = function (mHash, emBits) {
	        var hash = this.options.signingSchemeOptions.hash || DEFAULT_HASH_FUNCTION;
	        var mgf = this.options.signingSchemeOptions.mgf || OAEP.eme_oaep_mgf1;
	        var sLen = this.options.signingSchemeOptions.saltLength || DEFAULT_SALT_LENGTH;
	
	        var hLen = OAEP.digestLength[hash];
	        var emLen = Math.ceil(emBits / 8);
	
	        if (emLen < hLen + sLen + 2) {
	            throw new Error("Output length passed to emBits(" + emBits + ") is too small for the options " +
	                "specified(" + hash + ", " + sLen + "). To fix this issue increase the value of emBits. (minimum size: " +
	                (8 * hLen + 8 * sLen + 9) + ")"
	            );
	        }
	
	        var salt = crypt.randomBytes(sLen);
	
	        var Mapostrophe = new Buffer(8 + hLen + sLen);
	        Mapostrophe.fill(0, 0, 8);
	        mHash.copy(Mapostrophe, 8);
	        salt.copy(Mapostrophe, 8 + mHash.length);
	
	        var H = crypt.createHash(hash);
	        H.update(Mapostrophe);
	        H = H.digest();
	
	        var PS = new Buffer(emLen - salt.length - hLen - 2);
	        PS.fill(0);
	
	        var DB = new Buffer(PS.length + 1 + salt.length);
	        PS.copy(DB);
	        DB[PS.length] = 0x01;
	        salt.copy(DB, PS.length + 1);
	
	        var dbMask = mgf(H, DB.length, hash);
	
	        // XOR DB and dbMask together
	        var maskedDB = new Buffer(DB.length);
	        for (var i = 0; i < dbMask.length; i++) {
	            maskedDB[i] = DB[i] ^ dbMask[i];
	        }
	
	        var bits = 8 * emLen - emBits;
	        var mask = 255 ^ (255 >> 8 - bits << 8 - bits);
	        maskedDB[0] = maskedDB[0] & mask;
	
	        var EM = new Buffer(maskedDB.length + H.length + 1);
	        maskedDB.copy(EM, 0);
	        H.copy(EM, maskedDB.length);
	        EM[EM.length - 1] = 0xbc;
	
	        return EM;
	    };
	
	    /*
	     * https://tools.ietf.org/html/rfc3447#section-9.1.2
	     *
	     * mHash	[Buffer]	Hashed message
	     * EM		[Buffer]	Signature
	     * emBits	[uint]		Length of EM in bits. Must be at least 8hLen + 8sLen + 9 to be a valid signature. (hLen = Hash digest length in bytes | sLen = length of salt in bytes)
	     * @returns {Boolean} True if signature(EM) matches message(M)
	     */
	    Scheme.prototype.emsa_pss_verify = function (mHash, EM, emBits) {
	        var hash = this.options.signingSchemeOptions.hash || DEFAULT_HASH_FUNCTION;
	        var mgf = this.options.signingSchemeOptions.mgf || OAEP.eme_oaep_mgf1;
	        var sLen = this.options.signingSchemeOptions.saltLength || DEFAULT_SALT_LENGTH;
	
	        var hLen = OAEP.digestLength[hash];
	        var emLen = Math.ceil(emBits / 8);
	
	        if (emLen < hLen + sLen + 2 || EM[EM.length - 1] != 0xbc) {
	            return false;
	        }
	
	        var DB = new Buffer(emLen - hLen - 1);
	        EM.copy(DB, 0, 0, emLen - hLen - 1);
	
	        var mask = 0;
	        for (var i = 0, bits = 8 * emLen - emBits; i < bits; i++) {
	            mask |= 1 << (7 - i);
	        }
	
	        if ((DB[0] & mask) !== 0) {
	            return false;
	        }
	
	        var H = EM.slice(emLen - hLen - 1, emLen - 1);
	        var dbMask = mgf(H, DB.length, hash);
	
	        // Unmask DB
	        for (i = 0; i < DB.length; i++) {
	            DB[i] ^= dbMask[i];
	        }
	
	        bits = 8 * emLen - emBits;
	        mask = 255 ^ (255 >> 8 - bits << 8 - bits);
	        DB[0] = DB[0] & mask;
	
	        // Filter out padding
	        for (i = 0; DB[i] === 0 && i < DB.length; i++);
	        if (DB[i] != 1) {
	            return false;
	        }
	
	        var salt = DB.slice(DB.length - sLen);
	
	        var Mapostrophe = new Buffer(8 + hLen + sLen);
	        Mapostrophe.fill(0, 0, 8);
	        mHash.copy(Mapostrophe, 8);
	        salt.copy(Mapostrophe, 8 + mHash.length);
	
	        var Hapostrophe = crypt.createHash(hash);
	        Hapostrophe.update(Mapostrophe);
	        Hapostrophe = Hapostrophe.digest();
	
	        return H.toString("hex") === Hapostrophe.toString("hex");
	    };
	
	    return new Scheme(key, options);
	};


/***/ },
/* 199 */
/***/ function(module, exports, __webpack_require__) {

	var crypt = __webpack_require__(193);
	
	module.exports = {
	    getEngine: function (keyPair, options) {
	        var engine = __webpack_require__(200);
	        if (options.environment === 'node') {
	            if (typeof crypt.publicEncrypt === 'function' && typeof crypt.privateDecrypt === 'function') {
	                if (typeof crypt.privateEncrypt === 'function' && typeof crypt.publicDecrypt === 'function') {
	                    engine = __webpack_require__(201);
	                } else {
	                    engine = __webpack_require__(202);
	                }
	            }
	        }
	        return engine(keyPair, options);
	    }
	};

/***/ },
/* 200 */
/***/ function(module, exports, __webpack_require__) {

	var BigInteger = __webpack_require__(194);
	var schemes = __webpack_require__(195);
	
	module.exports = function (keyPair, options) {
	    var pkcs1Scheme = schemes.pkcs1.makeScheme(keyPair, options);
	
	    return {
	        encrypt: function (buffer, usePrivate) {
	            var m, c;
	            if (usePrivate) {
	                /* Type 1: zeros padding for private key encrypt */
	                m = new BigInteger(pkcs1Scheme.encPad(buffer, {type: 1}));
	                c = keyPair.$doPrivate(m);
	            } else {
	                m = new BigInteger(keyPair.encryptionScheme.encPad(buffer));
	                c = keyPair.$doPublic(m);
	            }
	            return c.toBuffer(keyPair.encryptedDataLength);
	        },
	
	        decrypt: function (buffer, usePublic) {
	            var m, c = new BigInteger(buffer);
	
	            if (usePublic) {
	                m = keyPair.$doPublic(c);
	                /* Type 1: zeros padding for private key decrypt */
	                return pkcs1Scheme.encUnPad(m.toBuffer(keyPair.encryptedDataLength), {type: 1});
	            } else {
	                m = keyPair.$doPrivate(c);
	                return keyPair.encryptionScheme.encUnPad(m.toBuffer(keyPair.encryptedDataLength));
	            }
	        }
	    };
	};

/***/ },
/* 201 */
/***/ function(module, exports, __webpack_require__) {

	var crypto = __webpack_require__(193);
	var constants = __webpack_require__(190);
	var schemes = __webpack_require__(195);
	
	module.exports = function (keyPair, options) {
	    var pkcs1Scheme = schemes.pkcs1.makeScheme(keyPair, options);
	
	    return {
	        encrypt: function (buffer, usePrivate) {
	            if (usePrivate) {
	                var padding = constants.RSA_PKCS1_PADDING;
	                if (options.encryptionSchemeOptions && options.encryptionSchemeOptions.padding) {
	                    padding = options.encryptionSchemeOptions.padding;
	                }
	                return crypto.privateEncrypt({
	                    key: options.rsaUtils.exportKey('private'),
	                    padding: padding
	                }, buffer);
	            } else {
	                var padding = constants.RSA_PKCS1_OAEP_PADDING;
	                if (options.encryptionScheme === 'pkcs1') {
	                    padding = constants.RSA_PKCS1_PADDING;
	                }
	                if (options.encryptionSchemeOptions && options.encryptionSchemeOptions.padding) {
	                    padding = options.encryptionSchemeOptions.padding;
	                }
	
	                var data = buffer;
	                if (padding === constants.RSA_NO_PADDING) {
	                    data = pkcs1Scheme.pkcs0pad(buffer);
	                }
	
	                return crypto.publicEncrypt({
	                    key: options.rsaUtils.exportKey('public'),
	                    padding: padding
	                }, data);
	            }
	        },
	
	        decrypt: function (buffer, usePublic) {
	            if (usePublic) {
	                var padding = constants.RSA_PKCS1_PADDING;
	                if (options.encryptionSchemeOptions && options.encryptionSchemeOptions.padding) {
	                    padding = options.encryptionSchemeOptions.padding;
	                }
	                return crypto.publicDecrypt({
	                    key: options.rsaUtils.exportKey('public'),
	                    padding: padding
	                }, buffer);
	            } else {
	                var padding = constants.RSA_PKCS1_OAEP_PADDING;
	                if (options.encryptionScheme === 'pkcs1') {
	                    padding = constants.RSA_PKCS1_PADDING;
	                }
	                if (options.encryptionSchemeOptions && options.encryptionSchemeOptions.padding) {
	                    padding = options.encryptionSchemeOptions.padding;
	                }
	                var res = crypto.privateDecrypt({
	                    key: options.rsaUtils.exportKey('private'),
	                    padding: padding
	                }, buffer);
	
	                if (padding === constants.RSA_NO_PADDING) {
	                    return pkcs1Scheme.pkcs0unpad(res);
	                }
	                return res;
	            }
	        }
	    };
	};

/***/ },
/* 202 */
/***/ function(module, exports, __webpack_require__) {

	var crypto = __webpack_require__(193);
	var constants = __webpack_require__(190);
	var schemes = __webpack_require__(195);
	
	module.exports = function (keyPair, options) {
	    var jsEngine = __webpack_require__(200)(keyPair, options);
	    var pkcs1Scheme = schemes.pkcs1.makeScheme(keyPair, options);
	
	    return {
	        encrypt: function (buffer, usePrivate) {
	            if (usePrivate) {
	                return jsEngine.encrypt(buffer, usePrivate);
	            }
	            var padding = constants.RSA_PKCS1_OAEP_PADDING;
	            if (options.encryptionScheme === 'pkcs1') {
	                padding = constants.RSA_PKCS1_PADDING;
	            }
	            if (options.encryptionSchemeOptions && options.encryptionSchemeOptions.padding) {
	                padding = options.encryptionSchemeOptions.padding;
	            }
	
	            var data = buffer;
	            if (padding === constants.RSA_NO_PADDING) {
	                data = pkcs1Scheme.pkcs0pad(buffer);
	            }
	
	            return crypto.publicEncrypt({
	                key: options.rsaUtils.exportKey('public'),
	                padding: padding
	            }, data);
	        },
	
	        decrypt: function (buffer, usePublic) {
	            if (usePublic) {
	                return jsEngine.decrypt(buffer, usePublic);
	            }
	            var padding = constants.RSA_PKCS1_OAEP_PADDING;
	            if (options.encryptionScheme === 'pkcs1') {
	                padding = constants.RSA_PKCS1_PADDING;
	            }
	            if (options.encryptionSchemeOptions && options.encryptionSchemeOptions.padding) {
	                padding = options.encryptionSchemeOptions.padding;
	            }
	
	            var res = crypto.privateDecrypt({
	                key: options.rsaUtils.exportKey('private'),
	                padding: padding
	            }, buffer);
	
	            if (padding === constants.RSA_NO_PADDING) {
	                return pkcs1Scheme.pkcs0unpad(res);
	            }
	            return res;
	        }
	    };
	};

/***/ },
/* 203 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright 2011 Mark Cavage <mcavage@gmail.com> All rights reserved.
	
	// If you have no idea what ASN.1 or BER is, see this:
	// ftp://ftp.rsa.com/pub/pkcs/ascii/layman.asc
	
	var Ber = __webpack_require__(204);
	
	
	
	///--- Exported API
	
	module.exports = {
	
	  Ber: Ber,
	
	  BerReader: Ber.Reader,
	
	  BerWriter: Ber.Writer
	
	};


/***/ },
/* 204 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright 2011 Mark Cavage <mcavage@gmail.com> All rights reserved.
	
	var errors = __webpack_require__(205);
	var types = __webpack_require__(206);
	
	var Reader = __webpack_require__(207);
	var Writer = __webpack_require__(209);
	
	
	///--- Exports
	
	module.exports = {
	
	  Reader: Reader,
	
	  Writer: Writer
	
	};
	
	for (var t in types) {
	  if (types.hasOwnProperty(t))
	    module.exports[t] = types[t];
	}
	for (var e in errors) {
	  if (errors.hasOwnProperty(e))
	    module.exports[e] = errors[e];
	}


/***/ },
/* 205 */
/***/ function(module, exports) {

	// Copyright 2011 Mark Cavage <mcavage@gmail.com> All rights reserved.
	
	
	module.exports = {
	
	  newInvalidAsn1Error: function(msg) {
	    var e = new Error();
	    e.name = 'InvalidAsn1Error';
	    e.message = msg || '';
	    return e;
	  }
	
	};


/***/ },
/* 206 */
/***/ function(module, exports) {

	// Copyright 2011 Mark Cavage <mcavage@gmail.com> All rights reserved.
	
	
	module.exports = {
	  EOC: 0,
	  Boolean: 1,
	  Integer: 2,
	  BitString: 3,
	  OctetString: 4,
	  Null: 5,
	  OID: 6,
	  ObjectDescriptor: 7,
	  External: 8,
	  Real: 9, // float
	  Enumeration: 10,
	  PDV: 11,
	  Utf8String: 12,
	  RelativeOID: 13,
	  Sequence: 16,
	  Set: 17,
	  NumericString: 18,
	  PrintableString: 19,
	  T61String: 20,
	  VideotexString: 21,
	  IA5String: 22,
	  UTCTime: 23,
	  GeneralizedTime: 24,
	  GraphicString: 25,
	  VisibleString: 26,
	  GeneralString: 28,
	  UniversalString: 29,
	  CharacterString: 30,
	  BMPString: 31,
	  Constructor: 32,
	  Context: 128
	};


/***/ },
/* 207 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright 2011 Mark Cavage <mcavage@gmail.com> All rights reserved.
	
	var assert = __webpack_require__(208);
	
	var ASN1 = __webpack_require__(206);
	var errors = __webpack_require__(205);
	
	
	///--- Globals
	
	var newInvalidAsn1Error = errors.newInvalidAsn1Error;
	
	
	
	///--- API
	
	function Reader(data) {
	  if (!data || !Buffer.isBuffer(data))
	    throw new TypeError('data must be a node Buffer');
	
	  this._buf = data;
	  this._size = data.length;
	
	  // These hold the "current" state
	  this._len = 0;
	  this._offset = 0;
	}
	
	Object.defineProperty(Reader.prototype, 'length', {
	  enumerable: true,
	  get: function () { return (this._len); }
	});
	
	Object.defineProperty(Reader.prototype, 'offset', {
	  enumerable: true,
	  get: function () { return (this._offset); }
	});
	
	Object.defineProperty(Reader.prototype, 'remain', {
	  get: function () { return (this._size - this._offset); }
	});
	
	Object.defineProperty(Reader.prototype, 'buffer', {
	  get: function () { return (this._buf.slice(this._offset)); }
	});
	
	
	/**
	 * Reads a single byte and advances offset; you can pass in `true` to make this
	 * a "peek" operation (i.e., get the byte, but don't advance the offset).
	 *
	 * @param {Boolean} peek true means don't move offset.
	 * @return {Number} the next byte, null if not enough data.
	 */
	Reader.prototype.readByte = function(peek) {
	  if (this._size - this._offset < 1)
	    return null;
	
	  var b = this._buf[this._offset] & 0xff;
	
	  if (!peek)
	    this._offset += 1;
	
	  return b;
	};
	
	
	Reader.prototype.peek = function() {
	  return this.readByte(true);
	};
	
	
	/**
	 * Reads a (potentially) variable length off the BER buffer.  This call is
	 * not really meant to be called directly, as callers have to manipulate
	 * the internal buffer afterwards.
	 *
	 * As a result of this call, you can call `Reader.length`, until the
	 * next thing called that does a readLength.
	 *
	 * @return {Number} the amount of offset to advance the buffer.
	 * @throws {InvalidAsn1Error} on bad ASN.1
	 */
	Reader.prototype.readLength = function(offset) {
	  if (offset === undefined)
	    offset = this._offset;
	
	  if (offset >= this._size)
	    return null;
	
	  var lenB = this._buf[offset++] & 0xff;
	  if (lenB === null)
	    return null;
	
	  if ((lenB & 0x80) == 0x80) {
	    lenB &= 0x7f;
	
	    if (lenB == 0)
	      throw newInvalidAsn1Error('Indefinite length not supported');
	
	    if (lenB > 4)
	      throw newInvalidAsn1Error('encoding too long');
	
	    if (this._size - offset < lenB)
	      return null;
	
	    this._len = 0;
	    for (var i = 0; i < lenB; i++)
	      this._len = (this._len << 8) + (this._buf[offset++] & 0xff);
	
	  } else {
	    // Wasn't a variable length
	    this._len = lenB;
	  }
	
	  return offset;
	};
	
	
	/**
	 * Parses the next sequence in this BER buffer.
	 *
	 * To get the length of the sequence, call `Reader.length`.
	 *
	 * @return {Number} the sequence's tag.
	 */
	Reader.prototype.readSequence = function(tag) {
	  var seq = this.peek();
	  if (seq === null)
	    return null;
	  if (tag !== undefined && tag !== seq)
	    throw newInvalidAsn1Error('Expected 0x' + tag.toString(16) +
	                              ': got 0x' + seq.toString(16));
	
	  var o = this.readLength(this._offset + 1); // stored in `length`
	  if (o === null)
	    return null;
	
	  this._offset = o;
	  return seq;
	};
	
	
	Reader.prototype.readInt = function() {
	  return this._readTag(ASN1.Integer);
	};
	
	
	Reader.prototype.readBoolean = function() {
	  return (this._readTag(ASN1.Boolean) === 0 ? false : true);
	};
	
	
	Reader.prototype.readEnumeration = function() {
	  return this._readTag(ASN1.Enumeration);
	};
	
	
	Reader.prototype.readString = function(tag, retbuf) {
	  if (!tag)
	    tag = ASN1.OctetString;
	
	  var b = this.peek();
	  if (b === null)
	    return null;
	
	  if (b !== tag)
	    throw newInvalidAsn1Error('Expected 0x' + tag.toString(16) +
	                              ': got 0x' + b.toString(16));
	
	  var o = this.readLength(this._offset + 1); // stored in `length`
	
	  if (o === null)
	    return null;
	
	  if (this.length > this._size - o)
	    return null;
	
	  this._offset = o;
	
	  if (this.length === 0)
	    return retbuf ? new Buffer(0) : '';
	
	  var str = this._buf.slice(this._offset, this._offset + this.length);
	  this._offset += this.length;
	
	  return retbuf ? str : str.toString('utf8');
	};
	
	Reader.prototype.readOID = function(tag) {
	  if (!tag)
	    tag = ASN1.OID;
	
	  var b = this.readString(tag, true);
	  if (b === null)
	    return null;
	
	  var values = [];
	  var value = 0;
	
	  for (var i = 0; i < b.length; i++) {
	    var byte = b[i] & 0xff;
	
	    value <<= 7;
	    value += byte & 0x7f;
	    if ((byte & 0x80) == 0) {
	      values.push(value);
	      value = 0;
	    }
	  }
	
	  value = values.shift();
	  values.unshift(value % 40);
	  values.unshift((value / 40) >> 0);
	
	  return values.join('.');
	};
	
	
	Reader.prototype._readTag = function(tag) {
	  assert.ok(tag !== undefined);
	
	  var b = this.peek();
	
	  if (b === null)
	    return null;
	
	  if (b !== tag)
	    throw newInvalidAsn1Error('Expected 0x' + tag.toString(16) +
	                              ': got 0x' + b.toString(16));
	
	  var o = this.readLength(this._offset + 1); // stored in `length`
	  if (o === null)
	    return null;
	
	  if (this.length > 4)
	    throw newInvalidAsn1Error('Integer too long: ' + this.length);
	
	  if (this.length > this._size - o)
	    return null;
	  this._offset = o;
	
	  var fb = this._buf[this._offset];
	  var value = 0;
	
	  for (var i = 0; i < this.length; i++) {
	    value <<= 8;
	    value |= (this._buf[this._offset++] & 0xff);
	  }
	
	  if ((fb & 0x80) == 0x80 && i !== 4)
	    value -= (1 << (i * 8));
	
	  return value >> 0;
	};
	
	
	
	///--- Exported API
	
	module.exports = Reader;


/***/ },
/* 208 */
/***/ function(module, exports) {

	module.exports = require("assert");

/***/ },
/* 209 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright 2011 Mark Cavage <mcavage@gmail.com> All rights reserved.
	
	var assert = __webpack_require__(208);
	var ASN1 = __webpack_require__(206);
	var errors = __webpack_require__(205);
	
	
	///--- Globals
	
	var newInvalidAsn1Error = errors.newInvalidAsn1Error;
	
	var DEFAULT_OPTS = {
	  size: 1024,
	  growthFactor: 8
	};
	
	
	///--- Helpers
	
	function merge(from, to) {
	  assert.ok(from);
	  assert.equal(typeof(from), 'object');
	  assert.ok(to);
	  assert.equal(typeof(to), 'object');
	
	  var keys = Object.getOwnPropertyNames(from);
	  keys.forEach(function(key) {
	    if (to[key])
	      return;
	
	    var value = Object.getOwnPropertyDescriptor(from, key);
	    Object.defineProperty(to, key, value);
	  });
	
	  return to;
	}
	
	
	
	///--- API
	
	function Writer(options) {
	  options = merge(DEFAULT_OPTS, options || {});
	
	  this._buf = new Buffer(options.size || 1024);
	  this._size = this._buf.length;
	  this._offset = 0;
	  this._options = options;
	
	  // A list of offsets in the buffer where we need to insert
	  // sequence tag/len pairs.
	  this._seq = [];
	}
	
	Object.defineProperty(Writer.prototype, 'buffer', {
	  get: function () {
	    if (this._seq.length)
	      throw new InvalidAsn1Error(this._seq.length + ' unended sequence(s)');
	
	    return (this._buf.slice(0, this._offset));
	  }
	});
	
	Writer.prototype.writeByte = function(b) {
	  if (typeof(b) !== 'number')
	    throw new TypeError('argument must be a Number');
	
	  this._ensure(1);
	  this._buf[this._offset++] = b;
	};
	
	
	Writer.prototype.writeInt = function(i, tag) {
	  if (typeof(i) !== 'number')
	    throw new TypeError('argument must be a Number');
	  if (typeof(tag) !== 'number')
	    tag = ASN1.Integer;
	
	  var sz = 4;
	
	  while ((((i & 0xff800000) === 0) || ((i & 0xff800000) === 0xff800000 >> 0)) &&
	         (sz > 1)) {
	    sz--;
	    i <<= 8;
	  }
	
	  if (sz > 4)
	    throw new InvalidAsn1Error('BER ints cannot be > 0xffffffff');
	
	  this._ensure(2 + sz);
	  this._buf[this._offset++] = tag;
	  this._buf[this._offset++] = sz;
	
	  while (sz-- > 0) {
	    this._buf[this._offset++] = ((i & 0xff000000) >>> 24);
	    i <<= 8;
	  }
	
	};
	
	
	Writer.prototype.writeNull = function() {
	  this.writeByte(ASN1.Null);
	  this.writeByte(0x00);
	};
	
	
	Writer.prototype.writeEnumeration = function(i, tag) {
	  if (typeof(i) !== 'number')
	    throw new TypeError('argument must be a Number');
	  if (typeof(tag) !== 'number')
	    tag = ASN1.Enumeration;
	
	  return this.writeInt(i, tag);
	};
	
	
	Writer.prototype.writeBoolean = function(b, tag) {
	  if (typeof(b) !== 'boolean')
	    throw new TypeError('argument must be a Boolean');
	  if (typeof(tag) !== 'number')
	    tag = ASN1.Boolean;
	
	  this._ensure(3);
	  this._buf[this._offset++] = tag;
	  this._buf[this._offset++] = 0x01;
	  this._buf[this._offset++] = b ? 0xff : 0x00;
	};
	
	
	Writer.prototype.writeString = function(s, tag) {
	  if (typeof(s) !== 'string')
	    throw new TypeError('argument must be a string (was: ' + typeof(s) + ')');
	  if (typeof(tag) !== 'number')
	    tag = ASN1.OctetString;
	
	  var len = Buffer.byteLength(s);
	  this.writeByte(tag);
	  this.writeLength(len);
	  if (len) {
	    this._ensure(len);
	    this._buf.write(s, this._offset);
	    this._offset += len;
	  }
	};
	
	
	Writer.prototype.writeBuffer = function(buf, tag) {
	  if (typeof(tag) !== 'number')
	    throw new TypeError('tag must be a number');
	  if (!Buffer.isBuffer(buf))
	    throw new TypeError('argument must be a buffer');
	
	  this.writeByte(tag);
	  this.writeLength(buf.length);
	  this._ensure(buf.length);
	  buf.copy(this._buf, this._offset, 0, buf.length);
	  this._offset += buf.length;
	};
	
	
	Writer.prototype.writeStringArray = function(strings) {
	  if ((!strings instanceof Array))
	    throw new TypeError('argument must be an Array[String]');
	
	  var self = this;
	  strings.forEach(function(s) {
	    self.writeString(s);
	  });
	};
	
	// This is really to solve DER cases, but whatever for now
	Writer.prototype.writeOID = function(s, tag) {
	  if (typeof(s) !== 'string')
	    throw new TypeError('argument must be a string');
	  if (typeof(tag) !== 'number')
	    tag = ASN1.OID;
	
	  if (!/^([0-9]+\.){3,}[0-9]+$/.test(s))
	    throw new Error('argument is not a valid OID string');
	
	  function encodeOctet(bytes, octet) {
	    if (octet < 128) {
	        bytes.push(octet);
	    } else if (octet < 16384) {
	        bytes.push((octet >>> 7) | 0x80);
	        bytes.push(octet & 0x7F);
	    } else if (octet < 2097152) {
	      bytes.push((octet >>> 14) | 0x80);
	      bytes.push(((octet >>> 7) | 0x80) & 0xFF);
	      bytes.push(octet & 0x7F);
	    } else if (octet < 268435456) {
	      bytes.push((octet >>> 21) | 0x80);
	      bytes.push(((octet >>> 14) | 0x80) & 0xFF);
	      bytes.push(((octet >>> 7) | 0x80) & 0xFF);
	      bytes.push(octet & 0x7F);
	    } else {
	      bytes.push(((octet >>> 28) | 0x80) & 0xFF);
	      bytes.push(((octet >>> 21) | 0x80) & 0xFF);
	      bytes.push(((octet >>> 14) | 0x80) & 0xFF);
	      bytes.push(((octet >>> 7) | 0x80) & 0xFF);
	      bytes.push(octet & 0x7F);
	    }
	  }
	
	  var tmp = s.split('.');
	  var bytes = [];
	  bytes.push(parseInt(tmp[0], 10) * 40 + parseInt(tmp[1], 10));
	  tmp.slice(2).forEach(function(b) {
	    encodeOctet(bytes, parseInt(b, 10));
	  });
	
	  var self = this;
	  this._ensure(2 + bytes.length);
	  this.writeByte(tag);
	  this.writeLength(bytes.length);
	  bytes.forEach(function(b) {
	    self.writeByte(b);
	  });
	};
	
	
	Writer.prototype.writeLength = function(len) {
	  if (typeof(len) !== 'number')
	    throw new TypeError('argument must be a Number');
	
	  this._ensure(4);
	
	  if (len <= 0x7f) {
	    this._buf[this._offset++] = len;
	  } else if (len <= 0xff) {
	    this._buf[this._offset++] = 0x81;
	    this._buf[this._offset++] = len;
	  } else if (len <= 0xffff) {
	    this._buf[this._offset++] = 0x82;
	    this._buf[this._offset++] = len >> 8;
	    this._buf[this._offset++] = len;
	  } else if (len <= 0xffffff) {
	    this._buf[this._offset++] = 0x83;
	    this._buf[this._offset++] = len >> 16;
	    this._buf[this._offset++] = len >> 8;
	    this._buf[this._offset++] = len;
	  } else {
	    throw new InvalidAsn1ERror('Length too long (> 4 bytes)');
	  }
	};
	
	Writer.prototype.startSequence = function(tag) {
	  if (typeof(tag) !== 'number')
	    tag = ASN1.Sequence | ASN1.Constructor;
	
	  this.writeByte(tag);
	  this._seq.push(this._offset);
	  this._ensure(3);
	  this._offset += 3;
	};
	
	
	Writer.prototype.endSequence = function() {
	  var seq = this._seq.pop();
	  var start = seq + 3;
	  var len = this._offset - start;
	
	  if (len <= 0x7f) {
	    this._shift(start, len, -2);
	    this._buf[seq] = len;
	  } else if (len <= 0xff) {
	    this._shift(start, len, -1);
	    this._buf[seq] = 0x81;
	    this._buf[seq + 1] = len;
	  } else if (len <= 0xffff) {
	    this._buf[seq] = 0x82;
	    this._buf[seq + 1] = len >> 8;
	    this._buf[seq + 2] = len;
	  } else if (len <= 0xffffff) {
	    this._shift(start, len, 1);
	    this._buf[seq] = 0x83;
	    this._buf[seq + 1] = len >> 16;
	    this._buf[seq + 2] = len >> 8;
	    this._buf[seq + 3] = len;
	  } else {
	    throw new InvalidAsn1Error('Sequence too long');
	  }
	};
	
	
	Writer.prototype._shift = function(start, len, shift) {
	  assert.ok(start !== undefined);
	  assert.ok(len !== undefined);
	  assert.ok(shift);
	
	  this._buf.copy(this._buf, start + shift, start, start + len);
	  this._offset += shift;
	};
	
	Writer.prototype._ensure = function(len) {
	  assert.ok(len);
	
	  if (this._size - this._offset < len) {
	    var sz = this._size * this._options.growthFactor;
	    if (sz - this._offset < len)
	      sz += len;
	
	    var buf = new Buffer(sz);
	
	    this._buf.copy(buf, 0, 0, this._offset);
	    this._buf = buf;
	    this._size = sz;
	  }
	};
	
	
	
	///--- Exported API
	
	module.exports = Writer;


/***/ },
/* 210 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(192)._;
	
	function formatParse(format) {
	    format = format.split('-');
	    var keyType = 'private';
	    var keyOpt = {type: 'default'};
	
	    for (var i = 1; i < format.length; i++) {
	        if (format[i]) {
	            switch (format[i]) {
	                case 'public':
	                    keyType = format[i];
	                    break;
	                case 'private':
	                    keyType = format[i];
	                    break;
	                case 'pem':
	                    keyOpt.type = format[i];
	                    break;
	                case 'der':
	                    keyOpt.type = format[i];
	                    break;
	            }
	        }
	    }
	
	    return {scheme: format[0], keyType: keyType, keyOpt: keyOpt};
	}
	
	module.exports = {
	    pkcs1: __webpack_require__(211),
	    pkcs8: __webpack_require__(212),
	    components: __webpack_require__(213),
	
	    isPrivateExport: function (format) {
	        return module.exports[format] && typeof module.exports[format].privateExport === 'function';
	    },
	
	    isPrivateImport: function (format) {
	        return module.exports[format] && typeof module.exports[format].privateImport === 'function';
	    },
	
	    isPublicExport: function (format) {
	        return module.exports[format] && typeof module.exports[format].publicExport === 'function';
	    },
	
	    isPublicImport: function (format) {
	        return module.exports[format] && typeof module.exports[format].publicImport === 'function';
	    },
	
	    detectAndImport: function (key, data, format) {
	        if (format === undefined) {
	            for (var scheme in module.exports) {
	                if (typeof module.exports[scheme].autoImport === 'function' && module.exports[scheme].autoImport(key, data)) {
	                    return true;
	                }
	            }
	        } else if (format) {
	            var fmt = formatParse(format);
	
	            if (module.exports[fmt.scheme]) {
	                if (fmt.keyType === 'private') {
	                    module.exports[fmt.scheme].privateImport(key, data, fmt.keyOpt);
	                } else {
	                    module.exports[fmt.scheme].publicImport(key, data, fmt.keyOpt);
	                }
	            } else {
	                throw Error('Unsupported key format');
	            }
	        }
	
	        return false;
	    },
	
	    detectAndExport: function (key, format) {
	        if (format) {
	            var fmt = formatParse(format);
	
	            if (module.exports[fmt.scheme]) {
	                if (fmt.keyType === 'private') {
	                    if (!key.isPrivate()) {
	                        throw Error("This is not private key");
	                    }
	                    return module.exports[fmt.scheme].privateExport(key, fmt.keyOpt);
	                } else {
	                    if (!key.isPublic()) {
	                        throw Error("This is not public key");
	                    }
	                    return module.exports[fmt.scheme].publicExport(key, fmt.keyOpt);
	                }
	            } else {
	                throw Error('Unsupported key format');
	            }
	        }
	    }
	};

/***/ },
/* 211 */
/***/ function(module, exports, __webpack_require__) {

	var ber = __webpack_require__(203).Ber;
	var _ = __webpack_require__(192)._;
	var utils = __webpack_require__(192);
	
	module.exports = {
	    privateExport: function (key, options) {
	        options = options || {};
	
	        var n = key.n.toBuffer();
	        var d = key.d.toBuffer();
	        var p = key.p.toBuffer();
	        var q = key.q.toBuffer();
	        var dmp1 = key.dmp1.toBuffer();
	        var dmq1 = key.dmq1.toBuffer();
	        var coeff = key.coeff.toBuffer();
	
	        var length = n.length + d.length + p.length + q.length + dmp1.length + dmq1.length + coeff.length + 512; // magic
	        var writer = new ber.Writer({size: length});
	
	        writer.startSequence();
	        writer.writeInt(0);
	        writer.writeBuffer(n, 2);
	        writer.writeInt(key.e);
	        writer.writeBuffer(d, 2);
	        writer.writeBuffer(p, 2);
	        writer.writeBuffer(q, 2);
	        writer.writeBuffer(dmp1, 2);
	        writer.writeBuffer(dmq1, 2);
	        writer.writeBuffer(coeff, 2);
	        writer.endSequence();
	
	        if (options.type === 'der') {
	            return writer.buffer;
	        } else {
	            return '-----BEGIN RSA PRIVATE KEY-----\n' + utils.linebrk(writer.buffer.toString('base64'), 64) + '\n-----END RSA PRIVATE KEY-----';
	        }
	    },
	
	    privateImport: function (key, data, options) {
	        options = options || {};
	        var buffer;
	
	        if (options.type !== 'der') {
	            if (Buffer.isBuffer(data)) {
	                data = data.toString('utf8');
	            }
	
	            if (_.isString(data)) {
	                var pem = data.replace('-----BEGIN RSA PRIVATE KEY-----', '')
	                    .replace('-----END RSA PRIVATE KEY-----', '')
	                    .replace(/\s+|\n\r|\n|\r$/gm, '');
	                buffer = new Buffer(pem, 'base64');
	            } else {
	                throw Error('Unsupported key format');
	            }
	        } else if (Buffer.isBuffer(data)) {
	            buffer = data;
	        } else {
	            throw Error('Unsupported key format');
	        }
	
	        var reader = new ber.Reader(buffer);
	        reader.readSequence();
	        reader.readString(2, true); // just zero
	        key.setPrivate(
	            reader.readString(2, true),  // modulus
	            reader.readString(2, true),  // publicExponent
	            reader.readString(2, true),  // privateExponent
	            reader.readString(2, true),  // prime1
	            reader.readString(2, true),  // prime2
	            reader.readString(2, true),  // exponent1 -- d mod (p1)
	            reader.readString(2, true),  // exponent2 -- d mod (q-1)
	            reader.readString(2, true)   // coefficient -- (inverse of q) mod p
	        );
	    },
	
	    publicExport: function (key, options) {
	        options = options || {};
	
	        var n = key.n.toBuffer();
	        var length = n.length + 512; // magic
	
	        var bodyWriter = new ber.Writer({size: length});
	        bodyWriter.startSequence();
	        bodyWriter.writeBuffer(n, 2);
	        bodyWriter.writeInt(key.e);
	        bodyWriter.endSequence();
	
	        if (options.type === 'der') {
	            return bodyWriter.buffer;
	        } else {
	            return '-----BEGIN RSA PUBLIC KEY-----\n' + utils.linebrk(bodyWriter.buffer.toString('base64'), 64) + '\n-----END RSA PUBLIC KEY-----';
	        }
	    },
	
	    publicImport: function (key, data, options) {
	        options = options || {};
	        var buffer;
	
	        if (options.type !== 'der') {
	            if (Buffer.isBuffer(data)) {
	                data = data.toString('utf8');
	            }
	
	            if (_.isString(data)) {
	                var pem = data.replace('-----BEGIN RSA PUBLIC KEY-----', '')
	                    .replace('-----END RSA PUBLIC KEY-----', '')
	                    .replace(/\s+|\n\r|\n|\r$/gm, '');
	                buffer = new Buffer(pem, 'base64');
	            }
	        } else if (Buffer.isBuffer(data)) {
	            buffer = data;
	        } else {
	            throw Error('Unsupported key format');
	        }
	
	        var body = new ber.Reader(buffer);
	        body.readSequence();
	        key.setPublic(
	            body.readString(0x02, true), // modulus
	            body.readString(0x02, true)  // publicExponent
	        );
	    },
	
	    /**
	     * Trying autodetect and import key
	     * @param key
	     * @param data
	     */
	    autoImport: function (key, data) {
	        if (/^\s*-----BEGIN RSA PRIVATE KEY-----\s*(?=(([A-Za-z0-9+/=]+\s*)+))\1-----END RSA PRIVATE KEY-----\s*$/g.test(data)) {
	            module.exports.privateImport(key, data);
	            return true;
	        }
	
	        if (/^\s*-----BEGIN RSA PUBLIC KEY-----\s*(?=(([A-Za-z0-9+/=]+\s*)+))\1-----END RSA PUBLIC KEY-----\s*$/g.test(data)) {
	            module.exports.publicImport(key, data);
	            return true;
	        }
	
	        return false;
	    }
	};

/***/ },
/* 212 */
/***/ function(module, exports, __webpack_require__) {

	var ber = __webpack_require__(203).Ber;
	var _ = __webpack_require__(192)._;
	var PUBLIC_RSA_OID = '1.2.840.113549.1.1.1';
	var utils = __webpack_require__(192);
	
	module.exports = {
	    privateExport: function (key, options) {
	        options = options || {};
	
	        var n = key.n.toBuffer();
	        var d = key.d.toBuffer();
	        var p = key.p.toBuffer();
	        var q = key.q.toBuffer();
	        var dmp1 = key.dmp1.toBuffer();
	        var dmq1 = key.dmq1.toBuffer();
	        var coeff = key.coeff.toBuffer();
	
	        var length = n.length + d.length + p.length + q.length + dmp1.length + dmq1.length + coeff.length + 512; // magic
	        var bodyWriter = new ber.Writer({size: length});
	
	        bodyWriter.startSequence();
	        bodyWriter.writeInt(0);
	        bodyWriter.writeBuffer(n, 2);
	        bodyWriter.writeInt(key.e);
	        bodyWriter.writeBuffer(d, 2);
	        bodyWriter.writeBuffer(p, 2);
	        bodyWriter.writeBuffer(q, 2);
	        bodyWriter.writeBuffer(dmp1, 2);
	        bodyWriter.writeBuffer(dmq1, 2);
	        bodyWriter.writeBuffer(coeff, 2);
	        bodyWriter.endSequence();
	
	        var writer = new ber.Writer({size: length});
	        writer.startSequence();
	        writer.writeInt(0);
	        writer.startSequence();
	        writer.writeOID(PUBLIC_RSA_OID);
	        writer.writeNull();
	        writer.endSequence();
	        writer.writeBuffer(bodyWriter.buffer, 4);
	        writer.endSequence();
	
	        if (options.type === 'der') {
	            return writer.buffer;
	        } else {
	            return '-----BEGIN PRIVATE KEY-----\n' + utils.linebrk(writer.buffer.toString('base64'), 64) + '\n-----END PRIVATE KEY-----';
	        }
	    },
	
	    privateImport: function (key, data, options) {
	        options = options || {};
	        var buffer;
	
	        if (options.type !== 'der') {
	            if (Buffer.isBuffer(data)) {
	                data = data.toString('utf8');
	            }
	
	            if (_.isString(data)) {
	                var pem = data.replace('-----BEGIN PRIVATE KEY-----', '')
	                    .replace('-----END PRIVATE KEY-----', '')
	                    .replace(/\s+|\n\r|\n|\r$/gm, '');
	                buffer = new Buffer(pem, 'base64');
	            } else {
	                throw Error('Unsupported key format');
	            }
	        } else if (Buffer.isBuffer(data)) {
	            buffer = data;
	        } else {
	            throw Error('Unsupported key format');
	        }
	
	        var reader = new ber.Reader(buffer);
	        reader.readSequence();
	        reader.readInt(0);
	        var header = new ber.Reader(reader.readString(0x30, true));
	
	        if (header.readOID(0x06, true) !== PUBLIC_RSA_OID) {
	            throw Error('Invalid Public key format');
	        }
	
	        var body = new ber.Reader(reader.readString(0x04, true));
	        body.readSequence();
	        body.readString(2, true); // just zero
	        key.setPrivate(
	            body.readString(2, true),  // modulus
	            body.readString(2, true),  // publicExponent
	            body.readString(2, true),  // privateExponent
	            body.readString(2, true),  // prime1
	            body.readString(2, true),  // prime2
	            body.readString(2, true),  // exponent1 -- d mod (p1)
	            body.readString(2, true),  // exponent2 -- d mod (q-1)
	            body.readString(2, true)   // coefficient -- (inverse of q) mod p
	        );
	    },
	
	    publicExport: function (key, options) {
	        options = options || {};
	
	        var n = key.n.toBuffer();
	        var length = n.length + 512; // magic
	
	        var bodyWriter = new ber.Writer({size: length});
	        bodyWriter.writeByte(0);
	        bodyWriter.startSequence();
	        bodyWriter.writeBuffer(n, 2);
	        bodyWriter.writeInt(key.e);
	        bodyWriter.endSequence();
	
	        var writer = new ber.Writer({size: length});
	        writer.startSequence();
	        writer.startSequence();
	        writer.writeOID(PUBLIC_RSA_OID);
	        writer.writeNull();
	        writer.endSequence();
	        writer.writeBuffer(bodyWriter.buffer, 3);
	        writer.endSequence();
	
	        if (options.type === 'der') {
	            return writer.buffer;
	        } else {
	            return '-----BEGIN PUBLIC KEY-----\n' + utils.linebrk(writer.buffer.toString('base64'), 64) + '\n-----END PUBLIC KEY-----';
	        }
	    },
	
	    publicImport: function (key, data, options) {
	        options = options || {};
	        var buffer;
	
	        if (options.type !== 'der') {
	            if (Buffer.isBuffer(data)) {
	                data = data.toString('utf8');
	            }
	
	            if (_.isString(data)) {
	                var pem = data.replace('-----BEGIN PUBLIC KEY-----', '')
	                    .replace('-----END PUBLIC KEY-----', '')
	                    .replace(/\s+|\n\r|\n|\r$/gm, '');
	                buffer = new Buffer(pem, 'base64');
	            }
	        } else if (Buffer.isBuffer(data)) {
	            buffer = data;
	        } else {
	            throw Error('Unsupported key format');
	        }
	
	        var reader = new ber.Reader(buffer);
	        reader.readSequence();
	        var header = new ber.Reader(reader.readString(0x30, true));
	
	        if (header.readOID(0x06, true) !== PUBLIC_RSA_OID) {
	            throw Error('Invalid Public key format');
	        }
	
	        var body = new ber.Reader(reader.readString(0x03, true));
	        body.readByte();
	        body.readSequence();
	        key.setPublic(
	            body.readString(0x02, true), // modulus
	            body.readString(0x02, true)  // publicExponent
	        );
	    },
	
	    /**
	     * Trying autodetect and import key
	     * @param key
	     * @param data
	     */
	    autoImport: function (key, data) {
	        if (/^\s*-----BEGIN PRIVATE KEY-----\s*(?=(([A-Za-z0-9+/=]+\s*)+))\1-----END PRIVATE KEY-----\s*$/g.test(data)) {
	            module.exports.privateImport(key, data);
	            return true;
	        }
	
	        if (/^\s*-----BEGIN PUBLIC KEY-----\s*(?=(([A-Za-z0-9+/=]+\s*)+))\1-----END PUBLIC KEY-----\s*$/g.test(data)) {
	            module.exports.publicImport(key, data);
	            return true;
	        }
	
	        return false;
	    }
	};


/***/ },
/* 213 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(192)._;
	var utils = __webpack_require__(192);
	
	module.exports = {
	    privateExport: function (key, options) {
	        return {
	            n: key.n.toBuffer(),
	            e: key.e,
	            d: key.d.toBuffer(),
	            p: key.p.toBuffer(),
	            q: key.q.toBuffer(),
	            dmp1: key.dmp1.toBuffer(),
	            dmq1: key.dmq1.toBuffer(),
	            coeff: key.coeff.toBuffer()
	        };
	    },
	
	    privateImport: function (key, data, options) {
	        if (data.n && data.e && data.d && data.p && data.q && data.dmp1 && data.dmq1 && data.coeff) {
	            key.setPrivate(
	                data.n,
	                data.e,
	                data.d,
	                data.p,
	                data.q,
	                data.dmp1,
	                data.dmq1,
	                data.coeff
	            );
	        } else {
	            throw Error("Invalid key data");
	        }
	    },
	
	    publicExport: function (key, options) {
	        return {
	            n: key.n.toBuffer(),
	            e: key.e
	        };
	    },
	
	    publicImport: function (key, data, options) {
	        if (data.n && data.e) {
	            key.setPublic(
	                data.n,
	                data.e
	            );
	        } else {
	            throw Error("Invalid key data");
	        }
	    },
	
	    /**
	     * Trying autodetect and import key
	     * @param key
	     * @param data
	     */
	    autoImport: function (key, data) {
	        if (data.n && data.e) {
	            if (data.d && data.p && data.q && data.dmp1 && data.dmq1 && data.coeff) {
	                module.exports.privateImport(key, data);
	                return true;
	            } else {
	                module.exports.publicImport(key, data);
	                return true;
	            }
	        }
	
	        return false;
	    }
	};


/***/ },
/* 214 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _equals = __webpack_require__(32);
	
	var _equals2 = _interopRequireDefault(_equals);
	
	var _crypto = __webpack_require__(193);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Generates a hash signed with a key.
	 *
	 * @param {String} key the keys used to sign the hash.
	 *
	 * @param {String} string The string to be hashed.
	 *
	*/
	/**
	 * @name Postback
	 * @description This module exposes functions
	 *              related to postback validations.
	 *              This can also be found in client.security if
	 *              you already used pagarme.connect to pre apply
	 *              your api_key.
	 *
	 * @module postback
	 **/
	function calculateSignature(key, postbackBody) {
	  return (0, _crypto.createHmac)('sha1', key).update(postbackBody).digest('hex');
	}
	
	/**
	 * Verifies a hash signed with a key.
	 *
	 * @param {String} key the keys used to sign the hash.
	 *
	 * @param {String} string The string to be hashed.
	 *
	 * @param {String} expected The expected result.
	 *
	*/
	function verifySignature(key, postbackBody, headerSignature) {
	  var signature = calculateSignature(key, postbackBody);
	  return (0, _equals2.default)(signature, headerSignature);
	}
	
	exports.default = {
	  calculateSignature: calculateSignature,
	  verifySignature: verifySignature
	};
	module.exports = exports['default'];

/***/ },
/* 215 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _T = __webpack_require__(152);
	
	var _T2 = _interopRequireDefault(_T);
	
	var _has = __webpack_require__(50);
	
	var _has2 = _interopRequireDefault(_has);
	
	var _cond = __webpack_require__(57);
	
	var _cond2 = _interopRequireDefault(_cond);
	
	var _curry = __webpack_require__(154);
	
	var _curry2 = _interopRequireDefault(_curry);
	
	var _routes = __webpack_require__(63);
	
	var _routes2 = _interopRequireDefault(_routes);
	
	var _request = __webpack_require__(64);
	
	var _request2 = _interopRequireDefault(_request);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var findOne = (0, _curry2.default)(function (opts, body) {
	  return _request2.default.get(opts, _routes2.default.customers.details(body.id), {});
	}); /**
	     * @name Customers
	     * @description This module exposes functions
	     *              related to the `/customers` path.
	     *
	     * @module customers
	     **/
	
	var findAll = (0, _curry2.default)(function (opts, pagination) {
	  return _request2.default.get(opts, _routes2.default.customers.base, pagination || {});
	});
	
	/**
	 * `GET /customers`
	 * Makes a request to /customers or to /customers/:id
	 *
	 * @param {Object} opts An options params which
	 *                      is usually already bound
	 *                      by `connect` functions.
	 *
	 * @param {Object} body The payload for the request
	 * {@link https://pagarme.readme.io/v1/reference#retornando-dados-do-cliente|API Reference for this payload}
	 * @param {Number} [body.id] The customer ID. If not sent, a
	 *                           customer list will be returned instead.
	 * @param {Number} [body.count] Pagination option for customer list.
	 *                              Number of customers in a page
	 * @param {Number} [body.page] Pagination option for customer list.
	 *                             The page index.
	 */
	var find = function find(opts, body) {
	  return (0, _cond2.default)([[(0, _has2.default)('id'), findOne(opts)], [_T2.default, findAll(opts)]])(body);
	};
	
	/**
	 * `GET /customers`
	 * Returns company's customers
	 *
	 * @param {Object} opts An options params which
	 *                      is usually already bound
	 *                      by `connect` functions.
	 *
	 * @param {Object} body The payload for the request.
	 * {@link https://pagarme.readme.io/v1/reference#retornando-clientes|API Reference for this payload}
	 * @param {Number} [body.count] Pagination option to get a list of customers.
	 *                              Number of customers in a page
	 * @param {Number} [body.page] Pagination option for a list of customers.
	 *                             The page index.
	*/
	var all = function all(opts, body) {
	  return findAll(opts, body);
	};
	
	/**
	 * `POST /customers`
	 * Creates a customer from the given payload
	 *
	 * @param {Object} opts An options params which
	 *                      is usually already bound
	 *                      by `connect` functions.
	 * @param {Object} body The payload for the request
	 * {@link https://pagarme.readme.io/v1/reference#criando-um-cliente|API Reference for this payload}
	 *
	 * @returns {Promise} Resolves to the result of
	 *                    the request or to an error.
	 */
	var create = function create(opts, body) {
	  return _request2.default.post(opts, _routes2.default.customers.base, body);
	};
	
	exports.default = {
	  find: find,
	  all: all,
	  create: create
	};
	module.exports = exports['default'];

/***/ },
/* 216 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _mapObjIndexed = __webpack_require__(217);
	
	var _mapObjIndexed2 = _interopRequireDefault(_mapObjIndexed);
	
	var _map = __webpack_require__(9);
	
	var _map2 = _interopRequireDefault(_map);
	
	var _ifElse = __webpack_require__(38);
	
	var _ifElse2 = _interopRequireDefault(_ifElse);
	
	var _ = __webpack_require__(218);
	
	var _2 = _interopRequireDefault(_);
	
	var _prop = __webpack_require__(48);
	
	var _prop2 = _interopRequireDefault(_prop);
	
	var _pick = __webpack_require__(61);
	
	var _pick2 = _interopRequireDefault(_pick);
	
	var _keys = __webpack_require__(25);
	
	var _keys2 = _interopRequireDefault(_keys);
	
	var _pipe = __webpack_require__(41);
	
	var _pipe2 = _interopRequireDefault(_pipe);
	
	var _validators = __webpack_require__(219);
	
	var _validators2 = _interopRequireDefault(_validators);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * @name Validator
	 * @description This module handles some validations
	 * @module validator
	 **/
	
	var filterValidTypes = (0, _pipe2.default)(_keys2.default, _pick2.default);
	
	var validation = (0, _prop2.default)(_2.default, _validators2.default);
	
	var mapIfArray = function mapIfArray(func) {
	  return (0, _ifElse2.default)(Array.isArray, (0, _map2.default)(func), func);
	};
	
	var applyValidator = function applyValidator(subject, type) {
	  var validator = mapIfArray(validation(type));
	  return validator(subject);
	};
	
	var applyValidators = (0, _mapObjIndexed2.default)(applyValidator);
	
	/**
	 * This method validates the properties supplied in the object.
	 *
	 * @param {Object} [body] An object that contains all properties to
	 *                        be validated.
	 * @param {(String|String[]|Number|Number[])} [body.cnpj] A CNPF, or an array
	 *                                                        of CNPFs, to be
	 *                                                        validated.
	 * @param {(String|String[]|Number|Number[])} [body.cpf] A CPF, or an array of
	 *                                                       CPFs, to be
	 *                                                       validated.
	 * @param {(String|String[]|Number|Number[])} [body.ddd] A DDD, or an array of
	 *                                                       DDDs, to be validated.
	 * @param {(String|String[]|Number|Number[])} [body.zipcode] A zipcode, or an
	 *                                                           array of zipcodes,
	 *                                                           to be validated.
	 * @param {(String|String[]|Number|Number[])} [body.phone] A phone number, or
	 *                                                         an array of phones,
	 *                                                         to be validated.
	 *
	 *
	 * @param {Object|Object[]} [body.card] A card, or an array of cards, to be
	 *                                      validated.
	 * @param {String} [body.card.card_holder_name] The card's holder name.
	 * @param {(String|Number)} [body.card.card_number] The card's number.
	 * @param {(String|Number)} [body.card.card_cvv] The card's CVV.
	 * @param {(String|Number)} [body.card.card_expiration_date] The card's
	 *                                                           expiratation date.
	 *
	 * @returns {Object} An object that returns each of the supplied properties
	 *                   with true or false, indicating if the supplied value is valid
	 *                   or invalid.
	 **/
	var validate = (0, _pipe2.default)(filterValidTypes(_validators2.default), applyValidators);
	
	exports.default = validate;
	module.exports = exports['default'];

/***/ },
/* 217 */
/***/ function(module, exports, __webpack_require__) {

	var _curry2 = __webpack_require__(6);
	var _reduce = __webpack_require__(15);
	var keys = __webpack_require__(25);
	
	
	/**
	 * An Object-specific version of `map`. The function is applied to three
	 * arguments: *(value, key, obj)*. If only the value is significant, use
	 * `map` instead.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.9.0
	 * @category Object
	 * @sig ((*, String, Object) -> *) -> Object -> Object
	 * @param {Function} fn
	 * @param {Object} obj
	 * @return {Object}
	 * @see R.map
	 * @example
	 *
	 *      var values = { x: 1, y: 2, z: 3 };
	 *      var prependKeyAndDouble = (num, key, obj) => key + (num * 2);
	 *
	 *      R.mapObjIndexed(prependKeyAndDouble, values); //=> { x: 'x2', y: 'y4', z: 'z6' }
	 */
	module.exports = _curry2(function mapObjIndexed(fn, obj) {
	  return _reduce(function(acc, key) {
	    acc[key] = fn(obj[key], key, obj);
	    return acc;
	  }, {}, keys(obj));
	});


/***/ },
/* 218 */
/***/ function(module, exports) {

	/**
	 * A special placeholder value used to specify "gaps" within curried functions,
	 * allowing partial application of any combination of arguments, regardless of
	 * their positions.
	 *
	 * If `g` is a curried ternary function and `_` is `R.__`, the following are
	 * equivalent:
	 *
	 *   - `g(1, 2, 3)`
	 *   - `g(_, 2, 3)(1)`
	 *   - `g(_, _, 3)(1)(2)`
	 *   - `g(_, _, 3)(1, 2)`
	 *   - `g(_, 2, _)(1, 3)`
	 *   - `g(_, 2)(1)(3)`
	 *   - `g(_, 2)(1, 3)`
	 *   - `g(_, 2)(_, 3)(1)`
	 *
	 * @constant
	 * @memberOf R
	 * @since v0.6.0
	 * @category Function
	 * @example
	 *
	 *      var greet = R.replace('{name}', R.__, 'Hello, {name}!');
	 *      greet('Alice'); //=> 'Hello, Alice!'
	 */
	module.exports = {'@@functional/placeholder': true};


/***/ },
/* 219 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _anyPass = __webpack_require__(220);
	
	var _anyPass2 = _interopRequireDefault(_anyPass);
	
	var _cnpjAndCpf = __webpack_require__(222);
	
	var _cnpjAndCpf2 = _interopRequireDefault(_cnpjAndCpf);
	
	var _numberSize = __webpack_require__(238);
	
	var _numberSize2 = _interopRequireDefault(_numberSize);
	
	var _email = __webpack_require__(239);
	
	var _email2 = _interopRequireDefault(_email);
	
	var _card = __webpack_require__(243);
	
	var _card2 = _interopRequireDefault(_card);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var ddd = (0, _numberSize2.default)(2);
	var phone = (0, _anyPass2.default)([(0, _numberSize2.default)(8), (0, _numberSize2.default)(9)]);
	var zipcode = (0, _numberSize2.default)(8);
	
	exports.default = {
	  cnpj: _cnpjAndCpf2.default,
	  cpf: _cnpjAndCpf2.default,
	  ddd: ddd,
	  email: _email2.default,
	  phone: phone,
	  zipcode: zipcode,
	  card: _card2.default
	};
	module.exports = exports['default'];

/***/ },
/* 220 */
/***/ function(module, exports, __webpack_require__) {

	var _curry1 = __webpack_require__(7);
	var curryN = __webpack_require__(23);
	var max = __webpack_require__(58);
	var pluck = __webpack_require__(221);
	var reduce = __webpack_require__(43);
	
	
	/**
	 * Takes a list of predicates and returns a predicate that returns true for a
	 * given list of arguments if at least one of the provided predicates is
	 * satisfied by those arguments.
	 *
	 * The function returned is a curried function whose arity matches that of the
	 * highest-arity predicate.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.9.0
	 * @category Logic
	 * @sig [(*... -> Boolean)] -> (*... -> Boolean)
	 * @param {Array} preds
	 * @return {Function}
	 * @see R.allPass
	 * @example
	 *
	 *      var gte = R.anyPass([R.gt, R.equals]);
	 *
	 *      gte(3, 2); //=> true
	 *      gte(2, 2); //=> true
	 *      gte(2, 3); //=> false
	 */
	module.exports = _curry1(function anyPass(preds) {
	  return curryN(reduce(max, 0, pluck('length', preds)), function() {
	    var idx = 0;
	    var len = preds.length;
	    while (idx < len) {
	      if (preds[idx].apply(this, arguments)) {
	        return true;
	      }
	      idx += 1;
	    }
	    return false;
	  });
	});


/***/ },
/* 221 */
/***/ function(module, exports, __webpack_require__) {

	var _curry2 = __webpack_require__(6);
	var map = __webpack_require__(9);
	var prop = __webpack_require__(48);
	
	
	/**
	 * Returns a new list by plucking the same named property off all objects in
	 * the list supplied.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.1.0
	 * @category List
	 * @sig k -> [{k: v}] -> [v]
	 * @param {Number|String} key The key name to pluck off of each object.
	 * @param {Array} list The array to consider.
	 * @return {Array} The list of values for the given key.
	 * @see R.props
	 * @example
	 *
	 *      R.pluck('a')([{a: 1}, {a: 2}]); //=> [1, 2]
	 *      R.pluck(0)([[1, 2], [3, 4]]);   //=> [1, 3]
	 */
	module.exports = _curry2(function pluck(p, list) {
	  return map(prop(p), list);
	});


/***/ },
/* 222 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _ifElse = __webpack_require__(38);
	
	var _ifElse2 = _interopRequireDefault(_ifElse);
	
	var _toString = __webpack_require__(177);
	
	var _toString2 = _interopRequireDefault(_toString);
	
	var _T = __webpack_require__(152);
	
	var _T2 = _interopRequireDefault(_T);
	
	var _F = __webpack_require__(223);
	
	var _F2 = _interopRequireDefault(_F);
	
	var _cond = __webpack_require__(57);
	
	var _cond2 = _interopRequireDefault(_cond);
	
	var _allPass = __webpack_require__(224);
	
	var _allPass2 = _interopRequireDefault(_allPass);
	
	var _ap = __webpack_require__(55);
	
	var _ap2 = _interopRequireDefault(_ap);
	
	var _equals = __webpack_require__(32);
	
	var _equals2 = _interopRequireDefault(_equals);
	
	var _apply = __webpack_require__(225);
	
	var _apply2 = _interopRequireDefault(_apply);
	
	var _nth = __webpack_require__(226);
	
	var _nth2 = _interopRequireDefault(_nth);
	
	var _subtract = __webpack_require__(227);
	
	var _subtract2 = _interopRequireDefault(_subtract);
	
	var _ = __webpack_require__(218);
	
	var _2 = _interopRequireDefault(_);
	
	var _modulo = __webpack_require__(228);
	
	var _modulo2 = _interopRequireDefault(_modulo);
	
	var _add = __webpack_require__(229);
	
	var _add2 = _interopRequireDefault(_add);
	
	var _reduce = __webpack_require__(43);
	
	var _reduce2 = _interopRequireDefault(_reduce);
	
	var _split = __webpack_require__(230);
	
	var _split2 = _interopRequireDefault(_split);
	
	var _length = __webpack_require__(65);
	
	var _length2 = _interopRequireDefault(_length);
	
	var _take = __webpack_require__(232);
	
	var _take2 = _interopRequireDefault(_take);
	
	var _pipe = __webpack_require__(41);
	
	var _pipe2 = _interopRequireDefault(_pipe);
	
	var _isEmpty = __webpack_require__(235);
	
	var _isEmpty2 = _interopRequireDefault(_isEmpty);
	
	var _anyPass = __webpack_require__(220);
	
	var _anyPass2 = _interopRequireDefault(_anyPass);
	
	var _replace = __webpack_require__(176);
	
	var _replace2 = _interopRequireDefault(_replace);
	
	var _map = __webpack_require__(9);
	
	var _map2 = _interopRequireDefault(_map);
	
	var _addIndex = __webpack_require__(237);
	
	var _addIndex2 = _interopRequireDefault(_addIndex);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// CNPJ = String of length 14
	// CPF = String of length 11
	// ID = CNPJ or CPF
	// RAW_ID = ID before special characters cleanup
	// DIGIT = Number from 0 to 9
	
	
	var blackList = ['00000000000000', '11111111111111', '22222222222222', '33333333333333', '44444444444444', '55555555555555', '66666666666666', '77777777777777', '88888888888888', '99999999999999', '00000000000', '11111111111', '22222222222', '33333333333', '44444444444', '55555555555', '66666666666', '77777777777', '88888888888', '99999999999'];
	
	var mapIndexed = (0, _addIndex2.default)(_map2.default);
	
	var weigthMasks = {
	  // for cpf
	  9: [10, 9, 8, 7, 6, 5, 4, 3, 2],
	  10: [11, 10, 9, 8, 7, 6, 5, 4, 3, 2],
	  // for cnpj
	  12: [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2],
	  13: [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
	};
	
	// String -> String
	var clean = (0, _replace2.default)(/[^\d]+/g, '');
	
	// [String] -> ID -> Boolean
	var isBlacklisted = function isBlacklisted(blacklist) {
	  return function (subject) {
	    return blacklist.includes(subject);
	  };
	};
	
	// ID -> Boolean
	var isInvalid = (0, _anyPass2.default)([_isEmpty2.default, isBlacklisted(blackList)]);
	
	// [Number] -> ID -> DIGIT
	var generateDigitWithMask = function generateDigitWithMask(mask) {
	  return (0, _pipe2.default)((0, _take2.default)((0, _length2.default)(mask)), (0, _split2.default)(''), mapIndexed(function (el, i) {
	    return el * mask[i];
	  }), (0, _reduce2.default)(_add2.default, 0), (0, _modulo2.default)(_2.default, 11), (0, _subtract2.default)(11, _2.default));
	};
	
	// Number -> ID -> DIGIT
	var digit = function digit(index) {
	  return (0, _pipe2.default)((0, _nth2.default)(index), Number);
	};
	
	// Number -> ID -> Boolean
	var validateDigit = function validateDigit(index) {
	  return function (subject) {
	    return (0, _apply2.default)(_equals2.default, (0, _ap2.default)([digit(index), generateDigitWithMask(weigthMasks[index], index)], [subject]));
	  };
	};
	
	// [Number] -> ID -> Boolean
	var validateDigits = (0, _pipe2.default)((0, _ap2.default)([validateDigit]), _allPass2.default);
	
	// ID -> Boolean
	var isCNPJ = (0, _pipe2.default)(_length2.default, (0, _equals2.default)(14));
	
	// ID -> Boolean
	var validateId = function validateId(indexes) {
	  return (0, _cond2.default)([[isInvalid, _F2.default], [validateDigits(indexes), _T2.default], [_T2.default, _F2.default]]);
	};
	
	// ID -> Boolean
	var validateCNPJ = validateId([12, 13]);
	
	// ID -> Boolean
	var validateCPF = validateId([9, 10]);
	
	// RAW_ID -> Boolean
	var validate = (0, _pipe2.default)(_toString2.default, clean, (0, _ifElse2.default)(isCNPJ, validateCNPJ, validateCPF));
	
	exports.default = validate;
	module.exports = exports['default'];

/***/ },
/* 223 */
/***/ function(module, exports, __webpack_require__) {

	var always = __webpack_require__(153);
	
	
	/**
	 * A function that always returns `false`. Any passed in parameters are ignored.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.9.0
	 * @category Function
	 * @sig * -> Boolean
	 * @param {*}
	 * @return {Boolean}
	 * @see R.always, R.T
	 * @example
	 *
	 *      R.F(); //=> false
	 */
	module.exports = always(false);


/***/ },
/* 224 */
/***/ function(module, exports, __webpack_require__) {

	var _curry1 = __webpack_require__(7);
	var curryN = __webpack_require__(23);
	var max = __webpack_require__(58);
	var pluck = __webpack_require__(221);
	var reduce = __webpack_require__(43);
	
	
	/**
	 * Takes a list of predicates and returns a predicate that returns true for a
	 * given list of arguments if every one of the provided predicates is satisfied
	 * by those arguments.
	 *
	 * The function returned is a curried function whose arity matches that of the
	 * highest-arity predicate.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.9.0
	 * @category Logic
	 * @sig [(*... -> Boolean)] -> (*... -> Boolean)
	 * @param {Array} preds
	 * @return {Function}
	 * @see R.anyPass
	 * @example
	 *
	 *      var isQueen = R.propEq('rank', 'Q');
	 *      var isSpade = R.propEq('suit', '♠︎');
	 *      var isQueenOfSpades = R.allPass([isQueen, isSpade]);
	 *
	 *      isQueenOfSpades({rank: 'Q', suit: '♣︎'}); //=> false
	 *      isQueenOfSpades({rank: 'Q', suit: '♠︎'}); //=> true
	 */
	module.exports = _curry1(function allPass(preds) {
	  return curryN(reduce(max, 0, pluck('length', preds)), function() {
	    var idx = 0;
	    var len = preds.length;
	    while (idx < len) {
	      if (!preds[idx].apply(this, arguments)) {
	        return false;
	      }
	      idx += 1;
	    }
	    return true;
	  });
	});


/***/ },
/* 225 */
/***/ function(module, exports, __webpack_require__) {

	var _curry2 = __webpack_require__(6);
	
	
	/**
	 * Applies function `fn` to the argument list `args`. This is useful for
	 * creating a fixed-arity function from a variadic function. `fn` should be a
	 * bound function if context is significant.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.7.0
	 * @category Function
	 * @sig (*... -> a) -> [*] -> a
	 * @param {Function} fn
	 * @param {Array} args
	 * @return {*}
	 * @see R.call, R.unapply
	 * @example
	 *
	 *      var nums = [1, 2, 3, -99, 42, 6, 7];
	 *      R.apply(Math.max, nums); //=> 42
	 */
	module.exports = _curry2(function apply(fn, args) {
	  return fn.apply(this, args);
	});


/***/ },
/* 226 */
/***/ function(module, exports, __webpack_require__) {

	var _curry2 = __webpack_require__(6);
	var _isString = __webpack_require__(20);
	
	
	/**
	 * Returns the nth element of the given list or string. If n is negative the
	 * element at index length + n is returned.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.1.0
	 * @category List
	 * @sig Number -> [a] -> a | Undefined
	 * @sig Number -> String -> String
	 * @param {Number} offset
	 * @param {*} list
	 * @return {*}
	 * @example
	 *
	 *      var list = ['foo', 'bar', 'baz', 'quux'];
	 *      R.nth(1, list); //=> 'bar'
	 *      R.nth(-1, list); //=> 'quux'
	 *      R.nth(-99, list); //=> undefined
	 *
	 *      R.nth(2, 'abc'); //=> 'c'
	 *      R.nth(3, 'abc'); //=> ''
	 */
	module.exports = _curry2(function nth(offset, list) {
	  var idx = offset < 0 ? list.length + offset : offset;
	  return _isString(list) ? list.charAt(idx) : list[idx];
	});


/***/ },
/* 227 */
/***/ function(module, exports, __webpack_require__) {

	var _curry2 = __webpack_require__(6);
	
	
	/**
	 * Subtracts its second argument from its first argument.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.1.0
	 * @category Math
	 * @sig Number -> Number -> Number
	 * @param {Number} a The first value.
	 * @param {Number} b The second value.
	 * @return {Number} The result of `a - b`.
	 * @see R.add
	 * @example
	 *
	 *      R.subtract(10, 8); //=> 2
	 *
	 *      var minus5 = R.subtract(R.__, 5);
	 *      minus5(17); //=> 12
	 *
	 *      var complementaryAngle = R.subtract(90);
	 *      complementaryAngle(30); //=> 60
	 *      complementaryAngle(72); //=> 18
	 */
	module.exports = _curry2(function subtract(a, b) {
	  return Number(a) - Number(b);
	});


/***/ },
/* 228 */
/***/ function(module, exports, __webpack_require__) {

	var _curry2 = __webpack_require__(6);
	
	
	/**
	 * Divides the first parameter by the second and returns the remainder. Note
	 * that this function preserves the JavaScript-style behavior for modulo. For
	 * mathematical modulo see `mathMod`.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.1.1
	 * @category Math
	 * @sig Number -> Number -> Number
	 * @param {Number} a The value to the divide.
	 * @param {Number} b The pseudo-modulus
	 * @return {Number} The result of `b % a`.
	 * @see R.mathMod
	 * @example
	 *
	 *      R.modulo(17, 3); //=> 2
	 *      // JS behavior:
	 *      R.modulo(-17, 3); //=> -2
	 *      R.modulo(17, -3); //=> 2
	 *
	 *      var isOdd = R.modulo(R.__, 2);
	 *      isOdd(42); //=> 0
	 *      isOdd(21); //=> 1
	 */
	module.exports = _curry2(function modulo(a, b) { return a % b; });


/***/ },
/* 229 */
/***/ function(module, exports, __webpack_require__) {

	var _curry2 = __webpack_require__(6);
	
	
	/**
	 * Adds two values.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.1.0
	 * @category Math
	 * @sig Number -> Number -> Number
	 * @param {Number} a
	 * @param {Number} b
	 * @return {Number}
	 * @see R.subtract
	 * @example
	 *
	 *      R.add(2, 3);       //=>  5
	 *      R.add(7)(10);      //=> 17
	 */
	module.exports = _curry2(function add(a, b) {
	  return Number(a) + Number(b);
	});


/***/ },
/* 230 */
/***/ function(module, exports, __webpack_require__) {

	var invoker = __webpack_require__(231);
	
	
	/**
	 * Splits a string into an array of strings based on the given
	 * separator.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.1.0
	 * @category String
	 * @sig (String | RegExp) -> String -> [String]
	 * @param {String|RegExp} sep The pattern.
	 * @param {String} str The string to separate into an array.
	 * @return {Array} The array of strings from `str` separated by `str`.
	 * @see R.join
	 * @example
	 *
	 *      var pathComponents = R.split('/');
	 *      R.tail(pathComponents('/usr/local/bin/node')); //=> ['usr', 'local', 'bin', 'node']
	 *
	 *      R.split('.', 'a.b.c.xyz.d'); //=> ['a', 'b', 'c', 'xyz', 'd']
	 */
	module.exports = invoker(1, 'split');


/***/ },
/* 231 */
/***/ function(module, exports, __webpack_require__) {

	var _curry2 = __webpack_require__(6);
	var _isFunction = __webpack_require__(52);
	var _slice = __webpack_require__(13);
	var curryN = __webpack_require__(23);
	var toString = __webpack_require__(177);
	
	
	/**
	 * Turns a named method with a specified arity into a function that can be
	 * called directly supplied with arguments and a target object.
	 *
	 * The returned function is curried and accepts `arity + 1` parameters where
	 * the final parameter is the target object.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.1.0
	 * @category Function
	 * @sig Number -> String -> (a -> b -> ... -> n -> Object -> *)
	 * @param {Number} arity Number of arguments the returned function should take
	 *        before the target object.
	 * @param {String} method Name of the method to call.
	 * @return {Function} A new curried function.
	 * @example
	 *
	 *      var sliceFrom = R.invoker(1, 'slice');
	 *      sliceFrom(6, 'abcdefghijklm'); //=> 'ghijklm'
	 *      var sliceFrom6 = R.invoker(2, 'slice')(6);
	 *      sliceFrom6(8, 'abcdefghijklm'); //=> 'gh'
	 */
	module.exports = _curry2(function invoker(arity, method) {
	  return curryN(arity + 1, function() {
	    var target = arguments[arity];
	    if (target != null && _isFunction(target[method])) {
	      return target[method].apply(target, _slice(arguments, 0, arity));
	    }
	    throw new TypeError(toString(target) + ' does not have a method named "' + method + '"');
	  });
	});


/***/ },
/* 232 */
/***/ function(module, exports, __webpack_require__) {

	var _curry2 = __webpack_require__(6);
	var _dispatchable = __webpack_require__(10);
	var _xtake = __webpack_require__(233);
	var slice = __webpack_require__(46);
	
	
	/**
	 * Returns the first `n` elements of the given list, string, or
	 * transducer/transformer (or object with a `take` method).
	 *
	 * Dispatches to the `take` method of the second argument, if present.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.1.0
	 * @category List
	 * @sig Number -> [a] -> [a]
	 * @sig Number -> String -> String
	 * @param {Number} n
	 * @param {*} list
	 * @return {*}
	 * @see R.drop
	 * @example
	 *
	 *      R.take(1, ['foo', 'bar', 'baz']); //=> ['foo']
	 *      R.take(2, ['foo', 'bar', 'baz']); //=> ['foo', 'bar']
	 *      R.take(3, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
	 *      R.take(4, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
	 *      R.take(3, 'ramda');               //=> 'ram'
	 *
	 *      var personnel = [
	 *        'Dave Brubeck',
	 *        'Paul Desmond',
	 *        'Eugene Wright',
	 *        'Joe Morello',
	 *        'Gerry Mulligan',
	 *        'Bob Bates',
	 *        'Joe Dodge',
	 *        'Ron Crotty'
	 *      ];
	 *
	 *      var takeFive = R.take(5);
	 *      takeFive(personnel);
	 *      //=> ['Dave Brubeck', 'Paul Desmond', 'Eugene Wright', 'Joe Morello', 'Gerry Mulligan']
	 */
	module.exports = _curry2(_dispatchable('take', _xtake, function take(n, xs) {
	  return slice(0, n < 0 ? Infinity : n, xs);
	}));


/***/ },
/* 233 */
/***/ function(module, exports, __webpack_require__) {

	var _curry2 = __webpack_require__(6);
	var _reduced = __webpack_require__(234);
	var _xfBase = __webpack_require__(22);
	
	module.exports = (function() {
	  function XTake(n, xf) {
	    this.xf = xf;
	    this.n = n;
	    this.i = 0;
	  }
	  XTake.prototype['@@transducer/init'] = _xfBase.init;
	  XTake.prototype['@@transducer/result'] = _xfBase.result;
	  XTake.prototype['@@transducer/step'] = function(result, input) {
	    this.i += 1;
	    var ret = this.n === 0 ? result : this.xf['@@transducer/step'](result, input);
	    return this.i >= this.n ? _reduced(ret) : ret;
	  };
	
	  return _curry2(function _xtake(n, xf) { return new XTake(n, xf); });
	}());


/***/ },
/* 234 */
/***/ function(module, exports) {

	module.exports = function _reduced(x) {
	  return x && x['@@transducer/reduced'] ? x :
	    {
	      '@@transducer/value': x,
	      '@@transducer/reduced': true
	    };
	};


/***/ },
/* 235 */
/***/ function(module, exports, __webpack_require__) {

	var _curry1 = __webpack_require__(7);
	var empty = __webpack_require__(236);
	var equals = __webpack_require__(32);
	
	
	/**
	 * Returns `true` if the given value is its type's empty value; `false`
	 * otherwise.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.1.0
	 * @category Logic
	 * @sig a -> Boolean
	 * @param {*} x
	 * @return {Boolean}
	 * @see R.empty
	 * @example
	 *
	 *      R.isEmpty([1, 2, 3]);   //=> false
	 *      R.isEmpty([]);          //=> true
	 *      R.isEmpty('');          //=> true
	 *      R.isEmpty(null);        //=> false
	 *      R.isEmpty({});          //=> true
	 *      R.isEmpty({length: 0}); //=> false
	 */
	module.exports = _curry1(function isEmpty(x) {
	  return x != null && equals(x, empty(x));
	});


/***/ },
/* 236 */
/***/ function(module, exports, __webpack_require__) {

	var _curry1 = __webpack_require__(7);
	var _isArguments = __webpack_require__(26);
	var _isArray = __webpack_require__(11);
	var _isObject = __webpack_require__(187);
	var _isString = __webpack_require__(20);
	
	
	/**
	 * Returns the empty value of its argument's type. Ramda defines the empty
	 * value of Array (`[]`), Object (`{}`), String (`''`), and Arguments. Other
	 * types are supported if they define `<Type>.empty` and/or
	 * `<Type>.prototype.empty`.
	 *
	 * Dispatches to the `empty` method of the first argument, if present.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.3.0
	 * @category Function
	 * @sig a -> a
	 * @param {*} x
	 * @return {*}
	 * @example
	 *
	 *      R.empty(Just(42));      //=> Nothing()
	 *      R.empty([1, 2, 3]);     //=> []
	 *      R.empty('unicorns');    //=> ''
	 *      R.empty({x: 1, y: 2});  //=> {}
	 */
	module.exports = _curry1(function empty(x) {
	  return (
	    (x != null && typeof x.empty === 'function') ?
	      x.empty() :
	    (x != null && x.constructor != null && typeof x.constructor.empty === 'function') ?
	      x.constructor.empty() :
	    _isArray(x) ?
	      [] :
	    _isString(x) ?
	      '' :
	    _isObject(x) ?
	      {} :
	    _isArguments(x) ?
	      (function() { return arguments; }()) :
	    // else
	      void 0
	  );
	});


/***/ },
/* 237 */
/***/ function(module, exports, __webpack_require__) {

	var _concat = __webpack_require__(56);
	var _curry1 = __webpack_require__(7);
	var _slice = __webpack_require__(13);
	var curryN = __webpack_require__(23);
	
	
	/**
	 * Creates a new list iteration function from an existing one by adding two new
	 * parameters to its callback function: the current index, and the entire list.
	 *
	 * This would turn, for instance, Ramda's simple `map` function into one that
	 * more closely resembles `Array.prototype.map`. Note that this will only work
	 * for functions in which the iteration callback function is the first
	 * parameter, and where the list is the last parameter. (This latter might be
	 * unimportant if the list parameter is not used.)
	 *
	 * @func
	 * @memberOf R
	 * @since v0.15.0
	 * @category Function
	 * @category List
	 * @sig ((a ... -> b) ... -> [a] -> *) -> (a ..., Int, [a] -> b) ... -> [a] -> *)
	 * @param {Function} fn A list iteration function that does not pass index or list to its callback
	 * @return {Function} An altered list iteration function that passes (item, index, list) to its callback
	 * @example
	 *
	 *      var mapIndexed = R.addIndex(R.map);
	 *      mapIndexed((val, idx) => idx + '-' + val, ['f', 'o', 'o', 'b', 'a', 'r']);
	 *      //=> ['0-f', '1-o', '2-o', '3-b', '4-a', '5-r']
	 */
	module.exports = _curry1(function addIndex(fn) {
	  return curryN(fn.length, function() {
	    var idx = 0;
	    var origFn = arguments[0];
	    var list = arguments[arguments.length - 1];
	    var args = _slice(arguments);
	    args[0] = function() {
	      var result = origFn.apply(this, _concat(arguments, [idx, list]));
	      idx += 1;
	      return result;
	    };
	    return fn.apply(this, args);
	  });
	});


/***/ },
/* 238 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _equals = __webpack_require__(32);
	
	var _equals2 = _interopRequireDefault(_equals);
	
	var _length = __webpack_require__(65);
	
	var _length2 = _interopRequireDefault(_length);
	
	var _toString = __webpack_require__(177);
	
	var _toString2 = _interopRequireDefault(_toString);
	
	var _pipe = __webpack_require__(41);
	
	var _pipe2 = _interopRequireDefault(_pipe);
	
	var _replace = __webpack_require__(176);
	
	var _replace2 = _interopRequireDefault(_replace);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var clean = (0, _replace2.default)(/[^0-9]+/g, '');
	
	exports.default = function (size) {
	  return (0, _pipe2.default)(_toString2.default, clean, _length2.default, (0, _equals2.default)(size));
	};
	
	module.exports = exports['default'];

/***/ },
/* 239 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _test = __webpack_require__(240);
	
	var _test2 = _interopRequireDefault(_test);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var validate = (0, _test2.default)(/^([a-zA-Z0-9_\.\-\+])+@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/);
	
	exports.default = validate;
	module.exports = exports['default'];

/***/ },
/* 240 */
/***/ function(module, exports, __webpack_require__) {

	var _cloneRegExp = __webpack_require__(241);
	var _curry2 = __webpack_require__(6);
	var _isRegExp = __webpack_require__(242);
	var toString = __webpack_require__(177);
	
	
	/**
	 * Determines whether a given string matches a given regular expression.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.12.0
	 * @category String
	 * @sig RegExp -> String -> Boolean
	 * @param {RegExp} pattern
	 * @param {String} str
	 * @return {Boolean}
	 * @see R.match
	 * @example
	 *
	 *      R.test(/^x/, 'xyz'); //=> true
	 *      R.test(/^y/, 'xyz'); //=> false
	 */
	module.exports = _curry2(function test(pattern, str) {
	  if (!_isRegExp(pattern)) {
	    throw new TypeError('‘test’ requires a value of type RegExp as its first argument; received ' + toString(pattern));
	  }
	  return _cloneRegExp(pattern).test(str);
	});


/***/ },
/* 241 */
/***/ function(module, exports) {

	module.exports = function _cloneRegExp(pattern) {
	  return new RegExp(pattern.source, (pattern.global     ? 'g' : '') +
	                                    (pattern.ignoreCase ? 'i' : '') +
	                                    (pattern.multiline  ? 'm' : '') +
	                                    (pattern.sticky     ? 'y' : '') +
	                                    (pattern.unicode    ? 'u' : ''));
	};


/***/ },
/* 242 */
/***/ function(module, exports) {

	module.exports = function _isRegExp(x) {
	  return Object.prototype.toString.call(x) === '[object RegExp]';
	};


/***/ },
/* 243 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _ = __webpack_require__(218);
	
	var _2 = _interopRequireDefault(_);
	
	var _pipe = __webpack_require__(41);
	
	var _pipe2 = _interopRequireDefault(_pipe);
	
	var _splitEvery = __webpack_require__(244);
	
	var _splitEvery2 = _interopRequireDefault(_splitEvery);
	
	var _prop = __webpack_require__(48);
	
	var _prop2 = _interopRequireDefault(_prop);
	
	var _replace = __webpack_require__(176);
	
	var _replace2 = _interopRequireDefault(_replace);
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _getBrand = __webpack_require__(245);
	
	var _getBrand2 = _interopRequireDefault(_getBrand);
	
	var _cvv = __webpack_require__(252);
	
	var _cvv2 = _interopRequireDefault(_cvv);
	
	var _isValidCardNumber = __webpack_require__(253);
	
	var _isValidCardNumber2 = _interopRequireDefault(_isValidCardNumber);
	
	var _isValidExpirationMonth = __webpack_require__(257);
	
	var _isValidExpirationMonth2 = _interopRequireDefault(_isValidExpirationMonth);
	
	var _isValidExpirationYear = __webpack_require__(260);
	
	var _isValidExpirationYear2 = _interopRequireDefault(_isValidExpirationYear);
	
	var _isValidExpirationDate = __webpack_require__(261);
	
	var _isValidExpirationDate2 = _interopRequireDefault(_isValidExpirationDate);
	
	var _isValidHolderName = __webpack_require__(265);
	
	var _isValidHolderName2 = _interopRequireDefault(_isValidHolderName);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var validateCardData = function validateCardData(card) {
	  var cleanDate = (0, _replace2.default)(/[^0-9]/g, '', (0, _prop2.default)('card_expiration_date', card));
	
	  var _splitEvery$map = (0, _splitEvery2.default)(2, cleanDate).map(Number),
	      _splitEvery$map2 = _slicedToArray(_splitEvery$map, 2),
	      month = _splitEvery$map2[0],
	      year = _splitEvery$map2[1];
	
	  var validateCardHolderName = (0, _pipe2.default)((0, _prop2.default)('card_holder_name'), _isValidHolderName2.default);
	
	  var validateCardNumber = (0, _pipe2.default)((0, _prop2.default)('card_number'), _isValidCardNumber2.default);
	
	  var validateExpirationDate = (0, _pipe2.default)((0, _prop2.default)('card_expiration_date'), _isValidExpirationDate2.default);
	
	  var brand = (0, _getBrand2.default)((0, _prop2.default)('card_number', card));
	
	  var validateCvv = (0, _pipe2.default)((0, _prop2.default)('card_cvv'), (0, _cvv2.default)(_2.default, brand));
	
	  return {
	    card_holder_name: validateCardHolderName(card),
	    card_number: validateCardNumber(card),
	    card_expiration_date: validateExpirationDate(card),
	    card_expiration_month: (0, _isValidExpirationMonth2.default)(month),
	    card_expiration_year: (0, _isValidExpirationYear2.default)(year),
	    brand: brand,
	    card_cvv: validateCvv(card)
	  };
	};
	
	exports.default = validateCardData;
	module.exports = exports['default'];

/***/ },
/* 244 */
/***/ function(module, exports, __webpack_require__) {

	var _curry2 = __webpack_require__(6);
	var slice = __webpack_require__(46);
	
	
	/**
	 * Splits a collection into slices of the specified length.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.16.0
	 * @category List
	 * @sig Number -> [a] -> [[a]]
	 * @sig Number -> String -> [String]
	 * @param {Number} n
	 * @param {Array} list
	 * @return {Array}
	 * @example
	 *
	 *      R.splitEvery(3, [1, 2, 3, 4, 5, 6, 7]); //=> [[1, 2, 3], [4, 5, 6], [7]]
	 *      R.splitEvery(3, 'foobarbaz'); //=> ['foo', 'bar', 'baz']
	 */
	module.exports = _curry2(function splitEvery(n, list) {
	  if (n <= 0) {
	    throw new Error('First argument to splitEvery must be a positive integer');
	  }
	  var result = [];
	  var idx = 0;
	  while (idx < list.length) {
	    result.push(slice(idx, idx += n, list));
	  }
	  return result;
	});


/***/ },
/* 245 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _always = __webpack_require__(153);
	
	var _always2 = _interopRequireDefault(_always);
	
	var _isEmpty = __webpack_require__(235);
	
	var _isEmpty2 = _interopRequireDefault(_isEmpty);
	
	var _ifElse = __webpack_require__(38);
	
	var _ifElse2 = _interopRequireDefault(_ifElse);
	
	var _last = __webpack_require__(246);
	
	var _last2 = _interopRequireDefault(_last);
	
	var _find = __webpack_require__(247);
	
	var _find2 = _interopRequireDefault(_find);
	
	var _head = __webpack_require__(249);
	
	var _head2 = _interopRequireDefault(_head);
	
	var _toPairs = __webpack_require__(250);
	
	var _toPairs2 = _interopRequireDefault(_toPairs);
	
	var _pipe = __webpack_require__(41);
	
	var _pipe2 = _interopRequireDefault(_pipe);
	
	var _replace = __webpack_require__(176);
	
	var _replace2 = _interopRequireDefault(_replace);
	
	var _ = __webpack_require__(218);
	
	var _2 = _interopRequireDefault(_);
	
	var _map = __webpack_require__(9);
	
	var _map2 = _interopRequireDefault(_map);
	
	var _bins = __webpack_require__(251);
	
	var _bins2 = _interopRequireDefault(_bins);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var mapBins = (0, _map2.default)(_2.default, _bins2.default);
	
	var clean = (0, _replace2.default)(/[^0-9]/g, '');
	
	var cardNumberMatchBins = function cardNumberMatchBins(cardNumber, brandBins) {
	  return brandBins.reduce(function (acc, start) {
	    if (cardNumber.startsWith(start)) {
	      return true;
	    }
	    return acc;
	  }, false);
	};
	
	var makeCardMatcher = function makeCardMatcher(cardNumber) {
	  return function (brandBins) {
	    return cardNumberMatchBins(cardNumber, brandBins);
	  };
	};
	
	var getBrand = (0, _pipe2.default)(makeCardMatcher, mapBins, _toPairs2.default, (0, _find2.default)(function (pair) {
	  return (0, _last2.default)(pair) === true;
	}), _head2.default);
	
	exports.default = (0, _pipe2.default)(clean, (0, _ifElse2.default)(_isEmpty2.default, (0, _always2.default)('unknown'), getBrand));
	module.exports = exports['default'];

/***/ },
/* 246 */
/***/ function(module, exports, __webpack_require__) {

	var nth = __webpack_require__(226);
	
	
	/**
	 * Returns the last element of the given list or string.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.1.4
	 * @category List
	 * @sig [a] -> a | Undefined
	 * @sig String -> String
	 * @param {*} list
	 * @return {*}
	 * @see R.init, R.head, R.tail
	 * @example
	 *
	 *      R.last(['fi', 'fo', 'fum']); //=> 'fum'
	 *      R.last([]); //=> undefined
	 *
	 *      R.last('abc'); //=> 'c'
	 *      R.last(''); //=> ''
	 */
	module.exports = nth(-1);


/***/ },
/* 247 */
/***/ function(module, exports, __webpack_require__) {

	var _curry2 = __webpack_require__(6);
	var _dispatchable = __webpack_require__(10);
	var _xfind = __webpack_require__(248);
	
	
	/**
	 * Returns the first element of the list which matches the predicate, or
	 * `undefined` if no element matches.
	 *
	 * Dispatches to the `find` method of the second argument, if present.
	 *
	 * Acts as a transducer if a transformer is given in list position.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.1.0
	 * @category List
	 * @sig (a -> Boolean) -> [a] -> a | undefined
	 * @param {Function} fn The predicate function used to determine if the element is the
	 *        desired one.
	 * @param {Array} list The array to consider.
	 * @return {Object} The element found, or `undefined`.
	 * @see R.transduce
	 * @example
	 *
	 *      var xs = [{a: 1}, {a: 2}, {a: 3}];
	 *      R.find(R.propEq('a', 2))(xs); //=> {a: 2}
	 *      R.find(R.propEq('a', 4))(xs); //=> undefined
	 */
	module.exports = _curry2(_dispatchable('find', _xfind, function find(fn, list) {
	  var idx = 0;
	  var len = list.length;
	  while (idx < len) {
	    if (fn(list[idx])) {
	      return list[idx];
	    }
	    idx += 1;
	  }
	}));


/***/ },
/* 248 */
/***/ function(module, exports, __webpack_require__) {

	var _curry2 = __webpack_require__(6);
	var _reduced = __webpack_require__(234);
	var _xfBase = __webpack_require__(22);
	
	
	module.exports = (function() {
	  function XFind(f, xf) {
	    this.xf = xf;
	    this.f = f;
	    this.found = false;
	  }
	  XFind.prototype['@@transducer/init'] = _xfBase.init;
	  XFind.prototype['@@transducer/result'] = function(result) {
	    if (!this.found) {
	      result = this.xf['@@transducer/step'](result, void 0);
	    }
	    return this.xf['@@transducer/result'](result);
	  };
	  XFind.prototype['@@transducer/step'] = function(result, input) {
	    if (this.f(input)) {
	      this.found = true;
	      result = _reduced(this.xf['@@transducer/step'](result, input));
	    }
	    return result;
	  };
	
	  return _curry2(function _xfind(f, xf) { return new XFind(f, xf); });
	}());


/***/ },
/* 249 */
/***/ function(module, exports, __webpack_require__) {

	var nth = __webpack_require__(226);
	
	
	/**
	 * Returns the first element of the given list or string. In some libraries
	 * this function is named `first`.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.1.0
	 * @category List
	 * @sig [a] -> a | Undefined
	 * @sig String -> String
	 * @param {Array|String} list
	 * @return {*}
	 * @see R.tail, R.init, R.last
	 * @example
	 *
	 *      R.head(['fi', 'fo', 'fum']); //=> 'fi'
	 *      R.head([]); //=> undefined
	 *
	 *      R.head('abc'); //=> 'a'
	 *      R.head(''); //=> ''
	 */
	module.exports = nth(0);


/***/ },
/* 250 */
/***/ function(module, exports, __webpack_require__) {

	var _curry1 = __webpack_require__(7);
	var _has = __webpack_require__(5);
	
	
	/**
	 * Converts an object into an array of key, value arrays. Only the object's
	 * own properties are used.
	 * Note that the order of the output array is not guaranteed to be consistent
	 * across different JS platforms.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.4.0
	 * @category Object
	 * @sig {String: *} -> [[String,*]]
	 * @param {Object} obj The object to extract from
	 * @return {Array} An array of key, value arrays from the object's own properties.
	 * @see R.fromPairs
	 * @example
	 *
	 *      R.toPairs({a: 1, b: 2, c: 3}); //=> [['a', 1], ['b', 2], ['c', 3]]
	 */
	module.exports = _curry1(function toPairs(obj) {
	  var pairs = [];
	  for (var prop in obj) {
	    if (_has(prop, obj)) {
	      pairs[pairs.length] = [prop, obj[prop]];
	    }
	  }
	  return pairs;
	});


/***/ },
/* 251 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  elo: ['401178', '401179', '431274', '438935', '451416', '457393', '457631', '457632', '498405', '498410', '498411', '498412', '498418', '498419', '498420', '498421', '498422', '498427', '498428', '498429', '498432', '498433', '498472', '498473', '498487', '498493', '498494', '498497', '498498', '504175', '506699', '506700', '506701', '506702', '506703', '506704', '506705', '506706', '506707', '506708', '506709', '506710', '506711', '506712', '506713', '506714', '506715', '506716', '506717', '506718', '506719', '506720', '506721', '506722', '506723', '506724', '506725', '506726', '506727', '506728', '506729', '506730', '506731', '506732', '506733', '506734', '506735', '506736', '506737', '506738', '506739', '506740', '506741', '506742', '506743', '506744', '506745', '506746', '506747', '506748', '506749', '506750', '506751', '506752', '506753', '506754', '506755', '506756', '506757', '506758', '506759', '506760', '506761', '506762', '506763', '506764', '506765', '506766', '506767', '506768', '506769', '506770', '506771', '506772', '506773', '506774', '506775', '506776', '506777', '506778', '509000', '509001', '509002', '509003', '509004', '509005', '509006', '509007', '509008', '509009', '509010', '509011', '509012', '509013', '509014', '509015', '509016', '509017', '509018', '509019', '509020', '509021', '509022', '509023', '509024', '509025', '509026', '509027', '509028', '509029', '509030', '509031', '509032', '509033', '509034', '509035', '509036', '509037', '509038', '509039', '509040', '509041', '509042', '509043', '509044', '509045', '509046', '509047', '509048', '509049', '509050', '509051', '509052', '509053', '509054', '509055', '509056', '509057', '509058', '509059', '509060', '509061', '509062', '509063', '509064', '509065', '509066', '509067', '509068', '509069', '509070', '509071', '509072', '509073', '509074', '509075', '509076', '509077', '509078', '509079', '509080', '509081', '509082', '509083', '509084', '509085', '509086', '509087', '509088', '509089', '509090', '509091', '509092', '509093', '509094', '509095', '509096', '509097', '509098', '509099', '509100', '509101', '509102', '509103', '509104', '509105', '509106', '509107', '509108', '509109', '509110', '509111', '509112', '509113', '509114', '509115', '509116', '509117', '509118', '509119', '509120', '509121', '509122', '509123', '509124', '509125', '509126', '509127', '509128', '509129', '509130', '509131', '509132', '509133', '509134', '509135', '509136', '509137', '509138', '509139', '509140', '509141', '509142', '509143', '509144', '509145', '509146', '509147', '509148', '509149', '509150', '509151', '509152', '509153', '509154', '509155', '509156', '509157', '509158', '509159', '509160', '509161', '509162', '509163', '509164', '509165', '509166', '509167', '509168', '509169', '509170', '509171', '509172', '509173', '509174', '509175', '509176', '509177', '509178', '509179', '509180', '509181', '509182', '509183', '509184', '509185', '509186', '509187', '509188', '509189', '509190', '509191', '509192', '509193', '509194', '509195', '509196', '509197', '509198', '509199', '509200', '509201', '509202', '509203', '509204', '509205', '509206', '509207', '509208', '509209', '509210', '509211', '509212', '509213', '509214', '509215', '509216', '509217', '509218', '509219', '509220', '509221', '509222', '509223', '509224', '509225', '509226', '509227', '509228', '509229', '509230', '509231', '509232', '509233', '509234', '509235', '509236', '509237', '509238', '509239', '509240', '509241', '509242', '509243', '509244', '509245', '509246', '509247', '509248', '509249', '509250', '509251', '509252', '509253', '509254', '509255', '509256', '509257', '509258', '509259', '509260', '509261', '509262', '509263', '509264', '509265', '509266', '509267', '509268', '509269', '509270', '509271', '509272', '509273', '509274', '509275', '509276', '509277', '509278', '509279', '509280', '509281', '509282', '509283', '509284', '509285', '509286', '509287', '509288', '509289', '509290', '509291', '509292', '509293', '509294', '509295', '509296', '509297', '509298', '509299', '509300', '509301', '509302', '509303', '509304', '509305', '509306', '509307', '509308', '509309', '509310', '509311', '509312', '509313', '509314', '509315', '509316', '509317', '509318', '509319', '509320', '509321', '509322', '509323', '509324', '509325', '509326', '509327', '509328', '509329', '509330', '509331', '509332', '509333', '509334', '509335', '509336', '509337', '509338', '509339', '509340', '509341', '509342', '509343', '509344', '509345', '509346', '509347', '509348', '509349', '509350', '509351', '509352', '509353', '509354', '509355', '509356', '509357', '509358', '509359', '509360', '509361', '509362', '509363', '509364', '509365', '509366', '509367', '509368', '509369', '509370', '509371', '509372', '509373', '509374', '509375', '509376', '509377', '509378', '509379', '509380', '509381', '509382', '509383', '509384', '509385', '509386', '509387', '509388', '509389', '509390', '509391', '509392', '509393', '509394', '509395', '509396', '509397', '509398', '509399', '509400', '509401', '509402', '509403', '509404', '509405', '509406', '509407', '509408', '509409', '509410', '509411', '509412', '509413', '509414', '509415', '509416', '509417', '509418', '509419', '509420', '509421', '509422', '509423', '509424', '509425', '509426', '509427', '509428', '509429', '509430', '509431', '509432', '509433', '509434', '509435', '509436', '509437', '509438', '509439', '509440', '509441', '509442', '509443', '509444', '509445', '509446', '509447', '509448', '509449', '509450', '509451', '509452', '509453', '509454', '509455', '509456', '509457', '509458', '509459', '509460', '509461', '509462', '509463', '509464', '509465', '509466', '509467', '509468', '509469', '509470', '509471', '509472', '509473', '509474', '509475', '509476', '509477', '509478', '509479', '509480', '509481', '509482', '509483', '509484', '509485', '509486', '509487', '509488', '509489', '509490', '509491', '509492', '509493', '509494', '509495', '509496', '509497', '509498', '509499', '509500', '509501', '509502', '509503', '509504', '509505', '509506', '509507', '509508', '509509', '509510', '509511', '509512', '509513', '509514', '509515', '509516', '509517', '509518', '509519', '509520', '509521', '509522', '509523', '509524', '509525', '509526', '509527', '509528', '509529', '509530', '509531', '509532', '509533', '509534', '509535', '509536', '509537', '509538', '509539', '509540', '509541', '509542', '509543', '509544', '509545', '509546', '509547', '509548', '509549', '509550', '509551', '509552', '509553', '509554', '509555', '509556', '509557', '509558', '509559', '509560', '509561', '509562', '509563', '509564', '509565', '509566', '509567', '509568', '509569', '509570', '509571', '509572', '509573', '509574', '509575', '509576', '509577', '509578', '509579', '509580', '509581', '509582', '509583', '509584', '509585', '509586', '509587', '509588', '509589', '509590', '509591', '509592', '509593', '509594', '509595', '509596', '509597', '509598', '509599', '509600', '509601', '509602', '509603', '509604', '509605', '509606', '509607', '509608', '509609', '509610', '509611', '509612', '509613', '509614', '509615', '509616', '509617', '509618', '509619', '509620', '509621', '509622', '509623', '509624', '509625', '509626', '509627', '509628', '509629', '509630', '509631', '509632', '509633', '509634', '509635', '509636', '509637', '509638', '509639', '509640', '509641', '509642', '509643', '509644', '509645', '509646', '509647', '509648', '509649', '509650', '509651', '509652', '509653', '509654', '509655', '509656', '509657', '509658', '509659', '509660', '509661', '509662', '509663', '509664', '509665', '509666', '509667', '509668', '509669', '509670', '509671', '509672', '509673', '509674', '509675', '509676', '509677', '509678', '509679', '509680', '509681', '509682', '509683', '509684', '509685', '509686', '509687', '509688', '509689', '509690', '509691', '509692', '509693', '509694', '509695', '509696', '509697', '509698', '509699', '509700', '509701', '509702', '509703', '509704', '509705', '509706', '509707', '509708', '509709', '509710', '509711', '509712', '509713', '509714', '509715', '509716', '509717', '509718', '509719', '509720', '509721', '509722', '509723', '509724', '509725', '509726', '509727', '509728', '509729', '509730', '509731', '509732', '509733', '509734', '509735', '509736', '509737', '509738', '509739', '509740', '509741', '509742', '509743', '509744', '509745', '509746', '509747', '509748', '509749', '509750', '509751', '509752', '509753', '509754', '509755', '509756', '509757', '509758', '509759', '509760', '509761', '509762', '509763', '509764', '509765', '509766', '509767', '509768', '509769', '509770', '509771', '509772', '509773', '509774', '509775', '509776', '509777', '509778', '509779', '509780', '509781', '509782', '509783', '509784', '509785', '509786', '509787', '509788', '509789', '509790', '509791', '509792', '509793', '509794', '509795', '509796', '509797', '509798', '509799', '509800', '509801', '509802', '509803', '509804', '509805', '509806', '509807', '509808', '509809', '509810', '509811', '509812', '509813', '509814', '509815', '509816', '509817', '509818', '509819', '509820', '509821', '509822', '509823', '509824', '509825', '509826', '509827', '509828', '509829', '509830', '509831', '509832', '509833', '509834', '509835', '509836', '509837', '509838', '509839', '509840', '509841', '509842', '509843', '509844', '509845', '509846', '509847', '509848', '509849', '509850', '509851', '509852', '509853', '509854', '509855', '509856', '509857', '509858', '509859', '509860', '509861', '509862', '509863', '509864', '509865', '509866', '509867', '509868', '509869', '509870', '509871', '509872', '509873', '509874', '509875', '509876', '509877', '509878', '509879', '509880', '509881', '509882', '509883', '509884', '509885', '509886', '509887', '509888', '509889', '509890', '509891', '509892', '509893', '509894', '509895', '509896', '509897', '509898', '509899', '509900', '509901', '509902', '509903', '509904', '509905', '509906', '509907', '509908', '509909', '509910', '509911', '509912', '509913', '509914', '509915', '509916', '509917', '509918', '509919', '509920', '509921', '509922', '509923', '509924', '509925', '509926', '509927', '509928', '509929', '509930', '509931', '509932', '509933', '509934', '509935', '509936', '509937', '509938', '509939', '509940', '509941', '509942', '509943', '509944', '509945', '509946', '509947', '509948', '509949', '509950', '509951', '509952', '509953', '509954', '509955', '509956', '509957', '509958', '509959', '509960', '509961', '509962', '509963', '509964', '509965', '509966', '509967', '509968', '509969', '509970', '509971', '509972', '509973', '509974', '509975', '509976', '509977', '509978', '509979', '509980', '509981', '509982', '509983', '509984', '509985', '509986', '509987', '509988', '509989', '509990', '509991', '509992', '509993', '509994', '509995', '509996', '509997', '509998', '509999', '627780', '636297', '636368', '650031', '650032', '650033', '650035', '650036', '650037', '650038', '650039', '650040', '650041', '650042', '650043', '650044', '650045', '650046', '650047', '650048', '650049', '650050', '650051', '650405', '650406', '650407', '650408', '650409', '650410', '650411', '650412', '650413', '650414', '650415', '650416', '650417', '650418', '650419', '650420', '650421', '650422', '650423', '650424', '650425', '650426', '650427', '650428', '650429', '650430', '650431', '650432', '650433', '650434', '650435', '650436', '650437', '650438', '650439', '650485', '650486', '650487', '650488', '650489', '650490', '650491', '650492', '650493', '650494', '650495', '650496', '650497', '650498', '650499', '650500', '650501', '650502', '650503', '650504', '650505', '650506', '650507', '650508', '650509', '650510', '650511', '650512', '650513', '650514', '650515', '650516', '650517', '650518', '650519', '650520', '650521', '650522', '650523', '650524', '650525', '650526', '650527', '650528', '650529', '650530', '650531', '650532', '650533', '650534', '650535', '650536', '650537', '650538', '650541', '650542', '650543', '650544', '650545', '650546', '650547', '650548', '650549', '650550', '650551', '650552', '650553', '650554', '650555', '650556', '650557', '650558', '650559', '650560', '650561', '650562', '650563', '650564', '650565', '650566', '650567', '650568', '650569', '650570', '650571', '650572', '650573', '650574', '650575', '650576', '650577', '650578', '650579', '650580', '650581', '650582', '650583', '650584', '650585', '650586', '650587', '650588', '650589', '650590', '650591', '650592', '650593', '650594', '650595', '650596', '650597', '650598', '650700', '650701', '650702', '650703', '650704', '650705', '650706', '650707', '650708', '650709', '650710', '650711', '650712', '650713', '650714', '650715', '650716', '650717', '650718', '650720', '650721', '650722', '650723', '650724', '650725', '650726', '650727', '650901', '650902', '650903', '650904', '650905', '650906', '650907', '650908', '650909', '650910', '650911', '650912', '650913', '650914', '650915', '650916', '650917', '650918', '650919', '650920', '651652', '651653', '651654', '651655', '651656', '651657', '651658', '651659', '651660', '651661', '651662', '651663', '651664', '651665', '651666', '651667', '651668', '651669', '651670', '651671', '651672', '651673', '651674', '651675', '651676', '651677', '651678', '651679', '655000', '655001', '655002', '655003', '655004', '655005', '655006', '655007', '655008', '655009', '655010', '655011', '655012', '655013', '655014', '655015', '655016', '655017', '655018', '655019', '655021', '655022', '655023', '655024', '655025', '655026', '655027', '655028', '655029', '655030', '655031', '655032', '655033', '655034', '655035', '655036', '655037', '655038', '655039', '655040', '655041', '655042', '655043', '655044', '655045', '655046', '655047', '655048', '655049', '655050', '655051', '655052', '655053', '655054', '655055', '655056', '655057', '655058'],
	  discover: ['6011', '622', '64', '65'],
	  hipercard: ['384100', '384140', '384160', '60'],
	  diners: ['301', '305', '36', '38'],
	  amex: ['34', '37'],
	  aura: ['50'],
	  jcb: ['35'],
	  visa: ['4'],
	  mastercard: ['5']
	};
	module.exports = exports['default'];

/***/ },
/* 252 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _toString = __webpack_require__(177);
	
	var _toString2 = _interopRequireDefault(_toString);
	
	var _curry = __webpack_require__(154);
	
	var _curry2 = _interopRequireDefault(_curry);
	
	var _always = __webpack_require__(153);
	
	var _always2 = _interopRequireDefault(_always);
	
	var _ifElse = __webpack_require__(38);
	
	var _ifElse2 = _interopRequireDefault(_ifElse);
	
	var _length = __webpack_require__(65);
	
	var _length2 = _interopRequireDefault(_length);
	
	var _pipe = __webpack_require__(41);
	
	var _pipe2 = _interopRequireDefault(_pipe);
	
	var _equals = __webpack_require__(32);
	
	var _equals2 = _interopRequireDefault(_equals);
	
	var _replace = __webpack_require__(176);
	
	var _replace2 = _interopRequireDefault(_replace);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var clean = (0, _replace2.default)(/[^0-9]/g, '');
	
	var isAmex = (0, _equals2.default)('amex');
	
	var isLength = function isLength(size) {
	  return (0, _pipe2.default)(_length2.default, (0, _equals2.default)(size));
	};
	
	var validate = function validate(brand) {
	  return (0, _ifElse2.default)((0, _always2.default)(isAmex(brand)), isLength(4), isLength(3));
	};
	
	var isValidCvv = (0, _curry2.default)(function (cvv, brand) {
	  return (0, _pipe2.default)(_toString2.default, clean, validate(brand))(cvv);
	});
	
	exports.default = isValidCvv;
	module.exports = exports['default'];

/***/ },
/* 253 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _toString = __webpack_require__(177);
	
	var _toString2 = _interopRequireDefault(_toString);
	
	var _subtract = __webpack_require__(227);
	
	var _subtract2 = _interopRequireDefault(_subtract);
	
	var _add = __webpack_require__(229);
	
	var _add2 = _interopRequireDefault(_add);
	
	var _reduce = __webpack_require__(43);
	
	var _reduce2 = _interopRequireDefault(_reduce);
	
	var _dropLast = __webpack_require__(254);
	
	var _dropLast2 = _interopRequireDefault(_dropLast);
	
	var _last = __webpack_require__(246);
	
	var _last2 = _interopRequireDefault(_last);
	
	var _F = __webpack_require__(223);
	
	var _F2 = _interopRequireDefault(_F);
	
	var _T = __webpack_require__(152);
	
	var _T2 = _interopRequireDefault(_T);
	
	var _cond = __webpack_require__(57);
	
	var _cond2 = _interopRequireDefault(_cond);
	
	var _length = __webpack_require__(65);
	
	var _length2 = _interopRequireDefault(_length);
	
	var _and = __webpack_require__(28);
	
	var _and2 = _interopRequireDefault(_and);
	
	var _not = __webpack_require__(39);
	
	var _not2 = _interopRequireDefault(_not);
	
	var _equals = __webpack_require__(32);
	
	var _equals2 = _interopRequireDefault(_equals);
	
	var _ = __webpack_require__(218);
	
	var _2 = _interopRequireDefault(_);
	
	var _modulo = __webpack_require__(228);
	
	var _modulo2 = _interopRequireDefault(_modulo);
	
	var _pipe = __webpack_require__(41);
	
	var _pipe2 = _interopRequireDefault(_pipe);
	
	var _replace = __webpack_require__(176);
	
	var _replace2 = _interopRequireDefault(_replace);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var clean = (0, _replace2.default)(/[^0-9]/g, '');
	
	var isEven = (0, _pipe2.default)((0, _modulo2.default)(_2.default, 2), (0, _equals2.default)(0));
	
	var isOdd = (0, _pipe2.default)(isEven, _not2.default);
	
	var hasEvenDigitsLenghtAndEvenIndex = function hasEvenDigitsLenghtAndEvenIndex(digitsMod, indexMod) {
	  return (0, _and2.default)(isEven(digitsMod), isEven(indexMod));
	};
	
	var hasOddDigitsLenghtAndOddIndex = function hasOddDigitsLenghtAndOddIndex(digitsMod, indexMod) {
	  return (0, _and2.default)(isOdd(digitsMod), isOdd(indexMod));
	};
	
	var mask = [0, 1, 2, 3, 4, -4, -3, -2, -1, 0];
	
	var reduFinalSum = function reduFinalSum(withoutLastDigit) {
	  return function (acc, digit, index, digits) {
	    var digitsMod = (0, _modulo2.default)((0, _length2.default)(digits) - 1, 2);
	    var indexMod = (0, _modulo2.default)(index, 2);
	
	    var shouldUseIndex = (0, _cond2.default)([[hasEvenDigitsLenghtAndEvenIndex, _T2.default], [hasOddDigitsLenghtAndOddIndex, _T2.default], [_T2.default, _F2.default]])(digitsMod, indexMod);
	
	    if ((0, _not2.default)(shouldUseIndex)) {
	      return acc;
	    }
	
	    var maskIndex = withoutLastDigit[index];
	
	    return acc + mask[maskIndex];
	  };
	};
	
	var validate = function validate(cardNumber) {
	  var lastDigit = (0, _last2.default)(cardNumber);
	  var withoutLastDigit = (0, _dropLast2.default)(1, cardNumber);
	  var sumDigits = (0, _reduce2.default)(_add2.default, 0, withoutLastDigit);
	  var digitsArray = withoutLastDigit.split('');
	  var finalSum = digitsArray.reduceRight(reduFinalSum(withoutLastDigit), sumDigits);
	
	  var toSubtract = (0, _modulo2.default)(finalSum, 10);
	
	  var mod10 = (0, _subtract2.default)(10, toSubtract);
	
	  if (mod10 === 10) {
	    mod10 = 0;
	  }
	
	  return mod10 === Number(lastDigit);
	};
	
	exports.default = (0, _pipe2.default)(_toString2.default, clean, validate);
	module.exports = exports['default'];

/***/ },
/* 254 */
/***/ function(module, exports, __webpack_require__) {

	var _curry2 = __webpack_require__(6);
	var _dispatchable = __webpack_require__(10);
	var _dropLast = __webpack_require__(255);
	var _xdropLast = __webpack_require__(256);
	
	
	/**
	 * Returns a list containing all but the last `n` elements of the given `list`.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.16.0
	 * @category List
	 * @sig Number -> [a] -> [a]
	 * @sig Number -> String -> String
	 * @param {Number} n The number of elements of `xs` to skip.
	 * @param {Array} xs The collection to consider.
	 * @return {Array}
	 * @see R.takeLast
	 * @example
	 *
	 *      R.dropLast(1, ['foo', 'bar', 'baz']); //=> ['foo', 'bar']
	 *      R.dropLast(2, ['foo', 'bar', 'baz']); //=> ['foo']
	 *      R.dropLast(3, ['foo', 'bar', 'baz']); //=> []
	 *      R.dropLast(4, ['foo', 'bar', 'baz']); //=> []
	 *      R.dropLast(3, 'ramda');               //=> 'ra'
	 */
	module.exports = _curry2(_dispatchable('dropLast', _xdropLast, _dropLast));


/***/ },
/* 255 */
/***/ function(module, exports, __webpack_require__) {

	var take = __webpack_require__(232);
	
	module.exports = function dropLast(n, xs) {
	  return take(n < xs.length ? xs.length - n : 0, xs);
	};


/***/ },
/* 256 */
/***/ function(module, exports, __webpack_require__) {

	var _curry2 = __webpack_require__(6);
	var _xfBase = __webpack_require__(22);
	
	
	module.exports = (function() {
	  function XDropLast(n, xf) {
	    this.xf = xf;
	    this.pos = 0;
	    this.full = false;
	    this.acc = new Array(n);
	  }
	  XDropLast.prototype['@@transducer/init'] = _xfBase.init;
	  XDropLast.prototype['@@transducer/result'] =  function(result) {
	    this.acc = null;
	    return this.xf['@@transducer/result'](result);
	  };
	  XDropLast.prototype['@@transducer/step'] = function(result, input) {
	    if (this.full) {
	      result = this.xf['@@transducer/step'](result, this.acc[this.pos]);
	    }
	    this.store(input);
	    return result;
	  };
	  XDropLast.prototype.store = function(input) {
	    this.acc[this.pos] = input;
	    this.pos += 1;
	    if (this.pos === this.acc.length) {
	      this.pos = 0;
	      this.full = true;
	    }
	  };
	
	  return _curry2(function _xdropLast(n, xf) { return new XDropLast(n, xf); });
	}());


/***/ },
/* 257 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _pipe = __webpack_require__(41);
	
	var _pipe2 = _interopRequireDefault(_pipe);
	
	var _lte = __webpack_require__(258);
	
	var _lte2 = _interopRequireDefault(_lte);
	
	var _ = __webpack_require__(218);
	
	var _2 = _interopRequireDefault(_);
	
	var _gte = __webpack_require__(259);
	
	var _gte2 = _interopRequireDefault(_gte);
	
	var _both = __webpack_require__(51);
	
	var _both2 = _interopRequireDefault(_both);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var validate = (0, _both2.default)((0, _gte2.default)(_2.default, 1), (0, _lte2.default)(_2.default, 12));
	
	exports.default = (0, _pipe2.default)(parseInt, validate);
	module.exports = exports['default'];

/***/ },
/* 258 */
/***/ function(module, exports, __webpack_require__) {

	var _curry2 = __webpack_require__(6);
	
	
	/**
	 * Returns `true` if the first argument is less than or equal to the second;
	 * `false` otherwise.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.1.0
	 * @category Relation
	 * @sig Ord a => a -> a -> Boolean
	 * @param {Number} a
	 * @param {Number} b
	 * @return {Boolean}
	 * @see R.gte
	 * @example
	 *
	 *      R.lte(2, 1); //=> false
	 *      R.lte(2, 2); //=> true
	 *      R.lte(2, 3); //=> true
	 *      R.lte('a', 'z'); //=> true
	 *      R.lte('z', 'a'); //=> false
	 */
	module.exports = _curry2(function lte(a, b) { return a <= b; });


/***/ },
/* 259 */
/***/ function(module, exports, __webpack_require__) {

	var _curry2 = __webpack_require__(6);
	
	
	/**
	 * Returns `true` if the first argument is greater than or equal to the second;
	 * `false` otherwise.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.1.0
	 * @category Relation
	 * @sig Ord a => a -> a -> Boolean
	 * @param {Number} a
	 * @param {Number} b
	 * @return {Boolean}
	 * @see R.lte
	 * @example
	 *
	 *      R.gte(2, 1); //=> true
	 *      R.gte(2, 2); //=> true
	 *      R.gte(2, 3); //=> false
	 *      R.gte('a', 'z'); //=> false
	 *      R.gte('z', 'a'); //=> true
	 */
	module.exports = _curry2(function gte(a, b) { return a >= b; });


/***/ },
/* 260 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _toString = __webpack_require__(177);
	
	var _toString2 = _interopRequireDefault(_toString);
	
	var _anyPass = __webpack_require__(220);
	
	var _anyPass2 = _interopRequireDefault(_anyPass);
	
	var _equals = __webpack_require__(32);
	
	var _equals2 = _interopRequireDefault(_equals);
	
	var _length = __webpack_require__(65);
	
	var _length2 = _interopRequireDefault(_length);
	
	var _pipe = __webpack_require__(41);
	
	var _pipe2 = _interopRequireDefault(_pipe);
	
	var _replace = __webpack_require__(176);
	
	var _replace2 = _interopRequireDefault(_replace);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var clean = (0, _replace2.default)(/[^0-9]/g, '');
	
	var lengthIs = function lengthIs(number) {
	  return (0, _pipe2.default)(_length2.default, (0, _equals2.default)(number));
	};
	
	var validate = (0, _anyPass2.default)([lengthIs(2), lengthIs(4)]);
	
	exports.default = (0, _pipe2.default)(_toString2.default, clean, validate);
	module.exports = exports['default'];

/***/ },
/* 261 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _toString = __webpack_require__(177);
	
	var _toString2 = _interopRequireDefault(_toString);
	
	var _ifElse = __webpack_require__(38);
	
	var _ifElse2 = _interopRequireDefault(_ifElse);
	
	var _length = __webpack_require__(65);
	
	var _length2 = _interopRequireDefault(_length);
	
	var _pipe = __webpack_require__(41);
	
	var _pipe2 = _interopRequireDefault(_pipe);
	
	var _T = __webpack_require__(152);
	
	var _T2 = _interopRequireDefault(_T);
	
	var _F = __webpack_require__(223);
	
	var _F2 = _interopRequireDefault(_F);
	
	var _cond = __webpack_require__(57);
	
	var _cond2 = _interopRequireDefault(_cond);
	
	var _merge = __webpack_require__(2);
	
	var _merge2 = _interopRequireDefault(_merge);
	
	var _zipObj = __webpack_require__(262);
	
	var _zipObj2 = _interopRequireDefault(_zipObj);
	
	var _splitEvery = __webpack_require__(244);
	
	var _splitEvery2 = _interopRequireDefault(_splitEvery);
	
	var _gt = __webpack_require__(263);
	
	var _gt2 = _interopRequireDefault(_gt);
	
	var _lte = __webpack_require__(258);
	
	var _lte2 = _interopRequireDefault(_lte);
	
	var _and = __webpack_require__(28);
	
	var _and2 = _interopRequireDefault(_and);
	
	var _both = __webpack_require__(51);
	
	var _both2 = _interopRequireDefault(_both);
	
	var _equals = __webpack_require__(32);
	
	var _equals2 = _interopRequireDefault(_equals);
	
	var _prop = __webpack_require__(48);
	
	var _prop2 = _interopRequireDefault(_prop);
	
	var _lt = __webpack_require__(264);
	
	var _lt2 = _interopRequireDefault(_lt);
	
	var _add = __webpack_require__(229);
	
	var _add2 = _interopRequireDefault(_add);
	
	var _modulo = __webpack_require__(228);
	
	var _modulo2 = _interopRequireDefault(_modulo);
	
	var _replace = __webpack_require__(176);
	
	var _replace2 = _interopRequireDefault(_replace);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var clean = (0, _replace2.default)(/[^0-9]/g, '');
	
	var getCurrentDate = function getCurrentDate() {
	  var date = new Date();
	
	  return {
	    currentYear: (0, _modulo2.default)(date.getFullYear(), 1000),
	    currentMonth: (0, _add2.default)(date.getMonth(), 1)
	  };
	};
	
	var cardDateLessThanCurrentDate = function cardDateLessThanCurrentDate(props, dates) {
	  return (0, _lt2.default)((0, _prop2.default)(props[0], dates), (0, _prop2.default)(props[1], dates));
	};
	
	var isInvalidYear = function isInvalidYear(dates) {
	  return cardDateLessThanCurrentDate(['year', 'currentYear'], dates);
	};
	
	var monthLessThanCurrentMonth = function monthLessThanCurrentMonth(dates) {
	  return cardDateLessThanCurrentDate(['month', 'currentMonth'], dates);
	};
	
	var yearEqualsCurrentYear = function yearEqualsCurrentYear(dates) {
	  return (0, _equals2.default)((0, _prop2.default)('year', dates), (0, _prop2.default)('currentYear', dates));
	};
	
	var isExpiredDate = (0, _both2.default)(yearEqualsCurrentYear, monthLessThanCurrentMonth);
	
	var isValidMonth = function isValidMonth(dates) {
	  var month = (0, _prop2.default)('month', dates);
	
	  return (0, _and2.default)((0, _lte2.default)(month, 12), (0, _gt2.default)(month, 0));
	};
	
	var validateDate = function validateDate(date) {
	  var dateArray = (0, _splitEvery2.default)(2, date).map(Number);
	  var dateObj = (0, _zipObj2.default)(['month', 'year'], dateArray);
	
	  var dates = (0, _merge2.default)(dateObj, getCurrentDate());
	
	  return (0, _cond2.default)([[isExpiredDate, _F2.default], [isInvalidYear, _F2.default], [_T2.default, isValidMonth]])(dates);
	};
	
	var validate = function validate(date) {
	  var lengthIsFour = (0, _pipe2.default)(_length2.default, (0, _equals2.default)(4));
	
	  return (0, _ifElse2.default)(lengthIsFour, validateDate, _F2.default)(date);
	};
	
	exports.default = (0, _pipe2.default)(_toString2.default, clean, validate);
	module.exports = exports['default'];

/***/ },
/* 262 */
/***/ function(module, exports, __webpack_require__) {

	var _curry2 = __webpack_require__(6);
	
	
	/**
	 * Creates a new object out of a list of keys and a list of values.
	 * Key/value pairing is truncated to the length of the shorter of the two lists.
	 * Note: `zipObj` is equivalent to `pipe(zipWith(pair), fromPairs)`.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.3.0
	 * @category List
	 * @sig [String] -> [*] -> {String: *}
	 * @param {Array} keys The array that will be properties on the output object.
	 * @param {Array} values The list of values on the output object.
	 * @return {Object} The object made by pairing up same-indexed elements of `keys` and `values`.
	 * @example
	 *
	 *      R.zipObj(['a', 'b', 'c'], [1, 2, 3]); //=> {a: 1, b: 2, c: 3}
	 */
	module.exports = _curry2(function zipObj(keys, values) {
	  var idx = 0;
	  var len = Math.min(keys.length, values.length);
	  var out = {};
	  while (idx < len) {
	    out[keys[idx]] = values[idx];
	    idx += 1;
	  }
	  return out;
	});


/***/ },
/* 263 */
/***/ function(module, exports, __webpack_require__) {

	var _curry2 = __webpack_require__(6);
	
	
	/**
	 * Returns `true` if the first argument is greater than the second; `false`
	 * otherwise.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.1.0
	 * @category Relation
	 * @sig Ord a => a -> a -> Boolean
	 * @param {*} a
	 * @param {*} b
	 * @return {Boolean}
	 * @see R.lt
	 * @example
	 *
	 *      R.gt(2, 1); //=> true
	 *      R.gt(2, 2); //=> false
	 *      R.gt(2, 3); //=> false
	 *      R.gt('a', 'z'); //=> false
	 *      R.gt('z', 'a'); //=> true
	 */
	module.exports = _curry2(function gt(a, b) { return a > b; });


/***/ },
/* 264 */
/***/ function(module, exports, __webpack_require__) {

	var _curry2 = __webpack_require__(6);
	
	
	/**
	 * Returns `true` if the first argument is less than the second; `false`
	 * otherwise.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.1.0
	 * @category Relation
	 * @sig Ord a => a -> a -> Boolean
	 * @param {*} a
	 * @param {*} b
	 * @return {Boolean}
	 * @see R.gt
	 * @example
	 *
	 *      R.lt(2, 1); //=> false
	 *      R.lt(2, 2); //=> false
	 *      R.lt(2, 3); //=> true
	 *      R.lt('a', 'z'); //=> true
	 *      R.lt('z', 'a'); //=> false
	 */
	module.exports = _curry2(function lt(a, b) { return a < b; });


/***/ },
/* 265 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _test = __webpack_require__(240);
	
	var _test2 = _interopRequireDefault(_test);
	
	var _replace = __webpack_require__(176);
	
	var _replace2 = _interopRequireDefault(_replace);
	
	var _toString = __webpack_require__(177);
	
	var _toString2 = _interopRequireDefault(_toString);
	
	var _pipe = __webpack_require__(41);
	
	var _pipe2 = _interopRequireDefault(_pipe);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = (0, _pipe2.default)(_toString2.default, (0, _replace2.default)(/"/g, "'"), (0, _test2.default)(/^[a-zA-Z_' ]*$/));
	module.exports = exports["default"];

/***/ }
/******/ ]);
//# sourceMappingURL=pagarme.js.map
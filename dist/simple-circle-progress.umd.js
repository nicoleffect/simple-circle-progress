/*!
 * simple-circle-progress v1.1.2
 * (c) 2019 Nicole Wong
 * Released under the MIT License.
 */

/*
 * github: https://github.com/nicoleffect/simple-circle-progress
 * demo: https://nicoleffect.github.io/simple-circle-progress/examples/index.html
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = global || self, global.circleProgress = factory());
}(this, function () { 'use strict';

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var _global = createCommonjsModule(function (module) {
	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self
	  // eslint-disable-next-line no-new-func
	  : Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
	});

	var _core = createCommonjsModule(function (module) {
	var core = module.exports = { version: '2.6.5' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
	});
	var _core_1 = _core.version;

	var _aFunction = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};

	// optional / simple context binding

	var _ctx = function (fn, that, length) {
	  _aFunction(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var _isObject = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	var _anObject = function (it) {
	  if (!_isObject(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};

	var _fails = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};

	// Thank's IE8 for his funny defineProperty
	var _descriptors = !_fails(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});

	var document = _global.document;
	// typeof document.createElement is 'object' in old IE
	var is = _isObject(document) && _isObject(document.createElement);
	var _domCreate = function (it) {
	  return is ? document.createElement(it) : {};
	};

	var _ie8DomDefine = !_descriptors && !_fails(function () {
	  return Object.defineProperty(_domCreate('div'), 'a', { get: function () { return 7; } }).a != 7;
	});

	// 7.1.1 ToPrimitive(input [, PreferredType])

	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	var _toPrimitive = function (it, S) {
	  if (!_isObject(it)) return it;
	  var fn, val;
	  if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
	  if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
	  if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var dP = Object.defineProperty;

	var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	  _anObject(O);
	  P = _toPrimitive(P, true);
	  _anObject(Attributes);
	  if (_ie8DomDefine) try {
	    return dP(O, P, Attributes);
	  } catch (e) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var _objectDp = {
		f: f
	};

	var _propertyDesc = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var _hide = _descriptors ? function (object, key, value) {
	  return _objectDp.f(object, key, _propertyDesc(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var hasOwnProperty = {}.hasOwnProperty;
	var _has = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

	var PROTOTYPE = 'prototype';

	var $export = function (type, name, source) {
	  var IS_FORCED = type & $export.F;
	  var IS_GLOBAL = type & $export.G;
	  var IS_STATIC = type & $export.S;
	  var IS_PROTO = type & $export.P;
	  var IS_BIND = type & $export.B;
	  var IS_WRAP = type & $export.W;
	  var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
	  var expProto = exports[PROTOTYPE];
	  var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] : (_global[name] || {})[PROTOTYPE];
	  var key, own, out;
	  if (IS_GLOBAL) source = name;
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if (own && _has(exports, key)) continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? _ctx(out, _global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function (C) {
	      var F = function (a, b, c) {
	        if (this instanceof C) {
	          switch (arguments.length) {
	            case 0: return new C();
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if (IS_PROTO) {
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if (type & $export.R && expProto && !expProto[key]) _hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library`
	var _export = $export;

	// 7.2.1 RequireObjectCoercible(argument)
	var _defined = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};

	var _stringWs = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
	  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

	var space = '[' + _stringWs + ']';
	var non = '\u200b\u0085';
	var ltrim = RegExp('^' + space + space + '*');
	var rtrim = RegExp(space + space + '*$');

	var exporter = function (KEY, exec, ALIAS) {
	  var exp = {};
	  var FORCE = _fails(function () {
	    return !!_stringWs[KEY]() || non[KEY]() != non;
	  });
	  var fn = exp[KEY] = FORCE ? exec(trim) : _stringWs[KEY];
	  if (ALIAS) exp[ALIAS] = fn;
	  _export(_export.P + _export.F * FORCE, 'String', exp);
	};

	// 1 -> String#trimLeft
	// 2 -> String#trimRight
	// 3 -> String#trim
	var trim = exporter.trim = function (string, TYPE) {
	  string = String(_defined(string));
	  if (TYPE & 1) string = string.replace(ltrim, '');
	  if (TYPE & 2) string = string.replace(rtrim, '');
	  return string;
	};

	var _stringTrim = exporter;

	var $parseInt = _global.parseInt;
	var $trim = _stringTrim.trim;

	var hex = /^[-+]?0[xX]/;

	var _parseInt = $parseInt(_stringWs + '08') !== 8 || $parseInt(_stringWs + '0x16') !== 22 ? function parseInt(str, radix) {
	  var string = $trim(String(str), 3);
	  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
	} : $parseInt;

	// 18.2.5 parseInt(string, radix)
	_export(_export.G + _export.F * (parseInt != _parseInt), { parseInt: _parseInt });

	var _parseInt$1 = _core.parseInt;

	var _parseInt$2 = _parseInt$1;

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	var classCallCheck = _classCallCheck;

	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	_export(_export.S + _export.F * !_descriptors, 'Object', { defineProperty: _objectDp.f });

	var $Object = _core.Object;
	var defineProperty = function defineProperty(it, key, desc) {
	  return $Object.defineProperty(it, key, desc);
	};

	var defineProperty$1 = defineProperty;

	function _defineProperties(target, props) {
	  for (var i = 0; i < props.length; i++) {
	    var descriptor = props[i];
	    descriptor.enumerable = descriptor.enumerable || false;
	    descriptor.configurable = true;
	    if ("value" in descriptor) descriptor.writable = true;

	    defineProperty$1(target, descriptor.key, descriptor);
	  }
	}

	function _createClass(Constructor, protoProps, staticProps) {
	  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	  if (staticProps) _defineProperties(Constructor, staticProps);
	  return Constructor;
	}

	var createClass = _createClass;

	var isMobile = function () {
	  return /Android|webOS|iPhone|iPod|BlackBerry/i.test(window.navigator.userAgent);
	}();

	/*!
	 * canvas-retina v1.0.0
	 * (c) 2019 Nicole Wong
	 * Released under the MIT License.
	 */

	/*
	 * github: https://github.com/nicoleffect/canvas-retina
	 * demo: https://github.com/nicoleffect/canvas-retina
	 */
	function getPixelRatio(ctx) {
	  var backingStore = ctx.backingStorePixelRatio || ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1;
	  return (window.devicePixelRatio || 1) / backingStore;
	}

	function canvasRetina(canvas) {
	  var rect = canvas.getBoundingClientRect();
	  var width = rect.width;
	  var height = rect.height;
	  var ctx = canvas.getContext('2d');
	  var pixelRatio = getPixelRatio(ctx);
	  canvas.width = width * pixelRatio;
	  canvas.height = height * pixelRatio;
	  ctx.scale(pixelRatio, pixelRatio);
	  ctx.translate(1 / pixelRatio, 1 / pixelRatio);
	  return {
	    ctx: ctx,
	    rect: rect
	  };
	}

	var canvasRetina$1 = canvasRetina;

	function drawCircle(_ref) {
	  var centerX = _ref.centerX,
	      centerY = _ref.centerY,
	      strokeStyle = _ref.strokeStyle,
	      lineWidth = _ref.lineWidth,
	      rate = _ref.rate,
	      _ref$dash = _ref.dash,
	      dash = _ref$dash === void 0 ? false : _ref$dash,
	      _ref$lineCap = _ref.lineCap,
	      lineCap = _ref$lineCap === void 0 ? 'butt' : _ref$lineCap,
	      _ref$clockwise = _ref.clockwise,
	      clockwise = _ref$clockwise === void 0 ? false : _ref$clockwise;
	  this.save();
	  var r = centerX - lineWidth / 2 - 1;

	  if (lineCap === 'butt' && dash) {
	    this.setLineDash([Math.PI * 2 * r / 12 - 2, 2]);
	  }

	  this.lineCap = lineCap;
	  this.strokeStyle = strokeStyle;
	  this.lineWidth = lineWidth;
	  var sAngle = -Math.PI / 2;
	  var pi = Math.PI * 2 / 100 * rate;
	  var eAngle = clockwise ? sAngle - pi : sAngle + pi;
	  this.beginPath();
	  this.arc(centerX, centerY, r, sAngle, eAngle, clockwise);
	  this.stroke();
	  this.restore();
	}

	function drawText(_ref2) {
	  var centerX = _ref2.centerX,
	      centerY = _ref2.centerY,
	      textStyle = _ref2.textStyle,
	      textFont = _ref2.textFont,
	      content = _ref2.content;
	  this.save();
	  this.fillStyle = textStyle;
	  this.font = textFont;
	  this.textAlign = 'center';
	  this.textBaseline = 'middle';
	  this.fillText(content, centerX, centerY);
	  this.restore();
	}

	var Circle =
	/*#__PURE__*/
	function () {
	  function Circle(_ref3) {
	    var canvas = _ref3.canvas,
	        isAnim = _ref3.isAnim,
	        rate = _ref3.rate,
	        clockwise = _ref3.clockwise,
	        dash = _ref3.dash,
	        lineCap = _ref3.lineCap,
	        circleStyle = _ref3.circleStyle,
	        lineWidth = _ref3.lineWidth,
	        orbitStyle = _ref3.orbitStyle,
	        textStyle = _ref3.textStyle;

	    classCallCheck(this, Circle);

	    var _canvasRetina = canvasRetina$1(canvas),
	        ctx = _canvasRetina.ctx,
	        rect = _canvasRetina.rect;

	    this.ctx = ctx;
	    this.rect = rect;
	    var _this$rect = this.rect,
	        width = _this$rect.width,
	        height = _this$rect.height;
	    this.centerX = width / 2;
	    this.centerY = height / 2;
	    this.dash = dash;
	    this.rate = rate;
	    this.lineCap = lineCap;
	    this.clockwise = clockwise;
	    this.circleStyle = circleStyle;
	    this.lineWidth = lineWidth;
	    this.textStyle = textStyle;
	    this.orbitStyle = orbitStyle;
	    this.completeCallback = null;
	    this.init(canvas, isAnim);
	  }

	  createClass(Circle, [{
	    key: "init",
	    value: function init(canvas, isAnim) {
	      var _this2 = this;

	      var centerX = this.centerX,
	          centerY = this.centerY,
	          lineWidth = this.lineWidth,
	          dash = this.dash,
	          rate = this.rate;

	      if (isAnim) {
	        this.loading = false;
	        this.anim();
	        var event = isMobile ? 'touchstart' : 'click';
	        canvas.addEventListener(event, function () {
	          _this2.anim();
	        });
	      } else {
	        this.draw(rate);
	      }
	    }
	  }, {
	    key: "draw",
	    value: function draw(rate) {
	      var centerX = this.centerX,
	          centerY = this.centerY,
	          textStyle = this.textStyle,
	          circleStyle = this.circleStyle,
	          lineWidth = this.lineWidth,
	          dash = this.dash,
	          lineCap = this.lineCap,
	          clockwise = this.clockwise,
	          orbitStyle = this.orbitStyle;

	      if (orbitStyle) {
	        drawCircle.call(this.ctx, {
	          centerX: centerX,
	          centerY: centerY,
	          strokeStyle: orbitStyle,
	          lineWidth: lineWidth,
	          rate: 100,
	          dash: dash
	        });
	      }

	      textStyle && drawText.call(this.ctx, {
	        centerX: centerX,
	        centerY: centerY,
	        textStyle: textStyle,
	        textFont: "".concat(Math.floor(centerX / 1.5), "px sans-serif"),
	        content: _parseInt$2(rate)
	      });
	      drawCircle.call(this.ctx, {
	        centerX: centerX,
	        centerY: centerY,
	        strokeStyle: circleStyle,
	        lineWidth: lineWidth,
	        rate: rate,
	        dash: dash,
	        lineCap: lineCap,
	        clockwise: clockwise
	      });
	    }
	  }, {
	    key: "anim",
	    value: function anim() {
	      if (this.loading) {
	        return;
	      }

	      this.loading = true;
	      var requestAnimFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
	      var cancelAnimFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.msCancelAnimationFrame;
	      var speed = 1;
	      var animKey;
	      var _this$rect2 = this.rect,
	          width = _this$rect2.width,
	          height = _this$rect2.height;

	      var _this = this;

	      return function _animateUpdate() {
	        if (speed >= _this.rate) {
	          cancelAnimFrame(animKey);
	          _this.loading = false;
	          _this.completeCallback && _this.completeCallback();
	          return;
	        }

	        _this.ctx.clearRect(0, 0, width, height);

	        _this.draw(speed);

	        speed++;
	        animKey = requestAnimFrame(_animateUpdate);
	      }();
	    }
	  }, {
	    key: "onComplete",
	    value: function onComplete(callback) {
	      this.completeCallback = callback;
	    }
	  }]);

	  return Circle;
	}();

	function circleProgress(_ref) {
	  var canvas = _ref.canvas,
	      _ref$isAnim = _ref.isAnim,
	      isAnim = _ref$isAnim === void 0 ? true : _ref$isAnim,
	      rate = _ref.rate,
	      clockwise = _ref.clockwise,
	      dash = _ref.dash,
	      lineCap = _ref.lineCap,
	      _ref$circleStyle = _ref.circleStyle,
	      circleStyle = _ref$circleStyle === void 0 ? '#000000' : _ref$circleStyle,
	      _ref$lineWidth = _ref.lineWidth,
	      lineWidth = _ref$lineWidth === void 0 ? 10 : _ref$lineWidth,
	      _ref$orbitStyle = _ref.orbitStyle,
	      orbitStyle = _ref$orbitStyle === void 0 ? '' : _ref$orbitStyle,
	      _ref$textStyle = _ref.textStyle,
	      textStyle = _ref$textStyle === void 0 ? '#000000' : _ref$textStyle;
	  return new Circle({
	    canvas: canvas,
	    isAnim: isAnim,
	    rate: rate,
	    clockwise: clockwise,
	    dash: dash,
	    lineCap: lineCap,
	    circleStyle: circleStyle,
	    lineWidth: lineWidth,
	    orbitStyle: orbitStyle,
	    textStyle: textStyle
	  });
	}

	return circleProgress;

}));

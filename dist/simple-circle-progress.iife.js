/*!
 * simple-circle-progress v1.0.0
 * (c) 2019 Nicole Wong
 * Released under the MIT License.
 */

/*
 * github: https://github.com/nicoleffect/simple-circle-progress
 * demo: https://nicoleffect.github.io/simple-circle-progress/examples/index.html
 */
var circleProgress = (function () {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var classCallCheck = _classCallCheck;

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

  var isMobile = function () {
    return /Android|webOS|iPhone|iPod|BlackBerry/i.test(window.navigator.userAgent);
  }();

  function getPixelRatio(ctx) {
    var backingStore = ctx.backingStorePixelRatio || ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1;
    return (window.devicePixelRatio || 1) / backingStore;
  }

  function setContext(canvas) {
    var rect = canvas.getBoundingClientRect();
    var width = rect.width;
    var height = rect.height;
    var ctx = canvas.getContext('2d');
    var pixelRatio = getPixelRatio(ctx); // console.log(pixelRatio)

    canvas.width = width * pixelRatio;
    canvas.height = height * pixelRatio;
    ctx.scale(pixelRatio, pixelRatio);
    ctx.translate(1 / pixelRatio, 1 / pixelRatio);
    return {
      ctx: ctx,
      rect: rect
    };
  }

  function drawCircle(_ref) {
    var strokeStyle = _ref.strokeStyle,
        lineWidth = _ref.lineWidth,
        speed = _ref.speed,
        _ref$dash = _ref.dash,
        dash = _ref$dash === void 0 ? false : _ref$dash,
        _ref$clockwise = _ref.clockwise,
        clockwise = _ref$clockwise === void 0 ? false : _ref$clockwise;
    this.save();
    dash && this.setLineDash([Math.PI * 88 / lineWidth - 2, 2]);
    this.strokeStyle = strokeStyle;
    this.lineWidth = lineWidth;
    this.beginPath();
    this.arc(centerX, centerY, centerX - lineWidth, -Math.PI / 2, -Math.PI / 2 + speed * Math.PI * 2 / 100, clockwise);
    this.stroke();
    this.restore();
  }

  function drawText(_ref2) {
    var centerX = _ref2.centerX,
        centerY = _ref2.centerY,
        fillStyle = _ref2.fillStyle,
        textFont = _ref2.textFont,
        content = _ref2.content;
    this.save();
    this.fillStyle = fillStyle;
    this.font = textFont;
    this.textAlign = 'center';
    this.fillText(_parseInt$2(content), centerX, centerY);
    this.restore();
  }

  var Circle =
  /*#__PURE__*/
  function () {
    function Circle(_ref3) {
      var canvas = _ref3.canvas,
          total = _ref3.total,
          speed = _ref3.speed,
          clockwise = _ref3.clockwise,
          dash = _ref3.dash,
          circleStyle = _ref3.circleStyle,
          circleWidth = _ref3.circleWidth,
          textStyle = _ref3.textStyle,
          textFont = _ref3.textFont,
          trackStyle = _ref3.trackStyle,
          trackWidth = _ref3.trackWidth;

      classCallCheck(this, Circle);

      var _setContext = setContext(canvas),
          ctx = _setContext.ctx,
          rect = _setContext.rect;

      this.ctx = ctx;
      var width = rect.width,
          height = rect.height;
      this.centerX = width / 2;
      this.centerY = height / 2;
      this.total = total;
      this.speed = speed;
      this.clockwise = clockwise;
      this.circleStyle = circleStyle;
      this.circleWidth = circleWidth;
      this.textStyle = textStyle;
      this.textFont = textFont;
      this.trackStyle = trackStyle;
      this.trackWidth = trackWidth; // console.log(2)

      if (speed > 0) {
        this.anim();
      } else {
        this.draw();
      }
    }

    createClass(Circle, [{
      key: "draw",
      value: function draw() {
        var centerX = this.centerX,
            centerY = this.centerY,
            fillStyle = this.fillStyle,
            textFont = this.textFont,
            total = this.total;
        drawText.call(this.ctx, {
          centerX: centerX,
          centerY: centerY,
          fillStyle: fillStyle,
          textFont: textFont,
          content: total
        });
        drawCircle();
      }
    }, {
      key: "anim",
      value: function anim() {}
    }]);

    return Circle;
  }();

  function circleProgress(_ref) {
    var canvas = _ref.canvas,
        total = _ref.total,
        speed = _ref.speed,
        _ref$clockwise = _ref.clockwise,
        clockwise = _ref$clockwise === void 0 ? false : _ref$clockwise,
        _ref$dash = _ref.dash,
        dash = _ref$dash === void 0 ? false : _ref$dash,
        _ref$circleStyle = _ref.circleStyle,
        circleStyle = _ref$circleStyle === void 0 ? '#fdf6a4' : _ref$circleStyle,
        _ref$circleWidth = _ref.circleWidth,
        circleWidth = _ref$circleWidth === void 0 ? 12 : _ref$circleWidth,
        _ref$textStyle = _ref.textStyle,
        textStyle = _ref$textStyle === void 0 ? '#ffffff' : _ref$textStyle,
        _ref$textFont = _ref.textFont,
        textFont = _ref$textFont === void 0 ? '34px sans-serif' : _ref$textFont,
        _ref$trackStyle = _ref.trackStyle,
        trackStyle = _ref$trackStyle === void 0 ? '#ffffff' : _ref$trackStyle,
        _ref$trackWidth = _ref.trackWidth,
        trackWidth = _ref$trackWidth === void 0 ? 12 : _ref$trackWidth;
    return new Circle({
      canvas: canvas,
      total: total,
      speed: speed,
      clockwise: clockwise,
      dash: dash,
      circleStyle: circleStyle,
      circleWidth: circleWidth,
      textStyle: textStyle,
      textFont: textFont,
      trackStyle: trackStyle,
      trackWidth: trackWidth
    });
  }

  return circleProgress;

}());

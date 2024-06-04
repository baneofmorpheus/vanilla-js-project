/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./app/index.js":
/*!**********************!*\
  !*** ./app/index.js ***!
  \**********************/
/***/ (() => {



/***/ }),

/***/ "./node_modules/ansi-html-community/index.js":
/*!***************************************************!*\
  !*** ./node_modules/ansi-html-community/index.js ***!
  \***************************************************/
/***/ ((module) => {

"use strict";


module.exports = ansiHTML;

// Reference to https://github.com/sindresorhus/ansi-regex
var _regANSI = /(?:(?:\u001b\[)|\u009b)(?:(?:[0-9]{1,3})?(?:(?:;[0-9]{0,3})*)?[A-M|f-m])|\u001b[A-M]/;
var _defColors = {
  reset: ['fff', '000'],
  // [FOREGROUD_COLOR, BACKGROUND_COLOR]
  black: '000',
  red: 'ff0000',
  green: '209805',
  yellow: 'e8bf03',
  blue: '0000ff',
  magenta: 'ff00ff',
  cyan: '00ffee',
  lightgrey: 'f0f0f0',
  darkgrey: '888'
};
var _styles = {
  30: 'black',
  31: 'red',
  32: 'green',
  33: 'yellow',
  34: 'blue',
  35: 'magenta',
  36: 'cyan',
  37: 'lightgrey'
};
var _openTags = {
  '1': 'font-weight:bold',
  // bold
  '2': 'opacity:0.5',
  // dim
  '3': '<i>',
  // italic
  '4': '<u>',
  // underscore
  '8': 'display:none',
  // hidden
  '9': '<del>' // delete
};
var _closeTags = {
  '23': '</i>',
  // reset italic
  '24': '</u>',
  // reset underscore
  '29': '</del>' // reset delete
};
[0, 21, 22, 27, 28, 39, 49].forEach(function (n) {
  _closeTags[n] = '</span>';
});

/**
 * Converts text with ANSI color codes to HTML markup.
 * @param {String} text
 * @returns {*}
 */
function ansiHTML(text) {
  // Returns the text if the string has no ANSI escape code.
  if (!_regANSI.test(text)) {
    return text;
  }

  // Cache opened sequence.
  var ansiCodes = [];
  // Replace with markup.
  var ret = text.replace(/\033\[(\d+)m/g, function (match, seq) {
    var ot = _openTags[seq];
    if (ot) {
      // If current sequence has been opened, close it.
      if (!!~ansiCodes.indexOf(seq)) {
        // eslint-disable-line no-extra-boolean-cast
        ansiCodes.pop();
        return '</span>';
      }
      // Open tag.
      ansiCodes.push(seq);
      return ot[0] === '<' ? ot : '<span style="' + ot + ';">';
    }
    var ct = _closeTags[seq];
    if (ct) {
      // Pop sequence
      ansiCodes.pop();
      return ct;
    }
    return '';
  });

  // Make sure tags are closed.
  var l = ansiCodes.length;
  l > 0 && (ret += Array(l + 1).join('</span>'));
  return ret;
}

/**
 * Customize colors.
 * @param {Object} colors reference to _defColors
 */
ansiHTML.setColors = function (colors) {
  if (typeof colors !== 'object') {
    throw new Error('`colors` parameter must be an Object.');
  }
  var _finalColors = {};
  for (var key in _defColors) {
    var hex = colors.hasOwnProperty(key) ? colors[key] : null;
    if (!hex) {
      _finalColors[key] = _defColors[key];
      continue;
    }
    if ('reset' === key) {
      if (typeof hex === 'string') {
        hex = [hex];
      }
      if (!Array.isArray(hex) || hex.length === 0 || hex.some(function (h) {
        return typeof h !== 'string';
      })) {
        throw new Error('The value of `' + key + '` property must be an Array and each item could only be a hex string, e.g.: FF0000');
      }
      var defHexColor = _defColors[key];
      if (!hex[0]) {
        hex[0] = defHexColor[0];
      }
      if (hex.length === 1 || !hex[1]) {
        hex = [hex[0]];
        hex.push(defHexColor[1]);
      }
      hex = hex.slice(0, 2);
    } else if (typeof hex !== 'string') {
      throw new Error('The value of `' + key + '` property must be a hex string, e.g.: FF0000');
    }
    _finalColors[key] = hex;
  }
  _setTags(_finalColors);
};

/**
 * Reset colors.
 */
ansiHTML.reset = function () {
  _setTags(_defColors);
};

/**
 * Expose tags, including open and close.
 * @type {Object}
 */
ansiHTML.tags = {};
if (Object.defineProperty) {
  Object.defineProperty(ansiHTML.tags, 'open', {
    get: function () {
      return _openTags;
    }
  });
  Object.defineProperty(ansiHTML.tags, 'close', {
    get: function () {
      return _closeTags;
    }
  });
} else {
  ansiHTML.tags.open = _openTags;
  ansiHTML.tags.close = _closeTags;
}
function _setTags(colors) {
  // reset all
  _openTags['0'] = 'font-weight:normal;opacity:1;color:#' + colors.reset[0] + ';background:#' + colors.reset[1];
  // inverse
  _openTags['7'] = 'color:#' + colors.reset[1] + ';background:#' + colors.reset[0];
  // dark grey
  _openTags['90'] = 'color:#' + colors.darkgrey;
  for (var code in _styles) {
    var color = _styles[code];
    var oriColor = colors[color] || '000';
    _openTags[code] = 'color:#' + oriColor;
    code = parseInt(code);
    _openTags[(code + 10).toString()] = 'background:#' + oriColor;
  }
}
ansiHTML.reset();

/***/ }),

/***/ "./node_modules/events/events.js":
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
/***/ ((module) => {

"use strict";
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



var R = typeof Reflect === 'object' ? Reflect : null;
var ReflectApply = R && typeof R.apply === 'function' ? R.apply : function ReflectApply(target, receiver, args) {
  return Function.prototype.apply.call(target, receiver, args);
};
var ReflectOwnKeys;
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys;
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}
function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}
var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
};
function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;
module.exports.once = once;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;
EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;
function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}
Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function () {
    return defaultMaxListeners;
  },
  set: function (arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});
EventEmitter.init = function () {
  if (this._events === undefined || this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }
  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};
function _getMaxListeners(that) {
  if (that._maxListeners === undefined) return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}
EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};
EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = type === 'error';
  var events = this._events;
  if (events !== undefined) doError = doError && events.error === undefined;else if (!doError) return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0) er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }
  var handler = events[type];
  if (handler === undefined) return false;
  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i) ReflectApply(listeners[i], this, args);
  }
  return true;
};
function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;
  checkListener(listener);
  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type, listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }
  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] = prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' + existing.length + ' ' + String(type) + ' listeners ' + 'added. Use emitter.setMaxListeners() to ' + 'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }
  return target;
}
EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};
EventEmitter.prototype.on = EventEmitter.prototype.addListener;
EventEmitter.prototype.prependListener = function prependListener(type, listener) {
  return _addListener(this, type, listener, true);
};
function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0) return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}
function _onceWrap(target, type, listener) {
  var state = {
    fired: false,
    wrapFn: undefined,
    target: target,
    type: type,
    listener: listener
  };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}
EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};
EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
  checkListener(listener);
  this.prependListener(type, _onceWrap(this, type, listener));
  return this;
};

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener = function removeListener(type, listener) {
  var list, events, position, i, originalListener;
  checkListener(listener);
  events = this._events;
  if (events === undefined) return this;
  list = events[type];
  if (list === undefined) return this;
  if (list === listener || list.listener === listener) {
    if (--this._eventsCount === 0) this._events = Object.create(null);else {
      delete events[type];
      if (events.removeListener) this.emit('removeListener', type, list.listener || listener);
    }
  } else if (typeof list !== 'function') {
    position = -1;
    for (i = list.length - 1; i >= 0; i--) {
      if (list[i] === listener || list[i].listener === listener) {
        originalListener = list[i].listener;
        position = i;
        break;
      }
    }
    if (position < 0) return this;
    if (position === 0) list.shift();else {
      spliceOne(list, position);
    }
    if (list.length === 1) events[type] = list[0];
    if (events.removeListener !== undefined) this.emit('removeListener', type, originalListener || listener);
  }
  return this;
};
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.removeAllListeners = function removeAllListeners(type) {
  var listeners, events, i;
  events = this._events;
  if (events === undefined) return this;

  // not listening for removeListener, no need to emit
  if (events.removeListener === undefined) {
    if (arguments.length === 0) {
      this._events = Object.create(null);
      this._eventsCount = 0;
    } else if (events[type] !== undefined) {
      if (--this._eventsCount === 0) this._events = Object.create(null);else delete events[type];
    }
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    var keys = Object.keys(events);
    var key;
    for (i = 0; i < keys.length; ++i) {
      key = keys[i];
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = Object.create(null);
    this._eventsCount = 0;
    return this;
  }
  listeners = events[type];
  if (typeof listeners === 'function') {
    this.removeListener(type, listeners);
  } else if (listeners !== undefined) {
    // LIFO order
    for (i = listeners.length - 1; i >= 0; i--) {
      this.removeListener(type, listeners[i]);
    }
  }
  return this;
};
function _listeners(target, type, unwrap) {
  var events = target._events;
  if (events === undefined) return [];
  var evlistener = events[type];
  if (evlistener === undefined) return [];
  if (typeof evlistener === 'function') return unwrap ? [evlistener.listener || evlistener] : [evlistener];
  return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}
EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};
EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};
EventEmitter.listenerCount = function (emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};
EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;
  if (events !== undefined) {
    var evlistener = events[type];
    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }
  return 0;
}
EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};
function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i) copy[i] = arr[i];
  return copy;
}
function spliceOne(list, index) {
  for (; index + 1 < list.length; index++) list[index] = list[index + 1];
  list.pop();
}
function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}
function once(emitter, name) {
  return new Promise(function (resolve, reject) {
    function errorListener(err) {
      emitter.removeListener(name, resolver);
      reject(err);
    }
    function resolver() {
      if (typeof emitter.removeListener === 'function') {
        emitter.removeListener('error', errorListener);
      }
      resolve([].slice.call(arguments));
    }
    ;
    eventTargetAgnosticAddListener(emitter, name, resolver, {
      once: true
    });
    if (name !== 'error') {
      addErrorHandlerIfEventEmitter(emitter, errorListener, {
        once: true
      });
    }
  });
}
function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
  if (typeof emitter.on === 'function') {
    eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
  }
}
function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
  if (typeof emitter.on === 'function') {
    if (flags.once) {
      emitter.once(name, listener);
    } else {
      emitter.on(name, listener);
    }
  } else if (typeof emitter.addEventListener === 'function') {
    // EventTarget does not have `error` event semantics like Node
    // EventEmitters, we do not listen for `error` events here.
    emitter.addEventListener(name, function wrapListener(arg) {
      // IE does not have builtin `{ once: true }` support so we
      // have to do it manually.
      if (flags.once) {
        emitter.removeEventListener(name, wrapListener);
      }
      listener(arg);
    });
  } else {
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
  }
}

/***/ }),

/***/ "./node_modules/html-entities/lib/index.js":
/*!*************************************************!*\
  !*** ./node_modules/html-entities/lib/index.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
var named_references_1 = __webpack_require__(/*! ./named-references */ "./node_modules/html-entities/lib/named-references.js");
var numeric_unicode_map_1 = __webpack_require__(/*! ./numeric-unicode-map */ "./node_modules/html-entities/lib/numeric-unicode-map.js");
var surrogate_pairs_1 = __webpack_require__(/*! ./surrogate-pairs */ "./node_modules/html-entities/lib/surrogate-pairs.js");
var allNamedReferences = __assign(__assign({}, named_references_1.namedReferences), {
  all: named_references_1.namedReferences.html5
});
function replaceUsingRegExp(macroText, macroRegExp, macroReplacer) {
  macroRegExp.lastIndex = 0;
  var replaceMatch = macroRegExp.exec(macroText);
  var replaceResult;
  if (replaceMatch) {
    replaceResult = "";
    var replaceLastIndex = 0;
    do {
      if (replaceLastIndex !== replaceMatch.index) {
        replaceResult += macroText.substring(replaceLastIndex, replaceMatch.index);
      }
      var replaceInput = replaceMatch[0];
      replaceResult += macroReplacer(replaceInput);
      replaceLastIndex = replaceMatch.index + replaceInput.length;
    } while (replaceMatch = macroRegExp.exec(macroText));
    if (replaceLastIndex !== macroText.length) {
      replaceResult += macroText.substring(replaceLastIndex);
    }
  } else {
    replaceResult = macroText;
  }
  return replaceResult;
}
var encodeRegExps = {
  specialChars: /[<>'"&]/g,
  nonAscii: /[<>'"&\u0080-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/g,
  nonAsciiPrintable: /[<>'"&\x01-\x08\x11-\x15\x17-\x1F\x7f-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/g,
  nonAsciiPrintableOnly: /[\x01-\x08\x11-\x15\x17-\x1F\x7f-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/g,
  extensive: /[\x01-\x0c\x0e-\x1f\x21-\x2c\x2e-\x2f\x3a-\x40\x5b-\x60\x7b-\x7d\x7f-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/g
};
var defaultEncodeOptions = {
  mode: "specialChars",
  level: "all",
  numeric: "decimal"
};
function encode(text, _a) {
  var _b = _a === void 0 ? defaultEncodeOptions : _a,
    _c = _b.mode,
    mode = _c === void 0 ? "specialChars" : _c,
    _d = _b.numeric,
    numeric = _d === void 0 ? "decimal" : _d,
    _e = _b.level,
    level = _e === void 0 ? "all" : _e;
  if (!text) {
    return "";
  }
  var encodeRegExp = encodeRegExps[mode];
  var references = allNamedReferences[level].characters;
  var isHex = numeric === "hexadecimal";
  return replaceUsingRegExp(text, encodeRegExp, function (input) {
    var result = references[input];
    if (!result) {
      var code = input.length > 1 ? surrogate_pairs_1.getCodePoint(input, 0) : input.charCodeAt(0);
      result = (isHex ? "&#x" + code.toString(16) : "&#" + code) + ";";
    }
    return result;
  });
}
exports.encode = encode;
var defaultDecodeOptions = {
  scope: "body",
  level: "all"
};
var strict = /&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);/g;
var attribute = /&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+)[;=]?/g;
var baseDecodeRegExps = {
  xml: {
    strict: strict,
    attribute: attribute,
    body: named_references_1.bodyRegExps.xml
  },
  html4: {
    strict: strict,
    attribute: attribute,
    body: named_references_1.bodyRegExps.html4
  },
  html5: {
    strict: strict,
    attribute: attribute,
    body: named_references_1.bodyRegExps.html5
  }
};
var decodeRegExps = __assign(__assign({}, baseDecodeRegExps), {
  all: baseDecodeRegExps.html5
});
var fromCharCode = String.fromCharCode;
var outOfBoundsChar = fromCharCode(65533);
var defaultDecodeEntityOptions = {
  level: "all"
};
function getDecodedEntity(entity, references, isAttribute, isStrict) {
  var decodeResult = entity;
  var decodeEntityLastChar = entity[entity.length - 1];
  if (isAttribute && decodeEntityLastChar === "=") {
    decodeResult = entity;
  } else if (isStrict && decodeEntityLastChar !== ";") {
    decodeResult = entity;
  } else {
    var decodeResultByReference = references[entity];
    if (decodeResultByReference) {
      decodeResult = decodeResultByReference;
    } else if (entity[0] === "&" && entity[1] === "#") {
      var decodeSecondChar = entity[2];
      var decodeCode = decodeSecondChar == "x" || decodeSecondChar == "X" ? parseInt(entity.substr(3), 16) : parseInt(entity.substr(2));
      decodeResult = decodeCode >= 1114111 ? outOfBoundsChar : decodeCode > 65535 ? surrogate_pairs_1.fromCodePoint(decodeCode) : fromCharCode(numeric_unicode_map_1.numericUnicodeMap[decodeCode] || decodeCode);
    }
  }
  return decodeResult;
}
function decodeEntity(entity, _a) {
  var _b = (_a === void 0 ? defaultDecodeEntityOptions : _a).level,
    level = _b === void 0 ? "all" : _b;
  if (!entity) {
    return "";
  }
  return getDecodedEntity(entity, allNamedReferences[level].entities, false, false);
}
exports.decodeEntity = decodeEntity;
function decode(text, _a) {
  var _b = _a === void 0 ? defaultDecodeOptions : _a,
    _c = _b.level,
    level = _c === void 0 ? "all" : _c,
    _d = _b.scope,
    scope = _d === void 0 ? level === "xml" ? "strict" : "body" : _d;
  if (!text) {
    return "";
  }
  var decodeRegExp = decodeRegExps[level][scope];
  var references = allNamedReferences[level].entities;
  var isAttribute = scope === "attribute";
  var isStrict = scope === "strict";
  return replaceUsingRegExp(text, decodeRegExp, function (entity) {
    return getDecodedEntity(entity, references, isAttribute, isStrict);
  });
}
exports.decode = decode;

/***/ }),

/***/ "./node_modules/html-entities/lib/named-references.js":
/*!************************************************************!*\
  !*** ./node_modules/html-entities/lib/named-references.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.bodyRegExps = {
  xml: /&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g,
  html4: /&notin;|&(?:nbsp|iexcl|cent|pound|curren|yen|brvbar|sect|uml|copy|ordf|laquo|not|shy|reg|macr|deg|plusmn|sup2|sup3|acute|micro|para|middot|cedil|sup1|ordm|raquo|frac14|frac12|frac34|iquest|Agrave|Aacute|Acirc|Atilde|Auml|Aring|AElig|Ccedil|Egrave|Eacute|Ecirc|Euml|Igrave|Iacute|Icirc|Iuml|ETH|Ntilde|Ograve|Oacute|Ocirc|Otilde|Ouml|times|Oslash|Ugrave|Uacute|Ucirc|Uuml|Yacute|THORN|szlig|agrave|aacute|acirc|atilde|auml|aring|aelig|ccedil|egrave|eacute|ecirc|euml|igrave|iacute|icirc|iuml|eth|ntilde|ograve|oacute|ocirc|otilde|ouml|divide|oslash|ugrave|uacute|ucirc|uuml|yacute|thorn|yuml|quot|amp|lt|gt|#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g,
  html5: /&centerdot;|&copysr;|&divideontimes;|&gtcc;|&gtcir;|&gtdot;|&gtlPar;|&gtquest;|&gtrapprox;|&gtrarr;|&gtrdot;|&gtreqless;|&gtreqqless;|&gtrless;|&gtrsim;|&ltcc;|&ltcir;|&ltdot;|&lthree;|&ltimes;|&ltlarr;|&ltquest;|&ltrPar;|&ltri;|&ltrie;|&ltrif;|&notin;|&notinE;|&notindot;|&notinva;|&notinvb;|&notinvc;|&notni;|&notniva;|&notnivb;|&notnivc;|&parallel;|&timesb;|&timesbar;|&timesd;|&(?:AElig|AMP|Aacute|Acirc|Agrave|Aring|Atilde|Auml|COPY|Ccedil|ETH|Eacute|Ecirc|Egrave|Euml|GT|Iacute|Icirc|Igrave|Iuml|LT|Ntilde|Oacute|Ocirc|Ograve|Oslash|Otilde|Ouml|QUOT|REG|THORN|Uacute|Ucirc|Ugrave|Uuml|Yacute|aacute|acirc|acute|aelig|agrave|amp|aring|atilde|auml|brvbar|ccedil|cedil|cent|copy|curren|deg|divide|eacute|ecirc|egrave|eth|euml|frac12|frac14|frac34|gt|iacute|icirc|iexcl|igrave|iquest|iuml|laquo|lt|macr|micro|middot|nbsp|not|ntilde|oacute|ocirc|ograve|ordf|ordm|oslash|otilde|ouml|para|plusmn|pound|quot|raquo|reg|sect|shy|sup1|sup2|sup3|szlig|thorn|times|uacute|ucirc|ugrave|uml|uuml|yacute|yen|yuml|#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g
};
exports.namedReferences = {
  xml: {
    entities: {
      "&lt;": "<",
      "&gt;": ">",
      "&quot;": '"',
      "&apos;": "'",
      "&amp;": "&"
    },
    characters: {
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&apos;",
      "&": "&amp;"
    }
  },
  html4: {
    entities: {
      "&apos;": "'",
      "&nbsp": " ",
      "&nbsp;": " ",
      "&iexcl": "¡",
      "&iexcl;": "¡",
      "&cent": "¢",
      "&cent;": "¢",
      "&pound": "£",
      "&pound;": "£",
      "&curren": "¤",
      "&curren;": "¤",
      "&yen": "¥",
      "&yen;": "¥",
      "&brvbar": "¦",
      "&brvbar;": "¦",
      "&sect": "§",
      "&sect;": "§",
      "&uml": "¨",
      "&uml;": "¨",
      "&copy": "©",
      "&copy;": "©",
      "&ordf": "ª",
      "&ordf;": "ª",
      "&laquo": "«",
      "&laquo;": "«",
      "&not": "¬",
      "&not;": "¬",
      "&shy": "­",
      "&shy;": "­",
      "&reg": "®",
      "&reg;": "®",
      "&macr": "¯",
      "&macr;": "¯",
      "&deg": "°",
      "&deg;": "°",
      "&plusmn": "±",
      "&plusmn;": "±",
      "&sup2": "²",
      "&sup2;": "²",
      "&sup3": "³",
      "&sup3;": "³",
      "&acute": "´",
      "&acute;": "´",
      "&micro": "µ",
      "&micro;": "µ",
      "&para": "¶",
      "&para;": "¶",
      "&middot": "·",
      "&middot;": "·",
      "&cedil": "¸",
      "&cedil;": "¸",
      "&sup1": "¹",
      "&sup1;": "¹",
      "&ordm": "º",
      "&ordm;": "º",
      "&raquo": "»",
      "&raquo;": "»",
      "&frac14": "¼",
      "&frac14;": "¼",
      "&frac12": "½",
      "&frac12;": "½",
      "&frac34": "¾",
      "&frac34;": "¾",
      "&iquest": "¿",
      "&iquest;": "¿",
      "&Agrave": "À",
      "&Agrave;": "À",
      "&Aacute": "Á",
      "&Aacute;": "Á",
      "&Acirc": "Â",
      "&Acirc;": "Â",
      "&Atilde": "Ã",
      "&Atilde;": "Ã",
      "&Auml": "Ä",
      "&Auml;": "Ä",
      "&Aring": "Å",
      "&Aring;": "Å",
      "&AElig": "Æ",
      "&AElig;": "Æ",
      "&Ccedil": "Ç",
      "&Ccedil;": "Ç",
      "&Egrave": "È",
      "&Egrave;": "È",
      "&Eacute": "É",
      "&Eacute;": "É",
      "&Ecirc": "Ê",
      "&Ecirc;": "Ê",
      "&Euml": "Ë",
      "&Euml;": "Ë",
      "&Igrave": "Ì",
      "&Igrave;": "Ì",
      "&Iacute": "Í",
      "&Iacute;": "Í",
      "&Icirc": "Î",
      "&Icirc;": "Î",
      "&Iuml": "Ï",
      "&Iuml;": "Ï",
      "&ETH": "Ð",
      "&ETH;": "Ð",
      "&Ntilde": "Ñ",
      "&Ntilde;": "Ñ",
      "&Ograve": "Ò",
      "&Ograve;": "Ò",
      "&Oacute": "Ó",
      "&Oacute;": "Ó",
      "&Ocirc": "Ô",
      "&Ocirc;": "Ô",
      "&Otilde": "Õ",
      "&Otilde;": "Õ",
      "&Ouml": "Ö",
      "&Ouml;": "Ö",
      "&times": "×",
      "&times;": "×",
      "&Oslash": "Ø",
      "&Oslash;": "Ø",
      "&Ugrave": "Ù",
      "&Ugrave;": "Ù",
      "&Uacute": "Ú",
      "&Uacute;": "Ú",
      "&Ucirc": "Û",
      "&Ucirc;": "Û",
      "&Uuml": "Ü",
      "&Uuml;": "Ü",
      "&Yacute": "Ý",
      "&Yacute;": "Ý",
      "&THORN": "Þ",
      "&THORN;": "Þ",
      "&szlig": "ß",
      "&szlig;": "ß",
      "&agrave": "à",
      "&agrave;": "à",
      "&aacute": "á",
      "&aacute;": "á",
      "&acirc": "â",
      "&acirc;": "â",
      "&atilde": "ã",
      "&atilde;": "ã",
      "&auml": "ä",
      "&auml;": "ä",
      "&aring": "å",
      "&aring;": "å",
      "&aelig": "æ",
      "&aelig;": "æ",
      "&ccedil": "ç",
      "&ccedil;": "ç",
      "&egrave": "è",
      "&egrave;": "è",
      "&eacute": "é",
      "&eacute;": "é",
      "&ecirc": "ê",
      "&ecirc;": "ê",
      "&euml": "ë",
      "&euml;": "ë",
      "&igrave": "ì",
      "&igrave;": "ì",
      "&iacute": "í",
      "&iacute;": "í",
      "&icirc": "î",
      "&icirc;": "î",
      "&iuml": "ï",
      "&iuml;": "ï",
      "&eth": "ð",
      "&eth;": "ð",
      "&ntilde": "ñ",
      "&ntilde;": "ñ",
      "&ograve": "ò",
      "&ograve;": "ò",
      "&oacute": "ó",
      "&oacute;": "ó",
      "&ocirc": "ô",
      "&ocirc;": "ô",
      "&otilde": "õ",
      "&otilde;": "õ",
      "&ouml": "ö",
      "&ouml;": "ö",
      "&divide": "÷",
      "&divide;": "÷",
      "&oslash": "ø",
      "&oslash;": "ø",
      "&ugrave": "ù",
      "&ugrave;": "ù",
      "&uacute": "ú",
      "&uacute;": "ú",
      "&ucirc": "û",
      "&ucirc;": "û",
      "&uuml": "ü",
      "&uuml;": "ü",
      "&yacute": "ý",
      "&yacute;": "ý",
      "&thorn": "þ",
      "&thorn;": "þ",
      "&yuml": "ÿ",
      "&yuml;": "ÿ",
      "&quot": '"',
      "&quot;": '"',
      "&amp": "&",
      "&amp;": "&",
      "&lt": "<",
      "&lt;": "<",
      "&gt": ">",
      "&gt;": ">",
      "&OElig;": "Œ",
      "&oelig;": "œ",
      "&Scaron;": "Š",
      "&scaron;": "š",
      "&Yuml;": "Ÿ",
      "&circ;": "ˆ",
      "&tilde;": "˜",
      "&ensp;": " ",
      "&emsp;": " ",
      "&thinsp;": " ",
      "&zwnj;": "‌",
      "&zwj;": "‍",
      "&lrm;": "‎",
      "&rlm;": "‏",
      "&ndash;": "–",
      "&mdash;": "—",
      "&lsquo;": "‘",
      "&rsquo;": "’",
      "&sbquo;": "‚",
      "&ldquo;": "“",
      "&rdquo;": "”",
      "&bdquo;": "„",
      "&dagger;": "†",
      "&Dagger;": "‡",
      "&permil;": "‰",
      "&lsaquo;": "‹",
      "&rsaquo;": "›",
      "&euro;": "€",
      "&fnof;": "ƒ",
      "&Alpha;": "Α",
      "&Beta;": "Β",
      "&Gamma;": "Γ",
      "&Delta;": "Δ",
      "&Epsilon;": "Ε",
      "&Zeta;": "Ζ",
      "&Eta;": "Η",
      "&Theta;": "Θ",
      "&Iota;": "Ι",
      "&Kappa;": "Κ",
      "&Lambda;": "Λ",
      "&Mu;": "Μ",
      "&Nu;": "Ν",
      "&Xi;": "Ξ",
      "&Omicron;": "Ο",
      "&Pi;": "Π",
      "&Rho;": "Ρ",
      "&Sigma;": "Σ",
      "&Tau;": "Τ",
      "&Upsilon;": "Υ",
      "&Phi;": "Φ",
      "&Chi;": "Χ",
      "&Psi;": "Ψ",
      "&Omega;": "Ω",
      "&alpha;": "α",
      "&beta;": "β",
      "&gamma;": "γ",
      "&delta;": "δ",
      "&epsilon;": "ε",
      "&zeta;": "ζ",
      "&eta;": "η",
      "&theta;": "θ",
      "&iota;": "ι",
      "&kappa;": "κ",
      "&lambda;": "λ",
      "&mu;": "μ",
      "&nu;": "ν",
      "&xi;": "ξ",
      "&omicron;": "ο",
      "&pi;": "π",
      "&rho;": "ρ",
      "&sigmaf;": "ς",
      "&sigma;": "σ",
      "&tau;": "τ",
      "&upsilon;": "υ",
      "&phi;": "φ",
      "&chi;": "χ",
      "&psi;": "ψ",
      "&omega;": "ω",
      "&thetasym;": "ϑ",
      "&upsih;": "ϒ",
      "&piv;": "ϖ",
      "&bull;": "•",
      "&hellip;": "…",
      "&prime;": "′",
      "&Prime;": "″",
      "&oline;": "‾",
      "&frasl;": "⁄",
      "&weierp;": "℘",
      "&image;": "ℑ",
      "&real;": "ℜ",
      "&trade;": "™",
      "&alefsym;": "ℵ",
      "&larr;": "←",
      "&uarr;": "↑",
      "&rarr;": "→",
      "&darr;": "↓",
      "&harr;": "↔",
      "&crarr;": "↵",
      "&lArr;": "⇐",
      "&uArr;": "⇑",
      "&rArr;": "⇒",
      "&dArr;": "⇓",
      "&hArr;": "⇔",
      "&forall;": "∀",
      "&part;": "∂",
      "&exist;": "∃",
      "&empty;": "∅",
      "&nabla;": "∇",
      "&isin;": "∈",
      "&notin;": "∉",
      "&ni;": "∋",
      "&prod;": "∏",
      "&sum;": "∑",
      "&minus;": "−",
      "&lowast;": "∗",
      "&radic;": "√",
      "&prop;": "∝",
      "&infin;": "∞",
      "&ang;": "∠",
      "&and;": "∧",
      "&or;": "∨",
      "&cap;": "∩",
      "&cup;": "∪",
      "&int;": "∫",
      "&there4;": "∴",
      "&sim;": "∼",
      "&cong;": "≅",
      "&asymp;": "≈",
      "&ne;": "≠",
      "&equiv;": "≡",
      "&le;": "≤",
      "&ge;": "≥",
      "&sub;": "⊂",
      "&sup;": "⊃",
      "&nsub;": "⊄",
      "&sube;": "⊆",
      "&supe;": "⊇",
      "&oplus;": "⊕",
      "&otimes;": "⊗",
      "&perp;": "⊥",
      "&sdot;": "⋅",
      "&lceil;": "⌈",
      "&rceil;": "⌉",
      "&lfloor;": "⌊",
      "&rfloor;": "⌋",
      "&lang;": "〈",
      "&rang;": "〉",
      "&loz;": "◊",
      "&spades;": "♠",
      "&clubs;": "♣",
      "&hearts;": "♥",
      "&diams;": "♦"
    },
    characters: {
      "'": "&apos;",
      " ": "&nbsp;",
      "¡": "&iexcl;",
      "¢": "&cent;",
      "£": "&pound;",
      "¤": "&curren;",
      "¥": "&yen;",
      "¦": "&brvbar;",
      "§": "&sect;",
      "¨": "&uml;",
      "©": "&copy;",
      "ª": "&ordf;",
      "«": "&laquo;",
      "¬": "&not;",
      "­": "&shy;",
      "®": "&reg;",
      "¯": "&macr;",
      "°": "&deg;",
      "±": "&plusmn;",
      "²": "&sup2;",
      "³": "&sup3;",
      "´": "&acute;",
      "µ": "&micro;",
      "¶": "&para;",
      "·": "&middot;",
      "¸": "&cedil;",
      "¹": "&sup1;",
      "º": "&ordm;",
      "»": "&raquo;",
      "¼": "&frac14;",
      "½": "&frac12;",
      "¾": "&frac34;",
      "¿": "&iquest;",
      "À": "&Agrave;",
      "Á": "&Aacute;",
      "Â": "&Acirc;",
      "Ã": "&Atilde;",
      "Ä": "&Auml;",
      "Å": "&Aring;",
      "Æ": "&AElig;",
      "Ç": "&Ccedil;",
      "È": "&Egrave;",
      "É": "&Eacute;",
      "Ê": "&Ecirc;",
      "Ë": "&Euml;",
      "Ì": "&Igrave;",
      "Í": "&Iacute;",
      "Î": "&Icirc;",
      "Ï": "&Iuml;",
      "Ð": "&ETH;",
      "Ñ": "&Ntilde;",
      "Ò": "&Ograve;",
      "Ó": "&Oacute;",
      "Ô": "&Ocirc;",
      "Õ": "&Otilde;",
      "Ö": "&Ouml;",
      "×": "&times;",
      "Ø": "&Oslash;",
      "Ù": "&Ugrave;",
      "Ú": "&Uacute;",
      "Û": "&Ucirc;",
      "Ü": "&Uuml;",
      "Ý": "&Yacute;",
      "Þ": "&THORN;",
      "ß": "&szlig;",
      "à": "&agrave;",
      "á": "&aacute;",
      "â": "&acirc;",
      "ã": "&atilde;",
      "ä": "&auml;",
      "å": "&aring;",
      "æ": "&aelig;",
      "ç": "&ccedil;",
      "è": "&egrave;",
      "é": "&eacute;",
      "ê": "&ecirc;",
      "ë": "&euml;",
      "ì": "&igrave;",
      "í": "&iacute;",
      "î": "&icirc;",
      "ï": "&iuml;",
      "ð": "&eth;",
      "ñ": "&ntilde;",
      "ò": "&ograve;",
      "ó": "&oacute;",
      "ô": "&ocirc;",
      "õ": "&otilde;",
      "ö": "&ouml;",
      "÷": "&divide;",
      "ø": "&oslash;",
      "ù": "&ugrave;",
      "ú": "&uacute;",
      "û": "&ucirc;",
      "ü": "&uuml;",
      "ý": "&yacute;",
      "þ": "&thorn;",
      "ÿ": "&yuml;",
      '"': "&quot;",
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "Œ": "&OElig;",
      "œ": "&oelig;",
      "Š": "&Scaron;",
      "š": "&scaron;",
      "Ÿ": "&Yuml;",
      "ˆ": "&circ;",
      "˜": "&tilde;",
      " ": "&ensp;",
      " ": "&emsp;",
      " ": "&thinsp;",
      "‌": "&zwnj;",
      "‍": "&zwj;",
      "‎": "&lrm;",
      "‏": "&rlm;",
      "–": "&ndash;",
      "—": "&mdash;",
      "‘": "&lsquo;",
      "’": "&rsquo;",
      "‚": "&sbquo;",
      "“": "&ldquo;",
      "”": "&rdquo;",
      "„": "&bdquo;",
      "†": "&dagger;",
      "‡": "&Dagger;",
      "‰": "&permil;",
      "‹": "&lsaquo;",
      "›": "&rsaquo;",
      "€": "&euro;",
      "ƒ": "&fnof;",
      "Α": "&Alpha;",
      "Β": "&Beta;",
      "Γ": "&Gamma;",
      "Δ": "&Delta;",
      "Ε": "&Epsilon;",
      "Ζ": "&Zeta;",
      "Η": "&Eta;",
      "Θ": "&Theta;",
      "Ι": "&Iota;",
      "Κ": "&Kappa;",
      "Λ": "&Lambda;",
      "Μ": "&Mu;",
      "Ν": "&Nu;",
      "Ξ": "&Xi;",
      "Ο": "&Omicron;",
      "Π": "&Pi;",
      "Ρ": "&Rho;",
      "Σ": "&Sigma;",
      "Τ": "&Tau;",
      "Υ": "&Upsilon;",
      "Φ": "&Phi;",
      "Χ": "&Chi;",
      "Ψ": "&Psi;",
      "Ω": "&Omega;",
      "α": "&alpha;",
      "β": "&beta;",
      "γ": "&gamma;",
      "δ": "&delta;",
      "ε": "&epsilon;",
      "ζ": "&zeta;",
      "η": "&eta;",
      "θ": "&theta;",
      "ι": "&iota;",
      "κ": "&kappa;",
      "λ": "&lambda;",
      "μ": "&mu;",
      "ν": "&nu;",
      "ξ": "&xi;",
      "ο": "&omicron;",
      "π": "&pi;",
      "ρ": "&rho;",
      "ς": "&sigmaf;",
      "σ": "&sigma;",
      "τ": "&tau;",
      "υ": "&upsilon;",
      "φ": "&phi;",
      "χ": "&chi;",
      "ψ": "&psi;",
      "ω": "&omega;",
      "ϑ": "&thetasym;",
      "ϒ": "&upsih;",
      "ϖ": "&piv;",
      "•": "&bull;",
      "…": "&hellip;",
      "′": "&prime;",
      "″": "&Prime;",
      "‾": "&oline;",
      "⁄": "&frasl;",
      "℘": "&weierp;",
      "ℑ": "&image;",
      "ℜ": "&real;",
      "™": "&trade;",
      "ℵ": "&alefsym;",
      "←": "&larr;",
      "↑": "&uarr;",
      "→": "&rarr;",
      "↓": "&darr;",
      "↔": "&harr;",
      "↵": "&crarr;",
      "⇐": "&lArr;",
      "⇑": "&uArr;",
      "⇒": "&rArr;",
      "⇓": "&dArr;",
      "⇔": "&hArr;",
      "∀": "&forall;",
      "∂": "&part;",
      "∃": "&exist;",
      "∅": "&empty;",
      "∇": "&nabla;",
      "∈": "&isin;",
      "∉": "&notin;",
      "∋": "&ni;",
      "∏": "&prod;",
      "∑": "&sum;",
      "−": "&minus;",
      "∗": "&lowast;",
      "√": "&radic;",
      "∝": "&prop;",
      "∞": "&infin;",
      "∠": "&ang;",
      "∧": "&and;",
      "∨": "&or;",
      "∩": "&cap;",
      "∪": "&cup;",
      "∫": "&int;",
      "∴": "&there4;",
      "∼": "&sim;",
      "≅": "&cong;",
      "≈": "&asymp;",
      "≠": "&ne;",
      "≡": "&equiv;",
      "≤": "&le;",
      "≥": "&ge;",
      "⊂": "&sub;",
      "⊃": "&sup;",
      "⊄": "&nsub;",
      "⊆": "&sube;",
      "⊇": "&supe;",
      "⊕": "&oplus;",
      "⊗": "&otimes;",
      "⊥": "&perp;",
      "⋅": "&sdot;",
      "⌈": "&lceil;",
      "⌉": "&rceil;",
      "⌊": "&lfloor;",
      "⌋": "&rfloor;",
      "〈": "&lang;",
      "〉": "&rang;",
      "◊": "&loz;",
      "♠": "&spades;",
      "♣": "&clubs;",
      "♥": "&hearts;",
      "♦": "&diams;"
    }
  },
  html5: {
    entities: {
      "&AElig": "Æ",
      "&AElig;": "Æ",
      "&AMP": "&",
      "&AMP;": "&",
      "&Aacute": "Á",
      "&Aacute;": "Á",
      "&Abreve;": "Ă",
      "&Acirc": "Â",
      "&Acirc;": "Â",
      "&Acy;": "А",
      "&Afr;": "𝔄",
      "&Agrave": "À",
      "&Agrave;": "À",
      "&Alpha;": "Α",
      "&Amacr;": "Ā",
      "&And;": "⩓",
      "&Aogon;": "Ą",
      "&Aopf;": "𝔸",
      "&ApplyFunction;": "⁡",
      "&Aring": "Å",
      "&Aring;": "Å",
      "&Ascr;": "𝒜",
      "&Assign;": "≔",
      "&Atilde": "Ã",
      "&Atilde;": "Ã",
      "&Auml": "Ä",
      "&Auml;": "Ä",
      "&Backslash;": "∖",
      "&Barv;": "⫧",
      "&Barwed;": "⌆",
      "&Bcy;": "Б",
      "&Because;": "∵",
      "&Bernoullis;": "ℬ",
      "&Beta;": "Β",
      "&Bfr;": "𝔅",
      "&Bopf;": "𝔹",
      "&Breve;": "˘",
      "&Bscr;": "ℬ",
      "&Bumpeq;": "≎",
      "&CHcy;": "Ч",
      "&COPY": "©",
      "&COPY;": "©",
      "&Cacute;": "Ć",
      "&Cap;": "⋒",
      "&CapitalDifferentialD;": "ⅅ",
      "&Cayleys;": "ℭ",
      "&Ccaron;": "Č",
      "&Ccedil": "Ç",
      "&Ccedil;": "Ç",
      "&Ccirc;": "Ĉ",
      "&Cconint;": "∰",
      "&Cdot;": "Ċ",
      "&Cedilla;": "¸",
      "&CenterDot;": "·",
      "&Cfr;": "ℭ",
      "&Chi;": "Χ",
      "&CircleDot;": "⊙",
      "&CircleMinus;": "⊖",
      "&CirclePlus;": "⊕",
      "&CircleTimes;": "⊗",
      "&ClockwiseContourIntegral;": "∲",
      "&CloseCurlyDoubleQuote;": "”",
      "&CloseCurlyQuote;": "’",
      "&Colon;": "∷",
      "&Colone;": "⩴",
      "&Congruent;": "≡",
      "&Conint;": "∯",
      "&ContourIntegral;": "∮",
      "&Copf;": "ℂ",
      "&Coproduct;": "∐",
      "&CounterClockwiseContourIntegral;": "∳",
      "&Cross;": "⨯",
      "&Cscr;": "𝒞",
      "&Cup;": "⋓",
      "&CupCap;": "≍",
      "&DD;": "ⅅ",
      "&DDotrahd;": "⤑",
      "&DJcy;": "Ђ",
      "&DScy;": "Ѕ",
      "&DZcy;": "Џ",
      "&Dagger;": "‡",
      "&Darr;": "↡",
      "&Dashv;": "⫤",
      "&Dcaron;": "Ď",
      "&Dcy;": "Д",
      "&Del;": "∇",
      "&Delta;": "Δ",
      "&Dfr;": "𝔇",
      "&DiacriticalAcute;": "´",
      "&DiacriticalDot;": "˙",
      "&DiacriticalDoubleAcute;": "˝",
      "&DiacriticalGrave;": "`",
      "&DiacriticalTilde;": "˜",
      "&Diamond;": "⋄",
      "&DifferentialD;": "ⅆ",
      "&Dopf;": "𝔻",
      "&Dot;": "¨",
      "&DotDot;": "⃜",
      "&DotEqual;": "≐",
      "&DoubleContourIntegral;": "∯",
      "&DoubleDot;": "¨",
      "&DoubleDownArrow;": "⇓",
      "&DoubleLeftArrow;": "⇐",
      "&DoubleLeftRightArrow;": "⇔",
      "&DoubleLeftTee;": "⫤",
      "&DoubleLongLeftArrow;": "⟸",
      "&DoubleLongLeftRightArrow;": "⟺",
      "&DoubleLongRightArrow;": "⟹",
      "&DoubleRightArrow;": "⇒",
      "&DoubleRightTee;": "⊨",
      "&DoubleUpArrow;": "⇑",
      "&DoubleUpDownArrow;": "⇕",
      "&DoubleVerticalBar;": "∥",
      "&DownArrow;": "↓",
      "&DownArrowBar;": "⤓",
      "&DownArrowUpArrow;": "⇵",
      "&DownBreve;": "̑",
      "&DownLeftRightVector;": "⥐",
      "&DownLeftTeeVector;": "⥞",
      "&DownLeftVector;": "↽",
      "&DownLeftVectorBar;": "⥖",
      "&DownRightTeeVector;": "⥟",
      "&DownRightVector;": "⇁",
      "&DownRightVectorBar;": "⥗",
      "&DownTee;": "⊤",
      "&DownTeeArrow;": "↧",
      "&Downarrow;": "⇓",
      "&Dscr;": "𝒟",
      "&Dstrok;": "Đ",
      "&ENG;": "Ŋ",
      "&ETH": "Ð",
      "&ETH;": "Ð",
      "&Eacute": "É",
      "&Eacute;": "É",
      "&Ecaron;": "Ě",
      "&Ecirc": "Ê",
      "&Ecirc;": "Ê",
      "&Ecy;": "Э",
      "&Edot;": "Ė",
      "&Efr;": "𝔈",
      "&Egrave": "È",
      "&Egrave;": "È",
      "&Element;": "∈",
      "&Emacr;": "Ē",
      "&EmptySmallSquare;": "◻",
      "&EmptyVerySmallSquare;": "▫",
      "&Eogon;": "Ę",
      "&Eopf;": "𝔼",
      "&Epsilon;": "Ε",
      "&Equal;": "⩵",
      "&EqualTilde;": "≂",
      "&Equilibrium;": "⇌",
      "&Escr;": "ℰ",
      "&Esim;": "⩳",
      "&Eta;": "Η",
      "&Euml": "Ë",
      "&Euml;": "Ë",
      "&Exists;": "∃",
      "&ExponentialE;": "ⅇ",
      "&Fcy;": "Ф",
      "&Ffr;": "𝔉",
      "&FilledSmallSquare;": "◼",
      "&FilledVerySmallSquare;": "▪",
      "&Fopf;": "𝔽",
      "&ForAll;": "∀",
      "&Fouriertrf;": "ℱ",
      "&Fscr;": "ℱ",
      "&GJcy;": "Ѓ",
      "&GT": ">",
      "&GT;": ">",
      "&Gamma;": "Γ",
      "&Gammad;": "Ϝ",
      "&Gbreve;": "Ğ",
      "&Gcedil;": "Ģ",
      "&Gcirc;": "Ĝ",
      "&Gcy;": "Г",
      "&Gdot;": "Ġ",
      "&Gfr;": "𝔊",
      "&Gg;": "⋙",
      "&Gopf;": "𝔾",
      "&GreaterEqual;": "≥",
      "&GreaterEqualLess;": "⋛",
      "&GreaterFullEqual;": "≧",
      "&GreaterGreater;": "⪢",
      "&GreaterLess;": "≷",
      "&GreaterSlantEqual;": "⩾",
      "&GreaterTilde;": "≳",
      "&Gscr;": "𝒢",
      "&Gt;": "≫",
      "&HARDcy;": "Ъ",
      "&Hacek;": "ˇ",
      "&Hat;": "^",
      "&Hcirc;": "Ĥ",
      "&Hfr;": "ℌ",
      "&HilbertSpace;": "ℋ",
      "&Hopf;": "ℍ",
      "&HorizontalLine;": "─",
      "&Hscr;": "ℋ",
      "&Hstrok;": "Ħ",
      "&HumpDownHump;": "≎",
      "&HumpEqual;": "≏",
      "&IEcy;": "Е",
      "&IJlig;": "Ĳ",
      "&IOcy;": "Ё",
      "&Iacute": "Í",
      "&Iacute;": "Í",
      "&Icirc": "Î",
      "&Icirc;": "Î",
      "&Icy;": "И",
      "&Idot;": "İ",
      "&Ifr;": "ℑ",
      "&Igrave": "Ì",
      "&Igrave;": "Ì",
      "&Im;": "ℑ",
      "&Imacr;": "Ī",
      "&ImaginaryI;": "ⅈ",
      "&Implies;": "⇒",
      "&Int;": "∬",
      "&Integral;": "∫",
      "&Intersection;": "⋂",
      "&InvisibleComma;": "⁣",
      "&InvisibleTimes;": "⁢",
      "&Iogon;": "Į",
      "&Iopf;": "𝕀",
      "&Iota;": "Ι",
      "&Iscr;": "ℐ",
      "&Itilde;": "Ĩ",
      "&Iukcy;": "І",
      "&Iuml": "Ï",
      "&Iuml;": "Ï",
      "&Jcirc;": "Ĵ",
      "&Jcy;": "Й",
      "&Jfr;": "𝔍",
      "&Jopf;": "𝕁",
      "&Jscr;": "𝒥",
      "&Jsercy;": "Ј",
      "&Jukcy;": "Є",
      "&KHcy;": "Х",
      "&KJcy;": "Ќ",
      "&Kappa;": "Κ",
      "&Kcedil;": "Ķ",
      "&Kcy;": "К",
      "&Kfr;": "𝔎",
      "&Kopf;": "𝕂",
      "&Kscr;": "𝒦",
      "&LJcy;": "Љ",
      "&LT": "<",
      "&LT;": "<",
      "&Lacute;": "Ĺ",
      "&Lambda;": "Λ",
      "&Lang;": "⟪",
      "&Laplacetrf;": "ℒ",
      "&Larr;": "↞",
      "&Lcaron;": "Ľ",
      "&Lcedil;": "Ļ",
      "&Lcy;": "Л",
      "&LeftAngleBracket;": "⟨",
      "&LeftArrow;": "←",
      "&LeftArrowBar;": "⇤",
      "&LeftArrowRightArrow;": "⇆",
      "&LeftCeiling;": "⌈",
      "&LeftDoubleBracket;": "⟦",
      "&LeftDownTeeVector;": "⥡",
      "&LeftDownVector;": "⇃",
      "&LeftDownVectorBar;": "⥙",
      "&LeftFloor;": "⌊",
      "&LeftRightArrow;": "↔",
      "&LeftRightVector;": "⥎",
      "&LeftTee;": "⊣",
      "&LeftTeeArrow;": "↤",
      "&LeftTeeVector;": "⥚",
      "&LeftTriangle;": "⊲",
      "&LeftTriangleBar;": "⧏",
      "&LeftTriangleEqual;": "⊴",
      "&LeftUpDownVector;": "⥑",
      "&LeftUpTeeVector;": "⥠",
      "&LeftUpVector;": "↿",
      "&LeftUpVectorBar;": "⥘",
      "&LeftVector;": "↼",
      "&LeftVectorBar;": "⥒",
      "&Leftarrow;": "⇐",
      "&Leftrightarrow;": "⇔",
      "&LessEqualGreater;": "⋚",
      "&LessFullEqual;": "≦",
      "&LessGreater;": "≶",
      "&LessLess;": "⪡",
      "&LessSlantEqual;": "⩽",
      "&LessTilde;": "≲",
      "&Lfr;": "𝔏",
      "&Ll;": "⋘",
      "&Lleftarrow;": "⇚",
      "&Lmidot;": "Ŀ",
      "&LongLeftArrow;": "⟵",
      "&LongLeftRightArrow;": "⟷",
      "&LongRightArrow;": "⟶",
      "&Longleftarrow;": "⟸",
      "&Longleftrightarrow;": "⟺",
      "&Longrightarrow;": "⟹",
      "&Lopf;": "𝕃",
      "&LowerLeftArrow;": "↙",
      "&LowerRightArrow;": "↘",
      "&Lscr;": "ℒ",
      "&Lsh;": "↰",
      "&Lstrok;": "Ł",
      "&Lt;": "≪",
      "&Map;": "⤅",
      "&Mcy;": "М",
      "&MediumSpace;": " ",
      "&Mellintrf;": "ℳ",
      "&Mfr;": "𝔐",
      "&MinusPlus;": "∓",
      "&Mopf;": "𝕄",
      "&Mscr;": "ℳ",
      "&Mu;": "Μ",
      "&NJcy;": "Њ",
      "&Nacute;": "Ń",
      "&Ncaron;": "Ň",
      "&Ncedil;": "Ņ",
      "&Ncy;": "Н",
      "&NegativeMediumSpace;": "​",
      "&NegativeThickSpace;": "​",
      "&NegativeThinSpace;": "​",
      "&NegativeVeryThinSpace;": "​",
      "&NestedGreaterGreater;": "≫",
      "&NestedLessLess;": "≪",
      "&NewLine;": "\n",
      "&Nfr;": "𝔑",
      "&NoBreak;": "⁠",
      "&NonBreakingSpace;": " ",
      "&Nopf;": "ℕ",
      "&Not;": "⫬",
      "&NotCongruent;": "≢",
      "&NotCupCap;": "≭",
      "&NotDoubleVerticalBar;": "∦",
      "&NotElement;": "∉",
      "&NotEqual;": "≠",
      "&NotEqualTilde;": "≂̸",
      "&NotExists;": "∄",
      "&NotGreater;": "≯",
      "&NotGreaterEqual;": "≱",
      "&NotGreaterFullEqual;": "≧̸",
      "&NotGreaterGreater;": "≫̸",
      "&NotGreaterLess;": "≹",
      "&NotGreaterSlantEqual;": "⩾̸",
      "&NotGreaterTilde;": "≵",
      "&NotHumpDownHump;": "≎̸",
      "&NotHumpEqual;": "≏̸",
      "&NotLeftTriangle;": "⋪",
      "&NotLeftTriangleBar;": "⧏̸",
      "&NotLeftTriangleEqual;": "⋬",
      "&NotLess;": "≮",
      "&NotLessEqual;": "≰",
      "&NotLessGreater;": "≸",
      "&NotLessLess;": "≪̸",
      "&NotLessSlantEqual;": "⩽̸",
      "&NotLessTilde;": "≴",
      "&NotNestedGreaterGreater;": "⪢̸",
      "&NotNestedLessLess;": "⪡̸",
      "&NotPrecedes;": "⊀",
      "&NotPrecedesEqual;": "⪯̸",
      "&NotPrecedesSlantEqual;": "⋠",
      "&NotReverseElement;": "∌",
      "&NotRightTriangle;": "⋫",
      "&NotRightTriangleBar;": "⧐̸",
      "&NotRightTriangleEqual;": "⋭",
      "&NotSquareSubset;": "⊏̸",
      "&NotSquareSubsetEqual;": "⋢",
      "&NotSquareSuperset;": "⊐̸",
      "&NotSquareSupersetEqual;": "⋣",
      "&NotSubset;": "⊂⃒",
      "&NotSubsetEqual;": "⊈",
      "&NotSucceeds;": "⊁",
      "&NotSucceedsEqual;": "⪰̸",
      "&NotSucceedsSlantEqual;": "⋡",
      "&NotSucceedsTilde;": "≿̸",
      "&NotSuperset;": "⊃⃒",
      "&NotSupersetEqual;": "⊉",
      "&NotTilde;": "≁",
      "&NotTildeEqual;": "≄",
      "&NotTildeFullEqual;": "≇",
      "&NotTildeTilde;": "≉",
      "&NotVerticalBar;": "∤",
      "&Nscr;": "𝒩",
      "&Ntilde": "Ñ",
      "&Ntilde;": "Ñ",
      "&Nu;": "Ν",
      "&OElig;": "Œ",
      "&Oacute": "Ó",
      "&Oacute;": "Ó",
      "&Ocirc": "Ô",
      "&Ocirc;": "Ô",
      "&Ocy;": "О",
      "&Odblac;": "Ő",
      "&Ofr;": "𝔒",
      "&Ograve": "Ò",
      "&Ograve;": "Ò",
      "&Omacr;": "Ō",
      "&Omega;": "Ω",
      "&Omicron;": "Ο",
      "&Oopf;": "𝕆",
      "&OpenCurlyDoubleQuote;": "“",
      "&OpenCurlyQuote;": "‘",
      "&Or;": "⩔",
      "&Oscr;": "𝒪",
      "&Oslash": "Ø",
      "&Oslash;": "Ø",
      "&Otilde": "Õ",
      "&Otilde;": "Õ",
      "&Otimes;": "⨷",
      "&Ouml": "Ö",
      "&Ouml;": "Ö",
      "&OverBar;": "‾",
      "&OverBrace;": "⏞",
      "&OverBracket;": "⎴",
      "&OverParenthesis;": "⏜",
      "&PartialD;": "∂",
      "&Pcy;": "П",
      "&Pfr;": "𝔓",
      "&Phi;": "Φ",
      "&Pi;": "Π",
      "&PlusMinus;": "±",
      "&Poincareplane;": "ℌ",
      "&Popf;": "ℙ",
      "&Pr;": "⪻",
      "&Precedes;": "≺",
      "&PrecedesEqual;": "⪯",
      "&PrecedesSlantEqual;": "≼",
      "&PrecedesTilde;": "≾",
      "&Prime;": "″",
      "&Product;": "∏",
      "&Proportion;": "∷",
      "&Proportional;": "∝",
      "&Pscr;": "𝒫",
      "&Psi;": "Ψ",
      "&QUOT": '"',
      "&QUOT;": '"',
      "&Qfr;": "𝔔",
      "&Qopf;": "ℚ",
      "&Qscr;": "𝒬",
      "&RBarr;": "⤐",
      "&REG": "®",
      "&REG;": "®",
      "&Racute;": "Ŕ",
      "&Rang;": "⟫",
      "&Rarr;": "↠",
      "&Rarrtl;": "⤖",
      "&Rcaron;": "Ř",
      "&Rcedil;": "Ŗ",
      "&Rcy;": "Р",
      "&Re;": "ℜ",
      "&ReverseElement;": "∋",
      "&ReverseEquilibrium;": "⇋",
      "&ReverseUpEquilibrium;": "⥯",
      "&Rfr;": "ℜ",
      "&Rho;": "Ρ",
      "&RightAngleBracket;": "⟩",
      "&RightArrow;": "→",
      "&RightArrowBar;": "⇥",
      "&RightArrowLeftArrow;": "⇄",
      "&RightCeiling;": "⌉",
      "&RightDoubleBracket;": "⟧",
      "&RightDownTeeVector;": "⥝",
      "&RightDownVector;": "⇂",
      "&RightDownVectorBar;": "⥕",
      "&RightFloor;": "⌋",
      "&RightTee;": "⊢",
      "&RightTeeArrow;": "↦",
      "&RightTeeVector;": "⥛",
      "&RightTriangle;": "⊳",
      "&RightTriangleBar;": "⧐",
      "&RightTriangleEqual;": "⊵",
      "&RightUpDownVector;": "⥏",
      "&RightUpTeeVector;": "⥜",
      "&RightUpVector;": "↾",
      "&RightUpVectorBar;": "⥔",
      "&RightVector;": "⇀",
      "&RightVectorBar;": "⥓",
      "&Rightarrow;": "⇒",
      "&Ropf;": "ℝ",
      "&RoundImplies;": "⥰",
      "&Rrightarrow;": "⇛",
      "&Rscr;": "ℛ",
      "&Rsh;": "↱",
      "&RuleDelayed;": "⧴",
      "&SHCHcy;": "Щ",
      "&SHcy;": "Ш",
      "&SOFTcy;": "Ь",
      "&Sacute;": "Ś",
      "&Sc;": "⪼",
      "&Scaron;": "Š",
      "&Scedil;": "Ş",
      "&Scirc;": "Ŝ",
      "&Scy;": "С",
      "&Sfr;": "𝔖",
      "&ShortDownArrow;": "↓",
      "&ShortLeftArrow;": "←",
      "&ShortRightArrow;": "→",
      "&ShortUpArrow;": "↑",
      "&Sigma;": "Σ",
      "&SmallCircle;": "∘",
      "&Sopf;": "𝕊",
      "&Sqrt;": "√",
      "&Square;": "□",
      "&SquareIntersection;": "⊓",
      "&SquareSubset;": "⊏",
      "&SquareSubsetEqual;": "⊑",
      "&SquareSuperset;": "⊐",
      "&SquareSupersetEqual;": "⊒",
      "&SquareUnion;": "⊔",
      "&Sscr;": "𝒮",
      "&Star;": "⋆",
      "&Sub;": "⋐",
      "&Subset;": "⋐",
      "&SubsetEqual;": "⊆",
      "&Succeeds;": "≻",
      "&SucceedsEqual;": "⪰",
      "&SucceedsSlantEqual;": "≽",
      "&SucceedsTilde;": "≿",
      "&SuchThat;": "∋",
      "&Sum;": "∑",
      "&Sup;": "⋑",
      "&Superset;": "⊃",
      "&SupersetEqual;": "⊇",
      "&Supset;": "⋑",
      "&THORN": "Þ",
      "&THORN;": "Þ",
      "&TRADE;": "™",
      "&TSHcy;": "Ћ",
      "&TScy;": "Ц",
      "&Tab;": "\t",
      "&Tau;": "Τ",
      "&Tcaron;": "Ť",
      "&Tcedil;": "Ţ",
      "&Tcy;": "Т",
      "&Tfr;": "𝔗",
      "&Therefore;": "∴",
      "&Theta;": "Θ",
      "&ThickSpace;": "  ",
      "&ThinSpace;": " ",
      "&Tilde;": "∼",
      "&TildeEqual;": "≃",
      "&TildeFullEqual;": "≅",
      "&TildeTilde;": "≈",
      "&Topf;": "𝕋",
      "&TripleDot;": "⃛",
      "&Tscr;": "𝒯",
      "&Tstrok;": "Ŧ",
      "&Uacute": "Ú",
      "&Uacute;": "Ú",
      "&Uarr;": "↟",
      "&Uarrocir;": "⥉",
      "&Ubrcy;": "Ў",
      "&Ubreve;": "Ŭ",
      "&Ucirc": "Û",
      "&Ucirc;": "Û",
      "&Ucy;": "У",
      "&Udblac;": "Ű",
      "&Ufr;": "𝔘",
      "&Ugrave": "Ù",
      "&Ugrave;": "Ù",
      "&Umacr;": "Ū",
      "&UnderBar;": "_",
      "&UnderBrace;": "⏟",
      "&UnderBracket;": "⎵",
      "&UnderParenthesis;": "⏝",
      "&Union;": "⋃",
      "&UnionPlus;": "⊎",
      "&Uogon;": "Ų",
      "&Uopf;": "𝕌",
      "&UpArrow;": "↑",
      "&UpArrowBar;": "⤒",
      "&UpArrowDownArrow;": "⇅",
      "&UpDownArrow;": "↕",
      "&UpEquilibrium;": "⥮",
      "&UpTee;": "⊥",
      "&UpTeeArrow;": "↥",
      "&Uparrow;": "⇑",
      "&Updownarrow;": "⇕",
      "&UpperLeftArrow;": "↖",
      "&UpperRightArrow;": "↗",
      "&Upsi;": "ϒ",
      "&Upsilon;": "Υ",
      "&Uring;": "Ů",
      "&Uscr;": "𝒰",
      "&Utilde;": "Ũ",
      "&Uuml": "Ü",
      "&Uuml;": "Ü",
      "&VDash;": "⊫",
      "&Vbar;": "⫫",
      "&Vcy;": "В",
      "&Vdash;": "⊩",
      "&Vdashl;": "⫦",
      "&Vee;": "⋁",
      "&Verbar;": "‖",
      "&Vert;": "‖",
      "&VerticalBar;": "∣",
      "&VerticalLine;": "|",
      "&VerticalSeparator;": "❘",
      "&VerticalTilde;": "≀",
      "&VeryThinSpace;": " ",
      "&Vfr;": "𝔙",
      "&Vopf;": "𝕍",
      "&Vscr;": "𝒱",
      "&Vvdash;": "⊪",
      "&Wcirc;": "Ŵ",
      "&Wedge;": "⋀",
      "&Wfr;": "𝔚",
      "&Wopf;": "𝕎",
      "&Wscr;": "𝒲",
      "&Xfr;": "𝔛",
      "&Xi;": "Ξ",
      "&Xopf;": "𝕏",
      "&Xscr;": "𝒳",
      "&YAcy;": "Я",
      "&YIcy;": "Ї",
      "&YUcy;": "Ю",
      "&Yacute": "Ý",
      "&Yacute;": "Ý",
      "&Ycirc;": "Ŷ",
      "&Ycy;": "Ы",
      "&Yfr;": "𝔜",
      "&Yopf;": "𝕐",
      "&Yscr;": "𝒴",
      "&Yuml;": "Ÿ",
      "&ZHcy;": "Ж",
      "&Zacute;": "Ź",
      "&Zcaron;": "Ž",
      "&Zcy;": "З",
      "&Zdot;": "Ż",
      "&ZeroWidthSpace;": "​",
      "&Zeta;": "Ζ",
      "&Zfr;": "ℨ",
      "&Zopf;": "ℤ",
      "&Zscr;": "𝒵",
      "&aacute": "á",
      "&aacute;": "á",
      "&abreve;": "ă",
      "&ac;": "∾",
      "&acE;": "∾̳",
      "&acd;": "∿",
      "&acirc": "â",
      "&acirc;": "â",
      "&acute": "´",
      "&acute;": "´",
      "&acy;": "а",
      "&aelig": "æ",
      "&aelig;": "æ",
      "&af;": "⁡",
      "&afr;": "𝔞",
      "&agrave": "à",
      "&agrave;": "à",
      "&alefsym;": "ℵ",
      "&aleph;": "ℵ",
      "&alpha;": "α",
      "&amacr;": "ā",
      "&amalg;": "⨿",
      "&amp": "&",
      "&amp;": "&",
      "&and;": "∧",
      "&andand;": "⩕",
      "&andd;": "⩜",
      "&andslope;": "⩘",
      "&andv;": "⩚",
      "&ang;": "∠",
      "&ange;": "⦤",
      "&angle;": "∠",
      "&angmsd;": "∡",
      "&angmsdaa;": "⦨",
      "&angmsdab;": "⦩",
      "&angmsdac;": "⦪",
      "&angmsdad;": "⦫",
      "&angmsdae;": "⦬",
      "&angmsdaf;": "⦭",
      "&angmsdag;": "⦮",
      "&angmsdah;": "⦯",
      "&angrt;": "∟",
      "&angrtvb;": "⊾",
      "&angrtvbd;": "⦝",
      "&angsph;": "∢",
      "&angst;": "Å",
      "&angzarr;": "⍼",
      "&aogon;": "ą",
      "&aopf;": "𝕒",
      "&ap;": "≈",
      "&apE;": "⩰",
      "&apacir;": "⩯",
      "&ape;": "≊",
      "&apid;": "≋",
      "&apos;": "'",
      "&approx;": "≈",
      "&approxeq;": "≊",
      "&aring": "å",
      "&aring;": "å",
      "&ascr;": "𝒶",
      "&ast;": "*",
      "&asymp;": "≈",
      "&asympeq;": "≍",
      "&atilde": "ã",
      "&atilde;": "ã",
      "&auml": "ä",
      "&auml;": "ä",
      "&awconint;": "∳",
      "&awint;": "⨑",
      "&bNot;": "⫭",
      "&backcong;": "≌",
      "&backepsilon;": "϶",
      "&backprime;": "‵",
      "&backsim;": "∽",
      "&backsimeq;": "⋍",
      "&barvee;": "⊽",
      "&barwed;": "⌅",
      "&barwedge;": "⌅",
      "&bbrk;": "⎵",
      "&bbrktbrk;": "⎶",
      "&bcong;": "≌",
      "&bcy;": "б",
      "&bdquo;": "„",
      "&becaus;": "∵",
      "&because;": "∵",
      "&bemptyv;": "⦰",
      "&bepsi;": "϶",
      "&bernou;": "ℬ",
      "&beta;": "β",
      "&beth;": "ℶ",
      "&between;": "≬",
      "&bfr;": "𝔟",
      "&bigcap;": "⋂",
      "&bigcirc;": "◯",
      "&bigcup;": "⋃",
      "&bigodot;": "⨀",
      "&bigoplus;": "⨁",
      "&bigotimes;": "⨂",
      "&bigsqcup;": "⨆",
      "&bigstar;": "★",
      "&bigtriangledown;": "▽",
      "&bigtriangleup;": "△",
      "&biguplus;": "⨄",
      "&bigvee;": "⋁",
      "&bigwedge;": "⋀",
      "&bkarow;": "⤍",
      "&blacklozenge;": "⧫",
      "&blacksquare;": "▪",
      "&blacktriangle;": "▴",
      "&blacktriangledown;": "▾",
      "&blacktriangleleft;": "◂",
      "&blacktriangleright;": "▸",
      "&blank;": "␣",
      "&blk12;": "▒",
      "&blk14;": "░",
      "&blk34;": "▓",
      "&block;": "█",
      "&bne;": "=⃥",
      "&bnequiv;": "≡⃥",
      "&bnot;": "⌐",
      "&bopf;": "𝕓",
      "&bot;": "⊥",
      "&bottom;": "⊥",
      "&bowtie;": "⋈",
      "&boxDL;": "╗",
      "&boxDR;": "╔",
      "&boxDl;": "╖",
      "&boxDr;": "╓",
      "&boxH;": "═",
      "&boxHD;": "╦",
      "&boxHU;": "╩",
      "&boxHd;": "╤",
      "&boxHu;": "╧",
      "&boxUL;": "╝",
      "&boxUR;": "╚",
      "&boxUl;": "╜",
      "&boxUr;": "╙",
      "&boxV;": "║",
      "&boxVH;": "╬",
      "&boxVL;": "╣",
      "&boxVR;": "╠",
      "&boxVh;": "╫",
      "&boxVl;": "╢",
      "&boxVr;": "╟",
      "&boxbox;": "⧉",
      "&boxdL;": "╕",
      "&boxdR;": "╒",
      "&boxdl;": "┐",
      "&boxdr;": "┌",
      "&boxh;": "─",
      "&boxhD;": "╥",
      "&boxhU;": "╨",
      "&boxhd;": "┬",
      "&boxhu;": "┴",
      "&boxminus;": "⊟",
      "&boxplus;": "⊞",
      "&boxtimes;": "⊠",
      "&boxuL;": "╛",
      "&boxuR;": "╘",
      "&boxul;": "┘",
      "&boxur;": "└",
      "&boxv;": "│",
      "&boxvH;": "╪",
      "&boxvL;": "╡",
      "&boxvR;": "╞",
      "&boxvh;": "┼",
      "&boxvl;": "┤",
      "&boxvr;": "├",
      "&bprime;": "‵",
      "&breve;": "˘",
      "&brvbar": "¦",
      "&brvbar;": "¦",
      "&bscr;": "𝒷",
      "&bsemi;": "⁏",
      "&bsim;": "∽",
      "&bsime;": "⋍",
      "&bsol;": "\\",
      "&bsolb;": "⧅",
      "&bsolhsub;": "⟈",
      "&bull;": "•",
      "&bullet;": "•",
      "&bump;": "≎",
      "&bumpE;": "⪮",
      "&bumpe;": "≏",
      "&bumpeq;": "≏",
      "&cacute;": "ć",
      "&cap;": "∩",
      "&capand;": "⩄",
      "&capbrcup;": "⩉",
      "&capcap;": "⩋",
      "&capcup;": "⩇",
      "&capdot;": "⩀",
      "&caps;": "∩︀",
      "&caret;": "⁁",
      "&caron;": "ˇ",
      "&ccaps;": "⩍",
      "&ccaron;": "č",
      "&ccedil": "ç",
      "&ccedil;": "ç",
      "&ccirc;": "ĉ",
      "&ccups;": "⩌",
      "&ccupssm;": "⩐",
      "&cdot;": "ċ",
      "&cedil": "¸",
      "&cedil;": "¸",
      "&cemptyv;": "⦲",
      "&cent": "¢",
      "&cent;": "¢",
      "&centerdot;": "·",
      "&cfr;": "𝔠",
      "&chcy;": "ч",
      "&check;": "✓",
      "&checkmark;": "✓",
      "&chi;": "χ",
      "&cir;": "○",
      "&cirE;": "⧃",
      "&circ;": "ˆ",
      "&circeq;": "≗",
      "&circlearrowleft;": "↺",
      "&circlearrowright;": "↻",
      "&circledR;": "®",
      "&circledS;": "Ⓢ",
      "&circledast;": "⊛",
      "&circledcirc;": "⊚",
      "&circleddash;": "⊝",
      "&cire;": "≗",
      "&cirfnint;": "⨐",
      "&cirmid;": "⫯",
      "&cirscir;": "⧂",
      "&clubs;": "♣",
      "&clubsuit;": "♣",
      "&colon;": ":",
      "&colone;": "≔",
      "&coloneq;": "≔",
      "&comma;": ",",
      "&commat;": "@",
      "&comp;": "∁",
      "&compfn;": "∘",
      "&complement;": "∁",
      "&complexes;": "ℂ",
      "&cong;": "≅",
      "&congdot;": "⩭",
      "&conint;": "∮",
      "&copf;": "𝕔",
      "&coprod;": "∐",
      "&copy": "©",
      "&copy;": "©",
      "&copysr;": "℗",
      "&crarr;": "↵",
      "&cross;": "✗",
      "&cscr;": "𝒸",
      "&csub;": "⫏",
      "&csube;": "⫑",
      "&csup;": "⫐",
      "&csupe;": "⫒",
      "&ctdot;": "⋯",
      "&cudarrl;": "⤸",
      "&cudarrr;": "⤵",
      "&cuepr;": "⋞",
      "&cuesc;": "⋟",
      "&cularr;": "↶",
      "&cularrp;": "⤽",
      "&cup;": "∪",
      "&cupbrcap;": "⩈",
      "&cupcap;": "⩆",
      "&cupcup;": "⩊",
      "&cupdot;": "⊍",
      "&cupor;": "⩅",
      "&cups;": "∪︀",
      "&curarr;": "↷",
      "&curarrm;": "⤼",
      "&curlyeqprec;": "⋞",
      "&curlyeqsucc;": "⋟",
      "&curlyvee;": "⋎",
      "&curlywedge;": "⋏",
      "&curren": "¤",
      "&curren;": "¤",
      "&curvearrowleft;": "↶",
      "&curvearrowright;": "↷",
      "&cuvee;": "⋎",
      "&cuwed;": "⋏",
      "&cwconint;": "∲",
      "&cwint;": "∱",
      "&cylcty;": "⌭",
      "&dArr;": "⇓",
      "&dHar;": "⥥",
      "&dagger;": "†",
      "&daleth;": "ℸ",
      "&darr;": "↓",
      "&dash;": "‐",
      "&dashv;": "⊣",
      "&dbkarow;": "⤏",
      "&dblac;": "˝",
      "&dcaron;": "ď",
      "&dcy;": "д",
      "&dd;": "ⅆ",
      "&ddagger;": "‡",
      "&ddarr;": "⇊",
      "&ddotseq;": "⩷",
      "&deg": "°",
      "&deg;": "°",
      "&delta;": "δ",
      "&demptyv;": "⦱",
      "&dfisht;": "⥿",
      "&dfr;": "𝔡",
      "&dharl;": "⇃",
      "&dharr;": "⇂",
      "&diam;": "⋄",
      "&diamond;": "⋄",
      "&diamondsuit;": "♦",
      "&diams;": "♦",
      "&die;": "¨",
      "&digamma;": "ϝ",
      "&disin;": "⋲",
      "&div;": "÷",
      "&divide": "÷",
      "&divide;": "÷",
      "&divideontimes;": "⋇",
      "&divonx;": "⋇",
      "&djcy;": "ђ",
      "&dlcorn;": "⌞",
      "&dlcrop;": "⌍",
      "&dollar;": "$",
      "&dopf;": "𝕕",
      "&dot;": "˙",
      "&doteq;": "≐",
      "&doteqdot;": "≑",
      "&dotminus;": "∸",
      "&dotplus;": "∔",
      "&dotsquare;": "⊡",
      "&doublebarwedge;": "⌆",
      "&downarrow;": "↓",
      "&downdownarrows;": "⇊",
      "&downharpoonleft;": "⇃",
      "&downharpoonright;": "⇂",
      "&drbkarow;": "⤐",
      "&drcorn;": "⌟",
      "&drcrop;": "⌌",
      "&dscr;": "𝒹",
      "&dscy;": "ѕ",
      "&dsol;": "⧶",
      "&dstrok;": "đ",
      "&dtdot;": "⋱",
      "&dtri;": "▿",
      "&dtrif;": "▾",
      "&duarr;": "⇵",
      "&duhar;": "⥯",
      "&dwangle;": "⦦",
      "&dzcy;": "џ",
      "&dzigrarr;": "⟿",
      "&eDDot;": "⩷",
      "&eDot;": "≑",
      "&eacute": "é",
      "&eacute;": "é",
      "&easter;": "⩮",
      "&ecaron;": "ě",
      "&ecir;": "≖",
      "&ecirc": "ê",
      "&ecirc;": "ê",
      "&ecolon;": "≕",
      "&ecy;": "э",
      "&edot;": "ė",
      "&ee;": "ⅇ",
      "&efDot;": "≒",
      "&efr;": "𝔢",
      "&eg;": "⪚",
      "&egrave": "è",
      "&egrave;": "è",
      "&egs;": "⪖",
      "&egsdot;": "⪘",
      "&el;": "⪙",
      "&elinters;": "⏧",
      "&ell;": "ℓ",
      "&els;": "⪕",
      "&elsdot;": "⪗",
      "&emacr;": "ē",
      "&empty;": "∅",
      "&emptyset;": "∅",
      "&emptyv;": "∅",
      "&emsp13;": " ",
      "&emsp14;": " ",
      "&emsp;": " ",
      "&eng;": "ŋ",
      "&ensp;": " ",
      "&eogon;": "ę",
      "&eopf;": "𝕖",
      "&epar;": "⋕",
      "&eparsl;": "⧣",
      "&eplus;": "⩱",
      "&epsi;": "ε",
      "&epsilon;": "ε",
      "&epsiv;": "ϵ",
      "&eqcirc;": "≖",
      "&eqcolon;": "≕",
      "&eqsim;": "≂",
      "&eqslantgtr;": "⪖",
      "&eqslantless;": "⪕",
      "&equals;": "=",
      "&equest;": "≟",
      "&equiv;": "≡",
      "&equivDD;": "⩸",
      "&eqvparsl;": "⧥",
      "&erDot;": "≓",
      "&erarr;": "⥱",
      "&escr;": "ℯ",
      "&esdot;": "≐",
      "&esim;": "≂",
      "&eta;": "η",
      "&eth": "ð",
      "&eth;": "ð",
      "&euml": "ë",
      "&euml;": "ë",
      "&euro;": "€",
      "&excl;": "!",
      "&exist;": "∃",
      "&expectation;": "ℰ",
      "&exponentiale;": "ⅇ",
      "&fallingdotseq;": "≒",
      "&fcy;": "ф",
      "&female;": "♀",
      "&ffilig;": "ﬃ",
      "&fflig;": "ﬀ",
      "&ffllig;": "ﬄ",
      "&ffr;": "𝔣",
      "&filig;": "ﬁ",
      "&fjlig;": "fj",
      "&flat;": "♭",
      "&fllig;": "ﬂ",
      "&fltns;": "▱",
      "&fnof;": "ƒ",
      "&fopf;": "𝕗",
      "&forall;": "∀",
      "&fork;": "⋔",
      "&forkv;": "⫙",
      "&fpartint;": "⨍",
      "&frac12": "½",
      "&frac12;": "½",
      "&frac13;": "⅓",
      "&frac14": "¼",
      "&frac14;": "¼",
      "&frac15;": "⅕",
      "&frac16;": "⅙",
      "&frac18;": "⅛",
      "&frac23;": "⅔",
      "&frac25;": "⅖",
      "&frac34": "¾",
      "&frac34;": "¾",
      "&frac35;": "⅗",
      "&frac38;": "⅜",
      "&frac45;": "⅘",
      "&frac56;": "⅚",
      "&frac58;": "⅝",
      "&frac78;": "⅞",
      "&frasl;": "⁄",
      "&frown;": "⌢",
      "&fscr;": "𝒻",
      "&gE;": "≧",
      "&gEl;": "⪌",
      "&gacute;": "ǵ",
      "&gamma;": "γ",
      "&gammad;": "ϝ",
      "&gap;": "⪆",
      "&gbreve;": "ğ",
      "&gcirc;": "ĝ",
      "&gcy;": "г",
      "&gdot;": "ġ",
      "&ge;": "≥",
      "&gel;": "⋛",
      "&geq;": "≥",
      "&geqq;": "≧",
      "&geqslant;": "⩾",
      "&ges;": "⩾",
      "&gescc;": "⪩",
      "&gesdot;": "⪀",
      "&gesdoto;": "⪂",
      "&gesdotol;": "⪄",
      "&gesl;": "⋛︀",
      "&gesles;": "⪔",
      "&gfr;": "𝔤",
      "&gg;": "≫",
      "&ggg;": "⋙",
      "&gimel;": "ℷ",
      "&gjcy;": "ѓ",
      "&gl;": "≷",
      "&glE;": "⪒",
      "&gla;": "⪥",
      "&glj;": "⪤",
      "&gnE;": "≩",
      "&gnap;": "⪊",
      "&gnapprox;": "⪊",
      "&gne;": "⪈",
      "&gneq;": "⪈",
      "&gneqq;": "≩",
      "&gnsim;": "⋧",
      "&gopf;": "𝕘",
      "&grave;": "`",
      "&gscr;": "ℊ",
      "&gsim;": "≳",
      "&gsime;": "⪎",
      "&gsiml;": "⪐",
      "&gt": ">",
      "&gt;": ">",
      "&gtcc;": "⪧",
      "&gtcir;": "⩺",
      "&gtdot;": "⋗",
      "&gtlPar;": "⦕",
      "&gtquest;": "⩼",
      "&gtrapprox;": "⪆",
      "&gtrarr;": "⥸",
      "&gtrdot;": "⋗",
      "&gtreqless;": "⋛",
      "&gtreqqless;": "⪌",
      "&gtrless;": "≷",
      "&gtrsim;": "≳",
      "&gvertneqq;": "≩︀",
      "&gvnE;": "≩︀",
      "&hArr;": "⇔",
      "&hairsp;": " ",
      "&half;": "½",
      "&hamilt;": "ℋ",
      "&hardcy;": "ъ",
      "&harr;": "↔",
      "&harrcir;": "⥈",
      "&harrw;": "↭",
      "&hbar;": "ℏ",
      "&hcirc;": "ĥ",
      "&hearts;": "♥",
      "&heartsuit;": "♥",
      "&hellip;": "…",
      "&hercon;": "⊹",
      "&hfr;": "𝔥",
      "&hksearow;": "⤥",
      "&hkswarow;": "⤦",
      "&hoarr;": "⇿",
      "&homtht;": "∻",
      "&hookleftarrow;": "↩",
      "&hookrightarrow;": "↪",
      "&hopf;": "𝕙",
      "&horbar;": "―",
      "&hscr;": "𝒽",
      "&hslash;": "ℏ",
      "&hstrok;": "ħ",
      "&hybull;": "⁃",
      "&hyphen;": "‐",
      "&iacute": "í",
      "&iacute;": "í",
      "&ic;": "⁣",
      "&icirc": "î",
      "&icirc;": "î",
      "&icy;": "и",
      "&iecy;": "е",
      "&iexcl": "¡",
      "&iexcl;": "¡",
      "&iff;": "⇔",
      "&ifr;": "𝔦",
      "&igrave": "ì",
      "&igrave;": "ì",
      "&ii;": "ⅈ",
      "&iiiint;": "⨌",
      "&iiint;": "∭",
      "&iinfin;": "⧜",
      "&iiota;": "℩",
      "&ijlig;": "ĳ",
      "&imacr;": "ī",
      "&image;": "ℑ",
      "&imagline;": "ℐ",
      "&imagpart;": "ℑ",
      "&imath;": "ı",
      "&imof;": "⊷",
      "&imped;": "Ƶ",
      "&in;": "∈",
      "&incare;": "℅",
      "&infin;": "∞",
      "&infintie;": "⧝",
      "&inodot;": "ı",
      "&int;": "∫",
      "&intcal;": "⊺",
      "&integers;": "ℤ",
      "&intercal;": "⊺",
      "&intlarhk;": "⨗",
      "&intprod;": "⨼",
      "&iocy;": "ё",
      "&iogon;": "į",
      "&iopf;": "𝕚",
      "&iota;": "ι",
      "&iprod;": "⨼",
      "&iquest": "¿",
      "&iquest;": "¿",
      "&iscr;": "𝒾",
      "&isin;": "∈",
      "&isinE;": "⋹",
      "&isindot;": "⋵",
      "&isins;": "⋴",
      "&isinsv;": "⋳",
      "&isinv;": "∈",
      "&it;": "⁢",
      "&itilde;": "ĩ",
      "&iukcy;": "і",
      "&iuml": "ï",
      "&iuml;": "ï",
      "&jcirc;": "ĵ",
      "&jcy;": "й",
      "&jfr;": "𝔧",
      "&jmath;": "ȷ",
      "&jopf;": "𝕛",
      "&jscr;": "𝒿",
      "&jsercy;": "ј",
      "&jukcy;": "є",
      "&kappa;": "κ",
      "&kappav;": "ϰ",
      "&kcedil;": "ķ",
      "&kcy;": "к",
      "&kfr;": "𝔨",
      "&kgreen;": "ĸ",
      "&khcy;": "х",
      "&kjcy;": "ќ",
      "&kopf;": "𝕜",
      "&kscr;": "𝓀",
      "&lAarr;": "⇚",
      "&lArr;": "⇐",
      "&lAtail;": "⤛",
      "&lBarr;": "⤎",
      "&lE;": "≦",
      "&lEg;": "⪋",
      "&lHar;": "⥢",
      "&lacute;": "ĺ",
      "&laemptyv;": "⦴",
      "&lagran;": "ℒ",
      "&lambda;": "λ",
      "&lang;": "⟨",
      "&langd;": "⦑",
      "&langle;": "⟨",
      "&lap;": "⪅",
      "&laquo": "«",
      "&laquo;": "«",
      "&larr;": "←",
      "&larrb;": "⇤",
      "&larrbfs;": "⤟",
      "&larrfs;": "⤝",
      "&larrhk;": "↩",
      "&larrlp;": "↫",
      "&larrpl;": "⤹",
      "&larrsim;": "⥳",
      "&larrtl;": "↢",
      "&lat;": "⪫",
      "&latail;": "⤙",
      "&late;": "⪭",
      "&lates;": "⪭︀",
      "&lbarr;": "⤌",
      "&lbbrk;": "❲",
      "&lbrace;": "{",
      "&lbrack;": "[",
      "&lbrke;": "⦋",
      "&lbrksld;": "⦏",
      "&lbrkslu;": "⦍",
      "&lcaron;": "ľ",
      "&lcedil;": "ļ",
      "&lceil;": "⌈",
      "&lcub;": "{",
      "&lcy;": "л",
      "&ldca;": "⤶",
      "&ldquo;": "“",
      "&ldquor;": "„",
      "&ldrdhar;": "⥧",
      "&ldrushar;": "⥋",
      "&ldsh;": "↲",
      "&le;": "≤",
      "&leftarrow;": "←",
      "&leftarrowtail;": "↢",
      "&leftharpoondown;": "↽",
      "&leftharpoonup;": "↼",
      "&leftleftarrows;": "⇇",
      "&leftrightarrow;": "↔",
      "&leftrightarrows;": "⇆",
      "&leftrightharpoons;": "⇋",
      "&leftrightsquigarrow;": "↭",
      "&leftthreetimes;": "⋋",
      "&leg;": "⋚",
      "&leq;": "≤",
      "&leqq;": "≦",
      "&leqslant;": "⩽",
      "&les;": "⩽",
      "&lescc;": "⪨",
      "&lesdot;": "⩿",
      "&lesdoto;": "⪁",
      "&lesdotor;": "⪃",
      "&lesg;": "⋚︀",
      "&lesges;": "⪓",
      "&lessapprox;": "⪅",
      "&lessdot;": "⋖",
      "&lesseqgtr;": "⋚",
      "&lesseqqgtr;": "⪋",
      "&lessgtr;": "≶",
      "&lesssim;": "≲",
      "&lfisht;": "⥼",
      "&lfloor;": "⌊",
      "&lfr;": "𝔩",
      "&lg;": "≶",
      "&lgE;": "⪑",
      "&lhard;": "↽",
      "&lharu;": "↼",
      "&lharul;": "⥪",
      "&lhblk;": "▄",
      "&ljcy;": "љ",
      "&ll;": "≪",
      "&llarr;": "⇇",
      "&llcorner;": "⌞",
      "&llhard;": "⥫",
      "&lltri;": "◺",
      "&lmidot;": "ŀ",
      "&lmoust;": "⎰",
      "&lmoustache;": "⎰",
      "&lnE;": "≨",
      "&lnap;": "⪉",
      "&lnapprox;": "⪉",
      "&lne;": "⪇",
      "&lneq;": "⪇",
      "&lneqq;": "≨",
      "&lnsim;": "⋦",
      "&loang;": "⟬",
      "&loarr;": "⇽",
      "&lobrk;": "⟦",
      "&longleftarrow;": "⟵",
      "&longleftrightarrow;": "⟷",
      "&longmapsto;": "⟼",
      "&longrightarrow;": "⟶",
      "&looparrowleft;": "↫",
      "&looparrowright;": "↬",
      "&lopar;": "⦅",
      "&lopf;": "𝕝",
      "&loplus;": "⨭",
      "&lotimes;": "⨴",
      "&lowast;": "∗",
      "&lowbar;": "_",
      "&loz;": "◊",
      "&lozenge;": "◊",
      "&lozf;": "⧫",
      "&lpar;": "(",
      "&lparlt;": "⦓",
      "&lrarr;": "⇆",
      "&lrcorner;": "⌟",
      "&lrhar;": "⇋",
      "&lrhard;": "⥭",
      "&lrm;": "‎",
      "&lrtri;": "⊿",
      "&lsaquo;": "‹",
      "&lscr;": "𝓁",
      "&lsh;": "↰",
      "&lsim;": "≲",
      "&lsime;": "⪍",
      "&lsimg;": "⪏",
      "&lsqb;": "[",
      "&lsquo;": "‘",
      "&lsquor;": "‚",
      "&lstrok;": "ł",
      "&lt": "<",
      "&lt;": "<",
      "&ltcc;": "⪦",
      "&ltcir;": "⩹",
      "&ltdot;": "⋖",
      "&lthree;": "⋋",
      "&ltimes;": "⋉",
      "&ltlarr;": "⥶",
      "&ltquest;": "⩻",
      "&ltrPar;": "⦖",
      "&ltri;": "◃",
      "&ltrie;": "⊴",
      "&ltrif;": "◂",
      "&lurdshar;": "⥊",
      "&luruhar;": "⥦",
      "&lvertneqq;": "≨︀",
      "&lvnE;": "≨︀",
      "&mDDot;": "∺",
      "&macr": "¯",
      "&macr;": "¯",
      "&male;": "♂",
      "&malt;": "✠",
      "&maltese;": "✠",
      "&map;": "↦",
      "&mapsto;": "↦",
      "&mapstodown;": "↧",
      "&mapstoleft;": "↤",
      "&mapstoup;": "↥",
      "&marker;": "▮",
      "&mcomma;": "⨩",
      "&mcy;": "м",
      "&mdash;": "—",
      "&measuredangle;": "∡",
      "&mfr;": "𝔪",
      "&mho;": "℧",
      "&micro": "µ",
      "&micro;": "µ",
      "&mid;": "∣",
      "&midast;": "*",
      "&midcir;": "⫰",
      "&middot": "·",
      "&middot;": "·",
      "&minus;": "−",
      "&minusb;": "⊟",
      "&minusd;": "∸",
      "&minusdu;": "⨪",
      "&mlcp;": "⫛",
      "&mldr;": "…",
      "&mnplus;": "∓",
      "&models;": "⊧",
      "&mopf;": "𝕞",
      "&mp;": "∓",
      "&mscr;": "𝓂",
      "&mstpos;": "∾",
      "&mu;": "μ",
      "&multimap;": "⊸",
      "&mumap;": "⊸",
      "&nGg;": "⋙̸",
      "&nGt;": "≫⃒",
      "&nGtv;": "≫̸",
      "&nLeftarrow;": "⇍",
      "&nLeftrightarrow;": "⇎",
      "&nLl;": "⋘̸",
      "&nLt;": "≪⃒",
      "&nLtv;": "≪̸",
      "&nRightarrow;": "⇏",
      "&nVDash;": "⊯",
      "&nVdash;": "⊮",
      "&nabla;": "∇",
      "&nacute;": "ń",
      "&nang;": "∠⃒",
      "&nap;": "≉",
      "&napE;": "⩰̸",
      "&napid;": "≋̸",
      "&napos;": "ŉ",
      "&napprox;": "≉",
      "&natur;": "♮",
      "&natural;": "♮",
      "&naturals;": "ℕ",
      "&nbsp": " ",
      "&nbsp;": " ",
      "&nbump;": "≎̸",
      "&nbumpe;": "≏̸",
      "&ncap;": "⩃",
      "&ncaron;": "ň",
      "&ncedil;": "ņ",
      "&ncong;": "≇",
      "&ncongdot;": "⩭̸",
      "&ncup;": "⩂",
      "&ncy;": "н",
      "&ndash;": "–",
      "&ne;": "≠",
      "&neArr;": "⇗",
      "&nearhk;": "⤤",
      "&nearr;": "↗",
      "&nearrow;": "↗",
      "&nedot;": "≐̸",
      "&nequiv;": "≢",
      "&nesear;": "⤨",
      "&nesim;": "≂̸",
      "&nexist;": "∄",
      "&nexists;": "∄",
      "&nfr;": "𝔫",
      "&ngE;": "≧̸",
      "&nge;": "≱",
      "&ngeq;": "≱",
      "&ngeqq;": "≧̸",
      "&ngeqslant;": "⩾̸",
      "&nges;": "⩾̸",
      "&ngsim;": "≵",
      "&ngt;": "≯",
      "&ngtr;": "≯",
      "&nhArr;": "⇎",
      "&nharr;": "↮",
      "&nhpar;": "⫲",
      "&ni;": "∋",
      "&nis;": "⋼",
      "&nisd;": "⋺",
      "&niv;": "∋",
      "&njcy;": "њ",
      "&nlArr;": "⇍",
      "&nlE;": "≦̸",
      "&nlarr;": "↚",
      "&nldr;": "‥",
      "&nle;": "≰",
      "&nleftarrow;": "↚",
      "&nleftrightarrow;": "↮",
      "&nleq;": "≰",
      "&nleqq;": "≦̸",
      "&nleqslant;": "⩽̸",
      "&nles;": "⩽̸",
      "&nless;": "≮",
      "&nlsim;": "≴",
      "&nlt;": "≮",
      "&nltri;": "⋪",
      "&nltrie;": "⋬",
      "&nmid;": "∤",
      "&nopf;": "𝕟",
      "&not": "¬",
      "&not;": "¬",
      "&notin;": "∉",
      "&notinE;": "⋹̸",
      "&notindot;": "⋵̸",
      "&notinva;": "∉",
      "&notinvb;": "⋷",
      "&notinvc;": "⋶",
      "&notni;": "∌",
      "&notniva;": "∌",
      "&notnivb;": "⋾",
      "&notnivc;": "⋽",
      "&npar;": "∦",
      "&nparallel;": "∦",
      "&nparsl;": "⫽⃥",
      "&npart;": "∂̸",
      "&npolint;": "⨔",
      "&npr;": "⊀",
      "&nprcue;": "⋠",
      "&npre;": "⪯̸",
      "&nprec;": "⊀",
      "&npreceq;": "⪯̸",
      "&nrArr;": "⇏",
      "&nrarr;": "↛",
      "&nrarrc;": "⤳̸",
      "&nrarrw;": "↝̸",
      "&nrightarrow;": "↛",
      "&nrtri;": "⋫",
      "&nrtrie;": "⋭",
      "&nsc;": "⊁",
      "&nsccue;": "⋡",
      "&nsce;": "⪰̸",
      "&nscr;": "𝓃",
      "&nshortmid;": "∤",
      "&nshortparallel;": "∦",
      "&nsim;": "≁",
      "&nsime;": "≄",
      "&nsimeq;": "≄",
      "&nsmid;": "∤",
      "&nspar;": "∦",
      "&nsqsube;": "⋢",
      "&nsqsupe;": "⋣",
      "&nsub;": "⊄",
      "&nsubE;": "⫅̸",
      "&nsube;": "⊈",
      "&nsubset;": "⊂⃒",
      "&nsubseteq;": "⊈",
      "&nsubseteqq;": "⫅̸",
      "&nsucc;": "⊁",
      "&nsucceq;": "⪰̸",
      "&nsup;": "⊅",
      "&nsupE;": "⫆̸",
      "&nsupe;": "⊉",
      "&nsupset;": "⊃⃒",
      "&nsupseteq;": "⊉",
      "&nsupseteqq;": "⫆̸",
      "&ntgl;": "≹",
      "&ntilde": "ñ",
      "&ntilde;": "ñ",
      "&ntlg;": "≸",
      "&ntriangleleft;": "⋪",
      "&ntrianglelefteq;": "⋬",
      "&ntriangleright;": "⋫",
      "&ntrianglerighteq;": "⋭",
      "&nu;": "ν",
      "&num;": "#",
      "&numero;": "№",
      "&numsp;": " ",
      "&nvDash;": "⊭",
      "&nvHarr;": "⤄",
      "&nvap;": "≍⃒",
      "&nvdash;": "⊬",
      "&nvge;": "≥⃒",
      "&nvgt;": ">⃒",
      "&nvinfin;": "⧞",
      "&nvlArr;": "⤂",
      "&nvle;": "≤⃒",
      "&nvlt;": "<⃒",
      "&nvltrie;": "⊴⃒",
      "&nvrArr;": "⤃",
      "&nvrtrie;": "⊵⃒",
      "&nvsim;": "∼⃒",
      "&nwArr;": "⇖",
      "&nwarhk;": "⤣",
      "&nwarr;": "↖",
      "&nwarrow;": "↖",
      "&nwnear;": "⤧",
      "&oS;": "Ⓢ",
      "&oacute": "ó",
      "&oacute;": "ó",
      "&oast;": "⊛",
      "&ocir;": "⊚",
      "&ocirc": "ô",
      "&ocirc;": "ô",
      "&ocy;": "о",
      "&odash;": "⊝",
      "&odblac;": "ő",
      "&odiv;": "⨸",
      "&odot;": "⊙",
      "&odsold;": "⦼",
      "&oelig;": "œ",
      "&ofcir;": "⦿",
      "&ofr;": "𝔬",
      "&ogon;": "˛",
      "&ograve": "ò",
      "&ograve;": "ò",
      "&ogt;": "⧁",
      "&ohbar;": "⦵",
      "&ohm;": "Ω",
      "&oint;": "∮",
      "&olarr;": "↺",
      "&olcir;": "⦾",
      "&olcross;": "⦻",
      "&oline;": "‾",
      "&olt;": "⧀",
      "&omacr;": "ō",
      "&omega;": "ω",
      "&omicron;": "ο",
      "&omid;": "⦶",
      "&ominus;": "⊖",
      "&oopf;": "𝕠",
      "&opar;": "⦷",
      "&operp;": "⦹",
      "&oplus;": "⊕",
      "&or;": "∨",
      "&orarr;": "↻",
      "&ord;": "⩝",
      "&order;": "ℴ",
      "&orderof;": "ℴ",
      "&ordf": "ª",
      "&ordf;": "ª",
      "&ordm": "º",
      "&ordm;": "º",
      "&origof;": "⊶",
      "&oror;": "⩖",
      "&orslope;": "⩗",
      "&orv;": "⩛",
      "&oscr;": "ℴ",
      "&oslash": "ø",
      "&oslash;": "ø",
      "&osol;": "⊘",
      "&otilde": "õ",
      "&otilde;": "õ",
      "&otimes;": "⊗",
      "&otimesas;": "⨶",
      "&ouml": "ö",
      "&ouml;": "ö",
      "&ovbar;": "⌽",
      "&par;": "∥",
      "&para": "¶",
      "&para;": "¶",
      "&parallel;": "∥",
      "&parsim;": "⫳",
      "&parsl;": "⫽",
      "&part;": "∂",
      "&pcy;": "п",
      "&percnt;": "%",
      "&period;": ".",
      "&permil;": "‰",
      "&perp;": "⊥",
      "&pertenk;": "‱",
      "&pfr;": "𝔭",
      "&phi;": "φ",
      "&phiv;": "ϕ",
      "&phmmat;": "ℳ",
      "&phone;": "☎",
      "&pi;": "π",
      "&pitchfork;": "⋔",
      "&piv;": "ϖ",
      "&planck;": "ℏ",
      "&planckh;": "ℎ",
      "&plankv;": "ℏ",
      "&plus;": "+",
      "&plusacir;": "⨣",
      "&plusb;": "⊞",
      "&pluscir;": "⨢",
      "&plusdo;": "∔",
      "&plusdu;": "⨥",
      "&pluse;": "⩲",
      "&plusmn": "±",
      "&plusmn;": "±",
      "&plussim;": "⨦",
      "&plustwo;": "⨧",
      "&pm;": "±",
      "&pointint;": "⨕",
      "&popf;": "𝕡",
      "&pound": "£",
      "&pound;": "£",
      "&pr;": "≺",
      "&prE;": "⪳",
      "&prap;": "⪷",
      "&prcue;": "≼",
      "&pre;": "⪯",
      "&prec;": "≺",
      "&precapprox;": "⪷",
      "&preccurlyeq;": "≼",
      "&preceq;": "⪯",
      "&precnapprox;": "⪹",
      "&precneqq;": "⪵",
      "&precnsim;": "⋨",
      "&precsim;": "≾",
      "&prime;": "′",
      "&primes;": "ℙ",
      "&prnE;": "⪵",
      "&prnap;": "⪹",
      "&prnsim;": "⋨",
      "&prod;": "∏",
      "&profalar;": "⌮",
      "&profline;": "⌒",
      "&profsurf;": "⌓",
      "&prop;": "∝",
      "&propto;": "∝",
      "&prsim;": "≾",
      "&prurel;": "⊰",
      "&pscr;": "𝓅",
      "&psi;": "ψ",
      "&puncsp;": " ",
      "&qfr;": "𝔮",
      "&qint;": "⨌",
      "&qopf;": "𝕢",
      "&qprime;": "⁗",
      "&qscr;": "𝓆",
      "&quaternions;": "ℍ",
      "&quatint;": "⨖",
      "&quest;": "?",
      "&questeq;": "≟",
      "&quot": '"',
      "&quot;": '"',
      "&rAarr;": "⇛",
      "&rArr;": "⇒",
      "&rAtail;": "⤜",
      "&rBarr;": "⤏",
      "&rHar;": "⥤",
      "&race;": "∽̱",
      "&racute;": "ŕ",
      "&radic;": "√",
      "&raemptyv;": "⦳",
      "&rang;": "⟩",
      "&rangd;": "⦒",
      "&range;": "⦥",
      "&rangle;": "⟩",
      "&raquo": "»",
      "&raquo;": "»",
      "&rarr;": "→",
      "&rarrap;": "⥵",
      "&rarrb;": "⇥",
      "&rarrbfs;": "⤠",
      "&rarrc;": "⤳",
      "&rarrfs;": "⤞",
      "&rarrhk;": "↪",
      "&rarrlp;": "↬",
      "&rarrpl;": "⥅",
      "&rarrsim;": "⥴",
      "&rarrtl;": "↣",
      "&rarrw;": "↝",
      "&ratail;": "⤚",
      "&ratio;": "∶",
      "&rationals;": "ℚ",
      "&rbarr;": "⤍",
      "&rbbrk;": "❳",
      "&rbrace;": "}",
      "&rbrack;": "]",
      "&rbrke;": "⦌",
      "&rbrksld;": "⦎",
      "&rbrkslu;": "⦐",
      "&rcaron;": "ř",
      "&rcedil;": "ŗ",
      "&rceil;": "⌉",
      "&rcub;": "}",
      "&rcy;": "р",
      "&rdca;": "⤷",
      "&rdldhar;": "⥩",
      "&rdquo;": "”",
      "&rdquor;": "”",
      "&rdsh;": "↳",
      "&real;": "ℜ",
      "&realine;": "ℛ",
      "&realpart;": "ℜ",
      "&reals;": "ℝ",
      "&rect;": "▭",
      "&reg": "®",
      "&reg;": "®",
      "&rfisht;": "⥽",
      "&rfloor;": "⌋",
      "&rfr;": "𝔯",
      "&rhard;": "⇁",
      "&rharu;": "⇀",
      "&rharul;": "⥬",
      "&rho;": "ρ",
      "&rhov;": "ϱ",
      "&rightarrow;": "→",
      "&rightarrowtail;": "↣",
      "&rightharpoondown;": "⇁",
      "&rightharpoonup;": "⇀",
      "&rightleftarrows;": "⇄",
      "&rightleftharpoons;": "⇌",
      "&rightrightarrows;": "⇉",
      "&rightsquigarrow;": "↝",
      "&rightthreetimes;": "⋌",
      "&ring;": "˚",
      "&risingdotseq;": "≓",
      "&rlarr;": "⇄",
      "&rlhar;": "⇌",
      "&rlm;": "‏",
      "&rmoust;": "⎱",
      "&rmoustache;": "⎱",
      "&rnmid;": "⫮",
      "&roang;": "⟭",
      "&roarr;": "⇾",
      "&robrk;": "⟧",
      "&ropar;": "⦆",
      "&ropf;": "𝕣",
      "&roplus;": "⨮",
      "&rotimes;": "⨵",
      "&rpar;": ")",
      "&rpargt;": "⦔",
      "&rppolint;": "⨒",
      "&rrarr;": "⇉",
      "&rsaquo;": "›",
      "&rscr;": "𝓇",
      "&rsh;": "↱",
      "&rsqb;": "]",
      "&rsquo;": "’",
      "&rsquor;": "’",
      "&rthree;": "⋌",
      "&rtimes;": "⋊",
      "&rtri;": "▹",
      "&rtrie;": "⊵",
      "&rtrif;": "▸",
      "&rtriltri;": "⧎",
      "&ruluhar;": "⥨",
      "&rx;": "℞",
      "&sacute;": "ś",
      "&sbquo;": "‚",
      "&sc;": "≻",
      "&scE;": "⪴",
      "&scap;": "⪸",
      "&scaron;": "š",
      "&sccue;": "≽",
      "&sce;": "⪰",
      "&scedil;": "ş",
      "&scirc;": "ŝ",
      "&scnE;": "⪶",
      "&scnap;": "⪺",
      "&scnsim;": "⋩",
      "&scpolint;": "⨓",
      "&scsim;": "≿",
      "&scy;": "с",
      "&sdot;": "⋅",
      "&sdotb;": "⊡",
      "&sdote;": "⩦",
      "&seArr;": "⇘",
      "&searhk;": "⤥",
      "&searr;": "↘",
      "&searrow;": "↘",
      "&sect": "§",
      "&sect;": "§",
      "&semi;": ";",
      "&seswar;": "⤩",
      "&setminus;": "∖",
      "&setmn;": "∖",
      "&sext;": "✶",
      "&sfr;": "𝔰",
      "&sfrown;": "⌢",
      "&sharp;": "♯",
      "&shchcy;": "щ",
      "&shcy;": "ш",
      "&shortmid;": "∣",
      "&shortparallel;": "∥",
      "&shy": "­",
      "&shy;": "­",
      "&sigma;": "σ",
      "&sigmaf;": "ς",
      "&sigmav;": "ς",
      "&sim;": "∼",
      "&simdot;": "⩪",
      "&sime;": "≃",
      "&simeq;": "≃",
      "&simg;": "⪞",
      "&simgE;": "⪠",
      "&siml;": "⪝",
      "&simlE;": "⪟",
      "&simne;": "≆",
      "&simplus;": "⨤",
      "&simrarr;": "⥲",
      "&slarr;": "←",
      "&smallsetminus;": "∖",
      "&smashp;": "⨳",
      "&smeparsl;": "⧤",
      "&smid;": "∣",
      "&smile;": "⌣",
      "&smt;": "⪪",
      "&smte;": "⪬",
      "&smtes;": "⪬︀",
      "&softcy;": "ь",
      "&sol;": "/",
      "&solb;": "⧄",
      "&solbar;": "⌿",
      "&sopf;": "𝕤",
      "&spades;": "♠",
      "&spadesuit;": "♠",
      "&spar;": "∥",
      "&sqcap;": "⊓",
      "&sqcaps;": "⊓︀",
      "&sqcup;": "⊔",
      "&sqcups;": "⊔︀",
      "&sqsub;": "⊏",
      "&sqsube;": "⊑",
      "&sqsubset;": "⊏",
      "&sqsubseteq;": "⊑",
      "&sqsup;": "⊐",
      "&sqsupe;": "⊒",
      "&sqsupset;": "⊐",
      "&sqsupseteq;": "⊒",
      "&squ;": "□",
      "&square;": "□",
      "&squarf;": "▪",
      "&squf;": "▪",
      "&srarr;": "→",
      "&sscr;": "𝓈",
      "&ssetmn;": "∖",
      "&ssmile;": "⌣",
      "&sstarf;": "⋆",
      "&star;": "☆",
      "&starf;": "★",
      "&straightepsilon;": "ϵ",
      "&straightphi;": "ϕ",
      "&strns;": "¯",
      "&sub;": "⊂",
      "&subE;": "⫅",
      "&subdot;": "⪽",
      "&sube;": "⊆",
      "&subedot;": "⫃",
      "&submult;": "⫁",
      "&subnE;": "⫋",
      "&subne;": "⊊",
      "&subplus;": "⪿",
      "&subrarr;": "⥹",
      "&subset;": "⊂",
      "&subseteq;": "⊆",
      "&subseteqq;": "⫅",
      "&subsetneq;": "⊊",
      "&subsetneqq;": "⫋",
      "&subsim;": "⫇",
      "&subsub;": "⫕",
      "&subsup;": "⫓",
      "&succ;": "≻",
      "&succapprox;": "⪸",
      "&succcurlyeq;": "≽",
      "&succeq;": "⪰",
      "&succnapprox;": "⪺",
      "&succneqq;": "⪶",
      "&succnsim;": "⋩",
      "&succsim;": "≿",
      "&sum;": "∑",
      "&sung;": "♪",
      "&sup1": "¹",
      "&sup1;": "¹",
      "&sup2": "²",
      "&sup2;": "²",
      "&sup3": "³",
      "&sup3;": "³",
      "&sup;": "⊃",
      "&supE;": "⫆",
      "&supdot;": "⪾",
      "&supdsub;": "⫘",
      "&supe;": "⊇",
      "&supedot;": "⫄",
      "&suphsol;": "⟉",
      "&suphsub;": "⫗",
      "&suplarr;": "⥻",
      "&supmult;": "⫂",
      "&supnE;": "⫌",
      "&supne;": "⊋",
      "&supplus;": "⫀",
      "&supset;": "⊃",
      "&supseteq;": "⊇",
      "&supseteqq;": "⫆",
      "&supsetneq;": "⊋",
      "&supsetneqq;": "⫌",
      "&supsim;": "⫈",
      "&supsub;": "⫔",
      "&supsup;": "⫖",
      "&swArr;": "⇙",
      "&swarhk;": "⤦",
      "&swarr;": "↙",
      "&swarrow;": "↙",
      "&swnwar;": "⤪",
      "&szlig": "ß",
      "&szlig;": "ß",
      "&target;": "⌖",
      "&tau;": "τ",
      "&tbrk;": "⎴",
      "&tcaron;": "ť",
      "&tcedil;": "ţ",
      "&tcy;": "т",
      "&tdot;": "⃛",
      "&telrec;": "⌕",
      "&tfr;": "𝔱",
      "&there4;": "∴",
      "&therefore;": "∴",
      "&theta;": "θ",
      "&thetasym;": "ϑ",
      "&thetav;": "ϑ",
      "&thickapprox;": "≈",
      "&thicksim;": "∼",
      "&thinsp;": " ",
      "&thkap;": "≈",
      "&thksim;": "∼",
      "&thorn": "þ",
      "&thorn;": "þ",
      "&tilde;": "˜",
      "&times": "×",
      "&times;": "×",
      "&timesb;": "⊠",
      "&timesbar;": "⨱",
      "&timesd;": "⨰",
      "&tint;": "∭",
      "&toea;": "⤨",
      "&top;": "⊤",
      "&topbot;": "⌶",
      "&topcir;": "⫱",
      "&topf;": "𝕥",
      "&topfork;": "⫚",
      "&tosa;": "⤩",
      "&tprime;": "‴",
      "&trade;": "™",
      "&triangle;": "▵",
      "&triangledown;": "▿",
      "&triangleleft;": "◃",
      "&trianglelefteq;": "⊴",
      "&triangleq;": "≜",
      "&triangleright;": "▹",
      "&trianglerighteq;": "⊵",
      "&tridot;": "◬",
      "&trie;": "≜",
      "&triminus;": "⨺",
      "&triplus;": "⨹",
      "&trisb;": "⧍",
      "&tritime;": "⨻",
      "&trpezium;": "⏢",
      "&tscr;": "𝓉",
      "&tscy;": "ц",
      "&tshcy;": "ћ",
      "&tstrok;": "ŧ",
      "&twixt;": "≬",
      "&twoheadleftarrow;": "↞",
      "&twoheadrightarrow;": "↠",
      "&uArr;": "⇑",
      "&uHar;": "⥣",
      "&uacute": "ú",
      "&uacute;": "ú",
      "&uarr;": "↑",
      "&ubrcy;": "ў",
      "&ubreve;": "ŭ",
      "&ucirc": "û",
      "&ucirc;": "û",
      "&ucy;": "у",
      "&udarr;": "⇅",
      "&udblac;": "ű",
      "&udhar;": "⥮",
      "&ufisht;": "⥾",
      "&ufr;": "𝔲",
      "&ugrave": "ù",
      "&ugrave;": "ù",
      "&uharl;": "↿",
      "&uharr;": "↾",
      "&uhblk;": "▀",
      "&ulcorn;": "⌜",
      "&ulcorner;": "⌜",
      "&ulcrop;": "⌏",
      "&ultri;": "◸",
      "&umacr;": "ū",
      "&uml": "¨",
      "&uml;": "¨",
      "&uogon;": "ų",
      "&uopf;": "𝕦",
      "&uparrow;": "↑",
      "&updownarrow;": "↕",
      "&upharpoonleft;": "↿",
      "&upharpoonright;": "↾",
      "&uplus;": "⊎",
      "&upsi;": "υ",
      "&upsih;": "ϒ",
      "&upsilon;": "υ",
      "&upuparrows;": "⇈",
      "&urcorn;": "⌝",
      "&urcorner;": "⌝",
      "&urcrop;": "⌎",
      "&uring;": "ů",
      "&urtri;": "◹",
      "&uscr;": "𝓊",
      "&utdot;": "⋰",
      "&utilde;": "ũ",
      "&utri;": "▵",
      "&utrif;": "▴",
      "&uuarr;": "⇈",
      "&uuml": "ü",
      "&uuml;": "ü",
      "&uwangle;": "⦧",
      "&vArr;": "⇕",
      "&vBar;": "⫨",
      "&vBarv;": "⫩",
      "&vDash;": "⊨",
      "&vangrt;": "⦜",
      "&varepsilon;": "ϵ",
      "&varkappa;": "ϰ",
      "&varnothing;": "∅",
      "&varphi;": "ϕ",
      "&varpi;": "ϖ",
      "&varpropto;": "∝",
      "&varr;": "↕",
      "&varrho;": "ϱ",
      "&varsigma;": "ς",
      "&varsubsetneq;": "⊊︀",
      "&varsubsetneqq;": "⫋︀",
      "&varsupsetneq;": "⊋︀",
      "&varsupsetneqq;": "⫌︀",
      "&vartheta;": "ϑ",
      "&vartriangleleft;": "⊲",
      "&vartriangleright;": "⊳",
      "&vcy;": "в",
      "&vdash;": "⊢",
      "&vee;": "∨",
      "&veebar;": "⊻",
      "&veeeq;": "≚",
      "&vellip;": "⋮",
      "&verbar;": "|",
      "&vert;": "|",
      "&vfr;": "𝔳",
      "&vltri;": "⊲",
      "&vnsub;": "⊂⃒",
      "&vnsup;": "⊃⃒",
      "&vopf;": "𝕧",
      "&vprop;": "∝",
      "&vrtri;": "⊳",
      "&vscr;": "𝓋",
      "&vsubnE;": "⫋︀",
      "&vsubne;": "⊊︀",
      "&vsupnE;": "⫌︀",
      "&vsupne;": "⊋︀",
      "&vzigzag;": "⦚",
      "&wcirc;": "ŵ",
      "&wedbar;": "⩟",
      "&wedge;": "∧",
      "&wedgeq;": "≙",
      "&weierp;": "℘",
      "&wfr;": "𝔴",
      "&wopf;": "𝕨",
      "&wp;": "℘",
      "&wr;": "≀",
      "&wreath;": "≀",
      "&wscr;": "𝓌",
      "&xcap;": "⋂",
      "&xcirc;": "◯",
      "&xcup;": "⋃",
      "&xdtri;": "▽",
      "&xfr;": "𝔵",
      "&xhArr;": "⟺",
      "&xharr;": "⟷",
      "&xi;": "ξ",
      "&xlArr;": "⟸",
      "&xlarr;": "⟵",
      "&xmap;": "⟼",
      "&xnis;": "⋻",
      "&xodot;": "⨀",
      "&xopf;": "𝕩",
      "&xoplus;": "⨁",
      "&xotime;": "⨂",
      "&xrArr;": "⟹",
      "&xrarr;": "⟶",
      "&xscr;": "𝓍",
      "&xsqcup;": "⨆",
      "&xuplus;": "⨄",
      "&xutri;": "△",
      "&xvee;": "⋁",
      "&xwedge;": "⋀",
      "&yacute": "ý",
      "&yacute;": "ý",
      "&yacy;": "я",
      "&ycirc;": "ŷ",
      "&ycy;": "ы",
      "&yen": "¥",
      "&yen;": "¥",
      "&yfr;": "𝔶",
      "&yicy;": "ї",
      "&yopf;": "𝕪",
      "&yscr;": "𝓎",
      "&yucy;": "ю",
      "&yuml": "ÿ",
      "&yuml;": "ÿ",
      "&zacute;": "ź",
      "&zcaron;": "ž",
      "&zcy;": "з",
      "&zdot;": "ż",
      "&zeetrf;": "ℨ",
      "&zeta;": "ζ",
      "&zfr;": "𝔷",
      "&zhcy;": "ж",
      "&zigrarr;": "⇝",
      "&zopf;": "𝕫",
      "&zscr;": "𝓏",
      "&zwj;": "‍",
      "&zwnj;": "‌"
    },
    characters: {
      "Æ": "&AElig;",
      "&": "&amp;",
      "Á": "&Aacute;",
      "Ă": "&Abreve;",
      "Â": "&Acirc;",
      "А": "&Acy;",
      "𝔄": "&Afr;",
      "À": "&Agrave;",
      "Α": "&Alpha;",
      "Ā": "&Amacr;",
      "⩓": "&And;",
      "Ą": "&Aogon;",
      "𝔸": "&Aopf;",
      "⁡": "&af;",
      "Å": "&angst;",
      "𝒜": "&Ascr;",
      "≔": "&coloneq;",
      "Ã": "&Atilde;",
      "Ä": "&Auml;",
      "∖": "&ssetmn;",
      "⫧": "&Barv;",
      "⌆": "&doublebarwedge;",
      "Б": "&Bcy;",
      "∵": "&because;",
      "ℬ": "&bernou;",
      "Β": "&Beta;",
      "𝔅": "&Bfr;",
      "𝔹": "&Bopf;",
      "˘": "&breve;",
      "≎": "&bump;",
      "Ч": "&CHcy;",
      "©": "&copy;",
      "Ć": "&Cacute;",
      "⋒": "&Cap;",
      "ⅅ": "&DD;",
      "ℭ": "&Cfr;",
      "Č": "&Ccaron;",
      "Ç": "&Ccedil;",
      "Ĉ": "&Ccirc;",
      "∰": "&Cconint;",
      "Ċ": "&Cdot;",
      "¸": "&cedil;",
      "·": "&middot;",
      "Χ": "&Chi;",
      "⊙": "&odot;",
      "⊖": "&ominus;",
      "⊕": "&oplus;",
      "⊗": "&otimes;",
      "∲": "&cwconint;",
      "”": "&rdquor;",
      "’": "&rsquor;",
      "∷": "&Proportion;",
      "⩴": "&Colone;",
      "≡": "&equiv;",
      "∯": "&DoubleContourIntegral;",
      "∮": "&oint;",
      "ℂ": "&complexes;",
      "∐": "&coprod;",
      "∳": "&awconint;",
      "⨯": "&Cross;",
      "𝒞": "&Cscr;",
      "⋓": "&Cup;",
      "≍": "&asympeq;",
      "⤑": "&DDotrahd;",
      "Ђ": "&DJcy;",
      "Ѕ": "&DScy;",
      "Џ": "&DZcy;",
      "‡": "&ddagger;",
      "↡": "&Darr;",
      "⫤": "&DoubleLeftTee;",
      "Ď": "&Dcaron;",
      "Д": "&Dcy;",
      "∇": "&nabla;",
      "Δ": "&Delta;",
      "𝔇": "&Dfr;",
      "´": "&acute;",
      "˙": "&dot;",
      "˝": "&dblac;",
      "`": "&grave;",
      "˜": "&tilde;",
      "⋄": "&diamond;",
      "ⅆ": "&dd;",
      "𝔻": "&Dopf;",
      "¨": "&uml;",
      "⃜": "&DotDot;",
      "≐": "&esdot;",
      "⇓": "&dArr;",
      "⇐": "&lArr;",
      "⇔": "&iff;",
      "⟸": "&xlArr;",
      "⟺": "&xhArr;",
      "⟹": "&xrArr;",
      "⇒": "&rArr;",
      "⊨": "&vDash;",
      "⇑": "&uArr;",
      "⇕": "&vArr;",
      "∥": "&spar;",
      "↓": "&downarrow;",
      "⤓": "&DownArrowBar;",
      "⇵": "&duarr;",
      "̑": "&DownBreve;",
      "⥐": "&DownLeftRightVector;",
      "⥞": "&DownLeftTeeVector;",
      "↽": "&lhard;",
      "⥖": "&DownLeftVectorBar;",
      "⥟": "&DownRightTeeVector;",
      "⇁": "&rightharpoondown;",
      "⥗": "&DownRightVectorBar;",
      "⊤": "&top;",
      "↧": "&mapstodown;",
      "𝒟": "&Dscr;",
      "Đ": "&Dstrok;",
      "Ŋ": "&ENG;",
      "Ð": "&ETH;",
      "É": "&Eacute;",
      "Ě": "&Ecaron;",
      "Ê": "&Ecirc;",
      "Э": "&Ecy;",
      "Ė": "&Edot;",
      "𝔈": "&Efr;",
      "È": "&Egrave;",
      "∈": "&isinv;",
      "Ē": "&Emacr;",
      "◻": "&EmptySmallSquare;",
      "▫": "&EmptyVerySmallSquare;",
      "Ę": "&Eogon;",
      "𝔼": "&Eopf;",
      "Ε": "&Epsilon;",
      "⩵": "&Equal;",
      "≂": "&esim;",
      "⇌": "&rlhar;",
      "ℰ": "&expectation;",
      "⩳": "&Esim;",
      "Η": "&Eta;",
      "Ë": "&Euml;",
      "∃": "&exist;",
      "ⅇ": "&exponentiale;",
      "Ф": "&Fcy;",
      "𝔉": "&Ffr;",
      "◼": "&FilledSmallSquare;",
      "▪": "&squf;",
      "𝔽": "&Fopf;",
      "∀": "&forall;",
      "ℱ": "&Fscr;",
      "Ѓ": "&GJcy;",
      ">": "&gt;",
      "Γ": "&Gamma;",
      "Ϝ": "&Gammad;",
      "Ğ": "&Gbreve;",
      "Ģ": "&Gcedil;",
      "Ĝ": "&Gcirc;",
      "Г": "&Gcy;",
      "Ġ": "&Gdot;",
      "𝔊": "&Gfr;",
      "⋙": "&ggg;",
      "𝔾": "&Gopf;",
      "≥": "&geq;",
      "⋛": "&gtreqless;",
      "≧": "&geqq;",
      "⪢": "&GreaterGreater;",
      "≷": "&gtrless;",
      "⩾": "&ges;",
      "≳": "&gtrsim;",
      "𝒢": "&Gscr;",
      "≫": "&gg;",
      "Ъ": "&HARDcy;",
      "ˇ": "&caron;",
      "^": "&Hat;",
      "Ĥ": "&Hcirc;",
      "ℌ": "&Poincareplane;",
      "ℋ": "&hamilt;",
      "ℍ": "&quaternions;",
      "─": "&boxh;",
      "Ħ": "&Hstrok;",
      "≏": "&bumpeq;",
      "Е": "&IEcy;",
      "Ĳ": "&IJlig;",
      "Ё": "&IOcy;",
      "Í": "&Iacute;",
      "Î": "&Icirc;",
      "И": "&Icy;",
      "İ": "&Idot;",
      "ℑ": "&imagpart;",
      "Ì": "&Igrave;",
      "Ī": "&Imacr;",
      "ⅈ": "&ii;",
      "∬": "&Int;",
      "∫": "&int;",
      "⋂": "&xcap;",
      "⁣": "&ic;",
      "⁢": "&it;",
      "Į": "&Iogon;",
      "𝕀": "&Iopf;",
      "Ι": "&Iota;",
      "ℐ": "&imagline;",
      "Ĩ": "&Itilde;",
      "І": "&Iukcy;",
      "Ï": "&Iuml;",
      "Ĵ": "&Jcirc;",
      "Й": "&Jcy;",
      "𝔍": "&Jfr;",
      "𝕁": "&Jopf;",
      "𝒥": "&Jscr;",
      "Ј": "&Jsercy;",
      "Є": "&Jukcy;",
      "Х": "&KHcy;",
      "Ќ": "&KJcy;",
      "Κ": "&Kappa;",
      "Ķ": "&Kcedil;",
      "К": "&Kcy;",
      "𝔎": "&Kfr;",
      "𝕂": "&Kopf;",
      "𝒦": "&Kscr;",
      "Љ": "&LJcy;",
      "<": "&lt;",
      "Ĺ": "&Lacute;",
      "Λ": "&Lambda;",
      "⟪": "&Lang;",
      "ℒ": "&lagran;",
      "↞": "&twoheadleftarrow;",
      "Ľ": "&Lcaron;",
      "Ļ": "&Lcedil;",
      "Л": "&Lcy;",
      "⟨": "&langle;",
      "←": "&slarr;",
      "⇤": "&larrb;",
      "⇆": "&lrarr;",
      "⌈": "&lceil;",
      "⟦": "&lobrk;",
      "⥡": "&LeftDownTeeVector;",
      "⇃": "&downharpoonleft;",
      "⥙": "&LeftDownVectorBar;",
      "⌊": "&lfloor;",
      "↔": "&leftrightarrow;",
      "⥎": "&LeftRightVector;",
      "⊣": "&dashv;",
      "↤": "&mapstoleft;",
      "⥚": "&LeftTeeVector;",
      "⊲": "&vltri;",
      "⧏": "&LeftTriangleBar;",
      "⊴": "&trianglelefteq;",
      "⥑": "&LeftUpDownVector;",
      "⥠": "&LeftUpTeeVector;",
      "↿": "&upharpoonleft;",
      "⥘": "&LeftUpVectorBar;",
      "↼": "&lharu;",
      "⥒": "&LeftVectorBar;",
      "⋚": "&lesseqgtr;",
      "≦": "&leqq;",
      "≶": "&lg;",
      "⪡": "&LessLess;",
      "⩽": "&les;",
      "≲": "&lsim;",
      "𝔏": "&Lfr;",
      "⋘": "&Ll;",
      "⇚": "&lAarr;",
      "Ŀ": "&Lmidot;",
      "⟵": "&xlarr;",
      "⟷": "&xharr;",
      "⟶": "&xrarr;",
      "𝕃": "&Lopf;",
      "↙": "&swarrow;",
      "↘": "&searrow;",
      "↰": "&lsh;",
      "Ł": "&Lstrok;",
      "≪": "&ll;",
      "⤅": "&Map;",
      "М": "&Mcy;",
      " ": "&MediumSpace;",
      "ℳ": "&phmmat;",
      "𝔐": "&Mfr;",
      "∓": "&mp;",
      "𝕄": "&Mopf;",
      "Μ": "&Mu;",
      "Њ": "&NJcy;",
      "Ń": "&Nacute;",
      "Ň": "&Ncaron;",
      "Ņ": "&Ncedil;",
      "Н": "&Ncy;",
      "​": "&ZeroWidthSpace;",
      "\n": "&NewLine;",
      "𝔑": "&Nfr;",
      "⁠": "&NoBreak;",
      " ": "&nbsp;",
      "ℕ": "&naturals;",
      "⫬": "&Not;",
      "≢": "&nequiv;",
      "≭": "&NotCupCap;",
      "∦": "&nspar;",
      "∉": "&notinva;",
      "≠": "&ne;",
      "≂̸": "&nesim;",
      "∄": "&nexists;",
      "≯": "&ngtr;",
      "≱": "&ngeq;",
      "≧̸": "&ngeqq;",
      "≫̸": "&nGtv;",
      "≹": "&ntgl;",
      "⩾̸": "&nges;",
      "≵": "&ngsim;",
      "≎̸": "&nbump;",
      "≏̸": "&nbumpe;",
      "⋪": "&ntriangleleft;",
      "⧏̸": "&NotLeftTriangleBar;",
      "⋬": "&ntrianglelefteq;",
      "≮": "&nlt;",
      "≰": "&nleq;",
      "≸": "&ntlg;",
      "≪̸": "&nLtv;",
      "⩽̸": "&nles;",
      "≴": "&nlsim;",
      "⪢̸": "&NotNestedGreaterGreater;",
      "⪡̸": "&NotNestedLessLess;",
      "⊀": "&nprec;",
      "⪯̸": "&npreceq;",
      "⋠": "&nprcue;",
      "∌": "&notniva;",
      "⋫": "&ntriangleright;",
      "⧐̸": "&NotRightTriangleBar;",
      "⋭": "&ntrianglerighteq;",
      "⊏̸": "&NotSquareSubset;",
      "⋢": "&nsqsube;",
      "⊐̸": "&NotSquareSuperset;",
      "⋣": "&nsqsupe;",
      "⊂⃒": "&vnsub;",
      "⊈": "&nsubseteq;",
      "⊁": "&nsucc;",
      "⪰̸": "&nsucceq;",
      "⋡": "&nsccue;",
      "≿̸": "&NotSucceedsTilde;",
      "⊃⃒": "&vnsup;",
      "⊉": "&nsupseteq;",
      "≁": "&nsim;",
      "≄": "&nsimeq;",
      "≇": "&ncong;",
      "≉": "&napprox;",
      "∤": "&nsmid;",
      "𝒩": "&Nscr;",
      "Ñ": "&Ntilde;",
      "Ν": "&Nu;",
      "Œ": "&OElig;",
      "Ó": "&Oacute;",
      "Ô": "&Ocirc;",
      "О": "&Ocy;",
      "Ő": "&Odblac;",
      "𝔒": "&Ofr;",
      "Ò": "&Ograve;",
      "Ō": "&Omacr;",
      "Ω": "&ohm;",
      "Ο": "&Omicron;",
      "𝕆": "&Oopf;",
      "“": "&ldquo;",
      "‘": "&lsquo;",
      "⩔": "&Or;",
      "𝒪": "&Oscr;",
      "Ø": "&Oslash;",
      "Õ": "&Otilde;",
      "⨷": "&Otimes;",
      "Ö": "&Ouml;",
      "‾": "&oline;",
      "⏞": "&OverBrace;",
      "⎴": "&tbrk;",
      "⏜": "&OverParenthesis;",
      "∂": "&part;",
      "П": "&Pcy;",
      "𝔓": "&Pfr;",
      "Φ": "&Phi;",
      "Π": "&Pi;",
      "±": "&pm;",
      "ℙ": "&primes;",
      "⪻": "&Pr;",
      "≺": "&prec;",
      "⪯": "&preceq;",
      "≼": "&preccurlyeq;",
      "≾": "&prsim;",
      "″": "&Prime;",
      "∏": "&prod;",
      "∝": "&vprop;",
      "𝒫": "&Pscr;",
      "Ψ": "&Psi;",
      '"': "&quot;",
      "𝔔": "&Qfr;",
      "ℚ": "&rationals;",
      "𝒬": "&Qscr;",
      "⤐": "&drbkarow;",
      "®": "&reg;",
      "Ŕ": "&Racute;",
      "⟫": "&Rang;",
      "↠": "&twoheadrightarrow;",
      "⤖": "&Rarrtl;",
      "Ř": "&Rcaron;",
      "Ŗ": "&Rcedil;",
      "Р": "&Rcy;",
      "ℜ": "&realpart;",
      "∋": "&niv;",
      "⇋": "&lrhar;",
      "⥯": "&duhar;",
      "Ρ": "&Rho;",
      "⟩": "&rangle;",
      "→": "&srarr;",
      "⇥": "&rarrb;",
      "⇄": "&rlarr;",
      "⌉": "&rceil;",
      "⟧": "&robrk;",
      "⥝": "&RightDownTeeVector;",
      "⇂": "&downharpoonright;",
      "⥕": "&RightDownVectorBar;",
      "⌋": "&rfloor;",
      "⊢": "&vdash;",
      "↦": "&mapsto;",
      "⥛": "&RightTeeVector;",
      "⊳": "&vrtri;",
      "⧐": "&RightTriangleBar;",
      "⊵": "&trianglerighteq;",
      "⥏": "&RightUpDownVector;",
      "⥜": "&RightUpTeeVector;",
      "↾": "&upharpoonright;",
      "⥔": "&RightUpVectorBar;",
      "⇀": "&rightharpoonup;",
      "⥓": "&RightVectorBar;",
      "ℝ": "&reals;",
      "⥰": "&RoundImplies;",
      "⇛": "&rAarr;",
      "ℛ": "&realine;",
      "↱": "&rsh;",
      "⧴": "&RuleDelayed;",
      "Щ": "&SHCHcy;",
      "Ш": "&SHcy;",
      "Ь": "&SOFTcy;",
      "Ś": "&Sacute;",
      "⪼": "&Sc;",
      "Š": "&Scaron;",
      "Ş": "&Scedil;",
      "Ŝ": "&Scirc;",
      "С": "&Scy;",
      "𝔖": "&Sfr;",
      "↑": "&uparrow;",
      "Σ": "&Sigma;",
      "∘": "&compfn;",
      "𝕊": "&Sopf;",
      "√": "&radic;",
      "□": "&square;",
      "⊓": "&sqcap;",
      "⊏": "&sqsubset;",
      "⊑": "&sqsubseteq;",
      "⊐": "&sqsupset;",
      "⊒": "&sqsupseteq;",
      "⊔": "&sqcup;",
      "𝒮": "&Sscr;",
      "⋆": "&sstarf;",
      "⋐": "&Subset;",
      "⊆": "&subseteq;",
      "≻": "&succ;",
      "⪰": "&succeq;",
      "≽": "&succcurlyeq;",
      "≿": "&succsim;",
      "∑": "&sum;",
      "⋑": "&Supset;",
      "⊃": "&supset;",
      "⊇": "&supseteq;",
      "Þ": "&THORN;",
      "™": "&trade;",
      "Ћ": "&TSHcy;",
      "Ц": "&TScy;",
      "\t": "&Tab;",
      "Τ": "&Tau;",
      "Ť": "&Tcaron;",
      "Ţ": "&Tcedil;",
      "Т": "&Tcy;",
      "𝔗": "&Tfr;",
      "∴": "&therefore;",
      "Θ": "&Theta;",
      "  ": "&ThickSpace;",
      " ": "&thinsp;",
      "∼": "&thksim;",
      "≃": "&simeq;",
      "≅": "&cong;",
      "≈": "&thkap;",
      "𝕋": "&Topf;",
      "⃛": "&tdot;",
      "𝒯": "&Tscr;",
      "Ŧ": "&Tstrok;",
      "Ú": "&Uacute;",
      "↟": "&Uarr;",
      "⥉": "&Uarrocir;",
      "Ў": "&Ubrcy;",
      "Ŭ": "&Ubreve;",
      "Û": "&Ucirc;",
      "У": "&Ucy;",
      "Ű": "&Udblac;",
      "𝔘": "&Ufr;",
      "Ù": "&Ugrave;",
      "Ū": "&Umacr;",
      _: "&lowbar;",
      "⏟": "&UnderBrace;",
      "⎵": "&bbrk;",
      "⏝": "&UnderParenthesis;",
      "⋃": "&xcup;",
      "⊎": "&uplus;",
      "Ų": "&Uogon;",
      "𝕌": "&Uopf;",
      "⤒": "&UpArrowBar;",
      "⇅": "&udarr;",
      "↕": "&varr;",
      "⥮": "&udhar;",
      "⊥": "&perp;",
      "↥": "&mapstoup;",
      "↖": "&nwarrow;",
      "↗": "&nearrow;",
      "ϒ": "&upsih;",
      "Υ": "&Upsilon;",
      "Ů": "&Uring;",
      "𝒰": "&Uscr;",
      "Ũ": "&Utilde;",
      "Ü": "&Uuml;",
      "⊫": "&VDash;",
      "⫫": "&Vbar;",
      "В": "&Vcy;",
      "⊩": "&Vdash;",
      "⫦": "&Vdashl;",
      "⋁": "&xvee;",
      "‖": "&Vert;",
      "∣": "&smid;",
      "|": "&vert;",
      "❘": "&VerticalSeparator;",
      "≀": "&wreath;",
      " ": "&hairsp;",
      "𝔙": "&Vfr;",
      "𝕍": "&Vopf;",
      "𝒱": "&Vscr;",
      "⊪": "&Vvdash;",
      "Ŵ": "&Wcirc;",
      "⋀": "&xwedge;",
      "𝔚": "&Wfr;",
      "𝕎": "&Wopf;",
      "𝒲": "&Wscr;",
      "𝔛": "&Xfr;",
      "Ξ": "&Xi;",
      "𝕏": "&Xopf;",
      "𝒳": "&Xscr;",
      "Я": "&YAcy;",
      "Ї": "&YIcy;",
      "Ю": "&YUcy;",
      "Ý": "&Yacute;",
      "Ŷ": "&Ycirc;",
      "Ы": "&Ycy;",
      "𝔜": "&Yfr;",
      "𝕐": "&Yopf;",
      "𝒴": "&Yscr;",
      "Ÿ": "&Yuml;",
      "Ж": "&ZHcy;",
      "Ź": "&Zacute;",
      "Ž": "&Zcaron;",
      "З": "&Zcy;",
      "Ż": "&Zdot;",
      "Ζ": "&Zeta;",
      "ℨ": "&zeetrf;",
      "ℤ": "&integers;",
      "𝒵": "&Zscr;",
      "á": "&aacute;",
      "ă": "&abreve;",
      "∾": "&mstpos;",
      "∾̳": "&acE;",
      "∿": "&acd;",
      "â": "&acirc;",
      "а": "&acy;",
      "æ": "&aelig;",
      "𝔞": "&afr;",
      "à": "&agrave;",
      "ℵ": "&aleph;",
      "α": "&alpha;",
      "ā": "&amacr;",
      "⨿": "&amalg;",
      "∧": "&wedge;",
      "⩕": "&andand;",
      "⩜": "&andd;",
      "⩘": "&andslope;",
      "⩚": "&andv;",
      "∠": "&angle;",
      "⦤": "&ange;",
      "∡": "&measuredangle;",
      "⦨": "&angmsdaa;",
      "⦩": "&angmsdab;",
      "⦪": "&angmsdac;",
      "⦫": "&angmsdad;",
      "⦬": "&angmsdae;",
      "⦭": "&angmsdaf;",
      "⦮": "&angmsdag;",
      "⦯": "&angmsdah;",
      "∟": "&angrt;",
      "⊾": "&angrtvb;",
      "⦝": "&angrtvbd;",
      "∢": "&angsph;",
      "⍼": "&angzarr;",
      "ą": "&aogon;",
      "𝕒": "&aopf;",
      "⩰": "&apE;",
      "⩯": "&apacir;",
      "≊": "&approxeq;",
      "≋": "&apid;",
      "'": "&apos;",
      "å": "&aring;",
      "𝒶": "&ascr;",
      "*": "&midast;",
      "ã": "&atilde;",
      "ä": "&auml;",
      "⨑": "&awint;",
      "⫭": "&bNot;",
      "≌": "&bcong;",
      "϶": "&bepsi;",
      "‵": "&bprime;",
      "∽": "&bsim;",
      "⋍": "&bsime;",
      "⊽": "&barvee;",
      "⌅": "&barwedge;",
      "⎶": "&bbrktbrk;",
      "б": "&bcy;",
      "„": "&ldquor;",
      "⦰": "&bemptyv;",
      "β": "&beta;",
      "ℶ": "&beth;",
      "≬": "&twixt;",
      "𝔟": "&bfr;",
      "◯": "&xcirc;",
      "⨀": "&xodot;",
      "⨁": "&xoplus;",
      "⨂": "&xotime;",
      "⨆": "&xsqcup;",
      "★": "&starf;",
      "▽": "&xdtri;",
      "△": "&xutri;",
      "⨄": "&xuplus;",
      "⤍": "&rbarr;",
      "⧫": "&lozf;",
      "▴": "&utrif;",
      "▾": "&dtrif;",
      "◂": "&ltrif;",
      "▸": "&rtrif;",
      "␣": "&blank;",
      "▒": "&blk12;",
      "░": "&blk14;",
      "▓": "&blk34;",
      "█": "&block;",
      "=⃥": "&bne;",
      "≡⃥": "&bnequiv;",
      "⌐": "&bnot;",
      "𝕓": "&bopf;",
      "⋈": "&bowtie;",
      "╗": "&boxDL;",
      "╔": "&boxDR;",
      "╖": "&boxDl;",
      "╓": "&boxDr;",
      "═": "&boxH;",
      "╦": "&boxHD;",
      "╩": "&boxHU;",
      "╤": "&boxHd;",
      "╧": "&boxHu;",
      "╝": "&boxUL;",
      "╚": "&boxUR;",
      "╜": "&boxUl;",
      "╙": "&boxUr;",
      "║": "&boxV;",
      "╬": "&boxVH;",
      "╣": "&boxVL;",
      "╠": "&boxVR;",
      "╫": "&boxVh;",
      "╢": "&boxVl;",
      "╟": "&boxVr;",
      "⧉": "&boxbox;",
      "╕": "&boxdL;",
      "╒": "&boxdR;",
      "┐": "&boxdl;",
      "┌": "&boxdr;",
      "╥": "&boxhD;",
      "╨": "&boxhU;",
      "┬": "&boxhd;",
      "┴": "&boxhu;",
      "⊟": "&minusb;",
      "⊞": "&plusb;",
      "⊠": "&timesb;",
      "╛": "&boxuL;",
      "╘": "&boxuR;",
      "┘": "&boxul;",
      "└": "&boxur;",
      "│": "&boxv;",
      "╪": "&boxvH;",
      "╡": "&boxvL;",
      "╞": "&boxvR;",
      "┼": "&boxvh;",
      "┤": "&boxvl;",
      "├": "&boxvr;",
      "¦": "&brvbar;",
      "𝒷": "&bscr;",
      "⁏": "&bsemi;",
      "\\": "&bsol;",
      "⧅": "&bsolb;",
      "⟈": "&bsolhsub;",
      "•": "&bullet;",
      "⪮": "&bumpE;",
      "ć": "&cacute;",
      "∩": "&cap;",
      "⩄": "&capand;",
      "⩉": "&capbrcup;",
      "⩋": "&capcap;",
      "⩇": "&capcup;",
      "⩀": "&capdot;",
      "∩︀": "&caps;",
      "⁁": "&caret;",
      "⩍": "&ccaps;",
      "č": "&ccaron;",
      "ç": "&ccedil;",
      "ĉ": "&ccirc;",
      "⩌": "&ccups;",
      "⩐": "&ccupssm;",
      "ċ": "&cdot;",
      "⦲": "&cemptyv;",
      "¢": "&cent;",
      "𝔠": "&cfr;",
      "ч": "&chcy;",
      "✓": "&checkmark;",
      "χ": "&chi;",
      "○": "&cir;",
      "⧃": "&cirE;",
      "ˆ": "&circ;",
      "≗": "&cire;",
      "↺": "&olarr;",
      "↻": "&orarr;",
      "Ⓢ": "&oS;",
      "⊛": "&oast;",
      "⊚": "&ocir;",
      "⊝": "&odash;",
      "⨐": "&cirfnint;",
      "⫯": "&cirmid;",
      "⧂": "&cirscir;",
      "♣": "&clubsuit;",
      ":": "&colon;",
      ",": "&comma;",
      "@": "&commat;",
      "∁": "&complement;",
      "⩭": "&congdot;",
      "𝕔": "&copf;",
      "℗": "&copysr;",
      "↵": "&crarr;",
      "✗": "&cross;",
      "𝒸": "&cscr;",
      "⫏": "&csub;",
      "⫑": "&csube;",
      "⫐": "&csup;",
      "⫒": "&csupe;",
      "⋯": "&ctdot;",
      "⤸": "&cudarrl;",
      "⤵": "&cudarrr;",
      "⋞": "&curlyeqprec;",
      "⋟": "&curlyeqsucc;",
      "↶": "&curvearrowleft;",
      "⤽": "&cularrp;",
      "∪": "&cup;",
      "⩈": "&cupbrcap;",
      "⩆": "&cupcap;",
      "⩊": "&cupcup;",
      "⊍": "&cupdot;",
      "⩅": "&cupor;",
      "∪︀": "&cups;",
      "↷": "&curvearrowright;",
      "⤼": "&curarrm;",
      "⋎": "&cuvee;",
      "⋏": "&cuwed;",
      "¤": "&curren;",
      "∱": "&cwint;",
      "⌭": "&cylcty;",
      "⥥": "&dHar;",
      "†": "&dagger;",
      "ℸ": "&daleth;",
      "‐": "&hyphen;",
      "⤏": "&rBarr;",
      "ď": "&dcaron;",
      "д": "&dcy;",
      "⇊": "&downdownarrows;",
      "⩷": "&eDDot;",
      "°": "&deg;",
      "δ": "&delta;",
      "⦱": "&demptyv;",
      "⥿": "&dfisht;",
      "𝔡": "&dfr;",
      "♦": "&diams;",
      "ϝ": "&gammad;",
      "⋲": "&disin;",
      "÷": "&divide;",
      "⋇": "&divonx;",
      "ђ": "&djcy;",
      "⌞": "&llcorner;",
      "⌍": "&dlcrop;",
      $: "&dollar;",
      "𝕕": "&dopf;",
      "≑": "&eDot;",
      "∸": "&minusd;",
      "∔": "&plusdo;",
      "⊡": "&sdotb;",
      "⌟": "&lrcorner;",
      "⌌": "&drcrop;",
      "𝒹": "&dscr;",
      "ѕ": "&dscy;",
      "⧶": "&dsol;",
      "đ": "&dstrok;",
      "⋱": "&dtdot;",
      "▿": "&triangledown;",
      "⦦": "&dwangle;",
      "џ": "&dzcy;",
      "⟿": "&dzigrarr;",
      "é": "&eacute;",
      "⩮": "&easter;",
      "ě": "&ecaron;",
      "≖": "&eqcirc;",
      "ê": "&ecirc;",
      "≕": "&eqcolon;",
      "э": "&ecy;",
      "ė": "&edot;",
      "≒": "&fallingdotseq;",
      "𝔢": "&efr;",
      "⪚": "&eg;",
      "è": "&egrave;",
      "⪖": "&eqslantgtr;",
      "⪘": "&egsdot;",
      "⪙": "&el;",
      "⏧": "&elinters;",
      "ℓ": "&ell;",
      "⪕": "&eqslantless;",
      "⪗": "&elsdot;",
      "ē": "&emacr;",
      "∅": "&varnothing;",
      " ": "&emsp13;",
      " ": "&emsp14;",
      " ": "&emsp;",
      "ŋ": "&eng;",
      " ": "&ensp;",
      "ę": "&eogon;",
      "𝕖": "&eopf;",
      "⋕": "&epar;",
      "⧣": "&eparsl;",
      "⩱": "&eplus;",
      "ε": "&epsilon;",
      "ϵ": "&varepsilon;",
      "=": "&equals;",
      "≟": "&questeq;",
      "⩸": "&equivDD;",
      "⧥": "&eqvparsl;",
      "≓": "&risingdotseq;",
      "⥱": "&erarr;",
      "ℯ": "&escr;",
      "η": "&eta;",
      "ð": "&eth;",
      "ë": "&euml;",
      "€": "&euro;",
      "!": "&excl;",
      "ф": "&fcy;",
      "♀": "&female;",
      "ﬃ": "&ffilig;",
      "ﬀ": "&fflig;",
      "ﬄ": "&ffllig;",
      "𝔣": "&ffr;",
      "ﬁ": "&filig;",
      fj: "&fjlig;",
      "♭": "&flat;",
      "ﬂ": "&fllig;",
      "▱": "&fltns;",
      "ƒ": "&fnof;",
      "𝕗": "&fopf;",
      "⋔": "&pitchfork;",
      "⫙": "&forkv;",
      "⨍": "&fpartint;",
      "½": "&half;",
      "⅓": "&frac13;",
      "¼": "&frac14;",
      "⅕": "&frac15;",
      "⅙": "&frac16;",
      "⅛": "&frac18;",
      "⅔": "&frac23;",
      "⅖": "&frac25;",
      "¾": "&frac34;",
      "⅗": "&frac35;",
      "⅜": "&frac38;",
      "⅘": "&frac45;",
      "⅚": "&frac56;",
      "⅝": "&frac58;",
      "⅞": "&frac78;",
      "⁄": "&frasl;",
      "⌢": "&sfrown;",
      "𝒻": "&fscr;",
      "⪌": "&gtreqqless;",
      "ǵ": "&gacute;",
      "γ": "&gamma;",
      "⪆": "&gtrapprox;",
      "ğ": "&gbreve;",
      "ĝ": "&gcirc;",
      "г": "&gcy;",
      "ġ": "&gdot;",
      "⪩": "&gescc;",
      "⪀": "&gesdot;",
      "⪂": "&gesdoto;",
      "⪄": "&gesdotol;",
      "⋛︀": "&gesl;",
      "⪔": "&gesles;",
      "𝔤": "&gfr;",
      "ℷ": "&gimel;",
      "ѓ": "&gjcy;",
      "⪒": "&glE;",
      "⪥": "&gla;",
      "⪤": "&glj;",
      "≩": "&gneqq;",
      "⪊": "&gnapprox;",
      "⪈": "&gneq;",
      "⋧": "&gnsim;",
      "𝕘": "&gopf;",
      "ℊ": "&gscr;",
      "⪎": "&gsime;",
      "⪐": "&gsiml;",
      "⪧": "&gtcc;",
      "⩺": "&gtcir;",
      "⋗": "&gtrdot;",
      "⦕": "&gtlPar;",
      "⩼": "&gtquest;",
      "⥸": "&gtrarr;",
      "≩︀": "&gvnE;",
      "ъ": "&hardcy;",
      "⥈": "&harrcir;",
      "↭": "&leftrightsquigarrow;",
      "ℏ": "&plankv;",
      "ĥ": "&hcirc;",
      "♥": "&heartsuit;",
      "…": "&mldr;",
      "⊹": "&hercon;",
      "𝔥": "&hfr;",
      "⤥": "&searhk;",
      "⤦": "&swarhk;",
      "⇿": "&hoarr;",
      "∻": "&homtht;",
      "↩": "&larrhk;",
      "↪": "&rarrhk;",
      "𝕙": "&hopf;",
      "―": "&horbar;",
      "𝒽": "&hscr;",
      "ħ": "&hstrok;",
      "⁃": "&hybull;",
      "í": "&iacute;",
      "î": "&icirc;",
      "и": "&icy;",
      "е": "&iecy;",
      "¡": "&iexcl;",
      "𝔦": "&ifr;",
      "ì": "&igrave;",
      "⨌": "&qint;",
      "∭": "&tint;",
      "⧜": "&iinfin;",
      "℩": "&iiota;",
      "ĳ": "&ijlig;",
      "ī": "&imacr;",
      "ı": "&inodot;",
      "⊷": "&imof;",
      "Ƶ": "&imped;",
      "℅": "&incare;",
      "∞": "&infin;",
      "⧝": "&infintie;",
      "⊺": "&intercal;",
      "⨗": "&intlarhk;",
      "⨼": "&iprod;",
      "ё": "&iocy;",
      "į": "&iogon;",
      "𝕚": "&iopf;",
      "ι": "&iota;",
      "¿": "&iquest;",
      "𝒾": "&iscr;",
      "⋹": "&isinE;",
      "⋵": "&isindot;",
      "⋴": "&isins;",
      "⋳": "&isinsv;",
      "ĩ": "&itilde;",
      "і": "&iukcy;",
      "ï": "&iuml;",
      "ĵ": "&jcirc;",
      "й": "&jcy;",
      "𝔧": "&jfr;",
      "ȷ": "&jmath;",
      "𝕛": "&jopf;",
      "𝒿": "&jscr;",
      "ј": "&jsercy;",
      "є": "&jukcy;",
      "κ": "&kappa;",
      "ϰ": "&varkappa;",
      "ķ": "&kcedil;",
      "к": "&kcy;",
      "𝔨": "&kfr;",
      "ĸ": "&kgreen;",
      "х": "&khcy;",
      "ќ": "&kjcy;",
      "𝕜": "&kopf;",
      "𝓀": "&kscr;",
      "⤛": "&lAtail;",
      "⤎": "&lBarr;",
      "⪋": "&lesseqqgtr;",
      "⥢": "&lHar;",
      "ĺ": "&lacute;",
      "⦴": "&laemptyv;",
      "λ": "&lambda;",
      "⦑": "&langd;",
      "⪅": "&lessapprox;",
      "«": "&laquo;",
      "⤟": "&larrbfs;",
      "⤝": "&larrfs;",
      "↫": "&looparrowleft;",
      "⤹": "&larrpl;",
      "⥳": "&larrsim;",
      "↢": "&leftarrowtail;",
      "⪫": "&lat;",
      "⤙": "&latail;",
      "⪭": "&late;",
      "⪭︀": "&lates;",
      "⤌": "&lbarr;",
      "❲": "&lbbrk;",
      "{": "&lcub;",
      "[": "&lsqb;",
      "⦋": "&lbrke;",
      "⦏": "&lbrksld;",
      "⦍": "&lbrkslu;",
      "ľ": "&lcaron;",
      "ļ": "&lcedil;",
      "л": "&lcy;",
      "⤶": "&ldca;",
      "⥧": "&ldrdhar;",
      "⥋": "&ldrushar;",
      "↲": "&ldsh;",
      "≤": "&leq;",
      "⇇": "&llarr;",
      "⋋": "&lthree;",
      "⪨": "&lescc;",
      "⩿": "&lesdot;",
      "⪁": "&lesdoto;",
      "⪃": "&lesdotor;",
      "⋚︀": "&lesg;",
      "⪓": "&lesges;",
      "⋖": "&ltdot;",
      "⥼": "&lfisht;",
      "𝔩": "&lfr;",
      "⪑": "&lgE;",
      "⥪": "&lharul;",
      "▄": "&lhblk;",
      "љ": "&ljcy;",
      "⥫": "&llhard;",
      "◺": "&lltri;",
      "ŀ": "&lmidot;",
      "⎰": "&lmoustache;",
      "≨": "&lneqq;",
      "⪉": "&lnapprox;",
      "⪇": "&lneq;",
      "⋦": "&lnsim;",
      "⟬": "&loang;",
      "⇽": "&loarr;",
      "⟼": "&xmap;",
      "↬": "&rarrlp;",
      "⦅": "&lopar;",
      "𝕝": "&lopf;",
      "⨭": "&loplus;",
      "⨴": "&lotimes;",
      "∗": "&lowast;",
      "◊": "&lozenge;",
      "(": "&lpar;",
      "⦓": "&lparlt;",
      "⥭": "&lrhard;",
      "‎": "&lrm;",
      "⊿": "&lrtri;",
      "‹": "&lsaquo;",
      "𝓁": "&lscr;",
      "⪍": "&lsime;",
      "⪏": "&lsimg;",
      "‚": "&sbquo;",
      "ł": "&lstrok;",
      "⪦": "&ltcc;",
      "⩹": "&ltcir;",
      "⋉": "&ltimes;",
      "⥶": "&ltlarr;",
      "⩻": "&ltquest;",
      "⦖": "&ltrPar;",
      "◃": "&triangleleft;",
      "⥊": "&lurdshar;",
      "⥦": "&luruhar;",
      "≨︀": "&lvnE;",
      "∺": "&mDDot;",
      "¯": "&strns;",
      "♂": "&male;",
      "✠": "&maltese;",
      "▮": "&marker;",
      "⨩": "&mcomma;",
      "м": "&mcy;",
      "—": "&mdash;",
      "𝔪": "&mfr;",
      "℧": "&mho;",
      "µ": "&micro;",
      "⫰": "&midcir;",
      "−": "&minus;",
      "⨪": "&minusdu;",
      "⫛": "&mlcp;",
      "⊧": "&models;",
      "𝕞": "&mopf;",
      "𝓂": "&mscr;",
      "μ": "&mu;",
      "⊸": "&mumap;",
      "⋙̸": "&nGg;",
      "≫⃒": "&nGt;",
      "⇍": "&nlArr;",
      "⇎": "&nhArr;",
      "⋘̸": "&nLl;",
      "≪⃒": "&nLt;",
      "⇏": "&nrArr;",
      "⊯": "&nVDash;",
      "⊮": "&nVdash;",
      "ń": "&nacute;",
      "∠⃒": "&nang;",
      "⩰̸": "&napE;",
      "≋̸": "&napid;",
      "ŉ": "&napos;",
      "♮": "&natural;",
      "⩃": "&ncap;",
      "ň": "&ncaron;",
      "ņ": "&ncedil;",
      "⩭̸": "&ncongdot;",
      "⩂": "&ncup;",
      "н": "&ncy;",
      "–": "&ndash;",
      "⇗": "&neArr;",
      "⤤": "&nearhk;",
      "≐̸": "&nedot;",
      "⤨": "&toea;",
      "𝔫": "&nfr;",
      "↮": "&nleftrightarrow;",
      "⫲": "&nhpar;",
      "⋼": "&nis;",
      "⋺": "&nisd;",
      "њ": "&njcy;",
      "≦̸": "&nleqq;",
      "↚": "&nleftarrow;",
      "‥": "&nldr;",
      "𝕟": "&nopf;",
      "¬": "&not;",
      "⋹̸": "&notinE;",
      "⋵̸": "&notindot;",
      "⋷": "&notinvb;",
      "⋶": "&notinvc;",
      "⋾": "&notnivb;",
      "⋽": "&notnivc;",
      "⫽⃥": "&nparsl;",
      "∂̸": "&npart;",
      "⨔": "&npolint;",
      "↛": "&nrightarrow;",
      "⤳̸": "&nrarrc;",
      "↝̸": "&nrarrw;",
      "𝓃": "&nscr;",
      "⊄": "&nsub;",
      "⫅̸": "&nsubseteqq;",
      "⊅": "&nsup;",
      "⫆̸": "&nsupseteqq;",
      "ñ": "&ntilde;",
      "ν": "&nu;",
      "#": "&num;",
      "№": "&numero;",
      " ": "&numsp;",
      "⊭": "&nvDash;",
      "⤄": "&nvHarr;",
      "≍⃒": "&nvap;",
      "⊬": "&nvdash;",
      "≥⃒": "&nvge;",
      ">⃒": "&nvgt;",
      "⧞": "&nvinfin;",
      "⤂": "&nvlArr;",
      "≤⃒": "&nvle;",
      "<⃒": "&nvlt;",
      "⊴⃒": "&nvltrie;",
      "⤃": "&nvrArr;",
      "⊵⃒": "&nvrtrie;",
      "∼⃒": "&nvsim;",
      "⇖": "&nwArr;",
      "⤣": "&nwarhk;",
      "⤧": "&nwnear;",
      "ó": "&oacute;",
      "ô": "&ocirc;",
      "о": "&ocy;",
      "ő": "&odblac;",
      "⨸": "&odiv;",
      "⦼": "&odsold;",
      "œ": "&oelig;",
      "⦿": "&ofcir;",
      "𝔬": "&ofr;",
      "˛": "&ogon;",
      "ò": "&ograve;",
      "⧁": "&ogt;",
      "⦵": "&ohbar;",
      "⦾": "&olcir;",
      "⦻": "&olcross;",
      "⧀": "&olt;",
      "ō": "&omacr;",
      "ω": "&omega;",
      "ο": "&omicron;",
      "⦶": "&omid;",
      "𝕠": "&oopf;",
      "⦷": "&opar;",
      "⦹": "&operp;",
      "∨": "&vee;",
      "⩝": "&ord;",
      "ℴ": "&oscr;",
      "ª": "&ordf;",
      "º": "&ordm;",
      "⊶": "&origof;",
      "⩖": "&oror;",
      "⩗": "&orslope;",
      "⩛": "&orv;",
      "ø": "&oslash;",
      "⊘": "&osol;",
      "õ": "&otilde;",
      "⨶": "&otimesas;",
      "ö": "&ouml;",
      "⌽": "&ovbar;",
      "¶": "&para;",
      "⫳": "&parsim;",
      "⫽": "&parsl;",
      "п": "&pcy;",
      "%": "&percnt;",
      ".": "&period;",
      "‰": "&permil;",
      "‱": "&pertenk;",
      "𝔭": "&pfr;",
      "φ": "&phi;",
      "ϕ": "&varphi;",
      "☎": "&phone;",
      "π": "&pi;",
      "ϖ": "&varpi;",
      "ℎ": "&planckh;",
      "+": "&plus;",
      "⨣": "&plusacir;",
      "⨢": "&pluscir;",
      "⨥": "&plusdu;",
      "⩲": "&pluse;",
      "⨦": "&plussim;",
      "⨧": "&plustwo;",
      "⨕": "&pointint;",
      "𝕡": "&popf;",
      "£": "&pound;",
      "⪳": "&prE;",
      "⪷": "&precapprox;",
      "⪹": "&prnap;",
      "⪵": "&prnE;",
      "⋨": "&prnsim;",
      "′": "&prime;",
      "⌮": "&profalar;",
      "⌒": "&profline;",
      "⌓": "&profsurf;",
      "⊰": "&prurel;",
      "𝓅": "&pscr;",
      "ψ": "&psi;",
      " ": "&puncsp;",
      "𝔮": "&qfr;",
      "𝕢": "&qopf;",
      "⁗": "&qprime;",
      "𝓆": "&qscr;",
      "⨖": "&quatint;",
      "?": "&quest;",
      "⤜": "&rAtail;",
      "⥤": "&rHar;",
      "∽̱": "&race;",
      "ŕ": "&racute;",
      "⦳": "&raemptyv;",
      "⦒": "&rangd;",
      "⦥": "&range;",
      "»": "&raquo;",
      "⥵": "&rarrap;",
      "⤠": "&rarrbfs;",
      "⤳": "&rarrc;",
      "⤞": "&rarrfs;",
      "⥅": "&rarrpl;",
      "⥴": "&rarrsim;",
      "↣": "&rightarrowtail;",
      "↝": "&rightsquigarrow;",
      "⤚": "&ratail;",
      "∶": "&ratio;",
      "❳": "&rbbrk;",
      "}": "&rcub;",
      "]": "&rsqb;",
      "⦌": "&rbrke;",
      "⦎": "&rbrksld;",
      "⦐": "&rbrkslu;",
      "ř": "&rcaron;",
      "ŗ": "&rcedil;",
      "р": "&rcy;",
      "⤷": "&rdca;",
      "⥩": "&rdldhar;",
      "↳": "&rdsh;",
      "▭": "&rect;",
      "⥽": "&rfisht;",
      "𝔯": "&rfr;",
      "⥬": "&rharul;",
      "ρ": "&rho;",
      "ϱ": "&varrho;",
      "⇉": "&rrarr;",
      "⋌": "&rthree;",
      "˚": "&ring;",
      "‏": "&rlm;",
      "⎱": "&rmoustache;",
      "⫮": "&rnmid;",
      "⟭": "&roang;",
      "⇾": "&roarr;",
      "⦆": "&ropar;",
      "𝕣": "&ropf;",
      "⨮": "&roplus;",
      "⨵": "&rotimes;",
      ")": "&rpar;",
      "⦔": "&rpargt;",
      "⨒": "&rppolint;",
      "›": "&rsaquo;",
      "𝓇": "&rscr;",
      "⋊": "&rtimes;",
      "▹": "&triangleright;",
      "⧎": "&rtriltri;",
      "⥨": "&ruluhar;",
      "℞": "&rx;",
      "ś": "&sacute;",
      "⪴": "&scE;",
      "⪸": "&succapprox;",
      "š": "&scaron;",
      "ş": "&scedil;",
      "ŝ": "&scirc;",
      "⪶": "&succneqq;",
      "⪺": "&succnapprox;",
      "⋩": "&succnsim;",
      "⨓": "&scpolint;",
      "с": "&scy;",
      "⋅": "&sdot;",
      "⩦": "&sdote;",
      "⇘": "&seArr;",
      "§": "&sect;",
      ";": "&semi;",
      "⤩": "&tosa;",
      "✶": "&sext;",
      "𝔰": "&sfr;",
      "♯": "&sharp;",
      "щ": "&shchcy;",
      "ш": "&shcy;",
      "­": "&shy;",
      "σ": "&sigma;",
      "ς": "&varsigma;",
      "⩪": "&simdot;",
      "⪞": "&simg;",
      "⪠": "&simgE;",
      "⪝": "&siml;",
      "⪟": "&simlE;",
      "≆": "&simne;",
      "⨤": "&simplus;",
      "⥲": "&simrarr;",
      "⨳": "&smashp;",
      "⧤": "&smeparsl;",
      "⌣": "&ssmile;",
      "⪪": "&smt;",
      "⪬": "&smte;",
      "⪬︀": "&smtes;",
      "ь": "&softcy;",
      "/": "&sol;",
      "⧄": "&solb;",
      "⌿": "&solbar;",
      "𝕤": "&sopf;",
      "♠": "&spadesuit;",
      "⊓︀": "&sqcaps;",
      "⊔︀": "&sqcups;",
      "𝓈": "&sscr;",
      "☆": "&star;",
      "⊂": "&subset;",
      "⫅": "&subseteqq;",
      "⪽": "&subdot;",
      "⫃": "&subedot;",
      "⫁": "&submult;",
      "⫋": "&subsetneqq;",
      "⊊": "&subsetneq;",
      "⪿": "&subplus;",
      "⥹": "&subrarr;",
      "⫇": "&subsim;",
      "⫕": "&subsub;",
      "⫓": "&subsup;",
      "♪": "&sung;",
      "¹": "&sup1;",
      "²": "&sup2;",
      "³": "&sup3;",
      "⫆": "&supseteqq;",
      "⪾": "&supdot;",
      "⫘": "&supdsub;",
      "⫄": "&supedot;",
      "⟉": "&suphsol;",
      "⫗": "&suphsub;",
      "⥻": "&suplarr;",
      "⫂": "&supmult;",
      "⫌": "&supsetneqq;",
      "⊋": "&supsetneq;",
      "⫀": "&supplus;",
      "⫈": "&supsim;",
      "⫔": "&supsub;",
      "⫖": "&supsup;",
      "⇙": "&swArr;",
      "⤪": "&swnwar;",
      "ß": "&szlig;",
      "⌖": "&target;",
      "τ": "&tau;",
      "ť": "&tcaron;",
      "ţ": "&tcedil;",
      "т": "&tcy;",
      "⌕": "&telrec;",
      "𝔱": "&tfr;",
      "θ": "&theta;",
      "ϑ": "&vartheta;",
      "þ": "&thorn;",
      "×": "&times;",
      "⨱": "&timesbar;",
      "⨰": "&timesd;",
      "⌶": "&topbot;",
      "⫱": "&topcir;",
      "𝕥": "&topf;",
      "⫚": "&topfork;",
      "‴": "&tprime;",
      "▵": "&utri;",
      "≜": "&trie;",
      "◬": "&tridot;",
      "⨺": "&triminus;",
      "⨹": "&triplus;",
      "⧍": "&trisb;",
      "⨻": "&tritime;",
      "⏢": "&trpezium;",
      "𝓉": "&tscr;",
      "ц": "&tscy;",
      "ћ": "&tshcy;",
      "ŧ": "&tstrok;",
      "⥣": "&uHar;",
      "ú": "&uacute;",
      "ў": "&ubrcy;",
      "ŭ": "&ubreve;",
      "û": "&ucirc;",
      "у": "&ucy;",
      "ű": "&udblac;",
      "⥾": "&ufisht;",
      "𝔲": "&ufr;",
      "ù": "&ugrave;",
      "▀": "&uhblk;",
      "⌜": "&ulcorner;",
      "⌏": "&ulcrop;",
      "◸": "&ultri;",
      "ū": "&umacr;",
      "ų": "&uogon;",
      "𝕦": "&uopf;",
      "υ": "&upsilon;",
      "⇈": "&uuarr;",
      "⌝": "&urcorner;",
      "⌎": "&urcrop;",
      "ů": "&uring;",
      "◹": "&urtri;",
      "𝓊": "&uscr;",
      "⋰": "&utdot;",
      "ũ": "&utilde;",
      "ü": "&uuml;",
      "⦧": "&uwangle;",
      "⫨": "&vBar;",
      "⫩": "&vBarv;",
      "⦜": "&vangrt;",
      "⊊︀": "&vsubne;",
      "⫋︀": "&vsubnE;",
      "⊋︀": "&vsupne;",
      "⫌︀": "&vsupnE;",
      "в": "&vcy;",
      "⊻": "&veebar;",
      "≚": "&veeeq;",
      "⋮": "&vellip;",
      "𝔳": "&vfr;",
      "𝕧": "&vopf;",
      "𝓋": "&vscr;",
      "⦚": "&vzigzag;",
      "ŵ": "&wcirc;",
      "⩟": "&wedbar;",
      "≙": "&wedgeq;",
      "℘": "&wp;",
      "𝔴": "&wfr;",
      "𝕨": "&wopf;",
      "𝓌": "&wscr;",
      "𝔵": "&xfr;",
      "ξ": "&xi;",
      "⋻": "&xnis;",
      "𝕩": "&xopf;",
      "𝓍": "&xscr;",
      "ý": "&yacute;",
      "я": "&yacy;",
      "ŷ": "&ycirc;",
      "ы": "&ycy;",
      "¥": "&yen;",
      "𝔶": "&yfr;",
      "ї": "&yicy;",
      "𝕪": "&yopf;",
      "𝓎": "&yscr;",
      "ю": "&yucy;",
      "ÿ": "&yuml;",
      "ź": "&zacute;",
      "ž": "&zcaron;",
      "з": "&zcy;",
      "ż": "&zdot;",
      "ζ": "&zeta;",
      "𝔷": "&zfr;",
      "ж": "&zhcy;",
      "⇝": "&zigrarr;",
      "𝕫": "&zopf;",
      "𝓏": "&zscr;",
      "‍": "&zwj;",
      "‌": "&zwnj;"
    }
  }
};

/***/ }),

/***/ "./node_modules/html-entities/lib/numeric-unicode-map.js":
/*!***************************************************************!*\
  !*** ./node_modules/html-entities/lib/numeric-unicode-map.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.numericUnicodeMap = {
  0: 65533,
  128: 8364,
  130: 8218,
  131: 402,
  132: 8222,
  133: 8230,
  134: 8224,
  135: 8225,
  136: 710,
  137: 8240,
  138: 352,
  139: 8249,
  140: 338,
  142: 381,
  145: 8216,
  146: 8217,
  147: 8220,
  148: 8221,
  149: 8226,
  150: 8211,
  151: 8212,
  152: 732,
  153: 8482,
  154: 353,
  155: 8250,
  156: 339,
  158: 382,
  159: 376
};

/***/ }),

/***/ "./node_modules/html-entities/lib/surrogate-pairs.js":
/*!***********************************************************!*\
  !*** ./node_modules/html-entities/lib/surrogate-pairs.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.fromCodePoint = String.fromCodePoint || function (astralCodePoint) {
  return String.fromCharCode(Math.floor((astralCodePoint - 65536) / 1024) + 55296, (astralCodePoint - 65536) % 1024 + 56320);
};
exports.getCodePoint = String.prototype.codePointAt ? function (input, position) {
  return input.codePointAt(position);
} : function (input, position) {
  return (input.charCodeAt(position) - 55296) * 1024 + input.charCodeAt(position + 1) - 56320 + 65536;
};
exports.highSurrogateFrom = 55296;
exports.highSurrogateTo = 56319;

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js ***!
  \*******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* eslint-env browser */
/*
  eslint-disable
  no-console,
  func-names
*/

/** @typedef {any} TODO */
var normalizeUrl = __webpack_require__(/*! ./normalize-url */ "./node_modules/mini-css-extract-plugin/dist/hmr/normalize-url.js");
var srcByModuleId = Object.create(null);
var noDocument = typeof document === "undefined";
var forEach = Array.prototype.forEach;

/**
 * @param {function} fn
 * @param {number} time
 * @returns {(function(): void)|*}
 */
function debounce(fn, time) {
  var timeout = 0;
  return function () {
    // @ts-ignore
    var self = this;
    // eslint-disable-next-line prefer-rest-params
    var args = arguments;
    var functionCall = function functionCall() {
      return fn.apply(self, args);
    };
    clearTimeout(timeout);

    // @ts-ignore
    timeout = setTimeout(functionCall, time);
  };
}
function noop() {}

/**
 * @param {TODO} moduleId
 * @returns {TODO}
 */
function getCurrentScriptUrl(moduleId) {
  var src = srcByModuleId[moduleId];
  if (!src) {
    if (document.currentScript) {
      src = ( /** @type {HTMLScriptElement} */document.currentScript).src;
    } else {
      var scripts = document.getElementsByTagName("script");
      var lastScriptTag = scripts[scripts.length - 1];
      if (lastScriptTag) {
        src = lastScriptTag.src;
      }
    }
    srcByModuleId[moduleId] = src;
  }

  /**
   * @param {string} fileMap
   * @returns {null | string[]}
   */
  return function (fileMap) {
    if (!src) {
      return null;
    }
    var splitResult = src.split(/([^\\/]+)\.js$/);
    var filename = splitResult && splitResult[1];
    if (!filename) {
      return [src.replace(".js", ".css")];
    }
    if (!fileMap) {
      return [src.replace(".js", ".css")];
    }
    return fileMap.split(",").map(function (mapRule) {
      var reg = new RegExp("".concat(filename, "\\.js$"), "g");
      return normalizeUrl(src.replace(reg, "".concat(mapRule.replace(/{fileName}/g, filename), ".css")));
    });
  };
}

/**
 * @param {TODO} el
 * @param {string} [url]
 */
function updateCss(el, url) {
  if (!url) {
    if (!el.href) {
      return;
    }

    // eslint-disable-next-line
    url = el.href.split("?")[0];
  }
  if (!isUrlRequest( /** @type {string} */url)) {
    return;
  }
  if (el.isLoaded === false) {
    // We seem to be about to replace a css link that hasn't loaded yet.
    // We're probably changing the same file more than once.
    return;
  }
  if (!url || !(url.indexOf(".css") > -1)) {
    return;
  }

  // eslint-disable-next-line no-param-reassign
  el.visited = true;
  var newEl = el.cloneNode();
  newEl.isLoaded = false;
  newEl.addEventListener("load", function () {
    if (newEl.isLoaded) {
      return;
    }
    newEl.isLoaded = true;
    el.parentNode.removeChild(el);
  });
  newEl.addEventListener("error", function () {
    if (newEl.isLoaded) {
      return;
    }
    newEl.isLoaded = true;
    el.parentNode.removeChild(el);
  });
  newEl.href = "".concat(url, "?").concat(Date.now());
  if (el.nextSibling) {
    el.parentNode.insertBefore(newEl, el.nextSibling);
  } else {
    el.parentNode.appendChild(newEl);
  }
}

/**
 * @param {string} href
 * @param {TODO} src
 * @returns {TODO}
 */
function getReloadUrl(href, src) {
  var ret;

  // eslint-disable-next-line no-param-reassign
  href = normalizeUrl(href);
  src.some(
  /**
   * @param {string} url
   */
  // eslint-disable-next-line array-callback-return
  function (url) {
    if (href.indexOf(src) > -1) {
      ret = url;
    }
  });
  return ret;
}

/**
 * @param {string} [src]
 * @returns {boolean}
 */
function reloadStyle(src) {
  if (!src) {
    return false;
  }
  var elements = document.querySelectorAll("link");
  var loaded = false;
  forEach.call(elements, function (el) {
    if (!el.href) {
      return;
    }
    var url = getReloadUrl(el.href, src);
    if (!isUrlRequest(url)) {
      return;
    }
    if (el.visited === true) {
      return;
    }
    if (url) {
      updateCss(el, url);
      loaded = true;
    }
  });
  return loaded;
}
function reloadAll() {
  var elements = document.querySelectorAll("link");
  forEach.call(elements, function (el) {
    if (el.visited === true) {
      return;
    }
    updateCss(el);
  });
}

/**
 * @param {string} url
 * @returns {boolean}
 */
function isUrlRequest(url) {
  // An URL is not an request if

  // It is not http or https
  if (!/^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(url)) {
    return false;
  }
  return true;
}

/**
 * @param {TODO} moduleId
 * @param {TODO} options
 * @returns {TODO}
 */
module.exports = function (moduleId, options) {
  if (noDocument) {
    console.log("no window.document found, will not HMR CSS");
    return noop;
  }
  var getScriptSrc = getCurrentScriptUrl(moduleId);
  function update() {
    var src = getScriptSrc(options.filename);
    var reloaded = reloadStyle(src);
    if (options.locals) {
      console.log("[HMR] Detected local css modules. Reload all css");
      reloadAll();
      return;
    }
    if (reloaded) {
      console.log("[HMR] css reload %s", src.join(" "));
    } else {
      console.log("[HMR] Reload all css");
      reloadAll();
    }
  }
  return debounce(update, 50);
};

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/hmr/normalize-url.js":
/*!************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/hmr/normalize-url.js ***!
  \************************************************************************/
/***/ ((module) => {

"use strict";


/* eslint-disable */

/**
 * @param {string[]} pathComponents
 * @returns {string}
 */
function normalizeUrl(pathComponents) {
  return pathComponents.reduce(function (accumulator, item) {
    switch (item) {
      case "..":
        accumulator.pop();
        break;
      case ".":
        break;
      default:
        accumulator.push(item);
    }
    return accumulator;
  }, /** @type {string[]} */[]).join("/");
}

/**
 * @param {string} urlString
 * @returns {string}
 */
module.exports = function (urlString) {
  urlString = urlString.trim();
  if (/^data:/i.test(urlString)) {
    return urlString;
  }
  var protocol = urlString.indexOf("//") !== -1 ? urlString.split("//")[0] + "//" : "";
  var components = urlString.replace(new RegExp(protocol, "i"), "").split("/");
  var host = components[0].toLowerCase().replace(/\.$/, "");
  components[0] = "";
  var path = normalizeUrl(components);
  return protocol + host + path;
};

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/clients/WebSocketClient.js":
/*!***************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/clients/WebSocketClient.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ WebSocketClient)
/* harmony export */ });
/* harmony import */ var _utils_log_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/log.js */ "./node_modules/webpack-dev-server/client/utils/log.js");
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}

var WebSocketClient = /*#__PURE__*/function () {
  /**
   * @param {string} url
   */
  function WebSocketClient(url) {
    _classCallCheck(this, WebSocketClient);
    this.client = new WebSocket(url);
    this.client.onerror = function (error) {
      _utils_log_js__WEBPACK_IMPORTED_MODULE_0__.log.error(error);
    };
  }

  /**
   * @param {(...args: any[]) => void} f
   */
  _createClass(WebSocketClient, [{
    key: "onOpen",
    value: function onOpen(f) {
      this.client.onopen = f;
    }

    /**
     * @param {(...args: any[]) => void} f
     */
  }, {
    key: "onClose",
    value: function onClose(f) {
      this.client.onclose = f;
    }

    // call f with the message string as the first argument
    /**
     * @param {(...args: any[]) => void} f
     */
  }, {
    key: "onMessage",
    value: function onMessage(f) {
      this.client.onmessage = function (e) {
        f(e.data);
      };
    }
  }]);
  return WebSocketClient;
}();


/***/ }),

/***/ "./node_modules/webpack-dev-server/client/index.js?protocol=ws%3A&hostname=0.0.0.0&port=8080&pathname=%2Fws&logging=info&overlay=true&reconnect=10&hot=true&live-reload=true":
/*!***********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/index.js?protocol=ws%3A&hostname=0.0.0.0&port=8080&pathname=%2Fws&logging=info&overlay=true&reconnect=10&hot=true&live-reload=true ***!
  \***********************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
var __resourceQuery = "?protocol=ws%3A&hostname=0.0.0.0&port=8080&pathname=%2Fws&logging=info&overlay=true&reconnect=10&hot=true&live-reload=true";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var webpack_hot_log_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webpack/hot/log.js */ "./node_modules/webpack/hot/log.js");
/* harmony import */ var webpack_hot_log_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webpack_hot_log_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_stripAnsi_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/stripAnsi.js */ "./node_modules/webpack-dev-server/client/utils/stripAnsi.js");
/* harmony import */ var _utils_parseURL_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/parseURL.js */ "./node_modules/webpack-dev-server/client/utils/parseURL.js");
/* harmony import */ var _socket_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./socket.js */ "./node_modules/webpack-dev-server/client/socket.js");
/* harmony import */ var _overlay_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./overlay.js */ "./node_modules/webpack-dev-server/client/overlay.js");
/* harmony import */ var _utils_log_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/log.js */ "./node_modules/webpack-dev-server/client/utils/log.js");
/* harmony import */ var _utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/sendMessage.js */ "./node_modules/webpack-dev-server/client/utils/sendMessage.js");
/* harmony import */ var _utils_reloadApp_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/reloadApp.js */ "./node_modules/webpack-dev-server/client/utils/reloadApp.js");
/* harmony import */ var _utils_createSocketURL_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./utils/createSocketURL.js */ "./node_modules/webpack-dev-server/client/utils/createSocketURL.js");
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
/* global __resourceQuery, __webpack_hash__ */
/// <reference types="webpack/module" />










/**
 * @typedef {Object} OverlayOptions
 * @property {boolean | (error: Error) => boolean} [warnings]
 * @property {boolean | (error: Error) => boolean} [errors]
 * @property {boolean | (error: Error) => boolean} [runtimeErrors]
 * @property {string} [trustedTypesPolicyName]
 */

/**
 * @typedef {Object} Options
 * @property {boolean} hot
 * @property {boolean} liveReload
 * @property {boolean} progress
 * @property {boolean | OverlayOptions} overlay
 * @property {string} [logging]
 * @property {number} [reconnect]
 */

/**
 * @typedef {Object} Status
 * @property {boolean} isUnloading
 * @property {string} currentHash
 * @property {string} [previousHash]
 */

/**
 * @param {boolean | { warnings?: boolean | string; errors?: boolean | string; runtimeErrors?: boolean | string; }} overlayOptions
 */
var decodeOverlayOptions = function decodeOverlayOptions(overlayOptions) {
  if (typeof overlayOptions === "object") {
    ["warnings", "errors", "runtimeErrors"].forEach(function (property) {
      if (typeof overlayOptions[property] === "string") {
        var overlayFilterFunctionString = decodeURIComponent(overlayOptions[property]);

        // eslint-disable-next-line no-new-func
        var overlayFilterFunction = new Function("message", "var callback = ".concat(overlayFilterFunctionString, "\n        return callback(message)"));
        overlayOptions[property] = overlayFilterFunction;
      }
    });
  }
};

/**
 * @type {Status}
 */
var status = {
  isUnloading: false,
  // TODO Workaround for webpack v4, `__webpack_hash__` is not replaced without HotModuleReplacement
  // eslint-disable-next-line camelcase
  currentHash:  true ? __webpack_require__.h() : 0
};

/** @type {Options} */
var options = {
  hot: false,
  liveReload: false,
  progress: false,
  overlay: false
};
var parsedResourceQuery = (0,_utils_parseURL_js__WEBPACK_IMPORTED_MODULE_2__["default"])(__resourceQuery);
var enabledFeatures = {
  "Hot Module Replacement": false,
  "Live Reloading": false,
  Progress: false,
  Overlay: false
};
if (parsedResourceQuery.hot === "true") {
  options.hot = true;
  enabledFeatures["Hot Module Replacement"] = true;
}
if (parsedResourceQuery["live-reload"] === "true") {
  options.liveReload = true;
  enabledFeatures["Live Reloading"] = true;
}
if (parsedResourceQuery.progress === "true") {
  options.progress = true;
  enabledFeatures.Progress = true;
}
if (parsedResourceQuery.overlay) {
  try {
    options.overlay = JSON.parse(parsedResourceQuery.overlay);
  } catch (e) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.error("Error parsing overlay options from resource query:", e);
  }

  // Fill in default "true" params for partially-specified objects.
  if (typeof options.overlay === "object") {
    options.overlay = _objectSpread({
      errors: true,
      warnings: true,
      runtimeErrors: true
    }, options.overlay);
    decodeOverlayOptions(options.overlay);
  }
  enabledFeatures.Overlay = true;
}
if (parsedResourceQuery.logging) {
  options.logging = parsedResourceQuery.logging;
}
if (typeof parsedResourceQuery.reconnect !== "undefined") {
  options.reconnect = Number(parsedResourceQuery.reconnect);
}

/**
 * @param {string} level
 */
function setAllLogLevel(level) {
  // This is needed because the HMR logger operate separately from dev server logger
  webpack_hot_log_js__WEBPACK_IMPORTED_MODULE_0___default().setLogLevel(level === "verbose" || level === "log" ? "info" : level);
  (0,_utils_log_js__WEBPACK_IMPORTED_MODULE_5__.setLogLevel)(level);
}
if (options.logging) {
  setAllLogLevel(options.logging);
}
(0,_utils_log_js__WEBPACK_IMPORTED_MODULE_5__.logEnabledFeatures)(enabledFeatures);
self.addEventListener("beforeunload", function () {
  status.isUnloading = true;
});
var overlay = typeof window !== "undefined" ? (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.createOverlay)(typeof options.overlay === "object" ? {
  trustedTypesPolicyName: options.overlay.trustedTypesPolicyName,
  catchRuntimeError: options.overlay.runtimeErrors
} : {
  trustedTypesPolicyName: false,
  catchRuntimeError: options.overlay
}) : {
  send: function send() {}
};
var onSocketMessage = {
  hot: function hot() {
    if (parsedResourceQuery.hot === "false") {
      return;
    }
    options.hot = true;
  },
  liveReload: function liveReload() {
    if (parsedResourceQuery["live-reload"] === "false") {
      return;
    }
    options.liveReload = true;
  },
  invalid: function invalid() {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("App updated. Recompiling...");

    // Fixes #1042. overlay doesn't clear if errors are fixed but warnings remain.
    if (options.overlay) {
      overlay.send({
        type: "DISMISS"
      });
    }
    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Invalid");
  },
  /**
   * @param {string} hash
   */
  hash: function hash(_hash) {
    status.previousHash = status.currentHash;
    status.currentHash = _hash;
  },
  logging: setAllLogLevel,
  /**
   * @param {boolean} value
   */
  overlay: function overlay(value) {
    if (typeof document === "undefined") {
      return;
    }
    options.overlay = value;
    decodeOverlayOptions(options.overlay);
  },
  /**
   * @param {number} value
   */
  reconnect: function reconnect(value) {
    if (parsedResourceQuery.reconnect === "false") {
      return;
    }
    options.reconnect = value;
  },
  /**
   * @param {boolean} value
   */
  progress: function progress(value) {
    options.progress = value;
  },
  /**
   * @param {{ pluginName?: string, percent: number, msg: string }} data
   */
  "progress-update": function progressUpdate(data) {
    if (options.progress) {
      _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("".concat(data.pluginName ? "[".concat(data.pluginName, "] ") : "").concat(data.percent, "% - ").concat(data.msg, "."));
    }
    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Progress", data);
  },
  "still-ok": function stillOk() {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("Nothing changed.");
    if (options.overlay) {
      overlay.send({
        type: "DISMISS"
      });
    }
    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("StillOk");
  },
  ok: function ok() {
    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Ok");
    if (options.overlay) {
      overlay.send({
        type: "DISMISS"
      });
    }
    (0,_utils_reloadApp_js__WEBPACK_IMPORTED_MODULE_7__["default"])(options, status);
  },
  // TODO: remove in v5 in favor of 'static-changed'
  /**
   * @param {string} file
   */
  "content-changed": function contentChanged(file) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("".concat(file ? "\"".concat(file, "\"") : "Content", " from static directory was changed. Reloading..."));
    self.location.reload();
  },
  /**
   * @param {string} file
   */
  "static-changed": function staticChanged(file) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("".concat(file ? "\"".concat(file, "\"") : "Content", " from static directory was changed. Reloading..."));
    self.location.reload();
  },
  /**
   * @param {Error[]} warnings
   * @param {any} params
   */
  warnings: function warnings(_warnings, params) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.warn("Warnings while compiling.");
    var printableWarnings = _warnings.map(function (error) {
      var _formatProblem = (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.formatProblem)("warning", error),
        header = _formatProblem.header,
        body = _formatProblem.body;
      return "".concat(header, "\n").concat((0,_utils_stripAnsi_js__WEBPACK_IMPORTED_MODULE_1__["default"])(body));
    });
    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Warnings", printableWarnings);
    for (var i = 0; i < printableWarnings.length; i++) {
      _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.warn(printableWarnings[i]);
    }
    var overlayWarningsSetting = typeof options.overlay === "boolean" ? options.overlay : options.overlay && options.overlay.warnings;
    if (overlayWarningsSetting) {
      var warningsToDisplay = typeof overlayWarningsSetting === "function" ? _warnings.filter(overlayWarningsSetting) : _warnings;
      if (warningsToDisplay.length) {
        overlay.send({
          type: "BUILD_ERROR",
          level: "warning",
          messages: _warnings
        });
      }
    }
    if (params && params.preventReloading) {
      return;
    }
    (0,_utils_reloadApp_js__WEBPACK_IMPORTED_MODULE_7__["default"])(options, status);
  },
  /**
   * @param {Error[]} errors
   */
  errors: function errors(_errors) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.error("Errors while compiling. Reload prevented.");
    var printableErrors = _errors.map(function (error) {
      var _formatProblem2 = (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.formatProblem)("error", error),
        header = _formatProblem2.header,
        body = _formatProblem2.body;
      return "".concat(header, "\n").concat((0,_utils_stripAnsi_js__WEBPACK_IMPORTED_MODULE_1__["default"])(body));
    });
    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Errors", printableErrors);
    for (var i = 0; i < printableErrors.length; i++) {
      _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.error(printableErrors[i]);
    }
    var overlayErrorsSettings = typeof options.overlay === "boolean" ? options.overlay : options.overlay && options.overlay.errors;
    if (overlayErrorsSettings) {
      var errorsToDisplay = typeof overlayErrorsSettings === "function" ? _errors.filter(overlayErrorsSettings) : _errors;
      if (errorsToDisplay.length) {
        overlay.send({
          type: "BUILD_ERROR",
          level: "error",
          messages: _errors
        });
      }
    }
  },
  /**
   * @param {Error} error
   */
  error: function error(_error) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.error(_error);
  },
  close: function close() {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("Disconnected!");
    if (options.overlay) {
      overlay.send({
        type: "DISMISS"
      });
    }
    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Close");
  }
};
var socketURL = (0,_utils_createSocketURL_js__WEBPACK_IMPORTED_MODULE_8__["default"])(parsedResourceQuery);
(0,_socket_js__WEBPACK_IMPORTED_MODULE_3__["default"])(socketURL, onSocketMessage, options.reconnect);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/modules/logger/index.js":
/*!************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/modules/logger/index.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

/******/(function () {
  // webpackBootstrap
  /******/
  "use strict";

  /******/
  var __webpack_modules__ = {
    /***/"./client-src/modules/logger/SyncBailHookFake.js": (
    /*!*******************************************************!*\
      !*** ./client-src/modules/logger/SyncBailHookFake.js ***!
      \*******************************************************/
    /***/
    function (module) {
      /**
       * Client stub for tapable SyncBailHook
       */
      module.exports = function clientTapableSyncBailHook() {
        return {
          call: function call() {}
        };
      };

      /***/
    }),
    /***/"./node_modules/webpack/lib/logging/Logger.js": (
    /*!****************************************************!*\
      !*** ./node_modules/webpack/lib/logging/Logger.js ***!
      \****************************************************/
    /***/
    function (__unused_webpack_module, exports) {
      /*
      	MIT License http://www.opensource.org/licenses/mit-license.php
      	Author Tobias Koppers @sokra
      */

      function _toConsumableArray(arr) {
        return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
      }
      function _nonIterableSpread() {
        throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      function _unsupportedIterableToArray(o, minLen) {
        if (!o) return;
        if (typeof o === "string") return _arrayLikeToArray(o, minLen);
        var n = Object.prototype.toString.call(o).slice(8, -1);
        if (n === "Object" && o.constructor) n = o.constructor.name;
        if (n === "Map" || n === "Set") return Array.from(o);
        if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
      }
      function _iterableToArray(iter) {
        if (typeof (typeof Symbol !== "undefined" ? Symbol : function (i) {
          return i;
        }) !== "undefined" && iter[(typeof Symbol !== "undefined" ? Symbol : function (i) {
          return i;
        }).iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
      }
      function _arrayWithoutHoles(arr) {
        if (Array.isArray(arr)) return _arrayLikeToArray(arr);
      }
      function _arrayLikeToArray(arr, len) {
        if (len == null || len > arr.length) len = arr.length;
        for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
        return arr2;
      }
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
        }
      }
      function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps) _defineProperties(Constructor.prototype, protoProps);
        if (staticProps) _defineProperties(Constructor, staticProps);
        Object.defineProperty(Constructor, "prototype", {
          writable: false
        });
        return Constructor;
      }
      function _toPropertyKey(arg) {
        var key = _toPrimitive(arg, "string");
        return typeof key === "symbol" ? key : String(key);
      }
      function _toPrimitive(input, hint) {
        if (typeof input !== "object" || input === null) return input;
        var prim = input[(typeof Symbol !== "undefined" ? Symbol : function (i) {
          return i;
        }).toPrimitive];
        if (prim !== undefined) {
          var res = prim.call(input, hint || "default");
          if (typeof res !== "object") return res;
          throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return (hint === "string" ? String : Number)(input);
      }
      var LogType = Object.freeze({
        error: /** @type {"error"} */"error",
        // message, c style arguments
        warn: /** @type {"warn"} */"warn",
        // message, c style arguments
        info: /** @type {"info"} */"info",
        // message, c style arguments
        log: /** @type {"log"} */"log",
        // message, c style arguments
        debug: /** @type {"debug"} */"debug",
        // message, c style arguments

        trace: /** @type {"trace"} */"trace",
        // no arguments

        group: /** @type {"group"} */"group",
        // [label]
        groupCollapsed: /** @type {"groupCollapsed"} */"groupCollapsed",
        // [label]
        groupEnd: /** @type {"groupEnd"} */"groupEnd",
        // [label]

        profile: /** @type {"profile"} */"profile",
        // [profileName]
        profileEnd: /** @type {"profileEnd"} */"profileEnd",
        // [profileName]

        time: /** @type {"time"} */"time",
        // name, time as [seconds, nanoseconds]

        clear: /** @type {"clear"} */"clear",
        // no arguments
        status: /** @type {"status"} */"status" // message, arguments
      });
      exports.LogType = LogType;

      /** @typedef {typeof LogType[keyof typeof LogType]} LogTypeEnum */

      var LOG_SYMBOL = (typeof Symbol !== "undefined" ? Symbol : function (i) {
        return i;
      })("webpack logger raw log method");
      var TIMERS_SYMBOL = (typeof Symbol !== "undefined" ? Symbol : function (i) {
        return i;
      })("webpack logger times");
      var TIMERS_AGGREGATES_SYMBOL = (typeof Symbol !== "undefined" ? Symbol : function (i) {
        return i;
      })("webpack logger aggregated times");
      var WebpackLogger = /*#__PURE__*/function () {
        /**
         * @param {function(LogTypeEnum, any[]=): void} log log function
         * @param {function(string | function(): string): WebpackLogger} getChildLogger function to create child logger
         */
        function WebpackLogger(log, getChildLogger) {
          _classCallCheck(this, WebpackLogger);
          this[LOG_SYMBOL] = log;
          this.getChildLogger = getChildLogger;
        }
        _createClass(WebpackLogger, [{
          key: "error",
          value: function error() {
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }
            this[LOG_SYMBOL](LogType.error, args);
          }
        }, {
          key: "warn",
          value: function warn() {
            for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
              args[_key2] = arguments[_key2];
            }
            this[LOG_SYMBOL](LogType.warn, args);
          }
        }, {
          key: "info",
          value: function info() {
            for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
              args[_key3] = arguments[_key3];
            }
            this[LOG_SYMBOL](LogType.info, args);
          }
        }, {
          key: "log",
          value: function log() {
            for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
              args[_key4] = arguments[_key4];
            }
            this[LOG_SYMBOL](LogType.log, args);
          }
        }, {
          key: "debug",
          value: function debug() {
            for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
              args[_key5] = arguments[_key5];
            }
            this[LOG_SYMBOL](LogType.debug, args);
          }
        }, {
          key: "assert",
          value: function assert(assertion) {
            if (!assertion) {
              for (var _len6 = arguments.length, args = new Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
                args[_key6 - 1] = arguments[_key6];
              }
              this[LOG_SYMBOL](LogType.error, args);
            }
          }
        }, {
          key: "trace",
          value: function trace() {
            this[LOG_SYMBOL](LogType.trace, ["Trace"]);
          }
        }, {
          key: "clear",
          value: function clear() {
            this[LOG_SYMBOL](LogType.clear);
          }
        }, {
          key: "status",
          value: function status() {
            for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
              args[_key7] = arguments[_key7];
            }
            this[LOG_SYMBOL](LogType.status, args);
          }
        }, {
          key: "group",
          value: function group() {
            for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
              args[_key8] = arguments[_key8];
            }
            this[LOG_SYMBOL](LogType.group, args);
          }
        }, {
          key: "groupCollapsed",
          value: function groupCollapsed() {
            for (var _len9 = arguments.length, args = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
              args[_key9] = arguments[_key9];
            }
            this[LOG_SYMBOL](LogType.groupCollapsed, args);
          }
        }, {
          key: "groupEnd",
          value: function groupEnd() {
            for (var _len10 = arguments.length, args = new Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
              args[_key10] = arguments[_key10];
            }
            this[LOG_SYMBOL](LogType.groupEnd, args);
          }
        }, {
          key: "profile",
          value: function profile(label) {
            this[LOG_SYMBOL](LogType.profile, [label]);
          }
        }, {
          key: "profileEnd",
          value: function profileEnd(label) {
            this[LOG_SYMBOL](LogType.profileEnd, [label]);
          }
        }, {
          key: "time",
          value: function time(label) {
            this[TIMERS_SYMBOL] = this[TIMERS_SYMBOL] || new Map();
            this[TIMERS_SYMBOL].set(label, process.hrtime());
          }
        }, {
          key: "timeLog",
          value: function timeLog(label) {
            var prev = this[TIMERS_SYMBOL] && this[TIMERS_SYMBOL].get(label);
            if (!prev) {
              throw new Error("No such label '".concat(label, "' for WebpackLogger.timeLog()"));
            }
            var time = process.hrtime(prev);
            this[LOG_SYMBOL](LogType.time, [label].concat(_toConsumableArray(time)));
          }
        }, {
          key: "timeEnd",
          value: function timeEnd(label) {
            var prev = this[TIMERS_SYMBOL] && this[TIMERS_SYMBOL].get(label);
            if (!prev) {
              throw new Error("No such label '".concat(label, "' for WebpackLogger.timeEnd()"));
            }
            var time = process.hrtime(prev);
            this[TIMERS_SYMBOL].delete(label);
            this[LOG_SYMBOL](LogType.time, [label].concat(_toConsumableArray(time)));
          }
        }, {
          key: "timeAggregate",
          value: function timeAggregate(label) {
            var prev = this[TIMERS_SYMBOL] && this[TIMERS_SYMBOL].get(label);
            if (!prev) {
              throw new Error("No such label '".concat(label, "' for WebpackLogger.timeAggregate()"));
            }
            var time = process.hrtime(prev);
            this[TIMERS_SYMBOL].delete(label);
            this[TIMERS_AGGREGATES_SYMBOL] = this[TIMERS_AGGREGATES_SYMBOL] || new Map();
            var current = this[TIMERS_AGGREGATES_SYMBOL].get(label);
            if (current !== undefined) {
              if (time[1] + current[1] > 1e9) {
                time[0] += current[0] + 1;
                time[1] = time[1] - 1e9 + current[1];
              } else {
                time[0] += current[0];
                time[1] += current[1];
              }
            }
            this[TIMERS_AGGREGATES_SYMBOL].set(label, time);
          }
        }, {
          key: "timeAggregateEnd",
          value: function timeAggregateEnd(label) {
            if (this[TIMERS_AGGREGATES_SYMBOL] === undefined) return;
            var time = this[TIMERS_AGGREGATES_SYMBOL].get(label);
            if (time === undefined) return;
            this[TIMERS_AGGREGATES_SYMBOL].delete(label);
            this[LOG_SYMBOL](LogType.time, [label].concat(_toConsumableArray(time)));
          }
        }]);
        return WebpackLogger;
      }();
      exports.Logger = WebpackLogger;

      /***/
    }),
    /***/"./node_modules/webpack/lib/logging/createConsoleLogger.js": (
    /*!*****************************************************************!*\
      !*** ./node_modules/webpack/lib/logging/createConsoleLogger.js ***!
      \*****************************************************************/
    /***/
    function (module, __unused_webpack_exports, __nested_webpack_require_13160__) {
      /*
      	MIT License http://www.opensource.org/licenses/mit-license.php
      	Author Tobias Koppers @sokra
      */

      function _toConsumableArray(arr) {
        return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
      }
      function _nonIterableSpread() {
        throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      function _unsupportedIterableToArray(o, minLen) {
        if (!o) return;
        if (typeof o === "string") return _arrayLikeToArray(o, minLen);
        var n = Object.prototype.toString.call(o).slice(8, -1);
        if (n === "Object" && o.constructor) n = o.constructor.name;
        if (n === "Map" || n === "Set") return Array.from(o);
        if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
      }
      function _iterableToArray(iter) {
        if (typeof (typeof Symbol !== "undefined" ? Symbol : function (i) {
          return i;
        }) !== "undefined" && iter[(typeof Symbol !== "undefined" ? Symbol : function (i) {
          return i;
        }).iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
      }
      function _arrayWithoutHoles(arr) {
        if (Array.isArray(arr)) return _arrayLikeToArray(arr);
      }
      function _arrayLikeToArray(arr, len) {
        if (len == null || len > arr.length) len = arr.length;
        for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
        return arr2;
      }
      var _require = __nested_webpack_require_13160__( /*! ./Logger */"./node_modules/webpack/lib/logging/Logger.js"),
        LogType = _require.LogType;

      /** @typedef {import("../../declarations/WebpackOptions").FilterItemTypes} FilterItemTypes */
      /** @typedef {import("../../declarations/WebpackOptions").FilterTypes} FilterTypes */
      /** @typedef {import("./Logger").LogTypeEnum} LogTypeEnum */

      /** @typedef {function(string): boolean} FilterFunction */

      /**
       * @typedef {Object} LoggerConsole
       * @property {function(): void} clear
       * @property {function(): void} trace
       * @property {(...args: any[]) => void} info
       * @property {(...args: any[]) => void} log
       * @property {(...args: any[]) => void} warn
       * @property {(...args: any[]) => void} error
       * @property {(...args: any[]) => void=} debug
       * @property {(...args: any[]) => void=} group
       * @property {(...args: any[]) => void=} groupCollapsed
       * @property {(...args: any[]) => void=} groupEnd
       * @property {(...args: any[]) => void=} status
       * @property {(...args: any[]) => void=} profile
       * @property {(...args: any[]) => void=} profileEnd
       * @property {(...args: any[]) => void=} logTime
       */

      /**
       * @typedef {Object} LoggerOptions
       * @property {false|true|"none"|"error"|"warn"|"info"|"log"|"verbose"} level loglevel
       * @property {FilterTypes|boolean} debug filter for debug logging
       * @property {LoggerConsole} console the console to log to
       */

      /**
       * @param {FilterItemTypes} item an input item
       * @returns {FilterFunction} filter function
       */
      var filterToFunction = function filterToFunction(item) {
        if (typeof item === "string") {
          var regExp = new RegExp("[\\\\/]".concat(item.replace(
          // eslint-disable-next-line no-useless-escape
          /[-[\]{}()*+?.\\^$|]/g, "\\$&"), "([\\\\/]|$|!|\\?)"));
          return function (ident) {
            return regExp.test(ident);
          };
        }
        if (item && typeof item === "object" && typeof item.test === "function") {
          return function (ident) {
            return item.test(ident);
          };
        }
        if (typeof item === "function") {
          return item;
        }
        if (typeof item === "boolean") {
          return function () {
            return item;
          };
        }
      };

      /**
       * @enum {number}
       */
      var LogLevel = {
        none: 6,
        false: 6,
        error: 5,
        warn: 4,
        info: 3,
        log: 2,
        true: 2,
        verbose: 1
      };

      /**
       * @param {LoggerOptions} options options object
       * @returns {function(string, LogTypeEnum, any[]): void} logging function
       */
      module.exports = function (_ref) {
        var _ref$level = _ref.level,
          level = _ref$level === void 0 ? "info" : _ref$level,
          _ref$debug = _ref.debug,
          debug = _ref$debug === void 0 ? false : _ref$debug,
          console = _ref.console;
        var debugFilters = typeof debug === "boolean" ? [function () {
          return debug;
        }] : /** @type {FilterItemTypes[]} */[].concat(debug).map(filterToFunction);
        /** @type {number} */
        var loglevel = LogLevel["".concat(level)] || 0;

        /**
         * @param {string} name name of the logger
         * @param {LogTypeEnum} type type of the log entry
         * @param {any[]} args arguments of the log entry
         * @returns {void}
         */
        var logger = function logger(name, type, args) {
          var labeledArgs = function labeledArgs() {
            if (Array.isArray(args)) {
              if (args.length > 0 && typeof args[0] === "string") {
                return ["[".concat(name, "] ").concat(args[0])].concat(_toConsumableArray(args.slice(1)));
              } else {
                return ["[".concat(name, "]")].concat(_toConsumableArray(args));
              }
            } else {
              return [];
            }
          };
          var debug = debugFilters.some(function (f) {
            return f(name);
          });
          switch (type) {
            case LogType.debug:
              if (!debug) return;
              // eslint-disable-next-line node/no-unsupported-features/node-builtins
              if (typeof console.debug === "function") {
                // eslint-disable-next-line node/no-unsupported-features/node-builtins
                console.debug.apply(console, _toConsumableArray(labeledArgs()));
              } else {
                console.log.apply(console, _toConsumableArray(labeledArgs()));
              }
              break;
            case LogType.log:
              if (!debug && loglevel > LogLevel.log) return;
              console.log.apply(console, _toConsumableArray(labeledArgs()));
              break;
            case LogType.info:
              if (!debug && loglevel > LogLevel.info) return;
              console.info.apply(console, _toConsumableArray(labeledArgs()));
              break;
            case LogType.warn:
              if (!debug && loglevel > LogLevel.warn) return;
              console.warn.apply(console, _toConsumableArray(labeledArgs()));
              break;
            case LogType.error:
              if (!debug && loglevel > LogLevel.error) return;
              console.error.apply(console, _toConsumableArray(labeledArgs()));
              break;
            case LogType.trace:
              if (!debug) return;
              console.trace();
              break;
            case LogType.groupCollapsed:
              if (!debug && loglevel > LogLevel.log) return;
              if (!debug && loglevel > LogLevel.verbose) {
                // eslint-disable-next-line node/no-unsupported-features/node-builtins
                if (typeof console.groupCollapsed === "function") {
                  // eslint-disable-next-line node/no-unsupported-features/node-builtins
                  console.groupCollapsed.apply(console, _toConsumableArray(labeledArgs()));
                } else {
                  console.log.apply(console, _toConsumableArray(labeledArgs()));
                }
                break;
              }
            // falls through
            case LogType.group:
              if (!debug && loglevel > LogLevel.log) return;
              // eslint-disable-next-line node/no-unsupported-features/node-builtins
              if (typeof console.group === "function") {
                // eslint-disable-next-line node/no-unsupported-features/node-builtins
                console.group.apply(console, _toConsumableArray(labeledArgs()));
              } else {
                console.log.apply(console, _toConsumableArray(labeledArgs()));
              }
              break;
            case LogType.groupEnd:
              if (!debug && loglevel > LogLevel.log) return;
              // eslint-disable-next-line node/no-unsupported-features/node-builtins
              if (typeof console.groupEnd === "function") {
                // eslint-disable-next-line node/no-unsupported-features/node-builtins
                console.groupEnd();
              }
              break;
            case LogType.time:
              {
                if (!debug && loglevel > LogLevel.log) return;
                var ms = args[1] * 1000 + args[2] / 1000000;
                var msg = "[".concat(name, "] ").concat(args[0], ": ").concat(ms, " ms");
                if (typeof console.logTime === "function") {
                  console.logTime(msg);
                } else {
                  console.log(msg);
                }
                break;
              }
            case LogType.profile:
              // eslint-disable-next-line node/no-unsupported-features/node-builtins
              if (typeof console.profile === "function") {
                // eslint-disable-next-line node/no-unsupported-features/node-builtins
                console.profile.apply(console, _toConsumableArray(labeledArgs()));
              }
              break;
            case LogType.profileEnd:
              // eslint-disable-next-line node/no-unsupported-features/node-builtins
              if (typeof console.profileEnd === "function") {
                // eslint-disable-next-line node/no-unsupported-features/node-builtins
                console.profileEnd.apply(console, _toConsumableArray(labeledArgs()));
              }
              break;
            case LogType.clear:
              if (!debug && loglevel > LogLevel.log) return;
              // eslint-disable-next-line node/no-unsupported-features/node-builtins
              if (typeof console.clear === "function") {
                // eslint-disable-next-line node/no-unsupported-features/node-builtins
                console.clear();
              }
              break;
            case LogType.status:
              if (!debug && loglevel > LogLevel.info) return;
              if (typeof console.status === "function") {
                if (args.length === 0) {
                  console.status();
                } else {
                  console.status.apply(console, _toConsumableArray(labeledArgs()));
                }
              } else {
                if (args.length !== 0) {
                  console.info.apply(console, _toConsumableArray(labeledArgs()));
                }
              }
              break;
            default:
              throw new Error("Unexpected LogType ".concat(type));
          }
        };
        return logger;
      };

      /***/
    }),
    /***/"./node_modules/webpack/lib/logging/runtime.js": (
    /*!*****************************************************!*\
      !*** ./node_modules/webpack/lib/logging/runtime.js ***!
      \*****************************************************/
    /***/
    function (__unused_webpack_module, exports, __nested_webpack_require_24776__) {
      /*
      	MIT License http://www.opensource.org/licenses/mit-license.php
      	Author Tobias Koppers @sokra
      */

      function _extends() {
        _extends = Object.assign ? Object.assign.bind() : function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }
          return target;
        };
        return _extends.apply(this, arguments);
      }
      var SyncBailHook = __nested_webpack_require_24776__( /*! tapable/lib/SyncBailHook */"./client-src/modules/logger/SyncBailHookFake.js");
      var _require = __nested_webpack_require_24776__( /*! ./Logger */"./node_modules/webpack/lib/logging/Logger.js"),
        Logger = _require.Logger;
      var createConsoleLogger = __nested_webpack_require_24776__( /*! ./createConsoleLogger */"./node_modules/webpack/lib/logging/createConsoleLogger.js");

      /** @type {createConsoleLogger.LoggerOptions} */
      var currentDefaultLoggerOptions = {
        level: "info",
        debug: false,
        console: console
      };
      var currentDefaultLogger = createConsoleLogger(currentDefaultLoggerOptions);

      /**
       * @param {string} name name of the logger
       * @returns {Logger} a logger
       */
      exports.getLogger = function (name) {
        return new Logger(function (type, args) {
          if (exports.hooks.log.call(name, type, args) === undefined) {
            currentDefaultLogger(name, type, args);
          }
        }, function (childName) {
          return exports.getLogger("".concat(name, "/").concat(childName));
        });
      };

      /**
       * @param {createConsoleLogger.LoggerOptions} options new options, merge with old options
       * @returns {void}
       */
      exports.configureDefaultLogger = function (options) {
        _extends(currentDefaultLoggerOptions, options);
        currentDefaultLogger = createConsoleLogger(currentDefaultLoggerOptions);
      };
      exports.hooks = {
        log: new SyncBailHook(["origin", "type", "args"])
      };

      /***/
    })

    /******/
  };
  /************************************************************************/
  /******/ // The module cache
  /******/
  var __webpack_module_cache__ = {};
  /******/
  /******/ // The require function
  /******/
  function __nested_webpack_require_27242__(moduleId) {
    /******/ // Check if module is in cache
    /******/var cachedModule = __webpack_module_cache__[moduleId];
    /******/
    if (cachedModule !== undefined) {
      /******/return cachedModule.exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/
    var module = __webpack_module_cache__[moduleId] = {
      /******/ // no module.id needed
      /******/ // no module.loaded needed
      /******/exports: {}
      /******/
    };
    /******/
    /******/ // Execute the module function
    /******/
    __webpack_modules__[moduleId](module, module.exports, __nested_webpack_require_27242__);
    /******/
    /******/ // Return the exports of the module
    /******/
    return module.exports;
    /******/
  }
  /******/
  /************************************************************************/
  /******/ /* webpack/runtime/define property getters */
  /******/
  !function () {
    /******/ // define getter functions for harmony exports
    /******/__nested_webpack_require_27242__.d = function (exports, definition) {
      /******/for (var key in definition) {
        /******/if (__nested_webpack_require_27242__.o(definition, key) && !__nested_webpack_require_27242__.o(exports, key)) {
          /******/Object.defineProperty(exports, key, {
            enumerable: true,
            get: definition[key]
          });
          /******/
        }
        /******/
      }
      /******/
    };
    /******/
  }();
  /******/
  /******/ /* webpack/runtime/hasOwnProperty shorthand */
  /******/
  !function () {
    /******/__nested_webpack_require_27242__.o = function (obj, prop) {
      return Object.prototype.hasOwnProperty.call(obj, prop);
    };
    /******/
  }();
  /******/
  /******/ /* webpack/runtime/make namespace object */
  /******/
  !function () {
    /******/ // define __esModule on exports
    /******/__nested_webpack_require_27242__.r = function (exports) {
      /******/if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
        /******/Object.defineProperty(exports, Symbol.toStringTag, {
          value: 'Module'
        });
        /******/
      }
      /******/
      Object.defineProperty(exports, '__esModule', {
        value: true
      });
      /******/
    };
    /******/
  }();
  /******/
  /************************************************************************/
  var __nested_webpack_exports__ = {};
  // This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
  !function () {
    /*!********************************************!*\
      !*** ./client-src/modules/logger/index.js ***!
      \********************************************/
    __nested_webpack_require_27242__.r(__nested_webpack_exports__);
    /* harmony export */
    __nested_webpack_require_27242__.d(__nested_webpack_exports__, {
      /* harmony export */"default": function () {
        return /* reexport default export from named module */webpack_lib_logging_runtime_js__WEBPACK_IMPORTED_MODULE_0__;
      }
      /* harmony export */
    });
    /* harmony import */
    var webpack_lib_logging_runtime_js__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_27242__( /*! webpack/lib/logging/runtime.js */"./node_modules/webpack/lib/logging/runtime.js");
  }();
  var __webpack_export_target__ = exports;
  for (var i in __nested_webpack_exports__) __webpack_export_target__[i] = __nested_webpack_exports__[i];
  if (__nested_webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", {
    value: true
  });
  /******/
})();

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/overlay.js":
/*!***********************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/overlay.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createOverlay: () => (/* binding */ createOverlay),
/* harmony export */   formatProblem: () => (/* binding */ formatProblem)
/* harmony export */ });
/* harmony import */ var ansi_html_community__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ansi-html-community */ "./node_modules/ansi-html-community/index.js");
/* harmony import */ var ansi_html_community__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ansi_html_community__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var html_entities__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! html-entities */ "./node_modules/html-entities/lib/index.js");
/* harmony import */ var html_entities__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(html_entities__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _overlay_runtime_error_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./overlay/runtime-error.js */ "./node_modules/webpack-dev-server/client/overlay/runtime-error.js");
/* harmony import */ var _overlay_state_machine_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./overlay/state-machine.js */ "./node_modules/webpack-dev-server/client/overlay/state-machine.js");
/* harmony import */ var _overlay_styles_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./overlay/styles.js */ "./node_modules/webpack-dev-server/client/overlay/styles.js");
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
// The error overlay is inspired (and mostly copied) from Create React App (https://github.com/facebookincubator/create-react-app)
// They, in turn, got inspired by webpack-hot-middleware (https://github.com/glenjamin/webpack-hot-middleware).






var colors = {
  reset: ["transparent", "transparent"],
  black: "181818",
  red: "E36049",
  green: "B3CB74",
  yellow: "FFD080",
  blue: "7CAFC2",
  magenta: "7FACCA",
  cyan: "C3C2EF",
  lightgrey: "EBE7E3",
  darkgrey: "6D7891"
};
ansi_html_community__WEBPACK_IMPORTED_MODULE_0___default().setColors(colors);

/**
 * @param {string} type
 * @param {string  | { file?: string, moduleName?: string, loc?: string, message?: string; stack?: string[] }} item
 * @returns {{ header: string, body: string }}
 */
function formatProblem(type, item) {
  var header = type === "warning" ? "WARNING" : "ERROR";
  var body = "";
  if (typeof item === "string") {
    body += item;
  } else {
    var file = item.file || "";
    // eslint-disable-next-line no-nested-ternary
    var moduleName = item.moduleName ? item.moduleName.indexOf("!") !== -1 ? "".concat(item.moduleName.replace(/^(\s|\S)*!/, ""), " (").concat(item.moduleName, ")") : "".concat(item.moduleName) : "";
    var loc = item.loc;
    header += "".concat(moduleName || file ? " in ".concat(moduleName ? "".concat(moduleName).concat(file ? " (".concat(file, ")") : "") : file).concat(loc ? " ".concat(loc) : "") : "");
    body += item.message || "";
  }
  if (Array.isArray(item.stack)) {
    item.stack.forEach(function (stack) {
      if (typeof stack === "string") {
        body += "\r\n".concat(stack);
      }
    });
  }
  return {
    header: header,
    body: body
  };
}

/**
 * @typedef {Object} CreateOverlayOptions
 * @property {string | null} trustedTypesPolicyName
 * @property {boolean | (error: Error) => void} [catchRuntimeError]
 */

/**
 *
 * @param {CreateOverlayOptions} options
 */
var createOverlay = function createOverlay(options) {
  /** @type {HTMLIFrameElement | null | undefined} */
  var iframeContainerElement;
  /** @type {HTMLDivElement | null | undefined} */
  var containerElement;
  /** @type {HTMLDivElement | null | undefined} */
  var headerElement;
  /** @type {Array<(element: HTMLDivElement) => void>} */
  var onLoadQueue = [];
  /** @type {TrustedTypePolicy | undefined} */
  var overlayTrustedTypesPolicy;

  /**
   *
   * @param {HTMLElement} element
   * @param {CSSStyleDeclaration} style
   */
  function applyStyle(element, style) {
    Object.keys(style).forEach(function (prop) {
      element.style[prop] = style[prop];
    });
  }

  /**
   * @param {string | null} trustedTypesPolicyName
   */
  function createContainer(trustedTypesPolicyName) {
    // Enable Trusted Types if they are available in the current browser.
    if (window.trustedTypes) {
      overlayTrustedTypesPolicy = window.trustedTypes.createPolicy(trustedTypesPolicyName || "webpack-dev-server#overlay", {
        createHTML: function createHTML(value) {
          return value;
        }
      });
    }
    iframeContainerElement = document.createElement("iframe");
    iframeContainerElement.id = "webpack-dev-server-client-overlay";
    iframeContainerElement.src = "about:blank";
    applyStyle(iframeContainerElement, _overlay_styles_js__WEBPACK_IMPORTED_MODULE_3__.iframeStyle);
    iframeContainerElement.onload = function () {
      var contentElement = /** @type {Document} */
      /** @type {HTMLIFrameElement} */
      iframeContainerElement.contentDocument.createElement("div");
      containerElement = /** @type {Document} */
      /** @type {HTMLIFrameElement} */
      iframeContainerElement.contentDocument.createElement("div");
      contentElement.id = "webpack-dev-server-client-overlay-div";
      applyStyle(contentElement, _overlay_styles_js__WEBPACK_IMPORTED_MODULE_3__.containerStyle);
      headerElement = document.createElement("div");
      headerElement.innerText = "Compiled with problems:";
      applyStyle(headerElement, _overlay_styles_js__WEBPACK_IMPORTED_MODULE_3__.headerStyle);
      var closeButtonElement = document.createElement("button");
      applyStyle(closeButtonElement, _overlay_styles_js__WEBPACK_IMPORTED_MODULE_3__.dismissButtonStyle);
      closeButtonElement.innerText = "×";
      closeButtonElement.ariaLabel = "Dismiss";
      closeButtonElement.addEventListener("click", function () {
        // eslint-disable-next-line no-use-before-define
        overlayService.send({
          type: "DISMISS"
        });
      });
      contentElement.appendChild(headerElement);
      contentElement.appendChild(closeButtonElement);
      contentElement.appendChild(containerElement);

      /** @type {Document} */
      /** @type {HTMLIFrameElement} */
      iframeContainerElement.contentDocument.body.appendChild(contentElement);
      onLoadQueue.forEach(function (onLoad) {
        onLoad( /** @type {HTMLDivElement} */contentElement);
      });
      onLoadQueue = [];

      /** @type {HTMLIFrameElement} */
      iframeContainerElement.onload = null;
    };
    document.body.appendChild(iframeContainerElement);
  }

  /**
   * @param {(element: HTMLDivElement) => void} callback
   * @param {string | null} trustedTypesPolicyName
   */
  function ensureOverlayExists(callback, trustedTypesPolicyName) {
    if (containerElement) {
      containerElement.innerHTML = "";
      // Everything is ready, call the callback right away.
      callback(containerElement);
      return;
    }
    onLoadQueue.push(callback);
    if (iframeContainerElement) {
      return;
    }
    createContainer(trustedTypesPolicyName);
  }

  // Successful compilation.
  function hide() {
    if (!iframeContainerElement) {
      return;
    }

    // Clean up and reset internal state.
    document.body.removeChild(iframeContainerElement);
    iframeContainerElement = null;
    containerElement = null;
  }

  // Compilation with errors (e.g. syntax error or missing modules).
  /**
   * @param {string} type
   * @param {Array<string  | { moduleIdentifier?: string, moduleName?: string, loc?: string, message?: string }>} messages
   * @param {string | null} trustedTypesPolicyName
   * @param {'build' | 'runtime'} messageSource
   */
  function show(type, messages, trustedTypesPolicyName, messageSource) {
    ensureOverlayExists(function () {
      headerElement.innerText = messageSource === "runtime" ? "Uncaught runtime errors:" : "Compiled with problems:";
      messages.forEach(function (message) {
        var entryElement = document.createElement("div");
        var msgStyle = type === "warning" ? _overlay_styles_js__WEBPACK_IMPORTED_MODULE_3__.msgStyles.warning : _overlay_styles_js__WEBPACK_IMPORTED_MODULE_3__.msgStyles.error;
        applyStyle(entryElement, _objectSpread(_objectSpread({}, msgStyle), {}, {
          padding: "1rem 1rem 1.5rem 1rem"
        }));
        var typeElement = document.createElement("div");
        var _formatProblem = formatProblem(type, message),
          header = _formatProblem.header,
          body = _formatProblem.body;
        typeElement.innerText = header;
        applyStyle(typeElement, _overlay_styles_js__WEBPACK_IMPORTED_MODULE_3__.msgTypeStyle);
        if (message.moduleIdentifier) {
          applyStyle(typeElement, {
            cursor: "pointer"
          });
          // element.dataset not supported in IE
          typeElement.setAttribute("data-can-open", true);
          typeElement.addEventListener("click", function () {
            fetch("/webpack-dev-server/open-editor?fileName=".concat(message.moduleIdentifier));
          });
        }

        // Make it look similar to our terminal.
        var text = ansi_html_community__WEBPACK_IMPORTED_MODULE_0___default()((0,html_entities__WEBPACK_IMPORTED_MODULE_4__.encode)(body));
        var messageTextNode = document.createElement("div");
        applyStyle(messageTextNode, _overlay_styles_js__WEBPACK_IMPORTED_MODULE_3__.msgTextStyle);
        messageTextNode.innerHTML = overlayTrustedTypesPolicy ? overlayTrustedTypesPolicy.createHTML(text) : text;
        entryElement.appendChild(typeElement);
        entryElement.appendChild(messageTextNode);

        /** @type {HTMLDivElement} */
        containerElement.appendChild(entryElement);
      });
    }, trustedTypesPolicyName);
  }
  var overlayService = (0,_overlay_state_machine_js__WEBPACK_IMPORTED_MODULE_2__["default"])({
    showOverlay: function showOverlay(_ref) {
      var _ref$level = _ref.level,
        level = _ref$level === void 0 ? "error" : _ref$level,
        messages = _ref.messages,
        messageSource = _ref.messageSource;
      return show(level, messages, options.trustedTypesPolicyName, messageSource);
    },
    hideOverlay: hide
  });
  if (options.catchRuntimeError) {
    /**
     * @param {Error | undefined} error
     * @param {string} fallbackMessage
     */
    var handleError = function handleError(error, fallbackMessage) {
      var errorObject = error instanceof Error ? error : new Error(error || fallbackMessage);
      var shouldDisplay = typeof options.catchRuntimeError === "function" ? options.catchRuntimeError(errorObject) : true;
      if (shouldDisplay) {
        overlayService.send({
          type: "RUNTIME_ERROR",
          messages: [{
            message: errorObject.message,
            stack: (0,_overlay_runtime_error_js__WEBPACK_IMPORTED_MODULE_1__.parseErrorToStacks)(errorObject)
          }]
        });
      }
    };
    (0,_overlay_runtime_error_js__WEBPACK_IMPORTED_MODULE_1__.listenToRuntimeError)(function (errorEvent) {
      // error property may be empty in older browser like IE
      var error = errorEvent.error,
        message = errorEvent.message;
      if (!error && !message) {
        return;
      }
      handleError(error, message);
    });
    (0,_overlay_runtime_error_js__WEBPACK_IMPORTED_MODULE_1__.listenToUnhandledRejection)(function (promiseRejectionEvent) {
      var reason = promiseRejectionEvent.reason;
      handleError(reason, "Unknown promise rejection reason");
    });
  }
  return overlayService;
};


/***/ }),

/***/ "./node_modules/webpack-dev-server/client/overlay/fsm.js":
/*!***************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/overlay/fsm.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
/**
 * @typedef {Object} StateDefinitions
 * @property {{[event: string]: { target: string; actions?: Array<string> }}} [on]
 */

/**
 * @typedef {Object} Options
 * @property {{[state: string]: StateDefinitions}} states
 * @property {object} context;
 * @property {string} initial
 */

/**
 * @typedef {Object} Implementation
 * @property {{[actionName: string]: (ctx: object, event: any) => object}} actions
 */

/**
 * A simplified `createMachine` from `@xstate/fsm` with the following differences:
 *
 *  - the returned machine is technically a "service". No `interpret(machine).start()` is needed.
 *  - the state definition only support `on` and target must be declared with { target: 'nextState', actions: [] } explicitly.
 *  - event passed to `send` must be an object with `type` property.
 *  - actions implementation will be [assign action](https://xstate.js.org/docs/guides/context.html#assign-action) if you return any value.
 *  Do not return anything if you just want to invoke side effect.
 *
 * The goal of this custom function is to avoid installing the entire `'xstate/fsm'` package, while enabling modeling using
 * state machine. You can copy the first parameter into the editor at https://stately.ai/viz to visualize the state machine.
 *
 * @param {Options} options
 * @param {Implementation} implementation
 */
function createMachine(_ref, _ref2) {
  var states = _ref.states,
    context = _ref.context,
    initial = _ref.initial;
  var actions = _ref2.actions;
  var currentState = initial;
  var currentContext = context;
  return {
    send: function send(event) {
      var currentStateOn = states[currentState].on;
      var transitionConfig = currentStateOn && currentStateOn[event.type];
      if (transitionConfig) {
        currentState = transitionConfig.target;
        if (transitionConfig.actions) {
          transitionConfig.actions.forEach(function (actName) {
            var actionImpl = actions[actName];
            var nextContextValue = actionImpl && actionImpl(currentContext, event);
            if (nextContextValue) {
              currentContext = _objectSpread(_objectSpread({}, currentContext), nextContextValue);
            }
          });
        }
      }
    }
  };
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createMachine);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/overlay/runtime-error.js":
/*!*************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/overlay/runtime-error.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   listenToRuntimeError: () => (/* binding */ listenToRuntimeError),
/* harmony export */   listenToUnhandledRejection: () => (/* binding */ listenToUnhandledRejection),
/* harmony export */   parseErrorToStacks: () => (/* binding */ parseErrorToStacks)
/* harmony export */ });
/**
 *
 * @param {Error} error
 */
function parseErrorToStacks(error) {
  if (!error || !(error instanceof Error)) {
    throw new Error("parseErrorToStacks expects Error object");
  }
  if (typeof error.stack === "string") {
    return error.stack.split("\n").filter(function (stack) {
      return stack !== "Error: ".concat(error.message);
    });
  }
}

/**
 * @callback ErrorCallback
 * @param {ErrorEvent} error
 * @returns {void}
 */

/**
 * @param {ErrorCallback} callback
 */
function listenToRuntimeError(callback) {
  window.addEventListener("error", callback);
  return function cleanup() {
    window.removeEventListener("error", callback);
  };
}

/**
 * @callback UnhandledRejectionCallback
 * @param {PromiseRejectionEvent} rejectionEvent
 * @returns {void}
 */

/**
 * @param {UnhandledRejectionCallback} callback
 */
function listenToUnhandledRejection(callback) {
  window.addEventListener("unhandledrejection", callback);
  return function cleanup() {
    window.removeEventListener("unhandledrejection", callback);
  };
}


/***/ }),

/***/ "./node_modules/webpack-dev-server/client/overlay/state-machine.js":
/*!*************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/overlay/state-machine.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _fsm_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fsm.js */ "./node_modules/webpack-dev-server/client/overlay/fsm.js");


/**
 * @typedef {Object} ShowOverlayData
 * @property {'warning' | 'error'} level
 * @property {Array<string  | { moduleIdentifier?: string, moduleName?: string, loc?: string, message?: string }>} messages
 * @property {'build' | 'runtime'} messageSource
 */

/**
 * @typedef {Object} CreateOverlayMachineOptions
 * @property {(data: ShowOverlayData) => void} showOverlay
 * @property {() => void} hideOverlay
 */

/**
 * @param {CreateOverlayMachineOptions} options
 */
var createOverlayMachine = function createOverlayMachine(options) {
  var hideOverlay = options.hideOverlay,
    showOverlay = options.showOverlay;
  var overlayMachine = (0,_fsm_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
    initial: "hidden",
    context: {
      level: "error",
      messages: [],
      messageSource: "build"
    },
    states: {
      hidden: {
        on: {
          BUILD_ERROR: {
            target: "displayBuildError",
            actions: ["setMessages", "showOverlay"]
          },
          RUNTIME_ERROR: {
            target: "displayRuntimeError",
            actions: ["setMessages", "showOverlay"]
          }
        }
      },
      displayBuildError: {
        on: {
          DISMISS: {
            target: "hidden",
            actions: ["dismissMessages", "hideOverlay"]
          },
          BUILD_ERROR: {
            target: "displayBuildError",
            actions: ["appendMessages", "showOverlay"]
          }
        }
      },
      displayRuntimeError: {
        on: {
          DISMISS: {
            target: "hidden",
            actions: ["dismissMessages", "hideOverlay"]
          },
          RUNTIME_ERROR: {
            target: "displayRuntimeError",
            actions: ["appendMessages", "showOverlay"]
          },
          BUILD_ERROR: {
            target: "displayBuildError",
            actions: ["setMessages", "showOverlay"]
          }
        }
      }
    }
  }, {
    actions: {
      dismissMessages: function dismissMessages() {
        return {
          messages: [],
          level: "error",
          messageSource: "build"
        };
      },
      appendMessages: function appendMessages(context, event) {
        return {
          messages: context.messages.concat(event.messages),
          level: event.level || context.level,
          messageSource: event.type === "RUNTIME_ERROR" ? "runtime" : "build"
        };
      },
      setMessages: function setMessages(context, event) {
        return {
          messages: event.messages,
          level: event.level || context.level,
          messageSource: event.type === "RUNTIME_ERROR" ? "runtime" : "build"
        };
      },
      hideOverlay: hideOverlay,
      showOverlay: showOverlay
    }
  });
  return overlayMachine;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createOverlayMachine);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/overlay/styles.js":
/*!******************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/overlay/styles.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   containerStyle: () => (/* binding */ containerStyle),
/* harmony export */   dismissButtonStyle: () => (/* binding */ dismissButtonStyle),
/* harmony export */   headerStyle: () => (/* binding */ headerStyle),
/* harmony export */   iframeStyle: () => (/* binding */ iframeStyle),
/* harmony export */   msgStyles: () => (/* binding */ msgStyles),
/* harmony export */   msgTextStyle: () => (/* binding */ msgTextStyle),
/* harmony export */   msgTypeStyle: () => (/* binding */ msgTypeStyle)
/* harmony export */ });
// styles are inspired by `react-error-overlay`

var msgStyles = {
  error: {
    backgroundColor: "rgba(206, 17, 38, 0.1)",
    color: "#fccfcf"
  },
  warning: {
    backgroundColor: "rgba(251, 245, 180, 0.1)",
    color: "#fbf5b4"
  }
};
var iframeStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: "100vw",
  height: "100vh",
  border: "none",
  "z-index": 9999999999
};
var containerStyle = {
  position: "fixed",
  boxSizing: "border-box",
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
  width: "100vw",
  height: "100vh",
  fontSize: "large",
  padding: "2rem 2rem 4rem 2rem",
  lineHeight: "1.2",
  whiteSpace: "pre-wrap",
  overflow: "auto",
  backgroundColor: "rgba(0, 0, 0, 0.9)",
  color: "white"
};
var headerStyle = {
  color: "#e83b46",
  fontSize: "2em",
  whiteSpace: "pre-wrap",
  fontFamily: "sans-serif",
  margin: "0 2rem 2rem 0",
  flex: "0 0 auto",
  maxHeight: "50%",
  overflow: "auto"
};
var dismissButtonStyle = {
  color: "#ffffff",
  lineHeight: "1rem",
  fontSize: "1.5rem",
  padding: "1rem",
  cursor: "pointer",
  position: "absolute",
  right: 0,
  top: 0,
  backgroundColor: "transparent",
  border: "none"
};
var msgTypeStyle = {
  color: "#e83b46",
  fontSize: "1.2em",
  marginBottom: "1rem",
  fontFamily: "sans-serif"
};
var msgTextStyle = {
  lineHeight: "1.5",
  fontSize: "1rem",
  fontFamily: "Menlo, Consolas, monospace"
};


/***/ }),

/***/ "./node_modules/webpack-dev-server/client/socket.js":
/*!**********************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/socket.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   client: () => (/* binding */ client),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _clients_WebSocketClient_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./clients/WebSocketClient.js */ "./node_modules/webpack-dev-server/client/clients/WebSocketClient.js");
/* harmony import */ var _utils_log_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/log.js */ "./node_modules/webpack-dev-server/client/utils/log.js");
/* provided dependency */ var __webpack_dev_server_client__ = __webpack_require__(/*! ./node_modules/webpack-dev-server/client/clients/WebSocketClient.js */ "./node_modules/webpack-dev-server/client/clients/WebSocketClient.js");
/* global __webpack_dev_server_client__ */




// this WebsocketClient is here as a default fallback, in case the client is not injected
/* eslint-disable camelcase */
var Client =
// eslint-disable-next-line no-nested-ternary
typeof __webpack_dev_server_client__ !== "undefined" ? typeof __webpack_dev_server_client__.default !== "undefined" ? __webpack_dev_server_client__.default : __webpack_dev_server_client__ : _clients_WebSocketClient_js__WEBPACK_IMPORTED_MODULE_0__["default"];
/* eslint-enable camelcase */

var retries = 0;
var maxRetries = 10;

// Initialized client is exported so external consumers can utilize the same instance
// It is mutable to enforce singleton
// eslint-disable-next-line import/no-mutable-exports
var client = null;

/**
 * @param {string} url
 * @param {{ [handler: string]: (data?: any, params?: any) => any }} handlers
 * @param {number} [reconnect]
 */
var socket = function initSocket(url, handlers, reconnect) {
  client = new Client(url);
  client.onOpen(function () {
    retries = 0;
    if (typeof reconnect !== "undefined") {
      maxRetries = reconnect;
    }
  });
  client.onClose(function () {
    if (retries === 0) {
      handlers.close();
    }

    // Try to reconnect.
    client = null;

    // After 10 retries stop trying, to prevent logspam.
    if (retries < maxRetries) {
      // Exponentially increase timeout to reconnect.
      // Respectfully copied from the package `got`.
      // eslint-disable-next-line no-restricted-properties
      var retryInMs = 1000 * Math.pow(2, retries) + Math.random() * 100;
      retries += 1;
      _utils_log_js__WEBPACK_IMPORTED_MODULE_1__.log.info("Trying to reconnect...");
      setTimeout(function () {
        socket(url, handlers, reconnect);
      }, retryInMs);
    }
  });
  client.onMessage(
  /**
   * @param {any} data
   */
  function (data) {
    var message = JSON.parse(data);
    if (handlers[message.type]) {
      handlers[message.type](message.data, message.params);
    }
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (socket);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/createSocketURL.js":
/*!*************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/createSocketURL.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * @param {{ protocol?: string, auth?: string, hostname?: string, port?: string, pathname?: string, search?: string, hash?: string, slashes?: boolean }} objURL
 * @returns {string}
 */
function format(objURL) {
  var protocol = objURL.protocol || "";
  if (protocol && protocol.substr(-1) !== ":") {
    protocol += ":";
  }
  var auth = objURL.auth || "";
  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ":");
    auth += "@";
  }
  var host = "";
  if (objURL.hostname) {
    host = auth + (objURL.hostname.indexOf(":") === -1 ? objURL.hostname : "[".concat(objURL.hostname, "]"));
    if (objURL.port) {
      host += ":".concat(objURL.port);
    }
  }
  var pathname = objURL.pathname || "";
  if (objURL.slashes) {
    host = "//".concat(host || "");
    if (pathname && pathname.charAt(0) !== "/") {
      pathname = "/".concat(pathname);
    }
  } else if (!host) {
    host = "";
  }
  var search = objURL.search || "";
  if (search && search.charAt(0) !== "?") {
    search = "?".concat(search);
  }
  var hash = objURL.hash || "";
  if (hash && hash.charAt(0) !== "#") {
    hash = "#".concat(hash);
  }
  pathname = pathname.replace(/[?#]/g,
  /**
   * @param {string} match
   * @returns {string}
   */
  function (match) {
    return encodeURIComponent(match);
  });
  search = search.replace("#", "%23");
  return "".concat(protocol).concat(host).concat(pathname).concat(search).concat(hash);
}

/**
 * @param {URL & { fromCurrentScript?: boolean }} parsedURL
 * @returns {string}
 */
function createSocketURL(parsedURL) {
  var hostname = parsedURL.hostname;

  // Node.js module parses it as `::`
  // `new URL(urlString, [baseURLString])` parses it as '[::]'
  var isInAddrAny = hostname === "0.0.0.0" || hostname === "::" || hostname === "[::]";

  // why do we need this check?
  // hostname n/a for file protocol (example, when using electron, ionic)
  // see: https://github.com/webpack/webpack-dev-server/pull/384
  if (isInAddrAny && self.location.hostname && self.location.protocol.indexOf("http") === 0) {
    hostname = self.location.hostname;
  }
  var socketURLProtocol = parsedURL.protocol || self.location.protocol;

  // When https is used in the app, secure web sockets are always necessary because the browser doesn't accept non-secure web sockets.
  if (socketURLProtocol === "auto:" || hostname && isInAddrAny && self.location.protocol === "https:") {
    socketURLProtocol = self.location.protocol;
  }
  socketURLProtocol = socketURLProtocol.replace(/^(?:http|.+-extension|file)/i, "ws");
  var socketURLAuth = "";

  // `new URL(urlString, [baseURLstring])` doesn't have `auth` property
  // Parse authentication credentials in case we need them
  if (parsedURL.username) {
    socketURLAuth = parsedURL.username;

    // Since HTTP basic authentication does not allow empty username,
    // we only include password if the username is not empty.
    if (parsedURL.password) {
      // Result: <username>:<password>
      socketURLAuth = socketURLAuth.concat(":", parsedURL.password);
    }
  }

  // In case the host is a raw IPv6 address, it can be enclosed in
  // the brackets as the brackets are needed in the final URL string.
  // Need to remove those as url.format blindly adds its own set of brackets
  // if the host string contains colons. That would lead to non-working
  // double brackets (e.g. [[::]]) host
  //
  // All of these web socket url params are optionally passed in through resourceQuery,
  // so we need to fall back to the default if they are not provided
  var socketURLHostname = (hostname || self.location.hostname || "localhost").replace(/^\[(.*)\]$/, "$1");
  var socketURLPort = parsedURL.port;
  if (!socketURLPort || socketURLPort === "0") {
    socketURLPort = self.location.port;
  }

  // If path is provided it'll be passed in via the resourceQuery as a
  // query param so it has to be parsed out of the querystring in order for the
  // client to open the socket to the correct location.
  var socketURLPathname = "/ws";
  if (parsedURL.pathname && !parsedURL.fromCurrentScript) {
    socketURLPathname = parsedURL.pathname;
  }
  return format({
    protocol: socketURLProtocol,
    auth: socketURLAuth,
    hostname: socketURLHostname,
    port: socketURLPort,
    pathname: socketURLPathname,
    slashes: true
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createSocketURL);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/getCurrentScriptSource.js":
/*!********************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/getCurrentScriptSource.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * @returns {string}
 */
function getCurrentScriptSource() {
  // `document.currentScript` is the most accurate way to find the current script,
  // but is not supported in all browsers.
  if (document.currentScript) {
    return document.currentScript.getAttribute("src");
  }

  // Fallback to getting all scripts running in the document.
  var scriptElements = document.scripts || [];
  var scriptElementsWithSrc = Array.prototype.filter.call(scriptElements, function (element) {
    return element.getAttribute("src");
  });
  if (scriptElementsWithSrc.length > 0) {
    var currentScript = scriptElementsWithSrc[scriptElementsWithSrc.length - 1];
    return currentScript.getAttribute("src");
  }

  // Fail as there was no script to use.
  throw new Error("[webpack-dev-server] Failed to get current script source.");
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getCurrentScriptSource);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/log.js":
/*!*************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/log.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   log: () => (/* binding */ log),
/* harmony export */   logEnabledFeatures: () => (/* binding */ logEnabledFeatures),
/* harmony export */   setLogLevel: () => (/* binding */ setLogLevel)
/* harmony export */ });
/* harmony import */ var _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/logger/index.js */ "./node_modules/webpack-dev-server/client/modules/logger/index.js");
/* harmony import */ var _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0__);

var name = "webpack-dev-server";
// default level is set on the client side, so it does not need
// to be set by the CLI or API
var defaultLevel = "info";

// options new options, merge with old options
/**
 * @param {false | true | "none" | "error" | "warn" | "info" | "log" | "verbose"} level
 * @returns {void}
 */
function setLogLevel(level) {
  _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0___default().configureDefaultLogger({
    level: level
  });
}
setLogLevel(defaultLevel);
var log = _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0___default().getLogger(name);
var logEnabledFeatures = function logEnabledFeatures(features) {
  var enabledFeatures = Object.keys(features);
  if (!features || enabledFeatures.length === 0) {
    return;
  }
  var logString = "Server started:";

  // Server started: Hot Module Replacement enabled, Live Reloading enabled, Overlay disabled.
  for (var i = 0; i < enabledFeatures.length; i++) {
    var key = enabledFeatures[i];
    logString += " ".concat(key, " ").concat(features[key] ? "enabled" : "disabled", ",");
  }
  // replace last comma with a period
  logString = logString.slice(0, -1).concat(".");
  log.info(logString);
};


/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/parseURL.js":
/*!******************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/parseURL.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _getCurrentScriptSource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getCurrentScriptSource.js */ "./node_modules/webpack-dev-server/client/utils/getCurrentScriptSource.js");


/**
 * @param {string} resourceQuery
 * @returns {{ [key: string]: string | boolean }}
 */
function parseURL(resourceQuery) {
  /** @type {{ [key: string]: string }} */
  var options = {};
  if (typeof resourceQuery === "string" && resourceQuery !== "") {
    var searchParams = resourceQuery.slice(1).split("&");
    for (var i = 0; i < searchParams.length; i++) {
      var pair = searchParams[i].split("=");
      options[pair[0]] = decodeURIComponent(pair[1]);
    }
  } else {
    // Else, get the url from the <script> this file was called with.
    var scriptSource = (0,_getCurrentScriptSource_js__WEBPACK_IMPORTED_MODULE_0__["default"])();
    var scriptSourceURL;
    try {
      // The placeholder `baseURL` with `window.location.href`,
      // is to allow parsing of path-relative or protocol-relative URLs,
      // and will have no effect if `scriptSource` is a fully valid URL.
      scriptSourceURL = new URL(scriptSource, self.location.href);
    } catch (error) {
      // URL parsing failed, do nothing.
      // We will still proceed to see if we can recover using `resourceQuery`
    }
    if (scriptSourceURL) {
      options = scriptSourceURL;
      options.fromCurrentScript = true;
    }
  }
  return options;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (parseURL);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/reloadApp.js":
/*!*******************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/reloadApp.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webpack/hot/emitter.js */ "./node_modules/webpack/hot/emitter.js");
/* harmony import */ var webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _log_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./log.js */ "./node_modules/webpack-dev-server/client/utils/log.js");



/** @typedef {import("../index").Options} Options
/** @typedef {import("../index").Status} Status

/**
 * @param {Options} options
 * @param {Status} status
 */
function reloadApp(_ref, status) {
  var hot = _ref.hot,
    liveReload = _ref.liveReload;
  if (status.isUnloading) {
    return;
  }
  var currentHash = status.currentHash,
    previousHash = status.previousHash;
  var isInitial = currentHash.indexOf( /** @type {string} */previousHash) >= 0;
  if (isInitial) {
    return;
  }

  /**
   * @param {Window} rootWindow
   * @param {number} intervalId
   */
  function applyReload(rootWindow, intervalId) {
    clearInterval(intervalId);
    _log_js__WEBPACK_IMPORTED_MODULE_1__.log.info("App updated. Reloading...");
    rootWindow.location.reload();
  }
  var search = self.location.search.toLowerCase();
  var allowToHot = search.indexOf("webpack-dev-server-hot=false") === -1;
  var allowToLiveReload = search.indexOf("webpack-dev-server-live-reload=false") === -1;
  if (hot && allowToHot) {
    _log_js__WEBPACK_IMPORTED_MODULE_1__.log.info("App hot update...");
    webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_0___default().emit("webpackHotUpdate", status.currentHash);
    if (typeof self !== "undefined" && self.window) {
      // broadcast update to window
      self.postMessage("webpackHotUpdate".concat(status.currentHash), "*");
    }
  }
  // allow refreshing the page only if liveReload isn't disabled
  else if (liveReload && allowToLiveReload) {
    var rootWindow = self;

    // use parent window for reload (in case we're in an iframe with no valid src)
    var intervalId = self.setInterval(function () {
      if (rootWindow.location.protocol !== "about:") {
        // reload immediately if protocol is valid
        applyReload(rootWindow, intervalId);
      } else {
        rootWindow = rootWindow.parent;
        if (rootWindow.parent === rootWindow) {
          // if parent equals current window we've reached the root which would continue forever, so trigger a reload anyways
          applyReload(rootWindow, intervalId);
        }
      }
    });
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (reloadApp);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/sendMessage.js":
/*!*********************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/sendMessage.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* global __resourceQuery WorkerGlobalScope */

// Send messages to the outside, so plugins can consume it.
/**
 * @param {string} type
 * @param {any} [data]
 */
function sendMsg(type, data) {
  if (typeof self !== "undefined" && (typeof WorkerGlobalScope === "undefined" || !(self instanceof WorkerGlobalScope))) {
    self.postMessage({
      type: "webpack".concat(type),
      data: data
    }, "*");
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sendMsg);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/stripAnsi.js":
/*!*******************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/stripAnsi.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var ansiRegex = new RegExp(["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)", "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))"].join("|"), "g");

/**
 *
 * Strip [ANSI escape codes](https://en.wikipedia.org/wiki/ANSI_escape_code) from a string.
 * Adapted from code originally released by Sindre Sorhus
 * Licensed the MIT License
 *
 * @param {string} string
 * @return {string}
 */
function stripAnsi(string) {
  if (typeof string !== "string") {
    throw new TypeError("Expected a `string`, got `".concat(typeof string, "`"));
  }
  return string.replace(ansiRegex, "");
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (stripAnsi);

/***/ }),

/***/ "./node_modules/webpack/hot/dev-server.js":
/*!************************************************!*\
  !*** ./node_modules/webpack/hot/dev-server.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
/* globals __webpack_hash__ */
if (true) {
  /** @type {undefined|string} */
  var lastHash;
  var upToDate = function upToDate() {
    return /** @type {string} */lastHash.indexOf(__webpack_require__.h()) >= 0;
  };
  var log = __webpack_require__(/*! ./log */ "./node_modules/webpack/hot/log.js");
  var check = function check() {
    module.hot.check(true).then(function (updatedModules) {
      if (!updatedModules) {
        log("warning", "[HMR] Cannot find update. " + (typeof window !== "undefined" ? "Need to do a full reload!" : "Please reload manually!"));
        log("warning", "[HMR] (Probably because of restarting the webpack-dev-server)");
        if (typeof window !== "undefined") {
          window.location.reload();
        }
        return;
      }
      if (!upToDate()) {
        check();
      }
      __webpack_require__(/*! ./log-apply-result */ "./node_modules/webpack/hot/log-apply-result.js")(updatedModules, updatedModules);
      if (upToDate()) {
        log("info", "[HMR] App is up to date.");
      }
    }).catch(function (err) {
      var status = module.hot.status();
      if (["abort", "fail"].indexOf(status) >= 0) {
        log("warning", "[HMR] Cannot apply update. " + (typeof window !== "undefined" ? "Need to do a full reload!" : "Please reload manually!"));
        log("warning", "[HMR] " + log.formatError(err));
        if (typeof window !== "undefined") {
          window.location.reload();
        }
      } else {
        log("warning", "[HMR] Update failed: " + log.formatError(err));
      }
    });
  };
  var hotEmitter = __webpack_require__(/*! ./emitter */ "./node_modules/webpack/hot/emitter.js");
  hotEmitter.on("webpackHotUpdate", function (currentHash) {
    lastHash = currentHash;
    if (!upToDate() && module.hot.status() === "idle") {
      log("info", "[HMR] Checking for updates on the server...");
      check();
    }
  });
  log("info", "[HMR] Waiting for update signal from WDS...");
} else {}

/***/ }),

/***/ "./node_modules/webpack/hot/emitter.js":
/*!*********************************************!*\
  !*** ./node_modules/webpack/hot/emitter.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var EventEmitter = __webpack_require__(/*! events */ "./node_modules/events/events.js");
module.exports = new EventEmitter();

/***/ }),

/***/ "./node_modules/webpack/hot/log-apply-result.js":
/*!******************************************************!*\
  !*** ./node_modules/webpack/hot/log-apply-result.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

/**
 * @param {(string | number)[]} updatedModules updated modules
 * @param {(string | number)[] | null} renewedModules renewed modules
 */
module.exports = function (updatedModules, renewedModules) {
  var unacceptedModules = updatedModules.filter(function (moduleId) {
    return renewedModules && renewedModules.indexOf(moduleId) < 0;
  });
  var log = __webpack_require__(/*! ./log */ "./node_modules/webpack/hot/log.js");
  if (unacceptedModules.length > 0) {
    log("warning", "[HMR] The following modules couldn't be hot updated: (They would need a full reload!)");
    unacceptedModules.forEach(function (moduleId) {
      log("warning", "[HMR]  - " + moduleId);
    });
  }
  if (!renewedModules || renewedModules.length === 0) {
    log("info", "[HMR] Nothing hot updated.");
  } else {
    log("info", "[HMR] Updated modules:");
    renewedModules.forEach(function (moduleId) {
      if (typeof moduleId === "string" && moduleId.indexOf("!") !== -1) {
        var parts = moduleId.split("!");
        log.groupCollapsed("info", "[HMR]  - " + parts.pop());
        log("info", "[HMR]  - " + moduleId);
        log.groupEnd("info");
      } else {
        log("info", "[HMR]  - " + moduleId);
      }
    });
    var numberIds = renewedModules.every(function (moduleId) {
      return typeof moduleId === "number";
    });
    if (numberIds) log("info", '[HMR] Consider using the optimization.moduleIds: "named" for module names.');
  }
};

/***/ }),

/***/ "./node_modules/webpack/hot/log.js":
/*!*****************************************!*\
  !*** ./node_modules/webpack/hot/log.js ***!
  \*****************************************/
/***/ ((module) => {

/** @typedef {"info" | "warning" | "error"} LogLevel */

/** @type {LogLevel} */
var logLevel = "info";
function dummy() {}

/**
 * @param {LogLevel} level log level
 * @returns {boolean} true, if should log
 */
function shouldLog(level) {
  var shouldLog = logLevel === "info" && level === "info" || ["info", "warning"].indexOf(logLevel) >= 0 && level === "warning" || ["info", "warning", "error"].indexOf(logLevel) >= 0 && level === "error";
  return shouldLog;
}

/**
 * @param {(msg?: string) => void} logFn log function
 * @returns {(level: LogLevel, msg?: string) => void} function that logs when log level is sufficient
 */
function logGroup(logFn) {
  return function (level, msg) {
    if (shouldLog(level)) {
      logFn(msg);
    }
  };
}

/**
 * @param {LogLevel} level log level
 * @param {string|Error} msg message
 */
module.exports = function (level, msg) {
  if (shouldLog(level)) {
    if (level === "info") {
      console.log(msg);
    } else if (level === "warning") {
      console.warn(msg);
    } else if (level === "error") {
      console.error(msg);
    }
  }
};
var group = console.group || dummy;
var groupCollapsed = console.groupCollapsed || dummy;
var groupEnd = console.groupEnd || dummy;
module.exports.group = logGroup(group);
module.exports.groupCollapsed = logGroup(groupCollapsed);
module.exports.groupEnd = logGroup(groupEnd);

/**
 * @param {LogLevel} level log level
 */
module.exports.setLogLevel = function (level) {
  logLevel = level;
};

/**
 * @param {Error} err error
 * @returns {string} formatted error
 */
module.exports.formatError = function (err) {
  var message = err.message;
  var stack = err.stack;
  if (!stack) {
    return message;
  } else if (stack.indexOf(message) < 0) {
    return message + "\n" + stack;
  } else {
    return stack;
  }
};

/***/ }),

/***/ "./styles/index.scss":
/*!***************************!*\
  !*** ./styles/index.scss ***!
  \***************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

    if(true) {
      (function() {
        var localsJsonString = undefined;
        // 1717530976098
        var cssReload = __webpack_require__(/*! ../node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js")(module.id, {"publicPath":""});
        // only invalidate when locals change
        if (
          module.hot.data &&
          module.hot.data.value &&
          module.hot.data.value !== localsJsonString
        ) {
          module.hot.invalidate();
        } else {
          module.hot.accept();
        }
        module.hot.dispose(function(data) {
          data.value = localsJsonString;
          cssReload();
        });
      })();
    }
  

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var execOptions = { id: moduleId, module: module, factory: __webpack_modules__[moduleId], require: __webpack_require__ };
/******/ 		__webpack_require__.i.forEach(function(handler) { handler(execOptions); });
/******/ 		module = execOptions.module;
/******/ 		execOptions.factory.call(module.exports, module, module.exports, execOptions.require);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
/******/ 	
/******/ 	// expose the module execution interceptor
/******/ 	__webpack_require__.i = [];
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript update chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference all chunks
/******/ 		__webpack_require__.hu = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + "." + __webpack_require__.h() + ".hot-update.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get mini-css chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.miniCssF = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return undefined;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get update manifest filename */
/******/ 	(() => {
/******/ 		__webpack_require__.hmrF = () => ("main." + __webpack_require__.h() + ".hot-update.json");
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => ("ef73b8811bd5fdc40fa9")
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "vanilla-js-project:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 		
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hot module replacement */
/******/ 	(() => {
/******/ 		var currentModuleData = {};
/******/ 		var installedModules = __webpack_require__.c;
/******/ 		
/******/ 		// module and require creation
/******/ 		var currentChildModule;
/******/ 		var currentParents = [];
/******/ 		
/******/ 		// status
/******/ 		var registeredStatusHandlers = [];
/******/ 		var currentStatus = "idle";
/******/ 		
/******/ 		// while downloading
/******/ 		var blockingPromises = 0;
/******/ 		var blockingPromisesWaiting = [];
/******/ 		
/******/ 		// The update info
/******/ 		var currentUpdateApplyHandlers;
/******/ 		var queuedInvalidatedModules;
/******/ 		
/******/ 		__webpack_require__.hmrD = currentModuleData;
/******/ 		
/******/ 		__webpack_require__.i.push(function (options) {
/******/ 			var module = options.module;
/******/ 			var require = createRequire(options.require, options.id);
/******/ 			module.hot = createModuleHotObject(options.id, module);
/******/ 			module.parents = currentParents;
/******/ 			module.children = [];
/******/ 			currentParents = [];
/******/ 			options.require = require;
/******/ 		});
/******/ 		
/******/ 		__webpack_require__.hmrC = {};
/******/ 		__webpack_require__.hmrI = {};
/******/ 		
/******/ 		function createRequire(require, moduleId) {
/******/ 			var me = installedModules[moduleId];
/******/ 			if (!me) return require;
/******/ 			var fn = function (request) {
/******/ 				if (me.hot.active) {
/******/ 					if (installedModules[request]) {
/******/ 						var parents = installedModules[request].parents;
/******/ 						if (parents.indexOf(moduleId) === -1) {
/******/ 							parents.push(moduleId);
/******/ 						}
/******/ 					} else {
/******/ 						currentParents = [moduleId];
/******/ 						currentChildModule = request;
/******/ 					}
/******/ 					if (me.children.indexOf(request) === -1) {
/******/ 						me.children.push(request);
/******/ 					}
/******/ 				} else {
/******/ 					console.warn(
/******/ 						"[HMR] unexpected require(" +
/******/ 							request +
/******/ 							") from disposed module " +
/******/ 							moduleId
/******/ 					);
/******/ 					currentParents = [];
/******/ 				}
/******/ 				return require(request);
/******/ 			};
/******/ 			var createPropertyDescriptor = function (name) {
/******/ 				return {
/******/ 					configurable: true,
/******/ 					enumerable: true,
/******/ 					get: function () {
/******/ 						return require[name];
/******/ 					},
/******/ 					set: function (value) {
/******/ 						require[name] = value;
/******/ 					}
/******/ 				};
/******/ 			};
/******/ 			for (var name in require) {
/******/ 				if (Object.prototype.hasOwnProperty.call(require, name) && name !== "e") {
/******/ 					Object.defineProperty(fn, name, createPropertyDescriptor(name));
/******/ 				}
/******/ 			}
/******/ 			fn.e = function (chunkId, fetchPriority) {
/******/ 				return trackBlockingPromise(require.e(chunkId, fetchPriority));
/******/ 			};
/******/ 			return fn;
/******/ 		}
/******/ 		
/******/ 		function createModuleHotObject(moduleId, me) {
/******/ 			var _main = currentChildModule !== moduleId;
/******/ 			var hot = {
/******/ 				// private stuff
/******/ 				_acceptedDependencies: {},
/******/ 				_acceptedErrorHandlers: {},
/******/ 				_declinedDependencies: {},
/******/ 				_selfAccepted: false,
/******/ 				_selfDeclined: false,
/******/ 				_selfInvalidated: false,
/******/ 				_disposeHandlers: [],
/******/ 				_main: _main,
/******/ 				_requireSelf: function () {
/******/ 					currentParents = me.parents.slice();
/******/ 					currentChildModule = _main ? undefined : moduleId;
/******/ 					__webpack_require__(moduleId);
/******/ 				},
/******/ 		
/******/ 				// Module API
/******/ 				active: true,
/******/ 				accept: function (dep, callback, errorHandler) {
/******/ 					if (dep === undefined) hot._selfAccepted = true;
/******/ 					else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 					else if (typeof dep === "object" && dep !== null) {
/******/ 						for (var i = 0; i < dep.length; i++) {
/******/ 							hot._acceptedDependencies[dep[i]] = callback || function () {};
/******/ 							hot._acceptedErrorHandlers[dep[i]] = errorHandler;
/******/ 						}
/******/ 					} else {
/******/ 						hot._acceptedDependencies[dep] = callback || function () {};
/******/ 						hot._acceptedErrorHandlers[dep] = errorHandler;
/******/ 					}
/******/ 				},
/******/ 				decline: function (dep) {
/******/ 					if (dep === undefined) hot._selfDeclined = true;
/******/ 					else if (typeof dep === "object" && dep !== null)
/******/ 						for (var i = 0; i < dep.length; i++)
/******/ 							hot._declinedDependencies[dep[i]] = true;
/******/ 					else hot._declinedDependencies[dep] = true;
/******/ 				},
/******/ 				dispose: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				addDisposeHandler: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				removeDisposeHandler: function (callback) {
/******/ 					var idx = hot._disposeHandlers.indexOf(callback);
/******/ 					if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 				},
/******/ 				invalidate: function () {
/******/ 					this._selfInvalidated = true;
/******/ 					switch (currentStatus) {
/******/ 						case "idle":
/******/ 							currentUpdateApplyHandlers = [];
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							setStatus("ready");
/******/ 							break;
/******/ 						case "ready":
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							break;
/******/ 						case "prepare":
/******/ 						case "check":
/******/ 						case "dispose":
/******/ 						case "apply":
/******/ 							(queuedInvalidatedModules = queuedInvalidatedModules || []).push(
/******/ 								moduleId
/******/ 							);
/******/ 							break;
/******/ 						default:
/******/ 							// ignore requests in error states
/******/ 							break;
/******/ 					}
/******/ 				},
/******/ 		
/******/ 				// Management API
/******/ 				check: hotCheck,
/******/ 				apply: hotApply,
/******/ 				status: function (l) {
/******/ 					if (!l) return currentStatus;
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				addStatusHandler: function (l) {
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				removeStatusHandler: function (l) {
/******/ 					var idx = registeredStatusHandlers.indexOf(l);
/******/ 					if (idx >= 0) registeredStatusHandlers.splice(idx, 1);
/******/ 				},
/******/ 		
/******/ 				//inherit from previous dispose call
/******/ 				data: currentModuleData[moduleId]
/******/ 			};
/******/ 			currentChildModule = undefined;
/******/ 			return hot;
/******/ 		}
/******/ 		
/******/ 		function setStatus(newStatus) {
/******/ 			currentStatus = newStatus;
/******/ 			var results = [];
/******/ 		
/******/ 			for (var i = 0; i < registeredStatusHandlers.length; i++)
/******/ 				results[i] = registeredStatusHandlers[i].call(null, newStatus);
/******/ 		
/******/ 			return Promise.all(results).then(function () {});
/******/ 		}
/******/ 		
/******/ 		function unblock() {
/******/ 			if (--blockingPromises === 0) {
/******/ 				setStatus("ready").then(function () {
/******/ 					if (blockingPromises === 0) {
/******/ 						var list = blockingPromisesWaiting;
/******/ 						blockingPromisesWaiting = [];
/******/ 						for (var i = 0; i < list.length; i++) {
/******/ 							list[i]();
/******/ 						}
/******/ 					}
/******/ 				});
/******/ 			}
/******/ 		}
/******/ 		
/******/ 		function trackBlockingPromise(promise) {
/******/ 			switch (currentStatus) {
/******/ 				case "ready":
/******/ 					setStatus("prepare");
/******/ 				/* fallthrough */
/******/ 				case "prepare":
/******/ 					blockingPromises++;
/******/ 					promise.then(unblock, unblock);
/******/ 					return promise;
/******/ 				default:
/******/ 					return promise;
/******/ 			}
/******/ 		}
/******/ 		
/******/ 		function waitForBlockingPromises(fn) {
/******/ 			if (blockingPromises === 0) return fn();
/******/ 			return new Promise(function (resolve) {
/******/ 				blockingPromisesWaiting.push(function () {
/******/ 					resolve(fn());
/******/ 				});
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function hotCheck(applyOnUpdate) {
/******/ 			if (currentStatus !== "idle") {
/******/ 				throw new Error("check() is only allowed in idle status");
/******/ 			}
/******/ 			return setStatus("check")
/******/ 				.then(__webpack_require__.hmrM)
/******/ 				.then(function (update) {
/******/ 					if (!update) {
/******/ 						return setStatus(applyInvalidatedModules() ? "ready" : "idle").then(
/******/ 							function () {
/******/ 								return null;
/******/ 							}
/******/ 						);
/******/ 					}
/******/ 		
/******/ 					return setStatus("prepare").then(function () {
/******/ 						var updatedModules = [];
/******/ 						currentUpdateApplyHandlers = [];
/******/ 		
/******/ 						return Promise.all(
/******/ 							Object.keys(__webpack_require__.hmrC).reduce(function (
/******/ 								promises,
/******/ 								key
/******/ 							) {
/******/ 								__webpack_require__.hmrC[key](
/******/ 									update.c,
/******/ 									update.r,
/******/ 									update.m,
/******/ 									promises,
/******/ 									currentUpdateApplyHandlers,
/******/ 									updatedModules
/******/ 								);
/******/ 								return promises;
/******/ 							}, [])
/******/ 						).then(function () {
/******/ 							return waitForBlockingPromises(function () {
/******/ 								if (applyOnUpdate) {
/******/ 									return internalApply(applyOnUpdate);
/******/ 								} else {
/******/ 									return setStatus("ready").then(function () {
/******/ 										return updatedModules;
/******/ 									});
/******/ 								}
/******/ 							});
/******/ 						});
/******/ 					});
/******/ 				});
/******/ 		}
/******/ 		
/******/ 		function hotApply(options) {
/******/ 			if (currentStatus !== "ready") {
/******/ 				return Promise.resolve().then(function () {
/******/ 					throw new Error(
/******/ 						"apply() is only allowed in ready status (state: " +
/******/ 							currentStatus +
/******/ 							")"
/******/ 					);
/******/ 				});
/******/ 			}
/******/ 			return internalApply(options);
/******/ 		}
/******/ 		
/******/ 		function internalApply(options) {
/******/ 			options = options || {};
/******/ 		
/******/ 			applyInvalidatedModules();
/******/ 		
/******/ 			var results = currentUpdateApplyHandlers.map(function (handler) {
/******/ 				return handler(options);
/******/ 			});
/******/ 			currentUpdateApplyHandlers = undefined;
/******/ 		
/******/ 			var errors = results
/******/ 				.map(function (r) {
/******/ 					return r.error;
/******/ 				})
/******/ 				.filter(Boolean);
/******/ 		
/******/ 			if (errors.length > 0) {
/******/ 				return setStatus("abort").then(function () {
/******/ 					throw errors[0];
/******/ 				});
/******/ 			}
/******/ 		
/******/ 			// Now in "dispose" phase
/******/ 			var disposePromise = setStatus("dispose");
/******/ 		
/******/ 			results.forEach(function (result) {
/******/ 				if (result.dispose) result.dispose();
/******/ 			});
/******/ 		
/******/ 			// Now in "apply" phase
/******/ 			var applyPromise = setStatus("apply");
/******/ 		
/******/ 			var error;
/******/ 			var reportError = function (err) {
/******/ 				if (!error) error = err;
/******/ 			};
/******/ 		
/******/ 			var outdatedModules = [];
/******/ 			results.forEach(function (result) {
/******/ 				if (result.apply) {
/******/ 					var modules = result.apply(reportError);
/******/ 					if (modules) {
/******/ 						for (var i = 0; i < modules.length; i++) {
/******/ 							outdatedModules.push(modules[i]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		
/******/ 			return Promise.all([disposePromise, applyPromise]).then(function () {
/******/ 				// handle errors in accept handlers and self accepted module load
/******/ 				if (error) {
/******/ 					return setStatus("fail").then(function () {
/******/ 						throw error;
/******/ 					});
/******/ 				}
/******/ 		
/******/ 				if (queuedInvalidatedModules) {
/******/ 					return internalApply(options).then(function (list) {
/******/ 						outdatedModules.forEach(function (moduleId) {
/******/ 							if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 						});
/******/ 						return list;
/******/ 					});
/******/ 				}
/******/ 		
/******/ 				return setStatus("idle").then(function () {
/******/ 					return outdatedModules;
/******/ 				});
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function applyInvalidatedModules() {
/******/ 			if (queuedInvalidatedModules) {
/******/ 				if (!currentUpdateApplyHandlers) currentUpdateApplyHandlers = [];
/******/ 				Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 					queuedInvalidatedModules.forEach(function (moduleId) {
/******/ 						__webpack_require__.hmrI[key](
/******/ 							moduleId,
/******/ 							currentUpdateApplyHandlers
/******/ 						);
/******/ 					});
/******/ 				});
/******/ 				queuedInvalidatedModules = undefined;
/******/ 				return true;
/******/ 			}
/******/ 		}
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/css loading */
/******/ 	(() => {
/******/ 		if (typeof document === "undefined") return;
/******/ 		var createStylesheet = (chunkId, fullhref, oldTag, resolve, reject) => {
/******/ 			var linkTag = document.createElement("link");
/******/ 		
/******/ 			linkTag.rel = "stylesheet";
/******/ 			linkTag.type = "text/css";
/******/ 			if (__webpack_require__.nc) {
/******/ 				linkTag.nonce = __webpack_require__.nc;
/******/ 			}
/******/ 			var onLinkComplete = (event) => {
/******/ 				// avoid mem leaks.
/******/ 				linkTag.onerror = linkTag.onload = null;
/******/ 				if (event.type === 'load') {
/******/ 					resolve();
/******/ 				} else {
/******/ 					var errorType = event && event.type;
/******/ 					var realHref = event && event.target && event.target.href || fullhref;
/******/ 					var err = new Error("Loading CSS chunk " + chunkId + " failed.\n(" + errorType + ": " + realHref + ")");
/******/ 					err.name = "ChunkLoadError";
/******/ 					err.code = "CSS_CHUNK_LOAD_FAILED";
/******/ 					err.type = errorType;
/******/ 					err.request = realHref;
/******/ 					if (linkTag.parentNode) linkTag.parentNode.removeChild(linkTag)
/******/ 					reject(err);
/******/ 				}
/******/ 			}
/******/ 			linkTag.onerror = linkTag.onload = onLinkComplete;
/******/ 			linkTag.href = fullhref;
/******/ 		
/******/ 		
/******/ 			if (oldTag) {
/******/ 				oldTag.parentNode.insertBefore(linkTag, oldTag.nextSibling);
/******/ 			} else {
/******/ 				document.head.appendChild(linkTag);
/******/ 			}
/******/ 			return linkTag;
/******/ 		};
/******/ 		var findStylesheet = (href, fullhref) => {
/******/ 			var existingLinkTags = document.getElementsByTagName("link");
/******/ 			for(var i = 0; i < existingLinkTags.length; i++) {
/******/ 				var tag = existingLinkTags[i];
/******/ 				var dataHref = tag.getAttribute("data-href") || tag.getAttribute("href");
/******/ 				if(tag.rel === "stylesheet" && (dataHref === href || dataHref === fullhref)) return tag;
/******/ 			}
/******/ 			var existingStyleTags = document.getElementsByTagName("style");
/******/ 			for(var i = 0; i < existingStyleTags.length; i++) {
/******/ 				var tag = existingStyleTags[i];
/******/ 				var dataHref = tag.getAttribute("data-href");
/******/ 				if(dataHref === href || dataHref === fullhref) return tag;
/******/ 			}
/******/ 		};
/******/ 		var loadStylesheet = (chunkId) => {
/******/ 			return new Promise((resolve, reject) => {
/******/ 				var href = __webpack_require__.miniCssF(chunkId);
/******/ 				var fullhref = __webpack_require__.p + href;
/******/ 				if(findStylesheet(href, fullhref)) return resolve();
/******/ 				createStylesheet(chunkId, fullhref, null, resolve, reject);
/******/ 			});
/******/ 		}
/******/ 		// no chunk loading
/******/ 		
/******/ 		var oldTags = [];
/******/ 		var newTags = [];
/******/ 		var applyHandler = (options) => {
/******/ 			return { dispose: () => {
/******/ 				for(var i = 0; i < oldTags.length; i++) {
/******/ 					var oldTag = oldTags[i];
/******/ 					if(oldTag.parentNode) oldTag.parentNode.removeChild(oldTag);
/******/ 				}
/******/ 				oldTags.length = 0;
/******/ 			}, apply: () => {
/******/ 				for(var i = 0; i < newTags.length; i++) newTags[i].rel = "stylesheet";
/******/ 				newTags.length = 0;
/******/ 			} };
/******/ 		}
/******/ 		__webpack_require__.hmrC.miniCss = (chunkIds, removedChunks, removedModules, promises, applyHandlers, updatedModulesList) => {
/******/ 			applyHandlers.push(applyHandler);
/******/ 			chunkIds.forEach((chunkId) => {
/******/ 				var href = __webpack_require__.miniCssF(chunkId);
/******/ 				var fullhref = __webpack_require__.p + href;
/******/ 				var oldTag = findStylesheet(href, fullhref);
/******/ 				if(!oldTag) return;
/******/ 				promises.push(new Promise((resolve, reject) => {
/******/ 					var tag = createStylesheet(chunkId, fullhref, oldTag, () => {
/******/ 						tag.as = "style";
/******/ 						tag.rel = "preload";
/******/ 						resolve();
/******/ 					}, reject);
/******/ 					oldTags.push(oldTag);
/******/ 					newTags.push(tag);
/******/ 				}));
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = __webpack_require__.hmrS_jsonp = __webpack_require__.hmrS_jsonp || {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		var currentUpdatedModulesList;
/******/ 		var waitingUpdateResolves = {};
/******/ 		function loadUpdateChunk(chunkId, updatedModulesList) {
/******/ 			currentUpdatedModulesList = updatedModulesList;
/******/ 			return new Promise((resolve, reject) => {
/******/ 				waitingUpdateResolves[chunkId] = resolve;
/******/ 				// start update chunk loading
/******/ 				var url = __webpack_require__.p + __webpack_require__.hu(chunkId);
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				var loadingEnded = (event) => {
/******/ 					if(waitingUpdateResolves[chunkId]) {
/******/ 						waitingUpdateResolves[chunkId] = undefined
/******/ 						var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 						var realSrc = event && event.target && event.target.src;
/******/ 						error.message = 'Loading hot update chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 						error.name = 'ChunkLoadError';
/******/ 						error.type = errorType;
/******/ 						error.request = realSrc;
/******/ 						reject(error);
/******/ 					}
/******/ 				};
/******/ 				__webpack_require__.l(url, loadingEnded);
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		self["webpackHotUpdatevanilla_js_project"] = (chunkId, moreModules, runtime) => {
/******/ 			for(var moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					currentUpdate[moduleId] = moreModules[moduleId];
/******/ 					if(currentUpdatedModulesList) currentUpdatedModulesList.push(moduleId);
/******/ 				}
/******/ 			}
/******/ 			if(runtime) currentUpdateRuntime.push(runtime);
/******/ 			if(waitingUpdateResolves[chunkId]) {
/******/ 				waitingUpdateResolves[chunkId]();
/******/ 				waitingUpdateResolves[chunkId] = undefined;
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		var currentUpdateChunks;
/******/ 		var currentUpdate;
/******/ 		var currentUpdateRemovedChunks;
/******/ 		var currentUpdateRuntime;
/******/ 		function applyHandler(options) {
/******/ 			if (__webpack_require__.f) delete __webpack_require__.f.jsonpHmr;
/******/ 			currentUpdateChunks = undefined;
/******/ 			function getAffectedModuleEffects(updateModuleId) {
/******/ 				var outdatedModules = [updateModuleId];
/******/ 				var outdatedDependencies = {};
/******/ 		
/******/ 				var queue = outdatedModules.map(function (id) {
/******/ 					return {
/******/ 						chain: [id],
/******/ 						id: id
/******/ 					};
/******/ 				});
/******/ 				while (queue.length > 0) {
/******/ 					var queueItem = queue.pop();
/******/ 					var moduleId = queueItem.id;
/******/ 					var chain = queueItem.chain;
/******/ 					var module = __webpack_require__.c[moduleId];
/******/ 					if (
/******/ 						!module ||
/******/ 						(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 					)
/******/ 						continue;
/******/ 					if (module.hot._selfDeclined) {
/******/ 						return {
/******/ 							type: "self-declined",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					if (module.hot._main) {
/******/ 						return {
/******/ 							type: "unaccepted",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					for (var i = 0; i < module.parents.length; i++) {
/******/ 						var parentId = module.parents[i];
/******/ 						var parent = __webpack_require__.c[parentId];
/******/ 						if (!parent) continue;
/******/ 						if (parent.hot._declinedDependencies[moduleId]) {
/******/ 							return {
/******/ 								type: "declined",
/******/ 								chain: chain.concat([parentId]),
/******/ 								moduleId: moduleId,
/******/ 								parentId: parentId
/******/ 							};
/******/ 						}
/******/ 						if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 						if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 							if (!outdatedDependencies[parentId])
/******/ 								outdatedDependencies[parentId] = [];
/******/ 							addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 							continue;
/******/ 						}
/******/ 						delete outdatedDependencies[parentId];
/******/ 						outdatedModules.push(parentId);
/******/ 						queue.push({
/******/ 							chain: chain.concat([parentId]),
/******/ 							id: parentId
/******/ 						});
/******/ 					}
/******/ 				}
/******/ 		
/******/ 				return {
/******/ 					type: "accepted",
/******/ 					moduleId: updateModuleId,
/******/ 					outdatedModules: outdatedModules,
/******/ 					outdatedDependencies: outdatedDependencies
/******/ 				};
/******/ 			}
/******/ 		
/******/ 			function addAllToSet(a, b) {
/******/ 				for (var i = 0; i < b.length; i++) {
/******/ 					var item = b[i];
/******/ 					if (a.indexOf(item) === -1) a.push(item);
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			// at begin all updates modules are outdated
/******/ 			// the "outdated" status can propagate to parents if they don't accept the children
/******/ 			var outdatedDependencies = {};
/******/ 			var outdatedModules = [];
/******/ 			var appliedUpdate = {};
/******/ 		
/******/ 			var warnUnexpectedRequire = function warnUnexpectedRequire(module) {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" + module.id + ") to disposed module"
/******/ 				);
/******/ 			};
/******/ 		
/******/ 			for (var moduleId in currentUpdate) {
/******/ 				if (__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 					var newModuleFactory = currentUpdate[moduleId];
/******/ 					/** @type {TODO} */
/******/ 					var result;
/******/ 					if (newModuleFactory) {
/******/ 						result = getAffectedModuleEffects(moduleId);
/******/ 					} else {
/******/ 						result = {
/******/ 							type: "disposed",
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					/** @type {Error|false} */
/******/ 					var abortError = false;
/******/ 					var doApply = false;
/******/ 					var doDispose = false;
/******/ 					var chainInfo = "";
/******/ 					if (result.chain) {
/******/ 						chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 					}
/******/ 					switch (result.type) {
/******/ 						case "self-declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of self decline: " +
/******/ 										result.moduleId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of declined dependency: " +
/******/ 										result.moduleId +
/******/ 										" in " +
/******/ 										result.parentId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "unaccepted":
/******/ 							if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 							if (!options.ignoreUnaccepted)
/******/ 								abortError = new Error(
/******/ 									"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "accepted":
/******/ 							if (options.onAccepted) options.onAccepted(result);
/******/ 							doApply = true;
/******/ 							break;
/******/ 						case "disposed":
/******/ 							if (options.onDisposed) options.onDisposed(result);
/******/ 							doDispose = true;
/******/ 							break;
/******/ 						default:
/******/ 							throw new Error("Unexception type " + result.type);
/******/ 					}
/******/ 					if (abortError) {
/******/ 						return {
/******/ 							error: abortError
/******/ 						};
/******/ 					}
/******/ 					if (doApply) {
/******/ 						appliedUpdate[moduleId] = newModuleFactory;
/******/ 						addAllToSet(outdatedModules, result.outdatedModules);
/******/ 						for (moduleId in result.outdatedDependencies) {
/******/ 							if (__webpack_require__.o(result.outdatedDependencies, moduleId)) {
/******/ 								if (!outdatedDependencies[moduleId])
/******/ 									outdatedDependencies[moduleId] = [];
/******/ 								addAllToSet(
/******/ 									outdatedDependencies[moduleId],
/******/ 									result.outdatedDependencies[moduleId]
/******/ 								);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 					if (doDispose) {
/******/ 						addAllToSet(outdatedModules, [result.moduleId]);
/******/ 						appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 			currentUpdate = undefined;
/******/ 		
/******/ 			// Store self accepted outdated modules to require them later by the module system
/******/ 			var outdatedSelfAcceptedModules = [];
/******/ 			for (var j = 0; j < outdatedModules.length; j++) {
/******/ 				var outdatedModuleId = outdatedModules[j];
/******/ 				var module = __webpack_require__.c[outdatedModuleId];
/******/ 				if (
/******/ 					module &&
/******/ 					(module.hot._selfAccepted || module.hot._main) &&
/******/ 					// removed self-accepted modules should not be required
/******/ 					appliedUpdate[outdatedModuleId] !== warnUnexpectedRequire &&
/******/ 					// when called invalidate self-accepting is not possible
/******/ 					!module.hot._selfInvalidated
/******/ 				) {
/******/ 					outdatedSelfAcceptedModules.push({
/******/ 						module: outdatedModuleId,
/******/ 						require: module.hot._requireSelf,
/******/ 						errorHandler: module.hot._selfAccepted
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			var moduleOutdatedDependencies;
/******/ 		
/******/ 			return {
/******/ 				dispose: function () {
/******/ 					currentUpdateRemovedChunks.forEach(function (chunkId) {
/******/ 						delete installedChunks[chunkId];
/******/ 					});
/******/ 					currentUpdateRemovedChunks = undefined;
/******/ 		
/******/ 					var idx;
/******/ 					var queue = outdatedModules.slice();
/******/ 					while (queue.length > 0) {
/******/ 						var moduleId = queue.pop();
/******/ 						var module = __webpack_require__.c[moduleId];
/******/ 						if (!module) continue;
/******/ 		
/******/ 						var data = {};
/******/ 		
/******/ 						// Call dispose handlers
/******/ 						var disposeHandlers = module.hot._disposeHandlers;
/******/ 						for (j = 0; j < disposeHandlers.length; j++) {
/******/ 							disposeHandlers[j].call(null, data);
/******/ 						}
/******/ 						__webpack_require__.hmrD[moduleId] = data;
/******/ 		
/******/ 						// disable module (this disables requires from this module)
/******/ 						module.hot.active = false;
/******/ 		
/******/ 						// remove module from cache
/******/ 						delete __webpack_require__.c[moduleId];
/******/ 		
/******/ 						// when disposing there is no need to call dispose handler
/******/ 						delete outdatedDependencies[moduleId];
/******/ 		
/******/ 						// remove "parents" references from all children
/******/ 						for (j = 0; j < module.children.length; j++) {
/******/ 							var child = __webpack_require__.c[module.children[j]];
/******/ 							if (!child) continue;
/******/ 							idx = child.parents.indexOf(moduleId);
/******/ 							if (idx >= 0) {
/******/ 								child.parents.splice(idx, 1);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// remove outdated dependency from module children
/******/ 					var dependency;
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									dependency = moduleOutdatedDependencies[j];
/******/ 									idx = module.children.indexOf(dependency);
/******/ 									if (idx >= 0) module.children.splice(idx, 1);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				},
/******/ 				apply: function (reportError) {
/******/ 					// insert new code
/******/ 					for (var updateModuleId in appliedUpdate) {
/******/ 						if (__webpack_require__.o(appliedUpdate, updateModuleId)) {
/******/ 							__webpack_require__.m[updateModuleId] = appliedUpdate[updateModuleId];
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// run new runtime modules
/******/ 					for (var i = 0; i < currentUpdateRuntime.length; i++) {
/******/ 						currentUpdateRuntime[i](__webpack_require__);
/******/ 					}
/******/ 		
/******/ 					// call accept handlers
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							var module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								var callbacks = [];
/******/ 								var errorHandlers = [];
/******/ 								var dependenciesForCallbacks = [];
/******/ 								for (var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									var dependency = moduleOutdatedDependencies[j];
/******/ 									var acceptCallback =
/******/ 										module.hot._acceptedDependencies[dependency];
/******/ 									var errorHandler =
/******/ 										module.hot._acceptedErrorHandlers[dependency];
/******/ 									if (acceptCallback) {
/******/ 										if (callbacks.indexOf(acceptCallback) !== -1) continue;
/******/ 										callbacks.push(acceptCallback);
/******/ 										errorHandlers.push(errorHandler);
/******/ 										dependenciesForCallbacks.push(dependency);
/******/ 									}
/******/ 								}
/******/ 								for (var k = 0; k < callbacks.length; k++) {
/******/ 									try {
/******/ 										callbacks[k].call(null, moduleOutdatedDependencies);
/******/ 									} catch (err) {
/******/ 										if (typeof errorHandlers[k] === "function") {
/******/ 											try {
/******/ 												errorHandlers[k](err, {
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k]
/******/ 												});
/******/ 											} catch (err2) {
/******/ 												if (options.onErrored) {
/******/ 													options.onErrored({
/******/ 														type: "accept-error-handler-errored",
/******/ 														moduleId: outdatedModuleId,
/******/ 														dependencyId: dependenciesForCallbacks[k],
/******/ 														error: err2,
/******/ 														originalError: err
/******/ 													});
/******/ 												}
/******/ 												if (!options.ignoreErrored) {
/******/ 													reportError(err2);
/******/ 													reportError(err);
/******/ 												}
/******/ 											}
/******/ 										} else {
/******/ 											if (options.onErrored) {
/******/ 												options.onErrored({
/******/ 													type: "accept-errored",
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k],
/******/ 													error: err
/******/ 												});
/******/ 											}
/******/ 											if (!options.ignoreErrored) {
/******/ 												reportError(err);
/******/ 											}
/******/ 										}
/******/ 									}
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// Load self accepted modules
/******/ 					for (var o = 0; o < outdatedSelfAcceptedModules.length; o++) {
/******/ 						var item = outdatedSelfAcceptedModules[o];
/******/ 						var moduleId = item.module;
/******/ 						try {
/******/ 							item.require(moduleId);
/******/ 						} catch (err) {
/******/ 							if (typeof item.errorHandler === "function") {
/******/ 								try {
/******/ 									item.errorHandler(err, {
/******/ 										moduleId: moduleId,
/******/ 										module: __webpack_require__.c[moduleId]
/******/ 									});
/******/ 								} catch (err2) {
/******/ 									if (options.onErrored) {
/******/ 										options.onErrored({
/******/ 											type: "self-accept-error-handler-errored",
/******/ 											moduleId: moduleId,
/******/ 											error: err2,
/******/ 											originalError: err
/******/ 										});
/******/ 									}
/******/ 									if (!options.ignoreErrored) {
/******/ 										reportError(err2);
/******/ 										reportError(err);
/******/ 									}
/******/ 								}
/******/ 							} else {
/******/ 								if (options.onErrored) {
/******/ 									options.onErrored({
/******/ 										type: "self-accept-errored",
/******/ 										moduleId: moduleId,
/******/ 										error: err
/******/ 									});
/******/ 								}
/******/ 								if (!options.ignoreErrored) {
/******/ 									reportError(err);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					return outdatedModules;
/******/ 				}
/******/ 			};
/******/ 		}
/******/ 		__webpack_require__.hmrI.jsonp = function (moduleId, applyHandlers) {
/******/ 			if (!currentUpdate) {
/******/ 				currentUpdate = {};
/******/ 				currentUpdateRuntime = [];
/******/ 				currentUpdateRemovedChunks = [];
/******/ 				applyHandlers.push(applyHandler);
/******/ 			}
/******/ 			if (!__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 				currentUpdate[moduleId] = __webpack_require__.m[moduleId];
/******/ 			}
/******/ 		};
/******/ 		__webpack_require__.hmrC.jsonp = function (
/******/ 			chunkIds,
/******/ 			removedChunks,
/******/ 			removedModules,
/******/ 			promises,
/******/ 			applyHandlers,
/******/ 			updatedModulesList
/******/ 		) {
/******/ 			applyHandlers.push(applyHandler);
/******/ 			currentUpdateChunks = {};
/******/ 			currentUpdateRemovedChunks = removedChunks;
/******/ 			currentUpdate = removedModules.reduce(function (obj, key) {
/******/ 				obj[key] = false;
/******/ 				return obj;
/******/ 			}, {});
/******/ 			currentUpdateRuntime = [];
/******/ 			chunkIds.forEach(function (chunkId) {
/******/ 				if (
/******/ 					__webpack_require__.o(installedChunks, chunkId) &&
/******/ 					installedChunks[chunkId] !== undefined
/******/ 				) {
/******/ 					promises.push(loadUpdateChunk(chunkId, updatedModulesList));
/******/ 					currentUpdateChunks[chunkId] = true;
/******/ 				} else {
/******/ 					currentUpdateChunks[chunkId] = false;
/******/ 				}
/******/ 			});
/******/ 			if (__webpack_require__.f) {
/******/ 				__webpack_require__.f.jsonpHmr = function (chunkId, promises) {
/******/ 					if (
/******/ 						currentUpdateChunks &&
/******/ 						__webpack_require__.o(currentUpdateChunks, chunkId) &&
/******/ 						!currentUpdateChunks[chunkId]
/******/ 					) {
/******/ 						promises.push(loadUpdateChunk(chunkId));
/******/ 						currentUpdateChunks[chunkId] = true;
/******/ 					}
/******/ 				};
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.hmrM = () => {
/******/ 			if (typeof fetch === "undefined") throw new Error("No browser support: need fetch API");
/******/ 			return fetch(__webpack_require__.p + __webpack_require__.hmrF()).then((response) => {
/******/ 				if(response.status === 404) return; // no update available
/******/ 				if(!response.ok) throw new Error("Failed to fetch update manifest " + response.statusText);
/******/ 				return response.json();
/******/ 			});
/******/ 		};
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	__webpack_require__("./node_modules/webpack-dev-server/client/index.js?protocol=ws%3A&hostname=0.0.0.0&port=8080&pathname=%2Fws&logging=info&overlay=true&reconnect=10&hot=true&live-reload=true");
/******/ 	__webpack_require__("./node_modules/webpack/hot/dev-server.js");
/******/ 	__webpack_require__("./app/index.js");
/******/ 	var __webpack_exports__ = __webpack_require__("./styles/index.scss");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFZOztBQUVaQSxNQUFNLENBQUNDLE9BQU8sR0FBR0MsUUFBUTs7QUFFekI7QUFDQSxJQUFJQyxRQUFRLEdBQUcsc0ZBQXNGO0FBRXJHLElBQUlDLFVBQVUsR0FBRztFQUNmQyxLQUFLLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDO0VBQUU7RUFDdkJDLEtBQUssRUFBRSxLQUFLO0VBQ1pDLEdBQUcsRUFBRSxRQUFRO0VBQ2JDLEtBQUssRUFBRSxRQUFRO0VBQ2ZDLE1BQU0sRUFBRSxRQUFRO0VBQ2hCQyxJQUFJLEVBQUUsUUFBUTtFQUNkQyxPQUFPLEVBQUUsUUFBUTtFQUNqQkMsSUFBSSxFQUFFLFFBQVE7RUFDZEMsU0FBUyxFQUFFLFFBQVE7RUFDbkJDLFFBQVEsRUFBRTtBQUNaLENBQUM7QUFDRCxJQUFJQyxPQUFPLEdBQUc7RUFDWixFQUFFLEVBQUUsT0FBTztFQUNYLEVBQUUsRUFBRSxLQUFLO0VBQ1QsRUFBRSxFQUFFLE9BQU87RUFDWCxFQUFFLEVBQUUsUUFBUTtFQUNaLEVBQUUsRUFBRSxNQUFNO0VBQ1YsRUFBRSxFQUFFLFNBQVM7RUFDYixFQUFFLEVBQUUsTUFBTTtFQUNWLEVBQUUsRUFBRTtBQUNOLENBQUM7QUFDRCxJQUFJQyxTQUFTLEdBQUc7RUFDZCxHQUFHLEVBQUUsa0JBQWtCO0VBQUU7RUFDekIsR0FBRyxFQUFFLGFBQWE7RUFBRTtFQUNwQixHQUFHLEVBQUUsS0FBSztFQUFFO0VBQ1osR0FBRyxFQUFFLEtBQUs7RUFBRTtFQUNaLEdBQUcsRUFBRSxjQUFjO0VBQUU7RUFDckIsR0FBRyxFQUFFLE9BQU8sQ0FBQztBQUNmLENBQUM7QUFDRCxJQUFJQyxVQUFVLEdBQUc7RUFDZixJQUFJLEVBQUUsTUFBTTtFQUFFO0VBQ2QsSUFBSSxFQUFFLE1BQU07RUFBRTtFQUNkLElBQUksRUFBRSxRQUFRLENBQUM7QUFDakIsQ0FBQztBQUVBLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUNDLE9BQU8sQ0FBQyxVQUFVQyxDQUFDLEVBQUU7RUFDaERGLFVBQVUsQ0FBQ0UsQ0FBQyxDQUFDLEdBQUcsU0FBUztBQUMzQixDQUFDLENBQUM7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVNqQixRQUFRQSxDQUFFa0IsSUFBSSxFQUFFO0VBQ3ZCO0VBQ0EsSUFBSSxDQUFDakIsUUFBUSxDQUFDa0IsSUFBSSxDQUFDRCxJQUFJLENBQUMsRUFBRTtJQUN4QixPQUFPQSxJQUFJO0VBQ2I7O0VBRUE7RUFDQSxJQUFJRSxTQUFTLEdBQUcsRUFBRTtFQUNsQjtFQUNBLElBQUlDLEdBQUcsR0FBR0gsSUFBSSxDQUFDSSxPQUFPLENBQUMsZUFBZSxFQUFFLFVBQVVDLEtBQUssRUFBRUMsR0FBRyxFQUFFO0lBQzVELElBQUlDLEVBQUUsR0FBR1gsU0FBUyxDQUFDVSxHQUFHLENBQUM7SUFDdkIsSUFBSUMsRUFBRSxFQUFFO01BQ047TUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDTCxTQUFTLENBQUNNLE9BQU8sQ0FBQ0YsR0FBRyxDQUFDLEVBQUU7UUFBRTtRQUMvQkosU0FBUyxDQUFDTyxHQUFHLENBQUMsQ0FBQztRQUNmLE9BQU8sU0FBUztNQUNsQjtNQUNBO01BQ0FQLFNBQVMsQ0FBQ1EsSUFBSSxDQUFDSixHQUFHLENBQUM7TUFDbkIsT0FBT0MsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsR0FBR0EsRUFBRSxHQUFHLGVBQWUsR0FBR0EsRUFBRSxHQUFHLEtBQUs7SUFDMUQ7SUFFQSxJQUFJSSxFQUFFLEdBQUdkLFVBQVUsQ0FBQ1MsR0FBRyxDQUFDO0lBQ3hCLElBQUlLLEVBQUUsRUFBRTtNQUNOO01BQ0FULFNBQVMsQ0FBQ08sR0FBRyxDQUFDLENBQUM7TUFDZixPQUFPRSxFQUFFO0lBQ1g7SUFDQSxPQUFPLEVBQUU7RUFDWCxDQUFDLENBQUM7O0VBRUY7RUFDQSxJQUFJQyxDQUFDLEdBQUdWLFNBQVMsQ0FBQ1csTUFBTTtFQUN0QkQsQ0FBQyxHQUFHLENBQUMsS0FBTVQsR0FBRyxJQUFJVyxLQUFLLENBQUNGLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQ0csSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0VBRWpELE9BQU9aLEdBQUc7QUFDWjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBckIsUUFBUSxDQUFDa0MsU0FBUyxHQUFHLFVBQVVDLE1BQU0sRUFBRTtFQUNyQyxJQUFJLE9BQU9BLE1BQU0sS0FBSyxRQUFRLEVBQUU7SUFDOUIsTUFBTSxJQUFJQyxLQUFLLENBQUMsdUNBQXVDLENBQUM7RUFDMUQ7RUFFQSxJQUFJQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO0VBQ3JCLEtBQUssSUFBSUMsR0FBRyxJQUFJcEMsVUFBVSxFQUFFO0lBQzFCLElBQUlxQyxHQUFHLEdBQUdKLE1BQU0sQ0FBQ0ssY0FBYyxDQUFDRixHQUFHLENBQUMsR0FBR0gsTUFBTSxDQUFDRyxHQUFHLENBQUMsR0FBRyxJQUFJO0lBQ3pELElBQUksQ0FBQ0MsR0FBRyxFQUFFO01BQ1JGLFlBQVksQ0FBQ0MsR0FBRyxDQUFDLEdBQUdwQyxVQUFVLENBQUNvQyxHQUFHLENBQUM7TUFDbkM7SUFDRjtJQUNBLElBQUksT0FBTyxLQUFLQSxHQUFHLEVBQUU7TUFDbkIsSUFBSSxPQUFPQyxHQUFHLEtBQUssUUFBUSxFQUFFO1FBQzNCQSxHQUFHLEdBQUcsQ0FBQ0EsR0FBRyxDQUFDO01BQ2I7TUFDQSxJQUFJLENBQUNQLEtBQUssQ0FBQ1MsT0FBTyxDQUFDRixHQUFHLENBQUMsSUFBSUEsR0FBRyxDQUFDUixNQUFNLEtBQUssQ0FBQyxJQUFJUSxHQUFHLENBQUNHLElBQUksQ0FBQyxVQUFVQyxDQUFDLEVBQUU7UUFDbkUsT0FBTyxPQUFPQSxDQUFDLEtBQUssUUFBUTtNQUM5QixDQUFDLENBQUMsRUFBRTtRQUNGLE1BQU0sSUFBSVAsS0FBSyxDQUFDLGdCQUFnQixHQUFHRSxHQUFHLEdBQUcsb0ZBQW9GLENBQUM7TUFDaEk7TUFDQSxJQUFJTSxXQUFXLEdBQUcxQyxVQUFVLENBQUNvQyxHQUFHLENBQUM7TUFDakMsSUFBSSxDQUFDQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDWEEsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHSyxXQUFXLENBQUMsQ0FBQyxDQUFDO01BQ3pCO01BQ0EsSUFBSUwsR0FBRyxDQUFDUixNQUFNLEtBQUssQ0FBQyxJQUFJLENBQUNRLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTtRQUMvQkEsR0FBRyxHQUFHLENBQUNBLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNkQSxHQUFHLENBQUNYLElBQUksQ0FBQ2dCLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztNQUMxQjtNQUVBTCxHQUFHLEdBQUdBLEdBQUcsQ0FBQ00sS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDdkIsQ0FBQyxNQUFNLElBQUksT0FBT04sR0FBRyxLQUFLLFFBQVEsRUFBRTtNQUNsQyxNQUFNLElBQUlILEtBQUssQ0FBQyxnQkFBZ0IsR0FBR0UsR0FBRyxHQUFHLCtDQUErQyxDQUFDO0lBQzNGO0lBQ0FELFlBQVksQ0FBQ0MsR0FBRyxDQUFDLEdBQUdDLEdBQUc7RUFDekI7RUFDQU8sUUFBUSxDQUFDVCxZQUFZLENBQUM7QUFDeEIsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQXJDLFFBQVEsQ0FBQ0csS0FBSyxHQUFHLFlBQVk7RUFDM0IyQyxRQUFRLENBQUM1QyxVQUFVLENBQUM7QUFDdEIsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBRixRQUFRLENBQUMrQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO0FBRWxCLElBQUlDLE1BQU0sQ0FBQ0MsY0FBYyxFQUFFO0VBQ3pCRCxNQUFNLENBQUNDLGNBQWMsQ0FBQ2pELFFBQVEsQ0FBQytDLElBQUksRUFBRSxNQUFNLEVBQUU7SUFDM0NHLEdBQUcsRUFBRSxTQUFBQSxDQUFBLEVBQVk7TUFBRSxPQUFPcEMsU0FBUztJQUFDO0VBQ3RDLENBQUMsQ0FBQztFQUNGa0MsTUFBTSxDQUFDQyxjQUFjLENBQUNqRCxRQUFRLENBQUMrQyxJQUFJLEVBQUUsT0FBTyxFQUFFO0lBQzVDRyxHQUFHLEVBQUUsU0FBQUEsQ0FBQSxFQUFZO01BQUUsT0FBT25DLFVBQVU7SUFBQztFQUN2QyxDQUFDLENBQUM7QUFDSixDQUFDLE1BQU07RUFDTGYsUUFBUSxDQUFDK0MsSUFBSSxDQUFDSSxJQUFJLEdBQUdyQyxTQUFTO0VBQzlCZCxRQUFRLENBQUMrQyxJQUFJLENBQUNLLEtBQUssR0FBR3JDLFVBQVU7QUFDbEM7QUFFQSxTQUFTK0IsUUFBUUEsQ0FBRVgsTUFBTSxFQUFFO0VBQ3pCO0VBQ0FyQixTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsc0NBQXNDLEdBQUdxQixNQUFNLENBQUNoQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsZUFBZSxHQUFHZ0MsTUFBTSxDQUFDaEMsS0FBSyxDQUFDLENBQUMsQ0FBQztFQUM3RztFQUNBVyxTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsU0FBUyxHQUFHcUIsTUFBTSxDQUFDaEMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLGVBQWUsR0FBR2dDLE1BQU0sQ0FBQ2hDLEtBQUssQ0FBQyxDQUFDLENBQUM7RUFDaEY7RUFDQVcsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLFNBQVMsR0FBR3FCLE1BQU0sQ0FBQ3ZCLFFBQVE7RUFFN0MsS0FBSyxJQUFJeUMsSUFBSSxJQUFJeEMsT0FBTyxFQUFFO0lBQ3hCLElBQUl5QyxLQUFLLEdBQUd6QyxPQUFPLENBQUN3QyxJQUFJLENBQUM7SUFDekIsSUFBSUUsUUFBUSxHQUFHcEIsTUFBTSxDQUFDbUIsS0FBSyxDQUFDLElBQUksS0FBSztJQUNyQ3hDLFNBQVMsQ0FBQ3VDLElBQUksQ0FBQyxHQUFHLFNBQVMsR0FBR0UsUUFBUTtJQUN0Q0YsSUFBSSxHQUFHRyxRQUFRLENBQUNILElBQUksQ0FBQztJQUNyQnZDLFNBQVMsQ0FBQyxDQUFDdUMsSUFBSSxHQUFHLEVBQUUsRUFBRUksUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLGNBQWMsR0FBR0YsUUFBUTtFQUMvRDtBQUNGO0FBRUF2RCxRQUFRLENBQUNHLEtBQUssQ0FBQyxDQUFDOzs7Ozs7Ozs7OztBQy9LaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYixJQUFJdUQsQ0FBQyxHQUFHLE9BQU9DLE9BQU8sS0FBSyxRQUFRLEdBQUdBLE9BQU8sR0FBRyxJQUFJO0FBQ3BELElBQUlDLFlBQVksR0FBR0YsQ0FBQyxJQUFJLE9BQU9BLENBQUMsQ0FBQ0csS0FBSyxLQUFLLFVBQVUsR0FDakRILENBQUMsQ0FBQ0csS0FBSyxHQUNQLFNBQVNELFlBQVlBLENBQUNFLE1BQU0sRUFBRUMsUUFBUSxFQUFFQyxJQUFJLEVBQUU7RUFDOUMsT0FBT0MsUUFBUSxDQUFDQyxTQUFTLENBQUNMLEtBQUssQ0FBQ00sSUFBSSxDQUFDTCxNQUFNLEVBQUVDLFFBQVEsRUFBRUMsSUFBSSxDQUFDO0FBQzlELENBQUM7QUFFSCxJQUFJSSxjQUFjO0FBQ2xCLElBQUlWLENBQUMsSUFBSSxPQUFPQSxDQUFDLENBQUNXLE9BQU8sS0FBSyxVQUFVLEVBQUU7RUFDeENELGNBQWMsR0FBR1YsQ0FBQyxDQUFDVyxPQUFPO0FBQzVCLENBQUMsTUFBTSxJQUFJckIsTUFBTSxDQUFDc0IscUJBQXFCLEVBQUU7RUFDdkNGLGNBQWMsR0FBRyxTQUFTQSxjQUFjQSxDQUFDTixNQUFNLEVBQUU7SUFDL0MsT0FBT2QsTUFBTSxDQUFDdUIsbUJBQW1CLENBQUNULE1BQU0sQ0FBQyxDQUN0Q1UsTUFBTSxDQUFDeEIsTUFBTSxDQUFDc0IscUJBQXFCLENBQUNSLE1BQU0sQ0FBQyxDQUFDO0VBQ2pELENBQUM7QUFDSCxDQUFDLE1BQU07RUFDTE0sY0FBYyxHQUFHLFNBQVNBLGNBQWNBLENBQUNOLE1BQU0sRUFBRTtJQUMvQyxPQUFPZCxNQUFNLENBQUN1QixtQkFBbUIsQ0FBQ1QsTUFBTSxDQUFDO0VBQzNDLENBQUM7QUFDSDtBQUVBLFNBQVNXLGtCQUFrQkEsQ0FBQ0MsT0FBTyxFQUFFO0VBQ25DLElBQUlDLE9BQU8sSUFBSUEsT0FBTyxDQUFDQyxJQUFJLEVBQUVELE9BQU8sQ0FBQ0MsSUFBSSxDQUFDRixPQUFPLENBQUM7QUFDcEQ7QUFFQSxJQUFJRyxXQUFXLEdBQUdDLE1BQU0sQ0FBQ0MsS0FBSyxJQUFJLFNBQVNGLFdBQVdBLENBQUNHLEtBQUssRUFBRTtFQUM1RCxPQUFPQSxLQUFLLEtBQUtBLEtBQUs7QUFDeEIsQ0FBQztBQUVELFNBQVNDLFlBQVlBLENBQUEsRUFBRztFQUN0QkEsWUFBWSxDQUFDQyxJQUFJLENBQUNmLElBQUksQ0FBQyxJQUFJLENBQUM7QUFDOUI7QUFDQXJFLE1BQU0sQ0FBQ0MsT0FBTyxHQUFHa0YsWUFBWTtBQUM3Qm5GLG1CQUFtQixHQUFHcUYsSUFBSTs7QUFFMUI7QUFDQUYsWUFBWSxDQUFDQSxZQUFZLEdBQUdBLFlBQVk7QUFFeENBLFlBQVksQ0FBQ2YsU0FBUyxDQUFDa0IsT0FBTyxHQUFHQyxTQUFTO0FBQzFDSixZQUFZLENBQUNmLFNBQVMsQ0FBQ29CLFlBQVksR0FBRyxDQUFDO0FBQ3ZDTCxZQUFZLENBQUNmLFNBQVMsQ0FBQ3FCLGFBQWEsR0FBR0YsU0FBUzs7QUFFaEQ7QUFDQTtBQUNBLElBQUlHLG1CQUFtQixHQUFHLEVBQUU7QUFFNUIsU0FBU0MsYUFBYUEsQ0FBQ0MsUUFBUSxFQUFFO0VBQy9CLElBQUksT0FBT0EsUUFBUSxLQUFLLFVBQVUsRUFBRTtJQUNsQyxNQUFNLElBQUlDLFNBQVMsQ0FBQyxrRUFBa0UsR0FBRyxPQUFPRCxRQUFRLENBQUM7RUFDM0c7QUFDRjtBQUVBMUMsTUFBTSxDQUFDQyxjQUFjLENBQUNnQyxZQUFZLEVBQUUscUJBQXFCLEVBQUU7RUFDekRXLFVBQVUsRUFBRSxJQUFJO0VBQ2hCMUMsR0FBRyxFQUFFLFNBQUFBLENBQUEsRUFBVztJQUNkLE9BQU9zQyxtQkFBbUI7RUFDNUIsQ0FBQztFQUNESyxHQUFHLEVBQUUsU0FBQUEsQ0FBU0MsR0FBRyxFQUFFO0lBQ2pCLElBQUksT0FBT0EsR0FBRyxLQUFLLFFBQVEsSUFBSUEsR0FBRyxHQUFHLENBQUMsSUFBSWpCLFdBQVcsQ0FBQ2lCLEdBQUcsQ0FBQyxFQUFFO01BQzFELE1BQU0sSUFBSUMsVUFBVSxDQUFDLGlHQUFpRyxHQUFHRCxHQUFHLEdBQUcsR0FBRyxDQUFDO0lBQ3JJO0lBQ0FOLG1CQUFtQixHQUFHTSxHQUFHO0VBQzNCO0FBQ0YsQ0FBQyxDQUFDO0FBRUZiLFlBQVksQ0FBQ0MsSUFBSSxHQUFHLFlBQVc7RUFFN0IsSUFBSSxJQUFJLENBQUNFLE9BQU8sS0FBS0MsU0FBUyxJQUMxQixJQUFJLENBQUNELE9BQU8sS0FBS3BDLE1BQU0sQ0FBQ2dELGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQ1osT0FBTyxFQUFFO0lBQ3hELElBQUksQ0FBQ0EsT0FBTyxHQUFHcEMsTUFBTSxDQUFDaUQsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNsQyxJQUFJLENBQUNYLFlBQVksR0FBRyxDQUFDO0VBQ3ZCO0VBRUEsSUFBSSxDQUFDQyxhQUFhLEdBQUcsSUFBSSxDQUFDQSxhQUFhLElBQUlGLFNBQVM7QUFDdEQsQ0FBQzs7QUFFRDtBQUNBO0FBQ0FKLFlBQVksQ0FBQ2YsU0FBUyxDQUFDZ0MsZUFBZSxHQUFHLFNBQVNBLGVBQWVBLENBQUNqRixDQUFDLEVBQUU7RUFDbkUsSUFBSSxPQUFPQSxDQUFDLEtBQUssUUFBUSxJQUFJQSxDQUFDLEdBQUcsQ0FBQyxJQUFJNEQsV0FBVyxDQUFDNUQsQ0FBQyxDQUFDLEVBQUU7SUFDcEQsTUFBTSxJQUFJOEUsVUFBVSxDQUFDLCtFQUErRSxHQUFHOUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQztFQUNqSDtFQUNBLElBQUksQ0FBQ3NFLGFBQWEsR0FBR3RFLENBQUM7RUFDdEIsT0FBTyxJQUFJO0FBQ2IsQ0FBQztBQUVELFNBQVNrRixnQkFBZ0JBLENBQUNDLElBQUksRUFBRTtFQUM5QixJQUFJQSxJQUFJLENBQUNiLGFBQWEsS0FBS0YsU0FBUyxFQUNsQyxPQUFPSixZQUFZLENBQUNPLG1CQUFtQjtFQUN6QyxPQUFPWSxJQUFJLENBQUNiLGFBQWE7QUFDM0I7QUFFQU4sWUFBWSxDQUFDZixTQUFTLENBQUNtQyxlQUFlLEdBQUcsU0FBU0EsZUFBZUEsQ0FBQSxFQUFHO0VBQ2xFLE9BQU9GLGdCQUFnQixDQUFDLElBQUksQ0FBQztBQUMvQixDQUFDO0FBRURsQixZQUFZLENBQUNmLFNBQVMsQ0FBQ29DLElBQUksR0FBRyxTQUFTQSxJQUFJQSxDQUFDQyxJQUFJLEVBQUU7RUFDaEQsSUFBSXZDLElBQUksR0FBRyxFQUFFO0VBQ2IsS0FBSyxJQUFJd0MsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHQyxTQUFTLENBQUMxRSxNQUFNLEVBQUV5RSxDQUFDLEVBQUUsRUFBRXhDLElBQUksQ0FBQ3BDLElBQUksQ0FBQzZFLFNBQVMsQ0FBQ0QsQ0FBQyxDQUFDLENBQUM7RUFDbEUsSUFBSUUsT0FBTyxHQUFJSCxJQUFJLEtBQUssT0FBUTtFQUVoQyxJQUFJSSxNQUFNLEdBQUcsSUFBSSxDQUFDdkIsT0FBTztFQUN6QixJQUFJdUIsTUFBTSxLQUFLdEIsU0FBUyxFQUN0QnFCLE9BQU8sR0FBSUEsT0FBTyxJQUFJQyxNQUFNLENBQUNDLEtBQUssS0FBS3ZCLFNBQVUsQ0FBQyxLQUMvQyxJQUFJLENBQUNxQixPQUFPLEVBQ2YsT0FBTyxLQUFLOztFQUVkO0VBQ0EsSUFBSUEsT0FBTyxFQUFFO0lBQ1gsSUFBSUcsRUFBRTtJQUNOLElBQUk3QyxJQUFJLENBQUNqQyxNQUFNLEdBQUcsQ0FBQyxFQUNqQjhFLEVBQUUsR0FBRzdDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDZCxJQUFJNkMsRUFBRSxZQUFZekUsS0FBSyxFQUFFO01BQ3ZCO01BQ0E7TUFDQSxNQUFNeUUsRUFBRSxDQUFDLENBQUM7SUFDWjtJQUNBO0lBQ0EsSUFBSUMsR0FBRyxHQUFHLElBQUkxRSxLQUFLLENBQUMsa0JBQWtCLElBQUl5RSxFQUFFLEdBQUcsSUFBSSxHQUFHQSxFQUFFLENBQUNFLE9BQU8sR0FBRyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDN0VELEdBQUcsQ0FBQ0UsT0FBTyxHQUFHSCxFQUFFO0lBQ2hCLE1BQU1DLEdBQUcsQ0FBQyxDQUFDO0VBQ2I7RUFFQSxJQUFJRyxPQUFPLEdBQUdOLE1BQU0sQ0FBQ0osSUFBSSxDQUFDO0VBRTFCLElBQUlVLE9BQU8sS0FBSzVCLFNBQVMsRUFDdkIsT0FBTyxLQUFLO0VBRWQsSUFBSSxPQUFPNEIsT0FBTyxLQUFLLFVBQVUsRUFBRTtJQUNqQ3JELFlBQVksQ0FBQ3FELE9BQU8sRUFBRSxJQUFJLEVBQUVqRCxJQUFJLENBQUM7RUFDbkMsQ0FBQyxNQUFNO0lBQ0wsSUFBSWtELEdBQUcsR0FBR0QsT0FBTyxDQUFDbEYsTUFBTTtJQUN4QixJQUFJb0YsU0FBUyxHQUFHQyxVQUFVLENBQUNILE9BQU8sRUFBRUMsR0FBRyxDQUFDO0lBQ3hDLEtBQUssSUFBSVYsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHVSxHQUFHLEVBQUUsRUFBRVYsQ0FBQyxFQUMxQjVDLFlBQVksQ0FBQ3VELFNBQVMsQ0FBQ1gsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFeEMsSUFBSSxDQUFDO0VBQzFDO0VBRUEsT0FBTyxJQUFJO0FBQ2IsQ0FBQztBQUVELFNBQVNxRCxZQUFZQSxDQUFDdkQsTUFBTSxFQUFFeUMsSUFBSSxFQUFFYixRQUFRLEVBQUU0QixPQUFPLEVBQUU7RUFDckQsSUFBSUMsQ0FBQztFQUNMLElBQUlaLE1BQU07RUFDVixJQUFJYSxRQUFRO0VBRVovQixhQUFhLENBQUNDLFFBQVEsQ0FBQztFQUV2QmlCLE1BQU0sR0FBRzdDLE1BQU0sQ0FBQ3NCLE9BQU87RUFDdkIsSUFBSXVCLE1BQU0sS0FBS3RCLFNBQVMsRUFBRTtJQUN4QnNCLE1BQU0sR0FBRzdDLE1BQU0sQ0FBQ3NCLE9BQU8sR0FBR3BDLE1BQU0sQ0FBQ2lELE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDN0NuQyxNQUFNLENBQUN3QixZQUFZLEdBQUcsQ0FBQztFQUN6QixDQUFDLE1BQU07SUFDTDtJQUNBO0lBQ0EsSUFBSXFCLE1BQU0sQ0FBQ2MsV0FBVyxLQUFLcEMsU0FBUyxFQUFFO01BQ3BDdkIsTUFBTSxDQUFDd0MsSUFBSSxDQUFDLGFBQWEsRUFBRUMsSUFBSSxFQUNuQmIsUUFBUSxDQUFDQSxRQUFRLEdBQUdBLFFBQVEsQ0FBQ0EsUUFBUSxHQUFHQSxRQUFRLENBQUM7O01BRTdEO01BQ0E7TUFDQWlCLE1BQU0sR0FBRzdDLE1BQU0sQ0FBQ3NCLE9BQU87SUFDekI7SUFDQW9DLFFBQVEsR0FBR2IsTUFBTSxDQUFDSixJQUFJLENBQUM7RUFDekI7RUFFQSxJQUFJaUIsUUFBUSxLQUFLbkMsU0FBUyxFQUFFO0lBQzFCO0lBQ0FtQyxRQUFRLEdBQUdiLE1BQU0sQ0FBQ0osSUFBSSxDQUFDLEdBQUdiLFFBQVE7SUFDbEMsRUFBRTVCLE1BQU0sQ0FBQ3dCLFlBQVk7RUFDdkIsQ0FBQyxNQUFNO0lBQ0wsSUFBSSxPQUFPa0MsUUFBUSxLQUFLLFVBQVUsRUFBRTtNQUNsQztNQUNBQSxRQUFRLEdBQUdiLE1BQU0sQ0FBQ0osSUFBSSxDQUFDLEdBQ3JCZSxPQUFPLEdBQUcsQ0FBQzVCLFFBQVEsRUFBRThCLFFBQVEsQ0FBQyxHQUFHLENBQUNBLFFBQVEsRUFBRTlCLFFBQVEsQ0FBQztNQUN2RDtJQUNGLENBQUMsTUFBTSxJQUFJNEIsT0FBTyxFQUFFO01BQ2xCRSxRQUFRLENBQUNFLE9BQU8sQ0FBQ2hDLFFBQVEsQ0FBQztJQUM1QixDQUFDLE1BQU07TUFDTDhCLFFBQVEsQ0FBQzVGLElBQUksQ0FBQzhELFFBQVEsQ0FBQztJQUN6Qjs7SUFFQTtJQUNBNkIsQ0FBQyxHQUFHcEIsZ0JBQWdCLENBQUNyQyxNQUFNLENBQUM7SUFDNUIsSUFBSXlELENBQUMsR0FBRyxDQUFDLElBQUlDLFFBQVEsQ0FBQ3pGLE1BQU0sR0FBR3dGLENBQUMsSUFBSSxDQUFDQyxRQUFRLENBQUNHLE1BQU0sRUFBRTtNQUNwREgsUUFBUSxDQUFDRyxNQUFNLEdBQUcsSUFBSTtNQUN0QjtNQUNBO01BQ0EsSUFBSUMsQ0FBQyxHQUFHLElBQUl4RixLQUFLLENBQUMsOENBQThDLEdBQzVDb0YsUUFBUSxDQUFDekYsTUFBTSxHQUFHLEdBQUcsR0FBRzhGLE1BQU0sQ0FBQ3RCLElBQUksQ0FBQyxHQUFHLGFBQWEsR0FDcEQsMENBQTBDLEdBQzFDLGdCQUFnQixDQUFDO01BQ3JDcUIsQ0FBQyxDQUFDRSxJQUFJLEdBQUcsNkJBQTZCO01BQ3RDRixDQUFDLENBQUNHLE9BQU8sR0FBR2pFLE1BQU07TUFDbEI4RCxDQUFDLENBQUNyQixJQUFJLEdBQUdBLElBQUk7TUFDYnFCLENBQUMsQ0FBQ0ksS0FBSyxHQUFHUixRQUFRLENBQUN6RixNQUFNO01BQ3pCMEMsa0JBQWtCLENBQUNtRCxDQUFDLENBQUM7SUFDdkI7RUFDRjtFQUVBLE9BQU85RCxNQUFNO0FBQ2Y7QUFFQW1CLFlBQVksQ0FBQ2YsU0FBUyxDQUFDK0QsV0FBVyxHQUFHLFNBQVNBLFdBQVdBLENBQUMxQixJQUFJLEVBQUViLFFBQVEsRUFBRTtFQUN4RSxPQUFPMkIsWUFBWSxDQUFDLElBQUksRUFBRWQsSUFBSSxFQUFFYixRQUFRLEVBQUUsS0FBSyxDQUFDO0FBQ2xELENBQUM7QUFFRFQsWUFBWSxDQUFDZixTQUFTLENBQUNnRSxFQUFFLEdBQUdqRCxZQUFZLENBQUNmLFNBQVMsQ0FBQytELFdBQVc7QUFFOURoRCxZQUFZLENBQUNmLFNBQVMsQ0FBQ2lFLGVBQWUsR0FDbEMsU0FBU0EsZUFBZUEsQ0FBQzVCLElBQUksRUFBRWIsUUFBUSxFQUFFO0VBQ3ZDLE9BQU8yQixZQUFZLENBQUMsSUFBSSxFQUFFZCxJQUFJLEVBQUViLFFBQVEsRUFBRSxJQUFJLENBQUM7QUFDakQsQ0FBQztBQUVMLFNBQVMwQyxXQUFXQSxDQUFBLEVBQUc7RUFDckIsSUFBSSxDQUFDLElBQUksQ0FBQ0MsS0FBSyxFQUFFO0lBQ2YsSUFBSSxDQUFDdkUsTUFBTSxDQUFDd0UsY0FBYyxDQUFDLElBQUksQ0FBQy9CLElBQUksRUFBRSxJQUFJLENBQUNnQyxNQUFNLENBQUM7SUFDbEQsSUFBSSxDQUFDRixLQUFLLEdBQUcsSUFBSTtJQUNqQixJQUFJNUIsU0FBUyxDQUFDMUUsTUFBTSxLQUFLLENBQUMsRUFDeEIsT0FBTyxJQUFJLENBQUMyRCxRQUFRLENBQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDTCxNQUFNLENBQUM7SUFDeEMsT0FBTyxJQUFJLENBQUM0QixRQUFRLENBQUM3QixLQUFLLENBQUMsSUFBSSxDQUFDQyxNQUFNLEVBQUUyQyxTQUFTLENBQUM7RUFDcEQ7QUFDRjtBQUVBLFNBQVMrQixTQUFTQSxDQUFDMUUsTUFBTSxFQUFFeUMsSUFBSSxFQUFFYixRQUFRLEVBQUU7RUFDekMsSUFBSStDLEtBQUssR0FBRztJQUFFSixLQUFLLEVBQUUsS0FBSztJQUFFRSxNQUFNLEVBQUVsRCxTQUFTO0lBQUV2QixNQUFNLEVBQUVBLE1BQU07SUFBRXlDLElBQUksRUFBRUEsSUFBSTtJQUFFYixRQUFRLEVBQUVBO0VBQVMsQ0FBQztFQUMvRixJQUFJZ0QsT0FBTyxHQUFHTixXQUFXLENBQUNPLElBQUksQ0FBQ0YsS0FBSyxDQUFDO0VBQ3JDQyxPQUFPLENBQUNoRCxRQUFRLEdBQUdBLFFBQVE7RUFDM0IrQyxLQUFLLENBQUNGLE1BQU0sR0FBR0csT0FBTztFQUN0QixPQUFPQSxPQUFPO0FBQ2hCO0FBRUF6RCxZQUFZLENBQUNmLFNBQVMsQ0FBQ2lCLElBQUksR0FBRyxTQUFTQSxJQUFJQSxDQUFDb0IsSUFBSSxFQUFFYixRQUFRLEVBQUU7RUFDMURELGFBQWEsQ0FBQ0MsUUFBUSxDQUFDO0VBQ3ZCLElBQUksQ0FBQ3dDLEVBQUUsQ0FBQzNCLElBQUksRUFBRWlDLFNBQVMsQ0FBQyxJQUFJLEVBQUVqQyxJQUFJLEVBQUViLFFBQVEsQ0FBQyxDQUFDO0VBQzlDLE9BQU8sSUFBSTtBQUNiLENBQUM7QUFFRFQsWUFBWSxDQUFDZixTQUFTLENBQUMwRSxtQkFBbUIsR0FDdEMsU0FBU0EsbUJBQW1CQSxDQUFDckMsSUFBSSxFQUFFYixRQUFRLEVBQUU7RUFDM0NELGFBQWEsQ0FBQ0MsUUFBUSxDQUFDO0VBQ3ZCLElBQUksQ0FBQ3lDLGVBQWUsQ0FBQzVCLElBQUksRUFBRWlDLFNBQVMsQ0FBQyxJQUFJLEVBQUVqQyxJQUFJLEVBQUViLFFBQVEsQ0FBQyxDQUFDO0VBQzNELE9BQU8sSUFBSTtBQUNiLENBQUM7O0FBRUw7QUFDQVQsWUFBWSxDQUFDZixTQUFTLENBQUNvRSxjQUFjLEdBQ2pDLFNBQVNBLGNBQWNBLENBQUMvQixJQUFJLEVBQUViLFFBQVEsRUFBRTtFQUN0QyxJQUFJbUQsSUFBSSxFQUFFbEMsTUFBTSxFQUFFbUMsUUFBUSxFQUFFdEMsQ0FBQyxFQUFFdUMsZ0JBQWdCO0VBRS9DdEQsYUFBYSxDQUFDQyxRQUFRLENBQUM7RUFFdkJpQixNQUFNLEdBQUcsSUFBSSxDQUFDdkIsT0FBTztFQUNyQixJQUFJdUIsTUFBTSxLQUFLdEIsU0FBUyxFQUN0QixPQUFPLElBQUk7RUFFYndELElBQUksR0FBR2xDLE1BQU0sQ0FBQ0osSUFBSSxDQUFDO0VBQ25CLElBQUlzQyxJQUFJLEtBQUt4RCxTQUFTLEVBQ3BCLE9BQU8sSUFBSTtFQUViLElBQUl3RCxJQUFJLEtBQUtuRCxRQUFRLElBQUltRCxJQUFJLENBQUNuRCxRQUFRLEtBQUtBLFFBQVEsRUFBRTtJQUNuRCxJQUFJLEVBQUUsSUFBSSxDQUFDSixZQUFZLEtBQUssQ0FBQyxFQUMzQixJQUFJLENBQUNGLE9BQU8sR0FBR3BDLE1BQU0sQ0FBQ2lELE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUNoQztNQUNILE9BQU9VLE1BQU0sQ0FBQ0osSUFBSSxDQUFDO01BQ25CLElBQUlJLE1BQU0sQ0FBQzJCLGNBQWMsRUFDdkIsSUFBSSxDQUFDaEMsSUFBSSxDQUFDLGdCQUFnQixFQUFFQyxJQUFJLEVBQUVzQyxJQUFJLENBQUNuRCxRQUFRLElBQUlBLFFBQVEsQ0FBQztJQUNoRTtFQUNGLENBQUMsTUFBTSxJQUFJLE9BQU9tRCxJQUFJLEtBQUssVUFBVSxFQUFFO0lBQ3JDQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO0lBRWIsS0FBS3RDLENBQUMsR0FBR3FDLElBQUksQ0FBQzlHLE1BQU0sR0FBRyxDQUFDLEVBQUV5RSxDQUFDLElBQUksQ0FBQyxFQUFFQSxDQUFDLEVBQUUsRUFBRTtNQUNyQyxJQUFJcUMsSUFBSSxDQUFDckMsQ0FBQyxDQUFDLEtBQUtkLFFBQVEsSUFBSW1ELElBQUksQ0FBQ3JDLENBQUMsQ0FBQyxDQUFDZCxRQUFRLEtBQUtBLFFBQVEsRUFBRTtRQUN6RHFELGdCQUFnQixHQUFHRixJQUFJLENBQUNyQyxDQUFDLENBQUMsQ0FBQ2QsUUFBUTtRQUNuQ29ELFFBQVEsR0FBR3RDLENBQUM7UUFDWjtNQUNGO0lBQ0Y7SUFFQSxJQUFJc0MsUUFBUSxHQUFHLENBQUMsRUFDZCxPQUFPLElBQUk7SUFFYixJQUFJQSxRQUFRLEtBQUssQ0FBQyxFQUNoQkQsSUFBSSxDQUFDRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQ1Y7TUFDSEMsU0FBUyxDQUFDSixJQUFJLEVBQUVDLFFBQVEsQ0FBQztJQUMzQjtJQUVBLElBQUlELElBQUksQ0FBQzlHLE1BQU0sS0FBSyxDQUFDLEVBQ25CNEUsTUFBTSxDQUFDSixJQUFJLENBQUMsR0FBR3NDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFFeEIsSUFBSWxDLE1BQU0sQ0FBQzJCLGNBQWMsS0FBS2pELFNBQVMsRUFDckMsSUFBSSxDQUFDaUIsSUFBSSxDQUFDLGdCQUFnQixFQUFFQyxJQUFJLEVBQUV3QyxnQkFBZ0IsSUFBSXJELFFBQVEsQ0FBQztFQUNuRTtFQUVBLE9BQU8sSUFBSTtBQUNiLENBQUM7QUFFTFQsWUFBWSxDQUFDZixTQUFTLENBQUNnRixHQUFHLEdBQUdqRSxZQUFZLENBQUNmLFNBQVMsQ0FBQ29FLGNBQWM7QUFFbEVyRCxZQUFZLENBQUNmLFNBQVMsQ0FBQ2lGLGtCQUFrQixHQUNyQyxTQUFTQSxrQkFBa0JBLENBQUM1QyxJQUFJLEVBQUU7RUFDaEMsSUFBSVksU0FBUyxFQUFFUixNQUFNLEVBQUVILENBQUM7RUFFeEJHLE1BQU0sR0FBRyxJQUFJLENBQUN2QixPQUFPO0VBQ3JCLElBQUl1QixNQUFNLEtBQUt0QixTQUFTLEVBQ3RCLE9BQU8sSUFBSTs7RUFFYjtFQUNBLElBQUlzQixNQUFNLENBQUMyQixjQUFjLEtBQUtqRCxTQUFTLEVBQUU7SUFDdkMsSUFBSW9CLFNBQVMsQ0FBQzFFLE1BQU0sS0FBSyxDQUFDLEVBQUU7TUFDMUIsSUFBSSxDQUFDcUQsT0FBTyxHQUFHcEMsTUFBTSxDQUFDaUQsTUFBTSxDQUFDLElBQUksQ0FBQztNQUNsQyxJQUFJLENBQUNYLFlBQVksR0FBRyxDQUFDO0lBQ3ZCLENBQUMsTUFBTSxJQUFJcUIsTUFBTSxDQUFDSixJQUFJLENBQUMsS0FBS2xCLFNBQVMsRUFBRTtNQUNyQyxJQUFJLEVBQUUsSUFBSSxDQUFDQyxZQUFZLEtBQUssQ0FBQyxFQUMzQixJQUFJLENBQUNGLE9BQU8sR0FBR3BDLE1BQU0sQ0FBQ2lELE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUVuQyxPQUFPVSxNQUFNLENBQUNKLElBQUksQ0FBQztJQUN2QjtJQUNBLE9BQU8sSUFBSTtFQUNiOztFQUVBO0VBQ0EsSUFBSUUsU0FBUyxDQUFDMUUsTUFBTSxLQUFLLENBQUMsRUFBRTtJQUMxQixJQUFJcUgsSUFBSSxHQUFHcEcsTUFBTSxDQUFDb0csSUFBSSxDQUFDekMsTUFBTSxDQUFDO0lBQzlCLElBQUlyRSxHQUFHO0lBQ1AsS0FBS2tFLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBRzRDLElBQUksQ0FBQ3JILE1BQU0sRUFBRSxFQUFFeUUsQ0FBQyxFQUFFO01BQ2hDbEUsR0FBRyxHQUFHOEcsSUFBSSxDQUFDNUMsQ0FBQyxDQUFDO01BQ2IsSUFBSWxFLEdBQUcsS0FBSyxnQkFBZ0IsRUFBRTtNQUM5QixJQUFJLENBQUM2RyxrQkFBa0IsQ0FBQzdHLEdBQUcsQ0FBQztJQUM5QjtJQUNBLElBQUksQ0FBQzZHLGtCQUFrQixDQUFDLGdCQUFnQixDQUFDO0lBQ3pDLElBQUksQ0FBQy9ELE9BQU8sR0FBR3BDLE1BQU0sQ0FBQ2lELE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDbEMsSUFBSSxDQUFDWCxZQUFZLEdBQUcsQ0FBQztJQUNyQixPQUFPLElBQUk7RUFDYjtFQUVBNkIsU0FBUyxHQUFHUixNQUFNLENBQUNKLElBQUksQ0FBQztFQUV4QixJQUFJLE9BQU9ZLFNBQVMsS0FBSyxVQUFVLEVBQUU7SUFDbkMsSUFBSSxDQUFDbUIsY0FBYyxDQUFDL0IsSUFBSSxFQUFFWSxTQUFTLENBQUM7RUFDdEMsQ0FBQyxNQUFNLElBQUlBLFNBQVMsS0FBSzlCLFNBQVMsRUFBRTtJQUNsQztJQUNBLEtBQUttQixDQUFDLEdBQUdXLFNBQVMsQ0FBQ3BGLE1BQU0sR0FBRyxDQUFDLEVBQUV5RSxDQUFDLElBQUksQ0FBQyxFQUFFQSxDQUFDLEVBQUUsRUFBRTtNQUMxQyxJQUFJLENBQUM4QixjQUFjLENBQUMvQixJQUFJLEVBQUVZLFNBQVMsQ0FBQ1gsQ0FBQyxDQUFDLENBQUM7SUFDekM7RUFDRjtFQUVBLE9BQU8sSUFBSTtBQUNiLENBQUM7QUFFTCxTQUFTNkMsVUFBVUEsQ0FBQ3ZGLE1BQU0sRUFBRXlDLElBQUksRUFBRStDLE1BQU0sRUFBRTtFQUN4QyxJQUFJM0MsTUFBTSxHQUFHN0MsTUFBTSxDQUFDc0IsT0FBTztFQUUzQixJQUFJdUIsTUFBTSxLQUFLdEIsU0FBUyxFQUN0QixPQUFPLEVBQUU7RUFFWCxJQUFJa0UsVUFBVSxHQUFHNUMsTUFBTSxDQUFDSixJQUFJLENBQUM7RUFDN0IsSUFBSWdELFVBQVUsS0FBS2xFLFNBQVMsRUFDMUIsT0FBTyxFQUFFO0VBRVgsSUFBSSxPQUFPa0UsVUFBVSxLQUFLLFVBQVUsRUFDbEMsT0FBT0QsTUFBTSxHQUFHLENBQUNDLFVBQVUsQ0FBQzdELFFBQVEsSUFBSTZELFVBQVUsQ0FBQyxHQUFHLENBQUNBLFVBQVUsQ0FBQztFQUVwRSxPQUFPRCxNQUFNLEdBQ1hFLGVBQWUsQ0FBQ0QsVUFBVSxDQUFDLEdBQUduQyxVQUFVLENBQUNtQyxVQUFVLEVBQUVBLFVBQVUsQ0FBQ3hILE1BQU0sQ0FBQztBQUMzRTtBQUVBa0QsWUFBWSxDQUFDZixTQUFTLENBQUNpRCxTQUFTLEdBQUcsU0FBU0EsU0FBU0EsQ0FBQ1osSUFBSSxFQUFFO0VBQzFELE9BQU84QyxVQUFVLENBQUMsSUFBSSxFQUFFOUMsSUFBSSxFQUFFLElBQUksQ0FBQztBQUNyQyxDQUFDO0FBRUR0QixZQUFZLENBQUNmLFNBQVMsQ0FBQ3VGLFlBQVksR0FBRyxTQUFTQSxZQUFZQSxDQUFDbEQsSUFBSSxFQUFFO0VBQ2hFLE9BQU84QyxVQUFVLENBQUMsSUFBSSxFQUFFOUMsSUFBSSxFQUFFLEtBQUssQ0FBQztBQUN0QyxDQUFDO0FBRUR0QixZQUFZLENBQUN5RSxhQUFhLEdBQUcsVUFBUzNCLE9BQU8sRUFBRXhCLElBQUksRUFBRTtFQUNuRCxJQUFJLE9BQU93QixPQUFPLENBQUMyQixhQUFhLEtBQUssVUFBVSxFQUFFO0lBQy9DLE9BQU8zQixPQUFPLENBQUMyQixhQUFhLENBQUNuRCxJQUFJLENBQUM7RUFDcEMsQ0FBQyxNQUFNO0lBQ0wsT0FBT21ELGFBQWEsQ0FBQ3ZGLElBQUksQ0FBQzRELE9BQU8sRUFBRXhCLElBQUksQ0FBQztFQUMxQztBQUNGLENBQUM7QUFFRHRCLFlBQVksQ0FBQ2YsU0FBUyxDQUFDd0YsYUFBYSxHQUFHQSxhQUFhO0FBQ3BELFNBQVNBLGFBQWFBLENBQUNuRCxJQUFJLEVBQUU7RUFDM0IsSUFBSUksTUFBTSxHQUFHLElBQUksQ0FBQ3ZCLE9BQU87RUFFekIsSUFBSXVCLE1BQU0sS0FBS3RCLFNBQVMsRUFBRTtJQUN4QixJQUFJa0UsVUFBVSxHQUFHNUMsTUFBTSxDQUFDSixJQUFJLENBQUM7SUFFN0IsSUFBSSxPQUFPZ0QsVUFBVSxLQUFLLFVBQVUsRUFBRTtNQUNwQyxPQUFPLENBQUM7SUFDVixDQUFDLE1BQU0sSUFBSUEsVUFBVSxLQUFLbEUsU0FBUyxFQUFFO01BQ25DLE9BQU9rRSxVQUFVLENBQUN4SCxNQUFNO0lBQzFCO0VBQ0Y7RUFFQSxPQUFPLENBQUM7QUFDVjtBQUVBa0QsWUFBWSxDQUFDZixTQUFTLENBQUN5RixVQUFVLEdBQUcsU0FBU0EsVUFBVUEsQ0FBQSxFQUFHO0VBQ3hELE9BQU8sSUFBSSxDQUFDckUsWUFBWSxHQUFHLENBQUMsR0FBR2xCLGNBQWMsQ0FBQyxJQUFJLENBQUNnQixPQUFPLENBQUMsR0FBRyxFQUFFO0FBQ2xFLENBQUM7QUFFRCxTQUFTZ0MsVUFBVUEsQ0FBQ3dDLEdBQUcsRUFBRTNJLENBQUMsRUFBRTtFQUMxQixJQUFJNEksSUFBSSxHQUFHLElBQUk3SCxLQUFLLENBQUNmLENBQUMsQ0FBQztFQUN2QixLQUFLLElBQUl1RixDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUd2RixDQUFDLEVBQUUsRUFBRXVGLENBQUMsRUFDeEJxRCxJQUFJLENBQUNyRCxDQUFDLENBQUMsR0FBR29ELEdBQUcsQ0FBQ3BELENBQUMsQ0FBQztFQUNsQixPQUFPcUQsSUFBSTtBQUNiO0FBRUEsU0FBU1osU0FBU0EsQ0FBQ0osSUFBSSxFQUFFaUIsS0FBSyxFQUFFO0VBQzlCLE9BQU9BLEtBQUssR0FBRyxDQUFDLEdBQUdqQixJQUFJLENBQUM5RyxNQUFNLEVBQUUrSCxLQUFLLEVBQUUsRUFDckNqQixJQUFJLENBQUNpQixLQUFLLENBQUMsR0FBR2pCLElBQUksQ0FBQ2lCLEtBQUssR0FBRyxDQUFDLENBQUM7RUFDL0JqQixJQUFJLENBQUNsSCxHQUFHLENBQUMsQ0FBQztBQUNaO0FBRUEsU0FBUzZILGVBQWVBLENBQUNJLEdBQUcsRUFBRTtFQUM1QixJQUFJdkksR0FBRyxHQUFHLElBQUlXLEtBQUssQ0FBQzRILEdBQUcsQ0FBQzdILE1BQU0sQ0FBQztFQUMvQixLQUFLLElBQUl5RSxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUduRixHQUFHLENBQUNVLE1BQU0sRUFBRSxFQUFFeUUsQ0FBQyxFQUFFO0lBQ25DbkYsR0FBRyxDQUFDbUYsQ0FBQyxDQUFDLEdBQUdvRCxHQUFHLENBQUNwRCxDQUFDLENBQUMsQ0FBQ2QsUUFBUSxJQUFJa0UsR0FBRyxDQUFDcEQsQ0FBQyxDQUFDO0VBQ3BDO0VBQ0EsT0FBT25GLEdBQUc7QUFDWjtBQUVBLFNBQVM4RCxJQUFJQSxDQUFDNEMsT0FBTyxFQUFFRCxJQUFJLEVBQUU7RUFDM0IsT0FBTyxJQUFJaUMsT0FBTyxDQUFDLFVBQVVDLE9BQU8sRUFBRUMsTUFBTSxFQUFFO0lBQzVDLFNBQVNDLGFBQWFBLENBQUNwRCxHQUFHLEVBQUU7TUFDMUJpQixPQUFPLENBQUNPLGNBQWMsQ0FBQ1IsSUFBSSxFQUFFcUMsUUFBUSxDQUFDO01BQ3RDRixNQUFNLENBQUNuRCxHQUFHLENBQUM7SUFDYjtJQUVBLFNBQVNxRCxRQUFRQSxDQUFBLEVBQUc7TUFDbEIsSUFBSSxPQUFPcEMsT0FBTyxDQUFDTyxjQUFjLEtBQUssVUFBVSxFQUFFO1FBQ2hEUCxPQUFPLENBQUNPLGNBQWMsQ0FBQyxPQUFPLEVBQUU0QixhQUFhLENBQUM7TUFDaEQ7TUFDQUYsT0FBTyxDQUFDLEVBQUUsQ0FBQ25ILEtBQUssQ0FBQ3NCLElBQUksQ0FBQ3NDLFNBQVMsQ0FBQyxDQUFDO0lBQ25DO0lBQUM7SUFFRDJELDhCQUE4QixDQUFDckMsT0FBTyxFQUFFRCxJQUFJLEVBQUVxQyxRQUFRLEVBQUU7TUFBRWhGLElBQUksRUFBRTtJQUFLLENBQUMsQ0FBQztJQUN2RSxJQUFJMkMsSUFBSSxLQUFLLE9BQU8sRUFBRTtNQUNwQnVDLDZCQUE2QixDQUFDdEMsT0FBTyxFQUFFbUMsYUFBYSxFQUFFO1FBQUUvRSxJQUFJLEVBQUU7TUFBSyxDQUFDLENBQUM7SUFDdkU7RUFDRixDQUFDLENBQUM7QUFDSjtBQUVBLFNBQVNrRiw2QkFBNkJBLENBQUN0QyxPQUFPLEVBQUVkLE9BQU8sRUFBRXFELEtBQUssRUFBRTtFQUM5RCxJQUFJLE9BQU92QyxPQUFPLENBQUNHLEVBQUUsS0FBSyxVQUFVLEVBQUU7SUFDcENrQyw4QkFBOEIsQ0FBQ3JDLE9BQU8sRUFBRSxPQUFPLEVBQUVkLE9BQU8sRUFBRXFELEtBQUssQ0FBQztFQUNsRTtBQUNGO0FBRUEsU0FBU0YsOEJBQThCQSxDQUFDckMsT0FBTyxFQUFFRCxJQUFJLEVBQUVwQyxRQUFRLEVBQUU0RSxLQUFLLEVBQUU7RUFDdEUsSUFBSSxPQUFPdkMsT0FBTyxDQUFDRyxFQUFFLEtBQUssVUFBVSxFQUFFO0lBQ3BDLElBQUlvQyxLQUFLLENBQUNuRixJQUFJLEVBQUU7TUFDZDRDLE9BQU8sQ0FBQzVDLElBQUksQ0FBQzJDLElBQUksRUFBRXBDLFFBQVEsQ0FBQztJQUM5QixDQUFDLE1BQU07TUFDTHFDLE9BQU8sQ0FBQ0csRUFBRSxDQUFDSixJQUFJLEVBQUVwQyxRQUFRLENBQUM7SUFDNUI7RUFDRixDQUFDLE1BQU0sSUFBSSxPQUFPcUMsT0FBTyxDQUFDd0MsZ0JBQWdCLEtBQUssVUFBVSxFQUFFO0lBQ3pEO0lBQ0E7SUFDQXhDLE9BQU8sQ0FBQ3dDLGdCQUFnQixDQUFDekMsSUFBSSxFQUFFLFNBQVMwQyxZQUFZQSxDQUFDMUUsR0FBRyxFQUFFO01BQ3hEO01BQ0E7TUFDQSxJQUFJd0UsS0FBSyxDQUFDbkYsSUFBSSxFQUFFO1FBQ2Q0QyxPQUFPLENBQUMwQyxtQkFBbUIsQ0FBQzNDLElBQUksRUFBRTBDLFlBQVksQ0FBQztNQUNqRDtNQUNBOUUsUUFBUSxDQUFDSSxHQUFHLENBQUM7SUFDZixDQUFDLENBQUM7RUFDSixDQUFDLE1BQU07SUFDTCxNQUFNLElBQUlILFNBQVMsQ0FBQyxxRUFBcUUsR0FBRyxPQUFPb0MsT0FBTyxDQUFDO0VBQzdHO0FBQ0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaGZBLElBQUEyQyxrQkFBQSxHQUFBQyxtQkFBQTtBQUNBLElBQUFDLHFCQUFBLEdBQUFELG1CQUFBO0FBQ0EsSUFBQUUsaUJBQUEsR0FBQUYsbUJBQUE7QUFFQSxJQUFNRyxrQkFBQSxHQUFrQkMsUUFBQSxDQUFBQSxRQUFBLEtBQ2pCTCxrQkFBQSxDQUFBTSxlQUFBLEdBQWU7RUFDbEJDLEdBQUEsRUFBS1Asa0JBQUEsQ0FBQU0sZUFBQSxDQUFnQkU7QUFBQTtBQUd6QixTQUFTQyxtQkFBbUJDLFNBQUEsRUFBbUJDLFdBQUEsRUFBcUJDLGFBQUE7RUFDaEVELFdBQUEsQ0FBWUUsU0FBQSxHQUFZO0VBQ3hCLElBQUlDLFlBQUEsR0FBZUgsV0FBQSxDQUFZSSxJQUFBLENBQUtMLFNBQUE7RUFDcEMsSUFBSU0sYUFBQTtFQUNKLElBQUlGLFlBQUEsRUFBYztJQUNkRSxhQUFBLEdBQWdCO0lBQ2hCLElBQUlDLGdCQUFBLEdBQW1CO0lBQ3ZCLEdBQUc7TUFDQyxJQUFJQSxnQkFBQSxLQUFxQkgsWUFBQSxDQUFhMUIsS0FBQSxFQUFPO1FBQ3pDNEIsYUFBQSxJQUFpQk4sU0FBQSxDQUFVUSxTQUFBLENBQVVELGdCQUFBLEVBQWtCSCxZQUFBLENBQWExQixLQUFBOztNQUV4RSxJQUFNK0IsWUFBQSxHQUFlTCxZQUFBLENBQWE7TUFDbENFLGFBQUEsSUFBaUJKLGFBQUEsQ0FBY08sWUFBQTtNQUMvQkYsZ0JBQUEsR0FBbUJILFlBQUEsQ0FBYTFCLEtBQUEsR0FBUStCLFlBQUEsQ0FBYTlKO2FBQy9DeUosWUFBQSxHQUFlSCxXQUFBLENBQVlJLElBQUEsQ0FBS0wsU0FBQTtJQUUxQyxJQUFJTyxnQkFBQSxLQUFxQlAsU0FBQSxDQUFVckosTUFBQSxFQUFRO01BQ3ZDMkosYUFBQSxJQUFpQk4sU0FBQSxDQUFVUSxTQUFBLENBQVVELGdCQUFBOztTQUV0QztJQUNIRCxhQUFBLEdBQWdCTjs7RUFFcEIsT0FBT00sYUFDWDtBQUFBO0FBcUJBLElBQU1JLGFBQUEsR0FBNEM7RUFDOUNDLFlBQUEsRUFBYztFQUNkQyxRQUFBLEVBQVU7RUFDVkMsaUJBQUEsRUFBbUI7RUFDbkJDLHFCQUFBLEVBQXVCO0VBQ3ZCQyxTQUFBLEVBQVc7QUFBQTtBQUdmLElBQU1DLG9CQUFBLEdBQXNDO0VBQ3hDQyxJQUFBLEVBQU07RUFDTkMsS0FBQSxFQUFPO0VBQ1BDLE9BQUEsRUFBUztBQUFBO0FBSWIsU0FBZ0JDLE9BQ1p0TCxJQUFBLEVBQ0F1TCxFQUFBO01BQUFDLEVBQUEsR0FBQUQsRUFBQSxjQUFBTCxvQkFBQSxHQUFBSyxFQUFBO0lBQUNFLEVBQUEsR0FBQUQsRUFBQSxDQUFBTCxJQUFBO0lBQUFBLElBQUEsR0FBQU0sRUFBQSwrQkFBQUEsRUFBQTtJQUF1QkMsRUFBQSxHQUFBRixFQUFBLENBQUFILE9BQUE7SUFBQUEsT0FBQSxHQUFBSyxFQUFBLDBCQUFBQSxFQUFBO0lBQXFCQyxFQUFBLEdBQUFILEVBQUEsQ0FBQUosS0FBQTtJQUFBQSxLQUFBLEdBQUFPLEVBQUEsc0JBQUFBLEVBQUE7RUFFN0MsS0FBSzNMLElBQUEsRUFBTTtJQUNQLE9BQU87O0VBR1gsSUFBTTRMLFlBQUEsR0FBZWhCLGFBQUEsQ0FBY08sSUFBQTtFQUNuQyxJQUFNVSxVQUFBLEdBQWFqQyxrQkFBQSxDQUFtQndCLEtBQUEsRUFBT1UsVUFBQTtFQUM3QyxJQUFNQyxLQUFBLEdBQVFWLE9BQUEsS0FBWTtFQUUxQixPQUFPcEIsa0JBQUEsQ0FBbUJqSyxJQUFBLEVBQU00TCxZQUFBLEVBQWMsVUFBQ0ksS0FBQTtJQUMzQyxJQUFJQyxNQUFBLEdBQVNKLFVBQUEsQ0FBV0csS0FBQTtJQUN4QixLQUFLQyxNQUFBLEVBQVE7TUFDVCxJQUFNOUosSUFBQSxHQUFPNkosS0FBQSxDQUFNbkwsTUFBQSxHQUFTLElBQUk4SSxpQkFBQSxDQUFBdUMsWUFBQSxDQUFhRixLQUFBLEVBQU8sS0FBTUEsS0FBQSxDQUFNRyxVQUFBLENBQVc7TUFDM0VGLE1BQUEsSUFBVUYsS0FBQSxHQUFRLFFBQVE1SixJQUFBLENBQUtJLFFBQUEsQ0FBUyxNQUFNLE9BQU9KLElBQUEsSUFBUTs7SUFFakUsT0FBTzhKLE1BQ1g7RUFBQSxFQUNKO0FBQUE7QUFwQkFwTixjQUFBLEdBQUF5TSxNQUFBO0FBc0JBLElBQU1jLG9CQUFBLEdBQXNDO0VBQ3hDQyxLQUFBLEVBQU87RUFDUGpCLEtBQUEsRUFBTztBQUFBO0FBR1gsSUFBTWtCLE1BQUEsR0FBUztBQUNmLElBQU1DLFNBQUEsR0FBWTtBQUVsQixJQUFNQyxpQkFBQSxHQUFnRjtFQUNsRkMsR0FBQSxFQUFLO0lBQ0RILE1BQUEsRUFBTUEsTUFBQTtJQUNOQyxTQUFBLEVBQVNBLFNBQUE7SUFDVEcsSUFBQSxFQUFNbEQsa0JBQUEsQ0FBQW1ELFdBQUEsQ0FBWUY7RUFBQTtFQUV0QkcsS0FBQSxFQUFPO0lBQ0hOLE1BQUEsRUFBTUEsTUFBQTtJQUNOQyxTQUFBLEVBQVNBLFNBQUE7SUFDVEcsSUFBQSxFQUFNbEQsa0JBQUEsQ0FBQW1ELFdBQUEsQ0FBWUM7RUFBQTtFQUV0QjVDLEtBQUEsRUFBTztJQUNIc0MsTUFBQSxFQUFNQSxNQUFBO0lBQ05DLFNBQUEsRUFBU0EsU0FBQTtJQUNURyxJQUFBLEVBQU1sRCxrQkFBQSxDQUFBbUQsV0FBQSxDQUFZM0M7RUFBQTtBQUFBO0FBSTFCLElBQU02QyxhQUFBLEdBQWFoRCxRQUFBLENBQUFBLFFBQUEsS0FDWjJDLGlCQUFBLEdBQWlCO0VBQ3BCekMsR0FBQSxFQUFLeUMsaUJBQUEsQ0FBa0J4QztBQUFBO0FBRzNCLElBQU04QyxZQUFBLEdBQWVuRyxNQUFBLENBQU9tRyxZQUFBO0FBQzVCLElBQU1DLGVBQUEsR0FBa0JELFlBQUEsQ0FBYTtBQUVyQyxJQUFNRSwwQkFBQSxHQUE0QztFQUM5QzVCLEtBQUEsRUFBTztBQUFBO0FBR1gsU0FBUzZCLGlCQUNMQyxNQUFBLEVBQ0FyQixVQUFBLEVBQ0FzQixXQUFBLEVBQ0FDLFFBQUE7RUFFQSxJQUFJQyxZQUFBLEdBQWVILE1BQUE7RUFDbkIsSUFBTUksb0JBQUEsR0FBdUJKLE1BQUEsQ0FBT0EsTUFBQSxDQUFPck0sTUFBQSxHQUFTO0VBQ3BELElBQUlzTSxXQUFBLElBQWVHLG9CQUFBLEtBQXlCLEtBQUs7SUFDN0NELFlBQUEsR0FBZUg7U0FDWixJQUFJRSxRQUFBLElBQVlFLG9CQUFBLEtBQXlCLEtBQUs7SUFDakRELFlBQUEsR0FBZUg7U0FDWjtJQUNILElBQU1LLHVCQUFBLEdBQTBCMUIsVUFBQSxDQUFXcUIsTUFBQTtJQUMzQyxJQUFJSyx1QkFBQSxFQUF5QjtNQUN6QkYsWUFBQSxHQUFlRTtXQUNaLElBQUlMLE1BQUEsQ0FBTyxPQUFPLE9BQU9BLE1BQUEsQ0FBTyxPQUFPLEtBQUs7TUFDL0MsSUFBTU0sZ0JBQUEsR0FBbUJOLE1BQUEsQ0FBTztNQUNoQyxJQUFNTyxVQUFBLEdBQ0ZELGdCQUFBLElBQW9CLE9BQU9BLGdCQUFBLElBQW9CLE1BQ3pDbEwsUUFBQSxDQUFTNEssTUFBQSxDQUFPUSxNQUFBLENBQU8sSUFBSSxNQUMzQnBMLFFBQUEsQ0FBUzRLLE1BQUEsQ0FBT1EsTUFBQSxDQUFPO01BRWpDTCxZQUFBLEdBQ0lJLFVBQUEsSUFBYyxVQUNSVixlQUFBLEdBQ0FVLFVBQUEsR0FBYSxRQUNiOUQsaUJBQUEsQ0FBQWdFLGFBQUEsQ0FBY0YsVUFBQSxJQUNkWCxZQUFBLENBQWFwRCxxQkFBQSxDQUFBa0UsaUJBQUEsQ0FBa0JILFVBQUEsS0FBZUEsVUFBQTs7O0VBR2hFLE9BQU9KLFlBQ1g7QUFBQTtBQUdBLFNBQWdCUSxhQUNaWCxNQUFBLEVBQ0EzQixFQUFBO01BQUNDLEVBQUEsSUFBQUQsRUFBQSxjQUFBeUIsMEJBQUEsR0FBQXpCLEVBQUEsRUFBQUgsS0FBQTtJQUFBQSxLQUFBLEdBQUFJLEVBQUEsc0JBQUFBLEVBQUE7RUFFRCxLQUFLMEIsTUFBQSxFQUFRO0lBQ1QsT0FBTzs7RUFFWCxPQUFPRCxnQkFBQSxDQUFpQkMsTUFBQSxFQUFRdEQsa0JBQUEsQ0FBbUJ3QixLQUFBLEVBQU8wQyxRQUFBLEVBQVUsT0FBTyxNQUMvRTtBQUFBO0FBUkFqUCxvQkFBQSxHQUFBZ1AsWUFBQTtBQVdBLFNBQWdCRSxPQUNaL04sSUFBQSxFQUNBdUwsRUFBQTtNQUFBQyxFQUFBLEdBQUFELEVBQUEsY0FBQWEsb0JBQUEsR0FBQWIsRUFBQTtJQUFDRSxFQUFBLEdBQUFELEVBQUEsQ0FBQUosS0FBQTtJQUFBQSxLQUFBLEdBQUFLLEVBQUEsc0JBQUFBLEVBQUE7SUFBZUMsRUFBQSxHQUFBRixFQUFBLENBQUFhLEtBQUE7SUFBQUEsS0FBQSxHQUFBWCxFQUFBLGNBQUFOLEtBQUEsaUNBQUFNLEVBQUE7RUFFaEIsS0FBSzFMLElBQUEsRUFBTTtJQUNQLE9BQU87O0VBR1gsSUFBTWdPLFlBQUEsR0FBZW5CLGFBQUEsQ0FBY3pCLEtBQUEsRUFBT2lCLEtBQUE7RUFDMUMsSUFBTVIsVUFBQSxHQUFhakMsa0JBQUEsQ0FBbUJ3QixLQUFBLEVBQU8wQyxRQUFBO0VBQzdDLElBQU1YLFdBQUEsR0FBY2QsS0FBQSxLQUFVO0VBQzlCLElBQU1lLFFBQUEsR0FBV2YsS0FBQSxLQUFVO0VBRTNCLE9BQU9wQyxrQkFBQSxDQUFtQmpLLElBQUEsRUFBTWdPLFlBQUEsRUFBYyxVQUFDZCxNQUFBO0lBQzNDLE9BQUFELGdCQUFBLENBQWlCQyxNQUFBLEVBQVFyQixVQUFBLEVBQVlzQixXQUFBLEVBQWFDLFFBQUEsQ0FBbEQ7RUFBQSxFQUVSO0FBQUE7QUFoQkF2TyxjQUFBLEdBQUFrUCxNQUFBOzs7Ozs7Ozs7Ozs7Ozs7O0FDckthbFAsbUJBQUEsR0FBYztFQUN2QjROLEdBQUEsRUFBSztFQUNMRyxLQUFBLEVBQU87RUFDUDVDLEtBQUEsRUFBTztBQUFBO0FBRUVuTCx1QkFBQSxHQUFtQztFQUM1QzROLEdBQUEsRUFBTztJQUNIcUIsUUFBQSxFQUFZO01BQ1IsUUFBUTtNQUNSLFFBQVE7TUFDUixVQUFVO01BQ1YsVUFBVTtNQUNWLFNBQVM7SUFBQTtJQUViaEMsVUFBQSxFQUFjO01BQ1YsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7SUFBQTtFQUFBO0VBR2JjLEtBQUEsRUFBUztJQUNMa0IsUUFBQSxFQUFZO01BQ1IsVUFBVTtNQUNWLFNBQVM7TUFDVCxVQUFVO01BQ1YsVUFBVTtNQUNWLFdBQVc7TUFDWCxTQUFTO01BQ1QsVUFBVTtNQUNWLFVBQVU7TUFDVixXQUFXO01BQ1gsV0FBVztNQUNYLFlBQVk7TUFDWixRQUFRO01BQ1IsU0FBUztNQUNULFdBQVc7TUFDWCxZQUFZO01BQ1osU0FBUztNQUNULFVBQVU7TUFDVixRQUFRO01BQ1IsU0FBUztNQUNULFNBQVM7TUFDVCxVQUFVO01BQ1YsU0FBUztNQUNULFVBQVU7TUFDVixVQUFVO01BQ1YsV0FBVztNQUNYLFFBQVE7TUFDUixTQUFTO01BQ1QsUUFBUTtNQUNSLFNBQVM7TUFDVCxRQUFRO01BQ1IsU0FBUztNQUNULFNBQVM7TUFDVCxVQUFVO01BQ1YsUUFBUTtNQUNSLFNBQVM7TUFDVCxXQUFXO01BQ1gsWUFBWTtNQUNaLFNBQVM7TUFDVCxVQUFVO01BQ1YsU0FBUztNQUNULFVBQVU7TUFDVixVQUFVO01BQ1YsV0FBVztNQUNYLFVBQVU7TUFDVixXQUFXO01BQ1gsU0FBUztNQUNULFVBQVU7TUFDVixXQUFXO01BQ1gsWUFBWTtNQUNaLFVBQVU7TUFDVixXQUFXO01BQ1gsU0FBUztNQUNULFVBQVU7TUFDVixTQUFTO01BQ1QsVUFBVTtNQUNWLFVBQVU7TUFDVixXQUFXO01BQ1gsV0FBVztNQUNYLFlBQVk7TUFDWixXQUFXO01BQ1gsWUFBWTtNQUNaLFdBQVc7TUFDWCxZQUFZO01BQ1osV0FBVztNQUNYLFlBQVk7TUFDWixXQUFXO01BQ1gsWUFBWTtNQUNaLFdBQVc7TUFDWCxZQUFZO01BQ1osVUFBVTtNQUNWLFdBQVc7TUFDWCxXQUFXO01BQ1gsWUFBWTtNQUNaLFNBQVM7TUFDVCxVQUFVO01BQ1YsVUFBVTtNQUNWLFdBQVc7TUFDWCxVQUFVO01BQ1YsV0FBVztNQUNYLFdBQVc7TUFDWCxZQUFZO01BQ1osV0FBVztNQUNYLFlBQVk7TUFDWixXQUFXO01BQ1gsWUFBWTtNQUNaLFVBQVU7TUFDVixXQUFXO01BQ1gsU0FBUztNQUNULFVBQVU7TUFDVixXQUFXO01BQ1gsWUFBWTtNQUNaLFdBQVc7TUFDWCxZQUFZO01BQ1osVUFBVTtNQUNWLFdBQVc7TUFDWCxTQUFTO01BQ1QsVUFBVTtNQUNWLFFBQVE7TUFDUixTQUFTO01BQ1QsV0FBVztNQUNYLFlBQVk7TUFDWixXQUFXO01BQ1gsWUFBWTtNQUNaLFdBQVc7TUFDWCxZQUFZO01BQ1osVUFBVTtNQUNWLFdBQVc7TUFDWCxXQUFXO01BQ1gsWUFBWTtNQUNaLFNBQVM7TUFDVCxVQUFVO01BQ1YsVUFBVTtNQUNWLFdBQVc7TUFDWCxXQUFXO01BQ1gsWUFBWTtNQUNaLFdBQVc7TUFDWCxZQUFZO01BQ1osV0FBVztNQUNYLFlBQVk7TUFDWixVQUFVO01BQ1YsV0FBVztNQUNYLFNBQVM7TUFDVCxVQUFVO01BQ1YsV0FBVztNQUNYLFlBQVk7TUFDWixVQUFVO01BQ1YsV0FBVztNQUNYLFVBQVU7TUFDVixXQUFXO01BQ1gsV0FBVztNQUNYLFlBQVk7TUFDWixXQUFXO01BQ1gsWUFBWTtNQUNaLFVBQVU7TUFDVixXQUFXO01BQ1gsV0FBVztNQUNYLFlBQVk7TUFDWixTQUFTO01BQ1QsVUFBVTtNQUNWLFVBQVU7TUFDVixXQUFXO01BQ1gsVUFBVTtNQUNWLFdBQVc7TUFDWCxXQUFXO01BQ1gsWUFBWTtNQUNaLFdBQVc7TUFDWCxZQUFZO01BQ1osV0FBVztNQUNYLFlBQVk7TUFDWixVQUFVO01BQ1YsV0FBVztNQUNYLFNBQVM7TUFDVCxVQUFVO01BQ1YsV0FBVztNQUNYLFlBQVk7TUFDWixXQUFXO01BQ1gsWUFBWTtNQUNaLFVBQVU7TUFDVixXQUFXO01BQ1gsU0FBUztNQUNULFVBQVU7TUFDVixRQUFRO01BQ1IsU0FBUztNQUNULFdBQVc7TUFDWCxZQUFZO01BQ1osV0FBVztNQUNYLFlBQVk7TUFDWixXQUFXO01BQ1gsWUFBWTtNQUNaLFVBQVU7TUFDVixXQUFXO01BQ1gsV0FBVztNQUNYLFlBQVk7TUFDWixTQUFTO01BQ1QsVUFBVTtNQUNWLFdBQVc7TUFDWCxZQUFZO01BQ1osV0FBVztNQUNYLFlBQVk7TUFDWixXQUFXO01BQ1gsWUFBWTtNQUNaLFdBQVc7TUFDWCxZQUFZO01BQ1osVUFBVTtNQUNWLFdBQVc7TUFDWCxTQUFTO01BQ1QsVUFBVTtNQUNWLFdBQVc7TUFDWCxZQUFZO01BQ1osVUFBVTtNQUNWLFdBQVc7TUFDWCxTQUFTO01BQ1QsVUFBVTtNQUNWLFNBQVM7TUFDVCxVQUFVO01BQ1YsUUFBUTtNQUNSLFNBQVM7TUFDVCxPQUFPO01BQ1AsUUFBUTtNQUNSLE9BQU87TUFDUCxRQUFRO01BQ1IsV0FBVztNQUNYLFdBQVc7TUFDWCxZQUFZO01BQ1osWUFBWTtNQUNaLFVBQVU7TUFDVixVQUFVO01BQ1YsV0FBVztNQUNYLFVBQVU7TUFDVixVQUFVO01BQ1YsWUFBWTtNQUNaLFVBQVU7TUFDVixTQUFTO01BQ1QsU0FBUztNQUNULFNBQVM7TUFDVCxXQUFXO01BQ1gsV0FBVztNQUNYLFdBQVc7TUFDWCxXQUFXO01BQ1gsV0FBVztNQUNYLFdBQVc7TUFDWCxXQUFXO01BQ1gsV0FBVztNQUNYLFlBQVk7TUFDWixZQUFZO01BQ1osWUFBWTtNQUNaLFlBQVk7TUFDWixZQUFZO01BQ1osVUFBVTtNQUNWLFVBQVU7TUFDVixXQUFXO01BQ1gsVUFBVTtNQUNWLFdBQVc7TUFDWCxXQUFXO01BQ1gsYUFBYTtNQUNiLFVBQVU7TUFDVixTQUFTO01BQ1QsV0FBVztNQUNYLFVBQVU7TUFDVixXQUFXO01BQ1gsWUFBWTtNQUNaLFFBQVE7TUFDUixRQUFRO01BQ1IsUUFBUTtNQUNSLGFBQWE7TUFDYixRQUFRO01BQ1IsU0FBUztNQUNULFdBQVc7TUFDWCxTQUFTO01BQ1QsYUFBYTtNQUNiLFNBQVM7TUFDVCxTQUFTO01BQ1QsU0FBUztNQUNULFdBQVc7TUFDWCxXQUFXO01BQ1gsVUFBVTtNQUNWLFdBQVc7TUFDWCxXQUFXO01BQ1gsYUFBYTtNQUNiLFVBQVU7TUFDVixTQUFTO01BQ1QsV0FBVztNQUNYLFVBQVU7TUFDVixXQUFXO01BQ1gsWUFBWTtNQUNaLFFBQVE7TUFDUixRQUFRO01BQ1IsUUFBUTtNQUNSLGFBQWE7TUFDYixRQUFRO01BQ1IsU0FBUztNQUNULFlBQVk7TUFDWixXQUFXO01BQ1gsU0FBUztNQUNULGFBQWE7TUFDYixTQUFTO01BQ1QsU0FBUztNQUNULFNBQVM7TUFDVCxXQUFXO01BQ1gsY0FBYztNQUNkLFdBQVc7TUFDWCxTQUFTO01BQ1QsVUFBVTtNQUNWLFlBQVk7TUFDWixXQUFXO01BQ1gsV0FBVztNQUNYLFdBQVc7TUFDWCxXQUFXO01BQ1gsWUFBWTtNQUNaLFdBQVc7TUFDWCxVQUFVO01BQ1YsV0FBVztNQUNYLGFBQWE7TUFDYixVQUFVO01BQ1YsVUFBVTtNQUNWLFVBQVU7TUFDVixVQUFVO01BQ1YsVUFBVTtNQUNWLFdBQVc7TUFDWCxVQUFVO01BQ1YsVUFBVTtNQUNWLFVBQVU7TUFDVixVQUFVO01BQ1YsVUFBVTtNQUNWLFlBQVk7TUFDWixVQUFVO01BQ1YsV0FBVztNQUNYLFdBQVc7TUFDWCxXQUFXO01BQ1gsVUFBVTtNQUNWLFdBQVc7TUFDWCxRQUFRO01BQ1IsVUFBVTtNQUNWLFNBQVM7TUFDVCxXQUFXO01BQ1gsWUFBWTtNQUNaLFdBQVc7TUFDWCxVQUFVO01BQ1YsV0FBVztNQUNYLFNBQVM7TUFDVCxTQUFTO01BQ1QsUUFBUTtNQUNSLFNBQVM7TUFDVCxTQUFTO01BQ1QsU0FBUztNQUNULFlBQVk7TUFDWixTQUFTO01BQ1QsVUFBVTtNQUNWLFdBQVc7TUFDWCxRQUFRO01BQ1IsV0FBVztNQUNYLFFBQVE7TUFDUixRQUFRO01BQ1IsU0FBUztNQUNULFNBQVM7TUFDVCxVQUFVO01BQ1YsVUFBVTtNQUNWLFVBQVU7TUFDVixXQUFXO01BQ1gsWUFBWTtNQUNaLFVBQVU7TUFDVixVQUFVO01BQ1YsV0FBVztNQUNYLFdBQVc7TUFDWCxZQUFZO01BQ1osWUFBWTtNQUNaLFVBQVU7TUFDVixVQUFVO01BQ1YsU0FBUztNQUNULFlBQVk7TUFDWixXQUFXO01BQ1gsWUFBWTtNQUNaLFdBQVc7SUFBQTtJQUVmaEMsVUFBQSxFQUFjO01BQ1YsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01B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QUNaLGNBQWM7TUFDZCxXQUFXO01BQ1gsWUFBWTtNQUNaLFVBQVU7TUFDVixTQUFTO01BQ1QsVUFBVTtNQUNWLFdBQVc7TUFDWCxZQUFZO01BQ1osWUFBWTtNQUNaLFlBQVk7TUFDWixVQUFVO01BQ1YsV0FBVztNQUNYLFdBQVc7TUFDWCxjQUFjO01BQ2QsYUFBYTtNQUNiLFFBQVE7TUFDUixZQUFZO01BQ1osV0FBVztNQUNYLFFBQVE7TUFDUixTQUFTO01BQ1QsVUFBVTtNQUNWLFlBQVk7TUFDWixXQUFXO01BQ1gsU0FBUztNQUNULFlBQVk7TUFDWixXQUFXO01BQ1gsVUFBVTtNQUNWLFdBQVc7TUFDWCxZQUFZO01BQ1osY0FBYztNQUNkLFdBQVc7TUFDWCxTQUFTO01BQ1QsVUFBVTtNQUNWLFdBQVc7TUFDWCxXQUFXO01BQ1gsV0FBVztNQUNYLFlBQVk7TUFDWixXQUFXO01BQ1gsYUFBYTtNQUNiLFNBQVM7TUFDVCxVQUFVO01BQ1YsVUFBVTtNQUNWLFlBQVk7TUFDWixjQUFjO01BQ2QsV0FBVztNQUNYLFVBQVU7TUFDVixTQUFTO01BQ1QsWUFBWTtNQUNaLFdBQVc7TUFDWCxZQUFZO01BQ1osVUFBVTtNQUNWLGNBQWM7TUFDZCxtQkFBbUI7TUFDbkIsUUFBUTtNQUNSLFNBQVM7TUFDVCxXQUFXO01BQ1gsWUFBWTtNQUNaLFlBQVk7TUFDWixTQUFTO01BQ1QsWUFBWTtNQUNaLFVBQVU7TUFDVixXQUFXO01BQ1gsVUFBVTtNQUNWLFdBQVc7TUFDWCxVQUFVO01BQ1YsV0FBVztNQUNYLFdBQVc7TUFDWCxhQUFhO01BQ2IsYUFBYTtNQUNiLFdBQVc7TUFDWCxtQkFBbUI7TUFDbkIsWUFBWTtNQUNaLGNBQWM7TUFDZCxVQUFVO01BQ1YsV0FBVztNQUNYLFNBQVM7TUFDVCxVQUFVO01BQ1YsV0FBVztNQUNYLFlBQVk7TUFDWixTQUFTO01BQ1QsVUFBVTtNQUNWLFlBQVk7TUFDWixVQUFVO01BQ1YsWUFBWTtNQUNaLGVBQWU7TUFDZixVQUFVO01BQ1YsV0FBVztNQUNYLFlBQVk7TUFDWixXQUFXO01BQ1gs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VTtNQUNWLFlBQVk7TUFDWixZQUFZO01BQ1osV0FBVztNQUNYLFdBQVc7TUFDWCxVQUFVO01BQ1YsWUFBWTtNQUNaLFlBQVk7TUFDWixXQUFXO01BQ1gsVUFBVTtNQUNWLFlBQVk7TUFDWixXQUFXO01BQ1gsWUFBWTtNQUNaLFVBQVU7TUFDVixXQUFXO01BQ1gsU0FBUztNQUNULFFBQVE7TUFDUixTQUFTO01BQ1QsU0FBUztNQUNULFVBQVU7TUFDVixVQUFVO01BQ1YsVUFBVTtNQUNWLFVBQVU7TUFDVixTQUFTO01BQ1QsVUFBVTtNQUNWLFlBQVk7TUFDWixZQUFZO01BQ1osU0FBUztNQUNULFVBQVU7TUFDVixZQUFZO01BQ1osVUFBVTtNQUNWLFNBQVM7TUFDVCxVQUFVO01BQ1YsYUFBYTtNQUNiLFVBQVU7TUFDVixVQUFVO01BQ1YsU0FBUztNQUNULFVBQVU7SUFBQTtJQUVkaEMsVUFBQSxFQUFjO01BQ1YsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sTUFBTTtNQUNOLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLE1BQU07TUFDTixNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixNQUFNO01BQ04sS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsTUFBTTtNQUNOLE1BQU07TUFDTixLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sTUFBTTtNQUNOLEtBQUs7TUFDTCxNQUFNO01BQ04sTUFBTTtNQUNOLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxNQUFNO01BQ04sTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFNO01BQ04sTUFBTTtNQUNOLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMbUMsQ0FBQSxFQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLE1BQU07TUFDTixNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLE1BQU07TUFDTixNQUFNO01BQ04sTUFBTTtNQUNOLEtBQUs7TUFDTCxNQUFNO01BQ04sTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixNQUFNO01BQ04sTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sTUFBTTtNQUNOLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMQyxDQUFBLEVBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMQyxFQUFBLEVBQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxNQUFNO01BQ04sTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLE1BQU07TUFDTixNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsTUFBTTtNQUNOLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixNQUFNO01BQ04sTUFBTTtNQUNOLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxNQUFNO01BQ04sTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLE1BQU07TUFDTixNQUFNO01BQ04sS0FBSztNQUNMLE1BQU07TUFDTixNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixNQUFNO01BQ04sS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxNQUFNO01BQ04sTUFBTTtNQUNOLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixNQUFNO01BQ04sTUFBTTtNQUNOLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLE1BQU07TUFDTixNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sTUFBTTtNQUNOLE1BQU07TUFDTixNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sTUFBTTtNQUNOLEtB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QUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsS0FBSztXQUNMO1dBQ0E7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQSxrQkFBa0IsY0FBYztXQUNoQztXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBO1dBQ0EsY0FBYyxNQUFNO1dBQ3BCO1dBQ0E7V0FDQTtXQUNBLEtBQUs7V0FDTDtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsY0FBYyxhQUFhO1dBQzNCO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0EsaUJBQWlCLDRCQUE0QjtXQUM3QztXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsSUFBSTtXQUNKO1dBQ0E7O1dBRUE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxJQUFJO1dBQ0o7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBOztXQUVBO1dBQ0E7V0FDQSxnQkFBZ0IsNEJBQTRCO1dBQzVDO1dBQ0E7V0FDQTs7V0FFQTtXQUNBOztXQUVBO1dBQ0E7O1dBRUE7V0FDQTs7V0FFQTtXQUNBLGdCQUFnQiw0QkFBNEI7V0FDNUM7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esa0JBQWtCLHVDQUF1QztXQUN6RDtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEdBQUc7V0FDSDtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBLG1CQUFtQixpQ0FBaUM7V0FDcEQ7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHNCQUFzQix1Q0FBdUM7V0FDN0Q7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esc0JBQXNCLHNCQUFzQjtXQUM1QztXQUNBO1dBQ0EsU0FBUztXQUNUO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxXQUFXO1dBQ1gsV0FBVztXQUNYO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsWUFBWTtXQUNaO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLFVBQVU7V0FDVjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxXQUFXO1dBQ1g7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQSxtQkFBbUIsd0NBQXdDO1dBQzNEO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsTUFBTTtXQUNOO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxRQUFRO1dBQ1IsUUFBUTtXQUNSO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLFNBQVM7V0FDVDtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxPQUFPO1dBQ1A7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLFFBQVE7V0FDUjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsRUFBRSxJQUFJO1dBQ047V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLElBQUk7V0FDSjtXQUNBO1dBQ0EsRUFBRTtXQUNGO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQTtXQUNBLHNDQUFzQztXQUN0QztXQUNBO1dBQ0EsRUFBRTtXQUNGOztXQUVBOztXQUVBOzs7OztVRTlmQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3ZhbmlsbGEtanMtcHJvamVjdC8uL25vZGVfbW9kdWxlcy9hbnNpLWh0bWwtY29tbXVuaXR5L2luZGV4LmpzIiwid2VicGFjazovL3ZhbmlsbGEtanMtcHJvamVjdC8uL25vZGVfbW9kdWxlcy9ldmVudHMvZXZlbnRzLmpzIiwid2VicGFjazovL3ZhbmlsbGEtanMtcHJvamVjdC8uLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vdmFuaWxsYS1qcy1wcm9qZWN0Ly4uL3NyYy9uYW1lZC1yZWZlcmVuY2VzLnRzIiwid2VicGFjazovL3ZhbmlsbGEtanMtcHJvamVjdC8uLi9zcmMvbnVtZXJpYy11bmljb2RlLW1hcC50cyIsIndlYnBhY2s6Ly92YW5pbGxhLWpzLXByb2plY3QvLi4vc3JjL3N1cnJvZ2F0ZS1wYWlycy50cyIsIndlYnBhY2s6Ly92YW5pbGxhLWpzLXByb2plY3QvLi9ub2RlX21vZHVsZXMvbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4vZGlzdC9obXIvaG90TW9kdWxlUmVwbGFjZW1lbnQuanMiLCJ3ZWJwYWNrOi8vdmFuaWxsYS1qcy1wcm9qZWN0Ly4vbm9kZV9tb2R1bGVzL21pbmktY3NzLWV4dHJhY3QtcGx1Z2luL2Rpc3QvaG1yL25vcm1hbGl6ZS11cmwuanMiLCJ3ZWJwYWNrOi8vdmFuaWxsYS1qcy1wcm9qZWN0Ly4vbm9kZV9tb2R1bGVzL3dlYnBhY2stZGV2LXNlcnZlci9jbGllbnQvY2xpZW50cy9XZWJTb2NrZXRDbGllbnQuanMiLCJ3ZWJwYWNrOi8vdmFuaWxsYS1qcy1wcm9qZWN0Ly4vbm9kZV9tb2R1bGVzL3dlYnBhY2stZGV2LXNlcnZlci9jbGllbnQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdmFuaWxsYS1qcy1wcm9qZWN0Ly4vbm9kZV9tb2R1bGVzL3dlYnBhY2stZGV2LXNlcnZlci9jbGllbnQvbW9kdWxlcy9sb2dnZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdmFuaWxsYS1qcy1wcm9qZWN0Ly4vbm9kZV9tb2R1bGVzL3dlYnBhY2stZGV2LXNlcnZlci9jbGllbnQvb3ZlcmxheS5qcyIsIndlYnBhY2s6Ly92YW5pbGxhLWpzLXByb2plY3QvLi9ub2RlX21vZHVsZXMvd2VicGFjay1kZXYtc2VydmVyL2NsaWVudC9vdmVybGF5L2ZzbS5qcyIsIndlYnBhY2s6Ly92YW5pbGxhLWpzLXByb2plY3QvLi9ub2RlX21vZHVsZXMvd2VicGFjay1kZXYtc2VydmVyL2NsaWVudC9vdmVybGF5L3J1bnRpbWUtZXJyb3IuanMiLCJ3ZWJwYWNrOi8vdmFuaWxsYS1qcy1wcm9qZWN0Ly4vbm9kZV9tb2R1bGVzL3dlYnBhY2stZGV2LXNlcnZlci9jbGllbnQvb3ZlcmxheS9zdGF0ZS1tYWNoaW5lLmpzIiwid2VicGFjazovL3ZhbmlsbGEtanMtcHJvamVjdC8uL25vZGVfbW9kdWxlcy93ZWJwYWNrLWRldi1zZXJ2ZXIvY2xpZW50L292ZXJsYXkvc3R5bGVzLmpzIiwid2VicGFjazovL3ZhbmlsbGEtanMtcHJvamVjdC8uL25vZGVfbW9kdWxlcy93ZWJwYWNrLWRldi1zZXJ2ZXIvY2xpZW50L3NvY2tldC5qcyIsIndlYnBhY2s6Ly92YW5pbGxhLWpzLXByb2plY3QvLi9ub2RlX21vZHVsZXMvd2VicGFjay1kZXYtc2VydmVyL2NsaWVudC91dGlscy9jcmVhdGVTb2NrZXRVUkwuanMiLCJ3ZWJwYWNrOi8vdmFuaWxsYS1qcy1wcm9qZWN0Ly4vbm9kZV9tb2R1bGVzL3dlYnBhY2stZGV2LXNlcnZlci9jbGllbnQvdXRpbHMvZ2V0Q3VycmVudFNjcmlwdFNvdXJjZS5qcyIsIndlYnBhY2s6Ly92YW5pbGxhLWpzLXByb2plY3QvLi9ub2RlX21vZHVsZXMvd2VicGFjay1kZXYtc2VydmVyL2NsaWVudC91dGlscy9sb2cuanMiLCJ3ZWJwYWNrOi8vdmFuaWxsYS1qcy1wcm9qZWN0Ly4vbm9kZV9tb2R1bGVzL3dlYnBhY2stZGV2LXNlcnZlci9jbGllbnQvdXRpbHMvcGFyc2VVUkwuanMiLCJ3ZWJwYWNrOi8vdmFuaWxsYS1qcy1wcm9qZWN0Ly4vbm9kZV9tb2R1bGVzL3dlYnBhY2stZGV2LXNlcnZlci9jbGllbnQvdXRpbHMvcmVsb2FkQXBwLmpzIiwid2VicGFjazovL3ZhbmlsbGEtanMtcHJvamVjdC8uL25vZGVfbW9kdWxlcy93ZWJwYWNrLWRldi1zZXJ2ZXIvY2xpZW50L3V0aWxzL3NlbmRNZXNzYWdlLmpzIiwid2VicGFjazovL3ZhbmlsbGEtanMtcHJvamVjdC8uL25vZGVfbW9kdWxlcy93ZWJwYWNrLWRldi1zZXJ2ZXIvY2xpZW50L3V0aWxzL3N0cmlwQW5zaS5qcyIsIndlYnBhY2s6Ly92YW5pbGxhLWpzLXByb2plY3QvLi9ub2RlX21vZHVsZXMvd2VicGFjay9ob3QvZGV2LXNlcnZlci5qcyIsIndlYnBhY2s6Ly92YW5pbGxhLWpzLXByb2plY3QvLi9ub2RlX21vZHVsZXMvd2VicGFjay9ob3QvZW1pdHRlci5qcyIsIndlYnBhY2s6Ly92YW5pbGxhLWpzLXByb2plY3QvLi9ub2RlX21vZHVsZXMvd2VicGFjay9ob3QvbG9nLWFwcGx5LXJlc3VsdC5qcyIsIndlYnBhY2s6Ly92YW5pbGxhLWpzLXByb2plY3QvLi9ub2RlX21vZHVsZXMvd2VicGFjay9ob3QvbG9nLmpzIiwid2VicGFjazovL3ZhbmlsbGEtanMtcHJvamVjdC8uL3N0eWxlcy9pbmRleC5zY3NzIiwid2VicGFjazovL3ZhbmlsbGEtanMtcHJvamVjdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly92YW5pbGxhLWpzLXByb2plY3Qvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vdmFuaWxsYS1qcy1wcm9qZWN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly92YW5pbGxhLWpzLXByb2plY3Qvd2VicGFjay9ydW50aW1lL2dldCBqYXZhc2NyaXB0IHVwZGF0ZSBjaHVuayBmaWxlbmFtZSIsIndlYnBhY2s6Ly92YW5pbGxhLWpzLXByb2plY3Qvd2VicGFjay9ydW50aW1lL2dldCBtaW5pLWNzcyBjaHVuayBmaWxlbmFtZSIsIndlYnBhY2s6Ly92YW5pbGxhLWpzLXByb2plY3Qvd2VicGFjay9ydW50aW1lL2dldCB1cGRhdGUgbWFuaWZlc3QgZmlsZW5hbWUiLCJ3ZWJwYWNrOi8vdmFuaWxsYS1qcy1wcm9qZWN0L3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCIsIndlYnBhY2s6Ly92YW5pbGxhLWpzLXByb2plY3Qvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly92YW5pbGxhLWpzLXByb2plY3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly92YW5pbGxhLWpzLXByb2plY3Qvd2VicGFjay9ydW50aW1lL2xvYWQgc2NyaXB0Iiwid2VicGFjazovL3ZhbmlsbGEtanMtcHJvamVjdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3ZhbmlsbGEtanMtcHJvamVjdC93ZWJwYWNrL3J1bnRpbWUvaG90IG1vZHVsZSByZXBsYWNlbWVudCIsIndlYnBhY2s6Ly92YW5pbGxhLWpzLXByb2plY3Qvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vdmFuaWxsYS1qcy1wcm9qZWN0L3dlYnBhY2svcnVudGltZS9jc3MgbG9hZGluZyIsIndlYnBhY2s6Ly92YW5pbGxhLWpzLXByb2plY3Qvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vdmFuaWxsYS1qcy1wcm9qZWN0L3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vdmFuaWxsYS1qcy1wcm9qZWN0L3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly92YW5pbGxhLWpzLXByb2plY3Qvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xuXG5tb2R1bGUuZXhwb3J0cyA9IGFuc2lIVE1MXG5cbi8vIFJlZmVyZW5jZSB0byBodHRwczovL2dpdGh1Yi5jb20vc2luZHJlc29yaHVzL2Fuc2ktcmVnZXhcbnZhciBfcmVnQU5TSSA9IC8oPzooPzpcXHUwMDFiXFxbKXxcXHUwMDliKSg/Oig/OlswLTldezEsM30pPyg/Oig/OjtbMC05XXswLDN9KSopP1tBLU18Zi1tXSl8XFx1MDAxYltBLU1dL1xuXG52YXIgX2RlZkNvbG9ycyA9IHtcbiAgcmVzZXQ6IFsnZmZmJywgJzAwMCddLCAvLyBbRk9SRUdST1VEX0NPTE9SLCBCQUNLR1JPVU5EX0NPTE9SXVxuICBibGFjazogJzAwMCcsXG4gIHJlZDogJ2ZmMDAwMCcsXG4gIGdyZWVuOiAnMjA5ODA1JyxcbiAgeWVsbG93OiAnZThiZjAzJyxcbiAgYmx1ZTogJzAwMDBmZicsXG4gIG1hZ2VudGE6ICdmZjAwZmYnLFxuICBjeWFuOiAnMDBmZmVlJyxcbiAgbGlnaHRncmV5OiAnZjBmMGYwJyxcbiAgZGFya2dyZXk6ICc4ODgnXG59XG52YXIgX3N0eWxlcyA9IHtcbiAgMzA6ICdibGFjaycsXG4gIDMxOiAncmVkJyxcbiAgMzI6ICdncmVlbicsXG4gIDMzOiAneWVsbG93JyxcbiAgMzQ6ICdibHVlJyxcbiAgMzU6ICdtYWdlbnRhJyxcbiAgMzY6ICdjeWFuJyxcbiAgMzc6ICdsaWdodGdyZXknXG59XG52YXIgX29wZW5UYWdzID0ge1xuICAnMSc6ICdmb250LXdlaWdodDpib2xkJywgLy8gYm9sZFxuICAnMic6ICdvcGFjaXR5OjAuNScsIC8vIGRpbVxuICAnMyc6ICc8aT4nLCAvLyBpdGFsaWNcbiAgJzQnOiAnPHU+JywgLy8gdW5kZXJzY29yZVxuICAnOCc6ICdkaXNwbGF5Om5vbmUnLCAvLyBoaWRkZW5cbiAgJzknOiAnPGRlbD4nIC8vIGRlbGV0ZVxufVxudmFyIF9jbG9zZVRhZ3MgPSB7XG4gICcyMyc6ICc8L2k+JywgLy8gcmVzZXQgaXRhbGljXG4gICcyNCc6ICc8L3U+JywgLy8gcmVzZXQgdW5kZXJzY29yZVxuICAnMjknOiAnPC9kZWw+JyAvLyByZXNldCBkZWxldGVcbn1cblxuO1swLCAyMSwgMjIsIDI3LCAyOCwgMzksIDQ5XS5mb3JFYWNoKGZ1bmN0aW9uIChuKSB7XG4gIF9jbG9zZVRhZ3Nbbl0gPSAnPC9zcGFuPidcbn0pXG5cbi8qKlxuICogQ29udmVydHMgdGV4dCB3aXRoIEFOU0kgY29sb3IgY29kZXMgdG8gSFRNTCBtYXJrdXAuXG4gKiBAcGFyYW0ge1N0cmluZ30gdGV4dFxuICogQHJldHVybnMgeyp9XG4gKi9cbmZ1bmN0aW9uIGFuc2lIVE1MICh0ZXh0KSB7XG4gIC8vIFJldHVybnMgdGhlIHRleHQgaWYgdGhlIHN0cmluZyBoYXMgbm8gQU5TSSBlc2NhcGUgY29kZS5cbiAgaWYgKCFfcmVnQU5TSS50ZXN0KHRleHQpKSB7XG4gICAgcmV0dXJuIHRleHRcbiAgfVxuXG4gIC8vIENhY2hlIG9wZW5lZCBzZXF1ZW5jZS5cbiAgdmFyIGFuc2lDb2RlcyA9IFtdXG4gIC8vIFJlcGxhY2Ugd2l0aCBtYXJrdXAuXG4gIHZhciByZXQgPSB0ZXh0LnJlcGxhY2UoL1xcMDMzXFxbKFxcZCspbS9nLCBmdW5jdGlvbiAobWF0Y2gsIHNlcSkge1xuICAgIHZhciBvdCA9IF9vcGVuVGFnc1tzZXFdXG4gICAgaWYgKG90KSB7XG4gICAgICAvLyBJZiBjdXJyZW50IHNlcXVlbmNlIGhhcyBiZWVuIG9wZW5lZCwgY2xvc2UgaXQuXG4gICAgICBpZiAoISF+YW5zaUNvZGVzLmluZGV4T2Yoc2VxKSkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWV4dHJhLWJvb2xlYW4tY2FzdFxuICAgICAgICBhbnNpQ29kZXMucG9wKClcbiAgICAgICAgcmV0dXJuICc8L3NwYW4+J1xuICAgICAgfVxuICAgICAgLy8gT3BlbiB0YWcuXG4gICAgICBhbnNpQ29kZXMucHVzaChzZXEpXG4gICAgICByZXR1cm4gb3RbMF0gPT09ICc8JyA/IG90IDogJzxzcGFuIHN0eWxlPVwiJyArIG90ICsgJztcIj4nXG4gICAgfVxuXG4gICAgdmFyIGN0ID0gX2Nsb3NlVGFnc1tzZXFdXG4gICAgaWYgKGN0KSB7XG4gICAgICAvLyBQb3Agc2VxdWVuY2VcbiAgICAgIGFuc2lDb2Rlcy5wb3AoKVxuICAgICAgcmV0dXJuIGN0XG4gICAgfVxuICAgIHJldHVybiAnJ1xuICB9KVxuXG4gIC8vIE1ha2Ugc3VyZSB0YWdzIGFyZSBjbG9zZWQuXG4gIHZhciBsID0gYW5zaUNvZGVzLmxlbmd0aFxuICA7KGwgPiAwKSAmJiAocmV0ICs9IEFycmF5KGwgKyAxKS5qb2luKCc8L3NwYW4+JykpXG5cbiAgcmV0dXJuIHJldFxufVxuXG4vKipcbiAqIEN1c3RvbWl6ZSBjb2xvcnMuXG4gKiBAcGFyYW0ge09iamVjdH0gY29sb3JzIHJlZmVyZW5jZSB0byBfZGVmQ29sb3JzXG4gKi9cbmFuc2lIVE1MLnNldENvbG9ycyA9IGZ1bmN0aW9uIChjb2xvcnMpIHtcbiAgaWYgKHR5cGVvZiBjb2xvcnMgIT09ICdvYmplY3QnKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdgY29sb3JzYCBwYXJhbWV0ZXIgbXVzdCBiZSBhbiBPYmplY3QuJylcbiAgfVxuXG4gIHZhciBfZmluYWxDb2xvcnMgPSB7fVxuICBmb3IgKHZhciBrZXkgaW4gX2RlZkNvbG9ycykge1xuICAgIHZhciBoZXggPSBjb2xvcnMuaGFzT3duUHJvcGVydHkoa2V5KSA/IGNvbG9yc1trZXldIDogbnVsbFxuICAgIGlmICghaGV4KSB7XG4gICAgICBfZmluYWxDb2xvcnNba2V5XSA9IF9kZWZDb2xvcnNba2V5XVxuICAgICAgY29udGludWVcbiAgICB9XG4gICAgaWYgKCdyZXNldCcgPT09IGtleSkge1xuICAgICAgaWYgKHR5cGVvZiBoZXggPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGhleCA9IFtoZXhdXG4gICAgICB9XG4gICAgICBpZiAoIUFycmF5LmlzQXJyYXkoaGV4KSB8fCBoZXgubGVuZ3RoID09PSAwIHx8IGhleC5zb21lKGZ1bmN0aW9uIChoKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgaCAhPT0gJ3N0cmluZydcbiAgICAgIH0pKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIHZhbHVlIG9mIGAnICsga2V5ICsgJ2AgcHJvcGVydHkgbXVzdCBiZSBhbiBBcnJheSBhbmQgZWFjaCBpdGVtIGNvdWxkIG9ubHkgYmUgYSBoZXggc3RyaW5nLCBlLmcuOiBGRjAwMDAnKVxuICAgICAgfVxuICAgICAgdmFyIGRlZkhleENvbG9yID0gX2RlZkNvbG9yc1trZXldXG4gICAgICBpZiAoIWhleFswXSkge1xuICAgICAgICBoZXhbMF0gPSBkZWZIZXhDb2xvclswXVxuICAgICAgfVxuICAgICAgaWYgKGhleC5sZW5ndGggPT09IDEgfHwgIWhleFsxXSkge1xuICAgICAgICBoZXggPSBbaGV4WzBdXVxuICAgICAgICBoZXgucHVzaChkZWZIZXhDb2xvclsxXSlcbiAgICAgIH1cblxuICAgICAgaGV4ID0gaGV4LnNsaWNlKDAsIDIpXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgaGV4ICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgdmFsdWUgb2YgYCcgKyBrZXkgKyAnYCBwcm9wZXJ0eSBtdXN0IGJlIGEgaGV4IHN0cmluZywgZS5nLjogRkYwMDAwJylcbiAgICB9XG4gICAgX2ZpbmFsQ29sb3JzW2tleV0gPSBoZXhcbiAgfVxuICBfc2V0VGFncyhfZmluYWxDb2xvcnMpXG59XG5cbi8qKlxuICogUmVzZXQgY29sb3JzLlxuICovXG5hbnNpSFRNTC5yZXNldCA9IGZ1bmN0aW9uICgpIHtcbiAgX3NldFRhZ3MoX2RlZkNvbG9ycylcbn1cblxuLyoqXG4gKiBFeHBvc2UgdGFncywgaW5jbHVkaW5nIG9wZW4gYW5kIGNsb3NlLlxuICogQHR5cGUge09iamVjdH1cbiAqL1xuYW5zaUhUTUwudGFncyA9IHt9XG5cbmlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGFuc2lIVE1MLnRhZ3MsICdvcGVuJywge1xuICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gX29wZW5UYWdzIH1cbiAgfSlcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGFuc2lIVE1MLnRhZ3MsICdjbG9zZScsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIF9jbG9zZVRhZ3MgfVxuICB9KVxufSBlbHNlIHtcbiAgYW5zaUhUTUwudGFncy5vcGVuID0gX29wZW5UYWdzXG4gIGFuc2lIVE1MLnRhZ3MuY2xvc2UgPSBfY2xvc2VUYWdzXG59XG5cbmZ1bmN0aW9uIF9zZXRUYWdzIChjb2xvcnMpIHtcbiAgLy8gcmVzZXQgYWxsXG4gIF9vcGVuVGFnc1snMCddID0gJ2ZvbnQtd2VpZ2h0Om5vcm1hbDtvcGFjaXR5OjE7Y29sb3I6IycgKyBjb2xvcnMucmVzZXRbMF0gKyAnO2JhY2tncm91bmQ6IycgKyBjb2xvcnMucmVzZXRbMV1cbiAgLy8gaW52ZXJzZVxuICBfb3BlblRhZ3NbJzcnXSA9ICdjb2xvcjojJyArIGNvbG9ycy5yZXNldFsxXSArICc7YmFja2dyb3VuZDojJyArIGNvbG9ycy5yZXNldFswXVxuICAvLyBkYXJrIGdyZXlcbiAgX29wZW5UYWdzWyc5MCddID0gJ2NvbG9yOiMnICsgY29sb3JzLmRhcmtncmV5XG5cbiAgZm9yICh2YXIgY29kZSBpbiBfc3R5bGVzKSB7XG4gICAgdmFyIGNvbG9yID0gX3N0eWxlc1tjb2RlXVxuICAgIHZhciBvcmlDb2xvciA9IGNvbG9yc1tjb2xvcl0gfHwgJzAwMCdcbiAgICBfb3BlblRhZ3NbY29kZV0gPSAnY29sb3I6IycgKyBvcmlDb2xvclxuICAgIGNvZGUgPSBwYXJzZUludChjb2RlKVxuICAgIF9vcGVuVGFnc1soY29kZSArIDEwKS50b1N0cmluZygpXSA9ICdiYWNrZ3JvdW5kOiMnICsgb3JpQ29sb3JcbiAgfVxufVxuXG5hbnNpSFRNTC5yZXNldCgpXG4iLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUiA9IHR5cGVvZiBSZWZsZWN0ID09PSAnb2JqZWN0JyA/IFJlZmxlY3QgOiBudWxsXG52YXIgUmVmbGVjdEFwcGx5ID0gUiAmJiB0eXBlb2YgUi5hcHBseSA9PT0gJ2Z1bmN0aW9uJ1xuICA/IFIuYXBwbHlcbiAgOiBmdW5jdGlvbiBSZWZsZWN0QXBwbHkodGFyZ2V0LCByZWNlaXZlciwgYXJncykge1xuICAgIHJldHVybiBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHkuY2FsbCh0YXJnZXQsIHJlY2VpdmVyLCBhcmdzKTtcbiAgfVxuXG52YXIgUmVmbGVjdE93bktleXNcbmlmIChSICYmIHR5cGVvZiBSLm93bktleXMgPT09ICdmdW5jdGlvbicpIHtcbiAgUmVmbGVjdE93bktleXMgPSBSLm93bktleXNcbn0gZWxzZSBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykge1xuICBSZWZsZWN0T3duS2V5cyA9IGZ1bmN0aW9uIFJlZmxlY3RPd25LZXlzKHRhcmdldCkge1xuICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0YXJnZXQpXG4gICAgICAuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHModGFyZ2V0KSk7XG4gIH07XG59IGVsc2Uge1xuICBSZWZsZWN0T3duS2V5cyA9IGZ1bmN0aW9uIFJlZmxlY3RPd25LZXlzKHRhcmdldCkge1xuICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0YXJnZXQpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBQcm9jZXNzRW1pdFdhcm5pbmcod2FybmluZykge1xuICBpZiAoY29uc29sZSAmJiBjb25zb2xlLndhcm4pIGNvbnNvbGUud2Fybih3YXJuaW5nKTtcbn1cblxudmFyIE51bWJlcklzTmFOID0gTnVtYmVyLmlzTmFOIHx8IGZ1bmN0aW9uIE51bWJlcklzTmFOKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPT0gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHtcbiAgRXZlbnRFbWl0dGVyLmluaXQuY2FsbCh0aGlzKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gRXZlbnRFbWl0dGVyO1xubW9kdWxlLmV4cG9ydHMub25jZSA9IG9uY2U7XG5cbi8vIEJhY2t3YXJkcy1jb21wYXQgd2l0aCBub2RlIDAuMTAueFxuRXZlbnRFbWl0dGVyLkV2ZW50RW1pdHRlciA9IEV2ZW50RW1pdHRlcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzID0gdW5kZWZpbmVkO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzQ291bnQgPSAwO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fbWF4TGlzdGVuZXJzID0gdW5kZWZpbmVkO1xuXG4vLyBCeSBkZWZhdWx0IEV2ZW50RW1pdHRlcnMgd2lsbCBwcmludCBhIHdhcm5pbmcgaWYgbW9yZSB0aGFuIDEwIGxpc3RlbmVycyBhcmVcbi8vIGFkZGVkIHRvIGl0LiBUaGlzIGlzIGEgdXNlZnVsIGRlZmF1bHQgd2hpY2ggaGVscHMgZmluZGluZyBtZW1vcnkgbGVha3MuXG52YXIgZGVmYXVsdE1heExpc3RlbmVycyA9IDEwO1xuXG5mdW5jdGlvbiBjaGVja0xpc3RlbmVyKGxpc3RlbmVyKSB7XG4gIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJsaXN0ZW5lclwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBGdW5jdGlvbi4gUmVjZWl2ZWQgdHlwZSAnICsgdHlwZW9mIGxpc3RlbmVyKTtcbiAgfVxufVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoRXZlbnRFbWl0dGVyLCAnZGVmYXVsdE1heExpc3RlbmVycycsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZGVmYXVsdE1heExpc3RlbmVycztcbiAgfSxcbiAgc2V0OiBmdW5jdGlvbihhcmcpIHtcbiAgICBpZiAodHlwZW9mIGFyZyAhPT0gJ251bWJlcicgfHwgYXJnIDwgMCB8fCBOdW1iZXJJc05hTihhcmcpKSB7XG4gICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVGhlIHZhbHVlIG9mIFwiZGVmYXVsdE1heExpc3RlbmVyc1wiIGlzIG91dCBvZiByYW5nZS4gSXQgbXVzdCBiZSBhIG5vbi1uZWdhdGl2ZSBudW1iZXIuIFJlY2VpdmVkICcgKyBhcmcgKyAnLicpO1xuICAgIH1cbiAgICBkZWZhdWx0TWF4TGlzdGVuZXJzID0gYXJnO1xuICB9XG59KTtcblxuRXZlbnRFbWl0dGVyLmluaXQgPSBmdW5jdGlvbigpIHtcblxuICBpZiAodGhpcy5fZXZlbnRzID09PSB1bmRlZmluZWQgfHxcbiAgICAgIHRoaXMuX2V2ZW50cyA9PT0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHRoaXMpLl9ldmVudHMpIHtcbiAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbiAgfVxuXG4gIHRoaXMuX21heExpc3RlbmVycyA9IHRoaXMuX21heExpc3RlbmVycyB8fCB1bmRlZmluZWQ7XG59O1xuXG4vLyBPYnZpb3VzbHkgbm90IGFsbCBFbWl0dGVycyBzaG91bGQgYmUgbGltaXRlZCB0byAxMC4gVGhpcyBmdW5jdGlvbiBhbGxvd3Ncbi8vIHRoYXQgdG8gYmUgaW5jcmVhc2VkLiBTZXQgdG8gemVybyBmb3IgdW5saW1pdGVkLlxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5zZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbiBzZXRNYXhMaXN0ZW5lcnMobikge1xuICBpZiAodHlwZW9mIG4gIT09ICdudW1iZXInIHx8IG4gPCAwIHx8IE51bWJlcklzTmFOKG4pKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RoZSB2YWx1ZSBvZiBcIm5cIiBpcyBvdXQgb2YgcmFuZ2UuIEl0IG11c3QgYmUgYSBub24tbmVnYXRpdmUgbnVtYmVyLiBSZWNlaXZlZCAnICsgbiArICcuJyk7XG4gIH1cbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gbjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5mdW5jdGlvbiBfZ2V0TWF4TGlzdGVuZXJzKHRoYXQpIHtcbiAgaWYgKHRoYXQuX21heExpc3RlbmVycyA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBFdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVycztcbiAgcmV0dXJuIHRoYXQuX21heExpc3RlbmVycztcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5nZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbiBnZXRNYXhMaXN0ZW5lcnMoKSB7XG4gIHJldHVybiBfZ2V0TWF4TGlzdGVuZXJzKHRoaXMpO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gZW1pdCh0eXBlKSB7XG4gIHZhciBhcmdzID0gW107XG4gIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSBhcmdzLnB1c2goYXJndW1lbnRzW2ldKTtcbiAgdmFyIGRvRXJyb3IgPSAodHlwZSA9PT0gJ2Vycm9yJyk7XG5cbiAgdmFyIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcbiAgaWYgKGV2ZW50cyAhPT0gdW5kZWZpbmVkKVxuICAgIGRvRXJyb3IgPSAoZG9FcnJvciAmJiBldmVudHMuZXJyb3IgPT09IHVuZGVmaW5lZCk7XG4gIGVsc2UgaWYgKCFkb0Vycm9yKVxuICAgIHJldHVybiBmYWxzZTtcblxuICAvLyBJZiB0aGVyZSBpcyBubyAnZXJyb3InIGV2ZW50IGxpc3RlbmVyIHRoZW4gdGhyb3cuXG4gIGlmIChkb0Vycm9yKSB7XG4gICAgdmFyIGVyO1xuICAgIGlmIChhcmdzLmxlbmd0aCA+IDApXG4gICAgICBlciA9IGFyZ3NbMF07XG4gICAgaWYgKGVyIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgIC8vIE5vdGU6IFRoZSBjb21tZW50cyBvbiB0aGUgYHRocm93YCBsaW5lcyBhcmUgaW50ZW50aW9uYWwsIHRoZXkgc2hvd1xuICAgICAgLy8gdXAgaW4gTm9kZSdzIG91dHB1dCBpZiB0aGlzIHJlc3VsdHMgaW4gYW4gdW5oYW5kbGVkIGV4Y2VwdGlvbi5cbiAgICAgIHRocm93IGVyOyAvLyBVbmhhbmRsZWQgJ2Vycm9yJyBldmVudFxuICAgIH1cbiAgICAvLyBBdCBsZWFzdCBnaXZlIHNvbWUga2luZCBvZiBjb250ZXh0IHRvIHRoZSB1c2VyXG4gICAgdmFyIGVyciA9IG5ldyBFcnJvcignVW5oYW5kbGVkIGVycm9yLicgKyAoZXIgPyAnICgnICsgZXIubWVzc2FnZSArICcpJyA6ICcnKSk7XG4gICAgZXJyLmNvbnRleHQgPSBlcjtcbiAgICB0aHJvdyBlcnI7IC8vIFVuaGFuZGxlZCAnZXJyb3InIGV2ZW50XG4gIH1cblxuICB2YXIgaGFuZGxlciA9IGV2ZW50c1t0eXBlXTtcblxuICBpZiAoaGFuZGxlciA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBmYWxzZTtcblxuICBpZiAodHlwZW9mIGhhbmRsZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICBSZWZsZWN0QXBwbHkoaGFuZGxlciwgdGhpcywgYXJncyk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGxlbiA9IGhhbmRsZXIubGVuZ3RoO1xuICAgIHZhciBsaXN0ZW5lcnMgPSBhcnJheUNsb25lKGhhbmRsZXIsIGxlbik7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSlcbiAgICAgIFJlZmxlY3RBcHBseShsaXN0ZW5lcnNbaV0sIHRoaXMsIGFyZ3MpO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5mdW5jdGlvbiBfYWRkTGlzdGVuZXIodGFyZ2V0LCB0eXBlLCBsaXN0ZW5lciwgcHJlcGVuZCkge1xuICB2YXIgbTtcbiAgdmFyIGV2ZW50cztcbiAgdmFyIGV4aXN0aW5nO1xuXG4gIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpO1xuXG4gIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzO1xuICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpIHtcbiAgICBldmVudHMgPSB0YXJnZXQuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgdGFyZ2V0Ll9ldmVudHNDb3VudCA9IDA7XG4gIH0gZWxzZSB7XG4gICAgLy8gVG8gYXZvaWQgcmVjdXJzaW9uIGluIHRoZSBjYXNlIHRoYXQgdHlwZSA9PT0gXCJuZXdMaXN0ZW5lclwiISBCZWZvcmVcbiAgICAvLyBhZGRpbmcgaXQgdG8gdGhlIGxpc3RlbmVycywgZmlyc3QgZW1pdCBcIm5ld0xpc3RlbmVyXCIuXG4gICAgaWYgKGV2ZW50cy5uZXdMaXN0ZW5lciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0YXJnZXQuZW1pdCgnbmV3TGlzdGVuZXInLCB0eXBlLFxuICAgICAgICAgICAgICAgICAgbGlzdGVuZXIubGlzdGVuZXIgPyBsaXN0ZW5lci5saXN0ZW5lciA6IGxpc3RlbmVyKTtcblxuICAgICAgLy8gUmUtYXNzaWduIGBldmVudHNgIGJlY2F1c2UgYSBuZXdMaXN0ZW5lciBoYW5kbGVyIGNvdWxkIGhhdmUgY2F1c2VkIHRoZVxuICAgICAgLy8gdGhpcy5fZXZlbnRzIHRvIGJlIGFzc2lnbmVkIHRvIGEgbmV3IG9iamVjdFxuICAgICAgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHM7XG4gICAgfVxuICAgIGV4aXN0aW5nID0gZXZlbnRzW3R5cGVdO1xuICB9XG5cbiAgaWYgKGV4aXN0aW5nID09PSB1bmRlZmluZWQpIHtcbiAgICAvLyBPcHRpbWl6ZSB0aGUgY2FzZSBvZiBvbmUgbGlzdGVuZXIuIERvbid0IG5lZWQgdGhlIGV4dHJhIGFycmF5IG9iamVjdC5cbiAgICBleGlzdGluZyA9IGV2ZW50c1t0eXBlXSA9IGxpc3RlbmVyO1xuICAgICsrdGFyZ2V0Ll9ldmVudHNDb3VudDtcbiAgfSBlbHNlIHtcbiAgICBpZiAodHlwZW9mIGV4aXN0aW5nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAvLyBBZGRpbmcgdGhlIHNlY29uZCBlbGVtZW50LCBuZWVkIHRvIGNoYW5nZSB0byBhcnJheS5cbiAgICAgIGV4aXN0aW5nID0gZXZlbnRzW3R5cGVdID1cbiAgICAgICAgcHJlcGVuZCA/IFtsaXN0ZW5lciwgZXhpc3RpbmddIDogW2V4aXN0aW5nLCBsaXN0ZW5lcl07XG4gICAgICAvLyBJZiB3ZSd2ZSBhbHJlYWR5IGdvdCBhbiBhcnJheSwganVzdCBhcHBlbmQuXG4gICAgfSBlbHNlIGlmIChwcmVwZW5kKSB7XG4gICAgICBleGlzdGluZy51bnNoaWZ0KGxpc3RlbmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXhpc3RpbmcucHVzaChsaXN0ZW5lcik7XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgZm9yIGxpc3RlbmVyIGxlYWtcbiAgICBtID0gX2dldE1heExpc3RlbmVycyh0YXJnZXQpO1xuICAgIGlmIChtID4gMCAmJiBleGlzdGluZy5sZW5ndGggPiBtICYmICFleGlzdGluZy53YXJuZWQpIHtcbiAgICAgIGV4aXN0aW5nLndhcm5lZCA9IHRydWU7XG4gICAgICAvLyBObyBlcnJvciBjb2RlIGZvciB0aGlzIHNpbmNlIGl0IGlzIGEgV2FybmluZ1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG4gICAgICB2YXIgdyA9IG5ldyBFcnJvcignUG9zc2libGUgRXZlbnRFbWl0dGVyIG1lbW9yeSBsZWFrIGRldGVjdGVkLiAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZXhpc3RpbmcubGVuZ3RoICsgJyAnICsgU3RyaW5nKHR5cGUpICsgJyBsaXN0ZW5lcnMgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICdhZGRlZC4gVXNlIGVtaXR0ZXIuc2V0TWF4TGlzdGVuZXJzKCkgdG8gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICdpbmNyZWFzZSBsaW1pdCcpO1xuICAgICAgdy5uYW1lID0gJ01heExpc3RlbmVyc0V4Y2VlZGVkV2FybmluZyc7XG4gICAgICB3LmVtaXR0ZXIgPSB0YXJnZXQ7XG4gICAgICB3LnR5cGUgPSB0eXBlO1xuICAgICAgdy5jb3VudCA9IGV4aXN0aW5nLmxlbmd0aDtcbiAgICAgIFByb2Nlc3NFbWl0V2FybmluZyh3KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyID0gZnVuY3Rpb24gYWRkTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgcmV0dXJuIF9hZGRMaXN0ZW5lcih0aGlzLCB0eXBlLCBsaXN0ZW5lciwgZmFsc2UpO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbiA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucHJlcGVuZExpc3RlbmVyID1cbiAgICBmdW5jdGlvbiBwcmVwZW5kTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgIHJldHVybiBfYWRkTGlzdGVuZXIodGhpcywgdHlwZSwgbGlzdGVuZXIsIHRydWUpO1xuICAgIH07XG5cbmZ1bmN0aW9uIG9uY2VXcmFwcGVyKCkge1xuICBpZiAoIXRoaXMuZmlyZWQpIHtcbiAgICB0aGlzLnRhcmdldC5yZW1vdmVMaXN0ZW5lcih0aGlzLnR5cGUsIHRoaXMud3JhcEZuKTtcbiAgICB0aGlzLmZpcmVkID0gdHJ1ZTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMClcbiAgICAgIHJldHVybiB0aGlzLmxpc3RlbmVyLmNhbGwodGhpcy50YXJnZXQpO1xuICAgIHJldHVybiB0aGlzLmxpc3RlbmVyLmFwcGx5KHRoaXMudGFyZ2V0LCBhcmd1bWVudHMpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9vbmNlV3JhcCh0YXJnZXQsIHR5cGUsIGxpc3RlbmVyKSB7XG4gIHZhciBzdGF0ZSA9IHsgZmlyZWQ6IGZhbHNlLCB3cmFwRm46IHVuZGVmaW5lZCwgdGFyZ2V0OiB0YXJnZXQsIHR5cGU6IHR5cGUsIGxpc3RlbmVyOiBsaXN0ZW5lciB9O1xuICB2YXIgd3JhcHBlZCA9IG9uY2VXcmFwcGVyLmJpbmQoc3RhdGUpO1xuICB3cmFwcGVkLmxpc3RlbmVyID0gbGlzdGVuZXI7XG4gIHN0YXRlLndyYXBGbiA9IHdyYXBwZWQ7XG4gIHJldHVybiB3cmFwcGVkO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbiBvbmNlKHR5cGUsIGxpc3RlbmVyKSB7XG4gIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpO1xuICB0aGlzLm9uKHR5cGUsIF9vbmNlV3JhcCh0aGlzLCB0eXBlLCBsaXN0ZW5lcikpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucHJlcGVuZE9uY2VMaXN0ZW5lciA9XG4gICAgZnVuY3Rpb24gcHJlcGVuZE9uY2VMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgY2hlY2tMaXN0ZW5lcihsaXN0ZW5lcik7XG4gICAgICB0aGlzLnByZXBlbmRMaXN0ZW5lcih0eXBlLCBfb25jZVdyYXAodGhpcywgdHlwZSwgbGlzdGVuZXIpKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbi8vIEVtaXRzIGEgJ3JlbW92ZUxpc3RlbmVyJyBldmVudCBpZiBhbmQgb25seSBpZiB0aGUgbGlzdGVuZXIgd2FzIHJlbW92ZWQuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID1cbiAgICBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgdmFyIGxpc3QsIGV2ZW50cywgcG9zaXRpb24sIGksIG9yaWdpbmFsTGlzdGVuZXI7XG5cbiAgICAgIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpO1xuXG4gICAgICBldmVudHMgPSB0aGlzLl9ldmVudHM7XG4gICAgICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICBsaXN0ID0gZXZlbnRzW3R5cGVdO1xuICAgICAgaWYgKGxpc3QgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgIGlmIChsaXN0ID09PSBsaXN0ZW5lciB8fCBsaXN0Lmxpc3RlbmVyID09PSBsaXN0ZW5lcikge1xuICAgICAgICBpZiAoLS10aGlzLl9ldmVudHNDb3VudCA9PT0gMClcbiAgICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBkZWxldGUgZXZlbnRzW3R5cGVdO1xuICAgICAgICAgIGlmIChldmVudHMucmVtb3ZlTGlzdGVuZXIpXG4gICAgICAgICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgbGlzdC5saXN0ZW5lciB8fCBsaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGxpc3QgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcG9zaXRpb24gPSAtMTtcblxuICAgICAgICBmb3IgKGkgPSBsaXN0Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgaWYgKGxpc3RbaV0gPT09IGxpc3RlbmVyIHx8IGxpc3RbaV0ubGlzdGVuZXIgPT09IGxpc3RlbmVyKSB7XG4gICAgICAgICAgICBvcmlnaW5hbExpc3RlbmVyID0gbGlzdFtpXS5saXN0ZW5lcjtcbiAgICAgICAgICAgIHBvc2l0aW9uID0gaTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwb3NpdGlvbiA8IDApXG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgICAgaWYgKHBvc2l0aW9uID09PSAwKVxuICAgICAgICAgIGxpc3Quc2hpZnQoKTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgc3BsaWNlT25lKGxpc3QsIHBvc2l0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSlcbiAgICAgICAgICBldmVudHNbdHlwZV0gPSBsaXN0WzBdO1xuXG4gICAgICAgIGlmIChldmVudHMucmVtb3ZlTGlzdGVuZXIgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgb3JpZ2luYWxMaXN0ZW5lciB8fCBsaXN0ZW5lcik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub2ZmID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPVxuICAgIGZ1bmN0aW9uIHJlbW92ZUFsbExpc3RlbmVycyh0eXBlKSB7XG4gICAgICB2YXIgbGlzdGVuZXJzLCBldmVudHMsIGk7XG5cbiAgICAgIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcbiAgICAgIGlmIChldmVudHMgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgIC8vIG5vdCBsaXN0ZW5pbmcgZm9yIHJlbW92ZUxpc3RlbmVyLCBubyBuZWVkIHRvIGVtaXRcbiAgICAgIGlmIChldmVudHMucmVtb3ZlTGlzdGVuZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50c1t0eXBlXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgaWYgKC0tdGhpcy5fZXZlbnRzQ291bnQgPT09IDApXG4gICAgICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIGRlbGV0ZSBldmVudHNbdHlwZV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIC8vIGVtaXQgcmVtb3ZlTGlzdGVuZXIgZm9yIGFsbCBsaXN0ZW5lcnMgb24gYWxsIGV2ZW50c1xuICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhldmVudHMpO1xuICAgICAgICB2YXIga2V5O1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgIGtleSA9IGtleXNbaV07XG4gICAgICAgICAgaWYgKGtleSA9PT0gJ3JlbW92ZUxpc3RlbmVyJykgY29udGludWU7XG4gICAgICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoa2V5KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycygncmVtb3ZlTGlzdGVuZXInKTtcbiAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgbGlzdGVuZXJzID0gZXZlbnRzW3R5cGVdO1xuXG4gICAgICBpZiAodHlwZW9mIGxpc3RlbmVycyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVycyk7XG4gICAgICB9IGVsc2UgaWYgKGxpc3RlbmVycyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIC8vIExJRk8gb3JkZXJcbiAgICAgICAgZm9yIChpID0gbGlzdGVuZXJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnNbaV0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbmZ1bmN0aW9uIF9saXN0ZW5lcnModGFyZ2V0LCB0eXBlLCB1bndyYXApIHtcbiAgdmFyIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzO1xuXG4gIGlmIChldmVudHMgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gW107XG5cbiAgdmFyIGV2bGlzdGVuZXIgPSBldmVudHNbdHlwZV07XG4gIGlmIChldmxpc3RlbmVyID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIFtdO1xuXG4gIGlmICh0eXBlb2YgZXZsaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJylcbiAgICByZXR1cm4gdW53cmFwID8gW2V2bGlzdGVuZXIubGlzdGVuZXIgfHwgZXZsaXN0ZW5lcl0gOiBbZXZsaXN0ZW5lcl07XG5cbiAgcmV0dXJuIHVud3JhcCA/XG4gICAgdW53cmFwTGlzdGVuZXJzKGV2bGlzdGVuZXIpIDogYXJyYXlDbG9uZShldmxpc3RlbmVyLCBldmxpc3RlbmVyLmxlbmd0aCk7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24gbGlzdGVuZXJzKHR5cGUpIHtcbiAgcmV0dXJuIF9saXN0ZW5lcnModGhpcywgdHlwZSwgdHJ1ZSk7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJhd0xpc3RlbmVycyA9IGZ1bmN0aW9uIHJhd0xpc3RlbmVycyh0eXBlKSB7XG4gIHJldHVybiBfbGlzdGVuZXJzKHRoaXMsIHR5cGUsIGZhbHNlKTtcbn07XG5cbkV2ZW50RW1pdHRlci5saXN0ZW5lckNvdW50ID0gZnVuY3Rpb24oZW1pdHRlciwgdHlwZSkge1xuICBpZiAodHlwZW9mIGVtaXR0ZXIubGlzdGVuZXJDb3VudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBlbWl0dGVyLmxpc3RlbmVyQ291bnQodHlwZSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGxpc3RlbmVyQ291bnQuY2FsbChlbWl0dGVyLCB0eXBlKTtcbiAgfVxufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lckNvdW50ID0gbGlzdGVuZXJDb3VudDtcbmZ1bmN0aW9uIGxpc3RlbmVyQ291bnQodHlwZSkge1xuICB2YXIgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuXG4gIGlmIChldmVudHMgIT09IHVuZGVmaW5lZCkge1xuICAgIHZhciBldmxpc3RlbmVyID0gZXZlbnRzW3R5cGVdO1xuXG4gICAgaWYgKHR5cGVvZiBldmxpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gMTtcbiAgICB9IGVsc2UgaWYgKGV2bGlzdGVuZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGV2bGlzdGVuZXIubGVuZ3RoO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiAwO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmV2ZW50TmFtZXMgPSBmdW5jdGlvbiBldmVudE5hbWVzKCkge1xuICByZXR1cm4gdGhpcy5fZXZlbnRzQ291bnQgPiAwID8gUmVmbGVjdE93bktleXModGhpcy5fZXZlbnRzKSA6IFtdO1xufTtcblxuZnVuY3Rpb24gYXJyYXlDbG9uZShhcnIsIG4pIHtcbiAgdmFyIGNvcHkgPSBuZXcgQXJyYXkobik7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbjsgKytpKVxuICAgIGNvcHlbaV0gPSBhcnJbaV07XG4gIHJldHVybiBjb3B5O1xufVxuXG5mdW5jdGlvbiBzcGxpY2VPbmUobGlzdCwgaW5kZXgpIHtcbiAgZm9yICg7IGluZGV4ICsgMSA8IGxpc3QubGVuZ3RoOyBpbmRleCsrKVxuICAgIGxpc3RbaW5kZXhdID0gbGlzdFtpbmRleCArIDFdO1xuICBsaXN0LnBvcCgpO1xufVxuXG5mdW5jdGlvbiB1bndyYXBMaXN0ZW5lcnMoYXJyKSB7XG4gIHZhciByZXQgPSBuZXcgQXJyYXkoYXJyLmxlbmd0aCk7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcmV0Lmxlbmd0aDsgKytpKSB7XG4gICAgcmV0W2ldID0gYXJyW2ldLmxpc3RlbmVyIHx8IGFycltpXTtcbiAgfVxuICByZXR1cm4gcmV0O1xufVxuXG5mdW5jdGlvbiBvbmNlKGVtaXR0ZXIsIG5hbWUpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICBmdW5jdGlvbiBlcnJvckxpc3RlbmVyKGVycikge1xuICAgICAgZW1pdHRlci5yZW1vdmVMaXN0ZW5lcihuYW1lLCByZXNvbHZlcik7XG4gICAgICByZWplY3QoZXJyKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZXNvbHZlcigpIHtcbiAgICAgIGlmICh0eXBlb2YgZW1pdHRlci5yZW1vdmVMaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBlbWl0dGVyLnJlbW92ZUxpc3RlbmVyKCdlcnJvcicsIGVycm9yTGlzdGVuZXIpO1xuICAgICAgfVxuICAgICAgcmVzb2x2ZShbXS5zbGljZS5jYWxsKGFyZ3VtZW50cykpO1xuICAgIH07XG5cbiAgICBldmVudFRhcmdldEFnbm9zdGljQWRkTGlzdGVuZXIoZW1pdHRlciwgbmFtZSwgcmVzb2x2ZXIsIHsgb25jZTogdHJ1ZSB9KTtcbiAgICBpZiAobmFtZSAhPT0gJ2Vycm9yJykge1xuICAgICAgYWRkRXJyb3JIYW5kbGVySWZFdmVudEVtaXR0ZXIoZW1pdHRlciwgZXJyb3JMaXN0ZW5lciwgeyBvbmNlOiB0cnVlIH0pO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGFkZEVycm9ySGFuZGxlcklmRXZlbnRFbWl0dGVyKGVtaXR0ZXIsIGhhbmRsZXIsIGZsYWdzKSB7XG4gIGlmICh0eXBlb2YgZW1pdHRlci5vbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGV2ZW50VGFyZ2V0QWdub3N0aWNBZGRMaXN0ZW5lcihlbWl0dGVyLCAnZXJyb3InLCBoYW5kbGVyLCBmbGFncyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZXZlbnRUYXJnZXRBZ25vc3RpY0FkZExpc3RlbmVyKGVtaXR0ZXIsIG5hbWUsIGxpc3RlbmVyLCBmbGFncykge1xuICBpZiAodHlwZW9mIGVtaXR0ZXIub24gPT09ICdmdW5jdGlvbicpIHtcbiAgICBpZiAoZmxhZ3Mub25jZSkge1xuICAgICAgZW1pdHRlci5vbmNlKG5hbWUsIGxpc3RlbmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZW1pdHRlci5vbihuYW1lLCBsaXN0ZW5lcik7XG4gICAgfVxuICB9IGVsc2UgaWYgKHR5cGVvZiBlbWl0dGVyLmFkZEV2ZW50TGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAvLyBFdmVudFRhcmdldCBkb2VzIG5vdCBoYXZlIGBlcnJvcmAgZXZlbnQgc2VtYW50aWNzIGxpa2UgTm9kZVxuICAgIC8vIEV2ZW50RW1pdHRlcnMsIHdlIGRvIG5vdCBsaXN0ZW4gZm9yIGBlcnJvcmAgZXZlbnRzIGhlcmUuXG4gICAgZW1pdHRlci5hZGRFdmVudExpc3RlbmVyKG5hbWUsIGZ1bmN0aW9uIHdyYXBMaXN0ZW5lcihhcmcpIHtcbiAgICAgIC8vIElFIGRvZXMgbm90IGhhdmUgYnVpbHRpbiBgeyBvbmNlOiB0cnVlIH1gIHN1cHBvcnQgc28gd2VcbiAgICAgIC8vIGhhdmUgdG8gZG8gaXQgbWFudWFsbHkuXG4gICAgICBpZiAoZmxhZ3Mub25jZSkge1xuICAgICAgICBlbWl0dGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIobmFtZSwgd3JhcExpc3RlbmVyKTtcbiAgICAgIH1cbiAgICAgIGxpc3RlbmVyKGFyZyk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIFwiZW1pdHRlclwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBFdmVudEVtaXR0ZXIuIFJlY2VpdmVkIHR5cGUgJyArIHR5cGVvZiBlbWl0dGVyKTtcbiAgfVxufVxuIixudWxsLG51bGwsbnVsbCxudWxsLCJcInVzZSBzdHJpY3RcIjtcblxuLyogZXNsaW50LWVudiBicm93c2VyICovXG4vKlxuICBlc2xpbnQtZGlzYWJsZVxuICBuby1jb25zb2xlLFxuICBmdW5jLW5hbWVzXG4qL1xuXG4vKiogQHR5cGVkZWYge2FueX0gVE9ETyAqL1xuXG52YXIgbm9ybWFsaXplVXJsID0gcmVxdWlyZShcIi4vbm9ybWFsaXplLXVybFwiKTtcbnZhciBzcmNCeU1vZHVsZUlkID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbnZhciBub0RvY3VtZW50ID0gdHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiO1xudmFyIGZvckVhY2ggPSBBcnJheS5wcm90b3R5cGUuZm9yRWFjaDtcblxuLyoqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBmblxuICogQHBhcmFtIHtudW1iZXJ9IHRpbWVcbiAqIEByZXR1cm5zIHsoZnVuY3Rpb24oKTogdm9pZCl8Kn1cbiAqL1xuZnVuY3Rpb24gZGVib3VuY2UoZm4sIHRpbWUpIHtcbiAgdmFyIHRpbWVvdXQgPSAwO1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHByZWZlci1yZXN0LXBhcmFtc1xuICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuICAgIHZhciBmdW5jdGlvbkNhbGwgPSBmdW5jdGlvbiBmdW5jdGlvbkNhbGwoKSB7XG4gICAgICByZXR1cm4gZm4uYXBwbHkoc2VsZiwgYXJncyk7XG4gICAgfTtcbiAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG5cbiAgICAvLyBAdHMtaWdub3JlXG4gICAgdGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb25DYWxsLCB0aW1lKTtcbiAgfTtcbn1cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG4vKipcbiAqIEBwYXJhbSB7VE9ET30gbW9kdWxlSWRcbiAqIEByZXR1cm5zIHtUT0RPfVxuICovXG5mdW5jdGlvbiBnZXRDdXJyZW50U2NyaXB0VXJsKG1vZHVsZUlkKSB7XG4gIHZhciBzcmMgPSBzcmNCeU1vZHVsZUlkW21vZHVsZUlkXTtcbiAgaWYgKCFzcmMpIHtcbiAgICBpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdCkge1xuICAgICAgc3JjID0gKCAvKiogQHR5cGUge0hUTUxTY3JpcHRFbGVtZW50fSAqL2RvY3VtZW50LmN1cnJlbnRTY3JpcHQpLnNyYztcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcbiAgICAgIHZhciBsYXN0U2NyaXB0VGFnID0gc2NyaXB0c1tzY3JpcHRzLmxlbmd0aCAtIDFdO1xuICAgICAgaWYgKGxhc3RTY3JpcHRUYWcpIHtcbiAgICAgICAgc3JjID0gbGFzdFNjcmlwdFRhZy5zcmM7XG4gICAgICB9XG4gICAgfVxuICAgIHNyY0J5TW9kdWxlSWRbbW9kdWxlSWRdID0gc3JjO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBmaWxlTWFwXG4gICAqIEByZXR1cm5zIHtudWxsIHwgc3RyaW5nW119XG4gICAqL1xuICByZXR1cm4gZnVuY3Rpb24gKGZpbGVNYXApIHtcbiAgICBpZiAoIXNyYykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHZhciBzcGxpdFJlc3VsdCA9IHNyYy5zcGxpdCgvKFteXFxcXC9dKylcXC5qcyQvKTtcbiAgICB2YXIgZmlsZW5hbWUgPSBzcGxpdFJlc3VsdCAmJiBzcGxpdFJlc3VsdFsxXTtcbiAgICBpZiAoIWZpbGVuYW1lKSB7XG4gICAgICByZXR1cm4gW3NyYy5yZXBsYWNlKFwiLmpzXCIsIFwiLmNzc1wiKV07XG4gICAgfVxuICAgIGlmICghZmlsZU1hcCkge1xuICAgICAgcmV0dXJuIFtzcmMucmVwbGFjZShcIi5qc1wiLCBcIi5jc3NcIildO1xuICAgIH1cbiAgICByZXR1cm4gZmlsZU1hcC5zcGxpdChcIixcIikubWFwKGZ1bmN0aW9uIChtYXBSdWxlKSB7XG4gICAgICB2YXIgcmVnID0gbmV3IFJlZ0V4cChcIlwiLmNvbmNhdChmaWxlbmFtZSwgXCJcXFxcLmpzJFwiKSwgXCJnXCIpO1xuICAgICAgcmV0dXJuIG5vcm1hbGl6ZVVybChzcmMucmVwbGFjZShyZWcsIFwiXCIuY29uY2F0KG1hcFJ1bGUucmVwbGFjZSgve2ZpbGVOYW1lfS9nLCBmaWxlbmFtZSksIFwiLmNzc1wiKSkpO1xuICAgIH0pO1xuICB9O1xufVxuXG4vKipcbiAqIEBwYXJhbSB7VE9ET30gZWxcbiAqIEBwYXJhbSB7c3RyaW5nfSBbdXJsXVxuICovXG5mdW5jdGlvbiB1cGRhdGVDc3MoZWwsIHVybCkge1xuICBpZiAoIXVybCkge1xuICAgIGlmICghZWwuaHJlZikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICAgIHVybCA9IGVsLmhyZWYuc3BsaXQoXCI/XCIpWzBdO1xuICB9XG4gIGlmICghaXNVcmxSZXF1ZXN0KCAvKiogQHR5cGUge3N0cmluZ30gKi91cmwpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChlbC5pc0xvYWRlZCA9PT0gZmFsc2UpIHtcbiAgICAvLyBXZSBzZWVtIHRvIGJlIGFib3V0IHRvIHJlcGxhY2UgYSBjc3MgbGluayB0aGF0IGhhc24ndCBsb2FkZWQgeWV0LlxuICAgIC8vIFdlJ3JlIHByb2JhYmx5IGNoYW5naW5nIHRoZSBzYW1lIGZpbGUgbW9yZSB0aGFuIG9uY2UuXG4gICAgcmV0dXJuO1xuICB9XG4gIGlmICghdXJsIHx8ICEodXJsLmluZGV4T2YoXCIuY3NzXCIpID4gLTEpKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gIGVsLnZpc2l0ZWQgPSB0cnVlO1xuICB2YXIgbmV3RWwgPSBlbC5jbG9uZU5vZGUoKTtcbiAgbmV3RWwuaXNMb2FkZWQgPSBmYWxzZTtcbiAgbmV3RWwuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgZnVuY3Rpb24gKCkge1xuICAgIGlmIChuZXdFbC5pc0xvYWRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBuZXdFbC5pc0xvYWRlZCA9IHRydWU7XG4gICAgZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbCk7XG4gIH0pO1xuICBuZXdFbC5hZGRFdmVudExpc3RlbmVyKFwiZXJyb3JcIiwgZnVuY3Rpb24gKCkge1xuICAgIGlmIChuZXdFbC5pc0xvYWRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBuZXdFbC5pc0xvYWRlZCA9IHRydWU7XG4gICAgZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbCk7XG4gIH0pO1xuICBuZXdFbC5ocmVmID0gXCJcIi5jb25jYXQodXJsLCBcIj9cIikuY29uY2F0KERhdGUubm93KCkpO1xuICBpZiAoZWwubmV4dFNpYmxpbmcpIHtcbiAgICBlbC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShuZXdFbCwgZWwubmV4dFNpYmxpbmcpO1xuICB9IGVsc2Uge1xuICAgIGVsLnBhcmVudE5vZGUuYXBwZW5kQ2hpbGQobmV3RWwpO1xuICB9XG59XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IGhyZWZcbiAqIEBwYXJhbSB7VE9ET30gc3JjXG4gKiBAcmV0dXJucyB7VE9ET31cbiAqL1xuZnVuY3Rpb24gZ2V0UmVsb2FkVXJsKGhyZWYsIHNyYykge1xuICB2YXIgcmV0O1xuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICBocmVmID0gbm9ybWFsaXplVXJsKGhyZWYpO1xuICBzcmMuc29tZShcbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB1cmxcbiAgICovXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBhcnJheS1jYWxsYmFjay1yZXR1cm5cbiAgZnVuY3Rpb24gKHVybCkge1xuICAgIGlmIChocmVmLmluZGV4T2Yoc3JjKSA+IC0xKSB7XG4gICAgICByZXQgPSB1cmw7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIHJldDtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gW3NyY11cbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5mdW5jdGlvbiByZWxvYWRTdHlsZShzcmMpIHtcbiAgaWYgKCFzcmMpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIGVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcImxpbmtcIik7XG4gIHZhciBsb2FkZWQgPSBmYWxzZTtcbiAgZm9yRWFjaC5jYWxsKGVsZW1lbnRzLCBmdW5jdGlvbiAoZWwpIHtcbiAgICBpZiAoIWVsLmhyZWYpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHVybCA9IGdldFJlbG9hZFVybChlbC5ocmVmLCBzcmMpO1xuICAgIGlmICghaXNVcmxSZXF1ZXN0KHVybCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGVsLnZpc2l0ZWQgPT09IHRydWUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHVybCkge1xuICAgICAgdXBkYXRlQ3NzKGVsLCB1cmwpO1xuICAgICAgbG9hZGVkID0gdHJ1ZTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gbG9hZGVkO1xufVxuZnVuY3Rpb24gcmVsb2FkQWxsKCkge1xuICB2YXIgZWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwibGlua1wiKTtcbiAgZm9yRWFjaC5jYWxsKGVsZW1lbnRzLCBmdW5jdGlvbiAoZWwpIHtcbiAgICBpZiAoZWwudmlzaXRlZCA9PT0gdHJ1ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB1cGRhdGVDc3MoZWwpO1xuICB9KTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gaXNVcmxSZXF1ZXN0KHVybCkge1xuICAvLyBBbiBVUkwgaXMgbm90IGFuIHJlcXVlc3QgaWZcblxuICAvLyBJdCBpcyBub3QgaHR0cCBvciBodHRwc1xuICBpZiAoIS9eW2EtekEtWl1bYS16QS1aXFxkK1xcLS5dKjovLnRlc3QodXJsKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge1RPRE99IG1vZHVsZUlkXG4gKiBAcGFyYW0ge1RPRE99IG9wdGlvbnNcbiAqIEByZXR1cm5zIHtUT0RPfVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChtb2R1bGVJZCwgb3B0aW9ucykge1xuICBpZiAobm9Eb2N1bWVudCkge1xuICAgIGNvbnNvbGUubG9nKFwibm8gd2luZG93LmRvY3VtZW50IGZvdW5kLCB3aWxsIG5vdCBITVIgQ1NTXCIpO1xuICAgIHJldHVybiBub29wO1xuICB9XG4gIHZhciBnZXRTY3JpcHRTcmMgPSBnZXRDdXJyZW50U2NyaXB0VXJsKG1vZHVsZUlkKTtcbiAgZnVuY3Rpb24gdXBkYXRlKCkge1xuICAgIHZhciBzcmMgPSBnZXRTY3JpcHRTcmMob3B0aW9ucy5maWxlbmFtZSk7XG4gICAgdmFyIHJlbG9hZGVkID0gcmVsb2FkU3R5bGUoc3JjKTtcbiAgICBpZiAob3B0aW9ucy5sb2NhbHMpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiW0hNUl0gRGV0ZWN0ZWQgbG9jYWwgY3NzIG1vZHVsZXMuIFJlbG9hZCBhbGwgY3NzXCIpO1xuICAgICAgcmVsb2FkQWxsKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChyZWxvYWRlZCkge1xuICAgICAgY29uc29sZS5sb2coXCJbSE1SXSBjc3MgcmVsb2FkICVzXCIsIHNyYy5qb2luKFwiIFwiKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiW0hNUl0gUmVsb2FkIGFsbCBjc3NcIik7XG4gICAgICByZWxvYWRBbGwoKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGRlYm91bmNlKHVwZGF0ZSwgNTApO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogZXNsaW50LWRpc2FibGUgKi9cblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBwYXRoQ29tcG9uZW50c1xuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gbm9ybWFsaXplVXJsKHBhdGhDb21wb25lbnRzKSB7XG4gIHJldHVybiBwYXRoQ29tcG9uZW50cy5yZWR1Y2UoZnVuY3Rpb24gKGFjY3VtdWxhdG9yLCBpdGVtKSB7XG4gICAgc3dpdGNoIChpdGVtKSB7XG4gICAgICBjYXNlIFwiLi5cIjpcbiAgICAgICAgYWNjdW11bGF0b3IucG9wKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIi5cIjpcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBhY2N1bXVsYXRvci5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgICByZXR1cm4gYWNjdW11bGF0b3I7XG4gIH0sIC8qKiBAdHlwZSB7c3RyaW5nW119ICovW10pLmpvaW4oXCIvXCIpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmxTdHJpbmdcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHVybFN0cmluZykge1xuICB1cmxTdHJpbmcgPSB1cmxTdHJpbmcudHJpbSgpO1xuICBpZiAoL15kYXRhOi9pLnRlc3QodXJsU3RyaW5nKSkge1xuICAgIHJldHVybiB1cmxTdHJpbmc7XG4gIH1cbiAgdmFyIHByb3RvY29sID0gdXJsU3RyaW5nLmluZGV4T2YoXCIvL1wiKSAhPT0gLTEgPyB1cmxTdHJpbmcuc3BsaXQoXCIvL1wiKVswXSArIFwiLy9cIiA6IFwiXCI7XG4gIHZhciBjb21wb25lbnRzID0gdXJsU3RyaW5nLnJlcGxhY2UobmV3IFJlZ0V4cChwcm90b2NvbCwgXCJpXCIpLCBcIlwiKS5zcGxpdChcIi9cIik7XG4gIHZhciBob3N0ID0gY29tcG9uZW50c1swXS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xcLiQvLCBcIlwiKTtcbiAgY29tcG9uZW50c1swXSA9IFwiXCI7XG4gIHZhciBwYXRoID0gbm9ybWFsaXplVXJsKGNvbXBvbmVudHMpO1xuICByZXR1cm4gcHJvdG9jb2wgKyBob3N0ICsgcGF0aDtcbn07IiwiZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgX3RvUHJvcGVydHlLZXkoZGVzY3JpcHRvci5rZXkpLCBkZXNjcmlwdG9yKTsgfSB9XG5mdW5jdGlvbiBfY3JlYXRlQ2xhc3MoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDb25zdHJ1Y3RvciwgXCJwcm90b3R5cGVcIiwgeyB3cml0YWJsZTogZmFsc2UgfSk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfVxuZnVuY3Rpb24gX3RvUHJvcGVydHlLZXkoYXJnKSB7IHZhciBrZXkgPSBfdG9QcmltaXRpdmUoYXJnLCBcInN0cmluZ1wiKTsgcmV0dXJuIHR5cGVvZiBrZXkgPT09IFwic3ltYm9sXCIgPyBrZXkgOiBTdHJpbmcoa2V5KTsgfVxuZnVuY3Rpb24gX3RvUHJpbWl0aXZlKGlucHV0LCBoaW50KSB7IGlmICh0eXBlb2YgaW5wdXQgIT09IFwib2JqZWN0XCIgfHwgaW5wdXQgPT09IG51bGwpIHJldHVybiBpbnB1dDsgdmFyIHByaW0gPSBpbnB1dFtTeW1ib2wudG9QcmltaXRpdmVdOyBpZiAocHJpbSAhPT0gdW5kZWZpbmVkKSB7IHZhciByZXMgPSBwcmltLmNhbGwoaW5wdXQsIGhpbnQgfHwgXCJkZWZhdWx0XCIpOyBpZiAodHlwZW9mIHJlcyAhPT0gXCJvYmplY3RcIikgcmV0dXJuIHJlczsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkBAdG9QcmltaXRpdmUgbXVzdCByZXR1cm4gYSBwcmltaXRpdmUgdmFsdWUuXCIpOyB9IHJldHVybiAoaGludCA9PT0gXCJzdHJpbmdcIiA/IFN0cmluZyA6IE51bWJlcikoaW5wdXQpOyB9XG5pbXBvcnQgeyBsb2cgfSBmcm9tIFwiLi4vdXRpbHMvbG9nLmpzXCI7XG52YXIgV2ViU29ja2V0Q2xpZW50ID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB1cmxcbiAgICovXG4gIGZ1bmN0aW9uIFdlYlNvY2tldENsaWVudCh1cmwpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgV2ViU29ja2V0Q2xpZW50KTtcbiAgICB0aGlzLmNsaWVudCA9IG5ldyBXZWJTb2NrZXQodXJsKTtcbiAgICB0aGlzLmNsaWVudC5vbmVycm9yID0gZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICBsb2cuZXJyb3IoZXJyb3IpO1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHsoLi4uYXJnczogYW55W10pID0+IHZvaWR9IGZcbiAgICovXG4gIF9jcmVhdGVDbGFzcyhXZWJTb2NrZXRDbGllbnQsIFt7XG4gICAga2V5OiBcIm9uT3BlblwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvbk9wZW4oZikge1xuICAgICAgdGhpcy5jbGllbnQub25vcGVuID0gZjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0geyguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZH0gZlxuICAgICAqL1xuICB9LCB7XG4gICAga2V5OiBcIm9uQ2xvc2VcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gb25DbG9zZShmKSB7XG4gICAgICB0aGlzLmNsaWVudC5vbmNsb3NlID0gZjtcbiAgICB9XG5cbiAgICAvLyBjYWxsIGYgd2l0aCB0aGUgbWVzc2FnZSBzdHJpbmcgYXMgdGhlIGZpcnN0IGFyZ3VtZW50XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHsoLi4uYXJnczogYW55W10pID0+IHZvaWR9IGZcbiAgICAgKi9cbiAgfSwge1xuICAgIGtleTogXCJvbk1lc3NhZ2VcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gb25NZXNzYWdlKGYpIHtcbiAgICAgIHRoaXMuY2xpZW50Lm9ubWVzc2FnZSA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGYoZS5kYXRhKTtcbiAgICAgIH07XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBXZWJTb2NrZXRDbGllbnQ7XG59KCk7XG5leHBvcnQgeyBXZWJTb2NrZXRDbGllbnQgYXMgZGVmYXVsdCB9OyIsImZ1bmN0aW9uIG93bktleXMob2JqZWN0LCBlbnVtZXJhYmxlT25seSkgeyB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iamVjdCk7IGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7IHZhciBzeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhvYmplY3QpOyBlbnVtZXJhYmxlT25seSAmJiAoc3ltYm9scyA9IHN5bWJvbHMuZmlsdGVyKGZ1bmN0aW9uIChzeW0pIHsgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBzeW0pLmVudW1lcmFibGU7IH0pKSwga2V5cy5wdXNoLmFwcGx5KGtleXMsIHN5bWJvbHMpOyB9IHJldHVybiBrZXlzOyB9XG5mdW5jdGlvbiBfb2JqZWN0U3ByZWFkKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gbnVsbCAhPSBhcmd1bWVudHNbaV0gPyBhcmd1bWVudHNbaV0gOiB7fTsgaSAlIDIgPyBvd25LZXlzKE9iamVjdChzb3VyY2UpLCAhMCkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7IF9kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgc291cmNlW2tleV0pOyB9KSA6IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzID8gT2JqZWN0LmRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhzb3VyY2UpKSA6IG93bktleXMoT2JqZWN0KHNvdXJjZSkpLmZvckVhY2goZnVuY3Rpb24gKGtleSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBrZXkpKTsgfSk7IH0gcmV0dXJuIHRhcmdldDsgfVxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkgeyBrZXkgPSBfdG9Qcm9wZXJ0eUtleShrZXkpOyBpZiAoa2V5IGluIG9iaikgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHsgdmFsdWU6IHZhbHVlLCBlbnVtZXJhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUsIHdyaXRhYmxlOiB0cnVlIH0pOyB9IGVsc2UgeyBvYmpba2V5XSA9IHZhbHVlOyB9IHJldHVybiBvYmo7IH1cbmZ1bmN0aW9uIF90b1Byb3BlcnR5S2V5KGFyZykgeyB2YXIga2V5ID0gX3RvUHJpbWl0aXZlKGFyZywgXCJzdHJpbmdcIik7IHJldHVybiB0eXBlb2Yga2V5ID09PSBcInN5bWJvbFwiID8ga2V5IDogU3RyaW5nKGtleSk7IH1cbmZ1bmN0aW9uIF90b1ByaW1pdGl2ZShpbnB1dCwgaGludCkgeyBpZiAodHlwZW9mIGlucHV0ICE9PSBcIm9iamVjdFwiIHx8IGlucHV0ID09PSBudWxsKSByZXR1cm4gaW5wdXQ7IHZhciBwcmltID0gaW5wdXRbU3ltYm9sLnRvUHJpbWl0aXZlXTsgaWYgKHByaW0gIT09IHVuZGVmaW5lZCkgeyB2YXIgcmVzID0gcHJpbS5jYWxsKGlucHV0LCBoaW50IHx8IFwiZGVmYXVsdFwiKTsgaWYgKHR5cGVvZiByZXMgIT09IFwib2JqZWN0XCIpIHJldHVybiByZXM7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJAQHRvUHJpbWl0aXZlIG11c3QgcmV0dXJuIGEgcHJpbWl0aXZlIHZhbHVlLlwiKTsgfSByZXR1cm4gKGhpbnQgPT09IFwic3RyaW5nXCIgPyBTdHJpbmcgOiBOdW1iZXIpKGlucHV0KTsgfVxuLyogZ2xvYmFsIF9fcmVzb3VyY2VRdWVyeSwgX193ZWJwYWNrX2hhc2hfXyAqL1xuLy8vIDxyZWZlcmVuY2UgdHlwZXM9XCJ3ZWJwYWNrL21vZHVsZVwiIC8+XG5pbXBvcnQgd2VicGFja0hvdExvZyBmcm9tIFwid2VicGFjay9ob3QvbG9nLmpzXCI7XG5pbXBvcnQgc3RyaXBBbnNpIGZyb20gXCIuL3V0aWxzL3N0cmlwQW5zaS5qc1wiO1xuaW1wb3J0IHBhcnNlVVJMIGZyb20gXCIuL3V0aWxzL3BhcnNlVVJMLmpzXCI7XG5pbXBvcnQgc29ja2V0IGZyb20gXCIuL3NvY2tldC5qc1wiO1xuaW1wb3J0IHsgZm9ybWF0UHJvYmxlbSwgY3JlYXRlT3ZlcmxheSB9IGZyb20gXCIuL292ZXJsYXkuanNcIjtcbmltcG9ydCB7IGxvZywgbG9nRW5hYmxlZEZlYXR1cmVzLCBzZXRMb2dMZXZlbCB9IGZyb20gXCIuL3V0aWxzL2xvZy5qc1wiO1xuaW1wb3J0IHNlbmRNZXNzYWdlIGZyb20gXCIuL3V0aWxzL3NlbmRNZXNzYWdlLmpzXCI7XG5pbXBvcnQgcmVsb2FkQXBwIGZyb20gXCIuL3V0aWxzL3JlbG9hZEFwcC5qc1wiO1xuaW1wb3J0IGNyZWF0ZVNvY2tldFVSTCBmcm9tIFwiLi91dGlscy9jcmVhdGVTb2NrZXRVUkwuanNcIjtcblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBPdmVybGF5T3B0aW9uc1xuICogQHByb3BlcnR5IHtib29sZWFuIHwgKGVycm9yOiBFcnJvcikgPT4gYm9vbGVhbn0gW3dhcm5pbmdzXVxuICogQHByb3BlcnR5IHtib29sZWFuIHwgKGVycm9yOiBFcnJvcikgPT4gYm9vbGVhbn0gW2Vycm9yc11cbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbiB8IChlcnJvcjogRXJyb3IpID0+IGJvb2xlYW59IFtydW50aW1lRXJyb3JzXVxuICogQHByb3BlcnR5IHtzdHJpbmd9IFt0cnVzdGVkVHlwZXNQb2xpY3lOYW1lXVxuICovXG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gT3B0aW9uc1xuICogQHByb3BlcnR5IHtib29sZWFufSBob3RcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gbGl2ZVJlbG9hZFxuICogQHByb3BlcnR5IHtib29sZWFufSBwcm9ncmVzc1xuICogQHByb3BlcnR5IHtib29sZWFuIHwgT3ZlcmxheU9wdGlvbnN9IG92ZXJsYXlcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBbbG9nZ2luZ11cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBbcmVjb25uZWN0XVxuICovXG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gU3RhdHVzXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IGlzVW5sb2FkaW5nXG4gKiBAcHJvcGVydHkge3N0cmluZ30gY3VycmVudEhhc2hcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBbcHJldmlvdXNIYXNoXVxuICovXG5cbi8qKlxuICogQHBhcmFtIHtib29sZWFuIHwgeyB3YXJuaW5ncz86IGJvb2xlYW4gfCBzdHJpbmc7IGVycm9ycz86IGJvb2xlYW4gfCBzdHJpbmc7IHJ1bnRpbWVFcnJvcnM/OiBib29sZWFuIHwgc3RyaW5nOyB9fSBvdmVybGF5T3B0aW9uc1xuICovXG52YXIgZGVjb2RlT3ZlcmxheU9wdGlvbnMgPSBmdW5jdGlvbiBkZWNvZGVPdmVybGF5T3B0aW9ucyhvdmVybGF5T3B0aW9ucykge1xuICBpZiAodHlwZW9mIG92ZXJsYXlPcHRpb25zID09PSBcIm9iamVjdFwiKSB7XG4gICAgW1wid2FybmluZ3NcIiwgXCJlcnJvcnNcIiwgXCJydW50aW1lRXJyb3JzXCJdLmZvckVhY2goZnVuY3Rpb24gKHByb3BlcnR5KSB7XG4gICAgICBpZiAodHlwZW9mIG92ZXJsYXlPcHRpb25zW3Byb3BlcnR5XSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICB2YXIgb3ZlcmxheUZpbHRlckZ1bmN0aW9uU3RyaW5nID0gZGVjb2RlVVJJQ29tcG9uZW50KG92ZXJsYXlPcHRpb25zW3Byb3BlcnR5XSk7XG5cbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5ldy1mdW5jXG4gICAgICAgIHZhciBvdmVybGF5RmlsdGVyRnVuY3Rpb24gPSBuZXcgRnVuY3Rpb24oXCJtZXNzYWdlXCIsIFwidmFyIGNhbGxiYWNrID0gXCIuY29uY2F0KG92ZXJsYXlGaWx0ZXJGdW5jdGlvblN0cmluZywgXCJcXG4gICAgICAgIHJldHVybiBjYWxsYmFjayhtZXNzYWdlKVwiKSk7XG4gICAgICAgIG92ZXJsYXlPcHRpb25zW3Byb3BlcnR5XSA9IG92ZXJsYXlGaWx0ZXJGdW5jdGlvbjtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufTtcblxuLyoqXG4gKiBAdHlwZSB7U3RhdHVzfVxuICovXG52YXIgc3RhdHVzID0ge1xuICBpc1VubG9hZGluZzogZmFsc2UsXG4gIC8vIFRPRE8gV29ya2Fyb3VuZCBmb3Igd2VicGFjayB2NCwgYF9fd2VicGFja19oYXNoX19gIGlzIG5vdCByZXBsYWNlZCB3aXRob3V0IEhvdE1vZHVsZVJlcGxhY2VtZW50XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjYW1lbGNhc2VcbiAgY3VycmVudEhhc2g6IHR5cGVvZiBfX3dlYnBhY2tfaGFzaF9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX2hhc2hfXyA6IFwiXCJcbn07XG5cbi8qKiBAdHlwZSB7T3B0aW9uc30gKi9cbnZhciBvcHRpb25zID0ge1xuICBob3Q6IGZhbHNlLFxuICBsaXZlUmVsb2FkOiBmYWxzZSxcbiAgcHJvZ3Jlc3M6IGZhbHNlLFxuICBvdmVybGF5OiBmYWxzZVxufTtcbnZhciBwYXJzZWRSZXNvdXJjZVF1ZXJ5ID0gcGFyc2VVUkwoX19yZXNvdXJjZVF1ZXJ5KTtcbnZhciBlbmFibGVkRmVhdHVyZXMgPSB7XG4gIFwiSG90IE1vZHVsZSBSZXBsYWNlbWVudFwiOiBmYWxzZSxcbiAgXCJMaXZlIFJlbG9hZGluZ1wiOiBmYWxzZSxcbiAgUHJvZ3Jlc3M6IGZhbHNlLFxuICBPdmVybGF5OiBmYWxzZVxufTtcbmlmIChwYXJzZWRSZXNvdXJjZVF1ZXJ5LmhvdCA9PT0gXCJ0cnVlXCIpIHtcbiAgb3B0aW9ucy5ob3QgPSB0cnVlO1xuICBlbmFibGVkRmVhdHVyZXNbXCJIb3QgTW9kdWxlIFJlcGxhY2VtZW50XCJdID0gdHJ1ZTtcbn1cbmlmIChwYXJzZWRSZXNvdXJjZVF1ZXJ5W1wibGl2ZS1yZWxvYWRcIl0gPT09IFwidHJ1ZVwiKSB7XG4gIG9wdGlvbnMubGl2ZVJlbG9hZCA9IHRydWU7XG4gIGVuYWJsZWRGZWF0dXJlc1tcIkxpdmUgUmVsb2FkaW5nXCJdID0gdHJ1ZTtcbn1cbmlmIChwYXJzZWRSZXNvdXJjZVF1ZXJ5LnByb2dyZXNzID09PSBcInRydWVcIikge1xuICBvcHRpb25zLnByb2dyZXNzID0gdHJ1ZTtcbiAgZW5hYmxlZEZlYXR1cmVzLlByb2dyZXNzID0gdHJ1ZTtcbn1cbmlmIChwYXJzZWRSZXNvdXJjZVF1ZXJ5Lm92ZXJsYXkpIHtcbiAgdHJ5IHtcbiAgICBvcHRpb25zLm92ZXJsYXkgPSBKU09OLnBhcnNlKHBhcnNlZFJlc291cmNlUXVlcnkub3ZlcmxheSk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBsb2cuZXJyb3IoXCJFcnJvciBwYXJzaW5nIG92ZXJsYXkgb3B0aW9ucyBmcm9tIHJlc291cmNlIHF1ZXJ5OlwiLCBlKTtcbiAgfVxuXG4gIC8vIEZpbGwgaW4gZGVmYXVsdCBcInRydWVcIiBwYXJhbXMgZm9yIHBhcnRpYWxseS1zcGVjaWZpZWQgb2JqZWN0cy5cbiAgaWYgKHR5cGVvZiBvcHRpb25zLm92ZXJsYXkgPT09IFwib2JqZWN0XCIpIHtcbiAgICBvcHRpb25zLm92ZXJsYXkgPSBfb2JqZWN0U3ByZWFkKHtcbiAgICAgIGVycm9yczogdHJ1ZSxcbiAgICAgIHdhcm5pbmdzOiB0cnVlLFxuICAgICAgcnVudGltZUVycm9yczogdHJ1ZVxuICAgIH0sIG9wdGlvbnMub3ZlcmxheSk7XG4gICAgZGVjb2RlT3ZlcmxheU9wdGlvbnMob3B0aW9ucy5vdmVybGF5KTtcbiAgfVxuICBlbmFibGVkRmVhdHVyZXMuT3ZlcmxheSA9IHRydWU7XG59XG5pZiAocGFyc2VkUmVzb3VyY2VRdWVyeS5sb2dnaW5nKSB7XG4gIG9wdGlvbnMubG9nZ2luZyA9IHBhcnNlZFJlc291cmNlUXVlcnkubG9nZ2luZztcbn1cbmlmICh0eXBlb2YgcGFyc2VkUmVzb3VyY2VRdWVyeS5yZWNvbm5lY3QgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgb3B0aW9ucy5yZWNvbm5lY3QgPSBOdW1iZXIocGFyc2VkUmVzb3VyY2VRdWVyeS5yZWNvbm5lY3QpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSBsZXZlbFxuICovXG5mdW5jdGlvbiBzZXRBbGxMb2dMZXZlbChsZXZlbCkge1xuICAvLyBUaGlzIGlzIG5lZWRlZCBiZWNhdXNlIHRoZSBITVIgbG9nZ2VyIG9wZXJhdGUgc2VwYXJhdGVseSBmcm9tIGRldiBzZXJ2ZXIgbG9nZ2VyXG4gIHdlYnBhY2tIb3RMb2cuc2V0TG9nTGV2ZWwobGV2ZWwgPT09IFwidmVyYm9zZVwiIHx8IGxldmVsID09PSBcImxvZ1wiID8gXCJpbmZvXCIgOiBsZXZlbCk7XG4gIHNldExvZ0xldmVsKGxldmVsKTtcbn1cbmlmIChvcHRpb25zLmxvZ2dpbmcpIHtcbiAgc2V0QWxsTG9nTGV2ZWwob3B0aW9ucy5sb2dnaW5nKTtcbn1cbmxvZ0VuYWJsZWRGZWF0dXJlcyhlbmFibGVkRmVhdHVyZXMpO1xuc2VsZi5hZGRFdmVudExpc3RlbmVyKFwiYmVmb3JldW5sb2FkXCIsIGZ1bmN0aW9uICgpIHtcbiAgc3RhdHVzLmlzVW5sb2FkaW5nID0gdHJ1ZTtcbn0pO1xudmFyIG92ZXJsYXkgPSB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gY3JlYXRlT3ZlcmxheSh0eXBlb2Ygb3B0aW9ucy5vdmVybGF5ID09PSBcIm9iamVjdFwiID8ge1xuICB0cnVzdGVkVHlwZXNQb2xpY3lOYW1lOiBvcHRpb25zLm92ZXJsYXkudHJ1c3RlZFR5cGVzUG9saWN5TmFtZSxcbiAgY2F0Y2hSdW50aW1lRXJyb3I6IG9wdGlvbnMub3ZlcmxheS5ydW50aW1lRXJyb3JzXG59IDoge1xuICB0cnVzdGVkVHlwZXNQb2xpY3lOYW1lOiBmYWxzZSxcbiAgY2F0Y2hSdW50aW1lRXJyb3I6IG9wdGlvbnMub3ZlcmxheVxufSkgOiB7XG4gIHNlbmQ6IGZ1bmN0aW9uIHNlbmQoKSB7fVxufTtcbnZhciBvblNvY2tldE1lc3NhZ2UgPSB7XG4gIGhvdDogZnVuY3Rpb24gaG90KCkge1xuICAgIGlmIChwYXJzZWRSZXNvdXJjZVF1ZXJ5LmhvdCA9PT0gXCJmYWxzZVwiKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIG9wdGlvbnMuaG90ID0gdHJ1ZTtcbiAgfSxcbiAgbGl2ZVJlbG9hZDogZnVuY3Rpb24gbGl2ZVJlbG9hZCgpIHtcbiAgICBpZiAocGFyc2VkUmVzb3VyY2VRdWVyeVtcImxpdmUtcmVsb2FkXCJdID09PSBcImZhbHNlXCIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgb3B0aW9ucy5saXZlUmVsb2FkID0gdHJ1ZTtcbiAgfSxcbiAgaW52YWxpZDogZnVuY3Rpb24gaW52YWxpZCgpIHtcbiAgICBsb2cuaW5mbyhcIkFwcCB1cGRhdGVkLiBSZWNvbXBpbGluZy4uLlwiKTtcblxuICAgIC8vIEZpeGVzICMxMDQyLiBvdmVybGF5IGRvZXNuJ3QgY2xlYXIgaWYgZXJyb3JzIGFyZSBmaXhlZCBidXQgd2FybmluZ3MgcmVtYWluLlxuICAgIGlmIChvcHRpb25zLm92ZXJsYXkpIHtcbiAgICAgIG92ZXJsYXkuc2VuZCh7XG4gICAgICAgIHR5cGU6IFwiRElTTUlTU1wiXG4gICAgICB9KTtcbiAgICB9XG4gICAgc2VuZE1lc3NhZ2UoXCJJbnZhbGlkXCIpO1xuICB9LFxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGhhc2hcbiAgICovXG4gIGhhc2g6IGZ1bmN0aW9uIGhhc2goX2hhc2gpIHtcbiAgICBzdGF0dXMucHJldmlvdXNIYXNoID0gc3RhdHVzLmN1cnJlbnRIYXNoO1xuICAgIHN0YXR1cy5jdXJyZW50SGFzaCA9IF9oYXNoO1xuICB9LFxuICBsb2dnaW5nOiBzZXRBbGxMb2dMZXZlbCxcbiAgLyoqXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gdmFsdWVcbiAgICovXG4gIG92ZXJsYXk6IGZ1bmN0aW9uIG92ZXJsYXkodmFsdWUpIHtcbiAgICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIG9wdGlvbnMub3ZlcmxheSA9IHZhbHVlO1xuICAgIGRlY29kZU92ZXJsYXlPcHRpb25zKG9wdGlvbnMub3ZlcmxheSk7XG4gIH0sXG4gIC8qKlxuICAgKiBAcGFyYW0ge251bWJlcn0gdmFsdWVcbiAgICovXG4gIHJlY29ubmVjdDogZnVuY3Rpb24gcmVjb25uZWN0KHZhbHVlKSB7XG4gICAgaWYgKHBhcnNlZFJlc291cmNlUXVlcnkucmVjb25uZWN0ID09PSBcImZhbHNlXCIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgb3B0aW9ucy5yZWNvbm5lY3QgPSB2YWx1ZTtcbiAgfSxcbiAgLyoqXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gdmFsdWVcbiAgICovXG4gIHByb2dyZXNzOiBmdW5jdGlvbiBwcm9ncmVzcyh2YWx1ZSkge1xuICAgIG9wdGlvbnMucHJvZ3Jlc3MgPSB2YWx1ZTtcbiAgfSxcbiAgLyoqXG4gICAqIEBwYXJhbSB7eyBwbHVnaW5OYW1lPzogc3RyaW5nLCBwZXJjZW50OiBudW1iZXIsIG1zZzogc3RyaW5nIH19IGRhdGFcbiAgICovXG4gIFwicHJvZ3Jlc3MtdXBkYXRlXCI6IGZ1bmN0aW9uIHByb2dyZXNzVXBkYXRlKGRhdGEpIHtcbiAgICBpZiAob3B0aW9ucy5wcm9ncmVzcykge1xuICAgICAgbG9nLmluZm8oXCJcIi5jb25jYXQoZGF0YS5wbHVnaW5OYW1lID8gXCJbXCIuY29uY2F0KGRhdGEucGx1Z2luTmFtZSwgXCJdIFwiKSA6IFwiXCIpLmNvbmNhdChkYXRhLnBlcmNlbnQsIFwiJSAtIFwiKS5jb25jYXQoZGF0YS5tc2csIFwiLlwiKSk7XG4gICAgfVxuICAgIHNlbmRNZXNzYWdlKFwiUHJvZ3Jlc3NcIiwgZGF0YSk7XG4gIH0sXG4gIFwic3RpbGwtb2tcIjogZnVuY3Rpb24gc3RpbGxPaygpIHtcbiAgICBsb2cuaW5mbyhcIk5vdGhpbmcgY2hhbmdlZC5cIik7XG4gICAgaWYgKG9wdGlvbnMub3ZlcmxheSkge1xuICAgICAgb3ZlcmxheS5zZW5kKHtcbiAgICAgICAgdHlwZTogXCJESVNNSVNTXCJcbiAgICAgIH0pO1xuICAgIH1cbiAgICBzZW5kTWVzc2FnZShcIlN0aWxsT2tcIik7XG4gIH0sXG4gIG9rOiBmdW5jdGlvbiBvaygpIHtcbiAgICBzZW5kTWVzc2FnZShcIk9rXCIpO1xuICAgIGlmIChvcHRpb25zLm92ZXJsYXkpIHtcbiAgICAgIG92ZXJsYXkuc2VuZCh7XG4gICAgICAgIHR5cGU6IFwiRElTTUlTU1wiXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmVsb2FkQXBwKG9wdGlvbnMsIHN0YXR1cyk7XG4gIH0sXG4gIC8vIFRPRE86IHJlbW92ZSBpbiB2NSBpbiBmYXZvciBvZiAnc3RhdGljLWNoYW5nZWQnXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZmlsZVxuICAgKi9cbiAgXCJjb250ZW50LWNoYW5nZWRcIjogZnVuY3Rpb24gY29udGVudENoYW5nZWQoZmlsZSkge1xuICAgIGxvZy5pbmZvKFwiXCIuY29uY2F0KGZpbGUgPyBcIlxcXCJcIi5jb25jYXQoZmlsZSwgXCJcXFwiXCIpIDogXCJDb250ZW50XCIsIFwiIGZyb20gc3RhdGljIGRpcmVjdG9yeSB3YXMgY2hhbmdlZC4gUmVsb2FkaW5nLi4uXCIpKTtcbiAgICBzZWxmLmxvY2F0aW9uLnJlbG9hZCgpO1xuICB9LFxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGZpbGVcbiAgICovXG4gIFwic3RhdGljLWNoYW5nZWRcIjogZnVuY3Rpb24gc3RhdGljQ2hhbmdlZChmaWxlKSB7XG4gICAgbG9nLmluZm8oXCJcIi5jb25jYXQoZmlsZSA/IFwiXFxcIlwiLmNvbmNhdChmaWxlLCBcIlxcXCJcIikgOiBcIkNvbnRlbnRcIiwgXCIgZnJvbSBzdGF0aWMgZGlyZWN0b3J5IHdhcyBjaGFuZ2VkLiBSZWxvYWRpbmcuLi5cIikpO1xuICAgIHNlbGYubG9jYXRpb24ucmVsb2FkKCk7XG4gIH0sXG4gIC8qKlxuICAgKiBAcGFyYW0ge0Vycm9yW119IHdhcm5pbmdzXG4gICAqIEBwYXJhbSB7YW55fSBwYXJhbXNcbiAgICovXG4gIHdhcm5pbmdzOiBmdW5jdGlvbiB3YXJuaW5ncyhfd2FybmluZ3MsIHBhcmFtcykge1xuICAgIGxvZy53YXJuKFwiV2FybmluZ3Mgd2hpbGUgY29tcGlsaW5nLlwiKTtcbiAgICB2YXIgcHJpbnRhYmxlV2FybmluZ3MgPSBfd2FybmluZ3MubWFwKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgdmFyIF9mb3JtYXRQcm9ibGVtID0gZm9ybWF0UHJvYmxlbShcIndhcm5pbmdcIiwgZXJyb3IpLFxuICAgICAgICBoZWFkZXIgPSBfZm9ybWF0UHJvYmxlbS5oZWFkZXIsXG4gICAgICAgIGJvZHkgPSBfZm9ybWF0UHJvYmxlbS5ib2R5O1xuICAgICAgcmV0dXJuIFwiXCIuY29uY2F0KGhlYWRlciwgXCJcXG5cIikuY29uY2F0KHN0cmlwQW5zaShib2R5KSk7XG4gICAgfSk7XG4gICAgc2VuZE1lc3NhZ2UoXCJXYXJuaW5nc1wiLCBwcmludGFibGVXYXJuaW5ncyk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcmludGFibGVXYXJuaW5ncy5sZW5ndGg7IGkrKykge1xuICAgICAgbG9nLndhcm4ocHJpbnRhYmxlV2FybmluZ3NbaV0pO1xuICAgIH1cbiAgICB2YXIgb3ZlcmxheVdhcm5pbmdzU2V0dGluZyA9IHR5cGVvZiBvcHRpb25zLm92ZXJsYXkgPT09IFwiYm9vbGVhblwiID8gb3B0aW9ucy5vdmVybGF5IDogb3B0aW9ucy5vdmVybGF5ICYmIG9wdGlvbnMub3ZlcmxheS53YXJuaW5ncztcbiAgICBpZiAob3ZlcmxheVdhcm5pbmdzU2V0dGluZykge1xuICAgICAgdmFyIHdhcm5pbmdzVG9EaXNwbGF5ID0gdHlwZW9mIG92ZXJsYXlXYXJuaW5nc1NldHRpbmcgPT09IFwiZnVuY3Rpb25cIiA/IF93YXJuaW5ncy5maWx0ZXIob3ZlcmxheVdhcm5pbmdzU2V0dGluZykgOiBfd2FybmluZ3M7XG4gICAgICBpZiAod2FybmluZ3NUb0Rpc3BsYXkubGVuZ3RoKSB7XG4gICAgICAgIG92ZXJsYXkuc2VuZCh7XG4gICAgICAgICAgdHlwZTogXCJCVUlMRF9FUlJPUlwiLFxuICAgICAgICAgIGxldmVsOiBcIndhcm5pbmdcIixcbiAgICAgICAgICBtZXNzYWdlczogX3dhcm5pbmdzXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAocGFyYW1zICYmIHBhcmFtcy5wcmV2ZW50UmVsb2FkaW5nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHJlbG9hZEFwcChvcHRpb25zLCBzdGF0dXMpO1xuICB9LFxuICAvKipcbiAgICogQHBhcmFtIHtFcnJvcltdfSBlcnJvcnNcbiAgICovXG4gIGVycm9yczogZnVuY3Rpb24gZXJyb3JzKF9lcnJvcnMpIHtcbiAgICBsb2cuZXJyb3IoXCJFcnJvcnMgd2hpbGUgY29tcGlsaW5nLiBSZWxvYWQgcHJldmVudGVkLlwiKTtcbiAgICB2YXIgcHJpbnRhYmxlRXJyb3JzID0gX2Vycm9ycy5tYXAoZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICB2YXIgX2Zvcm1hdFByb2JsZW0yID0gZm9ybWF0UHJvYmxlbShcImVycm9yXCIsIGVycm9yKSxcbiAgICAgICAgaGVhZGVyID0gX2Zvcm1hdFByb2JsZW0yLmhlYWRlcixcbiAgICAgICAgYm9keSA9IF9mb3JtYXRQcm9ibGVtMi5ib2R5O1xuICAgICAgcmV0dXJuIFwiXCIuY29uY2F0KGhlYWRlciwgXCJcXG5cIikuY29uY2F0KHN0cmlwQW5zaShib2R5KSk7XG4gICAgfSk7XG4gICAgc2VuZE1lc3NhZ2UoXCJFcnJvcnNcIiwgcHJpbnRhYmxlRXJyb3JzKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByaW50YWJsZUVycm9ycy5sZW5ndGg7IGkrKykge1xuICAgICAgbG9nLmVycm9yKHByaW50YWJsZUVycm9yc1tpXSk7XG4gICAgfVxuICAgIHZhciBvdmVybGF5RXJyb3JzU2V0dGluZ3MgPSB0eXBlb2Ygb3B0aW9ucy5vdmVybGF5ID09PSBcImJvb2xlYW5cIiA/IG9wdGlvbnMub3ZlcmxheSA6IG9wdGlvbnMub3ZlcmxheSAmJiBvcHRpb25zLm92ZXJsYXkuZXJyb3JzO1xuICAgIGlmIChvdmVybGF5RXJyb3JzU2V0dGluZ3MpIHtcbiAgICAgIHZhciBlcnJvcnNUb0Rpc3BsYXkgPSB0eXBlb2Ygb3ZlcmxheUVycm9yc1NldHRpbmdzID09PSBcImZ1bmN0aW9uXCIgPyBfZXJyb3JzLmZpbHRlcihvdmVybGF5RXJyb3JzU2V0dGluZ3MpIDogX2Vycm9ycztcbiAgICAgIGlmIChlcnJvcnNUb0Rpc3BsYXkubGVuZ3RoKSB7XG4gICAgICAgIG92ZXJsYXkuc2VuZCh7XG4gICAgICAgICAgdHlwZTogXCJCVUlMRF9FUlJPUlwiLFxuICAgICAgICAgIGxldmVsOiBcImVycm9yXCIsXG4gICAgICAgICAgbWVzc2FnZXM6IF9lcnJvcnNcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuICAvKipcbiAgICogQHBhcmFtIHtFcnJvcn0gZXJyb3JcbiAgICovXG4gIGVycm9yOiBmdW5jdGlvbiBlcnJvcihfZXJyb3IpIHtcbiAgICBsb2cuZXJyb3IoX2Vycm9yKTtcbiAgfSxcbiAgY2xvc2U6IGZ1bmN0aW9uIGNsb3NlKCkge1xuICAgIGxvZy5pbmZvKFwiRGlzY29ubmVjdGVkIVwiKTtcbiAgICBpZiAob3B0aW9ucy5vdmVybGF5KSB7XG4gICAgICBvdmVybGF5LnNlbmQoe1xuICAgICAgICB0eXBlOiBcIkRJU01JU1NcIlxuICAgICAgfSk7XG4gICAgfVxuICAgIHNlbmRNZXNzYWdlKFwiQ2xvc2VcIik7XG4gIH1cbn07XG52YXIgc29ja2V0VVJMID0gY3JlYXRlU29ja2V0VVJMKHBhcnNlZFJlc291cmNlUXVlcnkpO1xuc29ja2V0KHNvY2tldFVSTCwgb25Tb2NrZXRNZXNzYWdlLCBvcHRpb25zLnJlY29ubmVjdCk7IiwiLyoqKioqKi8gKGZ1bmN0aW9uKCkgeyAvLyB3ZWJwYWNrQm9vdHN0cmFwXG4vKioqKioqLyBcdFwidXNlIHN0cmljdFwiO1xuLyoqKioqKi8gXHR2YXIgX193ZWJwYWNrX21vZHVsZXNfXyA9ICh7XG5cbi8qKiovIFwiLi9jbGllbnQtc3JjL21vZHVsZXMvbG9nZ2VyL1N5bmNCYWlsSG9va0Zha2UuanNcIjpcbi8qISoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiohKlxcXG4gICEqKiogLi9jbGllbnQtc3JjL21vZHVsZXMvbG9nZ2VyL1N5bmNCYWlsSG9va0Zha2UuanMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlKSB7XG5cblxuXG4vKipcbiAqIENsaWVudCBzdHViIGZvciB0YXBhYmxlIFN5bmNCYWlsSG9va1xuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNsaWVudFRhcGFibGVTeW5jQmFpbEhvb2soKSB7XG4gIHJldHVybiB7XG4gICAgY2FsbDogZnVuY3Rpb24gY2FsbCgpIHt9XG4gIH07XG59O1xuXG4vKioqLyB9KSxcblxuLyoqKi8gXCIuL25vZGVfbW9kdWxlcy93ZWJwYWNrL2xpYi9sb2dnaW5nL0xvZ2dlci5qc1wiOlxuLyohKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiEqXFxcbiAgISoqKiAuL25vZGVfbW9kdWxlcy93ZWJwYWNrL2xpYi9sb2dnaW5nL0xvZ2dlci5qcyAqKiohXG4gIFxcKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKiovIChmdW5jdGlvbihfX3VudXNlZF93ZWJwYWNrX21vZHVsZSwgZXhwb3J0cykge1xuXG4vKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuXG5cblxuZnVuY3Rpb24gX3RvQ29uc3VtYWJsZUFycmF5KGFycikge1xuICByZXR1cm4gX2FycmF5V2l0aG91dEhvbGVzKGFycikgfHwgX2l0ZXJhYmxlVG9BcnJheShhcnIpIHx8IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIpIHx8IF9ub25JdGVyYWJsZVNwcmVhZCgpO1xufVxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlU3ByZWFkKCkge1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIHNwcmVhZCBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTtcbn1cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHtcbiAgaWYgKCFvKSByZXR1cm47XG4gIGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7XG4gIHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTtcbiAgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTtcbiAgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7XG4gIGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTtcbn1cbmZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXkoaXRlcikge1xuICBpZiAodHlwZW9mICh0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiID8gU3ltYm9sIDogZnVuY3Rpb24gKGkpIHsgcmV0dXJuIGk7IH0pICE9PSBcInVuZGVmaW5lZFwiICYmIGl0ZXJbKHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgPyBTeW1ib2wgOiBmdW5jdGlvbiAoaSkgeyByZXR1cm4gaTsgfSkuaXRlcmF0b3JdICE9IG51bGwgfHwgaXRlcltcIkBAaXRlcmF0b3JcIl0gIT0gbnVsbCkgcmV0dXJuIEFycmF5LmZyb20oaXRlcik7XG59XG5mdW5jdGlvbiBfYXJyYXlXaXRob3V0SG9sZXMoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShhcnIpO1xufVxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHtcbiAgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7XG4gIGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgYXJyMltpXSA9IGFycltpXTtcbiAgcmV0dXJuIGFycjI7XG59XG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufVxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcbiAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICAgIGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgX3RvUHJvcGVydHlLZXkoZGVzY3JpcHRvci5rZXkpLCBkZXNjcmlwdG9yKTtcbiAgfVxufVxuZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ29uc3RydWN0b3IsIFwicHJvdG90eXBlXCIsIHtcbiAgICB3cml0YWJsZTogZmFsc2VcbiAgfSk7XG4gIHJldHVybiBDb25zdHJ1Y3Rvcjtcbn1cbmZ1bmN0aW9uIF90b1Byb3BlcnR5S2V5KGFyZykge1xuICB2YXIga2V5ID0gX3RvUHJpbWl0aXZlKGFyZywgXCJzdHJpbmdcIik7XG4gIHJldHVybiB0eXBlb2Yga2V5ID09PSBcInN5bWJvbFwiID8ga2V5IDogU3RyaW5nKGtleSk7XG59XG5mdW5jdGlvbiBfdG9QcmltaXRpdmUoaW5wdXQsIGhpbnQpIHtcbiAgaWYgKHR5cGVvZiBpbnB1dCAhPT0gXCJvYmplY3RcIiB8fCBpbnB1dCA9PT0gbnVsbCkgcmV0dXJuIGlucHV0O1xuICB2YXIgcHJpbSA9IGlucHV0Wyh0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiID8gU3ltYm9sIDogZnVuY3Rpb24gKGkpIHsgcmV0dXJuIGk7IH0pLnRvUHJpbWl0aXZlXTtcbiAgaWYgKHByaW0gIT09IHVuZGVmaW5lZCkge1xuICAgIHZhciByZXMgPSBwcmltLmNhbGwoaW5wdXQsIGhpbnQgfHwgXCJkZWZhdWx0XCIpO1xuICAgIGlmICh0eXBlb2YgcmVzICE9PSBcIm9iamVjdFwiKSByZXR1cm4gcmVzO1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJAQHRvUHJpbWl0aXZlIG11c3QgcmV0dXJuIGEgcHJpbWl0aXZlIHZhbHVlLlwiKTtcbiAgfVxuICByZXR1cm4gKGhpbnQgPT09IFwic3RyaW5nXCIgPyBTdHJpbmcgOiBOdW1iZXIpKGlucHV0KTtcbn1cbnZhciBMb2dUeXBlID0gT2JqZWN0LmZyZWV6ZSh7XG4gIGVycm9yOiAvKiogQHR5cGUge1wiZXJyb3JcIn0gKi9cImVycm9yXCIsXG4gIC8vIG1lc3NhZ2UsIGMgc3R5bGUgYXJndW1lbnRzXG4gIHdhcm46IC8qKiBAdHlwZSB7XCJ3YXJuXCJ9ICovXCJ3YXJuXCIsXG4gIC8vIG1lc3NhZ2UsIGMgc3R5bGUgYXJndW1lbnRzXG4gIGluZm86IC8qKiBAdHlwZSB7XCJpbmZvXCJ9ICovXCJpbmZvXCIsXG4gIC8vIG1lc3NhZ2UsIGMgc3R5bGUgYXJndW1lbnRzXG4gIGxvZzogLyoqIEB0eXBlIHtcImxvZ1wifSAqL1wibG9nXCIsXG4gIC8vIG1lc3NhZ2UsIGMgc3R5bGUgYXJndW1lbnRzXG4gIGRlYnVnOiAvKiogQHR5cGUge1wiZGVidWdcIn0gKi9cImRlYnVnXCIsXG4gIC8vIG1lc3NhZ2UsIGMgc3R5bGUgYXJndW1lbnRzXG5cbiAgdHJhY2U6IC8qKiBAdHlwZSB7XCJ0cmFjZVwifSAqL1widHJhY2VcIixcbiAgLy8gbm8gYXJndW1lbnRzXG5cbiAgZ3JvdXA6IC8qKiBAdHlwZSB7XCJncm91cFwifSAqL1wiZ3JvdXBcIixcbiAgLy8gW2xhYmVsXVxuICBncm91cENvbGxhcHNlZDogLyoqIEB0eXBlIHtcImdyb3VwQ29sbGFwc2VkXCJ9ICovXCJncm91cENvbGxhcHNlZFwiLFxuICAvLyBbbGFiZWxdXG4gIGdyb3VwRW5kOiAvKiogQHR5cGUge1wiZ3JvdXBFbmRcIn0gKi9cImdyb3VwRW5kXCIsXG4gIC8vIFtsYWJlbF1cblxuICBwcm9maWxlOiAvKiogQHR5cGUge1wicHJvZmlsZVwifSAqL1wicHJvZmlsZVwiLFxuICAvLyBbcHJvZmlsZU5hbWVdXG4gIHByb2ZpbGVFbmQ6IC8qKiBAdHlwZSB7XCJwcm9maWxlRW5kXCJ9ICovXCJwcm9maWxlRW5kXCIsXG4gIC8vIFtwcm9maWxlTmFtZV1cblxuICB0aW1lOiAvKiogQHR5cGUge1widGltZVwifSAqL1widGltZVwiLFxuICAvLyBuYW1lLCB0aW1lIGFzIFtzZWNvbmRzLCBuYW5vc2Vjb25kc11cblxuICBjbGVhcjogLyoqIEB0eXBlIHtcImNsZWFyXCJ9ICovXCJjbGVhclwiLFxuICAvLyBubyBhcmd1bWVudHNcbiAgc3RhdHVzOiAvKiogQHR5cGUge1wic3RhdHVzXCJ9ICovXCJzdGF0dXNcIiAvLyBtZXNzYWdlLCBhcmd1bWVudHNcbn0pO1xuXG5leHBvcnRzLkxvZ1R5cGUgPSBMb2dUeXBlO1xuXG4vKiogQHR5cGVkZWYge3R5cGVvZiBMb2dUeXBlW2tleW9mIHR5cGVvZiBMb2dUeXBlXX0gTG9nVHlwZUVudW0gKi9cblxudmFyIExPR19TWU1CT0wgPSAodHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiA/IFN5bWJvbCA6IGZ1bmN0aW9uIChpKSB7IHJldHVybiBpOyB9KShcIndlYnBhY2sgbG9nZ2VyIHJhdyBsb2cgbWV0aG9kXCIpO1xudmFyIFRJTUVSU19TWU1CT0wgPSAodHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiA/IFN5bWJvbCA6IGZ1bmN0aW9uIChpKSB7IHJldHVybiBpOyB9KShcIndlYnBhY2sgbG9nZ2VyIHRpbWVzXCIpO1xudmFyIFRJTUVSU19BR0dSRUdBVEVTX1NZTUJPTCA9ICh0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiID8gU3ltYm9sIDogZnVuY3Rpb24gKGkpIHsgcmV0dXJuIGk7IH0pKFwid2VicGFjayBsb2dnZXIgYWdncmVnYXRlZCB0aW1lc1wiKTtcbnZhciBXZWJwYWNrTG9nZ2VyID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb24oTG9nVHlwZUVudW0sIGFueVtdPSk6IHZvaWR9IGxvZyBsb2cgZnVuY3Rpb25cbiAgICogQHBhcmFtIHtmdW5jdGlvbihzdHJpbmcgfCBmdW5jdGlvbigpOiBzdHJpbmcpOiBXZWJwYWNrTG9nZ2VyfSBnZXRDaGlsZExvZ2dlciBmdW5jdGlvbiB0byBjcmVhdGUgY2hpbGQgbG9nZ2VyXG4gICAqL1xuICBmdW5jdGlvbiBXZWJwYWNrTG9nZ2VyKGxvZywgZ2V0Q2hpbGRMb2dnZXIpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgV2VicGFja0xvZ2dlcik7XG4gICAgdGhpc1tMT0dfU1lNQk9MXSA9IGxvZztcbiAgICB0aGlzLmdldENoaWxkTG9nZ2VyID0gZ2V0Q2hpbGRMb2dnZXI7XG4gIH1cbiAgX2NyZWF0ZUNsYXNzKFdlYnBhY2tMb2dnZXIsIFt7XG4gICAga2V5OiBcImVycm9yXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGVycm9yKCkge1xuICAgICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICAgIGFyZ3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgICB9XG4gICAgICB0aGlzW0xPR19TWU1CT0xdKExvZ1R5cGUuZXJyb3IsIGFyZ3MpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJ3YXJuXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHdhcm4oKSB7XG4gICAgICBmb3IgKHZhciBfbGVuMiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjIpLCBfa2V5MiA9IDA7IF9rZXkyIDwgX2xlbjI7IF9rZXkyKyspIHtcbiAgICAgICAgYXJnc1tfa2V5Ml0gPSBhcmd1bWVudHNbX2tleTJdO1xuICAgICAgfVxuICAgICAgdGhpc1tMT0dfU1lNQk9MXShMb2dUeXBlLndhcm4sIGFyZ3MpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJpbmZvXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGluZm8oKSB7XG4gICAgICBmb3IgKHZhciBfbGVuMyA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjMpLCBfa2V5MyA9IDA7IF9rZXkzIDwgX2xlbjM7IF9rZXkzKyspIHtcbiAgICAgICAgYXJnc1tfa2V5M10gPSBhcmd1bWVudHNbX2tleTNdO1xuICAgICAgfVxuICAgICAgdGhpc1tMT0dfU1lNQk9MXShMb2dUeXBlLmluZm8sIGFyZ3MpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJsb2dcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gbG9nKCkge1xuICAgICAgZm9yICh2YXIgX2xlbjQgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW40KSwgX2tleTQgPSAwOyBfa2V5NCA8IF9sZW40OyBfa2V5NCsrKSB7XG4gICAgICAgIGFyZ3NbX2tleTRdID0gYXJndW1lbnRzW19rZXk0XTtcbiAgICAgIH1cbiAgICAgIHRoaXNbTE9HX1NZTUJPTF0oTG9nVHlwZS5sb2csIGFyZ3MpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJkZWJ1Z1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkZWJ1ZygpIHtcbiAgICAgIGZvciAodmFyIF9sZW41ID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuNSksIF9rZXk1ID0gMDsgX2tleTUgPCBfbGVuNTsgX2tleTUrKykge1xuICAgICAgICBhcmdzW19rZXk1XSA9IGFyZ3VtZW50c1tfa2V5NV07XG4gICAgICB9XG4gICAgICB0aGlzW0xPR19TWU1CT0xdKExvZ1R5cGUuZGVidWcsIGFyZ3MpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJhc3NlcnRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gYXNzZXJ0KGFzc2VydGlvbikge1xuICAgICAgaWYgKCFhc3NlcnRpb24pIHtcbiAgICAgICAgZm9yICh2YXIgX2xlbjYgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW42ID4gMSA/IF9sZW42IC0gMSA6IDApLCBfa2V5NiA9IDE7IF9rZXk2IDwgX2xlbjY7IF9rZXk2KyspIHtcbiAgICAgICAgICBhcmdzW19rZXk2IC0gMV0gPSBhcmd1bWVudHNbX2tleTZdO1xuICAgICAgICB9XG4gICAgICAgIHRoaXNbTE9HX1NZTUJPTF0oTG9nVHlwZS5lcnJvciwgYXJncyk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInRyYWNlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHRyYWNlKCkge1xuICAgICAgdGhpc1tMT0dfU1lNQk9MXShMb2dUeXBlLnRyYWNlLCBbXCJUcmFjZVwiXSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImNsZWFyXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNsZWFyKCkge1xuICAgICAgdGhpc1tMT0dfU1lNQk9MXShMb2dUeXBlLmNsZWFyKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwic3RhdHVzXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHN0YXR1cygpIHtcbiAgICAgIGZvciAodmFyIF9sZW43ID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuNyksIF9rZXk3ID0gMDsgX2tleTcgPCBfbGVuNzsgX2tleTcrKykge1xuICAgICAgICBhcmdzW19rZXk3XSA9IGFyZ3VtZW50c1tfa2V5N107XG4gICAgICB9XG4gICAgICB0aGlzW0xPR19TWU1CT0xdKExvZ1R5cGUuc3RhdHVzLCBhcmdzKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZ3JvdXBcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ3JvdXAoKSB7XG4gICAgICBmb3IgKHZhciBfbGVuOCA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjgpLCBfa2V5OCA9IDA7IF9rZXk4IDwgX2xlbjg7IF9rZXk4KyspIHtcbiAgICAgICAgYXJnc1tfa2V5OF0gPSBhcmd1bWVudHNbX2tleThdO1xuICAgICAgfVxuICAgICAgdGhpc1tMT0dfU1lNQk9MXShMb2dUeXBlLmdyb3VwLCBhcmdzKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZ3JvdXBDb2xsYXBzZWRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ3JvdXBDb2xsYXBzZWQoKSB7XG4gICAgICBmb3IgKHZhciBfbGVuOSA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjkpLCBfa2V5OSA9IDA7IF9rZXk5IDwgX2xlbjk7IF9rZXk5KyspIHtcbiAgICAgICAgYXJnc1tfa2V5OV0gPSBhcmd1bWVudHNbX2tleTldO1xuICAgICAgfVxuICAgICAgdGhpc1tMT0dfU1lNQk9MXShMb2dUeXBlLmdyb3VwQ29sbGFwc2VkLCBhcmdzKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZ3JvdXBFbmRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ3JvdXBFbmQoKSB7XG4gICAgICBmb3IgKHZhciBfbGVuMTAgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4xMCksIF9rZXkxMCA9IDA7IF9rZXkxMCA8IF9sZW4xMDsgX2tleTEwKyspIHtcbiAgICAgICAgYXJnc1tfa2V5MTBdID0gYXJndW1lbnRzW19rZXkxMF07XG4gICAgICB9XG4gICAgICB0aGlzW0xPR19TWU1CT0xdKExvZ1R5cGUuZ3JvdXBFbmQsIGFyZ3MpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJwcm9maWxlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHByb2ZpbGUobGFiZWwpIHtcbiAgICAgIHRoaXNbTE9HX1NZTUJPTF0oTG9nVHlwZS5wcm9maWxlLCBbbGFiZWxdKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwicHJvZmlsZUVuZFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBwcm9maWxlRW5kKGxhYmVsKSB7XG4gICAgICB0aGlzW0xPR19TWU1CT0xdKExvZ1R5cGUucHJvZmlsZUVuZCwgW2xhYmVsXSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInRpbWVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gdGltZShsYWJlbCkge1xuICAgICAgdGhpc1tUSU1FUlNfU1lNQk9MXSA9IHRoaXNbVElNRVJTX1NZTUJPTF0gfHwgbmV3IE1hcCgpO1xuICAgICAgdGhpc1tUSU1FUlNfU1lNQk9MXS5zZXQobGFiZWwsIHByb2Nlc3MuaHJ0aW1lKCkpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJ0aW1lTG9nXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHRpbWVMb2cobGFiZWwpIHtcbiAgICAgIHZhciBwcmV2ID0gdGhpc1tUSU1FUlNfU1lNQk9MXSAmJiB0aGlzW1RJTUVSU19TWU1CT0xdLmdldChsYWJlbCk7XG4gICAgICBpZiAoIXByZXYpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm8gc3VjaCBsYWJlbCAnXCIuY29uY2F0KGxhYmVsLCBcIicgZm9yIFdlYnBhY2tMb2dnZXIudGltZUxvZygpXCIpKTtcbiAgICAgIH1cbiAgICAgIHZhciB0aW1lID0gcHJvY2Vzcy5ocnRpbWUocHJldik7XG4gICAgICB0aGlzW0xPR19TWU1CT0xdKExvZ1R5cGUudGltZSwgW2xhYmVsXS5jb25jYXQoX3RvQ29uc3VtYWJsZUFycmF5KHRpbWUpKSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInRpbWVFbmRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gdGltZUVuZChsYWJlbCkge1xuICAgICAgdmFyIHByZXYgPSB0aGlzW1RJTUVSU19TWU1CT0xdICYmIHRoaXNbVElNRVJTX1NZTUJPTF0uZ2V0KGxhYmVsKTtcbiAgICAgIGlmICghcHJldikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBzdWNoIGxhYmVsICdcIi5jb25jYXQobGFiZWwsIFwiJyBmb3IgV2VicGFja0xvZ2dlci50aW1lRW5kKClcIikpO1xuICAgICAgfVxuICAgICAgdmFyIHRpbWUgPSBwcm9jZXNzLmhydGltZShwcmV2KTtcbiAgICAgIHRoaXNbVElNRVJTX1NZTUJPTF0uZGVsZXRlKGxhYmVsKTtcbiAgICAgIHRoaXNbTE9HX1NZTUJPTF0oTG9nVHlwZS50aW1lLCBbbGFiZWxdLmNvbmNhdChfdG9Db25zdW1hYmxlQXJyYXkodGltZSkpKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwidGltZUFnZ3JlZ2F0ZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB0aW1lQWdncmVnYXRlKGxhYmVsKSB7XG4gICAgICB2YXIgcHJldiA9IHRoaXNbVElNRVJTX1NZTUJPTF0gJiYgdGhpc1tUSU1FUlNfU1lNQk9MXS5nZXQobGFiZWwpO1xuICAgICAgaWYgKCFwcmV2KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vIHN1Y2ggbGFiZWwgJ1wiLmNvbmNhdChsYWJlbCwgXCInIGZvciBXZWJwYWNrTG9nZ2VyLnRpbWVBZ2dyZWdhdGUoKVwiKSk7XG4gICAgICB9XG4gICAgICB2YXIgdGltZSA9IHByb2Nlc3MuaHJ0aW1lKHByZXYpO1xuICAgICAgdGhpc1tUSU1FUlNfU1lNQk9MXS5kZWxldGUobGFiZWwpO1xuICAgICAgdGhpc1tUSU1FUlNfQUdHUkVHQVRFU19TWU1CT0xdID0gdGhpc1tUSU1FUlNfQUdHUkVHQVRFU19TWU1CT0xdIHx8IG5ldyBNYXAoKTtcbiAgICAgIHZhciBjdXJyZW50ID0gdGhpc1tUSU1FUlNfQUdHUkVHQVRFU19TWU1CT0xdLmdldChsYWJlbCk7XG4gICAgICBpZiAoY3VycmVudCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmICh0aW1lWzFdICsgY3VycmVudFsxXSA+IDFlOSkge1xuICAgICAgICAgIHRpbWVbMF0gKz0gY3VycmVudFswXSArIDE7XG4gICAgICAgICAgdGltZVsxXSA9IHRpbWVbMV0gLSAxZTkgKyBjdXJyZW50WzFdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRpbWVbMF0gKz0gY3VycmVudFswXTtcbiAgICAgICAgICB0aW1lWzFdICs9IGN1cnJlbnRbMV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXNbVElNRVJTX0FHR1JFR0FURVNfU1lNQk9MXS5zZXQobGFiZWwsIHRpbWUpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJ0aW1lQWdncmVnYXRlRW5kXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHRpbWVBZ2dyZWdhdGVFbmQobGFiZWwpIHtcbiAgICAgIGlmICh0aGlzW1RJTUVSU19BR0dSRUdBVEVTX1NZTUJPTF0gPT09IHVuZGVmaW5lZCkgcmV0dXJuO1xuICAgICAgdmFyIHRpbWUgPSB0aGlzW1RJTUVSU19BR0dSRUdBVEVTX1NZTUJPTF0uZ2V0KGxhYmVsKTtcbiAgICAgIGlmICh0aW1lID09PSB1bmRlZmluZWQpIHJldHVybjtcbiAgICAgIHRoaXNbVElNRVJTX0FHR1JFR0FURVNfU1lNQk9MXS5kZWxldGUobGFiZWwpO1xuICAgICAgdGhpc1tMT0dfU1lNQk9MXShMb2dUeXBlLnRpbWUsIFtsYWJlbF0uY29uY2F0KF90b0NvbnN1bWFibGVBcnJheSh0aW1lKSkpO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gV2VicGFja0xvZ2dlcjtcbn0oKTtcbmV4cG9ydHMuTG9nZ2VyID0gV2VicGFja0xvZ2dlcjtcblxuLyoqKi8gfSksXG5cbi8qKiovIFwiLi9ub2RlX21vZHVsZXMvd2VicGFjay9saWIvbG9nZ2luZy9jcmVhdGVDb25zb2xlTG9nZ2VyLmpzXCI6XG4vKiEqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiEqXFxcbiAgISoqKiAuL25vZGVfbW9kdWxlcy93ZWJwYWNrL2xpYi9sb2dnaW5nL2NyZWF0ZUNvbnNvbGVMb2dnZXIuanMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgX191bnVzZWRfd2VicGFja19leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5cblxuXG5mdW5jdGlvbiBfdG9Db25zdW1hYmxlQXJyYXkoYXJyKSB7XG4gIHJldHVybiBfYXJyYXlXaXRob3V0SG9sZXMoYXJyKSB8fCBfaXRlcmFibGVUb0FycmF5KGFycikgfHwgX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFycikgfHwgX25vbkl0ZXJhYmxlU3ByZWFkKCk7XG59XG5mdW5jdGlvbiBfbm9uSXRlcmFibGVTcHJlYWQoKSB7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gc3ByZWFkIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpO1xufVxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikge1xuICBpZiAoIW8pIHJldHVybjtcbiAgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTtcbiAgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpO1xuICBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lO1xuICBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTtcbiAgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pO1xufVxuZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheShpdGVyKSB7XG4gIGlmICh0eXBlb2YgKHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgPyBTeW1ib2wgOiBmdW5jdGlvbiAoaSkgeyByZXR1cm4gaTsgfSkgIT09IFwidW5kZWZpbmVkXCIgJiYgaXRlclsodHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiA/IFN5bWJvbCA6IGZ1bmN0aW9uIChpKSB7IHJldHVybiBpOyB9KS5pdGVyYXRvcl0gIT0gbnVsbCB8fCBpdGVyW1wiQEBpdGVyYXRvclwiXSAhPSBudWxsKSByZXR1cm4gQXJyYXkuZnJvbShpdGVyKTtcbn1cbmZ1bmN0aW9uIF9hcnJheVdpdGhvdXRIb2xlcyhhcnIpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KGFycik7XG59XG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikge1xuICBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDtcbiAgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSBhcnIyW2ldID0gYXJyW2ldO1xuICByZXR1cm4gYXJyMjtcbn1cbnZhciBfcmVxdWlyZSA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4vTG9nZ2VyICovIFwiLi9ub2RlX21vZHVsZXMvd2VicGFjay9saWIvbG9nZ2luZy9Mb2dnZXIuanNcIiksXG4gIExvZ1R5cGUgPSBfcmVxdWlyZS5Mb2dUeXBlO1xuXG4vKiogQHR5cGVkZWYge2ltcG9ydChcIi4uLy4uL2RlY2xhcmF0aW9ucy9XZWJwYWNrT3B0aW9uc1wiKS5GaWx0ZXJJdGVtVHlwZXN9IEZpbHRlckl0ZW1UeXBlcyAqL1xuLyoqIEB0eXBlZGVmIHtpbXBvcnQoXCIuLi8uLi9kZWNsYXJhdGlvbnMvV2VicGFja09wdGlvbnNcIikuRmlsdGVyVHlwZXN9IEZpbHRlclR5cGVzICovXG4vKiogQHR5cGVkZWYge2ltcG9ydChcIi4vTG9nZ2VyXCIpLkxvZ1R5cGVFbnVtfSBMb2dUeXBlRW51bSAqL1xuXG4vKiogQHR5cGVkZWYge2Z1bmN0aW9uKHN0cmluZyk6IGJvb2xlYW59IEZpbHRlckZ1bmN0aW9uICovXG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gTG9nZ2VyQ29uc29sZVxuICogQHByb3BlcnR5IHtmdW5jdGlvbigpOiB2b2lkfSBjbGVhclxuICogQHByb3BlcnR5IHtmdW5jdGlvbigpOiB2b2lkfSB0cmFjZVxuICogQHByb3BlcnR5IHsoLi4uYXJnczogYW55W10pID0+IHZvaWR9IGluZm9cbiAqIEBwcm9wZXJ0eSB7KC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkfSBsb2dcbiAqIEBwcm9wZXJ0eSB7KC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkfSB3YXJuXG4gKiBAcHJvcGVydHkgeyguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZH0gZXJyb3JcbiAqIEBwcm9wZXJ0eSB7KC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkPX0gZGVidWdcbiAqIEBwcm9wZXJ0eSB7KC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkPX0gZ3JvdXBcbiAqIEBwcm9wZXJ0eSB7KC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkPX0gZ3JvdXBDb2xsYXBzZWRcbiAqIEBwcm9wZXJ0eSB7KC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkPX0gZ3JvdXBFbmRcbiAqIEBwcm9wZXJ0eSB7KC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkPX0gc3RhdHVzXG4gKiBAcHJvcGVydHkgeyguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZD19IHByb2ZpbGVcbiAqIEBwcm9wZXJ0eSB7KC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkPX0gcHJvZmlsZUVuZFxuICogQHByb3BlcnR5IHsoLi4uYXJnczogYW55W10pID0+IHZvaWQ9fSBsb2dUaW1lXG4gKi9cblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBMb2dnZXJPcHRpb25zXG4gKiBAcHJvcGVydHkge2ZhbHNlfHRydWV8XCJub25lXCJ8XCJlcnJvclwifFwid2FyblwifFwiaW5mb1wifFwibG9nXCJ8XCJ2ZXJib3NlXCJ9IGxldmVsIGxvZ2xldmVsXG4gKiBAcHJvcGVydHkge0ZpbHRlclR5cGVzfGJvb2xlYW59IGRlYnVnIGZpbHRlciBmb3IgZGVidWcgbG9nZ2luZ1xuICogQHByb3BlcnR5IHtMb2dnZXJDb25zb2xlfSBjb25zb2xlIHRoZSBjb25zb2xlIHRvIGxvZyB0b1xuICovXG5cbi8qKlxuICogQHBhcmFtIHtGaWx0ZXJJdGVtVHlwZXN9IGl0ZW0gYW4gaW5wdXQgaXRlbVxuICogQHJldHVybnMge0ZpbHRlckZ1bmN0aW9ufSBmaWx0ZXIgZnVuY3Rpb25cbiAqL1xudmFyIGZpbHRlclRvRnVuY3Rpb24gPSBmdW5jdGlvbiBmaWx0ZXJUb0Z1bmN0aW9uKGl0ZW0pIHtcbiAgaWYgKHR5cGVvZiBpdGVtID09PSBcInN0cmluZ1wiKSB7XG4gICAgdmFyIHJlZ0V4cCA9IG5ldyBSZWdFeHAoXCJbXFxcXFxcXFwvXVwiLmNvbmNhdChpdGVtLnJlcGxhY2UoXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVzZWxlc3MtZXNjYXBlXG4gICAgL1stW1xcXXt9KCkqKz8uXFxcXF4kfF0vZywgXCJcXFxcJCZcIiksIFwiKFtcXFxcXFxcXC9dfCR8IXxcXFxcPylcIikpO1xuICAgIHJldHVybiBmdW5jdGlvbiAoaWRlbnQpIHtcbiAgICAgIHJldHVybiByZWdFeHAudGVzdChpZGVudCk7XG4gICAgfTtcbiAgfVxuICBpZiAoaXRlbSAmJiB0eXBlb2YgaXRlbSA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgaXRlbS50ZXN0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGlkZW50KSB7XG4gICAgICByZXR1cm4gaXRlbS50ZXN0KGlkZW50KTtcbiAgICB9O1xuICB9XG4gIGlmICh0eXBlb2YgaXRlbSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgcmV0dXJuIGl0ZW07XG4gIH1cbiAgaWYgKHR5cGVvZiBpdGVtID09PSBcImJvb2xlYW5cIikge1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gaXRlbTtcbiAgICB9O1xuICB9XG59O1xuXG4vKipcbiAqIEBlbnVtIHtudW1iZXJ9XG4gKi9cbnZhciBMb2dMZXZlbCA9IHtcbiAgbm9uZTogNixcbiAgZmFsc2U6IDYsXG4gIGVycm9yOiA1LFxuICB3YXJuOiA0LFxuICBpbmZvOiAzLFxuICBsb2c6IDIsXG4gIHRydWU6IDIsXG4gIHZlcmJvc2U6IDFcbn07XG5cbi8qKlxuICogQHBhcmFtIHtMb2dnZXJPcHRpb25zfSBvcHRpb25zIG9wdGlvbnMgb2JqZWN0XG4gKiBAcmV0dXJucyB7ZnVuY3Rpb24oc3RyaW5nLCBMb2dUeXBlRW51bSwgYW55W10pOiB2b2lkfSBsb2dnaW5nIGZ1bmN0aW9uXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKF9yZWYpIHtcbiAgdmFyIF9yZWYkbGV2ZWwgPSBfcmVmLmxldmVsLFxuICAgIGxldmVsID0gX3JlZiRsZXZlbCA9PT0gdm9pZCAwID8gXCJpbmZvXCIgOiBfcmVmJGxldmVsLFxuICAgIF9yZWYkZGVidWcgPSBfcmVmLmRlYnVnLFxuICAgIGRlYnVnID0gX3JlZiRkZWJ1ZyA9PT0gdm9pZCAwID8gZmFsc2UgOiBfcmVmJGRlYnVnLFxuICAgIGNvbnNvbGUgPSBfcmVmLmNvbnNvbGU7XG4gIHZhciBkZWJ1Z0ZpbHRlcnMgPSB0eXBlb2YgZGVidWcgPT09IFwiYm9vbGVhblwiID8gW2Z1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZGVidWc7XG4gIH1dIDogLyoqIEB0eXBlIHtGaWx0ZXJJdGVtVHlwZXNbXX0gKi9bXS5jb25jYXQoZGVidWcpLm1hcChmaWx0ZXJUb0Z1bmN0aW9uKTtcbiAgLyoqIEB0eXBlIHtudW1iZXJ9ICovXG4gIHZhciBsb2dsZXZlbCA9IExvZ0xldmVsW1wiXCIuY29uY2F0KGxldmVsKV0gfHwgMDtcblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgbmFtZSBvZiB0aGUgbG9nZ2VyXG4gICAqIEBwYXJhbSB7TG9nVHlwZUVudW19IHR5cGUgdHlwZSBvZiB0aGUgbG9nIGVudHJ5XG4gICAqIEBwYXJhbSB7YW55W119IGFyZ3MgYXJndW1lbnRzIG9mIHRoZSBsb2cgZW50cnlcbiAgICogQHJldHVybnMge3ZvaWR9XG4gICAqL1xuICB2YXIgbG9nZ2VyID0gZnVuY3Rpb24gbG9nZ2VyKG5hbWUsIHR5cGUsIGFyZ3MpIHtcbiAgICB2YXIgbGFiZWxlZEFyZ3MgPSBmdW5jdGlvbiBsYWJlbGVkQXJncygpIHtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGFyZ3MpKSB7XG4gICAgICAgIGlmIChhcmdzLmxlbmd0aCA+IDAgJiYgdHlwZW9mIGFyZ3NbMF0gPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICByZXR1cm4gW1wiW1wiLmNvbmNhdChuYW1lLCBcIl0gXCIpLmNvbmNhdChhcmdzWzBdKV0uY29uY2F0KF90b0NvbnN1bWFibGVBcnJheShhcmdzLnNsaWNlKDEpKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIFtcIltcIi5jb25jYXQobmFtZSwgXCJdXCIpXS5jb25jYXQoX3RvQ29uc3VtYWJsZUFycmF5KGFyZ3MpKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgfVxuICAgIH07XG4gICAgdmFyIGRlYnVnID0gZGVidWdGaWx0ZXJzLnNvbWUoZnVuY3Rpb24gKGYpIHtcbiAgICAgIHJldHVybiBmKG5hbWUpO1xuICAgIH0pO1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSBMb2dUeXBlLmRlYnVnOlxuICAgICAgICBpZiAoIWRlYnVnKSByZXR1cm47XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBub2RlL25vLXVuc3VwcG9ydGVkLWZlYXR1cmVzL25vZGUtYnVpbHRpbnNcbiAgICAgICAgaWYgKHR5cGVvZiBjb25zb2xlLmRlYnVnID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm9kZS9uby11bnN1cHBvcnRlZC1mZWF0dXJlcy9ub2RlLWJ1aWx0aW5zXG4gICAgICAgICAgY29uc29sZS5kZWJ1Zy5hcHBseShjb25zb2xlLCBfdG9Db25zdW1hYmxlQXJyYXkobGFiZWxlZEFyZ3MoKSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUubG9nLmFwcGx5KGNvbnNvbGUsIF90b0NvbnN1bWFibGVBcnJheShsYWJlbGVkQXJncygpKSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIExvZ1R5cGUubG9nOlxuICAgICAgICBpZiAoIWRlYnVnICYmIGxvZ2xldmVsID4gTG9nTGV2ZWwubG9nKSByZXR1cm47XG4gICAgICAgIGNvbnNvbGUubG9nLmFwcGx5KGNvbnNvbGUsIF90b0NvbnN1bWFibGVBcnJheShsYWJlbGVkQXJncygpKSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBMb2dUeXBlLmluZm86XG4gICAgICAgIGlmICghZGVidWcgJiYgbG9nbGV2ZWwgPiBMb2dMZXZlbC5pbmZvKSByZXR1cm47XG4gICAgICAgIGNvbnNvbGUuaW5mby5hcHBseShjb25zb2xlLCBfdG9Db25zdW1hYmxlQXJyYXkobGFiZWxlZEFyZ3MoKSkpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgTG9nVHlwZS53YXJuOlxuICAgICAgICBpZiAoIWRlYnVnICYmIGxvZ2xldmVsID4gTG9nTGV2ZWwud2FybikgcmV0dXJuO1xuICAgICAgICBjb25zb2xlLndhcm4uYXBwbHkoY29uc29sZSwgX3RvQ29uc3VtYWJsZUFycmF5KGxhYmVsZWRBcmdzKCkpKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIExvZ1R5cGUuZXJyb3I6XG4gICAgICAgIGlmICghZGVidWcgJiYgbG9nbGV2ZWwgPiBMb2dMZXZlbC5lcnJvcikgcmV0dXJuO1xuICAgICAgICBjb25zb2xlLmVycm9yLmFwcGx5KGNvbnNvbGUsIF90b0NvbnN1bWFibGVBcnJheShsYWJlbGVkQXJncygpKSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBMb2dUeXBlLnRyYWNlOlxuICAgICAgICBpZiAoIWRlYnVnKSByZXR1cm47XG4gICAgICAgIGNvbnNvbGUudHJhY2UoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIExvZ1R5cGUuZ3JvdXBDb2xsYXBzZWQ6XG4gICAgICAgIGlmICghZGVidWcgJiYgbG9nbGV2ZWwgPiBMb2dMZXZlbC5sb2cpIHJldHVybjtcbiAgICAgICAgaWYgKCFkZWJ1ZyAmJiBsb2dsZXZlbCA+IExvZ0xldmVsLnZlcmJvc2UpIHtcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm9kZS9uby11bnN1cHBvcnRlZC1mZWF0dXJlcy9ub2RlLWJ1aWx0aW5zXG4gICAgICAgICAgaWYgKHR5cGVvZiBjb25zb2xlLmdyb3VwQ29sbGFwc2VkID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBub2RlL25vLXVuc3VwcG9ydGVkLWZlYXR1cmVzL25vZGUtYnVpbHRpbnNcbiAgICAgICAgICAgIGNvbnNvbGUuZ3JvdXBDb2xsYXBzZWQuYXBwbHkoY29uc29sZSwgX3RvQ29uc3VtYWJsZUFycmF5KGxhYmVsZWRBcmdzKCkpKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2cuYXBwbHkoY29uc29sZSwgX3RvQ29uc3VtYWJsZUFycmF5KGxhYmVsZWRBcmdzKCkpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIC8vIGZhbGxzIHRocm91Z2hcbiAgICAgIGNhc2UgTG9nVHlwZS5ncm91cDpcbiAgICAgICAgaWYgKCFkZWJ1ZyAmJiBsb2dsZXZlbCA+IExvZ0xldmVsLmxvZykgcmV0dXJuO1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm9kZS9uby11bnN1cHBvcnRlZC1mZWF0dXJlcy9ub2RlLWJ1aWx0aW5zXG4gICAgICAgIGlmICh0eXBlb2YgY29uc29sZS5ncm91cCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vZGUvbm8tdW5zdXBwb3J0ZWQtZmVhdHVyZXMvbm9kZS1idWlsdGluc1xuICAgICAgICAgIGNvbnNvbGUuZ3JvdXAuYXBwbHkoY29uc29sZSwgX3RvQ29uc3VtYWJsZUFycmF5KGxhYmVsZWRBcmdzKCkpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmxvZy5hcHBseShjb25zb2xlLCBfdG9Db25zdW1hYmxlQXJyYXkobGFiZWxlZEFyZ3MoKSkpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBMb2dUeXBlLmdyb3VwRW5kOlxuICAgICAgICBpZiAoIWRlYnVnICYmIGxvZ2xldmVsID4gTG9nTGV2ZWwubG9nKSByZXR1cm47XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBub2RlL25vLXVuc3VwcG9ydGVkLWZlYXR1cmVzL25vZGUtYnVpbHRpbnNcbiAgICAgICAgaWYgKHR5cGVvZiBjb25zb2xlLmdyb3VwRW5kID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm9kZS9uby11bnN1cHBvcnRlZC1mZWF0dXJlcy9ub2RlLWJ1aWx0aW5zXG4gICAgICAgICAgY29uc29sZS5ncm91cEVuZCgpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBMb2dUeXBlLnRpbWU6XG4gICAgICAgIHtcbiAgICAgICAgICBpZiAoIWRlYnVnICYmIGxvZ2xldmVsID4gTG9nTGV2ZWwubG9nKSByZXR1cm47XG4gICAgICAgICAgdmFyIG1zID0gYXJnc1sxXSAqIDEwMDAgKyBhcmdzWzJdIC8gMTAwMDAwMDtcbiAgICAgICAgICB2YXIgbXNnID0gXCJbXCIuY29uY2F0KG5hbWUsIFwiXSBcIikuY29uY2F0KGFyZ3NbMF0sIFwiOiBcIikuY29uY2F0KG1zLCBcIiBtc1wiKTtcbiAgICAgICAgICBpZiAodHlwZW9mIGNvbnNvbGUubG9nVGltZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZ1RpbWUobXNnKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2cobXNnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIGNhc2UgTG9nVHlwZS5wcm9maWxlOlxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm9kZS9uby11bnN1cHBvcnRlZC1mZWF0dXJlcy9ub2RlLWJ1aWx0aW5zXG4gICAgICAgIGlmICh0eXBlb2YgY29uc29sZS5wcm9maWxlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm9kZS9uby11bnN1cHBvcnRlZC1mZWF0dXJlcy9ub2RlLWJ1aWx0aW5zXG4gICAgICAgICAgY29uc29sZS5wcm9maWxlLmFwcGx5KGNvbnNvbGUsIF90b0NvbnN1bWFibGVBcnJheShsYWJlbGVkQXJncygpKSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIExvZ1R5cGUucHJvZmlsZUVuZDpcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vZGUvbm8tdW5zdXBwb3J0ZWQtZmVhdHVyZXMvbm9kZS1idWlsdGluc1xuICAgICAgICBpZiAodHlwZW9mIGNvbnNvbGUucHJvZmlsZUVuZCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vZGUvbm8tdW5zdXBwb3J0ZWQtZmVhdHVyZXMvbm9kZS1idWlsdGluc1xuICAgICAgICAgIGNvbnNvbGUucHJvZmlsZUVuZC5hcHBseShjb25zb2xlLCBfdG9Db25zdW1hYmxlQXJyYXkobGFiZWxlZEFyZ3MoKSkpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBMb2dUeXBlLmNsZWFyOlxuICAgICAgICBpZiAoIWRlYnVnICYmIGxvZ2xldmVsID4gTG9nTGV2ZWwubG9nKSByZXR1cm47XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBub2RlL25vLXVuc3VwcG9ydGVkLWZlYXR1cmVzL25vZGUtYnVpbHRpbnNcbiAgICAgICAgaWYgKHR5cGVvZiBjb25zb2xlLmNsZWFyID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm9kZS9uby11bnN1cHBvcnRlZC1mZWF0dXJlcy9ub2RlLWJ1aWx0aW5zXG4gICAgICAgICAgY29uc29sZS5jbGVhcigpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBMb2dUeXBlLnN0YXR1czpcbiAgICAgICAgaWYgKCFkZWJ1ZyAmJiBsb2dsZXZlbCA+IExvZ0xldmVsLmluZm8pIHJldHVybjtcbiAgICAgICAgaWYgKHR5cGVvZiBjb25zb2xlLnN0YXR1cyA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgaWYgKGFyZ3MubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBjb25zb2xlLnN0YXR1cygpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLnN0YXR1cy5hcHBseShjb25zb2xlLCBfdG9Db25zdW1hYmxlQXJyYXkobGFiZWxlZEFyZ3MoKSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoYXJncy5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICAgIGNvbnNvbGUuaW5mby5hcHBseShjb25zb2xlLCBfdG9Db25zdW1hYmxlQXJyYXkobGFiZWxlZEFyZ3MoKSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVuZXhwZWN0ZWQgTG9nVHlwZSBcIi5jb25jYXQodHlwZSkpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxvZ2dlcjtcbn07XG5cbi8qKiovIH0pLFxuXG4vKioqLyBcIi4vbm9kZV9tb2R1bGVzL3dlYnBhY2svbGliL2xvZ2dpbmcvcnVudGltZS5qc1wiOlxuLyohKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiohKlxcXG4gICEqKiogLi9ub2RlX21vZHVsZXMvd2VicGFjay9saWIvbG9nZ2luZy9ydW50aW1lLmpzICoqKiFcbiAgXFwqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKiovIChmdW5jdGlvbihfX3VudXNlZF93ZWJwYWNrX21vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG4vKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuXG5cblxuZnVuY3Rpb24gX2V4dGVuZHMoKSB7XG4gIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiA/IE9iamVjdC5hc3NpZ24uYmluZCgpIDogZnVuY3Rpb24gKHRhcmdldCkge1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldO1xuICAgICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xuICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkge1xuICAgICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfTtcbiAgcmV0dXJuIF9leHRlbmRzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59XG52YXIgU3luY0JhaWxIb29rID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgdGFwYWJsZS9saWIvU3luY0JhaWxIb29rICovIFwiLi9jbGllbnQtc3JjL21vZHVsZXMvbG9nZ2VyL1N5bmNCYWlsSG9va0Zha2UuanNcIik7XG52YXIgX3JlcXVpcmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuL0xvZ2dlciAqLyBcIi4vbm9kZV9tb2R1bGVzL3dlYnBhY2svbGliL2xvZ2dpbmcvTG9nZ2VyLmpzXCIpLFxuICBMb2dnZXIgPSBfcmVxdWlyZS5Mb2dnZXI7XG52YXIgY3JlYXRlQ29uc29sZUxvZ2dlciA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4vY3JlYXRlQ29uc29sZUxvZ2dlciAqLyBcIi4vbm9kZV9tb2R1bGVzL3dlYnBhY2svbGliL2xvZ2dpbmcvY3JlYXRlQ29uc29sZUxvZ2dlci5qc1wiKTtcblxuLyoqIEB0eXBlIHtjcmVhdGVDb25zb2xlTG9nZ2VyLkxvZ2dlck9wdGlvbnN9ICovXG52YXIgY3VycmVudERlZmF1bHRMb2dnZXJPcHRpb25zID0ge1xuICBsZXZlbDogXCJpbmZvXCIsXG4gIGRlYnVnOiBmYWxzZSxcbiAgY29uc29sZTogY29uc29sZVxufTtcbnZhciBjdXJyZW50RGVmYXVsdExvZ2dlciA9IGNyZWF0ZUNvbnNvbGVMb2dnZXIoY3VycmVudERlZmF1bHRMb2dnZXJPcHRpb25zKTtcblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBuYW1lIG9mIHRoZSBsb2dnZXJcbiAqIEByZXR1cm5zIHtMb2dnZXJ9IGEgbG9nZ2VyXG4gKi9cbmV4cG9ydHMuZ2V0TG9nZ2VyID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgcmV0dXJuIG5ldyBMb2dnZXIoZnVuY3Rpb24gKHR5cGUsIGFyZ3MpIHtcbiAgICBpZiAoZXhwb3J0cy5ob29rcy5sb2cuY2FsbChuYW1lLCB0eXBlLCBhcmdzKSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBjdXJyZW50RGVmYXVsdExvZ2dlcihuYW1lLCB0eXBlLCBhcmdzKTtcbiAgICB9XG4gIH0sIGZ1bmN0aW9uIChjaGlsZE5hbWUpIHtcbiAgICByZXR1cm4gZXhwb3J0cy5nZXRMb2dnZXIoXCJcIi5jb25jYXQobmFtZSwgXCIvXCIpLmNvbmNhdChjaGlsZE5hbWUpKTtcbiAgfSk7XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7Y3JlYXRlQ29uc29sZUxvZ2dlci5Mb2dnZXJPcHRpb25zfSBvcHRpb25zIG5ldyBvcHRpb25zLCBtZXJnZSB3aXRoIG9sZCBvcHRpb25zXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZXhwb3J0cy5jb25maWd1cmVEZWZhdWx0TG9nZ2VyID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgX2V4dGVuZHMoY3VycmVudERlZmF1bHRMb2dnZXJPcHRpb25zLCBvcHRpb25zKTtcbiAgY3VycmVudERlZmF1bHRMb2dnZXIgPSBjcmVhdGVDb25zb2xlTG9nZ2VyKGN1cnJlbnREZWZhdWx0TG9nZ2VyT3B0aW9ucyk7XG59O1xuZXhwb3J0cy5ob29rcyA9IHtcbiAgbG9nOiBuZXcgU3luY0JhaWxIb29rKFtcIm9yaWdpblwiLCBcInR5cGVcIiwgXCJhcmdzXCJdKVxufTtcblxuLyoqKi8gfSlcblxuLyoqKioqKi8gXHR9KTtcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqKioqLyBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbi8qKioqKiovIFx0dmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuLyoqKioqKi8gXHRcbi8qKioqKiovIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbi8qKioqKiovIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuLyoqKioqKi8gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuLyoqKioqKi8gXHRcdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuLyoqKioqKi8gXHRcdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuLyoqKioqKi8gXHRcdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuLyoqKioqKi8gXHRcdH1cbi8qKioqKiovIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuLyoqKioqKi8gXHRcdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuLyoqKioqKi8gXHRcdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuLyoqKioqKi8gXHRcdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcbi8qKioqKiovIFx0XHRcdGV4cG9ydHM6IHt9XG4vKioqKioqLyBcdFx0fTtcbi8qKioqKiovIFx0XG4vKioqKioqLyBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4vKioqKioqLyBcdFx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG4vKioqKioqLyBcdFxuLyoqKioqKi8gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4vKioqKioqLyBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuLyoqKioqKi8gXHR9XG4vKioqKioqLyBcdFxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKioqKiovIFx0Lyogd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzICovXG4vKioqKioqLyBcdCFmdW5jdGlvbigpIHtcbi8qKioqKiovIFx0XHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG4vKioqKioqLyBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgZGVmaW5pdGlvbikge1xuLyoqKioqKi8gXHRcdFx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuLyoqKioqKi8gXHRcdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcbi8qKioqKiovIFx0XHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuLyoqKioqKi8gXHRcdFx0XHR9XG4vKioqKioqLyBcdFx0XHR9XG4vKioqKioqLyBcdFx0fTtcbi8qKioqKiovIFx0fSgpO1xuLyoqKioqKi8gXHRcbi8qKioqKiovIFx0Lyogd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCAqL1xuLyoqKioqKi8gXHQhZnVuY3Rpb24oKSB7XG4vKioqKioqLyBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqLCBwcm9wKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTsgfVxuLyoqKioqKi8gXHR9KCk7XG4vKioqKioqLyBcdFxuLyoqKioqKi8gXHQvKiB3ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0ICovXG4vKioqKioqLyBcdCFmdW5jdGlvbigpIHtcbi8qKioqKiovIFx0XHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4vKioqKioqLyBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuLyoqKioqKi8gXHRcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4vKioqKioqLyBcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuLyoqKioqKi8gXHRcdFx0fVxuLyoqKioqKi8gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKioqKiovIFx0XHR9O1xuLyoqKioqKi8gXHR9KCk7XG4vKioqKioqLyBcdFxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0ge307XG4vLyBUaGlzIGVudHJ5IG5lZWQgdG8gYmUgd3JhcHBlZCBpbiBhbiBJSUZFIGJlY2F1c2UgaXQgbmVlZCB0byBiZSBpc29sYXRlZCBhZ2FpbnN0IG90aGVyIG1vZHVsZXMgaW4gdGhlIGNodW5rLlxuIWZ1bmN0aW9uKCkge1xuLyohKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiohKlxcXG4gICEqKiogLi9jbGllbnQtc3JjL21vZHVsZXMvbG9nZ2VyL2luZGV4LmpzICoqKiFcbiAgXFwqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbl9fd2VicGFja19yZXF1aXJlX18ucihfX3dlYnBhY2tfZXhwb3J0c19fKTtcbi8qIGhhcm1vbnkgZXhwb3J0ICovIF9fd2VicGFja19yZXF1aXJlX18uZChfX3dlYnBhY2tfZXhwb3J0c19fLCB7XG4vKiBoYXJtb255IGV4cG9ydCAqLyAgIFwiZGVmYXVsdFwiOiBmdW5jdGlvbigpIHsgcmV0dXJuIC8qIHJlZXhwb3J0IGRlZmF1bHQgZXhwb3J0IGZyb20gbmFtZWQgbW9kdWxlICovIHdlYnBhY2tfbGliX2xvZ2dpbmdfcnVudGltZV9qc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fOyB9XG4vKiBoYXJtb255IGV4cG9ydCAqLyB9KTtcbi8qIGhhcm1vbnkgaW1wb3J0ICovIHZhciB3ZWJwYWNrX2xpYl9sb2dnaW5nX3J1bnRpbWVfanNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXyA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIHdlYnBhY2svbGliL2xvZ2dpbmcvcnVudGltZS5qcyAqLyBcIi4vbm9kZV9tb2R1bGVzL3dlYnBhY2svbGliL2xvZ2dpbmcvcnVudGltZS5qc1wiKTtcblxufSgpO1xudmFyIF9fd2VicGFja19leHBvcnRfdGFyZ2V0X18gPSBleHBvcnRzO1xuZm9yKHZhciBpIGluIF9fd2VicGFja19leHBvcnRzX18pIF9fd2VicGFja19leHBvcnRfdGFyZ2V0X19baV0gPSBfX3dlYnBhY2tfZXhwb3J0c19fW2ldO1xuaWYoX193ZWJwYWNrX2V4cG9ydHNfXy5fX2VzTW9kdWxlKSBPYmplY3QuZGVmaW5lUHJvcGVydHkoX193ZWJwYWNrX2V4cG9ydF90YXJnZXRfXywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKioqKioqLyB9KSgpXG47IiwiZnVuY3Rpb24gb3duS2V5cyhvYmplY3QsIGVudW1lcmFibGVPbmx5KSB7IHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqZWN0KTsgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHsgdmFyIHN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKG9iamVjdCk7IGVudW1lcmFibGVPbmx5ICYmIChzeW1ib2xzID0gc3ltYm9scy5maWx0ZXIoZnVuY3Rpb24gKHN5bSkgeyByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHN5bSkuZW51bWVyYWJsZTsgfSkpLCBrZXlzLnB1c2guYXBwbHkoa2V5cywgc3ltYm9scyk7IH0gcmV0dXJuIGtleXM7IH1cbmZ1bmN0aW9uIF9vYmplY3RTcHJlYWQodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBudWxsICE9IGFyZ3VtZW50c1tpXSA/IGFyZ3VtZW50c1tpXSA6IHt9OyBpICUgMiA/IG93bktleXMoT2JqZWN0KHNvdXJjZSksICEwKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHsgX2RlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBzb3VyY2Vba2V5XSk7IH0pIDogT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMgPyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKHNvdXJjZSkpIDogb3duS2V5cyhPYmplY3Qoc291cmNlKSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIGtleSkpOyB9KTsgfSByZXR1cm4gdGFyZ2V0OyB9XG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7IGtleSA9IF90b1Byb3BlcnR5S2V5KGtleSk7IGlmIChrZXkgaW4gb2JqKSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgeyB2YWx1ZTogdmFsdWUsIGVudW1lcmFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSwgd3JpdGFibGU6IHRydWUgfSk7IH0gZWxzZSB7IG9ialtrZXldID0gdmFsdWU7IH0gcmV0dXJuIG9iajsgfVxuZnVuY3Rpb24gX3RvUHJvcGVydHlLZXkoYXJnKSB7IHZhciBrZXkgPSBfdG9QcmltaXRpdmUoYXJnLCBcInN0cmluZ1wiKTsgcmV0dXJuIHR5cGVvZiBrZXkgPT09IFwic3ltYm9sXCIgPyBrZXkgOiBTdHJpbmcoa2V5KTsgfVxuZnVuY3Rpb24gX3RvUHJpbWl0aXZlKGlucHV0LCBoaW50KSB7IGlmICh0eXBlb2YgaW5wdXQgIT09IFwib2JqZWN0XCIgfHwgaW5wdXQgPT09IG51bGwpIHJldHVybiBpbnB1dDsgdmFyIHByaW0gPSBpbnB1dFtTeW1ib2wudG9QcmltaXRpdmVdOyBpZiAocHJpbSAhPT0gdW5kZWZpbmVkKSB7IHZhciByZXMgPSBwcmltLmNhbGwoaW5wdXQsIGhpbnQgfHwgXCJkZWZhdWx0XCIpOyBpZiAodHlwZW9mIHJlcyAhPT0gXCJvYmplY3RcIikgcmV0dXJuIHJlczsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkBAdG9QcmltaXRpdmUgbXVzdCByZXR1cm4gYSBwcmltaXRpdmUgdmFsdWUuXCIpOyB9IHJldHVybiAoaGludCA9PT0gXCJzdHJpbmdcIiA/IFN0cmluZyA6IE51bWJlcikoaW5wdXQpOyB9XG4vLyBUaGUgZXJyb3Igb3ZlcmxheSBpcyBpbnNwaXJlZCAoYW5kIG1vc3RseSBjb3BpZWQpIGZyb20gQ3JlYXRlIFJlYWN0IEFwcCAoaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29raW5jdWJhdG9yL2NyZWF0ZS1yZWFjdC1hcHApXG4vLyBUaGV5LCBpbiB0dXJuLCBnb3QgaW5zcGlyZWQgYnkgd2VicGFjay1ob3QtbWlkZGxld2FyZSAoaHR0cHM6Ly9naXRodWIuY29tL2dsZW5qYW1pbi93ZWJwYWNrLWhvdC1taWRkbGV3YXJlKS5cblxuaW1wb3J0IGFuc2lIVE1MIGZyb20gXCJhbnNpLWh0bWwtY29tbXVuaXR5XCI7XG5pbXBvcnQgeyBlbmNvZGUgfSBmcm9tIFwiaHRtbC1lbnRpdGllc1wiO1xuaW1wb3J0IHsgbGlzdGVuVG9SdW50aW1lRXJyb3IsIGxpc3RlblRvVW5oYW5kbGVkUmVqZWN0aW9uLCBwYXJzZUVycm9yVG9TdGFja3MgfSBmcm9tIFwiLi9vdmVybGF5L3J1bnRpbWUtZXJyb3IuanNcIjtcbmltcG9ydCBjcmVhdGVPdmVybGF5TWFjaGluZSBmcm9tIFwiLi9vdmVybGF5L3N0YXRlLW1hY2hpbmUuanNcIjtcbmltcG9ydCB7IGNvbnRhaW5lclN0eWxlLCBkaXNtaXNzQnV0dG9uU3R5bGUsIGhlYWRlclN0eWxlLCBpZnJhbWVTdHlsZSwgbXNnU3R5bGVzLCBtc2dUZXh0U3R5bGUsIG1zZ1R5cGVTdHlsZSB9IGZyb20gXCIuL292ZXJsYXkvc3R5bGVzLmpzXCI7XG52YXIgY29sb3JzID0ge1xuICByZXNldDogW1widHJhbnNwYXJlbnRcIiwgXCJ0cmFuc3BhcmVudFwiXSxcbiAgYmxhY2s6IFwiMTgxODE4XCIsXG4gIHJlZDogXCJFMzYwNDlcIixcbiAgZ3JlZW46IFwiQjNDQjc0XCIsXG4gIHllbGxvdzogXCJGRkQwODBcIixcbiAgYmx1ZTogXCI3Q0FGQzJcIixcbiAgbWFnZW50YTogXCI3RkFDQ0FcIixcbiAgY3lhbjogXCJDM0MyRUZcIixcbiAgbGlnaHRncmV5OiBcIkVCRTdFM1wiLFxuICBkYXJrZ3JleTogXCI2RDc4OTFcIlxufTtcbmFuc2lIVE1MLnNldENvbG9ycyhjb2xvcnMpO1xuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gKiBAcGFyYW0ge3N0cmluZyAgfCB7IGZpbGU/OiBzdHJpbmcsIG1vZHVsZU5hbWU/OiBzdHJpbmcsIGxvYz86IHN0cmluZywgbWVzc2FnZT86IHN0cmluZzsgc3RhY2s/OiBzdHJpbmdbXSB9fSBpdGVtXG4gKiBAcmV0dXJucyB7eyBoZWFkZXI6IHN0cmluZywgYm9keTogc3RyaW5nIH19XG4gKi9cbmZ1bmN0aW9uIGZvcm1hdFByb2JsZW0odHlwZSwgaXRlbSkge1xuICB2YXIgaGVhZGVyID0gdHlwZSA9PT0gXCJ3YXJuaW5nXCIgPyBcIldBUk5JTkdcIiA6IFwiRVJST1JcIjtcbiAgdmFyIGJvZHkgPSBcIlwiO1xuICBpZiAodHlwZW9mIGl0ZW0gPT09IFwic3RyaW5nXCIpIHtcbiAgICBib2R5ICs9IGl0ZW07XG4gIH0gZWxzZSB7XG4gICAgdmFyIGZpbGUgPSBpdGVtLmZpbGUgfHwgXCJcIjtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmVzdGVkLXRlcm5hcnlcbiAgICB2YXIgbW9kdWxlTmFtZSA9IGl0ZW0ubW9kdWxlTmFtZSA/IGl0ZW0ubW9kdWxlTmFtZS5pbmRleE9mKFwiIVwiKSAhPT0gLTEgPyBcIlwiLmNvbmNhdChpdGVtLm1vZHVsZU5hbWUucmVwbGFjZSgvXihcXHN8XFxTKSohLywgXCJcIiksIFwiIChcIikuY29uY2F0KGl0ZW0ubW9kdWxlTmFtZSwgXCIpXCIpIDogXCJcIi5jb25jYXQoaXRlbS5tb2R1bGVOYW1lKSA6IFwiXCI7XG4gICAgdmFyIGxvYyA9IGl0ZW0ubG9jO1xuICAgIGhlYWRlciArPSBcIlwiLmNvbmNhdChtb2R1bGVOYW1lIHx8IGZpbGUgPyBcIiBpbiBcIi5jb25jYXQobW9kdWxlTmFtZSA/IFwiXCIuY29uY2F0KG1vZHVsZU5hbWUpLmNvbmNhdChmaWxlID8gXCIgKFwiLmNvbmNhdChmaWxlLCBcIilcIikgOiBcIlwiKSA6IGZpbGUpLmNvbmNhdChsb2MgPyBcIiBcIi5jb25jYXQobG9jKSA6IFwiXCIpIDogXCJcIik7XG4gICAgYm9keSArPSBpdGVtLm1lc3NhZ2UgfHwgXCJcIjtcbiAgfVxuICBpZiAoQXJyYXkuaXNBcnJheShpdGVtLnN0YWNrKSkge1xuICAgIGl0ZW0uc3RhY2suZm9yRWFjaChmdW5jdGlvbiAoc3RhY2spIHtcbiAgICAgIGlmICh0eXBlb2Ygc3RhY2sgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgYm9keSArPSBcIlxcclxcblwiLmNvbmNhdChzdGFjayk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIHtcbiAgICBoZWFkZXI6IGhlYWRlcixcbiAgICBib2R5OiBib2R5XG4gIH07XG59XG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gQ3JlYXRlT3ZlcmxheU9wdGlvbnNcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nIHwgbnVsbH0gdHJ1c3RlZFR5cGVzUG9saWN5TmFtZVxuICogQHByb3BlcnR5IHtib29sZWFuIHwgKGVycm9yOiBFcnJvcikgPT4gdm9pZH0gW2NhdGNoUnVudGltZUVycm9yXVxuICovXG5cbi8qKlxuICpcbiAqIEBwYXJhbSB7Q3JlYXRlT3ZlcmxheU9wdGlvbnN9IG9wdGlvbnNcbiAqL1xudmFyIGNyZWF0ZU92ZXJsYXkgPSBmdW5jdGlvbiBjcmVhdGVPdmVybGF5KG9wdGlvbnMpIHtcbiAgLyoqIEB0eXBlIHtIVE1MSUZyYW1lRWxlbWVudCB8IG51bGwgfCB1bmRlZmluZWR9ICovXG4gIHZhciBpZnJhbWVDb250YWluZXJFbGVtZW50O1xuICAvKiogQHR5cGUge0hUTUxEaXZFbGVtZW50IHwgbnVsbCB8IHVuZGVmaW5lZH0gKi9cbiAgdmFyIGNvbnRhaW5lckVsZW1lbnQ7XG4gIC8qKiBAdHlwZSB7SFRNTERpdkVsZW1lbnQgfCBudWxsIHwgdW5kZWZpbmVkfSAqL1xuICB2YXIgaGVhZGVyRWxlbWVudDtcbiAgLyoqIEB0eXBlIHtBcnJheTwoZWxlbWVudDogSFRNTERpdkVsZW1lbnQpID0+IHZvaWQ+fSAqL1xuICB2YXIgb25Mb2FkUXVldWUgPSBbXTtcbiAgLyoqIEB0eXBlIHtUcnVzdGVkVHlwZVBvbGljeSB8IHVuZGVmaW5lZH0gKi9cbiAgdmFyIG92ZXJsYXlUcnVzdGVkVHlwZXNQb2xpY3k7XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAgICogQHBhcmFtIHtDU1NTdHlsZURlY2xhcmF0aW9ufSBzdHlsZVxuICAgKi9cbiAgZnVuY3Rpb24gYXBwbHlTdHlsZShlbGVtZW50LCBzdHlsZSkge1xuICAgIE9iamVjdC5rZXlzKHN0eWxlKS5mb3JFYWNoKGZ1bmN0aW9uIChwcm9wKSB7XG4gICAgICBlbGVtZW50LnN0eWxlW3Byb3BdID0gc3R5bGVbcHJvcF07XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmcgfCBudWxsfSB0cnVzdGVkVHlwZXNQb2xpY3lOYW1lXG4gICAqL1xuICBmdW5jdGlvbiBjcmVhdGVDb250YWluZXIodHJ1c3RlZFR5cGVzUG9saWN5TmFtZSkge1xuICAgIC8vIEVuYWJsZSBUcnVzdGVkIFR5cGVzIGlmIHRoZXkgYXJlIGF2YWlsYWJsZSBpbiB0aGUgY3VycmVudCBicm93c2VyLlxuICAgIGlmICh3aW5kb3cudHJ1c3RlZFR5cGVzKSB7XG4gICAgICBvdmVybGF5VHJ1c3RlZFR5cGVzUG9saWN5ID0gd2luZG93LnRydXN0ZWRUeXBlcy5jcmVhdGVQb2xpY3kodHJ1c3RlZFR5cGVzUG9saWN5TmFtZSB8fCBcIndlYnBhY2stZGV2LXNlcnZlciNvdmVybGF5XCIsIHtcbiAgICAgICAgY3JlYXRlSFRNTDogZnVuY3Rpb24gY3JlYXRlSFRNTCh2YWx1ZSkge1xuICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlmcmFtZUNvbnRhaW5lckVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaWZyYW1lXCIpO1xuICAgIGlmcmFtZUNvbnRhaW5lckVsZW1lbnQuaWQgPSBcIndlYnBhY2stZGV2LXNlcnZlci1jbGllbnQtb3ZlcmxheVwiO1xuICAgIGlmcmFtZUNvbnRhaW5lckVsZW1lbnQuc3JjID0gXCJhYm91dDpibGFua1wiO1xuICAgIGFwcGx5U3R5bGUoaWZyYW1lQ29udGFpbmVyRWxlbWVudCwgaWZyYW1lU3R5bGUpO1xuICAgIGlmcmFtZUNvbnRhaW5lckVsZW1lbnQub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGNvbnRlbnRFbGVtZW50ID0gLyoqIEB0eXBlIHtEb2N1bWVudH0gKi9cbiAgICAgIC8qKiBAdHlwZSB7SFRNTElGcmFtZUVsZW1lbnR9ICovXG4gICAgICBpZnJhbWVDb250YWluZXJFbGVtZW50LmNvbnRlbnREb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgY29udGFpbmVyRWxlbWVudCA9IC8qKiBAdHlwZSB7RG9jdW1lbnR9ICovXG4gICAgICAvKiogQHR5cGUge0hUTUxJRnJhbWVFbGVtZW50fSAqL1xuICAgICAgaWZyYW1lQ29udGFpbmVyRWxlbWVudC5jb250ZW50RG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGNvbnRlbnRFbGVtZW50LmlkID0gXCJ3ZWJwYWNrLWRldi1zZXJ2ZXItY2xpZW50LW92ZXJsYXktZGl2XCI7XG4gICAgICBhcHBseVN0eWxlKGNvbnRlbnRFbGVtZW50LCBjb250YWluZXJTdHlsZSk7XG4gICAgICBoZWFkZXJFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGhlYWRlckVsZW1lbnQuaW5uZXJUZXh0ID0gXCJDb21waWxlZCB3aXRoIHByb2JsZW1zOlwiO1xuICAgICAgYXBwbHlTdHlsZShoZWFkZXJFbGVtZW50LCBoZWFkZXJTdHlsZSk7XG4gICAgICB2YXIgY2xvc2VCdXR0b25FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgIGFwcGx5U3R5bGUoY2xvc2VCdXR0b25FbGVtZW50LCBkaXNtaXNzQnV0dG9uU3R5bGUpO1xuICAgICAgY2xvc2VCdXR0b25FbGVtZW50LmlubmVyVGV4dCA9IFwiw5dcIjtcbiAgICAgIGNsb3NlQnV0dG9uRWxlbWVudC5hcmlhTGFiZWwgPSBcIkRpc21pc3NcIjtcbiAgICAgIGNsb3NlQnV0dG9uRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdXNlLWJlZm9yZS1kZWZpbmVcbiAgICAgICAgb3ZlcmxheVNlcnZpY2Uuc2VuZCh7XG4gICAgICAgICAgdHlwZTogXCJESVNNSVNTXCJcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIGNvbnRlbnRFbGVtZW50LmFwcGVuZENoaWxkKGhlYWRlckVsZW1lbnQpO1xuICAgICAgY29udGVudEVsZW1lbnQuYXBwZW5kQ2hpbGQoY2xvc2VCdXR0b25FbGVtZW50KTtcbiAgICAgIGNvbnRlbnRFbGVtZW50LmFwcGVuZENoaWxkKGNvbnRhaW5lckVsZW1lbnQpO1xuXG4gICAgICAvKiogQHR5cGUge0RvY3VtZW50fSAqL1xuICAgICAgLyoqIEB0eXBlIHtIVE1MSUZyYW1lRWxlbWVudH0gKi9cbiAgICAgIGlmcmFtZUNvbnRhaW5lckVsZW1lbnQuY29udGVudERvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY29udGVudEVsZW1lbnQpO1xuICAgICAgb25Mb2FkUXVldWUuZm9yRWFjaChmdW5jdGlvbiAob25Mb2FkKSB7XG4gICAgICAgIG9uTG9hZCggLyoqIEB0eXBlIHtIVE1MRGl2RWxlbWVudH0gKi9jb250ZW50RWxlbWVudCk7XG4gICAgICB9KTtcbiAgICAgIG9uTG9hZFF1ZXVlID0gW107XG5cbiAgICAgIC8qKiBAdHlwZSB7SFRNTElGcmFtZUVsZW1lbnR9ICovXG4gICAgICBpZnJhbWVDb250YWluZXJFbGVtZW50Lm9ubG9hZCA9IG51bGw7XG4gICAgfTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGlmcmFtZUNvbnRhaW5lckVsZW1lbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7KGVsZW1lbnQ6IEhUTUxEaXZFbGVtZW50KSA9PiB2b2lkfSBjYWxsYmFja1xuICAgKiBAcGFyYW0ge3N0cmluZyB8IG51bGx9IHRydXN0ZWRUeXBlc1BvbGljeU5hbWVcbiAgICovXG4gIGZ1bmN0aW9uIGVuc3VyZU92ZXJsYXlFeGlzdHMoY2FsbGJhY2ssIHRydXN0ZWRUeXBlc1BvbGljeU5hbWUpIHtcbiAgICBpZiAoY29udGFpbmVyRWxlbWVudCkge1xuICAgICAgY29udGFpbmVyRWxlbWVudC5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgLy8gRXZlcnl0aGluZyBpcyByZWFkeSwgY2FsbCB0aGUgY2FsbGJhY2sgcmlnaHQgYXdheS5cbiAgICAgIGNhbGxiYWNrKGNvbnRhaW5lckVsZW1lbnQpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBvbkxvYWRRdWV1ZS5wdXNoKGNhbGxiYWNrKTtcbiAgICBpZiAoaWZyYW1lQ29udGFpbmVyRWxlbWVudCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjcmVhdGVDb250YWluZXIodHJ1c3RlZFR5cGVzUG9saWN5TmFtZSk7XG4gIH1cblxuICAvLyBTdWNjZXNzZnVsIGNvbXBpbGF0aW9uLlxuICBmdW5jdGlvbiBoaWRlKCkge1xuICAgIGlmICghaWZyYW1lQ29udGFpbmVyRWxlbWVudCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIENsZWFuIHVwIGFuZCByZXNldCBpbnRlcm5hbCBzdGF0ZS5cbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGlmcmFtZUNvbnRhaW5lckVsZW1lbnQpO1xuICAgIGlmcmFtZUNvbnRhaW5lckVsZW1lbnQgPSBudWxsO1xuICAgIGNvbnRhaW5lckVsZW1lbnQgPSBudWxsO1xuICB9XG5cbiAgLy8gQ29tcGlsYXRpb24gd2l0aCBlcnJvcnMgKGUuZy4gc3ludGF4IGVycm9yIG9yIG1pc3NpbmcgbW9kdWxlcykuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICAgKiBAcGFyYW0ge0FycmF5PHN0cmluZyAgfCB7IG1vZHVsZUlkZW50aWZpZXI/OiBzdHJpbmcsIG1vZHVsZU5hbWU/OiBzdHJpbmcsIGxvYz86IHN0cmluZywgbWVzc2FnZT86IHN0cmluZyB9Pn0gbWVzc2FnZXNcbiAgICogQHBhcmFtIHtzdHJpbmcgfCBudWxsfSB0cnVzdGVkVHlwZXNQb2xpY3lOYW1lXG4gICAqIEBwYXJhbSB7J2J1aWxkJyB8ICdydW50aW1lJ30gbWVzc2FnZVNvdXJjZVxuICAgKi9cbiAgZnVuY3Rpb24gc2hvdyh0eXBlLCBtZXNzYWdlcywgdHJ1c3RlZFR5cGVzUG9saWN5TmFtZSwgbWVzc2FnZVNvdXJjZSkge1xuICAgIGVuc3VyZU92ZXJsYXlFeGlzdHMoZnVuY3Rpb24gKCkge1xuICAgICAgaGVhZGVyRWxlbWVudC5pbm5lclRleHQgPSBtZXNzYWdlU291cmNlID09PSBcInJ1bnRpbWVcIiA/IFwiVW5jYXVnaHQgcnVudGltZSBlcnJvcnM6XCIgOiBcIkNvbXBpbGVkIHdpdGggcHJvYmxlbXM6XCI7XG4gICAgICBtZXNzYWdlcy5mb3JFYWNoKGZ1bmN0aW9uIChtZXNzYWdlKSB7XG4gICAgICAgIHZhciBlbnRyeUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICB2YXIgbXNnU3R5bGUgPSB0eXBlID09PSBcIndhcm5pbmdcIiA/IG1zZ1N0eWxlcy53YXJuaW5nIDogbXNnU3R5bGVzLmVycm9yO1xuICAgICAgICBhcHBseVN0eWxlKGVudHJ5RWxlbWVudCwgX29iamVjdFNwcmVhZChfb2JqZWN0U3ByZWFkKHt9LCBtc2dTdHlsZSksIHt9LCB7XG4gICAgICAgICAgcGFkZGluZzogXCIxcmVtIDFyZW0gMS41cmVtIDFyZW1cIlxuICAgICAgICB9KSk7XG4gICAgICAgIHZhciB0eXBlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHZhciBfZm9ybWF0UHJvYmxlbSA9IGZvcm1hdFByb2JsZW0odHlwZSwgbWVzc2FnZSksXG4gICAgICAgICAgaGVhZGVyID0gX2Zvcm1hdFByb2JsZW0uaGVhZGVyLFxuICAgICAgICAgIGJvZHkgPSBfZm9ybWF0UHJvYmxlbS5ib2R5O1xuICAgICAgICB0eXBlRWxlbWVudC5pbm5lclRleHQgPSBoZWFkZXI7XG4gICAgICAgIGFwcGx5U3R5bGUodHlwZUVsZW1lbnQsIG1zZ1R5cGVTdHlsZSk7XG4gICAgICAgIGlmIChtZXNzYWdlLm1vZHVsZUlkZW50aWZpZXIpIHtcbiAgICAgICAgICBhcHBseVN0eWxlKHR5cGVFbGVtZW50LCB7XG4gICAgICAgICAgICBjdXJzb3I6IFwicG9pbnRlclwiXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgLy8gZWxlbWVudC5kYXRhc2V0IG5vdCBzdXBwb3J0ZWQgaW4gSUVcbiAgICAgICAgICB0eXBlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJkYXRhLWNhbi1vcGVuXCIsIHRydWUpO1xuICAgICAgICAgIHR5cGVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBmZXRjaChcIi93ZWJwYWNrLWRldi1zZXJ2ZXIvb3Blbi1lZGl0b3I/ZmlsZU5hbWU9XCIuY29uY2F0KG1lc3NhZ2UubW9kdWxlSWRlbnRpZmllcikpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gTWFrZSBpdCBsb29rIHNpbWlsYXIgdG8gb3VyIHRlcm1pbmFsLlxuICAgICAgICB2YXIgdGV4dCA9IGFuc2lIVE1MKGVuY29kZShib2R5KSk7XG4gICAgICAgIHZhciBtZXNzYWdlVGV4dE5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBhcHBseVN0eWxlKG1lc3NhZ2VUZXh0Tm9kZSwgbXNnVGV4dFN0eWxlKTtcbiAgICAgICAgbWVzc2FnZVRleHROb2RlLmlubmVySFRNTCA9IG92ZXJsYXlUcnVzdGVkVHlwZXNQb2xpY3kgPyBvdmVybGF5VHJ1c3RlZFR5cGVzUG9saWN5LmNyZWF0ZUhUTUwodGV4dCkgOiB0ZXh0O1xuICAgICAgICBlbnRyeUVsZW1lbnQuYXBwZW5kQ2hpbGQodHlwZUVsZW1lbnQpO1xuICAgICAgICBlbnRyeUVsZW1lbnQuYXBwZW5kQ2hpbGQobWVzc2FnZVRleHROb2RlKTtcblxuICAgICAgICAvKiogQHR5cGUge0hUTUxEaXZFbGVtZW50fSAqL1xuICAgICAgICBjb250YWluZXJFbGVtZW50LmFwcGVuZENoaWxkKGVudHJ5RWxlbWVudCk7XG4gICAgICB9KTtcbiAgICB9LCB0cnVzdGVkVHlwZXNQb2xpY3lOYW1lKTtcbiAgfVxuICB2YXIgb3ZlcmxheVNlcnZpY2UgPSBjcmVhdGVPdmVybGF5TWFjaGluZSh7XG4gICAgc2hvd092ZXJsYXk6IGZ1bmN0aW9uIHNob3dPdmVybGF5KF9yZWYpIHtcbiAgICAgIHZhciBfcmVmJGxldmVsID0gX3JlZi5sZXZlbCxcbiAgICAgICAgbGV2ZWwgPSBfcmVmJGxldmVsID09PSB2b2lkIDAgPyBcImVycm9yXCIgOiBfcmVmJGxldmVsLFxuICAgICAgICBtZXNzYWdlcyA9IF9yZWYubWVzc2FnZXMsXG4gICAgICAgIG1lc3NhZ2VTb3VyY2UgPSBfcmVmLm1lc3NhZ2VTb3VyY2U7XG4gICAgICByZXR1cm4gc2hvdyhsZXZlbCwgbWVzc2FnZXMsIG9wdGlvbnMudHJ1c3RlZFR5cGVzUG9saWN5TmFtZSwgbWVzc2FnZVNvdXJjZSk7XG4gICAgfSxcbiAgICBoaWRlT3ZlcmxheTogaGlkZVxuICB9KTtcbiAgaWYgKG9wdGlvbnMuY2F0Y2hSdW50aW1lRXJyb3IpIHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge0Vycm9yIHwgdW5kZWZpbmVkfSBlcnJvclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBmYWxsYmFja01lc3NhZ2VcbiAgICAgKi9cbiAgICB2YXIgaGFuZGxlRXJyb3IgPSBmdW5jdGlvbiBoYW5kbGVFcnJvcihlcnJvciwgZmFsbGJhY2tNZXNzYWdlKSB7XG4gICAgICB2YXIgZXJyb3JPYmplY3QgPSBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IgOiBuZXcgRXJyb3IoZXJyb3IgfHwgZmFsbGJhY2tNZXNzYWdlKTtcbiAgICAgIHZhciBzaG91bGREaXNwbGF5ID0gdHlwZW9mIG9wdGlvbnMuY2F0Y2hSdW50aW1lRXJyb3IgPT09IFwiZnVuY3Rpb25cIiA/IG9wdGlvbnMuY2F0Y2hSdW50aW1lRXJyb3IoZXJyb3JPYmplY3QpIDogdHJ1ZTtcbiAgICAgIGlmIChzaG91bGREaXNwbGF5KSB7XG4gICAgICAgIG92ZXJsYXlTZXJ2aWNlLnNlbmQoe1xuICAgICAgICAgIHR5cGU6IFwiUlVOVElNRV9FUlJPUlwiLFxuICAgICAgICAgIG1lc3NhZ2VzOiBbe1xuICAgICAgICAgICAgbWVzc2FnZTogZXJyb3JPYmplY3QubWVzc2FnZSxcbiAgICAgICAgICAgIHN0YWNrOiBwYXJzZUVycm9yVG9TdGFja3MoZXJyb3JPYmplY3QpXG4gICAgICAgICAgfV1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgICBsaXN0ZW5Ub1J1bnRpbWVFcnJvcihmdW5jdGlvbiAoZXJyb3JFdmVudCkge1xuICAgICAgLy8gZXJyb3IgcHJvcGVydHkgbWF5IGJlIGVtcHR5IGluIG9sZGVyIGJyb3dzZXIgbGlrZSBJRVxuICAgICAgdmFyIGVycm9yID0gZXJyb3JFdmVudC5lcnJvcixcbiAgICAgICAgbWVzc2FnZSA9IGVycm9yRXZlbnQubWVzc2FnZTtcbiAgICAgIGlmICghZXJyb3IgJiYgIW1lc3NhZ2UpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaGFuZGxlRXJyb3IoZXJyb3IsIG1lc3NhZ2UpO1xuICAgIH0pO1xuICAgIGxpc3RlblRvVW5oYW5kbGVkUmVqZWN0aW9uKGZ1bmN0aW9uIChwcm9taXNlUmVqZWN0aW9uRXZlbnQpIHtcbiAgICAgIHZhciByZWFzb24gPSBwcm9taXNlUmVqZWN0aW9uRXZlbnQucmVhc29uO1xuICAgICAgaGFuZGxlRXJyb3IocmVhc29uLCBcIlVua25vd24gcHJvbWlzZSByZWplY3Rpb24gcmVhc29uXCIpO1xuICAgIH0pO1xuICB9XG4gIHJldHVybiBvdmVybGF5U2VydmljZTtcbn07XG5leHBvcnQgeyBmb3JtYXRQcm9ibGVtLCBjcmVhdGVPdmVybGF5IH07IiwiZnVuY3Rpb24gb3duS2V5cyhvYmplY3QsIGVudW1lcmFibGVPbmx5KSB7IHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqZWN0KTsgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHsgdmFyIHN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKG9iamVjdCk7IGVudW1lcmFibGVPbmx5ICYmIChzeW1ib2xzID0gc3ltYm9scy5maWx0ZXIoZnVuY3Rpb24gKHN5bSkgeyByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHN5bSkuZW51bWVyYWJsZTsgfSkpLCBrZXlzLnB1c2guYXBwbHkoa2V5cywgc3ltYm9scyk7IH0gcmV0dXJuIGtleXM7IH1cbmZ1bmN0aW9uIF9vYmplY3RTcHJlYWQodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBudWxsICE9IGFyZ3VtZW50c1tpXSA/IGFyZ3VtZW50c1tpXSA6IHt9OyBpICUgMiA/IG93bktleXMoT2JqZWN0KHNvdXJjZSksICEwKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHsgX2RlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBzb3VyY2Vba2V5XSk7IH0pIDogT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMgPyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKHNvdXJjZSkpIDogb3duS2V5cyhPYmplY3Qoc291cmNlKSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIGtleSkpOyB9KTsgfSByZXR1cm4gdGFyZ2V0OyB9XG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7IGtleSA9IF90b1Byb3BlcnR5S2V5KGtleSk7IGlmIChrZXkgaW4gb2JqKSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgeyB2YWx1ZTogdmFsdWUsIGVudW1lcmFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSwgd3JpdGFibGU6IHRydWUgfSk7IH0gZWxzZSB7IG9ialtrZXldID0gdmFsdWU7IH0gcmV0dXJuIG9iajsgfVxuZnVuY3Rpb24gX3RvUHJvcGVydHlLZXkoYXJnKSB7IHZhciBrZXkgPSBfdG9QcmltaXRpdmUoYXJnLCBcInN0cmluZ1wiKTsgcmV0dXJuIHR5cGVvZiBrZXkgPT09IFwic3ltYm9sXCIgPyBrZXkgOiBTdHJpbmcoa2V5KTsgfVxuZnVuY3Rpb24gX3RvUHJpbWl0aXZlKGlucHV0LCBoaW50KSB7IGlmICh0eXBlb2YgaW5wdXQgIT09IFwib2JqZWN0XCIgfHwgaW5wdXQgPT09IG51bGwpIHJldHVybiBpbnB1dDsgdmFyIHByaW0gPSBpbnB1dFtTeW1ib2wudG9QcmltaXRpdmVdOyBpZiAocHJpbSAhPT0gdW5kZWZpbmVkKSB7IHZhciByZXMgPSBwcmltLmNhbGwoaW5wdXQsIGhpbnQgfHwgXCJkZWZhdWx0XCIpOyBpZiAodHlwZW9mIHJlcyAhPT0gXCJvYmplY3RcIikgcmV0dXJuIHJlczsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkBAdG9QcmltaXRpdmUgbXVzdCByZXR1cm4gYSBwcmltaXRpdmUgdmFsdWUuXCIpOyB9IHJldHVybiAoaGludCA9PT0gXCJzdHJpbmdcIiA/IFN0cmluZyA6IE51bWJlcikoaW5wdXQpOyB9XG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IFN0YXRlRGVmaW5pdGlvbnNcbiAqIEBwcm9wZXJ0eSB7e1tldmVudDogc3RyaW5nXTogeyB0YXJnZXQ6IHN0cmluZzsgYWN0aW9ucz86IEFycmF5PHN0cmluZz4gfX19IFtvbl1cbiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IE9wdGlvbnNcbiAqIEBwcm9wZXJ0eSB7e1tzdGF0ZTogc3RyaW5nXTogU3RhdGVEZWZpbml0aW9uc319IHN0YXRlc1xuICogQHByb3BlcnR5IHtvYmplY3R9IGNvbnRleHQ7XG4gKiBAcHJvcGVydHkge3N0cmluZ30gaW5pdGlhbFxuICovXG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gSW1wbGVtZW50YXRpb25cbiAqIEBwcm9wZXJ0eSB7e1thY3Rpb25OYW1lOiBzdHJpbmddOiAoY3R4OiBvYmplY3QsIGV2ZW50OiBhbnkpID0+IG9iamVjdH19IGFjdGlvbnNcbiAqL1xuXG4vKipcbiAqIEEgc2ltcGxpZmllZCBgY3JlYXRlTWFjaGluZWAgZnJvbSBgQHhzdGF0ZS9mc21gIHdpdGggdGhlIGZvbGxvd2luZyBkaWZmZXJlbmNlczpcbiAqXG4gKiAgLSB0aGUgcmV0dXJuZWQgbWFjaGluZSBpcyB0ZWNobmljYWxseSBhIFwic2VydmljZVwiLiBObyBgaW50ZXJwcmV0KG1hY2hpbmUpLnN0YXJ0KClgIGlzIG5lZWRlZC5cbiAqICAtIHRoZSBzdGF0ZSBkZWZpbml0aW9uIG9ubHkgc3VwcG9ydCBgb25gIGFuZCB0YXJnZXQgbXVzdCBiZSBkZWNsYXJlZCB3aXRoIHsgdGFyZ2V0OiAnbmV4dFN0YXRlJywgYWN0aW9uczogW10gfSBleHBsaWNpdGx5LlxuICogIC0gZXZlbnQgcGFzc2VkIHRvIGBzZW5kYCBtdXN0IGJlIGFuIG9iamVjdCB3aXRoIGB0eXBlYCBwcm9wZXJ0eS5cbiAqICAtIGFjdGlvbnMgaW1wbGVtZW50YXRpb24gd2lsbCBiZSBbYXNzaWduIGFjdGlvbl0oaHR0cHM6Ly94c3RhdGUuanMub3JnL2RvY3MvZ3VpZGVzL2NvbnRleHQuaHRtbCNhc3NpZ24tYWN0aW9uKSBpZiB5b3UgcmV0dXJuIGFueSB2YWx1ZS5cbiAqICBEbyBub3QgcmV0dXJuIGFueXRoaW5nIGlmIHlvdSBqdXN0IHdhbnQgdG8gaW52b2tlIHNpZGUgZWZmZWN0LlxuICpcbiAqIFRoZSBnb2FsIG9mIHRoaXMgY3VzdG9tIGZ1bmN0aW9uIGlzIHRvIGF2b2lkIGluc3RhbGxpbmcgdGhlIGVudGlyZSBgJ3hzdGF0ZS9mc20nYCBwYWNrYWdlLCB3aGlsZSBlbmFibGluZyBtb2RlbGluZyB1c2luZ1xuICogc3RhdGUgbWFjaGluZS4gWW91IGNhbiBjb3B5IHRoZSBmaXJzdCBwYXJhbWV0ZXIgaW50byB0aGUgZWRpdG9yIGF0IGh0dHBzOi8vc3RhdGVseS5haS92aXogdG8gdmlzdWFsaXplIHRoZSBzdGF0ZSBtYWNoaW5lLlxuICpcbiAqIEBwYXJhbSB7T3B0aW9uc30gb3B0aW9uc1xuICogQHBhcmFtIHtJbXBsZW1lbnRhdGlvbn0gaW1wbGVtZW50YXRpb25cbiAqL1xuZnVuY3Rpb24gY3JlYXRlTWFjaGluZShfcmVmLCBfcmVmMikge1xuICB2YXIgc3RhdGVzID0gX3JlZi5zdGF0ZXMsXG4gICAgY29udGV4dCA9IF9yZWYuY29udGV4dCxcbiAgICBpbml0aWFsID0gX3JlZi5pbml0aWFsO1xuICB2YXIgYWN0aW9ucyA9IF9yZWYyLmFjdGlvbnM7XG4gIHZhciBjdXJyZW50U3RhdGUgPSBpbml0aWFsO1xuICB2YXIgY3VycmVudENvbnRleHQgPSBjb250ZXh0O1xuICByZXR1cm4ge1xuICAgIHNlbmQ6IGZ1bmN0aW9uIHNlbmQoZXZlbnQpIHtcbiAgICAgIHZhciBjdXJyZW50U3RhdGVPbiA9IHN0YXRlc1tjdXJyZW50U3RhdGVdLm9uO1xuICAgICAgdmFyIHRyYW5zaXRpb25Db25maWcgPSBjdXJyZW50U3RhdGVPbiAmJiBjdXJyZW50U3RhdGVPbltldmVudC50eXBlXTtcbiAgICAgIGlmICh0cmFuc2l0aW9uQ29uZmlnKSB7XG4gICAgICAgIGN1cnJlbnRTdGF0ZSA9IHRyYW5zaXRpb25Db25maWcudGFyZ2V0O1xuICAgICAgICBpZiAodHJhbnNpdGlvbkNvbmZpZy5hY3Rpb25zKSB7XG4gICAgICAgICAgdHJhbnNpdGlvbkNvbmZpZy5hY3Rpb25zLmZvckVhY2goZnVuY3Rpb24gKGFjdE5hbWUpIHtcbiAgICAgICAgICAgIHZhciBhY3Rpb25JbXBsID0gYWN0aW9uc1thY3ROYW1lXTtcbiAgICAgICAgICAgIHZhciBuZXh0Q29udGV4dFZhbHVlID0gYWN0aW9uSW1wbCAmJiBhY3Rpb25JbXBsKGN1cnJlbnRDb250ZXh0LCBldmVudCk7XG4gICAgICAgICAgICBpZiAobmV4dENvbnRleHRWYWx1ZSkge1xuICAgICAgICAgICAgICBjdXJyZW50Q29udGV4dCA9IF9vYmplY3RTcHJlYWQoX29iamVjdFNwcmVhZCh7fSwgY3VycmVudENvbnRleHQpLCBuZXh0Q29udGV4dFZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcbn1cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZU1hY2hpbmU7IiwiLyoqXG4gKlxuICogQHBhcmFtIHtFcnJvcn0gZXJyb3JcbiAqL1xuZnVuY3Rpb24gcGFyc2VFcnJvclRvU3RhY2tzKGVycm9yKSB7XG4gIGlmICghZXJyb3IgfHwgIShlcnJvciBpbnN0YW5jZW9mIEVycm9yKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcInBhcnNlRXJyb3JUb1N0YWNrcyBleHBlY3RzIEVycm9yIG9iamVjdFwiKTtcbiAgfVxuICBpZiAodHlwZW9mIGVycm9yLnN0YWNrID09PSBcInN0cmluZ1wiKSB7XG4gICAgcmV0dXJuIGVycm9yLnN0YWNrLnNwbGl0KFwiXFxuXCIpLmZpbHRlcihmdW5jdGlvbiAoc3RhY2spIHtcbiAgICAgIHJldHVybiBzdGFjayAhPT0gXCJFcnJvcjogXCIuY29uY2F0KGVycm9yLm1lc3NhZ2UpO1xuICAgIH0pO1xuICB9XG59XG5cbi8qKlxuICogQGNhbGxiYWNrIEVycm9yQ2FsbGJhY2tcbiAqIEBwYXJhbSB7RXJyb3JFdmVudH0gZXJyb3JcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5cbi8qKlxuICogQHBhcmFtIHtFcnJvckNhbGxiYWNrfSBjYWxsYmFja1xuICovXG5mdW5jdGlvbiBsaXN0ZW5Ub1J1bnRpbWVFcnJvcihjYWxsYmFjaykge1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsIGNhbGxiYWNrKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIGNsZWFudXAoKSB7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLCBjYWxsYmFjayk7XG4gIH07XG59XG5cbi8qKlxuICogQGNhbGxiYWNrIFVuaGFuZGxlZFJlamVjdGlvbkNhbGxiYWNrXG4gKiBAcGFyYW0ge1Byb21pc2VSZWplY3Rpb25FdmVudH0gcmVqZWN0aW9uRXZlbnRcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5cbi8qKlxuICogQHBhcmFtIHtVbmhhbmRsZWRSZWplY3Rpb25DYWxsYmFja30gY2FsbGJhY2tcbiAqL1xuZnVuY3Rpb24gbGlzdGVuVG9VbmhhbmRsZWRSZWplY3Rpb24oY2FsbGJhY2spIHtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJ1bmhhbmRsZWRyZWplY3Rpb25cIiwgY2FsbGJhY2spO1xuICByZXR1cm4gZnVuY3Rpb24gY2xlYW51cCgpIHtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInVuaGFuZGxlZHJlamVjdGlvblwiLCBjYWxsYmFjayk7XG4gIH07XG59XG5leHBvcnQgeyBsaXN0ZW5Ub1J1bnRpbWVFcnJvciwgbGlzdGVuVG9VbmhhbmRsZWRSZWplY3Rpb24sIHBhcnNlRXJyb3JUb1N0YWNrcyB9OyIsImltcG9ydCBjcmVhdGVNYWNoaW5lIGZyb20gXCIuL2ZzbS5qc1wiO1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IFNob3dPdmVybGF5RGF0YVxuICogQHByb3BlcnR5IHsnd2FybmluZycgfCAnZXJyb3InfSBsZXZlbFxuICogQHByb3BlcnR5IHtBcnJheTxzdHJpbmcgIHwgeyBtb2R1bGVJZGVudGlmaWVyPzogc3RyaW5nLCBtb2R1bGVOYW1lPzogc3RyaW5nLCBsb2M/OiBzdHJpbmcsIG1lc3NhZ2U/OiBzdHJpbmcgfT59IG1lc3NhZ2VzXG4gKiBAcHJvcGVydHkgeydidWlsZCcgfCAncnVudGltZSd9IG1lc3NhZ2VTb3VyY2VcbiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IENyZWF0ZU92ZXJsYXlNYWNoaW5lT3B0aW9uc1xuICogQHByb3BlcnR5IHsoZGF0YTogU2hvd092ZXJsYXlEYXRhKSA9PiB2b2lkfSBzaG93T3ZlcmxheVxuICogQHByb3BlcnR5IHsoKSA9PiB2b2lkfSBoaWRlT3ZlcmxheVxuICovXG5cbi8qKlxuICogQHBhcmFtIHtDcmVhdGVPdmVybGF5TWFjaGluZU9wdGlvbnN9IG9wdGlvbnNcbiAqL1xudmFyIGNyZWF0ZU92ZXJsYXlNYWNoaW5lID0gZnVuY3Rpb24gY3JlYXRlT3ZlcmxheU1hY2hpbmUob3B0aW9ucykge1xuICB2YXIgaGlkZU92ZXJsYXkgPSBvcHRpb25zLmhpZGVPdmVybGF5LFxuICAgIHNob3dPdmVybGF5ID0gb3B0aW9ucy5zaG93T3ZlcmxheTtcbiAgdmFyIG92ZXJsYXlNYWNoaW5lID0gY3JlYXRlTWFjaGluZSh7XG4gICAgaW5pdGlhbDogXCJoaWRkZW5cIixcbiAgICBjb250ZXh0OiB7XG4gICAgICBsZXZlbDogXCJlcnJvclwiLFxuICAgICAgbWVzc2FnZXM6IFtdLFxuICAgICAgbWVzc2FnZVNvdXJjZTogXCJidWlsZFwiXG4gICAgfSxcbiAgICBzdGF0ZXM6IHtcbiAgICAgIGhpZGRlbjoge1xuICAgICAgICBvbjoge1xuICAgICAgICAgIEJVSUxEX0VSUk9SOiB7XG4gICAgICAgICAgICB0YXJnZXQ6IFwiZGlzcGxheUJ1aWxkRXJyb3JcIixcbiAgICAgICAgICAgIGFjdGlvbnM6IFtcInNldE1lc3NhZ2VzXCIsIFwic2hvd092ZXJsYXlcIl1cbiAgICAgICAgICB9LFxuICAgICAgICAgIFJVTlRJTUVfRVJST1I6IHtcbiAgICAgICAgICAgIHRhcmdldDogXCJkaXNwbGF5UnVudGltZUVycm9yXCIsXG4gICAgICAgICAgICBhY3Rpb25zOiBbXCJzZXRNZXNzYWdlc1wiLCBcInNob3dPdmVybGF5XCJdXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZGlzcGxheUJ1aWxkRXJyb3I6IHtcbiAgICAgICAgb246IHtcbiAgICAgICAgICBESVNNSVNTOiB7XG4gICAgICAgICAgICB0YXJnZXQ6IFwiaGlkZGVuXCIsXG4gICAgICAgICAgICBhY3Rpb25zOiBbXCJkaXNtaXNzTWVzc2FnZXNcIiwgXCJoaWRlT3ZlcmxheVwiXVxuICAgICAgICAgIH0sXG4gICAgICAgICAgQlVJTERfRVJST1I6IHtcbiAgICAgICAgICAgIHRhcmdldDogXCJkaXNwbGF5QnVpbGRFcnJvclwiLFxuICAgICAgICAgICAgYWN0aW9uczogW1wiYXBwZW5kTWVzc2FnZXNcIiwgXCJzaG93T3ZlcmxheVwiXVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGRpc3BsYXlSdW50aW1lRXJyb3I6IHtcbiAgICAgICAgb246IHtcbiAgICAgICAgICBESVNNSVNTOiB7XG4gICAgICAgICAgICB0YXJnZXQ6IFwiaGlkZGVuXCIsXG4gICAgICAgICAgICBhY3Rpb25zOiBbXCJkaXNtaXNzTWVzc2FnZXNcIiwgXCJoaWRlT3ZlcmxheVwiXVxuICAgICAgICAgIH0sXG4gICAgICAgICAgUlVOVElNRV9FUlJPUjoge1xuICAgICAgICAgICAgdGFyZ2V0OiBcImRpc3BsYXlSdW50aW1lRXJyb3JcIixcbiAgICAgICAgICAgIGFjdGlvbnM6IFtcImFwcGVuZE1lc3NhZ2VzXCIsIFwic2hvd092ZXJsYXlcIl1cbiAgICAgICAgICB9LFxuICAgICAgICAgIEJVSUxEX0VSUk9SOiB7XG4gICAgICAgICAgICB0YXJnZXQ6IFwiZGlzcGxheUJ1aWxkRXJyb3JcIixcbiAgICAgICAgICAgIGFjdGlvbnM6IFtcInNldE1lc3NhZ2VzXCIsIFwic2hvd092ZXJsYXlcIl1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBhY3Rpb25zOiB7XG4gICAgICBkaXNtaXNzTWVzc2FnZXM6IGZ1bmN0aW9uIGRpc21pc3NNZXNzYWdlcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBtZXNzYWdlczogW10sXG4gICAgICAgICAgbGV2ZWw6IFwiZXJyb3JcIixcbiAgICAgICAgICBtZXNzYWdlU291cmNlOiBcImJ1aWxkXCJcbiAgICAgICAgfTtcbiAgICAgIH0sXG4gICAgICBhcHBlbmRNZXNzYWdlczogZnVuY3Rpb24gYXBwZW5kTWVzc2FnZXMoY29udGV4dCwgZXZlbnQpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBtZXNzYWdlczogY29udGV4dC5tZXNzYWdlcy5jb25jYXQoZXZlbnQubWVzc2FnZXMpLFxuICAgICAgICAgIGxldmVsOiBldmVudC5sZXZlbCB8fCBjb250ZXh0LmxldmVsLFxuICAgICAgICAgIG1lc3NhZ2VTb3VyY2U6IGV2ZW50LnR5cGUgPT09IFwiUlVOVElNRV9FUlJPUlwiID8gXCJydW50aW1lXCIgOiBcImJ1aWxkXCJcbiAgICAgICAgfTtcbiAgICAgIH0sXG4gICAgICBzZXRNZXNzYWdlczogZnVuY3Rpb24gc2V0TWVzc2FnZXMoY29udGV4dCwgZXZlbnQpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBtZXNzYWdlczogZXZlbnQubWVzc2FnZXMsXG4gICAgICAgICAgbGV2ZWw6IGV2ZW50LmxldmVsIHx8IGNvbnRleHQubGV2ZWwsXG4gICAgICAgICAgbWVzc2FnZVNvdXJjZTogZXZlbnQudHlwZSA9PT0gXCJSVU5USU1FX0VSUk9SXCIgPyBcInJ1bnRpbWVcIiA6IFwiYnVpbGRcIlxuICAgICAgICB9O1xuICAgICAgfSxcbiAgICAgIGhpZGVPdmVybGF5OiBoaWRlT3ZlcmxheSxcbiAgICAgIHNob3dPdmVybGF5OiBzaG93T3ZlcmxheVxuICAgIH1cbiAgfSk7XG4gIHJldHVybiBvdmVybGF5TWFjaGluZTtcbn07XG5leHBvcnQgZGVmYXVsdCBjcmVhdGVPdmVybGF5TWFjaGluZTsiLCIvLyBzdHlsZXMgYXJlIGluc3BpcmVkIGJ5IGByZWFjdC1lcnJvci1vdmVybGF5YFxuXG52YXIgbXNnU3R5bGVzID0ge1xuICBlcnJvcjoge1xuICAgIGJhY2tncm91bmRDb2xvcjogXCJyZ2JhKDIwNiwgMTcsIDM4LCAwLjEpXCIsXG4gICAgY29sb3I6IFwiI2ZjY2ZjZlwiXG4gIH0sXG4gIHdhcm5pbmc6IHtcbiAgICBiYWNrZ3JvdW5kQ29sb3I6IFwicmdiYSgyNTEsIDI0NSwgMTgwLCAwLjEpXCIsXG4gICAgY29sb3I6IFwiI2ZiZjViNFwiXG4gIH1cbn07XG52YXIgaWZyYW1lU3R5bGUgPSB7XG4gIHBvc2l0aW9uOiBcImZpeGVkXCIsXG4gIHRvcDogMCxcbiAgbGVmdDogMCxcbiAgcmlnaHQ6IDAsXG4gIGJvdHRvbTogMCxcbiAgd2lkdGg6IFwiMTAwdndcIixcbiAgaGVpZ2h0OiBcIjEwMHZoXCIsXG4gIGJvcmRlcjogXCJub25lXCIsXG4gIFwiei1pbmRleFwiOiA5OTk5OTk5OTk5XG59O1xudmFyIGNvbnRhaW5lclN0eWxlID0ge1xuICBwb3NpdGlvbjogXCJmaXhlZFwiLFxuICBib3hTaXppbmc6IFwiYm9yZGVyLWJveFwiLFxuICBsZWZ0OiAwLFxuICB0b3A6IDAsXG4gIHJpZ2h0OiAwLFxuICBib3R0b206IDAsXG4gIHdpZHRoOiBcIjEwMHZ3XCIsXG4gIGhlaWdodDogXCIxMDB2aFwiLFxuICBmb250U2l6ZTogXCJsYXJnZVwiLFxuICBwYWRkaW5nOiBcIjJyZW0gMnJlbSA0cmVtIDJyZW1cIixcbiAgbGluZUhlaWdodDogXCIxLjJcIixcbiAgd2hpdGVTcGFjZTogXCJwcmUtd3JhcFwiLFxuICBvdmVyZmxvdzogXCJhdXRvXCIsXG4gIGJhY2tncm91bmRDb2xvcjogXCJyZ2JhKDAsIDAsIDAsIDAuOSlcIixcbiAgY29sb3I6IFwid2hpdGVcIlxufTtcbnZhciBoZWFkZXJTdHlsZSA9IHtcbiAgY29sb3I6IFwiI2U4M2I0NlwiLFxuICBmb250U2l6ZTogXCIyZW1cIixcbiAgd2hpdGVTcGFjZTogXCJwcmUtd3JhcFwiLFxuICBmb250RmFtaWx5OiBcInNhbnMtc2VyaWZcIixcbiAgbWFyZ2luOiBcIjAgMnJlbSAycmVtIDBcIixcbiAgZmxleDogXCIwIDAgYXV0b1wiLFxuICBtYXhIZWlnaHQ6IFwiNTAlXCIsXG4gIG92ZXJmbG93OiBcImF1dG9cIlxufTtcbnZhciBkaXNtaXNzQnV0dG9uU3R5bGUgPSB7XG4gIGNvbG9yOiBcIiNmZmZmZmZcIixcbiAgbGluZUhlaWdodDogXCIxcmVtXCIsXG4gIGZvbnRTaXplOiBcIjEuNXJlbVwiLFxuICBwYWRkaW5nOiBcIjFyZW1cIixcbiAgY3Vyc29yOiBcInBvaW50ZXJcIixcbiAgcG9zaXRpb246IFwiYWJzb2x1dGVcIixcbiAgcmlnaHQ6IDAsXG4gIHRvcDogMCxcbiAgYmFja2dyb3VuZENvbG9yOiBcInRyYW5zcGFyZW50XCIsXG4gIGJvcmRlcjogXCJub25lXCJcbn07XG52YXIgbXNnVHlwZVN0eWxlID0ge1xuICBjb2xvcjogXCIjZTgzYjQ2XCIsXG4gIGZvbnRTaXplOiBcIjEuMmVtXCIsXG4gIG1hcmdpbkJvdHRvbTogXCIxcmVtXCIsXG4gIGZvbnRGYW1pbHk6IFwic2Fucy1zZXJpZlwiXG59O1xudmFyIG1zZ1RleHRTdHlsZSA9IHtcbiAgbGluZUhlaWdodDogXCIxLjVcIixcbiAgZm9udFNpemU6IFwiMXJlbVwiLFxuICBmb250RmFtaWx5OiBcIk1lbmxvLCBDb25zb2xhcywgbW9ub3NwYWNlXCJcbn07XG5leHBvcnQgeyBtc2dTdHlsZXMsIGlmcmFtZVN0eWxlLCBjb250YWluZXJTdHlsZSwgaGVhZGVyU3R5bGUsIGRpc21pc3NCdXR0b25TdHlsZSwgbXNnVHlwZVN0eWxlLCBtc2dUZXh0U3R5bGUgfTsiLCIvKiBnbG9iYWwgX193ZWJwYWNrX2Rldl9zZXJ2ZXJfY2xpZW50X18gKi9cblxuaW1wb3J0IFdlYlNvY2tldENsaWVudCBmcm9tIFwiLi9jbGllbnRzL1dlYlNvY2tldENsaWVudC5qc1wiO1xuaW1wb3J0IHsgbG9nIH0gZnJvbSBcIi4vdXRpbHMvbG9nLmpzXCI7XG5cbi8vIHRoaXMgV2Vic29ja2V0Q2xpZW50IGlzIGhlcmUgYXMgYSBkZWZhdWx0IGZhbGxiYWNrLCBpbiBjYXNlIHRoZSBjbGllbnQgaXMgbm90IGluamVjdGVkXG4vKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbnZhciBDbGllbnQgPVxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5lc3RlZC10ZXJuYXJ5XG50eXBlb2YgX193ZWJwYWNrX2Rldl9zZXJ2ZXJfY2xpZW50X18gIT09IFwidW5kZWZpbmVkXCIgPyB0eXBlb2YgX193ZWJwYWNrX2Rldl9zZXJ2ZXJfY2xpZW50X18uZGVmYXVsdCAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19kZXZfc2VydmVyX2NsaWVudF9fLmRlZmF1bHQgOiBfX3dlYnBhY2tfZGV2X3NlcnZlcl9jbGllbnRfXyA6IFdlYlNvY2tldENsaWVudDtcbi8qIGVzbGludC1lbmFibGUgY2FtZWxjYXNlICovXG5cbnZhciByZXRyaWVzID0gMDtcbnZhciBtYXhSZXRyaWVzID0gMTA7XG5cbi8vIEluaXRpYWxpemVkIGNsaWVudCBpcyBleHBvcnRlZCBzbyBleHRlcm5hbCBjb25zdW1lcnMgY2FuIHV0aWxpemUgdGhlIHNhbWUgaW5zdGFuY2Vcbi8vIEl0IGlzIG11dGFibGUgdG8gZW5mb3JjZSBzaW5nbGV0b25cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tbXV0YWJsZS1leHBvcnRzXG5leHBvcnQgdmFyIGNsaWVudCA9IG51bGw7XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybFxuICogQHBhcmFtIHt7IFtoYW5kbGVyOiBzdHJpbmddOiAoZGF0YT86IGFueSwgcGFyYW1zPzogYW55KSA9PiBhbnkgfX0gaGFuZGxlcnNcbiAqIEBwYXJhbSB7bnVtYmVyfSBbcmVjb25uZWN0XVxuICovXG52YXIgc29ja2V0ID0gZnVuY3Rpb24gaW5pdFNvY2tldCh1cmwsIGhhbmRsZXJzLCByZWNvbm5lY3QpIHtcbiAgY2xpZW50ID0gbmV3IENsaWVudCh1cmwpO1xuICBjbGllbnQub25PcGVuKGZ1bmN0aW9uICgpIHtcbiAgICByZXRyaWVzID0gMDtcbiAgICBpZiAodHlwZW9mIHJlY29ubmVjdCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgbWF4UmV0cmllcyA9IHJlY29ubmVjdDtcbiAgICB9XG4gIH0pO1xuICBjbGllbnQub25DbG9zZShmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHJldHJpZXMgPT09IDApIHtcbiAgICAgIGhhbmRsZXJzLmNsb3NlKCk7XG4gICAgfVxuXG4gICAgLy8gVHJ5IHRvIHJlY29ubmVjdC5cbiAgICBjbGllbnQgPSBudWxsO1xuXG4gICAgLy8gQWZ0ZXIgMTAgcmV0cmllcyBzdG9wIHRyeWluZywgdG8gcHJldmVudCBsb2dzcGFtLlxuICAgIGlmIChyZXRyaWVzIDwgbWF4UmV0cmllcykge1xuICAgICAgLy8gRXhwb25lbnRpYWxseSBpbmNyZWFzZSB0aW1lb3V0IHRvIHJlY29ubmVjdC5cbiAgICAgIC8vIFJlc3BlY3RmdWxseSBjb3BpZWQgZnJvbSB0aGUgcGFja2FnZSBgZ290YC5cbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXByb3BlcnRpZXNcbiAgICAgIHZhciByZXRyeUluTXMgPSAxMDAwICogTWF0aC5wb3coMiwgcmV0cmllcykgKyBNYXRoLnJhbmRvbSgpICogMTAwO1xuICAgICAgcmV0cmllcyArPSAxO1xuICAgICAgbG9nLmluZm8oXCJUcnlpbmcgdG8gcmVjb25uZWN0Li4uXCIpO1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNvY2tldCh1cmwsIGhhbmRsZXJzLCByZWNvbm5lY3QpO1xuICAgICAgfSwgcmV0cnlJbk1zKTtcbiAgICB9XG4gIH0pO1xuICBjbGllbnQub25NZXNzYWdlKFxuICAvKipcbiAgICogQHBhcmFtIHthbnl9IGRhdGFcbiAgICovXG4gIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgdmFyIG1lc3NhZ2UgPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgIGlmIChoYW5kbGVyc1ttZXNzYWdlLnR5cGVdKSB7XG4gICAgICBoYW5kbGVyc1ttZXNzYWdlLnR5cGVdKG1lc3NhZ2UuZGF0YSwgbWVzc2FnZS5wYXJhbXMpO1xuICAgIH1cbiAgfSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgc29ja2V0OyIsIi8qKlxuICogQHBhcmFtIHt7IHByb3RvY29sPzogc3RyaW5nLCBhdXRoPzogc3RyaW5nLCBob3N0bmFtZT86IHN0cmluZywgcG9ydD86IHN0cmluZywgcGF0aG5hbWU/OiBzdHJpbmcsIHNlYXJjaD86IHN0cmluZywgaGFzaD86IHN0cmluZywgc2xhc2hlcz86IGJvb2xlYW4gfX0gb2JqVVJMXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBmb3JtYXQob2JqVVJMKSB7XG4gIHZhciBwcm90b2NvbCA9IG9ialVSTC5wcm90b2NvbCB8fCBcIlwiO1xuICBpZiAocHJvdG9jb2wgJiYgcHJvdG9jb2wuc3Vic3RyKC0xKSAhPT0gXCI6XCIpIHtcbiAgICBwcm90b2NvbCArPSBcIjpcIjtcbiAgfVxuICB2YXIgYXV0aCA9IG9ialVSTC5hdXRoIHx8IFwiXCI7XG4gIGlmIChhdXRoKSB7XG4gICAgYXV0aCA9IGVuY29kZVVSSUNvbXBvbmVudChhdXRoKTtcbiAgICBhdXRoID0gYXV0aC5yZXBsYWNlKC8lM0EvaSwgXCI6XCIpO1xuICAgIGF1dGggKz0gXCJAXCI7XG4gIH1cbiAgdmFyIGhvc3QgPSBcIlwiO1xuICBpZiAob2JqVVJMLmhvc3RuYW1lKSB7XG4gICAgaG9zdCA9IGF1dGggKyAob2JqVVJMLmhvc3RuYW1lLmluZGV4T2YoXCI6XCIpID09PSAtMSA/IG9ialVSTC5ob3N0bmFtZSA6IFwiW1wiLmNvbmNhdChvYmpVUkwuaG9zdG5hbWUsIFwiXVwiKSk7XG4gICAgaWYgKG9ialVSTC5wb3J0KSB7XG4gICAgICBob3N0ICs9IFwiOlwiLmNvbmNhdChvYmpVUkwucG9ydCk7XG4gICAgfVxuICB9XG4gIHZhciBwYXRobmFtZSA9IG9ialVSTC5wYXRobmFtZSB8fCBcIlwiO1xuICBpZiAob2JqVVJMLnNsYXNoZXMpIHtcbiAgICBob3N0ID0gXCIvL1wiLmNvbmNhdChob3N0IHx8IFwiXCIpO1xuICAgIGlmIChwYXRobmFtZSAmJiBwYXRobmFtZS5jaGFyQXQoMCkgIT09IFwiL1wiKSB7XG4gICAgICBwYXRobmFtZSA9IFwiL1wiLmNvbmNhdChwYXRobmFtZSk7XG4gICAgfVxuICB9IGVsc2UgaWYgKCFob3N0KSB7XG4gICAgaG9zdCA9IFwiXCI7XG4gIH1cbiAgdmFyIHNlYXJjaCA9IG9ialVSTC5zZWFyY2ggfHwgXCJcIjtcbiAgaWYgKHNlYXJjaCAmJiBzZWFyY2guY2hhckF0KDApICE9PSBcIj9cIikge1xuICAgIHNlYXJjaCA9IFwiP1wiLmNvbmNhdChzZWFyY2gpO1xuICB9XG4gIHZhciBoYXNoID0gb2JqVVJMLmhhc2ggfHwgXCJcIjtcbiAgaWYgKGhhc2ggJiYgaGFzaC5jaGFyQXQoMCkgIT09IFwiI1wiKSB7XG4gICAgaGFzaCA9IFwiI1wiLmNvbmNhdChoYXNoKTtcbiAgfVxuICBwYXRobmFtZSA9IHBhdGhuYW1lLnJlcGxhY2UoL1s/I10vZyxcbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBtYXRjaFxuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgKi9cbiAgZnVuY3Rpb24gKG1hdGNoKSB7XG4gICAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChtYXRjaCk7XG4gIH0pO1xuICBzZWFyY2ggPSBzZWFyY2gucmVwbGFjZShcIiNcIiwgXCIlMjNcIik7XG4gIHJldHVybiBcIlwiLmNvbmNhdChwcm90b2NvbCkuY29uY2F0KGhvc3QpLmNvbmNhdChwYXRobmFtZSkuY29uY2F0KHNlYXJjaCkuY29uY2F0KGhhc2gpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7VVJMICYgeyBmcm9tQ3VycmVudFNjcmlwdD86IGJvb2xlYW4gfX0gcGFyc2VkVVJMXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBjcmVhdGVTb2NrZXRVUkwocGFyc2VkVVJMKSB7XG4gIHZhciBob3N0bmFtZSA9IHBhcnNlZFVSTC5ob3N0bmFtZTtcblxuICAvLyBOb2RlLmpzIG1vZHVsZSBwYXJzZXMgaXQgYXMgYDo6YFxuICAvLyBgbmV3IFVSTCh1cmxTdHJpbmcsIFtiYXNlVVJMU3RyaW5nXSlgIHBhcnNlcyBpdCBhcyAnWzo6XSdcbiAgdmFyIGlzSW5BZGRyQW55ID0gaG9zdG5hbWUgPT09IFwiMC4wLjAuMFwiIHx8IGhvc3RuYW1lID09PSBcIjo6XCIgfHwgaG9zdG5hbWUgPT09IFwiWzo6XVwiO1xuXG4gIC8vIHdoeSBkbyB3ZSBuZWVkIHRoaXMgY2hlY2s/XG4gIC8vIGhvc3RuYW1lIG4vYSBmb3IgZmlsZSBwcm90b2NvbCAoZXhhbXBsZSwgd2hlbiB1c2luZyBlbGVjdHJvbiwgaW9uaWMpXG4gIC8vIHNlZTogaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2svd2VicGFjay1kZXYtc2VydmVyL3B1bGwvMzg0XG4gIGlmIChpc0luQWRkckFueSAmJiBzZWxmLmxvY2F0aW9uLmhvc3RuYW1lICYmIHNlbGYubG9jYXRpb24ucHJvdG9jb2wuaW5kZXhPZihcImh0dHBcIikgPT09IDApIHtcbiAgICBob3N0bmFtZSA9IHNlbGYubG9jYXRpb24uaG9zdG5hbWU7XG4gIH1cbiAgdmFyIHNvY2tldFVSTFByb3RvY29sID0gcGFyc2VkVVJMLnByb3RvY29sIHx8IHNlbGYubG9jYXRpb24ucHJvdG9jb2w7XG5cbiAgLy8gV2hlbiBodHRwcyBpcyB1c2VkIGluIHRoZSBhcHAsIHNlY3VyZSB3ZWIgc29ja2V0cyBhcmUgYWx3YXlzIG5lY2Vzc2FyeSBiZWNhdXNlIHRoZSBicm93c2VyIGRvZXNuJ3QgYWNjZXB0IG5vbi1zZWN1cmUgd2ViIHNvY2tldHMuXG4gIGlmIChzb2NrZXRVUkxQcm90b2NvbCA9PT0gXCJhdXRvOlwiIHx8IGhvc3RuYW1lICYmIGlzSW5BZGRyQW55ICYmIHNlbGYubG9jYXRpb24ucHJvdG9jb2wgPT09IFwiaHR0cHM6XCIpIHtcbiAgICBzb2NrZXRVUkxQcm90b2NvbCA9IHNlbGYubG9jYXRpb24ucHJvdG9jb2w7XG4gIH1cbiAgc29ja2V0VVJMUHJvdG9jb2wgPSBzb2NrZXRVUkxQcm90b2NvbC5yZXBsYWNlKC9eKD86aHR0cHwuKy1leHRlbnNpb258ZmlsZSkvaSwgXCJ3c1wiKTtcbiAgdmFyIHNvY2tldFVSTEF1dGggPSBcIlwiO1xuXG4gIC8vIGBuZXcgVVJMKHVybFN0cmluZywgW2Jhc2VVUkxzdHJpbmddKWAgZG9lc24ndCBoYXZlIGBhdXRoYCBwcm9wZXJ0eVxuICAvLyBQYXJzZSBhdXRoZW50aWNhdGlvbiBjcmVkZW50aWFscyBpbiBjYXNlIHdlIG5lZWQgdGhlbVxuICBpZiAocGFyc2VkVVJMLnVzZXJuYW1lKSB7XG4gICAgc29ja2V0VVJMQXV0aCA9IHBhcnNlZFVSTC51c2VybmFtZTtcblxuICAgIC8vIFNpbmNlIEhUVFAgYmFzaWMgYXV0aGVudGljYXRpb24gZG9lcyBub3QgYWxsb3cgZW1wdHkgdXNlcm5hbWUsXG4gICAgLy8gd2Ugb25seSBpbmNsdWRlIHBhc3N3b3JkIGlmIHRoZSB1c2VybmFtZSBpcyBub3QgZW1wdHkuXG4gICAgaWYgKHBhcnNlZFVSTC5wYXNzd29yZCkge1xuICAgICAgLy8gUmVzdWx0OiA8dXNlcm5hbWU+OjxwYXNzd29yZD5cbiAgICAgIHNvY2tldFVSTEF1dGggPSBzb2NrZXRVUkxBdXRoLmNvbmNhdChcIjpcIiwgcGFyc2VkVVJMLnBhc3N3b3JkKTtcbiAgICB9XG4gIH1cblxuICAvLyBJbiBjYXNlIHRoZSBob3N0IGlzIGEgcmF3IElQdjYgYWRkcmVzcywgaXQgY2FuIGJlIGVuY2xvc2VkIGluXG4gIC8vIHRoZSBicmFja2V0cyBhcyB0aGUgYnJhY2tldHMgYXJlIG5lZWRlZCBpbiB0aGUgZmluYWwgVVJMIHN0cmluZy5cbiAgLy8gTmVlZCB0byByZW1vdmUgdGhvc2UgYXMgdXJsLmZvcm1hdCBibGluZGx5IGFkZHMgaXRzIG93biBzZXQgb2YgYnJhY2tldHNcbiAgLy8gaWYgdGhlIGhvc3Qgc3RyaW5nIGNvbnRhaW5zIGNvbG9ucy4gVGhhdCB3b3VsZCBsZWFkIHRvIG5vbi13b3JraW5nXG4gIC8vIGRvdWJsZSBicmFja2V0cyAoZS5nLiBbWzo6XV0pIGhvc3RcbiAgLy9cbiAgLy8gQWxsIG9mIHRoZXNlIHdlYiBzb2NrZXQgdXJsIHBhcmFtcyBhcmUgb3B0aW9uYWxseSBwYXNzZWQgaW4gdGhyb3VnaCByZXNvdXJjZVF1ZXJ5LFxuICAvLyBzbyB3ZSBuZWVkIHRvIGZhbGwgYmFjayB0byB0aGUgZGVmYXVsdCBpZiB0aGV5IGFyZSBub3QgcHJvdmlkZWRcbiAgdmFyIHNvY2tldFVSTEhvc3RuYW1lID0gKGhvc3RuYW1lIHx8IHNlbGYubG9jYXRpb24uaG9zdG5hbWUgfHwgXCJsb2NhbGhvc3RcIikucmVwbGFjZSgvXlxcWyguKilcXF0kLywgXCIkMVwiKTtcbiAgdmFyIHNvY2tldFVSTFBvcnQgPSBwYXJzZWRVUkwucG9ydDtcbiAgaWYgKCFzb2NrZXRVUkxQb3J0IHx8IHNvY2tldFVSTFBvcnQgPT09IFwiMFwiKSB7XG4gICAgc29ja2V0VVJMUG9ydCA9IHNlbGYubG9jYXRpb24ucG9ydDtcbiAgfVxuXG4gIC8vIElmIHBhdGggaXMgcHJvdmlkZWQgaXQnbGwgYmUgcGFzc2VkIGluIHZpYSB0aGUgcmVzb3VyY2VRdWVyeSBhcyBhXG4gIC8vIHF1ZXJ5IHBhcmFtIHNvIGl0IGhhcyB0byBiZSBwYXJzZWQgb3V0IG9mIHRoZSBxdWVyeXN0cmluZyBpbiBvcmRlciBmb3IgdGhlXG4gIC8vIGNsaWVudCB0byBvcGVuIHRoZSBzb2NrZXQgdG8gdGhlIGNvcnJlY3QgbG9jYXRpb24uXG4gIHZhciBzb2NrZXRVUkxQYXRobmFtZSA9IFwiL3dzXCI7XG4gIGlmIChwYXJzZWRVUkwucGF0aG5hbWUgJiYgIXBhcnNlZFVSTC5mcm9tQ3VycmVudFNjcmlwdCkge1xuICAgIHNvY2tldFVSTFBhdGhuYW1lID0gcGFyc2VkVVJMLnBhdGhuYW1lO1xuICB9XG4gIHJldHVybiBmb3JtYXQoe1xuICAgIHByb3RvY29sOiBzb2NrZXRVUkxQcm90b2NvbCxcbiAgICBhdXRoOiBzb2NrZXRVUkxBdXRoLFxuICAgIGhvc3RuYW1lOiBzb2NrZXRVUkxIb3N0bmFtZSxcbiAgICBwb3J0OiBzb2NrZXRVUkxQb3J0LFxuICAgIHBhdGhuYW1lOiBzb2NrZXRVUkxQYXRobmFtZSxcbiAgICBzbGFzaGVzOiB0cnVlXG4gIH0pO1xufVxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlU29ja2V0VVJMOyIsIi8qKlxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZ2V0Q3VycmVudFNjcmlwdFNvdXJjZSgpIHtcbiAgLy8gYGRvY3VtZW50LmN1cnJlbnRTY3JpcHRgIGlzIHRoZSBtb3N0IGFjY3VyYXRlIHdheSB0byBmaW5kIHRoZSBjdXJyZW50IHNjcmlwdCxcbiAgLy8gYnV0IGlzIG5vdCBzdXBwb3J0ZWQgaW4gYWxsIGJyb3dzZXJzLlxuICBpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdCkge1xuICAgIHJldHVybiBkb2N1bWVudC5jdXJyZW50U2NyaXB0LmdldEF0dHJpYnV0ZShcInNyY1wiKTtcbiAgfVxuXG4gIC8vIEZhbGxiYWNrIHRvIGdldHRpbmcgYWxsIHNjcmlwdHMgcnVubmluZyBpbiB0aGUgZG9jdW1lbnQuXG4gIHZhciBzY3JpcHRFbGVtZW50cyA9IGRvY3VtZW50LnNjcmlwdHMgfHwgW107XG4gIHZhciBzY3JpcHRFbGVtZW50c1dpdGhTcmMgPSBBcnJheS5wcm90b3R5cGUuZmlsdGVyLmNhbGwoc2NyaXB0RWxlbWVudHMsIGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgcmV0dXJuIGVsZW1lbnQuZ2V0QXR0cmlidXRlKFwic3JjXCIpO1xuICB9KTtcbiAgaWYgKHNjcmlwdEVsZW1lbnRzV2l0aFNyYy5sZW5ndGggPiAwKSB7XG4gICAgdmFyIGN1cnJlbnRTY3JpcHQgPSBzY3JpcHRFbGVtZW50c1dpdGhTcmNbc2NyaXB0RWxlbWVudHNXaXRoU3JjLmxlbmd0aCAtIDFdO1xuICAgIHJldHVybiBjdXJyZW50U2NyaXB0LmdldEF0dHJpYnV0ZShcInNyY1wiKTtcbiAgfVxuXG4gIC8vIEZhaWwgYXMgdGhlcmUgd2FzIG5vIHNjcmlwdCB0byB1c2UuXG4gIHRocm93IG5ldyBFcnJvcihcIlt3ZWJwYWNrLWRldi1zZXJ2ZXJdIEZhaWxlZCB0byBnZXQgY3VycmVudCBzY3JpcHQgc291cmNlLlwiKTtcbn1cbmV4cG9ydCBkZWZhdWx0IGdldEN1cnJlbnRTY3JpcHRTb3VyY2U7IiwiaW1wb3J0IGxvZ2dlciBmcm9tIFwiLi4vbW9kdWxlcy9sb2dnZXIvaW5kZXguanNcIjtcbnZhciBuYW1lID0gXCJ3ZWJwYWNrLWRldi1zZXJ2ZXJcIjtcbi8vIGRlZmF1bHQgbGV2ZWwgaXMgc2V0IG9uIHRoZSBjbGllbnQgc2lkZSwgc28gaXQgZG9lcyBub3QgbmVlZFxuLy8gdG8gYmUgc2V0IGJ5IHRoZSBDTEkgb3IgQVBJXG52YXIgZGVmYXVsdExldmVsID0gXCJpbmZvXCI7XG5cbi8vIG9wdGlvbnMgbmV3IG9wdGlvbnMsIG1lcmdlIHdpdGggb2xkIG9wdGlvbnNcbi8qKlxuICogQHBhcmFtIHtmYWxzZSB8IHRydWUgfCBcIm5vbmVcIiB8IFwiZXJyb3JcIiB8IFwid2FyblwiIHwgXCJpbmZvXCIgfCBcImxvZ1wiIHwgXCJ2ZXJib3NlXCJ9IGxldmVsXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZnVuY3Rpb24gc2V0TG9nTGV2ZWwobGV2ZWwpIHtcbiAgbG9nZ2VyLmNvbmZpZ3VyZURlZmF1bHRMb2dnZXIoe1xuICAgIGxldmVsOiBsZXZlbFxuICB9KTtcbn1cbnNldExvZ0xldmVsKGRlZmF1bHRMZXZlbCk7XG52YXIgbG9nID0gbG9nZ2VyLmdldExvZ2dlcihuYW1lKTtcbnZhciBsb2dFbmFibGVkRmVhdHVyZXMgPSBmdW5jdGlvbiBsb2dFbmFibGVkRmVhdHVyZXMoZmVhdHVyZXMpIHtcbiAgdmFyIGVuYWJsZWRGZWF0dXJlcyA9IE9iamVjdC5rZXlzKGZlYXR1cmVzKTtcbiAgaWYgKCFmZWF0dXJlcyB8fCBlbmFibGVkRmVhdHVyZXMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBsb2dTdHJpbmcgPSBcIlNlcnZlciBzdGFydGVkOlwiO1xuXG4gIC8vIFNlcnZlciBzdGFydGVkOiBIb3QgTW9kdWxlIFJlcGxhY2VtZW50IGVuYWJsZWQsIExpdmUgUmVsb2FkaW5nIGVuYWJsZWQsIE92ZXJsYXkgZGlzYWJsZWQuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgZW5hYmxlZEZlYXR1cmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGtleSA9IGVuYWJsZWRGZWF0dXJlc1tpXTtcbiAgICBsb2dTdHJpbmcgKz0gXCIgXCIuY29uY2F0KGtleSwgXCIgXCIpLmNvbmNhdChmZWF0dXJlc1trZXldID8gXCJlbmFibGVkXCIgOiBcImRpc2FibGVkXCIsIFwiLFwiKTtcbiAgfVxuICAvLyByZXBsYWNlIGxhc3QgY29tbWEgd2l0aCBhIHBlcmlvZFxuICBsb2dTdHJpbmcgPSBsb2dTdHJpbmcuc2xpY2UoMCwgLTEpLmNvbmNhdChcIi5cIik7XG4gIGxvZy5pbmZvKGxvZ1N0cmluZyk7XG59O1xuZXhwb3J0IHsgbG9nLCBsb2dFbmFibGVkRmVhdHVyZXMsIHNldExvZ0xldmVsIH07IiwiaW1wb3J0IGdldEN1cnJlbnRTY3JpcHRTb3VyY2UgZnJvbSBcIi4vZ2V0Q3VycmVudFNjcmlwdFNvdXJjZS5qc1wiO1xuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSByZXNvdXJjZVF1ZXJ5XG4gKiBAcmV0dXJucyB7eyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfCBib29sZWFuIH19XG4gKi9cbmZ1bmN0aW9uIHBhcnNlVVJMKHJlc291cmNlUXVlcnkpIHtcbiAgLyoqIEB0eXBlIHt7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9fSAqL1xuICB2YXIgb3B0aW9ucyA9IHt9O1xuICBpZiAodHlwZW9mIHJlc291cmNlUXVlcnkgPT09IFwic3RyaW5nXCIgJiYgcmVzb3VyY2VRdWVyeSAhPT0gXCJcIikge1xuICAgIHZhciBzZWFyY2hQYXJhbXMgPSByZXNvdXJjZVF1ZXJ5LnNsaWNlKDEpLnNwbGl0KFwiJlwiKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNlYXJjaFBhcmFtcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHBhaXIgPSBzZWFyY2hQYXJhbXNbaV0uc3BsaXQoXCI9XCIpO1xuICAgICAgb3B0aW9uc1twYWlyWzBdXSA9IGRlY29kZVVSSUNvbXBvbmVudChwYWlyWzFdKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gRWxzZSwgZ2V0IHRoZSB1cmwgZnJvbSB0aGUgPHNjcmlwdD4gdGhpcyBmaWxlIHdhcyBjYWxsZWQgd2l0aC5cbiAgICB2YXIgc2NyaXB0U291cmNlID0gZ2V0Q3VycmVudFNjcmlwdFNvdXJjZSgpO1xuICAgIHZhciBzY3JpcHRTb3VyY2VVUkw7XG4gICAgdHJ5IHtcbiAgICAgIC8vIFRoZSBwbGFjZWhvbGRlciBgYmFzZVVSTGAgd2l0aCBgd2luZG93LmxvY2F0aW9uLmhyZWZgLFxuICAgICAgLy8gaXMgdG8gYWxsb3cgcGFyc2luZyBvZiBwYXRoLXJlbGF0aXZlIG9yIHByb3RvY29sLXJlbGF0aXZlIFVSTHMsXG4gICAgICAvLyBhbmQgd2lsbCBoYXZlIG5vIGVmZmVjdCBpZiBgc2NyaXB0U291cmNlYCBpcyBhIGZ1bGx5IHZhbGlkIFVSTC5cbiAgICAgIHNjcmlwdFNvdXJjZVVSTCA9IG5ldyBVUkwoc2NyaXB0U291cmNlLCBzZWxmLmxvY2F0aW9uLmhyZWYpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAvLyBVUkwgcGFyc2luZyBmYWlsZWQsIGRvIG5vdGhpbmcuXG4gICAgICAvLyBXZSB3aWxsIHN0aWxsIHByb2NlZWQgdG8gc2VlIGlmIHdlIGNhbiByZWNvdmVyIHVzaW5nIGByZXNvdXJjZVF1ZXJ5YFxuICAgIH1cbiAgICBpZiAoc2NyaXB0U291cmNlVVJMKSB7XG4gICAgICBvcHRpb25zID0gc2NyaXB0U291cmNlVVJMO1xuICAgICAgb3B0aW9ucy5mcm9tQ3VycmVudFNjcmlwdCA9IHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBvcHRpb25zO1xufVxuZXhwb3J0IGRlZmF1bHQgcGFyc2VVUkw7IiwiaW1wb3J0IGhvdEVtaXR0ZXIgZnJvbSBcIndlYnBhY2svaG90L2VtaXR0ZXIuanNcIjtcbmltcG9ydCB7IGxvZyB9IGZyb20gXCIuL2xvZy5qc1wiO1xuXG4vKiogQHR5cGVkZWYge2ltcG9ydChcIi4uL2luZGV4XCIpLk9wdGlvbnN9IE9wdGlvbnNcbi8qKiBAdHlwZWRlZiB7aW1wb3J0KFwiLi4vaW5kZXhcIikuU3RhdHVzfSBTdGF0dXNcblxuLyoqXG4gKiBAcGFyYW0ge09wdGlvbnN9IG9wdGlvbnNcbiAqIEBwYXJhbSB7U3RhdHVzfSBzdGF0dXNcbiAqL1xuZnVuY3Rpb24gcmVsb2FkQXBwKF9yZWYsIHN0YXR1cykge1xuICB2YXIgaG90ID0gX3JlZi5ob3QsXG4gICAgbGl2ZVJlbG9hZCA9IF9yZWYubGl2ZVJlbG9hZDtcbiAgaWYgKHN0YXR1cy5pc1VubG9hZGluZykge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgY3VycmVudEhhc2ggPSBzdGF0dXMuY3VycmVudEhhc2gsXG4gICAgcHJldmlvdXNIYXNoID0gc3RhdHVzLnByZXZpb3VzSGFzaDtcbiAgdmFyIGlzSW5pdGlhbCA9IGN1cnJlbnRIYXNoLmluZGV4T2YoIC8qKiBAdHlwZSB7c3RyaW5nfSAqL3ByZXZpb3VzSGFzaCkgPj0gMDtcbiAgaWYgKGlzSW5pdGlhbCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge1dpbmRvd30gcm9vdFdpbmRvd1xuICAgKiBAcGFyYW0ge251bWJlcn0gaW50ZXJ2YWxJZFxuICAgKi9cbiAgZnVuY3Rpb24gYXBwbHlSZWxvYWQocm9vdFdpbmRvdywgaW50ZXJ2YWxJZCkge1xuICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxJZCk7XG4gICAgbG9nLmluZm8oXCJBcHAgdXBkYXRlZC4gUmVsb2FkaW5nLi4uXCIpO1xuICAgIHJvb3RXaW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gIH1cbiAgdmFyIHNlYXJjaCA9IHNlbGYubG9jYXRpb24uc2VhcmNoLnRvTG93ZXJDYXNlKCk7XG4gIHZhciBhbGxvd1RvSG90ID0gc2VhcmNoLmluZGV4T2YoXCJ3ZWJwYWNrLWRldi1zZXJ2ZXItaG90PWZhbHNlXCIpID09PSAtMTtcbiAgdmFyIGFsbG93VG9MaXZlUmVsb2FkID0gc2VhcmNoLmluZGV4T2YoXCJ3ZWJwYWNrLWRldi1zZXJ2ZXItbGl2ZS1yZWxvYWQ9ZmFsc2VcIikgPT09IC0xO1xuICBpZiAoaG90ICYmIGFsbG93VG9Ib3QpIHtcbiAgICBsb2cuaW5mbyhcIkFwcCBob3QgdXBkYXRlLi4uXCIpO1xuICAgIGhvdEVtaXR0ZXIuZW1pdChcIndlYnBhY2tIb3RVcGRhdGVcIiwgc3RhdHVzLmN1cnJlbnRIYXNoKTtcbiAgICBpZiAodHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgJiYgc2VsZi53aW5kb3cpIHtcbiAgICAgIC8vIGJyb2FkY2FzdCB1cGRhdGUgdG8gd2luZG93XG4gICAgICBzZWxmLnBvc3RNZXNzYWdlKFwid2VicGFja0hvdFVwZGF0ZVwiLmNvbmNhdChzdGF0dXMuY3VycmVudEhhc2gpLCBcIipcIik7XG4gICAgfVxuICB9XG4gIC8vIGFsbG93IHJlZnJlc2hpbmcgdGhlIHBhZ2Ugb25seSBpZiBsaXZlUmVsb2FkIGlzbid0IGRpc2FibGVkXG4gIGVsc2UgaWYgKGxpdmVSZWxvYWQgJiYgYWxsb3dUb0xpdmVSZWxvYWQpIHtcbiAgICB2YXIgcm9vdFdpbmRvdyA9IHNlbGY7XG5cbiAgICAvLyB1c2UgcGFyZW50IHdpbmRvdyBmb3IgcmVsb2FkIChpbiBjYXNlIHdlJ3JlIGluIGFuIGlmcmFtZSB3aXRoIG5vIHZhbGlkIHNyYylcbiAgICB2YXIgaW50ZXJ2YWxJZCA9IHNlbGYuc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHJvb3RXaW5kb3cubG9jYXRpb24ucHJvdG9jb2wgIT09IFwiYWJvdXQ6XCIpIHtcbiAgICAgICAgLy8gcmVsb2FkIGltbWVkaWF0ZWx5IGlmIHByb3RvY29sIGlzIHZhbGlkXG4gICAgICAgIGFwcGx5UmVsb2FkKHJvb3RXaW5kb3csIGludGVydmFsSWQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcm9vdFdpbmRvdyA9IHJvb3RXaW5kb3cucGFyZW50O1xuICAgICAgICBpZiAocm9vdFdpbmRvdy5wYXJlbnQgPT09IHJvb3RXaW5kb3cpIHtcbiAgICAgICAgICAvLyBpZiBwYXJlbnQgZXF1YWxzIGN1cnJlbnQgd2luZG93IHdlJ3ZlIHJlYWNoZWQgdGhlIHJvb3Qgd2hpY2ggd291bGQgY29udGludWUgZm9yZXZlciwgc28gdHJpZ2dlciBhIHJlbG9hZCBhbnl3YXlzXG4gICAgICAgICAgYXBwbHlSZWxvYWQocm9vdFdpbmRvdywgaW50ZXJ2YWxJZCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgcmVsb2FkQXBwOyIsIi8qIGdsb2JhbCBfX3Jlc291cmNlUXVlcnkgV29ya2VyR2xvYmFsU2NvcGUgKi9cblxuLy8gU2VuZCBtZXNzYWdlcyB0byB0aGUgb3V0c2lkZSwgc28gcGx1Z2lucyBjYW4gY29uc3VtZSBpdC5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAqIEBwYXJhbSB7YW55fSBbZGF0YV1cbiAqL1xuZnVuY3Rpb24gc2VuZE1zZyh0eXBlLCBkYXRhKSB7XG4gIGlmICh0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiAmJiAodHlwZW9mIFdvcmtlckdsb2JhbFNjb3BlID09PSBcInVuZGVmaW5lZFwiIHx8ICEoc2VsZiBpbnN0YW5jZW9mIFdvcmtlckdsb2JhbFNjb3BlKSkpIHtcbiAgICBzZWxmLnBvc3RNZXNzYWdlKHtcbiAgICAgIHR5cGU6IFwid2VicGFja1wiLmNvbmNhdCh0eXBlKSxcbiAgICAgIGRhdGE6IGRhdGFcbiAgICB9LCBcIipcIik7XG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IHNlbmRNc2c7IiwidmFyIGFuc2lSZWdleCA9IG5ldyBSZWdFeHAoW1wiW1xcXFx1MDAxQlxcXFx1MDA5Ql1bW1xcXFxdKCkjOz9dKig/Oig/Oig/Oig/OjtbLWEtekEtWlxcXFxkXFxcXC8jJi46PT8lQH5fXSspKnxbYS16QS1aXFxcXGRdKyg/OjtbLWEtekEtWlxcXFxkXFxcXC8jJi46PT8lQH5fXSopKik/XFxcXHUwMDA3KVwiLCBcIig/Oig/OlxcXFxkezEsNH0oPzo7XFxcXGR7MCw0fSkqKT9bXFxcXGRBLVBSLVRaY2YtbnEtdXk9Pjx+XSkpXCJdLmpvaW4oXCJ8XCIpLCBcImdcIik7XG5cbi8qKlxuICpcbiAqIFN0cmlwIFtBTlNJIGVzY2FwZSBjb2Rlc10oaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvQU5TSV9lc2NhcGVfY29kZSkgZnJvbSBhIHN0cmluZy5cbiAqIEFkYXB0ZWQgZnJvbSBjb2RlIG9yaWdpbmFsbHkgcmVsZWFzZWQgYnkgU2luZHJlIFNvcmh1c1xuICogTGljZW5zZWQgdGhlIE1JVCBMaWNlbnNlXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZ1xuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBzdHJpcEFuc2koc3RyaW5nKSB7XG4gIGlmICh0eXBlb2Ygc3RyaW5nICE9PSBcInN0cmluZ1wiKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkV4cGVjdGVkIGEgYHN0cmluZ2AsIGdvdCBgXCIuY29uY2F0KHR5cGVvZiBzdHJpbmcsIFwiYFwiKSk7XG4gIH1cbiAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKGFuc2lSZWdleCwgXCJcIik7XG59XG5leHBvcnQgZGVmYXVsdCBzdHJpcEFuc2k7IiwiLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbi8qIGdsb2JhbHMgX193ZWJwYWNrX2hhc2hfXyAqL1xuaWYgKG1vZHVsZS5ob3QpIHtcblx0LyoqIEB0eXBlIHt1bmRlZmluZWR8c3RyaW5nfSAqL1xuXHR2YXIgbGFzdEhhc2g7XG5cdHZhciB1cFRvRGF0ZSA9IGZ1bmN0aW9uIHVwVG9EYXRlKCkge1xuXHRcdHJldHVybiAvKiogQHR5cGUge3N0cmluZ30gKi8gKGxhc3RIYXNoKS5pbmRleE9mKF9fd2VicGFja19oYXNoX18pID49IDA7XG5cdH07XG5cdHZhciBsb2cgPSByZXF1aXJlKFwiLi9sb2dcIik7XG5cdHZhciBjaGVjayA9IGZ1bmN0aW9uIGNoZWNrKCkge1xuXHRcdG1vZHVsZS5ob3Rcblx0XHRcdC5jaGVjayh0cnVlKVxuXHRcdFx0LnRoZW4oZnVuY3Rpb24gKHVwZGF0ZWRNb2R1bGVzKSB7XG5cdFx0XHRcdGlmICghdXBkYXRlZE1vZHVsZXMpIHtcblx0XHRcdFx0XHRsb2coXG5cdFx0XHRcdFx0XHRcIndhcm5pbmdcIixcblx0XHRcdFx0XHRcdFwiW0hNUl0gQ2Fubm90IGZpbmQgdXBkYXRlLiBcIiArXG5cdFx0XHRcdFx0XHRcdCh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiXG5cdFx0XHRcdFx0XHRcdFx0PyBcIk5lZWQgdG8gZG8gYSBmdWxsIHJlbG9hZCFcIlxuXHRcdFx0XHRcdFx0XHRcdDogXCJQbGVhc2UgcmVsb2FkIG1hbnVhbGx5IVwiKVxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0bG9nKFxuXHRcdFx0XHRcdFx0XCJ3YXJuaW5nXCIsXG5cdFx0XHRcdFx0XHRcIltITVJdIChQcm9iYWJseSBiZWNhdXNlIG9mIHJlc3RhcnRpbmcgdGhlIHdlYnBhY2stZGV2LXNlcnZlcilcIlxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0aWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHtcblx0XHRcdFx0XHRcdHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKCF1cFRvRGF0ZSgpKSB7XG5cdFx0XHRcdFx0Y2hlY2soKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJlcXVpcmUoXCIuL2xvZy1hcHBseS1yZXN1bHRcIikodXBkYXRlZE1vZHVsZXMsIHVwZGF0ZWRNb2R1bGVzKTtcblxuXHRcdFx0XHRpZiAodXBUb0RhdGUoKSkge1xuXHRcdFx0XHRcdGxvZyhcImluZm9cIiwgXCJbSE1SXSBBcHAgaXMgdXAgdG8gZGF0ZS5cIik7XG5cdFx0XHRcdH1cblx0XHRcdH0pXG5cdFx0XHQuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuXHRcdFx0XHR2YXIgc3RhdHVzID0gbW9kdWxlLmhvdC5zdGF0dXMoKTtcblx0XHRcdFx0aWYgKFtcImFib3J0XCIsIFwiZmFpbFwiXS5pbmRleE9mKHN0YXR1cykgPj0gMCkge1xuXHRcdFx0XHRcdGxvZyhcblx0XHRcdFx0XHRcdFwid2FybmluZ1wiLFxuXHRcdFx0XHRcdFx0XCJbSE1SXSBDYW5ub3QgYXBwbHkgdXBkYXRlLiBcIiArXG5cdFx0XHRcdFx0XHRcdCh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiXG5cdFx0XHRcdFx0XHRcdFx0PyBcIk5lZWQgdG8gZG8gYSBmdWxsIHJlbG9hZCFcIlxuXHRcdFx0XHRcdFx0XHRcdDogXCJQbGVhc2UgcmVsb2FkIG1hbnVhbGx5IVwiKVxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0bG9nKFwid2FybmluZ1wiLCBcIltITVJdIFwiICsgbG9nLmZvcm1hdEVycm9yKGVycikpO1xuXHRcdFx0XHRcdGlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0XHRcdFx0XHR3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGxvZyhcIndhcm5pbmdcIiwgXCJbSE1SXSBVcGRhdGUgZmFpbGVkOiBcIiArIGxvZy5mb3JtYXRFcnJvcihlcnIpKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdH07XG5cdHZhciBob3RFbWl0dGVyID0gcmVxdWlyZShcIi4vZW1pdHRlclwiKTtcblx0aG90RW1pdHRlci5vbihcIndlYnBhY2tIb3RVcGRhdGVcIiwgZnVuY3Rpb24gKGN1cnJlbnRIYXNoKSB7XG5cdFx0bGFzdEhhc2ggPSBjdXJyZW50SGFzaDtcblx0XHRpZiAoIXVwVG9EYXRlKCkgJiYgbW9kdWxlLmhvdC5zdGF0dXMoKSA9PT0gXCJpZGxlXCIpIHtcblx0XHRcdGxvZyhcImluZm9cIiwgXCJbSE1SXSBDaGVja2luZyBmb3IgdXBkYXRlcyBvbiB0aGUgc2VydmVyLi4uXCIpO1xuXHRcdFx0Y2hlY2soKTtcblx0XHR9XG5cdH0pO1xuXHRsb2coXCJpbmZvXCIsIFwiW0hNUl0gV2FpdGluZyBmb3IgdXBkYXRlIHNpZ25hbCBmcm9tIFdEUy4uLlwiKTtcbn0gZWxzZSB7XG5cdHRocm93IG5ldyBFcnJvcihcIltITVJdIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnQgaXMgZGlzYWJsZWQuXCIpO1xufVxuIiwidmFyIEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoXCJldmVudHNcIik7XG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiIsIi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5cbi8qKlxuICogQHBhcmFtIHsoc3RyaW5nIHwgbnVtYmVyKVtdfSB1cGRhdGVkTW9kdWxlcyB1cGRhdGVkIG1vZHVsZXNcbiAqIEBwYXJhbSB7KHN0cmluZyB8IG51bWJlcilbXSB8IG51bGx9IHJlbmV3ZWRNb2R1bGVzIHJlbmV3ZWQgbW9kdWxlc1xuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1cGRhdGVkTW9kdWxlcywgcmVuZXdlZE1vZHVsZXMpIHtcblx0dmFyIHVuYWNjZXB0ZWRNb2R1bGVzID0gdXBkYXRlZE1vZHVsZXMuZmlsdGVyKGZ1bmN0aW9uIChtb2R1bGVJZCkge1xuXHRcdHJldHVybiByZW5ld2VkTW9kdWxlcyAmJiByZW5ld2VkTW9kdWxlcy5pbmRleE9mKG1vZHVsZUlkKSA8IDA7XG5cdH0pO1xuXHR2YXIgbG9nID0gcmVxdWlyZShcIi4vbG9nXCIpO1xuXG5cdGlmICh1bmFjY2VwdGVkTW9kdWxlcy5sZW5ndGggPiAwKSB7XG5cdFx0bG9nKFxuXHRcdFx0XCJ3YXJuaW5nXCIsXG5cdFx0XHRcIltITVJdIFRoZSBmb2xsb3dpbmcgbW9kdWxlcyBjb3VsZG4ndCBiZSBob3QgdXBkYXRlZDogKFRoZXkgd291bGQgbmVlZCBhIGZ1bGwgcmVsb2FkISlcIlxuXHRcdCk7XG5cdFx0dW5hY2NlcHRlZE1vZHVsZXMuZm9yRWFjaChmdW5jdGlvbiAobW9kdWxlSWQpIHtcblx0XHRcdGxvZyhcIndhcm5pbmdcIiwgXCJbSE1SXSAgLSBcIiArIG1vZHVsZUlkKTtcblx0XHR9KTtcblx0fVxuXG5cdGlmICghcmVuZXdlZE1vZHVsZXMgfHwgcmVuZXdlZE1vZHVsZXMubGVuZ3RoID09PSAwKSB7XG5cdFx0bG9nKFwiaW5mb1wiLCBcIltITVJdIE5vdGhpbmcgaG90IHVwZGF0ZWQuXCIpO1xuXHR9IGVsc2Uge1xuXHRcdGxvZyhcImluZm9cIiwgXCJbSE1SXSBVcGRhdGVkIG1vZHVsZXM6XCIpO1xuXHRcdHJlbmV3ZWRNb2R1bGVzLmZvckVhY2goZnVuY3Rpb24gKG1vZHVsZUlkKSB7XG5cdFx0XHRpZiAodHlwZW9mIG1vZHVsZUlkID09PSBcInN0cmluZ1wiICYmIG1vZHVsZUlkLmluZGV4T2YoXCIhXCIpICE9PSAtMSkge1xuXHRcdFx0XHR2YXIgcGFydHMgPSBtb2R1bGVJZC5zcGxpdChcIiFcIik7XG5cdFx0XHRcdGxvZy5ncm91cENvbGxhcHNlZChcImluZm9cIiwgXCJbSE1SXSAgLSBcIiArIHBhcnRzLnBvcCgpKTtcblx0XHRcdFx0bG9nKFwiaW5mb1wiLCBcIltITVJdICAtIFwiICsgbW9kdWxlSWQpO1xuXHRcdFx0XHRsb2cuZ3JvdXBFbmQoXCJpbmZvXCIpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0bG9nKFwiaW5mb1wiLCBcIltITVJdICAtIFwiICsgbW9kdWxlSWQpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHZhciBudW1iZXJJZHMgPSByZW5ld2VkTW9kdWxlcy5ldmVyeShmdW5jdGlvbiAobW9kdWxlSWQpIHtcblx0XHRcdHJldHVybiB0eXBlb2YgbW9kdWxlSWQgPT09IFwibnVtYmVyXCI7XG5cdFx0fSk7XG5cdFx0aWYgKG51bWJlcklkcylcblx0XHRcdGxvZyhcblx0XHRcdFx0XCJpbmZvXCIsXG5cdFx0XHRcdCdbSE1SXSBDb25zaWRlciB1c2luZyB0aGUgb3B0aW1pemF0aW9uLm1vZHVsZUlkczogXCJuYW1lZFwiIGZvciBtb2R1bGUgbmFtZXMuJ1xuXHRcdFx0KTtcblx0fVxufTtcbiIsIi8qKiBAdHlwZWRlZiB7XCJpbmZvXCIgfCBcIndhcm5pbmdcIiB8IFwiZXJyb3JcIn0gTG9nTGV2ZWwgKi9cblxuLyoqIEB0eXBlIHtMb2dMZXZlbH0gKi9cbnZhciBsb2dMZXZlbCA9IFwiaW5mb1wiO1xuXG5mdW5jdGlvbiBkdW1teSgpIHt9XG5cbi8qKlxuICogQHBhcmFtIHtMb2dMZXZlbH0gbGV2ZWwgbG9nIGxldmVsXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gdHJ1ZSwgaWYgc2hvdWxkIGxvZ1xuICovXG5mdW5jdGlvbiBzaG91bGRMb2cobGV2ZWwpIHtcblx0dmFyIHNob3VsZExvZyA9XG5cdFx0KGxvZ0xldmVsID09PSBcImluZm9cIiAmJiBsZXZlbCA9PT0gXCJpbmZvXCIpIHx8XG5cdFx0KFtcImluZm9cIiwgXCJ3YXJuaW5nXCJdLmluZGV4T2YobG9nTGV2ZWwpID49IDAgJiYgbGV2ZWwgPT09IFwid2FybmluZ1wiKSB8fFxuXHRcdChbXCJpbmZvXCIsIFwid2FybmluZ1wiLCBcImVycm9yXCJdLmluZGV4T2YobG9nTGV2ZWwpID49IDAgJiYgbGV2ZWwgPT09IFwiZXJyb3JcIik7XG5cdHJldHVybiBzaG91bGRMb2c7XG59XG5cbi8qKlxuICogQHBhcmFtIHsobXNnPzogc3RyaW5nKSA9PiB2b2lkfSBsb2dGbiBsb2cgZnVuY3Rpb25cbiAqIEByZXR1cm5zIHsobGV2ZWw6IExvZ0xldmVsLCBtc2c/OiBzdHJpbmcpID0+IHZvaWR9IGZ1bmN0aW9uIHRoYXQgbG9ncyB3aGVuIGxvZyBsZXZlbCBpcyBzdWZmaWNpZW50XG4gKi9cbmZ1bmN0aW9uIGxvZ0dyb3VwKGxvZ0ZuKSB7XG5cdHJldHVybiBmdW5jdGlvbiAobGV2ZWwsIG1zZykge1xuXHRcdGlmIChzaG91bGRMb2cobGV2ZWwpKSB7XG5cdFx0XHRsb2dGbihtc2cpO1xuXHRcdH1cblx0fTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge0xvZ0xldmVsfSBsZXZlbCBsb2cgbGV2ZWxcbiAqIEBwYXJhbSB7c3RyaW5nfEVycm9yfSBtc2cgbWVzc2FnZVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsZXZlbCwgbXNnKSB7XG5cdGlmIChzaG91bGRMb2cobGV2ZWwpKSB7XG5cdFx0aWYgKGxldmVsID09PSBcImluZm9cIikge1xuXHRcdFx0Y29uc29sZS5sb2cobXNnKTtcblx0XHR9IGVsc2UgaWYgKGxldmVsID09PSBcIndhcm5pbmdcIikge1xuXHRcdFx0Y29uc29sZS53YXJuKG1zZyk7XG5cdFx0fSBlbHNlIGlmIChsZXZlbCA9PT0gXCJlcnJvclwiKSB7XG5cdFx0XHRjb25zb2xlLmVycm9yKG1zZyk7XG5cdFx0fVxuXHR9XG59O1xuXG52YXIgZ3JvdXAgPSBjb25zb2xlLmdyb3VwIHx8IGR1bW15O1xudmFyIGdyb3VwQ29sbGFwc2VkID0gY29uc29sZS5ncm91cENvbGxhcHNlZCB8fCBkdW1teTtcbnZhciBncm91cEVuZCA9IGNvbnNvbGUuZ3JvdXBFbmQgfHwgZHVtbXk7XG5cbm1vZHVsZS5leHBvcnRzLmdyb3VwID0gbG9nR3JvdXAoZ3JvdXApO1xuXG5tb2R1bGUuZXhwb3J0cy5ncm91cENvbGxhcHNlZCA9IGxvZ0dyb3VwKGdyb3VwQ29sbGFwc2VkKTtcblxubW9kdWxlLmV4cG9ydHMuZ3JvdXBFbmQgPSBsb2dHcm91cChncm91cEVuZCk7XG5cbi8qKlxuICogQHBhcmFtIHtMb2dMZXZlbH0gbGV2ZWwgbG9nIGxldmVsXG4gKi9cbm1vZHVsZS5leHBvcnRzLnNldExvZ0xldmVsID0gZnVuY3Rpb24gKGxldmVsKSB7XG5cdGxvZ0xldmVsID0gbGV2ZWw7XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7RXJyb3J9IGVyciBlcnJvclxuICogQHJldHVybnMge3N0cmluZ30gZm9ybWF0dGVkIGVycm9yXG4gKi9cbm1vZHVsZS5leHBvcnRzLmZvcm1hdEVycm9yID0gZnVuY3Rpb24gKGVycikge1xuXHR2YXIgbWVzc2FnZSA9IGVyci5tZXNzYWdlO1xuXHR2YXIgc3RhY2sgPSBlcnIuc3RhY2s7XG5cdGlmICghc3RhY2spIHtcblx0XHRyZXR1cm4gbWVzc2FnZTtcblx0fSBlbHNlIGlmIChzdGFjay5pbmRleE9mKG1lc3NhZ2UpIDwgMCkge1xuXHRcdHJldHVybiBtZXNzYWdlICsgXCJcXG5cIiArIHN0YWNrO1xuXHR9IGVsc2Uge1xuXHRcdHJldHVybiBzdGFjaztcblx0fVxufTtcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9O1xuICAgIGlmKG1vZHVsZS5ob3QpIHtcbiAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGxvY2Fsc0pzb25TdHJpbmcgPSB1bmRlZmluZWQ7XG4gICAgICAgIC8vIDE3MTc1MzA5NzYwOThcbiAgICAgICAgdmFyIGNzc1JlbG9hZCA9IHJlcXVpcmUoXCIuLi9ub2RlX21vZHVsZXMvbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4vZGlzdC9obXIvaG90TW9kdWxlUmVwbGFjZW1lbnQuanNcIikobW9kdWxlLmlkLCB7XCJwdWJsaWNQYXRoXCI6XCJcIn0pO1xuICAgICAgICAvLyBvbmx5IGludmFsaWRhdGUgd2hlbiBsb2NhbHMgY2hhbmdlXG4gICAgICAgIGlmIChcbiAgICAgICAgICBtb2R1bGUuaG90LmRhdGEgJiZcbiAgICAgICAgICBtb2R1bGUuaG90LmRhdGEudmFsdWUgJiZcbiAgICAgICAgICBtb2R1bGUuaG90LmRhdGEudmFsdWUgIT09IGxvY2Fsc0pzb25TdHJpbmdcbiAgICAgICAgKSB7XG4gICAgICAgICAgbW9kdWxlLmhvdC5pbnZhbGlkYXRlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbW9kdWxlLmhvdC5hY2NlcHQoKTtcbiAgICAgICAgfVxuICAgICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgIGRhdGEudmFsdWUgPSBsb2NhbHNKc29uU3RyaW5nO1xuICAgICAgICAgIGNzc1JlbG9hZCgpO1xuICAgICAgICB9KTtcbiAgICAgIH0pKCk7XG4gICAgfVxuICAiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdHZhciBleGVjT3B0aW9ucyA9IHsgaWQ6IG1vZHVsZUlkLCBtb2R1bGU6IG1vZHVsZSwgZmFjdG9yeTogX193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0sIHJlcXVpcmU6IF9fd2VicGFja19yZXF1aXJlX18gfTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5pLmZvckVhY2goZnVuY3Rpb24oaGFuZGxlcikgeyBoYW5kbGVyKGV4ZWNPcHRpb25zKTsgfSk7XG5cdG1vZHVsZSA9IGV4ZWNPcHRpb25zLm1vZHVsZTtcblx0ZXhlY09wdGlvbnMuZmFjdG9yeS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBleGVjT3B0aW9ucy5yZXF1aXJlKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4vLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuX193ZWJwYWNrX3JlcXVpcmVfXy5jID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fO1xuXG4vLyBleHBvc2UgdGhlIG1vZHVsZSBleGVjdXRpb24gaW50ZXJjZXB0b3Jcbl9fd2VicGFja19yZXF1aXJlX18uaSA9IFtdO1xuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIi8vIFRoaXMgZnVuY3Rpb24gYWxsb3cgdG8gcmVmZXJlbmNlIGFsbCBjaHVua3Ncbl9fd2VicGFja19yZXF1aXJlX18uaHUgPSAoY2h1bmtJZCkgPT4ge1xuXHQvLyByZXR1cm4gdXJsIGZvciBmaWxlbmFtZXMgYmFzZWQgb24gdGVtcGxhdGVcblx0cmV0dXJuIFwiXCIgKyBjaHVua0lkICsgXCIuXCIgKyBfX3dlYnBhY2tfcmVxdWlyZV9fLmgoKSArIFwiLmhvdC11cGRhdGUuanNcIjtcbn07IiwiLy8gVGhpcyBmdW5jdGlvbiBhbGxvdyB0byByZWZlcmVuY2UgYXN5bmMgY2h1bmtzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm1pbmlDc3NGID0gKGNodW5rSWQpID0+IHtcblx0Ly8gcmV0dXJuIHVybCBmb3IgZmlsZW5hbWVzIGJhc2VkIG9uIHRlbXBsYXRlXG5cdHJldHVybiB1bmRlZmluZWQ7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uaG1yRiA9ICgpID0+IChcIm1haW4uXCIgKyBfX3dlYnBhY2tfcmVxdWlyZV9fLmgoKSArIFwiLmhvdC11cGRhdGUuanNvblwiKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSAoKSA9PiAoXCJlZjczYjg4MTFiZDVmZGM0MGZhOVwiKSIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsInZhciBpblByb2dyZXNzID0ge307XG52YXIgZGF0YVdlYnBhY2tQcmVmaXggPSBcInZhbmlsbGEtanMtcHJvamVjdDpcIjtcbi8vIGxvYWRTY3JpcHQgZnVuY3Rpb24gdG8gbG9hZCBhIHNjcmlwdCB2aWEgc2NyaXB0IHRhZ1xuX193ZWJwYWNrX3JlcXVpcmVfXy5sID0gKHVybCwgZG9uZSwga2V5LCBjaHVua0lkKSA9PiB7XG5cdGlmKGluUHJvZ3Jlc3NbdXJsXSkgeyBpblByb2dyZXNzW3VybF0ucHVzaChkb25lKTsgcmV0dXJuOyB9XG5cdHZhciBzY3JpcHQsIG5lZWRBdHRhY2g7XG5cdGlmKGtleSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgc2NyaXB0cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIHMgPSBzY3JpcHRzW2ldO1xuXHRcdFx0aWYocy5nZXRBdHRyaWJ1dGUoXCJzcmNcIikgPT0gdXJsIHx8IHMuZ2V0QXR0cmlidXRlKFwiZGF0YS13ZWJwYWNrXCIpID09IGRhdGFXZWJwYWNrUHJlZml4ICsga2V5KSB7IHNjcmlwdCA9IHM7IGJyZWFrOyB9XG5cdFx0fVxuXHR9XG5cdGlmKCFzY3JpcHQpIHtcblx0XHRuZWVkQXR0YWNoID0gdHJ1ZTtcblx0XHRzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcblxuXHRcdHNjcmlwdC5jaGFyc2V0ID0gJ3V0Zi04Jztcblx0XHRzY3JpcHQudGltZW91dCA9IDEyMDtcblx0XHRpZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5uYykge1xuXHRcdFx0c2NyaXB0LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIF9fd2VicGFja19yZXF1aXJlX18ubmMpO1xuXHRcdH1cblx0XHRzY3JpcHQuc2V0QXR0cmlidXRlKFwiZGF0YS13ZWJwYWNrXCIsIGRhdGFXZWJwYWNrUHJlZml4ICsga2V5KTtcblxuXHRcdHNjcmlwdC5zcmMgPSB1cmw7XG5cdH1cblx0aW5Qcm9ncmVzc1t1cmxdID0gW2RvbmVdO1xuXHR2YXIgb25TY3JpcHRDb21wbGV0ZSA9IChwcmV2LCBldmVudCkgPT4ge1xuXHRcdC8vIGF2b2lkIG1lbSBsZWFrcyBpbiBJRS5cblx0XHRzY3JpcHQub25lcnJvciA9IHNjcmlwdC5vbmxvYWQgPSBudWxsO1xuXHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcblx0XHR2YXIgZG9uZUZucyA9IGluUHJvZ3Jlc3NbdXJsXTtcblx0XHRkZWxldGUgaW5Qcm9ncmVzc1t1cmxdO1xuXHRcdHNjcmlwdC5wYXJlbnROb2RlICYmIHNjcmlwdC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHNjcmlwdCk7XG5cdFx0ZG9uZUZucyAmJiBkb25lRm5zLmZvckVhY2goKGZuKSA9PiAoZm4oZXZlbnQpKSk7XG5cdFx0aWYocHJldikgcmV0dXJuIHByZXYoZXZlbnQpO1xuXHR9XG5cdHZhciB0aW1lb3V0ID0gc2V0VGltZW91dChvblNjcmlwdENvbXBsZXRlLmJpbmQobnVsbCwgdW5kZWZpbmVkLCB7IHR5cGU6ICd0aW1lb3V0JywgdGFyZ2V0OiBzY3JpcHQgfSksIDEyMDAwMCk7XG5cdHNjcmlwdC5vbmVycm9yID0gb25TY3JpcHRDb21wbGV0ZS5iaW5kKG51bGwsIHNjcmlwdC5vbmVycm9yKTtcblx0c2NyaXB0Lm9ubG9hZCA9IG9uU2NyaXB0Q29tcGxldGUuYmluZChudWxsLCBzY3JpcHQub25sb2FkKTtcblx0bmVlZEF0dGFjaCAmJiBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG59OyIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBjdXJyZW50TW9kdWxlRGF0YSA9IHt9O1xudmFyIGluc3RhbGxlZE1vZHVsZXMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmM7XG5cbi8vIG1vZHVsZSBhbmQgcmVxdWlyZSBjcmVhdGlvblxudmFyIGN1cnJlbnRDaGlsZE1vZHVsZTtcbnZhciBjdXJyZW50UGFyZW50cyA9IFtdO1xuXG4vLyBzdGF0dXNcbnZhciByZWdpc3RlcmVkU3RhdHVzSGFuZGxlcnMgPSBbXTtcbnZhciBjdXJyZW50U3RhdHVzID0gXCJpZGxlXCI7XG5cbi8vIHdoaWxlIGRvd25sb2FkaW5nXG52YXIgYmxvY2tpbmdQcm9taXNlcyA9IDA7XG52YXIgYmxvY2tpbmdQcm9taXNlc1dhaXRpbmcgPSBbXTtcblxuLy8gVGhlIHVwZGF0ZSBpbmZvXG52YXIgY3VycmVudFVwZGF0ZUFwcGx5SGFuZGxlcnM7XG52YXIgcXVldWVkSW52YWxpZGF0ZWRNb2R1bGVzO1xuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmhtckQgPSBjdXJyZW50TW9kdWxlRGF0YTtcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5pLnB1c2goZnVuY3Rpb24gKG9wdGlvbnMpIHtcblx0dmFyIG1vZHVsZSA9IG9wdGlvbnMubW9kdWxlO1xuXHR2YXIgcmVxdWlyZSA9IGNyZWF0ZVJlcXVpcmUob3B0aW9ucy5yZXF1aXJlLCBvcHRpb25zLmlkKTtcblx0bW9kdWxlLmhvdCA9IGNyZWF0ZU1vZHVsZUhvdE9iamVjdChvcHRpb25zLmlkLCBtb2R1bGUpO1xuXHRtb2R1bGUucGFyZW50cyA9IGN1cnJlbnRQYXJlbnRzO1xuXHRtb2R1bGUuY2hpbGRyZW4gPSBbXTtcblx0Y3VycmVudFBhcmVudHMgPSBbXTtcblx0b3B0aW9ucy5yZXF1aXJlID0gcmVxdWlyZTtcbn0pO1xuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmhtckMgPSB7fTtcbl9fd2VicGFja19yZXF1aXJlX18uaG1ySSA9IHt9O1xuXG5mdW5jdGlvbiBjcmVhdGVSZXF1aXJlKHJlcXVpcmUsIG1vZHVsZUlkKSB7XG5cdHZhciBtZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuXHRpZiAoIW1lKSByZXR1cm4gcmVxdWlyZTtcblx0dmFyIGZuID0gZnVuY3Rpb24gKHJlcXVlc3QpIHtcblx0XHRpZiAobWUuaG90LmFjdGl2ZSkge1xuXHRcdFx0aWYgKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0pIHtcblx0XHRcdFx0dmFyIHBhcmVudHMgPSBpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHM7XG5cdFx0XHRcdGlmIChwYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpID09PSAtMSkge1xuXHRcdFx0XHRcdHBhcmVudHMucHVzaChtb2R1bGVJZCk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGN1cnJlbnRQYXJlbnRzID0gW21vZHVsZUlkXTtcblx0XHRcdFx0Y3VycmVudENoaWxkTW9kdWxlID0gcmVxdWVzdDtcblx0XHRcdH1cblx0XHRcdGlmIChtZS5jaGlsZHJlbi5pbmRleE9mKHJlcXVlc3QpID09PSAtMSkge1xuXHRcdFx0XHRtZS5jaGlsZHJlbi5wdXNoKHJlcXVlc3QpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zb2xlLndhcm4oXG5cdFx0XHRcdFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICtcblx0XHRcdFx0XHRyZXF1ZXN0ICtcblx0XHRcdFx0XHRcIikgZnJvbSBkaXNwb3NlZCBtb2R1bGUgXCIgK1xuXHRcdFx0XHRcdG1vZHVsZUlkXG5cdFx0XHQpO1xuXHRcdFx0Y3VycmVudFBhcmVudHMgPSBbXTtcblx0XHR9XG5cdFx0cmV0dXJuIHJlcXVpcmUocmVxdWVzdCk7XG5cdH07XG5cdHZhciBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IgPSBmdW5jdGlvbiAobmFtZSkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRjb25maWd1cmFibGU6IHRydWUsXG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0OiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHJldHVybiByZXF1aXJlW25hbWVdO1xuXHRcdFx0fSxcblx0XHRcdHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG5cdFx0XHRcdHJlcXVpcmVbbmFtZV0gPSB2YWx1ZTtcblx0XHRcdH1cblx0XHR9O1xuXHR9O1xuXHRmb3IgKHZhciBuYW1lIGluIHJlcXVpcmUpIHtcblx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHJlcXVpcmUsIG5hbWUpICYmIG5hbWUgIT09IFwiZVwiKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZm4sIG5hbWUsIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvcihuYW1lKSk7XG5cdFx0fVxuXHR9XG5cdGZuLmUgPSBmdW5jdGlvbiAoY2h1bmtJZCwgZmV0Y2hQcmlvcml0eSkge1xuXHRcdHJldHVybiB0cmFja0Jsb2NraW5nUHJvbWlzZShyZXF1aXJlLmUoY2h1bmtJZCwgZmV0Y2hQcmlvcml0eSkpO1xuXHR9O1xuXHRyZXR1cm4gZm47XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZU1vZHVsZUhvdE9iamVjdChtb2R1bGVJZCwgbWUpIHtcblx0dmFyIF9tYWluID0gY3VycmVudENoaWxkTW9kdWxlICE9PSBtb2R1bGVJZDtcblx0dmFyIGhvdCA9IHtcblx0XHQvLyBwcml2YXRlIHN0dWZmXG5cdFx0X2FjY2VwdGVkRGVwZW5kZW5jaWVzOiB7fSxcblx0XHRfYWNjZXB0ZWRFcnJvckhhbmRsZXJzOiB7fSxcblx0XHRfZGVjbGluZWREZXBlbmRlbmNpZXM6IHt9LFxuXHRcdF9zZWxmQWNjZXB0ZWQ6IGZhbHNlLFxuXHRcdF9zZWxmRGVjbGluZWQ6IGZhbHNlLFxuXHRcdF9zZWxmSW52YWxpZGF0ZWQ6IGZhbHNlLFxuXHRcdF9kaXNwb3NlSGFuZGxlcnM6IFtdLFxuXHRcdF9tYWluOiBfbWFpbixcblx0XHRfcmVxdWlyZVNlbGY6IGZ1bmN0aW9uICgpIHtcblx0XHRcdGN1cnJlbnRQYXJlbnRzID0gbWUucGFyZW50cy5zbGljZSgpO1xuXHRcdFx0Y3VycmVudENoaWxkTW9kdWxlID0gX21haW4gPyB1bmRlZmluZWQgOiBtb2R1bGVJZDtcblx0XHRcdF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpO1xuXHRcdH0sXG5cblx0XHQvLyBNb2R1bGUgQVBJXG5cdFx0YWN0aXZlOiB0cnVlLFxuXHRcdGFjY2VwdDogZnVuY3Rpb24gKGRlcCwgY2FsbGJhY2ssIGVycm9ySGFuZGxlcikge1xuXHRcdFx0aWYgKGRlcCA9PT0gdW5kZWZpbmVkKSBob3QuX3NlbGZBY2NlcHRlZCA9IHRydWU7XG5cdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcImZ1bmN0aW9uXCIpIGhvdC5fc2VsZkFjY2VwdGVkID0gZGVwO1xuXHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIiAmJiBkZXAgIT09IG51bGwpIHtcblx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbiAoKSB7fTtcblx0XHRcdFx0XHRob3QuX2FjY2VwdGVkRXJyb3JIYW5kbGVyc1tkZXBbaV1dID0gZXJyb3JIYW5kbGVyO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcF0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbiAoKSB7fTtcblx0XHRcdFx0aG90Ll9hY2NlcHRlZEVycm9ySGFuZGxlcnNbZGVwXSA9IGVycm9ySGFuZGxlcjtcblx0XHRcdH1cblx0XHR9LFxuXHRcdGRlY2xpbmU6IGZ1bmN0aW9uIChkZXApIHtcblx0XHRcdGlmIChkZXAgPT09IHVuZGVmaW5lZCkgaG90Ll9zZWxmRGVjbGluZWQgPSB0cnVlO1xuXHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIiAmJiBkZXAgIT09IG51bGwpXG5cdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxuXHRcdFx0XHRcdGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IHRydWU7XG5cdFx0XHRlbHNlIGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwXSA9IHRydWU7XG5cdFx0fSxcblx0XHRkaXNwb3NlOiBmdW5jdGlvbiAoY2FsbGJhY2spIHtcblx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuXHRcdH0sXG5cdFx0YWRkRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuXHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XG5cdFx0fSxcblx0XHRyZW1vdmVEaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG5cdFx0XHR2YXIgaWR4ID0gaG90Ll9kaXNwb3NlSGFuZGxlcnMuaW5kZXhPZihjYWxsYmFjayk7XG5cdFx0XHRpZiAoaWR4ID49IDApIGhvdC5fZGlzcG9zZUhhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xuXHRcdH0sXG5cdFx0aW52YWxpZGF0ZTogZnVuY3Rpb24gKCkge1xuXHRcdFx0dGhpcy5fc2VsZkludmFsaWRhdGVkID0gdHJ1ZTtcblx0XHRcdHN3aXRjaCAoY3VycmVudFN0YXR1cykge1xuXHRcdFx0XHRjYXNlIFwiaWRsZVwiOlxuXHRcdFx0XHRcdGN1cnJlbnRVcGRhdGVBcHBseUhhbmRsZXJzID0gW107XG5cdFx0XHRcdFx0T2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5obXJJKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18uaG1ySVtrZXldKFxuXHRcdFx0XHRcdFx0XHRtb2R1bGVJZCxcblx0XHRcdFx0XHRcdFx0Y3VycmVudFVwZGF0ZUFwcGx5SGFuZGxlcnNcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0c2V0U3RhdHVzKFwicmVhZHlcIik7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJyZWFkeVwiOlxuXHRcdFx0XHRcdE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uaG1ySSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG5cdFx0XHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmhtcklba2V5XShcblx0XHRcdFx0XHRcdFx0bW9kdWxlSWQsXG5cdFx0XHRcdFx0XHRcdGN1cnJlbnRVcGRhdGVBcHBseUhhbmRsZXJzXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFwicHJlcGFyZVwiOlxuXHRcdFx0XHRjYXNlIFwiY2hlY2tcIjpcblx0XHRcdFx0Y2FzZSBcImRpc3Bvc2VcIjpcblx0XHRcdFx0Y2FzZSBcImFwcGx5XCI6XG5cdFx0XHRcdFx0KHF1ZXVlZEludmFsaWRhdGVkTW9kdWxlcyA9IHF1ZXVlZEludmFsaWRhdGVkTW9kdWxlcyB8fCBbXSkucHVzaChcblx0XHRcdFx0XHRcdG1vZHVsZUlkXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHQvLyBpZ25vcmUgcmVxdWVzdHMgaW4gZXJyb3Igc3RhdGVzXG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8vIE1hbmFnZW1lbnQgQVBJXG5cdFx0Y2hlY2s6IGhvdENoZWNrLFxuXHRcdGFwcGx5OiBob3RBcHBseSxcblx0XHRzdGF0dXM6IGZ1bmN0aW9uIChsKSB7XG5cdFx0XHRpZiAoIWwpIHJldHVybiBjdXJyZW50U3RhdHVzO1xuXHRcdFx0cmVnaXN0ZXJlZFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG5cdFx0fSxcblx0XHRhZGRTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbiAobCkge1xuXHRcdFx0cmVnaXN0ZXJlZFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG5cdFx0fSxcblx0XHRyZW1vdmVTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbiAobCkge1xuXHRcdFx0dmFyIGlkeCA9IHJlZ2lzdGVyZWRTdGF0dXNIYW5kbGVycy5pbmRleE9mKGwpO1xuXHRcdFx0aWYgKGlkeCA+PSAwKSByZWdpc3RlcmVkU3RhdHVzSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG5cdFx0fSxcblxuXHRcdC8vaW5oZXJpdCBmcm9tIHByZXZpb3VzIGRpc3Bvc2UgY2FsbFxuXHRcdGRhdGE6IGN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXVxuXHR9O1xuXHRjdXJyZW50Q2hpbGRNb2R1bGUgPSB1bmRlZmluZWQ7XG5cdHJldHVybiBob3Q7XG59XG5cbmZ1bmN0aW9uIHNldFN0YXR1cyhuZXdTdGF0dXMpIHtcblx0Y3VycmVudFN0YXR1cyA9IG5ld1N0YXR1cztcblx0dmFyIHJlc3VsdHMgPSBbXTtcblxuXHRmb3IgKHZhciBpID0gMDsgaSA8IHJlZ2lzdGVyZWRTdGF0dXNIYW5kbGVycy5sZW5ndGg7IGkrKylcblx0XHRyZXN1bHRzW2ldID0gcmVnaXN0ZXJlZFN0YXR1c0hhbmRsZXJzW2ldLmNhbGwobnVsbCwgbmV3U3RhdHVzKTtcblxuXHRyZXR1cm4gUHJvbWlzZS5hbGwocmVzdWx0cykudGhlbihmdW5jdGlvbiAoKSB7fSk7XG59XG5cbmZ1bmN0aW9uIHVuYmxvY2soKSB7XG5cdGlmICgtLWJsb2NraW5nUHJvbWlzZXMgPT09IDApIHtcblx0XHRzZXRTdGF0dXMoXCJyZWFkeVwiKS50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdGlmIChibG9ja2luZ1Byb21pc2VzID09PSAwKSB7XG5cdFx0XHRcdHZhciBsaXN0ID0gYmxvY2tpbmdQcm9taXNlc1dhaXRpbmc7XG5cdFx0XHRcdGJsb2NraW5nUHJvbWlzZXNXYWl0aW5nID0gW107XG5cdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdGxpc3RbaV0oKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHRyYWNrQmxvY2tpbmdQcm9taXNlKHByb21pc2UpIHtcblx0c3dpdGNoIChjdXJyZW50U3RhdHVzKSB7XG5cdFx0Y2FzZSBcInJlYWR5XCI6XG5cdFx0XHRzZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xuXHRcdC8qIGZhbGx0aHJvdWdoICovXG5cdFx0Y2FzZSBcInByZXBhcmVcIjpcblx0XHRcdGJsb2NraW5nUHJvbWlzZXMrKztcblx0XHRcdHByb21pc2UudGhlbih1bmJsb2NrLCB1bmJsb2NrKTtcblx0XHRcdHJldHVybiBwcm9taXNlO1xuXHRcdGRlZmF1bHQ6XG5cdFx0XHRyZXR1cm4gcHJvbWlzZTtcblx0fVxufVxuXG5mdW5jdGlvbiB3YWl0Rm9yQmxvY2tpbmdQcm9taXNlcyhmbikge1xuXHRpZiAoYmxvY2tpbmdQcm9taXNlcyA9PT0gMCkgcmV0dXJuIGZuKCk7XG5cdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuXHRcdGJsb2NraW5nUHJvbWlzZXNXYWl0aW5nLnB1c2goZnVuY3Rpb24gKCkge1xuXHRcdFx0cmVzb2x2ZShmbigpKTtcblx0XHR9KTtcblx0fSk7XG59XG5cbmZ1bmN0aW9uIGhvdENoZWNrKGFwcGx5T25VcGRhdGUpIHtcblx0aWYgKGN1cnJlbnRTdGF0dXMgIT09IFwiaWRsZVwiKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiY2hlY2soKSBpcyBvbmx5IGFsbG93ZWQgaW4gaWRsZSBzdGF0dXNcIik7XG5cdH1cblx0cmV0dXJuIHNldFN0YXR1cyhcImNoZWNrXCIpXG5cdFx0LnRoZW4oX193ZWJwYWNrX3JlcXVpcmVfXy5obXJNKVxuXHRcdC50aGVuKGZ1bmN0aW9uICh1cGRhdGUpIHtcblx0XHRcdGlmICghdXBkYXRlKSB7XG5cdFx0XHRcdHJldHVybiBzZXRTdGF0dXMoYXBwbHlJbnZhbGlkYXRlZE1vZHVsZXMoKSA/IFwicmVhZHlcIiA6IFwiaWRsZVwiKS50aGVuKFxuXHRcdFx0XHRcdGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdHJldHVybiBudWxsO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0KTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHNldFN0YXR1cyhcInByZXBhcmVcIikudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHZhciB1cGRhdGVkTW9kdWxlcyA9IFtdO1xuXHRcdFx0XHRjdXJyZW50VXBkYXRlQXBwbHlIYW5kbGVycyA9IFtdO1xuXG5cdFx0XHRcdHJldHVybiBQcm9taXNlLmFsbChcblx0XHRcdFx0XHRPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLmhtckMpLnJlZHVjZShmdW5jdGlvbiAoXG5cdFx0XHRcdFx0XHRwcm9taXNlcyxcblx0XHRcdFx0XHRcdGtleVxuXHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5obXJDW2tleV0oXG5cdFx0XHRcdFx0XHRcdHVwZGF0ZS5jLFxuXHRcdFx0XHRcdFx0XHR1cGRhdGUucixcblx0XHRcdFx0XHRcdFx0dXBkYXRlLm0sXG5cdFx0XHRcdFx0XHRcdHByb21pc2VzLFxuXHRcdFx0XHRcdFx0XHRjdXJyZW50VXBkYXRlQXBwbHlIYW5kbGVycyxcblx0XHRcdFx0XHRcdFx0dXBkYXRlZE1vZHVsZXNcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRyZXR1cm4gcHJvbWlzZXM7XG5cdFx0XHRcdFx0fSwgW10pXG5cdFx0XHRcdCkudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHdhaXRGb3JCbG9ja2luZ1Byb21pc2VzKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdGlmIChhcHBseU9uVXBkYXRlKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBpbnRlcm5hbEFwcGx5KGFwcGx5T25VcGRhdGUpO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHNldFN0YXR1cyhcInJlYWR5XCIpLnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiB1cGRhdGVkTW9kdWxlcztcblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG59XG5cbmZ1bmN0aW9uIGhvdEFwcGx5KG9wdGlvbnMpIHtcblx0aWYgKGN1cnJlbnRTdGF0dXMgIT09IFwicmVhZHlcIikge1xuXHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoKS50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihcblx0XHRcdFx0XCJhcHBseSgpIGlzIG9ubHkgYWxsb3dlZCBpbiByZWFkeSBzdGF0dXMgKHN0YXRlOiBcIiArXG5cdFx0XHRcdFx0Y3VycmVudFN0YXR1cyArXG5cdFx0XHRcdFx0XCIpXCJcblx0XHRcdCk7XG5cdFx0fSk7XG5cdH1cblx0cmV0dXJuIGludGVybmFsQXBwbHkob3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIGludGVybmFsQXBwbHkob3B0aW9ucykge1xuXHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuXHRhcHBseUludmFsaWRhdGVkTW9kdWxlcygpO1xuXG5cdHZhciByZXN1bHRzID0gY3VycmVudFVwZGF0ZUFwcGx5SGFuZGxlcnMubWFwKGZ1bmN0aW9uIChoYW5kbGVyKSB7XG5cdFx0cmV0dXJuIGhhbmRsZXIob3B0aW9ucyk7XG5cdH0pO1xuXHRjdXJyZW50VXBkYXRlQXBwbHlIYW5kbGVycyA9IHVuZGVmaW5lZDtcblxuXHR2YXIgZXJyb3JzID0gcmVzdWx0c1xuXHRcdC5tYXAoZnVuY3Rpb24gKHIpIHtcblx0XHRcdHJldHVybiByLmVycm9yO1xuXHRcdH0pXG5cdFx0LmZpbHRlcihCb29sZWFuKTtcblxuXHRpZiAoZXJyb3JzLmxlbmd0aCA+IDApIHtcblx0XHRyZXR1cm4gc2V0U3RhdHVzKFwiYWJvcnRcIikudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHR0aHJvdyBlcnJvcnNbMF07XG5cdFx0fSk7XG5cdH1cblxuXHQvLyBOb3cgaW4gXCJkaXNwb3NlXCIgcGhhc2Vcblx0dmFyIGRpc3Bvc2VQcm9taXNlID0gc2V0U3RhdHVzKFwiZGlzcG9zZVwiKTtcblxuXHRyZXN1bHRzLmZvckVhY2goZnVuY3Rpb24gKHJlc3VsdCkge1xuXHRcdGlmIChyZXN1bHQuZGlzcG9zZSkgcmVzdWx0LmRpc3Bvc2UoKTtcblx0fSk7XG5cblx0Ly8gTm93IGluIFwiYXBwbHlcIiBwaGFzZVxuXHR2YXIgYXBwbHlQcm9taXNlID0gc2V0U3RhdHVzKFwiYXBwbHlcIik7XG5cblx0dmFyIGVycm9yO1xuXHR2YXIgcmVwb3J0RXJyb3IgPSBmdW5jdGlvbiAoZXJyKSB7XG5cdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG5cdH07XG5cblx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xuXHRyZXN1bHRzLmZvckVhY2goZnVuY3Rpb24gKHJlc3VsdCkge1xuXHRcdGlmIChyZXN1bHQuYXBwbHkpIHtcblx0XHRcdHZhciBtb2R1bGVzID0gcmVzdWx0LmFwcGx5KHJlcG9ydEVycm9yKTtcblx0XHRcdGlmIChtb2R1bGVzKSB7XG5cdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbW9kdWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKG1vZHVsZXNbaV0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9KTtcblxuXHRyZXR1cm4gUHJvbWlzZS5hbGwoW2Rpc3Bvc2VQcm9taXNlLCBhcHBseVByb21pc2VdKS50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHQvLyBoYW5kbGUgZXJyb3JzIGluIGFjY2VwdCBoYW5kbGVycyBhbmQgc2VsZiBhY2NlcHRlZCBtb2R1bGUgbG9hZFxuXHRcdGlmIChlcnJvcikge1xuXHRcdFx0cmV0dXJuIHNldFN0YXR1cyhcImZhaWxcIikudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHRocm93IGVycm9yO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0aWYgKHF1ZXVlZEludmFsaWRhdGVkTW9kdWxlcykge1xuXHRcdFx0cmV0dXJuIGludGVybmFsQXBwbHkob3B0aW9ucykudGhlbihmdW5jdGlvbiAobGlzdCkge1xuXHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMuZm9yRWFjaChmdW5jdGlvbiAobW9kdWxlSWQpIHtcblx0XHRcdFx0XHRpZiAobGlzdC5pbmRleE9mKG1vZHVsZUlkKSA8IDApIGxpc3QucHVzaChtb2R1bGVJZCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRyZXR1cm4gbGlzdDtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdHJldHVybiBzZXRTdGF0dXMoXCJpZGxlXCIpLnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuIG91dGRhdGVkTW9kdWxlcztcblx0XHR9KTtcblx0fSk7XG59XG5cbmZ1bmN0aW9uIGFwcGx5SW52YWxpZGF0ZWRNb2R1bGVzKCkge1xuXHRpZiAocXVldWVkSW52YWxpZGF0ZWRNb2R1bGVzKSB7XG5cdFx0aWYgKCFjdXJyZW50VXBkYXRlQXBwbHlIYW5kbGVycykgY3VycmVudFVwZGF0ZUFwcGx5SGFuZGxlcnMgPSBbXTtcblx0XHRPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLmhtckkpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuXHRcdFx0cXVldWVkSW52YWxpZGF0ZWRNb2R1bGVzLmZvckVhY2goZnVuY3Rpb24gKG1vZHVsZUlkKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18uaG1ySVtrZXldKFxuXHRcdFx0XHRcdG1vZHVsZUlkLFxuXHRcdFx0XHRcdGN1cnJlbnRVcGRhdGVBcHBseUhhbmRsZXJzXG5cdFx0XHRcdCk7XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0XHRxdWV1ZWRJbnZhbGlkYXRlZE1vZHVsZXMgPSB1bmRlZmluZWQ7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cbn0iLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmM7XG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkge1xuXHRcdFx0dmFyIGkgPSBzY3JpcHRzLmxlbmd0aCAtIDE7XG5cdFx0XHR3aGlsZSAoaSA+IC0xICYmICghc2NyaXB0VXJsIHx8ICEvXmh0dHAocz8pOi8udGVzdChzY3JpcHRVcmwpKSkgc2NyaXB0VXJsID0gc2NyaXB0c1tpLS1dLnNyYztcblx0XHR9XG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsImlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybjtcbnZhciBjcmVhdGVTdHlsZXNoZWV0ID0gKGNodW5rSWQsIGZ1bGxocmVmLCBvbGRUYWcsIHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHR2YXIgbGlua1RhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xuXG5cdGxpbmtUYWcucmVsID0gXCJzdHlsZXNoZWV0XCI7XG5cdGxpbmtUYWcudHlwZSA9IFwidGV4dC9jc3NcIjtcblx0aWYgKF9fd2VicGFja19yZXF1aXJlX18ubmMpIHtcblx0XHRsaW5rVGFnLm5vbmNlID0gX193ZWJwYWNrX3JlcXVpcmVfXy5uYztcblx0fVxuXHR2YXIgb25MaW5rQ29tcGxldGUgPSAoZXZlbnQpID0+IHtcblx0XHQvLyBhdm9pZCBtZW0gbGVha3MuXG5cdFx0bGlua1RhZy5vbmVycm9yID0gbGlua1RhZy5vbmxvYWQgPSBudWxsO1xuXHRcdGlmIChldmVudC50eXBlID09PSAnbG9hZCcpIHtcblx0XHRcdHJlc29sdmUoKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dmFyIGVycm9yVHlwZSA9IGV2ZW50ICYmIGV2ZW50LnR5cGU7XG5cdFx0XHR2YXIgcmVhbEhyZWYgPSBldmVudCAmJiBldmVudC50YXJnZXQgJiYgZXZlbnQudGFyZ2V0LmhyZWYgfHwgZnVsbGhyZWY7XG5cdFx0XHR2YXIgZXJyID0gbmV3IEVycm9yKFwiTG9hZGluZyBDU1MgY2h1bmsgXCIgKyBjaHVua0lkICsgXCIgZmFpbGVkLlxcbihcIiArIGVycm9yVHlwZSArIFwiOiBcIiArIHJlYWxIcmVmICsgXCIpXCIpO1xuXHRcdFx0ZXJyLm5hbWUgPSBcIkNodW5rTG9hZEVycm9yXCI7XG5cdFx0XHRlcnIuY29kZSA9IFwiQ1NTX0NIVU5LX0xPQURfRkFJTEVEXCI7XG5cdFx0XHRlcnIudHlwZSA9IGVycm9yVHlwZTtcblx0XHRcdGVyci5yZXF1ZXN0ID0gcmVhbEhyZWY7XG5cdFx0XHRpZiAobGlua1RhZy5wYXJlbnROb2RlKSBsaW5rVGFnLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobGlua1RhZylcblx0XHRcdHJlamVjdChlcnIpO1xuXHRcdH1cblx0fVxuXHRsaW5rVGFnLm9uZXJyb3IgPSBsaW5rVGFnLm9ubG9hZCA9IG9uTGlua0NvbXBsZXRlO1xuXHRsaW5rVGFnLmhyZWYgPSBmdWxsaHJlZjtcblxuXG5cdGlmIChvbGRUYWcpIHtcblx0XHRvbGRUYWcucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUobGlua1RhZywgb2xkVGFnLm5leHRTaWJsaW5nKTtcblx0fSBlbHNlIHtcblx0XHRkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKGxpbmtUYWcpO1xuXHR9XG5cdHJldHVybiBsaW5rVGFnO1xufTtcbnZhciBmaW5kU3R5bGVzaGVldCA9IChocmVmLCBmdWxsaHJlZikgPT4ge1xuXHR2YXIgZXhpc3RpbmdMaW5rVGFncyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwibGlua1wiKTtcblx0Zm9yKHZhciBpID0gMDsgaSA8IGV4aXN0aW5nTGlua1RhZ3MubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgdGFnID0gZXhpc3RpbmdMaW5rVGFnc1tpXTtcblx0XHR2YXIgZGF0YUhyZWYgPSB0YWcuZ2V0QXR0cmlidXRlKFwiZGF0YS1ocmVmXCIpIHx8IHRhZy5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpO1xuXHRcdGlmKHRhZy5yZWwgPT09IFwic3R5bGVzaGVldFwiICYmIChkYXRhSHJlZiA9PT0gaHJlZiB8fCBkYXRhSHJlZiA9PT0gZnVsbGhyZWYpKSByZXR1cm4gdGFnO1xuXHR9XG5cdHZhciBleGlzdGluZ1N0eWxlVGFncyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic3R5bGVcIik7XG5cdGZvcih2YXIgaSA9IDA7IGkgPCBleGlzdGluZ1N0eWxlVGFncy5sZW5ndGg7IGkrKykge1xuXHRcdHZhciB0YWcgPSBleGlzdGluZ1N0eWxlVGFnc1tpXTtcblx0XHR2YXIgZGF0YUhyZWYgPSB0YWcuZ2V0QXR0cmlidXRlKFwiZGF0YS1ocmVmXCIpO1xuXHRcdGlmKGRhdGFIcmVmID09PSBocmVmIHx8IGRhdGFIcmVmID09PSBmdWxsaHJlZikgcmV0dXJuIHRhZztcblx0fVxufTtcbnZhciBsb2FkU3R5bGVzaGVldCA9IChjaHVua0lkKSA9PiB7XG5cdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0dmFyIGhyZWYgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLm1pbmlDc3NGKGNodW5rSWQpO1xuXHRcdHZhciBmdWxsaHJlZiA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIGhyZWY7XG5cdFx0aWYoZmluZFN0eWxlc2hlZXQoaHJlZiwgZnVsbGhyZWYpKSByZXR1cm4gcmVzb2x2ZSgpO1xuXHRcdGNyZWF0ZVN0eWxlc2hlZXQoY2h1bmtJZCwgZnVsbGhyZWYsIG51bGwsIHJlc29sdmUsIHJlamVjdCk7XG5cdH0pO1xufVxuLy8gbm8gY2h1bmsgbG9hZGluZ1xuXG52YXIgb2xkVGFncyA9IFtdO1xudmFyIG5ld1RhZ3MgPSBbXTtcbnZhciBhcHBseUhhbmRsZXIgPSAob3B0aW9ucykgPT4ge1xuXHRyZXR1cm4geyBkaXNwb3NlOiAoKSA9PiB7XG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IG9sZFRhZ3MubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBvbGRUYWcgPSBvbGRUYWdzW2ldO1xuXHRcdFx0aWYob2xkVGFnLnBhcmVudE5vZGUpIG9sZFRhZy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG9sZFRhZyk7XG5cdFx0fVxuXHRcdG9sZFRhZ3MubGVuZ3RoID0gMDtcblx0fSwgYXBwbHk6ICgpID0+IHtcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgbmV3VGFncy5sZW5ndGg7IGkrKykgbmV3VGFnc1tpXS5yZWwgPSBcInN0eWxlc2hlZXRcIjtcblx0XHRuZXdUYWdzLmxlbmd0aCA9IDA7XG5cdH0gfTtcbn1cbl9fd2VicGFja19yZXF1aXJlX18uaG1yQy5taW5pQ3NzID0gKGNodW5rSWRzLCByZW1vdmVkQ2h1bmtzLCByZW1vdmVkTW9kdWxlcywgcHJvbWlzZXMsIGFwcGx5SGFuZGxlcnMsIHVwZGF0ZWRNb2R1bGVzTGlzdCkgPT4ge1xuXHRhcHBseUhhbmRsZXJzLnB1c2goYXBwbHlIYW5kbGVyKTtcblx0Y2h1bmtJZHMuZm9yRWFjaCgoY2h1bmtJZCkgPT4ge1xuXHRcdHZhciBocmVmID0gX193ZWJwYWNrX3JlcXVpcmVfXy5taW5pQ3NzRihjaHVua0lkKTtcblx0XHR2YXIgZnVsbGhyZWYgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBocmVmO1xuXHRcdHZhciBvbGRUYWcgPSBmaW5kU3R5bGVzaGVldChocmVmLCBmdWxsaHJlZik7XG5cdFx0aWYoIW9sZFRhZykgcmV0dXJuO1xuXHRcdHByb21pc2VzLnB1c2gobmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0dmFyIHRhZyA9IGNyZWF0ZVN0eWxlc2hlZXQoY2h1bmtJZCwgZnVsbGhyZWYsIG9sZFRhZywgKCkgPT4ge1xuXHRcdFx0XHR0YWcuYXMgPSBcInN0eWxlXCI7XG5cdFx0XHRcdHRhZy5yZWwgPSBcInByZWxvYWRcIjtcblx0XHRcdFx0cmVzb2x2ZSgpO1xuXHRcdFx0fSwgcmVqZWN0KTtcblx0XHRcdG9sZFRhZ3MucHVzaChvbGRUYWcpO1xuXHRcdFx0bmV3VGFncy5wdXNoKHRhZyk7XG5cdFx0fSkpO1xuXHR9KTtcbn1cblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkIiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmhtclNfanNvbnAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmhtclNfanNvbnAgfHwge1xuXHRcIm1haW5cIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbnZhciBjdXJyZW50VXBkYXRlZE1vZHVsZXNMaXN0O1xudmFyIHdhaXRpbmdVcGRhdGVSZXNvbHZlcyA9IHt9O1xuZnVuY3Rpb24gbG9hZFVwZGF0ZUNodW5rKGNodW5rSWQsIHVwZGF0ZWRNb2R1bGVzTGlzdCkge1xuXHRjdXJyZW50VXBkYXRlZE1vZHVsZXNMaXN0ID0gdXBkYXRlZE1vZHVsZXNMaXN0O1xuXHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdHdhaXRpbmdVcGRhdGVSZXNvbHZlc1tjaHVua0lkXSA9IHJlc29sdmU7XG5cdFx0Ly8gc3RhcnQgdXBkYXRlIGNodW5rIGxvYWRpbmdcblx0XHR2YXIgdXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgX193ZWJwYWNrX3JlcXVpcmVfXy5odShjaHVua0lkKTtcblx0XHQvLyBjcmVhdGUgZXJyb3IgYmVmb3JlIHN0YWNrIHVud291bmQgdG8gZ2V0IHVzZWZ1bCBzdGFja3RyYWNlIGxhdGVyXG5cdFx0dmFyIGVycm9yID0gbmV3IEVycm9yKCk7XG5cdFx0dmFyIGxvYWRpbmdFbmRlZCA9IChldmVudCkgPT4ge1xuXHRcdFx0aWYod2FpdGluZ1VwZGF0ZVJlc29sdmVzW2NodW5rSWRdKSB7XG5cdFx0XHRcdHdhaXRpbmdVcGRhdGVSZXNvbHZlc1tjaHVua0lkXSA9IHVuZGVmaW5lZFxuXHRcdFx0XHR2YXIgZXJyb3JUeXBlID0gZXZlbnQgJiYgKGV2ZW50LnR5cGUgPT09ICdsb2FkJyA/ICdtaXNzaW5nJyA6IGV2ZW50LnR5cGUpO1xuXHRcdFx0XHR2YXIgcmVhbFNyYyA9IGV2ZW50ICYmIGV2ZW50LnRhcmdldCAmJiBldmVudC50YXJnZXQuc3JjO1xuXHRcdFx0XHRlcnJvci5tZXNzYWdlID0gJ0xvYWRpbmcgaG90IHVwZGF0ZSBjaHVuayAnICsgY2h1bmtJZCArICcgZmFpbGVkLlxcbignICsgZXJyb3JUeXBlICsgJzogJyArIHJlYWxTcmMgKyAnKSc7XG5cdFx0XHRcdGVycm9yLm5hbWUgPSAnQ2h1bmtMb2FkRXJyb3InO1xuXHRcdFx0XHRlcnJvci50eXBlID0gZXJyb3JUeXBlO1xuXHRcdFx0XHRlcnJvci5yZXF1ZXN0ID0gcmVhbFNyYztcblx0XHRcdFx0cmVqZWN0KGVycm9yKTtcblx0XHRcdH1cblx0XHR9O1xuXHRcdF9fd2VicGFja19yZXF1aXJlX18ubCh1cmwsIGxvYWRpbmdFbmRlZCk7XG5cdH0pO1xufVxuXG5zZWxmW1wid2VicGFja0hvdFVwZGF0ZXZhbmlsbGFfanNfcHJvamVjdFwiXSA9IChjaHVua0lkLCBtb3JlTW9kdWxlcywgcnVudGltZSkgPT4ge1xuXHRmb3IodmFyIG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdGN1cnJlbnRVcGRhdGVbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0aWYoY3VycmVudFVwZGF0ZWRNb2R1bGVzTGlzdCkgY3VycmVudFVwZGF0ZWRNb2R1bGVzTGlzdC5wdXNoKG1vZHVsZUlkKTtcblx0XHR9XG5cdH1cblx0aWYocnVudGltZSkgY3VycmVudFVwZGF0ZVJ1bnRpbWUucHVzaChydW50aW1lKTtcblx0aWYod2FpdGluZ1VwZGF0ZVJlc29sdmVzW2NodW5rSWRdKSB7XG5cdFx0d2FpdGluZ1VwZGF0ZVJlc29sdmVzW2NodW5rSWRdKCk7XG5cdFx0d2FpdGluZ1VwZGF0ZVJlc29sdmVzW2NodW5rSWRdID0gdW5kZWZpbmVkO1xuXHR9XG59O1xuXG52YXIgY3VycmVudFVwZGF0ZUNodW5rcztcbnZhciBjdXJyZW50VXBkYXRlO1xudmFyIGN1cnJlbnRVcGRhdGVSZW1vdmVkQ2h1bmtzO1xudmFyIGN1cnJlbnRVcGRhdGVSdW50aW1lO1xuZnVuY3Rpb24gYXBwbHlIYW5kbGVyKG9wdGlvbnMpIHtcblx0aWYgKF9fd2VicGFja19yZXF1aXJlX18uZikgZGVsZXRlIF9fd2VicGFja19yZXF1aXJlX18uZi5qc29ucEhtcjtcblx0Y3VycmVudFVwZGF0ZUNodW5rcyA9IHVuZGVmaW5lZDtcblx0ZnVuY3Rpb24gZ2V0QWZmZWN0ZWRNb2R1bGVFZmZlY3RzKHVwZGF0ZU1vZHVsZUlkKSB7XG5cdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFt1cGRhdGVNb2R1bGVJZF07XG5cdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XG5cblx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMubWFwKGZ1bmN0aW9uIChpZCkge1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0Y2hhaW46IFtpZF0sXG5cdFx0XHRcdGlkOiBpZFxuXHRcdFx0fTtcblx0XHR9KTtcblx0XHR3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuXHRcdFx0dmFyIHF1ZXVlSXRlbSA9IHF1ZXVlLnBvcCgpO1xuXHRcdFx0dmFyIG1vZHVsZUlkID0gcXVldWVJdGVtLmlkO1xuXHRcdFx0dmFyIGNoYWluID0gcXVldWVJdGVtLmNoYWluO1xuXHRcdFx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19yZXF1aXJlX18uY1ttb2R1bGVJZF07XG5cdFx0XHRpZiAoXG5cdFx0XHRcdCFtb2R1bGUgfHxcblx0XHRcdFx0KG1vZHVsZS5ob3QuX3NlbGZBY2NlcHRlZCAmJiAhbW9kdWxlLmhvdC5fc2VsZkludmFsaWRhdGVkKVxuXHRcdFx0KVxuXHRcdFx0XHRjb250aW51ZTtcblx0XHRcdGlmIChtb2R1bGUuaG90Ll9zZWxmRGVjbGluZWQpIHtcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHR0eXBlOiBcInNlbGYtZGVjbGluZWRcIixcblx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXG5cdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cdFx0XHRpZiAobW9kdWxlLmhvdC5fbWFpbikge1xuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdHR5cGU6IFwidW5hY2NlcHRlZFwiLFxuXHRcdFx0XHRcdGNoYWluOiBjaGFpbixcblx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcblx0XHRcdFx0fTtcblx0XHRcdH1cblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbW9kdWxlLnBhcmVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0dmFyIHBhcmVudElkID0gbW9kdWxlLnBhcmVudHNbaV07XG5cdFx0XHRcdHZhciBwYXJlbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmNbcGFyZW50SWRdO1xuXHRcdFx0XHRpZiAoIXBhcmVudCkgY29udGludWU7XG5cdFx0XHRcdGlmIChwYXJlbnQuaG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcblx0XHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdFx0dHlwZTogXCJkZWNsaW5lZFwiLFxuXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLmNvbmNhdChbcGFyZW50SWRdKSxcblx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcblx0XHRcdFx0XHRcdHBhcmVudElkOiBwYXJlbnRJZFxuXHRcdFx0XHRcdH07XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKG91dGRhdGVkTW9kdWxlcy5pbmRleE9mKHBhcmVudElkKSAhPT0gLTEpIGNvbnRpbnVlO1xuXHRcdFx0XHRpZiAocGFyZW50LmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKSB7XG5cdFx0XHRcdFx0aWYgKCFvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0pXG5cdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0gPSBbXTtcblx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0sIFttb2R1bGVJZF0pO1xuXHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF07XG5cdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHBhcmVudElkKTtcblx0XHRcdFx0cXVldWUucHVzaCh7XG5cdFx0XHRcdFx0Y2hhaW46IGNoYWluLmNvbmNhdChbcGFyZW50SWRdKSxcblx0XHRcdFx0XHRpZDogcGFyZW50SWRcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHtcblx0XHRcdHR5cGU6IFwiYWNjZXB0ZWRcIixcblx0XHRcdG1vZHVsZUlkOiB1cGRhdGVNb2R1bGVJZCxcblx0XHRcdG91dGRhdGVkTW9kdWxlczogb3V0ZGF0ZWRNb2R1bGVzLFxuXHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXM6IG91dGRhdGVkRGVwZW5kZW5jaWVzXG5cdFx0fTtcblx0fVxuXG5cdGZ1bmN0aW9uIGFkZEFsbFRvU2V0KGEsIGIpIHtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGIubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpdGVtID0gYltpXTtcblx0XHRcdGlmIChhLmluZGV4T2YoaXRlbSkgPT09IC0xKSBhLnB1c2goaXRlbSk7XG5cdFx0fVxuXHR9XG5cblx0Ly8gYXQgYmVnaW4gYWxsIHVwZGF0ZXMgbW9kdWxlcyBhcmUgb3V0ZGF0ZWRcblx0Ly8gdGhlIFwib3V0ZGF0ZWRcIiBzdGF0dXMgY2FuIHByb3BhZ2F0ZSB0byBwYXJlbnRzIGlmIHRoZXkgZG9uJ3QgYWNjZXB0IHRoZSBjaGlsZHJlblxuXHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcblx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xuXHR2YXIgYXBwbGllZFVwZGF0ZSA9IHt9O1xuXG5cdHZhciB3YXJuVW5leHBlY3RlZFJlcXVpcmUgPSBmdW5jdGlvbiB3YXJuVW5leHBlY3RlZFJlcXVpcmUobW9kdWxlKSB7XG5cdFx0Y29uc29sZS53YXJuKFxuXHRcdFx0XCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgKyBtb2R1bGUuaWQgKyBcIikgdG8gZGlzcG9zZWQgbW9kdWxlXCJcblx0XHQpO1xuXHR9O1xuXG5cdGZvciAodmFyIG1vZHVsZUlkIGluIGN1cnJlbnRVcGRhdGUpIHtcblx0XHRpZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGN1cnJlbnRVcGRhdGUsIG1vZHVsZUlkKSkge1xuXHRcdFx0dmFyIG5ld01vZHVsZUZhY3RvcnkgPSBjdXJyZW50VXBkYXRlW21vZHVsZUlkXTtcblx0XHRcdC8qKiBAdHlwZSB7VE9ET30gKi9cblx0XHRcdHZhciByZXN1bHQ7XG5cdFx0XHRpZiAobmV3TW9kdWxlRmFjdG9yeSkge1xuXHRcdFx0XHRyZXN1bHQgPSBnZXRBZmZlY3RlZE1vZHVsZUVmZmVjdHMobW9kdWxlSWQpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmVzdWx0ID0ge1xuXHRcdFx0XHRcdHR5cGU6IFwiZGlzcG9zZWRcIixcblx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcblx0XHRcdFx0fTtcblx0XHRcdH1cblx0XHRcdC8qKiBAdHlwZSB7RXJyb3J8ZmFsc2V9ICovXG5cdFx0XHR2YXIgYWJvcnRFcnJvciA9IGZhbHNlO1xuXHRcdFx0dmFyIGRvQXBwbHkgPSBmYWxzZTtcblx0XHRcdHZhciBkb0Rpc3Bvc2UgPSBmYWxzZTtcblx0XHRcdHZhciBjaGFpbkluZm8gPSBcIlwiO1xuXHRcdFx0aWYgKHJlc3VsdC5jaGFpbikge1xuXHRcdFx0XHRjaGFpbkluZm8gPSBcIlxcblVwZGF0ZSBwcm9wYWdhdGlvbjogXCIgKyByZXN1bHQuY2hhaW4uam9pbihcIiAtPiBcIik7XG5cdFx0XHR9XG5cdFx0XHRzd2l0Y2ggKHJlc3VsdC50eXBlKSB7XG5cdFx0XHRcdGNhc2UgXCJzZWxmLWRlY2xpbmVkXCI6XG5cdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EZWNsaW5lZCkgb3B0aW9ucy5vbkRlY2xpbmVkKHJlc3VsdCk7XG5cdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZURlY2xpbmVkKVxuXHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcblx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2Ugb2Ygc2VsZiBkZWNsaW5lOiBcIiArXG5cdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm1vZHVsZUlkICtcblx0XHRcdFx0XHRcdFx0XHRjaGFpbkluZm9cblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJkZWNsaW5lZFwiOlxuXHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGVjbGluZWQpIG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xuXHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcblx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG5cdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIG9mIGRlY2xpbmVkIGRlcGVuZGVuY3k6IFwiICtcblx0XHRcdFx0XHRcdFx0XHRyZXN1bHQubW9kdWxlSWQgK1xuXHRcdFx0XHRcdFx0XHRcdFwiIGluIFwiICtcblx0XHRcdFx0XHRcdFx0XHRyZXN1bHQucGFyZW50SWQgK1xuXHRcdFx0XHRcdFx0XHRcdGNoYWluSW5mb1xuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcInVuYWNjZXB0ZWRcIjpcblx0XHRcdFx0XHRpZiAob3B0aW9ucy5vblVuYWNjZXB0ZWQpIG9wdGlvbnMub25VbmFjY2VwdGVkKHJlc3VsdCk7XG5cdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZVVuYWNjZXB0ZWQpXG5cdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuXHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBcIiArIG1vZHVsZUlkICsgXCIgaXMgbm90IGFjY2VwdGVkXCIgKyBjaGFpbkluZm9cblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJhY2NlcHRlZFwiOlxuXHRcdFx0XHRcdGlmIChvcHRpb25zLm9uQWNjZXB0ZWQpIG9wdGlvbnMub25BY2NlcHRlZChyZXN1bHQpO1xuXHRcdFx0XHRcdGRvQXBwbHkgPSB0cnVlO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFwiZGlzcG9zZWRcIjpcblx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRpc3Bvc2VkKSBvcHRpb25zLm9uRGlzcG9zZWQocmVzdWx0KTtcblx0XHRcdFx0XHRkb0Rpc3Bvc2UgPSB0cnVlO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIlVuZXhjZXB0aW9uIHR5cGUgXCIgKyByZXN1bHQudHlwZSk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoYWJvcnRFcnJvcikge1xuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdGVycm9yOiBhYm9ydEVycm9yXG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cdFx0XHRpZiAoZG9BcHBseSkge1xuXHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IG5ld01vZHVsZUZhY3Rvcnk7XG5cdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgcmVzdWx0Lm91dGRhdGVkTW9kdWxlcyk7XG5cdFx0XHRcdGZvciAobW9kdWxlSWQgaW4gcmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG5cdFx0XHRcdFx0aWYgKF9fd2VicGFja19yZXF1aXJlX18ubyhyZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRcdFx0aWYgKCFvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pXG5cdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSA9IFtdO1xuXHRcdFx0XHRcdFx0YWRkQWxsVG9TZXQoXG5cdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSxcblx0XHRcdFx0XHRcdFx0cmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXVxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmIChkb0Rpc3Bvc2UpIHtcblx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCBbcmVzdWx0Lm1vZHVsZUlkXSk7XG5cdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gd2FyblVuZXhwZWN0ZWRSZXF1aXJlO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRjdXJyZW50VXBkYXRlID0gdW5kZWZpbmVkO1xuXG5cdC8vIFN0b3JlIHNlbGYgYWNjZXB0ZWQgb3V0ZGF0ZWQgbW9kdWxlcyB0byByZXF1aXJlIHRoZW0gbGF0ZXIgYnkgdGhlIG1vZHVsZSBzeXN0ZW1cblx0dmFyIG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcyA9IFtdO1xuXHRmb3IgKHZhciBqID0gMDsgaiA8IG91dGRhdGVkTW9kdWxlcy5sZW5ndGg7IGorKykge1xuXHRcdHZhciBvdXRkYXRlZE1vZHVsZUlkID0gb3V0ZGF0ZWRNb2R1bGVzW2pdO1xuXHRcdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmNbb3V0ZGF0ZWRNb2R1bGVJZF07XG5cdFx0aWYgKFxuXHRcdFx0bW9kdWxlICYmXG5cdFx0XHQobW9kdWxlLmhvdC5fc2VsZkFjY2VwdGVkIHx8IG1vZHVsZS5ob3QuX21haW4pICYmXG5cdFx0XHQvLyByZW1vdmVkIHNlbGYtYWNjZXB0ZWQgbW9kdWxlcyBzaG91bGQgbm90IGJlIHJlcXVpcmVkXG5cdFx0XHRhcHBsaWVkVXBkYXRlW291dGRhdGVkTW9kdWxlSWRdICE9PSB3YXJuVW5leHBlY3RlZFJlcXVpcmUgJiZcblx0XHRcdC8vIHdoZW4gY2FsbGVkIGludmFsaWRhdGUgc2VsZi1hY2NlcHRpbmcgaXMgbm90IHBvc3NpYmxlXG5cdFx0XHQhbW9kdWxlLmhvdC5fc2VsZkludmFsaWRhdGVkXG5cdFx0KSB7XG5cdFx0XHRvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMucHVzaCh7XG5cdFx0XHRcdG1vZHVsZTogb3V0ZGF0ZWRNb2R1bGVJZCxcblx0XHRcdFx0cmVxdWlyZTogbW9kdWxlLmhvdC5fcmVxdWlyZVNlbGYsXG5cdFx0XHRcdGVycm9ySGFuZGxlcjogbW9kdWxlLmhvdC5fc2VsZkFjY2VwdGVkXG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cblxuXHR2YXIgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXM7XG5cblx0cmV0dXJuIHtcblx0XHRkaXNwb3NlOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRjdXJyZW50VXBkYXRlUmVtb3ZlZENodW5rcy5mb3JFYWNoKGZ1bmN0aW9uIChjaHVua0lkKSB7XG5cdFx0XHRcdGRlbGV0ZSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG5cdFx0XHR9KTtcblx0XHRcdGN1cnJlbnRVcGRhdGVSZW1vdmVkQ2h1bmtzID0gdW5kZWZpbmVkO1xuXG5cdFx0XHR2YXIgaWR4O1xuXHRcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLnNsaWNlKCk7XG5cdFx0XHR3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuXHRcdFx0XHR2YXIgbW9kdWxlSWQgPSBxdWV1ZS5wb3AoKTtcblx0XHRcdFx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19yZXF1aXJlX18uY1ttb2R1bGVJZF07XG5cdFx0XHRcdGlmICghbW9kdWxlKSBjb250aW51ZTtcblxuXHRcdFx0XHR2YXIgZGF0YSA9IHt9O1xuXG5cdFx0XHRcdC8vIENhbGwgZGlzcG9zZSBoYW5kbGVyc1xuXHRcdFx0XHR2YXIgZGlzcG9zZUhhbmRsZXJzID0gbW9kdWxlLmhvdC5fZGlzcG9zZUhhbmRsZXJzO1xuXHRcdFx0XHRmb3IgKGogPSAwOyBqIDwgZGlzcG9zZUhhbmRsZXJzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdFx0ZGlzcG9zZUhhbmRsZXJzW2pdLmNhbGwobnVsbCwgZGF0YSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5obXJEW21vZHVsZUlkXSA9IGRhdGE7XG5cblx0XHRcdFx0Ly8gZGlzYWJsZSBtb2R1bGUgKHRoaXMgZGlzYWJsZXMgcmVxdWlyZXMgZnJvbSB0aGlzIG1vZHVsZSlcblx0XHRcdFx0bW9kdWxlLmhvdC5hY3RpdmUgPSBmYWxzZTtcblxuXHRcdFx0XHQvLyByZW1vdmUgbW9kdWxlIGZyb20gY2FjaGVcblx0XHRcdFx0ZGVsZXRlIF9fd2VicGFja19yZXF1aXJlX18uY1ttb2R1bGVJZF07XG5cblx0XHRcdFx0Ly8gd2hlbiBkaXNwb3NpbmcgdGhlcmUgaXMgbm8gbmVlZCB0byBjYWxsIGRpc3Bvc2UgaGFuZGxlclxuXHRcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuXG5cdFx0XHRcdC8vIHJlbW92ZSBcInBhcmVudHNcIiByZWZlcmVuY2VzIGZyb20gYWxsIGNoaWxkcmVuXG5cdFx0XHRcdGZvciAoaiA9IDA7IGogPCBtb2R1bGUuY2hpbGRyZW4ubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0XHR2YXIgY2hpbGQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmNbbW9kdWxlLmNoaWxkcmVuW2pdXTtcblx0XHRcdFx0XHRpZiAoIWNoaWxkKSBjb250aW51ZTtcblx0XHRcdFx0XHRpZHggPSBjaGlsZC5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpO1xuXHRcdFx0XHRcdGlmIChpZHggPj0gMCkge1xuXHRcdFx0XHRcdFx0Y2hpbGQucGFyZW50cy5zcGxpY2UoaWR4LCAxKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gcmVtb3ZlIG91dGRhdGVkIGRlcGVuZGVuY3kgZnJvbSBtb2R1bGUgY2hpbGRyZW5cblx0XHRcdHZhciBkZXBlbmRlbmN5O1xuXHRcdFx0Zm9yICh2YXIgb3V0ZGF0ZWRNb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xuXHRcdFx0XHRpZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBvdXRkYXRlZE1vZHVsZUlkKSkge1xuXHRcdFx0XHRcdG1vZHVsZSA9IF9fd2VicGFja19yZXF1aXJlX18uY1tvdXRkYXRlZE1vZHVsZUlkXTtcblx0XHRcdFx0XHRpZiAobW9kdWxlKSB7XG5cdFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9XG5cdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW291dGRhdGVkTW9kdWxlSWRdO1xuXHRcdFx0XHRcdFx0Zm9yIChqID0gMDsgaiA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdFx0XHRcdGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tqXTtcblx0XHRcdFx0XHRcdFx0aWR4ID0gbW9kdWxlLmNoaWxkcmVuLmluZGV4T2YoZGVwZW5kZW5jeSk7XG5cdFx0XHRcdFx0XHRcdGlmIChpZHggPj0gMCkgbW9kdWxlLmNoaWxkcmVuLnNwbGljZShpZHgsIDEpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sXG5cdFx0YXBwbHk6IGZ1bmN0aW9uIChyZXBvcnRFcnJvcikge1xuXHRcdFx0Ly8gaW5zZXJ0IG5ldyBjb2RlXG5cdFx0XHRmb3IgKHZhciB1cGRhdGVNb2R1bGVJZCBpbiBhcHBsaWVkVXBkYXRlKSB7XG5cdFx0XHRcdGlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLm8oYXBwbGllZFVwZGF0ZSwgdXBkYXRlTW9kdWxlSWQpKSB7XG5cdFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW3VwZGF0ZU1vZHVsZUlkXSA9IGFwcGxpZWRVcGRhdGVbdXBkYXRlTW9kdWxlSWRdO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIHJ1biBuZXcgcnVudGltZSBtb2R1bGVzXG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGN1cnJlbnRVcGRhdGVSdW50aW1lLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGN1cnJlbnRVcGRhdGVSdW50aW1lW2ldKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBjYWxsIGFjY2VwdCBoYW5kbGVyc1xuXHRcdFx0Zm9yICh2YXIgb3V0ZGF0ZWRNb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xuXHRcdFx0XHRpZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBvdXRkYXRlZE1vZHVsZUlkKSkge1xuXHRcdFx0XHRcdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmNbb3V0ZGF0ZWRNb2R1bGVJZF07XG5cdFx0XHRcdFx0aWYgKG1vZHVsZSkge1xuXHRcdFx0XHRcdFx0bW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPVxuXHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1tvdXRkYXRlZE1vZHVsZUlkXTtcblx0XHRcdFx0XHRcdHZhciBjYWxsYmFja3MgPSBbXTtcblx0XHRcdFx0XHRcdHZhciBlcnJvckhhbmRsZXJzID0gW107XG5cdFx0XHRcdFx0XHR2YXIgZGVwZW5kZW5jaWVzRm9yQ2FsbGJhY2tzID0gW107XG5cdFx0XHRcdFx0XHRmb3IgKHZhciBqID0gMDsgaiA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdFx0XHRcdHZhciBkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbal07XG5cdFx0XHRcdFx0XHRcdHZhciBhY2NlcHRDYWxsYmFjayA9XG5cdFx0XHRcdFx0XHRcdFx0bW9kdWxlLmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwZW5kZW5jeV07XG5cdFx0XHRcdFx0XHRcdHZhciBlcnJvckhhbmRsZXIgPVxuXHRcdFx0XHRcdFx0XHRcdG1vZHVsZS5ob3QuX2FjY2VwdGVkRXJyb3JIYW5kbGVyc1tkZXBlbmRlbmN5XTtcblx0XHRcdFx0XHRcdFx0aWYgKGFjY2VwdENhbGxiYWNrKSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKGNhbGxiYWNrcy5pbmRleE9mKGFjY2VwdENhbGxiYWNrKSAhPT0gLTEpIGNvbnRpbnVlO1xuXHRcdFx0XHRcdFx0XHRcdGNhbGxiYWNrcy5wdXNoKGFjY2VwdENhbGxiYWNrKTtcblx0XHRcdFx0XHRcdFx0XHRlcnJvckhhbmRsZXJzLnB1c2goZXJyb3JIYW5kbGVyKTtcblx0XHRcdFx0XHRcdFx0XHRkZXBlbmRlbmNpZXNGb3JDYWxsYmFja3MucHVzaChkZXBlbmRlbmN5KTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Zm9yICh2YXIgayA9IDA7IGsgPCBjYWxsYmFja3MubGVuZ3RoOyBrKyspIHtcblx0XHRcdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdFx0XHRjYWxsYmFja3Nba10uY2FsbChudWxsLCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyk7XG5cdFx0XHRcdFx0XHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0XHRcdFx0XHRcdGlmICh0eXBlb2YgZXJyb3JIYW5kbGVyc1trXSA9PT0gXCJmdW5jdGlvblwiKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRlcnJvckhhbmRsZXJzW2tdKGVyciwge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBvdXRkYXRlZE1vZHVsZUlkLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGRlcGVuZGVuY3lJZDogZGVwZW5kZW5jaWVzRm9yQ2FsbGJhY2tzW2tdXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHRcdFx0fSBjYXRjaCAoZXJyMikge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcImFjY2VwdC1lcnJvci1oYW5kbGVyLWVycm9yZWRcIixcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBvdXRkYXRlZE1vZHVsZUlkLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZGVwZW5kZW5jeUlkOiBkZXBlbmRlbmNpZXNGb3JDYWxsYmFja3Nba10sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyMixcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdG9yaWdpbmFsRXJyb3I6IGVyclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmVwb3J0RXJyb3IoZXJyMik7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmVwb3J0RXJyb3IoZXJyKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwiYWNjZXB0LWVycm9yZWRcIixcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogb3V0ZGF0ZWRNb2R1bGVJZCxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRkZXBlbmRlbmN5SWQ6IGRlcGVuZGVuY2llc0ZvckNhbGxiYWNrc1trXSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0cmVwb3J0RXJyb3IoZXJyKTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gTG9hZCBzZWxmIGFjY2VwdGVkIG1vZHVsZXNcblx0XHRcdGZvciAodmFyIG8gPSAwOyBvIDwgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLmxlbmd0aDsgbysrKSB7XG5cdFx0XHRcdHZhciBpdGVtID0gb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzW29dO1xuXHRcdFx0XHR2YXIgbW9kdWxlSWQgPSBpdGVtLm1vZHVsZTtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRpdGVtLnJlcXVpcmUobW9kdWxlSWQpO1xuXHRcdFx0XHR9IGNhdGNoIChlcnIpIHtcblx0XHRcdFx0XHRpZiAodHlwZW9mIGl0ZW0uZXJyb3JIYW5kbGVyID09PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRcdGl0ZW0uZXJyb3JIYW5kbGVyKGVyciwge1xuXHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcblx0XHRcdFx0XHRcdFx0XHRtb2R1bGU6IF9fd2VicGFja19yZXF1aXJlX18uY1ttb2R1bGVJZF1cblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHR9IGNhdGNoIChlcnIyKSB7XG5cdFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuXHRcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcblx0XHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1hY2NlcHQtZXJyb3ItaGFuZGxlci1lcnJvcmVkXCIsXG5cdFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG5cdFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyMixcblx0XHRcdFx0XHRcdFx0XHRcdG9yaWdpbmFsRXJyb3I6IGVyclxuXHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG5cdFx0XHRcdFx0XHRcdFx0cmVwb3J0RXJyb3IoZXJyMik7XG5cdFx0XHRcdFx0XHRcdFx0cmVwb3J0RXJyb3IoZXJyKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcblx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuXHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1hY2NlcHQtZXJyb3JlZFwiLFxuXHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcblx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXG5cdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcblx0XHRcdFx0XHRcdFx0cmVwb3J0RXJyb3IoZXJyKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIG91dGRhdGVkTW9kdWxlcztcblx0XHR9XG5cdH07XG59XG5fX3dlYnBhY2tfcmVxdWlyZV9fLmhtckkuanNvbnAgPSBmdW5jdGlvbiAobW9kdWxlSWQsIGFwcGx5SGFuZGxlcnMpIHtcblx0aWYgKCFjdXJyZW50VXBkYXRlKSB7XG5cdFx0Y3VycmVudFVwZGF0ZSA9IHt9O1xuXHRcdGN1cnJlbnRVcGRhdGVSdW50aW1lID0gW107XG5cdFx0Y3VycmVudFVwZGF0ZVJlbW92ZWRDaHVua3MgPSBbXTtcblx0XHRhcHBseUhhbmRsZXJzLnB1c2goYXBwbHlIYW5kbGVyKTtcblx0fVxuXHRpZiAoIV9fd2VicGFja19yZXF1aXJlX18ubyhjdXJyZW50VXBkYXRlLCBtb2R1bGVJZCkpIHtcblx0XHRjdXJyZW50VXBkYXRlW21vZHVsZUlkXSA9IF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF07XG5cdH1cbn07XG5fX3dlYnBhY2tfcmVxdWlyZV9fLmhtckMuanNvbnAgPSBmdW5jdGlvbiAoXG5cdGNodW5rSWRzLFxuXHRyZW1vdmVkQ2h1bmtzLFxuXHRyZW1vdmVkTW9kdWxlcyxcblx0cHJvbWlzZXMsXG5cdGFwcGx5SGFuZGxlcnMsXG5cdHVwZGF0ZWRNb2R1bGVzTGlzdFxuKSB7XG5cdGFwcGx5SGFuZGxlcnMucHVzaChhcHBseUhhbmRsZXIpO1xuXHRjdXJyZW50VXBkYXRlQ2h1bmtzID0ge307XG5cdGN1cnJlbnRVcGRhdGVSZW1vdmVkQ2h1bmtzID0gcmVtb3ZlZENodW5rcztcblx0Y3VycmVudFVwZGF0ZSA9IHJlbW92ZWRNb2R1bGVzLnJlZHVjZShmdW5jdGlvbiAob2JqLCBrZXkpIHtcblx0XHRvYmpba2V5XSA9IGZhbHNlO1xuXHRcdHJldHVybiBvYmo7XG5cdH0sIHt9KTtcblx0Y3VycmVudFVwZGF0ZVJ1bnRpbWUgPSBbXTtcblx0Y2h1bmtJZHMuZm9yRWFjaChmdW5jdGlvbiAoY2h1bmtJZCkge1xuXHRcdGlmIChcblx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmXG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gIT09IHVuZGVmaW5lZFxuXHRcdCkge1xuXHRcdFx0cHJvbWlzZXMucHVzaChsb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCwgdXBkYXRlZE1vZHVsZXNMaXN0KSk7XG5cdFx0XHRjdXJyZW50VXBkYXRlQ2h1bmtzW2NodW5rSWRdID0gdHJ1ZTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y3VycmVudFVwZGF0ZUNodW5rc1tjaHVua0lkXSA9IGZhbHNlO1xuXHRcdH1cblx0fSk7XG5cdGlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmYpIHtcblx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmYuanNvbnBIbXIgPSBmdW5jdGlvbiAoY2h1bmtJZCwgcHJvbWlzZXMpIHtcblx0XHRcdGlmIChcblx0XHRcdFx0Y3VycmVudFVwZGF0ZUNodW5rcyAmJlxuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8oY3VycmVudFVwZGF0ZUNodW5rcywgY2h1bmtJZCkgJiZcblx0XHRcdFx0IWN1cnJlbnRVcGRhdGVDaHVua3NbY2h1bmtJZF1cblx0XHRcdCkge1xuXHRcdFx0XHRwcm9taXNlcy5wdXNoKGxvYWRVcGRhdGVDaHVuayhjaHVua0lkKSk7XG5cdFx0XHRcdGN1cnJlbnRVcGRhdGVDaHVua3NbY2h1bmtJZF0gPSB0cnVlO1xuXHRcdFx0fVxuXHRcdH07XG5cdH1cbn07XG5cbl9fd2VicGFja19yZXF1aXJlX18uaG1yTSA9ICgpID0+IHtcblx0aWYgKHR5cGVvZiBmZXRjaCA9PT0gXCJ1bmRlZmluZWRcIikgdGhyb3cgbmV3IEVycm9yKFwiTm8gYnJvd3NlciBzdXBwb3J0OiBuZWVkIGZldGNoIEFQSVwiKTtcblx0cmV0dXJuIGZldGNoKF9fd2VicGFja19yZXF1aXJlX18ucCArIF9fd2VicGFja19yZXF1aXJlX18uaG1yRigpKS50aGVuKChyZXNwb25zZSkgPT4ge1xuXHRcdGlmKHJlc3BvbnNlLnN0YXR1cyA9PT0gNDA0KSByZXR1cm47IC8vIG5vIHVwZGF0ZSBhdmFpbGFibGVcblx0XHRpZighcmVzcG9uc2Uub2spIHRocm93IG5ldyBFcnJvcihcIkZhaWxlZCB0byBmZXRjaCB1cGRhdGUgbWFuaWZlc3QgXCIgKyByZXNwb25zZS5zdGF0dXNUZXh0KTtcblx0XHRyZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuXHR9KTtcbn07XG5cbi8vIG5vIG9uIGNodW5rcyBsb2FkZWRcblxuLy8gbm8ganNvbnAgZnVuY3Rpb24iLCIiLCIvLyBtb2R1bGUgY2FjaGUgYXJlIHVzZWQgc28gZW50cnkgaW5saW5pbmcgaXMgZGlzYWJsZWRcbi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vbm9kZV9tb2R1bGVzL3dlYnBhY2stZGV2LXNlcnZlci9jbGllbnQvaW5kZXguanM/cHJvdG9jb2w9d3MlM0EmaG9zdG5hbWU9MC4wLjAuMCZwb3J0PTgwODAmcGF0aG5hbWU9JTJGd3MmbG9nZ2luZz1pbmZvJm92ZXJsYXk9dHJ1ZSZyZWNvbm5lY3Q9MTAmaG90PXRydWUmbGl2ZS1yZWxvYWQ9dHJ1ZVwiKTtcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL25vZGVfbW9kdWxlcy93ZWJwYWNrL2hvdC9kZXYtc2VydmVyLmpzXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vYXBwL2luZGV4LmpzXCIpO1xudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zdHlsZXMvaW5kZXguc2Nzc1wiKTtcbiIsIiJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwiYW5zaUhUTUwiLCJfcmVnQU5TSSIsIl9kZWZDb2xvcnMiLCJyZXNldCIsImJsYWNrIiwicmVkIiwiZ3JlZW4iLCJ5ZWxsb3ciLCJibHVlIiwibWFnZW50YSIsImN5YW4iLCJsaWdodGdyZXkiLCJkYXJrZ3JleSIsIl9zdHlsZXMiLCJfb3BlblRhZ3MiLCJfY2xvc2VUYWdzIiwiZm9yRWFjaCIsIm4iLCJ0ZXh0IiwidGVzdCIsImFuc2lDb2RlcyIsInJldCIsInJlcGxhY2UiLCJtYXRjaCIsInNlcSIsIm90IiwiaW5kZXhPZiIsInBvcCIsInB1c2giLCJjdCIsImwiLCJsZW5ndGgiLCJBcnJheSIsImpvaW4iLCJzZXRDb2xvcnMiLCJjb2xvcnMiLCJFcnJvciIsIl9maW5hbENvbG9ycyIsImtleSIsImhleCIsImhhc093blByb3BlcnR5IiwiaXNBcnJheSIsInNvbWUiLCJoIiwiZGVmSGV4Q29sb3IiLCJzbGljZSIsIl9zZXRUYWdzIiwidGFncyIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZ2V0Iiwib3BlbiIsImNsb3NlIiwiY29kZSIsImNvbG9yIiwib3JpQ29sb3IiLCJwYXJzZUludCIsInRvU3RyaW5nIiwiUiIsIlJlZmxlY3QiLCJSZWZsZWN0QXBwbHkiLCJhcHBseSIsInRhcmdldCIsInJlY2VpdmVyIiwiYXJncyIsIkZ1bmN0aW9uIiwicHJvdG90eXBlIiwiY2FsbCIsIlJlZmxlY3RPd25LZXlzIiwib3duS2V5cyIsImdldE93blByb3BlcnR5U3ltYm9scyIsImdldE93blByb3BlcnR5TmFtZXMiLCJjb25jYXQiLCJQcm9jZXNzRW1pdFdhcm5pbmciLCJ3YXJuaW5nIiwiY29uc29sZSIsIndhcm4iLCJOdW1iZXJJc05hTiIsIk51bWJlciIsImlzTmFOIiwidmFsdWUiLCJFdmVudEVtaXR0ZXIiLCJpbml0Iiwib25jZSIsIl9ldmVudHMiLCJ1bmRlZmluZWQiLCJfZXZlbnRzQ291bnQiLCJfbWF4TGlzdGVuZXJzIiwiZGVmYXVsdE1heExpc3RlbmVycyIsImNoZWNrTGlzdGVuZXIiLCJsaXN0ZW5lciIsIlR5cGVFcnJvciIsImVudW1lcmFibGUiLCJzZXQiLCJhcmciLCJSYW5nZUVycm9yIiwiZ2V0UHJvdG90eXBlT2YiLCJjcmVhdGUiLCJzZXRNYXhMaXN0ZW5lcnMiLCJfZ2V0TWF4TGlzdGVuZXJzIiwidGhhdCIsImdldE1heExpc3RlbmVycyIsImVtaXQiLCJ0eXBlIiwiaSIsImFyZ3VtZW50cyIsImRvRXJyb3IiLCJldmVudHMiLCJlcnJvciIsImVyIiwiZXJyIiwibWVzc2FnZSIsImNvbnRleHQiLCJoYW5kbGVyIiwibGVuIiwibGlzdGVuZXJzIiwiYXJyYXlDbG9uZSIsIl9hZGRMaXN0ZW5lciIsInByZXBlbmQiLCJtIiwiZXhpc3RpbmciLCJuZXdMaXN0ZW5lciIsInVuc2hpZnQiLCJ3YXJuZWQiLCJ3IiwiU3RyaW5nIiwibmFtZSIsImVtaXR0ZXIiLCJjb3VudCIsImFkZExpc3RlbmVyIiwib24iLCJwcmVwZW5kTGlzdGVuZXIiLCJvbmNlV3JhcHBlciIsImZpcmVkIiwicmVtb3ZlTGlzdGVuZXIiLCJ3cmFwRm4iLCJfb25jZVdyYXAiLCJzdGF0ZSIsIndyYXBwZWQiLCJiaW5kIiwicHJlcGVuZE9uY2VMaXN0ZW5lciIsImxpc3QiLCJwb3NpdGlvbiIsIm9yaWdpbmFsTGlzdGVuZXIiLCJzaGlmdCIsInNwbGljZU9uZSIsIm9mZiIsInJlbW92ZUFsbExpc3RlbmVycyIsImtleXMiLCJfbGlzdGVuZXJzIiwidW53cmFwIiwiZXZsaXN0ZW5lciIsInVud3JhcExpc3RlbmVycyIsInJhd0xpc3RlbmVycyIsImxpc3RlbmVyQ291bnQiLCJldmVudE5hbWVzIiwiYXJyIiwiY29weSIsImluZGV4IiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJlcnJvckxpc3RlbmVyIiwicmVzb2x2ZXIiLCJldmVudFRhcmdldEFnbm9zdGljQWRkTGlzdGVuZXIiLCJhZGRFcnJvckhhbmRsZXJJZkV2ZW50RW1pdHRlciIsImZsYWdzIiwiYWRkRXZlbnRMaXN0ZW5lciIsIndyYXBMaXN0ZW5lciIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJuYW1lZF9yZWZlcmVuY2VzXzEiLCJyZXF1aXJlIiwibnVtZXJpY191bmljb2RlX21hcF8xIiwic3Vycm9nYXRlX3BhaXJzXzEiLCJhbGxOYW1lZFJlZmVyZW5jZXMiLCJfX2Fzc2lnbiIsIm5hbWVkUmVmZXJlbmNlcyIsImFsbCIsImh0bWw1IiwicmVwbGFjZVVzaW5nUmVnRXhwIiwibWFjcm9UZXh0IiwibWFjcm9SZWdFeHAiLCJtYWNyb1JlcGxhY2VyIiwibGFzdEluZGV4IiwicmVwbGFjZU1hdGNoIiwiZXhlYyIsInJlcGxhY2VSZXN1bHQiLCJyZXBsYWNlTGFzdEluZGV4Iiwic3Vic3RyaW5nIiwicmVwbGFjZUlucHV0IiwiZW5jb2RlUmVnRXhwcyIsInNwZWNpYWxDaGFycyIsIm5vbkFzY2lpIiwibm9uQXNjaWlQcmludGFibGUiLCJub25Bc2NpaVByaW50YWJsZU9ubHkiLCJleHRlbnNpdmUiLCJkZWZhdWx0RW5jb2RlT3B0aW9ucyIsIm1vZGUiLCJsZXZlbCIsIm51bWVyaWMiLCJlbmNvZGUiLCJfYSIsIl9iIiwiX2MiLCJfZCIsIl9lIiwiZW5jb2RlUmVnRXhwIiwicmVmZXJlbmNlcyIsImNoYXJhY3RlcnMiLCJpc0hleCIsImlucHV0IiwicmVzdWx0IiwiZ2V0Q29kZVBvaW50IiwiY2hhckNvZGVBdCIsImRlZmF1bHREZWNvZGVPcHRpb25zIiwic2NvcGUiLCJzdHJpY3QiLCJhdHRyaWJ1dGUiLCJiYXNlRGVjb2RlUmVnRXhwcyIsInhtbCIsImJvZHkiLCJib2R5UmVnRXhwcyIsImh0bWw0IiwiZGVjb2RlUmVnRXhwcyIsImZyb21DaGFyQ29kZSIsIm91dE9mQm91bmRzQ2hhciIsImRlZmF1bHREZWNvZGVFbnRpdHlPcHRpb25zIiwiZ2V0RGVjb2RlZEVudGl0eSIsImVudGl0eSIsImlzQXR0cmlidXRlIiwiaXNTdHJpY3QiLCJkZWNvZGVSZXN1bHQiLCJkZWNvZGVFbnRpdHlMYXN0Q2hhciIsImRlY29kZVJlc3VsdEJ5UmVmZXJlbmNlIiwiZGVjb2RlU2Vjb25kQ2hhciIsImRlY29kZUNvZGUiLCJzdWJzdHIiLCJmcm9tQ29kZVBvaW50IiwibnVtZXJpY1VuaWNvZGVNYXAiLCJkZWNvZGVFbnRpdHkiLCJlbnRpdGllcyIsImRlY29kZSIsImRlY29kZVJlZ0V4cCIsIl8iLCIkIiwiZmoiLCJhc3RyYWxDb2RlUG9pbnQiLCJNYXRoIiwiZmxvb3IiLCJjb2RlUG9pbnRBdCIsImhpZ2hTdXJyb2dhdGVGcm9tIiwiaGlnaFN1cnJvZ2F0ZVRvIiwibm9ybWFsaXplVXJsIiwic3JjQnlNb2R1bGVJZCIsIm5vRG9jdW1lbnQiLCJkb2N1bWVudCIsImRlYm91bmNlIiwiZm4iLCJ0aW1lIiwidGltZW91dCIsInNlbGYiLCJmdW5jdGlvbkNhbGwiLCJjbGVhclRpbWVvdXQiLCJzZXRUaW1lb3V0Iiwibm9vcCIsImdldEN1cnJlbnRTY3JpcHRVcmwiLCJtb2R1bGVJZCIsInNyYyIsImN1cnJlbnRTY3JpcHQiLCJzY3JpcHRzIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJsYXN0U2NyaXB0VGFnIiwiZmlsZU1hcCIsInNwbGl0UmVzdWx0Iiwic3BsaXQiLCJmaWxlbmFtZSIsIm1hcCIsIm1hcFJ1bGUiLCJyZWciLCJSZWdFeHAiLCJ1cGRhdGVDc3MiLCJlbCIsInVybCIsImhyZWYiLCJpc1VybFJlcXVlc3QiLCJpc0xvYWRlZCIsInZpc2l0ZWQiLCJuZXdFbCIsImNsb25lTm9kZSIsInBhcmVudE5vZGUiLCJyZW1vdmVDaGlsZCIsIkRhdGUiLCJub3ciLCJuZXh0U2libGluZyIsImluc2VydEJlZm9yZSIsImFwcGVuZENoaWxkIiwiZ2V0UmVsb2FkVXJsIiwicmVsb2FkU3R5bGUiLCJlbGVtZW50cyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJsb2FkZWQiLCJyZWxvYWRBbGwiLCJvcHRpb25zIiwibG9nIiwiZ2V0U2NyaXB0U3JjIiwidXBkYXRlIiwicmVsb2FkZWQiLCJsb2NhbHMiLCJwYXRoQ29tcG9uZW50cyIsInJlZHVjZSIsImFjY3VtdWxhdG9yIiwiaXRlbSIsInVybFN0cmluZyIsInRyaW0iLCJwcm90b2NvbCIsImNvbXBvbmVudHMiLCJob3N0IiwidG9Mb3dlckNhc2UiLCJwYXRoIiwiX2NsYXNzQ2FsbENoZWNrIiwiaW5zdGFuY2UiLCJDb25zdHJ1Y3RvciIsIl9kZWZpbmVQcm9wZXJ0aWVzIiwicHJvcHMiLCJkZXNjcmlwdG9yIiwiY29uZmlndXJhYmxlIiwid3JpdGFibGUiLCJfdG9Qcm9wZXJ0eUtleSIsIl9jcmVhdGVDbGFzcyIsInByb3RvUHJvcHMiLCJzdGF0aWNQcm9wcyIsIl90b1ByaW1pdGl2ZSIsImhpbnQiLCJwcmltIiwiU3ltYm9sIiwidG9QcmltaXRpdmUiLCJyZXMiLCJXZWJTb2NrZXRDbGllbnQiLCJjbGllbnQiLCJXZWJTb2NrZXQiLCJvbmVycm9yIiwib25PcGVuIiwiZiIsIm9ub3BlbiIsIm9uQ2xvc2UiLCJvbmNsb3NlIiwib25NZXNzYWdlIiwib25tZXNzYWdlIiwiZSIsImRhdGEiLCJkZWZhdWx0Iiwib2JqZWN0IiwiZW51bWVyYWJsZU9ubHkiLCJzeW1ib2xzIiwiZmlsdGVyIiwic3ltIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiX29iamVjdFNwcmVhZCIsInNvdXJjZSIsIl9kZWZpbmVQcm9wZXJ0eSIsImdldE93blByb3BlcnR5RGVzY3JpcHRvcnMiLCJkZWZpbmVQcm9wZXJ0aWVzIiwib2JqIiwid2VicGFja0hvdExvZyIsInN0cmlwQW5zaSIsInBhcnNlVVJMIiwic29ja2V0IiwiZm9ybWF0UHJvYmxlbSIsImNyZWF0ZU92ZXJsYXkiLCJsb2dFbmFibGVkRmVhdHVyZXMiLCJzZXRMb2dMZXZlbCIsInNlbmRNZXNzYWdlIiwicmVsb2FkQXBwIiwiY3JlYXRlU29ja2V0VVJMIiwiZGVjb2RlT3ZlcmxheU9wdGlvbnMiLCJvdmVybGF5T3B0aW9ucyIsInByb3BlcnR5Iiwib3ZlcmxheUZpbHRlckZ1bmN0aW9uU3RyaW5nIiwiZGVjb2RlVVJJQ29tcG9uZW50Iiwib3ZlcmxheUZpbHRlckZ1bmN0aW9uIiwic3RhdHVzIiwiaXNVbmxvYWRpbmciLCJjdXJyZW50SGFzaCIsIl9fd2VicGFja19oYXNoX18iLCJob3QiLCJsaXZlUmVsb2FkIiwicHJvZ3Jlc3MiLCJvdmVybGF5IiwicGFyc2VkUmVzb3VyY2VRdWVyeSIsIl9fcmVzb3VyY2VRdWVyeSIsImVuYWJsZWRGZWF0dXJlcyIsIlByb2dyZXNzIiwiT3ZlcmxheSIsIkpTT04iLCJwYXJzZSIsImVycm9ycyIsIndhcm5pbmdzIiwicnVudGltZUVycm9ycyIsImxvZ2dpbmciLCJyZWNvbm5lY3QiLCJzZXRBbGxMb2dMZXZlbCIsIndpbmRvdyIsInRydXN0ZWRUeXBlc1BvbGljeU5hbWUiLCJjYXRjaFJ1bnRpbWVFcnJvciIsInNlbmQiLCJvblNvY2tldE1lc3NhZ2UiLCJpbnZhbGlkIiwiaW5mbyIsImhhc2giLCJfaGFzaCIsInByZXZpb3VzSGFzaCIsInByb2dyZXNzVXBkYXRlIiwicGx1Z2luTmFtZSIsInBlcmNlbnQiLCJtc2ciLCJzdGlsbE9rIiwib2siLCJjb250ZW50Q2hhbmdlZCIsImZpbGUiLCJsb2NhdGlvbiIsInJlbG9hZCIsInN0YXRpY0NoYW5nZWQiLCJfd2FybmluZ3MiLCJwYXJhbXMiLCJwcmludGFibGVXYXJuaW5ncyIsIl9mb3JtYXRQcm9ibGVtIiwiaGVhZGVyIiwib3ZlcmxheVdhcm5pbmdzU2V0dGluZyIsIndhcm5pbmdzVG9EaXNwbGF5IiwibWVzc2FnZXMiLCJwcmV2ZW50UmVsb2FkaW5nIiwiX2Vycm9ycyIsInByaW50YWJsZUVycm9ycyIsIl9mb3JtYXRQcm9ibGVtMiIsIm92ZXJsYXlFcnJvcnNTZXR0aW5ncyIsImVycm9yc1RvRGlzcGxheSIsIl9lcnJvciIsInNvY2tldFVSTCIsIl9fd2VicGFja19tb2R1bGVzX18iLCIuL2NsaWVudC1zcmMvbW9kdWxlcy9sb2dnZXIvU3luY0JhaWxIb29rRmFrZS5qcyIsImNsaWVudFRhcGFibGVTeW5jQmFpbEhvb2siLCIuL25vZGVfbW9kdWxlcy93ZWJwYWNrL2xpYi9sb2dnaW5nL0xvZ2dlci5qcyIsIl9fdW51c2VkX3dlYnBhY2tfbW9kdWxlIiwiX3RvQ29uc3VtYWJsZUFycmF5IiwiX2FycmF5V2l0aG91dEhvbGVzIiwiX2l0ZXJhYmxlVG9BcnJheSIsIl91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheSIsIl9ub25JdGVyYWJsZVNwcmVhZCIsIm8iLCJtaW5MZW4iLCJfYXJyYXlMaWtlVG9BcnJheSIsImNvbnN0cnVjdG9yIiwiZnJvbSIsIml0ZXIiLCJpdGVyYXRvciIsImFycjIiLCJMb2dUeXBlIiwiZnJlZXplIiwiZGVidWciLCJ0cmFjZSIsImdyb3VwIiwiZ3JvdXBDb2xsYXBzZWQiLCJncm91cEVuZCIsInByb2ZpbGUiLCJwcm9maWxlRW5kIiwiY2xlYXIiLCJMT0dfU1lNQk9MIiwiVElNRVJTX1NZTUJPTCIsIlRJTUVSU19BR0dSRUdBVEVTX1NZTUJPTCIsIldlYnBhY2tMb2dnZXIiLCJnZXRDaGlsZExvZ2dlciIsIl9sZW4iLCJfa2V5IiwiX2xlbjIiLCJfa2V5MiIsIl9sZW4zIiwiX2tleTMiLCJfbGVuNCIsIl9rZXk0IiwiX2xlbjUiLCJfa2V5NSIsImFzc2VydCIsImFzc2VydGlvbiIsIl9sZW42IiwiX2tleTYiLCJfbGVuNyIsIl9rZXk3IiwiX2xlbjgiLCJfa2V5OCIsIl9sZW45IiwiX2tleTkiLCJfbGVuMTAiLCJfa2V5MTAiLCJsYWJlbCIsIk1hcCIsInByb2Nlc3MiLCJocnRpbWUiLCJ0aW1lTG9nIiwicHJldiIsInRpbWVFbmQiLCJkZWxldGUiLCJ0aW1lQWdncmVnYXRlIiwiY3VycmVudCIsInRpbWVBZ2dyZWdhdGVFbmQiLCJMb2dnZXIiLCIuL25vZGVfbW9kdWxlcy93ZWJwYWNrL2xpYi9sb2dnaW5nL2NyZWF0ZUNvbnNvbGVMb2dnZXIuanMiLCJfX3VudXNlZF93ZWJwYWNrX2V4cG9ydHMiLCJfX3dlYnBhY2tfcmVxdWlyZV9fIiwiX3JlcXVpcmUiLCJmaWx0ZXJUb0Z1bmN0aW9uIiwicmVnRXhwIiwiaWRlbnQiLCJMb2dMZXZlbCIsIm5vbmUiLCJmYWxzZSIsInRydWUiLCJ2ZXJib3NlIiwiX3JlZiIsIl9yZWYkbGV2ZWwiLCJfcmVmJGRlYnVnIiwiZGVidWdGaWx0ZXJzIiwibG9nbGV2ZWwiLCJsb2dnZXIiLCJsYWJlbGVkQXJncyIsIm1zIiwibG9nVGltZSIsIi4vbm9kZV9tb2R1bGVzL3dlYnBhY2svbGliL2xvZ2dpbmcvcnVudGltZS5qcyIsIl9leHRlbmRzIiwiYXNzaWduIiwiU3luY0JhaWxIb29rIiwiY3JlYXRlQ29uc29sZUxvZ2dlciIsImN1cnJlbnREZWZhdWx0TG9nZ2VyT3B0aW9ucyIsImN1cnJlbnREZWZhdWx0TG9nZ2VyIiwiZ2V0TG9nZ2VyIiwiaG9va3MiLCJjaGlsZE5hbWUiLCJjb25maWd1cmVEZWZhdWx0TG9nZ2VyIiwiX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fIiwiY2FjaGVkTW9kdWxlIiwiZCIsImRlZmluaXRpb24iLCJwcm9wIiwiciIsInRvU3RyaW5nVGFnIiwiX193ZWJwYWNrX2V4cG9ydHNfXyIsIndlYnBhY2tfbGliX2xvZ2dpbmdfcnVudGltZV9qc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fIiwiX193ZWJwYWNrX2V4cG9ydF90YXJnZXRfXyIsIl9fZXNNb2R1bGUiLCJsaXN0ZW5Ub1J1bnRpbWVFcnJvciIsImxpc3RlblRvVW5oYW5kbGVkUmVqZWN0aW9uIiwicGFyc2VFcnJvclRvU3RhY2tzIiwiY3JlYXRlT3ZlcmxheU1hY2hpbmUiLCJjb250YWluZXJTdHlsZSIsImRpc21pc3NCdXR0b25TdHlsZSIsImhlYWRlclN0eWxlIiwiaWZyYW1lU3R5bGUiLCJtc2dTdHlsZXMiLCJtc2dUZXh0U3R5bGUiLCJtc2dUeXBlU3R5bGUiLCJtb2R1bGVOYW1lIiwibG9jIiwic3RhY2siLCJpZnJhbWVDb250YWluZXJFbGVtZW50IiwiY29udGFpbmVyRWxlbWVudCIsImhlYWRlckVsZW1lbnQiLCJvbkxvYWRRdWV1ZSIsIm92ZXJsYXlUcnVzdGVkVHlwZXNQb2xpY3kiLCJhcHBseVN0eWxlIiwiZWxlbWVudCIsInN0eWxlIiwiY3JlYXRlQ29udGFpbmVyIiwidHJ1c3RlZFR5cGVzIiwiY3JlYXRlUG9saWN5IiwiY3JlYXRlSFRNTCIsImNyZWF0ZUVsZW1lbnQiLCJpZCIsIm9ubG9hZCIsImNvbnRlbnRFbGVtZW50IiwiY29udGVudERvY3VtZW50IiwiaW5uZXJUZXh0IiwiY2xvc2VCdXR0b25FbGVtZW50IiwiYXJpYUxhYmVsIiwib3ZlcmxheVNlcnZpY2UiLCJvbkxvYWQiLCJlbnN1cmVPdmVybGF5RXhpc3RzIiwiY2FsbGJhY2siLCJpbm5lckhUTUwiLCJoaWRlIiwic2hvdyIsIm1lc3NhZ2VTb3VyY2UiLCJlbnRyeUVsZW1lbnQiLCJtc2dTdHlsZSIsInBhZGRpbmciLCJ0eXBlRWxlbWVudCIsIm1vZHVsZUlkZW50aWZpZXIiLCJjdXJzb3IiLCJzZXRBdHRyaWJ1dGUiLCJmZXRjaCIsIm1lc3NhZ2VUZXh0Tm9kZSIsInNob3dPdmVybGF5IiwiaGlkZU92ZXJsYXkiLCJoYW5kbGVFcnJvciIsImZhbGxiYWNrTWVzc2FnZSIsImVycm9yT2JqZWN0Iiwic2hvdWxkRGlzcGxheSIsImVycm9yRXZlbnQiLCJwcm9taXNlUmVqZWN0aW9uRXZlbnQiLCJyZWFzb24iLCJjcmVhdGVNYWNoaW5lIiwiX3JlZjIiLCJzdGF0ZXMiLCJpbml0aWFsIiwiYWN0aW9ucyIsImN1cnJlbnRTdGF0ZSIsImN1cnJlbnRDb250ZXh0IiwiZXZlbnQiLCJjdXJyZW50U3RhdGVPbiIsInRyYW5zaXRpb25Db25maWciLCJhY3ROYW1lIiwiYWN0aW9uSW1wbCIsIm5leHRDb250ZXh0VmFsdWUiLCJjbGVhbnVwIiwib3ZlcmxheU1hY2hpbmUiLCJoaWRkZW4iLCJCVUlMRF9FUlJPUiIsIlJVTlRJTUVfRVJST1IiLCJkaXNwbGF5QnVpbGRFcnJvciIsIkRJU01JU1MiLCJkaXNwbGF5UnVudGltZUVycm9yIiwiZGlzbWlzc01lc3NhZ2VzIiwiYXBwZW5kTWVzc2FnZXMiLCJzZXRNZXNzYWdlcyIsImJhY2tncm91bmRDb2xvciIsInRvcCIsImxlZnQiLCJyaWdodCIsImJvdHRvbSIsIndpZHRoIiwiaGVpZ2h0IiwiYm9yZGVyIiwiYm94U2l6aW5nIiwiZm9udFNpemUiLCJsaW5lSGVpZ2h0Iiwid2hpdGVTcGFjZSIsIm92ZXJmbG93IiwiZm9udEZhbWlseSIsIm1hcmdpbiIsImZsZXgiLCJtYXhIZWlnaHQiLCJtYXJnaW5Cb3R0b20iLCJDbGllbnQiLCJfX3dlYnBhY2tfZGV2X3NlcnZlcl9jbGllbnRfXyIsInJldHJpZXMiLCJtYXhSZXRyaWVzIiwiaW5pdFNvY2tldCIsImhhbmRsZXJzIiwicmV0cnlJbk1zIiwicG93IiwicmFuZG9tIiwiZm9ybWF0Iiwib2JqVVJMIiwiYXV0aCIsImVuY29kZVVSSUNvbXBvbmVudCIsImhvc3RuYW1lIiwicG9ydCIsInBhdGhuYW1lIiwic2xhc2hlcyIsImNoYXJBdCIsInNlYXJjaCIsInBhcnNlZFVSTCIsImlzSW5BZGRyQW55Iiwic29ja2V0VVJMUHJvdG9jb2wiLCJzb2NrZXRVUkxBdXRoIiwidXNlcm5hbWUiLCJwYXNzd29yZCIsInNvY2tldFVSTEhvc3RuYW1lIiwic29ja2V0VVJMUG9ydCIsInNvY2tldFVSTFBhdGhuYW1lIiwiZnJvbUN1cnJlbnRTY3JpcHQiLCJnZXRDdXJyZW50U2NyaXB0U291cmNlIiwiZ2V0QXR0cmlidXRlIiwic2NyaXB0RWxlbWVudHMiLCJzY3JpcHRFbGVtZW50c1dpdGhTcmMiLCJkZWZhdWx0TGV2ZWwiLCJmZWF0dXJlcyIsImxvZ1N0cmluZyIsInJlc291cmNlUXVlcnkiLCJzZWFyY2hQYXJhbXMiLCJwYWlyIiwic2NyaXB0U291cmNlIiwic2NyaXB0U291cmNlVVJMIiwiVVJMIiwiaG90RW1pdHRlciIsImlzSW5pdGlhbCIsImFwcGx5UmVsb2FkIiwicm9vdFdpbmRvdyIsImludGVydmFsSWQiLCJjbGVhckludGVydmFsIiwiYWxsb3dUb0hvdCIsImFsbG93VG9MaXZlUmVsb2FkIiwicG9zdE1lc3NhZ2UiLCJzZXRJbnRlcnZhbCIsInBhcmVudCIsInNlbmRNc2ciLCJXb3JrZXJHbG9iYWxTY29wZSIsImFuc2lSZWdleCIsInN0cmluZyIsImxhc3RIYXNoIiwidXBUb0RhdGUiLCJjaGVjayIsInRoZW4iLCJ1cGRhdGVkTW9kdWxlcyIsImNhdGNoIiwiZm9ybWF0RXJyb3IiLCJyZW5ld2VkTW9kdWxlcyIsInVuYWNjZXB0ZWRNb2R1bGVzIiwicGFydHMiLCJudW1iZXJJZHMiLCJldmVyeSIsImxvZ0xldmVsIiwiZHVtbXkiLCJzaG91bGRMb2ciLCJsb2dHcm91cCIsImxvZ0ZuIl0sInNvdXJjZVJvb3QiOiIifQ==
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.default = cssNameGenerator;
var validFirstCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_';
var validSecondCharacters = validFirstCharacters + '0123456789-';

var iterator = (typeof Symbol === 'undefined' ? 'undefined' : _typeof(Symbol)) === 'symbol' ? Symbol.iterator : null;

function cssNameGenerator() {
  var prefix = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

  var currentValue = [validFirstCharacters[0]];

  var incrementIndex = function incrementIndex(index) {
    if (index >= currentValue.length) {
      currentValue.push(validSecondCharacters[0]);
      return;
    }

    var value = currentValue[index];

    var validCharacters = index === 0 ? validFirstCharacters : validSecondCharacters;
    var currentIndex = validCharacters.indexOf(value);

    if (currentIndex + 1 >= validCharacters.length) {
      currentValue[index] = validCharacters[0];
      incrementIndex(index + 1);
    } else {
      currentValue[index] = validCharacters[currentIndex + 1];
    }
  };

  var next = function next() {
    var value = prefix + currentValue.join('');
    incrementIndex(0);
    return { value: value, done: false };
  };

  var protocol = { next: next };
  protocol[iterator] = protocol;

  return protocol;
}

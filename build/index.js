'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _namesList = require('./names-list');

var _namesList2 = _interopRequireDefault(_namesList);

var FIELD = /([A-Z^|]{3,100})/g;
var CARROT = /^\^/;
var BAR = /\|/g;
var NAMES = /^(authors?|editors?|translators?|contributors?|composers?|directors?|performers?)$/;

/**
 * Simple object clone.
 * @function
 * @param {Object} source
 * @return {Object}
 */
function clone(source) {
  var obj = {};
  if (typeof source !== 'object') return {};
  Object.keys(source).forEach(function (key) {
    obj[key] = source[key];
  });
  return obj;
}

/**
 * Implements modifiers and value interpolation.
 * @function
 * @param {String} fieldname
 * @param {Object} source
 * @return {String}
 */
function getValue(fieldname, source) {
  var invertAll = true;
  var value = null;
  if (CARROT.test(fieldname)) {
    invertAll = false;
    fieldname = fieldname.replace(CARROT, '');
  }
  if (BAR.test(fieldname)) {
    var fields = fieldname.split(BAR);
    fields.some(function (name) {
      if (typeof source[name] !== 'undefined') {
        fieldname = name;
        return true;
      }
    });
  }
  value = source[fieldname];
  delete source[fieldname];
  if (NAMES.test(fieldname)) value = (0, _namesList2['default'])(value, invertAll);
  return value || 'EMPTY';
}

/**
 * Filters out illicit punctuation sequences.
 * @function
 * @param {String} str
 * @return {String}
 */
function punctuationFilter(_x) {
  var _again = true;

  _function: while (_again) {
    var inStr = _x;
    _again = false;

    var outStr = inStr
    // Commas
    .replace(/,\./g, '.').replace(/,+/g, ',').replace(/,\)/g, ')').replace(/\(,/g, '(').replace(/,\]/g, ']').replace(/\[,/g, '[')
    // Periods
    // .replace(//g, '')
    .replace(/\.+/g, '.').replace(/\(\./g, '.').replace(/\[\./g, ']')
    // Colons
    .replace(/:+/g, ':').replace(/:\./g, '.').replace(/:,/g, ',').replace(/:\)/g, ')').replace(/\(:/g, '(').replace(/:\]/g, ']').replace(/\[:/g, '[')
    // Spaces
    .replace(/\(\s/g, '(').replace(/\s\)/g, ')').replace(/\[\s/g, '[').replace(/\s\]/g, ']').replace(/([,:])([^\s])/g, '$1 $2').replace(/\s([\.,:])/g, '$1')
    // Left edge
    .replace(/^[\[\],.:()\s]+$/g, '')
    // Right edge
    .replace(/[,:(\[]$/);
    if (inStr !== outStr) {
      _x = outStr;
      _again = true;
      outStr = undefined;
      continue _function;
    }
    return outStr;
  }
}

/**
 * Renders data into a Cite Format string.
 * @function
 * @return {}
 */

exports['default'] = function (data, format) {

  var source = undefined,
      fields = undefined;

  if (!data || !format) return '';
  format = format.replace(/\+/g, '__').replace(FIELD, '@@$1@@');
  fields = format.match(FIELD);
  if (!fields) return '';
  source = clone(data);
  fields.forEach(function (field) {
    var fieldname = field.toLowerCase();
    var value = getValue(fieldname, source) || 'EMPTY';
    format = format.replace(field, value).replace(/[^\s@|]*@@EMPTY@@[^\s@|]*/g, '');
  });
  return punctuationFilter(format.replace(/@@|\|/g, '').replace(/__/g, ' ').replace(/\s+/g, ' '));
};

module.exports = exports['default'];
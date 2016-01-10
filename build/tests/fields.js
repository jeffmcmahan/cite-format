'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ = require('../');

var _2 = _interopRequireDefault(_);

var model = {
  id: 'test',
  one: '1',
  two: '2',
  three: '3'
};

var mp = {
  author: 'Halle, Morris and Chomsky, Noam',
  year: 1970,
  title: 'Sound Pattern of English',
  publisher: 'MIT Press',
  location: 'Cambridge, MA'
};

var nietzsche = {
  author: 'Nietzsche, Friedrich',
  translator: 'Walter Kaufmann',
  year: 1969,
  title: 'The Genealogy of Morals',
  publisher: 'Random House'
};

var chesterton = {
  author: 'Chesteron, G.K.',
  year: 2006,
  title: 'In Defense of Sanity',
  editor: 'Robert Townsend',
  publisher: 'Random House',
  location: 'London, UK'
};

var lewis = {
  author: 'Lewis, C.S.',
  title: 'Mere Christianity',
  chapter: 'Beyond Personality',
  year: 1952,
  location: 'UK',
  publisher: 'Zondervan'
};

var huntington = {
  author: 'Huntington, Samuel P.',
  year: 1993,
  title: 'The clash of civilizations',
  journal: 'Foreign Affairs',
  pagenumbers: '22-49',
  volume: 72,
  issue: 3
};

var huntington2 = {
  year: 1993,
  editor: 'Huntington, Samuel P.',
  title: 'The clash of civilizations?',
  location: 'New York, NY',
  publisher: 'Houghton'
};

var etAl = {
  year: 1990,
  editor: 'Huntington, Samuel P. and Johnson, Samuel and Scruton, Roger',
  title: 'A book by many persons',
  location: 'New York, NY',
  publisher: 'Houghton'
};

var book = '^AUTHOR|EDITOR. (YEAR). <i>TITLE</i>, (Translated+by+TRANSLATOR) . Edited+by+EDITOR. LOCATION: PUBLISHER.';
var chapter = '^AUTHOR. (YEAR). "CHAPTER". In+<i>TITLE</i>, (translated+by+TRANSLATOR) . LOCATION: PUBLISHER.';
var article = '^AUTHOR. (YEAR). "TITLE". <i>JOURNAL</i>. VOLUME|(ISSUE) , PAGENUMBERS.';
var inText = '~AUTHOR|~EDITOR YEAR';

exports['default'] = function () {
  console.log((0, _2['default'])(model, 'ONE.'));
  console.log((0, _2['default'])(model, 'ONE. (TWO).'));
  console.log((0, _2['default'])(model, '<i>ONE.</i> (TWO).'));
  console.log((0, _2['default'])(model, '<i>ONE.</i> (TWO). (ZERO).'));
  console.log((0, _2['default'])(model, '<i>ONE.</i> (ZERO). (TWO).'));
  console.log((0, _2['default'])(model, '<i>ONE.</i> (ZERO). (TWO,+extra,).'));
  console.log((0, _2['default'])(model, '<i>ONE.</i> THREE: ZERO. TWO,+extra,.'));
  console.log((0, _2['default'])(mp, book), '\n');
  console.log((0, _2['default'])(nietzsche, book), '\n');
  console.log((0, _2['default'])(chesterton, book), '\n');
  console.log((0, _2['default'])(lewis, chapter), '\n');
  console.log((0, _2['default'])(huntington, article), '\n');
  console.log((0, _2['default'])(huntington2, book), '\n');
  console.log((0, _2['default'])(nietzsche, inText), '\n');
  console.log((0, _2['default'])(mp, inText), '\n');
  console.log((0, _2['default'])(etAl, inText), '\n');
};

module.exports = exports['default'];
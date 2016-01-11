'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _ = require('../');

var _2 = _interopRequireDefault(_);

var BOOK = '^AUTHOR|EDITOR. (YEAR). <i>TITLE</i>, (Translated+by+TRANSLATOR) . Edited+by+EDITOR. LOCATION: PUBLISHER.';
var CHAPTER = '^AUTHOR. (YEAR). "CHAPTER". In+<i>TITLE</i>, (translated+by+TRANSLATOR) . LOCATION: PUBLISHER.';
var ARTICLE = '^AUTHOR. (YEAR). "TITLE". <i>JOURNAL</i>. VOLUME|(ISSUE) , PAGENUMBERS.';
var INTEXT = '~AUTHOR|~EDITOR YEAR';

var MODEL = {
  id: 'test',
  one: '1',
  two: '2',
  three: '3'
};

_assert2['default'].equal((0, _2['default'])(MODEL, 'ONE.'), '1.');

_assert2['default'].equal((0, _2['default'])(MODEL, 'ONE. (TWO).'), '1. (2).');

_assert2['default'].equal((0, _2['default'])(MODEL, '<i>ONE.</i> (TWO). (ZERO).'), '<i>1.</i> (2).');

_assert2['default'].equal((0, _2['default'])(MODEL, '<i>ONE.</i> (ZERO). (TWO,+extra,).'), '<i>1.</i> (2, extra).');

_assert2['default'].equal((0, _2['default'])(MODEL, '<i>ONE.</i> THREE: ZERO . TWO,+extra,.'), '<i>1.</i> 3. 2, extra.');

var MP = {
  author: 'Halle, Morris and Chomsky, Noam',
  year: 1970,
  title: 'Sound Pattern of English',
  publisher: 'MIT Press',
  location: 'Cambridge, MA'
};

_assert2['default'].equal((0, _2['default'])(MP, BOOK), 'Chomsky, Noam &amp; Morris Halle. (1970). <i>Sound Pattern of English</i>. Cambridge, MA: MIT Press.');

_assert2['default'].equal((0, _2['default'])(MP, INTEXT), 'Chomsky &amp; Halle 1970');

var NIETZSCHE = {
  author: 'Nietzsche, Friedrich',
  translator: 'Walter Kaufmann',
  year: 1969,
  title: 'The Genealogy of Morals',
  publisher: 'Random House'
};

_assert2['default'].equal((0, _2['default'])(NIETZSCHE, BOOK), 'Nietzsche, Friedrich. (1969). <i>The Genealogy of Morals</i>, (Translated by Walter Kaufmann). Random House.');

_assert2['default'].equal((0, _2['default'])(NIETZSCHE, INTEXT), 'Nietzsche 1969');

var CHESTERTON = {
  author: 'Chesteron, G.K.',
  year: 2006,
  title: 'In Defense of Sanity',
  editor: 'Robert Townsend',
  publisher: 'Random House',
  location: 'London, UK'
};

_assert2['default'].equal((0, _2['default'])(CHESTERTON, BOOK), 'Chesteron, G.K. (2006). <i>In Defense of Sanity</i>. Edited by Robert Townsend. London, UK: Random House.');

var LEWIS = {
  author: 'Lewis, C.S.',
  title: 'Mere Christianity',
  chapter: 'Beyond Personality',
  year: 1952,
  location: 'UK',
  publisher: 'Zondervan'
};

_assert2['default'].equal((0, _2['default'])(LEWIS, CHAPTER), 'Lewis, C.S. (1952). "Beyond Personality". In <i>Mere Christianity</i>. UK: Zondervan.');

var HUNTINGTON = {
  author: 'Huntington, Samuel P.',
  year: 1993,
  title: 'The clash of civilizations',
  journal: 'Foreign Affairs',
  pagenumbers: '22-49',
  volume: 72,
  issue: 3
};

_assert2['default'].equal((0, _2['default'])(HUNTINGTON, ARTICLE), 'Huntington, Samuel P. (1993). "The clash of civilizations". <i>Foreign Affairs</i>. 72(3), 22-49.');

var HUNTINGTON2 = {
  year: 1993,
  editor: 'Huntington, Samuel P.',
  title: 'The clash of civilizations?',
  location: 'New York, NY',
  publisher: 'Houghton'
};

_assert2['default'].equal((0, _2['default'])(HUNTINGTON2, BOOK), 'Samuel P. Huntington. (1993). <i>The clash of civilizations?</i>. New York, NY: Houghton.');

var ETAL = {
  year: 1990,
  editor: 'Huntington, Samuel P. and Johnson, Samuel and Scruton, Roger',
  title: 'A book by many persons',
  location: 'New York, NY',
  publisher: 'Houghton'
};

_assert2['default'].equal((0, _2['default'])(ETAL, INTEXT), 'Huntington et al. 1990');

process.stdout.write('  ✔ All tests passing.\n\n');
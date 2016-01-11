import assert from 'assert'
import interpolate from '../'

const BOOK = '^AUTHOR|EDITOR. (YEAR). <i>TITLE</i>, (Translated+by+TRANSLATOR) . Edited+by+EDITOR. LOCATION: PUBLISHER.'
const CHAPTER = '^AUTHOR. (YEAR). "CHAPTER". In+<i>TITLE</i>, (translated+by+TRANSLATOR) . LOCATION: PUBLISHER.'
const ARTICLE = '^AUTHOR. (YEAR). "TITLE". <i>JOURNAL</i>. VOLUME|(ISSUE) , PAGENUMBERS.'
const INTEXT = '~AUTHOR|~EDITOR YEAR'

const MODEL = {
  id: 'test',
  one: '1',
  two: '2',
  three: '3'
}

assert.equal(
  interpolate(MODEL, 'ZERO.'),
  ''
)

assert.equal(
  interpolate(MODEL, 'ZERO. ONE.'),
  '1.'
)

assert.equal(
  interpolate(MODEL, 'ONE.'),
  '1.'
)

assert.equal(
  interpolate(MODEL, 'ONE. (TWO).'),
  '1. (2).'
)

assert.equal(
  interpolate(MODEL, '<i>ONE.</i> (TWO). (ZERO).'),
  '<i>1.</i> (2).'
)

assert.equal(
  interpolate(MODEL, '<i>ONE.</i> (ZERO). (TWO,+extra,).'),
  '<i>1.</i> (2, extra).'
)

assert.equal(
  interpolate(MODEL, '<i>ONE.</i> THREE: ZERO . TWO,+extra,.'),
  '<i>1.</i> 3. 2, extra.'
)

let MP = {
  author: 'Halle, Morris and Chomsky, Noam',
  year: 1970,
  title: 'Sound Pattern of English',
  publisher: 'MIT Press',
  location: 'Cambridge, MA'
}

assert.equal(
  interpolate(MP, BOOK),
  'Chomsky, Noam &amp; Morris Halle. (1970). <i>Sound Pattern of English</i>. Cambridge, MA: MIT Press.'
)

assert.equal(
  interpolate(MP, INTEXT),
  'Chomsky &amp; Halle 1970'
)

let NIETZSCHE = {
  author: 'Nietzsche, Friedrich',
  translator: 'Walter Kaufmann',
  year: 1969,
  title: 'The Genealogy of Morals',
  publisher: 'Random House'
}

assert.equal(
  interpolate(NIETZSCHE, BOOK),
  'Nietzsche, Friedrich. (1969). <i>The Genealogy of Morals</i>, (Translated by Walter Kaufmann). Random House.'
)

assert.equal(
  interpolate(NIETZSCHE, INTEXT),
  'Nietzsche 1969'
)

let CHESTERTON = {
  author: 'Chesteron, G.K.',
  year: 2006,
  title: 'In Defense of Sanity',
  editor: 'Robert Townsend',
  publisher: 'Random House',
  location: 'London, UK'
}

assert.equal(
  interpolate(CHESTERTON, BOOK),
  'Chesteron, G.K. (2006). <i>In Defense of Sanity</i>. Edited by Robert Townsend. London, UK: Random House.'
)

let LEWIS = {
  author: 'Lewis, C.S.',
  title: 'Mere Christianity',
  chapter: 'Beyond Personality',
  year: 1952,
  location: 'UK',
  publisher: 'Zondervan'
}

assert.equal(
  interpolate(LEWIS, CHAPTER),
  'Lewis, C.S. (1952). "Beyond Personality". In <i>Mere Christianity</i>. UK: Zondervan.'
)

let HUNTINGTON = {
  author: 'Huntington, Samuel P.',
  year: 1993,
  title: 'The clash of civilizations',
  journal: 'Foreign Affairs',
  pagenumbers: '22-49',
  volume: 72,
  issue: 3
}

assert.equal(
  interpolate(HUNTINGTON, ARTICLE),
  'Huntington, Samuel P. (1993). "The clash of civilizations". <i>Foreign Affairs</i>. 72(3), 22-49.'
)

let HUNTINGTON2 = {
  year: 1993,
  editor: 'Huntington, Samuel P.',
  title: 'The clash of civilizations?',
  location: 'New York, NY',
  publisher: 'Houghton'
}

assert.equal(
  interpolate(HUNTINGTON2, BOOK),
  'Samuel P. Huntington. (1993). <i>The clash of civilizations?</i>. New York, NY: Houghton.'
)

const ETAL = {
  year: 1990,
  editor: 'Huntington, Samuel P. and Johnson, Samuel and Scruton, Roger',
  title: 'A book by many persons',
  location: 'New York, NY',
  publisher: 'Houghton'
}

assert.equal(
  interpolate(ETAL, INTEXT),
  'Huntington et al. 1990'
)

process.stdout.write('  ✔ All tests passing.\n\n')

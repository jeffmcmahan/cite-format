import interpolate from '../'

let model = {
  id: 'test',
  one: '1',
  two: '2',
  three: '3'
}

let mp = {
  author: 'Halle, Morris and Chomsky, Noam',
  year: 1970,
  title: 'Sound Pattern of English',
  publisher: 'MIT Press',
  location: 'Cambridge, MA'
}

let nietzsche = {
  author: 'Nietzsche, Friedrich',
  translator: 'Walter Kaufmann',
  year: 1969,
  title: 'The Genealogy of Morals',
  publisher: 'Random House'
}

let chesterton = {
  author: 'Chesteron, G.K.',
  year: 2006,
  title: 'In Defense of Sanity',
  editor: 'Robert Townsend',
  publisher: 'Random House',
  location: 'London, UK'
}

let lewis = {
  author: 'Lewis, C.S.',
  title: 'Mere Christianity',
  chapter: 'Beyond Personality',
  year: 1952,
  location: 'UK',
  publisher: 'Zondervan'
}

let huntington = {
  author: 'Huntington, Samuel P.',
  year: 1993,
  title: 'The clash of civilizations',
  journal: 'Foreign Affairs',
  pagenumbers: '22-49',
  volume: 72,
  issue: 3
}

let huntington2 = {
  year: 1993,
  editor: 'Huntington, Samuel P.',
  title: 'The clash of civilizations?',
  location: 'New York, NY',
  publisher: 'Houghton'
}

let etAl = {
  year: 1990,
  editor: 'Huntington, Samuel P. and Johnson, Samuel and Scruton, Roger',
  title: 'A book by many persons',
  location: 'New York, NY',
  publisher: 'Houghton'
}

let book = '^AUTHOR|EDITOR. (YEAR). <i>TITLE</i>, (Translated+by+TRANSLATOR) . Edited+by+EDITOR. LOCATION: PUBLISHER.'
let chapter = '^AUTHOR. (YEAR). "CHAPTER". In+<i>TITLE</i>, (translated+by+TRANSLATOR) . LOCATION: PUBLISHER.'
let article = '^AUTHOR. (YEAR). "TITLE". <i>JOURNAL</i>. VOLUME|(ISSUE) , PAGENUMBERS.'
let inText = '~AUTHOR|~EDITOR YEAR'

export default function () {
  console.log(interpolate(model, 'ONE.'))
  console.log(interpolate(model, 'ONE. (TWO).'))
  console.log(interpolate(model, '<i>ONE.</i> (TWO).'))
  console.log(interpolate(model, '<i>ONE.</i> (TWO). (ZERO).'))
  console.log(interpolate(model, '<i>ONE.</i> (ZERO). (TWO).'))
  console.log(interpolate(model, '<i>ONE.</i> (ZERO). (TWO,+extra,).'))
  console.log(interpolate(model, '<i>ONE.</i> THREE: ZERO. TWO,+extra,.'))
  console.log(interpolate(mp, book), '\n')
  console.log(interpolate(nietzsche, book), '\n')
  console.log(interpolate(chesterton, book), '\n')
  console.log(interpolate(lewis, chapter), '\n')
  console.log(interpolate(huntington, article), '\n')
  console.log(interpolate(huntington2, book), '\n')
  console.log(interpolate(nietzsche, inText), '\n')
  console.log(interpolate(mp, inText), '\n')
  console.log(interpolate(etAl, inText), '\n')
}

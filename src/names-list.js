/**
 * Sorts citation objects by lastname, authors, or title.
 * @param {Object} a
 * @param {Object} b
 * @note The default order is order of appearance in the text. Here, we change
 * that to alphabetical order.
 */
function order(a, b) {
  if (a.toLowerCase() > b.toLowerCase()) return 1
  if (a.toLowerCase() < b.toLowerCase()) return -1
  return 0
}

function invertName(name) {
  let split = name.split(', ')
  if (split[0] && split[1]) {
    return split[1] + ' ' + split[0]
  } else {
    return name
  }
}

export default function (people, invertAll) {
  if (!people) return ''
  people = people.split(' and ')
  people = people.sort(order).map(function (person, index) {
    if (index > 0 || invertAll) person = invertName(person)
    if (index === 0) return person
    if (index > 0 && index < people.length - 1) {
      return ', ' + person
    } else if (index === people.length - 1) {
      return ' &amp; ' + person
    }
  })
  return people.join('')
}

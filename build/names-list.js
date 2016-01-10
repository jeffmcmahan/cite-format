/**
 * Sorts citation objects by lastname, authors, or title.
 * @param {Object} a
 * @param {Object} b
 * @note The default order is order of appearance in the text. Here, we change
 * that to alphabetical order.
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
function order(a, b) {
  if (a.toLowerCase() > b.toLowerCase()) return 1;
  if (a.toLowerCase() < b.toLowerCase()) return -1;
  return 0;
}

/**
 * Flips "lastname, firstname" to "firstname lastname."
 * @function
 * @param {String} name
 * @return {String}
 */
function invertName(name) {
  var split = name.split(', ');
  if (split[0] && split[1]) {
    return split[1] + ' ' + split[0];
  } else {
    return name;
  }
}

/**
 * Returns the long-type names list, as appears in full length citations.
 * @function
 * @param {Array} people
 * @param {Boolean|} intertAll
 * @return {String}
 */
function longNames(people, invertAll) {
  return people.map(function (person, index) {
    if (index > 0 || invertAll) person = invertName(person);
    if (index === 0) return person;
    if (index > 0 && index < people.length - 1) {
      return ', ' + person;
    } else if (index === people.length - 1) {
      return ' &amp; ' + person;
    }
  }).join('');
}

/**
 * Returns the short-type names list (e.g., Jones et al.).
 * @function
 * @param {Array} people
 * @return {String}
 */
function shortNames(people) {
  if (!people || !people.length) return [];
  people = people.map(function (person) {
    if (/,/.test(person)) return person.split(', ')[0];
    return person;
  });
  if (people.length === 1) {
    return people[0];
  } else if (people.length === 2) {
    return people[0] + ' &amp; ' + people[1];
  } else if (people.length > 2) {
    return people[0] + ' et al.';
  }
}

/**
 * Formats a list of names.
 * @param {Array} people
 * @param {Boolean|} invertAll
 * @param {Boolean|} long
 * @return {String}
 */

exports['default'] = function (people, invertAll, long) {
  if (!people) return '';
  people = people.split(' and ');
  people = people.sort(order);
  if (long) return longNames(people, invertAll);
  return shortNames(people);
};

module.exports = exports['default'];
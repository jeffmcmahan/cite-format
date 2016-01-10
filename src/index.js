import namesList from './names-list'
const FIELD = /([A-Z^|~]{3,100})/g
const CARROT = /^\^/
const TILDE = /~/
const BAR = /\|/g
const NAMES = /^(authors?|editors?|translators?|contributors?|composers?|directors?|performers?)$/

/**
 * Simple object clone.
 * @function
 * @param {Object} source
 * @return {Object}
 */
function clone(source) {
  let obj = {}
  if (typeof source !== 'object') return {}
  Object.keys(source).forEach((key) => {
    obj[key] = source[key]
  })
  return obj
}

/**
 * Implements modifiers and value interpolation.
 * @function
 * @param {String} fieldname
 * @param {Object} source
 * @return {String}
 */
function getValue(fieldname, source) {
  let invertAll = true
  let long = true
  let value = null
  if (BAR.test(fieldname)) {
    let fields = fieldname.split(BAR)
    fields.some((name) => {
      let key = name.replace(CARROT, '').replace(TILDE, '')
      if (typeof source[key] !== 'undefined') {
        fieldname = name
        return true
      }
    })
  }
  if (TILDE.test(fieldname)) {
    long = false
    fieldname = fieldname.replace(TILDE, '')
  }
  if (CARROT.test(fieldname)) {
    invertAll = false
    fieldname = fieldname.replace(CARROT, '')
  }
  value = source[fieldname]
  delete source[fieldname]
  if (NAMES.test(fieldname)) value = namesList(value, invertAll, long)
  return value || 'EMPTY'
}

/**
 * Filters out illicit punctuation sequences.
 * @function
 * @param {String} str
 * @return {String}
 */
function punctuationFilter(inStr) {
  let outStr = (
    inStr
    // Commas
      .replace(/,\./g, '.')
      .replace(/,+/g, ',')
      .replace(/,\)/g, ')')
      .replace(/\(,/g, '(')
      .replace(/,\]/g, ']')
      .replace(/\[,/g, '[')
    // Periods
      // .replace(//g, '')
      .replace(/\.+/g, '.')
      .replace(/\(\./g, '.')
      .replace(/\[\./g, ']')
    // Colons
      .replace(/:+/g, ':')
      .replace(/:\./g, '.')
      .replace(/:,/g, ',')
      .replace(/:\)/g, ')')
      .replace(/\(:/g, '(')
      .replace(/:\]/g, ']')
      .replace(/\[:/g, '[')
    // Spaces
      .replace(/\(\s/g, '(')
      .replace(/\s\)/g, ')')
      .replace(/\[\s/g, '[')
      .replace(/\s\]/g, ']')
      .replace(/([,:])([^\s])/g, '$1 $2')
      .replace(/\s([\.,:])/g, '$1')
    // Left edge
      .replace(/^[\[\],.:()\s]+$/g, '')
    // Right edge
      .replace(/[,:(\[]$/)
  )
  if (inStr !== outStr) return punctuationFilter(outStr)
  return outStr
}

/**
 * Renders data into a Cite Format string.
 * @function
 * @return {}
 */
export default function (data, format) {

  let source
    , fields

  if (!data || !format) return ''
  format = format.replace(/\+/g, '__').replace(FIELD, '@@$1@@')
  fields = format.match(FIELD)
  if (!fields) return ''
  source = clone(data)
  fields.forEach(function (field) {
    let fieldname = field.toLowerCase()
    let value = getValue(fieldname, source) || 'EMPTY'
    format = (
      format
        .replace(field, value)
        .replace(/[^\s@|]*@@EMPTY@@[^\s@|]*/g, '')
    )
  })
  return (
    punctuationFilter(
      format
        .replace(/@@|\|/g, '')
        .replace(/__/g, ' ')
        .replace(/\s+/g, ' ')
    )
  )
}

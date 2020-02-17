const invariant = require('invariant')

const MIDDLE_PROPERTY = new Map()

MIDDLE_PROPERTY.set('m', 'm')
MIDDLE_PROPERTY.set('M', 'M')
MIDDLE_PROPERTY.set('sus', 'sus')
MIDDLE_PROPERTY.set('aug', 'aug')
MIDDLE_PROPERTY.set('dim', 'dim')

class Result {
  constructor() {
    this.middleProperty = '' // m || M || sus || aug || dim .... etc
    this.resultNotes = []
  }

  addResultNote(noteText) {
    this.resultNotes.push(noteText)
  }

  getResultNotes() {
    return this.resultNotes
  }

  setMiddleProperty(middleProperty) {
    invariant(MIDDLE_PROPERTY.get(middleProperty))
    this.middleProperty = middleProperty
  }

  getMiddleProperty() {
    return this.middleProperty
  }
}

module.exports = { ResultClass: Result, MIDDLE_PROPERTY: MIDDLE_PROPERTY,}

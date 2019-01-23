import { Rules } from '../../src/Rules'

describe ('Rules', () => {
  verify.it('should get all rules from the document', () => {
    const rules = new Rules()
    rules.logRules()
  })
})


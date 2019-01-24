import { Rules } from '../../src/Rules'

declare const karmaHTML: any

before (function(done: Mocha.Done) {  
  karmaHTML.index.onstatechange = function(ready: boolean, tag: string){
    if(ready && tag === 'index') {
      done()
    }
  }
  karmaHTML.index.open()
}) 


describe ('Rules', () => {
  const rules = new Rules(karmaHTML.index.document)

  verify.it('should populate all rule group from the document', () => {
    rules.getRuleGroupNames().length.should.eql(2)
  })

  verify.it('should populate all rules from the document', () => {
    rules.getRules().length.should.eql(8)
  })

  describe('getRuleGroupNames()', () => {
    verify.it('should return the correct names', () => {
      const expected = ['Force Rules', 'Selection Rules']
      rules.buildModals()
      rules.getRuleGroupNames().should.eql(expected)
    })
  })

  describe('buildModals()', () => {
    verify.it('should create a modal for each rule', () => {
      const expectedNumberOfModals = rules.getRules().length
      rules.buildModals()
      karmaHTML.index.document.getElementsByClassName('modal fade').length
        .should.eql(expectedNumberOfModals)
    })

    verify.it('should return a button to trigger the modal', () => {

    })
  })
})

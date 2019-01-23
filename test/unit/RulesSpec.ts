import { Rules } from '../../src/Rules'

declare const karmaHTML: any

before ((done: Function) => {
  karmaHTML.index.onstatechange = function(ready: boolean, tag: string){
    if(ready && tag === 'index') {
      done()
    }
  }
  karmaHTML.index.open()
}) 

describe ('Rules', () => {
  verify.it('should get all rules from the document', () => {
    const rules = new Rules(karmaHTML.index.document)
    rules.getRuleGroupNames().length.should.eql(2)
  })
})

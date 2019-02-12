import { Rules } from '../../src/Rules'

declare const karmaHTML: any
let rules: Rules

before (function(done: Mocha.Done) {  
  karmaHTML.index.onstatechange = function(ready: boolean, tag: string){
    if(ready && tag === 'index') {
      setupRules()
      done()
    }
  }
  karmaHTML.index.open()
})

const setupRules = () => {
  rules = new Rules(karmaHTML.index.document)
  rules.create()
}

describe ('Rules', () => {
  verify.it('should create a modal for each rule', () => {
    const expectedNumberOfModals = 8
    karmaHTML.index.document.getElementsByClassName('modal fade').length
      .should.eql(expectedNumberOfModals)
  })

  verify.it('should create a nav-menu for each rule set', () => {
    const expectedNumberOfNavMenus = 2
    karmaHTML.index.document.getElementsByClassName('nav-menu').length
      .should.eql(expectedNumberOfNavMenus)
  })
})

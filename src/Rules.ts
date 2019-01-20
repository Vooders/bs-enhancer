import { Nav } from './Nav'
import { Modal } from './Modal'

type Rule = {
  name: string,
  html: HTMLDivElement
}
type RuleGroup = {
  [key: string]: Rule[]
}
export class Rules {
  private readonly rules: RuleGroup = {}

  constructor () {
    this.getRules()
    console.log(this.rules)
  }

  buildModals () {
    const ruleTypes = Object.keys(this.rules)
    ruleTypes.forEach((ruleType) => {
      const navList = Nav.newNavList(`${this.makeId(ruleType)}-nav`, ruleType)
      this.rules[ruleType].forEach((rule) => {
        const li = document.createElement("li")
        li.setAttribute('class','nav-item')
        const triggerButton = Modal.create(rule.html, this.makeId(rule.name), rule.name)
        triggerButton.setAttribute('class', 'btn btn-dark nav-button')
        li.appendChild(triggerButton)
        navList.appendChild(li)
      })
    })
  }

  private makeId (s: string): string {
    return s.replace(/ /g, '_')
  }

  private getRules () {
    const ruleSets = document.getElementsByClassName('summary')
    for (let i = 0; i < ruleSets.length; i++) {
      const ruleSet: any = ruleSets.item(i)
      const rules = ruleSet.getElementsByTagName('p')
      const ruleSetName = ruleSet.firstElementChild.innerText
      this.rules[ruleSetName] = []
      for (let k = 0; k < rules.length; k++) {
        const rule = rules[k]
        this.rules[ruleSetName].push({
          name: rule.firstElementChild.innerHTML.replace(/:/g, ''),
          html: rule
        })
      }
    }
  }
}
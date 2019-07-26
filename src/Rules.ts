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
  private readonly ruleGroups: RuleGroup = {}
  private readonly nav: Nav
  private readonly modal: Modal
  private created: boolean = false
  
  constructor (
    private readonly document: Document
  ) {
    this.nav = new Nav(this.document)
    this.modal = new Modal(this.document)
  }

  create () {
    if (!this.created) {
      this.populateRules()
      this.buildModals()
    }
  }

  private buildModals () {
    const ruleTypes = Object.keys(this.ruleGroups)
    ruleTypes.forEach((ruleType) => {
      const navList = this.nav.newNavList(`${this.makeId(ruleType)}-nav`, ruleType)
      this.ruleGroups[ruleType].forEach((rule) => {
        const li = this.document.createElement("li")
        li.setAttribute('class','nav-item')
        const triggerButton = this.modal.create(rule.html, this.makeId(rule.name), rule.name)
        triggerButton.setAttribute('class', 'btn btn-dark nav-button')
        li.appendChild(triggerButton)
        navList.appendChild(li)
      })
    })
  }

  private makeId (s: string): string {
    return s.replace(/ /g, '_')
  }

  private populateRules () {
    const ruleSets = this.document.getElementsByClassName('summary')
    for (let i = 0; i < ruleSets.length; i++) {
      const ruleSet: any = ruleSets.item(i)
      const rules = ruleSet.getElementsByTagName('p')
      const ruleSetName = ruleSet.firstElementChild.innerText
      this.ruleGroups[ruleSetName] = []
      for (let k = 0; k < rules.length; k++) {
        const rule = rules[k]
        this.ruleGroups[ruleSetName].push({
          name: rule.firstElementChild.innerHTML.replace(/:/g, ''),
          html: rule
        })
      }
    }
  }
}

import { Nav } from './Nav'
import { Modal } from './Modal'
import { ElementTools } from './ElementTools'

type Unit = {
  readonly name: string,
  readonly id: string
}

export class Units {
  private units: Unit[] = []
  private readonly nav: Nav
  private readonly modal: Modal

  constructor (
    private readonly document: Document
    ) {
    this.nav = new Nav(this.document)
    this.modal = new Modal(this.document)
    this.setIds()
  }

  createNavMenu (): void {
    const menuId = 'nav-menu'
    const menuTitle = 'Units'
    const menu = this.nav.newNavList(menuId, menuTitle)
    this.units.forEach((unit) => {
      const li = this.document.createElement("li")
      li.setAttribute('class','nav-item')
      
      const link = this.document.createElement('a')
      const linkText = this.document.createTextNode(unit.name)
      link.appendChild(linkText)
      link.setAttribute('href', '#' + unit.id)
      link.setAttribute('title', unit.name)
      link.setAttribute('type', 'button')
      link.setAttribute('class', 'btn btn-dark nav-button')
      li.appendChild(link)
      menu.appendChild(li)
    })
  }

  createModals (): void {
    this.getUnitIds().forEach((unitId: string) => {
      const element: any = this.document.getElementById(unitId)
      const button = this.modal.create(element, unitId, '+')
      button.setAttribute('class', 'btn btn-dark unit-button')
      element.insertBefore(button, element.firstElementChild)
    })
  }

  hideModelEquipment (): void {
    this.getUnitIds().forEach((unitId: string) => {
      const unit: any = this.document.getElementById(unitId)
      const equipment: any = unit.querySelector('ul')
      if (equipment) {
        const revealButton = ElementTools.hide(equipment, unitId, 'Show Weapon Selection')
        revealButton.setAttribute('class', 'btn btn-dark unit-button')
        equipment.parentNode.insertBefore(revealButton, equipment)
      }
    })
  }

  private setIds (): void {
    const categories: HTMLCollection = this.document.getElementsByClassName('category')
    for (let i = 0; i < categories.length; i++) {
      const units: HTMLCollection = categories.item(i)!.getElementsByClassName('rootselection')
      for (let k=0; k<units.length; k++) {
        const unitElement: any = units[k]
        const name = unitElement.innerText.split('\n')[0].split('[')[0].trim()
        const correctedName = this.setUniqueName(name)
        const unit = this.addUnit(correctedName)
        const nameElement = unitElement.querySelector('h4')
        if (nameElement) {
          nameElement.innerText = nameElement.innerText.replace(name, correctedName)
        }
        unitElement.setAttribute('id', unit.id)
      }
    }
  }

  private setUniqueName (name: string, i = 0): string {
    if (this.getUnitNames().indexOf(name) > -1) {
      const newName = (i > 0) ? name+'I' : name+' II'
      return this.setUniqueName(newName, ++i)
    } else {
      return name
    }
  }

  private addUnit (name: string): Unit {
    const unit = {
      name,
      id: name.replace(/ /g, '_')
    }
    this.units.push(unit)
    return unit
  }

  private getUnitNames () {
    return this.units.map((unit: Unit) => unit.name)
  }

  private getUnitIds () {
    return this.units.map((unit: Unit) => unit.id)
  }
}



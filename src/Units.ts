import { Nav } from './Nav'

type Unit = {
  readonly name: string,
  readonly id: string
}

export class Units {
  private units: Unit[] = []

  setIds () {
    const categories: HTMLCollection = document.getElementsByClassName('category')
    for (let i = 0; i < categories.length; i++) {
      const units: HTMLCollection = categories.item(i)!.getElementsByClassName('rootselection')
      for (var k=0; k<units.length; k++) {
        const unitElement: any = units[k]
        const name = unitElement.innerText.split('\n')[0].split('[')[0].trim()
        const correctedName = (this.getUnitNames().indexOf(name) > -1) ? name+'I' : name 
        const unit = this.addUnit(correctedName)
        unitElement.setAttribute('id', unit.id)
      }
    }
  }

  createNavMenu () {
    const menuId = 'nav-menu'
    const menuTitle = 'Units'
    const menu = Nav.newNavList(menuId, menuTitle)
    this.units.forEach((unit) => {
      const li = document.createElement("li")
      li.setAttribute('class','nav-item')
      const link = document.createElement('a')
      const linkText = document.createTextNode(unit.name)
      link.appendChild(linkText)
      link.setAttribute('href', '#' + unit.id)
      link.setAttribute('title', unit.name)
      link.setAttribute('type', 'button')
      link.setAttribute('class', 'btn btn-warning nav-thing')
      li.appendChild(link)
      menu.appendChild(link)
    })
  }

  private addUnit (name: string) {
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
}



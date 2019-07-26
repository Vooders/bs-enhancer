export class Nav {
  constructor (
    private readonly document: Document
  ) {
    const body: Element = this.document.getElementsByClassName('battlescribe')[1]

    if (!this.document.getElementById('nav')) {
      const div = this.document.createElement("div")
      div.id = 'nav'
      body.appendChild(div)
    }
  }

  newNavList (id: string, title?:string): HTMLUListElement {
    const div = this.document.createElement('div')
    div.setAttribute('class', 'nav-menu')
    if (title) {
      const heading = this.document.createElement('h3')
      const text = this.document.createTextNode(title)
      heading.appendChild(text)
      div.appendChild(heading)
    }  
    const navList = this.document.createElement("ul")
    navList.setAttribute('id', id)
    navList.setAttribute('class',`nav flex-column`)
    div.appendChild(navList)
    this.document.getElementById('nav')!.appendChild(div)
    return navList
  }
}

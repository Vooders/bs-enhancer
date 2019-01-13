const body: Element = document.getElementsByClassName('battlescribe')[1]

export class Nav {
  static init () {
    const div = document.createElement("div")
    div.id = 'nav'
    body.appendChild(div)
    // addNavList('nav')
  }

  static newNavList (id: string, title:string): HTMLUListElement {
    const div = document.createElement('div')
    div.setAttribute('class', 'nav-menu')
    if (title) {
      var heading = document.createElement('h3')
      var text = document.createTextNode(title)
      heading.appendChild(text)
      div.appendChild(heading)
    }  
    var navList = document.createElement("ul")
    navList.setAttribute('id', id)
    navList.setAttribute('class',`nav flex-column`)
    div.appendChild(navList)
    document.getElementById('nav')!.appendChild(div)
    return navList
  }
}

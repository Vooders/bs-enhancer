export class ElementTools {
  static hide (section: HTMLElement, id: string, buttonText: string): HTMLButtonElement {
    section.setAttribute('id', id + '_selection')
    section.setAttribute('class', 'collapse')

    const revealButton = document.createElement('button')
    const linkText = document.createTextNode(buttonText)
    revealButton.appendChild(linkText)
    revealButton.setAttribute('href', `#${id}_selection`)
    revealButton.setAttribute('data-toggle', 'collapse')
    revealButton.setAttribute('role', 'button')
    revealButton.style.margin = '5px'
    return revealButton
  }

  static toggleClass (element: HTMLElement, cssClass: string): void {
    const classString = element.getAttribute('class')
    const newClass = (classString && classString.includes(cssClass)) ? classString.replace(cssClass, '') : `${classString} ${cssClass}`
    element.setAttribute('class', newClass)
  }
}

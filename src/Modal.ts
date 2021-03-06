export class Modal {
  private readonly body: Element

  constructor (
    private readonly document: Document
  ) {
    this.body = this.document.getElementsByClassName('battlescribe')[1]
  }
  
  create (html: HTMLDivElement, name: string, buttonText: string): HTMLButtonElement {
    const id = name + '_modal'
    const modal = this.document.createElement('div')
    modal.setAttribute('class', 'modal fade')
    modal.setAttribute('id', id)
    modal.setAttribute('tabindex', '-1')
    modal.setAttribute('role', 'dialog')
    modal.setAttribute('aria-hidden', 'true')

    const modalDialog = this.document.createElement('div')
    modalDialog.setAttribute('class', 'modal-dialog')
    modalDialog.setAttribute('role', 'document')

    const modalContent = this.document.createElement('div')
    modalContent.setAttribute('class', 'modal-content')
    modalContent.innerHTML = html.innerHTML

    modalDialog.appendChild(modalContent)
    modal.appendChild(modalDialog)

    this.body.appendChild(modal)

    const triggerButton = this.document.createElement('button')
    const text = this.document.createTextNode(buttonText)
    triggerButton.appendChild(text)
    triggerButton.setAttribute('data-toggle', 'modal')
    triggerButton.setAttribute('data-target', '#' + id)

    return triggerButton
  }
}

const body: Element = document.getElementsByClassName('battlescribe')[1]

export class Modal {
  static create (html: HTMLDivElement, name: string, buttonText: string) {
    var id = name + '_modal'
    var modal = document.createElement('div')
    modal.setAttribute('class', 'modal fade')
    modal.setAttribute('id', id)
    modal.setAttribute('tabindex', '-1')
    modal.setAttribute('role', 'dialog')
    modal.setAttribute('aria-hidden', 'true')

    var modalDialog = document.createElement('div')
    modalDialog.setAttribute('class', 'modal-dialog')
    modalDialog.setAttribute('role', 'document')

    var modalContent = document.createElement('div')
    modalContent.setAttribute('class', 'modal-content')
    modalContent.innerHTML = html.innerHTML

    modalDialog.appendChild(modalContent)
    modal.appendChild(modalDialog)

    body.appendChild(modal)

    var triggerButton = document.createElement('button')
    var text = document.createTextNode(buttonText)
    triggerButton.appendChild(text)
    triggerButton.setAttribute('data-toggle', 'modal')
    triggerButton.setAttribute('data-target', '#' + id)

    return triggerButton
  }
}
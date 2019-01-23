"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const body = document.getElementsByClassName('battlescribe')[1];
class Modal {
    static create(html, name, buttonText) {
        const id = name + '_modal';
        const modal = document.createElement('div');
        modal.setAttribute('class', 'modal fade');
        modal.setAttribute('id', id);
        modal.setAttribute('tabindex', '-1');
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-hidden', 'true');
        const modalDialog = document.createElement('div');
        modalDialog.setAttribute('class', 'modal-dialog');
        modalDialog.setAttribute('role', 'document');
        const modalContent = document.createElement('div');
        modalContent.setAttribute('class', 'modal-content');
        modalContent.innerHTML = html.innerHTML;
        modalDialog.appendChild(modalContent);
        modal.appendChild(modalDialog);
        body.appendChild(modal);
        const triggerButton = document.createElement('button');
        const text = document.createTextNode(buttonText);
        triggerButton.appendChild(text);
        triggerButton.setAttribute('data-toggle', 'modal');
        triggerButton.setAttribute('data-target', '#' + id);
        return triggerButton;
    }
}
exports.Modal = Modal;
//# sourceMappingURL=Modal.js.map
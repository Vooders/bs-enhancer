"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ElementTools {
    static hide(section, id, buttonText) {
        section.setAttribute('id', id + '_selection');
        section.setAttribute('class', 'collapse');
        const revealButton = document.createElement('button');
        const linkText = document.createTextNode(buttonText);
        revealButton.appendChild(linkText);
        revealButton.setAttribute('href', `#${id}_selection`);
        revealButton.setAttribute('data-toggle', 'collapse');
        revealButton.setAttribute('role', 'button');
        revealButton.style.margin = '5px';
        return revealButton;
    }
}
exports.ElementTools = ElementTools;
//# sourceMappingURL=ElementTools.js.map
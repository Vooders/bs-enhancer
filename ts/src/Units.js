"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Nav_1 = require("./Nav");
const Modal_1 = require("./Modal");
const ElementTools_1 = require("./ElementTools");
class Units {
    constructor() {
        this.units = [];
        this.setIds();
    }
    createNavMenu() {
        const menuId = 'nav-menu';
        const menuTitle = 'Units';
        const menu = Nav_1.Nav.newNavList(menuId, menuTitle);
        this.units.forEach((unit) => {
            const li = document.createElement("li");
            li.setAttribute('class', 'nav-item');
            const link = document.createElement('a');
            const linkText = document.createTextNode(unit.name);
            link.appendChild(linkText);
            link.setAttribute('href', '#' + unit.id);
            link.setAttribute('title', unit.name);
            link.setAttribute('type', 'button');
            link.setAttribute('class', 'btn btn-dark nav-button');
            li.appendChild(link);
            menu.appendChild(li);
        });
    }
    createModals() {
        this.getUnitIds().forEach((unitId) => {
            const element = document.getElementById(unitId);
            const button = Modal_1.Modal.create(element, unitId, '+');
            button.setAttribute('class', 'btn btn-dark unit-button');
            element.insertBefore(button, element.firstElementChild);
        });
    }
    hideModelEquipment() {
        this.getUnitIds().forEach((unitId) => {
            const unit = document.getElementById(unitId);
            const equipment = unit.querySelector('ul');
            if (equipment) {
                const revealButton = ElementTools_1.ElementTools.hide(equipment, unitId, 'Show Weapon Selection');
                revealButton.setAttribute('class', 'btn btn-dark unit-button');
                equipment.parentNode.insertBefore(revealButton, equipment);
            }
        });
    }
    setIds() {
        const categories = document.getElementsByClassName('category');
        for (let i = 0; i < categories.length; i++) {
            const units = categories.item(i).getElementsByClassName('rootselection');
            for (let k = 0; k < units.length; k++) {
                const unitElement = units[k];
                const name = unitElement.innerText.split('\n')[0].split('[')[0].trim();
                const correctedName = this.setUniqueName(name);
                const unit = this.addUnit(correctedName);
                console.log(unitElement);
                const nameElement = unitElement.querySelector('h4');
                if (nameElement) {
                    nameElement.innerText = nameElement.innerText.replace(name, correctedName);
                }
                unitElement.setAttribute('id', unit.id);
            }
        }
    }
    setUniqueName(name, i = 0) {
        if (this.getUnitNames().indexOf(name) > -1) {
            const newName = (i > 0) ? name + 'I' : name + ' II';
            return this.setUniqueName(newName, ++i);
        }
        else {
            return name;
        }
    }
    addUnit(name) {
        const unit = {
            name,
            id: name.replace(/ /g, '_')
        };
        this.units.push(unit);
        return unit;
    }
    getUnitNames() {
        return this.units.map((unit) => unit.name);
    }
    getUnitIds() {
        return this.units.map((unit) => unit.id);
    }
}
exports.Units = Units;
//# sourceMappingURL=Units.js.map
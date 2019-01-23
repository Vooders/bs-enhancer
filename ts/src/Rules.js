"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Nav_1 = require("./Nav");
const Modal_1 = require("./Modal");
class Rules {
    constructor() {
        this.rules = {};
        this.getRules();
    }
    logRules() {
        console.log(this.rules);
    }
    buildModals() {
        const ruleTypes = Object.keys(this.rules);
        ruleTypes.forEach((ruleType) => {
            const navList = Nav_1.Nav.newNavList(`${this.makeId(ruleType)}-nav`, ruleType);
            this.rules[ruleType].forEach((rule) => {
                const li = document.createElement("li");
                li.setAttribute('class', 'nav-item');
                const triggerButton = Modal_1.Modal.create(rule.html, this.makeId(rule.name), rule.name);
                triggerButton.setAttribute('class', 'btn btn-dark nav-button');
                li.appendChild(triggerButton);
                navList.appendChild(li);
            });
        });
    }
    makeId(s) {
        return s.replace(/ /g, '_');
    }
    getRules() {
        const ruleSets = document.getElementsByClassName('summary');
        for (let i = 0; i < ruleSets.length; i++) {
            const ruleSet = ruleSets.item(i);
            const rules = ruleSet.getElementsByTagName('p');
            const ruleSetName = ruleSet.firstElementChild.innerText;
            this.rules[ruleSetName] = [];
            for (let k = 0; k < rules.length; k++) {
                const rule = rules[k];
                this.rules[ruleSetName].push({
                    name: rule.firstElementChild.innerHTML.replace(/:/g, ''),
                    html: rule
                });
            }
        }
    }
}
exports.Rules = Rules;
//# sourceMappingURL=Rules.js.map
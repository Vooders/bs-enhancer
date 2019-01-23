"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const body = document.getElementsByClassName('battlescribe')[1];
class Nav {
    static init() {
        const div = document.createElement("div");
        div.id = 'nav';
        body.appendChild(div);
    }
    static newNavList(id, title) {
        const div = document.createElement('div');
        div.setAttribute('class', 'nav-menu');
        if (title) {
            const heading = document.createElement('h3');
            const text = document.createTextNode(title);
            heading.appendChild(text);
            div.appendChild(heading);
        }
        const navList = document.createElement("ul");
        navList.setAttribute('id', id);
        navList.setAttribute('class', `nav flex-column`);
        div.appendChild(navList);
        document.getElementById('nav').appendChild(div);
        return navList;
    }
}
exports.Nav = Nav;
//# sourceMappingURL=Nav.js.map
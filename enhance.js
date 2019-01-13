var body = document.getElementsByClassName('battlescribe')[1]
var head  = document.getElementsByTagName('head')[0]

if (body) {
  loadJquery()

  setTimeout(function () {
    addDependencies()
    const names = getNamesAndAddIds()
    const rules = getRules()
    hideModelEquipment(names)
    buildUnitModals(names)
    createNavContainer()
    buildRuleModals(rules)
    createLinks(names)
    sign()
  }, 100)
}

function loadJquery(){
  var jquery = document.createElement('script')
  jquery.src = 'https://code.jquery.com/jquery-3.3.1.slim.min.js'
  body.appendChild(jquery)
}

function getNamesAndAddIds () {
  var names = []
  const categories = document.getElementsByClassName('category')
  for (let i = 0; i < categories.length; i++) {
    var units = categories.item(i).getElementsByClassName('rootselection')
    for (var k=0; k<units.length; k++) {
      var unit = units[k]
      var name = unit.innerText.split('\n')[0].split('[')[0].trim()
      var correctedName = numberDuplicateNames(names, name)
      names.push(correctedName)
      console.log(`Added ${correctedName}`)
      unit.setAttribute('id', makeId(correctedName))
    }
  }
  return names
}

function numberDuplicateNames (names, name, num = 1) {
  if (num > 10) throw new Error('Arrggghhhh')
  if (names.indexOf(name) > -1) {
    return numberDuplicateNames(names, name+num, ++num)
  } else {
    return name
  }
}

function buildUnitModals (names) {
  names.forEach((name) => {
    const unit = document.getElementById(makeId(name))
    const button = buildModal(unit, makeId(name), '+')
    unit.insertBefore(button, unit.firstElementChild)
  })
}

function getRules () {
  var results = {}
  var ruleSets = document.getElementsByClassName('summary')
  for (let i = 0; i < ruleSets.length; i++) {
    var ruleSet = ruleSets.item(i)
    var rules = ruleSet.getElementsByTagName('p')
    var ruleSetName = ruleSet.firstElementChild.innerText
    results[ruleSetName] = []
    for (let k = 0; k < rules.length; k++) {
      var rule = rules[k]
      results[ruleSetName].push({
        name: rule.firstElementChild.innerHTML.replace(/:/g, ''),
        html: rule.innerHTML
      })
    }
  }
  return results
}

function buildRuleModals (rules) {
  const ruleTypes = Object.keys(rules)
  ruleTypes.forEach((ruleType) => {
    const navList = addNavList(makeId(ruleType), ruleType)
    rules[ruleType].forEach((rule) => {
      navList.appendChild(buildModal(rule.html, makeId(rule.name), rule.name))
    })
  })
}

function hideModelEquipment (names) {
  names.forEach((name) => {
    var unit = document.getElementById(makeId(name))
    var equipment = unit.querySelector('ul')
    if (equipment) {
      var revealButton = hideSection(equipment, makeId(name))
      equipment.parentNode.insertBefore(revealButton, equipment)
    }
  })
}

function hideSection (section, id) {
  section.setAttribute('id', id + '_selection')
  section.setAttribute('class', 'collapse')

  var revealButton = document.createElement('a')
  var linkText = document.createTextNode('+ weapon selection')
  revealButton.appendChild(linkText)
  revealButton.setAttribute('class', 'btn btn-primary btn-sm')
  revealButton.setAttribute('href', `#${id}_selection`)
  revealButton.setAttribute('data-toggle', 'collapse')
  revealButton.setAttribute('role', 'button')
  revealButton.style.margin = '5px'
  return revealButton
}

function buildModal (html, name, text) {
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
  modalContent.innerHTML = html.innerHTML || html

  modalDialog.appendChild(modalContent)
  modal.appendChild(modalDialog)

  body.appendChild(modal)

  var triggerButton = document.createElement('button')
  var buttonText = document.createTextNode(text)
  triggerButton.appendChild(buttonText)
  triggerButton.setAttribute('data-toggle', 'modal')
  triggerButton.setAttribute('data-target', '#' + id)

  return triggerButton
}

function sign () {
  var children = body.children
  for (var i = 0; i < children.length; i++) {
    var child = children[i]
    if (child.localName === 'p') {
      child.innerHTML = child.innerHTML +' enhanced by <a href="https://github.com/Vooders/bs-enhancer" target="_blank">Vooders</a>'
    }
  }
}

function createNavContainer () {
  var div = document.createElement("div")
  div.id = 'nav'
  body.appendChild(div)
  addNavList('nav')
}

function addNavList (id, title = null) {
  var div = document.createElement('div')
  div.setAttribute('class', 'nav-menu')
  if (title) {
    var heading = document.createElement('h3')
    var text = document.createTextNode(title)
    heading.appendChild(text)
    div.appendChild(heading)
  }  
  var navList = document.createElement("ul")
  navList.setAttribute('id', `${id}-list`)
  navList.setAttribute('class',`nav flex-column`)
  div.appendChild(navList)
  document.getElementById('nav').appendChild(div)
  return navList
}

function createLinks (names) {
  for (var i=0; i < names.length; i++) {
    var li = document.createElement("li")
    li.setAttribute('class','nav-item')
    var link = document.createElement('a')
    var linkText = document.createTextNode(names[i])
    link.appendChild(linkText)
    link.setAttribute('href', '#' + makeId(names[i]))
    link.setAttribute('title', names[i])
    link.setAttribute('type', 'button')
    link.setAttribute('class', 'btn btn-warning nav-thing')
    li.appendChild(link)
    document.getElementById('nav-list').appendChild(link)
  }
}

function addDependencies () {
  var cssId = 'bootstrap'
  if (!document.getElementById(cssId)) {
    var bootstrapCss  = document.createElement('link')
    bootstrapCss.id   = cssId
    bootstrapCss.rel  = 'stylesheet'
    bootstrapCss.type = 'text/css'
    bootstrapCss.href = 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css'
    bootstrapCss.media = 'all'

    head.appendChild(bootstrapCss)

    var popper = document.createElement('script')
    popper.src = 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js'
    
    var bootstrap = document.createElement('script')
    bootstrap.src = 'https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js'

    body.appendChild(popper)
    body.appendChild(bootstrap)
  }
}

function makeId (name) {
  return name.replace(/ /g, '_')
}

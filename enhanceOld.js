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


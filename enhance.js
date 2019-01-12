var body = document.getElementsByClassName('battlescribe')[1]
var head  = document.getElementsByTagName('head')[0]

if (body) {
  loadJquery()

  setTimeout(function () {
    const names = getNamesAndAddIds()
    const rules = getRules()
    buildUnitModals(names)
    createNavContainer()
    buildRuleModals(rules)
    createLinks(names)
    addDependencies()
    styleNavContainer()
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
      var correctedName = (names.indexOf(name) > -1) ? name+'1' : name
      names.push(correctedName)
      unit.setAttribute('id', makeId(correctedName))
    }
  }
  return names
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
    const navList = addNavList(makeId(ruleType))
    rules[ruleType].forEach((rule) => {
      navList.appendChild(buildModal(rule.html, makeId(rule.name), rule.name))
    })
  })
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
  modalDialog.style.maxWidth = '800px'

  var modalContent = document.createElement('div')
  modalContent.setAttribute('class', 'modal-content')
  modalContent.innerHTML = html.innerHTML || html
  modalContent.style.padding = '20px'

  modalDialog.appendChild(modalContent)
  modal.appendChild(modalDialog)

  body.appendChild(modal)

  var button = document.createElement('button')
  var buttonText = document.createTextNode(text)
  button.appendChild(buttonText)
  button.setAttribute('data-toggle', 'modal')
  button.setAttribute('data-target', '#' + id)

  return button
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

function createButton (correctedName) {
  var button = document.createElement('a')
  var linkText = document.createTextNode('+ weapon selection')
  button.appendChild(linkText)
  button.setAttribute('class', 'btn btn-primary btn-sm')
  button.setAttribute('href', '#' + makeId(correctedName) + '_selection')
  button.setAttribute('data-toggle', 'collapse')
  button.setAttribute('role', 'button')
  button.style.margin = '5px'
  return button
}

function createNavContainer () {
  var div = document.createElement("div")
  div.id = 'nav'
  body.appendChild(div)
  addNavList('nav')
}

function addNavList (id) {
  var div = document.createElement('div')
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
    link.setAttribute('class', 'btn btn-warning')
    link.style.width = '175px'
    link.style.fontSize = '0.8rem'
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

function styleNavContainer () {
  var nav = document.getElementById('nav')
  nav.style.position = 'fixed'
  nav.style.bottom = '0'
  nav.style.left = '0'
  nav.style.width = '175px'
  nav.style.height = '100%'
  nav.style.backgroundColor = 'white'

  body.style.marginLeft = '180px'
  body.style.marginRight = '0'
}

function makeId (name) {
  return name.replace(/ /g, '_')
}

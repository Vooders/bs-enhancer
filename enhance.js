var categories = document.getElementsByClassName('category')
var body = document.getElementsByClassName('battlescribe')[1]
var head  = document.getElementsByTagName('head')[0]

if (body) {
  loadJquery()

  setTimeout(function () {
    const names = getNames()
    createNavContainer()
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

function getNames () {
  var names = []
  for (let i = 0; i < categories.length; i++) {
    var units = categories.item(i).getElementsByClassName('rootselection')
  
    for (var k=0; k<units.length; k++) {
      var unit = units[k]
      var name = unit.innerText.split('\n')[0].split('[')[0].trim()
      var correctedName = (names.indexOf(name) > -1) ? name+'1' : name
      names.push(correctedName)
      unit.setAttribute('id', makeId(correctedName))
      var ul = unit.querySelector('ul')
      if (ul) {
        ul.setAttribute('id', makeId(correctedName) + '_selection')
        ul.setAttribute('class', 'collapse')
        var button = createButton(correctedName)
        ul.parentNode.insertBefore(button, ul)
      }
      buildModals(unit, name)
    }
  }
  return names
}

function buildModals (html, name) {
  var id = makeId(name) + '_modal'
  var button = document.createElement('button')
  var buttonText = document.createTextNode('+')
  button.appendChild(buttonText)
  button.setAttribute('data-toggle', 'modal')
  button.setAttribute('data-target', '#' + id)
  html.insertBefore(button, html.firstElementChild)
  
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
  modalContent.innerHTML = html.innerHTML
  modalContent.style.padding = '20px'

  modalDialog.appendChild(modalContent)
  modal.appendChild(modalDialog)

  body.appendChild(modal)
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

  var ul = document.createElement("ul")
  ul.setAttribute('id','nav-list')
  ul.setAttribute('class','nav flex-column')
  document.getElementById('nav').appendChild(ul)
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

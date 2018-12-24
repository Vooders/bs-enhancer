var categories = document.getElementsByClassName('category')
var body = document.getElementsByClassName('battlescribe')[1]

const names = getNames()
createNavContainer()
createLinks(names)
addDependencies()
waitForElement()
styleNavContainer()
sign()

function getNames () {
  var names = []
  for (let i = 0; i < categories.length; i++) {
    var units = categories.item(i).getElementsByClassName('rootselection')
  
    for (var k=0; k<units.length; k++) { 
      var name = units[k].innerText.split('\n')[0].split('[')[0].trim()
      var correctedName = (names.indexOf(name) > -1) ? name+'1' : name
      names.push(correctedName)
      units[k].setAttribute('id', makeId(correctedName))
      var ul = units[k].querySelector('ul')
      if (ul) {
        ul.setAttribute('id', makeId(correctedName) + '_selection')
        ul.setAttribute('class', 'collapse')
        var button = createButton(correctedName)
        ul.parentNode.insertBefore(button, ul)
      }
    }
  }
  return names
}

function sign () {
  var children = body.children
  for (var i = 0; i < children.length; i++) {
    var child = children[i]
    if (child.localName === 'p') {
      child.innerHTML = child.innerHTML +' enhanced by <a href="https://github.com/Vooders" target="_blank">Vooders</a>'
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
    link.style.fontSize = '0.8rem'
    li.appendChild(link)
    document.getElementById('nav-list').appendChild(link)
  }
}

function addDependencies () {
  var cssId = 'bootstrap'
  if (!document.getElementById(cssId)) {
    var head  = document.getElementsByTagName('head')[0]
    var bootstrapCss  = document.createElement('link')
    bootstrapCss.id   = cssId
    bootstrapCss.rel  = 'stylesheet'
    bootstrapCss.type = 'text/css'
    bootstrapCss.href = 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css'
    bootstrapCss.media = 'all'

    var jquery = document.createElement('script')
    jquery.src = 'https://code.jquery.com/jquery-3.3.1.slim.min.js'
    body.appendChild(jquery)
    head.appendChild(bootstrapCss)

  }
}

function waitForElement(){
  console.log('checking G')
  if(typeof g !== undefined || g !== null){
    console.log('G is defined')
    var popper = document.createElement('script')
    popper.src = 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js'
    
    var bootstrap = document.createElement('script')
    bootstrap.src = 'https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js'

    body.appendChild(popper)
    body.appendChild(bootstrap)
  } else {
    console.log('waiting...')
    setTimeout(waitForElement, 250);
  }
}

function styleNavContainer () {
  var nav = document.getElementById('nav')
  nav.style.position = 'fixed'
  nav.style.bottom = '0'
  nav.style.left = '0'
  nav.style.width = '40px'
  nav.style.height = '100%'
  nav.style.backgroundColor = 'white'

  body.style.marginLeft = '180px'
  body.style.marginRight = '0'
}

function makeId (name) {
  return name.replace(/ /g, '_')
}

var categories = document.getElementsByClassName('category')

const names = getNames()
createNavContainer()
createLinks(names)
addBootstrap()
styleNavContainer()

function getNames () {
  var names = []
  for (let i = 0; i < categories.length; i++) {
    var units = categories.item(i).getElementsByClassName('rootselection')
  
    for (var k=0; k<units.length; k++) { 
      var name = units[k].innerText.split('\n')[0].split('[')[0].trim()
      var correctedName = (names.indexOf(name) > -1) ? name+'1' : name
      names.push(correctedName)
      units[k].setAttribute('id', makeId(correctedName))
    }
  }
  return names
}

function createNavContainer () {
  var div = document.createElement("div")
  div.id = 'nav'
  document.getElementsByClassName('battlescribe')[1].appendChild(div)

  var ul = document.createElement("ul")
  ul.setAttribute('id','nav-list')
  document.getElementById('nav').appendChild(ul)
}

function createLinks (names) {
  for (var i=0; i < names.length; i++) {
    var li = document.createElement("li")
    var link = document.createElement('a')
    var linkText = document.createTextNode(names[i])
    link.appendChild(linkText);
    link.setAttribute('href', '#' + makeId(names[i]))
    link.setAttribute('title', names[i])
    link.setAttribute('class', 'btn')
    li.appendChild(link)
    document.getElementById('nav-list').appendChild(link)
  }
}

function addBootstrap () {
  var cssId = 'bootstrap'
  if (!document.getElementById(cssId)) {
    var head  = document.getElementsByTagName('head')[0]
    var link  = document.createElement('link')
    link.id   = cssId
    link.rel  = 'stylesheet'
    link.type = 'text/css'
    link.href = 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css'
    link.media = 'all'
    head.appendChild(link)
  }
}

function styleNavContainer () {
  var nav = document.getElementById('nav')
  nav.style.position = 'fixed'
  nav.style.bottom = '0'
  nav.style.left = '0'
  nav.style.width = '100%'
  nav.style.height = '30px'
  nav.style.backgroundColor = '#ccc'
}

function makeId (name) {
  return name.replace(/ /g, '_')
}

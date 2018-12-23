var categories = document.getElementsByClassName('category')
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

console.log(names)
var div = document.createElement("div")
div.id = 'nav'
document.getElementsByClassName('battlescribe')[1].appendChild(div)

var ul = document.createElement("ul")
ul.setAttribute('id','nav-list')
document.getElementById('nav').appendChild(ul)

for (var i=0; i < names.length; i++) {
  var li = document.createElement("li")
  var link = document.createElement('a')
  var linkText = document.createTextNode(names[i])
  link.appendChild(linkText);
  link.setAttribute('href', '#' + makeId(names[i]))
  link.setAttribute('title', names[i])
  console.log(link)
  li.appendChild(link)
  document.getElementById('nav-list').appendChild(link)
}

var cssId = 'bootstrap';  // you could encode the css path itself to generate id..
if (!document.getElementById(cssId))
{
    var head  = document.getElementsByTagName('head')[0];
    var link  = document.createElement('link');
    link.id   = cssId;
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css';
    link.media = 'all';
    head.appendChild(link);
}

function makeId (name) {
  return name.replace(/ /g, '_')
}

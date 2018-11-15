'use strict';

(function () {
  function init() {
    var router = new Router([
      new Route('home', 'home.html', true),
      new Route('websites', 'websites.html', false),
      new Route('blog', 'blogs.html', false)
    ]);
  }
  init();
}());

window.loadPost = function(post){
  document.getElementById('app').style.top = "100px";
  document.getElementById('app').style.bottom = "auto";

  var url = 'blogs/' + post+'.html',
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      document.getElementById(post).innerHTML = this.responseText;

      setTimeout(function(){
        var converter = new showdown.Converter(),
        text = document.getElementsByClassName('meat')[0].innerText
        document.getElementsByClassName('meat')[0].innerHTML = converter.makeHtml(text)
      },100)
    }
  };
  xhttp.open('GET', url, true);
  xhttp.send();
}

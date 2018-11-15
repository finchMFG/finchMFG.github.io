'use strict';

function Router(routes) {
    try {
        if (!routes) {
            throw 'error: routes param is mandatory';
        }
        this.constructor(routes);
        this.init();
    } catch (e) {
        console.error(e);
    }
}

Router.prototype = {
    routes: undefined,
    rootElem: undefined,
    constructor: function (routes) {
        this.routes = routes;
        this.rootElem = document.getElementById('app');
    },
    init: function () {
        var r = this.routes;
        (function(scope, r) {
            window.addEventListener('hashchange', function (e) {
                scope.hasChanged(scope, r);
            });
        })(this, r);
        this.hasChanged(this, r);
    },
    hasChanged: function(scope, r){
        if (window.location.hash.length > 0) {
            for (var i = 0, length = r.length; i < length; i++) {
                var route = r[i];
                if(route.isActiveRoute(window.location.hash.substr(1))) {
                    scope.goToRoute(route.htmlName);
                    if(route.name.includes('web') || route.name.includes('game')){
                      window.document.title = route.name.charAt(0).toUpperCase() + route.name.slice(1) + ' by FinchMFG'
                      document.getElementsByClassName('quickBlog')[0].style.display = 'block'
                    }else{
                      window.document.title = 'FinchMFG'
                      document.getElementsByClassName('quickBlog')[0].style.display = 'block'
                    }

                    if(route.name.includes('blog')){
                      window.document.title = 'Rambles by FinchMFG'
                      document.getElementsByClassName('quickBlog')[0].style.display = 'none'
                    }else{
                      document.getElementById('app').style.top = "0";
                      document.getElementById('app').style.bottom = "0";
                    }
                }
            }
        } else {
            for (var i = 0, length = r.length; i < length; i++) {
                var route = r[i];
                if(route.default) {
                    scope.goToRoute(route.htmlName);
                }
            }
        }
    },
    goToRoute: function (htmlName) {
        (function(scope) {
            var url = 'views/' + htmlName,
                xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    scope.rootElem.innerHTML = this.responseText;
                }
            };
            xhttp.open('GET', url, true);
            xhttp.send();
        })(this);
    }
};

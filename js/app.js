'use strict';

(function () {
    function init() {
        var router = new Router([
            new Route('home', 'home.html', true),
            new Route('websites', 'websites.html', false),
            new Route('blog', 'retro-dew.html', false)
        ]);
    }
    init();
}());

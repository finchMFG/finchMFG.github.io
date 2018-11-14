'use strict';

(function () {
    function init() {
        var router = new Router([
            new Route('home', 'home.html', true),
            new Route('websites', 'websites.html', true),
            new Route('games', 'games.html', true),
            new Route('blog', 'blog.html', true),            
        ]);
    }
    init();
}());

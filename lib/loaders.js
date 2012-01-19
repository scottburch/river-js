define(function() {

    return {
        css:css
    }

    function css(href) {
        var el = document.createElement('link');
        el.setAttribute('rel', 'stylesheet');
        el.setAttribute('href', href);
        document.getElementsByTagName("head")[0].appendChild(el);
    }
});
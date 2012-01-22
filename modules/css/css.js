defineModule({name:'css', category:'river', description:'css utilities'}, function (that) {

    that.do_loadCss = function (data, module) {
        var el = document.createElement('link');
        el.setAttribute('rel', 'stylesheet');
        el.setAttribute('href', module.modulePath + '/' + data.href);
        document.getElementsByTagName("head")[0].appendChild(el);
    };

});

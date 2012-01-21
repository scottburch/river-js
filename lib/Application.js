define(function() {
    "use strict";
    var Application;
    var ModuleManager;
    var host;
    var params;

    return Application = {
        start: function(baseDir, modules, cb) {
            Application.baseDir = baseDir || '';
            getParams();
            loadModules(modules, cb);
        },
        setHost: function(v) {
            host = v;
        },
        getHost: function() {
            return host;
        },
        getParam: function(name) {
            return params[name];
        }
    };

    function getParams() {
        var href = window.location.href;
        href = href.split('#')[0];
        var queryString = href.split('?')[1] || '';
        params = queryString.split('&').reduce(function(ret, it) {
            var parts = it.split('=');
            ret[parts[0]] = parts[1];
            return ret;
        },{});
    }

    function loadModules(modules, cb) {
        require(['lib/ModuleManager'], function(mm){
            ModuleManager = mm;
            ModuleManager.loadModules(modules, cb);
        });
    }
});
defineModule({a:1,b:2}, function(that) {
    that.c = 3;

    that.on_moduleManager_modulesLoaded = function() {
        that.modulesLoadedFired = true;
    };

    that.filterEvents = function(module, cb) {
        var x = 10;
        cb()
    };

    that.on_mod1_someEvent = function(data) {};

    that.do_something = function(data, module) {};


});
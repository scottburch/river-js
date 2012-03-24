defineModule(function(that) {
    that.c = 3;

    that.on_mod1_someEvent = function(data) {};

    that.do_something = function(data, module) {};

    that.beforeEach = function() {
        that.beforeEachRun = true;
    };


});
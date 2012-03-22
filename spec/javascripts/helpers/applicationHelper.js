(function () {

    var modules = [
//        {name: 'widgets'},
//        {name:'model'},
//        {name:'commonUtils'},
//        {name:'desktop'},
//        {name:'domain'},
//        {name:'limTree'},
//        {name: 'serverRequest'},
//        {name: 'limCreator'},
//        {name: 'widgets'},
//        {name: 'messageBox'}
    ];

    beforeEach(function loadModules() {
        runOnce(function () {
            var modulesLoaded;

            runs(function () {
                require(['lib/Application'], function (Application) {
                    window.Application = Application;
                    Application.start('', modules, function() {
                        modulesLoaded = true;
                    });
                });
            });

            waitsFor(function () {
                return modulesLoaded;
            });
            runs(function() {
//                require('serverRequestModule').enable(false);
            });
        });
    });


/*
    // Block require from loading views
    (function () {
        var oldRequire = window.require;

        window.require = function (deps, cb) {
            if (Array.isArray(deps)) {
                deps = deps.reduce(function (ret, it) {
                    /View$/.test(it) || ret.push(it);
                    return ret;
                }, []);
            }
            if (deps.length) {
                return oldRequire(deps, cb);
            }
        };
        window.require.config = oldRequire.config;
    }());

    window.getRequireSpy = function(cb) {
        require(['lib/Module'], function (Module) {
            var requireSpy = spyOn(window, 'require').andCallFake(function (names, cb) {
                var name = names[0].replace(/.*\//, '').replace(/Module$/, '');
                var module = Module({name:name, category:'system'});
                module.on_moduleManager_modulesLoaded = jasmine.createSpy();
                cb(module);
            });
            requireSpy.config = function () {
            };
            cb(requireSpy);
        });
    }

*/
}());

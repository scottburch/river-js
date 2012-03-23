(function () {

    var modules = [
    ];

    beforeEach(function loadModules() {
        runOnce(function () {
            var modulesLoaded;

            runs(function () {
                require(['river/lib/Application'], function (Application) {
                    window.Application = Application;
                    Application.start('spec/modules', modules, function() {
                        modulesLoaded = true;
                    });
                });
            });

            waitsFor(function () {
                return modulesLoaded;
            });
        });
    });


}());

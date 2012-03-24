(function () {

    var modules = [
    ];


    function loadModules() {
        runs(function () {
            require(['river/lib/Application'], function (Application) {
                window.Application = Application;
                Application.start('spec/modules', modules, function() {
                    asyncSpecDone();
                });
            });
        });
        asyncSpecWait();
    }


    beforeEach(function() {
        runOnce(loadModules);
    });


}());

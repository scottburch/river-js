(function () {

    var modules = [
        {path: 'moduleManagerTests'}
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

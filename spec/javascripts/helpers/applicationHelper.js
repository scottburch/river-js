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
        });
    });


}());

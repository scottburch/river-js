describe('Application', function() {

    var Application;

    requireDependencies(['river/lib/Application'], function(a) {
        Application = a;
        Application.start('myModulesDir', function() {});
    });

    beforeEach(function() {
        spyOn(window,'require');
    });

    describe('start()', function() {
        it('sets the Application.modulesDir directory', function() {
            expect(Application.modulesDir = 'myModulesDir');
        });
    });
});
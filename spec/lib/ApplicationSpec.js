describe('Application', function() {

    var Application;

    requireDependencies(['river/lib/Application'], function(a) {
        Application = a;
        Application.start('myBaseDir', function() {});
    });

    beforeEach(function() {
        spyOn(window,'require');
    });

    describe('start()', function() {
        it('sets the Application.baseDir directory', function() {
            expect(Application.baseDir = 'myBaseDir');
        });
    });
});
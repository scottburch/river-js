describe('lib/Observable', function() {
    return;
    var observable;

    requireDependencies(['vendor/river/lib/Observable'],function(Observable) {
        observable = Observable()
    });


    describe('on() method', function() {
        it('registers listener', function() {
            var cbSpy = jasmine.createSpy();
            observable.on('myEvent', cbSpy);
            observable.fireEvent('myEvent');
            expect(cbSpy).toHaveBeenCalled();
        });
    });

    describe('un() method', function() {
        it('unregisters listener', function() {
            var cbSpy = jasmine.createSpy();
            observable.on('myEvent', cbSpy);
            observable.fireEvent('myEvent');
            expect(cbSpy.callCount).toBe(1);

            observable.un('myEvent', cbSpy);
            observable.fireEvent('myEvent');
            expect(cbSpy.callCount).toBe(1);
        });
    });

    describe('fireEvent() method', function() {
        it('sends the object to the callback along with arguments', function() {
            var cbSpy = jasmine.createSpy();
            observable.on('myEvent', cbSpy);
            observable.fireEvent('myEvent',1,2,3);
            expect(cbSpy).toHaveBeenCalledWith(observable, 1,2,3);
        });
    });
});
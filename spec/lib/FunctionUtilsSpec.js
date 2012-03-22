describe('modules:commonUtils:function', function() {
    return;
    var functionUtils, target, advice, aopFunc;



    beforeEach(function() {
        functionUtils = require('commonUtilsModule')['function'];
    });

    beforeEach(function() {
        target = jasmine.createSpy();
        advice = jasmine.createSpy();
    });

    describe('bounceProtect()', function() {

        it('should keep a function from being again before x miliseconds when delay = false', function() {
            var spy = jasmine.createSpy();
            var func = functionUtils.bounceProtect(spy, 20);
            func();
            func();
            func();
            expect(spy.callCount).toBe(1);
            waits(50);
            runs(function() {
                func();
                expect(spy.callCount).toBe(2);
            });
        });

        it('should run a function only once after x milliseconds when delay=true', function() {
            var spy = jasmine.createSpy();
            var func = functionUtils.bounceProtect(spy, 20, true);
            func();
            func();
            func();
            expect(spy).not.toHaveBeenCalled();
            waitsFor(function() {
                return spy.callCount;
            });
        });
    });


    describe('aopAround()', function() {

        beforeEach(function() {
            aopFunc = functionUtils.aopAround(target, advice);
        });

        it('sends the arguments with the original function to the advice function', function() {
            aopFunc(1,2,3);
            expect(advice).toHaveBeenCalledWith(target, 1,2,3);
        });
    });

    describe('aopBefore()', function() {
        beforeEach(function() {
            aopFunc = functionUtils.aopBefore(target, advice);
        });

        it('sends the arguments to the aop advice', function() {
            aopFunc(1,2,3);
            expect(advice).toHaveBeenCalledWith(1,2,3);
        });

        it('sends the same arguments to the aop advice if the function has no return', function() {
            aopFunc(1,2,3);
            expect(target).toHaveBeenCalledWith(1,2,3);
        });

        it('sends the arguments returned from the advice if something is returned', function() {
            advice.andReturn([4,5,6]);
            aopFunc(1,2,3);
            expect(target).toHaveBeenCalledWith(4,5,6);
        });
    });

    describe('aopAfter()', function() {
        beforeEach(function() {
            aopFunc = functionUtils.aopAfter(target, advice);
        });

        it('sends the advice the return of the function along with the original arguments', function() {
            target.andReturn('testing');
            aopFunc(1,2,3);
            expect(advice).toHaveBeenCalledWith('testing', 1,2,3);
        });

        it('sends only the arguments to the target', function() {
            aopFunc(1,2,3);
            expect(target).toHaveBeenCalledWith(1,2,3);
        });
    });

    describe('memoize()', function() {

        it('runs a function only once while remembering the return value', function() {
            var target = jasmine.createSpy().andReturn('testing');
            var func = functionUtils.memoize(target);

            expect(func(1,2,3)).toBe('testing');
            expect(func(1,2,3)).toBe('testing');

            expect(target.callCount).toBe(1);
            expect(target).toHaveBeenCalledWith(1,2,3);


        });

    });

});
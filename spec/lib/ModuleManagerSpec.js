describe('lib:ModuleManager', function () {

    var ModuleManager;


    function loadModules() {
        ModuleManager.loadModules([
            {path:'spec/modules/mod1'},
            {path:'spec/modules/mod2'}
        ],asyncSpecDone);
        asyncSpecWait();
    }

    requireDependencies(['river/lib/ModuleManager'], function (mm) {
        ModuleManager = mm;
    });

    beforeEach(function() {
        runOnce(loadModules);
    })


    describe('loadModules()', function () {
        it('should load the module and create mod1Module require config', function () {
            var mod1;
            then('module uses passed config object', function () {
                mod1 = require('mod1Module');
                expect(mod1.a).toBe(1);
                expect(mod1.b).toBe(2);
                expect(mod1.c).toBe(3);
            });

            then('module manager fires modulesLoaded event', function () {
                waitsFor(function () {
                    return mod1.modulesLoadedFired;
                });
            });
        });
    });


    describe('getNameFromPath()', function () {
        var getNameFromPath;
        beforeEach(function () {
            getNameFromPath = ModuleManager.test.getNameFromPath;
        });
        it('returns the original name if no "/"', function () {
            expect(getNameFromPath('myModule')).toBe('myModule');
        });
        it('returns the module name part of the path', function () {
            expect(getNameFromPath('http://x.com/some/dir/myModule')).toBe('myModule');
        });
    });

    describe('getLocationFromPath()', function () {
        var getLocationFromPath;
        beforeEach(function () {
            getLocationFromPath = ModuleManager.test.getLocationFromPath;
        });
        it('returns an empty string if only name is given', function () {
            expect(getLocationFromPath('myModule')).toBe('');
        });

        it('returns the location part of the path only', function () {
            expect(getLocationFromPath('http://x.com/some/dir/myModule')).toBe('http://x.com/some/dir');
        });
    });


    describe('events', function () {
        var mod1;
        beforeEach(function () {
            mod1 = require('mod1Module');
            spyOn(mod1, 'on_mod1_someEvent');
        });

        scenario('firing events', function () {
            when('someEvent is fired', function () {
                mod1.fireEvent('someEvent', 'myData1');
            });
            then('someEvent hook is called with data', function () {
                waitsFor(function () {
                    return mod1.on_mod1_someEvent.callCount;
                });
                runs(function () {
                    expect(mod1.on_mod1_someEvent).toHaveBeenCalledWith('myData1');
                });
            });
        });
    });

    describe('actions', function() {
        var mod1;
        beforeEach(function() {
            mod1 = require('mod1Module');
            spyOn(mod1, 'do_something');
        });

        scenario('requesting actions', function() {
            when('somebody requests an event', function() {
                mod1.doAction('something', 'data1');
            });

            then('action hook called with data and original module', function() {
                waitsFor(function() {
                    return mod1.do_something.callCount;
                });
                runs(function() {
                    expect(mod1.do_something).toHaveBeenCalledWith('data1', mod1);
                });
            });
        });
    });

    describe('event filtering', function() {
        var mod1, mod2, passedFilter;
        beforeEach(function() {
            mod1 = require('mod1Module');
            mod2 = require('mod2Module');
            spyOn(mod1, 'filterEvents').andCallFake(function(obj, cb) {
                cb(passedFilter);
            });
            spyOn(mod2, 'on_mod1_someEvent');
        });

        scenario('filtering events with pass filter', function() {
            given('an event with data', function() {
                mod1.fireEvent('someEvent', 'someData');
            });
            then('the filter is called with the originating module and a callback', function() {
                waitsFor(function() {
                    return mod1.filterEvents.callCount;
                },'waiting for filterEvents to be called',1000);
                runs(function() {
                    expect(mod1.filterEvents.calls[0].args[0].module).toBe(mod1);
                    expect(mod1.filterEvents.calls[0].args[0].event).toBe('someEvent');
                    expect(mod1.filterEvents.calls[0].args[0].args[0]).toBe('someData');
                    expect(mod1.filterEvents.calls[0].args[0].type).toBe('event');
                });
            });

            then('mod2 event is also called', function() {
                waitsFor(function() {
                    return mod2.on_mod1_someEvent.callCount
                });
                runs(function() {
                    expect(mod2.on_mod1_someEvent).toHaveBeenCalledWith('someData');
                });

            });
        });

        scenario('filtering events with fail filter', function() {
            given('a failing filter', function() {
                passedFilter = false;
            });
            given('an event with data', function() {
                mod1.fireEvent('someEvent','someData');
            });
            then('mod2 event is not called', function() {
                asyncSpecWait();
                setTimeout(asyncSpecDone,200);
                runs(function() {
                    expect(mod2.on_mod1_someEvent).not.toHaveBeenCalled();
                });
            });
        });
    });

    describe ('beforeEach()', function() {
        var mod2, mod1;
        beforeEach(function() {
            mod2 = require('mod2Module');
            mod1 = require('mod1Module');
        });
        it('runs before events are fired', function() {
            mod2.beforeEachRun = false;
            mod1.fireEvent('someEvent');
            waitsFor(function() {
                return mod2.beforeEachRun;
            },'beforeEach() to run',1000);
        });

    });
});
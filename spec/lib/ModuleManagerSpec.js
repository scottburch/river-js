describe('lib:ModuleManager', function () {

    var ModuleManager;


    requireDependencies(['river/lib/ModuleManager'], function (mm) {
        ModuleManager = mm;
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

    describe('loadModules()', function () {
        it('should load the module and create mod1Module require config', function () {
            var mod1;
            when('loading modules', function () {
                ModuleManager.loadModules([
                    {path:'spec/modules/mod1'}
                ], asyncSpecDone);
                asyncSpecWait();
            });
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

    /*
     var ModuleManager, Module, module1, module2;
     var moduleList = [
     {name:'mod1'},
     {name:'mod2'}
     ];
     var modulesLoadedSpy = jasmine.createSpy('init module spy');
     var loadModulesCallbackSpy = jasmine.createSpy();
     var requireSpy;

     var headless_mode = /jasmine-headless/.test(navigator.userAgent);

     requireDependencies(['lib/ModuleManager', 'lib/Module'], function (mm, mod) {
     ModuleManager = mm;
     Module = mod;
     });

     beforeEach(function() {
     spyOn(window, 'setTimeout').andCallFake(function(func) {
     try {
     func();
     } catch(e) {}
     });
     runOnce(setup);
     });



     describe('loadModules() method', function () {

     it('uses require to load modules', function () {
     expect(requireSpy).toHaveBeenCalled();
     });

     it('calls the callback after modules are loaded', function() {
     expect(loadModulesCallbackSpy).toHaveBeenCalled();
     });

     it('fires a loaded event only once per module', function () {
     expect(module1.on_moduleManager_modulesLoaded.callCount).toBe(1);
     });

     it('only loads modules once', function() {
     ModuleManager.loadModules(moduleList, loadModulesCallbackSpy);
     expect(ModuleManager.getModules().length).toBe(moduleList.length);
     });

     it('calls the callback function', function() {
     expect(loadModulesCallbackSpy).toHaveBeenCalled();
     });
     });

     describe('fireEvent()', function() {
     var eventSpy;

     beforeEach(function() {
     eventSpy = jasmine.createSpy();
     module1.on_xx_event = module2.on_xx_event = eventSpy;
     });

     it('fires events on all enabled modules', function() {
     ModuleManager.fireEvent('xx','event','myData');
     expect(eventSpy.callCount).toBe(moduleList.length);
     });

     it('passes data to the event hook on the module', function() {
     ModuleManager.fireEvent('xx','event','myData');
     expect(eventSpy).toHaveBeenCalledWith('myData');
     });

     it('does not call events on disabled modules', function() {
     module1.enable(false);
     ModuleManager.fireEvent('xx','event');
     expect(eventSpy.callCount).toBe(moduleList.length - 1);
     module1.enable(true);
     });

     it('passes an empty object if no data specified', function() {
     ModuleManager.fireEvent('xx','event');
     expect(eventSpy).toHaveBeenCalledWith({});
     });

     if (!headless_mode) {
     it('continues to fire events on modules even if an earlier one fails', function() {
     var exceptionSpy = jasmine.createSpy('spy before exception');
     module1.on_xx_event = function() {
     exceptionSpy();
     throw 'test exception - ignore this';
     };
     ModuleManager.fireEvent('xx','event');
     expect(eventSpy).toHaveBeenCalled();
     expect(exceptionSpy).toHaveBeenCalled();
     });
     }

     it('calls hooks without module noame if none is passed', function() {
     var someEventSpy = jasmine.createSpy();
     module1.on_someEvent = someEventSpy;
     ModuleManager.fireEvent('', 'someEvent');
     expect(someEventSpy).toHaveBeenCalled();
     });
     });

     describe('doAction', function() {
     var actionSpy;

     beforeEach(function() {
     actionSpy = jasmine.createSpy();
     module1.do_something = module2.do_something = actionSpy;
     });

     it('calls action on all enabled modules', function() {
     ModuleManager.doAction('something','someData');
     expect(actionSpy).toHaveBeenCalledWith('myModule','someData');
     expect(actionSpy.callCount).toBe(2);
     });

     });

     describe('getModule() method', function() {
     it('returns the module if found', function() {
     expect(ModuleManager.getModule('mod1')).toBe(module1);
     });
     it('returns undefined if not found', function() {
     expect(ModuleManager.getModule('fake')).toBe(undefined);
     });
     });

     function setup() {
     runs(function() {
     getRequireSpy(function(r) {
     requireSpy = r;
     });
     });
     waitsFor(function() {
     return requireSpy;
     });
     runs(loadTestModules);

     function loadTestModules() {
     ModuleManager.loadModules(moduleList, loadModulesCallbackSpy);
     module1 = ModuleManager.getModules()[0];
     module2 = ModuleManager.getModules()[1];
     }
     } */
});
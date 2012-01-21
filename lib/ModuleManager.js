define(['lib/Module'], function (Module) {
    "use strict";
    var modules = [];

    var that = {
        loadModules:loadModules,
        getModules:getModules,
        fireEvent:fireEvent,
        doAction:doAction,
        getModule:getModule,
        addModule:addModule
    };

    function getModule(name) {
        for(var i = modules.length; i--;) {
            var mod = modules[i];
            if(mod.name === name) {
                return mod;
            }
        }
    }

    function addModule(moduleDef, cb) {
        if (getModule(moduleDef.name)) {
            cb();
        } else {
            moduleDef.dir = moduleDef.dir || 'modules';
            var modulePath = [moduleDef.dir, moduleDef.name].join('/');
            // add module paths to require
            window.requireConfig.paths[moduleDef.name + 'Module'] = modulePath + '/' + moduleDef.name;
            require.config(window.requireConfig);

            require([moduleDef.name + 'Module'], function (mediator) {
                mediator.modulePath = modulePath;
                modules.push(mediator);
                cb();
            });
        }
    }

    function loadModules(moduleList, cb) {
        window.async.forEach(moduleList, function (item, next) {
            addModule(item, next);
        }, fireModulesLoaded);

        function fireModulesLoaded() {
            fireEvent('moduleManager', 'modulesLoaded');
            cb && cb();
        }
    }

    function fireEvent(moduleName, event, data) {
        data = data || {};
        callHooks(moduleName ? 'on_' + moduleName + '_' + event : 'on_' + event, data);
        if (event !== 'eventFired') {
            fireEvent('moduleManager', 'eventFired', {moduleName:moduleName, event:event, data:data});
        }
    }

    function doAction(action, data) {
        data = data || {};
        callHooks('do_' + action, data);
    }

    function callHooks(hook) {
        var args = Array.prototype.slice.call(arguments, 1);
        window.async.forEach(modules, function (module,next) {
            setTimeout(function () {
                var hookFunc = module[hook];
                module.isEnabled() && hookFunc && hookFunc.apply(hookFunc, args);
                next()
            }, 0);
        },function() {});
    }

    function getModules() {
        return modules;
    }

    window.defineModule = function (config, cb) {
        config.requires = config.requires || [];
        config.requires = Array.isArray(config.requires) ? config.requires : [config.requires];
        define(config.requires, function () {
            var mod = Module({name:config.name, category:config.category, description:config.description});
            var args = [mod].concat(Array.prototype.slice.call(arguments, 0));
            cb.apply(mod, args);
            return mod;
        });
    };

    return that;


});
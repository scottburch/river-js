define(function () {
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
        callHooks(moduleName ? 'on_' + moduleName + '_': 'on_', event, data);
        if (event !== 'eventFired') {
            // TODO: Put this back after figuring out why it blows up IE - only affects event logging right now
            if (navigator.appName !== 'Microsoft Internet Explorer') {
                fireEvent('moduleManager', 'eventFired', {moduleName:moduleName, event:event, data:data});
            }
        }
    }

    function doAction(action, data, module) {
        data = data || {};
        callHooks('do_', action, data, module);
    }

    function filterRules(module, op, cb) {
        window.async.every(modules, function(mod, next){
            mod.filterEvents ?  mod.filterEvents({module:module, event:op}, next) : next(true);
        }, function (result) {
            result && cb();
        });
    }

    function callHooks(prefix, op) {
        var hook = prefix + op;
        var args = Array.prototype.slice.call(arguments, 2);

        window.async.forEach(modules, function (module,next) {
            setTimeout(function () {
                var hookFunc = module[hook];
                if (module.isEnabled() && hookFunc) {
                    filterRules(module, op, function () {
                        hookFunc.apply(hookFunc, args);
                    });
                }
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
        define(['river/lib/Module'].concat(config.requires), function (Module) {
            var mod = Module({name:config.name, category:config.category, description:config.description});
            var args = [mod].concat(Array.prototype.slice.call(arguments, 1));
            cb.apply(mod, args);
            return mod;
        });
    };

    return that;


});
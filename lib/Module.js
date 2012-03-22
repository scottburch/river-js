define(['river/lib/ModuleManager'], function (ModuleManager) {

    return function (that) {
        var enabled = true;
        that.isEnabled = function () {
            return enabled;
        };
        that.enable = function (v) {
            enabled = v;
        };

        that.fireGlobalEvent = function(ev, data) {
            ModuleManager.fireEvent('', ev, data);
        }

        that.fireEvent = function(ev, data) {
            ModuleManager.fireEvent(that.name, ev, data);
        };

        that.doAction = function(action, data) {
            ModuleManager.doAction(action, data, that);
        }

        that.require = function (paths, cb) {
            paths = Array.isArray(paths) ? paths : [paths];
            paths = paths.map(function (path) {
                if(path.indexOf('!') !== -1) {
                    return path.split('!')[0] + '!' + that.modulePath + '/' + path.split('!')[1];
                } else {
                    return that.modulePath + '/' + path;
                }
            });
            require(paths, function () {
                cb.apply(that, arguments);
            });
        };

        return that;
    }
});
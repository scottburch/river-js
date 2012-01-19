define(function () {

    return function (that) {
        var enabled = true;
        that.isEnabled = function () {
            return enabled;
        };
        that.enable = function (v) {
            enabled = v;
        };

        that.require = function (paths, cb) {
            paths = Array.isArray(paths) ? paths : [paths];
            paths = paths.map(function (path) {
                return that.modulePath + '/' + path;
            });
            require(paths, function () {
                cb.apply(that, arguments);
            });
        };

        return that;
    }
});
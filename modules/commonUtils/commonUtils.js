defineModule({
    name:'utils',
    category:'river',
    description:'Various utilities'
}, function (that) {

    that.array = ArrayUtils();
    that['function'] = FunctionUtils();
    that.object = ObjectUtils();


    function ObjectUtils() {
        "use strict";
        var that = {};

        that.forEach = function (obj, func) {
            Object.keys(obj).forEach(function (key) {
                func(key, obj[key]);
            });
        };

        that.values = function (obj) {
            return Object.keys(obj).map(function (key) {
                return obj[key];
            });
        };

        that.isObject = function (obj) {
            return typeof obj === 'object' && Array.isArray(obj) === false;
        }

        that.clone = function (obj) {

            return cloneObject(obj, {});

            function cloneObject(source, dest) {
                that.forEach(source, function (key, value) {
                    if (that.isObject(value)) {
                        return cloneObject(value, dest[key] = {});
                    }
                    if (Array.isArray(value)) {
                        return cloneArray(value, dest[key] = []);
                    }
                    ;
                    dest[key] = value;
                });
                return dest;
            }

            function cloneArray(source, dest) {
                source.forEach(function (it) {
                    if (that.isObject(it)) {
                        var o = {};
                        dest.push(o);
                        return cloneObject(it, o);
                    }
                    if (Array.isArray(it)) {
                        var arr = [];
                        dest.push(arr);
                        return cloneArray(it, arr);
                    }
                    dest.push(it);
                });
            }
        }

        return that;
    }

    function FunctionUtils() {
        "use strict";
        var that = {};

        that.bounceProtect = function (target, milli, delay) {
            return function () {
                if (!target.alreadyCalled) {
                    target.alreadyCalled = true;
                    !delay && target();
                    setTimeout(function () {
                        delay && target();
                        target.alreadyCalled = false;
                    }, milli);
                }
            }
        };

        that.aopAround = function (target, advice) {
            return function () {
                var args = [target].concat(Array.prototype.slice.call(arguments, 0));
                advice.apply(advice, args);
            }
        };

        that.aopBefore = function (target, advice) {
            return that.aopAround(target, function () {
                var args = Array.prototype.slice.call(arguments, 1);
                args = advice.apply(advice, args) || args;
                target.apply(target, args);
            });
        };

        that.aopAfter = function (target, advice) {
            return that.aopAround(target, function () {
                var args = Array.prototype.slice.call(arguments, 1);
                var ret = target.apply(target, args);
                args = [ret].concat(args);
                advice.apply(advice, args);
            });
        };

        that.memoize = function (target) {
            return function memoizer() {
                if (memoizer.result) {
                    return memoizer.result
                } else {
                    return memoizer.result = target.apply(target, arguments);
                }
            }
        };

        return that;
    }


    function ArrayUtils() {
        "use strict";
        var that = {};

        that.find = function (arr, func) {
            for (var i = arr.length; i--;) {
                if (func(arr[i])) {
                    return arr[i];
                }
            }
        };

        that.findIndexBy = function (arr, test) {
            var l = arr.length;
            for (var i = 0; i < l; i++) {
                if (test(arr[i])) {
                    return i;
                }
            }
            return -1;
        }


        that.findAll = function (arr, test) {
            return arr.reduce(function (ret, it) {
                test(it) && ret.push(it);
                return ret;
            }, []);
        };

        that.remove = function (arr, el) {
            var idx = arr.indexOf(el);
            idx > -1 && arr.splice(arr.indexOf(el), 1);
        };

        that.forceArray = function (v) {
            return Array.isArray(v) ? v : [v];
        };


        return that;
    }
});
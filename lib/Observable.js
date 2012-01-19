define(function() {
    "use strict";
    var listeners = {};

    return function(that) {
        var arrayUtils = require('commonUtilsModule').array;

        that = that || {};

        that.on = function(event, cb) {
            if(listeners[event] === undefined) {
                listeners[event] = [];
            }
            listeners[event].push(cb);
        };

        that.un = function(event, cb) {
            var callbacks = listeners[event] || [];
            arrayUtils.remove(callbacks, cb);
        }

        that.fireEvent = function(event) {
            var callbacks = listeners[event] || [];
            var args = [that].concat(Array.prototype.slice.call(arguments, 1));
            callbacks.forEach(function(cb) {
                cb.apply(cb, args);
            });
        };





        return that;
    }

});
define(function () {

    return function (id, that) {
        var Property = require('modelModule').Property;
        var arrayUtils = require('commonUtilsModule').array;
        that = that || {};
        var parent;
        var children = [];
        var properties = [];

        that.getId = function () {
            return id;
        };

        that.getPath = function () {
            return parent ? parent.getPath() + '.' + id : id;
        };

        that.setParent = function (p) {
            parent = p;
        };

        that.getParent = function () {
            return parent;
        };

        that.getRoot = function () {
            return parent ? parent.getRoot() : that;
        };

        that.getChildren = function () {
            return children;
        };

        that.addChild = function (child) {
            children.push(child);
            child.setParent(that);
            triggerEvent('childAdded', child);
        };

        that.addChildren = function (childrenDef) {
            childrenDef.forEach(function (childDef) {
                that.getChildById(childDef.id) || that.addChild(childDef);
            });
        };

        that.hasChildren = function () {
            return children.length > 0;
        };

        that.hasProperties = function () {
            return properties.length > 0;
        }


        that.removeChild = function (child) {
            arrayUtils.remove(children, child);
            child.setParent(undefined);
            triggerEvent('childRemoved', child, that);
        };

        that.getPropertyValue = function (propName) {
            var prop = that.getPropertyByName(propName);
            return prop && prop.getValue()
        };

        that.getPropertyByName = function (name) {
            return arrayUtils.find(that.getProperties(), function (prop) {
                return prop.getName() === name;
            });
        };


        that.addProperty = function (prop) {
            if (prop.instanceOf === undefined || prop.instanceOf(Property) === false) {
                prop = Property(prop, that);
            }
            properties.push(prop);
            prop.setOwner(that);
            triggerEvent('propertyAdded', prop);
            return prop;
        };

        that.removeProperty = function (prop) {
            arrayUtils.remove(properties, prop);
            prop.setOwner(undefined);
            triggerEvent('propertyRemoved', {prop:prop, owner:that});
        };

        that.getProperties = function () {
            return properties;
        };

        that.getChildBy = function(testFunc) {
            return arrayUtils.find(children, function(child) {
                return testFunc(child);
            });
        };

        that.getDescendantBy = function(testFunc) {
            return (function recurse(base) {
                for(var i=base.length;i--;) {
                    var child = base[i];
                    if(testFunc(child)) {
                        return child;
                    }
                    var found = recurse(child.getChildren());
                    if(found) {
                        return found;
                    }
                }
            }(children));
        };


        that.getChildById = function (id) {
            return that.getChildBy(function(child) {
                return child.getId() === id;
            });
        };

        that.getDescendantById = function (id) {
            return that.getDescendantBy(function(child) {
                return child.getId() === id;
            });
        }


        return that;

        function triggerEvent(ev) {
            var args = Array.prototype.slice.call(arguments, 1);
            require(['modelModule'], function (model) {
                model[ev].apply(model, args);
            });
        }

    }


});
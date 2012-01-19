define(function () {
    return function Property(config) {
        var that = {};

        var owner, value, defaultValue;
        var newValue = '';
        var name = config.name;

        publicMethods();
        that.update(config);
        return that;

        function publicMethods() {
            that.setValue = function (v) {
                if (value !== v) {
                    value = v;
                    require(['modelModule'], function (model) {
                        model.propertyValueUpdated(that);
                    });
                }
            };

            that.getPath = function() {
                return owner.getPath() + ':' + name;
            };

            that.getValue = function () {
                return (value !== undefined ? value : defaultValue) || '';
            };


            that.update = function (config) {
                config.value !== undefined && that.setValue(config.value);
                config.defaultValue !== undefined && (defaultValue = config.defaultValue);
            };

            that.instanceOf = function (constructor) {
                return constructor === Property;
            };

            that.getName = function () {
                return name;
            };

            that.setOwner = function (v) {
                owner = v;
            };

            that.getOwner = function () {
                return owner;
            };

            that.setNewValue = function (v) {
                newValue = v;
                require(['modelModule'], function (model) {
                    model.propertyNewValueUpdated(that);
                });
            };

            that.getNewValue = function () {
                return newValue;
            };

            that.setDefaultValue = function (v) {
                defaultValue = v;
            };

            that.getDefaultValue = function () {
                return defaultValue || '';
            };

            that.isDirty = function () {
                return newValue !== value;
            };
        }
    }
});
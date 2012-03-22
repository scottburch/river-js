describe('model:Property', function () {
    return;
    var Property, prop, model;

    beforeEach(function() {
        model = require('modelModule');
        Property = model.Property;
        prop = Property({name: 'myProperty'});

    });

    describe('getPath() method', function() {
        it('returns the full path to a property in the tree', function() {
            var oldOwner = prop.getOwner();
            prop.setOwner({getPath: function() {return 'a.b.c'}});
            expect(prop.getPath()).toBe('a.b.c:myProperty');
        });
    });

    describe('getValue() method', function () {
        it('should return an empty string when the object has no value or default value', function () {
            expect(prop.getValue()).toBe('');
        });

        it('should return the default value if no value is given', function () {
            prop.update({defaultValue:'testing'});
            expect(prop.getValue()).toBe('testing');
        });

        it('should return the value if one is given', function () {
            prop.update({defaultValue:'testing', value:'realValue'});
            expect(prop.getValue()).toBe('realValue');
        });

        it('should return the value even if it is an empty string', function () {
            prop.update({defaultValue:'testing', value:''});
            expect(prop.getValue()).toBe('');
        });

        it('should update if set', function () {
            prop.setValue(10);
            prop.setValue(20);
            expect(prop.getValue()).toBe(20);
        });

        it('fires a propertyValueUpdated event', function () {
            spyOn(model, 'propertyValueUpdated');
            prop.setValue(20);
            expect(model.propertyValueUpdated).toHaveBeenCalledWith(prop);
        });

        it('does not fire propertyValueUpdated if the value is the same', function() {
            prop.setValue(10);
            spyOn(model, 'propertyValueUpdated');
            prop.setValue(10);
            expect(model.propertyValueUpdated).not.toHaveBeenCalled();
        });

    });

});
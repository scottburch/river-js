describe('model:ModelBase', function () {

    var ModelBase, Property, model, testObj;



    beforeEach(function () {
        Property = require('modelModule').Property;
        ModelBase = require('modelModule').ModelBase;
        model = require('modelModule');
        testObj = ModelBase('testObj');
        testObj.addProperty(Property({name: 'testProperty', value: 'myValue'}));
    });

    describe('getId()', function () {
        it('retuns the id of the object', function () {
            expect(testObj.getId()).toBe('testObj');
        });
    });

    describe('setParent() method', function () {
        it('sets the parent object', function () {
            var parent = ModelBase();
            testObj.setParent(parent);
            expect(testObj.getParent()).toBe(parent);
        });
    });

    describe('getParent() method', function () {
        it('gets the parent object', function () {
            var parent = ModelBase();
            testObj.setParent(parent);
            expect(testObj.getParent()).toBe(parent);
        });
    });

    describe('addChild() method', function () {
        it('adds a child object to this one', function () {
            spyOn(model, 'childAdded');
            var child = ModelBase('child');
            testObj.addChild(child);
            expect(testObj.getChildren()[0]).toBe(child);
            expect(model.childAdded).toHaveBeenCalledWith(child);
        });
    });

    scenario('removeChild() method', function () {
        var child;

        given('an object with a child', function () {
            spyOn(model, 'childRemoved');
            child = ModelBase('child');
            testObj.addChild(child);
        });
        when('the child object is removed', function () {
            testObj.removeChild(child);
        });
        then('the child is removed from children', function () {
            expect(testObj.getChildren().length).toBe(0);
        });
        and('the childRemoved event is called on model', function () {
            expect(model.childRemoved).toHaveBeenCalledWith(child, testObj);
        });
        and("the Child's parent is removed", function () {
            expect(child.getParent()).not.toBeDefined();
        });
    });

    describe('getPropertyValue', function() {
        it('returns the value if the property exists', function() {
            expect(testObj.getPropertyValue('testProperty')).toBe('myValue');
        });
        it("returns undefined if the property does not exist and you don't pass a default", function() {
            expect(testObj.getPropertyValue('fakeProperty')).toBe(undefined);
        });
        it('returns the default value if the property does not exist and you pass one', function() {
            expect(testObj.getPropertyValue('fakeproeprty', 'defaultValue')).toBe('defaultValue');
        });
    });

    describe('hasProperty()', function() {
        it('returns false if the property does not exist', function() {
            expect(testObj.hasProperty('fakeProperty')).toBe(false);
        });
        it('returns true if the property does exist', function() {
            expect(testObj.hasProperty('testProperty')).toBe(true);
        });
    });

    describe('setPropertyValue()', function() {
        it('sets a property Value if it exists', function() {
            testObj.setPropertyValue('testProperty', 'newValue');
            expect(testObj.getPropertyValue('testProperty')).toBe('newValue');
        });
        it('adds a property if the property does not exist', function() {
            testObj.setPropertyValue('notExistProperty', 'theValue');
            expect(testObj.getPropertyValue('notExistProperty')).toBe('theValue');
        });
    });

    describe('addProperty() method', function () {
        it('adds a property object to this one', function () {
            spyOn(model, 'propertyAdded');
            var prop = Property({name:'testProperty'});
            testObj.addProperty(prop);
            expect(testObj.getProperties()[1]).toBe(prop);
            expect(model.propertyAdded).toHaveBeenCalledWith(prop);
        });
    });

    scenario('removeProperty() method', function () {
        var prop;

        given('an object with a property', function () {
            spyOn(model, 'propertyRemoved');
            prop = Property({name:'testProperty'});
            testObj.addProperty(prop);
        });
        when('the property object is removed', function () {
            testObj.removeProperty(prop);
        });
        then('the property is removed from properties', function () {
            expect(testObj.getProperties().length).toBe(1);
        });
        and('the childRemoved event is called on model', function () {
            expect(model.propertyRemoved).toHaveBeenCalledWith({prop:prop, owner:testObj});
        });
        and("the property's owner is removed", function () {
            expect(prop.getOwner()).not.toBeDefined();
        });
    });

    describe('working with an already existing tree', function () {
        var children;


        beforeEach(function () {
            children = {};
            ['a', 'b', 'c'].forEach(function (name) {
                testObj.addChild(children[name] = ModelBase(name));
                ['1', '2', '3'].forEach(function (num) {
                    children[name].addChild(children[name + num] = ModelBase(name + num));
                });
            });

        });


        describe('getChildById', function() {
            it('returns a child if given a good id', function () {
                expect(testObj.getChildById('a')).toBe(children.a)
            });

            it('returns undefined if given a bad id', function () {
                expect(testObj.getChildById('fake')).toBe(undefined);
            });

        });


        describe('getDescendantById()', function () {
            it('returns a descendant if given a good id', function () {
                expect(testObj.getDescendantById('a2')).toBe(children.a2);
            });

            it('retuns undefined if given a bad id', function () {
                expect(testObj.getDescendantById('fake')).toBe(undefined);
            });
        });

        describe('getRoot()', function() {
            it('retuns the root node of the tree from any node', function() {
                expect(children.a2.getRoot()).toBe(testObj);
            });
        });

        describe('getTid()', function() {
            it('returns the tree id of the node', function() {
                expect(children.a2.getPath()).toBe('testObj.a.a2');
            });
        });

        describe('getDescendantBy()', function() {
            it('returns undefined if not found', function() {
//                expect(testObj.getDes)
            });

        });
    });


});
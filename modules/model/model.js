defineModule({name:'model', category:'river', description:'Model constructors', requires:['riverModules/model/ModelBase','riverModules/model/Property']}, function(that, ModelBase, Property) {

    that.ModelBase = ModelBase;
    that.Property = Property;

    that.childAdded = function(child) {
        Application.fireEvent('model', 'childAdded', {child:child});
    };


    that.childRemoved = function(child, parent) {
        Application.fireEvent('model', 'childRemoved', {child: child, parent:parent});
    };

    that.propertyAdded = function(prop) {
        Application.fireEvent('model', 'propertyAdded', {prop:prop});
    };


    that.propertyRemoved = function(data) {
        Application.fireEvent('model', 'propertyRemoved', data);
    };

    that.propertyValueUpdated = function (prop) {
        Application.fireEvent('model', 'propertyValueUpdated', prop);
    };

    that.propertyNewValueUpdated = function (prop) {
        Application.fireEvent('model', 'propertyNewValueUpdated', prop);
    };


    return that;

});
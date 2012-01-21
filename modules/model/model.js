defineModule({name:'model', category:'river', description:'Model constructors', requires:['riverModules/model/ModelBase','riverModules/model/Property']}, function(that, ModelBase, Property) {

    that.ModelBase = ModelBase;
    that.Property = Property;

    that.childAdded = function(child) {
        that.fireEvent('childAdded', {child:child});
    };


    that.childRemoved = function(child, parent) {
        that.fireEvent('childRemoved', {child: child, parent:parent});
    };

    that.propertyAdded = function(prop) {
        that.fireEvent('propertyAdded', {prop:prop});
    };


    that.propertyRemoved = function(data) {
        that.fireEvent('propertyRemoved', data);
    };

    that.propertyValueUpdated = function (prop) {
        that.fireEvent('propertyValueUpdated', prop);
    };

    that.propertyNewValueUpdated = function (prop) {
        that.fireEvent('propertyNewValueUpdated', prop);
    };


    return that;

});
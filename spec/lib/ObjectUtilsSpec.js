describe('modules:commonUtil:object', function () {
    return;
    var objectUtils;

    beforeEach(function() {
        objectUtils = require('commonUtilsModule').object;
    });

    describe('forEach() method', function() {
        it('iterates through an object providing keys and values', function() {
            var obj = {a:1,b:2,c:3};
            objectUtils.forEach(obj, function(key, value) {
                obj[key] = value + 1;
            });
            expect(obj).toEqual({a:2,b:3,c:4});
        });
    });

    describe('values() method', function() {
        it('returns the values of an object', function() {
            var obj = {a:1, b:2, c:3};
            expect(objectUtils.values(obj)).toEqual([1,2,3]);
        });
    });

    describe('isObject() method', function() {
        it('returns true if passed value is an object', function() {
            expect(objectUtils.isObject([])).toBe(false);
            expect(objectUtils.isObject({})).toBe(true);
            expect(objectUtils.isObject('')).toBe(false);
            expect(objectUtils.isObject(1)).toBe(false);
        });
    });

    describe('clone() method', function() {

        it('clones a straight object', function() {
            var source  = {a:1,b:2};
            var dest = objectUtils.clone(source);
            expect(source).not.toBe(dest);
            expect(source).toEqual(dest);
        });

        it('clones an object recursively', function() {
            var source = {a:1, b: {b1:1, b2:2}};
            var dest = objectUtils.clone(source);
            expect(source).toEqual(dest);
        });

        it('clones arrays in an object', function() {
            var source = {a:1, b: [1,2,3]};
            var dest = objectUtils.clone(source);
            expect(source).toEqual(dest);
        });

        it('clones arrays that contain objects and arrays', function() {
            var source = {a:1, b: [{c:1,c:2},[1,2,3]]};
            var dest = objectUtils.clone(source);
            expect(source).toEqual(dest);
        });

    });

});
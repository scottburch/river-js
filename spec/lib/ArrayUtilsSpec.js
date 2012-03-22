describe('modules:commonUtil:array', function() {
    return;
    var arrayUtils;

    beforeEach(function() {
        arrayUtils = require('commonUtilsModule').array;
    });

    describe('find() method', function() {
        it('Returns an element from an array that satisfies a given condition', function() {
            var array = [{a:1},{a:2},{a:3}];
            var found = arrayUtils.find(array, function(it) {
                return it.a === 2;
            });
            expect(found).toEqual({a:2});
        });
    });

    describe('remove() method', function() {
        it('removes a element from an array', function() {
            var array = [1,2,3,4,5,6];
            arrayUtils.remove(array, 2);
            expect(array).toEqual([1,3,4,5,6]);
        });
        it('does not throw error if element does not exist', function() {
            var array = [1,2,3,4,5,6];
            arrayUtils.remove(array, 10);
            expect(array).toEqual([1,2,3,4,5,6]);
        });
    });

    describe('forceArray() method', function() {
        it('returns arguments as an array', function() {
            expect(arrayUtils.forceArray(1)).toEqual([1]);
            expect(arrayUtils.forceArray([1,2])).toEqual([1,2]);
        });
    });
});
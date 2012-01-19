describe('lib:Module', function() {
    var Module;


    requireDependencies('lib/Module', function (module) {
        Module = module;
    });


    describe('create() method', function() {
        it('returns a module object with the name set', function() {
            var module = Module({name:'myModule',category:'system'});
            expect([module.name,module.category]).toEqual(['myModule','system']);
        });
    });
});
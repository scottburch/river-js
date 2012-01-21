defineModule({name:'eventLogging', category:'logging', description:'Event logging'}, function(that) {

    that.on_moduleManager_eventFired = function(data) {
        that.doAction('log', ['Event: '+data.moduleName, data.event, data.data]);
    }

    return that;


});
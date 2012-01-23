defineModule({name:'logging', category:'logging', description:'Logging module'}, function(that) {
    that.do_log = function(data) {
        data = Array.isArray(data) ? data : [data];
        if(window.console && console.log) {
            console.log(data);
        }
    };
});
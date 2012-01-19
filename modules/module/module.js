defineModule({name:'module', category:'system', description:'Module to manage modules'}, function(that) {
    "use strict";

    that.on_menu_contextMenuCreated = function(data) {
        if(data.name === 'desktopContextMenu') {
            data.menu.add({text:'Module manager', handler: function() {
                that.require(['views/ModuleView'], function(ModuleView) {
                    require(['lib/ModuleManager'], function(ModuleManager) {
                        ModuleView.render(ModuleManager.getModules());
                    });
                });
            }});
        }
    }

    return that;


});
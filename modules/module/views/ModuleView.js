define(['vendor/ext-4.0.7/ux/CheckColumn'], function(CheckColumn) {

    var that = {
        render: render
    }
    return that;


    function render(modules) {

        that.render = function() {
            window.show();
        }


        Ext.define('ModuleGridData',{
            extend: 'Ext.data.Model',
            fields: [
                {name: 'enabled', type: 'bool'},
                'moduleName',
                'description',
                'category'
            ]
        });


        function GridPanel() {
            var that = Ext.create('Ext.grid.Panel', {
                store: getModuleStore(),
                columns: [
                    {xtype: 'checkcolumn', text: 'Enabled', dataIndex:'enabled', width: 50},
                    {text: "Module", dataIndex: 'moduleName', width: 100},
                    {text: 'Description', dataIndex:'description', flex:1},
                    {text: 'Category', dataIndex: 'category', width: 70}
                ],
                columnLines: true,
                frame: true,
                iconCls: 'icon-grid',
                bbar: [
                    {text: 'Save', handler: save}
                ]
            });
            return that;
        }

        var grid = GridPanel();

        var window = Ext.create('Ext.window.Window', {
            layout: 'fit',
            hidden: false,
            height: 500,
            width: 500,
            items: grid,
            closeAction: 'hide',
            title: 'Module manager'
        }).show();


        function save() {
                modules.forEach(function(module){
                    var idx = grid.store.find('moduleName',module.name);
                    if(idx !== -1) {
                        var model = grid.store.getAt(idx);
                        module.enable(model.data.enabled);
                        model.commit();
                    }
                });
        }


        function getModuleStore() {
            return Ext.create('Ext.data.ArrayStore', {
                autoDestroy: true,
                model: 'ModuleGridData',
                data: (function() {
                    return modules.map(function(module) {
                        return [module.isEnabled(), module.name, module.description, module.category]
                    });
                }())
            });
        }
    }
});
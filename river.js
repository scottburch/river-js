(function() {
    "use strict";
    window.river = function(config, cb) {
        setupRequireConfig();

        require(['river/lib/Application'], function(App) {
            App.start(config.modulesPath, config.modules, cb);
        });

        function setupRequireConfig() {
            window.requireConfig = window.requireConfig || {};
            window.requireConfig.paths = window.requireConfig.paths || {};

            if(config.riverPath) {
                requireConfig.paths.river = config.riverPath;
            }
            require.config(requireConfig);
        }
    }
}());
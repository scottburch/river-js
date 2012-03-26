(function() {
    "use strict";
    window.river = function(config, cb) {
        loadRequire(function() {
            setupRequireConfig();

            require(['river/lib/Application','river/vendor/es5','river/vendor/async'], function(App) {
                App.start(config.modulesPath, config.modules, cb);
            });
        });


        function setupRequireConfig() {
            window.requireConfig = window.requireConfig || {};
            window.requireConfig.paths = window.requireConfig.paths || {};

            if(config.riverPath) {
                requireConfig.paths.river = config.riverPath;
            }
            require.config(requireConfig);
        }

        function loadRequire(cb) {
            if(window.require) {
                cb();
            } else {
                var head = document.getElementsByTagName('head')[0];
                var s = document.createElement('script');
                s.src = config.riverPath + '/vendor/require.js';
                s.type = 'text/javascript';
                s.onload = cb;
                head.appendChild(s);
            }
        }
    };
}());
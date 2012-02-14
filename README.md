NOTES:

* Documentation is in progress.

* Any feedback is very appreciated. If anyone needs help installing or using, please let me know.



River is a modular Javascript framework to assist in creating client side webapps containing decoupled and reusable code.
It is not a MVC framework as much as it is a code organizing and coordinating framework using the Facade/Mediator pattern.

This means that modules can be snapped into place and used without affecting other code.
Modules can be removed or disabled without causing any errors.

Some users want a certain feature and others do not.  Simple, just disable the module for those customers that don't want it.

Here is a list of available [river modules](https://github.com/scottburch/river-js/wiki/River-Modules).  Please feel free to submit others.

## Installing

The best way to get a look into how river works is to install [river-demo](https://github.com/scottburch/river-demo)


## Modules

The key to river is modules.  Modules are small components with a specific functionality or portion of the application.
Modules do not communicate directly with each other, rather, they communicate through a single mediator.

![mediator/module relationship](https://github.com/scottburch/river-js/raw/master/docs/facade.png)

This means that modules can be added, removed and disabled without affecting other modules.

Modules should be completely self contained with their own resources (images, css, templates...).
Your application should be a series of modules rather than a single module.

Modules communicate through __events__ and __actions__.


### Using files within a module

Modules allow for the inclusion of other files within the module.  Modules should communicate through the main module file but use other files for views and support.
For example, the "auth" module could have a login view within the directory called views in a module.

    /**
    ** Auth module
    **/
    defineModule({name:'auth', category:'system', description:'Authentication'}, function(that) {
        that.on_desktop_desktopReady = function() {                       // there is a desktop module that sets everything up first
            that.require(['views/LoginView'], function(LoginView) {       // retreives LoginView.js from the /views directory within the module
                LoginView(loginHelper);                                   // instantiate the login view passing helper functions separating the view from the logic
            }
        }
    });

    var loginHelper = {
       doLogin: function() {
            // do login stuff here
       }
    }


### Events

When one module fires an event, all other modules that have a hook method for that event get called autmatically.
The format of the event hook is: on_[moduleName]_[event].

    /**
    ** User Module
    **/

    defineModule({name:'user', category:'system', description:'Sends name to server'}, function(that) {
        that.updateName = function(newName) {
            that.fireEvent('nameUpdated', {name: newName});
        }

        // NOTE: you can also use 'this' inside of the defineModule callback if you prefer
        this.on_userService_nameUpdated = function(data) {
            // code here to update view
        };
    });


    /**
    ** User Service Module
    **/

    defineModule({name:'userService', category:'system', description:'User behavior'}, function(that) {
        that.on_userView_nameUpdated = function(data) {
            // code here to communicate with server
            that.fireEvent('nameUpdated', data);
        };
    });



Notice that the modules do not communicate with each other directly.  The view module first fires the **userUpdated** event which gets sent to the mediator.
The mediator then calls the **on_userView_nameUpdated** method of the userService module.
When the reply comes back the **userService** module fires a 'nameUpdated' event which causes the mediator to call the **on_userService_nameUpdated** event.


__Global Events__

Another type of event is a "global" event.  These are events where other modules do not care which module it comes from.

    /**
    **  Context menu module
    **/

    that.on_contextMenu = function(menuDef) {
        // create context menu
    };

    /**
    ** User Module
    **/
    that.createContextMenu = function() {
        that.fireGlobalEvent('contextMenu', {text:'create', fn: createUserFn});
    };



### Actions

When a module calls for an action all other modules with a hook method for that action get called.
The format of the action hook is: do_[action].
The module name is not included since actions are used when a module needs something done but does not know what other module is responsible for doing it.

    /**
    ** User Module
    **/
    defineModule({name:'user', category:'system', description:'User behavior'}, function(that) {
        that.updateName = function(newName) {
            that.fireEvent('nameUpdated', {name: newName});
            that.doAction('log', {message: 'user name changed'});
        }

        that.on_userService_nameUpdated = function(data) {
            // code here to update view
        };
    });


    /**
    ** Logging module
    **/

    defineModule({name:'log', category:'system', description:'Logging module'}, function(that) {
        do_log = function(data, module){                                // With actions, the originating module is passed as the second argument
            console.log(module.name + ': ' + data.message);
        }
    });

Passing the module as the second argument allows us to create actions that can opperate in the foreign modules directory.
This may be a break from modules not communicating with each other, but it does make this more convienient.

    defineModule({name:'loaders', category:'River', description:'Loaders for css...'}, function (that) {

        that.do_loadCss = function(data, mod) {
            var el = document.createElement('link');
            el.setAttribute('rel', 'stylesheet');
            el.setAttribute('href', mod.modulePath + '/' + data.href);
            document.getElementsByTagName("head")[0].appendChild(el);
        };
    });

    // In some other module

    that.doAction('loadCss', {href: 'css/myModule.css'});

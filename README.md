NOTE: Documentation is in progress.

River is a modular Javascript framework to assist in creating client side webapps containing decoupled and reusable code.
It is not a MVC framework as much as it is a code organizing and coordinating framework using the Facade/Mediator pattern.

River allows you to write systems that are flexible and resiliant.

## Installing

The best way to get a look into how river works is to install [river-demo](https://github.com/scottburch/river-demo)


## Modules

The key to river is modules.  Modules are small components with a specific functionality or portion of the application.
Modules do not communicate directly with each other, rather, they communicate through a single facade.

![facade/module relationship](https://github.com/scottburch/river-js/raw/master/docs/facade.png)

This means that modules can be added, removed and disabled without affecting other modules.

Modules should be completely self contained with their own resources (images, css, templates...).
Your application should be a series of modules rather than a single module.

Modules communicate through __events__ and __actions__.

### Events

When one module fires an event, all other modules that have a hook method for that event get called autmatically.
The format of the event hook is: on_[moduleName]_[event].

__User View Module__

    // NOTE: you can also use 'this' inside of the defineModule callback if you prefer
    defineModule({name:'userView', category:'system', description:'Sends name to server'}, function(that) {
        that.updateName = function(newName) {
            that.fireEvent('nameUpdated', {name: newName});
        }

        that.on_userService_nameUpdated = function(data) {
            // code here to update view
        };
    });


__User Service Module__

    defineModule({name:'userService', category:'system', description:'Sends name to server'}, function(that) {
        that.on_userView_nameUpdated = function(data) {
            // code here to communicate with server
            that.fireEvent('nameUpdated', data);
        };
    });



Notice that the modules do not communicate with each other directly.  The view module first fires the **userUpdated** event which gets sent to the facade.
The facade then calls the **on_userView_nameUpdated** method of the userService module.
When the reply comes back the **userService** module fires a 'nameUpdated' event which causes the facade to call the **on_userService_nameUpdated** event.

### Actions

When a module calls for an action all other modules with a hook method for that action get called.
The format of the action hook is: do_[action].
The module name is not included since actions are used when a module needs something done but does not know what other module is responsible for doing it.

__User View Module__

    // NOTE: you can also use 'this' inside of the define Module callback if you prefer
    defineModule({name:'userView', category:'system', description:'Sends name to server'}, function(that) {
        that.updateName = function(newName) {
            that.fireEvent('nameUpdated', {name: newName});
            that.doAction('log', {message: 'user name changed'});
        }

        that.on_userService_nameUpdated = function(data) {
            // code here to update view
        };
    });

__Logging Module__

    defineModule({name:'log', category:'system', description:'Logging module'}, function(that) {
        do_log = function(data){
            console.log(data.message);
        }
    });


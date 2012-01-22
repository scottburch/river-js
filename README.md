NOTE: Documentation is in progress.

River is a modular Javascript framework to assist in creating decoupled/reusable code.
It is not a MVC framework as much as it is a code organizing and coordinating framework using the Facade/Mediator pattern.


## Modular

The key to river is modules.  Modules are small components with a specific functionality or portion of the application.
Modules do not communicate directly with each other, rather, they communicate through a single facade.

![facade/module relationship](https://github.com/scottburch/river-js/raw/master/docs/facade.png)
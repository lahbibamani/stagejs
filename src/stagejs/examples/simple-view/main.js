/**
 * Created by Wadi on 17/06/2014.
 */
requirejs.config({
    baseUrl: '../../',
    shim: {
        'lib/underscore':{
            exports: '_'
        },
        'lib/extend':{
            exports: 'extend'
        },
        'lib/jquery': {
            exports: '$'
        },
        'lib/handlebars': {
            exports: 'Handlebars'
        }
    }
});

define(['view/view','lib/jquery','weaver/weaver',], function (View,$,weaver) {
    var HelloWorldView =View.extend({
        template : "Hello {{name}}"
    });
    var context={name:"Stage.js"};

    var concreteView =new HelloWorldView();
    concreteView.el="#v1";
    concreteView.render(context);

});
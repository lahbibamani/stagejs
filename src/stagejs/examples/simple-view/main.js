/**
 * Created by Wadi on 17/06/2014.
 */
requirejs.config({
    baseUrl: '../../',
    shim: {
        'lib/jquery': {
            exports: '$'
        },
        'lib/handlebars': {
            exports: 'Handlebars'
        }
    }
});

define(['view/view','lib/jquery','weaver/weaver'], function (View,$,weaver) {
    var view = new View();
    view.$region=$("#v1");
    view.template="Hello {{name}}";
    view.model={name:"Chemkhi"};

    var pview =weaver.createProxy(view);
    weaver.addBefore(pview,"render",function(){console.log("B4")});
    pview.render();

});
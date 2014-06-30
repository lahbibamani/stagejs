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

define(['view/view','lib/jquery','weaver/weaver','../../controller/controller'], function (View,$,weaver,Module) {
    var module=new Module();

    var person={name:"Chemkhi"};
    module.model=person;

    var view = new View();
    view.$region=$("#v1");
    view.template="<input id='i1' type='text'/> <br/> Hello {{name}}";

    module.view=view;
    module.render();
    module.bindInput("#i1","name");





});
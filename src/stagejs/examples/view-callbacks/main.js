/**
 * Created by Wadi on 17/06/2014.
 */
requirejs.config({
    baseUrl: '../../',
    paths: {
        select2: 'examples/view-callbacks/select2'
    },
    shim: {
        'select2':{
            deps: ['lib/jquery'],
            exports: '$.fn.select2'
        },
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

define(['view/view','lib/jquery','weaver/weaver','select2'], function (View,$,weaver,select2) {
    $.fn.select2=select2;

    var Select2HelloView =View.extend({
        template : "<select> {{#each hellos}} <option> {{this}} </option>{{/each}} </select>  {{name}}",
        postRender:[
            function($e){
                $e.find('select').first().select2();
            }
        ]
    });


    var context={hellos:["Hello","Hi","What's up"],name:"Stage.js"};

    var concreteView =new Select2HelloView({$el : $("#v1")});
    concreteView.render(context);

});
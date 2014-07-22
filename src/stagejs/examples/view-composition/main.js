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

    var Select2View =View.extend({
        template : "<select> {{#each hellos}} <option> {{this}} </option>{{/each}} </select>  {{name}}",
        postRender:[
            function($e){
                $e.find('select').first().select2();
            }
        ]
    });
    var NameView =View.extend({
        template : " {{name}}"
    });


    var selectView=new Select2View();
    var nameView= new NameView();

    var composedView =View.extend({
            template : " <div id='c1'></div> <div id='c2' ></div>"
    });


    var context={'#c1':{hellos:["Hello","Hi","What's up"]},'#c2':{name:"Stage.js"}};

    var parentView =new composedView({$el : $("#v1"),
    subViews:{
        "#c1":selectView,
        "#c2":nameView
    }
    });
    parentView.render(context);

});
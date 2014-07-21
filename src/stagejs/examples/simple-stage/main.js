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

define(['stage/stage','lib/jquery','weaver/weaver'], function (Stage,$,weaver) {
    var stage = new Stage();
    var module=(function(bus){
        var _m={};
        _m.lol="lol";
        _m.clickHandler=function(){
            bus.send('client-select',{name:"wadi",age:"20"});
        };
        return _m;
    })(stage.bus);

    var module2=(function(bus){
        var _m={};
        _m.receiveers={
            "client-select":function(client){

                console.log(client.name);
            }
        };
        return _m;
    })(stage.bus);

    stage.add(module2);

    $(function(){
        $("#b1").click(module.clickHandler);
    })

});
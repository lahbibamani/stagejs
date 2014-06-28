/**
 * Created by Wadi on 17/06/2014.
 */
define([], function ($) {

    var eventMix=function() {
        //encapsulated scope
        (function (self){
            var eventMap={};
            self.on=function(name,handler){
                //test whether event in map
                if(!eventMap[name]){
                    //initialise collection of handlers if it is a new event
                    eventMap[name]=[];
                }
                eventMap[name].push(handler);
            };
            self.trigger=function(name){
                //test whether event in map
                if(!eventMap[name]) throw "no such event";
                eventMap[name].forEach(function(handler){
                    handler();
                });
            };


        })(this);

    };

    return eventMix;

});
/**
 * Created by Wadi on 21/06/2014.
 */
var requirejs = require('requirejs');

requirejs.config({
    baseUrl: '../../src/stagejs',
    nodeRequire: require
});

var Mix=requirejs("events/eventMix");
var mix=new Mix();
mix.on("login",function(){console.log("check security")});
mix.on("login",function(){console.log("logged in")});
mix.trigger("login");
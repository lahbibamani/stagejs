/**
 * Created by Wadi on 21/06/2014.
 */
var requirejs = require('requirejs');

requirejs.config({
    baseUrl: '../../src/stagejs',
    nodeRequire: require
});

var Module=requirejs("module/module");
var module=new Module();
var person={name:"wadi",position:"school"};
module.model=person;
module.mix.on("module change", function(){console.log("module change")});
module.model.position="home";

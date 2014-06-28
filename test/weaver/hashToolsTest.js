var requirejs = require('requirejs');

requirejs.config({
    baseUrl: '../src/stagejs',
    nodeRequire: require
});

var hashTools=requirejs("weaver/hashTools");
var a ={name:"a",getName:function(){return a;}};
var proxy={getName:function(){return a.getName()}};

console.log(hashTools.objectHash(a));


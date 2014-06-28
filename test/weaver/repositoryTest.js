var requirejs = require('requirejs');

requirejs.config({
    baseUrl: '../src/stagejs',
    nodeRequire: require
});

var repo=requirejs("weaver/repository");
var a ={name:"a",getName:function(){return a;}};
var proxy={getName:function(){return a.getName()}};
repo.add(proxy,a);

//TODO intensive testing for all possible failure cases

console.log(repo.get(proxy));
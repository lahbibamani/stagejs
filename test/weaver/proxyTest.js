var requirejs = require('requirejs');

requirejs.config({
    baseUrl: '../src/stagejs',
    nodeRequire: require
});

var createProxy=requirejs("weaver/proxy");
var ctx=  createProxy({hello:function(){console.log("hello "+this.name)},name:"wadi"});
ctx.invocationHandlers["hello"].before.push(function(){console.log("executed b4");});
ctx.accessHandlers["name"].get.before.push(function(){console.log("executed b4 get name");});
ctx.accessHandlers["name"].set.before.push(function(){console.log("executed b4 set name");});

ctx.proxy.hello();
console.log(ctx.proxy.name);
console.log(ctx.proxy.name);
ctx.proxy.name="chemkhi";

console.log(ctx.proxy.name);
var requirejs = require('requirejs');

requirejs.config({
    baseUrl: '../src/stagejs',
    nodeRequire: require
});

var ih=requirejs("weaver/invocationHandler");
var a =function(){console.log("lol");}
var ih1= new ih();
//before and after case
ih1.before.push(function(){console.log("executed b4");});
ih1.after.push(function(){console.log("executed after");});
ih1.target=a;
ih1.invoke();

var ih2=new ih();
var b =function(){return "result";};
ih2.afterReturning.push(function(result){console.log("result was: "+result);});
ih2.target=b;
ih2.invoke();

//TODO test after throwing

console.log(ih2);
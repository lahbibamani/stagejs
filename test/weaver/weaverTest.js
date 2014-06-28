var requirejs = require('requirejs');

requirejs.config({
    baseUrl: '../../src/stagejs',
    nodeRequire: require
});
var weaver=requirejs("weaver/weaver");

var a ={hello:function(){console.log("hello")},bye:function(){console.log("good bye")}};
var pa =weaver.createProxy(a);

weaver.addBefore(pa,"hello",function(){console.log("B4")});
weaver.addAfter(pa,"hello",function(){console.log("after")});

weaver.addBefore(pa,"bye",function(){console.log("B4 b")});
weaver.addAfter(pa,"bye",function(){console.log("after b")});
pa.hello();
pa.bye();
//TODO Test after returning and after throwing




//var nous = {w: "wadi", a: "amani",c:"success"};
//nous = weaver.setAttributeAccessListeners(nous,"w",{get:true,set:false},[function(a){console.log("listener invoked on "+ a.attribute );}]);
//console.log(nous.w);


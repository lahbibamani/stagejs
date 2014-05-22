var weaver = require('../src/weaver');
var nous = {w: "wadi", a: "amani",c:"success"};
nous = weaver.setAttributeAccessListeners(nous,"w",{get:true,set:false},[function(a){console.log("listener invoked on "+ a.attribute );}]);
console.log(nous.w);


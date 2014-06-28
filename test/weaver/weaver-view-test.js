var requirejs = require('requirejs');

requirejs.config({
    baseUrl: '../../src/stagejs',
    nodeRequire: require
});

var weaver=requirejs("weaver/weaver");
var View=requirejs("view/view");

var view = new View();
view.template="Hello {{name}}";
view.model={name:"Chemkhi"};

var pview =weaver.createProxy(view);
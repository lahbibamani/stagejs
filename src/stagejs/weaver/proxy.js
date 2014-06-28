// todo deep proxy
define(['weaver/invocationHandler'], function (InvocationHandler) {

    var createProxy=function(object){
        var invocationHandlers={};
        var accessHandlers={};
        var proxy={};
        for(var attribute in object) {
            if (typeof object[attribute] == "function") {
                var ih=new InvocationHandler();
                ih.originalThis=object;
                ih.target= object[attribute];
                invocationHandlers[attribute]=ih;
                proxy[attribute]=ih.invoke;
            }
            else{
                accessHandlers[attribute]={};
                var getIh=new InvocationHandler();
                getIh.originalThis=object;
                getIh.target=function(att){return function(){ return object[att];};}(attribute);
                accessHandlers[attribute].get=getIh;

                var setIh=new InvocationHandler();
                setIh.originalThis=object;
                setIh.target=function(att){return function(val){object[att]=val;};}(attribute);
                accessHandlers[attribute].set=setIh;

                // point at ih.invoke
                Object.defineProperty(proxy, attribute, {
                        get: getIh.invoke,
                        set: setIh.invoke,
                        enumerable: true,
                        configurable: true
                    }
                );
            }
        }
        return {proxy:proxy,invocationHandlers:invocationHandlers,accessHandlers:accessHandlers};

    };
    return createProxy;

});
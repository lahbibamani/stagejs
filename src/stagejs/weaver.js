define(['repository','proxy'], function (repository,createProxy) {

    var weaver = {};
    weaver.createProxy=function(object){
        var ctx=  createProxy(object);
        repository.add(ctx.proxy,{origin:object,invocationHandlers:ctx.invocationHandlers});
        return ctx.proxy;
    };
    weaver.addBefore=function(proxy,FuncName,beforeFunction){
        repository.get(proxy).invocationHandlers[FuncName].before.push(beforeFunction);
    };

    weaver.addAfter=function(proxy,FuncName,afterFunction){
        repository.get(proxy).invocationHandlers[FuncName].after.push(afterFunction);
    };

    weaver.addAfterReturning=function(proxy,FuncName,afterReturningFunction){
        repository.get(proxy).invocationHandlers[FuncName].afterReturning.push(afterReturningFunction);
    };

    weaver.addAfterThrowing=function(proxy,FuncName,afterThrowingFunction){
        repository.get(proxy).invocationHandlers[FuncName].afterThrowing.push(afterThrowingFunction);
    };
    //TODO use proxy for attributes
    weaver.setAttributeAccessListeners = function (object, attribute, accessType, listeners) {
        if (object.hasOwnProperty(attribute)) {
            var proxy = {};
            var context = {
                proxy: proxy,
                object: object,
                attribute: attribute,
                accessType: accessType
            };
            for (var oldAttribute in object) {
                if (oldAttribute != attribute) {
                    proxy[oldAttribute] = object[oldAttribute];
                }
            }


            if (accessType.get && accessType.set) {
                Object.defineProperty(proxy, attribute, {
                    get: function () {
                        for (var listener in listeners) {
                            listeners[listener](context);
                        }
                        return object[attribute];
                    },
                    set: function (val) {
                        for (var listener in listeners) {
                            listeners[listener](context);
                        }
                        object[oldAttribute] = val;
                    },
                    enumerable: true,
                    configurable: true
                    }
                );
            } else if (accessType.get) {
                Object.defineProperty(proxy, attribute, {
                    get: function () {
                        for (var listener in listeners) {
                            listeners[listener](context);
                        }
                        return object[attribute];
                    },
                    enumerable: true,
                    configurable: true});
            } else if (accessType.set) {
                Object.defineProperty(proxy, attribute, {
                    set: function (val) {
                        for (var listener in listeners) {
                            listeners[listener](context);
                        }
                        object[attribute] = val;
                    },
                    enumerable: true,
                    configurable: true});
            }
            return proxy;
        } else {
            throw 'no such attribute :"' + attribute + '" in supplied object';
        }

    };

    return weaver;

});
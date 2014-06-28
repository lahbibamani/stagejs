define(['weaver/repository','weaver/proxy'], function (repository,createProxy) {

    var weaver = {};
    weaver.createProxy=function(object){
        var ctx=  createProxy(object);
        repository.add(ctx.proxy,{origin:object,invocationHandlers:ctx.invocationHandlers,accessHandlers:ctx.accessHandlers});
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
    weaver.addBeforeGet=function(proxy,attribue,beforeGetFunction){
        repository.get(proxy).accessHandlers[attribue].get.before.push(beforeGetFunction);
    };
    weaver.addBeforeSet=function(proxy,attribue,beforeSetFunction){
        repository.get(proxy).accessHandlers[attribue].set.before.push(beforeSetFunction);
    };
    weaver.addAfterGet=function(proxy,attribue,afterGetFunction){
        repository.get(proxy).accessHandlers[attribue].get.after.push(afterGetFunction);
    };
    weaver.addAfterSet=function(proxy,attribue,afterSetFunction){
        repository.get(proxy).accessHandlers[attribue].set.after.push(afterSetFunction);
    };

    return weaver;

});
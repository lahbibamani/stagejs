//TODO Consider passing a context object as a parameter for advice functions
define( function () {
    var invocationHandler=function(){
        this.originalThis=null;
        this.before=[];
        this.after=[];
        this.afterReturning=[];
        this.afterThrowing=[];
        this.target=function(){console.log("target not set for invocationHandler ")};
        this.invoke =function(self) { return function(){
            try{
                //before handlers
                self.before.forEach(function(beforeFunc){
                    beforeFunc();
                });

                //executing target
                var returnVal=self.target.apply(self.originalInvocationThisPointer, Array.prototype.slice.call(arguments,0));

                //after handlers
                self.after.forEach(function(afterFunc){
                    afterFunc();
                });

                //TODO handel null value return case
                //afterReturning handlers
                self.afterReturning.forEach(function(afterReturningFunc){
                    afterReturningFunc(returnVal);
                });

                return returnVal;
            }catch(exception){
                //afterThrowing handlers
                self.afterThrowing.forEach(function(afterThrowingFunc){
                    afterThrowingFunc(exception);
                });
                //rethrow the exception
                throw exception;
            }
        }}(this)
    };

    return invocationHandler;
});

//TODO handle original function's parameters

//TODO handle properly the this pointer !
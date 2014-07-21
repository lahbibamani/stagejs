/**
 * Created by Wadi on 03/07/2014.
 */
define(['../weaver/weaver','../lib/msgs/msgs'], function (weaver,msgs) {

    var stage=function() {
        this.bus = msgs.bus();

        this.add=function(module){
            for(var r in module.receiveers){
                if(!this.bus.resolveChannel(r)){
                    this.bus.channel(r);
                }
                this.bus.on(r,module.receiveers[r]);
            }
        }
    };

    return stage;

});

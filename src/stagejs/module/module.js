/**
 * Created by Wadi on 30/06/2014.
 */
define(['../weaver/weaver','msgs'], function (weaver,msgs) {

    var module=function() {
        var bus = msgs.bus();

        bus.channel('lowercase');
        bus.transformer(function (message) { return message.toUpperCase(); }, { input: 'lowercase', output: 'uppercase' });
        bus.channel('uppercase');
        bus.on('uppercase', function (str) {
            console.log(str);
        });

        bus.send('lowercase', 'hello world'); // 'HELLO WORLD'
        //string arrays for input and output channels
        this.in = [];
        this.out=[];
        this.initChannels=(function(self){
            return function(){
                self.in.forEach(
                    function(val){
                        bus.channel(val);
                    }
                );
                self.out.forEach(
                    function(val){
                        bus.channel(val);
                    }
                );
            };
        })(this);



    };

    return module;

});
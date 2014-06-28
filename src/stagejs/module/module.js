/**
 * Created by Wadi on 21/06/2014.
 */
define(['../weaver/weaver','../events/eventMix'], function (weaver,EventMix) {

    var module=function() {
        this.view=null;

        this.mix=new EventMix();

        (function(self){
            _model=null;
            Object.defineProperty(self, "model", {
                    get: function(){return _model;},
                    set: function(val){
                        _model=weaver.createProxy(val);
                        for(var attribute in _model) {
                            weaver.addAfterSet(_model, attribute, onModelChange);
                        }
                    },
                    enumerable: true,
                    configurable: true
                }
            );
            var onModelChange=function(){
                self.render();
            }
        })(this);

        var inputBindings={};

        this.bindInput=function(selector,event,attribute){
            var module=this;
            this.view.subscribe(selector,"change",function(evt){
                module.model[attribute]=evt.target.value;
            });

            inputBindings[selector]=attribute;

        };
        this.render=function(){
            this.view.render(this.model);
            var module=this.model;
            for(key in inputBindings){
                this.view.acceptWithRegion(function($el){
                   $el.find(key).first().val(module[inputBindings[key]]);
                })
            }
        }
    };

    return module;

});
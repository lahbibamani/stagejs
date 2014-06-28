/**
 * Created by Wadi on 16/06/2014.
 */
define(['../lib/handlebars','../lib/jquery'], function (hb,$) {

    var view=function() {
        this.$region=null;
        this.template=null;
        this.render=function(context){
            var compiledTemplate = hb.compile(this.template);
            var html    = compiledTemplate(context);
            this.$region.html(html);
        };

        this.subscribe=function(selector,event,handler){

            $(selector).on(event,handler);
           // $(selector).on(event,handler);
        };
        this.acceptWithRegion=function(command){
            command(this.$region);
        }
    }

    return view;

});

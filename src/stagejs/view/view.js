/**
 * Created by Wadi on 16/06/2014.
 */
define(['lib/underscore','lib/extend','lib/handlebars','lib/jquery'], function (_,extend,hb,$) {

    var View=function(options) {
        //TODO id management
        options || (options = {});
        //ToDO Declarative view Creation from template attributes
        _.extend(this, _.pick(options, viewOptions));
        this._setUpTemplate();
        this.initialize.apply(this, arguments);
        console.log(_.size(this.subViews));

    };
    var viewOptions = ['template','$el','el','subViews', 'id', 'attributes', 'className', 'tagName'];
    _.extend(View.prototype,{

        tagName: 'div',
        initialize:function(){},
        setUpTemplate:undefined,
        preRender:null,
        _renderTemplate:function(context){
            var html    = this._ctemplate(context);
            this._ensureElement();
            this.$el.html(html);
        },
        render:function(context) {
            if (this.preRender != null)
                _.each(this.preRender, function (f) {
                    f(this.$el)
                },this);
            if (_.size(this.subViews)== 0){
                this._renderTemplate(context);
            }
            else{
                this._renderTemplate(context["this"]);
                this._ensureSubViewsElements();
                _.each(this.subViews,function(view, key){
                    view.render(context[key]);
                    }
                );
            }
            if(this.postRender!=null)
                _.each(this.postRender,function(f){f(this.$el)},this);
        },
        postRender:null,
        subscribe:function(selector,event,handler){
            $(selector).on(event,handler);
        },
        _setUpTemplate:function(){
             if(this.setUpTemplate!=undefined)
                this.template=this.setUpTemplate(this.template);
             this._ctemplate= hb.compile(this.template);

        },
        _ensureElement:function(){
            if(this.$el==undefined){
                if(typeof this.el!="string"||this.el.length==0){
                    throw new Error("No proper element selection provided. Provide either the $el parameter as a non empty jquery object or the el parameter as a valid DOM selector string that evaluates to non empty selection.");
                }else{
                    this.$el=$(this.el);
                }

            }
            if(this.$el.length > 0){
                return;
            }
            else{
                throw new Error("No proper element selection provided. Provide either the $el parameter as a non empty jquery object or the el parameter as a valid DOM selector string that evaluates to non empty selection.");

            }

        },
        _ensureSubViewsElements:function(){

            //TODO optimise subviews el setup (performance)

            _.each(this.subViews,function(view, key){
                view.$el=this.$el.find(key);
            },this);

        },
        subViews:{},
        addChild:function(child){
           _.extend(this.subViews,child);
        },
        removeChild:function(name){
            _.omit(this.subViews, name);
        },
        contextMap:null

    });
    View.extend=extend;


    return View;
    //TODO async render flow
    //TODO Event subscription removal
});

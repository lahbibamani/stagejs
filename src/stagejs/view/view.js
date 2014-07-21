/**
 * Created by Wadi on 16/06/2014.
 */
define(['lib/underscore','lib/extend','lib/handlebars','lib/jquery'], function (_,extend,hb,$) {

    var View=function(options) {
        //TODO id management
        options || (options = {});
        //ToDO Declarative view Creation from template attributes
        _.extend(this, _.pick(options, viewOptions));
        this._ensureElement();
        this._setUpTemplate();
        this.initialize.apply(this, arguments);


    };
    var viewOptions = ['template','el', 'id', 'attributes', 'className', 'tagName'];
    _.extend(View.prototype,{
        tagName: 'div',
        initialize:function(){},
        setUpTemplate:undefined,
        preRender:null,
        _renderTemplate:function(context){
            var html    = this._ctemplate(context);
            this.$el.html(html);
        },
        render:function(context) {
            if (this.preRender != null)
                _.each(this.preRender, function (f) {
                    f(this, context)
                });
            if (this.contextMap == null){
                this._renderTemplate(context);
            }
            else{
                this._renderTemplate(context[this.contextMap["this"]]);
                _.each(this._subViews,function(view, key){
                    view.render(context[this.contextMap[key]]);
                    }
                );
            }
            if(this.postRender!=null)
                _.each(this.postRender,function(f){f(this,context)});
        },
        postRender:null,
        subscribe:function(selector,event,handler){
            $(selector).on(event,handler);
        },
        _setUpTemplate:function(){
        if(this.setUpTemplate!=undefined)
            this.template=this.setUpTemplate(view.setUpTemplate);
            this._ctemplate= hb.compile(this.template);

        },
        _ensureElement:function(){
            //TODO
        },
        _subViews:{},
        addChild:function(child){
           _.extend(this._subViews,child);
        },
        removeChild:function(name){
            _.omit(this._subViews, name);
        },
        contextMap:null,
        selectors:null

    });
    View.extend=extend;


    return View;
    //TODO async render flow
    //TODO Event subscription removal
});

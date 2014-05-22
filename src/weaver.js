var weaver = {};
weaver.a = 1;
weaver.setAttributeAccessListeners = function (object, attribute, accessType, listeners) {
    if(object.hasOwnProperty(attribute)){
    var proxy = {};
    var context={
        proxy:proxy,
        object:object,
        attribute:attribute,
        accessType:accessType
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
            configurable: true});
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
    }else{
        throw 'no such attribute :"'+attribute+'" in supplied object';
    }

};



module.exports = weaver;
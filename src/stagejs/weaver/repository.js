define(['../lib/jshashtable'], function (Hashtable) {
    var dictionary = new Hashtable();
    var repository={
        add:function(key,value){
            dictionary.put(key,value);
        },
        get:function(key){
            return dictionary.get(key);
        }

    };

    return repository
});
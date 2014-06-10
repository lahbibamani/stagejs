define(['hashTools'], function (hashTools) {
    var dictionary={};
    var repository={
        add:function(key,value){
            dictionary[hashTools.objectHash(key)]=value;
        },
        get:function(key){
            return dictionary[hashTools.objectHash(key)];
        }

    };

    return repository
});
define([],function(){

    'use strict';

    var exports = function(obj1, obj2, force){
        for(var p in obj2){
            if(force || obj1[p]=== undefined){
                obj1[p]= obj2[p];
            }
        }
        return obj1;
    };

    return exports;

});

define(['conditioner','conditioner/Observer'],function(conditioner, Observer){

    'use strict';

    var exports = function (element, options){

        this._element = element;
        this._options = options;

        this._initialize();

    };

    exports.prototype = {

        /**
         * Create elements
         *
         * @memberof Test
         * @static
         * @private
         */

        _initialize: function () {

            console.log('init');

        },

        /**
         * Clean up when unloading this module.
         *
         * @memberof TEst
         * @static
         * @public
         */

        unload:function(){

        }

    };

    return exports;

});
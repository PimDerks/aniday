define([],function(){

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

        },

        /**
         * Clean up when unloading this module.
         *
         * @memberof Test
         * @static
         * @public
         */

        unload:function(){

        }

    };

    return exports;

});
/**
 * Generic methods for handling events.
 */
define(function(){

    'use strict';

    return {

        /**
         * Add prefixed event.
         * @memberof Event
         * @param {Element}
         * @param {String}
         * @param {Function}
         * @static
         * @public
         */

        addPrefixedEvent: function(element, type, callback){
            var pfx = ['webkit', 'moz', 'MS', 'o', ''];
            for (var p = 0; p < pfx.length; p++) {
                if (!pfx[p]){
                    type = type.toLowerCase();
                }
                element.addEventListener(pfx[p]+type, callback, false);
            }
        },

        /**
         * Remove prefixed event.
         * @memberof Event
         * @param {Element}
         * @param {String}
         * @param {Function}
         * @static
         * @public
         */

        removePrefixedEvent: function(element, type, callback){
            var pfx = ['webkit', 'moz', 'MS', 'o', ''];
            for (var p = 0; p < pfx.length; p++) {
                if (!pfx[p]){
                    type = type.toLowerCase();
                }
                element.removeEventListener(pfx[p]+type, callback, false);
            }
        }

    };

});
/**
 * Some helpers for getting information about the current viewport.
 */

define(function(){

    'use strict';

    return {

        getWidth: function() {

            // get size
            if(window.innerWidth){
                return window.innerWidth;
            } else {

                if(document.documentElement.clientWidth !== 0){
                    return document.documentElement.clientWidth; //strict mode
                } else {
                    return document.body.clientWidth; //quirks mode
                }

            }

            return 0;

        },

        getHeight: function () {

            // get size
            if (window.innerHeight) {
                return window.innerHeight;
            } else {
                if (document.documentElement.clientHeight !== 0) {
                    return document.documentElement.clientHeight; //strict mode
                } else {
                    return document.body.clientHeight; //quirks mode
                }
            }

            return 0;

        },

        getScroll: function() {

            var scroll = {
                x: window.pageXOffset || document.documentElement.scrollLeft,
                y: window.pageYOffset || document.documentElement.scrollTop
            };

            return scroll;

        }

    };

});
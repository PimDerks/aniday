define(['conditioner','conditioner/Observer','utils/Window'],function(conditioner, Observer, WindowHelper){

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
         * @memberof MainNav
         * @static
         * @private
         */

        _initialize: function () {

            // set positions
            this._setPositions();

            // listen to scroll
            this._onScrollBind = this._onScroll.bind(this);
            window.addEventListener('scroll', this._onScrollBind);

            // initial
            this._onScrollDone();

        },

        _setPositions: function() {

            this._positions = [];

            // get elements
            this._anchors = this._element.querySelectorAll('a');
            var i = 0,
                l = this._anchors.length;

            for(;i<l; i++){
                var current = this._anchors[i],
                    anchor = current.getAttribute('href').replace('#',''),
                    target = document.getElementById(anchor),
                    offsetTop;

                if(target){
                    offsetTop = target.offsetTop;
                    this._positions.push(offsetTop);
                }

            }

        },

        _onScroll: function(e){

            clearTimeout(this._timer);
            var _this = this;
            this._timer = setTimeout(function(){
                _this._onScrollDone();
            },100);

        },

        _onScrollDone: function(){

            var scrollPos = WindowHelper.getScroll().y,
                match = null;
                i = 0
                l = this._positions.length;

            for(; l >= -1; l--){
                if(scrollPos >= (this._positions[l] - 100) && !match){
                    match = l;
                }
            }

            var i = 0,
                l = this._anchors.length;

            for(;i<l; i++){
                var current = this._anchors[i];
                if(i === match){
                    current.parentNode.classList.add('current');
                } else{
                    current.parentNode.classList.remove('current');
                }
            }


        },

        /**
         * Clean up when unloading this module.
         *
         * @memberof MainNav
         * @static
         * @public
         */

        unload:function(){

            // stop listening
            window.removeEventListener('scroll', this._onScrollBind);

        }

    };

    return exports;

});
define(['conditioner','conditioner/Observer','utils/Element', 'utils/Window'],function(conditioner, Observer, ElementHelper, WindowHelper){

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
         * @memberof Header
         * @static
         * @private
         */

        _initialize: function () {

            // listen to scroll
            this._onScrollBind = this._onScroll.bind(this);
            window.addEventListener('scroll', this._onScrollBind);

        },


        /**
         * Bounce scroll events
         *
         * @memberof Header
         * @static
         * @private
         */

        _onScroll: function(){

            var _this = this;

            if(this._timer){
                clearTimeout(this._timer);
            }

            this._timer = setTimeout(function(){
                _this._toggle();
            },200);

        },


        /**
         * Switch classes
         *
         * @memberof Header
         * @static
         * @private
         */

        _toggle: function(){


            var scrollOffset = WindowHelper.getScroll().y,
                windowHeight = WindowHelper.getHeight();

            // if scroll pos is bigger than 33% of the window height, show menu
            if(scrollOffset > (windowHeight/3)){

               this._element.classList.add('page-header--visible');

            } else {

                this._element.classList.remove('page-header--visible');

            }

        },

        /**
         * Clean up when unloading this module.
         *
         * @memberof Header
         * @static
         * @public
         */

        unload:function(){

            window.removeEventListener('scroll', this._onScrollBind);

        }

    };

    return exports;

});
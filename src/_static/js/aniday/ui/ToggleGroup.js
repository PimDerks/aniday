define(['module', 'conditioner/Observer'], function (module, Observer) {

    'use strict';

    var exports = function (id){

        this._id = id;
        this._togglers = [];
        this._closeAllExceptBind = this._closeAllExcept.bind(this);
        this._closeAllBind = this._closeAll.bind(this);

    };

    exports.prototype = {

        /**
         * Register a toggle
         *
         * @memberof ToggleGroup
         * @param {Object} Toggle
         * @public
         */

        register:function(Toggle){

            // add
            this._togglers.push(Toggle);

            // listen
            Observer.subscribe(Toggle, 'activate', this._closeAllExceptBind);

        },

        /**
         * Remove a toggle
         *
         * @memberof ToggleGroup
         * @param {Object} Toggle
         * @public
         */

        remove:function(Toggle) {

            var l = this._togglers.length;
            for (var i = 0; i < l; i++) {
                if (this._togglers[i] == Toggle) {
                    this._togglers.splice(i, 1);
                    return;
                }
            }

        },

        /**
         * Close all toggles.
         *
         * @memberof ToggleGroup
         * @param {Object} Toggle
         * @private
         */

        _closeAll:function(){

            var l = this._togglers.length;
            for (l > 0; l--; ) {
                this._togglers[l].deactivate();
            }

            this._index = null;

        },

        /**
         * Close all toggles except the given Toggle.
         *
         * @memberof ToggleGroup
         * @param {Object} Toggle
         */

        _closeAllExcept:function(Toggle){

            var l = this._togglers.length,
                i = 0;
            for (; i < l; i++) {
                var current = this._togglers[i];
                if (current === Toggle) {
                    this._index = i;
                } else {
                    current.deactivate();
                }
            }

            Observer.publish(this, 'change', Toggle);

        },

        /**
         * Close all toggles except the given index.
         *
         * @memberof ToggleGroup
         * @param {Number} The index to show
         */

        _closeAllExceptIndex:function(index){

            var l = this._togglers.length,
                i = 0,
                active = false;

            for (; i < l; i++) {
                var current = this._togglers[i];
                if (i == index) {
                    active = current;
                    this._index = i;
                } else {
                    current.deactivate();
                }
            }

            if (active) {
                Observer.publish(this, 'change', active);
            }

        },

        /**
         * Get the amount of items.
         *
         * @memberof ToggleGroup
         * @return {Number} The number of items.
         * @public
         */

        getAmount:function(){
            return this._togglers.length;
        },

        /**
         * Close all toggles except the given index.
         *
         * @class ToggleGroup
         * @method show
         * @param {Number} The index to show
         * @public
         */

        show:function(index) {
            this._togglers[index].activate();
        },

        /**
         * Get the current active index
         *
         * @class ToggleGroup
         * @method _getIndex
         * @return {Number} Active index
         */

        getIndex:function(){
            return this._index;
        },

        /**
         * Unload.
         *
         * @class ToggleGroup
         * @method _unload
         */

        unload:function() {

            // Empty array
            this._togglers = [];

        }

    };

    return exports;

});
define(['module', 'conditioner/Observer', 'ui/ToggleGroup','ui/ToggleManager'], function (module, Observer, ToggleGroup, ToggleManager) {

    'use strict';

    var exports = function (element, options){

        this._element = element;
        this._options = options || {};

        this._initialize();

    };

    exports.prototype = {

        /**
         * Initialize module.
         *
         * @memberof Toggle
         * @static
         * @private
         */

        _initialize:function(){

            // set id
            this._id = this._element.id;

            // register
            this._manager = ToggleManager.getInstance();
            this._manager.register(this);

            // listen
            this._setStateBind = this._setState.bind(this);
            Observer.subscribe(this, 'activate', this._setStateBind);
            Observer.subscribe(this, 'deactivate', this._setStateBind);

            // set initial state
            this._isActive = this.getState() == 'activated' ? true : false;

            // show/hide
            if(this._isActive){
                this.activate();
            } else {
                this.deactivate();
            }

        },

        /**
         * Activate.
         *
         * @class Toggle
         * @method activate
         * @param {Boolean} Disable hash-update.
         */

        activate:function(){

            this._isActive = true;
            this._element.classList.add('activated');
            this._element.classList.remove('deactivated');

            Observer.publish(this, 'activate', this);
            this._setState();

        },

        /**
         * Deactivate.
         *
         * @memberof Toggle
         * @public
         */

        deactivate:function(){

            this._isActive = false;
            this._element.classList.add('deactivated');
            this._element.classList.remove('activated');

            Observer.publish(this, 'deactivate', this);

        },

        /**
         * Toggle between active and not active.
         *
         * @memberof Toggle
         * @public
         */

        toggle:function(){

            if(this._isActive){
                this.deactivate();
            } else {
                this.activate();
            }

        },

        /**
         * Get state
         *
         * @memberof Toggle
         * @return {String} The state of the toggle
         * @public
         */

        getState:function(){
            return this._element.getAttribute('data-state');
        },

        /**
         * Set state
         *
         * @memberof Toggle
         * @public
         */

        _setState:function(){

            if (this._isActive) {
                this._element.setAttribute('data-state','activated');
                this._element.classList.remove('deactivated');
                this._element.classList.add('activated');
            } else {
                this._element.setAttribute('data-state', 'deactivated');
                this._element.classList.remove('activated');
                this._element.classList.add('deactivated');
            }

        },

        /**
         * Get element
         *
         * @memberof Toggle
         * @return {Node} The element toggled.
         * @public
         */

        getElement:function(){
            return this._element;
        },

        /**
         * Get group
         *
         * @memberof Toggle
         * @return {String} The group the toggle belongs to, or null if no attribute found.
         * @public
         */

        getGroup:function(){
            return this._element.getAttribute('data-group');
        },

        /**
         * Get id
         *
         * @memberof Toggle
         * @return {String} The id for the element to toggle
         * @public
         */

        getId:function(){
            return this._id;
        },

        /**
         * Public method for checking the state of the toggle.
         *
         * @memberof Toggle
         * @return {Boolean}
         * @public
         */

        isActive:function(){
            return this._isActive;
        },

        /**
         * Clean up when unloading this module.
         *
         * @memberof Toggle
         * @static
         * @public
         */

        unload:function(){

            // Remove activated / deactivated classes
            this._element.classList.remove('activated');
            this._element.classList.remove('deactivated');

            // Remove state
            Observer.unsubscribe(this, 'activate', this._setStateBind);
            Observer.unsubscribe(this, 'deactivate', this._setStateBind);

        }

    };

    return exports;

});
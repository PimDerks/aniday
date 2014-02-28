define(['module', 'conditioner/Observer', 'ui/ToggleGroup'], function (module, Observer,ToggleGroup) {

    'use strict';

    /**
     * ToggleManager constructor.
     *
     * @class ToggleManager
     * @constructor
     */

    var ToggleManager = function () {

        this._toggles = [];
        this._groups = [];
        this._triggers = [];

    };

    ToggleManager.prototype = {

        /**
         * Register toggle
         *
         * @memberof ToggleManager
         * @method register
         * @param {Object} Toggle object.
         */

        register:function(Toggle) {

            // add to togglers
            this._toggles.push(Toggle);

            // look for groups
            this._manageGroup(Toggle);

        },

        /**
         * Unregister toggle
         *
         * @memberof ToggleManager
         * @param {Object} Toggle object.
         * @public
         */

        remove:function(Toggle) {

            // check if part of group
            var group = Toggle.getGroup();
            if (group) {

                // check if group exists
                if (this._groups[group]) {
                    this._groups[group].remove(Toggle);
                }

            }

            // remove from this._toggles
            var l = this._toggles.length, i;
            for (i = 0; i < l; i++) {
                var current = this._toggles[i];
                if (current === Toggle) {
                    this._toggles.splice(i, 1);
                }
            }

        },

        /**
         * Manage group
         *
         * @memberof ToggleManager
         * @param {Object} Toggle object.
         * @private
         */

        _manageGroup:function(Toggle){

            // check if part of group
            var group = Toggle.getGroup();
            if (group) {

                // check if group exists, if not create
                if (!this._groups[group]) {
                    this._groups[group] = new ToggleGroup(group);
                }

                // register in group
                this._groups[group].register(Toggle);

            }

        },

        /**
         * Get toggle by Id
         *
         * @memberof ToggleManager
         * @param {String} Id of toggle to get
         * @return {Object}
         * @public
         */

        getToggleById:function(id){

            var l = this._toggles.length;

            for (l > 0; l--; ) {
                var current = this._toggles[l];
                if (current._id === id) {
                    return current;
                }
            }
            return;

        },

        /**
         * Get togglegroup by Id
         *
         * @memberof ToggleManager
         * @param {String} Id of toggle to get
         * @return {Object}
         * @public
         */

        getToggleGroupById:function(id){

            for (var group in this._groups) {
                if (group === id) {
                    return this._groups[group];
                }
            }
            return false;

        },

        /**
         * Get triggers by the Id of their target
         *
         * @memberof ToggleManager
         * @param {String} Id of toggle to get
         * @return {Array} Array of triggers matching the passed in ID.
         * @public
         */

        getTriggersByTargetId:function(id){

            var l = this._toggles.length,
                result = [];

            for (l > 0; l--;) {
                var current = this._toggles[l];
                if (current._targetId === id) {
                    result.push(current);
                }
            }
            return result;

        }

    };

    var _instance = null;

    return {
        getInstance:function(){
            if (!_instance){_instance = new ToggleManager();}
            return _instance;
        }
    };

});
define(['conditioner','conditioner/Observer','ui/Toggle','ui/ToggleTrigger','utils/Element'],function(conditioner, Observer, Toggle, ToggleTrigger, ElementHelper){

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

            // get ul
            this._list = this._element.querySelector('ul');

            // create toggle
            this._toggle = new Toggle(this._list);

            // create trigger node
            this._triggerNode = document.createElement('a');
            this._triggerNode.className = 'menu-toggle';
            this._triggerNode.innerHTML = '<span class="icon-menu"></span><span class="screenreader">Menu</span>';
            this._triggerNode.href = '#';
            this._triggerNode.dataset.toggleTarget = this._list.id;

            // create trigger
            this._trigger = new ToggleTrigger(this._triggerNode);

            // insert trigger
            ElementHelper.insertBefore(this._triggerNode, this._list);

        },

        /**
         * Clean up when unloading this module.
         *
         * @memberof MainNav
         * @static
         * @public
         */

        unload:function(){

            // unload toggle
            this._toggle.unload();

            // remove trigger
            this._trigger.unload();
            ElementHelper.remove(this._triggerNode);

        }

    };

    return exports;

});
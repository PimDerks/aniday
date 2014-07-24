define(['module', 'conditioner/Observer', 'ui/Toggle','ui/ToggleManager','utils/Element'], function (module, Observer, _parent, ToggleManager, ElementHelper) {

    'use strict';

    var exports = function (element, options){

        _parent.call(this, element, options);

    };

    var p = exports.prototype = Object.create(_parent.prototype);

    p._initialize = function(){

        _parent.prototype._initialize.call(this);

        this._manager = ToggleManager.getInstance();

        // bind
        this._onClickBind = this._onClick.bind(this);
        this._onKeyUpBind = this._onKeyUp.bind(this);
        this._element.addEventListener('click', this._onClickBind);
        this._element.addEventListener('keyup', this._onKeyUpBind);

    };

    /**
     * Activate target toggle
     *
     * @memberof ToggleTrigger
     * @return {Object}
     * @private
     */

    p._getToggle = function(){

        this._toggle = this._manager.getToggleById(this._element.getAttribute('data-toggle-target'));
        if(this._toggle){
            return this._toggle;
        }
        return false;

    };

    /**
     * Activate target toggle
     *
     * @memberof ToggleTrigger
     * @private
     */

    p._onKeyUp = function(e){
        if(e.keyCode == 13){
            this._toggleTargetToggle();
        }
    };



    /**
     * Activate target toggle
     *
     * @memberof ToggleTrigger
     * @private
     */

    p._onClick = function(e){

        e.preventDefault();
        e.stopPropagation();

        this._toggleTargetToggle();
        this.activate()

    };

    /**
     * Activate target toggle
     *
     * @memberof ToggleTrigger
     * @private
     */

    p._activateTargetToggle = function () {

        if (!this._toggle) {
            this._getToggle();
        }

        if(this._toggle){
            this._toggle.activate();
        }

        this.activate();

    };

    /**
     * De-activate target toggle
     *
     * @memberof ToggleTrigger
     * @private
     */

    p._deactivateTargetToggle = function () {

        if (!this._toggle) {
            this._getToggle();
        }

        if(this._toggle){
            this._toggle.deactivate();
        }

        this.deactivate();

    };

    /**
     * Toggle target toggle
     *
     * @class ToggleTrigger
     * @method _toggleTargetToggle
     */

    p._toggleTargetToggle = function () {

        if (!this._toggle) {
            this._getToggle();
        }

        if(this._toggle){
            this._toggle.toggle();
        }

        this.toggle();

    };

    p.unload = function(){

        // unload parent
        _parent.prototype.unload.call(this);

        // stop listening
        this._element.removeEventListener('click', this._onClickBind);

        this._element.removeEventListener('keyup', this._onKeyUpBind);

    };

    return exports;

});
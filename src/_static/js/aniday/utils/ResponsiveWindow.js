define(['conditioner/Observer','utils/Window'],function(Observer,WindowHelper){

    'use strict';

    var ResponsiveWindow = function(element,options) {

        this._element = element;
        this._options = options;

        this._initialize();
    };

    ResponsiveWindow.prototype = {

        _initialize: function(){

            this._timer = null;
            this._onResizeBind = this._onResize.bind(this);
            window.addEventListener('resize', this._onResizeBind, false);

            this._currentHeight = WindowHelper.getHeight();
            this._currentWidth = WindowHelper.getWidth();

        },

        _onResize: function () {

            clearTimeout(this._timer);

            var self = this;
            this._timer = setTimeout(function () {
                self._onStable();
            }, 100);

        },

        _onStable: function () {
            if (this.checkActualResize()) {
                Observer.publish(this, 'resize');
            }
        },

        checkActualResize: function () {
            var currentHeight = WindowHelper.getHeight();
            var currentWidth = WindowHelper.getWidth();
            if (!currentHeight || currentHeight !== this._currentHeight || !currentWidth || currentWidth !== this._currentWidth) {
                this._currentHeight = currentHeight;
                this._currentWidth = currentWidth;
                return true;
            }
            return false;
        }

    };

    var _instance = null;

    return {
        getInstance: function () {
            if (!_instance) { _instance = new ResponsiveWindow(); }
            return _instance;
        }
    };


});
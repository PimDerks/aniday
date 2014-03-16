define(['conditioner','conditioner/Observer','ui/AudioPlayer'],function(conditioner, Observer, AudioPlayer){

    'use strict';

    var exports = function (element, options){

        this._element = element;
        this._options = options;

        // Initialize
        this._initialize();

    };

    exports.prototype = {

        /**
         * Create elements
         *
         * @memberof Test
         * @static
         * @private
         */

        _initialize: function () {

            // get audio
            this._audio = this._element.querySelectorAll('[href*=".mp3"]');

            // array with players
            this._players = [];

            // create players
            var l = this._audio.length,
                i = 0;
            for(; i < l; i++){
                var player = new AudioPlayer(this._audio[i], {});
                this._players.push(player);
                Observer.subscribe(player, 'play', this._onPlay.bind(this));
            }

        },

        _onPlay: function(player){

            // currently playing
            this._current = player;

            // stop other players
            var l = this._players.length,
                i = 0,
                current;

            for(; i < l; i++){
                current = this._players[i];
                if(this._players[i] !== this._current){
                    current.stop();
                }
            }

        },

        /**
         * Clean up when unloading this module.
         *
         * @memberof TEst
         * @static
         * @public
         */

        unload:function(){

        }

    };

    return exports;

});

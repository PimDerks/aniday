define(['conditioner','conditioner/Observer','audiojs','utils/Merge'],function(conditioner, Observer, Audio, Merge){

    'use strict';

    var exports = function (element, options){

        this._element = element;
        this._options = options;

        /*jshint multistr: true */

        // Options
        var defaultOptions = {
            css: false,
            swfLocation: '../' + 'audiojs.swf',
            createPlayer: {
                markup: '\
                <div class="play-pause"> \
                    <button class="play" type="button">Play</button> \
                    <button class="pause" type="button">Pause</button> \
                    <p class="loading"></p> \
                    <p class="error"></p> \
                </div> \
                <div class="scrubber"> \
                    <div class="progress"></div> \
                    <div class="loaded"></div> \
                </div> \
                <div class="time"> \
                    <em class="played">00:00</em>/<strong class="duration">00:00</strong> \
                </div> \
                <div class="error-message"></div>',
                playPauseClass: 'play-pause',
                scrubberClass: 'scrubber',
                progressClass: 'progress',
                loaderClass: 'loaded',
                timeClass: 'time',
                durationClass: 'duration',
                playedClass: 'played',
                errorMessageClass: 'error-message',
                playingClass: 'playing',
                loadingClass: 'loading',
                errorClass: 'error'
            },
            play: this.play.bind(this),
            playPause: this.playPause.bind(this),
            pause: this.pause.bind(this)
        };

        this._options = Merge(this._options, defaultOptions, false);

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

            this._player = Audio.create(this._element, this._options);

        },

        _init: function(){

        },

        load: function(src){
            this._player.load(src);
        },

        play: function(){
        },

        playPause: function(){
        },

        pause: function(){
            // pim.element.removeClass(this._artwork,'playing');
        },

        getPlayer: function(){
            return this._player;
        },

        /**
         * Clean up when unloading this module.
         *
         * @memberof Test
         * @static
         * @public
         */

        unload:function(){

        }

    };

    return exports;

});
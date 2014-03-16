define(['conditioner','conditioner/Observer','utils/Merge', 'utils/Element'],function(conditioner, Observer, Merge, Element){

    'use strict';

    var exports = function (element, options){

        this._element = element;
        this._options = options;

        /*jshint multistr: true */

        var title = element.innerHTML;

        // Options
        var defaultOptions = {
            css: false,
            swfLocation: '/_static/js/vendor/audiojs/audiojs.swf',
            createPlayer: {
                markup: '\
                <div class="audiojs__play-pause"> \
                    <button class="audiojs__play-pause__play" type="button"><span class="icon icon-play"></span><span class="screenreader">Afspelen</span></button> \
                    <button class="audiojs__play-pause__pause" type="button"><span class="icon icon-pause"></span><span class="screenreader">Pauzeren</span></button> \
                    <p class="audiojs__play-pause__loading"></p> \
                    <p class="audiojs__play-pause__error"></p> \
                </div> \
                <div class="audiojs__title">' + title + '</div><div class="audiojs__time"> \
                    <span class="audiojs__time__played">00:00</span>/<span class="audiojs__time__duration">00:00</span> \
                </div> \
                <div class="audiojs__scrubber"><div class="audiojs__scrubber__inner"> \
                    <div class="audiojs__scrubber__progress"></div> \
                    <div class="audiojs__scrubber__loaded"></div> \
                </div></div> \
                <div class="audiojs__error-message"></div>',
                playPauseClass: 'audiojs__play-pause',
                scrubberClass: 'audiojs__scrubber',
                progressClass: 'audiojs__scrubber__progress',
                loaderClass: 'audiojs__scrubber__loaded',
                timeClass: 'audiojs__time',
                durationClass: 'audiojs__time__duration',
                playedClass: 'audiojs__time__played',
                errorMessageClass: 'audiojs__error-message',
                playingClass: 'audiojs__play-pause__playing',
                loadingClass: 'audiojs__play-pause__loading',
                errorClass: 'audiojs__error-message'
            },
            play:this.play.bind(this),
            pause:this.pause.bind(this)
        };

        this._options = Merge(this._options, defaultOptions, false);

        var _this = this;
        audiojs.events.ready(function() {
            _this._initialize();
        });

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

            // prevent clicks on anchor
            this._onClickBind = this._onClick.bind(this);
            this._element.addEventListener('click', this._onClickBind);

            // create audio
            this._audio = document.createElement('audio');

            // set src
            this._audio.src = this._element.href;

            // append
            Element.insertBefore(this._audio, this._element);

            // create player
            this._player = audiojs.create(this._audio, this._options);

            // listen to clicks on player
            this._player.wrapper.addEventListener('click', this._onClickPlayer.bind(this));

        },

        _onClick: function(e){

            e.preventDefault();
            e.stopPropagation();

        },

        _onClickPlayer: function(e){

            var target = e.target;
            // check if target is not a button
            while(target.nodeName.toLowerCase() != 'button' && target.nodeName.toLowerCase() != 'li'){
                target = target.parentNode;
            }

            if(target.nodeName.toLowerCase() != 'button' && !this._player.playing){
                this._player.playPause();
            }

        },

        load: function(src){

        },

        play: function() {
            this._player.wrapper.classList.add('audiojs--playing');
            Observer.publish(this, 'play', this);
        },

        pause: function() {
            this._player.wrapper.classList.remove('audiojs--playing');
        },

        getPlayer: function(){
            return this._player;
        },

        stop: function(){
            this._player.pause();
        },

        /**
         * Clean up when unloading this module.
         *
         * @memberof Test
         * @static
         * @public
         */

        unload:function(){

            // stop listening
            this._element.removeEventListener('click', this._onClickBind);

            // remove node
            Element.remove(this._audio);

        }

    };

    return exports;

});
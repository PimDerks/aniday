define(['conditioner','conditioner/Observer','ui/AudioPlayer'],function(conditioner, Observer, AudioPlayer){

    'use strict';

    var exports = function (element, options){

        this._element = element;
        this._options = options;

        // Get reference to audio element
        this._player = document.getElementById(this._element.getAttribute('data-audio-player'));

        // Get anchors
        this._anchors = this._element.querySelectorAll('a');

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

            // Get elements
            this._nodes = this._getNodes();

            // Array of files
            this._files = [];

            // Listen to clicks on anchors
            var l = this._anchors.length, i = 0;
            for(; i < l; i++){
                var current = this._anchors[i];
                this._files.push(current.getAttribute('href'));
                current.addEventListener('click', this._onAnchorClick.bind(this));
            }

            var play = '<button class="play-pause play" type="button"><span class="icon icon-play"><span class="screenreade">Play</span></span></button>';
            var next = '<button class="next" type="button"><span class="icon icon-forward"><span class="screenreade">Forward</span></span></button>';
            var pause = '<button class="play-pause pause" type="button"><span class="icon icon-pause"><span class="screenreade">Pause</span></span></button>';
            var prev = '<button class="prev" type="button"><span class="icon icon-backward"><span class="screenreade">Backward</span></span></button>';

            // Initialize player
            this._player = new AudioPlayer(this._player, {
                createPlayer: {
                    markup: '<ul class="controls"><li>' + prev + '</li><li>' + play + '</li><li>' + pause + '</li><li>' + next + '</li></ul><div class="status"><span class="loading"></span><span class="error"></span></div><div class="scrubber"><div class="progress"></div><div class="loaded"></div></div><div class="time"><em class="played">00:00</em>/<strong class="duration">00:00</strong></div><div class="error-message"></div>',
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
                updatePlayhead: this._onUpdatePlayHead.bind(this)
            });

            // Get reference to player wrapper
            this._audio = this._player.getPlayer();

            // Get reference to time element
            this._played = this._audio.wrapper.querySelector('.played');

            // Get reference to progress in player
            var player = this._audio.settings.createPlayer;
            this._playerProgress = this._audio.wrapper.querySelector('.' + player.progressClass);

            // Create prev
            this._prevButton = this._audio.wrapper.querySelector('.prev');
            this._prevButton.addEventListener('click', this._prev.bind(this));

            // Create next
            this._nextButton = this._audio.wrapper.querySelector('.next');
            this._nextButton.addEventListener('click', this._next.bind(this));

            // Index
            this._index = 0;

            // Load
            this._load();

        },

        _getNodes: function(){
            var l = this._anchors.length,
                i = 0,
                result = [];
            for(; i < l; i++){
                var current = this._anchors[i];
                var obj = {
                    'anchor' : current,
                    'item': current.parentNode,
                    'progress': current.parentNode.querySelector('.song-progress')
                };
                result.push(obj);
            }
            return result;
        },

        _onAnchorClick: function(e){

            // Stop event
            e.preventDefault();
            e.stopPropagation();

            // Get mp3
            var src = e.target,
                l = this._anchors.length,
                index = null,
                i = 0;

            // Get index
            for(; i < l; i++){
                if(this._anchors[i] == src){
                    index = i;
                }
            }

            // load
            this._index = index;
            this._load(index);
            this._player.play();
            this._audio.play();

        },

        _next: function(){
            if(this._index !== this._files.length - 1){
                this._index = this._index + 1;
                this._load(this._index);
            }
            this._player.play();
            this._audio.play();
        },

        _prev: function(){
            if(this._index !== 0){
                this._index = this._index - 1;
                this._load(this._index);
            }
            this._player.play();
            this._audio.play();
        },

        _load: function(index){

            if(!index){
                index = this._index;
            }
            this._audio.load(this._files[index]);
            this._resetNodes();
            this._update();
        },

        _onUpdatePlayHead: function(percent){

            // update playtime
            var p = this._audio.duration * percent;

            // calculate current playtime
            var m = Math.floor(p / 60),
                s = Math.floor(p % 60);

            this._played.innerHTML = (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;

            // update progress for player
            this._playerProgress.style.width = (percent * 100) + '%';

            // update progress for track
            if(this._nodes){
                var current = this._nodes[this._index];
                if(current){
                    current.progress.style.width = (percent * 100) + '%';
                }
            }

        },

        _update: function(){

            // activate current item
            this._resetNodes();
            // pim.element.addClass(this._nodes[this._index].item, 'active');

            // update controls
            this._updateControls();

        },

        _updateControls: function(){
            // hide/show prev
            if(this._index === 0){
                //pim.element.addClass(this._prevButton, 'disabled')
            } else {
                //pim.element.removeClass(this._prevButton, 'disabled');
            }

            // hide/show next
            if(this._index == this._files.length - 1){
                //pim.element.addClass(this._nextButton, 'disabled');
            } else {
                //pim.element.removeClass(this._nextButton, 'disabled');
            }

        },

        _resetNodes: function(){
            var l = this._nodes.length,
                i = 0;

            for(; i < l; i++){
                var current = this._nodes[i];
                // pim.element.removeClass(current.item, 'active');
                current.progress.style.width = '';
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

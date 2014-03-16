/**
 * RequireJS Configuration
 */
requirejs.config({
    baseUrl:'/_static/js/aniday',
    paths:{
        'conditioner':'../vendor/rikschennink/conditioner',
        'conditioner/tests':'../vendor/rikschennink/tests',
        //'audiojs':'../vendor/audiojs/audio.min',
        'hammer':'../vendor/eightmedia/hammer'
    }
});

/**
 * Setup base environment options if none defined
 */
if (!window._env){
    var _env = {
        'version':'2014-03-16'
    };
}

/**
 * Setup Additional Configuration options (separate because would disrupt build process otherwise)
 */
(function(){

    'use strict';

    requirejs.config({
        urlArgs:'cache=' + _env.version
    });

}());

/**
 * Start Aniday website
 */
(function(){

    'use strict';

    // kickoff
    define(['aniday'],function(aniday) {
        aniday.init({
            'modules':{
                'ui/Scroller':{
                    'options':{
                        'paging':true
                    }
                }
            }
        });
    });

}());
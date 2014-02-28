/**
 * RequireJS Configuration
 */
requirejs.config({
    baseUrl:'/_static/js/aniday',
    paths:{
        'conditioner':'../vendor/rikschennink/conditioner',
        'conditioner/tests':'../vendor/rikschennink/tests',
        'audiojs':'../vendor/audiojs/audio.min',
        'hammer':'../vendor/eightmedia/hammer',
        'shadowbox':'../vendor/mjijackson/shadowbox'
    }
});

/**
 * Setup base environment options if none defined
 */
if (!window._env){
    var _env = {
        'version':'0.0.0',
        'build':'0',
        'port':''
    };
}

/**
 * Setup Additional Configuration options (separate because would disrupt build process otherwise)
 */
(function(){

    'use strict';

    requirejs.config({
        urlArgs:'bust=v' + _env.version + 'b' + _env.build
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
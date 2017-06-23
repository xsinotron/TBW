(function (window) {
    'use strict';
    requirejs.config({
        baseUrl: 'js',
        paths: {
            app: '../app',
            bootstrap: 'vendor/bootstrap.min',
            jquery: [
                'https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min',
                'vendor/jquery-1.11.0.min'
            ]
        },
        shim: {
            'bootstrap': {
                deps: ['jquery']
            }
        }
    });

    // Start the main app logic.
    requirejs(['jquery', 'bootstrap', 'TBW'], function ($,b,tbw) {
        tbw.init(devdata);
    });

})();

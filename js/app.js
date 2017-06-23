(function (window) {
    'use strict';
    requirejs.config({
        //By default load any module IDs from js/lib
        baseUrl: 'js',
        /*
        // For "modules" that are just jQuery or Backbone plugins
        // that do not need to export any module value,
        // the shim config can just be an array of dependencies:
        shim: {
            'jquery.colorize': ['jquery'],
            'jquery.scroll': ['jquery'],
            'backbone.layoutmanager': ['backbone']
        },
        */
        //except, if the module ID starts with "app",
        //load it from the js/app directory. paths
        //config is relative to the baseUrl, and
        //never includes a ".js" extension since
        //the paths config could be for a directory.
        paths: {
            app: '../app'
        }
    });

    // Start the main app logic.
    requirejs(['jquery', 'main'],
    function   ($) {
    //jQuery, Main module are all
    //loaded and can be used here now.
    });

})();

(function (window) {
    'use strict';
    var $   = window.$,
        TBW = function () {

        /**
         *
         */
        function actionKeys (ev) {
            ev.preventDefault();
            var td = $(ev.currentTarget);
            console.log(ev.key, ev.keyCode);
            // haut
            if (ev.keyCode === 38) console.log("haut");
            // bas
            if (ev.keyCode === 40) console.log("bas");
            // gauche
            if (ev.keyCode === 37) console.log("gauche");
            // droite
            if (ev.keyCode === 39) console.log("droite");
        }
        /**
         *
         */
        function actionBtn (ev) {
            ev.preventDefault();
            var td = $(ev.currentTarget);
            if (td.find('.robot').length > 0) alert("un robot!");
            else console.log("personne ici");
        }
        /**
         *
         */
        function initBtn () {
            $(".grid tr td").off().on('click', actionBtn);
            $("html").off().on('keyup', actionKeys);
            
        }
        /**
         *
         */
        function init () {
            initBtn();
        }
        this.init = init;
    };
    var control = new TBW();
    control.init();
}(window));

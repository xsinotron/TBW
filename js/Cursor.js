(function (window) {
    'use strict';
    var $       = window.$,
        console = window.console,
        alert   = window.alert,
        Cursor     = function () {
            var CUR = this;
            function initCursor () {
                var cursor = $('.cursor');
                CUR.cursor = {
                    dom: cursor,
                    pos: {x: parseInt(cursor.attr("data-x"), 10), y: parseInt(cursor.attr("data-y"), 10)}
                };
                moveCursor();
            }
            function moveTo(x, y) {
                CUR.cursor.pos.x = x;
                CUR.cursor.pos.y = y;
                moveCursor();
            }
    };
    window.CUR = CUR;
})();

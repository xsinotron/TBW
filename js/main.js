(function (window) {
    'use strict';
    var $       = window.$,
        console = window.console,
        alert   = window.alert,
        TBW     = function () {
            var TBW = this;
            function initCursor () {
                var cursor = $('.cursor');
                TBW.cursor = {
                    dom: cursor,
                    pos: {x: parseInt(cursor.attr("data-x"), 10), y: parseInt(cursor.attr("data-y"), 10)}
                };
                moveCursor();
            }
            function moveTo(x, y) {
                TBW.cursor.pos.x = x;
                TBW.cursor.pos.y = y;
                moveCursor();
            }
            function freeMove () {
                console.log("freeMove");
                console.log("pos: ", TBW.cursor.pos.x, TBW.cursor.pos.y);
                var sautdeligne   = 0,
                    sautdecolonne = 0;
                if (TBW.cursor.pos.x >= TBW.grid.x) {
                    TBW.cursor.pos.x = TBW.cursor.pos.x - TBW.grid.x;
                    sautdeligne = 1;
                }
                if (TBW.cursor.pos.y >= TBW.grid.y) {
                    sautdecolonne = 1;
                    TBW.cursor.pos.y = TBW.cursor.pos.y - TBW.grid.y;
                }
                if (TBW.cursor.pos.x < 0) {
                    TBW.cursor.pos.x = TBW.grid.x - 1;
                    sautdeligne = -1;
                }
                if (TBW.cursor.pos.y < 0) {
                    sautdecolonne = -1;
                    TBW.cursor.pos.y = TBW.grid.y - 1;
                }
                TBW.cursor.pos.y += sautdeligne;
                TBW.cursor.pos.x += sautdecolonne;
                
                if (TBW.cursor.pos.x >= TBW.grid.x) {
                    TBW.cursor.pos.x = TBW.cursor.pos.x - TBW.grid.x;
                }
                if (TBW.cursor.pos.y >= TBW.grid.y) {
                    TBW.cursor.pos.y = TBW.cursor.pos.y - TBW.grid.y;
                }
                if (TBW.cursor.pos.x < 0) {
                    TBW.cursor.pos.x = TBW.grid.x - 1;
                }
                if (TBW.cursor.pos.y < 0) {
                    TBW.cursor.pos.y = TBW.grid.y - 1;
                }
            }
            function constrainedMove () {
                console.log("constrainedMove");
                if (TBW.cursor.pos.x >= TBW.grid.x) {
                    TBW.cursor.pos.x = TBW.grid.x - 1;
                }
                if (TBW.cursor.pos.y >= TBW.grid.y) {
                    TBW.cursor.pos.y = TBW.grid.y - 1;
                }
                if (TBW.cursor.pos.x < 0) {
                    TBW.cursor.pos.x = 0;
                }
                if (TBW.cursor.pos.y < 0) {
                    TBW.cursor.pos.y = 0;
                }
            }
            function moveCursor (to) {
                to = to || [0,0];
                console.log("moveCursor() /////////");
                console.log("to: ", to[0], to[1]);
                $('.cursor').removeClass("cursor");
                $('td').removeClass("mire");
                TBW.cursor.pos.x += to[0];
                TBW.cursor.pos.y += to[1];
                if (TBW.constrained) constrainedMove(); else freeMove();
                console.log("to: ", TBW.cursor.pos.x, TBW.cursor.pos.y);
                $("td[data-x="+TBW.cursor.pos.x+"][data-y="+TBW.cursor.pos.y+"]").addClass("cursor");
                $("td[data-x="+TBW.cursor.pos.x+"]").addClass("mire");
                $("td[data-y="+TBW.cursor.pos.y+"]").addClass("mire");
            }
            /**
             *
             */
            function actionKeys (ev) {
                //ev.preventDefault();
                //console.log(ev.key, ev.keyCode);
                // haut
                if (ev.keyCode === 38) {moveCursor([ 0,-1]);}
                // bas
                if (ev.keyCode === 40) {moveCursor([ 0, 1]);}
                // gauche
                if (ev.keyCode === 37) {moveCursor([-1, 0]);}
                // droite
                if (ev.keyCode === 39) {moveCursor([ 1, 0]);}
            }
            /**
             *
             */
            function actionBtn (ev) {
                ev.preventDefault();
                var td = $(ev.currentTarget),
                    x  = parseInt(td.attr("data-x"), 10),
                    y  = parseInt(td.attr("data-y"), 10);
                console.log(ev, x, y);
                if (td.hasClass('cursor')) {console.log("un cursor!");}
                else {
                    moveTo(x, y);
                }
            }
            /**
             *
             */
            function initBtn () {
                $(".grid tr td").off().on('mouseover', actionBtn);
                $("html").off().on('keydown', actionKeys);
                
            }
            /**
             *
             */
            function initGrid (grid) {
                console.log("initGrid");
                grid = grid || {x: 0, y: 0};
                if (grid.x === 0 || grid.y === 0) {return false;}
                TBW.grid = grid;
                console.log("grid: ", TBW.grid.x, TBW.grid.x);
                var main  = {
                        w: Math.floor($("body > .main").innerWidth()),
                        h: Math.floor($("body > .main").innerHeight())
                    },
                    wX    = Math.floor(main.w / grid.x),
                    wY    = Math.floor(main.h / grid.y),
                    useX  = wX < wY,
                    size  = ((useX) ? wX : wY ) + "px";
                console.log("initGrid", wX, wY, size);
                $(".grid tr").css("height", size);
                $(".grid td").css("width",  size);
                return true;
            }
            /**
             *
             */
            function init (params) {
                params = params || {};
                if (params.grid === undefined) {
                    alert('LIB TBW > ERROR : Need to define grid value {x:0,y:0}');
                }
                this.constrained = params.constrained || false;
                initGrid(params.grid);
                initCursor();
                initBtn();
                document.body.focus();
            }
            this.init = init;
        };
    window.TBW = TBW;
}(window));

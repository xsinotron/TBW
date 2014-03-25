(function (window) {
    'use strict';
    var $       = window.$,
        console = window.console,
        alert   = window.alert,
        TBW     = function () {
            var TBW = this;
            var robot = {
                dom: "<div>"
            };
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
            function moveBtn (ev) {
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
            function moveRobotTo (x, y) {
                console.log("moveRobotTo");
                if (TBW.selectedRobot) TBW.selectedRobot.remove();
                //TODO window.setInterval(300, function () {});
                $("td[data-x=" + x + "][data-y=" + y + "]").append("<robot class='strobe small' title='un robot!!' data-toggle='tooltip' data-placement='top' data-zone='3'></robot>");
                    TBW.selectedRobot = undefined;
                    $("td").removeClass("zone");
                initBtn();
            }
            /**
             *
             */
            function actionBtn (ev) {
                ev.preventDefault();
                var td = $(ev.currentTarget),
                    x  = parseInt(td.attr("data-x"), 10),
                    y  = parseInt(td.attr("data-y"), 10);
                console.log("actionBtn", x, y);
                if (TBW.selectedRobot) {
                    console.log("actionBtn isrobot");
                    if (td.hasClass("zone") && td.find('robot').length <= 0) {
                        console.log("actionBtn zone");
                        moveRobotTo(x, y);
                    } else {
                        TBW.selectedRobot = undefined;
                        $("td").removeClass("zone");
                    }
                } else if (td.find('robot').length > 0) {
                    menuRobot(td);
                }
            }
            /**
             *
             */
            function showZone (elt) {
                $("td").removeClass("zone");
                var zone = parseInt(elt.attr("data-zone"), 10),
                    x    = parseInt(elt.parent().attr("data-x"), 10),
                    y    = parseInt(elt.parent().attr("data-y"), 10);
                console.info("showZone: ", x, y);
                $("td[data-x="+x+"][data-y="+y+"]").addClass("zone");
                for (var i = 0; i <= zone; i++) {
                    for (var j = 0; j <= (zone - i); j++) {
                        $("td[data-x=" + (x + j) + "][data-y=" + (y + i) + "]").addClass("zone");
                        $("td[data-x=" + (x + j) + "][data-y=" + (y - i) + "]").addClass("zone");
                        $("td[data-x=" + (x - j) + "][data-y=" + (y + i) + "]").addClass("zone");
                        $("td[data-x=" + (x - j) + "][data-y=" + (y - i) + "]").addClass("zone");
                    }
                }
            }
            /**
             *
             */
            function menuRobot (td) {
                TBW.selectedRobot = $(td).find('robot');
                console.log("menuRobot", TBW.selectedRobot);
                $(TBW.selectedRobot).attr("data-hovered", true);
                showZone($(TBW.selectedRobot));
            }
            /**
             *
             */
            function initBtn () {
                $("html").off().on('keydown', actionKeys);
                $(".grid tr td").off().on('mouseover', moveBtn);
                $(".grid tr td").on('click', actionBtn);
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
                $("[data-toggle='tooltip']").tooltip();
                document.body.focus();
            }
            this.init = init;
        };
    window.TBW = TBW;
}(window));

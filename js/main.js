(function (window) {
    'use strict';
    var $       = window.$,
        console = window.console,
        alert   = window.alert,
        TBW     = function () {
            var TBW = this;
            function initRobot () {
                var robot = $('.robot');
                TBW.robot = {
                    dom: robot,
                    pos: {x: parseInt(robot.attr("data-x"), 10), y: parseInt(robot.attr("data-y"), 10)}
                };
            }
            function freeMove () {
                console.log("freeMove");
                console.log("pos: ", TBW.robot.pos.x, TBW.robot.pos.y);
                if (TBW.robot.pos.x >= TBW.grid.x) {
                    console.log("X trop loin");
                    TBW.robot.pos.x = TBW.robot.pos.x - TBW.grid.x - 1;
                    TBW.robot.pos.y++;
                }
                if (TBW.robot.pos.y >= TBW.grid.y) {
                    console.log("Y trop loin");
                    TBW.robot.pos.y = TBW.robot.pos.y - TBW.grid.y;
                    TBW.robot.pos.x++;
                }
                if (TBW.robot.pos.x < 0) {
                    console.log("X trop avant");
                    TBW.robot.pos.y--;
                    TBW.robot.pos.x = TBW.grid.x + TBW.robot.pos.x + ((TBW.robot.pos.y === 0) ? 1 : 1);
                }
                if (TBW.robot.pos.y < 0) {
                    console.log("Y trop avant");
                    TBW.robot.pos.y = TBW.grid.y + TBW.robot.pos.y;
                    TBW.robot.pos.x--;
                }
            }
            function constrainedMove () {
                console.log("constrainedMove");
                if (TBW.robot.pos.x >= TBW.grid.x) {
                    TBW.robot.pos.x = TBW.grid.x;
                }
                if (TBW.robot.pos.y >= TBW.grid.y) {
                    TBW.robot.pos.y = TBW.grid.y;
                }
                if (TBW.robot.pos.x < 0) {
                    TBW.robot.pos.x = 0;
                }
                if (TBW.robot.pos.y < 0) {
                    TBW.robot.pos.y = 0;
                }
            }
            function moveRobot (to) {
                console.log("moveRobot() /////////");
                console.log("to: ", to[0], to[1]);
                to = to || [0,0];
                $('td').removeClass("robot");
                TBW.robot.pos.x += to[0];
                TBW.robot.pos.y += to[1];
                if (TBW.constrained) constrainedMove(); else freeMove();
                console.log("to: ", TBW.robot.pos.x, TBW.robot.pos.y);
                $("td[data-x="+TBW.robot.pos.x+"][data-y="+TBW.robot.pos.y+"]").addClass("robot");
            }
            /**
             *
             */
            function actionKeys (ev) {
                ev.preventDefault();
                //console.log(ev.key, ev.keyCode);
                // haut
                if (ev.keyCode === 38) {moveRobot([ 0,-1]);}
                // bas
                if (ev.keyCode === 40) {moveRobot([ 0, 1]);}
                // gauche
                if (ev.keyCode === 37) {moveRobot([-1, 0]);}
                // droite
                if (ev.keyCode === 39) {moveRobot([ 1, 0]);}
            }
            /**
             *
             */
            function actionBtn (ev) {
                ev.preventDefault();
                var td = $(ev.currentTarget);
                if (td.hasClass('robot')) {alert("un robot!");}
                else {console.log("personne ici");}
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
                this.constrained = params.constrained || false;
                initGrid(params.grid);
                initRobot();
                initBtn();
            }
            this.init = init;
        };
    window.TBW = TBW;
}(window));

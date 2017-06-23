<?php
require_once 'app/vendor/autoload.php';
require_once 'app/autoload.php';
$_SESSION['core']  = new Main();
$_SESSION['debug'] = FALSE;
$grid   = array(16, 16);
$cursor = array(16,  8);
$troups = array(
    array( 2,  2)
);
?>
<!DOCTYPE html>
<html class="no-js">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>TBW</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="css/boilertemplate.css">
        <link rel="stylesheet" href="css/vendor/bootstrap.css">
        <link rel="stylesheet" href="css/vendor/bootstrap-theme.css">
        <link rel="stylesheet" href="css/main.css">
        <link rel="stylesheet" href="css/sprites.css">
    </head>
    <body>
        <div class="main">
            <div class="page-header">
                <h1>TURN BASE WAR</h1>
            </div>
            <div class="col-md-6">
            <?php
            echo $_SESSION['core']->getgrid($grid, $cursor, $troups);
            ?>
            </div>
            <div class="col-md-6">
            <?php
            echo $_SESSION['core']->geteditor();
            ?>
            </div>
            <section class="contextuel">
                <h2>informations</h2>
            </section>
        </div>
        <script>
        window.devdata = {
            grid: {
                x: <?=$grid[0] ?>,
                y: <?=$grid[1] ?>
            },
            cursor: {
                x: <?=$cursor[0] ?>,
                y: <?=$cursor[1] ?>
            },
            constrained: false
        };
        </script>
        <script data-main="js/app" src="js/vendor/require.js"></script>
    </body>
</html>

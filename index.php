<?php
require_once 'app/vendor/autoload.php';
require_once 'app/autoload.php';
$_SESSION['core']  = new Main();
$_SESSION['debug'] = FALSE;
$grid   = array(32, 16);
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
    </head>
    <body>
        <div class="main">
            <?php echo $_SESSION['core']->getgrid($grid, $cursor, $troups); ?>
            <section class="contextuel">
                <h2>informations</h2>
            </section>
        </div>
        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="js/vendor/jquery-1.11.0.min.js"><\/script>')</script>
        <script src="js/vendor/bootstrap.min.js"></script>
        <script src="js/main.js"></script>
        <script>
            var control = new TBW();
            control.init({
                grid: {
                    x: <?=$grid[0] ?>,
                    y: <?=$grid[1] ?>
                },
                cursor: {
                    x: <?=$cursor[0] ?>,
                    y: <?=$cursor[1] ?>
                },
                constrained: false
            });
        </script>
    </body>
</html>

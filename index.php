<?php
$grid = array(
    32,
    16
);
$cursor = array(
    16,
    8
);
$robot = array(
    2,
    2
);
function makeGrid ($gridsize=array(), $cursor=array(), $robot) {
    $x    = $gridsize[0];
    $y    = $gridsize[1];
    $grid = "<table class='grid'>\n";

    for ($i = 0; $i < $y; $i++) {
        $grid .= '<tr>';
        for ($j = 0; $j < $x; $j++) {
            $iscursor = $cursor[0] === $j && $cursor[1] === $i;
            $isrobot  = $robot[0] === $j && $robot[1] === $i;
            $land = "plain";
            $className = ($iscursor) ? "cursor" : "";
            $content   = ($isrobot)  ? "<robot class='strobe small' title='un robot!!'></robot>" : "";
            $grid .= "<td class='$land $className' data-x='$j' data-y='$i'>$content</td>";
        }
        $grid .= "</tr>\n";
    }

    $grid .= '</table>';
    echo $grid;
}
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
        <link rel="stylesheet" href="css/main.css">
    </head>
    <body>
        <div class="main"><?php makegrid($grid, $cursor, $robot); ?>
        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="js/vendor/jquery-1.11.0.min.js"><\/script>')</script>
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

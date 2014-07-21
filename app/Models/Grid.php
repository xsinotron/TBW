<?php
class Grid {
    protected $board;
    protected function makeBoard ($gridsize=array(), $cursor=array(), $troups) {
        $x    = $gridsize[0];
        $y    = $gridsize[1];
        $this->board = array();
        for ($i = 1; $i < $y; $i++) {
            // une ligne
            $line = array();
            for ($j = 1; $j < $x; $j++) {
                $col = array();
                $iscursor  = $cursor[0] === $j && $cursor[1] === $i;
                $istroups   = $troups[0]  === $j && $troups[1]  === $i;
                $istroups   = rand(0,100) > 90;
                $isSea     = $j >= $x * 3/$i && $i >= $y * 2/$j;
                $land      = ($isSea)    ? "sea"     : "plain";
                $className = ($iscursor) ? "cursor"  : "";
                $col = array(
                    "cls"     => $land . " " . $className,
                    "x"       => $j,
                    "y"       => $i
                );
                if ($istroups) $col["troup"] = TRUE;
                $line["zone"][] = $col;
            }
            $this->board["gridlines"][] = $line;
        }
    }
    /**
     *
     */
    public function get () {
        return $this->board;
    }
    /**
     *
     */
    public function set () {

    }
    /**
     *
     */
    public function __construct ($gridsize=array(), $cursor=array(), $troups) {
        $this->makeBoard($gridsize, $cursor, $troups);
    }
}
?>

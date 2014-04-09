<?php
    define('SOURCES_DIR', './app');
    /**
     * AUTOLOAD de l'appli.
     */
    function app_autoload($classname) {
        //echo "app_autoload >> $classname <br/>";
        $classname = explode("\\", $classname);
        $path = SOURCES_DIR . '/';
        for($i = 0, $j = count($classname) - 1; $i < $j; ++$i) $path .= $classname[$i].'/';
        $path .= array_pop($classname).'.php';
        // echo "app_autoload >> " . $path . ((file_exists($path)) ? " existe" : " non") . "<br/>";

        if(file_exists($path)) require_once $path;
    }
    /**
     * AUTOLOAD PAR DÉFAUT
     */
    function __autoload($classname) {
        $cls_dir = array(
            'Models',
            'Controllers',
            'Views',
            'vendor',
            'libs'
        );
        //echo "__autoload >> $classname <br/>";
        if ($classname == 'Mustache_Autoloader') {
            $path = SOURCES_DIR.'/vendor/Mustache/Autoloader.php';
            if(file_exists($path)) {
                //echo "__autoload >> " . $path . ((file_exists($path)) ? " existe" : " non") . "<br/>";
                require $path;
                return TRUE;
            }
        } else {
            foreach($cls_dir as $dir)
            {
                $path = SOURCES_DIR.'/'.$dir.'/'.$classname.'.php';
                // echo "__autoload >> " . $path . ((file_exists($path)) ? " existe" : " non") . "<br/>";
                if(file_exists($path)) {
                    require $path;
                    return;
                }
            }
        }
    }
    /**
     * Initialisations
     */
    spl_autoload_register('app_autoload');
    spl_autoload_register('__autoload');
?>
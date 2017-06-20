<?php
session_name('APP');
session_start();
class Main {
    private $data,
            $views = "app/Views/";
    /**
     *
     */
    private function makeNavigation() {
        $menu = array();
        $this->arbo = new Models\Arbo();
        foreach($this->arbo->get() as $name => $attr) {
            $nav = array();
            if ($this->page === $name) $nav["className"] = "active";
            $nav["href"]  = "?goto=$name";
            $nav["title"] = $attr["title"];
            $nav["value"] = $attr["value"];
            $menu[] = $nav;
        }
        return $menu;
    }
    /**
     *
     */
    public function getEditor () {
        $m = new Mustache_Engine;
        return $m->render(file_get_contents($this->views."editor.html"));
    }
    /**
     *
     */
    public function getGrid ($gridsize=array(), $cursor=array(), $troups) {
        $m = new Mustache_Engine;
        $board = new Grid($gridsize, $cursor, $troups);
        return $m->render(file_get_contents($this->views."grid.html"), $board->get());
    }
    /**
     *
     */
    public function makePage() {
        $loader   = new Twig_Loader_Filesystem($this->views);
        $twig     = new Twig_Environment($loader);
        $template = $twig->loadTemplate('index.tmpl');
        return $template->render(array("Title"=>"ACCUEIL"));
    }
    /**
     *
     */
    public function getPage($page) {
        $this->page = $page;
        $_SESSION['debug'] = (isset($_SESSION['debug'])) ? $_SESSION['debug'] : FALSE;
        $nav = array(
            'pageName' => 'APPLICATION',
            "$page"    => TRUE,
            "menu"     => $this->makeNavigation()
        );
        $navigation = $m->render(file_get_contents($this->views . "navigation.html"), $nav);
        $view = $this->views . "$page.html";
        if (file_exists($view)) {
            return $m->render(
                file_get_contents($view),
                array(
                    "document"   => "APPLICATION : $page",
                    'debug'      => $_SESSION['debug'],
                    'navigation' => $navigation
                )
            );
        } else {
            return $m->render(
                file_get_contents($this->views . "404.html"),
                array(
                    "document"   => "APPLICATION : $page",
                    'debug'      => $_SESSION['debug'],
                    'navigation' => $navigation
                )
            );
        }
    }
    /**
     *
     */
    public function __construct(){
        Mustache_Autoloader::register();
        $this->m = new Mustache_Engine;
    }
}
?>

<?php
/**
 * Arborescence du site
 */
namespace Models;
class Arbo {
    private
    $home    = array("title" => "Aller &agrave; la page d'accueil", "value" => "Accueil"),
    $about   = array("title" => "&Agrave; Propos de nous",          "value" => "&Agrave; Propos"),
    $contact = array("title" => "Prenons contact",                  "value" => "Contact");
    public function get() {
        return array(
            "home"    => $this->home,
            "about"   => $this->about,
            "contact" => $this->contact,
        
        );
    }
    public function __construct() {
    }
}

?>
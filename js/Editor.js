/**
 * Gestionnaire de l'édition des cartes
 */
(function (window) {
    'use strict';
    var $       = window.$,
        console = window.console,
        alert   = window.alert,
        Editor  = function () {
            var EDI = this;
        // TODO
        // Format de la donnée :
        /**
         * CARTES : Contient les données complète d'une bataille.
         *
         */
        map = {
            // Identifiant unique
            id:   "",
            // Dimensions de la carte en cases "largeurxhauteur"
            size: "16x16",
            // Nom de la carte
            name: "",
            // Conditions de victoire :
            victory: {
                all: ["destroyAll", "KillthemAll", "..."]
                 },
            // Règles spécifiques à la partie
            rules: [
                {unitID: "mclane", type: "mustSurvive"}
            ],
            // Description des différentes cases de la carte
            lands: [
                {
                    // Position sur la carte 
                    position: "A1",
                    type:     "forest",
                    building: ""
                },
                {
                    position: "A2",
                    type:     "plain",
                    building: "village"
                },
                //...
            ],
            factions: {
                // Nombre de factions en jeux
                nb: 0,
                // Contenus détaillé des factions.
                infos: [
                    // Liste des unités et des lieux de la faction
                    {
                        id: "",
                        name: "",
                        units: [
                            {
                                id:   "",
                                type: "",
                            }
                        ]
                    }
                ]
            }
        }
        // initialisation de l'interface :
        /*
        -> Actions sur boutons du menu
        var currentAction
        -> Raccourcis claviers
        */
        // carte par défaut : mer (evolution: génération aléatoire)
        // menu : choix des textures
        // menu scénario : constructions, unités, contraintes (tours max, unités devant survir, unité spéciale), génération de dialogues de début et de fin.
        // insertion dans une campagne.
    };
    window.EDI = EDI;
})();

import React, { Component } from "react";
import Navigation from "./Navigation";
import Sidebar from "./Sidebar";

export default class Home extends Component {
  constructor(props) {
    super(props);

    // Bind
    this.handle_updateRelation = this.handle_updateRelation.bind(this);
    this.handle_search = this.handle_search.bind(this);
    this.handle_limit = this.handle_limit.bind(this);
    this.handle_sort = this.handle_sort.bind(this);
    this.clear_search = this.clear_search.bind(this);

    // State
    this.state = {
      search: false,
      limits: "",
      sort_weight: false,
      outcoming_relations_save: [],
      incoming_relations_save: [],
      outcoming_relations: [],
      incoming_relations: [],
      definitions: [],
      relations: [
        {
          id: 0,
          name: "r_associated",
          title:
            "Il est demandé d'énumérer les termes les plus étroitement associés au mot cible... Ce mot vous fait penser à quoi ?",
          checked: true
        },
        {
          id: 1,
          name: "r_raff_sem",
          title:
            "Raffinement sémantique vers un usage particulier du terme source",
          checked: true
        },
        {
          id: 2,
          name: "r_raff_morpho",
          title:
            "Raffinement morphologique vers un usage particulier du terme source",
          checked: true
        },
        {
          id: 3,
          name: "r_domain",
          title:
            "Il est demandé de fournir des domaines relatifs au mot cible. Par exemple, pour 'corner', on pourra donner les domaines 'football' ou 'sport'.",
          checked: true
        },
        {
          id: 4,
          name: "r_pos",
          title: "Partie du discours (Nom, Verbe, Adjectif, Adverbe, etc.)",
          checked: true
        },
        {
          id: 5,
          name: "r_syn",
          title:
            "Il est demandé d'énumérer les synonymes ou quasi-synonymes de ce terme.",
          checked: true
        },
        {
          id: 6,
          name: "r_isa",
          title:
            "Il est demandé d'énumérer les GENERIQUES/hyperonymes du terme. Par exemple, 'animal' et 'mammifère' sont des génériques de 'chat'.",
          checked: true
        },
        {
          id: 7,
          name: "r_anto",
          title:
            "Il est demandé d'énumérer des contraires du terme. Par exemple, 'chaud' est le contraire de 'froid'.",
          checked: true
        },
        {
          id: 8,
          name: "r_hypo",
          title:
            "Il est demandé d'énumérer des SPECIFIQUES/hyponymes du terme. Par exemple, 'mouche', 'abeille', 'guêpe' pour 'insecte'.",
          checked: true
        },
        {
          id: 9,
          name: "r_has_part",
          title:
            "Il faut donner des PARTIES/constituants/éléments (a pour méronymes) du mot cible. Par exemple, 'voiture' a comme parties : 'porte', 'roue', 'moteur', ...",
          checked: true
        },
        {
          id: 10,
          name: "r_holo",
          title:
            "Il est démandé d'énumérer des 'TOUT' (a pour holonymes) de l'objet en question. Pour 'main', on aura 'bras', 'corps', 'personne', etc... Le tout est aussi l'ensemble comme 'classe' pour 'élève'.",
          checked: true
        },
        {
          id: 11,
          name: "r_locution",
          title:
            "A partir d'un terme, il est demandé d'énumérer les locutions, expression ou mots composés en rapport avec ce terme. Par exemple, pour 'moulin', ou pourra avoir 'moulin à vent', 'moulin à eau', 'moulin à café'. Pour 'vendre', on pourra avoir 'vendre la peau de l'ours avant de l'avoir tué', 'vendre à perte', etc..",
          checked: true
        },
        {
          id: 13,
          name: "r_agent",
          title:
            "L'agent (qu'on appelle aussi le sujet) est l'entité qui effectue l'action, OU la subit pour des formes passives ou des verbes d'état. Par exemple, dans - Le chat mange la souris -, l'agent est le chat. Des agents typiques de 'courir' peuvent être 'sportif', 'enfant',... (manger r_agent chat)",
          checked: true
        },
        {
          id: 14,
          name: "r_patient",
          title:
            "Le patient (qu'on appelle aussi l'objet) est l'entité qui subit l'action. Par exemple dans - Le chat mange la souris -, le patient est la souris. Des patients typiques de manger peuvent être 'viande', 'légume', 'pain', ... (manger r_patient pain)",
          checked: true
        },
        {
          id: 15,
          name: "r_lieu",
          title:
            "Il est demandé d'énumérer les LIEUX typiques où peut se trouver le terme/objet en question. (carotte r_lieu potager)",
          checked: true
        },
        {
          id: 16,
          name: "r_instr",
          title:
            "L'instrument est l'objet avec lequel on fait l'action. Dans - Il mange sa salade avec une fourchette -, fourchette est l'instrument. Des instruments typiques de 'tuer' peuvent être 'arme', 'pistolet', 'poison', ... (couper r_instr couteau)",
          checked: true
        },
        {
          id: 17,
          name: "r_carac",
          title:
            "Pour un terme donné, souvent un objet, il est demandé d'en énumérer les CARACtéristiques (adjectifs) possibles/typiques. Par exemple, 'liquide', 'froide', 'chaude', pour 'eau'.",
          checked: true
        },
        {
          id: 18,
          name: "r_data",
          title: "Informations diverses (plutôt d'ordre lexicales)",
          checked: true
        },
        {
          id: 19,
          name: "r_lemma",
          title:
            "Le lemme (par exemple 'mangent a pour lemme 'manger' ; 'avions' a pour lemme 'avion' ou 'avoir').",
          checked: true
        },
        {
          id: 20,
          name: "r_has_magn",
          title:
            "La magnification ou amplification, par exemple - forte fièvre - ou - fièvre de cheval - pour fièvre. Ou encore - amour fou - pour amour, - peur bleue - pour peur.",
          checked: true
        },
        {
          id: 21,
          name: "r_has_antimagn",
          title:
            "L'inverse de la magnification, par exemple - bruine - pour pluie.",
          checked: true
        },
        {
          id: 22,
          name: "r_family",
          title:
            "Des mots de la même famille lexicale sont demandés (dérivation morphologique, par exemple). Par exemple, pour 'lait' on pourrait mettre 'laitier', 'laitage', 'laiterie', etc.",
          checked: true
        },
        {
          id: 23,
          name: "r_carac-1",
          title:
            "Quels sont les objets (des noms) possédant typiquement/possiblement la caractérisque suivante ? Par exemple, 'soleil', 'feu', pour 'chaud'.",
          checked: true
        },
        {
          id: 24,
          name: "r_agent-1",
          title:
            "Que peut faire ce SUJET ? (par exemple chat => miauler, griffer, etc.) (chat r_agent-1 manger)",
          checked: true
        },
        {
          id: 25,
          name: "r_instr-1",
          title:
            "L'instrument est l'objet avec lequel on fait l'action. Dans - Il mange sa salade avec une fourchette -, fourchette est l'instrument. On demande ici, ce qu'on peut faire avec un instrument donné... (scie r_instr-1 scier)",
          checked: true
        },
        {
          id: 26,
          name: "r_patient-1",
          title:
            "(inverse de r_patient) Que peut-on faire à cet OBJET. Pour 'pomme', on pourrait avoir 'manger', 'croquer', couper', 'éplucher', etc. (pomme r_patient-1 manger)",
          checked: true
        },
        {
          id: 27,
          name: "r_domain-1",
          title: "inverse de r_domain : à un domaine, on associe des termes",
          checked: true
        },
        {
          id: 28,
          name: "r_lieu-1",
          title:
            "A partir d'un lieu, il est demandé d'énumérer ce qui peut typiquement s'y trouver. Par exemple : Paris r_lieu-1 tour Eiffel",
          checked: true
        },
        {
          id: 30,
          name: "r_lieu_action",
          title:
            "A partir d'un lieu, énumérer les actions typiques possibles dans ce lieu.",
          checked: true
        },
        {
          id: 31,
          name: "r_action_lieu",
          title:
            "A partir d'une action (un verbe), énumérer les lieux typiques possibles où peut être réalisée cette action.",
          checked: true
        },
        {
          id: 32,
          name: "r_sentiment",
          title:
            "Pour un terme donné, évoquer des mots liés à des SENTIMENTS ou des EMOTIONS que vous pourriez associer à ce terme. Par exemple, la joie, le plaisir, le dégoût, la peur, la haine, l'amour, l'indifférence, l'envie, avoir peur, horrible, etc.",
          checked: true
        },
        {
          id: 34,
          name: "r_manner",
          title:
            "De quelles MANIERES peut être effectuée l'action (le verbe) proposée. Il s'agira d'un adverbe ou d'un équivalent comme une locution adverbiale, par exemple : 'rapidement', 'sur le pouce', 'goulûment', 'salement' ... pour 'manger'.",
          checked: true
        },
        {
          id: 35,
          name: "r_meaning/glose",
          title:
            "Quels SENS/SIGNIFICATIONS pouvez vous donner au terme proposé. Il s'agira de termes (des gloses) évoquant chacun des sens possibles, par exemple : 'forces de l'ordre', 'contrat d'assurance', 'police typographique', ... pour 'police'.",
          checked: true
        },
        {
          id: 36,
          name: "r_infopot",
          title: "Information sémantique potentielle",
          checked: true
        },
        {
          id: 37,
          name: "r_telic_role",
          title:
            "Le rôle télique indique la fonction du nom ou du verbe. Par exemple, couper pour couteau, scier pour scie, etc. C'est le rôle qu'on lui destine communément pour un artéfact, ou bien un rôle qu'on peut attribuer à un objet naturel (réchauffer, éclairer pour soleil).",
          checked: true
        },
        {
          id: 38,
          name: "r_agentif_role",
          title:
            "De quelle(s) manière(s) peut être CRÉE/CONSTRUIT le terme suivant. On demande des verbes transitifs (le terme en est un complément d'objet) qui DONNENT NAISSANCE à l'entité désignée par le terme, par exemple, 'construire' pour 'maison', 'rédiger'/'imprimer' pour 'livre' ou 'lettre'.",
          checked: true
        },
        {
          id: 39,
          name: "r_verbe-action",
          title:
            "du verbe vers l'action. Par exemple, construire -> construction , jardiner -> jardinage . C'est un terme directement dérivé (ayant la même racine). Applicable que pour un verbe et inverse de la relation 40 (action vers verbe).",
          checked: true
        },
        {
          id: 40,
          name: "r_action-verbe",
          title:
            "de l'action vers le verbe. Par exemple, construction -> construire, jardinage -> jardiner. C'est un terme directement dérivé (ayant la même racine). Applicable que pour un nom et inverse de la relation 39 (verbe vers action).",
          checked: true
        },
        {
          id: 41,
          name: "r_conseq",
          title:
            "B (que vous devez donner) est une CONSEQUENCE possible de A. A et B sont des verbes ou des noms. Exemples : tomber -> se blesser ; faim -> voler ; allumer -> incendie ; négligence --> accident ; etc.",
          checked: true
        },
        {
          id: 42,
          name: "r_causatif",
          title:
            "B (que vous devez donner) est une CAUSE possible de A. A et B sont des verbes ou des noms. Exemples : se blesser -> tomber ; vol -> pauvreté ; incendie -> négligence ; mort --> maladie ; etc.",
          checked: true
        },
        {
          id: 43,
          name: "r_adj-verbe",
          title:
            "Pour un adjectif de potentialité/possibilité, son verbe correspondant. Par exemple pour 'lavable' -> 'laver'",
          checked: true
        },
        {
          id: 44,
          name: "r_verbe-adj",
          title:
            "Pour un verbe, son adjectif de potentialité/possibilité correspondant. Par exemple pour 'laver' -> 'lavable'",
          checked: true
        },
        {
          id: 49,
          name: "r_time",
          title:
            "Donner une valeur temporelle -quel moment- peut-on associer au terme indiqué (par exemple 'dormir' -> nuit, 'bronzer' -> été, 'fatigue' -> 'soir')",
          checked: true
        },
        {
          id: 50,
          name: "r_object>mater",
          title:
            "Quel est la ou les MATIERE/SUBSTANCE pouvant composer l'objet qui suit. Par exemple, 'bois' pour 'poutre'.",
          checked: true
        },
        {
          id: 51,
          name: "r_mater>object",
          title:
            "Quel est la ou les CHOSES qui sont composés de la MATIERE/SUBSTANCE qui suit (exemple 'bois' -> poutre, table, ...).",
          checked: true
        },
        {
          id: 52,
          name: "r_successeur-time",
          title:
            "Qu'est ce qui peut SUIVRE temporellement (par exemple Noêl -> jour de l'an, guerre -> paix, jour -> nuit, pluie -> beau temps, repas -> sieste, etc) le terme suivant :",
          checked: true
        },
        {
          id: 53,
          name: "r_make",
          title:
            "Que peut PRODUIRE le terme ? (par exemple abeille -> miel, usine -> voiture, agriculteur -> blé, moteur -> gaz carbonique ...)",
          checked: true
        },
        {
          id: 54,
          name: "r_product_of",
          title: "Le terme est le RESULTAT/PRODUIT de qui/quoi ?",
          checked: true
        },
        {
          id: 55,
          name: "r_against",
          title:
            "A quoi le terme suivant S'OPPOSE/COMBAT/EMPECHE ? Par exemple, un médicament s'oppose à la maladie.",
          checked: true
        },
        {
          id: 56,
          name: "r_against-1",
          title:
            "Inverse de r_against (s'oppose à) - a comme opposition active (S'OPPOSE/COMBAT/EMPECHE). Par exemple, une bactérie à comme opposition antibiotique.",
          checked: true
        },
        {
          id: 57,
          name: "r_implication",
          title:
            "Qu'est-ce que le terme implique logiquement ? Par exemple : ronfler implique dormir, courir implique se déplacer, câlin implique contact physique. (attention ce n'est pas la cause ni le but...)",
          checked: true
        },
        {
          id: 58,
          name: "r_quantificateur",
          title:
            "Quantificateur(s) typique(s) pour le terme, indiquant une quantité. Par exemples, sucre -> grain, morceau - sel -> grain, pincée - herbe -> brin, touffe - ...",
          checked: true
        },
        {
          id: 59,
          name: "r_masc",
          title: "L'équivalent masculin du terme : lionne --> lion.",
          checked: true
        },
        {
          id: 60,
          name: "r_fem",
          title: "L'équivalent féminin du terme : lion --> lionne.",
          checked: true
        },
        {
          id: 61,
          name: "r_equiv",
          title:
            "Termes strictement équivalent/identique : acronymes et sigles (PS -> parti socialiste), apocopes (ciné -> cinéma), entités nommées (Louis XIV -> Le roi soleil), etc. (attention il ne s'agit pas de synonyme)",
          checked: true
        },
        {
          id: 62,
          name: "r_manner-1",
          title:
            "Quelles ACTIONS (verbes) peut-on effectuer de cette manière ? Par exemple, rapidement -> courir, manger, ...",
          checked: true
        },
        {
          id: 63,
          name: "r_agentive_implication",
          title:
            "Les verbes ou actions qui sont impliqués dans la création de l'objet. Par exemple pour 'construire' un livre, il faut, imprimer, relier, brocher, etc. Il s'agit des étapes nécessaires à la réalisation du rôle agentif.",
          checked: true
        },
        {
          id: 64,
          name: "r_has_instance",
          title:
            "Une instance d'un 'type' est un individu particulier de ce type. Il s'agit d'une entité nommée (personne, lieu, organisation, etc) - par exemple, 'cheval' a pour instance possible 'Jolly Jumper', ou encore 'transatlantique' a pour instance possible 'Titanic'.",
          checked: true
        },
        {
          id: 65,
          name: "r_verb_real",
          title:
            "Pour un verbe, celui qui réalise l'action (par dérivation morphologique). Par exemple, chasser -> chasseur, naviguer -> navigateur.",
          checked: true
        },
        {
          id: 67,
          name: "r_similar",
          title:
            "Similaire/ressemble à ; par exemple le congre est similaire à une anguille, ...",
          checked: true
        },
        {
          id: 68,
          name: "r_set>item",
          title:
            "Quel est l'ELEMENT qui compose l'ENSEMBLE qui suit (par exemple, un essaim est composé d'abeilles)",
          checked: true
        },
        {
          id: 69,
          name: "r_item>set",
          title:
            "Quel est l'ENSEMBLE qui est composé de l'ELEMENT qui suit (par exemple, un essaim est composé d'abeilles)",
          checked: true
        },
        {
          id: 70,
          name: "r_processus>agent",
          title:
            "Quel est l'acteur de ce processus/événement ? Par exemple, 'nettoyage' peut avoir comme acteur 'technicien de surface'.",
          checked: true
        },
        {
          id: 71,
          name: "r_variante",
          title:
            "Variantes du termes cible. Par exemple, yaourt, yahourt, ou encore évènement, événement.",
          checked: true
        },
        {
          id: 72,
          name: "r_syn_strict",
          title:
            "Termes strictement substituables, pour des termes hors du domaine général, et pour la plupart des noms (exemple : endométriose intra-utérine --> adénomyose)",
          checked: true
        },
        {
          id: 73,
          name: "r_is_smaller_than",
          title:
            "Qu'est-ce qui est physiquement plus gros que... (la comparaison doit être pertinente)",
          checked: true
        },
        {
          id: 74,
          name: "r_is_bigger_than",
          title:
            "Qu'est-ce qui est physiquement moins gros que... (la comparaison doit être pertinente)",
          checked: true
        },
        {
          id: 75,
          name: "r_accomp",
          title:
            "Est souvent accompagné de, se trouve avec... Par exemple : Astérix et Obelix, le pain et le fromage, les fraises et la chantilly.",
          checked: true
        },
        {
          id: 76,
          name: "r_processus>patient",
          title:
            "Quel est le patient de ce processus/événement ? Par exemple, 'découpe' peut avoir comme patient 'viande'.",
          checked: true
        },
        {
          id: 77,
          name: "r_verb_ppas",
          title:
            "Le participe passé (au masculin singulier) du verbe infinitif. Par exemple, pour manger => mangé",
          checked: true
        },
        {
          id: 78,
          name: "r_cohypo",
          title:
            "Il est demandé d'énumérer les CO-HYPONYMES du terme. Par exemple, 'chat' et 'tigre' sont des co-hyponymes (de 'félin').",
          checked: true
        },
        {
          id: 79,
          name: "r_verb_ppre",
          title:
            "Le participe présent(au masculin singulier) du verbe infinitif. Par exemple, pour manger => mangeant",
          checked: true
        },
        {
          id: 80,
          name: "r_processus>instr",
          title:
            "Quel est l'instrument/moyen de ce processus/événement ? Par exemple, 'découpe' peut avoir comme instrument 'couteau'.",
          checked: true
        },
        {
          id: 99,
          name: "r_der_morpho",
          title:
            "Des termes dériviés morphologiquement sont demandés). Par exemple, pour 'lait' on pourrait mettre 'laitier', 'laitage', 'laiterie', etc. (mais pas 'lactose'). Pour 'jardin', on mettra 'jardinier', 'jardinage', 'jardiner', etc.",
          checked: true
        },
        {
          id: 100,
          name: "r_has_auteur",
          title: "Quel est l'auteur de l'oeuvre suivante ?",
          checked: true
        },
        {
          id: 101,
          name: "r_has_personnage",
          title: "Quels sont les personnages présents dans l'oeuvre qui suit ?",
          checked: true
        },
        {
          id: 102,
          name: "r_can_eat",
          title: "De quoi peut se nourir l'animal suivant ?",
          checked: true
        },
        {
          id: 103,
          name: "r_has_actors",
          title: "A comme acteurs (pour un film ou similaire).",
          checked: true
        },
        {
          id: 104,
          name: "r_deplac_mode",
          title: "Mode de déplacement. chat r_deplac_node marche",
          checked: true
        },
        {
          id: 105,
          name: "r_has_interpret",
          title: "Interprète de personnages (cinéma ou théâtre)",
          checked: true
        },
        {
          id: 106,
          name: "r_color",
          title: "A comme couleur(s)... chat r_color noir",
          checked: true
        },
        {
          id: 107,
          name: "r_cible",
          title:
            "Cible de la maladie : myxomatose => lapin, rougeole => enfant, ...",
          checked: true
        },
        {
          id: 108,
          name: "r_symptomes",
          title:
            "Symptomes de la maladie : myxomatose => yeux rouges, rougeole => boutons, ...",
          checked: true
        },
        {
          id: 109,
          name: "r_predecesseur-time",
          title:
            "Qu'est ce qui peut PRECEDER temporellement (par exemple - inverse de successeur) le terme suivant :",
          checked: true
        },
        {
          id: 110,
          name: "r_diagnostique",
          title:
            "Diagnostique pour la maladie : diabète => prise de sang, rougeole => examen clinique, ...",
          checked: true
        },
        {
          id: 111,
          name: "r_predecesseur-space",
          title:
            "Qu'est ce qui peut PRECEDER spatialement (par exemple - inverse de successeur spatial) le terme suivant :",
          checked: true
        },
        {
          id: 112,
          name: "r_successeur-space",
          title:
            "Qu'est ce qui peut SUIVRE spatialement (par exemple Locomotive à vapeur -> tender, wagon etc.) le terme suivant :",
          checked: true
        },
        {
          id: 113,
          name: "r_social_tie",
          title:
            "Relation sociale/familliale entre les individus... (annotation pour la nature exacte : frère, mari, etc.)",
          checked: true
        },
        {
          id: 114,
          name: "r_tributary",
          title: "Tributaire de (physique ou spatial).",
          checked: true
        },
        {
          id: 115,
          name: "r_sentiment-1",
          title:
            "Pour un SENTIMENT ou EMOTION donné, il est demandé d’énumérer les termes que vous pourriez associer. Par exemple, pour 'joie', on aurait 'cadeau', 'naissance', 'bonne nouvelle', etc.",
          checked: true
        },
        {
          id: 116,
          name: "r_linked-with",
          title:
            "A quoi est-ce relié (un wagon est relié à un autre wagon ou à une locomotive) ?",
          checked: true
        },
        {
          id: 117,
          name: "r_foncteur",
          title:
            "La fonction de ce terme par rapport à d'autres. Pour les prépositions notamment, 'chez' => relation r_location. (demande un type de relation comme valeur)",
          checked: true
        },
        {
          id: 119,
          name: "r_but",
          title: "But de l'action (nom ou verbe)",
          checked: true
        },
        {
          id: 120,
          name: "r_but-1",
          title:
            "Quel sont les actions ou verbes qui ont le terme cible comme but ?",
          checked: true
        },
        {
          id: 121,
          name: "r_own",
          title:
            "Que POSSEDE le terme suivant ? (un soldat possède un fusil, une cavalière des bottes, ... soldat r_own fusil, ...)",
          checked: true
        },
        {
          id: 122,
          name: "r_own-1",
          title:
            "Par qui ou quoi EST POSSEDE le terme suivant ? (par exemple, fusil r_own-1 soldat)",
          checked: true
        },
        {
          id: 123,
          name: "r_verb_aux",
          title: "Auxiliaire utilisé pour ce verbe",
          checked: true
        },
        {
          id: 124,
          name: "r_predecesseur-logic",
          title:
            "Qu'est ce qui peut PRECEDER logiquement (par exemple : A précède B - inverse de successeur logique) le terme suivant :",
          checked: true
        },
        {
          id: 125,
          name: "r_successeur-logic",
          title:
            "Qu'est ce qui peut SUIVRE logiquement (par exemple A -> B, C etc.) le terme suivant :",
          checked: true
        },
        {
          id: 126,
          name: "r_isa-incompatible",
          title:
            "Relation d'incompatibilité pour les génériques. Si A r_isa-incompatible B alors X ne peut pas être à la fois A et B ou alors X est polysémique. Par exemple, poisson r_isa-incompatible oiseau. Colin est à la fois un oiseau et un poisson, donc colin est polysémique.",
          checked: true
        },
        {
          id: 127,
          name: "r_incompatible",
          title:
            "Relation d'incompatibilité, ne doivent pas être présents ensemble. Par exemple, alcool r_incompatible antibiotique.",
          checked: true
        },
        {
          id: 128,
          name: "r_node2relnode",
          title:
            "Relation entre un noeud (quelconque) et un noeud de relation (type = 10) - permet de rendre le graphe connexe même avec les annotations de relations",
          checked: true
        },
        {
          id: 129,
          name: "r_require",
          title:
            "Il est demandé d'énumérer les termes nécessaires au mot mot cible... Par exemple, 'se reposer' => 'calme', ou 'pain' => 'farine'.",
          checked: true
        },
        {
          id: 130,
          name: "r_is_instance_of",
          title:
            "Une instance est un individu particulier. Il s'agit d'une entité nommée (personne, lieu, organisation, etc) - par exemple, 'Jolly Jumper' est une instance de 'cheval', 'Titanic' en est une de 'transatlantique'.",
          checked: true
        },
        {
          id: 131,
          name: "r_is_concerned_by",
          title:
            "A peut être concerné par B. Par exemple, une personne a un rendez-vous a une maladie, une idée, une opinion, etc...",
          checked: true
        },
        {
          id: 132,
          name: "r_symptomes-1",
          title:
            "Inverse de symptômes de la maladie : myxomatose => yeux rouges, rougeole => boutons, ...",
          checked: true
        },
        {
          id: 133,
          name: "r_units",
          title:
            "A comme unités pour une propriété, ou une mesure. Par exemple vitesse a pour unités m/s ou km/h, etc.",
          checked: true
        },
        {
          id: 134,
          name: "r_promote",
          title:
            "Qu'est-ce que le terme suivant FAVORISE ? Par exemple, un catalyseur favorise une réaction chimique.",
          checked: true
        },
        {
          id: 135,
          name: "r_circumstances",
          title: "Les circonstances possibles pour un événements, ou un objet",
          checked: true
        },
        {
          id: 149,
          name: "r_compl_agent",
          title:
            "Le complément d'agent est celui qui effectue l'action dans les formes passives. Par exemple, pour 'être mangé', la souris est l'agent et le chat le complément d'agent.",
          checked: true
        },
        {
          id: 150,
          name: "r_beneficiaire",
          title:
            "Le bénéficiaire est l'entité qui tire bénéfice/préjudice de l'action (un complément d'objet indirect introduit par 'à', 'pour', ...). Par exemple dans - La sorcière donne une pomme à Blanche Neige -, la bénéficiaire est Blanche Neige ... enfin, bref, vous avez compris l'idée.",
          checked: true
        },
        {
          id: 151,
          name: "r_descend_de",
          title: "Descend de (évolution)...",
          checked: true
        },
        {
          id: 152,
          name: "r_domain_subst",
          title:
            "Quels sont le ou les domaines de substitution pour ce terme quand il est utilisé comme domaine (par exemple, 'muscle' => 'anatomie du système musculaire')",
          checked: true
        },
        {
          id: 153,
          name: "r_prop",
          title:
            "Pour le terme donné, il faut indiquer les noms de propriétés pertinents (par exemple pour 'voiture', le 'prix', la 'puissance', la 'longueur', le 'poids', etc. On ne met que des noms et pas des adjectifs).",
          checked: true
        },
        {
          id: 154,
          name: "r_activ_voice",
          title:
            "Pour un verbe à la voix passive, sa voix active. Par exemple, pour 'être mangé' on aura 'manger'.",
          checked: true
        },
        {
          id: 155,
          name: "r_make_use_of",
          title:
            "Peut utiliser un objet ou produit (par exemple électricité pour frigo).",
          checked: true
        },
        {
          id: 156,
          name: "r_is_used_by",
          title: "Est utilisé par (par exemple essence pour voiture).",
          checked: true
        },
        {
          id: 157,
          name: "r_adj-nomprop",
          title:
            "Pour un adjectif, donner le nom de propriété correspondant. Par exemple, pour 'friable' -> 'friabilité'",
          checked: true
        },
        {
          id: 158,
          name: "r_nomprop-adj",
          title:
            "Pour un nom de propriété, donner l'adjectif correspondant. Par exemple, pour 'friabilité' -> 'friable'",
          checked: true
        },
        {
          id: 159,
          name: "r_adj-adv",
          title:
            "Pour un adjectif, donner l'adverbe correspondant. Par exemple, pour 'rapide' -> 'rapidement'",
          checked: true
        },
        {
          id: 160,
          name: "r_adv-adj",
          title:
            "Pour un adverbe, donner l'adjectif correspondant. Par exemple, pour 'rapidement' -> 'rapide'",
          checked: true
        },
        {
          id: 161,
          name: "r_homophone",
          title:
            "Il est demandé d'énumérer les homophones ou quasi-homophones de ce terme.",
          checked: true
        },
        {
          id: 162,
          name: "r_potential_confusion",
          title:
            "Confusion potentielle avec un autre terme (par exemple, acre et âcre, détonner et détoner).",
          checked: true
        },
        {
          id: 163,
          name: "r_concerning",
          title:
            "Qui concerne quelque chose ou quelqu'un. Par exemple: maladie r_concerning personne, ou disparition r_concerning emploi. (inverse de r_is_concerned_by)",
          checked: true
        },
        {
          id: 164,
          name: "r_adj>nom",
          title:
            "Le nom associé à l'adjectif. Par exemple, 'urinaire' -> 'urine'",
          checked: true
        },
        {
          id: 165,
          name: "r_nom>adj",
          title:
            "L'adjectif associé au nom. Par exemple, 'urine' -> 'urinaire'",
          checked: true
        },
        {
          id: 166,
          name: "r_opinion_of",
          title:
            "L'opinion de tel groupe ou telle personne. Utilisé comme relation d'annotation.",
          checked: true
        },
        {
          id: 200,
          name: "r_context",
          title: "Relation de contexte entre un terme et un noeud contexte.",
          checked: true
        },
        {
          id: 333,
          name: "r_translation",
          title: "Traduction vers une autre langue.",
          checked: true
        },
        {
          id: 444,
          name: "r_link",
          title:
            "Lien vers une ressource externe (WordNet, RadLex, UMLS, Wikipedia, etc...)",
          checked: true
        },
        {
          id: 555,
          name: "r_cooccurrence",
          title: "co-occurences (non utilisée)",
          checked: true
        },
        {
          id: 666,
          name: "r_aki",
          title: "(TOTAKI) equivalent pour TOTAKI de l'association libre",
          checked: true
        },
        {
          id: 777,
          name: "r_wiki",
          title: "Associations issues de wikipedia...",
          checked: true
        },
        {
          id: 997,
          name: "r_annotation_exception",
          title:
            "Relation pour indiquer qu'il s'agit d'une exception par rapport à la cible. L'autruche ne vole pas, et c'est une exception par rapport à l'oiseau prototypique.",
          checked: true
        },
        {
          id: 998,
          name: "r_annotation",
          title: "Relation pour annoter (de façon générale) des relations",
          checked: true
        },
        {
          id: 999,
          name: "r_inhib",
          title:
            "relation d'inhibition, le terme inhibe les termes suivants... ce terme a tendance à exclure le terme associé.",
          checked: true
        },
        {
          id: 2000,
          name: "r_raff_sem-1",
          title: "Inverse de r_raff_sem (automatique)",
          checked: true
        }
      ]
    };
  }

  handle_updateRelation(index, bool) {
    let {
      relations,
      outcoming_relations,
      incoming_relations,
      outcoming_relations_save,
      incoming_relations_save,
      limits
    } = this.state;
    relations[index].checked = bool;
    limits = parseInt(limits); // Parse int

    // Update relations
    if (outcoming_relations.length > 0) {
      if (bool) {
        outcoming_relations[index] = limits
          ? outcoming_relations_save[index].slice(0, limits)
          : outcoming_relations_save[index];
        incoming_relations[index] = limits
          ? incoming_relations_save[index].slice(0, limits)
          : incoming_relations_save[index];
      } else {
        outcoming_relations[index] = [];
        incoming_relations[index] = [];
      }
    }
    this.setState({ relations, incoming_relations, outcoming_relations });
  }

  handle_limit(value) {
    value = parseInt(value);
    this.setState({ limits: value });
    let {
      incoming_relations,
      outcoming_relations,
      incoming_relations_save,
      outcoming_relations_save
    } = this.state;
    if (incoming_relations.length > 0 && outcoming_relations.length > 0) {
      incoming_relations = this.copy(incoming_relations_save, value); // Reset
      // incoming_relations_save.forEach((el, i) => {
      //   if (this.state.relations[i].checked) {
      //     if (value < el.length) incoming_relations.push(el.slice(0, value));
      //     else incoming_relations.push(el);
      //   } else incoming_relations.push([]);
      // });

      outcoming_relations = this.copy(outcoming_relations_save, value);
      // outcoming_relations = []; // Reset
      // outcoming_relations_save.forEach((el, i) => {
      //   if (this.state.relations[i].checked) {
      //     if (value < el.length) outcoming_relations.push(el.slice(0, value));
      //     else outcoming_relations.push(el);
      //   } else outcoming_relations.push([]);
      // });

      this.setState({
        incoming_relations,
        outcoming_relations
      });
    }
  }

  copy(array_to_copy, limits) {
    let { relations } = this.state;
    let array = [];
    array_to_copy.forEach((el, i) => {
      if (relations[i].checked) {
        if (limits < el.length) array.push(el.slice(0, limits));
        else array.push(el);
      } else array.push([]);
    });

    return array;
  }

  sort(array, sort_weight) {
    array.forEach(el => {
      el.sort((a, b) => {
        // Sort
        if (!sort_weight) return a.split(";")[1].localeCompare(b.split(";")[1]);
        else return parseInt(b.split(";")[2]) - parseInt(a.split(";")[2]);
      });
    });
    return array;
  }

  handle_sort(value) {
    let {
      outcoming_relations,
      incoming_relations,
      incoming_relations_save,
      outcoming_relations_save,
      limits
    } = this.state;

    // Sort
    outcoming_relations_save = this.sort(outcoming_relations_save, value);
    incoming_relations_save = this.sort(incoming_relations_save, value);
    // Copy
    outcoming_relations = this.copy(outcoming_relations_save, parseInt(limits));
    incoming_relations = this.copy(incoming_relations_save, parseInt(limits));

    this.setState({
      sort_weight: value,
      outcoming_relations,
      outcoming_relations_save,
      incoming_relations,
      incoming_relations_save
    });
  }

  clear_search() {
    this.setState({
      outcoming_relations: [],
      outcoming_relations_save: [],
      incoming_relations: [],
      incoming_relations_save: [],
      definitions: []
    });
  }

  handle_search(res) {
    if (res.definitions) {
      this.setState({
        definitions: res.definitions
      });
    } else {
      let {
        outcoming_relations,
        incoming_relations,
        incoming_relations_save,
        outcoming_relations_save,
        limits,
        sort_weight
      } = this.state;
      outcoming_relations_save.push(res.outcoming_relations);
      incoming_relations_save.push(res.incoming_relations);

      // Sort
      outcoming_relations_save = this.sort(
        outcoming_relations_save,
        sort_weight
      );
      incoming_relations_save = this.sort(incoming_relations_save, sort_weight);
      // Copy
      outcoming_relations = this.copy(
        outcoming_relations_save,
        parseInt(limits)
      );
      incoming_relations = this.copy(incoming_relations_save, parseInt(limits));

      this.setState({
        outcoming_relations,
        incoming_relations,
        outcoming_relations_save,
        incoming_relations_save,
        search: true
      });
    }
  }

  render_relations(rel, index_relation) {
    let { relations } = this.state;
    return relations[index_relation].checked && rel.length > 0 ? (
      <li className="relation-content" key={index_relation}>
        <h4>Relation: {relations[index_relation].name.slice(2)}</h4>
        <ul className="relation-ul">
          {rel.map((el, i) => (
            <li key={i}>
              <a href={`/search/${el.split(";")[1]}`}>{el}</a>
            </li>
          ))}
        </ul>
      </li>
    ) : (
      false
    );
  }

  render() {
    let {
      search,
      definitions,
      outcoming_relations,
      incoming_relations
    } = this.state;
    return (
      <div>
        <Navigation
          relations={this.state.relations}
          limits={this.state.limits}
          handler={this.handle_search}
          clear={this.clear_search}
          params={this.props.match.params}
        />
        <div className="main">
          <Sidebar
            relations={this.state.relations}
            handle_limit={this.handle_limit}
            handle_sort={this.handle_sort}
            handle_updateRelation={this.handle_updateRelation}
          />
          <div className="main-container">
            {search ? (
              <div>
                <div className="card">
                  <h3>Définitions : </h3>
                  <ul className="definitions">
                    {definitions.length > 0 ? (
                      definitions.map((def, i) => <li key={i}>{def}</li>)
                    ) : (
                      <h4 className="not-found">Aucune définitions trouvées</h4>
                    )}
                  </ul>
                </div>
                <div>
                  <div className="card">
                    <h3>Relations sortantes</h3>
                    <ul>
                      {outcoming_relations.map((rel, i) => {
                        return this.render_relations(rel, i);
                      })}
                    </ul>
                  </div>
                  <div className="card">
                    <h3>Relations entrantes</h3>
                    <ul>
                      {incoming_relations.map((rel, i) => {
                        return this.render_relations(rel, i);
                      })}
                      {/* {incoming_relations.map(rel =>
                        rel.map((el, i) => (
                          <li key={i}>
                            <a href={`/search/${el.split(";")[1]}`}>{el}</a>
                          </li>
                        ))
                      )} */}
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <div className="waiting-request">
                <h3>Attente d'une requête.</h3>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

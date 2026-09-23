// Libellés d'interface (CONTRAT §17).
// Tout ce que l'UI affiche et qui n'est pas de la narration.
// Règle : on dit l'effet réel, jamais un chiffre de règle.

export const libelles = {
  stats: {
    vigueur: {
      nom: "Vigueur",
      gouverne: "Santé maximale, capacité de port, corps à corps.",
    },
    adresse: {
      nom: "Adresse",
      gouverne: "Tir à l'arc, discrétion, gestes précis.",
    },
    perception: {
      nom: "Perception",
      gouverne: "Qualité de l'observation, détection, pistage.",
    },
    sangfroid: {
      nom: "Sang-froid",
      gouverne: "Résistance à la pression, poids dans les interactions.",
    },
  },

  etats: {
    blesse_leger: {
      nom: "Blessé",
      effet: "La plaie tire à chaque geste : les actions de force et de précision réussissent moins souvent.",
    },
    blesse_grave: {
      nom: "Blessé grave",
      effet: "Tu perds de la santé au fil des heures. Te battre ou porter lourd peut te tuer.",
    },
    blesse_jambe: {
      nom: "Jambe touchée",
      effet: "Chaque déplacement prend un moment de plus, et courir n'est plus une option.",
    },
    epuise: {
      nom: "Épuisé",
      effet: "Tout coûte plus cher et tes gestes ratent plus souvent, tant que tu n'as pas dormi.",
    },
    affame: {
      nom: "Affamé",
      effet: "La faim entame ta santé et brouille ton attention. Il faut manger.",
    },
    assoiffe: {
      nom: "Assoiffé",
      effet: "La soif fait monter la fatigue beaucoup plus vite. Il faut boire.",
    },
  },

  usure: {
    neuf: "Neuf",
    bon: "Bon état",
    use: "Usé",
    abime: "Abîmé",
    ruine: "Hors d'usage",
  },

  categories: {
    arme: "Armes",
    protection: "Protections",
    consommable: "Consommables",
    ressource: "Ressources",
    divers: "Divers",
  },

  familles: {
    arc: "Arc",
    lame_legere: "Lame légère",
    lame_longue: "Lame longue",
    lourde: "Arme lourde",
    hast: "Arme d'hast",
  },

  segments: {
    1: "Matin",
    2: "Milieu de journée",
    3: "Après-midi",
    4: "Fin de journée",
    5: "Nuit",
    6: "Nuit profonde",
  },

  factions: {
    couronne: "La Couronne",
    terres_noires: "Les Terres Noires",
    ordre: "L'Ordre",
    marchands: "Les Marchands",
  },

  roles: {
    melee: "Combat rapproché",
    distance: "Combat à distance",
    soutien: "Soutien",
  },

  statuts_pnj: {
    inconnu: "Inconnu",
    disparu: "Disparu",
    vivant_allie: "Vivant, de ton côté",
    vivant_hostile: "Vivant, contre toi",
    blesse: "Blessé",
    mort: "Mort",
    cite: "Cité",
  },

  traces: {
    objet_gagne: "Trouvé",
    objet_perdu: "Perdu",
    usure: "Usure",
    sante: "Santé",
    fatigue: "Fatigue",
    faim: "Faim",
    etat_gagne: "État",
    etat_perdu: "État levé",
    xp: "Expérience",
    niveau: "Niveau",
    reputation: "Réputation",
    confiance: "Confiance",
    pnj_statut: "Statut",
    compagnon: "Compagnon",
    compagnon_perdu: "Compagnon perdu",
    sante_compagnon: "Santé du compagnon",
    savoir: "Savoir",
    flag: "Noté",
    flag_retire: "Levé",
    stat_partie: "Compte",
    segments: "Temps",
    lieu_bloque: "Passage fermé",
    point_decouvert: "Lieu découvert",
    competence_offerte: "Compétence à choisir",
    point_stat: "Point de caractéristique",
    fin: "Fin",
  },

  fins_generiques: {
    titre: "Fin de la partie",
    sous_titre: "Voilà où ça s'arrête.",
    mort: "Tu n'es pas revenu.",
    survie: "Tu es sorti de la vallée.",
    voir_bilan: "Voir le bilan",
    rejouer: "Nouvelle partie",
  },

  bilan: {
    savoir: "Ce que tu as appris",
    survivants: "Survivants",
    equipe: "Ton équipe",
    ennemis: "Ennemis vaincus",
    zones_explorees: "Zones explorées",
    zones_manquees: "Zones jamais atteintes",
    decisions: "Décisions",
    temps: "Temps écoulé",
    manque: "Ce que tu as manqué",
    badges: "Badges",
  },

  nav: {
    scene: "Scène",
    carte: "Carte",
    personnage: "Personnage",
    inventaire: "Inventaire",
    competences: "Compétences",
    compagnons: "Compagnons",
  },
};

// Textes système et garde-fous. Le moteur ne contient aucun texte : il vient d'ici.

export const systeme = {
  storylet_ouverture: 'VDG-001',

  // Filet de sécurité : une sortie est TOUJOURS disponible, même si un storylet
  // mal écrit n'en propose aucune.
  sortie_secours: {
    id: '_sortie',
    libelle: 'T’en aller',
    cout: { segments: 1 },
    sortie: true,
    issues: [{ texte: 'Tu tournes le dos et tu marches.', effets: [] }],
  },

  // Injectées par le moteur quand une scène descend sous trois options.
  // Elles coûtent toujours quelque chose : il n'y a pas d'action gratuite.
  options_repli: [
    {
      id: '_souffler',
      libelle: 'Reprendre ton souffle',
      cout: { segments: 1 },
      sortie: false,
      issues: [
        {
          probabilite: 100,
          texte: 'Tu t’accroupis sur les talons, les avant-bras sur les genoux, et tu comptes vingt respirations avant de te relever.',
          effets: [{ fatigue: -9 }, { faim: 3 }, { xp: 1 }],
        },
      ],
    },
    {
      id: '_verifier',
      libelle: 'Passer en revue ce que tu portes',
      cout: { segments: 1 },
      sortie: false,
      issues: [
        {
          probabilite: 100,
          texte: 'Tu défais les sangles, tu comptes, tu resserres. Deux fois par jour, c’est ce qui te sépare d’une mauvaise surprise.',
          effets: [{ xp: 2 }, { fatigue: 2 }],
        },
      ],
    },
  ],

  texte_montee: (montee) =>
    montee.competence
      ? `Niveau ${montee.niveau}. Un point de caractéristique, et une compétence à choisir.`
      : `Niveau ${montee.niveau}. Un point de caractéristique à placer.`,

  texte_repos: (segments, bilans) =>
    [`Tu t’arrêtes ${segments} segment${segments > 1 ? 's' : ''}.`, ...bilans.map((b) => b.texte)].join(' '),

  etiquettes_etats: {
    blesse_leger: 'blessé',
    blesse_jambe: 'jambe touchée',
    epuise: 'épuisé',
    affame: 'affamé',
  },

  etiquettes_usure: {
    intact: 'intact',
    marque: 'marqué',
    abime: 'abîmé',
    au_bord: 'au bord',
    hors_service: 'hors service',
  },

  etiquettes_statuts: {
    non_rencontre: 'inconnu',
    vivant_allie: 'de ton côté',
    vivant_hostile: 'te tient pour rien',
    mort: 'mort',
  },

  textes_fin: {
    mort: {
      titre: 'Ici s’arrête la chasse',
      texte: 'Tu t’assieds parce que tes jambes ne demandent plus ton avis, et tu ne te relèves pas.\n\nLe val est derrière. L’ouest restera de l’autre côté.',
    },
    passe_franchie: {
      titre: 'De l’autre côté',
      texte: 'Tu as passé la crête de la marche ouest. Ce qui commence après ne tient pas dans ces trois jours.',
    },
  },

  etiquettes_stats: {
    vigueur: 'Vigueur',
    adresse: 'Adresse',
    perception: 'Perception',
    sang_froid: 'Sang-froid',
  },
};

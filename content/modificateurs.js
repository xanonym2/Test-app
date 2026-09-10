// Table de préfixes / suffixes. Peu d'objets écrits, beaucoup d'objets perçus.

export const modificateurs = {
  prefixes: {
    rouille: { id: 'rouille', libelle: 'rouillé', rendement: 0.75, usure_max: 60 },
    ebreche: { id: 'ebreche', libelle: 'ébréché', rendement: 0.8, usure_max: 70 },
    grossier: { id: 'grossier', libelle: 'grossier', rendement: 0.85 },
    solide: { id: 'solide', libelle: 'solide', rendement: 1.15 },
    leger: { id: 'leger', libelle: 'léger', rendement: 1.0, poids_facteur: 0.7 },
    noirci: { id: 'noirci', libelle: 'noirci', rendement: 0.9 },
    fendu: { id: 'fendu', libelle: 'fendu', rendement: 0.6, usure_max: 45 },
  },
  suffixes: {
    du_braconnier: { id: 'du_braconnier', libelle: 'du braconnier', rendement: 1.1 },
    de_garnison: { id: 'de_garnison', libelle: 'de garnison', rendement: 1.05 },
    mal_repare: { id: 'mal_repare', libelle: 'mal réparé', rendement: 0.8 },
    de_bonne_facture: { id: 'de_bonne_facture', libelle: 'de bonne facture', rendement: 1.2 },
    use_jusqu_a_la_corde: { id: 'use_jusqu_a_la_corde', libelle: 'usé jusqu’à la corde', rendement: 0.65, usure_max: 35 },
    d_enfant: { id: 'd_enfant', libelle: 'd’enfant', rendement: 0.7, poids_facteur: 0.6 },
  },
};

// Sobre, lisible, sérieux. Pas de couleurs vives, pas d'icônes.
// Une seule couleur chaude, utilisée avec parcimonie, pour ce qui demande une
// décision.

export const C = {
  fond: '#14130f',
  fondEleve: '#1c1a15',
  fondCarte: '#211e18',
  bordure: '#332f26',
  bordureVive: '#4a4436',

  texte: '#ddd7c7',
  texteFort: '#f0ebdd',
  texteFaible: '#8f8877',
  texteTresFaible: '#615c50',

  accent: '#b9a06a',
  accentSourd: '#6e6042',

  sante: '#8a5c52',
  fatigue: '#5f6b74',
  faim: '#7a6b4a',
  alerte: '#a8654f',
};

export const T = {
  titre: { fontSize: 21, fontWeight: '600', color: C.texteFort, letterSpacing: 0.4 },
  soustitre: { fontSize: 13, color: C.texteFaible, letterSpacing: 1.6, textTransform: 'uppercase' },
  recit: { fontSize: 16.5, lineHeight: 27, color: C.texte },
  corps: { fontSize: 14.5, lineHeight: 21, color: C.texte },
  petit: { fontSize: 12.5, lineHeight: 18, color: C.texteFaible },
  minuscule: { fontSize: 11, color: C.texteTresFaible, letterSpacing: 0.5 },
  option: { fontSize: 15.5, lineHeight: 22, color: C.texteFort },
};

export const ESP = { xs: 4, s: 8, m: 14, l: 20, xl: 30 };

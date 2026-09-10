// Ton visuel : sobre, lisible, sérieux. Pas de couleurs vives, aucune illustration.

export const couleurs = {
  fond: '#121110',
  surface: '#1b1a18',
  surfaceHaute: '#232120',
  surfaceChoisie: '#2e2a24',
  bordure: '#332f2a',
  bordureVive: '#5a4f3f',
  texte: '#ddd6c8',
  texteDoux: '#a49b8b',
  texteFaible: '#7a7266',
  accent: '#b08d55',
  sang: '#8f4a3e',
  vert: '#5f7355',
  ocre: '#8a7343',
};

export const espaces = { xs: 4, s: 8, m: 12, l: 18, xl: 26 };

export const typo = {
  recit: {
    fontFamily: 'serif',
    fontSize: 16.5,
    lineHeight: 26,
    color: couleurs.texte,
  },
  recitSysteme: {
    fontFamily: 'serif',
    fontSize: 14,
    lineHeight: 21,
    color: couleurs.texteFaible,
    fontStyle: 'italic',
  },
  choixPasse: {
    fontSize: 13.5,
    lineHeight: 20,
    color: couleurs.accent,
  },
  titre: {
    fontSize: 15,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    color: couleurs.texteDoux,
    fontWeight: '600',
  },
  sousTitre: {
    fontSize: 11,
    letterSpacing: 1.1,
    textTransform: 'uppercase',
    color: couleurs.texteFaible,
    fontWeight: '600',
  },
  option: { fontSize: 15.5, lineHeight: 21, color: couleurs.texte },
  cout: { fontSize: 12, color: couleurs.texteFaible },
  valeur: { fontSize: 15, color: couleurs.texte, fontVariant: ['tabular-nums'] },
  petit: { fontSize: 12.5, color: couleurs.texteDoux },
};

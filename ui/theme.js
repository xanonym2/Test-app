// Ton visuel : sobre, lisible, sérieux. Pas de couleurs vives, pas d'icônes
// enfantines, aucun visuel de personnage, aucune illustration.
export const T = {
  fond: '#141311',
  fond2: '#1B1A17',
  panneau: '#201E1A',
  panneauHaut: '#26241F',
  bord: '#332F28',
  bordFort: '#433D33',
  texte: '#E6E1D7',
  texteDoux: '#B3ACA0',
  texteFaible: '#7E776B',
  accent: '#B08A52',
  accentDoux: '#8A6C3F',
  sante: '#8C5A4E',
  fatigue: '#5E6B76',
  faim: '#7E7048',
  danger: '#96483A',
  ok: '#5F7355',
  selection: '#2F2A22',
};

export const ESP = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24 };

export const TYPO = {
  titre: { fontSize: 20, fontWeight: '600', color: T.texte, letterSpacing: 0.3 },
  sousTitre: { fontSize: 13, fontWeight: '600', color: T.texteDoux, letterSpacing: 1.1, textTransform: 'uppercase' },
  corps: { fontSize: 16, lineHeight: 25, color: T.texte },
  narration: { fontSize: 16.5, lineHeight: 27, color: T.texte },
  libelle: { fontSize: 15, lineHeight: 21, color: T.texte, fontWeight: '500' },
  petit: { fontSize: 12.5, lineHeight: 18, color: T.texteDoux },
  minuscule: { fontSize: 11, lineHeight: 15, color: T.texteFaible, letterSpacing: 0.4 },
  nombre: { fontSize: 15, color: T.texte, fontVariant: ['tabular-nums'] },
};

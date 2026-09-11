// Le temps : six segments par jour, une météo qui dure, et le coût que le
// simple fait d'avancer fait peser sur le corps.

export const SEGMENTS = [
  { id: 1, cle: 'aube', nom: 'Aube' },
  { id: 2, cle: 'matin', nom: 'Matin' },
  { id: 3, cle: 'midi', nom: 'Midi' },
  { id: 4, cle: 'apres_midi', nom: 'Après-midi' },
  { id: 5, cle: 'soir', nom: 'Soir' },
  { id: 6, cle: 'nuit', nom: 'Nuit' },
];

export const METEOS = {
  degage: { nom: 'Ciel dégagé', poids: 30 },
  couvert: { nom: 'Couvert', poids: 25 },
  pluie: { nom: 'Pluie', poids: 15 },
  brume: { nom: 'Brume', poids: 12 },
  vent: { nom: 'Vent', poids: 10 },
  froid: { nom: 'Froid sec', poids: 8 },
};

export function nomSegment(id) {
  return (SEGMENTS.find((s) => s.id === id) || SEGMENTS[0]).nom;
}

export function cleSegment(id) {
  return (SEGMENTS.find((s) => s.id === id) || SEGMENTS[0]).cle;
}

export function nomMeteo(cle) {
  return (METEOS[cle] || METEOS.degage).nom;
}

function tirerMeteo(actuelle) {
  // La météo est visqueuse : elle a de bonnes chances de tenir d'un segment
  // à l'autre, ce qui évite le kaléidoscope et rend un changement signifiant.
  if (Math.random() < 0.55) return actuelle;
  const entrees = Object.entries(METEOS);
  const total = entrees.reduce((s, [, m]) => s + m.poids, 0);
  let tirage = Math.random() * total;
  for (const [cle, m] of entrees) {
    tirage -= m.poids;
    if (tirage <= 0) return cle;
  }
  return 'degage';
}

// Avance de N segments. Mute l'état passé (l'appelant travaille sur un clone).
export function avancer(etat, nbSegments) {
  const n = Math.max(0, Math.floor(nbSegments || 0));
  for (let i = 0; i < n; i += 1) {
    etat.temps.segment += 1;
    etat.temps.segments_ecoules += 1;
    if (etat.temps.segment > 6) {
      etat.temps.segment = 1;
      etat.temps.jour += 1;
      libererLieux(etat);
    }
    etat.temps.meteo = tirerMeteo(etat.temps.meteo);

    // Le corps paie chaque segment. La nuit coûte davantage si on ne dort pas.
    const nuit = etat.temps.segment === 6;
    etat.heros.fatigue = borne(etat.heros.fatigue + (nuit ? 8 : 5));
    etat.heros.faim = borne(etat.heros.faim + (nuit ? 5 : 3));
    if (etat.heros.etats.blesse_jambe) etat.heros.fatigue = borne(etat.heros.fatigue + 3);

    // Au-delà d'un certain point, la faim et l'épuisement ne colorent plus la
    // prose : ils entament. C'est là que les ressources rares deviennent une
    // difficulté réelle et pas un décor.
    let usure = 0;
    if (etat.heros.faim >= 95) usure += 2;
    else if (etat.heros.faim >= 85) usure += 1;
    if (etat.heros.fatigue >= 95) usure += 2;
    else if (etat.heros.fatigue >= 85) usure += 1;
    if (usure > 0) etat.heros.sante = Math.max(0, etat.heros.sante - usure);
  }
  return etat;
}

function libererLieux(etat) {
  for (const [id, jour] of Object.entries(etat.geo.lieux_bloques)) {
    if (etat.temps.jour >= jour) delete etat.geo.lieux_bloques[id];
  }
}

function borne(v) {
  return Math.max(0, Math.min(100, Math.round(v)));
}

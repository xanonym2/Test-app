// Créatures et menaces. Dégâts déterministes : ce qui varie, c'est ce qu'on ignore.

export const creatures = {
  orc_eclaireur: { id: 'orc_eclaireur', nom: 'éclaireur orc', sante: 14, degats: 7, vitesse: 'rapide', notes: 'seul, en avant du gros' },
  orc_guerrier: { id: 'orc_guerrier', nom: 'guerrier orc', sante: 22, degats: 11, vitesse: 'lent', notes: 'ne rompt jamais' },
  chien_errant: { id: 'chien_errant', nom: 'chien de ferme', sante: 6, degats: 3, vitesse: 'rapide' },
  meute_maigre: { id: 'meute_maigre', nom: 'chiens redevenus meute', sante: 12, degats: 5, vitesse: 'rapide', nombre: 3 },
  sanglier: { id: 'sanglier', nom: 'sanglier', sante: 16, degats: 9, vitesse: 'rapide' },
  homme_aux_abois: { id: 'homme_aux_abois', nom: 'homme aux abois', sante: 10, degats: 4, vitesse: 'moyen' },
  corbeaux: { id: 'corbeaux', nom: 'corbeaux', sante: 1, degats: 0, vitesse: 'rapide', notes: 'signal, pas menace' },
};

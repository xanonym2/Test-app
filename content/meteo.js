// Météo — table de tirage (CONTRAT §13).
// note : une phrase pour le bandeau d'état, ce que ça change pour un chasseur.

export const meteo = {
  table: [
    {
      id: "clair",
      nom: "Ciel clair",
      poids: 30,
      note: "On voit loin, et on est vu de loin aussi.",
    },
    {
      id: "couvert",
      nom: "Couvert",
      poids: 25,
      note: "Lumière plate, pas d'ombre : rien ne gêne, rien n'aide.",
    },
    {
      id: "pluie",
      nom: "Pluie",
      poids: 18,
      note: "La pluie couvre les bruits, mais elle efface les traces au fur et à mesure.",
    },
    {
      id: "brume",
      nom: "Brume",
      poids: 15,
      note: "On ne distingue rien à trente pas : on approche sans être vu, et on approche à l'aveugle.",
    },
    {
      id: "gel",
      nom: "Gel",
      poids: 12,
      note: "Le sol est dur et sonne sous le pied. Le froid mord dès qu'on s'arrête.",
    },
  ],
};

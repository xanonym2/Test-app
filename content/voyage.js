// Transitions de voyage (brief §10.6). Aller d'un point à l'autre prend du
// temps : une à deux phrases, jamais un paragraphe.
// Le détail est diagnostique : le vent, le sol, la lumière, un bruit qui
// s'arrête. Rien de décoratif.

export const voyage = {
  // Transitions génériques, tirées au hasard par le moteur quand aucune
  // transition dirigée ne correspond.
  generiques: [
    "Le sentier monte en pente douce sous les hêtres. Le vent vient de face : ce qui est devant ne t'a pas encore senti.",
    "Tu coupes par un vieux layon. Les ronces ont repris le milieu du passage, personne n'est venu par là depuis des semaines.",
    "Un geai crie deux fois plus loin, puis se tait. Tu attends que les bruits reprennent avant de repartir.",
    "La terre laisse place à la pierre et tes pas se mettent à sonner. Tu poses les talons plus doucement.",
    "Des traces de chevreuil coupent le chemin, nettes, de ce matin. Rien ne les a suivies.",
    "Tu longes la lisière au lieu du chemin ouvert. C'est plus long, mais on te voit moins venir.",
  ],

  // Transitions conditionnées, testées avant les génériques (première qui passe).
  conditionnelles: [
    {
      si: [["meteo", "pluie"]],
      texte: "La pluie tombe droit et colle la chemise au dos. Le chemin tourne en boue et le pied part à chaque dévers.",
    },
    {
      si: [["etat", "blesse_jambe"]],
      texte: "La jambe tient tant que tu marches au même rythme. Dès que ça monte, tu t'appuies sur ce qui passe à portée de main.",
    },
    {
      si: [["surcharge"]],
      texte: "Les sangles te scient les épaules. Tu poses la charge deux fois avant d'arriver, le temps de reprendre les bras.",
    },
    {
      si: [["nuit"]],
      texte: "La lumière est tombée. Tu marches au bruit et à la forme des arbres, en gardant le sentier sous le pied.",
    },
    {
      si: [["etat", "epuise"]],
      texte: "Les jambes suivent mal et tu regardes tes pieds au lieu de regarder devant. Ce n'est pas comme ça qu'on voit venir quelque chose.",
    },
    {
      si: [["compagnons>=", 1]],
      texte: "Vous marchez l'un derrière l'autre, à quelques pas d'écart. Personne ne parle : le bruit porte loin dans le vallon.",
    },
  ],

  // Transitions propres à une arrivée précise, une phrase.
  arrivees: {
    P01: "La dernière montée te coupe le souffle, puis la vallée s'ouvre d'un coup sous tes pieds.",
    P05: "On t'a vu venir bien avant que tu arrives : un sifflement court passe entre les arbres.",
  },
};

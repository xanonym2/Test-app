// Petit utilitaire de mise en forme : chaque argument est un paragraphe.
// Évite d'avoir à gérer l'indentation dans des chaînes multilignes.
export const p = (...paragraphes) => paragraphes.filter(Boolean).join('\n\n');

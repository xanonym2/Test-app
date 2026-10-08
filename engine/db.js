// Point d'injection du contenu. Le moteur ne connaît que des identifiants ;
// c'est /content qui fournit les données, appelées ici « db ».
let _db = null;

export function setDb(db) {
  _db = db;
}

export function getDb() {
  if (!_db) throw new Error('Contenu non chargé : appeler setDb() avant le moteur.');
  return _db;
}

export const concoursList = [
  {
    id: 'c1',
    titre: 'Médecin Généraliste',
    postes: 5,
    dateLimite: '2026-05-15',
    status: 'Ouvert',
    description: 'La Commune de Larache recrute 5 médecins généralistes pour les centres de santé communaux.',
  },
  {
    id: 'c2',
    titre: 'Infirmier Polyvalent',
    postes: 12,
    dateLimite: '2026-05-20',
    status: 'Ouvert',
    description: 'Recrutement de 12 infirmiers polyvalents pour renforcer les équipes d\'intervention.',
  },
  {
    id: 'c3',
    titre: 'Vétérinaire Inspecteur',
    postes: 2,
    dateLimite: '2026-04-10',
    status: 'Fermé',
    description: 'Poste pour l\'inspection des abattoirs communaux.',
  }
];

export const candidatures = [
  { id: 'app1', nom: 'Amrani', prenom: 'Karim', email: 'k.amrani@email.com', concours: 'Médecin Généraliste', status: 'En attente', dateDepot: '2026-04-18' },
  { id: 'app2', nom: 'Bennani', prenom: 'Sara', email: 's.bennani@email.com', concours: 'Infirmier Polyvalent', status: 'Validé', dateDepot: '2026-04-15' },
  { id: 'app3', nom: 'Chraibi', prenom: 'Youssef', email: 'y.chraibi@email.com', concours: 'Vétérinaire Inspecteur', status: 'Rejeté', dateDepot: '2026-04-05' },
  { id: 'app4', nom: 'Drissi', prenom: 'Mouna', email: 'm.drissi@email.com', concours: 'Médecin Généraliste', status: 'En attente', dateDepot: '2026-04-19' },
  { id: 'app5', nom: 'El Fassi', prenom: 'Omar', email: 'o.elfassi@email.com', concours: 'Infirmier Polyvalent', status: 'En cours', dateDepot: '2026-04-17' },
];

export const statsRH = {
  totalFonctionnaires: 452,
  candidaturesActives: 18,
  actesGeneres: 124,
  repartitionCorps: [
    { name: 'Administratif', value: 200 },
    { name: 'Médecins', value: 35 },
    { name: 'Infirmiers', value: 85 },
    { name: 'Technique', value: 120 },
    { name: 'Vétérinaires', value: 12 },
  ]
};

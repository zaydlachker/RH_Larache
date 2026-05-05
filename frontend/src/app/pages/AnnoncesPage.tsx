import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Calendar, Search, ChevronRight } from 'lucide-react';
import { useTranslation } from '../i18n';

export default function AnnoncesPage() {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('Tous');

  const INITIAL_ANNONCES = [
    { id: 1, title: t('annonce_1_title'), date: '2026-05-15', category: 'Concours', description: t('annonce_1_desc') },
    { id: 2, title: t('annonce_2_title'), date: '2026-05-10', category: 'Résultats', description: t('annonce_2_desc') },
    { id: 3, title: 'Avis de report d\'examen', date: '2026-05-05', category: 'Avis', description: 'L\'examen d\'aptitude professionnelle prévu le 10 mai est reporté à une date ultérieure.' },
    { id: 4, title: 'Résultats définitifs - Architecte', date: '2026-04-28', category: 'Résultats', description: 'Publication de la liste principale et la liste d\'attente pour le concours d\'architecte 1er grade.' },
    { id: 5, title: 'Concours de recrutement de techniciens', date: '2026-04-20', category: 'Concours', description: 'Ouverture des inscriptions pour le concours de techniciens de 3ème grade spécialité génie civil.' },
  ];

  const [annonces, setAnnonces] = useState(INITIAL_ANNONCES);

  React.useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('annonces') || '[]');
    if (stored.length > 0) {
      // Avoid duplicates by checking titles (simple way)
      const initialTitles = new Set(INITIAL_ANNONCES.map(a => a.title));
      const filteredStored = stored.filter((a: any) => !initialTitles.has(a.title)).map((a: any) => ({
        ...a,
        category: a.category || 'Avis'
      }));
      setAnnonces([...filteredStored, ...INITIAL_ANNONCES]);
    }
  }, []);

  const categories = ['Tous', 'Concours', 'Résultats', 'Avis'];

  const filteredAnnonces = annonces.filter(annonce => {
    const matchesFilter = filter === 'Tous' || annonce.category === filter;
    const matchesSearch = annonce.title.toLowerCase().includes(search.toLowerCase()) || 
                          annonce.description.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getCategoryBadgeColor = (category: string) => {
    switch(category) {
      case 'Concours': return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800';
      case 'Résultats': return 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800';
      case 'Avis': return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800';
      default: return 'bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-900/30 dark:text-slate-400 dark:border-slate-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">{t('annonces_title')}</h1>
        <div className="h-1.5 w-20 bg-blue-600 mx-auto rounded-full mb-6"></div>
      </div>

      <div className="mb-8 flex flex-col md:flex-row gap-4 justify-between items-center bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
        <div className="relative w-full md:w-96 flex-shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <input
            type="text"
            placeholder="Rechercher une annonce..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-shadow outline-none"
          />
        </div>
        
        <div className="flex flex-wrap justify-center gap-2 w-full md:w-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                filter === cat 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {filteredAnnonces.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAnnonces.map(annonce => (
            <Card key={annonce.id} className="flex flex-col h-full border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white dark:bg-slate-900 group">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start mb-3">
                  <Badge variant="outline" className={getCategoryBadgeColor(annonce.category)}>
                    {annonce.category}
                  </Badge>
                  <div className="text-sm text-slate-500 flex items-center bg-slate-50 dark:bg-slate-800 px-2.5 py-1 rounded-md">
                    <Calendar className="h-3.5 w-3.5 mr-1.5" />
                    {annonce.date}
                  </div>
                </div>
                <CardTitle className="text-xl text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                  {annonce.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                  {annonce.description}
                </p>
              </CardContent>
              <CardFooter className="pt-4 border-t border-slate-50 dark:border-slate-800/50">
                <Button variant="ghost" className="w-full justify-between hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-slate-600 dark:text-slate-300">
                  Voir détails
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
          <Search className="h-12 w-12 mx-auto text-slate-300 dark:text-slate-600 mb-4" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Aucune annonce trouvée</h3>
          <p className="text-slate-500">Essayez de modifier vos critères de recherche ou vos filtres.</p>
          <Button variant="outline" className="mt-6" onClick={() => {setSearch(''); setFilter('Tous');}}>
            Réinitialiser les filtres
          </Button>
        </div>
      )}
    </div>
  );
}

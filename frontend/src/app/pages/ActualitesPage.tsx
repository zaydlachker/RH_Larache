import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Calendar, Search, ChevronRight, ArrowRight } from 'lucide-react';
import { useTranslation } from '../i18n';

export default function ActualitesPage() {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('Tous');

  const actualites = [
    { 
      id: 1, 
      title: t('actu_1_title') || 'Inauguration du nouveau centre', 
      date: '2026-04-25', 
      category: 'Projets',
      description: t('actu_1_desc') || 'Le président de la commune a inauguré le nouveau centre administratif.', 
      image: 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?q=80&w=800&auto=format&fit=crop' 
    },
    { 
      id: 2, 
      title: t('actu_2_title') || 'Lancement du portail e-RH', 
      date: '2026-04-20', 
      category: 'RH',
      description: t('actu_2_desc') || 'Lancement officiel du nouveau portail des ressources humaines pour les fonctionnaires.', 
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop' 
    },
    { 
      id: 3, 
      title: 'Nouvelle couverture médicale pour les fonctionnaires', 
      date: '2026-04-15', 
      category: 'Santé',
      description: 'Signature d\'une convention de partenariat pour étendre la couverture médicale complémentaire à l\'ensemble du personnel.', 
      image: 'https://images.unsplash.com/photo-1504439468489-c8920d786a2b?q=80&w=800&auto=format&fit=crop' 
    },
    { 
      id: 4, 
      title: 'Digitalisation des dossiers administratifs', 
      date: '2026-04-10', 
      category: 'RH',
      description: 'La commune accélère son programme zéro papier avec la numérisation complète de plus de 5000 dossiers du personnel.', 
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop' 
    },
    { 
      id: 5, 
      title: 'Campagne de vaccination de prévention', 
      date: '2026-04-02', 
      category: 'Santé',
      description: 'Organisation d\'une campagne de vaccination grippale gratuite au profit des fonctionnaires du département technique.', 
      image: 'https://images.unsplash.com/photo-1584362917165-526a968579e8?q=80&w=800&auto=format&fit=crop' 
    },
  ];

  const categories = ['Tous', 'RH', 'Santé', 'Projets'];

  const filteredActualites = actualites.filter(actu => {
    const matchesFilter = filter === 'Tous' || actu.category === filter;
    const matchesSearch = actu.title.toLowerCase().includes(search.toLowerCase()) || 
                          actu.description.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const featured = filteredActualites.length > 0 ? filteredActualites[0] : null;
  const regularNews = filteredActualites.length > 1 ? filteredActualites.slice(1) : [];

  const getCategoryBadgeColor = (category: string) => {
    switch(category) {
      case 'RH': return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/40 dark:text-blue-300';
      case 'Santé': return 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-300';
      case 'Projets': return 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/40 dark:text-purple-300';
      default: return 'bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-800 dark:text-slate-300';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">{t('actualites_title') || 'Actualités'}</h1>
        <div className="h-1.5 w-20 bg-blue-600 mx-auto rounded-full mb-6"></div>
      </div>

      {/* Search and Filters */}
      <div className="mb-10 flex flex-col md:flex-row gap-4 justify-between items-center bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
        <div className="relative w-full md:w-96 flex-shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <input
            type="text"
            placeholder="Rechercher une actualité..."
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

      {featured ? (
        <>
          {/* Featured News */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
              <span className="w-2 h-6 bg-blue-600 rounded-full mr-3"></span>
              À la une
            </h2>
            <Card className="border-none shadow-lg overflow-hidden bg-white dark:bg-slate-900 group">
              <div className="flex flex-col lg:flex-row">
                <div className="lg:w-1/2 h-64 lg:h-auto relative overflow-hidden">
                  <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800 animate-pulse"></div>
                  <img 
                    src={featured.image} 
                    alt={featured.title} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className={`${getCategoryBadgeColor(featured.category)} shadow-sm font-semibold px-3 py-1 text-sm border-none`}>
                      {featured.category}
                    </Badge>
                  </div>
                </div>
                <div className="lg:w-1/2 p-8 lg:p-10 flex flex-col justify-center">
                  <div className="text-sm text-slate-500 dark:text-slate-400 mb-4 flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    {featured.date}
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mb-4 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {featured.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-lg mb-8 line-clamp-3">
                    {featured.description}
                  </p>
                  <div>
                    <Button className="bg-slate-900 hover:bg-blue-600 text-white dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-blue-500 rounded-xl px-6 py-6 text-md font-medium transition-all shadow-md">
                      Lire l'article complet
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Regular News List */}
          {regularNews.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
                <span className="w-2 h-6 bg-slate-300 dark:bg-slate-700 rounded-full mr-3"></span>
                Récentes actualités
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularNews.map(actu => (
                  <Card key={actu.id} className="flex flex-col h-full border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 bg-white dark:bg-slate-900 overflow-hidden group">
                    <div className="h-48 w-full relative overflow-hidden">
                      <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800 animate-pulse"></div>
                      <img 
                        src={actu.image} 
                        alt={actu.title} 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                      />
                      <div className="absolute top-3 left-3">
                        <Badge className={`${getCategoryBadgeColor(actu.category)} backdrop-blur-md bg-white/90 dark:bg-slate-900/90 border-none font-medium text-xs`}>
                          {actu.category}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader className="pt-5 pb-3">
                      <div className="text-sm text-slate-500 dark:text-slate-400 mb-3 flex items-center">
                        <Calendar className="h-4 w-4 mr-1.5" />
                        {actu.date}
                      </div>
                      <CardTitle className="text-xl text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
                        {actu.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <p className="text-slate-600 dark:text-slate-400 line-clamp-3">
                        {actu.description}
                      </p>
                    </CardContent>
                    <CardFooter className="pt-2 pb-5">
                      <Button variant="ghost" className="p-0 h-auto font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-transparent group-hover:translate-x-1 transition-transform">
                        Lire plus
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-24 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
          <Search className="h-12 w-12 mx-auto text-slate-300 dark:text-slate-600 mb-4" />
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Aucune actualité trouvée</h3>
          <p className="text-slate-500 max-w-md mx-auto">Nous n'avons trouvé aucune actualité correspondant à votre recherche. Essayez de modifier vos filtres.</p>
          <Button variant="outline" className="mt-6 rounded-xl" onClick={() => {setSearch(''); setFilter('Tous');}}>
            Réinitialiser la recherche
          </Button>
        </div>
      )}
    </div>
  );
}

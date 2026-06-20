import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Calendar, ArrowLeft, Share2, Printer, Tag } from 'lucide-react';
import { useTranslation } from '../i18n';

export default function ActualiteDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [actu, setActu] = useState<any>(null);

  const INITIAL_ACTUALITES = [
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

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('actualites') || '[]');
    const initialTitles = new Set(INITIAL_ACTUALITES.map(a => a.title));
    const filteredStored = stored.filter((a: any) => !initialTitles.has(a.title)).map((a: any) => ({
      ...a,
      description: a.content || a.description,
      category: a.category || 'RH',
      image: a.image || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop'
    }));
    const allActus = [...filteredStored, ...INITIAL_ACTUALITES];
    
    const found = allActus.find(a => a.id.toString() === id);
    
    if (found) {
      setActu(found);
    }
  }, [id, t]);

  if (!actu) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-slate-500">Chargement de l'article...</p>
        <Button variant="ghost" onClick={() => navigate(-1)} className="mt-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Retour
        </Button>
      </div>
    );
  }

  const getCategoryBadgeColor = (category: string) => {
    switch(category) {
      case 'RH': return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/40 dark:text-blue-300';
      case 'Santé': return 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-300';
      case 'Projets': return 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/40 dark:text-purple-300';
      default: return 'bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-800 dark:text-slate-300';
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <Button 
        variant="ghost" 
        onClick={() => navigate(-1)} 
        className="mb-8 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Retour aux actualités
      </Button>

      <article className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 overflow-hidden">
        {actu.image && (
          <div className="w-full h-[400px] md:h-[500px] relative overflow-hidden">
            <img 
              src={actu.image} 
              alt={actu.title} 
              className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105" 
            />
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-slate-900 to-transparent"></div>
          </div>
        )}
        
        <div className="p-8 md:p-16 -mt-10 relative z-10">
          <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
            <Badge variant="outline" className={`${getCategoryBadgeColor(actu.category)} px-4 py-1.5 text-xs font-bold rounded-full uppercase tracking-wider border-none shadow-sm`}>
              <Tag className="h-3 w-3 mr-2 inline-block" />
              {actu.category}
            </Badge>
            <div className="flex items-center text-slate-500 bg-slate-50 dark:bg-slate-800 px-4 py-2 rounded-xl text-sm font-semibold">
              <Calendar className="h-4 w-4 mr-2.5 text-blue-500" />
              Publié le {actu.date}
            </div>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white mb-10 leading-[1.05] tracking-tight">
            {actu.title}
          </h1>

          <div className="h-1.5 w-24 bg-blue-600 rounded-full mb-12"></div>

          <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">
            <div className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-wrap font-medium">
              {actu.description}
            </div>
          </div>

          <div className="mt-16 pt-10 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-4 justify-between items-center">
            <div className="flex flex-wrap gap-4">
              <Button variant="outline" className="rounded-2xl h-12 px-6 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800">
                <Share2 className="mr-2.5 h-5 w-5" /> Partager
              </Button>
              <Button variant="outline" className="rounded-2xl h-12 px-6 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800" onClick={() => window.print()}>
                <Printer className="mr-2.5 h-5 w-5" /> Imprimer
              </Button>
            </div>
            
            <div className="text-slate-400 text-sm font-medium italic">
              Commune de Larache • Portail e-RH
            </div>
          </div>
        </div>
      </article>
      
      {/* Related Suggestion */}
      <div className="mt-12 p-8 bg-blue-50 dark:bg-blue-900/10 rounded-[2rem] border border-blue-100 dark:border-blue-800/30 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h4 className="text-blue-900 dark:text-blue-300 font-bold text-lg mb-1">Besoin de plus d'informations ?</h4>
          <p className="text-blue-700/70 dark:text-blue-400/70 text-sm">Consultez nos annonces officielles pour les derniers avis et résultats.</p>
        </div>
        <Button 
          onClick={() => navigate('/annonces')}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-8 h-12 font-bold shadow-lg shadow-blue-600/20"
        >
          Voir les annonces
        </Button>
      </div>
    </div>
  );
}

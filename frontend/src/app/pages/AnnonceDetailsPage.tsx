import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Calendar, ArrowLeft, Share2, Printer } from 'lucide-react';
import { useTranslation } from '../i18n';

export default function AnnonceDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [annonce, setAnnonce] = useState<any>(null);

  const INITIAL_ANNONCES = [
    { id: 1, title: t('annonce_1_title'), date: '2026-05-15', category: 'Concours', description: t('annonce_1_desc') },
    { id: 2, title: t('annonce_2_title'), date: '2026-05-10', category: 'Résultats', description: t('annonce_2_desc') },
    { id: 3, title: 'Avis de report d\'examen', date: '2026-05-05', category: 'Avis', description: 'L\'examen d\'aptitude professionnelle prévu le 10 mai est reporté à une date ultérieure.' },
    { id: 4, title: 'Résultats définitifs - Architecte', date: '2026-04-28', category: 'Résultats', description: 'Publication de la liste principale et la liste d\'attente pour le concours d\'architecte 1er grade.' },
    { id: 5, title: 'Concours de recrutement de techniciens', date: '2026-04-20', category: 'Concours', description: 'Ouverture des inscriptions pour le concours de techniciens de 3ème grade spécialité génie civil.' },
  ];

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('annonces') || '[]');
    // Combine INITIAL_ANNONCES with stored ones like in AnnoncesPage.tsx
    const initialTitles = new Set(INITIAL_ANNONCES.map(a => a.title));
    const filteredStored = stored.filter((a: any) => !initialTitles.has(a.title)).map((a: any) => ({
      ...a,
      category: a.category || 'Avis'
    }));
    const allAnnonces = [...filteredStored, ...INITIAL_ANNONCES];
    
    const found = allAnnonces.find(a => a.id.toString() === id);
    
    if (found) {
      setAnnonce(found);
    }
  }, [id, t]);

  if (!annonce) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-slate-500">Chargement de l'annonce...</p>
        <Button variant="ghost" onClick={() => navigate(-1)} className="mt-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Retour
        </Button>
      </div>
    );
  }

  const getCategoryBadgeColor = (category: string) => {
    switch(category) {
      case 'Concours': return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800';
      case 'Résultats': return 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800';
      case 'Avis': return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800';
      default: return 'bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-900/30 dark:text-slate-400 dark:border-slate-800';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <Button 
        variant="ghost" 
        onClick={() => navigate(-1)} 
        className="mb-8 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Retour aux annonces
      </Button>

      <article className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 overflow-hidden">
        {annonce.image && (
          <div className="w-full h-64 md:h-96 overflow-hidden">
            <img src={annonce.image} alt={annonce.title} className="w-full h-full object-cover" />
          </div>
        )}
        
        <div className="p-8 md:p-14">
          <div className="flex flex-wrap justify-between items-center gap-4 mb-10">
            <Badge variant="outline" className={`${getCategoryBadgeColor(annonce.category || 'Avis')} px-4 py-1.5 text-xs font-bold rounded-full uppercase tracking-wider`}>
              {annonce.category || 'Avis'}
            </Badge>
            <div className="flex items-center text-slate-500 bg-slate-50 dark:bg-slate-800 px-4 py-2 rounded-xl text-sm font-semibold">
              <Calendar className="h-4 w-4 mr-2.5 text-blue-500" />
              {annonce.date}
            </div>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-10 leading-[1.1] tracking-tight">
            {annonce.title}
          </h1>

          <div className="h-1.5 w-20 bg-blue-600 rounded-full mb-12"></div>

          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-wrap font-medium">
              {annonce.description}
            </p>
          </div>

          <div className="mt-16 pt-10 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-4">
            <Button variant="outline" className="rounded-2xl h-12 px-6 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800">
              <Share2 className="mr-2.5 h-5 w-5" /> Partager
            </Button>
            <Button variant="outline" className="rounded-2xl h-12 px-6 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800" onClick={() => window.print()}>
              <Printer className="mr-2.5 h-5 w-5" /> Imprimer
            </Button>
          </div>
        </div>
      </article>
    </div>
  );
}

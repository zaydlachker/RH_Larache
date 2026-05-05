import React from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from '../i18n';
import { Landmark, Info, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';

const routeToKey: Record<string, string> = {
  '/commune': 'link_commune',
  '/presidence': 'link_presidence',
  '/sessions': 'link_sessions',
  '/appels-offre': 'link_appels',
  '/projets': 'link_projets',
  '/consultation': 'link_consultation',
  '/ville': 'link_ville',
  '/jardins': 'link_jardins',
  '/transport': 'link_transport',
  '/sport': 'link_sport',
  '/entreprenariat': 'link_entrepreneuriat',
  '/sante': 'link_sante',
  '/visite': 'link_visite',
  '/associative': 'link_associatif',
  '/commune-en-ligne': 'link_commune_ligne',
  '/bureau-digital': 'link_bureau_ordre',
  '/chikaya': 'link_chikaya',
  '/allo-mouatine': 'link_allo_mouatine',
  '/watiqa': 'link_watiqa',
  '/rokhas': 'link_rokhas',
  '/marches-publics': 'link_marches',
  '/chafafiya': 'link_chafafiya',
};

export function StaticPage() {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const key = routeToKey[pathname] || 'accueil';
  const title = t(key);

  return (
    <div className="min-h-[60vh] bg-slate-50 dark:bg-slate-900/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link to="/">
          <Button variant="ghost" className="mb-8 group text-slate-500 hover:text-blue-600 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            {t('accueil')}
          </Button>
        </Link>

        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl shadow-blue-600/5 border border-slate-100 dark:border-slate-700 overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600" />
          <div className="p-8 sm:p-12">
            <div className="flex items-center space-x-4 mb-8">
              <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                <Landmark className="h-8 w-8" />
              </div>
              <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {title}
              </h1>
            </div>

            <div className="prose dark:prose-invert max-w-none">
              <div className="flex items-start space-x-4 p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                <Info className="h-6 w-6 text-blue-500 shrink-0 mt-1" />
                <div>
                  <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                    {t('info_placeholder_prefix')} "{title}". {t('info_placeholder_suffix')}
                  </p>
                </div>
              </div>
              
              <div className="mt-12 space-y-6">
                <div className="h-4 w-2/3 bg-slate-100 dark:bg-slate-800 rounded-full animate-pulse" />
                <div className="h-4 w-full bg-slate-100 dark:bg-slate-800 rounded-full animate-pulse" />
                <div className="h-4 w-5/6 bg-slate-100 dark:bg-slate-800 rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

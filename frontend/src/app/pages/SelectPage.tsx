import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Landmark, GraduationCap, ChevronLeft, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';

export default function SelectPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-6 font-sans">
      <div className="w-full max-w-4xl">
        <div className="mb-12 text-center">
          <Link to="/login" className="inline-flex items-center text-sm text-slate-500 hover:text-blue-600 transition-colors mb-8 group">
            <ChevronLeft className="h-4 w-4 mr-1 group-hover:-translate-x-1 transition-transform" />
            Retour à l'accueil
          </Link>
          <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">Espace Professionnel</h2>
          <p className="text-slate-500 text-lg">Choisissez votre profil pour accéder à votre espace dédié.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Fonctionnaire Choice */}
          <Card 
            className="group cursor-pointer border-none shadow-sm hover:shadow-2xl transition-all duration-300 bg-white dark:bg-slate-900 overflow-hidden"
            onClick={() => navigate('/login/fonctionnaire')}
          >
            <CardContent className="p-12 flex flex-col items-center text-center space-y-6">
              <div className="h-20 w-20 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500 shadow-inner">
                <Landmark className="h-10 w-10" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">Fonctionnaire</h3>
                <p className="text-slate-500 mt-2 leading-relaxed">Accédez à votre dossier administratif, vos congés et votre carrière.</p>
              </div>
              <div className="flex items-center text-emerald-600 font-bold text-sm uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                Se connecter <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            </CardContent>
            <div className="h-1.5 w-full bg-emerald-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
          </Card>

          {/* Stagiaire Choice */}
          <Card 
            className="group cursor-pointer border-none shadow-sm hover:shadow-2xl transition-all duration-300 bg-white dark:bg-slate-900 overflow-hidden"
            onClick={() => navigate('/login/stagiaire')}
          >
            <CardContent className="p-12 flex flex-col items-center text-center space-y-6">
              <div className="h-20 w-20 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-inner">
                <GraduationCap className="h-10 w-10" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">Stagiaire</h3>
                <p className="text-slate-500 mt-2 leading-relaxed">Gérez vos demandes de stage, rapports et suivis administratifs.</p>
              </div>
              <div className="flex items-center text-blue-600 font-bold text-sm uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                Se connecter <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            </CardContent>
            <div className="h-1.5 w-full bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
          </Card>
        </div>
      </div>
    </div>
  );
}

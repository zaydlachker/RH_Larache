import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { getStoredUser } from '../lib/api';
import { Download, User, Briefcase, FileText, Calendar, Bell } from 'lucide-react';

export default function FonctionairePage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    setUser(getStoredUser());
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Espace Fonctionnaire</h1>
          <p className="text-slate-500 mt-2">Bienvenue sur votre portail professionnel</p>
        </div>

        {/* Profile Section */}
        <Card className="border-none shadow-sm bg-white dark:bg-slate-900">
          <CardHeader className="flex flex-row items-center gap-4 pb-2">
            <div className="h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xl font-bold shadow-sm">
              {user?.name ? user.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase() : <User className="h-8 w-8" />}
            </div>
            <div>
              <CardTitle className="text-xl">Profil Personnel</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Nom complet</p>
                <p className="font-semibold text-slate-900 dark:text-slate-100">{user?.name || '---'}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Email</p>
                <p className="font-semibold text-slate-900 dark:text-slate-100">{user?.email || '---'}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Rôle</p>
                <p className="font-semibold text-slate-900 dark:text-slate-100 uppercase">{user?.role || '---'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Career Section */}
        <Card className="border-none shadow-sm bg-white dark:bg-slate-900">
          <CardHeader className="flex flex-row items-center gap-4 pb-2">
            <div className="h-12 w-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Briefcase className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="text-xl">Carrière</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Grade actuel</p>
                <p className="font-semibold text-slate-900 dark:text-slate-100">Échelle 10</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Date de recrutement</p>
                <p className="font-semibold text-slate-900 dark:text-slate-100">2022</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Prochaine promotion</p>
                <p className="font-semibold text-slate-900 dark:text-slate-100">2026</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Documents Section */}
        <Card className="border-none shadow-sm bg-white dark:bg-slate-900">
          <CardHeader className="flex flex-row items-center gap-4 pb-2">
            <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="text-xl">Documents administratifs</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-4">
              {['Attestation de travail', 'Décision de nomination', 'Fiche de paie'].map((doc, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-slate-400" />
                    <span className="font-medium text-slate-700 dark:text-slate-300">{doc}</span>
                  </div>
                  <Button variant="outline" size="sm" className="flex items-center hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors">
                    <Download className="h-4 w-4 mr-2" />
                    Télécharger
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Congés Section */}
        <Card className="border-none shadow-sm bg-white dark:bg-slate-900">
          <CardHeader className="flex flex-row items-center gap-4 pb-2">
            <div className="h-12 w-12 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 flex items-center justify-center">
              <Calendar className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="text-xl">Congés</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 text-center">
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Jours restants</p>
                <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">18</p>
                <p className="text-xs text-slate-400 mt-1">Au titre de l'année 2026</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 flex flex-col justify-center">
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">Dernier congé</p>
                <div className="flex items-center text-slate-900 dark:text-slate-100 font-medium">
                  <Calendar className="h-4 w-4 mr-2 text-slate-400" />
                  Du 05/01/2026 au 12/01/2026
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications Section */}
        <Card className="border-none shadow-sm bg-white dark:bg-slate-900">
          <CardHeader className="flex flex-row items-center gap-4 pb-2">
            <div className="h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex items-center justify-center">
              <Bell className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="text-xl">Notifications Récentes</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-4">
              {[
                { title: "Validation de votre demande de congé", date: "Il y a 2 jours", type: "success" },
                { title: "Nouvelle fiche de paie disponible", date: "Il y a 5 jours", type: "info" },
                { title: "Rappel: Évaluation annuelle", date: "Il y a 1 semaine", type: "warning" }
              ].map((notif, idx) => (
                <div key={idx} className="flex items-start p-4 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <div className="mt-1.5 h-2 w-2 rounded-full bg-blue-500 mr-3 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium text-slate-800 dark:text-slate-200">{notif.title}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{notif.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, GraduationCap, FileText, LogOut, 
  Calendar, CheckCircle, Clock, Bell, BookOpen
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { authApi, getStoredUser } from '../lib/api';

export default function StagiaireDashboard() {
  const navigate = useNavigate();
  const user = getStoredUser();

  useEffect(() => {
    if (!user || user.role !== 'stagiaire') {
      navigate('/login/stagiaire', { replace: true });
    }
  }, [user, navigate]);

  if (!user || user.role !== 'stagiaire') return null;

  const handleLogout = async () => {
    await authApi.logout();
    navigate('/login/stagiaire', { replace: true });
  };

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 font-sans">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col sticky top-0 h-screen z-20">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-slate-900 dark:text-white leading-tight">Portail Stage</h1>
            <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest">Commune Larache</p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2 mt-4">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold bg-blue-600 text-white shadow-lg shadow-blue-600/20">
            <LayoutDashboard className="h-5 w-5" />
            Tableau de bord
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <FileText className="h-5 w-5" />
            Mes Candidatures
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <BookOpen className="h-5 w-5" />
            Rapport de stage
          </button>
        </nav>

        <div className="p-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-xl flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">{user.name?.charAt(0) || 'S'}</div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold truncate text-slate-900 dark:text-white">{user.name}</p>
              <p className="text-[10px] text-slate-500 truncate uppercase tracking-tighter">Stagiaire</p>
            </div>
          </div>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors">
            <LogOut className="h-5 w-5" />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in duration-500">
          <header className="flex justify-between items-end">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Bienvenue, {user.name}</h2>
              <p className="text-slate-500 mt-1">Gérez votre stage et vos documents administratifs.</p>
            </div>
            <Badge variant="outline" className="h-10 px-4 rounded-xl border-slate-200 bg-white text-slate-500 font-bold">
              <Calendar className="h-4 w-4 mr-2" /> {new Date().toLocaleDateString()}
            </Badge>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard title="Status Stage" value="Postulé" icon={Clock} color="text-blue-600" bg="bg-blue-50" />
            <StatCard title="Documents" value="0" icon={FileText} color="text-emerald-600" bg="bg-emerald-50" />
            <StatCard title="Notifications" value="1" icon={Bell} color="text-purple-600" bg="bg-purple-50" />
          </div>

          <Card className="border-none shadow-sm rounded-3xl overflow-hidden bg-white">
            <CardHeader className="pb-4 border-b border-slate-50">
              <CardTitle className="text-lg flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-blue-600" /> État de la candidature
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 flex flex-col items-center justify-center text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-slate-50 flex items-center justify-center">
                <Clock className="h-8 w-8 text-slate-300" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">En attente de revue</h3>
                <p className="text-slate-500 text-sm max-w-sm mx-auto mt-1">
                  Votre demande de stage est actuellement en cours de traitement par le service des ressources humaines.
                </p>
              </div>
              <Button variant="outline" className="rounded-xl border-slate-200">Détails de la demande</Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color, bg }: any) {
  return (
    <Card className="border-none shadow-sm bg-white overflow-hidden group hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className={`p-3 rounded-2xl ${bg} ${color} group-hover:scale-110 transition-transform`}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
        <div className="mt-4">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{title}</p>
          <h4 className="text-3xl font-black text-slate-900 mt-1">{value}</h4>
        </div>
      </CardContent>
    </Card>
  );
}

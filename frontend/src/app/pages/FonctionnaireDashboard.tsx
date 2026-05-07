import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, FileText, LogOut, Shield, Landmark, 
  Bell, Clock, CheckCircle, XCircle, Mail, Phone, Building2,
  Calendar, ArrowRight, Activity, Search, Trash2, Edit, X, Eye, Send,
  User, Lock, Settings, History, Download, Briefcase, GraduationCap,
  Wallet, PieChart, Globe, Info, CreditCard, BookOpen
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

export default function FonctionnaireDashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [dossiers, setDossiers] = useState<any[]>([]);
  const [carriere, setCarriere] = useState<any[]>([]);
  const [documents, setDocuments] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>(null);
  
  // Theme & Language State
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'fr');

  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  useEffect(() => {
    // Apply Theme
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('lang', lang);
    document.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  // Translations Helper
  const t = (key: string) => {
    const texts: any = {
      fr: {
        dashboard: "Tableau de bord",
        actes: "Mes Actes",
        carriere: "Ma Carrière",
        settings: "Paramètres",
        logout: "Déconnexion",
        hello: "Bonjour",
        overview: "Consultez votre situation administrative en temps réel.",
        stat_statut: "Statut",
        stat_grade: "Grade",
        stat_echelle: "Échelle",
        stat_echelon: "Échelon",
        stat_anciennete: "Ancienneté",
        stat_matricule: "Matricule",
        next_adv: "Prochain Avancement",
        perso_info: "Informations Personnelles",
        safety: "Sécurité",
        lang_select: "Langue de l'interface",
        dark_mode: "Mode Sombre",
        dark_desc: "Activer l'apparence sombre pour l'interface."
      },
      ar: {
        dashboard: "لوحة التحكم",
        actes: "أعمالي الإدارية",
        carriere: "مساري المهني",
        settings: "الإعدادات",
        logout: "تسجيل الخروج",
        hello: "مرحباً",
        overview: "اطلع على وضعيتك الإدارية في الوقت الفعلي.",
        stat_statut: "الحالة",
        stat_grade: "الدرجة",
        stat_echelle: "السلم",
        stat_echelon: "الرتبة",
        stat_anciennete: "الأقدمية",
        stat_matricule: "رقم التأجير",
        next_adv: "الترقية القادمة",
        perso_info: "المعلومات الشخصية",
        safety: "الأمان",
        lang_select: "لغة الواجهة",
        dark_mode: "الوضع الليلي",
        dark_desc: "تفعيل المظهر الداكن للواجهة."
      }
    };
    return texts[lang][key] || key;
  };

  useEffect(() => {
    if (!user || user.role !== 'fonctionnaire') {
      navigate('/fonctionnaire', { replace: true });
      return;
    }

    // Fetch real professional data
    fetch(`http://localhost:8000/fonctionnaires`)
      .then(res => res.json())
      .then(data => {
        const myProfile = data.find((f: any) => f.user.email === user.email);
        if (myProfile) {
          setProfile(myProfile);
          
          fetch('http://localhost:8000/arretes')
            .then(res => res.json())
            .then(arretes => {
              const myArretes = arretes.filter((a: any) => a.fonctionnaire_id === myProfile.id);
              
              setDocuments(myArretes.map((a: any) => ({
                id: a.id,
                title: a.title,
                type: 'Arrêté',
                date: a.issue_date,
                reference: a.reference
              })));

              setCarriere(myArretes.map((a: any) => ({
                id: a.id,
                title: a.title,
                date: a.issue_date,
                description: a.description || `Décision administrative réf: ${a.reference}`
              })).sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()));
            });
        }
      })
      .catch(err => console.error('Error fetching real data:', err));

    const stored = JSON.parse(localStorage.getItem('mes_actes') || '[]');
    setDossiers(stored.length > 0 ? stored : [
      { id: 1, title: 'Demande de congé annuel', status: 'validé', date: '2026-05-01', description: 'Congé pour la période estivale.' },
      { id: 2, title: 'Attestation de travail', status: 'en cours', date: '2026-05-03', description: 'Pour dossier bancaire.' }
    ]);
  }, [user, navigate]);

  if (!user || user.role !== 'fonctionnaire') return null;

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login', { replace: true });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'validé': return <Badge className="bg-emerald-100 text-emerald-700 border-none px-3 font-bold uppercase text-[10px]">Validé</Badge>;
      case 'en cours': return <Badge className="bg-blue-100 text-blue-700 border-none px-3 font-bold uppercase text-[10px]">En cours</Badge>;
      case 'refusé': return <Badge className="bg-red-100 text-red-700 border-none px-3 font-bold uppercase text-[10px]">Refusé</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F0F5F9] dark:bg-slate-950 font-sans text-slate-900">
      {/* SIDEBAR */}
      <aside className="w-72 bg-[#0F172A] text-white flex flex-col sticky top-0 h-screen z-20 shadow-2xl">
        <div className="p-8 border-b border-white/10 flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center shadow-lg transform rotate-3">
            <Landmark className="h-7 w-7 text-white" />
          </div>
          <div>
            <h1 className="font-black text-xl tracking-tighter leading-none">Mon Espace</h1>
            <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest mt-1">Commune Larache</p>
          </div>
        </div>

        <nav className="flex-1 p-6 space-y-1.5 overflow-y-auto custom-scrollbar">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 px-4">Navigation</p>
          <SidebarItem label={t('dashboard')} icon={LayoutDashboard} active={activeSection === 'dashboard'} onClick={() => setActiveSection('dashboard')} />
          <SidebarItem label={t('actes')} icon={FileText} active={activeSection === 'actes'} onClick={() => setActiveSection('actes')} />
          <SidebarItem label={t('carriere')} icon={History} active={activeSection === 'carriere'} onClick={() => setActiveSection('carriere')} />
          <SidebarItem label={t('settings')} icon={Settings} active={activeSection === 'settings'} onClick={() => setActiveSection('settings')} />
          <div className="pt-8 px-4">
            <Button variant="outline" onClick={() => navigate('/')} className="w-full border-white/10 bg-white/5 text-white hover:bg-white/10 rounded-xl justify-start gap-3">
              <Globe className="h-4 w-4" /> Portail Public
            </Button>
          </div>
        </nav>

        <div className="p-6 border-t border-white/10 space-y-4">
          <div className="bg-white/5 p-4 rounded-2xl flex items-center gap-4 border border-white/5">
            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-blue-400 to-emerald-400 flex items-center justify-center text-white font-black">{user.name?.charAt(0)}</div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-black truncate">{user.name}</p>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">Matricule: {profile?.matricule || '...'}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-400 hover:bg-red-500/10 transition-colors">
            <LogOut className="h-5 w-5" /> {t('logout')}
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* HEADER */}
        <header className="h-20 bg-white border-b border-slate-200 px-10 flex items-center justify-between sticky top-0 z-10 shadow-sm">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-96 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              <input type="text" placeholder="Rechercher (acte, dossier, service...)" className="w-full h-11 bg-slate-50 rounded-xl pl-11 pr-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none border border-transparent transition-all" />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 font-bold border border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-slate-200 transition-colors"
            >
              {theme === 'dark' ? '🌙' : '☀️'}
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
          <div className="max-w-7xl mx-auto space-y-10">
            
            {/* SECTION: DASHBOARD */}
            {activeSection === 'dashboard' && (
              <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <header>
                  <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">{t('hello')}, {user.name}</h2>
                  <p className="text-slate-500 dark:text-slate-400 text-lg mt-1 font-medium">{t('overview')}</p>
                </header>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                  <StatItem label={t('stat_statut')} value={profile?.statut || 'Titulaire'} color="emerald" icon={Shield} />
                  <StatItem label={t('stat_grade')} value={profile?.grade || profile?.position || 'Admin'} color="blue" icon={Briefcase} />
                  <StatItem label={t('stat_echelle')} value={profile?.echelle || 'Hors Echelle'} color="purple" icon={Activity} />
                  <StatItem label={t('stat_echelon')} value={profile?.echelon || '5'} color="orange" icon={ArrowRight} />
                  <StatItem label={t('stat_anciennete')} value={profile?.anciennete || '...'} color="slate" icon={Clock} />
                  <StatItem label={t('stat_matricule')} value={profile?.matricule || '...'} color="blue" icon={Info} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                  <div className="lg:col-span-2 space-y-10">
                    <Card className="border-none shadow-xl rounded-[2.5rem] bg-gradient-to-br from-[#024B7D] to-[#01335A] text-white overflow-hidden relative group">
                      <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:scale-110 transition-transform duration-700">
                        <History className="h-40 w-40" />
                      </div>
                      <CardHeader className="p-10 pb-0 flex flex-row items-center gap-4">
                        <div className="h-10 w-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center"><Calendar className="h-5 w-5" /></div>
                        <CardTitle className="text-2xl font-bold">{t('next_adv')}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-10 pt-6 space-y-8 relative z-10">
                        <div className="grid grid-cols-3 gap-10">
                          <div className="space-y-1">
                            <p className="text-[10px] font-black text-white/50 uppercase tracking-widest">Date Prévue</p>
                            <p className="text-xl font-black">13/01/2027</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-[10px] font-black text-white/50 uppercase tracking-widest">Nouvel Échelon</p>
                            <p className="text-xl font-black">6</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-[10px] font-black text-white/50 uppercase tracking-widest">Jours Restants</p>
                            <p className="text-xl font-black text-emerald-400">255 Jours</p>
                          </div>
                        </div>
                        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-400 w-[65%]" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-none shadow-sm rounded-[2.5rem] bg-white dark:bg-slate-900 overflow-hidden">
                      <CardHeader className="p-10 border-b border-slate-50 dark:border-slate-800 flex flex-row items-center gap-4">
                        <div className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400"><User className="h-5 w-5" /></div>
                        <CardTitle className="text-xl font-black dark:text-white">{t('perso_info')}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-10 grid grid-cols-2 gap-10">
                        <ProfileInfo label="CNIE" value={profile?.cin || '...'} />
                        <ProfileInfo label="EMAIL" value={user.email} />
                        <ProfileInfo label="TÉLÉPHONE" value={profile?.phone || '...'} />
                        <ProfileInfo label="DATE DE NAISSANCE" value={profile?.date_naissance || '...'} />
                        <ProfileInfo label="LIEU DE NAISSANCE" value={profile?.lieu_naissance || '...'} />
                        <ProfileInfo label="NATIONALITÉ" value={profile?.nationalite || '...'} />
                        <ProfileInfo label="DIPLÔME" value={profile?.diplome || '...'} />
                        <ProfileInfo label="DATE DE RECRUTEMENT" value={profile?.hire_date || '...'} />
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-10">
                    <Card className="border-none shadow-xl rounded-[2.5rem] bg-white dark:bg-slate-900 overflow-hidden p-10 text-center">
                      <div className="h-20 w-20 mx-auto rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 mb-6">
                        <Shield className="h-10 w-10" />
                      </div>
                      <h4 className="text-xl font-black text-slate-900 dark:text-white mb-2">Espace Sécurisé</h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed italic">Votre dossier administratif est protégé et synchronisé avec les services RH de la commune.</p>
                    </Card>
                  </div>
                </div>
              </div>
            )}

            {/* SECTION: MES ACTES */}
            {activeSection === 'actes' && (
              <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <header className="flex justify-between items-end">
                  <div>
                    <h2 className="text-4xl font-black text-slate-900 tracking-tight">Mes Actes</h2>
                    <p className="text-slate-500 text-lg mt-1 font-medium">Historique de vos documents et demandes administratives.</p>
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700 rounded-2xl h-14 px-8 font-bold text-white shadow-lg shadow-blue-600/20">
                    <Send className="h-5 w-5 mr-3" /> Nouvelle Demande
                  </Button>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="md:col-span-2">
                    <Card className="border-none shadow-sm rounded-[2.5rem] bg-white overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="bg-slate-50 border-b border-slate-100">
                              <th className="p-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Titre de l'acte</th>
                              <th className="p-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Date</th>
                              <th className="p-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Statut</th>
                              <th className="p-8 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-50">
                            {documents.map(doc => (
                              <tr key={doc.id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="p-8 flex items-center gap-4">
                                  <div className="h-12 w-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-black"><FileText className="h-6 w-6" /></div>
                                  <div>
                                    <p className="font-bold text-slate-900">{doc.title}</p>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Réf: {doc.reference}</p>
                                  </div>
                                </td>
                                <td className="p-8 text-sm font-medium text-slate-500">{new Date(doc.date).toLocaleDateString()}</td>
                                <td className="p-8"><Badge className="bg-emerald-100 text-emerald-700 border-none px-3 font-bold uppercase text-[10px]">Validé</Badge></td>
                                <td className="p-8 text-right">
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    onClick={() => window.open(`http://localhost:8000/arrete/download/${doc.id}`, '_blank')}
                                    className="h-10 w-10 text-slate-400 hover:text-blue-600"
                                  >
                                    <Download className="h-5 w-5" />
                                  </Button>
                                </td>
                              </tr>
                            ))}
                            {dossiers.map(d => (
                              <tr key={d.id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="p-8 flex items-center gap-4">
                                  <div className="h-12 w-12 rounded-2xl bg-slate-100 text-slate-500 flex items-center justify-center font-black"><Send className="h-6 w-6" /></div>
                                  <p className="font-bold text-slate-900">{d.title}</p>
                                </td>
                                <td className="p-8 text-sm font-medium text-slate-500">{d.date}</td>
                                <td className="p-8">{getStatusBadge(d.status)}</td>
                                <td className="p-8 text-right"><Button variant="ghost" size="icon" className="h-10 w-10 text-slate-400 hover:text-blue-600"><Eye className="h-5 w-5" /></Button></td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </Card>
                  </div>
                  <div className="space-y-8">
                    <Card className="border-none shadow-sm rounded-[2.5rem] bg-[#024B7D] text-white p-10">
                      <CardTitle className="text-xl font-black mb-6">Type de demandes</CardTitle>
                      <div className="space-y-4">
                        <RequestType label="Congés & Absences" count={12} icon={Calendar} />
                        <RequestType label="Attestations RH" count={4} icon={FileText} />
                        <RequestType label="Mutation & Carrière" count={1} icon={Briefcase} />
                        <RequestType label="Autres demandes" count={2} icon={Send} />
                      </div>
                    </Card>
                    <Card className="border-none shadow-sm rounded-[2.5rem] bg-white p-10 text-center space-y-6 border-2 border-dashed border-slate-100">
                      <div className="h-20 w-20 mx-auto rounded-full bg-slate-50 flex items-center justify-center text-slate-300"><Clock className="h-10 w-10" /></div>
                      <h4 className="font-black text-slate-900">Demandes en attente</h4>
                      <p className="text-sm text-slate-500 leading-relaxed">Vous n'avez aucune demande en attente de validation pour le moment.</p>
                    </Card>
                  </div>
                </div>
              </div>
            )}

            {/* SECTION: CARRIERE */}
            {activeSection === 'carriere' && (
              <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <header>
                  <h2 className="text-4xl font-black text-slate-900 tracking-tight">Ma Carrière</h2>
                  <p className="text-slate-500 text-lg mt-1 font-medium">Parcours professionnel et évolution administrative au sein de la commune.</p>
                </header>

                <Card className="border-none shadow-sm rounded-[2.5rem] bg-white p-12">
                  <div className="relative space-y-16 before:absolute before:inset-0 before:ml-10 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-blue-600 before:via-slate-100 before:to-transparent">
                    {carriere.length > 0 ? carriere.map((item, idx) => (
                      <div key={item.id} className="relative flex items-center justify-between md:justify-start md:odd:flex-row-reverse group">
                        <div className="flex items-center justify-center w-20 h-20 rounded-3xl border-8 border-white bg-blue-600 text-white shadow-xl z-10 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-transform group-hover:scale-110">
                          <History className="h-8 w-8" />
                        </div>
                        <div className="w-[calc(100%-6rem)] md:w-[calc(50%-4rem)] p-10 rounded-[2.5rem] bg-slate-50 group-hover:bg-blue-50 transition-all border border-transparent group-hover:border-blue-100 shadow-sm">
                          <time className="text-[10px] font-black uppercase tracking-widest text-blue-600 block mb-3">{new Date(item.date).toLocaleDateString()}</time>
                          <h3 className="text-2xl font-black text-slate-900">{item.title}</h3>
                          <p className="text-slate-500 text-sm mt-3 leading-relaxed">{item.description}</p>
                          <div className="mt-6 flex gap-2">
                            <Badge className="bg-blue-100 text-blue-600 border-none font-bold uppercase text-[10px]">Archivé</Badge>
                            <Badge variant="outline" className="text-slate-400 font-bold uppercase text-[10px]">Officiel</Badge>
                          </div>
                        </div>
                      </div>
                    )) : (
                      <div className="p-20 text-center text-slate-400 italic">Aucun historique de carrière disponible pour le moment.</div>
                    )}
                  </div>
                </Card>
              </div>
            )}

            {/* SECTION: PARAMETRES */}
            {activeSection === 'settings' && (
              <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <header>
                  <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">{t('settings')}</h2>
                  <p className="text-slate-500 dark:text-slate-400 text-lg mt-1 font-medium">Gérez vos préférences de compte et de sécurité.</p>
                </header>

                <div className="max-w-3xl space-y-10">
                  <Card className="border-none shadow-sm rounded-[2.5rem] bg-white dark:bg-slate-900 overflow-hidden">
                    <CardHeader className="p-10 border-b border-slate-50 dark:border-slate-800"><CardTitle className="text-xl font-black dark:text-white">{t('lang_select')}</CardTitle></CardHeader>
                    <CardContent className="p-10 space-y-8">
                      <div className="grid grid-cols-2 gap-4">
                        <Button 
                          variant="outline" 
                          onClick={() => setLang('fr')}
                          className={`h-14 rounded-2xl border-2 transition-all ${lang === 'fr' ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-blue-600' : 'border-slate-100 dark:border-slate-800 text-slate-400'}`}
                        >
                          Français
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => setLang('ar')}
                          className={`h-14 rounded-2xl border-2 transition-all ${lang === 'ar' ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-blue-600' : 'border-slate-100 dark:border-slate-800 text-slate-400'}`}
                        >
                          العربية
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center text-blue-600 shadow-sm">
                            {theme === 'dark' ? <Lock className="h-6 w-6" /> : <Settings className="h-6 w-6" />}
                          </div>
                          <div>
                            <p className="font-black text-slate-900 dark:text-white">{t('dark_mode')}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">{t('dark_desc')}</p>
                          </div>
                        </div>
                        <div 
                          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                          className={`h-7 w-14 rounded-full relative p-1 cursor-pointer transition-colors ${theme === 'dark' ? 'bg-blue-600' : 'bg-slate-300'}`}
                        >
                          <div className={`h-5 w-5 bg-white rounded-full shadow-sm transition-transform ${theme === 'dark' ? 'translate-x-7' : 'translate-x-0'}`} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-none shadow-sm rounded-[2.5rem] bg-white dark:bg-slate-900 overflow-hidden">
                    <CardHeader className="p-10 border-b border-slate-50 dark:border-slate-800"><CardTitle className="text-xl font-black dark:text-white">{t('safety')}</CardTitle></CardHeader>
                    <CardContent className="p-10 space-y-6">
                      <Button variant="outline" className="w-full justify-between rounded-[1.5rem] h-16 px-8 border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-900 dark:text-white font-bold">
                        <div className="flex items-center gap-4"><Lock className="h-6 w-6 text-slate-400" /> Modifier le mot de passe</div>
                        <ArrowRight className="h-5 w-5 text-slate-300" />
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}

function SidebarItem({ label, icon: Icon, active = false, onClick }: any) {
  return (
    <button 
      onClick={onClick} 
      className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-bold transition-all duration-300 group ${active ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-xl shadow-blue-900/40' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
    >
      <Icon className={`h-5 w-5 transition-transform duration-500 ${active ? 'text-white' : 'text-slate-500 group-hover:text-white group-hover:scale-110'}`} />
      <span className="flex-1 text-left">{label}</span>
      {active && <div className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_8px_white]" />}
    </button>
  );
}

function StatItem({ label, value, color, icon: Icon }: any) {
  const colorMap: any = {
    emerald: 'bg-emerald-50 text-emerald-600',
    blue: 'bg-blue-50 text-blue-600',
    purple: 'bg-purple-50 text-purple-600',
    orange: 'bg-orange-50 text-orange-600',
    slate: 'bg-slate-50 text-slate-600',
  };

  return (
    <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 space-y-4 hover:shadow-xl transition-all duration-500 group">
      <div className={`h-12 w-12 rounded-2xl flex items-center justify-center ${colorMap[color]} group-hover:scale-110 transition-transform`}>
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
        <p className="text-sm font-black text-slate-900 mt-1 truncate">{value}</p>
      </div>
    </div>
  );
}

function ProfileInfo({ label, value }: any) {
  return (
    <div className="space-y-1.5 group">
      <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest group-hover:text-blue-500 transition-colors">{label}</p>
      <p className="text-sm font-black text-slate-900">{value || 'Non renseigné'}</p>
    </div>
  );
}

function RequestType({ label, count, icon: Icon }: any) {
  return (
    <div className="flex items-center justify-between p-5 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors cursor-pointer group">
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:rotate-12 transition-transform"><Icon className="h-5 w-5" /></div>
        <span className="text-sm font-bold">{label}</span>
      </div>
      <Badge className="bg-white/20 text-white border-none text-[10px] font-black">{count}</Badge>
    </div>
  );
}

function StatCardModern({ title, value, unit, icon: Icon, color }: any) {
  const colorMap: any = {
    emerald: 'text-emerald-600 bg-emerald-50',
    blue: 'text-blue-600 bg-blue-50',
    orange: 'text-orange-600 bg-orange-50',
  };

  return (
    <Card className="border-none shadow-sm rounded-[2.5rem] bg-white overflow-hidden p-8 hover:shadow-2xl transition-all duration-500 group">
      <div className="flex justify-between items-start">
        <div className={`h-16 w-16 rounded-3xl flex items-center justify-center transition-transform group-hover:scale-110 ${colorMap[color]}`}>
          <Icon className="h-8 w-8" />
        </div>
        <Badge variant="outline" className="border-slate-100 text-slate-300">2026</Badge>
      </div>
      <div className="mt-8">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{title}</p>
        <div className="flex items-baseline gap-2 mt-2">
          <h4 className="text-5xl font-black text-slate-900 tracking-tighter">{value}</h4>
          <span className="text-slate-400 font-bold text-sm uppercase">{unit}</span>
        </div>
      </div>
    </Card>
  );
}

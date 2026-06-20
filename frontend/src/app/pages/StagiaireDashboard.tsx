import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, FileText, LogOut, Shield, Landmark, 
  Bell, Clock, CheckCircle, XCircle, Mail, Phone, Building2,
  Calendar, ArrowRight, Activity, Search, Trash2, Edit, X, Eye, Send,
  User, Lock, Settings, History, Download, Briefcase, GraduationCap,
  Wallet, PieChart, Globe, Info, CreditCard, BookOpen, MessageSquare
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { api, authApi } from '../lib/api';

export default function StagiaireDashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [documents, setDocuments] = useState<any[]>([]);
  const [stageTimeline, setStageTimeline] = useState<any[]>([]);
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
        documents: "Mes Documents",
        mon_stage: "Mon Stage",
        settings: "Paramètres",
        logout: "Déconnexion",
        hello: "Bonjour",
        overview: "Suivez l'évolution de votre stage en temps réel.",
        stat_status: "Statut Stage",
        stat_duree: "Durée",
        stat_encadrant: "Encadrant",
        stat_service: "Service",
        stat_debut: "Date Début",
        stat_evaluation: "Dernière Éval.",
        next_eval: "Progression du Stage",
        perso_info: "Informations Personnelles",
        safety: "Sécurité",
        lang_select: "Langue de l'interface",
        dark_mode: "Mode Sombre",
        dark_desc: "Activer l'apparence sombre pour l'interface."
      },
      ar: {
        dashboard: "لوحة التحكم",
        documents: "وثائقي",
        mon_stage: "تدريبي",
        settings: "الإعدادات",
        logout: "تسجيل الخروج",
        hello: "مرحباً",
        overview: "تابع تطور تدريبك في الوقت الفعلي.",
        stat_status: "حالة التدريب",
        stat_duree: "المدة",
        stat_encadrant: "المؤطر",
        stat_service: "المصلحة",
        stat_debut: "تاريخ البدء",
        stat_evaluation: "آخر تقييم",
        next_eval: "تقدم التدريب",
        perso_info: "المعلومات الشخصية",
        safety: "الأمان",
        lang_select: "لغة الواجهة",
        dark_mode: "الوضع الليلي",
        dark_desc: "تفعيل المظهر الداكن للواجهة."
      }
    };
    return texts[lang][key] || key;
  };

  // Modal States
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);
  
  // Form States
  const [passwordForm, setPasswordForm] = useState({ current: '', new: '', confirm: '' });
  const [uploadForm, setUploadForm] = useState({ title: '', file: null as File | null });
  
  // Toast State
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error'; visible: boolean }>({
    message: '',
    type: 'success',
    visible: false
  });

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type, visible: true });
    setTimeout(() => setToast(prev => ({ ...prev, visible: false })), 3000);
  };

  useEffect(() => {
    if (!user || user.role !== 'stagiaire') {
      navigate('/login/stagiaire', { replace: true });
      return;
    }

    // Load Profile
    const storedProfile = localStorage.getItem(`stagiaire_profile_${user.id}`);
    let profileData: any = {};
    if (storedProfile) {
      profileData = JSON.parse(storedProfile);
    }

    const defaultProfile = {
      status: profileData.status || 'en cours',
      encadrant: profileData.encadrant || 'Pr. Ahmed El Amrani',
      service: profileData.service || 'Direction des Systèmes d\'Information',
      start_date: profileData.start_date || '2026-03-01',
      end_date: profileData.end_date || '2026-06-30',
      cin: user.cin || profileData.cin || 'L543210',
      phone: user.phone || profileData.phone || '06 12 34 56 78',
      date_naissance: user.date_naissance || profileData.date_naissance || '2001-05-15',
      lieu_naissance: user.lieu_naissance || profileData.lieu_naissance || 'Larache',
      nationalite: user.nationalite || profileData.nationalite || 'Marocaine',
      diplome: user.diplome || profileData.diplome || 'Licence en Génie Logiciel',
      etablissement: user.etablissement || profileData.etablissement || 'Université Abdelmalek Essaâdi',
    };

    setProfile(defaultProfile);
    localStorage.setItem(`stagiaire_profile_${user.id}`, JSON.stringify(defaultProfile));

    // Load Documents
    const storedDocs = localStorage.getItem(`stagiaire_docs_${user.id}`);
    if (storedDocs) {
      setDocuments(JSON.parse(storedDocs));
    } else {
      const defaultDocs = [
        { id: 1, title: 'Convention de Stage', reference: 'CV-2026-001', date: '2026-02-15', status: 'validé' },
        { id: 2, title: 'Attestation d\'Assurance', reference: 'AS-2026-042', date: '2026-02-20', status: 'validé' },
      ];
      setDocuments(defaultDocs);
      localStorage.setItem(`stagiaire_docs_${user.id}`, JSON.stringify(defaultDocs));
    }

    // Load Timeline
    const storedTimeline = localStorage.getItem(`stagiaire_timeline_${user.id}`);
    if (storedTimeline) {
      setStageTimeline(JSON.parse(storedTimeline));
    } else {
      const defaultTimeline = [
        { id: 1, title: 'Début du stage', description: 'Intégration au sein du service DSI et présentation de l\'équipe.', date: '2026-03-01' },
        { id: 2, title: 'Validation du plan de travail', description: 'Le plan de travail pour le projet de gestion RH a été validé par l\'encadrant.', date: '2026-03-10' },
        { id: 3, title: 'Mi-parcours', description: 'Évaluation positive des premières livrables.', date: '2026-04-15' },
      ];
      setStageTimeline(defaultTimeline);
      localStorage.setItem(`stagiaire_timeline_${user.id}`, JSON.stringify(defaultTimeline));
    }
  }, [user, navigate]);

  if (!user || user.role !== 'stagiaire') return null;

  const handleLogout = async () => {
    await authApi.logout();
    navigate('/login/stagiaire', { replace: true });
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadForm.title || !uploadForm.file) {
      showToast('Veuillez remplir tous les champs', 'error');
      return;
    }

    const newDoc = {
      id: Date.now(),
      title: uploadForm.title,
      reference: 'UP-' + Math.floor(1000 + Math.random() * 9000),
      date: new Date().toISOString().split('T')[0],
      status: 'en cours'
    };

    const updatedDocs = [newDoc, ...documents];
    setDocuments(updatedDocs);
    localStorage.setItem(`stagiaire_docs_${user.id}`, JSON.stringify(updatedDocs));
    
    setIsUploadOpen(false);
    setUploadForm({ title: '', file: null });
    showToast('Document déposé avec succès !');
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordForm.current || !passwordForm.new || !passwordForm.confirm) {
      showToast('Veuillez remplir tous les champs', 'error');
      return;
    }
    if (passwordForm.new !== passwordForm.confirm) {
      showToast('Les mots de passe ne correspondent pas', 'error');
      return;
    }
    if (passwordForm.new.length < 8) {
      showToast('Le mot de passe doit contenir au moins 8 caractères', 'error');
      return;
    }

    // Simulating password change
    showToast('Mot de passe modifié avec succès !');
    setIsPasswordOpen(false);
    setPasswordForm({ current: '', new: '', confirm: '' });
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
      {/* Toast Notification */}
      {toast.visible && (
        <div className={`fixed top-10 left-1/2 -translate-x-1/2 z-[100] px-6 py-4 rounded-2xl shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300 flex items-center gap-3 font-bold text-white ${toast.type === 'success' ? 'bg-emerald-500' : 'bg-red-500'}`}>
          {toast.type === 'success' ? <CheckCircle className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
          {toast.message}
        </div>
      )}

      {/* Upload Modal */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <Card className="w-full max-w-md border-none shadow-2xl rounded-[2.5rem] overflow-hidden">
            <CardHeader className="p-10 bg-[#0F172A] text-white">
              <div className="flex justify-between items-center">
                <CardTitle className="text-2xl font-black">Déposer un document</CardTitle>
                <button onClick={() => setIsUploadOpen(false)} className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"><X className="h-5 w-5" /></button>
              </div>
            </CardHeader>
            <form onSubmit={handleUpload}>
              <CardContent className="p-10 space-y-6">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Titre du document</Label>
                  <Input 
                    required 
                    value={uploadForm.title} 
                    onChange={e => setUploadForm({...uploadForm, title: e.target.value})}
                    placeholder="Ex: Rapport de stage..." 
                    className="h-12 rounded-xl border-slate-100 focus:ring-blue-600" 
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Fichier (PDF, DOCX)</Label>
                  <div className="border-2 border-dashed border-slate-100 rounded-2xl p-8 text-center hover:border-blue-600 transition-colors cursor-pointer relative">
                    <input 
                      type="file" 
                      required
                      className="absolute inset-0 opacity-0 cursor-pointer" 
                      onChange={e => setUploadForm({...uploadForm, file: e.target.files?.[0] || null})}
                    />
                    <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 mx-auto mb-4"><Download className="h-6 w-6" /></div>
                    <p className="text-sm font-bold text-slate-900">{uploadForm.file ? uploadForm.file.name : 'Cliquez pour sélectionner un fichier'}</p>
                    <p className="text-xs text-slate-400 mt-1">Maximum 10MB</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-10 pt-0">
                <Button type="submit" className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-lg shadow-blue-600/20">
                  <Send className="h-5 w-5 mr-3" /> Envoyer le document
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      )}

      {/* Password Modal */}
      {isPasswordOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <Card className="w-full max-w-md border-none shadow-2xl rounded-[2.5rem] overflow-hidden">
            <CardHeader className="p-10 bg-[#0F172A] text-white">
              <div className="flex justify-between items-center">
                <CardTitle className="text-2xl font-black">Modifier le mot de passe</CardTitle>
                <button onClick={() => setIsPasswordOpen(false)} className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"><X className="h-5 w-5" /></button>
              </div>
            </CardHeader>
            <form onSubmit={handlePasswordChange}>
              <CardContent className="p-10 space-y-6">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Mot de passe actuel</Label>
                  <Input 
                    type="password" 
                    required 
                    value={passwordForm.current}
                    onChange={e => setPasswordForm({...passwordForm, current: e.target.value})}
                    className="h-12 rounded-xl border-slate-100 focus:ring-blue-600" 
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Nouveau mot de passe</Label>
                  <Input 
                    type="password" 
                    required 
                    value={passwordForm.new}
                    onChange={e => setPasswordForm({...passwordForm, new: e.target.value})}
                    className="h-12 rounded-xl border-slate-100 focus:ring-blue-600" 
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Confirmer le mot de passe</Label>
                  <Input 
                    type="password" 
                    required 
                    value={passwordForm.confirm}
                    onChange={e => setPasswordForm({...passwordForm, confirm: e.target.value})}
                    className="h-12 rounded-xl border-slate-100 focus:ring-blue-600" 
                  />
                </div>
              </CardContent>
              <CardFooter className="p-10 pt-0">
                <Button type="submit" className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-lg shadow-blue-600/20">
                  <CheckCircle className="h-5 w-5 mr-3" /> Mettre à jour
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      )}

      {/* SIDEBAR */}
      <aside className="w-72 bg-[#0F172A] text-white flex flex-col sticky top-0 h-screen z-20 shadow-2xl">
        <div className="p-8 border-b border-white/10 flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center shadow-lg transform rotate-3">
            <GraduationCap className="h-7 w-7 text-white" />
          </div>
          <div>
            <h1 className="font-black text-xl tracking-tighter leading-none">Espace Stage</h1>
            <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest mt-1">Commune Larache</p>
          </div>
        </div>

        <nav className="flex-1 p-6 space-y-1.5 overflow-y-auto custom-scrollbar">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 px-4">Navigation</p>
          <SidebarItem label={t('dashboard')} icon={LayoutDashboard} active={activeSection === 'dashboard'} onClick={() => setActiveSection('dashboard')} />
          <SidebarItem label={t('documents')} icon={FileText} active={activeSection === 'actes'} onClick={() => setActiveSection('actes')} />
          <SidebarItem label={t('mon_stage')} icon={History} active={activeSection === 'carriere'} onClick={() => setActiveSection('carriere')} />
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
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">Stagiaire</p>
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
              <input type="text" placeholder="Rechercher (document, feedback, service...)" className="w-full h-11 bg-slate-50 rounded-xl pl-11 pr-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none border border-transparent transition-all" />
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
                  <StatItem label={t('stat_status')} value={profile?.status || 'En cours'} color="emerald" icon={Shield} />
                  <StatItem label={t('stat_encadrant')} value={profile?.encadrant || '...'} color="blue" icon={User} />
                  <StatItem label={t('stat_service')} value={profile?.service || '...'} color="purple" icon={Building2} />
                  <StatItem label={t('stat_duree')} value="4 Mois" color="orange" icon={Clock} />
                  <StatItem label={t('stat_debut')} value={profile?.start_date || '...'} color="slate" icon={Calendar} />
                  <StatItem label={t('stat_evaluation')} value="Bien" color="blue" icon={Activity} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                  <div className="lg:col-span-2 space-y-10">
                    <Card className="border-none shadow-xl rounded-[2.5rem] bg-gradient-to-br from-[#024B7D] to-[#01335A] text-white overflow-hidden relative group">
                      <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:scale-110 transition-transform duration-700">
                        <GraduationCap className="h-40 w-40" />
                      </div>
                      <CardHeader className="p-10 pb-0 flex flex-row items-center gap-4">
                        <div className="h-10 w-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center"><Activity className="h-5 w-5" /></div>
                        <CardTitle className="text-2xl font-bold">{t('next_eval')}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-10 pt-6 space-y-8 relative z-10">
                        <div className="grid grid-cols-3 gap-10">
                          <div className="space-y-1">
                            <p className="text-[10px] font-black text-white/50 uppercase tracking-widest">Fin prévue</p>
                            <p className="text-xl font-black">{profile?.end_date || '...'}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-[10px] font-black text-white/50 uppercase tracking-widest">Type</p>
                            <p className="text-xl font-black">PFE</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-[10px] font-black text-white/50 uppercase tracking-widest">Jours Restants</p>
                            <p className="text-xl font-black text-emerald-400">52 Jours</p>
                          </div>
                        </div>
                        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-400 w-[75%]" />
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
                        <ProfileInfo label="ÉTABLISSEMENT" value={profile?.etablissement || 'Université Abdelmalek Essaâdi'} />
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-10">
                    <Card className="border-none shadow-xl rounded-[2.5rem] bg-white dark:bg-slate-900 overflow-hidden p-10 text-center">
                      <div className="h-20 w-20 mx-auto rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 mb-6">
                        <MessageSquare className="h-10 w-10" />
                      </div>
                      <h4 className="text-xl font-black text-slate-900 dark:text-white mb-2">Feedback Encadrant</h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed italic">"Bonne progression sur le module de gestion des dossiers. Continuez l'effort sur la partie documentation technique."</p>
                    </Card>
                  </div>
                </div>
              </div>
            )}

            {/* SECTION: MES DOCUMENTS */}
            {activeSection === 'actes' && (
              <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <header className="flex justify-between items-end">
                  <div>
                    <h2 className="text-4xl font-black text-slate-900 tracking-tight">Mes Documents</h2>
                    <p className="text-slate-500 text-lg mt-1 font-medium">Historique de vos conventions, attestations et rapports.</p>
                  </div>
                  <Button onClick={() => setIsUploadOpen(true)} className="bg-blue-600 hover:bg-blue-700 rounded-2xl h-14 px-8 font-bold text-white shadow-lg shadow-blue-600/20">
                    <Send className="h-5 w-5 mr-3" /> Déposer un document
                  </Button>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="md:col-span-2">
                    <Card className="border-none shadow-sm rounded-[2.5rem] bg-white overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="bg-slate-50 border-b border-slate-100">
                              <th className="p-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Titre du document</th>
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
                                <td className="p-8">{getStatusBadge(doc.status)}</td>
                                <td className="p-8 text-right">
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-10 w-10 text-slate-400 hover:text-blue-600"
                                  >
                                    <Download className="h-5 w-5" />
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </Card>
                  </div>
                  <div className="space-y-8">
                    <Card className="border-none shadow-sm rounded-[2.5rem] bg-[#024B7D] text-white p-10">
                      <CardTitle className="text-xl font-black mb-6">Pièces à fournir</CardTitle>
                      <div className="space-y-4">
                        <RequestType label="Convention Signée" count={1} icon={CheckCircle} />
                        <RequestType label="Assurance Stage" count={1} icon={CheckCircle} />
                        <RequestType label="Copie CNIE" count={1} icon={CheckCircle} />
                        <RequestType label="Rapport Final" count={0} icon={Clock} />
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            )}

            {/* SECTION: MON STAGE */}
            {activeSection === 'carriere' && (
              <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <header>
                  <h2 className="text-4xl font-black text-slate-900 tracking-tight">Mon Stage</h2>
                  <p className="text-slate-500 text-lg mt-1 font-medium">Suivi chronologique de votre parcours au sein de la commune.</p>
                </header>

                <Card className="border-none shadow-sm rounded-[2.5rem] bg-white p-12">
                  <div className="relative space-y-16 before:absolute before:inset-0 before:ml-10 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-blue-600 before:via-slate-100 before:to-transparent">
                    {stageTimeline.length > 0 ? stageTimeline.map((item, idx) => (
                      <div key={item.id} className="relative flex items-center justify-between md:justify-start md:odd:flex-row-reverse group">
                        <div className="flex items-center justify-center w-20 h-20 rounded-3xl border-8 border-white bg-blue-600 text-white shadow-xl z-10 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-transform group-hover:scale-110">
                          <History className="h-8 w-8" />
                        </div>
                        <div className="w-[calc(100%-6rem)] md:w-[calc(50%-4rem)] p-10 rounded-[2.5rem] bg-slate-50 group-hover:bg-blue-50 transition-all border border-transparent group-hover:border-blue-100 shadow-sm">
                          <time className="text-[10px] font-black uppercase tracking-widest text-blue-600 block mb-3">{new Date(item.date).toLocaleDateString()}</time>
                          <h3 className="text-2xl font-black text-slate-900">{item.title}</h3>
                          <p className="text-slate-500 text-sm mt-3 leading-relaxed">{item.description}</p>
                          <div className="mt-6 flex gap-2">
                            <Badge className="bg-blue-100 text-blue-600 border-none font-bold uppercase text-[10px]">Validé</Badge>
                            <Badge variant="outline" className="text-slate-400 font-bold uppercase text-[10px]">Interne</Badge>
                          </div>
                        </div>
                      </div>
                    )) : (
                      <div className="p-20 text-center text-slate-400 italic">Aucun historique de stage disponible pour le moment.</div>
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
                      <Button onClick={() => setIsPasswordOpen(true)} variant="outline" className="w-full justify-between rounded-[1.5rem] h-16 px-8 border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-900 dark:text-white font-bold">
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

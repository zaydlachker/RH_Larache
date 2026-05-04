import React, { useState, useEffect } from 'react';
import { 
  Users, Briefcase, FileText, BarChart, Settings, Bell, 
  Search, Plus, Filter, ArrowUpRight, TrendingUp, Clock, Loader2, Trash2, Edit, Check, X, LogOut, LayoutDashboard,
  Megaphone, Activity, UserPlus, MoreVertical, ExternalLink, Calendar, Mail, Shield, ChevronRight, UserCheck, UserX
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useTranslation } from '../i18n';

// --- MOCK DATA ---
const INITIAL_USERS = [
  { id: 1, name: 'Admin Principal', email: 'admin@gmail.com', role: 'Administrateur', avatar: 'AD', status: 'accepted' },
  { id: 2, name: 'Sami Alami', email: 'sami.alami@larache.ma', role: 'Candidat', avatar: 'SA', status: 'accepted' },
  { id: 3, name: 'Nadia Benani', email: 'nadia.b@larache.ma', role: 'Candidat', avatar: 'NB', status: 'accepted' },
  { id: 4, name: 'Karim Tazi', email: 'k.tazi@gmail.com', role: 'Candidat', avatar: 'KT', status: 'accepted' },
];

const INITIAL_ANNONCES = [
  { id: 1, title: 'Concours de Médecins 1er Grade', description: 'Ouverture du concours pour le recrutement de 5 médecins.', date: '2026-05-10', status: 'Publié' },
  { id: 2, title: 'Avis de Recrutement Infirmiers', description: 'Recrutement de 15 infirmiers pour les centres de santé.', date: '2026-05-12', status: 'Brouillon' },
];

const INITIAL_ACTUALITES = [
  { id: 1, title: 'Lancement du Portail e-RH', content: 'Le nouveau portail est désormais accessible à tous les citoyens.', date: '2026-05-01' },
  { id: 2, title: 'Inauguration du Centre Administratif', content: 'Un nouveau centre pour faciliter les démarches RH.', date: '2026-04-28' },
];

const RECENT_ACTIVITIES = [
  { id: 1, action: 'Nouvel utilisateur inscrit', user: 'Karim Tazi', time: 'il y a 5 min' },
  { id: 2, action: 'Concours publié', user: 'Admin', time: 'il y a 20 min' },
  { id: 3, action: 'Candidature reçue', user: 'Nadia Benani', time: 'il y a 1 heure' },
];

export default function AdminDashboard() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [loading, setLoading] = useState(false);

  // Strict route check: Only allow rendering on /admin
  if (location.pathname !== '/admin') {
    return null;
  }

  // --- STATE FOR MOCK DATA ---
  const [users, setUsers] = useState(INITIAL_USERS);
  const [annonces, setAnnonces] = useState(INITIAL_ANNONCES);
  const [actualites, setActualites] = useState(INITIAL_ACTUALITES);
  
  // Form and Edit states
  const [newAnnonce, setNewAnnonce] = useState({ title: '', description: '' });
  const [newActu, setNewActu] = useState({ title: '', content: '' });
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Candidat' });
  const [notifications, setNotifications] = useState<any[]>([]);
  const [candidatures, setCandidatures] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [concours, setConcours] = useState<any[]>([]);
  const [newConcours, setNewConcours] = useState({ title: '', description: '', date: '' });

  // Load from localStorage
  useEffect(() => {
    const storedNotifs = JSON.parse(localStorage.getItem('notifications') || '[]');
    setNotifications(storedNotifs);
    
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    if (storedUsers.length > 0) {
      const initialEmails = new Set(INITIAL_USERS.map(u => u.email));
      const filteredStored = storedUsers.filter((u: any) => !initialEmails.has(u.email));
      const mappedStored = filteredStored.map((u: any) => ({
        ...u,
        avatar: u.avatar || u.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().substring(0, 2)
      }));
      setUsers([...INITIAL_USERS, ...mappedStored]);
    }

    const storedAnnonces = JSON.parse(localStorage.getItem('annonces') || '[]');
    if (storedAnnonces.length > 0) setAnnonces(storedAnnonces);

    const storedActualites = JSON.parse(localStorage.getItem('actualites') || '[]');
    if (storedActualites.length > 0) setActualites(storedActualites);

    const storedConcours = JSON.parse(localStorage.getItem('concours') || '[]');
    setConcours(storedConcours);

    const storedCandidatures = JSON.parse(localStorage.getItem('candidatures') || '[]');
    setCandidatures(storedCandidatures);
  }, []);

  // Sync users to localStorage
  useEffect(() => {
    const dynamicUsers = users.filter(u => u.id > 10);
    if (dynamicUsers.length > 0) {
      localStorage.setItem('users', JSON.stringify(dynamicUsers));
    }
  }, [users]);

  // Sync notifications to localStorage
  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Sync annonces to localStorage
  useEffect(() => {
    localStorage.setItem('annonces', JSON.stringify(annonces));
  }, [annonces]);

  // Sync actualites to localStorage
  useEffect(() => {
    localStorage.setItem('actualites', JSON.stringify(actualites));
  }, [actualites]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login/admin');
  };

  // --- HANDLERS ---
  const saveAnnonce = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnnonce.title) return;
    
    if (editingId) {
      // Update Annonce
      const updatedAnnonces = annonces.map(a => a.id === editingId ? { ...a, ...newAnnonce } : a);
      setAnnonces(updatedAnnonces);
      
      // Sync with Actualités: Update existing or add if missing
      const updatedActualites = actualites.map(actu => 
        (actu.annonceId === editingId) ? { ...actu, title: newAnnonce.title, content: newAnnonce.description } : actu
      );
      setActualites(updatedActualites);
      
      setEditingId(null);
    } else {
      const id = Date.now();
      const item = { id, ...newAnnonce, date: new Date().toISOString().split('T')[0], status: 'Publié' };
      setAnnonces([item, ...annonces]);
      
      // Auto-add to Actualités
      const actuItem = {
        id: Date.now() + 1,
        annonceId: id, // Link to source
        title: newAnnonce.title,
        content: newAnnonce.description,
        date: new Date().toISOString().split('T')[0]
      };
      setActualites([actuItem, ...actualites]);
    }
    setNewAnnonce({ title: '', description: '' });
  };

  const saveActualite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newActu.title) return;
    if (editingId) {
      setActualites(actualites.map(a => a.id === editingId ? { ...a, ...newActu } : a));
      setEditingId(null);
    } else {
      setActualites([{ id: Date.now(), ...newActu, date: new Date().toISOString().split('T')[0] }, ...actualites]);
    }
    setNewActu({ title: '', content: '' });
  };

  const saveUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) return;
    const avatar = newUser.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
    if (editingId) {
      setUsers(users.map(u => u.id === editingId ? { ...u, ...newUser, avatar } : u));
      setEditingId(null);
    } else {
      setUsers([{ id: Date.now(), ...newUser, avatar }, ...users]);
    }
    setNewUser({ name: '', email: '', role: 'Candidat' });
  };

  const saveConcours = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newConcours.title) return;

    if (editingId) {
      const updated = concours.map(c => c.id === editingId ? { ...c, ...newConcours } : c);
      setConcours(updated);
      localStorage.setItem('concours', JSON.stringify(updated));
      setEditingId(null);
    } else {
      const item = { id: Date.now(), ...newConcours };
      const updated = [item, ...concours];
      setConcours(updated);
      localStorage.setItem('concours', JSON.stringify(updated));
    }
    setNewConcours({ title: '', description: '', date: '' });
  };

  const deleteConcours = (id: number) => {
    if (!window.confirm('Supprimer ce concours ?')) return;
    const updated = concours.filter(c => c.id !== id);
    setConcours(updated);
    localStorage.setItem('concours', JSON.stringify(updated));
  };

  const deleteCandidature = (id: number) => {
    if (!window.confirm('Supprimer cette candidature ?')) return;
    const updated = candidatures.filter(c => c.id !== id);
    setCandidatures(updated);
    localStorage.setItem('candidatures', JSON.stringify(updated));
  };

  const deleteItem = (id: number, type: 'annonces' | 'actualites' | 'users' | 'notifications') => {
    if (!window.confirm('Confirmer la suppression ?')) return;
    if (type === 'annonces') setAnnonces(annonces.filter(a => a.id !== id));
    else if (type === 'actualites') setActualites(actualites.filter(a => a.id !== id));
    else if (type === 'users') setUsers(users.filter(u => u.id !== id));
    else if (type === 'notifications') setNotifications(notifications.filter(n => n.id !== id));
    
    if (editingId === id) setEditingId(null);
  };

  const startEdit = (item: any, type: 'annonces' | 'actualites' | 'users' | 'concours') => {
    setEditingId(item.id);
    if (type === 'annonces') {
      setNewAnnonce({ title: item.title, description: item.description });
      setActiveSection('annonces');
    } else if (type === 'actualites') {
      setNewActu({ title: item.title, content: item.content });
      setActiveSection('actualites');
    } else if (type === 'concours') {
      setNewConcours({ title: item.title, description: item.description, date: item.date });
      setActiveSection('concours');
    } else {
      setNewUser({ name: item.name, email: item.email, role: item.role });
      setActiveSection('users');
    }
  };

  const updateUserStatus = (id: number, status: 'accepted' | 'blocked') => {
    setUsers(users.map(u => u.id === id ? { ...u, status } : u));
  };

  const SidebarItem = ({ id, label, icon: Icon }: any) => (
    <button
      onClick={() => setActiveSection(id)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
        activeSection === id 
        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
        : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
      }`}
    >
      <Icon className={`h-5 w-5 ${activeSection === id ? 'text-white' : 'text-slate-400'}`} />
      {label}
    </button>
  );

  const pendingUsers = users.filter(u => u.status === 'pending');

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 font-sans">
      <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col sticky top-0 h-screen z-20">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-900 dark:text-white tracking-tighter">Larache <span className="text-blue-600">RH</span></h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Admin Portal</p>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 mt-4">
          <SidebarItem id="dashboard" label="Dashboard" icon={LayoutDashboard} />
          <SidebarItem id="annonces" label="Annonces" icon={Megaphone} />
          <SidebarItem id="concours" label="Concours" icon={Briefcase} />
          <SidebarItem id="candidatures" label="Candidatures" icon={FileText} />
          <SidebarItem id="requests" label="User Requests" icon={UserPlus} />
          <SidebarItem id="actualites" label="Actualités" icon={FileText} />
          <SidebarItem id="users" label="Users" icon={Users} />
          <button
            onClick={() => setActiveSection('notifications')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
              activeSection === 'notifications' 
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
              : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Bell className={`h-5 w-5 ${activeSection === 'notifications' ? 'text-white' : 'text-slate-400'}`} />
            Notifications
          </button>
        </nav>

        <div className="p-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
          <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">AD</div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold truncate text-slate-900 dark:text-white">Administrateur</p>
              <p className="text-[10px] text-slate-500 truncate">admin@larache.ma</p>
            </div>
          </div>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
            <LogOut className="h-5 w-5" /> Déconnexion
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in duration-500">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight capitalize">
                {activeSection === 'dashboard' ? 'Tableau de bord' : activeSection.replace('-', ' ')}
              </h2>
              <p className="text-slate-500 dark:text-slate-400 mt-1">
                {activeSection === 'dashboard' && "Surveillez l'activité de votre plateforme e-RH en temps réel."}
                {activeSection === 'annonces' && "Gérez les annonces et les avis de recrutement."}
                {activeSection === 'concours' && "Gérez les concours officiels et les liens de postulation."}
                {activeSection === 'candidatures' && "Consultez et traitez les dossiers de candidature reçus."}
                {activeSection === 'actualites' && "Publiez des actualités pour informer les citoyens."}
                {activeSection === 'users' && "Gérez les comptes utilisateurs et leurs permissions."}
                {activeSection === 'requests' && "Passez en revue les demandes d'inscription des candidats."}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative hidden lg:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input placeholder="Rechercher..." className="pl-10 w-64 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-xl focus:ring-blue-500" />
              </div>
              <Button variant="outline" size="icon" onClick={() => setActiveSection('notifications')} className={`rounded-xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 relative ${activeSection === 'notifications' ? 'border-blue-600 ring-2 ring-blue-500/20' : ''}`}>
                <Bell className="h-5 w-5 text-slate-500" />
              </Button>
            </div>
          </div>

          {activeSection === 'dashboard' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Utilisateurs', value: users.length, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
                { title: 'Candidatures', value: candidatures.length, icon: FileText, color: 'text-purple-600', bg: 'bg-purple-50' },
                { title: 'Concours', value: concours.length, icon: Briefcase, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                { title: 'Actualités', value: actualites.length, icon: Megaphone, color: 'text-orange-600', bg: 'bg-orange-50' },
              ].map((stat, i) => (
                <Card key={i} className="border-none shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                        <stat.icon className="h-6 w-6" />
                      </div>
                      <TrendingUp className="h-4 w-4 text-emerald-500" />
                    </div>
                    <div className="mt-4">
                      <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">{stat.title}</p>
                      <h4 className="text-3xl font-black text-slate-900 dark:text-white mt-1">{stat.value}</h4>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {activeSection === 'annonces' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <Card className="border-none shadow-lg rounded-2xl bg-white dark:bg-slate-900 lg:sticky lg:top-8">
                <form onSubmit={saveAnnonce}>
                  <CardHeader><CardTitle>{editingId ? 'Modifier l\'Annonce' : 'Nouvelle Annonce'}</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2"><Label>Titre</Label><Input value={newAnnonce.title} onChange={e => setNewAnnonce({...newAnnonce, title: e.target.value})} /></div>
                    <div className="space-y-2"><Label>Description</Label><textarea className="w-full min-h-[120px] rounded-xl border border-slate-200 p-3 text-sm" value={newAnnonce.description} onChange={e => setNewAnnonce({...newAnnonce, description: e.target.value})} /></div>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-2">
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">{editingId ? 'Mettre à jour' : 'Publier'}</Button>
                    {editingId && (
                      <Button variant="ghost" className="w-full text-slate-500" onClick={() => { setEditingId(null); setNewAnnonce({title: '', description: ''}); }}>
                        Annuler
                      </Button>
                    )}
                  </CardFooter>
                </form>
              </Card>
              <Card className="lg:col-span-2 border-none shadow-sm rounded-2xl bg-white dark:bg-slate-900">
                <div className="divide-y divide-slate-50">
                  {annonces.map(a => (
                    <div key={a.id} className="p-6 flex justify-between items-center group">
                      <div><h4 className="font-bold">{a.title}</h4><p className="text-sm text-slate-500">{a.description}</p></div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" onClick={() => startEdit(a, 'annonces')} className="text-slate-400 hover:text-blue-600"><Edit className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => deleteItem(a.id, 'annonces')} className="text-slate-400 hover:text-red-600"><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {activeSection === 'concours' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <Card className="border-none shadow-lg rounded-2xl bg-white dark:bg-slate-900">
                <form onSubmit={saveConcours}>
                  <CardHeader><CardTitle>{editingId ? 'Modifier le Concours' : 'Ajouter Concours'}</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2"><Label>Titre</Label><Input value={newConcours.title} onChange={e => setNewConcours({...newConcours, title: e.target.value})} /></div>
                    <div className="space-y-2"><Label>Description</Label><textarea className="w-full min-h-[100px] rounded-xl border border-slate-200 p-3 text-sm" value={newConcours.description} onChange={e => setNewConcours({...newConcours, description: e.target.value})} /></div>
                    <div className="space-y-2"><Label>Date</Label><Input type="date" value={newConcours.date} onChange={e => setNewConcours({...newConcours, date: e.target.value})} /></div>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-2">
                    <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">{editingId ? 'Mettre à jour' : 'Créer'}</Button>
                    {editingId && (
                      <Button variant="ghost" className="w-full text-slate-500" onClick={() => { setEditingId(null); setNewConcours({title: '', description: '', date: ''}); }}>
                        Annuler
                      </Button>
                    )}
                  </CardFooter>
                </form>
              </Card>
              <Card className="lg:col-span-2 border-none shadow-sm rounded-2xl bg-white dark:bg-slate-900">
                <div className="divide-y divide-slate-50">
                  {concours.map(c => (
                    <div key={c.id} className="p-6 flex justify-between items-center group">
                      <div className="space-y-1">
                        <h4 className="font-bold">{c.title}</h4>
                        <p className="text-sm text-slate-500">{c.description}</p>
                        <a href={`/postuler/${c.id}`} target="_blank" className="text-[10px] font-bold text-emerald-600 uppercase">Lien: /postuler/{c.id}</a>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" onClick={() => startEdit(c, 'concours')} className="text-slate-400 hover:text-emerald-600"><Edit className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => deleteConcours(c.id)} className="text-slate-400 hover:text-red-600"><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {activeSection === 'candidatures' && (
            <Card className="border-none shadow-sm rounded-2xl bg-white dark:bg-slate-900 overflow-hidden">
              <CardHeader className="border-b border-slate-50">
                <CardTitle>Dossiers Reçus</CardTitle>
                <CardDescription>Visualisez les candidatures soumises via le portail public.</CardDescription>
              </CardHeader>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50/50 text-[10px] uppercase font-black text-slate-400">
                    <tr><th className="px-6 py-4">Candidat</th><th className="px-6 py-4">Concours</th><th className="px-6 py-4">Message</th><th className="px-6 py-4">Date</th><th className="px-6 py-4 text-right">Actions</th></tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {candidatures.map(c => (
                      <tr key={c.id} className="hover:bg-slate-50/50">
                        <td className="px-6 py-6">
                          <p className="font-bold text-sm">{c.name}</p>
                          <p className="text-[11px] text-slate-500">{c.email}</p>
                        </td>
                        <td className="px-6 py-6"><Badge variant="outline" className="text-blue-600 bg-blue-50 border-blue-100">{c.concoursTitle} (ID: {c.concoursId})</Badge></td>
                        <td className="px-6 py-6 text-sm text-slate-500 max-w-xs truncate">{c.message || '—'}</td>
                        <td className="px-6 py-6 text-xs text-slate-400">{new Date(c.date).toLocaleDateString()}</td>
                        <td className="px-6 py-6 text-right"><Button variant="ghost" size="icon" onClick={() => deleteCandidature(c.id)} className="text-red-400 hover:text-red-600"><Trash2 className="h-4 w-4" /></Button></td>
                      </tr>
                    ))}
                    {candidatures.length === 0 && <tr><td colSpan={5} className="p-20 text-center text-slate-400 italic">Aucune candidature reçue.</td></tr>}
                  </tbody>
                </table>
              </div>
            </Card>
          )}

          {activeSection === 'requests' && (
            <Card className="border-none shadow-sm rounded-2xl bg-white dark:bg-slate-900">
              <CardHeader className="border-b border-slate-50 flex flex-row items-center justify-between">
                <div><CardTitle>Demandes d'inscription</CardTitle></div>
                <Badge className="bg-orange-100 text-orange-600 border-none">{pendingUsers.length} en attente</Badge>
              </CardHeader>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <tbody className="divide-y divide-slate-50">
                    {pendingUsers.map(u => (
                      <tr key={u.id} className="hover:bg-slate-50 transition-all">
                        <td className="p-6 flex items-center gap-4">
                          <div className="h-10 w-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center font-bold">{u.avatar}</div>
                          <div><p className="font-bold text-sm">{u.name}</p><p className="text-xs text-slate-500">{u.email}</p></div>
                        </td>
                        <td className="p-6 text-right space-x-2">
                          <Button variant="ghost" size="sm" className="text-emerald-600" onClick={() => updateUserStatus(u.id, 'accepted')}><UserCheck className="h-4 w-4 mr-2" /> Accepter</Button>
                          <Button variant="ghost" size="sm" className="text-red-600" onClick={() => updateUserStatus(u.id, 'blocked')}><UserX className="h-4 w-4 mr-2" /> Bloquer</Button>
                        </td>
                      </tr>
                    ))}
                    {pendingUsers.length === 0 && <tr><td className="p-20 text-center text-slate-400 italic">Toutes les demandes ont été traitées.</td></tr>}
                  </tbody>
                </table>
              </div>
            </Card>
          )}

          {activeSection === 'users' && (
            <Card className="border-none shadow-sm rounded-2xl bg-white dark:bg-slate-900 overflow-hidden">
              <CardHeader className="border-b border-slate-50"><CardTitle>Tous les Utilisateurs</CardTitle></CardHeader>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <tbody className="divide-y divide-slate-50">
                    {users.map(u => (
                      <tr key={u.id} className="hover:bg-slate-50">
                        <td className="p-6 flex items-center gap-4">
                          <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">{u.avatar}</div>
                          <div><p className="font-bold text-sm">{u.name}</p><p className="text-xs text-slate-500">{u.email}</p></div>
                        </td>
                        <td className="p-6"><Badge variant="outline">{u.role}</Badge></td>
                        <td className="p-6 text-right">
                          <div className="flex justify-end gap-1">
                            <Button variant="ghost" size="icon" onClick={() => deleteItem(u.id, 'users')} className="text-slate-300 hover:text-red-600"><Trash2 className="h-4 w-4" /></Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}

          {activeSection === 'actualites' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <Card className="border-none shadow-lg rounded-2xl bg-white dark:bg-slate-900">
                <form onSubmit={saveActualite}>
                  <CardHeader><CardTitle>{editingId ? 'Modifier l\'Actualité' : 'Nouvelle Actualité'}</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2"><Label>Titre</Label><Input value={newActu.title} onChange={e => setNewActu({...newActu, title: e.target.value})} /></div>
                    <div className="space-y-2"><Label>Contenu</Label><textarea className="w-full min-h-[120px] rounded-xl border border-slate-200 p-3 text-sm" value={newActu.content} onChange={e => setNewActu({...newActu, content: e.target.value})} /></div>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-2">
                    <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700">{editingId ? 'Mettre à jour' : 'Publier'}</Button>
                    {editingId && (
                      <Button variant="ghost" className="w-full text-slate-500" onClick={() => { setEditingId(null); setNewActu({title: '', content: ''}); }}>
                        Annuler
                      </Button>
                    )}
                  </CardFooter>
                </form>
              </Card>
              <Card className="lg:col-span-2 border-none shadow-sm rounded-2xl bg-white dark:bg-slate-900">
                <div className="divide-y divide-slate-50">
                  {actualites.map(actu => (
                    <div key={actu.id} className="p-6 flex justify-between items-center group">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold">{actu.title}</h4>
                          {actu.annonceId && <Badge className="bg-blue-100 text-blue-600 border-none text-[8px]">Sync Annonce</Badge>}
                        </div>
                        <p className="text-sm text-slate-500">{actu.content}</p>
                      </div>
                      <div className="flex gap-1">
                        {!actu.annonceId && <Button variant="ghost" size="icon" onClick={() => startEdit(actu, 'actualites')} className="text-slate-400 hover:text-orange-600"><Edit className="h-4 w-4" /></Button>}
                        <Button variant="ghost" size="icon" onClick={() => deleteItem(actu.id, 'actualites')} className="text-slate-400 hover:text-red-600"><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    </div>
                  ))}
                  {actualites.length === 0 && <div className="p-20 text-center text-slate-400 italic">Aucune actualité publiée.</div>}
                </div>
              </Card>
            </div>
          )}

          {activeSection === 'notifications' && (
            <Card className="border-none shadow-sm rounded-2xl bg-white dark:bg-slate-900">
              <CardHeader className="border-b border-slate-50"><CardTitle>Journal des Notifications</CardTitle></CardHeader>
              <div className="divide-y divide-slate-50">
                {notifications.map((n) => (
                  <div key={n.id} className="p-6 flex items-start justify-between group">
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center relative">
                        <Bell className="h-5 w-5" />
                        {!n.read && <span className="absolute -top-1 -right-1 h-3 w-3 bg-blue-500 border-2 border-white rounded-full"></span>}
                      </div>
                      <div>
                        <p className="font-bold text-sm text-slate-900 dark:text-white">{n.message}</p>
                        <p className="text-xs text-slate-500 mt-1">{n.time}</p>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => deleteItem(n.id, 'notifications')}
                      className="text-slate-300 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                {notifications.length === 0 && <div className="p-20 text-center text-slate-400 italic">Aucune notification système.</div>}
              </div>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}

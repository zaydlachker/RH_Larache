import React, { useState, useEffect } from 'react';
import { 
  Users, Shield, LayoutDashboard, LogOut, Search, 
  Trash2, UserCheck, UserX, Settings, BarChart, 
  ChevronRight, ArrowUpRight, TrendingUp, Bell,
  UserPlus, MoreVertical, Landmark, GraduationCap, FileText
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { authApi, getStoredUser } from '../lib/api';

// --- MOCK DATA FOR PRESIDENTIAL CONTROL ---
const ALL_USERS = [
  { id: 1, name: 'Admin Tech', email: 'admin@gmail.com', role: 'admin', avatar: 'AT', status: 'active', grade: 'Principal', service: 'Systèmes' },
  { id: 2, name: 'Sami Alami', email: 'sami.alami@larache.ma', role: 'fonctionnaire', avatar: 'SA', status: 'active', grade: 'Grade 2', service: 'Ressources Humaines' },
  { id: 3, name: 'Nadia Benani', email: 'nadia.b@larache.ma', role: 'candidat', avatar: 'NB', status: 'active', grade: 'N/A', service: 'Externe' },
  { id: 4, name: 'Karim Tazi', email: 'k.tazi@gmail.com', role: 'stagiaire', avatar: 'KT', status: 'active', grade: 'N/A', service: 'Urbanisme' },
  { id: 5, name: 'Fatima Zahra', email: 'f.zahra@larache.ma', role: 'fonctionnaire', avatar: 'FZ', status: 'active', grade: 'Grade 1', service: 'Finances' },
  { id: 6, name: 'Ahmed Mansouri', email: 'a.mansouri@larache.ma', role: 'admin', avatar: 'AM', status: 'active', grade: 'Chef de Service', service: 'Technique' },
];

export default function PresidentDashboard() {
  const navigate = useNavigate();
  const [users, setUsers] = useState(ALL_USERS);
  const [candidatures, setCandidatures] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  // Auth Guard
  const loggedInUser = getStoredUser();

  useEffect(() => {
    if (!loggedInUser || loggedInUser.role !== 'president') {
      navigate('/login/president', { replace: true });
    }
    
    const stored = JSON.parse(localStorage.getItem('candidatures') || '[]');
    setCandidatures(stored);
  }, [loggedInUser, navigate]);

  if (!loggedInUser || loggedInUser.role !== 'president') return null;

  const handleLogout = async () => {
    await authApi.logout();
    navigate('/login/president', { replace: true });
  };

  const deleteUser = (id: number) => {
    if (window.confirm('Voulez-vous vraiment supprimer cet utilisateur ? Cette action est irréversible.')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const deleteCandidature = (id: number) => {
    if (window.confirm('Supprimer cette candidature ?')) {
      const updated = candidatures.filter(c => c.id !== id);
      setCandidatures(updated);
      localStorage.setItem('candidatures', JSON.stringify(updated));
    }
  };

  const handleAvancement = (userId: number) => {
    setUsers(users.map(u => {
      if (u.id === userId) {
        const currentGrade = u.grade || 'Grade 1';
        const nextGrade = currentGrade.includes('Grade') 
          ? `Grade ${parseInt(currentGrade.split(' ')[1]) + 1}`
          : 'Grade Principal';
        return { ...u, grade: nextGrade };
      }
      return u;
    }));
  };

  const handleReclassement = (userId: number, newRole: string) => {
    setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
    if (selectedUser && selectedUser.id === userId) {
      setSelectedUser({ ...selectedUser, role: newRole });
    }
  };

  const toggleUserStatus = (userId: number) => {
    setUsers(users.map(u => u.id === userId ? { ...u, status: u.status === 'active' ? 'suspended' : 'active' } : u));
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-[#f8fafc] dark:bg-slate-950 font-sans">
      {/* ISOLATED SIDEBAR */}
      <aside className="w-72 bg-indigo-950 text-white flex flex-col sticky top-0 h-screen z-50 shadow-2xl">
        <div className="p-8 border-b border-indigo-900/50">
          <div className="flex items-center gap-4 mb-2">
            <div className="h-12 w-12 rounded-2xl bg-indigo-500/20 backdrop-blur-xl border border-indigo-400/30 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Shield className="h-7 w-7 text-indigo-300" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight leading-none uppercase">Présidence</h1>
              <p className="text-[10px] font-bold text-indigo-400 mt-1 tracking-[0.2em] uppercase">Contrôle Suprême</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-6 space-y-2 mt-4">
          <NavItem id="overview" label="Tableau de bord" icon={LayoutDashboard} active={activeTab === 'overview'} onClick={setActiveTab} />
          <NavItem id="users" label="Gestion des Comptes" icon={Users} active={activeTab === 'users'} onClick={setActiveTab} />
          <NavItem id="candidatures" label="Candidatures" icon={FileText} active={activeTab === 'candidatures'} onClick={setActiveTab} />
          <NavItem id="roles" label="Contrôle des Rôles" icon={Shield} active={activeTab === 'roles'} onClick={setActiveTab} />
          <NavItem id="analytics" label="Statistiques Système" icon={BarChart} active={activeTab === 'analytics'} onClick={setActiveTab} />
        </nav>

        <div className="p-6 mt-auto">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-5 mb-6 backdrop-blur-md">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center font-bold text-sm shadow-lg shadow-indigo-500/40">PR</div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold truncate">M. le Président</p>
                <p className="text-[10px] text-indigo-400 truncate tracking-tight uppercase">Autorité Maximale</p>
              </div>
            </div>
            <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold bg-indigo-500 hover:bg-indigo-400 transition-all shadow-lg shadow-indigo-500/20 active:scale-95">
              <LogOut className="h-4 w-4" />
              Déconnexion
            </button>
          </div>
        </div>
      </aside>

      {/* ISOLATED MAIN CONTENT */}
      <main className="flex-1 p-10 lg:p-16 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-2">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-widest mb-2 border border-indigo-200 dark:border-indigo-800">
                <span className="h-2 w-2 rounded-full bg-indigo-600 mr-2 animate-pulse" />
                Session Présidentielle Active
              </div>
              <h2 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">
                Panneau de <span className="text-indigo-600">Contrôle</span>
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-lg font-medium max-w-2xl">
                Supervision totale et gestion centralisée de l'ensemble des utilisateurs et administrateurs du système RH.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl px-6 py-4 flex items-center gap-4 shadow-sm">
                <div className="text-right">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date Session</p>
                  <p className="text-sm font-black text-slate-900 dark:text-white">{new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
                <Bell className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
          </header>

          {activeTab === 'overview' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <StatBox title="Total Utilisateurs" value={users.length} icon={Users} color="indigo" />
                <StatBox title="Candidatures" value={candidatures.length} icon={FileText} color="purple" />
                <StatBox title="Stagiaires" value={users.filter(u => u.role === 'stagiaire').length} icon={GraduationCap} color="blue" />
                <StatBox title="Administrateurs" value={users.filter(u => u.role === 'admin').length} icon={Shield} color="red" />
              </div>

              <Card className="border-none shadow-2xl shadow-indigo-500/5 rounded-[2.5rem] bg-white dark:bg-slate-900 overflow-hidden">
                <CardHeader className="p-10 pb-4 flex flex-row items-center justify-between border-b border-slate-50 dark:border-slate-800">
                  <div>
                    <CardTitle className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Utilisateurs sous surveillance</CardTitle>
                    <CardDescription className="text-slate-500 mt-1">Dernières activités et comptes actifs du système.</CardDescription>
                  </div>
                  <Button variant="outline" className="rounded-2xl border-slate-200" onClick={() => setActiveTab('users')}>Tout voir</Button>
                </CardHeader>
                <div className="p-4">
                  <div className="divide-y divide-slate-50 dark:divide-slate-800">
                    {users.slice(0, 5).map(u => (
                      <div key={u.id} className="p-6 flex items-center justify-between group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors rounded-2xl">
                        <div className="flex items-center gap-5">
                          <div className={`h-14 w-14 rounded-2xl flex items-center justify-center font-bold text-lg shadow-inner ${
                            u.role === 'admin' ? 'bg-red-50 text-red-600' : 
                            u.role === 'fonctionnaire' ? 'bg-emerald-50 text-emerald-600' :
                            'bg-blue-50 text-blue-600'
                          }`}>
                            {u.avatar}
                          </div>
                          <div>
                            <p className="font-black text-slate-900 dark:text-white">{u.name}</p>
                            <p className="text-sm text-slate-500">{u.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-8">
                          <Badge className={`px-4 py-1.5 rounded-full border-none font-bold uppercase text-[10px] tracking-widest ${
                            u.role === 'admin' ? 'bg-red-100 text-red-600' : 
                            u.role === 'fonctionnaire' ? 'bg-emerald-100 text-emerald-600' :
                            'bg-blue-100 text-blue-600'
                          }`}>
                            {u.role}
                          </Badge>
                          <ChevronRight className="h-5 w-5 text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </>
          )}

          {activeTab === 'users' && (
            <Card className="border-none shadow-2xl shadow-indigo-500/5 rounded-[2.5rem] bg-white dark:bg-slate-900 overflow-hidden">
              <CardHeader className="p-10 border-b border-slate-50 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-1">
                  <CardTitle className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Gestion des Comptes</CardTitle>
                  <p className="text-slate-500">Contrôlez et gérez l'accès de tous les membres de la plateforme.</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <Input 
                      placeholder="Rechercher par nom, email ou rôle..." 
                      className="pl-12 w-full md:w-64 h-14 rounded-2xl bg-slate-50 border-none shadow-inner" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button className="h-14 px-8 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold shadow-lg shadow-red-600/20" onClick={() => {
                    const name = prompt('Nom de l\'admin:');
                    const email = prompt('Email de l\'admin:');
                    if (name && email) {
                      setUsers([{ id: Date.now(), name, email, role: 'admin', avatar: name.substring(0,2).toUpperCase(), status: 'active', grade: 'Administrateur', service: 'Administration' }, ...users]);
                    }
                  }}>
                    <UserPlus className="h-5 w-5 mr-2" /> Nouvel Admin
                  </Button>
                </div>
              </CardHeader>

              {selectedUser && (
                <div className="p-10 bg-indigo-50/50 border-y border-indigo-100 animate-in slide-in-from-top duration-300">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-6">
                      <div className="h-20 w-20 rounded-3xl bg-white shadow-xl flex items-center justify-center text-3xl font-black text-indigo-600 border-4 border-indigo-100">
                        {selectedUser.avatar}
                      </div>
                      <div>
                        <h3 className="text-2xl font-black text-slate-900 leading-none mb-2">{selectedUser.name}</h3>
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                          <Shield className="h-4 w-4" /> Contrôle Reclassement
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4">
                      <div className="space-y-1">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nouveau Rôle</p>
                        <div className="flex bg-white p-1.5 rounded-2xl shadow-inner gap-1">
                          {['admin', 'fonctionnaire', 'stagiaire'].map(role => (
                            <Button 
                              key={role} 
                              size="sm" 
                              variant={selectedUser.role === role ? 'default' : 'ghost'}
                              className={`h-9 px-4 rounded-xl text-[10px] font-bold uppercase transition-all ${
                                selectedUser.role === role ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-500'
                              }`}
                              onClick={() => handleReclassement(selectedUser.id, role)}
                            >
                              {role}
                            </Button>
                          ))}
                        </div>
                      </div>
                      <Button variant="outline" className="h-12 px-6 rounded-2xl border-slate-200 text-slate-500 font-bold hover:bg-slate-100" onClick={() => setSelectedUser(null)}>Fermer</Button>
                    </div>
                  </div>
                </div>
              )}

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50/80 dark:bg-slate-800/50 text-[11px] uppercase font-black text-slate-400 tracking-[0.1em]">
                    <tr>
                      <th className="px-10 py-6">Identité & Service</th>
                      <th className="px-10 py-6">Rôle & Grade</th>
                      <th className="px-10 py-6">Contrôle Carrière</th>
                      <th className="px-10 py-6 text-right">Actions Autorité</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {filteredUsers.map(u => (
                      <tr key={u.id} className="hover:bg-indigo-50/30 dark:hover:bg-indigo-900/10 transition-colors">
                        <td className="px-10 py-8">
                          <div className="flex items-center gap-5">
                            <div className={`h-12 w-12 rounded-xl flex items-center justify-center font-bold shadow-sm ${
                              u.role === 'admin' ? 'bg-red-50 text-red-600' : 'bg-slate-100 text-slate-600'
                            }`}>{u.avatar}</div>
                            <div>
                              <p className="font-bold text-slate-900 dark:text-white">{u.name}</p>
                              <p className="text-xs text-slate-500 font-medium uppercase tracking-tighter">{u.service || 'Non assigné'}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-10 py-8">
                          <div className="space-y-1">
                            <Badge variant="outline" className={`px-3 py-0.5 rounded-lg text-[9px] font-black uppercase ${
                              u.role === 'admin' ? 'border-red-200 text-red-600 bg-red-50' : 'border-slate-200'
                            }`}>{u.role}</Badge>
                            <p className="text-[10px] font-bold text-indigo-600">{u.grade || 'N/A'}</p>
                          </div>
                        </td>
                        <td className="px-10 py-8">
                          <div className="flex gap-2">
                            {u.role !== 'admin' ? (
                              <>
                                <Button variant="outline" size="sm" className="h-7 text-[9px] px-2 rounded-lg border-indigo-200 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all" onClick={() => handleAvancement(u.id)}>Avancement</Button>
                                <Button variant="outline" size="sm" className="h-7 text-[9px] px-2 rounded-lg border-purple-200 text-purple-600 hover:bg-purple-600 hover:text-white transition-all" onClick={() => setSelectedUser(u)}>Reclassement</Button>
                              </>
                            ) : (
                              <Badge variant="outline" className="border-red-200 text-red-600 bg-red-50 text-[9px] font-black uppercase tracking-widest px-3 py-1">Contrôle Admin Direct</Badge>
                            )}
                          </div>
                        </td>
                        <td className="px-10 py-8 text-right space-x-2">
                          <Button variant="ghost" size="sm" className={u.status === 'active' ? 'text-emerald-600' : 'text-amber-600'} onClick={() => toggleUserStatus(u.id)}>
                            {u.status === 'active' ? <UserCheck className="h-4 w-4 mr-1" /> : <UserX className="h-4 w-4 mr-1" />}
                            {u.status === 'active' ? 'Actif' : 'Suspendu'}
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => {
                            if (u.role === 'admin') {
                              const newName = prompt('Nouveau nom:', u.name);
                              const newService = prompt('Nouveau service:', u.service);
                              if (newName || newService) {
                                setUsers(users.map(user => user.id === u.id ? { ...user, name: newName || user.name, service: newService || user.service } : user));
                              }
                            } else {
                              deleteUser(u.id);
                            }
                          }} className="text-slate-400 hover:text-blue-600">
                            {u.role === 'admin' ? <Settings className="h-5 w-5" /> : <Trash2 className="h-5 w-5" />}
                          </Button>
                          {u.role === 'admin' && (
                            <Button variant="ghost" size="icon" onClick={() => deleteUser(u.id)} className="text-slate-300 hover:text-red-600">
                              <Trash2 className="h-5 w-5" />
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}

          {activeTab === 'candidatures' && (
            <Card className="border-none shadow-2xl shadow-indigo-500/5 rounded-[2.5rem] bg-white dark:bg-slate-900 overflow-hidden">
              <CardHeader className="p-10 border-b border-slate-50 dark:border-slate-800">
                <CardTitle className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Candidatures Reçues</CardTitle>
                <p className="text-slate-500">Visualisez et gérez tous les dossiers de candidature soumis au système.</p>
              </CardHeader>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50/80 dark:bg-slate-800/50 text-[11px] uppercase font-black text-slate-400 tracking-[0.1em]">
                    <tr>
                      <th className="px-10 py-6">Candidat</th>
                      <th className="px-10 py-6">Concours</th>
                      <th className="px-10 py-6">Documents</th>
                      <th className="px-10 py-6">Date</th>
                      <th className="px-10 py-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {candidatures.map(c => (
                      <tr key={c.id} className="hover:bg-indigo-50/30 dark:hover:bg-indigo-900/10 transition-colors">
                        <td className="px-10 py-8">
                          <p className="font-bold text-slate-900 dark:text-white">{c.name}</p>
                          <p className="text-xs text-slate-500">{c.email}</p>
                        </td>
                        <td className="px-10 py-8">
                          <Badge variant="outline" className="bg-indigo-50 text-indigo-600 border-indigo-100 text-[10px]">{c.concoursTitle}</Badge>
                        </td>
                        <td className="px-10 py-8">
                          <div className="flex flex-wrap gap-2">
                            {c.documents ? Object.entries(c.documents).map(([key, doc]: [string, any]) => (
                              <Button 
                                key={key} 
                                variant="outline" 
                                size="sm" 
                                className="h-8 text-[10px] px-3 rounded-xl border-indigo-200 text-indigo-600 hover:bg-indigo-600 hover:text-white"
                                onClick={() => {
                                  const link = document.createElement('a');
                                  link.href = doc.content;
                                  link.download = doc.name;
                                  link.click();
                                }}
                              >
                                {key.toUpperCase()}
                              </Button>
                            )) : <span className="text-[10px] text-slate-400">Aucun document</span>}
                          </div>
                        </td>
                        <td className="px-10 py-8 text-sm text-slate-500">{new Date(c.date).toLocaleDateString()}</td>
                        <td className="px-10 py-8 text-right">
                          <Button variant="ghost" size="icon" onClick={() => deleteCandidature(c.id)} className="text-slate-400 hover:text-red-600"><Trash2 className="h-4 w-4" /></Button>
                        </td>
                      </tr>
                    ))}
                    {candidatures.length === 0 && (
                      <tr>
                        <td colSpan={5} className="p-20 text-center text-slate-400 italic">Aucune candidature disponible.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Card>
          )}

          {activeTab === 'roles' && (
            <div className="space-y-8">
              {!selectedRole ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <RoleCard 
                    role="Administrateurs" 
                    count={users.filter(u => u.role === 'admin').length} 
                    color="red" 
                    desc="Contrôle technique et maintenance du système." 
                    onClick={() => setSelectedRole('admin')}
                  />
                  <RoleCard 
                    role="Fonctionnaires" 
                    count={users.filter(u => u.role === 'fonctionnaire').length} 
                    color="emerald" 
                    desc="Gestion des carrières et documents officiels." 
                    onClick={() => setSelectedRole('fonctionnaire')}
                  />
                  <RoleCard 
                    role="Stagiaires" 
                    count={users.filter(u => u.role === 'stagiaire').length} 
                    color="blue" 
                    desc="Suivi des stages et candidatures." 
                    onClick={() => setSelectedRole('stagiaire')}
                  />
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <Button variant="ghost" onClick={() => setSelectedRole(null)} className="text-slate-500 font-bold hover:bg-slate-100 rounded-xl">
                      <ChevronRight className="h-4 w-4 mr-2 rotate-180" /> Retour aux rôles
                    </Button>
                    <Badge className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-xs uppercase font-black tracking-widest">
                      Configuring: {selectedRole}s
                    </Badge>
                  </div>
                  
                  <Card className="border-none shadow-2xl shadow-indigo-500/5 rounded-[2.5rem] bg-white dark:bg-slate-900 overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead className="bg-slate-50/80 dark:bg-slate-800/50 text-[11px] uppercase font-black text-slate-400 tracking-[0.1em]">
                          <tr>
                            <th className="px-10 py-6">Identité & Service</th>
                            <th className="px-10 py-6">Grade</th>
                            <th className="px-10 py-6">Contrôle</th>
                            <th className="px-10 py-6 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                          {users.filter(u => u.role === selectedRole).map(u => (
                            <tr key={u.id} className="hover:bg-indigo-50/30 transition-colors">
                              <td className="px-10 py-8">
                                <div className="flex items-center gap-5">
                                  <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-600">{u.avatar}</div>
                                  <div><p className="font-bold text-slate-900">{u.name}</p><p className="text-[10px] text-slate-500 uppercase">{u.service}</p></div>
                                </div>
                              </td>
                              <td className="px-10 py-8"><span className="text-sm font-bold text-indigo-600">{u.grade}</span></td>
                              <td className="px-10 py-8">
                                {u.role !== 'admin' && (
                                  <div className="flex gap-2">
                                    <Button variant="outline" size="sm" className="h-7 text-[9px] px-2 rounded-lg" onClick={() => handleAvancement(u.id)}>Avancement</Button>
                                  </div>
                                )}
                              </td>
                              <td className="px-10 py-8 text-right space-x-2">
                                <Button variant="ghost" size="sm" className={u.status === 'active' ? 'text-emerald-600' : 'text-amber-600'} onClick={() => toggleUserStatus(u.id)}>{u.status === 'active' ? 'Actif' : 'Suspendu'}</Button>
                                <Button variant="ghost" size="icon" onClick={() => deleteUser(u.id)} className="text-slate-400 hover:text-red-600"><Trash2 className="h-5 w-5" /></Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Card>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function NavItem({ id, label, icon: Icon, active, onClick }: any) {
  return (
    <button
      onClick={() => onClick(id)}
      className={`w-full flex items-center gap-4 px-6 py-4 rounded-[1.25rem] text-sm font-black transition-all duration-300 ${
        active 
        ? 'bg-indigo-500 text-white shadow-xl shadow-indigo-500/30 translate-x-2' 
        : 'text-indigo-300/60 hover:bg-white/5 hover:text-white'
      }`}
    >
      <Icon className={`h-5 w-5 ${active ? 'text-white' : 'text-indigo-400/50'}`} />
      {label}
    </button>
  );
}

function StatBox({ title, value, icon: Icon, color }: any) {
  const colors: any = {
    indigo: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    blue: 'bg-blue-50 text-blue-600 border-blue-100',
    red: 'bg-red-50 text-red-600 border-red-100',
    purple: 'bg-purple-100 text-purple-600 border-purple-200',
  };

  const activeColor = colors[color] || colors.indigo;

  return (
    <Card className="border-none shadow-sm hover:shadow-xl transition-all duration-500 rounded-3xl bg-white dark:bg-slate-900 group">
      <CardContent className="p-8">
        <div className={`h-14 w-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 ${activeColor}`}>
          <Icon className="h-7 w-7" />
        </div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{title}</p>
        <div className="flex items-end justify-between">
          <h4 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">{value}</h4>
          <ArrowUpRight className={`h-6 w-6 ${activeColor.split(' ')[1]} opacity-20`} />
        </div>
      </CardContent>
    </Card>
  );
}

function RoleCard({ role, count, color, desc, onClick }: any) {
  const colors: any = {
    indigo: 'text-indigo-600 bg-indigo-50',
    emerald: 'text-emerald-600 bg-emerald-50',
    blue: 'text-blue-600 bg-blue-50',
    red: 'text-red-600 bg-red-50',
  };

  return (
    <Card className="border-none shadow-sm rounded-3xl bg-white dark:bg-slate-900 p-8 space-y-6 hover:shadow-2xl transition-all duration-500 group">
      <div className={`h-16 w-16 rounded-2xl flex items-center justify-center ${colors[color]} group-hover:scale-110 transition-transform duration-500`}>
        <Shield className="h-8 w-8" />
      </div>
      <div>
        <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{role}</h3>
        <p className="text-sm text-slate-500 mt-2 leading-relaxed">{desc}</p>
      </div>
      <div className="pt-4 flex items-center justify-between border-t border-slate-50 dark:border-slate-800">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{count} Actifs</span>
        <Button variant="ghost" onClick={onClick} className="text-indigo-600 font-bold p-0 hover:bg-transparent">Configurer <ChevronRight className="h-4 w-4 ml-1" /></Button>
      </div>
    </Card>
  );
}

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, FileText, Users, LogOut, Shield, Landmark, 
  Bell, Clock, CheckCircle, XCircle, Mail, Phone, Building2,
  Calendar, ArrowRight, Activity, Search, Trash2, Edit, X, Eye, Send
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

// --- INITIAL MOCK DATA ---
const INITIAL_DOSSIERS = [
  { id: 1, title: 'Demande de congé annuel', status: 'validé', date: '2026-05-01', description: 'Congé pour la période estivale.' },
  { id: 2, title: 'Attestation de travail', status: 'en cours', date: '2026-05-03', description: 'Pour dossier bancaire.' },
  { id: 3, title: 'Prêt social (Aïd)', status: 'refusé', date: '2026-04-20', description: 'Demande de prêt pour fête religieuse.' },
  { id: 4, title: 'Mise à jour situation familiale', status: 'validé', date: '2026-04-15', description: 'Ajout de nouveau né.' },
];

const INITIAL_RH_CONTACTS = [
  { id: 1, name: 'Mohammed Alami', email: 'm.alami@larache.ma', department: 'Gestion des Carrières', bio: 'Expert en gestion administrative des carrières publiques.' },
  { id: 2, name: 'Siham Benali', email: 's.benali@larache.ma', department: 'Paie & Rémunération', bio: 'Responsable du pôle financier et traitement des salaires.' },
  { id: 3, name: 'Youssef Tazi', email: 'y.tazi@larache.ma', department: 'Social & Formation', bio: 'Chargé des affaires sociales et du plan de formation.' },
];

export default function FonctionnaireDashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [dossiers, setDossiers] = useState(INITIAL_DOSSIERS);
  const [rhContacts] = useState(INITIAL_RH_CONTACTS);
  
  // UI States for Modals/Editing
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({ title: '', description: '' });

  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  useEffect(() => {
    if (!user || user.role !== 'fonctionnaire') {
      navigate('/login/fonctionnaire', { replace: true });
    }
  }, [user, navigate]);

  if (!user || user.role !== 'fonctionnaire') return null;

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login', { replace: true });
  };

  // --- ACTIONS ---
  const deleteDossier = (id: number) => {
    if (window.confirm('Voulez-vous vraiment supprimer ce dossier ?')) {
      setDossiers(dossiers.filter(d => d.id !== id));
    }
  };

  const startEdit = (dossier: any) => {
    setSelectedItem(dossier);
    setEditFormData({ title: dossier.title, description: dossier.description || '' });
    setIsEditing(true);
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setDossiers(dossiers.map(d => d.id === selectedItem.id ? { ...d, ...editFormData } : d));
    setIsEditing(false);
    setSelectedItem(null);
  };

  const contactRH = (name: string) => {
    alert(`Message envoyé avec succès à ${name}. Une réponse vous sera adressée par email.`);
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
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 font-sans">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col sticky top-0 h-screen z-20">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-emerald-600 flex items-center justify-center shadow-lg">
            <Landmark className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-slate-900 dark:text-white leading-tight">Espace Pro</h1>
            <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest">Commune Larache</p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2 mt-4">
          <SidebarItem label="Tableau de bord" icon={LayoutDashboard} active={activeSection === 'dashboard'} onClick={() => setActiveSection('dashboard')} />
          <SidebarItem label="Mes Dossiers" icon={FileText} active={activeSection === 'dossiers'} onClick={() => setActiveSection('dossiers')} />
          <SidebarItem label="Annuaire RH" icon={Users} active={activeSection === 'annuaire'} onClick={() => setActiveSection('annuaire')} />
        </nav>

        <div className="p-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
          <div className="bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded-xl flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-xs">{user.name?.charAt(0) || 'F'}</div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold truncate text-slate-900 dark:text-white">{user.name}</p>
              <p className="text-[10px] text-slate-500 truncate uppercase tracking-tighter">Fonctionnaire</p>
            </div>
          </div>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors">
            <LogOut className="h-5 w-5" />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto relative">
        <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in duration-500">
          
          <header className="flex justify-between items-end">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {activeSection === 'dashboard' && `Bonjour, ${user.name}`}
                {activeSection === 'dossiers' && "Mes Dossiers"}
                {activeSection === 'annuaire' && "Annuaire RH"}
              </h2>
              <p className="text-slate-500 mt-1">
                {activeSection === 'dashboard' && "Bienvenue dans votre espace professionnel sécurisé."}
                {activeSection === 'dossiers' && "Suivez l'état d'avancement de vos demandes administratives."}
                {activeSection === 'annuaire' && "Contactez les responsables des ressources humaines."}
              </p>
            </div>
            <Badge variant="outline" className="h-10 px-4 rounded-xl border-slate-200 bg-white text-slate-500 font-bold">
              <Calendar className="h-4 w-4 mr-2" /> {new Date().toLocaleDateString()}
            </Badge>
          </header>

          {/* SECTION: DASHBOARD */}
          {activeSection === 'dashboard' && (
            <div className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="Mes Dossiers" value={dossiers.length} icon={FileText} color="text-emerald-600" bg="bg-emerald-50" />
                <StatCard title="Notifications" value="3" icon={Bell} color="text-blue-600" bg="bg-blue-50" />
                <StatCard title="Status RH" value="Actif" icon={Activity} color="text-purple-600" bg="bg-purple-50" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="border-none shadow-sm rounded-3xl overflow-hidden bg-white">
                  <CardHeader className="pb-4 border-b border-slate-50 flex flex-row items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2"><Clock className="h-5 w-5 text-emerald-600" /> Activité Récente</CardTitle>
                    <Button variant="ghost" size="sm" onClick={() => setActiveSection('dossiers')} className="text-blue-600 text-xs font-bold">Voir plus</Button>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y divide-slate-50">
                      {dossiers.slice(0, 3).map((d) => (
                        <div key={d.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center"><FileText className="h-5 w-5 text-slate-500" /></div>
                            <div>
                              <p className="text-sm font-bold text-slate-900">{d.title}</p>
                              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{d.date}</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon" onClick={() => setSelectedItem(d)} className="h-8 w-8 text-slate-400 hover:text-blue-600"><Eye className="h-4 w-4" /></Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-sm rounded-3xl overflow-hidden bg-emerald-900 text-white">
                  <CardContent className="p-8 space-y-6">
                    <div className="h-12 w-12 rounded-2xl bg-emerald-400/20 flex items-center justify-center"><Shield className="h-7 w-7 text-emerald-400" /></div>
                    <div>
                      <h3 className="text-2xl font-bold">Sécurité & Confidentialité</h3>
                      <p className="text-emerald-100/70 text-sm mt-2 leading-relaxed">Vos données professionnelles sont protégées. Cliquez pour voir les règles de sécurité.</p>
                    </div>
                    <Button variant="outline" onClick={() => alert("Règles de sécurité : \n1. Ne partagez jamais vos identifiants.\n2. Déconnectez-vous systématiquement.")} className="border-emerald-700 text-white hover:bg-emerald-800 rounded-xl w-full">En savoir plus</Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* SECTION: MES DOSSIERS */}
          {activeSection === 'dossiers' && (
            <Card className="border-none shadow-sm rounded-3xl overflow-hidden bg-white">
              <CardHeader className="border-b border-slate-50 flex flex-row items-center justify-between p-8">
                <div>
                  <CardTitle>Liste de mes dossiers</CardTitle>
                  <CardDescription>Consultez l'historique et l'état de vos demandes.</CardDescription>
                </div>
                <Button onClick={() => alert("Fonctionnalité de création de dossier à venir.")} className="bg-emerald-600 hover:bg-emerald-700 rounded-xl">Nouvelle Demande</Button>
              </CardHeader>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-100 text-[10px] uppercase tracking-widest font-black text-slate-400">
                      <th className="px-8 py-4">Titre du dossier</th>
                      <th className="px-8 py-4">Date</th>
                      <th className="px-8 py-4">État</th>
                      <th className="px-8 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {dossiers.map((d) => (
                      <tr key={d.id} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center"><FileText className="h-5 w-5" /></div>
                            <span className="font-bold text-slate-900">{d.title}</span>
                          </div>
                        </td>
                        <td className="px-8 py-6 text-sm text-slate-500">{d.date}</td>
                        <td className="px-8 py-6">{getStatusBadge(d.status)}</td>
                        <td className="px-8 py-6 text-right">
                          <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button variant="ghost" size="icon" onClick={() => setSelectedItem(d)} className="text-slate-400 hover:text-blue-600"><Eye className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="icon" onClick={() => startEdit(d)} className="text-slate-400 hover:text-orange-600"><Edit className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="icon" onClick={() => deleteDossier(d.id)} className="text-slate-400 hover:text-red-600"><Trash2 className="h-4 w-4" /></Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}

          {/* SECTION: ANNUAIRE RH */}
          {activeSection === 'annuaire' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rhContacts.map((rh) => (
                <Card key={rh.id} className="border-none shadow-sm rounded-3xl overflow-hidden bg-white hover:shadow-xl transition-all group">
                  <CardContent className="p-8 space-y-6">
                    <div className="flex justify-between items-start">
                      <div className="h-16 w-16 rounded-3xl bg-blue-50 text-blue-600 flex items-center justify-center font-black text-xl shadow-inner group-hover:scale-110 transition-transform">
                        {rh.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <Badge className="bg-slate-100 text-slate-500 border-none px-3">RH</Badge>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-slate-900">{rh.name}</h4>
                      <p className="text-sm font-bold text-blue-600 mt-1 flex items-center gap-2"><Building2 className="h-4 w-4" /> {rh.department}</p>
                    </div>
                    <Button variant="outline" onClick={() => setSelectedItem({ ...rh, type: 'rh' })} className="w-full rounded-xl border-slate-100 hover:bg-slate-50 text-xs font-bold uppercase tracking-widest text-slate-500">Voir profil</Button>
                    <Button onClick={() => contactRH(rh.name)} className="w-full rounded-xl bg-slate-900 hover:bg-slate-800"><Send className="h-4 w-4 mr-2" /> Contacter</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* MODAL / DETAILS OVERLAY */}
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
            <Card className="w-full max-w-lg border-none shadow-2xl rounded-3xl overflow-hidden animate-in zoom-in-95 duration-300 bg-white">
              <CardHeader className="p-8 border-b border-slate-50 relative">
                <Button variant="ghost" size="icon" onClick={() => { setSelectedItem(null); setIsEditing(false); }} className="absolute right-6 top-6 rounded-full"><X className="h-5 w-5" /></Button>
                <div className="flex items-center gap-4">
                  <div className={`h-14 w-14 rounded-2xl flex items-center justify-center ${selectedItem.type === 'rh' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'}`}>
                    {selectedItem.type === 'rh' ? <Users className="h-7 w-7" /> : <FileText className="h-7 w-7" />}
                  </div>
                  <div>
                    <CardTitle className="text-2xl">{selectedItem.name || selectedItem.title}</CardTitle>
                    <CardDescription>{selectedItem.department || `Dossier #${selectedItem.id}`}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                {isEditing ? (
                  <form onSubmit={handleUpdate} className="space-y-6">
                    <div className="space-y-2">
                      <Label className="text-xs font-bold uppercase text-slate-400">Titre du dossier</Label>
                      <Input value={editFormData.title} onChange={e => setEditFormData({...editFormData, title: e.target.value})} className="h-12 rounded-xl bg-slate-50 border-slate-200" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-bold uppercase text-slate-400">Description / Motif</Label>
                      <textarea className="w-full h-32 rounded-xl bg-slate-50 border border-slate-200 p-4 text-sm" value={editFormData.description} onChange={e => setEditFormData({...editFormData, description: e.target.value})} />
                    </div>
                    <Button type="submit" className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 rounded-xl font-bold">Enregistrer les modifications</Button>
                  </form>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-slate-50 rounded-2xl">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
                        {selectedItem.status ? getStatusBadge(selectedItem.status) : <Badge className="bg-blue-100 text-blue-600 border-none px-3 font-bold uppercase text-[10px]">Contact RH</Badge>}
                      </div>
                      <div className="p-4 bg-slate-50 rounded-2xl">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Date</p>
                        <p className="font-bold text-slate-900">{selectedItem.date || 'Contact Principal'}</p>
                      </div>
                    </div>
                    <div className="p-6 bg-slate-50 rounded-2xl">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Détails / Bio</p>
                      <p className="text-sm text-slate-600 leading-relaxed italic">"{selectedItem.description || selectedItem.bio || 'Aucune information supplémentaire disponible.'}"</p>
                    </div>
                    {selectedItem.type === 'rh' && (
                      <div className="flex flex-col gap-2 pt-2">
                        <Button className="w-full h-12 bg-slate-900 rounded-xl font-bold" onClick={() => contactRH(selectedItem.name)}>Lancer un Chat</Button>
                        <Button variant="ghost" className="w-full h-12 text-slate-500 rounded-xl" onClick={() => alert("Profil détaillé à venir.")}>Exporter Fiche Contact</Button>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}

function SidebarItem({ label, icon: Icon, active = false, onClick }: any) {
  return (
    <button onClick={onClick} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${active ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
      <Icon className={`h-5 w-5 ${active ? 'text-white' : 'text-slate-400'}`} />
      {label}
    </button>
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
          <Activity className="h-4 w-4 text-slate-200" />
        </div>
        <div className="mt-4">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{title}</p>
          <h4 className="text-3xl font-black text-slate-900 mt-1">{value}</h4>
        </div>
      </CardContent>
    </Card>
  );
}

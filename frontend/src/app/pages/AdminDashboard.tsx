import React, { useState, useEffect } from 'react';
import { 
  Users, Briefcase, FileText, BarChart, Settings, Bell, 
  Search, Plus, Filter, ArrowUpRight, TrendingUp, Clock, Loader2, Trash2, Edit, Check, X, LogOut, LayoutDashboard,
  Megaphone, Activity, UserPlus, MoreVertical, ExternalLink, Calendar, Mail, Shield, ChevronRight, UserCheck, UserX, Lock, User
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Separator } from '../components/ui/separator';
import { useTranslation } from '../i18n';
import { concoursApi, fonctionnaireApi, getStoredUser, isAuthenticated, authApi } from '../lib/api';

// --- MOCK DATA ---
const INITIAL_USERS = [
  { id: 1, name: 'Admin Principal', email: 'admin@gmail.com', role: 'Administrateur', avatar: 'AD', status: 'accepted', matricule: 'ADMIN01', cin: 'L123456', grade: 'Administrateur Principal', service: 'RH', date_recrutement: '2020-01-01', birth_date: '1985-05-15', lieu_naissance: 'Larache', telephone: '0612345678', situation_familiale: 'Marié(e)' },
  { id: 2, name: 'Sami Alami', email: 'sami.alami@larache.ma', role: 'Candidat', avatar: 'SA', status: 'accepted', matricule: 'MAT882', cin: 'L99201', grade: 'Technicien 3ème grade', service: 'Travaux', date_recrutement: '2022-03-12', birth_date: '1992-11-20', lieu_naissance: 'Tanger', telephone: '0687654321', situation_familiale: 'Célibataire' },
  { id: 3, name: 'Nadia Benani', email: 'nadia.b@larache.ma', role: 'Candidat', avatar: 'NB', status: 'accepted', matricule: 'MAT443', cin: 'L77382', grade: 'Adjoint Administratif 2ème grade', service: 'Finances', date_recrutement: '2021-06-25', birth_date: '1990-02-10', lieu_naissance: 'Ksar El Kebir', telephone: '0655443322', situation_familiale: 'Marié(e)' },
  { id: 4, name: 'Karim Tazi', email: 'k.tazi@gmail.com', role: 'Candidat', avatar: 'KT', status: 'accepted', matricule: 'MAT112', cin: 'L11029', grade: 'Ingénieur d\'Etat 1er grade', service: 'SI', date_recrutement: '2023-01-10', birth_date: '1995-07-05', lieu_naissance: 'Larache', telephone: '0600112233', situation_familiale: 'Célibataire' },
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

  // AUTH PROTECTION
  useEffect(() => {
    const user = getStoredUser();
    const isAuth = isAuthenticated();
    
    if (!isAuth || !user) {
      navigate('/login/admin', { replace: true });
      return;
    }

    const role = String(user.role).toLowerCase().trim();
    if (role !== 'admin' && role !== 'administrateur') {
      navigate('/login/admin', { replace: true });
      return;
    }
  }, [navigate]);

  // Strict route check: Only allow rendering on authorized admin path
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
  const [newFonctionnaire, setNewFonctionnaire] = useState({
    name: '',
    email: '',
    password: 'password123',
    matricule: '',
    statut: 'Titulaire',
    grade: '',
    echelle: '',
    echelon: '',
    anciennete: '',
    cin: '',
    phone: '',
    date_naissance: '',
    lieu_naissance: '',
    nationalite: 'Marocaine',
    diplome: '',
    department: '',
    position: '',
    hire_date: new Date().toISOString().split('T')[0],
    salary: ''
  });
  const [arretes, setArretes] = useState<any[]>([]);
  const [newArrete, setNewArrete] = useState({ 
    title: '', 
    description: '', 
    employeeId: '', 
    data: { 
      new_grade: '', 
      date_effet: '', 
      echelon: '', 
      indice: '', 
      reference: '',
      diplome: '',
      specialite: ''
    } 
  });
  const [selectedType, setSelectedType] = useState('arrete_avancement');

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

    const fetchAllConcours = async () => {
      try {
        const localConcoursRaw = localStorage.getItem('concours');
        const localConcours = localConcoursRaw ? JSON.parse(localConcoursRaw) : [];
        
        let apiConcours: any[] = [];
        try {
          apiConcours = await concoursApi.getAll();
        } catch (e) {
          console.warn('API Concours unavailable, using local only');
        }

        // Merge and deduplicate by ID
        const merged = [...localConcours];
        apiConcours.forEach(ac => {
          if (!merged.find(lc => lc.id === ac.id)) {
            merged.push({
              id: ac.id,
              title: ac.title,
              description: ac.description,
              date: ac.exam_date || ac.date
            });
          }
        });
        setConcours(merged);
      } catch (err) {
        console.error('Failed to sync concours:', err);
      }
    };
    fetchAllConcours();

    const storedCandidatures = JSON.parse(localStorage.getItem('candidatures') || '[]');
    setCandidatures(storedCandidatures);

    // Fetch real data from backend
    fetch('http://localhost:8000/arretes')
      .then(res => res.json())
      .then(data => setArretes(data))
      .catch(err => console.error('Error fetching arretes:', err));

    const fetchFonctionnaires = async () => {
      try {
        const data = await fonctionnaireApi.getAll();
        if (data && data.length > 0) {
          const mapped = data.map((f: any) => ({
            id: f.id,
            name: f.user.name,
            email: f.user.email,
            matricule: f.matricule,
            grade: f.position || f.grade,
            service: f.department,
            role: 'Fonctionnaire'
          }));
          setUsers(prev => {
            const others = prev.filter(u => u.role !== 'Fonctionnaire');
            return [...others, ...mapped];
          });
        }
      } catch (err) {
        console.error('Error fetching fonctionnaires:', err);
      }
    };
    fetchFonctionnaires();
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

  // Sync arretes to localStorage
  useEffect(() => {
    localStorage.setItem('arretes', JSON.stringify(arretes));
  }, [arretes]);

  const handleLogout = async () => {
    try {
      await authApi.logout();
    } catch (e) {
      console.error('Logout error:', e);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
    navigate('/login/admin', { replace: true });
  };

  // --- HANDLERS ---
  const saveAnnonce = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnnonce.title) return;
    
    if (editingId) {
      // Update Annonce
      const updatedAnnonces = annonces.map(a => a.id === editingId ? { ...a, ...newAnnonce } : a);
      setAnnonces(updatedAnnonces);
      setEditingId(null);
    } else {
      const id = Date.now();
      const item = { id, ...newAnnonce, date: new Date().toISOString().split('T')[0], status: 'Publié' };
      setAnnonces([item, ...annonces]);
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

  const saveFonctionnaire = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFonctionnaire.email || !newFonctionnaire.matricule) return;

    try {
      const data = await fonctionnaireApi.create(newFonctionnaire);
      
      const avatar = newFonctionnaire.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
      const newUserObj = {
        id: data.user_id || Date.now(),
        name: newFonctionnaire.name,
        email: newFonctionnaire.email,
        matricule: newFonctionnaire.matricule,
        grade: newFonctionnaire.grade,
        service: newFonctionnaire.department,
        role: 'Fonctionnaire',
        avatar
      };
      setUsers([newUserObj, ...users]);
      setNewFonctionnaire({
        name: '', email: '', password: 'password123', matricule: '', statut: 'Titulaire',
        grade: '', echelle: '', echelon: '', anciennete: '', cin: '', phone: '',
        date_naissance: '', lieu_naissance: '', nationalite: 'Marocaine',
        diplome: '', department: '', position: '', hire_date: new Date().toISOString().split('T')[0], salary: ''
      });
      alert('Compte Fonctionnaire créé avec succès !');
      setActiveSection('users');
    } catch (err: any) {
      console.error(err);
      const errorMessage = err.response?.data?.errors 
        ? Object.values(err.response.data.errors).flat().join(', ') 
        : (err.response?.data?.message || err.message || 'Impossible de créer le compte');
      alert('Erreur: ' + errorMessage);
    }
  };

  const saveConcours = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newConcours.title) return;

    let updated;
    if (editingId) {
      updated = concours.map(c => c.id === editingId ? { ...c, ...newConcours } : c);
      setConcours(updated);
      setEditingId(null);
    } else {
      const item = { id: Date.now(), ...newConcours };
      updated = [item, ...concours];
      setConcours(updated);
    }
    
    // Persist only the non-API ones (or all if we want admin to be the master)
    // To keep it simple and consistent with Concours.tsx, we save everything to local
    localStorage.setItem('concours', JSON.stringify(updated.filter(c => typeof c.id === 'number' && c.id > 1000000000000)));
    setNewConcours({ title: '', description: '', date: '' });
  };

  const saveArrete = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newArrete.title || !newArrete.employeeId) return;

    const employee = users.find(u => u.id.toString() === newArrete.employeeId);
    if (!employee) return;

    try {
      const payload = {
        employee_id: newArrete.employeeId,
        reference: newArrete.data.reference,
        description: newArrete.description,
        data: newArrete.data
      };

      const response = await fetch(`http://localhost:8000/generate/${selectedType}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        window.open(url, '_blank');
        
        // Refresh list from backend
        fetch('http://localhost:8000/arretes')
          .then(res => res.json())
          .then(data => setArretes(data));

        // Reset form
        setNewArrete({ 
          title: '', 
          description: '', 
          employeeId: '', 
          data: { 
            new_grade: '', 
            date_effet: '', 
            echelon: '', 
            indice: '', 
            reference: '', 
            diplome: '', 
            specialite: '',
            note_taches: '',
            note_rendement: '',
            note: ''
          } 
        });
      }
    } catch (error) {
      console.error('PDF generation error:', error);
    }
  };

  const deleteArrete = (id: number) => {
    if (!window.confirm('Supprimer cet arrete ?')) return;
    setArretes(arretes.filter(a => a.id !== id));
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
          <SidebarItem id="add-fonctionnaire" label="Ajouter Fonctionnaire" icon={UserPlus} />
          <SidebarItem id="requests" label="User Requests" icon={UserPlus} />
          <SidebarItem id="actualites" label="Actualités" icon={FileText} />
          <SidebarItem id="Arretes" label="Arretes" icon={FileText} />
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
                {activeSection === 'Arretes' && "Gérez les arrêtés municipaux et administratifs."}
                {activeSection === 'add-fonctionnaire' && "Inscrivez un nouveau fonctionnaire et générez ses accès."}
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
                    <tr><th className="px-6 py-4">Candidat</th><th className="px-6 py-4">Concours</th><th className="px-6 py-4">Documents</th><th className="px-6 py-4">Message</th><th className="px-6 py-4">Date</th><th className="px-6 py-4 text-right">Actions</th></tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {candidatures.map(c => (
                      <tr key={c.id} className="hover:bg-slate-50/50">
                        <td className="px-6 py-6">
                          <p className="font-bold text-sm">{c.name}</p>
                          <p className="text-[11px] text-slate-500">{c.email}</p>
                        </td>
                        <td className="px-6 py-6"><Badge variant="outline" className="text-blue-600 bg-blue-50 border-blue-100">{c.concoursTitle} (ID: {c.concoursId})</Badge></td>
                        <td className="px-6 py-6">
                          <div className="flex flex-wrap gap-2">
                            {c.documents ? Object.entries(c.documents).map(([key, doc]: [string, any]) => (
                              <Button 
                                key={key} 
                                variant="outline" 
                                size="sm" 
                                className="h-7 text-[9px] px-2 rounded-lg border-slate-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200"
                                onClick={() => {
                                  const link = document.createElement('a');
                                  link.href = doc.content;
                                  link.download = doc.name;
                                  link.click();
                                }}
                              >
                                <ExternalLink className="h-3 w-3 mr-1" />
                                {key.toUpperCase()}
                              </Button>
                            )) : <span className="text-[10px] text-slate-400">Aucun document</span>}
                          </div>
                        </td>
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
          {activeSection === 'Arretes' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <Card className="border-none shadow-lg rounded-2xl bg-white dark:bg-slate-900 lg:sticky lg:top-8">
                <form onSubmit={saveArrete}>
                  <CardHeader><CardTitle>Gestion des arretes</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Type d'arrêté</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { label: 'Titularisation', value: 'arrete_titularisation' },
                          { label: 'Recrutement', value: 'arrete_recruter' },
                          { label: 'Reclassement', value: 'arrete_reclassement' },
                          { label: 'Avancement', value: 'arrete_avancement' },
                        ].map((t) => (
                          <Button
                            key={t.value}
                            type="button"
                            variant={selectedType === t.value ? 'default' : 'outline'}
                            className={`text-[10px] h-8 rounded-lg transition-all ${selectedType === t.value ? 'bg-blue-600 shadow-sm' : 'hover:border-blue-500 hover:text-blue-600'}`}
                            onClick={() => setSelectedType(t.value)}
                          >
                            {t.label}
                          </Button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Employé concerné</Label>
                      <select 
                        className="w-full h-10 rounded-xl border border-slate-200 px-3 text-sm focus:ring-2 focus:ring-blue-500"
                        value={newArrete.employeeId}
                        onChange={e => setNewArrete({...newArrete, employeeId: e.target.value})}
                      >
                        <option value="">Sélectionner un employé...</option>
                        {users.map(u => (
                          <option key={u.id} value={u.id}>{u.name} ({u.matricule})</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label>Titre de l'acte</Label>
                      <Input value={newArrete.title} onChange={e => setNewArrete({...newArrete, title: e.target.value})} placeholder="ex: Arrêté d'avancement 2026" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Nouveau Grade/Echelon</Label>
                        <Input value={newArrete.data.new_grade} onChange={e => setNewArrete({...newArrete, data: {...newArrete.data, new_grade: e.target.value}})} placeholder="Grade/Echelon" />
                      </div>
                      <div className="space-y-2">
                        <Label>Date d'effet</Label>
                        <Input type="date" value={newArrete.data.date_effet} onChange={e => setNewArrete({...newArrete, data: {...newArrete.data, date_effet: e.target.value}})} />
                      </div>
                    </div>
                    {selectedType === 'arrete_recruter' && (
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Diplôme</Label>
                          <Input value={newArrete.data.diplome} onChange={e => setNewArrete({...newArrete, data: {...newArrete.data, diplome: e.target.value}})} />
                        </div>
                        <div className="space-y-2">
                          <Label>Spécialité</Label>
                          <Input value={newArrete.data.specialite} onChange={e => setNewArrete({...newArrete, data: {...newArrete.data, specialite: e.target.value}})} />
                        </div>
                      </div>
                    )}
                    <div className="space-y-2">
                      <Label>Référence administrative</Label>
                      <Input value={newArrete.data.reference} onChange={e => setNewArrete({...newArrete, data: {...newArrete.data, reference: e.target.value}})} placeholder="ex: RH/2026/001" />
                    </div>
                    <div className="space-y-2">
                      <Label>Description/Notes</Label>
                      <textarea 
                        className="w-full min-h-[80px] rounded-xl border border-slate-200 p-3 text-sm focus:ring-2 focus:ring-blue-500" 
                        value={newArrete.description} 
                        onChange={e => setNewArrete({...newArrete, description: e.target.value})} 
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 font-bold h-12 rounded-xl">Générer & Ajouter</Button>
                  </CardFooter>
                </form>
              </Card>
              <Card className="lg:col-span-2 border-none shadow-sm rounded-2xl bg-white dark:bg-slate-900 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50/50 text-[10px] uppercase font-black text-slate-400">
                      <tr>
                        <th className="px-6 py-4">Acte / Employé</th>
                        <th className="px-6 py-4">Type / Détails</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {arretes.map(a => (
                        <tr key={a.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-6 py-6">
                            <div className="flex flex-col">
                              <span className="font-bold text-sm text-slate-900 dark:text-white">{a.reference || a.title}</span>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-[10px] text-indigo-600 font-bold bg-indigo-50 px-1.5 py-0.5 rounded">
                                  {a.fonctionnaire?.matricule || a.employeeMatricule}
                                </span>
                                <span className="text-[10px] text-slate-500 uppercase font-medium">
                                  {a.fonctionnaire?.user?.name || a.employeeName}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-6">
                            <div className="flex flex-col gap-1">
                              <Badge variant="outline" className="w-fit text-[9px] uppercase font-black bg-slate-50">{a.type.replace('arrete_', '')}</Badge>
                              <div className="flex items-center gap-3">
                                <span className="text-[10px] text-slate-400 font-mono">{a.reference}</span>
                                {(a.data?.date_effet || a.issue_date) && (
                                  <span className="text-[10px] text-emerald-600 font-bold">
                                    {new Date(a.data?.date_effet || a.issue_date).toLocaleDateString()}
                                  </span>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-6 text-right">
                            <div className="flex justify-end items-center gap-2">
                              <Button variant="ghost" size="icon" onClick={() => {
                                // Re-generate from stored DB record logic
                                const payload = {
                                  employee_id: a.fonctionnaire_id,
                                  reference: a.reference,
                                  data: a.data
                                };
                                fetch(`http://localhost:8000/generate/${a.type}`, {
                                  method: 'POST',
                                  headers: { 'Content-Type': 'application/json' },
                                  body: JSON.stringify(payload),
                                }).then(res => res.blob()).then(blob => {
                                  const url = window.URL.createObjectURL(blob);
                                  window.open(url, '_blank');
                                });
                              }} className="text-blue-400 hover:text-blue-600">
                                <ExternalLink className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => deleteArrete(a.id)} className="text-slate-300 hover:text-red-600">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {arretes.length === 0 && (
                        <tr>
                          <td colSpan={3} className="p-20 text-center text-slate-400 italic">
                            Aucun arrete enregistré.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          )}

          {activeSection === 'add-fonctionnaire' && (
            <Card className="border-none shadow-xl rounded-[2.5rem] bg-white dark:bg-slate-900 overflow-hidden">
              <form onSubmit={saveFonctionnaire}>
                <CardHeader className="p-10 border-b border-slate-50 dark:border-slate-800">
                  <CardTitle className="text-2xl font-black">Créer un Compte Fonctionnaire</CardTitle>
                  <CardDescription>Remplissez les informations professionnelles et personnelles pour générer les accès.</CardDescription>
                </CardHeader>
                <CardContent className="p-10 space-y-10">
                  {/* ACCÈS LOGIN */}
                  <div className="space-y-6">
                    <h4 className="text-xs font-black uppercase text-blue-600 tracking-widest flex items-center gap-2">
                      <Lock className="h-4 w-4" /> Accès & Authentification
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label>Nom Complet</Label>
                        <Input value={newFonctionnaire.name} onChange={e => setNewFonctionnaire({...newFonctionnaire, name: e.target.value})} placeholder="ex: Ahmed Alami" required />
                      </div>
                      <div className="space-y-2">
                        <Label>Email (Login)</Label>
                        <Input type="email" value={newFonctionnaire.email} onChange={e => setNewFonctionnaire({...newFonctionnaire, email: e.target.value})} placeholder="ex: a.alami@larache.ma" required />
                      </div>
                      <div className="space-y-2">
                        <Label>Mot de passe provisoire</Label>
                        <Input value={newFonctionnaire.password} onChange={e => setNewFonctionnaire({...newFonctionnaire, password: e.target.value})} placeholder="8 caractères min." required />
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-slate-50 dark:bg-slate-800" />

                  {/* PRO PROFILE */}
                  <div className="space-y-6">
                    <h4 className="text-xs font-black uppercase text-blue-600 tracking-widest flex items-center gap-2">
                      <Briefcase className="h-4 w-4" /> Situation Administrative
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div className="space-y-2">
                        <Label>Matricule</Label>
                        <Input value={newFonctionnaire.matricule} onChange={e => setNewFonctionnaire({...newFonctionnaire, matricule: e.target.value})} placeholder="ex: 1961006" required />
                      </div>
                      <div className="space-y-2">
                        <Label>Statut</Label>
                        <select className="w-full h-11 bg-slate-50 dark:bg-slate-800 rounded-xl border-none px-4 text-sm" value={newFonctionnaire.statut} onChange={e => setNewFonctionnaire({...newFonctionnaire, statut: e.target.value})}>
                          <option>Titulaire</option>
                          <option>Stagiaire</option>
                          <option>Contractuel</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label>Grade</Label>
                        <Input value={newFonctionnaire.grade} onChange={e => setNewFonctionnaire({...newFonctionnaire, grade: e.target.value})} placeholder="ex: Administrateur 2ème grade" />
                      </div>
                      <div className="space-y-2">
                        <Label>Service / Département</Label>
                        <Input value={newFonctionnaire.department} onChange={e => setNewFonctionnaire({...newFonctionnaire, department: e.target.value})} placeholder="ex: Service Informatique" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div className="space-y-2">
                        <Label>Échelle</Label>
                        <Input value={newFonctionnaire.echelle} onChange={e => setNewFonctionnaire({...newFonctionnaire, echelle: e.target.value})} placeholder="ex: Hors Echelle" />
                      </div>
                      <div className="space-y-2">
                        <Label>Échelon</Label>
                        <Input value={newFonctionnaire.echelon} onChange={e => setNewFonctionnaire({...newFonctionnaire, echelon: e.target.value})} placeholder="ex: 5" />
                      </div>
                      <div className="space-y-2">
                        <Label>Ancienneté</Label>
                        <Input value={newFonctionnaire.anciennete} onChange={e => setNewFonctionnaire({...newFonctionnaire, anciennete: e.target.value})} placeholder="ex: 2 ans et 3 mois" />
                      </div>
                      <div className="space-y-2">
                        <Label>Date de recrutement</Label>
                        <Input type="date" value={newFonctionnaire.hire_date} onChange={e => setNewFonctionnaire({...newFonctionnaire, hire_date: e.target.value})} />
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-slate-50 dark:bg-slate-800" />

                  {/* PERSONAL INFO */}
                  <div className="space-y-6">
                    <h4 className="text-xs font-black uppercase text-blue-600 tracking-widest flex items-center gap-2">
                      <User className="h-4 w-4" /> Informations Personnelles
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label>CIN / Identifiant</Label>
                        <Input value={newFonctionnaire.cin} onChange={e => setNewFonctionnaire({...newFonctionnaire, cin: e.target.value})} placeholder="ex: QH599134" />
                      </div>
                      <div className="space-y-2">
                        <Label>Téléphone</Label>
                        <Input value={newFonctionnaire.phone} onChange={e => setNewFonctionnaire({...newFonctionnaire, phone: e.target.value})} placeholder="06XXXXXXXX" />
                      </div>
                      <div className="space-y-2">
                        <Label>Diplôme</Label>
                        <Input value={newFonctionnaire.diplome} onChange={e => setNewFonctionnaire({...newFonctionnaire, diplome: e.target.value})} placeholder="ex: Master en Management" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label>Date de naissance</Label>
                        <Input type="date" value={newFonctionnaire.date_naissance} onChange={e => setNewFonctionnaire({...newFonctionnaire, date_naissance: e.target.value})} />
                      </div>
                      <div className="space-y-2">
                        <Label>Lieu de naissance</Label>
                        <Input value={newFonctionnaire.lieu_naissance} onChange={e => setNewFonctionnaire({...newFonctionnaire, lieu_naissance: e.target.value})} />
                      </div>
                      <div className="space-y-2">
                        <Label>Nationalité</Label>
                        <Input value={newFonctionnaire.nationalite} onChange={e => setNewFonctionnaire({...newFonctionnaire, nationalite: e.target.value})} />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-10 bg-slate-50 dark:bg-slate-800/50 flex justify-end gap-4">
                  <Button type="button" variant="ghost" onClick={() => setActiveSection('users')} className="font-bold">Annuler</Button>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700 px-10 h-14 rounded-2xl font-black text-white shadow-xl shadow-blue-600/20">
                    <UserPlus className="h-5 w-5 mr-3" /> Créer & Ajouter Fonctionnaire
                  </Button>
                </CardFooter>
              </form>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}

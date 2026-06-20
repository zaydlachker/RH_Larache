import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';
import { 
  GraduationCap, Lock, Mail, Loader2, ChevronLeft, 
  ArrowRight, CreditCard, Phone, Calendar, Landmark, 
  Globe, Building2, User 
} from 'lucide-react';
import { authApi } from '../lib/api';

export default function StagiaireRegister() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    cin: '',
    phone: '',
    date_naissance: '',
    lieu_naissance: '',
    nationalite: 'Marocaine',
    diplome: '',
    etablissement: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    // Simple client-side validations
    if (!formData.name.trim()) {
      setError("Le nom complet est requis.");
      setIsLoading(false);
      return;
    }
    if (!formData.email.trim()) {
      setError("L'adresse email est requise.");
      setIsLoading(false);
      return;
    }
    if (formData.password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères.");
      setIsLoading(false);
      return;
    }

    try {
      // Call registerStagiaire with role "stagiaire"
      await authApi.registerStagiaire({
        ...formData,
        role: 'stagiaire'
      });

      setSuccess("Compte créé avec succès ! Redirection vers la page de connexion...");
      
      // Clear form
      setFormData({
        name: '',
        email: '',
        password: '',
        cin: '',
        phone: '',
        date_naissance: '',
        lieu_naissance: '',
        nationalite: 'Marocaine',
        diplome: '',
        etablissement: '',
      });

      setTimeout(() => {
        setIsLoading(false);
        navigate('/login/stagiaire', { replace: true });
      }, 2000);

    } catch (err: any) {
      console.error("Registration error:", err);
      setIsLoading(false);
      if (err.response?.data?.errors) {
        const firstErrorKey = Object.keys(err.response.data.errors)[0];
        setError(err.response.data.errors[firstErrorKey][0]);
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Une erreur est survenue lors de l'inscription. Veuillez réessayer.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-6 font-sans">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 p-10 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800">
        <div className="mb-8">
          <Link to="/login/stagiaire" className="inline-flex items-center text-sm text-slate-500 hover:text-blue-600 transition-colors mb-6 group">
            <ChevronLeft className="h-4 w-4 mr-1 group-hover:-translate-x-1 transition-transform" />
            Retour à la connexion
          </Link>
          <div className="h-12 w-12 rounded-xl bg-blue-600 flex items-center justify-center mb-4 shadow-lg shadow-blue-600/20">
            <GraduationCap className="h-7 w-7 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Inscription Stagiaire
          </h2>
          <p className="text-slate-500 mt-2">
            Créez votre compte de stagiaire pour accéder à votre espace personnel.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Account Credentials */}
          <div className="bg-slate-50/50 dark:bg-slate-800/20 p-6 rounded-2xl border border-slate-100/50 dark:border-slate-800/50 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Informations de connexion</h3>
            
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Nom complet *</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input 
                  id="name" 
                  type="text" 
                  value={formData.name} 
                  onChange={handleInputChange} 
                  required 
                  placeholder="Ex: Ahmed El Amrani" 
                  className="pl-10 h-11 rounded-xl bg-white border-slate-200" 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input 
                    id="email" 
                    type="email" 
                    value={formData.email} 
                    onChange={handleInputChange} 
                    required 
                    placeholder="test@gmail.com" 
                    className="pl-10 h-11 rounded-xl bg-white border-slate-200" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Mot de passe *</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input 
                    id="password" 
                    type="password" 
                    value={formData.password} 
                    onChange={handleInputChange} 
                    required 
                    placeholder="Min. 8 caractères" 
                    className="pl-10 h-11 rounded-xl bg-white border-slate-200" 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Profile/Stagiaire Info */}
          <div className="bg-slate-50/50 dark:bg-slate-800/20 p-6 rounded-2xl border border-slate-100/50 dark:border-slate-800/50 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Informations Personnelles & Académiques</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cin" className="text-sm font-semibold text-slate-700 dark:text-slate-300">CNIE *</Label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input 
                    id="cin" 
                    type="text" 
                    value={formData.cin} 
                    onChange={handleInputChange} 
                    required 
                    placeholder="Ex: L543210" 
                    className="pl-10 h-11 rounded-xl bg-white border-slate-200" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Téléphone *</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input 
                    id="phone" 
                    type="text" 
                    value={formData.phone} 
                    onChange={handleInputChange} 
                    required 
                    placeholder="Ex: 06 12 34 56 78" 
                    className="pl-10 h-11 rounded-xl bg-white border-slate-200" 
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date_naissance" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Date de naissance *</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input 
                    id="date_naissance" 
                    type="date" 
                    value={formData.date_naissance} 
                    onChange={handleInputChange} 
                    required 
                    className="pl-10 h-11 rounded-xl bg-white border-slate-200" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="lieu_naissance" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Lieu de naissance *</Label>
                <div className="relative">
                  <Landmark className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input 
                    id="lieu_naissance" 
                    type="text" 
                    value={formData.lieu_naissance} 
                    onChange={handleInputChange} 
                    required 
                    placeholder="Ex: Larache" 
                    className="pl-10 h-11 rounded-xl bg-white border-slate-200" 
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nationalite" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Nationalité *</Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input 
                    id="nationalite" 
                    type="text" 
                    value={formData.nationalite} 
                    onChange={handleInputChange} 
                    required 
                    placeholder="Ex: Marocaine" 
                    className="pl-10 h-11 rounded-xl bg-white border-slate-200" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="diplome" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Diplôme *</Label>
                <div className="relative">
                  <GraduationCap className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input 
                    id="diplome" 
                    type="text" 
                    value={formData.diplome} 
                    onChange={handleInputChange} 
                    required 
                    placeholder="Ex: Licence en Génie Logiciel" 
                    className="pl-10 h-11 rounded-xl bg-white border-slate-200" 
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="etablissement" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Établissement *</Label>
              <div className="relative">
                <Building2 className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input 
                  id="etablissement" 
                  type="text" 
                  value={formData.etablissement} 
                  onChange={handleInputChange} 
                  required 
                  placeholder="Ex: Université Abdelmalek Essaâdi" 
                  className="pl-10 h-11 rounded-xl bg-white border-slate-200" 
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl font-medium animate-in fade-in zoom-in duration-200">
              {error}
            </div>
          )}

          {success && (
            <div className="p-3 text-sm text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-xl font-medium animate-in fade-in zoom-in duration-200">
              {success}
            </div>
          )}

          <Button 
            type="submit" 
            disabled={isLoading} 
            className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg shadow-lg shadow-blue-600/20 transition-all active:scale-95"
          >
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : (
              <span className="flex items-center justify-center">
                Créer mon compte
                <ArrowRight className="ml-2 h-4 w-4" />
              </span>
            )}
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
          <p className="text-sm text-slate-500">
            Déjà un compte ?{' '}
            <Link to="/login/stagiaire" className="text-blue-600 font-bold hover:underline">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';
import { GraduationCap, Lock, Mail, Loader2, ChevronLeft, ArrowRight } from 'lucide-react';
import { authApi, saveAuth } from '../lib/api';

export default function StagiaireLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Enforce backend as the source of truth
      const response = await authApi.login(email, password);
      
      const rawRole = response?.user?.role || 'candidat';
      const finalRole = String(rawRole).trim().toLowerCase();

      if (finalRole === 'stagiaire') {
        if (response.user) response.user.role = finalRole;
        saveAuth(response);
        navigate('/dashboard/stagiaire', { replace: true });
      } else {
        setError("Accès refusé. Ce compte n'est pas configuré comme stagiaire.");
      }
    } catch (err: any) {
      console.error("Login error:", err);
      if (err.response?.data?.errors?.password) {
        setError(err.response.data.errors.password[0]);
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Identifiants incorrects ou compte non trouvé.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-6 font-sans">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 p-10 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800">
        <div className="mb-8">
          <Link to="/login" className="inline-flex items-center text-sm text-slate-500 hover:text-blue-600 transition-colors mb-6 group">
            <ChevronLeft className="h-4 w-4 mr-1 group-hover:-translate-x-1 transition-transform" />
            Retour
          </Link>
          <div className="h-12 w-12 rounded-xl bg-blue-600 flex items-center justify-center mb-4 shadow-lg shadow-blue-600/20">
            <GraduationCap className="h-7 w-7 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Espace Stagiaire
          </h2>
          <p className="text-slate-500 mt-2">
            Connectez-vous à votre portail de stage.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="stag-email" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input 
                id="stag-email" 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                placeholder="stagiaire@larache.ma" 
                className="pl-10 h-11 rounded-xl bg-slate-50 border-slate-200" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="stag-password" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Mot de passe</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input 
                id="stag-password" 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                placeholder="••••••••" 
                className="pl-10 h-11 rounded-xl bg-slate-50 border-slate-200" 
              />
            </div>
          </div>

          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl font-medium animate-in fade-in zoom-in duration-200">
              {error}
            </div>
          )}

          <Button 
            type="submit" 
            disabled={isLoading} 
            className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg shadow-lg shadow-blue-600/20 transition-all active:scale-95"
          >
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : (
              <span className="flex items-center">
                Se connecter
                <ArrowRight className="ml-2 h-4 w-4" />
              </span>
            )}
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
          <p className="text-sm text-slate-500">
            Nouveau stagiaire ?{' '}
            <button 
              type="button" 
              onClick={() => navigate('/login/registerstagiaire')}
              className="text-blue-600 font-bold hover:underline"
            >
              Créer un compte
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';
import { Landmark, Lock, Mail, Loader2, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { saveAuth, authApi } from '../lib/api';

export default function FonctionnaireLogin() {
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
      const response = await authApi.login(email, password);
      
      // Verification of role
      const role = String(response.user.role).toLowerCase();
      if (role !== 'fonctionnaire') {
        setError("Accès refusé. Ce compte n'est pas un compte fonctionnaire.");
        return;
      }

      saveAuth(response);
      navigate('/dashboard/fonctionnaire', { replace: true });
    } catch (err: any) {
      console.error('Login error:', err);
      const msg = err.response?.data?.message || err.response?.data?.errors?.password?.[0] || "Identifiants incorrects ou problème de connexion.";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-6 font-sans">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 p-10 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800">
        <div className="mb-8">
          <Link to="/login" className="inline-flex items-center text-sm text-slate-500 hover:text-blue-600 transition-colors mb-6 group">
            <ChevronLeft className="h-4 w-4 mr-1 group-hover:-translate-x-1 transition-transform" />
            Retour
          </Link>
          <div className="h-12 w-12 rounded-xl bg-emerald-600 flex items-center justify-center mb-4 shadow-lg shadow-emerald-600/20">
            <Landmark className="h-7 w-7 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Accès Fonctionnaire</h2>
          <p className="text-slate-500 mt-2">Connectez-vous à votre espace professionnel.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="fonc-email" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email Professionnel</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input id="fonc-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="nom@larache.ma" className="pl-10 h-11 rounded-xl bg-slate-50 border-slate-200" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fonc-password" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Mot de passe</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input id="fonc-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" className="pl-10 h-11 rounded-xl bg-slate-50 border-slate-200" />
            </div>
          </div>

          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl font-medium animate-in fade-in zoom-in duration-200">{error}</div>
          )}

          <Button type="submit" disabled={isLoading} className="w-full h-12 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg shadow-lg shadow-emerald-600/20 transition-all active:scale-95">
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Se connecter"}
          </Button>
        </form>
      </div>
    </div>
  );
}

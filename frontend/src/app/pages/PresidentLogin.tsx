import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';
import { saveAuth } from '../lib/api';
import { UserCircle, Lock, Mail, Loader2, ChevronLeft } from 'lucide-react';

export default function PresidentLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Strict President Credentials
    if (email === "president@gmail.com" && password === "president000") {
      saveAuth({
        user: { 
          id: 99, 
          name: "M. le Président", 
          email: "president@gmail.com", 
          role: "president" 
        },
        token: "president_hardcoded_token"
      });
      navigate('/president', { replace: true });
    } else {
      setError("Identifiants de la présidence invalides.");
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-6 font-sans">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 p-10 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800">
        <div className="mb-8">
          <Link to="/selecteadmin" className="inline-flex items-center text-sm text-slate-500 hover:text-blue-600 transition-colors mb-6 group">
            <ChevronLeft className="h-4 w-4 mr-1 group-hover:-translate-x-1 transition-transform" />
            Retour
          </Link>
          <div className="h-12 w-12 rounded-xl bg-indigo-600 flex items-center justify-center mb-4 shadow-lg shadow-indigo-600/20">
            <UserCircle className="h-7 w-7 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Espace Président</h2>
          <p className="text-slate-500 mt-2">Authentification sécurisée pour la présidence.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="pres-email" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email Officiel</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input id="pres-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="president@gmail.com" className="pl-10 h-11 rounded-xl bg-slate-50 border-slate-200" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="pres-password" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Mot de passe</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input id="pres-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" className="pl-10 h-11 rounded-xl bg-slate-50 border-slate-200" />
            </div>
          </div>

          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl font-medium">{error}</div>
          )}

          <Button type="submit" disabled={isLoading} className="w-full h-12 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg shadow-lg shadow-indigo-600/20 transition-all active:scale-95">
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Se connecter"}
          </Button>
        </form>
      </div>
    </div>
  );
}

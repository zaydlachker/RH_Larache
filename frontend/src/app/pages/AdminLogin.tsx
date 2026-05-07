import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';
import { authApi, saveAuth, getStoredUser, isAuthenticated } from '../lib/api';
import { Loader2 } from 'lucide-react';
import { useEffect } from 'react';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Proactive redirection if already logged in as admin
  useEffect(() => {
    const user = getStoredUser();
    if (isAuthenticated() && user) {
      const role = String(user.role).toLowerCase().trim();
      if (role === 'admin' || role === 'administrateur') {
        navigate('/admin', { replace: true });
      }
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      // Use the real authentication API to get a valid Sanctum token
      const response = await authApi.login(email, password);
      
      // Get the role from the response and sanitize it
      const rawRole = response?.user?.role || response?.data?.user?.role || 'candidat';
      const finalRole = String(rawRole).trim().toLowerCase();
      
      if (finalRole !== 'admin' && finalRole !== 'administrateur') {
        setError("Accès refusé : Ce compte n'a pas les droits administrateur.");
        setIsLoading(false);
        return;
      }

      // Save authentication data (token + user info) to localStorage
      saveAuth(response);
      
      // Redirect to /admin
      navigate('/admin', { replace: true });
    } catch (err: any) {
      console.error('Admin login error:', err);
      setError(err.response?.data?.message || "Identifiants administrateur invalides");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-6">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Admin Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="admin-email" className="text-sm font-medium text-slate-700 dark:text-slate-300">Email</Label>
            <Input id="admin-email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-2" />
          </div>

          <div>
            <Label htmlFor="admin-password" className="text-sm font-medium text-slate-700 dark:text-slate-300">Password</Label>
            <Input id="admin-password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-2" />
          </div>

          {error && (
            <div className="text-sm text-red-600 bg-red-50 rounded p-2">{error}</div>
          )}

          <Button type="submit" disabled={isLoading} className="w-full h-11 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}

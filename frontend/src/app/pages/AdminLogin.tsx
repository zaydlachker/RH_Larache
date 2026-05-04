import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';
import { authApi, saveAuth } from '../lib/api';
import { Loader2 } from 'lucide-react';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (email === "admin@gmail.com" && password === "admin000") {
      // Save to localStorage
      localStorage.setItem("user", JSON.stringify({
        email: "admin@gmail.com",
        role: "admin"
      }));
      
      // Setting a dummy token to satisfy the app's authentication check and API interceptors
      localStorage.setItem("token", "admin_hardcoded_session");

      // Redirect to /admin
      navigate('/admin', { replace: true });
    } else {
      setError("Invalid admin credentials");
    }
    
    setIsLoading(false);
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

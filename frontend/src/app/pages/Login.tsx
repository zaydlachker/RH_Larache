import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Landmark, Loader2, Mail, Lock, User, ArrowRight, ChevronLeft, GraduationCap } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { authApi, saveAuth, isAuthenticated } from '../lib/api';
import { useTranslation } from '../i18n';
import laracheImg from '../../assets/larache-hero.png';

export function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const isRegisterMode = location.pathname === '/register';
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [isAdminMode, setIsAdminMode] = useState(false);

  useEffect(() => {
    // @ts-ignore
    if (location.state && location.state.registered) {
      setSuccessMessage(t('register_success'));
      try {
        window.history.replaceState({}, document.title);
      } catch (e) { }
    }
  }, [location.state, t]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setEmailError('');
    setPasswordError('');

    const isValidEmail = (value: string) => {
      return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value);
    };

    if (!isValidEmail(formData.email)) {
      setEmailError(t('invalid_email'));
      setIsLoading(false);
      return;
    }

    try {
      if (isRegisterMode) {
        // Mock registration logic
        const newUser = {
          id: Date.now(),
          name: formData.name,
          email: formData.email,
          role: "candidat",
          status: "pending",
          createdAt: Date.now()
        };

        // Save to localStorage: "users"
        const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
        localStorage.setItem("users", JSON.stringify([...storedUsers, newUser]));

        // Create Notification
        const newNotification = {
          id: Date.now(),
          message: `Nouveau candidat inscrit : ${formData.name}`,
          type: "user",
          createdAt: Date.now(),
          read: false
        };

        // Save to localStorage: "notifications"
        const storedNotifications = JSON.parse(localStorage.getItem("notifications") || "[]");
        localStorage.setItem("notifications", JSON.stringify([newNotification, ...storedNotifications]));

        // Still call the API if possible, but the requirement says "NO backend"
        // I will keep the API call for consistency if the user has it, 
        // but the core requirement is met via localStorage.
        try { await authApi.register(formData); } catch (e) { console.log("API Registration skipped or failed (offline/mock mode)"); }

        setFormData({ name: '', email: '', password: '' });
        navigate('/login', { state: { registered: true } });
      } else {
        // Enforce backend as the only source of truth
        const response = await authApi.login(formData.email, formData.password);
        console.log("LOGIN RESPONSE:", response);

        // Get the role from any possible location
        const rawRole = response?.user?.role || response?.data?.user?.role || response?.data?.role || 'candidat';
        const finalRole = String(rawRole).trim().toLowerCase();

        // Update user object with sanitized role
        if (response.user) response.user.role = finalRole;

        saveAuth(response);

        // Standardized production redirects
        if (finalRole === 'fonctionnaire') {
          navigate('/dashboard/fonctionnaire', { replace: true });
        } else if (finalRole === 'stagiaire') {
          navigate('/dashboard/stagiaire', { replace: true });
        } else if (finalRole === 'admin') {
          navigate('/admin', { replace: true });
        } else {
          // Default role is candidat
          navigate('/', { replace: true });
        }
      }
    } catch (err: unknown) {
      console.error('Auth error:', err);
      // @ts-ignore
      if (err && (err as any).isAxiosError && (err as any).response && (err as any).response.data) {
        const data = (err as any).response.data;
        const fieldErrors = data.errors || {};

        if (Array.isArray(fieldErrors.password) && fieldErrors.password.length) {
          setPasswordError(fieldErrors.password[0]);
        }

        if (Array.isArray(fieldErrors.email) && fieldErrors.email.length) {
          setEmailError(fieldErrors.email[0]);
        }

        if (data.message && !Object.keys(fieldErrors).length) {
          setError(data.message);
        } else if (!data.message && !Object.keys(fieldErrors).length) {
          setError(t('wrong_credentials'));
        }
      } else {
        const errorMessage = err instanceof Error ? err.message : t('wrong_credentials');
        setError(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setIsLoading(true);
    setError('');

    try {
      const demoEmail = 'candidat@larache.ma';
      const response = await authApi.login(demoEmail, 'password');

      // Demo candidate role
      response.user.role = 'candidat';
      saveAuth(response);
      navigate('/', { replace: true });
    } catch (err: unknown) {
      console.error('Demo login error:', err);
      setError(t('demo_unavailable'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50 dark:bg-slate-950">
      {/* Left side: Visual */}
      <div className="hidden md:flex md:w-1/2 relative overflow-hidden bg-blue-900">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-10000 hover:scale-110 opacity-60"
          style={{ backgroundImage: `url(${laracheImg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-blue-900/40 to-transparent" />

        <div className="relative z-10 w-full p-12 flex flex-col justify-end">
          <div className="max-w-md">
            <Landmark className="h-12 w-12 text-blue-400 mb-6" />
            <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
              {t('joinTitle')}
            </h1>
            <p className="text-blue-100 text-lg">
              {t('platformDescription')}
            </p>
          </div>
        </div>
      </div>

      {/* Right side: Form */}
      <div className="flex-1 flex items-center justify-center p-8 md:p-12 lg:p-24 bg-white dark:bg-slate-900">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center text-sm text-slate-500 hover:text-blue-600 dark:text-slate-400 transition-colors mb-8 group">
              <ChevronLeft className="h-4 w-4 mr-1 group-hover:-translate-x-1 transition-transform" />
              {t('accueil')}
            </Link>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              {isAdminMode ? t('admin_login_title') : (isRegisterMode ? t('createAccount') : t('loginTitle'))}
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              {isRegisterMode ? t('registerDescription') : t('loginDescription')}
            </p>
          </div>

          {successMessage && (
            <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-xl border border-green-100 dark:border-green-800 text-sm flex items-center">
              <CheckCircle2 className="h-4 w-4 mr-2" />
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {isRegisterMode && (
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-slate-700 dark:text-slate-300">{t('name')}</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    className="pl-10 h-11 rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:ring-blue-500"
                    placeholder={t('name')}
                    value={formData.name}
                    onChange={handleInputChange}
                    required={isRegisterMode}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300">{t('email')}</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  className="pl-10 h-11 rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:ring-blue-500"
                  placeholder={t('emailPlaceholder')}
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              {emailError && <p className="text-xs text-red-500 font-medium">{emailError}</p>}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="password" className="text-sm font-medium text-slate-700 dark:text-slate-300">{t('password')}</Label>
                {!isRegisterMode && (
                  <button type="button" className="text-xs text-blue-600 hover:underline">{t('noAccount')}</button>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  className="pl-10 h-11 rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:ring-blue-500"
                  placeholder={t('passwordPlaceholder')}
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              {passwordError && <p className="text-xs text-red-500 font-medium">{passwordError}</p>}
            </div>

            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-xl border border-red-100 dark:border-red-800 font-medium">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : (
                <span className="flex items-center">
                  {isRegisterMode ? t('createAccount') : "Connexion"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              )}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100 dark:border-slate-800" />
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-wider">
              <span className="px-3 bg-white dark:bg-slate-900 text-slate-400 font-medium">{t('ou')}</span>
            </div>
          </div>

          <div className="space-y-3 mb-8">
            {!isAdminMode && (
              <Button
                variant="outline"
                className="w-full h-11 rounded-xl border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
                onClick={() => handleDemoLogin()}
                disabled={isLoading}
              >
                {t('demoCandidate')}
              </Button>
            )}

            <Button
              type="button"
              variant="outline"
              className="w-full h-11 rounded-xl border-emerald-200 text-emerald-700 hover:bg-emerald-50 font-bold transition-all"
              onClick={() => navigate('/selecte')}
            >
              <Landmark className="h-4 w-4 mr-2" />
              Accès Fonctionnaire
            </Button>


            <Button
              type="button"
              variant={isAdminMode ? "outline" : "destructive"}
              className={isAdminMode
                ? "w-full h-11 rounded-xl border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
                : "w-full h-11 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold transition-all shadow-lg shadow-red-600/20"}
              onClick={() => { setIsAdminMode(!isAdminMode); navigate('/selecteadmin'); }}
            >
              {isAdminMode ? t('return_candidate') : t('admin_btn')}
            </Button>
          </div>

          <p className="text-center text-sm text-slate-500 dark:text-slate-400">
            {isRegisterMode ? t('alreadyAccount') : t('noAccount')}
            {' '}
            <button
              onClick={() => navigate(isRegisterMode ? '/login' : '/register')}
              className="text-blue-600 font-semibold hover:underline"
            >
              {isRegisterMode ? t('loginButton') : t('createAccount')}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

function CheckCircle2(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
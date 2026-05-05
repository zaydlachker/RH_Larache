import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Landmark, User, Shield, Phone, MapPin, Mail, ChevronRight } from 'lucide-react';
import LanguageToggle from '../components/LanguageToggle';
import ThemeToggle from '../components/ThemeToggle';
import { Button } from '../components/ui/button';
import { isAuthenticated, getStoredUser } from '../lib/api';
import { useTranslation } from '../i18n';
import { cn } from '../lib/utils';
import logoImg from '../../assets/logo-commune.png';

export function PublicLayout() {
  const navigate = useNavigate();
  const [authed, setAuthed] = React.useState<boolean>(() => isAuthenticated());
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  React.useEffect(() => {
    const onLogin = () => setAuthed(isAuthenticated());
    const onLogout = () => {
      setAuthed(false);
      navigate('/login');
    };
    window.addEventListener('auth:login', onLogin as EventListener);
    window.addEventListener('auth:logout', onLogout as EventListener);
    return () => {
      window.removeEventListener('auth:login', onLogin as EventListener);
      window.removeEventListener('auth:logout', onLogout as EventListener);
    };
  }, [navigate]);

  const { t } = useTranslation();
  const user = getStoredUser();

  return (
    <div className="min-h-screen flex flex-col bg-background transition-colors duration-300">
      <header 
        className={cn(
          "sticky top-0 z-50 transition-all duration-300 border-b",
          isScrolled 
            ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-slate-200 dark:border-slate-800 py-2" 
            : "bg-white dark:bg-slate-900 border-transparent py-4"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="p-1 rounded-xl bg-white dark:bg-slate-800 group-hover:bg-slate-50 dark:group-hover:bg-slate-700 transition-colors shadow-lg shadow-blue-600/10 border border-slate-100 dark:border-slate-700 flex items-center justify-center overflow-hidden">
                <img src={logoImg} alt="e-RH Larache Logo" className="h-10 w-auto object-contain" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900 dark:text-white leading-none tracking-tight">{t('siteTitle')}</h1>
                <span className="text-[10px] uppercase tracking-widest font-bold text-blue-600 dark:text-blue-400">{t('siteSubtitle')}</span>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center space-x-1">
              <NavLink to="/">{t('accueil')}</NavLink>
              <NavLink to="/concours">{t('concours')}</NavLink>
              <NavLink to="/annonces">{t('annonces')}</NavLink>
              <NavLink to="/actualites">{t('actualites')}</NavLink>
            </nav>

            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2 border-r border-slate-200 dark:border-slate-800 pr-4 mr-2">
                <ThemeToggle />
                <LanguageToggle />
              </div>

              <div className="flex items-center space-x-3">
                {authed ? (
                  <Link to="/profile">
                    <Button variant="ghost" className="rounded-xl flex items-center space-x-3 px-3 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow-md border-2 border-white dark:border-slate-700">
                        {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2) || 'U'}
                      </div>
                      <span className="hidden sm:inline font-semibold text-slate-700 dark:text-slate-200">{user?.name}</span>
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link to="/login" className="hidden sm:block">
                      <Button variant="ghost" className="font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400">
                        {t('loginButton')}
                      </Button>
                    </Link>
                    <Link to="/register">
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/10 px-6">
                        {t('createAccount')}
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-slate-900 dark:bg-slate-950 text-slate-300 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-1.5 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                  <img src={logoImg} alt="e-RH Larache Logo" className="h-8 w-auto object-contain" />
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight">{t('siteTitle')}</h3>
              </div>
              <p className="text-slate-400 max-w-md leading-relaxed mb-8">
                {t('platformDescription')}
              </p>
              <div className="flex items-center space-x-4">
                <SocialLink icon="F" />
                <SocialLink icon="L" />
                <SocialLink icon="X" />
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-xs">{t('footer_ehr')}</h4>
              <ul className="space-y-4 text-sm">
                <li><FooterLink to="/">{t('accueil')}</FooterLink></li>
                <li><FooterLink to="/concours">{t('concours')}</FooterLink></li>
                <li><FooterLink to="/profile">{t('profile')}</FooterLink></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-xs">{t('footer_contact')}</h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-blue-500 shrink-0" />
                  <span>Commune de Larache, Avenue Mohammed V, Larache 92000, Maroc</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-blue-500 shrink-0" />
                  <span>+212 539 912 345</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-blue-500 shrink-0" />
                  <span>contact@larache.ma</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-16 pt-12 border-t border-slate-800">
            <h4 className="text-white font-bold mb-8 uppercase tracking-wider text-xs">{t('liensUtiles')}</h4>
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-4 gap-x-6 text-sm">
              <li><FooterLink to="/commune">{t('link_commune')}</FooterLink></li>
              <li><FooterLink to="/presidence">{t('link_presidence')}</FooterLink></li>
              <li><FooterLink to="/sessions">{t('link_sessions')}</FooterLink></li>
              <li><FooterLink to="/appels-offre">{t('link_appels')}</FooterLink></li>
              <li><FooterLink to="/projets">{t('link_projets')}</FooterLink></li>
              <li><FooterLink to="/consultation">{t('link_consultation')}</FooterLink></li>
              <li><FooterLink to="/ville">{t('link_ville')}</FooterLink></li>
              <li><FooterLink to="/jardins">{t('link_jardins')}</FooterLink></li>
              <li><FooterLink to="/transport">{t('link_transport')}</FooterLink></li>
              <li><FooterLink to="/sport">{t('link_sport')}</FooterLink></li>
              <li><FooterLink to="/entreprenariat">{t('link_entrepreneuriat')}</FooterLink></li>
              <li><FooterLink to="/sante">{t('link_sante')}</FooterLink></li>
              <li><FooterLink to="/visite">{t('link_visite')}</FooterLink></li>
              <li><FooterLink to="/associative">{t('link_associatif')}</FooterLink></li>
              <li><FooterLink to="/commune-en-ligne">{t('link_commune_ligne')}</FooterLink></li>
              <li><FooterLink to="/bureau-digital">{t('link_bureau_ordre')}</FooterLink></li>
              <li><FooterLink to="/chikaya">{t('link_chikaya')}</FooterLink></li>
              <li><FooterLink to="/allo-mouatine">{t('link_allo_mouatine')}</FooterLink></li>
              <li><FooterLink to="/watiqa">{t('link_watiqa')}</FooterLink></li>
              <li><FooterLink to="/rokhas">{t('link_rokhas')}</FooterLink></li>
              <li><FooterLink to="/marches-publics">{t('link_marches')}</FooterLink></li>
              <li><FooterLink to="/chafafiya">{t('link_chafafiya')}</FooterLink></li>
            </ul>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-500">
            <p>{t('footer_copyright')}</p>
            <div className="flex space-x-6 uppercase tracking-widest">
              <a href="#" className="hover:text-blue-500 transition-colors uppercase tracking-widest font-bold text-blue-600 dark:text-blue-400">{t('footer_privacy')}</a>
              <a href="#" className="hover:text-blue-500 transition-colors uppercase tracking-widest font-bold text-blue-600 dark:text-blue-400">{t('footer_cookie')}</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function NavLink({ to, children }: { to: string, children: React.ReactNode }) {
  return (
    <Link 
      to={to} 
      className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all"
    >
      {children}
    </Link>
  );
}

function FooterLink({ to, children }: { to: string, children: React.ReactNode }) {
  return (
    <Link to={to} className="flex items-center group text-slate-400 hover:text-white transition-colors">
      <ChevronRight className="h-3 w-3 mr-2 text-blue-600 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
      {children}
    </Link>
  );
}

function SocialLink({ icon }: { icon: string }) {
  return (
    <a href="#" className="h-10 w-10 rounded-xl bg-slate-800 hover:bg-blue-600 flex items-center justify-center text-white font-bold transition-all hover:-translate-y-1 shadow-lg">
      {icon}
    </a>
  );
}

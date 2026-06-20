import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  ArrowRight,
  Briefcase,
  Calendar,
  Users,
  Loader2,
  FileText,
  Zap,
  Eye,
  Database,
  ShieldCheck,
  Globe,
  BarChart,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

import { concoursApi, isAuthenticated } from '../lib/api';
import { useTranslation } from '../i18n';
import laracheImg from '../../assets/larache-hero.png';
import mainLogo from '../../assets/logo-commune.png';

interface ApiConcours {
  id: number;
  title: string;
  description: string;
  exam_date: string;
  application_deadline: string;
  max_participants: number;
  status: 'upcoming' | 'open' | 'closed' | 'cancelled';
}

export function PublicPortal2() {
  const navigate = useNavigate();
  const location = useLocation();
  const [concours, setConcours] = useState<ApiConcours[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { t } = useTranslation();

  const hash = location.hash;

  const defaultMedicalConcours: ApiConcours[] = [
    {
      id: -1,
      title: t('cat_medecin'),
      description: t('desc_medecin'),
      exam_date: new Date().toISOString(),
      application_deadline: '',
      max_participants: 5,
      status: 'open',
    },
    {
      id: -2,
      title: t('cat_infirmier'),
      description: t('desc_infirmier'),
      exam_date: new Date().toISOString(),
      application_deadline: '',
      max_participants: 10,
      status: 'open',
    },
    {
      id: -3,
      title: t('cat_veterinaire'),
      description: t('desc_veterinaire'),
      exam_date: new Date().toISOString(),
      application_deadline: '',
      max_participants: 2,
      status: 'open',
    },
  ];

  useEffect(() => {
    fetchConcours();
  }, []);

  const displayed = React.useMemo(() => {
    const list = [...concours];
    defaultMedicalConcours.forEach((d) => {
      if (!list.some((c) => c.title === d.title)) list.push(d);
    });
    return list;
  }, [concours]);

  const fetchConcours = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Load from LocalStorage
      const localConcoursRaw = localStorage.getItem('concours');
      const localConcours = localConcoursRaw ? JSON.parse(localConcoursRaw) : [];
      
      // Map local data to UI interface
      const mappedLocal = localConcours.map((c: any) => ({
        id: c.id,
        title: c.title,
        description: c.description,
        exam_date: c.date || new Date().toISOString(),
        application_deadline: c.date || '',
        max_participants: 10, // Mock value
        status: 'open' as const
      }));

      // Try API if available, otherwise just use local
      try {
        const data = await concoursApi.getAll();
        setConcours([...mappedLocal, ...data]);
      } catch (e) {
        setConcours(mappedLocal);
      }
    } catch (err) {
      console.error('Error loading concours:', err);
      setError(t('error_load_concours'));
    } finally {
      setLoading(false);
    }
  };

  const scrollToConcours = () => {
    const element = document.getElementById('concours-section');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePostuler = (concoursId: number) => {
    if (!isAuthenticated()) {
      navigate('/login', { state: { from: { pathname: `/postuler/${concoursId}` } } });
      return;
    }
    navigate(`/postuler/${concoursId}`);
  };


  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-10000 hover:scale-110"
          style={{ backgroundImage: `url(${laracheImg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-900/80" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <Badge className="mb-4 bg-blue-600/20 text-blue-300 border-blue-500/30 backdrop-blur-md px-4 py-1 text-sm font-medium">
            {t('siteSubtitle')}
          </Badge>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6 drop-shadow-lg">
            {t('joinTitle')}
          </h1>
          <p className="text-lg md:text-xl text-slate-200 max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow-md">
            {t('joinDescription')}
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            {/* Button Hidden on /2 */}
            {/* 
            <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white border-none shadow-xl shadow-blue-900/20 h-14 px-8 text-lg font-semibold" onClick={scrollToConcours}>
              {t('voirLesConcours')}
            </Button>
            */}
            {!isAuthenticated() && (
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-md h-14 px-8 text-lg font-semibold" onClick={() => navigate('/register')}>
                {t('createAccount')}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Stats/Features Banner */}
      <div className="bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">100%</div>
              <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">{t('stats_digitalise')}</div>
            </div>
            <div className="text-center border-l border-slate-100 dark:border-slate-800">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">24/7</div>
              <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">{t('stats_accessible')}</div>
            </div>
            <div className="text-center border-l border-slate-100 dark:border-slate-800">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">{t('stats_transparence')}</div>
              <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">{t('stats_garantie')}</div>
            </div>
            <div className="text-center border-l border-slate-100 dark:border-slate-800">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">{t('stats_support')}</div>
              <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">{t('stats_reactif')}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Concours List Section - Hidden on /2 */}
      <section id="concours-section" className="hidden">
      </section>

      {/* Why Choose Section */}
      <section className="bg-white dark:bg-slate-900 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">{t('why_title')}</h2>
            <div className="h-1.5 w-20 bg-blue-600 mx-auto rounded-full mb-6"></div>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">{t('why_sub')}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<FileText className="h-7 w-7" />}
              title={t('why_transformation_title')}
              desc={t('why_transformation_desc')}
            />
            <FeatureCard
              icon={<Zap className="h-7 w-7" />}
              title={t('why_efficiency_title')}
              desc={t('why_efficiency_desc')}
            />
            <FeatureCard
              icon={<Eye className="h-7 w-7" />}
              title={t('why_transparency_title')}
              desc={t('why_transparency_desc')}
            />
            <FeatureCard
              icon={<Database className="h-7 w-7" />}
              title={t('why_centralized_title')}
              desc={t('why_centralized_desc')}
            />
            <FeatureCard
              icon={<FileText className="h-7 w-7" />}
              title={t('why_automation_title')}
              desc={t('why_automation_desc')}
            />
            <FeatureCard
              icon={<ShieldCheck className="h-7 w-7" />}
              title={t('why_security_title')}
              desc={t('why_security_desc')}
            />
            <FeatureCard
              icon={<Globe className="h-7 w-7" />}
              title={t('why_accessibility_title')}
              desc={t('why_accessibility_desc')}
            />
            <FeatureCard
              icon={<BarChart className="h-7 w-7" />}
              title={t('why_decision_title')}
              desc={t('why_decision_desc')}
            />
          </div>
        </div>
      </section>

      {/* Official Documents Section - Hidden on /2 */}
      <section className="hidden">
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="group p-8 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300">
      <div className="p-3 rounded-xl bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 w-fit mb-6 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{title}</h3>
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">{desc}</p>
    </div>
  );
}

function DocumentCard({ title, desc, icon, href }: { title: string, desc: string, icon: React.ReactNode, href?: string }) {
  const { t } = useTranslation();
  return (
    <Card className="flex flex-col h-full border-none shadow-sm hover:shadow-xl transition-all duration-300 bg-white dark:bg-slate-900 group overflow-hidden">
      <div className="h-1 bg-slate-100 dark:bg-slate-800 group-hover:bg-blue-500 transition-colors" />
      <CardHeader className="pb-4">
        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 w-fit mb-4 group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <CardTitle className="text-lg text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {title}
        </CardTitle>
        <CardDescription className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mt-2">
          {desc}
        </CardDescription>
      </CardHeader>
      <CardFooter className="mt-auto pt-4 pb-6">
        <Button 
          variant="outline" 
          className="w-full border-slate-200 dark:border-slate-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all rounded-xl group/btn"
          onClick={() => href && window.open(href, '_blank')}
        >
          <FileText className="h-4 w-4 mr-2 text-red-500 group-hover/btn:text-white transition-colors" />
          <span className="font-semibold">{t('download_pdf')}</span>
        </Button>
      </CardFooter>
    </Card>
  );
}

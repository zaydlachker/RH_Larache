import React from 'react';
import { useEffect, useState } from 'react';
import { ArrowRight, Calendar, Users, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { concoursApi, isAuthenticated } from '../lib/api';
import { useTranslation } from '../i18n';
import { useNavigate } from 'react-router-dom';

interface ApiConcours {
  id: number;
  title: string;
  description: string;
  exam_date: string;
  application_deadline: string;
  max_participants: number;
  status: 'upcoming' | 'open' | 'closed' | 'cancelled';
}



export default function ConcoursPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
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
  const [concours, setConcours] = useState<ApiConcours[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filters
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<'all' | 'medecin' | 'infirmier' | 'veterinaire'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'open' | 'closed'>('all');
  const [dateSort, setDateSort] = useState<'recent' | 'old'>('recent');
 
  // (no duplicate default list here)

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await concoursApi.getAll();
        if (!mounted) return;
        setConcours(data);
      } catch (e) {
        console.error(e);
        setError(t('error_load_concours'));
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

  const displayed = React.useMemo(() => {
    const list = [...concours];
    defaultMedicalConcours.forEach((d) => {
      if (!list.some((c) => c.title === d.title)) list.push(d);
    });
    return list;
  }, [concours]);

  const inferCategory = (item: ApiConcours) => {
    const title = (item.title || '').toLowerCase();
    const med = t('cat_medecin').toLowerCase();
    const inf = t('cat_infirmier').toLowerCase();
    const vet = t('cat_veterinaire').toLowerCase();
    if (title.includes(med) || title.includes('médecin') || title.includes('medecin') || title.includes('طبيب')) return 'medecin';
    if (title.includes(inf) || title.includes('infirm') || title.includes('ممرض') || title.includes('ممرضات')) return 'infirmier';
    if (title.includes(vet) || title.includes('vétér') || title.includes('veter') || title.includes('بيط')) return 'veterinaire';
    return 'other';
  };

  const filtered = React.useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = displayed.filter((item) => {
      if (q) {
        const hay = (item.title + ' ' + item.description).toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (category !== 'all' && inferCategory(item) !== category) return false;
      if (statusFilter !== 'all') {
        if (statusFilter === 'open' && item.status !== 'open') return false;
        if (statusFilter === 'closed' && item.status !== 'closed') return false;
      }
      return true;
    });
    list.sort((a, b) => {
      const da = new Date(a.exam_date).getTime() || 0;
      const db = new Date(b.exam_date).getTime() || 0;
      return dateSort === 'recent' ? db - da : da - db;
    });
    return list;
  }, [displayed, search, category, statusFilter, dateSort]);

  const handlePostuler = (id: number) => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }
    navigate(`/postuler/${id}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">{t('concours')}</h1>
        <p className="text-slate-500 mt-1">{t('concours_page_description')}</p>
      </div>

      <div className="bg-white p-4 rounded-md shadow-sm mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 gap-3">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('search_placeholder')}
            className="flex-1 border border-slate-200 rounded-md px-3 py-2 text-sm"
          />
          <div className="flex items-center space-x-2">
            <select className="border border-slate-200 rounded-md px-3 py-2 text-sm" value={category} onChange={(e) => setCategory(e.target.value as any)}>
              <option value="all">{t('cat_all')}</option>
              <option value="medecin">{t('cat_medecin')}</option>
              <option value="infirmier">{t('cat_infirmier')}</option>
              <option value="veterinaire">{t('cat_veterinaire')}</option>
            </select>
            <select className="border border-slate-200 rounded-md px-3 py-2 text-sm" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as any)}>
              <option value="all">{t('status_all')}</option>
              <option value="open">{t('status_open')}</option>
              <option value="closed">{t('status_closed')}</option>
            </select>
            <select className="border border-slate-200 rounded-md px-3 py-2 text-sm" value={dateSort} onChange={(e) => setDateSort(e.target.value as any)}>
              <option value="recent">{t('date_recent')}</option>
              <option value="old">{t('date_old')}</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3].map((i) => (
            <div key={i} className="p-4 bg-white rounded shadow animate-pulse h-40"></div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 bg-white rounded">
          <p className="text-slate-600">{t('no_results')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => {
            const categoryLabel = inferCategory(item);
            const isOpen = item.status === 'open';
            return (
              <Card key={item.id} className="flex flex-col h-full">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <div className="text-sm text-slate-500 mt-1">{categoryLabel} • <span className="inline-flex items-center"><Calendar className="h-4 w-4 mr-1" />{new Date(item.exam_date).toLocaleDateString()}</span></div>
                    </div>
                    <div>
                      <Badge variant={isOpen ? 'success' : 'destructive'}>{isOpen ? t('status_open') : t('status_closed')}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-sm text-slate-700">{item.description}</p>
                </CardContent>
                <CardFooter>
                  <div className="w-full">
                    <Button className="w-full" onClick={() => handlePostuler(item.id)} disabled={!isOpen}>
                      {t('postuler')} <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

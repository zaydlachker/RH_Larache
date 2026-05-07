import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Briefcase } from 'lucide-react';
import { api } from '../lib/api';
import { useTranslation } from '../i18n';

export function CandidatureForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [userMessage, setUserMessage] = useState('');
  const [documents, setDocuments] = useState({
    demand: null as File | null,
    cv: null as File | null,
    cin: null as File | null,
    diplome: null as File | null,
    casier: null as File | null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const storedConcours = JSON.parse(localStorage.getItem('concours') || '[]');
  const selectedConcours = storedConcours.find((c: any) => String(c.id) === id);

  if (id && !selectedConcours) {
    return (
      <div className="max-w-3xl mx-auto py-24 text-center">
        <Card className="p-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Concours introuvable</h2>
          <p className="text-slate-500 mb-8">Le lien que vous suivez semble invalide ou le concours a été supprimé.</p>
          <Button onClick={() => navigate('/')}>Retour à l'accueil</Button>
        </Card>
      </div>
    );
  }

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    if (e.target.files && e.target.files[0]) {
      setDocuments(prev => ({ ...prev, [field]: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);
    setError(null);

    try {
      // Helper to convert file to Base64
      const fileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = error => reject(error);
        });
      };

      const attachedDocs: any = {};
      
      // Process all documents
      for (const [key, file] of Object.entries(documents)) {
        if (file) {
          attachedDocs[key] = {
            name: file.name,
            type: file.type,
            content: await fileToBase64(file)
          };
        }
      }

      // Save to localStorage for Admin
      const newCandidature = {
        id: Date.now(),
        concoursId: id,
        concoursTitle: selectedConcours?.title || 'Concours Spécial',
        name,
        email,
        message: userMessage,
        date: new Date().toISOString(),
        documents: attachedDocs
      };
      
      const existing = JSON.parse(localStorage.getItem('candidatures') || '[]');
      localStorage.setItem('candidatures', JSON.stringify([newCandidature, ...existing]));

      setMessage('Candidature envoyée avec succès.');
      setName('');
      setEmail('');
      setUserMessage('');
      setDocuments({ demand: null, cv: null, cin: null, diplome: null, casier: null });
    } catch (err: unknown) {
      console.error('Candidature error:', err);
      setError(err instanceof Error ? err.message : 'Erreur lors de l envoi');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <Card>
        <CardHeader className="border-b border-slate-50 pb-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Briefcase className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="text-xl">{selectedConcours ? selectedConcours.title : 'Formulaire de candidature'}</CardTitle>
              {selectedConcours && <p className="text-xs text-slate-500 mt-1">{selectedConcours.description}</p>}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8 mt-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium border-b pb-2 text-slate-800 dark:text-slate-200">Informations Personnelles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nom complet</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="userMessage">Message (Optionnel)</Label>
                <textarea 
                  id="userMessage" 
                  className="w-full min-h-[100px] rounded-xl border border-slate-200 p-3 text-sm focus:ring-2 focus:ring-blue-500"
                  value={userMessage}
                  onChange={(e) => setUserMessage(e.target.value)}
                  placeholder="Pourquoi postulez-vous ?"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium border-b pb-2 text-slate-800 dark:text-slate-200">Documents Requis</h3>
              <p className="text-sm text-slate-500 mb-4">Formats acceptés : PDF, JPG, PNG. Taille max : 5Mo par document.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 border border-slate-200 dark:border-slate-800 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <Label htmlFor="demand" className="font-semibold text-slate-700 dark:text-slate-300">Demande manuscrite</Label>
                  <input id="demand" type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => handleFile(e, 'demand')} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900/30 dark:file:text-blue-400" required />
                </div>
                
                <div className="space-y-2 border border-slate-200 dark:border-slate-800 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <Label htmlFor="cv" className="font-semibold text-slate-700 dark:text-slate-300">Curriculum Vitae (CV)</Label>
                  <input id="cv" type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => handleFile(e, 'cv')} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900/30 dark:file:text-blue-400" required />
                </div>

                <div className="space-y-2 border border-slate-200 dark:border-slate-800 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <Label htmlFor="cin" className="font-semibold text-slate-700 dark:text-slate-300">Carte d'Identité Nationale (CIN)</Label>
                  <input id="cin" type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => handleFile(e, 'cin')} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900/30 dark:file:text-blue-400" required />
                </div>

                <div className="space-y-2 border border-slate-200 dark:border-slate-800 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <Label htmlFor="diplome" className="font-semibold text-slate-700 dark:text-slate-300">Diplôme / Attestation</Label>
                  <input id="diplome" type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => handleFile(e, 'diplome')} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900/30 dark:file:text-blue-400" required />
                </div>

                <div className="space-y-2 border border-slate-200 dark:border-slate-800 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 md:col-span-2">
                  <Label htmlFor="casier" className="font-semibold text-slate-700 dark:text-slate-300">Extrait du casier judiciaire</Label>
                  <input id="casier" type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => handleFile(e, 'casier')} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900/30 dark:file:text-blue-400" required />
                </div>
              </div>
            </div>

            {message && <div className="text-sm text-green-700 bg-green-50 p-4 rounded-xl border border-green-100 font-bold">{message}</div>}
            {error && <div className="text-sm text-red-600 bg-red-50 p-4 rounded-xl border border-red-100 font-bold">{error}</div>}

            <div className="flex items-center space-x-2">
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 h-12 px-8 rounded-xl font-bold" disabled={isLoading}>{isLoading ? 'Envoi...' : 'Envoyer candidature'}</Button>
              <Button type="button" variant="outline" className="h-12 px-8 rounded-xl" onClick={() => navigate(-1)}>Annuler</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default CandidatureForm;

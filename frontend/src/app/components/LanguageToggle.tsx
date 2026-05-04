import React from 'react';
import { Button } from './ui/button';
import { useTranslation } from '../i18n';

export const LanguageToggle: React.FC = () => {
  const { lang, setLang } = useTranslation();
  const setFr = () => setLang('fr');
  const setAr = () => setLang('ar');

  return (
    <div className="flex items-center space-x-1">
      <button
        onClick={setFr}
        className={`px-2 py-1 text-sm rounded ${lang === 'fr' ? 'bg-slate-800 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
      >
        Français
      </button>
      <button
        onClick={setAr}
        className={`px-2 py-1 text-sm rounded ${lang === 'ar' ? 'bg-slate-800 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
      >
        العربية
      </button>
    </div>
  );
};

export default LanguageToggle;

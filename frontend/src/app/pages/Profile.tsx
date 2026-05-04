import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Shield, LogOut, Edit2, Check, X } from 'lucide-react';
import { getStoredUser, authApi } from '../lib/api';
import { useTranslation } from '../i18n';
import { Button } from '../components/ui/button';

export function ProfilePage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [user, setUser] = useState(getStoredUser());
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  const handleLogout = async () => {
    await authApi.logout();
    navigate('/');
  };

  const handleEdit = () => {
    setIsEditing(true);
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = () => {
    if (!user) return;
    
    const updatedUser = { ...user, ...formData };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setIsEditing(false);
    
    // Dispatch event to notify other components that user data changed
    window.dispatchEvent(new CustomEvent('auth:login', { detail: updatedUser }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Non connecté</h2>
          <p className="text-slate-600 mb-6">Veuillez vous connecter pour voir votre profil.</p>
          <Button onClick={() => navigate('/login')}>{t('loginButton')}</Button>
        </div>
      </div>
    );
  }

  // Generate initials for avatar
  const initials = user.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .substring(0, 2)
    : 'U';

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Header/Cover color */}
        <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-700"></div>
        
        <div className="px-8 pb-8">
          <div className="relative flex flex-col sm:flex-row items-center sm:items-end -mt-16 sm:space-x-6 mb-8">
            {/* Avatar */}
            <div className="h-32 w-32 rounded-2xl bg-white p-1 shadow-md">
              <div className="h-full w-full rounded-xl bg-blue-50 flex items-center justify-center text-blue-700 text-4xl font-bold border border-blue-100">
                {initials}
              </div>
            </div>
            
            <div className="mt-6 sm:mt-0 flex-1 text-center sm:text-left">
              {isEditing ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="text-3xl font-bold text-slate-900 bg-white border-b-2 border-blue-500 focus:outline-none w-full max-w-md"
                    placeholder={t('name')}
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="text-slate-500 font-medium bg-white border-b border-slate-300 focus:outline-none w-full max-w-md"
                    placeholder={t('email')}
                  />
                </div>
              ) : (
                <>
                  <h1 className="text-3xl font-bold text-slate-900">{user.name}</h1>
                  <p className="text-slate-500 font-medium">{user.email}</p>
                </>
              )}
            </div>
            
            <div className="mt-6 sm:mt-0 flex space-x-3">
              {isEditing ? (
                <>
                  <Button 
                    onClick={handleSave}
                    className="flex items-center space-x-2 bg-green-600 hover:bg-green-700"
                  >
                    <Check className="h-4 w-4" />
                    <span>Enregistrer</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleCancel}
                    className="flex items-center space-x-2"
                  >
                    <X className="h-4 w-4" />
                    <span>Annuler</span>
                  </Button>
                </>
              ) : (
                <Button 
                  variant="outline" 
                  onClick={handleEdit}
                  className="flex items-center space-x-2"
                >
                  <Edit2 className="h-4 w-4" />
                  <span>{t('editProfile')}</span>
                </Button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-slate-100">
            {/* User Details */}
            <div className="md:col-span-2 space-y-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Informations personnelles</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex items-center space-x-3 text-slate-500 mb-2">
                    <User className="h-4 w-4" />
                    <span className="text-sm font-medium">{t('name')}</span>
                  </div>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-white border border-slate-300 rounded-md px-2 py-1 text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-slate-900 font-semibold">{user.name}</p>
                  )}
                </div>
                
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex items-center space-x-3 text-slate-500 mb-2">
                    <Mail className="h-4 w-4" />
                    <span className="text-sm font-medium">{t('email')}</span>
                  </div>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-white border border-slate-300 rounded-md px-2 py-1 text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-slate-900 font-semibold">{user.email}</p>
                  )}
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex items-center space-x-3 text-slate-500 mb-2">
                    <Shield className="h-4 w-4" />
                    <span className="text-sm font-medium">{t('role')}</span>
                  </div>
                  <p className="text-slate-900 font-semibold capitalize">{user.role || 'Candidat'}</p>
                </div>
              </div>
            </div>

            {/* Sidebar Actions */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Compte</h2>
              
              <button 
                onClick={handleLogout}
                className="w-full flex items-center justify-between p-4 rounded-xl text-red-600 bg-red-50 hover:bg-red-100 transition-colors border border-red-100 group"
              >
                <div className="flex items-center space-x-3">
                  <LogOut className="h-5 w-5" />
                  <span className="font-semibold">{t('logout')}</span>
                </div>
                <div className="h-8 w-8 rounded-lg bg-white flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                  →
                </div>
              </button>

              <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 text-blue-800 text-sm">
                <p className="font-medium mb-1">Besoin d'aide ?</p>
                <p className="text-blue-600">Si vous avez des questions sur votre compte, contactez le support.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

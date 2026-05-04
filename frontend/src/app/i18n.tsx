import React from 'react';

export const translations: Record<string, Record<string, string>> = {
  fr: {
    siteTitle: 'e-RH Larache',
    siteSubtitle: 'Commune de Larache',
    loginTitle: 'Connexion e-RH',
    loginDescription: "Connectez-vous à votre compte",
    registerDescription: "Créez votre compte",
    name: 'Nom complet',
    email: 'Email',
    emailPlaceholder: 'vous@exemple.com',
    password: 'Mot de passe',
    passwordPlaceholder: '••••••••',
    createAccount: 'Créer mon compte',
    loginButton: 'Se connecter',
    demoCandidate: 'Connexion - Candidat',
    noAccount: "Pas de compte ? S'enregistrer",
    alreadyAccount: 'Déjà un compte ? Se connecter',
    accueil: 'Accueil',
    concours: 'Concours',
    logout: 'Déconnexion',
    platformDescription: "Plateforme officielle de gestion des ressources humaines.",
    copyright: '© 2026 Commune de Larache. Tous droits réservés.',
    voirLesConcours: 'Voir les concours',
    joinTitle: 'Rejoignez la Commune de Larache',
    joinDescription: 'Portail officiel de recrutement pour les médecins, infirmiers et vétérinaires. Postulez en ligne et suivis votre dossiers.',
    apply: 'Postuler',
    postsAvailable: '{count} postes à pourvoir',
    status_upcoming: 'Bientôt',
    status_open: 'Ouvert',
    status_closed: 'Fermé',
    status_cancelled: 'Annulé',
    noConcoursAvailable: 'Aucun concours disponible',
    comeBackLater: 'Revenez plus tard pour voir les nouvelles offres.',
    concoursOuverts: 'Concours ouverts',
    aucunConcours: 'Aucun concours disponible',
    chargementConcours: 'Chargement des concours...',
    dashboardDescription: "Portail de recrutement de la commune de Larache.",
    register_success: 'Compte créé avec succès. Veuillez vous connecter.',
    invalid_email: 'Adresse email invalide',
    wrong_credentials: 'Email ou mot de passe incorrect',
    demo_unavailable: 'Accès démo non disponible. Veuillez vous enregistrer.',
    
    // Footer
    footer_ehr: 'e-RH Larache',
    footer_contact: 'Contact',
    footer_copyright: 'Copyright © 2026 Commune de Larache.',
    footer_cookie: 'Politique des cookies',
    footer_privacy: 'Politique de confidentialité',

    // Why choose
    why_title: "Pourquoi choisir notre plateforme ?",
    why_sub: "Plateforme moderne pour simplifier les processus de recrutement",
    why_transformation_title: "Transformation digitale",
    why_transformation_desc: "Remplacez les processus papier par un système RH numérique.",
    why_efficiency_title: "Efficacité",
    why_efficiency_desc: "Traitement plus rapide des recrutements.",
    why_transparency_title: "Transparence",
    why_transparency_desc: "Suivi clair des candidatures.",
    why_centralized_title: "Données centralisées",
    why_centralized_desc: "Données candidats stockées en un seul endroit sécurisé.",
    why_automation_title: "Automatisation",
    why_automation_desc: "Génération automatique de documents.",
    why_security_title: "Sécurité",
    why_security_desc: "Authentification sécurisée et contrôle d'accès.",
    why_accessibility_title: "Accessibilité",
    why_accessibility_desc: "Accessible sur bureau et mobile",
    why_decision_title: "Meilleure décision",
    why_decision_desc: "Sélection basée sur le mérite et la transparence.",

    // Concours page
    concours_page_title: 'Concours',
    concours_page_description: "Liste des concours disponibles — filtrez et recherchez en temps réel.",
    search_placeholder: 'Recherche par titre ou description...',
    cat_all: 'Toutes catégories',
    cat_medecin: 'Médecin',
    cat_infirmier: 'Infirmier',
    cat_veterinaire: 'Vétérinaire',
    status_all: 'Tous statuts',
    status_open: 'Ouvert',
    status_closed: 'Fermé',
    date_recent: 'Récents',
    date_old: 'Anciens',
    no_results: 'Aucun résultat trouvé.',
    error_load_concours: "Impossible de charger les concours",
    loading_text: 'Chargement...',
    postuler: 'Postuler',
    desc_medecin: "Concours pour les postes de médecins dans différentes spécialités.",
    desc_infirmier: "Concours pour les postes d'infirmiers et infirmières.",
    desc_veterinaire: "Concours pour postes de vétérinaires au sein des services municipaux.",
    profile: 'Profil',
    editProfile: 'Modifier le profil',
    role: 'Rôle',
    annonces: 'Annonces',
    actualites: 'Actualités',
    liensUtiles: 'Liens Utiles',
    link_commune: 'La commune',
    link_presidence: 'Les activités de la présidence',
    link_sessions: 'Les sessions',
    link_appels: "Les appels d'offre",
    link_projets: 'Les grands projets',
    link_consultation: 'Consultation de dossier',
    link_ville: 'La ville',
    link_jardins: 'Jardins de Marrakech',
    link_transport: 'Transport',
    link_sport: 'Sport et culture',
    link_entrepreneuriat: 'Entreprenariat',
    link_sante: 'Santé à Marrakech',
    link_visite: 'Visite guidée',
    link_associatif: 'Vie Associative',
    link_commune_ligne: 'Commune en ligne',
    link_bureau_ordre: "Bureau d'Ordre Digital",
    link_chikaya: 'Chikaya',
    link_allo_mouatine: 'Allo Mouatine',
    link_watiqa: 'Watiqa',
    link_rokhas: 'Rokhas',
    link_marches: 'Portail marchés publics',
    link_chafafiya: 'Chafafiya',
    annonces_title: 'Annonces',
    annonce_officielle: 'Annonce Officielle',
    annonce_1_title: 'Avis de concours professionnel',
    annonce_1_desc: "Avis de concours professionnel pour l'accès au grade d'Administrateur 2ème grade.",
    annonce_2_title: 'Résultats de sélection',
    annonce_2_desc: "Résultats de la présélection pour le poste d'ingénieur d'état.",
    actualites_title: 'Actualités',
    actu_1_title: 'Inauguration du nouveau centre',
    actu_1_desc: 'Le président de la commune a inauguré le nouveau centre administratif.',
    actu_2_title: 'Lancement du portail e-RH',
    actu_2_desc: 'Lancement officiel du nouveau portail des ressources humaines pour les fonctionnaires.',
    docs_officiels: 'Documents officiels',
    hr_title: 'Human Resources',
    traduction_officielle: 'Édition de traduction officielle',
    talent_management: 'Talent Management',
    workforce_management: 'Workforce Management',
    payroll: 'Payroll',
    stats_digitalise: 'Digitalisé',
    stats_accessible: 'Accessible',
    stats_transparence: 'Transparence',
    stats_garantie: 'Garantie',
    stats_support: 'Support',
    stats_reactif: 'Réactif',
    ou: 'OU',
    admin_login_title: 'Connexion Administrateur',
    return_candidate: 'Retour Espace Candidat',
    admin_btn: 'Admin',
  },
  ar: {
    siteTitle: 'الموارد البشرية - العرائش',
    siteSubtitle: 'بلدية العرائش',
    loginTitle: 'تسجيل الدخول',
    loginDescription: 'سجّل دخولك إلى حسابك',
    registerDescription: 'أنشئ حسابك',
    name: 'الاسم الكامل',
    email: 'البريد الإلكتروني',
    emailPlaceholder: 'you@exemple.com',
    password: 'كلمة المرور',
    passwordPlaceholder: '••••••••',
    createAccount: 'إنشاء حساب',
    loginButton: 'تسجيل الدخول',
    demoCandidate: 'تسجيل دخول - المترشح',
    noAccount: 'لا تملك حساباً؟ سجّل',
    alreadyAccount: 'هل لديك حساب؟ تسجيل الدخول',
    accueil: 'الصفحة الرئيسية',
    concours: 'المباريات',
    logout: 'تسجيل الخروج',
    platformDescription: 'المنصة الرسمية لإدارة الموارد البشرية.',
    copyright: '© 2026 بلدية العرائش. جميع الحقوق محفوظة.',
    voirLesConcours: 'عرض المباريات',
    joinTitle: 'انضم إلى بلدية العرائش',
    joinDescription: 'المنصة الرسمية للتوظيف للأطباء والممرضين والبيطريين. قدّم عبر الإنترنت وتابع ملفك.',
    apply: 'التقدّم',
    postsAvailable: 'هناك {count} مناصب شاغرة',
    status_upcoming: 'قريباً',
    status_open: 'مفتوح',
    status_closed: 'مغلق',
    status_cancelled: 'ملغى',
    noConcoursAvailable: 'لا توجد مسابقات متاحة',
    comeBackLater: 'عد لاحقاً للاطلاع على العروض الجديدة.',
    concoursOuverts: 'المباريات المفتوحة',
    aucunConcours: 'لا توجد مباريات متاحة',
    chargementConcours: 'جارٍ تحميل المباريات...',
    dashboardDescription: 'بوابة التوظيف لجماعة العرائش.',
    register_success: 'تم إنشاء الحساب بنجاح. يرجى تسجيل الدخول.',
    invalid_email: 'عنوان بريد إلكتروني غير صالح',
    wrong_credentials: 'البريد الإلكتروني أو كلمة المرور غير صحيحة',
    demo_unavailable: 'وضع العرض التوضيحي غير متوفر. الرجاء التسجيل.',
    
    // Footer
    footer_ehr: 'الموارد البشرية العرائش',
    footer_contact: 'اتصل بنا',
    footer_copyright: 'حقوق النشر © 2026 بلدية العرائش.',
    footer_cookie: 'سياسة الكوكيز',
    footer_privacy: 'سياسة الخصوصية',

    // Why choose
    why_title: "لماذا تختار المنصة؟",
    why_sub: "منصة حديثة لتبسيط إجراءات التوظيف",
    why_transformation_title: "التحول الرقمي",
    why_transformation_desc: "استبدال العمليات الورقية بنظام موارد بشرية رقمي.",
    why_efficiency_title: "الكفاءة",
    why_efficiency_desc: "معالجة أسرع لعمليات التوظيف.",
    why_transparency_title: "الشفافية",
    why_transparency_desc: "تتبع واضح للطلبات.",
    why_centralized_title: "بيانات مركزية",
    why_centralized_desc: "جميع بيانات المترشحين مخزنة في مكان واحد آمن.",
    why_automation_title: "الأتمتة",
    why_automation_desc: "توليد تلقائي للمستندات.",
    why_security_title: "الأمن",
    why_security_desc: "مصادقة آمنة والتحكم في الوصول.",
    why_accessibility_title: "قابلية الوصول",
    why_accessibility_desc: "متاحة على سطح المكتب والجوال",
    why_decision_title: "اتخاذ قرارات أفضل",
    why_decision_desc: "اختيار مبني على الاستحقاق والشفافية.",

    // Concours page
    concours_page_title: 'المباريات',
    concours_page_description: 'قائمة المباريات المتاحة — صفّ وفرّز وابحث فورياً.',
    search_placeholder: 'ابحث بالعنوان أو الوصف...',
    cat_all: 'جميع الفئات',
    cat_medecin: 'طبيب',
    cat_infirmier: 'ممرض/ممرضة',
    cat_veterinaire: 'بيطري',
    status_all: 'جميع الحالات',
    status_open: 'مفتوح',
    status_closed: 'مغلق',
    date_recent: 'الأحدث',
    date_old: 'الأقدم',
    no_results: 'لا توجد نتائج.',
    loading_text: 'جارٍ التحميل...',
    postuler: 'التقدّم',
    error_load_concours: 'تعذر تحميل المسابقات',
    desc_medecin: 'مسابقة لشغل مناصب الأطباء في تخصصات مختلفة.',
    desc_infirmier: 'مسابقة لشغل مناصب الممرضين والممرضات.',
    desc_veterinaire: 'مسابقة لشغل مناصب الأطباء البيطريين داخل المصالح البلدية.',
    profile: 'الملف الشخصي',
    editProfile: 'تعديل الملف الشخصي',
    role: 'الدور',
    annonces: 'إعلانات',
    actualites: 'أخبار',
    liensUtiles: 'روابط مفيدة',
    link_commune: 'الجماعة',
    link_presidence: 'أنشطة الرئاسة',
    link_sessions: 'الدورات',
    link_appels: 'طلبات العروض',
    link_projets: 'المشاريع الكبرى',
    link_consultation: 'استشارة ملف',
    link_ville: 'المدينة',
    link_jardins: 'حدائق مراكش',
    link_transport: 'النقل',
    link_sport: 'الرياضة والثقافة',
    link_entrepreneuriat: 'ريادة الأعمال',
    link_sante: 'الصحة بمراكش',
    link_visite: 'جولة سياحية',
    link_associatif: 'الحياة الجمعوية',
    link_commune_ligne: 'الجماعة على الإنترنت',
    link_bureau_ordre: 'مكتب الضبط الرقمي',
    link_chikaya: 'شكاية',
    link_allo_mouatine: 'ألو مواطن',
    link_watiqa: 'وثيقة',
    link_rokhas: 'رخص',
    link_marches: 'بوابة الصفقات العمومية',
    link_chafafiya: 'شفافية',
    annonces_title: 'الإعلانات',
    annonce_officielle: 'إعلان رسمي',
    annonce_1_title: 'إعلان عن مباراة مهنية',
    annonce_1_desc: 'إعلان عن مباراة مهنية لولوج درجة متصرف من الدرجة الثانية.',
    annonce_2_title: 'نتائج الانتقاء',
    annonce_2_desc: 'نتائج الانتقاء الأولي لمنصب مهندس دولة.',
    actualites_title: 'الأخبار',
    actu_1_title: 'افتتاح المركز الجديد',
    actu_1_desc: 'افتتح رئيس الجماعة المركز الإداري الجديد.',
    actu_2_title: 'إطلاق بوابة الموارد البشرية',
    actu_2_desc: 'الإطلاق الرسمي للبوابة الجديدة للموارد البشرية للموظفين.',
    docs_officiels: 'وثائق رسمية',
    hr_title: 'الموارد البشرية',
    traduction_officielle: 'نسخة الترجمة الرسمية',
    talent_management: 'إدارة المواهب',
    workforce_management: 'إدارة القوى العاملة',
    payroll: 'الرواتب',
    stats_digitalise: 'رقمي',
    stats_accessible: 'متاح',
    stats_transparence: 'شفافية',
    stats_garantie: 'مضمونة',
    stats_support: 'دعم',
    stats_reactif: 'سريع الاستجابة',
    ou: 'أو',
    admin_login_title: 'تسجيل دخول المسؤول',
    return_candidate: 'العودة لفضاء المترشح',
    admin_btn: 'مسؤول',
  },
};

const STORAGE_KEY = 'app_lang';

type I18nContextShape = {
  lang: string;
  setLang: (l: string) => void;
  t: (key: string) => string;
};

const I18nContext = React.createContext<I18nContextShape | undefined>(undefined);

export const LanguageProvider: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  const [lang, setLangState] = React.useState<string>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored || 'fr';
    } catch (e) {
      return 'fr';
    }
  });

  const setLang = (l: string) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch (e) {
      // ignore
    }
  };

  const t = (key: string) => {
    return translations[lang] && translations[lang][key]
      ? translations[lang][key]
      : // fallback to fr then key
        (translations['fr'] && translations['fr'][key]) || key;
  };

  React.useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    }
  }, [lang]);

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useTranslation = () => {
  const ctx = React.useContext(I18nContext);
  if (!ctx) throw new Error('useTranslation must be used within LanguageProvider');
  return ctx;
};

export const getStoredLang = () => {
  try {
    return localStorage.getItem(STORAGE_KEY) || 'fr';
  } catch (e) {
    return 'fr';
  }
};

<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>e-RH Larache - Gestion des Ressources Humaines</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

        <!-- Styles -->
        @vite(['resources/css/app.css', 'resources/js/app.js'])
    </head>
    <body class="bg-[#FDFDFC] dark:bg-[#0a0a0a] text-[#1b1b18] flex h-screen">
        <!-- Navigation Header -->
        <nav class="w-full bg-white dark:bg-[#161615] border-b border-[#e3e3e0] dark:border-[#3e3e3a] shadow-sm">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-16">
                    <!-- Logo -->
                    <div class="flex-shrink-0 flex items-center">
                        <span class="text-xl font-bold text-[#1b1b18] dark:text-[#EDEDEC]">e-RH Larache</span>
                    </div>
                    
                    <!-- Navigation Links -->
                    <div class="hidden md:flex items-center space-x-8">
                        <a href="#home" class="text-[#1b1b18] dark:text-[#EDEDEC] hover:text-[#391800] dark:hover:text-[#FF750F] px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">Accueil</a>
                        <a href="#concours" class="text-[#1b1b18] dark:text-[#EDEDEC] hover:text-[#391800] dark:hover:text-[#FF750F] px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">Concours</a>
                        <a href="#services" class="text-[#1b1b18] dark:text-[#EDEDEC] hover:text-[#391800] dark:hover:text-[#FF750F] px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">Services</a>
                    </div>
                    
                    <!-- Auth Buttons -->
                    <div class="flex items-center space-x-4">
                        <a href="#login" class="text-[#391800] dark:text-[#EDEDEC] hover:text-[#1b1b18] dark:hover:text-[#EDEDEC] px-4 py-2 rounded-md border border-[#391800] dark:border-[#EDEDEC] hover:bg-[#391800] dark:hover:bg-[#EDEDEC] transition-all duration-200 font-medium">Espace privé</a>
                        <!-- Avatar/Profile Icon -->
                        <div class="relative group">
                            <div class="w-8 h-8 rounded-full bg-[#391800] dark:bg-[#FF750F] flex items-center justify-center cursor-pointer transition-colors duration-200">
                                <span class="text-white text-xs font-semibold">U</span>
                            </div>
                            <div class="absolute right-0 mt-2 w-48 bg-white dark:bg-[#161615] border border-[#e3e3e0] dark:border-[#3e3e3a] rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                <a href="#profile" class="block px-4 py-2 text-sm text-[#1b1b18] dark:text-[#EDEDEC] hover:bg-[#f5f5f0] dark:hover:bg-[#2a2a2a] transition-colors duration-150">Mon profil</a>
                                <a href="#settings" class="block px-4 py-2 text-sm text-[#1b1b18] dark:text-[#EDEDEC] hover:bg-[#f5f5f0] dark:hover:bg-[#2a2a2a] transition-colors duration-150">Paramètres</a>
                                <div class="border-t border-[#e3e3e0] dark:border-[#3e3e3a]"></div>
                                <a href="#logout" class="block px-4 py-2 text-sm text-[#e85555] dark:text-[#ff7575] hover:bg-[#f5f5f0] dark:hover:bg-[#2a2a2a] transition-colors duration-150">Déconnexion</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>

        <!-- Hero Section -->
        <div class="flex flex-col lg:flex-row items-center justify-between min-h-screen bg-[#FDFDFC] dark:bg-[#0a0a0a] p-6 lg:p-12">
            <!-- Left Column: Content -->
            <div class="lg:w-1/2 mb-12 lg:mb-0 text-center lg:text-left">
                <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1b1b18] dark:text-[#EDEDEC] mb-6 leading-tight">
                    Système de Gestion des Ressources Humaines
                    <span class="block text-[#391800] dark:text-[#FF750F] mt-4">- e-RH Larache</span>
                </h1>
                
                <p class="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-2xl">
                    Plateforme innovante dédiée à la gestion complète des ressources humaines. Optimisez vos processus, améliorez la collaboration et boostez l'efficacité de votre équipe avec notre solution intégrée.
                </p>
                
                <!-- Action Buttons -->
                <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <a href="#concours" class="bg-[#391800] dark:bg-[#FF750F] text-white px-8 py-3 rounded-lg hover:bg-opacity-90 dark:hover:bg-opacity-90 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold text-sm">
                        Voir les concours
                    </a>
                    <a href="#register" class="bg-white dark:bg-[#161615] text-[#391800] dark:text-[#EDEDEC] px-8 py-3 rounded-lg border-2 border-[#391800] dark:border-[#FF750F] hover:bg-[#391800] dark:hover:bg-[#FF750F] hover:text-white dark:hover:text-white transition-all duration-200 transform hover:scale-105 font-semibold text-sm">
                        Créer un compte
                    </a>
                    <a href="#private" class="bg-white dark:bg-[#161615] text-[#391800] dark:text-[#EDEDEC] px-6 py-3 rounded-lg border border-[#391800] dark:border-[#FF750F] hover:bg-[#391800] dark:hover:bg-[#FF750F] hover:text-white dark:hover:text-white transition-all duration-200 transform hover:scale-105 font-semibold text-sm">
                        Espace privé
                    </a>
                </div>
            </div>
            
            <!-- Right Column: Illustration -->
            <div class="lg:w-1/2 flex justify-center">
                <div class="relative transform rotate-[-5deg] hover:rotate-0 transition-transform duration-500">
                    <!-- Modern HR Dashboard Card -->
                    <div class="w-[420px] h-[500px] bg-white dark:bg-[#161615] rounded-2xl shadow-2xl border border-[#e3e3e0] dark:border-[#3e3e3a] overflow-hidden relative group">
                        <!-- Decorative Top Bar -->
                        <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#391800] via-[#FF750F] to-[#391800]"></div>
                        
                        <!-- Header -->
                        <div class="p-6 border-b border-[#e3e3e0] dark:border-[#3e3e3a] bg-[#fafafa] dark:bg-[#1f1f1f]">
                            <h3 class="text-lg font-bold text-[#1b1b18] dark:text-[#EDEDEC] flex items-center gap-2">
                                <svg class="w-5 h-5 text-[#391800] dark:text-[#FF750F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                                </svg>
                                Tableau de Bord HR
                            </h3>
                        </div>
                        
                        <!-- Body Content -->
                        <div class="p-6 space-y-4">
                            <div class="space-y-3">
                                <div class="flex items-center justify-between p-3 bg-[#f5f5f0] dark:bg-[#2a2a2a] rounded-lg">
                                    <div>
                                        <p class="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Total Concours</p>
                                        <p class="text-xl font-bold text-[#391800] dark:text-[#FF750F]">24</p>
                                    </div>
                                    <svg class="w-8 h-8 text-[#391800] dark:text-[#FF750F] opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-.895 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                    </svg>
                                </div>
                                
                                <div class="flex items-center justify-between p-3 bg-[#f5f5f0] dark:bg-[#2a2a2a] rounded-lg">
                                    <div>
                                        <p class="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Candidatures Actives</p>
                                        <p class="text-xl font-bold text-[#391800] dark:text-[#FF750F]">156</p>
                                    </div>
                                    <svg class="w-8 h-8 text-[#391800] dark:text-[#FF750F] opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
                                    </svg>
                                </div>
                                
                                <div class="flex items-center justify-between p-3 bg-[#f5f5f0] dark:bg-[#2a2a2a] rounded-lg">
                                    <div>
                                        <p class="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Fonctionnaires</p>
                                        <p class="text-xl font-bold text-[#391800] dark:text-[#FF750F]">89</p>
                                    </div>
                                    <svg class="w-8 h-8 text-[#391800] dark:text-[#FF750F] opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                                    </svg>
                                </div>
                            </div>
                            
                            <!-- Quick Actions -->
                            <div class="pt-4 border-t border-[#e3e3e0] dark:border-[#3e3e3a]">
                                <p class="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Actions Rapides</p>
                                <div class="grid grid-cols-2 gap-3">
                                    <a href="#" class="bg-[#f5f5f0] dark:bg-[#2a2a2a] p-4 rounded-xl hover:bg-[#e8e8e0] dark:hover:bg-[#333333] transition-colors text-center">
                                        <div class="text-2xl font-bold text-[#391800] dark:text-[#FF750F] mb-1">📋</div>
                                        <span class="text-xs text-[#1b1b18] dark:text-[#EDEDEC]">Nouveau Concours</span>
                                    </a>
                                    <a href="#" class="bg-[#f5f5f0] dark:bg-[#2a2a2a] p-4 rounded-xl hover:bg-[#e8e8e0] dark:hover:bg-[#333333] transition-colors text-center">
                                        <div class="text-2xl font-bold text-[#391800] dark:text-[#FF750F] mb-1">📊</div>
                                        <span class="text-xs text-[#1b1b18] dark:text-[#EDEDEC]">Statistiques</span>
                                    </a>
                                    <a href="#" class="bg-[#f5f5f0] dark:bg-[#2a2a2a] p-4 rounded-xl hover:bg-[#e8e8e0] dark:hover:bg-[#333333] transition-colors text-center">
                                        <div class="text-2xl font-bold text-[#391800] dark:text-[#FF750F] mb-1">📝</div>
                                        <span class="text-xs text-[#1b1b18] dark:text-[#EDEDEC]">Gestion Candidats</span>
                                    </a>
                                    <a href="#" class="bg-[#f5f5f0] dark:bg-[#2a2a2a] p-4 rounded-xl hover:bg-[#e8e8e0] dark:hover:bg-[#333333] transition-colors text-center">
                                        <div class="text-2xl font-bold text-[#391800] dark:text-[#FF750F] mb-1">⚙️</div>
                                        <span class="text-xs text-[#1b1b18] dark:text-[#EDEDEC]">Paramètres</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Footer -->
        <footer class="w-full bg-[#1b1b18] dark:bg-[#2a2a2a] text-white dark:text-[#EDEDEC] py-8 mt-auto">
            <div class="max-w-7xl mx-auto px-4 text-center text-sm opacity-70">
                <p>&copy; 2024 e-RH Larache. Tous droits réservés.</p>
            </div>
        </footer>
    </body>
</html>
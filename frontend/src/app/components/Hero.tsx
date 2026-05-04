import React from 'react';

export function Hero() {
  // Unsplash source query returns a Morocco / Larache related placeholder image
  const bgUrl = "https://source.unsplash.com/1600x900/?morocco,larache,coast,architecture";

  return (
    <section className="relative rounded-lg overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgUrl})` }}
        aria-hidden
      />

      {/* Overlay gradient to keep text readable */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 via-slate-900/30 to-transparent" aria-hidden />

      <div className="relative px-6 py-12 sm:py-16 lg:py-20 lg:px-8">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-6">
          <div className="max-w-2xl text-white">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">Bienvenue à Larache</h1>
            <p className="mt-3 text-lg sm:text-xl text-slate-100/90">Système de Gestion des Ressources Humaines</p>
          </div>

          {/* Optional medical staff illustration - decorative only */}
          <div className="hidden md:block w-48 lg:w-56 flex-shrink-0">
            <svg viewBox="0 0 200 200" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden>
              <defs>
                <linearGradient id="g" x1="0" x2="1">
                  <stop offset="0" stopColor="#60a5fa" />
                  <stop offset="1" stopColor="#34d399" />
                </linearGradient>
              </defs>
              <rect width="200" height="200" rx="12" fill="url(#g)" opacity="0.08" />

              {/* Simple stylized staff figures */}
              <g transform="translate(20,30)">
                <circle cx="30" cy="30" r="18" fill="#fff" opacity="0.95" />
                <rect x="18" y="52" width="24" height="36" rx="6" fill="#fff" opacity="0.95" />
              </g>

              <g transform="translate(80,20)">
                <circle cx="30" cy="30" r="18" fill="#fff" opacity="0.95" />
                <rect x="18" y="52" width="26" height="40" rx="6" fill="#fff" opacity="0.95" />
                {/* simple stethoscope */}
                <path d="M44 56c6 6 12 6 18 0" stroke="#0f172a" strokeWidth="2" fill="none" opacity="0.6" />
              </g>

              <g transform="translate(130,40)">
                <circle cx="20" cy="24" r="14" fill="#fff" opacity="0.95" />
                <rect x="8" y="40" width="24" height="32" rx="6" fill="#fff" opacity="0.95" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;

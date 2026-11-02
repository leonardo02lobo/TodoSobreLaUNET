// components/Header.jsx
import { useState, useEffect } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleClick = (e) => {
      if (e.target.tagName === 'A') {
        closeMenu();
      }
    };

    const menuLinks = document.querySelectorAll('#mobile-menu a');
    menuLinks.forEach(link => {
      link.addEventListener('click', handleClick);
    });

    return () => {
      menuLinks.forEach(link => {
        link.removeEventListener('click', handleClick);
      });
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        closeMenu();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className="bg-linear-to-b from-slate-50 via-emerald-50/25 to-slate-100 text-slate-800 relative overflow-hidden border-b border-emerald-500/10">
      {/* Fondo con micro-grid tecnológico */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
        <div className="grid grid-cols-12 gap-4 h-full">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className={`col-span-1 ${i < 11 ? 'border-r border-emerald-600' : ''}`}></div>
          ))}
        </div>
      </div>

      {/* Luces sutiles de ambiente */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-20 right-1/4 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Escaneo animado sutil */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-emerald-500 to-transparent animate-terminal-scan"></div>
      </div>

      <div className="relative z-10">
        {/* Navbar Flotante Glassmorphism */}
        <nav className="container mx-auto px-6 py-4 fixed top-0 left-0 right-0 bg-white/85 backdrop-blur-md border-b border-emerald-500/20 z-50 rounded-b-3xl shadow-xs transition-all duration-300">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <a href="/" className="flex items-center gap-2.5 group">
                <img
                  src="/gceii-transparent.webp"
                  alt="CEII UNET"
                  className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
                <span className="text-xl font-bold font-mono tracking-tight text-emerald-600">
                  UNET
                </span>
              </a>
            </div>

            <div className="hidden md:flex items-center space-x-6">
              <a href="/" className="text-slate-600 hover:text-emerald-600 transition-all font-mono text-sm font-medium hover:bg-emerald-50/80 px-3.5 py-2 rounded-lg border-b-2 border-transparent hover:border-emerald-500">
                Inicio
              </a>
              <a href="/Proyectos" className="text-slate-600 hover:text-emerald-600 transition-all font-mono text-sm font-medium hover:bg-emerald-50/80 px-3.5 py-2 rounded-lg border-b-2 border-transparent hover:border-emerald-500">
                Proyectos
              </a>
              <a href="/Eventos" className="text-slate-600 hover:text-emerald-600 transition-all font-mono text-sm font-medium hover:bg-emerald-50/80 px-3.5 py-2 rounded-lg border-b-2 border-transparent hover:border-emerald-500">
                Eventos
              </a>
              <a href="#footer" className="bg-linear-to-r from-emerald-500 to-teal-500 text-white px-5 py-2 rounded-xl font-bold hover:from-emerald-600 hover:to-teal-600 transition-all font-mono text-sm shadow-md shadow-emerald-500/20 hover:shadow-lg hover:shadow-emerald-500/30 hover:-translate-y-0.5">
                Contactar
              </a>
            </div>

            <button
              onClick={toggleMenu}
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 text-emerald-600 hover:text-emerald-700 transition-colors relative z-60"
              aria-label="Abrir menú"
            >
              <span className="sr-only">Abrir menú</span>
              <div className={`w-6 h-0.5 bg-emerald-600 mb-1.5 transition-all duration-300 ${isMenuOpen ? 'transform rotate-45 translate-y-2' : ''}`}></div>
              <div className={`w-6 h-0.5 bg-emerald-600 mb-1.5 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
              <div className={`w-6 h-0.5 bg-emerald-600 transition-all duration-300 ${isMenuOpen ? 'transform -rotate-45 -translate-y-2' : ''}`}></div>
            </button>
          </div>

          {/* Menú Móvil */}
          <div
            id="mobile-menu"
            className={`md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-b border-emerald-500/20 mt-2 rounded-b-2xl overflow-hidden shadow-xl transition-all duration-300 ${
              isMenuOpen ? 'max-h-96 opacity-100 py-4' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="container mx-auto px-6 space-y-3">
              <a href="/" className="block text-slate-700 hover:text-emerald-600 transition-all font-mono text-sm font-medium hover:bg-emerald-50 px-4 py-2.5 rounded-lg border-l-2 border-transparent hover:border-emerald-500">
                Inicio
              </a>
              <a href="/Proyectos" className="block text-slate-700 hover:text-emerald-600 transition-all font-mono text-sm font-medium hover:bg-emerald-50 px-4 py-2.5 rounded-lg border-l-2 border-transparent hover:border-emerald-500">
                Proyectos
              </a>
              <a href="/Eventos" className="block text-slate-700 hover:text-emerald-600 transition-all font-mono text-sm font-medium hover:bg-emerald-50 px-4 py-2.5 rounded-lg border-l-2 border-transparent hover:border-emerald-500">
                Eventos
              </a>
              <a href="#footer" className="block bg-linear-to-r from-emerald-500 to-teal-500 text-white px-5 py-2.5 rounded-xl font-bold hover:from-emerald-600 hover:to-teal-600 transition-all font-mono text-center text-sm shadow-md mt-2">
                Contactar
              </a>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="container mx-auto px-6 pt-36 pb-16">
          <h1 className="text-2xl sm:text-4xl lg:text-6xl font-extrabold text-slate-900 mb-8 font-mono leading-tight text-center tracking-tight">
            CENTRO DE ESTUDIANTES <br />
            <span className="text-transparent bg-linear-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text">
              &gt;&gt; INGENIERÍA EN INFORMÁTICA {"<<"}
            </span>
          </h1>

          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row justify-between items-stretch gap-8">
              {/* Terminal Interactiva estilo Coder */}
              <div className="w-full lg:w-3/5 flex">
                <div className="bg-slate-900 text-slate-100 rounded-2xl p-6 border border-emerald-500/30 shadow-xl shadow-slate-900/10 w-full flex flex-col justify-between terminal-window">
                  <div>
                    <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>
                      <span className="text-xs font-mono text-slate-400">ceii-bash - 2026.1</span>
                    </div>

                    <div className="font-mono text-sm space-y-3">
                      <div>
                        <span className="text-emerald-400">ceii@unet.edu.ve:~$</span>{' '}
                        <span className="text-slate-100">status --system</span>
                      </div>
                      <div className="space-y-2 text-slate-300 pl-2 border-l border-emerald-500/30">
                        <div className="flex items-center gap-2">
                          <span className="text-emerald-400">✓</span>
                          <span>Sistema de representación estudiantil activo [2026]</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-emerald-400">✓</span>
                          <span>Conectando talento y promoviendo innovación tecnológica</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-emerald-400">✓</span>
                          <span>Plataforma de gestión y recursos estudiantiles</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-emerald-400">✓</span>
                          <span>Comunidad académica integrada UNET</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800 font-mono text-xs">
                    <div className="mb-1">
                      <span className="text-emerald-400">ceii@unet.edu.ve:~$</span>{' '}
                      <span className="text-slate-100">system_info --version</span>
                    </div>
                    <div className="text-slate-300">
                      <span className="text-emerald-400 font-bold">CEII Platform</span> v2.0.26 |
                      <span className="text-cyan-400 font-semibold"> UNET</span> |
                      <span className="text-emerald-400 font-semibold"> Status: ONLINE 🟢</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tarjeta Logo Estilo "Chip" de Hardware Moderno */}
              <div className="w-full lg:w-2/5 flex justify-center items-center">
                <div className="relative group w-full h-full">
                  {/* Resplandor suave detrás del chip */}
                  <div className="absolute -inset-1.5 bg-linear-to-r from-emerald-400 via-teal-400 to-cyan-500 rounded-3xl blur-md opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>

                  <div className="relative bg-white rounded-2xl p-6 border-2 border-emerald-200/80 shadow-xl shadow-emerald-500/10 w-full h-full flex flex-col items-center justify-between transition-all duration-300 group-hover:border-emerald-400">
                    {/* Header del chip */}
                    <div className="w-full flex items-center justify-between pb-3 border-b border-slate-100">
                      <div className="flex space-x-1.5">
                        <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></div>
                        <div className="w-2.5 h-2.5 bg-teal-400 rounded-full"></div>
                        <div className="w-2.5 h-2.5 bg-cyan-400 rounded-full"></div>
                      </div>
                      <span className="text-[11px] font-mono text-slate-400 tracking-wider">HARDWARE_ID: CEII_2026</span>
                    </div>

                    {/* Logo con contenedor proporcionado que muestra todos los circuitos sin recortes */}
                    <div className="my-auto py-4 px-2 w-full flex items-center justify-center">
                      <img
                        src="/gceii.webp"
                        alt="Centro de Estudiantes Ingeniería en Informática UNET"
                        className="w-full max-w-[280px] max-h-[160px] object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>

                    {/* Footer del chip con badge interactivo */}
                    <div className="w-full pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        [CEII_TEAM 2026]
                      </span>
                      <span className="text-xs font-mono text-slate-500 font-medium">UNET • Táchira</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .terminal-window {
          box-shadow: 0 10px 30px -10px rgba(16, 185, 129, 0.15), 0 0 0 1px rgba(16, 185, 129, 0.1);
        }
        @keyframes terminal-scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        .animate-terminal-scan {
          animation: terminal-scan 10s linear infinite;
        }
      `}</style>
    </header>
  );
};

export default Header;
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
    <header className="bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Fondo con grid */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-12 gap-4 h-full">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className={`col-span-1 ${i < 11 ? 'border-r border-cyan-500' : ''}`}></div>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-cyan-400 to-transparent animate-pulse"></div>
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-blue-400 to-transparent animate-pulse animation-delay-1000"></div>
        <div className="absolute top-3/4 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-purple-400 to-transparent animate-pulse animation-delay-2000"></div>
      </div>

      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-cyan-400 to-transparent animate-terminal-scan"></div>
        <div className="absolute top-10 left-10 text-cyan-300/10 font-mono text-sm">
          &gt; Initializing CEII system...
        </div>
        <div className="absolute top-20 left-20 text-cyan-300/10 font-mono text-sm">
          &gt; Loading student modules...
        </div>
        <div className="absolute bottom-20 right-10 text-cyan-300/10 font-mono text-sm">
          &gt; Centro de Estudiantes ready
        </div>
      </div>

      <div className="relative z-10">
        <nav className="container mx-auto px-6 py-6 fixed top-0 left-0 right-0 bg-gray-900/70 backdrop-blur-sm border-b border-cyan-400/20 z-50 rounded-b-4xl">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 bg-linear-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center shadow-lg terminal-glow">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div className="absolute -inset-1 bg-cyan-400 rounded-lg blur opacity-30"></div>
              </div>
              <a href="/" className="text-2xl font-bold text-white font-mono">
                CEII-UNET
              </a>
            </div>

            <div className="hidden md:flex items-center space-x-6">
              <a href="/" className="text-gray-400 hover:text-cyan-400 transition-all font-mono text-sm hover:bg-cyan-400/10 px-3 py-2 rounded border-b-2 border-transparent hover:border-cyan-400">
                Inicio
              </a>
              <a href="/Noticias" className="text-gray-400 hover:text-cyan-400 transition-all font-mono text-sm hover:bg-cyan-400/10 px-3 py-2 rounded border-b-2 border-transparent hover:border-cyan-400">
                Noticias
              </a>
              <a href="/Eventos" className="text-gray-400 hover:text-cyan-400 transition-all font-mono text-sm hover:bg-cyan-400/10 px-3 py-2 rounded border-b-2 border-transparent hover:border-cyan-400">
                Eventos
              </a>
              <a href="#footer" className="bg-cyan-500 text-gray-900 px-6 py-2 rounded-lg font-bold hover:bg-cyan-400 transition-all terminal-btn font-mono">
                Contactar
              </a>
            </div>

            <button
              onClick={toggleMenu}
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 text-cyan-400 hover:text-cyan-300 transition-colors relative z-60"
              aria-label="Abrir menú"
            >
              <span className="sr-only">Abrir menú</span>
              <div className={`w-6 h-0.5 bg-cyan-400 mb-1.5 transition-all duration-300 ${isMenuOpen ? 'transform rotate-45 translate-y-2' : ''}`}></div>
              <div className={`w-6 h-0.5 bg-cyan-400 mb-1.5 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
              <div className={`w-6 h-0.5 bg-cyan-400 transition-all duration-300 ${isMenuOpen ? 'transform -rotate-45 -translate-y-2' : ''}`}></div>
            </button>
          </div>

          <div className={`md:hidden absolute top-full left-0 right-0 bg-gray-900/95 backdrop-blur-sm border-b border-cyan-400/20 mt-2 rounded-b-2xl overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}>
            <div className="container mx-auto px-6 py-4 space-y-4">
              <a href="/" className="block text-gray-400 hover:text-cyan-400 transition-all font-mono text-sm hover:bg-cyan-400/10 px-4 py-3 rounded border-l-2 border-transparent hover:border-cyan-400">
                Inicio
              </a>
              <a href="/Noticias" className="block text-gray-400 hover:text-cyan-400 transition-all font-mono text-sm hover:bg-cyan-400/10 px-4 py-3 rounded border-l-2 border-transparent hover:border-cyan-400">
                Noticias
              </a>
              <a href="/Eventos" className="block text-gray-400 hover:text-cyan-400 transition-all font-mono text-sm hover:bg-cyan-400/10 px-4 py-3 rounded border-l-2 border-transparent hover:border-cyan-400">
                Eventos
              </a>
              <a href="#footer" className="block bg-cyan-500 text-gray-900 px-6 py-3 rounded-lg font-bold hover:bg-cyan-400 transition-all terminal-btn font-mono text-center mt-4">
                Contactar
              </a>
            </div>
          </div>
        </nav>

        <div className="container mx-auto px-6 py-6 mt-32">
          <h1 className="text-2xl lg:text-6xl font-bold text-white mb-6 font-mono leading-tight text-center">
            CENTRO DE ESTUDIANTES <br />
            <span className="text-transparent bg-linear-to-r from-cyan-400 to-blue-400 bg-clip-text">
              &gt;&gt; INGENIERIA EN INFORMÁTICA {"<<"}
            </span>
          </h1>

          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row justify-between items-stretch gap-8">
              <div className="w-full lg:w-3/4 flex">
                <div className="bg-black/40 backdrop-blur-sm border border-cyan-400/30 rounded-lg p-6 terminal-window w-full flex flex-col">
                  <div className="flex space-x-2 mb-4">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="font-mono text-cyan-300 grow">
                    <div className="mb-4">
                      <span className="text-green-400">ceii@unet.edu.ve:~$</span>
                      <span className="text-white">status --system</span>
                    </div>
                    <div className="mb-4 text-white space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-green-400">✓</span>
                        <span>Sistema de representación estudiantil activo</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-400">✓</span>
                        <span>Conectando talento y promoviendo innovación</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-400">✓</span>
                        <span>Plataforma de gestión estudiantil operativa</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-400">✓</span>
                        <span>Comunidad académica integrada</span>
                      </div>
                    </div>
                    <div className="mb-2">
                      <span className="text-green-400">ceii@unet.edu.ve:~$</span>
                      <span className="text-white">system_info --version</span>
                    </div>
                    <div className="text-white">
                      <span className="text-cyan-400">CEII Platform</span> v1.0.0 |
                      <span className="text-purple-400"> UNET</span> |
                      <span className="text-green-400"> Status: ONLINE</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-1/4 flex justify-center items-center">
                <div className="relative group w-full h-full">
                  <div className="absolute -inset-2 bg-linear-to-r from-cyan-400 to-blue-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                  <div className="relative bg-gray-800 rounded-xl p-4 border border-cyan-400/30 terminal-window w-full h-full flex flex-col items-center justify-center">
                    <div className="flex space-x-2 mb-3">
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    </div>
                    <img
                      src="/gceii.webp"
                      alt="GCEII - Centro de Estudiantes"
                      className="rounded-full w-32 h-32 lg:w-40 lg:h-40 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="mt-4 text-center">
                      <span className="text-cyan-300 text-sm font-mono">[CEII_TEAM]</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .terminal-glow {
          box-shadow: 0 0 15px rgba(34, 211, 238, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }
        .terminal-btn {
          box-shadow: 0 0 10px rgba(34, 211, 238, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }
        .terminal-window {
          box-shadow: 0 0 30px rgba(34, 211, 238, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }
        @keyframes terminal-scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        .animate-terminal-scan {
          animation: terminal-scan 8s linear infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.3; }
        }
        .animate-pulse {
          animation: pulse 3s ease-in-out infinite;
        }
      `}</style>
    </header>
  );
};

export default Header;
import { useState } from 'react';
import MusicPlayer from '../components/MusicPlayer';

function Landing() {
  const [activeSection, setActiveSection] = useState<string | null>("");
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert('¡Gracias por suscribirte! (Funcionalidad próximamente)');
      setEmail('');
    }
  };

  const menuItems = [
    { id: "banda", name: "BANDA", href: "#banda" },
    { id: "media", name: "MEDIA", href: "#media" },
    { id: "fechas", name: "FECHAS", href: "#fechas" },
    { id: "contacto", name: "CONTACTO", href: "#contacto" },
    { id: "prensa", name: "PRENSA", href: "#prensa" },
  ];

  const bandMembers = [
    { name: "Aaron Chen", role: "Bajo" },
    { name: "Alejandro Franco", role: "Teclado / Voces" },
    { name: "Ariana Levisman", role: "Voz" },
    { name: "Elias Selvanovich", role: "Guitarra" },
    { name: "Emmanuel \"Manu\" Bertrand", role: "Guitarra / Efectos" },
    { name: "Franco Franceschi", role: "Batería" },
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden selection:bg-floyd-pink selection:text-white font-sans">

      {/* --- FONDO PRINCIPAL (Se desenfoca cuando hay una sección activa) --- */}
      <div
        className={`relative min-h-screen flex flex-col items-center justify-center transition-all duration-700 ease-in-out ${activeSection ? 'blur-xl scale-95 opacity-30 pointer-events-none' : 'blur-0 scale-100 opacity-100'
          }`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-floyd-pink/10 via-black to-black opacity-50 pointer-events-none"></div>

        <main className="z-10 flex flex-col items-center gap-12 w-full max-w-4xl px-4">
          <div className="relative group cursor-default">
            <svg viewBox="0 0 100 87" className="w-48 h-48 md:w-64 md:h-64 drop-shadow-neon animate-pulse-slow hover:animate-none transition-all duration-500">
              <polygon points="50,2 98,85 2,85" fill="none" stroke="#ff00ff" strokeWidth="1.5" strokeLinejoin="round" className="opacity-90" />
            </svg>
            <div className="absolute inset-0 bg-floyd-pink/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          </div>

          <nav>
            <ul className="flex flex-col md:flex-row gap-8 md:gap-16 items-center">
              {menuItems.map((item) => (
                <li key={item.id} className="relative group">
                  <button
                    onClick={() => setActiveSection(item.id)}
                    className="text-lg md:text-xl font-light tracking-[0.2em] text-gray-300 transition-colors duration-300 group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(255,0,255,0.8)] uppercase bg-transparent border-none cursor-pointer"
                  >
                    {item.name}
                  </button>
                  <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-floyd-pink shadow-[0_0_10px_#ff00ff] transition-all duration-300 group-hover:w-full"></span>
                </li>
              ))}
            </ul>
          </nav>

          {/* Minimal Newsletter Section */}
          <div className="flex flex-col items-center text-center gap-3 w-full max-w-md mt-4 p-6 bg-zinc-900/20 border border-zinc-800/30 rounded-sm">
            <h3 className="text-sm font-light tracking-[0.2em] uppercase text-zinc-300">Sumate al Newsletter</h3>
            <p className="text-xs text-zinc-500 font-light mb-2">
              Déjanos tu correo para enterarte antes que nadie de nuestras próximas fechas y novedades.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row w-full gap-2">
              <input
                type="email"
                placeholder="tu@email.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-black/50 border border-zinc-800 px-4 py-2 text-white text-xs focus:outline-none focus:border-floyd-pink transition-all rounded-sm placeholder:text-zinc-600"
              />
              <button
                type="submit"
                className="bg-zinc-800 hover:bg-floyd-pink hover:text-black text-white px-4 py-2 uppercase tracking-widest text-[10px] sm:text-xs font-medium transition-all duration-300 rounded-sm"
              >
                Suscribirse
              </button>
            </form>
          </div>

          <footer className="absolute bottom-8 text-white/20 text-xs tracking-widest uppercase">
            Te Con  Floyd • Tributo a Pink Floyd • 2026
          </footer>
        </main>
      </div>

      {/* --- OVERLAY / MODAL --- */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 transition-all duration-500 ease-in-out ${activeSection ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
      >
        {/* Capa invisible para cerrar al hacer clic afuera */}
        <div className="absolute inset-0" onClick={() => setActiveSection(null)}></div>

        {/* Contenedor del contenido */}
        <div
          className={`relative w-full max-w-5xl bg-black/60 border border-floyd-pink/20 p-8 md:p-14 shadow-[0_0_40px_rgba(255,0,255,0.05)] backdrop-blur-md rounded-sm overflow-y-auto max-h-[90vh] transition-all duration-500 delay-100 ${activeSection ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
        >
          {/* Botón de cerrar (X) */}
          <button
            onClick={() => setActiveSection(null)}
            className="absolute top-6 right-6 md:top-8 md:right-8 text-white/50 hover:text-floyd-pink hover:drop-shadow-[0_0_8px_rgba(255,0,255,0.8)] transition-all text-2xl md:text-3xl"
          >
            ✕
          </button>

          {/* Renderizado condicional del contenido según la sección */}
          {activeSection === 'banda' && (
            <div className="flex flex-col gap-10">
              <h2 className="text-3xl md:text-4xl font-light tracking-[0.3em] text-white uppercase text-center mb-4">
                Banda
              </h2>

              {/* Placeholder de la foto de la banda */}
              <div className="w-full h-64 md:h-96 bg-zinc-900 border border-zinc-800 flex items-center justify-center rounded-sm relative overflow-hidden group">
                <img
                  src="/images/banda.webp" // Ruta a tu imagen en la carpeta public
                  alt="Foto de la banda TC Floyd"
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700"
                  loading="lazy" // Buena práctica para que no bloquee la carga inicial
                />
                {/* El brillo rosa encima de la foto queda muy bien */}
                <div className="absolute inset-0 bg-gradient-to-t from-floyd-pink/20 to-transparent pointer-events-none mix-blend-overlay"></div>
              </div>

              {/* Grid de músicos */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mt-4">
                {bandMembers.map((member, index) => (
                  <div key={index} className="flex flex-col items-center text-center group">
                    <h3 className="text-xl font-medium tracking-wider text-gray-100 group-hover:text-white transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-floyd-pink mt-2 tracking-widest text-sm font-light uppercase opacity-80 group-hover:opacity-100 group-hover:drop-shadow-[0_0_5px_rgba(255,0,255,0.6)] transition-all">
                      {member.role}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Aquí irán las otras secciones más adelante */}
          {activeSection === 'media' && (
            <div className="flex flex-col gap-12">
              <h2 className="text-3xl md:text-4xl font-light tracking-[0.3em] text-white uppercase text-center mb-2">
                Media
              </h2>

              {/* SECCIÓN VIDEOS */}
              <div className="flex flex-col gap-6">
                <h3 className="text-floyd-pink text-sm tracking-[0.3em] uppercase border-b border-floyd-pink/30 pb-2">
                  En Vivo / Sesiones
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">

                  {/* Video 1 */}
                  <div className="aspect-video w-full bg-zinc-900 border border-zinc-800 rounded-sm relative group overflow-hidden">
                    {/* Reemplaza el 'ID_DEL_VIDEO' con el código que viene después de v= en tu link de YouTube */}
                    <iframe
                      className="w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700"
                      src="https://www.youtube.com/embed/hYfgA3oI7Zo?modestbranding=1&rel=0&color=white"
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                    {/* Overlay sutil para integrar el video a la paleta antes de interactuar */}
                    <div className="absolute inset-0 pointer-events-none border border-transparent group-hover:border-floyd-pink/50 transition-colors duration-500 rounded-sm shadow-[inset_0_0_20px_rgba(255,0,255,0)] group-hover:shadow-[inset_0_0_20px_rgba(255,0,255,0.2)]"></div>
                  </div>

                  {/* Video 2 */}
                  <div className="aspect-video w-full bg-zinc-900 border border-zinc-800 rounded-sm relative group overflow-hidden">
                    <iframe
                      className="w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700"
                      src="https://www.youtube.com/embed/aBpJJ42Y4io?modestbranding=1&rel=0&color=white"
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                    <div className="absolute inset-0 pointer-events-none border border-transparent group-hover:border-floyd-pink/50 transition-colors duration-500 rounded-sm shadow-[inset_0_0_20px_rgba(255,0,255,0)] group-hover:shadow-[inset_0_0_20px_rgba(255,0,255,0.2)]"></div>
                  </div>

                </div>
              </div>

              {/* SECCIÓN FOTOS */}
              <div className="flex flex-col gap-6 mt-4">
                <h3 className="text-floyd-pink text-sm tracking-[0.3em] uppercase border-b border-floyd-pink/30 pb-2">
                  Galería
                </h3>

                {/* Masonry-style Grid (Básico) */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

                  {/* FOTO 1 - Rectangular */}
                  <div className="col-span-2 md:col-span-1 aspect-video md:aspect-square bg-zinc-900 overflow-hidden relative group">
                    <img src="/images/show-1.webp" alt="Show TC Floyd" className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                    <div className="absolute inset-0 bg-floyd-pink/0 group-hover:bg-floyd-pink/10 transition-colors duration-500 mix-blend-overlay pointer-events-none"></div>
                  </div>

                  {/* FOTO 2 - Cuadrada */}
                  <div className="aspect-square bg-zinc-900 overflow-hidden relative group">
                    <img src="/images/show-2.webp" alt="Show TC Floyd" className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                  </div>

                  {/* FOTO 3 - Cuadrada */}
                  <div className="aspect-square bg-zinc-900 overflow-hidden relative group">
                    <img src="/images/show-3.webp" alt="Show TC Floyd" className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                  </div>

                  {/* FOTO 4 - Panorámica ancha (ocupa 2 columnas) */}
                  <div className="col-span-2 aspect-[21/9] bg-zinc-900 overflow-hidden relative group">
                    <img src="/images/banda.webp" alt="Show panorámico" className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                  </div>

                  {/* FOTO 5 - Cuadrada para completar la fila en desktop */}
                  <div className="hidden md:block aspect-square bg-zinc-900 overflow-hidden relative group">
                    <img src="/images/show-5.webp" alt="Show detalle" className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                  </div>

                </div>
              </div>

            </div>
          )}

          {activeSection === 'fechas' && (
            <div className="flex flex-col gap-10">
              <h2 className="text-3xl md:text-4xl font-light tracking-[0.3em] text-white uppercase text-center mb-2">
                Fechas
              </h2>

              {/* CARTEL DE PRÓXIMAMENTE (Destacado) */}
              <div className="flex flex-col items-center justify-center py-12 px-4 border border-floyd-pink/20 bg-black relative overflow-hidden group">
                {/* Brillo de fondo pulsante para generar expectativa */}
                <div className="absolute inset-0 bg-floyd-pink/5 blur-xl group-hover:bg-floyd-pink/10 transition-colors duration-1000 animate-pulse-slow pointer-events-none"></div>

                <h3 className="text-xl md:text-2xl tracking-[0.3em] md:tracking-[0.5em] text-white uppercase z-10 text-center font-light">
                  Pronto Nuevas Fechas
                </h3>
                <p className="text-floyd-pink mt-4 tracking-[0.2em] md:tracking-[0.4em] text-xs md:text-sm font-light uppercase z-10 text-center opacity-80">
                  Gira 2026 en preparación
                </p>

                {/* Líneas decorativas top y bottom */}
                <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-floyd-pink/50 to-transparent"></div>
                <div className="absolute bottom-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-floyd-pink/50 to-transparent"></div>
              </div>

              {/* LISTA DE SHOWS ANTERIORES */}
              <div className="flex flex-col gap-4 mt-2">
                <h3 className="text-zinc-500 text-xs md:text-sm tracking-[0.3em] uppercase border-b border-zinc-800/50 pb-2 mb-2">
                  Historial de Shows
                </h3>

                <ul className="flex flex-col gap-3">
                  {/* Fecha 1 */}
                  <li className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-zinc-900/30 border border-zinc-800/30 rounded-sm opacity-50 hover:opacity-100 hover:border-zinc-700 hover:bg-zinc-900/50 transition-all duration-500 group">
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8">
                      {/* Fecha formateada estilo ticket */}
                      <span className="text-floyd-pink font-mono tracking-widest text-sm md:text-base w-32 group-hover:text-white transition-colors">
                        28 NOV 2025
                      </span>
                      {/* Lugar */}
                      <span className="text-zinc-300 tracking-widest text-sm md:text-base font-light">
                        Club Temple / Paseo La Plaza
                      </span>
                    </div>
                    {/* Badge de "Realizado" */}
                    <div className="mt-4 md:mt-0 flex items-center">
                      <span className="text-[10px] md:text-xs border border-zinc-700 text-zinc-500 px-3 py-1 uppercase tracking-widest">
                        Realizado
                      </span>
                    </div>
                  </li>

                  {/* Fecha 2 */}
                  <li className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-zinc-900/30 border border-zinc-800/30 rounded-sm opacity-50 hover:opacity-100 hover:border-zinc-700 hover:bg-zinc-900/50 transition-all duration-500 group">
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8">
                      <span className="text-floyd-pink font-mono tracking-widest text-sm md:text-base w-32 group-hover:text-white transition-colors">
                        20 AGO 2025
                      </span>
                      <span className="text-zinc-300 tracking-widest text-sm md:text-base font-light">
                        Club Temple / Paseo La Plaza
                      </span>
                    </div>
                    <div className="mt-4 md:mt-0 flex items-center">
                      <span className="text-[10px] md:text-xs border border-zinc-700 text-zinc-500 px-3 py-1 uppercase tracking-widest">
                        Realizado
                      </span>
                    </div>
                  </li>
                </ul>
              </div>

            </div>
          )}

          {activeSection === 'contacto' && (
            <div className="flex flex-col gap-8 md:gap-12">
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-light tracking-[0.3em] text-white uppercase mb-2">
                  Contacto
                </h2>
                <p className="text-zinc-500 text-xs md:text-sm tracking-[0.4em] font-light mt-4 uppercase">
                  Booking & Management
                </p>
              </div>

              {/* Grid de Tarjetas de Contacto */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mx-auto mt-4">

                {/* TARJETA EMAIL */}
                <a
                  href="mailto:contacto@teconfloyd.ar"
                  className="flex flex-col items-center justify-center gap-4 p-8 md:p-10 bg-zinc-900/30 border border-zinc-800/50 hover:border-floyd-pink hover:bg-zinc-900/80 transition-all duration-500 group rounded-sm relative overflow-hidden"
                >
                  {/* Resplandor de fondo on hover */}
                  <div className="absolute inset-0 bg-floyd-pink/0 group-hover:bg-floyd-pink/5 transition-colors duration-500"></div>

                  {/* Icono (SVG inline simple) */}
                  <svg className="w-8 h-8 text-zinc-500 group-hover:text-floyd-pink transition-colors duration-500 z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>

                  <div className="flex flex-col items-center gap-2 z-10">
                    <span className="text-zinc-300 tracking-[0.2em] font-light text-xs md:text-sm group-hover:text-white transition-colors">
                      EMAIL
                    </span>
                    <span className="text-floyd-pink text-sm tracking-widest group-hover:drop-shadow-[0_0_8px_rgba(255,0,255,0.8)] transition-all">
                      contacto@teconfloyd.ar
                    </span>
                  </div>
                </a>

                {/* TARJETA INSTAGRAM */}
                <a
                  href="https://instagram.com/teconfloyd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center gap-4 p-8 md:p-10 bg-zinc-900/30 border border-zinc-800/50 hover:border-floyd-pink hover:bg-zinc-900/80 transition-all duration-500 group rounded-sm relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-floyd-pink/0 group-hover:bg-floyd-pink/5 transition-colors duration-500"></div>

                  <svg className="w-8 h-8 text-zinc-500 group-hover:text-floyd-pink transition-colors duration-500 z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>

                  <div className="flex flex-col items-center gap-2 z-10">
                    <span className="text-zinc-300 tracking-[0.2em] font-light text-xs md:text-sm group-hover:text-white transition-colors">
                      INSTAGRAM
                    </span>
                    <span className="text-floyd-pink text-sm tracking-widest group-hover:drop-shadow-[0_0_8px_rgba(255,0,255,0.8)] transition-all">
                      @teconfloyd
                    </span>
                  </div>
                </a>

                {/* TARJETA YOUTUBE */}
                <a
                  href="https://www.youtube.com/@TeConFloyd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center gap-4 p-8 md:p-10 bg-zinc-900/30 border border-zinc-800/50 hover:border-floyd-pink hover:bg-zinc-900/80 transition-all duration-500 group rounded-sm relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-floyd-pink/0 group-hover:bg-floyd-pink/5 transition-colors duration-500"></div>

                  <svg className="w-8 h-8 text-zinc-500 group-hover:text-floyd-pink transition-colors duration-500 z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                    <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33 2.78 2.78 0 001.94 2C5.12 19.5 12 19.5 12 19.5s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.33 29 29 0 00-.46-5.33z"></path>
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                  </svg>

                  <div className="flex flex-col items-center gap-2 z-10">
                    <span className="text-zinc-300 tracking-[0.2em] font-light text-xs md:text-sm group-hover:text-white transition-colors">
                      YOUTUBE
                    </span>
                    <span className="text-floyd-pink text-sm tracking-widest group-hover:drop-shadow-[0_0_8px_rgba(255,0,255,0.8)] transition-all">
                      @TeConFloyd
                    </span>
                  </div>
                </a>

              </div>

              {/* Ubicación (le da un toque muy profesional) */}
              <div className="text-center mt-8 md:mt-12 border-t border-zinc-800/50 pt-8">
                <span className="text-zinc-600 text-[10px] md:text-xs tracking-[0.5em] uppercase font-light">
                  Buenos Aires, Argentina
                </span>
              </div>

            </div>
          )}

          {activeSection === 'prensa' && (
            <div className="flex flex-col gap-8 md:gap-12 w-full max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-light tracking-[0.3em] text-white uppercase text-center mb-2">
                Prensa
              </h2>

              <div className="flex flex-col gap-6 text-zinc-300 font-light leading-relaxed text-sm md:text-base text-center md:text-justify px-4">
                <p>
                  Té Con Floyd es una banda tributo que rinde homenaje al legado inmortal de Pink Floyd.
                  Desde las atmósferas psicodélicas de los primeros discos hasta la potencia conceptual de sus
                  obras más reconocidas, llevamos al escenario un repaso apasionado por la historia de una de las agrupaciones más influyentes del rock mundial.
                </p>
                <p>
                  Nuestra propuesta se destaca por una interpretación sentida y con identidad propia, alejándose de la imitación literal para enfocarse en la esencia emocional de la obra. Un pilar fundamental de nuestro sonido es el liderazgo de una voz principal femenina, lo que aporta una sensibilidad y un matiz distintivo que nos diferencia dentro de la escena de bandas tributo.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 justify-center mt-4">
                <a
                  href="/assets/gacetilla.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 px-8 py-4 bg-zinc-900/30 border border-zinc-800/50 hover:border-floyd-pink hover:bg-zinc-900/80 transition-all duration-500 group rounded-sm relative overflow-hidden text-zinc-300 hover:text-white uppercase tracking-widest text-sm"
                >
                  <div className="absolute inset-0 bg-floyd-pink/0 group-hover:bg-floyd-pink/5 transition-colors duration-500"></div>
                  <svg className="w-5 h-5 text-zinc-500 group-hover:text-floyd-pink transition-colors z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                  <span className="z-10">Gacetilla</span>
                </a>

                <a
                  href="/assets/rider.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 px-8 py-4 bg-zinc-900/30 border border-zinc-800/50 hover:border-floyd-pink hover:bg-zinc-900/80 transition-all duration-500 group rounded-sm relative overflow-hidden text-zinc-300 hover:text-white uppercase tracking-widest text-sm"
                >
                  <div className="absolute inset-0 bg-floyd-pink/0 group-hover:bg-floyd-pink/5 transition-colors duration-500"></div>
                  <svg className="w-5 h-5 text-zinc-500 group-hover:text-floyd-pink transition-colors z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                  <span className="z-10">Rider</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
      <MusicPlayer />
    </div>
  );
}

export default Landing;

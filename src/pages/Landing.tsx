import { useState, useEffect } from 'react';
import MusicPlayer from '../components/MusicPlayer';

interface SubstackPost {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  imageUrl: string | null;
}

const formatPostDate = (dateString: string) => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    const day = date.getDate();
    const months = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  } catch (e) {
    return dateString;
  }
};

function Landing() {
  const [activeSection, setActiveSection] = useState<string | null>("");
  const [hasSeenFechas, setHasSeenFechas] = useState(false);
  const [posts, setPosts] = useState<SubstackPost[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [postsError, setPostsError] = useState<string | null>(null);

  useEffect(() => {
    if (activeSection === 'novedades') {
      const fetchPosts = async () => {
        setLoadingPosts(true);
        setPostsError(null);
        try {
          const response = await fetch('/api/substack-feed');
          if (!response.ok) {
            throw new Error('No se pudo cargar el feed de Substack');
          }
          const data = await response.json();
          setPosts(data.items || []);
        } catch (error: any) {
          console.error('Error al cargar posts:', error);
          setPostsError(error.message || 'Error al conectar con el servidor.');
        } finally {
          setLoadingPosts(false);
        }
      };
      fetchPosts();
    }
  }, [activeSection]);

  const menuItems = [
    { id: "banda", name: "BANDA", href: "#banda" },
    { id: "media", name: "MEDIA", href: "#media" },
    { id: "novedades", name: "NOVEDADES", href: "#novedades" },
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
                    onClick={() => {
                      setActiveSection(item.id);
                      if (item.id === 'fechas') {
                        setHasSeenFechas(true);
                      }
                    }}
                    className="text-lg md:text-xl font-light tracking-[0.2em] text-gray-300 transition-colors duration-300 group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(255,0,255,0.8)] uppercase bg-transparent border-none cursor-pointer relative"
                  >
                    {item.name}
                    {item.id === 'fechas' && !hasSeenFechas && (
                      <span className="absolute -top-1 -right-2 flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-floyd-pink opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-floyd-pink shadow-[0_0_8px_#ff00ff]"></span>
                      </span>
                    )}
                  </button>
                  <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-floyd-pink shadow-[0_0_10px_#ff00ff] transition-all duration-300 group-hover:w-full"></span>
                </li>
              ))}
            </ul>
          </nav>

          {/* Substack Newsletter Embed */}
          <div className="flex flex-col items-center gap-4 mt-2 w-full max-w-[480px] z-10">
            <span className="text-[10px] md:text-xs tracking-[0.3em] text-zinc-500 uppercase font-light">
              Suscribite al newsletter
            </span>
            <div className="w-full overflow-hidden rounded-sm">
              <iframe
                src="https://teconfloyd.substack.com/embed"
                width="100%"
                height="150"
                style={{ background: 'white' }}
                frameBorder="0"
                scrolling="no"
                title="Te Con Floyd Substack"
              ></iframe>
            </div>
          </div>

          <footer className="absolute bottom-8 text-white/20 text-xs tracking-widest uppercase">
            Te Con  Floyd • Tributo a Pink Floyd • 2026
          </footer>
        </main>
      </div >

      {/* --- OVERLAY / MODAL --- */}
      < div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 transition-all duration-500 ease-in-out ${activeSection ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`
        }
      >
        {/* Capa invisible para cerrar al hacer clic afuera */}
        < div className="absolute inset-0" onClick={() => setActiveSection(null)}></div >

        {/* Contenedor del contenido */}
        < div
          className={`relative w-full max-w-5xl bg-black/60 border border-floyd-pink/20 p-8 md:p-14 shadow-[0_0_40px_rgba(255,0,255,0.05)] backdrop-blur-md rounded-sm overflow-y-auto max-h-[90vh] transition-all duration-500 delay-100 ${activeSection ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
        >
          {/* Botón de cerrar (X) */}
          < button
            onClick={() => setActiveSection(null)}
            className="absolute top-6 right-6 md:top-8 md:right-8 text-white/50 hover:text-floyd-pink hover:drop-shadow-[0_0_8px_rgba(255,0,255,0.8)] transition-all text-2xl md:text-3xl"
          >
            ✕
          </button >

          {/* Renderizado condicional del contenido según la sección */}
          {
            activeSection === 'banda' && (
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
            )
          }

          {/* Aquí irán las otras secciones más adelante */}
          {
            activeSection === 'media' && (
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
            )
          }

          {
            activeSection === 'novedades' && (
              <div className="flex flex-col gap-10">
                <h2 className="text-3xl md:text-4xl font-light tracking-[0.3em] text-white uppercase text-center mb-2">
                  Novedades
                </h2>

                {loadingPosts && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
                    {[1, 2, 3].map((n) => (
                      <div key={n} className="flex flex-col border border-zinc-900 bg-zinc-950/40 rounded-sm overflow-hidden animate-pulse">
                        <div className="w-full aspect-[16/10] bg-zinc-900"></div>
                        <div className="p-6 flex flex-col gap-4 flex-1">
                          <div className="h-4 bg-zinc-800 rounded w-1/3"></div>
                          <div className="h-6 bg-zinc-800 rounded w-3/4"></div>
                          <div className="h-16 bg-zinc-800 rounded w-full"></div>
                          <div className="h-10 bg-zinc-800 rounded w-1/2 mt-auto"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {postsError && (
                  <div className="flex flex-col items-center justify-center text-center p-8 border border-floyd-pink/20 bg-zinc-950/60 rounded-sm max-w-lg mx-auto gap-6 my-8">
                    <svg className="w-12 h-12 text-floyd-pink/60 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <div>
                      <h3 className="text-xl font-medium tracking-wide text-white">No se pudieron cargar las novedades</h3>
                      <p className="text-zinc-400 mt-2 text-sm font-light leading-relaxed">
                        Hubo un problema al obtener las últimas publicaciones. Podés leerlas directamente en nuestro boletín oficial en Substack.
                      </p>
                    </div>
                    <a
                      href="https://teconfloyd.substack.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-floyd-pink hover:bg-white text-black font-semibold transition-all duration-300 text-xs uppercase tracking-widest rounded-sm shadow-[0_0_15px_rgba(255,0,255,0.2)]"
                    >
                      Ir a teconfloyd.substack.com
                    </a>
                  </div>
                )}

                {!loadingPosts && !postsError && posts.length === 0 && (
                  <div className="flex flex-col items-center justify-center text-center p-8 border border-zinc-800 bg-zinc-950/40 rounded-sm max-w-lg mx-auto gap-4 my-8">
                    <p className="text-zinc-400 text-sm font-light">No hay publicaciones recientes disponibles.</p>
                    <a
                      href="https://teconfloyd.substack.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-floyd-pink hover:text-white transition-colors text-sm underline font-light"
                    >
                      Ver boletín en Substack
                    </a>
                  </div>
                )}

                {!loadingPosts && !postsError && posts.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
                    {posts.map((post, index) => (
                      <div
                        key={index}
                        className="group flex flex-col border border-zinc-850 bg-zinc-950/40 rounded-sm overflow-hidden hover:border-floyd-pink/40 hover:shadow-[0_0_30px_rgba(255,0,255,0.05)] transition-all duration-500 relative"
                      >
                        <div className="absolute inset-0 bg-gradient-to-b from-floyd-pink/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                        
                        <div className="w-full aspect-[16/10] bg-zinc-900 border-b border-zinc-900/50 overflow-hidden relative">
                          {post.imageUrl ? (
                            <img
                              src={post.imageUrl}
                              alt={post.title}
                              className="w-full h-full object-cover grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-95 group-hover:scale-105 transition-all duration-700"
                              loading="lazy"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-zinc-900 via-zinc-950 to-black flex items-center justify-center relative overflow-hidden">
                              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_#ff00ff_1px,_transparent_1px)] [background-size:16px_16px]"></div>
                              <svg viewBox="0 0 100 87" className="w-16 h-16 opacity-30 text-floyd-pink group-hover:opacity-60 transition-opacity duration-500">
                                <polygon points="50,15 88,77 12,77" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                              </svg>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
                        </div>

                        <div className="p-6 flex flex-col flex-1 gap-3 relative z-10">
                          <span className="text-[10px] tracking-[0.2em] font-mono text-floyd-pink uppercase">
                            {formatPostDate(post.pubDate)}
                          </span>
                          <h3 className="text-xl font-medium tracking-wide text-gray-100 group-hover:text-white transition-colors duration-300 line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-zinc-400 text-sm font-light leading-relaxed line-clamp-3 mb-4">
                            {post.description}
                          </p>
                          <a
                            href={post.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-auto inline-flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-300 group-hover:text-floyd-pink transition-all duration-300 font-semibold group-hover:drop-shadow-[0_0_5px_rgba(255,0,255,0.5)] self-start animate-pulse-slow"
                          >
                            Leer en Substack
                            <svg className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          }

          {
            activeSection === 'fechas' && (
              <div className="flex flex-col gap-10">
                <h2 className="text-3xl md:text-4xl font-light tracking-[0.3em] text-white uppercase text-center mb-2">
                  Fechas
                </h2>

                {/* TICKET DE PRÓXIMO SHOW (Destacado) */}
                <div className="relative group overflow-hidden border border-floyd-pink/30 bg-zinc-950/80 backdrop-blur-md rounded-sm transition-all duration-500 hover:border-floyd-pink hover:shadow-[0_0_30px_rgba(255,0,255,0.15)] flex flex-col md:flex-row">

                  {/* Decoración: Glow de fondo sutil */}
                  <div className="absolute -inset-px bg-gradient-to-r from-floyd-pink/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                  {/* SECCIÓN FECHA (Estilo Talón de Ticket) */}
                  <div className="flex flex-col items-center justify-center p-6 md:p-8 bg-black/80 md:w-52 border-b md:border-b-0 md:border-r border-dashed border-zinc-800 relative">
                    <span className="text-zinc-500 text-[10px] tracking-[0.3em] uppercase font-light mb-1">Sábado</span>
                    <span className="text-5xl md:text-6xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-400 drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">
                      27
                    </span>
                    <span className="text-floyd-pink font-mono tracking-[0.2em] text-sm md:text-base mt-1 uppercase font-semibold">
                      JUNIO
                    </span>
                    <span className="text-zinc-600 text-[10px] tracking-widest font-mono mt-1">2026</span>

                    {/* Círculos troquelados arriba y abajo en desktop para el look de ticket */}
                    <div className="hidden md:block absolute -top-3 -right-3 w-6 h-6 bg-black rounded-full border border-zinc-900 z-10"></div>
                    <div className="hidden md:block absolute -bottom-3 -right-3 w-6 h-6 bg-black rounded-full border border-zinc-900 z-10"></div>
                  </div>

                  {/* SECCIÓN DETALLES (Cuerpo del Ticket) */}
                  <div className="flex-1 p-6 md:p-8 flex flex-col justify-between gap-6 relative">

                    {/* Badges en la esquina superior derecha */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 md:absolute md:top-6 md:right-8 self-start">
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-floyd-pink opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-floyd-pink"></span>
                        </span>
                        <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-floyd-pink">
                          ¡NUEVA FECHA!
                        </span>
                      </div>
                      <span className="hidden sm:inline text-zinc-700">|</span>
                      <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-emerald-400 bg-emerald-950/30 border border-emerald-500/20 px-2 py-0.5 rounded-sm">
                        Entrada Libre & Gratuita
                      </span>
                    </div>

                    {/* Información del Evento */}
                    <div className="flex flex-col gap-2 mt-2 md:mt-4">
                      <h3 className="text-2xl md:text-3xl font-light tracking-wide text-white group-hover:text-floyd-pink transition-colors duration-300">
                        C.C. Musicleta
                      </h3>

                      <div className="flex flex-col gap-1.5 text-zinc-400">
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-floyd-pink flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="text-sm md:text-base font-light tracking-wider">
                            Aguirre 489, Villa Crespo, CABA
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-floyd-pink flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-sm font-light tracking-wider">
                            Apertura de puertas: 19:00 hs
                          </span>
                        </div>
                      </div>

                      <p className="text-zinc-500 text-xs font-light mt-1 tracking-wide">
                        * El ingreso es por orden de llegada hasta agotar la capacidad del lugar. ¡Vení temprano!
                      </p>
                    </div>

                    {/* Botones de Acción */}
                    <div className="flex flex-wrap gap-4 mt-2">
                      <a
                        href="https://www.google.com/maps/search/?api=1&query=Aguirre+489,+CABA,+C.C.+Musicleta"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-4 py-2 border border-zinc-800 hover:border-zinc-500 hover:bg-zinc-900/50 text-zinc-300 hover:text-white transition-all duration-300 text-xs uppercase tracking-widest rounded-sm"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 01.553-.894L9 2m0 18l6-3m-6 3V2m6 15l5.447 2.724A1 1 0 0021 18.75V7.99a1 1 0 00-.553-.893L15 4m0 12V4m0 0L9 2" />
                        </svg>
                        Cómo llegar
                      </a>

                      <a
                        href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=T%C3%A9+Con+Floyd+en+C.C.+Musicleta&dates=20260627T190000/20260627T220000&details=Show+en+vivo+tributo+a+Pink+Floyd.+Direcci%C3%B3n%3A+Aguirre+489%2C+CABA.+Entrada+libre+y+gratuita+con+contribuci%C3%B3n+voluntaria.&location=C.C.+Musicleta%2C+Aguirre+489%2C+CABA"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-5 py-2 bg-floyd-pink hover:bg-white text-black font-semibold transition-all duration-300 text-xs uppercase tracking-widest rounded-sm shadow-[0_0_15px_rgba(255,0,255,0.3)] hover:shadow-[0_0_20px_rgba(255,255,255,0.5)]"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Agendar Fecha
                      </a>
                    </div>
                  </div>
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
            )
          }

          {
            activeSection === 'contacto' && (
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
            )
          }

          {
            activeSection === 'prensa' && (
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
            )
          }
        </div >
      </div >
      <MusicPlayer />
    </div >
  );
}

export default Landing;

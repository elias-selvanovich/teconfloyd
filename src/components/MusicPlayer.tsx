import { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';

const PLAYLIST = [
  { title: "Welcome to the machine", url: "https://www.youtube.com/watch?v=Jh20cMEgvqc" },
  { title: "Fearless", url: "https://www.youtube.com/watch?v=IkgaMFjo_lI" },
  { title: "Breathe", url: "https://www.youtube.com/watch?v=jcz0YxYl6Ac" },
  { title: "One of these days", url: "https://www.youtube.com/watch?v=raV_A8YcBu0" },
  { title: "Time", url: "https://www.youtube.com/watch?v=yl-Ms_ek-kE" },
  { title: "Have a Cigar", url: "https://www.youtube.com/watch?v=Eq8ZiZ9xiLw" }
];

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const [volume] = useState(0.5);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showNext, setShowNext] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hasDismissedHint, setHasDismissedHint] = useState(() => {
    try {
      return sessionStorage.getItem('dismissed-music-hint') === 'true';
    } catch {
      return false;
    }
  });

  const currentSong = PLAYLIST[currentIndex];
  const nextSong = PLAYLIST[(currentIndex + 1) % PLAYLIST.length];

  // Alternar entre "Now Playing" y "Next" cada 6 segundos
  useEffect(() => {
    if (!playing) return;
    const interval = setInterval(() => {
      setShowNext(prev => !prev);
    }, 6000);
    return () => clearInterval(interval);
  }, [playing]);

  // Descartar pista si empieza a reproducir
  useEffect(() => {
    if (playing) {
      try {
        sessionStorage.setItem('dismissed-music-hint', 'true');
      } catch { }
      setHasDismissedHint(true);
    }
  }, [playing]);

  // Mostrar sugerencia flotante después de 2.5 segundos
  useEffect(() => {
    if (hasDismissedHint || playing) return;
    const timer = setTimeout(() => {
      setShowHint(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, [hasDismissedHint, playing]);

  const handleEnded = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % PLAYLIST.length);
    setShowNext(false);
  };

  return (
    <div className="fixed bottom-4 left-4 md:bottom-8 md:left-8 z-50 flex items-center">

      {/* SUGERENCIA FLOTANTE (Ambientar sitio) */}
      {showHint && !playing && !hasDismissedHint && (
        <div className="absolute bottom-16 md:bottom-20 left-0 bg-zinc-950/95 border border-floyd-pink/40 px-3.5 py-2 rounded-sm backdrop-blur-md shadow-[0_0_20px_rgba(255,0,255,0.15)] animate-float text-[10px] tracking-[0.2em] text-zinc-300 font-light uppercase whitespace-nowrap flex items-center gap-3 z-30 transition-all duration-500">
          <span className="text-floyd-pink font-semibold animate-pulse">♪</span>
          <span>Ambientar sitio</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              try {
                sessionStorage.setItem('dismissed-music-hint', 'true');
              } catch { }
              setHasDismissedHint(true);
            }}
            className="text-zinc-500 hover:text-floyd-pink text-xs ml-1 font-mono cursor-pointer transition-colors"
            title="Cerrar"
          >
            ✕
          </button>
          {/* Flecha apuntando abajo */}
          <div className="absolute -bottom-1.5 left-5 md:left-6 w-2.5 h-2.5 bg-zinc-950 border-r border-b border-floyd-pink/40 rotate-45"></div>
        </div>
      )}

      {/* REPRODUCTOR INVISIBLE */}
      <div className="hidden">
        <ReactPlayer
          src={currentSong.url}
          playing={playing}
          volume={volume}
          onEnded={handleEnded}
          width="0"
          height="0"
        />
      </div>

      {/* BOTÓN DE CONTROL NEÓN */}
      <button
        onClick={() => setPlaying(!playing)}
        className={`relative group w-12 h-12 md:w-14 md:h-14 rounded-full border flex flex-shrink-0 items-center justify-center transition-all duration-500 z-20 cursor-pointer ${playing
            ? 'border-floyd-pink bg-black text-floyd-pink shadow-[0_0_15px_#ff00ff] scale-100'
            : 'border-floyd-pink/40 bg-black/60 text-zinc-300 shadow-[0_0_10px_rgba(255,0,255,0.1)] hover:border-floyd-pink hover:text-floyd-pink hover:shadow-[0_0_15px_#ff00ff] hover:scale-105'
          }`}
      >
        {!playing && (
          <div className="absolute inset-0 rounded-full border border-floyd-pink/20 animate-pulse-slow"></div>
        )}
        {playing && (
          <div className="absolute inset-0 rounded-full border border-floyd-pink animate-ping opacity-25"></div>
        )}
        {playing ? (
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
        ) : (
          <svg className="w-5 h-5 md:w-6 md:h-6 ml-1 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
        )}
      </button>

      {/* CONTENEDOR DE INFORMACIÓN (Cápsula redondeada) */}
      <div className={`flex items-center overflow-hidden transition-all duration-700 ease-in-out bg-black/90 rounded-r-full border-y border-r border-floyd-pink/30 -ml-6 pl-10 pr-6 py-3 z-10 ${playing ? 'opacity-100 max-w-[340px]' : 'opacity-0 max-w-0 border-transparent'}`}>

        {/* 1. ECUALIZADOR ANIMADO */}
        <div className="flex gap-[3px] h-5 items-end mr-5 flex-shrink-0">
          <div className="w-[3px] bg-floyd-pink animate-[pulse_0.8s_ease-in-out_infinite] h-2"></div>
          <div className="w-[3px] bg-floyd-pink animate-[pulse_1.2s_ease-in-out_infinite] h-5"></div>
          <div className="w-[3px] bg-floyd-pink animate-[pulse_1.0s_ease-in-out_infinite] h-3"></div>
          <div className="w-[3px] bg-floyd-pink animate-[pulse_0.9s_ease-in-out_infinite] h-4"></div>
        </div>

        {/* 2. CARTELERA DE TEXTO DESLIZANTE (Usando Grid para superposición robusta) */}
        <div className="relative h-auto w-full flex-grow font-sans grid grid-cols-1 grid-rows-1 items-center">

          {/* Bloque "Now Playing" */}
          <div className={`col-start-1 row-start-1 w-full whitespace-nowrap transition-all duration-700 ease-in-out flex flex-col justify-center ${showNext ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}`}>
            <p className="text-[9px] tracking-[0.2em] text-zinc-400 uppercase leading-none mb-1">Now Playing:</p>
            <p className="text-xs md:text-sm tracking-wider text-floyd-pink truncate font-light leading-normal">{currentSong.title}</p>
          </div>

          {/* Bloque "Next" */}
          <div className={`col-start-1 row-start-1 w-full whitespace-nowrap transition-all duration-700 ease-in-out flex flex-col justify-center ${showNext ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'}`}>
            <p className="text-[9px] tracking-[0.2em] text-zinc-500 uppercase leading-none mb-1">Next:</p>
            <p className="text-xs md:text-sm tracking-wider text-zinc-300 truncate font-light leading-normal">{nextSong.title}</p>
          </div>

        </div>

      </div>

    </div>
  );
}
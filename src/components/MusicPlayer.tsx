import { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';

const PLAYLIST = [
    { title: "Welcome to the machine", url: "https://www.youtube.com/watch?v=Jh20cMEgvqc" },
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

  const handleEnded = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % PLAYLIST.length);
    setShowNext(false);
  };

  return (
    <div className="fixed bottom-4 left-4 md:bottom-8 md:left-8 z-50 flex items-center">
      
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
        className={`relative group w-12 h-12 md:w-14 md:h-14 rounded-full border flex flex-shrink-0 items-center justify-center transition-all duration-500 z-20 ${
          playing 
            ? 'border-floyd-pink bg-black text-floyd-pink shadow-[0_0_15px_#ff00ff]' 
            : 'border-zinc-700 bg-black/50 text-zinc-500 hover:border-floyd-pink hover:text-floyd-pink'
        }`}
      >
        {playing && (
          <div className="absolute inset-0 rounded-full border border-floyd-pink animate-ping opacity-20"></div>
        )}
        {playing ? (
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
        ) : (
          <svg className="w-5 h-5 md:w-6 md:h-6 ml-1" fill="currentColor" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
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
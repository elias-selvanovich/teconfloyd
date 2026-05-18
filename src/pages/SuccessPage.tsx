import { Link } from 'react-router-dom';

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-black text-white relative flex flex-col items-center justify-center p-4 selection:bg-floyd-pink selection:text-white font-sans">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-floyd-pink/10 via-black to-black opacity-50 pointer-events-none"></div>

      <div className="z-10 flex flex-col items-center text-center gap-8 max-w-lg">
        <svg viewBox="0 0 100 87" className="w-32 h-32 drop-shadow-neon">
          <polygon points="50,2 98,85 2,85" fill="none" stroke="#ff00ff" strokeWidth="2" strokeLinejoin="round" />
        </svg>

        <div className="space-y-4">
          <h1 className="text-3xl md:text-5xl font-light tracking-[0.2em] uppercase text-white">
            ¡Muchas Gracias!
          </h1>
          <p className="text-zinc-400 font-light tracking-wider leading-relaxed">
            Tu aporte nos ayuda muchísimo a seguir haciendo la música que amamos y llevar nuestro tributo a más escenarios. 
          </p>
        </div>

        <div className="flex gap-4 mt-4">
          <Link 
            to="/show" 
            className="border border-zinc-700 hover:border-floyd-pink bg-zinc-900/50 hover:bg-floyd-pink/10 px-8 py-3 text-zinc-300 hover:text-white transition-all duration-300 rounded-sm uppercase tracking-widest text-sm"
          >
            Volver
          </Link>
          <Link 
            to="/" 
            className="border border-floyd-pink bg-floyd-pink/10 hover:bg-floyd-pink text-floyd-pink hover:text-black px-8 py-3 transition-all duration-300 rounded-sm uppercase tracking-widest text-sm font-medium"
          >
            Ver Web
          </Link>
        </div>
      </div>
    </div>
  );
}

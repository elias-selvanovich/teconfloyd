import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function ShowPage() {
  const [searchParams] = useSearchParams();
  const paymentStatus = searchParams.get('status'); // MP can send back status

  const [loading, setLoading] = useState(false);
  const [customAmount, setCustomAmount] = useState('');
  const [showCustom, setShowCustom] = useState(false);
  const [email, setEmail] = useState('');

  // Cambiar a true si deseas mostrar la seccion del newsletter en el show
  const showNewsletter = false;

  const donationAmounts = [1000, 2000, 3000, 5000, 8000, 13000];

  const handleDonate = async (amount: number) => {
    if (!amount || amount <= 0) return;

    setLoading(true);
    try {
      const response = await fetch('/api/create-preference', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, title: 'Aporte Te Con Floyd' })
      });

      const data = await response.json();
      if (data.init_point) {
        window.location.href = data.init_point;
      } else {
        alert('Hubo un error al iniciar el pago.');
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      alert('Error de conexión al procesar el pago.');
      setLoading(false);
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert('¡Gracias por suscribirte! (Funcionalidad próximamente)');
      setEmail('');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden selection:bg-floyd-pink selection:text-white font-sans py-12 px-4 flex flex-col items-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-floyd-pink/10 via-black to-black opacity-50 pointer-events-none"></div>

      <div className="z-10 w-full max-w-2xl flex flex-col items-center gap-12">
        {/* Logo / Título del Show */}
        <div className="flex flex-col items-center gap-4 text-center group cursor-default">
          <svg viewBox="0 0 100 87" className="w-24 h-24 drop-shadow-neon animate-pulse-slow">
            <polygon points="50,2 98,85 2,85" fill="none" stroke="#ff00ff" strokeWidth="2" strokeLinejoin="round" className="opacity-90" />
          </svg>
          <h1 className="text-4xl md:text-5xl font-light tracking-[0.3em] uppercase mt-6 drop-shadow-[0_0_15px_rgba(255,0,255,0.3)]">
            Te Con Floyd en C.C. Musicleta
          </h1>
          <p className="text-floyd-pink tracking-[0.4em] text-sm uppercase font-light mt-2">
            Apoya a la banda
          </p>

          {/* Redes compactas (Pills/Chips) */}
          <div className="flex items-center gap-3 mt-4 flex-wrap justify-center z-10">
            {/* INSTAGRAM */}
            <a
              href="https://instagram.com/teconfloyd"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-1.5 bg-zinc-900/30 border border-zinc-800/80 hover:border-floyd-pink hover:bg-zinc-900/80 transition-all duration-300 rounded-full text-xs text-zinc-300 hover:text-white group/pill"
            >
              <svg className="w-4 h-4 text-zinc-500 group-hover/pill:text-floyd-pink transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              <span className="font-mono tracking-wider text-[11px] group-hover/pill:drop-shadow-[0_0_6px_rgba(255,0,255,0.6)] transition-all">@teconfloyd</span>
            </a>

            {/* YOUTUBE */}
            <a
              href="https://www.youtube.com/@TeConFloyd"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-1.5 bg-zinc-900/30 border border-zinc-800/80 hover:border-floyd-pink hover:bg-zinc-900/80 transition-all duration-300 rounded-full text-xs text-zinc-300 hover:text-white group/pill"
            >
              <svg className="w-4 h-4 text-zinc-500 group-hover/pill:text-floyd-pink transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33 2.78 2.78 0 001.94 2C5.12 19.5 12 19.5 12 19.5s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.33 29 29 0 00-.46-5.33z"></path>
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
              </svg>
              <span className="font-mono tracking-wider text-[11px] group-hover/pill:drop-shadow-[0_0_6px_rgba(255,0,255,0.6)] transition-all">@TeConFloyd</span>
            </a>
          </div>
        </div>

        {paymentStatus === 'failure' && (
          <div className="w-full bg-red-900/30 border border-red-500/50 text-red-200 p-4 rounded-sm text-center">
            El pago no se pudo procesar o fue cancelado. Por favor, intenta de nuevo.
          </div>
        )}

        {/* Newsletter Section */}
        {showNewsletter && (
          <div className="w-full bg-zinc-900/40 border border-zinc-800/50 p-8 rounded-sm relative overflow-hidden group">
            <div className="absolute inset-0 bg-floyd-pink/0 group-hover:bg-floyd-pink/5 transition-colors duration-1000 pointer-events-none"></div>

            <div className="flex flex-col items-center text-center gap-4 relative z-10">
              <h2 className="text-xl font-light tracking-[0.2em] uppercase">Súmate al Newsletter</h2>
              <p className="text-zinc-400 text-sm font-light">
                Déjanos tu correo para enterarte antes que nadie de nuestras próximas fechas y novedades.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 w-full mt-4">
                <input
                  type="email"
                  placeholder="tu@email.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-black border border-zinc-700 px-4 py-3 text-white focus:outline-none focus:border-floyd-pink focus:ring-1 focus:ring-floyd-pink transition-all rounded-sm placeholder:text-zinc-600"
                />
                <button
                  type="submit"
                  className="bg-zinc-800 hover:bg-floyd-pink hover:text-black text-white px-8 py-3 uppercase tracking-widest font-medium transition-all duration-300 rounded-sm"
                >
                  Suscribirse
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Donation Section */}
        <div className="w-full bg-zinc-900/40 border border-zinc-800/50 p-8 rounded-sm relative overflow-hidden group">
          <div className="absolute inset-0 bg-floyd-pink/0 group-hover:bg-floyd-pink/5 transition-colors duration-1000 pointer-events-none"></div>

          <div className="flex flex-col items-center text-center gap-6 relative z-10">
            <h2 className="text-xl font-light tracking-[0.2em] uppercase">Aporte Voluntario</h2>
            <p className="text-zinc-400 text-sm font-light max-w-lg">
              Si estás disfrutando el show y querés apoyar nuestro proyecto, podés hacer un aporte a través de Mercado Pago. ¡Todo suma para seguir creciendo!
            </p>

            {loading ? (
              <div className="py-12 flex flex-col items-center gap-4">
                <div className="w-10 h-10 border-2 border-zinc-700 border-t-floyd-pink rounded-full animate-spin"></div>
                <p className="text-floyd-pink animate-pulse tracking-widest uppercase text-sm">Redirigiendo...</p>
              </div>
            ) : (
              <div className="w-full mt-4 flex flex-col gap-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {donationAmounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => handleDonate(amount)}
                      className="border border-zinc-700 hover:border-floyd-pink hover:bg-floyd-pink/10 py-4 px-2 text-zinc-300 hover:text-white transition-all duration-300 rounded-sm text-lg font-light tracking-wider"
                    >
                      ${amount}
                    </button>
                  ))}
                </div>

                {showCustom ? (
                  <div className="flex flex-col sm:flex-row gap-4 mt-2">
                    <div className="relative flex-1">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">$</span>
                      <input
                        type="number"
                        min="100"
                        placeholder="Monto"
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        className="w-full bg-black border border-zinc-700 pl-8 pr-4 py-3 text-white focus:outline-none focus:border-floyd-pink transition-all rounded-sm"
                      />
                    </div>
                    <button
                      onClick={() => handleDonate(Number(customAmount))}
                      disabled={!customAmount || Number(customAmount) <= 0}
                      className="bg-floyd-pink/20 border border-floyd-pink hover:bg-floyd-pink hover:text-black text-floyd-pink disabled:opacity-50 disabled:hover:bg-floyd-pink/20 disabled:hover:text-floyd-pink px-8 py-3 uppercase tracking-widest font-medium transition-all duration-300 rounded-sm"
                    >
                      Aportar
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowCustom(true)}
                    className="w-full border border-zinc-800 bg-black hover:border-zinc-500 py-4 text-zinc-400 hover:text-white transition-all duration-300 rounded-sm tracking-widest uppercase text-sm mt-2"
                  >
                    Otro Monto
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

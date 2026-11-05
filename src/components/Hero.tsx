export default function Hero() {
  return (
    <section id="inicio" className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-bosque-950">
      
      {/* CAPA 1: Imagen de fondo */}
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src="/img/hero.jpg"
          alt=""
          className="h-full w-full object-cover object-center"
          loading="eager"
        />
        <div className="absolute inset-0 bg-bosque-950/10" />
      </div>

      {/* CAPA 2: CRISTAL FACETADO (CSS puro, sin filtros) */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <svg 
          className="w-full h-full" 
          viewBox="0 0 1920 1080" 
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="facetEdge" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(212,175,55,0.6)" />
              <stop offset="50%" stopColor="rgba(100,200,255,0.4)" />
              <stop offset="100%" stopColor="rgba(212,175,55,0.5)" />
            </linearGradient>

            <linearGradient id="facetEdgeHover" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,215,0,1)" />
              <stop offset="50%" stopColor="rgba(150,220,255,1)" />
              <stop offset="100%" stopColor="rgba(255,215,0,1)" />
            </linearGradient>

            <radialGradient id="crystalGlow" cx="50%" cy="40%" r="50%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
              <stop offset="50%" stopColor="rgba(100,200,255,0.08)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0)" />
            </radialGradient>
          </defs>

          {/* Facetas con pointer-events habilitado */}
          <g className="facets-group">
            {/* Faceta central */}
            <polygon 
              points="960,180 1250,380 1150,720 770,720 670,380" 
              className="facet facet-center"
            />
            
            {/* Faceta izquierda */}
            <polygon 
              points="960,180 670,380 500,540 960,530" 
              className="facet facet-left"
            />
            
            {/* Faceta derecha */}
            <polygon 
              points="960,180 1250,380 1420,540 960,530" 
              className="facet facet-right"
            />
            
            {/* Faceta inferior izquierda */}
            <polygon 
              points="670,380 770,720 550,870 400,590" 
              className="facet facet-bottom-left"
            />
            
            {/* Faceta inferior derecha */}
            <polygon 
              points="1250,380 1150,720 1370,870 1520,590" 
              className="facet facet-bottom-right"
            />
            
            {/* Faceta lateral izquierda */}
            <polygon 
              points="350,290 670,380 500,540 250,440" 
              className="facet facet-far-left"
            />
            
            {/* Faceta lateral derecha */}
            <polygon 
              points="1570,290 1250,380 1420,540 1670,440" 
              className="facet facet-far-right"
            />
            
            {/* Faceta superior (corona) */}
            <polygon 
              points="960,80 1080,180 960,240 840,180" 
              className="facet facet-top"
            />
            
            {/* Faceta inferior */}
            <polygon 
              points="960,780 1100,870 960,960 820,870" 
              className="facet facet-bottom"
            />
          </g>

          {/* Brillo central */}
          <ellipse cx="960" cy="450" rx="700" ry="500" 
                   fill="url(#crystalGlow)" 
                   className="animate-[crystalPulse_6s_ease-in-out_infinite]" />
        </svg>
      </div>

      {/* CAPA 3: DESTELLOS DE LUZ */}
      <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
        <div className="sparkle sparkle-1" />
        <div className="sparkle sparkle-2" />
        <div className="sparkle sparkle-3" />
        <div className="sparkle sparkle-4" />
        <div className="sparkle sparkle-5" />
        <div className="sparkle sparkle-6" />
      </div>

      {/* CAPA 4: Viñeta dramática */}
      <div className="absolute inset-0 z-15 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(0,0,0,0.5)_100%)]" />

      {/* CAPA 5: Sombra de profundidad */}
      <div className="absolute inset-0 z-5 pointer-events-none flex items-center justify-center">
        <div className="w-[600px] h-[400px] bg-black/25 blur-[80px] rounded-full mt-20" />
      </div>

      {/* CAPA 6: Botones reposicionados con flexbox */}
      <div className="relative z-30 mx-auto max-w-4xl px-6 flex flex-col items-center justify-end h-full pb-20">
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row animate-[heroFade_1.5s_ease_0.8s_both]">
          <a href="#colecciones" className="btn-solid-gold px-8 py-4 text-sm tracking-[0.2em]">
            EXPLORAR COLECCIONES
          </a>
          <a href="#esencia" className="btn-gold px-8 py-4 text-sm tracking-[0.2em]">
            NUESTRA ESENCIA
          </a>
        </div>
      </div>

      <style>{`
        @keyframes heroFade {
          from { opacity: 0; transform: translateY(26px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes crystalPulse {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.08); }
        }

        /* Facetas con CSS puro */
        .facets-group {
          pointer-events: all;
        }

        .facet {
          fill: rgba(255,255,255,0.03);
          stroke: url(#facetEdge);
          stroke-width: 2;
          cursor: pointer;
          transition: all 0.4s ease;
        }

        .facet:hover {
          fill: rgba(255,255,255,0.15);
          stroke: url(#facetEdgeHover);
          stroke-width: 3.5;
          filter: drop-shadow(0 0 20px rgba(212,175,55,0.9)) drop-shadow(0 0 40px rgba(100,200,255,0.7));
        }

        .facet-center:hover {
          fill: rgba(255,255,255,0.2);
        }

        .facet-left:hover, .facet-far-left:hover {
          fill: rgba(100,200,255,0.18);
        }

        .facet-right:hover, .facet-far-right:hover {
          fill: rgba(212,175,55,0.18);
        }

        /* Destellos */
        .sparkle {
          position: absolute;
          width: 6px;
          height: 6px;
          background: radial-gradient(circle, rgba(255,255,255,1) 0%, transparent 70%);
          border-radius: 50%;
          box-shadow: 0 0 30px rgba(255,255,255,1), 0 0 60px rgba(212,175,55,0.6);
          animation: sparkleMove 6s ease-in-out infinite;
        }

        .sparkle-1 { top: 15%; left: 25%; animation-delay: 0s; }
        .sparkle-2 { top: 30%; left: 70%; animation-delay: 1s; }
        .sparkle-3 { top: 45%; left: 40%; animation-delay: 2s; }
        .sparkle-4 { top: 20%; left: 80%; animation-delay: 0.5s; }
        .sparkle-5 { top: 50%; left: 20%; animation-delay: 1.5s; }
        .sparkle-6 { top: 35%; left: 55%; animation-delay: 2.5s; }

        @keyframes sparkleMove {
          0%, 100% { 
            opacity: 0; 
            transform: scale(0) translate(0, 0); 
          }
          15%, 25% { 
            opacity: 1; 
            transform: scale(2) translate(15px, -15px); 
          }
          35% { 
            opacity: 0; 
            transform: scale(0) translate(30px, -30px); 
          }
        }
      `}</style>
    </section>
  );
}
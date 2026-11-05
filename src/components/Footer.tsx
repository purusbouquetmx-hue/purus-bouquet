import { Sparkle } from 'lucide-react';

const HUB_URL = 'https://purusbouquetmx-hue.github.io/hub/';

export default function Footer() {
  return (
    <footer className="relative border-t border-oro-500/20 bg-bosque-950 py-14">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="flex flex-col items-center gap-8 text-center">
          <a href="#inicio" className="font-display text-gold text-2xl font-black uppercase tracking-[0.2em]">
            Purus Bouquet
          </a>
          <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3" aria-label="Pie de página">
            {[
              { href: '#inicio', label: 'Inicio' },
              { href: '#esencia', label: 'Nuestra Esencia' },
              { href: '#colecciones', label: 'Colecciones' },
              { href: '#tradicion', label: 'Tradición y Arte' },
              { href: '#contacto', label: 'Contacto' },
            ].map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="font-display text-[11px] font-semibold uppercase tracking-[0.24em] text-marfil/70 transition-colors hover:text-oro-400"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <a
            href={HUB_URL}
            className="font-display inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-oro-400 transition-colors hover:text-oro-300"
          >
            <Sparkle className="h-3.5 w-3.5" aria-hidden="true" />
            Volver a El Universo
          </a>
          <div className="hairline w-full max-w-md" />
          <p className="text-sm font-light text-marfil/50">
            © {new Date().getFullYear()} Purus Bouquet — Pasión y arte en perfume.
            Hecho en México.
          </p>
        </div>
      </div>
    </footer>
  );
}

import { useEffect, useState } from 'react';
import { Menu, Search, ShoppingBag, Sparkle, User, X } from 'lucide-react';
import { useCart } from '@/hooks/useCart';

const HUB_URL = 'https://purusbouquetmx-hue.github.io/hub/';

const LINKS = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#esencia', label: 'Nuestra Esencia' },
  { href: '#colecciones', label: 'Colecciones' },
  { href: '#tradicion', label: 'Tradición y Arte' },
  { href: '#contacto', label: 'Contacto' },
];

export default function Navbar({
  onSearch,
  onAccount,
}: {
  onSearch: () => void;
  onAccount: () => void;
}) {
  const { count, setOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
          scrolled ? 'glass-nav' : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-16 md:h-20 max-w-7xl items-center justify-between px-4 md:px-8">
          <a
            href={HUB_URL}
            className="font-display inline-flex items-center gap-2 text-[11px] md:text-xs font-semibold uppercase tracking-[0.3em] text-oro-400 transition-colors hover:text-oro-300"
            title="Volver a El Universo"
          >
            <Sparkle className="h-3.5 w-3.5" aria-hidden="true" />
            El Universo
          </a>

          <nav className="hidden lg:flex items-center gap-8" aria-label="Principal">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="font-display text-[11px] font-semibold uppercase tracking-[0.24em] text-marfil/85 transition-colors hover:text-oro-400"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-1 md:gap-2">
            <button
              type="button"
              onClick={onSearch}
              aria-label="Buscar productos"
              className="flex h-11 w-11 items-center justify-center text-marfil/85 transition-colors hover:text-oro-400"
            >
              <Search className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={onAccount}
              aria-label="Mi cuenta"
              className="flex h-11 w-11 items-center justify-center text-marfil/85 transition-colors hover:text-oro-400"
            >
              <User className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={`Bolsa de compras, ${count} artículos`}
              className="relative flex h-11 w-11 items-center justify-center text-marfil/85 transition-colors hover:text-oro-400"
            >
              <ShoppingBag className="h-5 w-5" aria-hidden="true" />
              {count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-oro-500 px-1 font-display text-[10px] font-bold text-bosque-950">
                  {count}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menú"
              className="flex h-11 w-11 items-center justify-center text-marfil/85 transition-colors hover:text-oro-400 lg:hidden"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Menú móvil */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-bosque-950/97 backdrop-blur-xl lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación"
        >
          <div className="flex h-16 items-center justify-between px-4">
            <span className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-oro-400">
              Purus Bouquet
            </span>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Cerrar menú"
              className="flex h-11 w-11 items-center justify-center text-marfil/85 hover:text-oro-400"
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <nav className="flex flex-1 flex-col items-center justify-center gap-8" aria-label="Menú móvil">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="font-display text-lg font-semibold uppercase tracking-[0.3em] text-marfil transition-colors hover:text-oro-400"
              >
                {l.label}
              </a>
            ))}
            <a
  href={HUB_URL}
  className="font-display inline-flex items-center gap-2 px-4 py-2 text-[11px] md:text-xs font-semibold uppercase tracking-[0.2em] text-oro-400 border border-oro-400/40 bg-oro-400/5 rounded-md transition-all duration-300 hover:bg-oro-400/15 hover:border-oro-400 hover:shadow-[0_0_15px_rgba(212,175,55,0.3)]"
  title="Volver a El Universo"
>
  <Sparkle className="h-3.5 w-3.5" aria-hidden="true" />
  El Universo
</a>
          </nav>
        </div>
      )}
    </>
  );
}

import { useEffect, useMemo, useRef, useState } from 'react';
import { Search, X } from 'lucide-react';
import { collections, formatPrice, products } from '@/data/catalog';

export default function SearchOverlay({
  open,
  onClose,
  onPick,
}: {
  open: boolean;
  onClose: () => void;
  onPick: (collectionId: string) => void;
}) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQuery('');
      document.body.style.overflow = 'hidden';
      const t = window.setTimeout(() => inputRef.current?.focus(), 60);
      return () => window.clearTimeout(t);
    }
    document.body.style.overflow = '';
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.notes.toLowerCase().includes(q) ||
        (collections.find((c) => c.id === p.collectionId)?.name.toLowerCase().includes(q) ?? false)
    );
  }, [query]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-bosque-950/97 backdrop-blur-xl"
      role="dialog"
      aria-modal="true"
      aria-label="Buscar productos"
    >
      <div className="mx-auto flex w-full max-w-3xl items-center gap-4 px-6 pt-10">
        <Search className="h-6 w-6 shrink-0 text-oro-500" aria-hidden="true" />
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Busca una fragancia, colección o nota…"
          aria-label="Término de búsqueda"
          className="w-full border-b border-oro-500/40 bg-transparent py-4 font-display text-xl font-semibold uppercase tracking-[0.14em] text-marfil placeholder:text-marfil/35 focus:border-oro-400 focus:outline-none md:text-2xl"
        />
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar búsqueda"
          className="flex h-11 w-11 shrink-0 items-center justify-center text-marfil/80 transition-colors hover:text-oro-400"
        >
          <X className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>

      <div className="mx-auto w-full max-w-3xl flex-1 overflow-y-auto px-6 pb-16 pt-8">
        {query.trim() === '' && (
          <p className="text-center text-base font-light italic text-marfil/50">
            Escribe para descubrir entre nuestras reliquias…
          </p>
        )}
        {query.trim() !== '' && results.length === 0 && (
          <p className="text-center text-base font-light italic text-marfil/60" role="status">
            No encontramos nada con “{query}”. Prueba con “rosa”, “copal” o “niño”.
          </p>
        )}
        <ul className="space-y-3">
          {results.map((p) => (
            <li key={p.id}>
              <button
                type="button"
                onClick={() => onPick(p.collectionId)}
                className="card-mystic flex w-full items-center gap-5 px-5 py-4 text-left"
              >
                <img
                  src={p.image}
                  alt=""
                  className="h-16 w-16 shrink-0 border border-oro-500/30 object-cover"
                />
                <span className="min-w-0 flex-1">
                  <span className="font-display block truncate text-sm font-bold uppercase tracking-[0.18em] text-oro-300">
                    {p.name}
                  </span>
                  <span className="block truncate text-sm font-light text-marfil/70">
                    {collections.find((c) => c.id === p.collectionId)?.name} — {p.notes}
                  </span>
                </span>
                <span className="font-display shrink-0 text-sm font-bold text-oro-400">
                  {formatPrice(p.price)}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

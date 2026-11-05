import { collections } from '@/data/catalog';
import Reveal, { Ornament } from './Reveal';

export default function Collections({
  onSelect,
}: {
  onSelect: (collectionId: string) => void;
}) {
  return (
    <section id="colecciones" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <Reveal className="text-center">
          <p className="eyebrow mb-4">El Universo Purus</p>
          <h2 className="font-display text-gold text-3xl font-bold uppercase tracking-[0.14em] md:text-5xl">
            Colecciones Sagradas
          </h2>
          <Ornament className="mt-8" />
          <p className="mx-auto mt-6 max-w-2xl text-lg font-light text-marfil/85">
            Cada colección nace de la tierra mexicana y se moldea con tecnología de impresión 3D. 
Rituales olfativos para honrar, celebrar y eternizar los momentos sagrados de la vida.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {collections.map((c, i) => (
            <Reveal key={c.id} delay={i * 90}>
              <button
                type="button"
                onClick={() => onSelect(c.id)}
                className="group card-mystic relative block w-full overflow-hidden text-left"
                aria-label={`Ver colección ${c.name}`}
              >
                <div className="relative aspect-[3/2] overflow-hidden">
                  <img
                    src={c.image}
                    alt={`Colección ${c.name}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bosque-950 via-bosque-950/30 to-transparent" />
                </div>
                <div className="relative -mt-20 px-7 pb-7 pt-0">
                  <p className="eyebrow mb-2 !text-[10px]">{c.tagline}</p>
                  <h3 className="font-display text-gold text-2xl font-bold uppercase tracking-[0.12em] md:text-3xl">
                    {c.name}
                  </h3>
                  <p className="mt-3 max-w-md text-base font-light text-marfil/85">
                    {c.description}
                  </p>
                  <span className="font-display mt-5 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.28em] text-oro-400 transition-colors group-hover:text-oro-300">
                    Explorar Colección
                    <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden="true">
                      <path d="M0 5h14M10 1l4 4-4 4" stroke="currentColor" strokeWidth="1.4" />
                    </svg>
                  </span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

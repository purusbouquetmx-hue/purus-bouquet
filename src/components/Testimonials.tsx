import { Quote } from 'lucide-react';
import { testimonials } from '@/data/catalog';
import Reveal, { Ornament } from './Reveal';

export default function Testimonials() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <Reveal className="text-center">
          <p className="eyebrow mb-4">Voces de Nuestra Familia</p>
          <h2 className="font-display text-gold text-3xl font-bold uppercase tracking-[0.14em] md:text-5xl">
            Testimonios
          </h2>
          <Ornament className="mt-8" />
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 100} className="h-full">
              <figure className="card-mystic flex h-full flex-col px-8 py-10">
                <Quote className="h-7 w-7 text-oro-500" strokeWidth={1.25} aria-hidden="true" />
                <blockquote className="mt-5 flex-1 text-lg font-light italic leading-relaxed text-marfil/90">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-7 border-t border-oro-500/20 pt-5">
                  <p className="font-display text-sm font-bold uppercase tracking-[0.2em] text-oro-400">
                    {t.name}
                  </p>
                  <p className="mt-1 text-sm font-light text-marfil/60">{t.role}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

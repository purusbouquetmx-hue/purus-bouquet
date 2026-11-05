import { Flower2, HandHeart, Leaf, Printer } from 'lucide-react';
import Reveal, { Ornament } from './Reveal';

const VALUES = [
  {
    icon: Leaf,
    title: '100% Natural',
    text: 'Todos nuestros perfumes son elaborados con ingredientes naturales extraídos directamente de la naturaleza.',
  },
  {
    icon: Flower2,
    title: 'Arte Tradicional',
    text: 'Cada diseño está inspirado en las ricas tradiciones mexicanas, fusionando arte contemporáneo y ancestral.',
  },
  {
    icon: Printer,
    title: 'Impresión 3D',
    text: 'Tecnología de alta precisión para crear piezas únicas que transforman cada perfume en una obra de arte.',
  },
  {
    icon: HandHeart,
    title: 'Hecho con Pasión',
    text: 'Dedicación y amor mexicano reflejados en cada detalle de nuestros productos artesanales.',
  },
];

export default function Essence() {
  return (
    <section id="esencia" className="relative overflow-hidden py-24 md:py-32">
      {/* Resplandor ambiental */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[820px] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
        style={{ background: 'radial-gradient(ellipse, rgba(212,175,94,0.35), transparent 65%)' }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-6 md:px-8">
        <Reveal className="text-center">
          <p className="eyebrow mb-4">Nuestra Esencia</p>
          <h2 className="font-display text-gold text-3xl font-bold uppercase tracking-[0.14em] md:text-5xl">
            El Arte de Crear Fragancias
          </h2>
          <Ornament className="mt-8" />
          <p className="mx-auto mt-6 max-w-2xl text-lg font-light text-marfil/85">
            En Purus Bouquet, cada perfume es una obra de arte que fusiona la
            tradición mexicana con la innovación tecnológica.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-px overflow-hidden border border-oro-500/20 bg-oro-500/20 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 90} className="h-full">
              <div className="flex h-full flex-col items-center bg-bosque-900 px-6 py-10 text-center transition-colors duration-300 hover:bg-bosque-800">
                <v.icon className="h-8 w-8 text-oro-500" strokeWidth={1.25} aria-hidden="true" />
                <h3 className="font-display mt-5 text-sm font-bold uppercase tracking-[0.24em] text-oro-400">
                  {v.title}
                </h3>
                <p className="mt-3 text-base font-light text-marfil/80">{v.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

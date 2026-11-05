import Reveal, { Ornament } from './Reveal';

const STEPS = [
  {
    num: 'I',
    title: 'Ingredientes Naturales',
    text: 'Esencias puras de flores y plantas mexicanas, extraídas con respeto por la tierra que las regala.',
  },
  {
    num: 'II',
    title: 'Impresión 3D',
    text: 'Tecnología de alta precisión que esculpe sarcófagos, portaretratos y estuches imposibles de replicar a mano.',
  },
  {
    num: 'III',
    title: 'Decoración Manual',
    text: 'Cada pieza se termina a mano con motivos tradicionales, dorados y detalles que la vuelven irrepetible.',
  },
];

export default function Process() {
  return (
    <section id="tradicion" className="relative overflow-hidden bg-bosque-900/60 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <div className="gold-frame relative overflow-hidden">
              <img
                src="/img/col-muertos.jpg"
                alt="Proceso artesanal de Purus Bouquet con motivos tradicionales mexicanos"
                loading="lazy"
                className="aspect-[4/5] w-full object-cover md:aspect-[5/6]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bosque-950/60 via-transparent to-bosque-950/20" />
            </div>
          </Reveal>

          <div>
            <Reveal>
              <p className="eyebrow mb-4">Tradición y Arte</p>
              <h2 className="font-display text-gold text-3xl font-bold uppercase tracking-[0.14em] md:text-4xl">
                Un Ritual en Tres Tiempos
              </h2>
              <Ornament className="mt-6 !justify-start" />
            </Reveal>

            <div className="mt-10 space-y-9">
              {STEPS.map((s, i) => (
                <Reveal key={s.num} delay={i * 110}>
                  <div className="flex gap-6">
                    <span className="font-display text-gold mt-1 text-3xl font-black tracking-widest">
                      {s.num}
                    </span>
                    <div>
                      <h3 className="font-display text-base font-bold uppercase tracking-[0.22em] text-oro-400">
                        {s.title}
                      </h3>
                      <p className="mt-2 text-base font-light text-marfil/85">{s.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

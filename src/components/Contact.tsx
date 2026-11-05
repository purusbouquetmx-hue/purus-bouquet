import { useState, type FormEvent } from 'react';
import { Mail, MapPin, Send } from 'lucide-react';
import Reveal, { Ornament } from './Reveal';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const [contact, setContact] = useState({ nombre: '', email: '', mensaje: '' });
  const [contactError, setContactError] = useState('');
  const [contactSent, setContactSent] = useState(false);

  const [newsEmail, setNewsEmail] = useState('');
  const [newsError, setNewsError] = useState('');
  const [newsSent, setNewsSent] = useState(false);

  const submitContact = (e: FormEvent) => {
    e.preventDefault();
    if (contact.nombre.trim().length < 2) {
      setContactError('Cuéntanos tu nombre para poder saludarte.');
      return;
    }
    if (!EMAIL_RE.test(contact.email)) {
      setContactError('Escribe un correo válido, por favor.');
      return;
    }
    if (contact.mensaje.trim().length < 10) {
      setContactError('Tu mensaje es muy corto; cuéntanos un poco más.');
      return;
    }
    setContactError('');
    setContactSent(true);
  };

  const submitNews = (e: FormEvent) => {
    e.preventDefault();
    if (!EMAIL_RE.test(newsEmail)) {
      setNewsError('Escribe un correo válido para unirte.');
      return;
    }
    setNewsError('');
    setNewsSent(true);
  };

  const inputCls =
    'w-full border border-oro-500/30 bg-bosque-950/60 px-4 py-3.5 text-base font-light text-marfil placeholder:text-marfil/40 transition-colors focus:border-oro-400 focus:outline-none';

  return (
    <section id="contacto" className="relative overflow-hidden bg-bosque-900/60 py-24 md:py-32">
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 h-[420px] w-[900px] -translate-x-1/2 rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(ellipse, rgba(212,175,94,0.4), transparent 65%)' }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-6 md:px-8">
        <Reveal className="text-center">
          <p className="eyebrow mb-4">Únete a Nuestra Familia</p>
          <h2 className="font-display text-gold text-3xl font-bold uppercase tracking-[0.14em] md:text-5xl">
            Hablemos
          </h2>
          <Ornament className="mt-8" />
          <p className="mx-auto mt-6 max-w-2xl text-lg font-light text-marfil/85">
            Recibe ofertas exclusivas, novedades y contenido sobre las
            tradiciones mexicanas. O escríbenos: nos encanta crear piezas
            personalizadas.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-10 lg:grid-cols-2">
          {/* Formulario de contacto */}
          <Reveal>
            <div className="card-mystic h-full p-8 md:p-10">
              <h3 className="font-display text-sm font-bold uppercase tracking-[0.26em] text-oro-400">
                Envíanos un Mensaje
              </h3>
              {contactSent ? (
                <div className="mt-8 flex min-h-48 flex-col items-center justify-center text-center" role="status">
                  <span className="text-4xl text-oro-400" aria-hidden="true">✦</span>
                  <p className="font-display mt-4 text-lg font-bold uppercase tracking-[0.2em] text-oro-300">
                    Mensaje Recibido
                  </p>
                  <p className="mt-2 max-w-sm text-base font-light text-marfil/80">
                    Gracias, {contact.nombre.split(' ')[0]}. Te responderemos muy
                    pronto al correo que nos compartiste.
                  </p>
                </div>
              ) : (
                <form onSubmit={submitContact} className="mt-7 space-y-5" noValidate>
                  <div>
                    <label htmlFor="c-nombre" className="font-display mb-2 block text-[11px] font-bold uppercase tracking-[0.24em] text-marfil/75">
                      Nombre
                    </label>
                    <input
                      id="c-nombre"
                      type="text"
                      value={contact.nombre}
                      onChange={(e) => setContact({ ...contact, nombre: e.target.value })}
                      placeholder="Tu nombre"
                      className={inputCls}
                      autoComplete="name"
                    />
                  </div>
                  <div>
                    <label htmlFor="c-email" className="font-display mb-2 block text-[11px] font-bold uppercase tracking-[0.24em] text-marfil/75">
                      Correo
                    </label>
                    <input
                      id="c-email"
                      type="email"
                      value={contact.email}
                      onChange={(e) => setContact({ ...contact, email: e.target.value })}
                      placeholder="tu@correo.com"
                      className={inputCls}
                      autoComplete="email"
                    />
                  </div>
                  <div>
                    <label htmlFor="c-mensaje" className="font-display mb-2 block text-[11px] font-bold uppercase tracking-[0.24em] text-marfil/75">
                      Mensaje
                    </label>
                    <textarea
                      id="c-mensaje"
                      rows={4}
                      value={contact.mensaje}
                      onChange={(e) => setContact({ ...contact, mensaje: e.target.value })}
                      placeholder="Cuéntanos qué pieza sueñas…"
                      className={`${inputCls} resize-y`}
                    />
                  </div>
                  {contactError && (
                    <p className="text-sm font-medium text-red-300" role="alert">{contactError}</p>
                  )}
                  <button type="submit" className="btn-solid-gold w-full">
                    <Send className="h-4 w-4" aria-hidden="true" />
                    Enviar Mensaje
                  </button>
                </form>
              )}
            </div>
          </Reveal>

          {/* Newsletter + datos + QR */}
          <Reveal delay={120}>
            <div className="flex h-full flex-col gap-10">
              {/* Newsletter */}
              <div className="card-mystic p-8 md:p-10">
                <h3 className="font-display text-sm font-bold uppercase tracking-[0.26em] text-oro-400">
                  Cartas desde el Taller
                </h3>
                <p className="mt-3 text-base font-light text-marfil/80">
                  Una carta al mes: lanzamientos, rituales y ediciones limitadas
                  antes que nadie.
                </p>
                {newsSent ? (
                  <p className="font-display mt-6 text-base font-bold uppercase tracking-[0.18em] text-oro-300" role="status">
                    ✦ Bienvenido a la familia
                  </p>
                ) : (
                  <form onSubmit={submitNews} className="mt-6" noValidate>
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <label htmlFor="n-email" className="sr-only">Correo para newsletter</label>
                      <input
                        id="n-email"
                        type="email"
                        value={newsEmail}
                        onChange={(e) => setNewsEmail(e.target.value)}
                        placeholder="tu@correo.com"
                        className={`${inputCls} flex-1`}
                        autoComplete="email"
                      />
                      <button type="submit" className="btn-gold whitespace-nowrap !px-6">
                        Unirme
                      </button>
                    </div>
                    {newsError && (
                      <p className="mt-3 text-sm font-medium text-red-300" role="alert">{newsError}</p>
                    )}
                  </form>
                )}
              </div>

              {/* Ubicación */}
              <div className="card-mystic p-8 md:p-10">
                <h3 className="font-display text-sm font-bold uppercase tracking-[0.26em] text-oro-400">
                  Encuéntranos
                </h3>
                <ul className="mt-5 space-y-4 text-base font-light text-marfil/85">
                  <li className="flex items-start gap-3">
                    <MapPin className="mt-1 h-5 w-5 shrink-0 text-oro-500" strokeWidth={1.5} aria-hidden="true" />
                    <span>Taller artesanal en México — envíos a todo el país.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Mail className="mt-1 h-5 w-5 shrink-0 text-oro-500" strokeWidth={1.5} aria-hidden="true" />
                    <span>Pedidos personalizados y colecciones de temporada por encargo.</span>
                  </li>
                </ul>
              </div>

              {/* CÓDIGO QR - TARJETA NUEVA */}
              <div className="card-mystic p-8 md:p-10 text-center">
                <h3 className="font-display text-sm font-bold uppercase tracking-[0.26em] text-oro-400 mb-4">
                  ¿Prefieres usar tu celular?
                </h3>
                <p className="text-marfil/70 text-sm mb-6 leading-relaxed">
                  Escanea este código para visitar nuestro catálogo o chatear directamente.
                </p>
                
                {/* Contenedor del QR con fondo blanco */}
                <div className="inline-block p-4 bg-white rounded-xl shadow-lg border-2 border-oro-400/50 mb-6">
                  <img 
                    src="/img/qr-purus.png" 
                    alt="Código QR Purus Bouquet" 
                    className="w-40 h-40 object-contain"
                  />
                </div>

                {/* Datos de contacto */}
                <div className="space-y-2 text-marfil/80 text-sm">
                  <p className="font-display font-bold text-oro-300 text-base tracking-wider">
                    PURUS BOUQUET
                  </p>
                  <p className="flex items-center justify-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-oro-400">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    +52 1 5658104298
                  </p>
                  <p className="flex items-center justify-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-oro-400">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="2" y1="12" x2="22" y2="12"></line>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    </svg>
                    purusbouquet.mx
                  </p>
                </div>
              </div>
              {/* FIN DEL QR */}

            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
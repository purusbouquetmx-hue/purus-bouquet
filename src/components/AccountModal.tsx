import { useEffect, useState, type FormEvent } from 'react';
import { User, X } from 'lucide-react';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const STORAGE_KEY = 'purus-bouquet-account';

interface Account {
  nombre: string;
  email: string;
}

export default function AccountModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [account, setAccount] = useState<Account | null>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as Account) : null;
    } catch {
      return null;
    }
  });
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) {
      window.addEventListener('keydown', onKey);
      document.body.style.overflow = 'hidden';
      setError('');
    }
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (nombre.trim().length < 2) {
      setError('Cuéntanos tu nombre.');
      return;
    }
    if (!EMAIL_RE.test(email)) {
      setError('Escribe un correo válido.');
      return;
    }
    const acc = { nombre: nombre.trim(), email: email.trim() };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(acc));
    } catch {
      /* sin almacenamiento */
    }
    setAccount(acc);
  };

  const logout = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* sin almacenamiento */
    }
    setAccount(null);
    setNombre('');
    setEmail('');
  };

  const inputCls =
    'w-full border border-oro-500/30 bg-bosque-950/60 px-4 py-3 text-base font-light text-marfil placeholder:text-marfil/40 transition-colors focus:border-oro-400 focus:outline-none';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Mi cuenta">
      <button
        type="button"
        aria-label="Cerrar"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-bosque-950/75 backdrop-blur-sm"
      />
      <div className="card-mystic relative w-full max-w-md p-8 md:p-10">
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center text-marfil/70 transition-colors hover:text-oro-400"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        {account ? (
          <div className="text-center" role="status">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-oro-500/50 bg-oro-500/10">
              <User className="h-7 w-7 text-oro-400" aria-hidden="true" />
            </span>
            <h2 className="font-display text-gold mt-5 text-xl font-bold uppercase tracking-[0.16em]">
              Hola, {account.nombre.split(' ')[0]}
            </h2>
            <p className="mt-2 text-sm font-light text-marfil/70">{account.email}</p>
            <p className="mt-4 text-sm font-light italic text-marfil/60">
              Tu sesión vive solo en este navegador; tu bolsa ya está guardada
              aquí para tu próxima visita.
            </p>
            <button type="button" onClick={logout} className="btn-gold mt-7 w-full">
              Cerrar Sesión
            </button>
          </div>
        ) : (
          <>
            <h2 className="font-display text-gold text-xl font-bold uppercase tracking-[0.16em]">
              Mi Cuenta
            </h2>
            <p className="mt-2 text-sm font-light text-marfil/70">
              Guarda tu nombre y correo en este navegador para agilizar tus
              pedidos por WhatsApp.
            </p>
            <form onSubmit={submit} className="mt-6 space-y-4" noValidate>
              <div>
                <label htmlFor="a-nombre" className="font-display mb-2 block text-[11px] font-bold uppercase tracking-[0.22em] text-marfil/75">
                  Nombre
                </label>
                <input
                  id="a-nombre"
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Tu nombre"
                  className={inputCls}
                  autoComplete="name"
                />
              </div>
              <div>
                <label htmlFor="a-email" className="font-display mb-2 block text-[11px] font-bold uppercase tracking-[0.22em] text-marfil/75">
                  Correo
                </label>
                <input
                  id="a-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@correo.com"
                  className={inputCls}
                  autoComplete="email"
                />
              </div>
              {error && (
                <p className="text-sm font-medium text-red-300" role="alert">{error}</p>
              )}
              <button type="submit" className="btn-solid-gold w-full">
                Entrar
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

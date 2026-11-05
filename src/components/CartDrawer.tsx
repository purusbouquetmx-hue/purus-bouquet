import { useEffect } from 'react';
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { formatPrice, WHATSAPP_NUMBER } from '@/data/catalog';
import { useCart } from '@/hooks/useCart';

export default function CartDrawer() {
  const { items, total, isOpen, setOpen, setQty, remove, clear } = useCart();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    if (isOpen) {
      window.addEventListener('keydown', onKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, setOpen]);

  if (!isOpen) return null;

  const waMessage = encodeURIComponent(
    `Hola Purus Bouquet ✦ Me encantaría hacer este pedido:\n\n${items
      .map((i) => `• ${i.qty} × ${i.product.name} — ${formatPrice(i.product.price * i.qty)}`)
      .join('\n')}\n\nTotal: ${formatPrice(total)}`
  );

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Bolsa de compras">
      <button
        type="button"
        aria-label="Cerrar bolsa"
        onClick={() => setOpen(false)}
        className="absolute inset-0 h-full w-full cursor-default bg-bosque-950/70 backdrop-blur-sm"
      />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-oro-500/30 bg-bosque-900 shadow-2xl">
        <div className="flex items-center justify-between border-b border-oro-500/20 px-6 py-5">
          <h2 className="font-display flex items-center gap-3 text-sm font-bold uppercase tracking-[0.26em] text-oro-400">
            <ShoppingBag className="h-5 w-5" aria-hidden="true" />
            Tu Bolsa
          </h2>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Cerrar bolsa"
            className="flex h-11 w-11 items-center justify-center text-marfil/80 transition-colors hover:text-oro-400"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <span className="text-4xl text-oro-500/70" aria-hidden="true">✦</span>
              <p className="font-display mt-4 text-sm font-bold uppercase tracking-[0.22em] text-marfil/70">
                Tu bolsa está vacía
              </p>
              <p className="mt-2 max-w-60 text-sm font-light italic text-marfil/55">
                Las reliquias esperan ser descubiertas en las colecciones.
              </p>
              <button type="button" onClick={() => setOpen(false)} className="btn-gold mt-8 !px-6 !py-3">
                Explorar
              </button>
            </div>
          ) : (
            <ul className="space-y-5">
              {items.map(({ product, qty }) => (
                <li key={product.id} className="flex gap-4 border-b border-oro-500/15 pb-5">
                  <img
                    src={product.image}
                    alt=""
                    className="h-20 w-20 shrink-0 border border-oro-500/30 object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-display text-sm font-bold uppercase tracking-[0.14em] text-oro-300">
                        {product.name}
                      </p>
                      <button
                        type="button"
                        onClick={() => remove(product.id)}
                        aria-label={`Quitar ${product.name} de la bolsa`}
                        className="flex h-8 w-8 shrink-0 items-center justify-center text-marfil/60 transition-colors hover:text-red-300"
                      >
                        <Trash2 className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                    <p className="mt-1 text-sm font-light text-marfil/65">
                      {formatPrice(product.price)}
                    </p>
                    <div className="mt-3 inline-flex items-center border border-oro-500/30">
                      <button
                        type="button"
                        onClick={() => setQty(product.id, qty - 1)}
                        aria-label={`Reducir cantidad de ${product.name}`}
                        className="flex h-9 w-9 items-center justify-center text-oro-400 transition-colors hover:bg-oro-500/15"
                      >
                        <Minus className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>
                      <span className="font-display w-10 text-center text-sm font-bold text-marfil" aria-live="polite">
                        {qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQty(product.id, qty + 1)}
                        aria-label={`Aumentar cantidad de ${product.name}`}
                        className="flex h-9 w-9 items-center justify-center text-oro-400 transition-colors hover:bg-oro-500/15"
                      >
                        <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-oro-500/25 px-6 py-6">
            <div className="flex items-center justify-between">
              <span className="font-display text-xs font-bold uppercase tracking-[0.26em] text-marfil/75">
                Total
              </span>
              <span className="font-display text-gold text-xl font-black tracking-wider">
                {formatPrice(total)}
              </span>
            </div>
            <p className="mt-2 text-xs font-light text-marfil/55">
              Envío calculado al confirmar tu pedido por WhatsApp.
            </p>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-solid-gold mt-5 w-full"
            >
              Pedir por WhatsApp
            </a>
            <button
              type="button"
              onClick={clear}
              className="font-display mt-3 w-full py-2 text-[11px] font-bold uppercase tracking-[0.24em] text-marfil/55 transition-colors hover:text-oro-400"
            >
              Vaciar Bolsa
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}

import type { Product } from '@/data/catalog';
import { formatPrice, WHATSAPP_NUMBER } from '@/data/catalog';
import { useCart } from '@/hooks/useCart';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  // Obtenemos las funciones del carrito directamente
  const { add, setOpen } = useCart();

  const handleAddToCart = () => {
    add(product.id);    // 1. Agrega el producto al carrito usando su ID
    setOpen(true);      // 2. Abre el carrito lateral para que el usuario lo vea
    onClose();          // 3. Cierra este modal
  };

  const whatsappMessage = `Hola, me interesa el perfume ${product.name} de la colección ${product.collectionId}.`;
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bosque-950/90 backdrop-blur-md animate-[fadeIn_0.3s_ease-out]"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl bg-gradient-to-b from-bosque-900 to-bosque-950 border border-oro-500/30 rounded-2xl shadow-2xl overflow-hidden animate-[scaleIn_0.4s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-marfil/70 hover:text-oro-400 transition-colors rounded-full hover:bg-white/10"
          aria-label="Cerrar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>

        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 p-8 flex items-center justify-center bg-black/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.15)_0%,transparent_70%)]"></div>
            <img 
              src={product.image} 
              alt={product.name} 
              className="relative z-10 max-h-[500px] md:max-h-[600px] w-auto object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.7)] hover:scale-105 transition-transform duration-500"
            />
          </div>

          <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center">
            {product.badge && (
              <span className="inline-block self-start px-3 py-1 mb-4 text-xs font-bold tracking-widest text-bosque-950 bg-oro-400 rounded-full uppercase">
                {product.badge}
              </span>
            )}
            
            <h2 className="font-display text-4xl md:text-5xl font-black text-oro-400 mb-2 tracking-wide">
              {product.name}
            </h2>
            
            <p className="text-marfil/80 text-lg italic mb-6 leading-relaxed">
              {product.description}
            </p>

            <div className="space-y-6 mb-8">
              <div>
                <h4 className="text-oro-400 font-semibold text-sm uppercase tracking-wider mb-2">Detalles</h4>
                <ul className="space-y-2">
                  {product.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-marfil/90">
                      <span className="text-oro-400 mt-1">✦</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-oro-400 font-semibold text-sm uppercase tracking-wider mb-2">Notas Olfativas</h4>
                <p className="text-marfil/90 italic border-l-2 border-oro-400/50 pl-4">
                  {product.notes}
                </p>
              </div>
            </div>

            <div className="mt-auto pt-6 border-t border-white/10">
              <div className="flex items-center justify-between mb-6">
                <span className="text-3xl font-display font-bold text-marfil">
                  {formatPrice(product.price)}
                </span>
              </div>
              
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleAddToCart}
                  className="w-full py-4 bg-oro-400 text-bosque-950 font-bold tracking-wider uppercase hover:bg-oro-300 transition-colors rounded-lg flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                  Agregar al Carrito
                </button>
                
                <a 
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 bg-transparent border-2 border-oro-400 text-oro-400 font-bold tracking-wider uppercase hover:bg-oro-400 hover:text-bosque-950 transition-colors rounded-lg flex items-center justify-center gap-2 text-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                  Solicitar por WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.95) translateY(20px); } to { opacity: 1; transform: scale(1) translateY(0); } }
      `}</style>
    </div>
  );
}
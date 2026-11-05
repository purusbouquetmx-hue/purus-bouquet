import { useState } from 'react';
import { products, collections, formatPrice, type Product } from '@/data/catalog';
import ProductModal from './ProductModal';

interface CatalogProps {
  filter: string;
  onFilter: (id: string) => void;
  // Ya NO necesitamos onAddToCart aquí
}

export default function Catalog({ filter, onFilter }: CatalogProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = filter === 'todas' 
    ? products 
    : products.filter(p => p.collectionId === filter);

  return (
    <section id="catalogo" className="py-24 px-6 bg-bosque-950 relative">
      <div className="max-w-7xl mx-auto mb-16 text-center">
        <h2 className="font-display text-4xl md:text-5xl font-black text-oro-400 mb-8 tracking-wide">
          Tesoros del Taller
        </h2>
        
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => onFilter('todas')}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 border ${
              filter === 'todas' ? 'bg-oro-400 text-bosque-950 border-oro-400' : 'bg-transparent text-marfil border-marfil/30'
            }`}
          >
            Todas
          </button>
          {collections.map((col) => (
            <button
              key={col.id}
              onClick={() => onFilter(col.id)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 border ${
                filter === col.id ? 'bg-oro-400 text-bosque-950 border-oro-400' : 'bg-transparent text-marfil border-marfil/30'
              }`}
            >
              {col.name}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            onClick={() => setSelectedProduct(product)}
            className="group relative bg-bosque-900/50 border border-marfil/10 rounded-xl overflow-hidden cursor-pointer hover:border-oro-400/50 transition-all duration-300"
          >
            {product.badge && (
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1 text-xs font-bold text-bosque-950 bg-oro-400 rounded-full uppercase">
                  {product.badge}
                </span>
              </div>
            )}

            <div className="aspect-[4/5] overflow-hidden bg-bosque-800 relative flex items-center justify-center p-4">
              <img
                src={product.image}
                alt={product.name}
                className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            <div className="p-6">
              <h3 className="font-display text-xl font-bold text-marfil mb-2 group-hover:text-oro-400 transition-colors">
                {product.name}
              </h3>
              <p className="text-marfil/60 text-sm line-clamp-2 mb-4">
                {product.description}
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <span className="text-oro-400 font-display font-bold text-lg">
                  {formatPrice(product.price)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </section>
  );
}
import { useCallback, useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Collections from '@/components/Collections';
import Catalog from '@/components/Catalog';
import Essence from '@/components/Essence';
import Process from '@/components/Process';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import SearchOverlay from '@/components/SearchOverlay';
import CartDrawer from '@/components/CartDrawer';
import AccountModal from '@/components/AccountModal';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import { CartProvider } from '@/hooks/useCart';

export default function Home() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [filter, setFilter] = useState('todas');

  const goToCollection = useCallback((id: string) => {
    setFilter(id);
    setSearchOpen(false);
    document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <CartProvider>
      <div className="min-h-[100dvh] bg-bosque-950">
        <Navbar
          onSearch={() => setSearchOpen(true)}
          onAccount={() => setAccountOpen(true)}
        />
        <main>
          <Hero />
          <Collections onSelect={goToCollection} />
          <Catalog filter={filter} onFilter={setFilter} />
          <Essence />
          <Process />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
        <SearchOverlay
          open={searchOpen}
          onClose={() => setSearchOpen(false)}
          onPick={goToCollection}
        />
        <CartDrawer />
        <AccountModal open={accountOpen} onClose={() => setAccountOpen(false)} />
        <WhatsAppFloat />
      </div>
    </CartProvider>
  );
}

import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Categories from './components/Categories';
import FeaturedProducts from './components/FeaturedProducts';
import DealsSection from './components/DealsSection';
import Testimonials from './components/Testimonials';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';
import ScrollToTop from './components/ScrollToTop';

function AppContent() {
  return (
    <div className="min-h-screen bg-dark text-light-text">
      {/* Noise Overlay */}
      <div className="noise-overlay" />

      <Navbar />
      <Hero />
      <Categories />
      <FeaturedProducts />
      <DealsSection />
      <Testimonials />
      <Newsletter />
      <Footer />
      <CartSidebar />
      <ScrollToTop />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </ThemeProvider>
  );
}

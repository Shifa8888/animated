import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingCart, Menu, X, User, Heart, Sun, Moon, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import AccountModal from './AccountModal';

const navLinks = ['Home', 'Shop', 'Categories', 'Deals', 'About'];

export default function Navbar() {
  const { totalItems, setIsCartOpen } = useCart();
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [accountOpen, setAccountOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'glass-strong shadow-2xl shadow-purple-900/10'
            : 'bg-transparent'
        }`}
      >
        {/* Top Bar */}
        <div className="hidden md:block border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center text-xs text-muted-text">
            <span>🚚 Free shipping on orders over $100</span>
            <div className="flex items-center gap-4">
              <span className="hover:text-primary cursor-pointer transition-colors">Track Order</span>
              <span className="hover:text-primary cursor-pointer transition-colors">Support</span>
              <span className="hover:text-primary cursor-pointer transition-colors">USD $</span>
            </div>
          </div>
        </div>

        {/* Main Nav */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 cursor-pointer"
            >
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center font-bold text-white text-sm md:text-lg">
                HH
              </div>
              <div className="hidden sm:block">
                <h1 className="text-sm md:text-lg font-bold leading-tight">
                  <span className="text-gradient">Hashir Harry</span>
                </h1>
                <p className="text-[10px] text-muted-text -mt-0.5 tracking-widest uppercase">Ultra Web Store</p>
              </div>
            </motion.div>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i + 0.3 }}
                  className="relative px-4 py-2 text-sm font-medium text-light-text/80 hover:text-white rounded-lg hover:bg-white/5 transition-all group"
                >
                  {link}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-4/5 transition-all duration-300 rounded-full" />
                </motion.a>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-1 md:gap-2">
              {/* Search */}
              <div className="relative">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSearchOpen(!searchOpen)}
                  className="p-2 md:p-2.5 rounded-xl hover:bg-white/5 text-light-text/70 hover:text-white transition-all"
                >
                  <Search className="w-4 h-4 md:w-5 md:h-5" />
                </motion.button>
                <AnimatePresence>
                  {searchOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      className="absolute right-0 top-full mt-2 w-72 md:w-80 glass-strong rounded-2xl p-3 shadow-2xl"
                    >
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search products..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-light-text placeholder-muted-text focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30"
                        autoFocus
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Wishlist */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="hidden sm:flex p-2 md:p-2.5 rounded-xl hover:bg-white/5 text-light-text/70 hover:text-white transition-all"
              >
                <Heart className="w-4 h-4 md:w-5 md:h-5" />
              </motion.button>

              {/* User / Avatar */}
              {user ? (
                <div className="hidden sm:flex items-center gap-1">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setAccountOpen(true)}
                    className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-white/5 transition-all"
                  >
                    <div className="w-7 h-7 md:w-8 md:h-8 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xs font-bold shadow-md shadow-primary/30">
                      {user.name[0].toUpperCase()}
                    </div>
                    <span className="hidden md:block text-sm font-medium text-light-text/80 max-w-[80px] truncate">
                      {user.name}
                    </span>
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={logout}
                    title="Logout"
                    className="p-2 rounded-xl hover:bg-red-500/10 text-muted-text hover:text-red-400 transition-all"
                  >
                    <LogOut className="w-4 h-4 md:w-5 md:h-5" />
                  </motion.button>
                </div>
              ) : (
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setAccountOpen(true)}
                  className="hidden sm:flex p-2 md:p-2.5 rounded-xl hover:bg-white/5 text-light-text/70 hover:text-white transition-all"
                >
                  <User className="w-4 h-4 md:w-5 md:h-5" />
                </motion.button>
              )}

              {/* Theme Toggle */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                title={theme === 'dark' ? 'Maximize Theme' : 'Dark Theme'}
                className="p-2 md:p-2.5 rounded-xl hover:bg-white/5 text-light-text/70 hover:text-white transition-all"
              >
                <AnimatePresence mode="wait">
                  {theme === 'dark' ? (
                    <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <Sun className="w-4 h-4 md:w-5 md:h-5" />
                    </motion.div>
                  ) : (
                    <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <Moon className="w-4 h-4 md:w-5 md:h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Cart */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 md:p-2.5 rounded-xl hover:bg-white/5 text-light-text/70 hover:text-white transition-all"
              >
                <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
                <AnimatePresence>
                  {totalItems > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-0.5 -right-0.5 w-4 h-4 md:w-5 md:h-5 bg-gradient-to-r from-primary to-accent rounded-full text-[10px] font-bold text-white flex items-center justify-center badge-pulse"
                    >
                      {totalItems}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Mobile Menu */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 md:p-2.5 rounded-xl hover:bg-white/5 text-light-text/70 hover:text-white transition-all"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-72 glass-strong"
            >
              <div className="p-6 pt-24">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    onClick={() => setMobileOpen(false)}
                    className="block py-3 text-lg font-medium text-light-text/80 hover:text-white border-b border-white/5 transition-colors"
                  >
                    {link}
                  </motion.a>
                ))}
                <div className="mt-6 flex flex-col gap-3">
                  <button
                    onClick={() => { setMobileOpen(false); setAccountOpen(true); }}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-semibold text-sm"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => { setMobileOpen(false); setAccountOpen(true); }}
                    className="w-full py-3 rounded-xl border border-white/10 text-light-text font-semibold text-sm hover:bg-white/5"
                  >
                    Create Account
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {accountOpen && <AccountModal onClose={() => setAccountOpen(false)} />}
    </>
  );
}

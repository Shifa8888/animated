import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Play, Star } from 'lucide-react';
import { useState, useEffect } from 'react';

const stats = [
  { label: 'Products', value: '2,500+' },
  { label: 'Happy Customers', value: '50K+' },
  { label: 'Countries', value: '120+' },
  { label: '5-Star Reviews', value: '15K+' },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  const slides = [
    {
      title: 'Experience the Future',
      subtitle: 'of Premium Shopping',
      description: 'Discover curated collections of the finest products with unmatched quality and design. Your premium shopping destination.',
      cta: 'Explore Collection',
      gradient: 'from-primary/20 via-transparent to-accent/20',
    },
    {
      title: 'Unmatched Quality',
      subtitle: 'Unbeatable Prices',
      description: 'Handpicked products from world-renowned brands. Every item is tested and verified for exceptional quality.',
      cta: 'Shop Now',
      gradient: 'from-accent/20 via-transparent to-gold/20',
    },
    {
      title: 'Free Express',
      subtitle: 'Worldwide Shipping',
      description: 'Enjoy complimentary express shipping on all orders over $100. Delivered to your doorstep in 2-5 business days.',
      cta: 'View Deals',
      gradient: 'from-gold/20 via-transparent to-primary/20',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <motion.div style={{ y: y1 }} className="absolute inset-0">
        <div className={`absolute inset-0 bg-gradient-to-br ${slides[currentSlide].gradient} transition-all duration-1000`} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(108,92,231,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,206,201,0.1),transparent_50%)]" />

        {/* Animated Orbs */}
        <motion.div
          animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -80, 0], y: [0, 60, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, 60, 0], y: [0, -80, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-gold/5 rounded-full blur-3xl"
        />

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
      </motion.div>

      {/* Content */}
      <motion.div style={{ opacity }} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full pt-24 md:pt-32 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 md:mb-8"
            >
              <Star className="w-4 h-4 text-gold" fill="#FDCB6E" />
              <span className="text-xs md:text-sm font-medium text-light-text/80">
                Rated #1 Premium Store 2026
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] mb-4 md:mb-6"
            >
              <span className="block text-light-text">{slides[currentSlide].title}</span>
              <span className="block text-gradient">{slides[currentSlide].subtitle}</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-base md:text-lg text-muted-text max-w-lg mb-8 md:mb-10 leading-relaxed"
            >
              {slides[currentSlide].description}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-3 md:gap-4 mb-10 md:mb-14"
            >
              <motion.a
                href="#shop"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-primary to-accent rounded-2xl text-white font-semibold text-sm md:text-base overflow-hidden shadow-lg shadow-primary/25"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {slides[currentSlide].cta}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.a>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group px-6 md:px-8 py-3 md:py-4 glass rounded-2xl text-light-text font-semibold text-sm md:text-base flex items-center gap-2 hover:bg-white/10"
              >
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <Play className="w-3 h-3 ml-0.5" fill="currentColor" />
                </div>
                Watch Story
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6"
            >
              {stats.map((stat, i) => (
                <div key={i} className="text-center sm:text-left">
                  <div className="text-xl md:text-2xl font-bold text-gradient">{stat.value}</div>
                  <div className="text-xs text-muted-text mt-0.5">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right - Slide Indicators + Visual */}
          <div className="hidden lg:flex flex-col items-center justify-center relative">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.9, rotate: 5 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div className="w-80 h-80 xl:w-96 xl:h-96 rounded-[3rem] bg-gradient-to-br from-primary/30 to-accent/30 p-1 animate-morph">
                <div className="w-full h-full rounded-[2.8rem] bg-dark-card flex items-center justify-center overflow-hidden">
                  <div className="text-center p-8">
                    <div className="text-6xl mb-4">🛍️</div>
                    <div className="text-2xl font-bold text-gradient mb-2">Premium Collection</div>
                    <div className="text-muted-text text-sm">Curated just for you</div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-6 -right-6 glass rounded-2xl p-4 shadow-xl"
              >
                <div className="text-2xl">🔥</div>
                <div className="text-xs font-semibold mt-1">Trending</div>
              </motion.div>
              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-4 -left-8 glass rounded-2xl p-4 shadow-xl"
              >
                <div className="text-2xl">⭐</div>
                <div className="text-xs font-semibold mt-1">4.9 Rating</div>
              </motion.div>
            </motion.div>

            {/* Slide Indicators */}
            <div className="flex gap-3 mt-10">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`transition-all duration-500 rounded-full ${
                    i === currentSlide
                      ? 'w-10 h-3 bg-gradient-to-r from-primary to-accent'
                      : 'w-3 h-3 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-muted-text tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 rounded-full border-2 border-white/20 flex justify-center pt-1.5"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-2 bg-primary rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

import { motion } from 'framer-motion';
import { Zap, Tag } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function DealsSection() {
  const [timeLeft, setTimeLeft] = useState({ hours: 12, minutes: 45, seconds: 30 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) { seconds = 59; minutes--; }
        if (minutes < 0) { minutes = 59; hours--; }
        if (hours < 0) { hours = 23; minutes = 59; seconds = 59; }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const dealProducts = [
    { name: "Quantum Pro Headphones", price: 299.99, original: 449.99, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop" },
    { name: "Nebula Smart Watch", price: 449.99, original: 599.99, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop" },
    { name: "Zenith Keyboard", price: 219.99, original: 299.99, image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop" },
  ];

  return (
    <section id="deals" className="py-16 md:py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl md:rounded-[2rem] overflow-hidden"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-dark-card to-accent/20" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50" />

          <div className="relative p-6 md:p-12 lg:p-16">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left */}
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 text-red-400 text-xs font-bold uppercase tracking-wider mb-4">
                    <Zap className="w-4 h-4" />
                    Flash Sale
                  </div>
                  <h2 className="text-3xl md:text-5xl font-bold mb-4">
                    Mega <span className="text-gradient">Deals</span>
                  </h2>
                  <p className="text-muted-text mb-6 max-w-md">
                    Don't miss our biggest sale of the season. Premium products at unbeatable prices, limited stock available.
                  </p>

                  {/* Countdown */}
                  <div className="flex gap-3 mb-8">
                    {[
                      { label: 'Hours', value: timeLeft.hours },
                      { label: 'Minutes', value: timeLeft.minutes },
                      { label: 'Seconds', value: timeLeft.seconds },
                    ].map((item, i) => (
                      <div key={i} className="text-center">
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl glass-strong flex items-center justify-center mb-2">
                          <span className="text-2xl md:text-3xl font-bold text-gradient">{String(item.value).padStart(2, '0')}</span>
                        </div>
                        <span className="text-xs text-muted-text">{item.label}</span>
                      </div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-primary to-accent rounded-2xl text-white font-bold text-sm md:text-base shadow-lg shadow-primary/25 flex items-center gap-2"
                  >
                    <Tag className="w-4 h-4" />
                    Shop All Deals
                  </motion.button>
                </motion.div>
              </div>

              {/* Right - Deal Products */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                {dealProducts.map((deal, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-4 p-4 rounded-2xl glass cursor-pointer group"
                  >
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden flex-shrink-0 bg-dark-surface">
                      <img src={deal.image} alt={deal.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm md:text-base font-semibold text-light-text truncate">{deal.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-lg font-bold text-gradient">${deal.price}</span>
                        <span className="text-sm text-muted-text line-through">${deal.original}</span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="px-2 py-1 rounded-lg bg-red-500/20 text-red-400 text-xs font-bold">
                        -{Math.round(((deal.original - deal.price) / deal.original) * 100)}%
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

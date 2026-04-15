import { motion } from 'framer-motion';
import { Mail, Send, Check } from 'lucide-react';
import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <section className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-dark-surface to-accent/10" />

          <div className="relative p-8 md:p-16 text-center">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center"
            >
              <Mail className="w-7 h-7 md:w-8 md:h-8 text-white" />
            </motion.div>

            <h2 className="text-2xl md:text-4xl font-bold mb-3">
              Stay in the <span className="text-gradient">Loop</span>
            </h2>
            <p className="text-muted-text max-w-lg mx-auto mb-8">
              Subscribe to our newsletter for exclusive deals, new arrivals, and insider-only discounts.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="relative flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full px-5 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-light-text placeholder-muted-text focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 text-sm"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className={`px-6 py-3.5 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
                  subscribed
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/25'
                }`}
              >
                {subscribed ? (
                  <>
                    <Check className="w-4 h-4" />
                    Subscribed!
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Subscribe
                  </>
                )}
              </motion.button>
            </form>

            <p className="text-xs text-muted-text mt-4">
              No spam, unsubscribe at any time. We respect your privacy.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

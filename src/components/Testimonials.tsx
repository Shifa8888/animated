import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { testimonials } from '../data/products';

export default function Testimonials() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-gold/10 text-gold text-xs font-semibold tracking-wider uppercase mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            What Our <span className="text-gradient-gold">Customers</span> Say
          </h2>
          <p className="text-muted-text max-w-2xl mx-auto">
            Real reviews from real customers who love our products and service.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -5 }}
              className="group relative p-6 md:p-8 rounded-2xl md:rounded-3xl bg-dark-card border border-white/5 hover:border-primary/20 transition-all duration-300"
            >
              {/* Quote Icon */}
              <div className="absolute top-4 right-4 md:top-6 md:right-6 text-primary/10 group-hover:text-primary/20 transition-colors">
                <Quote className="w-8 h-8 md:w-10 md:h-10" />
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-gold" fill="#FDCB6E" />
                ))}
              </div>

              {/* Text */}
              <p className="text-light-text/80 text-sm md:text-base leading-relaxed mb-6">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-sm">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-light-text text-sm">{testimonial.name}</div>
                  <div className="text-xs text-muted-text">{testimonial.role}</div>
                </div>
              </div>

              {/* Product Tag */}
              <div className="mt-4 pt-4 border-t border-white/5">
                <span className="text-xs text-primary">Purchased: {testimonial.product}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mt-12 md:mt-16"
        >
          {[
            { icon: '🔒', text: 'Secure Payment' },
            { icon: '🚚', text: 'Free Shipping' },
            { icon: '↩️', text: 'Easy Returns' },
            { icon: '💬', text: '24/7 Support' },
            { icon: '✅', text: 'Verified Products' },
          ].map((badge, i) => (
            <div key={i} className="flex items-center gap-2 text-muted-text">
              <span className="text-xl">{badge.icon}</span>
              <span className="text-xs md:text-sm">{badge.text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

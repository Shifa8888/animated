import { motion } from 'framer-motion';
import { categories } from '../data/products';

export default function Categories() {
  return (
    <section id="categories" className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wider uppercase mb-4">
            Browse
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Shop by <span className="text-gradient">Category</span>
          </h2>
          <p className="text-muted-text max-w-2xl mx-auto">
            Explore our curated collections across diverse categories, each offering premium quality products.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative cursor-pointer"
            >
              <div className={`relative rounded-2xl md:rounded-3xl bg-gradient-to-br ${cat.color} p-[1px] overflow-hidden`}>
                <div className="bg-dark-card rounded-2xl md:rounded-3xl p-4 md:p-6 text-center h-full transition-all duration-300 group-hover:bg-dark-surface">
                  <div className="text-3xl md:text-4xl mb-2 md:mb-3 group-hover:scale-110 transition-transform duration-300">
                    {cat.icon}
                  </div>
                  <h3 className="text-sm md:text-base font-semibold text-light-text mb-1">{cat.name}</h3>
                  <p className="text-xs text-muted-text">{cat.count} items</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { motion } from 'framer-motion';
import { Star, ShoppingCart, Eye, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import type { Product } from '../data/products';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  index: number;
  onView: (product: Product) => void;
}

export default function ProductCard({ product, index, onView }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      <div className="relative rounded-2xl md:rounded-3xl bg-dark-card border border-white/5 overflow-hidden hover-card">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-dark-surface">
          {!imgLoaded && (
            <div className="absolute inset-0 skeleton" />
          )}
          <img
            src={product.image}
            alt={product.name}
            onLoad={() => setImgLoaded(true)}
            className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${
              imgLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            loading="lazy"
          />

          {/* Overlay */}
          <motion.div
            initial={false}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
          />

          {/* Badge */}
          {product.badge && (
            <div className="absolute top-3 left-3 md:top-4 md:left-4 px-3 py-1 rounded-full bg-gradient-to-r from-primary to-accent text-white text-[10px] md:text-xs font-bold uppercase tracking-wider shadow-lg">
              {product.badge}
            </div>
          )}

          {/* Discount */}
          <div className="absolute top-3 right-3 md:top-4 md:right-4 px-2 py-1 rounded-lg bg-red-500/90 text-white text-[10px] md:text-xs font-bold">
            -{discount}%
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={false}
            animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
            className="absolute bottom-3 left-3 right-3 md:bottom-4 md:left-4 md:right-4 flex gap-2"
          >
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => addToCart(product)}
              className="flex-1 py-2 md:py-2.5 bg-gradient-to-r from-primary to-accent rounded-xl text-white text-xs md:text-sm font-semibold flex items-center justify-center gap-1.5 shadow-lg"
            >
              <ShoppingCart className="w-3.5 h-3.5 md:w-4 md:h-4" />
              Add to Cart
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => onView(product)}
              className="p-2 md:p-2.5 glass rounded-xl text-white hover:bg-white/20"
            >
              <Eye className="w-3.5 h-3.5 md:w-4 md:h-4" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="p-2 md:p-2.5 glass rounded-xl text-white hover:bg-white/20"
            >
              <Heart className="w-3.5 h-3.5 md:w-4 md:h-4" />
            </motion.button>
          </motion.div>
        </div>

        {/* Info */}
        <div className="p-4 md:p-5">
          <div className="text-xs text-muted-text uppercase tracking-wider mb-1.5">{product.category}</div>
          <h3 className="font-semibold text-light-text text-sm md:text-base mb-2 line-clamp-2 leading-snug group-hover:text-white transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-3">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 md:w-3.5 md:h-3.5 ${
                    i < Math.floor(product.rating) ? 'text-gold' : 'text-white/10'
                  }`}
                  fill={i < Math.floor(product.rating) ? '#FDCB6E' : 'none'}
                />
              ))}
            </div>
            <span className="text-xs text-muted-text">({product.reviews.toLocaleString()})</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-lg md:text-xl font-bold text-gradient">${product.price}</span>
            <span className="text-sm text-muted-text line-through">${product.originalPrice}</span>
          </div>

          {/* Colors */}
          {product.colors && (
            <div className="flex items-center gap-1.5 mt-3">
              {product.colors.map((color, i) => (
                <div
                  key={i}
                  className="w-4 h-4 rounded-full border-2 border-white/20 cursor-pointer hover:scale-125 transition-transform"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

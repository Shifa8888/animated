import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Star, Heart, Truck, Shield, RotateCcw } from 'lucide-react';
import { useCart } from '../context/CartContext';
import type { Product } from '../data/products';
import { useState } from 'react';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const { addToCart } = useCart();
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0]);
  const [quantity, setQuantity] = useState(1);

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-strong rounded-3xl shadow-2xl"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid md:grid-cols-2 gap-0">
            {/* Image */}
            <div className="relative aspect-square md:aspect-auto bg-dark-surface rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.badge && (
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-gradient-to-r from-primary to-accent text-white text-xs font-bold uppercase tracking-wider">
                  {product.badge}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="p-6 md:p-8 flex flex-col">
              <div className="text-xs text-primary uppercase tracking-wider mb-2">{product.category}</div>
              <h2 className="text-2xl md:text-3xl font-bold text-light-text mb-3">{product.name}</h2>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-gold' : 'text-white/10'}`}
                      fill={i < Math.floor(product.rating) ? '#FDCB6E' : 'none'}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-text">{product.rating} ({product.reviews.toLocaleString()} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-bold text-gradient">${product.price}</span>
                <span className="text-lg text-muted-text line-through">${product.originalPrice}</span>
                <span className="px-2 py-0.5 rounded-lg bg-red-500/20 text-red-400 text-sm font-bold">-{discount}%</span>
              </div>

              <p className="text-muted-text text-sm leading-relaxed mb-6">{product.description}</p>

              {/* Colors */}
              {product.colors && (
                <div className="mb-4">
                  <label className="text-sm font-medium text-light-text mb-2 block">Color</label>
                  <div className="flex gap-2">
                    {product.colors.map((color, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedColor(color)}
                        className={`w-8 h-8 rounded-full transition-all ${
                          selectedColor === color ? 'ring-2 ring-primary ring-offset-2 ring-offset-dark-card scale-110' : 'ring-1 ring-white/20'
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes */}
              {product.sizes && (
                <div className="mb-4">
                  <label className="text-sm font-medium text-light-text mb-2 block">Size</label>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                          selectedSize === size
                            ? 'bg-primary text-white'
                            : 'glass text-muted-text hover:text-white hover:bg-white/10'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-6">
                <label className="text-sm font-medium text-light-text mb-2 block">Quantity</label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-xl glass flex items-center justify-center text-light-text hover:bg-white/10"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-semibold text-lg">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-xl glass flex items-center justify-center text-light-text hover:bg-white/10"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-auto">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    for (let i = 0; i < quantity; i++) {
                      addToCart(product, selectedColor, selectedSize);
                    }
                    onClose();
                  }}
                  className="flex-1 py-3.5 bg-gradient-to-r from-primary to-accent rounded-2xl text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-primary/25"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="p-3.5 glass rounded-2xl text-light-text hover:text-red-400 hover:bg-red-500/10"
                >
                  <Heart className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-3 mt-6 pt-6 border-t border-white/5">
                {[
                  { icon: Truck, text: 'Free Shipping' },
                  { icon: Shield, text: '2 Year Warranty' },
                  { icon: RotateCcw, text: '30 Day Returns' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex flex-col items-center text-center gap-1">
                    <Icon className="w-4 h-4 text-primary" />
                    <span className="text-[10px] text-muted-text">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

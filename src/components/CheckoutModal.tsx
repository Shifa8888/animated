import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, ShoppingBag, CreditCard, MapPin, User } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CheckoutModalProps {
  onClose: () => void;
}

type Step = 'details' | 'success';

export default function CheckoutModal({ onClose }: CheckoutModalProps) {
  const { items, totalPrice, clearCart, setIsCartOpen } = useCart();
  const [step, setStep] = useState<Step>('details');
  const [form, setForm] = useState({
    name: '', email: '', address: '', city: '', card: '', expiry: '', cvv: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('success');
    clearCart();
  };

  const handleContinueShopping = () => {
    setIsCartOpen(false);
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={e => e.stopPropagation()}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-strong rounded-3xl shadow-2xl"
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {step === 'details' ? (
            <div className="p-6 md:p-8">
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-light-text">Checkout</h2>
                  <p className="text-xs text-muted-text">{items.length} item{items.length !== 1 ? 's' : ''} in your order</p>
                </div>
              </div>

              {/* Order Summary */}
              <div className="mb-6 p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-3">
                <h3 className="text-sm font-semibold text-light-text mb-3">Order Summary</h3>
                {items.map(item => (
                  <div key={`${item.id}-${item.selectedColor}-${item.selectedSize}`} className="flex items-center gap-3">
                    <img src={item.image} alt={item.name} className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-light-text truncate">{item.name}</p>
                      <p className="text-xs text-muted-text">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-sm font-bold text-gradient">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="pt-3 border-t border-white/5 flex justify-between">
                  <span className="text-sm text-muted-text">Total</span>
                  <span className="text-base font-bold text-gradient">${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Personal Info */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <User className="w-4 h-4 text-primary" />
                    <span className="text-sm font-semibold text-light-text">Personal Info</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Full Name"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-light-text placeholder:text-muted-text text-sm focus:outline-none focus:border-primary/50 transition-colors"
                    />
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="Email Address"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-light-text placeholder:text-muted-text text-sm focus:outline-none focus:border-primary/50 transition-colors"
                    />
                  </div>
                </div>

                {/* Shipping */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="text-sm font-semibold text-light-text">Shipping Address</span>
                  </div>
                  <div className="space-y-3">
                    <input
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      required
                      placeholder="Street Address"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-light-text placeholder:text-muted-text text-sm focus:outline-none focus:border-primary/50 transition-colors"
                    />
                    <input
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      required
                      placeholder="City"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-light-text placeholder:text-muted-text text-sm focus:outline-none focus:border-primary/50 transition-colors"
                    />
                  </div>
                </div>

                {/* Payment */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <CreditCard className="w-4 h-4 text-primary" />
                    <span className="text-sm font-semibold text-light-text">Payment Details</span>
                  </div>
                  <div className="space-y-3">
                    <input
                      name="card"
                      value={form.card}
                      onChange={handleChange}
                      required
                      placeholder="Card Number (1234 5678 9012 3456)"
                      maxLength={19}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-light-text placeholder:text-muted-text text-sm focus:outline-none focus:border-primary/50 transition-colors"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        name="expiry"
                        value={form.expiry}
                        onChange={handleChange}
                        required
                        placeholder="MM/YY"
                        maxLength={5}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-light-text placeholder:text-muted-text text-sm focus:outline-none focus:border-primary/50 transition-colors"
                      />
                      <input
                        name="cvv"
                        value={form.cvv}
                        onChange={handleChange}
                        required
                        placeholder="CVV"
                        maxLength={3}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-light-text placeholder:text-muted-text text-sm focus:outline-none focus:border-primary/50 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-gradient-to-r from-primary to-accent rounded-2xl text-white font-bold text-base shadow-lg shadow-primary/25 mt-2"
                >
                  Place Order — ${totalPrice.toFixed(2)}
                </motion.button>
              </form>
            </div>
          ) : (
            /* Success Screen */
            <div className="p-8 md:p-12 flex flex-col items-center text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 15, stiffness: 200, delay: 0.1 }}
                className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6 shadow-lg shadow-primary/30"
              >
                <CheckCircle className="w-12 h-12 text-white" />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl md:text-3xl font-bold text-light-text mb-3"
              >
                Order Placed Successfully!
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-muted-text text-sm leading-relaxed mb-8 max-w-sm"
              >
                Thank you for your purchase! Your order has been confirmed and will be shipped within 2-3 business days.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="w-full max-w-xs space-y-3"
              >
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleContinueShopping}
                  className="w-full py-4 bg-gradient-to-r from-primary to-accent rounded-2xl text-white font-bold text-base shadow-lg shadow-primary/25"
                >
                  Continue Shopping
                </motion.button>
              </motion.div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Lock, Eye, EyeOff, ShoppingBag, Star, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AuthPage() {
  const { login } = useAuth();
  const [view, setView] = useState<'login' | 'register'>('login');
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(form.email, form.name || undefined);
  };

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center relative overflow-hidden">
      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* Animated background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px] animate-float" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-accent/10 blur-[100px] animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[80px]" />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 grid lg:grid-cols-2 gap-8 items-center">

        {/* Left — Branding */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="hidden lg:flex flex-col gap-8"
        >
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center font-bold text-white text-xl shadow-lg shadow-primary/30">
              HH
            </div>
            <div>
              <h1 className="text-xl font-bold text-gradient">Hashir Harry</h1>
              <p className="text-xs text-muted-text tracking-widest uppercase">Ultra Web Store</p>
            </div>
          </div>

          <div>
            <h2 className="text-4xl xl:text-5xl font-bold text-light-text leading-tight mb-4">
              Shop the <span className="text-gradient">Future</span>,<br />Today.
            </h2>
            <p className="text-muted-text text-lg leading-relaxed">
              Premium products, unbeatable deals, and a seamless shopping experience — all in one place.
            </p>
          </div>

          {/* Feature pills */}
          <div className="flex flex-col gap-3">
            {[
              { icon: ShoppingBag, text: '12,000+ Premium Products' },
              { icon: Zap, text: 'Lightning Fast Delivery' },
              { icon: Star, text: 'Trusted by 50,000+ Customers' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3 p-3 rounded-2xl glass border border-white/5">
                <div className="w-8 h-8 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm text-light-text/80">{text}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right — Auth Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="glass-strong rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 pt-8 pb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center font-bold text-white">
              HH
            </div>
            <span className="text-lg font-bold text-gradient">Hashir Harry</span>
          </div>

          <AnimatePresence mode="wait">
            {view === 'login' ? (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="p-8"
              >
                <div className="text-center mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/30">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-light-text">Welcome Back</h2>
                  <p className="text-sm text-muted-text mt-1">Sign in to continue shopping</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-text pointer-events-none" />
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="Email address"
                      className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-light-text placeholder:text-muted-text text-sm focus:outline-none focus:border-primary/60 focus:bg-white/8 transition-all"
                    />
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-text pointer-events-none" />
                    <input
                      name="password"
                      type={showPass ? 'text' : 'password'}
                      value={form.password}
                      onChange={handleChange}
                      required
                      placeholder="Password"
                      className="w-full pl-10 pr-10 py-3.5 rounded-xl bg-white/5 border border-white/10 text-light-text placeholder:text-muted-text text-sm focus:outline-none focus:border-primary/60 transition-all"
                    />
                    <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-text hover:text-white transition-colors">
                      {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  <div className="flex justify-end">
                    <button type="button" className="text-xs text-primary hover:text-primary-light transition-colors">
                      Forgot password?
                    </button>
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-gradient-to-r from-primary to-accent rounded-2xl text-white font-bold text-base shadow-lg shadow-primary/25"
                  >
                    Sign In
                  </motion.button>
                </form>

                <p className="text-center text-sm text-muted-text mt-6">
                  Don't have an account?{' '}
                  <button onClick={() => setView('register')} className="text-primary hover:text-primary-light font-semibold transition-colors">
                    Create one
                  </button>
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="register"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="p-8"
              >
                <div className="text-center mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-primary flex items-center justify-center mx-auto mb-4 shadow-lg shadow-accent/30">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-light-text">Create Account</h2>
                  <p className="text-sm text-muted-text mt-1">Join thousands of happy shoppers</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-text pointer-events-none" />
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Full Name"
                      className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-light-text placeholder:text-muted-text text-sm focus:outline-none focus:border-primary/60 transition-all"
                    />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-text pointer-events-none" />
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="Email address"
                      className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-light-text placeholder:text-muted-text text-sm focus:outline-none focus:border-primary/60 transition-all"
                    />
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-text pointer-events-none" />
                    <input
                      name="password"
                      type={showPass ? 'text' : 'password'}
                      value={form.password}
                      onChange={handleChange}
                      required
                      placeholder="Password"
                      className="w-full pl-10 pr-10 py-3.5 rounded-xl bg-white/5 border border-white/10 text-light-text placeholder:text-muted-text text-sm focus:outline-none focus:border-primary/60 transition-all"
                    />
                    <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-text hover:text-white transition-colors">
                      {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-gradient-to-r from-primary to-accent rounded-2xl text-white font-bold text-base shadow-lg shadow-primary/25"
                  >
                    Create Account
                  </motion.button>
                </form>

                <p className="text-center text-sm text-muted-text mt-6">
                  Already have an account?{' '}
                  <button onClick={() => setView('login')} className="text-primary hover:text-primary-light font-semibold transition-colors">
                    Sign in
                  </button>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

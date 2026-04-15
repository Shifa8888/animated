import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Mail, Lock, Eye, EyeOff, ShoppingBag, Heart, Settings, LogOut, Package, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AccountModalProps {
  onClose: () => void;
}

type View = 'login' | 'register' | 'profile';

const mockOrders = [
  { id: '#ORD-1042', date: 'Apr 10, 2026', status: 'Delivered', total: '$299.99', product: 'Quantum Pro Headphones' },
  { id: '#ORD-1031', date: 'Mar 28, 2026', status: 'Shipped', total: '$449.99', product: 'Nebula Smart Watch Ultra' },
  { id: '#ORD-1019', date: 'Mar 12, 2026', status: 'Delivered', total: '$129.99', product: 'Aether Minimalist Backpack' },
];

export default function AccountModal({ onClose }: AccountModalProps) {
  const { user, login, logout } = useAuth();
  const loggedIn = !!user;
  const [view, setView] = useState<View>(loggedIn ? 'profile' : 'login');
  const [showPass, setShowPass] = useState(false);
  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'settings'>('orders');
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(form.email, form.name || undefined);
    setView('profile');
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    login(form.email, form.name);
    setView('profile');
  };

  const handleLogout = () => {
    logout();
    onClose();
  };

  const statusColor = (status: string) => {
    if (status === 'Delivered') return 'text-emerald-400 bg-emerald-400/10';
    if (status === 'Shipped') return 'text-blue-400 bg-blue-400/10';
    return 'text-yellow-400 bg-yellow-400/10';
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
        <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />

        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={e => e.stopPropagation()}
          className="relative w-full max-w-md glass-strong rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <AnimatePresence mode="wait">
            {/* ── LOGIN ── */}
            {!loggedIn && view === 'login' && (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                className="p-8"
              >
                {/* Header */}
                <div className="flex flex-col items-center mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4 shadow-lg shadow-primary/30">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-light-text">Welcome Back</h2>
                  <p className="text-sm text-muted-text mt-1">Sign in to your account</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-text" />
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="Email address"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-light-text placeholder:text-muted-text text-sm focus:outline-none focus:border-primary/50 transition-colors"
                    />
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-text" />
                    <input
                      name="password"
                      type={showPass ? 'text' : 'password'}
                      value={form.password}
                      onChange={handleChange}
                      required
                      placeholder="Password"
                      className="w-full pl-10 pr-10 py-3 rounded-xl bg-white/5 border border-white/10 text-light-text placeholder:text-muted-text text-sm focus:outline-none focus:border-primary/50 transition-colors"
                    />
                    <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-text hover:text-white">
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
                    className="w-full py-3.5 bg-gradient-to-r from-primary to-accent rounded-2xl text-white font-bold shadow-lg shadow-primary/25"
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
            )}

            {/* ── REGISTER ── */}
            {!loggedIn && view === 'register' && (
              <motion.div
                key="register"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                className="p-8"
              >
                <div className="flex flex-col items-center mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-primary flex items-center justify-center mb-4 shadow-lg shadow-accent/30">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-light-text">Create Account</h2>
                  <p className="text-sm text-muted-text mt-1">Join us today</p>
                </div>

                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-text" />
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Full Name"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-light-text placeholder:text-muted-text text-sm focus:outline-none focus:border-primary/50 transition-colors"
                    />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-text" />
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="Email address"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-light-text placeholder:text-muted-text text-sm focus:outline-none focus:border-primary/50 transition-colors"
                    />
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-text" />
                    <input
                      name="password"
                      type={showPass ? 'text' : 'password'}
                      value={form.password}
                      onChange={handleChange}
                      required
                      placeholder="Password"
                      className="w-full pl-10 pr-10 py-3 rounded-xl bg-white/5 border border-white/10 text-light-text placeholder:text-muted-text text-sm focus:outline-none focus:border-primary/50 transition-colors"
                    />
                    <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-text hover:text-white">
                      {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3.5 bg-gradient-to-r from-primary to-accent rounded-2xl text-white font-bold shadow-lg shadow-primary/25"
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

            {/* ── PROFILE ── */}
            {loggedIn && view === 'profile' && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Profile Header */}
                <div className="relative p-6 pb-4 bg-gradient-to-br from-primary/20 to-accent/10 border-b border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/30 text-white text-xl font-bold">
                      {user?.name ? user.name[0].toUpperCase() : 'U'}
                    </div>
                    <div>
                      <h3 className="font-bold text-light-text text-lg">{user?.name || 'User'}</h3>
                      <p className="text-sm text-muted-text">{user?.email || 'user@example.com'}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-primary/20 text-primary text-[10px] font-semibold uppercase tracking-wider">
                        Premium Member
                      </span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3 mt-5">
                    {[
                      { icon: Package, label: 'Orders', value: '3' },
                      { icon: Heart, label: 'Wishlist', value: '7' },
                      { icon: ShoppingBag, label: 'Spent', value: '$879' },
                    ].map(({ icon: Icon, label, value }) => (
                      <div key={label} className="flex flex-col items-center p-3 rounded-2xl bg-white/5 border border-white/5">
                        <Icon className="w-4 h-4 text-primary mb-1" />
                        <span className="text-base font-bold text-light-text">{value}</span>
                        <span className="text-[10px] text-muted-text">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-white/5">
                  {(['orders', 'wishlist', 'settings'] as const).map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 py-3 text-xs font-semibold uppercase tracking-wider transition-colors ${
                        activeTab === tab
                          ? 'text-primary border-b-2 border-primary'
                          : 'text-muted-text hover:text-light-text'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <div className="p-5 max-h-64 overflow-y-auto">
                  {activeTab === 'orders' && (
                    <div className="space-y-3">
                      {mockOrders.map(order => (
                        <div key={order.id} className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] transition-colors cursor-pointer group">
                          <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Package className="w-4 h-4 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-light-text truncate">{order.product}</p>
                            <p className="text-xs text-muted-text">{order.id} · {order.date}</p>
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            <span className="text-sm font-bold text-gradient">{order.total}</span>
                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${statusColor(order.status)}`}>
                              {order.status}
                            </span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-muted-text group-hover:text-white transition-colors" />
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'wishlist' && (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <Heart className="w-10 h-10 text-muted-text mb-3" />
                      <p className="text-sm font-semibold text-light-text">7 saved items</p>
                      <p className="text-xs text-muted-text mt-1">Your wishlist is waiting</p>
                    </div>
                  )}

                  {activeTab === 'settings' && (
                    <div className="space-y-2">
                      {[
                        { icon: User, label: 'Edit Profile' },
                        { icon: Lock, label: 'Change Password' },
                        { icon: Mail, label: 'Email Preferences' },
                        { icon: Settings, label: 'Account Settings' },
                      ].map(({ icon: Icon, label }) => (
                        <button key={label} className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-white/5 text-light-text/80 hover:text-white transition-colors group">
                          <Icon className="w-4 h-4 text-muted-text group-hover:text-primary transition-colors" />
                          <span className="text-sm font-medium">{label}</span>
                          <ChevronRight className="w-4 h-4 text-muted-text ml-auto" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Logout */}
                <div className="p-5 pt-0">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-colors text-sm font-semibold"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

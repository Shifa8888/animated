import { motion } from 'framer-motion';
import { Heart, Mail, MapPin, Phone, ArrowUpRight } from 'lucide-react';

const footerLinks = {
  Shop: ['All Products', 'Electronics', 'Accessories', 'Fashion', 'Home & Living'],
  Company: ['About Us', 'Careers', 'Press', 'Blog', 'Affiliate Program'],
  Support: ['Help Center', 'Shipping Info', 'Returns', 'Order Tracking', 'Contact Us'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR'],
};

export default function Footer() {
  return (
    <footer id="about" className="relative pt-16 md:pt-24 pb-8">
      <div className="absolute inset-0 bg-gradient-to-t from-dark-card to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Main Footer */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12 md:mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-4 lg:mb-0">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center font-bold text-white">
                HH
              </div>
              <div>
                <h3 className="font-bold text-gradient text-sm">Hashir Harry</h3>
                <p className="text-[10px] text-muted-text tracking-widest uppercase">Ultra Web Store</p>
              </div>
            </div>
            <p className="text-sm text-muted-text mb-6 max-w-xs">
              Your premium destination for curated, high-quality products. Experience shopping reimagined.
            </p>
            <div className="flex gap-3">
              {['📘', '🐦', '📸', '🎬'].map((emoji, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-9 h-9 rounded-xl glass flex items-center justify-center text-lg hover:bg-white/10 transition-all"
                >
                  {emoji}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-light-text text-sm mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-text hover:text-primary transition-colors flex items-center gap-1 group"
                    >
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="grid sm:grid-cols-3 gap-4 mb-12 md:mb-16 p-6 rounded-2xl glass">
          {[
            { icon: Mail, label: 'Email', value: 'support@hashirharry.com' },
            { icon: Phone, label: 'Phone', value: '+1 (555) 123-4567' },
            { icon: MapPin, label: 'Address', value: '123 Premium Ave, NY 10001' },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4 text-primary" />
              </div>
              <div>
                <div className="text-xs text-muted-text">{label}</div>
                <div className="text-sm text-light-text font-medium">{value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-text text-center sm:text-left">
            © 2026 Hashir Harry Ultra Web Store. All rights reserved. Made with{' '}
            <Heart className="w-3 h-3 inline text-red-400" fill="#F87171" />
          </p>
          <div className="flex items-center gap-4">
            {['Visa', 'Mastercard', 'PayPal', 'Apple Pay'].map(method => (
              <div key={method} className="px-3 py-1.5 rounded-lg glass text-[10px] text-muted-text font-medium">
                {method}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

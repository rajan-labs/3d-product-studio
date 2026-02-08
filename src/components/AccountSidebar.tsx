import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, LogOut, Settings, User, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AccountSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AccountSidebar = ({ isOpen, onClose }: AccountSidebarProps) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const menuItems = [
    { label: 'Settings', icon: Settings, path: '/settings' },
    { label: 'About Us', icon: User, path: '/about' },
    { label: 'Privacy Policy', icon: User, path: '/privacy' },
    { label: 'Terms & Conditions', icon: User, path: '/terms' },
    { label: 'Disclaimer', icon: User, path: '/disclaimer' },
    { label: 'Contact Us', icon: User, path: '/contact' },
    { label: 'Help & Support', icon: User, path: '/help' },
  ];

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm"
          />

          {/* Sidebar */}
          <motion.aside
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed left-0 top-0 h-full w-72 glass-panel z-40 flex flex-col"
            role="navigation"
            aria-label="Account and navigation menu"
          >
            {/* Header */}
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h2 className="text-lg font-display font-bold">Menu</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-secondary rounded-lg transition-colors"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>

            {/* User Section */}
            <div className="p-4 border-b border-border">
              {!isLoggedIn ? (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground mb-3">
                    ✨ Demo Mode – No real authentication
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleLogin}
                    className="w-full py-2 px-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                  >
                    Demo Login
                  </motion.button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <User size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Demo User</p>
                      <p className="text-xs text-muted-foreground">demo@example.com</p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleLogout}
                    className="w-full py-2 px-3 bg-destructive/20 text-destructive border border-destructive/30 rounded-lg font-medium hover:bg-destructive/30 transition-colors flex items-center justify-center gap-2"
                  >
                    <LogOut size={14} />
                    Demo Logout
                  </motion.button>
                </div>
              )}
            </div>

            {/* Navigation Menu */}
            <div className="flex-1 overflow-y-auto p-2">
              <nav className="space-y-1">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <motion.button
                      key={item.label}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleNavigate(item.path)}
                      className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors text-left"
                    >
                      <Icon size={16} className="text-muted-foreground" />
                      <span className="text-sm">{item.label}</span>
                    </motion.button>
                  );
                })}
              </nav>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-border">
              <p className="text-xs text-muted-foreground text-center">
                <span className="block mb-1">🎓 Educational Demo</span>
                No real data collected
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

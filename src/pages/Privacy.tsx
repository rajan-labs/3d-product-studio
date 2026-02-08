import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

export default function Privacy() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10">
      {/* Header */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 right-0 z-10 p-4 glass-panel border-b border-border"
      >
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
            aria-label="Go back"
          >
            <ChevronLeft size={20} />
          </button>
          <h1 className="text-2xl font-display font-bold">Privacy Policy</h1>
        </div>
      </motion.header>

      {/* Content */}
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="pt-20 pb-12 px-4"
        role="main"
      >
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Educational Notice */}
          <div className="glass-panel p-6 rounded-xl border border-accent/30 bg-accent/5">
            <p className="text-sm text-accent font-medium">
              🎓 Educational Demo Project
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              This is a demonstration project. No real user data is collected, stored, or processed. This privacy policy is provided for educational purposes only.
            </p>
          </div>

          {/* Sections */}
          <section>
            <h2 className="text-xl font-bold mb-4">1. Information We Don't Collect</h2>
            <p className="text-muted-foreground mb-4">
              As a demonstration project, we do not collect, store, or process any personal information. All interactions are simulated using mock data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">2. Demo Mode</h2>
            <p className="text-muted-foreground mb-4">
              All user accounts, login credentials, and transactions shown in this application are simulated. No real authentication or payment processing occurs.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">3. Local Storage</h2>
            <p className="text-muted-foreground mb-4">
              The application uses your browser's local storage to maintain demo state (cart, wishlist, theme preference). This data is stored only on your device.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">4. Third-Party Services</h2>
            <p className="text-muted-foreground mb-4">
              This application does not integrate with any third-party services or APIs for data collection. All functionality is contained within the application itself.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">5. Educational Purpose</h2>
            <p className="text-muted-foreground mb-4">
              This project is created for educational and portfolio demonstration purposes. It showcases frontend development skills in React, Three.js, and modern UI/UX design.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">6. Questions?</h2>
            <p className="text-muted-foreground mb-4">
              For more information about this demo project, please visit the About Us or Contact Us page.
            </p>
          </section>

          <div className="border-t border-border pt-8">
            <p className="text-xs text-muted-foreground text-center">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </motion.main>
    </div>
  );
}

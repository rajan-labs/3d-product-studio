import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

export default function Terms() {
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
          <h1 className="text-2xl font-display font-bold">Terms & Conditions</h1>
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
              This is a demonstration project. These terms are provided for educational purposes only. No real transactions or legal agreements are formed.
            </p>
          </div>

          {/* Sections */}
          <section>
            <h2 className="text-xl font-bold mb-4">1. Disclaimer of Liability</h2>
            <p className="text-muted-foreground mb-4">
              This is a demonstration website created for educational and portfolio purposes. All products, prices, and transactions are simulated. No real purchases or payments are processed.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">2. Demo Content</h2>
            <p className="text-muted-foreground mb-4">
              All content, including product information, images, prices, and user accounts, is fictional and used solely for demonstration. Any resemblance to real products or companies is coincidental.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">3. No Commercial Use</h2>
            <p className="text-muted-foreground mb-4">
              This application is not intended for commercial use. It is designed as a learning tool and portfolio project to demonstrate web development capabilities.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">4. Intellectual Property</h2>
            <p className="text-muted-foreground mb-4">
              This project is provided for educational purposes. You may use it as a reference for learning, but reproduction for commercial purposes is not permitted.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">5. Limitation of Use</h2>
            <p className="text-muted-foreground mb-4">
              Users acknowledge that this is a demonstration application and agree not to attempt to use it for any commercial or illegal purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">6. Changes to Terms</h2>
            <p className="text-muted-foreground mb-4">
              These terms may be updated at any time without notice. Continued use of the application constitutes acceptance of any changes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">7. Contact</h2>
            <p className="text-muted-foreground mb-4">
              For questions about these terms, please visit the Contact Us page.
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

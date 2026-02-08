import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, AlertTriangle } from 'lucide-react';

export default function Disclaimer() {
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
          <h1 className="text-2xl font-display font-bold">Disclaimer</h1>
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
          {/* Main Alert */}
          <div className="glass-panel p-6 rounded-xl border-2 border-destructive/50 bg-destructive/10">
            <div className="flex items-start gap-4">
              <AlertTriangle className="text-destructive flex-shrink-0 mt-1" size={24} />
              <div>
                <h2 className="text-lg font-bold mb-2">Important: Educational Demo Only</h2>
                <p className="text-sm text-muted-foreground">
                  This website is an educational and portfolio demonstration project. No real transactions, payments, or user data processing occurs.
                </p>
              </div>
            </div>
          </div>

          {/* Sections */}
          <section>
            <h2 className="text-xl font-bold mb-4">1. Simulated Environment</h2>
            <p className="text-muted-foreground">
              All functionality in this application, including:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-2 ml-2">
              <li>Product listings and descriptions</li>
              <li>Pricing and discounts</li>
              <li>Shopping cart operations</li>
              <li>Checkout and payment processes</li>
              <li>User accounts and authentication</li>
              <li>Order history and tracking</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              ...are purely simulated and use mock data only.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">2. No Real Transactions</h2>
            <p className="text-muted-foreground mb-4">
              This application does not process real payments. No money is charged, no transactions are recorded, and no payment information is collected or stored.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">3. No Data Collection</h2>
            <p className="text-muted-foreground mb-4">
              We do not collect, store, or process any personal information. All user interactions are temporary and local to your browser.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">4. Demo Authentication</h2>
            <p className="text-muted-foreground mb-4">
              The login/logout functionality is a demonstration feature. No real authentication system is in place. Any "logged-in" user is a simulated demo user.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">5. Product Information</h2>
            <p className="text-muted-foreground mb-4">
              All product information, images, descriptions, and specifications shown are fictional. Any resemblance to real products is coincidental.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">6. Third-Party Content</h2>
            <p className="text-muted-foreground mb-4">
              This application does not include any third-party payment systems, external APIs, or real e-commerce integrations.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">7. Educational Use</h2>
            <p className="text-muted-foreground mb-4">
              This project is created solely for:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-2 ml-2">
              <li>Learning and skill development</li>
              <li>Portfolio demonstration</li>
              <li>Showcasing development capabilities</li>
              <li>Educational reference</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">8. Limitation of Liability</h2>
            <p className="text-muted-foreground mb-4">
              This application is provided "as-is" for educational purposes. The creator disclaims all warranties and assumes no liability for any issues, damages, or misunderstandings arising from the use of this demo.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">9. Browser-Only Storage</h2>
            <p className="text-muted-foreground mb-4">
              Any data stored (theme preferences, cart contents, wishlist) is kept only in your browser's local storage and is never transmitted to any server.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">10. Acknowledgment</h2>
            <p className="text-muted-foreground mb-4">
              By using this application, you acknowledge and agree that this is a demonstration project and understand that no real commercial transactions occur.
            </p>
          </section>

          <div className="border-t border-border pt-8 space-y-4">
            <p className="text-xs text-muted-foreground text-center">
              Last updated: {new Date().toLocaleDateString()}
            </p>
            <p className="text-xs text-muted-foreground text-center bg-primary/5 p-3 rounded-lg">
              ✨ Thank you for exploring this educational demo project!
            </p>
          </div>
        </div>
      </motion.main>
    </div>
  );
}

import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, HelpCircle, Zap, ShoppingCart, Eye } from 'lucide-react';
import { useState } from 'react';

export default function Help() {
  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: 'Is this a real shopping website?',
      answer: 'No, this is an educational demo project. All products, prices, and transactions are simulated using mock data. No real purchases or payments are processed.'
    },
    {
      question: 'How do I add products to my cart?',
      answer: 'Click on a product in the sidebar to select it, customize it using the bottom bar (colors, variants), and click "Add to Cart" to add it to your shopping cart.'
    },
    {
      question: 'Can I compare products?',
      answer: 'Yes! Click the Compare button in the header after selecting a product. You can view products in a table or visual chart format.'
    },
    {
      question: 'How do I use the AR preview?',
      answer: 'Click the camera icon on the right side of the 3D viewer. Your browser will request camera access to overlay the product in your real environment.'
    },
    {
      question: 'What does the checkout do?',
      answer: 'The checkout is a simulated flow. You can fill out the form, but no real payment is processed. You\'ll see a success screen with a demo order number.'
    },
    {
      question: 'Where are my previous orders?',
      answer: 'Click the "Orders" icon in the header to view your order history. This stores data locally in your browser during this session.'
    },
    {
      question: 'How do I save my wishlist?',
      answer: 'Click the heart icon to add products to your wishlist. This is stored in your browser. Clear your cache to reset it.'
    },
    {
      question: 'What is the demo login?',
      answer: 'Click the menu icon to access the demo login. Any credentials will work as this is not real authentication—it\'s just for demonstration.'
    }
  ];

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
          <h1 className="text-2xl font-display font-bold">Help & Support</h1>
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
          {/* Quick Tips */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Getting Started</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <motion.div whileHover={{ y: -4 }} className="glass-panel p-6 rounded-xl space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                    <Eye className="text-primary" size={20} />
                  </div>
                  <h3 className="font-semibold">Explore 3D Viewer</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Use your mouse to rotate the 3D product. Scroll to zoom in/out. Click the view buttons to see different angles.
                </p>
              </motion.div>

              <motion.div whileHover={{ y: -4 }} className="glass-panel p-6 rounded-xl space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                    <ShoppingCart className="text-primary" size={20} />
                  </div>
                  <h3 className="font-semibold">Customize & Add to Cart</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Select colors and variants from the bottom bar, then click "Add to Cart" to build your shopping experience.
                </p>
              </motion.div>

              <motion.div whileHover={{ y: -4 }} className="glass-panel p-6 rounded-xl space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                    <HelpCircle className="text-primary" size={20} />
                  </div>
                  <h3 className="font-semibold">View Reviews & Ratings</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Click the rating badge near the product name to see customer reviews and ratings.
                </p>
              </motion.div>

              <motion.div whileHover={{ y: -4 }} className="glass-panel p-6 rounded-xl space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                    <Zap className="text-primary" size={20} />
                  </div>
                  <h3 className="font-semibold">Toggle Dark/Light Mode</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Click the sun/moon icon in the header to switch between light and dark themes.
                </p>
              </motion.div>
            </div>
          </section>

          {/* FAQ Section */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  className="glass-panel rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full p-4 text-left font-semibold hover:bg-secondary/50 transition-colors flex items-center justify-between"
                  >
                    {faq.question}
                    <motion.div
                      animate={{ rotate: expandedFaq === index ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      ▼
                    </motion.div>
                  </button>

                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: expandedFaq === index ? 'auto' : 0,
                      opacity: expandedFaq === index ? 1 : 0
                    }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden border-t border-border"
                  >
                    <p className="p-4 text-sm text-muted-foreground">{faq.answer}</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Important Note */}
          <div className="glass-panel p-6 rounded-xl border border-accent/30 bg-accent/5 space-y-3">
            <h3 className="font-semibold text-accent">🎓 Remember: This is a Demo</h3>
            <p className="text-sm text-muted-foreground">
              Everything in this application is simulated. No real data is collected, no transactions are processed, and no actual purchases occur. It's designed purely for learning and portfolio demonstration.
            </p>
          </div>

          <div className="border-t border-border pt-8">
            <p className="text-xs text-muted-foreground text-center">
              Have more questions? Visit our <button onClick={() => navigate('/contact')} className="text-primary hover:underline">Contact Us</button> page.
            </p>
          </div>
        </div>
      </motion.main>
    </div>
  );
}

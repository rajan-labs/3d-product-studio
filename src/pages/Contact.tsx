import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Mail, MessageSquare, Github, Linkedin } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

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
          <h1 className="text-2xl font-display font-bold">Contact Us</h1>
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
            <p className="text-sm text-accent font-medium mb-2">🎓 Educational Demo Project</p>
            <p className="text-sm text-muted-foreground">
              This is a demonstration project. The contact form is for demonstration purposes and does not send actual emails.
            </p>
          </div>

          {/* Contact Methods */}
          <section className="grid md:grid-cols-2 gap-6">
            <motion.div whileHover={{ y: -4 }} className="glass-panel p-6 rounded-xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Mail className="text-primary" size={20} />
                </div>
                <h3 className="font-semibold">Email</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                For inquiries about this project, contact us at:
              </p>
              <a href="mailto:demo@example.com" className="text-primary hover:underline text-sm">
                demo@example.com
              </a>
            </motion.div>

            <motion.div whileHover={{ y: -4 }} className="glass-panel p-6 rounded-xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                  <MessageSquare className="text-primary" size={20} />
                </div>
                <h3 className="font-semibold">Feedback</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                We'd love to hear your thoughts about this demo project.
              </p>
              <p className="text-xs text-muted-foreground">
                Use the form below to share your feedback.
              </p>
            </motion.div>
          </section>

          {/* Contact Form */}
          <section className="space-y-4">
            <h3 className="text-2xl font-bold">Send a Message</h3>
            <form onSubmit={handleSubmit} className="glass-panel p-6 rounded-xl space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Your name"
                  className="w-full px-4 py-2 bg-secondary/50 border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-2 bg-secondary/50 border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  placeholder="Your message here..."
                  rows={5}
                  className="w-full px-4 py-2 bg-secondary/50 border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 resize-none"
                  required
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Send Message
              </motion.button>

              {submitted && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-primary bg-primary/10 p-3 rounded-lg text-center"
                >
                  ✓ Demo form submitted successfully!
                </motion.p>
              )}
            </form>

            <p className="text-xs text-muted-foreground text-center">
              Note: This is a demonstration form. No actual message will be sent.
            </p>
          </section>

          {/* Social Links */}
          <section className="space-y-4">
            <h3 className="text-2xl font-bold">Connect</h3>
            <div className="flex gap-4 justify-center">
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 glass-panel rounded-lg hover:bg-secondary/50 transition-colors"
                aria-label="GitHub"
              >
                <Github size={24} className="text-primary" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 glass-panel rounded-lg hover:bg-secondary/50 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} className="text-primary" />
              </motion.a>
            </div>
          </section>

          <div className="border-t border-border pt-8">
            <p className="text-xs text-muted-foreground text-center">
              Thank you for your interest in this project!
            </p>
          </div>
        </div>
      </motion.main>
    </div>
  );
}

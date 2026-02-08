import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Code2, Zap, Target } from 'lucide-react';

export default function About() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Code2,
      title: 'Modern Stack',
      description: 'Built with React, Three.js, Tailwind CSS, and TypeScript'
    },
    {
      icon: Zap,
      title: 'Interactive 3D',
      description: 'Real-time 3D product viewer with smooth animations'
    },
    {
      icon: Target,
      title: 'Full-Featured',
      description: 'Shopping cart, comparisons, wishlist, and AR preview'
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
          <h1 className="text-2xl font-display font-bold">About This Project</h1>
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
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Hero Section */}
          <section className="text-center space-y-4">
            <h2 className="text-3xl font-display font-bold">
              Virtual Product <span className="glow-text">Studio</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              An interactive 3D product showcase and configurator built for learning and portfolio demonstration
            </p>
          </section>

          {/* Educational Notice */}
          <div className="glass-panel p-6 rounded-xl border border-accent/30 bg-accent/5">
            <p className="text-sm text-accent font-medium mb-2">🎓 Educational Demo Project</p>
            <p className="text-sm text-muted-foreground">
              This project showcases modern web development techniques in a realistic e-commerce context. All transactions, products, and user data are simulated using demo/mock data only.
            </p>
          </div>

          {/* Features Grid */}
          <section>
            <h3 className="text-2xl font-bold mb-6">Key Features</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    whileHover={{ y: -4 }}
                    className="glass-panel p-6 rounded-xl space-y-3"
                  >
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                      <Icon className="text-primary" size={24} />
                    </div>
                    <h4 className="font-semibold">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* Tech Stack */}
          <section className="space-y-4">
            <h3 className="text-2xl font-bold">Technology Stack</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="glass-panel p-6 rounded-xl space-y-3">
                <h4 className="font-semibold text-primary">Frontend</h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• React 18 with TypeScript</li>
                  <li>• Framer Motion for animations</li>
                  <li>• Tailwind CSS for styling</li>
                  <li>• shadcn/ui components</li>
                </ul>
              </div>
              <div className="glass-panel p-6 rounded-xl space-y-3">
                <h4 className="font-semibold text-primary">3D & Visualization</h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Three.js for 3D rendering</li>
                  <li>• React Three Fiber</li>
                  <li>• Recharts for data visualization</li>
                  <li>• AR Preview capability</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Purpose */}
          <section className="space-y-4">
            <h3 className="text-2xl font-bold">Project Purpose</h3>
            <p className="text-muted-foreground">
              This project was created to demonstrate:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">✓</span>
                <span>Modern React patterns and hooks</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">✓</span>
                <span>3D web graphics with Three.js</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">✓</span>
                <span>Responsive design and mobile optimization</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">✓</span>
                <span>State management and component architecture</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">✓</span>
                <span>UI/UX design principles and animations</span>
              </li>
            </ul>
          </section>

          <div className="border-t border-border pt-8">
            <p className="text-xs text-muted-foreground text-center">
              Ready to explore? Return to the main application and start exploring the interactive 3D viewer.
            </p>
          </div>
        </div>
      </motion.main>
    </div>
  );
}

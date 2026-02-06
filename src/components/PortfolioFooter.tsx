import { motion } from 'framer-motion';
import { Code2, Github, Linkedin, ExternalLink } from 'lucide-react';

export const PortfolioFooter = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
      className="fixed bottom-0 left-0 right-0 z-0 pb-20"
    >
      <div className="ml-0 lg:ml-72 flex justify-center">
        <div className="flex flex-col items-center gap-1 py-2 px-4">
          <div className="flex items-center gap-2 text-[10px] lg:text-xs text-muted-foreground/60">
            <Code2 size={12} />
            <span>Built for learning & portfolio demonstration</span>
          </div>
          <div className="flex items-center gap-3 text-muted-foreground/40">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
              aria-label="View on GitHub"
            >
              <Github size={14} />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
              aria-label="Connect on LinkedIn"
            >
              <Linkedin size={14} />
            </a>
            <span className="text-[9px] flex items-center gap-1">
              React + Three.js + Tailwind
              <ExternalLink size={10} />
            </span>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

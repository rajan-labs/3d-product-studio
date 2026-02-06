import { motion } from 'framer-motion';
import { Info, GraduationCap } from 'lucide-react';

export const DemoBanner = () => {
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, type: 'spring', stiffness: 100 }}
      className="fixed top-14 lg:top-16 left-0 right-0 z-[5] flex justify-center pointer-events-none"
    >
      <div className="mx-4 lg:ml-80 mt-2">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full backdrop-blur-sm">
          <GraduationCap size={14} className="text-amber-500" />
          <span className="text-[10px] lg:text-xs font-medium text-amber-600 dark:text-amber-400">
            Educational Demo — No real payments
          </span>
          <Info size={12} className="text-amber-500/60" />
        </div>
      </div>
    </motion.div>
  );
};

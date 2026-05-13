import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

const LUXURY_EASE = [0.22, 1, 0.36, 1];

export default function Loader({ onComplete, isLightTheme }: { onComplete: () => void, isLightTheme: boolean }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 4500);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 1;
      });
    }, 35);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [onComplete]);

  return (
    <motion.div
      exit={{ y: '-100%' }}
      transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
      className={`fixed inset-0 z-[1000] flex flex-col items-center justify-center p-8 overflow-hidden transition-colors duration-700 ${isLightTheme ? 'bg-paper text-charcoal' : 'bg-charcoal text-sand'}`}
    >
      <div className="noise absolute inset-0 opacity-10" />
      
      <div className="relative overflow-hidden mb-4">
        <motion.h2
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          transition={{ duration: 1.5, ease: LUXURY_EASE, delay: 0.5 }}
          className={`font-serif text-3xl md:text-8xl tracking-tighter italic text-center transition-colors duration-700 ${isLightTheme ? 'text-charcoal' : 'text-sand'}`}
        >
          Robasil <br className="md:hidden" /> Fashion Academy
        </motion.h2>
      </div>

      <div className="relative overflow-hidden h-4 flex items-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.8, y: 0 }}
          transition={{ duration: 1.2, delay: 1.5, ease: LUXURY_EASE }}
          className={`luxury-button flex items-center gap-4 ${isLightTheme ? 'text-charcoal' : 'text-sand'}`}
        >
          <span>Redefining</span>
          <span className={`w-8 h-[1px] transition-colors duration-700 ${isLightTheme ? 'bg-charcoal/40' : 'bg-sand/30'}`} />
          <span>Perspective</span>
        </motion.p>
      </div>

      <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end">
        <div className="space-y-1">
          <p className={`luxury-button transition-colors duration-700 ${isLightTheme ? 'text-charcoal opacity-40' : 'text-sand opacity-20'}`} style={{ fontSize: '7px' }}>Initialization</p>
          <div className={`w-32 h-[1px] relative transition-colors duration-700 ${isLightTheme ? 'bg-charcoal/20' : 'bg-sand/10'}`}>
            <motion.div 
              style={{ width: `${progress}%` }}
              className={`absolute top-0 left-0 h-full transition-colors duration-700 ${isLightTheme ? 'bg-charcoal' : 'bg-sand/40'}`}
            />
          </div>
        </div>
        <span className={`luxury-button tabular-nums transition-colors duration-700 ${isLightTheme ? 'text-charcoal opacity-60' : 'text-sand opacity-20'}`}>
          {progress.toString().padStart(3, '0')}%
        </span>
      </div>

      {/* Decorative cinematic lines */}
      <motion.div 
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 2, ease: LUXURY_EASE }}
        className={`absolute top-1/2 left-0 w-full h-[1px] -translate-y-1/2 transition-colors duration-700 ${isLightTheme ? 'bg-charcoal/5' : 'bg-sand/5'}`}
      />
    </motion.div>
  );
}

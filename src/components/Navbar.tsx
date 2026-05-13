import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const LUXURY_EASE = [0.22, 1, 0.36, 1];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Home', href: '#' },
    { name: 'Courses', href: '#programs' },
    { name: 'Gallery', href: '#archive' },
    { name: 'Student Work', href: '#transformation' },
    { name: 'Contact', href: '#connect' }
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 p-6 md:p-8 flex justify-between items-center transition-all duration-1000 ${scrolled ? 'bg-charcoal/20 backdrop-blur-md' : 'bg-transparent'}`}>
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, ease: LUXURY_EASE }}
          className="pointer-events-auto"
        >
          <a href="#" className="font-serif text-lg tracking-tighter hover:italic transition-all">Robasil Fashion Academy</a>
          <span className="ml-4 font-mono text-[8px] tracking-[0.3em] uppercase opacity-40 hidden md:inline">
            // Fshn.Acdmy.Lagos
          </span>
        </motion.div>

        <div className="flex items-center gap-8 pointer-events-auto relative z-[70]">
          <motion.button 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="hidden md:block luxury-button opacity-60 hover:opacity-100 transition-opacity active:scale-95"
          >
            Inquire via WhatsApp
          </motion.button>
          
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, ease: LUXURY_EASE, delay: 0.2 }}
            className="group flex flex-col items-end gap-1.5 p-2 -mr-2"
            aria-label="Toggle Menu"
          >
            <div className={`h-[1px] bg-sand transition-all duration-700 ease-[0.22,1,0.36,1] ${isOpen ? 'w-8 rotate-45 translate-y-[2px] bg-sand' : 'w-8 group-hover:w-12 bg-sand'}`} />
            <div className={`h-[1px] bg-sand transition-all duration-700 ease-[0.22,1,0.36,1] ${isOpen ? 'w-8 -rotate-45 -translate-y-[2px] bg-sand' : 'w-4 group-hover:w-8 bg-sand'}`} />
          </motion.button>
        </div>
      </nav>

      <motion.div
        initial={false}
        animate={{ 
          clipPath: isOpen ? 'circle(150% at 100% 0%)' : 'circle(0% at 100% 0%)',
          pointerEvents: isOpen ? 'auto' : 'none'
        }}
        transition={{ duration: 1.2, ease: LUXURY_EASE }}
        className="fixed inset-0 z-[60] bg-charcoal flex flex-col p-8 md:p-24 overflow-y-auto"
      >
        <div className="noise absolute inset-0 opacity-10 pointer-events-none" />
        
        <div className="relative z-10 grid md:grid-cols-2 min-h-full">
          <div className="flex flex-col justify-center space-y-6 md:space-y-8 py-20 md:py-0">
            {menuItems.map((item, i) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, y: 30 }}
                animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 1, delay: i * 0.1 + 0.5, ease: LUXURY_EASE }}
                onClick={() => setIsOpen(false)}
                className="group flex items-baseline gap-4"
              >
                <span className="luxury-button opacity-20 group-hover:opacity-100 transition-opacity">0{i+1}</span>
                <span className="font-serif text-4xl md:text-8xl hover:italic transition-all duration-700 tracking-tighter">
                  {item.name}
                </span>
              </motion.a>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={isOpen ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1, delay: 1, ease: LUXURY_EASE }}
            className="flex flex-col justify-end items-start md:items-end space-y-8 md:space-y-12 pb-12 mt-12 md:mt-0"
          >
            <div className="text-left md:text-right space-y-2 max-w-xs">
              <p className="luxury-button opacity-40">Locations</p>
              <p className="font-serif text-lg md:text-xl">Lagos, Nigeria</p>
              <p className="font-serif text-lg md:text-xl">Online Academy</p>
            </div>
            <div className="text-left md:text-right space-y-2 max-w-xs">
              <p className="luxury-button opacity-40">Contact</p>
              <p className="font-serif text-base md:text-lg">admissions@robasil.com</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}

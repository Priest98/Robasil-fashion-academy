import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Loader from './components/Loader';
import SmoothScroll from './components/SmoothScroll';
import { LayoutGrid, ChevronRight, Play, Award, Users, BookOpen, Clock, AlertCircle } from 'lucide-react';
import heroImage from '../IMAGE/hero.jpg';
import academyVideo from '../video/academy.mp4';
import student1 from '../IMAGE/students work/SaveClip.App_495022764_1304911697869627_6302187199161604264_n.jpg';
import student2 from '../IMAGE/students work/SaveClip.App_499450015_1304911637869633_8447192451961942038_n.jpg';
import student3 from '../IMAGE/students work/SaveClip.App_623669669_17956548834059332_8869314943268278877_n.jpg';
import student4 from '../IMAGE/students work/SaveClip.App_624242143_17956548816059332_600239039465246950_n.jpg';

const LUXURY_EASE = [0.22, 1, 0.36, 1];

const TextReveal = ({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) => {
  const words = text.split(' ');
  return (
    <div className={`overflow-hidden flex flex-wrap justify-center text-center ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ y: '100%', opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{
            duration: 1.2,
            delay: delay + (i * 0.05),
            ease: LUXURY_EASE
          }}
          className="inline-block mr-[0.2em] last:mr-0 py-1"
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
};

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeProgram, setActiveProgram] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLightTheme, setIsLightTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'light';
    }
    return false;
  });
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isLightTheme) {
      root.classList.add('light');
      localStorage.setItem('theme', 'light');
    } else {
      root.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    }
  }, [isLightTheme]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Lock scroll during loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isLoading]);

  const programs = [
    {
      id: '01',
      title: 'Haute Couture Tailoring',
      duration: '9 Months',
      description: 'The foundation of mastery. From foundational pattern drafting to advanced bespoke finishing.',
      image: student1
    },
    {
      id: '02',
      title: 'Creative Direction',
      duration: '4 Months',
      description: 'Building the visual language of a brand. Exploring editorial styling, collection architecture, and visual storytelling.',
      image: student2
    },
    {
      id: '03',
      title: 'The Digital Designer',
      duration: '3 Months',
      description: 'The future of fashion. Specialized training in Clo3D, tech-packs, and global manufacturing systems.',
      image: student3
    }
  ];

  const stats = [
    { label: 'Graduates', value: '150+', icon: <Users size={16} /> },
    { label: 'Course Credits', value: '450h', icon: <BookOpen size={16} /> },
    { label: 'Industry Partners', value: '12', icon: <Award size={16} /> }
  ];

  const faqs = [
    { q: "Do I need prior experience?", a: "No. Our foundational programs are designed to take seekers from zero to professional proficiency through a rigorous, hands-on curriculum." },
    { q: "Is there a weekend track?", a: "Yes. We offer an Executive Weekend Intensive for professionals transitioning into the fashion industry." },
    { q: "Is the certification recognized?", a: "Robasil Fashion Academy is a registered institution in Lagos. More importantly, your portfolio will carry the weight of industry-standard excellence." }
  ];

  return (
    <main ref={containerRef} className={`relative w-full transition-colors duration-700 ${isLightTheme ? 'bg-paper text-charcoal' : 'bg-charcoal text-sand'}`}>
      <SmoothScroll />
      <AnimatePresence mode="wait">
        {isLoading && <Loader onComplete={() => setIsLoading(false)} isLightTheme={isLightTheme} />}
      </AnimatePresence>

      <div className="noise fixed inset-0 z-[100]" />
      <CustomCursor isLightTheme={isLightTheme} />
      <Navbar 
        isOpen={isMenuOpen} 
        setIsOpen={setIsMenuOpen} 
        isLightTheme={isLightTheme}
        toggleTheme={() => setIsLightTheme(!isLightTheme)}
      />

      {/* Hero Section - The Mysterious Entrance */}
      <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 4, ease: LUXURY_EASE, delay: isLoading ? 0 : 4.5 }}
          className={`absolute inset-0 z-0 transition-colors duration-1000 ${isLightTheme ? 'bg-[#DCD9D0]' : 'bg-black'}`}
        >
          <img 
            src={heroImage} 
            alt="Robasil Fashion Academy Atmosphere" 
            className={`w-full h-full object-cover transition-all duration-1000 ${isLightTheme ? 'opacity-70 brightness-[0.4] contrast-[0.8] grayscale-[0.2]' : 'opacity-50 contrast-125'}`}
            referrerPolicy="no-referrer"
            loading="lazy"
          />
          <div className={`absolute inset-0 bg-gradient-to-b transition-colors duration-1000 ${isLightTheme ? 'from-transparent via-[#DCD9D0]/40 to-[#DCD9D0]' : 'from-charcoal/0 via-charcoal/40 to-charcoal'}`} />
        </motion.div>

        <div className="relative z-10 text-center px-6 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, letterSpacing: '1em', y: 10 }}
            animate={{ opacity: 1, letterSpacing: '0.4em', y: 0 }}
            transition={{ duration: 3, ease: LUXURY_EASE, delay: isLoading ? 0 : 5 }}
            className="font-mono text-[8px] md:text-[10px] uppercase opacity-40 mb-6 md:mb-8"
          >
            Elite Education for the Modern Designer
          </motion.div>
          
          <TextReveal 
            text="Master the Profound." 
            className={`hero-headline text-5xl md:text-7xl lg:text-[9vw] leading-[1.1] md:leading-[0.9] ${isLightTheme ? 'text-charcoal' : 'text-sand'}`}
            delay={isLoading ? 0 : 5.5}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: isLoading ? 0 : 7, duration: 1.5, ease: LUXURY_EASE }}
            className="mt-10 md:mt-12 flex justify-center"
          >
            <button className={`group relative px-10 md:px-12 py-5 md:py-6 overflow-hidden luxury-button text-[10px] md:text-[11px] transition-all active:scale-95 hover:scale-[1.02] min-h-[52px] ${isLightTheme ? 'border-charcoal/20 hover:border-charcoal' : 'border-sand/20 hover:border-sand'}`}>
              <div className={`absolute inset-0 border transition-colors duration-700 ${isLightTheme ? 'border-charcoal/20 group-hover:border-charcoal' : 'border-sand/20 group-hover:border-sand'}`} />
              <motion.div 
                className={`absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ${isLightTheme ? 'bg-charcoal/10' : 'bg-sand/10'}`}
              />
              <span className="relative z-10">Enter the Archive</span>
            </button>
          </motion.div>
        </div>

        <motion.div 
          className="absolute bottom-8 md:bottom-12 left-6 right-6 md:right-12 flex flex-row items-center justify-center md:justify-end gap-6 md:gap-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: isLoading ? 0 : 7.5, duration: 2, ease: LUXURY_EASE }}
        >
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center md:items-end">
              <span className="font-serif text-xl md:text-3xl italic">{stat.value}</span>
              <span className="luxury-button opacity-40 text-[7px] md:text-[10px]">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Philosophy - Atmosphere First */}
      <section id="the-academy" className={`relative min-h-[70vh] flex flex-col items-center justify-center px-6 md:px-24 py-24 md:py-48 transition-colors duration-700 ${isLightTheme ? 'bg-paper' : 'bg-charcoal'}`}>
        <div className="max-w-7xl mx-auto text-center space-y-8 md:space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: LUXURY_EASE }}
            className="flex flex-col items-center"
          >
            <h3 className="font-serif text-4xl md:text-7xl tracking-tighter leading-tight mb-6 md:mb-8">
              Where intent <br /> meets the <span className="italic">needle.</span>
            </h3>
            <p className={`font-light text-lg md:text-xl leading-relaxed max-w-lg editorial-body transition-colors duration-700 ${isLightTheme ? 'text-charcoal/70' : 'text-sand/60'}`}>
              Robasil Fashion Academy is not a school. It is an industry-leading transformational space in Victoria Island, Lagos. We cultivate the elite designers of tomorrow through rigorous craftsmanship and avant-garde thinking.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 1.5, ease: LUXURY_EASE }}
            className={`flex flex-col sm:flex-row items-center gap-8 md:gap-12 pt-8 border-t transition-colors duration-700 text-center sm:text-left ${isLightTheme ? 'border-charcoal/10' : 'border-sand/10'}`}
          >
            <div className="space-y-1">
              <p className="font-serif text-lg italic">Founded 2024</p>
              <p className="luxury-button opacity-40 text-[8px]">A Perspective Shift</p>
            </div>
            <div className={`hidden sm:block h-12 w-[1px] transition-colors duration-700 ${isLightTheme ? 'bg-charcoal/10' : 'bg-sand/10'}`} />
            <div className="space-y-1">
              <p className="font-serif text-lg italic">Industry-First</p>
              <p className="luxury-button opacity-40 text-[8px]">Curriculum Excellence</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="programs" className={`relative py-24 md:py-48 transition-colors duration-700 ${isLightTheme ? 'bg-[#F2F0E9]' : 'bg-charcoal'} px-6 md:px-24 overflow-hidden`}>
        <div className="max-w-7xl mx-auto">
          {/* Carousel Header Section */}
          <div className="relative mb-16 md:mb-24">
            <div className="flex justify-between items-end pb-2">
              <h2 className={`font-sans font-light text-[10px] md:text-xs uppercase tracking-[0.3em] transition-colors duration-700 ${isLightTheme ? 'text-charcoal/80' : 'text-sand/80'}`}>Curricula</h2>
              <div className={`font-sans font-light text-[10px] md:text-xs transition-colors duration-700 ${isLightTheme ? 'text-charcoal/40' : 'text-sand/40'}`}>
                0{activeProgram + 1} / 0{programs.length}
              </div>
            </div>
            <div className={`h-[1px] w-full transition-colors duration-700 ${isLightTheme ? 'bg-charcoal/10' : 'bg-sand/10'}`} />
          </div>

          {/* Carousel Content */}
          <div className="relative h-[60vh] md:h-[65vh] flex items-center justify-center">
            <div className="relative w-full h-full flex items-center justify-center">
              <AnimatePresence mode="popLayout">
                {programs.map((program, i) => {
                  const offset = i - activeProgram;
                  const isActive = i === activeProgram;
                  const isVisible = Math.abs(offset) <= 1;

                  if (!isVisible) return null;

                  return (
                    <motion.div
                      key={program.id}
                      initial={false}
                      animate={{
                        x: `${offset * (window.innerWidth < 768 ? 90 : 100)}%`,
                        scale: isActive ? 1 : 0.8,
                        opacity: isActive ? 1 : 0.5,
                        zIndex: isActive ? 10 : 0,
                      }}
                      transition={{
                        duration: 0.8,
                        ease: [0.22, 1, 0.36, 1]
                      }}
                      className={`absolute w-[70vw] md:w-[30vw] aspect-[4/5] rounded-[30px] overflow-hidden cursor-pointer ${isActive ? 'shadow-2xl shadow-black/40' : ''}`}
                      onClick={() => setActiveProgram(i)}
                    >
                      <img 
                        src={program.image} 
                        alt={program.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-60" />
                      <div className="absolute bottom-12 left-0 w-full text-center px-6">
                        <motion.h4 
                          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 10 }}
                          className="text-sand font-sans font-light text-xl md:text-2xl uppercase tracking-[0.2em] mix-blend-soft-light"
                        >
                          Track {program.id}
                        </motion.h4>
                        <motion.p 
                          animate={{ opacity: isActive ? 0.6 : 0 }}
                          className="text-sand/60 font-sans text-[10px] md:text-xs uppercase tracking-widest mt-2"
                        >
                          {program.title}
                        </motion.p>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Navigation Arrows */}
            <button 
              onClick={() => setActiveProgram((p) => (p - 1 + programs.length) % programs.length)}
              className={`absolute left-0 md:left-4 z-20 w-12 h-12 md:w-16 md:h-16 rounded-full backdrop-blur-md border flex items-center justify-center transition-all group ${isLightTheme ? 'bg-charcoal/10 border-charcoal/10 hover:bg-charcoal/20' : 'bg-sand/10 border-sand/10 hover:bg-sand/20'}`}
            >
              <ChevronRight className={`rotate-180 transition-transform ${isLightTheme ? 'text-charcoal' : 'text-sand'} group-hover:scale-110`} size={24} strokeWidth={1} />
            </button>
            <button 
              onClick={() => setActiveProgram((p) => (p + 1) % programs.length)}
              className={`absolute right-0 md:right-4 z-20 w-12 h-12 md:w-16 md:h-16 rounded-full backdrop-blur-md border flex items-center justify-center transition-all group ${isLightTheme ? 'bg-charcoal/10 border-charcoal/10 hover:bg-charcoal/20' : 'bg-sand/10 border-sand/10 hover:bg-sand/20'}`}
            >
              <ChevronRight className={`transition-transform ${isLightTheme ? 'text-charcoal' : 'text-sand'} group-hover:scale-110`} size={24} strokeWidth={1} />
            </button>
          </div>

          {/* Pill Pagination Indicator */}
          <div className="mt-16 md:mt-24 flex justify-center gap-3">
            {programs.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveProgram(i)}
                className={`h-[2px] transition-all duration-700 ${i === activeProgram ? (isLightTheme ? 'w-12 bg-charcoal' : 'w-12 bg-sand') : (isLightTheme ? 'w-6 bg-charcoal/10' : 'w-6 bg-sand/20')}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Transformation - Before & After Perspective */}
      <section id="transformation" className={`py-24 md:py-48 px-6 md:px-24 transition-colors duration-700 ${isLightTheme ? 'bg-paper' : 'bg-charcoal'}`}>
        <div className="max-w-7xl mx-auto space-y-16 md:space-y-32">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.5, ease: LUXURY_EASE }}
            className="text-center max-w-3xl mx-auto space-y-6 md:space-y-8"
          >
            <h2 className={`font-serif text-4xl md:text-7xl tracking-tighter italic transition-colors duration-700 ${isLightTheme ? 'text-charcoal' : 'text-sand'}`}>From Seeker <br className="hidden md:block" /> to Sculptor.</h2>
            <p className={`luxury-button leading-loose text-[9px] md:text-[11px] transition-colors duration-700 ${isLightTheme ? 'text-charcoal/40' : 'text-sand/40'}`}>
              The transformation is not just in the clothes, <br/> it is in the creative identity of the student.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: LUXURY_EASE }}
            className={`relative p-3 md:p-5 rounded-[3.5rem] shadow-3xl overflow-hidden border transition-colors duration-700 ${isLightTheme ? 'bg-charcoal/5 border-charcoal/5' : 'bg-black/40 border-sand/5'}`}
          >
            <div className={`grid md:grid-cols-2 gap-px rounded-[2.8rem] overflow-hidden transition-colors duration-700 ${isLightTheme ? 'bg-charcoal/10' : 'bg-sand/5'}`}>
              <div 
                className={`relative p-8 md:p-24 flex flex-col justify-center space-y-8 md:space-y-12 transition-colors duration-700 ${isLightTheme ? 'bg-paper' : 'bg-charcoal'}`}
              >
                <span className={`luxury-button opacity-20 transition-colors duration-700 ${isLightTheme ? 'text-charcoal' : 'text-sand'}`}>The Beginning</span>
                <p className={`font-serif text-2xl md:text-3xl italic leading-tight transition-colors duration-700 ${isLightTheme ? 'text-charcoal/80' : 'text-sand/80'}`}>
                  "I had the passion, but I lacked the structural language. Robasil Fashion Academy taught me to speak through silhouettes."
                </p>
                <div className="space-y-1 pt-4 md:pt-8">
                  <p className={`luxury-button transition-colors duration-700 ${isLightTheme ? 'text-charcoal' : 'text-sand'}`}>Omotara A.</p>
                  <p className={`font-serif text-sm italic opacity-40 transition-colors duration-700 ${isLightTheme ? 'text-charcoal' : 'text-sand'}`}>Class of '24 / Now Creative Director at ATARA</p>
                </div>
              </div>
              <div 
                className="relative aspect-square md:aspect-auto overflow-hidden bg-clay"
              >
                <motion.img 
                  initial={{ scale: 1.1 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 8, ease: LUXURY_EASE }}
                  src={student4} 
                  alt="Student Transformation" 
                  className="w-full h-full object-cover opacity-80"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Admissions & FAQ - The Conversion Anchor */}
      <section id="connect" className={`py-24 md:py-48 px-6 md:px-24 transition-colors duration-700 ${isLightTheme ? 'bg-[#F2F0E9]' : 'bg-charcoal'}`}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 md:gap-32">
          <div className="space-y-12 md:space-y-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: LUXURY_EASE }}
            >
              <h2 className={`font-serif text-4xl md:text-7xl tracking-tighter italic mb-8 transition-colors duration-700 ${isLightTheme ? 'text-charcoal' : 'text-sand'}`}>Join the <br /> Vanguard.</h2>
              <p className={`font-light text-lg md:text-xl transition-colors duration-700 ${isLightTheme ? 'text-charcoal/60' : 'text-sand/40'}`}>
                Admissions for the June intake are now open. Start your journey into the profound.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 1.5, ease: LUXURY_EASE }}
              className="flex flex-col gap-4 md:gap-6"
            >
              <button className={`w-full px-12 py-6 md:py-6 transition-all duration-500 shadow-2xl min-h-[60px] flex items-center justify-center active:scale-[0.98] luxury-button ${isLightTheme ? 'bg-charcoal text-paper hover:bg-black' : 'bg-sand text-charcoal hover:bg-white'}`}>
                Apply for June Intake
              </button>
              <button className={`w-full px-12 py-6 md:py-6 border transition-all duration-500 min-h-[60px] flex items-center justify-center active:scale-[0.98] luxury-button ${isLightTheme ? 'border-charcoal/20 text-charcoal hover:bg-charcoal/5' : 'border-sand/20 text-sand hover:bg-sand/10'}`}>
                Book Studio Walkthrough
              </button>
            </motion.div>

            <div className={`pt-8 md:pt-12 flex items-center gap-8 opacity-40 justify-center lg:justify-start transition-colors duration-700 ${isLightTheme ? 'text-charcoal' : 'text-sand'}`}>
              <div className={`hidden lg:block h-[1px] flex-1 font-mono transition-colors duration-700 ${isLightTheme ? 'bg-charcoal' : 'bg-sand'}`} />
              <div className="flex gap-6">
                <a href="#" className="luxury-button hover:opacity-100 transition-opacity p-2 text-sm">IG</a>
                <a href="#" className="luxury-button hover:opacity-100 transition-opacity p-2 text-sm">WA</a>
                <a href="#" className="luxury-button hover:opacity-100 transition-opacity p-2 text-sm">IN</a>
              </div>
            </div>
          </div>

          <div className="space-y-12">
            <h3 className={`luxury-button opacity-40 transition-colors duration-700 ${isLightTheme ? 'text-charcoal' : 'text-sand'}`}>FAQ Archive</h3>
            <div className={`space-y-8 md:space-y-12 divide-y transition-colors duration-700 ${isLightTheme ? 'divide-charcoal/10' : 'divide-sand/10'}`}>
              {faqs.map((faq, i) => (
                <div key={i} className={`pt-8 md:pt-12 first:pt-0`}>
                  <p className={`font-serif text-xl md:text-2xl mb-4 transition-colors duration-700 ${isLightTheme ? 'text-charcoal' : 'text-sand'}`}>{faq.q}</p>
                  <p className={`font-light leading-relaxed transition-colors duration-700 ${isLightTheme ? 'text-charcoal/60' : 'text-sand/40'}`}>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <footer className={`mt-24 md:mt-48 pt-12 border-t transition-colors duration-700 flex flex-col md:flex-row justify-between items-center gap-10 md:gap-8 opacity-40 text-center md:text-left pb-12 ${isLightTheme ? 'border-charcoal/10 text-charcoal' : 'border-sand/10 text-sand'}`}>
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-4">
            <span className="font-serif text-base md:text-sm">Robasil Fashion Academy</span>
            <span className={`hidden md:block h-4 w-px transition-colors duration-700 ${isLightTheme ? 'bg-charcoal/20' : 'bg-sand/20'}`} />
            <span className="luxury-button text-[10px] md:text-[11px]">Victoria Island, Lagos</span>
          </div>
          <p className="luxury-button text-[10px] md:text-[11px]">
            &copy; 2024 / Redefining the Editorial Mindset.
          </p>
        </footer>
      </section>
    </main>
  );
}


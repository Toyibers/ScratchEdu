import { motion } from 'motion/react';
import { Rocket, ExternalLink, Star, Sparkles, Code2, MousePointer2 } from 'lucide-react';
import { useModules } from '../context/ModuleContext';

interface HeroBannerProps {
  moduleCount: number;
}

export default function HeroBanner({ moduleCount }: HeroBannerProps) {
  const { bannerImage } = useModules();

  const floatingIcons = [
    { Icon: Star, color: 'text-yellow-300', size: 24, top: '10%', left: '5%', delay: 0 },
    { Icon: Sparkles, color: 'text-sky-200', size: 32, top: '20%', right: '10%', delay: 1 },
    { Icon: Code2, color: 'text-white/40', size: 40, bottom: '15%', left: '15%', delay: 0.5 },
    { Icon: MousePointer2, color: 'text-white/30', size: 28, bottom: '25%', right: '20%', delay: 1.5 },
  ];

  return (
    <section className="relative overflow-hidden pt-12 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 bg-gradient-to-br from-sky-400 to-sky-600 rounded-[2rem] p-8 md:p-16 text-white shadow-2xl overflow-hidden"
        >
          {/* Floating Elements */}
          {floatingIcons.map((item, index) => (
            <motion.div
              key={index}
              className={`absolute ${item.color} pointer-events-none hidden md:block`}
              style={{ top: item.top, left: item.left, right: item.right, bottom: item.bottom }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: item.delay,
                ease: "easeInOut"
              }}
            >
              <item.Icon size={item.size} />
            </motion.div>
          ))}

          {/* Decorative circles */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-sky-300/20 rounded-full blur-2xl" />

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-sm font-medium"
              >
                <motion.div
                  animate={{ rotate: [0, 20, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Rocket size={16} />
                </motion.div>
                <span>Platform Belajar Scratch Terbaik</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-6xl font-extrabold leading-tight"
              >
                {moduleCount} Modul Programming <br />
                <span className="text-sky-200">Scratch 3.0</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-lg text-sky-50 max-w-lg"
              >
                Belajar coding dengan cara menyenangkan melalui game interaktif. 
                Kuasai logika pemrograman sejak dini dengan Scratch!
              </motion.p>

              <div className="flex flex-wrap gap-4 pt-4">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => document.getElementById('modules')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 bg-white text-sky-600 rounded-2xl font-bold transition-all shadow-lg hover:shadow-xl"
                >
                  Mulai Belajar Sekarang
                </motion.button>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://scratch.mit.edu/projects/editor/?tutorial=getStarted"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 border-2 border-white/50 hover:border-white rounded-2xl font-bold flex items-center gap-2 transition-all"
                >
                  Buka Scratch Online
                  <ExternalLink size={18} />
                </motion.a>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 3 }}
              transition={{ delay: 0.4, type: 'spring', stiffness: 100 }}
              className="hidden md:block relative group"
            >
              <div className="absolute inset-0 bg-white/20 blur-2xl rounded-full group-hover:bg-white/30 transition-colors" />
              <img
                src={bannerImage}
                alt="Learning Illustration"
                className="relative z-10 rounded-3xl shadow-2xl hover:rotate-0 transition-transform duration-500 w-full aspect-[4/3] object-cover border-4 border-white/20"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

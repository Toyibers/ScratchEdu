import { Link } from 'react-router-dom';
import { Lock, Unlock, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Module } from '../context/ModuleContext';
import { cn } from '../lib/utils';

interface ModuleCardProps {
  module: Module;
}

export default function ModuleCard({ module }: ModuleCardProps) {
  const levelColors = {
    Beginner: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
    Medium: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
    Advance: 'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400',
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -8 }}
      className="group bg-white dark:bg-gray-800 rounded-[2rem] overflow-hidden border border-sky-50 dark:border-gray-700 shadow-md hover:shadow-2xl transition-all duration-300"
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={module.thumbnail}
          alt={module.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4">
          <span className={cn("px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider", levelColors[module.level])}>
            {module.level}
          </span>
        </div>
        {module.isLocked && (
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-[2px] flex items-center justify-center">
            <div className="bg-white/20 backdrop-blur-md p-4 rounded-full">
              <Lock className="text-white" size={32} />
            </div>
          </div>
        )}
      </div>

      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold text-xl text-gray-900 dark:text-white line-clamp-1">
            {module.title}
          </h3>
          {module.isLocked ? (
            <Lock className="text-rose-500 shrink-0" size={20} />
          ) : (
            <Unlock className="text-emerald-500 shrink-0" size={20} />
          )}
        </div>

        <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2">
          {module.description}
        </p>

        <div className="pt-2">
          {module.isLocked ? (
            <button
              disabled
              className="w-full py-3 px-4 bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 rounded-xl font-bold cursor-not-allowed flex items-center justify-center gap-2"
            >
              Modul Terkunci
            </button>
          ) : (
            <Link
              to={`/module/${module.id}`}
              className="w-full py-3 px-4 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors group/btn"
            >
              Pelajari Sekarang
              <ChevronRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}

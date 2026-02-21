import { 
  BookOpen, 
  Unlock, 
  Lock, 
  FileText, 
  Archive, 
  Image as ImageIcon 
} from 'lucide-react';
import { motion } from 'motion/react';
import { useModules } from '../context/ModuleContext';

export default function DashboardStats() {
  const { modules } = useModules();
  
  const total = modules.length;
  const unlocked = modules.filter(m => !m.isLocked).length;
  const locked = total - unlocked;

  const stats = [
    { label: 'Jumlah Modul', value: total, icon: BookOpen, color: 'sky' },
    { label: 'Modul Terbuka', value: unlocked, icon: Unlock, color: 'emerald' },
    { label: 'Modul Terkunci', value: locked, icon: Lock, color: 'rose' },
  ];

  const details = [
    { label: 'Jumlah PDF', value: total, icon: FileText, color: 'text-rose-500' },
    { label: 'Jumlah Aset ZIP', value: total, icon: Archive, color: 'text-amber-500' },
    { label: 'Jumlah Thumbnail', value: total, icon: ImageIcon, color: 'text-sky-500' },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-6 hover:shadow-md transition-shadow"
          >
            <div className={`p-4 rounded-2xl bg-${stat.color}-100 dark:bg-${stat.color}-900/30 text-${stat.color}-600 dark:text-${stat.color}-400`}>
              <stat.icon size={32} />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {details.map((detail, i) => (
          <div
            key={detail.label}
            className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <detail.icon className={detail.color} size={20} />
              <span className="text-sm text-gray-600 dark:text-gray-300">{detail.label}</span>
            </div>
            <span className="font-bold text-gray-900 dark:text-white">{detail.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

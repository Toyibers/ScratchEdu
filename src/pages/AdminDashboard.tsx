import { motion } from 'motion/react';
import DashboardStats from '../components/DashboardStats';
import ChartModule from '../components/ChartModule';
import { useAuth } from '../context/AuthContext';

export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div className="p-8 space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Halo, {user?.username}! 👋
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Berikut adalah ringkasan statistik platform pembelajaran Anda hari ini.
          </p>
        </div>
        <div className="px-6 py-3 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex items-center gap-3">
          <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-sm font-bold text-gray-700 dark:text-gray-300">Sistem Online</span>
        </div>
      </header>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <DashboardStats />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ChartModule />
          
          <div className="bg-white dark:bg-gray-800 p-8 rounded-[2rem] border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col justify-center items-center text-center space-y-4">
            <div className="w-24 h-24 bg-sky-100 dark:bg-sky-900/30 rounded-full flex items-center justify-center text-sky-500">
              <img 
                src={user?.profilePic || "https://picsum.photos/seed/admin/200"} 
                alt="Admin" 
                className="w-20 h-20 rounded-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{user?.username || 'Admin Utama'}</h3>
              <p className="text-gray-500 dark:text-gray-400">Level Akses: Super Administrator</p>
            </div>
            <div className="w-full pt-4 border-t border-gray-100 dark:border-gray-700 grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl">
                <p className="text-xs text-gray-500 uppercase font-bold">Lokasi</p>
                <p className="font-bold text-gray-900 dark:text-white">Jawa Timur</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl">
                <p className="text-xs text-gray-500 uppercase font-bold">Terakhir Login</p>
                <p className="font-bold text-gray-900 dark:text-white">Hari Ini</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

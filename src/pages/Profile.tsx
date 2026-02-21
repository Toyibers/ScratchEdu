import { useState, useRef, FormEvent, ChangeEvent } from 'react';
import { User, Mail, MapPin, Shield, Save, Key, Image as ImageIcon, Upload } from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { useModules } from '../context/ModuleContext';

export default function Profile() {
  const { user, updateUser } = useAuth();
  const { bannerImage, updateBannerImage } = useModules();
  const bannerInputRef = useRef<HTMLInputElement>(null);
  const profilePicInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    username: user?.username || 'admin',
    email: 'mochtoyib@scratchedu.com',
    address: 'Jawa Timur, Indonesia',
    newPassword: '',
    confirmPassword: '',
  });
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    updateUser({ username: formData.username });
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  const handleBannerChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateBannerImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfilePicChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateUser({ profilePic: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-8">
      <header>
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white">Profil Admin</h1>
        <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">Kelola informasi akun dan keamanan Anda.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-[2rem] border border-gray-100 dark:border-gray-700 shadow-sm text-center">
            <div className="relative inline-block group cursor-pointer" onClick={() => profilePicInputRef.current?.click()}>
              <img
                src={user?.profilePic || "https://picsum.photos/seed/admin/200"}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover ring-4 ring-sky-500 ring-offset-4 dark:ring-offset-gray-800 group-hover:opacity-75 transition-opacity"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-0 right-0 p-2 bg-sky-500 text-white rounded-full shadow-lg">
                <Upload size={16} />
              </div>
              <input
                ref={profilePicInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleProfilePicChange}
              />
            </div>
            <div className="mt-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{formData.username}</h3>
              <p className="text-sm text-sky-500 font-bold uppercase tracking-wider mt-1">Administrator</p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-[2rem] border border-gray-100 dark:border-gray-700 shadow-sm space-y-4">
            <h4 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <ImageIcon size={18} /> Banner Beranda
            </h4>
            <div className="aspect-video rounded-xl overflow-hidden border border-gray-100">
              <img src={bannerImage} alt="Banner Preview" className="w-full h-full object-cover" />
            </div>
            <button
              onClick={() => bannerInputRef.current?.click()}
              className="w-full py-3 bg-sky-50 dark:bg-sky-900/20 text-sky-600 dark:text-sky-400 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-sky-100 transition-colors"
            >
              <Upload size={18} />
              Ganti Banner
            </button>
            <input
              ref={bannerInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleBannerChange}
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onSubmit={handleSubmit}
            className="bg-white dark:bg-gray-800 p-8 rounded-[2rem] border border-gray-100 dark:border-gray-700 shadow-sm space-y-8"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <User size={16} /> Username
                </label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <Mail size={16} /> Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none dark:text-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <MapPin size={16} /> Alamat
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none dark:text-white"
              />
            </div>

            <div className="pt-4 border-t border-gray-100 dark:border-gray-700 space-y-6">
              <h4 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Key size={18} /> Ganti Password
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Password Baru</label>
                  <input
                    type="password"
                    value={formData.newPassword}
                    onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none dark:text-white"
                    placeholder="••••••••"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Konfirmasi Password</label>
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none dark:text-white"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 pt-4">
              {success && (
                <span className="text-emerald-500 font-bold text-sm">Perubahan berhasil disimpan!</span>
              )}
              <button
                type="submit"
                className="ml-auto flex items-center gap-2 px-8 py-4 bg-sky-500 text-white rounded-2xl font-bold shadow-lg shadow-sky-500/20 transition-all hover:scale-105"
              >
                <Save size={20} />
                Simpan Perubahan
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </div>
  );
}

import { useParams, Link, Navigate } from 'react-router-dom';
import { ChevronLeft, Download, FileText, Archive, PlayCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useModules } from '../context/ModuleContext';
import { cn } from '../lib/utils';

export default function ModuleDetail() {
  const { id } = useParams();
  const { getModuleById } = useModules();
  const module = getModuleById(id || '');

  if (!module) return <Navigate to="/" />;
  if (module.isLocked) return <Navigate to="/" />;

  const levelColors = {
    Beginner: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
    Medium: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
    Advance: 'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400',
  };

  const getGoogleDriveDownloadUrl = (url: string): string => {
    const fileId = url.match(/\/file\/d\/([^\/]+)/);
    return fileId ? `https://drive.google.com/uc?export=download&id=${fileId[1]}` : url;
  };

  return (
    <div className="min-h-screen bg-sky-50/30 dark:bg-gray-900 py-12 px-6 transition-colors">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400">
          <Link to="/" className="hover:text-sky-500 transition-colors">Beranda</Link>
          <ChevronLeft size={14} className="rotate-180" />
          <span className="text-gray-900 dark:text-white truncate">{module.title}</span>
        </nav>

        {/* Video Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative aspect-video w-full max-w-5xl mx-auto bg-black rounded-[2rem] overflow-hidden shadow-2xl ring-8 ring-white dark:ring-gray-800"
        >
          <iframe
            src={module.videoUrl}
            title={module.title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </motion.div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className={cn("px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider", levelColors[module.level])}>
                  {module.level}
                </span>
                <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-100 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400">
                  Scratch 3.0
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
                {module.title}
              </h1>
            </div>

            <div className="prose prose-sky dark:prose-invert max-w-none">
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                {module.longDescription}
              </p>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Apa yang akan dipelajari?</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0">
                {[
                  'Konsep dasar pemrograman visual',
                  'Logika algoritma langkah demi langkah',
                  'Implementasi fitur interaktif',
                  'Pemecahan masalah kreatif'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-2xl border border-sky-50 dark:border-gray-700">
                    <div className="p-2 bg-sky-100 dark:bg-sky-900/30 text-sky-500 rounded-lg">
                      <PlayCircle size={18} />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-[2rem] border border-sky-50 dark:border-gray-700 shadow-xl sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Materi Pembelajaran</h3>
              
              <div className="space-y-4">
                <a
                  href={getGoogleDriveDownloadUrl(module.pdfUrl)}
                  download={`${module.title}.pdf`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-4 bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-800 rounded-2xl transition-all hover:scale-[1.02]"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-rose-500 text-white rounded-xl shadow-lg shadow-rose-500/20">
                      <FileText size={24} />
                    </div>
                    <div>
                      <p className="font-bold text-rose-700 dark:text-rose-400">Modul PDF</p>
                      <p className="text-xs text-rose-500/70">Panduan Lengkap</p>
                    </div>
                  </div>
                  <Download size={20} className="text-rose-400 group-hover:translate-y-1 transition-transform" />
                </a>

                <a
                  href={module.zipUrl}
                  download={`${module.title}.zip`}
                  className="group flex items-center justify-between p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800 rounded-2xl transition-all hover:scale-[1.02]"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-amber-500 text-white rounded-xl shadow-lg shadow-amber-500/20">
                      <Archive size={24} />
                    </div>
                    <div>
                      <p className="font-bold text-amber-700 dark:text-amber-400">Aset ZIP</p>
                      <p className="text-xs text-amber-500/70">Gambar & Suara</p>
                    </div>
                  </div>
                  <Download size={20} className="text-amber-400 group-hover:translate-y-1 transition-transform" />
                </a>
              </div>

              <div className="mt-8 p-6 bg-sky-50 dark:bg-sky-900/20 rounded-2xl border border-sky-100 dark:border-sky-800">
                <p className="text-sm font-bold text-sky-700 dark:text-sky-400 mb-2">Instruksi Singkat:</p>
                <ol className="text-xs text-sky-600 dark:text-sky-300 space-y-2 list-decimal ml-4">
                  <li>Tonton video tutorial sampai habis.</li>
                  <li>Unduh PDF untuk panduan tertulis.</li>
                  <li>Gunakan aset ZIP untuk bahan praktik.</li>
                  <li>Buka Scratch Online dan mulai coding!</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

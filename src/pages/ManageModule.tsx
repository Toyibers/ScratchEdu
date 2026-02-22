import { useState, useMemo } from 'react';
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  Lock, 
  Unlock,
  ExternalLink,
  ChevronDown,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useModules, Module, Level } from '../context/ModuleContext';
import { useAuth } from '../context/AuthContext';
import ModalForm from '../components/ModalForm';
import { cn } from '../lib/utils';

export default function ManageModule() {
  const { modules, loading, addModule, updateModule, deleteModule } = useModules();
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingModule, setEditingModule] = useState<Module | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredModules = useMemo(() => {
    return modules.filter(m => 
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.level.toLowerCase().includes(search.toLowerCase())
    );
  }, [modules, search]);

  // Paginated Modules
  const paginatedModules = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredModules.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredModules, currentPage]);

  const totalPages = Math.ceil(filteredModules.length / itemsPerPage);

  if (loading) {
    return (
      <div className="p-20 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-sky-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const handleAdd = (data: any) => {
    addModule(data);
    setIsModalOpen(false);
  };

  const handleEdit = (data: any) => {
    if (editingModule) {
      updateModule(editingModule.id, data);
      setEditingModule(null);
      setIsModalOpen(false);
    }
  };

  const openEditModal = (module: Module) => {
    setEditingModule(module);
    setIsModalOpen(true);
    setActiveDropdown(null);
  };

  const toggleLock = (module: Module) => {
    updateModule(module.id, { isLocked: !module.isLocked });
    setActiveDropdown(null);
  };

  const changeLevel = (module: Module) => {
    const levels: Level[] = ['Beginner', 'Medium', 'Advance'];
    const currentIndex = levels.indexOf(module.level);
    const nextLevel = levels[(currentIndex + 1) % levels.length];
    updateModule(module.id, { level: nextLevel });
    setActiveDropdown(null);
  };

  const [confirmDelete, setConfirmDelete] = useState<Module | null>(null);

  const handleDelete = async (id: string) => {
    await deleteModule(id);
    setConfirmDelete(null);
    setActiveDropdown(null);
  };

  const openConfirmDelete = (module: Module) => {
    setConfirmDelete(module);
    setActiveDropdown(null);
  };

  const levelColors = {
    Beginner: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
    Medium: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
    Advance: 'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400',
  };

  return (
    <div className="p-4 md:p-8 space-y-8">
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white">Kelola Modul</h1>
          <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">Tambah, edit, atau hapus modul pembelajaran Scratch.</p>
        </div>
        
        <div className="flex items-center gap-4 bg-white dark:bg-gray-800 p-2 pr-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm self-start lg:self-auto">
          <img 
            src={user?.profilePic || "https://picsum.photos/seed/admin/200"} 
            alt="Admin" 
            className="w-12 h-12 rounded-xl object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="hidden sm:block">
            <p className="text-sm font-bold text-gray-900 dark:text-white">{user?.username || 'Admin'}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">mochtoyib@scratchedu.com</p>
          </div>
        </div>
      </header>

      <div className="bg-white dark:bg-gray-800 rounded-[2rem] border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50 flex flex-col sm:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Cari modul..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none transition-all dark:text-white"
            />
          </div>
          <button
            onClick={() => {
              setEditingModule(null);
              setIsModalOpen(true);
            }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-bold shadow-lg shadow-sky-500/20 transition-all hover:scale-105 shrink-0"
          >
            <Plus size={20} />
            Tambah Modul
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-700">
                <th className="px-6 py-4">Modul</th>
                <th className="px-6 py-4">Level</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {paginatedModules.map((module) => (
                <tr key={module.id} className="group hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={module.thumbnail}
                        alt=""
                        className="w-12 h-12 rounded-lg object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <p className="font-bold text-gray-900 dark:text-white line-clamp-1">{module.title}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">{module.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn("px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider", levelColors[module.level])}>
                      {module.level}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {module.isLocked ? (
                      <div className="flex items-center gap-1.5 text-rose-500 font-bold text-sm">
                        <Lock size={14} /> Terkunci
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-emerald-500 font-bold text-sm">
                        <Unlock size={14} /> Terbuka
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 relative">
                    <button
                      onClick={() => setActiveDropdown(activeDropdown === module.id ? null : module.id)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-gray-400"
                    >
                      <MoreVertical size={20} />
                    </button>

                    <AnimatePresence>
                      {activeDropdown === module.id && (
                        <>
                          <div className="fixed inset-0 z-10" onClick={() => setActiveDropdown(null)} />
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            className="absolute right-6 top-12 w-48 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 z-20 overflow-hidden"
                          >
                            <div className="p-2 space-y-1">
                              <button
                                onClick={() => openEditModal(module)}
                                className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-sky-50 dark:hover:bg-sky-900/20 hover:text-sky-600 rounded-xl transition-colors"
                              >
                                <Edit2 size={16} /> Edit Modul
                              </button>
                              <button
                                onClick={() => toggleLock(module)}
                                className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-sky-50 dark:hover:bg-sky-900/20 hover:text-sky-600 rounded-xl transition-colors"
                              >
                                {module.isLocked ? <Unlock size={16} /> : <Lock size={16} />}
                                {module.isLocked ? 'Buka Kunci' : 'Kunci Modul'}
                              </button>
                              <button
                                onClick={() => changeLevel(module)}
                                className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-sky-50 dark:hover:bg-sky-900/20 hover:text-sky-600 rounded-xl transition-colors"
                              >
                                <ChevronDown size={16} /> Ubah Level
                              </button>
                              <div className="h-px bg-gray-100 dark:bg-gray-700 my-1" />
                              <button
                                onClick={() => openConfirmDelete(module)}
                                className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-xl transition-colors"
                              >
                                <Trash2 size={16} /> Hapus Modul
                              </button>
                            </div>
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredModules.length === 0 && (
          <div className="p-20 text-center">
            <p className="text-gray-500 dark:text-gray-400">Tidak ada modul yang ditemukan.</p>
          </div>
        )}
      </div>

      {filteredModules.length > 0 && (
        <div className="p-6 flex items-center justify-between">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Menampilkan <span className="font-bold text-gray-900 dark:text-white">{paginatedModules.length}</span> dari <span className="font-bold text-gray-900 dark:text-white">{filteredModules.length}</span> modul
          </p>
          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-gray-600 dark:text-gray-400"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={cn(
                    "w-10 h-10 rounded-lg font-bold text-sm transition-all",
                    currentPage === page
                      ? "bg-sky-500 text-white shadow-lg shadow-sky-500/20"
                      : "text-gray-500 hover:bg-white dark:hover:bg-gray-800 border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
                  )}
                >
                  {page}
                </button>
              ))}
            </div>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-gray-600 dark:text-gray-400"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}

      <ModalForm
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingModule(null);
        }}
        onSubmit={editingModule ? handleEdit : handleAdd}
        initialData={editingModule}
      />

      <AnimatePresence>
        {confirmDelete && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
              onClick={() => setConfirmDelete(null)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative bg-white dark:bg-gray-800 w-full max-w-md rounded-[2rem] shadow-2xl p-8 text-center space-y-6"
            >
              <div className="w-16 h-16 bg-rose-100 dark:bg-rose-900/20 rounded-full mx-auto flex items-center justify-center">
                <Trash2 size={32} className="text-rose-500" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Hapus Modul?</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Anda yakin ingin menghapus modul <span className="font-bold">"{confirmDelete.title}"</span>? Tindakan ini tidak dapat dibatalkan.
                </p>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => setConfirmDelete(null)}
                  className="flex-1 px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-xl font-bold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={() => handleDelete(confirmDelete.id)}
                  className="flex-1 px-6 py-3 bg-rose-500 text-white rounded-xl font-bold hover:bg-rose-600 transition-colors shadow-lg shadow-rose-500/20"
                >
                  Ya, Hapus
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

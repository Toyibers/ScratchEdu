import { useState, useEffect, useRef, ChangeEvent } from 'react';
import { X, Upload, Link as LinkIcon, Type, Layers, Info, Lock, Unlock, FileText, Archive, Image as ImageIcon } from 'lucide-react';
import { Module, Level } from '../context/ModuleContext';

interface ModalFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialData?: Module | null;
}

export default function ModalForm({ isOpen, onClose, onSubmit, initialData }: ModalFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    level: 'Beginner' as Level,
    description: '',
    longDescription: '',
    videoUrl: '',
    isLocked: false,
    thumbnail: '',
    pdfUrl: '',
    zipUrl: '',
  });

  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);
  const zipInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        level: initialData.level,
        description: initialData.description,
        longDescription: initialData.longDescription,
        videoUrl: initialData.videoUrl,
        isLocked: initialData.isLocked,
        thumbnail: initialData.thumbnail,
        pdfUrl: initialData.pdfUrl,
        zipUrl: initialData.zipUrl,
      });
    } else {
      setFormData({
        title: '',
        level: 'Beginner',
        description: '',
        longDescription: '',
        videoUrl: '',
        isLocked: false,
        thumbnail: '',
        pdfUrl: '',
        zipUrl: '',
      });
    }
  }, [initialData, isOpen]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, field: 'thumbnail' | 'pdfUrl' | 'zipUrl') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, [field]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    const embedUrl = convertToEmbedUrl(url);
    setFormData({ ...formData, videoUrl: embedUrl || url });
  };

  const convertToEmbedUrl = (url: string): string | null => {
    if (url.includes('youtube.com/embed')) return url;

    let videoId: string | null = null;
    if (url.includes('youtube.com/watch')) {
      const urlParams = new URLSearchParams(new URL(url).search);
      videoId = urlParams.get('v');
    } else if (url.includes('youtu.be')) {
      videoId = new URL(url).pathname.substring(1);
    }

    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white dark:bg-gray-800 w-full max-w-2xl rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {initialData ? 'Edit Modul' : 'Tambah Modul Baru'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors">
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <form 
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(formData);
          }}
          className="p-6 overflow-y-auto space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <Type size={16} /> Judul Modul
              </label>
              <input
                required
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none dark:text-white"
                placeholder="Contoh: Modul 1: Pengenalan"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <Layers size={16} /> Level
              </label>
              <select
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: e.target.value as Level })}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none dark:text-white"
              >
                <option value="Beginner">Beginner</option>
                <option value="Medium">Medium</option>
                <option value="Advance">Advance</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <Info size={16} /> Deskripsi Singkat
            </label>
            <textarea
              required
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none dark:text-white"
              placeholder="Jelaskan modul dalam 1-2 kalimat..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <FileText size={16} /> Deskripsi Panjang
            </label>
            <textarea
              required
              rows={4}
              value={formData.longDescription}
              onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none dark:text-white"
              placeholder="Jelaskan detail materi modul..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <LinkIcon size={16} /> Link Video Embed
            </label>
            <input
              required
              type="url"
              value={formData.videoUrl}
              onChange={handleVideoUrlChange}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none dark:text-white"
              placeholder="https://www.youtube.com/embed/..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <ImageIcon size={16} /> Thumbnail Image
              </label>
              <div className="flex items-center gap-4">
                {formData.thumbnail && (
                  <img src={formData.thumbnail} alt="Preview" className="w-12 h-12 rounded-lg object-cover border border-gray-200" />
                )}
                <button
                  type="button"
                  onClick={() => thumbnailInputRef.current?.click()}
                  className="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl flex items-center justify-center gap-2 text-gray-500 hover:bg-gray-100 transition-colors"
                >
                  <Upload size={18} />
                  {formData.thumbnail ? 'Ganti Gambar' : 'Upload Gambar'}
                </button>
                <input
                  ref={thumbnailInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFileChange(e, 'thumbnail')}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                Status Modul
              </label>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, isLocked: !formData.isLocked })}
                className={`w-full px-4 py-3 flex items-center justify-center gap-2 rounded-xl border transition-all font-bold ${
                  formData.isLocked 
                    ? 'bg-rose-50 border-rose-200 text-rose-600 dark:bg-rose-900/20 dark:border-rose-800' 
                    : 'bg-emerald-50 border-emerald-200 text-emerald-600 dark:bg-emerald-900/20 dark:border-emerald-800'
                }`}
              >
                {formData.isLocked ? <Lock size={18} /> : <Unlock size={18} />}
                {formData.isLocked ? 'Terkunci' : 'Terbuka'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <LinkIcon size={16} /> Link Google Drive PDF
              </label>
              <input
                type="url"
                value={formData.pdfUrl}
                onChange={(e) => setFormData({ ...formData, pdfUrl: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none dark:text-white"
                placeholder="https://drive.google.com/file/d/..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                Aset ZIP
              </label>
              <button
                type="button"
                onClick={() => zipInputRef.current?.click()}
                className={`w-full px-4 py-3 flex items-center justify-center gap-2 rounded-xl border transition-all font-bold ${
                  formData.zipUrl 
                    ? 'bg-amber-50 border-amber-200 text-amber-600 dark:bg-amber-900/20 dark:border-amber-800' 
                    : 'bg-gray-50 border-gray-200 text-gray-400 dark:bg-gray-900 dark:border-gray-700'
                }`}
              >
                <Archive size={18} />
                {formData.zipUrl ? 'ZIP Tersedia' : 'Upload ZIP'}
              </button>
              <input
                ref={zipInputRef}
                type="file"
                accept=".zip,.rar,.7z"
                className="hidden"
                onChange={(e) => handleFileChange(e, 'zipUrl')}
              />
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-4 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-xl font-bold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-4 bg-sky-500 text-white rounded-xl font-bold hover:bg-sky-600 transition-colors shadow-lg shadow-sky-500/20"
            >
              {initialData ? 'Simpan Perubahan' : 'Tambah Modul'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

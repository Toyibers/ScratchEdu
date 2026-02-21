import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  count: number;
}

export default function SearchBar({ value, onChange, count }: SearchBarProps) {
  return (
    <div className="max-w-7xl mx-auto px-6 mb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="relative flex-1 max-w-2xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Cari modul (judul, level, deskripsi)..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 border border-sky-100 dark:border-gray-700 rounded-2xl shadow-sm focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition-all dark:text-white"
          />
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 rounded-xl font-medium border border-sky-100 dark:border-sky-800">
          <span className="text-lg font-bold">{count}</span>
          <span>Modul tersedia</span>
        </div>
      </div>
    </div>
  );
}

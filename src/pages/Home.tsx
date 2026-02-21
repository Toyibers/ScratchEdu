import { useState, useMemo } from 'react';
import HeroBanner from '../components/HeroBanner';
import SearchBar from '../components/SearchBar';
import ModuleCard from '../components/ModuleCard';
import { useModules } from '../context/ModuleContext';

export default function Home() {
  const { modules, loading } = useModules();
  const [search, setSearch] = useState('');

  const filteredModules = useMemo(() => {
    return modules.filter((m) => {
      const query = search.toLowerCase();
      return (
        m.title.toLowerCase().includes(query) ||
        m.level.toLowerCase().includes(query) ||
        m.description.toLowerCase().includes(query)
      );
    });
  }, [modules, search]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sky-50/30 dark:bg-gray-900">
        <div className="w-12 h-12 border-4 border-sky-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sky-50/30 dark:bg-gray-900 transition-colors">
      <HeroBanner moduleCount={modules.length} />
      
      {/* Separator */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-sky-200 to-transparent dark:via-gray-800" />
      </div>

      <div id="modules" className="py-12">
        <SearchBar 
          value={search} 
          onChange={setSearch} 
          count={filteredModules.length} 
        />

        <div className="max-w-7xl mx-auto px-6">
          {filteredModules.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredModules.map((module) => (
                <div key={module.id}>
                  <ModuleCard module={module} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-[2rem] border border-sky-100 dark:border-gray-700">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                Tidak ada modul yang ditemukan untuk pencarian "{search}"
              </p>
              <button 
                onClick={() => setSearch('')}
                className="mt-4 text-sky-500 font-bold hover:underline"
              >
                Reset Pencarian
              </button>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}

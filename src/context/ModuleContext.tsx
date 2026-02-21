import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';

export type Level = 'Beginner' | 'Medium' | 'Advance';

export interface Module {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  level: Level;
  thumbnail: string;
  videoUrl: string;
  pdfUrl: string;
  zipUrl: string;
  isLocked: boolean;
  created_at?: string;
}

interface ModuleContextType {
  modules: Module[];
  bannerImage: string;
  loading: boolean;
  addModule: (module: Omit<Module, 'id'>) => Promise<void>;
  updateModule: (id: string, module: Partial<Module>) => Promise<void>;
  deleteModule: (id: string) => Promise<void>;
  getModuleById: (id: string) => Module | undefined;
  updateBannerImage: (url: string) => Promise<void>;
}

const ModuleContext = createContext<ModuleContextType | undefined>(undefined);

export function ModuleProvider({ children }: { children: ReactNode }) {
  const [modules, setModules] = useState<Module[]>([]);
  const [bannerImage, setBannerImage] = useState<string>('https://picsum.photos/seed/coding/800/600');
  const [loading, setLoading] = useState(true);

  // Fetch initial data from Supabase
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch modules
      const { data: modulesData, error: modulesError } = await supabase
        .from('modules')
        .select('*')
        .order('created_at', { ascending: true });

      if (modulesError) throw modulesError;
      if (modulesData) setModules(modulesData);

      // Fetch banner image from settings
      const { data: settingsData, error: settingsError } = await supabase
        .from('settings')
        .select('value')
        .eq('key', 'bannerImage')
        .single();

      if (!settingsError && settingsData) {
        setBannerImage(settingsData.value);
      }
    } catch (error) {
      console.error('Error fetching data from Supabase:', error);
    } finally {
      setLoading(false);
    }
  };

  const addModule = async (module: Omit<Module, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('modules')
        .insert([module])
        .select()
        .single();

      if (error) throw error;
      if (data) setModules(prev => [...prev, data]);
    } catch (error) {
      console.error('Error adding module:', error);
      alert('Gagal menambah modul. Pastikan tabel "modules" sudah dibuat di Supabase.');
    }
  };

  const updateModule = async (id: string, updatedFields: Partial<Module>) => {
    try {
      const { error } = await supabase
        .from('modules')
        .update(updatedFields)
        .eq('id', id);

      if (error) throw error;
      setModules(prev => prev.map(m => m.id === id ? { ...m, ...updatedFields } : m));
    } catch (error) {
      console.error('Error updating module:', error);
    }
  };

  const deleteModule = async (id: string) => {
    try {
      const { error } = await supabase
        .from('modules')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setModules(prev => prev.filter(m => m.id !== id));
    } catch (error) {
      console.error('Error deleting module:', error);
    }
  };

  const getModuleById = (id: string) => {
    return modules.find(m => m.id === id);
  };

  const updateBannerImage = async (url: string) => {
    try {
      const { error } = await supabase
        .from('settings')
        .upsert({ key: 'bannerImage', value: url });

      if (error) throw error;
      setBannerImage(url);
    } catch (error) {
      console.error('Error updating banner image:', error);
    }
  };

  return (
    <ModuleContext.Provider value={{ modules, bannerImage, loading, addModule, updateModule, deleteModule, getModuleById, updateBannerImage }}>
      {children}
    </ModuleContext.Provider>
  );
}

export function useModules() {
  const context = useContext(ModuleContext);
  if (context === undefined) {
    throw new Error('useModules must be used within a ModuleProvider');
  }
  return context;
}

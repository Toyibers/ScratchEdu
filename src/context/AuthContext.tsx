import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';

interface User {
  username: string;
  role: 'admin' | 'user';
  profilePic?: string;
  email?: string;
  address?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('user');
    if (saved) {
      const parsedUser = JSON.parse(saved);
      setUser(parsedUser);
      // Sync with Supabase if it's admin
      if (parsedUser.role === 'admin') {
        fetchAdminProfile();
      } else {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const fetchAdminProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', 'admin')
        .single();

      if (!error && data) {
        const updatedUser: User = {
          username: data.username,
          role: 'admin',
          profilePic: data.profilePic,
          email: data.email,
          address: data.address
        };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
    } catch (error) {
      console.error('Error fetching admin profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (username: string, password: string) => {
    // Simple hardcoded check for demo, but could be Supabase Auth
    if (username === 'admin' && password === 'admin1234H@') {
      const newUser: User = { 
        username: 'admin', 
        role: 'admin',
        profilePic: 'https://picsum.photos/seed/admin/200'
      };
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      await fetchAdminProfile(); // Sync with Supabase
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateUser = async (data: Partial<User>) => {
    if (user && user.role === 'admin') {
      try {
        const { error } = await supabase
          .from('profiles')
          .update({
            username: data.username,
            profilePic: data.profilePic,
            email: data.email,
            address: data.address
          })
          .eq('id', 'admin');

        if (error) throw error;

        const updatedUser = { ...user, ...data };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      } catch (error) {
        console.error('Error updating profile in Supabase:', error);
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

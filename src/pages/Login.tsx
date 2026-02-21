import { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, BookOpen, ChevronLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const success = await login(username, password);
    if (success) {
      navigate('/admin');
    } else {
      setError('Username atau password salah!');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] shadow-2xl p-8 md:p-12 space-y-8 relative overflow-hidden">
          {/* Decorative element */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full -translate-y-1/2 translate-x-1/2" />

          <div className="text-center space-y-2 relative">
            <div className="inline-flex p-4 bg-sky-500 rounded-2xl text-white shadow-lg shadow-sky-500/30 mb-4">
              <BookOpen size={32} />
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Selamat Datang</h1>
            <p className="text-gray-500 dark:text-gray-400">Masuk ke panel admin ScratchEdu</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Username</label>
              <input
                required
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-sky-500 outline-none transition-all dark:text-white"
                placeholder="admin"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Password</label>
              <div className="relative">
                <input
                  required
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-sky-500 outline-none transition-all dark:text-white"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-sky-500 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-4 bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 text-sm font-bold rounded-xl text-center border border-rose-100 dark:border-rose-800 animate-shake">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-4 bg-sky-500 hover:bg-sky-600 text-white rounded-2xl font-bold text-lg shadow-lg shadow-sky-500/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Masuk Sekarang
            </button>
          </form>

          <div className="pt-4 text-center">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-gray-500 hover:text-sky-500 font-bold transition-colors"
            >
              <ChevronLeft size={18} />
              Kembali ke Beranda
            </Link>
          </div>
        </div>
        
      </div>
    </div>
  );
}

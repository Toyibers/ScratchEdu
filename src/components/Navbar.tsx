import { Link, useLocation } from 'react-router-dom';
import { BookOpen, ShieldCheck, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user } = useAuth();
  const location = useLocation();

  const isAdminPage = location.pathname.startsWith('/admin');

  if (isAdminPage) return null;

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-sky-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="p-2 bg-sky-500 rounded-xl group-hover:rotate-12 transition-transform">
            <BookOpen className="text-white" size={24} />
          </div>
          <span className="font-bold text-xl text-gray-900 dark:text-white">
            Scratch<span className="text-sky-500">Edu</span>
          </span>
        </Link>

        <div className="flex items-center gap-4">
          {user ? (
            <Link
              to="/admin"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-500 text-white hover:bg-sky-600 transition-colors font-medium"
            >
              <LayoutDashboard size={18} />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-sky-500 text-sky-500 hover:bg-sky-50 dark:hover:bg-gray-800 transition-colors font-medium"
            >
              <ShieldCheck size={18} />
              <span>Admin</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

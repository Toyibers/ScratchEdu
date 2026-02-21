import { Link } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Instagram, 
  Facebook, 
  Youtube, 
  Linkedin, 
  MessageCircle,
  BookOpen
} from 'lucide-react';

export default function Footer() {
  const socialLinks = [
    { icon: Instagram, href: 'https://instagram.com/toyibers', label: 'Instagram' },
    { icon: Facebook, href: 'https://facebook.com/Mochammad Toyib', label: 'Facebook' },
    { icon: Youtube, href: 'https://youtube.com/@mochtoyib4476', label: 'Youtube' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/moch-toyib-842350331/', label: 'LinkedIn' },
  ];

  const navLinks = [
    { label: 'Tentang Kami', href: '#' },
    { label: 'Kontak', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Karier', href: '#' },
  ];

  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-sky-100 dark:border-gray-800 pt-16 pb-8 transition-colors">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand & Description */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="p-2 bg-sky-500 rounded-xl">
                <BookOpen className="text-white" size={24} />
              </div>
              <span className="font-bold text-xl text-gray-900 dark:text-white">
                Scratch<span className="text-sky-500">Edu</span>
              </span>
            </Link>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
              Platform pembelajaran Scratch 3.0 terbaik untuk mengasah kreativitas dan logika pemrograman anak sejak dini.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-sky-50 dark:bg-gray-900 text-sky-500 hover:bg-sky-500 hover:text-white rounded-xl transition-all"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="font-bold text-gray-900 dark:text-white text-lg">Informasi Kontak</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-500 dark:text-gray-400 text-sm">
                <MapPin className="text-sky-500 shrink-0" size={18} />
                <span>Jl. A. Yani GG Perkutut, Patokan, Kraksaan, Kab. probolingo</span>
              </li>
              <li className="flex items-center gap-3 text-gray-500 dark:text-gray-400 text-sm">
                <Mail className="text-sky-500 shrink-0" size={18} />
                <a href="mailto:mochtoyib118@gmail.com" className="hover:text-sky-500 transition-colors">
                  mochtoyib118@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-gray-500 dark:text-gray-400 text-sm">
                <Phone className="text-sky-500 shrink-0" size={18} />
                <a href="tel:089516320719" className="hover:text-sky-500 transition-colors">
                  089516320719
                </a>
              </li>
              <li className="flex items-center gap-3 text-gray-500 dark:text-gray-400 text-sm">
                <MessageCircle className="text-sky-500 shrink-0" size={18} />
                <a 
                  href="https://wa.me/6289516320719" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-sky-500 transition-colors"
                >
                  WhatsApp: 089516320719
                </a>
              </li>
            </ul>
          </div>

          {/* Navigation */}
          <div className="space-y-6">
            <h3 className="font-bold text-gray-900 dark:text-white text-lg">Navigasi Tambahan</h3>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-gray-500 dark:text-gray-400 text-sm hover:text-sky-500 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter / Extra */}
          <div className="space-y-6">
            <h3 className="font-bold text-gray-900 dark:text-white text-lg">Mulai Belajar</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Siap untuk memulai petualangan coding Anda? Bergabunglah dengan ribuan pelajar lainnya.
            </p>
            <Link 
              to="/login" 
              className="inline-block px-6 py-3 bg-sky-500 text-white font-bold rounded-xl hover:bg-sky-600 transition-colors shadow-lg shadow-sky-500/20"
            >
              Akses Admin
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-sky-100 dark:border-gray-900 flex flex-col md:flex-row items-center justify-between gap-4 text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            © 2026 <span className="font-bold text-sky-500">ScratchEdu</span>. All rights reserved.
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Author: <span className="font-bold text-gray-900 dark:text-white">Mochammad Toyib</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

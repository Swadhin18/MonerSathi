import { Link, useLocation } from 'react-router-dom';
import { Heart, MessageCircle, Info, Home } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 md:top-0 md:bottom-auto bg-white/90 backdrop-blur-lg border-t md:border-b border-slate-200 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="hidden md:flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
              মনেরসাথী
            </span>
          </Link>

          <div className="flex items-center justify-around w-full md:w-auto md:gap-8">
            <Link
              to="/"
              className={`flex flex-col md:flex-row items-center gap-1 md:gap-2 transition-colors ${
                isActive('/') ? 'text-teal-600' : 'text-slate-600 hover:text-teal-500'
              }`}
            >
              <Home className="w-6 h-6" />
              <span className="text-sm font-medium">হোম</span>
            </Link>

            <Link
              to="/chat"
              className={`flex flex-col md:flex-row items-center gap-1 md:gap-2 transition-colors ${
                isActive('/chat') ? 'text-teal-600' : 'text-slate-600 hover:text-teal-500'
              }`}
            >
              <MessageCircle className="w-6 h-6" />
              <span className="text-sm font-medium">কথা বলুন</span>
            </Link>

            <Link
              to="/about"
              className={`flex flex-col md:flex-row items-center gap-1 md:gap-2 transition-colors ${
                isActive('/about') ? 'text-teal-600' : 'text-slate-600 hover:text-teal-500'
              }`}
            >
              <Info className="w-6 h-6" />
              <span className="text-sm font-medium">সম্পর্কে</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

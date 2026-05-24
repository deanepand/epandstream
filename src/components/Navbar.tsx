import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Menu, X, Tv, Film, BookOpen, BookMarked, Heart, Home } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Home', path: '/', icon: Home },
  { label: 'Anime', path: '/s/anime/', icon: Tv },
  { label: 'Donghua', path: '/s/donghua/', icon: Film },
  { label: 'Comic', path: '/s/comic/', icon: BookOpen },
  { label: 'Novel', path: '/s/novel/', icon: BookMarked },
  { label: 'Favorit', path: '/favorites', icon: Heart },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/s/anime/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setSearchOpen(false);
    }
  };

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="sticky-nav bg-[#0a0a0a] border-b-2 border-black">
      <div className="max-w-7xl mx-auto px-3">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-[#f5c518] border-2 border-white flex items-center justify-center">
              <span className="font-mono font-black text-black text-xs">EP</span>
            </div>
            <span className="font-black text-white text-base tracking-tight hidden sm:block">
              EpanD<span className="text-[#f5c518]">Stream</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-bold transition-all border-2 ${
                    isActive(item.path)
                      ? 'bg-[#f5c518] text-black border-[#f5c518]'
                      : 'text-white border-transparent hover:border-white hover:text-[#f5c518]'
                  }`}
                >
                  <Icon size={14} />
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Search Toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="w-8 h-8 flex items-center justify-center text-white hover:text-[#f5c518] transition-colors"
            >
              <Search size={18} />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-8 h-8 flex items-center justify-center text-white hover:text-[#f5c518] transition-colors"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className="py-2 border-t border-white/20">
            <form onSubmit={handleSearch} className="flex gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari anime..."
                autoFocus
                className="flex-1 px-3 py-2 bg-white text-black text-sm font-medium border-2 border-white outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#f5c518] text-black text-sm font-bold border-2 border-white hover:bg-yellow-400 transition-colors"
              >
                Cari
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#111] border-t-2 border-white/20">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-bold border-b border-white/10 transition-colors ${
                  isActive(item.path)
                    ? 'bg-[#f5c518] text-black'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                <Icon size={16} />
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}

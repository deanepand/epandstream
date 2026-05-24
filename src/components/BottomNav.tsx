import { Link, useLocation } from 'react-router-dom';
import { Home, Tv, Film, Heart, Search } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Home', path: '/', icon: Home },
  { label: 'Anime', path: '/s/anime/', icon: Tv },
  { label: 'Cari', path: '/s/anime/search', icon: Search },
  { label: 'Donghua', path: '/s/donghua/', icon: Film },
  { label: 'Favorit', path: '/favorites', icon: Heart },
];

export default function BottomNav() {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0a0a0a] border-t-2 border-[#f5c518] flex">
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const active = isActive(item.path);
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex-1 flex flex-col items-center justify-center py-2 gap-0.5 transition-all ${
              active
                ? 'text-[#f5c518]'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <div className={`relative ${active ? 'scale-110' : ''} transition-transform`}>
              <Icon
                size={20}
                strokeWidth={active ? 2.5 : 1.5}
                fill={active && item.label === 'Favorit' ? '#f5c518' : 'none'}
              />
              {active && (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#f5c518]" />
              )}
            </div>
            <span className={`text-xs font-bold ${active ? 'text-[#f5c518]' : ''}`}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}

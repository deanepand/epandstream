import { Link } from 'react-router-dom';
import { Globe, Tv, Film, BookOpen, BookMarked, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-white border-t-4 border-[#f5c518] mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-[#f5c518] border-2 border-white flex items-center justify-center">
                <span className="font-mono font-black text-black text-xs">EP</span>
              </div>
              <span className="font-black text-lg">
                EpanD<span className="text-[#f5c518]">Stream</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Platform streaming anime & donghua subtitle Indonesia. Tonton anime favorit kamu kapan saja.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-black text-[#f5c518] uppercase text-sm mb-3">Navigasi</h4>
            <ul className="space-y-2">
              {[
                { label: 'Anime', path: '/s/anime/', icon: Tv },
                { label: 'Donghua', path: '/s/donghua/', icon: Film },
                { label: 'Comic', path: '/s/comic/', icon: BookOpen },
                { label: 'Novel', path: '/s/novel/', icon: BookMarked },
                { label: 'Favorit', path: '/favorites', icon: Heart },
              ].map(({ label, path, icon: Icon }) => (
                <li key={path}>
                  <Link
                    to={path}
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-[#f5c518] transition-colors"
                  >
                    <Icon size={13} />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-black text-[#f5c518] uppercase text-sm mb-3">Info</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-[#f5c518] font-mono font-bold">Dev</span>
                <span>EpanDLabs</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#f5c518] font-mono font-bold">API</span>
                <span>Sanka Vollerei</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#f5c518] font-mono font-bold">Ver</span>
                <span>v2.1.0</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#f5c518] font-mono font-bold">Stack</span>
                <span>React + Vite + Tailwind</span>
              </li>
              <li className="flex items-start gap-2">
                <Globe size={13} className="mt-0.5 text-[#f5c518] flex-shrink-0" />
                <span>Indonesia</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-500 font-mono">
            © 2026 EpanDStream. Hak cipta dilindungi.
          </p>
          <p className="text-xs text-gray-500">
            Data dari{' '}
            <span className="text-[#f5c518] font-bold">Otakudesu</span> &{' '}
            <span className="text-[#f5c518] font-bold">Anichin</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-3">
      <div className="text-center">
        <div className="nb-card inline-block p-8 bg-white mb-6 max-w-sm">
          <div className="w-20 h-20 bg-[#f5c518] border-4 border-black shadow-[6px_6px_0_#0a0a0a] mx-auto mb-4 flex items-center justify-center">
            <span className="font-black text-3xl text-black font-mono">404</span>
          </div>
          <h1 className="font-black text-2xl uppercase mb-2">Halaman Tidak Ditemukan</h1>
          <p className="text-gray-600 text-sm mb-6">
            Halaman yang kamu cari tidak ada atau sudah dipindahkan.
          </p>
          <div className="flex gap-2 justify-center">
            <Link
              to="/"
              className="nb-btn flex items-center gap-2 px-4 py-2 bg-[#0a0a0a] text-white text-sm"
            >
              <Home size={14} />
              Home
            </Link>
            <Link
              to="/s/anime/search"
              className="nb-btn flex items-center gap-2 px-4 py-2 bg-[#f5c518] text-black text-sm"
            >
              <Search size={14} />
              Cari
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

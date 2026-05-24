import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchDonghuaHome } from '../../services/api';
import { Link, useNavigate } from 'react-router-dom';
import { Film, CalendarDays, Search } from 'lucide-react';
import LoadingGrid from '../../components/LoadingGrid';
import ErrorState from '../../components/ErrorState';
import SectionHeader from '../../components/SectionHeader';

export default function DonghuaHomePage() {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['donghua-home', page],
    queryFn: () => fetchDonghuaHome(page),
    staleTime: 5 * 60 * 1000,
  });

  const latestRelease: any[] = (data as any)?.latest_release || [];
  const popular: any[] = (data as any)?.popular || [];
  const ongoing: any[] = (data as any)?.ongoing || [];
  const allItems = latestRelease.length > 0 ? latestRelease : (popular.length > 0 ? popular : ongoing);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/s/donghua/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-3 py-5">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5 pb-3 border-b-2 border-black flex-wrap">
        <div className="w-10 h-10 bg-[#f5c518] border-2 border-black flex items-center justify-center shadow-[3px_3px_0_#0a0a0a]">
          <Film size={20} className="text-black" />
        </div>
        <div>
          <h1 className="font-black text-xl uppercase">Donghua</h1>
          <p className="text-xs text-gray-600 font-mono">Animasi China Sub Indonesia</p>
        </div>
        <div className="ml-auto flex gap-2">
          <Link
            to="/s/donghua/schedule"
            className="nb-btn flex items-center gap-1.5 px-3 py-1.5 bg-[#f5c518] text-black text-xs"
          >
            <CalendarDays size={13} />
            Jadwal
          </Link>
          <Link
            to="/s/donghua/genres"
            className="nb-btn flex items-center gap-1.5 px-3 py-1.5 bg-white text-black text-xs"
          >
            Genre
          </Link>
        </div>
      </div>

      {/* Search */}
      <form onSubmit={handleSearch} className="flex gap-2 mb-5">
        <div className="flex-1 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari donghua..."
            className="nb-input w-full pl-10 pr-4 py-2.5 text-sm font-medium"
          />
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
        <button type="submit" className="nb-btn px-4 py-2.5 bg-[#f5c518] text-black text-sm font-bold">
          Cari
        </button>
      </form>

      {isLoading && <LoadingGrid count={15} />}
      {isError && <ErrorState onRetry={refetch} />}

      {!isLoading && !isError && (
        <>
          <SectionHeader title="Rilis Terbaru" accent="#f5c518" />
          {allItems.length === 0 ? (
            <p className="text-center py-12 text-gray-500 font-bold">Tidak ada data</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-6">
              {allItems.map((item: any, idx: number) => (
                <Link
                  key={item.slug || idx}
                  to={`/s/donghua/episode/${item.slug}`}
                  className="block group"
                >
                  <div className="nb-card overflow-hidden bg-white">
                    <div className="relative overflow-hidden">
                      <img
                        src={item.poster}
                        alt={item.title}
                        className="w-full object-cover border-b-2 border-black group-hover:scale-105 transition-transform duration-200"
                        style={{ height: '160px', objectFit: 'cover' }}
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE2MCIgZmlsbD0iI2UyZGVkNiIvPjwvc3ZnPg==';
                        }}
                      />
                      {item.current_episode && (
                        <div className="absolute bottom-1 left-1 bg-[#f5c518] border-2 border-black px-1.5 py-0.5 text-xs font-black text-black">
                          {item.current_episode}
                        </div>
                      )}
                      {item.episode && (
                        <div className="absolute bottom-1 left-1 bg-[#f5c518] border-2 border-black px-1.5 py-0.5 text-xs font-black text-black">
                          Ep {item.episode}
                        </div>
                      )}
                      {(item.status || item.type) && (
                        <div className="absolute top-1 right-1 bg-[#4361ee] border-2 border-black px-1 py-0.5 text-xs font-black text-white">
                          {item.type || item.status}
                        </div>
                      )}
                    </div>
                    <div className="p-2">
                      <h3 className="text-xs font-bold line-clamp-2 leading-tight">{item.title}</h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="flex justify-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="nb-btn px-4 py-2 bg-white text-black text-sm disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Sebelumnya
            </button>
            <div className="nb-btn px-4 py-2 bg-[#f5c518] text-black text-sm font-black">
              Hal. {page}
            </div>
            <button
              onClick={() => setPage((p) => p + 1)}
              className="nb-btn px-4 py-2 bg-white text-black text-sm"
            >
              Berikutnya
            </button>
          </div>
        </>
      )}
    </div>
  );
}

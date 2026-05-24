import { useQuery } from '@tanstack/react-query';
import { fetchDonghuaGenres } from '../../services/api';
import { Link } from 'react-router-dom';
import { Tag, ArrowLeft } from 'lucide-react';
import ErrorState from '../../components/ErrorState';

export default function DonghuaGenresPage() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['donghua-genres'],
    queryFn: fetchDonghuaGenres,
    staleTime: 30 * 60 * 1000,
  });

  const genres: any[] = (data as any)?.genres || (data as any)?.data || [];

  const COLORS = [
    '#4361ee', '#e63946', '#2dc653', '#f5c518', '#7b2d8b',
    '#f4721e', '#0a0a0a', '#4361ee', '#e63946', '#2dc653',
  ];

  return (
    <div className="max-w-7xl mx-auto px-3 py-5">
      <div className="flex items-center gap-3 mb-5">
        <Link to="/s/donghua/" className="nb-btn p-2 bg-white text-black">
          <ArrowLeft size={16} />
        </Link>
        <div className="w-10 h-10 bg-[#f5c518] border-2 border-black flex items-center justify-center shadow-[3px_3px_0_#0a0a0a]">
          <Tag size={20} className="text-black" />
        </div>
        <div>
          <h1 className="font-black text-xl uppercase">Genre Donghua</h1>
          <p className="text-xs text-gray-600 font-mono">Jelajahi berdasarkan genre</p>
        </div>
      </div>

      {isLoading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="skeleton h-16" />
          ))}
        </div>
      )}

      {isError && <ErrorState onRetry={refetch} />}

      {!isLoading && !isError && (
        <>
          {genres.length === 0 ? (
            <div className="text-center py-16">
              <div className="nb-card inline-block p-6 bg-white">
                <Tag size={32} className="mx-auto text-gray-300 mb-2" />
                <p className="font-black text-base">Data genre tidak tersedia</p>
                <p className="text-sm text-gray-500 mt-1">API belum mengembalikan data genre</p>
              </div>
              {/* Show raw data for debugging */}
              <div className="mt-4 text-left nb-card p-4 bg-white max-w-lg mx-auto">
                <p className="font-mono text-xs text-gray-500 break-all">
                  {JSON.stringify(data)?.slice(0, 300)}...
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {genres.map((genre: any, idx: number) => {
                const color = COLORS[idx % COLORS.length];
                const textColor = ['#f5c518', '#2dc653'].includes(color) ? '#0a0a0a' : '#ffffff';
                return (
                  <div
                    key={genre.slug || genre.name || idx}
                    className="nb-card p-4 cursor-pointer"
                    style={{ background: color }}
                  >
                    <div className="flex items-center gap-2">
                      <Tag size={16} style={{ color: textColor }} />
                      <span
                        className="font-black text-sm truncate"
                        style={{ color: textColor }}
                      >
                        {genre.name || genre.title}
                      </span>
                    </div>
                    {genre.count && (
                      <p className="text-xs mt-1 font-mono" style={{ color: textColor, opacity: 0.7 }}>
                        {genre.count} donghua
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}

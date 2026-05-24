import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchAnimeSearch } from '../../services/api';
import AnimeCard from '../../components/AnimeCard';
import LoadingGrid from '../../components/LoadingGrid';
import ErrorState from '../../components/ErrorState';
import { Search, X } from 'lucide-react';

export default function AnimeSearchPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialQuery = searchParams.get('q') || '';
  const [inputValue, setInputValue] = useState(initialQuery);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['anime-search', initialQuery],
    queryFn: () => fetchAnimeSearch(initialQuery),
    enabled: initialQuery.length > 0,
    staleTime: 3 * 60 * 1000,
  });

  const results: any[] = (data as any)?.data?.animeList || [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      navigate(`/s/anime/search?q=${encodeURIComponent(inputValue.trim())}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-3 py-5">
      <div className="mb-5">
        <h1 className="font-black text-xl uppercase mb-3">Cari Anime</h1>
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Nama anime..."
              className="nb-input w-full pl-10 pr-4 py-3 text-sm font-medium"
            />
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            {inputValue && (
              <button
                type="button"
                onClick={() => setInputValue('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
              >
                <X size={14} />
              </button>
            )}
          </div>
          <button type="submit" className="nb-btn px-4 py-3 bg-[#4361ee] text-white text-sm">
            <Search size={16} />
          </button>
        </form>
      </div>

      {initialQuery && (
        <div className="mb-4">
          <p className="text-sm text-gray-600 font-mono">
            Hasil pencarian untuk: <strong className="text-black">"{initialQuery}"</strong>
            {results.length > 0 && (
              <span className="ml-2 nb-badge bg-[#f5c518] text-black">{results.length} hasil</span>
            )}
          </p>
        </div>
      )}

      {!initialQuery && (
        <div className="text-center py-16">
          <Search size={40} className="mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500 font-bold">Masukkan nama anime yang ingin kamu cari</p>
        </div>
      )}

      {isLoading && <LoadingGrid count={10} />}

      {isError && <ErrorState onRetry={refetch} message="Gagal melakukan pencarian" />}

      {!isLoading && !isError && initialQuery && results.length === 0 && (
        <div className="text-center py-16">
          <div className="nb-card inline-block p-6 bg-white mb-4">
            <Search size={32} className="mx-auto text-gray-300 mb-2" />
            <p className="font-black text-base">Tidak ditemukan</p>
            <p className="text-sm text-gray-500 mt-1">Coba kata kunci lain</p>
          </div>
        </div>
      )}

      {!isLoading && !isError && results.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {results.map((anime: any) => (
            <AnimeCard
              key={anime.animeId}
              id={anime.animeId}
              title={anime.title}
              poster={anime.poster}
              type="anime"
              href={anime.href}
            />
          ))}
        </div>
      )}
    </div>
  );
}

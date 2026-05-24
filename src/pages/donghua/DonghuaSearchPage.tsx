import { useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchDonghuaSearch } from '../../services/api';
import LoadingGrid from '../../components/LoadingGrid';
import ErrorState from '../../components/ErrorState';
import { Search, X, ArrowLeft } from 'lucide-react';

export default function DonghuaSearchPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialQuery = searchParams.get('q') || '';
  const [inputValue, setInputValue] = useState(initialQuery);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['donghua-search', initialQuery],
    queryFn: () => fetchDonghuaSearch(initialQuery),
    enabled: initialQuery.length > 0,
    staleTime: 3 * 60 * 1000,
  });

  const results: any[] = (data as any)?.data || [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      navigate(`/s/donghua/search?q=${encodeURIComponent(inputValue.trim())}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-3 py-5">
      <div className="flex items-center gap-2 mb-4">
        <Link to="/s/donghua/" className="nb-btn p-2 bg-white text-black">
          <ArrowLeft size={16} />
        </Link>
        <h1 className="font-black text-xl uppercase">Cari Donghua</h1>
      </div>

      <form onSubmit={handleSearch} className="flex gap-2 mb-5">
        <div className="flex-1 relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Nama donghua..."
            autoFocus
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
        <button type="submit" className="nb-btn px-4 py-3 bg-[#f5c518] text-black text-sm">
          <Search size={16} />
        </button>
      </form>

      {initialQuery && (
        <p className="text-sm text-gray-600 font-mono mb-4">
          Hasil untuk: <strong className="text-black">"{initialQuery}"</strong>
          {results.length > 0 && (
            <span className="ml-2 nb-badge bg-[#f5c518] text-black">{results.length} hasil</span>
          )}
        </p>
      )}

      {isLoading && <LoadingGrid count={10} />}
      {isError && <ErrorState onRetry={refetch} message="Gagal melakukan pencarian" />}

      {!isLoading && !isError && initialQuery && results.length === 0 && (
        <div className="text-center py-16">
          <Search size={32} className="mx-auto text-gray-300 mb-3" />
          <p className="font-black text-base">Tidak ditemukan</p>
          <p className="text-sm text-gray-500 mt-1">Coba kata kunci lain</p>
        </div>
      )}

      {!isLoading && !isError && results.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {results.map((item: any, idx: number) => (
            <Link key={item.slug || idx} to={`/s/donghua/detail/${item.slug}`} className="block group">
              <div className="nb-card overflow-hidden bg-white">
                <div className="relative">
                  <img
                    src={item.poster}
                    alt={item.title}
                    className="w-full object-cover border-b-2 border-black group-hover:scale-105 transition-transform"
                    style={{ height: '180px', objectFit: 'cover' }}
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE4MCIgZmlsbD0iI2UyZGVkNiIvPjwvc3ZnPg==';
                    }}
                  />
                </div>
                <div className="p-2">
                  <h3 className="text-xs font-bold line-clamp-2">{item.title}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

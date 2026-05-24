import { useQuery } from '@tanstack/react-query';
import { fetchAnimeSchedule } from '../../services/api';
import { Link } from 'react-router-dom';
import { CalendarDays, ArrowLeft } from 'lucide-react';
import ErrorState from '../../components/ErrorState';

export default function AnimeSchedulePage() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['anime-schedule'],
    queryFn: fetchAnimeSchedule,
    staleTime: 10 * 60 * 1000,
  });

  const scheduleData: any[] = data?.data || [];

  const dayColors: Record<string, string> = {
    Senin: '#4361ee',
    Selasa: '#e63946',
    Rabu: '#2dc653',
    Kamis: '#f4721e',
    Jumat: '#7b2d8b',
    Sabtu: '#f5c518',
    Minggu: '#e63946',
  };

  return (
    <div className="max-w-7xl mx-auto px-3 py-5">
      <div className="flex items-center gap-3 mb-5">
        <Link to="/s/anime/" className="nb-btn p-2 bg-white text-black">
          <ArrowLeft size={16} />
        </Link>
        <div className="w-10 h-10 bg-[#4361ee] border-2 border-black flex items-center justify-center shadow-[3px_3px_0_#0a0a0a]">
          <CalendarDays size={20} className="text-white" />
        </div>
        <div>
          <h1 className="font-black text-xl uppercase">Jadwal Anime</h1>
          <p className="text-xs text-gray-600 font-mono">Anime tayang minggu ini</p>
        </div>
      </div>

      {isLoading && (
        <div className="space-y-4">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="nb-card p-4 bg-white">
              <div className="skeleton h-6 w-24 mb-3" />
              <div className="flex gap-2 overflow-x-auto">
                {Array.from({ length: 4 }).map((_, j) => (
                  <div key={j} className="skeleton w-24 h-32 flex-shrink-0" />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {isError && <ErrorState onRetry={refetch} />}

      {!isLoading && !isError && (
        <div className="space-y-4">
          {scheduleData.map((dayData: any) => {
            const color = dayColors[dayData.day] || '#4361ee';
            const textColor = ['#f5c518', '#2dc653'].includes(color) ? '#0a0a0a' : '#ffffff';
            return (
              <div key={dayData.day} className="nb-card bg-white overflow-hidden">
                <div
                  className="px-4 py-2.5 border-b-2 border-black"
                  style={{ background: color }}
                >
                  <h2 className="font-black uppercase text-sm" style={{ color: textColor }}>
                    {dayData.day}
                    <span className="ml-2 text-xs opacity-70 font-mono">
                      ({dayData.anime_list?.length || 0} anime)
                    </span>
                  </h2>
                </div>
                <div className="p-3">
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {(dayData.anime_list || []).map((anime: any) => (
                      <Link
                        key={anime.slug}
                        to={`/s/anime/detail/${anime.slug}`}
                        className="flex-shrink-0 w-24 group"
                      >
                        <div className="nb-card overflow-hidden">
                          <img
                            src={anime.poster}
                            alt={anime.title}
                            className="w-full object-cover border-b-2 border-black group-hover:scale-105 transition-transform duration-200"
                            style={{ height: '120px', objectFit: 'cover' }}
                            loading="lazy"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEyMCIgZmlsbD0iI2UyZGVkNiIvPjwvc3ZnPg==';
                            }}
                          />
                          <div className="p-1">
                            <p className="text-xs font-bold line-clamp-2 leading-tight">{anime.title}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

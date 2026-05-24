import { useQuery } from '@tanstack/react-query';
import { fetchDonghuaSchedule } from '../../services/api';
import { Link } from 'react-router-dom';
import { CalendarDays, ArrowLeft, Clock } from 'lucide-react';
import ErrorState from '../../components/ErrorState';

export default function DonghuaSchedulePage() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['donghua-schedule'],
    queryFn: fetchDonghuaSchedule,
    staleTime: 10 * 60 * 1000,
  });

  const scheduleData: any[] = (data as any)?.schedule || [];

  const dayColors: Record<string, string> = {
    Sunday: '#e63946',
    Monday: '#4361ee',
    Tuesday: '#f4721e',
    Wednesday: '#2dc653',
    Thursday: '#7b2d8b',
    Friday: '#f5c518',
    Saturday: '#0a0a0a',
  };

  const dayNames: Record<string, string> = {
    Sunday: 'Minggu',
    Monday: 'Senin',
    Tuesday: 'Selasa',
    Wednesday: 'Rabu',
    Thursday: 'Kamis',
    Friday: 'Jumat',
    Saturday: 'Sabtu',
  };

  return (
    <div className="max-w-7xl mx-auto px-3 py-5">
      <div className="flex items-center gap-3 mb-5">
        <Link to="/s/donghua/" className="nb-btn p-2 bg-white text-black">
          <ArrowLeft size={16} />
        </Link>
        <div className="w-10 h-10 bg-[#f5c518] border-2 border-black flex items-center justify-center shadow-[3px_3px_0_#0a0a0a]">
          <CalendarDays size={20} className="text-black" />
        </div>
        <div>
          <h1 className="font-black text-xl uppercase">Jadwal Donghua</h1>
          <p className="text-xs text-gray-600 font-mono">Donghua tayang minggu ini</p>
        </div>
      </div>

      {isLoading && (
        <div className="space-y-4">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="nb-card p-4 bg-white">
              <div className="skeleton h-6 w-24 mb-3" />
              <div className="flex gap-2 overflow-x-auto">
                {Array.from({ length: 5 }).map((_, j) => (
                  <div key={j} className="skeleton w-24 h-36 flex-shrink-0" />
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
            const dayName = dayNames[dayData.day] || dayData.day;
            return (
              <div key={dayData.day} className="nb-card bg-white overflow-hidden">
                <div
                  className="px-4 py-2.5 border-b-2 border-black"
                  style={{ background: color }}
                >
                  <h2 className="font-black uppercase text-sm" style={{ color: textColor }}>
                    {dayName}
                    <span className="ml-2 text-xs opacity-70 font-mono">
                      ({dayData.donghua_list?.length || 0} donghua)
                    </span>
                  </h2>
                </div>
                <div className="p-3">
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {(dayData.donghua_list || []).map((item: any) => (
                      <Link
                        key={item.slug}
                        to={`/s/donghua/detail/${item.slug}`}
                        className="flex-shrink-0 w-28 group"
                      >
                        <div className="nb-card overflow-hidden">
                          <div className="relative">
                            <img
                              src={item.poster}
                              alt={item.title}
                              className="w-full object-cover border-b-2 border-black group-hover:scale-105 transition-transform duration-200"
                              style={{ height: '130px', objectFit: 'cover' }}
                              loading="lazy"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEzMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEzMCIgZmlsbD0iI2UyZGVkNiIvPjwvc3ZnPg==';
                              }}
                            />
                            {item.episode && item.episode !== '??' && (
                              <div className="absolute bottom-1 left-1 bg-[#f5c518] border border-black px-1 py-0.5 text-xs font-black text-black">
                                Ep {item.episode}
                              </div>
                            )}
                          </div>
                          <div className="p-1.5">
                            <p className="text-xs font-bold line-clamp-2 leading-tight">{item.title}</p>
                            {item.release_time && (
                              <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-0.5 font-mono">
                                <Clock size={9} />
                                {item.release_time}
                              </p>
                            )}
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

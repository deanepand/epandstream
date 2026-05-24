import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchAnimeHome } from '../../services/api';
import AnimeCard from '../../components/AnimeCard';
import LoadingGrid from '../../components/LoadingGrid';
import SectionHeader from '../../components/SectionHeader';
import ErrorState from '../../components/ErrorState';
import { CalendarDays, TrendingUp, CheckCircle, Tv } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AnimeHomePage() {
  const [activeTab, setActiveTab] = useState<'ongoing' | 'completed'>('ongoing');

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['anime-home'],
    queryFn: fetchAnimeHome,
    staleTime: 5 * 60 * 1000,
  });

  const ongoing = data?.data?.ongoing?.animeList || [];
  const completed = data?.data?.completed?.animeList || [];

  return (
    <div className="max-w-7xl mx-auto px-3 py-5">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5 pb-3 border-b-2 border-black">
        <div className="w-10 h-10 bg-[#4361ee] border-2 border-black flex items-center justify-center shadow-[3px_3px_0_#0a0a0a]">
          <Tv size={20} className="text-white" />
        </div>
        <div>
          <h1 className="font-black text-xl uppercase">Anime</h1>
          <p className="text-xs text-gray-600 font-mono">Subtitle Indonesia</p>
        </div>
        <Link
          to="/s/anime/schedule"
          className="ml-auto nb-btn flex items-center gap-1.5 px-3 py-1.5 bg-[#f5c518] text-black text-xs"
        >
          <CalendarDays size={13} />
          Jadwal
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex border-2 border-black mb-5 overflow-hidden">
        <button
          onClick={() => setActiveTab('ongoing')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-black uppercase tracking-tight transition-all ${
            activeTab === 'ongoing'
              ? 'bg-[#4361ee] text-white'
              : 'bg-white text-black hover:bg-gray-100'
          }`}
        >
          <TrendingUp size={14} />
          Ongoing ({ongoing.length})
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-black uppercase tracking-tight transition-all border-l-2 border-black ${
            activeTab === 'completed'
              ? 'bg-[#2dc653] text-black'
              : 'bg-white text-black hover:bg-gray-100'
          }`}
        >
          <CheckCircle size={14} />
          Selesai ({completed.length})
        </button>
      </div>

      {isError && <ErrorState onRetry={refetch} />}

      {isLoading && <LoadingGrid count={15} />}

      {!isLoading && !isError && (
        <>
          {activeTab === 'ongoing' && (
            <section>
              <SectionHeader title={`Ongoing — ${ongoing.length} Anime`} accent="#4361ee" />
              {ongoing.length === 0 ? (
                <p className="text-center py-12 text-gray-500 font-bold">Tidak ada data</p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {ongoing.map((anime: any) => (
                    <AnimeCard
                      key={anime.animeId}
                      id={anime.animeId}
                      title={anime.title}
                      poster={anime.poster}
                      episodes={anime.episodes}
                      badge={anime.releaseDay}
                      type="anime"
                      href={anime.href}
                    />
                  ))}
                </div>
              )}
            </section>
          )}

          {activeTab === 'completed' && (
            <section>
              <SectionHeader title={`Selesai — ${completed.length} Anime`} accent="#2dc653" />
              {completed.length === 0 ? (
                <p className="text-center py-12 text-gray-500 font-bold">Tidak ada data</p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {completed.map((anime: any) => (
                    <AnimeCard
                      key={anime.animeId}
                      id={anime.animeId}
                      title={anime.title}
                      poster={anime.poster}
                      episodes={anime.episodes}
                      score={anime.score}
                      type="anime"
                      href={anime.href}
                    />
                  ))}
                </div>
              )}
            </section>
          )}
        </>
      )}
    </div>
  );
}

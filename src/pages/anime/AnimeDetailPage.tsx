import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchAnimeDetail } from '../../services/api';
import { useFavorites } from '../../hooks/useFavorites';
import {
  Star, Clock, Tv, Heart, ArrowLeft, Play, Calendar, 
  Layers, Users, Tag, ChevronDown, ChevronUp
} from 'lucide-react';
import { useState } from 'react';
import AnimeCard from '../../components/AnimeCard';
import ErrorState from '../../components/ErrorState';

export default function AnimeDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [showAllEps, setShowAllEps] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['anime-detail', slug],
    queryFn: () => fetchAnimeDetail(slug!),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });

  const anime = data?.data;

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-3 py-5">
        <div className="animate-pulse space-y-4">
          <div className="skeleton h-8 w-1/2" />
          <div className="flex gap-4">
            <div className="skeleton w-32 h-48 flex-shrink-0" />
            <div className="flex-1 space-y-3">
              <div className="skeleton h-4 w-full" />
              <div className="skeleton h-4 w-3/4" />
              <div className="skeleton h-4 w-1/2" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !anime) {
    return (
      <div className="max-w-4xl mx-auto px-3 py-5">
        <ErrorState onRetry={refetch} />
      </div>
    );
  }

  const isFav = isFavorite(slug || '');
  const episodeList = anime.episodeList || [];
  const displayedEps = showAllEps ? episodeList : episodeList.slice(0, 12);

  const handleFav = () => {
    toggleFavorite({
      id: slug || '',
      title: anime.title,
      poster: anime.poster,
      type: 'anime',
      addedAt: new Date().toISOString(),
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-3 py-5">
      {/* Back */}
      <Link
        to="/s/anime/"
        className="inline-flex items-center gap-1 text-sm font-bold mb-4 hover:text-[#4361ee] transition-colors"
      >
        <ArrowLeft size={15} />
        Kembali
      </Link>

      {/* Main Info */}
      <div className="nb-card p-4 mb-4 bg-white">
        <div className="flex gap-4">
          {/* Poster */}
          <div className="flex-shrink-0">
            <img
              src={anime.poster}
              alt={anime.title}
              className="w-28 sm:w-36 border-2 border-black shadow-[4px_4px_0_#0a0a0a]"
              style={{ aspectRatio: '3/4', objectFit: 'cover' }}
            />
            {/* Score */}
            {anime.score && (
              <div className="mt-2 flex items-center gap-1 bg-[#f5c518] border-2 border-black px-2 py-1 w-full justify-center">
                <Star size={13} fill="black" />
                <span className="font-black text-sm">{anime.score}</span>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h1 className="font-black text-base sm:text-xl leading-tight">{anime.title}</h1>
              <button
                onClick={handleFav}
                className={`flex-shrink-0 w-8 h-8 border-2 border-black flex items-center justify-center nb-btn ${
                  isFav ? 'bg-red-500 text-white' : 'bg-white text-black'
                }`}
              >
                <Heart size={14} fill={isFav ? 'white' : 'none'} />
              </button>
            </div>

            {anime.japanese && (
              <p className="text-gray-500 text-xs font-mono mb-2">{anime.japanese}</p>
            )}

            {/* Status & Type */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {anime.status && (
                <span
                  className={`nb-badge text-xs ${
                    anime.status.toLowerCase().includes('ongoing')
                      ? 'bg-green-400 text-black'
                      : 'bg-gray-200 text-black'
                  }`}
                >
                  {anime.status}
                </span>
              )}
              {anime.type && (
                <span className="nb-badge bg-[#4361ee] text-white">{anime.type}</span>
              )}
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
              {anime.episodes && (
                <div className="flex items-center gap-1">
                  <Layers size={11} className="text-gray-400 flex-shrink-0" />
                  <span className="text-gray-500">Episodes:</span>
                  <span className="font-bold">{anime.episodes}</span>
                </div>
              )}
              {anime.duration && (
                <div className="flex items-center gap-1">
                  <Clock size={11} className="text-gray-400 flex-shrink-0" />
                  <span className="text-gray-500">Durasi:</span>
                  <span className="font-bold">{anime.duration}</span>
                </div>
              )}
              {anime.aired && (
                <div className="flex items-center gap-1">
                  <Calendar size={11} className="text-gray-400 flex-shrink-0" />
                  <span className="text-gray-500">Tayang:</span>
                  <span className="font-bold">{anime.aired}</span>
                </div>
              )}
              {anime.studios && (
                <div className="flex items-center gap-1">
                  <Tv size={11} className="text-gray-400 flex-shrink-0" />
                  <span className="text-gray-500">Studio:</span>
                  <span className="font-bold truncate">{anime.studios}</span>
                </div>
              )}
              {anime.producers && (
                <div className="flex items-center gap-1 col-span-2">
                  <Users size={11} className="text-gray-400 flex-shrink-0" />
                  <span className="text-gray-500">Produser:</span>
                  <span className="font-bold truncate">{anime.producers}</span>
                </div>
              )}
            </div>

            {/* Genres */}
            {anime.genreList && anime.genreList.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                <Tag size={11} className="text-gray-400 mt-0.5" />
                {anime.genreList.map((g: any) => (
                  <span
                    key={g.genreId}
                    className="text-xs bg-[#f5c518] border border-black px-1.5 py-0.5 font-bold"
                  >
                    {g.title}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Synopsis */}
        {anime.synopsis?.paragraphs && anime.synopsis.paragraphs.length > 0 && (
          <div className="mt-4 pt-3 border-t-2 border-black">
            <h3 className="font-black text-sm uppercase mb-2">Sinopsis</h3>
            {anime.synopsis.paragraphs.map((p: string, i: number) => (
              <p key={i} className="text-sm text-gray-700 mb-2 leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        )}
      </div>

      {/* Episode List */}
      {episodeList.length > 0 && (
        <div className="nb-card bg-white mb-4">
          <div className="p-3 border-b-2 border-black flex items-center justify-between">
            <h2 className="font-black uppercase text-sm flex items-center gap-2">
              <Play size={14} />
              Daftar Episode ({episodeList.length})
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 p-3">
            {displayedEps.map((ep: any) => (
              <Link
                key={ep.episodeId}
                to={`/s/anime/episode/${ep.episodeId}`}
                className="nb-btn flex flex-col items-center justify-center p-2 bg-[#f5f0e8] text-black text-center hover:bg-[#f5c518] transition-colors"
              >
                <span className="font-black text-xs">Episode {ep.eps}</span>
                {ep.date && (
                  <span className="text-xs text-gray-500 mt-0.5 font-mono">{ep.date}</span>
                )}
              </Link>
            ))}
          </div>
          {episodeList.length > 12 && (
            <div className="p-3 pt-0">
              <button
                onClick={() => setShowAllEps(!showAllEps)}
                className="w-full nb-btn py-2 bg-[#0a0a0a] text-white text-sm flex items-center justify-center gap-2"
              >
                {showAllEps ? (
                  <>
                    <ChevronUp size={14} />
                    Sembunyikan
                  </>
                ) : (
                  <>
                    <ChevronDown size={14} />
                    Tampilkan {episodeList.length - 12} Episode Lainnya
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Recommended */}
      {anime.recommendedAnimeList && anime.recommendedAnimeList.length > 0 && (
        <div className="mb-4">
          <h2 className="font-black uppercase text-sm mb-3 flex items-center gap-2">
            <Star size={14} />
            Rekomendasi
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {anime.recommendedAnimeList.map((rec: any) => (
              <AnimeCard
                key={rec.animeId}
                id={rec.animeId}
                title={rec.title}
                poster={rec.poster}
                type="anime"
                href={rec.href}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

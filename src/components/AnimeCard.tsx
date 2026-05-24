import { Link } from 'react-router-dom';
import { Star, Clock, Heart } from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';

interface AnimeCardProps {
  id: string;
  title: string;
  poster: string;
  episodes?: number;
  score?: string;
  status?: string;
  badge?: string;
  href?: string;
  type?: 'anime' | 'donghua';
  currentEpisode?: string;
}

export default function AnimeCard({
  id,
  title,
  poster,
  episodes,
  score,
  status,
  badge,
  href,
  type = 'anime',
  currentEpisode,
}: AnimeCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const fav = isFavorite(id);

  const linkTo = href
    ? type === 'anime'
      ? `/s/anime/detail/${id}`
      : `/s/donghua/detail/${id}`
    : '#';

  const handleFav = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite({
      id,
      title,
      poster,
      type,
      href,
      addedAt: new Date().toISOString(),
    });
  };

  return (
    <Link to={linkTo} className="block group">
      <div className="nb-card overflow-hidden relative bg-white">
        {/* Poster */}
        <div className="relative overflow-hidden">
          <img
            src={poster}
            alt={title}
            className="anime-poster transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI4MCIgZmlsbD0iI2UyZGVkNiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjE0IiBmaWxsPSIjODA3YTcwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+Tm8gSW1hZ2U8L3RleHQ+PC9zdmc+';
            }}
          />
          {/* Favorite btn */}
          <button
            onClick={handleFav}
            className={`absolute top-2 right-2 w-7 h-7 flex items-center justify-center border-2 border-black transition-all z-10 ${
              fav ? 'bg-red-500 text-white' : 'bg-white text-black hover:bg-red-500 hover:text-white'
            }`}
          >
            <Heart size={12} fill={fav ? 'white' : 'none'} />
          </button>
          {/* Badge */}
          {badge && (
            <div className="absolute top-2 left-2 bg-[#f5c518] border-2 border-black px-1.5 py-0.5 text-xs font-black text-black">
              {badge}
            </div>
          )}
          {/* Episode badge */}
          {currentEpisode && (
            <div className="absolute bottom-2 left-2 bg-[#4361ee] border-2 border-black px-1.5 py-0.5 text-xs font-black text-white">
              {currentEpisode}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-2 border-t-2 border-black">
          <h3 className="text-xs font-bold leading-tight line-clamp-2 mb-1">{title}</h3>
          <div className="flex items-center justify-between gap-1 flex-wrap">
            {episodes !== undefined && (
              <span className="flex items-center gap-1 text-xs text-gray-600 font-medium">
                <Clock size={10} />
                {episodes} eps
              </span>
            )}
            {score && (
              <span className="flex items-center gap-0.5 bg-[#f5c518] border border-black px-1 text-xs font-black">
                <Star size={9} fill="black" />
                {score}
              </span>
            )}
            {status && (
              <span
                className={`text-xs font-bold px-1 border border-black ${
                  status.toLowerCase().includes('ongoing')
                    ? 'bg-green-400 text-black'
                    : 'bg-gray-200 text-black'
                }`}
              >
                {status}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

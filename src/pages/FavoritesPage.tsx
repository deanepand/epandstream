import { Link } from 'react-router-dom';
import { useFavorites } from '../hooks/useFavorites';
import { Heart, Trash2, Tv, Film, ArrowRight } from 'lucide-react';
import { FavoriteItem } from '../types';

export default function FavoritesPage() {
  const { favorites, removeFavorite } = useFavorites();

  const animeFavorites = favorites.filter((f) => f.type === 'anime');
  const donghuaFavorites = favorites.filter((f) => f.type === 'donghua');

  const FavCard = ({ item }: { item: FavoriteItem }) => (
    <div className="nb-card bg-white overflow-hidden group relative">
      <Link
        to={
          item.type === 'anime'
            ? `/s/anime/detail/${item.id}`
            : `/s/donghua/detail/${item.id}`
        }
      >
        <div className="relative overflow-hidden">
          <img
            src={item.poster}
            alt={item.title}
            className="w-full object-cover border-b-2 border-black group-hover:scale-105 transition-transform duration-200"
            style={{ height: '180px', objectFit: 'cover' }}
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE4MCIgZmlsbD0iI2UyZGVkNiIvPjwvc3ZnPg==';
            }}
          />
          <div className="absolute top-2 left-2">
            {item.type === 'anime' ? (
              <span className="nb-badge bg-[#4361ee] text-white text-xs">
                <Tv size={9} className="mr-0.5" />
                Anime
              </span>
            ) : (
              <span className="nb-badge bg-[#f5c518] text-black text-xs">
                <Film size={9} className="mr-0.5" />
                Donghua
              </span>
            )}
          </div>
        </div>
        <div className="p-2 pr-8">
          <h3 className="text-xs font-bold line-clamp-2 leading-tight">{item.title}</h3>
          <p className="text-xs text-gray-400 font-mono mt-0.5">
            {new Date(item.addedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
          </p>
        </div>
      </Link>
      {/* Remove button */}
      <button
        onClick={() => removeFavorite(item.id)}
        className="absolute bottom-2 right-2 w-6 h-6 bg-red-500 border-2 border-black flex items-center justify-center text-white hover:bg-red-600 transition-colors"
        title="Hapus dari favorit"
      >
        <Trash2 size={10} />
      </button>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-3 py-5">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5 pb-3 border-b-2 border-black">
        <div className="w-10 h-10 bg-red-500 border-2 border-black flex items-center justify-center shadow-[3px_3px_0_#0a0a0a]">
          <Heart size={20} className="text-white" fill="white" />
        </div>
        <div>
          <h1 className="font-black text-xl uppercase">Favorit</h1>
          <p className="text-xs text-gray-600 font-mono">
            {favorites.length} item tersimpan
          </p>
        </div>
        {favorites.length > 0 && (
          <span className="ml-auto font-mono font-black text-lg text-red-500">
            {favorites.length}
          </span>
        )}
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-20">
          <div className="nb-card inline-block p-8 bg-white mb-6">
            <Heart size={48} className="mx-auto text-gray-200 mb-4" strokeWidth={1.5} />
            <h2 className="font-black text-xl mb-2">Belum Ada Favorit</h2>
            <p className="text-gray-500 text-sm mb-4">
              Kamu belum menambahkan anime atau donghua ke favorit.
            </p>
            <p className="text-xs text-gray-400 mb-6">
              Tekan ikon hati pada kartu anime/donghua untuk menambahkan ke favorit.
            </p>
            <div className="flex gap-2 justify-center">
              <Link
                to="/s/anime/"
                className="nb-btn flex items-center gap-1.5 px-4 py-2 bg-[#4361ee] text-white text-sm"
              >
                <Tv size={14} />
                Jelajahi Anime
              </Link>
              <Link
                to="/s/donghua/"
                className="nb-btn flex items-center gap-1.5 px-4 py-2 bg-[#f5c518] text-black text-sm"
              >
                <Film size={14} />
                Jelajahi Donghua
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Anime Favorites */}
          {animeFavorites.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-6 bg-[#4361ee] border-2 border-black" />
                <h2 className="font-black uppercase text-sm flex items-center gap-2">
                  <Tv size={14} />
                  Anime Favorit ({animeFavorites.length})
                </h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {animeFavorites.map((item) => (
                  <FavCard key={item.id} item={item} />
                ))}
              </div>
            </section>
          )}

          {/* Donghua Favorites */}
          {donghuaFavorites.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-6 bg-[#f5c518] border-2 border-black" />
                <h2 className="font-black uppercase text-sm flex items-center gap-2">
                  <Film size={14} />
                  Donghua Favorit ({donghuaFavorites.length})
                </h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {donghuaFavorites.map((item) => (
                  <FavCard key={item.id} item={item} />
                ))}
              </div>
            </section>
          )}

          {/* Quick Links */}
          <div className="nb-card p-4 bg-white">
            <h3 className="font-black text-sm mb-3 uppercase">Temukan Lebih Banyak</h3>
            <div className="flex flex-wrap gap-2">
              <Link
                to="/s/anime/"
                className="nb-btn flex items-center gap-1.5 px-3 py-1.5 bg-[#4361ee] text-white text-xs"
              >
                <Tv size={12} />
                Anime
                <ArrowRight size={11} />
              </Link>
              <Link
                to="/s/donghua/"
                className="nb-btn flex items-center gap-1.5 px-3 py-1.5 bg-[#f5c518] text-black text-xs"
              >
                <Film size={12} />
                Donghua
                <ArrowRight size={11} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

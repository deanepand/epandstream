import { useState, useEffect } from 'react';
import { FavoriteItem } from '../types';

const STORAGE_KEY = 'epandstream_favorites';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (item: FavoriteItem) => {
    setFavorites(prev => {
      if (prev.find(f => f.id === item.id)) return prev;
      return [...prev, { ...item, addedAt: new Date().toISOString() }];
    });
  };

  const removeFavorite = (id: string) => {
    setFavorites(prev => prev.filter(f => f.id !== id));
  };

  const isFavorite = (id: string) => {
    return favorites.some(f => f.id === id);
  };

  const toggleFavorite = (item: FavoriteItem) => {
    if (isFavorite(item.id)) {
      removeFavorite(item.id);
    } else {
      addFavorite(item);
    }
  };

  return { favorites, addFavorite, removeFavorite, isFavorite, toggleFavorite };
};

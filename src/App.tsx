import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BottomNav from './components/BottomNav';
import { ToastProvider } from './components/Toast';

// Pages
import HomePage from './pages/HomePage';
import FavoritesPage from './pages/FavoritesPage';
import ComicPage from './pages/ComicPage';
import NovelPage from './pages/NovelPage';
import NotFoundPage from './pages/NotFoundPage';

// Anime Pages
import AnimeHomePage from './pages/anime/AnimeHomePage';
import AnimeDetailPage from './pages/anime/AnimeDetailPage';
import AnimeEpisodePage from './pages/anime/AnimeEpisodePage';
import AnimeSchedulePage from './pages/anime/AnimeSchedulePage';
import AnimeSearchPage from './pages/anime/AnimeSearchPage';

// Donghua Pages
import DonghuaHomePage from './pages/donghua/DonghuaHomePage';
import DonghuaSchedulePage from './pages/donghua/DonghuaSchedulePage';
import DonghuaSearchPage from './pages/donghua/DonghuaSearchPage';
import DonghuaGenresPage from './pages/donghua/DonghuaGenresPage';
import DonghuaEpisodePage from './pages/donghua/DonghuaEpisodePage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ToastProvider>
        <div className="min-h-screen flex flex-col bg-[#f5f0e8]">
          <Navbar />
          <main className="flex-1">
            <Routes>
              {/* Landing */}
              <Route path="/" element={<HomePage />} />

              {/* Favorites */}
              <Route path="/favorites" element={<FavoritesPage />} />

              {/* Comic - Maintenance */}
              <Route path="/s/comic/" element={<ComicPage />} />
              <Route path="/s/comic/*" element={<ComicPage />} />

              {/* Novel - Coming Soon */}
              <Route path="/s/novel/" element={<NovelPage />} />
              <Route path="/s/novel/*" element={<NovelPage />} />

              {/* Anime Routes */}
              <Route path="/s/anime/" element={<AnimeHomePage />} />
              <Route path="/s/anime/detail/:slug" element={<AnimeDetailPage />} />
              <Route path="/s/anime/episode/:episodeId" element={<AnimeEpisodePage />} />
              <Route path="/s/anime/schedule" element={<AnimeSchedulePage />} />
              <Route path="/s/anime/search" element={<AnimeSearchPage />} />

              {/* Donghua Routes */}
              <Route path="/s/donghua/" element={<DonghuaHomePage />} />
              <Route path="/s/donghua/schedule" element={<DonghuaSchedulePage />} />
              <Route path="/s/donghua/search" element={<DonghuaSearchPage />} />
              <Route path="/s/donghua/genres" element={<DonghuaGenresPage />} />
              <Route path="/s/donghua/episode/:slug" element={<DonghuaEpisodePage />} />
              <Route path="/s/donghua/detail/:slug" element={<DonghuaEpisodePage />} />

              {/* 404 */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
          <BottomNav />
          {/* Bottom spacing for mobile nav */}
          <div className="md:hidden h-16" />
        </div>
        </ToastProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

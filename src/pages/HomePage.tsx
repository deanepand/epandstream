import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchAnimeHome } from '../services/api';
import { 
  ChevronLeft, ChevronRight, Play, Tv, Film, BookOpen, BookMarked,
  Clock, Star, Users, Zap, Shield, Globe, Code2, Server, ArrowRight,
  CalendarDays, TrendingUp
} from 'lucide-react';
import AnimeCard from '../components/AnimeCard';
import SectionHeader from '../components/SectionHeader';

const HERO_BANNERS = [
  {
    id: 'slime-s4',
    title: 'Tensei shitara Slime Datta Ken S4',
    description: 'Petualangan Rimuru Tempest berlanjut dalam season keempat yang epik!',
    poster: 'https://otakudesu.blog/wp-content/uploads/2026/04/156389.jpg',
    badge: 'NEW',
    genre: 'Isekai • Fantasy • Action',
    episode: 'Eps 7',
    href: '/s/anime/detail/slime-s4-sub-indo',
  },
  {
    id: 're-zero-s4',
    title: 'Re:Zero kara Hajimeru Isekai Seikatsu S4',
    description: 'Subaru kembali dengan petualangan baru yang lebih mendebarkan dari sebelumnya!',
    poster: 'https://otakudesu.blog/wp-content/uploads/2026/04/s4.jpg',
    badge: 'HOT',
    genre: 'Isekai • Drama • Fantasy',
    episode: 'Eps 8',
    href: '/s/anime/detail/re-zero-kara-s4-sub-indo',
  },
  {
    id: 'iruma-s4',
    title: 'Mairimashita! Iruma-kun Season 4',
    description: 'Iruma-kun kembali dengan petualangan seru di dunia iblis!',
    poster: 'https://otakudesu.blog/wp-content/uploads/2026/04/Mairimashita-Iruma-kun-Season-4.jpg',
    badge: 'ONGOING',
    genre: 'Comedy • Fantasy • Shounen',
    episode: 'Eps 8',
    href: '/s/anime/detail/iruma-kun-s4-sub-indo',
  },
  {
    id: 'yomi-tsugai',
    title: 'Yomi no Tsugai',
    description: 'Sebuah petualangan gelap tentang saudara yang terpisah di dunia yang penuh misteri.',
    poster: 'https://otakudesu.blog/wp-content/uploads/2026/04/156397.jpg',
    badge: 'TRENDING',
    genre: 'Action • Mystery • Shounen',
    episode: 'Eps 8',
    href: '/s/anime/detail/yomi-tsugai-sub-indo',
  },
  {
    id: 'kill-ao',
    title: 'Kill Ao',
    description: 'Aksi seru dan penuh darah dalam dunia kriminal yang tidak kenal ampun.',
    poster: 'https://otakudesu.blog/wp-content/uploads/2026/04/156600.jpg',
    badge: 'NEW',
    genre: 'Action • Thriller',
    episode: 'Eps 7',
    href: '/s/anime/detail/kill-ao-sub-indo',
  },
];

const SECTION_CARDS = [
  {
    title: 'Anime',
    desc: 'Ribuan judul anime sub Indonesia',
    path: '/s/anime/',
    icon: Tv,
    color: '#4361ee',
    textColor: 'white',
    status: 'LIVE',
  },
  {
    title: 'Donghua',
    desc: 'Animasi China terlengkap',
    path: '/s/donghua/',
    icon: Film,
    color: '#f5c518',
    textColor: 'black',
    status: 'LIVE',
  },
  {
    title: 'Comic',
    desc: 'Baca komik favorit kamu',
    path: '/s/comic/',
    icon: BookOpen,
    color: '#e63946',
    textColor: 'white',
    status: 'SOON',
  },
  {
    title: 'Novel',
    desc: 'Light novel & web novel',
    path: '/s/novel/',
    icon: BookMarked,
    color: '#2dc653',
    textColor: 'black',
    status: 'SOON',
  },
];

const TECH_STACK = [
  { name: 'React 18', desc: 'UI Framework', icon: Code2 },
  { name: 'Vite', desc: 'Build Tool', icon: Zap },
  { name: 'Tailwind CSS', desc: 'Styling', icon: Shield },
  { name: 'TypeScript', desc: 'Type Safety', icon: Code2 },
  { name: 'React Query', desc: 'Data Fetching', icon: Server },
  { name: 'React Router', desc: 'Navigation', icon: Globe },
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const autoplayRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { data: homeData } = useQuery({
    queryKey: ['anime-home'],
    queryFn: fetchAnimeHome,
    staleTime: 5 * 60 * 1000,
  });

  const ongoingAnime = homeData?.data?.ongoing?.animeList?.slice(0, 10) || [];
  const completedAnime = homeData?.data?.completed?.animeList?.slice(0, 10) || [];

  // Autoplay
  useEffect(() => {
    if (isAutoplay) {
      autoplayRef.current = setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % HERO_BANNERS.length);
      }, 5000);
    }
    return () => {
      if (autoplayRef.current) clearTimeout(autoplayRef.current);
    };
  }, [currentSlide, isAutoplay]);

  const goToSlide = (idx: number) => {
    setIsAutoplay(false);
    setCurrentSlide(idx);
    setTimeout(() => setIsAutoplay(true), 8000);
  };

  const prevSlide = () => goToSlide((currentSlide - 1 + HERO_BANNERS.length) % HERO_BANNERS.length);
  const nextSlide = () => goToSlide((currentSlide + 1) % HERO_BANNERS.length);

  // banner is used for future reference if needed

  return (
    <div className="min-h-screen">
      {/* Hero Slider */}
      <div className="relative overflow-hidden border-b-4 border-black" style={{ minHeight: '380px' }}>
        {/* Slides */}
        <div
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {HERO_BANNERS.map((slide) => (
            <div key={slide.id} className="min-w-full relative" style={{ minHeight: '380px' }}>
              {/* Background image */}
              <div className="absolute inset-0">
                <img
                  src={slide.poster}
                  alt={slide.title}
                  className="w-full h-full object-cover object-center"
                  style={{ filter: 'brightness(0.4)' }}
                />
              </div>
              {/* Content overlay */}
              <div className="relative z-10 flex items-end h-full" style={{ minHeight: '380px' }}>
                <div className="flex flex-col md:flex-row items-end md:items-center gap-4 p-4 md:p-8 w-full">
                  {/* Poster - hidden on mobile */}
                  <div className="hidden md:block flex-shrink-0">
                    <img
                      src={slide.poster}
                      alt={slide.title}
                      className="w-36 h-52 object-cover border-4 border-[#f5c518] shadow-[6px_6px_0_#0a0a0a]"
                    />
                  </div>
                  {/* Text */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-[#f5c518] text-black text-xs font-black px-2 py-0.5 border-2 border-black">
                        {slide.badge}
                      </span>
                      <span className="text-white/70 text-xs font-mono">{slide.episode}</span>
                    </div>
                    <h1 className="text-xl md:text-3xl font-black text-white leading-tight mb-2 drop-shadow-lg">
                      {slide.title}
                    </h1>
                    <p className="text-white/80 text-sm mb-2 max-w-lg line-clamp-2">{slide.description}</p>
                    <p className="text-[#f5c518] text-xs font-mono mb-4">{slide.genre}</p>
                    <div className="flex items-center gap-2">
                      <Link
                        to={slide.href}
                        className="flex items-center gap-2 px-4 py-2 bg-[#f5c518] text-black font-black text-sm border-2 border-white hover:bg-yellow-400 transition-all nb-btn"
                      >
                        <Play size={14} fill="black" />
                        Tonton Sekarang
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Nav Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 bg-black/70 border-2 border-white text-white flex items-center justify-center hover:bg-[#f5c518] hover:text-black hover:border-black transition-all"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 bg-black/70 border-2 border-white text-white flex items-center justify-center hover:bg-[#f5c518] hover:text-black hover:border-black transition-all"
        >
          <ChevronRight size={18} />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {HERO_BANNERS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`border-2 border-white transition-all ${
                idx === currentSlide
                  ? 'w-6 h-3 bg-[#f5c518]'
                  : 'w-3 h-3 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Marquee */}
      <div className="bg-[#f5c518] border-y-2 border-black py-2 overflow-hidden">
        <div className="marquee text-black text-xs font-black uppercase tracking-widest">
          {Array(6).fill(['ANIME', 'DONGHUA', 'SUB INDONESIA', 'GRATIS', 'HD QUALITY', 'UPDATE SETIAP HARI']).flat().map((t, i) => (
            <span key={i} className="mx-6">{t} •</span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 py-6">
        {/* Section Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {SECTION_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <Link key={card.path} to={card.path}>
                <div
                  className="nb-card p-4 relative overflow-hidden"
                  style={{ background: card.color, color: card.textColor }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <Icon size={24} />
                    <span
                      className={`text-xs font-black px-1.5 py-0.5 border-2 ${
                        card.status === 'LIVE'
                          ? 'bg-green-400 border-black text-black'
                          : 'bg-white/20 border-white/40 text-white'
                      }`}
                    >
                      {card.status}
                    </span>
                  </div>
                  <h3 className="font-black text-base">{card.title}</h3>
                  <p className="text-xs opacity-80 mt-0.5">{card.desc}</p>
                  <div className="flex items-center gap-1 mt-2 text-xs font-bold opacity-80">
                    <span>Jelajahi</span>
                    <ArrowRight size={11} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Ongoing Anime */}
        {ongoingAnime.length > 0 && (
          <section className="mb-8">
            <SectionHeader
              title="Anime Ongoing"
              viewAllLink="/s/anime/"
              accent="#4361ee"
            />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {ongoingAnime.map((anime: any) => (
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
          </section>
        )}

        {/* Completed Anime */}
        {completedAnime.length > 0 && (
          <section className="mb-8">
            <SectionHeader
              title="Anime Selesai"
              viewAllLink="/s/anime/"
              accent="#2dc653"
            />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {completedAnime.map((anime: any) => (
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
          </section>
        )}

        {/* Donghua Section */}
        <section className="mb-8">
          <SectionHeader title="Donghua" viewAllLink="/s/donghua/" accent="#f5c518" />
          <div className="nb-card p-6 text-center bg-white relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: 'repeating-linear-gradient(45deg, #f5c518, #f5c518 5px, transparent 5px, transparent 25px)',
              }}
            />
            <div className="relative z-10">
              <Film size={40} className="mx-auto mb-3 text-[#f5c518]" strokeWidth={2.5} />
              <h3 className="font-black text-xl mb-2">Donghua - Animasi China</h3>
              <p className="text-gray-600 text-sm mb-4">Nonton donghua favorit kamu dengan subtitle Indonesia</p>
              <Link
                to="/s/donghua/"
                className="nb-btn inline-flex items-center gap-2 px-4 py-2 bg-[#f5c518] text-black text-sm"
              >
                <Play size={14} />
                Mulai Nonton Donghua
              </Link>
            </div>
          </div>
        </section>

        {/* Comic & Novel Coming Soon */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Comic */}
          <div className="nb-card overflow-hidden">
            <div className="p-4 bg-[#e63946] text-white border-b-2 border-black flex items-center gap-2">
              <BookOpen size={20} />
              <span className="font-black text-base">Comic</span>
              <span className="ml-auto bg-black text-white text-xs font-black px-2 py-0.5 border border-white">
                COMING SOON
              </span>
            </div>
            <div className="p-6 text-center">
              <div className="coming-soon-bg border-2 border-black p-4 mb-4 inline-block">
                <BookOpen size={32} className="text-white" />
              </div>
              <p className="font-bold text-sm text-gray-600">
                Fitur baca komik sedang dalam pengembangan. Segera hadir!
              </p>
              <Link
                to="/s/comic/"
                className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[#e63946] hover:underline"
              >
                Info lebih lanjut <ArrowRight size={11} />
              </Link>
            </div>
          </div>

          {/* Novel */}
          <div className="nb-card overflow-hidden">
            <div className="p-4 bg-[#2dc653] text-black border-b-2 border-black flex items-center gap-2">
              <BookMarked size={20} />
              <span className="font-black text-base">Novel</span>
              <span className="ml-auto bg-black text-white text-xs font-black px-2 py-0.5 border border-white">
                COMING SOON
              </span>
            </div>
            <div className="p-6 text-center">
              <div className="coming-soon-bg border-2 border-black p-4 mb-4 inline-block">
                <BookMarked size={32} className="text-white" />
              </div>
              <p className="font-bold text-sm text-gray-600">
                Fitur baca novel sedang dalam pengembangan. Segera hadir!
              </p>
              <Link
                to="/s/novel/"
                className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[#2dc653] hover:underline"
              >
                Info lebih lanjut <ArrowRight size={11} />
              </Link>
            </div>
          </div>
        </div>

        {/* Website Info */}
        <section className="mb-8">
          <SectionHeader title="Tentang Website" accent="#7b2d8b" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Website Info */}
            <div className="nb-card p-5 bg-white">
              <h3 className="font-black text-base mb-4 uppercase border-b-2 border-black pb-2 flex items-center gap-2">
                <Globe size={16} />
                Informasi Website
              </h3>
              <div className="space-y-2">
                {[
                  { label: 'Nama', value: 'EpanDStream' },
                  { label: 'Versi', value: 'v1.0.0' },
                  { label: 'Developer', value: 'EpanD Team' },
                  { label: 'Release', value: '2026' },
                  { label: 'API Provider', value: 'Sanka Vollerei' },
                  { label: 'Bahasa', value: 'Indonesia' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center gap-2 text-sm border-b border-black/10 pb-1">
                    <span className="font-black text-xs w-24 text-gray-500 uppercase">{label}</span>
                    <span className="font-mono font-bold text-[#4361ee]">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div className="nb-card p-5 bg-white">
              <h3 className="font-black text-base mb-4 uppercase border-b-2 border-black pb-2 flex items-center gap-2">
                <Code2 size={16} />
                Tech Stack
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {TECH_STACK.map((tech) => {
                  const Icon = tech.icon;
                  return (
                    <div
                      key={tech.name}
                      className="border-2 border-black p-2 bg-[#f5f0e8] flex items-start gap-2"
                    >
                      <div className="w-6 h-6 bg-black text-[#f5c518] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon size={12} />
                      </div>
                      <div>
                        <p className="font-black text-xs">{tech.name}</p>
                        <p className="text-xs text-gray-500">{tech.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Anime Tersedia', value: '5000+', icon: Tv, color: '#4361ee' },
              { label: 'Donghua Tersedia', value: '1000+', icon: Film, color: '#f5c518' },
              { label: 'Update Harian', value: '24/7', icon: CalendarDays, color: '#2dc653' },
              { label: 'Pengguna Aktif', value: '100K+', icon: Users, color: '#e63946' },
            ].map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="nb-card p-4 bg-white text-center">
                <div
                  className="w-10 h-10 border-2 border-black mx-auto mb-2 flex items-center justify-center"
                  style={{ background: color }}
                >
                  <Icon size={18} className={color === '#f5c518' || color === '#2dc653' ? 'text-black' : 'text-white'} />
                </div>
                <p className="font-black text-xl font-mono">{value}</p>
                <p className="text-xs text-gray-600 font-medium">{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="mb-4">
          <SectionHeader title="Fitur Unggulan" accent="#f5c518" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { icon: Zap, title: 'Loading Cepat', desc: 'Optimized untuk koneksi lambat', color: '#f5c518' },
              { icon: Shield, title: 'Tanpa Iklan', desc: 'Pengalaman nonton yang nyaman', color: '#2dc653' },
              { icon: TrendingUp, title: 'Update Harian', desc: 'Anime terbaru setiap hari', color: '#4361ee' },
              { icon: Globe, title: 'Sub Indonesia', desc: 'Semua subtitle dalam Bahasa Indonesia', color: '#e63946' },
              { icon: Star, title: 'Multi Server', desc: 'Berbagai pilihan server streaming', color: '#7b2d8b' },
              { icon: Clock, title: 'History Watch', desc: 'Simpan progress tontonanmu', color: '#f4721e' },
            ].map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="nb-card p-4 bg-white flex items-start gap-3">
                <div
                  className="w-9 h-9 border-2 border-black flex items-center justify-center flex-shrink-0"
                  style={{ background: color }}
                >
                  <Icon size={16} className={['#f5c518', '#2dc653', '#f4721e'].includes(color) ? 'text-black' : 'text-white'} />
                </div>
                <div>
                  <h4 className="font-black text-sm">{title}</h4>
                  <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

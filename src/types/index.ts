export interface AnimeItem {
  title: string;
  poster: string;
  episodes?: number;
  releaseDay?: string;
  latestReleaseDate?: string;
  animeId?: string;
  href?: string;
  score?: string;
  lastReleaseDate?: string;
  status?: string;
}

export interface AnimeDetail {
  title: string;
  poster: string;
  japanese?: string;
  score?: string;
  producers?: string;
  type?: string;
  status?: string;
  episodes?: number | null;
  duration?: string;
  aired?: string;
  studios?: string;
  batch?: null;
  synopsis?: {
    paragraphs: string[];
    connections: any[];
  };
  genreList?: Genre[];
  episodeList?: Episode[];
  recommendedAnimeList?: AnimeItem[];
}

export interface Genre {
  title: string;
  genreId: string;
  href?: string;
}

export interface Episode {
  title: string;
  eps: number;
  date?: string;
  episodeId?: string;
  href?: string;
  otakudesuUrl?: string;
}

export interface EpisodeData {
  title: string;
  animeId?: string;
  releaseTime?: string;
  defaultStreamingUrl?: string;
  hasPrevEpisode?: boolean;
  prevEpisode?: { title: string; episodeId: string; href: string };
  hasNextEpisode?: boolean;
  nextEpisode?: { title: string; episodeId: string; href: string };
  server?: {
    qualities: Quality[];
  };
  downloadUrl?: {
    qualities: DownloadQuality[];
  };
  info?: {
    credit?: string;
    encoder?: string;
    duration?: string;
    type?: string;
    genreList?: Genre[];
    episodeList?: Episode[];
  };
}

export interface Quality {
  title: string;
  serverList: Server[];
}

export interface Server {
  title: string;
  serverId: string;
  href?: string;
}

export interface DownloadQuality {
  title: string;
  size?: string;
  urls: DownloadUrl[];
}

export interface DownloadUrl {
  title: string;
  url: string;
}

export interface ScheduleDay {
  day: string;
  anime_list: ScheduleAnime[];
}

export interface ScheduleAnime {
  title: string;
  slug: string;
  url?: string;
  poster: string;
}

export interface DonghuaItem {
  title: string;
  slug: string;
  poster: string;
  status?: string;
  type?: string;
  current_episode?: string;
  href?: string;
  episode?: string;
  release_time?: string;
}

export interface DonghuaScheduleDay {
  day: string;
  donghua_list: DonghuaItem[];
}

export interface FavoriteItem {
  id: string;
  title: string;
  poster: string;
  type: 'anime' | 'donghua';
  href?: string;
  addedAt: string;
}

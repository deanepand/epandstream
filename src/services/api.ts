import axios from 'axios';

const BASE_URL = 'https://www.sankavollerei.com/anime';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
});

// ============ ANIME APIs ============

export const fetchAnimeHome = async () => {
  const res = await api.get('/home');
  return res.data;
};

export const fetchAnimeSchedule = async () => {
  const res = await api.get('/schedule');
  return res.data;
};

export const fetchAnimeDetail = async (slug: string) => {
  const res = await api.get(`/anime/${slug}`);
  return res.data;
};

export const fetchAnimeSearch = async (query: string) => {
  const res = await api.get(`/search/${encodeURIComponent(query)}`);
  return res.data;
};

export const fetchAnimeEpisode = async (episodeId: string) => {
  const res = await api.get(`/episode/${episodeId}`);
  return res.data;
};

export const fetchAnimeServer = async (serverId: string) => {
  const res = await api.get(`/server/${serverId}`);
  return res.data;
};

export const fetchAnimeUnlimited = async () => {
  const res = await api.get('/unlimited');
  return res.data;
};

// ============ DONGHUA APIs ============

export const fetchDonghuaHome = async (page: number = 1) => {
  const res = await api.get(`/donghua/home/${page}`);
  return res.data;
};

export const fetchDonghuaSchedule = async () => {
  const res = await api.get('/donghua/schedule');
  return res.data;
};

export const fetchDonghuaSearch = async (query: string) => {
  const res = await api.get(`/donghua/search/${encodeURIComponent(query)}`);
  return res.data;
};

export const fetchDonghuaGenres = async () => {
  const res = await api.get('/donghua/genres');
  return res.data;
};

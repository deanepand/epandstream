import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchAnimeEpisode, fetchAnimeServer } from '../../services/api';
import { useState } from 'react';
import {
  ArrowLeft, ArrowRight, Play, Download, Server, 
  Clock, Tag, ChevronDown, ChevronUp, ExternalLink, Monitor
} from 'lucide-react';
import ErrorState from '../../components/ErrorState';

export default function AnimeEpisodePage() {
  const { episodeId } = useParams<{ episodeId: string }>();
  const [selectedServer, setSelectedServer] = useState<string>('');
  const [streamUrl, setStreamUrl] = useState<string>('');
  const [showDownload, setShowDownload] = useState(false);
  const [loadingServer, setLoadingServer] = useState(false);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['anime-episode', episodeId],
    queryFn: async () => {
      const result = await fetchAnimeEpisode(episodeId!);
      const defaultUrl = result?.data?.defaultStreamingUrl;
      if (defaultUrl && !streamUrl) setStreamUrl(defaultUrl);
      return result;
    },
    enabled: !!episodeId,
    staleTime: 5 * 60 * 1000,
  });

  const ep = (data as any)?.data;

  const handleServerClick = async (serverId: string) => {
    try {
      setLoadingServer(true);
      setSelectedServer(serverId);
      const res = await fetchAnimeServer(serverId);
      if (res?.data?.url) {
        setStreamUrl(res.data.url);
      }
    } catch (e) {
      console.error('Server fetch failed', e);
    } finally {
      setLoadingServer(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-3 py-5 space-y-3">
        <div className="skeleton h-6 w-1/2" />
        <div className="skeleton w-full" style={{ paddingTop: '56.25%' }} />
        <div className="skeleton h-20 w-full" />
      </div>
    );
  }

  if (isError || !ep) {
    return (
      <div className="max-w-4xl mx-auto px-3 py-5">
        <ErrorState onRetry={refetch} />
      </div>
    );
  }

  const currentStreamUrl = streamUrl || ep.defaultStreamingUrl || '';
  const qualities = ep.server?.qualities || [];
  const downloadQualities = ep.downloadUrl?.qualities || [];

  return (
    <div className="max-w-4xl mx-auto px-3 py-5">
      {/* Back */}
      <Link
        to="/s/anime/"
        className="inline-flex items-center gap-1 text-sm font-bold mb-3 hover:text-[#4361ee] transition-colors"
      >
        <ArrowLeft size={15} />
        Kembali
      </Link>

      {/* Title */}
      <div className="nb-card p-3 bg-white mb-4">
        <div className="flex items-start justify-between gap-2">
          <h1 className="font-black text-sm sm:text-base leading-tight">{ep.title}</h1>
        </div>
        {ep.releaseTime && (
          <p className="text-xs text-gray-500 mt-1 flex items-center gap-1 font-mono">
            <Clock size={10} />
            {ep.releaseTime}
          </p>
        )}
      </div>

      {/* Video Player */}
      {currentStreamUrl && (
        <div className="nb-card mb-4 overflow-hidden bg-black">
          <div className="relative" style={{ paddingTop: '56.25%' }}>
            <iframe
              src={currentStreamUrl}
              className="absolute inset-0 w-full h-full"
              allowFullScreen
              allow="autoplay; fullscreen"
              title={ep.title}
              scrolling="no"
            />
          </div>
          {loadingServer && (
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-10">
              <div className="text-white font-black text-sm animate-pulse">Memuat server...</div>
            </div>
          )}
        </div>
      )}

      {/* Prev / Next Nav */}
      <div className="flex gap-2 mb-4">
        {ep.hasPrevEpisode && ep.prevEpisode && (
          <Link
            to={`/s/anime/episode/${ep.prevEpisode.episodeId}`}
            className="nb-btn flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-[#f5f0e8] text-black text-sm hover:bg-[#f5c518] transition-colors"
          >
            <ArrowLeft size={14} />
            Episode Sebelumnya
          </Link>
        )}
        {ep.hasNextEpisode && ep.nextEpisode && (
          <Link
            to={`/s/anime/episode/${ep.nextEpisode.episodeId}`}
            className="nb-btn flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-[#4361ee] text-white text-sm hover:bg-blue-600 transition-colors"
          >
            Episode Berikutnya
            <ArrowRight size={14} />
          </Link>
        )}
      </div>

      {/* Server Selection */}
      {qualities.length > 0 && (
        <div className="nb-card bg-white mb-4">
          <div className="p-3 border-b-2 border-black">
            <h3 className="font-black text-sm flex items-center gap-2">
              <Monitor size={14} />
              Pilih Server Streaming
            </h3>
          </div>
          <div className="p-3 space-y-3">
            {qualities.map((q: any) => (
              q.serverList.length > 0 && (
                <div key={q.title}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="nb-badge bg-[#f5c518] text-black text-xs">{q.title}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {q.serverList.map((srv: any) => (
                      <button
                        key={srv.serverId}
                        onClick={() => {
                          handleServerClick(srv.serverId);
                        }}
                        className={`nb-btn flex items-center gap-1.5 px-3 py-1.5 text-xs ${
                          selectedServer === srv.serverId
                            ? 'bg-[#4361ee] text-white border-[#4361ee]'
                            : 'bg-white text-black hover:bg-[#f5f0e8]'
                        }`}
                      >
                        <Server size={10} />
                        {srv.title.trim()}
                      </button>
                    ))}
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      )}

      {/* Episode List Sidebar */}
      {ep.info?.episodeList && ep.info.episodeList.length > 0 && (
        <div className="nb-card bg-white mb-4">
          <div className="p-3 border-b-2 border-black flex items-center justify-between">
            <h3 className="font-black text-sm flex items-center gap-2">
              <Play size={14} />
              Daftar Episode
            </h3>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 p-3 max-h-48 overflow-y-auto">
            {ep.info.episodeList.map((e: any) => (
              <Link
                key={e.episodeId}
                to={`/s/anime/episode/${e.episodeId}`}
                className={`nb-btn text-center py-2 text-xs font-black transition-colors ${
                  e.episodeId === episodeId
                    ? 'bg-[#4361ee] text-white border-[#4361ee]'
                    : 'bg-[#f5f0e8] text-black hover:bg-[#f5c518]'
                }`}
              >
                Ep {e.eps}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Genre & Info */}
      {ep.info && (
        <div className="nb-card bg-white mb-4 p-3">
          <div className="flex flex-wrap gap-2 text-xs">
            {ep.info.duration && (
              <span className="flex items-center gap-1 text-gray-600">
                <Clock size={10} />
                {ep.info.duration}
              </span>
            )}
            {ep.info.type && (
              <span className="nb-badge bg-[#4361ee] text-white">{ep.info.type}</span>
            )}
            {ep.info.credit && (
              <span className="text-gray-500">Credit: <strong>{ep.info.credit}</strong></span>
            )}
          </div>
          {ep.info.genreList && ep.info.genreList.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              <Tag size={11} className="text-gray-400 mt-0.5" />
              {ep.info.genreList.map((g: any) => (
                <span key={g.genreId} className="text-xs bg-[#f5c518] border border-black px-1.5 py-0.5 font-bold">
                  {g.title}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Download */}
      {downloadQualities.length > 0 && (
        <div className="nb-card bg-white mb-4">
          <button
            onClick={() => setShowDownload(!showDownload)}
            className="w-full p-3 flex items-center justify-between hover:bg-[#f5f0e8] transition-colors border-b-2 border-black"
          >
            <span className="font-black text-sm flex items-center gap-2">
              <Download size={14} />
              Download Episode
            </span>
            {showDownload ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>

          {showDownload && (
            <div className="p-3 space-y-3">
              {downloadQualities.map((q: any) => (
                q.urls && q.urls.length > 0 && (
                  <div key={q.title}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="nb-badge bg-black text-white text-xs">{q.title}</span>
                      {q.size && <span className="text-xs text-gray-500 font-mono">{q.size}</span>}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {q.urls.map((url: any) => (
                        <a
                          key={url.title}
                          href={url.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="nb-btn flex items-center gap-1 px-2.5 py-1 bg-[#f5f0e8] text-black text-xs hover:bg-[#f5c518] transition-colors"
                        >
                          <ExternalLink size={10} />
                          {url.title}
                        </a>
                      ))}
                    </div>
                  </div>
                )
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

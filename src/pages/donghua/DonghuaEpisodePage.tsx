import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Film, ExternalLink } from 'lucide-react';

export default function DonghuaEpisodePage() {
  const { slug } = useParams<{ slug: string }>();

  const cleanTitle = slug
    ? slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
    : 'Episode';

  return (
    <div className="max-w-4xl mx-auto px-3 py-5">
      <Link
        to="/s/donghua/"
        className="inline-flex items-center gap-1 text-sm font-bold mb-4 hover:text-[#f5c518] transition-colors"
      >
        <ArrowLeft size={15} />
        Kembali ke Donghua
      </Link>

      <div className="nb-card p-4 bg-white mb-4">
        <div className="flex items-center gap-2 mb-1">
          <Film size={16} className="text-[#f5c518]" />
          <h1 className="font-black text-base">{cleanTitle}</h1>
        </div>
        <p className="text-xs text-gray-500 font-mono">Subtitle Indonesia</p>
      </div>

      {/* Player placeholder */}
      <div className="nb-card bg-black mb-4 overflow-hidden">
        <div className="flex flex-col items-center justify-center text-white py-16 px-4 text-center">
          <div className="w-14 h-14 bg-[#f5c518] border-2 border-white flex items-center justify-center mb-4">
            <Film size={28} className="text-black" />
          </div>
          <p className="font-black text-base mb-2">Streaming Donghua</p>
          <p className="text-sm text-white/70 mb-4">
            Untuk menonton episode ini, silakan kunjungi sumber resmi.
          </p>
          <a
            href={`https://anichin.cafe/${slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="nb-btn flex items-center gap-2 px-4 py-2 bg-[#f5c518] text-black text-sm"
          >
            <ExternalLink size={14} />
            Tonton di Anichin
          </a>
        </div>
      </div>

      <div className="nb-card p-4 bg-white">
        <h3 className="font-black text-sm mb-2">Tentang Episode</h3>
        <p className="text-xs text-gray-600">
          Fitur streaming donghua langsung sedang dalam pengembangan. Saat ini, kamu bisa menonton melalui sumber aslinya.
        </p>
      </div>
    </div>
  );
}

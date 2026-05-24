import { Link } from 'react-router-dom';
import { BookMarked, ArrowLeft, Wrench, Clock, Bell } from 'lucide-react';

export default function NovelPage() {
  return (
    <div className="max-w-2xl mx-auto px-3 py-10">
      <div className="flex items-center gap-2 mb-8">
        <Link to="/" className="nb-btn p-2 bg-white text-black">
          <ArrowLeft size={16} />
        </Link>
        <span className="text-sm font-bold text-gray-600">Kembali ke Home</span>
      </div>

      {/* Maintenance Card */}
      <div className="nb-card overflow-hidden">
        {/* Stripe header */}
        <div
          className="h-8 border-b-2 border-black"
          style={{
            background: 'repeating-linear-gradient(45deg, #2dc653, #2dc653 10px, #0a0a0a 10px, #0a0a0a 20px)',
          }}
        />

        <div className="p-6 md:p-10 text-center bg-white">
          <div className="w-20 h-20 bg-[#2dc653] border-4 border-black shadow-[6px_6px_0_#0a0a0a] mx-auto mb-6 flex items-center justify-center">
            <BookMarked size={36} className="text-black" />
          </div>

          <div className="inline-flex items-center gap-2 bg-[#2dc653] border-2 border-black px-3 py-1 mb-4">
            <Wrench size={14} className="text-black" />
            <span className="text-black font-black text-sm uppercase tracking-wide">Coming Soon</span>
          </div>

          <h1 className="font-black text-3xl md:text-4xl uppercase mb-3">Novel</h1>
          <p className="text-gray-600 text-base mb-6 leading-relaxed">
            Halaman baca novel & light novel sedang dalam proses pengembangan. Segera hadir dengan koleksi novel terlengkap!
          </p>

          {/* Status */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            {[
              { label: 'Progress', value: '20%', color: '#2dc653' },
              { label: 'Status', value: 'Dev', color: '#f4721e' },
              { label: 'Target', value: 'Q4 2026', color: '#4361ee' },
            ].map(({ label, value, color }) => (
              <div key={label} className="border-2 border-black p-3" style={{ background: color + '20' }}>
                <p className="font-black text-lg font-mono">{value}</p>
                <p className="text-xs text-gray-600 font-bold uppercase">{label}</p>
              </div>
            ))}
          </div>

          {/* Features Coming */}
          <div className="text-left mb-6">
            <h3 className="font-black text-sm uppercase mb-3 flex items-center gap-2">
              <Clock size={14} />
              Fitur yang akan hadir:
            </h3>
            <ul className="space-y-2">
              {[
                'Baca light novel & web novel',
                'Bookmark chapter favorit',
                'Mode membaca yang nyaman',
                'Notifikasi chapter baru',
                'Komentar & diskusi',
              ].map((feat) => (
                <li key={feat} className="flex items-start gap-2 text-sm">
                  <div className="w-2 h-2 bg-[#2dc653] border border-black mt-1.5 flex-shrink-0" />
                  {feat}
                </li>
              ))}
            </ul>
          </div>

          <div className="border-2 border-black p-4 bg-[#f5f0e8] mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Bell size={16} />
              <span className="font-black text-sm">Mau dapat notifikasi?</span>
            </div>
            <p className="text-xs text-gray-600 mb-3">Pantau terus update terbaru dari EpanDStream.</p>
            <Link
              to="/"
              className="nb-btn inline-block px-4 py-2 bg-[#2dc653] text-black text-sm"
            >
              Kembali ke Home
            </Link>
          </div>
        </div>

        {/* Bottom stripe */}
        <div
          className="h-4 border-t-2 border-black"
          style={{
            background: 'repeating-linear-gradient(45deg, #2dc653, #2dc653 10px, #0a0a0a 10px, #0a0a0a 20px)',
          }}
        />
      </div>
    </div>
  );
}

import { Link } from 'react-router-dom';
import { BookOpen, ArrowLeft, Wrench, Clock, Bell } from 'lucide-react';

export default function ComicPage() {
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
        <div className="maintenance-bg h-8 border-b-2 border-black" />

        <div className="p-6 md:p-10 text-center bg-white">
          <div className="w-20 h-20 bg-[#e63946] border-4 border-black shadow-[6px_6px_0_#0a0a0a] mx-auto mb-6 flex items-center justify-center">
            <BookOpen size={36} className="text-white" />
          </div>

          <div className="inline-flex items-center gap-2 bg-[#e63946] border-2 border-black px-3 py-1 mb-4">
            <Wrench size={14} className="text-white" />
            <span className="text-white font-black text-sm uppercase tracking-wide">Maintenance</span>
          </div>

          <h1 className="font-black text-3xl md:text-4xl uppercase mb-3">Comic</h1>
          <p className="text-gray-600 text-base mb-6 leading-relaxed">
            Halaman baca komik sedang dalam proses pengembangan. Tim kami sedang bekerja keras untuk menghadirkan pengalaman membaca komik terbaik untuk kamu.
          </p>

          {/* Status */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            {[
              { label: 'Progress', value: '35%', color: '#e63946' },
              { label: 'Status', value: 'Dev', color: '#f4721e' },
              { label: 'Target', value: 'Q3 2026', color: '#2dc653' },
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
                'Baca manga & manhwa Sub Indonesia',
                'Bookmark chapter favorit',
                'Mode gelap untuk membaca',
                'Rilis chapter terbaru',
                'Rating & ulasan komik',
              ].map((feat) => (
                <li key={feat} className="flex items-start gap-2 text-sm">
                  <div className="w-2 h-2 bg-[#e63946] border border-black mt-1.5 flex-shrink-0" />
                  {feat}
                </li>
              ))}
            </ul>
          </div>

          {/* Notify */}
          <div className="border-2 border-black p-4 bg-[#f5f0e8] mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Bell size={16} />
              <span className="font-black text-sm">Mau dapat notifikasi?</span>
            </div>
            <p className="text-xs text-gray-600 mb-3">Hubungi kami untuk mendapat kabar saat fitur ini siap.</p>
            <Link
              to="/"
              className="nb-btn inline-block px-4 py-2 bg-[#e63946] text-white text-sm"
            >
              Kembali ke Home
            </Link>
          </div>
        </div>

        {/* Bottom stripe */}
        <div className="maintenance-bg h-4 border-t-2 border-black" />
      </div>
    </div>
  );
}

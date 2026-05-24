import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface SectionHeaderProps {
  title: string;
  viewAllLink?: string;
  viewAllLabel?: string;
  accent?: string;
}

export default function SectionHeader({ title, viewAllLink, viewAllLabel = 'Lihat Semua', accent = '#f5c518' }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <div className="w-1 h-6 border-2 border-black" style={{ background: accent }} />
        <h2 className="text-lg font-black uppercase tracking-tight">{title}</h2>
      </div>
      {viewAllLink && (
        <Link
          to={viewAllLink}
          className="flex items-center gap-1 text-xs font-bold border-2 border-black px-2 py-1 bg-white hover:bg-[#f5c518] transition-colors"
        >
          {viewAllLabel}
          <ArrowRight size={12} />
        </Link>
      )}
    </div>
  );
}

import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export default function ErrorState({ message = 'Gagal memuat data', onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4">
      <div className="w-16 h-16 border-2 border-black bg-red-400 flex items-center justify-center shadow-[4px_4px_0_#0a0a0a]">
        <AlertTriangle size={28} className="text-black" />
      </div>
      <div className="text-center">
        <p className="font-black text-lg">{message}</p>
        <p className="text-sm text-gray-600 mt-1">Periksa koneksi internet kamu</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="nb-btn flex items-center gap-2 px-4 py-2 bg-[#f5c518] text-black text-sm"
        >
          <RefreshCw size={14} />
          Coba Lagi
        </button>
      )}
    </div>
  );
}

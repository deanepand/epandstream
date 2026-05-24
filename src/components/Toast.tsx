import { useState, createContext, useContext, useCallback, ReactNode } from 'react';
import { CheckCircle, X, AlertCircle } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';

interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue>({ showToast: () => {} });

export const useToast = () => useContext(ToastContext);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback((message: string, type: ToastType = 'success') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast Container */}
      <div className="fixed bottom-20 md:bottom-4 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 w-full max-w-xs px-3">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`toast flex items-center gap-2 px-3 py-2 text-sm font-bold text-white ${
              toast.type === 'success'
                ? 'bg-[#2dc653]'
                : toast.type === 'error'
                ? 'bg-[#e63946]'
                : 'bg-[#4361ee]'
            }`}
          >
            {toast.type === 'success' ? (
              <CheckCircle size={14} />
            ) : (
              <AlertCircle size={14} />
            )}
            <span className="flex-1 text-xs">{toast.message}</span>
            <button
              onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
              className="opacity-70 hover:opacity-100"
            >
              <X size={12} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

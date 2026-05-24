export default function LoadingGrid({ count = 10 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="border-2 border-black overflow-hidden">
          <div className="skeleton" style={{ paddingTop: '133%' }} />
          <div className="p-2 border-t-2 border-black bg-white space-y-1">
            <div className="skeleton h-3 rounded-none w-full" />
            <div className="skeleton h-3 rounded-none w-2/3" />
          </div>
        </div>
      ))}
    </div>
  );
}

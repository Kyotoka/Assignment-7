export default function ProductSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm animate-pulse flex flex-col justify-between">
      <div>
        <div className="h-16 bg-slate-200 rounded-lg mb-3"></div>
        <div className="h-5 bg-slate-200 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-slate-200 rounded w-1/2 mb-3"></div>
      </div>
      <div className="border-t border-slate-100 pt-3 flex justify-between items-center">
        <div className="h-6 bg-slate-200 rounded w-1/3"></div>
        <div className="h-6 bg-slate-200 rounded w-1/4"></div>
      </div>
    </div>
  );
}
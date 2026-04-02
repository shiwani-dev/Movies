export default function MovieSkeleton() {
  return (
    <li className="animate-pulse overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
      <div className="aspect-2/3 w-full bg-slate-200"></div>
      <div className="p-4 space-y-2">
        <div className="h-4 w-3/4 rounded bg-slate-200"></div>
        <div className="h-3 w-1/2 rounded bg-slate-200"></div>
        <div className="h-2 w-1/3 rounded bg-slate-200"></div>
      </div>
    </li>
  );
}
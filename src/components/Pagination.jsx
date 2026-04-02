export default function Pagination({ page, setPage }) {
  return (
    <div className="mt-8 flex items-center justify-center gap-3">
      <button
        onClick={() => setPage((p) => Math.max(p - 1, 1))}
        disabled={page === 1}
        className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Prev
      </button>

      <div className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm">
        Page {page}
      </div>

      <button
        onClick={() => setPage((p) => p + 1)}
        className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
      >
        Next
      </button>
    </div>
  );
}
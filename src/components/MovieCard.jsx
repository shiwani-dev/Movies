export default function MovieCard({ movie }) {
  return (
    <li className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-lg">
      <div className="aspect-2/3 w-full overflow-hidden bg-slate-200">
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "/no-image.png"}
          alt={movie.Title}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          onError={(e) => { e.target.src = "/no-image.png"; }}
        />
      </div>
      <div className="p-4">
        <h3 className="line-clamp-2 text-base font-semibold text-slate-900">
          {movie.Title}
        </h3>
        <p className="mt-2 text-sm text-slate-500">{movie.Year}</p>
        <p className="mt-1 text-xs uppercase tracking-wide text-slate-400">
          {movie.Type}
        </p>
      </div>
    </li>
  );
}
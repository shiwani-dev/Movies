import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  const handleFavorite = () => {
    const saved = JSON.parse(localStorage.getItem("favorites")) || [];
    const exists = saved.find((m) => m.imdbID === movie.imdbID);
    if (!exists) {
      const updated = [...saved, movie];
      localStorage.setItem("favorites", JSON.stringify(updated));
      alert(`${movie.Title} added to favorites!`);
    }
  };

  return (
    <li className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-lg">
      {/* Wrap the card in a Link */}
      <Link to={`/movie/${movie.imdbID}`}>
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
      </Link>

      {/* Keep the favorites button outside the Link so it doesn’t navigate */}
      <div className="p-4">
        <button
          onClick={handleFavorite}
          className="mt-3 px-3 py-1 text-sm rounded bg-yellow-400 hover:bg-yellow-500"
        >
          ⭐ Add to Favorites
        </button>
      </div>
    </li>
  );
}
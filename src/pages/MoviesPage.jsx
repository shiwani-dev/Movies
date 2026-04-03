import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { fetchMovies } from "../services/omdbService";
import useDebounce from "../hooks/useDebounce";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import MovieSkeleton from "../components/MovieSkeleton";

// Lazy 
const MovieCard = lazy(() => import("../components/MovieCard"));

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("batman");
  const [page, setPage] = useState(1);
  const [showSkeleton, setShowSkeleton] = useState(false);

  const debouncedSearch = useDebounce(search);

  // cache
  const cache = useRef({});

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  useEffect(() => {
    if (!debouncedSearch.trim()) {
      setMovies([]);
      setError("");
      return;
    }

    const loadMovies = async () => {
      try {
        setLoading(true);
        setShowSkeleton(true);
        setTimeout(() => setShowSkeleton(false), 3000);

        const cacheKey = `${debouncedSearch}-${page}`;

        if (cache.current[cacheKey]) {
          setMovies(cache.current[cacheKey]);
          setError("");
          setLoading(false);
          return;
        }

        const data = await fetchMovies(debouncedSearch, page);

        if (data.Response === "True") {
          const uniqueMovies = data.Search.filter(
            (movie, index, self) =>
              index === self.findIndex((m) => m.imdbID === movie.imdbID)
          );
          setMovies(uniqueMovies);
          cache.current[cacheKey] = uniqueMovies; 
          setError("");
        } else {
          setMovies([]);
          setError(data.Error);
        }
      } catch {
        setMovies([]);
        setError("Failed to fetch movies.");
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [debouncedSearch, page]);

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Movie Finder
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Search movies and watch for free.
          </p>
          <div className="mt-6">
            <SearchBar search={search} setSearch={setSearch} />
          </div>
        </div>

        {/* Skeletons */}
        {showSkeleton && (
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <MovieSkeleton key={i} />
            ))}
          </ul>
        )}

        {/* Error */}
        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-600">
            {error}
          </div>
        )}
        {!loading && !error && !showSkeleton && movies.length > 0 && (
          <Suspense
            fallback={
              <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <MovieSkeleton key={i} />
                ))}
              </ul>
            }
          >
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {movies.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} />
              ))}
            </ul>
            <Pagination page={page} setPage={setPage} />
          </Suspense>
        )}
      </div>
    </div>
  );
}
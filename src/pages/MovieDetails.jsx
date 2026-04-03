import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function MovieDetails() {
  const { id } = useParams(); 
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const res = await fetch(`https://www.omdbapi.com/?apikey=6d3362d0&i=${id}`);
      const data = await res.json();
      setMovie(data);
    };
    fetchMovie();
  }, [id]);

  if (!movie) return <p>Loading...</p>;

 return (
  <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow text-center">
    <h1 className="text-2xl font-bold">{movie.Title}</h1>
    <img
      src={movie.Poster !== "N/A" ? movie.Poster : "/no-image.png"}
      alt={movie.Title}
      className="mt-4 mx-auto w-64"
    />
    <p className="mt-2 text-slate-600">{movie.Plot}</p>
    <p className="mt-2 text-sm text-slate-500">Year: {movie.Year}</p>
    <p className="mt-1 text-sm text-slate-500">Genre: {movie.Genre}</p>
    <p className="mt-1 text-sm text-slate-500">IMDB Rating: {movie.imdbRating}</p>
  </div>
);
}
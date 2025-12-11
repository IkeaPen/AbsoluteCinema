import { useEffect, useState } from "react";
import { api } from "../api/axios";
import type { Movie } from "../schemas/DbSchema";
import LoadingSpinner from "../components/LoadingSpinner";
import MovieBox from "../components/MovieBox";
import { useSearchParams } from "react-router";

export default function MoviesByScreeningDatePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedDate = searchParams.get("date") || undefined;
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchMoviesByScreeningDate() {
    setLoading(true);
    try {
      const res = await api.get(`/movies/by-screening-date?date=${selectedDate}`);
      setMovies(res.data);
    } catch (err) {
      console.log("Could not fetch movies by screening date:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!selectedDate) setSearchParams({ date: new Date().toISOString().split("T")[0] });
  }, []);

  useEffect(() => {
    if (selectedDate) fetchMoviesByScreeningDate();
  }, [selectedDate]);
  
  if (loading) {
    return (
      <LoadingSpinner />
    );
  }

  return (
    <div className="py-6 px-10">
      <h1 className="text-3xl font-bold mb-4">Movies by Screening Date</h1>

      <div className="mb-6 flex gap-4 items-center">
        <label className="font-medium">Select date:</label>
        <input type="date" value={selectedDate} onChange={(e) => setSearchParams({ date: e.target.value })} className="px-3 py-2 border rounded-md bg-neutral-800 scheme-dark cursor-text"/>
      </div>

      {loading ? 
        <LoadingSpinner />
      : 
        movies.length === 0 ?
          <p className="opacity-60">No movies available on this date</p>
        : 
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {movies.map(movie => (
              <MovieBox key={movie.id} movie={movie} screeningsDate={selectedDate} />
            ))}
          </div>
        }
    </div>
  );
}

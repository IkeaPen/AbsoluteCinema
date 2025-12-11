import { useEffect, useState } from "react";
import { api } from "../api/axios";
import type { Movie } from "../schemas/DbSchema";
import LoadingSpinner from "../components/LoadingSpinner";
import MovieBox from "../components/MovieBox";

export default function AllMoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchAiringMovies() {
    try {
      const res = await api.get("/movies");
      setMovies(res.data);
    } catch (err) {
      console.log("Could not fetch movies:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAiringMovies();
  }, []);
  
  if (loading) {
    return (
      <LoadingSpinner />
    );
  }

  return (
    <div className="py-6 px-10">
      <h1 className="text-3xl font-bold mb-6">All Movies</h1>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {movies.length === 0 ?
          <p className="opacity-60">No movies available</p>
        :
          movies.map(movie => (
            <MovieBox key={movie.id} movie={movie} />
          ))
        }
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { api } from "../api/axios";
import type { Movie, ScreeningWithExtras } from "../schemas/DbSchema";
import LoadingSpinner from "../components/LoadingSpinner";
import { useNavigate, useParams, useSearchParams } from "react-router";
import { useAuth } from "../components/AuthProvider";

export default function MovieWithScreeningsPage() {
  const navigate = useNavigate();
  const { movieId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedDate = searchParams.get("date") || undefined;
  const { user } = useAuth()!;
  const [movie, setMovie] = useState<Movie | null>(null);
  const [screenings, setScreenings] = useState<ScreeningWithExtras[]>([]);
  const [loadingMovie, setLoadingMovie] = useState(true);
  const [loadingScreenings, setLoadingScreenings] = useState(true);

  async function fetchMovieInfo() {
    setLoadingMovie(true);
    try {
      const res = await api.get(`/movies/${movieId}`);
      setMovie(res.data);
      console.log("Movie:", res.data);
    } catch (err) {
      console.log("Could not fetch movie:", err);
    } finally {
      setLoadingMovie(false);
    }
  }

  async function fetchMovieScreenings() {
    setLoadingScreenings(true);
    try {
      const res = await api.get(`/movies/${movieId}/screenings/by-date?date=${selectedDate}`);
      setScreenings(res.data);
      console.log("Screenings:", res.data);
    } catch (err) {
      console.log("Could not fetch screenings by date:", err);
    } finally {
      setLoadingScreenings(false);
    }
  }

  useEffect(() => {
    fetchMovieInfo();
    if (!selectedDate) setSearchParams({ date: new Date().toISOString().split("T")[0] });
  }, []);

  useEffect(() => {
    if (selectedDate) {
      fetchMovieScreenings();
    }
  }, [selectedDate]);
  
  if (loadingMovie) {
    return (
      <LoadingSpinner />
    );
  }

  return (
    <div className="max-w-4xl mx-10 my-3 p-6">
      <div className="sm:flex sm:flex-row min-h-80 grid gap-3 grid-cols-1 bg-neutral-900 rounded-xl shadow-md">
        <div className="max-h-140 max-w-100 min-w-70 flex items-center justify-center rounded-xl bg-black/50">
          <img src={movie?.imageUrl ?? undefined} alt={movie?.title} className="max-h-full max-w-full"/>
        </div>
        <div className="flex flex-col p-8 max-h-140 max-w-120 min-w-70 justify-start">
          <h1 className="text-4xl font-bold mb-3">{movie?.title}</h1>
          <p className="mb-2 opacity-70">By: {movie?.studio}</p>
          <p className="mb-2 opacity-70">Released: {movie?.releaseDate.slice(0,10)}</p>
          <p className="mb-6 mt-6 text-ellipsis overflow-hidden">{movie?.description}</p>
        </div>
      </div>
      {user?.role === "ADMIN" &&
        <div className="flex flex-row gap-6">
          <button onClick={() => navigate(`/movies/${movieId}/edit`)} className="mt-6 px-4 py-2 rounded-lg bg-sky-900 hover:bg-sky-800 cursor-pointer">
            Edit Movie
          </button>
          <button onClick={() => navigate(`/movies/${movieId}/screenings/add`)} className="mt-6 px-4 py-2 rounded-lg bg-teal-800 hover:bg-teal-700 cursor-pointer">
            Add Screening
          </button>
        </div>
      }

      <div className="mb-6 mt-10 flex gap-4 items-center">
        <label className="text-2xl font-semibold">Screenings</label>
        <input type="date" value={selectedDate} onChange={(e) => setSearchParams({ date: e.target.value })} className="px-3 py-2 border rounded-md bg-neutral-800 scheme-dark cursor-text"/>
      </div>
      
      {loadingScreenings ?
        <LoadingSpinner />
      :
        screenings.length === 0 ? 
        <p>No screenings for this date.</p>
        : 
        <div  className="flex gap-3 flex-wrap">
          {screenings.map(screening => (
            //<div key={screening.id} onClick={user ? (() => navigate(`/movies/${movieId}/screenings/${screening.id}`)) : undefined} className={`px-5 py-3 border rounded-lg flex items-center justify-between bg-neutral-900 ` + (user ? `hover:bg-neutral-800 transition cursor-pointer` : `cursor-not-allowed`)}>
            <div key={screening.id} onClick={() => navigate(`/movies/${movieId}/screenings/${screening.id}`)} className={`px-5 py-3 border rounded-lg flex items-center justify-between bg-neutral-900 hover:bg-neutral-800 transition cursor-pointer`}>
              <span className="text-lg font-semibold">{screening.date.slice(11,16)}h</span>
              <span className="text-3xl mx-3">-</span>
              <span className="text-lg opacity-90">{screening.cinemaHall?.name}</span>
            </div>
          ))}
        </div>
      }
    </div>
  );
}

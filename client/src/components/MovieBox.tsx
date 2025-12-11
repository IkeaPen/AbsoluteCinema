import { useNavigate } from "react-router";
import type { Movie } from "../schemas/DbSchema";

interface MyButtonProps {
  movie: Movie;
  screeningsDate?: string;
}

export default function MovieBox({ movie, screeningsDate }: MyButtonProps) {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/movies/${movie.id}/screenings/by-date?date=${screeningsDate ?? new Date().toISOString().split("T")[0] }`)} className="cursor-pointer bg-neutral-900 rounded-xl overflow-hidden shadow-md hover:scale-105 hover:shadow-xl transition-transform">
      <div className="w-full h-70 flex items-center justify-center bg-black/50">
          <img src={movie.imageUrl ?? undefined} alt={movie.title} className="max-h-full max-w-full"/>
      </div>
      <div className="p-4">
          <h3 className="text-lg font-semibold">{movie.title}</h3>
          <p className="text-sm opacity-70">{movie.studio}</p>
          {screeningsDate &&
            <div className="flex flex-wrap gap-2 mt-3">
              {movie.screenings?.map(screening => (
                <span key={screening.id} className="px-2 py-1 text-xs bg-emerald-600/20 text-emerald-400 rounded-md">
                  {screening.date.slice(11,16)}
                </span>
              ))}
            </div>
          }
      </div>
    </div>
  );
}

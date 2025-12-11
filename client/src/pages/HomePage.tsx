import { useNavigate } from "react-router";
import { useAuth } from "../components/AuthProvider";

export default function HomePage() {
  const navigate = useNavigate();
  const { user } = useAuth()!;
  
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-6">
      <h1 className="text-4xl font-bold mb-10">Welcome</h1>

      <div className="flex flex-col gap-6 w-full max-w-sm">
        <button onClick={() => navigate('/movies/airing')} className="w-full py-4 rounded-xl bg-sky-900 hover:bg-sky-800 text-lg font-semibold shadow cursor-pointer">
          Airing Movies
        </button>

        <button onClick={() => navigate('/movies/by-screening-date')} className="w-full py-4 rounded-xl bg-teal-800 hover:bg-teal-700 text-lg font-semibold shadow cursor-pointer">
          Movies by Screening Dates
        </button>

        {user?.role === "ADMIN" &&
          <button onClick={() => navigate('/movies')} className="w-full py-4 rounded-xl bg-sky-900 hover:bg-sky-800 text-lg font-semibold shadow cursor-pointer">
            All Movies
          </button>
        }
      </div>
    </div>
  );
}

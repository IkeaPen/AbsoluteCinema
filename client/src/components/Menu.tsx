import { useNavigate } from "react-router";
import { useAuth } from "./AuthProvider";

export default function Menu() {
  const navigate = useNavigate();
  const { user, loading, logout } = useAuth()!;

  if (loading) {
    return <></>
  }
  
  return (
    <>
      <button onClick={() => navigate("/")} className="hover:text-sky-700 cursor-pointer">Home</button>
      <button onClick={() => navigate("/movies/airing")} className="hover:text-sky-700 cursor-pointer">Airing</button>
      <button onClick={() => navigate("/movies/by-screening-date")} className="hover:text-sky-700 cursor-pointer">Screenings</button>

      {user?.role === "ADMIN" &&
        <>
          <button onClick={() => navigate("/movies")} className="hover:text-sky-700 cursor-pointer">All Movies</button>
          <button onClick={() => navigate("/movies/add")} className="hover:text-sky-700 cursor-pointer">Add Movie</button>
        </>
      }
      {user?.role === "USER" &&
        <button onClick={() => navigate("/me/tickets")} className="hover:text-sky-700 cursor-pointer">My Tickets</button>
      }
      {user ?
        <button onClick={() => {logout(), navigate("/login")}} className="hover:text-sky-700 cursor-pointer">Logout</button>
      :
        <>
          <button onClick={() => navigate("/login")} className="hover:text-sky-700 cursor-pointer">Login</button>
          <button onClick={() => navigate("/register")} className="hover:text-sky-700 cursor-pointer">Register</button>
        </>
      }
    </>
  );
}
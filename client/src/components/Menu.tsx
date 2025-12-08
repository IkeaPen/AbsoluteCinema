import { useNavigate } from "react-router";
import { useAuth } from "./AuthProvider";

export default function Menu() {
  const navigate = useNavigate();
  const { user, logout } = useAuth()!;
  
  return (
    <>
      <button onClick={() => navigate("/")} className="hover:text-blue-400 cursor-pointer">Home</button>
      <button onClick={() => navigate("/about")} className="hover:text-blue-400 cursor-pointer">About</button>

      {user?.role === "ADMIN" &&
        <button onClick={() => navigate("/form")} className="hover:text-blue-400 cursor-pointer">Form</button>
      }
      {user ?
        <button onClick={() => {logout(), navigate("/login")}} className="hover:text-blue-400 cursor-pointer">Logout</button>
        :
        <button onClick={() => navigate("/login")} className="hover:text-blue-400 cursor-pointer">Login</button>
      }
    </>
  );
}
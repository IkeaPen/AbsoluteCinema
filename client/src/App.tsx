import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "./Layout";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { useAuth } from "./components/AuthProvider";
import AiringMoviesPage from "./pages/AiringMoviesPage";
import MoviesByScreeningDatePage from "./pages/MoviesByScreeningDatePage";
import MovieWithScreeningsPage from "./pages/MovieWithScreeningsPage";
import ScreeningRegisterPage from "./pages/ScreeningRegisterPage";
import type { JSX } from "react";
import type { User } from "./schemas/DbSchema";
import EditMoviePage from "./pages/EditMoviePage";
import UserTicketsPage from "./pages/UserTicketsPage";
import AddMoviePage from "./pages/AddMoviePage";
import AddScreeningPage from "./pages/AddScreeningPage";
import AllMoviesPage from "./pages/AllMoviesPage";

export function RequireAuth({ user, isAdmin, children }: { user: User | null, isAdmin?: boolean, children: JSX.Element }) {
  if (isAdmin) {
    if (!user || user.role !== "ADMIN") return <LoginPage />;
  }
  else if (!user) return <LoginPage />;
  return children;
}

function App() {
  const { user } = useAuth()!;

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>

          <Route index element={<HomePage />} />
          <Route path="/movies/airing" element={<AiringMoviesPage />} />
          <Route path="/movies/by-screening-date" element={<MoviesByScreeningDatePage />} />
          <Route path="/movies/:movieId/screenings/by-date" element={<MovieWithScreeningsPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route path="/movies/:movieId/screenings/:screeningId" element={<RequireAuth user={user}><ScreeningRegisterPage /></RequireAuth>} />
          <Route path="/me/tickets" element={<RequireAuth user={user}><UserTicketsPage /></RequireAuth>} />
          
          <Route path="/movies" element={<RequireAuth user={user} isAdmin><AllMoviesPage /></RequireAuth>} />
          <Route path="/movies/:id/edit" element={<RequireAuth user={user} isAdmin><EditMoviePage /></RequireAuth>} />
          <Route path="/movies/add" element={<RequireAuth user={user} isAdmin><AddMoviePage /></RequireAuth>} />
          <Route path="/movies/:movieId/screenings/add" element={<RequireAuth user={user} isAdmin><AddScreeningPage /></RequireAuth>} />
          

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

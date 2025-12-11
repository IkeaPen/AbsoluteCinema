import { Outlet } from "react-router";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useAuth } from "./components/AuthProvider";
import LoadingSpinner from "./components/LoadingSpinner";

export default function Layout() {
  const { loading } = useAuth()!;

  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
      <Header />

      <main className="p-4">
        {loading ?
          <LoadingSpinner />
        :
          <Outlet /> 
        }
      </main>

      <Footer />
    </div>
  );
}

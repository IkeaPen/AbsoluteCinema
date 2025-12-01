import { Outlet } from "react-router";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function Layout() {
  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
      <Header />

      <main className="p-4">
        <Outlet /> 
      </main>

      <Footer />
    </div>
  );
}

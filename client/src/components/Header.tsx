import { useState } from "react";
import Menu from "./Menu";
import { FiMenu } from "react-icons/fi";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-black/50 text-white py-4 px-8 flex justify-between items-center relative">
      <div style={{ fontFamily: "Science Gothic" }} className="text-xl font-bold">Absolute Cinema</div>
      
      <nav className="hidden md:flex gap-4">
        <Menu />
      </nav>
      
      <button className="md:hidden" onClick={() => setOpen(!open)}>
        <FiMenu size={24} />
      </button>

      {open && (
        <nav className="absolute top-16 right-4 bg-gray-700 p-4 rounded-lg shadow-lg flex flex-col gap-4 md:hidden">
          <Menu />
        </nav>
      )}
    </header>
  );
}

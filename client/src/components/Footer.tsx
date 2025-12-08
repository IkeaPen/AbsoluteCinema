import { FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer style={{ fontFamily: "Science Gothic" }} className="bg-black/50 text-white p-4 text-sm flex flex-row justify-center relative">
      <p>© 2025 Absolute Cinema</p>
    
      <a href="https://github.com/IkeaPen/AbsoluteCinema" target="_blank" className="absolute right-8">
        <FaGithub size={24} />
      </a>
    </footer>
  );
}

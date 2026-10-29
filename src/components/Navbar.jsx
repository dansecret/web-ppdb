import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("currentUser"));

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    // Mengarahkan kembali ke Landing Page publik setelah logout
    navigate("/");
  };

  // Fungsi untuk memberi warna berbeda pada menu yang sedang aktif
  const isActive = (path) => 
    location.pathname === path ? "bg-blue-700 text-white" : "text-blue-100 hover:bg-blue-600";

  return (
    <nav className="bg-blue-600 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-6 py-3 flex justify-between items-center">
        
        {/* Kiri: Logo & Nama Sekolah */}
        <div className="flex items-center gap-3">
          <img src="/logo-tutwuri.png" alt="Logo" className="w-10 h-10 bg-white rounded-full p-1 shadow-sm" />
          <span className="text-lg font-bold text-white hidden sm:block">PPDB SDN 1 Calincing</span>
        </div>

        {/* Tengah/Kanan: Menu Navigasi */}
        <div className="flex items-center gap-2 sm:gap-4">
            <Link to="/dashboard" className={`px-3 py-2 rounded-lg text-sm font-medium transition ${isActive("/dashboard")}`}>
            Dashboard
            </Link>
          <Link to="/form" className={`px-3 py-2 rounded-lg text-sm font-medium transition ${isActive("/form")}`}>
            Formulir
          </Link>
          <Link to="/status" className={`px-3 py-2 rounded-lg text-sm font-medium transition ${isActive("/status")}`}>
            Status
          </Link>
          
          <div className="border-l border-blue-400 h-6 mx-2 hidden sm:block"></div>
          
          {/* Info User & Tombol Keluar */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-white hidden md:block">
              Halo, {user?.name?.split(" ")[0]}
            </span>
            <button 
              onClick={handleLogout} 
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-bold transition shadow-sm"
            >
              Keluar
            </button>
          </div>
        </div>

      </div>
    </nav>
  );
}
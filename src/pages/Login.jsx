import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  // Fungsi Login Normal
  const handleLogin = (e) => {
    e.preventDefault();
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    
    const validUser = existingUsers.find(
      (u) => u.email === formData.email && u.password === formData.password
    );

    if (validUser) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("currentUser", JSON.stringify(validUser));
      navigate("/dashboard");
    } else {
      alert("Email/NISN atau Password salah!");
    }
  };

  // Fungsi Simulasi Login Google
  const handleGoogleLogin = () => {
    // Karena belum ada Firebase, kita buat akun dummy seolah-olah dari Google
    const dummyGoogleUser = {
      name: "Pengguna Google",
      email: "pengguna@gmail.com",
      password: "" 
    };

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("currentUser", JSON.stringify(dummyGoogleUser));
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-200 p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-xl border-t-4 border-blue-600">
        
        {/* Header & Logo Section */}
        <div className="flex flex-col items-center">
          <img 
            src="/logo-tutwuri.png" 
            alt="Logo Tut Wuri Handayani" 
            className="w-24 h-24 mb-4 object-contain drop-shadow-sm"
          />
          <h2 className="text-xl font-semibold text-gray-600">Portal PPDB Online</h2>
          <h1 className="text-2xl font-bold text-center text-blue-700">SDN 1 Calincing</h1>
          <p className="text-sm text-center text-gray-500 mt-1">Kab. Tasikmalaya</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email / NISN</label>
            <input 
              type="text" required
              placeholder="Masukkan Email atau NISN"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input 
              type="password" required
              placeholder="Masukkan Password"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
          <button type="submit" className="w-full px-4 py-2.5 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition font-bold shadow-md">
            Masuk
          </button>
        </form>

        {/* Divider Atau */}
        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="px-3 text-sm text-gray-500 bg-white">atau</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Tombol Login Google */}
        <button 
          onClick={handleGoogleLogin}
          type="button" 
          className="w-full flex items-center justify-center gap-3 px-4 py-2.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium text-gray-700 shadow-sm"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Masuk dengan Google
        </button>
        
        <p className="text-sm text-center text-gray-600 mt-6">
          Belum punya akun? <Link to="/register" className="text-blue-600 hover:underline font-bold">Daftar sekarang</Link>
        </p>
      </div>
    </div>
  );
}
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    
    const userExists = existingUsers.find(u => u.email === formData.email);
    if (userExists) {
      alert("Email/NISN sudah digunakan!");
      return;
    }

    const newUsers = [...existingUsers, formData];
    localStorage.setItem("users", JSON.stringify(newUsers));
    
    alert("Pendaftaran berhasil! Silakan Login.");
    navigate("/login");
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
          <h2 className="text-xl font-semibold text-gray-600">Buat Akun PPDB</h2>
          <h1 className="text-2xl font-bold text-center text-blue-700">SDN 1 Calincing</h1>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
            <input 
              type="text" required
              placeholder="Masukkan Nama Lengkap"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
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
              placeholder="Buat Password"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
          <button type="submit" className="w-full px-4 py-2.5 mt-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition font-bold shadow-md">
            Daftar Sekarang
          </button>
        </form>
        
        <p className="text-sm text-center text-gray-600">
          Sudah punya akun? <Link to="/login" className="text-blue-600 hover:underline font-bold">Login di sini</Link>
        </p>
      </div>
    </div>
  );
}
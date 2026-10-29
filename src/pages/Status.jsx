import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Status() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("currentUser"));
    setUser(data);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto p-6 max-w-2xl mt-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Status Pendaftaran</h2>
        
        {!user?.pendaftaran ? (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded shadow-sm">
            <h3 className="font-bold text-red-700">Data Belum Lengkap</h3>
            <p className="text-red-600 mt-1">Anda belum mengisi formulir pendaftaran.</p>
            <Link to="/form" className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 font-semibold transition">
              Isi Formulir Sekarang
            </Link>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
              <div>
                <p className="text-sm text-gray-500">Status Seleksi:</p>
                <span className="bg-blue-100 text-blue-800 text-lg font-bold px-3 py-1 rounded inline-block mt-1">
                  {user.pendaftaran.status}
                </span>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Tanggal Daftar:</p>
                <p className="font-semibold mt-1">{user.pendaftaran.tanggalDaftar}</p>
              </div>
            </div>
            
            <h3 className="font-bold text-lg mb-4 text-gray-800">Rangkuman Data</h3>
            <table className="w-full text-left border-collapse">
              <tbody>
                <tr className="border-b"><th className="py-3 w-1/3 text-gray-600 font-medium">Nama</th><td className="py-3 font-semibold">{user.name}</td></tr>
                <tr className="border-b"><th className="py-3 text-gray-600 font-medium">NISN</th><td className="py-3">{user.pendaftaran.nisn}</td></tr>
                <tr className="border-b"><th className="py-3 text-gray-600 font-medium">Asal Sekolah</th><td className="py-3">{user.pendaftaran.asalSekolah}</td></tr>
                <tr><th className="py-3 text-gray-600 font-medium align-top">Alamat</th><td className="py-3">{user.pendaftaran.alamat}</td></tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
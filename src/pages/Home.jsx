import Navbar from "../components/Navbar";

export default function Home() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto p-6 mt-8 max-w-4xl">
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Selamat Datang, {user?.name}!</h1>
          <p className="text-gray-600 mb-8">Ini adalah portal Penerimaan Peserta Didik Baru (PPDB).</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
              <h3 className="font-bold text-blue-800 text-xl mb-2">1. Isi Formulir</h3>
              <p className="text-blue-700 text-sm mb-4">Lengkapi data diri, asal sekolah, dan alamat lengkap pada form yang disediakan.</p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg border border-green-100">
              <h3 className="font-bold text-green-800 text-xl mb-2">2. Pantau Status</h3>
              <p className="text-green-700 text-sm mb-4">Cek status kelulusan Anda secara berkala di halaman Status Pendaftaran.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
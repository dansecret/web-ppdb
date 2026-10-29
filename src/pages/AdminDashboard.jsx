import { useState, useEffect } from "react";

export default function AdminDashboard() {
  const [pendaftarList, setPendaftarList] = useState([]);
  const [tahunAjaranFilter, setTahunAjaranFilter] = useState("2026/2027");
  const [selectedSiswa, setSelectedSiswa] = useState(null); // Untuk Modal Detail

  // Ambil semua data pendaftar dari localStorage
  useEffect(() => {
    loadDataPendaftar();
  }, []);

  const loadDataPendaftar = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const list = users.map((u) => {
      const formDataObj = JSON.parse(localStorage.getItem(`form_${u.email}`)) || null;
      return {
        email: u.email,
        namaUser: u.name,
        form: formDataObj,
        status: localStorage.getItem(`status_${u.email}`) || "Belum Mengisi Formulir",
        tahunAjaran: "2026/2027" // Default tahun ajaran
      };
    }).filter(item => item.form !== null); // Hanya ambil yang sudah mengisi formulir

    setPendaftarList(list);
  };

  // Fungsi Ubah Status (Diterima / Ditolak / Menunggu)
  const handleUpdateStatus = (email, statusBaru) => {
    localStorage.setItem(`status_${email}`, statusBaru);
    
    // Update juga di dalam object form-nya
    const formKey = `form_${email}`;
    const formDataObj = JSON.parse(localStorage.getItem(formKey));
    if (formDataObj) {
      formDataObj.status = statusBaru;
      localStorage.setItem(formKey, JSON.stringify(formDataObj));
    }

    alert(`Status berhasil diubah menjadi: ${statusBaru}`);
    loadDataPendaftar();
    setSelectedSiswa(null);
  };

  // Filter berdasarkan Tahun Ajaran
  const filteredData = pendaftarList.filter(item => item.tahunAjaran === tahunAjaranFilter);

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Topbar Admin - Disesuaikan warnanya jadi biru elegan agar konsisten */}
      <nav className="bg-blue-700 text-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center px-4 py-3">
          <div className="flex items-center gap-3">
            <img src="/logo-tutwuri.png" alt="Logo" className="w-10 h-10 bg-white rounded-full p-1 shadow-sm" />
            <div>
              <h1 className="font-bold text-lg leading-tight">Panel Admin PPDB</h1>
              <p className="text-xs text-blue-100">SDN 1 Calincing, Kab. Tasikmalaya</p>
            </div>
          </div>
          <a href="/" className="text-xs bg-blue-800 hover:bg-blue-900 px-3.5 py-2 rounded-lg border border-blue-500 font-semibold transition shadow-sm">
            &larr; Keluar ke Beranda
          </a>
        </div>
      </nav>

      <div className="container mx-auto px-4 md:px-6 max-w-6xl mt-8">
        
        {/* Header & Filter Tahun Ajaran */}
        <div className="bg-white p-6 rounded-2xl shadow-sm mb-6 flex flex-col md:flex-row justify-between items-center gap-4 border border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Manajemen Calon Siswa Masuk</h2>
            <p className="text-sm text-gray-500">Kelola verifikasi berkas dan status kelulusan pendaftar.</p>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <label className="text-sm font-semibold text-gray-600 whitespace-nowrap">Tahun Ajaran:</label>
            <select 
              value={tahunAjaranFilter} 
              onChange={(e) => setTahunAjaranFilter(e.target.value)}
              className="px-4 py-2 border rounded-xl bg-gray-50 text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="2026/2027">2026/2027</option>
              <option value="2025/2026">2025/2026 (Arsip)</option>
            </select>
          </div>
        </div>

        {/* Tabel Data Pendaftar */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider border-b">
                  <th className="p-4">No</th>
                  <th className="p-4">Nama Siswa & NISN</th>
                  <th className="p-4">Kontak Ortu</th>
                  <th className="p-4">Tanggal Daftar</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {filteredData.length > 0 ? (
                  filteredData.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition">
                      <td className="p-4 font-medium text-gray-500">{index + 1}</td>
                      <td className="p-4">
                        <p className="font-bold text-gray-800">{item.form.formData.namaLengkap}</p>
                        <p className="text-xs text-gray-500">NISN: {item.form.formData.nisn || "-"}</p>
                      </td>
                      <td className="p-4 text-gray-600">{item.form.formData.kontakOrtu}</td>
                      <td className="p-4 text-gray-600">{item.form.tanggalDaftar}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          item.status === 'Diterima' ? 'bg-green-100 text-green-700' :
                          item.status === 'Ditolak' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <button 
                          onClick={() => setSelectedSiswa(item)}
                          className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 transition shadow-sm"
                        >
                          Review & Verifikasi
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="p-8 text-center text-gray-400">
                      Belum ada data pendaftar untuk Tahun Ajaran {tahunAjaranFilter}.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* MODAL DETAIL & REVIEW BERKAS SISWA */}
      {selectedSiswa && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-2xl relative">
            
            <div className="flex justify-between items-center border-b pb-4 mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-800">Detail Pendaftaran Siswa</h3>
                <p className="text-xs text-gray-500">Tahun Ajaran {selectedSiswa.tahunAjaran}</p>
              </div>
              <button onClick={() => setSelectedSiswa(null)} className="text-gray-400 hover:text-gray-700 font-bold text-lg">
                ✕
              </button>
            </div>

            <div className="space-y-6 text-sm">
              
              {/* Data Siswa */}
              <div>
                <h4 className="font-bold text-blue-600 mb-2">1. Data Calon Siswa</h4>
                <div className="grid grid-cols-2 gap-3 bg-gray-50 p-4 rounded-xl border">
                  <div><span className="text-gray-500 block text-xs">Nama Lengkap</span> <strong className="text-gray-800">{selectedSiswa.form.formData.namaLengkap}</strong></div>
                  <div><span className="text-gray-500 block text-xs">NISN</span> <strong className="text-gray-800">{selectedSiswa.form.formData.nisn}</strong></div>
                  <div><span className="text-gray-500 block text-xs">Tempat, Tanggal Lahir</span> <strong className="text-gray-800">{selectedSiswa.form.formData.tempatLahir}, {selectedSiswa.form.formData.tanggalLahir}</strong></div>
                  <div><span className="text-gray-500 block text-xs">Alamat</span> <strong className="text-gray-800">{selectedSiswa.form.formData.alamat}</strong></div>
                </div>
              </div>

              {/* Data Orang Tua */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-xl border">
                  <h4 className="font-bold text-blue-600 mb-2">2. Data Ayah</h4>
                  <p><span className="text-gray-500 text-xs">Nama:</span> <strong>{selectedSiswa.form.formData.namaAyah}</strong></p>
                  <p><span className="text-gray-500 text-xs">NIK:</span> <strong>{selectedSiswa.form.formData.nikAyah}</strong></p>
                  <p><span className="text-gray-500 text-xs">Pekerjaan:</span> <strong>{selectedSiswa.form.formData.pekerjaanAyah || "-"}</strong></p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl border">
                  <h4 className="font-bold text-blue-600 mb-2">3. Data Ibu</h4>
                  <p><span className="text-gray-500 text-xs">Nama:</span> <strong>{selectedSiswa.form.formData.namaIbu}</strong></p>
                  <p><span className="text-gray-500 text-xs">NIK:</span> <strong>{selectedSiswa.form.formData.nikIbu}</strong></p>
                  <p><span className="text-gray-500 text-xs">Pekerjaan:</span> <strong>{selectedSiswa.form.formData.pekerjaanIbu || "-"}</strong></p>
                </div>
              </div>

              {/* List Berkas Upload untuk Dilihat Admin */}
              <div>
                <h4 className="font-bold text-blue-600 mb-2">4. Verifikasi Berkas Unggahan</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {Object.entries(selectedSiswa.form.berkas).map(([key, file]) => (
                    file ? (
                      <div key={key} className="p-3 border rounded-xl bg-gray-50 flex flex-col justify-between">
                        <span className="text-xs font-semibold text-gray-700 uppercase mb-1">{key}</span>
                        <a href={file.url} target="_blank" rel="noopener noreferrer" 
                          className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded font-bold text-center hover:bg-blue-200">
                          Lihat Berkas
                        </a>
                      </div>
                    ) : null
                  ))}
                </div>
              </div>

              {/* Aksi Ubah Status Kelulusan */}
              <div className="pt-4 border-t flex flex-col sm:flex-row justify-between items-center gap-4">
                <span className="text-gray-600 font-medium">Ubah Keputusan Status Pendaftaran:</span>
                <div className="flex gap-2 w-full sm:w-auto">
                  <button 
                    onClick={() => handleUpdateStatus(selectedSiswa.email, "Diterima")}
                    className="flex-1 sm:flex-none px-4 py-2 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition text-xs shadow"
                  >
                    ✓ Terima Siswa
                  </button>
                  <button 
                    onClick={() => handleUpdateStatus(selectedSiswa.email, "Ditolak")}
                    className="flex-1 sm:flex-none px-4 py-2 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition text-xs shadow"
                  >
                    ✕ Tolak
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function FormPendaftaran() {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};

  // State untuk Data Formulir Utama (Anak)
  const [formData, setFormData] = useState({
    namaLengkap: currentUser.name || "",
    tempatLahir: "",
    tanggalLahir: "",
    nisn: currentUser.email?.includes("@") ? "" : currentUser.email || "",
    alamat: "",
    kontakOrtu: "",
    
    // Data Ayah
    namaAyah: "",
    tempatLahirAyah: "",
    tanggalLahirAyah: "",
    nikAyah: "",
    pekerjaanAyah: "",
    penghasilanAyah: "",

    // Data Ibu
    namaIbu: "",
    tempatLahirIbu: "",
    tanggalLahirIbu: "",
    nikIbu: "",
    pekerjaanIbu: "",
    penghasilanIbu: "",
  });

  // State untuk Berkas Upload (Anak & Orang Tua)
  const [berkas, setBerkas] = useState({
    akta: null,
    kk: null,
    ijazah: null,
    suratSehat: null,
    pasFoto: null,
    ktpAyah: null,
    ktpIbu: null,
  });

  // State untuk Prestasi Dinamis (Maksimal 5)
  const [prestasiList, setPrestasiList] = useState([
    { nama: "", jenis: "", tahun: "", tingkat: "Kabupaten", sertifikat: null }
  ]);

  // Load data tersimpan jika sebelumnya pernah mengisi (Draft)
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem(`form_${currentUser.email}`));
    if (savedData) {
      setFormData(savedData.formData || formData);
      setBerkas(savedData.berkas || berkas);
      if (savedData.prestasiList && savedData.prestasiList.length > 0) {
        setPrestasiList(savedData.prestasiList);
      }
    }
  }, []);

  // Handle Input Utama
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Upload Berkas dengan konversi ke Object URL agar bisa di-View/Preview
  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setBerkas((prev) => ({ ...prev, [field]: { name: file.name, url: fileUrl } }));
    }
  };

  // Handle Prestasi Dinamis
  const handlePrestasiChange = (index, field, value) => {
    const updated = [...prestasiList];
    updated[index][field] = value;
    setPrestasiList(updated);
  };

  const handleSertifikatChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      const updated = [...prestasiList];
      updated[index].sertifikat = { name: file.name, url: fileUrl };
      setPrestasiList(updated);
    }
  };

  const tambahPrestasi = () => {
    if (prestasiList.length < 5) {
      setPrestasiList([...prestasiList, { nama: "", jenis: "", tahun: "", tingkat: "Kabupaten", sertifikat: null }]);
    } else {
      alert("Maksimal input prestasi adalah 5.");
    }
  };

  const hapusPrestasi = (index) => {
    const updated = prestasiList.filter((_, i) => i !== index);
    setPrestasiList(updated);
  };

  // Simpan / Kirim Pendaftaran
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validasi berkas wajib
    if (!berkas.akta || !berkas.kk || !berkas.ktpAyah || !berkas.ktpIbu || !berkas.suratSehat || !berkas.pasFoto) {
      alert("Mohon lengkapi upload berkas wajib (Akta, KK, KTP Ayah, KTP Ibu, Surat Sehat, dan Pas Foto)!");
      return;
    }

    const payload = {
      formData,
      berkas,
      prestasiList,
      status: "Menunggu Verifikasi",
      tanggalDaftar: new Date().toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' })
    };

    // Simpan ke LocalStorage spesifik user
    localStorage.setItem(`form_${currentUser.email}`, JSON.stringify(payload));
    localStorage.setItem(`status_${currentUser.email}`, "Menunggu Verifikasi");

    alert("Formulir pendaftaran berhasil dikirim!");
    navigate("/status");
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <Navbar />

      <div className="container mx-auto px-4 md:px-6 max-w-4xl mt-8">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 border-t-4 border-blue-600">
          
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Formulir Pendaftaran Siswa Baru</h1>
            <p className="text-gray-500 text-sm mt-1">SDN 1 Calincing Tahun Ajaran 2026/2027</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* BAGIAN 1: DATA CALON SISWA */}
            <div>
              <h2 className="text-lg font-bold text-blue-700 border-b pb-2 mb-4">1. Data Calon Siswa</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nama Lengkap Siswa</label>
                  <input type="text" name="namaLengkap" required value={formData.namaLengkap} onChange={handleChange} 
                    className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">NISN</label>
                  <input type="text" name="nisn" required value={formData.nisn} onChange={handleChange} 
                    placeholder="Nomor Induk Siswa Nasional"
                    className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tempat Lahir</label>
                  <input type="text" name="tempatLahir" required value={formData.tempatLahir} onChange={handleChange} 
                    className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tanggal Lahir</label>
                  <input type="date" name="tanggalLahir" required value={formData.tanggalLahir} onChange={handleChange} 
                    className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Alamat Lengkap</label>
                  <textarea name="alamat" rows="2" required value={formData.alamat} onChange={handleChange} 
                    placeholder="Nama Jalan, RT/RW, Desa/Kelurahan, Kecamatan"
                    className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"></textarea>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Kontak WA / Telepon Orang Tua / Wali</label>
                  <input type="text" name="kontakOrtu" required value={formData.kontakOrtu} onChange={handleChange} 
                    placeholder="Contoh: 081234567890"
                    className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
              </div>
            </div>

            {/* BAGIAN 2: DATA AYAH */}
            <div>
              <h2 className="text-lg font-bold text-blue-700 border-b pb-2 mb-4">2. Data Ayah Kandung</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nama Lengkap Ayah</label>
                  <input type="text" name="namaAyah" required value={formData.namaAyah} onChange={handleChange} 
                    className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">NIK Ayah</label>
                  <input type="text" name="nikAyah" required value={formData.nikAyah} onChange={handleChange} 
                    placeholder="16 digit NIK KTP Ayah"
                    className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tempat Lahir Ayah</label>
                  <input type="text" name="tempatLahirAyah" required value={formData.tempatLahirAyah} onChange={handleChange} 
                    className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tanggal Lahir Ayah</label>
                  <input type="date" name="tanggalLahirAyah" required value={formData.tanggalLahirAyah} onChange={handleChange} 
                    className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Pekerjaan Ayah</label>
                  <input type="text" name="pekerjaanAyah" value={formData.pekerjaanAyah} onChange={handleChange} 
                    className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Penghasilan Bulanan Ayah</label>
                  <select name="penghasilanAyah" value={formData.penghasilanAyah} onChange={handleChange}
                    className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                    <option value="">Pilih Rentang Penghasilan</option>
                    <option value="Kurang dari Rp 1 Juta">Kurang dari Rp 1 Juta</option>
                    <option value="Rp 1 Juta - Rp 3 Juta">Rp 1 Juta - Rp 3 Juta</option>
                    <option value="Rp 3 Juta - Rp 5 Juta">Rp 3 Juta - Rp 5 Juta</option>
                    <option value="Lebih dari Rp 5 Juta">Lebih dari Rp 5 Juta</option>
                  </select>
                </div>
              </div>
            </div>

            {/* BAGIAN 3: DATA IBU */}
            <div>
              <h2 className="text-lg font-bold text-blue-700 border-b pb-2 mb-4">3. Data Ibu Kandung</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nama Lengkap Ibu</label>
                  <input type="text" name="namaIbu" required value={formData.namaIbu} onChange={handleChange} 
                    className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">NIK Ibu</label>
                  <input type="text" name="nikIbu" required value={formData.nikIbu} onChange={handleChange} 
                    placeholder="16 digit NIK KTP Ibu"
                    className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tempat Lahir Ibu</label>
                  <input type="text" name="tempatLahirIbu" required value={formData.tempatLahirIbu} onChange={handleChange} 
                    className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tanggal Lahir Ibu</label>
                  <input type="date" name="tanggalLahirIbu" required value={formData.tanggalLahirIbu} onChange={handleChange} 
                    className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Pekerjaan Ibu</label>
                  <input type="text" name="pekerjaanIbu" value={formData.pekerjaanIbu} onChange={handleChange} 
                    className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Penghasilan Bulanan Ibu</label>
                  <select name="penghasilanIbu" value={formData.penghasilanIbu} onChange={handleChange}
                    className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                    <option value="">Pilih Rentang Penghasilan</option>
                    <option value="Kurang dari Rp 1 Juta">Kurang dari Rp 1 Juta</option>
                    <option value="Rp 1 Juta - Rp 3 Juta">Rp 1 Juta - Rp 3 Juta</option>
                    <option value="Rp 3 Juta - Rp 5 Juta">Rp 3 Juta - Rp 5 Juta</option>
                    <option value="Lebih dari Rp 5 Juta">Lebih dari Rp 5 Juta</option>
                  </select>
                </div>
              </div>
            </div>

            {/* BAGIAN 4: UPLOAD BERKAS */}
            <div>
              <h2 className="text-lg font-bold text-blue-700 border-b pb-2 mb-4">4. Unggah Dokumen Persyaratan</h2>
              <p className="text-xs text-gray-500 mb-4">Format file yang didukung: Gambar (JPG/PNG) atau PDF. Setiap berkas dapat dilihat/di-preview langsung setelah di-upload.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {[
                  { label: "Akta Kelahiran Siswa (Wajib)", key: "akta" },
                  { label: "Kartu Keluarga / KK (Wajib)", key: "kk" },
                  { label: "KTP Ayah Kandung (Wajib)", key: "ktpAyah" },
                  { label: "KTP Ibu Kandung (Wajib)", key: "ktpIbu" },
                  { label: "Ijazah TK / PAUD (Jika Ada)", key: "ijazah" },
                  { label: "Surat Keterangan Sehat (Wajib)", key: "suratSehat" },
                  { label: "Pas Foto Siswa 3x4 (Wajib)", key: "pasFoto" },
                ].map((item) => (
                  <div key={item.key} className="p-3 border rounded-xl bg-gray-50 flex flex-col justify-between">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">{item.label}</label>
                      <input type="file" accept="image/*,.pdf" onChange={(e) => handleFileChange(e, item.key)} 
                        className="w-full text-xs text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                    </div>
                    {berkas[item.key] && (
                      <div className="mt-2 flex items-center justify-between bg-white p-2 rounded border border-green-200">
                        <span className="text-xs text-green-700 truncate max-w-[180px]">✓ {berkas[item.key].name}</span>
                        <a href={berkas[item.key].url} target="_blank" rel="noopener noreferrer" 
                          className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded font-bold hover:bg-blue-200">
                          Lihat Berkas
                        </a>
                      </div>
                    )}
                  </div>
                ))}

              </div>
            </div>

            {/* BAGIAN 5: PRESTASI DINAMIS (MAKSIMAL 5) */}
            <div>
              <div className="flex justify-between items-center border-b pb-2 mb-4">
                <h2 className="text-lg font-bold text-blue-700">5. Data Prestasi Siswa (Opsional - Maks. 5)</h2>
                {prestasiList.length < 5 && (
                  <button type="button" onClick={tambahPrestasi} className="px-3 py-1 bg-green-600 text-white rounded-lg text-xs font-bold hover:bg-green-700 transition">
                    + Tambah Prestasi
                  </button>
                )}
              </div>

              <div className="space-y-4">
                {prestasiList.map((item, index) => (
                  <div key={index} className="p-4 border rounded-xl bg-gray-50 relative space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-gray-500 uppercase">Prestasi #{index + 1}</span>
                      {prestasiList.length > 1 && (
                        <button type="button" onClick={() => hapusPrestasi(index)} className="text-red-500 text-xs font-bold hover:underline">
                          Hapus
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                      <div>
                        <label className="block text-xs text-gray-600">Nama Prestasi</label>
                        <input type="text" value={item.nama} onChange={(e) => handlePrestasiChange(index, "nama", e.target.value)}
                          placeholder="Contoh: Juara 1 Mewarnai" className="w-full px-3 py-1.5 text-sm border rounded-lg bg-white" />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600">Jenis Prestasi</label>
                        <input type="text" value={item.jenis} onChange={(e) => handlePrestasiChange(index, "jenis", e.target.value)}
                          placeholder="Akademik / Non-Akademik" className="w-full px-3 py-1.5 text-sm border rounded-lg bg-white" />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600">Tahun</label>
                        <input type="number" value={item.tahun} onChange={(e) => handlePrestasiChange(index, "tahun", e.target.value)}
                          placeholder="2025" className="w-full px-3 py-1.5 text-sm border rounded-lg bg-white" />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600">Tingkat Prestasi</label>
                        <select value={item.tingkat} onChange={(e) => handlePrestasiChange(index, "tingkat", e.target.value)}
                          className="w-full px-3 py-1.5 text-sm border rounded-lg bg-white">
                          <option value="Lokal / Sekolah">Lokal / Sekolah</option>
                          <option value="Kecamatan">Kecamatan</option>
                          <option value="Kabupaten">Kabupaten</option>
                          <option value="Provinsi">Provinsi</option>
                          <option value="Nasional">Nasional</option>
                          <option value="Internasional">Internasional</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-2 border-t">
                      <div className="w-full sm:w-auto">
                        <label className="block text-xs text-gray-600 mb-1">Upload Bukti Sertifikat / Piagam</label>
                        <input type="file" accept="image/*,.pdf" onChange={(e) => handleSertifikatChange(index, e)} 
                          className="text-xs text-gray-500 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:bg-blue-50 file:text-blue-700" />
                      </div>
                      {item.sertifikat && (
                        <a href={item.sertifikat.url} target="_blank" rel="noopener noreferrer" 
                          className="text-xs bg-blue-100 text-blue-700 px-3 py-1.5 rounded font-bold hover:bg-blue-200">
                          Lihat Sertifikat: {item.sertifikat.name}
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* TOMBOL SUBMIT */}
            <div className="pt-4 border-t">
              <button type="submit" className="w-full py-3.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition shadow-lg text-lg">
                Kirim Pendaftaran Sekarang
              </button>
            </div>

          </form>

        </div>
      </div>
    </div>
  );
}
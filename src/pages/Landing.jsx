import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  const isPendaftaranBuka = true; 

  // Daftar gambar untuk slider background
  const slides = [
    "/landing/images-1.jpg",
    "/landing/images-2.jpg"
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Efek ganti slide otomatis setiap 5 detik
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      
      {/* Background Slider Container */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100 scale-105" : "opacity-0 scale-100"
            }`}
            style={{ 
              backgroundImage: `url(${slide})`,
              transition: "opacity 1s ease-in-out, transform 6s ease-out" 
            }}
          />
        ))}
        {/* Overlay Gelap Transparan agar teks tetap kontras dan mudah dibaca */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
      </div>

      {/* Header Publik (Dibuat transparan/semi-transparan agar menyatu dengan slider) */}
      <nav className="relative z-10 bg-white/90 backdrop-blur-md shadow-sm p-4 transition-all">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="flex items-center gap-3">
            <img src="/logo-tutwuri.png" alt="Logo" className="w-10 h-10" />
            <span className="text-lg font-bold text-blue-700">SDN 1 Calincing</span>
          </div>
          <div className="flex gap-4">
            <Link to="/login" className="px-4 py-2 text-blue-600 font-semibold hover:bg-blue-50 rounded-lg transition">Masuk</Link>
            <Link to="/register" className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition shadow-sm">Daftar</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 flex-grow flex items-center justify-center p-6">
        <div className="max-w-3xl text-center text-white">
          
          <div className="inline-block mb-6">
            {isPendaftaranBuka ? (
              <span className="bg-green-500/90 text-white px-6 py-2 rounded-full font-bold text-sm tracking-wide border border-green-400 shadow-lg animate-pulse">
                🟢 PENDAFTARAN SEDANG DIBUKA
              </span>
            ) : (
              <span className="bg-red-500/90 text-white px-6 py-2 rounded-full font-bold text-sm tracking-wide border border-red-400 shadow-lg">
                🔴 PENDAFTARAN TELAH DITUTUP
              </span>
            )}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight drop-shadow-md">
            Penerimaan Peserta Didik Baru <br/>
            <span className="text-blue-400">Tahun Ajaran 2026/2027</span>
          </h1>
          
          <p className="text-lg text-gray-200 mb-10 leading-relaxed max-w-2xl mx-auto drop-shadow">
            Selamat datang di portal pendaftaran online SDN 1 Calincing. Siapkan berkas persyaratan seperti Kartu Keluarga, Akta Kelahiran, dan Ijazah TK/PAUD.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {isPendaftaranBuka ? (
              <Link to="/register" className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition shadow-xl text-lg hover:scale-105 transform duration-200">
                Daftar Sekarang
              </Link>
            ) : (
              <button disabled className="px-8 py-4 bg-gray-500 text-white font-bold rounded-xl cursor-not-allowed text-lg opacity-70">
                Pendaftaran Ditutup
              </button>
            )}
            <Link to="/login" className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border-2 border-white font-bold rounded-xl transition shadow-xl text-lg backdrop-blur-sm hover:scale-105 transform duration-200">
              Sudah Punya Akun? Masuk
            </Link>
          </div>

          {/* Indikator Titik Slider (Opsional untuk pemanis) */}
          <div className="flex justify-center gap-2 mt-10">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === currentSlide ? "w-8 bg-blue-500" : "w-2.5 bg-white/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
const EducationChatbot = require("../chatbot");

describe("EducationChatbot Unit Tests", () => {
  let bot;

  beforeAll(() => {
    bot = new EducationChatbot();
  });

  // 1. Perbandingan Jurusan
  test("Perbedaan Teknik Informatika dan Ilmu Komputer", () => {
    const result = bot.processMessage(
      "Apa perbedaan teknik informatika dan ilmu komputer?"
    );
    expect(result.response).toContain("💻 **Perbedaan Program Studi:**");
    expect(result.response).toContain("Teknik Informatika");
    expect(result.response).toContain("Ilmu Komputer");
    expect(result.category).toBe("program_study");
  });

  test("Perbedaan Sistem Informasi dan Manajemen", () => {
    const result = bot.processMessage(
      "Beda sistem informasi dan manajemen apa?"
    );
    expect(result.response).toContain("Sistem Informasi");
    expect(result.response).toContain("Manajemen");
  });

  test("Perbedaan Kedokteran dan Farmasi", () => {
    const result = bot.processMessage("Perbedaan kedokteran dan farmasi?");
    expect(result.response).toContain("Kedokteran");
    expect(result.response).toContain("Farmasi");
  });

  // 2. Deskripsi Jurusan (satu jurusan)
  test("Deskripsi Teknik Informatika", () => {
    const result = bot.processMessage("jurusan teknik informatika");
    expect(result.response).toContain("📚 **Informasi Program Studi:**");
    expect(result.response).toContain("Teknik Informatika");
  });

  test("Deskripsi Ilmu Komputer tanpa kata jurusan", () => {
    const result = bot.processMessage("ilmu komputer");
    expect(result.response).toContain("Ilmu Komputer");
  });

  test("Deskripsi Hubungan Internasional", () => {
    const result = bot.processMessage("jurusan hubungan internasional");
    expect(result.response).toContain("Hubungan Internasional");
  });

  test("Deskripsi Jurusan Tidak Ada", () => {
    const result = bot.processMessage("jurusan astronomi");
    expect(result.response).toContain("Maaf, saya belum punya informasi");
  });

  // 3. Prospek Karir
  test("Prospek Kerja Teknik", () => {
    const result = bot.processMessage("prospek kerja teknik");
    expect(result.response).toContain("⚙️ **Teknik:**");
  });

  test("Prospek Kerja Kedokteran", () => {
    const result = bot.processMessage("prospek masa depan kedokteran");
    expect(result.response).toContain("🩺 **Kedokteran:**");
  });

  test("Prospek Kerja Ekonomi", () => {
    const result = bot.processMessage("bagaimana prospek kerja ekonomi?");
    expect(result.response).toContain("💼 **Ekonomi:**");
  });

  test("Prospek Hukum", () => {
    const result = bot.processMessage("peluang kerja hukum di masa depan");
    expect(result.response).toContain("⚖️ **Hukum:**");
  });

  test("Prospek Ilmu Komunikasi", () => {
    const result = bot.processMessage("karir masa depan komunikasi");
    expect(result.response).toContain("📡 **Ilmu Komunikasi:**");
  });

  test("Prospek Hubungan Internasional", () => {
    const result = bot.processMessage("prospek kerja internasional");
    expect(result.response).toContain("🌍 **Hubungan Internasional:**");
  });

  test("Prospek Jurusan Tidak Ada", () => {
    const result = bot.processMessage("prospek kerja perhotelan");
    expect(result.response).toContain("Maaf, saya belum punya data prospek");
  });
  // 1. Ujian Masuk Kuliah
  describe("Ujian Masuk Kuliah", () => {
    test("Ujian masuk universitas", () => {
      const result = bot.processMessage("ujian masuk universitas");
      expect(result.response).toContain("📝 **SNBP**");
      expect(result.response).toContain("📝 **SNBT**");
      expect(result.response).toContain("📝 **Mandiri**");
      expect(result.category).toBe("college_general");
      expect(result.confidence).toBeGreaterThan(0.3);
    });

    test("Tes seleksi kuliah", () => {
      const result = bot.processMessage("tes seleksi masuk kuliah");
      expect(result.response).toContain("SNBP");
      expect(result.response).toContain("SNBT");
      expect(result.category).toBe("college_general");
    });

    test("Seleksi masuk kampus", () => {
      const result = bot.processMessage("seleksi masuk kampus");
      expect(result.response).toContain("Seleksi Nasional");
      expect(result.category).toBe("college_general");
    });
  });

  // 2. Kuliah Dalam Negeri vs Luar Negeri
  describe("Kuliah Dalam/Luar Negeri", () => {
    test("Keuntungan kuliah dalam negeri", () => {
      const result = bot.processMessage("keuntungan kuliah dalam negeri");
      expect(result.response).toContain("🇮🇩 **Kuliah Dalam Negeri:**");
      expect(result.response).toContain("🌍 **Kuliah Luar Negeri:**");
      expect(result.response).toContain("Biaya lebih terjangkau");
      expect(result.category).toBe("college_general");
    });

    test("Manfaat kuliah luar negeri", () => {
      const result = bot.processMessage("manfaat kuliah luar negeri");
      expect(result.response).toContain("Exposure internasional");
      expect(result.response).toContain("Peluang karir global");
      expect(result.category).toBe("college_general");
    });

    test("Kelebihan kuliah dalam negeri", () => {
      const result = bot.processMessage("kelebihan kuliah dalam negeri");
      expect(result.response).toContain("Dekat dengan keluarga");
      expect(result.category).toBe("college_general");
    });
  });

  // 3. Beasiswa
  describe("Beasiswa", () => {
    test("Informasi beasiswa", () => {
      const result = bot.processMessage("beasiswa");
      expect(result.response).toContain("💰 **Jenis Beasiswa yang Tersedia:**");
      expect(result.response).toContain("LPDP");
      expect(result.response).toContain("Bidikmisi/KIP Kuliah");
      expect(result.category).toBe("college_general");
    });

    test("Bantuan biaya kuliah", () => {
      const result = bot.processMessage("bantuan biaya kuliah");
      expect(result.response).toContain("Beasiswa Pemerintah");
      expect(result.response).toContain("Beasiswa Swasta");
      expect(result.category).toBe("college_general");
    });

    test("Dana pendidikan", () => {
      const result = bot.processMessage("dana pendidikan");
      expect(result.response).toContain("DAAD");
      expect(result.response).toContain("Chevening");
      expect(result.category).toBe("college_general");
    });
  });

  // 4. Tips Memilih Jurusan
  describe("Tips Memilih Jurusan", () => {
    test("Tips memilih jurusan", () => {
      const result = bot.processMessage("tips memilih jurusan");
      expect(result.response).toContain("🎯 **Tips Memilih Program Studi:**");
      expect(result.response).toContain("Kenali Minat & Bakat");
      expect(result.response).toContain("Riset Prospek Karir");
      expect(result.category).toBe("college_general");
    });

    test("Cara pilih prodi", () => {
      const result = bot.processMessage("cara pilih prodi");
      expect(result.response).toContain("Pertimbangkan Kemampuan");
      expect(result.response).toContain("Lihat Akreditasi");
      expect(result.category).toBe("college_general");
    });

    test("Bagaimana memilih program studi", () => {
      const result = bot.processMessage("bagaimana memilih program studi");
      expect(result.response).toContain("Survey Kampus");
      expect(result.category).toBe("college_general");
    });
  });

  // 5. PTN (Perguruan Tinggi Negeri)
  describe("PTN", () => {
    test("Perguruan tinggi negeri", () => {
      const result = bot.processMessage("perguruan tinggi negeri");
      expect(result.response).toContain(
        "🏛️ **Perguruan Tinggi Negeri (PTN) Populer:**"
      );
      expect(result.response).toContain("UI (Universitas Indonesia)");
      expect(result.response).toContain("ITB (Institut Teknologi Bandung)");
      expect(result.category).toBe("college_general");
    });

    test("PTN terbaik", () => {
      const result = bot.processMessage("ptn terbaik");
      expect(result.response).toContain("UGM (Universitas Gadjah Mada)");
      expect(result.response).toContain("Biaya kuliah terjangkau");
      expect(result.category).toBe("college_general");
    });

    test("Universitas negeri", () => {
      const result = bot.processMessage("universitas negeri");
      expect(result.response).toContain("UNDIP");
      expect(result.response).toContain("UNPAD");
      expect(result.category).toBe("college_general");
    });
  });

  // 6. PTS (Perguruan Tinggi Swasta)
  describe("PTS", () => {
    test("Perguruan tinggi swasta", () => {
      const result = bot.processMessage("perguruan tinggi swasta");
      expect(result.response).toContain(
        "🏢 **Perguruan Tinggi Swasta (PTS) Terbaik:**"
      );
      expect(result.response).toContain("Universitas Bina Nusantara (BINUS)");
      expect(result.response).toContain("Universitas Trisakti");
      expect(result.category).toBe("college_general");
    });

    test("PTS unggulan", () => {
      const result = bot.processMessage("pts unggulan");
      expect(result.response).toContain("Fasilitas modern");
      expect(result.response).toContain("Industry partnership kuat");
      expect(result.category).toBe("college_general");
    });

    test("Universitas swasta terbaik", () => {
      const result = bot.processMessage("universitas swasta terbaik");
      expect(result.response).toContain("Kelas lebih kecil");
      expect(result.category).toBe("college_general");
    });
  });

  // 7. Akreditasi & Ranking
  describe("Akreditasi & Ranking", () => {
    test("Akreditasi kampus", () => {
      const result = bot.processMessage("akreditasi kampus");
      expect(result.response).toContain("📊 **Cara Cek Kualitas Kampus:**");
      expect(result.response).toContain("A (Unggul)");
      expect(result.response).toContain("B (Baik)");
      expect(result.category).toBe("college_general");
    });

    test("Kualitas universitas", () => {
      const result = bot.processMessage("kualitas universitas");
      expect(result.response).toContain("QS World University Rankings");
      expect(result.response).toContain("Times Higher Education");
      expect(result.category).toBe("college_general");
    });

    test("Ranking kampus", () => {
      const result = bot.processMessage("ranking kampus");
      expect(result.response).toContain("BAN-PT");
      expect(result.response).toContain("Job placement rate");
      expect(result.category).toBe("college_general");
    });
  });

  // 8. Jalur Masuk Kuliah
  describe("Jalur Masuk", () => {
    test("Jalur masuk kuliah", () => {
      const result = bot.processMessage("jalur masuk kuliah");
      expect(result.response).toContain("🚪 **Jalur Masuk Perguruan Tinggi:**");
      expect(result.response).toContain("SNBP (dulu SNMPTN)");
      expect(result.response).toContain("20% kuota");
      expect(result.category).toBe("college_general");
    });

    test("Cara masuk universitas", () => {
      const result = bot.processMessage("cara masuk universitas");
      expect(result.response).toContain("40% kuota");
      expect(result.response).toContain("Tes Mandiri");
      expect(result.category).toBe("college_general");
    });

    test("Cara masuk kampus", () => {
      const result = bot.processMessage("cara masuk kampus");
      expect(result.response).toContain("Jalur Prestasi");
      expect(result.response).toContain("Jaga nilai rapor konsisten");
      expect(result.category).toBe("college_general");
    });
  });

  // 9. Persiapan SNBT/UTBK
  describe("Persiapan SNBT/UTBK", () => {
    test("Persiapan SNBT", () => {
      const result = bot.processMessage("persiapan snbt");
      expect(result.response).toContain("📚 **Persiapan SNBT/UTBK:**");
      expect(result.response).toContain("TPS (Tes Potensi Skolastik)");
      expect(result.response).toContain("TKA Saintek");
      expect(result.category).toBe("college_general");
    });

    test("Belajar UTBK", () => {
      const result = bot.processMessage("belajar utbk");
      expect(result.response).toContain("Timeline Persiapan");
      expect(result.response).toContain("H-12 bulan");
      expect(result.category).toBe("college_general");
    });

    test("Persiapan SBMPTN", () => {
      const result = bot.processMessage("persiapan sbmptn");
      expect(result.response).toContain("Latih soal HOTS");
      expect(result.response).toContain("Manage waktu pengerjaan");
      expect(result.category).toBe("college_general");
    });
  });

  // 10. Tempat Tinggal Mahasiswa
  describe("Tempat Tinggal", () => {
    test("Kos mahasiswa", () => {
      const result = bot.processMessage("kos mahasiswa");
      expect(result.response).toContain(
        "🏠 **Pilihan Tempat Tinggal Mahasiswa:**"
      );
      expect(result.response).toContain("🏢 **Asrama Kampus:**");
      expect(result.response).toContain("🏘️ **Kos-kosan:**");
      expect(result.category).toBe("college_general");
    });

    test("Asrama kuliah", () => {
      const result = bot.processMessage("asrama kuliah");
      expect(result.response).toContain("Rp 300rb - 1,5jt/bulan");
      expect(result.response).toContain("Dekat kampus, aman, community");
      expect(result.category).toBe("college_general");
    });

    test("Tempat tinggal mahasiswa", () => {
      const result = bot.processMessage("tempat tinggal mahasiswa");
      expect(result.response).toContain("Kontrakan/Sewa Rumah");
      expect(result.response).toContain("Cek keamanan lingkungan");
      expect(result.category).toBe("college_general");
    });
  });

  // 11. Organisasi & UKM
  describe("Organisasi & UKM", () => {
    test("Organisasi mahasiswa", () => {
      const result = bot.processMessage("organisasi mahasiswa");
      expect(result.response).toContain(
        "🎯 **Organisasi & Kegiatan Mahasiswa:**"
      );
      expect(result.response).toContain("BEM (Badan Eksekutif Mahasiswa)");
      expect(result.response).toContain("DPM (Dewan Perwakilan Mahasiswa)");
      expect(result.category).toBe("college_general");
    });

    test("UKM kampus", () => {
      const result = bot.processMessage("ukm kampus");
      expect(result.response).toContain("UKM (Unit Kegiatan Mahasiswa)");
      expect(result.response).toContain("Seni: Teater, Band, Tari");
      expect(result.category).toBe("college_general");
    });

    test("Kegiatan mahasiswa", () => {
      const result = bot.processMessage("kegiatan mahasiswa");
      expect(result.response).toContain("Soft skills development");
      expect(result.response).toContain("Networking & friendship");
      expect(result.category).toBe("college_general");
    });
  });

  // 12. Magang & Internship
  describe("Magang & Internship", () => {
    test("Magang mahasiswa", () => {
      const result = bot.processMessage("magang");
      expect(result.response).toContain("💼 **Program Magang/Internship:**");
      expect(result.response).toContain("Kerja Praktek (KP)");
      expect(result.response).toContain("Fresh Graduate Program");
      expect(result.category).toBe("college_general");
    });

    test("Internship program", () => {
      const result = bot.processMessage("internship");
      expect(result.response).toContain("BUMN: Pertamina, PLN, Telkom");
      expect(result.response).toContain("Swasta: Unilever, Gojek");
      expect(result.category).toBe("college_general");
    });

    test("Kerja praktek", () => {
      const result = bot.processMessage("kerja praktek");
      expect(result.response).toContain("Real work experience");
      expect(result.response).toContain("Apply 3-6 bulan sebelumnya");
      expect(result.category).toBe("college_general");
    });
  });

  // 13. Kerja Part Time
  describe("Kerja Part Time", () => {
    test("Part time mahasiswa", () => {
      const result = bot.processMessage("part time");
      expect(result.response).toContain("💰 **Kerja Sambil Kuliah:**");
      expect(result.response).toContain("Content Writer");
      expect(result.response).toContain("Graphic Design");
      expect(result.category).toBe("college_general");
    });

    test("Kerja sambil kuliah", () => {
      const result = bot.processMessage("kerja sambil kuliah");
      expect(result.response).toContain("Virtual Assistant");
      expect(result.response).toContain("Maksimal 20 jam/minggu");
      expect(result.category).toBe("college_general");
    });

    test("Freelance mahasiswa", () => {
      const result = bot.processMessage("freelance");
      expect(result.response).toContain("Social Media Admin");
      expect(result.response).toContain("Time management yang baik");
      expect(result.category).toBe("college_general");
    });
  });

  // 14. Prestasi Akademik
  describe("Prestasi Akademik", () => {
    test("Lulus tepat waktu", () => {
      const result = bot.processMessage("lulus tepat waktu");
      expect(result.response).toContain("🎓 **Tips Sukses Akademik:**");
      expect(result.response).toContain("IPK 3.50-4.00: Cum Laude");
      expect(result.response).toContain("Planning mata kuliah");
      expect(result.category).toBe("college_general");
    });

    test("IPK tinggi", () => {
      const result = bot.processMessage("ipk");
      expect(result.response).toContain("IPK 3.00-3.49: Satisfactory");
      expect(result.response).toContain("Active learning");
      expect(result.category).toBe("college_general");
    });

    test("Prestasi akademik", () => {
      const result = bot.processMessage("prestasi akademik");
      expect(result.response).toContain("Study group dengan teman");
      expect(result.response).toContain("Ikuti kompetisi akademik");
      expect(result.category).toBe("college_general");
    });
  });

  // 15. Mental Health
  describe("Mental Health", () => {
    test("Stress kuliah", () => {
      const result = bot.processMessage("stress kuliah");
      expect(result.response).toContain("🧠 **Mental Health Mahasiswa:**");
      expect(result.response).toContain("Susah fokus belajar");
      expect(result.response).toContain("Gangguan tidur");
      expect(result.category).toBe("college_general");
    });

    test("Mental health mahasiswa", () => {
      const result = bot.processMessage("mental health mahasiswa");
      expect(result.response).toContain("Break dan refreshing rutin");
      expect(result.response).toContain("Konseling kampus");
      expect(result.category).toBe("college_general");
    });

    test("Burnout kuliah", () => {
      const result = bot.processMessage("burnout");
      expect(result.response).toContain("Hotline kesehatan mental");
      expect(result.response).toContain("Mental health adalah prioritas");
      expect(result.category).toBe("college_general");
    });
  });

  // 16. Fresh Graduate
  describe("Fresh Graduate", () => {
    test("Persiapan fresh graduate", () => {
      const result = bot.processMessage("persiapan fresh graduate");
      expect(result.response).toContain("🎯 **Persiapan Fresh Graduate:**");
      expect(result.response).toContain("CV profesional");
      expect(result.response).toContain("LinkedIn profile");
      expect(result.category).toBe("college_general");
    });

    test("Tips lulus kuliah", () => {
      const result = bot.processMessage("tips lulus kuliah");
      expect(result.response).toContain("Job Hunting Strategy");
      expect(result.response).toContain("Network dengan alumni");
      expect(result.category).toBe("college_general");
    });

    test("Persiapan lulus kuliah", () => {
      const result = bot.processMessage("persiapan lulus kuliah");
      expect(result.response).toContain("Technical skills");
      expect(result.response).toContain("Corporate job");
      expect(result.category).toBe("college_general");
    });
  });

  // Edge Cases & Variations
  describe("Edge Cases", () => {
    test("Mixed case input", () => {
      const result = bot.processMessage("BEASISWA kuliah");
      expect(result.category).toBe("college_general");
      expect(result.response).toContain("LPDP");
    });

    test("Input dengan typo", () => {
      const result = bot.processMessage("beasiwa");
      expect(result.category).toBe("college_general");
    });

    test("Partial match", () => {
      const result = bot.processMessage("saya butuh info beasiswa");
      expect(result.category).toBe("college_general");
      expect(result.response).toContain("Beasiswa");
    });

    test("Long sentence with keyword", () => {
      const result = bot.processMessage(
        "Saya ingin tahu tentang persiapan ujian masuk universitas yang baik"
      );
      expect(result.category).toBe("college_general");
      expect(result.response).toContain("SNBP");
    });
  });

  // Response Quality Tests
  describe("Response Quality", () => {
    test("Response contains emoji", () => {
      const result = bot.processMessage("beasiswa");
      expect(result.response).toMatch(/[🎓📚💰🏢🌏]/);
    });

    test("Response is informative", () => {
      const result = bot.processMessage("ptn terbaik");
      expect(result.response.length).toBeGreaterThan(100);
      expect(result.response).toContain("**");
    });

    test("Confidence score reasonable", () => {
      const result = bot.processMessage("ujian masuk universitas");
      expect(result.confidence).toBeGreaterThan(0.3);
      expect(result.confidence).toBeLessThanOrEqual(1.0);
    });
  });
});

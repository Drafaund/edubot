class EducationChatbot {
  constructor() {
    this.rules = this.initializeRules();
    this.context = {};
    this.jurusanDescriptions = {
      "teknik informatika":
        "• Fokus: Programming, algoritma, software engineering\n• Matematis dan teknis\n• Prospek: Software Developer, System Analyst",
      "ilmu komputer":
        "• Fokus: Teori komputasi, AI, data science\n• Lebih teoritis dan riset\n• Prospek: Data Scientist, Researcher, AI Engineer",
      "sistem informasi":
        "• Fokus: Manajemen IT, business process\n• Gabungan IT dan bisnis\n• Prospek: IT Consultant, Business Analyst",
      "teknik elektro":
        "• Fokus: Kelistrikan, elektronika, telekomunikasi\n• Prospek: Electrical Engineer, Automation Engineer, Power Plant Engineer",
      "teknik sipil":
        "• Fokus: Infrastruktur, konstruksi, manajemen proyek\n• Prospek: Civil Engineer, Project Manager, Konsultan Infrastruktur",
      kedokteran:
        "• Fokus: Ilmu medis, diagnosis, pengobatan penyakit\n• Prospek: Dokter Umum, Spesialis, Peneliti Medis",
      farmasi:
        "• Fokus: Obat, kimia medisinal, farmakologi\n• Prospek: Apoteker, Quality Control, Research Scientist",
      manajemen:
        "• Fokus: Manajemen organisasi, SDM, keuangan\n• Prospek: Manager, Business Analyst, Marketing Specialist",
      akuntansi:
        "• Fokus: Laporan keuangan, audit, perpajakan\n• Prospek: Akuntan Publik, Auditor, Tax Consultant",
      "ilmu hukum":
        "• Fokus: Hukum perdata, pidana, bisnis, tata negara\n• Prospek: Pengacara, Hakim, Notaris, Corporate Legal",
      "hubungan internasional":
        "• Fokus: Diplomasi, politik global, organisasi internasional\n• Prospek: Diplomat, International Analyst, NGO Specialist",
      "ilmu komunikasi":
        "• Fokus: Media, PR, jurnalistik, digital communication\n• Prospek: Public Relations, Content Creator, Jurnalis",
    };

    this.prospekJurusan = {
      teknik: "⚙️ **Teknik:** Engineer, Project Manager, Konsultan",
      kedokteran: "🩺 **Kedokteran:** Dokter, Spesialis, Peneliti Medis",
      ekonomi: "💼 **Ekonomi:** Akuntan, Financial Analyst, Banker",
      hukum: "⚖️ **Hukum:** Lawyer, Notaris, Hakim, Corporate Legal",
      komunikasi: "📡 **Ilmu Komunikasi:** PR, Jurnalis, Content Creator",
      internasional:
        "🌍 **Hubungan Internasional:** Diplomat, Konsultan NGO, Analis Global",
    };

    this.reflections = {
      saya: "Anda",
      aku: "Anda",
      ku: "Anda",
      kamu: "saya",
      anda: "saya",
      "milik saya": "milik Anda",
      "milik aku": "milik Anda",
      "milik kamu": "milik saya",
      "milik anda": "milik saya",
      "ingin saya": "ingin Anda",
      "mau saya": "mau Anda",
      "pengen saya": "pengen Anda",
      "butuh saya": "butuh Anda",
      "perlu saya": "perlu Anda",
    };
  }

  initializeRules() {
    return {
      // Greeting patterns
      greeting: [
        {
          pattern:
            /^(ha+i+|ha+l+o+|hi+|hel+o+|se?lamat (pagi+|sia+n+g+|sore+|mala+m+)|assalamualaikum)$/i,
          responses: [
            "Hai! Selamat datang di EduBot - Konsultasi Pendidikan! 🎓",
            "Halo! Saya EduBot, siap membantu konsultasi pendidikan Anda!",
            "Hi! Saya di sini untuk membantu pertanyaan seputar kuliah dan program studi.",
          ],
        },
      ],
      // Pertanyaan umum tentang kuliah
      college_general: [
        {
          pattern:
            /(ujian|tes|seleksi).*(masuk|kuliah|universitas|kampus|perguruan tinggi)/i,
          responses: [
            "Untuk masuk kuliah, ada beberapa jalur ujian:\n\n📝 **SNBP** (Seleksi Nasional Berdasarkan Prestasi) - jalur undangan\n📝 **SNBT** (Seleksi Nasional Berdasarkan Tes) - tes tulis\n📝 **Mandiri** - ujian mandiri kampus\n📝 **SIMAK UI, SBMPTN, dll** - tes khusus kampus tertentu\n\nAda pertanyaan spesifik tentang salah satu ujian ini?",
          ],
        },
        {
          pattern:
            /(keuntungan|manfaat|kelebihan).*(kuliah).*(dalam negeri|luar negeri)/i,
          responses: [
            "🇮🇩 **Kuliah Dalam Negeri:**\n• Biaya lebih terjangkau\n• Dekat dengan keluarga\n• Familiar dengan budaya\n• Jaringan alumni luas di Indonesia\n\n🌍 **Kuliah Luar Negeri:**\n• Exposure internasional\n• Fasilitas canggih\n• Peluang karir global\n• Pengalaman budaya berbeda\n\nMana yang lebih menarik untuk {reflect}?",
          ],
        },
        {
          pattern: /(beasiswa|bantuan biaya|dana pendidikan)/i,
          responses: [
            "💰 **Jenis Beasiswa yang Tersedia:**\n\n📚 **Beasiswa Pemerintah:**\n• LPDP (Lembaga Pengelola Dana Pendidikan)\n• Bidikmisi/KIP Kuliah\n• Beasiswa Unggulan Kemendikbud\n\n🏢 **Beasiswa Swasta:**\n• Bank Indonesia\n• Djarum Foundation\n• Tanoto Foundation\n\n🌏 **Beasiswa Luar Negeri:**\n• Chevening (UK)\n• DAAD (Jerman)\n• Fulbright (USA)\n\nPerlu info detail beasiswa tertentu?",
          ],
        },
        {
          pattern:
            /(tips|cara|bagaimana).*(memilih|pilih|milih).*(jurusan|prodi|program studi)/i,
          responses: [
            "🎯 **Tips Memilih Program Studi:**\n\n1. **Kenali Minat & Bakat** - Apa yang {reflect} sukai?\n2. **Riset Prospek Karir** - Peluang kerja masa depan\n3. **Pertimbangkan Kemampuan** - Sesuai dengan skill\n4. **Lihat Akreditasi** - Kualitas program studi\n5. **Survey Kampus** - Fasilitas dan lingkungan\n\nAda prodi spesifik yang ingin Anda tanyakan?",
          ],
        },
        {
          pattern:
            /(persiapan|belajar|dipersiapkan).*(snbt|ujian|sbmptn|utbk)/i,
          responses: [
            "📚 **Persiapan SNBT/UTBK:**\n\n📖 **Materi yang Diujikan:**\n• TPS (Tes Potensi Skolastik): Logika, bahasa\n• TKA Saintek: Mat, Fis, Kim, Bio\n• TKA Soshum: Sej, Geo, Eko, Sose\n• Bahasa Inggris & Indonesia\n\n⏰ **Timeline Persiapan:**\n• H-12 bulan: Mulai belajar konsep dasar\n• H-6 bulan: Intensif latihan soal\n• H-3 bulan: Tryout rutin + evaluasi\n• H-1 bulan: Review & mental preparation\n\n💪 **Tips Jitu:**\n• Latih soal HOTS (Higher Order Thinking)\n• Manage waktu pengerjaan\n• Fokus pada materi yang sering keluar\n• Jaga kesehatan fisik & mental\n\nButuh strategi belajar detail?",
          ],
        },
        {
          pattern: /(ptn|perguruan tinggi negeri|universitas negeri)/i,
          responses: [
            "🏛️ **Perguruan Tinggi Negeri (PTN) Populer:**\n\n🥇 **Top PTN Indonesia:**\n• UI (Universitas Indonesia)\n• ITB (Institut Teknologi Bandung)\n• UGM (Universitas Gadjah Mada)\n• ITS (Institut Teknologi Sepuluh Nopember)\n• IPB (Institut Pertanian Bogor)\n• UNPAD (Universitas Padjadjaran)\n• UNDIP (Universitas Diponegoro)\n\n✅ **Keunggulan PTN:**\n• Biaya kuliah terjangkau\n• Reputasi dan akreditasi baik\n• Fasilitas lengkap\n• Alumni network kuat\n\nIngin info PTN tertentu?",
          ],
        },
        {
          pattern: /(pts|perguruan tinggi swasta|universitas swasta)/i,
          responses: [
            "🏢 **Perguruan Tinggi Swasta (PTS) Terbaik:**\n\n⭐ **PTS Unggulan:**\n• Universitas Bina Nusantara (BINUS)\n• Universitas Trisakti\n• Universitas Katolik Indonesia Atma Jaya\n• Universitas Tarumanagara\n• Universitas Pelita Harapan\n• Universitas Kristen Petra\n\n💡 **Keunggulan PTS:**\n• Fasilitas modern\n• Kelas lebih kecil (perhatian personal)\n• Program internasional\n• Industry partnership kuat\n\nBiaya memang lebih mahal, tapi kualitas pendidikan setara PTN top. Minat PTS mana?",
          ],
        },
        {
          pattern:
            /(akreditasi|kualitas|ranking).*(kampus|universitas|perguruan tinggi)/i,
          responses: [
            "📊 **Cara Cek Kualitas Kampus:**\n\n🏆 **Akreditasi:**\n• A (Unggul) - Kualitas terbaik\n• B (Baik) - Kualitas standar\n• C (Cukup) - Kualitas minimum\n• *Cek di website BAN-PT*\n\n📈 **Ranking Internasional:**\n• QS World University Rankings\n• Times Higher Education\n• Webometrics\n\n🔍 **Yang Perlu Dicek:**\n• Akreditasi program studi\n• Fasilitas lab dan perpustakaan\n• Kualitas dosen (S2/S3)\n• Kerjasama industri\n• Job placement rate\n\nMau cek akreditasi kampus tertentu?",
          ],
        },
        {
          pattern:
            /(jalur masuk|cara masuk).*(kuliah|kampus|universitas|perguruan tinggi)/i,
          responses: [
            "🚪 **Jalur Masuk Perguruan Tinggi:**\n\n📚 **PTN (Perguruan Tinggi Negeri):**\n• SNBP (dulu SNMPTN) - 20% kuota, tanpa tes\n• SNBT (dulu SBMPTN) - 40% kuota, tes tulis\n• Mandiri PTN - 40% kuota, tes kampus\n\n🏢 **PTS (Perguruan Tinggi Swasta):**\n• Tes Mandiri\n• Jalur Prestasi\n• Jalur Beasiswa\n• Transfer/Pindahan\n\n💡 **Tips Sukses:**\n• Persiapkan dari kelas 10-11\n• Jaga nilai rapor konsisten\n• Ikuti tryout rutin\n• Pilih prodi sesuai minat\n\nMau strategi khusus jalur tertentu?",
          ],
        },

        {
          pattern: /(kos|asrama|tempat tinggal).*(kuliah|mahasiswa)/i,
          responses: [
            "🏠 **Pilihan Tempat Tinggal Mahasiswa:**\n\n🏢 **Asrama Kampus:**\n• Biaya: Rp 300rb - 1,5jt/bulan\n• Plus: Dekat kampus, aman, community\n• Minus: Aturan ketat, privacy terbatas\n\n🏘️ **Kos-kosan:**\n• Biaya: Rp 500rb - 3jt/bulan\n• Plus: Privacy lebih, fleksibel\n• Minus: Bisa jauh dari kampus\n\n🏠 **Kontrakan/Sewa Rumah:**\n• Biaya: Rp 1,5jt - 5jt/bulan\n• Plus: Luas, bisa bagi dengan teman\n• Minus: Biaya listrik/air terpisah\n\n💡 **Tips Memilih:**\n• Pertimbangkan jarak ke kampus\n• Cek keamanan lingkungan\n• Fasilitas (WiFi, kamar mandi, dapur)\n• Budget bulanan total\n\nLagi cari info kos di kota mana?",
          ],
        },
        {
          pattern: /(organisasi|ukm|kegiatan).*(mahasiswa|kampus)/i,
          responses: [
            "🎯 **Organisasi & Kegiatan Mahasiswa:**\n\n🏛️ **Organisasi Formal:**\n• BEM (Badan Eksekutif Mahasiswa)\n• DPM (Dewan Perwakilan Mahasiswa)\n• Senat Mahasiswa\n• Himpunan Program Studi\n\n🎨 **UKM (Unit Kegiatan Mahasiswa):**\n• Seni: Teater, Band, Tari, Fotografi\n• Olahraga: Basket, Futsal, Badminton\n• Akademik: English Club, Debat\n• Sosial: PMI, Volunteer, Pecinta Alam\n\n✨ **Manfaat Ikut Organisasi:**\n• Soft skills development\n• Networking & friendship\n• Leadership experience\n• Portfolio untuk CV\n• Beasiswa prestasi\n\nMinat bidang organisasi apa?",
          ],
        },
        {
          pattern: /(magang|internship|kerja praktek)/i,
          responses: [
            "💼 **Program Magang/Internship:**\n\n📋 **Jenis Program:**\n• Kerja Praktek (KP) - 2-3 bulan, wajib\n• Magang Bersertifikat - 6-12 bulan\n• Fresh Graduate Program - 1-2 tahun\n• Summer Internship - 2-3 bulan liburan\n\n🏢 **Tempat Magang Populer:**\n• BUMN: Pertamina, PLN, Telkom, BNI\n• Swasta: Unilever, Gojek, Tokopedia\n• Startup: Traveloka, Blibli, Shopee\n• Instansi Pemerintah\n\n🎯 **Manfaat Magang:**\n• Real work experience\n• Industry networking\n• Skill development\n• Peluang job offer\n• Menambah CV\n\n💡 **Tips Dapat Magang:**\n• Apply 3-6 bulan sebelumnya\n• CV & portfolio menarik\n• Soft skills komunikasi baik\n• Research company culture\n\nMau tips apply magang tertentu?",
          ],
        },
        {
          pattern: /(part time|kerja sambil kuliah|freelance)/i,
          responses: [
            "💰 **Kerja Sambil Kuliah:**\n\n👨‍💻 **Pekerjaan Online:**\n• Content Writer: Rp 50-200rb/artikel\n• Graphic Design: Rp 100-500rb/project\n• Tutor Online: Rp 25-75rb/jam\n• Virtual Assistant: Rp 15-30rb/jam\n• Social Media Admin: Rp 1-3jt/bulan\n\n🏪 **Pekerjaan Offline:**\n• Kasir/SPG: Rp 50-100rb/hari\n• Les Private: Rp 50-150rb/jam\n• Event Organizer: Rp 100-300rb/event\n• Translator: Rp 2-5rb/kata\n\n⚖️ **Tips Balance Kerja-Kuliah:**\n• Maksimal 20 jam/minggu\n• Pilih job fleksibel waktu\n• Prioritas kuliah tetap utama\n• Time management yang baik\n• Communicate dengan dosen jika perlu\n\nMinat bidang kerja apa?",
          ],
        },
        {
          pattern: /(lulus tepat waktu|ipk|prestasi akademik)/i,
          responses: [
            "🎓 **Tips Sukses Akademik:**\n\n📊 **Target IPK:**\n• IPK 3.50-4.00: Cum Laude\n• IPK 3.00-3.49: Satisfactory\n• IPK 2.75-2.99: Minimum kelulusan\n\n⏰ **Lulus Tepat Waktu:**\n• Planning mata kuliah per semester\n• Jangan ambil SKS berlebihan\n• Konsisten hadir kuliah\n• Kerjakan tugas on time\n• Manfaatkan jam konsultasi dosen\n\n📚 **Strategi Belajar Efektif:**\n• Active learning (diskusi, practice)\n• Study group dengan teman\n• Catat dan review materi rutin\n• Manfaatkan perpustakaan\n• Ikuti ujian dengan persiapan matang\n\n🏆 **Prestasi Tambahan:**\n• Ikuti kompetisi akademik\n• Penelitian dengan dosen\n• Seminar & workshop\n• Sertifikasi keahlian\n\nAda masalah akademik yang ingin dibahas?",
          ],
        },
        {
          pattern: /(stress|mental health|burnout).*(kuliah|mahasiswa)/i,
          responses: [
            "🧠 **Mental Health Mahasiswa:**\n\n⚠️ **Tanda-tanda Stress Akademik:**\n• Susah fokus belajar\n• Gangguan tidur\n• Cemas berlebihan\n• Kehilangan motivasi\n• Isolasi sosial\n\n💡 **Cara Mengatasi:**\n• Break dan refreshing rutin\n• Olahraga & aktivitas fisik\n• Konseling dengan psikolog kampus\n• Support system (keluarga, teman)\n• Time management yang realistis\n\n🆘 **Kapan Harus Seek Help:**\n• Stress berkepanjangan (>2 minggu)\n• Gangguan makan/tidur parah\n• Pikiran self-harm\n• Nilai akademik drop drastis\n\n📞 **Layanan Bantuan:**\n• Konseling kampus (gratis)\n• Hotline kesehatan mental\n• Psikolog profesional\n• Support group mahasiswa\n\nIngat, minta bantuan itu normal dan penting! Mental health adalah prioritas.",
          ],
        },
        {
          pattern: /(persiapan|tips).*(fresh graduate|lulus kuliah)/i,
          responses: [
            "🎯 **Persiapan Fresh Graduate:**\n\n📄 **Dokumen Penting:**\n• CV profesional & ATS-friendly\n• Portfolio project (sesuai bidang)\n• LinkedIn profile lengkap\n• Sertifikat keahlian\n• Surat rekomendasi dosen/atasan magang\n\n🔍 **Job Hunting Strategy:**\n• Apply 3-6 bulan sebelum lulus\n• Network dengan alumni\n• Attend job fair kampus\n• Follow up application\n• Practice interview skills\n\n💼 **Skill yang Dicari Employer:**\n• Technical skills (sesuai bidang)\n• Communication & presentation\n• Problem solving\n• Team work\n• Adaptability & learning agility\n\n🚀 **Career Path Options:**\n• Corporate job (stable income)\n• Startup (fast growth, equity)\n• Freelance/consultant\n• Entrepreneurship\n• Lanjut S2 (academic/research)\n\nMau fokus persiapan bidang tertentu?",
          ],
        },
      ],

      // Specific program studies
      program_study: [
        {
          pattern:
            /(perbedaan|beda).*?(teknik informatika|ilmu komputer|sistem informasi|teknik elektro|teknik sipil|kedokteran|farmasi|manajemen|akuntansi|ilmu hukum|hubungan internasional|ilmu komunikasi).*?dan.*?(teknik informatika|ilmu komputer|sistem informasi|teknik elektro|teknik sipil|kedokteran|farmasi|manajemen|akuntansi|ilmu hukum|hubungan internasional|ilmu komunikasi)/i,
          responses: (match) => {
            // match[2] = jurusan pertama
            // match[3] = jurusan kedua (opsional)
            const jurusan1 = match[2].toLowerCase();
            const jurusan2 = match[3] ? match[3].toLowerCase() : null;

            let response = "💻 **Perbedaan Program Studi:**\n\n";

            if (jurusan1 && this.jurusanDescriptions[jurusan1]) {
              response += `**${jurusan1.replace(/\b\w/g, (c) =>
                c.toUpperCase()
              )}:**\n${this.jurusanDescriptions[jurusan1]}\n\n`;
            }
            if (jurusan2 && this.jurusanDescriptions[jurusan2]) {
              response += `**${jurusan2.replace(/\b\w/g, (c) =>
                c.toUpperCase()
              )}:**\n${this.jurusanDescriptions[jurusan2]}\n\n`;
            }

            return response.trim();
          },
        },
        {
          pattern:
            /(prospek|peluang|karir).*(kerja|masa depan).*(teknik|kedokteran|ekonomi|hukum|komunikasi|internasional)/i,
          responses: (match) => {
            const jurusan = match[3].toLowerCase();

            if (this.prospekJurusan[jurusan]) {
              return `🚀 **Prospek Karir untuk ${jurusan.replace(/\b\w/g, (c) =>
                c.toUpperCase()
              )}:**\n\n${this.prospekJurusan[jurusan]}`;
            }
          },
        },
        {
          pattern:
            /(?:jurusan\s+)?(teknik informatika|ilmu komputer|sistem informasi|teknik elektro|teknik sipil|kedokteran|farmasi|manajemen|akuntansi|ilmu hukum|hubungan internasional|ilmu komunikasi)/i,
          responses: (match) => {
            const jurusan = match[1].toLowerCase();

            if (jurusan && this.jurusanDescriptions[jurusan]) {
              return `📚 **Informasi Program Studi:**\n\n**${jurusan.replace(
                /\b\w/g,
                (c) => c.toUpperCase()
              )}:**\n${this.jurusanDescriptions[jurusan]}`;
            }
          },
        },
        {
          // Pattern fallback: jika user nanya prospek kerja tapi jurusan lain
          pattern:
            /(prospek|peluang|karir).*(kerja|masa depan).*(?:jurusan\s+)?([a-zA-Z\s]+)/i,
          responses: (match) => {
            return "Maaf, saya belum punya data prospek untuk jurusan itu 😢";
          },
        },
        {
          // jurusan tidak dikenali
          pattern: /(jurusan).*([a-zA-Z\s]+)$/i,
          responses: (match) => {
            return "Maaf, saya belum punya informasi untuk jurusan itu 😢";
          },
        },
        {
          pattern:
            /(biaya|budget|dana).*(kuliah|kampus|universitas|perguruan tinggi)/i,
          responses: [
            "💰 **Estimasi Biaya Kuliah per Tahun:**\n\n🏛️ **PTN (Perguruan Tinggi Negeri):**\n• UKT: Rp 0 - 12 juta/tahun\n• Biaya hidup: Rp 15-30 juta/tahun\n\n🏢 **PTS (Perguruan Tinggi Swasta):**\n• SPP: Rp 8 - 50 juta/tahun\n• Uang pangkal: Rp 10 - 100 juta\n• Biaya hidup: Rp 15-30 juta/tahun\n\n*Biaya bervariasi tergantung kota dan program studi*\n\nIngin tahu biaya spesifik prodi tertentu?",
          ],
        },
      ],

      // Help
      help: [
        {
          pattern: /(help|bantuan|menu|fitur|bisa apa)/i,
          responses: [
            '🤖 **EduBot - Menu Bantuan:**\n\n📋 **Topik yang bisa ditanyakan:**\n• Ujian masuk kuliah (SNBP, SNBT, dll)\n• PTN vs PTS\n• Akreditasi & ranking kampus\n• Info beasiswa\n• Tips memilih jurusan\n• Perbedaan program studi\n• Estimasi biaya kuliah\n• Tempat tinggal mahasiswa\n• Organisasi & UKM\n• Program magang\n• Kerja part time\n• Mental health\n• Persiapan fresh graduate\n\n💡 Contoh: "Bagaimana cara memilih antara PTN dan PTS?"\n\nAda yang ingin {reflect} tanyakan?',
          ],
        },
      ],

      // Fallback
      fallback: [
        {
          pattern: /.*/,
          responses: [
            'Maaf, saya belum memahami pertanyaan Anda. Bisa dijelaskan lebih spesifik? Atau Ketik "help" untuk menu.',
          ],
        },
      ],
    };
  }

  reflectPronouns(text) {
    let reflected = text;

    // Sort by length (longest first) to avoid partial replacements
    const sortedReflections = Object.entries(this.reflections).sort(
      ([a], [b]) => b.length - a.length
    );

    for (const [original, replacement] of sortedReflections) {
      const regex = new RegExp(`\\b${original}\\b`, "gi");
      reflected = reflected.replace(regex, replacement);
    }

    return reflected;
  }

  getRandomResponse(responses) {
    return responses[Math.floor(Math.random() * responses.length)];
  }

  processMessage(message) {
    const userMessage = message.toLowerCase().trim();

    for (const [category, rules] of Object.entries(this.rules)) {
      for (const rule of rules) {
        const match = userMessage.match(rule.pattern);
        if (match) {
          let response;

          if (typeof rule.responses === "function") {
            // Kalau response berupa function, panggil dengan match
            response = rule.responses(match);
          } else {
            // Kalau berupa array of string, ambil random
            response = this.getRandomResponse(rule.responses);
          }

          if (typeof response === "string" && response.includes("{reflect}")) {
            // Cari pronoun utama di pesan user
            let pronoun = Object.keys(this.reflections).find((p) =>
              userMessage.includes(p)
            );
            let reflected = pronoun ? this.reflections[pronoun] : "Anda";
            response = response.replace(/{reflect}/g, reflected);
          }

          return {
            response: response.trim(),
            category,
            confidence: this.calculateConfidence(userMessage, rule.pattern),
          };
        }
      }
    }
  }

  calculateConfidence(message, pattern) {
    // Simple confidence calculation based on pattern match
    const matches = message.match(pattern);
    if (matches) {
      return Math.min(0.9, 0.3 + (matches[0].length / message.length) * 0.6);
    }
    return 0.1;
  }

  // Method for CLI testing
  startCLI() {
    const readline = require("readline");
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    console.log("=".repeat(50));
    console.log("🎓 EduBot - Konsultasi Pendidikan Started!");
    console.log('Ketik "exit" untuk keluar atau "help" untuk bantuan');
    console.log("=".repeat(50));

    const askQuestion = () => {
      rl.question("\nAnda: ", (input) => {
        if (input.toLowerCase() === "exit") {
          console.log("Terima kasih telah menggunakan EduBot! 👋");
          rl.close();
          return;
        }

        const result = this.processMessage(input);
        console.log(`\nEduBot: ${result.response}`);
        console.log(
          `[Debug: Category=${
            result.category
          }, Confidence=${result.confidence.toFixed(2)}]`
        );

        askQuestion();
      });
    };

    askQuestion();
  }
}

module.exports = EducationChatbot;

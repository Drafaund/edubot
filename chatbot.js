class EducationChatbot {
  constructor() {
    this.rules = this.initializeRules();
    this.context = {};
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
            /^(hai|halo|hi|hello|selamat (pagi|siang|sore|malam)|assalamualaikum)$/i,
          responses: [
            "Hai! Selamat datang di EduBot - Konsultasi Pendidikan! 🎓",
            "Halo! Saya EduBot, siap membantu konsultasi pendidikan Anda!",
            "Hi! Saya di sini untuk membantu pertanyaan seputar kuliah dan program studi.",
          ],
        },
      ],

      // General college questions
      college_general: [
        {
          pattern: /(ujian|tes|seleksi).*(masuk|kuliah|universitas|kampus)/i,
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
            /(tips|cara|bagaimana).*(memilih|pilih).*(jurusan|prodi|program studi)/i,
          responses: [
            "🎯 **Tips Memilih Program Studi:**\n\n1. **Kenali Minat & Bakat** - Apa yang {reflect} sukai?\n2. **Riset Prospek Karir** - Peluang kerja masa depan\n3. **Pertimbangkan Kemampuan** - Sesuai dengan skill\n4. **Lihat Akreditasi** - Kualitas program studi\n5. **Survey Kampus** - Fasilitas dan lingkungan\n\nAda prodi spesifik yang ingin {reflect} tanyakan?",
          ],
        },
      ],

      // Specific program studies
      program_study: [
        {
          pattern:
            /(perbedaan|beda).*(teknik informatika|ilmu komputer|sistem informasi)/i,
          responses: [
            "💻 **Perbedaan Program Studi IT:**\n\n**Teknik Informatika:**\n• Fokus: Programming, algoritma, software engineering\n• Matematis dan teknis\n• Prospek: Software Developer, System Analyst\n\n**Ilmu Komputer:**\n• Fokus: Teori komputasi, AI, data science\n• Lebih teoritis dan riset\n• Prospek: Data Scientist, Researcher, AI Engineer\n\n**Sistem Informasi:**\n• Fokus: Manajemen IT, business process\n• Gabungan IT dan bisnis\n• Prospek: IT Consultant, Business Analyst\n\nMana yang sesuai minat {reflect}?",
          ],
        },
        {
          pattern: /(biaya|budget|dana).*(kuliah|kampus|universitas)/i,
          responses: [
            "💰 **Estimasi Biaya Kuliah per Tahun:**\n\n🏛️ **PTN (Perguruan Tinggi Negeri):**\n• UKT: Rp 0 - 12 juta/tahun\n• Biaya hidup: Rp 15-30 juta/tahun\n\n🏢 **PTS (Perguruan Tinggi Swasta):**\n• SPP: Rp 8 - 50 juta/tahun\n• Uang pangkal: Rp 10 - 100 juta\n• Biaya hidup: Rp 15-30 juta/tahun\n\n*Biaya bervariasi tergantung kota dan program studi*\n\nIngin tahu biaya spesifik prodi tertentu?",
          ],
        },
        {
          pattern:
            /(prospek|peluang|karir).*(kerja|masa depan).*(teknik|kedokteran|ekonomi|hukum)/i,
          responses: [
            "🚀 **Prospek Karir Berdasarkan Bidang:**\n\n⚙️ **Teknik:** Engineer, Project Manager, Konsultan\n🩺 **Kedokteran:** Dokter, Spesialis, Peneliti Medis\n💼 **Ekonomi:** Akuntan, Financial Analyst, Banker\n⚖️ **Hukum:** Lawyer, Notaris, Hakim, Corporate Legal\n\nSetiap bidang punya peluang bagus dengan gaji kompetitif. Yang mana minat {reflect}?",
          ],
        },
      ],

      // Help and fallback
      help: [
        {
          pattern: /(help|bantuan|menu|fitur|bisa apa)/i,
          responses: [
            '🤖 **EduBot - Menu Bantuan:**\n\n📋 **Topik yang bisa ditanyakan:**\n• Ujian masuk kuliah (SNBP, SNBT, dll)\n• Kuliah dalam/luar negeri\n• Info beasiswa\n• Tips memilih jurusan\n• Perbedaan program studi\n• Estimasi biaya kuliah\n• Prospek karir\n\n💡 Contoh: "Apa perbedaan teknik informatika dan ilmu komputer?"\n\nAda yang ingin {reflect} tanyakan?',
          ],
        },
      ],

      // Fallback
      fallback: [
        {
          pattern: /.*/,
          responses: [
            "Maaf, saya belum memahami pertanyaan {reflect}. Bisa dijelaskan lebih spesifik?",
            "Hmm, saya kurang paham. Coba tanyakan tentang ujian masuk, beasiswa, atau program studi tertentu.",
            'Saya fokus pada konsultasi pendidikan. Bisa tanya tentang kuliah, jurusan, atau karir? Ketik "help" untuk menu.',
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

    // Check each rule category
    for (const [category, rules] of Object.entries(this.rules)) {
      for (const rule of rules) {
        if (rule.pattern.test(userMessage)) {
          let response = this.getRandomResponse(rule.responses);

          // Apply reflection if {reflect} placeholder exists
          if (response.includes("{reflect}")) {
            const reflected = this.reflectPronouns(userMessage);
            response = response.replace(/{reflect}/g, "Anda");
          }

          return {
            response,
            category,
            confidence: this.calculateConfidence(userMessage, rule.pattern),
          };
        }
      }
    }

    // Fallback response
    const fallbackResponse = this.getRandomResponse(
      this.rules.fallback[0].responses
    );
    return {
      response: fallbackResponse.replace("{reflect}", "Anda"),
      category: "fallback",
      confidence: 0.1,
    };
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

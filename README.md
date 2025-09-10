# 🎓 EduBot - Chatbot Konsultasi Pendidikan

EduBot adalah chatbot berbasis aturan (regex) dengan reflection kata ganti yang dirancang khusus untuk memberikan konsultasi pendidikan kepada siswa SMA yang akan melanjutkan ke perguruan tinggi. Bot ini terintegrasi dengan WhatsApp Web menggunakan whatsapp-web.js.

## 🎯 Latar Belakang

Banyak siswa SMA mengalami kebingungan dalam memilih jurusan dan mempersiapkan diri untuk kuliah. EduBot hadir untuk membantu:

- **Masalah yang diselesaikan**: Memberikan informasi terpercaya tentang ujian masuk, program studi, beasiswa, dan perencanaan karir
- **Target pengguna**: Siswa SMA kelas 12 dan fresh graduate yang akan melanjutkan pendidikan
- **Solusi yang diberikan**: Konsultasi 24/7 melalui WhatsApp dengan response yang relevan dan terstruktur

## ✨ Fitur Utama

### 📋 Kategori Konsultasi
- **Kuliah Umum**: Informasi ujian masuk (SNBP, SNBT), kuliah dalam/luar negeri, beasiswa
- **Program Studi**: Perbandingan jurusan, estimasi biaya, prospek karir
- **Reflection System**: Menggunakan kata ganti yang sesuai dalam percakapan

### 🤖 Teknologi
- **Regex-based Rules**: Pattern matching untuk berbagai jenis pertanyaan
- **Pronoun Reflection**: Otomatis mengubah kata ganti (saya→Anda, kamu→saya)
- **WhatsApp Integration**: Terintegrasi langsung dengan WhatsApp Web
- **Logging System**: Pencatatan semua interaksi untuk analisis

## 🚀 Quick Start

### Prerequisites
- Node.js >= 16.0.0
- WhatsApp account
- Smartphone untuk scan QR code

### Installation

```bash
# Clone repository
git clone https://github.com/yourusername/edubot-whatsapp-chatbot.git
cd edubot-whatsapp-chatbot

# Install dependencies
npm install

# Setup environment (optional)
cp .env.example .env
```

### Running CLI Mode
```bash
# Test bot in CLI mode
npm run cli

# Or directly
node cli.js
```

### Running WhatsApp Integration
```bash
# Start WhatsApp bot
npm start

# Or with development mode (auto-restart)
npm run dev
```

**Proses Setup WhatsApp:**
1. Jalankan `npm start`
2. QR Code akan muncul di terminal
3. Scan QR Code dengan WhatsApp di smartphone Anda
4. Tunggu hingga muncul "WhatsApp Client is ready!"
5. Bot siap menerima pesan!

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run with coverage
npm test -- --coverage
```

**Test Coverage:**
- ✅ Pronoun reflection system (6 test cases)
- ✅ Message processing untuk semua kategori
- ✅ Confidence calculation
- ✅ Random response selection
- ✅ Fallback handling

## 📁 Struktur Proyek

```
edubot-whatsapp-chatbot/
├── chatbot.js              # Core bot logic & rules
├── whatsapp-bot.js         # WhatsApp Web integration  
├── cli.js                  # CLI interface
├── package.json            # Dependencies & scripts
├── jest.config.js          # Test configuration
├── .env.example            # Environment template
├── README.md               # Documentation
├── tests/
│   └── chatbot.test.js     # Unit tests (12+ test cases)
└── logs/                   # Bot logs (auto-created)
    └── whatsapp-bot.log    # WhatsApp interaction logs
```

## 💬 Contoh Percakapan

```
User: "Hai"
EduBot: "Hai! Selamat datang di EduBot - Konsultasi Pendidikan! 🎓"

User: "Ujian apa saja untuk masuk kuliah?"
EduBot: "Untuk masuk kuliah, ada beberapa jalur ujian:

📝 SNBP (Seleksi Nasional Berdasarkan Prestasi) - jalur undangan
📝 SNBT (Seleksi Nasional Berdasarkan Tes) - tes tulis
📝 Mandiri - ujian mandiri kampus
📝 SIMAK UI, SBMPTN, dll - tes khusus kampus tertentu

Ada pertanyaan spesifik tentang salah satu ujian ini?"

User: "Apa perbedaan teknik informatika dan ilmu komputer?"
EduBot: "💻 Perbedaan Program Studi IT:

**Teknik Informatika:**
• Fokus: Programming, algoritma, software engineering
• Matematis dan teknis
• Prospek: Software Developer, System Analyst

**Ilmu Komputer:**
• Fokus: Teori komputasi, AI, data science  
• Lebih teoritis dan riset
• Prospek: Data Scientist, Researcher, AI Engineer

Mana yang sesuai minat Anda?"
```

## 🔧 Konfigurasi

### Environment Variables (.env)
```bash
BOT_NAME=EduBot
BOT_VERSION=1.0
```

### Custom Rules
Edit `chatbot.js` untuk menambah/mengubah rules:

```javascript
// Tambah kategori baru
new_category: [
    {
        pattern: /pattern_regex/i,
        responses: [
            'Response 1',
            'Response 2 with {reflect} placeholder'
        ]
    }
]
```

## 📊 Logging & Monitoring

Bot secara otomatis mencatat:
- ✅ Semua pesan masuk dan keluar
- ✅ Tingkat confidence setiap response
- ✅ Error dan debugging info
- ✅ Statistik penggunaan

Log disimpan di: `logs/whatsapp-bot.log`

## 🛠️ Development

```bash
# Install development dependencies
npm install --dev

# Run with nodemon (auto-restart)
npm run dev

# Debug mode
DEBUG=* npm start
```

## 📱 Demo

### WhatsApp QR Code Process

![QR Code Setup](demo/qr-setup.gif)
<img width="1442" height="917" alt="ss-qr-terminal" src="https://github.com/user-attachments/assets/ce82ac10-7ee6-45d4-b76d-ba66a02eb2ea" />

### Conversation Examples
https://github.com/user-attachments/assets/c41f81a1-b0f7-4d85-9bc2-bf7e2af46519

https://github.com/user-attachments/assets/caf13fc3-7943-4b39-af08-834f01fb3ac4

## 🧪 Rules Complexity

### Pattern Matching Examples
- **Simple patterns**: `/^(hai|halo|hi)$/i` - Exact greeting match
- **Complex patterns**: `/(ujian|tes|seleksi).*(masuk|kuliah|universitas)/i` - Multiple keyword combinations
- **Context-aware**: Patterns yang mempertimbangkan kombinasi kata untuk akurasi tinggi

### Pronoun Reflection System
- **Input**: "saya ingin kuliah teknik informatika"  
- **Processed**: "Anda ingin kuliah teknik informatika"
- **Advanced**: Handles multiple pronouns dan context preservation

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request


## 🙏 Acknowledgments

- [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js) - WhatsApp Web API
- [qrcode-terminal](https://github.com/gtanner/qrcode-terminal) - QR Code generation
- Jest - Testing framework

---

**🎓 EduBot - Helping students make informed educational decisions, one chat at a time!**

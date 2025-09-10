const EducationChatbot = require("../chatbot");

describe("EducationChatbot Unit Tests", () => {
  let bot;

  beforeAll(() => {
    bot = new EducationChatbot();
  });

  // 1. Perbandingan Jurusan
  test("Perbedaan Teknik Informatika dan Ilmu Komputer", () => {
    const result = bot.processMessage("Apa perbedaan teknik informatika dan ilmu komputer?");
    expect(result.response).toContain("💻 **Perbedaan Program Studi:**");
    expect(result.response).toContain("Teknik Informatika");
    expect(result.response).toContain("Ilmu Komputer");
    expect(result.category).toBe("program_study");
  });

  test("Perbedaan Sistem Informasi dan Manajemen", () => {
    const result = bot.processMessage("Beda sistem informasi dan manajemen apa?");
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
});

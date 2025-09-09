const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const EducationChatbot = require("./chatbot");
const fs = require("fs");
const path = require("path");

class WhatsAppBot {
  constructor() {
    this.chatbot = new EducationChatbot();
    this.client = new Client({
      authStrategy: new LocalAuth({
        clientId: "edubot-session",
      }),
    });

    this.setupEventHandlers();
    this.logFile = path.join(__dirname, "logs", "whatsapp-bot.log");
    this.ensureLogDirectory();
  }

  ensureLogDirectory() {
    const logDir = path.dirname(this.logFile);
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
  }

  log(level, message, extra = {}) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level,
      message,
      ...extra,
    };

    const logString = `[${timestamp}] ${level.toUpperCase()}: ${message} ${JSON.stringify(
      extra
    )}\n`;

    // Console log
    console.log(logString.trim());

    // File log
    fs.appendFileSync(this.logFile, logString);
  }

  setupEventHandlers() {
    // QR Code for authentication
    this.client.on("qr", (qr) => {
      console.log("🔍 Scan QR Code di bawah ini dengan WhatsApp Anda:");
      console.log("=".repeat(60));
      qrcode.generate(qr, { small: true });
      console.log("=".repeat(60));
      this.log("INFO", "QR Code generated for WhatsApp authentication");
    });

    // Client ready
    this.client.on("ready", () => {
      console.log("✅ WhatsApp Client is ready!");
      console.log("🤖 EduBot aktif dan siap menerima pesan!");
      this.log("INFO", "WhatsApp client ready and EduBot activated");
    });

    // Authentication events
    this.client.on("authenticated", () => {
      console.log("✅ WhatsApp authenticated successfully!");
      this.log("INFO", "WhatsApp authentication successful");
    });

    this.client.on("auth_failure", (msg) => {
      console.error("❌ Authentication failed:", msg);
      this.log("ERROR", "WhatsApp authentication failed", { error: msg });
    });

    // Disconnected event
    this.client.on("disconnected", (reason) => {
      console.log("🔌 WhatsApp Client disconnected:", reason);
      this.log("WARN", "WhatsApp client disconnected", { reason });
    });

    // Message handling
    this.client.on("message", async (message) => {
      try {
        await this.handleMessage(message);
      } catch (error) {
        console.error("Error handling message:", error);
        this.log("ERROR", "Error handling message", {
          error: error.message,
          stack: error.stack,
          messageId: message.id._serialized,
        });
      }
    });
  }

  async handleMessage(message) {
    // Skip if message is from status broadcast or groups (optional)
    if (message.from === "status@broadcast") return;

    // Skip if message is from bot itself
    if (message.fromMe) return;

    const contact = await message.getContact();
    const chat = await message.getChat();

    // Log incoming message
    this.log("INFO", "Received message", {
      from: contact.name || contact.pushname || message.from,
      message: message.body,
      isGroup: chat.isGroup,
      messageId: message.id._serialized,
    });

    // Only respond to individual chats or if mentioned in group
    const shouldRespond =
      !chat.isGroup ||
      (chat.isGroup &&
        message.mentionedIds.includes(this.client.info.wid._serialized));

    if (!shouldRespond) return;

    // Show typing indicator
    await chat.sendStateTyping();

    // Process message with chatbot
    const result = this.chatbot.processMessage(message.body);

    // Add typing delay for more natural feel
    await this.delay(1000 + Math.random() * 2000);

    // Send response
    const botResponse = `🤖 *EduBot*\n\n${result.response}`;

    try {
      await message.reply(botResponse);

      // Log successful response
      this.log("INFO", "Sent response", {
        to: contact.name || contact.pushname || message.from,
        response: result.response,
        category: result.category,
        confidence: result.confidence,
        messageId: message.id._serialized,
      });

      // Stop typing indicator
      await chat.clearState();
    } catch (error) {
      console.error("Error sending message:", error);
      this.log("ERROR", "Failed to send response", {
        error: error.message,
        to: contact.name || contact.pushname || message.from,
        messageId: message.id._serialized,
      });
    }
  }

  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async start() {
    try {
      console.log("🚀 Starting EduBot WhatsApp Integration...");
      console.log("📱 Menghubungkan ke WhatsApp Web...");

      await this.client.initialize();
    } catch (error) {
      console.error("❌ Failed to start WhatsApp bot:", error);
      this.log("ERROR", "Failed to start WhatsApp bot", {
        error: error.message,
        stack: error.stack,
      });
      process.exit(1);
    }
  }

  async stop() {
    try {
      console.log("🛑 Stopping EduBot...");
      await this.client.destroy();
      this.log("INFO", "WhatsApp bot stopped successfully");
      console.log("👋 EduBot stopped successfully!");
    } catch (error) {
      console.error("Error stopping bot:", error);
      this.log("ERROR", "Error stopping bot", { error: error.message });
    }
  }
}

// Handle graceful shutdown
if (require.main === module) {
  const bot = new WhatsAppBot();

  process.on("SIGINT", async () => {
    console.log("\n🛑 Received SIGINT, stopping bot...");
    await bot.stop();
    process.exit(0);
  });

  process.on("SIGTERM", async () => {
    console.log("\n🛑 Received SIGTERM, stopping bot...");
    await bot.stop();
    process.exit(0);
  });

  // Start the bot
  bot.start().catch((error) => {
    console.error("Fatal error:", error);
    process.exit(1);
  });
}

module.exports = WhatsAppBot;

const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const EducationChatbot = require("./chatbot");
const fs = require("fs");
const path = require("path");

class SafeWhatsAppBot {
  constructor() {
    this.chatbot = new EducationChatbot();
    this.client = new Client({
      authStrategy: new LocalAuth({
        clientId: "safe-edubot-session",
      }),
    });

    this.isReady = false;
    this.botNumber = null;
    this.authorizedUsers = new Set(); // Only respond to specific users if needed
    this.responseDelay = 2000; // Minimum delay between responses
    this.lastResponseTime = 0;

    this.setupEventHandlers();
    this.logFile = path.join(__dirname, "logs", "safe-whatsapp-bot.log");
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

    console.log(logString.trim());
    fs.appendFileSync(this.logFile, logString);
  }

  setupEventHandlers() {
    // QR Code
    this.client.on("qr", (qr) => {
      console.log("🔍 Scan QR Code dengan WhatsApp:");
      console.log("=".repeat(50));
      qrcode.generate(qr, { small: true });
      console.log("=".repeat(50));
      this.log("INFO", "QR Code generated");
    });

    // Client ready
    this.client.on("ready", () => {
      this.isReady = true;
      this.botNumber = this.client.info.wid.user;
      console.log("✅ SafeBot ready!");
      console.log(`📱 Bot number: ${this.botNumber}`);
      console.log("🤖 EduBot siap menerima pesan!");
      this.log("INFO", "SafeBot ready", { botNumber: this.botNumber });
    });

    // Authentication
    this.client.on("authenticated", () => {
      console.log("✅ WhatsApp authenticated");
      this.log("INFO", "WhatsApp authenticated");
    });

    this.client.on("auth_failure", (msg) => {
      console.error("❌ Authentication failed:", msg);
      this.log("ERROR", "Authentication failed", { error: msg });
    });

    // Disconnected
    this.client.on("disconnected", (reason) => {
      this.isReady = false;
      console.log("🔌 WhatsApp disconnected:", reason);
      this.log("WARN", "WhatsApp disconnected", { reason });
    });

    // VERY STRICT message handling
    this.client.on("message", async (message) => {
      try {
        await this.strictMessageHandler(message);
      } catch (error) {
        console.error("Error handling message:", error);
        this.log("ERROR", "Message handling error", {
          error: error.message,
          messageId: message?.id?._serialized || "unknown",
        });
      }
    });
  }

  async strictMessageHandler(message) {
    // CRITICAL CHECKS - Exit early for any suspicious conditions

    // Check 1: Bot must be ready
    if (!this.isReady) {
      this.log("DEBUG", "Message ignored - bot not ready");
      return;
    }

    // Check 2: Message must exist and have body
    if (!message || !message.body || message.body.trim() === "") {
      this.log("DEBUG", "Message ignored - no body");
      return;
    }

    // Check 3: NEVER respond to own messages
    if (message.fromMe) {
      this.log("DEBUG", "Message ignored - from bot itself");
      return;
    }

    // Check 4: Skip system messages
    if (message.from === "status@broadcast") {
      this.log("DEBUG", "Message ignored - status broadcast");
      return;
    }

    // Check 5: Only handle text messages
    if (message.type !== "chat") {
      this.log("DEBUG", "Message ignored - not text chat", {
        type: message.type,
      });
      return;
    }

    // Check 6: Rate limiting - prevent spam responses
    const now = Date.now();
    if (now - this.lastResponseTime < this.responseDelay) {
      this.log("DEBUG", "Message ignored - rate limited");
      return;
    }

    // Check 7: Basic text validation
    const text = message.body.trim();
    if (text.length < 1 || text.length > 500) {
      this.log("DEBUG", "Message ignored - invalid length", {
        length: text.length,
      });
      return;
    }

    // Get contact and chat info
    const contact = await message.getContact();
    const chat = await message.getChat();

    // Log incoming message
    this.log("INFO", "Processing message", {
      from: contact.name || contact.pushname || message.from,
      message: text.substring(0, 100),
      isGroup: chat.isGroup,
      messageId: message.id._serialized,
    });

    // Check 8: Group handling - only respond if mentioned
    if (chat.isGroup) {
      const isMentioned = message.mentionedIds.some((id) =>
        id.includes(this.botNumber)
      );

      if (!isMentioned) {
        this.log("DEBUG", "Group message ignored - not mentioned");
        return;
      }
    }

    // PROCESS the message - let chatbot decide how to respond
    await this.processAndRespond(message, text, contact, chat);
  }

  async processAndRespond(message, text, contact, chat) {
    try {
      // Show typing indicator
      await chat.sendStateTyping();

      // Process with chatbot - let it handle everything including fallback
      const result = this.chatbot.processMessage(text);

      // Add natural delay
      await this.delay(1000 + Math.random() * 2000);

      // Prepare response with clear bot identifier
      const botResponse = `🤖 *EduBot - Konsultasi Pendidikan*\n\n${result.response}\n\n_Bot otomatis - info dapat berubah, mohon verifikasi lebih lanjut_`;

      // Send response
      await message.reply(botResponse);

      // Update rate limiting
      this.lastResponseTime = Date.now();

      // Log successful response
      this.log("INFO", "Response sent", {
        to: contact.name || contact.pushname || message.from,
        category: result.category,
        confidence: result.confidence,
        messageId: message.id._serialized,
      });

      // Clear typing
      await chat.clearState();
    } catch (error) {
      console.error("Error in processAndRespond:", error);
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
      console.log("🚀 Starting SafeBot WhatsApp Integration...");
      console.log("🔒 Extra safety checks enabled");
      console.log("📱 Connecting to WhatsApp Web...");

      await this.client.initialize();
    } catch (error) {
      console.error("❌ Failed to start SafeBot:", error);
      this.log("ERROR", "Failed to start SafeBot", {
        error: error.message,
        stack: error.stack,
      });
      process.exit(1);
    }
  }

  async stop() {
    try {
      console.log("🛑 Stopping SafeBot...");
      this.isReady = false;
      await this.client.destroy();
      this.log("INFO", "SafeBot stopped successfully");
      console.log("👋 SafeBot stopped successfully!");
    } catch (error) {
      console.error("Error stopping SafeBot:", error);
      this.log("ERROR", "Error stopping SafeBot", { error: error.message });
    }
  }
}

// Handle graceful shutdown
if (require.main === module) {
  const bot = new SafeWhatsAppBot();

  process.on("SIGINT", async () => {
    console.log("\n🛑 Received SIGINT, stopping SafeBot...");
    await bot.stop();
    process.exit(0);
  });

  process.on("SIGTERM", async () => {
    console.log("\n🛑 Received SIGTERM, stopping SafeBot...");
    await bot.stop();
    process.exit(0);
  });

  // Start the safe bot
  bot.start().catch((error) => {
    console.error("Fatal error:", error);
    process.exit(1);
  });
}

module.exports = SafeWhatsAppBot;

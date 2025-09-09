#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

console.log("🎓 EduBot Setup Script");
console.log("=".repeat(50));

// Create directories
const directories = ["logs", "demo", "tests"];

directories.forEach((dir) => {
  const dirPath = path.join(__dirname, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`✅ Created directory: ${dir}/`);
  } else {
    console.log(`📁 Directory already exists: ${dir}/`);
  }
});

// Create .env file if not exists
const envPath = path.join(__dirname, ".env");
const envExamplePath = path.join(__dirname, ".env.example");

if (!fs.existsSync(envPath) && fs.existsSync(envExamplePath)) {
  fs.copyFileSync(envExamplePath, envPath);
  console.log("✅ Created .env file from template");
} else if (!fs.existsSync(envPath)) {
  const defaultEnv = `# EduBot Configuration
BOT_NAME=EduBot
BOT_VERSION=1.0
`;
  fs.writeFileSync(envPath, defaultEnv);
  console.log("✅ Created .env file with defaults");
} else {
  console.log("📄 .env file already exists");
}

// Create sample log entry
const logPath = path.join(__dirname, "logs", "setup.log");
const logEntry = `[${new Date().toISOString()}] INFO: EduBot setup completed successfully\n`;
fs.writeFileSync(logPath, logEntry);
console.log("✅ Created initial log file");

// Create demo placeholder
const demoReadme = `# Demo Files

This directory contains demo screenshots and GIFs for the EduBot project.

## Files to include:
- \`qr-setup.gif\` - QR code scanning process
- \`conversation-demo.png\` - Sample conversation screenshots
- \`whatsapp-integration.mp4\` - Video demo of WhatsApp integration

## Instructions:
1. Run the bot and take screenshots of conversations
2. Record QR code setup process
3. Create GIFs showing the bot responses
4. Replace this README with actual demo files
`;

fs.writeFileSync(path.join(__dirname, "demo", "README.md"), demoReadme);
console.log("✅ Created demo directory structure");

console.log("=".repeat(50));
console.log("🚀 Setup completed successfully!");
console.log("");
console.log("Next steps:");
console.log("1. Run `npm install` to install dependencies");
console.log("2. Run `npm test` to verify everything works");
console.log("3. Run `npm run cli` to test in CLI mode");
console.log("4. Run `npm start` to start WhatsApp integration");
console.log("");
console.log("📚 Check README.md for detailed instructions");
console.log("=".repeat(50));

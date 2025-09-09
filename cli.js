#!/usr/bin/env node

const EducationChatbot = require("./chatbot");

// Create and start CLI interface
const bot = new EducationChatbot();
bot.startCLI();

# 🤖 Randomfunbot

A feature-rich Discord bot designed for entertainment and utility, with AI-powered article summarization, interactive reactions, and fun random behaviors. Built with Discord.js v14 and modern async/await patterns.

## ✨ Features

### 🔗 Smart Link Processing
- **Auto-Summarization**: Automatically detects and summarizes articles from links using GPT
- **Interactive Reactions**: Original poster can delete summaries with ❌ reaction
- **Multiple Content Sources**: Supports various article formats and websites

### 🎮 Interactive Commands
- `/ping` - Test bot responsiveness
- `/ask` - AI-powered Q&A using OpenAI
- `/summarize` - Manual article summarization
- `/slotmachine` - Fun gambling game
- `/wfdropinfo` - Warframe drop information
- `/ttsreply` - Text-to-speech responses

### 🎲 Random Fun Features
- **Probabilistic Message Deletion**: Random chance to delete messages
- **Random Reactions**: Adds surprise reactions to messages
- **Random AI Responses**: Contextual AI-generated replies
- **Message History Tracking**: Learns from conversation patterns

### 📊 Database Integration
- SQLite database for user activity tracking
- Message count monitoring
- User interaction statistics
- Persistent data storage

### 🎨 Rich Embeds & UI
- Custom embed messages
- Button interactions
- Reaction collectors
- Canvas-based image generation

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Docker (optional)
- Discord Bot Token
- OpenAI API Key

### Environment Setup

1. **Clone the repository:**
```bash
git clone <repository-url>
cd Randomfunbot
```

2. **Install dependencies:**
```bash
npm install
```

3. **Configure environment variables:**
Create a `.env` file in the root directory:
```env
token=YOUR_DISCORD_BOT_TOKEN
gptApiKey=YOUR_OPENAI_API_KEY
clientId=YOUR_BOT_CLIENT_ID
guildId=YOUR_GUILD_ID
linkChannelId=YOUR_LINK_CHANNEL_ID
mainChannelId=YOUR_MAIN_CHANNEL_ID
me=YOUR_USER_ID
```

4. **Set up Discord Bot:**
   - Go to [Discord Developer Portal](https://discord.com/developers/applications)
   - Create a new application and bot
   - Copy the bot token to your `.env` file
   - Enable the following bot permissions:
     - Send Messages
     - Manage Messages
     - Add Reactions
     - Read Message History
     - Use Slash Commands

### 🐳 Docker Deployment

```bash
# Build the image
docker build -t randomfunbot .

# Run the container
docker run -d --name randomfunbot --env-file .env randomfunbot
```

### 📦 Local Development

```bash
# Start the bot
npm start

# Or run with nodemon for development
npm run dev
```

## 🛠️ Configuration

### Required Permissions
Your Discord bot needs these permissions:
- ✅ Send Messages
- ✅ Manage Messages  
- ✅ Add Reactions
- ✅ Read Message History
- ✅ Use Slash Commands
- ✅ Embed Links
- ✅ Attach Files

### Environment Variables
| Variable | Description | Required |
|----------|-------------|----------|
| `token` | Discord bot token | ✅ |
| `gptApiKey` | OpenAI API key for AI features | ✅ |
| `clientId` | Discord application client ID | ✅ |
| `guildId` | Discord server ID | ✅ |
| `linkChannelId` | Channel ID for link processing | ✅ |
| `mainChannelId` | Main channel ID | ✅ |
| `me` | Your Discord user ID | ✅ |

## 🏗️ Project Structure

```
src/
├── client.js                 # Discord client setup
├── index.js                  # Bot entry point
├── handlers/
│   ├── commandHandler/       # Slash commands
│   │   └── commands/         # Individual command files
│   ├── messageHandlers/      # Message event handlers
│   │   ├── linkHandler.js    # Link processing & summarization
│   │   ├── randomResponseHandler.js
│   │   └── dmHandler.js
│   ├── gptResponseHandler/   # AI response logic
│   ├── articleSummaryHandler/ # Web scraping & content extraction
│   └── buttonHandler/        # Button interactions
├── utils/                    # Utility functions
└── webpage.png              # Generated screenshots
database/
├── botDB.db                 # SQLite database
└── dbBuild.js              # Database initialization
config/
└── config.json             # Bot configuration
```

## 🔧 Development

### Adding New Commands
1. Create a new file in `src/handlers/commandHandler/commands/`
2. Export a command object with `data` and `execute` properties
3. The command will be automatically loaded

Example:
```javascript
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('example')
        .setDescription('An example command'),
    async execute(interaction) {
        await interaction.reply('Hello World!');
    },
};
```

### Database Usage
The bot uses SQLite for data persistence. Database utilities are in `database/databaseUtils/`:
- `insertDB.js` - Insert operations
- `updateDB.js` - Update operations

### AI Integration
- Uses OpenAI GPT for article summarization and Q&A
- Handles rate limiting and error recovery
- Supports both chat completions and legacy models

## 📊 Monitoring & Logs

### Bot Status
The bot logs important events:
- Startup and shutdown
- Command executions
- Error handling
- Database operations
- Article processing

### Performance Notes
- Uses Puppeteer with stealth plugin for web scraping
- Implements connection pooling for database
- Graceful error handling for external APIs
- Memory-efficient reaction collectors

## 🔒 Security & Best Practices

- ✅ Environment variables for sensitive data
- ✅ Input validation and sanitization
- ✅ Rate limiting protection
- ✅ Error boundaries and logging
- ✅ Graceful process shutdown
- ✅ Docker containerization support

## 🐛 Troubleshooting

### Common Issues

**Bot doesn't respond to commands:**
- Check bot permissions in Discord server
- Verify bot token is correct
- Ensure bot is online and connected

**Article summarization fails:**
- Check OpenAI API key and credits
- Verify internet connectivity
- Review console logs for Puppeteer errors

**Database errors:**
- Ensure write permissions for database file
- Check SQLite installation
- Review database schema

**Puppeteer/Chrome issues:**
- Install missing dependencies: `apt-get install -y chromium-browser`
- Use `--no-sandbox` flag in Docker
- Check available memory

### Debug Mode
Set `NODE_ENV=development` for verbose logging.

## 📝 License

This project is licensed under the ISC License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 🔗 Links

- [Discord.js Documentation](https://discord.js.org/)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Discord Developer Portal](https://discord.com/developers/applications)

---



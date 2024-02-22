const { Client, GatewayIntentBits } = require('discord.js')
const dotenv = require('dotenv')
dotenv.config()

class AmbienceBeta extends Client {
  constructor(options) {
    super(options)
    this.token = process.env.token

    // Additional setup or customization can be done here
  }

  // You can add more methods or override existing ones here
}

const client = new AmbienceBeta({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],
})

module.exports = { client, token: this.token }

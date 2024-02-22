const { Client, GatewayIntentBits } = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();

class Ambience extends Client {
    constructor(options) {
        super(options);

        // Additional setup or customization can be done here
    }

    // You can add more methods or override existing ones here
}

const token = process.env.token;

const client = new Ambience({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
    ],
});

module.exports = { client, token };
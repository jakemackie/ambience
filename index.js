const { 
    Client, 
    GatewayIntentBits 
} = require('discord.js');

class Ambience extends Client {
    constructor(options) {
        super(options);

        // Additional setup or customization can be done here
    }

    // You can add more methods or override existing ones here
}

const client = new Ambience({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
    ],
});

client.once('ready', () => {
    console.log('Bot is ready!');
});

client.login('YOUR_BOT_TOKEN');

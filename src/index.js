require('dotenv').config();
const { Client, Collection, IntentsBitField } = require('discord.js');
const eventHandler = require('./handlers/eventHandler');

class Ambience extends Client {
    constructor(options) {
        super(options);
        this.theme = {
            neutral: 0x51bf77,
            warning: 0xbf7951,
            danger: 0x824040,
        };
        this.commands = new Collection();
    }
}

const client = new Ambience({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

eventHandler(client);

client.login(process.env.token);

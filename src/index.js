require('dotenv').config();
require('os');

const { Client, Collection, IntentsBitField } = require('discord.js');
const eventHandler = require('./handlers/eventHandler');
const { clear } = require('console');

class Ambience extends Client {
    constructor(options) {
        super(options);

        this.terminal = {
            task: '…',
            complete: '✓',

            success: '\x1b[32m',
            error: '\x1b[31m',
            warning: '\x1b[33m',
            info: '\x1b[34m',
            default: '\x1b[0m',

            clear: console.clear(),
        };

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

module.exports = {
    name: 'ping',
    description: "See the bot's latency",
    // devOnly: Boolean,
    // options: Object[],
    // deleted: Boolean,

    callback: (client, interaction) => {
        interaction.reply(`Pong! ${client.ws.ping}ms`);
    },
};

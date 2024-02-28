const embedColor = require('../../models/theme.js');

module.exports = {
    name: 'ping',
    description: "See the bot's latency",
    testServer: true,
    // devOnly: Boolean,
    // options: Object[],
    // deleted: Boolean,

    callback: async (client, interaction) => {

        let websocket = client.ws.ping;

        let initialInteraction = await interaction.reply({
            content: `Client ${websocket}ms, pinging API...`,
            fetchReply: true,
            ephereal: true,
        })

        let interactionDifference = initialInteraction.createdTimestamp - interaction.createdTimestamp;

        interaction.editReply({
            content: `Client ${websocket}ms, API: ${interactionDifference}ms`, ephereal: true
        })
    },
};

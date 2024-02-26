const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    callback: (client, interaction) => {
        let string =
            interaction.options.getString('string') ||
            "You didn't provide a string!";
        interaction.reply(`You provided: ${string}`);
    },

    name: 'string',
    description: 'Test command',
    testOnly: true,
    options: [
        {
            name: 'string',
            description: 'Have the bot reply with whatever you said to it!',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
    ],
};

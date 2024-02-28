const { ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    testServer: true,

    callback: async (client, interaction) => {

        let sound = interaction.options.getString('sound');

        if (sound) {
            if (sound !== 'rain') {
                return interaction.reply({ 
                    content: `We couldn't find \"\`${sound}\`\" in our catalogue, please try again.`,
                    ephemeral: true
                })
            }
            return interaction.reply(`Playing \`${interaction.options.getString('sound')}\` from our catalogue`);
        }

        const select = new StringSelectMenuBuilder()
        .setCustomId('starter')
        .setPlaceholder('Make a selection!')
        
        // This is meant to represent looping through the sound catalogue
        for (let i = 0; i < 25; i++) {
            select.addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel('Rain')
                    .setDescription('Soft rain sounds on a window.')
                    .setValue(i.toString())
            )
        }
            
        const row = new ActionRowBuilder()
			.addComponents(select);

		await interaction.reply({
			content: 'Please select a sound',
			components: [row],
		});
	},

    name: 'play',
    description: 'Play a sound from the bot\'s catalogue',
    options: [
        {
            name: 'sound',
            description: 'Choose a sound from our catalogue',
            type: ApplicationCommandOptionType.String,
            required: false,
        },
    ],
};

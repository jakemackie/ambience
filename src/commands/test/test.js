const {
    EmbedBuilder,
    ActionRowBuilder,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder,
    ApplicationCommandOptionType,
} = require('discord.js');

module.exports = {
    testServer: true,

    callback: async (client, interaction) => {
        let sound = interaction.options.getString('sound');

        if (sound) {
            if (sound !== 'rain') {
                return interaction.reply({
                    content: `We couldn't find \"\`${sound}\`\" in our catalogue, please try again.`,
                    ephemeral: true,
                });
            }
            return interaction.reply({
                content: `Playing \"\`${sound}\`\" from our catalogue!`,
                ephemeral: true,
            });
        }

        const select = new StringSelectMenuBuilder()
            .setCustomId('sound-select-menu')
            .setPlaceholder('Choose a sound');

        // This is meant to represent looping through the sound catalogue
        let sounds = [
            {
                name: 'Rain',
                description: 'Soft rain on a window.',
                value: 'rain',
            },
            {
                name: 'Thunder',
                description: 'Loud thunder outside',
                value: 'thunder',
            },
            {
                name: 'Wind',
                description: 'Strong wind blowing',
                value: 'wind',
            },
            {
                name: 'Fire',
                description: 'Crackling fireplace',
                value: 'fire',
            },
            {
                name: 'Crickets',
                description: 'Chirping crickets at night',
                value: 'crickets',
            },
            {
                name: 'Birds',
                description: 'Singing birds in early morning',
                value: 'birds',
            },
            {
                name: 'Ocean',
                description: 'Waves crashing on the shore',
                value: 'ocean',
            },
        ];

        // We loop through the sounds and add them to the select menu
        for (let sound of sounds) {
            select.addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel(sound.name)
                    .setDescription(sound.description)
                    .setValue(sound.value),
            );
        }

        const row = new ActionRowBuilder().addComponents(select);

        const Embed = new EmbedBuilder()
            .setAuthor({
                name: client.user.username,
                iconURL: client.user.displayAvatarURL(),
            })
            .setTitle('Sound Catalogue')
            .setDescription('Select a sound from the catalogue below')
            .setColor(client.theme.colour);

        await interaction.reply({
            embeds: [Embed],
            components: [row],
        });
    },

    name: 'play',
    description: "Play a sound from the bot's catalogue",
    options: [
        {
            name: 'sound',
            description: 'Choose a sound from our catalogue',
            type: ApplicationCommandOptionType.String,
            required: false,
        },
    ],
};

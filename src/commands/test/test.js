const {
    EmbedBuilder,
    ActionRowBuilder,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder,
    ComponentType,
    ApplicationCommandOptionType,
    resolveColor,
} = require('discord.js');

module.exports = {
    testServer: true,

    callback: async (client, interaction) => {
        const select = new StringSelectMenuBuilder()
            .setCustomId('sound-select-menu')
            .setPlaceholder('Choose a sound');

        // This is meant to represent looping through the sound catalogue
        let sounds = [
            {
                emoji: '🌧️',
                name: 'Rain',
                description: 'Soft rain on a window',
                value: 'rain',
            },
            {
                emoji: '🌩️',
                name: 'Thunder',
                description: 'Loud thunder outside',
                value: 'thunder',
            },
            {
                emoji: '🌬️',
                name: 'Wind',
                description: 'Strong wind blowing',
                value: 'wind',
            },
            {
                emoji: '🔥',
                name: 'Fire',
                description: 'Crackling fireplace',
                value: 'fire',
            },
            {
                emoji: '🦗',
                name: 'Crickets',
                description: 'Chirping crickets at night',
                value: 'crickets',
            },
            {
                emoji: '🐦',
                name: 'Birds',
                description: 'Singing birds in early morning',
                value: 'birds',
            },
            {
                emoji: '🌊',
                name: 'Ocean',
                description: 'Waves crashing on the shore',
                value: 'ocean',
            },
        ];

        // We loop through the sounds and add them to the select menu
        for (let sound of sounds) {
            select.addOptions(
                new StringSelectMenuOptionBuilder()
                    .setEmoji(sound.emoji)
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

        const response = await interaction.reply({
            embeds: [Embed],
            components: [row],
        });

        let author = interaction.user;

        const collector = response.createMessageComponentCollector({
            componentType: ComponentType.StringSelect,
            time: 3_600_000,
        });

        collector.on('collect', async (interaction) => {
            if (interaction.user.id !== author.id) {
                const Error = new EmbedBuilder()
                    .setDescription('You cannot interact with this select menu')
                    .setColor(client.theme.colour);

                return interaction.reply({
                    embeds: [Error],
                    ephemeral: true,
                });
            }

            let selection = interaction.values[0];

            // Referencing the previous embed
            Embed.setDescription(
                `Playing \`${selection}\` from our catalogue!`,
            );

            await interaction.deferUpdate();

            select.setPlaceholder('Change the sound');
            interaction.editReply({
                embeds: [Embed],
                components: [row],
                ephereal: true,
            });
        });
    },

    name: 'play',
    description: "Play a sound from the bot's catalogue",
};

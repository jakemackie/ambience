const fs = require('fs');
const {
    EmbedBuilder,
    ActionRowBuilder,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder,
    ComponentType,
} = require('discord.js');

module.exports = {
    testServer: true,

    callback: async (client, interaction) => {
        const select = new StringSelectMenuBuilder()
            .setCustomId('sound-select-menu')
            .setPlaceholder('Choose a sound');

        // This is meant to represent looping through the sound catalogue

        let raw = fs.readFileSync(__dirname + '/data/example.json');
        const sounds = JSON.parse(raw);

        // We loop through the sounds and add them to the select menu
        for (let sound of sounds) {
            select.addOptions(
                new StringSelectMenuOptionBuilder()
                    .setEmoji(sound.emoji)
                    .setLabel(sound.name)
                    .setDescription(sound.description)
                    .setValue(sound.key),
            );
        }

        const row = new ActionRowBuilder().addComponents(select);

        const Embed = new EmbedBuilder()
            .setTitle('Sound Catalogue')
            .setDescription('Select a sound from the catalogue below')
            .setColor(client.theme.neutral);

        const response = await interaction.reply({
            embeds: [Embed],
            components: [row],
        });

        let author = interaction.user;

        const collector = response.createMessageComponentCollector({
            componentType: ComponentType.StringSelect,
            time: 3_600_000,
        });

        // Need to add command-specific collector
        collector.on('collect', async (interaction) => {
            if (interaction.user.id !== author.id) {
                const Error = new EmbedBuilder()
                    .setDescription(`This interaction belongs to ${author}`)
                    .setColor(client.theme.warning);

                return interaction.reply({
                    embeds: [Error],
                    ephemeral: true,
                });
            }

            let selection = interaction.values[0];

            // Referencing the previous embed
            Embed.setTitle(null);
            Embed.setDescription(`Now playing in \`<voice channel>\``);
            const sound = sounds.find((sound) => sound.key === selection);
            Embed.setFields(
                {
                    name: 'Sound',
                    value: sound.name,
                },
                {
                    name: 'Description',
                    value: sound.description,
                },
            );
            Embed.setFooter({
                text: 'Requested by ' + interaction.user.username,
                iconURL: interaction.user.displayAvatarURL(),
            });
            Embed.toJSON();

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

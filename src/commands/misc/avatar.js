const {
    ApplicationCommandOptionType,
    EmbedBuilder,
    ButtonBuilder,
    ActionRowBuilder,
    ButtonStyle,
} = require('discord.js');

module.exports = {
    callback: (client, interaction) => {
        let user = interaction.options.getUser('user') || interaction.member;
        if (!user)
            return interaction.reply({
                content: `Ack! I couldn't find that user, please try again.`,
                ephemeral: true,
            });

        let userAvatar = user.displayAvatarURL({ dynamic: true, size: 512 });

        const embed = new EmbedBuilder()
            .setAuthor({
                name: client.user.username,
                iconURL: client.user.displayAvatarURL(),
            })
            .setDescription(`${user}'s avatar`)
            .setImage(userAvatar)
            .setColor(client.theme.neutral)
            .setTimestamp();

        const button = new ButtonBuilder()
            .setLabel('Download')
            .setStyle(ButtonStyle.Link)
            .setURL(`${user.displayAvatarURL({ dynamic: true, size: 512 })}`);

        const row = new ActionRowBuilder().addComponents(button);

        interaction.reply({ embeds: [embed], components: [row] });
    },

    name: 'avatar',
    description: 'Returns the avatar of the user',
    options: [
        {
            name: 'user',
            description: 'The user to fetch',
            type: ApplicationCommandOptionType.User,
            required: false,
        },
    ],
};

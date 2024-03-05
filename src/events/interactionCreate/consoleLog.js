module.exports = (client, interaction) => {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const formattedTime = `${hours}:${minutes}:${seconds}`;

    console.log(client.terminal.info);
    console.log(`${formattedTime} - Interaction detected`);
    console.log(client.terminal.default);

    console.log(
        `user: ${interaction.user.tag}#${interaction.user.discriminator} (${interaction.user.id}) command: "${interaction.commandName}" guild: ${interaction.guild.name} (${interaction.guild.id}) channel: ${interaction.channel.name} (${interaction.channel.id})`,
    );
};

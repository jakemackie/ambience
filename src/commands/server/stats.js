const os = require('os');
const si = require('systeminformation');
const bytes = require('bytes');

const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'stats',
    description: "See the bot's stats and the server load",
    callback: async (client, interaction) => {
        try {
            // Get CPU and memory usage
            const cpuModel = await si.cpu();
            const uptime = `${Math.round(process.uptime())}s`;
            const totalMem = bytes(os.totalmem());
            const freeMem = bytes(os.freemem());
            const usedMem = bytes(os.totalmem() - os.freemem());

            const Embed = new EmbedBuilder()
                .setAuthor({
                    name: client.user.username,
                    iconURL: client.user.displayAvatarURL(),
                })
                .setColor(client.theme.neutral)
                .setTitle(`${client.user.username} Statistics`)
                .addFields(
                    {
                        name: 'Uptime',
                        value: `\`${uptime}\``, // Using humanized uptime
                        inline: true,
                    },
                    {
                        name: 'Node.js Version',
                        value: `\`${process.version}\``,
                        inline: true,
                    },
                    {
                        name: 'Platform',
                        value: `\`${os.platform()}\``,
                        inline: true,
                    },
                    {
                        name: 'Total Memory',
                        value: `\`${totalMem}\``,
                        inline: true,
                    },
                    {
                        name: 'Used Memory',
                        value: `\`${usedMem}\``,
                        inline: true,
                    },
                    {
                        name: 'Free Memory',
                        value: `\`${freeMem}\``,
                        inline: true,
                    },
                    { name: 'CPU Model', value: `\`${cpuModel.brand}\`` },
                )
                .setTimestamp();

            interaction.reply({ embeds: [Embed] });
        } catch (err) {
            console.error(err);
            interaction.reply({
                content: 'Error getting server information',
                ephemeral: true,
            });
        }
    },
};

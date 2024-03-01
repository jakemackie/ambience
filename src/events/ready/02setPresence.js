const { ActivityType } = require('discord.js');

module.exports = async (client) => {
    console.log('Setting presence');
    client.user.setPresence({
        status: 'online',
        activities: [
            {
                // Displays "Listening to relaxing sounds"
                name: 'relaxing sounds',
                type: ActivityType.Listening,
            },
        ],
    });
    console.log('Presence set');
};

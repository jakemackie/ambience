const { client, token } = require('./client.js');

client.on('ready', () => {
    console.log(`${client.user.tag} is ready for blastoff! 🚀 (${client.user.id})`);
});

client.login(token);
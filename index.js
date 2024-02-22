const { getClient } = require('./utils/load')
const { client, token } = getClient('Release')

client.login(token)
client.on('ready', () => {
  console.log(`Ambience is ready!`)
})

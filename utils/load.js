const { client, token } = require('./clients/')

function chosenClient(version) {
  if (version === '1') {
    return { client, token }
  } else if (version === '2') {
    return { client, token }
  } else {
    console.log('Invalid selection. Please try again.')
  }
}

module.exports = { client: chosenClient }

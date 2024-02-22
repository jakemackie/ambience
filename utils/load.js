const {
  client: AmbienceRelease,
  token: AmbienceToken,
} = require('../clients/release')

const {
  client: AmbienceBeta,
  token: AmbienceBetaToken,
} = require('../clients/beta')

function getClient(version) {
  switch (version) {
    case 'Release':
      console.log('Ambience (Release) has been loaded.')
      return { client: AmbienceRelease, token: AmbienceToken }
    case 'Beta':
      console.log('Ambience (Beta) has been loaded.')
      return { client: AmbienceBeta, token: AmbienceBetaToken }
  }
}

module.exports = { getClient }

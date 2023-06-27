const { aliasWebpack, aliasJest } = require('react-app-alias');

const aliasMap = {
  '@molecules': 'src/molecules',
  '@services': 'src/services',
  '@hooks': 'src/hooks',
  '@atoms': 'src/atoms',
  '@mocks': 'src/mocks',
  '@assets': 'src/assets',
  '@colors': 'src/colors',
  '@redux-toolkit': 'src/redux-toolkit',
  '@root': 'src'
};

const options = {
  alias: aliasMap
};

module.exports = aliasWebpack(options);
module.exports.jest = aliasJest(options);

const { ESLINT_MODES } = require('@craco/craco');
const CracoAlias = require('craco-alias');

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'jsconfig',
        baseUrl: './src',
      },
    },
  ],
  eslint: {
    mode: ESLINT_MODES.file,
  },
  jest: {
    configure: {
      globals: {
        CONFIG: true,
      },
    },
  },
};

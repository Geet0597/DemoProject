const { ESLINT_MODES } = require('@craco/craco');
const CracoAlias = require('craco-alias');

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        baseUrl: './src',
        tsConfigPath: './tsconfig.extend.json',
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

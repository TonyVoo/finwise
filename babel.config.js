module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['module-resolver', {
        alias: {
          '@components': './components',
          '@screens': './app',
          '@constants': './constants',
          '@redux': './redux',
          '@services': './services',
          '@types': './types',
          '@utils': './utils',
        },
      }],
    ],
  };
};

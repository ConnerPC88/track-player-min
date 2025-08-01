const { mergeConfig } = require('@react-native/metro-config');

const { getDefaultConfig } = require('expo/metro-config');

const expoConfig = getDefaultConfig(__dirname);

/** @type {import('@react-native/metro-config').MetroConfig} */
const config = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: true,
        inlineRequires: true,
      },
    }),
  },
};

module.exports = mergeConfig(expoConfig, config);

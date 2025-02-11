const path = require('path');
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */

const defaultConfig = getDefaultConfig(__dirname);
const {assetExts, sourceExts} = defaultConfig.resolver;

const config = {
  transformer: {
    babelTransformerPath: require.resolve(
      'react-native-svg-transformer/react-native',
    ),
    transform: {
      experimentalImportSupport: false,
      inlineRequires: true,
    },
  },
  resolver: {
    assetExts: assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...sourceExts, 'svg'],
    extraNodeModules: new Proxy(
      {},
      {
        get: (target, name) => {
          return path.join(process.cwd(), `src/${name.replace('@', '')}`);
        },
      },
    ),
  },
  watchFolders: [path.resolve(__dirname, 'src')],
};

module.exports = mergeConfig(defaultConfig, config);

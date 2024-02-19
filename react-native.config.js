module.exports = {
  assets: ['./src/assets/fonts/'],
  // To avoid add all fonts to the Build Phases, Copy Pod Resources
  dependencies: {
    'react-native-vector-icons': {
      platforms: {
        ios: null,
      },
    },
  },
};

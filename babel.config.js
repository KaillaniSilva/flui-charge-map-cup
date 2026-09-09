module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    // O plugin do Reanimated precisa ser o ultimo da lista.
    plugins: ['react-native-reanimated/plugin'],
  };
};

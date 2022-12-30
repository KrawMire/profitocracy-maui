module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['.'],
          alias: {
            objectsTypes: "./src/types",
            appState: "./src/state",
            screens: "./src/screens",
            shared: "./src/shared"
          },
        },
      ],
    ],
  };
};

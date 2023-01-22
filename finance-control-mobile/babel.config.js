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
            domain: "./src/domain",
            state: "./src/state",
            storage: "./src/storage",
            screensUI: "./src/ui/screens",
            sharedUI: "./src/ui/shared",
            styles: "./src/ui/styles",
            utils: "./src/utils"
          },
        },
      ],
    ],
  };
};

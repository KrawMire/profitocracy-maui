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
            screens: "./src/ui/screens",
            components: "./src/ui/components",
            styles: "./src/ui/styles",
            utils: "./src/utils"
          },
        },
      ],
    ],
  };
};

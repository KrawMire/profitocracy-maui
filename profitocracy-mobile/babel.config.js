module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["."],
          alias: {
            domain: "./src/domain",
            state: "./src/state",
            storage: "./src/storage",
            screens: "./src/ui/screens",
            services: "./src/services",
            components: "./src/ui/components",
            styles: "./src/ui/styles",
            utils: "./src/utils",
            operations: "./src/operations",
          },
        },
      ],
    ],
  };
};

module.exports = {
  distDir: "../functions/next",
  webpack(config) {
    if (config.resolve.alias) {
      delete config.resolve.alias.react;
      delete config.resolve.alias['react-dom'];
    }
    return config;
  },
};

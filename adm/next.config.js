// const withSass = require("@zeit/next-sass");
module.exports = {
  env : Object.fromEntries(
    Object.entries(process.env).filter(([key, value]) => key && key !== "NODE_ENV")
  ),
  cssLoaderOptions: {
    importLoaders: 2
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Important: return the modified config
    config.watchOptions = {
      ignored: [
        /node_modules([\\]+|\/)+(?!\@xla\/.+)/,
        /\@xla\/.+\/.+([\\]+|\/)node_modules/
      ]
    }
    return config
  },
}

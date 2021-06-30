const withSass = require("@zeit/next-sass");
module.exports = withSass({
  env : Object.fromEntries(
    Object.entries(process.env).filter(([key, value]) => key && key !== "NODE_ENV")
  ),
  cssLoaderOptions: {
    importLoaders: 2
  }
});
